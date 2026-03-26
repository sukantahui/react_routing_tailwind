import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic10.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce peer-to-peer (P2P) architecture, its decentralized nature,
 *          advantages, limitations, and contrast it with client-server.
 * When & Why Used: After covering client-server (Topic9), this topic presents
 *                  an alternative model. It builds on the understanding of
 *                  roles (client/server) and shows how P2P removes that
 *                  distinction, preparing for discussion of modern P2P
 *                  applications like file sharing and blockchain.
 */

const Topic10 = () => {
  const definition =
    "Peer-to-peer (P2P) architecture is a decentralized network model where each node (peer) acts as both a client and a server. Peers share resources directly with each other without a central server. Every peer can initiate requests and respond to them.";

  const concept = [
    "No central server – all nodes are equal in privilege and responsibility.",
    "Each peer contributes resources (storage, bandwidth, processing) to the network.",
    "Peers discover each other directly (or via a minimal indexing service).",
    "Tasks are distributed among all participants.",
    "Scalability increases with more peers because each new peer adds resources."
  ];

  const advantages = [
    "No single point of failure – the network remains operational even if many peers leave.",
    "Highly scalable – more peers increase total capacity.",
    "Cost-effective – no need for expensive server infrastructure.",
    "Resource aggregation – collectively, peers offer vast storage/bandwidth.",
    "Resilient against censorship – decentralized control makes it hard to shut down."
  ];

  const limitations = [
    "Security challenges – malicious peers can spread malware or provide corrupted data.",
    "Unreliable availability – peers may come and go (churn), affecting data persistence.",
    "Slower search and discovery – finding resources can be inefficient without central indexes.",
    "Difficult to enforce access controls or authentication.",
    "Performance depends on individual peers' bandwidth and uptime."
  ];

  const comparisonTable = [
    { feature: "Central Server", clientServer: "Yes, required", p2p: "No (or minimal)" },
    { feature: "Roles", clientServer: "Clients request, servers provide", p2p: "Each peer is both client and server" },
    { feature: "Scalability", clientServer: "Limited by server capacity", p2p: "Grows with number of peers" },
    { feature: "Fault Tolerance", clientServer: "Server failure disrupts service", p2p: "No single point of failure" },
    { feature: "Security", clientServer: "Easier to centralize security", p2p: "Decentralized security is complex" },
    { feature: "Example", clientServer: "Website, email, database", p2p: "BitTorrent, Bitcoin, Skype (early)" }
  ];

  const realWorldExamples = [
    {
      title: "🎬 BitTorrent",
      description:
        "Swadeep wants to download a large Linux ISO. Instead of downloading from a single server, BitTorrent splits the file into pieces. His client downloads pieces from multiple peers who already have them, while simultaneously uploading pieces to others. The more peers, the faster the download."
    },
    {
      title: "💰 Blockchain / Cryptocurrencies",
      description:
        "Bitcoin uses a P2P network where all nodes (miners/wallets) maintain a shared ledger. There is no central bank – consensus is reached collectively. Tuhina's transaction is verified by hundreds of nodes before being added to the blockchain."
    },
    {
      title: "📞 Early Skype (VoIP)",
      description:
        "Before Microsoft acquired Skype, it used a hybrid P2P architecture. Users' computers relayed calls for others, reducing server costs. Susmita in Ichapur could call Abhronila in Barrackpore without a central voice server."
    },
    {
      title: "🖥️ File Sharing (Napster, Gnutella)",
      description:
        "Napster had a central index but P2P transfers. Gnutella was fully decentralized – peers shared files directly. Debangshu recalls using such networks to share open-source software in college."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Thinking P2P means illegal file sharing only",
      correction:
        "P2P is a legitimate architecture used in many legal applications: blockchain, collaborative editing, content distribution (e.g., Linux distros)."
    },
    {
      mistake: "Assuming P2P networks are completely serverless",
      correction:
        "Many modern P2P systems use 'hybrid' approaches with trackers, bootstrap nodes, or DHTs (distributed hash tables) for discovery."
    },
    {
      mistake: "Believing P2P is always more efficient",
      correction:
        "Efficiency depends on the workload. For consistent, high‑demand services, client‑server with caching may be better."
    }
  ];

  const bestPractices = [
    "When designing a P2P application, use standard protocols (e.g., BitTorrent, IPFS) rather than reinventing the wheel.",
    "Implement reputation or trust mechanisms to mitigate malicious peers.",
    "Use encryption to protect privacy and integrity of data exchanged between peers.",
    "Consider a hybrid approach: use a central server for discovery or bootstrapping, then switch to P2P for data transfer."
  ];

  const tipsAndTricks = [
    "Use `wireshark` to inspect P2P traffic and see how peers discover each other.",
    "For developers, libp2p is a modular library for building P2P applications (used by IPFS, Filecoin).",
    "When troubleshooting P2P, remember that your upload bandwidth is as important as download – many clients limit uploads unintentionally."
  ];

  const miniChecklist = [
    "☐ I can define peer-to-peer architecture and explain how it differs from client-server.",
    "☐ I understand that every peer is both a client and a server.",
    "☐ I can list at least three advantages and three limitations of P2P.",
    "☐ I can give real-world examples of P2P systems (BitTorrent, blockchain, etc.).",
    "☐ I know that P2P is not illegal and has many legitimate uses."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Peer-to-Peer Architecture
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Decentralized, collaborative, and resilient
          </p>
        </div>

        {/* Concept & How It Works */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🤝</span>
              <h2 className="text-2xl font-semibold">What is Peer-to-Peer?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of a study group: everyone shares notes and helps each other. No single teacher or central authority – each student contributes.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {concept.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG Illustration: Peer-to-Peer Network */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔄</span>
            <h2 className="text-2xl font-semibold">Visual: Decentralized Peer Mesh</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Peer-to-peer network: all nodes connected, no central server</title>
              
              {/* Peers (nodes) */}
              <circle cx="120" cy="100" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="120" y="105" fill="#E5E7EB" fontSize="12" textAnchor="middle">Swadeep</text>
              
              <circle cx="300" cy="50" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="300" y="55" fill="#E5E7EB" fontSize="12" textAnchor="middle">Tuhina</text>
              
              <circle cx="500" cy="100" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="500" y="105" fill="#E5E7EB" fontSize="12" textAnchor="middle">Abhronila</text>
              
              <circle cx="400" cy="200" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="400" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">Susmita</text>
              
              <circle cx="200" cy="200" r="30" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" />
              <text x="200" y="205" fill="#E5E7EB" fontSize="12" textAnchor="middle">Debangshu</text>
              
              {/* Connections between peers (partial mesh) */}
              <line x1="150" y1="115" x2="270" y2="70" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="330" y1="70" x2="470" y2="115" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="530" y1="115" x2="430" y2="185" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="370" y1="185" x2="230" y2="185" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="170" y1="185" x2="120" y2="130" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="150" y1="115" x2="200" y2="170" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="270" y1="70" x2="370" y2="170" stroke="#60A5FA" strokeWidth="1.5" />
              <line x1="430" y1="170" x2="500" y2="130" stroke="#60A5FA" strokeWidth="1.5" />
              
              {/* Animated packet traveling between peers */}
              <circle cx="120" cy="100" r="5" fill="#F97316">
                <animateMotion
                  path="M120,100 L300,50 L500,100 L400,200 L200,200 L120,100"
                  dur="6s"
                  repeatCount="indefinite"
                  fill="freeze"
                />
              </circle>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Every peer can communicate directly with any other; no central authority.
          </p>
        </div>

        {/* Advantages & Limitations */}
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
              <h2 className="text-2xl font-semibold">Limitations</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {limitations.map((lim, i) => (
                <li key={i}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚖️</span>
            <h2 className="text-2xl font-semibold">Comparison: Client-Server vs P2P</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-3 text-blue-300">Feature</th>
                  <th className="py-2 px-3 text-blue-300">Client-Server</th>
                  <th className="py-2 px-3 text-emerald-300">Peer-to-Peer</th>
                 </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-200">{row.feature}</td>
                    <td className="py-2 px-3 text-gray-300">{row.clientServer}</td>
                    <td className="py-2 px-3 text-gray-300">{row.p2p}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Examples */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Applications</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {realWorldExamples.map((ex, idx) => (
              <div
                key={ex.title}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-emerald-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.8 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-emerald-300">{ex.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{ex.description}</p>
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
          className="border border-dashed border-green-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-green-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: Why do you think Bitcoin chose a P2P model rather than a central server? What would be the risks of a central server for currency?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Imagine a classroom where students share notes without a teacher. How would you ensure everyone gets the correct notes? How would you handle a student who shares wrong information? This mirrors P2P challenges.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "P2P architecture is a powerful concept that challenges the client‑server mindset. Use the study group analogy to make it relatable. Emphasize that P2P is not inherently illegal – it's a design pattern with many legitimate uses. Show how BitTorrent is used to distribute Linux ISOs legally. Discuss the security and reliability trade‑offs. If possible, demonstrate a simple P2P file transfer (e.g., using IPFS) to give students a hands‑on experience."
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

export default Topic10;