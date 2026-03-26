import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic2.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce the four fundamental building blocks of any network:
 *          sender, receiver, transmission medium, and protocol.
 * When & Why Used: After establishing why networking is important (Topic1), this topic
 *                  breaks down the essential components, preparing students for deeper
 *                  discussions on topologies, devices, and architectures.
 */

const Topic2 = () => {
  // Data for the four components
  const components = [
    {
      name: "Sender (Source)",
      icon: "📤",
      definition: "The device that initiates the communication by creating and transmitting data.",
      examples: "Your smartphone when you send a WhatsApp message, a server hosting a website, or Swadeep's laptop when he uploads a file.",
      analogy: "Like a person writing a letter and putting it in the mailbox.",
    },
    {
      name: "Receiver (Destination)",
      icon: "📥",
      definition: "The device that receives and processes the data sent by the sender.",
      examples: "Your friend's phone receiving the WhatsApp message, your computer loading a website, or Tuhina's tablet receiving a document.",
      analogy: "Like the person at the other end opening the mailbox and reading the letter.",
    },
    {
      name: "Transmission Medium",
      icon: "🔌",
      definition: "The physical or wireless path through which data travels from sender to receiver.",
      examples: "Ethernet cables, fiber optics, Wi-Fi radio waves, Bluetooth, or even satellite links.",
      analogy: "Like the postal service's trucks, planes, and delivery routes that carry the letter.",
    },
    {
      name: "Protocol",
      icon: "📜",
      definition: "A set of rules and conventions that govern how data is formatted, transmitted, and interpreted.",
      examples: "HTTP/HTTPS for web browsing, TCP/IP for reliable delivery, SMTP for email, Wi-Fi (802.11) for wireless.",
      analogy: "Like the language and format used in the letter (envelope address, salutation, body) that both sender and receiver understand.",
    },
  ];

  const realWorldScenario = {
    title: "A Day in the Life of a Network",
    description:
      "When Abhronila in Ichapur sends a photo to her friend Susmita in Barrackpore using Instagram, the sender is Abhronila's phone. The receiver is Susmita's phone. The transmission medium could be Wi-Fi at home, then fiber optic cables, then mobile data. The protocol is HTTPS over TCP/IP, with Instagram's servers acting as intermediate nodes. This simple action involves all four components working together.",
  };

  const commonMistakes = [
    {
      mistake: "Confusing protocol with medium",
      correction: "Protocol is a set of rules (software), medium is the physical/wireless path (hardware). Both are needed but different.",
    },
    {
      mistake: "Thinking the sender and receiver must be directly connected",
      correction: "In modern networks, data often passes through many intermediate devices (routers, switches) – the sender and receiver are the endpoints.",
    },
    {
      mistake: "Ignoring the protocol when troubleshooting",
      correction: "When a network fails, check if the protocol is correctly configured (e.g., wrong IP settings, firewall blocking).",
    },
  ];

  const bestPractices = [
    "Always verify that both sender and receiver are using the same protocol version (e.g., HTTP/2 vs HTTP/3) for compatibility.",
    "Choose the right transmission medium for the environment: fiber for long distance, shielded twisted pair for noisy industrial areas.",
    "Document all components in your network diagram: include devices, media types, and protocols used.",
    "When troubleshooting, think in terms of the components: is the sender working? is the medium up? is the receiver ready?",
  ];

  const tipsAndTricks = [
    "Use `ping` to test if sender can reach receiver – it checks basic connectivity using ICMP protocol.",
    "Wireshark can capture and show you the protocol details of actual network traffic – great for learning.",
    "For wireless networks, the medium (air) is shared; interference from other devices can cause packet loss.",
    "Protocols are often layered (OSI model). Understanding layers helps isolate problems: e.g., physical layer vs. application layer.",
  ];

  const miniChecklist = [
    "☐ I can define each of the four basic network components.",
    "☐ I can give a real-world example of each component in action.",
    "☐ I understand the difference between a protocol and a transmission medium.",
    "☐ I can identify the sender, receiver, medium, and protocol in a simple communication (e.g., email).",
    "☐ I know that all four components must work together for successful communication.",
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Basic Components of a Network
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The four essential building blocks of every network
          </p>
        </div>

        {/* Four Components with Staggered Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {components.map((comp, idx) => (
            <div
              key={comp.name}
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-0 translate-y-4"
              style={{ animationFillMode: "forwards", animationDelay: `${0.1 + idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{comp.icon}</span>
                <h2 className="text-2xl font-semibold">{comp.name}</h2>
              </div>
              <p className="text-gray-200 mb-2">
                <strong className="text-blue-300">Definition:</strong> {comp.definition}
              </p>
              <p className="text-gray-200 mb-2">
                <strong className="text-green-300">Examples:</strong> {comp.examples}
              </p>
              <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-300 italic">
                  🧠 Analogy: {comp.analogy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SVG Illustration: Sender → Medium → Receiver with Protocol */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔄</span>
            <h2 className="text-2xl font-semibold">How They Work Together</h2>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg
              width="100%"
              height="240"
              viewBox="0 0 800 240"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto"
              style={{ background: "rgba(17, 24, 39, 0.5)", borderRadius: "0.75rem" }}
            >
              <title>Network Components: Sender, Medium, Receiver, Protocol</title>
              {/* Sender */}
              <rect x="50" y="90" width="100" height="60" fill="#1F2937" stroke="#60A5FA" rx="8" />
              <text x="100" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">Sender</text>
              <text x="100" y="145" fill="#9CA3AF" fontSize="10" textAnchor="middle">(Swadeep's PC)</text>

              {/* Receiver */}
              <rect x="650" y="90" width="100" height="60" fill="#1F2937" stroke="#34D399" rx="8" />
              <text x="700" y="125" fill="#E5E7EB" fontSize="12" textAnchor="middle">Receiver</text>
              <text x="700" y="145" fill="#9CA3AF" fontSize="10" textAnchor="middle">(Tuhina's Phone)</text>

              {/* Medium (cloud-like) */}
              <path
                d="M280,120 Q310,80 350,80 Q380,80 400,100 Q430,90 460,110 Q490,100 520,120 Q540,130 530,150 Q510,160 480,160 L330,160 Q300,160 290,140 Q280,120 280,120Z"
                fill="#3B82F6"
                fillOpacity="0.2"
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
              <text x="400" y="140" fill="#93C5FD" fontSize="12" textAnchor="middle">Transmission Medium</text>
              <text x="400" y="175" fill="#9CA3AF" fontSize="10" textAnchor="middle">(Fiber / Wi-Fi / Ethernet)</text>

              {/* Animated data packet */}
              <circle cx="150" cy="120" r="6" fill="#F97316">
                <animate attributeName="cx" values="150;650" dur="3s" repeatCount="indefinite" fill="freeze" />
                <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="150" y="110" fill="#F97316" fontSize="8">Data</text>

              {/* Protocol label with animation */}
              <rect x="350" y="30" width="100" height="30" fill="#1F2937" stroke="#F59E0B" rx="4" />
              <text x="400" y="52" fill="#F59E0B" fontSize="12" textAnchor="middle">Protocol (Rules)</text>
              <animate
                xlinkHref="#protocolRect"
                attributeName="stroke-dasharray"
                values="2 2;6 2;2 2"
                dur="2s"
                repeatCount="indefinite"
              />
            </svg>
          </div>

          <div className="mt-6 text-center text-gray-300 text-sm">
            Data travels from sender to receiver through the transmission medium, following the protocol's rules.
          </div>
        </div>

        {/* Real-World Scenario */}
        <div
          className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📱</span>
            <h2 className="text-2xl font-semibold">Real-World Scenario</h2>
          </div>
          <p className="text-gray-200 leading-relaxed">{realWorldScenario.description}</p>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
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
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4"
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
          className="border border-dashed border-green-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-green-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When you type a URL into your browser, what is the sender? What is the receiver? What medium is used? What protocol?
          </p>
          <p className="text-gray-300 mt-2">
            Try changing this: If you unplug the Ethernet cable from your computer, which component is affected? What happens if you disable Wi-Fi? How does the protocol (e.g., TCP) handle this failure?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "This topic is foundational. Ensure students can identify the four components in everyday scenarios. Use the analogy of a phone call: sender (caller), receiver (callee), medium (phone network), protocol (voice, language). Emphasize that protocols are invisible but critical. Encourage students to draw their own diagrams of a simple communication and label the components."
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

export default Topic2;