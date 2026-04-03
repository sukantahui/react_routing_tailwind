import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic14: Latency – Delay in Transmission
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to network latency.
 * 
 * @purpose
 * Explain the concept of latency (delay) in network communication, its four components,
 * how to measure it, and its impact on application performance.
 * 
 * @usage
 * Used in networking courses after bandwidth, to complete the performance picture.
 */

const Topic14 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is latency in networking?",
      a: "Latency is the time delay between a sender transmitting data and the receiver receiving it. It is usually measured in milliseconds (ms) and can be one-way or round-trip (RTT)."
    },
    {
      q: "What are the four components of total latency?",
      a: "1) Propagation delay (speed of light/distance), 2) Transmission delay (time to put bits on wire), 3) Queuing delay (waiting in router buffers), 4) Processing delay (router CPU)."
    },
    {
      q: "What is the difference between one-way latency and round-trip time (RTT)?",
      a: "One-way latency is from sender to receiver. RTT includes the return path (sender → receiver → sender). RTT is what ping measures and is typically double the one-way delay plus processing."
    },
    {
      q: "How does distance affect propagation delay?",
      a: "Propagation delay = distance / speed of signal. In fiber/copper, signal travels at ~2×10⁸ m/s (2/3 speed of light). A 10,000 km fiber link has ~50 ms one-way propagation delay."
    },
    {
      q: "What is the typical latency of a GEO satellite link?",
      a: "One-way latency ≈ 250 ms (35,786 km up + down at speed of light). RTT ≈ 500–600 ms. This makes real-time gaming and VoIP poor over GEO."
    },
    {
      q: "What is a 'low latency' network?",
      a: "Typically < 1 ms for LAN, < 10 ms for metro fiber, < 30 ms for cross-country fiber. High-frequency trading demands < 1 ms RTT between exchanges."
    },
    {
      q: "How do you measure network latency?",
      a: "Using ping (ICMP echo) to measure RTT. Also traceroute shows per-hop latency. Advanced tools: iperf with latency test, MTR (continuous ping + trace)."
    },
    {
      q: "What is the difference between latency and jitter?",
      a: "Latency is the average delay. Jitter is the variation in delay between packets. High jitter is more harmful to real-time applications than high constant latency."
    },
    {
      q: "Why does latency matter for TCP throughput?",
      a: "TCP throughput ≈ (window size) / (RTT). For a fixed window size, higher RTT reduces throughput. This is why long-distance links need large TCP windows (window scaling)."
    },
    {
      q: "What is the speed of light delay in fiber optic cable?",
      a: "Light in vacuum: 300,000 km/s. In fiber (refractive index ~1.5), speed ≈ 200,000 km/s. So 5 μs per km. A 1000 km link has 5 ms one-way propagation delay."
    },
    {
      q: "What is 'bufferbloat'?",
      a: "Excessively large router buffers that cause high queuing delay under load. Even with low bandwidth utilization, latency can spike to seconds. Solved by AQM (e.g., CoDel, PIE)."
    },
    {
      q: "How does Wi-Fi add latency compared to Ethernet?",
      a: "Wi-Fi has CSMA/CA contention, retransmissions, and airtime contention. Typical Wi-Fi RTT: 2–10 ms (unloaded) but can spike to 100+ ms under interference. Ethernet is < 0.5 ms."
    },
    {
      q: "What is an acceptable latency for online gaming?",
      a: "Below 50 ms: excellent. 50–100 ms: good. 100–150 ms: playable for casual. Above 150 ms: noticeable lag. Above 300 ms: unplayable for fast-paced games."
    },
    {
      q: "What is the latency of 5G networks?",
      a: "5G URLLC (ultra-reliable low latency) targets 1 ms over the air. Typical 5G RTT: 10–20 ms including backhaul. 4G LTE: 30–50 ms."
    },
    {
      q: "How does light travel slower in fiber than in vacuum?",
      a: "The refractive index of glass (~1.5) slows light: v = c / n. So 300,000 / 1.5 = 200,000 km/s. This adds ~50% more delay compared to vacuum."
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
        @keyframes move-bit {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(300px); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Latency: Delay in Transmission
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-amber-500 pl-4">
            The hidden killer of real-time applications – it's not just about bandwidth.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You can have a 1 Gbps fiber connection, but if your latency is 500 ms, video calls will be painful 
            and gaming impossible. Latency is the time data takes to travel from source to destination. 
            Understanding its components (propagation, transmission, queuing, processing) helps you diagnose 
            slow applications, choose the right ISP, and optimize real-time services.
          </p>
        </div>

        {/* SVG Illustration: Four Components of Latency */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">⏱️ The Four Latency Components</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="260" viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="260" fill="none" />
              
              {/* Sender and Receiver */}
              <rect x="30" y="110" width="70" height="40" fill="#3b82f6" rx="6" />
              <text x="65" y="135" textAnchor="middle" fill="white" fontSize="12">Sender</text>
              <rect x="800" y="110" width="70" height="40" fill="#ef4444" rx="6" />
              <text x="835" y="135" textAnchor="middle" fill="white" fontSize="12">Receiver</text>
              
              {/* Path line */}
              <line x1="100" y1="130" x2="800" y2="130" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
              
              {/* Propagation Delay label */}
              <text x="420" y="110" textAnchor="middle" fontSize="12" fill="#0d9488">Propagation Delay</text>
              <text x="420" y="155" textAnchor="middle" fontSize="10" fill="#475569">(distance / speed of signal)</text>
              
              {/* Transmission Delay (serialization) */}
              <g transform="translate(100, 40)">
                <rect x="0" y="0" width="80" height="30" fill="#f59e0b" rx="4" />
                <text x="40" y="20" textAnchor="middle" fontSize="11" fill="white">TX Delay</text>
                <text x="40" y="45" textAnchor="middle" fontSize="10" fill="#475569">bits on wire</text>
              </g>
              
              {/* Queuing Delay */}
              <g transform="translate(350, 40)">
                <rect x="0" y="0" width="80" height="30" fill="#8b5cf6" rx="4" />
                <text x="40" y="20" textAnchor="middle" fontSize="11" fill="white">Queuing</text>
                <text x="40" y="45" textAnchor="middle" fontSize="10" fill="#475569">wait in buffer</text>
              </g>
              
              {/* Processing Delay */}
              <g transform="translate(620, 40)">
                <rect x="0" y="0" width="80" height="30" fill="#ec489a" rx="4" />
                <text x="40" y="20" textAnchor="middle" fontSize="11" fill="white">Processing</text>
                <text x="40" y="45" textAnchor="middle" fontSize="10" fill="#475569">router CPU</text>
              </g>
              
              {/* Animated packet */}
              <circle r="8" fill="#facc15">
                <animate attributeName="cx" values="100;800" dur="4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="130;130" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Total Latency = Propagation + Transmission + Queuing + Processing
          </p>
        </div>

        {/* Detailed Component Cards */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">🕒 Propagation Delay</h3>
            <p className="mt-1 text-sm"><strong>Formula:</strong> distance / speed of signal</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Determined by physics (speed of light). For fiber/copper: ~200,000 km/s. For wireless: speed of light in air (~300,000 km/s).</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Examples:</strong><br />
              - New York to London (5,500 km fiber): ~27.5 ms one-way<br />
              - GEO satellite (71,500 km round): ~238 ms one-way
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">📦 Transmission (Serialization) Delay</h3>
            <p className="mt-1 text-sm"><strong>Formula:</strong> packet size (bits) / link rate (bps)</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Time to push all bits of a packet onto the wire. Larger packets or slower links increase this delay.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Example:</strong> 1500 byte packet (12,000 bits) on 100 Mbps link = 12,000 / 100,000,000 = 0.12 ms.
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">🚦 Queuing Delay</h3>
            <p className="mt-1 text-sm">Time packets wait in router buffers before being transmitted.</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Varies with network congestion. Can be near zero on idle links or seconds during overload (bufferbloat).</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Tip:</strong> Use active queue management (AQM like CoDel) to keep queuing delay low.
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">⚙️ Processing Delay</h3>
            <p className="mt-1 text-sm">Time routers/switches take to examine packet headers, make forwarding decisions, update TTL, compute checksums.</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Typically microseconds to milliseconds per hop. High-end routers process millions of packets per second.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Observation:</strong> Software routers (PC-based) have higher processing delay than ASIC-based hardware routers.
            </div>
          </div>
        </div>

        {/* Real-World Impact: Gaming, VoIP, Trading */}
        <div className="animate-fade-up bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
          <h3 className="text-xl font-bold">🎮 Real-World: Why Latency Matters</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold text-red-600">Online Gaming</span>
              <p className="mt-1">Twitch reflexes need &lt;50 ms RTT. Above 150 ms, you'll lose firefights. A 300 ms satellite link is unplayable.</p>
              <p className="text-xs text-gray-500 mt-1">Example: Debangshu in <strong>Barrackpore</strong> plays Valorant – he switched from Wi-Fi (30 ms) to Ethernet (5 ms) and ranked up.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold text-red-600">Video Conferencing</span>
              <p className="mt-1">High latency causes awkward turn-taking and delays. RTT &gt;300 ms makes conversation painful. Jitter is even worse.</p>
              <p className="text-xs text-gray-500 mt-1">Solution: Use wired connections, avoid satellite, enable QoS for VoIP.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold text-red-600">High-Frequency Trading</span>
              <p className="mt-1">Firms pay millions for microsecond improvements. Microwave links (faster than fiber) between Chicago and New York save 4 ms.</p>
              <p className="text-xs text-gray-500 mt-1">1 ms advantage = $100M+ per year in arbitrage.</p>
            </div>
          </div>
        </div>

        {/* Latency vs Bandwidth (Important distinction) */}
        <div className="animate-fade-up bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🔄 Latency vs Bandwidth – Which Matters More?</h3>
          <p className="mt-2">It depends on the application:</p>
          <ul className="list-disc pl-5 mt-1">
            <li><strong>Large file download:</strong> Bandwidth matters more (more Mbps = faster). Latency has minor impact after TCP window scaling.</li>
            <li><strong>Web browsing (many small objects):</strong> Latency matters greatly because each object requires a new RTT (especially with HTTP/1.1).</li>
            <li><strong>VoIP / Gaming:</strong> Latency and jitter are critical; bandwidth over 1 Mbps is usually sufficient.</li>
            <li><strong>Interactive SSH / remote desktop:</strong> Low latency is essential; keystrokes need fast echo.</li>
          </ul>
          <p className="mt-2 text-sm bg-white dark:bg-gray-800 p-2 rounded">✨ <strong>Analogy:</strong> Bandwidth = width of a pipe; Latency = length of the pipe. A long, wide pipe (high bandwidth, high latency) is fine for bulk water (file download). A short, narrow pipe (low latency, low bandwidth) is fine for a sip (gaming).</p>
        </div>

        {/* Measurement Tools */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold">📏 How to Measure Latency</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1">ping google.com</code> – basic RTT, packet loss.</li>
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1">traceroute google.com</code> – per-hop latency.</li>
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1">mtr google.com</code> (My Traceroute) – continuous ping + trace.</li>
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1">iperf3 -u -l 1000 -b 10M -t 10</code> – UDP test for jitter/loss.</li>
              <li>Online tools: speedtest.net (shows latency), cloudping.co (AWS latency).</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold">🐌 Common Causes of High Latency</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Geographic distance (e.g., intercontinental links).</li>
              <li>Satellite or long-haul wireless (fixed high propagation delay).</li>
              <li>Congested router queues (bufferbloat) – often the culprit.</li>
              <li>Slow DNS resolution (adds latency before connection).</li>
              <li>Overloaded Wi-Fi (collisions, retransmissions).</li>
              <li>VPN or proxy encryption overhead.</li>
            </ul>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Latency Optimization)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Use CDNs:</strong> Content Delivery Networks bring data closer to users, reducing propagation delay.</li>
              <li><strong>Enable TCP BBR:</strong> Google's congestion control handles high latency links better than Cubic.</li>
              <li><strong>Prioritize ACKs:</strong> In QoS, give TCP ACK packets high priority to reduce RTT.</li>
              <li><strong>Avoid deep buffers:</strong> Configure routers with small buffers and AQM (CoDEL, PIE).</li>
              <li><strong>For global teams:</strong> Use region-specific load balancers to minimize cross-continent traffic.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Measuring latency over Wi-Fi and blaming the ISP – test with wired first.</li>
              <li>Ignoring latency under load (idle ping may be 10ms, but during download spikes to 500ms).</li>
              <li>Assuming all latency is propagation – often queuing delay dominates.</li>
              <li>Confusing RTT (round-trip) with one-way delay (critical for video pacing).</li>
              <li>Forgetting that DNS adds latency before any data transfer.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Latency-Sensitive Applications</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Run continuous latency monitoring (Smokeping, PRTG) to detect spikes.</li>
            <li>For real-time apps, use UDP with forward error correction instead of TCP (no retransmission delay).</li>
            <li>Place servers geographically close to users (edge computing).</li>
            <li>Use HTTP/2 or HTTP/3 (QUIC) to reduce connection setup latency.</li>
            <li>Implement client-side prediction for games to mask latency.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define latency and its four components</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain propagation vs transmission delay</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Measure RTT using ping</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Differentiate latency from bandwidth</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify when latency matters more than bandwidth</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Latency is often overlooked by beginners who obsess over bandwidth. Use real demos: ping a local server (1ms) vs a server in another continent (200ms). Ask students why video calls feel 'laggy' on satellite internet. Explain the speed of light limit – no amount of money can make bits travel faster than light. Also, demonstrate bufferbloat: start a download and ping simultaneously – show how latency skyrockets. This is eye-opening. For exams, they must be able to calculate propagation delay given distance and speed of signal."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Latency</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-amber-700 dark:text-amber-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-amber-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">⏱️ Next: Throughput (Topic 15) – actual transfer rate.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          ⏱️ Topic 14: Latency — Next: Throughput (Topic 15)
        </div>
      </div>
    </div>
  );
};

export default Topic14;