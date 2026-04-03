import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic15: Throughput – Actual Data Transfer Rate
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to network throughput.
 * 
 * @purpose
 * Explain throughput as the actual measured data transfer rate, differentiate from bandwidth,
 * list factors affecting throughput, and show measurement tools and optimization techniques.
 * 
 * @usage
 * Used in networking courses after bandwidth and latency, to complete the performance trilogy.
 */

const Topic15 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is throughput in networking?",
      a: "Throughput is the actual rate at which data is successfully transferred from source to destination, measured in bits per second (bps) or bytes per second (B/s). It is always lower than or equal to the theoretical bandwidth."
    },
    {
      q: "What is the difference between bandwidth and throughput?",
      a: "Bandwidth is the theoretical maximum capacity of a channel. Throughput is the actual measured transfer rate, which is reduced by overhead, congestion, errors, retransmissions, and protocol inefficiencies."
    },
    {
      q: "What factors affect throughput?",
      a: "Network congestion, protocol overhead (TCP/IP headers), packet loss (causing retransmissions), latency (TCP window limitation), link errors (CRC), interference (wireless), and application behavior."
    },
    {
      q: "How do you measure network throughput?",
      a: "Using iperf3 (TCP/UDP throughput test), speedtest.net, or simply transferring a large file and dividing size by time. For accuracy, test with multiple parallel streams."
    },
    {
      q: "Why is Wi-Fi throughput much lower than its signaling rate?",
      a: "Wi-Fi has half-duplex operation (cannot send and receive simultaneously), CSMA/CA contention, management frames, retransmissions, and protocol overhead. Real throughput is typically 40-60% of PHY rate."
    },
    {
      q: "What is goodput?",
      a: "Goodput is throughput excluding protocol overhead (headers, retransmissions). It's the actual application-level data rate. For example, a 100 Mbps TCP stream might have 95 Mbps throughput but 90 Mbps goodput after TCP/IP headers."
    },
    {
      q: "How does packet loss affect TCP throughput?",
      a: "TCP interprets loss as congestion and halves its congestion window. Even 1% loss can reduce throughput by 50-90%, especially on high-latency links."
    },
    {
      q: "What is the relationship between RTT and TCP throughput?",
      a: "TCP throughput ≈ (congestion window size) / (RTT). For a fixed window, higher RTT reduces throughput. This is why window scaling (RFC 1323) is essential for long-distance high-bandwidth links."
    },
    {
      q: "What is the difference between TCP and UDP throughput?",
      a: "TCP throughput is limited by congestion control and loss recovery. UDP throughput can saturate a link but is unreliable. UDP is used for real-time apps where occasional loss is acceptable (VoIP, video streaming)."
    },
    {
      q: "How can you improve throughput on a high-latency link?",
      a: "Increase TCP window size (window scaling), use multiple parallel TCP connections, enable TSO (TCP Segmentation Offload) on NIC, use a modern congestion control algorithm (BBR, Copa)."
    },
    {
      q: "What is the typical throughput of 1 Gbps Ethernet?",
      a: "With TCP/IP over Gigabit Ethernet, maximum throughput is around 940-980 Mbps due to headers, inter-frame gaps, and protocol overhead. UDP can achieve 990+ Mbps."
    },
    {
      q: "Why does my internet throughput vary at different times of day?",
      a: "Network congestion – ISPs oversubscribe links. Peak hours (evenings) see higher utilization, causing queuing, packet loss, and reduced throughput."
    },
    {
      q: "What is the difference between throughput and bandwidth in wireless?",
      a: "Wireless bandwidth (PHY rate) is the signaling rate (e.g., 300 Mbps for 802.11n). Throughput is actual TCP/IP data rate, often 40-60% of PHY due to contention, interference, and overhead."
    },
    {
      q: "What is 'throughput testing' and why is it important?",
      a: "Throughput testing measures the maximum achievable data rate on a network. It's used to validate SLAs, troubleshoot slow connections, and compare ISPs. Tools: iperf3, nuttcp, qperf."
    },
    {
      q: "How does VPN affect throughput?",
      a: "VPN adds encryption overhead (CPU) and extra headers (encapsulation). Throughput may drop by 20-70% depending on VPN protocol (IPsec, OpenVPN, WireGuard) and CPU power."
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
        @keyframes flow-rate {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Throughput: Actual Data Transfer Rate
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-green-500 pl-4">
            What you actually get – not what the box says.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Your ISP advertises "200 Mbps", but your speed test shows 150 Mbps. That difference is throughput – 
            the real, measured data rate after overhead, congestion, and errors. Throughput is what matters for 
            user experience: download speed, video buffering, file transfer time. Understanding the gap between 
            bandwidth and throughput helps you troubleshoot slow networks and set realistic expectations.
          </p>
        </div>

        {/* SVG Illustration: Bandwidth vs Throughput */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📊 Bandwidth vs Throughput: The Gap</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="800" height="200" fill="none" />
              
              {/* Bandwidth bar (full pipe) */}
              <text x="20" y="30" fontSize="14" fontWeight="bold" fill="#0d9488">Bandwidth (Theoretical)</text>
              <rect x="20" y="40" width="700" height="30" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" rx="4" />
              <rect x="20" y="40" width="700" height="30" fill="#14b8a6" opacity="0.4" rx="4" />
              <text x="370" y="60" textAnchor="middle" fontSize="12" fill="#0f766e">1 Gbps (max possible)</text>
              
              {/* Throughput bar (actual) */}
              <text x="20" y="100" fontSize="14" fontWeight="bold" fill="#ea580c">Throughput (Actual)</text>
              <rect x="20" y="110" width="700" height="30" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" rx="4" />
              <rect x="20" y="110" width="520" height="30" fill="#f97316" opacity="0.7" rx="4">
                <animate attributeName="width" values="500;540;500" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="370" y="130" textAnchor="middle" fontSize="12" fill="#9a3412">~750 Mbps (real after overhead)</text>
              
              {/* Losses annotation */}
              <g transform="translate(580, 150)">
                <rect x="0" y="0" width="180" height="35" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" rx="4" />
                <text x="90" y="14" textAnchor="middle" fontSize="10" fill="#dc2626">Lost to overhead,</text>
                <text x="90" y="28" textAnchor="middle" fontSize="10" fill="#dc2626">congestion, errors</text>
              </g>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Throughput = Bandwidth - (Overhead + Loss + Retransmissions + Congestion)
          </p>
        </div>

        {/* Key Concepts: Throughput vs Goodput vs Bandwidth */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">📈 Bandwidth</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Theoretical maximum capacity. What the link can potentially deliver under ideal conditions.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-center">Example: 1 Gbps Ethernet PHY</div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">📊 Throughput</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Actual measured data transfer rate including all headers, retransmissions, and overhead.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-center">Example: 940 Mbps TCP over GigE</div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">🎯 Goodput</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Application-level throughput excluding protocol headers (TCP/IP, Ethernet). What the user actually gets.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-center">Example: ~900 Mbps file download speed</div>
          </div>
        </div>

        {/* Factors Affecting Throughput */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold">🔧 Key Factors That Reduce Throughput</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Protocol Overhead:</span> TCP/IP headers (20+20 bytes), Ethernet (14+4), encapsulation (VPN, tunneling).
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Congestion:</span> Router queues fill up → packet drops → TCP slows down.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Packet Loss:</span> Even 1% loss can halve TCP throughput on high-latency links.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Latency (RTT):</span> TCP window limited by bandwidth-delay product.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Link Errors:</span> Bit errors cause CRC failures and retransmissions.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Wi-Fi Contention:</span> CSMA/CA, collisions, backoff, half-duplex.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Application Behavior:</span> Small request-response patterns limit throughput.
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">CPU Bottleneck:</span> Encryption, checksumming, or slow NIC drivers.
            </div>
          </div>
        </div>

        {/* Real-World Throughput Examples (What you actually get) */}
        <div className="animate-fade-up bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold">🌐 Real-World: Typical Throughputs</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Gigabit Ethernet</span>
              <ul className="list-disc pl-4 mt-1">
                <li>TCP throughput: ~940 Mbps</li>
                <li>UDP throughput: ~990 Mbps</li>
                <li>Goodput (HTTP): ~900 Mbps</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Wi-Fi 5 (802.11ac)</span>
              <ul className="list-disc pl-4 mt-1">
                <li>PHY rate 866 Mbps → throughput ~400-500 Mbps</li>
                <li>Range/obstacles reduce further</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">4G LTE</span>
              <ul className="list-disc pl-4 mt-1">
                <li>Theoretical 150 Mbps → real 20-50 Mbps</li>
                <li>Congestion can drop to 5 Mbps</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">DSL (ADSL2+)</span>
              <ul className="list-disc pl-4 mt-1">
                <li>Line rate 24 Mbps → throughput ~18 Mbps</li>
                <li>Distance reduces both</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">✨ <strong>Student story:</strong> In <strong>Shyamnagar</strong>, Abhronila upgraded from 50 Mbps DSL to 200 Mbps fiber. Her speed test showed 190 Mbps, but her actual game download (Steam) was 22 MB/s (~176 Mbps) – goodput after overhead.</p>
        </div>

        {/* Measurement Tools + Command Examples */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold">📏 Throughput Measurement Tools</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>iperf3</strong> – Most popular CLI tool. Server: <code className="bg-gray-200 dark:bg-gray-700 px-1">iperf3 -s</code>, Client: <code className="bg-gray-200 dark:bg-gray-700 px-1">iperf3 -c server_ip</code></li>
              <li><strong>speedtest-cli</strong> – Command-line Ookla speed test.</li>
              <li><strong>nuttcp</strong> – Lightweight alternative to iperf.</li>
              <li><strong>qperf</strong> – Measures both TCP and RDMA throughput.</li>
              <li><strong>File transfer</strong> – Copy a large file (e.g., 1 GB) and calculate: throughput = size / time.</li>
            </ul>
            <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <span className="font-mono">iperf3 -c 192.168.1.10 -P 4 -t 10</span><br />
              (-P 4 = 4 parallel streams, -t 10 = 10 seconds)
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold">📉 Common Throughput Issues & Fixes</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Low TCP throughput over long distance:</strong> Enable window scaling (<code className="bg-gray-200 dark:bg-gray-700 px-1">net.ipv4.tcp_window_scaling=1</code>).</li>
              <li><strong>Wi-Fi slow:</strong> Change channel, reduce interference, use 5 GHz.</li>
              <li><strong>VPN slow:</strong> Switch to WireGuard (faster than OpenVPN).</li>
              <li><strong>CPU at 100%:</strong> Offload checksums (TSO, LRO) to NIC.</li>
              <li><strong>Packet loss &gt;1%:</strong> Check for duplex mismatch, bad cables, interference.</li>
            </ul>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Throughput Optimization)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Use parallel streams:</strong> Single TCP stream may be window-limited. iperf3 -P 4 saturates links.</li>
              <li><strong>Enable jumbo frames:</strong> 9000-byte MTU reduces overhead (but requires end-to-end support).</li>
              <li><strong>Test at off-peak hours</strong> to measure baseline, not congested throughput.</li>
              <li><strong>For cloud transfers,</strong> use multiple connections or multipath TCP.</li>
              <li><strong>Check for asymmetric routing</strong> – different paths for upload/download can hide issues.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Testing throughput over Wi-Fi and blaming the ISP – test wired first.</li>
              <li>Using a single TCP stream on a high BDP link (needs parallel streams or window scaling).</li>
              <li>Measuring throughput with a small file (under 10 MB) – overhead dominates.</li>
              <li>Forgetting that upload and download throughput can be asymmetric.</li>
              <li>Assuming iperf UDP test reflects TCP performance – UDP ignores congestion control.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Throughput Testing</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Run multiple tests at different times of day to get average and peak throughput.</li>
            <li>Test both TCP and UDP (UDP shows raw capacity, TCP shows real-world performance).</li>
            <li>For critical links, monitor throughput continuously with tools like Cacti, PRTG, or Librenms.</li>
            <li>When troubleshooting, test hop-by-hop (e.g., from PC to router, then router to ISP).</li>
            <li>Document baseline throughput after installation for future comparison.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define throughput vs bandwidth vs goodput</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ List 3 factors reducing throughput</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Run iperf3 to measure throughput</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain why Wi-Fi throughput is lower than PHY rate</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify when to use parallel TCP streams</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Throughput is the 'real' metric users care about, but students often confuse it with bandwidth. Use a simple demo: display bandwidth (e.g., 1 Gbps) and then run iperf3 to show actual throughput (~940 Mbps). Explain the 6% loss due to Ethernet+TCP/IP overhead. Then add a lossy link (using netem or a faulty cable) and show throughput collapse – this illustrates how sensitive TCP is to loss. For exams, they should be able to calculate throughput given file size and transfer time, and differentiate throughput from bandwidth."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Throughput</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-green-700 dark:text-green-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-green-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📈 Next: Jitter (Topic 16) – variation in delay.</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📈 Topic 15: Throughput — Next: Jitter (Topic 16)
        </div>
      </div>
    </div>
  );
};

export default Topic15;