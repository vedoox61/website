import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CyberToolset() {
  const [activeTab, setActiveTab] = useState("password");

  // --- 1. أداة فحص كلمة المرور ---
  const [password, setPassword] = useState("");
  const checkPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: "Enter a password", color: "text-gray-400", time: "0 seconds", bg: "bg-gray-200" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score === 1) return { score, text: "Very Weak (Brute-forceable instantly)", color: "text-red-500", time: "Instant (Microseconds)", bg: "bg-red-500" };
    if (score === 2) return { score, text: "Weak", color: "text-orange-500", time: "A few minutes to hours", bg: "bg-orange-500" };
    if (score === 3) return { score, text: "Medium / Good", color: "text-yellow-500", time: "A few days to months", bg: "bg-yellow-500" };
    return { score, text: "Strong / Military Grade", color: "text-green-500", time: "Hundreds of Years", bg: "bg-green-500" };
  };
  const passInfo = checkPasswordStrength(password);

  // --- 2. أداة توليد الهويات الآمنة ---
  const [persona, setPersona] = useState(null);
  const generatePersona = () => {
    const firstNames = ["Alex", "Sarah", "John", "Elena", "Dorian", "Kamal", "Yasmine"];
    const lastNames = ["Smith", "Vance", "Miller", "Root", "Stark", "Amrani", "Idrissi"];
    const cities = ["New York, USA", "London, UK", "Berlin, Germany", "Casablanca, Morocco", "Tokyo, Japan"];
    const isps = ["Cloudflare Access", "ProtonVPN Node", "Mullvad Exit Node", "Tor Onion Router"];

    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fakeIp = `192.168.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
    const mac = "00:0A:E6:" + Array.from({length: 3}, () => Math.floor(Math.random()*16).toString(16).toUpperCase().padStart(2,"0")).join(".");

    setPersona({
      name: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@anon-mail.net`,
      location: cities[Math.floor(Math.random() * cities.length)],
      ip: fakeIp,
      macAddress: mac,
      gateway: isps[Math.floor(Math.random() * isps.length)]
    });
  };

  // --- 3. أداة التشفير وفك التشفير ---
  const [textInput, setTextInput] = useState("");
  const [cryptoMode, setCryptoMode] = useState("encode"); // encode or decode
  const [cryptoAlgo, setCryptoAlgo] = useState("base64"); // base64 or binary

  const handleCrypto = () => {
    if (!textInput) return "";
    try {
      if (cryptoMode === "encode") {
        if (cryptoAlgo === "base64") return btoa(textInput);
        if (cryptoAlgo === "binary") return textInput.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
      } else {
        if (cryptoAlgo === "base64") return atob(textInput);
        if (cryptoAlgo === "binary") {
          const removedSpaces = textInput.trim().split(" ");
          return removedSpaces.map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
        }
      }
    } catch (err) {
      return "Error: Invalid Input for Decryption!";
    }
  };
  const cryptoResult = handleCrypto();

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden font-mono text-sm text-black">
      {/* هيدر اللوحة التفاعلية */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h4 className="text-base font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            Cybersecurity Playground
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">Interactive Client-Side Security Utilities</p>
        </div>
        
        {/* أزرار التنقل (Tabs) */}
        <div className="flex bg-gray-200/80 p-1 rounded-lg self-stretch sm:self-auto overflow-x-auto">
          {[
            { id: "password", label: "Pass Check" },
            { id: "persona", label: "Persona Gen" },
            { id: "crypto", label: "Crypto Lab" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-tight transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-white text-red-500 shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* محتوى اللوحة التفاعلية */}
      <div className="p-6 min-h-[260px] bg-white flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PASSWORD ANALYZER */}
          {activeTab === "password" && (
            <motion.div key="password" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Test Password Security:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type a password to test crack-time..."
                  className="w-full bg-gray-50 border border-gray-300 rounded p-3 font-mono text-sm focus:outline-none focus:border-red-500 text-black transition-all"
                />
              </div>

              {password && (
                <div className="space-y-2.5 bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">STRENGTH STATUS:</span>
                    <span className={`font-bold uppercase ${passInfo.color}`}>{passInfo.text}</span>
                  </div>
                  
                  {/* بار القوة التفاعلي */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${passInfo.bg} transition-all duration-300`} style={{ width: `${(passInfo.score / 4) * 100}%` }} />
                  </div>

                  <div className="text-xs pt-1 flex justify-between">
                    <span className="text-gray-400">TIME TO CRACK (Brute-Force):</span>
                    <span className="font-bold text-black bg-red-50 px-1.5 py-0.5 rounded text-red-600">{passInfo.time}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: PERSONA GENERATOR */}
          {activeTab === "persona" && (
            <motion.div key="persona" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 uppercase">Generate secure fake profile for OpSec labs:</p>
                <button
                  onClick={generatePersona}
                  className="bg-black hover:bg-red-500 text-white font-bold text-xs uppercase px-4 py-2 rounded shadow transition-colors"
                >
                  {persona ? "Generate Another" : "Generate Persona"}
                </button>
              </div>

              {persona ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded border border-gray-200 text-xs">
                  <div><span className="text-gray-400">FAKE IDENTITY :</span> <span className="font-bold text-black">{persona.name}</span></div>
                  <div><span className="text-gray-400">SECURE EMAIL  :</span> <span className="font-bold text-black">{persona.email}</span></div>
                  <div><span className="text-gray-400">ASSIGNED ROUTE:</span> <span className="font-bold text-black">{persona.location}</span></div>
                  <div><span className="text-gray-400">VIRTUAL IP    :</span> <span className="font-bold text-red-500">{persona.ip}</span></div>
                  <div><span className="text-gray-400">MAC ADDRESS   :</span> <span className="font-bold text-black">{persona.macAddress}</span></div>
                  <div><span className="text-gray-400">OPSEC GATEWAY :</span> <span className="font-bold text-green-600">{persona.gateway}</span></div>
                </div>
              ) : (
                <div className="h-28 flex items-center justify-center border border-dashed border-gray-300 rounded text-gray-400 text-xs uppercase">
                  No identity deployed. Click generate above.
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: CRYPTO LAB */}
          {activeTab === "crypto" && (
            <motion.div key="crypto" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-between items-center">
                {/* الإعدادات */}
                <div className="flex gap-2">
                  <select
                    value={cryptoMode}
                    onChange={(e) => setCryptoMode(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-xs font-bold rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="encode">ENCODE (تشفير)</option>
                    <option value="decode">DECODE (فك تشفير)</option>
                  </select>

                  <select
                    value={cryptoAlgo}
                    onChange={(e) => setCryptoAlgo(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-xs font-bold rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="base64">Base64</option>
                    <option value="binary">Binary (010101)</option>
                  </select>
                </div>
                <span className="text-[11px] text-gray-400 uppercase">Instant Client-Side Transformation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <textarea
                    rows={3}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={cryptoMode === "encode" ? "Enter plaintext..." : "Enter cipher text / bits..."}
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2.5 text-xs font-mono focus:outline-none focus:border-red-500 text-black transition-all resize-none"
                  />
                </div>
                <div>
                  <div className="w-full h-full min-h-[72px] bg-gray-900 text-green-400 rounded p-2.5 text-xs font-mono overflow-y-auto break-all select-all selection:bg-green-500/30">
                    {cryptoResult ? cryptoResult : <span className="text-gray-600">// OUTPUT FIELD</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}