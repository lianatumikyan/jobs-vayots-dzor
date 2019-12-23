import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Password from '../Settings/Password'
import axios from 'axios'

const SignIn = ({ getUser }) => {
    const [passwordPage, showPassword] = useState(false)
    const [signIn, showSignIn] = useState(true)
    const [errors, setErrors] = useState({ email: false, password: false })
    const history = useHistory()
    const forgotPassword = () =>{
        showPassword(true)
        showSignIn(false)
    }
    const [user, setUser] = useState({
        email: '',  
        password: ''
    })
    const check = () => {
        axios
            .post('http://localhost:3020/v1/users/login', user)
            .then(item => {
                localStorage.setItem('token', item.data.token.access)
                localStorage.setItem('id', item.data.user.id)
                getUser()
                history.push('/feed')
            })
            .catch(()=>{
                return  setErrors({...errors, email: true, password: false}) || setErrors({...errors, email: false, password: true})
            })
    }

    return (
        <div>
            {passwordPage && (
                <Password/>
            )}
            {signIn &&(
                <div id = "menu" 
                    className = "d-flex align-items-center" 
                    style = {{height: 600 +'px'}}>
                <div className = "d-flex justify-content-center card container signPart" 
                    style = {{height: 380 +'px', width: 550 + 'px'}}>
                    <div className = "card-header mt-3">
                        <h3> Sign In</h3>
                    </div>
                    <div className = "card-body">
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="material-icons">&#xe0be;</i>
                                    </span>
                                </div>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="email" 
                                    required
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    />
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
                                <span className="input-group-text">
                                    <i className="fa-eye fa-eye-slash"></i>
                                </span>
                            </div>
                            {errors.password &&(
                                <div style ={{color: 'red', fontSize: 14 + 'px'}} className = 'mb-2'>
                                    <i className="material-icons" >&#xe000;</i>
                                    <span>Invalid Credentials</span>
                                </div>
                            )}
                            {errors.email &&(
                                <div style ={{color: 'red', fontSize: 14 + 'px'}} className = 'mb-2'>
                                    <i className="material-icons" >&#xe000;</i>
                                    <span>Invalid Credentials</span>
                                </div>
                            )}
                            <div className="row align-items-center remember">
                                <label>
                                    <input type="checkbox"/>Remember Me
                                </label>
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn float-right login_btn" 
                                    onClick={check}>
                                        Sign In
                                </button>
                            </div>
                    </div>
                    <div className="card-footer mb-4">
                        <div className="d-flex justify-content-center">
                            <a href="#" 
                                style = {{color: 'white'}} 
                                onClick = {forgotPassword}>
                                    <u>Forgot your password ?</u>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
 
            )}
        </div>
        
    )
}
export default SignIn