import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic15_files/topic15_questions";

/**
 * Component: Topic15
 * Purpose: Introduces basic DNS troubleshooting tools: nslookup, ping, and dig.
 * Audience: Students who understand DNS concepts and want hands-on debugging skills.
 * Returns: JSX.Element
 */
const Topic15 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Common DNS Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            nslookup, ping, and dig – the everyday toolkit for DNS troubleshooting
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </section>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          {[
            { name: "ping", icon: "📡", desc: "Tests basic connectivity and also performs a forward lookup (domain → IP). Fast, available everywhere.", color: "blue" },
            { name: "nslookup", icon: "🔍", desc: "Query DNS records interactively or in one-liner. Simple, cross‑platform, but older syntax.", color: "green" },
            { name: "dig", icon: "🛠️", desc: "Most powerful. Shows full resolution path, TTL, DNSSEC. Industry standard for professionals.", color: "purple" }
          ].map(tool => (
            <div key={tool.name} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h3 className={`text-2xl font-bold text-${tool.color}-600 dark:text-${tool.color}-400`}>{tool.name}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* ping section */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">📡 ping – Basic connectivity + forward lookup</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
              <h3 className="font-semibold">Purpose</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Sends ICMP Echo Request to a host. Tests if the host is reachable and measures round‑trip time. Also performs a forward DNS lookup (name → IP) before sending packets.</p>
              <h3 className="font-semibold mt-3">Common usage</h3>
              <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-1 text-sm overflow-x-auto">
{`ping google.com
ping -c 4 google.com          # Linux/macOS: 4 packets
ping -n 4 google.com          # Windows: 4 packets
ping -a 8.8.8.8               # Windows: reverse lookup`}
              </pre>
              <p className="mt-2 text-yellow-600 dark:text-yellow-400 text-sm">⚠️ Note: Many networks block ICMP. A failed ping does not always mean DNS failure.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-5 rounded-xl">
              <h3 className="font-semibold">What ping tells you</h3>
              <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>DNS resolution succeeded (shows IP in first line)</li>
                <li>Latency (time to reach host and back)</li>
                <li>Packet loss (network issues)</li>
                <li>Host is alive (if ICMP allowed)</li>
              </ul>
              <div className="mt-3 p-2 bg-gray-800 rounded text-xs text-green-300 font-mono">
                PING google.com (142.250.185.46): 56 data bytes<br/>
                64 bytes from 142.250.185.46: icmp_seq=0 ttl=115 time=12.3 ms
              </div>
            </div>
          </div>
        </div>

        {/* nslookup section */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">🔍 nslookup – Simple DNS query tool</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
              <h3 className="font-semibold">Purpose</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Query DNS servers for specific record types. Interactive mode for multiple queries, or one‑liner. Available on Windows, Linux, macOS (legacy).</p>
              <h3 className="font-semibold mt-3">Common commands</h3>
              <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-1 text-sm overflow-x-auto">
{`nslookup example.com
nslookup example.com 8.8.8.8      # Use specific DNS server
nslookup -type=MX gmail.com       # Query MX records
nslookup -type=PTR 8.8.8.8        # Reverse lookup
nslookup
> set type=AAAA
> google.com
> exit`}
              </pre>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 p-5 rounded-xl">
              <h3 className="font-semibold">Pros & Cons</h3>
              <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>✅ Built-in on almost all OS</li>
                <li>✅ Simple syntax, good for beginners</li>
                <li>❌ Older, less features than dig</li>
                <li>❌ Inconsistent output across OS versions</li>
                <li>❌ Doesn't show TTL clearly by default</li>
              </ul>
              <p className="mt-2 text-yellow-600 dark:text-yellow-400 text-sm">💡 On Linux, `nslookup` often falls back to dig-compatibility mode.</p>
            </div>
          </div>
        </div>

        {/* dig section (most important) */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">🛠️ dig – Professional DNS debugger</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
              <h3 className="font-semibold">Why dig is superior</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">"Domain Information Groper" – the gold standard. Shows TTL, DNSSEC flags, full resolution path, and query/response details. Used by sysadmins worldwide.</p>
              <h3 className="font-semibold mt-3">Essential dig commands</h3>
              <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-1 text-sm overflow-x-auto">
{`# Basic forward lookup
dig example.com

# Specific record type
dig example.com MX
dig example.com NS
dig -x 8.8.8.8                     # Reverse

# Use specific DNS server
dig @8.8.8.8 example.com

# Show only answer section
dig +short example.com

# Show TTL with records
dig +ttlid example.com

# Trace full resolution path
dig +trace example.com

# DNSSEC validation
dig +dnssec example.com

# Control output
dig +noall +answer example.com`}
              </pre>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-5 rounded-xl">
              <h3 className="font-semibold">Read the output</h3>
              <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-2 text-xs overflow-x-auto">
{`;; QUESTION SECTION:
;example.com.        IN    A

;; ANSWER SECTION:
example.com.    86400   IN    A    93.184.216.34

;; Query time: 23 msec
;; SERVER: 192.168.1.1#53
;; WHEN: Tue May 12 10:00:00 2026
;; MSG SIZE  rcvd: 56`}
              </pre>
              <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>QUESTION</strong> – what was asked</li>
                <li><strong>ANSWER</strong> – the records (with TTL)</li>
                <li><strong>Query time</strong> – how long resolution took</li>
                <li><strong>SERVER</strong> – which resolver answered</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Side-by-side command comparison table */}
        <div className="overflow-x-auto animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h3 className="text-xl font-bold mb-4">📊 Command comparison</h3>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2 px-4 font-semibold">Task</th>
                <th className="py-2 px-4 font-semibold">ping</th>
                <th className="py-2 px-4 font-semibold">nslookup</th>
                <th className="py-2 px-4 font-semibold">dig</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Forward lookup (A)</td><td className="py-2 px-4">✅ (shows IP)</td><td className="py-2 px-4">✅</td><td className="py-2 px-4">✅ (best)</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Specify record type (MX, NS, etc.)</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td><td className="py-2 px-4">✅</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Show TTL</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">❌ (hard)</td><td className="py-2 px-4">✅ (clear)</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Use custom DNS server</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅</td><td className="py-2 px-4">✅</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Trace resolution path</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">✅ (+trace)</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Check connectivity</td><td className="py-2 px-4">✅ main use</td><td className="py-2 px-4">❌</td><td className="py-2 px-4">❌</td></tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="py-2 px-4">Platform</td><td className="py-2 px-4">All</td><td className="py-2 px-4">All</td><td className="py-2 px-4">Linux/macOS, Windows via bind tools</td></tr>
            </tbody>
          </table>
        </div>

        {/* Real-world troubleshooting scenarios */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🔧 Real-world scenarios</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <p className="font-semibold">Scenario: Website doesn't load</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step 1: `ping example.com` – if it shows IP, DNS works, maybe server down. Step 2: `nslookup example.com` – check if correct IP. Step 3: `dig +trace example.com` – find where resolution breaks.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
              <p className="font-semibold">Scenario: Email not arriving</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">`nslookup -type=MX gmail.com` – check mail servers. `dig -x sender-ip` – verify reverse DNS.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-l-4 border-purple-500 shadow-sm">
              <p className="font-semibold">Scenario: Suspicious redirect</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">`dig @8.8.8.8 example.com` vs `dig @your-isp example.com` – compare results; poison may only affect ISP resolver.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-l-4 border-orange-500 shadow-sm">
              <p className="font-semibold">Scenario: DNSSEC validation check</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">`dig +dnssec sigok.verteiltesysteme.net` – see "ad" flag. `dig +dnssec sigfail.verteiltesysteme.net` – expect SERVFAIL.</p>
            </div>
          </div>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Ping failing ≠ DNS broken:</strong> ICMP may be blocked. Use `nslookup` to verify DNS separately.</li>
              <li><strong>Forgetting `+short` in dig:</strong> Beginners overwhelmed by full output.</li>
              <li><strong>Using default server:</strong> `dig` uses your OS resolver (may be cached). Specify `@8.8.8.8` to bypass cache.</li>
              <li><strong>Confusing nslookup on Windows vs Linux:</strong> Output varies; use `dig` for consistent behavior.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Always use `dig` for serious DNS debugging – install via `apt-get install dnsutils` (Ubuntu) or `brew install bind` (macOS).</li>
              <li>Use `+noall +answer` to filter clutter.</li>
              <li>Chain `dig +trace` to see each step's latency.</li>
              <li>Script with `dig +short` for automation.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ `dig +qr +stats` – shows the raw query sent and statistics.</p>
            <p>✔ `dig example.com ANY` – request all records (deprecated in modern DNS).</p>
            <p>✔ `nslookup -debug example.com` – see query/response details (verbose).</p>
            <p>✔ `ping -c 3 -W 1 example.com` – timeout after 1 second, good for flaky networks.</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>ping → basic connectivity + forward lookup (but ICMP may be blocked)</li>
            <li>nslookup → simple DNS queries, available everywhere</li>
            <li>dig → professional tool, shows TTL, DNSSEC, full trace</li>
            <li>`dig @server` to bypass local cache</li>
            <li>`+trace` visualizes recursive resolution</li>
            <li>`+short` for clean, scriptable output</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-indigo-400 dark:border-indigo-600 p-5 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you run `dig google.com` and then immediately run it again, why is the second Query time often 0 msec?
            Try `dig @1.1.1.1 google.com` vs `dig @your-isp google.com` – are the answers always the same? Why might they differ?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run `dig +trace google.com`. Notice how the root server (`.`) returns a list of TLD servers, then `.com` TLD returns Google's authoritative nameservers, then those return the A record. Each delegation is a separate round‑trip.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <FAQTemplate title="DNS Tools FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards]">
          <Teacher
            note={"Students often get overwhelmed by dig's verbose output. Start with `dig +short`, then gradually introduce full output. Live demos are essential – SSH into a server or use WSL. Show them `dig +trace` – it demystifies the entire DNS hierarchy. Also emphasize that on Windows, `dig` is not installed by default; they can use `Resolve-DnsName` in PowerShell as an alternative. For classrooms, have students run `dig` against different resolvers and compare results."}
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

export default Topic15;