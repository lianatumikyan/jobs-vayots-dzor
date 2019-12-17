import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ChangePassword from './ChangePasswords'

const EmployeeSetting = ({ user, getUser }) => {

    const [changePassword, setChangePassword] = useState(false)

    const [changeUser, setChangeUser] = useState(user)
    const [location, setLocation] = useState(user.location)
    const [education, setEducation] = useState(user.info.educations)
    const [bio, setBio] = useState(user.info.bio)

    const [skills, setSkills] = useState(user.skills)


    const check = () => {
        axios
            .put('http://localhost:3020/v1/users',{
                ...changeUser,
                info: { location, education, bio }
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {

                // let gender = document.getElementsByName("gender");
                // gender.forEach(data => {
                //     if(user.gender === data.value.toLowerCase()){
                //         data.setAttribute('checked', true)
                //         return getUser()
                //     }
                // })
                // return getUser(), data.removeAttribute('checked', 'checked')


                // let gender = document.getElementsByName("gender");
                // gender.forEach(data => {
                //     if(user.gender == data.value.toLowerCase()){               
                        
                //         return getUser(), data.setAttribute('checked', 'checked')
                //     }
                    
                    // return getUser(), data.removeAttribute('checked', 'checked')
                // })
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    // const updateSkills = (e, i) => {
    //     console.log('updateskill')
    //     const newSkill = [...skills]
    //     newSkill[i] = e.target.value
    //     setSkills(newSkill)
    // } 

    let gender = document.getElementsByName("gender");
    gender.forEach(data => {
        if(user.gender === data.value.toLowerCase()){
            data.setAttribute('checked', true)
        }
    })

    

    return (
        <div className = "setting_div">
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
            <div className="col-md-6 ">
                <div className="form-group" id = 'gender'>
                    <label className="col-sm-2">
                        <strong>Gender</strong>
                    </label>
                    <label >
                        <input 
                            type="radio" 
                            name="gender" 
                            value='Male'
                            onChange={(e) => setChangeUser({...changeUser, gender: e.target.value})}/>
                            Male
                    </label>
                    <label >
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
                <label  className="form-group d-flex row">
                    <strong className="col-md-4">Location</strong>
                    <div className="col-md-8 p-1 d-flex ">
                        <input 
                            type="text" 
                            placeholder="Country" 
                            value =  {location.country }
                            className="form-control"
                            onChange={(e) => setLocation({...location, country: e.target.value})}/>
                        <input 
                            type="text" 
                            placeholder="State" 
                            value = {location.state}
                            className="form-control"
                            onChange={(e) => setLocation({...location, state: e.target.value})}/>
                        <input 
                            type="text" 
                            placeholder="City" 
                            value = {location.city}
                            className="form-control"
                            onChange={(e) => setLocation({...location, city: e.target.value})}/>
                        <input 
                            type="text" 
                            placeholder="Zip Code"
                            value = {location.zipCode} 
                            className="form-control"
                            onChange={(e) => setLocation({...location, zipCode: e.target.value})}/>
                    </div>
                </label>
            </div> 
            <div>
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
            </div>
            <div>
                <label className="form-group d-flex">
                    <strong className="col-md-4">Biography</strong>
                    <input 
                        type="text" 
                        className="form-control"
                        // value = {bio}
                        placeholder = 'Biography'
                        onChange={(e) => setBio(...bio, e.target.value)}/>
                </label>
            </div>
            <div >
                <label  className="form-group d-flex row" id = 'div_edu'>
                    <strong className="col-md-4">Education</strong>
                    <div className="col-md-8 p-1 d-flex " id= "edu">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value = {education.name}
                            className="form-control"
                            onChange={(e) => setEducation({...education, name: e.target.value})}/>
                        <input 
                            type="text" 
                            value = {education.degree}
                            placeholder="Degree" 
                            className="form-control"
                            onChange={(e) => setEducation({...education, degree: e.target.value})}/>
                        <input 
                            type="text" 
                            value = {education.date}
                            placeholder="Date" 
                            className="form-control"
                            onChange={(e) => setEducation({...education, date: e.target.value})}/>
                    </div>


                    {/* { && benefits.map((item, i) => (
                            <div key={`benefits-${i}`}>
                                <input 
                                    value={item.value}
                                    type="text" 
                                    className="form-control"
                                    onChange={e => updateBenefits(e, i)}/>
                                <button 
                                    className='btn btn-danger'
                                    onClick={() => setBenefit(benefits.filter(( index) => i !== index))}>
                                        -
                                </button>
                            </div> 
                        ))} */}
                        <button 
                            className="btn btn-default" 
                            onClick={() => {
                                let elmnt = document.getElementById("edu");
                                let div_elmnt = document.getElementById("div_edu");
                                let cln = elmnt.cloneNode(true);
                                div_elmnt.appendChild(cln);
                            }}>
                                +
                        </button>






                </label>
            </div>
            <div>
                <label className="form-group d-flex">
                    <strong className="col-md-4">Skills</strong>
                    {/* <input 
                        type="text" 
                        className="form-control"
                        onChange={(e) => setChangeUser({...changeUser, skill: e.target.value})}/> */}
                    
                        {console.log('start')}
                        
                        {skills && skills.map((item, i) => (
                            console.log('name', item, i)
                            // <div key={`skills-${i}`}>
                            //     {console.log('one step')}
                            //     <input 
                            //         type="text" 
                            //         value={item.name}
                            //         className="form-control"
                            //         onChange={e => updateSkills(e, i)}/>
                            //     {/* <input 
                            //         value={item.value}
                            //         type="text" 
                            //         className="form-control"
                            //         onChange={e => updateBenefits(e, i)}/> */}
                            //     <button 
                            //         className='btn btn-danger'
                            //         onClick={() => setSkills(skills.filter(( index) => i !== index))}>
                            //             -
                            //     </button>
                            // </div> 
                        ))}
                        {/* <button 
                            className="btn btn-default" 
                            onClick={() => setSkills([...skills, ''])}>
                                +
                        </button> */}


                </label>
            </div>
            <div id='div_lang' className = "d-flex row">
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
            </div>
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
                    onClick = {()=>{showEmployee(true)}}>
                        Cancel
                </button>
            </div>
        </div>
        </div>
            )}
    {changePassword && (
        <ChangePassword
            // changePassword = {changePassword}
        />
    )}
    </div>
    )
}

export default EmployeeSetting

// axios({
//     method: 'put',
//     headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     url: 'http://localhost:3020/v1/users/avatar',
//     data: {
//         data
//     }