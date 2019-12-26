import React, {useState, useEffect} from 'react'
import { useHistory,  useParams } from 'react-router-dom'
import axios from 'axios'
import ChangePassword from './ChangePasswords'

const EmployeeSetting = ({ user, getUser, logout }) => {
    
    const history = useHistory()
    const [changePassword, setChangePassword] = useState(false)
    const [changeUser, setChangeUser] = useState(user)

    // console.log(user, 'user')

    const [location, setLocation] = useState(null)
    const [skills, setSkills] = useState(null)
    const [education, setEducation] = useState(null)
    const [bio, setBio] = useState(null)

    const check = () => {

        const skillsCopy = skills.map(skill => {
            return skill.name
        })
        console.log(bio, 'bio')

        axios
            .put('http://localhost:3020/v1/users',{
                ...changeUser,
                info: { location, skills: skillsCopy, education, bio }
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((data) => {
                console.log(data, 'data')
                // history.push('/')
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

    const updateSkills = (e, i) => {
        const newSkills = [...skills]
        newSkills[i] = {name: e.target.value}
        setSkills(newSkills)
    }

    const addSkills = () => {
        const newSkills = [...skills, ...[{name: ''}]]
        setSkills(newSkills)
    }

    const updateEducation = (e, i) => {
        const newEducation = [...education]
        newEducation[i] = {value: e.target.value}
        setEducation(newEducation)
    }

    const addEducations = () => {
        const newEducation = [...education, ...[{name: '', date: '', degree: ''}]]
        setEducation(newEducation)
    }

    let gender = document.getElementsByName("gender");
    gender.forEach(data => {
        if(user.gender === data.value.toLowerCase()){
            data.setAttribute('checked', true)
        }
    })

    useEffect(() => {
        // if(user.info !== null){
            setSkills(user.info.skills)
            setBio(user.info.bio)
            setEducation(user.info.educations)
        // }
        // setLocation(user.location)
    }, [])

    return (
        
        <div className = "setting_div">
            {/* {user && ( */}
                {/* <div> */}

            {!changePassword && ( 
                <div>
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
                            onChange={(e) => setChangeUser({...changeUser, firstName: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Last name</strong>
                        <input 
                            type="text" 
                            value = {changeUser.lastName}
                            className="form-control"
                            onChange={(e) => setChangeUser({...changeUser, lastName: e.target.value})}/>
                    </label>
                </div>
                <div className="form-group mb-3" id = 'gender'>
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
                {/* <div >
                    <label  className="form-group d-flex">
                        {console.log(user)}
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
                                // value = {location.state || ''}
                                className="form-control"
                                onChange={(e) => setLocation({...location, state: e.target.value})}/>
                            <input 
                                type="text" 
                                placeholder="City" 
                                // value = {location.city || ''}
                                className="form-control"
                                onChange={(e) => setLocation({...location, city: e.target.value})}/>
                            <input 
                                type="text" 
                                placeholder="Zip Code"
                                // value = {location.zipCode || ''} 
                                className="form-control"
                                onChange={(e) => setLocation({...location, zipCode: e.target.value})}/>
                        </div>
                    </label>
                </div>  */}
            {/* <div>
                <label className="form-group d-flex">
                    <strong className="col-md-4">Phone number</strong>
                    <input 
                        type="tel" 
                        placeholder = 'Format: 094-521-521'
                        value = {changeUser.phone || ''}
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        style={{fontStyle: 'italic', fontSize: 'small'}} 
                        className="form-control" 
                        onChange={(e) => setChangeUser({...changeUser, phone: e.target.value})}/>
                </label>
            </div> */}
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Biography</strong>
                        <input 
                            type="text" 
                            value={bio || ''}
                            id = 'bio'
                            className="form-control"
                            placeholder = 'Biography'
                            onChange={(e) => setBio(e.target.value)}/>
                    </label>
                </div>
                {/* <div >
                    <label  className="form-group d-flex">
                        <strong className="col-md-4">Education</strong>
                        {education.map((item, i) => {
                            <div key = {`education-${i}`}> */}
                                {/* <div className="col-md-8 p-1 d-flex ">
                                    <input 
                                        type="text" 
                                        placeholder="Name" 
                                        // value =  {item[i].name }
                                        className="form-control"
                                        onChange = {(e) => updateEducation(e, i)}/> */}
                                        {/* // onChange={(e) => setEducation({...education, name: e.target.value})}/> */}
                                    {/* <input 
                                        type="text" 
                                        placeholder="Date" 
                                        // value = {item[i].date}
                                        className="form-control"
                                        onChange = {(e) => updateEducation(e, i)}/> */}
                                        {/* onChange={(e) => setEducation({...education, date: e.target.value})}/> */}
                                    {/* <input 
                                        type="text" 
                                        placeholder="Degree" 
                                        // value = {item[i].degree}
                                        className="form-control"
                                        onChange = {(e) => updateEducation(e, i)}/> */}
                                        {/* onChange={(e) => setEducation({...education, degree: e.target.value})}/> */}
                                {/* </div>
                                <button 
                                    className='btn btn-danger'
                                    onClick={() => setEducation(education.filter(( index) => i !== index))}>
                                        -
                                </button>

                            </div>
                        })}
                        <button 
                            className="btn btn-default" 
                            onClick={() => addEducations()}>
                                +
                        </button>
                    </label>
                </div> */}

            <div>
                <label className="form-group d-flex">
                    <strong className="col-md-4">Skills</strong>
                    {skills.map((item, i) => (
                        <div key={`skills-${i}`}>
                            <input 
                                type="text" 
                                value={item.name}
                                id = 'skills'
                                className="form-control"
                                onChange={(e) => updateSkills(e, i)}/>
                            <button 
                                className='btn btn-danger'
                                onClick={() => setSkills(skills.filter((elem,  index) => i !== index))}>
                                    -
                            </button>
                        </div>
                    ))}
                    <button 
                        className="btn btn-default" 
                        onClick={() => addSkills()}>
                            +
                    </button>
                </label>
            </div>
            {/* <div id='div_lang' className = "d-flex row">
                <label  className="form-group ">
                    <strong className="col-md-4">Languages</strong>
                    <div className="col-md-8 p-1 d-flex " id='lang'>
                        <select className="form-control">
                            <option>Language type must be from axios</option>
                        </select>
                        <select className="form-control col-md-6 mx-2">
                            <option>Language level must be from axios</option>
                        </select>
                    </div>
                </label>
                <button 
                    className="btn btn-default" 
                    onClick={() => {
                        let elmnt = document.getElementById("lang");
                        let div_elmnt = document.getElementById("div_lang");
                        let cln = elmnt.cloneNode(true);
                        div_elmnt.appendChild(cln);
                    }}>
                        +
                </button>
            </div> */}
            <div>
                <label className="form-group d-flex mt-4">
                    <strong className="col-md-4" onClick = {() => setChangePassword(true)}>Change Password</strong>
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
                    onClick = {()=> history.push('/')}>
                        Cancel
                </button>
            </div>
        </div>
    </div>)}
    {changePassword && (
        <ChangePassword
            user = {user}
            setChangePassword = {setChangePassword}
            logout = {logout}
        />
    )}
    </div>
            // )}
            // </div>
    )
    
    
}

export default EmployeeSetting

{/* </div> */}
                {/* </div> */}
            {/* // )}
    // ) */}