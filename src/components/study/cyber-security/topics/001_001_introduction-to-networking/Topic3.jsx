import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic3_files/topic3_questions';

const Topic3 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes fillPillar {
      0% { height: 0; }
      100% { height: var(--pillar-height); }
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
    .animate-pillar {
      animation: fillPillar 1.2s ease-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-pillar {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        height: var(--pillar-height) !important;
      }
    }
  `;

  const characteristics = [
    {
      title: 'Resource Sharing',
      desc: 'Hardware (printers, storage), software, and data can be accessed by multiple users.',
      icon: '🔄',
    },
    {
      title: 'Scalability',
      desc: 'The ability to grow by adding new nodes and links without major redesign.',
      icon: '📈',
    },
    {
      title: 'Reliability',
      desc: 'Networks should deliver data correctly and consistently, even under load.',
      icon: '✅',
    },
    {
      title: 'Security',
      desc: 'Protection against unauthorized access, data breaches, and malicious attacks.',
      icon: '🔒',
    },
    {
      title: 'Performance',
      desc: 'Measured by bandwidth, throughput, latency – determines user experience.',
      icon: '⚡',
    },
    {
      title: 'Fault Tolerance',
      desc: 'The ability to continue operating in the event of a component failure.',
      icon: '🛡️',
    },
    {
      title: 'Cost-Effectiveness',
      desc: 'Balancing performance with budget – economical to build and maintain.',
      icon: '💰',
    },
    {
      title: 'Interoperability',
      desc: 'Devices from different vendors can work together using common protocols.',
      icon: '🤝',
    },
    {
      title: 'Centralised Management',
      desc: 'Administrators can monitor and configure the network from a single point.',
      icon: '🎛️',
    },
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Characteristics of a Computer Network
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The essential qualities that make networks effective and reliable
          </p>
        </section>

        {/* --- Introduction --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What Makes a Network a Network?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A computer network is more than just a bunch of connected devices. Its true value
              lies in a set of <strong>characteristics</strong> that determine how well it serves
              its users. Think of these characteristics as the <em>personality</em> of a network –
              they define its strengths, weaknesses, and overall usefulness.
            </p>
            <p>
              For students like <strong>Mamata</strong> and <strong>Abhronila</strong> in a school
              lab, a network with good characteristics means fast file access, reliable printing,
              and safe storage of projects. For a bank in <strong>Kolkata</strong>, it means
              secure transactions and zero downtime.
            </p>
          </div>

          {/* SVG: Network characteristics as pillars */}
          <div className="mt-6 flex justify-center">
            <svg
              width="600"
              height="220"
              viewBox="0 0 600 220"
              className="w-full max-w-xl h-auto"
              aria-label="Network characteristics as pillars supporting a structure"
            >
              <rect width="600" height="220" fill="transparent" />

              {/* Top bar (network) */}
              <rect x="20" y="10" width="560" height="20" rx="4" fill="#3b82f6" className="dark:fill-blue-400" />
              <text x="300" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Network</text>

              {/* Pillars */}
              {[
                { x: 40, label: 'Sharing', color: '#3b82f6', height: 60 },
                { x: 100, label: 'Scalable', color: '#8b5cf6', height: 70 },
                { x: 160, label: 'Reliable', color: '#10b981', height: 50 },
                { x: 220, label: 'Secure', color: '#ef4444', height: 80 },
                { x: 280, label: 'Performant', color: '#f59e0b', height: 65 },
                { x: 340, label: 'Fault Tol.', color: '#ec4899', height: 55 },
                { x: 400, label: 'Cost-Eff.', color: '#14b8a6', height: 60 },
                { x: 460, label: 'Interop.', color: '#6366f1', height: 70 },
                { x: 520, label: 'Managed', color: '#f97316', height: 75 },
              ].map((pillar, idx) => (
                <g key={idx}>
                  <rect
                    x={pillar.x}
                    y={110 + 80 - pillar.height}
                    width="40"
                    height={pillar.height}
                    fill={pillar.color}
                    opacity="0.8"
                    style={{ '--pillar-height': `${pillar.height}px` }}
                    className="animate-pillar"
                  />
                  <text
                    x={pillar.x + 20}
                    y={120 + 80}
                    textAnchor="middle"
                    fill="#1e293b"
                    className="dark:fill-gray-300"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {pillar.label}
                  </text>
                </g>
              ))}

              {/* Base line */}
              <line x1="20" y1="190" x2="580" y2="190" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-gray-600" />
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Key characteristics – like pillars – support a strong network.
          </p>
        </section>

        {/* --- Detailed Characteristics (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Core Characteristics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {characteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {char.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {char.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {char.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- In-depth: Performance Metrics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Performance Characteristics Deep Dive
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📶</span>
              <div>
                <strong>Bandwidth:</strong> The maximum data transfer rate (like a highway's speed limit).
                Higher bandwidth allows more data to flow.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⏱️</span>
              <div>
                <strong>Latency:</strong> The time delay in data transmission. Low latency is crucial
                for real-time applications (gaming, VoIP).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📊</span>
              <div>
                <strong>Throughput:</strong> The actual amount of data delivered successfully over a period.
                It's the practical measure of performance.
              </div>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: Hospital Network --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Real-world Example: Healthcare Network
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Consider a hospital in <strong>Ichapur</strong> that runs a network connecting
              patient monitors, electronic health records, imaging machines, and administrative
              systems. The network must have:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>High reliability</strong> – patient data cannot be lost.</li>
              <li><strong>Strong security</strong> – medical records are confidential (HIPAA).</li>
              <li><strong>Low latency</strong> – real-time monitoring needs instant updates.</li>
              <li><strong>Fault tolerance</strong> – backup power and redundant paths.</li>
              <li><strong>Scalability</strong> – as the hospital grows, more devices are added.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-green-600 dark:text-green-400">✅</span> Every characteristic is essential for life-saving operations.
            </p>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>When designing a network, <strong>prioritise requirements</strong> – security vs. performance trade-offs.</li>
                <li>Monitor <strong>throughput</strong> not just bandwidth – real usage matters.</li>
                <li>Plan for <strong>fault tolerance</strong> from the start – it's cheaper than retrofitting.</li>
                <li>Document <strong>performance baselines</strong> to detect anomalies.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Confusing <strong>bandwidth and throughput</strong> – they are not the same.</li>
                <li>Overlooking <strong>security</strong> until after deployment.</li>
                <li>Assuming <strong>reliability</strong> is automatic – it needs redundancy.</li>
                <li>Ignoring <strong>scalability</strong> – designing for today only leads to tomorrow's problems.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Checklist for Designing a Good Network
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Define <strong>functional requirements</strong> (users, applications, traffic patterns).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Assess <strong>performance needs</strong> – bandwidth, latency, and throughput thresholds.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Design for <strong>redundancy</strong> – dual power supplies, backup links, failover.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Implement <strong>security layers</strong> – firewall, VPN, access controls.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Plan for <strong>growth</strong> – leave room for extra ports and IPs.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Use <strong>standardised protocols</strong> for interoperability.
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
            Observe a network you use daily – your home Wi-Fi or college lab. Which characteristics
            are strongest? Which are weakest? Try changing something (e.g., connect more devices)
            and see how performance changes. This will help you understand the trade-offs in real life.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Emphasise to students that a network is more than cables and switches; it's a system with trade-offs. A highly secure network may sacrifice convenience; a very fast network might be expensive. The art of networking is balancing these characteristics to meet specific needs. Encourage them to think like a consultant – always ask: 'What does the user truly need?'"
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Characteristics of a Computer Network FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic3;