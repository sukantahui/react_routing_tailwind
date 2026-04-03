import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic0: Introduction to Physical Layer
 * Prototype: Topic0()
 * Return type: JSX.Element
 * Purpose: Explain the role of the Physical Layer (Layer 1) in the OSI model,
 *          its function in raw bit transmission, and how it converts digital data
 *          into physical signals for transmission over a medium.
 * When & why used: As the foundational layer of networking, it's used whenever
 *          data needs to be physically sent from one device to another. It defines
 *          the hardware (cables, cards, frequencies) and the electrical/optical
 *          specifications.
 */

const Topic0 = () => {
  // State for interactive demonstration
  const [bitToSend, setBitToSend] = useState(null);
  const [signalType, setSignalType] = useState("voltage");

  // Cleanup effect for the bit demonstration timeout
  useEffect(() => {
    let timer;
    if (bitToSend !== null) {
      timer = setTimeout(() => setBitToSend(null), 2000);
    }
    return () => clearTimeout(timer);
  }, [bitToSend]);

  // Helper to simulate sending a bit
  const sendBit = (bit) => {
    setBitToSend(bit);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with reveal animation */}
        <div className="text-center mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            The Physical Layer (Layer 1)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where digital dreams meet physical reality — the foundation of all
            network communication.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            OSI Model • Layer 1 • Bit Transmission
          </div>
        </div>

        {/* Two-column layout: Theory + Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Detailed Conceptual Explanation */}
          <div className="space-y-6">
            {/* Role in OSI Model Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] [animation-fill-mode:forwards]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Role in the OSI Model
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The Physical Layer is the <strong className="font-semibold">lowest layer (Layer 1)</strong> of the OSI
                (Open Systems Interconnection) model. It acts as the bridge between
                the digital world of software and the analog world of hardware. While
                upper layers deal with logical communication (packets, frames, bits),
                the Physical Layer handles the{" "}
                <strong className="font-semibold">actual transmission</strong> of raw,
                unstructured bits (1s and 0s) over a physical medium.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Think of it as the{" "}
                <em className="italic">"delivery truck"</em> of networking. The data
                (packages) are packed by higher layers, but the Physical Layer is the
                truck, the road, and the traffic rules that ensure the packages get
                from point A to point B.
              </p>
            </div>

            {/* Data Transmission Role Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] [animation-fill-mode:forwards]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Data Transmission Role
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The Physical Layer defines four critical aspects of transmission:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Electrical/Optical Specification:</strong> Voltage levels,
                  signal duration, light wavelengths.
                </li>
                <li>
                  <strong>Mechanical Specification:</strong> Physical connectors
                  (RJ45, SC, LC), pin layouts, cable thickness.
                </li>
                <li>
                  <strong>Functional Specification:</strong> What each pin does
                  (transmit, receive, ground).
                </li>
                <li>
                  <strong>Procedural Specification:</strong> The sequence of events
                  for transmitting bits.
                </li>
              </ul>
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                  <span className="font-bold">Real-world example:</span> When Swadeep
                  in Barrackpore sends a message, his laptop's Ethernet port
                  (Physical Layer) converts the digital message into electrical
                  pulses (voltage changes) that travel through the Cat6 cable.
                </p>
              </div>
            </div>

            {/* Tips & Tricks Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] [animation-fill-mode:forwards]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Professional Tips & Tricks
                </h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  🔧 <strong>Cable Testing:</strong> Always use a cable certifier to
                  verify Physical Layer integrity before troubleshooting higher
                  layers.
                </li>
                <li>
                  📏 <strong>Distance Limits:</strong> For Ethernet over twisted
                  pair, never exceed 100 meters without a repeater or switch.
                </li>
                <li>
                  ⚡ <strong>Signal Integrity:</strong> Keep data cables away from
                  power lines to avoid electromagnetic interference (EMI).
                </li>
                <li>
                  🔌 <strong>Connector Care:</strong> The most common Physical Layer
                  failure is a loose or poorly crimped connector.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive SVG Visualization */}
          <div className="space-y-6">
            {/* OSI Layer Highlight SVG */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.15s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.15s]  [animation-fill-mode:forwards]">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                OSI Model: Physical Layer Highlight
              </h3>
              <div className="flex justify-center">
                <svg
                  width="280"
                  height="320"
                  viewBox="0 0 280 320"
                  className="w-full max-w-[280px]"
                >
                  {/* Layer 7: Application */}
                  <rect x="40" y="10" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="30" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 7: Application</text>

                  {/* Layer 6: Presentation */}
                  <rect x="40" y="45" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="65" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 6: Presentation</text>

                  {/* Layer 5: Session */}
                  <rect x="40" y="80" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="100" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 5: Session</text>

                  {/* Layer 4: Transport */}
                  <rect x="40" y="115" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="135" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 4: Transport</text>

                  {/* Layer 3: Network */}
                  <rect x="40" y="150" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="170" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 3: Network</text>

                  {/* Layer 2: Data Link */}
                  <rect x="40" y="185" width="200" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="140" y="205" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Layer 2: Data Link</text>

                  {/* Layer 1: Physical - HIGHLIGHTED */}
                  <rect x="40" y="220" width="200" height="30" rx="6" fill="#3b82f6" stroke="#2563eb" strokeWidth="2.5">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="140" y="240" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Layer 1: Physical (YOU ARE HERE)</text>

                  {/* Arrow pointing to Physical Layer */}
                  <polygon points="255,235 270,235 262,225" fill="#ef4444">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  </polygon>
                  <text x="260" y="210" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">↓</text>
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                The foundation of all network communication
              </p>
            </div>

            {/* Bit Transmission Simulator */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.25s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.25s] [animation-fill-mode:forwards]">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Bit Transmission Simulator
              </h3>
              <div className="flex justify-center gap-6 mb-6">
                <button
                  onClick={() => sendBit(0)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Send 0
                </button>
                <button
                  onClick={() => sendBit(1)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send 1
                </button>
              </div>

              {/* Signal Visualization */}
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <div className="text-center mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Physical Signal Representation
                </div>
                <div className="flex justify-center items-center h-24">
                  {bitToSend !== null ? (
                    <div className="animate-pulse">
                      {signalType === "voltage" && (
                        <svg width="200" height="60" viewBox="0 0 200 60">
                          <rect
                            x="0"
                            y="0"
                            width="200"
                            height="60"
                            fill="#1e293b"
                            rx="4"
                          />
                          {bitToSend === 1 ? (
                            <>
                              <line
                                x1="20"
                                y1="45"
                                x2="80"
                                y2="45"
                                stroke="#10b981"
                                strokeWidth="3"
                              />
                              <line
                                x1="80"
                                y1="45"
                                x2="80"
                                y2="15"
                                stroke="#10b981"
                                strokeWidth="3"
                              />
                              <line
                                x1="80"
                                y1="15"
                                x2="140"
                                y2="15"
                                stroke="#10b981"
                                strokeWidth="3"
                              />
                              <line
                                x1="140"
                                y1="15"
                                x2="140"
                                y2="45"
                                stroke="#10b981"
                                strokeWidth="3"
                              />
                              <line
                                x1="140"
                                y1="45"
                                x2="180"
                                y2="45"
                                stroke="#10b981"
                                strokeWidth="3"
                              />
                              <text
                                x="100"
                                y="55"
                                textAnchor="middle"
                                fill="#10b981"
                                fontSize="12"
                              >
                                HIGH Voltage (Binary 1)
                              </text>
                            </>
                          ) : (
                            <>
                              <line
                                x1="20"
                                y1="15"
                                x2="80"
                                y2="15"
                                stroke="#ef4444"
                                strokeWidth="3"
                              />
                              <line
                                x1="80"
                                y1="15"
                                x2="80"
                                y2="45"
                                stroke="#ef4444"
                                strokeWidth="3"
                              />
                              <line
                                x1="80"
                                y1="45"
                                x2="140"
                                y2="45"
                                stroke="#ef4444"
                                strokeWidth="3"
                              />
                              <line
                                x1="140"
                                y1="45"
                                x2="140"
                                y2="15"
                                stroke="#ef4444"
                                strokeWidth="3"
                              />
                              <line
                                x1="140"
                                y1="15"
                                x2="180"
                                y2="15"
                                stroke="#ef4444"
                                strokeWidth="3"
                              />
                              <text
                                x="100"
                                y="55"
                                textAnchor="middle"
                                fill="#ef4444"
                                fontSize="12"
                              >
                                LOW Voltage (Binary 0)
                              </text>
                            </>
                          )}
                        </svg>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 text-center">
                      <svg
                        width="200"
                        height="60"
                        viewBox="0 0 200 60"
                        className="mx-auto"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="200"
                          height="60"
                          fill="#1e293b"
                          rx="4"
                        />
                        <line
                          x1="10"
                          y1="30"
                          x2="190"
                          y2="30"
                          stroke="#475569"
                          strokeWidth="2"
                          strokeDasharray="4"
                        />
                        <text
                          x="100"
                          y="45"
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize="10"
                        >
                          Click a button to send a bit
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4 mt-3">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="radio"
                      value="voltage"
                      checked={signalType === "voltage"}
                      onChange={(e) => setSignalType(e.target.value)}
                      className="form-radio"
                    />
                    Voltage (Electrical)
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                <strong>Think about:</strong> How does the receiver know when a bit
                starts and ends? (Synchronization is a key Physical Layer function!)
              </p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.35s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.35s]  [animation-fill-mode:forwards]">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-3 text-red-700 dark:text-red-200">
              <li>
                <strong>❌ Confusing Physical with Data Link:</strong> Beginners often
                mix up Physical Layer (bits) with Data Link Layer (frames). Remember:
                Physical has NO structure—just raw signals.
              </li>
              <li>
                <strong>❌ Ignoring Cable Length Limits:</strong> Tuhina once ran a
                150m Ethernet cable and couldn't understand the packet loss. Always
                respect the 100m limit!
              </li>
              <li>
                <strong>❌ Overlooking Interference Sources:</strong> Abhronila
                learned the hard way that fluorescent lights can disrupt wireless
                signals. Physical Layer problems aren't always obvious.
              </li>
              <li>
                <strong>❌ Assuming "Digital" Means Perfect:</strong> Even digital
                signals degrade over distance due to attenuation and noise.
              </li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>✅</span> Best Practices
            </h3>
            <ul className="space-y-3 text-green-700 dark:text-green-200">
              <li>
                <strong>📋 Start at Layer 1:</strong> When debugging network issues,
                always verify Physical Layer first (cables, connectors, lights).
              </li>
              <li>
                <strong>📏 Measure Twice, Cut Once:</strong> Always plan cable runs
                with service loops and spare length.
              </li>
              <li>
                <strong>🔒 Use Shielded Cables in Noisy Environments:</strong> In
                Ichapur's industrial area, STP cables are worth the extra cost.
              </li>
              <li>
                <strong>📝 Document Your Physical Layout:</strong> Maintain a map of
                cable runs, connectors, and patch panels for easier troubleshooting.
              </li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-12 border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]  [animation-fill-mode:forwards]">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
            <span>📋</span> Student Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600">☑️</span> I can explain the Physical
              Layer's position in the OSI model
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600">☑️</span> I understand the difference
              between bits and physical signals
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600">☑️</span> I know the four
              specification types (electrical, mechanical, functional, procedural)
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-600">☑️</span> I can identify common
              Physical Layer issues in real networks
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]  [animation-fill-mode:forwards]">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            ❓ 15 Questions & Answers
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "What is the primary function of the Physical Layer?",
                a: "To transmit raw, unstructured bits (1s and 0s) over a physical medium, defining electrical, mechanical, functional, and procedural specifications.",
              },
              {
                q: "Which layer of the OSI model is directly above the Physical Layer?",
                a: "The Data Link Layer (Layer 2).",
              },
              {
                q: "What are the four types of specifications defined by the Physical Layer?",
                a: "Electrical, mechanical, functional, and procedural specifications.",
              },
              {
                q: "Give a real-world example of a Physical Layer component.",
                a: "An Ethernet cable (like Cat6), an RJ45 connector, a network interface card (NIC), or a Wi-Fi radio.",
              },
              {
                q: "What is the maximum recommended length for a twisted pair Ethernet cable?",
                a: "100 meters (328 feet) without a repeater or switch.",
              },
              {
                q: "What does 'bit' stand for in the context of the Physical Layer?",
                a: "Binary Digit (0 or 1), represented as a physical signal (voltage, light pulse, radio wave).",
              },
              {
                q: "How does the Physical Layer represent a binary 1 in electrical signaling?",
                a: "Usually as a high voltage level (e.g., +5V) or a presence of a signal, depending on the encoding scheme.",
              },
              {
                q: "What is the difference between the Physical Layer and the Data Link Layer?",
                a: "The Physical Layer handles raw bits with no structure, while the Data Link Layer organizes bits into frames and handles error detection.",
              },
              {
                q: "Why is the Physical Layer considered the 'foundation' of networking?",
                a: "Because all higher-layer communication depends on the reliable transmission of bits; if Layer 1 fails, no data can be exchanged.",
              },
              {
                q: "What happens if an Ethernet cable exceeds 100 meters?",
                a: "Signal attenuation and distortion increase, leading to data corruption, packet loss, and unreliable communication.",
              },
              {
                q: "Name three types of physical media used at the Physical Layer.",
                a: "Twisted pair copper cable, coaxial cable, and optical fiber.",
              },
              {
                q: "What is the role of a repeater at the Physical Layer?",
                a: "A repeater regenerates and retimes the signal to extend the transmission distance, operating purely at Layer 1.",
              },
              {
                q: "What does 'simplex' mean in Physical Layer transmission modes?",
                a: "Communication in one direction only (e.g., radio broadcast).",
              },
              {
                q: "How does electromagnetic interference (EMI) affect the Physical Layer?",
                a: "EMI introduces noise into the signal, which can flip bits or corrupt data, especially in unshielded copper cables.",
              },
              {
                q: "What is the significance of the Physical Layer in wireless networks?",
                a: "It defines the frequency bands, modulation techniques, and transmission power for radio waves.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <summary className="font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {idx + 1}. {item.q}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-400 pl-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.55s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.55s]  [animation-fill-mode:forwards]">
          <Teacher
            note={
              "💡 The Physical Layer is the most overlooked yet most critical layer. When Susmita's network fails in Shyamnagar, 80% of the time it's a Physical Layer issue—a loose cable, a faulty port, or interference. Always teach students to 'check the physical first' before diving into complex IP configurations. Remember: No Layer 1, no communication at all!"
            }
          />
        </div>

        {/* Hint Section for further thinking */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] [animation-fill-mode:forwards]">
          <p>
            💭 <strong>Observe carefully:</strong> In the bit simulator, the signal
            changes instantly. But in reality, signals have rise/fall times and can
            reflect off cable ends.{" "}
            <em>Try changing the cable length in your mind—what happens to the signal?</em>
          </p>
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

export default Topic0;