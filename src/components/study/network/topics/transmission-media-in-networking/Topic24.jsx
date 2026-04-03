import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic24: Wireless Communication in Mobile Networks
 * 
 * Component Purpose:
 * - Explains how wireless transmission media enable cellular communication (2G to 5G)
 * - Covers cell towers, frequency bands, handoff, and mobile network architecture
 * - Bridges physical layer wireless concepts to everyday mobile phone usage
 * 
 * When & Why Used:
 * - To understand how mobile phones connect to networks
 * - For careers in telecom, RF engineering, or mobile app development
 * - To appreciate the physical constraints of wireless communication
 * 
 * @returns {JSX.Element} Full educational component with theory, examples, Q&A
 */
const Topic24 = () => {
  // State for interactive signal range demo
  const [distance, setDistance] = useState(1);
  const [frequencyBand, setFrequencyBand] = useState("4G");
  
  // Frequency bands data
  const frequencyData = {
    "2G": { freq: "900/1800 MHz", range: 10, speed: "0.1 Mbps", tech: "GSM" },
    "3G": { freq: "2100 MHz", range: 5, speed: "2-10 Mbps", tech: "UMTS" },
    "4G": { freq: "1800/2300 MHz", range: 3, speed: "20-100 Mbps", tech: "LTE" },
    "5G": { freq: "3500 MHz / 28 GHz", range: 1.5, speed: "100 Mbps - 10 Gbps", tech: "NR" }
  };
  
  const currentFreq = frequencyData[frequencyBand];
  const signalStrength = Math.max(0, 100 - (distance / currentFreq.range) * 100);
  const signalQuality = signalStrength > 70 ? "Excellent" : signalStrength > 40 ? "Good" : signalStrength > 20 ? "Poor" : "No Signal";
  const signalColor = signalStrength > 70 ? "text-green-600" : signalStrength > 40 ? "text-yellow-600" : "text-red-600";
  
  // Mobile network components
  const networkComponents = [
    { name: "UE (User Equipment)", desc: "Your mobile phone, tablet, or IoT device", icon: "📱" },
    { name: "eNodeB/gNB (Base Station)", desc: "Cell tower with antennas and radios", icon: "📡" },
    { name: "Backhaul", desc: "Fiber/microwave connection from tower to core", icon: "🔗" },
    { name: "Core Network", desc: "Switches, routers, authentication servers", icon: "🏢" }
  ];
  
  // Generation comparison
  const generations = [
    { gen: "1G", year: "1980s", key: "Analog voice", speed: "2.4 kbps", tech: "AMPS" },
    { gen: "2G", year: "1990s", key: "Digital voice + SMS", speed: "100 kbps", tech: "GSM, CDMA" },
    { gen: "3G", year: "2000s", key: "Mobile data (first internet)", speed: "2-10 Mbps", tech: "UMTS, HSPA" },
    { gen: "4G", year: "2010s", key: "True mobile broadband", speed: "20-100 Mbps", tech: "LTE, LTE-A" },
    { gen: "5G", year: "2020s", key: "Ultra-low latency, massive IoT", speed: "100 Mbps - 10 Gbps", tech: "5G NR" }
  ];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Wireless Communication in Mobile Networks
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            How cell towers, radio waves, and handoffs keep you connected on the move
          </p>
          <div className="h-1 w-20 bg-green-500 mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-10">
          
          {/* Card: Mobile Networks Overview */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📱</span> The Mobile Network Ecosystem
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                When Susmita calls her friend from <strong>Barrackpore</strong> while walking to school, her voice travels through a complex wireless network:
                <strong> Phone → Cell Tower (eNodeB) → Backhaul (fiber/microwave) → Core Network → PSTN → Destination tower → Friend's phone</strong>
              </p>
              <p>
                Mobile networks use <strong>licensed frequency bands</strong> (auctioned by governments) to avoid interference. 
                Each generation (2G to 5G) brings higher frequencies, more bandwidth, and lower latency — but <strong>higher frequencies have shorter range</strong>.
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500 my-4">
                <p className="italic">📌 <strong>Key insight:</strong> Unlike Wi-Fi (unlicensed spectrum), mobile networks use <strong>licensed spectrum</strong> — exclusive rights to use specific frequencies. This guarantees quality but costs billions in government auctions.</p>
              </div>
            </div>
          </div>
          
          {/* SVG: Cell Tower and Handoff Illustration */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔄</span> Cell Towers & Handoff
            </h2>
            <div className="flex justify-center">
              <svg width="100%" height="300" viewBox="0 0 800 260" className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <rect width="800" height="260" fill="transparent" />
                
                {/* Cell Tower 1 (left) */}
                <rect x="100" y="100" width="10" height="150" fill="#7f8c8d" />
                <polygon points="105,80 80,120 130,120" fill="#e67e22" />
                <circle cx="105" cy="80" r="8" fill="#f1c40f" />
                <text x="105" y="270" textAnchor="middle" fill="currentColor" fontSize="12" className="text-gray-700 dark:text-gray-300">Tower A</text>
                <text x="105" y="285" textAnchor="middle" fill="currentColor" fontSize="10" className="text-gray-500 dark:text-gray-400">Naihati</text>
                
                {/* Cell coverage area (hexagon shape) */}
                <polygon points="105,40 200,70 200,140 105,170 10,140 10,70" fill="#2ecc71" opacity="0.15" stroke="#27ae60" strokeWidth="1.5" />
                <text x="105" y="110" textAnchor="middle" fill="#27ae60" fontSize="10">Cell A</text>
                
                {/* Cell Tower 2 (right) */}
                <rect x="650" y="100" width="10" height="150" fill="#7f8c8d" />
                <polygon points="655,80 630,120 680,120" fill="#e67e22" />
                <circle cx="655" cy="80" r="8" fill="#f1c40f" />
                <text x="655" y="270" textAnchor="middle" fill="currentColor" fontSize="12" className="text-gray-700 dark:text-gray-300">Tower B</text>
                <text x="655" y="285" textAnchor="middle" fill="currentColor" fontSize="10" className="text-gray-500 dark:text-gray-400">Ichapur</text>
                
                {/* Cell B coverage */}
                <polygon points="655,40 750,70 750,140 655,170 560,140 560,70" fill="#2ecc71" opacity="0.15" stroke="#27ae60" strokeWidth="1.5" />
                <text x="655" y="110" textAnchor="middle" fill="#27ae60" fontSize="10">Cell B</text>
                
                {/* Overlap region */}
                <rect x="200" y="80" width="360" height="80" fill="#f1c40f" opacity="0.1" stroke="#f39c12" strokeWidth="1" strokeDasharray="5,3" />
                <text x="380" y="125" textAnchor="middle" fill="#f39c12" fontSize="10">Handoff Zone</text>
                
                {/* Mobile device (moving) */}
                <circle cx="250" cy="150" r="15" fill="#3498db" opacity="0.9">
                  <animate attributeName="cx" from="150" to="650" dur="8s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  📱
                  <animate attributeName="x" from="150" to="650" dur="8s" repeatCount="indefinite" />
                </text>
                
                {/* Connection lines from phone to towers (dynamic) */}
                <line x1="150" y1="150" x2="105" y2="100" stroke="#3498db" strokeWidth="2" strokeDasharray="4,2">
                  <animate attributeName="x1" from="150" to="650" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="4s" repeatCount="indefinite" />
                </line>
                <line x1="650" y1="150" x2="655" y2="100" stroke="#3498db" strokeWidth="2" strokeDasharray="4,2">
                  <animate attributeName="x1" from="150" to="650" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0" to="1" dur="4s" begin="4s" repeatCount="indefinite" />
                </line>
                
                {/* Animated waves from towers */}
                <circle cx="105" cy="80" r="15" fill="none" stroke="#e67e22" strokeWidth="1.5">
                  <animate attributeName="r" from="10" to="40" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="655" cy="80" r="15" fill="none" stroke="#e67e22" strokeWidth="1.5">
                  <animate attributeName="r" from="10" to="40" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">As the user moves from Tower A to Tower B, the call seamlessly <strong>handoffs</strong> between cells</p>
          </div>
          
          {/* Interactive Signal Range Simulator */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📶</span> Interactive: Signal Strength vs Distance
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              See how signal strength drops as you move away from a cell tower — and how higher-frequency networks (5G) have shorter range.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Network Generation:</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(frequencyData).map(gen => (
                      <button
                        key={gen}
                        onClick={() => { setFrequencyBand(gen); setDistance(1); }}
                        className={clsx(
                          "px-3 py-1 rounded-lg font-medium transition-all duration-200",
                          frequencyBand === gen 
                            ? "bg-green-600 text-white" 
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Distance from Tower: {distance.toFixed(1)} km</label>
                  <input 
                    type="range" min="0.1" max={currentFreq.range * 1.2} step="0.1" value={distance}
                    onChange={(e) => setDistance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p><strong>Frequency:</strong> {currentFreq.freq}</p>
                  <p><strong>Technology:</strong> {currentFreq.tech}</p>
                  <p><strong>Max Speed:</strong> {currentFreq.speed}</p>
                  <p><strong>Signal Strength:</strong> <span className={signalColor}>{signalStrength.toFixed(0)}%</span></p>
                  <p><strong>Signal Quality:</strong> <span className={signalColor}>{signalQuality}</span></p>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {signalStrength > 70 ? "📶📶📶" : signalStrength > 40 ? "📶📶" : signalStrength > 20 ? "📶" : "❌"}
                  </div>
                  <p className="text-sm mt-2">
                    {signalStrength > 70 ? "Strong connection — optimal performance" : 
                     signalStrength > 40 ? "Fair connection — may experience slowdowns" :
                     signalStrength > 20 ? "Weak connection — frequent drops likely" : 
                     "No connection — out of coverage area"}
                  </p>
                  {distance > currentFreq.range && (
                    <p className="text-xs text-red-500 mt-2">⚠️ Beyond typical range for {frequencyBand}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Network Architecture */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🏗️</span> Mobile Network Architecture
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {networkComponents.map((comp, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="text-4xl mb-2">{comp.icon}</div>
                  <p className="font-bold">{comp.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comp.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              The base station (tower) connects to the core network via <strong>backhaul</strong> — typically fiber optic cable or point-to-point microwave.
            </div>
          </div>
          
          {/* Generations Comparison Table */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📈</span> Evolution of Mobile Networks (1G → 5G)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Generation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Key Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Speed</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Technology</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {generations.map((gen, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-medium">{gen.gen}</td>
                      <td className="px-4 py-2 text-sm">{gen.year}</td>
                      <td className="px-4 py-2 text-sm">{gen.key}</td>
                      <td className="px-4 py-2 text-sm">{gen.speed}</td>
                      <td className="px-4 py-2 text-sm">{gen.tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Real-World Case: Abhronila's Train Journey */}
          <div className="group bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">🚆</span> Real-World: Abhronila's Train Call
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Abhronila takes a train from <strong>Shyamnagar</strong> to <strong>Kolkata</strong>. During the 45-minute journey, her phone <strong>handoffs between 12 different cell towers</strong> without dropping the call.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">🔄 Handoff Process:</p>
                <ol className="text-sm list-decimal list-inside space-y-1 mt-1">
                  <li>Phone measures signal from current tower + neighboring towers</li>
                  <li>Signal from Tower A drops below threshold</li>
                  <li>Phone reports measurements to network</li>
                  <li>Network prepares Tower B</li>
                  <li>"Handoff command" sent to phone (takes ~50-100ms)</li>
                  <li>Phone switches to Tower B — call continues seamlessly</li>
                </ol>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">📊 Challenges at High Speed:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>Doppler shift changes frequency (up to ±300 Hz at 100 km/h)</li>
                  <li>Fast handoff needed (every 30-60 seconds)</li>
                  <li>5G solves with <strong>massive MIMO</strong> and <strong>beamforming</strong></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* 5G Deep Dive */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">⚡</span> 5G: The Next Generation
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">Enhanced Mobile Broadband (eMBB)</p>
                <p className="text-sm">Up to 10 Gbps — 100x faster than 4G. Download a 4K movie in seconds.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">Ultra-Reliable Low Latency (URLLC)</p>
                <p className="text-sm">1ms latency — enables remote surgery, autonomous vehicles.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <p className="font-semibold">Massive Machine Type Comm (mMTC)</p>
                <p className="text-sm">1 million devices per km² — IoT sensors everywhere.</p>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm">
              <p className="font-semibold">⚠️ 5G Challenge:</p>
              <p>Higher frequencies (mmWave at 28-39 GHz) have very short range — need <strong>small cells</strong> every 200-300 meters. That's why 5G deployment requires many more towers than 4G.</p>
            </div>
          </div>
          
          {/* Tips & Tricks */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips & Tricks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">🔧 RF Engineer Habits:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Use <strong>drive testing</strong> with GPS to map signal strength.</li>
                  <li>Optimize <strong>tilt angles</strong> of tower antennas to control cell boundaries.</li>
                  <li>Monitor <strong>handoff success rate</strong> — below 98% indicates problems.</li>
                  <li>Use <strong>spectrum analyzers</strong> to detect interference sources.</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">📱 User Tips:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Enable <strong>Wi-Fi calling</strong> at home (uses your broadband).</li>
                  <li>In weak signal areas, <strong>airplane mode toggle</strong> forces re-registration.</li>
                  <li>Metal cases and building materials (concrete, low-E glass) block signals.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Common Mistakes */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Misconception: "More bars always means faster speed"</p>
                <p className="text-sm"><strong>Truth:</strong> Bars indicate signal strength, but speed depends on <strong>signal quality (SINR)</strong> and <strong>network congestion</strong>. You can have full bars but slow data if the tower is overloaded.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "5G will work everywhere immediately"</p>
                <p className="text-sm"><strong>Reality:</strong> 5G uses multiple bands. Low-band 5G (600-900 MHz) has good range but is only slightly faster than 4G. mmWave 5G (28 GHz+) is extremely fast but requires line-of-sight to a small cell.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Misunderstanding: "Handoff is controlled by the phone"</p>
                <p className="text-sm"><strong>Truth:</strong> In 4G/5G, the <strong>network decides</strong> handoffs based on measurements from the phone. The phone only reports signal strengths; the base station commands the switch.</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices for Mobile Network Engineers
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Network Planning:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Conduct <strong>propagation modeling</strong> before tower placement.</li>
                  <li>Ensure <strong>overlap zones</strong> of 10-20% for smooth handoff.</li>
                  <li>Plan for <strong>capacity</strong> — not just coverage (dense urban vs rural).</li>
                  <li>Use <strong>small cells</strong> and <strong>DAS</strong> for indoor/urban hot spots.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Operations:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Monitor <strong>key performance indicators (KPIs)</strong>: call drop rate, handoff success, data throughput.</li>
                  <li>Regular <strong>drive tests</strong> in all coverage areas.</li>
                  <li>Track <strong>interference sources</strong> (other carriers, illegal boosters).</li>
                  <li>Maintain <strong>backhaul redundancy</strong> (fiber + microwave).</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">💭</span> Think About...
            </h2>
            <div className="space-y-3">
              <p className="italic text-gray-700 dark:text-gray-300">"Why do mobile networks use lower frequencies (900 MHz) for rural areas but higher frequencies (1800/2300 MHz) for cities?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"How does the handoff process differ when you're on a voice call vs watching a video?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"If you're in a crowded stadium, why does your phone show 'full bars' but data is slow?"</p>
            </div>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="Mobile networks are the most pervasive wireless application students interact with daily. The interactive signal simulator helps them understand the trade-off between frequency and range — higher frequencies (5G) give more bandwidth but shorter range, requiring more towers. The handoff animation shows a concept students experience but rarely understand. Emphasize that licensed spectrum is why mobile networks work reliably even in crowded areas, unlike Wi-Fi which shares unlicensed bands. Use local examples — the train journey from Shyamnagar to Kolkata involves dozens of handoffs!" />
          </div>
          
          {/* Q&A Section */}
          <div className="mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.3s] opacity-0 [animation-fill-mode:forwards]">
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
  { q: "What is cell handoff and why is it needed?", a: "Handoff (or handover) is the process of transferring an active call or data session from one cell tower to another as the user moves. It's needed to maintain continuous connectivity. Without handoff, calls would drop whenever you moved out of a tower's range. Modern networks aim for 'seamless handoff' with less than 50ms interruption, imperceptible to users." },
  { q: "Why do higher frequency bands (5G) have shorter range?", a: "Higher frequency signals experience greater free-space path loss (signal strength drops as frequency squared). A 3.5 GHz 5G signal loses ~6 dB more than a 1.8 GHz 4G signal over the same distance. Higher frequencies also penetrate buildings poorly (mmWave can't go through walls). That's why 5G needs many small cells." },
  { q: "What is the difference between licensed and unlicensed spectrum?", a: "Licensed spectrum (sold by governments to carriers like Jio, Airtel) gives exclusive usage rights in a geographic area. This guarantees no interference from other users. Unlicensed spectrum (2.4 GHz, 5 GHz for Wi-Fi, Bluetooth) is free for anyone to use but suffers from interference (neighbor's Wi-Fi, microwaves, baby monitors)." },
  { q: "What is SINR and why is it more important than RSSI?", a: "SINR (Signal-to-Interference-plus-Noise Ratio) measures signal quality, accounting for interference from other towers and devices. RSSI (Received Signal Strength Indicator) only measures raw power. You can have high RSSI but low SINR (near a tower but with heavy interference), resulting in poor speeds. SINR determines modulation scheme (higher SINR = higher data rate)." },
  { q: "How does a mobile phone know which tower to connect to?", a: "Towers continuously broadcast their Cell ID and signal strength on a broadcast channel. Your phone scans all frequencies, measures signal strength (RSRP) and quality (RSRQ), and selects the best cell. It also maintains a neighbor list from the network, telling it which other towers to monitor for potential handoff." },
  { q: "What is VoLTE and why is it better than older voice calls?", a: "VoLTE (Voice over LTE) sends voice as data packets over the 4G network, rather than falling back to 2G/3G circuit-switched voice. Benefits: higher quality (HD Voice), faster call setup (1-2 seconds vs 5-7 seconds), and ability to use data during calls. Older phones would drop to 2G/3G for calls, losing data connectivity." },
  { q: "What is MIMO and how does it increase speed?", a: "Multiple-Input Multiple-Output (MIMO) uses multiple antennas at both tower and phone to transmit independent data streams simultaneously. 4x4 MIMO (4 transmit, 4 receive antennas) can quadruple speed. 5G uses massive MIMO with 64 or 128 antennas, creating narrow beams to multiple users at once." },
  { q: "Why does my phone get hot when signal is weak?", a: "When signal is weak, your phone increases transmit power (up to 23 dBm, 200 mW) to reach the tower. This draws more current, heating the battery and RF amplifier. In very weak signal, the phone may constantly search for better towers, draining battery rapidly. Airplane mode or moving closer to a window helps." },
  { q: "What is a femtocell and when would you use one?", a: "A femtocell is a small, low-power base station for home/office use, connecting to the carrier via your broadband internet. It creates a local coverage bubble for 10-50 meters. Use when you have poor cellular signal but good internet. The carrier authenticates your SIM and routes calls over your broadband." },
  { q: "How does 5G achieve 1ms latency?", a: "5G reduces latency through: 1) Shorter transmission time intervals (TTI = 0.125ms vs 1ms in 4G), 2) Edge computing (processing closer to user), 3) Faster scheduling, 4) Reduced processing at base station. However, 1ms is only for the radio link — end-to-end latency to a server is still 10-20ms due to fiber propagation delays." },
  { q: "What is beamforming in 5G?", a: "Beamforming focuses radio energy into a narrow beam directed at a specific user, rather than broadcasting in all directions. Using an array of antennas, the tower adjusts phase to create constructive interference in the desired direction. This increases signal strength, reduces interference to others, and improves range at mmWave frequencies." },
  { q: "Why do rural areas have poor mobile coverage?", a: "Economics: each cell tower costs $150k-500k to install and $1-2k/month to operate (rent, power, backhaul). Rural areas have fewer subscribers per tower, so revenue doesn't justify densification. Lower frequencies (700-900 MHz) have better range but carriers may not hold licenses. Government subsidies sometimes fund rural towers." },
  { q: "What is a Distributed Antenna System (DAS)?", a: "DAS places many small antennas throughout a building, all connected to a central signal source. Used in stadiums, airports, hospitals, and subways where a single tower can't penetrate. DAS can be 'passive' (coaxial cables to antennas) or 'active' (fiber to remote units). Improves capacity and coverage in dense indoor environments." },
  { q: "How does network congestion affect mobile data?", a: "Each cell tower has finite capacity (e.g., 300 Mbps for 4G, 1 Gbps for 5G). When many users share the tower (concerts, rush hour), each gets a fraction of the bandwidth. The network uses scheduling algorithms to share fairly, but you may experience slow speeds even with full bars. Carriers add more towers (cell splitting) to increase capacity." },
  { q: "What is the difference between a macro cell, micro cell, and pico cell?", a: "Macro cells: large towers, 1-20 km range, 10-50W power, used for wide coverage. Micro cells: pole-mounted, 100-1000m range, 2-10W power, fill coverage gaps. Pico cells: small units on buildings/lamp posts, 10-100m range, 100mW-2W, add capacity in hotspots. Femtocells: home/office, 10-50m range, 10-100mW." }
];

export default Topic24;