import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic12_files/topic12_questions";

/**
 * Component: Topic12
 * Purpose: Explains forward lookup (domain → IP) vs reverse lookup (IP → domain) in DNS.
 * Audience: Students who understand basic DNS resolution and caching (Topics 0-11).
 * Returns: JSX.Element
 */
const Topic12 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Forward Lookup vs Reverse Lookup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Two directions of DNS: name → IP and IP → name
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
        </section>

        {/* Main concept + SVG comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">What's the difference?</h2>
            <p>
              <span className="font-semibold">Forward lookup</span> is what most people think of as DNS: 
              given a domain name (e.g., <code>example.com</code>), return the IP address. This uses <strong>A (IPv4)</strong> 
              or <strong>AAAA (IPv6)</strong> records.
            </p>
            <p>
              <span className="font-semibold">Reverse lookup</span> does the opposite: given an IP address 
              (e.g., <code>192.0.2.45</code>), find the domain name associated with it. This uses 
              <strong>PTR (Pointer)</strong> records stored in a special domain: <code>.in-addr.arpa</code> for IPv4 
              and <code>.ip6.arpa</code> for IPv6.
            </p>
            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="italic text-orange-800 dark:text-orange-300">
                “Forward lookup is like looking up a person's phone number by their name. Reverse lookup is like looking up a name by the phone number.”
              </p>
            </div>
          </div>

          {/* SVG: Forward vs Reverse */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 420 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="300" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Forward lookup area */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="180" height="110" fill="#FEF3C7" className="dark:fill-yellow-950/30" rx="8" />
                <text x="60" y="20" fill="#D97706" fontSize="12" fontWeight="bold">Forward Lookup</text>
                <text x="20" y="45" fill="#374151" className="dark:text-gray-300" fontSize="10">Input: domain name</text>
                <text x="20" y="60" fill="#374151" className="dark:text-gray-300" fontSize="10">  → "google.com"</text>
                <text x="20" y="80" fill="#374151" className="dark:text-gray-300" fontSize="10">Output: IP address</text>
                <text x="20" y="95" fill="#374151" className="dark:text-gray-300" fontSize="10">  → "142.250.185.46"</text>
              </g>
              
              {/* Reverse lookup area */}
              <g transform="translate(220, 20)">
                <rect x="0" y="0" width="180" height="110" fill="#E0E7FF" className="dark:fill-indigo-950/30" rx="8" />
                <text x="55" y="20" fill="#4F46E5" fontSize="12" fontWeight="bold">Reverse Lookup</text>
                <text x="20" y="45" fill="#374151" className="dark:text-gray-300" fontSize="10">Input: IP address</text>
                <text x="20" y="60" fill="#374151" className="dark:text-gray-300" fontSize="10">  → "8.8.8.8"</text>
                <text x="20" y="80" fill="#374151" className="dark:text-gray-300" fontSize="10">Output: domain name</text>
                <text x="20" y="95" fill="#374151" className="dark:text-gray-300" fontSize="10">  → "dns.google"</text>
              </g>
              
              {/* Arrow indicating direction */}
              <path d="M110 150 L110 180 L210 180 L210 150" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
              </path>
              <text x="130" y="170" fill="#10B981" fontSize="9">Opposite</text>
              
              {/* PTR record example */}
              <g transform="translate(30, 210)">
                <rect x="0" y="0" width="360" height="60" fill="#F3F4F6" className="dark:fill-gray-800" rx="8" />
                <text x="15" y="25" fill="#6B7280" fontSize="10">Special reverse zone:</text>
                <text x="15" y="42" fill="#1F2937" className="dark:text-gray-200" fontSize="11">45.0.2.192.in-addr.arpa → PTR example.com</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Forward lookup details */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">🔍 Forward Lookup (Name → IP)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">How it works</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Your browser asks the recursive resolver for <code>www.wikipedia.org</code>. The resolver performs
                recursive queries (root → .org TLD → wikipedia authoritative) and returns an A or AAAA record.
                This is the default DNS behavior – 99% of lookups are forward lookups.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Record types used</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                <li><strong>A</strong> – IPv4 address</li>
                <li><strong>AAAA</strong> – IPv6 address</li>
                <li><strong>CNAME</strong> – alias (indirect forward lookup)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reverse lookup details */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">🔄 Reverse Lookup (IP → Name)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">The special zone</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Reverse lookup uses the <code>in-addr.arpa</code> domain for IPv4. The IP address is reversed and
                appended. For <code>192.0.2.45</code>, the query becomes <code>45.2.0.192.in-addr.arpa</code> looking
                for a <strong>PTR record</strong>. IPv6 uses <code>ip6.arpa</code> with nibble format.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Why use reverse lookup?</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                <li>Email servers verify sender IP → domain (anti-spam)</li>
                <li>Logging: convert IPs to hostnames for readability</li>
                <li>Troubleshooting: <code>traceroute</code> shows names instead of raw IPs</li>
                <li>Security: detect mismatched forward/reverse entries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-world example - School analogy */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">🏫 Real-world example: Barrackpore High School</h3>
          <p className="mt-2">
            <span className="font-semibold">Forward lookup:</span> Teacher <span className="font-semibold">Mahima</span> says "Call Susmita" 
            → office looks up roll number 24 (IP) and dials her classroom.
          </p>
          <p className="mt-2">
            <span className="font-semibold">Reverse lookup:</span> Principal sees a phone call from extension 24 
            → looks up which student uses that extension → "Susmita".
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            💡 In networking, reverse lookup is less common but critical for email authentication (PTR records must match forward A records for many mail servers).
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards] bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h3 className="text-xl font-bold mb-4">📊 Forward vs Reverse – At a glance</h3>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2 px-4 font-semibold">Aspect</th>
                <th className="py-2 px-4 font-semibold text-orange-600 dark:text-orange-400">Forward Lookup</th>
                <th className="py-2 px-4 font-semibold text-indigo-600 dark:text-indigo-400">Reverse Lookup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[
                ["Direction", "Domain → IP", "IP → Domain"],
                ["Record type", "A / AAAA", "PTR (Pointer)"],
                ["Zone", "Standard domain zone", ".in-addr.arpa / .ip6.arpa"],
                ["Frequency", "Very common (every web visit)", "Less common, specialized use"],
                ["Required for internet", "Yes, mandatory", "No, but recommended"],
                ["Example command", "`dig example.com`", "`dig -x 8.8.8.8`"]
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-2 px-4 font-medium">{row[0]}</td>
                  <td className="py-2 px-4">{row[1]}</td>
                  <td className="py-2 px-4">{row[2]}</td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Forgetting PTR records:</strong> Many sysadmins set up A records but ignore reverse DNS, breaking email deliverability.</li>
              <li><strong>Reverse IP order mistake:</strong> Remember to reverse octets for IPv4 (192.168.1.1 → 1.1.168.192.in-addr.arpa).</li>
              <li><strong>Assuming one domain per IP:</strong> An IP can have multiple PTR records (rare, but possible).</li>
              <li><strong>Not all IPs have reverse DNS:</strong> Many consumer IPs lack PTR records.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Always configure PTR records for mail servers and public-facing services.</li>
              <li>Ensure forward and reverse DNS match (forward-confirmed reverse DNS).</li>
              <li>Use `dig -x` to test reverse lookups before deploying services.</li>
              <li>For IPv6, use `ip6.arpa` with proper nibble formatting.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-orange-950/30 dark:to-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use <code className="bg-white dark:bg-gray-800 px-1 rounded">host &lt;ip&gt;</code> or <code className="bg-white dark:bg-gray-800 px-1 rounded">nslookup &lt;ip&gt;</code> for quick reverse checks.</p>
            <p>✔ In logs, use <code className="bg-white dark:bg-gray-800 px-1 rounded">logresolve</code> (Apache) to convert IPs to domains after the fact.</p>
            <p>✔ For SPF/DKIM/DMARC, reverse DNS consistency is crucial.</p>
            <p>✔ Educators: Use phone contact list analogy – forward = name to number, reverse = number to name (caller ID).</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>Forward lookup = name → IP (A/AAAA records)</li>
            <li>Reverse lookup = IP → name (PTR records)</li>
            <li>Reverse zone: .in-addr.arpa for IPv4, .ip6.arpa for IPv6</li>
            <li>PTR is the only record type used in reverse zones</li>
            <li>Reverse DNS is optional but critical for email servers</li>
            <li>Use `dig -x IP` to test reverse lookup</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-orange-400 dark:border-orange-600 p-5 rounded-xl bg-orange-50/30 dark:bg-orange-950/20 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you send an email from <code>smtp.example.com</code> (IP 203.0.113.5), why would the receiving mail server
            do a reverse lookup on 203.0.113.5? What happens if the PTR record points to a different domain like
            `dynamic-pool.example.net`?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run <code>dig -x 8.8.8.8</code>. Notice the answer is `dns.google.` 
            Now run <code>dig dns.google</code> – you get 8.8.8.8. They match. That's proper forward-confirmed reverse DNS.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <FAQTemplate title="Forward vs Reverse Lookup FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <Teacher
            note={"Students often struggle with the reversed octet order for IPv4 reverse zones. Emphasize that it's because the hierarchical delegation works from most significant to least (ISP controls the /24, not individual IPs). Also, many exam questions test the difference between A and PTR records. Real-world tip: always set up reverse DNS for any IP that sends email – otherwise, your emails go to spam."}
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

export default Topic12;