import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic1.jsx
 * 
 * Prototype: Functional component returning JSX.
 * Return Type: JSX.Element
 * Purpose: Explain why networking is crucial in today's world, focusing on communication
 *          and data sharing.
 * When & Why Used: After introducing the concept of networking (Topic0), this topic
 *                  builds on it by exploring its real-world impact, preparing students
 *                  for technical details in later topics.
 */

const Topic1 = () => {
  // Key points about importance
  const importancePoints = [
    {
      title: "🌍 Global Communication",
      description:
        "Networking enables instant communication across continents. Swadeep in Barrackpore can video call his cousin in London, or collaborate with Tuhina on a project in real-time using tools like Zoom, WhatsApp, or email.",
    },
    {
      title: "📁 Seamless Data Sharing",
      description:
        "Sharing files, databases, and applications across devices and locations. Abhronila can access her school assignment saved on a cloud server from home, or Susmita can print a document on a networked printer in the school lab.",
    },
    {
      title: "⚡ Efficiency & Collaboration",
      description:
        "Teams work together on documents simultaneously (Google Docs), share calendars, and coordinate tasks. In Ichapur, a small business can manage inventory from multiple terminals thanks to networking.",
    },
    {
      title: "🔒 Centralized Management & Security",
      description:
        "Network administrators can enforce security policies, update software, and backup data centrally. This reduces risks and ensures consistency across all connected devices.",
    },
  ];

  const realWorldImpact = [
    {
      sector: "Healthcare",
      description:
        "Hospitals use networks to share patient records, enable telemedicine, and monitor vital signs remotely. A doctor in Kolkata can consult on a case in Shyamnagar instantly.",
      icon: "🏥",
    },
    {
      sector: "Education",
      description:
        "Schools like Barrackpore High School use networks for online classes, digital libraries, and collaborative projects. Students submit assignments via portals, and teachers share resources effortlessly.",
      icon: "🎓",
    },
    {
      sector: "Business",
      description:
        "Companies rely on networks for e-commerce, supply chain management, and remote work. Debangshu's startup uses cloud-based CRM to manage customer data from anywhere.",
      icon: "💼",
    },
    {
      sector: "Entertainment",
      description:
        "Streaming platforms, online gaming, and social media are all powered by networks. Susmita streams her favorite show, while Swadeep plays multiplayer games with friends across the city.",
      icon: "🎮",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Ignoring network security",
      correction:
        "Open Wi-Fi, weak passwords, and no encryption can expose sensitive data. Always use WPA3, strong passwords, and consider VPNs for sensitive transactions.",
    },
    {
      mistake: "Underestimating bandwidth needs",
      correction:
        "A network that works for a few devices may choke with many users. Plan for peak usage and monitor traffic to avoid bottlenecks.",
    },
    {
      mistake: "Overlooking redundancy",
      correction:
        "A single point of failure (like one router) can bring down an entire network. For critical systems, design with backup links and devices.",
    },
  ];

  const bestPractices = [
    "Segment networks with VLANs to improve security and performance.",
    "Regularly update firmware on routers, switches, and access points.",
    "Document network topology, IP assignments, and device inventory.",
    "Use monitoring tools (like Wireshark or Nagios) to proactively detect issues.",
  ];

  const tipsAndTricks = [
    "Use speed test tools to verify actual bandwidth vs. promised ISP speeds.",
    "Learn to read network logs — they often reveal the root cause of connectivity issues.",
    "Set up a small home lab with old routers and switches to practice concepts.",
    "Always test backups: a network failure is manageable if data is safely backed up elsewhere.",
  ];

  const miniChecklist = [
    "☐ I can explain why networking is important in daily life.",
    "☐ I can give three examples of how networking enables communication.",
    "☐ I can identify at least two sectors that heavily rely on networking.",
    "☐ I understand that networking affects security, efficiency, and collaboration.",
    "☐ I can list common mistakes people make when setting up or using networks.",
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section - Reveal Animation */}
        <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Importance of Networking
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting people, data, and possibilities
          </p>
        </div>

        {/* Core Importance Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {importancePoints.map((point, idx) => (
            <div
              key={point.title}
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards] opacity-0 translate-y-4"
              style={{ animationFillMode: "forwards", animationDelay: `${0.1 + idx * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{point.title.split(' ')[0]}</span>
                <h2 className="text-2xl font-semibold">{point.title.slice(2)}</h2>
              </div>
              <p className="text-gray-200">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Real-World Impact Section with SVG */}
        <div
          className="bg-gray-800/40 rounded-2xl p-6 border border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl font-semibold">Real-World Impact</h2>
          </div>

          {/* SVG Illustration: Global Communication */}
          <div className="mb-8 bg-gray-900/50 rounded-xl p-4 flex justify-center overflow-x-auto">
            <svg
              width="100%"
              height="200"
              viewBox="0 0 800 200"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto"
              style={{ background: "rgba(17, 24, 39, 0.5)", borderRadius: "0.75rem" }}
            >
              <title>Global network connecting people, data, and devices</title>
              {/* Background globe grid */}
              <circle cx="400" cy="100" r="70" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
                <animate attributeName="r" values="70;72;70" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="100" r="60" stroke="#3B82F6" strokeWidth="1" fill="none" />
              <circle cx="400" cy="100" r="50" stroke="#3B82F6" strokeWidth="0.8" fill="none" />

              {/* Horizontal and vertical lines for globe */}
              <line x1="330" y1="100" x2="470" y2="100" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.6" />
              <line x1="400" y1="30" x2="400" y2="170" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.6" />

              {/* Nodes around globe */}
              <circle cx="350" cy="70" r="8" fill="#F97316">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="450" cy="70" r="8" fill="#34D399">
                <animate attributeName="r" values="8;12;8" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="370" cy="130" r="8" fill="#F59E0B">
                <animate attributeName="r" values="8;12;8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="430" cy="130" r="8" fill="#EC489A">
                <animate attributeName="r" values="8;12;8" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="100" r="8" fill="#8B5CF6">
                <animate attributeName="r" values="8;12;8" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="500" cy="100" r="8" fill="#06B6D4">
                <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Data packets moving between nodes */}
              <circle cx="350" cy="70" r="3" fill="#F97316">
                <animate attributeName="cx" values="350;400;450" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="70;100;70" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="370" cy="130" r="3" fill="#F59E0B">
                <animate attributeName="cx" values="370;400;430" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="130;100;130" dur="3.5s" repeatCount="indefinite" />
              </circle>

              <text x="400" y="195" fill="#9CA3AF" fontSize="12" textAnchor="middle">
                Global connectivity enables instant communication & data sharing
              </text>
            </svg>
          </div>

          {/* Sector cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {realWorldImpact.map((item, idx) => (
              <div
                key={item.sector}
                className="bg-gray-800/70 rounded-xl p-4 border border-gray-600 hover:border-purple-400/70 hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${0.6 + idx * 0.1}s forwards`,
                  opacity: 0,
                  transform: "translateY(1rem)",
                }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-medium mb-2">{item.sector}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes & Best Practices (two column) */}
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

        {/* Tips & Tricks + Mini Checklist (two column) */}
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
          className="border border-dashed border-purple-500/50 rounded-xl p-5 bg-gray-800/20 animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards] opacity-0 translate-y-4"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-lg font-medium text-purple-300 mb-2 flex items-center gap-2">
            <span>🤔</span> Think About…
          </h3>
          <p className="text-gray-300">
            Observe carefully: How many different networks does a single WhatsApp message travel through?
            Try changing your Wi-Fi to mobile data and see if the experience changes. What does that tell
            you about network reliability?
          </p>
          <p className="text-gray-300 mt-2">
            Try this: Imagine a school without any network. How would students share files, submit
            assignments, or communicate with teachers? Compare with a school that has a well-planned
            network. What's the difference?
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards] opacity-0 translate-y-4">
          <Teacher
            note={
              "This topic is where students connect theory to their daily lives. Use real-life scenarios: ask them to list all the times they use a network in a single day. Emphasize that networking isn't just about wires; it's about enabling modern society. Encourage them to think about what would happen if the internet went down for a day – it's a powerful exercise."
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

export default Topic1;