import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 py-12 bg-white text-black flex flex-col lg:flex-row items-center gap-10" id="about">
      <motion.div
        className="lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img
          className="h-[360px] lg:h-[420px] w-auto mx-auto rounded-[28px] shadow-lg hover:scale-105 transition duration-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          src="/assets/Me.jpg"
          alt="About Me"
        />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl font-bold tracking-wide">
          About{' '}
          <span className="font-extrabold text-red-600 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]">
            Me
          </span>
        </h2>
        <div className="w-16 h-[3px] bg-red-600 mt-2 mb-6 rounded"></div>

        <p className="text-gray-500 text-sm/6 lg:text-base leading-relaxed">
          Private Law Student at{' '}
          <span className="text-red-600 font-semibold">
            Ibn Zohr University (FSJES Agadir)
          </span>, based in Agadir. I combine legal studies with hands-on cybersecurity training to deliver secure digital experiences.
        </p>

        <p className="text-gray-500 text-sm/6 lg:text-base mt-4 leading-relaxed">
          As a member of the{' '}
          <span className="text-red-600 font-semibold">Code 212</span> coding center, I focus on ethical hacking, penetration testing, and vulnerability analysis while building modern web applications with React, Node.js, and Tailwind CSS.
        </p>

        <p className="text-gray-500 text-sm/6 lg:text-base mt-4 leading-relaxed">
          My work spans cybersecurity research, bug bounty exercises, secure web development, and responsive UI design. I enjoy turning complex security challenges into elegant, maintainable solutions.
        </p>

        <p className="text-gray-500 text-sm/6 lg:text-base mt-4 leading-relaxed">
          When I'm not hunting vulnerabilities or writing code, you'll find me at the skate park or grinding through{' '}
          <a
            href="https://profile.hackthebox.com/profile/019ea113-7a11-72d4-8b66-d5949b868a01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-semibold hover:underline"
          >
            HackTheBox
          </a>{' '}
          machines from my room in Agadir.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            'Cybersecurity',
            'Penetration Testing',
            'CTF Player',
            'Full-stack Web Dev',
          ].map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 border border-gray-300 rounded-full hover:border-red-600 hover:text-red-600 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
