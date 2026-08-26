import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic2: Signal Impairments
 * Prototype: Topic2()
 * Return type: JSX.Element
 * Purpose: Explain the various impairments that affect signals during transmission:
 *          noise, attenuation, distortion, and interference. Understand their causes
 *          and impact on data transmission quality.
 * When & why used: This topic is critical for understanding why real-world communication
 *          is never perfect. It helps network engineers diagnose problems and choose
 *          appropriate media, encoding schemes, and error correction methods.
 */

const Topic2 = () => {
  // State for interactive demonstration
  const [activeImpairment, setActiveImpairment] = useState("attenuation");
  const [noiseLevel, setNoiseLevel] = useState(0); // 0, 1, 2
  const [distance, setDistance] = useState(50); // meters

  // Helper to get noise multiplier
  const getNoiseEffect = () => {
    switch(noiseLevel) {
      case 0: return 0;
      case 1: return 0.3;
      case 2: return 0.6;
      default: return 0;
    }
  };

  // Helper to get attenuation effect
  const getAttenuationEffect = () => {
    // Signal strength decreases exponentially with distance
    const maxDistance = 100;
    const strength = Math.max(0, 1 - (distance / maxDistance) * 0.8);
    return strength;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent mb-4">
            Signal Impairments
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the enemies of clean transmission — noise, attenuation, distortion, and interference.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
            Noise • Attenuation • Distortion • Interference
          </div>
        </div>

        {/* Main Content - Sequential divs */}
        <div className="space-y-8">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Are Signal Impairments?</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In an ideal world, a transmitted signal would arrive at the receiver exactly as it was sent. 
              However, in the real world, <strong className="font-semibold">signal impairments</strong> corrupt, weaken, or distort the signal 
              during transmission. These impairments limit the distance, speed, and reliability of communication.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When Susmita tries to video call her friend in Shyamnagar, signal impairments might cause 
              pixelated video, dropped frames, or complete disconnection. Understanding these impairments 
              helps network engineers design better systems and troubleshoot problems.
            </p>
          </div>

          {/* Four Types of Impairments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attenuation Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">1. Attenuation</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">The gradual loss of signal strength as it travels through a medium.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>Causes:</strong> Resistance in copper, absorption in fiber, distance</li>
                <li><strong>Solution:</strong> Amplifiers, repeaters, signal boosters</li>
                <li><strong>Measured in:</strong> Decibels (dB)</li>
              </ul>
              <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">
                <span className="font-bold">Example:</span> When Debangshu uses a 150m Ethernet cable, the signal becomes too weak to detect reliably.
              </div>
            </div>

            {/* Noise Card */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 dark:text-red-300">2. Noise</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Unwanted electrical or electromagnetic energy that corrupts the signal.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>Types:</strong> Thermal, shot, flicker, impulse, crosstalk</li>
                <li><strong>Solution:</strong> Shielding, filtering, error correction</li>
                <li><strong>Impact:</strong> Bit errors, reduced SNR (Signal-to-Noise Ratio)</li>
              </ul>
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs">
                <span className="font-bold">Example:</span> Static on a radio or humming in audio cables is caused by noise.
              </div>
            </div>

            {/* Distortion Card */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">3. Distortion</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Change in the shape or timing of the signal waveform.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>Causes:</strong> Nonlinearities, different frequency propagation speeds</li>
                <li><strong>Types:</strong> Amplitude, frequency, phase, delay distortion</li>
                <li><strong>Solution:</strong> Equalization, better medium, shorter distances</li>
              </ul>
              <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded text-xs">
                <span className="font-bold">Example:</span> A square wave becoming rounded or a pulse spreading out over time.
              </div>
            </div>

            {/* Interference Card */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">4. Interference</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">External signals from other devices disrupting the intended transmission.</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li><strong>Sources:</strong> Other cables, motors, radios, power lines, lightning</li>
                <li><strong>Types:</strong> EMI (Electromagnetic), RFI (Radio Frequency), crosstalk</li>
                <li><strong>Solution:</strong> Shielding, separation, filtering, frequency hopping</li>
              </ul>
              <div className="mt-3 p-2 bg-purple-100 dark:bg-purple-900/30 rounded text-xs">
                <span className="font-bold">Example:</span> Tuhina's Wi-Fi slows down when the microwave runs — that's interference!
              </div>
            </div>
          </div>

          {/* Interactive Signal Impairment Visualizer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Interactive Signal Impairment Visualizer
            </h3>
            
            {/* Impairment Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { id: "attenuation", label: "📉 Attenuation", color: "blue" },
                { id: "noise", label: "📢 Noise", color: "red" },
                { id: "distortion", label: "📐 Distortion", color: "yellow" },
                { id: "interference", label: "⚡ Interference", color: "purple" }
              ].map((imp) => (
                <button
                  key={imp.id}
                  onClick={() => setActiveImpairment(imp.id)}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
                    activeImpairment === imp.id 
                      ? `bg-${imp.color}-600 text-white` 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {imp.label}
                </button>
              ))}
            </div>

            {/* Controls based on active impairment */}
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              {activeImpairment === "attenuation" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distance: {distance} meters
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Signal strength at {distance}m: {(getAttenuationEffect() * 100).toFixed(0)}%
                  </p>
                </div>
              )}
              {activeImpairment === "noise" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Noise Level: {noiseLevel === 0 ? "None" : noiseLevel === 1 ? "Moderate" : "High"}
                  </label>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((level) => (
                      <button
                        key={level}
                        onClick={() => setNoiseLevel(level)}
                        className={clsx(
                          "flex-1 py-2 rounded transition-all",
                          noiseLevel === level
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {level === 0 ? "None" : level === 1 ? "Moderate" : "High"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeImpairment === "distortion" && (
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <p className="text-sm">Delay distortion causes different frequency components to arrive at different times.</p>
                  <div className="mt-3 flex justify-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
                    <span className="text-xs">→ Spreading pulse</span>
                  </div>
                </div>
              )}
              {activeImpairment === "interference" && (
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <p className="text-sm">External signals from nearby devices corrupt the original transmission.</p>
                  <div className="mt-3 flex justify-center gap-4">
                    <span className="text-2xl">📡 →</span>
                    <span className="text-2xl animate-pulse">⚡</span>
                    <span className="text-2xl">→ 📡</span>
                  </div>
                </div>
              )}
            </div>

            {/* SVG Waveform Visualization */}
            <div className="flex justify-center">
              <svg width="500" height="200" viewBox="0 0 500 200" className="w-full max-w-[500px]">
                {/* Original Signal (dotted) */}
                <path
                  d="M 0,100 Q 31,30 62,100 T 124,100 T 186,100 T 248,100 T 310,100 T 372,100 T 434,100 T 496,100"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />
                <text x="250" y="30" textAnchor="middle" fill="#94a3b8" fontSize="10">Original Signal</text>

                {/* Impaired Signal */}
                {activeImpairment === "attenuation" && (
                  <>
                    <path
                      d={`M 0,${100 - 50 * getAttenuationEffect()} Q 31,${130 - 70 * getAttenuationEffect()} 62,${100 - 50 * getAttenuationEffect()} T 124,${100 - 50 * getAttenuationEffect()} T 186,${100 - 50 * getAttenuationEffect()} T 248,${100 - 50 * getAttenuationEffect()} T 310,${100 - 50 * getAttenuationEffect()} T 372,${100 - 50 * getAttenuationEffect()} T 434,${100 - 50 * getAttenuationEffect()} T 496,${100 - 50 * getAttenuationEffect()}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    >
                      <animate attributeName="stroke-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </path>
                    <text x="250" y="180" textAnchor="middle" fill="#3b82f6" fontSize="11">Attenuated Signal (Weaker)</text>
                  </>
                )}

                {activeImpairment === "noise" && (
                  <>
                    <path
                      d="M 0,100 Q 31,30 62,100 T 124,100 T 186,100 T 248,100 T 310,100 T 372,100 T 434,100 T 496,100"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    {/* Noise spikes */}
                    {[...Array(15)].map((_, i) => (
                      <line
                        key={i}
                        x1={30 + i * 32}
                        y1={100 - 40 * Math.random() * (noiseLevel + 0.5)}
                        x2={30 + i * 32}
                        y2={100 + 40 * Math.random() * (noiseLevel + 0.5)}
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        opacity={0.3 + noiseLevel * 0.3}
                      >
                        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="0.5s" repeatCount="indefinite" />
                      </line>
                    ))}
                    <text x="250" y="180" textAnchor="middle" fill="#ef4444" fontSize="11">Noisy Signal (Corrupted)</text>
                  </>
                )}

                {activeImpairment === "distortion" && (
                  <>
                    <path
                      d="M 0,100 C 20,100 40,100 62,100 C 80,120 100,80 124,100 C 140,115 160,85 186,100 C 200,110 220,90 248,100 C 260,108 280,92 310,100 C 325,105 345,95 372,100 C 385,103 405,97 434,100 C 445,102 465,98 496,100"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="2"
                    />
                    <text x="250" y="180" textAnchor="middle" fill="#eab308" fontSize="11">Distorted Signal (Shape Changed)</text>
                  </>
                )}

                {activeImpairment === "interference" && (
                  <>
                    <path
                      d="M 0,100 Q 31,30 62,100 T 124,100 T 186,100 T 248,100 T 310,100 T 372,100 T 434,100 T 496,100"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    {/* Interference bursts */}
                    <rect x="150" y="40" width="40" height="120" fill="#a855f7" opacity="0.3">
                      <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1s" repeatCount="indefinite" />
                    </rect>
                    <rect x="350" y="60" width="30" height="80" fill="#a855f7" opacity="0.3">
                      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.3s" repeatCount="indefinite" />
                    </rect>
                    <text x="250" y="180" textAnchor="middle" fill="#a855f7" fontSize="11">Interference (External Bursts)</text>
                  </>
                )}
              </svg>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              <strong>Observe carefully:</strong> Each impairment affects the signal differently — compare the impaired signal with the original.
            </p>
          </div>

          {/* Impact on Data Transmission */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-4 flex items-center gap-2">
              <span>💥</span> Impact on Data Transmission
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-red-700 dark:text-red-300">Bit Errors</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">A 1 becomes a 0 or vice versa due to noise or interference.</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-blue-700 dark:text-blue-300">Reduced Speed</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">To compensate for impairments, protocols slow down transmission.</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-300">Packet Loss</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">Corrupted packets are discarded and must be retransmitted.</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg">
                <h4 className="font-bold text-purple-700 dark:text-purple-300">Connection Drops</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">Severe impairments cause complete loss of connectivity.</p>
              </div>
            </div>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-teal-700 dark:text-teal-200">
              <li><strong>Signal-to-Noise Ratio (SNR):</strong> Always measure SNR — if below 20dB, expect errors. Aim for 30dB+ for reliable communication.</li>
              <li><strong>Use a Spectrum Analyzer:</strong> When Abhronila faces interference in Ichapur, a spectrum analyzer identifies the offending frequency.</li>
              <li><strong>Follow the 100m Rule:</strong> For twisted pair Ethernet, never exceed 100m without a repeater to avoid attenuation.</li>
              <li><strong>Shielded vs Unshielded:</strong> In industrial areas with heavy EMI (like factories), STP (Shielded Twisted Pair) is worth the extra cost.</li>
              <li><strong>Fiber is Immune:</strong> Optical fiber is immune to EMI and has minimal attenuation — perfect for long distances.</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Confusing Attenuation with Noise:</strong> Attenuation weakens the signal; noise adds unwanted energy. Different problems, different solutions.</li>
              <li><strong>❌ Ignoring Environmental Factors:</strong> Susmita's network problems were caused by running cables near fluorescent lights — a common mistake!</li>
              <li><strong>❌ Thinking Digital is Immune:</strong> Digital signals are more resistant, but not immune. High noise still causes bit errors.</li>
              <li><strong>❌ Over-amplifying:</strong> Boosting a signal too much amplifies noise too — use repeaters that regenerate, not just amplify.</li>
              <li><strong>❌ Neglecting Ground Loops:</strong> Different ground potentials can create interference in shielded cables.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              <li><strong>Always calculate link budget:</strong> Account for total attenuation before installation.</li>
              <li><strong>Use proper cable management:</strong> Separate power and data cables to minimize interference.</li>
              <li><strong>Implement error correction:</strong> Use FEC (Forward Error Correction) for critical applications.</li>
              <li><strong>Test before deployment:</strong> Use a cable certifier to verify signal quality meets specifications.</li>
              <li><strong>Document noise sources:</strong> When Debangshu installs networks in Shyamnagar, he maps potential interference sources.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can define attenuation, noise, distortion, and interference
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand the difference between each impairment
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know at least one solution for each impairment
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can identify real-world examples of signal impairments
              </div>
            </div>
          </div>

          {/* 15 Q&A Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.65s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.65s]">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              ❓ 15 Questions & Answers
            </h3>
            <div className="space-y-4">
              {[
                { q: "What is attenuation?", a: "The gradual loss of signal strength as it travels through a transmission medium." },
                { q: "What causes attenuation in copper cables?", a: "Resistance in the copper wire converts some electrical energy into heat." },
                { q: "What is the unit used to measure attenuation?", a: "Decibels (dB)." },
                { q: "What is noise in signal transmission?", a: "Unwanted electrical or electromagnetic energy that corrupts the intended signal." },
                { q: "Name three types of noise.", a: "Thermal noise, shot noise, impulse noise, flicker noise, or crosstalk." },
                { q: "What is SNR and why is it important?", a: "Signal-to-Noise Ratio measures signal strength relative to noise. Higher SNR means better quality." },
                { q: "What is the difference between noise and interference?", a: "Noise is internal/random; interference comes from external sources like other devices." },
                { q: "What is distortion?", a: "A change in the shape or timing of the signal waveform during transmission." },
                { q: "What causes delay distortion?", a: "Different frequency components of a signal travel at different speeds through the medium." },
                { q: "How does a repeater help with attenuation?", a: "A repeater regenerates the signal, restoring its original strength and shape." },
                { q: "What is crosstalk?", a: "Interference caused by signals from one cable coupling into an adjacent cable." },
                { q: "Why does microwave interference affect Wi-Fi?", a: "Microwaves operate at 2.4GHz, the same frequency as many Wi-Fi networks." },
                { q: "What is the maximum distance for Cat6 Ethernet before attenuation becomes problematic?", a: "100 meters (328 feet)." },
                { q: "How does shielding protect against interference?", a: "A conductive shield absorbs electromagnetic interference before it reaches the signal conductors." },
                { q: "What is the best medium for minimizing both attenuation and interference?", a: "Optical fiber — it has very low attenuation and is immune to electromagnetic interference." },
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
          <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
            <Teacher
              note={"🎓 The '3 D's of Physical Layer Problems' are: Distance (attenuation), Distortion, and Debris (noise/interference). When students troubleshoot, have them ask: Is the signal strong enough? Is the shape correct? Is there extra noise? In Barrackpore's industrial areas, interference is often the culprit — teach them to check for nearby motors, lights, and power cables first."}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.75s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.75s]">
            <p>
              💭 <strong>Think about:</strong> In the interactive visualizer, try increasing the noise level. What happens to the signal?
              How might error correction help recover the original bits? Also try increasing distance — notice how the signal amplitude decreases.
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

export default Topic2;