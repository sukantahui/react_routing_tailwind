import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic19: Speed and Bandwidth
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to speed and bandwidth in networks.
 * 
 * @purpose
 * Explain the difference between speed (data rate) and bandwidth (capacity),
 * how they relate, and how to interpret ISP claims and real-world performance.
 * 
 * @usage
 * Used in networking courses after cost vs performance, to demystify common terminology.
 */

const Topic19 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is the difference between speed and bandwidth in networking?",
      a: "Bandwidth is the theoretical maximum capacity (e.g., 100 Mbps). Speed is often used interchangeably but technically refers to the actual data transfer rate (throughput). In casual use, 'internet speed' means throughput."
    },
    {
      q: "How is network speed measured?",
      a: "In bits per second (bps) – Kbps (10³), Mbps (10⁶), Gbps (10⁹), Tbps (10¹²). Note: 1 byte = 8 bits, so 100 Mbps = 12.5 MB/s (megabytes per second)."
    },
    {
      q: "Why do ISPs advertise 'up to' speeds?",
      a: "Because actual speed varies due to network congestion, distance, line quality, and time of day. 'Up to' indicates the maximum possible under ideal lab conditions."
    },
    {
      q: "What is the difference between Mbps and MB/s?",
      a: "Mbps = Megabits per second (networking). MB/s = Megabytes per second (file transfers, storage). 1 MB/s = 8 Mbps. A 100 Mbps connection downloads at ~12.5 MB/s."
    },
    {
      q: "What factors affect real-world network speed?",
      a: "Bandwidth limit, latency, packet loss, congestion, protocol overhead (TCP/IP), Wi-Fi interference, router CPU, and distance from the exchange (DSL)."
    },
    {
      q: "What is a good internet speed for a home user?",
      a: "Basic browsing/email: 10 Mbps. HD streaming: 25 Mbps. 4K streaming: 50 Mbps. Multiple users/gamers: 200+ Mbps. Upload speed matters for video calls."
    },
    {
      q: "Why does my speed test show lower results than my ISP plan?",
      a: "Wi-Fi overhead (40-60% of link rate), congestion (peak hours), distance to speed test server, older router, or background traffic (updates, streaming)."
    },
    {
      q: "What is the difference between download and upload speed?",
      a: "Download: data coming to you (web pages, video). Upload: data sent from you (video calls, file uploads). Many ISPs offer asymmetric speeds (e.g., 200 down / 20 up)."
    },
    {
      q: "How does distance affect DSL speed?",
      a: "ADSL2+ speed decreases with distance from the telephone exchange. At 500m: 24 Mbps; at 2km: 12 Mbps; at 5km: 1-2 Mbps. Fiber is not distance-sensitive."
    },
    {
      q: "What is the maximum speed of different Ethernet standards?",
      a: "Fast Ethernet: 100 Mbps, Gigabit Ethernet: 1 Gbps, 2.5GBASE-T: 2.5 Gbps, 5GBASE-T: 5 Gbps, 10GBASE-T: 10 Gbps. Fiber goes to 100 Gbps and beyond."
    },
    {
      q: "How does Wi-Fi 6 compare to Wi-Fi 5 in speed?",
      a: "Wi-Fi 5 (802.11ac): theoretical max 3.5 Gbps, real ~500 Mbps. Wi-Fi 6 (802.11ax): theoretical 9.6 Gbps, real ~1-2 Gbps. Real-world gains are modest without many clients."
    },
    {
      q: "What is the relationship between bandwidth and signal-to-noise ratio (SNR)?",
      a: "Shannon-Hartley theorem: C = B × log₂(1 + SNR). Higher SNR allows higher data rates for a given bandwidth. Noise reduces achievable speed."
    },
    {
      q: "Why do 5 GHz Wi-Fi bands offer higher speeds than 2.4 GHz?",
      a: "5 GHz has more available bandwidth (channels up to 160 MHz wide vs 20/40 MHz on 2.4 GHz) and less interference, allowing higher modulation rates (1024-QAM)."
    },
    {
      q: "What is the speed of a T1 line?",
      a: "1.544 Mbps (USA) or 2.048 Mbps (E1 in Europe). Legacy leased line for businesses, now replaced by faster Ethernet or fiber."
    },
    {
      q: "How can I improve my home network speed without upgrading the ISP plan?",
      a: "Use Ethernet instead of Wi-Fi, reposition router, change Wi-Fi channel, upgrade to a modern router, reduce interference, update firmware, and limit background apps."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      {/* Inline keyframes for reveal animations */}
      <style>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fill-speed {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fade-up {
          animation: fade-up 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
          svg * {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="animate-fade-up space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Speed and Bandwidth
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            What does "internet speed" really mean? Clearing the confusion.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When your ISP says "200 Mbps", is that speed or bandwidth? In everyday language, they're mixed up. 
            This topic clarifies the distinction, explains how speed is measured (bits vs bytes), and shows 
            why your "200 Mbps" connection rarely delivers 200 Mbps. You'll learn to interpret speed test 
            results, choose the right plan, and troubleshoot slow connections.
          </p>
        </div>

        {/* SVG Illustration: Speedometer vs Pipe */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">🚀 Speed vs Bandwidth: The Analogy</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="220" viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="800" height="220" fill="none" />
              
              {/* Speedometer (left) */}
              <g transform="translate(60, 20)">
                <circle cx="100" cy="80" r="70" fill="none" stroke="#cbd5e1" strokeWidth="10" />
                <path d="M 100 80 L 160 40" stroke="#ef4444" strokeWidth="4" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 100 80" to="120 100 80" dur="3s" repeatCount="indefinite" />
                </path>
                <circle cx="100" cy="80" r="8" fill="#ef4444" />
                <text x="100" y="165" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ef4444">Speed</text>
                <text x="100" y="180" textAnchor="middle" fontSize="11" fill="#475569">(data rate)</text>
              </g>
              
              {/* Pipe (right) */}
              <g transform="translate(420, 20)">
                <text x="150" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3b82f6">Bandwidth (Capacity)</text>
                <rect x="0" y="40" width="300" height="60" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="3" rx="6" />
                <rect x="0" y="40" width="180" height="60" fill="#3b82f6" opacity="0.5" rx="6">
                  <animate attributeName="width" values="100;250;100" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="150" y="75" textAnchor="middle" fontSize="12" fill="#1e3a8a">200 Mbps max</text>
                <text x="150" y="120" textAnchor="middle" fontSize="11" fill="#475569">Actual flow = throughput</text>
              </g>
              
              {/* Bottom note */}
              <text x="400" y="215" textAnchor="middle" fontSize="11" fill="#6b7280">Speed = how fast data moves | Bandwidth = how much can move at once</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Speed is like the velocity of individual bits; bandwidth is like the width of the pipe.
          </p>
        </div>

        {/* Key Concepts: Bits vs Bytes, Download vs Upload */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">📏 Bits vs Bytes – Critical Distinction</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              <strong>1 byte = 8 bits</strong>. Network speeds are always in <strong>bits per second</strong> (Mbps, Gbps). 
              File sizes are in <strong>bytes</strong> (MB, GB). A 100 Mbps connection downloads a 100 MB file in:
            </p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded text-center">
              <code className="text-sm">100 MB = 800 Megabits → 800 / 100 = 8 seconds (theoretical)</code>
            </div>
            <p className="text-xs text-gray-500 mt-2">✨ <strong>Tip:</strong> Divide Mbps by 8 to get MB/s. 200 Mbps = 25 MB/s.</p>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">⬇️ Download vs Upload Speed</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Download:</strong> Data coming to you (web, streaming, gaming). Usually higher.</li>
              <li><strong>Upload:</strong> Data you send (video calls, file uploads, cloud backups). Often lower.</li>
              <li><strong>Asymmetric:</strong> Cable/DSL – e.g., 200 down / 20 up.</li>
              <li><strong>Symmetric:</strong> Fiber – e.g., 500 down / 500 up (better for video conferencing).</li>
            </ul>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <p>In <strong>Barrackpore</strong>, Susmita upgraded from cable (200/20) to fiber (200/200) – her Zoom calls stopped lagging because upload was the bottleneck.</p>
            </div>
          </div>
        </div>

        {/* Speed Tier Recommendations */}
        <div className="animate-fade-up bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold">🏠 Recommended Internet Speeds by Usage</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-blue-600">10-25 Mbps</span>
              <ul className="list-disc pl-4 mt-1">
                <li>1-2 users</li>
                <li>Email, browsing</li>
                <li>SD/HD streaming</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-blue-600">50-100 Mbps</span>
              <ul className="list-disc pl-4 mt-1">
                <li>3-5 users</li>
                <li>4K streaming (1-2 streams)</li>
                <li>Zoom calls</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-blue-600">200-500 Mbps</span>
              <ul className="list-disc pl-4 mt-1">
                <li>5-10 users</li>
                <li>Multiple 4K streams</li>
                <li>Online gaming</li>
                <li>Large downloads</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-blue-600">1 Gbps+</span>
              <ul className="list-disc pl-4 mt-1">
                <li>10+ users</li>
                <li>VR, cloud gaming</li>
                <li>Prosumer / small office</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Speed Test Explanation */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-xl p-5 shadow-md">
          <h3 className="text-xl font-bold">📱 Understanding Speed Test Results</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Ping (Latency)</span>
              <p>Time for a packet to go to server and back. Under 20 ms = excellent. 20-50 ms = good. Over 100 ms = noticeable lag.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Download Speed</span>
              <p>Your connection's ability to receive data. Compare to your ISP plan. If much lower, troubleshoot.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Upload Speed</span>
              <p>Your ability to send data. Critical for video calls, cloud backups. Should be at least 10 Mbps for good Zoom quality.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 <strong>Tip:</strong> Run speed tests on Ethernet (not Wi-Fi) to measure true ISP speed. Wi-Fi adds overhead and interference.</p>
        </div>

        {/* Factors Affecting Real-World Speed */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Why Your Speed Never Matches the Advertised Rate</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Protocol overhead:</strong> TCP/IP headers (5-10% loss).</li>
              <li><strong>Wi-Fi inefficiency:</strong> Half-duplex, contention, retransmissions → 40-60% of link rate.</li>
              <li><strong>Network congestion:</strong> Peak hours (7-11 PM) reduce speeds.</li>
              <li><strong>Distance:</strong> DSL slows with distance; Wi-Fi weakens with walls.</li>
              <li><strong>Old equipment:</strong> Router with 100 Mbps ports can't deliver 200 Mbps.</li>
              <li><strong>Background traffic:</strong> Updates, streaming, cloud backups.</li>
              <li><strong>ISP throttling:</strong> Some ISPs slow certain traffic (video, P2P).</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ How to Get the Speed You Pay For</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use Ethernet instead of Wi-Fi for critical devices.</li>
              <li>Upgrade to a modern router (Wi-Fi 6, Gigabit ports).</li>
              <li>Test at different times of day; if consistently low, contact ISP.</li>
              <li>Reduce number of connected devices or upgrade your plan.</li>
              <li>Update router firmware and use QoS to prioritize traffic.</li>
              <li>Check for duplex mismatch or faulty cables.</li>
            </ul>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Speed Optimization)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Use a wired connection for gaming and video calls</strong> – eliminates Wi-Fi variability.</li>
              <li><strong>Enable hardware offloading</strong> (TSO, LRO) on your NIC to reduce CPU load.</li>
              <li><strong>Change DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8)</strong> – faster resolution, not bandwidth.</li>
              <li><strong>Monitor per-device speed</strong> using router QoS stats – find bandwidth hogs.</li>
              <li><strong>For large file transfers, use multiple parallel connections</strong> (e.g., in download managers).</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Confusing Mbps with MB/s – expecting 100 MB/s from a 100 Mbps connection.</li>
              <li>Testing Wi-Fi speed and blaming ISP – Wi-Fi is often the bottleneck.</li>
              <li>Assuming higher speed always means better experience – latency matters more for gaming.</li>
              <li>Forgetting that upload speed is half of download on many plans.</li>
              <li>Using old Cat5 cable (100 Mbps max) on a Gigabit connection.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Speed Management</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Run a baseline speed test when your network is idle to know your true ISP speed.</li>
            <li>Document speed test results over time to identify patterns (e.g., evening slowdown).</li>
            <li>For critical applications, use a wired connection or a dedicated access point.</li>
            <li>Keep router firmware updated and reboot weekly to clear memory leaks.</li>
            <li>If you consistently get less than 80% of your plan's speed, contact your ISP.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Differentiate speed vs bandwidth vs throughput</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Convert Mbps to MB/s (divide by 8)</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ List 3 factors affecting real-world speed</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain why upload speed matters for video calls</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Interpret a speed test result (ping, download, upload)</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Students are constantly confused by Mbps vs MB/s. I always do a live demo: download a 100 MB file on a 100 Mbps connection and time it – it takes ~8 seconds, not 1 second. Also, emphasize that 'speed' is a marketing term; technically, it's data rate. For exams, they must be able to convert between bits and bytes and explain why Wi-Fi speed is lower than the link rate. Use the water pipe analogy: bandwidth = pipe diameter, speed = water velocity, throughput = actual flow."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Speed and Bandwidth</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-blue-700 dark:text-blue-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-blue-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">🚀 Next: Reliability and noise resistance (Topic 20).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          🚀 Topic 19: Speed and Bandwidth — Next: Reliability and Noise Resistance (Topic 20)
        </div>
      </div>
    </div>
  );
};

export default Topic19;