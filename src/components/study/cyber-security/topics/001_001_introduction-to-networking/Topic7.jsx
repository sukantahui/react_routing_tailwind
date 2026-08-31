import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic7_files/topic7_questions';

const Topic7 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(139, 92, 246, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
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
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const networkTypes = [
    {
      type: 'PAN',
      full: 'Personal Area Network',
      icon: '📱',
      range: 'Up to 10 meters',
      speed: 'Low to moderate (e.g., Bluetooth 2 Mbps)',
      example: 'Connecting a phone to a smartwatch, wireless earbuds, or a laptop via Bluetooth.',
      description: 'A network for personal devices typically used within a single person\'s workspace.',
      keyPoints: ['Short range', 'Low power consumption', 'Usually wireless (Bluetooth, Zigbee, NFC)'],
    },
    {
      type: 'LAN',
      full: 'Local Area Network',
      icon: '🏢',
      range: 'Up to a few kilometers (typically a building or campus)',
      speed: 'High (100 Mbps to 10 Gbps)',
      example: 'A school computer lab or office network connecting PCs, printers, and servers via Ethernet or Wi-Fi.',
      description: 'A network that covers a small geographical area, like a single building or campus.',
      keyPoints: ['High speed', 'Low latency', 'Typically owned by one organisation', 'Uses Ethernet or Wi-Fi'],
    },
    {
      type: 'MAN',
      full: 'Metropolitan Area Network',
      icon: '🏙️',
      range: 'A city or metropolitan area (up to 50 km)',
      speed: 'Moderate to high (e.g., 1 Gbps)',
      example: 'A city-wide network connecting government offices, libraries, and schools in Kolkata.',
      description: 'A network that spans a city or large campus, often using fiber optics or microwave links.',
      keyPoints: ['Larger than LAN, smaller than WAN', 'Often owned by a city or large organisation', 'Uses fiber or wireless backhaul'],
    },
    {
      type: 'WAN',
      full: 'Wide Area Network',
      icon: '🌍',
      range: 'Global (100+ km)',
      speed: 'Lower than LAN (e.g., 1-100 Mbps) due to long distances',
      example: 'The Internet itself – a global WAN connecting millions of networks.',
      description: 'A network that spans a large geographical area, often connecting multiple LANs across cities or countries.',
      keyPoints: ['Covers large distances', 'Lower speed due to distance', 'Often leased lines or public infrastructure', 'Complex routing'],
    },
  ];

  // Additional comparison data
  const comparisonData = [
    { attribute: 'Geographic Scope', PAN: 'Very small (personal)', LAN: 'Building/Campus', MAN: 'City', WAN: 'Country/Global' },
    { attribute: 'Ownership', PAN: 'Individual', LAN: 'Single organisation', MAN: 'City/Consortium', WAN: 'Multiple ISPs/Public' },
    { attribute: 'Typical Speed', PAN: '1-10 Mbps', LAN: '100 Mbps - 10 Gbps', MAN: '1-10 Gbps', WAN: '1-100 Mbps' },
    { attribute: 'Latency', PAN: 'Very low', LAN: 'Very low', MAN: 'Moderate', WAN: 'High' },
    { attribute: 'Examples', PAN: 'Bluetooth, USB', LAN: 'Ethernet, Wi-Fi', MAN: 'Cable TV, Metro Ethernet', WAN: 'Internet, MPLS' },
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Types of Networks
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Understanding PAN, LAN, MAN, and WAN – the spectrum of network scales
          </p>
        </section>

        {/* --- Introduction: Network Scale Matters --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            One Size Does Not Fit All
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Not all networks are created equal. The distance they cover, the speed they offer,
              and the ownership model vary significantly. Networks are classified into four main
              types based on their geographical scope: <strong>PAN</strong> (Personal Area Network),
              <strong>LAN</strong> (Local Area Network), <strong>MAN</strong> (Metropolitan Area Network),
              and <strong>WAN</strong> (Wide Area Network).
            </p>
            <p>
              Think of these as concentric circles: a PAN is your personal bubble, a LAN is your
              building or school, a MAN is your city, and a WAN is the world. For students in
              <strong>Barrackpore</strong>, a LAN might be the computer lab; the MAN could be
              the city-wide fiber network connecting all government schools; and the WAN is the
              internet they use to access global content.
            </p>
          </div>

          {/* SVG: Network types concentric circles */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="300"
              viewBox="0 0 500 300"
              className="w-full max-w-md h-auto"
              aria-label="Concentric circles representing PAN, LAN, MAN, WAN with labels"
            >
              <rect width="500" height="300" fill="transparent" />

              {/* Outer WAN (global) */}
              <circle cx="250" cy="150" r="140" fill="#3b82f6" opacity="0.15" className="dark:opacity-25" stroke="#3b82f6" strokeWidth="2" />
              <text x="390" y="30" fill="#3b82f6" fontSize="14" fontWeight="bold">WAN (Global)</text>

              {/* MAN (city) */}
              <circle cx="250" cy="150" r="100" fill="#8b5cf6" opacity="0.2" className="dark:opacity-30" stroke="#8b5cf6" strokeWidth="2" />
              <text x="370" y="70" fill="#8b5cf6" fontSize="13" fontWeight="bold">MAN (City)</text>

              {/* LAN (building/campus) */}
              <circle cx="250" cy="150" r="60" fill="#ec4899" opacity="0.25" className="dark:opacity-35" stroke="#ec4899" strokeWidth="2" />
              <text x="320" y="110" fill="#ec4899" fontSize="12" fontWeight="bold">LAN (Campus)</text>

              {/* PAN (personal) */}
              <circle cx="250" cy="150" r="25" fill="#f59e0b" opacity="0.4" className="dark:opacity-50" stroke="#f59e0b" strokeWidth="2" />
              <text x="210" y="140" fill="#f59e0b" fontSize="11" fontWeight="bold">PAN</text>

              {/* Central point */}
              <circle cx="250" cy="150" r="4" fill="#f59e0b" />

              {/* Animated expanding rings */}
              <circle cx="250" cy="150" r="25" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" values="25;30;25" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Networks are classified by scale – from personal to global.
          </p>
        </section>

        {/* --- Detailed Network Types (Cards) --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            The Four Main Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {networkTypes.map((net, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {net.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400">{net.type}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{net.full}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-2">
                  {net.description}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li><strong>Range:</strong> {net.range}</li>
                  <li><strong>Speed:</strong> {net.speed}</li>
                  <li><strong>Example:</strong> {net.example}</li>
                </ul>
                <div className="mt-2 flex flex-wrap gap-1">
                  {net.keyPoints.map((point, i) => (
                    <span key={i} className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs px-2 py-1 rounded-full">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Comparison at a Glance
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Attribute</th>
                  <th className="px-4 py-2 text-left">PAN</th>
                  <th className="px-4 py-2 text-left">LAN</th>
                  <th className="px-4 py-2 text-left">MAN</th>
                  <th className="px-4 py-2 text-left">WAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 font-semibold">{row.attribute}</td>
                    <td className="px-4 py-2">{row.PAN}</td>
                    <td className="px-4 py-2">{row.LAN}</td>
                    <td className="px-4 py-2">{row.MAN}</td>
                    <td className="px-4 py-2">{row.WAN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Real-world Scenario: Connecting a School --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Real-world Example: A School's Network Ecosystem
          </h2>
          <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-lg border border-violet-200 dark:border-violet-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Consider a school in <strong>Ichapur</strong> with students like <strong>Susmita</strong>
              and <strong>Mamata</strong>. They experience all four network types:
            </p>
            <ul className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-xl">📱</span>
                <div>
                  <strong>PAN:</strong> Susmita connects her Bluetooth earbuds to her phone to listen
                  to recorded lectures while commuting.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🏢</span>
                <div>
                  <strong>LAN:</strong> The school's computer lab uses Ethernet and Wi-Fi to connect
                  all PCs, printers, and the school server – a classic LAN.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🏙️</span>
                <div>
                  <strong>MAN:</strong> The school is part of a city-wide network that connects it to
                  the district education office and other schools for sharing resources and administrative data.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🌍</span>
                <div>
                  <strong>WAN:</strong> The school uses the internet (a global WAN) to access online
                  learning platforms, research databases, and communicate with partner schools abroad.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>When designing a network, <strong>start with the scale</strong> – choose the right type for the geographic coverage.</li>
                <li>Remember that <strong>LANs can interconnect</strong> via routers to form WANs.</li>
                <li>For MANs, consider <strong>fiber optics</strong> for high capacity; for WANs, use <strong>leased lines or VPNs</strong>.</li>
                <li>PANs are often <strong>wireless</strong> – ensure device compatibility.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Confusing <strong>MAN with WAN</strong> – MAN is city-wide, WAN is country/global.</li>
                <li>Assuming <strong>higher speed always comes with larger scale</strong> – LANs are often faster than WANs.</li>
                <li>Overlooking <strong>security</strong> differences – WANs need more robust security due to public exposure.</li>
                <li>Not considering <strong>ownership</strong> – WANs often involve ISPs, MANs may involve municipal entities.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Checklist for Choosing a Network Type
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Define the geographical coverage:</strong> How far do devices need to reach?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Assess speed requirements:</strong> What throughput is needed for your applications?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Consider ownership:</strong> Will the network be privately owned or rely on public infrastructure?
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for connectivity:</strong> How will it connect to other networks? (routers, gateways)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Security:</strong> What threats exist at this scale? Implement appropriate measures.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Scalability:</strong> Can the network grow as needs change?
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '700ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Think about your own daily digital life. Which network types do you interact with?
            When you stream music on your phone via Bluetooth – that's a PAN. When you connect to
            your home Wi-Fi – LAN. When you use city-wide public Wi-Fi – MAN. When you browse the web – WAN.
            Identifying these in your routine will cement the concepts.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Encourage students to think of these classifications as a continuum rather than rigid categories. A large LAN might blur into a MAN; a small WAN might be a MAN. The key is understanding the trade-offs: speed vs. distance, private vs. public, and cost vs. coverage. Use the concentric circle visual to reinforce scale."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Types of Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic7;