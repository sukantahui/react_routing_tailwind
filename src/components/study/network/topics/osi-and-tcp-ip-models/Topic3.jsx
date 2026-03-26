import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic3: Detailed Study of OSI 7 Layers
 * 
 * Purpose: Provide an in-depth exploration of each of the seven layers,
 *          their functions, responsibilities, and real-world examples.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: Used to solidify understanding of the OSI model after the overview,
 *              building the foundation for later topics that dive deeper into each layer.
 */

const Topic3 = () => {
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

  // Data for each layer
  const layers = [
    {
      number: 7,
      name: "Application Layer",
      description: "Provides network services directly to end-user applications. It is the layer where users interact with the network.",
      functions: ["Service identification", "User authentication", "Data formatting for user"],
      protocols: ["HTTP/HTTPS", "FTP", "SMTP", "DNS", "SSH"],
      devices: ["Gateways", "Firewalls (application-layer)", "Proxy servers"],
      example: "When Swadeep opens a browser and types 'google.com', the browser uses HTTP to request the webpage."
    },
    {
      number: 6,
      name: "Presentation Layer",
      description: "Translates data between the application format and the network format. Handles data encryption, compression, and translation.",
      functions: ["Data encryption/decryption", "Data compression", "Character code conversion (ASCII to EBCDIC)"],
      protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII"],
      devices: ["Gateways", "Load balancers (with SSL termination)"],
      example: "A video stream is compressed (MPEG) before transmission, then decompressed at the receiving end."
    },
    {
      number: 5,
      name: "Session Layer",
      description: "Manages sessions (connections) between applications. Establishes, maintains, and terminates communication sessions.",
      functions: ["Session establishment", "Synchronization (checkpoints)", "Dialog control (who transmits when)"],
      protocols: ["NetBIOS", "RPC", "SMB", "PPTP"],
      devices: ["Gateways", "Firewalls (session-aware)"],
      example: "When Tuhina starts a video call, the session layer sets up the call and inserts checkpoints so that if the call drops, it can resume without restarting."
    },
    {
      number: 4,
      name: "Transport Layer",
      description: "Provides reliable or unreliable end-to-end delivery of data. Handles segmentation, flow control, and error recovery.",
      functions: ["Segmentation", "Flow control", "Error control (retransmission)", "Multiplexing"],
      protocols: ["TCP", "UDP", "SCTP"],
      devices: ["Gateways", "Firewalls (port filtering)"],
      example: "Debangshu downloads a large file; TCP ensures all packets arrive in order, retransmitting any that are lost."
    },
    {
      number: 3,
      name: "Network Layer",
      description: "Responsible for logical addressing and routing packets across multiple networks.",
      functions: ["Logical addressing (IP)", "Routing", "Packet forwarding", "Fragmentation"],
      protocols: ["IPv4", "IPv6", "ICMP", "ARP", "RIP", "OSPF"],
      devices: ["Routers", "Layer 3 switches"],
      example: "A packet from Barrackpore to Shyamnagar may travel through several routers; the network layer chooses the best path."
    },
    {
      number: 2,
      name: "Data Link Layer",
      description: "Provides node-to-node reliable data transfer over the physical medium. Handles framing, MAC addressing, and error detection.",
      functions: ["Framing", "MAC addressing", "Error detection (CRC)", "Flow control"],
      protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "HDLC"],
      devices: ["Switches", "Bridges", "Network Interface Cards (NICs)"],
      example: "When a switch receives a frame, it checks the destination MAC address and forwards it only to the appropriate port."
    },
    {
      number: 1,
      name: "Physical Layer",
      description: "Defines the physical characteristics of the transmission medium. Handles bits, voltages, timing, and connectors.",
      functions: ["Bit encoding", "Transmission medium (cable, wireless)", "Voltage levels", "Connector types"],
      protocols: ["Ethernet (physical part)", "USB", "Bluetooth PHY", "DSL"],
      devices: ["Hubs", "Repeaters", "Cables", "NICs (physical part)"],
      example: "Abhronila plugs an Ethernet cable into her laptop; the physical layer defines the RJ45 connector, the pinout, and the electrical signals."
    }
  ];

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans leading-relaxed">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Hero Section */}
          <section className="text-center space-y-4 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Detailed Study of OSI 7 Layers
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A deep dive into each layer: functions, protocols, devices, and real-world examples
            </p>
          </section>

          {/* Real-World Analogy: Building a House */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              🏗️ Real-World Analogy: Building a House
            </h2>
            <p>
              Think of building a house in <strong>Naihati</strong>. Each layer of the OSI model corresponds to a specialized team:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Application Layer:</span> The architect who designs the rooms (user experience).</li>
              <li><span className="font-bold">Presentation Layer:</span> The interior designer who decides colors and finishes (data translation).</li>
              <li><span className="font-bold">Session Layer:</span> The project manager who schedules meetings and keeps communication flowing.</li>
              <li><span className="font-bold">Transport Layer:</span> The logistics team that ensures materials arrive reliably (or quickly).</li>
              <li><span className="font-bold">Network Layer:</span> The road network that directs trucks to the right street (routing).</li>
              <li><span className="font-bold">Data Link Layer:</span> The individual trucks that carry materials from one location to the next.</li>
              <li><span className="font-bold">Physical Layer:</span> The actual asphalt roads and cables (physical medium).</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> How would building a house be different if one team tried to do everything? Layers make complex tasks manageable.
            </div>
          </section>

          {/* Detailed Layer Cards (Repeating for each layer) */}
          {layers.map((layer, idx) => (
            <section
              key={layer.number}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${150 + idx * 100}ms` }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
                Layer {layer.number}: {layer.name}
              </h2>
              <p className="mb-4">{layer.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">📋 Functions</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.functions.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">📡 Protocols</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.protocols.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">🖥️ Devices</p>
                  <ul className="list-disc list-inside text-sm">
                    {layer.devices.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                  <p className="font-bold">💡 Real Example</p>
                  <p className="text-sm">{layer.example}</p>
                </div>
              </div>
            </section>
          ))}

          {/* SVG Illustration: OSI Model with Animated Data Flow */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: OSI Model with Animated Data Flow
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="550" height="550" viewBox="0 0 550 550" className="max-w-full h-auto">
                <defs>
                  <linearGradient id="gradLayerVert" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>

                {/* Layer boxes from top to bottom */}
                {layers.map((layer, i) => {
                  const y = 20 + i * 65;
                  return (
                    <g key={layer.number}>
                      <rect x="100" y={y} width="350" height="55" rx="6" fill="url(#gradLayerVert)" className="transition-all duration-300 hover:opacity-90" />
                      <text x="275" y={y + 32} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        Layer {layer.number}: {layer.name}
                      </text>
                      {/* Animated dot moving down the layer stack */}
                      {i === 0 && (
                        <circle cx="275" cy={y + 28} r="4" fill="#ffaa44">
                          <animate attributeName="cy" values={`${y + 28};${y + 28 + 65 * (layers.length - 1)}`} dur="4s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
                <text x="420" y="250" fill="#ffaa44" fontSize="12">Data flow direction</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              On the sending side, data moves down the layers (adding headers). On the receiving side, it moves up (removing headers).
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use mnemonics:</span> "All People Seem To Need Data Processing" (Application, Presentation, Session, Transport, Network, Data Link, Physical) from top-down.</li>
              <li><span className="font-bold">When troubleshooting:</span> Start at physical layer and work up. Check cables first, then link lights, then IP configuration, etc.</li>
              <li><span className="font-bold">Remember that protocols often span multiple layers:</span> For example, Ethernet covers both physical and data link layers.</li>
              <li><span className="font-bold">Layer boundaries are logical:</span> Some devices operate at multiple layers (e.g., a router works at network layer and below).</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Confusing the role of adjacent layers (e.g., thinking routing happens at data link layer).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> Routing is network layer; data link handles local delivery.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Assuming every protocol fits neatly into one layer.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Some protocols (e.g., ARP) are often placed between layers.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Layer 2 switches cannot have IP addresses."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Managed switches often have an IP for management, but they still operate at layer 2 for forwarding data.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices for Learning
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Create a visual cheat sheet</span> with layers, functions, and example protocols.</li>
              <li><span className="font-bold">Use Wireshark to capture packets</span> and identify which headers belong to which layer.</li>
              <li><span className="font-bold">Practice explaining layers to someone else</span> using the house-building analogy.</li>
              <li><span className="font-bold">Map everyday tasks to layers:</span> When you send a WhatsApp message, which layers are involved?</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 1: Physical – bits, cables</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 2: Data Link – frames, MAC</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 3: Network – packets, IP, routing</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 4: Transport – segments, TCP/UDP</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 5: Session – session management</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 6: Presentation – translation, encryption</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Layer 7: Application – user services</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Mnemonic: All People Seem To Need Data Processing</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1400ms]">
            <Teacher 
              note={"Focus on the function of each layer, not just memorization. Use real-world examples like video streaming (session), encryption (presentation), and web browsing (application). Encourage students to draw the stack from memory. Remind them that later topics will dive deeper into each layer."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1500ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Notice that the data link layer uses MAC addresses (hardware) while network layer uses IP addresses (logical). Why do we need both? Think about how letters need both a street address (logical) and a specific mailbox (physical).</p>
            <p className="mt-2 text-sm">Try this: When you use a Wi-Fi connection at a café, which layer is responsible for the radio signals? Which layer encrypts your data? Which layer ensures the web page loads reliably?</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the main function of the Physical layer?</p><p>Defines physical characteristics: cables, voltages, bit rates, connectors.</p></div>
              <div><p className="font-bold">2. Which layer uses MAC addresses?</p><p>Data Link Layer (Layer 2).</p></div>
              <div><p className="font-bold">3. What is the difference between a switch and a router in terms of OSI layers?</p><p>Switches operate at Layer 2 (Data Link), routers operate at Layer 3 (Network).</p></div>
              <div><p className="font-bold">4. Name two protocols at the Transport layer.</p><p>TCP and UDP.</p></div>
              <div><p className="font-bold">5. What does the Presentation layer do with data?</p><p>Translates, encrypts, and compresses data.</p></div>
              <div><p className="font-bold">6. Which layer is responsible for session checkpoints?</p><p>Session Layer (Layer 5).</p></div>
              <div><p className="font-bold">7. Give an example of an Application layer protocol.</p><p>HTTP, FTP, SMTP, DNS.</p></div>
              <div><p className="font-bold">8. What is a common device at the Physical layer?</p><p>Hub, repeater, cable.</p></div>
              <div><p className="font-bold">9. What does the Data Link layer add to a packet?</p><p>Frame header and trailer (including MAC addresses and CRC).</p></div>
              <div><p className="font-bold">10. Which layer provides end-to-end reliability?</p><p>Transport Layer (Layer 4).</p></div>
              <div><p className="font-bold">11. What is the unit of data at the Network layer?</p><p>Packet.</p></div>
              <div><p className="font-bold">12. Which layer is responsible for routing?</p><p>Network Layer (Layer 3).</p></div>
              <div><p className="font-bold">13. Why is the Presentation layer sometimes called the 'syntax layer'?</p><p>Because it deals with the syntax of data (how it is represented).</p></div>
              <div><p className="font-bold">14. What is a common mnemonic for the layers from top down?</p><p>"All People Seem To Need Data Processing" (Application, Presentation, Session, Transport, Network, Data Link, Physical).</p></div>
              <div><p className="font-bold">15. Which layer does a gateway typically operate at?</p><p>Gateways can operate at multiple layers, but often at the Application layer (Layer 7).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic3;