import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';

/**
 * Topic3: Port Addressing
 * 
 * Purpose: Explain TCP/UDP port numbers – how multiple network services coexist on one host.
 * Prototype: N/A (React component)
 * Return: JSX.Element
 * 
 * When & why used:
 * - To identify specific processes or services on a host.
 * - Essential for socket binding, firewalls, NAT, and multiplexing/demultiplexing.
 */

const Topic3 = () => {
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
          <div className="bg-gradient-to-r dark:from-indigo-900/30 from-indigo-100 dark:to-violet-900/30 to-violet-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 leading-relaxed">
              Port Addressing
            </h1>
            <p className="dark:text-gray-300 text-gray-600 mt-3 text-lg leading-relaxed">
              How a single IP address can run thousands of services simultaneously.
            </p>
          </div>
        </section>

        {/* Theory & Detailed Explanation */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-indigo-500 pl-4">
              🧠 Theory & Conceptual Foundation
            </h2>
            <div className="mt-4 space-y-4 dark:text-gray-300 text-gray-700 leading-relaxed">
              <p>
                A <strong className="dark:text-indigo-300 text-indigo-600">port number</strong> is a 16‑bit integer (0–65535) that identifies a specific
                process or network service on a host. Combined with an IP address and transport protocol (TCP/UDP),
                it forms a <span className="font-mono">socket</span> – the endpoint of a network connection.
              </p>
              <p>
                <strong>Port ranges (IANA standard):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><span className="font-mono font-bold">0–1023</span> – <strong>Well‑known ports</strong> (system / privileged). Require root/admin to bind.</li>
                <li><span className="font-mono font-bold">1024–49151</span> – <strong>Registered ports</strong> (user‑level services, e.g., 3306 MySQL).</li>
                <li><span className="font-mono font-bold">49152–65535</span> – <strong>Dynamic / private / ephemeral ports</strong> (temporary client ports).</li>
              </ul>
              <p>
                🧪 <strong>Real‑world analogy:</strong> An apartment building at a street address (IP). Each apartment has a number (port).
                Abhronila lives in apartment 80 (HTTP), Susmita in apartment 443 (HTTPS), and Debangshu in apartment 22 (SSH).
                The mail carrier (network stack) delivers letters (packets) to the correct apartment based on the port number.
              </p>
              <p>
                ⚙️ <strong>Multiplexing & demultiplexing:</strong> The OS uses (protocol, source IP, source port, dest IP, dest port) to direct
                segments to the correct socket. Multiple clients can connect to the same server port (e.g., port 80) because each
                connection is uniquely identified by the client’s ephemeral port.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive SVG – Port multiplexing */}
        <section className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-green-500 pl-4 mb-4">
              📡 Port Demultiplexing (one IP, multiple services)
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="700" height="340" viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                {/* IP address label */}
                <rect x="250" y="40" width="200" height="40" rx="6" fill="#3B82F6" />
                <text x="350" y="65" textAnchor="middle" fill="white" fontWeight="bold">Host: 192.168.1.100</text>

                {/* Incoming packet cloud */}
                <text x="50" y="80" className="dark:fill-gray-300 fill-gray-700" fontSize="14">Incoming</text>
                <text x="50" y="100" className="dark:fill-gray-400 fill-gray-600" fontSize="12">packets</text>
                <path d="M80,120 L130,120 L140,130 L130,140 L80,140 Z" fill="#F59E0B" opacity="0.8" />
                <text x="110" y="133" fill="black" fontSize="10">📦</text>

                {/* Arrow into IP */}
                <line x1="145" y1="130" x2="245" y2="70" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />

                {/* Port boxes under IP */}
                <rect x="80" y="200" width="120" height="50" rx="8" fill="#EF4444" />
                <text x="140" y="220" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">Port 80</text>
                <text x="140" y="238" textAnchor="middle" fill="white" fontSize="11">(HTTP)</text>

                <rect x="260" y="200" width="120" height="50" rx="8" fill="#10B981" />
                <text x="320" y="220" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">Port 443</text>
                <text x="320" y="238" textAnchor="middle" fill="white" fontSize="11">(HTTPS)</text>

                <rect x="440" y="200" width="120" height="50" rx="8" fill="#8B5CF6" />
                <text x="500" y="220" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">Port 22</text>
                <text x="500" y="238" textAnchor="middle" fill="white" fontSize="11">(SSH)</text>

                <rect x="570" y="200" width="100" height="50" rx="8" fill="#EC4899" />
                <text x="620" y="220" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">Port 53</text>
                <text x="620" y="238" textAnchor="middle" fill="white" fontSize="11">(DNS)</text>

                {/* Demultiplexing arrows */}
                <line x1="350" y1="85" x2="140" y2="195" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="350" y1="85" x2="320" y2="195" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="350" y1="85" x2="500" y2="195" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="350" y1="85" x2="620" y2="195" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Animated labels */}
                <text x="190" y="170" fill="#EF4444" fontSize="11" opacity="0">→ HTTP</text>
                <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="0.5s" fill="freeze" />

                <text x="350" y="170" fill="#10B981" fontSize="11" opacity="0">→ HTTPS</text>
                <animate attributeName="opacity" from="0" to="1" begin="1.0s" dur="0.5s" fill="freeze" />

                <text x="510" y="170" fill="#8B5CF6" fontSize="11" opacity="0">→ SSH</text>
                <animate attributeName="opacity" from="0" to="1" begin="1.5s" dur="0.5s" fill="freeze" />

                <text x="630" y="170" fill="#EC4899" fontSize="11" opacity="0">→ DNS</text>
                <animate attributeName="opacity" from="0" to="1" begin="2.0s" dur="0.5s" fill="freeze" />

                <text x="350" y="280" textAnchor="middle" className="dark:fill-gray-400 fill-gray-600" fontSize="12">
                  ⬆ Port numbers direct traffic to the correct process ⬆
                </text>
              </svg>
            </div>
            <p className="text-center dark:text-gray-400 text-gray-500 text-sm mt-3">
              One IP address, many open ports – each serving a different application.
            </p>
          </div>
        </section>

        {/* Real-world, Tips, Best Practices, Mistakes */}
        <div className="space-y-6">
          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-purple-500 pl-4">💼 Real‑world & Industry Usage</h2>
              <ul className="mt-4 space-y-2 list-disc list-inside dark:text-gray-300 text-gray-700 leading-relaxed">
                <li><strong>Web servers</strong> listen on port 80 (HTTP) and 443 (HTTPS).</li>
                <li><strong>Database servers:</strong> MySQL (3306), PostgreSQL (5432), MongoDB (27017).</li>
                <li><strong>Remote access:</strong> SSH (22), Windows RDP (3389), VNC (5900).</li>
                <li><strong>Email:</strong> SMTP (25/587), POP3 (110), IMAP (143).</li>
                <li><strong>Firewall rules:</strong> Allow/deny based on port ranges (e.g., block all except 80/443).</li>
              </ul>
              <div className="mt-4 p-3 dark:bg-gray-700/40 bg-gray-100 rounded-lg">
                <p className="font-mono text-sm">🛠️ <strong>Pro tip:</strong> <code>lsof -i :8080</code> shows which process is using port 8080. <code>netstat -tulpn</code> lists all listening ports.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-red-500 pl-4">⚠️ Common Mistakes & Pitfalls</h2>
              <div className="mt-4 space-y-3 dark:text-gray-300 text-gray-700">
                <p>❌ <strong>Misconception:</strong> “Ports are hardware ports” – No, they are logical software identifiers.</p>
                <p>❌ <strong>Beginner error:</strong> Trying to bind to a well‑known port without root/sudo (permission denied).</p>
                <p>❌ <strong>Port conflicts:</strong> Two processes cannot bind to the same (protocol, IP, port).</p>
                <p>✅ <strong>Checklist:</strong> Use <code class="dark:bg-gray-900 bg-gray-200">netstat -tulpn</code> before starting a service to ensure port is free.</p>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-teal-500 pl-4">✅ Best Practices & Mini Checklist</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-bold dark:text-blue-300 text-blue-700">System/Dev practices</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>Use non‑privileged ports (&gt;1024) for user applications.</li>
                    <li>Bind only to specific IP if multiple interfaces (e.g., 127.0.0.1).</li>
                    <li>Set <code>SO_REUSEADDR</code> to reuse TIME_WAIT ports.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold dark:text-green-300 text-green-700">Student checklist</h3>
                  <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                    <li>✔️ Know the three port ranges and examples.</li>
                    <li>✔️ Understand why ephemeral ports are needed.</li>
                    <li>✔️ Check which ports are open on your own machine.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
            <div className="dark:bg-gray-800 bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold dark:text-white text-gray-800 border-l-4 border-yellow-500 pl-4">💡 Hint Section (Think about...)</h2>
              <div className="mt-3 p-4 dark:bg-gray-700/50 bg-yellow-50 rounded-xl space-y-2">
                <p>🔍 <strong>Observe carefully:</strong> When you visit <code>http://example.com:8080</code>, which port is being used?</p>
                <p>🔍 <strong>Try changing this:</strong> Run <code>python -m http.server 8888</code> and connect via browser. What happens if you run it again on same port?</p>
                <p>🔍 <strong>Think about:</strong> Why does the server know which client to reply to, even though all clients connect to the same server port? (Ephemeral ports on client side.)</p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <FAQTemplate title="Port Addressing FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="Ports are the cornerstone of network multiplexing. Use the apartment building analogy consistently. Show students the /etc/services file (or getservbyname). Have them run 'netstat -tulpn' and identify which ports are listening. Emphasize that port 0 is reserved, and ephemeral ports are chosen by OS. Relate to real scenarios: why can't two web servers both bind to 80? (Port conflict). In Barrackpore classroom, ask: 'If the school has one address, how do letters reach the math department vs. the library?'" />
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

export default Topic3;