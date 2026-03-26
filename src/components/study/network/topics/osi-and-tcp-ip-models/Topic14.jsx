import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic14: Detailed Study of TCP/IP 4 Layers
 * 
 * Purpose: Provide an in-depth exploration of each layer of the TCP/IP model,
 *          their functions, protocols, and real-world examples.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on the overview to give students a concrete understanding
 *              of the actual protocol stack that powers the internet.
 */

const Topic14 = () => {
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

  // Layer data
  const layers = [
    {
      number: 4,
      name: "Application Layer",
      description: "Provides network services directly to user applications. This layer combines the OSI Application, Presentation, and Session layers.",
      functions: ["Data formatting (JSON, XML)", "Encryption (TLS/SSL)", "Session management (cookies, tokens)", "User authentication"],
      protocols: ["HTTP/HTTPS", "FTP", "SMTP", "POP3", "IMAP", "DNS", "SSH", "Telnet"],
      devices: ["Gateways", "Firewalls (application-aware)", "Proxy servers"],
      example: "When Swadeep visits a website, his browser (Application) uses HTTP/HTTPS to request the page."
    },
    {
      number: 3,
      name: "Transport Layer",
      description: "Provides end-to-end communication services. Corresponds exactly to OSI Layer 4.",
      functions: ["Segmentation", "Port addressing", "Reliability (TCP)", "Error recovery", "Flow control", "Congestion control"],
      protocols: ["TCP", "UDP", "SCTP"],
      devices: ["Gateways", "Load balancers (with TCP offload)"],
      example: "When Tuhina downloads a file, TCP ensures all segments arrive in order, retransmitting lost ones."
    },
    {
      number: 2,
      name: "Internet Layer",
      description: "Handles logical addressing and routing of packets across networks. Corresponds to OSI Network Layer.",
      functions: ["Logical addressing (IP)", "Packet routing", "Fragmentation", "Error reporting (ICMP)"],
      protocols: ["IPv4", "IPv6", "ICMP", "ARP", "RARP", "IGMP"],
      devices: ["Routers", "Layer 3 switches"],
      example: "A packet from Barrackpore to Shyamnagar travels through several routers; the Internet layer chooses the path."
    },
    {
      number: 1,
      name: "Network Access Layer",
      description: "Handles communication over the physical medium. Combines OSI Physical and Data Link layers.",
      functions: ["Framing", "MAC addressing", "Error detection (CRC)", "Physical signaling", "Media access control"],
      protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "HDLC", "DSL", "DOCSIS"],
      devices: ["Switches", "Hubs", "NICs", "Repeaters", "Bridges"],
      example: "When Abhronila plugs into a switch, the Network Access layer defines the Ethernet frame, MAC addresses, and electrical signals."
    }
  ];

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Detailed Study: TCP/IP 4 Layers
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A deep dive into Application, Transport, Internet, and Network Access — the foundation of the Internet
            </p>
          </section>

          {/* Real-World Analogy: The Restaurant Kitchen */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🍽️ Real-World Analogy: The Restaurant Kitchen
            </h2>
            <p>
              Imagine a busy restaurant in <strong>Naihati</strong> with clear divisions of labor:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Application Layer:</span> The customers and waiters — they decide what to order (data) and receive the food (response).</li>
              <li><span className="font-bold">Transport Layer:</span> The expediter who ensures orders are complete (TCP reliability) or just passes tickets quickly (UDP).</li>
              <li><span className="font-bold">Internet Layer:</span> The kitchen dispatcher who routes orders to the right station (routing packets).</li>
              <li><span className="font-bold">Network Access Layer:</span> The actual cooks, ovens, and ingredients (physical hardware and link-layer protocols).</li>
            </ul>
            <p>
              Each layer works independently, communicating only with adjacent layers, yet together they serve the customer.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> How would the restaurant work if the waiter also had to cook? Layers separate concerns for efficiency.
            </div>
          </section>

          {/* Detailed Layer Cards */}
          {layers.map((layer, idx) => (
            <section
              key={layer.number}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${150 + idx * 100}ms` }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
                Layer {layer.number}: {layer.name}
              </h2>
              <p className="mb-4">{layer.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">📋 Functions</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.functions.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">📡 Protocols</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.protocols.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">🖥️ Devices</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.devices.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">💡 Real Example</p>
                  <p className="text-sm">{layer.example}</p>
                </div>
              </div>
            </section>
          ))}

          {/* SVG Illustration: TCP/IP Stack with Data Flow */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: TCP/IP Stack with Animated Data Flow
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="380" viewBox="0 0 500 380" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradTcp" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {layers.map((layer, i) => {
                  const y = 30 + i * 80;
                  return (
                    <g key={layer.number}>
                      <rect x="100" y={y} width="300" height="55" rx="6" fill="url(#gradTcp)" className="transition-all duration-300 hover:opacity-90" />
                      <text x="250" y={y + 32} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        {layer.name}
                      </text>
                      {i === 0 && (
                        <circle cx="250" cy={y + 28} r="4" fill="#ffaa44">
                          <animate attributeName="cy" values={`${y + 28};${y + 28 + 80 * (layers.length - 1)}`} dur="3s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
                <text x="250" y="290" textAnchor="middle" fill="#ffaa44" fontSize="12">Data flow down (encapsulation)</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              On the sending side, data flows down through the layers, each adding its own header. On receiving, it flows up, removing headers.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use `curl` to test Application layer:</span> `curl -v https://example.com` shows HTTP headers and TLS handshake.</li>
              <li><span className="font-bold">Check Transport layer with `netstat`:</span> `netstat -an` shows listening ports and active connections.</li>
              <li><span className="font-bold">Debug Internet layer with `ping` and `traceroute`:</span> They test IP connectivity and path.</li>
              <li><span className="font-bold">For Network Access layer issues, check link lights and switch port status.</span></li>
              <li><span className="font-bold">Remember that TCP/IP layers are not as rigid as OSI; some protocols blur boundaries (e.g., ARP is often considered between Internet and Network Access).</span></li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking the TCP/IP model is exactly the same as OSI.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> TCP/IP has only 4 layers; OSI's presentation/session functions are handled within applications or by protocols like TLS.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing the Internet layer with the Network Access layer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Internet layer handles IP routing; Network Access handles MAC addresses and physical transmission.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "All TCP/IP protocols are standardized by a central authority."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> They are defined through open RFCs (Request for Comments) in a collaborative process.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When designing network applications, choose the right transport protocol: <span className="font-bold">TCP for reliability, UDP for speed</span> (with application-layer reliability if needed).</li>
              <li><span className="font-bold">Use standard port numbers</span> for well-known services to avoid confusion and firewall issues.</li>
              <li>Implement <span className="font-bold">defense in depth</span>: secure each layer (e.g., firewalls at network/transport, TLS at application).</li>
              <li><span className="font-bold">Monitor all layers</span>: physical errors (CRC), routing changes (Internet), TCP retransmissions (Transport), application errors (Application).</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Application: HTTP, FTP, SMTP, DNS</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Transport: TCP (reliable) & UDP (fast)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Internet: IP, ICMP, routing</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Network Access: Ethernet, Wi-Fi, MAC addresses</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Encapsulation: Data → Segment → Packet → Frame → Bits</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP/IP is the actual Internet protocol suite</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <Teacher 
              note={"Emphasize that TCP/IP is the practical model students will encounter daily. Use `netstat`, `ping`, and browser dev tools to make it tangible. Encourage students to draw the stack and map protocols. Reinforce that the Internet layer is responsible for routing, while Network Access deals with local delivery. This distinction is crucial for understanding how packets travel."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Open your browser's Developer Tools (Network tab) and look at a request. You'll see the HTTP (Application layer) headers. The response will be delivered over TCP (Transport) and IP (Internet). The physical connection (Network Access) is handled by your Wi-Fi or Ethernet card.</p>
            <p className="mt-2 text-sm">Try this: Run `traceroute google.com` (or `tracert` on Windows) to see the Internet layer in action. Each hop is a router forwarding packets based on IP addresses.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What are the four layers of the TCP/IP model?</p><p>Application, Transport, Internet, Network Access.</p></div>
              <div><p className="font-bold">2. Which layer corresponds to the OSI Network layer?</p><p>The Internet layer.</p></div>
              <div><p className="font-bold">3. What does the Application layer in TCP/IP combine from OSI?</p><p>OSI Application, Presentation, and Session layers.</p></div>
              <div><p className="font-bold">4. Name two protocols at the Transport layer.</p><p>TCP and UDP.</p></div>
              <div><p className="font-bold">5. What is the primary function of the Internet layer?</p><p>Logical addressing (IP) and routing packets across networks.</p></div>
              <div><p className="font-bold">6. What does the Network Access layer combine from OSI?</p><p>OSI Physical and Data Link layers.</p></div>
              <div><p className="font-bold">7. Give an example of an Application layer protocol.</p><p>HTTP, FTP, SMTP, DNS, SSH.</p></div>
              <div><p className="font-bold">8. What is the difference between TCP and UDP in terms of reliability?</p><p>TCP provides reliable, ordered delivery; UDP is connectionless and unreliable.</p></div>
              <div><p className="font-bold">9. What protocol is used for error reporting and diagnostics at the Internet layer?</p><p>ICMP (Internet Control Message Protocol).</p></div>
              <div><p className="font-bold">10. What addressing is used at the Network Access layer?</p><p>MAC addresses (hardware addresses).</p></div>
              <div><p className="font-bold">11. Which layer is responsible for port numbers?</p><p>The Transport layer (TCP/UDP ports).</p></div>
              <div><p className="font-bold">12. What does the term "encapsulation" mean in TCP/IP?</p><p>Each layer adds its own header to the data as it passes down the stack.</p></div>
              <div><p className="font-bold">13. Name a device that operates at the Internet layer.</p><p>Router.</p></div>
              <div><p className="font-bold">14. Which layer does a switch typically operate at?</p><p>Network Access layer (specifically, the Data Link sublayer).</p></div>
              <div><p className="font-bold">15. Why is TCP/IP called a "protocol suite"?</p><p>Because it's a collection of many protocols (TCP, IP, UDP, ICMP, HTTP, etc.) working together.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic14;