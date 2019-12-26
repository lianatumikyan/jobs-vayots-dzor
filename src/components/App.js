import React, {useState, useEffect} from 'react'
import i18n from '../services/i18n'
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
import {useTranslation} from "react-i18next";
import Main from './Main';
import MainUser from './MainUser'

const withRouter = Component => (props) => {
    return (
        <BrowserRouter>
            <Component {...props}/>
        </BrowserRouter>
    )
}

const App = () => {
    const { t } = useTranslation();
    const language = localStorage.getItem('language');

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

    const changeLanguage = value => {
        i18n.changeLanguage(value.toLowerCase(), (err) => {
            if (err) return console.log('something went wrong while changing language', err);
        });
    };

    const [allJobs, setAllJobs] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(null)
    const [jobCount, setJobCount] = useState(null)


    const [allTalents, setAllTalents] = useState([])
    const [talentPageCount, setTalentPageCount] = useState(null)
    const [talentCount, setTalentCount] = useState(null)
    const [employersCount, setEmployersCount] = useState(null)
    const [query, setQuery] = useState('')
    // const [filter, setFilter] = useState('')

    const getAllJobs = () => {
        const limit = 4;
        const offset = (page-1) * limit
        let q = query

        axios
            .get('http://localhost:3020/v1/jobs',
            {
                params: { limit, offset, type: 'employers', q },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                // console.log(response, 'jobs')
                setAllJobs(response.data.jobs)
                setPageCount(response.data._meta.pageCount)
                setJobCount(response.data._meta.total)
                
            })
            .catch(console.log)

    }
    // const salaryArray = allJobs.map(job => {
    //     return job.salary.split('-')[1]
    // })
    // const largest = salaryArray.sort(function(a,b) {
    //     if (a < b) { return 1; }
    //     else if (a == b) { return 0; }
    //     else { return -1; }
    // });
    // console.log(largest.slice(0, 3))
    // console.log(Math.max(...array), 'araaay')
    const [pageTalent, setPageTalent] = useState(1)
    const getTalents = () => {
        const limit = 4;
        const offset = (pageTalent-1) * limit
        let q = query

        axios
            .get('http://localhost:3020/v1/users', { params: { limit, offset, q, type: 'employee' } })
            .then(response => {
                // console.log(response, 'talents')
                setAllTalents(response.data.users)
                setTalentPageCount(response.data._meta.pageCount)
                setTalentCount(response.data._meta.total)
           
            })
            .catch(console.log)

    }

    const getEmployers = () => {

        axios
            .get('http://localhost:3020/v1/users', { params: { accountType: 'employers' } })
            .then(response => {
                // console.log(response, 'employers')
                setEmployersCount(response.data._meta.total)
           
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
        getTalents()
        getEmployers()
        if (localStorage.getItem('token')) {
            getUser()
        }
    }, [page, pageTalent])

    return (
        <div>
            <header className="position-sticky sticky-top">
                <nav className = "nav navbar d-flex" id='header'>
                    <div>
                        <nav className="nav container d-flex">
                            {user ? (
                                <Link to='/feed'>
                                    <img src = "./logo.jpg"/>
                                </Link>
                            ): (
                                <Link to='/'>
                                    <img src = "./logo.jpg"/>
                                </Link>
                            )}
                            <Link to='/about-us'className="flex-sm-fill text-sm-center nav-link mt-2" >{t('app.about_us')}</Link>
                            <Link to='/jobs' className="flex-sm-fill text-sm-center nav-link mt-2">{t('app.jobs')}</Link>
                            <Link to='/talents'className="flex-sm-fill text-sm-center nav-link mt-2">{t('app.talents')}</Link>
                        </nav>
                    </div>
                    <div className = "d-flex">
                        <div className = "d-flex justify-content space-between">
                        {user  ? ([
                                <Link to='/settings' key = 'setting' className="flex-sm-fill text-sm-center nav-link mt-2">Settings</Link>,
                                <Link to='/logout' key = "logOut" className="flex-sm-fill text-sm-center nav-link mt-2"
                                onClick={logout}>
                                    {t('app.signOut')}
                                    {/* Sign Out */}
                                </Link>
                            ]) :([
                                <Link to='/sign-in' key = 'signIn' className="flex-sm-fill text-sm-center nav-link mt-2">Sign In</Link>,
                                <Link to='/sign-up' key = "signUp" className="flex-sm-fill text-sm-center nav-link mt-2">Sign Up</Link>
                            ])}
                        </div>
                        <div className="form-group">
                            <select
                                defaultValue={language? language.toUpperCase() : 'EN'}
                                className="form-control text-white bg-transparent mt-2" id="sel1"
                                onChange={e => changeLanguage(e.target.value)}
                            >
                                <option>EN</option>
                                <option>AM</option>
                                <option>RU</option>
                            </select>
                        </div>
                    </div>
                </nav>
            </header>
            <Switch>
                {user ? (
                    <Route exact path = "/feed">
                        {user.accountType === 'employers' ? (
                            <Main
                                setAllJobs = {setAllJobs}
                                allJobs = {allJobs} 
                                getAllJobs = {getAllJobs}
                                setPage =  {setPage}
                                page = {page}
                                pageCount = {pageCount}
                                user = {user}
                                logout = {logout}/>
                        ): (
                            <MainUser
                                allJobs = {allJobs}
                                page = {page}
                                setPage = {setPage}
                                setQuery = {setQuery}
                                pageCount = {pageCount}
                                getAllJobs = {getAllJobs}
                            />
                        )
                       
                    }
                    </Route>
                ) : (
                    <Route exact path="/"> <Home
                        talentCount = {talentCount}
                        jobCount = {jobCount}
                        employersCount = {employersCount}
                        allJobs = {allJobs}
                        page = {page}
                        setPage = {setPage}
                        pageCount = {pageCount}
                    /> </Route>
                )}
                <Route path = "/about-us"> <AboutUs/> </Route>
                <Route path = "/jobs"> <Jobs
                    allJobs = {allJobs}
                    page = {page}
                    setPage = {setPage}
                    setQuery = {setQuery}
                    pageCount = {pageCount}
                    getAllJobs = {getAllJobs}
                /> </Route>
                <Route path = "/talents"> <Talents
                    allTalents = {allTalents}
                    getTalents = {getTalents}
                    setQuery = {setQuery}
                    pageTalent = {pageTalent}
                    setPageTalent = {setPageTalent}
                    talentPageCount = {talentPageCount}
                /> </Route>
                <Route path = "/sign-in"> <SignIn getUser={getUser}/> </Route>
                <Route path = "/sign-up"> <SignUp getUser={getUser}/> </Route>
                {user && (
                    // <>
                        <Route path = "/settings">
                            {user.accountType === 'employers' ? (
                                <EmployerSetting
                                    getUser = {getUser}
                                    setAllJobs = {setAllJobs}
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
                                    logout = {logout}
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
