import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic5: Coaxial Cable
 * Prototype: Topic5()
 * Return type: JSX.Element
 * Purpose: Explain coaxial cable structure, shielding mechanisms, and its primary
 *          applications in cable TV (CATV) and broadband internet.
 * When & why used: Coaxial cable remains relevant for cable television, broadband
 *          internet (DOCSIS), and certain legacy networks. Understanding its design
 *          helps explain why it offers better shielding than twisted pair.
 */

const Topic5 = () => {
  // State for interactive layer highlighting
  const [highlightedLayer, setHighlightedLayer] = useState(null);

  // Coaxial cable layers with descriptions
  const layers = [
    { name: "Center Conductor", color: "red", position: "center", desc: "Solid copper or copper-clad steel wire that carries the signal." },
    { name: "Dielectric Insulator", color: "yellow", position: "dielectric", desc: "Plastic insulating layer that maintains constant spacing between conductors." },
    { name: "Metallic Shield", color: "gray", position: "shield", desc: "Braided copper or aluminum foil that blocks external interference." },
    { name: "Outer Jacket", color: "blue", position: "jacket", desc: "PVC or plenum-rated plastic that protects against physical damage." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Coaxial Cable
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The shielded warrior — bringing cable TV and broadband internet to millions of homes.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            Coax • Shielded • CATV • Broadband • DOCSIS
          </div>
        </div>

        {/* Main Content - Sequential divs */}
        <div className="space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Is Coaxial Cable?</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="font-semibold">Coaxial cable</strong> (often called "coax") is a type of electrical cable 
              with an inner conductor surrounded by a tubular insulating layer, surrounded by a tubular conducting shield, 
              and finally an outer jacket. The term "coaxial" comes from the inner conductor and the outer shield sharing 
              the same geometric axis.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When Abhronila watches cable TV at her home in Ichapur, the signal travels through coaxial cable from 
              the service provider's node to her set-top box. The shielding makes coax highly resistant to electromagnetic 
              interference, allowing it to carry signals over longer distances than twisted pair.
            </p>
          </div>

          {/* Coaxial Cable Structure Explorer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Coaxial Cable Structure (Click Layers to Learn)
            </h3>
            
            {/* Interactive SVG Cross-Section */}
            <div className="flex justify-center">
              <svg width="400" height="350" viewBox="0 0 400 350" className="w-full max-w-[400px]">
                {/* Outer Jacket */}
                <circle 
                  cx="200" 
                  cy="160" 
                  r="85" 
                  fill={highlightedLayer === "jacket" ? "#60a5fa" : "#d1d5db"} 
                  stroke="#4b5563" 
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer hover:stroke-blue-500"
                  onClick={() => setHighlightedLayer("jacket")}
                  onMouseEnter={() => setHighlightedLayer("jacket")}
                  onMouseLeave={() => setHighlightedLayer(null)}
                />
                <text x="200" y="260" textAnchor="middle" fill="#374151" fontSize="11">Outer Jacket</text>
                <text x="200" y="273" textAnchor="middle" fill="#6b7280" fontSize="9">(Protective PVC)</text>
                
                {/* Metallic Shield (Braided) */}
                <circle 
                  cx="200" 
                  cy="160" 
                  r="60" 
                  fill={highlightedLayer === "shield" ? "#a78bfa" : "none"} 
                  stroke="#9ca3af" 
                  strokeWidth="6" 
                  strokeDasharray="4,3"
                  className="transition-all duration-300 cursor-pointer hover:stroke-purple-500"
                  onClick={() => setHighlightedLayer("shield")}
                  onMouseEnter={() => setHighlightedLayer("shield")}
                  onMouseLeave={() => setHighlightedLayer(null)}
                />
                <text x="200" y="295" textAnchor="middle" fill="#6b7280" fontSize="9">Metallic Shield</text>
                <text x="200" y="308" textAnchor="middle" fill="#6b7280" fontSize="9">(Braided Copper/Aluminum)</text>
                
                {/* Dielectric Insulator */}
                <circle 
                  cx="200" 
                  cy="160" 
                  r="38" 
                  fill={highlightedLayer === "dielectric" ? "#fcd34d" : "#fef3c7"} 
                  stroke="#d97706" 
                  strokeWidth="2"
                  className="transition-all duration-300 cursor-pointer hover:stroke-yellow-600"
                  onClick={() => setHighlightedLayer("dielectric")}
                  onMouseEnter={() => setHighlightedLayer("dielectric")}
                  onMouseLeave={() => setHighlightedLayer(null)}
                />
                <text x="200" y="325" textAnchor="middle" fill="#92400e" fontSize="9">Dielectric Insulator</text>
                <text x="200" y="338" textAnchor="middle" fill="#92400e" fontSize="8">(Maintains Spacing)</text>
                
                {/* Center Conductor */}
                <circle 
                  cx="200" 
                  cy="160" 
                  r="12" 
                  fill={highlightedLayer === "center" ? "#ef4444" : "#dc2626"}
                  className="transition-all duration-300 cursor-pointer hover:fill-red-400"
                  onClick={() => setHighlightedLayer("center")}
                  onMouseEnter={() => setHighlightedLayer("center")}
                  onMouseLeave={() => setHighlightedLayer(null)}
                />
                <text x="200" y="145" textAnchor="middle" fill="#7f1d1d" fontSize="9">Center</text>
                <text x="200" y="155" textAnchor="middle" fill="#7f1d1d" fontSize="9">Conductor</text>
                
                {/* Animated Signal Wave */}
                <path d="M 188,160 Q 190,150 192,160 Q 194,170 196,160 Q 198,150 200,160 Q 202,170 204,160 Q 206,150 208,160 Q 210,170 212,160" 
                      fill="none" 
                      stroke="#f59e0b" 
                      strokeWidth="2">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                </path>
                
                {/* Title */}
                <text x="200" y="50" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="bold">Cross-Section View</text>
              </svg>
            </div>
            
            {/* Layer Description */}
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <p className="text-center text-gray-700 dark:text-gray-300">
                {highlightedLayer === "center" && "🎯 Center Conductor: Solid copper wire that carries the electrical signal. The signal travels along this central core."}
                {highlightedLayer === "dielectric" && "🔵 Dielectric Insulator: Plastic foam layer that keeps the center conductor exactly centered, maintaining consistent impedance."}
                {highlightedLayer === "shield" && "🛡️ Metallic Shield: Braided copper or foil that blocks external electromagnetic interference (EMI) and prevents signal leakage."}
                {highlightedLayer === "jacket" && "📦 Outer Jacket: PVC or plenum-rated plastic that provides physical protection against damage, moisture, and chemicals."}
                {!highlightedLayer && "💡 Hover over any colored layer above to learn about its function!"}
              </p>
            </div>
          </div>

          {/* Shielding Mechanism */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>🛡️</span> How Shielding Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">External Interference Blocking</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">The metallic shield acts as a Faraday cage, absorbing electromagnetic interference (EMI) from nearby power cables, motors, and radio signals before it reaches the center conductor.</p>
                <div className="mt-3 flex justify-center gap-2 text-2xl">
                  <span>⚡</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-purple-500">🛡️</span>
                  <span className="text-gray-500">→</span>
                  <span>❌</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Signal Containment</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">The shield also prevents the signal on the center conductor from radiating outward, reducing crosstalk and keeping the signal contained within the cable.</p>
                <div className="mt-3 flex justify-center gap-2 text-2xl">
                  <span>📡</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-purple-500">🛡️</span>
                  <span className="text-gray-500">→</span>
                  <span>🔒</span>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s]">
            {/* Cable TV Application */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Cable Television (CATV)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Coaxial cable is the standard for delivering cable TV to homes and businesses. It can carry hundreds of channels simultaneously using frequency division multiplexing (FDM).</p>
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs">
                <span className="font-bold">How it works:</span> Different TV channels are assigned different frequency bands (e.g., Channel 2 at 54-60 MHz, Channel 3 at 60-66 MHz).
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                <strong>Connector:</strong> F-type connector (screw-on)
              </div>
            </div>

            {/* Broadband Internet Application */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Broadband Internet (DOCSIS)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Cable internet uses coaxial cable with DOCSIS (Data Over Cable Service Interface Specification) to deliver high-speed internet alongside TV signals.</p>
              <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                <span className="font-bold">Speed:</span> DOCSIS 3.1 supports up to 10 Gbps download / 1-2 Gbps upload.
              </div>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                <strong>Equipment:</strong> Cable modem + Coax from wall
              </div>
            </div>
          </div>

          {/* Additional Applications */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Other Common Applications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl mb-1">📡</div>
                <div className="text-xs font-semibold">Satellite TV</div>
                <div className="text-xs text-gray-500">Dish to receiver</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl mb-1">📹</div>
                <div className="text-xs font-semibold">CCTV Cameras</div>
                <div className="text-xs text-gray-500">Analog video</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl mb-1">🔌</div>
                <div className="text-xs font-semibold">Antennas</div>
                <div className="text-xs text-gray-500">TV/FM antennas</div>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl mb-1">🏢</div>
                <div className="text-xs font-semibold">Thicknet/Thinnet</div>
                <div className="text-xs text-gray-500">Legacy Ethernet</div>
              </div>
            </div>
          </div>

          {/* Types of Coaxial Cable */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]">
            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
              <span>📏</span> Common Coaxial Cable Types
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-200 dark:border-amber-700">
                    <th className="text-left py-2 px-3 text-amber-800 dark:text-amber-300">Type</th>
                    <th className="text-left py-2 px-3 text-amber-800 dark:text-amber-300">Impedance</th>
                    <th className="text-left py-2 px-3 text-amber-800 dark:text-amber-300">Typical Use</th>
                    <th className="text-left py-2 px-3 text-amber-800 dark:text-amber-300">Max Distance</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-amber-100 dark:border-amber-800">
                    <td className="py-2 px-3 font-medium">RG-59</td>
                    <td className="py-2 px-3">75Ω</td>
                    <td className="py-2 px-3">Short CCTV runs, baseband video</td>
                    <td className="py-2 px-3">~200m</td>
                   </tr>
                  <tr className="border-b border-amber-100 dark:border-amber-800">
                    <td className="py-2 px-3 font-medium">RG-6</td>
                    <td className="py-2 px-3">75Ω</td>
                    <td className="py-2 px-3">Cable TV, satellite, broadband internet</td>
                    <td className="py-2 px-3">~300m</td>
                   </tr>
                  <tr className="border-b border-amber-100 dark:border-amber-800">
                    <td className="py-2 px-3 font-medium">RG-11</td>
                    <td className="py-2 px-3">75Ω</td>
                    <td className="py-2 px-3">Long runs, main trunk lines</td>
                    <td className="py-2 px-3">~600m</td>
                   </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">RG-58</td>
                    <td className="py-2 px-3">50Ω</td>
                    <td className="py-2 px-3">10BASE2 Ethernet (Thinnet) - obsolete</td>
                    <td className="py-2 px-3">185m</td>
                   </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded text-xs">
              <span className="font-bold">💡 Important:</span> 75Ω coax is used for video/TV/broadband. 50Ω coax is used for radio communications and legacy Ethernet.
            </div>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-teal-700 dark:text-teal-200">
              <li><strong>Use Compression Connectors:</strong> For RG-6, compression F-connectors are more reliable than crimp or screw-on types.</li>
              <li><strong>Watch the Bend Radius:</strong> Coax is less flexible than twisted pair — bending too sharply damages the shield and changes impedance.</li>
              <li><strong>Ground Properly:</strong> Cable TV/satellite installations require proper grounding to prevent lightning damage and electrical shock.</li>
              <li><strong>Check for Kinks:</strong> A kinked coax cable will cause signal reflections (impedance mismatch) and must be replaced.</li>
              <li><strong>Use Splitters Correctly:</strong> Every splitter reduces signal strength (typically -3.5dB per output). Don't cascade too many splitters.</li>
              <li><strong>Moisture is the Enemy:</strong> Outdoor coax must be waterproofed at connections — moisture ingress destroys performance.</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Mixing 50Ω and 75Ω:</strong> Using the wrong impedance cable causes signal reflections (VSWR) and poor performance.</li>
              <li><strong>❌ Using the Wrong Connector:</strong> RG-59 and RG-6 use different-sized connectors — they are not interchangeable.</li>
              <li><strong>❌ Over-tightening Connectors:</strong> Can crush the dielectric, changing impedance and causing signal loss.</li>
              <li><strong>❌ Stapling Coax:</strong> Staples can crush the cable or short the shield to the center conductor.</li>
              <li><strong>❌ Running Coax Parallel to Power Lines:</strong> Even with shielding, long parallel runs can pick up 60Hz hum.</li>
              <li><strong>❌ Ignoring Signal Levels:</strong> Tuhina's cable modem wouldn't sync because the signal was too weak after four splitters.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li><strong>Use RG-6 for Everything New:</strong> RG-59 is outdated except for very short runs. RG-6 has better shielding and lower loss.</li>
              <li><strong>Install a Ground Block:</strong> Where coax enters a building, install a grounding block before the first splitter.</li>
              <li><strong>Label Both Ends:</strong> When Debangshu installs multiple coax runs, he labels each at both ends with room/destination.</li>
              <li><strong>Test with a Cable Tester:</strong> Verify continuity, shorts, and correct termination before connecting equipment.</li>
              <li><strong>Use Weather Boots Outdoors:</strong> Rubber boots over outdoor F-connectors prevent water ingress.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can name all 4 layers of coaxial cable
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand how the shield blocks interference
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know the primary applications (CATV, broadband)
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can differentiate RG-6, RG-59, and RG-11
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand 75Ω vs 50Ω impedance
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know common coax connector types (F-type, BNC)
              </div>
            </div>
          </div>

          {/* 15 Q&A Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              ❓ 15 Questions & Answers
            </h3>
            <div className="space-y-4">
              {[
                { q: "What does 'coaxial' mean?", a: "The inner conductor and outer shield share the same geometric axis (co-axis)." },
                { q: "What are the four layers of coaxial cable?", a: "Center conductor, dielectric insulator, metallic shield, and outer jacket." },
                { q: "What is the purpose of the metallic shield in coax?", a: "To block external electromagnetic interference (EMI) and prevent signal leakage." },
                { q: "What is the most common application of coaxial cable?", a: "Cable television (CATV) and broadband cable internet." },
                { q: "What is the typical impedance of CATV coax?", a: "75 ohms (Ω)." },
                { q: "What is the difference between RG-59 and RG-6?", a: "RG-6 has thicker center conductor, better shielding, and lower signal loss over distance." },
                { q: "What connector is used for cable TV?", a: "F-type connector (screw-on)." },
                { q: "What does DOCSIS stand for?", a: "Data Over Cable Service Interface Specification — standard for cable internet." },
                { q: "What is the maximum speed of DOCSIS 3.1?", a: "Up to 10 Gbps download." },
                { q: "Why is coax better than UTP for long distances?", a: "Better shielding and lower attenuation allow longer runs before signal degradation." },
                { q: "What happens if you bend coax too sharply?", a: "The shield can be damaged and the impedance changes, causing signal reflections." },
                { q: "What is a splitter used for in coax networks?", a: "To divide one coax signal into multiple outputs (e.g., connecting multiple TVs)." },
                { q: "What is the approximate signal loss through a 2-way splitter?", a: "About 3.5 dB per output." },
                { q: "What is the main advantage of coax over twisted pair?", a: "Superior shielding and longer maximum distances." },
                { q: "What is the main disadvantage of coax compared to fiber?", a: "Lower bandwidth and shorter maximum distance than fiber optic cable." },
              ].map((item, idx) => (
                <details key={idx} className="group border-b border-gray-200 dark:border-gray-700 pb-3">
                  <summary className="font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    {idx + 1}. {item.q}
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 pl-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_0.65s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.65s]">
            <Teacher
              note={"🎓 'Coax is the middle child of cabling' — I tell students. Not as cheap/flexible as twisted pair, not as fast/long as fiber, but perfect for its niche: delivering TV and broadband to millions of homes. Have Swadeep bring in an old RG-6 cable and strip it layer by layer — seeing the braided shield and foam dielectric makes it real. In Barrackpore's cable TV infrastructure, coax is everywhere — it's not going away anytime soon!"}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
            <p>
              💭 <strong>Think about:</strong> In the interactive SVG, hover over each layer. Notice how the shield completely surrounds 
              the center conductor. Why is this design better at blocking interference than the simple twisting in UTP?
            </p>
            <p className="mt-2">
              💭 <strong>Observe carefully:</strong> The impedance of coax (75Ω for video, 50Ω for radio) is critical. 
              What happens if you use a 50Ω cable where 75Ω is expected? (Hint: Signal reflections cause ghost images on TVs!)
            </p>
          </div>
        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.6s_ease-out\\],
          .motion-safe\\:animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic5;