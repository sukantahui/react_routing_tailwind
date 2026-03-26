import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic20: Key Differences Between OSI and TCP/IP Models
 * 
 * Purpose: Compare and contrast the OSI and TCP/IP models across structure,
 *          design philosophy, and practical usage, highlighting why one is
 *          theoretical and the other is implemented.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Essential for understanding the evolution of networking standards
 *              and which model to reference in different contexts.
 */

const Topic20 = () => {
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
              OSI vs TCP/IP Models
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Structure, design philosophy, and practical usage — comparing the blueprint to the building
            </p>
          </section>

          {/* Real-World Analogy: Academic Theory vs. Practical Engineering */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🎓 Real-World Analogy: Academic Theory vs. Practical Engineering
            </h2>
            <p>
              Imagine two students in <strong>Barrackpore</strong> – <strong>Abhronila</strong> (the theorist) and <strong>Swadeep</strong> (the engineer).
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">OSI (Abhronila):</span> Creates a perfect, detailed textbook blueprint with 7 distinct layers, each precisely defined. It's ideal for teaching and understanding concepts, but implementing it exactly is complex.</li>
              <li><span className="font-bold">TCP/IP (Swadeep):</span> Builds a working prototype with 4 layers, combining related tasks. It's simpler, gets the job done, and evolves through real-world experience.</li>
            </ul>
            <p>
              Both are valuable: the blueprint teaches the principles; the working model powers the internet.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Which would you use to learn architecture? Which to build an actual house? That's the OSI vs TCP/IP relationship.
            </div>
          </section>

          {/* Comparison Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📊 OSI vs TCP/IP: Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Aspect</th>
                    <th className="border p-2 text-left">OSI Model</th>
                    <th className="border p-2 text-left">TCP/IP Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Number of Layers</td><td className="border p-2">7 layers</td><td className="border p-2">4 layers</td></tr>
                  <tr><td className="border p-2">Development</td><td className="border p-2">International standards (ISO), late 1970s–1980s</td><td className="border p-2">DARPA (DoD), 1970s, based on ARPANET</td></tr>
                  <tr><td className="border p-2">Philosophy</td><td className="border p-2">Prescriptive: define ideal standards first</td><td className="border p-2">Descriptive: build first, standardize later</td></tr>
                  <tr><td className="border p-2">Protocols</td><td className="border p-2">OSI protocols (rarely used); model is independent</td><td className="border p-2">TCP, IP, UDP, HTTP, etc. (actual internet protocols)</td></tr>
                  <tr><td className="border p-2">Layer Separation</td><td className="border p-2">Strict; each layer has distinct functions</td><td className="border p-2">Looser; some protocols blur boundaries (e.g., ARP)</td></tr>
                  <tr><td className="border p-2">Session/Presentation</td><td className="border p-2">Separate layers (5 & 6)</td><td className="border p-2">Part of Application layer</td></tr>
                  <tr><td className="border p-2">Physical/Data Link</td><td className="border p-2">Separate layers (1 & 2)</td><td className="border p-2">Combined into Network Access layer</td></tr>
                  <tr><td className="border p-2">Adoption</td><td className="border p-2">Conceptual, teaching, some protocols (X.400, X.500) but not widespread</td><td className="border p-2">Universally adopted as the Internet Protocol Suite</td></tr>
                  <tr><td className="border p-2">Documentation</td><td className="border p-2">ISO standards (formal, slow)</td><td className="border p-2">RFCs (Request for Comments) – open, fast evolution</td></tr>
                  <tr><td className="border p-2">Practicality</td><td className="border p-2">Theoretical; great for education and troubleshooting</td><td className="border p-2">Practical; runs the internet and all networks</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Structure Differences */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🏛️ Structure Differences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">OSI: 7 Rigid Layers</h3>
                <p>Each layer has a strictly defined role, and protocols are designed to fit exactly into one layer. This makes it excellent for teaching but sometimes forces artificial separation.</p>
                <p className="mt-2 text-sm">Example: The Session layer is rarely implemented as a separate entity in real networks.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">TCP/IP: 4 Flexible Layers</h3>
                <p>Broader layers allow protocols to span boundaries naturally. This reflects real-world implementation, where a single protocol may cover multiple functions.</p>
                <p className="mt-2 text-sm">Example: TLS operates at Application layer but provides presentation (encryption) and session functions.</p>
              </div>
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              💡 Design Philosophy: Prescriptive vs. Descriptive
            </h2>
            <p>
              <span className="font-bold">OSI is prescriptive:</span> It started with a theoretical ideal and attempted to create protocols that fit the model. This "top-down" approach was thorough but slow, and by the time OSI protocols were ready, the internet had already adopted TCP/IP.
            </p>
            <p className="mt-2">
              <span className="font-bold">TCP/IP is descriptive:</span> It grew from working implementations (ARPANET). Protocols were created to solve real problems, then documented in RFCs. This "bottom-up" approach was faster and more adaptive.
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Key insight:</span> TCP/IP's success came from being built by engineers for engineers, while OSI was built by committees for standardization.
            </div>
          </section>

          {/* Practical Usage */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🌍 Practical Usage: When to Use Which Model
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><span className="font-bold">Use OSI:</span> For teaching, certification exams (CCNA, Network+), conceptual design, precise troubleshooting (isolating issues to a specific layer), and understanding protocol interactions.</li>
              <li><span className="font-bold">Use TCP/IP:</span> For actual network implementation, configuration, daily operations, reading RFCs, and discussing real-world protocols (HTTP, TCP, IP).</li>
              <li><span className="font-bold">Blend them:</span> Many professionals think in OSI terms for troubleshooting ("Is it a Layer 2 problem?") but use TCP/IP terminology when working with tools.</li>
            </ul>
            <p className="mt-3">
              For example, when <strong>Debangshu</strong> can't reach a website, he might think: "Is it Physical (cable), Data Link (switch), Network (router), Transport (firewall), or Application (web server)?" – that's OSI thinking. Then he uses `ping` (ICMP/IP) and `curl` (HTTP) – TCP/IP tools.
            </p>
          </section>

          {/* SVG Illustration: Side-by-Side with Key Differences */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎨 Visual: OSI vs TCP/IP – A Tale of Two Models
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="350" viewBox="0 0 600 350" className="max-w-full h-auto">
                <text x="150" y="25" fill="currentColor" fontSize="14" fontWeight="bold">OSI Model (7 layers)</text>
                <text x="450" y="25" fill="currentColor" fontSize="14" fontWeight="bold">TCP/IP Model (4 layers)</text>
                
                {/* OSI layers */}
                <rect x="100" y="40" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="57" textAnchor="middle" fill="white" fontSize="9">Application</text>
                <rect x="100" y="68" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="85" textAnchor="middle" fill="white" fontSize="9">Presentation</text>
                <rect x="100" y="96" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="113" textAnchor="middle" fill="white" fontSize="9">Session</text>
                <rect x="100" y="124" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="141" textAnchor="middle" fill="white" fontSize="9">Transport</text>
                <rect x="100" y="152" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="169" textAnchor="middle" fill="white" fontSize="9">Network</text>
                <rect x="100" y="180" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="197" textAnchor="middle" fill="white" fontSize="9">Data Link</text>
                <rect x="100" y="208" width="100" height="25" fill="#3b82f6" rx="3" /><text x="150" y="225" textAnchor="middle" fill="white" fontSize="9">Physical</text>

                {/* TCP/IP layers */}
                <rect x="400" y="40" width="100" height="80" fill="#10b981" rx="3" /><text x="450" y="90" textAnchor="middle" fill="white" fontSize="9">Application</text>
                <rect x="400" y="124" width="100" height="35" fill="#10b981" rx="3" /><text x="450" y="146" textAnchor="middle" fill="white" fontSize="9">Transport</text>
                <rect x="400" y="163" width="100" height="35" fill="#10b981" rx="3" /><text x="450" y="185" textAnchor="middle" fill="white" fontSize="9">Internet</text>
                <rect x="400" y="202" width="100" height="50" fill="#10b981" rx="3" /><text x="450" y="232" textAnchor="middle" fill="white" fontSize="9">Network Access</text>

                {/* Mapping arrows */}
                <path d="M200 52 L400 80" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 80 L400 80" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 108 L400 80" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 136 L400 141" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 164 L400 180" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 192 L400 227" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M200 220 L400 227" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              OSI has more granular layers; TCP/IP merges related layers for practicality.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">For troubleshooting, use OSI layers to isolate:</span> start at Physical and work up.</li>
              <li><span className="font-bold">For configuration, think in TCP/IP layers:</span> configure IP (Internet), then services (Application).</li>
              <li><span className="font-bold">In interviews and exams, know both models</span> and be able to map protocols to each.</li>
              <li><span className="font-bold">Remember that many protocols span OSI layers</span> – that's okay; models are guides, not straightjackets.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing that one model is "correct" and the other is "wrong".
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Both are valuable; they serve different purposes (theory vs. practice).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Trying to force every protocol into a single OSI layer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Some protocols (like ARP) don't fit neatly; models are conceptual.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "OSI is obsolete."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> OSI is still widely used in teaching, certification, and precise troubleshooting.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Learn <span className="font-bold">both models thoroughly</span> – they appear in certifications and interviews.</li>
              <li>Use <span className="font-bold">OSI for conceptual understanding and troubleshooting</span> – it helps isolate issues precisely.</li>
              <li>Use <span className="font-bold">TCP/IP for real-world implementation and configuration</span> – it's what actually runs.</li>
              <li>When documenting, <span className="font-bold">state which model you're referencing</span> to avoid confusion.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI: 7 layers, prescriptive, teaching tool</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP/IP: 4 layers, descriptive, actual internet</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI separate presentation/session; TCP/IP merges</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI separate physical/data link; TCP/IP merges</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP/IP: faster evolution, open standards (RFCs)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI: formal ISO standards, slower but thorough</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <Teacher 
              note={"Use the 'blueprint vs. building' analogy repeatedly. Emphasize that both models are essential: OSI for precise understanding, TCP/IP for practical work. Challenge students to map real protocols (like TLS) to both models – it will highlight the flexibility of TCP/IP and the rigor of OSI. Remind them that in the real world, engineers blend both mental models."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you use `ping`, which model are you using? It's ICMP (Internet layer in TCP/IP, Network layer in OSI). This shows how the same protocol maps differently.</p>
            <p className="mt-2 text-sm">Try this: Explain to a friend how a web page loads using OSI layers, then using TCP/IP layers. Notice which explanation feels more natural for daily use.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. How many layers does OSI have? TCP/IP?</p><p>OSI: 7 layers; TCP/IP: 4 layers.</p></div>
              <div><p className="font-bold">2. Which model is prescriptive (theoretical ideal) and which is descriptive (based on existing protocols)?</p><p>OSI is prescriptive; TCP/IP is descriptive.</p></div>
              <div><p className="font-bold">3. What organization developed the OSI model?</p><p>ISO (International Organization for Standardization).</p></div>
              <div><p className="font-bold">4. What organization/project developed TCP/IP?</p><p>DARPA (DoD) through the ARPANET project.</p></div>
              <div><p className="font-bold">5. Which OSI layers are combined into the TCP/IP Application layer?</p><p>OSI Application, Presentation, and Session.</p></div>
              <div><p className="font-bold">6. Which OSI layers are combined into the TCP/IP Network Access layer?</p><p>OSI Physical and Data Link.</p></div>
              <div><p className="font-bold">7. Which model is actually used on the internet?</p><p>TCP/IP (Internet Protocol Suite).</p></div>
              <div><p className="font-bold">8. Why is OSI still taught if TCP/IP is used?</p><p>Because OSI provides a clear, structured framework for understanding networking concepts and troubleshooting.</p></div>
              <div><p className="font-bold">9. What is the difference in documentation style?</p><p>OSI uses formal ISO standards; TCP/IP uses RFCs (Request for Comments) which are open and evolve quickly.</p></div>
              <div><p className="font-bold">10. Which model has stricter layer separation?</p><p>OSI has stricter separation; TCP/IP is more flexible, allowing protocols to span layers.</p></div>
              <div><p className="font-bold">11. Give an example of a protocol that doesn't fit neatly into OSI layers.</p><p>ARP (Address Resolution Protocol) – often placed between Network and Data Link layers.</p></div>
              <div><p className="font-bold">12. In which model would you find a separate "Presentation" layer?</p><p>OSI model; TCP/IP merges presentation functions into Application.</p></div>
              <div><p className="font-bold">13. Which model is better for teaching beginners?</p><p>OSI is often preferred for teaching because of its clear, granular layering.</p></div>
              <div><p className="font-bold">14. Which model is referenced in RFCs and configuration guides?</p><p>TCP/IP; though sometimes OSI layer numbers are used colloquially (e.g., "Layer 3 switch").</p></div>
              <div><p className="font-bold">15. Can the two models be used together?</p><p>Yes, many professionals use OSI for troubleshooting (isolating to a layer) and TCP/IP for implementation.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic20;