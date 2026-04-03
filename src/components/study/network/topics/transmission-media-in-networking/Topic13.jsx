import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic13: Bandwidth – Data Carrying Capacity
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to bandwidth.
 * 
 * @purpose
 * Explain the concept of bandwidth as the maximum data carrying capacity of a channel,
 * its measurement (Hz vs bps), analogies, and factors affecting it.
 * 
 * @usage
 * Used in networking courses after performance metrics, as a deeper dive into the most
 * commonly quoted (and misunderstood) metric.
 */

const Topic13 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is bandwidth in the context of networking?",
      a: "Bandwidth is the maximum theoretical data transfer rate of a network channel, measured in bits per second (bps). It represents the capacity of the channel, not the actual speed."
    },
    {
      q: "What is the difference between bandwidth in Hz and bandwidth in bps?",
      a: "Bandwidth in Hz is the range of frequencies a channel can carry (analog). Bandwidth in bps is the digital data rate. For a given modulation scheme, higher Hz bandwidth allows higher bps (Shannon-Hartley theorem)."
    },
    {
      q: "How is bandwidth related to throughput?",
      a: "Bandwidth is the theoretical maximum capacity. Throughput is the actual measured transfer rate, always lower due to overhead, congestion, errors, and protocol inefficiencies."
    },
    {
      q: "What is the typical bandwidth of a fiber optic cable?",
      a: "Single-mode fiber can carry 100 Gbps to 1 Tbps per wavelength, with DWDM achieving tens of Tbps. Practical links today: 10 Gbps, 40 Gbps, 100 Gbps, 400 Gbps."
    },
    {
      q: "Why is bandwidth often 'shared' in networks?",
      a: "In shared media (Wi-Fi, cable modem), multiple users compete for the same total bandwidth. Your effective bandwidth decreases as more users become active."
    },
    {
      q: "What does 'symmetric bandwidth' mean?",
      a: "Symmetric bandwidth means equal upload and download speeds (e.g., fiber: 500 Mbps up/down). Asymmetric (e.g., cable/DOCSIS) has faster download than upload."
    },
    {
      q: "What factors limit bandwidth in a communication channel?",
      a: "Channel physical properties (twisted pair limited to ~1 GHz), modulation technique (QAM, OFDM), signal-to-noise ratio (SNR), and regulatory constraints."
    },
    {
      q: "What is the Shannon-Hartley theorem?",
      a: "C = B × log₂(1 + SNR). It states the maximum possible data rate (C) over a channel with bandwidth B (Hz) and signal-to-noise ratio SNR. This is the theoretical upper bound."
    },
    {
      q: "Why do ISPs advertise 'up to' bandwidth?",
      a: "'Up to' indicates the maximum possible under ideal conditions. Actual bandwidth varies due to network congestion, distance, line quality, and time of day."
    },
    {
      q: "What is the difference between committed information rate (CIR) and peak information rate (PIR)?",
      a: "CIR is the guaranteed minimum bandwidth. PIR is the maximum burstable bandwidth. Used in leased lines and business internet."
    },
    {
      q: "How does distance affect bandwidth in DSL?",
      a: "DSL uses twisted pair; signal attenuation increases with distance. Attenuation reduces SNR, which reduces maximum possible bandwidth per Shannon. ADSL2+ at 500m gives ~24 Mbps; at 5km, only ~1-2 Mbps."
    },
    {
      q: "What is bandwidth throttling?",
      a: "Intentional reduction of bandwidth by an ISP or network administrator, often to manage congestion, enforce fair use, or prioritize certain traffic (e.g., video streaming may be throttled)."
    },
    {
      q: "What does 'bandwidth hog' mean?",
      a: "A user or application that consumes a disproportionate share of available bandwidth, affecting others on a shared link (e.g., BitTorrent, 4K streaming)."
    },
    {
      q: "How is bandwidth measured in practice?",
      a: "Tools like iperf3 (TCP/UDP throughput test), speedtest.net, or simply downloading a large file and measuring time. Note: these measure throughput, not theoretical bandwidth."
    },
    {
      q: "What is the relationship between bandwidth and latency?",
      a: "Bandwidth and latency are independent. A link can have high bandwidth but high latency (e.g., satellite broadband: 50 Mbps down, 600 ms RTT). Both affect performance depending on application."
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
        @keyframes fill-pipe {
          0% { width: 0%; opacity: 0.5; }
          100% { width: 100%; opacity: 1; }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Bandwidth: Data Carrying Capacity
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
            Not just 'speed' – it's the width of your data pipeline.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When your ISP advertises "200 Mbps", they're selling bandwidth – the maximum theoretical rate 
            your connection can handle. But bandwidth is often misunderstood. It's not the speed of each bit 
            (that's latency), but how many bits can be sent per second. Think of it as the number of lanes on 
            a highway, not the speed limit. This topic explains bandwidth from first principles, its measurement, 
            limitations, and real-world implications.
          </p>
        </div>

        {/* SVG Illustration: Bandwidth as Pipe (Analogies) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">🚰 The Pipe Analogy (Bandwidth vs Throughput)</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="220" viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="220" fill="none" />
              
              {/* Narrow pipe (low bandwidth) */}
              <g transform="translate(50, 30)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#2563eb">Low Bandwidth (Narrow Pipe)</text>
                <rect x="0" y="15" width="40" height="60" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" rx="4" />
                <rect x="0" y="15" width="40" height="20" fill="#3b82f6" opacity="0.6">
                  <animate attributeName="height" values="20;60;20" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="20" y="90" textAnchor="middle" fontSize="12">1 lane</text>
                <text x="20" y="105" textAnchor="middle" fontSize="11" fill="#475569">10 Mbps</text>
              </g>
              
              {/* Wide pipe (high bandwidth) */}
              <g transform="translate(450, 30)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#2563eb">High Bandwidth (Wide Pipe)</text>
                <rect x="0" y="15" width="200" height="60" fill="#bfdbfe" stroke="#2563eb" strokeWidth="3" rx="4" />
                <rect x="0" y="15" width="200" height="40" fill="#3b82f6" opacity="0.6">
                  <animate attributeName="height" values="40;60;40" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="100" y="90" textAnchor="middle" fontSize="12">4+ lanes</text>
                <text x="100" y="105" textAnchor="middle" fontSize="11" fill="#475569">1 Gbps</text>
              </g>
              
              {/* Bottleneck illustration */}
              <g transform="translate(200, 150)">
                <text x="0" y="0" fontSize="12" fill="#dc2626">Bottleneck: smallest bandwidth in path determines overall rate</text>
                <rect x="0" y="10" width="300" height="30" fill="#fecaca" stroke="#dc2626" strokeWidth="2" rx="4" />
                <rect x="0" y="10" width="80" height="30" fill="#ef4444" opacity="0.5" rx="4" />
                <text x="150" y="30" textAnchor="middle" fontSize="11" fill="#991b1b">Wi-Fi bottleneck (300 Mbps) → limits 1 Gbps fiber</text>
              </g>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Narrow pipe = low bandwidth | Wide pipe = high bandwidth | Bottleneck = slowest link in the path
          </p>
        </div>

        {/* Key Concepts: Bandwidth in Hz vs bps */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">📡 Bandwidth (Analog – Hz)</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">In analog communication, bandwidth is the range of frequencies a channel can carry. For example, human voice requires ~4 kHz (300 Hz to 3.4 kHz). Coaxial cable might have 1 GHz bandwidth.</p>
            <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Shannon-Hartley:</strong> C = B × log₂(1 + SNR)<br />
              Higher Hz bandwidth (B) allows higher data rate (C) for a given SNR.
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">💻 Bandwidth (Digital – bps)</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">In networking, bandwidth is the maximum bits per second (bps). Common prefixes: Kbps (10³), Mbps (10⁶), Gbps (10⁹), Tbps (10¹²).</p>
            <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Examples:</strong><br />
              - Ethernet: 10 Mbps, 100 Mbps, 1 Gbps, 10 Gbps<br />
              - Wi-Fi 6: up to 9.6 Gbps<br />
              - Fiber (DWDM): > 100 Tbps
            </div>
          </div>
        </div>

        {/* Real-World Bandwidth Examples (What each can do) */}
        <div className="animate-fade-up bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold">🌐 Real-World: How Much Bandwidth Do You Need?</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">1–5 Mbps</span>
              <ul className="list-disc pl-4 mt-1 text-gray-600 dark:text-gray-400">
                <li>Email, browsing</li>
                <li>SD video streaming</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">10–25 Mbps</span>
              <ul className="list-disc pl-4 mt-1 text-gray-600 dark:text-gray-400">
                <li>HD video (Netflix)</li>
                <li>Zoom/Skype (1:1)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">50–200 Mbps</span>
              <ul className="list-disc pl-4 mt-1 text-gray-600 dark:text-gray-400">
                <li>4K streaming</li>
                <li>Multiple users/devices</li>
                <li>Gaming downloads</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">500+ Mbps</span>
              <ul className="list-disc pl-4 mt-1 text-gray-600 dark:text-gray-400">
                <li>Home office + family</li>
                <li>VR, cloud backups</li>
                <li>8K streaming</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">✨ <strong>Student story:</strong> In <strong>Ichapur</strong>, Debangshu's family of 5 upgraded from 50 Mbps to 200 Mbps. Now they can stream 4K, game, and do video calls simultaneously without buffering.</p>
        </div>

        {/* Factors Affecting Bandwidth + Shannon Theorem Card */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold">⚙️ Factors Limiting Bandwidth</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Physical medium:</strong> Twisted pair (limited to ~1 GHz), fiber (virtually unlimited in theory).</li>
              <li><strong>Distance:</strong> Longer distance = more attenuation = lower SNR = lower bandwidth (Shannon).</li>
              <li><strong>Noise/Interference:</strong> Reduces SNR, directly reducing achievable data rate.</li>
              <li><strong>Modulation scheme:</strong> Higher-order QAM packs more bits per symbol (but requires higher SNR).</li>
              <li><strong>Regulation:</strong> Licensed spectrum limits how much bandwidth you can use.</li>
              <li><strong>Network equipment:</strong> Router/switch CPU can become bottleneck.</li>
            </ul>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 border-l-4 border-indigo-500">
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">📐 Shannon-Hartley Theorem (Theoretical Max)</h3>
            <p className="mt-1 font-mono text-lg">C = B × log₂(1 + SNR)</p>
            <p className="mt-2 text-sm">Where:</p>
            <ul className="list-disc pl-5 text-sm">
              <li>C = Maximum channel capacity (bps)</li>
              <li>B = Bandwidth in Hz</li>
              <li>SNR = Signal-to-Noise Ratio (linear, not dB)</li>
            </ul>
            <p className="mt-2 text-sm bg-white dark:bg-gray-800 p-2 rounded">Example: Telephone line with B = 3 kHz, SNR = 30 dB (1000 linear). C = 3000 × log₂(1001) ≈ 3000 × 10 = 30,000 bps (30 kbps). This is why 56k modems were the limit.</p>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Bandwidth Optimization)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>QoS (Quality of Service):</strong> Prioritize critical traffic (VoIP, video) over bulk downloads.</li>
              <li><strong>Traffic shaping:</strong> Limit P2P or streaming to prevent bandwidth hogs.</li>
              <li><strong>Link aggregation:</strong> Combine multiple physical links (e.g., 2×1 Gbps = 2 Gbps logical).</li>
              <li><strong>Use wired over wireless</strong> where possible – Wi-Fi halves effective bandwidth due to half-duplex + overhead.</li>
              <li><strong>Measure during peak hours</strong> to know real available bandwidth.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Assuming bandwidth = speed (latency). A 100 Mbps satellite link feels slow for gaming because of 600 ms latency.</li>
              <li>Thinking bandwidth is always symmetric – cable/DSL often have slower uploads.</li>
              <li>Buying more bandwidth than needed without checking the bottleneck (e.g., 1 Gbps internet but old 100 Mbps router).</li>
              <li>Confusing Mbps (megabits) with MB/s (megabytes) – 8× difference.</li>
              <li>Trusting ISP "up to" numbers without testing actual throughput.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Mini Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Bandwidth Management</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Conduct a bandwidth audit – identify top talkers and applications.</li>
            <li>Set per-user or per-application limits to ensure fairness.</li>
            <li>Use caching proxies (e.g., Squid) to reduce redundant downloads.</li>
            <li>For remote sites, implement WAN optimization (deduplication, compression).</li>
            <li>Monitor bandwidth usage with tools like PRTG, Zabbix, or ntopng.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define bandwidth (digital vs analog)</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain Shannon-Hartley theorem</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Differentiate bandwidth from throughput</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name 3 factors limiting bandwidth</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Calculate approximate bandwidth needed for 4K streaming</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Bandwidth is the most misused term. Students say 'my bandwidth is slow' when they mean latency or throughput. Emphasize the pipe analogy: bandwidth = width, latency = length. Use the Shannon theorem to explain why copper lines max out at ~1 Gbps but fiber goes to Tbps. Real-world debugging: when a user complains about slow internet, first test throughput (speedtest), then check for congestion (high utilization), then measure latency/packet loss. Also, clarify Mbps vs MBps – a 100 Mbps connection downloads at ~12.5 MB/s."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Bandwidth</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-blue-700 dark:text-blue-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-blue-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📡 Next: Latency (Topic 14) – the other half of performance.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📡 Topic 13: Bandwidth — Next: Latency (Topic 14)
        </div>
      </div>
    </div>
  );
};

export default Topic13;