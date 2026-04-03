import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic12: Performance Metrics
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to network performance metrics.
 * 
 * @purpose
 * Explain the key metrics used to measure network performance: bandwidth, latency,
 * throughput, jitter, and packet loss. Provide real-world context and measurement tools.
 * 
 * @usage
 * Used in networking courses after covering transmission media, to evaluate and compare
 * different communication channels.
 */

const Topic12 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is bandwidth in networking?",
      a: "Bandwidth is the maximum theoretical data transfer capacity of a network channel, measured in bits per second (bps). It's like the width of a pipe – wider pipe can carry more water (data)."
    },
    {
      q: "Differentiate between bandwidth and throughput.",
      a: "Bandwidth is the theoretical maximum capacity. Throughput is the actual measured data transfer rate, which is always lower due to overhead, congestion, errors, and protocol inefficiencies."
    },
    {
      q: "What is latency? Give an example.",
      a: "Latency is the time delay between a sender transmitting data and the receiver receiving it (one-way or round-trip). Example: A GEO satellite link has ~250 ms one-way latency due to the speed of light over 35,786 km."
    },
    {
      q: "What factors contribute to network latency?",
      a: "Propagation delay (speed of light), transmission delay (time to put bits on wire), queuing delay (waiting in router buffers), and processing delay (router CPU)."
    },
    {
      q: "Define jitter. Why is it important for real-time applications?",
      a: "Jitter is the variation in packet arrival times (delay variation). For VoIP or video calls, high jitter causes choppy audio/video. Buffers (playout delay) can smooth jitter but add latency."
    },
    {
      q: "What is packet loss, and what causes it?",
      a: "Packet loss occurs when one or more packets fail to reach their destination. Causes: congested router buffers (overflow), bit errors on physical links, or deliberate dropping (QoS)."
    },
    {
      q: "How do you measure round-trip time (RTT)?",
      a: "Using ping command – sends ICMP echo request, measures time for reply. RTT includes propagation + queuing + processing delays in both directions."
    },
    {
      q: "What is the relationship between latency and throughput on a TCP connection?",
      a: "TCP throughput ≈ (window size) / (RTT). Higher latency reduces throughput for a given window size. This is why satellite links (high RTT) need large TCP windows or performance enhancing proxies."
    },
    {
      q: "What is the difference between goodput and throughput?",
      a: "Throughput includes all transmitted bits (including headers, retransmissions). Goodput excludes overhead – it's the actual application-level data rate (e.g., file download speed excluding TCP/IP headers)."
    },
    {
      q: "Name three tools to measure network performance.",
      a: "1) ping (latency, packet loss). 2) iperf (throughput). 3) traceroute (path latency). 4) MTR (continuous ping + traceroute). 5) Wireshark (detailed analysis)."
    },
    {
      q: "What is an acceptable jitter value for VoIP?",
      a: "Ideally < 20 ms. Jitter up to 50 ms is tolerable with a good jitter buffer. Above 100 ms causes noticeable audio degradation."
    },
    {
      q: "How does distance affect latency in fiber optic cable?",
      a: "Light travels ~200,000 km/s in fiber (refractive index ~1.5). So latency ≈ 5 μs per km. A 10,000 km fiber link has ~50 ms one-way propagation delay."
    },
    {
      q: "What is the difference between latency and response time?",
      a: "Latency is the network delay. Response time includes latency + server processing time. User-perceived 'lag' is usually response time."
    },
    {
      q: "Why is throughput often lower than bandwidth on Wi-Fi?",
      a: "Wi-Fi has overhead (CSMA/CA collisions, backoff, ACKs, frame headers). Real-world throughput is typically 40-60% of the signaling rate (e.g., 300 Mbps PHY gives ~150 Mbps TCP throughput)."
    },
    {
      q: "What is the 'bandwidth-delay product'?",
      a: "The amount of data 'in flight' to fully utilize a link: BDP = bandwidth × RTT. For optimal TCP performance, the receive window should be at least BDP."
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
        @keyframes flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes pulse-width {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Performance Metrics
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-teal-500 pl-4">
            How do we measure network quality? Bandwidth, Latency, Throughput, Jitter.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            A fast network isn't just about "speed". Network engineers use multiple metrics to characterize 
            performance: bandwidth (capacity), latency (delay), throughput (actual transfer rate), jitter (delay variation), 
            and packet loss. Understanding these helps you troubleshoot slow connections, choose the right ISP plan, 
            and optimize real-time applications like video calls and online gaming.
          </p>
        </div>

        {/* SVG Illustration: Metrics Comparison (Bandwidth vs Latency vs Throughput) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📊 Key Metrics Visualized</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="280" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="900" height="280" fill="none" />
              
              {/* Bandwidth pipe analogy */}
              <g transform="translate(30, 30)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#0d9488">Bandwidth (Capacity)</text>
                <rect x="0" y="10" width="200" height="30" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" rx="4" />
                <rect x="0" y="10" width="200" height="30" fill="#14b8a6" opacity="0.4" rx="4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="100" y="30" textAnchor="middle" fontSize="12" fill="#0f766e">Max 1 Gbps</text>
                <text x="0" y="55" fontSize="11" fill="#475569">Theoretical max – like a pipe's width</text>
              </g>
              
              {/* Throughput (actual flow) */}
              <g transform="translate(30, 100)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#0d9488">Throughput (Actual Transfer)</text>
                <rect x="0" y="10" width="200" height="30" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" rx="4" />
                <rect x="0" y="10" width="140" height="30" fill="#f97316" opacity="0.7" rx="4">
                  <animate attributeName="width" values="100;160;100" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="100" y="30" textAnchor="middle" fontSize="12" fill="#9a3412">~700 Mbps real</text>
                <text x="0" y="55" fontSize="11" fill="#475569">Actual measured rate (after overhead, congestion)</text>
              </g>
              
              {/* Latency / Ruler */}
              <g transform="translate(500, 30)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#0d9488">Latency (Delay)</text>
                <line x1="0" y1="20" x2="300" y2="20" stroke="#475569" strokeWidth="3" />
                <circle cx="0" cy="20" r="6" fill="#3b82f6">
                  <animate attributeName="cx" values="0;280;0" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="280" cy="20" r="6" fill="#ef4444" />
                <text x="0" y="40" fontSize="11" fill="#3b82f6">Sender</text>
                <text x="270" y="40" fontSize="11" fill="#ef4444">Receiver</text>
                <text x="140" y="-5" textAnchor="middle" fontSize="12" fill="#0d9488">Time = Distance / Speed of Light</text>
                <text x="0" y="65" fontSize="11" fill="#475569">One-way delay: propagation + queuing + processing</text>
              </g>
              
              {/* Jitter illustration */}
              <g transform="translate(30, 190)">
                <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#0d9488">Jitter (Delay Variation)</text>
                {/* Uneven packet spacing */}
                <rect x="0" y="15" width="8" height="15" fill="#8b5cf6" />
                <rect x="25" y="15" width="8" height="15" fill="#8b5cf6" />
                <rect x="65" y="15" width="8" height="15" fill="#8b5cf6" />
                <rect x="80" y="15" width="8" height="15" fill="#8b5cf6" />
                <rect x="130" y="15" width="8" height="15" fill="#8b5cf6" />
                <rect x="155" y="15" width="8" height="15" fill="#8b5cf6" />
                <text x="0" y="45" fontSize="11" fill="#475569">Uneven arrival times → voice/video glitches</text>
              </g>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Bandwidth = pipe size | Throughput = actual flow | Latency = travel time | Jitter = variation in arrival
          </p>
        </div>

        {/* Detailed Metric Cards */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">📈 Bandwidth</h3>
            <p className="mt-1 text-sm"><strong>Definition:</strong> Maximum theoretical data rate (bits/sec).</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Like a highway's number of lanes. A 100 Mbps link can theoretically send 100 million bits per second, but real throughput is lower.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Examples:</strong> Ethernet (10/100/1000 Mbps), Wi-Fi (300 Mbps–9.6 Gbps), Fiber (1–100 Gbps).
            </div>
            <div className="mt-2 text-xs text-gray-500">✨ <strong>Tip:</strong> ISP plans advertise bandwidth (e.g., "200 Mbps"), but actual speeds vary.</div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">⏱️ Latency</h3>
            <p className="mt-1 text-sm"><strong>Definition:</strong> Time delay (ms) from send to receive.</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Includes propagation (speed of light), transmission (serialization), queuing (router buffers), and processing (router CPU).</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Typical values:</strong> LAN: &lt;1 ms, Fiber across US: ~30 ms, GEO Satellite: ~250 ms.
            </div>
            <div className="mt-2 text-xs text-gray-500">✨ <strong>Tip:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1">ping</code> to measure RTT.</div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">📉 Throughput</h3>
            <p className="mt-1 text-sm"><strong>Definition:</strong> Actual measured data transfer rate (bits/sec).</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Always ≤ bandwidth. Reduced by protocol overhead, congestion, retransmissions, and errors.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Measurement:</strong> iperf, speedtest.net, or copying a file.
            </div>
            <div className="mt-2 text-xs text-gray-500">✨ <strong>Tip:</strong> TCP throughput ≈ window size / RTT.</div>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">📊 Jitter & Loss</h3>
            <p className="mt-1 text-sm"><strong>Jitter:</strong> Variation in packet arrival times (ms).<br />
            <strong>Packet loss:</strong> Percentage of packets never received.</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">High jitter ruins VoIP/video. Loss triggers TCP retransmissions, killing throughput.</p>
            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <strong>Acceptable:</strong> Jitter &lt;20ms, loss &lt;1% for VoIP.
            </div>
            <div className="mt-2 text-xs text-gray-500">✨ <strong>Tip:</strong> Use MTR or ping -f to detect loss.</div>
          </div>
        </div>

        {/* Real-World Scenario: Video Call Troubleshooting */}
        <div className="animate-fade-up bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl p-5 border border-teal-200 dark:border-teal-800">
          <h3 className="text-xl font-bold">🎥 Real-World Case: Why is my video call choppy?</h3>
          <p className="mt-2"><strong>Student scenario:</strong> Susmita in <strong>Barrackpore</strong> is on a Zoom call with her teacher. Video freezes and audio cuts out.</p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Possible causes:</span>
              <ul className="list-disc pl-5 mt-1">
                <li><strong>High latency</strong> (>200ms) → delayed responses</li>
                <li><strong>Jitter</strong> (>50ms) → choppy audio</li>
                <li><strong>Packet loss</strong> (>2%) → frozen video</li>
                <li><strong>Low throughput</strong> (&lt;1 Mbps) → pixelation</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold">Diagnosis tools:</span>
              <ul className="list-disc pl-5 mt-1">
                <li>Zoom statistics (latency, loss)</li>
                <li>ping google.com -t (continuous)</li>
                <li>Speedtest (throughput)</li>
                <li>Pathping / MTR (jitter per hop)</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">💡 <strong>Solution:</strong> If jitter is high, switch from Wi-Fi to Ethernet; if loss >1%, check for congested router.</p>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Network Measurement)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Always measure both ways:</strong> Asymmetric links (e.g., cable) have different upload/download throughput.</li>
              <li><strong>Use iperf3 with parallel streams</strong> to saturate high-bandwidth links (TCP window limits).</li>
              <li><strong>For real-time apps,</strong> prioritize jitter and loss over throughput.</li>
              <li><strong>Bandwidth-delay product:</strong> For long-fat networks (high BDP), tune TCP window scaling.</li>
              <li><strong>Latency under load:</strong> Measure latency with background traffic (ping during file download).</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Confusing bandwidth (Mbps) with throughput (actual speed).</li>
              <li>Assuming low latency means high throughput – not always (e.g., 1 Gbps with 500ms RTT still slow for small files).</li>
              <li>Measuring throughput over Wi-Fi without accounting for interference.</li>
              <li>Ignoring duplex mismatches (half vs full duplex causes collisions/loss).</li>
              <li>Forgetting that speedtest servers may be inside ISP network (not representative of internet).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Performance Evaluation</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Establish baseline measurements during normal operation.</li>
            <li>Use multiple tools (ping, iperf, traceroute) for cross-validation.</li>
            <li>Test at different times of day to identify congestion patterns.</li>
            <li>For critical applications, set SLAs (Service Level Agreements) with thresholds for latency, loss, jitter.</li>
            <li>Document results with timestamps and network topology.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define bandwidth, latency, throughput, jitter, loss</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain why throughput &lt; bandwidth</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Name 3 tools to measure performance</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Calculate RTT from ping</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify which metric matters for VoIP</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Performance metrics are the language of network troubleshooting. Students often memorize definitions but can't apply them. Use real examples: 'Why does YouTube buffer?' (low throughput or high loss). 'Why does online gaming lag?' (high latency or jitter). Have them run ping and iperf between lab machines. Emphasize that bandwidth is like the speed limit, but actual throughput is like average speed with traffic. For exams, they must differentiate bandwidth vs throughput and explain the impact of latency on TCP."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Performance Metrics</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-teal-700 dark:text-teal-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-teal-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📊 Next: Bandwidth deep dive (Topic 13).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📊 Topic 12: Performance Metrics — Next: Bandwidth (Topic 13)
        </div>
      </div>
    </div>
  );
};

export default Topic12;