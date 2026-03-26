import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic13: TCP/IP Model Overview
 * 
 * Purpose: Introduce the TCP/IP model, its historical origin, practical implementation,
 *          and why it became the foundation of the internet.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on OSI knowledge to show the actual model used in the internet,
 *              bridging theory and real-world practice.
 */

const Topic13 = () => {
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
              TCP/IP Model Overview
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Origin, practical implementation, and the foundation of the Internet
            </p>
          </section>

          {/* Real-World Analogy: Blueprint vs. Actual Building */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏗️ Real-World Analogy: Blueprint vs. Actual Building
            </h2>
            <p>
              Think of <strong>Abhronila</strong> designing a house in <strong>Barrackpore</strong>. The <strong>OSI model</strong> is like a detailed architectural blueprint — perfect in theory, showing every layer from foundation to roof. But when actually building the house, architects often use a <strong>simpler, more practical plan</strong> that combines some layers (like insulation and wiring into one step). That's the TCP/IP model.
            </p>
            <p className="mt-2">
              TCP/IP was born out of necessity: to connect different networks (ARPANET) using a simple, robust protocol suite that could survive failures. It became the <span className="font-bold">working model</span> of the internet.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why did the simpler TCP/IP model succeed while the more complete OSI model remained mostly theoretical?
            </div>
          </section>

          {/* History & Origin */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📜 Origin: The ARPANET Story
            </h2>
            <p>
              In the late 1960s, the U.S. Department of Defense's ARPA (Advanced Research Projects Agency) funded the <span className="font-bold">ARPANET</span> — the precursor to the internet. The goal was to create a resilient network that could survive nuclear attacks. Researchers developed the <span className="font-bold">TCP/IP protocol suite</span>:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><span className="font-bold">TCP (Transmission Control Protocol):</span> Reliable, connection-oriented transport.</li>
              <li><span className="font-bold">IP (Internet Protocol):</span> Connectionless packet delivery across networks.</li>
            </ul>
            <p className="mt-2">
              In 1983, ARPANET switched from NCP to TCP/IP — the birth of the modern internet. The model was intentionally simple, with only <strong>4 layers</strong> compared to OSI's 7.
            </p>
          </section>

          {/* The 4 Layers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🧩 TCP/IP 4 Layers (Overview)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Application</h3>
                <p className="text-xs">Combines OSI 5–7: HTTP, FTP, SMTP, DNS</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Transport</h3>
                <p className="text-xs">TCP, UDP — same as OSI layer 4</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Internet</h3>
                <p className="text-xs">Corresponds to OSI network layer: IP, ICMP, ARP</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
                <h3 className="font-bold text-lg">Network Access</h3>
                <p className="text-xs">Combines OSI 1–2: Ethernet, Wi-Fi, etc.</p>
              </div>
            </div>
            <p className="mt-4 text-center">
              <span className="font-bold">Why only 4 layers?</span> The designers focused on practicality, merging layers that were often implemented together (e.g., physical and data link as "network access").
            </p>
          </section>

          {/* Practical Implementation: Why TCP/IP Won */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🚀 Why TCP/IP Became the Internet Standard
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><span className="font-bold">Open and free:</span> No vendor lock-in; anyone could implement it.</li>
              <li><span className="font-bold">Simplicity:</span> Fewer layers meant easier implementation and debugging.</li>
              <li><span className="font-bold">Resilience:</span> Designed for packet-switched networks that could survive node failures.</li>
              <li><span className="font-bold">Practical focus:</span> It was built to solve real problems (connecting disparate networks), not as a theoretical exercise.</li>
              <li><span className="font-bold">Early adoption:</span> Universities and researchers embraced it, creating a network effect.</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Industry fact:</span> The OSI model was being standardized at the same time, but its complexity and slow standardization allowed TCP/IP to dominate.
            </div>
          </section>

          {/* SVG Illustration: TCP/IP vs OSI */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: TCP/IP vs OSI Model
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="300" viewBox="0 0 500 300" className="max-w-full h-auto">
                <text x="100" y="20" fill="currentColor" fontSize="14" fontWeight="bold">OSI Model (7 layers)</text>
                <text x="380" y="20" fill="currentColor" fontSize="14" fontWeight="bold">TCP/IP Model (4 layers)</text>

                {/* OSI Layers */}
                <rect x="30" y="40" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="57" textAnchor="middle" fill="white" fontSize="10">Application (7)</text>
                <rect x="30" y="70" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="87" textAnchor="middle" fill="white" fontSize="10">Presentation (6)</text>
                <rect x="30" y="100" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="117" textAnchor="middle" fill="white" fontSize="10">Session (5)</text>
                <rect x="30" y="130" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="147" textAnchor="middle" fill="white" fontSize="10">Transport (4)</text>
                <rect x="30" y="160" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="177" textAnchor="middle" fill="white" fontSize="10">Network (3)</text>
                <rect x="30" y="190" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="207" textAnchor="middle" fill="white" fontSize="10">Data Link (2)</text>
                <rect x="30" y="220" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="105" y="237" textAnchor="middle" fill="white" fontSize="10">Physical (1)</text>

                {/* TCP/IP Layers */}
                <rect x="320" y="40" width="150" height="70" fill="#10b981" rx="3" />
                <text x="395" y="80" textAnchor="middle" fill="white" fontSize="10">Application Layer</text>
                <rect x="320" y="115" width="150" height="35" fill="#10b981" rx="3" />
                <text x="395" y="137" textAnchor="middle" fill="white" fontSize="10">Transport Layer</text>
                <rect x="320" y="155" width="150" height="35" fill="#10b981" rx="3" />
                <text x="395" y="177" textAnchor="middle" fill="white" fontSize="10">Internet Layer</text>
                <rect x="320" y="195" width="150" height="50" fill="#10b981" rx="3" />
                <text x="395" y="225" textAnchor="middle" fill="white" fontSize="10">Network Access Layer</text>

                {/* Arrows showing mapping */}
                <path d="M180 50 L320 70" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 80 L320 70" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 110 L320 70" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 140 L320 130" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 170 L320 170" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 200 L320 210" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M180 230 L320 210" stroke="#ffaa44" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              TCP/IP combines OSI layers 5–7 into Application, and layers 1–2 into Network Access.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Know that the TCP/IP model is the actual protocol suite used today.</span> OSI is a conceptual reference.</li>
              <li><span className="font-bold">When troubleshooting, think in TCP/IP layers:</span> Application (is the service running?), Transport (port open?), Internet (can we ping?), Network Access (cable plugged?).</li>
              <li><span className="font-bold">The TCP/IP model is sometimes called the "Internet Protocol Suite"</span> — the official name.</li>
              <li><span className="font-bold">RFCs (Request for Comments)</span> document TCP/IP standards — the "living" documentation of the internet.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking TCP/IP is just two protocols (TCP and IP).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> It's a suite of many protocols (UDP, ICMP, ARP, etc.) organized into 4 layers.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Believing OSI is obsolete.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> OSI remains a valuable teaching tool and conceptual framework; many modern protocols are still described using OSI layers.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "TCP/IP has only 4 layers, so it's less functional."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> The layers are broader; functions of OSI layers 5–6 are implemented within applications (e.g., TLS, compression).
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Understand both models: <span className="font-bold">OSI for theory, TCP/IP for practice</span>.</li>
              <li>When reading technical documentation, note which model is being referenced — many use TCP/IP layer names (e.g., "network layer" often means IP).</li>
              <li><span className="font-bold">Learn the core protocols of each TCP/IP layer</span> — it will help in real-world networking.</li>
              <li>Use tools like <span className="font-bold">`ping`, `traceroute`, `netstat`</span> to explore TCP/IP behavior.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP/IP = practical model of the internet</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> 4 layers: Application, Transport, Internet, Network Access</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Originated from ARPANET (DoD project)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Open, simple, resilient → dominated the market</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> OSI is a reference model; TCP/IP is implemented</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> RFCs document TCP/IP standards</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Highlight that TCP/IP succeeded because it was built to solve a real problem (connecting heterogeneous networks) with pragmatic engineering. Contrast with OSI's theoretical, committee-driven approach. Use the ARPANET story to make it memorable. Encourage students to explore RFCs for deeper understanding."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you use `ping`, you're using ICMP (Internet layer). When you browse a website, your browser uses HTTP (Application layer) over TCP (Transport layer). Can you identify which TCP/IP layer each protocol belongs to?</p>
            <p className="mt-2 text-sm">Try this: Look at the output of `netstat -nr` on your computer. You'll see the IP routing table — that's the Internet layer at work.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What does TCP/IP stand for?</p><p>Transmission Control Protocol / Internet Protocol — the core protocols of the Internet protocol suite.</p></div>
              <div><p className="font-bold">2. How many layers does the TCP/IP model have?</p><p>Four layers: Application, Transport, Internet, Network Access.</p></div>
              <div><p className="font-bold">3. What was the precursor to the internet that used TCP/IP?</p><p>ARPANET, funded by the U.S. Department of Defense.</p></div>
              <div><p className="font-bold">4. In which year did ARPANET switch to TCP/IP?</p><p>1983.</p></div>
              <div><p className="font-bold">5. Why is TCP/IP considered the "practical" model?</p><p>Because it was built to solve real networking challenges and is the actual protocol suite used on the internet.</p></div>
              <div><p className="font-bold">6. Name the four TCP/IP layers from top to bottom.</p><p>Application, Transport, Internet, Network Access.</p></div>
              <div><p className="font-bold">7. Which OSI layers are combined into the TCP/IP Application layer?</p><p>OSI layers 5, 6, and 7 (Session, Presentation, Application).</p></div>
              <div><p className="font-bold">8. Which OSI layers are combined into the TCP/IP Network Access layer?</p><p>OSI layers 1 and 2 (Physical and Data Link).</p></div>
              <div><p className="font-bold">9. What is the primary protocol at the TCP/IP Internet layer?</p><p>IP (Internet Protocol).</p></div>
              <div><p className="font-bold">10. Name two protocols at the TCP/IP Transport layer.</p><p>TCP and UDP.</p></div>
              <div><p className="font-bold">11. Give an example of an Application layer protocol in TCP/IP.</p><p>HTTP, FTP, SMTP, DNS, SSH.</p></div>
              <div><p className="font-bold">12. What does RFC stand for and why is it important?</p><p>Request for Comments — the documents that define TCP/IP standards and internet protocols.</p></div>
              <div><p className="font-bold">13. Why did TCP/IP become more successful than the OSI protocol suite?</p><p>It was simpler, open, free, and already implemented before OSI standards were finalized.</p></div>
              <div><p className="font-bold">14. Is the OSI model still used today?</p><p>Yes, as a conceptual teaching tool and for describing protocols; but TCP/IP is the implemented model.</p></div>
              <div><p className="font-bold">15. What does the "Internet layer" in TCP/IP correspond to in OSI?</p><p>The Network layer (Layer 3).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic13;