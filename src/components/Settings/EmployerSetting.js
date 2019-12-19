import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ChangePassword from './ChangePasswords';
import axios from 'axios'
import './EmployerSetting.scss'

const EmployerSetting = ({ allJobs, setPage, page, pageCount, user, getAllJobs, logout }) => {

    const [changePassword, setChangePassword] = useState(false)

    const getArchive = (jobId) => {

        console.log(jobId, 'jobId')

        axios
            .put(`http://localhost:3020/v1/jobs/${jobId}/archive`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((responce) => {
                console.log('its okay', responce)
            })
            .catch((err)=>{
                console.log({'Authorization': `Bearer ${localStorage.getItem('token')}`})
                console.log('kj', err)
            })

    }

    const deleteJob = (jobId) => {

        axios
            .delete(`http://localhost:3020/v1/jobs/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                console.log('resp', resp)
                // return getJobs()
            })
            .catch(console.log)
    }

    const unArchive = (jobId) => {

        axios
            .put(`http://localhost:3020/v1/jobs/${jobId}/unarchive`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                return getJobs()
            })
            .catch(console.log)
    }

    const pageLimit = 5
    const pageNumbers = [];
    const staticPageNumbers = [1, 2, 3, 4, 5]

    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    useEffect(()=>{
        getAllJobs()
        // getArchive()
    }, [])

    return (

        <div className = "position-relative ">
            {/* {
                <div  className = "setting">
                    <div className = "col-md-10 d-flex mb-5 justify-content-center">
                        <div className="d-flex job col-md-4">
                            <p className = "createJob"><strong>Create New Job !</strong></p>
                        </div>
                        <div className="col-md-1 mt-3">
                            <Link to = '/create_job' >
                                <button type="button" className="btn btn-success check">
                                    <strong >+</strong>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <label className="form-group d-flex mt-4">
                                <strong className="col-md-4" onClick = {() => setChangePassword(true)}>Change Password</strong>
                            </label>
                        </div>
                    </div>
                    <div className = "col-md-11">
                        {allJobs.map((note, i) =>{
                            return ( 
                                <div className = "d-flex border-bottom m-4" key={`note-${i}`} >
                                    <div className="d-flex col-md-2">
                                        <img className="mb-3" 
                                            // src = {note.logo}
                                            src = "data:image/png;base64,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"/>                         
                                    </div>
                                    <div className="col-md-3 mt-2 mb-2">
                                        <h6>{note.title}</h6>
                                        <p>Name ???</p>
                                    </div>
                                    <div className="col-md-3 mt-2 mb-2">
                                        <p> Location: {note.location.city}</p>
                                        <p> Deadline: {note.deadline}</p>
                                    </div>
                                    <div className="mt-5 col-md-3">
                                        <Link to = {`/settings${note.id}`} >
                                            <button className="btn btn-info" 
                                                style={{fontSize: 14+'px', fontWeight: 'bold'}}>
                                                Edit &raquo;
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div> */}
                     {
                <div  className = "setting">
                    <div className = "col-md-10 d-flex mb-5">
                        <div className="d-flex job col-md-3 justify-content-start">
                            <p className = "createJob"><strong>Create New Job !</strong></p>
                        </div>
                        <div className="col-md-1 mt-4">
                            <Link to = '/create_job' >
                                <button type="button" className="btn btn-success check" style={{borderRadius: 50+'%'}}>
                                    <strong >+</strong>
                                </button>
                            </Link>
                        </div>
                        <div className="col-md-9 d-flex justify-content-end">
                            <label className="form-group d-flex mt-4">
                                <strong className="row_password" style={{cursor: 'pointer'}} onClick = {() => setChangePassword(true)}>Change Password</strong>
                            </label>
                        </div>
                    </div>
                    <div className = "col-md-11">
                        {allJobs.map((note, i) =>{
                            return ( 
                                <div className = "d-flex border-bottom" key={`note-${i}`} >
                                    <div className="d-flex">
                                        {note.logo && (
                                            <img 
                                                className = "mb-1 mt-3 ml-5" 
                                                src = {note.logo}
                                                />                         
                                        )}
                                        {!note.logo && (
                                            <img 
                                                className = "mb-1 mt-3 ml-5" 
                                                src = "https://jobinformation.info/wp-content/uploads/2019/08/recruitment-3942378_1920.jpg"/>
                                        )}
                                    </div>
                                    <div className="col-md-4 mt-5 ml-2">
                                        <h6>{note.title}</h6>
                                        <p>Name</p>
                                    </div>
                                    <div className="col-md-4 mt-5">
                                        <p> Location: {note.location.city}</p>
                                        <p> Deadline: {note.deadline}</p>
                                    </div>
                                    <div className="mt-5 col-md-1">
                                        <Link to = {`/settings${note.id}`} >
                                            <button className="btn btn-info mb-1" 
                                                style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}>
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}
                                            onClick = {(e)=> {
                                                console.log(note.id)
                                                return deleteJob(note.id)
                                            }}> 
                                            Delete
                                        </button>
                                    </div>
                                    <div className="mt-5 col-md-1">
                                        <button
                                            className="btn btn-warning mb-1"
                                            style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}
                                            onClick = {(e)=> getArchive(note.id)}
                                            > 
                                            Archive
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}
                                            onClick = {(e)=> unArchive(note.id)}
                                            > 
                                            UnArchive
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className = "pagination d-flex justify-content-center" style={{marginTop: 30+'%'}}>
                        {page > 1 && (
                            <button onClick={() => setPage(page - 1)}>
                                Previous
                            </button>
                        )}
                        {pageCount > 1 && (
                            <div className = "pagination d-flex justify-content-center">
                                {pageLimit >= pageCount && (
                                    pageNumbers.map((number, e) => {
                                        if(page === number) {
                                            return (
                                            <div key = {number} className = 'active d-flex align-items-center' onClick={() => setPage(number)}>
                                                <p> {number} </p>
                                            </div>
                                            ) 
                                        }
                                        return (
                                            <div key = {number} className = 'page_div' onClick={() => setPage(number)}>
                                                <p id = 'name'> {number} </p>
                                            </div>
                                            ) 
                                    })
                                )}
                                {pageLimit< pageCount && (
                                    staticPageNumbers.map(number => {
                                        if(page === number) {
                                            return (
                                            <div key = {number} className = 'active d-flex align-items-center' onClick={() => setPage(number)}>
                                                <p> {number} </p>
                                            </div>
                                            ) 
                                        }
                                        return (
                                            <div key = {number} className = 'page_div' onClick={() => setPage(number)}>
                                                <p id = 'name'> {number} </p>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        )}
                        {page < pageCount && (
                            <button onClick={() => setPage(page + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            }
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