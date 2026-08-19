import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic21_files/topic21_questions';

const Topic21 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
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
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-dash {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const hybridCharacteristics = [
    'Combines two or more different topologies',
    'Designed to meet specific organizational requirements',
    'Flexible and scalable',
    'Can incorporate redundancy from mesh topology',
    'Can leverage cost-effectiveness of star or bus',
    'Complex to design and manage',
  ];

  const hybridComponents = [
    {
      icon: '🔗',
      name: 'Mixed Topology Elements',
      desc: 'Combination of star, ring, bus, mesh, or tree components within one network.',
    },
    {
      icon: '🔄',
      name: 'Interconnection Devices',
      desc: 'Routers, switches, and gateways that connect different topology segments.',
    },
    {
      icon: '🎯',
      name: 'Core Backbone',
      desc: 'Often a high-speed fiber ring or mesh connecting major hubs.',
    },
    {
      icon: '🏢',
      name: 'Departmental Segments',
      desc: 'Each department may use the topology that best suits its needs (e.g., star for offices, mesh for critical servers).',
    },
  ];

  const hybridExamples = [
    {
      name: 'Star-Ring Hybrid',
      desc: 'A central switch (star) connects to multiple hubs, each forming a ring topology within a department. Common in Token Ring networks.',
      icon: '⭐⭕',
    },
    {
      name: 'Star-Bus Hybrid',
      desc: 'Multiple star networks connected to a central backbone (bus). Used in large office buildings where each floor has a star network connected to a backbone.',
      icon: '⭐🚌',
    },
    {
      name: 'Star-Mesh Hybrid',
      desc: 'A star network with redundant links (partial mesh) for critical servers. Provides high availability for key services.',
      icon: '⭐🕸️',
    },
    {
      name: 'Tree-Mesh Hybrid',
      desc: 'A hierarchical tree network with mesh connections between key nodes for redundancy. Used in data centers and enterprise WANs.',
      icon: '🌳🕸️',
    },
  ];

  const hybridAdvantages = [
    'Flexibility – can be customized to meet specific needs',
    'Scalability – easily expand by adding new topology segments',
    'Reliability – can incorporate redundant paths where needed',
    'Cost-effective – use simple topologies where fault tolerance is not critical',
    'Performance optimization – match topology to traffic patterns',
  ];

  const hybridDisadvantages = [
    'Complexity – more difficult to design, implement, and manage',
    'Higher cost – due to multiple hardware types and configurations',
    'Troubleshooting is challenging – faults may span multiple topologies',
    'Requires skilled personnel with knowledge of different topologies',
    'Potential compatibility issues between topology segments',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Hybrid Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The best of multiple worlds – combining topologies for optimal performance
          </p>
        </section>

        {/* --- Introduction: What is Hybrid Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            What is Hybrid Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Hybrid topology</strong> is a network architecture that combines two or more
              different topologies to leverage the strengths of each while mitigating their weaknesses.
              Rather than being limited to a single topology, hybrid networks blend elements of
              <strong>star</strong>, <strong>ring</strong>, <strong>bus</strong>, <strong>mesh</strong>,
              or <strong>tree</strong> to meet specific organizational requirements.
            </p>
            <p>
              Hybrid topologies are common in real-world networks because no single topology is
              perfect for all scenarios. For example, a large enterprise might use a <strong>star</strong>
              topology in each department (for ease of management), a <strong>ring</strong> or
              <strong>mesh</strong> backbone for redundancy, and a <strong>bus</strong> for connecting
              legacy devices.
            </p>
            <p>
              For students in <strong>Kolkata</strong>, understanding hybrid topology is essential
              because it reflects how real networks are actually built – a mix of approaches
              tailored to budget, performance, and reliability requirements.
            </p>
          </div>

          {/* SVG: Hybrid Topology Example (Star + Ring + Mesh) */}
          <div className="mt-6 flex justify-center">
            <svg
              width="650"
              height="350"
              viewBox="0 0 650 350"
              className="w-full max-w-2xl h-auto"
              aria-label="Illustration of hybrid topology combining star, ring, and mesh elements"
            >
              <rect width="650" height="350" fill="transparent" />

              {/* Labels for topology types */}
              <text x="50" y="30" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Star</text>
              <text x="325" y="30" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Ring</text>
              <text x="580" y="30" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Mesh</text>

              {/* Star topology section (left) */}
              <circle cx="120" cy="160" r="12" fill="#3b82f6" className="dark:fill-blue-400" />
              {[
                { x: 60, y: 100, label: 'PC' },
                { x: 60, y: 220, label: 'PC' },
                { x: 180, y: 100, label: 'PC' },
                { x: 180, y: 220, label: 'PC' },
              ].map((node, idx) => {
                const dx = node.x - 120;
                const dy = node.y - 160;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const ratio = 12 / dist;
                return (
                  <g key={idx}>
                    <rect
                      x={node.x - 20}
                      y={node.y - 15}
                      width="40"
                      height="30"
                      rx="4"
                      fill="#64748b"
                      className="dark:fill-gray-600"
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                    <line
                      x1={120 + dx * ratio}
                      y1={160 + dy * ratio}
                      x2={node.x}
                      y2={node.y}
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}

              {/* Ring topology section (middle) */}
              <circle cx="325" cy="160" r="60" fill="none" stroke="#ec4899" strokeWidth="2" />
              {[
                { x: 325, y: 100, label: 'R1' },
                { x: 385, y: 160, label: 'R2' },
                { x: 325, y: 220, label: 'R3' },
                { x: 265, y: 160, label: 'R4' },
              ].map((node, idx) => (
                <g key={idx}>
                  <rect
                    x={node.x - 15}
                    y={node.y - 15}
                    width="30"
                    height="30"
                    rx="4"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Mesh topology section (right) */}
              {[
                { x: 530, y: 100, label: 'M1' },
                { x: 620, y: 100, label: 'M2' },
                { x: 530, y: 220, label: 'M3' },
                { x: 620, y: 220, label: 'M4' },
              ].map((node, idx) => (
                <g key={idx}>
                  <rect
                    x={node.x - 15}
                    y={node.y - 15}
                    width="30"
                    height="30"
                    rx="4"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
              {/* Mesh connections */}
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
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    className="dark:stroke-amber-400"
                  />
                );
              })}

              {/* Connections between topology sections (backbone) */}
              <line x1="180" y1="160" x2="265" y2="160" stroke="#8b5cf6" strokeWidth="3" className="dark:stroke-violet-400 animate-dash" />
              <line x1="385" y1="160" x2="530" y2="160" stroke="#8b5cf6" strokeWidth="3" className="dark:stroke-violet-400 animate-dash" style={{ animationDelay: '0.5s' }} />

              {/* Animated packets on backbone */}
              <circle r="5" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="180;265;180" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="160;160;160" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="385;530;385" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="cy" values="160;160;160" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
              </circle>

              {/* Labels */}
              <text x="325" y="340" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Hybrid combining Star + Ring + Mesh with a backbone
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Hybrid topology combines different topologies to meet diverse requirements.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Key Characteristics of Hybrid Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hybridCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-violet-500 dark:text-violet-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Components --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Components of a Hybrid Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hybridComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-violet-600 dark:text-violet-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Types of Hybrid Topologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Common Hybrid Combinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hybridExamples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {ex.icon}
                  </span>
                  <h3 className="font-semibold text-violet-600 dark:text-violet-400">
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

        {/* --- Real-world Scenario: Corporate Headquarters --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Real-world Example: Corporate Headquarters
          </h2>
          <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A corporate headquarters in <strong>Kolkata</strong> uses a hybrid topology:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Administration Building:</strong> Star topology for easy management and scalability.</li>
              <li><strong>Data Center:</strong> Mesh topology for maximum redundancy and reliability.</li>
              <li><strong>Factory Floor:</strong> Ring topology for deterministic performance in industrial control.</li>
              <li><strong>Backbone:</strong> A fiber optic ring connects all buildings (ring backbone with star branches).</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This hybrid design balances cost, performance, and reliability across different
              functional areas. <strong>Mamata</strong> in the administration building, and
              <strong>Debangshu</strong> in the data center, both benefit from topology choices
              tailored to their needs.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Hybrid Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {hybridAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {hybridDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Design Considerations --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Design Considerations for Hybrid Topology
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📋</span>
              <div>
                <strong>Requirements Analysis:</strong> Identify which areas need high redundancy,
                which need cost-effectiveness, and which need deterministic performance.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">💰</span>
              <div>
                <strong>Budget Constraints:</strong> Allocate more budget to critical segments
                (mesh for data center) and less to less critical areas (star for offices).
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔄</span>
              <div>
                <strong>Interconnectivity:</strong> Plan how different topology segments will
                connect – use routers, switches, or gateways to bridge them.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📈</span>
              <div>
                <strong>Future Growth:</strong> Design with expansion in mind – leave room for
                adding new topology segments.
              </div>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Document the topology clearly – <strong>diagrams are essential</strong>.</li>
                <li>Ensure <strong>interoperability</strong> between different topology segments.</li>
                <li>Choose <strong>standardized protocols</strong> (OSPF, BGP) for routing between segments.</li>
                <li>Consider <strong>SDN</strong> to simplify management of hybrid topologies.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Over-engineering</strong> – using too many topologies unnecessarily.</li>
                <li>Not <strong>documenting</strong> the hybrid design – troubleshooting is near impossible.</li>
                <li>Ignoring <strong>compatibility</strong> between different topology segments.</li>
                <li>Forgetting to test <strong>failover</strong> between segments.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Hybrid Topology Design Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Identify requirements:</strong> What are the functional needs of each network segment?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose appropriate topologies:</strong> Select the best topology for each segment.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan interconnections:</strong> How will segments connect? What devices are needed?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement routing:</strong> Configure routing protocols between segments.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test thoroughly:</strong> Verify connectivity and failover between segments.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document everything:</strong> Create clear diagrams and configuration notes.
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
            Think about your university or a large company you know. Can you identify different
            topology segments? Which departments might use star? Where might mesh be used for
            critical servers? This helps you see how hybrid topologies are applied in the real world.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Hybrid topology is the reality of most enterprise networks. Emphasize the importance of planning and documentation – hybrid designs are complex. A great classroom exercise is to have students design a hybrid topology for a given scenario (e.g., a hospital, university, or corporate campus) and justify their choices based on cost, performance, and reliability."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Hybrid Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic21;