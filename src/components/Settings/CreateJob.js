import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const CreateJob = () => {

    const history = useHistory()

    const [location, setLocation] = useState({
            country: '',
            city: '',
            state: '',
            zipCode: ''
    })

    const [benefits, setBenefit] = useState([])
    const [education, setEducation] = useState([])
    const [responsibilities, setResponsibilities] = useState([])
    const [errors, setErrors] = useState({ deadline: false})

    const [crateOnejob, setcreateJob] = useState({
        categoryId: "cf5ef2e7-b7da-41f9-af53-6ebc16a4e000",
        title: '',
        description: '',
        type: '', 
        vacancy: '',
        gender: '', 
        salary: '' ,
        deadline: '',
        info: ''   
    })
    
    const check = () => {
        
        const benefitsCopy = benefits.map(benefit => {
            return benefit.value
        })
    
        const educationCopy = education.map(edu => {
            return edu.value
        })
    
        const responsibilitiesCopy = responsibilities.map(resp => {
            return resp.value
        })

        let date = new Date();
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        
        axios
            .post('http://localhost:3020/v1/jobs', {
                ...crateOnejob,
                info: { location, responsibilities: responsibilitiesCopy, benefits: benefitsCopy, educations: educationCopy }
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                if(crateOnejob.deadline <= date){
                    throw new Error('dedaline must be a longer')
                }
                // history.push('/settings')
            })
            .catch((err)=>{
                console.log(err)
                return  setErrors({...errors, deadline: true})
            })
    }

    const updateBenefits = (e, i) => {
        const newBenefit = [...benefits]
        newBenefit[i]={value: e.target.value}
        setBenefit(newBenefit)
    } 

    const addBenefits = () => {
        const newBenefit = [...benefits, ...[{value: ''}]]
        setBenefit(newBenefit)
    }

    const updateEducation = (e, i) => {
        const newEducation = [...education]
        newEducation[i] = {value: e.target.value}
        setEducation(newEducation)
    }

    const addEducations = () => {
        const newEducation = [...education, ...[{value: ''}]]
        setEducation(newEducation)
    }

    const updateResponsibilities = (e, i) => {
        const newResponsibilities = [...responsibilities]
        newResponsibilities[i] = {value: e.target.value}
        setResponsibilities(newResponsibilities)
    }

    const addResponsibilities = () => {
        const newResponsibilities = [...responsibilities, ...[{value: ''}]]
        setResponsibilities(newResponsibilities)
    }

    const getIcon = ()=> {
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 1;
    }

    const clearIcon = () =>{
        const error_message_p = document.querySelector('.error_message_p')
        error_message_p.style.opacity = 0
    }

    useEffect(() => {
        setcreateJob({ ...crateOnejob, info: {location, responsibilities, benefits, education}})
    }, [location, benefits, education, responsibilities])

    return (
        <div className = "setting_div">
                <div>
                    <h2>Work  info</h2>
                </div>
                <div className="img-wraps">
                    <img 
                        className="img-responsive"
                        src='https://www.trzcacak.rs/myfile/detail/385-3856300_no-avatar-png.png'/>
                </div>
            <div className="col-md-8">
                <div>
                    <label className="form-group d-flex mt-4">
                        <strong className="col-md-4">Title</strong>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e) => setcreateJob({...crateOnejob, title: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Description</strong>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e) => setcreateJob({...crateOnejob, description: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex mt-4">
                        <strong className="col-md-4">Vacancy (number) </strong>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e) => setcreateJob({...crateOnejob, vacancy: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <label className="form-group d-flex mt-4">
                        <strong className="col-md-4">Salary</strong>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={(e) => setcreateJob({...crateOnejob, salary: e.target.value})}/>
                    </label>
                </div>
                <div className="col-md-6 ">
                    <div className="form-group" id = 'gender'>
                        <label className="col-sm-2">
                            <strong>Work for </strong>
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                name="gender" 
                                value='male'
                                onChange={(e) => setcreateJob({...crateOnejob, gender: e.target.value})}/>
                                Male
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                onChange={(e) => setcreateJob({...crateOnejob, gender: e.target.value})}/>
                                Female
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                name="gender" 
                                value="any" 
                                onChange={(e) => setcreateJob({...crateOnejob, gender: e.target.value})}/>
                                Any
                        </label>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <div className="form-group" id = 'type'>
                        <label className="col-sm-2">
                            <strong>Type of work</strong>
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                name="type" 
                                value='partTime'
                                onChange={(e) => setcreateJob({...crateOnejob, type: e.target.value})}/>
                                Part Time
                        </label>
                        <label >
                            <input 
                                type="radio" 
                                name="type" 
                                value="fullTime" 
                                onChange={(e) => setcreateJob({...crateOnejob, type: e.target.value})}/>
                                Full Time
                        </label>
                    </div>
                </div>
                <div>
                    <label className="form-group d-flex">
                        <strong className="col-md-4">Deadline</strong>
                        <input 
                            className="form-control" 
                            type = "date" 
                            // value = {changejob.dob || ''}
                            onChange={(e) => setcreateJob({...crateOnejob, deadline: e.target.value})} />
                        {errors.deadline &&(
                            <span className = "position-absolute" style = {{right: 0}}>
                            <i className="material-icons error_message_i position-relative" 
                                id = "password_icon" 
                                onMouseOver = {getIcon}
                                onMouseOut = {clearIcon}
                                >
                                    &#xe000;
                            </i>
                            <p className = "error_message_p position-absolute p-2 ml-5" style = {{width: 360 + 'px', marginTop: -36 + 'px'}}><strong>Invalid Deadline !</strong> - Deadline must be a longer.</p>
                        </span>
                        )}
                    </label>
                </div>
                <div >
                <label  className="form-group d-flex row">
                    <strong className="col-md-4">Location</strong>
                    <div className="col-md-8 p-1 d-flex ">
                        <input 
                            type="text" 
                            placeholder="Country" 
                            className="form-control"
                            onChange={(e) => setLocation({...location, country: e.target.value})    }/>
                        <input 
                            type="text" 
                            placeholder="State" 
                            className="form-control"
                            onChange={(e) => setLocation({...location, state: e.target.value})}/>
                        <input 
                            type="text" 
                            placeholder="City" 
                            className="form-control"
                            onChange={(e) => setLocation({...location, city: e.target.value})}/>
                        <input 
                            type="text" 
                            placeholder="Zip Code" 
                            className="form-control"
                            onChange={(e) => setLocation({...location, zipCode: e.target.value})}/>
                    </div>
                </label>
            </div> 
            <div>
                <label className="form-group d-flex mt-4">
                    <strong className="col-md-4">Benefit</strong>
                    {benefits && ( 
                        <div >
                            {benefits.map((item, i) => (
                                <div key={`benefits-${i}`}>
                                    <input 
                                        value={item.value}
                                        id = 'benefit'
                                        type="text" 
                                        className="form-control"
                                        onChange={e => updateBenefits(e, i)}/>
                                    <button 
                                        className='btn btn-danger'
                                        onClick={() => setBenefit(benefits.filter((elem,  index) => i !== index))}>
                                            -
                                    </button>
                                </div>
                            ))}
                            <button 
                                className="btn btn-default" 
                                onClick={() => addBenefits()}>
                                    +
                            </button>
                        </div>
                    )}
                </label>
{/* 
                <label className="form-group d-flex mt-4">
                    <strong className="col-md-4">Benefits</strong>
                    <input 
                        type="text" 
                        // value={job.salary}
                        className="form-control"
                        onChange={(e) => setBenefit(...benefits, [e.target.value])}/>
                </label> */}
            </div>
            <div>
                <label className="form-group d-flex mt-4">
                    <strong className="col-md-4">Education</strong>
                    {education && education.map((item, i) => (
                        <div key={`education-${i}`}>
                            <input 
                                value={item.value}
                                type="text" 
                                className="form-control"
                                onChange={e => updateEducation(e, i)}/>
                            <button 
                                className='btn btn-danger'
                                onClick={() => setEducation(education.filter((elem,  index) => i !== index))}>
                                    -
                            </button>
                        </div>
                    ))}
                    <button 
                        className="btn btn-default" 
                        onClick={() => addEducations()}>
                            +
                    </button>
                    {/* <strong className="col-md-4">Education</strong>
                    <input 
                        type="text" 
                        value={job.salary}
                        className="form-control"
                        onChange={(e) => setEducation(...educations, [e.target.value])}/> */}
                </label>
            </div>
            <div>
                <label className="form-group d-flex mt-4">
                    <strong className="col-md-4">Responsibilities</strong>
                    {responsibilities && responsibilities.map((item, i) => (
                        <div key={`responsibilities-${i}`}>
                            <input 
                                value={item.value} 
                                type="text" 
                                className="form-control"
                                onChange={e => updateResponsibilities(e, i)}/>
                            <button 
                                className='btn btn-danger'
                                onClick={() => setResponsibilities(responsibilities.filter((value, index) => i !== index))}>
                                    -
                            </button>
                        </div>
                    ))}
                    <button 
                        className="btn btn-default" 
                        onClick={() => addResponsibilities()}>
                            +
                    </button>
                    {/* <input 
                        type="text" 
                        // value={job.salary}
                        className="form-control"
                        onChange={(e) => setResponsibilities(...responsibilities, [e.target.value])}/> */}
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
                    onClick = {()=>{history.push('/settings')}}>
                        Cancel
                </button>
            </div>
                </div>
                </div>
    )
}

export default CreateJob