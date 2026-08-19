import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic16_files/topic16_questions';

const Topic16 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(234, 179, 8, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    @keyframes signalTravel {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
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
    .animate-signal {
      animation: signalTravel 3s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-dash,
      .animate-signal {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const busCharacteristics = [
    'All devices share a single communication line (backbone)',
    'Data transmitted in both directions along the bus',
    'Terminators at both ends of the bus to prevent signal reflection',
    'Simple and inexpensive to implement',
    'A break in the backbone can bring down the entire network',
    'Performance degrades as more devices are added',
  ];

  const busComponents = [
    {
      icon: '🔗',
      name: 'Backbone Cable',
      desc: 'The main communication line (coaxial cable) that all devices connect to.',
    },
    {
      icon: '🖥️',
      name: 'Nodes/Devices',
      desc: 'Computers, printers, and other devices connected to the bus.',
    },
    {
      icon: '🔌',
      name: 'T-Connectors (BNC)',
      desc: 'Connect each device to the backbone cable.',
    },
    {
      icon: '🧹',
      name: 'Terminators',
      desc: 'Absorb signals at the ends of the bus to prevent reflection and data corruption.',
    },
    {
      icon: '📡',
      name: 'Transceivers',
      desc: 'Send and receive signals over the bus.',
    },
  ];

  const busAdvantages = [
    'Simple to set up and configure',
    'Inexpensive – uses less cabling than star or mesh',
    'Easy to expand with minimal disruption',
    'Works well for small networks with low traffic',
    'No central device required (no single point of failure except the bus itself)',
  ];

  const busDisadvantages = [
    'A single break in the backbone brings down the entire network',
    'Limited cable length and number of devices',
    'Performance degrades with more devices (collisions increase)',
    'Difficult to troubleshoot – isolating faults is hard',
    'Security risks – all devices see all traffic',
    'Obsolete for modern networks (replaced by star topology)',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
            Bus Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The simplest network design – a single line connecting everything
          </p>
        </section>

        {/* --- Introduction: What is Bus Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            What is Bus Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Bus topology</strong> is a network architecture where all devices are connected
              to a single central cable, called the <strong>backbone</strong> or <strong>bus</strong>.
              Every device (node) connects to this backbone using a tap or connector. Data transmitted
              by any device travels along the bus in both directions, and all devices on the network
              can see the signal.
            </p>
            <p>
              Bus topology was widely used in early Ethernet networks (10BASE-2 and 10BASE-5) with
              coaxial cables. Today, it is largely obsolete, replaced by the more reliable star
              topology. However, understanding bus topology is important because it introduces
              concepts like <strong>collisions</strong>, <strong>CSMA/CD</strong>, and
              <strong>signal termination</strong> – fundamental concepts in networking.
            </p>
            <p>
              For students like <strong>Debangshu</strong> and <strong>Mamata</strong> in
              <strong>Kolkata</strong>, learning bus topology helps them understand why modern
              networks use switches and why a broken cable can cause network-wide failures.
            </p>
          </div>

          {/* SVG: Bus Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="600"
              height="280"
              viewBox="0 0 600 280"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration of bus topology showing devices connected to a single backbone cable with terminators"
            >
              <rect width="600" height="280" fill="transparent" />

              {/* Backbone cable */}
              <line
                x1="40"
                y1="140"
                x2="560"
                y2="140"
                stroke="#eab308"
                strokeWidth="6"
                className="dark:stroke-yellow-400"
              >
                <animate attributeName="stroke-dasharray" values="0,520" dur="2s" fill="freeze" />
              </line>

              {/* Terminators */}
              <rect x="30" y="120" width="20" height="40" rx="4" fill="#ef4444" className="dark:fill-red-400" />
              <text x="40" y="180" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Terminator</text>
              <rect x="550" y="120" width="20" height="40" rx="4" fill="#ef4444" className="dark:fill-red-400" />
              <text x="560" y="180" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Terminator</text>

              {/* Devices with T-connectors */}
              {[
                { x: 100, y: 80, label: 'PC 1' },
                { x: 220, y: 80, label: 'PC 2' },
                { x: 340, y: 80, label: 'Printer' },
                { x: 460, y: 80, label: 'PC 3' },
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
                  {/* T-connector line to backbone */}
                  <line
                    x1={dev.x + 35}
                    y1={dev.y + 40}
                    x2={dev.x + 35}
                    y2={140}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    className="dark:stroke-gray-500"
                  />
                  <circle cx={dev.x + 35} cy="140" r="6" fill="#eab308" className="dark:fill-yellow-400" />
                </g>
              ))}

              {/* Animated data signal on backbone */}
              <circle r="8" fill="#22c55e" className="dark:fill-green-400">
                <animate
                  attributeName="cx"
                  values="40;560;40"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="140;140;140"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="6" fill="#22c55e" opacity="0.6" className="dark:fill-green-400">
                <animate
                  attributeName="cx"
                  values="560;40;560"
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                />
                <animate
                  attributeName="cy"
                  values="140;140;140"
                  dur="4s"
                  repeatCount="indefinite"
                  begin="2s"
                />
              </circle>

              {/* Labels */}
              <text x="300" y="245" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Backbone Cable (Bus)
              </text>
              <text x="300" y="265" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Terminators absorb signals at each end
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            In bus topology, all devices share a single backbone cable with terminators at both ends.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Key Characteristics of Bus Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {busCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-yellow-500 dark:text-yellow-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Components of Bus Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Components of a Bus Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {busComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How Bus Topology Works --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            How Bus Topology Works
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📤</span>
              <div>
                <strong>Transmission:</strong> When a device wants to send data, it transmits the
                signal onto the backbone cable. The signal travels in both directions along the bus.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">👀</span>
              <div>
                <strong>Reception:</strong> All devices on the bus can see the signal, but only the
                intended recipient (based on MAC address) will process it. Other devices ignore the data.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🧹</span>
              <div>
                <strong>Termination:</strong> Terminators at both ends absorb the signal to prevent
                reflection. Without terminators, signals would bounce back and corrupt data.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">💥</span>
              <div>
                <strong>Collisions:</strong> If two devices transmit simultaneously, a collision occurs.
                Ethernet uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection) to detect
                and retransmit.
              </div>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: Early Ethernet --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Real-world Example: Early Ethernet (10BASE-2)
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In the 1980s and 1990s, bus topology was the standard for Ethernet networks using
              <strong>10BASE-2</strong> (thinnet) coaxial cable. A typical setup:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Cable:</strong> RG-58 coaxial cable with BNC connectors.</li>
              <li><strong>Devices:</strong> Computers connected via T-connectors to the cable.</li>
              <li><strong>Length:</strong> Maximum segment length was 185 meters.</li>
              <li><strong>Nodes:</strong> Up to 30 devices per segment.</li>
              <li><strong>Terminators:</strong> 50-ohm terminators at both ends.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              If the cable was broken or a terminator was missing, the entire network would fail.
              This was a frequent frustration for network administrators!
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed italic">
              A school in <strong>Ichapur</strong> might have used such a network in their
              computer lab, with students like <strong>Susmita</strong> and <strong>Abhronila</strong>
              experiencing the joys of "the network is down again."
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Bus Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {busAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {busDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Bus vs Star Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Bus vs Star Topology
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">Bus Topology</th>
                  <th className="px-4 py-2 text-left">Star Topology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Central Device</td>
                  <td className="px-4 py-2">None</td>
                  <td className="px-4 py-2">Hub/Switch (critical)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Cable Usage</td>
                  <td className="px-4 py-2">Less cabling</td>
                  <td className="px-4 py-2">More cabling</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Fault Tolerance</td>
                  <td className="px-4 py-2">Low – single break = network down</td>
                  <td className="px-4 py-2">High – one device failure doesn't affect others</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Scalability</td>
                  <td className="px-4 py-2">Limited</td>
                  <td className="px-4 py-2">Excellent</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Troubleshooting</td>
                  <td className="px-4 py-2">Difficult</td>
                  <td className="px-4 py-2">Easy</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Modern Usage</td>
                  <td className="px-4 py-2">Obsolete</td>
                  <td className="px-4 py-2">Standard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Always ensure <strong>proper termination</strong> – missing terminators cause signal reflections.</li>
                <li>Use <strong>high-quality coaxial cable</strong> and connectors to minimize signal loss.</li>
                <li>Keep the <strong>cable length within limits</strong> to avoid attenuation.</li>
                <li>For modern networks, <strong>avoid bus topology</strong> – use star with switches.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Forgetting terminators</strong> – signal reflection corrupts data.</li>
                <li><strong>Exceeding cable length</strong> – signal quality degrades.</li>
                <li><strong>Adding too many devices</strong> – performance drops.</li>
                <li><strong>Not labeling cables</strong> – troubleshooting becomes impossible.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Bus Topology Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan cable length:</strong> Ensure within maximum length (185m for 10BASE-2).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Install terminators:</strong> 50-ohm terminators at both ends of the bus.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Connect devices:</strong> Use T-connectors to attach each device to the bus.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Limit devices:</strong> Keep under the maximum (30 for 10BASE-2).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Label everything:</strong> Label cables and connectors for easy troubleshooting.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test thoroughly:</strong> Use a cable tester to verify connections.
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
            Why do you think bus topology was replaced by star topology in modern networks?
            Try to trace what happens when a single device is disconnected from a bus vs. from a star.
            How does the network behave? This will help you understand the importance of
            fault tolerance in network design.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Bus topology is a classic example of why good network design matters. Emphasize the lessons learned: single points of failure, limited scalability, and the importance of termination. While obsolete, it's a great teaching tool for collision domains, CSMA/CD, and signal propagation. Use it to contrast with modern switched networks."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Bus Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic16;