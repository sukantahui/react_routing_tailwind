import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic6: Optical Fiber
 * Prototype: Topic6()
 * Return type: JSX.Element
 * Purpose: Explain optical fiber construction (core, cladding), types (single-mode, multi-mode),
 *          and advantages (high speed, low loss, EMI immunity) over copper media.
 * When & why used: Optical fiber is the backbone of modern long-distance and high-speed
 *          networks. Understanding its operation is essential for designing internet backbones,
 *          data centers, and high-bandwidth connections.
 */

const Topic6 = () => {
  // State for interactive fiber type selection
  const [fiberType, setFiberType] = useState("multimode"); // "multimode" or "singlemode"
  const [showTotalInternalReflection, setShowTotalInternalReflection] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
            Optical Fiber
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Light-speed communication — the backbone of the global internet.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Core • Cladding • Single-Mode • Multi-Mode • Total Internal Reflection
          </div>
        </div>

        {/* Main Content - Sequential divs */}
        <div className="space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Is Optical Fiber?</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="font-semibold">Optical fiber</strong> is a flexible, transparent fiber made of glass (silica) 
              or plastic that transmits light pulses between the two ends of the fiber. It is the fastest and most reliable 
              guided medium, forming the backbone of the internet, telecommunications, and high-speed data networks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When Susmita streams a 4K video from a server in Mumbai to her home in Barrackpore, the data travels 
              thousands of kilometers through undersea optical fiber cables. Light pulses carrying her data zip through 
              the fiber at about 200,000 km/s (slower than in vacuum due to the glass).
            </p>
          </div>

          {/* Core and Cladding Structure */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Core & Cladding: The Light-Guiding Duo
            </h3>
            
            {/* Interactive Fiber Visualization */}
            <div className="flex justify-center">
              <svg width="500" height="280" viewBox="0 0 500 280" className="w-full max-w-[500px]">
                {/* Fiber Type Label */}
                <text x="250" y="25" textAnchor="middle" fill="#6b7280" fontSize="12" fontWeight="bold">
                  {fiberType === "multimode" ? "Multi-Mode Fiber (MMF)" : "Single-Mode Fiber (SMF)"}
                </text>
                
                {/* Outer Coating (Buffer) */}
                <rect x="50" y="60" width="400" height="160" rx="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
                <text x="250" y="55" textAnchor="middle" fill="#6b7280" fontSize="9">Outer Coating (Buffer)</text>
                
                {/* Cladding */}
                <rect x="80" y="80" width="340" height="120" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
                <text x="250" y="215" textAnchor="middle" fill="#3b82f6" fontSize="10">Cladding (Lower Refractive Index)</text>
                
                {/* Core */}
                <rect 
                  x={fiberType === "multimode" ? "150" : "200"} 
                  y="100" 
                  width={fiberType === "multimode" ? "200" : "100"} 
                  height="80" 
                  rx="4" 
                  fill="#fbbf24" 
                  stroke="#d97706" 
                  strokeWidth="2"
                  className="transition-all duration-500"
                />
                <text 
                  x="250" 
                  y={fiberType === "multimode" ? "230" : "235"} 
                  textAnchor="middle" 
                  fill="#d97706" 
                  fontSize="10"
                >
                  Core (Higher Refractive Index)
                </text>
                
                {/* Core Size Indicator */}
                <text x="250" y="250" textAnchor="middle" fill="#6b7280" fontSize="9">
                  Core Diameter: {fiberType === "multimode" ? "50-62.5 µm" : "8-10 µm"}
                </text>
                
                {/* Light Paths - Multi-Mode */}
                {fiberType === "multimode" && showTotalInternalReflection && (
                  <g>
                    {/* Multiple paths (modes) */}
                    <polyline points="100,140 150,120 200,140 250,160 300,140 350,120 400,140" 
                              fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.7">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                    </polyline>
                    <polyline points="100,140 170,100 240,140 310,180 380,140" 
                              fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
                    </polyline>
                    <polyline points="100,140 140,160 180,140 220,120 260,140 300,160 340,140 380,120 420,140" 
                              fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
                    </polyline>
                    
                    {/* Reflection points indication */}
                    <circle cx="150" cy="120" r="3" fill="#f59e0b" opacity="0.6">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="250" cy="160" r="3" fill="#f59e0b" opacity="0.6">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="350" cy="120" r="3" fill="#f59e0b" opacity="0.6">
                      <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                )}
                
                {/* Light Path - Single-Mode */}
                {fiberType === "singlemode" && showTotalInternalReflection && (
                  <g>
                    {/* Single straight path */}
                    <line x1="100" y1="140" x2="420" y2="140" stroke="#f59e0b" strokeWidth="2.5">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                    </line>
                    <text x="250" y="170" textAnchor="middle" fill="#f59e0b" fontSize="10">Single Light Path (Mode)</text>
                  </g>
                )}
                
                {/* Light Source Indicator */}
                <circle cx="90" cy="140" r="8" fill="#f59e0b" opacity="0.8">
                  <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
                </circle>
                <text x="70" y="165" textAnchor="middle" fill="#f59e0b" fontSize="8">LED/Laser</text>
                
                {/* Light Detector */}
                <circle cx="410" cy="140" r="8" fill="#10b981" opacity="0.8"/>
                <text x="430" y="165" textAnchor="middle" fill="#10b981" fontSize="8">Detector</text>
              </svg>
            </div>
            
            {/* Fiber Type Toggle */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setFiberType("multimode")}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105",
                  fiberType === "multimode"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                Multi-Mode (MMF)
              </button>
              <button
                onClick={() => setFiberType("singlemode")}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105",
                  fiberType === "singlemode"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                Single-Mode (SMF)
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                <strong className="font-semibold">Total Internal Reflection:</strong> Light bounces within the core because 
                the cladding has a lower refractive index. This keeps the light confined to the core even around bends!
              </p>
            </div>
          </div>

          {/* Types of Optical Fiber */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
            {/* Multi-Mode Fiber Card */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M5 16h14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Multi-Mode Fiber (MMF)</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Core Diameter:</strong> 50 µm or 62.5 µm</li>
                <li><strong>Light Source:</strong> LED or VCSEL (cheaper)</li>
                <li><strong>Distance:</strong> Up to 550m for 10Gbps, 100m for 40/100Gbps</li>
                <li><strong>Advantages:</strong> Lower cost optics, easier to connect</li>
                <li><strong>Disadvantages:</strong> Modal dispersion limits distance</li>
                <li><strong>Use Case:</strong> Data centers, campus backbones, short-haul</li>
              </ul>
              <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs">
                <span className="font-bold">Color Code:</span> Aqua (OM3/OM4) or Orange (OM1/OM2)
              </div>
            </div>

            {/* Single-Mode Fiber Card */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Single-Mode Fiber (SMF)</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Core Diameter:</strong> 8-10 µm (very thin!)</li>
                <li><strong>Light Source:</strong> Laser (more expensive)</li>
                <li><strong>Distance:</strong> Up to 40km+ for 10Gbps, 80km+ with amplification</li>
                <li><strong>Advantages:</strong> No modal dispersion, longest distance, highest bandwidth</li>
                <li><strong>Disadvantages:</strong> More expensive optics, harder to align</li>
                <li><strong>Use Case:</strong> Long-haul telecom, undersea cables, ISP backbones</li>
              </ul>
              <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded text-xs">
                <span className="font-bold">Color Code:</span> Yellow (standard SMF)
              </div>
            </div>
          </div>

          {/* Advantages of Optical Fiber */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>✨</span> Advantages of Optical Fiber
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg text-center hover:scale-105 transition-transform duration-200">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-teal-700 dark:text-teal-300">Ultra-High Speed</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">100+ Gbps per fiber, terabit speeds possible with WDM</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg text-center hover:scale-105 transition-transform duration-200">
                <div className="text-3xl mb-2">📏</div>
                <h4 className="font-bold text-teal-700 dark:text-teal-300">Long Distance</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">40km+ without repeaters, 100x farther than copper</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg text-center hover:scale-105 transition-transform duration-200">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-bold text-teal-700 dark:text-teal-300">EMI Immune</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">No interference from power lines, motors, or lightning</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg text-center hover:scale-105 transition-transform duration-200">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-bold text-teal-700 dark:text-teal-300">Secure</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Very difficult to tap without detection</p>
              </div>
            </div>
          </div>

          {/* Fiber vs Copper Comparison */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Optical Fiber vs Copper (Twisted Pair)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Feature</th>
                  <th className="text-left py-2 px-3 text-teal-700 dark:text-teal-300">Optical Fiber</th>
                  <th className="text-left py-2 px-3 text-blue-700 dark:text-blue-300">Copper (Cat6a)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Max Speed</td>
                  <td className="py-2 px-3">100+ Gbps (terabits with WDM)</td>
                  <td className="py-2 px-3">10 Gbps</td>
                 </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Max Distance</td>
                  <td className="py-2 px-3">40+ km (SMF)</td>
                  <td className="py-2 px-3">100 m</td>
                 </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">EMI Immunity</td>
                  <td className="py-2 px-3">Complete (light signal)</td>
                  <td className="py-2 px-3">Poor (UTP) / Good (STP)</td>
                 </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3 font-medium">Weight (per 100m)</td>
                  <td className="py-2 px-3">~0.5 kg</td>
                  <td className="py-2 px-3">~3 kg</td>
                 </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Installation Cost</td>
                  <td className="py-2 px-3">Higher (special tools, training)</td>
                  <td className="py-2 px-3">Lower (standard tools)</td>
                 </tr>
              </tbody>
            </table>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-purple-700 dark:text-purple-200">
              <li><strong>Clean Before Connecting:</strong> Dirty fiber ends are the #1 cause of signal loss. Use a one-click cleaner or lint-free wipes with alcohol.</li>
              <li><strong>Inspect Before Mating:</strong> Use a fiber inspection scope — never look into a live fiber (invisible laser light damages eyes!).</li>
              <li><strong>Match the Type:</strong> Don't mix single-mode and multi-mode components — they have different core sizes and wavelengths.</li>
              <li><strong>Watch the Bend Radius:</strong> Minimum bend radius for fiber is typically 10-15x the cable diameter (about 30-50mm).</li>
              <li><strong>Use OTDR for Troubleshooting:</strong> An Optical Time Domain Reflectometer shows loss, distance, and fault locations along the fiber.</li>
              <li><strong>Color Code Matters:</strong> Aqua = OM3/OM4 (laser-optimized MMF), Yellow = SMF, Orange = legacy MMF.</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Bending Fiber Too Tightly:</strong> Causes micro-bends that scatter light and increase loss dramatically.</li>
              <li><strong>❌ Contaminated Connectors:</strong> A speck of dust on a fiber end can block 50%+ of the light.</li>
              <li><strong>❌ Over-tightening Zip Ties:</strong> Crushes the fiber, causing permanent damage and loss.</li>
              <li><strong>❌ Pulling with Excessive Tension:</strong> Fiber can stretch or break. Max pull tension is typically 100-200 lbs.</li>
              <li><strong>❌ Mixing 50µm and 62.5µm Fibers:</strong> Different core sizes cause high loss at the connection point.</li>
              <li><strong>❌ Ignoring Modal Dispersion:</strong> Debangshu used MMF for a 2km run and couldn't understand the signal loss — modal dispersion kills long MMF runs!</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li><strong>Document Everything:</strong> Label each fiber with its type, length, and termination points. Include polarity info for duplex connections.</li>
              <li><strong>Test Before Pulling:</strong> Use a VFL (Visual Fault Locator) or power meter to verify fiber continuity before installation.</li>
              <li><strong>Use Cable Trays with Dividers:</strong> Keep fiber separate from copper cables to prevent crushing and tangling.</li>
              <li><strong>Leave Service Loops:</strong> Coil 10-15 meters of slack at each end for future re-termination or relocation.</li>
              <li><strong>Install Proper Pulling Eyes:</strong> Never pull on the fiber connector — use a pulling grip that attaches to the strength members.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand the core and cladding structure
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can explain total internal reflection
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know the difference between single-mode and multi-mode
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand the advantages of fiber over copper
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know typical applications for each fiber type
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand why fiber is the backbone of the internet
              </div>
            </div>
          </div>

          {/* 15 Q&A Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              ❓ 15 Questions & Answers
            </h3>
            <div className="space-y-4">
              {[
                { q: "What are the two main parts of an optical fiber?", a: "The core (center) and cladding (surrounding layer)." },
                { q: "What is the principle that keeps light in the fiber core?", a: "Total internal reflection — light bounces off the core-cladding boundary." },
                { q: "What is the typical core diameter of single-mode fiber?", a: "8-10 micrometers (µm)." },
                { q: "What is the typical core diameter of multi-mode fiber?", a: "50 µm or 62.5 µm." },
                { q: "What is the main limitation of multi-mode fiber over long distances?", a: "Modal dispersion — different light paths (modes) arrive at different times." },
                { q: "What is the maximum distance for 10Gbps over OM4 multi-mode fiber?", a: "Approximately 550 meters (400m for OM3)." },
                { q: "What is the maximum distance for 10Gbps over single-mode fiber?", a: "40+ kilometers (can be extended with amplifiers)." },
                { q: "What light source is typically used with single-mode fiber?", a: "Laser (because it produces a single, focused beam)." },
                { q: "What light source is typically used with multi-mode fiber?", a: "LED or VCSEL (cheaper, less focused light)." },
                { q: "Why is fiber immune to electromagnetic interference?", a: "It uses light pulses, not electrical signals, so EMI has no effect." },
                { q: "What is the color of standard single-mode fiber jacket?", a: "Yellow." },
                { q: "What is the color of OM3/OM4 laser-optimized multi-mode fiber?", a: "Aqua (light blue-green)." },
                { q: "What tool is used to find breaks in fiber optic cables?", a: "OTDR (Optical Time Domain Reflectometer) or VFL (Visual Fault Locator)." },
                { q: "Why must fiber connectors be kept perfectly clean?", a: "A speck of dust can block significant light or scratch the glass surface." },
                { q: "What is the main advantage of fiber over copper for long distances?", a: "Much lower signal attenuation (loss per kilometer)." },
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
          <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <Teacher
              note={"🎓 'Fiber is magic' — my students say. But it's just physics! Total internal reflection is the key. Have Tuhina demonstrate with a laser pointer and a water stream (fiber optic fountain demo) — light follows the water. For hands-on, let students practice cleaning connectors (safely — no power!). In Barrackpore's new broadband rollout, fiber is replacing copper — understanding it is career gold."}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.65s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.65s]">
            <p>
              💭 <strong>Think about:</strong> In the interactive visualization, click between single-mode and multi-mode.
              Notice how many light paths (modes) exist in multi-mode vs just one in single-mode. Why does this limit distance?
            </p>
            <p className="mt-2">
              💭 <strong>Observe carefully:</strong> The core of single-mode fiber is much thinner than multi-mode.
              Why is a laser needed for single-mode but LED works for multi-mode? (Hint: It's about focusing light into a tiny core!)
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

export default Topic6;