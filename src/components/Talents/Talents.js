import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Talent.scss'

const Talents = () => {

    const [notes, setNotes] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(null)

    const getTalents = () => {
        const limit = 4;
        const offset = (page-1) * limit

        axios
            .get('http://localhost:3020/v1/users', { params: { limit, offset, type: 'employee' } })
            .then(response => {
                setPageCount(response.data._meta.pageCount)
                setNotes(response.data.users)              
            })
            .catch(console.log)

    }

    useEffect(() => {
        getTalents()
    }, [page])

    const pageLimit = 5

    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    const staticPageNumbers = [1, 2, 3, 4, 5]

    return (
        <div className = "perjob_body">
            <div className = "background" style={{height: 800+'px'}}>
                <div className="d-flex">
                    <div className="col-md-3">
                        <div className = "div_item mt-2 ml-4">
                            <p className = "font_size">Find your best talent now !</p>
                        </div>
                        <div className="d-flex ml-4">
                            <div className="row md-form col-md-11 d-flex">
                                <input className="form-control" type="search" placeholder="Search"/>
                            </div>
                            <button className="btn btn-info form-control">
                                <i className="fa fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                    <div className = "col md-8">
                        <div className="col-md-5 mt-2 ml-0">
                            <p className = "font_size div_item">All Talents</p>
                        </div>
                        <div className = "col-md-11 perjob ml-3 shadow-lg" style={{height: 700+'px'}}>
                        {notes.map((note, i) => {
                            return (<div key={`note-${i}`} className = "d-flex justify-content-start position-relative border-bottom">
                                <div className = "d-flex align-items-start user_margin" >
                                    <div>
                                        {note.avatar && (
                                            <img 
                                                className = "job_image_size" 
                                                src = {note.avatar}
                                                />                         
                                        )}
                                        {!note.avatar && (
                                            <img 
                                                className = "job_image_size" 
                                                src = "https://jobinformation.info/wp-content/uploads/2019/08/recruitment-3942378_1920.jpg"/>
                                                
                                        )}
                                    </div>
                                    <div className="d-flex" style={{fontWeight: 'bold'}}>
                                        <div> {note.firstName} </div>
                                        <div> {note.lastName}</div>
                                    </div>
                                    <div className="position-absolute"
                                        style={{bottom: 28+'px', left: 144+'px'}}> 
                                        Profession 
                                    </div>
                                    <div>
                                        <Link to = {`/talents${note.id}`} >
                                            <button 
                                                type="button" 
                                                className="btn btn-info position-absolute" 
                                                style = {{fontSize: 14+'px', fontWeight: 'bold', bottom: 20+'px', left: 500+'px'}}>
                                                    View more
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                        </div>)})}
                    </div>
                </div>
                <div className = "d-flex justify-content-center">
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
        </div>
        </div>
    )
}

export default Talents

// <div className = "perjob_body">
        //     <div>
        //         <div className = "container d-flex justify-content-between m-4">
        //             <div className = "col-3 shadow   bg-white rounded ">
        //                 <div className = "div_item mt-3 ml-4">
        //                     <p className = "font_size">Find your best talent now!</p>
        //                 </div>
        //                 <div className="d-flex ml-4">
        //                     <div className="row md-form col-md-11 d-flex">
        //                         <input className="form-control mb-2" type="search" placeholder="Search"/>
        //                     </div>
        //                     <button className="btn btn-info form-control">
        //                         <i className="fa fa-search fa-fw"></i>
        //                     </button>
        //                 </div>
        //             </div>
        //             <div className = "col-8 shadow   bg-white rounded">
        //                 <div className="col-md-5 mt-3">
        //                     <p className = "font_size div_item">All Talents</p>
        //                 </div>
        //                 {notes.map((note, i) => {
        //                     return (<div key={`note-${i}`} className = "d-flex justify-content-start position-relative border-bottom m-4">
        //                         <div className = "d-flex justify-content-start user_margin" >
        //                             <div>
        //                                 {note.avatar && (
        //                                     <img 
        //                                         className = "job_image_size" 
        //                                         src = {note.avatar}
        //                                         />                         
        //                                 )}
        //                                 {!note.avatar && (
        //                                     <img 
        //                                         className = "job_image_size" 
        //                                         src = "https://jobinformation.info/wp-content/uploads/2019/08/recruitment-3942378_1920.jpg"
        //                                         />
        //                                 )}
        //                             </div>
        //                             <div> {note.firstName} </div>
        //                             <div> {note.lastName}</div>
        //                             <div> Proffesion </div>
        //                             <div>
        //                                 <Link to = {`/talents${note.id}`} >
        //                                     <button 
        //                                         type="button" 
        //                                         className="btn btn-outline-dark position-absolute" 
        //                                         style = {{bottom: 13+'px'}} >
        //                                             View more
        //                                     </button>
        //                                 </Link>
        //                             </div>
        //                         </div>
        //                 </div>)})}
        //             </div>
        //         </div>


