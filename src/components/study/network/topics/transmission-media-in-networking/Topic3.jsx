import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic3: Guided Media (Wired Communication)
 * Prototype: Topic3()
 * Return type: JSX.Element
 * Purpose: Explain guided media — physical cables that guide signals from one point to another.
 *          Cover the three main types: Twisted Pair, Coaxial Cable, and Optical Fiber.
 *          Understand their structures, working principles, and appropriate use cases.
 * When & why used: This topic is essential for understanding how physical infrastructure
 *          carries data. It helps network engineers choose the right cable for specific
 *          applications based on distance, speed, cost, and environmental factors.
 */

const Topic3 = () => {
  // State for interactive cable type selection
  const [selectedCable, setSelectedCable] = useState("twistedpair");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-4">
            Guided Media (Wired Communication)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The physical pathways that connect our digital world — from copper to glass.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Twisted Pair • Coaxial • Optical Fiber
          </div>
        </div>

        {/* Main Content - Sequential divs */}
        <div className="space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Are Guided Media?</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="font-semibold">Guided media</strong> (also called bounded media) are physical cables that 
              provide a controlled path for signals to travel from transmitter to receiver. The signal is "guided" 
              and contained within the physical medium, offering greater security, reliability, and typically higher 
              speeds than wireless alternatives.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When Abhronila sets up a computer lab in Barrackpore, she uses guided media to connect all the computers. 
              The three main types of guided media are: <strong>Twisted Pair</strong> (most common for LANs), 
              <strong>Coaxial Cable</strong> (cable TV and broadband), and <strong>Optical Fiber</strong> (high-speed backbone).
            </p>
          </div>

          {/* Three Cable Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Twisted Pair Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform cursor-pointer animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Twisted Pair</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Most common LAN cabling. Pairs of copper wires twisted together to cancel interference.</p>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Speed:</strong> Up to 10 Gbps</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Distance:</strong> 100m max</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Cost:</strong> Low</p>
              </div>
            </div>

            {/* Coaxial Card */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform cursor-pointer animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Coaxial Cable</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Single copper conductor with shielding. Used for cable TV and broadband internet.</p>
              <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800">
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Speed:</strong> Up to 1 Gbps</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Distance:</strong> 500m (thicknet)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Cost:</strong> Moderate</p>
              </div>
            </div>

            {/* Optical Fiber Card */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform cursor-pointer animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Optical Fiber</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Glass or plastic strands that transmit light pulses. Highest speed and longest distance.</p>
              <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Speed:</strong> 100+ Gbps</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Distance:</strong> 40+ km</p>
                <p className="text-xs text-gray-600 dark:text-gray-400"><strong>Cost:</strong> High</p>
              </div>
            </div>
          </div>

          {/* Interactive Cable Structure Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Cable Structure Explorer
            </h3>
            
            {/* Cable Type Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { id: "twistedpair", label: "🔀 Twisted Pair", color: "blue" },
                { id: "coaxial", label: "📡 Coaxial", color: "purple" },
                { id: "fiber", label: "💡 Optical Fiber", color: "green" }
              ].map((cable) => (
                <button
                  key={cable.id}
                  onClick={() => setSelectedCable(cable.id)}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
                    selectedCable === cable.id 
                      ? `bg-${cable.color}-600 text-white` 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {cable.label}
                </button>
              ))}
            </div>

            {/* SVG Cable Cross-Section */}
            <div className="flex justify-center">
              <svg width="400" height="250" viewBox="0 0 400 250" className="w-full max-w-[400px]">
                {selectedCable === "twistedpair" && (
                  <>
                    {/* Outer Sheath */}
                    <rect x="80" y="60" width="240" height="130" rx="10" fill="#e2e8f0" stroke="#475569" strokeWidth="2"/>
                    <text x="200" y="55" textAnchor="middle" fill="#475569" fontSize="10">Outer Sheath (PVC)</text>
                    
                    {/* Twisted Pairs */}
                    <g>
                      <path d="M 120,100 Q 135,85 150,100 Q 165,115 180,100" fill="none" stroke="#ef4444" strokeWidth="3"/>
                      <path d="M 120,105 Q 135,90 150,105 Q 165,120 180,105" fill="none" stroke="#3b82f6" strokeWidth="3"/>
                      <path d="M 220,100 Q 235,85 250,100 Q 265,115 280,100" fill="none" stroke="#10b981" strokeWidth="3"/>
                      <path d="M 220,105 Q 235,90 250,105 Q 265,120 280,105" fill="none" stroke="#f59e0b" strokeWidth="3"/>
                    </g>
                    
                    {/* Drain Wire / Shield (if present) */}
                    <circle cx="340" cy="125" r="15" fill="#94a3b8" opacity="0.5"/>
                    <text x="340" y="160" textAnchor="middle" fill="#64748b" fontSize="8">Optional</text>
                    <text x="340" y="170" textAnchor="middle" fill="#64748b" fontSize="8">Shield</text>
                    
                    <text x="200" y="210" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Twisted Pair Cable</text>
                    <text x="200" y="225" textAnchor="middle" fill="#64748b" fontSize="10">Multiple pairs of copper wires twisted together</text>
                  </>
                )}

                {selectedCable === "coaxial" && (
                  <>
                    {/* Center Conductor */}
                    <circle cx="200" cy="125" r="12" fill="#ef4444"/>
                    <text x="200" y="110" textAnchor="middle" fill="#ef4444" fontSize="10">Copper Core</text>
                    
                    {/* Dielectric Insulator */}
                    <circle cx="200" cy="125" r="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
                    <text x="200" y="140" textAnchor="middle" fill="#92400e" fontSize="8">Dielectric</text>
                    
                    {/* Metallic Shield */}
                    <circle cx="200" cy="125" r="50" fill="none" stroke="#94a3b8" strokeWidth="6" strokeDasharray="4"/>
                    <text x="200" y="185" textAnchor="middle" fill="#475569" fontSize="9">Metallic Shield</text>
                    
                    {/* Outer Insulation */}
                    <circle cx="200" cy="125" r="65" fill="#d1d5db" stroke="#4b5563" strokeWidth="2"/>
                    <text x="200" y="205" textAnchor="middle" fill="#374151" fontSize="10">Outer Insulation</text>
                    
                    <text x="200" y="235" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">Coaxial Cable</text>
                  </>
                )}

                {selectedCable === "fiber" && (
                  <>
                    {/* Core */}
                    <circle cx="200" cy="125" r="15" fill="#fbbf24"/>
                    <text x="200" y="118" textAnchor="middle" fill="#78350f" fontSize="8">Core</text>
                    <text x="200" y="128" textAnchor="middle" fill="#78350f" fontSize="7">(Glass)</text>
                    
                    {/* Cladding */}
                    <circle cx="200" cy="125" r="35" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                    <text x="200" y="148" textAnchor="middle" fill="#1e3a8a" fontSize="8">Cladding</text>
                    
                    {/* Light Signal Animation */}
                    <circle cx="140" cy="125" r="4" fill="#f59e0b">
                      <animate attributeName="cx" values="140;260;140" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Buffer Coating */}
                    <circle cx="200" cy="125" r="55" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
                    <text x="200" y="195" textAnchor="middle" fill="#374151" fontSize="8">Buffer Coating</text>
                    
                    {/* Outer Jacket */}
                    <circle cx="200" cy="125" r="70" fill="#d1d5db" stroke="#4b5563" strokeWidth="2"/>
                    <text x="200" y="220" textAnchor="middle" fill="#374151" fontSize="9">Outer Jacket</text>
                    
                    <text x="200" y="242" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Optical Fiber Cable</text>
                  </>
                )}
              </svg>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              <strong>Observe carefully:</strong> Each cable has a unique internal structure designed for its specific purpose.
              {selectedCable === "fiber" && " Watch the light pulse traveling through the core!"}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Quick Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Feature</th>
                  <th className="text-left py-2 px-3 text-blue-700 dark:text-blue-300">Twisted Pair</th>
                  <th className="text-left py-2 px-3 text-purple-700 dark:text-purple-300">Coaxial</th>
                  <th className="text-left py-2 px-3 text-green-700 dark:text-green-300">Optical Fiber</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Medium</td>
                  <td className="py-2 px-3">Copper</td>
                  <td className="py-2 px-3">Copper</td>
                  <td className="py-2 px-3">Glass/Plastic</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Bandwidth</td>
                  <td className="py-2 px-3">Up to 10 Gbps</td>
                  <td className="py-2 px-3">Up to 1 Gbps</td>
                  <td className="py-2 px-3">100+ Gbps</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Max Distance</td>
                  <td className="py-2 px-3">100m</td>
                  <td className="py-2 px-3">500m</td>
                  <td className="py-2 px-3">40+ km</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Noise Immunity</td>
                  <td className="py-2 px-3">Low (UTP) / Medium (STP)</td>
                  <td className="py-2 px-3">Medium</td>
                  <td className="py-2 px-3">Very High (Immune to EMI)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Typical Use</td>
                  <td className="py-2 px-3">Ethernet LANs, Phone lines</td>
                  <td className="py-2 px-3">Cable TV, Broadband Internet</td>
                  <td className="py-2 px-3">Backbone, Long-haul, Data Centers</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-teal-700 dark:text-teal-200">
              <li><strong>Match Cable to Environment:</strong> In Ichapur's industrial area, fiber is best (no EMI issues). For offices, Cat6a is sufficient.</li>
              <li><strong>Always Leave Service Loops:</strong> When Susmita installs cables, she leaves extra length at both ends for future re-termination.</li>
              <li><strong>Use Plenum-rated Cables:</strong> For runs through air handling spaces, plenum-rated cables are fire-safe and required by code.</li>
              <li><strong>Test Before Pulling:</strong> Always test a cable on the spool before installation — it's much easier to return than after pulling!</li>
              <li><strong>Color Code Your Cables:</strong> Use different colors for different purposes (blue for data, yellow for fiber, etc.).</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Exceeding Distance Limits:</strong> Debangshu once ran a 150m Ethernet cable — the signal was too weak at the other end!</li>
              <li><strong>❌ Bending Fiber Too Tightly:</strong> Optical fiber breaks if bent beyond its minimum bend radius (typically 10x the cable diameter).</li>
              <li><strong>❌ Using UTP Near Heavy EMI:</strong> Running unshielded cables near motors or power lines invites interference.</li>
              <li><strong>❌ Confusing Cable Categories:</strong> Cat5e is not the same as Cat6 — using Cat5e for 10Gbps will fail.</li>
              <li><strong>❌ Poor Cable Management:</strong> Tangled cables make troubleshooting impossible and can cause crosstalk.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li><strong>Document Everything:</strong> Label both ends of every cable. When Abhronila manages a lab, labels save hours of tracing.</li>
              <li><strong>Follow Bend Radius Specs:</strong> For fiber, never bend tighter than manufacturer specification.</li>
              <li><strong>Use Cable Trays and Raceways:</strong> Keep cables organized and protected from physical damage.</li>
              <li><strong>Separate Power and Data:</strong> Maintain at least 6 inches between power and data cables to prevent interference.</li>
              <li><strong>Future-Proof When Possible:</strong> Install Cat6a or fiber even if current needs are lower — labor is the main cost.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can name the three types of guided media
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand the basic structure of each cable type
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know the typical use cases for each medium
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can compare speed, distance, and cost of each type
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
                { q: "What is guided media?", a: "Physical cables that provide a controlled path for signals, such as twisted pair, coaxial, and fiber optic cables." },
                { q: "What are the three main types of guided media?", a: "Twisted Pair, Coaxial Cable, and Optical Fiber." },
                { q: "What is the maximum distance for twisted pair Ethernet?", a: "100 meters (328 feet)." },
                { q: "What is coaxial cable typically used for?", a: "Cable television (CATV), broadband internet, and some legacy Ethernet networks." },
                { q: "What is the main advantage of optical fiber over copper?", a: "Much higher bandwidth, longer distances, and immunity to electromagnetic interference." },
                { q: "What does UTP stand for?", a: "Unshielded Twisted Pair." },
                { q: "What does STP stand for?", a: "Shielded Twisted Pair." },
                { q: "Why are wires twisted in twisted pair cable?", a: "To cancel out electromagnetic interference from adjacent pairs (crosstalk cancellation)." },
                { q: "What is the core of an optical fiber made of?", a: "Glass (silica) or sometimes plastic for short distances." },
                { q: "What is the difference between single-mode and multi-mode fiber?", a: "Single-mode has a smaller core and carries one light path for long distances; multi-mode has a larger core for shorter distances." },
                { q: "What is plenum-rated cable?", a: "Cable with fire-retardant jacketing safe for use in air handling spaces." },
                { q: "What is the minimum bend radius for fiber optic cable?", a: "Typically 10 times the cable diameter (e.g., 30mm for 3mm cable)." },
                { q: "Which guided medium is immune to EMI?", a: "Optical fiber — it uses light, not electricity." },
                { q: "What is crosstalk?", a: "Interference caused when signals from one wire couple into an adjacent wire." },
                { q: "When should you use fiber instead of copper?", a: "For long distances (&gt;100m), high speeds (&gt;10Gbps), or electrically noisy environments." },
              ].map((item, idx) => (
                <details key={idx} className="group border-b border-gray-200 dark:border-gray-700 pb-3">
                  <summary className="font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
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
              note={"🎓 The 'Right Cable for the Right Job' is a critical lesson. In Barrackpore's schools, twisted pair works for classrooms. For the main building backbone, fiber is better. For the TV system, coaxial. Have Tuhina map out a small office network and justify each cable choice. Remind students: The most expensive cable isn't always the best — match to needs!"}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
            <p>
              💭 <strong>Think about:</strong> In the Cable Structure Explorer, click between the three cable types.
              Notice how the internal structure changes. Why do you think coaxial has a shield but twisted pair might not?
              What problem does the shield solve? When would you choose fiber over copper even though it costs more?
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

export default Topic3;