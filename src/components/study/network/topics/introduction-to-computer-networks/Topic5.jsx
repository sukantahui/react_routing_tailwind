import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic5.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the bus network topology – its physical structure,
 *          how data is transmitted, its pros and cons, and where it
 *          was historically used (and where it still appears today).
 * When & Why Used: After covering the star topology (Topic4), this topic
 *                  introduces an alternative design that was common in
 *                  early Ethernet networks. It contrasts with the star
 *                  and prepares students for ring and mesh topologies.
 */

const Topic5 = () => {
  const advantages = [
    "Requires less cable than star or mesh topologies – cost‑effective for small networks.",
    "Easy to install – simply daisy‑chain devices along a single cable.",
    "Works well for temporary or small setups (e.g., a few computers in a classroom).",
    "No central device needed – eliminates a single point of failure (though the bus itself becomes critical)."
  ];

  const disadvantages = [
    "Entire network fails if the main cable (bus) is broken at any point.",
    "Performance degrades quickly as more devices are added due to collisions.",
    "Difficult to troubleshoot – a break can be hard to locate.",
    "Limited cable length and number of nodes (e.g., Ethernet 10Base2: 185m, 30 nodes).",
    "Terminators are required at both ends; if missing, signals reflect and cause errors.",
    "Security is weak – every device sees all traffic (shared medium)."
  ];

  const limitations = [
    "Maximum cable length (e.g., 185m for thin coax, 500m for thick coax).",
    "Maximum number of nodes (e.g., 30 for 10Base2).",
    "Collisions become severe under moderate traffic (CSMA/CD only helps so much).",
    "Not suitable for large or high‑performance networks."
  ];

  const realWorldUsage = [
    {
      scenario: "Legacy Ethernet (10Base2 / 10Base5)",
      description: "In the 1980s and early 1990s, many office LANs used thin coaxial cable (10Base2) with BNC connectors. Swadeep's first computer lab in Barrackpore had such a network – one break would silence the whole lab."
    },
    {
      scenario: "Cable TV / Hybrid Fiber‑Coax (HFC)",
      description: "Modern cable internet uses a bus-like architecture from the neighborhood node to homes. The coax cable is a shared medium; many households in Shyamnagar share the same bus, which is why speeds can drop during peak hours."
    },
    {
      scenario: "Temporary or Test Networks",
      description: "When Tuhina sets up a quick connection between three Raspberry Pis for a project, she might use a simple bus configuration with short cables – no switch required."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Forgetting to install terminators at both ends",
      correction: "Without terminators, signals bounce back and cause collisions. Always use 50‑ohm terminators on coaxial bus networks."
    },
    {
      mistake: "Adding too many devices",
      correction: "Exceeding the maximum node count (e.g., >30 on 10Base2) severely degrades performance due to excessive collisions."
    },
    {
      mistake: "Bending or damaging the main cable",
      correction: "A single break anywhere brings down the entire network. Use high‑quality cables and protect them from damage."
    }
  ];

  const bestPractices = [
    "Use bus topology only for very small, temporary networks (e.g., ≤5 devices).",
    "Always verify proper termination with a multimeter if using coax.",
    "Monitor collision rates using tools like `ifconfig` or network analyzers.",
    "For permanent installations, prefer star topology with switches for better performance and fault isolation."
  ];

  const tipsAndTricks = [
    "To locate a break in a bus cable, use a time‑domain reflectometer (TDR) or segment the network and test each section.",
    "If you must use a bus, keep it physically accessible so breaks can be found quickly.",
    "In a lab environment, a bus is great for teaching CSMA/CD concepts – you can simulate collisions by adding traffic."
  ];

  const miniChecklist = [
    "☐ I can describe the physical layout of a bus topology.",
    "☐ I understand that all devices share a single communication line.",
    "☐ I can list at least three advantages and three disadvantages.",
    "☐ I know the purpose of terminators and what happens if they are missing.",
    "☐ I can give a real‑world example where bus topology is still used."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            Bus Topology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One cable, many devices – the simplicity of a shared backbone
          </p>
        </div>

        {/* Structure & Working Principle */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📡</span>
              <h2 className="text-2xl font-semibold">Structure</h2>
            </div>
            <p className="text-gray-200">
              In a bus topology, all devices are connected to a single central cable called the <strong className="text-amber-300">backbone</strong> or <strong className="text-amber-300">bus</strong>. 
              Each node connects to the bus via a tap or a connector (e.g., BNC T‑connector). 
              The two ends of the bus are fitted with <strong className="text-amber-300">terminators</strong> to absorb signals and prevent reflections.
            </p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm text-gray-300 italic">
                🚌 Think of it like a school bus route: the bus is the main road; students (devices) board and alight along the route.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-semibold">Working Principle</h2>
            </div>
            <p className="text-gray-200">
              When a node sends data, it places the signal onto the bus. The signal travels in both directions along the cable.
              All devices on the bus receive the signal, but only the intended recipient processes it (based on the destination address).
              Because the medium is shared, <strong className="text-amber-300">collisions</strong> occur when two devices transmit simultaneously. 
              Ethernet uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection) to manage this – devices listen before talking and back off when a collision is detected.
            </p>
            <p className="text-gray-200 mt-2">
              Terminators at each end absorb the signal, preventing it from bouncing back and causing interference.
            </p>
          </div>
        </div>

        {/* SVG Illustration: Bus Topology with Terminators and Collision */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖼️</span>
            <h2 className="text-2xl font-semibold">Visual: Bus Topology</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Bus topology with backbone, nodes, terminators, and collision animation</title>
              {/* Backbone cable */}
              <line x1="40" y1="140" x2="660" y2="140" stroke="#9CA3AF" strokeWidth="4" />
              
              {/* Terminators (ends) */}
              <rect x="30" y="130" width="20" height="20" fill="#F59E0B" rx="2" />
              <text x="40" y="125" fill="#F59E0B" fontSize="10" textAnchor="middle">T</text>
              <rect x="650" y="130" width="20" height="20" fill="#F59E0B" rx="2" />
              <text x="660" y="125" fill="#F59E0B" fontSize="10" textAnchor="middle">T</text>
              
              {/* Nodes */}
              {/* Node 1 */}
              <circle cx="120" cy="200" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="120" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC</text>
              <text x="120" y="225" fill="#9CA3AF" fontSize="9" textAnchor="middle">Swadeep</text>
              <line x1="120" y1="175" x2="120" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Node 2 */}
              <circle cx="250" cy="200" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="250" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC</text>
              <text x="250" y="225" fill="#9CA3AF" fontSize="9" textAnchor="middle">Tuhina</text>
              <line x1="250" y1="175" x2="250" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Node 3 */}
              <circle cx="380" cy="200" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="380" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">Printer</text>
              <text x="380" y="225" fill="#9CA3AF" fontSize="9" textAnchor="middle">Shared</text>
              <line x1="380" y1="175" x2="380" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Node 4 */}
              <circle cx="510" cy="200" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="510" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">Laptop</text>
              <text x="510" y="225" fill="#9CA3AF" fontSize="9" textAnchor="middle">Susmita</text>
              <line x1="510" y1="175" x2="510" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Animated data packet from Swadeep to Tuhina */}
              <circle cx="120" cy="140" r="5" fill="#F97316">
                <animate attributeName="cx" values="120;250" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="140;140" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="120" y="125" fill="#F97316" fontSize="8">Data</text>
              
              {/* Collision effect: two packets colliding */}
              <circle cx="300" cy="120" r="5" fill="#EF4444" opacity="0.7">
                <animate attributeName="cx" values="250;350;300" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="5;12;5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="350" cy="120" r="5" fill="#EF4444" opacity="0.7">
                <animate attributeName="cx" values="380;280;350" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="5;12;5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="320" y="95" fill="#EF4444" fontSize="10" textAnchor="middle">Collision!</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Data travels in both directions; collisions happen when two nodes transmit simultaneously.
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
              <h2 className="text-2xl font-semibold">Disadvantages & Limitations</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {disadvantages.map((dis, i) => (
                <li key={i}>{dis}</li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border-l-4 border-red-400">
              <p className="text-sm text-gray-300 italic">
                📏 Specific limitations: {limitations.join(" • ")}
              </p>
            </div>
          </div>
        </div>

        {/* Real-World Usage */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldUsage.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-amber-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.7 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-amber-300">{item.scenario}</h3>
                <p className="text-gray-300 text-sm mt-2">{item.description}</p>
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
          className="border border-dashed border-amber-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-amber-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why do cable TV networks still use a bus‑like architecture? How does it affect your internet speed when many neighbors are online?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: If you had to connect four computers in a room with no switch, how would you use bus topology? What would happen if you unplugged one computer? What if you removed a terminator?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Bus topology is a great way to introduce the concept of shared media and collisions. Use a simple hands‑on demo with a piece of coaxial cable and T‑connectors to show how a break affects everyone. Emphasize that although it's largely obsolete in wired LANs, the principles (CSMA/CD, terminators) are still relevant in wireless networks and cable internet. Compare it with star to reinforce the advantages of centralized switching."
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

export default Topic5;