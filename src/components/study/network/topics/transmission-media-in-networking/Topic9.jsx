import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic9: Microwave Transmission
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to microwave communication.
 * 
 * @purpose
 * Explain the characteristics, line-of-sight requirements, terrestrial and satellite microwave links,
 * and real-world applications of microwave transmission.
 * 
 * @usage
 * Used in networking courses to cover high-frequency wireless communication after radio waves.
 */

const Topic9 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What frequency range is considered microwave?",
      a: "Microwaves typically range from 1 GHz to 300 GHz (though some definitions start at 300 MHz). Common bands: 2.4 GHz, 5 GHz, 6 GHz, 11 GHz, 18 GHz, 23 GHz, 38 GHz."
    },
    {
      q: "Why do microwaves require line-of-sight (LOS)?",
      a: "Microwaves have very short wavelengths (cm to mm) and cannot diffract around obstacles like lower-frequency radio waves. Any solid obstruction (buildings, hills, trees) blocks or severely attenuates the signal."
    },
    {
      q: "What is the main advantage of microwave over radio waves?",
      a: "Microwaves offer much higher bandwidth (data rates) because of their higher frequencies. They also use directional antennas, reducing interference and improving security."
    },
    {
      q: "List three common terrestrial microwave applications.",
      a: "1) Point-to-point backhaul for cellular towers. 2) Connecting campus buildings across a road or river. 3) Temporary event coverage (sports, concerts). 4) Broadband for rural areas (replacing fiber)."
    },
    {
      q: "What is rain fade, and how does it affect microwave links?",
      a: "Rain fade is the absorption and scattering of microwave signals by raindrops. Frequencies above 10 GHz are severely affected, causing link outages during heavy rain. Link budget must include fade margin."
    },
    {
      q: "How does a satellite microwave link work?",
      a: "An earth station transmits (uplink) a microwave signal to a satellite, which amplifies it and retransmits (downlink) on a different frequency to another earth station, covering large areas."
    },
    {
      q: "What is the difference between terrestrial and satellite microwave?",
      a: "Terrestrial uses ground-based towers (range up to 50 km, low latency). Satellite uses orbiting relays (range intercontinental, but higher latency due to distance, e.g., 250 ms for GEO)."
    },
    {
      q: "Explain the concept of Fresnel zone in microwave planning.",
      a: "The Fresnel zone is an ellipsoidal region around the LOS path where reflected signals can cause cancellation. For reliable links, 60% of the first Fresnel zone must be clear of obstacles."
    },
    {
      q: "Why are directional antennas used in microwave links?",
      a: "Directional antennas (parabolic dishes, horn antennas) focus energy into a narrow beam, increasing gain, reducing interference from other directions, and extending range."
    },
    {
      q: "What is the typical maximum distance for a terrestrial microwave link?",
      a: "Due to Earth's curvature and tower height, typical links are 10–50 km. With tall towers or mountains, links up to 100+ km are possible (e.g., troposcatter)."
    },
    {
      q: "Name two frequency bands commonly used for point-to-point microwave backhaul.",
      a: "6 GHz (long-haul), 11 GHz, 18 GHz, 23 GHz (short-haul urban), and 38 GHz (very short, high capacity). The choice depends on distance, rain, and licensing."
    },
    {
      q: "How does atmospheric refraction affect microwave transmission?",
      a: "Changes in temperature, pressure, and humidity bend microwave beams (k-factor). This can cause fading or even ducting (propagation beyond horizon), sometimes interfering with other links."
    },
    {
      q: "What is the role of a microwave repeater?",
      a: "When LOS is blocked by distance or terrain, repeaters receive, amplify, and retransmit the signal to extend the link. They can be passive (reflectors) or active (amplifiers)."
    },
    {
      q: "Why is microwave not suitable for indoor mobile communication?",
      a: "Microwaves are easily blocked by walls and human bodies. They also require precise alignment, making them impractical for moving devices. That's why Wi-Fi uses lower frequencies (2.4/5 GHz) indoors."
    },
    {
      q: "What is the difference between licensed and unlicensed microwave bands?",
      a: "Licensed bands (e.g., 6, 11, 18 GHz) require FCC/regulator approval, offering guaranteed interference-free operation. Unlicensed bands (e.g., 2.4, 5, 60 GHz) are open to anyone but subject to interference."
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
        @keyframes beam-pulse {
          0% { stroke-dashoffset: 0; opacity: 0.6; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: -20; opacity: 0.6; }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Microwave Transmission
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-orange-500 pl-4">
            High-bandwidth, line-of-sight wireless – the backbone of cellular backhaul and satellite links.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When fiber optic cables are impractical (rivers, mountains, cities), microwave transmission steps in. 
            It powers the connection between your cell tower and the internet, enables satellite TV, and provides 
            high-speed links for enterprises. Understanding microwaves is key to designing robust long-distance 
            wireless networks.
          </p>
        </div>

        {/* SVG Illustration: Terrestrial Microwave Link with Fresnel Zone */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📡 Terrestrial Microwave Link</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="280" fill="none" />
              
              {/* Ground */}
              <path d="M0,240 Q450,230 900,240" stroke="#475569" strokeWidth="2" fill="none" />
              
              {/* Left Tower */}
              <g transform="translate(80, 100)">
                <rect x="15" y="30" width="30" height="140" fill="#4f46e5" rx="3" />
                <ellipse cx="30" cy="25" rx="25" ry="15" fill="#818cf8" />
                {/* Parabolic dish */}
                <ellipse cx="30" cy="60" rx="20" ry="30" fill="none" stroke="#f97316" strokeWidth="3" />
                <line x1="30" y1="60" x2="60" y2="60" stroke="#f97316" strokeWidth="2.5">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.8s" repeatCount="indefinite" />
                </line>
                <circle cx="30" cy="60" r="4" fill="#f97316" />
                <text x="10" y="185" fontSize="12" fill="#cbd5e1">Tower A</text>
              </g>
              
              {/* Right Tower */}
              <g transform="translate(700, 100)">
                <rect x="15" y="30" width="30" height="140" fill="#4f46e5" rx="3" />
                <ellipse cx="30" cy="25" rx="25" ry="15" fill="#818cf8" />
                <ellipse cx="30" cy="60" rx="20" ry="30" fill="none" stroke="#f97316" strokeWidth="3" />
                <line x1="30" y1="60" x2="0" y2="60" stroke="#f97316" strokeWidth="2.5">
                  <animate attributeName="stroke-dashoffset" values="0;12" dur="0.8s" repeatCount="indefinite" />
                </line>
                <circle cx="30" cy="60" r="4" fill="#f97316" />
                <text x="10" y="185" fontSize="12" fill="#cbd5e1">Tower B</text>
              </g>
              
              {/* LOS beam */}
              <line x1="110" y1="160" x2="730" y2="160" stroke="#f97316" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.9">
                <animate attributeName="stroke-dashoffset" values="0;28" dur="1.5s" repeatCount="indefinite" />
              </line>
              
              {/* Fresnel Zone ellipse (first zone) */}
              <ellipse cx="420" cy="160" rx="310" ry="45" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" />
              <text x="430" y="115" fontSize="11" fill="#3b82f6">1st Fresnel Zone</text>
              
              {/* Obstacle (tree) blocking Fresnel zone */}
              <g transform="translate(380, 190)">
                <rect x="20" y="20" width="20" height="40" fill="#2d6a4f" />
                <circle cx="30" cy="10" r="18" fill="#40916c" />
                <text x="0" y="75" fontSize="10" fill="#94a3b8">Obstruction</text>
              </g>
              
              {/* Note about clearance */}
              <text x="400" y="265" fontSize="11" fill="#f59e0b" textAnchor="middle">60% Fresnel clearance required for reliable link</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span> Microwave beam (LOS)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span> First Fresnel zone (must be mostly clear)
            &nbsp;| <span className="inline-block w-3 h-3 bg-green-700 mr-1"></span> Obstacle causing signal degradation
          </p>
        </div>

        {/* Terrestrial vs Satellite Comparison */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">🏢 Terrestrial Microwave</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Range:</strong> 10–50 km (depends on tower height)</li>
              <li><strong>Latency:</strong> Very low (~0.5–2 ms per hop)</li>
              <li><strong>Cost:</strong> Medium (towers, dishes, licensing)</li>
              <li><strong>Use cases:</strong> Cellular backhaul, campus links, rural broadband, temporary events</li>
              <li><strong>Frequency bands:</strong> 6, 11, 18, 23, 38 GHz (licensed/unlicensed)</li>
              <li><strong>Example:</strong> Connecting <strong>Shyamnagar</strong> college buildings across the railway tracks</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold flex items-center gap-2">🛰️ Satellite Microwave</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Range:</strong> Global (intercontinental)</li>
              <li><strong>Latency:</strong> High (250–600 ms round trip for GEO)</li>
              <li><strong>Cost:</strong> High (satellite launch, ground stations)</li>
              <li><strong>Use cases:</strong> TV broadcasting, remote area connectivity, maritime, military</li>
              <li><strong>Frequency bands:</strong> C (4/6 GHz), Ku (12/14 GHz), Ka (20/30 GHz)</li>
              <li><strong>Example:</strong> Live broadcast of cricket match from <strong>Barrackpore</strong> stadium</li>
            </ul>
          </div>
        </div>

        {/* Key Characteristics + Fresnel Zone Deep Dive */}
        <div className="animate-fade-up bg-orange-50 dark:bg-orange-950/30 rounded-xl p-5 border-l-4 border-orange-500">
          <h3 className="text-xl font-bold">📐 Key Microwave Characteristics</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><span className="font-semibold">🔹 Frequency:</span> 1–300 GHz (wavelength 30 cm to 1 mm)</div>
            <div><span className="font-semibold">🔹 Propagation:</span> Strictly line-of-sight</div>
            <div><span className="font-semibold">🔹 Antennas:</span> Directional (parabolic, horn, patch)</div>
            <div><span className="font-semibold">🔹 Bandwidth:</span> Very high (up to 10+ Gbps per link)</div>
            <div><span className="font-semibold">🔹 Interference:</span> Low (due to focused beams)</div>
            <div><span className="font-semibold">🔹 Weather sensitivity:</span> Rain fade above 10 GHz</div>
          </div>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">🧠 Fresnel Zone Formula (Simplified):</p>
            <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 text-sm">r = 17.3 * sqrt( (d1*d2) / (f * d) )</code>
            <p className="text-xs mt-1">Where r = radius (m), d1,d2 = distances to ends (km), f = frequency (GHz), d = total distance (km). For reliable links, 60% of this zone must be obstacle-free.</p>
          </div>
        </div>

        {/* Professional Tips & Common Mistakes */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Microwave Planning)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Path profiling:</strong> Use topographic maps and software (e.g., Radio Mobile) to verify LOS.</li>
              <li><strong>Link budget calculation:</strong> Account for TX power, antenna gain, path loss, fade margin (20–30 dB).</li>
              <li><strong>Diversity:</strong> Use frequency or space diversity to combat fading.</li>
              <li><strong>Alignment:</strong> Use optical sights or GPS coordinates for initial dish pointing; fine-tune with RSSI meter.</li>
              <li><strong>Licensing:</strong> For critical links, use licensed bands to avoid interference from unlicensed users.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Ignoring Earth's curvature – even with LOS, towers must be high enough (use horizon formula).</li>
              <li>Assuming clear LOS without checking Fresnel zone (trees, buildings near path cause multipath).</li>
              <li>Underestimating rain fade (especially in tropical climates like India).</li>
              <li>Using unlicensed bands without surveying existing interference.</li>
              <li>Forgetting about tower sway and thermal expansion affecting alignment.</li>
            </ul>
          </div>
        </div>

        {/* Real-World Case Study */}
        <div className="animate-fade-up bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-300 dark:border-gray-700">
          <h3 className="text-xl font-bold">🌍 Real-World Example: Cellular Backhaul in Rural India</h3>
          <p className="mt-2">In a remote village near <strong>Ichapur</strong>, a telecom provider needed to connect a new 4G tower to the nearest fiber node 12 km away across a river. Laying fiber was impossible (no bridge, rocky terrain).</p>
          <p className="mt-2"><strong>Solution:</strong> A 6 GHz licensed microwave link with 2-ft dishes on 25m towers. Link budget included 30 dB fade margin for heavy monsoons. Result: 1 Gbps capacity, 99.999% availability (5 nines).</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">✨ <strong>Student analogy:</strong> Debangshu set up a 5 GHz link between his house and friend's house 2 km away, but trees grew into the Fresnel zone – after trimming, speed increased from 50 Mbps to 400 Mbps.</p>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Microwave Deployment</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Always perform a site survey with a GPS and binoculars (or drone) to verify LOS.</li>
            <li>Use high-quality, low-loss coaxial cables (or waveguide for >10 GHz) between radio and antenna.</li>
            <li>Install lightning arrestors and grounding for outdoor equipment.</li>
            <li>Monitor link performance with SNMP and set up alerts for RSSI drops.</li>
            <li>Document link parameters (frequency, polarization, antenna gains, cable losses) for troubleshooting.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define microwave frequency range</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain line-of-sight requirement</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Differentiate terrestrial vs satellite</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Describe Fresnel zone</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name 2 microwave bands and applications</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Microwave is often the 'bridge' topic between radio and satellite. Stress that LOS does not mean 'visible' – it means no obstacles in the Fresnel zone. Many students think if they can see the tower, the link will work – but a tree 100m away can kill the signal. Use the flashlight analogy: a laser pointer (microwave) is precise but easily blocked, while a lantern (radio) spreads everywhere. Also, emphasize that rain fade is a real problem in tropical regions; always add fade margin."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Microwave Transmission</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-orange-700 dark:text-orange-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-orange-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📡 Master microwave before moving to satellite communication (Topic 10).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📡 Topic 9: Microwave Transmission — Next: Satellite Communication (Topic 10)
        </div>
      </div>
    </div>
  );
};

export default Topic9;