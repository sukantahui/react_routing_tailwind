import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic1: Analog vs Digital Signals
 * Prototype: Topic1()
 * Return type: JSX.Element
 * Purpose: Explain the fundamental differences between analog (continuous) and digital (discrete) signals,
 *          their waveform characteristics (amplitude, frequency, phase), and the advantages/limitations of each.
 * When & why used: This topic is essential for understanding how data is encoded for transmission
 *          over physical media. It bridges the gap between the digital world of computers and the
 *          analog nature of real-world transmission media (cables, air, fiber).
 */

const Topic1 = () => {
  // State for interactive signal comparison
  const [activeSignal, setActiveSignal] = useState("both"); // "analog", "digital", "both"
  const [frequency, setFrequency] = useState(1); // 1 = low, 2 = medium, 3 = high

  // Helper to get frequency multiplier
  const getFreqMultiplier = () => {
    switch(frequency) {
      case 1: return 1;
      case 2: return 1.8;
      case 3: return 2.5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Analog vs Digital Signals
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the language of transmission — from continuous waves to discrete pulses.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            Signal Types • Waveforms • Characteristics
          </div>
        </div>

        {/* Main Content - Sequential divs (not side by side) */}
        <div className="space-y-8">
          
          {/* Analog Signals Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M5 16h14" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analog Signals: Continuous Waveforms</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              An <strong className="font-semibold">analog signal</strong> is a continuous waveform that varies smoothly over time. 
              It represents information by mimicking the original physical quantity. Think of it like a dimmer switch for a light bulb 
              — you can set it to any brightness level between 0% and 100%, not just "on" or "off".
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In the physical world, most natural phenomena are analog: sound waves, light intensity, temperature, and pressure. 
              When Susmita speaks into a traditional telephone in Barrackpore, her voice creates an analog electrical signal that 
              perfectly mirrors the sound wave's shape.
            </p>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                <span className="font-bold">Real-world example:</span> Vinyl records, analog cassette tapes, and traditional AM/FM radio 
                all use analog signals to store and transmit information.
              </p>
            </div>
          </div>

          {/* Digital Signals Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4v16M16 4v16" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Digital Signals: Discrete Pulses</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A <strong className="font-semibold">digital signal</strong> is discrete and represents information using distinct values 
              — typically two levels: HIGH (1) and LOW (0). Think of it like a light switch that can only be completely ON or completely OFF, 
              with no in-between states.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Computers and modern communication systems use digital signals because they are more resistant to noise and degradation. 
              When Debangshu sends a text message from his phone in Naihati, the message is converted into a sequence of 1s and 0s 
              before transmission.
            </p>
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                <span className="font-bold">Real-world example:</span> USB connections, Ethernet, HDMI, fiber optics, and all modern 
                computer communication use digital signals.
              </p>
            </div>
          </div>

          {/* Waveform Characteristics Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Waveform Characteristics</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Any signal, whether analog or digital, can be described by three key characteristics:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">Amplitude</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">The height/strength of the signal. Higher amplitude = stronger signal (like louder volume).</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <h3 className="font-bold text-green-800 dark:text-green-300">Frequency</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Number of cycles per second (Hz). Higher frequency = more cycles in same time.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                <h3 className="font-bold text-purple-800 dark:text-purple-300">Phase</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Position of the waveform relative to a reference point (measured in degrees).</p>
              </div>
            </div>
          </div>

          {/* Interactive SVG Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Signal Comparison Visualizer
            </h3>
            
            {/* Signal Type Toggle */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveSignal("analog")}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
                  activeSignal === "analog" 
                    ? "bg-purple-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                Analog Only
              </button>
              <button
                onClick={() => setActiveSignal("digital")}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
                  activeSignal === "digital" 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                Digital Only
              </button>
              <button
                onClick={() => setActiveSignal("both")}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105",
                  activeSignal === "both" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                Both Signals
              </button>
            </div>

            {/* Frequency Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                Frequency: {frequency === 1 ? "Low" : frequency === 2 ? "Medium" : "High"}
              </label>
              <input
                type="range"
                min="1"
                max="3"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* SVG Waveform */}
            <div className="flex justify-center">
              <svg width="500" height="250" viewBox="0 0 500 250" className="w-full max-w-[500px]">
                {/* Grid lines */}
                <line x1="0" y1="125" x2="500" y2="125" stroke="#64748b" strokeWidth="1" strokeDasharray="4" opacity="0.5"/>
                <line x1="0" y1="50" x2="500" y2="50" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2" opacity="0.3"/>
                <line x1="0" y1="200" x2="500" y2="200" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2" opacity="0.3"/>
                
                {/* Y-axis labels */}
                <text x="10" y="120" fill="#64748b" fontSize="10">0</text>
                <text x="10" y="45" fill="#64748b" fontSize="10">+A</text>
                <text x="10" y="205" fill="#64748b" fontSize="10">-A</text>
                
                {/* Analog Signal (Sine Wave) */}
                {(activeSignal === "analog" || activeSignal === "both") && (
                  <>
                    <path
                      d={`
                        M 0,125 
                        Q 31,${125 - 75 * getFreqMultiplier()} 62,125 
                        T 124,125 
                        T 186,125 
                        T 248,125 
                        T 310,125 
                        T 372,125 
                        T 434,125 
                        T 496,125
                      `}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                    >
                      <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                    </path>
                    <text x="250" y="35" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Analog (Continuous)</text>
                  </>
                )}
                
                {/* Digital Signal (Square Wave) */}
                {(activeSignal === "digital" || activeSignal === "both") && (
                  <>
                    <polyline
                      points="0,125 31,125 31,50 93,50 93,125 155,125 155,50 217,50 217,125 279,125 279,50 341,50 341,125 403,125 403,50 465,50 465,125 500,125"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinejoin="miter"
                    >
                      <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                    </polyline>
                    <text x="250" y="230" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Digital (Discrete)</text>
                  </>
                )}
                
                {/* Legend */}
                {(activeSignal === "both") && (
                  <g>
                    <rect x="350" y="10" width="12" height="12" fill="#8b5cf6" rx="2"/>
                    <text x="368" y="20" fill="#8b5cf6" fontSize="10">Analog</text>
                    <rect x="350" y="30" width="12" height="12" fill="#10b981" rx="2"/>
                    <text x="368" y="40" fill="#10b981" fontSize="10">Digital</text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              <strong>Observe carefully:</strong> Analog signals change smoothly (continuous), while digital signals jump between discrete levels.
            </p>
          </div>

          {/* Advantages and Limitations Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">✓ Advantages of Digital Signals</h3>
              <ul className="space-y-2 text-green-700 dark:text-green-200">
                <li>• More resistant to noise and interference</li>
                <li>• Can be regenerated perfectly (no degradation)</li>
                <li>• Easier to store, process, and compress</li>
                <li>• Supports error detection and correction</li>
                <li>• Can transmit multiple signals over same channel</li>
              </ul>
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-4 mb-2">✗ Limitations of Digital Signals</h3>
              <ul className="space-y-1 text-red-700 dark:text-red-200">
                <li>• Requires more bandwidth than analog</li>
                <li>• Needs analog-to-digital conversion for real-world inputs</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4">✓ Advantages of Analog Signals</h3>
              <ul className="space-y-2 text-purple-700 dark:text-purple-200">
                <li>• Uses less bandwidth</li>
                <li>• Directly represents real-world phenomena</li>
                <li>• No conversion needed for natural signals</li>
                <li>• Simpler hardware for basic applications</li>
              </ul>
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-4 mb-2">✗ Limitations of Analog Signals</h3>
              <ul className="space-y-1 text-red-700 dark:text-red-200">
                <li>• Susceptible to noise and degradation</li>
                <li>• Signal loss cannot be recovered</li>
                <li>• Difficult to store and process</li>
                <li>• Less secure (easier to intercept)</li>
              </ul>
            </div>
          </div>

          {/* Professional Tips & Tricks */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center gap-2">
              <span>💡</span> Professional Tips & Tricks
            </h3>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-200">
              <li><strong>Signal Integrity:</strong> Always use shielded cables in electrically noisy environments (like near factories in Ichapur).</li>
              <li><strong>Sampling Rate:</strong> When converting analog to digital, remember Nyquist's Theorem: sample at least twice the highest frequency.</li>
              <li><strong>Debugging:</strong> Use an oscilloscope to visualize signals — it's the best way to identify signal impairments.</li>
              <li><strong>Bandwidth Planning:</strong> Digital signals require about 10x more bandwidth than equivalent analog signals.</li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              <li><strong>❌ Confusing "digital" with "binary":</strong> Digital signals can have more than 2 levels (e.g., PAM4 has 4 levels).</li>
              <li><strong>❌ Assuming analog is obsolete:</strong> Many sensors, audio equipment, and radio systems still use analog.</li>
              <li><strong>❌ Ignoring quantization error:</strong> When Tuhina samples analog signals, she must consider that digital conversion loses some information.</li>
              <li><strong>❌ Mixing signal types without conversion:</strong> You cannot directly connect analog output to digital input — need ADC/DAC.</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-2 text-blue-700 dark:text-blue-200">
              <li><strong>Choose signal type based on distance:</strong> Digital for long distances (fiber), analog for short-range sensor connections.</li>
              <li><strong>Use differential signaling</strong> (like in USB and Ethernet) for better noise immunity.</li>
              <li><strong>Always include proper termination</strong> to prevent signal reflections in high-speed digital lines.</li>
              <li><strong>Document signal levels and timing</strong> requirements for all interfaces in your project.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
            <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>📋</span> Student Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can explain the difference between analog and digital signals
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I understand amplitude, frequency, and phase
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I know at least 2 advantages of each signal type
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">☑️</span> I can identify real-world examples of both signal types
              </div>
            </div>
          </div>

          {/* 15 Q&A Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s]">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              ❓ 15 Questions & Answers
            </h3>
            <div className="space-y-4">
              {[
                { q: "What is an analog signal?", a: "A continuous signal that varies smoothly over time and can take any value within a range." },
                { q: "What is a digital signal?", a: "A discrete signal that represents information using distinct values (typically 0 and 1)." },
                { q: "What are the three main characteristics of any waveform?", a: "Amplitude (strength), frequency (cycles per second), and phase (position relative to reference)." },
                { q: "What is amplitude in signal terminology?", a: "The maximum displacement or strength of the signal from its zero point." },
                { q: "What unit is used to measure frequency?", a: "Hertz (Hz), representing cycles per second." },
                { q: "What is the main advantage of digital signals over analog?", a: "Digital signals are more resistant to noise and can be regenerated perfectly without degradation." },
                { q: "What is a real-world example of an analog system?", a: "Traditional vinyl record players or analog AM/FM radio." },
                { q: "What is a real-world example of a digital system?", a: "Ethernet networks, USB connections, or HDMI cables." },
                { q: "What does ADC stand for?", a: "Analog-to-Digital Converter — converts analog signals to digital." },
                { q: "What does DAC stand for?", a: "Digital-to-Analog Converter — converts digital signals to analog." },
                { q: "Why do computers use digital signals?", a: "Because they are more reliable, less affected by noise, and easier to process and store." },
                { q: "What happens when you increase the amplitude of a signal?", a: "The signal becomes stronger (e.g., louder sound or brighter light)." },
                { q: "How does frequency affect a signal?", a: "Higher frequency means more cycles per second, allowing more data to be transmitted." },
                { q: "What is phase shift?", a: "A delay or advance in the signal's position relative to a reference waveform." },
                { q: "Can digital signals have more than two levels?", a: "Yes! For example, PAM4 uses 4 voltage levels to transmit 2 bits per symbol." },
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
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s]">
            <Teacher
              note={"🎓 When teaching analog vs digital, use the light dimmer (analog) vs light switch (digital) analogy — students instantly grasp the difference. Remind them that while digital dominates computing, the physical world is analog, so conversion is always needed. Have Abhronila calculate the minimum sampling rate for a 4kHz audio signal (answer: 8kHz per Nyquist)."}
            />
          </div>

          {/* Hint Section */}
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_1.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.2s]">
            <p>
              💭 <strong>Think about:</strong> If you record your voice digitally, you're converting a continuous analog sound wave into discrete samples.
              What happens if you sample too slowly? (Answer: High frequencies get lost — that's why CDs sample at 44.1kHz for 20kHz audible range.)
            </p>
          </div>
        </div>
      </div>

      {/* Custom keyframes for fade + slide-up animation */}
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

export default Topic1;