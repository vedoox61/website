import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://ipapi.co/json/";

const STAGE = {
  SCANNING: "scanning",
  SPOTTED: "spotted",
  ERROR: "error",
};

function parseUserAgent(ua) {
  let os = "UNKNOWN";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "UNKNOWN";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Chromium|Edg\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";

  return { os, browser };
}

export default function VisitorOSINT() {
  const [stage, setStage] = useState(STAGE.SCANNING);
  const [data, setData] = useState(null);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let timeout;
    const start = Date.now();

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const { os, browser } = parseUserAgent(navigator.userAgent);
        const elapsed = Date.now() - start;
        const delay = Math.max(1400 - elapsed, 0);
        timeout = setTimeout(() => {
          setData({
            ip: json.ip ?? "UNKNOWN",
            country: json.country_name ?? "UNKNOWN",
            city: json.city ?? "UNKNOWN",
            lat: json.latitude ?? "?",
            lon: json.longitude ?? "?",
            isp: json.org ?? "UNKNOWN",
            os,
            browser,
          });
          setStage(STAGE.SPOTTED);
        }, delay);
      })
      .catch(() => {
        const { os, browser } = parseUserAgent(navigator.userAgent);
        timeout = setTimeout(() => {
          setData({
            ip: "105.158.28.194 (DEV_ENV)",
            country: "Morocco",
            city: "Agadir",
            lat: "30.4189",
            lon: "-9.5929",
            isp: "Maroc Telecom (IAM)",
            os,
            browser,
          });
          setStage(STAGE.SPOTTED);
        }, 1200);
      });

    return () => clearTimeout(timeout);
  }, []);

  const lines = data
    ? [
        `IP ADDRESS......${data.ip}`,
        `LOCATION........${data.city}, ${data.country}`,
        `COORDINATES.....${data.lat}, ${data.lon}`,
        `ISP.............${data.isp}`,
        `SYSTEM..........${data.os} / ${data.browser}`,
      ]
    : [];

  useEffect(() => {
    if (stage !== STAGE.SPOTTED || visibleLines >= lines.length) return;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 260);
    return () => clearTimeout(t);
  }, [stage, visibleLines, lines.length]);

  return (
    <div className="relative w-full max-w-md rounded-md border border-green-500/40 bg-black/90 p-5 font-mono text-sm text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.25)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-10 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,#22c55e_3px)]" />

      <div className="flex items-center gap-2 mb-3 text-green-500/70 text-xs">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        root@visitor:~$
      </div>

      <AnimatePresence mode="wait">
        {stage === STAGE.SCANNING && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
            <p>{">"} INITIATING TRACE...</p>
            <p className="animate-pulse">{">"} SCANNING TARGET...</p>
          </motion.div>
        )}

        {stage === STAGE.ERROR && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500">
            {">"} CONNECTION LOST. TARGET CLOAKED.
          </motion.div>
        )}

        {stage === STAGE.SPOTTED && (
          <motion.div key="spotted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-green-300 font-bold mb-2 tracking-wider">
              {">"} TARGET SPOTTED
            </motion.p>
            <div className="space-y-1">
              {lines.slice(0, visibleLines).map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre flex items-center">
                  <span>{line}</span>
                  {/* الكورسور يظهر ملاصق للسطر الحالي فقط أثناء الطباعة */}
                  {i === visibleLines - 1 && visibleLines < lines.length && (
                    <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
                  )}
                </motion.p>
              ))}

              {/* فاش كيسالي الطباعة، الكورسور كيهبط لتحت مع سطر أوامر جديد أنيق */}
              {visibleLines >= lines.length && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-500/70 pt-1 flex items-center gap-1">
                  <span>root@visitor:~$</span>
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}