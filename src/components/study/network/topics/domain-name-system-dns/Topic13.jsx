import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic13_files/topic13_questions";

/**
 * Component: Topic13
 * Purpose: Introduces DNS security threats (spoofing, cache poisoning) and DNSSEC as a defense.
 * Audience: Students who understand basic DNS resolution and caching.
 * Returns: JSX.Element
 */
const Topic13 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-600 to-yellow-600 dark:from-red-400 dark:to-yellow-400 bg-clip-text text-transparent">
            DNS Security Basics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Understanding DNS Spoofing, Cache Poisoning, and the protection offered by DNSSEC
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto rounded-full" />
        </section>

        {/* Threat and defense overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Why is DNS security needed?</h2>
            <p>
              DNS was designed in the 1980s without security in mind. By default, DNS responses are
              <span className="font-semibold"> unauthenticated and unencrypted</span>. An attacker can
              inject false DNS responses, redirecting users to fake websites, stealing credentials,
              or spreading malware. This is called <span className="font-semibold">DNS spoofing</span>
              or <span className="font-semibold">cache poisoning</span>.
            </p>
            <p>
              <span className="font-semibold">DNSSEC (Domain Name System Security Extensions)</span>
              adds cryptographic signatures to DNS records, allowing resolvers to verify that the
              response truly came from the authoritative owner and wasn't tampered with.
            </p>
            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="italic text-red-800 dark:text-red-300">
                “Without DNSSEC, every DNS response is like a postcard — anyone can read or rewrite it.”
              </p>
            </div>
          </div>

          {/* SVG: Spoofing vs DNSSEC */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 420 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="320" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Left: Spoofing */}
              <g transform="translate(10, 20)">
                <rect x="0" y="0" width="190" height="140" fill="#FEE2E2" className="dark:fill-red-950/30" rx="8" />
                <text x="55" y="25" fill="#DC2626" fontSize="12" fontWeight="bold">DNS Spoofing</text>
                {/* User */}
                <rect x="20" y="40" width="40" height="30" fill="#3B82F6" rx="4" />
                <text x="30" y="58" fill="white" fontSize="8">User</text>
                {/* Attacker */}
                <rect x="120" y="40" width="40" height="30" fill="#EF4444" rx="4" />
                <text x="122" y="58" fill="white" fontSize="8">Attacker</text>
                {/* Fake response arrow */}
                <line x1="120" y1="55" x2="65" y2="55" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2">
                  <animate attributeName="stroke-dashoffset" from="6" to="0" dur="0.5s" repeatCount="indefinite" />
                </line>
                <text x="70" y="50" fill="#DC2626" fontSize="7">Fake IP</text>
                <text x="30" y="105" fill="#374151" className="dark:text-gray-300" fontSize="9">User goes to</text>
                <text x="30" y="120" fill="#374151" className="dark:text-gray-300" fontSize="9">fake bank site</text>
              </g>
              
              {/* Right: DNSSEC */}
              <g transform="translate(220, 20)">
                <rect x="0" y="0" width="190" height="140" fill="#D1FAE5" className="dark:fill-green-950/30" rx="8" />
                <text x="45" y="25" fill="#059669" fontSize="12" fontWeight="bold">DNSSEC Protection</text>
                {/* Valid response */}
                <rect x="60" y="50" width="70" height="40" fill="#10B981" rx="4" />
                <text x="70" y="68" fill="white" fontSize="7">Signed</text>
                <text x="70" y="80" fill="white" fontSize="7">Response</text>
                {/* Signature shield */}
                <rect x="145" y="55" width="30" height="30" fill="#F59E0B" rx="15" />
                <text x="151" y="74" fill="white" fontSize="10">✓</text>
                <text x="260" y="105" fill="#374151" className="dark:text-gray-300" fontSize="9">Resolver verifies</text>
                <text x="260" y="118" fill="#374151" className="dark:text-gray-300" fontSize="9">crypto signature</text>
              </g>
              
              {/* Bottom: chain of trust */}
              <g transform="translate(20, 190)">
                <text x="20" y="20" fill="#6B7280" fontSize="11">Chain of Trust (DNSSEC)</text>
                <rect x="20" y="35" width="80" height="30" fill="#FBBF24" rx="4" />
                <text x="40" y="54" fill="#374151" fontSize="9">Root (trust anchor)</text>
                <line x1="105" y1="50" x2="130" y2="50" stroke="#6B7280" strokeWidth="2" />
                <rect x="135" y="35" width="80" height="30" fill="#FBBF24" rx="4" />
                <text x="155" y="54" fill="#374151" fontSize="9">.com TLD</text>
                <line x1="220" y1="50" x2="245" y2="50" stroke="#6B7280" strokeWidth="2" />
                <rect x="250" y="35" width="80" height="30" fill="#FBBF24" rx="4" />
                <text x="265" y="54" fill="#374151" fontSize="9">example.com</text>
              </g>
            </svg>
          </div>
        </div>

        {/* DNS Spoofing / Cache Poisoning Explanation */}
        <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">💀 DNS Spoofing & Cache Poisoning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">How it works</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Attacker sends a forged DNS response to a recursive resolver before the real authoritative response arrives.
                The resolver caches the fake IP. All subsequent users of that resolver are redirected to the attacker's malicious server
                (e.g., a fake bank login page).
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Real-world scenario:</span> In 2008, a cache poisoning attack on Brazil's largest bank
                redirected customers to a fake site, stealing credentials.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Why it's dangerous</h3>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                <li><strong>Phishing:</strong> Fake websites look identical to real ones.</li>
                <li><strong>Malware distribution:</strong> Redirect software downloads to infected files.</li>
                <li><strong>Man-in-the-middle:</strong> Attacker can intercept or modify traffic.</li>
                <li><strong>Widespread:</strong> One poisoned resolver can affect thousands of users.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DNSSEC Explanation */}
        <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">🛡️ DNSSEC – The Solution</h2>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">What DNSSEC adds</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">🔑</div>
                <p className="font-medium">Digital Signatures</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Each record set signed with private key</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">🔗</div>
                <p className="font-medium">Chain of Trust</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">From root down to your domain</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-medium">Authentication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resolver verifies origin & integrity</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              DNSSEC does <span className="font-semibold">NOT</span> encrypt DNS queries (use DNS over TLS/HTTPS for privacy). 
              It only ensures the response is authentic and hasn't been tampered with.
            </p>
          </div>
        </div>

        {/* How DNSSEC works - step by step */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">⚙️ How DNSSEC works</h2>
          <div className="space-y-3">
            {[
              "1. Domain owner generates a key pair (ZSK – Zone Signing Key, KSK – Key Signing Key).",
              "2. Owner signs their DNS records (A, MX, etc.) creating RRSIG records.",
              "3. The parent zone (e.g., .com) stores a DS (Delegation Signer) record for the child.",
              "4. The root zone is pre-configured as a trust anchor in validating resolvers.",
              "5. Resolver requests DNSKEY records, verifies signatures up the chain to root.",
              "6. If signature validates, response is authentic; if not, resolver returns SERVFAIL."
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">{idx+1}</span>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-world attack example */}
        <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2 text-red-700 dark:text-red-300">⚠️ Real-world attack: Kaminsky Attack (2008)</h3>
          <p className="mt-2">
            Security researcher Dan Kaminsky discovered a widespread DNS cache poisoning vulnerability affecting virtually all DNS servers.
            Attackers could guess transaction IDs and poison resolvers with fake records. The fix: randomize source ports and transaction IDs.
            This event accelerated DNSSEC adoption.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Think about:</span> Mamata from Ichapur visits her bank website, but a poisoned resolver sends her to a fake site.
            She enters her credentials – stolen. DNSSEC would have prevented this because fake record wouldn't have valid signature.
          </p>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Assuming DNSSEC = encryption:</strong> DNSSEC signs, doesn't encrypt. Your ISP still sees your queries.</li>
              <li><strong>Forgetting to roll keys:</strong> ZSK and KSK must be rotated regularly; old keys cause validation failures.</li>
              <li><strong>Misconfigured DS records:</strong> Wrong DS hash breaks the chain of trust → SERVFAIL.</li>
              <li><strong>Not testing DNSSEC:</strong> Use `dig +dnssec` before deploying.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Enable DNSSEC on domains you control (most registrars support one-click).</li>
              <li>Use a validating resolver (e.g., Cloudflare 1.1.1.1, Quad9 9.9.9.9).</li>
              <li>Monitor key rollovers with automation tools (e.g., OpenDNSSEC).</li>
              <li>Combine DNSSEC with DNS over TLS/HTTPS for both authentication and privacy.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-950/30 dark:to-yellow-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use <code className="bg-white dark:bg-gray-800 px-1 rounded">dig +dnssec example.com</code> and look for <code>ad</code> flag (authentic data).</p>
            <p>✔ Test DNSSEC validation: <code>dig sigok.verteiltesysteme.net</code> (should validate) and <code>sigfail.verteiltesysteme.net</code> (should fail).</p>
            <p>✔ Shorten TTL before key rollover to speed propagation.</p>
            <p>✔ Educators: Use the analogy of a signed letter vs an unsigned one – the signature proves it's from the real sender.</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>DNS spoofing / cache poisoning = injecting fake DNS responses</li>
            <li>Attackers can redirect users to malicious sites</li>
            <li>DNSSEC adds cryptographic signatures to DNS records</li>
            <li>Chain of trust: root → TLD → domain → records</li>
            <li>RRSIG = signature, DNSKEY = public key, DS = delegation signer</li>
            <li>DNSSEC does NOT encrypt – use DoH/DoT for privacy</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-orange-400 dark:border-orange-600 p-5 rounded-xl bg-orange-50/30 dark:bg-orange-950/20 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If a user's DNS resolver does NOT validate DNSSEC (i.e., it's not a validating resolver), can DNSSEC still protect them?
            What if an attacker spoofs the DNSKEY response itself?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run <code>dig +dnssec dnssec-failed.org</code> with a validating resolver (1.1.1.1)
            vs a non-validating one (your ISP). The difference in the "ad" flag shows DNSSEC in action.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <FAQTemplate title="DNS Security & DNSSEC FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <Teacher
            note={"Students often confuse DNSSEC with DNS over HTTPS. Clarify: DNSSEC authenticates (proves origin), DoH/DoT encrypts (hides content). Use the analogy of a signed, sealed envelope – DNSSEC is the signature, DoH is the seal. Emphasize that DNSSEC adoption is growing but not universal; many domains still unsigned. The Kaminsky attack is a great story to illustrate why we need DNSSEC."}
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

export default Topic13;