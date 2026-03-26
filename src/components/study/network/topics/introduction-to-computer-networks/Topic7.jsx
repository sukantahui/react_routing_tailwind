import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic7.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain mesh topology, its two variants (full and partial mesh),
 *          reliability, cost implications, and real‑world applications.
 * When & Why Used: After covering star, bus, and ring topologies, this topic
 *                  presents the most robust (but expensive) physical layout.
 *                  It prepares students for network design considerations.
 */

const Topic7 = () => {
  const fullMesh = {
    description:
      "Every node is directly connected to every other node. For N nodes, number of links = N(N‑1)/2.",
    advantages: [
      "Extreme reliability – multiple redundant paths; no single point of failure.",
      "Fast communication – direct path between any two nodes; no intermediate hops.",
      "Excellent fault tolerance – if any link fails, alternative routes exist."
    ],
    disadvantages: [
      "Very high cost – requires many cables and ports (N(N‑1)/2 links).",
      "Difficult to expand – adding a new node requires connecting it to all existing nodes.",
      "Complex configuration and management."
    ]
  };

  const partialMesh = {
    description:
      "Some nodes are connected to all others, others only to a few; not all possible links exist.",
    advantages: [
      "Balanced cost vs. reliability – uses fewer links than full mesh while providing redundancy.",
      "Flexible design – critical nodes can have more connections.",
      "Easier to scale than full mesh."
    ],
    disadvantages: [
      "Still more expensive than star or bus topologies.",
      "Fault tolerance depends on which links exist – some nodes may be isolated if their few links fail."
    ]
  };

  const reliabilityAnalysis = [
    "Redundant paths ensure that if one link fails, data can be rerouted through an alternate path.",
    "In a full mesh, every node is connected to every other, so there is no single point of failure.",
    "Partial mesh provides high reliability for critical nodes (which are fully connected) while reducing cost.",
    "Modern routing protocols (e.g., OSPF, BGP) automatically discover and use alternative paths in a mesh."
  ];

  const costAnalysis = [
    "Cabling cost: Full mesh requires the most cables; partial mesh reduces this.",
    "Port cost: Each connection needs a port on a switch/router; full mesh demands many ports.",
    "Installation and maintenance: More links mean higher labor and troubleshooting costs.",
    "Trade‑off: The increased reliability and performance may justify the cost for critical infrastructure."
  ];

  const applications = [
    {
      scenario: "Internet Backbone",
      description:
        "The core of the Internet is a partial mesh. Major ISPs (tier‑1) interconnect at Internet exchange points. Swadeep's data from Barrackpore to a server in the US may traverse multiple redundant paths."
    },
    {
      scenario: "Data Centers",
      description:
        "Modern data centers use Clos networks (a form of multi‑stage mesh) to provide high bandwidth and redundancy between racks and servers. This ensures that if a switch fails, traffic can be rerouted."
    },
    {
      scenario: "Military & Critical Infrastructure",
      description:
        "Communication networks for defense, emergency services, and power grids often use partial mesh to survive physical attacks or natural disasters. Tuhina's city has a mesh network for emergency communications."
    },
    {
      scenario: "Wireless Mesh Networks",
      description:
        "Community Wi‑Fi networks, IoT sensor networks, and some smart city deployments use wireless mesh. Each node forwards data for others, creating a self‑healing network. Susmita's neighborhood in Ichapur uses such a mesh to share internet access."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Thinking full mesh is always the best choice",
      correction:
        "Full mesh is expensive and often overkill. Most real‑world applications use partial mesh to balance cost and reliability."
    },
    {
      mistake: "Ignoring path redundancy when designing partial mesh",
      correction:
        "If a critical node has only one connection, it becomes a single point of failure. Ensure that important nodes have multiple links."
    },
    {
      mistake: "Confusing physical mesh with logical mesh",
      correction:
        "A network can be physically star (switched) but logically act as a mesh through routing protocols (e.g., OSPF)."
    }
  ];

  const bestPractices = [
    "For critical applications, design partial mesh with at least two links per core device.",
    "Use dynamic routing protocols (like OSPF or BGP) to take advantage of redundant paths.",
    "Plan for future growth: leave spare ports and cable paths to add new nodes without re‑cabling.",
    "Document the mesh topology clearly – it can become complex quickly."
  ];

  const tipsAndTricks = [
    "Use the formula N(N‑1)/2 to quickly estimate full mesh cost; it grows quadratically.",
    "In a partial mesh, prioritize connecting devices that have the most traffic between them.",
    "Network simulation tools (e.g., GNS3, EVE‑NG) can help visualize and test mesh designs."
  ];

  const miniChecklist = [
    "☐ I can explain the difference between full and partial mesh.",
    "☐ I understand that reliability increases with redundancy.",
    "☐ I can analyze the cost trade‑offs of mesh topologies.",
    "☐ I can name at least two real‑world applications of mesh networks.",
    "☐ I know why full mesh is rarely used in large networks."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Mesh Topology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ultimate reliability through redundancy
          </p>
        </div>

        {/* Full vs Partial Mesh */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔗</span>
              <h2 className="text-2xl font-semibold">Full Mesh</h2>
            </div>
            <p className="text-gray-200 mb-3">{fullMesh.description}</p>
            <div className="mb-2">
              <strong className="text-green-300">Advantages:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-200">
                {fullMesh.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="text-red-300">Disadvantages:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-200">
                {fullMesh.disadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌐</span>
              <h2 className="text-2xl font-semibold">Partial Mesh</h2>
            </div>
            <p className="text-gray-200 mb-3">{partialMesh.description}</p>
            <div className="mb-2">
              <strong className="text-green-300">Advantages:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-200">
                {partialMesh.advantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="text-red-300">Disadvantages:</strong>
              <ul className="list-disc pl-5 mt-1 text-gray-200">
                {partialMesh.disadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SVG Illustration: Full vs Partial Mesh */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl font-semibold">Visual Comparison</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Full mesh (left) vs Partial mesh (right)</title>
              
              {/* Full Mesh (left side) */}
              <text x="200" y="30" fill="#A78BFA" fontSize="14" textAnchor="middle">Full Mesh</text>
              <circle cx="140" cy="120" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="140" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">A</text>
              <circle cx="260" cy="120" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="260" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">B</text>
              <circle cx="200" cy="220" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="200" y="225" fill="#E5E7EB" fontSize="12" textAnchor="middle">C</text>
              <circle cx="80" cy="220" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="80" y="225" fill="#E5E7EB" fontSize="12" textAnchor="middle">D</text>
              
              {/* All connections for full mesh */}
              <line x1="140" y1="120" x2="260" y2="120" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="140" y1="120" x2="200" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="140" y1="120" x2="80" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="260" y1="120" x2="200" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="260" y1="120" x2="80" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="200" y1="220" x2="80" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              
              {/* Partial Mesh (right side) */}
              <text x="600" y="30" fill="#A78BFA" fontSize="14" textAnchor="middle">Partial Mesh</text>
              <circle cx="540" cy="120" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="540" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">A</text>
              <circle cx="660" cy="120" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="660" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">B</text>
              <circle cx="600" cy="220" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="600" y="225" fill="#E5E7EB" fontSize="12" textAnchor="middle">C</text>
              <circle cx="480" cy="220" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="480" y="225" fill="#E5E7EB" fontSize="12" textAnchor="middle">D</text>
              
              {/* Partial connections */}
              <line x1="540" y1="120" x2="660" y2="120" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="540" y1="120" x2="600" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="660" y1="120" x2="600" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="600" y1="220" x2="480" y2="220" stroke="#60A5FA" strokeWidth="1.5" />
              {/* missing: A-D, B-D, C-D (only one D connection) */}
              
              {/* Animated data path on full mesh */}
              <circle cx="140" cy="120" r="4" fill="#F97316">
                <animate attributeName="cx" values="140;260;200;80;140" dur="5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="120;120;220;220;120" dur="5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Full mesh (left) connects every node to every other; partial mesh (right) only some.
          </p>
        </div>

        {/* Reliability & Cost Analysis */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔒</span>
              <h2 className="text-2xl font-semibold">Reliability Analysis</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {reliabilityAnalysis.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💰</span>
              <h2 className="text-2xl font-semibold">Cost Analysis</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {costAnalysis.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-300 italic">
                📐 For N nodes, full mesh links = N(N‑1)/2. For N=10, that's 45 links; partial mesh can reduce this significantly.
              </p>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏗️</span>
            <h2 className="text-2xl font-semibold">Real‑World Applications</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((app, idx) => (
              <div
                key={app.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-indigo-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.7 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-indigo-300">{app.scenario}</h3>
                <p className="text-gray-300 text-sm mt-2">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-2xl font-semibold">Common Mistakes & Pitfalls</h2>
            </div>
            <ul className="space-y-4">
              {commonMistakes.map((item, idx) => (
                <li key={idx} className="border-b border-gray-700 pb-3 last:border-0">
                  <p className="font-medium text-red-300">{item.mistake}</p>
                  <p className="text-gray-300 text-sm mt-1">✓ {item.correction}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-2xl font-semibold">Best Practices</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-gray-200">
              {bestPractices.map((practice, idx) => (
                <li key={idx} className="hover:text-green-300 transition-colors">
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tips & Tricks + Mini Checklist */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-2xl font-semibold">Tips & Tricks</h2>
            </div>
            <ul className="space-y-3 list-disc pl-5 text-gray-200">
              {tipsAndTricks.map((tip, idx) => (
                <li key={idx} className="hover:text-yellow-300 transition-colors">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📋</span>
              <h2 className="text-2xl font-semibold">Mini Checklist</h2>
            </div>
            <div className="grid gap-2">
              {miniChecklist.map((item, idx) => (
                <p key={idx} className="text-gray-200 flex items-start gap-2">
                  <span className="text-green-400">✓</span> {item.substring(2)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div
          className="border border-dashed border-indigo-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-indigo-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why does the Internet use a partial mesh rather than full mesh? What would be the consequence if a major Internet exchange point went offline?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Calculate the number of links required for a full mesh of 100 routers. Compare with a partial mesh where each router connects to only 3 others. Which is more cost‑effective? Which is more reliable?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Mesh topology introduces the concept of redundancy and its cost. Emphasize that in the real world, engineers balance reliability against budget. Use the Internet backbone as a tangible example. Show how BGP can reroute traffic around failures. The formula N(N‑1)/2 helps students understand the quadratic cost. Encourage them to draw both full and partial meshes for small N to internalize the difference."
            }
          />
        </div>

        {/* Keyframe Styles */}
        <style>{`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(1rem);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic7;