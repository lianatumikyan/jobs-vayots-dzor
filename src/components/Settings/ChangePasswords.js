import React, {useState } from 'react';
import axios from 'axios';

const ChangePassword = ({setChangePassword, user, logout}) => {
    const [errors, setErrors] = useState({ current: false, new: false, confirm: false })
    const [confirm, setConfirm] = useState('')
    const [changedPassword, setPassword] = useState({
        password: '',
        newPassword: ''
    })
    const getIcon = ()=> {
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 1;
    }
    
    const clearIcon = () =>{
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 0
    }
    const check = () => {
        axios
            .put('http://localhost:3020/v1/users/password', changedPassword, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                if(confirm !== changedPassword.newPassword){
                    throw new Error('Confirm your password correct')
                }
                if(response.data.errors){
                    if (!/(?=.*\d)(?=.*[a-z])(?=.*[!@#\\^&\])(?=.*[A-Z]).{6,}/.test(user.new)) {
                        setErrors({...errors, new: true, current: false, confirm: false})
                        return 
                    }
                    return  setErrors({...errors, current: true, new: false, confirm: false})
                }
                logout()
            })
            .catch((err) => {
                setErrors({...errors, current: false, new: false, confirm: true})
                console.log(err)
            })
    }
    return (
        <div className = "modal d-flex" onClick = {() => setChangePassword(false)}>
            <div 
                className = "main" 
                onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-center">
                    <h1>Change password</h1>
                </div>
                <form className="form-group col-lg-12">
                    <div id="input_container" className="form-group col mt-5">
                        <label className="currentPassword d-flex col">
                            <strong className="col-lg-5">Current password *</strong>
                            <input 
                                type="password" 
                                id="currentPassword" 
                                placeholder="Current password" 
                                required 
                                className="form-control"
                                onChange={(e) => setPassword({...changedPassword, password: e.target.value})}/>
                            {errors.current && !errors.new && !errors.confirm &&(
                                <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                    <i className="material-icons error_message_i position-relative" 
                                        id = "password_icon" 
                                        onMouseOver = {getIcon}
                                        onMouseOut = {clearIcon}>
                                            &#xe000;
                                    </i>
                                    <p className = "error_message_p position-absolute" style = {{width: 150+'px'}}> Invalid Password </p>
                                </span>
                            )}
                        </label>
                    </div>
                    <div id="input_container" className="form-group col d-flex mt-4 mb-1">
                        <label className="newPassword d-flex col">
                            <strong className="col-lg-5">New password *</strong>
                            <input 
                                type="password" 
                                id="newPassword"
                                placeholder="New password" 
                                required 
                                className="form-control"
                                onChange={(e) => setConfirm(e.target.value) } />
                            {errors.new && !errors.current && !errors.confirm &&(
                                <span className = "position-absolute" style = {{right: 0, top: 20+'%'}}>
                                    <i className="material-icons error_message_i position-relative" 
                                        id = "password_icon" 
                                        onMouseOver = {getIcon}
                                        onMouseOut = {clearIcon}>
                                            &#xe000;
                                    </i>
                                    <p className = "error_message_p position-absolute" style = {{width: 360+'px'}}><strong>Invalid Password !</strong> - password must be at least 6-char. long and must include lowercase and UPPERCASE letters.</p>
                                </span>
                            )}
                        </label>
                    </div>
                    <div className="form-group col d-flex mb-0 justify-content-end pr-4">
                        <p>*Password (UpperCase, LowerCase, Number/SpecialChar and min 6 Chars).</p>
                    </div>
                    <div id="input_container" className="form-group col d-flex mt-0">
                        <label className="confirmNewPassword d-flex col">
                            <strong className="col-lg-5">Confirm new password *</strong>
                            <input 
                                type="password" 
                                id="confirmNewPassword"
                                placeholder="Confirm new password" 
                                required 
                                className="form-control"
                                onChange={(e) => setPassword({...changedPassword, confirmPassword: e.target.value})} />
                            {!errors.new && !errors.current && errors.confirm &&(
                                <span className = "position-absolute" style = {{right: 16+'px', top: 20+'%'}}>
                                    <i className="material-icons error_message_i position-relative" 
                                        id = "password_icon" 
                                        onMouseOver = {getIcon}
                                        onMouseOut = {clearIcon}>
                                            &#xe000;
                                    </i>
                                    <p className = "error_message_p position-absolute" style = {{width: 150+'px'}}> Confirm your password correctly </p>
                                </span>
                            )}
                        </label>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="button" className="btn btn-success" onClick = {check}>Save changes</button>
                        <button type="button" className="btn btn-danger ml-2"
                            onClick = {()=> setChangePassword(false)}
                        >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChangePassword