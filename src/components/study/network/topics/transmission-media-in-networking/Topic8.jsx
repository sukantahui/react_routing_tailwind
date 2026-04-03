import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic8: Radio Waves
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to radio wave communication.
 * 
 * @purpose
 * Explain the characteristics, propagation modes, and real-world applications of radio waves,
 * including Wi-Fi, broadcasting, and mobile networks.
 * 
 * @usage
 * Used in networking courses to introduce wireless fundamentals after unguided media.
 */

const Topic8 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What frequency range do radio waves cover?",
      a: "Radio waves span from 3 Hz to 300 GHz. Lower frequencies (LF) can travel long distances; higher frequencies (VHF, UHF, SHF) offer more bandwidth but shorter range."
    },
    {
      q: "List three key characteristics of radio waves.",
      a: "1) Omnidirectional radiation (unless using directional antennas). 2) Ability to penetrate buildings and foliage. 3) Can reflect off the ionosphere (sky wave propagation) for long-distance communication."
    },
    {
      q: "What is the difference between sky wave and ground wave propagation?",
      a: "Ground wave follows Earth's curvature (used for AM radio, up to few hundred km). Sky wave reflects off the ionosphere back to Earth (used for shortwave radio, thousands of km)."
    },
    {
      q: "Why are radio waves used in Wi-Fi?",
      a: "Radio waves (2.4 GHz and 5 GHz bands) can pass through walls, are license-free in most countries, and support moderate to high data rates, making them ideal for indoor wireless networking."
    },
    {
      q: "What is the main disadvantage of radio waves compared to microwaves?",
      a: "Radio waves are more susceptible to interference from other devices (cordless phones, Bluetooth, microwaves) because they are omnidirectional and use crowded unlicensed bands."
    },
    {
      q: "How does FM radio differ from AM radio in terms of propagation?",
      a: "FM (88–108 MHz) uses line-of-sight / sky wave, range ~50-100 km. AM (530–1700 kHz) uses ground wave, range up to several hundred km, especially at night due to better ionospheric reflection."
    },
    {
      q: "Name two common applications of VHF radio waves.",
      a: "FM radio broadcasts (88–108 MHz), TV broadcasts (channels 2–13), marine and aviation communication, and walkie-talkies."
    },
    {
      q: "What is the 2.4 GHz ISM band used for?",
      a: "Industrial, Scientific, and Medical (ISM) band – used by Wi-Fi (802.11b/g/n/ax), Bluetooth, Zigbee, microwave ovens, and cordless phones. It's license-free but congested."
    },
    {
      q: "Why can radio waves travel through walls but infrared cannot?",
      a: "Radio waves have longer wavelengths (cm to km) that diffract around obstacles and penetrate non-metallic materials. Infrared has very short wavelengths (μm) and is blocked by solid objects."
    },
    {
    q: "Explain the concept of multipath interference in radio communication.",
      a: "Signals reflect off buildings, ground, etc., arriving at the receiver at slightly different times. This can cause signal cancellation (fading) or constructive interference. MIMO antennas help mitigate it."
    },
    {
      q: "What is the typical range of a 2.4 GHz Wi-Fi router indoors?",
      a: "Approximately 30-50 meters (100-150 feet) indoors, depending on wall materials, interference, and antenna design. 5 GHz has shorter range (~15-30 meters indoors)."
    },
    {
      q: "How do cellular networks (4G/5G) use radio waves?",
      a: "Cellular base stations transmit radio waves in licensed bands (e.g., 700 MHz, 1.8 GHz, 3.5 GHz). They use handoff and power control to maintain connections as users move."
    },
    {
      q: "What is the role of the ionosphere in radio wave propagation?",
      a: "The ionosphere (50–600 km altitude) contains charged particles that reflect radio waves below ~30 MHz. This enables long-distance (DX) communication, especially at night."
    },
    {
      q: "List three factors that affect radio wave signal strength.",
      a: "Distance (free-space path loss), obstacles (walls, terrain), atmospheric conditions (rain, fog), and interference from other radio sources."
    },
    {
      q: "Why is the 5 GHz band often preferred over 2.4 GHz for high-density Wi-Fi?",
      a: "5 GHz has more non-overlapping channels, less congestion from Bluetooth/microwaves, and supports higher data rates (802.11ac/ax). The trade-off is shorter range and poorer wall penetration."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      {/* Inline keyframes for reveal animations (same as Topic7) */}
      <style>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gentle-ripple {
          0% { transform: scale(0.95); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-fade-up {
          animation: fade-up 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
          svg * {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="animate-fade-up space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Radio Waves
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-amber-500 pl-4">
            The invisible backbone of wireless connectivity – from AM radio to Wi-Fi 6.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Radio waves are the most widely used unguided medium. They power your Wi-Fi, Bluetooth headphones, 
            FM radio, TV broadcasts, and cellular calls. Understanding their characteristics (frequency, propagation, 
            penetration) helps you design better wireless networks, troubleshoot interference, and choose the 
            right band for each scenario.
          </p>
        </div>

        {/* SVG Illustration: Radio Wave Propagation (Sky, Ground, LOS) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📡 How Radio Waves Travel</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="280" fill="none" />
              
              {/* Ground line */}
              <path d="M0,230 L900,230" stroke="#475569" strokeWidth="2" strokeDasharray="6 6" />
              <text x="10" y="245" fontSize="12" fill="#94a3b8">Ground</text>
              
              {/* Ionosphere layer */}
              <path d="M0,70 Q450,40 900,70" stroke="#c084fc" strokeWidth="2" fill="none" strokeDasharray="4 8" />
              <text x="800" y="60" fontSize="12" fill="#c084fc">Ionosphere</text>
              
              {/* Transmitter tower (left) */}
              <g transform="translate(80, 100)">
                <rect x="18" y="40" width="24" height="130" fill="#4f46e5" rx="3" />
                <polygon points="30,0 10,40 50,40" fill="#818cf8" />
                <circle cx="30" cy="20" r="4" fill="#f97316">
                  <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <path d="M30,170 L30,230" stroke="#f59e0b" strokeWidth="2" marker-end="url(#arrowGround)" />
                <text x="35" y="200" fontSize="10" fill="#f59e0b">Ground</text>
              </g>
              
              <g transform="translate(720, 150)">
                <rect x="10" y="40" width="60" height="50" fill="#334155" rx="4" />
                <polygon points="10,40 40,15 70,40" fill="#475569" />
                <circle cx="40" cy="55" r="8" fill="#f97316" stroke="#fff" strokeWidth="1.5">
                  <animate attributeName="fill" values="#f97316;#facc15;#f97316" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="20" y="105" fontSize="10" fill="#cbd5e1">Receiver</text>
              </g>
              

              <path d="M110,140 Q450,20 760,140" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="8 4">
                <animate attributeName="stroke-dashoffset" values="0;24" dur="3s" repeatCount="indefinite" />
              </path>
              <text x="420" y="50" fontSize="11" fill="#3b82f6" transform="rotate(-5,420,50)">Sky wave (reflection)</text>
              
              <path d="M110,140 L760,140" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;18" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="400" y="130" fontSize="11" fill="#10b981">Line-of-sight</text>
              
              <rect x="380" y="160" width="40" height="70" fill="#1e293b" rx="3" />
              <path d="M380,195 Q400,180 420,195" stroke="#f97316" strokeWidth="2" fill="none" />
              <text x="360" y="250" fontSize="10" fill="#94a3b8">Obstacle (building/hill)</text>
              
              <defs>
                <marker id="arrowGround" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Sky wave (ionosphere reflection)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Line-of-sight
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Ground wave
          </p>
        </div>

        {/* Key Characteristics */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">📈 Key Characteristics</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Frequency range:</strong> 3 Hz – 300 GHz (subdivided into bands: LF, MF, HF, VHF, UHF, SHF, EHF).</li>
              <li><strong>Propagation:</strong> Ground wave, sky wave, line-of-sight depending on frequency.</li>
              <li><strong>Penetration:</strong> Lower frequencies (kHz–MHz) penetrate buildings and foliage better.</li>
              <li><strong>Radiation pattern:</strong> Naturally omnidirectional (can be focused with directional antennas).</li>
              <li><strong>Reflection & diffraction:</strong> Can bend around obstacles (especially long wavelengths).</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">🌍 Real-World Applications</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Broadcasting:</strong> AM/FM radio, over-the-air TV (VHF/UHF).</li>
              <li><strong>Networking:</strong> Wi-Fi (2.4/5/6 GHz), Bluetooth, Zigbee, LoRa.</li>
              <li><strong>Mobile:</strong> 2G/3G/4G/5G cellular (700 MHz – 3.5 GHz).</li>
              <li><strong>Navigation:</strong> GPS (1.2–1.5 GHz), VOR aviation beacons.</li>
              <li><strong>Emergency:</strong> CB radio, marine VHF, amateur (ham) radio.</li>
            </ul>
          </div>
        </div>

        {/* Wi-Fi Focus Card */}
        <div className="animate-fade-up bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-5 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-xl font-bold flex items-center gap-2">📶 Radio Waves in Wi-Fi (What You Use Every Day)</h3>
          <p className="mt-2">Most Wi-Fi routers use <strong>2.4 GHz</strong> and <strong>5 GHz</strong> radio bands:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
              <span className="font-mono text-amber-600 dark:text-amber-400">2.4 GHz</span>
              <ul className="text-sm list-disc pl-5 mt-1">
                <li>Longer range (30–50m indoors)</li>
                <li>Better wall penetration</li>
                <li>Crowded (microwave ovens, Bluetooth, cordless phones)</li>
                <li>Only 3 non-overlapping channels (1,6,11)</li>
              </ul>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 p-3 rounded-lg">
              <span className="font-mono text-indigo-600 dark:text-indigo-400">5 GHz</span>
              <ul className="text-sm list-disc pl-5 mt-1">
                <li>Shorter range (15–30m indoors)</li>
                <li>Higher data rates (up to 1.3 Gbps with 802.11ac)</li>
                <li>Less interference (more channels, DFS)</li>
                <li>Requires LOS for max performance</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">✨ In a crowded <strong>Barrackpore</strong> apartment complex, Tuhina uses 5 GHz for streaming because 2.4 GHz is overloaded with neighbor's Wi-Fi and Bluetooth devices.</p>
        </div>

        {/* Professional Tips & Common Mistakes */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Channel planning:</strong> Use channels 1,6,11 for 2.4 GHz to avoid overlap.</li>
              <li><strong>Site survey:</strong> Use a Wi-Fi analyzer app (e.g., NetSpot) before deploying APs.</li>
              <li><strong>Antenna orientation:</strong> For omnidirectional, vertical polarization works best for most devices.</li>
              <li><strong>Band steering:</strong> Encourage dual-band clients to use 5 GHz for less congestion.</li>
              <li><strong>RF shielding:</strong> Metal objects (filing cabinets, mirrors) reflect radio waves – avoid placing APs near them.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Assuming all radio waves are the same – ignoring frequency-dependent behavior.</li>
              <li>Placing Wi-Fi routers in corners or metal cabinets (kills signal).</li>
              <li>Using the same channel as a neighboring AP (causes co-channel interference).</li>
              <li>Forgetting that weather (rain, fog) affects high-frequency radio (>10 GHz).</li>
              <li>Misunderstanding "omnidirectional" – it's doughnut-shaped, not a perfect sphere.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Radio Deployment</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Perform a predictive RF simulation before installing outdoor links.</li>
            <li>Use lower frequencies (e.g., 900 MHz LoRa) for long-range, low-data IoT sensors.</li>
            <li>Implement transmit power control (TPC) to reduce interference and save battery.</li>
            <li>For critical links, use diversity antennas or MIMO to combat multipath fading.</li>
            <li>Always comply with local EIRP (Equivalent Isotropically Radiated Power) regulations.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define radio wave frequency range</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name 3 propagation modes</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain why 2.4 GHz has longer range than 5 GHz</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify Wi-Fi band congestion issues</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Give 3 real-world applications beyond Wi-Fi</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Radio waves are the most intuitive unguided medium, but students often confuse frequency with data rate. Emphasize that higher frequency doesn't automatically mean higher throughput – it's about bandwidth and signal-to-noise ratio. Use the analogy: radio waves are like voices in a crowded room (2.4 GHz = many people talking, 5 GHz = fewer people but clearer). Also, remind them that 'omnidirectional' does NOT mean signal goes through everything equally – walls absorb/reflect differently based on material and frequency."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Radio Waves</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-amber-700 dark:text-amber-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-amber-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📡 Master these before moving to microwave or satellite topics.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📶 Topic 8: Radio Waves — Next: Microwave Transmission (Topic 9)
        </div>
      </div>
    </div>
  );
};

export default Topic8;