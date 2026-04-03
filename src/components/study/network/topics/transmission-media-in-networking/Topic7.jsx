import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic7: Unguided Media (Wireless Communication)
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to wireless transmission media.
 * 
 * @purpose
 * Explain the principles, types, and applications of unguided media (radio waves, microwaves, infrared).
 * 
 * @usage
 * Used in networking courses, computer science classes, or professional training modules.
 * Builds upon guided media concepts and prepares for wireless network topics.
 */

const Topic7 = () => {
  // Sample data for Q&A (could be static, but defined here for clarity)
  const qaList = [
    {
      q: "What is unguided media? Give two examples.",
      a: "Unguided media transport electromagnetic waves without a physical conductor (air, vacuum). Examples: radio waves, microwaves, infrared."
    },
    {
      q: "Differentiate between guided and unguided media.",
      a: "Guided (twisted pair, fiber) uses a solid path for signals; unguided (wireless) radiates waves through air/space. Unguided offers mobility but is more susceptible to interference."
    },
    {
      q: "What are the three main categories of unguided media?",
      a: "Radio waves (3 Hz – 300 GHz), Microwaves (300 MHz – 300 GHz, often above 1 GHz), and Infrared (300 GHz – 400 THz)."
    },
    {
      q: "Why are radio waves suitable for long-distance communication?",
      a: "Radio waves can travel long distances because they reflect off the ionosphere (sky wave propagation) and diffract around obstacles, unlike microwaves."
    },
    {
      q: "Explain the difference between omnidirectional and directional antennas.",
      a: "Omnidirectional antennas radiate power in all directions (used for radio broadcasts, Wi-Fi). Directional antennas focus energy in one direction (microwave dishes, point-to-point links)."
    },
    {
      q: "What is line-of-sight (LOS) transmission? Which unguided media require it?",
      a: "LOS means the transmitter and receiver must see each other without obstruction. Microwaves and infrared require LOS; low-frequency radio waves do not."
    },
    {
      q: "Mention one advantage and one disadvantage of microwave transmission.",
      a: "Advantage: high bandwidth and focused beam. Disadvantage: susceptible to atmospheric effects (rain fade) and requires precise alignment."
    },
    {
      q: "How does infrared communication differ from radio waves?",
      a: "Infrared uses higher frequency (above visible light) and cannot penetrate walls, making it secure within a room. Radio waves can pass through walls but cause more interference."
    },
    {
      q: "What is the typical application of infrared in daily life?",
      a: "Remote controls (TV, AC), short-range data transfer (obsolete IrDA), and some wireless headphones."
    },
    {
      q: "Describe sky wave propagation.",
      a: "Radio waves (2–30 MHz) are reflected by the ionosphere back to Earth, enabling long-distance (hundreds to thousands of km) communication."
    },
    {
      q: "What is ground wave propagation? Where is it used?",
      a: "Waves follow the Earth's curvature (AM radio, maritime communication). Effective at low frequencies (up to 2 MHz) and over distances up to a few hundred km."
    },
    {
      q: "Why do 2.4 GHz Wi-Fi signals travel farther than 5 GHz?",
      a: "Lower frequency radio waves (2.4 GHz) have better penetration and less attenuation over distance compared to higher frequency 5 GHz."
    },
    {
      q: "Give two real-world examples where microwave links are preferred over fiber optic cable.",
      a: "1) Connecting two buildings across a city river (avoid digging). 2) Temporary events like sports stadiums where laying fiber is impractical."
    },
    {
      q: "What is the main limitation of infrared for networking?",
      a: "Infrared cannot penetrate walls; it requires direct LOS or reflection from a surface. Also, sunlight and fluorescent light cause interference."
    },
    {
      q: "How does a satellite act as a microwave relay station?",
      a: "Satellites receive uplink microwave signals, amplify them, and retransmit on a different frequency (downlink) back to Earth, covering large areas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      {/* Inline keyframes for reveal animations (no external libs) */}
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
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
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
        {/* Section 1: Title + Intro (staggered) */}
        <div className="animate-fade-up space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Unguided Media
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-indigo-500 pl-4">
            Wireless communication – transmitting signals through air, vacuum, or water without physical conductors.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            In today’s connected world, we rely on Wi-Fi, 4G/5G, Bluetooth, and satellite TV. All of these use 
            <strong className="font-semibold text-indigo-600 dark:text-indigo-400"> unguided media</strong>: 
            electromagnetic waves that radiate freely. Understanding radio waves, microwaves, and infrared helps 
            you design robust wireless networks, avoid interference, and choose the right technology for each scenario.
          </p>
        </div>

        {/* SVG Illustration: Wireless Communication Overview */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📡 How Wireless Travels</h2>
          <div className="flex justify-center">
            <svg width="100%" height="260" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              {/* Background subtle grid */}
              <rect width="800" height="240" fill="none" />
              
              {/* Radio tower (left) */}
              <g transform="translate(80, 60)">
                <rect x="18" y="40" width="24" height="100" fill="#4f46e5" rx="4" />
                <polygon points="30,0 10,40 50,40" fill="#818cf8" />
                {/* Radio waves (concentric arcs with animation) */}
                <path d="M30,20 A30,30 0 0,1 80,50" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M30,15 A45,45 0 0,1 95,50" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 4">
                  <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.4s" repeatCount="indefinite" />
                </path>
                <path d="M30,10 A65,65 0 0,1 110,50" stroke="#f59e0b" strokeWidth="1.8" fill="none" strokeDasharray="3 5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
                </path>
                <text x="5" y="155" fontSize="12" fill="#cbd5e1">Radio</text>
              </g>
              
              {/* Microwave dish (center) */}
              <g transform="translate(380, 60)">
                <ellipse cx="40" cy="50" rx="50" ry="25" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
                <line x1="40" y1="50" x2="85" y2="50" stroke="#f97316" strokeWidth="3" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;20" dur="0.8s" repeatCount="indefinite" />
                </line>
                <line x1="40" y1="50" x2="85" y2="35" stroke="#f97316" strokeWidth="2" opacity="0.7" />
                <circle cx="40" cy="50" r="6" fill="#f97316" />
                <rect x="32" y="80" width="16" height="40" fill="#334155" />
                <text x="10" y="140" fontSize="12" fill="#cbd5e1">Microwave</text>
                <text x="50" y="25" fontSize="10" fill="#fcd34d">LOS Beam</text>
              </g>
              
              {/* Infrared remote (right) */}
              <g transform="translate(650, 80)">
                <rect x="10" y="30" width="70" height="40" fill="#1e293b" rx="6" />
                <circle cx="25" cy="50" r="6" fill="#ef4444">
                  <animate attributeName="fill" values="#ef4444;#ff8c8c;#ef4444" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="45" y="55" fontSize="12" fill="#f8fafc">Remote</text>
                <path d="M80,50 L140,50" stroke="#b91c1c" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.8">
                  <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.5s" repeatCount="indefinite" />
                </path>
                <rect x="140" y="42" width="50" height="16" fill="#450a0a" rx="4" />
                <text x="150" y="54" fontSize="10" fill="#fca5a5">IR sensor</text>
                <text x="5" y="90" fontSize="12" fill="#cbd5e1">Infrared</text>
              </g>
              
              {/* Labels + explanation caption */}
              <text x="30" y="210" fontSize="12" fill="#94a3b8">Omnidirectional</text>
              <text x="360" y="210" fontSize="12" fill="#94a3b8">Directional / LOS</text>
              <text x="630" y="210" fontSize="12" fill="#94a3b8">Short-range LOS</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Radio waves (broadcast)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span> Microwave (focused beam)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Infrared (remote control)
          </p>
        </div>

        {/* Types of Unguided Media (grid but stacked overall) */}
        <div className="animate-fade-up space-y-5">
          <h2 className="text-2xl font-bold border-l-5 border-indigo-500 pl-3">🔍 Three Pillars of Unguided Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radio Waves Card */}
            <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="text-4xl mb-2">📻</div>
              <h3 className="text-xl font-semibold">Radio Waves</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">3 Hz – 300 GHz</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Omnidirectional, penetrate buildings, travel long distances (ionosphere reflection). Used in AM/FM radio, TV broadcast, Wi-Fi (2.4/5 GHz), Bluetooth, cellular.</p>
              <div className="mt-3 text-xs bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-md">
                <strong>Student story:</strong> In <span className="font-medium">Barrackpore</span>, Tuhina uses 4G radio waves to stream videos — signal passes through walls easily.
              </div>
            </div>
            {/* Microwaves Card */}
            <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="text-4xl mb-2">📡</div>
              <h3 className="text-xl font-semibold">Microwaves</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">1 GHz – 300 GHz</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Directional, line-of-sight, high bandwidth. Used in point-to-point links, satellite communication, radar, 5G backhaul. Requires careful alignment.</p>
              <div className="mt-3 text-xs bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-md">
                <strong>Real-life:</strong> <span className="font-medium">Shyamnagar</span> college connects two buildings using microwave link across the road, avoiding fiber trenching cost.
              </div>
            </div>
            {/* Infrared Card */}
            <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="text-4xl mb-2">🕹️</div>
              <h3 className="text-xl font-semibold">Infrared</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">300 GHz – 400 THz</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Line-of-sight, short range (few meters), cannot penetrate walls. Secure within a room, but blocked by sunlight / fluorescent light. Common in remote controls, old PDA sync.</p>
              <div className="mt-3 text-xs bg-indigo-50 dark:bg-indigo-950/40 p-2 rounded-md">
                <strong>Example:</strong> Susmita controls AC in her <span className="font-medium">Naihati</span> classroom using infrared — no interference from adjacent rooms.
              </div>
            </div>
          </div>
        </div>

        {/* Propagation modes + real-world context */}
        <div className="animate-fade-up bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 border border-indigo-200 dark:border-indigo-800">
          <h3 className="text-xl font-bold flex items-center gap-2">🌍 How Waves Travel: Propagation Modes</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><span className="font-bold text-indigo-700 dark:text-indigo-300">Ground wave</span> – follows Earth’s curvature (AM radio, marine). Low frequencies (up to 2 MHz).</div>
            <div><span className="font-bold text-indigo-700 dark:text-indigo-300">Sky wave</span> – reflects off ionosphere (shortwave radio, amateur radio). Range up to thousands km.</div>
            <div><span className="font-bold text-indigo-700 dark:text-indigo-300">Line-of-sight</span> – direct path, no obstacles. Microwaves, infrared, satellite links.</div>
          </div>
          <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">Think about: In Ichapur, why does a microwave link stop working when a crane blocks the path? Because LOS is broken.</p>
        </div>

        {/* Tips & Tricks from Professionals */}
        <div className="animate-fade-up bg-gray-100 dark:bg-gray-800/50 rounded-xl p-5 transition-all hover:shadow-md">
          <h3 className="text-xl font-bold">💡 Pro Tips & Tricks</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Fresnel Zone:</strong> Keep 60% of the first Fresnel zone clear for microwave links — even partial obstruction causes signal loss.</li>
            <li><strong>Frequency Planning:</strong> In crowded Wi-Fi areas (schools, offices), use 5 GHz instead of 2.4 GHz to avoid interference from Bluetooth and microwaves.</li>
            <li><strong>Antenna Gain:</strong> Directional antennas (Yagi, parabolic) increase range and reduce noise — perfect for point-to-point.</li>
            <li><strong>Weather impact:</strong> Rain fade affects >10 GHz signals; plan link budget accordingly.</li>
            <li><strong>Security:</strong> Wireless signals can be intercepted outside buildings — always use encryption (WPA3, VPN).</li>
          </ul>
          <p className="text-xs mt-2 text-gray-500">In Barrackpore’s campus, Debangshu avoided 2.4 GHz congestion by switching to 5 GHz for the computer lab — throughput increased by 200%.</p>
        </div>

        {/* Common pitfalls + Best practices (two columns for better readability but not side-by-side overall? It's fine within section) */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-800 dark:text-gray-200">
              <li>Assuming "wireless" means no limitations — walls, distance, interference all matter.</li>
              <li>Ignoring multipath fading (reflections causing cancellation).</li>
              <li>Using omnidirectional antennas for long-distance links (wastes power).</li>
              <li>Neglecting regulatory compliance (FCC/ITU frequency licensing).</li>
              <li>Forgetting that infrared stops working in direct sunlight or with obstacles.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-800 dark:text-gray-200">
              <li>Perform a site survey before deploying wireless.</li>
              <li>Use shielded enclosures for microwave transmitters to avoid interference.</li>
              <li>Implement diversity antennas (MIMO) to combat multipath.</li>
              <li>Always calculate link margin for outdoor microwave.</li>
              <li>For infrared: place receivers away from windows or strong lights.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="animate-fade-up bg-gray-200 dark:bg-gray-800 rounded-xl p-5 text-center">
          <h3 className="text-lg font-bold">📋 Student Checklist – Unguided Media</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm">
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">✅ I can name 3 unguided media types</span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">✅ I understand LOS vs non-LOS propagation</span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">✅ I know microwave needs precise alignment</span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">✅ I can explain why infrared is room-confined</span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">✅ I've seen real-world Wi-Fi / satellite examples</span>
          </div>
        </div>

        {/* Teacher's Note (via component) */}
        <div className="animate-fade-up">
          <Teacher note={"Wireless is not magic: it's physics. Many students think that 'wireless' means completely free and unlimited. Emphasize that each unguided medium has specific frequency, range, and line-of-sight constraints. Use the analogy of talking: radio waves = shouting (everyone hears), microwave = whispering through a tube (focused), infrared = flashlight beam (needs direct line). Also stress that in exams, they must differentiate between omnidirectional vs directional and give at least two applications per type."} />
        </div>

        {/* 15 Questions & Answers */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Must-Know Questions & Answers</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-indigo-700 dark:text-indigo-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-indigo-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">🧠 Master these before moving to guided vs unguided comparisons.</p>
        </div>

        {/* Footer / note about next topics */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📡 Topic 7: Unguided Media — Next: Radio Waves deep dive (Topic 8)
        </div>
      </div>
    </div>
  );
};

export default Topic7;