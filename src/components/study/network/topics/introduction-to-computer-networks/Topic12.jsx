import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic12.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the switch – a key Layer 2 device that uses MAC addresses
 *          to intelligently forward frames, reduce collisions, and improve
 *          network performance.
 * When & Why Used: After covering hubs (Topic11), this topic introduces switches,
 *                  which are the foundation of modern wired LANs. Students learn
 *                  how switches overcome hub limitations.
 */

const Topic12 = () => {
  const definition =
    "A switch is a networking device that connects devices within a network, using MAC addresses to forward data only to the intended recipient. It operates at the Data Link Layer (Layer 2) of the OSI model. Unlike a hub, a switch learns the MAC addresses of connected devices and builds a MAC address table to make intelligent forwarding decisions.";

  const macAddressTable = [
    "When a switch receives a frame, it examines the source MAC address.",
    "It adds or updates an entry in its MAC address table, associating that MAC with the incoming port.",
    "It then looks at the destination MAC address.",
    "If the destination MAC is known in the table, the switch forwards the frame only out of the corresponding port (unicast forwarding).",
    "If unknown, it floods the frame out of all ports except the incoming one (similar to a hub, but only for unknown addresses)."
  ];

  const collisionReduction = [
    "Each port on a switch is its own collision domain – no collisions between devices on different ports.",
    "Full-duplex operation allows simultaneous send and receive on each port.",
    "Switches buffer frames and transmit them sequentially, eliminating collisions entirely.",
    "Result: Much higher throughput and no performance degradation as devices are added."
  ];

  const advantages = [
    "Intelligent forwarding – frames go only to the intended recipient, reducing unnecessary traffic.",
    "No collisions – each port is a separate collision domain; full‑duplex operation.",
    "Better security – devices only see traffic destined for them (unless a port is mirrored).",
    "Scalability – can connect hundreds of devices without performance loss.",
    "Supports VLANs – can segment networks logically for security and management."
  ];

  const disadvantages = [
    "More expensive than hubs (though modern switches are very affordable).",
    "Requires initial learning phase – unknown unicast flooding occurs until addresses are learned.",
    "Can be vulnerable to MAC flooding attacks (overwhelming the MAC table).",
    "Spanning Tree Protocol (STP) required to prevent loops when multiple switches are interconnected."
  ];

  const realWorldUsage = [
    {
      scenario: "Enterprise Networks",
      description:
        "In Swadeep's office building in Barrackpore, hundreds of computers connect to switches. Each floor has a switch, and the switches connect to a core switch. Every port provides dedicated bandwidth."
    },
    {
      scenario: "Home Networks",
      description:
        "Modern home routers include a built‑in 4‑port switch. Tuhina's home network uses the switch to connect her desktop, laptop, and smart TV – all get full speed without collisions."
    },
    {
      scenario: "Data Centers",
      description:
        "Data centers use high‑speed switches (e.g., 10/25/100 GbE) in spine‑leaf architectures. Susmita's company runs its servers through top‑of‑rack switches that provide low‑latency, lossless forwarding."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Using a switch as if it were a hub",
      correction:
        "Switches learn and forward intelligently. If you see excessive broadcasts or unknown unicast floods, check the MAC table size and potential loops."
    },
    {
      mistake: "Creating loops without Spanning Tree",
      correction:
        "Connecting two switches via multiple cables creates a loop, causing broadcast storms. Always enable STP (or use only one uplink unless using link aggregation)."
    },
    {
      mistake: "Assuming a switch filters broadcast traffic",
      correction:
        "Switches forward broadcast frames to all ports (except the incoming). For broadcast isolation, use VLANs."
    }
  ];

  const bestPractices = [
    "Use switches instead of hubs for all modern networks – the performance gain is immense.",
    "Enable STP (Spanning Tree Protocol) when interconnecting multiple switches to prevent loops.",
    "Use VLANs to segment broadcast domains and improve security.",
    "Monitor MAC address table size to prevent overflow attacks."
  ];

  const tipsAndTricks = [
    "Use `show mac address-table` (on Cisco switches) or similar commands to see the MAC table in action.",
    "Switches can be used for port mirroring to monitor traffic without disrupting the network.",
    "When troubleshooting, check if a switch port is in half‑duplex – that often indicates a cabling issue or mismatch."
  ];

  const miniChecklist = [
    "☐ I can define a switch and differentiate it from a hub.",
    "☐ I understand how a switch learns MAC addresses and builds a MAC table.",
    "☐ I know that switches eliminate collisions and enable full‑duplex communication.",
    "☐ I can explain the concept of a collision domain and why switches improve performance.",
    "☐ I am aware of STP and why it's needed when interconnecting switches."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Networking Devices: Switch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Intelligent forwarding, collision elimination, MAC‑based learning
          </p>
        </div>

        {/* Definition & MAC Table */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔌</span>
              <h2 className="text-2xl font-semibold">What is a Switch?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-300 italic">
                💡 A switch is like a smart post office: it learns where each person lives and delivers mail only to the correct address, not to everyone on the street.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📋</span>
              <h2 className="text-2xl font-semibold">MAC Address Table Learning</h2>
            </div>
            <ul className="list-decimal pl-5 space-y-2 text-gray-200">
              {macAddressTable.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Collision Reduction Explanation */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🚫</span>
            <h2 className="text-2xl font-semibold">Collision Reduction & Full Duplex</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-200 md:grid md:grid-cols-2 md:gap-x-6">
            {collisionReduction.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        {/* SVG Illustration: Switch Learning & Forwarding */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-semibold">Visual: Switch Operation</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Switch: MAC address table and selective forwarding</title>
              
              {/* Switch central box */}
              <rect x="280" y="100" width="190" height="100" fill="#1F2937" stroke="#60A5FA" strokeWidth="2" rx="6" />
              <text x="375" y="140" fill="#60A5FA" fontSize="12" textAnchor="middle">Switch</text>
              <text x="375" y="165" fill="#9CA3AF" fontSize="9" textAnchor="middle">MAC Address Table</text>
              
              {/* MAC Table details */}
              <rect x="490" y="110" width="100" height="80" fill="#1F2937" stroke="#F59E0B" strokeWidth="1" rx="4" />
              <text x="540" y="125" fill="#F59E0B" fontSize="9" textAnchor="middle">MAC Table</text>
              <text x="505" y="140" fill="#E5E7EB" fontSize="8">MAC A → Port 1</text>
              <text x="505" y="155" fill="#E5E7EB" fontSize="8">MAC B → Port 2</text>
              <text x="505" y="170" fill="#E5E7EB" fontSize="8">MAC C → Port 3</text>
              
              {/* Devices */}
              {/* Left: PC A */}
              <circle cx="80" cy="150" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="80" y="155" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC A</text>
              <text x="80" y="175" fill="#9CA3AF" fontSize="9" textAnchor="middle">MAC A</text>
              <line x1="110" y1="150" x2="280" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Top: PC B */}
              <circle cx="375" cy="50" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="375" y="55" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC B</text>
              <text x="375" y="75" fill="#9CA3AF" fontSize="9" textAnchor="middle">MAC B</text>
              <line x1="375" y1="80" x2="375" y2="100" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Right: PC C */}
              <circle cx="670" cy="150" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="670" y="155" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC C</text>
              <text x="670" y="175" fill="#9CA3AF" fontSize="9" textAnchor="middle">MAC C</text>
              <line x1="640" y1="150" x2="470" y2="150" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Bottom: PC D */}
              <circle cx="375" cy="250" r="30" fill="#1F2937" stroke="#9CA3AF" />
              <text x="375" y="255" fill="#E5E7EB" fontSize="12" textAnchor="middle">PC D</text>
              <text x="375" y="275" fill="#9CA3AF" fontSize="9" textAnchor="middle">MAC D</text>
              <line x1="375" y1="200" x2="375" y2="220" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Animated packet from PC A to PC B */}
              <circle cx="110" cy="150" r="5" fill="#F97316">
                <animate attributeName="cx" values="110;375;375" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="150;150;80" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="200" y="90" fill="#F97316" fontSize="10">Frame to MAC B</text>
              <text x="200" y="110" fill="#9CA3AF" fontSize="8">Switch forwards only to port 2 (PC B)</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Switch learns MAC addresses and forwards frames only to the port containing the destination device.
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
            <span className="text-2xl">🏢</span>
            <h2 className="text-2xl font-semibold">Real‑World Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldUsage.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-blue-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.8 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-blue-300">{item.scenario}</h3>
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
          className="border border-dashed border-blue-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When a switch is first powered on, how does it know where to send frames? Why might you see a burst of broadcasts initially?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: If you have access to a managed switch, view its MAC address table using the CLI or web interface. Send traffic between two devices and see how the table changes.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "The switch is where students truly grasp the leap from shared media to dedicated bandwidth. Use the analogy of a post office vs. a megaphone to contrast with a hub. Emphasize that the MAC address table is dynamic and that learning happens automatically. If possible, set up a small network with a switch and use Wireshark to show that a device only sees traffic destined for it (unlike a hub). This makes the security and performance benefits tangible."
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

export default Topic12;