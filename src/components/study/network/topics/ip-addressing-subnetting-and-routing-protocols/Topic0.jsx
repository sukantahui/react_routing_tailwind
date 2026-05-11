// Topic0.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

/**
 * Topic0 Component: IPv4 and IPv6 Addressing
 * @returns {JSX.Element} Full educational section on IP addressing fundamentals
 * Purpose: Introduce IPv4 and IPv6 addressing, compare their structures, explain need for IPv6
 * When & Why used: First topic in networking course - establishes addressing foundation
 */

const Topic0 = () => {
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
        {/* Header with Dark Mode Toggle */}
        <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                IPv4 & IPv6 Addressing
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Understanding the foundation of network communication
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
          {/* Section 1: Introduction - animated */}
          <section className="animated-section space-y-4 animate-[fadeSlideUp_0.6s_ease-out] delay-[0ms]">
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <p className="text-lg leading-relaxed">
                Just like every house needs a unique street address for mail delivery, every device connected to a network needs a unique IP address. 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> IPv4 </span> has served us since 1981, but the explosion of internet-connected devices 
                (think smartphones, smartwatches, and even refrigerators!) led to its exhaustion. Meet <span className="font-semibold text-green-600 dark:text-green-400"> IPv6 </span> — the next-generation protocol with enough addresses for every atom on Earth.
              </p>
            </div>
          </section>

          {/* Section 2: Comparison Cards - two cards not side by side? Actually we want column, but we can put both in a flex row? The spec says "place divs one after another not side by side, maintain it for all topics" - so each card as separate block. So below each card block separate. */}
          <div className="space-y-6">
            <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[100ms]">
              <div className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">IPv4: The Workhorse</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                  <li><span className="font-mono">32-bit address</span> → 4.3 billion unique addresses</li>
                  <li>Dotted-decimal format: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">192.168.1.1</code></li>
                  <li>Uses NAT to conserve address space</li>
                  <li>Header length variable (20-60 bytes)</li>
                  <li>Example: Mamata's laptop at Barrackpore school gets <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">10.20.30.45</code></li>
                </ul>
              </div>
            </div>

            <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[200ms]">
              <div className="group bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">IPv6: The Future-Ready Protocol</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                  <li><span className="font-mono">128-bit address</span> → 340 undecillion addresses (that's 340 trillion trillion trillion!)</li>
                  <li>Hexadecimal notation: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></li>
                  <li>Auto-configuration (SLAAC) — no DHCP needed</li>
                  <li>Built-in IPsec support, no NAT required</li>
                  <li>Example: Susmita's phone in Kolkata gets <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">fe80::1a2b:3c4d:5e6f</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Address Anatomy with SVG animation */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[300ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">Address Anatomy & Format</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* IPv4 SVG */}
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-center mb-3">IPv4 Structure (32 bits)</h3>
                <div className="flex justify-center">
                  <svg width="320" height="100" viewBox="0 0 320 100" className="max-w-full h-auto">
                    <rect x="10" y="20" width="300" height="40" rx="6" fill="#93c5fd" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />
                    {[0,1,2,3].map((octet, idx) => (
                      <rect key={idx} x={10 + idx*75} y="20" width="75" height="40" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="1">
                        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" begin={`${idx*0.3}s`} />
                      </rect>
                    ))}
                    <text x="45" y="48" textAnchor="middle" fontSize="12" fill="#1e3a8a" className="dark:fill-blue-200">8 bits</text>
                    <text x="120" y="48" textAnchor="middle" fontSize="12" fill="#1e3a8a" className="dark:fill-blue-200">8 bits</text>
                    <text x="195" y="48" textAnchor="middle" fontSize="12" fill="#1e3a8a" className="dark:fill-blue-200">8 bits</text>
                    <text x="270" y="48" textAnchor="middle" fontSize="12" fill="#1e3a8a" className="dark:fill-blue-200">8 bits</text>
                    <text x="160" y="85" textAnchor="middle" fontSize="13" fill="#475569" className="dark:text-gray-300">Example: 192 . 168 . 1 . 100</text>
                  </svg>
                </div>
              </div>

              {/* IPv6 SVG */}
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-center mb-3">IPv6 Structure (128 bits)</h3>
                <div className="flex justify-center">
                  <svg width="320" height="110" viewBox="0 0 320 110" className="max-w-full h-auto">
                    <rect x="10" y="10" width="300" height="30" rx="4" fill="#4ade80" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.5" />
                    <text x="160" y="30" textAnchor="middle" fontSize="10" fill="#166534" className="dark:text-green-200">8 groups of 16 bits (hextets)</text>
                    {[0,1,2,3,4,5,6,7].map((_, idx) => (
                      <rect key={idx} x={10 + idx*37.5} y="45" width="37.5" height="30" fill="#22c55e" fillOpacity="0.15" stroke="#16a34a" strokeWidth="0.8">
                        <animate attributeName="fill-opacity" values="0.15;0.4;0.15" dur="4s" repeatCount="indefinite" begin={`${idx*0.2}s`} />
                      </rect>
                    ))}
                    <text x="160" y="95" textAnchor="middle" fontSize="11" fill="#475569" className="dark:text-gray-300">2001:0db8:85a3:0000:0000:8a2e:0370:7334</text>
                    <text x="160" y="108" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:text-gray-400">Abbreviation: 2001:db8:85a3::8a2e:370:7334</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Real-world usage & transition strategies */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[400ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">Real-World & Transition</h2>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="leading-relaxed">
                At <span className="font-semibold">Ichapur Government School</span>, the computer lab has 30 devices. With IPv4, the lab uses a single public IP and NAT (Network Address Translation) to let every PC access the internet. But when students like <span className="font-semibold text-blue-600 dark:text-blue-400">Debangshu</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">Mahima</span> need to connect from home, they face port forwarding issues. Meanwhile, <span className="font-semibold text-green-600 dark:text-green-400">Jadavpur University</span> already runs dual-stack (IPv4 + IPv6), allowing native IPv6 connections — better for video conferencing and gaming.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:scale-[1.02] transition-transform duration-200">🔁 <span className="font-mono">Dual Stack</span><br />Run IPv4 & IPv6 together</div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:scale-[1.02] transition-transform duration-200">📦 <span className="font-mono">Tunneling</span><br />IPv6 inside IPv4 packets</div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:scale-[1.02] transition-transform duration-200">🌉 <span className="font-mono">Translation (NAT64)</span><br />Translate between protocols</div>
              </div>
            </div>
          </div>

          {/* Section 5: Tips & Tricks and Common Mistakes combined */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[500ms] space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border-l-8 border-indigo-400">
              <h3 className="text-xl font-semibold flex items-center gap-2">💡 Pro Tips & Tricks</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li>Shorten IPv6 addresses: remove leading zeros and use <code className="bg-gray-200 dark:bg-gray-700 px-1">::</code> once → <code>fe80:0:0:0:2aa:ff:fe28:9c5a</code> becomes <code>fe80::2aa:ff:fe28:9c5a</code></li>
                <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1">ping6</code> for IPv6 connectivity testing, <code className="bg-gray-200 dark:bg-gray-700 px-1">tracert -6</code> on Windows</li>
                <li>Remember: IPv6 link-local addresses always start with <code>fe80::/10</code> — every interface gets one automatically</li>
                <li>Debugging mindset: When a device has <code>169.254.x.x</code> (APIPA), DHCP failed. For IPv6, look for <code>fe80::</code> but no global address</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-xl border-l-8 border-red-400">
              <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li><span className="font-bold">Misunderstanding IPv6 notation:</span> <code>::</code> can only be used once in an address, otherwise ambiguous.</li>
                <li><span className="font-bold">Assuming IPv6 is just "IPv4 with longer addresses":</span> IPv6 removes broadcast, introduces anycast, and has no NAT.</li>
                <li><span className="font-bold">Writing IPv6 prefixes incorrectly:</span> <code>2001:db8::/32</code> means first 32 bits are network, not the first 4 hextets exactly.</li>
                <li><span className="font-bold">IDE/compiler errors:</span> In network configs, forgetting colons or mixing IPv4 dotted with IPv6 format causes validation failures.</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
              <h3 className="text-xl font-semibold flex items-center gap-2">✅ Best Practices & Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <ul className="space-y-1 list-checkmark pl-5">
                  <li>✔ Always prefer IPv6 where possible (future-proof)</li>
                  <li>✔ Use <code>/64</code> subnets for point-to-point links</li>
                  <li>✔ Document addressing scheme clearly</li>
                </ul>
                <ul className="space-y-1 list-checkmark pl-5">
                  <li>✔ Test with <code>ping</code>, <code>ping6</code>, and <code>traceroute</code></li>
                  <li>✔ Check for dual-stack support in firewalls</li>
                </ul>
              </div>
              <p className="mt-3 text-sm italic">Mini checklist: I understand address exhaustion → I can differentiate IPv4/IPv6 → I know how to abbreviate IPv6 → I can identify special addresses (loopback, link-local).</p>
            </div>
          </div>

          {/* Section 6: Hint section */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[600ms] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-xl text-center italic">
            <p className="text-gray-700 dark:text-gray-300">🧠 <span className="font-semibold">Think about this:</span> Why does IPv6 not need broadcast? How does Neighbor Discovery replace ARP?</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Try changing the IPv6 address prefixes in a config file — observe how routers behave differently.</p>
          </div>

          {/* FAQ Section */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[700ms]">
            <FAQTemplate title="IPv4 & IPv6 Addressing FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[800ms]">
            <Teacher note="When introducing IPv6, emphasize that students should not fear the longer addresses — with practice, abbreviation becomes second nature. A fun activity: let each student create an IPv6 address for their desk using their birth month and day in hex! Also, stress that transition mechanisms (like dual stack) are critical in real networks. Remember to celebrate small wins: when they successfully ping an IPv6 address for the first time 🎉" />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Networking Foundations — IPv4 & IPv6 Addressing</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic0;