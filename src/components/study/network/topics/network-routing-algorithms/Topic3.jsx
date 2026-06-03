import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Broadcast and Multicast Routing
 * 
 * Component Purpose:
 *   Explain how network layer handles one-to-many (broadcast) and
 *   one-to-selected-many (multicast) communication. Focus on algorithms
 *   like flooding, spanning tree broadcast, IGMP, and multicast trees.
 * 
 * Props: None
 * Returns: JSX.Element
 * 
 * When & Why:
 *   Used in networking courses to teach efficient data distribution
 *   to multiple receivers without creating per-receiver unicast streams.
 */

const Topic3 = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      {/* Header */}
      <header
        className={clsx(
          "mb-12 text-center",
          !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
        )}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
          Broadcast & Multicast Routing
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Efficiently delivering packets to multiple destinations: from
          network-wide broadcasts to targeted multicast groups.
        </p>
      </header>

      <div className="space-y-10">
        {/* 1. Core Concept & Theory */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4 dark:text-purple-300 text-purple-700">
            📡 Core Concepts: Broadcast vs Multicast
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <strong className="text-purple-600">Broadcast</strong> sends a packet to <em>all</em> nodes in the network.
              Example: ARP request "Who has IP 192.168.1.1?" reaches every host on the LAN.
            </p>
            <p>
              <strong className="text-pink-600">Multicast</strong> sends a packet to a <em>group</em> of interested receivers.
              Example: IPTV streaming – only subscribers receive the video stream.
            </p>
            <p><strong>Key challenge:</strong> Avoid duplicate packets and loops, while minimizing bandwidth waste.</p>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
              <p>Broadcast address: 255.255.255.255 (IPv4) or FF:FF:FF:FF:FF:FF (Ethernet)</p>
              <p>Multicast address range: 224.0.0.0 to 239.255.255.255 (Class D)</p>
            </div>
            <p>
              <strong>Real-world scenario:</strong> Susmita's online class uses multicast for live lecture streaming.
              Only enrolled students receive the stream, not the entire Barrackpore network.
            </p>
          </div>
        </section>

        {/* 2. SVG Illustration: Broadcast Spanning Tree & Multicast Group */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4 dark:text-purple-300 text-purple-700">
            🌐 Visual: Broadcast Flooding vs Multicast Tree
          </h2>
          <div className="flex justify-center overflow-x-auto">
            <SVGMulticastIllustration prefersReducedMotion={prefersReducedMotion} />
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
            Left: Flooding sends copies everywhere. Right: Multicast tree sends only to interested receivers (green).
          </p>
        </section>

        {/* 3. Real-world Usage & Professional Tips */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4 dark:text-purple-300 text-purple-700">
            💼 Real-world Usage & Pro Tips
          </h2>
          <div className="space-y-3">
            <p>
              <strong>Broadcast:</strong> ARP, DHCP discovery, local network service announcements (mDNS).
              <br />
              <strong>Multicast:</strong> IPTV, video conferencing, stock market data feeds,
              software distribution (e.g., Microsoft SCCM), online gaming (e.g., Call of Duty lobbies).
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <p className="font-semibold">✨ Professional tips:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Use <strong>IGMP snooping</strong> on switches to prevent multicast flooding to all ports.</li>
                <li>Deploy <strong>PIM (Protocol Independent Multicast)</strong> for inter-domain multicast routing.</li>
                <li>Set <strong>TTL=1</strong> for local link multicast (e.g., 224.0.0.1).</li>
                <li>Limit broadcast domains using VLANs to reduce unnecessary traffic.</li>
              </ul>
            </div>
            <p>
              <strong>Story:</strong> At Ichapur Data Center, Debangshu reduced network load by 40% by enabling IGMP
              snooping on switches, stopping multicast video streams from flooding all server racks.
            </p>
          </div>
        </section>

        {/* 4. Common Mistakes & Pitfalls */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4 dark:text-red-300 text-red-700">
            ⚠️ Common Beginner Mistakes
          </h2>
          <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li><strong>Broadcast storm:</strong> Forgetting to prune loops – flooding without spanning tree can crash network.</li>
            <li><strong>Misconfiguring IGMP:</strong> Not enabling IGMP querier → switches don't know where to send multicast.</li>
            <li><strong>Assuming multicast is just "efficient broadcast":</strong> Requires group management (leave/join).</li>
            <li><strong>Using 224.0.0.x globally:</strong> These are link-local; routers won't forward them.</li>
            <li><strong>Forgetting TTL:</strong> Setting TTL too high can loop outside intended scope.</li>
          </ul>
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="font-mono text-sm">🧠 Misconception: "Multicast works automatically on all routers". Actually, requires multicast routing protocols like PIM and IGMP.</p>
          </div>
        </section>

        {/* 5. Best Practices & Mini Checklist */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4 dark:text-green-300 text-green-700">
            ✅ Best Practices & Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold">Configuration Standards:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enable IGMP snooping on Layer 2 switches</li>
                <li>Use PIM sparse mode for large-scale multicast</li>
                <li>Define rendezvous points (RP) carefully</li>
                <li>Filter multicast boundaries with TTL thresholds</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-bold">📋 Student Mini Checklist:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>✓ Distinguish broadcast vs multicast addresses</li>
                <li>✓ Explain how spanning tree prevents broadcast storms</li>
                <li>✓ Describe IGMP join/leave process</li>
                <li>✓ Understand difference between dense and sparse mode PIM</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Hint Section */}
        <div
          className={clsx(
            "bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl p-5",
            !prefersReducedMotion && "animate-[fadeSlideUp_0.6s_ease-out_forwards]"
          )}
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">💡 Hints for deeper thinking</h3>
          <ul className="mt-2 space-y-1 italic text-gray-700 dark:text-gray-300">
            <li>🔍 <strong>Think about:</strong> Why does a broadcast on a /24 network cause more issues than on a /16?</li>
            <li>👀 <strong>Observe carefully:</strong> In Wireshark, how does a host's IGMP report differ from its join message?</li>
            <li>⚙️ <strong>Try changing this:</strong> In a lab, disable IGMP snooping – see how multicast becomes broadcast.</li>
          </ul>
        </div>

        {/* 7. FAQ Component */}
        <FAQTemplate
          title="Broadcast & Multicast Routing: Frequently Asked Questions"
          questions={questions}
        />

        {/* 8. Teacher's Note */}
        <Teacher
          note={
            "Students often confuse 'broadcast' with 'multicast'. Use a classroom analogy: broadcast = announcement to everyone in school (over PA system). Multicast = invite-only club meeting. Emphasize that switches need IGMP snooping to avoid turning multicast into broadcast. Also show `ip mroute` and `show igmp groups` in real routers."
          }
        />
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.6s_ease-out_forwards\\] {
            animation: none !important;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

/* SVG Component: Broadcast Flooding vs Multicast Tree */
const SVGMulticastIllustration = ({ prefersReducedMotion }) => {
  const [hoverNode, setHoverNode] = useState(null);

  const nodes = [
    { id: "S", label: "Source", x: 40, y: 120, color: "#f97316", type: "source" },
    { id: "R1", label: "Router A", x: 140, y: 60, color: "#3b82f6" },
    { id: "R2", label: "Router B", x: 140, y: 180, color: "#3b82f6" },
    { id: "R3", label: "Router C", x: 260, y: 120, color: "#3b82f6" },
    { id: "H1", label: "Host 1\n(Interested)", x: 350, y: 40, color: "#10b981", type: "receiver" },
    { id: "H2", label: "Host 2\n(Not interested)", x: 350, y: 100, color: "#6b7280", type: "nonreceiver" },
    { id: "H3", label: "Host 3\n(Interested)", x: 350, y: 170, color: "#10b981", type: "receiver" },
  ];

  const links = [
    { from: "S", to: "R1" }, { from: "S", to: "R2" },
    { from: "R1", to: "R3" }, { from: "R2", to: "R3" },
    { from: "R3", to: "H1" }, { from: "R3", to: "H2" }, { from: "R3", to: "H3" }
  ];

  const getCoord = (id) => nodes.find(n => n.id === id) || { x: 0, y: 0 };

  // Multicast tree edges: only to H1 and H3 (and necessary routers)
  const multicastEdges = ["S-R1", "S-R2", "R1-R3", "R2-R3", "R3-H1", "R3-H3"];

  return (
    <div className="flex flex-col items-center">
      <svg width="500" height="250" viewBox="0 0 500 250" className="bg-gray-50 dark:bg-gray-700/20 rounded-xl shadow-inner p-2">
        {/* Background flooding faint lines (all links) */}
        {links.map(link => {
          const from = getCoord(link.from);
          const to = getCoord(link.to);
          const isMulticast = multicastEdges.includes(`${link.from}-${link.to}`) || multicastEdges.includes(`${link.to}-${link.from}`);
          return (
            <line
              key={`link-${link.from}-${link.to}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isMulticast ? "#10b981" : "#d1d5db"}
              strokeWidth={isMulticast ? 3 : 1.5}
              strokeDasharray={isMulticast ? "none" : "5 5"}
              opacity={isMulticast ? 1 : 0.5}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => (
          <g
            key={node.id}
            onMouseEnter={() => setHoverNode(node.id)}
            onMouseLeave={() => setHoverNode(null)}
            className="transition-transform duration-200"
            style={{ cursor: "pointer", transform: hoverNode === node.id ? "scale(1.1)" : "scale(1)" }}
          >
            <circle cx={node.x} cy={node.y} r="18" fill={node.color} stroke="#fff" strokeWidth="2" />
            <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{node.id}</text>
            <text x={node.x} y={node.y - 20} textAnchor="middle" fill="currentColor" fontSize="9" className="fill-gray-700 dark:fill-gray-200">
              {node.label.split("\n").map((line, i) => (
                <tspan x={node.x} dy={i === 0 ? 0 : 10} key={i}>{line}</tspan>
              ))}
            </text>
            {hoverNode === node.id && (
              <circle cx={node.x} cy={node.y} r="24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <animate attributeName="r" values="18;26;18" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {/* Legend */}
        <rect x="10" y="200" width="12" height="12" fill="#10b981" />
        <text x="28" y="210" fontSize="10" fill="#10b981">Multicast path</text>
        <line x1="100" y1="206" x2="130" y2="206" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5 5" />
        <text x="138" y="210" fontSize="10" fill="#6b7280">Flooded broadcast only</text>
      </svg>
      <div className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mx-1"></span> Multicast receivers (green)
        <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mx-1 ml-2"></span> Non-receiver
        <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mx-1 ml-2"></span> Source
      </div>
    </div>
  );
};

export default Topic3;