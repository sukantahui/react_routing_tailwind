import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic10_files/topic10_questions";

/**
 * Component: Topic10
 * Purpose: Explains TXT (Text) records – used for domain verification, email security (SPF, DKIM, DMARC), and general notes.
 * Audience: Students who understand basic DNS records (A, CNAME, MX, NS).
 * Returns: JSX.Element
 */
const Topic10 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            TXT Record
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The sticky note of DNS – text-based records for verification, email security, and more
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
        </section>

        {/* Main concept + SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">What is a TXT Record?</h2>
            <p>
              The <span className="font-semibold">TXT (Text) record</span> allows domain administrators to store arbitrary
              human‑readable text in DNS. Originally intended for descriptive notes, it is now essential for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Domain ownership verification</strong> (Google Search Console, Microsoft 365, etc.)</li>
              <li><strong>Email security</strong> – SPF, DKIM, DMARC records to fight spoofing and phishing</li>
              <li><strong>General machine‑readable configuration</strong> (e.g., `v=spf1 include:_spf.google.com ~all`)</li>
            </ul>
            <div className="bg-pink-50 dark:bg-pink-950/30 border-l-4 border-pink-500 p-4 rounded-r-lg">
              <p className="italic text-pink-800 dark:text-pink-300">
                “TXT records are the Swiss Army knife of DNS – flexible text that powers modern email authentication.”
              </p>
            </div>
          </div>

          {/* SVG: TXT record examples */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 420 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="280" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Domain box */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="380" height="50" fill="#3B82F6" rx="6" />
                <text x="20" y="32" fill="white" fontSize="14" fontWeight="bold">example.com.  TXT  "v=spf1 include:_spf.google.com ~all"</text>
              </g>
              <g transform="translate(20, 85)">
                <rect x="0" y="0" width="380" height="50" fill="#10B981" rx="6" />
                <text x="20" y="32" fill="white" fontSize="14" fontWeight="bold">example.com.  TXT  "google-site-verification=abc123def456"</text>
              </g>
              <g transform="translate(20, 150)">
                <rect x="0" y="0" width="380" height="50" fill="#F59E0B" rx="6" />
                <text x="20" y="32" fill="white" fontSize="14" fontWeight="bold">_dmarc.example.com.  TXT  "v=DMARC1; p=quarantine"</text>
              </g>
              
              {/* Labels */}
              <text x="140" y="235" fill="#6B7280" fontSize="11">SPF (Email sender authorization)</text>
              <text x="140" y="252" fill="#6B7280" fontSize="11">Domain verification | DMARC (Email policy)</text>
            </svg>
          </div>
        </div>

        {/* Common uses of TXT records */}
        <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">🔧 Common Uses of TXT Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">✅ Domain Verification</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Google, Microsoft, and other services ask you to add a unique TXT record to prove you own the domain before enabling their services.
              </p>
              <pre className="bg-gray-800 text-green-300 p-2 rounded text-xs mt-2">google-site-verification=xxxxx</pre>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">✉️ SPF (Sender Policy Framework)</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                Lists which mail servers are allowed to send email on behalf of your domain. Prevents email spoofing.
              </p>
              <pre className="bg-gray-800 text-green-300 p-2 rounded text-xs mt-2">v=spf1 include:spf.protection.outlook.com -all</pre>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">🔐 DKIM & DMARC</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                DKIM signs outgoing email; DMARC tells receivers what to do if SPF/DKIM fail. Both use TXT records.
              </p>
              <pre className="bg-gray-800 text-green-300 p-2 rounded text-xs mt-2">v=DMARC1; p=reject; rua=mailto:dmarc@example.com</pre>
            </div>
          </div>
        </div>

        {/* Deep dive: SPF */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">📧 SPF – Stop email spoofing</h3>
          <p className="mt-2">
            SPF records specify which IP addresses or hostnames are authorized to send email for your domain.
            Receiving mail servers check the SPF record to see if the sending server is allowed.
          </p>
          <pre className="bg-gray-800 text-green-300 p-3 rounded-lg mt-3 text-sm overflow-x-auto">
{`example.com.  TXT  "v=spf1 ip4:203.0.113.0/24 include:_spf.google.com ~all"`}
          </pre>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-gray-300">
            <li><code>v=spf1</code> – version</li>
            <li><code>ip4:203.0.113.0/24</code> – allow that IP range</li>
            <li><code>include:_spf.google.com</code> – also allow Google's mail servers (if you use Gmail)</li>
            <li><code>~all</code> – soft fail (mark as suspicious)</li>
            <li><code>-all</code> – hard fail (reject email)</li>
          </ul>
        </div>

        {/* DKIM and DMARC summaries */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
          <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-xl">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400">🔏 DKIM (DomainKeys Identified Mail)</h3>
            <p className="mt-1 text-sm">
              Stores a public key in DNS. Outgoing email is signed with a private key; receivers verify using the TXT record.
            </p>
            <pre className="bg-gray-800 text-green-300 p-2 rounded text-xs mt-2">selector._domainkey.example.com. TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3..."</pre>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 p-5 rounded-xl">
            <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">🛡️ DMARC (Domain‑based Message Authentication, Reporting & Conformance)</h3>
            <p className="mt-1 text-sm">
              Tells receivers what to do when SPF or DKIM fail – none, quarantine, or reject. Also provides reporting.
            </p>
            <pre className="bg-gray-800 text-green-300 p-2 rounded text-xs mt-2">_dmarc.example.com. TXT "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"</pre>
          </div>
        </div>

        {/* Real-world example */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">🏫 Real-world example: Barrackpore High School</h3>
          <p className="mt-2">
            The school uses Google Workspace for email. To prove domain ownership and enable Gmail, they add:
          </p>
          <pre className="bg-gray-800 text-green-300 p-2 rounded mt-2 text-sm">
barrackporehigh.edu.  TXT  "google-site-verification=AbCdEf123456"
barrackporehigh.edu.  TXT  "v=spf1 include:_spf.google.com ~all"
_dmarc.barrackporehigh.edu.  TXT  "v=DMARC1; p=quarantine; rua=mailto:admin@barrackporehigh.edu"
          </pre>
          <p className="mt-2">
            Now, when <span className="font-semibold">Mahima</span> sends an email, Google's servers are authorized (SPF pass).
            If someone tries to spoof the school's domain from a random server, the receiving mail server will quarantine or reject it (DMARC).
          </p>
        </div>

        {/* TXT record format and restrictions */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <h3 className="text-xl font-bold">📝 TXT record rules</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
            <li>Each TXT record can contain multiple strings (concatenated). Maximum length <strong>255 characters per string</strong>; total record can be up to <strong>about 4000 bytes</strong> (depending on DNS implementation).</li>
            <li>Long records (e.g., large DKIM keys) may be split into several quoted strings: <code>"v=DKIM1; k=rsa; p=..." "...rest of key"</code>.</li>
            <li>TXT records are case‑sensitive? Generally no, but values may be case‑sensitive (e.g., verification tokens). Keep exact case.</li>
            <li>You can have multiple TXT records for the same name – email security standards expect them.</li>
          </ul>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Missing quotes:</strong> TXT values must be in double quotes. <code>TXT v=spf1</code> is invalid.</li>
              <li><strong>SPF lookup limit:</strong> SPF spec allows at most 10 DNS lookups; too many includes cause permerror.</li>
              <li><strong>Case sensitivity:</strong> Some verification tokens are case‑sensitive; copy exactly.</li>
              <li><strong>Not using DMARC:</strong> SPF alone is not enough; DMARC tells receivers how to treat failures.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Use SPF + DKIM + DMARC</strong> together for robust email authentication.</li>
              <li>Set <strong>DMARC policy to `p=reject`</strong> only after monitoring reports (<code>rua</code>).</li>
              <li>Use <strong>SPF flattening</strong> tools if you exceed 10 lookups.</li>
              <li>Test your records with online validators (MXToolbox, Kitterman SPF).</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Validate SPF: `dig TXT example.com | grep spf` and use `spfquery` or online tools.</p>
            <p>✔ DMARC reporting: add `rua=mailto:dmarc@example.com` to receive aggregate reports.</p>
            <p>✔ For multiple strings, combine: `dig TXT example.com +short` will show concatenation.</p>
            <p>✔ Educators: Use "library sticky note" analogy – anyone can add notes (TXT) for verification, rules, or instructions.</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>TXT = arbitrary text, machine‑readable policies</li>
            <li>Used for domain verification, SPF, DKIM, DMARC</li>
            <li>SPF prevents email spoofing (authorized senders)</li>
            <li>DKIM signs email with a public key in DNS</li>
            <li>DMARC tells receivers how to handle unauthenticated email</li>
            <li>Always wrap values in quotes; multiple strings concatenate</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-pink-400 dark:border-pink-600 p-5 rounded-xl bg-pink-50/30 dark:bg-pink-950/20 animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you add an SPF record that accidentally omits your email provider's servers, what happens to legitimate email?
            Why is it important to start with DMARC policy `p=none` before moving to `p=quarantine` or `p=reject`?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run `dig TXT google.com`. You'll see several TXT records including `v=spf1`, `v=verify` (domain verification), etc.
            Try `dig TXT _dmarc.google.com` – shows Google's DMARC policy.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <FAQTemplate title="TXT Record FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_forwards]">
          <Teacher
            note={"Students are often surprised that TXT records are used for email security, not just comments. Emphasize that SPF, DKIM, DMARC are critical topics for anyone managing domains. Real‑world demo: use `dig TXT gmail.com` and explain the `v=spf1` syntax. Also show a DMARC report example – many students haven't seen email authentication headers. Warn them about the 10‑lookup SPF limit; it's a frequent exam question."}
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

export default Topic10;