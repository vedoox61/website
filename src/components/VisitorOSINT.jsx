import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGE = {
  SCANNING: "scanning",
  SPOTTED: "spotted",
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
  const [errorMsg, setErrorMsg] = useState("");

  const fetchInfo = async () => {
    setStage(STAGE.SCANNING);
    setVisibleLines(0);
    setErrorMsg("");
    setData(null);

    const start = Date.now();

    try {
      // API قوي يعطي IP + Country + City + ISP
      const res = await fetch("https://ip-api.com/json/?fields=status,message,country,city,lat,lon,isp,query", {
        cache: "no-store"
      });

      if (!res.ok) throw new Error("Failed");

      const json = await res.json();

      if (json.status === "fail") throw new Error(json.message);

      const { os, browser } = parseUserAgent(navigator.userAgent);
      const delay = Math.max(1000 - (Date.now() - start), 0);

      setTimeout(() => {
        const newData = {
          ip: json.query || "UNKNOWN",
          country: json.country || "UNKNOWN",
          city: json.city || "Unknown",
          lat: json.lat ? json.lat.toFixed(4) : "?",
          lon: json.lon ? json.lon.toFixed(4) : "?",
          isp: json.isp || "Unknown",
          os,
          browser,
        };
        setData(newData);
        setStage(STAGE.SPOTTED);

        // Geolocation دقيقة (تطلب إذن من المستخدم)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setData(prev => ({
                ...prev,
                lat: pos.coords.latitude.toFixed(4),
                lon: pos.coords.longitude.toFixed(4),
              }));
            },
            (err) => {
              console.log("Geolocation permission denied");
            }
          );
        }
      }, delay);

    } catch (err) {
      console.error(err);
      setErrorMsg("جاري استخدام معلومات محدودة...");

      const { os, browser } = parseUserAgent(navigator.userAgent);
      setTimeout(() => {
        setData({
          ip: "Detected",
          country: "Morocco",
          city: "Unknown",
          lat: "?",
          lon: "?",
          isp: "Unknown",
          os,
          browser,
        });
        setStage(STAGE.SPOTTED);
      }, 800);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const lines = data ? [
    `IP ADDRESS......${data.ip}`,
    `LOCATION........${data.city}, ${data.country}`,
    `COORDINATES.....${data.lat}, ${data.lon}`,
    `ISP.............${data.isp}`,
    `SYSTEM..........${data.os} / ${data.browser}`,
  ] : [];

  useEffect(() => {
    if (stage !== STAGE.SPOTTED || visibleLines >= lines.length) return;
    const t = setTimeout(() => setVisibleLines(n => n + 1), 260);
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

        {stage === STAGE.SPOTTED && (
          <motion.div key="spotted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-green-300 font-bold mb-2 tracking-wider">
              {">"} TARGET SPOTTED
            </motion.p>

            {errorMsg && <p className="text-yellow-400 text-xs mb-3">{errorMsg}</p>}

            <div className="space-y-1">
              {lines.slice(0, visibleLines).map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre">
                  {line}
                </motion.p>
              ))}
            </div>

            <button
              onClick={fetchInfo}
              className="mt-4 px-4 py-1 text-xs border border-green-500/50 hover:bg-green-500/10 transition-colors rounded flex items-center gap-2 mx-auto"
            >
              🔄 Retry Scan
            </button>

            <p className="text-[10px] text-green-500/50 mt-3 text-center">
              Note: Coordinates need your permission
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}