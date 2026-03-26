import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic19: Mapping OSI Layers to TCP/IP Model
 * 
 * Purpose: Show how the 7-layer OSI model corresponds to the 4-layer TCP/IP model,
 *          explain why TCP/IP simplified the OSI layers, and highlight the practical
 *          implications of this mapping.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: This bridges the theoretical OSI model with the real-world TCP/IP model,
 *              helping students understand how concepts map to practice.
 */

const Topic19 = () => {
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
              OSI ↔ TCP/IP Mapping
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer-wise correspondence and simplification — from theory to practice
            </p>
          </section>

          {/* Real-World Analogy: Blueprint vs. Actual Building */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏗️ Real-World Analogy: Detailed Blueprint vs. Construction Plans
            </h2>
            <p>
              Imagine <strong>Abhronila</strong> is building a house in <strong>Naihati</strong>.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">OSI Model:</span> A detailed architectural blueprint showing every layer: foundation, framing, electrical, plumbing, insulation, drywall, finishing. It's thorough but complex.</li>
              <li><span className="font-bold">TCP/IP Model:</span> A practical construction plan that groups related tasks together: "Foundation + Framing" as one phase, "Electrical + Plumbing" as another, etc. It's simpler and gets the job done.</li>
            </ul>
            <p>
              The OSI model is the theoretical ideal; the TCP/IP model is what actually builds the internet.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why would a construction team combine tasks? Efficiency and practicality — just like TCP/IP combined OSI layers.
            </div>
          </section>

          {/* Mapping Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📊 OSI to TCP/IP Layer Mapping
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">OSI Layer</th>
                    <th className="border p-2 text-left">TCP/IP Layer</th>
                    <th className="border p-2 text-left">Mapping & Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">7. Application</td>
                    <td className="border p-2" rowSpan="3">Application Layer</td>
                    <td className="border p-2" rowSpan="3">Combined because session and presentation functions are often implemented within applications (e.g., TLS handles encryption, cookies handle session).</td>
                  </tr>
                  <tr><td className="border p-2">6. Presentation</td></tr>
                  <tr><td className="border p-2">5. Session</td></tr>
                  <tr>
                    <td className="border p-2">4. Transport</td>
                    <td className="border p-2">Transport Layer</td>
                    <td className="border p-2">Direct correspondence; TCP and UDP operate here unchanged.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">3. Network</td>
                    <td className="border p-2">Internet Layer</td>
                    <td className="border p-2">Direct correspondence; IP, ICMP, ARP operate here.</td>
                  </tr>
                  <tr>
                    <td className="border p-2">2. Data Link</td>
                    <td className="border p-2" rowSpan="2">Network Access Layer</td>
                    <td className="border p-2" rowSpan="2">Combined because physical and data link are tightly coupled in hardware (NIC, switch, etc.) and often implemented together.</td>
                  </tr>
                  <tr><td className="border p-2">1. Physical</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why the Simplification? */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🤔 Why Did TCP/IP Simplify OSI Layers?
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><span className="font-bold">Practicality over theory:</span> OSI was designed by committee; TCP/IP was built to solve real-world networking problems.</li>
              <li><span className="font-bold">Efficiency:</span> Fewer layers mean less overhead and simpler implementations.</li>
              <li><span className="font-bold">Tight coupling:</span> Physical and data link are inseparable in hardware; merging them made sense.</li>
              <li><span className="font-bold">Application integration:</span> Session and presentation functions are often part of application logic (e.g., TLS is used by applications, not as a separate OS).</li>
              <li><span className="font-bold">Historical timing:</span> TCP/IP was already deployed while OSI was still being standardized; by the time OSI was ready, TCP/IP had won.</li>
            </ul>
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              💡 <span className="font-bold">Key insight:</span> TCP/IP's simplicity made it easier to implement, debug, and adopt – leading to its dominance.
            </div>
          </section>

          {/* Detailed Correspondence */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🔍 Detailed Layer Correspondence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">OSI Application, Presentation, Session → TCP/IP Application</h3>
                <p className="text-sm">Functions like data translation (ASCII/Unicode), encryption (TLS), compression (gzip), and session management (cookies, tokens) are handled by application protocols (HTTP, FTP, etc.) or libraries.</p>
                <p className="text-sm mt-1">Example: <strong>Swadeep</strong> logs into a website; the session is maintained by cookies (application layer).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">OSI Transport → TCP/IP Transport</h3>
                <p className="text-sm">Direct mapping. TCP and UDP provide end-to-end delivery, ports, reliability (TCP), or speed (UDP).</p>
                <p className="text-sm mt-1">Example: <strong>Tuhina</strong> streams a video – UDP is used for speed; her bank uses TCP for reliability.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">OSI Network → TCP/IP Internet</h3>
                <p className="text-sm">Direct mapping. IP provides logical addressing and routing; ICMP for diagnostics; ARP for address resolution.</p>
                <p className="text-sm mt-1">Example: A packet from <strong>Barrackpore</strong> to <strong>Shyamnagar</strong> is routed using IP addresses.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">OSI Data Link + Physical → TCP/IP Network Access</h3>
                <p className="text-sm">Combined because the hardware (NIC, switch, cable) handles both framing and physical signaling together. Ethernet, Wi-Fi, etc., cover both.</p>
                <p className="text-sm mt-1">Example: <strong>Abhronila</strong> connects her laptop via Wi-Fi; the Network Access layer handles both the radio waves (physical) and MAC addresses (data link).</p>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Side-by-Side Mapping */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: OSI ↔ TCP/IP Mapping
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="380" viewBox="0 0 600 380" className="max-w-full h-auto">
                {/* OSI Column */}
                <text x="100" y="25" fill="currentColor" fontSize="14" fontWeight="bold">OSI Model (7 layers)</text>
                <rect x="30" y="40" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="57" textAnchor="middle" fill="white" fontSize="10">Application (7)</text>
                <rect x="30" y="70" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="87" textAnchor="middle" fill="white" fontSize="10">Presentation (6)</text>
                <rect x="30" y="100" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="117" textAnchor="middle" fill="white" fontSize="10">Session (5)</text>
                <rect x="30" y="130" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="147" textAnchor="middle" fill="white" fontSize="10">Transport (4)</text>
                <rect x="30" y="160" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="177" textAnchor="middle" fill="white" fontSize="10">Network (3)</text>
                <rect x="30" y="190" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="207" textAnchor="middle" fill="white" fontSize="10">Data Link (2)</text>
                <rect x="30" y="220" width="140" height="25" fill="#3b82f6" rx="3" />
                <text x="100" y="237" textAnchor="middle" fill="white" fontSize="10">Physical (1)</text>

                {/* TCP/IP Column */}
                <text x="480" y="25" fill="currentColor" fontSize="14" fontWeight="bold">TCP/IP Model (4 layers)</text>
                <rect x="430" y="40" width="140" height="75" fill="#10b981" rx="3" />
                <text x="500" y="85" textAnchor="middle" fill="white" fontSize="10">Application Layer</text>
                <rect x="430" y="120" width="140" height="35" fill="#10b981" rx="3" />
                <text x="500" y="142" textAnchor="middle" fill="white" fontSize="10">Transport Layer</text>
                <rect x="430" y="160" width="140" height="35" fill="#10b981" rx="3" />
                <text x="500" y="182" textAnchor="middle" fill="white" fontSize="10">Internet Layer</text>
                <rect x="430" y="200" width="140" height="45" fill="#10b981" rx="3" />
                <text x="500" y="227" textAnchor="middle" fill="white" fontSize="10">Network Access Layer</text>

                {/* Arrows */}
                <path d="M170 52 L430 85" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 82 L430 85" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 112 L430 85" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 142 L430 137" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 172 L430 177" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 202 L430 222" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M170 232 L430 222" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />

                <text x="300" y="280" textAnchor="middle" fill="currentColor" fontSize="12">TCP/IP merges OSI layers for practicality</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Application layer combines OSI 5–7; Network Access combines OSI 1–2.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">When troubleshooting, use OSI layers for precise isolation</span> (e.g., "is it a physical layer issue?"), but use TCP/IP layer names in conversations (e.g., "check the network layer").</li>
              <li><span className="font-bold">Remember that TCP/IP's Application layer includes functions that OSI splits</span> – so when you see TLS or cookies, think application layer in TCP/IP, but presentation/session in OSI.</li>
              <li><span className="font-bold">Certification exams (like CCNA) often test this mapping</span> – memorize the correspondence.</li>
              <li><span className="font-bold">The term "layer" can be ambiguous</span> – always clarify which model you're referencing.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking OSI and TCP/IP layers are interchangeable.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> They are different models; TCP/IP layers are broader, OSI layers are more granular.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming that because TCP/IP merged layers, OSI's layers are useless.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> OSI remains valuable for teaching, conceptual design, and troubleshooting.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "TCP/IP has no presentation or session layer."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Those functions exist, but they are implemented within application protocols or libraries.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use OSI when teaching or designing conceptually</span> – it helps with precise understanding.</li>
              <li><span className="font-bold">Use TCP/IP when discussing real-world implementations</span> – it's what actually runs.</li>
              <li><span className="font-bold">When documenting network architectures, clarify which model you're using</span> to avoid confusion.</li>
              <li><span className="font-bold">Know that many textbooks and exams mix the models</span> – be prepared to translate between them.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI 5–7 → TCP/IP Application</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI 4 → TCP/IP Transport</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI 3 → TCP/IP Internet</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI 1–2 → TCP/IP Network Access</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP/IP is simpler, practical, implemented</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI remains a valuable conceptual model</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Emphasize that this mapping is conceptual, not rigid. Some protocols blur lines (e.g., ARP is often considered Internet layer but also touches Network Access). Use the blueprint vs. construction analogy. Have students draw both models side-by-side and label where each OSI layer fits into TCP/IP. Reinforce that understanding both models is essential for exams and real-world troubleshooting."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">In a Wireshark capture, you see frames (Data Link), packets (Network), segments (Transport), and application data. Notice how the application data might already include encryption (TLS) – that's presentation layer functions merged into application layer in TCP/IP.</p>
            <p className="mt-2 text-sm">Try this: Capture HTTPS traffic and expand the TLS layer. In OSI terms, that's presentation layer; in TCP/IP, it's part of the application layer. This demonstrates how TCP/IP merges layers.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. Which OSI layers are combined into the TCP/IP Application layer?</p><p>OSI Application, Presentation, and Session layers (layers 5, 6, 7).</p></div>
              <div><p className="font-bold">2. Which OSI layers are combined into the TCP/IP Network Access layer?</p><p>OSI Physical and Data Link layers (layers 1 and 2).</p></div>
              <div><p className="font-bold">3. Does TCP/IP have a separate presentation layer?</p><p>No, presentation functions (encryption, compression, translation) are handled within application layer protocols or libraries.</p></div>
              <div><p className="font-bold">4. Does TCP/IP have a separate session layer?</p><p>No, session management (checkpoints, dialog control) is implemented by applications or protocols like HTTP with cookies.</p></div>
              <div><p className="font-bold">5. Which OSI layer corresponds directly to the TCP/IP Transport layer?</p><p>OSI Transport layer (layer 4).</p></div>
              <div><p className="font-bold">6. Which OSI layer corresponds directly to the TCP/IP Internet layer?</p><p>OSI Network layer (layer 3).</p></div>
              <div><p className="font-bold">7. Why did TCP/IP combine the physical and data link layers?</p><p>Because they are tightly coupled in hardware; most technologies (Ethernet, Wi-Fi) implement both together.</p></div>
              <div><p className="font-bold">8. Why did TCP/IP combine the top three OSI layers?</p><p>Because session and presentation functions are often part of application logic, and merging them simplifies the model.</p></div>
              <div><p className="font-bold">9. Is the OSI model still used today?</p><p>Yes, as a conceptual teaching tool and for precise troubleshooting and design.</p></div>
              <div><p className="font-bold">10. Which model is actually implemented on the internet?</p><p>The TCP/IP model (Internet Protocol Suite).</p></div>
              <div><p className="font-bold">11. In TCP/IP, where is TLS (Transport Layer Security) implemented?</p><p>At the Application layer (though it provides presentation-layer functions).</p></div>
              <div><p className="font-bold">12. What does the TCP/IP Network Access layer handle?</p><p>MAC addressing, framing, error detection, and physical transmission (Ethernet, Wi-Fi, etc.).</p></div>
              <div><p className="font-bold">13. How does understanding the mapping help in troubleshooting?</p><p>It allows you to think in OSI terms for precise isolation, but use TCP/IP terms when discussing actual protocols.</p></div>
              <div><p className="font-bold">14. Is the mapping one-to-one or many-to-one?</p><p>Many-to-one: multiple OSI layers map to a single TCP/IP layer.</p></div>
              <div><p className="font-bold">15. Which model has more layers, and why?</p><p>OSI has 7 layers, designed for theoretical completeness; TCP/IP has 4 layers, designed for practical efficiency.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic19;