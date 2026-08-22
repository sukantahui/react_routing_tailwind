import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic12_files/topic12_questions';

const Topic12 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes wave {
      0% { d: path("M 0 20 Q 25 0 50 20 Q 75 40 100 20"); }
      50% { d: path("M 0 20 Q 25 40 50 20 Q 75 0 100 20"); }
      100% { d: path("M 0 20 Q 25 0 50 20 Q 75 40 100 20"); }
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

  const wirelessTypes = [
    {
      icon: '📶',
      name: 'Wi-Fi (IEEE 802.11)',
      desc: 'Wireless LAN technology using unlicensed spectrum (2.4 GHz, 5 GHz, 6 GHz). Common in homes, offices, and public hotspots.',
      standards: ['Wi-Fi 4 (802.11n)', 'Wi-Fi 5 (802.11ac)', 'Wi-Fi 6 (802.11ax)'],
      range: 'Up to 100 m (outdoor)',
      speed: 'Up to 9.6 Gbps (Wi-Fi 6)',
    },
    {
      icon: '📱',
      name: 'Cellular (4G/5G)',
      desc: 'Mobile networks providing wide-area coverage. 5G offers ultra-low latency and high throughput for IoT and mobile broadband.',
      standards: ['4G LTE', '5G NR'],
      range: 'Up to several km',
      speed: 'Up to 10 Gbps (5G)',
    },
    {
      icon: '🔵',
      name: 'Bluetooth (IEEE 802.15.1)',
      desc: 'Short-range wireless for personal devices (PAN). Uses 2.4 GHz, low power, and simple pairing.',
      standards: ['Bluetooth Classic', 'Bluetooth Low Energy (BLE)'],
      range: 'Up to 100 m (Class 1)',
      speed: 'Up to 24 Mbps (Bluetooth 5)',
    },
    {
      icon: '🏠',
      name: 'Zigbee (IEEE 802.15.4)',
      desc: 'Low-power, mesh networking for IoT devices (smart home, industrial sensors).',
      standards: ['Zigbee 3.0'],
      range: '10-100 m',
      speed: 'Up to 250 Kbps',
    },
    {
      icon: '🌐',
      name: 'WiMAX (IEEE 802.16)',
      desc: 'Wireless MAN technology providing broadband over large areas (up to 50 km). Used as a last-mile solution.',
      standards: ['802.16e', '802.16m'],
      range: 'Up to 50 km',
      speed: 'Up to 1 Gbps',
    },
    {
      icon: '🛰️',
      name: 'Satellite Internet',
      desc: 'Global coverage via satellites (LEO, GEO). Used in remote areas and for maritime/aviation.',
      standards: ['Starlink', 'OneWeb'],
      range: 'Global',
      speed: 'Up to 200 Mbps (Starlink)',
    },
  ];

  const wirelessAdvantages = [
    'Mobility – connect from anywhere within range',
    'Scalability – easy to add new devices',
    'Cost-effective – no cabling required',
    'Flexibility – networks can be temporary or permanent',
    'Quick deployment – no physical infrastructure delays',
  ];

  const wirelessDisadvantages = [
    'Interference from other devices and obstacles',
    'Security vulnerabilities (eavesdropping, rogue APs)',
    'Limited range and signal degradation',
    'Bandwidth shared – performance degrades with more users',
    'Weather and environmental effects (rain, walls)',
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Wireless Networks
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Connecting without wires – the freedom of mobility and flexibility
          </p>
        </section>

        {/* --- Introduction: What are Wireless Networks? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            What is a Wireless Network?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>wireless network</strong> uses radio waves (or sometimes infrared) to transmit
              data between devices without physical cables. Wireless networks have revolutionised how
              we connect – from home Wi-Fi to global 5G, they provide mobility, flexibility, and
              easy scalability.
            </p>
            <p>
              Wireless technologies include <strong>Wi-Fi</strong> (for local areas), <strong>cellular</strong>
              (4G/5G for wide coverage), <strong>Bluetooth</strong> (for personal devices), and
              <strong>satellite</strong> (for global reach). Each serves a different purpose, but
              all share the common advantage of freedom from cables.
            </p>
            <p>
              In a school in <strong>Barrackpore</strong>, students like <strong>Mamata</strong> and
              <strong>Mahima</strong> use Wi-Fi to access online resources, while their smartphones
              connect via 4G when they're outside. <strong>Susmita</strong> listens to music on
              Bluetooth earbuds – all part of the wireless ecosystem.
            </p>
          </div>

          {/* SVG: Wireless Spectrum and Devices */}
          <div className="mt-6 flex justify-center">
            <svg
              width="650"
              height="280"
              viewBox="0 0 650 280"
              className="w-full max-w-2xl h-auto"
              aria-label="Illustration showing different wireless technologies with ranges and devices"
            >
              <rect width="650" height="280" fill="transparent" />

              {/* Background - radio waves */}
              <circle cx="325" cy="140" r="130" fill="#10b981" opacity="0.08" className="dark:opacity-15" />

              {/* Central access point (AP) */}
              <rect x="290" y="120" width="70" height="40" rx="8" fill="#10b981" className="dark:fill-green-400" />
              <text x="325" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AP/Hub</text>

              {/* Wi-Fi devices (short range) */}
              {[
                { x: 80, y: 60, label: 'Laptop' },
                { x: 80, y: 180, label: 'Tablet' },
                { x: 500, y: 60, label: 'Phone' },
                { x: 500, y: 180, label: 'Smart TV' },
              ].map((dev, i) => (
                <g key={i}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="50"
                    height="40"
                    rx="6"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text
                    x={dev.x + 25}
                    y={dev.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                  {/* Wi-Fi signal waves (arcs) */}
                  <path
                    d={`M ${dev.x + 25} ${dev.y + 40} A 30 30 0 0 0 ${dev.x + 25 - 30} ${dev.y + 70}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <path
                    d={`M ${dev.x + 25} ${dev.y + 40} A 45 45 0 0 0 ${dev.x + 25 - 45} ${dev.y + 85}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                </g>
              ))}

              {/* Cellular devices (far) */}
              {[
                { x: 30, y: 20, label: 'Car' },
                { x: 600, y: 240, label: 'Drone' },
              ].map((dev, i) => (
                <g key={i}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="40"
                    height="30"
                    rx="6"
                    fill="#f59e0b"
                    className="dark:fill-yellow-400"
                  />
                  <text
                    x={dev.x + 20}
                    y={dev.y + 20}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {dev.label}
                  </text>
                  {/* Cellular signal (tower icon) */}
                  <text x={dev.x + 20} y={dev.y - 10} textAnchor="middle" fontSize="14">📡</text>
                </g>
              ))}

              {/* Animated data flow from devices to AP */}
              <circle r="4" fill="#22c55e">
                <animate attributeName="cx" values="105;290;105" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="80;140;80" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="4" fill="#22c55e">
                <animate attributeName="cx" values="525;360;525" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="cy" values="200;140;200" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              </circle>

              {/* Legend */}
              <text x="325" y="270" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Wi-Fi (green) &nbsp;|&nbsp; Cellular (orange) &nbsp;|&nbsp; Data flow (green dots)
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Wireless technologies connect devices over varying ranges using radio waves.
          </p>
        </section>

        {/* --- Types of Wireless Networks --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Types of Wireless Networks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wirelessTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </span>
                  <h3 className="font-semibold text-green-600 dark:text-green-400">
                    {type.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {type.desc}
                </p>
                <ul className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                  <li><strong>Standards:</strong> {type.standards.join(', ')}</li>
                  <li><strong>Range:</strong> {type.range}</li>
                  <li><strong>Speed:</strong> {type.speed}</li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Advantages and Disadvantages --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of Wireless Networks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {wirelessAdvantages.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {wirelessDisadvantages.map((dis, i) => (
                  <li key={i}>{dis}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Wi-Fi Standards Overview --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Wi-Fi Generations (802.11 Standards)
          </h2>
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Generation</th>
                  <th className="px-4 py-2 text-left">Standard</th>
                  <th className="px-4 py-2 text-left">Max Speed</th>
                  <th className="px-4 py-2 text-left">Frequency</th>
                  <th className="px-4 py-2 text-left">Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2">Wi-Fi 4</td>
                  <td className="px-4 py-2">802.11n</td>
                  <td className="px-4 py-2">600 Mbps</td>
                  <td className="px-4 py-2">2.4/5 GHz</td>
                  <td className="px-4 py-2">MIMO, first dual-band</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Wi-Fi 5</td>
                  <td className="px-4 py-2">802.11ac</td>
                  <td className="px-4 py-2">3.5 Gbps</td>
                  <td className="px-4 py-2">5 GHz</td>
                  <td className="px-4 py-2">MU-MIMO, wider channels</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Wi-Fi 6</td>
                  <td className="px-4 py-2">802.11ax</td>
                  <td className="px-4 py-2">9.6 Gbps</td>
                  <td className="px-4 py-2">2.4/5/6 GHz</td>
                  <td className="px-4 py-2">OFDMA, Target Wake Time, better efficiency</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Wi-Fi 6E</td>
                  <td className="px-4 py-2">802.11ax (6 GHz)</td>
                  <td className="px-4 py-2">9.6 Gbps</td>
                  <td className="px-4 py-2">6 GHz</td>
                  <td className="px-4 py-2">New 6 GHz spectrum, less interference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Real-world Scenario: Wireless in a Smart Home --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Real-world Example: Smart Home with Wireless
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Debangshu</strong> lives in a smart home in <strong>Ichapur</strong> where
              wireless networks enable seamless automation:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Wi-Fi:</strong> Connects his laptop, TV, and smart speaker to the internet.</li>
              <li><strong>Zigbee:</strong> Powers smart bulbs, door sensors, and thermostats with low-power mesh.</li>
              <li><strong>Bluetooth:</strong> Syncs his fitness tracker and wireless earbuds.</li>
              <li><strong>5G:</strong> His smartphone and tablet stay connected even when moving around the city.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              This ecosystem shows how different wireless technologies complement each other.
            </p>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Place <strong>Wi-Fi APs</strong> centrally and away from interference sources.</li>
                <li>Use <strong>5 GHz</strong> for high-speed, low-interference connections.</li>
                <li>For IoT, choose <strong>Zigbee or BLE</strong> for low power consumption.</li>
                <li>Implement <strong>WPA3</strong> for robust Wi-Fi security.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Using <strong>default passwords</strong> – easy for attackers.</li>
                <li>Placing APs <strong>near metal objects</strong> or microwaves.</li>
                <li>Overlooking <strong>interference</strong> from neighbouring networks.</li>
                <li>Not updating <strong>firmware</strong> – security and performance issues.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Wireless Network Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Site survey:</strong> Analyze coverage, interference, and user density.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose appropriate technology:</strong> Wi-Fi, cellular, Bluetooth, etc.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan AP placement:</strong> Optimize for even coverage and minimal overlap.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Secure the network:</strong> Use strong encryption (WPA3) and authentication.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Monitor performance:</strong> Track signal strength, throughput, and client count.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for growth:</strong> Add more APs as users increase.
              </li>
            </ul>
          </div>
        </section>

        {/* --- Hint Section --- */}
        <section
          className="animate-fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800"
          style={{ animationDelay: '800ms' }}
        >
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">
            🤔 Think About…
          </h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            Walk around your home or campus with your phone's Wi-Fi analyzer. Observe how signal
            strength changes near walls, windows, or appliances. This helps you understand real-world
            propagation and the impact of obstacles – a key consideration in wireless network design.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Wireless networking is often taken for granted, but it requires careful planning. Emphasise that wireless is a shared medium – more users mean less bandwidth for each. Also, highlight the security aspect: wireless is inherently more exposed, so encryption and authentication are non-negotiable. Hands-on with a Wi-Fi analyzer tool can be a great classroom activity."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Wireless Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic12;