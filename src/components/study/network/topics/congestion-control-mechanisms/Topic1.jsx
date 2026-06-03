import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans leading-relaxed">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16">
        
        {/* HEADER */}
        <header className="text-center space-y-4 animate-[fade-up_0.6s_ease-out] motion-safe:animate-[fade-up_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Token Bucket Algorithm
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Flexible traffic shaping – allowing bursts while limiting average rate
          </p>
        </header>

        {/* SVG ILLUSTRATION (animated tokens) */}
        <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.01]">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-400 rounded-full"></span>
            Visual concept
          </h2>
          <div className="flex justify-center">
            <svg width="500" height="280" viewBox="0 0 500 280" className="w-full max-w-lg">
              {/* Token bucket (transparent bowl) */}
              <path d="M160,80 L340,80 L310,220 L190,220 Z" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;-18" dur="2s" repeatCount="indefinite" />
              </path>
              
              {/* Tokens (coins) appearing inside bucket */}
              <circle cx="220" cy="140" r="8" fill="#fbbf24" opacity="0.9">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="260" cy="160" r="8" fill="#fbbf24" opacity="0.9">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0.6s" />
              </circle>
              <circle cx="280" cy="120" r="8" fill="#fbbf24" opacity="0.9">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1.2s" />
              </circle>
              <circle cx="240" cy="180" r="8" fill="#fbbf24" opacity="0.9">
                <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1.8s" />
              </circle>
              
              {/* Token refill arrow (top) */}
              <path d="M320,50 L280,50 L280,30 L250,50 L280,70 L280,50" fill="none" stroke="#facc15" strokeWidth="2">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="325" y="55" fill="#facc15" fontSize="10">Refill rate (r)</text>
              
              {/* Incoming packet consuming a token */}
              <rect x="420" y="140" width="36" height="24" fill="#fb923c" rx="3">
                <animate attributeName="x" values="420;380;340" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              </rect>
              <text x="430" y="120" fill="#fb923c" fontSize="10">Packet in</text>
              
              {/* Outgoing packet (after taking token) */}
              <rect x="100" y="140" width="36" height="24" fill="#22c55e" rx="3">
                <animate attributeName="x" values="100;60;20" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
              </rect>
              <text x="70" y="115" fill="#22c55e" fontSize="10">Packet out</text>
              
              {/* Label */}
              <text x="210" y="240" fill="#94a3b8" fontSize="12">Token bucket (max tokens = burst size)</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            Tokens arrive at a fixed rate <span className="text-yellow-400">r</span>. Each packet consumes one token → output can burst up to bucket capacity.
          </p>
        </div>

        {/* CONCEPT EXPLANATION (staggered) */}
        <div className="space-y-12">
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[100ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-emerald-400 pl-4 mb-4">📖 Theory & why it matters</h2>
            <div className="bg-gray-800/40 rounded-xl p-6 space-y-4">
              <p>The <strong className="text-emerald-300">token bucket algorithm</strong> uses a virtual bucket that holds <strong>tokens</strong>. Tokens are added at a fixed rate <code className="bg-gray-900 px-1 rounded">r</code> (e.g., 100 tokens/sec). Each packet must take one token from the bucket to be transmitted. If no tokens are available, the packet waits or is dropped.</p>
              <p>Unlike the leaky bucket, this <strong>allows bursts</strong>: if the bucket is full (capacity <code className="bg-gray-900 px-1 rounded">b</code>), you can send <code className="bg-gray-900 px-1 rounded">b</code> packets instantly. After that, the long‑term average rate is <code className="bg-gray-900 px-1 rounded">r</code>.</p>
              <p>Think of Mamata’s monthly pocket money: she gets ₹5000 at the start (burst), then ₹100 per day (refill rate). She can spend big at once, but over a month her average spend is capped.</p>
            </div>
          </section>

          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[200ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-emerald-400 pl-4 mb-4">🌍 Real‑world usage examples</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">📱</span>
                <h3 className="font-bold text-lg">Mobile data plans</h3>
                <p className="text-gray-300 text-sm">“2GB high‑speed then 64 kbps” – initially you can burst, then the token refill rate throttles you.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🎥</span>
                <h3 className="font-bold text-lg">Video streaming (YouTube)</h3>
                <p className="text-gray-300 text-sm">The player buffers ahead (burst) and then plays at constant bitrate – exactly token bucket behaviour.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🛡️</span>
                <h3 className="font-bold text-lg">DDoS protection (Cloudflare)</h3>
                <p className="text-gray-300 text-sm">Rate limit per IP: allow bursts of 50 requests, sustained 10 per second.</p>
              </div>
              <div className="bg-gray-800/40 rounded-xl p-5 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-md">
                <span className="text-3xl block mb-2">🚦</span>
                <h3 className="font-bold text-lg">Traffic shaping in Linux (tc)</h3>
                <p className="text-gray-300 text-sm">The `tbf` (token bucket filter) is a standard qdisc used by network administrators.</p>
              </div>
            </div>
          </section>

          {/* PROTOTYPE / SIGNATURE */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[300ms] bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">🧩 Prototype / Signature (pseudocode)</h2>
            <pre className="bg-gray-950 p-4 rounded-lg text-sm text-emerald-300 overflow-x-auto">
{`class TokenBucket:
    capacity: int      # max tokens (burst size)
    tokens: float      # current tokens
    rate: float        # tokens added per second
    last_refill: timestamp

    function consume(packet):
        refill()       # add tokens based on time elapsed
        if tokens >= 1:
            tokens -= 1
            forward(packet)
            return true
        else:
            drop(packet) or wait
            return false

    function refill():
        now = current_time()
        delta = now - last_refill
        tokens = min(capacity, tokens + delta * rate)
        last_refill = now`}
            </pre>
            <p className="mt-3 text-gray-300 text-sm"><strong>Purpose:</strong> allow bursts up to `capacity`, then enforce a long‑term average `rate`.<br />
            <strong>When used:</strong> API rate limiting, network interface shaping, cloud Auto Scaling policies.</p>
          </section>

          {/* Tips & Tricks */}
          <section className="animate-[fade-up_0.5s_ease-out] motion-safe:animate-[fade-up_0.5s_ease-out] animation-delay-[400ms]">
            <h2 className="text-2xl font-semibold border-l-4 border-emerald-400 pl-4 mb-4">💡 Pro tips & tricks</h2>
            <ul className="list-disc list-inside space-y-2 bg-gray-800/40 rounded-xl p-5">
              <li>Set <strong>burst size</strong> to 2× RTT of your application – absorbs natural TCP windows.</li>
              <li>In production, use <strong>Redis + Lua script</strong> for a distributed token bucket (atomic operations).</li>
              <li>For real‑time video, use a very small bucket (e.g., 10 ms of data) to keep latency low.</li>
              <li>Monitor <code>token deficit</code> – if it stays near zero for long, increase rate or capacity.</li>
              <li>Combine token bucket with <strong>leaky bucket</strong> – token for burst shaping, leaky for jitter smoothing.</li>
            </ul>
          </section>

          {/* Common pitfalls & best practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fade-up_0.5s_ease-out] animation-delay-[500ms]">
            <div className="bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400">
              <h3 className="font-bold text-xl mb-2 text-red-300">⚠️ Common pitfalls</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Forgetting that <strong>tokens are not bytes</strong> – if packet sizes vary, use byte‑mode buckets.</li>
                <li>Setting capacity too low → kills all bursts, reducing efficiency.</li>
                <li>Misunderstanding: “Token bucket = leaky bucket” – no, leaky has no burst capability.</li>
                <li>Implementing without a <strong>time‑based refill</strong> – using a periodic timer may drift on overloaded systems.</li>
                <li>Not handling <strong>clock jumps</strong> (NTP) – can cause artificial token overflow or starvation.</li>
              </ul>
            </div>
            <div className="bg-green-900/20 rounded-xl p-5 border-l-4 border-green-400">
              <h3 className="font-bold text-xl mb-2 text-green-300">✅ Best practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Always store <code>last_refill</code> as a high‑resolution timestamp (e.g., <code>time_ns</code>).</li>
                <li>Use <strong>floating point</strong> for tokens to handle fractional refills.</li>
                <li>Log token exhaustion events – high frequency indicates insufficient rate.</li>
                <li>Test with bursty traffic patterns before deploying.</li>
              </ul>
            </div>
          </div>

          {/* Mini checklist */}
          <div className="bg-emerald-950/30 rounded-xl p-5 text-center md:text-left animate-[fade-up_0.5s_ease-out] animation-delay-[600ms]">
            <h3 className="font-mono font-bold text-emerald-300">📋 Mini checklist – “I know token bucket when…”</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 list-disc list-inside">
              <li>✓ I can explain why a token bucket permits bursts.</li>
              <li>✓ I know the relationship between rate, capacity, and average throughput.</li>
              <li>✓ I have implemented an in‑memory token bucket (Python/JS).</li>
              <li>✓ I can name two cloud APIs that use token‑based rate limiting.</li>
            </ul>
          </div>

          {/* Hint section */}
          <div className="bg-gray-800/60 rounded-xl p-5 border border-dashed border-yellow-500/50 animate-[fade-up_0.5s_ease-out] animation-delay-[700ms]">
            <p className="text-yellow-300 font-medium">💭 <strong>Hint – think about:</strong></p>
            <p className="text-gray-200">If the bucket capacity is 10 tokens and refill rate is 5 tokens/sec, how many packets can you send in the first 2 seconds?<br />
            Observe carefully: you start full (10 tokens), so you can send 10 packets immediately. Then you earn tokens at 5/sec – after 2 seconds you have 10 more tokens. So total = 20 packets. Without the initial burst, only 10 packets (5/sec × 2) would be allowed. The burst matters!</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[800ms]">
          <FAQTemplate title="Token Bucket Algorithm – FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fade-up_0.5s_ease-out] animation-delay-[900ms] transition-all duration-300 hover:scale-[1.01]">
          <Teacher note="Compare the token bucket with the leaky bucket side by side. Token bucket is the de facto standard for API rate limiting (GitHub, Stripe). For beginners, use a coffee shop analogy: tokens = coffee coupons; you get 2 coupons per day but can use up to 10 saved coupons at once. Ask students: which one (leaky vs token) would you use for a live video stream?" />
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

export default Topic1;