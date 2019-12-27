import React, {useState} from 'react'
import SignIn from './SignIn'
import axios from 'axios'

const SignUp = ({getUser}) => {

    const [signUp, showSignUp] = useState(false)
    const [signIn, showSignIn] = useState(false)
    const [errors, setErrors] = useState({ email: false, password: false })

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',  
        password: '',
        accountType: ''     
    })
    
    const check = () => {      
        axios
            .post('http://localhost:3020/v1/users', user)
            .then((response) => {
                // if(response.data.errors[0].message === 'err_email_must_be_unique'){
                //     setErrors({...errors, email: true, password: false})
                //     return
                // }
                if (!/(?=.*\d)(?=.*[a-z])(?=.*[!@#\\^&\])(?=.*[A-Z]).{6,}/.test(user.password)) {
                    setErrors({...errors, password: true, email: false})
                    return 
                }
                showSignIn(true) 
                showSignUp(false)
            })
            .catch(console.log)
    }

    const getIcon = ()=> {
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 1;
    }
    
    const clearIcon = () =>{
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 0
    }

    return (
        <div className = "perjob_body" style={{height: 600 + 'px'}}>
            { !signUp && !signIn && ( 
            <div className = "container perjob_body">
                <div className = "container d-flex justify-content-around row perjob_size text-center py-4 px-2">
                   <div className="card job_desc shadow-lg p-3 col-5">
                        <img 
                            className="card-img-top" 
                            src="https://secureservercdn.net/184.168.47.225/53a.daa.myftpupload.com/wp-content/uploads/2019/01/Employee-Motivation-2_Smaller-2-810x500.jpeg"  
                            alt="Card image cap"
                            style={{height: 60 + '%'}}/>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a>Looking to hire employees?</a>
                            </h4>
                            <p className="card-text">
                                GREAT ! Please, sign up as an Employer and get the opportunity to find and hire your best Employee here.
                            </p>
                            <div className = "d-flex justify-content-around">
                                <button 
                                    type="button" 
                                    className="btn btn-primary mt-4"  
                                    onClick = {()=>{
                                        showSignUp(true) 
                                        return setUser({accountType:'employers' })
                                    }} >
                                        Employer Account 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card job_desc shadow-lg p-3 rounded col-5">
                        <img className="card-img-top" 
                            src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"  
                            alt="Card image cap"
                            style={{height: 60 + '%'}}/>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a>Looking for a job?</a>
                            </h4>
                            <p className="card-text">
                            GREAT ! Please, sign up as an Employee and get the opportunity to find your dream job here.
                            </p>
                            <div className = "d-flex justify-content-around">
                                <button type="button" 
                                    className="btn btn-primary mt-4"  
                                    onClick = {()=>{
                                        showSignUp(true) 
                                        return setUser({accountType:'employee' })
                                    }}>
                                        Employee Account 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            {signUp && (
                <div id = "menu" 
                    className = "d-flex justify-content-center align-items-center" 
                    style = {{height: 600 +'px'}}>
                <div className = "card  container signPart"
                style = {{height: 380 +'px', width: 550 + 'px'}}>
                        <div className = "card-header mt-3">
                            <h3> Sign Up</h3>
                        </div>
                        <div className = "card-body">
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i style = {{fontSize:24+'px', width: 100+'%'}} className=" fa">&#xf007;</i>
                                        </span>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="firstName" 
                                        onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i style = {{fontSize:24+'px', width: 100+'%'}} className=" fa">&#xf007;</i>
                                        </span>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="lastName" 
                                        onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                                </div>
                                <div id="input_container" className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="material-icons">&#xe0be;</i>
                                        </span>
                                    </div>
                                    <input 
                                        type="email" 
                                        className="form-control position-relative" 
                                        placeholder="email" 
                                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                                    {errors.email && !errors.password &&(
                                        <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                            <i className="material-icons error_message_i position-relative" 
                                                id = "email_icon" 
                                                onMouseOver = {getIcon}
                                                onMouseOut = {clearIcon}>
                                                    &#xe000;
                                            </i>
                                            <p className = "error_message_p position-absolute p-2" style = {{width: 150+'px'}}> Email must be unique</p>
                                        </span>
                                    )}
                                    
                                </div>
                                <div id="input_container" className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="material-icons">lock</i>
                                        </span>
                                    </div>
                                    <input type="password" 
                                        className="form-control"
                                        id = "input"  
                                        placeholder="password" 
                                        required
                                        onChange={(e) => setUser({...user, password: e.target.value})}
                                        onKeyUp={(e) => {if (e.keyCode === 13) check()}}/>
                                    {errors.password && !errors.email &&(
                                        <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                            <i className="material-icons error_message_i position-relative" 
                                                id = "password_icon" 
                                                onMouseOver = {getIcon}
                                                onMouseOut = {clearIcon}
                                                >
                                                    &#xe000;
                                            </i>
                                            <p className = "error_message_p position-absolute p-2 ml-5" style = {{width: 360 + 'px', marginTop: -36 + 'px'}}><strong>Invalid Password !</strong> - password must be at least 6-char. long and must include lowercase and UPPERCASE letters.</p>
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button 
                                        type="button" 
                                        className="btn float-right login_btn" 
                                        onClick = {check} >
                                            Sign Up 
                                    </button>
                                </div>
                        </div>
                    </div>
        
                    </div>
            )}
            { signIn &&  (
                <SignIn
                    getUser = {getUser}
                />
            )}
        </div>       
    )
}
export default SignUp