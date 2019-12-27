import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
// import './EmployerSetting.scss'

const Main = ({allJobs, setPage, page, pageCount, getAllJobs, user, logout })=> {
    const getArchive = (jobId) => {

        axios
            .put(`http://localhost:3020/v1/jobs/${jobId}/archive`, null, {
                 headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                 }
            })
            .then(() => {
                return getAllJobs()
            })
            .catch((err)=>{
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
            .then(() => {
                return getAllJobs()
            })
            .catch(console.log)
    }

    const unArchive = (jobId) => {

        axios
            .put(`http://localhost:3020/v1/jobs/${jobId}/unarchive`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                return getAllJobs()
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
    }, [])

    return (

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
                    </div>
                    <div className = "col-md-11">
                        {allJobs.map((note, i) =>{
                            return ( 
                                <div className = "d-flex border-bottom" key={`note-${i}`} >
                                    <div className="d-flex">
                                        {note.logo && (
                                            <img 
                                                className = "mb-1 mt-3 ml-5 logo_img" 
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
                                            onClick = {()=> {
                                                return deleteJob(note.id)
                                            }}> 
                                            Delete
                                        </button>
                                    </div>
                                    <div className="mt-5 col-md-1">
                                        {note.isArchived === false ?
                                            <button
                                                className="btn btn-warning mb-1"
                                                style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}
                                                onClick = {()=> getArchive(note.id)}
                                                > 
                                                Archive
                                            </button>
                                            : 

                                        <button
                                            className="btn btn-success"
                                            style={{fontSize: 12+'px', fontWeight: 'bold', width: 90+'px'}}
                                            onClick = {()=> unArchive(note.id)}
                                            > 
                                            UnArchive
                                        </button>

                                        }
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
                                                <p> {number} </p>
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
                                                <p> {number} </p>
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
    )

}

export default Main