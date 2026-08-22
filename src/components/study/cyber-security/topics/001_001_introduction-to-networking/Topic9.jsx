import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic9_files/topic9_questions';

const Topic9 = () => {
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
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
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
    .animate-blink {
      animation: blink 1s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-blink {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const lanComponents = [
    {
      icon: '🖥️',
      name: 'End Devices',
      desc: 'Computers, printers, servers, and other devices that are the source or destination of data.',
    },
    {
      icon: '🔌',
      name: 'Switches',
      desc: 'Connect devices within a LAN and forward data based on MAC addresses.',
    },
    {
      icon: '📡',
      name: 'Access Points (AP)',
      desc: 'Allow wireless devices to connect to the LAN (Wi-Fi).',
    },
    {
      icon: '🔗',
      name: 'Cables',
      desc: 'Ethernet cables (twisted pair, fiber) provide physical connections.',
    },
    {
      icon: '🌐',
      name: 'Router (Gateway)',
      desc: 'Connects the LAN to other networks (e.g., the internet).',
    },
  ];

  const lanCharacteristics = [
    'High speed (100 Mbps – 10 Gbps)',
    'Low latency (microseconds)',
    'Private ownership (single organisation)',
    'Small geographic scope (building/campus)',
    'High security (controlled access)',
    'Ethernet and Wi-Fi as primary technologies',
  ];

  const lanUseCases = [
    {
      title: 'School Computer Lab',
      desc: 'Students like Debangshu and Mamata use the LAN to access shared files, print assignments, and connect to the internet through a central gateway.',
    },
    {
      title: 'Office Network',
      desc: 'Employees share printers, servers, and collaborate on documents using a secure LAN.',
    },
    {
      title: 'Home Network',
      desc: 'Family members connect smartphones, laptops, and smart TVs via Wi-Fi or Ethernet.',
    },
    {
      title: 'Hospital Network',
      desc: 'Patient records, imaging systems, and monitoring devices communicate over a secure LAN in a hospital in Kolkata.',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Local Area Network (LAN)
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The backbone of offices, schools, and homes – connecting devices within a limited area
          </p>
        </section>

        {/* --- Introduction: What is a LAN? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is a LAN?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>Local Area Network (LAN)</strong> is a network that connects devices within
              a limited geographical area, such as a building, office, school, or home. LANs are
              the most common type of network and are typically high-speed, low-latency, and
              privately owned.
            </p>
            <p>
              LANs use technologies like <strong>Ethernet</strong> (wired) and <strong>Wi-Fi</strong>
              (wireless) to connect devices. They form the foundation of most organisational networks,
              enabling resource sharing, communication, and internet access.
            </p>
            <p>
              At a school in <strong>Barrackpore</strong>, the computer lab where students like
              <strong>Susmita</strong> and <strong>Mahima</strong> work on assignments is a typical
              LAN – PCs, printers, and a server connected via Ethernet switches and Wi-Fi access points.
            </p>
          </div>

          {/* SVG: LAN Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="600"
              height="300"
              viewBox="0 0 600 300"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration of a LAN showing a switch connecting computers, server, printer, and router to internet"
            >
              <rect width="600" height="300" fill="transparent" />

              {/* Central switch */}
              <rect x="260" y="110" width="80" height="80" rx="8" fill="#3b82f6" className="dark:fill-blue-400" />
              <text x="300" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Switch</text>
              <text x="300" y="165" textAnchor="middle" fill="white" fontSize="10">(LAN Core)</text>

              {/* Animated data packets on switch */}
              <circle r="4" fill="#f59e0b" className="dark:fill-yellow-400 animate-blink">
                <animate attributeName="cx" values="300;300" dur="1s" repeatCount="indefinite" />
                <animate attributeName="cy" values="190;110" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* End devices */}
              {[
                { x: 40, y: 30, label: 'PC' },
                { x: 40, y: 130, label: 'PC' },
                { x: 40, y: 230, label: 'Printer' },
                { x: 500, y: 30, label: 'Server' },
                { x: 500, y: 130, label: 'Laptop' },
              ].map((dev, i) => (
                <g key={i}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="50"
                    height="50"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={dev.x + 25}
                    y={dev.y + 30}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                </g>
              ))}

              {/* Connections to switch */}
              {[
                { x1: 90, y1: 55, x2: 260, y2: 130 },
                { x1: 90, y1: 155, x2: 260, y2: 150 },
                { x1: 90, y1: 255, x2: 260, y2: 170 },
                { x1: 500, y1: 55, x2: 340, y2: 130 },
                { x1: 500, y1: 155, x2: 340, y2: 150 },
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

              {/* Router connecting LAN to WAN (internet) */}
              <rect x="260" y="30" width="80" height="50" rx="6" fill="#f59e0b" className="dark:fill-yellow-400" />
              <text x="300" y="58" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Router</text>
              <line x1="300" y1="80" x2="300" y2="110" stroke="#94a3b8" strokeWidth="2" className="dark:stroke-gray-500" />

              {/* Internet cloud */}
              <rect x="440" y="20" width="120" height="70" rx="20" fill="#3b82f6" opacity="0.2" className="dark:opacity-30" stroke="#3b82f6" strokeWidth="2" />
              <text x="500" y="60" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Internet</text>
              <line x1="340" y1="55" x2="440" y2="55" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-400" />

              {/* Animated data flow to internet */}
              <circle r="4" fill="#22c55e">
                <animate attributeName="cx" values="340;440;340" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="55;55;55" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Labels */}
              <text x="300" y="280" textAnchor="middle" fill="#94a3b8" fontSize="12">Ethernet/Wi-Fi Connections</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            A typical LAN: devices connected via a switch, with a router providing internet access.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Key Characteristics of a LAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lanCharacteristics.map((char, idx) => (
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

        {/* --- LAN Components --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Components of a LAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lanComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {comp.icon}
                  </span>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    {comp.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- LAN Technologies: Ethernet & Wi-Fi --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            LAN Technologies: Ethernet &amp; Wi-Fi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <span>🔌</span> Ethernet (Wired)
              </h3>
              <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <li>Uses twisted-pair copper (Cat5e, Cat6) or fiber optic cables.</li>
                <li>Speeds: 10 Mbps to 100 Gbps.</li>
                <li>Highly reliable, low latency, and secure.</li>
                <li>Common standards: 100Base-TX, 1000Base-T, 10GBase-T.</li>
                <li>Ideal for stationary devices (desktops, servers).</li>
              </ul>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                <span>📡</span> Wi-Fi (Wireless)
              </h3>
              <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <li>Based on IEEE 802.11 standards (Wi-Fi 5, Wi-Fi 6, etc.).</li>
                <li>Speeds: up to 9.6 Gbps (Wi-Fi 6).</li>
                <li>Convenient for mobile devices and areas where cabling is difficult.</li>
                <li>Frequencies: 2.4 GHz (longer range) and 5 GHz (higher speed).</li>
                <li>Prone to interference and signal degradation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Real-world Use Cases --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            LAN in the Real World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lanUseCases.map((use, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>🏢</span> {use.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {use.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Advantages and Disadvantages of LAN --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of LAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>High speed:</strong> Up to 10 Gbps or more.</li>
                <li><strong>Low latency:</strong> Ideal for real-time applications.</li>
                <li><strong>Security:</strong> Private network with controlled access.</li>
                <li><strong>Resource sharing:</strong> Printers, files, and internet can be shared.</li>
                <li><strong>Cost-effective:</strong> Lower cost per device for large installations.</li>
                <li><strong>Centralised management:</strong> Easy to monitor and maintain.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Limited geographic coverage:</strong> Typically within a building.</li>
                <li><strong>Wiring costs:</strong> Running Ethernet cables can be expensive.</li>
                <li><strong>Security risks:</strong> Insider threats and network attacks.</li>
                <li><strong>Maintenance:</strong> Requires skilled staff for troubleshooting.</li>
                <li><strong>Single point of failure:</strong> If the central switch fails, the LAN may go down.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>structured cabling</strong> (patch panels, cable management) for maintainability.</li>
                <li>Segregate traffic with <strong>VLANs</strong> for security and performance.</li>
                <li>Use <strong>PoE (Power over Ethernet)</strong> for devices like phones and APs.</li>
                <li>Always have <strong>backup switches</strong> or redundant links for critical parts.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Using <strong>low-quality cables</strong> – leads to errors and speed issues.</li>
                <li>Overloading a <strong>single switch</strong> – causing bottlenecks.</li>
                <li>Ignoring <strong>Wi-Fi interference</strong> – placement of APs matters.</li>
                <li>Not updating <strong>firmware</strong> – security vulnerabilities.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ LAN Setup Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan the topology:</strong> Decide on physical layout (star, tree, etc.).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose cabling:</strong> Select appropriate Ethernet cabling (Cat5e, Cat6, fiber).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Select switches:</strong> Ensure enough ports and PoE capability if needed.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Configure IP addressing:</strong> Use DHCP for dynamic IP assignment.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Set up security:</strong> Implement access controls, VLANs, and firewalls.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test and monitor:</strong> Verify connectivity and use monitoring tools.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document:</strong> Maintain network diagrams and configuration records.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '900ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Look around your classroom or office. How many devices are connected to the LAN?
            Try to trace the path from a computer to the switch, then to the router. What would happen
            if the central switch failed? This helps you understand the importance of redundancy
            and network design.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "LANs are the foundation of most networks. Emphasise the importance of good cabling and documentation – these are often overlooked but save countless hours in troubleshooting. Also, highlight the trade-offs between wired and wireless; both have their place, and a well-designed LAN uses a mix. Encourage students to practice cable termination and basic switch configuration – hands-on experience is invaluable."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Local Area Network (LAN) FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic9;