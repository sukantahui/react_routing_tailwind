import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import questions from "./topic8_files/topic8_questions";

/**
 * Component: Topic8
 * Purpose: Explains MX (Mail Exchange) records – how email is routed to the correct mail servers.
 * Audience: Students who understand A, CNAME, and basic DNS concepts.
 * Returns: JSX.Element
 */
const Topic8 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Title Section */}
        <section className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
            MX Record (Mail Exchange)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Directing email to the right mail servers – the postal service of DNS
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto rounded-full" />
        </section>

        {/* Main concept + SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-[fadeSlideUp_0.6s_ease-out_0.1s_forwards]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">What is an MX Record?</h2>
            <p>
              The <span className="font-semibold">MX (Mail Exchange) record</span> specifies which mail servers 
              are responsible for receiving email on behalf of a domain. When someone sends an email to 
              <code>user@example.com</code>, the sending mail server looks up the MX records of 
              <code>example.com</code> to know where to deliver the message.
            </p>
            <p>
              Each MX record has a <strong>priority</strong> (preference) number. Lower numbers indicate higher 
              priority. If the primary mail server (e.g., priority 10) is unavailable, the sender tries the 
              next lowest priority (e.g., priority 20). This provides failover and load distribution.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="italic text-blue-800 dark:text-blue-300">
                “MX records are like the 'delivery instructions' for your domain's email – telling the world which mail servers to use.”
              </p>
            </div>
          </div>

          {/* SVG: Email flow with MX records */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <svg viewBox="0 0 420 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="420" height="280" fill="currentColor" className="text-gray-50 dark:text-gray-900" rx="16" />
              
              {/* Sender */}
              <g transform="translate(20, 100)">
                <rect x="0" y="0" width="80" height="60" fill="#10B981" rx="8" />
                <text x="15" y="25" fill="white" fontSize="12">Sender</text>
                <text x="15" y="40" fill="white" fontSize="10">mail.example.com</text>
              </g>
              
              {/* Arrow to DNS lookup */}
              <line x1="105" y1="30" x2="145" y2="30" stroke="#F59E0B" strokeWidth="2" />
              <text x="100" y="20" fill="#F59E0B" fontSize="9">DNS lookup</text>
              
              {/* DNS / MX records */}
              <g transform="translate(155, 10)">
                <rect x="0" y="0" width="120" height="60" fill="#3B82F6" rx="8" />
                <text x="15" y="20" fill="white" fontSize="9" fontWeight="bold">MX Records</text>
                <text x="10" y="35" fill="white" fontSize="8">10 mail1.example.net</text>
                <text x="10" y="48" fill="white" fontSize="8">20 mail2.example.net</text>
              </g>
              
              {/* Arrow to primary MX */}
              <line x1="280" y1="30" x2="320" y2="30" stroke="#10B981" strokeWidth="2" />
              <text x="270" y="20" fill="#10B981" fontSize="9">Deliver</text>
              
              {/* Primary MX */}
              <g transform="translate(330, 70)">
                <rect x="0" y="0" width="80" height="70" fill="#EF4444" rx="8" />
                <text x="15" y="25" fill="white" fontSize="10" fontWeight="bold">Primary</text>
                <text x="10" y="40" fill="white" fontSize="9">Priority 10</text>
                <text x="10" y="55" fill="white" fontSize="8">mail1</text>
              </g>
              
              {/* Secondary MX (lower priority) visible backup */}
              <g transform="translate(330, 160)">
                <rect x="0" y="0" width="80" height="60" fill="#F59E0B" rx="8" />
                <text x="10" y="25" fill="white" fontSize="10" fontWeight="bold">Backup</text>
                <text x="10" y="40" fill="white" fontSize="9">Priority 20</text>
              </g>
              
              {/* Dashed arrow from primary to backup in case of failure */}
              <line x1="370" y1="140" x2="370" y2="155" stroke="#6B7280" strokeWidth="2" strokeDasharray="4 2" />
              <text x="375" y="150" fill="#6B7280" fontSize="8">failover</text>
            </svg>
          </div>
        </div>

        {/* MX record syntax and priority */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
          <h3 className="text-xl font-bold">📝 MX record format</h3>
          <pre className="bg-gray-800 text-green-300 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
{`example.com.  3600  IN  MX  10  mail1.example.com.
example.com.  3600  IN  MX  20  mail2.example.com.
example.com.  3600  IN  MX  30  mail3.example.com.`}
          </pre>
          <ul className="mt-3 space-y-1 text-gray-700 dark:text-gray-300 text-sm list-disc list-inside">
            <li><strong>3600</strong> – TTL (Time To Live) in seconds</li>
            <li><strong>IN</strong> – Internet class (always IN)</li>
            <li><strong>MX</strong> – record type</li>
            <li><strong>10, 20, 30</strong> – priority (lower = higher preference)</li>
            <li><strong>mail1.example.com</strong> – mail server hostname (must have a corresponding A or AAAA record)</li>
          </ul>
          <p className="mt-3 text-yellow-600 dark:text-yellow-400 text-sm">
            💡 The mail server's hostname itself must be resolvable via DNS (A record). It cannot be a CNAME if you want strict RFC compliance.
          </p>
        </div>

        {/* How email delivery works using MX records */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">📧 How email delivery uses MX records</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border shadow-sm">
              <p className="font-semibold">Step by step:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                <li>Sender's email server gets a message for <code>user@example.com</code>.</li>
                <li>It performs an MX lookup for <code>example.com</code>.</li>
                <li>The response contains one or more MX records with priorities.</li>
                <li>The sender sorts by priority (lowest number first).</li>
                <li>It attempts delivery to the highest priority mail server.</li>
                <li>If that server is unavailable (timeout/reject), it tries the next priority.</li>
              </ol>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 p-5 rounded-xl">
              <p className="font-semibold">Real-world example:</p>
              <p className="mt-2 text-sm">
                When <span className="font-semibold">Susmita</span> from <span className="font-semibold">Barrackpore</span> sends an email to
                <code> teacher@barrackporehigh.edu</code>, her email provider (e.g., Gmail) looks up MX records for 
                <code>barrackporehigh.edu</code>. It finds:
              </p>
              <pre className="bg-gray-800 text-green-300 p-2 rounded mt-2 text-xs">
10  aspmx.l.google.com
20  alt1.aspmx.l.google.com
              </pre>
              <p className="mt-2 text-sm">It tries <code>aspmx.l.google.com</code> first. If that fails, it uses <code>alt1...</code> as backup.</p>
            </div>
          </div>
        </div>

        {/* Common mail server destinations */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.4s forwards]">
          <h3 className="text-xl font-bold">🌐 Common MX record targets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-semibold">Google Workspace</p>
              <code className="text-xs">aspmx.l.google.com</code>
              <p className="text-xs text-gray-500 mt-1">Priority: 10, 20, 30</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-semibold">Microsoft 365</p>
              <code className="text-xs">example-com.mail.protection.outlook.com</code>
              <p className="text-xs text-gray-500 mt-1">Priority: 0 (or 10)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-semibold">Custom Mail Server</p>
              <code className="text-xs">mail.example.com</code>
              <p className="text-xs text-gray-500 mt-1">Priority: 10 (primary), 20 (backup)</p>
            </div>
          </div>
        </div>

        {/* Important: MX and A/AAAA relationship */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">🔗 Relationship with A/AAAA records</h2>
          <p>
            An MX record points to a <strong>hostname</strong>, not an IP address directly. That hostname must have a corresponding 
            <strong>A (IPv4)</strong> or <strong>AAAA (IPv6)</strong> record. Without it, mail delivery fails because the sending server doesn't know the IP of the mail server.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-sm"><span className="font-semibold">📌 Note:</span> The MX target hostname should not be a CNAME (according to RFC 2181). While some implementations accept it, best practice is to use a real A record to avoid ambiguities and loops.</p>
          </div>
        </div>

        {/* Common pitfalls & best practices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
          <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li><strong>Missing A record for MX target:</strong> Mail servers cannot be reached.</li>
              <li><strong>Using only one MX record:</strong> No failover; if that server goes down, email bounces.</li>
              <li><strong>Incorrect priority numbers:</strong> Mixing up priority (lower = higher priority).</li>
              <li><strong>Setting TTL too low:</strong> Unnecessary extra queries; MX rarely changes.</li>
              <li><strong>CNAME as MX target:</strong> Violates RFC; may work but can break unexpectedly.</li>
            </ul>
          </div>
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-5 rounded-r-xl">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700 dark:text-gray-300">
              <li>Always have at least <strong>two MX records</strong> with different priorities.</li>
              <li>Place backup mail servers on different network segments.</li>
              <li>Use MX record TTL of <strong>at least 3600 seconds (1 hour)</strong>.</li>
              <li>Test your MX configuration with online tools (MXToolbox, Google Admin Toolbox).</li>
              <li>Ensure reverse DNS (PTR) for mail server IPs matches the MX hostname.</li>
            </ul>
          </div>
        </div>

        {/* Tips & tricks */}
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.7s forwards]">
          <h3 className="text-xl font-bold flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <p>✔ Use `dig MX example.com` to view MX records from the command line.</p>
            <p>✔ For troubleshooting, `nslookup -type=MX example.com` works on Windows.</p>
            <p>✔ If you run your own mail server, ensure its IP is not on blacklists.</p>
            <p>✔ Educators: Use the analogy of a hospital's phone exchange – main number (lower priority) and backup numbers (higher priority).</p>
          </div>
        </div>

        {/* Mini checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl animate-[fadeSlideUp_0.6s_ease-out_0.8s_forwards]">
          <h3 className="text-xl font-bold">📋 Mini Checklist – What you MUST remember</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-3 list-disc list-inside">
            <li>MX = Mail Exchange – directs email delivery</li>
            <li>Priority: lower number = higher priority</li>
            <li>Multiple MX records provide redundancy</li>
            <li>MX points to hostname, not IP; that hostname needs A/AAAA record</li>
            <li>Do NOT use CNAME as MX target</li>
            <li>Check with `dig MX example.com`</li>
          </ul>
        </div>

        {/* Hint section */}
        <div className="border-2 border-dashed border-blue-400 dark:border-blue-600 p-5 rounded-xl bg-blue-50/30 dark:bg-blue-950/20 animate-[fadeSlideUp_0.6s_ease-out_0.9s_forwards]">
          <h3 className="text-lg font-semibold flex items-center gap-2">🤔 Think about…</h3>
          <p className="mt-2">
            If you have MX records with priorities 10, 20, and 30, what happens if the priority 10 server is up but refuses the email (e.g., mailbox full)? 
            Will the sender try priority 20? (Hint: RFC says to try next only if connection fails, not if the server accepts then rejects.)
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <strong>Observe carefully:</strong> Run `dig MX gmail.com`. Notice the multiple MX records with increasing priorities. 
            Try `dig +short MX gmail.com` to see just the priorities and servers.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s_forwards]">
          <FAQTemplate title="MX Record FAQs" questions={questions} />
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s_forwards]">
          <Teacher
            note={"Students often think MX is only for outgoing mail – clarify that MX is for incoming mail (your domain receiving email). Also, emphasize priority: lower number = more preferred. The point about MX target not being CNAME is a common exam trick. Use a live dig of popular domains (gmail.com, yahoo.com) to show real MX records. Also, connect to SPF/DMARC (Topic 10) as later knowledge."}
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

export default Topic8;