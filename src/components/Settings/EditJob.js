import React, {useState, useEffect} from 'react';
import { useHistory,  useParams } from 'react-router-dom'
import axios from 'axios';

const EditJob = () => {

    const { jobId } = useParams()
    const history = useHistory()
    const [job, setJob] = useState([])
   
    const getJobs = () =>{

        axios
            .get(`http://localhost:3020/v1/jobs/${jobId}`)
            .then(response => {
                setJob(response.data.job)
            })
            .catch(console.log)
        }
 
    const [changejob, setchangeJob] = useState(null)
    const [location, setLocation] = useState(null)

    const [education, setEducation] = useState(null)
    const [benefits, setBenefit] = useState(null)
    const [responsibilities, setResponsibilities] = useState(null)

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

        axios
            .put(`http://localhost:3020/v1/jobs/${jobId}`, {
                ...changejob,
                info: { location, responsibilities: responsibilitiesCopy, benefits: benefitsCopy, educations: educationCopy }
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                history.push('/settings')
            })
            .catch(console.log)
    }

    const onLogoUpload = (e) => {
        const data = new FormData()
        data.append('logo', e.target.files[0]) 
        axios
            .put(`http://localhost:3020/v1/jobs/${job.id}/logo`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
                
            })
            .then((resp) => {
                // console.log(resp, 'resp')
                return getJobs()
            }) 
            .catch(console.log)
    }

    const onLogoDelete = () => {
        axios
            .delete(`http://localhost:3020/v1/jobs/${jobId}/logo`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                return getJobs()
            })
            .catch(console.log)
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

    const updateBenefits = (e, i) => {
        const newBenefit = [...benefits]
        newBenefit[i]={value: e.target.value}
        setBenefit(newBenefit)
    } 

    const addBenefits = () => {
        const newBenefit = [...benefits, ...[{value: ''}]]
        setBenefit(newBenefit)
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

    let gender = document.getElementsByName("gender");
    gender.forEach(data => {
        if(job.gender === data.value){
            data.setAttribute('checked', true)
        }
    })

    let job_time = document.getElementsByName('time');
    job_time.forEach(data => {
        if(job.type === data.value){
            data.setAttribute('checked', true)
        }
    })

    useEffect(() => {
        getJobs()
    }, [])

    useEffect(() => {
        setchangeJob(job)
        setLocation(job.location)
        setEducation(job.educations)
        setBenefit(job.benefits)
        setResponsibilities(job.responsibilities)
    }, [job])

    return (
        <div className = "setting_div">
        <div>
                    <h2>Work  info</h2>
                </div>
                <div className="img-wraps">
                    {job.logo ? (
                        <>
                        <img
                            src={`${job.logo}`} 
                            className="img-responsive"/>
                        <span  
                            className="closes" 
                            onClick = {onLogoDelete}>
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
                            onChange = {onLogoUpload}/>
                            </>
                    
                    )}
                </div> 
                { changejob && location  && 
                    <div className="col-md-8">
                        <div>
                            <label className="form-group d-flex mt-4">
                                <strong className="col-md-4">Title</strong>
                                <input 
                                    type="text" 
                                    value={changejob.title}
                                    className="form-control"
                                    onChange={(e) => setchangeJob({...changejob, title: e.target.value})}/>
                            </label>
                        </div>
                        <div>
                            <label className="form-group d-flex">
                                <strong className="col-md-4">Description</strong>
                                <input 
                                    type="text" 
                                    value = {changejob.description || ''}
                                    className="form-control"
                                    onChange={(e) => setchangeJob({...changejob, description: e.target.value})}/>
                            </label>
                        </div>
                        <div>
                            <label className="form-group d-flex mt-4">
                                <strong className="col-md-4">Vacancy</strong>
                                <input 
                                    type="text" 
                                    value={changejob.vacancy || ''}
                                    className="form-control"
                                    onChange={(e) => setchangeJob({...changejob, vacancy: e.target.value})}/>
                            </label>
                        </div>
                        <div>
                            <label className="form-group d-flex mt-4">
                                <strong className="col-md-4">Salary</strong>
                                <input 
                                    type="text" 
                                    value={changejob.salary || ''}
                                    className="form-control"
                                    onChange={(e) => setchangeJob({...changejob, salary: e.target.value})}/>
                            </label>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label className="col-sm-2">
                                    <strong>Work for </strong>
                                </label>
                                <label >
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value='male'
                                        onChange={(e) => setchangeJob({...changejob, gender: e.target.value})}/>
                                        Male
                                </label>
                                <label >
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        onChange={(e) => setchangeJob({...changejob, gender: e.target.value})}/>
                                        Female
                                </label>
                                <label >
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="any" 
                                        onChange={(e) => setchangeJob({...changejob, gender: e.target.value})}/>
                                        Any
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <label className="col-sm-2">
                                    <strong>Type of work</strong>
                                </label>
                                <label >
                                    <input 
                                        type="radio" 
                                        name="time" 
                                        value='partTime'
                                        onChange={(e) => setchangeJob({...changejob, type: e.target.value})}/>
                                        Part Time
                                </label>
                                <label >
                                    <input 
                                        type="radio" 
                                        name="time" 
                                        value="fullTime" 
                                        onChange={(e) => setchangeJob({...changejob, type: e.target.value})}/>
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
                                    value = {changejob.deadline || ''}
                                    onChange={(e) => setchangeJob({...changejob, deadline: e.target.value})} />
                            </label>
                        </div>
                        <div >
                            <label  className="form-group d-flex row">
                                <strong className="col-md-4">Location</strong>
                                <div className="col-md-8 p-1 d-flex ">
                                    <input 
                                        type="text" 
                                        value = {location.country || ''}
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
                }
        </div>
    )
}
export default EditJob;

