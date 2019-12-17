import React from 'react'
import { Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            { <main>
                <div className="text-center text" id = "menu">
                    <div className="card-body main_part_text col-4" >
                        <div className = "main_page_text mt-2" style = {{color: 'white'}}>
                            <p className="lead" style = {{fontSize: 46 + 'px'}}>FRESH TALENTS</p>
                            <p className="lead" style = {{fontSize: 46 + 'px'}}>+</p>
                            <p className="lead" style = {{fontSize: 46 + 'px'}}>TOP EMPLOYERS</p>
                        </div>
                        <div>
                            <p style = {{fontSize: 22 + 'px', color: 'white'}}  
                                className="lead p-2">
                                    Together we can achieve more...!
                            </p>
                        </div>
                        <div className = "button_margin">
                            <Link to='/jobs'>
                                <button 
                                    type="button" 
                                    className="btn btn-danger my-auto ml-0"
                                    style = {{fontSize: 22 + 'px', color: 'white'}}>
                                        Find a Job
                                </button>
                            </Link> 
                            <Link to='/talents'>
                                <button 
                                    type="button" 
                                    className="btn btn-warning mx-auto"
                                    style = {{fontSize: 22 + 'px', color: 'white'}}>
                                        Find a Talent
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
         </main>}
         
    </div>
    )
}
export default Home

