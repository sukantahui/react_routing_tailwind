import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic11_files/topic11_questions";

/**
 * Component: Topic11
 * Purpose: Explains how DNS caching improves performance, reduces latency, and lowers network traffic.
 * Audience: Students who understand basic DNS resolution (Topics 0-10).
 * Returns: JSX.Element
 */
const Topic11 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            DNS Caching
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            How DNS remembers answers to make the internet faster
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </section>

        {/* Main concept + SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">What is DNS Caching?</h2>
            <p>
              <span className="font-semibold">DNS caching</span> is the temporary storage of DNS query results
              on a device (like your computer) or a DNS resolver. When you ask for <code>google.com</code> the
              first time, the resolver fetches the answer from authoritative servers. That answer is then kept
              in cache for a specific duration (<strong>Time To Live – TTL</strong>). Subsequent requests for the
              same domain are answered instantly from cache – no network trips needed.
            </p>
            <p>
              Think of it like a student (<span className="font-semibold">Debangshu</span>) asking a teacher for a
              book in the library. The teacher writes down the shelf location on a sticky note. Next time any student
              asks for the same book, the teacher reads the note instead of walking to the central catalog.
            </p>
            <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="italic text-purple-800 dark:text-purple-300">
                “Caching turns every subsequent lookup into a nearly instant memory recall.”
              </p>
            </div>
          </div>

          {/* SVG: Caching illustration */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 400 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="280" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* User computer */}
              <g transform="translate(20, 100)">
                <rect x="0" y="0" width="60" height="50" fill="#3B82F6" rx="6" />
                <text x="18" y="28" fill="white" fontSize="8">Browser</text>
                <text x="5" y="65" fill="#6B7280" fontSize="8">Cache</text>
                <rect x="20" y="70" width="20" height="15" fill="#F59E0B" rx="2" />
                <text x="23" y="81" fill="white" fontSize="7">📦</text>
              </g>
              
              {/* Recursive Resolver */}
              <g transform="translate(260, 100)">
                <rect x="0" y="0" width="90" height="60" fill="#10B981" rx="6" />
                <text x="15" y="25" fill="white" fontSize="9">DNS Resolver</text>
                <text x="10" y="40" fill="white" fontSize="8">Cache</text>
                <rect x="35" y="45" width="20" height="12" fill="#F59E0B" rx="2" />
                <text x="38" y="54" fill="white" fontSize="6">📦</text>
              </g>
              
              {/* Arrow 1: First request */}
              <line x1="85" y1="25" x2="255" y2="25" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
              <text x="140" y="18" fill="#F59E0B" fontSize="8">1st: example.com?</text>
              
              {/* Arrow 1 return */}
              <line x1="255" y1="45" x2="85" y2="45" stroke="#F59E0B" strokeWidth="2" />
              <text x="145" y="60" fill="#F59E0B" fontSize="8">IP (slow)</text>
              
              {/* Arrow 2: cached request */}
              <line x1="85" y1="80" x2="255" y2="80" stroke="#3B82F6" strokeWidth="3" />
              <text x="140" y="95" fill="#3B82F6" fontSize="8">2nd: cached → instant!</text>
              
              {/* Cloud note */}
              <text x="130" y="200" fill="#6B7280" fontSize="9">Cached answers skip the internet</text>
            </svg>
          </div>
        </div>

        {/* Where caching happens - 3 levels */}
        <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Levels of DNS Caching</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { level: "Browser Cache", desc: "Chrome, Firefox store DNS results for a few seconds to minutes. Super fast but short-lived." },
              { level: "OS Cache", desc: "Your operating system (Windows, macOS, Linux) maintains a cache. Check with `ipconfig /displaydns`." },
              { level: "Resolver Cache", desc: "Your ISP or public resolver (e.g., 8.8.8.8) caches for many users. Large and efficient." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-400">{item.level}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TTL explanation */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">⏱️ Time To Live (TTL) – The Expiration Clock</h3>
          <p className="mt-2">
            Every DNS record has a TTL value (in seconds) set by the domain owner. It tells resolvers how long to keep
            the record in cache. Short TTL (e.g., 300 seconds) means changes propagate quickly but more queries hit
            authoritative servers. Long TTL (e.g., 86400 seconds = 1 day) reduces load but delays updates.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg">
              <span className="font-mono font-bold text-yellow-700 dark:text-yellow-300">TTL = 30s</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Disaster recovery / migration</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
              <span className="font-mono font-bold text-green-700 dark:text-green-300">TTL = 3600s (1h)</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Normal website</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <span className="font-mono font-bold text-blue-700 dark:text-blue-300">TTL = 604800s (7d)</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stable, rarely changed records</p>
            </div>
          </div>
        </div>

        {/* Real-world example */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Real-world scenario: School website</h2>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl">
            <p>
              <span className="font-semibold">Mahima</span> from <span className="font-semibold">Ichapur</span> visits <code>barrackporehigh.edu</code> at 9:00 AM.
              The DNS resolver (ISP) has never seen this domain → goes through full recursive resolution (root, TLD, authoritative) – takes ~50ms.
              The result is cached with TTL = 1 hour.
            </p>
            <p className="mt-2">
              At 9:05 AM, <span className="font-semibold">Abhronila</span> visits the same site. The resolver still has the cached record → responds instantly (~1ms).
              At 10:05 AM, TTL expires, and the next request triggers a fresh lookup.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              💡 Without caching, every single request would take ~50ms, multiplying latency and overloading DNS servers.
            </p>
          </div>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Forgetting to flush cache:</strong> After changing DNS records, old cached entries cause "stale" results.</li>
              <li><strong>Setting TTL too low:</strong> Increases load on authoritative servers (and cost).</li>
              <li><strong>Assuming caching is global:</strong> Each resolver caches independently; propagation is not instant.</li>
              <li><strong>Ignoring negative caching:</strong> "Domain not found" errors are also cached (NXDOMAIN).</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Plan TTL changes: Lower TTL before a server migration, raise it after.</li>
              <li>Flush local DNS cache when troubleshooting: <code>ipconfig /flushdns</code> (Windows), <code>sudo dscacheutil -flushcache</code> (macOS).</li>
              <li>Use <code>dig +ttlid</code> to see TTL values of any domain.</li>
              <li>For critical infrastructure, set TTL as low as 30s during failover events.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use <code className="bg-white dark:bg-gray-800 px-1 rounded">dig +noall +answer example.com</code> to see only the answer section with TTL.</p>
            <p>✔ For a domain you control, reduce TTL to 300 seconds 24 hours before changing IPs.</p>
            <p>✔ After migration, set TTL back to 3600 or higher to reduce resolver load.</p>
            <p>✔ Educators: Use the analogy of a classroom bulletin board – once a teacher writes a notice (cache), students don't need to ask the principal again.</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>DNS caching stores query results temporarily</li>
            <li>TTL (Time To Live) controls cache duration</li>
            <li>Caching happens at browser, OS, and resolver levels</li>
            <li>Lower TTL = faster updates, higher load</li>
            <li>Flush cache to force a fresh lookup after DNS changes</li>
            <li>Negative caching also exists (NXDOMAIN responses)</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-purple-400 dark:border-purple-600 p-5 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If a popular website like YouTube has a TTL of 60 seconds, how many queries per second would the authoritative
            DNS servers need to handle globally? What happens if they set TTL to 1 day?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> When you change your website's IP address and still see the old page,
            your computer's DNS cache is the likely culprit. Try <code>ipconfig /flushdns</code> (Windows) or restart your browser.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <FAQTemplate title="DNS Caching FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <Teacher
            note={"Students often think caching is magic – explain that TTL is an instruction from the domain owner. Use the 'library sticky note' analogy: the librarian writes the shelf number (TTL in seconds) and removes it after that time. Also point out that negative caching (storing 'does not exist') prevents repeated failed lookups – a common exam topic."}
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

export default Topic11;