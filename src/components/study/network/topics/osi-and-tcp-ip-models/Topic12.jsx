import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic12: Data Units in Each Layer: Bits, Frames, Packets, Segments
 * 
 * Purpose: Explain the different names for data at each OSI layer,
 *          their characteristics, and why understanding these units is crucial.
 * 
 * Return: JSX.Element - Full educational component with theory, examples, and interactions.
 * 
 * When & Why: This is a fundamental exam concept that clarifies how data is
 *              transformed across layers, reinforcing encapsulation knowledge.
 */

const Topic12 = () => {
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
              Data Units in Each Layer
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Bits, Frames, Packets, Segments — the shape-shifting data as it travels through the OSI model
            </p>
          </section>

          {/* Real-World Analogy: Different Containers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-blue-500 pl-4 mb-4">
              📦 Real-World Analogy: Different Containers
            </h2>
            <p>
              Think of <strong>Swadeep</strong> sending a gift to <strong>Tuhina</strong>. The gift changes its "container" at each stage:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li><span className="font-bold">Application Data:</span> The gift itself (a bracelet).</li>
              <li><span className="font-bold">Segment:</span> The gift placed in a small box with tracking info (like TCP header).</li>
              <li><span className="font-bold">Packet:</span> That box inside a larger shipping box with address labels (IP header).</li>
              <li><span className="font-bold">Frame:</span> The shipping box wrapped in a courier envelope with recipient's street address (MAC header) and a barcode (CRC).</li>
              <li><span className="font-bold">Bits:</span> The final package is broken into pieces loaded onto a truck — the physical transport.</li>
            </ul>
            <p>
              The same data is called different names depending on which layer we're looking at.
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
              💡 <span className="font-medium">Think about:</span> Why do we need different names? Because each layer has a different responsibility and the data format changes.
            </div>
          </section>

          {/* Data Unit Table */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-green-500 pl-4 mb-4">
              📊 OSI Layers & Their Data Units
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border p-2 text-left">Layer</th>
                    <th className="border p-2 text-left">Data Unit Name</th>
                    <th className="border p-2 text-left">Key Characteristics</th>
                    <th className="border p-2 text-left">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Application</td><td className="border p-2 font-mono">Data / Message</td><td className="border p-2">User data; no extra headers</td><td className="border p-2">HTTP request/response</td></tr>
                  <tr><td className="border p-2">Presentation</td><td className="border p-2 font-mono">Data</td><td className="border p-2">Translated/encrypted/compressed</td><td className="border p-2">SSL/TLS records</td></tr>
                  <tr><td className="border p-2">Session</td><td className="border p-2 font-mono">Data</td><td className="border p-2">Session control info</td><td className="border p-2">NetBIOS data</td></tr>
                  <tr><td className="border p-2">Transport</td><td className="border p-2 font-mono">Segment (TCP) / Datagram (UDP)</td><td className="border p-2">Ports, sequence numbers (TCP), checksum</td><td className="border p-2">TCP segment with HTTP payload</td></tr>
                  <tr><td className="border p-2">Network</td><td className="border p-2 font-mono">Packet</td><td className="border p-2">Source/destination IP, TTL, routing info</td><td className="border p-2">IP packet containing TCP segment</td></tr>
                  <tr><td className="border p-2">Data Link</td><td className="border p-2 font-mono">Frame</td><td className="border p-2">MAC addresses, CRC trailer, framing</td><td className="border p-2">Ethernet frame containing IP packet</td></tr>
                  <tr><td className="border p-2">Physical</td><td className="border p-2 font-mono">Bits</td><td className="border p-2">0s and 1s encoded as signals</td><td className="border p-2">Electrical pulses on copper wire</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-400">
              Note: TCP uses "segment", UDP uses "datagram". Both are transport layer PDUs (Protocol Data Units).
            </p>
          </section>

          {/* Detailed Explanation of Each Unit */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[300ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-purple-500 pl-4 mb-4">
              🔍 Deep Dive: Each Data Unit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold text-blue-600">Segment (Transport)</h3>
                <p className="text-sm">Breaks application data into manageable chunks. TCP adds sequence numbers, ports, flags; UDP adds only ports and checksum. Responsible for reliability (TCP) or speed (UDP).</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold text-green-600">Packet (Network)</h3>
                <p className="text-sm">Adds IP header with logical addresses (source/dest IP), TTL, and protocol type. Enables routing across different networks. Can be fragmented if larger than MTU.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold text-yellow-600">Frame (Data Link)</h3>
                <p className="text-sm">Encapsulates packet into frame with MAC addresses, preamble, and CRC trailer. Used for node-to-node delivery on the same network.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg">
                <h3 className="font-bold text-red-600">Bits (Physical)</h3>
                <p className="text-sm">The raw binary representation transmitted over the medium. Bits are encoded into electrical, optical, or radio signals.</p>
              </div>
            </div>
          </section>

          {/* SVG Illustration: Data Units Visual */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-yellow-500 pl-4 mb-4">
              🎨 Visual: Data Units Hierarchy
            </h2>
            <div className="flex justify-center overflow-x-auto">
              <svg width="500" height="320" viewBox="0 0 500 320" className="max-w-full h-auto">
                {/* Segment */}
                <rect x="150" y="20" width="200" height="35" fill="#3b82f6" rx="5" />
                <text x="250" y="42" textAnchor="middle" fill="white" fontSize="12">Segment (TCP/UDP)</text>
                <path d="M250 55 L250 75" stroke="gray" strokeWidth="2" />

                {/* Packet */}
                <rect x="125" y="75" width="250" height="45" fill="#10b981" rx="5" />
                <text x="250" y="102" textAnchor="middle" fill="white" fontSize="12">Packet (IP)</text>
                <text x="130" y="95" fill="white" fontSize="9">IP Header</text>
                <text x="370" y="95" fill="white" fontSize="9">Segment</text>
                <path d="M250 120 L250 140" stroke="gray" strokeWidth="2" />

                {/* Frame */}
                <rect x="75" y="140" width="350" height="55" fill="#f59e0b" rx="5" />
                <text x="250" y="170" textAnchor="middle" fill="white" fontSize="12">Frame (Ethernet)</text>
                <text x="85" y="160" fill="white" fontSize="9">MAC Header</text>
                <text x="415" y="160" fill="white" fontSize="9">CRC Trailer</text>
                <text x="250" y="185" fill="white" fontSize="9">Packet</text>
                <path d="M250 195 L250 215" stroke="gray" strokeWidth="2" />

                {/* Bits */}
                <rect x="50" y="215" width="400" height="35" fill="#ef4444" rx="5" />
                <text x="250" y="237" textAnchor="middle" fill="white" fontSize="12">Bits (Physical)</text>
                <text x="80" y="225" fill="white" fontSize="9">0 1 1 0 1 0 0 1 ...</text>

                <text x="250" y="295" textAnchor="middle" fill="currentColor" fontSize="12">Each layer adds its own header → data unit transforms</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
              The same original data is called a segment, then a packet, then a frame, then bits — each with its own headers/trailers.
            </p>
          </section>

          {/* Common Exam Questions Insight */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[500ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              📝 Important Exam Concept
            </h2>
            <p>
              Many exam questions test your knowledge of which data unit belongs to which layer, and what happens at each encapsulation stage.
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Know that TCP uses <span className="font-bold">segments</span>; UDP uses <span className="font-bold">datagrams</span> (both at transport layer).</li>
              <li>IP operates with <span className="font-bold">packets</span> (network layer).</li>
              <li>Ethernet uses <span className="font-bold">frames</span> (data link layer).</li>
              <li>Physical layer transmits <span className="font-bold">bits</span>.</li>
            </ul>
            <p className="mt-2">
              A common trick: "Which layer encapsulates segments into packets?" Answer: Network layer.
            </p>
          </section>

          {/* Tips & Tricks */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[600ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-teal-500 pl-4 mb-4">
              🧠 Tips & Tricks (Professional Habits)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Use the mnemonic:</span> "Did Some People Prefer Big Fries?" (Data, Segment, Packet, Frame, Bits).</li>
              <li><span className="font-bold">In Wireshark, the packet list shows the frame number, but the details pane shows each layer's PDU.</span></li>
              <li><span className="font-bold">Remember:</span> "Packet" is often used generically, but in exams, be precise about segment vs. packet vs. frame.</li>
              <li><span className="font-bold">MTU affects packet size:</span> If a packet exceeds the network's MTU, it must be fragmented at the network layer.</li>
            </ul>
          </section>

          {/* Common Pitfalls */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[700ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-red-500 pl-4 mb-4">
              ⚠️ Common Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Calling a TCP segment a "packet" (though common in casual talk).
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Correct:</span> In technical contexts, use "segment" for transport layer, "packet" for network layer.
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Mistake:</span> Thinking that all layers have distinct data unit names.
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Application, Presentation, and Session layers all often just refer to "data" or "message".
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <span className="font-bold">❌ Misconception:</span> "Frames are bigger than packets."
                <br /><span className="font-bold text-green-600 dark:text-green-400">✅ Reality:</span> Frames contain packets plus MAC headers and CRC, so yes, frames are larger.
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[800ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-indigo-500 pl-4 mb-4">
              ✅ Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>When explaining network concepts, <span className="font-bold">use precise terminology</span> to avoid confusion.</li>
              <li><span className="font-bold">Visualize the data transformation</span> — draw the encapsulation stack with correct unit names.</li>
              <li>For troubleshooting, <span className="font-bold">identify at which layer a problem occurs</span> based on the data unit involved (e.g., CRC error → frame; no route → packet).</li>
              <li><span className="font-bold">Use tools like Wireshark</span> to see the actual data units in captured traffic.</li>
            </ul>
          </section>

          {/* Mini Checklist */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[900ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-pink-500 pl-4 mb-4">
              📋 Mini Checklist (What to Remember)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Transport → Segment (TCP) / Datagram (UDP)</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Network → Packet</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Data Link → Frame</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Physical → Bits</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Application / Presentation / Session → Data / Message</div>
              <div className="flex items-center gap-2"><span className="text-green-500 text-xl">✓</span> Encapsulation: Data → Segment → Packet → Frame → Bits</div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1000ms]">
            <Teacher 
              note={"This is a core exam topic. Reinforce the naming with mnemonics. Show Wireshark captures highlighting the different PDUs. Emphasize that while in casual speech we say 'packet' for everything, exams require precision. Connect back to encapsulation: why the name changes reflects the added header/trailer."}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-blue-100/70 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1100ms]">
            <p className="text-blue-800 dark:text-blue-300 font-medium">💡 <span className="underline">Observe carefully…</span></p>
            <p className="mt-1">Open Wireshark, capture a ping (ICMP). In the packet details, you'll see: Ethernet II (Frame), Internet Protocol Version 4 (Packet), Internet Control Message Protocol (ICMP is often considered network layer but encapsulated in IP).</p>
            <p className="mt-2 text-sm">Try this: Send a large HTTP request and inspect the TCP segments. Notice the "TCP segment data" label in Wireshark — that's the transport layer PDU.</p>
          </div>

          {/* Q&A Section - 15 Questions and Answers */}
          <section className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl opacity-0 translate-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards] animation-delay-[1200ms]">
            <h2 className="text-2xl font-semibold flex items-center gap-2 border-l-4 border-orange-500 pl-4 mb-4">
              ❓ 15 Q&A: Test Your Understanding
            </h2>
            <div className="space-y-5">
              <div><p className="font-bold">1. What is the data unit at the transport layer?</p><p>Segment (TCP) or datagram (UDP).</p></div>
              <div><p className="font-bold">2. What is the data unit at the network layer?</p><p>Packet.</p></div>
              <div><p className="font-bold">3. What is the data unit at the data link layer?</p><p>Frame.</p></div>
              <div><p className="font-bold">4. What is the data unit at the physical layer?</p><p>Bits.</p></div>
              <div><p className="font-bold">5. What are the data units at the application, presentation, and session layers often called?</p><p>Data or message.</p></div>
              <div><p className="font-bold">6. What does PDU stand for?</p><p>Protocol Data Unit — the generic term for data at each layer.</p></div>
              <div><p className="font-bold">7. Which layer encapsulates segments into packets?</p><p>Network layer.</p></div>
              <div><p className="font-bold">8. Which layer encapsulates packets into frames?</p><p>Data link layer.</p></div>
              <div><p className="font-bold">9. What is the difference between a segment and a datagram?</p><p>Segment is used with TCP (reliable), datagram with UDP (unreliable).</p></div>
              <div><p className="font-bold">10. What is the maximum size of a typical Ethernet frame payload?</p><p>1500 bytes (MTU).</p></div>
              <div><p className="font-bold">11. What happens if a packet is larger than the network's MTU?</p><p>It must be fragmented at the network layer.</p></div>
              <div><p className="font-bold">12. In which layer does a packet become a frame?</p><p>At the data link layer, when the packet is encapsulated with MAC header and trailer.</p></div>
              <div><p className="font-bold">13. Why is it important to use the correct terminology for data units?</p><p>To precisely communicate which layer is being discussed and to avoid confusion in troubleshooting and exams.</p></div>
              <div><p className="font-bold">14. What is the purpose of the CRC in a frame?</p><p>To detect errors in the transmitted frame.</p></div>
              <div><p className="font-bold">15. Give a mnemonic to remember the order of data units from top to bottom.</p><p>"Did Some People Prefer Big Fries?" (Data, Segment, Packet, Frame, Bits).</p></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Topic12;