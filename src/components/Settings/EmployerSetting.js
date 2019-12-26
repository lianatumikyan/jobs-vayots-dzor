import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import ChangePassword from './ChangePasswords';
import axios from 'axios'
import './EmployerSetting.scss'

const EmployerSetting = ({ getUser, user, logout }) => {

    const [changePassword, setChangePassword] = useState(false)
    const [changeUser, setChangeUser] = useState(user)
    const [location, setLocation] = useState(user.location)
    const [bio, setBio] = useState(null)

    const history = useHistory()

    const check = () => {

        axios
            .put('http://localhost:3020/v1/users',{
                ...changeUser,
                info: { location, bio }
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                history.push('/feed')
                return getUser()
            })
            .catch(console.log)
            
    }

    const onImageUpload = (e) => {
        const data = new FormData()
        data.append('avatar', e.target.files[0]) 
        axios
            .put('http://localhost:3020/v1/users/avatar', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/octet-stream'
                }
            })
            .then(() => getUser())
            .catch(console.log)
    }

    const onImageDelete = () => {
        axios
            .delete('http://localhost:3020/v1/users/avatar', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => getUser())
            .catch(console.log)
    }

    useEffect(() => {
        if(user.info !== null){

            setBio(user.info.bio)
        }

    }, [user.info])

    let gender = document.getElementsByName("gender");
    gender.forEach(data => {
        if(user.gender === data.value.toLowerCase()){
            data.setAttribute('checked', true)
        }
    })

    return (
        <div className = "position-relative setting_div" style = {{height: 700+'px'}}>
            <div className="col-md-9 d-flex justify-content-end">
                <label className="form-group d-flex mt-4">
                    <strong className="row_password" style={{cursor: 'pointer'}} onClick = {() => setChangePassword(true)}>Change Password</strong>
                </label>
            </div>
            <div>
                <h2>Profile info</h2>
            </div>
            <div className="img-wraps">
                {user.avatar ? (
                    <>
                    <img
                        src={`${user.avatar}`} 
                        className="img-responsive"/>
                    <span  
                        className="closes" 
                        onClick = {onImageDelete}>
                            &times;
                    </span>
                    </>
                ) : (
                    <>
                    <img 
                        className="img-responsive"
                        src={'https://www.trzcacak.rs/myfile/detail/385-3856300_no-avatar-png.png'}/>
                    <input 
                        type = "file" 
                        className="position-absolute "
                        onChange = {onImageUpload}/>
                        </>
                )}
            </div>
            <div className = "col-md-10">
                <div>
                    <label className="form-group d-flex mt-4">
                        <strong className="col-md-4">First name</strong>
                        <input 
                            type="text" 
                            value={changeUser.firstName}
                            className="form-control"
                            onChange={(e) => setChangeUser({...changeUser, firstName: e.target.value})}
                            />
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Last name</strong>
                        <input 
                            type="text" 
                            value = {changeUser.lastName}
                            className="form-control"
                            onChange={(e) => setChangeUser({...changeUser, lastName: e.target.value})}
                            />
                    </label>
                </div>
                <div className="from-group mb-3" id = 'gender'>
                    <label className="col-md-4">
                        <strong>Gender</strong>
                    </label>
                    <label className = 'mr-3'>
                        <input 
                            type="radio" 
                            name="gender" 
                            value='Male'
                            onChange={(e) => setChangeUser({...changeUser, gender: e.target.value})}/>
                            Male
                    </label>
                    <label className = 'mr-3'>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="Female" 
                            onChange={(e) => setChangeUser({...changeUser, gender: e.target.value})}/>
                            Female
                    </label>
                    <label >
                        <input 
                            type="radio" 
                            name="gender" 
                            value="Other" 
                            onChange={(e) => setChangeUser({...changeUser, gender: e.target.value})}/>
                            Other
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Date of birth</strong>
                        <input 
                            className="form-control" 
                            type = "date" 
                            value = {changeUser.dob || ''}
                            onChange={(e) => setChangeUser({...changeUser, dob: e.target.value})} />
                    </label>
                </div>
                <div >
                    <label  className="form-group d-flex">
                        <strong className="col-md-4">Location</strong>
                        <div className="col-md-8 p-0 d-flex ">
                            <input 
                                type="text" 
                                placeholder="Country" 
                                value =  {location.country || ''}
                                className="form-control"
                                onChange={(e) => setLocation({...location, country: e.target.value})}/>
                            <input 
                                type="text" 
                                placeholder="State" 
                                value = {location.state || ''}
                                className="form-control"
                                onChange={(e) => setLocation({...location, state: e.target.value})}/>
                            <input 
                                type="text" 
                                placeholder="City" 
                                value = {location.city || ''}
                                className="form-control"
                                onChange={(e) => setLocation({...location, city: e.target.value})}/>
                            <input 
                                type="text" 
                                placeholder="Zip Code"
                                value = {location.zipCode || ''} 
                                className="form-control"
                                onChange={(e) => setLocation({...location, zipCode: e.target.value})}/>
                        </div>
                    </label>
                </div> 
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Biography</strong>
                        <textarea
                            value={bio || ''}
                            className="form-control"
                            placeholder = 'Biography'
                            onChange={(e) => setBio(e.target.value)}>
                        </textarea>
                    </label>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button 
                        type="button" 
                        className="btn btn-success"
                        onClick = {check}>
                            Save
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger ml-2" 
                        onClick = {()=> history.push('/feed')}>
                            Cancel
                    </button>
                </div>
            {/* )} */}
            </div>
            {changePassword && (
                <ChangePassword
                    user = {user}
                    setChangePassword = {setChangePassword}
                    logout = {logout}
                />
            )}
        </div>
       
    )
}

export default EmployerSetting