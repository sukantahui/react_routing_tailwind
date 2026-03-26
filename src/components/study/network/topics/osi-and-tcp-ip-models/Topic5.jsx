import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic5: Data Link Layer – framing, MAC addressing, error detection, switches
 * 
 * Purpose: Explain the data link layer's role in reliable node-to-node communication,
 *          framing, MAC addresses, error detection, and switches.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on physical layer knowledge, showing how raw bits are organized into frames
 *              and delivered locally using MAC addresses.
 */

const Topic5 = () => {
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
              Data Link Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Layer 2: Framing, MAC addressing, error detection, and switches — organizing bits into reliable local delivery
            </p>
          </section>

          {/* Real-World Analogy: Local Postal Service */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏠 Real-World Analogy: Local Postal Service
            </h2>
            <p>
              Think of <strong>Swadeep</strong> in <strong>Barrackpore</strong> sending a letter to <strong>Tuhina</strong> in the same neighborhood. The local post office handles the delivery within the same area. It:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Frames</span> the letter in an envelope (adds header/trailer).</li>
              <li>Uses the <span className="font-bold">MAC address</span> (like house address) to identify the exact house.</li>
              <li><span className="font-bold">Checks for errors</span> (e.g., damaged envelope) and may ask for resending.</li>
              <li>Uses a <span className="font-bold">switch</span> (like a local sorting center) to forward letters only to the correct street.</li>
            </ul>
            <p className="mt-2">
              This is exactly what the data link layer does: it takes packets from the network layer, encapsulates them into frames, and delivers them to the next-hop device on the same network.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> If the local post office didn't have addresses (MAC addresses) or didn't check for damaged envelopes (error detection), how would letters be delivered reliably?
            </div>
          </section>

          {/* Core Concepts: Framing, MAC Addressing, Error Detection */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🔑 Key Functions of Data Link Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-bold text-lg">Framing</h3>
                <p className="text-sm">Organizes raw bits into frames by adding header and trailer. Frames contain source/destination MAC addresses, data, and error-checking code.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">🏷️</div>
                <h3 className="font-bold text-lg">MAC Addressing</h3>
                <p className="text-sm">Media Access Control addresses are 48-bit hardware addresses (e.g., 00:1A:2B:3C:4D:5E) unique to each network interface.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="font-bold text-lg">Error Detection</h3>
                <p className="text-sm">Uses CRC (Cyclic Redundancy Check) or checksum to detect bit errors in frames. Discards corrupted frames (some layers may request retransmission).</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <span className="font-bold">🔗 Flow Control:</span> Prevents a fast sender from overwhelming a slow receiver (e.g., using pause frames in Ethernet).
            </div>
          </section>

          {/* Frame Structure */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              📝 Frame Structure (Ethernet Example)
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`| Preamble | Dest MAC | Src MAC | EtherType | Payload (Data) | CRC |
   8 bytes    6 bytes    6 bytes    2 bytes    46-1500 bytes    4 bytes`}
              </pre>
            </div>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li><span className="font-bold">Preamble:</span> Synchronizes receiver clock.</li>
              <li><span className="font-bold">MAC Addresses:</span> Physical addresses of source and destination (unicast, multicast, broadcast).</li>
              <li><span className="font-bold">EtherType:</span> Indicates upper-layer protocol (e.g., IPv4 = 0x0800).</li>
              <li><span className="font-bold">CRC:</span> Cyclic Redundancy Check detects errors.</li>
            </ul>
          </section>

          {/* Switches and Their Operation */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🔀 Switches: Intelligent Forwarding at Layer 2
            </h2>
            <p>
              A switch learns MAC addresses by observing frames. It builds a MAC address table (CAM table) mapping MAC addresses to ports. When a frame arrives:
            </p>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Switch looks up destination MAC in its table.</li>
              <li>If found, forwards only to that port (unicast).</li>
              <li>If not found (unknown unicast), floods to all ports except the source.</li>
              <li>Broadcast and multicast frames are flooded to all ports (except source).</li>
            </ol>
            <p className="mt-3">
              This is vastly more efficient than hubs, which simply repeat signals to all ports. <strong>Switches create separate collision domains per port</strong>, greatly improving performance.
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              💡 <span className="font-bold">Industry term:</span> Switches are "store-and-forward" or "cut-through" based on how they handle frames.
            </div>
          </section>

          {/* SVG Illustration: MAC Addressing & Switch Forwarding */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🎨 Visual: MAC Address Table & Switching
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="250" viewBox="0 0 550 250" className="max-w-full h-auto">
                <rect x="200" y="60" width="150" height="100" fill="none" stroke="gray" strokeWidth="2" />
                <text x="275" y="85" textAnchor="middle" fill="currentColor" fontSize="12">Switch</text>
                {/* Ports */}
                <circle cx="240" cy="110" r="8" fill="#3b82f6" />
                <text x="240" y="105" textAnchor="middle" fill="white" fontSize="10">1</text>
                <circle cx="310" cy="110" r="8" fill="#3b82f6" />
                <text x="310" y="105" textAnchor="middle" fill="white" fontSize="10">2</text>
                {/* Devices */}
                <rect x="150" y="170" width="60" height="40" rx="4" fill="#10b981" />
                <text x="180" y="195" textAnchor="middle" fill="white" fontSize="10">PC A</text>
                <text x="180" y="210" textAnchor="middle" fill="white" fontSize="8">MAC: AA</text>
                <rect x="340" y="170" width="60" height="40" rx="4" fill="#10b981" />
                <text x="370" y="195" textAnchor="middle" fill="white" fontSize="10">PC B</text>
                <text x="370" y="210" textAnchor="middle" fill="white" fontSize="8">MAC: BB</text>
                <line x1="180" y1="170" x2="240" y2="118" stroke="gray" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="370" y1="170" x2="310" y2="118" stroke="gray" strokeWidth="1" strokeDasharray="4 2" />
                <text x="275" y="30" textAnchor="middle" fill="currentColor" fontSize="12">MAC Address Table</text>
                <rect x="225" y="35" width="100" height="40" fill="none" stroke="gray" strokeWidth="1" />
                <text x="235" y="55" fill="currentColor" fontSize="10">AA → Port 1</text>
                <text x="235" y="70" fill="currentColor" fontSize="10">BB → Port 2</text>
                <path d="M 180 190 L 220 190 L 220 110 L 240 110" stroke="#ffaa44" fill="none" strokeWidth="2">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="200" y="150" fill="#ffaa44" fontSize="10">Frame for BB</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              Switch forwards frames only to the port where the destination MAC resides, based on its learned table.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Check MAC address tables</span> on switches using `show mac address-table` (Cisco) to troubleshoot connectivity.</li>
              <li><span className="font-bold">Use Wireshark to capture Ethernet frames</span> — you'll see MAC addresses, EtherType, and CRC errors.</li>
              <li><span className="font-bold">Remember MAC addresses are hardware unique</span>, but they can be spoofed; security uses 802.1X to authenticate.</li>
              <li><span className="font-bold">VLANs (Virtual LANs)</span> extend the data link layer by creating separate broadcast domains.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing MAC addresses with IP addresses.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> MAC addresses are physical, for local delivery; IP addresses are logical, for end-to-end routing.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking switches replace routers.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Switches connect devices in the same network; routers connect different networks.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "CRC checks guarantee error-free delivery."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> CRC detects errors but doesn't correct them; higher layers (e.g., TCP) may retransmit.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Document MAC addresses</span> for critical devices to simplify troubleshooting.</li>
              <li><span className="font-bold">Use managed switches</span> to monitor port status, MAC tables, and errors.</li>
              <li><span className="font-bold">Implement port security</span> to limit the number of MAC addresses per port and prevent MAC flooding attacks.</li>
              <li><span className="font-bold">Separate networks with VLANs</span> to improve security and reduce broadcast traffic.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Data Link = Node-to-node delivery</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Framing: headers + trailers</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> MAC addresses: 48-bit hardware addresses</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Error detection: CRC, checksum</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Switches: forward based on MAC table</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Switches create separate collision domains</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"Emphasize that data link layer is the bridge between hardware (physical) and logical (network). Use live demo: show students the MAC address of their device (ipconfig /all or ifconfig). Show them an actual switch and explain how it learns addresses. Mention that understanding MAC addressing is crucial for later topics like ARP."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you ping another device on the same network, the source device sends an ARP request to find its MAC address. That ARP request is a broadcast frame sent to all devices on the network. The switch forwards it out all ports (except source) because the destination MAC is broadcast.</p>
            <p className="mt-2 text-sm">Try this: Use Wireshark to capture traffic. Look for Ethernet frames: note the source/destination MACs and the EtherType. Can you identify which frames are unicast, multicast, or broadcast?</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the primary responsibility of the data link layer?</p><p>Node-to-node delivery of frames across a physical link.</p></div>
              <div><p className="font-bold">2. What is a MAC address?</p><p>A 48-bit hardware address burned into network interface cards, used for local delivery.</p></div>
              <div><p className="font-bold">3. How does a switch forward frames?</p><p>It builds a MAC address table and forwards frames only to the port associated with the destination MAC.</p></div>
              <div><p className="font-bold">4. What is the difference between a hub and a switch?</p><p>Hub repeats signals to all ports; switch intelligently forwards frames based on MAC addresses.</p></div>
              <div><p className="font-bold">5. What is CRC used for?</p><p>Cyclic Redundancy Check detects errors in the frame.</p></div>
              <div><p className="font-bold">6. Name the fields in an Ethernet frame.</p><p>Preamble, Destination MAC, Source MAC, EtherType, Payload, CRC.</p></div>
              <div><p className="font-bold">7. What is a broadcast MAC address?</p><p>FF:FF:FF:FF:FF:FF – used to send frames to all devices on the network.</p></div>
              <div><p className="font-bold">8. How does a switch learn MAC addresses?</p><p>By reading the source MAC address of incoming frames and associating it with the incoming port.</p></div>
              <div><p className="font-bold">9. What is a collision domain?</p><p>A network segment where simultaneous transmissions cause collisions. Switches isolate collision domains per port.</p></div>
              <div><p className="font-bold">10. Can two devices have the same MAC address?</p><p>No, MAC addresses are globally unique (though they can be spoofed).</p></div>
              <div><p className="font-bold">11. What does the EtherType field indicate?</p><p>The protocol encapsulated in the frame (e.g., IPv4, IPv6, ARP).</p></div>
              <div><p className="font-bold">12. What is the purpose of the preamble?</p><p>Synchronizes the receiver's clock to the incoming frame.</p></div>
              <div><p className="font-bold">13. How does error detection work at the data link layer?</p><p>The sender computes a CRC and adds it to the frame; the receiver recalculates and compares; if mismatch, frame is discarded.</p></div>
              <div><p className="font-bold">14. What is the difference between unicast, multicast, and broadcast frames?</p><p>Unicast: one specific destination; multicast: group of devices; broadcast: all devices on the network.</p></div>
              <div><p className="font-bold">15. What device operates at the data link layer?</p><p>Switches, bridges, and network interface cards (NICs).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic5;