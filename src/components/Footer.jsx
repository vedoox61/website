import React from 'react'
export default function Footer() {
  return (
    <div className='bg-white px-5 lg:px-28 py-3 lg:py-6 flex items-center justify-between mt-16 border-t border-gray-200'>
      {/* TEXT LOGO */}
      <h2 className='text-black text-lg lg:text-2xl font-extrabold tracking-widest cursor-pointer'>
        <span className='text-red-600 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]'>B</span>RAHIM
      </h2>
      {/* TEXT */}
      <div className='text-gray-600 lg:font-semibold lg:text-sm font-normal text-[10px] text-right lg:space-y-3'>
        <p>© 2026 Personal Portfolio</p>
        <p className='hover:text-red-600 transition'>Made by Brahim Lachgar</p>
      </div>
    </div>
  )
}