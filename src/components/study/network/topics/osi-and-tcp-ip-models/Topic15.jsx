import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic15: Network Access Layer – hardware-level communication
 * 
 * Purpose: Explain the lowest layer of the TCP/IP model, which combines physical
 *          and data link layer functions. Focus on hardware-level communication,
 *          framing, MAC addressing, and error detection.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Builds on the TCP/IP model by diving into the layer that interacts
 *              directly with network hardware, essential for understanding local
 *              network communication.
 */

const Topic15 = () => {
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
              Network Access Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Hardware-level communication — combining physical and data link layers for local network delivery
            </p>
          </section>

          {/* Real-World Analogy: The Local Courier */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🚚 Real-World Analogy: The Local Courier
            </h2>
            <p>
              Imagine <strong>Swadeep</strong> in <strong>Barrackpore</strong> sends a package to <strong>Tuhina</strong> in the same neighborhood. The <strong>Network Access Layer</strong> is like the local courier service that:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Puts the package in a <strong>frame</strong> (envelope) with the recipient's street address (MAC address).</li>
              <li>Adds a <strong>tracking barcode</strong> (CRC) to detect damage.</li>
              <li>Uses a <strong>delivery van</strong> (physical medium) to transport the package.</li>
              <li>Ensures the package is delivered only to the correct <strong>door</strong> (switch port) on the same street (local network).</li>
            </ul>
            <p>
              The Network Access Layer handles everything needed to move data from one device to another on the same network segment.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why does the local courier need to know the street address (MAC) but not the city (IP)? Because it only delivers within the same neighborhood.
            </div>
          </section>

          {/* What is Network Access Layer */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              🖧 The Network Access Layer: Bridging Hardware and Software
            </h2>
            <p>
              The Network Access Layer is the lowest layer of the TCP/IP model. It combines the functionality of the OSI <strong>Physical Layer</strong> and <strong>Data Link Layer</strong>. Its job is to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><span className="font-bold">Accept IP packets</span> from the Internet layer and encapsulate them into frames.</li>
              <li><span className="font-bold">Add hardware (MAC) addresses</span> for local delivery.</li>
              <li><span className="font-bold">Detect transmission errors</span> using CRC.</li>
              <li><span className="font-bold">Convert frames into bits</span> and transmit them over the physical medium (copper, fiber, wireless).</li>
            </ul>
            <p className="mt-2">
              This layer is implemented by network interface cards (NICs), switches, hubs, and the physical cabling or radio waves.
            </p>
          </section>

          {/* Functions: Framing, MAC, Error Detection, Media Access */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔧 Core Functions of Network Access Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">📦 Framing</h3>
                <p>Organizes bits into frames with a defined structure. Adds header (source/destination MAC, EtherType) and trailer (CRC).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">🏷️ MAC Addressing</h3>
                <p>Uses 48-bit Media Access Control addresses (e.g., 00:1A:2B:3C:4D:5E) to uniquely identify devices on the same network.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">✅ Error Detection</h3>
                <p>Adds a CRC (Cyclic Redundancy Check) at the end of the frame. Receiver recalculates and discards corrupted frames.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">🔁 Media Access Control</h3>
                <p>Determines when a device can transmit on a shared medium (e.g., CSMA/CD for Ethernet, CSMA/CA for Wi-Fi).</p>
              </div>
            </div>
          </section>

          {/* Technologies: Ethernet, Wi-Fi, etc. */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🌐 Common Technologies at Network Access Layer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center hover:scale-105 transition-transform">
                <span className="text-3xl">🔌</span>
                <h3 className="font-bold">Ethernet</h3>
                <p className="text-sm">Most common wired LAN technology. Uses CSMA/CD, frames with MAC addresses, and RJ45 connectors.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center hover:scale-105 transition-transform">
                <span className="text-3xl">📡</span>
                <h3 className="font-bold">Wi-Fi (802.11)</h3>
                <p className="text-sm">Wireless LAN technology. Uses CSMA/CA, radio waves, and MAC addresses.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center hover:scale-105 transition-transform">
                <span className="text-3xl">💡</span>
                <h3 className="font-bold">Fiber Optics</h3>
                <p className="text-sm">High-speed, long-distance physical medium. Used in backbone networks.</p>
              </div>
            </div>
          </section>

          {/* Devices: Switches, Hubs, NICs, Repeaters */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              🖥️ Devices Operating at Network Access Layer
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Network Interface Card (NIC):</span> Converts data to/from signals, handles MAC addressing, and provides a physical connection.</li>
              <li><span className="font-bold">Switch:</span> Forwards frames based on MAC address table. Creates separate collision domains.</li>
              <li><span className="font-bold">Hub:</span> Simple repeater that broadcasts frames to all ports (obsolete).</li>
              <li><span className="font-bold">Repeater:</span> Regenerates signals to extend cable length.</li>
              <li><span className="font-bold">Access Point (AP):</span> Bridges wireless and wired networks at the Network Access layer.</li>
            </ul>
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              💡 <span className="font-bold">Note:</span> Switches are intelligent: they learn which MAC addresses are on which ports, unlike hubs that just repeat.
            </div>
          </section>

          {/* SVG Illustration: Frame Structure & Switching */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              🎨 Visual: Ethernet Frame & Switching
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="220" viewBox="0 0 550 220" className="max-w-full h-auto">
                <rect x="50" y="20" width="450" height="45" fill="none" stroke="gray" strokeWidth="1" />
                <text x="60" y="45" fill="currentColor" fontSize="9">Preamble</text>
                <text x="120" y="45" fill="currentColor" fontSize="9">Dest MAC</text>
                <text x="180" y="45" fill="currentColor" fontSize="9">Src MAC</text>
                <text x="240" y="45" fill="currentColor" fontSize="9">EtherType</text>
                <text x="300" y="45" fill="currentColor" fontSize="9">Payload (IP packet)</text>
                <text x="450" y="45" fill="currentColor" fontSize="9">CRC</text>

                <rect x="100" y="90" width="80" height="40" fill="#10b981" rx="4" />
                <text x="140" y="115" textAnchor="middle" fill="white" fontSize="10">Switch</text>
                <circle cx="120" cy="140" r="5" fill="#3b82f6" />
                <text x="120" y="155" textAnchor="middle" fill="currentColor" fontSize="8">Port1</text>
                <circle cx="160" cy="140" r="5" fill="#3b82f6" />
                <text x="160" y="155" textAnchor="middle" fill="currentColor" fontSize="8">Port2</text>
                <rect x="40" y="170" width="60" height="30" fill="#ef4444" rx="3" />
                <text x="70" y="190" textAnchor="middle" fill="white" fontSize="8">PC A</text>
                <text x="70" y="200" fill="white" fontSize="7">MAC: AA</text>
                <rect x="180" y="170" width="60" height="30" fill="#ef4444" rx="3" />
                <text x="210" y="190" textAnchor="middle" fill="white" fontSize="8">PC B</text>
                <text x="210" y="200" fill="white" fontSize="7">MAC: BB</text>
                <line x1="70" y1="170" x2="120" y2="140" stroke="gray" strokeWidth="1" />
                <line x1="210" y1="170" x2="160" y2="140" stroke="gray" strokeWidth="1" />
                <path d="M70 190 L 100 190 L 100 115 L 120 115" stroke="#ffaa44" fill="none" strokeWidth="2">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="90" y="110" fill="#ffaa44" fontSize="8">Frame to BB</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The switch forwards frames based on destination MAC address, not IP address.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Check link lights</span> on NICs and switches — if they're off, the physical connection is broken.</li>
              <li><span className="font-bold">Use `arp -a`</span> (Windows) or `arp -n` (Linux) to see the MAC-IP mapping table on your device.</li>
              <li><span className="font-bold">Switch MAC tables</span> can be viewed with `show mac address-table` on Cisco switches; it's useful for troubleshooting.</li>
              <li><span className="font-bold">For Wi-Fi, use a spectrum analyzer</span> to detect interference in the 2.4 GHz or 5 GHz bands.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking a switch forwards based on IP addresses.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Switches use MAC addresses (Layer 2). Routers use IP addresses (Layer 3).
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Using a hub in a modern network expecting good performance.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Hubs create a single collision domain; switches are far more efficient.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Wi-Fi doesn't have MAC addresses."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Wi-Fi uses MAC addresses just like Ethernet for local delivery.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use structured cabling</span> (TIA/EIA-568) for Ethernet to avoid crosstalk and ensure reliability.</li>
              <li><span className="font-bold">Implement port security</span> on switches to limit the number of MAC addresses per port and prevent MAC flooding attacks.</li>
              <li><span className="font-bold">For Wi-Fi, use WPA3 encryption</span> to protect wireless frames from eavesdropping.</li>
              <li><span className="font-bold">Label cables and document switch port connections</span> — this saves hours of troubleshooting.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Combines OSI Physical + Data Link</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Uses MAC addresses (hardware addresses)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Framing: adds headers and trailers</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> CRC for error detection</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Devices: switches, NICs, hubs, repeaters</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Technologies: Ethernet, Wi-Fi, fiber</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <Teacher 
              note={"Emphasize that the Network Access Layer is where theory meets hardware. Show students a real Ethernet cable, a switch, and a NIC. Use commands like `arp -a` to show MAC addresses. Explain that understanding this layer is crucial for troubleshooting connectivity issues: if pings fail but the switch port has link, the problem might be IP-related, but if there's no link light, the issue is physical."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">When you connect two computers directly with an Ethernet cable (modern ones auto-sense), they can communicate without any IP configuration? Actually, they still use MAC addresses to send frames. That's the Network Access layer working independently of IP.</p>
            <p className="mt-2 text-sm">Try this: Run `arp -a` on your computer. You'll see a list of IP addresses and their associated MAC addresses on your local network. Those mappings are learned via ARP (which operates at the Internet layer but uses the Network Access layer to send broadcast frames).</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What layers of the OSI model are combined in the TCP/IP Network Access layer?</p><p>Physical and Data Link layers.</p></div>
              <div><p className="font-bold">2. What is the purpose of the Network Access layer?</p><p>To handle hardware-level communication, including framing, MAC addressing, error detection, and physical transmission.</p></div>
              <div><p className="font-bold">3. What is a MAC address?</p><p>A 48-bit hardware address burned into a network interface card, used for local delivery.</p></div>
              <div><p className="font-bold">4. What is the difference between a switch and a hub?</p><p>A switch forwards frames based on MAC addresses; a hub repeats signals to all ports (creates a single collision domain).</p></div>
              <div><p className="font-bold">5. What is the role of CRC in a frame?</p><p>Cyclic Redundancy Check detects errors that may have occurred during transmission.</p></div>
              <div><p className="font-bold">6. Name two common technologies at the Network Access layer.</p><p>Ethernet and Wi-Fi (802.11).</p></div>
              <div><p className="font-bold">7. What is a network interface card (NIC)?</p><p>A hardware component that connects a computer to a network, providing MAC address and physical interface.</p></div>
              <div><p className="font-bold">8. How does a switch learn which MAC address is on which port?</p><p>By examining the source MAC address of incoming frames and storing it in a MAC address table.</p></div>
              <div><p className="font-bold">9. What is the maximum length of an Ethernet cable (twisted pair)?</p><p>100 meters (328 feet) for most standards.</p></div>
              <div><p className="font-bold">10. What does CSMA/CD stand for and where is it used?</p><p>Carrier Sense Multiple Access with Collision Detection — used in traditional Ethernet to manage access to a shared medium.</p></div>
              <div><p className="font-bold">11. What is the difference between unicast, broadcast, and multicast frames?</p><p>Unicast: one specific destination; broadcast: all devices on the network; multicast: group of devices.</p></div>
              <div><p className="font-bold">12. What does the EtherType field in an Ethernet frame indicate?</p><p>The protocol encapsulated in the frame (e.g., IPv4, IPv6, ARP).</p></div>
              <div><p className="font-bold">13. Why is fiber optic cable often used for backbone networks?</p><p>Because it supports very high bandwidth over long distances and is immune to electromagnetic interference.</p></div>
              <div><p className="font-bold">14. What is the command to view the ARP cache on Windows?</p><p>`arp -a`.</p></div>
              <div><p className="font-bold">15. What happens if a switch receives a frame with a destination MAC address not in its table?</p><p>It floods the frame out all ports except the source port (unknown unicast).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic15;