import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic13.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the router – a Layer 3 device that forwards packets between
 *          networks based on IP addresses, enabling internetworking.
 * When & Why Used: After covering switches (Layer 2), this topic introduces
 *                  the device that connects networks together, forming the
 *                  internetwork (e.g., LAN to WAN, home to ISP).
 */

const Topic13 = () => {
  const definition =
    "A router is a networking device that forwards data packets between different networks. It operates at the Network Layer (Layer 3) of the OSI model, using IP addresses and routing tables to determine the best path. Routers are the backbone of the Internet, connecting LANs, WANs, and ISPs.";

  const workingPrinciple = [
    "A router receives a packet on one of its interfaces.",
    "It examines the destination IP address.",
    "It consults its routing table, which contains known networks and associated next-hop IPs or interfaces.",
    "The router forwards the packet out of the appropriate interface toward the destination.",
    "If no route is found, the packet is dropped (and sometimes an ICMP 'destination unreachable' is returned)."
  ];

  const routingTableConcepts = [
    "Directly connected networks – automatically added when an interface is configured with an IP.",
    "Static routes – manually configured by an administrator.",
    "Dynamic routes – learned via routing protocols (OSPF, BGP, etc.).",
    "Default route (0.0.0.0/0) – used when no specific route matches; often points to the ISP gateway."
  ];

  const keyFunctions = [
    "Network interconnection – connects different network segments (e.g., home LAN to ISP).",
    "Packet forwarding – determines best path based on IP addresses and routing tables.",
    "Network Address Translation (NAT) – allows multiple devices to share a single public IP.",
    "Traffic filtering – can implement Access Control Lists (ACLs) for security.",
    "Broadcast domain separation – routers do not forward broadcasts, isolating broadcast domains."
  ];

  const advantages = [
    "Enables communication between different networks (e.g., LAN to WAN, different VLANs).",
    "Provides security through ACLs and NAT (hides internal IPs).",
    "Reduces broadcast traffic – broadcasts are contained within the local subnet.",
    "Supports dynamic path selection – adapts to network changes via routing protocols.",
    "Scalable – can build large, complex networks (e.g., the Internet)."
  ];

  const disadvantages = [
    "Higher latency than switches (routing decisions take time).",
    "More expensive and complex than switches.",
    "Configuration complexity – especially for dynamic routing protocols.",
    "Potential for misconfiguration (e.g., routing loops, black holes)."
  ];

  const realWorldUsage = [
    {
      scenario: "Home Router",
      description:
        "Swadeep's home router connects his LAN (laptops, phones, smart TV) to the Internet via his ISP. It performs NAT, DHCP, and basic firewall functions. Without it, his devices couldn't reach websites."
    },
    {
      scenario: "Enterprise Edge Router",
      description:
        "At Tuhina's company in Barrackpore, an edge router connects the corporate LAN to the ISP, often running BGP to exchange routes with multiple providers for redundancy."
    },
    {
      scenario: "Core Router (Internet Backbone)",
      description:
        "Large routers at Internet exchange points handle millions of routes and terabytes of traffic. Susmita's data travels through dozens of such routers when she accesses a server in another country."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Confusing a router with a switch",
      correction:
        "Switches forward within the same network (Layer 2). Routers forward between networks (Layer 3). A home router combines a router, switch, and often a Wi‑Fi access point."
    },
    {
      mistake: "Forgetting the default gateway",
      correction:
        "For devices on a LAN to reach the Internet, they must have a default gateway configured – typically the router's LAN IP."
    },
    {
      mistake: "Static route misconfigurations",
      correction:
        "When adding static routes, ensure both forward and return paths exist (symmetric routing). Test with ping and traceroute."
    }
  ];

  const bestPractices = [
    "Always secure router management (change default passwords, disable unused services).",
    "Use routing protocols like OSPF for internal networks; BGP for border routing.",
    "Document your routing table and network topology.",
    "Implement access control lists to limit traffic to/from sensitive networks."
  ];

  const tipsAndTricks = [
    "Use `traceroute` (or `tracert` on Windows) to see the path packets take through routers – it's a great diagnostic tool.",
    "Check routing tables with `show ip route` (Cisco) or `route print` (Windows) to understand how packets are forwarded.",
    "For a home router, the default gateway is usually 192.168.1.1 or 192.168.0.1 – you can log in to view its routing table."
  ];

  const miniChecklist = [
    "☐ I can define a router and explain its role in connecting networks.",
    "☐ I understand that routers operate at Layer 3 using IP addresses.",
    "☐ I can explain what a routing table does and list ways routes are added.",
    "☐ I know the difference between a router and a switch.",
    "☐ I can give examples of routers in home, enterprise, and backbone environments."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Networking Devices: Router
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting networks, routing packets across the internetwork
          </p>
        </div>

        {/* Definition & Working Principle */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌐</span>
              <h2 className="text-2xl font-semibold">What is a Router?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of a router as a postal sorting facility: it looks at the address (IP) and decides which truck (network) to send it on.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
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

        {/* Routing Table & Key Functions */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h2 className="text-2xl font-semibold">Routing Table</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {routingTableConcepts.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔑</span>
              <h2 className="text-2xl font-semibold">Key Functions</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {keyFunctions.map((fn, i) => (
                <li key={i}>{fn}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG Illustration: Router Interconnecting Networks */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-semibold">Visual: Router in Action</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Router connecting two networks: LAN (left) and WAN/Internet (right)</title>
              
              {/* Router central box */}
              <rect x="280" y="100" width="190" height="100" fill="#1F2937" stroke="#A855F7" strokeWidth="2" rx="6" />
              <text x="375" y="145" fill="#A855F7" fontSize="14" textAnchor="middle">ROUTER</text>
              <text x="375" y="170" fill="#9CA3AF" fontSize="9" textAnchor="middle">IP: 192.168.1.1 / 203.0.113.1</text>
              
              {/* LAN side (left) */}
              <rect x="50" y="70" width="180" height="140" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="140" y="55" fill="#60A5FA" fontSize="12">LAN (192.168.1.0/24)</text>
              <circle cx="110" cy="130" r="25" fill="#1F2937" stroke="#9CA3AF" />
              <text x="110" y="135" fill="#E5E7EB" fontSize="10" textAnchor="middle">PC</text>
              <text x="110" y="150" fill="#9CA3AF" fontSize="8" textAnchor="middle">192.168.1.10</text>
              <circle cx="170" cy="130" r="25" fill="#1F2937" stroke="#9CA3AF" />
              <text x="170" y="135" fill="#E5E7EB" fontSize="10" textAnchor="middle">Laptop</text>
              <text x="170" y="150" fill="#9CA3AF" fontSize="8" textAnchor="middle">192.168.1.20</text>
              <line x1="135" y1="130" x2="280" y2="130" stroke="#60A5FA" strokeWidth="1.5" />
              
              {/* WAN/Internet side (right) */}
              <rect x="520" y="70" width="180" height="140" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="610" y="55" fill="#F59E0B" fontSize="12">Internet / WAN</text>
              <circle cx="610" cy="130" r="25" fill="#1F2937" stroke="#9CA3AF" />
              <text x="610" y="135" fill="#E5E7EB" fontSize="10" textAnchor="middle">ISP</text>
              <text x="610" y="150" fill="#9CA3AF" fontSize="8" textAnchor="middle">203.0.113.10</text>
              <line x1="470" y1="150" x2="520" y2="150" stroke="#F59E0B" strokeWidth="1.5" />
              
              {/* Animated packet from PC to Internet */}
              <circle cx="110" cy="130" r="5" fill="#F97316">
                <animate attributeName="cx" values="110;280;375;470;610" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="130;130;150;150;130" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="350" y="50" fill="#F97316" fontSize="10">Packet to 8.8.8.8</text>
              <text x="350" y="35" fill="#9CA3AF" fontSize="8">Router checks routing table → forwards to ISP</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Router connects different networks, using IP addresses and routing tables to forward packets.
          </p>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
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
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏠</span>
            <h2 className="text-2xl font-semibold">Real‑World Usage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldUsage.map((item, idx) => (
              <div
                key={item.scenario}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-purple-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.9 + idx * 0.1}s forwards`,
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
          className="border border-dashed border-purple-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-purple-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When you type a website URL, what role does your home router play? How does it know to send packets to the Internet and not to another device in your LAN?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Open a command prompt and run `tracert google.com`. How many routers does your packet pass through? Can you identify your home router (likely the first hop)?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.5s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Routers are where networking truly scales. Emphasize the distinction from switches: routers connect networks, switches connect devices within a network. Use the `tracert` command as a live demo to show students how routers forward packets hop by hop. Cover the concept of default gateway – many students overlook it. If possible, show a routing table from a real router (home or lab) to make the theory concrete."
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

export default Topic13;