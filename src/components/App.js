import React, {useState, useEffect} from 'react'
import { BrowserRouter, Link, Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Home from './Home'
import AboutUs from './AboutUs'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Jobs from './Jobs/Jobs.js'
import Talents from './Talents/Talents'
import axios from 'axios'
import EmployeeSetting from './Settings/EmployeeSetting'
import EmployerSetting from './Settings/EmployerSetting'
import EditJob from './Settings/EditJob'
import CreateJob from './Settings/CreateJob'
import OneJob from './Jobs/OneJob'
import OneTalent from './Talents/OneTalent'

const withRouter = Component => (props) => {
    return (
        <BrowserRouter>
            <Component {...props}/>
        </BrowserRouter>
    )
}

const App = () => {

    const [user, setUser]  = useState(null)

    const history = useHistory()
    const location = useLocation()

    const getUser = () => {
        const id = localStorage.getItem('id')

        axios
            .get(`http://localhost:3020/v1/users/${id}`)
            .then(response =>{
                setUser(response.data.user)
            } )
            .catch(console.log)
    }

    const [allJobs, setAllJobs] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(null)

    const getAllJobs = () => {
        const limit = 4;
        const offset = (page-1) * limit

        axios
            .get(`http://localhost:3020/v1/jobs?limit=${limit}&offset=${offset}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setAllJobs(response.data.jobs)
                setPageCount(response.data._meta.pageCount)
                
            })
            .catch(console.log)

    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        setUser(null)

        if (location.pathname !== '/') {
            history.push('/')
        }
    }


    useEffect(() => {
        getAllJobs()
        if (localStorage.getItem('token')) {
            getUser()
        }
    }, [page])

    return (
        <div>
            <header className="position-sticky sticky-top">
                <nav className = "nav navbar d-flex" id='header'>
                    <div>
                        <nav className="nav container d-flex">
                            <Link to='/'>
                                <img src = "./logo.jpg"/>
                            </Link>
                            <Link to='/about-us'className="flex-sm-fill text-sm-center nav-link mt-2" >About Us</Link>
                            <Link to='/jobs' className="flex-sm-fill text-sm-center nav-link mt-2">Jobs</Link>
                            <Link to='/talents'className="flex-sm-fill text-sm-center nav-link mt-2">Talents</Link>
                        </nav>
                    </div>
                    <div className = "d-flex">
                        <div className = "d-flex justify-content space-between">
                        {user  ? ([
                                <Link to='/settings' key = 'setting' className="flex-sm-fill text-sm-center nav-link mt-2">Settings</Link>,
                                <Link to='/logout' key = "logOut" className="flex-sm-fill text-sm-center nav-link mt-2"
                                onClick={logout}>Sign Out
                                </Link>
                            ]) :([
                                <Link to='/sign-in' key = 'signIn' className="flex-sm-fill text-sm-center nav-link mt-2">Sign In</Link>,
                                <Link to='/sign-up' key = "signUp" className="flex-sm-fill text-sm-center nav-link mt-2">Sign Up</Link>
                            ])}
                        </div>
                        <div className="dropdown mt-2">
                            <button className="btn btn-info dropdown-toggle bg-transparent" data-toggle="dropdown">
                                EN
                            </button>
                            <div className="dropdown-menu">
                                <a href="#AM" className="dropdown-item" type="btn-link">AM</a>
                                <a href="#RU" className="dropdown-item" type="btn-link">RU</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Switch>
                <Route exact path="/"> <Home/> </Route>
                <Route path = "/about-us"> <AboutUs/> </Route>
                <Route path = "/jobs"> <Jobs
                    allJobs = {allJobs}
                    page = {page}
                    setPage = {setPage}
                    pageCount = {pageCount}
                /> </Route>
                <Route path = "/talents"> <Talents/> </Route>
                <Route path = "/sign-in"> <SignIn getUser={getUser}/> </Route>
                <Route path = "/sign-up"> <SignUp getUser={getUser}/> </Route>
                {user && (
                    // <>
                        <Route path = "/settings">
                            {user.accountType === 'employers' ? (
                                <EmployerSetting
                                    allJobs = {allJobs} 
                                    getAllJobs = {getAllJobs}
                                    setPage =  {setPage}
                                    page = {page}
                                    pageCount = {pageCount}
                                    user = {user}
                                    logout = {logout}
                                    /> 
                            ) : (
                                <EmployeeSetting
                                    user = {user}
                                    getUser = {getUser}
                                />
                            )}
                        </Route>
                        //  </> 
                        
                )}
                <Route path="/settings:jobId">
                    <EditJob/>
                </Route>
                <Route path='/create_job'>
                    <CreateJob/>
                </Route>
                <Route path="/jobs:oneJobId">
                    <OneJob/>
                </Route>
                <Route path="/talents:talentId">
                    <OneTalent/>
                </Route>
            </Switch>
            {<footer className = "w-100">
                <p> 
                    Copyright &copy; <Link to='/'>VayotsDzorJobs.am</Link> 2019. All rights reserved. 
                        <span> Website created with 
                            <i className="fa fa-heart-o" style={{color: 'red'}}></i> by our web-2 team.
                        </span>
                </p>
            </footer>}
            {/* <footer className="pt-4 site-footer">
                <div className="container" id = "footer">
                    <div className="row d-flex">
                        <div >
                            <p> Armenia</p>
                            <p> Vayots dzor, Yeghegnadzor </p>
                            <p>Phone</p>
                            <p>E-mail
                                <a href="#"> mailinator.gmail.com</a> 
                            </p>
                        </div>
                    </div>
                    <div className="footer-copyright text-center py-3">
                    <p>YeghegnadzorTalents.com &copy; All rights reserved 2019 
                        <span> Created with 
                            <i className="fa fa-heart-o" ></i> 
                            by our web-2 team.
                        </span>
                    </p>
                        Copyright © 2019 rights reserved | This template is made by
                        <a href="https://vayotsdzor.am"> vayotsdzor.am</a>
                    </div>
                </div>
            </footer> */}
        </div>
    )
}
export default withRouter(App)