import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic9_files/topic9_questions";

/**
 * Component: Topic9
 * Purpose: Explains NS (Name Server) records – which servers are authoritative for a domain.
 * Audience: Students who understand A, AAAA, CNAME, MX records (previous topics).
 * Returns: JSX.Element
 */
const Topic9 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            NS Record (Name Server)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The signposts that point to where a domain's DNS information lives
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full" />
        </section>

        {/* Main concept + SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">What is an NS Record?</h2>
            <p>
              The <span className="font-semibold">NS (Name Server) record</span> identifies which DNS servers are <strong>authoritative</strong> for a domain.
              These servers hold the actual DNS records (A, MX, CNAME, etc.) for that domain.
              When a recursive resolver asks the TLD server for <code>example.com</code>, the TLD replies with NS records pointing to 
              <code>ns1.example.com</code>, <code>ns2.example.com</code>, etc.
            </p>
            <p>
              Think of it like a library's directory: the main information desk (TLD) doesn't have every book, but it has a card (NS record) telling you
              which shelf (authoritative server) holds that book.
            </p>
            <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="italic text-purple-800 dark:text-purple-300">
                “Without NS records, no one would know where to find a domain's actual DNS data.”
              </p>
            </div>
          </div>

          {/* SVG: delegation chain */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 420 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="300" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Root */}
              <g transform="translate(170, 15)">
                <circle cx="40" cy="25" r="25" fill="#3B82F6" />
                <text x="28" y="30" fill="white" fontSize="10" fontWeight="bold">Root</text>
                <text x="10" y="55" fill="#6B7280" fontSize="8">"ask .com TLD"</text>
              </g>
              
              {/* Arrow Root -> TLD */}
              <line x1="215" y1="45" x2="215" y2="75" stroke="#F59E0B" strokeWidth="2" />
              
              {/* TLD (.com) */}
              <g transform="translate(170, 85)">
                <circle cx="40" cy="25" r="25" fill="#F59E0B" />
                <text x="22" y="30" fill="white" fontSize="10" fontWeight="bold">.com</text>
                <text x="5" y="60" fill="#6B7280" fontSize="8">NS: ns1.example.com</text>
                <text x="5" y="72" fill="#6B7280" fontSize="8">NS: ns2.example.com</text>
              </g>
              
              {/* Arrow TLD -> Authoritative */}
              <line x1="215" y1="115" x2="215" y2="145" stroke="#10B981" strokeWidth="2" />
              
              {/* Authoritative */}
              <g transform="translate(140, 155)">
                <rect x="0" y="0" width="150" height="80" fill="#10B981" rx="8" />
                <text x="25" y="25" fill="white" fontSize="12" fontWeight="bold">Authoritative</text>
                <text x="25" y="45" fill="white" fontSize="10">Contains A, MX, TXT</text>
                <text x="25" y="60" fill="white" fontSize="10">etc. records</text>
              </g>
              
              {/* Labels */}
              <text x="20" y="240" fill="#6B7280" fontSize="10">NS records delegate authority</text>
              <text x="20" y="255" fill="#6B7280" fontSize="10">from parent zone to child zone</text>
            </svg>
          </div>
        </div>

        {/* Why NS records are essential */}
        <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Why NS records matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Delegation</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                NS records allow <strong>delegation</strong> of authority. The owner of <code>example.com</code> can run their own DNS servers,
                while the parent <code>.com</code> TLD only stores the NS pointers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Redundancy</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                You always list <strong>at least two NS records</strong> for fault tolerance. If one nameserver fails,
                resolvers try the other one. Best practice: put them on different networks.
              </p>
            </div>
          </div>
        </div>

        {/* NS record format */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h3 className="text-xl font-bold">📝 NS record syntax</h3>
          <pre className="bg-gray-800 text-green-300 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
{`example.com.  3600  IN  NS  ns1.example.net.
example.com.  3600  IN  NS  ns2.example.net.`}
          </pre>
          <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
            <li><strong>3600</strong> – TTL (Time To Live) in seconds</li>
            <li><strong>IN</strong> – Internet class (always IN)</li>
            <li><strong>NS</strong> – record type</li>
            <li><strong>ns1.example.net</strong> – hostname of the authoritative nameserver</li>
          </ul>
          <p className="mt-3 text-yellow-600 dark:text-yellow-400 text-sm">
            💡 Important: The value of an NS record is a domain name, not an IP address. That nameserver must have a corresponding A (or AAAA) record.
          </p>
        </div>

        {/* Real-world example */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">🏫 Real-world example: Barrackpore High School</h3>
          <p className="mt-2">
            The school domain <code>barrackporehigh.edu</code> uses nameservers provided by their hosting company.
            The NS records at the <code>.edu</code> TLD level look like:
          </p>
          <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-2 text-sm">
{`barrackporehigh.edu.  86400  IN  NS  ns1.hostingcompany.com.
barrackporehigh.edu.  86400  IN  NS  ns2.hostingcompany.com.`}
          </pre>
          <p className="mt-2">
            When <span className="font-semibold">Mahima</span> types the school website, the recursive resolver asks the <code>.edu</code> TLD,
            gets these NS records, then queries <code>ns1.hostingcompany.com</code> for the A record.
          </p>
        </div>

        {/* How NS records work with glue records */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">🔗 Glue records – solving the chicken‑and‑egg problem</h2>
          <p>
            What if your authoritative nameserver is <strong>inside</strong> your own domain? For example, <code>ns1.example.com</code> for <code>example.com</code>.
            To resolve <code>ns1.example.com</code>, you need its IP, but that IP is stored at <code>example.com</code>'s authoritative server – which we are trying to find!
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <p className="font-semibold">Solution: Glue records</p>
            <p className="mt-1">
              The parent zone (e.g., <code>.com</code> TLD) stores <strong>additional A records</strong> for the nameservers,
              called <strong>glue records</strong>. These are returned along with the NS records, breaking the cycle.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse bg-gray-50 dark:bg-gray-900 rounded-lg">
              <thead><tr className="border-b"><th className="p-2 text-left">Zone</th><th className="p-2 text-left">NS record</th><th className="p-2 text-left">Glue A record (if needed)</th></tr></thead>
              <tbody>
                <tr><td className="p-2 border-b">example.com</td><td className="p-2 border-b">ns1.example.com</td><td className="p-2 border-b">192.0.2.1 (stored at .com TLD)</td></tr>
                <tr><td className="p-2">example.com</td><td className="p-2">ns2.other.net</td><td className="p-2">(no glue needed – not in-domain)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Only one NS record</strong> – single point of failure.</li>
              <li><strong>Pointing NS to a domain without glue</strong> – causes resolution loops.</li>
              <li><strong>Missing A/AAAA for NS hostnames</strong> – resolvers can't contact nameserver.</li>
              <li><strong>NS records in child zone don't match parent</strong> – inconsistency may cause resolution failures.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Always have <strong>at least two NS records</strong> on different IP networks.</li>
              <li>Use <strong>external monitoring</strong> to ensure all listed NS servers respond.</li>
              <li>Set TTL on NS records to at least 86400 (1 day) – they change rarely.</li>
              <li>For in-domain nameservers, ensure glue records are correct at your registrar.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use `dig NS example.com` to see the NS records from the TLD's perspective.</p>
            <p>✔ `dig +trace example.com | grep NS` shows delegation path.</p>
            <p>✔ Verify glue: `dig @a.gtld-servers.net example.com NS` (query TLD directly).</p>
            <p>✔ Educators: Use "department phone directory" – main switchboard (TLD) gives you department's internal number (NS record).</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>NS = Name Server – points to authoritative DNS servers</li>
            <li>Used for delegation from parent zone to child zone</li>
            <li>Always have ≥2 NS records for redundancy</li>
            <li>Nameserver hostnames must have A/AAAA records (may be glue)</li>
            <li>Parent and child NS lists should be identical</li>
            <li>Check with `dig NS example.com`</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-purple-400 dark:border-purple-600 p-5 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you run your own DNS server at home for a domain you own, what would you need to configure at your registrar?
            Why can't you just point the NS record to `localhost`?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run `dig NS google.com`. Notice how many nameservers appear? Try each with `dig @ns1.google.com google.com A`.
            Compare the answer – they should all be identical.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <FAQTemplate title="NS Record FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <Teacher
            note={"Students often confuse NS records with A records or the concept of 'authoritative' vs 'recursive'. Emphasize that NS records point to nameservers, not IP addresses; those servers then contain the actual DNS data. The glue record concept is tricky – use the analogy of a company's internal directory: to find an employee's extension, you need the main number first (glue). Always demonstrate with `dig +trace` so they see the delegation steps live."}
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

export default Topic9;