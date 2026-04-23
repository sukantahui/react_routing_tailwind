// File: src/components/topics/Topic0.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic0_files/topic0_questions';

/**
 * Topic0: Role of Data Link Layer
 * 
 * @component
 * @returns {JSX.Element} The rendered component explaining the Data Link Layer's role in the OSI model.
 * 
 * @purpose To provide a comprehensive, beginner-friendly introduction to the Data Link Layer,
 *          its functions, real-world applications, and best practices.
 * 
 * @when_to_use Used as the foundational topic for networking courses, establishing the
 *               importance of node-to-node reliable data transfer before moving to
 *               flow control, error detection, and other data link concepts.
 * 
 * @why_important The Data Link Layer is the crucial bridge between the raw Physical Layer
 *                and the higher-level Network Layer. Understanding its role is essential
 *                for grasping how Ethernet, Wi-Fi, and switching technologies work.
 */
export default function Topic0() {
  // Data for the functions list to ensure consistency and easy updates
  const dataLinkFunctions = [
    {
      name: "Framing",
      description: "Divides the stream of bits received from the network layer into manageable data units called 'frames'. Each frame includes a header and a trailer.",
      analogy: "Like separating a long sentence into individual words and adding punctuation.",
    },
    {
      name: "Physical Addressing",
      description: "Adds a header containing the source and destination MAC (Media Access Control) addresses. This ensures the frame is delivered to the correct next hop device.",
      analogy: "Like writing the 'from' and 'to' addresses on an envelope before sending it.",
    },
    {
      name: "Flow Control",
      description: "Manages the rate of data transmission between a sender and a receiver to prevent a fast sender from overwhelming a slow receiver.",
      analogy: "Like a student (Swadeep) asking his teacher (Susmita) to pause or slow down the explanation if he can't take notes quickly enough.",
    },
    {
      name: "Error Control",
      description: "Detects and, in some cases, corrects errors that may have occurred during the transmission of a frame. It uses techniques like CRC and checksums.",
      analogy: "Like adding a checksum to a parcel. If the parcel arrives and the checksum doesn't match, the receiver asks the sender to resend it.",
    },
    {
      name: "Access Control",
      description: "Coordinates which device gets to use the shared physical medium at any given time, preventing data collisions.",
      analogy: "Like a moderator in a debate (Tuhina) ensuring only one person (Debangshu or Abhronila) speaks at a time to avoid a chaotic clash of voices.",
    },
  ];

  return (
    <div className="dark min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      {/* Main content container with section-based reveal animations */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Role of the Data Link Layer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            The reliable bridge between raw bits and logical communication.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The Data Link Layer is the second layer of the OSI (Open Systems Interconnection) model. 
            Its primary role is to provide <strong className="font-semibold text-blue-600 dark:text-blue-400">node-to-node</strong> reliable data transfer across a physical link. 
            While the Physical Layer sends raw bits (0s and 1s) over a cable or through the air, the Data Link Layer organizes these bits into logical structures called <strong className="font-semibold text-blue-600 dark:text-blue-400">frames</strong>, 
            controls the flow of data, detects and corrects errors, and manages access to the shared physical medium.
          </p>
        </section>

        {/* Conceptual Explanation & Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.1s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">The Why & What of the Data Link Layer</h2>
            <p className="mb-3">
              Imagine you (in <strong className="font-medium">Shyamnagar</strong>) want to send a large, complex instruction set to your friend <strong className="font-medium">Abhronila</strong> (in <strong className="font-medium">Barrackpore</strong>) 
              using a series of messenger pigeons. The Physical Layer is the pigeon itself – it can carry bits. But pigeons get tired, lost, or might be intercepted.
            </p>
            <p>
              The <strong className="font-semibold text-blue-600 dark:text-blue-400">Data Link Layer</strong> is like the protocol you both agree upon: you divide your instructions into numbered pages (frames), write the 
              return address (source MAC) and destination address (destination MAC) on each page, and add a simple checksum at the bottom (error detection). 
              Abhronila can then check each page, ask you to resend any that are damaged (error control), and tell you to slow down if her pigeon coop is getting full (flow control). 
              This layer ensures reliable, ordered delivery of data <strong className="font-semibold">across a single link</strong>.
            </p>
          </div>
        </section>

        {/* Core Functions Grid */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.15s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <h2 className="text-2xl font-semibold text-center">Core Functions of the Data Link Layer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataLinkFunctions.map((func, index) => (
              <div key={func.name} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold">{func.name}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{func.description}</p>
                <p className="text-sm italic text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="font-medium">Analogy:</span> {func.analogy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Expert SVG Illustration with Animation */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.2s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-center">Data Link Layer in Action: Frame Transmission</h2>
            <div className="flex justify-center">
              <svg width="100%" height="220" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                  </marker>
                  <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1E3A8A" />
                    <stop offset="100%" stop-color="#3B82F6" />
                  </linearGradient>
                </defs>

                {/* Background */}
                <rect x="0" y="0" width="800" height="200" fill="transparent" />

                {/* Device A (Sender) */}
                <rect x="50" y="70" width="160" height="70" rx="8" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-gray-500" />
                <text x="130" y="100" textAnchor="middle" fill="#111827" className="dark:fill-gray-100 text-sm font-semibold">Host A</text>
                <text x="130" y="120" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-300 text-xs">Node (Sender)</text>
                
                {/* Data Link Layer inside Host A */}
                <rect x="70" y="130" width="120" height="25" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" className="dark:fill-blue-900 dark:stroke-blue-400" />
                <text x="130" y="147" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200 text-xs font-bold">Data Link Layer</text>

                {/* Frame being transmitted */}
                <g>
                  <rect x="280" y="85" width="220" height="40" rx="4" fill="url(#frameGrad)" fillOpacity="0.9">
                    <animate attributeName="x" values="280;480" dur="4s" repeatCount="indefinite" />
                  </rect>
                  <text x="390" y="109" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                    Frame (Header + Data + Trailer)
                    <animate attributeName="x" values="280;480" dur="4s" repeatCount="indefinite" />
                  </text>
                </g>

                {/* Arrow indicating transmission */}
                <line x1="240" y1="95" x2="280" y2="95" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Physical Medium label */}
                <text x="350" y="75" textAnchor="middle" fill="#6B7280" className="dark:fill-gray-400 text-xs">Physical Medium (Ethernet Cable / Air)</text>

                {/* Device B (Receiver) */}
                <rect x="590" y="70" width="160" height="70" rx="8" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-gray-500" />
                <text x="670" y="100" textAnchor="middle" fill="#111827" className="dark:fill-gray-100 text-sm font-semibold">Host B</text>
                <text x="670" y="120" textAnchor="middle" fill="#4B5563" className="dark:fill-gray-300 text-xs">Node (Receiver)</text>
                
                {/* Data Link Layer inside Host B */}
                <rect x="610" y="130" width="120" height="25" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" className="dark:fill-blue-900 dark:stroke-blue-400" />
                <text x="670" y="147" textAnchor="middle" fill="#1E3A8A" className="dark:fill-blue-200 text-xs font-bold">Data Link Layer</text>

                {/* Frame arrival animation */}
                <g>
                  <rect x="500" y="85" width="0" height="40" rx="4" fill="url(#frameGrad)" fillOpacity="0.9">
                    <animate attributeName="x" values="480;500" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="width" values="220;0" dur="4s" repeatCount="indefinite" />
                  </rect>
                </g>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              The Data Link Layer on Host A encapsulates network layer data into a <strong className="text-blue-600">frame</strong>, 
              which is then transmitted over the physical medium to Host B. Host B's Data Link Layer receives, checks, and de-frames it.
            </p>
          </div>
        </section>

        {/* Real-World Usage Examples */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.25s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Real-World Examples & Context</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong className="font-semibold">Ethernet (IEEE 802.3):</strong> The most common LAN technology. Ethernet switches operate at the Data Link Layer, using MAC addresses to forward frames to the correct port.</li>
              <li><strong className="font-semibold">Wi-Fi (IEEE 802.11):</strong> Wireless networks use the Data Link Layer for Media Access Control (CSMA/CA), frame formatting, and error detection.</li>
              <li><strong className="font-semibold">Point-to-Point Protocol (PPP):</strong> Used for direct connections between two routers (e.g., for old dial-up or fiber links), providing framing, authentication, and error detection.</li>
              <li><strong className="font-semibold">Switching:</strong> A network switch learns MAC addresses and makes forwarding decisions. This is the core function of the Data Link Layer in modern networks.</li>
              <li><strong className="font-semibold">VLANs (Virtual LANs):</strong> Logical segmentation of a network at the Data Link Layer, improving security and performance.</li>
            </ul>
          </div>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <section className="space-y-6 animate-[fadeSlideUp_0.4s_ease-out_0.3s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-red-600 dark:text-red-400">Common Pitfalls (Beginner Mistakes)</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong className="font-semibold">Confusing Data Link Layer with Network Layer:</strong> The Data Link Layer handles node-to-node delivery (e.g., from your PC to your router). The Network Layer handles end-to-end delivery (e.g., from your PC to a server in another country).</li>
              <li><strong className="font-semibold">Ignoring Error Detection Overhead:</strong> Adding error detection (like CRC) adds overhead. Professional engineers use hardware offloading to handle this efficiently.</li>
              <li><strong className="font-semibold">Misunderstanding MAC addresses:</strong> MAC addresses are physical and <em>should not</em> be changed casually. Changing them can break network communication and is generally a bad practice.</li>
              <li><strong className="font-semibold">Forgetting Collision Domains:</strong> In older half-duplex networks, collisions are a real issue. Modern switches create separate collision domains, but understanding access control is still relevant for wireless networks.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-400">Best Practices & Professional Habits</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong className="font-semibold">Use Wireshark to See Frames:</strong> Observe real frames on your network. Look at the Ethernet II header, see the MAC addresses, and the type field.</li>
              <li><strong className="font-semibold">Understand MTU (Maximum Transmission Unit):</strong> The Data Link Layer defines the maximum frame size. Path MTU discovery is critical for avoiding fragmentation issues at higher layers.</li>
              <li><strong className="font-semibold">Think in Terms of Links:</strong> When troubleshooting, always ask "Is the link reliable? Are frames being dropped?" before blaming higher layers.</li>
              <li><strong className="font-semibold">Respect Protocol Encapsulation:</strong> A frame contains a packet, which contains a segment, which contains data. Understanding this hierarchy prevents many design mistakes.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks from Professionals */}
        <section className="space-y-4 animate-[fadeSlideUp_0.4s_ease-out_0.35s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Pro Tips & Tricks</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong className="font-semibold">Tool: `arp -a` (Windows/macOS/Linux):</strong> Shows the ARP cache, which maps IP addresses (Network Layer) to MAC addresses (Data Link Layer). It's a window into how these layers interact.</li>
              <li><strong className="font-semibold">Debugging Mindset:</strong> If you capture packets and see frames with bad FCS (Frame Check Sequence) or runts (frames smaller than 64 bytes), you have a Physical or Data Link Layer problem (bad cable, interference, duplex mismatch).</li>
              <li><strong className="font-semibold">Naming Convention:</strong> In configuration files for network interfaces, `hwaddress` or `mac` refers to the Data Link Layer address.</li>
              <li><strong className="font-semibold">Classroom Trick:</strong> To explain framing, give students (e.g., Susmita, Tuhina, and Debangshu) slips of paper. Ask them to write a message, put it in an envelope (frame), write a source and destination "house address" (MAC), and a checksum on the back (trailer). Pass the envelopes. This physically demonstrates encapsulation.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.4s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3">✅ Student's Checklist: Data Link Layer</h2>
            <div className="grid md:grid-cols-2 gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I can explain the main purpose of the Data Link Layer.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I understand the difference between node-to-node and end-to-end delivery.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I can list the five core functions of the Data Link Layer.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I can give a real-world example of a Data Link Layer protocol.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I can describe a frame and its key components.</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> I know what a MAC address is and where it's used.</label>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="animate-[fadeSlideUp_0.4s_ease-out_0.45s_forwards] opacity-0 transform translate-y-4 transition-all duration-500">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 mb-2">💡 Think About...</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Observe carefully:</span> When you download a large file, why does it sometimes pause and then continue? Could the Data Link Layer's flow control be involved?
              Try changing the MTU on your router or computer. What problems might a very small or very large MTU cause that the Data Link Layer would need to handle?
              If you were designing a network for a factory floor with lots of electrical noise (errors), which function of the Data Link Layer would you prioritize?
            </p>
          </div>
        </section>

        {/* FAQ Section - Using Template */}
        <FAQTemplate title="Data Link Layer FAQs" questions={questions} />

        {/* Teacher's Note */}
        <Teacher note={"The Data Link Layer is often misunderstood. Emphasize that it operates on a 'hop-by-hop' basis, not end-to-end. Use the 'letter in an envelope' analogy repeatedly. A great in-class activity: Have students (Swadeep, Tuhina, Abhronila, Debangshu) simulate a faulty link where frames get 'corrupted' (e.g., by a random noise generator). They'll quickly appreciate the value of error detection and retransmission. Remind them that mastering this layer is the foundation for understanding Ethernet switching and Wi-Fi."} />
      
      </div>

      {/* Scoped styles for animations and safe reduced-motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_0\\.4s_ease-out_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}