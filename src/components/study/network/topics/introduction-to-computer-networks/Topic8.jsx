import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic8.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain hybrid topology – combining two or more basic topologies
 *          to leverage strengths and mitigate weaknesses, with real‑world
 *          implementation examples.
 * When & Why Used: After covering the five basic topologies, this topic shows
 *                  how real networks are rarely pure; they mix designs to
 *                  meet complex requirements (scale, cost, fault tolerance).
 */

const Topic8 = () => {
  const definition =
    "A hybrid topology is a network architecture that integrates two or more different physical topologies (e.g., star, bus, ring, mesh) into a single cohesive design. Each segment uses the topology best suited for its needs, and they are interconnected to form a unified network.";

  const commonCombinations = [
    {
      name: "Star‑Bus (Star of Stars)",
      description:
        "Multiple star networks (each with its own switch) are connected to a common bus backbone. This is common in school labs or office floors where each room has its own star, and all rooms connect to a backbone switch or bus.",
      example:
        "At Barrackpore High School, each computer lab uses a star topology with a central switch. All lab switches connect to a backbone switch (forming a star‑bus)."
    },
    {
      name: "Star‑Ring",
      description:
        "Multiple star networks are interconnected in a ring formation. This provides redundancy: if one link fails, traffic can go the other way around the ring.",
      example:
        "A university campus in Ichapur connects its building switches in a ring, while each building internally uses star topology."
    },
    {
      name: "Tree (Hierarchical Star)",
      description:
        "A special case of hybrid where stars are connected in a hierarchy (root switch to secondary switches). This is the foundation of most enterprise LANs.",
      example:
        "Debangshu's company in Shyamnagar has a core switch, distribution switches, and access switches forming a tree – essentially a star of stars."
    },
    {
      name: "Mesh‑Star",
      description:
        "Core routers or switches are arranged in a partial mesh for redundancy, and each core device serves as the center of its own star network for end devices.",
      example:
        "A data center uses a spine‑leaf architecture (a form of mesh‑star) to provide high bandwidth and redundancy."
    }
  ];

  const advantages = [
    "Flexibility – each segment can use the topology that best fits its needs (e.g., star for departments, ring for redundancy between buildings).",
    "Scalability – new segments can be added without redesigning the entire network.",
    "Optimized performance – critical parts can be given high‑performance topologies (like mesh), while less critical parts use cost‑effective ones.",
    "Improved fault tolerance – if one segment fails, the rest can continue operating."
  ];

  const disadvantages = [
    "Complex design and implementation – requires careful planning and skilled engineers.",
    "Higher cost – multiple types of equipment and cabling increase expense.",
    "Difficult troubleshooting – problems may span multiple topologies and require knowledge of each.",
    "Potential compatibility issues – different topologies must be properly interconnected (e.g., using appropriate devices)."
  ];

  const practicalImplementation = {
    description:
      "Organizations typically design hybrid networks by first defining functional zones (e.g., server room, administrative offices, classrooms, guest Wi‑Fi). Each zone uses a topology that suits its needs:",
    zones: [
      {
        zone: "Data Center / Server Room",
        topology: "Partial mesh or fat‑tree for redundancy and high throughput.",
        devices: "Core switches, routers, firewalls."
      },
      {
        zone: "Office Floor",
        topology: "Star with switches; may use VLANs to segment departments.",
        devices: "Access switches, patch panels."
      },
      {
        zone: "Building Backbone",
        topology: "Ring or redundant star for resilience between floors or buildings.",
        devices: "Fiber optic links, distribution switches."
      },
      {
        zone: "Remote / Branch Offices",
        topology: "Often a star back to headquarters via WAN (e.g., MPLS or VPN).",
        devices: "Routers, firewalls, switches."
      }
    ]
  };

  const realWorldUsage = [
    {
      scenario: "Enterprise Campus Network",
      description:
        "Swadeep's company has multiple buildings in Barrackpore. Each building uses a star topology internally. The buildings are interconnected via a fiber ring (star‑ring hybrid). If a fiber cut occurs, traffic routes the other way around the ring."
    },
    {
      scenario: "Internet Service Provider (ISP)",
      description:
        "An ISP in Shyamnagar uses a core mesh network for high reliability, while customer connections are star‑based (each neighborhood node serves many homes)."
    },
    {
      scenario: "Smart City Network",
      description:
        "Ichapur's smart city project uses a mesh for critical infrastructure (traffic lights, emergency services) and a star for public Wi‑Fi hotspots – all integrated through a central management system."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Designing without a clear plan",
      correction:
        "Hybrid networks require thorough documentation. Use network diagrams to map each segment and its interconnections."
    },
    {
      mistake: "Mismatching equipment capabilities",
      correction:
        "Ensure devices that connect different topologies (e.g., switches between star and ring) support necessary protocols (like spanning tree for loops)."
    },
    {
      mistake: "Overlooking redundancy at interconnection points",
      correction:
        "If the backbone connecting segments is a single point of failure, the whole hybrid network can collapse. Plan redundant links."
    }
  ];

  const bestPractices = [
    "Document every segment and its topology clearly.",
    "Use standard protocols (e.g., spanning tree) to prevent loops when interconnecting switches.",
    "Start with a core topology (like star or ring) and build outward.",
    "Plan for growth – hybrid networks are meant to scale, so leave room for additional segments."
  ];

  const tipsAndTricks = [
    "Use network simulation tools (e.g., Cisco Packet Tracer, GNS3) to design and test hybrid topologies before physical deployment.",
    "When interconnecting different topologies, use devices that can handle multiple roles (e.g., layer‑3 switches).",
    "Label cables and devices according to which topology segment they belong to – saves hours of troubleshooting."
  ];

  const miniChecklist = [
    "☐ I can define hybrid topology and explain why it is used.",
    "☐ I can name at least three common hybrid combinations (e.g., star‑bus, star‑ring, tree).",
    "☐ I understand the trade‑offs (flexibility vs. complexity).",
    "☐ I can give a real‑world example of a hybrid network (e.g., campus, ISP).",
    "☐ I know that planning and documentation are critical for hybrid designs."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
            Hybrid Topology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The best of multiple worlds – integrated and scalable
          </p>
        </div>

        {/* Definition & Common Combinations */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-fuchsia-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧬</span>
              <h2 className="text-2xl font-semibold">What is Hybrid Topology?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-fuchsia-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of it like a city: residential areas use a star layout (houses connected to a local hub), while major highways form a mesh, and a ring road connects districts.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔗</span>
              <h2 className="text-2xl font-semibold">Common Combinations</h2>
            </div>
            <ul className="space-y-3">
              {commonCombinations.map((combo, i) => (
                <li key={i} className="border-b border-gray-700 pb-2 last:border-0">
                  <strong className="text-fuchsia-300">{combo.name}</strong>
                  <p className="text-gray-300 text-sm mt-1">{combo.description}</p>
                  <p className="text-gray-400 text-xs mt-1">📌 Example: {combo.example}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG Illustration: Star‑Bus Hybrid */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏗️</span>
            <h2 className="text-2xl font-semibold">Visual: Star‑Bus Hybrid</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Star-Bus Hybrid: Multiple stars connected by a backbone bus</title>
              
              {/* Backbone bus (horizontal line) */}
              <line x1="80" y1="150" x2="670" y2="150" stroke="#F59E0B" strokeWidth="3" />
              <text x="375" y="140" fill="#F59E0B" fontSize="12" textAnchor="middle">Backbone Bus</text>
              
              {/* Star 1 (left) */}
              <rect x="50" y="30" width="140" height="90" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="120" y="45" fill="#60A5FA" fontSize="10" textAnchor="middle">Star Segment 1</text>
              <circle cx="120" cy="90" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="120" y="95" fill="#E5E7EB" fontSize="10" textAnchor="middle">Switch</text>
              <circle cx="70" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="70" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="120" cy="130" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="120" y="135" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="170" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="170" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <line x1="70" y1="108" x2="115" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="120" y1="110" x2="120" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="170" y1="108" x2="125" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              
              {/* Connection from Star 1 to backbone */}
              <line x1="120" y1="110" x2="120" y2="150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Star 2 (center) */}
              <rect x="280" y="30" width="140" height="90" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="350" y="45" fill="#60A5FA" fontSize="10" textAnchor="middle">Star Segment 2</text>
              <circle cx="350" cy="90" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="350" y="95" fill="#E5E7EB" fontSize="10" textAnchor="middle">Switch</text>
              <circle cx="300" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="300" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="350" cy="130" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="350" y="135" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="400" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="400" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <line x1="300" y1="108" x2="345" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="350" y1="110" x2="350" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="400" y1="108" x2="355" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="350" y1="110" x2="350" y2="150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Star 3 (right) */}
              <rect x="520" y="30" width="140" height="90" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="590" y="45" fill="#60A5FA" fontSize="10" textAnchor="middle">Star Segment 3</text>
              <circle cx="590" cy="90" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="590" y="95" fill="#E5E7EB" fontSize="10" textAnchor="middle">Switch</text>
              <circle cx="540" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="540" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="590" cy="130" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="590" y="135" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <circle cx="640" cy="120" r="12" fill="#1F2937" stroke="#9CA3AF" />
              <text x="640" y="125" fill="#9CA3AF" fontSize="8" textAnchor="middle">PC</text>
              <line x1="540" y1="108" x2="585" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="590" y1="110" x2="590" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="640" y1="108" x2="595" y2="95" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="590" y1="110" x2="590" y2="150" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Animated packet traveling from left star to right star via bus */}
              <circle cx="120" cy="150" r="5" fill="#F97316">
                <animate attributeName="cx" values="120;350;590" dur="4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="150;150;150" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Star‑bus hybrid: each department (star) connects to a backbone bus; data travels between stars via the backbone.
          </p>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-2xl font-semibold">Advantages</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">❌</span>
              <h2 className="text-2xl font-semibold">Disadvantages</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {disadvantages.map((dis, i) => (
                <li key={i}>{dis}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practical Implementation */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏢</span>
            <h2 className="text-2xl font-semibold">Practical Implementation in Organizations</h2>
          </div>
          <p className="text-gray-200 mb-4">{practicalImplementation.description}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {practicalImplementation.zones.map((zone, idx) => (
              <div
                key={zone.zone}
                className="bg-gray-800/70 rounded-lg p-3 border border-gray-600 hover:border-fuchsia-400/70 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.7 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-md font-medium text-fuchsia-300">{zone.zone}</h3>
                <p className="text-gray-300 text-sm"><strong>Topology:</strong> {zone.topology}</p>
                <p className="text-gray-400 text-xs"><strong>Devices:</strong> {zone.devices}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Usage */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Examples</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldUsage.map((ex, idx) => (
              <div
                key={ex.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-rose-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.9 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-rose-300">{ex.scenario}</h3>
                <p className="text-gray-300 text-sm mt-2">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4"
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
          className="border border-dashed border-fuchsia-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-fuchsia-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why do large organizations almost never use a pure star or pure ring? What trade‑offs drive them to hybrid designs?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Sketch a network for a school with three buildings. Each building has a computer lab (star). The buildings are far apart, and you want redundancy. Which hybrid topology would you choose? How would you interconnect them?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.5s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Hybrid topology is the reality of most networks. Encourage students to see that real designs mix and match. Use the 'tree' (hierarchical star) as a common example: it's what they see in their own school or office. Emphasize that understanding basic topologies is essential because they are the building blocks. Discuss how adding a redundant link can turn a simple tree into a partial mesh. Use tools like Packet Tracer to let students build their own hybrids."
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

export default Topic8;