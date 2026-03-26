import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic6.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the ring network topology, its structure, token passing mechanism,
 *          pros and cons, and where it is used (or was used) in real networks.
 * When & Why Used: After covering bus and star topologies, this topic introduces
 *                  ring topology as another classic design, highlighting its
 *                  deterministic access method (token) and its relevance in
 *                  Fiber Distributed Data Interface (FDDI) and Token Ring.
 */

const Topic6 = () => {
  const advantages = [
    "Orderly access to the medium – no collisions (deterministic).",
    "Performs well under heavy load because the token controls transmission.",
    "Simple to implement in small networks with few devices.",
    "Each node regenerates the signal, allowing longer distances than bus topology.",
    "Equal access for all devices – no device can monopolize the network."
  ];

  const disadvantages = [
    "A single break anywhere breaks the entire ring (unless a dual‑ring or bypass mechanism is used).",
    "Adding or removing devices requires breaking the ring, causing network downtime.",
    "Complex fault isolation – finding a break is harder than in star topology.",
    "Slower than switched star networks due to token rotation latency.",
    "Requires specialized hardware (e.g., MAU for Token Ring) and protocol handling."
  ];

  const tokenMechanism = [
    "A special 3‑byte frame called a token circulates around the ring.",
    "A device that wants to transmit must wait until it captures the token.",
    "It then changes the token into a data frame, attaches the data, and sends it to the next device.",
    "The data frame travels around the ring until it reaches the destination device.",
    "The destination copies the data, and the frame continues back to the sender.",
    "The sender releases a new token onto the ring, allowing others to transmit."
  ];

  const useCases = [
    {
      scenario: "IBM Token Ring (1980s‑1990s)",
      description: "IBM's proprietary technology used in many corporate networks. It used a special device called a Multi‑Station Access Unit (MSAU) that physically wired as a star but logically acted as a ring. Tuhina's father recalls that his office in Shyamnagar used Token Ring – adding a new computer required powering down the whole ring."
    },
    {
      scenario: "FDDI (Fiber Distributed Data Interface)",
      description: "A 100 Mbps fiber‑optic ring used as a backbone for large campuses or metropolitan networks. FDDI used a dual counter‑rotating ring for redundancy: if one ring failed, the other could still carry traffic. Swadeep's university in Barrackpore once had an FDDI backbone connecting buildings."
    },
    {
      scenario: "SONET/SDH Rings",
      description: "Telecommunications networks often use bidirectional line‑switched rings (BLSR) for high reliability. These are the basis for many fiber‑optic backbones, providing automatic failover within 50 ms."
    },
    {
      scenario: "Modern Industrial Networks",
      description: "Some industrial control systems (e.g., PROFIBUS, EtherCAT) use ring topologies with token‑passing or deterministic scheduling to ensure real‑time performance."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Assuming any ring works without a token",
      correction: "True ring topologies require a token or other mechanism to control access. Without it, collisions would destroy performance."
    },
    {
      mistake: "Forgetting that physical ring ≠ logical ring",
      correction: "Token Ring physically used star wiring (MAU) but logically was a ring. Students often confuse physical and logical topology."
    },
    {
      mistake: "Using single ring without redundancy",
      correction: "For critical networks, a single ring is a single point of failure. Use dual rings or bypass switches."
    }
  ];

  const bestPractices = [
    "For modern applications, prefer star topologies with switches unless deterministic timing is required.",
    "If using a ring, implement redundant paths (e.g., dual ring, self‑healing mechanisms).",
    "Monitor token rotation times to detect performance degradation.",
    "Document the order of nodes in the ring – crucial for troubleshooting."
  ];

  const tipsAndTricks = [
    "In FDDI, the dual rings allowed packets to travel in opposite directions, providing fault tolerance.",
    "Use a network analyzer to capture token frames and verify proper operation.",
    "For small test rings, you can simulate token passing with software using a 'virtual token' approach."
  ];

  const miniChecklist = [
    "☐ I can draw a ring topology and explain how data flows.",
    "☐ I understand the token passing mechanism (capture, transmit, release).",
    "☐ I can list at least three advantages and three disadvantages.",
    "☐ I know that Token Ring and FDDI were real‑world implementations.",
    "☐ I understand the difference between physical and logical ring."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ring Topology
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A circular path with a token – orderly, deterministic, and historic
          </p>
        </div>

        {/* Structure & Token Passing */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⭕</span>
              <h2 className="text-2xl font-semibold">Structure</h2>
            </div>
            <p className="text-gray-200">
              In a ring topology, each node is connected to exactly two neighbors, forming a closed loop. 
              Data travels in one direction (or sometimes both in dual‑ring) from node to node. 
              Each node acts as a repeater, regenerating the signal before passing it to the next node.
            </p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-300 italic">
                🔄 Think of it like a circular relay race: the baton (token) passes from runner to runner; only the runner holding the baton can send data.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎫</span>
              <h2 className="text-2xl font-semibold">Token Passing Mechanism</h2>
            </div>
            <ul className="list-decimal pl-5 space-y-2 text-gray-200 text-sm">
              {tokenMechanism.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG Illustration: Ring with Token Animation */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🖼️</span>
            <h2 className="text-2xl font-semibold">Visual: Ring Topology & Token Passing</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Ring topology with nodes, connections, and moving token</title>
              
              {/* Circle path for nodes */}
              <circle cx="250" cy="175" r="120" fill="none" stroke="#4B5563" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Nodes at angles 0°, 72°, 144°, 216°, 288° (5 nodes) */}
              {[
                { angle: 0, name: "Swadeep", x: 250, y: 55 },
                { angle: 72, name: "Tuhina", x: 370, y: 115 },
                { angle: 144, name: "Printer", x: 370, y: 235 },
                { angle: 216, name: "Server", x: 250, y: 295 },
                { angle: 288, name: "Susmita", x: 130, y: 235 }
              ].map((node, idx) => (
                <g key={idx}>
                  <circle cx={node.x} cy={node.y} r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
                  <text x={node.x} y={node.y - 5} fill="#E5E7EB" fontSize="12" textAnchor="middle">{node.name}</text>
                  <text x={node.x} y={node.y + 12} fill="#9CA3AF" fontSize="9" textAnchor="middle">Node</text>
                </g>
              ))}
              
              {/* Connections between nodes */}
              <line x1="250" y1="55" x2="370" y2="115" stroke="#60A5FA" strokeWidth="2" />
              <line x1="370" y1="115" x2="370" y2="235" stroke="#60A5FA" strokeWidth="2" />
              <line x1="370" y1="235" x2="250" y2="295" stroke="#60A5FA" strokeWidth="2" />
              <line x1="250" y1="295" x2="130" y2="235" stroke="#60A5FA" strokeWidth="2" />
              <line x1="130" y1="235" x2="250" y2="55" stroke="#60A5FA" strokeWidth="2" />
              
              {/* Animated token (moving around) */}
              <circle cx="250" cy="55" r="8" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1">
                <animateMotion
                  path="M250,55 L370,115 L370,235 L250,295 L130,235 Z"
                  dur="6s"
                  repeatCount="indefinite"
                  fill="freeze"
                />
                <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
              </circle>
              <text x="280" y="20" fill="#F59E0B" fontSize="10" textAnchor="middle">Token</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            The token (yellow) circulates the ring; only the node holding it can transmit.
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

        {/* Use Cases */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📜</span>
            <h2 className="text-2xl font-semibold">Real‑World Use Cases</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-purple-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.7 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-purple-300">{item.scenario}</h3>
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
          className="border border-dashed border-purple-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-purple-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why would a token‑based system be fairer than Ethernet's CSMA/CD? What happens to the token if a node fails?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Imagine a physical ring of 10 computers. If one computer is removed, what must be done to keep the ring working? Compare with adding a new device in a star topology.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Ring topology is a classic example of a deterministic network. Use it to contrast with CSMA/CD in bus and star networks. Emphasize that though Token Ring and FDDI are rare today, the concepts of token passing and dual‑ring redundancy appear in modern industrial networks and SDH/SONET. Encourage students to explore how a dual ring can heal itself. Use the analogy of a relay race to explain token passing."
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

export default Topic6;