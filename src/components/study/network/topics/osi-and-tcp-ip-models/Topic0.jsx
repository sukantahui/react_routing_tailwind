import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic0: Introduction to Layered Architecture
 * 
 * Purpose: Explain why networking needs layers, how layering reduces complexity,
 *          and the benefits of modular design.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Used as the foundational lesson for understanding network models.
 */

const Topic0 = () => {
  // Keyframes for fade-slide-up animation (inline style to respect no external CSS)
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
        {/* Main container - stacked sections */}
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Section 1: Hero / Title */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Layered Architecture
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Why networking needs layers — taming complexity through modular design
            </p>
          </section>

          {/* Section 2: Real-World Analogy (Postal System) - Staggered delay */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📬 Real-World Analogy: The Postal System
            </h2>
            <p className="mb-3">
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to send a handwritten letter to <strong>Tuhina</strong> in <strong>Shyamnagar</strong>.
              He doesn't need to know how the postal truck routes, sorts, or physically transports the letter. He simply:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4 mb-4">
              <li>Writes the message</li>
              <li>Puts it in an envelope with Tuhina's address</li>
              <li>Drops it in a mailbox</li>
            </ol>
            <p>
              The postal service handles the rest through <span className="font-semibold text-blue-600 dark:text-blue-400">layered steps</span>: collection, sorting, transportation, final delivery.
              Each layer works independently, with clear interfaces (address format, mailboxes). This is exactly how network layers operate — abstracting complexity.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> If Swadeep had to drive the truck himself, what would happen? How does breaking the task into layers help?
            </div>
          </section>

          {/* Section 3: Why Networking Needs Layers (Core Explanation) */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🧩 Complexity Reduction: Why Layers?
            </h2>
            <p className="mb-4">
              Networking involves countless details: physical cables, electrical signals, addressing, error recovery, routing, application data formats. Without layers, every piece of software would need to handle <strong className="text-red-600 dark:text-red-400">everything</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><span className="font-bold">Modularity:</span> Each layer solves one specific problem.</li>
              <li><span className="font-bold">Interoperability:</span> Different vendors can build products that work together.</li>
              <li><span className="font-bold">Easier Troubleshooting:</span> Problems can be isolated to a layer (e.g., cable issue vs. wrong IP address).</li>
              <li><span className="font-bold">Reusability:</span> Higher layers reuse lower-layer services (e.g., HTTP works over Wi-Fi, Ethernet, fiber).</li>
            </ul>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="italic">"Layers break a big problem into smaller, manageable pieces — just like building a house has foundation, framing, electrical, plumbing."</p>
            </div>
          </section>

          {/* Section 4: Modular Design Benefits */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔧 Benefits of Modular Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <span className="text-3xl">🔄</span>
                <h3 className="font-bold text-lg mt-1">Independence</h3>
                <p className="text-sm">Change one layer without affecting others (e.g., upgrade Wi-Fi to fiber, apps keep working).</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <span className="text-3xl">🤝</span>
                <h3 className="font-bold text-lg mt-1">Standardization</h3>
                <p className="text-sm">Clear rules (protocols) allow devices from different companies to communicate.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <span className="text-3xl">🐞</span>
                <h3 className="font-bold text-lg mt-1">Simplified Debugging</h3>
                <p className="text-sm">If a website loads slowly, you check physical link, then routing, then server response — stepwise.</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <span className="text-3xl">⚡</span>
                <h3 className="font-bold text-lg mt-1">Innovation Friendly</h3>
                <p className="text-sm">New protocols can be introduced at one layer (e.g., HTTP/3) without rewriting the entire stack.</p>
              </div>
            </div>
          </section>

          {/* Section 5: SVG Illustration - Layered Communication */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: How Layers Communicate
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="320" viewBox="0 0 500 320" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradLayer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Layer boxes */}
                <rect x="100" y="20" width="300" height="45" rx="8" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Application Layer</text>

                <rect x="100" y="85" width="300" height="45" rx="8" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Transport Layer</text>

                <rect x="100" y="150" width="300" height="45" rx="8" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Network Layer</text>

                <rect x="100" y="215" width="300" height="45" rx="8" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="245" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Data Link Layer</text>

                <rect x="100" y="280" width="300" height="35" rx="8" fill="url(#gradLayer)" className="transition-all duration-300 hover:opacity-90" />
                <text x="250" y="303" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Physical Layer</text>

                {/* Animated arrows (simple animation) */}
                <line x1="250" y1="65" x2="250" y2="85" stroke="#ffaa44" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;6" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="130" x2="250" y2="150" stroke="#ffaa44" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;6" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="195" x2="250" y2="215" stroke="#ffaa44" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;6" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="260" x2="250" y2="280" stroke="#ffaa44" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" values="0;6" dur="1s" repeatCount="indefinite" />
                </line>
                <text x="280" y="45" fill="#ffaa44" fontSize="10">Data ↓</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each layer provides services to the layer above, using the layer below. This <span className="font-mono">abstraction</span> hides complexity.
            </p>
          </section>

          {/* Section 6: Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Think in layers</span> when troubleshooting: “Is it physical? Is it IP routing? Is the application misconfigured?”</li>
              <li><span className="font-bold">Use mental analogies</span> like postal or restaurant kitchen to explain layering to others.</li>
              <li><span className="font-bold">Draw stack diagrams</span> for every network problem – it clarifies the boundaries.</li>
              <li><span className="font-bold">Remember: each layer adds headers/trailers</span> (encapsulation). You'll see this in later topics.</li>
            </ul>
          </section>

          {/* Section 7: Common Mistakes & Misconceptions */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking layers are physical components (they are logical concepts). 
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> A router operates at multiple layers (Network and below), but the model is conceptual.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing more layers always increase latency.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Layers add headers, but modularity often makes development faster and more reliable.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "The OSI model is exactly how the internet works."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> The internet uses TCP/IP model, which is inspired by OSI but simplified.
              </div>
            </div>
          </section>

          {/* Section 8: Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices for Learning
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Always <span className="font-bold">map protocols to layers</span> (e.g., HTTP is application layer, IP is network layer).</li>
              <li>Use <span className="font-bold">Wireshark</span> to see real headers — it makes layers concrete.</li>
              <li>When studying new tech, ask: <span className="italic">"Which layer does this operate at?"</span></li>
              <li>Keep a layered model diagram pinned — mental reference.</li>
            </ul>
          </section>

          {/* Section 9: Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layers reduce complexity</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Each layer has a specific role</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Interfaces between layers (SAP)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Modularity = easier upgrades</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layering enables interoperability</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Troubleshooting is layer-by-layer</div>
            </div>
          </section>

          {/* Section 10: Teacher's Note (Component) */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <Teacher 
              note={"Start with the postal analogy — students immediately grasp why we don't mix concerns. Emphasize that each layer only talks to adjacent layers using well-defined rules (protocols). For the curious: later we'll map OSI layers to real protocols. Keep the tone collaborative."}
            />
          </div>

          {/* Section 11: Hint (Encourages thinking) */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Think about…</span></p>
            <p className="mt-1">If you were designing a new application, how would layering help you reuse existing protocols like TCP/IP instead of reinventing data transmission?</p>
            <p className="mt-2 text-sm">Observe carefully: In the SVG, why does each layer only interact with the one directly above and below? That’s the key to modularity.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic0;