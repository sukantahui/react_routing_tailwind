import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic4: Twisted Pair Cable
 * Prototype: Topic4()
 * Return type: JSX.Element
 * Purpose: Explain twisted pair cabling in detail — UTP vs STP, categories (Cat5, Cat6, etc.),
 *          and its primary use in Local Area Networks (LANs).
 * When & why used: Twisted pair is the most common LAN cabling in offices, schools, and homes.
 *          Understanding its types, categories, and proper usage is essential for any network
 *          installation or troubleshooting scenario.
 */

const Topic4 = () => {
  // State for interactive category selector
  const [selectedCategory, setSelectedCategory] = useState("cat6");
  const [cableType, setCableType] = useState("utp"); // utp or stp

  // Category specifications
  const categories = {
    cat5: { name: "Cat5", speed: "100 Mbps", freq: "100 MHz", distance: "100m", use: "Fast Ethernet (obsolete)" },
    cat5e: { name: "Cat5e", speed: "1 Gbps", freq: "100 MHz", distance: "100m", use: "Gigabit Ethernet (common)" },
    cat6: { name: "Cat6", speed: "1 Gbps (10 Gbps up to 55m)", freq: "250 MHz", distance: "100m (55m for 10G)", use: "High-speed LAN" },
    cat6a: { name: "Cat6a", speed: "10 Gbps", freq: "500 MHz", distance: "100m", use: "Data centers, enterprise" },
    cat7: { name: "Cat7", speed: "10 Gbps (40 Gbps possible)", freq: "600 MHz", distance: "100m", use: "High-end installations" },
    cat8: { name: "Cat8", speed: "25-40 Gbps", freq: "2000 MHz", distance: "30m", use: "Data center short runs" }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
            Twisted Pair Cable
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The backbone of modern local area networks — from your home router to office data centers.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            UTP • STP • Cat5 • Cat6 • Cat6a • LAN Cabling
          </div>
        </div>

        {/* Main Content - Sequential divs */}
        <div className="space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Is Twisted Pair Cable?</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="font-semibold">Twisted pair cable</strong> is a type of copper cabling where two insulated 
              copper wires are twisted around each other. The twisting cancels out electromagnetic interference (EMI) 
              from external sources and <strong className="font-semibold">crosstalk</strong> from adjacent pairs. This makes it 
              the most popular choice for Ethernet networks worldwide.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When Swadeep sets up a computer lab in Barrackpore, he uses twisted pair cables to connect every computer 
              to the network switch. It's affordable, flexible, and easy to install — perfect for LAN environments.
            </p>
          </div>

          {/* UTP vs STP Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UTP Card */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform cursor-pointer animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]"
                 onMouseEnter={() => setCableType("utp")}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">UTP (Unshielded Twisted Pair)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">No additional shielding — just the twisted pairs inside a plastic outer jacket.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-3">
                <li><strong>✓ Advantages:</strong> Cheapest, most flexible, easiest to install</li>
                <li><strong>✗ Disadvantages:</strong> More susceptible to EMI and crosstalk</li>
                <li><strong>📌 Best for:</strong> Standard office and home environments</li>
              </ul>
            </div>

            {/* STP Card */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform cursor-pointer animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
                 onMouseEnter={() => setCableType("stp")}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">STP (Shielded Twisted Pair)</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Includes a metallic shield (foil or braid) around pairs or overall cable.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-3">
                <li><strong>✓ Advantages:</strong> Better noise immunity, less crosstalk</li>
                <li><strong>✗ Disadvantages:</strong> More expensive, stiffer, requires proper grounding</li>
                <li><strong>📌 Best for:</strong> Noisy environments (factories, near power lines)</li>
              </ul>
            </div>
          </div>

          {/* Interactive Cable Structure Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Twisted Pair Cable Structure
            </h3>
            
            {/* Cable Type Indicator */}
            <div className="text-center mb-4">
              <span className={clsx(
                "inline-block px-4 py-1 rounded-full text-sm font-semibold",
                cableType === "utp" 
                  ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                  : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
              )}>
                {cableType === "utp" ? "UTP (Unshielded)" : "STP (Shielded)"}
              </span>
            </div>

            {/* SVG Cable Cross-Section */}
            <div className="flex justify-center">
              <svg width="450" height="280" viewBox="0 0 450 280" className="w-full max-w-[450px]">
                {/* Outer Sheath */}
                <rect x="60" y="60" width="330" height="160" rx="12" fill="#e2e8f0" stroke="#475569" strokeWidth="2"/>
                <text x="225" y="52" textAnchor="middle" fill="#475569" fontSize="10">Outer Sheath (PVC/LSZH)</text>
                
                {/* Shield (only for STP) */}
                {cableType === "stp" && (
                  <>
                    <rect x="70" y="70" width="310" height="140" rx="8" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="6,3"/>
                    <text x="225" y="240" textAnchor="middle" fill="#a855f7" fontSize="9">Metallic Shield (Foil/Braid)</text>
                    {/* Drain wire */}
                    <line x1="380" y1="80" x2="380" y2="200" stroke="#a855f7" strokeWidth="2"/>
                    <text x="395" y="145" textAnchor="start" fill="#a855f7" fontSize="8" transform="rotate(90,395,145)">Drain Wire</text>
                  </>
                )}
                
                {/* Twisted Pairs */}
                {/* Pair 1 - Blue/White */}
                <g>
                  <path d="M 100,110 Q 120,95 140,110 Q 160,125 180,110" fill="none" stroke="#3b82f6" strokeWidth="3"/>
                  <path d="M 100,115 Q 120,100 140,115 Q 160,130 180,115" fill="none" stroke="#93c5fd" strokeWidth="3"/>
                </g>
                
                {/* Pair 2 - Orange/White */}
                <g>
                  <path d="M 190,110 Q 210,95 230,110 Q 250,125 270,110" fill="none" stroke="#f97316" strokeWidth="3"/>
                  <path d="M 190,115 Q 210,100 230,115 Q 250,130 270,115" fill="none" stroke="#fed7aa" strokeWidth="3"/>
                </g>
                
                {/* Pair 3 - Green/White */}
                <g>
                  <path d="M 100,155 Q 120,140 140,155 Q 160,170 180,155" fill="none" stroke="#10b981" strokeWidth="3"/>
                  <path d="M 100,160 Q 120,145 140,160 Q 160,175 180,160" fill="none" stroke="#a7f3d0" strokeWidth="3"/>
                </g>
                
                {/* Pair 4 - Brown/White */}
                <g>
                  <path d="M 190,155 Q 210,140 230,155 Q 250,170 270,155" fill="none" stroke="#8b5cf6" strokeWidth="3"/>
                  <path d="M 190,160 Q 210,145 230,160 Q 250,175 270,160" fill="none" stroke="#c4b5fd" strokeWidth="3"/>
                </g>
                
                {/* Cross-shaped separator (spline) - typical in Cat6+ */}
                <line x1="185" y1="85" x2="185" y2="215" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4"/>
                <line x1="70" y1="140" x2="330" y2="140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4"/>
                <text x="335" y="143" fill="#64748b" fontSize="8">Spline</text>
                <text x="335" y="153" fill="#64748b" fontSize="7">(Cat6+)</text>
                
                {/* Labels for pairs */}
                <text x="140" y="90" textAnchor="middle" fill="#3b82f6" fontSize="8">Pair 1</text>
                <text x="230" y="90" textAnchor="middle" fill="#f97316" fontSize="8">Pair 2</text>
                <text x="140" y="195" textAnchor="middle" fill="#10b981" fontSize="8">Pair 3</text>
                <text x="230" y="195" textAnchor="middle" fill="#8b5cf6" fontSize="8">Pair 4</text>
                
                <text x="225" y="265" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Twisted Pair Cable</text>
              </svg>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              <strong>Observe carefully:</strong> The twisting cancels interference. STP adds a shield for extra protection.
              Hover over UTP or STP cards above to see the difference!
            </p>
          </div>

          {/* Cable Categories */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Ethernet Cable Categories</h3>
            
            {/* Category Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {categories[cat].name}
                </button>
              ))}
            </div>

            {/* Selected Category Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {categories[selectedCategory].name}
                </h4>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {categories[selectedCategory].freq}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">Speed:</span>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold">{categories[selectedCategory].speed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">Distance:</span>
                  <span className="text-gray-800 dark:text-gray-200">{categories[selectedCategory].distance}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">Use Case:</span>
                  <span className="text-gray-800 dark:text-gray-200">{categories[selectedCategory].use}</span>
                </div>
              </div>
            </div>

            {/* Category Recommendation */}
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>💡 Pro Tip:</strong> For new installations in 2024, use <strong>Cat6a</strong> for future-proofing 
                (supports 10Gbps to 100m). Cat5e is still fine for 1Gbps networks. Cat8 is overkill for most offices — 
                it's designed for data centers with short runs.
              </p>
            </div>
          </div>

          {/* Uses in LAN */}
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]">
            <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300 mb-4 flex items-center gap-2">
              <span>🏢</span> Uses in Local Area Networks (LAN)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-700 dark:text-cyan-300">Ethernet Connections</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Connecting computers, printers, and servers to network switches.</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">RJ45 connectors at both ends</div>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-700 dark:text-cyan-300">Telephone Systems</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Traditional analog phones and VoIP handsets.</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Often uses Cat3 or Cat5e</div>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-cyan-700 dark:text-cyan-300">PoE (Power over Ethernet)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Powering IP cameras, Wi-Fi access points, and VoIP phones.</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Cat5e or better required</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Real-world scenario:</strong> When Tuhina sets up a school network in Naihati with 50 computers,
                she uses Cat6 UTP cabling from each classroom to the wiring closet. The total run from the farthest
                computer is under 90 meters, well within the 100m limit.
              </p>
            </div>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-teal-700 dark:text-teal-200">
              <li><strong>The 100m Rule:</strong> Never exceed 100 meters (328 feet) between active devices — signal degradation becomes severe.</li>
              <li><strong>Untwist Minimally:</strong> When terminating, untwist no more than 0.5 inches (13mm) of each pair. More untwisting invites crosstalk.</li>
              <li><strong>Use a Cable Tester:</strong> Always test every cable after termination — Susmita learned this after troubleshooting for hours!</li>
              <li><strong>Color Code Your Cables:</strong> Use blue for data, yellow for PoE, gray for voice, etc. Saves time during troubleshooting.</li>
              <li><strong>Leave Service Loops:</strong> At the patch panel end, leave 10-15 feet of slack coiled for future re-termination.</li>
              <li><strong>STP Grounding is Critical:</strong> If you use STP, ensure proper grounding at ONE end only (ground loops cause noise).</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Using Cat5 for Gigabit:</strong> Cat5 only supports 100Mbps. You need Cat5e or higher for 1Gbps.</li>
              <li><strong>❌ Running UTP Near Power Lines:</strong> Electromagnetic interference from power cables corrupts data. Maintain 6-inch separation.</li>
              <li><strong>❌ Bending Too Sharply:</strong> Minimum bend radius is about 4x the cable diameter — tight bends damage internal pairs.</li>
              <li><strong>❌ Pulling Too Hard:</strong> Excessive tension stretches the pairs, changing impedance and causing reflections.</li>
              <li><strong>❌ Mixing Categories:</strong> A Cat6a cable terminated with a Cat5e jack performs like Cat5e — the whole channel matters.</li>
              <li><strong>❌ Ignoring the Spline:</strong> Cat6 and above have a plastic cross separator — don't remove it; it reduces crosstalk.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li><strong>Future-Proof with Cat6a:</strong> The labor cost dominates installation — spend slightly more on Cat6a for 10Gbps readiness.</li>
              <li><strong>Use Keystone Jacks:</strong> They're more reliable than crimping plugs for permanent installations.</li>
              <li><strong>Document Everything:</strong> Label both ends of every cable with a unique ID matching your floor plan.</li>
              <li><strong>Follow T568A or T568B:</strong> Pick one standard and stick to it throughout your installation.</li>
              <li><strong>Test with a Certifier:</strong> For professional jobs, use a cable certifier (not just a continuity tester).</li>
              <li><strong>Use Cable Management:</strong> Horizontal and vertical cable managers keep your rack clean and maintainable.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand the difference between UTP and STP
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can name at least 4 Ethernet cable categories
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know the 100m distance limitation
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can identify common twisted pair applications in LANs
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand why wires are twisted together
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know which category to recommend for new installations
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
                { q: "What does UTP stand for?", a: "Unshielded Twisted Pair." },
                { q: "What does STP stand for?", a: "Shielded Twisted Pair." },
                { q: "Why are the wires twisted in twisted pair cable?", a: "To cancel out electromagnetic interference and reduce crosstalk between adjacent pairs." },
                { q: "What is the maximum distance for twisted pair Ethernet?", a: "100 meters (328 feet) between active devices." },
                { q: "What is the minimum category required for Gigabit Ethernet (1Gbps)?", a: "Cat5e (enhanced Cat5)." },
                { q: "What category supports 10Gbps up to 100 meters?", a: "Cat6a (Cat6 supports 10Gbps only up to 55 meters)." },
                { q: "What is the main disadvantage of STP compared to UTP?", a: "STP is more expensive, less flexible, and requires proper grounding." },
                { q: "What connector is used with twisted pair Ethernet?", a: "RJ45 (8P8C) connector." },
                { q: "What is crosstalk?", a: "Interference caused when signals from one wire pair couple into an adjacent pair." },
                { q: "What is PoE and why is it useful?", a: "Power over Ethernet — delivers power and data over the same cable, useful for IP cameras and access points." },
                { q: "Which is better for a noisy factory environment — UTP or STP?", a: "STP, because the shield provides protection against electromagnetic interference." },
                { q: "What is the frequency rating of Cat6 cable?", a: "250 MHz." },
                { q: "What is the maximum speed of Cat8 cable?", a: "25-40 Gbps (up to 30 meters)." },
                { q: "What is the difference between Cat5e and Cat6?", a: "Cat6 has tighter twists, a plastic spline separator, and higher frequency rating (250MHz vs 100MHz)." },
                { q: "Why should you not untwist too much when terminating?", a: "Untwisting more than 0.5 inches increases crosstalk and reduces performance." },
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
              note={"🎓 'The Twist is the Magic' — I tell my students. Without twisting, the cable would be useless beyond a few meters. Have Debangshu demonstrate crosstalk by untwisting a short section and showing increased errors on a cable tester. For hands-on practice, have them terminate RJ45 connectors — the 0.5-inch untwist rule is critical. In Barrackpore's schools, Cat6 UTP is the sweet spot for cost vs performance."}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
            <p>
              💭 <strong>Think about:</strong> In the category selector, notice how speed and frequency increase together.
              Why do you think Cat8 has a much shorter maximum distance (30m vs 100m)? 
              (Hint: Higher frequencies have more attenuation — trade-offs are everywhere in networking!)
            </p>
            <p className="mt-2">
              💭 <strong>Observe carefully:</strong> The cross-shaped spline in Cat6+ cables separates the four pairs.
              What problem does this solve? (Answer: It reduces crosstalk between adjacent pairs by maintaining separation.)
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

export default Topic4;