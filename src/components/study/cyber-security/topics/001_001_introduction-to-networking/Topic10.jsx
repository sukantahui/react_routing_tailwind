import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic10_files/topic10_questions';

const Topic10 = () => {
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

  const manCharacteristics = [
    'Covers a city or metropolitan area (up to 50 km)',
    'Moderate to high speed (typically 1-10 Gbps)',
    'Often uses fiber optic cables or microwave links',
    'May be owned by a city, government, or consortium',
    'Connects multiple LANs within the city',
    'Provides backbone for internet service providers (ISPs)',
  ];

  const manTechnologies = [
    {
      icon: '🔮',
      name: 'Metro Ethernet',
      desc: 'Uses Ethernet technology over fiber optics to connect LANs across a city. Provides high bandwidth and scalability.',
    },
    {
      icon: '📡',
      name: 'Microwave Links',
      desc: 'Point-to-point wireless connections using high-frequency radio waves. Used where fiber is not feasible.',
    },
    {
      icon: '🔲',
      name: 'DWDM (Dense Wavelength Division Multiplexing)',
      desc: 'Sends multiple data streams over a single fiber using different wavelengths (colors) of light.',
    },
    {
      icon: '🌐',
      name: 'MPLS (Multiprotocol Label Switching)',
      desc: 'A switching mechanism that forwards data based on labels, improving speed and traffic management.',
    },
    {
      icon: '📶',
      name: 'WiMAX (IEEE 802.16)',
      desc: 'A wireless MAN technology providing broadband access over large areas (up to 50 km).',
    },
  ];

  const manUseCases = [
    {
      title: 'Connecting Government Offices',
      desc: 'A city government uses a MAN to connect municipal buildings, schools, libraries, and police stations for shared services and data.',
    },
    {
      title: 'ISP Backbone',
      desc: 'Internet Service Providers use MANs to aggregate traffic from multiple neighborhoods and connect to core networks.',
    },
    {
      title: 'University Campus',
      desc: 'A large university spread across a city connects its campuses using a MAN for high-speed research collaboration.',
    },
    {
      title: 'Smart City Infrastructure',
      desc: 'Traffic signals, surveillance cameras, and environmental sensors communicate over a MAN for real-time city management.',
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Metropolitan Area Network (MAN)
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Connecting a city – the backbone of urban digital infrastructure
          </p>
        </section>

        {/* --- Introduction: What is a MAN? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            What is a MAN?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>Metropolitan Area Network (MAN)</strong> is a network that spans a city or
              metropolitan area, typically ranging from a few kilometers to up to 50 km. It connects
              multiple LANs within the city, providing high-speed backbone connectivity for
              organisations, government agencies, and ISPs.
            </p>
            <p>
              MANs are larger than LANs but smaller than WANs. They often use technologies like
              <strong>fiber optics</strong> and <strong>microwave links</strong> to achieve high
              speeds and reliability. A MAN is the infrastructure that enables smart city services,
              city-wide internet access, and inter-office connectivity.
            </p>
            <p>
              In <strong>Kolkata</strong>, a MAN might connect government offices, schools, hospitals,
              and libraries across the city, allowing citizens to access public services seamlessly.
              Students like <strong>Abhronila</strong> in <strong>Ichapur</strong> could benefit from
              a city-wide educational network provided by such a MAN.
            </p>
          </div>

          {/* SVG: MAN Topology */}
          <div className="mt-6 flex justify-center">
            <svg
              width="650"
              height="320"
              viewBox="0 0 650 320"
              className="w-full max-w-2xl h-auto"
              aria-label="Illustration of a MAN showing city landmarks connected via fiber/backbone"
            >
              <rect width="650" height="320" fill="transparent" />

              {/* Background city silhouette */}
              <rect x="0" y="180" width="650" height="140" fill="#1e293b" opacity="0.1" className="dark:opacity-20" rx="4" />
              <text x="325" y="310" textAnchor="middle" fill="#94a3b8" fontSize="12">City of Kolkata</text>

              {/* MAN backbone ring (fiber) */}
              <ellipse cx="325" cy="160" rx="250" ry="100" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="10 5" className="dark:stroke-violet-400" />

              {/* Central MAN hub */}
              <rect x="280" y="130" width="90" height="60" rx="8" fill="#8b5cf6" className="dark:fill-violet-400" />
              <text x="325" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">MAN Hub</text>
              <text x="325" y="175" textAnchor="middle" fill="white" fontSize="10">(Fiber Ring)</text>

              {/* City nodes (LANs) connected to ring */}
              {[
                { x: 60, y: 80, label: 'Govt Office' },
                { x: 60, y: 230, label: 'Hospital' },
                { x: 325, y: 50, label: 'ISP' },
                { x: 590, y: 80, label: 'University' },
                { x: 590, y: 230, label: 'Library' },
              ].map((node, idx) => (
                <g key={idx}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width="80"
                    height="40"
                    rx="6"
                    fill="#3b82f6"
                    className="dark:fill-blue-400"
                  />
                  <text
                    x={node.x + 40}
                    y={node.y + 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                  {/* Connection to backbone ring (closest point) */}
                  <line
                    x1={node.x + 40}
                    y1={node.y + 40}
                    x2={node.x + 40}
                    y2={node.y + 80}
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    className="dark:stroke-violet-400 animate-dash"
                  />
                </g>
              ))}

              {/* Animated data packets on ring */}
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="325;575;325;75;325" dur="6s" repeatCount="indefinite" />
                <animate attributeName="cy" values="60;60;260;260;60" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400">
                <animate attributeName="cx" values="325;75;325;575;325" dur="6s" repeatCount="indefinite" begin="3s" />
                <animate attributeName="cy" values="260;260;60;60;260" dur="6s" repeatCount="indefinite" begin="3s" />
              </circle>

              {/* Labels */}
              <text x="325" y="295" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold" className="dark:text-violet-300">
                ➔ MAN connects LANs across a city using high-speed fiber/backbone
              </text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            A MAN typically uses a fiber optic ring to connect multiple LANs throughout a city.
          </p>
        </section>

        {/* --- Key Characteristics --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Key Characteristics of a MAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {manCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-violet-500 dark:text-violet-400">✅</span>
                <span className="text-gray-700 dark:text-gray-300">{char}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- MAN Technologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Technologies Used in MANs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {manTechnologies.map((tech, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </span>
                  <h3 className="font-semibold text-violet-600 dark:text-violet-400">
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
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            MAN in the Real World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manUseCases.map((use, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                  <span>🏙️</span> {use.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {use.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- MAN vs LAN vs WAN Comparison --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            MAN vs LAN vs WAN
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
                  <td className="px-4 py-2 font-semibold">Range</td>
                  <td className="px-4 py-2">Up to ~1 km</td>
                  <td className="px-4 py-2">Up to ~50 km</td>
                  <td className="px-4 py-2">100+ km</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Speed</td>
                  <td className="px-4 py-2">100 Mbps – 10 Gbps</td>
                  <td className="px-4 py-2">1 – 10 Gbps</td>
                  <td className="px-4 py-2">1 – 100 Mbps</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Ownership</td>
                  <td className="px-4 py-2">Single organisation</td>
                  <td className="px-4 py-2">City/Government/Consortium</td>
                  <td className="px-4 py-2">Multiple ISPs/Public</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Technology</td>
                  <td className="px-4 py-2">Ethernet, Wi-Fi</td>
                  <td className="px-4 py-2">Fiber, Microwave, DWDM</td>
                  <td className="px-4 py-2">Leased lines, Satellite, Fiber</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Advantages and Disadvantages of MAN --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of MAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>High speed:</strong> Gigabit speeds across the city.</li>
                <li><strong>Scalability:</strong> Easy to add new sites.</li>
                <li><strong>Centralised management:</strong> Single backbone to monitor.</li>
                <li><strong>Supports multiple services:</strong> Internet, VoIP, video, IoT.</li>
                <li><strong>Cost-effective:</strong> For city-wide connectivity, cheaper than multiple WAN links.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>High installation cost:</strong> Fiber deployment is expensive.</li>
                <li><strong>Regulatory issues:</strong> Right-of-way permits, local regulations.</li>
                <li><strong>Maintenance:</strong> Fiber cuts or equipment failures affect many users.</li>
                <li><strong>Security:</strong> Exposure to physical and cyber threats.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Use <strong>redundant fiber rings</strong> to prevent single points of failure.</li>
                <li>Consider <strong>DWDM</strong> for maximum capacity from existing fiber.</li>
                <li>Plan for <strong>future growth</strong> – leave dark fiber for expansion.</li>
                <li>Implement <strong>QoS</strong> to prioritise critical city services.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Underestimating <strong>permitting and construction</strong> timelines.</li>
                <li>Not having <strong>diverse routing</strong> – if one cable is cut, backup path needed.</li>
                <li>Overlooking <strong>power backup</strong> – network equipment needs UPS/generators.</li>
                <li>Failing to <strong>monitor</strong> the network proactively.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '800ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-violet-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ MAN Deployment Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Conduct a feasibility study:</strong> Assess demand, geography, and cost.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Design redundant topology:</strong> Ring or mesh for fault tolerance.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Select appropriate technology:</strong> Metro Ethernet, DWDM, microwave.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Obtain necessary permits:</strong> Right-of-way, local government approvals.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement security:</strong> Encrypt data and secure physical infrastructure.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Deploy monitoring:</strong> SNMP, performance metrics, and alarm systems.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for maintenance:</strong> Regular inspections and upgrades.
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
            Consider the city you live in. What public services could benefit from a MAN?
            How would a city-wide network improve daily life? Also, think about the challenges
            of deploying fiber optics through existing streets and buildings – this is a major
            undertaking for any municipality.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "MANs are often overlooked in introductory courses, but they are critical for smart cities and modern infrastructure. Emphasise the economic and social impact: a MAN can bridge the digital divide, enable telemedicine, and improve government services. Encourage students to research real-world MANs in their own cities or regions."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Metropolitan Area Network (MAN) FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic10;