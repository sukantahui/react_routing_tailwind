import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic1_files/topic1_questions';

const Topic1 = () => {
  // Inline keyframes for animations
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
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s ease-out forwards;
    }
    .animate-pulse-glow {
      animation: pulseGlow 2s infinite;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const reasons = [
    {
      title: 'Resource Sharing',
      desc: 'Share printers, storage, scanners, and software across multiple users without duplication.',
      icon: '🖨️',
    },
    {
      title: 'Communication & Collaboration',
      desc: 'Email, instant messaging, video conferencing, and collaborative document editing.',
      icon: '💬',
    },
    {
      title: 'Cost Reduction',
      desc: 'Centralise expensive hardware and licensed software, reducing per-user costs.',
      icon: '💰',
    },
    {
      title: 'Centralised Data Management',
      desc: 'Store data on a central server for easy backup, security, and access control.',
      icon: '☁️',
    },
    {
      title: 'Remote Access',
      desc: 'Access files and applications from anywhere – essential for modern hybrid work.',
      icon: '🌐',
    },
    {
      title: 'Scalability & Flexibility',
      desc: 'Add new users and devices easily without disrupting the existing infrastructure.',
      icon: '📈',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Need for Computer Networking
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Why we connect devices – the driving forces behind every network
          </p>
        </section>

        {/* --- Why Do We Need Networks? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why Do We Need Networks?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Imagine a school like <strong>Barrackpore Government High School</strong> where every
              computer works in isolation. Students like <strong>Mamata</strong>,{' '}
              <strong>Mahima</strong>, and <strong>Abhronila</strong> would have to save their
              project files on USB drives, pass them around, and print documents one by one.
              The computer lab would be chaotic, inefficient, and expensive.
            </p>
            <p>
              <strong>Computer networking</strong> eliminates this isolation. It connects devices
              so they can share resources, communicate instantly, and work together seamlessly.
              From a small home network in <strong>Ichapur</strong> to the global internet,
              networking is the invisible engine that powers modern life.
            </p>
          </div>

          {/* SVG Illustration: Isolated vs Networked */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="220"
              viewBox="0 0 500 220"
              className="w-full max-w-lg h-auto"
              aria-label="Comparison: isolated computers vs networked computers"
            >
              <rect width="500" height="220" fill="transparent" />

              {/* Left side: Isolated (no network) */}
              <text x="60" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                ❌ Isolated (No Network)
              </text>
              {[20, 80, 140].map((y, i) => (
                <g key={`iso-${i}`}>
                  <rect x="20" y={y} width="40" height="40" rx="4" fill="#64748b" />
                  <text x="40" y={y + 25} textAnchor="middle" fill="white" fontSize="10">PC</text>
                  {i < 2 && (
                    <line
                      x1="60"
                      y1={y + 20}
                      x2="60"
                      y2={y + 60}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="4"
                    />
                  )}
                </g>
              ))}
              <text x="40" y="195" textAnchor="middle" fill="#ef4444" fontSize="10">
                No sharing
              </text>

              {/* Divider */}
              <line x1="120" y1="10" x2="120" y2="210" stroke="#334155" strokeWidth="1" strokeDasharray="6" />

              {/* Right side: Networked */}
              <text x="280" y="20" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
                ✅ Networked (Connected)
              </text>
              {[20, 80, 140].map((y, i) => (
                <g key={`net-${i}`}>
                  <rect x="180" y={y} width="40" height="40" rx="4" fill="#3b82f6" />
                  <text x="200" y={y + 25} textAnchor="middle" fill="white" fontSize="10">PC</text>
                  <line
                    x1="220"
                    y1={y + 20}
                    x2="310"
                    y2={y + 20}
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                </g>
              ))}
              {/* Central switch */}
              <rect x="310" y="70" width="60" height="60" rx="6" fill="#f59e0b" />
              <text x="340" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Switch</text>
              <text x="340" y="195" textAnchor="middle" fill="#22c55e" fontSize="10">
                Share resources
              </text>

              {/* Animated data flow */}
              <circle r="5" fill="#22c55e">
                <animate attributeName="cx" values="220;310" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="40;100" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#22c55e">
                <animate attributeName="cx" values="310;220" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="cy" values="100;160" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
              </circle>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Networking transforms isolated devices into a collaborative ecosystem.
          </p>
        </section>

        {/* --- Core Reasons (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Core Reasons for Networking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {reason.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-1">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Real-world Scenario (Story) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Real-world Scenario: A Day at Jadavpur University
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Susmita</strong> and <strong>Debangshu</strong> are final-year students at
              Jadavpur University. They need to collaborate on a research paper.
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>
                <strong>Without a network:</strong> They would swap USB drives, email drafts back
                and forth, print separate copies, and use different software versions. Chaos.
              </li>
              <li>
                <strong>With a network:</strong> They use a shared drive to store the paper, work
                simultaneously in Google Docs, print to a network printer, and back up to the
                university server – all while chatting on Slack.
              </li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              <span className="text-green-600 dark:text-green-400">✅ Networking saves time, reduces errors, and fosters teamwork.</span>
            </p>
          </div>
        </section>

        {/* --- Benefits / Need Deep Dive --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The "Need" in Detail
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📦</span>
              <div>
                <strong>Data Centralisation:</strong> One place for all files, simplifying backup
                and disaster recovery. Think of a school server in <strong>Kolkata</strong> that
                stores all student records.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔒</span>
              <div>
                <strong>Security & Access Control:</strong> Networks allow administrators to set
                permissions – who can read, write, or delete files. This protects sensitive data.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⚡</span>
              <div>
                <strong>High Availability:</strong> Redundant paths and servers ensure that even
                if one device fails, the network keeps running. Critical for hospitals and banks.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📡</span>
              <div>
                <strong>Internet Access:</strong> A network is the gateway to the world. Without
                a network, no browsing, no streaming, no cloud services.
              </div>
            </div>
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
                <li>Always start with a <strong>needs assessment</strong> – what do users actually require?</li>
                <li>Plan for <strong>growth</strong>; buy equipment with extra ports and capacity.</li>
                <li>Use <strong>network monitoring</strong> tools to identify bottlenecks early.</li>
                <li>Document every change – network diagrams save hours during troubleshooting.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Underestimating <strong>bandwidth needs</strong> – slow networks frustrate users.</li>
                <li>Neglecting <strong>physical security</strong> – unlocked server rooms are a huge risk.</li>
                <li>Not having a <strong>backup plan</strong> – what happens when the network goes down?</li>
                <li>Ignoring <strong>power protection</strong> – UPS and surge protectors are essential.</li>
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
              ✅ Networking Essentials Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Identify all devices (clients, servers, printers, IoT) that need connectivity.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Calculate approximate bandwidth usage per user/application.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Choose appropriate topology (star, mesh, etc.) based on reliability needs.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Plan for redundancy – backup links, power, and hardware.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Implement basic security (firewall, strong passwords, VLANs).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                Train users on acceptable use policies.
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
            Observe the network in your school or office. What happens when the Wi-Fi goes down?
            Try to identify which resources become unavailable. Which of the "Core Reasons" does
            that outage affect the most? This will help you understand the real dependency on networks.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Always frame networking needs in terms of users and their tasks – not just technology. A network is a solution to a human problem. When planning, ask: 'What does the user need to accomplish?' Also, remember the 80/20 rule: 80% of problems come from 20% of the configuration. Stay disciplined with documentation."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Need for Computer Networking FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic1;