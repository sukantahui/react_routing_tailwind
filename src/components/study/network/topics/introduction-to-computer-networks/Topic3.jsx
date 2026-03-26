import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic3.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce the three main types of networks based on geographical scope:
 *          LAN (Local Area Network), MAN (Metropolitan Area Network), and WAN (Wide Area Network).
 * When & Why Used: After covering the basic components (Topic2), this topic categorizes networks
 *                  by size and scope, preparing students for topologies and devices.
 */

const Topic3 = () => {
  // Data for network types
  const networkTypes = [
    {
      name: "LAN (Local Area Network)",
      abbreviation: "LAN",
      icon: "🏠",
      range: "Up to a few kilometers (typically within a building or campus)",
      description: "A network that connects devices in a limited geographical area, such as a home, school computer lab, or office building.",
      characteristics: [
        "High speed (typically 100 Mbps to 10 Gbps)",
        "Low latency",
        "Owned and managed by a single organization or individual",
        "Uses Ethernet, Wi-Fi, or other local technologies"
      ],
      realWorldExample: "Swadeep's home network connects his laptop, his parents' phones, and a smart TV. Tuhina's school in Barrackpore has a LAN connecting all the computers in the computer lab, allowing them to share printers and files.",
      emoji: "🏘️"
    },
    {
      name: "MAN (Metropolitan Area Network)",
      abbreviation: "MAN",
      icon: "🏙️",
      range: "Typically 5–50 kilometers (a city or large campus)",
      description: "A network that spans a city or a large campus, connecting multiple LANs. It's larger than a LAN but smaller than a WAN.",
      characteristics: [
        "Intermediate speed (often 100 Mbps to 1 Gbps)",
        "Often owned by a city government, ISP, or large organization",
        "Uses fiber optics, microwave links, or leased lines",
        "Connects multiple buildings or branches within a city"
      ],
      realWorldExample: "Abhronila's university in Ichapur has a MAN connecting its various departments spread across the city. The local cable TV provider in Shyamnagar uses a MAN to deliver internet to subscribers.",
      emoji: "🌆"
    },
    {
      name: "WAN (Wide Area Network)",
      abbreviation: "WAN",
      icon: "🌍",
      range: "Nationwide or global (thousands of kilometers)",
      description: "A network that spans large geographical areas, often connecting multiple LANs and MANs across cities, countries, or continents.",
      characteristics: [
        "Lower speed compared to LAN (varies widely, e.g., 1 Mbps to 100 Gbps)",
        "Higher latency due to long distances",
        "Owned by multiple organizations (e.g., ISPs, telecom companies)",
        "Uses leased lines, satellite, undersea cables"
      ],
      realWorldExample: "The Internet is the largest WAN. When Susmita in Ichapur video calls her cousin in London, the data travels across multiple WAN links. Debangshu's company connects its offices in Kolkata, Delhi, and Mumbai using a corporate WAN.",
      emoji: "🌐"
    }
  ];

  const comparisonTable = [
    { feature: "Geographic Scope", lan: "Small (building/campus)", man: "City-wide", wan: "Country/continent" },
    { feature: "Ownership", lan: "Private", man: "Private or public", wan: "Multiple carriers/ISPs" },
    { feature: "Speed", lan: "Very high (up to 10 Gbps)", man: "High (up to 1 Gbps)", wan: "Varies (1 Mbps – 100 Gbps)" },
    { feature: "Latency", lan: "Very low (ms)", man: "Low (few ms)", wan: "Higher (10s–100s ms)" },
    { feature: "Cost", lan: "Low to moderate", man: "Moderate", wan: "High" },
    { feature: "Example", lan: "Home network", man: "City fiber network", wan: "The Internet" }
  ];

  const commonMistakes = [
    {
      mistake: "Calling a city-wide network a WAN",
      correction: "A city network is a MAN (Metropolitan Area Network). WANs are larger, often spanning countries or continents."
    },
    {
      mistake: "Thinking LANs are always wired",
      correction: "LANs can be wireless (Wi-Fi) as well. Wireless LAN (WLAN) is a common type of LAN."
    },
    {
      mistake: "Confusing MAN with WAN in terms of speed",
      correction: "MAN speeds can be close to LAN speeds but are often shared across many users, while WAN speeds depend on the leased lines."
    }
  ];

  const bestPractices = [
    "Design LANs with structured cabling (e.g., star topology) for easier troubleshooting.",
    "For MAN, consider redundant fiber paths to ensure availability.",
    "When connecting to a WAN, always have a backup link (e.g., secondary ISP) for reliability.",
    "Use network segmentation (VLANs) to isolate traffic and improve security within a LAN."
  ];

  const tipsAndTricks = [
    "Use `traceroute` to see how many hops your data takes across a WAN – it reveals the path across multiple networks.",
    "For a small office LAN, choose a good router with Quality of Service (QoS) to prioritize important traffic.",
    "When planning a MAN, consider the physical infrastructure: fiber optic cables are often laid along roads or utility lines."
  ];

  const miniChecklist = [
    "☐ I can define LAN, MAN, and WAN and give examples of each.",
    "☐ I understand the differences in size, speed, and ownership.",
    "☐ I can identify whether a given scenario is LAN, MAN, or WAN.",
    "☐ I know that the Internet is a WAN, but not all WANs are the Internet.",
    "☐ I can explain why latency increases as networks get larger."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Types of Networks
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            LAN, MAN, WAN: Networks by Size and Scope
          </p>
        </div>

        {/* Cards for each network type */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {networkTypes.map((type, idx) => (
            <div
              key={type.name}
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-0 translate-y-4"
              style={{ animationFillMode: "forwards", animationDelay: `${0.1 + idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{type.icon}</span>
                <h2 className="text-2xl font-semibold">{type.abbreviation}</h2>
              </div>
              <h3 className="text-xl text-blue-300 mb-2">{type.name}</h3>
              <p className="text-gray-200 mb-3"><strong>Range:</strong> {type.range}</p>
              <p className="text-gray-200 mb-3">{type.description}</p>
              <div className="mb-3">
                <strong className="text-green-300">Characteristics:</strong>
                <ul className="list-disc pl-5 text-gray-200 space-y-1 mt-1">
                  {type.characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-300 italic">
                  📍 Real-world: {type.realWorldExample}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl font-semibold">Comparison at a Glance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-3 text-blue-300">Feature</th>
                  <th className="py-2 px-3 text-blue-300">LAN</th>
                  <th className="py-2 px-3 text-blue-300">MAN</th>
                  <th className="py-2 px-3 text-blue-300">WAN</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td className="py-2 px-3 font-medium text-gray-200">{row.feature}</td>
                    <td className="py-2 px-3 text-gray-300">{row.lan}</td>
                    <td className="py-2 px-3 text-gray-300">{row.man}</td>
                    <td className="py-2 px-3 text-gray-300">{row.wan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SVG Illustration: LAN, MAN, WAN */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-2xl font-semibold">Visualizing Network Types</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>LAN, MAN, WAN illustration</title>
              
              {/* LAN - Left side */}
              <rect x="30" y="20" width="180" height="180" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" />
              <text x="120" y="35" fill="#60A5FA" fontSize="12" textAnchor="middle">LAN (Building)</text>
              <rect x="60" y="60" width="40" height="30" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="80" y="82" fill="#E5E7EB" fontSize="10" textAnchor="middle">PC</text>
              <rect x="120" y="60" width="40" height="30" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="140" y="82" fill="#E5E7EB" fontSize="10" textAnchor="middle">PC</text>
              <rect x="90" y="110" width="60" height="30" fill="#1F2937" stroke="#F59E0B" rx="4" />
              <text x="120" y="132" fill="#E5E7EB" fontSize="10" textAnchor="middle">Printer</text>
              <circle cx="80" cy="160" r="4" fill="#F97316">
                <animate attributeName="cx" values="80;140;80" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="160;160;160" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* MAN - Center */}
              <rect x="280" y="70" width="200" height="180" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="5 5" />
              <text x="380" y="85" fill="#34D399" fontSize="12" textAnchor="middle">MAN (City)</text>
              <rect x="310" y="110" width="50" height="40" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="335" y="138" fill="#E5E7EB" fontSize="9" textAnchor="middle">Building A</text>
              <rect x="390" y="110" width="50" height="40" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="415" y="138" fill="#E5E7EB" fontSize="9" textAnchor="middle">Building B</text>
              <line x1="360" y1="130" x2="390" y2="130" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="335" y1="150" x2="415" y2="150" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="380" y="210" fill="#34D399" fontSize="10" textAnchor="middle">Fiber backbone</text>

              {/* WAN - Right side */}
              <rect x="570" y="20" width="200" height="260" fill="none" stroke="#EC489A" strokeWidth="2" strokeDasharray="5 5" />
              <text x="670" y="35" fill="#EC489A" fontSize="12" textAnchor="middle">WAN (Global)</text>
              <rect x="600" y="60" width="50" height="40" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="625" y="88" fill="#E5E7EB" fontSize="9" textAnchor="middle">City A</text>
              <rect x="680" y="60" width="50" height="40" fill="#1F2937" stroke="#9CA3AF" rx="4" />
              <text x="705" y="88" fill="#E5E7EB" fontSize="9" textAnchor="middle">City B</text>
              <rect x="640" y="150" width="50" height="40" fill="#1F2937" stroke="#FBBF24" rx="4" />
              <text x="665" y="178" fill="#E5E7EB" fontSize="9" textAnchor="middle">Satellite</text>
              <line x1="625" y1="100" x2="665" y2="150" stroke="#EC489A" strokeWidth="1.5" strokeDasharray="5 3" />
              <line x1="705" y1="100" x2="665" y2="150" stroke="#EC489A" strokeWidth="1.5" strokeDasharray="5 3" />
              <text x="670" y="230" fill="#EC489A" fontSize="10" textAnchor="middle">Undersea cables / satellite</text>
            </svg>
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
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
          className="border border-dashed border-green-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-green-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When you connect your laptop to a café's Wi-Fi, what type of network is that? How does it connect to the internet (a WAN)? What would happen if the café's LAN had a slow connection to its ISP?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Map the networks you interact with in a day: home LAN, school LAN (if in school), city MAN (if your city has public Wi-Fi or fiber), and the WAN that connects you to a website. Identify each.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "This topic helps students see the bigger picture. Use real maps to illustrate MANs (e.g., city fiber networks) and the global undersea cable map for WANs. Emphasize that the Internet is a massive WAN, but there are private WANs as well. Encourage students to draw their own diagrams showing LAN, MAN, and WAN connections. Discuss latency: why does a video call to another country sometimes lag?"
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

export default Topic3;