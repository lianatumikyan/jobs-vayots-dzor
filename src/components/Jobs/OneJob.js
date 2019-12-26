import React, {useState, useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import axios from 'axios'

const OneJob = () => {

    const { oneJobId } = useParams()

    const [job, setJob] = useState([])
    const [location, setLocation] = useState(null)
    const [user, setUser] = useState(null)

    const getJobs = () =>{
        axios
            .get(`http://localhost:3020/v1/jobs/${oneJobId}`)
            .then(response => {
                setJob(response.data.job)
                // console.log(response)
                setLocation(response.data.job.location)
                setUser(response.data.job.user)
            })
            .catch(console.log)
    }
    
    useEffect(() => {
        getJobs()
    }, [])

    useEffect(() => {
        setLocation(job.location)
        setUser(job.user)
    }, [job])

    return (
        <div>
            {job && location && user &&(
                    <div className = "d-flex justify-content-around row perjob_size ">

                    <div className = "shadow-lg col-8">
                        <div className = "d-flex justify-content-around mb-5 p-3" >
                            <div>
                                <img
                                    className = "job_image_size"
                                    src = "https://jobinformation.info/wp-content/uploads/2019/08/recruitment-3942378_1920.jpg"/>
                            </div> 
                            <div>
                                <h3> {job.title}</h3>
                                <h5> Creator {job.user.firstName} {job.user.lastName} </h5>
                            </div>
                            <div>
                                <p className = "text-danger"> Deadline: {job.deadline}</p>
                            </div>
                        </div>
                        <div className = "my-4 flex row justify-content-around">
                            <div className = "col-4">
                                <p>Job Type</p>
                                <p>Vacancy</p>
                                <p>Who can apply</p>
                                <p>Salary</p>
                                <p>Job Location</p>
                            </div>
                            <div className = "col-6">
                                <p>{job.type}</p>
                                <p>{job.vacancy}</p>
                                <p>{job.gender}</p>
                                <p>{job.salary}</p>
                                <p>{job.location.country} {job.location.state} {job.location.city} {job.location.zipCode}  </p>
                            </div>
                        </div>
                        <div className = " m-4">
                            <h4>Job Description</h4>
                            <p> {job.description} </p>
                        </div>
                        {job.educations[0].value.length !== 0 && (
                            <div className = "m-4">
                                <h4>Educations</h4>
                                {job.educations.map((education, i) => {
                                    return (<p key = {`message-${i}`}> {education.value} </p>)
                                })}
                            </div>
                        )}
                        {job.responsibilities[0].value.length !== 0 && (
                            <div className = "m-4">
                                <h4>Responsibilities</h4>
                                {job.responsibilities.map((resp, i) => {
                                    return (<p key = {`message-${i}`}> {resp.value} </p>)
                                })}
                            </div>
                        )}
                        {job.benefits[0].value.length !== 0 && (
                            <div className = "m-4">
                                <h4>Other Benefits</h4>
                                {job.benefits.map((benefit, i) => {
                                    return (<p key = {`message-${i}`}> {benefit.value} </p>)
                                })}
                            </div>
                        )}
                    </div>
                </div>
        )} 
        </div>
    )
}

export default OneJob