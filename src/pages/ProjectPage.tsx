import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Loader  from "../components/Loader";

interface project{
    name: string;
    description: string;
    html_url: string;
}

function ProjectPage(){
        const [projects, setProjects] =  useState([]);
        useEffect(() => {
        fetch("https://api.github.com/users/albertscpv/repos")
            .then((response) => response.json())
            .then((data) => setProjects(data)); 
        }, ([]))
    return (
        <>
        {projects.length >= 1 ? (
            <section className="flex flex-col gap-10 text-white">
                <p className="text-left text-[#d4d4d4]">
                    These are my projects that I have worked throughout my
                    career as a programmer. 
                </p>
                <div>
                    <div className="grid md:gris-cols-[1fr_1fr] gap-5 text-[14px]">
                        {projects.map((project: project) => (
                        <a key={project.name} href={project.html_url} target="_blank">
                            <div 
                            className="flex items-center p-3 justify-between bg-[#262626] border-2 border-[#404040] rounded-md min-h-[100px]">
                                <div className="text-left">
                                    <p>{project.name}</p>
                                    <p className="text-[#A3A3A3]">{project.description}</p>
                                </div>
                            <FaArrowUpRightFromSquare />
                            </div>
                        </a>
                        ))}
                    </div>
                </div>
            </section>
            ):(
            <Loader />
            )}
        </>
    );
}
export default ProjectPage;