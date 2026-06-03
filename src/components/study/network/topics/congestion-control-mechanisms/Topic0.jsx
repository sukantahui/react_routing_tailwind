import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans leading-relaxed">
      {/* Main container – dark mode default */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* ========== HEADER ========== */}
        <header className="text-center space-y-4 animate-[fade-up_0.6s_ease-out] motion-safe:animate-[fade-up_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Leaky Bucket Algorithm
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Traffic shaping & rate limiting – making network flows predictable
          </p>
        </header>

        {/* ========== SVG ILLUSTRATION (step‑by‑step animation) ========== */}
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-400 rounded-full"></span>
            Visual concept
          </h2>
          <div className="flex justify-center">
            <svg width="480" height="320" viewBox="0 0 480 320" className="w-full max-w-lg">
              {/* Bucket body */}
              <path d="M160,120 L320,120 L300,260 L180,260 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" strokeLinejoin="round">
                <animate attributeName="stroke" values="#38bdf8;#7dd3fc;#38bdf8" dur="3s" repeatCount="indefinite" />
              </path>
              {/* Water level (dynamic) */}
              <rect x="170" y="200" width="140" height="60" fill="#0ea5e9" opacity="0.35">
                <animate attributeName="height" values="60;80;40;60" dur="4s" repeatCount="indefinite" />
                <animate attributeName="y" values="200;180;220;200" dur="4s" repeatCount="indefinite" />
              </rect>
              {/* Incoming packets (arrows + dots) */}
              <line x1="240" y1="40" x2="240" y2="110" stroke="#facc15" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
              </line>
              <circle cx="240" cy="70" r="4" fill="#facc15">
                <animate attributeName="cy" values="50;100" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="90" r="3" fill="#facc15">
                <animate attributeName="cy" values="60;105" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              {/* Outflow (drip) */}
              <path d="M240,260 L240,290" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
              </path>
              <circle cx="240" cy="295" r="3" fill="#22c55e">
                <animate attributeName="cy" values="290;305" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
              {/* Labels */}
              <text x="260" y="35" fill="#facc15" fontSize="12">Incoming bursts</text>
              <text x="180" y="305" fill="#22c55e" fontSize="12">Constant rate</text>
              <text x="330" y="190" fill="#94a3b8" fontSize="12">Queue / Bucket</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            Packets arrive at irregular rates → bucket smoothes output to <span className="text-green-400">constant flow</span>
          </p>
        </div>

        {/* ========== CONCEPT EXPLANATION (staggered) ========== */}
        <div className="space-y-12">
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-cyan-400 pl-4 mb-4">📖 Theory & why it matters</h2>
            <div className="bg-gray-800/40 rounded-xl p-6 space-y-4">
              <p>The <strong className="text-cyan-300">leaky bucket algorithm</strong> models a network queue as a bucket with a small hole at the bottom. Packets (water) arrive at any rate – bursty or steady – but they leave the bucket at a <strong>fixed constant rate</strong>. If the bucket overflows, excess packets are dropped.</p>
              <p>Think of the Ichapur train station: passengers arrive randomly, but the ticket counter serves exactly one person every 30 seconds. The waiting hall is the bucket; any overflow means people must wait outside (dropped).</p>
              <p>In networking, it guarantees a <strong>predictable output rate</strong>, prevents congestion, and enforces service level agreements (SLAs).</p>
            </div>
          </section>

          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-cyan-400 pl-4 mb-4">🌍 Real‑world usage examples</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🏫</span>
                <h3 className="font-bold text-lg">School Wi‑Fi</h3>
                <p className="text-gray-300 text-sm">Limit each student’s bandwidth to 2 Mbps – prevents one video stream from choking the entire network.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">☁️</span>
                <h3 className="font-bold text-lg">API rate limiting</h3>
                <p className="text-gray-300 text-sm">Stripe / GitHub APIs allow 5000 requests per hour – bursty calls are queued and processed at a fixed pace.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">📡</span>
                <h3 className="font-bold text-lg">Router QoS</h3>
                <p className="text-gray-300 text-sm">Prioritise VoIP packets: the leaky bucket guarantees jitter‑free voice by smoothing out traffic.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">⚙️</span>
                <h3 className="font-bold text-lg">Industrial IoT</h3>
                <p className="text-gray-300 text-sm">Sensor data is transmitted at a controlled rate to avoid flooding a central server.</p>
              </div>
            </div>
          </section>

          {/* ========== PROTOTYPE / SIGNATURE ========== */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[300ms] bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">🧩 Prototype / Signature (pseudocode)</h2>
            <pre className="bg-gray-950 p-4 rounded-lg text-sm text-cyan-300 overflow-x-auto">
{`function leakyBucket(packet, bucket_capacity, leak_rate):
    if bucket.current_size + packet.size <= bucket_capacity:
        bucket.current_size += packet.size
        enqueue(packet)
        return ACCEPTED
    else:
        return DROPPED

// Periodic leak (every time unit)
while true:
    sleep(1 / leak_rate)
    bucket.current_size = max(0, bucket.current_size - 1)`}
            </pre>
            <p className="mt-3 text-gray-300 text-sm"><strong>Purpose:</strong> smooth bursty traffic into a constant‑rate stream.<br />
            <strong>When used:</strong> traffic shaping, congestion avoidance, SLA enforcement.</p>
          </section>

          {/* Tips & Tricks */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-cyan-400 pl-4 mb-4">💡 Pro tips & tricks</h2>
            <ul className="list-disc list-inside space-y-2 bg-gray-800/40 rounded-xl p-5">
              <li>Use <strong>two leaky buckets</strong> in series for hierarchical shaping (e.g., per‑user + per‑application).</li>
              <li>Choose leak rate <code className="bg-gray-900 px-1 rounded">≈ 80%</code> of link capacity to absorb micro‑bursts.</li>
              <li>In JavaScript (Node.js) implement with <code>setInterval</code> and a queue – works for lightweight rate limiting.</li>
              <li>Always monitor <strong>drop rate</strong> – if >5% increase bucket capacity or leak rate.</li>
            </ul>
          </section>

          {/* Common pitfalls & best practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fade-up_0.5s_ease-out] animation-delay-[500ms]">
            <div className="bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400">
              <h3 className="font-bold text-xl mb-2 text-red-300">⚠️ Common pitfalls</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Forgetting that a full bucket <strong>drops all new packets</strong> – not just one.</li>
                <li>Setting leak rate higher than physical link speed → queue never empties.</li>
                <li>Using leaky bucket for <em>burst‑critical</em> applications (video streaming) – token bucket is better.</li>
                <li>Misconception: “Leaky bucket = token bucket” – they are different; leaky has rigid output, token allows bursts.</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-xl p-5 border-l-4 border-green-400">
              <h3 className="font-bold text-xl mb-2 text-green-300">✅ Best practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Always combine with a <strong>drop policy</strong> (tail‑drop or RED).</li>
                <li>Document bucket capacity and leak rate in config files (e.g., YAML).</li>
                <li>Add metrics: queue length, drop count, average wait time.</li>
                <li>Start with small capacity and increase based on real traffic logs.</li>
              </ul>
            </div>
          </div>

          {/* Mini checklist */}
          <div className="bg-cyan-950/30 rounded-xl p-5 text-center md:text-left animate-[fade-up_0.5s_ease-out] animation-delay-[600ms]">
            <h3 className="font-mono font-bold text-cyan-300">📋 Mini checklist – “I know leaky bucket when…”</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 list-disc list-inside">
              <li>✓ I can explain why output is constant even with bursty input.</li>
              <li>✓ I know the difference between bucket capacity and leak rate.</li>
              <li>✓ I have implemented a simple counter‑based simulator.</li>
              <li>✓ I can name two real products that use leaky bucket.</li>
            </ul>
          </div>

          {/* Hint section */}
          <div className="bg-gray-800/60 rounded-xl p-5 border border-dashed border-yellow-500/50 animate-[fade-up_0.5s_ease-out] animation-delay-[700ms]">
            <p className="text-yellow-300 font-medium">💭 <strong>Hint – think about:</strong></p>
            <p className="text-gray-200">Why does the leaky bucket <strong>not allow any burst</strong> beyond the bucket’s physical capacity?<br />
            Observe carefully: if you send 100 packets instantly, only the first N (capacity) enter; the rest are dropped. This is great for strict SLAs but wasteful for web traffic. Try changing <code>leak_rate</code> to a very small number – what happens to the queue length?</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[800ms]">
          <FAQTemplate title="Leaky Bucket Algorithm – FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[900ms] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="Remind students: The leaky bucket enforces a rigid output rate. It’s excellent for circuit‑emulation or when you must avoid any burst. In class, use a physical bucket with a hole and beads (packets) – they instantly see overflow vs. smooth trickle. Also compare with token bucket in next lesson!" />
        </div>
      </div>

      {/* Inline keyframes for fade-up (motion-safe) */}
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

export default Topic0;