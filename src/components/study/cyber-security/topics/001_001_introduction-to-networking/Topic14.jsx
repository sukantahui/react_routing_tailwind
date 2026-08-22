import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic14_files/topic14_questions';

const Topic14 = () => {
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
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
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
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-pulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const csCharacteristics = [
    'Centralized server(s) provide services',
    'Clients request services, servers respond',
    'Clear separation of roles',
    'Managed and controlled environment',
    'Scalable with server upgrades',
    'Centralized security and policy enforcement',
  ];

  const csExamples = [
    {
      icon: '🌐',
      name: 'Web Servers',
      desc: 'Apache, Nginx – clients (browsers) request web pages; servers respond with content.',
    },
    {
      icon: '📧',
      name: 'Email Servers',
      desc: 'SMTP, IMAP, POP3 – clients access their email through servers.',
    },
    {
      icon: '🗄️',
      name: 'Database Servers',
      desc: 'MySQL, PostgreSQL – clients query and update data managed by the server.',
    },
    {
      icon: '☁️',
      name: 'Cloud Services',
      desc: 'AWS, Azure – clients use cloud resources via APIs and web interfaces.',
    },
  ];

  const csAdvantages = [
    'Centralized management – easier to administer',
    'Strong security – controlled access and monitoring',
    'Scalability – server upgrades handle more clients',
    'Data integrity – backups and consistency maintained',
    'Cost-effective for large organizations',
  ];

  const csDisadvantages = [
    'Single point of failure – server outage affects all',
    'High initial cost – server hardware and software',
    'Performance bottleneck – server can be overwhelmed',
    'Dependence on network to reach the server',
    'Maintenance overhead – updates and backups',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Client-Server Network
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The backbone of modern applications – where servers power clients
          </p>
        </section>

        {/* --- Introduction: What is Client-Server? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is Client-Server Architecture?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              The <strong>client-server</strong> model is the most widely used network architecture.
              It involves two distinct roles: <strong>clients</strong> that request services and
              <strong>servers</strong> that provide them. This model powers the web, email, databases,
              cloud computing, and almost every enterprise application.
            </p>
            <p>
              In client-server, servers are powerful machines dedicated to serving requests, often
              with high availability, security, and performance. Clients are typically end-user
              devices (computers, phones, tablets) that access these services.
            </p>
            <p>
              For students like <strong>Mamata</strong> and <strong>Abhronila</strong> in
              <strong>Kolkata</strong>, when they access the university's online portal, they are
              using client-server – their browser is the client, and the university's web server
              is the server.
            </p>
          </div>

          {/* SVG: Client-Server Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="550"
              height="250"
              viewBox="0 0 550 250"
              className="w-full max-w-lg h-auto"
              aria-label="Illustration of a client-server network showing clients connected to a central server"
            >
              <rect width="550" height="250" fill="transparent" />

              {/* Central server */}
              <rect x="220" y="80" width="110" height="80" rx="8" fill="#3b82f6" className="dark:fill-blue-400" />
              <text x="275" y="115" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Server</text>
              <text x="275" y="140" textAnchor="middle" fill="white" fontSize="11">(Web, DB, Email)</text>

              {/* Clients */}
              {[
                { x: 40, y: 40, label: 'Client 1' },
                { x: 40, y: 160, label: 'Client 2' },
                { x: 460, y: 40, label: 'Client 3' },
                { x: 460, y: 160, label: 'Client 4' },
              ].map((client, idx) => (
                <g key={idx}>
                  <rect
                    x={client.x}
                    y={client.y}
                    width="70"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={client.x + 35}
                    y={client.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {client.label}
                  </text>
                </g>
              ))}

              {/* Connections from clients to server */}
              {[
                { x1: 110, y1: 60, x2: 220, y2: 100 },
                { x1: 110, y1: 180, x2: 220, y2: 140 },
                { x1: 460, y1: 60, x2: 330, y2: 100 },
                { x1: 460, y1: 180, x2: 330, y2: 140 },
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
                <animate attributeName="cx" values="110;220;110" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="60;100;60" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="330;460;330" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="cy" values="100;60;100" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>

              {/* Label */}
              <text x="275" y="230" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Clients request → Server responds
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            In client-server, clients communicate with a central server for services.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Key Characteristics of Client-Server
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {csCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-blue-500 dark:text-blue-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Examples --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Common Client-Server Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {csExamples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {ex.icon}
                  </span>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    {ex.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Client-Server vs P2P Comparison (revisit) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Client-Server vs Peer-to-Peer
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Aspect</th>
                  <th className="px-4 py-2 text-left">Client-Server</th>
                  <th className="px-4 py-2 text-left">P2P</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Roles</td>
                  <td className="px-4 py-2">Server provides, clients consume</td>
                  <td className="px-4 py-2">Each peer is both client and server</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Centralized</td>
                  <td className="px-4 py-2">Yes (server)</td>
                  <td className="px-4 py-2">No (decentralized)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Scalability</td>
                  <td className="px-4 py-2">Server becomes bottleneck</td>
                  <td className="px-4 py-2">Scales with peers</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Fault Tolerance</td>
                  <td className="px-4 py-2">Server failure = system down</td>
                  <td className="px-4 py-2">Resilient</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Management</td>
                  <td className="px-4 py-2">Centralized control</td>
                  <td className="px-4 py-2">No central control</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Examples</td>
                  <td className="px-4 py-2">Websites, email, databases</td>
                  <td className="px-4 py-2">BitTorrent, Bitcoin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Real-world Scenario: School Management System --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Real-world Example: School Management
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A school in <strong>Barrackpore</strong> uses a client-server system to manage
              student records and online classes. <strong>Mamata</strong>, <strong>Mahima</strong>,
              and <strong>Debangshu</strong> interact with it daily:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Client (student's device):</strong> Web browser or mobile app.</li>
              <li><strong>Server (school's infrastructure):</strong> Web server, database server, and file server.</li>
              <li><strong>Actions:</strong> Students log in to view grades, submit assignments, and download study materials.</li>
              <li><strong>Centralization:</strong> All student data is stored securely and backed up regularly.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This model ensures consistency, security, and easy administration.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Client-Server
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {csAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {csDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Types of Servers --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Common Types of Servers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Web Server', desc: 'Serves HTML pages and assets (Apache, Nginx).' },
              { name: 'Database Server', desc: 'Manages structured data (MySQL, PostgreSQL).' },
              { name: 'File Server', desc: 'Stores and shares files (SMB, NFS).' },
              { name: 'Email Server', desc: 'Handles incoming/outgoing email (Exchange, Postfix).' },
              { name: 'Application Server', desc: 'Executes business logic (Tomcat, JBoss).' },
              { name: 'DNS Server', desc: 'Resolves domain names to IP addresses.' },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">{srv.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>load balancers</strong> to distribute client requests across multiple servers.</li>
                <li>Implement <strong>caching</strong> (CDN, Redis) to reduce server load.</li>
                <li>Regularly <strong>backup</strong> and test disaster recovery.</li>
                <li>Monitor server <strong>performance</strong> and set up alerts for anomalies.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Underestimating <strong>server capacity</strong> – leads to crashes under load.</li>
                <li>Not having <strong>redundancy</strong> – single server is a single point of failure.</li>
                <li>Ignoring <strong>security updates</strong> – servers are prime targets.</li>
                <li>Poor <strong>network configuration</strong> – clients may not reach the server.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Client-Server Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Define service requirements:</strong> What services will the server provide?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose server hardware/OS:</strong> Based on expected load and reliability.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Install and configure server software:</strong> Web server, DB, etc.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement security:</strong> Firewall, encryption, authentication.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Set up monitoring and logging:</strong> Track health and performance.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for scalability:</strong> Load balancers, clustering, caching.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '1000ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Think about your favorite website. What servers are involved? Web server, database
            server, perhaps an application server. Try to trace a request from your browser to
            the server and back. How does the server handle thousands of simultaneous requests?
            This is where load balancing and scaling come in.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Client-server is the backbone of enterprise IT. Emphasize the importance of server security, updates, and monitoring. Also, discuss the difference between thick (fat) clients and thin clients – a great segue into cloud computing. Hands-on: let students set up a simple web server on a VM and access it from a browser to see the architecture in action."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Client-Server Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic14;