import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { CgFigma } from "react-icons/cg";
import { SiUnity, SiC } from "react-icons/si";

export default function Skills() {
  const [skills] = useState([
    { id: 1, name: "JavaScript", icon: <FaJs size={50} /> },
    { id: 2, name: "React", icon: <FaReact size={50} /> },
    { id: 3, name: "Node.js", icon: <FaNodeJs size={50} /> },
    { id: 4, name: "Python", icon: <FaPython size={50} /> },
    { id: 5, name: "MongoDB", icon: <FaDatabase size={50} /> },
    { id: 6, name: "Java", icon: <FaJava size={50} /> },
    { id: 7, name: "Postgresql", icon: <BiLogoPostgresql size={50} /> },
    { id: 8, name: "Next.js", icon: <RiNextjsFill size={50} /> },
    { id: 9, name: "Tailwind", icon: <RiTailwindCssFill size={50} /> },
    { id: 10, name: "Figma", icon: <CgFigma size={50} /> },
    { id: 11, name: "C", icon: <SiC size={50} /> },
    { id: 12, name: "Unity", icon: <SiUnity size={50} /> },
    { id: 13, name: "HTML", icon: <FaHtml5 size={50} /> },
    { id: 14, name: "CSS", icon: <FaCss3Alt size={50} /> },
    { id: 15, name: "SQL", icon: <FaDatabase size={50} /> },
  ]);

  return (
    <div className="mt-3 lg:mt-16 bg-white text-black" id="skills">
      <div className="px-5 lg:px-28">

        {/* TITLE */}
        <motion.h2 className="text-2xl lg:text-4xl text-center font-bold tracking-wide">
          My{" "}
          <span className="text-red-600 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]">
            Skills
          </span>
        </motion.h2>

        {/* SKILLS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-7 lg:mt-16 place-items-center">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="
                bg-white border-2 border-black 
                hover:bg-red-600 hover:text-white 
                transition-all duration-300 
                cursor-pointer rounded p-3 
                h-36 w-36 lg:h-44 lg:w-44 
                flex flex-col items-center justify-center gap-5
              "
            >
              {skill.icon}
              <p>{skill.name}</p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 🔥 EDUCATION */}
      <div className="w-full my-8 py-10 lg:my-16 lg:py-16 bg-white">
        <motion.h2 className="text-2xl lg:text-4xl text-center font-bold tracking-wide">
          My{" "}
          <span className="text-red-600 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]">
            Education
          </span>
        </motion.h2>
        <div className="px-5 lg:px-28 mt-10 space-y-8">
          {/* UNIVERSITY */}
          <div className="border border-gray-300 p-6 rounded-lg hover:border-red-600 transition">
            <h2 className="text-xl lg:text-2xl font-semibold">
              Private Law Student at {" "}
              <span className="text-red-600">Ibn Zohr University (FSJES Agadir)</span>
            </h2>
            <p className="text-gray-500 mt-3">
              Ibn Zohr University (FSJES Agadir)
            </p>
          </div>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
            <div className="border border-gray-300 p-6 rounded-lg hover:bg-red-600 hover:text-white transition">
              <h2 className="text-3xl font-bold">HTB</h2>
              <p>Active Player</p>
            </div>
            <div className="border border-gray-300 p-6 rounded-lg hover:bg-red-600 hover:text-white transition">
              <h2 className="text-3xl font-bold">CTF</h2>
              <p>Competitor</p>
            </div>
            <div className="border border-gray-300 p-6 rounded-lg hover:bg-red-600 hover:text-white transition">
              <h2 className="text-3xl font-bold">Pentesting</h2>
              <p>In Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
