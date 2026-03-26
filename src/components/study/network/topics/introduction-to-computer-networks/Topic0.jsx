import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic0.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Introduce the fundamental concept of computer networking, its core purposes,
 *          and real-world applications (internet, banking, mobile networks).
 * When & Why Used: Serves as the entry point for a networking curriculum, establishing
 *                  the "why" and "what" before diving into technical details.
 */

const Topic0 = () => {
  // Real-world examples data
  const realWorldExamples = [
    {
      title: "🌐 The Internet",
      description:
        "A global network of networks connecting billions of devices. When Swadeep in Barrackpore sends a message to Tuhina in Naihati, data travels through multiple ISPs, routers, and undersea cables — all made possible by networking.",
      icon: "🌍",
    },
    {
      title: "🏦 Banking & ATMs",
      description:
        "Your ATM withdrawal in Shyamnagar communicates with your bank's central server in Mumbai. Networking ensures real-time balance checks, secure transactions, and inter-bank transfers. Abhronila uses UPI to pay for groceries — that's networking in action.",
      icon: "💳",
    },
    {
      title: "📱 Mobile Networks (4G/5G)",
      description:
        "When Susmita streams a video on her phone in Ichapur, her device connects to a nearby cell tower, then to a core network, and finally to content servers. Mobile networks are complex networking systems enabling voice, data, and SMS.",
      icon: "📡",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Confusing 'internet' with 'World Wide Web'",
      correction:
        "The internet is the physical network of networks; the Web is a service (HTTP) that runs on it.",
    },
    {
      mistake: "Thinking Wi-Fi = internet",
      correction:
        "Wi-Fi is just a wireless medium to connect to a local network; the internet access comes via a router/modem connected to an ISP.",
    },
    {
      mistake: "Ignoring security basics",
      correction:
        "Networking without security (like open Wi-Fi) exposes data to threats. Always consider authentication and encryption.",
    },
  ];

  const bestPractices = [
    "Always document network topology and IP addressing schemes.",
    "Use the OSI model as a mental framework to isolate problems.",
    "Start with simple network designs and scale gradually.",
    "Test connectivity with ping and traceroute before assuming the network is down.",
  ];

  const tipsAndTricks = [
    "Use `traceroute` (or `tracert` on Windows) to see the path packets take — it's like a GPS for network traffic.",
    "Network diagrams are your best friend. Tools like draw.io or Lucidchart help visualize connections.",
    "When debugging, start from the physical layer (cables, lights) and move up — many issues are physical.",
    "Learn to read a MAC address table and ARP cache — they reveal how devices communicate locally.",
  ];

  const miniChecklist = [
    "☐ I can define computer networking in my own words.",
    "☐ I can list at least three purposes of networking (resource sharing, communication, reliability).",
    "☐ I can give real-world examples beyond the ones mentioned.",
    "☐ I understand that networking involves hardware, software, and protocols.",
    "☐ I can differentiate between the internet and the World Wide Web.",
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section - Reveal Animation */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            What is Computer Networking?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting the world, one device at a time
          </p>
        </div>

        {/* Definition & Purpose - Two Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Definition Card */}
          <div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📖</span>
              <h2 className="text-2xl font-semibold">Definition</h2>
            </div>
            <p className="text-gray-200">
              <strong className="text-blue-300">Computer Networking</strong> is the practice of connecting
              two or more computing devices (computers, servers, smartphones, IoT devices) together to
              share resources, exchange data, and communicate. This connection can be wired (copper,
              fiber optics) or wireless (radio waves, satellite), governed by a set of rules called{" "}
              <strong className="text-teal-300">protocols</strong>.
            </p>
            <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-gray-300 italic">
                💡 Think of it like a postal system: devices are houses, data is mail, and protocols are
                the addressing and delivery rules.
              </p>
            </div>
          </div>

          {/* Purpose Card */}
          <div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0 translate-y-4"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <h2 className="text-2xl font-semibold">Purpose</h2>
            </div>
            <ul className="space-y-2 list-disc pl-5 text-gray-200">
              <li>
                <strong>Resource Sharing:</strong> Printers, files, internet connection — one resource,
                many users.
              </li>
              <li>
                <strong>Reliability & Redundancy:</strong> Multiple paths ensure data reaches destination
                even if one link fails.
              </li>
              <li>
                <strong>Cost Efficiency:</strong> Shared hardware reduces individual costs.
              </li>
              <li>
                <strong>Scalability:</strong> Add new devices without rebuilding infrastructure.
              </li>
              <li>
                <strong>Communication:</strong> Email, messaging, video calls — the backbone of modern
                interaction.
              </li>
            </ul>
          </div>
        </div>

        {/* Real-World Examples Section with SVG */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌎</span>
            <h2 className="text-2xl font-semibold">Real-World Examples</h2>
          </div>

          {/* Interactive SVG Illustration */}
          <div className="mb-8 bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg
              width="100%"
              height="240"
              viewBox="0 0 800 240"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto"
              style={{ background: "rgba(17, 24, 39, 0.5)", borderRadius: "0.75rem" }}
            >
              <title>Network Illustration: Devices connected to Cloud</title>
              {/* Cloud shape */}
              <path
                d="M200,120 Q220,80 260,80 Q290,80 310,100 Q340,90 360,110 Q380,100 400,110 Q420,100 440,110 Q460,100 480,110 Q500,100 520,110 Q540,90 560,100 Q580,110 570,130 Q560,150 540,150 L220,150 Q200,150 190,135 Q180,120 200,120Z"
                fill="#3B82F6"
                fillOpacity="0.3"
                stroke="#60A5FA"
                strokeWidth="2"
              >
                <animate
                  attributeName="fill-opacity"
                  values="0.3;0.5;0.3"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <text x="380" y="125" fill="#93C5FD" fontSize="14" textAnchor="middle">
                INTERNET CLOUD
              </text>

              {/* Devices */}
              {/* Laptop (Barrackpore) */}
              <rect x="30" y="160" width="60" height="40" fill="#1F2937" stroke="#9CA3AF" rx="6" />
              <text x="60" y="188" fill="#E5E7EB" fontSize="10" textAnchor="middle">
                💻 Swadeep
              </text>
              <text x="60" y="205" fill="#9CA3AF" fontSize="8" textAnchor="middle">
                Barrackpore
              </text>

              {/* Bank Server */}
              <rect x="700" y="150" width="70" height="50" fill="#1F2937" stroke="#FBBF24" rx="6" />
              <text x="735" y="178" fill="#E5E7EB" fontSize="10" textAnchor="middle">
                🏦 Bank
              </text>
              <text x="735" y="195" fill="#FBBF24" fontSize="8" textAnchor="middle">
                Central Server
              </text>

              {/* Mobile Device */}
              <rect x="400" y="190" width="40" height="50" fill="#1F2937" stroke="#34D399" rx="8" />
              <text x="420" y="228" fill="#E5E7EB" fontSize="10" textAnchor="middle">
                📱 Susmita
              </text>
              <text x="420" y="245" fill="#34D399" fontSize="8" textAnchor="middle">
                Ichapur
              </text>

              {/* Animated Data Packet */}
              <circle cx="100" cy="180" r="6" fill="#F97316">
                <animate
                  attributeName="cx"
                  values="100;380;380;735"
                  dur="5s"
                  begin="0s"
                  repeatCount="indefinite"
                  fill="freeze"
                />
                <animate
                  attributeName="cy"
                  values="180;125;200;175"
                  dur="5s"
                  begin="0s"
                  repeatCount="indefinite"
                  fill="freeze"
                />
                <animate
                  attributeName="r"
                  values="6;8;6;6"
                  dur="5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              <text x="100" y="170" fill="#F97316" fontSize="8" fillOpacity="0.8">
                Data
              </text>

              {/* Connection lines */}
              <line x1="90" y1="180" x2="190" y2="125" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="580" y1="135" x2="700" y2="175" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="420" y1="215" x2="560" y2="135" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Example Cards with Stagger */}
          <div className="grid gap-6 md:grid-cols-3">
            {realWorldExamples.map((example, idx) => (
              <div
                key={example.title}
                className="bg-gray-800/70 rounded-xl p-5 border border-gray-600 hover:border-blue-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.4 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{example.icon}</span>
                  <h3 className="text-xl font-medium">{example.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{example.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips & Tricks + Common Mistakes side by side */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Tips & Tricks Section */}
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
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

          {/* Common Mistakes */}
          <div
            className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards] opacity-0 translate-y-4"
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
        </div>

        {/* Best Practices */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✅</span>
            <h2 className="text-2xl font-semibold">Best Practices</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 list-disc pl-5 text-gray-200">
            {bestPractices.map((practice, idx) => (
              <li key={idx} className="hover:text-blue-300 transition-colors">
                {practice}
              </li>
            ))}
          </ul>
        </div>

        {/* Mini Checklist */}
        <div
          className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-semibold">Mini Checklist</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {miniChecklist.map((item, idx) => (
              <p key={idx} className="text-gray-200 flex items-start gap-2">
                <span className="text-green-400">✓</span> {item.substring(2)}
              </p>
            ))}
          </div>
        </div>

        {/* Hint Section */}
        <div
          className="border border-dashed border-blue-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: When you open a website, how many different networks does your request pass
            through? Try changing your Wi-Fi network and notice how the path changes.
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Ask a friend (like Tuhina or Debangshu) to share a file over a local network. What
            do you need to make it work? That's networking in practice.
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "Networking is the foundation of our digital world. Start with simple analogies (postal system, roads) before introducing protocols. Encourage students to draw their home network. Remind them: every online interaction is a network event. Use tools like ping and traceroute to spark curiosity. Reinforce that the 'why' is as important as the 'how'."
            }
          />
        </div>

        {/* Keyframe Styles for Animations */}
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

export default Topic0;