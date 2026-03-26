import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic11.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce the hub – a basic networking device that operates at
 *          the physical layer, broadcasting data to all ports.
 * When & Why Used: After covering architectures (client-server, P2P), this topic
 *                  begins exploring the hardware that makes networks work.
 *                  The hub is the simplest device, setting the stage for
 *                  switches, routers, and gateways.
 */

const Topic11 = () => {
  const definition =
    "A hub is a networking device that connects multiple Ethernet devices, making them act as a single network segment. It operates at the Physical Layer (Layer 1) of the OSI model. When a hub receives a data packet on one port, it repeats (broadcasts) that signal to all other ports, regardless of the destination.";

  const workingPrinciple = [
    "A device sends a frame to the hub via one port.",
    "The hub regenerates and amplifies the electrical signal.",
    "It broadcasts the frame out of every other port (except the incoming one).",
    "All devices connected to the hub receive the frame; only the intended recipient processes it based on the destination MAC address.",
    "Because all ports share the same collision domain, collisions occur if two devices transmit simultaneously."
  ];

  const keyCharacteristics = [
    "Half-duplex communication – devices can't send and receive simultaneously.",
    "Shares bandwidth among all ports (e.g., a 10 Mbps hub shares that bandwidth across all connected devices).",
    "No intelligence – cannot inspect or filter frames.",
    "Collision domain – all ports belong to the same collision domain.",
    "Simple and inexpensive (though largely obsolete)."
  ];

  const advantages = [
    "Very inexpensive – cheap to purchase and deploy.",
    "Simple to install – plug‑and‑play, no configuration needed.",
    "Can extend network distance by regenerating the signal.",
    "Useful for small, low‑traffic networks or temporary setups."
  ];

  const disadvantages = [
    "Collisions – multiple devices transmitting at once cause retransmissions, degrading performance.",
    "No security – every device sees all traffic, making eavesdropping easy.",
    "Bandwidth is shared – adding more devices reduces per‑device throughput.",
    "No intelligence – cannot manage or prioritize traffic.",
    "Half‑duplex operation limits efficiency."
  ];

  const realWorldUsage = [
    {
      scenario: "Legacy Networks (1990s)",
      description:
        "Before switches became affordable, hubs were common in offices. Swadeep's first computer lab in Barrackpore used a 10Base‑T hub – if too many students tried to access the network at once, collisions would slow everything down."
    },
    {
      scenario: "Small Home Networks (early 2000s)",
      description:
        "Tuhina's family had a 4‑port hub connecting two desktops and a printer. It worked for light use, but streaming video was problematic due to collisions."
    },
    {
      scenario: "Temporary / Lab Environments",
      description:
        "In educational settings, hubs are still used to demonstrate network collisions. Susmita uses a hub in her networking lab to show how CSMA/CD works and why switches are superior."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Using a hub in a modern network",
      correction:
        "Switches have replaced hubs for almost all scenarios. A hub will cause collisions and security issues. Always use a switch unless you specifically need to demonstrate collisions."
    },
    {
      mistake: "Expecting a hub to filter or manage traffic",
      correction:
        "A hub has no intelligence; it simply repeats signals. Use a switch for any network where performance and security matter."
    },
    {
      mistake: "Connecting a hub to a switch in a way that creates a loop",
      correction:
        "Hubs do not understand Spanning Tree Protocol (STP). Connecting two ports of a hub to a switch can cause broadcast storms. Use a single uplink."
    }
  ];

  const bestPractices = [
    "If you must use a hub, keep the network very small (≤5 devices) and low‑traffic.",
    "Replace hubs with switches whenever possible – the performance improvement is dramatic.",
    "When demonstrating hubs, use a network analyzer (e.g., Wireshark) to show that all devices see all traffic."
  ];

  const tipsAndTricks = [
    "To see a hub in action, connect it to a switch and use a packet sniffer – you'll see traffic from all devices, confirming the broadcast nature.",
    "Hubs can still be useful for tapping traffic for monitoring (though modern switches support port mirroring).",
    "If you inherit a network with hubs, plan a phased upgrade to switches."
  ];

  const miniChecklist = [
    "☐ I can define a hub and explain its basic function.",
    "☐ I understand that a hub broadcasts data to all ports.",
    "☐ I know that hubs operate at Layer 1 (Physical Layer).",
    "☐ I can list at least three disadvantages compared to switches.",
    "☐ I understand why hubs are rarely used in modern networks."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-400 to-slate-400 bg-clip-text text-transparent">
            Networking Devices: Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The simple repeater – broadcast, no intelligence
          </p>
        </div>

        {/* Definition & Working Principle */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔌</span>
              <h2 className="text-2xl font-semibold">What is a Hub?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-gray-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of a hub like a megaphone: whatever you say is broadcast to everyone in the room – no privacy, and if two people talk at once, nobody hears clearly.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-gray-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-semibold">Working Principle</h2>
            </div>
            <ul className="list-decimal pl-5 space-y-2 text-gray-200">
              {workingPrinciple.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Characteristics */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-semibold">Key Characteristics</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 list-disc pl-5 text-gray-200">
            {keyCharacteristics.map((char, i) => (
              <li key={i}>{char}</li>
            ))}
          </ul>
        </div>

        {/* SVG Illustration: Hub Broadcasting */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-semibold">Visual: Hub Broadcasting</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Hub broadcasting data to all connected devices</title>
              
              {/* Hub (central box) */}
              <rect x="280" y="100" width="140" height="100" fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" rx="6" />
              <text x="350" y="145" fill="#E5E7EB" fontSize="14" textAnchor="middle">HUB</text>
              <text x="350" y="170" fill="#9CA3AF" fontSize="10" textAnchor="middle">Broadcasts to all</text>
              
              {/* Devices around the hub */}
              {/* Left */}
              <circle cx="80" cy="150" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="80" y="155" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC</text>
              <text x="80" y="175" fill="#9CA3AF" fontSize="9" textAnchor="middle">Swadeep</text>
              <line x1="110" y1="150" x2="280" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Top */}
              <circle cx="350" cy="40" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="350" y="45" fill="#E5E7EB" fontSize="12" textAnchor="middle">Laptop</text>
              <text x="350" y="65" fill="#9CA3AF" fontSize="9" textAnchor="middle">Tuhina</text>
              <line x1="350" y1="70" x2="350" y2="100" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Right */}
              <circle cx="620" cy="150" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="620" y="155" fill="#E5E7EB" fontSize="12" textAnchor="middle">Printer</text>
              <text x="620" y="175" fill="#9CA3AF" fontSize="9" textAnchor="middle">Shared</text>
              <line x1="590" y1="150" x2="420" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Bottom */}
              <circle cx="350" cy="260" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="350" y="265" fill="#E5E7EB" fontSize="12" textAnchor="middle">Phone</text>
              <text x="350" y="285" fill="#9CA3AF" fontSize="9" textAnchor="middle">Susmita</text>
              <line x1="350" y1="200" x2="350" y2="230" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Animated broadcast from PC to all ports */}
              <circle cx="110" cy="150" r="5" fill="#F97316">
                <animate attributeName="cx" values="110;350;350;350;350;590" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="150;150;70;200;260;150" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="100" fill="#F97316" fontSize="10">Data broadcast to ALL ports</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            A hub replicates every incoming frame to all other ports. All devices see the traffic.
          </p>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
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
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📅</span>
            <h2 className="text-2xl font-semibold">Real‑World Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldUsage.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-gray-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.8 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-gray-300">{item.scenario}</h3>
                <p className="text-gray-300 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
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
          className="border border-dashed border-gray-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-gray-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why would a hub cause more collisions than a switch? If you have a hub with four devices and two try to send at the same time, what happens?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: If you have an old hub, connect two computers and a laptop, then use Wireshark on one to see traffic from the others. What does that tell you about security?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "The hub is a great starting point for physical layer devices. Use it to teach broadcast domains, collisions, and the importance of intelligent switching. Students often assume all network devices are 'smart'; the hub shows the opposite. If possible, bring in an actual hub and let students see its behavior with a packet sniffer. Emphasize that while hubs are obsolete, the concepts (broadcast, shared medium) are still relevant for wireless networks (where air is a shared medium)."
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

export default Topic11;