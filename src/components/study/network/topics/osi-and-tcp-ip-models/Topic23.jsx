import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic23: Devices Used in Different Layers
 * 
 * Purpose: Identify and explain network devices at each layer of the OSI/TCP/IP models,
 *          their functions, and how they operate to forward data.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Understanding what device operates at which layer is essential for network design,
 *              troubleshooting, and certification exams (Network+, CCNA).
 */

const Topic23 = () => {
  // Keyframes for fade-slide-up animation
  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% {
        opacity: 0;
        transform: translateY(1.5rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Device data
  const devices = [
    { name: "Hub", layer: "Physical", layerNum: 1, function: "Repeats signal to all ports; no intelligence; creates a single collision domain.", examples: "Older networks, simple setups (mostly obsolete).", pros: "Inexpensive, simple.", cons: "Inefficient, collisions, security risk." },
    { name: "Repeater", layer: "Physical", layerNum: 1, function: "Amplifies or regenerates signals to extend cable length.", examples: "Extending Ethernet beyond 100m.", pros: "Simple, extends distance.", cons: "Can't filter traffic, adds latency." },
    { name: "Switch", layer: "Data Link", layerNum: 2, function: "Forwards frames based on MAC address table; learns MACs; creates separate collision domains per port.", examples: "Ethernet switches in LANs.", pros: "Efficient, secure, full-duplex.", cons: "More expensive than hubs." },
    { name: "Bridge", layer: "Data Link", layerNum: 2, function: "Connects two network segments; filters based on MAC addresses (similar to switch with fewer ports).", examples: "Older networks, connecting two Ethernet segments.", pros: "Reduces collision domains.", cons: "Limited ports, mostly replaced by switches." },
    { name: "Router", layer: "Network", layerNum: 3, function: "Forwards packets based on IP addresses; maintains routing tables; connects different networks.", examples: "Home router, enterprise routers, ISP routers.", pros: "Interconnects networks, supports routing protocols.", cons: "More expensive, slower than switches." },
    { name: "Layer 3 Switch", layer: "Network", layerNum: 3, function: "Switch that can also route; combines switching speed with routing intelligence.", examples: "Enterprise LAN core/distribution.", pros: "High-speed routing, VLAN support.", cons: "More expensive than Layer 2 switches." },
    { name: "Gateway", layer: "Application / Multiple", layerNum: "5-7", function: "Connects different network architectures; translates protocols (e.g., VoIP gateway, email gateway).", examples: "VoIP gateway, protocol converter, firewall.", pros: "Interoperability between different systems.", cons: "Complex, can be performance bottleneck." },
    { name: "Firewall", layer: "Network/Transport/Application", layerNum: "3-7", function: "Filters traffic based on rules; can operate at multiple layers.", examples: "Network firewall, next-gen firewall (NGFW).", pros: "Security, access control.", cons: "Can block legitimate traffic if misconfigured." },
    { name: "Modem", layer: "Physical", layerNum: 1, function: "Modulates/demodulates signals between digital and analog (e.g., DSL, cable).", examples: "Cable modem, DSL modem.", pros: "Connects to ISP infrastructure.", cons: "Often combined with router." },
    { name: "Access Point", layer: "Data Link", layerNum: 2, function: "Connects wireless devices to a wired network; bridges Wi-Fi to Ethernet.", examples: "Wi-Fi AP in home/office.", pros: "Wireless connectivity.", cons: "Susceptible to interference." }
  ];

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Network Devices by Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Hub, Switch, Router, Gateway — understanding what device does what
            </p>
          </section>

          {/* Real-World Analogy: Transportation Hubs */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🚚 Real-World Analogy: Transportation Network
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> sending packages to multiple cities.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Hub (Physical):</span> A central depot that simply copies every package to all outgoing trucks – inefficient, everyone gets everything.</li>
              <li><span className="font-bold">Switch (Data Link):</span> A smart sorting center that reads the street address (MAC) and sends packages only to the correct neighborhood truck.</li>
              <li><span className="font-bold">Router (Network):</span> A regional hub that decides which highway to use based on city (IP), connecting different cities.</li>
              <li><span className="font-bold">Gateway (Application):</span> An international shipping office that converts package formats between countries (different protocols).</li>
            </ul>
            <p>
              Each device has a specific role and operates at a certain layer.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why does a router need to understand IP addresses, but a switch only needs MAC addresses? Because they operate at different layers.
            </div>
          </section>

          {/* Devices Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📊 Network Devices by OSI Layer
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Device</th>
                    <th className="border p-2 text-left">OSI Layer</th>
                    <th className="border p-2 text-left">Function</th>
                    <th className="border p-2 text-left">Examples / Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d, idx) => (
                    <tr key={d.name} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="border p-2 font-bold">{d.name}</td>
                      <td className="border p-2">{d.layer} (Layer {d.layerNum})</td>
                      <td className="border p-2">{d.function}</td>
                      <td className="border p-2">{d.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Layer 1: Physical Layer Devices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔌 Layer 1 (Physical) Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Hub</h3>
                <p>Repeats signal to all ports. Single collision domain. Obsolete but good for understanding.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Repeater</h3>
                <p>Amplifies/regenerates signals to extend cable length. Simple, no intelligence.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Modem</h3>
                <p>Modulates/demodulates signals between digital and analog (cable, DSL).</p>
              </div>
            </div>
          </section>

          {/* Layer 2: Data Link Devices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🔌 Layer 2 (Data Link) Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Switch</h3>
                <p>Forwards frames based on MAC address table. Creates separate collision domains. Most common LAN device.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Bridge</h3>
                <p>Connects two network segments; filters based on MAC. Mostly replaced by switches.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Access Point (AP)</h3>
                <p>Bridges wireless to wired network; operates at Layer 2.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">NIC</h3>
                <p>Network Interface Card – provides MAC address and physical connection.</p>
              </div>
            </div>
          </section>

          {/* Layer 3: Network Layer Devices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🌍 Layer 3 (Network) Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Router</h3>
                <p>Forwards packets based on IP addresses; uses routing tables; connects different networks.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Layer 3 Switch</h3>
                <p>Switch with routing capabilities; faster than routers for internal routing.</p>
              </div>
            </div>
          </section>

          {/* Upper Layer Devices (4-7) */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🔐 Upper Layer Devices (Transport–Application)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Gateway</h3>
                <p>Connects different network architectures; translates protocols (e.g., VoIP gateway, email gateway). Operates at multiple layers, often Application.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Firewall</h3>
                <p>Filters traffic based on rules; can operate at Network, Transport, or Application layers (NGFW).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Load Balancer</h3>
                <p>Distributes traffic across servers; often operates at Application layer (HTTP) or Transport layer.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Proxy Server</h3>
                <p>Intermediary for client requests; operates at Application layer.</p>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Device Layering */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🎨 Visual: Devices by OSI Layer
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="320" viewBox="0 0 550 320" className="max-w-full h-auto">
                <rect x="30" y="20" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="42" textAnchor="middle" fill="white" fontSize="10">App (7)</text>
                <rect x="30" y="60" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="82" textAnchor="middle" fill="white" fontSize="10">Pres (6)</text>
                <rect x="30" y="100" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="122" textAnchor="middle" fill="white" fontSize="10">Sess (5)</text>
                <rect x="30" y="140" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="162" textAnchor="middle" fill="white" fontSize="10">Trans (4)</text>
                <rect x="30" y="180" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="202" textAnchor="middle" fill="white" fontSize="10">Net (3)</text>
                <rect x="30" y="220" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="242" textAnchor="middle" fill="white" fontSize="10">DL (2)</text>
                <rect x="30" y="260" width="100" height="35" fill="#3b82f6" rx="3" /><text x="80" y="282" textAnchor="middle" fill="white" fontSize="10">Phys (1)</text>

                {/* Device annotations */}
                <text x="160" y="280" fill="#ffaa44" fontSize="10">Hub, Repeater, Modem</text>
                <text x="160" y="242" fill="#ffaa44" fontSize="10">Switch, Bridge, AP</text>
                <text x="160" y="202" fill="#ffaa44" fontSize="10">Router, Layer 3 Switch</text>
                <text x="160" y="162" fill="#ffaa44" fontSize="10">Firewall, Load Balancer</text>
                <text x="160" y="122" fill="#ffaa44" fontSize="10">Gateway, Firewall (NGFW), Proxy</text>

                <text x="275" y="310" textAnchor="middle" fill="currentColor" fontSize="12">Each device operates at a specific layer (or multiple)</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Devices at lower layers are faster but less intelligent; higher-layer devices offer more functionality.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">For troubleshooting, identify the device type</span> – it tells you which layer to check (e.g., switch → MAC tables, router → routing tables).</li>
              <li><span className="font-bold">Hubs are obsolete</span> – if you see one in production, it's time to upgrade to a switch.</li>
              <li><span className="font-bold">Routers separate broadcast domains; switches separate collision domains.</span></li>
              <li><span className="font-bold">A "home router" is actually a combo device:</span> router + switch + access point + firewall.</li>
              <li><span className="font-bold">Layer 3 switches</span> are often used for high-speed routing within a campus network.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking a switch can route between different subnets without a router.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Switches operate at Layer 2; to route between networks, you need a router (or Layer 3 switch with routing enabled).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming all firewalls are Layer 3 only.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Next-gen firewalls (NGFW) inspect application-layer traffic (HTTP, etc.).</div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Gateways are always routers."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> A gateway translates between different protocols; a router forwards IP packets. They can be separate or combined.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="font-bold">switches for LAN connectivity</span> – they provide dedicated bandwidth per port.</li>
              <li>Use <span className="font-bold">routers to connect different networks</span> and provide security (ACLs, firewalling).</li>
              <li><span className="font-bold">Segment networks with VLANs</span> at Layer 2, and use Layer 3 switches or routers for inter-VLAN routing.</li>
              <li><span className="font-bold">Place firewalls at network boundaries</span> to control traffic between security zones.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Physical: Hub, Repeater, Modem</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Data Link: Switch, Bridge, AP, NIC</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Network: Router, Layer 3 Switch</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Upper: Gateway, Firewall, Load Balancer</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Hubs are obsolete; switches are standard</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Routers connect networks; switches connect devices</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <Teacher 
              note={"Show physical devices if possible – a hub, a switch, a router. Let students see the ports and understand the difference. Use the analogy: hub is like a party where everyone talks at once; switch is like a private conversation. Emphasize that in modern networks, you'll rarely see a hub; switches are the standard. For certification, memorizing which device operates at which layer is crucial."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Look at your home network equipment. You likely have a device labeled "router" that has multiple Ethernet ports and Wi-Fi. That's actually a combination of router + switch + access point. The WAN port connects to your modem (ISP), the LAN ports are the switch.</p>
            <p className="mt-2 text-sm">Try this: Use `arp -a` to see MAC addresses of devices on your network. The devices listed are those your computer has communicated with via the switch (Layer 2).</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. Which OSI layer does a hub operate at?</p><p>Physical Layer (Layer 1).</p></div>
              <div><p className="font-bold">2. What layer does a switch operate at?</p><p>Data Link Layer (Layer 2) – though some switches also have Layer 3 capabilities.</p></div>
              <div><p className="font-bold">3. Which device uses IP addresses to forward packets?</p><p>Router (Network Layer, Layer 3).</p></div>
              <div><p className="font-bold">4. What is the difference between a hub and a switch?</p><p>Hub repeats signals to all ports; switch forwards frames based on MAC address, creating separate collision domains.</p></div>
              <div><p className="font-bold">5. What does a bridge do?</p><p>Connects two network segments and filters based on MAC addresses (similar to a switch with two ports).</p></div>
              <div><p className="font-bold">6. What layer does a router operate at?</p><p>Network Layer (Layer 3).</p></div>
              <div><p className="font-bold">7. What is a Layer 3 switch?</p><p>A switch that can also perform routing functions (IP forwarding) between VLANs.</p></div>
              <div><p className="font-bold">8. Which device translates between different protocols (e.g., SIP to PSTN)?</p><p>Gateway (often at Application layer).</p></div>
              <div><p className="font-bold">9. At what layer does a firewall typically operate?</p><p>Can operate at Network, Transport, or Application layers (depending on type).</p></div>
              <div><p className="font-bold">10. What is the purpose of a repeater?</p><p>To amplify or regenerate signals to extend cable length.</p></div>
              <div><p className="font-bold">11. What does a modem do?</p><p>Modulates/demodulates signals between digital (computer) and analog (phone line/cable).</p></div>
              <div><p className="font-bold">12. Which device would you use to connect two different networks (e.g., LAN to WAN)?</p><p>Router.</p></div>
              <div><p className="font-bold">13. What is the primary function of an access point?</p><p>To connect wireless devices to a wired network (bridging).</p></div>
              <div><p className="font-bold">14. Why are hubs considered obsolete?</p><p>Because they create a single collision domain, leading to inefficiency and security issues; switches provide dedicated bandwidth per port.</p></div>
              <div><p className="font-bold">15. Can a device operate at multiple layers? Give an example.</p><p>Yes, e.g., a Layer 3 switch operates at Layers 2 and 3; a next-gen firewall operates at Layers 3, 4, and 7.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic23;