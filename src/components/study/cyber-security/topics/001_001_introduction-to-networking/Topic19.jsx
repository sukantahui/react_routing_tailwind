import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic19_files/topic19_questions';

const Topic19 = () => {
    // Full Mesh Topology data
const nodes = [
  { x: 80, y: 80, label: "A" },
  { x: 420, y: 80, label: "B" },
  { x: 80, y: 220, label: "C" },
  { x: 420, y: 220, label: "D" },
];

const connections = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
  [2, 3],
];
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
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
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-dash,
      .animate-pulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const meshCharacteristics = [
    'Every device connects directly to every other device (full mesh)',
    'Or selected devices connect (partial mesh)',
    'Highest redundancy – multiple paths between any two devices',
    'Extremely fault-tolerant – a single failure does not affect the network',
    'Complex and expensive to implement',
    'Used in critical networks (data centers, military, financial systems)',
  ];

  const meshTypes = [
    {
      icon: '🕸️',
      name: 'Full Mesh',
      desc: 'Every device is directly connected to every other device. Maximum redundancy but high cost.',
      connections: 'n(n-1)/2 links for n nodes',
      example: 'Data centers, critical infrastructure',
    },
    {
      icon: '🔀',
      name: 'Partial Mesh',
      desc: 'Some devices are connected to all others; others only to a few. Balances cost and redundancy.',
      connections: 'Selective links based on importance',
      example: 'Enterprise networks, WANs',
    },
  ];

  const meshComponents = [
    {
      icon: '🖥️',
      name: 'Nodes/Devices',
      desc: 'Each device has multiple network interfaces to connect to other devices.',
    },
    {
      icon: '🔗',
      name: 'Point-to-Point Links',
      desc: 'Direct connections between pairs of devices (often fiber or dedicated circuits).',
    },
    {
      icon: '🔄',
      name: 'Routing Protocol',
      desc: 'Protocols like OSPF or BGP determine the best path through the mesh.',
    },
    {
      icon: '📡',
      name: 'Redundant Interfaces',
      desc: 'Multiple NICs and paths to provide fault tolerance.',
    },
  ];

  const meshAdvantages = [
    'High redundancy – multiple paths; no single point of failure',
    'Reliability – network continues even if several devices fail',
    'Scalability – adding nodes increases capacity',
    'Security – traffic can be routed through secure paths',
    'Fault tolerance – self-healing with dynamic routing',
  ];

  const meshDisadvantages = [
    'Expensive – requires many cables and interfaces',
    'Complex – difficult to design, implement, and maintain',
    'Not scalable beyond a certain size (full mesh)',
    'High cabling and port requirements',
    'Requires sophisticated routing protocols',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Mesh Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The ultimate in reliability – every device connected to every other
          </p>
        </section>

        {/* --- Introduction: What is Mesh Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            What is Mesh Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Mesh topology</strong> is a network architecture where devices are interconnected
              with many redundant connections. In a <strong>full mesh</strong>, every device connects
              directly to every other device. In a <strong>partial mesh</strong>, only critical
              devices are fully interconnected, while others connect to a subset.
            </p>
            <p>
              Mesh topology provides the highest level of redundancy and fault tolerance. If any
              link fails, data can be rerouted through alternate paths. This makes mesh ideal for
              mission-critical environments like data centers, financial networks, and military
              communications.
            </p>
            <p>
              For students in <strong>Kolkata</strong>, understanding mesh topology is important
              because it introduces concepts like redundancy, routing protocols, and fault tolerance.
              While full mesh is expensive, partial mesh is a practical solution for many enterprise
              networks.
            </p>
          </div>

          {/* SVG: Full Mesh Topology (4 nodes) */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="300"
              viewBox="0 0 500 300"
              className="w-full max-w-md h-auto"
              aria-label="Illustration of full mesh topology showing 4 devices fully interconnected"
            >
              <rect width="500" height="300" fill="transparent" />

              {/* Nodes (4 corners) */}
              {[
                { x: 80, y: 80, label: 'A' },
                { x: 420, y: 80, label: 'B' },
                { x: 80, y: 220, label: 'C' },
                { x: 420, y: 220, label: 'D' },
              ].map((node, idx) => (
                <g key={idx}>
                  <circle cx={node.x} cy={node.y} r="30" fill="#f59e0b" className="dark:fill-amber-400" />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Full mesh connections (all pairs) */}
              {[
                [0, 1],
                [0, 2],
                [0, 3],
                [1, 2],
                [1, 3],
                [2, 3],
              ].map(([i, j], idx) => {
                const n1 = nodes[i];
                const n2 = nodes[j];
                return (
                  <line
                    key={idx}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    className="dark:stroke-gray-500 animate-dash"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                );
              })}

              {/* Animated data packets on different paths */}
              <circle r="6" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="80;420;80" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="80;80;80" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="420;80;420" dur="3s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="cy" values="220;80;220" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              <circle r="6" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="80;420;80" dur="4s" repeatCount="indefinite" begin="2s" />
                <animate attributeName="cy" values="220;220;220" dur="4s" repeatCount="indefinite" begin="2s" />
              </circle>

              {/* Labels */}
              <text x="250" y="285" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Every device directly connected to every other device
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Full mesh topology: each device has a direct link to every other device.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Key Characteristics of Mesh Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {meshCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-amber-500 dark:text-amber-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Full Mesh vs Partial Mesh --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Full Mesh vs Partial Mesh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meshTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </span>
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400">
                    {type.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {type.desc}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <strong>Connections:</strong> {type.connections}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <strong>Example:</strong> {type.example}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Components of Mesh Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Components of a Mesh Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {meshComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How Mesh Topology Works --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            How Mesh Topology Works
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🛤️</span>
              <div>
                <strong>Multiple Paths:</strong> Between any two devices, there are multiple
                potential routes. If one fails, another is used.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🗺️</span>
              <div>
                <strong>Dynamic Routing:</strong> Routing protocols (OSPF, BGP) continuously
                monitor link status and select the best path.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔄</span>
              <div>
                <strong>Self-Healing:</strong> When a link fails, routers automatically recalculate
                routes and redirect traffic, ensuring continuous operation.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⚖️</span>
              <div>
                <strong>Load Balancing:</strong> Traffic can be distributed across multiple paths
                to optimize performance.
              </div>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: Data Center Network --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Real-world Example: Data Center Spine-Leaf Architecture
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Modern data centers use a <strong>spine-leaf</strong> architecture, which is a type
              of mesh topology. Here's how it works:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Leaf Switches:</strong> Connect to servers and storage devices.</li>
              <li><strong>Spine Switches:</strong> Provide high-speed interconnect between leaf switches.</li>
              <li><strong>Full Mesh:</strong> Every leaf connects to every spine (partial mesh).</li>
              <li><strong>Redundancy:</strong> If a spine fails, traffic reroutes through another spine.</li>
              <li><strong>Performance:</strong> Equal-cost multipath (ECMP) distributes traffic.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              Companies like <strong>Google</strong> and <strong>Amazon</strong> use mesh-like
              designs to ensure 99.99% availability for their services.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Mesh Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {meshAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {meshDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Mesh vs Other Topologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Mesh vs Other Topologies
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">Mesh</th>
                  <th className="px-4 py-2 text-left">Star</th>
                  <th className="px-4 py-2 text-left">Ring</th>
                  <th className="px-4 py-2 text-left">Bus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Redundancy</td>
                  <td className="px-4 py-2">Very High</td>
                  <td className="px-4 py-2">Low</td>
                  <td className="px-4 py-2">Moderate (dual ring high)</td>
                  <td className="px-4 py-2">Very Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Cost</td>
                  <td className="px-4 py-2">Very High</td>
                  <td className="px-4 py-2">Moderate</td>
                  <td className="px-4 py-2">Moderate</td>
                  <td className="px-4 py-2">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Scalability</td>
                  <td className="px-4 py-2">Limited (full)</td>
                  <td className="px-4 py-2">High</td>
                  <td className="px-4 py-2">Moderate</td>
                  <td className="px-4 py-2">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Fault Tolerance</td>
                  <td className="px-4 py-2">Excellent</td>
                  <td className="px-4 py-2">Poor (central switch)</td>
                  <td className="px-4 py-2">Moderate</td>
                  <td className="px-4 py-2">Very Poor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>partial mesh</strong> for most enterprise networks – balance cost and redundancy.</li>
                <li>Implement <strong>ECMP</strong> (Equal-Cost Multipath) for load balancing.</li>
                <li>Choose <strong>dynamic routing protocols</strong> (OSPF, BGP) for automatic failover.</li>
                <li>Monitor <strong>link utilization</strong> to avoid congestion.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Implementing <strong>full mesh</strong> when partial mesh would suffice.</li>
                <li>Ignoring <strong>cost</strong> – mesh is expensive; plan accordingly.</li>
                <li>Not using <strong>redundant hardware</strong> – single points of failure elsewhere.</li>
                <li>Underestimating <strong>complexity</strong> – need skilled staff.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '1000ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-amber-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Mesh Topology Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Assess redundancy needs:</strong> Determine critical vs. non-critical links.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose mesh type:</strong> Full or partial based on budget and reliability.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Select routing protocol:</strong> OSPF for internal, BGP for external.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan cabling:</strong> Ensure enough ports and fiber/copper capacity.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement monitoring:</strong> Detect link failures and performance issues.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test failover:</strong> Simulate link failures to verify redundancy.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '1100ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Think about the internet backbone. It uses a mesh-like topology with multiple
            connections between major hubs. Why is this important? What would happen if a
            critical undersea cable failed? Trace how redundancy ensures that your data
            still reaches its destination.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Mesh topology is the gold standard for reliability. Emphasize the trade-off: cost vs. redundancy. Partial mesh is often the practical choice. Use the spine-leaf data center example to show how mesh concepts are applied in modern architectures. Hands-on: let students simulate link failures in a lab and observe how routing protocols react."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Mesh Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic19;