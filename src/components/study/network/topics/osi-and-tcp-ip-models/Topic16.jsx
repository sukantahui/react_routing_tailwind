import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic16: Internet Layer – IP addressing and routing
 * 
 * Purpose: Explain the Internet layer's core functions: logical addressing (IP),
 *          packet routing, and the protocols that make internetwork communication possible.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: This is the heart of the TCP/IP model – the layer that enables
 *              data to travel across networks using IP addresses and routing.
 */

const Topic16 = () => {
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

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Internet Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              IP addressing and routing — the glue that connects networks into an internetwork
            </p>
          </section>

          {/* Real-World Analogy: Intercity Highway System */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🛣️ Real-World Analogy: Intercity Highway System
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to drive to <strong>Abhronila</strong>'s house in <strong>Shyamnagar</strong>. The <strong>Internet Layer</strong> is like the national highway system:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">IP Address:</span> The unique postal code + city name (logical address) that identifies the destination.</li>
              <li><span className="font-bold">Routing:</span> The decision of which highway route to take (via NH-12, bypass, etc.).</li>
              <li><span className="font-bold">Router:</span> The highway interchange that directs cars toward their destination.</li>
              <li><span className="font-bold">Packet:</span> The car itself, carrying the passenger (data).</li>
            </ul>
            <p>
              The Internet layer doesn't worry about the car's make (physical) or the passenger's name (application); it just ensures the car gets to the correct city using the best available roads.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why do we need logical addresses (IP) when we already have physical addresses (MAC)? Because MAC addresses are only meaningful on the local network; IP addresses allow us to route across the entire internet.
            </div>
          </section>

          {/* Core Concepts: IP Addressing, Routing, Protocols */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Functions of the Internet Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🌐</div>
                <h3 className="font-bold text-lg">Logical Addressing (IP)</h3>
                <p className="text-sm">Assigns a unique logical address to each device (IPv4 32-bit, IPv6 128-bit). IP addresses are hierarchical: network portion + host portion.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🗺️</div>
                <h3 className="font-bold text-lg">Routing</h3>
                <p className="text-sm">Determines the path packets take from source to destination using routing tables and protocols (static, RIP, OSPF, BGP).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-bold text-lg">Packet Forwarding</h3>
                <p className="text-sm">Encapsulates transport layer segments into packets with IP headers, then forwards them to the next hop based on routing decisions.</p>
              </div>
            </div>
          </section>

          {/* IPv4 vs IPv6 */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📡 IP Addressing: IPv4 vs IPv6
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">IPv4</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>32 bits → 4.3 billion addresses</li>
                  <li>Dotted decimal: 192.168.1.1</li>
                  <li>Uses subnet masks (e.g., /24, 255.255.255.0)</li>
                  <li>Classes A, B, C (now replaced by CIDR)</li>
                  <li>NAT often used to conserve addresses</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">IPv6</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>128 bits → 3.4×10³⁸ addresses</li>
                  <li>Hexadecimal: 2001:0db8:85a3::8a2e:0370:7334</li>
                  <li>No NAT needed; built-in IPsec</li>
                  <li>Auto-configuration (SLAAC)</li>
                  <li>Growing adoption (mobile, IoT, cloud)</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm">
              <strong>Debangshu</strong> gets a new smartphone that uses IPv6 – he can connect directly to the internet without NAT, enabling peer-to-peer applications.
            </p>
          </section>

          {/* Routing Protocols & Routers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🚦 Routers and Routing Protocols
            </h2>
            <p>
              A <span className="font-bold">router</span> is a device that connects different networks and forwards packets based on IP addresses. Routers maintain <span className="font-bold">routing tables</span> that map destination networks to next-hop routers or exit interfaces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Static Routing</h3>
                <p className="text-sm">Routes are manually configured. Simple, no overhead, but not scalable for large networks.</p>
                <p className="text-xs font-mono mt-1">ip route 192.168.2.0 255.255.255.0 192.168.1.2</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold">Dynamic Routing</h3>
                <p className="text-sm">Routers exchange information using protocols. Automatically adapt to topology changes.</p>
                <ul className="list-disc list-inside text-xs mt-1">
                  <li>RIP (Distance Vector, simple)</li>
                  <li>OSPF (Link State, fast convergence)</li>
                  <li>BGP (Path Vector, used on the internet)</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Key Insight:</span> The internet's global routing uses BGP (Border Gateway Protocol) to exchange routes between autonomous systems (ISPs).
            </div>
          </section>

          {/* Important Protocols: ICMP, ARP */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🔍 Supporting Protocols: ICMP & ARP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold">ICMP (Internet Control Message Protocol)</h3>
                <p>Used for error reporting and diagnostics. Examples:</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Ping (echo request/reply) – tests connectivity</li>
                  <li>Traceroute – discovers path to destination</li>
                  <li>Destination unreachable – informs sender of failures</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold">ARP (Address Resolution Protocol)</h3>
                <p>Resolves IP addresses to MAC addresses on a local network. Essential because the Internet layer uses IP, but Network Access layer uses MAC.</p>
                <p className="text-sm mt-1">When <strong>Tuhina</strong> wants to send a packet to her default gateway, ARP asks: "Who has IP 192.168.1.1? Tell 192.168.1.10 (MAC: aa:bb:cc:dd:ee:ff)"</p>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Packet Routing Across Networks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎨 Visual: IP Packet Routing
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="280" viewBox="0 0 550 280" className="max-w-full h-auto">
                <rect x="30" y="100" width="100" height="50" fill="#3b82f6" rx="5" />
                <text x="80" y="130" textAnchor="middle" fill="white" fontSize="10">Network A</text>
                <text x="80" y="145" textAnchor="middle" fill="white" fontSize="8">192.168.1.0/24</text>
                <rect x="180" y="100" width="80" height="50" fill="#10b981" rx="5" />
                <text x="220" y="130" textAnchor="middle" fill="white" fontSize="10">Router</text>
                <rect x="320" y="100" width="100" height="50" fill="#f59e0b" rx="5" />
                <text x="370" y="130" textAnchor="middle" fill="white" fontSize="10">Network B</text>
                <text x="370" y="145" textAnchor="middle" fill="white" fontSize="8">10.0.0.0/24</text>
                <rect x="470" y="100" width="50" height="50" fill="#ef4444" rx="5" />
                <text x="495" y="130" textAnchor="middle" fill="white" fontSize="10">Server</text>
                <circle cx="80" cy="80" r="6" fill="#ffaa44">
                  <animate attributeName="cx" values="80;220;370;495" dur="3s" repeatCount="indefinite" />
                </circle>
                <path d="M80 80 L 220 125 L 370 125 L 495 125" stroke="gray" strokeWidth="1" strokeDasharray="4 2" />
                <text x="280" y="200" textAnchor="middle" fill="currentColor" fontSize="12">Packet travels: source → router → destination</text>
                <text x="280" y="220" textAnchor="middle" fill="currentColor" fontSize="10">Router uses IP destination address to forward</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Routers examine the destination IP address and forward the packet to the next hop toward the destination network.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use `ping` to test reachability</span> – if ping fails, the problem could be IP connectivity (routing) or the destination is down.</li>
              <li><span className="font-bold">`traceroute` (or `tracert`)</span> shows the path packets take – invaluable for locating network bottlenecks or routing loops.</li>
              <li><span className="font-bold">Check routing tables with `route print` (Windows) or `ip route show` (Linux).</span> Know your default gateway.</li>
              <li><span className="font-bold">Understand subnetting</span> – it's essential for efficient IP address allocation and route summarization.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing IP addresses with MAC addresses.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> IP addresses are logical, hierarchical, and used for routing; MAC addresses are physical, flat, and used for local delivery.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming a router will forward packets without a correct default route.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Every device needs a default gateway (router) to reach outside its own subnet.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "IPv6 is just larger addresses."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> IPv6 also simplifies auto-configuration, eliminates NAT, and includes mandatory IPsec.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="font-bold">private IP ranges</span> (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) for internal networks and NAT for internet access.</li>
              <li><span className="font-bold">Document your IP addressing scheme</span> – subnet allocation, VLANs, and static routes.</li>
              <li>Implement <span className="font-bold">route summarization</span> to reduce routing table size and improve convergence.</li>
              <li>Enable <span className="font-bold">IPv6 dual-stack</span> to support both protocols during migration.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Internet layer = logical addressing + routing</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> IP addresses: IPv4 (32-bit) and IPv6 (128-bit)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Routers forward packets using routing tables</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Routing protocols: static, RIP, OSPF, BGP</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> ICMP: ping, traceroute</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> ARP maps IP to MAC addresses on local network</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <Teacher 
              note={"Stress the difference between routing and switching: switches forward within a network (MAC), routers forward between networks (IP). Use live demos: show students their IP configuration (ipconfig/ifconfig) and run `traceroute` to popular websites. Explain that ARP is the glue between the Internet layer and Network Access layer – it's crucial for local communication."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Run `traceroute 8.8.8.8`. The first hop is your default gateway (router). Each subsequent hop is another router forwarding packets. Notice how the RTT (round-trip time) increases with each hop – that's the cumulative delay.</p>
            <p className="mt-2 text-sm">Try this: Use `arp -a` to see the IP-to-MAC mappings on your local network. You'll see entries for devices you've communicated with – including your default gateway. That's ARP at work.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the primary function of the Internet layer?</p><p>Logical addressing (IP) and routing packets across networks.</p></div>
              <div><p className="font-bold">2. How many bits are in an IPv4 address? IPv6?</p><p>IPv4: 32 bits; IPv6: 128 bits.</p></div>
              <div><p className="font-bold">3. What is a subnet mask used for?</p><p>To divide an IP address into network and host portions (e.g., /24 = 255.255.255.0).</p></div>
              <div><p className="font-bold">4. What is a router?</p><p>A device that forwards packets between different networks based on IP addresses and routing tables.</p></div>
              <div><p className="font-bold">5. What is the difference between static and dynamic routing?</p><p>Static routes are manually configured; dynamic routes are learned via routing protocols (RIP, OSPF, BGP).</p></div>
              <div><p className="font-bold">6. Name two dynamic routing protocols.</p><p>OSPF (Open Shortest Path First) and BGP (Border Gateway Protocol).</p></div>
              <div><p className="font-bold">7. What is the purpose of ICMP?</p><p>Internet Control Message Protocol – used for error reporting and diagnostics (ping, traceroute).</p></div>
              <div><p className="font-bold">8. What does ARP do?</p><p>Address Resolution Protocol – resolves IP addresses to MAC addresses on a local network.</p></div>
              <div><p className="font-bold">9. What is a default gateway?</p><p>The router IP address that a host uses to send packets to destinations outside its own network.</p></div>
              <div><p className="font-bold">10. What is TTL (Time to Live) in an IP packet?</p><p>A field that prevents packets from looping indefinitely; each router decrements it, and when it reaches 0, the packet is discarded.</p></div>
              <div><p className="font-bold">11. What is the difference between IPv4 and IPv6 addressing?</p><p>IPv4 uses 32-bit addresses and NAT; IPv6 uses 128-bit addresses, eliminates NAT, and includes built-in security.</p></div>
              <div><p className="font-bold">12. How does traceroute work?</p><p>Sends packets with increasing TTL values; each router that decrements TTL to 0 returns an ICMP time-exceeded message, revealing the path.</p></div>
              <div><p className="font-bold">13. What is a routing table?</p><p>A table stored in a router that lists known networks and the next-hop router or exit interface to reach them.</p></div>
              <div><p className="font-bold">14. Why do we need both IP and MAC addresses?</p><p>IP addresses enable routing across networks; MAC addresses enable delivery on the local network segment.</p></div>
              <div><p className="font-bold">15. What command would you use to view the ARP cache on Windows?</p><p>`arp -a`.</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic16;