import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic4: Physical Layer – transmission of raw bits, cables, signals, hardware devices
 * 
 * Purpose: Explain the lowest layer of the OSI model, its role in transmitting raw bits,
 *          the types of media, signals, and hardware involved.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Used after introducing the OSI layers to dive into the physical underpinnings
 *              of networking, essential for understanding how data actually travels.
 */

const Topic4 = () => {
  // Keyframes for fade-slide-up animation
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% {
        opacity: 0;
        transform: translateY(1.5rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Physical Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 1: Raw bits, cables, signals, and hardware devices — the foundation of all network communication
            </p>
          </section>

          {/* Real-World Analogy: Roads & Traffic */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🛣️ Real-World Analogy: Roads & Traffic
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> delivering parcels in <strong>Barrackpore</strong>. The road itself (asphalt, width, traffic lights) is like the physical layer — it defines the <strong>medium</strong> (road type), <strong>signals</strong> (traffic lights), and <strong>speed</strong> (speed limits). Without roads, no delivery happens. Similarly, without the physical layer, no bits can travel.
            </p>
            <p className="mt-2">
              The physical layer doesn't care about the content (parcels) — it just ensures bits (cars) can move from point A to point B reliably.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> What happens if the road is damaged (cable cut)? Or if the traffic light malfunctions (signal interference)? That's physical layer trouble.
            </div>
          </section>

          {/* Core Concepts: Media, Signals, Encoding */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📡 The Essentials: Media, Signals, Encoding
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔌</div>
                <h3 className="font-bold text-lg">Transmission Media</h3>
                <p className="text-sm">Guided (cables) or unguided (wireless). Examples: copper (twisted pair, coaxial), fiber optics, radio waves.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-lg">Signals</h3>
                <p className="text-sm">Analog (continuous waves) or digital (discrete voltage levels). Network interfaces convert bits to signals.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="font-bold text-lg">Encoding</h3>
                <p className="text-sm">How bits are represented on the medium (e.g., Manchester encoding, NRZ, PAM5 for Ethernet).</p>
              </div>
            </div>
          </section>

          {/* Detailed Subtopics: Cables, Connectors, Hardware */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔌 Physical Media & Hardware
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">📀 Copper Cables</h3>
                <p>Twisted pair (Cat5e, Cat6) — used for Ethernet. Coaxial cable — used for cable TV and older networks. Signals are electrical voltages.</p>
              </div>
              <div>
                <h3 className="font-bold">💡 Fiber Optics</h3>
                <p>Light pulses through glass or plastic. Offers high bandwidth, immunity to EMI, and long distances. Single-mode vs. multi-mode.</p>
              </div>
              <div>
                <h3 className="font-bold">📡 Wireless</h3>
                <p>Radio waves (Wi-Fi, Bluetooth, 5G), infrared, microwave. No physical cable, but still considered physical layer.</p>
              </div>
              <div>
                <h3 className="font-bold">🖧 Hardware Devices at Physical Layer</h3>
                <ul className="list-disc list-inside ml-4">
                  <li><span className="font-semibold">Hub:</span> Repeats signal to all ports (no intelligence).</li>
                  <li><span className="font-semibold">Repeater:</span> Amplifies or regenerates signal to extend distance.</li>
                  <li><span className="font-semibold">Network Interface Card (NIC):</span> Converts data to signals and vice versa.</li>
                  <li><span className="font-semibold">Transceivers:</span> Convert between media types (e.g., copper to fiber).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Physical Layer Encoding & Signal */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Bits to Signals (Manchester Encoding Example)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="200" viewBox="0 0 550 200" className="max-w-full h-auto">
                <rect x="20" y="10" width="500" height="100" fill="none" stroke="#aaa" strokeWidth="1" />
                <text x="30" y="30" fill="currentColor" fontSize="10">Bits: 1 0 1 1 0 0 1 0</text>
                {/* Waveform */}
                <polyline points="50,60 80,30 110,60 140,30 170,60 200,30 230,60 260,30 290,60 320,30 350,60 380,30 410,60 440,30 470,60" stroke="#ffaa44" fill="none" strokeWidth="2">
                  <animate attributeName="stroke-dasharray" values="0 10; 10 0" dur="1s" repeatCount="indefinite" />
                </polyline>
                <text x="280" y="110" fill="#ffaa44" fontSize="12">Electrical signal representing bits</text>
                <text x="30" y="170" fill="currentColor" fontSize="10">Cable (Twisted Pair)</text>
                <line x1="30" y1="180" x2="520" y2="180" stroke="gray" strokeWidth="2" />
                <circle cx="40" cy="180" r="6" fill="none" stroke="gray" strokeWidth="1" />
                <circle cx="510" cy="180" r="6" fill="none" stroke="gray" strokeWidth="1" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The physical layer encodes bits into electrical, optical, or radio signals for transmission.
            </p>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking hubs are "smart" devices like switches.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Hubs just repeat signals; they don't filter or forward intelligently.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Using the wrong cable type for the speed required.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Best practice:</span> Use Cat6 for Gigabit Ethernet, not Cat5.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Wireless doesn't have a physical layer."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Wireless uses radio waves (physical medium) with its own encoding.
              </div>
            </div>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Always check physical layer first</span> when troubleshooting: cables plugged in? Link lights on? If no, problem is likely physical.</li>
              <li><span className="font-bold">Use cable testers</span> to verify continuity and correct wiring (especially important for twisted pair).</li>
              <li><span className="font-bold">Label cables</span> — saves hours of tracing.</li>
              <li><span className="font-bold">Be mindful of maximum cable lengths:</span> Ethernet over twisted pair max 100 meters; beyond that, use repeaters or fiber.</li>
            </ul>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="font-bold">structured cabling standards</span> (TIA/EIA-568) for consistency.</li>
              <li>For long runs, use <span className="font-bold">fiber optics</span> to avoid EMI and distance limits.</li>
              <li>When using wireless, consider <span className="font-bold">interference</span> from other devices (microwaves, cordless phones).</li>
              <li>Keep cables away from power lines to reduce electromagnetic interference.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Physical layer transmits raw bits (0s and 1s)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Media: copper, fiber, wireless</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Signals: electrical, light, radio</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Devices: hubs, repeaters, NICs</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Encoding converts bits to signals</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Troubleshooting starts here: check cables, link lights</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <Teacher 
              note={"Stress the importance of physical layer in real-world troubleshooting. Show students a real Ethernet cable and explain the twisting, connectors. Mention that while physical layer is often overlooked, it's the root cause of many network problems. Use the 'link light' on NICs as an immediate diagnostic."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you plug in an Ethernet cable, the link light turns on. That's the physical layer negotiating with the switch — if it doesn't light up, the physical layer is broken.</p>
            <p className="mt-2 text-sm">Try this: Compare the speed of a Cat5 cable vs. Cat6. Why might you get only 100 Mbps on Cat5 but 1 Gbps on Cat6? The physical layer's encoding and frequency limits determine the maximum speed.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What does the physical layer transmit?</p><p>Raw bits (0s and 1s) over a physical medium.</p></div>
              <div><p className="font-bold">2. Name three types of transmission media.</p><p>Copper twisted pair, fiber optic cable, wireless radio waves.</p></div>
              <div><p className="font-bold">3. What is the role of a repeater?</p><p>Amplifies or regenerates a signal to extend the distance a signal can travel.</p></div>
              <div><p className="font-bold">4. How does a hub differ from a switch?</p><p>Hub repeats signal to all ports; switch forwards based on MAC addresses (Layer 2).</p></div>
              <div><p className="font-bold">5. What is Manchester encoding?</p><p>A method of encoding bits where a transition occurs in the middle of each bit period, used in older Ethernet.</p></div>
              <div><p className="font-bold">6. Why is fiber optic immune to electromagnetic interference?</p><p>Because it transmits light, not electrical signals.</p></div>
              <div><p className="font-bold">7. What is the maximum length for Cat6 Ethernet cable?</p><p>100 meters (328 feet) for 1 Gbps.</p></div>
              <div><p className="font-bold">8. What device converts data between different physical media (e.g., copper to fiber)?</p><p>A media converter or transceiver.</p></div>
              <div><p className="font-bold">9. What does the term "bit rate" refer to?</p><p>The number of bits transmitted per second (bps).</p></div>
              <div><p className="font-bold">10. What is the difference between single-mode and multi-mode fiber?</p><p>Single-mode uses a single light path for long distances; multi-mode uses multiple paths for shorter distances.</p></div>
              <div><p className="font-bold">11. What does a NIC do?</p><p>Network Interface Card converts data from the computer to signals suitable for the medium.</p></div>
              <div><p className="font-bold">12. How can you quickly check if a physical layer connection is working?</p><p>Look for link lights on the NIC or switch port.</p></div>
              <div><p className="font-bold">13. What are the two main types of signals used in networking?</p><p>Analog (continuous) and digital (discrete voltage levels).</p></div>
              <div><p className="font-bold">14. What is the purpose of twisting wires in twisted pair cable?</p><p>To reduce electromagnetic interference (crosstalk).</p></div>
              <div><p className="font-bold">15. Can the physical layer be wireless? Give an example.</p><p>Yes, Wi-Fi (802.11) uses radio waves as the physical medium.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic4;