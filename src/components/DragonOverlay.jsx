import React from "react";
import { motion } from "framer-motion";

export default function CyberMatrixAmbient() {
  // مصفوفة تحتوي على بلوكات من 5 رموز/أرقام مستوحاة من اختراق الأنظمة والـ Hex Dump
  const cyberBlocks = [
    "01101", "A8FF2", "10011", "9C2B4", "ØF3A1", 
    "11100", "DE4D2", "00101", "8B7C9", "4FFA1",
    "10110", "E29B5", "01001", "3C9D8", "7X2A9"
  ];

  // إعدادات أنميشن الظهور والاختفاء العشوائي المتكرر (Flicker / Blinking Effect)
  const blinkAnimation = (delay) => ({
    animate: {
      opacity: [0.1, 0.6, 0.2, 0.7, 0.1, 0.4, 0.1],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }
    }
  });

  return (
    // يظهر فقط في الشاشات الكبيرة (xl) في أقصى اليمين، ولا يعيق ضغطات الماوس (pointer-events-none)
    <div className="hidden xl:flex fixed inset-y-0 right-0 w-[110px] z-10 pointer-events-none select-none flex-col justify-between py-24 items-center font-mono text-xs font-bold tracking-widest text-black">
      
      {/* العمود الأول من البلوكات البرمجية */}
      <div className="flex flex-col gap-8">
        {cyberBlocks.slice(0, 7).map((block, index) => (
          <motion.span
            key={`col1-${index}`}
            {...blinkAnimation(index * 0.4)} // تأخير عشوائي لكل بلوك باش ما يختفيوش كاملين فدقة واحدة
          >
            {block}
          </motion.span>
        ))}
      </div>

      {/* العمود الثاني مائل قليلاً أو متباعد ليعطي مظهر الـ Cyber Matrix العشوائي */}
      <div className="flex flex-col gap-10 pt-12">
        {cyberBlocks.slice(7, 15).map((block, index) => (
          <motion.span
            key={`col2-${index}`}
            {...blinkAnimation(index * 0.6 + 0.2)}
            className="opacity-40"
          >
            {block}
          </motion.span>
        ))}
      </div>
      
    </div>
  );
}