import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

/**
 * Topic1: TCP 4-way Termination (TCP connection teardown)
 * 
 * Purpose: Gracefully close a TCP connection with FIN/ACK handshake.
 * Prototype: N/A (React component)
 * Return: JSX.Element
 * 
 * When & why used:
 * - After data transfer is complete, to release resources and ensure data integrity.
 * - Prevents half-open connections and orphaned sockets.
 */

const Topic1 = () => {
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
        {/* Header Section */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <div className="bg-gradient-to-r dark:from-red-900/30 from-red-100 dark:to-rose-900/30 to-rose-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 leading-relaxed">
              TCP 4‑Way Termination
            </h1>
            <p className="dark:text-gray-300 text-gray-600 mt-3 text-lg leading-relaxed">
              The polite goodbye: how TCP connections close gracefully, ensuring no data is lost.
            </p>
          </div>
        </section>

        {/* Theory & Detailed Explanation */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-red-500 pl-4">
              🧠 Theory & Conceptual Foundation
            </h2>
            <div className="mt-4 space-y-4 dark:text-gray-300 text-gray-700 leading-relaxed">
              <p>
                TCP is full‑duplex: each direction must be closed independently. The 4‑way termination handshake
                ensures both sides agree to close and that any in‑flight data is delivered.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li><strong className="font-mono">FIN</strong> – Active closer sends FIN (finish) segment.</li>
                <li><strong className="font-mono">ACK</strong> – Passive closer acknowledges the FIN (connection half‑closed).</li>
                <li><strong className="font-mono">FIN</strong> – Passive closer sends its own FIN when ready.</li>
                <li><strong className="font-mono">ACK</strong> – Active closer acknowledges the second FIN.</li>
              </ol>
              <p>
                🧪 <strong>Real‑world analogy:</strong> Susmita (in Ichapur) says <em>“I’m done talking (FIN)”</em> to Debangshu (in Kolkata).
                Debangshu says <em>“OK, I heard you (ACK)”</em> but may still have more to say. Later Debangshu says <em>“I’m done too (FIN)”</em>,
                Susmita replies <em>“Goodbye (ACK)”</em>. Call ends.
              </p>
              <p>
                ⚙️ <strong>State transitions:</strong> FIN_WAIT_1, FIN_WAIT_2, CLOSE_WAIT, LAST_ACK, TIME_WAIT, CLOSED.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive SVG – TCP 4‑way termination with native SVG <animate> */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-green-500 pl-4 mb-4">
              📡 Packet Walkthrough (dynamic animation)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="650" height="400" viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* Client (active closer) */}
                <rect x="40" y="160" width="130" height="50" rx="8" fill="#EF4444" className="dark:fill-red-700 fill-red-500" />
                <text x="105" y="190" textAnchor="middle" fill="white" fontWeight="bold">Client (active)</text>

                {/* Server (passive closer) */}
                <rect x="480" y="160" width="130" height="50" rx="8" fill="#F59E0B" className="dark:fill-amber-700 fill-amber-500" />
                <text x="545" y="190" textAnchor="middle" fill="white" fontWeight="bold">Server (passive)</text>

                {/* FIN → */}
                <line x1="170" y1="185" x2="470" y2="180" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="470,180 460,176 462,184" fill="#DC2626" />
                <text x="270" y="145" fill="#DC2626" fontSize="13" fontWeight="bold">
                  FIN (seq=u)
                  <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.8s" fill="freeze" />
                </text>

                {/* ACK ← */}
                <line x1="480" y1="220" x2="180" y2="225" stroke="#10B981" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="180,225 190,229 188,221" fill="#10B981" />
                <text x="300" y="265" fill="#10B981" fontSize="13" fontWeight="bold">
                  ACK (ack=u+1)
                  <animate attributeName="opacity" from="0" to="1" begin="1.2s" dur="0.8s" fill="freeze" />
                </text>

                {/* FIN ← (server initiates its own close) */}
                <line x1="490" y1="280" x2="180" y2="285" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="180,285 190,281 188,289" fill="#DC2626" />
                <text x="280" y="320" fill="#DC2626" fontSize="13" fontWeight="bold">
                  FIN (seq=v)
                  <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.8s" fill="freeze" />
                </text>

                {/* ACK → final */}
                <line x1="170" y1="350" x2="470" y2="340" stroke="#10B981" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="470,340 460,336 462,344" fill="#10B981" />
                <text x="270" y="375" fill="#10B981" fontSize="13" fontWeight="bold">
                  ACK (ack=v+1)
                  <animate attributeName="opacity" from="0" to="1" begin="3.6s" dur="0.8s" fill="freeze" />
                </text>

                {/* State labels */}
                <text x="20" y="110" fontSize="11" className="dark:fill-gray-400 fill-gray-600">ESTABLISHED</text>
                <text x="20" y="270" fontSize="11" className="dark:fill-gray-400 fill-gray-600">FIN_WAIT_1</text>
                <text x="20" y="390" fontSize="11" className="dark:fill-gray-400 fill-gray-600">TIME_WAIT</text>
                <text x="630" y="110" fontSize="11" className="dark:fill-gray-400 fill-gray-600">ESTABLISHED</text>
                <text x="630" y="270" fontSize="11" className="dark:fill-gray-400 fill-gray-600">CLOSE_WAIT</text>
                <text x="630" y="390" fontSize="11" className="dark:fill-gray-400 fill-gray-600">LAST_ACK</text>
              </svg>
            </div>
            <p className="text-center dark:text-gray-400 text-gray-500 text-sm mt-3">
              Animated sequence: FIN → ACK → FIN → ACK &nbsp;|&nbsp; Observe the directional closing.
            </p>
          </div>
        </section>

        {/* Real-world, Tips, Best Practices, Mistakes */}
        <div className="space-y-6">
          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-purple-500 pl-4">💼 Real‑world & Industry Usage</h2>
              <ul className="mt-4 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-700 leading-relaxed">
                <li><strong>Web servers (nginx, Apache):</strong> Keep‑alive connections closed with FIN after timeout.</li>
                <li><strong>Database connection pools:</strong> Graceful shutdown uses 4‑way handshake to avoid data loss.</li>
                <li><strong>SSH sessions:</strong> Typing <code className="dark:bg-gray-900 bg-gray-200 px-1 rounded">exit</code> triggers FIN from client.</li>
              </ul>
              <div className="mt-4 p-3 dark:bg-gray-700/40 bg-gray-100 rounded-lg">
                <p className="font-mono text-sm">🛠️ <strong>Pro tip:</strong> Use <code className="dark:bg-gray-900 bg-gray-200 px-1 rounded">ss -tan | grep -E 'FIN|CLOSE'</code> to see connections in termination states.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-red-500 pl-4">⚠️ Common Mistakes & Pitfalls</h2>
              <div className="mt-4 space-y-3 dark:text-gray-300 text-gray-700">
                <p>❌ <strong>Misconception:</strong> “Both FINs are sent together” – No, each direction is closed independently.</p>
                <p>❌ <strong>Beginner error:</strong> Thinking <code className="dark:bg-gray-900 bg-gray-200">close()</code> immediately ends the connection (it initiates FIN but may linger).</p>
                <p>❌ <strong>SO_LINGER misuse:</strong> Setting zero linger can cause RST instead of graceful FIN.</p>
                <p>✅ <strong>Checklist:</strong> Always call <code className="dark:bg-gray-900 bg-gray-200">shutdown(sock, SHUT_WR)</code> before close for half‑close semantics.</p>
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
                    <li>Always handle <code className="dark:bg-gray-900 bg-gray-200">ECONNRESET</code> errors (peer sent RST).</li>
                    <li>Use <code className="dark:bg-gray-900 bg-gray-200">shutdown(SHUT_RD)</code> to reject further data.</li>
                    <li>Set <code className="dark:bg-gray-900 bg-gray-200">SO_REUSEADDR</code> to avoid TIME_WAIT blocking server restart.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold dark:text-green-300 text-green-700">Student checklist</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>✔️ Can you draw the 4 steps with FIN/ACK?</li>
                    <li>✔️ Why does TIME_WAIT exist?</li>
                    <li>✔️ What is a half‑closed connection?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-yellow-500 pl-4">💡 Hint Section (Think about...)</h2>
              <div className="mt-3 p-4 dark:bg-gray-700/50 bg-yellow-50 rounded-xl space-y-2">
                <p>🔍 <strong>Observe carefully:</strong> After the first ACK, the passive closer can still send data. Why is this useful? (Hint: file transfer finishing).</p>
                <p>🔍 <strong>Try changing this:</strong> Call <code className="dark:bg-gray-900 bg-gray-200">close()</code> vs <code className="dark:bg-gray-900 bg-gray-200">shutdown()</code> in a Python socket – observe with Wireshark.</p>
                <p>🔍 <strong>Think about:</strong> What would happen if the final ACK is lost? (The passive closer retransmits FIN – TIME_WAIT saves the day).</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <FAQTemplate title="TCP 4‑Way Termination FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="The termination is often overlooked but critical for resource cleanup. Use the analogy of two people leaving a room: each says 'I'm done' and waits for acknowledgment. Emphasize TIME_WAIT duration (2×MSL) – it's a common exam question. Show students netstat with TIME_WAIT after closing a browser. Help them differentiate between active and passive close – the peer that sends the first FIN is the active closer." />
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

export default Topic1;