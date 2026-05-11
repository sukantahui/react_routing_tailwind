// Topic1.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

/**
 * Topic1 Component: Subnetting and CIDR
 * @returns {JSX.Element} Full educational section on subnetting & CIDR
 * Purpose: Teach how to divide IP networks into smaller subnets, and understand Classless Inter-Domain Routing
 * When & Why used: After IP addressing (Topic0), to optimize address allocation and routing
 */

const Topic1 = () => {
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
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Subnetting & CIDR
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Divide and conquer IP networks like a pro
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
            <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-6 rounded-r-xl">
              <p className="text-lg leading-relaxed">
                Imagine a post office sorting letters for a large city. Without subdivisions into neighborhoods, streets, and houses, delivery would take forever. Similarly, early IP networks used rigid classes (A, B, C), wasting thousands of addresses.  
                <span className="font-semibold text-purple-600 dark:text-purple-400"> Subnetting </span> and 
                <span className="font-semibold text-pink-600 dark:text-pink-400"> CIDR </span> (Classless Inter-Domain Routing) allow us to carve networks into smaller, efficient blocks — giving every student in Barrackpore’s computer lab their own tiny logical network if needed.
              </p>
            </div>
          </section>

          {/* Section 2: Why Subnetting? Real-World */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[100ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3">Why Subnet? Real-World Scenarios</h2>
            <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed list-disc pl-5">
                <li><span className="font-semibold">Reduce broadcast traffic:</span> In a flat /16 network with 65,000 hosts, ARP broadcasts disturb everyone. Subnetting splits into smaller broadcast domains.</li>
                <li><span className="font-semibold">Security isolation:</span> Student devices (VLAN 10) vs. teachers (VLAN 20) stay separate.</li>
                <li><span className="font-semibold">Efficient IP allocation:</span> Jadavpur University needs 500 addresses for the CS department, not a full Class B (65,536).</li>
                <li><span className="font-semibold">Route aggregation (CIDR):</span> One route summary replaces many specific routes → smaller routing tables.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Subnet Mask & CIDR Notation - SVG with animation */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[200ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3">Subnet Mask & CIDR Notation</h2>
            <div className="grid md:grid-cols-1 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 group hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-center mb-3">How a Subnet Mask Works</h3>
                <div className="flex justify-center">
                  <svg width="500" height="140" viewBox="0 0 500 140" className="max-w-full h-auto">
                    <rect x="10" y="10" width="480" height="40" rx="4" fill="#8b5cf6" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="35" textAnchor="middle" fontSize="13" fill="#6b21a5" className="dark:text-purple-300">IP Address: 192.168.10.50 = 11000000.10101000.00001010.00110010</text>
                    <rect x="10" y="55" width="480" height="40" rx="4" fill="#ec4899" fillOpacity="0.15" stroke="#f472b6" strokeWidth="1.5" />
                    <text x="250" y="80" textAnchor="middle" fontSize="13" fill="#9d174d" className="dark:text-pink-300">Subnet Mask: 255.255.255.0 = 11111111.11111111.11111111.00000000</text>
                    <rect x="10" y="100" width="480" height="30" rx="4" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="1" />
                    <text x="250" y="120" textAnchor="middle" fontSize="13" fill="#f3e8ff" className="dark:text-white font-mono">Network part (24 bits)  |  Host part (8 bits)</text>
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
                  </svg>
                </div>
                <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">CIDR notation: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">192.168.10.50/24</code> → 24 network bits, 8 host bits</p>
              </div>
            </div>
          </div>

          {/* Section 4: Subnet Calculation Steps - Interactive steps with hover */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[300ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3">Subnet Calculation in 4 Steps</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Determine number of subnets & hosts needed", desc: "Example: Ichapur school needs 5 subnets for different departments, each with at least 30 devices." },
                { step: 2, title: "Find the subnet mask", desc: "Borrow host bits → 2^n ≥ required subnets. Borrow 3 bits (2³=8) gives 8 subnets. Remaining host bits = 5 → 2⁵-2=30 hosts per subnet." },
                { step: 3, title: "Calculate block size", desc: "Block size = 256 - subnet mask octet value. For 255.255.255.224 (borrowed 3 bits), block = 256-224 = 32." },
                { step: 4, title: "List subnets", desc: "Network IDs: 0, 32, 64, 96, 128, 160, 192, 224 within the original octet." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300 group-hover:scale-110 transition-transform duration-200">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: CIDR Aggregation Example */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[400ms] space-y-4">
            <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3">CIDR: Route Aggregation in Action</h2>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl border-l-8 border-emerald-500">
              <p className="leading-relaxed">
                Without CIDR, Kolkata’s ISP would have 4 different routes for these blocks:  
                <code className="block font-mono text-sm mt-2 bg-gray-200 dark:bg-gray-800 p-2 rounded">  
                  192.168.4.0/24<br/>
                  192.168.5.0/24<br/>
                  192.168.6.0/24<br/>
                  192.168.7.0/24
                </code>
                With CIDR, we summarize them into a single route: <code className="bg-emerald-200 dark:bg-emerald-800 px-1 font-mono">192.168.4.0/22</code> (first 22 bits identical). This reduces routing table size and increases efficiency.
              </p>
              <p className="mt-3 italic text-sm"><span className="font-semibold">Tip:</span> Summarization requires contiguous blocks that are aligned to the power-of-two boundary.</p>
            </div>
          </div>

          {/* Section 6: Common Pitfalls & Pro Tips */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[500ms] space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border-l-8 border-indigo-400">
              <h3 className="text-xl font-semibold">💡 Pro Tips & Tricks</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li>Remember: <code>2<sup>n</sup></code> for subnets, <code>2<sup>h</sup> - 2</code> for usable hosts (n = borrowed bits, h = remaining host bits).</li>
                <li>Use the <span className="font-mono">magic number</span> technique: block size = 256 - subnet mask in the interesting octet.</li>
                <li>Always plan for growth: allocate twice the needed subnets/hosts.</li>
                <li>For IPv6 subnetting: always use /64 for most subnets; use /127 for point-to-point links (RFC 6164).</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-xl border-l-8 border-red-400">
              <h3 className="text-xl font-semibold">⚠️ Common Mistakes & Misconceptions</h3>
              <ul className="mt-3 space-y-2 text-gray-800 dark:text-gray-200 list-disc pl-5">
                <li><span className="font-bold">Forgetting the "all-zeros" and "all-ones" subnets:</span> With classful routing they were unusable; with CIDR (and ip subnet-zero) they are usable — but some legacy exams still subtract 2.</li>
                <li><span className="font-bold">Confusing slash notation:</span> <code>/24</code> means 24 network bits, not 24 host bits.</li>
                <li><span className="font-bold">Miscalculating block size:</span> e.g., mask 255.255.252.0 → block size = 256-252 = 4, not 256-255.</li>
                <li><span className="font-bold">Using invalid subnet masks:</span> Masks must be continuous 1s from left (e.g., 255.255.0.255 is invalid).</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl">
              <h3 className="text-xl font-semibold">✅ Best Practices & Checklist</h3>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>✔ Always document your subnet plan (excel or IPAM tool).</li>
                <li>✔ Reserve subnet zero and broadcast addresses for documentation.</li>
                <li>✔ Use variable-length subnet masking (VLSM) to avoid waste.</li>
                <li>✔ Test connectivity with <code>ping</code> and <code>traceroute</code> after subnetting.</li>
              </ul>
              <p className="mt-3 text-sm italic">Mini checklist: Understand IP classes → Convert masks binary ↔ decimal → Calculate subnets/hosts → Apply VLSM → Summarize routes.</p>
            </div>
          </div>

          {/* Hint Section */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[600ms] bg-gray-100 dark:bg-gray-800/50 p-5 rounded-xl text-center italic">
            <p className="text-gray-700 dark:text-gray-300">🧠 <span className="font-semibold">Observe carefully:</span> What happens to the number of subnets when you borrow one more bit? How many host addresses are lost per subnet?</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Try changing <code>192.168.1.0/25</code> to <code>/26</code> in a lab — see the network boundaries shift.</p>
          </div>

          {/* FAQ */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[700ms]">
            <FAQTemplate title="Subnetting & CIDR FAQs" questions={questions} />
          </div>

          {/* Teacher's Note */}
          <div className="animated-section animate-[fadeSlideUp_0.6s_ease-out] delay-[800ms]">
            <Teacher note="Students often struggle with binary AND to find network ID. A great trick: use the 'magic number' method (block size) — it reduces errors dramatically. Also, emphasise that subnetting is like dividing a large cake into smaller slices: you decide the slice size (subnet mask) based on how many guests (hosts) you expect at each table." />
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Networking Foundations — Subnetting & CIDR</p>
        </footer>
      </div>
    </div>
  );
};

export default Topic1;