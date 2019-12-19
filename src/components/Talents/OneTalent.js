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
                        {talent.dob && talent.gender && (
                            <div className = "my-4 flex row justify-content-around">
                                <div className = "col-4">
                                    <p > Gender</p>
                                    <p > Date of birth</p>
                                    <p> Location </p>
                                </div>
                                <div className = "col-6">
                                    <p > {talent.gender} </p>
                                    <p > {talent.dob} </p>
                                    <p> {talent.location.country} {talent.location.state} {talent.location.city} {talent.location.zipCode} </p>
                                </div>
                            </div>
                        )}
                        <div className = "m-4  ">
                            <div>
                                {console.log(talent)}
                      
                                <h4>Biography</h4>
                                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of 
                                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                                    software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                            
                            <div>
                                <h4> Skills</h4>
                                <p> Skills name must be from axios</p>
                            </div>
                            <div>
                                <h4> Education</h4>
                                <div className = "d-flex justify-content-between">
                                    <p> Education name must be from axios</p>
                                    <p> Education date must be from axios</p>
                                    <p> Education degree must be from axios</p>
                                </div>
                            </div>
                            <div>
                                <h4> Languages</h4>
                                <div className="d-flex row">
                                    <div className = "col">
                                        <p>Language type must be from axios</p>
                                    </div>
                                    <div className = "col">  
                                        <p>Language level must be from axios</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )}
            
        </div>
        
    )
}

export default OneTalent