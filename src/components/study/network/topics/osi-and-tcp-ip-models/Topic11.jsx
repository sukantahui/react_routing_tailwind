import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic11: Encapsulation & Decapsulation Process
 * 
 * Purpose: Explain step-by-step how data is packaged (encapsulation) as it travels
 *          down the OSI layers, and unpacked (decapsulation) as it travels up,
 *          with headers and trailers added/removed at each layer.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Essential for understanding how data is transformed across layers;
 *              connects the concepts of headers, trailers, and data units.
 */

const Topic11 = () => {
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
              Encapsulation & Decapsulation
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Step-by-step data flow across layers — how headers and trailers transform data
            </p>
          </section>

          {/* Real-World Analogy: Nested Boxes / Russian Dolls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📦 Real-World Analogy: Nested Boxes
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to send a gift (the data) to <strong>Tuhina</strong> in <strong>Shyamnagar</strong>.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>He puts the gift in a small box (application data).</li>
              <li>He adds a <span className="font-bold">transport envelope</span> with tracking number (TCP header).</li>
              <li>He puts that in a <span className="font-bold">postal box</span> with destination address (IP header).</li>
              <li>He adds a <span className="font-bold">shipping label</span> with recipient's street address (MAC header).</li>
              <li>Finally, the package is handed to the courier (physical transmission).</li>
            </ul>
            <p>
              On arrival, <strong>Tuhina</strong> removes each layer in reverse order — that's <span className="font-bold">decapsulation</span>.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why does each layer need its own header? Because each layer has a specific job, and headers carry the information needed for that job.
            </div>
          </section>

          {/* Core Concepts: What are Encapsulation & Decapsulation */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔁 Encapsulation & Decapsulation Defined
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-blue-600">Encapsulation (Sender)</h3>
                <p>Data moves from Application → Physical layer. Each layer adds its own header (and sometimes trailer) to the data received from the layer above.</p>
                <ul className="list-disc list-inside text-sm mt-2">
                  <li>Application → Segment (TCP/UDP header)</li>
                  <li>Segment → Packet (IP header)</li>
                  <li>Packet → Frame (MAC header + trailer)</li>
                  <li>Frame → Bits (physical layer)</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-green-600">Decapsulation (Receiver)</h3>
                <p>Data moves from Physical → Application layer. Each layer strips its header/trailer and passes the payload to the layer above.</p>
                <ul className="list-disc list-inside text-sm mt-2">
                  <li>Bits → Frame (remove MAC header/trailer)</li>
                  <li>Frame → Packet (remove IP header)</li>
                  <li>Packet → Segment (remove TCP/UDP header)</li>
                  <li>Segment → Application data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-Step Encapsulation Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📝 Step-by-Step Encapsulation (Sending)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Layer</th>
                    <th className="border p-2 text-left">Data Unit</th>
                    <th className="border p-2 text-left">Header/Trailer Added</th>
                    <th className="border p-2 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Application</td><td className="border p-2">Data</td><td className="border p-2">—</td><td className="border p-2">Raw user data</td></tr>
                  <tr><td className="border p-2">Transport</td><td className="border p-2">Segment</td><td className="border p-2">TCP/UDP header (ports, seq/ack, flags)</td><td className="border p-2">End-to-end delivery, reliability</td></tr>
                  <tr><td className="border p-2">Network</td><td className="border p-2">Packet</td><td className="border p-2">IP header (source/dest IP, TTL)</td><td className="border p-2">Routing across networks</td></tr>
                  <tr><td className="border p-2">Data Link</td><td className="border p-2">Frame</td><td className="border p-2">MAC header (source/dest MAC) + CRC trailer</td><td className="border p-2">Local delivery, error detection</td></tr>
                  <tr><td className="border p-2">Physical</td><td className="border p-2">Bits</td><td className="border p-2">— (encoding/signaling)</td><td className="border p-2">Transmission over medium</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SVG Illustration: Encapsulation Flow */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Encapsulation (Sender) & Decapsulation (Receiver)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="600" height="320" viewBox="0 0 600 320" className="max-w-full h-auto">
                <text x="100" y="20" fill="currentColor" fontSize="12">Sender</text>
                <text x="450" y="20" fill="currentColor" fontSize="12">Receiver</text>

                {/* Sender side */}
                <rect x="50" y="40" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="125" y="57" textAnchor="middle" fill="white" fontSize="10">Application Data</text>
                <path d="M125 65 L125 85" stroke="gray" strokeWidth="1" />
                <rect x="50" y="85" width="150" height="35" fill="#8b5cf6" rx="3" />
                <text x="125" y="107" textAnchor="middle" fill="white" fontSize="9">TCP/UDP Header</text>
                <text x="185" y="107" fill="white" fontSize="9">Data</text>
                <path d="M125 120 L125 140" stroke="gray" strokeWidth="1" />
                <rect x="50" y="140" width="150" height="35" fill="#10b981" rx="3" />
                <text x="125" y="162" textAnchor="middle" fill="white" fontSize="9">IP Header</text>
                <text x="185" y="162" fill="white" fontSize="9">Segment</text>
                <path d="M125 175 L125 195" stroke="gray" strokeWidth="1" />
                <rect x="50" y="195" width="150" height="35" fill="#f59e0b" rx="3" />
                <text x="125" y="217" textAnchor="middle" fill="white" fontSize="9">MAC Header</text>
                <text x="185" y="217" fill="white" fontSize="9">Packet</text>
                <text x="210" y="217" fill="white" fontSize="9">CRC</text>
                <path d="M125 230 L125 260" stroke="gray" strokeWidth="1" />
                <rect x="50" y="260" width="150" height="25" fill="#ef4444" rx="3" />
                <text x="125" y="277" textAnchor="middle" fill="white" fontSize="10">Bits</text>

                {/* Animated arrow across */}
                <line x1="200" y1="272" x2="400" y2="272" stroke="#ffaa44" strokeWidth="2" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="2s" repeatCount="indefinite" />
                </line>
                <text x="300" y="260" fill="#ffaa44" fontSize="10">Transmission</text>

                {/* Receiver side (mirror) */}
                <rect x="400" y="260" width="150" height="25" fill="#ef4444" rx="3" />
                <text x="475" y="277" textAnchor="middle" fill="white" fontSize="10">Bits</text>
                <path d="M475 260 L475 230" stroke="gray" strokeWidth="1" />
                <rect x="400" y="195" width="150" height="35" fill="#f59e0b" rx="3" />
                <text x="475" y="217" textAnchor="middle" fill="white" fontSize="9">MAC Header</text>
                <text x="415" y="217" fill="white" fontSize="9">CRC</text>
                <text x="535" y="217" fill="white" fontSize="9">Packet</text>
                <path d="M475 195 L475 175" stroke="gray" strokeWidth="1" />
                <rect x="400" y="140" width="150" height="35" fill="#10b981" rx="3" />
                <text x="475" y="162" textAnchor="middle" fill="white" fontSize="9">IP Header</text>
                <text x="535" y="162" fill="white" fontSize="9">Segment</text>
                <path d="M475 140 L475 120" stroke="gray" strokeWidth="1" />
                <rect x="400" y="85" width="150" height="35" fill="#8b5cf6" rx="3" />
                <text x="475" y="107" textAnchor="middle" fill="white" fontSize="9">TCP/UDP Header</text>
                <text x="535" y="107" fill="white" fontSize="9">Data</text>
                <path d="M475 85 L475 65" stroke="gray" strokeWidth="1" />
                <rect x="400" y="40" width="150" height="25" fill="#3b82f6" rx="3" />
                <text x="475" y="57" textAnchor="middle" fill="white" fontSize="10">Application Data</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Encapsulation: headers are added as data moves down; decapsulation: headers are removed as data moves up.
            </p>
          </section>

          {/* Detailed Example: Web Request Encapsulation */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🌐 Example: Web Request (HTTP over TCP/IP over Ethernet)
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`[Application]  GET /index.html HTTP/1.1\r\nHost: www.example.com\r\n\r\n

[Transport]    TCP header (src port: 12345, dst port: 80, seq: 100, ack: 0) + HTTP data

[Network]      IP header (src IP: 192.168.1.10, dst IP: 93.184.216.34, TTL: 64) + TCP segment

[Data Link]    Ethernet header (src MAC: aa:bb:cc:dd:ee:ff, dst MAC: router's MAC, type: IPv4) + IP packet + Ethernet trailer (CRC)

[Physical]     Bits encoded as electrical signals`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              At the receiver, each layer processes its header, validates, and passes the remaining data upward.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use Wireshark to see encapsulation in action:</span> capture a packet and expand the headers — you'll see Ethernet, IP, TCP, and HTTP layers stacked.</li>
              <li><span className="font-bold">MTU (Maximum Transmission Unit)</span> is important: if the packet exceeds the network's MTU, the network layer will fragment it.</li>
              <li><span className="font-bold">Remember that some layers add trailers:</span> Data Link layer adds CRC trailer, but many layers only add headers.</li>
              <li><span className="font-bold">Encapsulation is sometimes called "wrapping"</span> — each layer wraps the data from above.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking all layers add a trailer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Only the data link layer typically adds a trailer (e.g., CRC for error detection).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing encapsulation order (thinking IP header comes before TCP header).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Encapsulation starts at application, then transport, network, data link. TCP header is added before IP header.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Headers are removed in the same order they were added."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Yes — decapsulation removes headers in reverse order (last added = first removed).
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When troubleshooting, <span className="font-bold">visualize the encapsulation stack</span> to understand where issues may occur (e.g., MTU problems).</li>
              <li>Use <span className="font-bold">packet capture tools</span> to verify that headers contain correct information (IP addresses, ports, MAC addresses).</li>
              <li><span className="font-bold">Keep MTU in mind</span> when designing networks; ensure end-to-end path MTU discovery works.</li>
              <li><span className="font-bold">Document the expected encapsulation</span> for custom protocols to help others understand the data flow.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Encapsulation = add headers/trailers (downward)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Decapsulation = remove headers/trailers (upward)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Data unit changes at each layer: Data → Segment → Packet → Frame → Bits</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Each header contains info needed for that layer</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Trailer (CRC) added at Data Link for error detection</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Process is reversed on receiver</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Use the 'nested boxes' analogy heavily. Show a real packet capture in Wireshark to let students see the headers. Emphasize that understanding encapsulation is key to troubleshooting — each layer's header provides clues (e.g., TCP port, IP address). Have students trace a simple HTTP request and identify the headers added at each layer."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Open Wireshark, capture some traffic (e.g., ping). Click on a packet and expand the frame details. You'll see the Ethernet header (src/dst MAC), IP header, ICMP header, and data. This is encapsulation in action.</p>
            <p className="mt-2 text-sm">Try this: Send a large file and capture the packets. Notice how the transport layer segments the data, each segment gets an IP header, etc. You'll see the headers repeated for each segment.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is encapsulation?</p><p>The process of adding headers (and sometimes trailers) to data as it moves down the OSI layers before transmission.</p></div>
              <div><p className="font-bold">2. What is decapsulation?</p><p>The process of removing headers/trailers as data moves up the OSI layers at the receiving end.</p></div>
              <div><p className="font-bold">3. What are the data units called at each layer (starting from application)?</p><p>Data → Segment → Packet → Frame → Bits.</p></div>
              <div><p className="font-bold">4. Which layers add a header? Which adds a trailer?</p><p>Transport, Network, and Data Link add headers; Data Link also adds a trailer (CRC).</p></div>
              <div><p className="font-bold">5. What information is in the TCP/UDP header?</p><p>Source port, destination port, sequence numbers, acknowledgment numbers, flags, checksum, etc.</p></div>
              <div><p className="font-bold">6. What information is in the IP header?</p><p>Source IP, destination IP, TTL, protocol (TCP/UDP), checksum, etc.</p></div>
              <div><p className="font-bold">7. What is the purpose of the CRC trailer at the data link layer?</p><p>To detect errors that may have occurred during transmission.</p></div>
              <div><p className="font-bold">8. In which order are headers added during encapsulation?</p><p>Starting from the top: Transport header, then Network header, then Data Link header (and trailer).</p></div>
              <div><p className="font-bold">9. In which order are headers removed during decapsulation?</p><p>Reverse order: Data Link header/trailer removed first, then Network header, then Transport header.</p></div>
              <div><p className="font-bold">10. What is the payload in a frame?</p><p>The packet (IP header + segment) that the frame encapsulates.</p></div>
              <div><p className="font-bold">11. How does encapsulation help with modularity?</p><p>Each layer can process its header independently without needing to know details of other layers.</p></div>
              <div><p className="font-bold">12. What happens if a frame's CRC doesn't match at the receiver?</p><p>The frame is discarded; error recovery may be handled by higher layers (e.g., TCP retransmission).</p></div>
              <div><p className="font-bold">13. What is the maximum size of a typical Ethernet frame payload?</p><p>1500 bytes (MTU). Larger packets may be fragmented at the network layer.</p></div>
              <div><p className="font-bold">14. Does the physical layer add any header or trailer?</p><p>No, it only transmits bits. However, some physical media have their own framing (e.g., SONET), but not part of the standard OSI physical layer definition.</p></div>
              <div><p className="font-bold">15. How can you observe encapsulation in real life?</p><p>Use a packet sniffer like Wireshark — capture packets and expand the protocol headers.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic11;