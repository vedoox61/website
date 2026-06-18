import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Skills from './components/Skills'
import Navbar from './components/Navbar'
import About from './components/About'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './utils/CursorAnimation'
import CyberToolset from './components/CyberToolset' 
import DragonOverlay from './components/DragonOverlay' // الاستدعاء بالاسم القديم ديالك لي خليتيه

// الصفحة الرئيسية
const MainLayout = () => (
  <>
    <Home />
    <Skills />
    <About />
    <Projects />
    <Contact />
  </>
)

// صفحة الـ Tools المستقلة
const ToolsPage = () => (
  <div className="pt-32 px-5 lg:px-28 min-h-screen bg-white">
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight flex items-center gap-2">
          <span className="text-red-500">//</span> Advanced Cyber Toolset
        </h2>
        <p className="text-gray-500 text-sm mt-1">A dedicated independent workspace for specialized cybersecurity utilities.</p>
      </div>
      <CyberToolset /> 
    </div>
  </div>
)

export default function App() {
  return (
    <Router>
      <div className='font-sora scroll-smooth overflow-x-hidden relative bg-white'>
        <CustomCursor/>
        <Navbar />
        
        {/* تشغيل المكون الجانبي بدون أي مشاكل مسار */}
        <DragonOverlay />

        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}