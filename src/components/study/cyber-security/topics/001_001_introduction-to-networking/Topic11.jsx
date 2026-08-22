import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic11_files/topic11_questions';

const Topic11 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes dash {
      to { stroke-dashoffset: 0; }
    }
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s ease-out forwards;
    }
    .animate-pulse-glow {
      animation: pulseGlow 2s infinite;
    }
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    .animate-dash {
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      animation: dash 2s ease-in-out forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-dash {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  const wanCharacteristics = [
    'Covers a large geographical area (country, continent, global)',
    'Lower speed than LAN/MAN (typically 1-100 Mbps)',
    'Higher latency due to long distances',
    'Uses public infrastructure (leased lines, satellite, fiber)',
    'Often involves multiple ISPs and carriers',
    'Complex routing and addressing (BGP, IP)',
  ];

  const wanTechnologies = [
    {
      icon: '🔌',
      name: 'Leased Lines (T1/E1, T3/E3)',
      desc: 'Dedicated point-to-point circuits providing guaranteed bandwidth, often used for business connectivity.',
    },
    {
      icon: '📡',
      name: 'Satellite Links',
      desc: 'Used in remote areas where terrestrial infrastructure is unavailable. Provides global coverage but with higher latency.',
    },
    {
      icon: '🌊',
      name: 'Undersea Fiber Cables',
      desc: 'Fiber optic cables laid across oceans, carrying most intercontinental internet traffic.',
    },
    {
      icon: '🔁',
      name: 'MPLS VPNs',
      desc: 'Virtual Private Networks built using MPLS, providing secure, private connectivity across a WAN.',
    },
    {
      icon: '🌐',
      name: 'Internet (Public WAN)',
      desc: 'The global network of networks, the largest WAN, connecting billions of devices.',
    },
    {
      icon: '📶',
      name: '4G/5G Cellular Networks',
      desc: 'Mobile networks providing wide-area coverage for mobile devices and IoT.',
    },
  ];

  const wanUseCases = [
    {
      title: 'Connecting Branch Offices',
      desc: 'A multinational corporation connects its offices in different cities using a WAN for shared resources and unified communications.',
    },
    {
      title: 'Internet Access',
      desc: 'Home and business users connect to the internet (the ultimate WAN) for browsing, streaming, and cloud services.',
    },
    {
      title: 'Cloud Connectivity',
      desc: 'Enterprises use WAN connections to reach cloud providers (AWS, Azure) for hybrid cloud architectures.',
    },
    {
      title: 'Disaster Recovery',
      desc: 'Replicate data to off-site backup locations across the WAN for business continuity.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* --- Title Section --- */}
        <section
          className="text-center animate-fade-slide-up"
          style={{ animationDelay: '0ms' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Wide Area Network (WAN)
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Connecting the world – the infrastructure that spans continents
          </p>
        </section>

        {/* --- Introduction: What is a WAN? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            What is a WAN?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>Wide Area Network (WAN)</strong> is a network that covers a large geographical
              area, such as a country, continent, or the entire globe. The Internet itself is the
              largest and most well-known WAN. WANs connect multiple LANs and MANs, enabling
              communication across cities, countries, and oceans.
            </p>
            <p>
              WANs typically use technologies like <strong>leased lines</strong>, <strong>satellite
              links</strong>, <strong>undersea fiber cables</strong>, and <strong>cellular networks</strong>
              to transmit data over long distances. While slower and more expensive than LANs, they
              are essential for global connectivity.
            </p>
            <p>
              For students in <strong>Kolkata</strong>, the internet they use to access global
              websites is a WAN. <strong>Debangshu</strong> can collaborate with peers in
              <strong>London</strong> thanks to WAN infrastructure – undersea cables, routers,
              and protocols like BGP and IP.
            </p>
          </div>

          {/* SVG: WAN Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="700"
              height="300"
              viewBox="0 0 700 300"
              className="w-full max-w-2xl h-auto"
              aria-label="Illustration of a WAN showing multiple cities connected via satellite, fiber, and leased lines"
            >
              <rect width="700" height="300" fill="transparent" />

              {/* Background globe */}
              <circle cx="350" cy="150" r="140" fill="#3b82f6" opacity="0.1" className="dark:opacity-20" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />

              {/* City nodes (LANs) */}
              {[
                { x: 80, y: 80, label: 'New York' },
                { x: 350, y: 50, label: 'London' },
                { x: 620, y: 80, label: 'Tokyo' },
                { x: 100, y: 220, label: 'Mumbai' },
                { x: 350, y: 250, label: 'Singapore' },
                { x: 600, y: 220, label: 'Sydney' },
              ].map((city, idx) => (
                <g key={idx}>
                  <rect
                    x={city.x}
                    y={city.y}
                    width="80"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={city.x + 40}
                    y={city.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {city.label}
                  </text>
                </g>
              ))}

              {/* WAN links (different types) */}
              {/* Leased lines (solid) */}
              <line x1="160" y1="100" x2="270" y2="80" stroke="#ef4444" strokeWidth="3" className="animate-dash" />
              <line x1="430" y1="80" x2="540" y2="100" stroke="#ef4444" strokeWidth="3" className="animate-dash" style={{ animationDelay: '0.5s' }} />
              <line x1="160" y1="240" x2="270" y2="240" stroke="#ef4444" strokeWidth="3" className="animate-dash" style={{ animationDelay: '1s' }} />
              <line x1="430" y1="240" x2="520" y2="240" stroke="#ef4444" strokeWidth="3" className="animate-dash" style={{ animationDelay: '1.5s' }} />

              {/* Satellite links (dashed) */}
              <line x1="120" y1="120" x2="350" y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 4" />
              <line x1="580" y1="120" x2="350" y2="190" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 4" />
              <text x="350" y="30" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Satellite</text>

              {/* Animated data packets */}
              <circle r="5" fill="#22c55e">
                <animate attributeName="cx" values="160;270;160" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="100;80;100" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#22c55e">
                <animate attributeName="cx" values="540;430;540" dur="3s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="cy" values="100;80;100" dur="3s" repeatCount="indefinite" begin="1s" />
              </circle>

              {/* Legend */}
              <text x="350" y="285" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Red = Leased Lines   |   Orange = Satellite   |   Green = Data Packets
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            A WAN connects multiple cities globally using leased lines, satellite, and other technologies.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Key Characteristics of a WAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {wanCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-red-500 dark:text-red-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- WAN Technologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Technologies Used in WANs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wanTechnologies.map((tech, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </span>
                  <h3 className="font-semibold text-red-600 dark:text-red-400">
                    {tech.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Real-world Use Cases --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            WAN in the Real World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wanUseCases.map((use, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <span>🌍</span> {use.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {use.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- WAN vs LAN vs MAN Comparison (revisited for WAN focus) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            WAN vs LAN vs MAN – The Big Picture
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Feature</th>
                  <th className="px-4 py-2 text-left">LAN</th>
                  <th className="px-4 py-2 text-left">MAN</th>
                  <th className="px-4 py-2 text-left">WAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 font-semibold">Size</td>
                  <td className="px-4 py-2">Building/Campus</td>
                  <td className="px-4 py-2">City</td>
                  <td className="px-4 py-2">Country/Global</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Speed</td>
                  <td className="px-4 py-2">High (1-10 Gbps)</td>
                  <td className="px-4 py-2">Moderate-High (1-10 Gbps)</td>
                  <td className="px-4 py-2">Lower (1-100 Mbps)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Latency</td>
                  <td className="px-4 py-2">Very Low</td>
                  <td className="px-4 py-2">Low</td>
                  <td className="px-4 py-2">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Ownership</td>
                  <td className="px-4 py-2">Private</td>
                  <td className="px-4 py-2">City/Public</td>
                  <td className="px-4 py-2">Multiple ISPs/Public</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Technology</td>
                  <td className="px-4 py-2">Ethernet, Wi-Fi</td>
                  <td className="px-4 py-2">Fiber, Microwave</td>
                  <td className="px-4 py-2">Leased lines, Satellite, Fiber</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Advantages and Disadvantages of WAN --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of WAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Global reach:</strong> Connect anywhere in the world.</li>
                <li><strong>Scalability:</strong> Add new sites easily.</li>
                <li><strong>Centralised management:</strong> Control from a single location.</li>
                <li><strong>Redundancy:</strong> Multiple paths for reliability.</li>
                <li><strong>Service diversity:</strong> Support for voice, data, video, IoT.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>High cost:</strong> Leased lines and satellite are expensive.</li>
                <li><strong>Slower speeds:</strong> Compared to LANs.</li>
                <li><strong>Higher latency:</strong> Impacts real-time applications.</li>
                <li><strong>Security risks:</strong> More exposure to threats.</li>
                <li><strong>Complexity:</strong> Requires skilled staff and advanced routing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>SD-WAN</strong> for intelligent path selection and cost optimisation.</li>
                <li>Implement <strong>QoS</strong> to prioritise critical applications over the WAN.</li>
                <li>Choose <strong>redundant WAN links</strong> (e.g., primary fiber, backup 4G).</li>
                <li>Monitor <strong>latency and jitter</strong> to ensure application performance.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Underestimating <strong>bandwidth needs</strong> – cause congestion.</li>
                <li>Not considering <strong>latency</strong> – VoIP and video suffer.</li>
                <li>Ignoring <strong>security</strong> – WANs are a prime target for attacks.</li>
                <li>Relying on a <strong>single ISP</strong> – single point of failure.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ WAN Design Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Assess requirements:</strong> Bandwidth, latency, uptime, security.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose connectivity type:</strong> Leased line, MPLS, Internet VPN, SD-WAN.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for redundancy:</strong> Diverse links, failover mechanisms.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement security:</strong> IPSec VPNs, firewalls, encryption.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Deploy monitoring:</strong> Performance and SLA tracking.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Document:</strong> Network topology, IP addressing, routing protocols.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '900ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Trace the path of a packet from your device to a website hosted in another country.
            What types of WAN technologies might it traverse? How many routers and ISPs might be
            involved? This will help you understand the complexity and resilience of the global
            internet.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "WANs are the most complex network type, involving multiple carriers, protocols, and policies. Emphasise the importance of SLAs and monitoring – a WAN is only as reliable as its weakest link. Also, highlight emerging trends like SD-WAN and 5G, which are transforming WAN architectures. Encourage students to explore traceroute to see the path their data takes."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Wide Area Network (WAN) FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic11;