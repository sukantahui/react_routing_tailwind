// Topic3.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';

/**
 * Topic3 Component: NAT and ICMP
 * @returns {JSX.Element} Full educational section on Network Address Translation & Internet Control Message Protocol
 * Purpose: Explain how NAT maps private IPs to public IPs, and how ICMP reports errors & diagnostics (ping, traceroute)
 * When & Why used: After routing protocols; essential for understanding internet connectivity and troubleshooting.
 */

const Topic3 = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={clsx(darkMode ? 'dark' : '', 'min-h-screen')}>
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-section {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                NAT & ICMP
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Connecting private networks to the internet & diagnosing network health
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Section 1: Introduction */}
          <section className="animated-section space-y-4 animate-[fadeSlideUp_0.6s_ease-out] delay-[0ms]">
            <div className="bg-teal-50 dark:bg-teal-950/20 border-l-4 border-teal-500 p-6 rounded-r-xl">
              <p className="text-lg leading-relaxed">
                Every device needs a unique IP address to talk on the internet — but we ran out of IPv4 addresses long ago.  
                <span className="font-semibold text-teal-600 dark:text-teal-400"> NAT (Network Address Translation) </span> 
                is the magic that lets a whole school lab (with private IPs like <code>192.168.x.x</code>) share a single public IP.  
                Meanwhile, <span className="font-semibold text-cyan-600 dark:text-cyan-400"> ICMP (Internet Control Message Protocol) </span> 
                is the internet's internal post‑office: it delivers error messages and diagnostic tools like <code>ping</code> and <code>traceroute</code>.
              </p>
            </div>
          </section>

          {/* Section 2: NAT – Types and How It Works */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[100ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-3">NAT: Private to Public Mapping</h2>
            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3">How NAT Works (Overload / PAT)</h3>
              <p className="leading-relaxed">
                When Mamata in Barrackpore (private IP <code>192.168.1.5</code>) visits a website, her router changes the source IP to its public IP (e.g., <code>203.0.113.10</code>) and assigns a unique port number.  
                When the reply comes back, the router checks the port → remembers which private IP → forwards the packet to Mamata. This is called <strong>Port Address Translation (PAT)</strong>, the most common NAT form.
              </p>
              <div className="mt-4 flex justify-center">
                <svg width="500" height="120" viewBox="0 0 500 120" className="max-w-full h-auto">
                  <rect x="20" y="20" width="100" height="60" rx="8" fill="#14b8a6" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="70" y="55" textAnchor="middle" fontSize="12" fill="#0d9488" className="dark:text-teal-300">Private LAN</text>
                  <text x="70" y="70" textAnchor="middle" fontSize="10" fill="#115e59">192.168.1.5</text>
                  <path d="M130 50 L170 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <rect x="180" y="20" width="140" height="60" rx="8" fill="#f59e0b" fillOpacity="0.3" stroke="#d97706" strokeWidth="1.5" />
                  <text x="250" y="55" textAnchor="middle" fontSize="12" fill="#d97706">Router (NAT)</text>
                  <text x="250" y="70" textAnchor="middle" fontSize="10" fill="#92400e">Public IP: 203.0.113.10</text>
                  <path d="M330 50 L370 50" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow2)" />
                  <rect x="380" y="20" width="100" height="60" rx="8" fill="#14b8a6" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="430" y="55" textAnchor="middle" fontSize="12" fill="#0d9488">Internet</text>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" /></marker>
                    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" /></marker>
                  </defs>
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                <p className="font-semibold">📌 NAT Types:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Static NAT</strong>: one‑to‑one mapping (e.g., public 1.2.3.4 → private 192.168.1.10). Used for servers.</li>
                  <li><strong>Dynamic NAT</strong>: pool of public IPs mapped dynamically to private IPs (rare now).</li>
                  <li><strong>PAT (NAT Overload)</strong>: multiple private IPs share one public IP using ports – most common.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: ICMP – Purpose and Message Types */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[200ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-3">ICMP: Error Reporting & Diagnostics</h2>
            <div className="bg-cyan-50 dark:bg-cyan-950/30 p-5 rounded-xl border-l-8 border-cyan-500">
              <p className="leading-relaxed">
                ICMP is not used for user data – it carries operational information.  
                When a router cannot deliver a packet, it sends back an ICMP <strong>Destination Unreachable</strong> (Type 3).  
                The famous <code>ping</code> uses <strong>ICMP Echo Request (Type 8)</strong> and <strong>Echo Reply (Type 0)</strong>.  
                <code>traceroute</code> uses ICMP Time Exceeded (Type 11) messages.
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded">
                <p className="font-mono text-sm">Common ICMP types:</p>
                <table className="w-full text-sm mt-2">
                  <thead><tr><th className="text-left">Type</th><th className="text-left">Code</th><th className="text-left">Meaning</th></tr></thead>
                  <tbody>
                    <tr><td>0</td><td>0</td><td>Echo Reply (ping response)</td></tr>
                    <tr><td>3</td><td>1</td><td>Destination Host Unreachable</td></tr>
                    <tr><td>3</td><td>3</td><td>Port Unreachable</td></tr>
                    <tr><td>8</td><td>0</td><td>Echo Request (ping)</td></tr>
                    <tr><td>11</td><td>0</td><td>Time Exceeded (TTL expired)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 4: Real‑World use of NAT & ICMP together */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[300ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-3">Real‑World: NAT + ICMP in Action</h2>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl">
              <p className="leading-relaxed">
                Susmita at Jadavpur University tries to ping an external server <code>8.8.8.8</code>. Her PC sends an ICMP Echo Request with source <code>192.168.1.20</code>.  
                The university’s NAT router changes the source IP to its public IP (<code>203.0.113.50</code>) and assigns a high port number.  
                When the Echo Reply returns, the router looks up the port mapping and forwards it back to Susmita’s PC.  
                If the packet fails midway, an ICMP Time Exceeded or Destination Unreachable message returns to the router, which then sends it back to Susmita – allowing <code>traceroute</code> to show each hop.
              </p>
              <p className="mt-3 italic text-sm">🧪 Try this: <code>ping -c 3 google.com</code> and then <code>traceroute google.com</code> – see ICMP in action.</p>
            </div>
          </div>

          {/* Section 5: Tips, Pitfalls, Best Practices */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[400ms] space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border-l-8 border-indigo-400">
              <h3 className="text-xl font-semibold">💡 Pro Tips & Tricks</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li>Use <strong>Port Forwarding</strong> to allow external access to internal servers (e.g., web server on 192.168.1.100 port 80).</li>
                <li>Configure <strong>NAT hairpinning</strong> (NAT loopback) if internal users need to reach a server by its public IP from inside.</li>
                <li>ICMP can be a security risk: many networks block ICMP Echo Requests to hide from ping sweeps, but also break PMTUD – allow <code>icmp type 3 code 4</code> (Packet Too Big).</li>
                <li>Use extended <code>ping</code> with source interface to test NAT rules: <code>ping -I eth0 8.8.8.8</code>.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-xl border-l-8 border-red-400">
              <h3 className="text-xl font-semibold">⚠️ Common Mistakes & Misconceptions</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li><span className="font-bold">Thinking NAT increases security:</span> It provides a small obfuscation but not true firewall; use proper ACLs.</li>
                <li><span className="font-bold">Blocking all ICMP:</span> Breaks PMTUD → fragmented packets and performance issues (also breaks traceroute).</li>
                <li><span className="font-bold">Misunderstanding NAT table size:</span> PAT uses ~16-bit port range (65,535 concurrent sessions per IP). For large networks, need multiple public IPs.</li>
                <li><span className="font-bold">Using static NAT for every internal host:</span> wastes public IPs; use PAT for clients, static only for inbound services.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
              <h3 className="text-xl font-semibold">✅ Best Practices & Checklist</h3>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>✔ Always document your NAT rules (source/destination IPs, ports).</li>
                <li>✔ Use separate public IP pools for inbound vs. outbound when possible.</li>
                <li>✔ Allow essential ICMP types: echo request/reply, time-exceeded, packet‑too‑big.</li>
                <li>✔ Test NAT connectivity from outside (e.g., using a mobile hotspot) to ensure port forwarding works.</li>
              </ul>
              <p className="mt-3 text-sm italic">Mini checklist: Understand private IP ranges (RFC 1918) → Know how PAT works → Differentiate static/dynamic/PAT → Identify ICMP types by number → Use ping/traceroute effectively.</p>
            </div>
          </div>

          {/* Hint Section */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[500ms] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-xl text-center italic">
            <p className="text-gray-700 dark:text-gray-300">🧠 <span className="font-semibold">Think about:</span> What happens to an ICMP Echo Request when NAT runs out of ports? How does traceroute use ICMP TTL expiration?</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Try running <code>nmap -sP 8.8.8.8</code> (ping scan) and capture packets with Wireshark to see ICMP exchange.</p>
          </div>

          {/* FAQ */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[600ms]">
            <FAQTemplate title="NAT & ICMP FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[700ms]">
            <Teacher note="Students often confuse NAT with firewalls. Emphasise that NAT is simply address translation — it doesn't inspect packets or deny by default. Also, demonstrate real ICMP captures: seeing 'Time to live exceeded' makes traceroute click. For large classes, have them ping each other's private IPs across NAT to see failure — then configure port forwarding to succeed." />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Networking Foundations — NAT & ICMP</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic3;