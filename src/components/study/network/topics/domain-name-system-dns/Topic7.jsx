// Topic7.jsx
// Topic: CNAME Record (Alias)
// This component explains the Canonical Name record used for domain aliasing.

import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7 - CNAME Record (Alias)
 * Purpose: Understand how CNAME records create aliases for domain names.
 * When & Why: After A and AAAA records, students need to know how to point multiple names to the same target.
 * @returns {JSX.Element} The rendered lesson component
 */
const Topic7 = () => {
  const [showCnameChain, setShowCnameChain] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            CNAME Record (Canonical Name)
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Creating aliases — pointing one domain name to another
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Section 1: What is a CNAME Record? */}
          <section className="group rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-[fadeUp_0.6s_ease-out] animation-delay-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔗</span> What is a CNAME Record?
            </h2>
            <p className="leading-relaxed mb-4">
              A <strong className="text-blue-600 dark:text-blue-400">CNAME record</strong> (Canonical Name) creates an <strong className="text-blue-600">alias</strong> from one domain name to another.
              Instead of pointing directly to an IP address, it points to another domain name. The target domain (canonical name) then resolves to the actual IP (via A or AAAA records).
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg font-mono text-sm">
              www.example.com.    CNAME    example.com.<br/>
              example.com.        A        93.184.216.34
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Syntax: <code>alias TTL IN CNAME canonical-name</code>.
              The alias inherits the canonical name's IP address.
            </p>
          </section>

          {/* Section 2: When and Why Use CNAME Records */}
          <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-200">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">🎯 Common Use Cases</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>WWW subdomain:</strong> Point <code>www.example.com</code> to <code>example.com</code> (or vice versa).</li>
              <li><strong>Subdomains for services:</strong> <code>blog.example.com</code> → <code>example.wordpress.com</code></li>
              <li><strong>CDN aliasing:</strong> <code>static.example.net</code> → <code>cdn.cloudflare.net</code></li>
              <li><strong>Branding/marketing:</strong> <code>buy.example.com</code> → <code>shopping.example.com</code></li>
              <li><strong>Maintenance redirection:</strong> Temporarily point a domain to a maintenance page.</li>
            </ul>
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-mono text-sm">; Example: Multiple aliases to a single origin<br/>
              www.example.com.   CNAME   example.com.<br/>
              shop.example.com.  CNAME   example.com.<br/>
              blog.example.com.  CNAME   example.com.<br/>
              example.com.       A       192.0.2.10</p>
            </div>
          </section>

          {/* Section 3: SVG Illustration - CNAME Resolution */}
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-300">
            <h2 className="text-2xl font-bold mb-6 text-center">🖼️ CNAME Resolution Flow</h2>
            <div className="flex justify-center">
              <svg width="750" height="260" viewBox="0 0 750 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
                <defs>
                  <marker id="arrowCname" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#2563EB" />
                  </marker>
                </defs>
                <rect x="30" y="100" width="120" height="50" rx="8" fill="#3B82F6" />
                <text x="90" y="130" textAnchor="middle" fill="white" fontSize="13">www.example.com</text>
                <text x="90" y="145" textAnchor="middle" fill="#BFDBFE" fontSize="10">(Alias)</text>

                <line x1="150" y1="125" x2="200" y2="125" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowCname)" />
                <text x="175" y="115" textAnchor="middle" fill="#2563EB" fontSize="10">Query</text>

                <rect x="210" y="90" width="140" height="50" rx="8" fill="#8B5CF6" />
                <text x="280" y="115" textAnchor="middle" fill="white" fontSize="12">CNAME Record</text>
                <text x="280" y="130" textAnchor="middle" fill="#E9D5FF" fontSize="10">→ example.com</text>

                <line x1="350" y1="115" x2="400" y2="115" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowCname)" />
                <text x="375" y="105" textAnchor="middle" fill="#2563EB" fontSize="10">Redirect</text>

                <rect x="410" y="100" width="130" height="50" rx="8" fill="#10B981" />
                <text x="475" y="125" textAnchor="middle" fill="white" fontSize="13">example.com</text>
                <text x="475" y="142" textAnchor="middle" fill="#D1FAE5" fontSize="10">(Canonical)</text>

                <line x1="540" y1="125" x2="590" y2="125" stroke="#2563EB" strokeWidth="2" markerEnd="url(#arrowCname)" />
                <text x="565" y="115" textAnchor="middle" fill="#2563EB" fontSize="10">Resolve</text>

                <rect x="600" y="90" width="110" height="50" rx="8" fill="#F59E0B" />
                <text x="655" y="115" textAnchor="middle" fill="#1F2937" fontSize="12">A Record</text>
                <text x="655" y="132" textAnchor="middle" fill="#4B5563" fontSize="10">192.0.2.1</text>

                <text x="375" y="185" textAnchor="middle" fill="#6B7280" fontSize="11">DNS follows CNAME before returning final IP</text>
              </svg>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
              The resolver follows the CNAME chain to find the canonical name's A/AAAA record.
            </p>
          </section>

          {/* Section 4: Real-World Example with Debangshu's Blog */}
          <section className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-400">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">📝 Real-World: Debangshu's Blog on Medium</h2>
            <p className="leading-relaxed mb-3">Debangshu in Ichapur writes a tech blog. He wants <code>blog.debangshu.com</code> to point to his Medium profile: <code>medium.com/@debangshu</code>. But Medium uses its own domain. Instead, he creates a CNAME record:</p>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm my-3">
              blog.debangshu.com.   3600   IN   CNAME   debangshu.medium.com.
            </div>
            <p>Now when someone visits <code>blog.debangshu.com</code>, DNS resolves it to the IP of <code>debangshu.medium.com</code>. If Medium changes its IP address, Debangshu's CNAME automatically updates — no manual change needed!</p>
            <button
              onClick={() => setShowCnameChain(!showCnameChain)}
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showCnameChain ? "Hide" : "Show"} CNAME chaining example
            </button>
            {showCnameChain && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs">
                <p>www.labs.example.com.  CNAME  www2.prod.example.com.</p>
                <p>www2.prod.example.com. CNAME  lb.example.com.</p>
                <p>lb.example.com.         A      10.0.0.5</p>
                <p className="text-gray-500 mt-2">DNS will follow all three CNAMEs! (Max 10 hops)</p>
              </div>
            )}
          </section>

          {/* Section 5: Important Restriction - No Other Records with CNAME */}
          <section className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-6 md:p-8 border-l-8 border-red-400 animate-[fadeUp_0.6s_ease-out] animation-delay-500">
            <h2 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">⚠️ Critical Restriction</h2>
            <p className="leading-relaxed mb-3">
              <strong>If a CNAME record exists for a name, no other record types (A, AAAA, MX, TXT, etc.) can exist at that same name.</strong>
              This includes the zone apex (e.g., <code>example.com</code> itself cannot be a CNAME).
            </p>
            <div className="bg-white dark:bg-gray-800 p-3 rounded font-mono text-sm">
              ; WRONG - will cause issues:<br/>
              example.com.    CNAME   something.com.<br/>
              example.com.    A       192.0.2.1   ; CONFLICT!<br/>
              <br/>
              ; CORRECT - use CNAME only:<br/>
              www.example.com.  CNAME   example.com.<br/>
              example.com.      A       192.0.2.1
            </div>
            <p className="mt-2 text-sm">This is why you cannot CNAME the bare domain — you'd lose the ability to have MX, TXT, etc.</p>
          </section>

          {/* Section 6: Professional Tips & Tricks */}
          <section className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-6 md:p-8 border-l-8 border-indigo-400 animate-[fadeUp_0.6s_ease-out] animation-delay-600">
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">💡 Pro Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use <code>dig CNAME www.example.com +short</code> to see the target of a CNAME.</li>
              <li>CNAMEs can chain up to 10 levels (resolver limit). Avoid deep chains for performance.</li>
              <li>To alias the apex domain (example.com), use ALIAS/ANAME records (Cloudflare, DNSimple, etc.) instead of CNAME.</li>
              <li>When using CNAME to a third-party domain (e.g., CDN), ensure the target can handle your traffic.</li>
              <li>Monitor CNAME targets — if the target stops resolving, your alias breaks.</li>
              <li>Use relative names in zone files: <code>www  CNAME  @</code> (where @ is the origin).</li>
            </ul>
          </section>

          {/* Section 7: Common Mistakes & Best Practices */}
          <div className="grid md:grid-cols-2 gap-6 animate-[fadeUp_0.6s_ease-out] animation-delay-700">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">⚠️ Common Pitfalls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>CNAME at apex:</strong> Trying to set CNAME on the bare domain (e.g., example.com -> alias).</li>
                <li><strong>CNAME with other records:</strong> Adding A or MX record alongside CNAME — causes unpredictable behavior.</li>
                <li><strong>Forgotten trailing dot:</strong> <code>example.com CNAME google.com</code> (relative) vs <code>google.com.</code> (FQDN).</li>
                <li><strong>Circular CNAME chains:</strong> A → B → A creates a loop; resolves time out.</li>
                <li><strong>CNAME pointing to a CNAME:</strong> Adds resolution time; limit chaining depth.</li>
                <li><strong>Assuming CNAME works for MX or SRV:</strong> MX records cannot point to a CNAME (RFC 2181).</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ Best Practices</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use CNAME for subdomains (www, blog, shop) but never for the root domain.</li>
                <li>Keep CNAME chains short — ideally one hop.</li>
                <li>Use FQDNs with trailing dots in zone files to avoid ambiguity.</li>
                <li>Regularly check that CNAME targets resolve (<code>dig target +short</code>).</li>
                <li>For cloud services (S3, Heroku, GitHub Pages), use the provided CNAME target.</li>
                <li>Document each CNAME's purpose (e.g., "points to CDN endpoint").</li>
              </ul>
            </div>
          </div>

          {/* Section 8: Hint Section */}
          <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-800">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">🔍 Try This</h2>
            <p className="leading-relaxed">Run <code>dig www.github.com CNAME</code>. You'll see that www.github.com is a CNAME to github.com. Now try <code>dig google.com CNAME</code> — why doesn't google.com have a CNAME? (Because it's the apex domain). Then try <code>dig mail.google.com</code> — does that CNAME to something else?</p>
          </div>

          {/* Section 9: Mini Checklist */}
          <div className="rounded-2xl bg-teal-50 dark:bg-teal-900/20 p-6 md:p-8 animate-[fadeUp_0.6s_ease-out] animation-delay-900">
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-4">📋 Checklist</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Define CNAME record and its purpose (alias)",
                "Understand that a CNAME points to another domain name, not an IP",
                "Explain the restriction: no other record types with CNAME",
                "Why you cannot CNAME the zone apex (example.com)",
                "Use dig to query CNAME records",
                "Identify CNAME chains and their resolution order"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <FAQTemplate title="CNAME Record (Alias) FAQs" questions={questions} />

          {/* Teacher's Note */}
          <Teacher note="Emphasize the apex restriction by comparing with 'www' subdomain which works perfectly for CNAME. Use real examples: most websites have www as CNAME to the apex. Show students 'dig www.microsoft.com' — you'll see a CNAME chain. Discuss why you can't have MX records on a CNAME (email would break). Use analogy: CNAME is like a symlink in a filesystem — it's just a pointer, not the actual data." />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-\\[fadeUp_0\\.6s_ease-out\\] { animation: fadeUp 0.6s ease-out forwards; }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.6s_ease-out\\] { animation: none; opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Topic7;