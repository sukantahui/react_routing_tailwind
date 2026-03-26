import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic14.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain the gateway – a network device that performs protocol conversion
 *          and enables communication between dissimilar networks (e.g., VoIP to PSTN,
 *          LAN to WAN with different protocols, IoT to cloud).
 * When & Why Used: After covering routers (Topic13), this final device topic introduces
 *                  the gateway, which goes beyond routing to handle protocol translation,
 *                  making it essential for connecting heterogeneous networks.
 */

const Topic14 = () => {
  const definition =
    "A gateway is a network device that acts as an entry point to another network, performing protocol conversion and translation between different network architectures. Unlike a router (which forwards packets based on IP), a gateway can interconnect networks with completely different protocols, data formats, or communication technologies.";

  const workingPrinciple = [
    "A gateway receives data from one network in its native format (e.g., VoIP SIP/RTP).",
    "It extracts the payload and performs necessary translation (e.g., converts to PSTN signaling).",
    "It repackages the data according to the destination network's protocol and sends it out.",
    "The process is often transparent to the endpoints, which see only the gateway's interface.",
    "Gateways can operate at multiple OSI layers, from physical to application."
  ];

  const keyFunctions = [
    "Protocol conversion – translates between different protocols (e.g., HTTP to CoAP for IoT, SIP to SS7 for telephony).",
    "Data format transformation – converts data encoding, encryption, or compression schemes.",
    "Network interconnection – connects networks with incompatible addressing or media (e.g., Ethernet to Fiber Channel).",
    "Security enforcement – often includes firewalling, content filtering, or TLS termination.",
    "Application‑level mediation – can cache, load balance, or adapt application-layer protocols."
  ];

  const gatewayVsRouter = [
    { aspect: "Primary Function", router: "Packet forwarding based on IP", gateway: "Protocol conversion and network translation" },
    { aspect: "Layer", router: "Network Layer (Layer 3)", gateway: "Any layer, often Application Layer (Layer 7)" },
    { aspect: "Network Compatibility", router: "Works within IP networks", gateway: "Connects dissimilar networks (IP to non‑IP, different protocols)" },
    { aspect: "Example", router: "Home router connects LAN to ISP", gateway: "VoIP gateway connects IP phone to traditional phone line" }
  ];

  const advantages = [
    "Enables interoperability between completely different network types (e.g., legacy systems and modern IP networks).",
    "Provides centralized security and policy enforcement at network boundaries.",
    "Can offload protocol handling from end devices, simplifying client implementations.",
    "Facilitates gradual migration from old to new technologies.",
    "Allows seamless integration of IoT, cloud, and on‑premises services."
  ];

  const disadvantages = [
    "Introduces latency due to protocol conversion and processing.",
    "Can become a single point of failure if not designed with redundancy.",
    "Complex to configure and maintain, especially when dealing with multiple protocols.",
    "May limit functionality if conversion is lossy (e.g., feature mismatch between protocols).",
    "Often expensive, especially high‑performance carrier‑grade gateways."
  ];

  const realWorldExamples = [
    {
      title: "📞 VoIP Gateway",
      description:
        "When Swadeep calls a landline from his VoIP app, the call travels over IP to a VoIP gateway, which converts it to traditional telephone signals (PSTN) and routes it to the recipient's analog phone. This gateway translates between SIP/RTP and SS7/ISDN."
    },
    {
      title: "🌐 IoT Gateway",
      description:
        "In Tuhina's smart home, sensors use Zigbee or Z‑Wave. The IoT gateway collects data from these devices, converts it to MQTT or HTTP, and forwards it to the cloud. It may also perform edge processing and security checks."
    },
    {
      title: "☁️ API Gateway",
      description:
        "Abhronila's company uses an API gateway in front of microservices. It handles authentication, rate limiting, protocol translation (REST to gRPC), and aggregates responses. Clients only talk to the gateway, not the internal services."
    },
    {
      title: "🏭 Industrial Gateway",
      description:
        "A factory in Ichapur uses a gateway to connect legacy PLCs (using Modbus) to a modern SCADA system (using OPC‑UA). The gateway translates between the two protocols, enabling unified monitoring and control."
    }
  ];

  const commonMistakes = [
    {
      mistake: "Confusing a gateway with a router",
      correction:
        "A router forwards IP packets between networks; a gateway performs protocol translation. A home router often includes a gateway function (e.g., NAT), but a true gateway goes beyond routing."
    },
    {
      mistake: "Assuming gateways are only physical devices",
      correction:
        "Gateways can be software‑based, running on servers, containers, or cloud services (e.g., API gateways, IoT hubs)."
    },
    {
      mistake: "Overlooking security at the gateway",
      correction:
        "Gateways are critical points where attackers may target. Always secure them with strong authentication, encryption, and regular updates."
    }
  ];

  const bestPractices = [
    "Use gateways to abstract complexity: hide backend protocols from clients.",
    "Design gateways for high availability – use clustering or load balancers to avoid single points of failure.",
    "Monitor gateway performance – protocol conversion can be CPU‑intensive; scale accordingly.",
    "Log and audit gateway activity – they are often the primary entry point for external traffic."
  ];

  const tipsAndTricks = [
    "For IoT projects, consider using open‑source IoT gateways like Kura or EdgeX Foundry.",
    "API gateways (e.g., Kong, NGINX) are powerful tools to manage microservices traffic.",
    "When testing a gateway, simulate both sides of the conversion to verify data integrity."
  ];

  const miniChecklist = [
    "☐ I can define a gateway and explain its purpose.",
    "☐ I understand that gateways perform protocol conversion, not just packet forwarding.",
    "☐ I can differentiate between a router and a gateway.",
    "☐ I can give at least three real‑world examples of gateways (VoIP, IoT, API, industrial).",
    "☐ I know that gateways can be hardware or software and operate at various OSI layers."
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Networking Devices: Gateway
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging worlds: protocol conversion and network translation
          </p>
        </div>

        {/* Definition & Working Principle */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌉</span>
              <h2 className="text-2xl font-semibold">What is a Gateway?</h2>
            </div>
            <p className="text-gray-200">{definition}</p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-teal-500">
              <p className="text-sm text-gray-300 italic">
                💡 Think of a gateway as an interpreter between two people who speak different languages – it translates messages so each can understand the other.
              </p>
            </div>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
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

        {/* Key Functions & Comparison with Router */}
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔧</span>
              <h2 className="text-2xl font-semibold">Key Functions</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-200">
              {keyFunctions.map((fn, i) => (
                <li key={i}>{fn}</li>
              ))}
            </ul>
          </div>

          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-2xl font-semibold">Gateway vs Router</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-2 text-teal-300">Aspect</th>
                    <th className="py-2 px-2 text-teal-300">Router</th>
                    <th className="py-2 px-2 text-teal-300">Gateway</th>
                   </tr>
                </thead>
                <tbody>
                  {gatewayVsRouter.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="py-2 px-2 font-medium text-gray-200">{row.aspect}</td>
                      <td className="py-2 px-2 text-gray-300">{row.router}</td>
                      <td className="py-2 px-2 text-gray-300">{row.gateway}</td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SVG Illustration: Gateway Translating Protocols */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-semibold">Visual: Gateway in Action</h2>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <title>Gateway translating between IoT sensor network (Zigbee) and Cloud (MQTT/HTTP)</title>
              
              {/* Left side: IoT network */}
              <rect x="30" y="60" width="200" height="160" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="130" y="45" fill="#60A5FA" fontSize="12">IoT Sensor Network</text>
              <circle cx="80" cy="120" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="80" y="125" fill="#E5E7EB" fontSize="9" textAnchor="middle">Zigbee</text>
              <circle cx="140" cy="160" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="140" y="165" fill="#E5E7EB" fontSize="9" textAnchor="middle">Zigbee</text>
              <circle cx="190" cy="100" r="20" fill="#1F2937" stroke="#9CA3AF" />
              <text x="190" y="105" fill="#E5E7EB" fontSize="9" textAnchor="middle">Zigbee</text>
              
              {/* Gateway box */}
              <rect x="280" y="90" width="200" height="100" fill="#1F2937" stroke="#10B981" strokeWidth="2" rx="6" />
              <text x="380" y="135" fill="#10B981" fontSize="12" textAnchor="middle">GATEWAY</text>
              <text x="380" y="160" fill="#9CA3AF" fontSize="8" textAnchor="middle">Protocol Translation</text>
              <text x="380" y="175" fill="#9CA3AF" fontSize="8" textAnchor="middle">Zigbee ↔ MQTT</text>
              
              {/* Right side: Cloud/Internet */}
              <rect x="550" y="60" width="200" height="160" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="650" y="45" fill="#F59E0B" fontSize="12">Cloud / Internet</text>
              <path d="M620,120 Q640,100 660,120 Q680,110 690,130 Q700,140 690,150 Q680,160 660,150 L640,150 Q630,150 625,135 Q620,120 620,120Z" fill="#1F2937" stroke="#F59E0B" fillOpacity="0.5" />
              <text x="650" y="135" fill="#F59E0B" fontSize="9" textAnchor="middle">MQTT</text>
              <text x="650" y="150" fill="#F59E0B" fontSize="9" textAnchor="middle">HTTP</text>
              
              {/* Connections */}
              <line x1="230" y1="125" x2="280" y2="125" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="480" y1="140" x2="550" y2="140" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
              
              {/* Animated packet: Zigbee data going through gateway and becoming MQTT */}
              <circle cx="80" cy="120" r="5" fill="#F97316">
                <animate attributeName="cx" values="80;230;380;480;620" dur="4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="120;125;140;140;140" dur="4s" repeatCount="indefinite" />
              </circle>
              <text x="150" y="30" fill="#F97316" fontSize="10">Sensor data (Zigbee)</text>
              <text x="620" y="30" fill="#F97316" fontSize="10">→ Cloud (MQTT)</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Gateway translates between protocols (e.g., Zigbee to MQTT), enabling different networks to communicate.
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

        {/* Real-World Examples */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🌍</span>
            <h2 className="text-2xl font-semibold">Real‑World Examples</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {realWorldExamples.map((ex, idx) => (
              <div
                key={ex.title}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-teal-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.9 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <h3 className="text-lg font-medium text-teal-300">{ex.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{ex.description}</p>
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
          className="border border-dashed border-teal-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.4s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-teal-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: How does an API gateway differ from a traditional network gateway? What additional functions does it provide?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: If you were connecting a legacy industrial device (using Modbus) to a modern cloud platform, what would a gateway need to do? Map out the protocol conversion steps.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.5s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "The gateway ties together many concepts: protocols, layers, and interoperability. Emphasize that while routers connect similar networks, gateways connect dissimilar ones. Use the IoT gateway as a relatable example – students often have smart home devices. API gateways are also increasingly important. Highlight that modern cloud architecture heavily relies on API gateways to manage microservices."
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

export default Topic14;