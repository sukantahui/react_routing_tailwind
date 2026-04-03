import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic23: Fiber Optics in Internet Backbone
 * 
 * Component Purpose:
 * - Explains how optical fiber forms the foundation of global internet infrastructure
 * - Covers backbone architecture, undersea cables, long-haul transmission, and DWDM technology
 * - Bridges physical layer concepts to real-world internet connectivity
 * 
 * When & Why Used:
 * - To understand how data travels between cities and continents
 * - To appreciate the scale and engineering of global internet infrastructure
 * - For careers in ISP, telecom, or data center networking
 * 
 * @returns {JSX.Element} Full educational component with theory, examples, Q&A
 */
const Topic23 = () => {
  // State for interactive DWDM demo
  const [wavelengthCount, setWavelengthCount] = useState(8);
  
  // Backbone layers data
  const backboneLayers = [
    { layer: "Tier 1 (Global)", examples: "Level 3, Tata Communications, NTT", capacity: "100-400 Gbps per channel", media: "Single-mode fiber + DWDM" },
    { layer: "Tier 2 (National)", examples: "BSNL, Airtel, Jio (India)", capacity: "10-100 Gbps", media: "Single-mode fiber" },
    { layer: "Tier 3 (Regional/Metro)", examples: "State networks, local ISPs", capacity: "1-40 Gbps", media: "Single-mode or multi-mode fiber" }
  ];
  
  // Undersea cable examples
  const underseaCables = [
    { name: "SEA-ME-WE 5", length: "20,000 km", capacity: "24 Tbps", regions: "SE Asia → Middle East → Western Europe" },
    { name: "AAE-1", length: "25,000 km", capacity: "40 Tbps", regions: "Asia → Africa → Europe" },
    { name: "SMW-6", length: "14,500 km", capacity: "12 Tbps", regions: "SE Asia → Europe" }
  ];
  
  const totalCapacity = wavelengthCount * 100; // assuming 100 Gbps per wavelength
  const totalGbps = totalCapacity;
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Fiber Optics in Internet Backbone
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            How light pulses carry the world's data across continents and oceans
          </p>
          <div className="h-1 w-20 bg-purple-500 mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-10">
          
          {/* Card: What is the Internet Backbone? */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🌐</span> The Backbone of the Internet
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                The <strong className="text-purple-600 dark:text-purple-400">Internet backbone</strong> is the primary high-speed data routes that connect major networks worldwide. 
                <strong>Over 99% of international internet traffic</strong> travels through <strong>optical fiber cables</strong> — both on land and under the ocean.
              </p>
              <p>
                When a student in <strong>Barrackpore</strong> watches a YouTube video hosted on a server in <strong>California</strong>, their data travels through:
                <strong>Local fiber → Regional backbone → National backbone → Undersea cable → International backbone → Destination</strong>
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500 my-4">
                <p className="italic">📌 <strong>Key insight:</strong> The backbone isn't a single cable — it's a <strong>mesh network</strong> of high-capacity fiber links with redundant paths. If one cable fails (ship anchor, earthquake), traffic instantly reroutes through alternative paths.</p>
              </div>
            </div>
          </div>
          
          {/* SVG: Backbone Architecture Illustration */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📡</span> Backbone Architecture
            </h2>
            <div className="flex justify-center">
              <svg width="100%" height="300" viewBox="0 0 800 280" className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="800" height="280" fill="transparent" />
                
                {/* User icons (left side) */}
                <circle cx="60" cy="140" r="20" fill="#9b59b6" opacity="0.8" />
                <text x="60" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">U</text>
                <text x="60" y="175" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="10">Swadeep</text>
                
                <circle cx="60" cy="220" r="20" fill="#9b59b6" opacity="0.8" />
                <text x="60" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">U</text>
                <text x="60" y="255" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="10">Tuhina</text>
                
                {/* Local ISP / Metro fiber */}
                <rect x="130" y="120" width="120" height="100" rx="10" fill="#3498db" opacity="0.8" />
                <text x="190" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Metro Fiber</text>
                <text x="190" y="180" textAnchor="middle" fill="white" fontSize="10">10-40 Gbps</text>
                <text x="190" y="200" textAnchor="middle" fill="white" fontSize="9">Naihati</text>
                
                {/* Connection lines */}
                <line x1="80" y1="140" x2="130" y2="170" stroke="#7f8c8d" strokeWidth="2" strokeDasharray="4,2" />
                <line x1="80" y1="220" x2="130" y2="170" stroke="#7f8c8d" strokeWidth="2" strokeDasharray="4,2" />
                
                {/* Regional Backbone */}
                <rect x="310" y="100" width="140" height="140" rx="10" fill="#e67e22" opacity="0.8" />
                <text x="380" y="150" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Regional</text>
                <text x="380" y="170" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Backbone</text>
                <text x="380" y="195" textAnchor="middle" fill="white" fontSize="10">100-400 Gbps</text>
                <text x="380" y="215" textAnchor="middle" fill="white" fontSize="9">Kolkata → Chennai</text>
                
                <line x1="250" y1="170" x2="310" y2="170" stroke="#2c3e50" strokeWidth="3" />
                <text x="280" y="160" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">Single-mode</text>
                <text x="280" y="190" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">Fiber</text>
                
                {/* National Backbone */}
                <rect x="510" y="80" width="140" height="160" rx="10" fill="#27ae60" opacity="0.8" />
                <text x="580" y="140" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">National</text>
                <text x="580" y="160" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Backbone</text>
                <text x="580" y="185" textAnchor="middle" fill="white" fontSize="10">400G - 1Tbps</text>
                <text x="580" y="210" textAnchor="middle" fill="white" fontSize="9">DWDM over</text>
                <text x="580" y="225" textAnchor="middle" fill="white" fontSize="9">Single-mode</text>
                
                <line x1="450" y1="160" x2="510" y2="160" stroke="#2c3e50" strokeWidth="4" />
                <text x="480" y="150" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">DWDM</text>
                <text x="480" y="180" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">Fiber</text>
                
                {/* Undersea Cable */}
                <rect x="30" y="10" width="740" height="50" rx="20" fill="#2980b9" opacity="0.6" stroke="#1a5276" strokeWidth="2" />
                <text x="400" y="40" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Undersea Fiber Cable (SEA-ME-WE 5: 20,000km, 24 Tbps)</text>
                
                {/* Animated light pulses along the top */}
                <circle cx="100" cy="35" r="5" fill="#f1c40f">
                  <animate attributeName="cx" from="50" to="750" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0.3" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="35" r="5" fill="#f1c40f">
                  <animate attributeName="cx" from="50" to="750" dur="4s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="35" r="5" fill="#f1c40f">
                  <animate attributeName="cx" from="50" to="750" dur="4s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="35" r="5" fill="#f1c40f">
                  <animate attributeName="cx" from="50" to="750" dur="4s" begin="1.5s" repeatCount="indefinite" />
                </circle>
                
                {/* Server icon (right side) */}
                <rect x="700" y="120" width="80" height="100" rx="8" fill="#e74c3c" opacity="0.8" />
                <text x="740" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Server</text>
                <text x="740" y="180" textAnchor="middle" fill="white" fontSize="10">YouTube</text>
                <text x="740" y="200" textAnchor="middle" fill="white" fontSize="9">California</text>
                
                <line x1="650" y1="160" x2="700" y2="160" stroke="#2c3e50" strokeWidth="3" />
                <text x="675" y="150" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">Fiber</text>
                <text x="675" y="180" textAnchor="middle" fill="#gray-600 dark:gray-400" fontSize="9">Last Mile</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">Data flow from user to global server through layered fiber backbone</p>
          </div>
          
          {/* DWDM Technology Card */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🌈</span> DWDM: Multiplying Capacity
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Dense Wavelength Division Multiplexing (DWDM)</strong> is the technology that makes backbone fiber so powerful. 
              It sends <strong>multiple colors (wavelengths) of light</strong> down the same fiber, each carrying independent data.
            </p>
            
            {/* Interactive DWDM Simulator */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-5 mb-4">
              <p className="font-semibold mb-3">Interactive DWDM Capacity Calculator:</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm">Number of wavelengths (colors):</span>
                <input 
                  type="range" min="1" max="160" step="1" value={wavelengthCount}
                  onChange={(e) => setWavelengthCount(parseInt(e.target.value))}
                  className="w-64 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{wavelengthCount}</span>
              </div>
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p><strong>Total capacity:</strong> {wavelengthCount} × 100 Gbps = <span className="font-bold text-xl">{totalGbps} Gbps</span> = {(totalGbps / 1000).toFixed(1)} Tbps</p>
                <p className="text-xs text-gray-500 mt-1">*Modern DWDM systems support up to 160 wavelengths at 100-400 Gbps each</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">✨ Advantages of DWDM:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>One fiber carries <strong>up to 25.6 Tbps</strong> (160 × 160 Gbps)</li>
                  <li>Amplifiers boost all wavelengths simultaneously (EDFA)</li>
                  <li>Each wavelength is independent protocol (Ethernet, SONET, etc.)</li>
                  <li>New wavelengths can be added without touching existing ones</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">🎯 Real-world example:</p>
                <p className="text-sm mt-1">The <strong>AAE-1 undersea cable</strong> (25,000 km) uses DWDM to achieve 40 Tbps. That's <strong>40 million Mbps</strong> — enough for 400,000 simultaneous 4K video streams!</p>
              </div>
            </div>
          </div>
          
          {/* Backbone Layers Table */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Backbone Hierarchy
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Tier</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Examples</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Capacity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {backboneLayers.map((layer, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-medium">{layer.layer}</td>
                      <td className="px-4 py-2 text-sm">{layer.examples}</td>
                      <td className="px-4 py-2 text-sm">{layer.capacity}</td>
                      <td className="px-4 py-2 text-sm">{layer.media}</td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Undersea Cables Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🌊</span> Undersea Fiber Cables
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              There are over <strong>400 active undersea cables</strong> spanning <strong>1.3 million kilometers</strong> — enough to circle the Earth 32 times! 
              These cables are <strong>1.5-2.5 cm thick</strong> (about the size of a garden hose) but contain hair-thin glass fibers protected by steel, copper, and plastic layers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {underseaCables.map((cable, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{cable.name}</p>
                  <p className="text-sm">Length: {cable.length}</p>
                  <p className="text-sm">Capacity: {cable.capacity}</p>
                  <p className="text-xs text-gray-500 mt-1">{cable.regions}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm">
              <p className="font-semibold">🔍 Did you know?</p>
              <p>India is connected by <strong>over 15 undersea cables</strong> landing at Mumbai, Chennai, and Kochi. The <strong>SEA-ME-WE-5</strong> cable alone provides over 24 Tbps of capacity between Singapore and France, with landing stations in Mumbai.</p>
            </div>
          </div>
          
          {/* Real-World Case: Debangshu's Video Call */}
          <div className="group bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-purple-200 dark:border-purple-800 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">📹</span> Real-World: Debangshu's International Video Call
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Debangshu, a student from <strong>Barrackpore</strong>, video calls his cousin in <strong>London</strong>. 
              His data travels through <strong>8 different fiber segments</strong> and <strong>2 undersea cables</strong> with total latency of ~150ms.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">📡 Path taken:</p>
                <ol className="text-sm list-decimal list-inside space-y-1 mt-1">
                  <li>Local fiber to BSNL exchange (Naihati)</li>
                  <li>Regional backbone to Kolkata</li>
                  <li>National backbone to Mumbai (DWDM over single-mode)</li>
                  <li>SEA-ME-WE-5 undersea cable to Egypt</li>
                  <li>Mediterranean undersea cable to France</li>
                  <li>European backbone to London</li>
                </ol>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">⚡ Latency breakdown:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>Local fiber: 2ms</li>
                  <li>Regional/National: 20ms</li>
                  <li>Undersea (20,000km @ 200km/ms): 100ms</li>
                  <li>European backbone: 15ms</li>
                  <li>Processing/switching: 13ms</li>
                  <li><strong>Total: ~150ms</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic">Note: Speed of light in fiber is ~200,000 km/s (vs 300,000 km/s in vacuum) due to refractive index of glass (~1.5).</p>
          </div>
          
          {/* Tips & Tricks */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips & Tricks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">🔧 ISP/Backbone Engineer Habits:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Always plan <strong>diverse paths</strong> — never rely on a single cable route.</li>
                  <li>Use <strong>G.652.D single-mode fiber</strong> for new backbone deployments (lowest loss, DWDM compatible).</li>
                  <li>Monitor <strong>OSNR (Optical Signal-to-Noise Ratio)</strong> — more critical than raw power.</li>
                  <li>Keep <strong>spare transceivers</strong> at every amplifier site (common failure point).</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">🧪 Troubleshooting Backbone Issues:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Use <strong>OTDR traces</strong> to locate breaks within meters over 100km distances.</li>
                  <li>Check <strong>pre-FEC BER</strong> to predict failures before they happen.</li>
                  <li>Monitor <strong>polarization mode dispersion (PMD)</strong> in older fibers.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Common Mistakes */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "All fiber is the same"</p>
                <p className="text-sm"><strong>Truth:</strong> Backbone uses <strong>single-mode fiber (OS2)</strong> for long distances. Multi-mode (OM3/OM4) is limited to 300-500m. Using the wrong fiber type causes massive loss.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "DWDM is just about adding more lasers"</p>
                <p className="text-sm"><strong>Truth:</strong> DWDM requires careful power balancing — amplifiers boost all wavelengths equally, but different wavelengths may have different losses. Engineers use <strong>gain flattening filters</strong> to balance.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Misconception: "Undersea cables are vulnerable to sharks"</p>
                <p className="text-sm"><strong>Fact:</strong> Shark bites are extremely rare. The main threats are <strong>fishing trawlers (anchors) and earthquakes</strong>. Cables are buried under the seabed near shores for protection.</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices for Backbone Networks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Planning:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Conduct <strong>link budget analysis</strong> before deployment.</li>
                  <li>Plan for <strong>20% spare capacity</strong> for future growth.</li>
                  <li>Choose <strong>vendor-neutral</strong> equipment when possible.</li>
                  <li>Document <strong>splice locations</strong> with GPS coordinates.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Operations:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Implement <strong>24/7 optical monitoring</strong> (power, OSNR, PMD).</li>
                  <li>Perform <strong>annual OTDR baselines</strong> to detect degradation.</li>
                  <li>Train staff on <strong>coherent detection</strong> troubleshooting.</li>
                  <li>Maintain <strong>spare fiber inventory</strong> for emergency repairs.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">💭</span> Think About...
            </h2>
            <div className="space-y-3">
              <p className="italic text-gray-700 dark:text-gray-300">"Why does the speed of light in fiber (200,000 km/s) limit global communication latency to at least 66ms for half the earth's circumference?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"If you were building a backbone across India's diverse terrain (mountains, rivers, cities), where would you put your amplifier stations?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"How does DWDM allow carriers to 'sell dark fiber' to other companies?"</p>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="The backbone is where fiber's advantages become undeniable. Students often don't realize that when they video call someone across the world, their data traverses thousands of kilometers of glass fibers under the ocean. The DWDM interactive demo helps them grasp how capacity scales — from a single laser to 160 colors of light. Emphasize that backbone networks use single-mode fiber (not multi-mode) because distances are huge. Show them undersea cable maps online — it's mind-blowing to see the physical infrastructure enabling global connectivity." />
          </div>
          
          {/* Q&A Section */}
          <div className="mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">❓</span> 15 Questions & Answers
            </h2>
            <div className="space-y-4">
              {qAndA.map((item, idx) => (
                <QAItem key={idx} question={item.q} answer={item.a} index={idx} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// QA Item Component
const QAItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex justify-between items-center"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {index+1}. {question}
        </span>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

// Q&A Data
const qAndA = [
  { q: "Why is single-mode fiber used for backbone instead of multi-mode?", a: "Single-mode fiber has a much smaller core (8-10 microns) that supports only one propagation mode. This eliminates modal dispersion, allowing signals to travel hundreds of kilometers without regeneration. Multi-mode fiber (50-62.5 micron core) has modal dispersion that limits practical distances to 300-500 meters for 10Gbps, making it unsuitable for backbone." },
  { q: "What is DWDM and how does it increase capacity?", a: "Dense Wavelength Division Multiplexing (DWDM) sends multiple independent signals simultaneously on different wavelengths (colors) of light within the same fiber. Each wavelength operates like a separate 'virtual fiber'. Modern systems support up to 160 wavelengths at 100-400 Gbps each, achieving 16-64 Tbps per fiber pair." },
  { q: "What is an EDFA and why is it important?", a: "Erbium-Doped Fiber Amplifier (EDFA) boosts all DWDM wavelengths simultaneously without converting to electricity. A section of fiber is doped with erbium ions and pumped with a laser (980nm or 1480nm), causing stimulated emission that amplifies the 1550nm signal band. EDFAs are placed every 80-120 km on backbone links." },
  { q: "How thick are undersea cables and what's inside?", a: "Undersea cables are about 1.5-2.5 cm thick. From inside out: 1) Optical fibers (as thin as hair), 2) Copper conductors (for powering repeaters), 3) Steel strength members, 4) Water-blocking tape, 5) Copper tube, 6) Polyethylene insulation, 7) Steel armor wires (near shores), 8) Outer polyethylene jacket." },
  { q: "What is 'dark fiber' and why do companies buy it?", a: "Dark fiber is unused fiber strands already installed in the ground. Companies lease or buy dark fiber from backbone providers and then 'light it up' with their own DWDM equipment. This gives them full control over the network and often cheaper long-term costs compared to buying lit service." },
  { q: "What is latency on India-US undersea routes?", a: "The straight-line distance is ~13,000 km, but undersea cables are longer (~20,000 km due to geography). Light travels at ~200,000 km/s in fiber, so minimum latency is 20000/200000 = 100ms one-way. Round-trip is ~200ms, plus processing delays = ~250ms total. That's why real-time gaming across oceans is challenging." },
  { q: "How are undersea cables protected from damage?", a: "Near shores (up to 1.5 km), cables are buried 1-3 meters under the seabed using plows or jets to avoid anchors and fishing gear. In deep water, they simply lie on the seabed. Repeaters are spaced every 60-100 km. Cable routes avoid earthquake zones, underwater volcanoes, and shipping lanes when possible." },
  { q: "What is OSNR and why does it matter?", a: "Optical Signal-to-Noise Ratio (OSNR) measures signal quality relative to amplified spontaneous emission (ASE) noise from EDFAs. Unlike electrical SNR, OSNR degrades as signals pass through amplifiers. Backbone engineers monitor OSNR because when it drops below threshold, bit errors increase dramatically even if optical power looks fine." },
  { q: "What is coherent detection in modern backbone?", a: "Coherent detection mixes the incoming signal with a local oscillator laser, recovering both amplitude and phase. This allows using advanced modulation formats (QPSK, 16-QAM) and digital signal processing to compensate for dispersion. Coherent technology enabled 100G+ per wavelength, replacing simpler on-off keying." },
  { q: "How do backbone providers achieve 99.999% uptime?", a: "Through: 1) Diverse physical paths (two completely separate cable routes), 2) Automatic protection switching (if a fiber breaks, traffic switches to backup within 50ms), 3) Redundant power at every site, 4) 24/7 monitoring, 5) Rapid repair crews on standby, 6) Spare equipment on shelves." },
  { q: "What is the role of ROADMs in backbone?", a: "Reconfigurable Optical Add/Drop Multiplexers (ROADMs) allow remotely dropping or adding individual DWDM wavelengths at a node without converting everything to electricity. This enables flexible provisioning — a wavelength can be sent from Mumbai to Chennai, while another goes Mumbai to Delhi, all on the same fiber." },
  { q: "Why do backbone fibers need regeneration?", a: "Even with EDFA amplifiers, signal quality degrades due to: 1) Chromatic dispersion (different wavelengths travel at different speeds), 2) Polarization mode dispersion (PMD), 3) Non-linear effects (self-phase modulation). After ~600-1000 km, signals need optical-electrical-optical (OEO) regeneration to clean up the signal." },
  { q: "How much does an undersea cable cost to build?", a: "A transatlantic cable costs $300-500 million. Transpacific: $500-800 million. Costs include: Cable manufacturing ($50-100k per km), specialized ships (cable layers), repeaters ($100k each, hundreds needed), landing stations, permits, surveys. Payback is over 10-15 years through capacity sales to carriers and content providers (Google, Microsoft, Facebook invest heavily)." },
  { q: "What is the difference between backbone and last-mile fiber?", a: "Backbone fiber: single-mode, long distances (1000+ km), DWDM, high capacity (Tbps), expensive transceivers, deployed in trenches or undersea. Last-mile fiber: can be multi-mode or single-mode, short distances (under 10 km), simpler optics (1-10 Gbps), lower cost, deployed to homes/businesses (FTTH)." },
  { q: "How did fiber optics replace satellite for backbone?", a: "Until the 1990s, satellites handled intercontinental traffic (Intelsat). Fiber offers: 1) Much lower latency (250ms vs 600ms RTT), 2) Higher capacity (Tbps vs Gbps), 3) Lower cost per bit, 4) Immunity to weather (rain fade affects satellite). Satellites now serve niche roles: maritime, aviation, remote areas, backup." }
];

export default Topic23;