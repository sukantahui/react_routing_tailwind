import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic17_files/topic17_questions';

const Topic17 = () => {
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
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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
    .animate-dash {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: dash 2s ease-in-out forwards;
    }
    .animate-rotate {
      animation: rotate 10s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-dash,
      .animate-rotate {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const starCharacteristics = [
    'All devices connect to a central hub or switch',
    'Each device has its own dedicated cable to the central device',
    'Easy to add or remove devices without affecting the network',
    'A failure in one device does not affect others',
    'Central device is a single point of failure',
    'Most common topology in modern LANs',
  ];

  const starComponents = [
    {
      icon: '🎯',
      name: 'Central Hub/Switch',
      desc: 'The core device that connects all nodes. A switch is preferred for better performance.',
    },
    {
      icon: '🖥️',
      name: 'Nodes/Devices',
      desc: 'Computers, printers, servers, and other devices connected to the central device.',
    },
    {
      icon: '🔌',
      name: 'Cables',
      desc: 'Unshielded Twisted Pair (UTP) cables (Cat5e, Cat6) with RJ-45 connectors.',
    },
    {
      icon: '🔄',
      name: 'Network Interface Card (NIC)',
      desc: 'Each device needs a NIC to connect to the network.',
    },
    {
      icon: '📡',
      name: 'Access Points (Wireless)',
      desc: 'Wireless devices connect via access points, forming a wireless star topology.',
    },
  ];

  const starAdvantages = [
    "High reliability – a single device failure doesn't affect others",
    "Easy to troubleshoot – isolate faults to specific cables or devices",
    "Scalable – easily add new devices by connecting to the switch",
    "High performance – each device has a dedicated connection to the switch",
    "Flexible – supports both wired and wireless connections",
    "Centralized management – monitor and control from the switch",
  ];

  const starDisadvantages = [
    'Central switch is a single point of failure – if it fails, the network goes down',
    'Requires more cabling than bus topology',
    'Higher cost – requires a switch/hub and individual cables for each device',
    'The central device can become a bottleneck if not powerful enough',
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Star Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The most popular network design – connecting everything through a central hub
          </p>
        </section>

        {/* --- Introduction: What is Star Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is Star Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Star topology</strong> is a network architecture where all devices connect
              to a central device (a <strong>hub</strong> or <strong>switch</strong>). Each device
              has its own dedicated point-to-point connection to the central device, forming a
              star-like pattern. This is the most common topology used in modern networks.
            </p>
            <p>
              Unlike bus topology, where all devices share a single cable, star topology provides
              each device with a dedicated path. This eliminates collisions (when using a switch)
              and makes the network more reliable and manageable.
            </p>
            <p>
              In a school in <strong>Barrackpore</strong>, the computer lab where students like
              <strong>Mamata</strong> and <strong>Mahima</strong> work uses star topology – all
              PCs connect to a central switch in the server room. If one PC fails, the others
              continue working perfectly.
            </p>
          </div>

          {/* SVG: Star Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="550"
              height="300"
              viewBox="0 0 550 300"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration of star topology showing devices connected to a central switch"
            >
              <rect width="550" height="300" fill="transparent" />

              {/* Central switch */}
              <rect x="215" y="120" width="120" height="70" rx="10" fill="#3b82f6" className="dark:fill-blue-400" />
              <text x="275" y="150" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Switch</text>
              <text x="275" y="170" textAnchor="middle" fill="white" fontSize="10">(Central Hub)</text>

              {/* Animated glow around switch */}
              <circle cx="275" cy="155" r="55" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="55;65;55" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Devices */}
              {[
                { x: 40, y: 40, label: 'PC 1' },
                { x: 40, y: 220, label: 'PC 2' },
                { x: 440, y: 40, label: 'Server' },
                { x: 440, y: 220, label: 'Printer' },
                { x: 275, y: 30, label: 'Laptop' },
                { x: 275, y: 250, label: 'Phone' },
              ].map((dev, idx) => (
                <g key={idx}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="70"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={dev.x + 35}
                    y={dev.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                  {/* Connection lines to switch */}
                  <line
                    x1={dev.x + 35}
                    y1={dev.y + 40}
                    x2={dev.x + 35}
                    y2={120}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    className="dark:stroke-gray-500 animate-dash"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                </g>
              ))}

              {/* Animated data packets */}
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="75;275;75" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="60;155;60" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="475;275;475" dur="3s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="cy" values="60;155;60" dur="3s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="275;275" dur="2.8s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="cy" values="70;155;70" dur="2.8s" repeatCount="indefinite" begin="0.5s" />
              </circle>

              {/* Labels */}
              <text x="275" y="295" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Each device has a dedicated connection to the central switch
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            In star topology, every device connects to a central switch with its own dedicated cable.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Key Characteristics of Star Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {starCharacteristics.map((char, idx) => (
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

        {/* --- Components of Star Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Components of a Star Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {starComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How Star Topology Works --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            How Star Topology Works
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📤</span>
              <div>
                <strong>Transmission:</strong> When a device wants to send data, it sends the signal
                directly to the central switch. The switch examines the destination address and
                forwards the data only to the intended port.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🚫</span>
              <div>
                <strong>Collision Elimination:</strong> With a switch, each port is its own
                <strong>collision domain</strong>. Full-duplex communication allows devices to send
                and receive simultaneously without collisions.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔄</span>
              <div>
                <strong>Broadcast:</strong> Broadcast messages are forwarded to all ports except
                the source port, ensuring all devices receive the message.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔌</span>
              <div>
                <strong>Plug-and-Play:</strong> Adding a new device is simple – just connect it to
                an available port on the switch. No reconfiguration needed.
              </div>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: School Computer Lab --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Real-world Example: School Computer Lab
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A school in <strong>Kolkata</strong> has a computer lab with 40 PCs, a printer, and a
              server. They use <strong>star topology</strong>:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Central Switch:</strong> A 48-port gigabit switch in the server room.</li>
              <li><strong>Devices:</strong> Each PC connects to the switch via a Cat6 Ethernet cable.</li>
              <li><strong>Benefits:</strong> If a student's PC fails, the lab continues. Adding more PCs is easy.</li>
              <li><strong>Management:</strong> The network administrator can monitor traffic and isolate issues from the switch.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This setup is typical of modern educational institutions, providing reliability and
              performance for students like <strong>Debangshu</strong> and <strong>Susmita</strong>.
            </p>
          </div>
        </section>

        {/* --- Hub vs Switch --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Hub vs Switch in Star Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">📡 Hub (Obsolete)</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>Repeats signals to all ports (broadcast)</li>
                <li>Collisions occur – half-duplex</li>
                <li>Shared bandwidth (slower)</li>
                <li>No traffic management</li>
                <li>No longer used in modern networks</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">🔀 Switch (Modern)</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>Forwards data only to the intended port</li>
                <li>No collisions – full-duplex</li>
                <li>Dedicated bandwidth per port</li>
                <li>Intelligent traffic management</li>
                <li>Standard in all modern networks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Star Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {starAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {starDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
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
                <li>Use a <strong>switch</strong>, not a hub – eliminate collisions.</li>
                <li>Choose a switch with <strong>enough ports</strong> for future expansion.</li>
                <li>Use <strong>managed switches</strong> for VLANs and traffic monitoring.</li>
                <li>Consider <strong>redundant switches</strong> for critical networks.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Using a <strong>hub</strong> instead of a switch – performance suffers.</li>
                <li>Overloading a single switch – can become a bottleneck.</li>
                <li>Not having a <strong>backup switch</strong> – single point of failure.</li>
                <li>Using <strong>poor quality cables</strong> – errors and speed issues.</li>
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
              ✅ Star Topology Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Select a switch:</strong> Determine port count, speed, and management features.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan cabling:</strong> Use Cat5e/Cat6 cables with proper length (max 100m).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Connect devices:</strong> Plug each device into a switch port.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Configure VLANs (if needed):</strong> Segment traffic for security/performance.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test connectivity:</strong> Verify each device can communicate.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document:</strong> Record switch configuration and cabling layout.
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
            Look at the network in your home or school. How many devices are connected to a central
            switch or router? What would happen if that central device failed? This is why enterprise
            networks often have redundant switches – to prevent the single point of failure from
            bringing down the entire network.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Star topology is the foundation of modern LANs. Emphasize the difference between hubs and switches – this is a common point of confusion. A great demonstration is to show the difference in performance using a hub vs. a switch. Also, discuss how VLANs can extend star topology to create logical segmentation."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Star Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic17;