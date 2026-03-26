import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic6: Network Layer – logical addressing (IP), routing, routers
 * 
 * Purpose: Explain the network layer's role in logical addressing (IP),
 *          packet forwarding, routing, and the devices that operate at this layer.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on data link layer to show how data is delivered across multiple networks
 *              using IP addresses and routing protocols.
 */

const Topic6 = () => {
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
              Network Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 3: Logical addressing (IP), routing, routers — connecting different networks
            </p>
          </section>

          {/* Real-World Analogy: Intercity Postal Service */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📬 Real-World Analogy: Intercity Postal Service
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> wants to send a letter to <strong>Abhronila</strong> in <strong>Shyamnagar</strong>. The local post office (data link) handles delivery within Barrackpore, but to reach another city, the letter must go through a <strong>central sorting hub</strong> — a router.
            </p>
            <p className="mt-2">
              The <span className="font-bold">network layer</span> is like the intercity postal system: it uses <span className="font-bold">logical addresses (IP addresses)</span> like city+street names, and <span className="font-bold">routers</span> decide the best path to forward packets based on destination IP.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why do we need both MAC (local) and IP (global) addresses? Just like a letter needs a street address (MAC) for local delivery and a city+postal code (IP) for intercity routing.
            </div>
          </section>

          {/* Core Concepts: IP Addressing, Routing, Routers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Functions of Network Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🌐</div>
                <h3 className="font-bold text-lg">Logical Addressing (IP)</h3>
                <p className="text-sm">Assigns a unique logical address (IPv4 or IPv6) to each device, enabling identification across multiple networks. IP addresses are hierarchical (network + host).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🗺️</div>
                <h3 className="font-bold text-lg">Routing</h3>
                <p className="text-sm">Determines the best path to forward packets from source to destination across internetworks. Uses routing tables and protocols (static, RIP, OSPF, BGP).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-bold text-lg">Packet Forwarding</h3>
                <p className="text-sm">Encapsulates segments into packets, adds IP header (source/dest IPs), and forwards to the next hop based on routing decisions.</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <span className="font-bold">🔁 Fragmentation:</span> Splits packets that are too large for a particular network's MTU (Maximum Transmission Unit). Reassembled at destination.
            </div>
          </section>

          {/* IPv4 vs IPv6 */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📡 IP Addressing: IPv4 and IPv6
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">IPv4</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>32-bit address (e.g., 192.168.1.1)</li>
                  <li>About 4.3 billion addresses</li>
                  <li>Used with subnet masks (e.g., /24)</li>
                  <li>Depleting, uses NAT to conserve</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">IPv6</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>128-bit address (e.g., 2001:db8::1)</li>
                  <li>3.4×10³⁸ addresses</li>
                  <li>No NAT needed, built-in security</li>
                  <li>Growing adoption (mobile, IoT)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Routing & Routers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🚦 Routing & Routers
            </h2>
            <p>
              A <span className="font-bold">router</span> is a device that connects different networks and forwards packets based on IP addresses. It maintains a <span className="font-bold">routing table</span> containing:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Destination network</li>
              <li>Next-hop router or exit interface</li>
              <li>Metric (cost) to reach that network</li>
            </ul>
            <p className="mt-3">
              <span className="font-bold">Routing can be:</span>
            </p>
            <ul className="list-disc list-inside ml-4">
              <li><span className="font-semibold">Static:</span> Manually configured (simple, small networks).</li>
              <li><span className="font-semibold">Dynamic:</span> Routers exchange information using protocols like RIP, OSPF, EIGRP, BGP (used in large networks and the internet).</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Industry term:</span> Routers are the backbone of the internet. Each packet's journey from source to destination is a series of router-to-router hops.
            </div>
          </section>

          {/* SVG Illustration: IP Packet & Routing */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: IP Packet Structure & Routing
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="300" viewBox="0 0 550 300" className="max-w-full h-auto">
                <rect x="50" y="20" width="450" height="60" fill="none" stroke="gray" strokeWidth="1" />
                <text x="60" y="45" fill="currentColor" fontSize="12">IP Header</text>
                <text x="150" y="45" fill="currentColor" fontSize="10">(Src IP, Dest IP, TTL, etc.)</text>
                <text x="60" y="70" fill="currentColor" fontSize="12">Payload (Transport Layer Segment)</text>
                <text x="275" y="100" textAnchor="middle" fill="#ffaa44" fontSize="12">Packet</text>

                {/* Routers */}
                <rect x="100" y="150" width="80" height="40" fill="#3b82f6" rx="5" />
                <text x="140" y="175" textAnchor="middle" fill="white" fontSize="12">Router A</text>
                <rect x="250" y="150" width="80" height="40" fill="#3b82f6" rx="5" />
                <text x="290" y="175" textAnchor="middle" fill="white" fontSize="12">Router B</text>
                <rect x="400" y="150" width="80" height="40" fill="#3b82f6" rx="5" />
                <text x="440" y="175" textAnchor="middle" fill="white" fontSize="12">Router C</text>

                {/* Path animation */}
                <circle cx="140" cy="170" r="4" fill="#ffaa44">
                  <animate attributeName="cx" values="140;290;440" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="275" y="210" textAnchor="middle" fill="#ffaa44" fontSize="12">Packet hops between routers</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Each router examines the destination IP and forwards the packet to the next hop based on its routing table.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use `traceroute` (or `tracert` on Windows)</span> to see the path packets take through routers — excellent for troubleshooting latency or routing loops.</li>
              <li><span className="font-bold">Understand subnetting</span> to design efficient IP addressing schemes. Use CIDR notation (e.g., 192.168.1.0/24).</li>
              <li><span className="font-bold">Check routing tables</span> with `route print` (Windows) or `ip route show` (Linux) to debug connectivity issues.</li>
              <li><span className="font-bold">In large networks, use dynamic routing protocols</span> like OSPF for internal routing and BGP for internet routing.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing IP addresses with MAC addresses.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> IP addresses are logical, changeable, and used for end-to-end communication across networks; MAC addresses are physical, fixed, and used for local delivery.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming a router will forward packets without a correct default gateway.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Each device must have a default gateway (router IP) to reach outside its own network.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "IPv6 is just a larger address space."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> IPv6 also improves autoconfiguration, security, and eliminates NAT, simplifying network architecture.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Use <span className="font-bold">private IP ranges</span> (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) for internal networks and NAT for internet access.</li>
              <li><span className="font-bold">Document your IP addressing scheme</span> — subnet allocation, VLANs, and static routes.</li>
              <li>Implement <span className="font-bold">route summarization</span> to reduce routing table size in large networks.</li>
              <li>Use <span className="font-bold">IPv6 dual-stack</span> to support both IPv4 and IPv6 during migration.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Network layer = end-to-end delivery across networks</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> IP addressing (IPv4/IPv6) = logical, hierarchical</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Routers forward packets based on IP destinations</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Routing tables: static or dynamic</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Traceroute shows packet path</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> IPv6 solves address exhaustion</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Stress the difference between routing and switching: switches forward within a network, routers between networks. Use the analogy of a campus: switches connect buildings (within campus), routers connect campuses (cities). Show `tracert` live to a popular website — students see real routers. Introduce subnetting gradually; it's essential for IP planning."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you run `tracert google.com`, the first hop is usually your home router (default gateway). That router knows how to reach the internet. Notice the increasing RTTs — each hop adds delay.</p>
            <p className="mt-2 text-sm">Try this: On a Linux/Mac, run `traceroute -n 8.8.8.8` to see only IP addresses. Which routers belong to your ISP? Which to Google?</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the primary responsibility of the network layer?</p><p>Logical addressing and routing packets across different networks.</p></div>
              <div><p className="font-bold">2. What is an IP address?</p><p>A 32-bit (IPv4) or 128-bit (IPv6) logical address that uniquely identifies a device on a network.</p></div>
              <div><p className="font-bold">3. How many bits are in an IPv4 address? IPv6?</p><p>IPv4: 32 bits; IPv6: 128 bits.</p></div>
              <div><p className="font-bold">4. What is a router?</p><p>A device that forwards packets between different networks based on IP addresses and routing tables.</p></div>
              <div><p className="font-bold">5. What is the difference between static and dynamic routing?</p><p>Static routes are manually configured; dynamic routes are learned via routing protocols (RIP, OSPF, BGP).</p></div>
              <div><p className="font-bold">6. What is a routing table?</p><p>A table stored in a router that lists known networks and the next-hop router or exit interface to reach them.</p></div>
              <div><p className="font-bold">7. What is the purpose of TTL (Time to Live) in an IP packet?</p><p>Prevents packets from looping forever; each router decrements TTL, and when it reaches 0, the packet is discarded.</p></div>
              <div><p className="font-bold">8. What is a subnet mask?</p><p>Used to divide an IP address into network and host portions (e.g., /24 = 255.255.255.0).</p></div>
              <div><p className="font-bold">9. What is NAT?</p><p>Network Address Translation – allows multiple devices on a private network to share a single public IP.</p></div>
              <div><p className="font-bold">10. How does `traceroute` work?</p><p>Sends packets with increasing TTL values; each router that decrements TTL to 0 returns an ICMP time-exceeded message, revealing the path.</p></div>
              <div><p className="font-bold">11. What is the difference between a router and a switch?</p><p>Router forwards based on IP addresses (Layer 3); switch forwards based on MAC addresses (Layer 2).</p></div>
              <div><p className="font-bold">12. What is the default gateway?</p><p>The router IP that a host uses to send packets to destinations outside its own network.</p></div>
              <div><p className="font-bold">13. Why is IPv6 needed?</p><p>IPv4 address exhaustion; IPv6 provides a vastly larger address space and improved features.</p></div>
              <div><p className="font-bold">14. What is a routing protocol?</p><p>A protocol routers use to exchange routing information (e.g., OSPF, BGP).</p></div>
              <div><p className="font-bold">15. What is the role of ICMP in the network layer?</p><p>Internet Control Message Protocol is used for error reporting and diagnostics (e.g., ping, traceroute).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic6;