import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Ecommerce Website",
    description: "A modern ecommerce platform with product management, cart system, and secure checkout experience.",
    image: "/assets/cel.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Hangman Game",
    description: "A fun interactive Hangman game built with clean UI and smooth logic handling.",
    image: "/assets/game.png",
    link: "https://github.com/Saboo24/hangman"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A personal portfolio showcasing my skills, projects, and experience with a modern UI design.",
    image: "/assets/port.png",
    link: "https://github.com/Saboo24/Portfolio8"
  }
];

export default function Projects() {
  return (
    <div className="bg-white px-5 lg:px-28 py-16 text-black" id="projects">

      {/* TITLE */}
      <h2 className="text-3xl lg:text-5xl text-center mb-12 font-bold">
        My{" "}
        <span className="text-red-600 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]">
          Projects
        </span>
      </h2>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex items-center flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } gap-10`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >

            {/* IMAGE */}
            <div className="lg:w-[500px] w-full rounded-2xl overflow-hidden border border-gray-300">
              <img
                className="w-full h-full object-cover transition duration-500 hover:scale-110 hover:brightness-90"
                src={project.image}
                alt={project.title}
              />
            </div>

            {/* TEXT */}
            <div className="lg:w-1/2 space-y-4">

              {/* NUMBER */}
              <h2 className="text-5xl font-extrabold text-red-600">
                {String(project.id).padStart(2, "0")}
              </h2>

              {/* TITLE */}
              <p className="font-bold text-black text-2xl lg:text-3xl">
                {project.title}
              </p>

              {/* DESC */}
              <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
                {project.description}
              </p>

              {/* LINK */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 hover:text-black transition"
              >
                View Project
                <TbExternalLink size={20} />
              </a>

            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}