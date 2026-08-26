import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

/**
 * Topic0: TCP 3-way Handshake
 * 
 * Purpose: Explain how TCP establishes a reliable connection using SYN, SYN-ACK, ACK.
 * Prototype: N/A (React component)
 * Return: JSX.Element
 * 
 * When & why used:
 * - Before any data transfer in TCP/IP networks.
 * - Ensures both sides are ready, synchronizes sequence numbers, and allocates resources.
 */

const Topic0 = () => {
  // Dark mode state (default true)
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark class to document root when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="dark:bg-gray-900 bg-gray-50 min-h-screen py-12 px-4 transition-colors duration-300">
      {/* Theme toggle button – supports both light/dark modes */}
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
          <div className="bg-gradient-to-r dark:from-blue-900/30 from-blue-100 dark:to-indigo-900/30 to-indigo-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 leading-relaxed">
              TCP 3‑Way Handshake
            </h1>
            <p className="dark:text-gray-300 text-gray-600 mt-3 text-lg leading-relaxed">
              The foundational ritual that establishes every reliable TCP connection.
            </p>
          </div>
        </section>

        {/* Theory & Detailed Explanation */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:dark:bg-gray-750">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-blue-500 pl-4">
              🧠 Theory & Conceptual Foundation
            </h2>
            <div className="mt-4 space-y-4 dark:text-gray-300 text-gray-700 leading-relaxed">
              <p>
                TCP (Transmission Control Protocol) is a connection‑oriented protocol. Before any data can flow,
                two peers must synchronize and agree upon initial sequence numbers. This is done through a <strong className="dark:text-blue-300 text-blue-600">three‑step process</strong>:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong className="font-mono">SYN</strong> – Client sends a segment with SYN flag = 1, choosing a random initial sequence number (ISN).</li>
                <li><strong className="font-mono">SYN-ACK</strong> – Server replies with SYN+ACK, acknowledging the client's ISN, and sends its own ISN.</li>
                <li><strong className="font-mono">ACK</strong> – Client acknowledges the server’s ISN. Connection enters <span className="font-mono">ESTABLISHED</span> state.</li>
              </ol>
              <p>
                🧪 <strong>Real‑world analogy:</strong> Imagine Mamata (in Barrackpore) wants to talk to Prof. Abhronila (in Jadavpur).
                Mamata says <em>“Hello, can we talk? (SYN)”</em>. Prof. replies <em>“Yes, I can hear you! (SYN-ACK)”</em>.
                Mamata confirms <em>“Great, let’s start (ACK)”</em> – conversation begins.
              </p>
              <p>
                ⚙️ <strong>Sequence numbers</strong> prevent old/duplicate packets from being misinterpreted. Each side increments its ISN by the number of bytes sent.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive SVG – TCP 3‑way handshake diagram with native SVG <animate> */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-green-500 pl-4 mb-4">
              📡 Packet Walkthrough (animated)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="650" height="350" viewBox="0 0 650 350" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* Client label */}
                <rect x="50" y="140" width="120" height="50" rx="8" fill="#3B82F6" className="dark:fill-blue-600 fill-blue-500" />
                <text x="110" y="170" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Client</text>
                
                {/* Server label */}
                <rect x="480" y="140" width="120" height="50" rx="8" fill="#10B981" className="dark:fill-emerald-700 fill-emerald-600" />
                <text x="540" y="170" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">Server</text>
                
                {/* Arrow SYN → */}
                <line x1="170" y1="165" x2="470" y2="145" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="470,145 460,141 462,149" fill="#F59E0B" />
                <text x="280" y="125" fill="#F59E0B" fontSize="13" fontWeight="bold">
                  SYN (seq=x)
                  <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.8s" fill="freeze" />
                </text>

                {/* Arrow SYN-ACK ← */}
                <line x1="480" y1="200" x2="180" y2="220" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="180,220 190,224 188,216" fill="#8B5CF6" />
                <text x="300" y="250" fill="#8B5CF6" fontSize="13" fontWeight="bold">
                  SYN-ACK (seq=y, ack=x+1)
                  <animate attributeName="opacity" from="0" to="1" begin="1.2s" dur="0.8s" fill="freeze" />
                </text>

                {/* Arrow ACK → */}
                <line x1="170" y1="260" x2="470" y2="240" stroke="#EC4899" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="470,240 460,236 462,244" fill="#EC4899" />
                <text x="270" y="295" fill="#EC4899" fontSize="13" fontWeight="bold">
                  ACK (ack=y+1)
                  <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.8s" fill="freeze" />
                </text>

                {/* State labels animation */}
                <text x="40" y="110" fontSize="12" className="dark:fill-gray-400 fill-gray-600">CLOSED</text>
                <text x="40" y="310" fontSize="12" className="dark:fill-gray-400 fill-gray-600" opacity="0.8">ESTABLISHED</text>
                <text x="610" y="110" fontSize="12" className="dark:fill-gray-400 fill-gray-600">LISTEN</text>
                <text x="610" y="310" fontSize="12" className="dark:fill-gray-400 fill-gray-600">ESTABLISHED</text>
              </svg>
            </div>
            <p className="text-center dark:text-gray-400 text-gray-500 text-sm mt-3">
              Animated reveal: SYN → SYN-ACK → ACK &nbsp;|&nbsp; Hover over the diagram to pause (no motion if prefers-reduced-motion)
            </p>
          </div>
        </section>

        {/* Real‑world usage, Tips & Tricks, Best Practices, Common Mistakes */}
        <div className="space-y-6">
          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-purple-500 pl-4">💼 Real‑world & Industry Usage</h2>
              <ul className="mt-4 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-700 leading-relaxed">
                <li><strong>Web browsing:</strong> HTTPS/HTTP – every request starts with a handshake.</li>
                <li><strong>Databases (PostgreSQL, MySQL):</strong> TCP connections are established once, reused.</li>
                <li><strong>SSH & remote shells:</strong> Secure terminal sessions rely on TCP handshake.</li>
              </ul>
              <div className="mt-4 p-3 dark:bg-gray-700/40 bg-gray-100 rounded-lg">
                <p className="font-mono text-sm">🛠️ <strong>Pro tip:</strong> Use <code className="dark:bg-gray-900 bg-gray-200 px-1 rounded">tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0'</code> to observe handshake packets live.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-red-500 pl-4">⚠️ Common Mistakes & Pitfalls</h2>
              <div className="mt-4 space-y-3 dark:text-gray-300 text-gray-700">
                <p>❌ <strong>Misconception:</strong> “Handshake only happens once forever” – Actually each TCP connection has its own handshake.</p>
                <p>❌ <strong>Beginner error:</strong> Confusing SYN-ACK as two separate segments (it's a single packet with both flags).</p>
                <p>❌ <strong>Firewall blockage:</strong> SYN packets dropped → connection hangs (no response).</p>
                <p>✅ <strong>Checklist after handshake failure:</strong> Verify port listening, firewall rules, and net.ipv4.tcp_syn_retries.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-teal-500 pl-4">✅ Best Practices & Mini Checklist</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-bold dark:text-blue-300 text-blue-700">For network engineers / devs</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>Keep SYN backlog (net.core.somaxconn) adequate.</li>
                    <li>Use SYN cookies to prevent SYN flood attacks.</li>
                    <li>Monitor tcpHalfOpenDrop counters.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold dark:text-green-300 text-green-700">Student checklist</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>✔️ Can you name all three flags and direction?</li>
                    <li>✔️ Why do we need sequence numbers?</li>
                    <li>✔️ What happens if ACK is lost?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:hover:bg-gray-750">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-yellow-500 pl-4">💡 Hint Section (Think about...)</h2>
              <div className="mt-3 p-4 dark:bg-gray-700/50 bg-yellow-50 rounded-xl space-y-2">
                <p>🔍 <strong>Observe carefully:</strong> The ACK packet carries an acknowledgement number that is <code>ISN(server)+1</code> – what would happen if it were <em>ISN(server)+0</em>?</p>
                <p>🔍 <strong>Try changing this:</strong> In a Python socket, call <code>socket.connect()</code> – which handshake packets does the OS generate internally?</p>
                <p>🔍 <strong>Think about:</strong> Why does the client start with a random ISN and not 0 or 1? (Security: avoid spoofing and old segments)</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <FAQTemplate title="TCP 3‑Way Handshake FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="The 3‑way handshake is the door to reliable communication — emphasize the state diagram and SYN/SYN-ACK/ACK. Ask students: 'What if the second SYN-ACK never arrives?' This teaches timeout & retransmission logic. Use Wireshark to see the 'colourful' packets: SYN red, SYN‑ACK purple, ACK pink. Relate to Barrackpore–Jadavpur bus analogy: first check if the bus is ready!" />
        </div>
      </div>

      {/* Inline keyframes for fadeSlideUp (no external dependencies) */}
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
          .animate-[fadeSlideUp*] {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic0;