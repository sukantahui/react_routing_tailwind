import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';

/**
 * Topic2: UDP Characteristics
 * 
 * Purpose: Explain User Datagram Protocol – connectionless, unreliable, lightweight.
 * Prototype: N/A (React component)
 * Return: JSX.Element
 * 
 * When & why used:
 * - Real-time applications (video streaming, DNS, VoIP, gaming) where speed > reliability.
 * - When application can tolerate loss or reordering.
 */

const Topic2 = () => {
  // Dark mode state (default true)
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 transition-colors duration-300">
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md dark:bg-gray-700 dark:text-gray-200 bg-gray-200 text-gray-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section – fade+slide-up */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <div className="bg-gradient-to-r dark:from-teal-900/30 from-teal-100 dark:to-cyan-900/30 to-cyan-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 leading-relaxed">
              UDP Characteristics
            </h1>
            <p className="dark:text-gray-300 text-gray-600 mt-3 text-lg leading-relaxed">
              The fast, lightweight, "fire‑and‑forget" transport protocol.
            </p>
          </div>
        </section>

        {/* Theory & Detailed Explanation */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-teal-500 pl-4">
              🧠 Theory & Conceptual Foundation
            </h2>
            <div className="mt-4 space-y-4 dark:text-gray-300 text-gray-700 leading-relaxed">
              <p>
                <strong className="dark:text-teal-300 text-teal-600">UDP (User Datagram Protocol)</strong> is a connectionless protocol.
                Unlike TCP, it provides no guarantees: packets may be lost, duplicated, or arrive out of order.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>No handshake:</strong> Just send datagrams to an IP:port.</li>
                <li><strong>No reliability:</strong> No acknowledgments, retransmissions, or sequence numbers.</li>
                <li><strong>No congestion control:</strong> Sends as fast as the application wants.</li>
                <li><strong>Lightweight header:</strong> Only 8 bytes (vs. TCP’s 20–60 bytes).</li>
              </ul>
              <p>
                🧪 <strong>Real‑world analogy:</strong> Mahima sends postcards from Barrackpore to Mamata in Jadavpur.
                She drops each card in a mailbox – no confirmation, some may get lost, and they might arrive in any order.
                But it’s very fast and doesn't require a formal conversation.
              </p>
              <p>
                ⚙️ <strong>UDP header fields:</strong> Source Port (16), Dest Port (16), Length (16), Checksum (16).
                No sequence/ack numbers, no window, no flags.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive SVG – UDP datagram flow, no handshake */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-green-500 pl-4 mb-4">
              📡 UDP Datagram Flow (connectionless)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="650" height="300" viewBox="0 0 650 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* Client */}
                <rect x="50" y="120" width="120" height="50" rx="8" fill="#14B8A6" className="dark:fill-teal-700 fill-teal-500" />
                <text x="110" y="150" textAnchor="middle" fill="white" fontWeight="bold">Sender</text>
                
                {/* Server */}
                <rect x="480" y="120" width="120" height="50" rx="8" fill="#F97316" className="dark:fill-orange-700 fill-orange-500" />
                <text x="540" y="150" textAnchor="middle" fill="white" fontWeight="bold">Receiver</text>
                
                {/* Multiple datagrams (no handshake) */}
                {/* Packet 1 */}
                <line x1="170" y1="140" x2="460" y2="130" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />
                <polygon points="460,130 450,126 452,134" fill="#F59E0B" />
                <text x="270" y="110" fill="#F59E0B" fontSize="12">Datagram 1</text>
                <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.6s" fill="freeze" />

                {/* Packet 2 */}
                <line x1="175" y1="170" x2="465" y2="180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" />
                <polygon points="465,180 455,176 457,184" fill="#F59E0B" />
                <text x="280" y="205" fill="#F59E0B" fontSize="12">Datagram 2 (out of order)</text>
                <animate attributeName="opacity" from="0" to="1" begin="0.8s" dur="0.6s" fill="freeze" />

                {/* Packet 3 lost (dashed X) */}
                <line x1="180" y1="210" x2="430" y2="220" stroke="#DC2626" strokeWidth="2" strokeDasharray="6 3" opacity="0.7" />
                <text x="250" y="255" fill="#DC2626" fontSize="12">📭 Datagram 3 (lost)</text>
                <animate attributeName="opacity" from="0" to="1" begin="1.6s" dur="0.6s" fill="freeze" />

                {/* No handshake label */}
                <text x="280" y="285" textAnchor="middle" fontSize="13" className="dark:fill-gray-300 fill-gray-600" fontWeight="bold">
                  🚀 No SYN / no ACK – just send!
                </text>
              </svg>
            </div>
            <p className="text-center dark:text-gray-400 text-gray-500 text-sm mt-3">
              UDP sends datagrams without establishing a connection. Loss and reordering are possible.
            </p>
          </div>
        </section>

        {/* Real-world, Tips, Best Practices, Mistakes */}
        <div className="space-y-6">
          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-purple-500 pl-4">💼 Real‑world & Industry Usage</h2>
              <ul className="mt-4 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-700 leading-relaxed">
                <li><strong>DNS (Domain Name System):</strong> Queries and responses use UDP (port 53). Fast, single‑packet exchanges.</li>
                <li><strong>Video streaming (RTP):</strong> YouTube, Zoom, Netflix use UDP for real‑time media.</li>
                <li><strong>Online gaming:</strong> Player positions, shots – loss is okay, but latency kills.</li>
                <li><strong>DHCP:</strong> IP address assignment uses UDP broadcast.</li>
                <li><strong>SNMP, NTP, TFTP:</strong> Lightweight protocols over UDP.</li>
              </ul>
              <div className="mt-4 p-3 dark:bg-gray-700/40 bg-gray-100 rounded-lg">
                <p className="font-mono text-sm">🛠️ <strong>Pro tip:</strong> Use <code className="dark:bg-gray-900 bg-gray-200 px-1 rounded">netstat -uan</code> or <code className="dark:bg-gray-900 bg-gray-200">ss -uan</code> to list UDP sockets and their packet counts.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-red-500 pl-4">⚠️ Common Mistakes & Pitfalls</h2>
              <div className="mt-4 space-y-3 dark:text-gray-300 text-gray-700">
                <p>❌ <strong>Misconception:</strong> “UDP is faster than TCP always.” – Not true; TCP can be fast, but UDP has lower overhead per packet.</p>
                <p>❌ <strong>Beginner error:</strong> Expecting ordered delivery. UDP can reorder packets; applications must handle it.</p>
                <p>❌ <strong>Firewall issue:</strong> Many corporate firewalls drop all UDP except DNS/DHCP.</p>
                <p>✅ <strong>Best practice:</strong> Implement application‑layer reliability if needed (e.g., add sequence numbers and retries).</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-teal-500 pl-4">✅ Best Practices & Mini Checklist</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-bold dark:text-blue-300 text-blue-700">For developers</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>Always set <code>SO_RCVBUF</code> sufficiently large for bursty traffic.</li>
                    <li>Handle <code>EMSGSIZE</code> (packet exceeds MTU).</li>
                    <li>Consider using <code>sendmmsg()</code> / <code>recvmmsg()</code> for batching.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold dark:text-green-300 text-green-700">Student checklist</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>✔️ Can you list 3 applications that use UDP?</li>
                    <li>✔️ Why does UDP have a checksum if it's unreliable?</li>
                    <li>✔️ What happens if UDP datagram is larger than MTU?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-yellow-500 pl-4">💡 Hint Section (Think about...)</h2>
              <div className="mt-3 p-4 dark:bg-gray-700/50 bg-yellow-50 rounded-xl space-y-2">
                <p>🔍 <strong>Observe carefully:</strong> Why does DNS prefer UDP? (typical response fits in one packet; retry on timeout).</p>
                <p>🔍 <strong>Try changing this:</strong> Write a Python UDP sender and drop 10% of packets with <code>iptables</code> – observe application behavior.</p>
                <p>🔍 <strong>Think about:</strong> UDP lacks congestion control; how does it affect the network when a video stream sends at 1 Gbps on a 10 Mbps link?</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <FAQTemplate title="UDP Characteristics FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="UDP is often underappreciated. Show students Wireshark capture of DNS – one query, one response, no handshake. Emphasize that reliability must be built by the application when needed (e.g., QUIC protocol which is UDP + custom reliability). Use the analogy of 'postcards vs. registered mail'. Ask: 'What happens if a UDP packet is lost during a Zoom call?' – video freezes or artifacts, but call continues. Students from Barrackpore can relate to sending letters without acknowledgment!" />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic2;