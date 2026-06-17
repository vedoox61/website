import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { TbExternalLink } from "react-icons/tb";

const navLinks = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  const [hasShadow, setHasShadow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 110,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed lg:px-28 px-5 top-0 left-0 w-full z-50 bg-white text-black p-5 transition-shadow duration-300 ${
        hasShadow ? "shadow-[0_4px_20px_rgba(220,38,38,0.15)]" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1
          onClick={() => scrollToSection("home")}
          className="text-2xl lg:text-3xl font-extrabold cursor-pointer tracking-widest"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-red-600">B</span>RAHIM
        </motion.h1>

        <ul className="hidden lg:flex items-center gap-x-7 font-semibold">
          {navLinks.map((section) => (
            <motion.li key={section} whileHover={{ scale: 1.05 }} className="group">
              <button onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
              <span className="w-0 group-hover:w-full transition-all duration-300 h-[2px] bg-red-600 block"></span>
            </motion.li>
          ))}
        </ul>

        <button
          onClick={() => scrollToSection("contact")}
          className="hidden relative lg:inline-flex items-center px-5 py-2 font-medium group"
        >
          <span className="absolute inset-0 w-full h-full transition transform translate-x-1 translate-y-1 bg-red-600 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full border-2 border-red-600"></span>
          <span className="relative text-black group-hover:text-white flex items-center gap-x-3 transition">
            Contact <TbExternalLink size={16} />
          </span>
        </button>

        <motion.button
          className="lg:hidden text-2xl text-black"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.2 }}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 right-0 h-full w-full bg-white text-black"
          >
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <HiX />
            </button>
            <ul className="flex flex-col items-start ml-16 mt-28 gap-y-6 font-semibold">
              {navLinks.map((section) => (
                <motion.li key={section} whileHover={{ scale: 1.05 }}>
                  <button onClick={() => scrollToSection(section)}>{section}</button>
                </motion.li>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="relative inline-flex items-center px-4 py-2 font-semibold text-white bg-red-600 rounded"
              >
                Contact Me
              </button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
