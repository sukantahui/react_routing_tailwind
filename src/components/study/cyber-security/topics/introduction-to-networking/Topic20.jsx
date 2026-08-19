import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic20_files/topic20_questions';

const Topic20 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
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

  const treeCharacteristics = [
    'Hierarchical structure with a root node and branches',
    'Combines characteristics of bus and star topologies',
    'Each node has one parent and zero or more children',
    'Scalable – can expand by adding new levels',
    'Centralized management – root controls the network',
    'The root is a critical single point of failure',
  ];

  const treeComponents = [
    {
      icon: '🌳',
      name: 'Root Node',
      desc: 'The topmost node that connects to the rest of the tree. Often a core switch or router.',
    },
    {
      icon: '🔗',
      name: 'Intermediate Nodes',
      desc: 'Hubs or switches at each level that forward traffic down the hierarchy.',
    },
    {
      icon: '🖥️',
      name: 'Leaf Nodes',
      desc: 'End devices (computers, printers, etc.) at the lowest level of the tree.',
    },
    {
      icon: '🔁',
      name: 'Backbone Links',
      desc: 'Connections between levels, often high-speed links (fiber).',
    },
  ];

  const treeAdvantages = [
    'Hierarchical organization – easy to manage and expand',
    'Scalable – add new branches without affecting the whole network',
    'Good for large networks (enterprises, campuses)',
    'Centralized control – manage from the root',
    'Supports grouping – departments can be separated logically',
  ];

  const treeDisadvantages = [
    'Root node is a single point of failure',
    'Complexity – requires careful planning and design',
    'If a node fails, its entire subtree becomes isolated',
    'Heavy reliance on the backbone links',
    'More cabling than star topology',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Tree Topology
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The hierarchical network – combining the best of bus and star
          </p>
        </section>

        {/* --- Introduction: What is Tree Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            What is Tree Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Tree topology</strong> is a hybrid network architecture that combines elements
              of both <strong>bus</strong> and <strong>star</strong> topologies. It forms a
              hierarchical structure with a <strong>root node</strong> at the top, branching down
              to intermediate nodes and finally to leaf nodes (end devices). The tree resembles
              an inverted tree, where data flows from the root to the leaves and back.
            </p>
            <p>
              Tree topology is widely used in large networks such as <strong>enterprise campuses</strong>,
              <strong>university networks</strong>, and <strong>WANs</strong>. It provides a scalable
              and manageable structure that can grow with the organisation.
            </p>
            <p>
              For students in <strong>Kolkata</strong>, tree topology is familiar from university
              networks where a central backbone connects different departments, each with its own
              LAN. <strong>Debangshu</strong> in the engineering department might be on a different
              branch than <strong>Mamata</strong> in the arts department, but both are connected
              through the root.
            </p>
          </div>

          {/* SVG: Tree Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="600"
              height="350"
              viewBox="0 0 600 350"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration of tree topology showing hierarchical structure"
            >
              <rect width="600" height="350" fill="transparent" />

              {/* Root node */}
              <rect x="250" y="20" width="100" height="50" rx="8" fill="#10b981" className="dark:fill-green-400" />
              <text x="300" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Root</text>

              {/* Level 1 nodes (branches) */}
              {[
                { x: 80, y: 120, label: 'Dept A' },
                { x: 300, y: 120, label: 'Dept B' },
                { x: 520, y: 120, label: 'Dept C' },
              ].map((node, idx) => (
                <g key={idx}>
                  <rect
                    x={node.x - 35}
                    y={node.y}
                    width="70"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={node.x}
                    y={node.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                  {/* Link to root */}
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={300}
                    y2={70}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    className="dark:stroke-gray-500 animate-dash"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                </g>
              ))}

              {/* Level 2 nodes (leaf nodes under each branch) */}
              {[
                { parent: 0, children: [{ x: 40, y: 210 }, { x: 120, y: 210 }] },
                { parent: 1, children: [{ x: 260, y: 210 }, { x: 340, y: 210 }] },
                { parent: 2, children: [{ x: 480, y: 210 }, { x: 560, y: 210 }] },
              ].map((group, idx) => {
                const parentX = group.parent === 0 ? 80 : (group.parent === 1 ? 300 : 520);
                const parentY = 160;
                return group.children.map((child, j) => (
                  <g key={`${idx}-${j}`}>
                    <rect
                      x={child.x - 30}
                      y={child.y}
                      width="60"
                      height="35"
                      rx="6"
                      fill="#f59e0b"
                      className="dark:fill-amber-400"
                    />
                    <text
                      x={child.x}
                      y={child.y + 23}
                      textAnchor="middle"
                      fill="white"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      PC
                    </text>
                    <line
                      x1={child.x}
                      y1={child.y}
                      x2={parentX}
                      y2={parentY}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      className="dark:stroke-gray-500 animate-dash"
                      style={{ animationDelay: `${(idx + j) * 0.2}s` }}
                    />
                  </g>
                ));
              })}

              {/* Level 3 (additional leaf under Dept B) */}
              <rect x="280" y="280" width="60" height="35" rx="6" fill="#f59e0b" className="dark:fill-amber-400" />
              <text x="310" y="303" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PC</text>
              <line
                x1="310"
                y1="280"
                x2="300"
                y2="210"
                stroke="#94a3b8"
                strokeWidth="2"
                className="dark:stroke-gray-500 animate-dash"
                style={{ animationDelay: '0.8s' }}
              />

              {/* Animated data packets */}
              <circle r="5" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="300;80;300" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="70;120;70" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="300;520;300" dur="3.5s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="cy" values="70;120;70" dur="3.5s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle r="5" fill="#22c55e" className="dark:fill-green-400">
                <animate attributeName="cx" values="80;40;80" dur="2.5s" repeatCount="indefinite" begin="2s" />
                <animate attributeName="cy" values="160;210;160" dur="2.5s" repeatCount="indefinite" begin="2s" />
              </circle>

              {/* Labels */}
              <text x="300" y="335" textAnchor="middle" fill="#94a3b8" fontSize="12">
                Hierarchical structure with root, branches, and leaf nodes
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Tree topology creates a hierarchical network with a root, intermediate branches, and leaf devices.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Key Characteristics of Tree Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {treeCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-green-500 dark:text-green-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Components of Tree Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Components of a Tree Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {treeComponents.map((comp, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">{comp.icon}</span>
                <div>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- How Tree Topology Works --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            How Tree Topology Works
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📤</span>
              <div>
                <strong>Data Flow:</strong> Data travels from the root down to the branches and
                leaves. For communication between leaves on different branches, data goes up to
                the root and then down the other branch.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🧭</span>
              <div>
                <strong>Routing:</strong> Each node knows its parent and children. Traffic is
                forwarded based on destination – up to the root if necessary.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔄</span>
              <div>
                <strong>Scalability:</strong> Adding new branches or nodes is easy – just attach
                to an existing node without disrupting the rest.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⚠️</span>
              <div>
                <strong>Fault Propagation:</strong> If an intermediate node fails, its entire
                subtree becomes isolated. Redundancy (backup links) can mitigate this.
              </div>
            </div>
          </div>
        </section>

        {/* --- Real-world Scenario: University Campus Network --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Real-world Example: University Campus
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A university in <strong>Jadavpur</strong> uses a tree topology to connect its campus:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Root:</strong> Main data center with core routers.</li>
              <li><strong>Branches:</strong> Faculty buildings (Engineering, Science, Arts, Commerce).</li>
              <li><strong>Leaves:</strong> Each department has its own LAN with PCs, printers, and servers.</li>
              <li><strong>Backbone:</strong> Fiber links connect the root to each building.</li>
              <li><strong>Scalability:</strong> New buildings can be added by connecting to the backbone.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This hierarchical design allows the university to manage and expand its network
              efficiently. Students like <strong>Susmita</strong> in Engineering and
              <strong>Mahima</strong> in Science are on different branches but can still communicate
              through the root.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Tree Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {treeAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {treeDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tree vs Other Topologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Tree vs Other Topologies
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">Tree</th>
                  <th className="px-4 py-2 text-left">Star</th>
                  <th className="px-4 py-2 text-left">Bus</th>
                  <th className="px-4 py-2 text-left">Mesh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Hierarchy</td>
                  <td className="px-4 py-2">Yes</td>
                  <td className="px-4 py-2">No (flat)</td>
                  <td className="px-4 py-2">No</td>
                  <td className="px-4 py-2">No (flat)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Scalability</td>
                  <td className="px-4 py-2">High</td>
                  <td className="px-4 py-2">High</td>
                  <td className="px-4 py-2">Low</td>
                  <td className="px-4 py-2">Moderate</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Fault Tolerance</td>
                  <td className="px-4 py-2">Moderate</td>
                  <td className="px-4 py-2">Low</td>
                  <td className="px-4 py-2">Very Low</td>
                  <td className="px-4 py-2">Very High</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Cost</td>
                  <td className="px-4 py-2">Moderate-High</td>
                  <td className="px-4 py-2">Low-Moderate</td>
                  <td className="px-4 py-2">Low</td>
                  <td className="px-4 py-2">High</td>
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
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>redundant links</strong> to the root to avoid single point of failure.</li>
                <li>Choose <strong>high-speed backbone</strong> (fiber) to handle aggregate traffic.</li>
                <li>Organize branches by <strong>function or location</strong> for easier management.</li>
                <li>Implement <strong>VLANs</strong> to logically separate traffic within branches.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Not providing <strong>backup for the root</strong> – critical failure.</li>
                <li>Underestimating <strong>backbone bandwidth</strong> – causes congestion.</li>
                <li>Adding too many <strong>levels</strong> – increases latency.</li>
                <li>Ignoring <strong>cable management</strong> – maintenance becomes hard.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '900ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Tree Topology Design Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Define hierarchy:</strong> Identify levels and node roles (root, intermediate, leaf).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan backbone capacity:</strong> Ensure bandwidth for aggregate traffic.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement redundancy:</strong> Backup links for root and critical nodes.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Segment logically:</strong> Use VLANs to separate departments.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Monitor performance:</strong> Track traffic on backbone and key nodes.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document:</strong> Maintain a clear diagram and configuration records.
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
            Consider a large corporation with offices in multiple cities. How could they use a
            tree topology? What would the root be, and what would the branches represent?
            How could redundancy be added to the root? This helps you think about hierarchical
            network design for real-world organisations.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Tree topology is a practical approach for scaling networks. Emphasise the importance of the root and backbone – they are the network's lifeline. A common analogy is a river system: the main river (root) branches into streams (intermediate) and tributaries (leaves). Discuss how SDN and spine-leaf architectures are modern evolutions of tree concepts."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Tree Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic20;