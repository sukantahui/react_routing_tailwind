import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic16: Jitter – Variation in Delay
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to network jitter.
 * 
 * @purpose
 * Explain jitter as the variation in packet arrival times, its causes,
 * effects on real-time applications (VoIP, video), measurement, and mitigation.
 * 
 * @usage
 * Used in networking courses after throughput, to complete the performance
 * metrics series and prepare for QoS discussions.
 */

const Topic16 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is jitter in networking?",
      a: "Jitter is the variation in packet arrival times (delay variation). It measures how much the latency fluctuates between consecutive packets, typically expressed in milliseconds (ms)."
    },
    {
      q: "Why is jitter harmful to real-time applications?",
      a: "Voice and video applications expect packets at regular intervals. Jitter causes gaps or out-of-order arrival, resulting in choppy audio, frozen video, or robotic voice. Large jitter buffers add latency."
    },
    {
      q: "How is jitter measured?",
      a: "Jitter is calculated as the average difference in packet arrival times. For example, if packet 1 arrives at 10ms, packet 2 at 15ms, packet 3 at 13ms: jitter = |15-10| + |13-15| averaged. Tools: ping jitter, iperf UDP test, VoIP monitors."
    },
    {
      q: "What causes network jitter?",
      a: "Congestion (variable queuing delays), routing changes (different path lengths), Wi-Fi interference (retransmissions), CPU load on routers, and traffic shaping (policing/bursts)."
    },
    {
      q: "What is an acceptable jitter value for VoIP?",
      a: "Ideally < 20 ms. Up to 30-50 ms is tolerable with a good jitter buffer. Above 100 ms causes noticeable audio degradation. For video calls, < 30 ms is recommended."
    },
    {
      q: "What is a jitter buffer?",
      a: "A jitter buffer is a temporary storage at the receiver that holds packets and releases them at a constant rate, smoothing out delay variations. Larger buffers reduce jitter but add latency."
    },
    {
      q: "How does jitter differ from latency?",
      a: "Latency is the average delay (e.g., 150 ms RTT). Jitter is the variation around that average (e.g., packets arrive between 140-160 ms, jitter = 10 ms). High jitter is often worse than high constant latency."
    },
    {
      q: "How do you measure jitter using ping?",
      a: "Use 'ping -i 0.2' (Linux) or continuous ping and look at standard deviation. Better: iperf3 UDP test with '-u' flag reports jitter. Example: iperf3 -c server -u -b 1M -t 10"
    },
    {
      q: "What is the relationship between jitter and packet loss?",
      a: "Extreme jitter can cause packets to arrive too late to be useful, effectively becoming loss. Some systems drop late packets. Jitter buffers that overflow also cause loss."
    },
    {
      q: "Why does Wi-Fi have higher jitter than Ethernet?",
      a: "Wi-Fi uses CSMA/CA – random backoff, retransmissions, and interference cause highly variable delays. Ethernet (switched) has deterministic, low jitter (<0.1 ms)."
    },
    {
      q: "What is the difference between jitter and wander?",
      a: "Jitter refers to high-frequency delay variations (packet-to-packet). Wander is long-term, low-frequency variation over seconds/minutes (e.g., clock drift)."
    },
    {
      q: "How can you reduce jitter on a network?",
      a: "Use QoS to prioritize real-time traffic, reduce congestion (upgrade bandwidth), switch from Wi-Fi to Ethernet, enable traffic shaping (smoothing bursts), use hardware acceleration."
    },
    {
      q: "What is dejittering?",
      a: "Dejittering is the process of smoothing packet arrival times using a jitter buffer. It adds delay but makes playback smooth. Common in VoIP gateways and video conferencing systems."
    },
    {
      q: "How does jitter affect TCP throughput?",
      a: "Jitter itself doesn't directly affect TCP throughput, but the underlying congestion that causes jitter also causes packet loss and RTOs, reducing throughput. TCP's adaptive retransmission handles jitter poorly."
    },
    {
      q: "What is the typical jitter on a fiber optic internet connection?",
      a: "Well-engineered fiber (FTTH) has very low jitter, typically < 1 ms. Even under load, jitter stays below 5 ms. This makes fiber excellent for real-time applications."
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
        @keyframes packet-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Jitter: Variation in Delay
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-purple-500 pl-4">
            The hidden enemy of clear voice and smooth video.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            You have 100 Mbps bandwidth and 30 ms latency, but your Zoom call still sounds robotic. The culprit? 
            Jitter – variation in packet arrival times. While latency is the average delay, jitter measures the 
            inconsistency. For real-time applications like VoIP, video conferencing, and online gaming, jitter 
            is often more disruptive than high but constant latency. Understanding jitter helps you build 
            networks that deliver smooth, predictable performance.
          </p>
        </div>

        {/* SVG Illustration: Even vs Jittery Packet Streams */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📊 Low Jitter vs High Jitter</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="240" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="800" height="240" fill="none" />
              
              {/* Low Jitter Section */}
              <text x="20" y="25" fontSize="14" fontWeight="bold" fill="#10b981">✓ Low Jitter (Stable)</text>
              <line x1="20" y1="40" x2="780" y2="40" stroke="#d1d5db" strokeWidth="1" />
              <rect x="30" y="30" width="10" height="15" fill="#10b981" />
              <rect x="90" y="30" width="10" height="15" fill="#10b981" />
              <rect x="150" y="30" width="10" height="15" fill="#10b981" />
              <rect x="210" y="30" width="10" height="15" fill="#10b981" />
              <rect x="270" y="30" width="10" height="15" fill="#10b981" />
              <rect x="330" y="30" width="10" height="15" fill="#10b981" />
              <rect x="390" y="30" width="10" height="15" fill="#10b981" />
              <rect x="450" y="30" width="10" height="15" fill="#10b981" />
              <rect x="510" y="30" width="10" height="15" fill="#10b981" />
              <rect x="570" y="30" width="10" height="15" fill="#10b981" />
              <rect x="630" y="30" width="10" height="15" fill="#10b981" />
              <rect x="690" y="30" width="10" height="15" fill="#10b981" />
              <text x="400" y="65" textAnchor="middle" fontSize="11" fill="#475569">Packets arrive at regular intervals → smooth playback</text>
              
              {/* High Jitter Section */}
              <text x="20" y="100" fontSize="14" fontWeight="bold" fill="#ef4444">✗ High Jitter (Unstable)</text>
              <line x1="20" y1="115" x2="780" y2="115" stroke="#d1d5db" strokeWidth="1" />
              <rect x="30" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="100" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="140" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="230" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="280" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="360" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="380" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="470" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="540" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="620" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="650" y="105" width="10" height="15" fill="#ef4444" />
              <rect x="730" y="105" width="10" height="15" fill="#ef4444" />
              <text x="400" y="140" textAnchor="middle" fontSize="11" fill="#475569">Irregular gaps → choppy audio, frozen video</text>
              
              {/* Jitter Buffer illustration */}
              <g transform="translate(250, 160)">
                <rect x="0" y="0" width="300" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="6" />
                <text x="150" y="20" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="bold">Jitter Buffer</text>
                <text x="150" y="38" textAnchor="middle" fontSize="10" fill="#b45309">Holds packets → releases at constant rate</text>
              </g>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Low jitter: regular packet intervals | High jitter: uneven gaps | Jitter buffer smooths out variation
          </p>
        </div>

        {/* Jitter Causes and Effects */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">⚠️ Common Causes of Jitter</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Network Congestion:</strong> Variable queue lengths in routers/switches.</li>
              <li><strong>Wi-Fi Interference:</strong> Retransmissions, backoff, and signal fluctuations.</li>
              <li><strong>Routing Changes:</strong> Different paths for different packets (ECMP, rerouting).</li>
              <li><strong>Traffic Bursts:</strong> Large file transfers or backups cause queuing.</li>
              <li><strong>CPU Load:</strong> High utilization on routers increases processing delay variation.</li>
              <li><strong>Traffic Shaping:</strong> Policing (drop/remark) and shaping (buffer) introduce jitter.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">📱 Real-World Impact</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>VoIP:</strong> Robotic voice, clipped words, echoing.</li>
              <li><strong>Video Calls:</strong> Frozen frames, pixelation, desync.</li>
              <li><strong>Online Gaming:</strong> Teleporting characters, delayed actions.</li>
              <li><strong>Live Streaming:</strong> Buffering, quality drops.</li>
              <li><strong>Remote Desktop:</strong> Jerky mouse movement, laggy typing.</li>
            </ul>
            <div className="mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
              <p className="font-semibold">Student Story:</p>
              <p>In <strong>Naihati</strong>, Tuhina's online class was choppy. Her Wi-Fi had 50 ms average latency but jitter of 80 ms. Switching to Ethernet reduced jitter to 2 ms – class became crystal clear.</p>
            </div>
          </div>
        </div>

        {/* Jitter Buffer Deep Dive */}
        <div className="animate-fade-up bg-purple-50 dark:bg-purple-950/30 rounded-xl p-5 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold">📦 Jitter Buffers: How They Work</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-indigo-600">Static Buffer</span>
              <p>Fixed delay (e.g., 50 ms). Simple but inefficient – either wastes time or underflows.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-indigo-600">Adaptive Buffer</span>
              <p>Dynamically adjusts based on observed jitter. Modern VoIP uses this (e.g., Opus, WebRTC).</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded">
              <span className="font-bold text-indigo-600">Trade-off</span>
              <p>Larger buffer = smoother playback but higher latency. Optimal = just enough to cover jitter.</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">💡 For WebRTC (Google Meet, Zoom), jitter buffer targets 50-100 ms. For gaming, minimal buffer is preferred (lower latency).</p>
        </div>

        {/* Measurement Tools and Commands */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-xl p-5 shadow-md">
          <h3 className="text-xl font-bold">📏 How to Measure Jitter</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="font-semibold">Using ping (indirect):</p>
              <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm font-mono mt-1">
                ping -i 0.2 google.com   # Linux<br />
                ping -n 100 google.com   # Windows, then check std dev
              </code>
              <p className="text-xs text-gray-500 mt-1">High standard deviation = high jitter.</p>
            </div>
            <div>
              <p className="font-semibold">Using iperf3 (UDP test):</p>
              <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm font-mono mt-1">
                iperf3 -c server -u -b 1M -t 10 -l 1400
              </code>
              <p className="text-xs text-gray-500 mt-1">Reports total jitter at end (in ms).</p>
            </div>
          </div>
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded text-sm">
            <p><strong>Specialized tools:</strong> VoIP quality monitors (MOS scores), PRTG, Smokeping (shows jitter graphs), MTR (My Traceroute).</p>
          </div>
        </div>

        {/* Mitigation Techniques */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Reducing Jitter)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Use wired Ethernet</strong> instead of Wi-Fi for real-time applications.</li>
              <li><strong>Enable QoS (Quality of Service)</strong> – prioritize voice/video packets (DSCP EF/CS4).</li>
              <li><strong>Upgrade your internet connection</strong> – more bandwidth reduces congestion jitter.</li>
              <li><strong>Replace old routers</strong> – modern hardware has better queuing (AQM like CoDel).</li>
              <li><strong>Reduce bufferbloat</strong> – configure smart queue management (fq_codel, Cake).</li>
              <li><strong>Use jitter buffer tuning</strong> – in VoIP apps, increase buffer if jitter is high but latency is acceptable.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Assuming low latency means low jitter – not true (congestion causes jitter even on low-latency paths).</li>
              <li>Ignoring jitter when troubleshooting voice/video – focus on latency and loss only.</li>
              <li>Using a static jitter buffer on highly variable links – adaptive is required.</li>
              <li>Testing jitter over Wi-Fi and blaming ISP – test wired first.</li>
              <li>Forgetting that VPNs add jitter (encryption + encapsulation).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Jitter-Sensitive Networks</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>For enterprise VoIP, deploy dedicated VLANs with QoS (strict priority).</li>
            <li>Use hardware phones instead of softphones (better jitter handling).</li>
            <li>Monitor jitter continuously with tools like PRTG, SolarWinds, or LibreNMS.</li>
            <li>When using Wi-Fi for voice, enable WMM (Wi-Fi Multimedia) for QoS.</li>
            <li>Test jitter under load (not just idle) – simulate background traffic during testing.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define jitter as delay variation</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain why jitter harms VoIP/video</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Describe jitter buffer function</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Measure jitter using ping or iperf3</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ List 3 ways to reduce jitter</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Jitter is often the missing piece when students diagnose 'bad call quality.' They check bandwidth (fine) and latency (okay), but ignore jitter. Use a live demo: play a metronome (steady beats) vs random intervals – students feel the irritation of irregularity. Explain that jitter buffers are like a bucket collecting water – if water comes in spurts, the bucket smooths the outflow but adds delay. For exams, they should know that jitter is measured in ms, acceptable levels for VoIP (<30 ms), and that jitter buffers are a trade-off between smoothness and latency."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Jitter</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-purple-700 dark:text-purple-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-purple-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">📊 Next: Comparison of Transmission Media (Topic 17).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📊 Topic 16: Jitter — Next: Comparison of Transmission Media (Topic 17)
        </div>
      </div>
    </div>
  );
};

export default Topic16;