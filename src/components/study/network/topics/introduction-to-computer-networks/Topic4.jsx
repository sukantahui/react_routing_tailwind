import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic4.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the star network topology, its structure, how it works,
 *          its pros and cons, and where it is used in real life.
 * When & Why Used: After introducing types of networks (LAN, MAN, WAN) in Topic3,
 *                  this topic dives into the physical arrangement (topology) of a LAN,
 *                  specifically the star topology, which is the most common in modern networks.
 */

const Topic4 = () => {
  const advantages = [
    "Easy to install and expand – just add a new cable from the central device.",
    "High fault tolerance – if one device or cable fails, only that device is affected.",
    "Simple troubleshooting – failures are isolated to individual connections.",
    "Centralized management – all traffic passes through the central hub/switch, enabling monitoring and control.",
    "Supports high-speed communication (e.g., Gigabit Ethernet) with minimal collisions."
  ];

  const disadvantages = [
    "Dependent on the central device – if the hub/switch fails, the entire network goes down.",
    "Requires more cable than bus or ring topologies (each node needs its own cable).",
    "Higher cost due to central device and additional cabling.",
    "Scalability is limited by the number of ports on the central device."
  ];

  const realWorldUsage = [
    {
      scenario: "Home Networks",
      description: "Swadeep's home Wi-Fi router acts as the central device. His laptop, phone, smart TV, and his parents' devices all connect to it. If the router fails, no one can access the internet."
    },
    {
      scenario: "School Computer Labs",
      description: "In Barrackpore High School, the lab has 30 computers connected to a central switch in the server room. Tuhina can print a document even if Debangshu's computer at the other end is off – only the failed device is affected."
    },
    {
      scenario: "Office Networks",
      description: "An office in Shyamnagar uses a star topology with a main switch. Each employee's desk has an Ethernet cable that runs back to the central switch. If one employee's cable is damaged, only that desk loses connectivity."
    },
    {
      scenario: "Campus Networks",
      description: "At Ichapur University, each building has a central switch. Inside each building, the labs, offices, and classrooms are arranged in a star. The building switches then connect to a campus backbone."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Thinking the central device is optional",
      correction: "In a true star, the central device (hub/switch) is mandatory. Without it, no device can communicate."
    },
    {
      mistake: "Using an old hub instead of a switch",
      correction: "Hubs broadcast data to all ports, causing collisions and poor performance. Modern star networks use switches."
    },
    {
      mistake: "Running cables too long",
      correction: "Ethernet cables have a maximum length (100 meters). Exceeding this can cause signal loss."
    }
  ];

  const bestPractices = [
    "Use a switch, not a hub, for better performance and reduced collisions.",
    "Label cables clearly – this makes troubleshooting much easier.",
    "Install the central device in a secure, ventilated location.",
    "Plan for growth: choose a switch with more ports than you currently need."
  ];

  const tipsAndTricks = [
    "If a single device loses connection, check its cable first – it's often a simple break.",
    "Use a network tester to verify cable continuity and pinouts.",
    "For larger installations, use patch panels to organize cables coming from the devices.",
    "Consider a redundant central device (stackable switches) for critical networks."
  ];

  const miniChecklist = [
    "☐ I can describe the physical layout of a star topology.",
    "☐ I understand that all nodes connect to a central device.",
    "☐ I can list at least three advantages and three disadvantages.",
    "☐ I know that a switch is better than a hub for performance.",
    "☐ I can give real-world examples where star topology is used."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Star Topology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The star of modern networking – central hub, radiating connections
          </p>
        </div>

        {/* Structure & Working Principle */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⭐</span>
              <h2 className="text-2xl font-semibold">Structure</h2>
            </div>
            <p className="text-gray-200">
              In a star topology, every node (computer, printer, etc.) is connected directly to a central device, typically a <strong className="text-yellow-300">switch</strong> or <strong className="text-yellow-300">hub</strong>. 
              The connections form a pattern resembling a star – all spokes meet at a central hub.
            </p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm text-gray-300 italic">
                🏠 Think of it like a home Wi‑Fi router: all devices connect to the router, and the router manages the traffic.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-semibold">Working Principle</h2>
            </div>
            <p className="text-gray-200">
              When a node wants to send data, it transmits the data to the central device. 
              The central device (switch) examines the destination address and forwards the data only to the intended recipient.
              If a hub is used, it broadcasts to all nodes, but modern networks use switches to avoid unnecessary traffic.
            </p>
            <p className="text-gray-200 mt-2">
              Communication is point‑to‑point between the central device and each node, so failures are isolated.
            </p>
          </div>
        </div>

        {/* SVG Illustration: Star Topology */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖼️</span>
            <h2 className="text-2xl font-semibold">Visual: Star Topology</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="320" viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Star topology with central switch and devices</title>
              
              {/* Central device (Switch) */}
              <rect x="200" y="120" width="100" height="60" fill="#1F2937" stroke="#F59E0B" strokeWidth="2" rx="8" />
              <text x="250" y="155" fill="#F59E0B" fontSize="14" textAnchor="middle">Switch / Hub</text>
              <text x="250" y="175" fill="#9CA3AF" fontSize="10" textAnchor="middle">Central Device</text>
              
              {/* Nodes around the switch */}
              {/* Top-left */}
              <circle cx="80" cy="70" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="80" y="75" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC</text>
              <text x="80" y="95" fill="#9CA3AF" fontSize="9" textAnchor="middle">Swadeep</text>
              <line x1="110" y1="85" x2="200" y2="140" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Top-right */}
              <circle cx="400" cy="70" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="400" y="75" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC</text>
              <text x="400" y="95" fill="#9CA3AF" fontSize="9" textAnchor="middle">Tuhina</text>
              <line x1="390" y1="85" x2="300" y2="140" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Bottom-left */}
              <circle cx="80" cy="250" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="80" y="255" fill="#E5E7EB" fontSize="12" textAnchor="middle">Printer</text>
              <text x="80" y="275" fill="#9CA3AF" fontSize="9" textAnchor="middle">Shared</text>
              <line x1="110" y1="235" x2="200" y2="170" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Bottom-right */}
              <circle cx="400" cy="250" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="400" y="255" fill="#E5E7EB" fontSize="12" textAnchor="middle">Laptop</text>
              <text x="400" y="275" fill="#9CA3AF" fontSize="9" textAnchor="middle">Susmita</text>
              <line x1="390" y1="235" x2="300" y2="170" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Right side extra node */}
              <circle cx="430" cy="165" r="25" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="430" y="170" fill="#E5E7EB" fontSize="10" textAnchor="middle">Phone</text>
              <line x1="420" y1="165" x2="300" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Animated packet from Swadeep to Tuhina */}
              <circle cx="110" cy="85" r="5" fill="#F97316">
                <animate attributeName="cx" values="110;200;300;390" dur="4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="85;140;140;85" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">Data travels through the central switch; only the intended recipient gets the data.</p>
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

        {/* Real-World Usage */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {realWorldUsage.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-yellow-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.7 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-yellow-300">{item.scenario}</h3>
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
          className="border border-dashed border-yellow-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-yellow-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: In your home, how many devices connect to the router? If the router stops working, what happens to each device? That's the star topology in action.
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Imagine a school lab with 30 computers. What would be the consequence if the central switch fails? How would you design redundancy to avoid downtime?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Star topology is intuitive for students because they already see it at home. Emphasize the central device's critical role and why switches are superior to hubs. Use the analogy of a teacher (central device) distributing assignments (data) to specific students. Highlight that this topology is the basis for most modern wired and wireless LANs."
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

export default Topic4;