import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* HEADER */}
        <header className="text-center space-y-4 animate-[fade-up_0.6s_ease-out] motion-safe:animate-[fade-up_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-orange-500 bg-clip-text text-transparent">
            Concept of Network Congestion
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            What happens when the highway gets too crowded? Causes, effects, and control.
          </p>
        </header>

        {/* SVG ILLUSTRATION (congestion buildup) */}
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-rose-400 rounded-full"></span>
            Visual concept
          </h2>
          <div className="flex justify-center">
            <svg width="560" height="300" viewBox="0 0 560 300" className="w-full max-w-lg">
              {/* Router / bottleneck */}
              <rect x="230" y="110" width="100" height="60" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" rx="6" />
              <text x="250" y="145" fill="#f43f5e" fontSize="12" fontWeight="bold">Router</text>
              <text x="245" y="160" fill="#94a3b8" fontSize="10">bottleneck</text>
              
              {/* Incoming traffic (many packets) */}
              <rect x="70" y="125" width="24" height="18" fill="#facc15" rx="2">
                <animate attributeName="x" values="70;150;210" dur="2s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
              </rect>
              <rect x="90" y="145" width="24" height="18" fill="#facc15" rx="2">
                <animate attributeName="x" values="90;160;210" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
                <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin="0.3s" />
              </rect>
              <rect x="80" y="105" width="24" height="18" fill="#facc15" rx="2">
                <animate attributeName="x" values="80;155;210" dur="1.8s" repeatCount="indefinite" begin="0.7s" />
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="0.7s" />
              </rect>
              <rect x="100" y="165" width="24" height="18" fill="#facc15" rx="2">
                <animate attributeName="x" values="100;170;210" dur="2.5s" repeatCount="indefinite" begin="1.1s" />
                <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="1.1s" />
              </rect>
              
              {/* Queue building up inside router (red area) */}
              <rect x="235" y="180" width="20" height="15" fill="#ef4444" opacity="0.7">
                <animate attributeName="height" values="5;25;30;35;25;10;5" dur="6s" repeatCount="indefinite" />
                <animate attributeName="y" values="195;175;170;165;175;190;195" dur="6s" repeatCount="indefinite" />
              </rect>
              <text x="260" y="205" fill="#ef4444" fontSize="10">Queue grows</text>
              
              {/* Outgoing traffic (few packets, maybe drops) */}
              <rect x="370" y="125" width="24" height="18" fill="#22c55e" rx="2">
                <animate attributeName="x" values="330;370;430" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              </rect>
              <rect x="380" y="145" width="24" height="18" fill="#22c55e" rx="2">
                <animate attributeName="x" values="330;370;430" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="1.2s" />
              </rect>
              
              {/* Drop indicator */}
              <circle cx="340" cy="100" r="8" fill="#ef4444" opacity="0">
                <animate attributeName="opacity" values="0;1;0;0;1;0" dur="6s" repeatCount="indefinite" />
              </circle>
              <text x="340" y="95" fill="#ef4444" fontSize="9" textAnchor="middle">DROP</text>
              
              {/* Labels */}
              <text x="100" y="85" fill="#facc15" fontSize="11">High input rate</text>
              <text x="410" y="85" fill="#22c55e" fontSize="11">Limited output</text>
              <text x="240" y="240" fill="#94a3b8" fontSize="11">Congestion → packet loss & delay</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            When demand exceeds capacity (bottleneck), queues build, delays increase, and packets may be dropped.
          </p>
        </div>

        {/* CONCEPT EXPLANATION (staggered) */}
        <div className="space-y-12">
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-rose-400 pl-4 mb-4">📖 Theory & why it matters</h2>
            <div className="bg-gray-800/40 rounded-xl p-6 space-y-4">
              <p><strong className="text-rose-300">Network congestion</strong> occurs when the offered load (traffic) exceeds the available capacity of a network link or node. Like a traffic jam on the Barrackpore–Kolkata highway during rush hour, packets pile up in router queues, causing:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong>Increased delay</strong> – packets wait longer in queues.</li>
                <li><strong>Packet loss</strong> – full queues drop incoming packets.</li>
                <li><strong>Retransmissions</strong> – lost packets are resent, making congestion worse (congestion collapse).</li>
              </ul>
              <p>Congestion is <strong>not</strong> the same as a slow link – it’s a dynamic condition where traffic saturates a bottleneck. Understanding congestion is the foundation of TCP’s congestion control (AIMD, slow start, fast retransmit).</p>
            </div>
          </section>

          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-rose-400 pl-4 mb-4">🌍 Real‑world usage examples</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🏫</span>
                <h3 className="font-bold text-lg">School exam results day</h3>
                <p className="text-gray-300 text-sm">The school’s website gets 1000 requests/sec – server can only handle 100. Congestion causes timeouts.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🎮</span>
                <h3 className="font-bold text-lg">Online gaming (peak hours)</h3>
                <p className="text-gray-300 text-sm">Evening lag in multiplayer games – ISP’s last mile is congested by Netflix, YouTube, gaming traffic.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">☁️</span>
                <h3 className="font-bold text-lg">Cloud storage sync</h3>
                <p className="text-gray-300 text-sm">OneDrive/Google Drive uploads and downloads competing for the same DSL line.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">📡</span>
                <h3 className="font-bold text-lg">Satellite internet</h3>
                <p className="text-gray-300 text-sm">Shared satellite bandwidth – rain fade or many users can cause severe congestion.</p>
              </div>
            </div>
          </section>

          {/* PROTOTYPE / SIGNATURE (conceptual model) */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[300ms] bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">🧩 Mathematical model (simplified)</h2>
            <pre className="bg-gray-950 p-4 rounded-lg text-sm text-rose-300 overflow-x-auto">
{`// Congestion occurs when:
 arrival_rate > link_capacity

// Queue growth (deterministic fluid model):
 dQ/dt = arrival_rate - service_rate   (when Q > 0)

// Total delay (queuing + transmission):
 delay = Q / service_rate + packet_size / link_speed

// Packet drop happens when Q > buffer_limit`}
            </pre>
            <p className="mt-3 text-gray-300 text-sm"><strong>Purpose:</strong> understand why networks slow down and how to prevent collapse.<br />
            <strong>When used:</strong> everywhere! Congestion control is built into TCP, routers, firewalls, load balancers.</p>
          </section>

          {/* Tips & Tricks */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-rose-400 pl-4 mb-4">💡 Pro tips & tricks</h2>
            <ul className="list-disc list-inside space-y-2 bg-gray-800/40 rounded-xl p-5">
              <li>Use <strong>TCP BBR</strong> (Bottleneck Bandwidth and RTT) on modern Linux – it measures real bottleneck instead of reacting to loss.</li>
              <li>Monitor <strong>interface drops</strong> (`ifconfig` or `ethtool -S`) – the first sign of congestion.</li>
              <li>Deploy <strong>Active Queue Management (AQM)</strong> like CoDel or PIE to keep queues short.</li>
              <li>For Susmita’s e‑commerce site: use CDN and load balancers to spread traffic and avoid a single bottleneck.</li>
              <li>Use <strong>QoS</strong> to protect critical traffic (VoIP, SSH) from bulk downloads.</li>
            </ul>
          </section>

          {/* Common pitfalls & best practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fade-up_0.5s_ease-out] animation-delay-[500ms]">
            <div className="bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400">
              <h3 className="font-bold text-xl mb-2 text-red-300">⚠️ Common pitfalls</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Thinking “more bandwidth solves everything” – congestion can shift to another bottleneck.</li>
                <li>Ignoring <strong>bufferbloat</strong> – large buffers increase delay without preventing loss.</li>
                <li>Confusing congestion with <strong>link errors</strong> – errors cause loss but not high queue delay.</li>
                <li>Misunderstanding: “TCP automatically fixes congestion” – only if congestion control is enabled and configured well.</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-xl p-5 border-l-4 border-green-400">
              <h3 className="font-bold text-xl mb-2 text-green-300">✅ Best practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Set router queue lengths to <strong>bandwidth‑delay product</strong> (BDP) plus a small margin.</li>
                <li>Use <strong>ECN (Explicit Congestion Notification)</strong> to signal congestion without dropping packets.</li>
                <li>Monitor <strong>retransmission rate</strong> (e.g., via `netstat -s`).</li>
                <li>Implement <strong>rate limiting per user/flow</strong> to prevent one from dominating.</li>
              </ul>
            </div>
          </div>

          {/* Mini checklist */}
          <div className="bg-rose-950/30 rounded-xl p-5 text-center md:text-left animate-[fade-up_0.5s_ease-out] animation-delay-[600ms]">
            <h3 className="font-mono font-bold text-rose-300">📋 Mini checklist – “I understand congestion when…”</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 list-disc list-inside">
              <li>✓ I can explain why high load increases delay and loss.</li>
              <li>✓ I can differentiate between congestion and a slow link.</li>
              <li>✓ I know how to check for drops on a Linux router.</li>
              <li>✓ I can name three congestion control mechanisms in TCP.</li>
            </ul>
          </div>

          {/* Hint section */}
          <div className="bg-gray-800/60 rounded-xl p-5 border border-dashed border-yellow-500/50 animate-[fade-up_0.5s_ease-out] animation-delay-[700ms]">
            <p className="text-yellow-300 font-medium">💭 <strong>Hint – think about:</strong></p>
            <p className="text-gray-200">Imagine a toll plaza with 3 booths. Each booth can serve 1 car/second. If 10 cars arrive per second, what happens? The queue grows. After 5 seconds, there are 50 cars waiting – delay = 50/3 ≈ 17 seconds. Eventually, if the queue overflows the parking area (buffer), cars are turned away (drops). This is exactly network congestion. Observe carefully: increasing booth speed (link capacity) or reducing arrival rate solves it.<br />
            Try changing: what if booths serve 2 cars/second? How does the queue change?</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[800ms]">
          <FAQTemplate title="Network Congestion – FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[900ms] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="Congestion is the root cause of most 'internet is slow' complaints. Use a physical classroom demo: give 10 students 100 papers each and ask them to pass through a single door. The door is the bottleneck. Measure time and dropped papers. Then add a second door (increase bandwidth) – huge improvement. Then discuss: is adding more doors always feasible? This introduces capacity planning and economics of networks." />
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-100ms { animation-delay: 100ms; }
        .animation-delay-200ms { animation-delay: 200ms; }
        .animation-delay-300ms { animation-delay: 300ms; }
        .animation-delay-400ms { animation-delay: 400ms; }
        .animation-delay-500ms { animation-delay: 500ms; }
        .animation-delay-600ms { animation-delay: 600ms; }
        .animation-delay-700ms { animation-delay: 700ms; }
        .animation-delay-800ms { animation-delay: 800ms; }
        .animation-delay-900ms { animation-delay: 900ms; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fade-up_0\\.5s_ease-out\\] { animation: none; opacity: 1; transform: none; }
          .animate-\\[fade-up_0\\.6s_ease-out\\] { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Topic2;