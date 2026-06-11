import React from 'react';
import { motion } from 'framer-motion';

const HackTheBoxIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.996 0L3 4.9v9.8l2-1.151V6.051l6.996-4.04L18.999 6v1.599l2 1.151V4.9L11.996 0zM11 8.464v2.302L9 9.614V7.312L11 8.464zm2 0l2-1.152v2.302l-2 1.152V8.464zM8 6.16L12 3.856l4 2.304-4 2.304L8 6.16zm-5 8.589l2-1.152v2.302l-2 1.152V14.75zm16-1.152l2 1.152v2.302l-2-1.152V13.6zM11 19.136v2.302L5.004 18.1v-2.302L11 19.136zm2 2.302v-2.302l5.996-3.338V18.1L13 21.438zM3 14.9v4.2l8.996 4.9L21 19.1v-4.2l-2-1.151v3.049l-7 4.04-7-4.04V13.75L3 14.9z"/>
  </svg>
);

export default function Footer() {
  return (
    <div className='bg-white px-5 lg:px-28 py-3 lg:py-6 flex items-center justify-between mt-16 border-t border-gray-200'>
      {/* TEXT LOGO */}
      <h2 className='text-black text-lg lg:text-2xl font-extrabold tracking-widest cursor-pointer'>
        <span className='text-red-600 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]'>B</span>RAHIM
      </h2>

      {/* HTB ICON */}
      <motion.a
        href="https://profile.hackthebox.com/profile/019ea113-7a11-72d4-8b66-d5949b868a01"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-600 transition"
        whileHover={{ scale: 1.2 }}
        title="HackTheBox Profile"
      >
        <HackTheBoxIcon className="w-6 h-6" />
      </motion.a>

      {/* TEXT */}
      <div className='text-gray-600 lg:font-semibold lg:text-sm font-normal text-[10px] text-right lg:space-y-3'>
        <p>© 2026 Personal Portfolio</p>
        <p className='hover:text-red-600 transition'>Made by Brahim Lachgar</p>
      </div>
    </div>
  );
}
