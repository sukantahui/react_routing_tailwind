import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic2: OSI Model Overview
 * 
 * Purpose: Introduce the OSI model, its history, purpose, and why it was standardized by ISO.
 *          Build the foundation for understanding the 7-layer framework.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Used to give historical context and conceptual framework before diving into each layer.
 */

const Topic2 = () => {
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
              OSI Model Overview
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              History, purpose, and standardization by ISO — the blueprint of networking
            </p>
          </section>

          {/* Real-World Analogy: Standardization in Daily Life */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏭 Real-World Analogy: Standardization
            </h2>
            <p className="mb-3">
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to buy a light bulb. He doesn't need to worry about the brand — every bulb fits because of <span className="font-semibold">standardized sockets</span> (Edison screw base). That standard was created by an organization (like ISO) to ensure compatibility.
            </p>
            <p className="mb-3">
              Similarly, before OSI, every company had its own networking protocols (IBM's SNA, DEC's DECnet, etc.), making it impossible for different systems to talk. <strong>ISO stepped in to create a common reference model</strong> — a blueprint that would allow any two systems to communicate, regardless of manufacturer.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> What if every country had its own electrical plug shape? Travel would be a nightmare. OSI aimed to prevent that in networking.
            </div>
          </section>

          {/* History & Purpose */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📜 History & Purpose
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">📅 The Birth (Late 1970s)</h3>
                <p>ISO (International Organization for Standardization) recognized the chaos of proprietary networking protocols. They created the <strong>Open Systems Interconnection (OSI) reference model</strong> to provide a universal language for network communication.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">🎯 Purpose</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><span className="font-semibold">Standardization:</span> Ensure products from different vendors could interoperate.</li>
                  <li><span className="font-semibold">Modularity:</span> Break networking into manageable layers (we saw this in Topic0).</li>
                  <li><span className="font-semibold">Education:</span> Provide a teaching tool that remains relevant today.</li>
                  <li><span className="font-semibold">Framework:</span> Guide developers to build network software in a structured way.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg">🏛️ Standardization by ISO</h3>
                <p>ISO released the OSI model as an international standard (ISO/IEC 7498-1). It was intended to be the foundation for all networking, but in practice, the simpler TCP/IP model became dominant. However, OSI remains the primary reference model taught in networking courses.</p>
              </div>
            </div>
          </section>

          {/* The 7-Layer Overview */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🧩 The 7 Layers (At a Glance)
            </h2>
            <p className="mb-4">The OSI model organizes networking into seven layers, each with specific responsibilities. From bottom to top:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { layer: 1, name: "Physical", desc: "Bits, cables, signals" },
                { layer: 2, name: "Data Link", desc: "Frames, MAC, error detection" },
                { layer: 3, name: "Network", desc: "Packets, routing, IP" },
                { layer: 4, name: "Transport", desc: "Segments, reliability" },
                { layer: 5, name: "Session", desc: "Session management" },
                { layer: 6, name: "Presentation", desc: "Translation, encryption" },
                { layer: 7, name: "Application", desc: "User services (HTTP, FTP)" }
              ].map(l => (
                <div key={l.layer} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-md">
                  <span className="font-mono font-bold text-lg">Layer {l.layer}</span>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{l.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm italic">(We'll explore each layer in detail in upcoming topics.)</p>
          </section>

          {/* SVG Illustration: OSI Model Layers with Timeline */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: OSI Model Layers
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="380" viewBox="0 0 500 380" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradLayer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Layer 7 */}
                <rect x="100" y="20" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Application (Layer 7)</text>

                {/* Layer 6 */}
                <rect x="100" y="70" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Presentation (Layer 6)</text>

                {/* Layer 5 */}
                <rect x="100" y="120" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="150" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Session (Layer 5)</text>

                {/* Layer 4 */}
                <rect x="100" y="170" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Transport (Layer 4)</text>

                {/* Layer 3 */}
                <rect x="100" y="220" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="250" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Network (Layer 3)</text>

                {/* Layer 2 */}
                <rect x="100" y="270" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="300" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Data Link (Layer 2)</text>

                {/* Layer 1 */}
                <rect x="100" y="320" width="300" height="45" rx="6" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="350" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Physical (Layer 1)</text>

                {/* Animated vertical line to indicate data flow */}
                <line x1="250" y1="20" x2="250" y2="365" stroke="#ffaa44" strokeWidth="2" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="2s" repeatCount="indefinite" />
                </line>
                <text x="270" y="190" fill="#ffaa44" fontSize="10">Data flow</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Data travels down the layers on sending side, across the physical medium, and up the layers on receiving side.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Mnemonics</span> to remember the 7 layers (from bottom up): <strong>Please Do Not Throw Sausage Pizza Away</strong> (Physical, Data Link, Network, Transport, Session, Presentation, Application).</li>
              <li><span className="font-bold">OSI is a reference model</span> — it's not implemented directly, but every networking concept maps to it.</li>
              <li><span className="font-bold">When troubleshooting</span>, think: "Which layer is the problem?" (e.g., no link light → Physical; can't ping → Network).</li>
              <li><span className="font-bold">ISO standardized OSI</span>, but the actual protocol suite (OSI protocols) was complex and rarely used; the model outlived the protocols.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking the OSI model is exactly how the internet works.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> The internet uses the TCP/IP model, which is loosely based on OSI but simplified.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing that "OSI" is a protocol suite.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> OSI is a reference model; there are OSI protocols, but they are not widely used.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The layers are physical components."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> They are logical abstractions that help design and understand networks.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices for Learning
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Always <span className="font-bold">visualize the layer stack</span> when studying new protocols.</li>
              <li>Use <span className="font-bold">Wireshark</span> to capture packets and see which layers are present (Ethernet frame, IP packet, TCP segment).</li>
              <li><span className="font-bold">Create flashcards</span> for each layer's role and example protocols.</li>
              <li><span className="font-bold">Relate OSI layers to real-world tasks</span> (e.g., a web request: application (HTTP), transport (TCP), network (IP), data link (Ethernet), physical (cable)).</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI = Open Systems Interconnection</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Standardized by ISO in late 1970s</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> 7 layers: Physical to Application</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Purpose: interoperability, modularity</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> It's a reference model, not a protocol</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Foundation for understanding networking</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <Teacher 
              note={"Emphasize that OSI is a 'conceptual' model. Many students think it's implemented directly. Use the analogy of building codes: they don't build the house, but they provide a framework that ensures safety and interoperability. Also, encourage the mnemonic 'Please Do Not Throw Sausage Pizza Away' — it sticks."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Think about…</span></p>
            <p className="mt-1">Why do you think the OSI model has 7 layers instead of 3 or 10? What problems would arise if there were too few or too many layers?</p>
            <p className="mt-2 text-sm">Observe carefully in the SVG: The vertical line indicates data flowing through all layers. Each layer only talks to its immediate neighbors. This is key to understanding encapsulation (coming in Topic11).</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div>
                <p className="font-bold">1. What does OSI stand for?</p>
                <p className="text-gray-700 dark:text-gray-300">Open Systems Interconnection.</p>
              </div>
              <div>
                <p className="font-bold">2. Which organization standardized the OSI model?</p>
                <p className="text-gray-700 dark:text-gray-300">ISO (International Organization for Standardization).</p>
              </div>
              <div>
                <p className="font-bold">3. In which decade was the OSI model developed?</p>
                <p className="text-gray-700 dark:text-gray-300">Late 1970s.</p>
              </div>
              <div>
                <p className="font-bold">4. How many layers does the OSI model have?</p>
                <p className="text-gray-700 dark:text-gray-300">Seven.</p>
              </div>
              <div>
                <p className="font-bold">5. Name the seven layers from bottom to top.</p>
                <p className="text-gray-700 dark:text-gray-300">Physical, Data Link, Network, Transport, Session, Presentation, Application.</p>
              </div>
              <div>
                <p className="font-bold">6. What is the primary purpose of the OSI model?</p>
                <p className="text-gray-700 dark:text-gray-300">To provide a standard framework for network communication, ensuring interoperability between different vendors.</p>
              </div>
              <div>
                <p className="font-bold">7. Is the OSI model a protocol or a reference model?</p>
                <p className="text-gray-700 dark:text-gray-300">It is a reference model (a conceptual framework).</p>
              </div>
              <div>
                <p className="font-bold">8. What does ISO stand for?</p>
                <p className="text-gray-700 dark:text-gray-300">International Organization for Standardization.</p>
              </div>
              <div>
                <p className="font-bold">9. Why was OSI created?</p>
                <p className="text-gray-700 dark:text-gray-300">To solve the problem of incompatible proprietary protocols and allow different systems to communicate.</p>
              </div>
              <div>
                <p className="font-bold">10. Which layer handles physical transmission of bits?</p>
                <p className="text-gray-700 dark:text-gray-300">Layer 1 – Physical.</p>
              </div>
              <div>
                <p className="font-bold">11. Which layer is responsible for routing and logical addressing?</p>
                <p className="text-gray-700 dark:text-gray-300">Layer 3 – Network.</p>
              </div>
              <div>
                <p className="font-bold">12. What is a common mnemonic to remember the layers (from bottom up)?</p>
                <p className="text-gray-700 dark:text-gray-300">"Please Do Not Throw Sausage Pizza Away" (Physical, Data Link, Network, Transport, Session, Presentation, Application).</p>
              </div>
              <div>
                <p className="font-bold">13. How does the OSI model help in troubleshooting?</p>
                <p className="text-gray-700 dark:text-gray-300">It allows isolating problems to a specific layer (e.g., physical link down vs. routing issue).</p>
              </div>
              <div>
                <p className="font-bold">14. Is the OSI model widely implemented in real networks?</p>
                <p className="text-gray-700 dark:text-gray-300">No, the TCP/IP model is more commonly implemented, but OSI remains a valuable teaching tool.</p>
              </div>
              <div>
                <p className="font-bold">15. What is the relationship between OSI and TCP/IP?</p>
                <p className="text-gray-700 dark:text-gray-300">TCP/IP is a simpler, practical model that loosely corresponds to the OSI layers (e.g., TCP/IP combines OSI layers 5-7 into Application).</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic2;