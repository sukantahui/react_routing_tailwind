import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic17: Transport Layer – TCP/UDP functionality
 * 
 * Purpose: Explain the transport layer's role in end-to-end communication,
 *          segmentation, port addressing, and the core protocols TCP and UDP.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Essential for understanding how applications communicate reliably or
 *              quickly over the network, building on the Internet layer.
 */

const Topic17 = () => {
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
              Transport Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              TCP/UDP functionality — reliable vs. fast delivery, port addressing, and end-to-end communication
            </p>
          </section>

          {/* Real-World Analogy: Reliable Courier vs. Express Mail */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📮 Real-World Analogy: Reliable Courier vs. Express Mail
            </h2>
            <p>
              Imagine <strong>Susmita</strong> in <strong>Naihati</strong> needs to send two types of packages to <strong>Debangshu</strong> in <strong>Ichapur</strong>:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">TCP (Reliable Courier):</span> She sends legal documents. The courier tracks the package, confirms delivery, retries if lost, and delivers in order. Slow but guaranteed.</li>
              <li><span className="font-bold">UDP (Express Mail):</span> She sends a live video stream. The courier just drops the package without tracking. Fast, but occasional loss is acceptable.</li>
            </ul>
            <p>
              The transport layer provides these choices to applications, using <span className="font-bold">port numbers</span> like delivery addresses to ensure data reaches the right app.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why does a video call use UDP while a bank transaction uses TCP? Reliability vs. speed tradeoff.
            </div>
          </section>

          {/* Core Transport Layer Functions */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Transport Layer Functions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">✂️</div>
                <h3 className="font-bold text-lg">Segmentation</h3>
                <p className="text-sm">Breaks application data into smaller segments (each with sequence numbers) for efficient transmission and reassembly.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔢</div>
                <h3 className="font-bold text-lg">Port Addressing</h3>
                <p className="text-sm">Uses 16-bit port numbers (0-65535) to identify source and destination applications, enabling multiplexing.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🔁</div>
                <h3 className="font-bold text-lg">Multiplexing</h3>
                <p className="text-sm">Allows multiple applications to use the network simultaneously; demultiplexes incoming data to the correct app using ports.</p>
              </div>
            </div>
          </section>

          {/* TCP Deep Dive */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔗 TCP (Transmission Control Protocol)
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><span className="font-bold">Connection-oriented:</span> 3-way handshake (SYN, SYN-ACK, ACK) before data transfer.</li>
              <li><span className="font-bold">Reliable delivery:</span> Acknowledgments (ACKs) and retransmissions ensure no data loss.</li>
              <li><span className="font-bold">Ordered delivery:</span> Sequence numbers reassemble data in correct order.</li>
              <li><span className="font-bold">Flow control:</span> Sliding window prevents sender from overwhelming receiver.</li>
              <li><span className="font-bold">Congestion control:</span> Dynamically adjusts rate to avoid network congestion (algorithms: Reno, Cubic).</li>
              <li><span className="font-bold">Header size:</span> 20-60 bytes (includes ports, seq, ack, flags, window).</li>
            </ul>
            <p className="mt-3">Used by: HTTP, HTTPS, FTP, SMTP, SSH, etc.</p>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              💡 <span className="font-bold">Key insight:</span> TCP guarantees that data arrives exactly as sent, in order, without errors, duplication, or loss.
            </div>
          </section>

          {/* UDP Deep Dive */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              ⚡ UDP (User Datagram Protocol)
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><span className="font-bold">Connectionless:</span> No handshake; just sends datagrams.</li>
              <li><span className="font-bold">Unreliable:</span> No acknowledgments, no retransmissions.</li>
              <li><span className="font-bold">No ordering:</span> Datagrams may arrive out of order or be lost.</li>
              <li><span className="font-bold">No flow/congestion control:</span> Sends at whatever rate the application chooses.</li>
              <li><span className="font-bold">Lightweight:</span> 8-byte header (ports and length, checksum).</li>
            </ul>
            <p className="mt-3">Used by: DNS, DHCP, VoIP, streaming, online gaming, SNMP.</p>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Key insight:</span> UDP sacrifices reliability for speed and low overhead; applications can add reliability if needed.
            </div>
          </section>

          {/* TCP vs UDP Comparison Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ⚖️ TCP vs UDP Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Feature</th>
                    <th className="border p-2 text-left">TCP</th>
                    <th className="border p-2 text-left">UDP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Connection</td><td className="border p-2">Connection-oriented</td><td className="border p-2">Connectionless</td></tr>
                  <tr><td className="border p-2">Reliability</td><td className="border p-2">Yes (ACKs, retransmission)</td><td className="border p-2">No</td></tr>
                  <tr><td className="border p-2">Ordering</td><td className="border p-2">Guaranteed</td><td className="border p-2">Not guaranteed</td></tr>
                  <tr><td className="border p-2">Flow Control</td><td className="border p-2">Yes (sliding window)</td><td className="border p-2">No</td></tr>
                  <tr><td className="border p-2">Congestion Control</td><td className="border p-2">Yes</td><td className="border p-2">No</td></tr>
                  <tr><td className="border p-2">Header Size</td><td className="border p-2">20-60 bytes</td><td className="border p-2">8 bytes</td></tr>
                  <tr><td className="border p-2">Speed</td><td className="border p-2">Slower (overhead)</td><td className="border p-2">Faster</td></tr>
                  <tr><td className="border p-2">Example Uses</td><td className="border p-2">Web, email, file transfer</td><td className="border p-2">DNS, VoIP, gaming</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Port Numbers and Well-Known Ports */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🔌 Port Numbers: Application Demultiplexing
            </h2>
            <p>
              Port numbers are 16-bit identifiers (0–65535) that allow multiple applications to share the network.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><span className="font-bold">Well-known ports (0–1023):</span> Reserved for system services (HTTP:80, HTTPS:443, FTP:21, SSH:22, DNS:53).</li>
              <li><span className="font-bold">Registered ports (1024–49151):</span> Used by applications (MySQL:3306, Minecraft:25565).</li>
              <li><span className="font-bold">Dynamic/Private ports (49152–65535):</span> Used temporarily by client applications.</li>
            </ul>
            <p className="mt-2">
              A <span className="font-bold">socket</span> is the combination of IP address + port number (e.g., 192.168.1.10:80). This uniquely identifies a communication endpoint.
            </p>
          </section>

          {/* SVG Illustration: TCP 3-Way Handshake and Data Transfer */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🎨 Visual: TCP 3-Way Handshake & Data Transfer
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="280" viewBox="0 0 500 280" className="max-w-full h-auto">
                <rect x="50" y="20" width="120" height="40" fill="#3b82f6" rx="5" />
                <text x="110" y="45" textAnchor="middle" fill="white" fontSize="12">Client</text>
                <rect x="330" y="20" width="120" height="40" fill="#10b981" rx="5" />
                <text x="390" y="45" textAnchor="middle" fill="white" fontSize="12">Server</text>

                <path d="M170 60 L330 60" stroke="#ffaa44" strokeWidth="2" />
                <text x="250" y="55" textAnchor="middle" fill="#ffaa44" fontSize="10">SYN (seq=100)</text>
                <path d="M330 80 L170 80" stroke="#ffaa44" strokeWidth="2" />
                <text x="250" y="75" textAnchor="middle" fill="#ffaa44" fontSize="10">SYN-ACK (seq=300, ack=101)</text>
                <path d="M170 100 L330 100" stroke="#ffaa44" strokeWidth="2" />
                <text x="250" y="95" textAnchor="middle" fill="#ffaa44" fontSize="10">ACK (ack=301)</text>

                <path d="M170 140 L330 140" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="250" y="135" textAnchor="middle" fill="#3b82f6" fontSize="10">Data (seq=101, len=500)</text>
                <path d="M330 160 L170 160" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="250" y="155" textAnchor="middle" fill="#3b82f6" fontSize="10">ACK (ack=601)</text>

                <text x="250" y="200" textAnchor="middle" fill="currentColor" fontSize="12">TCP ensures reliable, ordered delivery</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              TCP establishes a connection before data transfer (3-way handshake) and uses acknowledgments for reliability.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use `netstat -an` or `ss`</span> to see active TCP connections and listening ports on your system.</li>
              <li><span className="font-bold">Wireshark is your friend:</span> capture a TCP stream to see sequence numbers, retransmissions, and window updates.</li>
              <li><span className="font-bold">For performance troubleshooting, look for TCP retransmissions</span> — they indicate packet loss or congestion.</li>
              <li><span className="font-bold">When designing an app, choose TCP if data integrity is critical (banking, file transfer)</span>; choose UDP if speed matters (real-time games, voice/video).</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming TCP is always the best choice.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> For real-time applications, TCP's retransmissions can cause latency; UDP with custom reliability is better.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking UDP can't be used for reliable communication.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Applications can implement their own reliability on top of UDP (e.g., QUIC, WebRTC).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Port numbers are the same as IP addresses."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> IP addresses identify hosts; port numbers identify applications on a host.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use standard port numbers</span> for well-known services to avoid confusion.</li>
              <li><span className="font-bold">Implement keep-alives</span> for long-lived TCP connections to detect half-open states.</li>
              <li><span className="font-bold">Monitor TCP performance metrics</span> (retransmission rate, window size, RTT) to identify network issues.</li>
              <li><span className="font-bold">Consider using TCP Fast Open (TFO)</span> to reduce handshake latency for repeated connections.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP: reliable, connection-oriented, ordered</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> UDP: fast, connectionless, unreliable</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Ports identify applications (0-65535)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> TCP uses 3-way handshake</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Flow control, congestion control (TCP)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> UDP is used for DNS, VoIP, streaming</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <Teacher 
              note={"Emphasize the tradeoff between reliability and speed. Show real examples: HTTP (TCP) vs. DNS queries (UDP). Use `netstat` to demonstrate listening ports. For advanced students, discuss QUIC (UDP-based) which is replacing TCP for many web services. The TCP 3-way handshake is critical for understanding connection setup."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you load a web page, your browser opens multiple TCP connections (often 6-8) to the server to download resources in parallel. Each connection has its own source port (ephemeral).</p>
            <p className="mt-2 text-sm">Try this: Open a command prompt and run `netstat -an | find "443"` (Windows) or `netstat -an | grep 443` (Linux). You'll see established TCP connections to HTTPS servers.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the primary responsibility of the transport layer?</p><p>End-to-end delivery, segmentation, and providing services (reliable/unreliable) to applications.</p></div>
              <div><p className="font-bold">2. What are the two main transport layer protocols?</p><p>TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).</p></div>
              <div><p className="font-bold">3. What does TCP stand for and what does it provide?</p><p>Transmission Control Protocol; provides reliable, connection-oriented, ordered delivery with flow and congestion control.</p></div>
              <div><p className="font-bold">4. What does UDP stand for and what are its characteristics?</p><p>User Datagram Protocol; connectionless, unreliable, lightweight, no ordering guarantee.</p></div>
              <div><p className="font-bold">5. What is a port number?</p><p>A 16-bit identifier that distinguishes different applications on a host.</p></div>
              <div><p className="font-bold">6. What are well-known ports? Give examples.</p><p>Ports 0-1023 reserved for system services; e.g., HTTP:80, HTTPS:443, SSH:22.</p></div>
              <div><p className="font-bold">7. What is a socket?</p><p>Combination of IP address and port number (e.g., 192.168.1.10:80).</p></div>
              <div><p className="font-bold">8. What is the TCP 3-way handshake?</p><p>SYN, SYN-ACK, ACK — used to establish a TCP connection.</p></div>
              <div><p className="font-bold">9. How does TCP ensure reliability?</p><p>Through acknowledgments (ACKs), retransmissions, sequence numbers, and checksums.</p></div>
              <div><p className="font-bold">10. What is flow control in TCP?</p><p>Adjusts sender's rate based on receiver's advertised window size to prevent buffer overflow.</p></div>
              <div><p className="font-bold">11. What is congestion control in TCP?</p><p>Dynamically adjusts sending rate to avoid network congestion.</p></div>
              <div><p className="font-bold">12. Give examples of applications that use UDP.</p><p>DNS, DHCP, VoIP, streaming video, online gaming, SNMP.</p></div>
              <div><p className="font-bold">13. Why is UDP preferred for real-time applications?</p><p>Because it has low overhead and no retransmission delays, which suits time-sensitive data.</p></div>
              <div><p className="font-bold">14. What is the difference between a segment (TCP) and a datagram (UDP)?</p><p>Both are transport layer PDUs; segment is TCP's term, datagram is UDP's.</p></div>
              <div><p className="font-bold">15. Can an application use both TCP and UDP?</p><p>Yes, some applications (e.g., DNS) use both: UDP for queries, TCP for zone transfers.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic17;