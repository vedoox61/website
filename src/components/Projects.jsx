import React from 'react';
import { TbExternalLink } from 'react-icons/tb';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Ecommerce Website',
    description:
      'A modern ecommerce platform with product management, cart functionality, and an intuitive checkout flow designed for performance and usability.',
    image: '/assets/cel.jpg',
    link: '#',
    tech: ['React', 'Tailwind', 'Node.js', 'Stripe'],
  },
  {
    id: 2,
    title: 'Hangman Game',
    description:
      'A responsive game experience with clean UI, sound feedback, and smooth game state handling for mobile and desktop players.',
    image: '/assets/game.png',
    link: 'https://github.com/Saboo24/hangman',
    tech: ['JavaScript', 'HTML5', 'CSS', 'Game Logic'],
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'A personal portfolio that showcases projects, skills, and education using modern animations, responsive layout, and accessible navigation.',
    image: '/assets/port.png',
    link: 'https://github.com/Saboo24/Portfolio8',
    tech: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
  },
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
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-10`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-[500px] w-full rounded-[28px] overflow-hidden border border-gray-300 shadow-sm">
              <img
                className="w-full h-full object-cover transition duration-500 hover:scale-110 hover:brightness-90"
                src={project.image}
                alt={project.title}
              />
            </div>

            <div className="lg:w-1/2 space-y-5">
              <div className="text-red-600 text-5xl font-extrabold">
                {String(project.id).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-black text-2xl lg:text-3xl">{project.title}</h3>
              <p className="text-gray-500 text-sm lg:text-base leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 hover:text-black transition font-semibold"
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