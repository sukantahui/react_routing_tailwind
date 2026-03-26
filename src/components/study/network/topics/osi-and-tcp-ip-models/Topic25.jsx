import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic25: Limitations and Criticism of OSI Model
 * 
 * Purpose: Discuss the drawbacks of the OSI model, why it wasn't fully adopted,
 *          and its theoretical vs practical gap compared to TCP/IP.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: After studying both models, students need to understand why OSI
 *              remained a reference while TCP/IP became the actual internet standard.
 */

const Topic25 = () => {
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
              Limitations of the OSI Model
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Theoretical vs practical gap – why the perfect blueprint wasn't built
            </p>
          </section>

          {/* Real-World Analogy: The Perfect but Unbuildable House */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏠 Real-World Analogy: The Perfect but Unbuildable House
            </h2>
            <p>
              Imagine an architect creates a <strong>perfect blueprint</strong> for a house with 7 distinct layers: foundation, framing, electrical, plumbing, insulation, drywall, finishing. Each layer is precisely defined.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>But the blueprint is so detailed that it takes years to finalize.</li>
              <li>Meanwhile, a builder starts constructing using a simpler 4-layer plan (foundation + framing together, electrical + plumbing together).</li>
              <li>The simple house is built, works, and everyone starts using it.</li>
              <li>The perfect blueprint remains a reference – admired but never fully implemented.</li>
            </ul>
            <p>
              That's the OSI model: theoretically elegant, but too slow and complex to compete with the practical TCP/IP.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why does the simple house win? Because it gets built first and works well enough.
            </div>
          </section>

          {/* Core Limitations */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔴 Key Limitations of the OSI Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">📜 Overly Complex</h3>
                <p>7 layers is more than necessary. Many functions (session, presentation) are rarely implemented separately.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">⏱️ Slow Standardization</h3>
                <p>ISO committees took years to finalize the model. By then, TCP/IP was already deployed and working.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">🔀 Layers Don't Match Reality</h3>
                <p>Many real protocols span multiple OSI layers (e.g., ARP, TLS). Forcing them into a single layer is artificial.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">🚫 Session & Presentation Layers</h3>
                <p>No widely used protocols implement these as separate layers. Their functions are absorbed by applications or transport.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">🏛️ Government-Backed but Not Market-Driven</h3>
                <p>OSI was promoted by governments and standards bodies; TCP/IP grew from grassroots research and vendor adoption.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h3 className="font-bold">💾 Heavy Overhead</h3>
                <p>Strict layering can lead to duplication of functions (e.g., error recovery at multiple layers) and more header overhead.</p>
              </div>
            </div>
          </section>

          {/* Theoretical vs Practical Gap */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📚 Theoretical Model vs. Practical Implementation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">What OSI Got Right (Theory)</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Layering concept – essential for modularity</li>
                  <li>Clear separation of concerns</li>
                  <li>Excellent teaching framework</li>
                  <li>Influenced TCP/IP design</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Where OSI Failed (Practice)</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Too many layers for efficient implementation</li>
                  <li>Standardization too slow</li>
                  <li>No killer app – TCP/IP already dominated</li>
                  <li>Complexity discouraged adoption</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-center text-sm">
              The result: OSI remains a <span className="font-bold">reference model</span>; TCP/IP is the <span className="font-bold">working model</span>.
            </p>
          </section>

          {/* Why TCP/IP Won */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🏆 Why TCP/IP Won While OSI Stalled
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><span className="font-bold">Practical over perfect:</span> TCP/IP was built to solve real problems (ARPANET), then standardized after success.</li>
              <li><span className="font-bold">Open and free:</span> Anyone could implement TCP/IP; OSI protocols required licensing.</li>
              <li><span className="font-bold">Simplicity:</span> 4 layers instead of 7 made implementation easier and faster.</li>
              <li><span className="font-bold">Early adoption:</span> Universities and researchers embraced TCP/IP, creating network effects.</li>
              <li><span className="font-bold">Internet explosion:</span> When the web emerged, TCP/IP was already there.</li>
            </ul>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Key insight:</span> The "best" technical solution doesn't always win; timing, simplicity, and adoption matter more.
            </div>
          </section>

          {/* SVG Illustration: OSI's Unused Layers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: OSI Layers – Where They Stand Today
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="350" viewBox="0 0 500 350" className="max-w-full h-auto">
                <rect x="150" y="20" width="200" height="35" fill="#3b82f6" rx="3" />
                <text x="250" y="42" textAnchor="middle" fill="white" fontSize="12">Application (7)</text>
                <text x="360" y="42" fill="#ffaa44" fontSize="10">✅ Widely used</text>
                
                <rect x="150" y="60" width="200" height="35" fill="#f59e0b" rx="3" />
                <text x="250" y="82" textAnchor="middle" fill="white" fontSize="12">Presentation (6)</text>
                <text x="360" y="82" fill="#ffaa44" fontSize="10">⚠️ Merged into apps/TLS</text>
                
                <rect x="150" y="100" width="200" height="35" fill="#f59e0b" rx="3" />
                <text x="250" y="122" textAnchor="middle" fill="white" fontSize="12">Session (5)</text>
                <text x="360" y="122" fill="#ffaa44" fontSize="10">⚠️ Merged into apps</text>
                
                <rect x="150" y="140" width="200" height="35" fill="#3b82f6" rx="3" />
                <text x="250" y="162" textAnchor="middle" fill="white" fontSize="12">Transport (4)</text>
                <text x="360" y="162" fill="#ffaa44" fontSize="10">✅ Widely used (TCP/UDP)</text>
                
                <rect x="150" y="180" width="200" height="35" fill="#3b82f6" rx="3" />
                <text x="250" y="202" textAnchor="middle" fill="white" fontSize="12">Network (3)</text>
                <text x="360" y="202" fill="#ffaa44" fontSize="10">✅ Widely used (IP)</text>
                
                <rect x="150" y="220" width="200" height="35" fill="#3b82f6" rx="3" />
                <text x="250" y="242" textAnchor="middle" fill="white" fontSize="12">Data Link (2)</text>
                <text x="360" y="242" fill="#ffaa44" fontSize="10">✅ Widely used (Ethernet)</text>
                
                <rect x="150" y="260" width="200" height="35" fill="#3b82f6" rx="3" />
                <text x="250" y="282" textAnchor="middle" fill="white" fontSize="12">Physical (1)</text>
                <text x="360" y="282" fill="#ffaa44" fontSize="10">✅ Widely used (cables, Wi-Fi)</text>
                
                <text x="250" y="330" textAnchor="middle" fill="currentColor" fontSize="12">Session & Presentation layers are rarely implemented as separate layers</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The OSI model's lower and transport layers are widely used, but its session and presentation layers exist mostly in theory.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use OSI for teaching and troubleshooting</span> – its granularity helps isolate issues.</li>
              <li><span className="font-bold">Don't force-fit every protocol into a single OSI layer</span> – some protocols (like ARP) are cross-layer.</li>
              <li><span className="font-bold">Remember that OSI was a reference, not a failure</span> – it influenced TCP/IP and remains valuable conceptually.</li>
              <li><span className="font-bold">In interviews, be prepared to explain why OSI didn't succeed</span> – this shows understanding of real-world engineering trade-offs.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing OSI is a failure because it's not implemented.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> OSI succeeded as a reference model; its concepts are universally used.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking TCP/IP has no drawbacks.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> TCP/IP's flexibility sometimes leads to security issues; OSI's stricter separation could have helped.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "OSI was a complete waste."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> OSI taught the industry the importance of layering and influenced modern networking.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Study both models</span> – OSI for conceptual depth, TCP/IP for practical implementation.</li>
              <li><span className="font-bold">When designing new protocols, consider layering</span> – but don't over-engineer.</li>
              <li><span className="font-bold">Use OSI as a troubleshooting checklist</span> – it's still the best systematic approach.</li>
              <li><span className="font-bold">Acknowledge the trade-offs</span> – simplicity (TCP/IP) vs. completeness (OSI).</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-red-500 text-xl">⚠️</span> OSI has 7 layers – too many for practical implementation</div>
              <div className="flex items-center gap-2"><span className="text-red-500 text-xl">⚠️</span> Session/Presentation layers rarely implemented separately</div>
              <div className="flex items-center gap-2"><span className="text-red-500 text-xl">⚠️</span> Slow standardization (ISO committees)</div>
              <div className="flex items-center gap-2"><span className="text-red-500 text-xl">⚠️</span> TCP/IP was already deployed by the time OSI was ready</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI remains an excellent teaching tool</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Influenced all modern networking</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Students often wonder why we study OSI if it's 'not used'. Emphasize that OSI is the 'why' and TCP/IP is the 'how'. The OSI model teaches the principles of layering, which are applied everywhere. Use the blueprint analogy: you learn architectural principles from perfect blueprints even if you build simpler structures. Encourage students to appreciate the historical context."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Look at how modern applications handle session and presentation functions: TLS is often called "transport layer security" but actually provides presentation (encryption) and session (handshake) services. This shows how OSI layers are merged in practice.</p>
            <p className="mt-2 text-sm">Try this: Think of a protocol like HTTP/3 (over QUIC). Which OSI layers does it span? QUIC provides transport-like features (reliability, streams) but also security (presentation) – demonstrating that real protocols don't fit neatly into one layer.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. Why did the OSI model fail to become the dominant protocol suite?</p><p>It was too complex, standardized too slowly, and TCP/IP was already deployed and working by the time OSI was ready.</p></div>
              <div><p className="font-bold">2. How many layers does the OSI model have?</p><p>7 layers.</p></div>
              <div><p className="font-bold">3. Which OSI layers are rarely implemented as separate entities?</p><p>Session and Presentation layers.</p></div>
              <div><p className="font-bold">4. Where are presentation layer functions (encryption, compression) typically implemented today?</p><p>Within application protocols (TLS, HTTP compression) or libraries.</p></div>
              <div><p className="font-bold">5. What was the main timing disadvantage of OSI?</p><p>By the time ISO finalized the OSI standards, TCP/IP was already widely deployed on ARPANET and the emerging internet.</p></div>
              <div><p className="font-bold">6. Why is OSI still taught if it's not widely implemented?</p><p>It provides a clear, structured way to understand networking concepts and remains a valuable troubleshooting framework.</p></div>
              <div><p className="font-bold">7. Give an example of a protocol that spans multiple OSI layers.</p><p>TLS spans Presentation (encryption) and Session (handshake); ARP is between Network and Data Link.</p></div>
              <div><p className="font-bold">8. What was the role of ISO in OSI?</p><p>ISO (International Organization for Standardization) developed and standardized the OSI model.</p></div>
              <div><p className="font-bold">9. How did TCP/IP's simplicity help it win?</p><p>4 layers meant easier implementation, faster development, and lower overhead.</p></div>
              <div><p className="font-bold">10. Did OSI have any successful protocols?</p><p>Some, like X.400 (email) and X.500 (directory), were used but never achieved the dominance of TCP/IP.</p></div>
              <div><p className="font-bold">11. What is meant by the "theoretical vs practical gap" of OSI?</p><p>OSI was designed as a perfect theoretical model, but real-world constraints (timing, complexity, existing deployment) prevented its widespread adoption.</p></div>
              <div><p className="font-bold">12. How did licensing affect OSI adoption?</p><p>OSI protocols often required licensing fees; TCP/IP was free and open.</p></div>
              <div><p className="font-bold">13. What lesson can we learn from OSI's failure?</p><p>That simplicity, timing, and grassroots adoption can outweigh theoretical elegance.</p></div>
              <div><p className="font-bold">14. Is the OSI model completely obsolete?</p><p>No, it's still used as a reference model in education, documentation, and troubleshooting.</p></div>
              <div><p className="font-bold">15. What would be different if OSI had succeeded?</p><p>We might have cleaner separation of functions, but perhaps slower innovation and less interoperability due to rigid standards.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic25;