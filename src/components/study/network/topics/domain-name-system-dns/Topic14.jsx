import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic14_files/topic14_questions";

/**
 * Component: Topic14
 * Purpose: Step-by-step walkthrough of exactly what happens when a user types a URL and the browser loads the page, focusing on DNS.
 * Audience: Students who understand DNS concepts from previous topics.
 * Returns: JSX.Element
 */
const Topic14 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Real-World Example: Browser + DNS
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            What really happens when you type a website address – a complete journey
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
        </section>

        {/* Story setting */}
        <div className="bg-cyan-50 dark:bg-cyan-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <p className="text-lg">
            Meet <span className="font-semibold">Abhronila</span>, a student in <span className="font-semibold">Barrackpore</span>. 
            She opens her laptop, types <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">barrackporehigh.edu</code> into Chrome, 
            and presses Enter. What happens next? Let's trace every millisecond.
          </p>
        </div>

        {/* Step-by-step SVG timeline */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">🚀 The 10-Step Journey</h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-x-auto">
            <svg viewBox="0 0 1000 380" className="w-full h-auto min-w-[800px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="1000" height="380" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Step boxes */}
              {[
                { x: 20, y: 20, num: "1", text: "Browser\ncache", desc: "Checks if barrackporehigh.edu was visited recently", color: "#3B82F6" },
                { x: 140, y: 20, num: "2", text: "OS cache", desc: "Operating system's DNS cache", color: "#3B82F6" },
                { x: 260, y: 20, num: "3", text: "Router\ncache", desc: "Home router's temporary storage", color: "#3B82F6" },
                { x: 380, y: 20, num: "4", text: "ISP Recursive\nResolver", desc: "Asks: 'Where is barrackporehigh.edu?'", color: "#10B981" },
                { x: 500, y: 20, num: "5", text: "Root Server", desc: "Points to .edu TLD", color: "#F59E0B" },
                { x: 620, y: 20, num: "6", text: ".edu TLD\nServer", desc: "Points to school's authoritative NS", color: "#F59E0B" },
                { x: 740, y: 20, num: "7", text: "Authoritative\nServer", desc: "Returns IP 203.0.113.88", color: "#EF4444" },
                { x: 860, y: 20, num: "8", text: "Resolver\ncaches IP", desc: "Stores for next user", color: "#10B981" }
              ].map((step, idx) => (
                <g key={idx}>
                  <rect x={step.x} y={step.y} width="105" height="90" fill={step.color} rx="6" opacity="0.9" />
                  <text x={step.x+5} y={step.y+20} fill="white" fontSize="14" fontWeight="bold">{step.num}</text>
                  <text x={step.x+25} y={step.y+20} fill="white" fontSize="10">{step.text}</text>
                  <text x={step.x+5} y={step.y+45} fill="white" fontSize="8">{step.desc}</text>
                  {/* Arrow */}
                  {idx < 7 && (
                    <line x1={step.x+105} y1={step.y+45} x2={step.x+125} y2={step.y+45} stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)" />
                  )}
                </g>
              ))}
              
              {/* Step 9: Browser connects */}
              <g transform="translate(20, 160)">
                <rect x="0" y="0" width="250" height="50" fill="#8B5CF6" rx="8" />
                <text x="15" y="30" fill="white" fontSize="12">9. Browser connects to 203.0.113.88:443</text>
                <text x="15" y="45" fill="white" fontSize="10">(HTTPS handshake, TLS, then HTTP request)</text>
              </g>
              
              {/* Step 10: Page loads */}
              <g transform="translate(350, 160)">
                <rect x="0" y="0" width="250" height="50" fill="#EC4899" rx="8" />
                <text x="15" y="30" fill="white" fontSize="12">10. School webpage appears!</text>
                <text x="15" y="45" fill="white" fontSize="10">HTML, CSS, JS, images load</text>
              </g>
              
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#6B7280" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Detailed textual step-by-step */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">📖 Step-by-Step Breakdown</h2>
          <div className="space-y-3">
            {[
              "1️⃣ **Browser cache check** – Chrome looks in its own DNS cache (history). Miss (never visited or TTL expired).",
              "2️⃣ **OS cache check** – Windows/macOS/Linux maintains a system-wide cache. Another miss.",
              "3️⃣ **Router cache** – Some home routers cache DNS results. Still miss.",
              "4️⃣ **Recursive resolver (ISP)** – Abhronila's ISP received the query. It doesn't know the answer yet, so it starts recursive resolution.",
              "5️⃣ **Root server query** – The resolver asks one of the 13 root server groups: 'Where can I find .edu?' Root returns the nameservers for .edu TLD.",
              "6️⃣ **TLD server (.edu) query** – Resolver asks .edu TLD: 'Who manages barrackporehigh.edu?' TLD returns the school's authoritative nameserver (NS record).",
              "7️⃣ **Authoritative server query** – Resolver asks the school's DNS server: 'What is the A record for barrackporehigh.edu?' The authoritative server replies: 203.0.113.88.",
              "8️⃣ **Resolver caches IP** – The resolver stores the IP with the TTL (e.g., 3600 seconds) for future students from Barrackpore.",
              "9️⃣ **Browser connects** – Chrome now has IP 203.0.113.88. It initiates a TCP handshake, then TLS (HTTPS) negotiation, and sends an HTTP GET request.",
              "🔟 **Page loads** – The web server responds with HTML, CSS, JavaScript, images. Abhronila sees the school's homepage."
            ].map((step, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Diagram with caching hits */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h3 className="text-xl font-bold">💾 What if caching worked?</h3>
          <p className="mt-2">
            Imagine <span className="font-semibold">Susmita</span> from <span className="font-semibold">Ichapur</span> visits the same website 5 minutes after Abhronila.
            The ISP resolver still has the cached entry (TTL not expired). Steps 5-7 (root, TLD, authoritative) are skipped entirely.
            The page loads in <span className="font-semibold">~10ms</span> instead of ~50ms. That's the power of DNS caching.
          </p>
        </div>

        {/* Typical timing diagram */}
        <div className="overflow-x-auto animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h3 className="text-xl font-bold mb-4">⏱️ Typical timing (first visit, no cache)</h3>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2 px-4 font-semibold">Step</th>
                <th className="py-2 px-4 font-semibold">Duration</th>
                <th className="py-2 px-4 font-semibold">Cumulative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Browser & OS cache check</td><td className="py-2 px-4">&lt;1ms</td><td className="py-2 px-4">&lt;1ms</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Root server query</td><td className="py-2 px-4">~10ms</td><td className="py-2 px-4">~10ms</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">.edu TLD query</td><td className="py-2 px-4">~15ms</td><td className="py-2 px-4">~25ms</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Authoritative query</td><td className="py-2 px-4">~10ms</td><td className="py-2 px-4">~35ms</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Browser connection (TCP+TLS)</td><td className="py-2 px-4">~60ms</td><td className="py-2 px-4">~95ms</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">HTTP request/response</td><td className="py-2 px-4">~30ms</td><td className="py-2 px-4">~125ms</td></tr>
              <tr className="bg-blue-50 dark:bg-blue-950/30"><td className="py-2 px-4 font-semibold">Total (user sees page)</td><td className="py-2 px-4 font-semibold">≈125ms</td><td className="py-2 px-4 font-semibold"></td></tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">* Times are approximate and vary by network, server location, and latency.</p>
        </div>

        {/* Real-world twists */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">🌐 Real-world complexities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-amber-600">Load balancing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">barrackporehigh.edu might have multiple A records (round-robin) or use a CDN → different IP per location.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-amber-600">CNAME chains</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">The school might use www → @ → CDN endpoint, requiring multiple lookups.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-amber-600">IPv6 happy eyeballs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browser tries AAAA (IPv6) and A (IPv4) simultaneously, uses whichever responds first.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-amber-600">Private DNS / DoH</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">If Abhronila enabled DNS over HTTPS (DoH), steps 4-8 are encrypted; ISP cannot see the domain.</p>
            </div>
          </div>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Forgetting TTL:</strong> Changing website IP but not lowering TTL first → users see old site for hours.</li>
              <li><strong>Ignoring caches:</strong> Troubleshooting DNS issues without flushing browser/OS cache wastes time.</li>
              <li><strong>Assuming DNS is the only delay:</strong> TCP/TLS handshakes often dominate load time.</li>
              <li><strong>Not testing from different networks:</strong> Home vs school vs cellular may hit different resolvers with different caches.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Use browser DevTools (Network tab) to see DNS lookup timing (often shown as "DNS Lookup" or "Queueing").</li>
              <li>Preload critical domains with {`<link rel="dns-prefetch" href="//example.com">`}.</li>
              <li>For high-traffic sites, use a CDN that handles DNS geo-routing.</li>
              <li>Monitor DNS resolution time with tools like `dig +stats`.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use `curl -w "@curl-format.txt" -o /dev/null -s https://example.com` to see breakdown including DNS time.</p>
            <p>✔ Chrome's `chrome://net-export/` logs every DNS query with timestamps.</p>
            <p>✔ `dig +trace` shows each step of recursive resolution in real time.</p>
            <p>✔ Educators: Act out the steps with students as different DNS servers – memorable for classes.</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>Browser cache → OS cache → Router cache → Recursive resolver</li>
            <li>Resolver queries: Root → TLD → Authoritative</li>
            <li>Caching hits skip external queries, making load faster</li>
            <li>DNS resolution is just one part of page load (TCP, TLS, HTTP also take time)</li>
            <li>Use DevTools to see DNS timing</li>
            <li>Each step builds on previous topics (A records, TTL, caching, etc.)</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-blue-400 dark:border-blue-600 p-5 rounded-xl bg-blue-50/30 dark:bg-blue-950/20 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you open the same website on two different browsers on the same computer, will they share DNS cache?
            What about two different laptops connected to the same Wi-Fi?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Open Chrome DevTools (F12), go to Network tab, reload the page, and look for the "DNS Lookup" column.
            If you don't see it, right-click the column headers and enable it. That shows exactly how long DNS took for each resource.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <FAQTemplate title="Real-World DNS Example FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards]">
          <Teacher
            note={"This topic ties together everything from previous topics. I recommend showing a live demo: open `chrome://net-internals/#dns` and `chrome://net-export/`, then visit a website. Students will see the cache hit/miss in real time. Also, emphasize that DNS is not the only bottleneck – the TCP/TLS handshake often takes longer than DNS. For exam prep, ask students to order the steps of resolution (browser cache → OS cache → recursive resolver → root → TLD → authoritative)."}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic14;