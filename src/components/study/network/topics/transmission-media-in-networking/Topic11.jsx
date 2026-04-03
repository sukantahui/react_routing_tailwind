import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic11: Infrared Communication
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to infrared communication.
 * 
 * @purpose
 * Explain the characteristics, short-range applications, advantages, and limitations
 * of infrared as an unguided medium.
 * 
 * @usage
 * Used in networking courses to cover very short-range wireless communication
 * after satellite and microwave topics.
 */

const Topic11 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What frequency range does infrared communication use?",
      a: "Infrared spans approximately 300 GHz to 400 THz (wavelengths 780 nm to 1 mm). It lies just below visible light in the electromagnetic spectrum."
    },
    {
      q: "What is the main characteristic of infrared transmission?",
      a: "Infrared requires line-of-sight (or reflection from a surface), has very short range (typically <10 meters), and cannot penetrate walls or solid obstacles."
    },
    {
      q: "Why can't infrared penetrate walls?",
      a: "Infrared has very short wavelengths (micrometers to sub-millimeter). These waves are absorbed or reflected by most solid materials, including walls, glass, and even thick paper."
    },
    {
    q: "Give three common applications of infrared communication.",
      a: "1) TV/DVD/AC remote controls. 2) Short-range data transfer (IrDA – obsolete but used in some legacy devices). 3) Wireless headphones and some motion sensors."
    },
    {
      q: "What is IrDA?",
      a: "Infrared Data Association (IrDA) defined standards for short-range, point-to-point infrared data transfer (up to 4 Mbps, range 1 meter). Used in old PDAs, printers, and phones."
    },
    {
      q: "What are the advantages of infrared over radio waves for remote controls?",
      a: "Infrared is cheap, low power, does not interfere with other devices, and signals are confined to a room (security, no cross-room interference)."
    },
    {
      q: "What is the main disadvantage of infrared?",
      a: "Requires direct line-of-sight; obstacles or even dust can block the signal. Also, sunlight and fluorescent lights contain strong infrared components causing interference."
    },
    {
      q: "Why don't modern smartphones use infrared for data transfer anymore?",
      a: "Bluetooth and Wi-Fi Direct offer longer range, higher speeds, and do not require line-of-sight. IrDA was too slow (max 4 Mbps) and alignment-sensitive."
    },
    {
      q: "Can infrared signals be reflected?",
      a: "Yes, they can reflect off light-colored walls or ceilings. Some IR remote controls use this to work around corners (e.g., IR repeaters)."
    },
    {
      q: "What is the typical modulation scheme used in IR remotes?",
      a: "Pulse-coded modulation (usually 38 kHz carrier) with protocols like NEC, Sony SIRC, or RC-5. Each key press sends a unique binary code."
    },
    {
      q: "How does sunlight affect infrared communication?",
      a: "Sunlight contains a broad spectrum including infrared. It can overwhelm the IR receiver's photodiode, causing reduced sensitivity or false signals (especially outdoors)."
    },
    {
      q: "What is the typical range of a TV infrared remote?",
      a: "About 5–10 meters (15–30 feet) indoors, depending on battery strength, receiver sensitivity, and ambient light. Direct line-of-sight gives best range."
    },
    {
      q: "Name two security advantages of infrared.",
      a: "1) Signals do not penetrate walls – no eavesdropping from adjacent rooms. 2) Very short range – accidental interference is minimal."
    },
    {
      q: "Why are infrared sensors used in automatic doors and proximity detectors?",
      a: "Infrared can detect presence via reflection (active IR) or heat (passive IR – PIR). They are low-cost, reliable for short-range, and unaffected by audible noise."
    },
    {
      q: "What is the difference between directed and diffuse infrared?",
      a: "Directed IR requires precise alignment (like a remote control). Diffuse IR transmits signals in a wide angle, reflecting off walls/ceiling (used in some wireless LANs, now obsolete)."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      {/* Inline keyframes for reveal animations */}
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
        @keyframes ir-pulse {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: -16; opacity: 0.3; }
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 2px #ef4444); }
          100% { filter: drop-shadow(0 0 8px #ef4444); }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Infrared Communication
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-red-500 pl-4">
            Short-range, line-of-sight wireless – the technology behind your remote control.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Every time you change the TV channel or adjust the AC, you're using infrared (IR) – a simple, 
            low-cost, and secure wireless technology. While largely replaced by radio for data transfer, 
            infrared remains dominant in remote controls and proximity sensing. Understanding its strengths 
            (privacy, low interference) and weaknesses (line-of-sight, short range) helps you choose the 
            right wireless technology for short-distance applications.
          </p>
        </div>

        {/* SVG Illustration: IR Remote Controlling a TV (Line-of-Sight) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">🕹️ How Infrared Works (Remote Control)</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="260" viewBox="0 0 900 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="240" fill="none" />
              
              {/* Remote control (left) */}
              <g transform="translate(80, 100)">
                <rect x="0" y="0" width="60" height="100" fill="#1e293b" rx="8" />
                <rect x="15" y="10" width="30" height="12" fill="#ef4444" rx="2">
                  <animate attributeName="fill" values="#ef4444;#ff8c8c;#ef4444" dur="1s" repeatCount="indefinite" />
                </rect>
                <circle cx="30" cy="28" r="4" fill="#ef4444" />
                {/* Buttons */}
                <rect x="10" y="45" width="15" height="10" fill="#475569" rx="2" />
                <rect x="35" y="45" width="15" height="10" fill="#475569" rx="2" />
                <rect x="10" y="60" width="15" height="10" fill="#475569" rx="2" />
                <rect x="35" y="60" width="15" height="10" fill="#475569" rx="2" />
                <text x="0" y="115" fontSize="10" fill="#cbd5e1">Remote</text>
              </g>
              
              {/* Infrared light pulses (wavy lines) */}
              <path d="M140,140 L240,140" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" opacity="0.8">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="0.6s" repeatCount="indefinite" />
              </path>
              <path d="M140,145 L240,145" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" opacity="0.5">
                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.6s" repeatCount="indefinite" />
              </path>
              <path d="M140,135 L240,135" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.3">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.6s" repeatCount="indefinite" />
              </path>
              
              {/* TV (right) */}
              <g transform="translate(680, 60)">
                <rect x="0" y="0" width="160" height="110" fill="#1e293b" rx="8" />
                <rect x="10" y="10" width="140" height="80" fill="#0f172a" rx="4" />
                {/* Screen content */}
                <text x="80" y="55" textAnchor="middle" fontSize="14" fill="#facc15">VOL ▲</text>
                {/* IR receiver window */}
                <rect x="120" y="95" width="20" height="10" fill="#ef4444" rx="2">
                  <animate attributeName="fill" values="#ef4444;#ff8c8c;#ef4444" dur="1s" repeatCount="indefinite" />
                </rect>
                <text x="50" y="125" fontSize="10" fill="#cbd5e1">TV / AC</text>
              </g>
              
              {/* Obstacle (wall) blocking IR */}
              <g transform="translate(450, 80)">
                <rect x="0" y="0" width="20" height="100" fill="#475569" rx="2" />
                <text x="-10" y="115" fontSize="10" fill="#94a3b8">Wall (blocks IR)</text>
              </g>
              
              {/* Reflection path (alternative) */}
              <path d="M140,140 Q300,200 680,150" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="380" y="195" fontSize="10" fill="#facc15">Reflected path (works off walls)</text>
              
              {/* Line-of-sight label */}
              <text x="250" y="115" fontSize="11" fill="#ef4444" fontWeight="bold">Line-of-Sight Required</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Infrared beam (LOS)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Reflected path (possible)
            &nbsp;| <span className="inline-block w-3 h-3 bg-gray-600 mr-1"></span> Solid obstacle (blocks IR)
          </p>
        </div>

        {/* Key Characteristics + Comparison Table */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">📊 Infrared Characteristics</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Frequency:</strong> 300 GHz – 400 THz (near visible light)</li>
              <li><strong>Range:</strong> Typically 1–10 meters (up to 30m with high-power)</li>
              <li><strong>Penetration:</strong> Cannot penetrate walls, glass, or dense obstacles</li>
              <li><strong>Directionality:</strong> Highly directional (or diffuse with wide-angle LEDs)</li>
              <li><strong>Interference:</strong> Susceptible to sunlight, fluorescent lights, and heat sources</li>
              <li><strong>Security:</strong> High – signals stay within a room</li>
              <li><strong>Power:</strong> Very low (battery-powered remotes last years)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">🔍 IR vs Radio (e.g., Bluetooth)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr><th className="p-2">Feature</th><th>Infrared</th><th>Radio (Bluetooth)</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">Range</td><td>~10m</td><td>~100m</td></tr>
                  <tr className="border-b"><td className="p-2">Wall penetration</td><td>No</td><td>Yes</td></tr>
                  <tr className="border-b"><td className="p-2">Line-of-sight</td><td>Required</td><td>Not required</td></tr>
                  <tr className="border-b"><td className="p-2">Interference</td><td>Sunlight, lights</td><td>Other radios</td></tr>
                  <tr className="border-b"><td className="p-2">Cost</td><td>Very low</td><td>Low</td></tr>
                  <tr><td className="p-2">Typical use</td><td>Remote controls</td><td>Headphones, file transfer</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Real-World Applications & Limitations */}
        <div className="animate-fade-up bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
          <h3 className="text-xl font-bold">📱 Real-World Applications of Infrared</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">✅ Everyday uses:</p>
              <ul className="list-disc pl-5 text-sm">
                <li>TV, AC, DVD, set-top box remote controls</li>
                <li>Wireless headphones (some models)</li>
                <li>IrDA file transfer (legacy PDAs, printers)</li>
                <li>Motion sensors (PIR for security lights, automatic doors)</li>
                <li>Night vision illuminators (CCTV cameras)</li>
                <li>Proximity sensors in smartphones (turn off screen during calls)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">❌ Limitations:</p>
              <ul className="list-disc pl-5 text-sm">
                <li>Requires direct line-of-sight or strong reflection</li>
                <li>Blocked by walls, furniture, even thick dust</li>
                <li>Sunlight causes interference (outdoor remotes struggle)</li>
                <li>Very short range (max ~30m for high-power)</li>
                <li>Low data rate (IrDA max 4 Mbps)</li>
                <li>No multiple-access (one transmitter at a time)</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">💡 <strong>Student story:</strong> In <strong>Naihati</strong>, Abhronila tried to use her TV remote from the next room – it didn't work because IR cannot pass through walls. She had to walk back to the living room.</p>
        </div>

        {/* Professional Tips & Common Mistakes */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (IR System Design)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Carrier frequency:</strong> Most remotes use 38 kHz modulation – ensures immunity to 50/60 Hz ambient light.</li>
              <li><strong>Reflection strategy:</strong> For hidden devices, use IR repeaters or place receiver near a reflective white wall.</li>
              <li><strong>Filtering:</strong> Use a daylight filter (black epoxy) on IR receivers to block visible light but pass IR.</li>
              <li><strong>Code learning:</strong> Universal remotes learn IR codes by capturing pulse timing – store in EEPROM.</li>
              <li><strong>Battery life:</strong> IR LEDs pulse at high current (100mA+) but for very short duration (microseconds), so average power is tiny.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Assuming IR works through glass – most glass blocks IR (except special IR-transparent glass).</li>
              <li>Pointing remote at the TV from extreme angles – IR LEDs have limited beam width (±15° to ±30°).</li>
              <li>Using IR outdoors in sunlight – receiver gets saturated; range drops to &lt; 1m.</li>
              <li>Forgetting to remove protective plastic from IR receiver window.</li>
              <li>Misunderstanding that IR can be reflected – but only from light-colored, matte surfaces (mirrors reflect poorly).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Mini Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for IR Systems</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Position IR receivers in direct line-of-sight from typical user positions.</li>
            <li>For critical applications (e.g., IR data link), use a lens to focus or collimate the beam.</li>
            <li>Use multiple IR LEDs in parallel for wider angle or higher power.</li>
            <li>Implement error detection/correction (e.g., checksum) in IR protocols to avoid false triggers.</li>
            <li>Keep IR receivers away from direct sunlight or fluorescent ballasts.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define infrared frequency range</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain line-of-sight requirement</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name 3 common IR applications</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Compare IR vs radio (Bluetooth)</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify why IR cannot penetrate walls</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Understand sunlight interference</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Infrared is often overlooked but it's an elegant solution for short-range, secure, low-interference communication. Students should understand that 'wireless' is not a single technology – IR serves where radio is overkill (e.g., remote control). Emphasize that IR's inability to penetrate walls is a feature (privacy) not a bug. For exams, they should be able to contrast IR with radio waves and microwaves. Real-world debugging tip: if a remote doesn't work, first check the battery, then check if the IR LED is flashing (visible through a phone camera)."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Infrared Communication</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-red-700 dark:text-red-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-red-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">🔦 Next: Performance Metrics (Topic 12) – measuring network quality.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          🔦 Topic 11: Infrared Communication — Next: Performance Metrics (Topic 12)
        </div>
      </div>
    </div>
  );
};

export default Topic11;