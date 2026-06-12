import {MdOutlineTimer} from "react-icons/md"
import { useState } from "react";
import { FaAngleRight} from "react-icons/fa";
const Courses = () => {

    type Courses ={
        id:number,
        img:string,
        name:string,
        desc:string,
        time:string
    }
    const [showAll, setShowAll]=useState(false)
    const [course]=useState<Courses[]>([{
       id:1,
       img:"/images/soft-p.webp" ,
       name:"Python",
       desc:"Master Variables and data types Functions, Loops and conditions, Object-Oriented Programming (OOP), File handling, APIs, Databases, Testing and debugging, Building web applications with frameworks like Django or Flask, Automation scripts."
,
       time:"3 Hours daily",
     
    },{
        id:2,
       img:"/images/soft-d.jpg" ,
       name:"DevOps",
       desc:"Learn Linux Networking, Shell scripting, Git and GitHub, CI/CD pipelines, Docker, Kubernetes, Monitoring and logging, Infrastructure as Code. Tools often used Docker, Kubernetes, Jenkins, Terraform",
       time:"4 hours daily"
      
    },{
       id:3,
       img:"/images/score-2.png" ,
       name:"Data Analysis",
       desc:"Excel, SQL, Python, Statistics, Data cleaning, Data visualization, Dashboards. Tools:Microsoft Excel, Power BI, Tableau.",
       time:"4 hours daily",
    
    },{
        id:4,
       img:"/images/soft-c.jpg" ,
       name:"Cloud Computing",
       desc:"Learn Virtual machines, Storage systems, Networking, Security, Databases, Serverless computing, Cloud architecture. Platforms: Amazon Web Services (AWS), Microsoft Azure, Google Cloud",
       time:"5 hours daily",
      
    },{
        id:5,
       img:"/images/score-1.png" ,
       name:"Software Engineering",
       desc:"Programming (Python, JavaScript, Java, etc.), Data structures and algorithms, Databases, APIs, System design, Testing, Version control, Software architecture. What they build:Websites, Mobile apps, Backend systems, Enterprise software, APIs",
       time:"6 hours daily",
    }])
    const displayedItems= showAll ? course : course.slice(0, 3)
    return ( <div id='courses' className="bg-[#fef7ff] dark:bg-[#060e20]  p-5 md:p-15">
    <div className="flex justify-between flex-col md:flex-row gap-4 mb-10 items-center">
        <div className="flex flex-col gap-2">
            <h3 className="text-2xl md:text-4xl dark:text-white text-black font-semibold head">Popular Certification Tracks</h3>
            <p className="text-lg md:text-xl dark:text-[#cac4cf] text-gray-800">Most chosen by professionals for skill elevation this quarter.</p>
        </div>
        <div onClick={() => setShowAll(!showAll)} className="flex items-center gap-1 cursor-pointer">
             <button  className="cursor-pointer text-[#5300b7] dark:text-[#d3bbff] font-semibold"> {showAll ? "Show Less" : "View All Courses"}</button>
             <FaAngleRight className="cursor-pointer text-[#5300b7] font-semibold"/>
        </div>
       
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
        {displayedItems.map((items)=>(
            <div className="flex  flex-col rounded-2xl md:rounded-4xl bg-white dark:bg-[#1b2337] shadow">
            <img src={items.img} alt="" className="transition-transform duration-300 hover:scale-105 h-[200px] rounded-t-2xl md:rounded-t-4xl" />
            <div className="flex flex-col gap-5 py-5 px-5 md:px-10">
                <h2 className="text-2xl  md:text-4xl font-semibold dark:text-white">{items.name}</h2>
                <p className="text-md md:text-lg text-gray-700 dark:text-[#cac4cf]">{items.desc}</p>
                <div className="flex gap-4 items-center">
                
                    <MdOutlineTimer className="text-2xl text-gray-800 dark:text-[#cac4cf]"/>
                    <p className="text-gray-700 text-sm md:text-md dark:text-[#cac4cf]">{items.time}</p>
            
                </div>
            </div>
        </div>
        ))}

        <div><button></button>
        </div>
        

      
    </div>
    </div> );
}
 
export default Courses;