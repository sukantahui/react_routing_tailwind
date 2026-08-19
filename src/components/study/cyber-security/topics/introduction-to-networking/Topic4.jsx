import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic4_files/topic4_questions';

const Topic4 = () => {
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
    @keyframes fillBar {
      0% { width: 0; }
      100% { width: var(--bar-width); }
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
    .animate-bar {
      animation: fillBar 1.2s ease-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-bar {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        width: var(--bar-width) !important;
      }
    }
  `;

  const advantages = [
    {
      icon: '🔄',
      title: 'Resource Sharing',
      desc: 'Share printers, storage, scanners, and licensed software across many users.',
      detail: 'Reduces hardware costs and maximises utilisation.'
    },
    {
      icon: '💰',
      title: 'Cost Efficiency',
      desc: 'Centralise expensive equipment and software licenses.',
      detail: 'Eliminates the need to buy a printer or software for every employee.'
    },
    {
      icon: '📡',
      title: 'Centralised Data Management',
      desc: 'Store all data on a central server for backup, security, and organisation.',
      detail: 'Simplifies backup, disaster recovery, and access control.'
    },
    {
      icon: '💬',
      title: 'Enhanced Communication',
      desc: 'Email, instant messaging, video conferencing, and VoIP.',
      detail: 'Enables seamless collaboration across locations.'
    },
    {
      icon: '📈',
      title: 'Scalability',
      desc: 'Easily add new users, devices, and services as the organisation grows.',
      detail: 'Flexible architecture adapts to changing needs.'
    },
    {
      icon: '🔒',
      title: 'Improved Security',
      desc: 'Centralised authentication, firewalls, and monitoring.',
      detail: 'Easier to enforce policies and detect threats.'
    },
    {
      icon: '☁️',
      title: 'Remote Access',
      desc: 'Access files and applications from anywhere via VPN or cloud.',
      detail: 'Supports telecommuting and mobile workforces.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      desc: 'Shared workspaces, version control, and real-time editing.',
      detail: 'Teams can work together on projects seamlessly.'
    },
    {
      icon: '⚡',
      title: 'High Availability',
      desc: 'Redundant paths and servers ensure minimal downtime.',
      detail: 'Business continuity even during failures.'
    },
    {
      icon: '📊',
      title: 'Better Management',
      desc: 'Centralised monitoring, logging, and policy enforcement.',
      detail: 'Simplifies network administration and troubleshooting.'
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Advantages of Networking
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            How connecting devices transforms organisations and everyday life
          </p>
        </section>

        {/* --- Introduction: Why Networking is Beneficial --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Why Network?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              In a world where information is power, networking provides the infrastructure to
              harness that power. Whether it's a school in <strong>Barrackpore</strong> where
              students like <strong>Mamata</strong> and <strong>Mahima</strong> share project
              files, or a multinational bank in <strong>Kolkata</strong> processing millions of
              transactions, the advantages of networking are undeniable.
            </p>
            <p>
              Networking transforms isolated computers into a cohesive ecosystem, unlocking
              efficiency, collaboration, and innovation. These advantages are why every modern
              organisation invests in networking infrastructure.
            </p>
          </div>

          {/* SVG: Network Benefits Graphic */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="200"
              viewBox="0 0 500 200"
              className="w-full max-w-lg h-auto"
              aria-label="Illustration showing benefits of networking: centralised storage, communication, sharing, remote access"
            >
              <rect width="500" height="200" fill="transparent" />

              {/* Central server */}
              <rect x="190" y="60" width="120" height="80" rx="8" fill="#3b82f6" className="dark:fill-blue-400" />
              <text x="250" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Server</text>
              <text x="250" y="125" textAnchor="middle" fill="white" fontSize="10">(Data + Apps)</text>

              {/* Connected devices */}
              {[
                { x: 30, y: 30, label: 'PC' },
                { x: 30, y: 130, label: 'Laptop' },
                { x: 400, y: 30, label: 'Printer' },
                { x: 400, y: 130, label: 'Phone' }
              ].map((dev, i) => (
                <g key={i}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="40"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={dev.x + 20}
                    y={dev.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                </g>
              ))}

              {/* Connections */}
              {[
                { x1: 70, y1: 50, x2: 190, y2: 80 },
                { x1: 70, y1: 150, x2: 190, y2: 120 },
                { x1: 400, y1: 50, x2: 310, y2: 80 },
                { x1: 400, y1: 150, x2: 310, y2: 120 }
              ].map((line, idx) => (
                <line
                  key={idx}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  className="dark:stroke-gray-500"
                />
              ))}

              {/* Animated data packets */}
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="70;190;190;70" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50;80;80;50" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="400;310;310;400" dur="3.5s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="cy" values="150;120;120;150" dur="3.5s" repeatCount="indefinite" begin="1s" />
              </circle>

              {/* Labels around */}
              <text x="250" y="180" textAnchor="middle" fill="#3b82f6" fontSize="12" className="dark:fill-blue-300">
                ➔ Sharing • Communication • Centralisation
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            A networked environment enables devices to communicate and share resources seamlessly.
          </p>
        </section>

        {/* --- Advantages Cards (Grid) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Key Advantages in Detail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {adv.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {adv.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {adv.desc}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                  {adv.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Real-world Scenario: Benefits in Education --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Real-world Scenario: Networking in a School
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At a school in <strong>Ichapur</strong>, students <strong>Abhronila</strong> and
              <strong>Debangshu</strong> experience the advantages of networking daily:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Resource Sharing:</strong> They print assignments using the network printer, saving the need for individual printers.</li>
              <li><strong>Centralised Data:</strong> All projects are stored on the school server – no more lost USB drives.</li>
              <li><strong>Communication:</strong> They collaborate via email and Google Classroom, sharing notes and feedback.</li>
              <li><strong>Remote Access:</strong> They can access study materials from home using the school's portal.</li>
              <li><strong>Cost Efficiency:</strong> The school licenses software once and deploys it to all lab computers.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="text-green-600 dark:text-green-400">✅</span> Networking makes education more effective, engaging, and accessible.
            </p>
          </div>
        </section>

        {/* --- Comparative Advantage Table (Visual) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Before vs. After Networking
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Aspect</th>
                  <th className="px-4 py-2 text-left">Without Networking</th>
                  <th className="px-4 py-2 text-left">With Networking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">File Sharing</td>
                  <td className="px-4 py-2">USB drives, email attachments</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">Shared drives, instant access</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Printing</td>
                  <td className="px-4 py-2">Each user needs a printer</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">One network printer for all</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Software</td>
                  <td className="px-4 py-2">Individual licenses per PC</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">Central licensing (site license)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Backup</td>
                  <td className="px-4 py-2">Users must remember to back up</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">Automated central backups</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Communication</td>
                  <td className="px-4 py-2">Phone calls, physical meetings</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">Email, chat, video conferencing</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Remote Work</td>
                  <td className="px-4 py-2">Not possible</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400">Full remote access via VPN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Leverage <strong>virtualisation</strong> to maximise server utilisation.</li>
                <li>Implement <strong>single sign-on (SSO)</strong> to simplify access and enhance security.</li>
                <li>Use <strong>cloud services</strong> to extend advantages (scalability, disaster recovery).</li>
                <li>Regularly audit network usage to identify underutilised resources.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Assuming all advantages come automatically – they need <strong>proper design</strong>.</li>
                <li>Neglecting <strong>security</strong> when sharing resources.</li>
                <li>Overlooking <strong>bandwidth requirements</strong> – too many users can saturate links.</li>
                <li>Failing to train users on how to use shared resources effectively.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Checklist to Maximise Networking Advantages
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Assess needs:</strong> Identify what resources need to be shared and who needs access.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan capacity:</strong> Estimate traffic and storage requirements.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Design for security:</strong> Implement authentication, encryption, and firewalls.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Enable centralised management:</strong> Use tools for monitoring and updates.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Provide training:</strong> Users need to understand how to access shared resources.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Regularly review:</strong> Update policies and hardware as the organisation evolves.
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
            Think about a local business or school you know. What advantages would networking
            bring them? Could they reduce costs, improve communication, or streamline operations?
            Try to map the advantages listed here to a real-life scenario you are familiar with.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Networking's biggest advantage is that it enables collaboration. Remind students that technology is a tool; the real value comes from how people use it. In your lessons, focus on connecting advantages to specific user needs—this makes the theory tangible. Also, stress that benefits like security and scalability are not automatic; they require thoughtful planning."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Advantages of Networking FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic4;