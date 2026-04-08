import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic25: LAN Cabling in Offices and Schools
 * 
 * Component Purpose:
 * - Explains practical deployment of transmission media in local area networks
 * - Covers structured cabling standards (TIA/EIA-568), cable management, and best practices
 * - Bridges theory to real-world installation scenarios in educational and office environments
 * 
 * When & Why Used:
 * - For IT staff setting up school/office networks
 * - To understand cable categories, termination standards, and testing
 * - For planning network infrastructure in new buildings
 * 
 * @returns {JSX.Element} Full educational component with theory, examples, Q&A
 */
const Topic25 = () => {
  // State for interactive cable length calculator
  const [cableLength, setCableLength] = useState(50);
  const [cableType, setCableType] = useState("cat6");
  
  // Cable specifications
  const cableSpecs = {
    cat5e: { maxLength: 100, maxSpeed: "1 Gbps", freq: "100 MHz", useCase: "Basic office, 100Mbps networks" },
    cat6: { maxLength: 100, maxSpeed: "10 Gbps (up to 55m), 1 Gbps (100m)", freq: "250 MHz", useCase: "Most schools, Gigabit networks" },
    cat6a: { maxLength: 100, maxSpeed: "10 Gbps (100m)", freq: "500 MHz", useCase: "High-performance, future-proof" },
    cat7: { maxLength: 100, maxSpeed: "10 Gbps (100m)", freq: "600 MHz", useCase: "Data centers, shielded required" },
    cat8: { maxLength: 30, maxSpeed: "25/40 Gbps", freq: "2000 MHz", useCase: "Data center spine-leaf" }
  };
  
  const currentSpec = cableSpecs[cableType];
  const isWithinSpec = cableLength <= currentSpec.maxLength;
  const speedNote = cableType === "cat6" && cableLength > 55 ? "10 Gbps only supported up to 55m — at 100m, max is 1 Gbps" : 
                    cableType === "cat6a" ? "Full 10 Gbps supported up to 100m" :
                    cableType === "cat5e" ? "Max 1 Gbps at 100m" : "";
  
  // T568A vs T568B wiring standards
  const wiringStandards = [
    { pin: 1, a: "White/Green", b: "White/Orange" },
    { pin: 2, a: "Green", b: "Orange" },
    { pin: 3, a: "White/Orange", b: "White/Green" },
    { pin: 4, a: "Blue", b: "Blue" },
    { pin: 5, a: "White/Blue", b: "White/Blue" },
    { pin: 6, a: "Orange", b: "Green" },
    { pin: 7, a: "White/Brown", b: "White/Brown" },
    { pin: 8, a: "Brown", b: "Brown" }
  ];
  
  // Common installation mistakes
  const commonMistakes = [
    { mistake: "Untwisting wires too much", impact: "Increases crosstalk, reduces max length", fix: "Keep untwist under 13mm (0.5 inch)" },
    { mistake: "Tight cable ties (zip ties)", impact: "Crushing changes impedance, increases return loss", fix: "Use Velcro straps, don't overtighten" },
    { mistake: "Sharp bends (kinking)", impact: "Permanent damage to pairs, increased attenuation", fix: "Bend radius minimum 4x cable diameter" },
    { mistake: "Mixing T568A and T568B", impact: "Creates crossover cable (won't link)", fix: "Use same standard throughout facility" },
    { mistake: "Stapling cables", impact: "Crushing pairs, intermittent faults", fix: "Use J-hooks or cable trays" }
  ];
  
  // Structured cabling components
  const components = [
    { name: "Faceplate & Jack", desc: "Wall outlet where user plugs in", location: "Work area" },
    { name: "Patch Panel", desc: "Central termination point in rack", location: "Telecom room" },
    { name: "Patch Cord", desc: "Short flexible cable (stranded)", location: "Patch panel to switch" },
    { name: "Horizontal Cable", desc: "Solid core cable in walls/ceilings", location: "Telecom room to work area" },
    { name: "Punch-down Tool", desc: "Terminates wires into jacks/panels", location: "Tool" },
    { name: "Cable Tester", desc: "Verifies continuity and mapping", location: "Tool" }
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            LAN Cabling in Offices & Schools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Structured cabling standards, best practices, and real-world deployment
          </p>
          <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-10">
          
          {/* Card: Why Structured Cabling Matters */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🏢</span> The Backbone of Every Office & School
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                When <strong>Susmita</strong> plugs her laptop into the classroom Ethernet port, or <strong>Tuhina</strong> connects her desktop in the <strong>Barrackpore</strong> school computer lab, 
                they're relying on a <strong>structured cabling system</strong> that follows international standards (TIA/EIA-568).
              </p>
              <p>
                Proper LAN cabling is <strong>invisible when done right</strong> but causes endless problems when done wrong. 
                A well-designed cabling infrastructure lasts <strong>15-20 years</strong> and supports multiple generations of network equipment.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-4">
                <p className="italic">📌 <strong>Key insight:</strong> Cabling is infrastructure — like plumbing or electrical wiring. It's expensive to replace, so <strong>do it right the first time</strong>. Always install more capacity than you need today.</p>
              </div>
            </div>
          </div>
          
          {/* SVG: Structured Cabling Architecture */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📐</span> Structured Cabling Architecture
            </h2>
            <div className="flex justify-center">
              <svg width="100%" height="320" viewBox="0 0 900 300" className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="900" height="300" fill="transparent" />
                
                {/* Work Area (left) */}
                <rect x="20" y="100" width="120" height="150" rx="8" fill="#3498db" opacity="0.15" stroke="#3498db" strokeWidth="1.5" />
                <text x="80" y="130" textAnchor="middle" fill="#3498db" fontSize="12" fontWeight="bold">Work Area</text>
                
                {/* Computer */}
                <rect x="45" y="145" width="40" height="30" rx="3" fill="#7f8c8d" />
                <rect x="50" y="150" width="30" height="20" rx="2" fill="#2c3e50" />
                <text x="65" y="163" textAnchor="middle" fill="white" fontSize="8">PC</text>
                <rect x="55" y="180" width="20" height="5" fill="#7f8c8d" />
                
                {/* Wall Jack */}
                <rect x="110" y="170" width="20" height="30" rx="3" fill="#e67e22" />
                <text x="120" y="190" textAnchor="middle" fill="white" fontSize="8">RJ45</text>
                
                {/* Patch cord from PC to wall */}
                <line x1="85" y1="160" x2="110" y2="185" stroke="#f1c40f" strokeWidth="2" />
                
                {/* Horizontal Cable (in ceiling) */}
                <path d="M 130 185 Q 200 185 250 185 Q 300 185 350 185 Q 400 185 450 185 Q 500 185 550 185 Q 600 185 650 185" 
                      stroke="#2c3e50" strokeWidth="4" fill="none" strokeDasharray="8,4" />
                <text x="390" y="175" textAnchor="middle" fill="currentColor" fontSize="10" className="text-gray-600 dark:text-gray-400">Horizontal Cable (solid core)</text>
                <text x="390" y="200" textAnchor="middle" fill="currentColor" fontSize="9" className="text-gray-500 dark:text-gray-400">Max 90m + 10m patch cords = 100m total</text>
                
                {/* Animated data packets along cable */}
                <circle cx="200" cy="185" r="4" fill="#e74c3c">
                  <animate attributeName="cx" from="130" to="650" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="185" r="4" fill="#e74c3c">
                  <animate attributeName="cx" from="130" to="650" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
                
                {/* Telecom Room (middle) */}
                <rect x="650" y="80" width="220" height="190" rx="8" fill="#27ae60" opacity="0.15" stroke="#27ae60" strokeWidth="1.5" />
                <text x="760" y="110" textAnchor="middle" fill="#27ae60" fontSize="12" fontWeight="bold">Telecom Room (IDF)</text>
                
                {/* Patch Panel */}
                <rect x="670" y="130" width="80" height="40" rx="3" fill="#9b59b6" />
                <text x="710" y="155" textAnchor="middle" fill="white" fontSize="10">Patch Panel</text>
                {/* Ports on patch panel */}
                {[0,1,2,3].map(i => (
                  <circle key={i} cx={680 + i*15} cy="155" r="3" fill="#f1c40f" />
                ))}
                
                {/* Switch */}
                <rect x="770" y="130" width="80" height="40" rx="3" fill="#e74c3c" />
                <text x="810" y="155" textAnchor="middle" fill="white" fontSize="10">Switch</text>
                {[0,1,2,3].map(i => (
                  <circle key={i} cx={780 + i*15} cy="155" r="3" fill="#2ecc71" />
                ))}
                
                {/* Patch cords between patch panel and switch */}
                <line x1="750" y1="140" x2="770" y2="140" stroke="#f1c40f" strokeWidth="2" />
                <line x1="750" y1="150" x2="770" y2="150" stroke="#f1c40f" strokeWidth="2" />
                <line x1="750" y1="160" x2="770" y2="160" stroke="#f1c40f" strokeWidth="2" />
                
                {/* Backbone to main distribution */}
                <path d="M 870 150 Q 920 150 920 200 Q 920 250 880 250" stroke="#2c3e50" strokeWidth="4" fill="none" />
                <text x="940" y="200" textAnchor="middle" fill="currentColor" fontSize="10" className="text-gray-600 dark:text-gray-400" transform="rotate(90,940,200)">Fiber Backbone</text>
                
                {/* Main Distribution (right edge) */}
                <rect x="830" y="250" width="70" height="40" rx="5" fill="#8e44ad" />
                <text x="865" y="275" textAnchor="middle" fill="white" fontSize="9">MDF</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">Structured cabling separates work area, horizontal runs, and telecom room</p>
          </div>
          
          {/* Interactive Cable Length Calculator */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📏</span> Interactive: Cable Length & Category Selector
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Select cable category and length to see if it meets Ethernet standards (max 100m for most categories).
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cable Category:</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(cableSpecs).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCableType(cat)}
                        className={clsx(
                          "px-3 py-1 rounded-lg font-medium transition-all duration-200",
                          cableType === cat 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cable Length: {cableLength} m</label>
                  <input 
                    type="range" min="1" max="120" step="1" value={cableLength}
                    onChange={(e) => setCableLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg",
                  isWithinSpec ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
                )}>
                  <p><strong>Max Length:</strong> {currentSpec.maxLength} m</p>
                  <p><strong>Max Speed:</strong> {currentSpec.maxSpeed}</p>
                  <p><strong>Frequency:</strong> {currentSpec.freq}</p>
                  <p><strong>Use Case:</strong> {currentSpec.useCase}</p>
                  {!isWithinSpec && (
                    <p className="text-red-600 font-semibold mt-2">⚠️ Exceeds maximum length — signal may not work reliably!</p>
                  )}
                  {speedNote && isWithinSpec && (
                    <p className="text-yellow-600 text-sm mt-2">ℹ️ {speedNote}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {isWithinSpec ? "✅" : "❌"}
                  </div>
                  <p className="font-bold mb-2">{isWithinSpec ? "Within Specification" : "Out of Specification"}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isWithinSpec 
                      ? `Your ${cableLength}m ${cableType.toUpperCase()} run meets the standard.` 
                      : `${cableType.toUpperCase()} is limited to ${currentSpec.maxLength}m. Consider fiber or a switch in between.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* T568A vs T568B Wiring Standards */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔌</span> Wiring Standards: T568A vs T568B
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These two standards define which colored wires connect to which pins in an RJ45 jack. 
              <strong>Both work identically</strong> — the key is to use the <strong>same standard throughout your facility</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Pin</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">T568A</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">T568B</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Pair</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {wiringStandards.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-mono">{row.pin}</td>
                      <td className="px-4 py-2">
                        <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: row.a.includes('Green') ? '#2ecc71' : row.a.includes('Orange') ? '#e67e22' : row.a.includes('Blue') ? '#3498db' : '#8e44ad' }}></span>
                        {row.a}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: row.b.includes('Green') ? '#2ecc71' : row.b.includes('Orange') ? '#e67e22' : row.b.includes('Blue') ? '#3498db' : '#8e44ad' }}></span>
                        {row.b}
                      </td>
                      <td className="px-4 py-2 text-sm">Pair {Math.ceil(row.pin/2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <p>💡 <strong>Pro tip:</strong> In the US, T568B is more common. In many other countries, T568A is preferred. Both are fine — just <strong>be consistent</strong>!</p>
            </div>
          </div>
          
          {/* Structured Cabling Components */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🧰</span> Components of a Structured Cabling System
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {components.map((comp, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all hover:scale-[1.02]">
                  <p className="font-bold text-blue-600 dark:text-blue-400">{comp.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{comp.location}</p>
                  <p className="text-sm mt-1">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Real-World Case: School Computer Lab in Naihati */}
          <div className="group bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">🏫</span> Real-World Case: Naihati School Computer Lab
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              A school in <strong>Naihati</strong> needed to install a computer lab with 40 workstations. The IT team chose <strong>Cat6 UTP</strong> with a structured cabling approach.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">✅ What They Did Right:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>Installed <strong>2 drops per student desk</strong> (redundancy/future)</li>
                  <li>Used <strong>26 AWG solid copper</strong> (not CCA — copper-clad aluminum)</li>
                  <li>Kept <strong>bend radius ≥ 4x cable diameter</strong></li>
                  <li>Left <strong>service loops</strong> at both ends for re-termination</li>
                  <li>Labeled <strong>every cable and jack</strong> with room/port number</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">📊 Results:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>All 40 ports passed <strong>Fluke certification</strong></li>
                  <li>Network runs <strong>at 1 Gbps</strong> without errors</li>
                  <li>Lab supports <strong>online exams, video streaming, cloud apps</strong></li>
                  <li>Cabling <strong>ready for 2.5/5 Gbps</strong> future upgrades</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Common Installation Mistakes */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Installation Mistakes
            </h2>
            <div className="space-y-3">
              {commonMistakes.map((item, idx) => (
                <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:shadow transition-all">
                  <p className="font-semibold">❌ {item.mistake}</p>
                  <p className="text-sm"><strong>Impact:</strong> {item.impact}</p>
                  <p className="text-sm text-green-700 dark:text-green-400"><strong>Fix:</strong> {item.fix}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tips & Tricks */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips & Tricks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">🔧 Installation Habits:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li><strong>Always pull a pull string</strong> with every cable bundle.</li>
                  <li>Use <strong>Velcro straps</strong>, never zip ties on data cables.</li>
                  <li>Leave <strong>3m (10ft) service loops</strong> at patch panel and wall jack.</li>
                  <li>Test <strong>every single drop</strong> before closing ceilings/walls.</li>
                  <li>Document <strong>as-built drawings</strong> with exact cable paths.</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">💰 Cost-Saving Tips:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Install <strong>more drops than needed</strong> (cable is cheap, labor is expensive).</li>
                  <li>Use <strong>consolidation points</strong> (small enclosures) to split runs efficiently.</li>
                  <li>Buy <strong>solid copper</strong> (not CCA) — CCA fails certification.</li>
                  <li>Consider <strong>pre-terminated trunks</strong> for large bundles.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices for LAN Cabling
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Planning:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Follow <strong>TIA/EIA-568 standard</strong> for all installations.</li>
                  <li>Keep horizontal runs <strong>under 90m</strong> (100m total with patch cords).</li>
                  <li>Separate data cables <strong>12 inches from power cables</strong>.</li>
                  <li>Use <strong>plenum-rated cable</strong> in air-handling spaces (fire code).</li>
                  <li>Plan for <strong>20% spare capacity</strong> in conduits and patch panels.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Installation:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Maintain <strong>minimum bend radius</strong> (4x cable diameter).</li>
                  <li>Untwist no more than <strong>13mm (0.5 inch)</strong> at termination.</li>
                  <li>Use <strong>punch-down tool with 110 or Krone blade</strong> matching jack.</li>
                  <li>Test with <strong>certification tester</strong> (not just continuity).</li>
                  <li>Label <strong>both ends identically</strong> with permanent labels.</li>
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
              <p className="italic text-gray-700 dark:text-gray-300">"Why does horizontal cabling use solid copper wire, but patch cords use stranded wire?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"If you're wiring a school that will use the network for 15 years, should you install Cat6, Cat6a, or fiber to the classroom?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"Why is cable testing more important than just plugging in a laptop and seeing if it works?"</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Try the interactive length calculator to understand distance limits for different cable categories.</p>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="LAN cabling is the most hands-on topic in the physical layer. Students should actually terminate a jack and test it — nothing beats practical experience. Emphasize that 90% of network problems are physical layer issues: bad cables, loose connections, or improper termination. The T568A/B table is essential reference material. For schools, recommend Cat6 as the minimum today — Cat5e is obsolete for new installations. And always, always leave service loops!" />
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
  { q: "What is the maximum length for an Ethernet cable run?", a: "The TIA/EIA standard specifies 100 meters (328 feet) total for a copper Ethernet link. This includes 90 meters of solid-core horizontal cable plus 10 meters of stranded patch cords (5m at each end). Exceeding 100m can cause signal degradation, increased errors, and link failure." },
  { q: "What's the difference between solid and stranded copper cable?", a: "Solid core: single copper wire per conductor, used for horizontal (in-wall) cabling. Lower attenuation, better for long distances, but brittle (breaks if bent repeatedly). Stranded: multiple thin copper strands, used for patch cords. Flexible, withstands bending, but higher attenuation (max 10m). Never use stranded for horizontal runs." },
  { q: "What is CCA and why should you avoid it?", a: "CCA = Copper-Clad Aluminum (aluminum core with thin copper coating). Cheaper than solid copper but violates TIA standards. Problems: higher resistance (shorter max distance), brittle (breaks easily), incompatible with punch-down tools, fails certification. Always buy 100% solid copper (bare copper)." },
  { q: "What is the difference between Cat5e, Cat6, and Cat6a?", a: "Cat5e: 100 MHz, 1 Gbps at 100m. Minimum for any new install? No — obsolete. Cat6: 250 MHz, 10 Gbps up to 55m, 1 Gbps at 100m. Good for most schools/offices. Cat6a: 500 MHz, 10 Gbps at 100m. Better shielding, future-proof. Cat6a is recommended for new installations today." },
  { q: "What is a patch panel and why use one?", a: "A patch panel terminates horizontal cables in the telecom room, providing a fixed, organized termination point. Benefits: protects cables from damage, allows easy changes (re-patch instead of re-pull), provides labeling surface, and maintains bend radius. Never terminate horizontal cables directly into a switch." },
  { q: "What is a cable tester and what does it test?", a: "A basic continuity tester checks wire mapping (pins 1-8 connected correctly). A certification tester (Fluke, etc.) measures near-end crosstalk (NEXT), return loss, attenuation, delay skew, and verifies the link meets category specifications. Certification is required for warranty and professional installations." },
  { q: "Why is the untwist length critical?", a: "The twisting of pairs cancels electromagnetic interference. Untwisting more than 13mm (0.5 inch) at termination destroys this cancellation, increasing crosstalk and reducing max length. Professional installers use a 'twist-on' technique — keeping the twist as close to the IDC slot as possible." },
  { q: "What is plenum-rated cable and when is it required?", a: "Plenum spaces are air handling spaces (drop ceilings used for HVAC return). Plenum-rated cable has low-smoke, low-flame insulation (e.g., FEP). Required by fire code in plenums. Regular PVC cable releases toxic smoke when burned. Plenum cable costs 2-3x more but is legally required." },
  { q: "What is the minimum bend radius for UTP cable?", a: "For Category 6 UTP, the minimum bend radius during installation is 4x the cable diameter (about 1 inch for typical cable). For permanent installation, 10x diameter is recommended. Sharp bends change impedance, cause return loss, and can permanently damage pairs." },
  { q: "Why separate data cables from power cables?", a: "Power cables (120/240V AC) create electromagnetic fields that induce noise in adjacent data cables. Standards require: 12 inches separation from parallel power runs, cross power at 90 degrees only, avoid running in same conduit. Failure causes CRC errors, retransmissions, and reduced throughput." },
  { q: "What is a service loop and why leave one?", a: "A service loop is extra cable length (3-10 feet) coiled at both ends of a run. Purpose: allows re-termination if the end gets damaged, permits moving patch panels slightly, provides slack for testing equipment, and accommodates future changes. Never cut cable exactly to length!" },
  { q: "What is a cable certifier vs verifier vs qualifier?", a: "Verifier (basic): tests continuity and wire map ($50-200). Qualifier: tests speed capability (1G/10G) but not to full standard ($500-1500). Certifier: tests all parameters to TIA standard, prints reports ($2000-15000). For professional installs, certification is required for warranty and customer acceptance." },
  { q: "Can I run Ethernet outdoors without special cable?", a: "No. Standard UTP isn't UV-resistant, isn't waterproof, and conducts lightning. Outdoor cable needs: UV-resistant jacket, gel flooding (water block), and possibly shielded (for lightning protection). For outdoor, use direct burial Cat6 or fiber (fiber is immune to lightning)." },
  { q: "What is PoE and how does it affect cabling?", a: "Power over Ethernet (PoE) sends DC power (48V) over unused pairs or common mode. Higher power levels (PoE++ up to 90W) heat cables. Use Cat6a or better for high-power PoE (heat dissipation). Also, solid copper (not CCA) is mandatory — CCA's higher resistance causes voltage drop and fire risk." },
  { q: "How do I choose between T568A and T568B?", a: "Both are identical electrically. T568B is more common in the US (legacy from AT&T). T568A is required for US government contracts and matches USOC pinouts. Practical advice: choose one standard and use it consistently throughout your facility. Mixing creates crossover cables that modern Auto-MDIX switches can handle, but it's poor practice." }
];

export default Topic25;