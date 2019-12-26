import React, {useState, useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import axios from 'axios'

const OneTalent = () => {

    const { talentId } = useParams()
    const [talent, showTalent] = useState(null)

    const getOneTalent = () =>{
        axios
            .get(`http://localhost:3020/v1/users/${talentId}`)
            .then(response => {
                showTalent(response.data.user)
            })
            .catch(console.log)
    }
    
    useEffect(() => {
        getOneTalent()
    }, [])
    
    return (
        <div>
            {talent &&(
                <div className = "d-flex justify-content-around row perjob_size ">
                    <div  className = "job_desc shadow-lg p-3  bg-white rounded col-8">
                        <div className = "d-flex justify-content-around mb-5 p-3" >
                            <div>
                                {talent.avatar ? (
                                    <img className = "job_image_size"  src = {talent.avatar}/>
                                ):(
                                    <img className = "job_image_size" 
                                        src = "https://jobinformation.info/wp-content/uploads/2019/08/recruitment-3942378_1920.jpg"
                                        />                         

                                )}
                            </div>
                            <div>
                                <h3> {talent.firstName} </h3>
                                <h5> {talent.lastName} </h5>
                            </div>                 
                        </div>
                        {talent.gender && (
                            <div>
                                <span> Gender </span>
                                <span> {talent.gender} </span>
                            </div>
                        )}
                        {talent.dob && (
                            <div>
                                <span> Date of birth </span>
                                <span> {talent.dob} </span>
                            </div>
                        )}
                        {talent.location && (
                            <div>
                                <span> Location </span>
                                <span> {talent.location.country} {talent.location.state} {talent.location.city} {talent.location.zipCode} </span>
                            </div>
                        )}
                    
                        <div className = "m-4  ">
                            {talent.info.bio && (
                                <div>
                                    <h4>Biography</h4>
                                    <p> {talent.info.bio} </p>
                                </div>
                            )}
                            {talent.info.skills.length !==0 && (
                                <div>
                                    <h4> Skills</h4>
                                    {talent.info.skills.map((skill, i) => {
                                        return (<p key = {`skill-${i}`}> {skill.name} </p>)
                                    })}
                                    
                                </div>
                            )}
                            {talent.info.educations.length !==0 && (
                                <div>
                                    <h4> Education</h4>
                                    {talent.info.educations.map((edu, i) => {
                                        return (
                                            <div key = {`edu-${i}`} className = "d-flex justify-content-between">
                                                <p> {edu.name}  </p>
                                                <p> {edu.date} </p>
                                                <p> {edu.degree} </p>
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                            )}
                            {/* <div>
                                <h4> Languages</h4>
                                <div className="d-flex row">
                                    <div className = "col">
                                        <p>Language type must be from axios</p>
                                    </div>
                                    <div className = "col">  
                                        <p>Language level must be from axios</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OneTalent