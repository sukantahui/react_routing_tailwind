import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic10: Satellite Communication
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to satellite communication.
 * 
 * @purpose
 * Explain the principles, types (GEO, MEO, LEO), working mechanisms, and applications
 * of satellite-based microwave transmission.
 * 
 * @usage
 * Used in networking courses to cover long-distance wireless communication, broadcasting,
 * and global connectivity.
 */

const Topic10 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is satellite communication?",
      a: "Satellite communication uses orbiting satellites as relay stations to transmit signals between Earth stations. It enables long-distance, wide-area coverage for TV, internet, telephony, and navigation."
    },
    {
      q: "What are the three main types of satellites based on orbit altitude?",
      a: "GEO (Geostationary Earth Orbit) at 35,786 km, MEO (Medium Earth Orbit) at 8,000–20,000 km, and LEO (Low Earth Orbit) at 500–2,000 km."
    },
    {
      q: "What is the key characteristic of a GEO satellite?",
      a: "GEO satellites orbit at the same speed as Earth's rotation, appearing stationary over a fixed point. This allows fixed antennas but introduces high latency (~250 ms)."
    },
    {
      q: "Why does GEO satellite communication have high latency?",
      a: "Signal travels 35,786 km up and down, total round trip ~71,500 km. At speed of light, this takes about 238 ms, plus processing delays, total ~250–300 ms."
    },
    {
      q: "Name three applications of GEO satellites.",
      a: "TV broadcasting (DTH), weather satellites (INSAT, GOES), and international telephone backhaul. Also used for military communications and some broadband services."
    },
    {
      q: "What is a MEO satellite, and what is its primary use?",
      a: "MEO orbits between 8,000–20,000 km. GPS satellites (20,200 km) are the most famous example, providing global positioning. Also used for navigation systems like Galileo, GLONASS, BeiDou."
    },
    {
      q: "How many satellites are typically in a GPS constellation?",
      a: "Minimum 24 operational satellites (currently ~31) in 6 orbital planes, ensuring at least 4 visible from any point on Earth at any time."
    },
    {
      q: "What are the advantages of LEO satellites over GEO?",
      a: "Lower latency (20–40 ms), lower path loss (allowing smaller terminals), and lower launch cost. However, many satellites are needed for continuous coverage."
    },
    {
      q: "Name two major LEO satellite constellations.",
      a: "Starlink (SpaceX) with thousands of satellites for global broadband, and OneWeb, as well as Iridium (voice/data) and Starlink's competing constellations."
    },
    {
      q: "What frequency bands are used for satellite communication?",
      a: "Common bands: C-band (4/6 GHz), Ku-band (12/14 GHz), Ka-band (20/30 GHz), and L-band (1–2 GHz for mobile/GPS). Higher bands offer more bandwidth but are affected by rain fade."
    },
    {
      q: "Explain the uplink and downlink frequency difference.",
      a: "Uplink (Earth to satellite) uses a higher frequency than downlink (satellite to Earth) to avoid interference. For example, C-band: uplink 6 GHz, downlink 4 GHz."
    },
    {
      q: "What is a transponder on a satellite?",
      a: "A transponder receives uplink signals, amplifies them, shifts frequency, and retransmits downlink. Modern satellites have dozens of transponders (each 36–72 MHz wide)."
    },
    {
      q: "How does rain fade affect satellite communication?",
      a: "Rain droplets absorb and scatter microwave signals, especially above 10 GHz (Ku and Ka bands). This can cause outages; fade margin and adaptive coding are used to mitigate."
    },
    {
      q: "Why do LEO satellites require tracking antennas?",
      a: "LEO satellites move rapidly across the sky (orbital period ~90 minutes). Ground antennas must track them mechanically or use phased arrays (electronically steered)."
    },
    {
      q: "What is the difference between a geostationary and a geosynchronous orbit?",
      a: "Geostationary is a subset of geosynchronous with zero inclination (above equator) and circular orbit, appearing fixed. Geosynchronous can have inclination, causing a figure-8 pattern."
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
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Satellite Communication
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-purple-500 pl-4">
            Global reach from orbit – GEO, MEO, LEO explained.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Satellites connect the world's most remote places, broadcast live events globally, and guide your car's GPS. 
            Understanding the three main orbits (GEO, MEO, LEO) and their trade-offs (latency, coverage, cost) is essential 
            for anyone working with wide-area networks, broadcasting, or navigation systems.
          </p>
        </div>

        {/* SVG Illustration: Orbits Comparison (GEO, MEO, LEO) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">🛰️ Satellite Orbits at a Glance</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="320" viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="320" fill="none" />
              
              {/* Earth */}
              <circle cx="450" cy="160" r="40" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
              <text x="450" y="165" textAnchor="middle" fontSize="10" fill="white">Earth</text>
              
              {/* LEO orbit (inner) */}
              <ellipse cx="450" cy="160" rx="140" ry="130" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0 450 160" to="360 450 160" dur="8s" repeatCount="indefinite" />
                <circle cx="590" cy="160" r="8" fill="#10b981" />
                <text x="595" y="155" fontSize="10" fill="#10b981">LEO</text>
              </g>
              <text x="380" y="35" fontSize="12" fill="#10b981">LEO (500–2,000 km)</text>
              
              {/* MEO orbit (middle) */}
              <ellipse cx="450" cy="160" rx="250" ry="230" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 6" />
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0 450 160" to="360 450 160" dur="20s" repeatCount="indefinite" />
                <circle cx="700" cy="160" r="10" fill="#f59e0b" />
                <text x="705" y="155" fontSize="10" fill="#f59e0b">MEO</text>
              </g>
              <text x="330" y="60" fontSize="12" fill="#f59e0b">MEO (8,000–20,000 km)</text>
              
              {/* GEO orbit (outer) */}
              <ellipse cx="450" cy="160" rx="380" ry="340" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 8" />
              <circle cx="830" cy="160" r="12" fill="#ef4444" />
              <text x="835" y="155" fontSize="10" fill="#ef4444">GEO</text>
              <text x="280" y="85" fontSize="12" fill="#ef4444">GEO (35,786 km) – stationary</text>
              
              {/* Ground station */}
              <g transform="translate(180, 220)">
                <rect x="10" y="10" width="20" height="40" fill="#4f46e5" rx="2" />
                <ellipse cx="20" cy="5" rx="15" ry="8" fill="#818cf8" />
                <path d="M20,10 L40,30" stroke="#f97316" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;12" dur="0.8s" repeatCount="indefinite" />
                </path>
                <text x="-5" y="65" fontSize="10" fill="#cbd5e1">Ground Station</text>
              </g>
              
              {/* Uplink/downlink arrows (example to GEO) */}
              <path d="M200,230 Q400,280 830,160" stroke="#f97316" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              <path d="M830,160 Q600,100 450,160" stroke="#facc15" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              <text x="550" y="280" fontSize="10" fill="#facc15">Uplink →</text>
              <text x="600" y="120" fontSize="10" fill="#f97316">← Downlink</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> LEO (fast, low latency)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span> MEO (navigation)
            &nbsp;| <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> GEO (stationary, high latency)
          </p>
        </div>

        {/* Detailed Orbit Comparison Table (cards) */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-3xl mb-2">🛰️</div>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">GEO (Geostationary)</h3>
            <p className="text-sm mt-1"><strong>Altitude:</strong> 35,786 km</p>
            <p className="text-sm"><strong>Latency:</strong> ~250 ms</p>
            <p className="text-sm"><strong>Coverage:</strong> 1/3 of Earth per satellite</p>
            <p className="text-sm"><strong>Examples:</strong> INSAT, DirecTV, Inmarsat</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>+ Fixed antennas, continuous coverage</li>
              <li>- High latency, poor for real-time apps</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-3xl mb-2">🛰️</div>
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">MEO (Medium Earth)</h3>
            <p className="text-sm mt-1"><strong>Altitude:</strong> 8,000–20,000 km</p>
            <p className="text-sm"><strong>Latency:</strong> ~100–150 ms</p>
            <p className="text-sm"><strong>Coverage:</strong> Global with ~24 satellites</p>
            <p className="text-sm"><strong>Examples:</strong> GPS, GLONASS, Galileo</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>+ Moderate latency, global positioning</li>
              <li>- Needs constellation, tracking antennas</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-3xl mb-2">🛰️</div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">LEO (Low Earth)</h3>
            <p className="text-sm mt-1"><strong>Altitude:</strong> 500–2,000 km</p>
            <p className="text-sm"><strong>Latency:</strong> 20–40 ms</p>
            <p className="text-sm"><strong>Coverage:</strong> Requires large constellations (hundreds)</p>
            <p className="text-sm"><strong>Examples:</strong> Starlink, OneWeb, Iridium</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>+ Low latency, lower launch cost</li>
              <li>- Many satellites, handover complexity</li>
            </ul>
          </div>
        </div>

        {/* Working Principle + Transponder Details */}
        <div className="animate-fade-up bg-purple-50 dark:bg-purple-950/30 rounded-xl p-5 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold">⚙️ How a Satellite Works (Uplink → Transponder → Downlink)</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <span className="font-bold text-indigo-600">1. Uplink</span>
              <p>Earth station transmits a modulated signal (e.g., 6 GHz for C-band) to the satellite using a high-power amplifier and large dish.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <span className="font-bold text-indigo-600">2. Transponder</span>
              <p>Satellite receives, amplifies (low-noise amplifier), down-converts to a lower frequency (e.g., 4 GHz), and amplifies again for transmission.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <span className="font-bold text-indigo-600">3. Downlink</span>
              <p>Satellite transmits the signal back to Earth, where receiving dishes capture it. The process avoids interference between uplink and downlink.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Modern satellites have 24–72 transponders, each handling 36–72 MHz of bandwidth, supporting thousands of TV channels or broadband users.</p>
        </div>

        {/* Real-World Applications by Orbit Type */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-xl p-5 shadow-md">
          <h3 className="text-xl font-bold">🌍 Real-World Applications (per Orbit)</h3>
          <div className="mt-2 space-y-2">
            <p><strong className="text-red-600">GEO:</strong> Live TV broadcast of cricket matches from <strong>Barrackpore</strong> stadium to millions of homes via DTH (Direct-to-Home). Also, weather satellites like INSAT-3D monitor cyclones in the Bay of Bengal.</p>
            <p><strong className="text-amber-600">MEO:</strong> Tuhina uses GPS on her phone to navigate from <strong>Shyamnagar</strong> to Kolkata – signals from 31 MEO satellites pinpoint her location within 5 meters.</p>
            <p><strong className="text-green-600">LEO:</strong> A remote school in <strong>Ichapur</strong> gets 100 Mbps internet via Starlink – latency is just 30 ms, good for video conferencing.</p>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Satellite Engineering)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Link budget:</strong> Always account for free-space path loss, atmospheric attenuation, and rain fade (especially in Ku/Ka bands).</li>
              <li><strong>Antenna alignment:</strong> Use a spectrum analyzer to peak the signal – even 0.1° misalignment causes significant loss for GEO.</li>
              <li><strong>Doppler shift:</strong> For LEO, compensate for frequency changes due to high relative velocity.</li>
              <li><strong>Handover:</strong> In LEO constellations, seamlessly switch between satellites as they move.</li>
              <li><strong>Regulations:</strong> Obtain ITU frequency coordination to avoid interfering with adjacent satellites.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Assuming all satellites are GEO – LEO and MEO have very different characteristics.</li>
              <li>Ignoring rain fade for Ku/Ka band satellite internet (outages during monsoon).</li>
              <li>Using a fixed dish for LEO – it won't work without tracking.</li>
              <li>Forgetting the speed of light delay for GEO (causes echo in voice calls).</li>
              <li>Overlooking solar outages (twice a year, the sun aligns behind the satellite, overwhelming the receiver).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Satellite Deployment</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Perform a site survey to ensure clear line-of-sight to the satellite (no trees, buildings).</li>
            <li>Use a low-noise block downconverter (LNB) with low noise figure for better receive sensitivity.</li>
            <li>Implement adaptive coding and modulation (ACM) to maintain link during rain fade.</li>
            <li>For LEO constellations, use phased-array antennas for electronic beam steering.</li>
            <li>Monitor satellite beacon levels for early warning of alignment or atmospheric issues.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Know altitudes: GEO 35,786 km, MEO 8-20k km, LEO 500-2,000 km</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain latency difference (GEO ~250ms, LEO ~30ms)</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name an application for each orbit</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Describe uplink/downlink frequency separation</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify rain fade as a major challenge for Ku/Ka bands</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Satellites are often misunderstood by students as 'magic' – they need to grasp that physics (orbital mechanics, speed of light) dictates performance. Use the analogy: GEO is like a helicopter hovering high – great view but long talk delay; LEO is like a low-flying jet – fast but constantly moving. Emphasize that GPS uses MEO, not GEO. Also, mention real Indian examples: INSAT, GSAT, NAVIC (Indian regional navigation). For exams, they must compare orbits and explain why VOIP is poor over GEO but fine over LEO."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Satellite Communication</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-purple-700 dark:text-purple-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-purple-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">🛰️ Next: Infrared Communication (Topic 11) – short-range wireless.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          🛰️ Topic 10: Satellite Communication — Next: Infrared (Topic 11)
        </div>
      </div>
    </div>
  );
};

export default Topic10;