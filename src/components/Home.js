import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup';
import MainUser from './MainUser'
import axios from 'axios'
import './Home.scss'

import { Carousel } from 'react-responsive-carousel';

const Home = ({jobCount, talentCount, employersCount, allJobs,  setPage, page, pageCount}) => {

 
// const properties = {
//   duration: 5000,
//   transitionDuration: 500,
//   infinite: true,
//   indicators: true,
//   arrows: true,
//   onChange: (oldIndex, newIndex) => {
//     console.log(`slide transition from ${oldIndex} to ${newIndex}`);
//   }
// }
    const [info, setInfo] = useState('')

    const getAllJobs = () => {

        axios
            .get('http://localhost:3020/v1/jobs',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {

                setInfo(response.data.forSlide.job)
                
            })
            .catch(console.log)

    }

    useEffect(() => {
        getAllJobs()
    }, [])
    
    return (
        <div>
            <main>
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
                    <div className="py-5 bg-image overlay-primary fixed overlay" >
                        <div className="container">
                            <div className="d-flex justify-content-center">
                                <div className="text-center">
                                    <h2 className="mb-2 text-white">Careers Statistics</h2>
                                    <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
                                </div>
                            </div>
                            <div className="d-flex row" style={{color: 'white'}}>
                                {/* {console.log(jobCount, talentCount, employersCount, 'count')} */}
                                <div className = "col-md-4">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <strong>
                                            <CountUp
                                                end = {jobCount || 0}
                                                duration = {5}
                                            />
                                        </strong>
                                    </div>
                                    <span className="caption">Jobs in our page</span>
                                </div>

                                <div className = "col-md-4">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <strong className="number" data-number="550">
                                            <CountUp
                                                end ={talentCount || 0}
                                                duration = {5}
                                            />
                                        </strong>
                                    </div>
                                    <span className="caption">Employees</span>
                                </div>

                                <div className = "col-md-4">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <strong className="number" data-number="550">
                                            <CountUp
                                                end ={employersCount || 0}
                                                duration = {5}
                                            />
                                        </strong>
                                    </div>
                                    <span className="caption">Employers</span>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </div>
                    {info && (
                        <div className="slide-container">
                        <Carousel >
                            <div>
                                <img src = {info[0].user.avatar}/>
                                <p className="legend"> {info[0].user.firstName} {info[0].user.lastName}  </p>
                            </div>
                            <div>
                                <img src = {info[1].user.avatar}/>
                                <p className="legend"> {info[1].user.firstName} {info[1].user.lastName}  </p>
                            </div>
                            <div>
                                <img src = {info[2].user.avatar}/>
                                <p className="legend"> {info[2].user.firstName} {info[2].user.lastName}  </p>
                            </div>
                        </Carousel>
                    </div>
                    )}
                <div>
                    <MainUser
                        allJobs = {allJobs}  
                        setPage = {setPage}
                        page = {page}
                        pageCount = {pageCount}
                    />
                </div>
         </main>
         
    </div>
    )
}
export default Home

// const dataJobs = {
    //     labels:['Jobs'],
    //     datasets: [{
    //         data: [ jobCount],
    //         backgroundColor: [
    //             '#FF6384',
                
    //         ],
    //         hoverBackgroundColor: [
    //             '#FAA384',
                
    //         ]
    //     }],
    //     text: [23+'%'],
        
    // };
    
    // const dataTalents = {
    //     labels:['Talents'],
    //     datasets: [{
    //         title: {
    //             display: true,
    //             position: "relative",
    //             top: 40+'px',
    //             text: "Doughnut Chart",
    //             fontSize: 18,
    //             fontColor: 'green'
    //           },
    //         data: [ 200],
    //         backgroundColor: [
    //         '#5D6584',
            
    //         ],
    //         hoverBackgroundColor: [
    //         '#FAA384',
            
    //         ]
    //     }]
    // };

    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    //   ];

    //   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    //   const RADIAN = Math.PI / 180;
    //   const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    //       console.log(cx, 'cx')
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);
    //     console.log(x, y, radius, 'name')
      
    //     return (
    //       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //           {`Job count`}
    //         {/* {`${(percent * 100).toFixed(0)}%`} */}
    //       </text>
    //     );
    //   };



 {/* <div className = "d-flex"> */}
                            {/* <div>
                                <Doughnut data={dataJobs} />
                            </div>
                            <div>
                                <Doughnut data={dataTalents} />
                            </div> */}
                            {/* <div id = "container">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={data}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                    {
                                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                    </Pie>
                                </PieChart>
                            </div> */}
                            {/* <div> */}
                                {/* <svg className = "donutchart" width = "250" height = "300" viewBox = "0 0 750 500"> 
                                    <g className = "donutchart-arcs">
                                        <path className = "selected donutchart-arcs-path"
                                            d="M482.5,250
                                            A232.5, 232.5 0 1 1 482.4999964588225, 249.9594210950973
                                            L424.9999973345976,249.96945673824527
                                            A175, 175 0 1 0 425, 250 z" fill="#000" opacity="0.5">

                                            </path>

                                    </g>
                                    <g className = "donutchart-innertext">
                                        <text className = "donutchart-innertext-label"
                                        fontSize = '44px'
                                        x="250px"
                                        y="45%"
                                        textAnchor="middle">
                                            Jobs in our page
                                        </text>

                                    </g>
                                
                                </svg> */}
                            {/* <DonutChart
                                style = {{width: 150+'px'}}
                                data={[{
                                    animatable: true,
                                    label: 'Give you up',
                                    value: 100
                                }
                            ]} /> */}
                            {/* </div> */}

 {/* <div style = {{color: 'red'}}>
                                <div>

                                <CountUp
                                    end ={100}
                                    duration = {5}
                                />
                                </div>
                                <CountUp
                                    end ={50}
                                    duration = {5}
                                />
                                
                            </div> */}