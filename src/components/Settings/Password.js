import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Password = () => {
    const [checkCode, showCheckCode] = useState(false)
    const [reset, showReset] = useState(false)
    const [errors, setErrors] = useState({ email: false, password: false, code: false })
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    
    const getEmail = (e) => {
        setEmail(e.target.value)
    }
    const getCode = (e) =>{
        setCode(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }
    const forgotPassword = () =>{
        axios
            .put('http://localhost:3020/v1/users/forgot-password',{
                email: email   
            }  
            )
            .then(() => {
                showCheckCode(true)
            })
            .catch(()=>{
                return setErrors({...errors, email: true, password: false, code: false})
            })
    }

    const checkPassword = () =>{
        axios
            .post('http://localhost:3020/v1/users/password/check-code',{
                code: code,
                email: email
            }  
            )
            .then((response) => {
                localStorage.setItem('x-token', response.data.token)
                showReset(true)
                showCheckCode(false)
            })
            .catch((err)=>{
                if(err.message === 'Request failed with status code 400'){
                    setErrors({...errors, email: false, password: false, code: true})
                }
                return setErrors({...errors, email: true, password: false, code: false})
            })
    }

    const resetPassword = () =>{
        axios({
            method: 'post',
            headers: {
                'x-token': `${localStorage.getItem('x-token')}`
            },
            url: 'http://localhost:3020/v1/users/reset-password',
            data: {
              password: password
            }
          })
        .then(() => {
            console.log('you change password')
            history.push('/')
        })
        .catch(()=>{
            setErrors({...errors, new: true, current: false})
        })
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
        <div style={{backgroundColor: 'honeydew', height: 600+'px'}}>
            {!checkCode && !reset &&(
                <div className="container shadow-lg" style={{height: 550+'px'}}>
                    <div className="row-md-6 p-5">
                        <div className="col-md-4">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="text-center">
                                        <h3><i className="fa fa-lock fa-4x" style={{color: '#007BFF', fontSize: 72+'px'}}></i></h3>
                                        <h2 className="text-center">Forgot Your Password?</h2>
                                        <p>No Worries ! You can reset it here.</p>
                                        <div className="panel-body">
                                            <div id="input_container" className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <i className="glyphicon glyphicon-envelope color-blue"></i>
                                                    </span>
                                                    <input id="email" 
                                                        name="email" 
                                                        placeholder="Email address" 
                                                        value = {email} 
                                                        className="form-control" 
                                                        style={{borderRadius: 5 +'px'}} 
                                                        onChange = {getEmail}
                                                        type="email"/>
                                                    {errors.email && !errors.password && !errors.code &&(
                                                        <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                                            <i className="material-icons error_message_i position-relative" 
                                                                id = "password_icon" 
                                                                onMouseOver = {getIcon}
                                                                onMouseOut = {clearIcon}>
                                                                    &#xe000;
                                                            </i>
                                                            <p className = "error_message_p position-absolute ml-5" style = {{width: 120+'px', marginTop: -15 +'px'}}> Invalid Email </p>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    name="recover-submit" 
                                                    className="btn btn-lg btn-primary btn-block" 
                                                    onClick = {forgotPassword} 
                                                    value="Reset Password" 
                                                    type="submit"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        {checkCode && (
            <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    
                    <label>Code</label>
                    <div id="input_container"  className="form-group pass_show"> 
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange = {getCode}
                            placeholder="Current Password"/> 
                        {!errors.email && !errors.password && errors.code &&(
                                <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                    <i className="material-icons error_message_i position-relative" 
                                        id = "password_icon" 
                                        onMouseOver = {getIcon}
                                        onMouseOut = {clearIcon}>
                                            &#xe000;
                                    </i>
                                    <p className = "error_message_p position-absolute" style = {{width: 120+'px'}}> Invalid Email </p>
                                </span>
                            )}
                    </div> 
                       <label>Email</label>
                    <div id="input_container"  className="form-group pass_show"> 
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange = {getEmail}
                            placeholder="New Password"/> 
                        {errors.email && !errors.password && !errors.code &&(
                            <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                <i className="material-icons error_message_i position-relative" 
                                    id = "password_icon" 
                                    onMouseOver = {getIcon}
                                    onMouseOut = {clearIcon}>
                                        &#xe000;
                                </i>
                                <p className = "error_message_p position-absolute" style = {{width: 120+'px'}}> Invalid Email </p>
                            </span>
                        )}
                    </div> 
                    <div className="form-group">
                                <button type="button" 
                                className="btn float-right login_btn"  
                                onClick = {checkPassword}>
                                    Reset
                            </button>
                            </div>
                       
                    
                </div>  
            </div>
        </div>
        )}
        {reset && (
            <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    
                    <label>Current Password</label>
                    <div id="input_container"  className="form-group pass_show"> 
                        <input 
                            type="password" 
                            onChange = {getPassword}
                            className="form-control" 
                            placeholder="Current Password"/>
                        {!errors.email && errors.password && !errors.code &&(
                            <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                <i className="material-icons error_message_i position-relative" 
                                    id = "password_icon" 
                                    onMouseOver = {getIcon}
                                    onMouseOut = {clearIcon}>
                                        &#xe000;
                                </i>
                                <p className = "error_message_p position-absolute" style = {{width: 120+'px'}}> Invalid Email </p>
                            </span>
                        )} 
                    </div> 
                       
                    <div className="form-group">
                                <button type="button" 
                                className="btn float-right login_btn"  
                                onClick = {resetPassword}>
                                    Reset
                            </button>
                            </div>
                    
                </div>  
            </div>
        </div>
        )}
    </div>
    )
}
export default Password