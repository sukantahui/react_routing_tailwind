import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic15_files/topic15_questions';

const Topic15 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(14, 165, 233, 0); }
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

  const topologyTypes = [
    {
      name: 'Bus Topology',
      icon: '🚌',
      desc: 'All devices share a single communication line (backbone). Simple and cheap but a single break can bring down the network.',
    },
    {
      name: 'Star Topology',
      icon: '⭐',
      desc: 'All devices connect to a central hub/switch. Most common today. Easy to manage but depends on the central device.',
    },
    {
      name: 'Ring Topology',
      icon: '⭕',
      desc: 'Devices form a ring where each device connects to two others. Data travels in one or both directions. Fault-tolerant with dual rings.',
    },
    {
      name: 'Mesh Topology',
      icon: '🕸️',
      desc: 'Every device connects to every other device. Highly redundant but expensive. Used in critical networks.',
    },
    {
      name: 'Tree Topology',
      icon: '🌳',
      desc: 'Hierarchical structure with a root node and branches. Combines bus and star. Scalable but depends on the root.',
    },
    {
      name: 'Hybrid Topology',
      icon: '🔀',
      desc: 'Combines two or more topologies. Flexible and scalable but complex to design and manage.',
    },
  ];

  const comparisonData = [
    { attribute: 'Cost', Bus: 'Low', Star: 'Moderate', Ring: 'Moderate', Mesh: 'High', Tree: 'Moderate', Hybrid: 'High' },
    { attribute: 'Reliability', Bus: 'Low', Star: 'Moderate', Ring: 'High', Mesh: 'Very High', Tree: 'Moderate', Hybrid: 'High' },
    { attribute: 'Scalability', Bus: 'Low', Star: 'High', Ring: 'Moderate', Mesh: 'Low', Tree: 'High', Hybrid: 'High' },
    { attribute: 'Fault Tolerance', Bus: 'Low', Star: 'Low', Ring: 'High (dual ring)', Mesh: 'Very High', Tree: 'Moderate', Hybrid: 'High' },
    { attribute: 'Implementation', Bus: 'Simple', Star: 'Simple', Ring: 'Moderate', Mesh: 'Complex', Tree: 'Moderate', Hybrid: 'Complex' },
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Network Topology Overview
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The blueprint of your network – how devices are connected and organized
          </p>
        </section>

        {/* --- Introduction: What is Topology? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            What is Network Topology?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Network topology</strong> is the arrangement of nodes and links in a computer
              network. It defines how devices are connected and how data flows between them. Topology
              can be considered at two levels:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Physical Topology:</strong> The actual layout of cables, devices, and connections.</li>
              <li><strong>Logical Topology:</strong> How data flows through the network, independent of the physical layout.</li>
            </ul>
            <p>
              Choosing the right topology is crucial for network performance, reliability, scalability,
              and cost. The wrong choice can lead to bottlenecks, high costs, and maintenance headaches.
            </p>
            <p>
              For students in <strong>Kolkata</strong>, understanding topology helps them design
              networks for school projects, home networks, or future enterprise systems. <strong>Susmita</strong>
              and <strong>Debangshu</strong> can use this knowledge to plan a computer lab layout
              that is efficient and fault-tolerant.
            </p>
          </div>

          {/* SVG: Topology Comparison Overview */}
          <div className="mt-6 flex justify-center">
            <svg
              width="650"
              height="280"
              viewBox="0 0 650 280"
              className="w-full max-w-2xl h-auto"
              aria-label="Overview of different network topologies: Bus, Star, Ring, Mesh"
            >
              <rect width="650" height="280" fill="transparent" />

              {/* Bus Topology */}
              <rect x="20" y="20" width="140" height="110" rx="6" fill="#1e293b" opacity="0.1" className="dark:opacity-20" />
              <text x="90" y="40" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Bus</text>
              <line x1="30" y1="70" x2="150" y2="70" stroke="#3b82f6" strokeWidth="2" />
              {[40, 70, 100, 130].map((x, i) => (
                <circle key={i} cx={x} cy="70" r="6" fill="#3b82f6" />
              ))}

              {/* Star Topology */}
              <rect x="180" y="20" width="140" height="110" rx="6" fill="#1e293b" opacity="0.1" className="dark:opacity-20" />
              <text x="250" y="40" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Star</text>
              <circle cx="250" cy="75" r="12" fill="#8b5cf6" />
              {[
                { x: 210, y: 50 },
                { x: 290, y: 50 },
                { x: 210, y: 100 },
                { x: 290, y: 100 },
              ].map((p, i) => {
                const dx = p.x - 250;
                const dy = p.y - 75;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const ratio = 12 / dist;
                return (
                  <line
                    key={i}
                    x1={250 + dx * ratio}
                    y1={75 + dy * ratio}
                    x2={p.x}
                    y2={p.y}
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                  />
                );
              })}
              {[
                { x: 210, y: 50 },
                { x: 290, y: 50 },
                { x: 210, y: 100 },
                { x: 290, y: 100 },
              ].map((p, i) => (
                <circle key={i + 4} cx={p.x} cy={p.y} r="5" fill="#8b5cf6" />
              ))}

              {/* Ring Topology */}
              <rect x="340" y="20" width="140" height="110" rx="6" fill="#1e293b" opacity="0.1" className="dark:opacity-20" />
              <text x="410" y="40" textAnchor="middle" fill="#ec4899" fontSize="11" fontWeight="bold">Ring</text>
              <circle cx="410" cy="75" r="35" fill="none" stroke="#ec4899" strokeWidth="2" />
              {[
                { x: 410, y: 40 },
                { x: 445, y: 75 },
                { x: 410, y: 110 },
                { x: 375, y: 75 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="5" fill="#ec4899" />
              ))}

              {/* Mesh Topology */}
              <rect x="500" y="20" width="140" height="110" rx="6" fill="#1e293b" opacity="0.1" className="dark:opacity-20" />
              <text x="570" y="40" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Mesh</text>
              {[
                { x: 530, y: 50 },
                { x: 610, y: 50 },
                { x: 530, y: 100 },
                { x: 610, y: 100 },
              ].map((p1, i) => {
                return [
                  { x: 530, y: 50 },
                  { x: 610, y: 50 },
                  { x: 530, y: 100 },
                  { x: 610, y: 100 },
                ].map((p2, j) => {
                  if (i < j) {
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    const offset = 6;
                    const nx = -dy / dist * offset;
                    const ny = dx / dist * offset;
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={p1.x + nx}
                        y1={p1.y + ny}
                        x2={p2.x + nx}
                        y2={p2.y + ny}
                        stroke="#f59e0b"
                        strokeWidth="1"
                      />
                    );
                  }
                  return null;
                });
              })}
              {[
                { x: 530, y: 50 },
                { x: 610, y: 50 },
                { x: 530, y: 100 },
                { x: 610, y: 100 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="5" fill="#f59e0b" />
              ))}

              {/* Labels */}
              <text x="325" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Common Network Topologies
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Each topology has unique characteristics – the choice depends on your needs.
          </p>
        </section>

        {/* --- Topology Types (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            The Six Main Topologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topologyTypes.map((topo, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {topo.icon}
                  </span>
                  <h3 className="font-semibold text-sky-600 dark:text-sky-400">
                    {topo.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {topo.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Physical vs Logical Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Physical vs Logical Topology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">🔌 Physical Topology</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Definition:</strong> The actual physical layout of cables, devices, and connections.</li>
                <li><strong>Examples:</strong> How Ethernet cables are run, where switches are placed.</li>
                <li><strong>Impact:</strong> Affects cost, installation time, and physical constraints.</li>
                <li><strong>Changes:</strong> Requires re-cabling and physical modifications.</li>
              </ul>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-semibold text-cyan-700 dark:text-cyan-400">🧠 Logical Topology</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Definition:</strong> How data flows through the network, independent of physical layout.</li>
                <li><strong>Examples:</strong> Token Ring (logical ring) over a physical star, VLANs.</li>
                <li><strong>Impact:</strong> Affects performance, fault tolerance, and traffic patterns.</li>
                <li><strong>Changes:</strong> Can be modified through software configuration.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Topology Comparison
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Attribute</th>
                  <th className="px-4 py-2 text-left">Bus</th>
                  <th className="px-4 py-2 text-left">Star</th>
                  <th className="px-4 py-2 text-left">Ring</th>
                  <th className="px-4 py-2 text-left">Mesh</th>
                  <th className="px-4 py-2 text-left">Tree</th>
                  <th className="px-4 py-2 text-left">Hybrid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 font-semibold">{row.attribute}</td>
                    <td className="px-4 py-2">{row.Bus}</td>
                    <td className="px-4 py-2">{row.Star}</td>
                    <td className="px-4 py-2">{row.Ring}</td>
                    <td className="px-4 py-2">{row.Mesh}</td>
                    <td className="px-4 py-2">{row.Tree}</td>
                    <td className="px-4 py-2">{row.Hybrid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Real-world Scenario: Choosing a Topology for a School --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Real-world Example: Designing a School Lab
          </h2>
          <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg border border-sky-200 dark:border-sky-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A school in <strong>Ichapur</strong> needs to design a computer lab with 30 PCs,
              a printer, and a server. The topology choice is critical:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Star Topology:</strong> All devices connect to a central switch. Easy to install and troubleshoot.</li>
              <li><strong>Why Star?</strong> If one PC fails, the rest continue working. Adding new PCs is simple.</li>
              <li><strong>Considerations:</strong> The switch must be reliable and have enough ports.</li>
              <li><strong>Result:</strong> A star topology provides the best balance of cost, performance, and manageability.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This is why star topology is the most common choice for LANs.
            </p>
          </div>
        </section>

        {/* --- Factors in Choosing a Topology --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Factors to Consider When Choosing a Topology
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">💰</span>
              <div>
                <strong>Cost:</strong> Cabling, hardware, and installation expenses. Some topologies (mesh) are expensive.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🛡️</span>
              <div>
                <strong>Reliability & Fault Tolerance:</strong> Can the network survive failures? Mesh is most reliable.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">📈</span>
              <div>
                <strong>Scalability:</strong> Can you add new devices easily? Star and tree are highly scalable.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">🔧</span>
              <div>
                <strong>Manageability:</strong> How easy is it to maintain and troubleshoot? Star is easiest.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200">
              <span className="text-xl mt-0.5">⚡</span>
              <div>
                <strong>Performance:</strong> How efficiently does data flow? Depends on traffic patterns and bottlenecks.
              </div>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>For most LANs, <strong>star topology</strong> is the best choice.</li>
                <li>For critical systems, use <strong>mesh or ring</strong> for redundancy.</li>
                <li><strong>Hybrid topologies</strong> combine the best of multiple types.</li>
                <li>Plan for <strong>future growth</strong> – choose a topology that scales easily.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Choosing a topology <strong>without considering expansion</strong> – leads to costly redesigns.</li>
                <li>Ignoring <strong>single points of failure</strong> – central switch in star, root in tree.</li>
                <li>Confusing <strong>physical and logical topology</strong> – they can be different!</li>
                <li>Not <strong>documenting</strong> the topology – makes troubleshooting harder.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-sky-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Topology Design Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Define requirements:</strong> Number of devices, expected traffic, budget.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Analyze fault tolerance needs:</strong> How critical is uptime?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Consider physical constraints:</strong> Building layout, cabling options.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Evaluate cost:</strong> Balance budget with performance and reliability.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for scalability:</strong> Can the network grow with the organization?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document the design:</strong> Create diagrams and configuration notes.
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
            Look at the network around you – your home, school, or office. Can you identify the topology?
            Is it star? Tree? Hybrid? Try to trace the connections from your device to the router or switch.
            This helps you see topology in action and understand why certain choices were made.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Topology is the foundation of network design. Emphasize that the choice is rarely pure – most real-world networks are hybrids. Use visual aids and real-world examples to make the concepts concrete. A great classroom activity is to have students design a topology for a given scenario and justify their choices based on cost, reliability, and scalability."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Network Topology FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic15;