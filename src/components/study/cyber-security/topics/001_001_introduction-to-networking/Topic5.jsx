import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic5_files/topic5_questions';

const Topic5 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s ease-out forwards;
    }
    .animate-pulse-glow {
      animation: pulseGlow 2s infinite;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-shake {
      animation: shake 0.5s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-shake {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const disadvantages = [
    {
      icon: '🔓',
      title: 'Security Risks',
      desc: 'Networks expose data to potential breaches, hacking, malware, and unauthorized access.',
      detail: 'A single vulnerability can compromise the entire network.'
    },
    {
      icon: '💰',
      title: 'High Initial Cost',
      desc: 'Hardware (switches, routers, cables), software licenses, installation, and training require significant investment.',
      detail: 'Costs can be prohibitive for small organisations.'
    },
    {
      icon: '🏗️',
      title: 'Complexity',
      desc: 'Designing, configuring, and maintaining a network requires specialised skills.',
      detail: 'Mistakes can cause widespread outages.'
    },
    {
      icon: '⚡',
      title: 'Single Point of Failure',
      desc: 'If a key device (like a central switch or server) fails, the entire network may go down.',
      detail: 'Redundancy is needed but adds cost.'
    },
    {
      icon: '🐌',
      title: 'Performance Bottlenecks',
      desc: 'Congestion, slow links, or overloaded servers can degrade user experience.',
      detail: 'A single slow component can affect many users.'
    },
    {
      icon: '👨‍💻',
      title: 'Dependency on Skilled Staff',
      desc: 'Network administrators are needed for setup, monitoring, and troubleshooting.',
      detail: 'Hiring or training staff is an ongoing cost.'
    },
    {
      icon: '🔄',
      title: 'Maintenance Overhead',
      desc: 'Regular updates, patches, hardware replacement, and backups are required.',
      detail: 'Neglect leads to vulnerabilities and failures.'
    },
    {
      icon: '🚫',
      title: 'Network Downtime Impact',
      desc: 'When the network fails, operations can halt, causing productivity loss and financial damage.',
      detail: 'Even short outages can be costly.'
    },
    {
      icon: '📡',
      title: 'Interference & Signal Issues',
      desc: 'Wireless networks suffer from interference, range limitations, and signal degradation.',
      detail: 'Environmental factors can disrupt connectivity.'
    },
    {
      icon: '🧑‍🤝‍🧑',
      title: 'Management & Policy Challenges',
      desc: 'Enforcing policies, managing user access, and monitoring usage require constant effort.',
      detail: 'Policy violations and misuse are common.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* --- Title Section --- */}
        <section
          className="text-center animate-fade-slide-up"
          style={{ animationDelay: '0ms' }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Disadvantages of Networking
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The challenges and risks that come with connecting devices
          </p>
        </section>

        {/* --- Introduction: Why Acknowledge Disadvantages? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            A Balanced View
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              While networking offers incredible advantages, it's not without its downsides.
              Organisations must carefully weigh the benefits against the risks and costs.
              For students like <strong>Susmita</strong> and <strong>Mahima</strong> building a
              network for a project in <strong>Jadavpur</strong>, understanding these disadvantages
              is as important as knowing the advantages.
            </p>
            <p>
              Acknowledging the drawbacks helps in making informed decisions, designing robust
              systems, and preparing for potential pitfalls. In the real world, networks fail,
              get hacked, and cause headaches – professionals mitigate these through careful planning.
            </p>
          </div>

          {/* SVG: Network Risks Illustration */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="240"
              viewBox="0 0 500 240"
              className="w-full max-w-lg h-auto"
              aria-label="Illustration showing network risks: security threats, single point of failure, complexity, cost"
            >
              <rect width="500" height="240" fill="transparent" />

              {/* Central server with warning signs */}
              <rect x="190" y="80" width="120" height="80" rx="8" fill="#ef4444" className="dark:fill-red-400" />
              <text x="250" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Network</text>
              <text x="250" y="135" textAnchor="middle" fill="white" fontSize="12">⚠️ Risks</text>

              {/* Warning icons around */}
              {[
                { x: 30, y: 30, label: 'Hackers', icon: '🔓' },
                { x: 400, y: 30, label: 'Cost', icon: '💰' },
                { x: 30, y: 170, label: 'Complexity', icon: '🧩' },
                { x: 400, y: 170, label: 'Downtime', icon: '⏰' }
              ].map((item, idx) => (
                <g key={idx}>
                  <rect
                    x={item.x}
                    y={item.y}
                    width="70"
                    height="40"
                    rx="6"
                    fill="#fbbf24"
                    className="dark:fill-yellow-500"
                  />
                  <text
                    x={item.x + 35}
                    y={item.y + 18}
                    textAnchor="middle"
                    fontSize="16"
                  >
                    {item.icon}
                  </text>
                  <text
                    x={item.x + 35}
                    y={item.y + 34}
                    textAnchor="middle"
                    fill="#1e293b"
                    className="dark:fill-gray-800"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {item.label}
                  </text>
                </g>
              ))}

              {/* Animated virus/bug around */}
              <text x="120" y="180" fontSize="20" className="animate-shake" style={{ animationDelay: '0.5s' }}>
                🦠
              </text>
              <text x="380" y="60" fontSize="20" className="animate-shake" style={{ animationDelay: '1s' }}>
                💸
              </text>
              <text x="60" y="100" fontSize="20" className="animate-shake" style={{ animationDelay: '1.5s' }}>
                🔒
              </text>

              {/* Connection lines */}
              <line x1="100" y1="70" x2="190" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5" />
              <line x1="400" y1="70" x2="310" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5" />
              <line x1="100" y1="190" x2="190" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5" />
              <line x1="400" y1="190" x2="310" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5" />

              <text x="250" y="230" textAnchor="middle" fill="#ef4444" fontSize="12">
                ⚠️ Networking is not without challenges
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Networks introduce risks that must be managed proactively.
          </p>
        </section>

        {/* --- Detailed Disadvantages (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Key Disadvantages in Detail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disadvantages.map((dis, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {dis.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {dis.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {dis.desc}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                  {dis.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Real-world Scenario: Network Failure in a Hospital --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Real-world Scenario: When Networks Fail
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Imagine a hospital in <strong>Kolkata</strong> where the network goes down for 30 minutes.
              The impact is severe:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Patient records</strong> become inaccessible – doctors cannot retrieve history.</li>
              <li><strong>Patient monitors</strong> stop sending data to central stations.</li>
              <li><strong>Pharmacy systems</strong> cannot process medication orders.</li>
              <li><strong>Appointments</strong> and billing systems are offline.</li>
              <li><strong>Communication</strong> via internal messaging fails.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              <span className="text-red-600 dark:text-red-400">⚠️</span> This is why network reliability and redundancy are critical.
              The disadvantages of networking can have life-or-death consequences.
            </p>
          </div>
        </section>

        {/* --- Mitigation Strategies (How to Overcome Disadvantages) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Mitigation Strategies
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🛡️</span>
              <div>
                <strong>Security:</strong> Use firewalls, encryption, strong authentication, and regular security audits.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⚡</span>
              <div>
                <strong>Redundancy:</strong> Implement backup links, power supplies, and failover mechanisms to eliminate single points of failure.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🧠</span>
              <div>
                <strong>Training:</strong> Invest in skilled staff and continuous training to manage complexity.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📊</span>
              <div>
                <strong>Monitoring:</strong> Use network monitoring tools to detect issues early and plan capacity.
              </div>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Always budget for redundancy</strong> – it's cheaper than downtime.</li>
                <li><strong>Document everything</strong> – network diagrams, configurations, and policies.</li>
                <li><strong>Regularly test disaster recovery</strong> – don't wait for a real failure.</li>
                <li><strong>Use layered security</strong> – defense in depth.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Ignoring <strong>security</strong> until after a breach occurs.</li>
                <li>Underestimating the <strong>cost of maintenance</strong> – ongoing expenses add up.</li>
                <li>Assuming a <strong>single vendor</strong> solves all problems – it introduces vendor lock-in.</li>
                <li>Not having a <strong>backup plan</strong> – when the network fails, chaos ensues.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Checklist to Mitigate Networking Disadvantages
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Risk Assessment:</strong> Identify critical assets and potential threats.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Budget for Redundancy:</strong> Include backup links, power, and hardware in planning.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement Robust Security:</strong> Firewalls, encryption, intrusion detection, and regular updates.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document and Train:</strong> Maintain network documentation and train staff on procedures.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Monitor Continuously:</strong> Use tools to track performance and detect anomalies.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for Failure:</strong> Develop and test incident response and disaster recovery plans.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '700ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Think about a time when your internet or a network you use went down. What was the impact?
            How did people cope? What could have been done to prevent or minimise the outage?
            Consider the disadvantages we've discussed and how they played out in that situation.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "It's easy to focus on the benefits of networking, but professionals must also be pessimistic – planning for failures, attacks, and mistakes. Teach students to think like a 'devil's advocate' when designing networks. This mindset will save them from painful failures later. Also, remind them that the disadvantages are not reasons to avoid networking, but reasons to invest in proper design and management."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Disadvantages of Networking FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic5;