import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic8_files/topic8_questions';

const Topic8 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
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
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up,
      .animate-pulse-glow,
      .animate-float,
      .animate-pulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  const panTechnologies = [
    {
      name: 'Bluetooth',
      icon: '🔵',
      range: 'Up to 10 meters (Class 2)',
      speed: '1-24 Mbps (Bluetooth 5.x)',
      use: 'Wireless headsets, keyboards, file sharing, IoT.',
    },
    {
      name: 'Bluetooth Low Energy (BLE)',
      icon: '🔋',
      range: 'Up to 100 meters',
      speed: '~1 Mbps',
      use: 'Wearables, health monitors, beacons, smart home sensors.',
    },
    {
      name: 'NFC (Near Field Communication)',
      icon: '📲',
      range: '~4 cm',
      speed: '~424 Kbps',
      use: 'Contactless payments, access cards, pairing devices.',
    },
    {
      name: 'Zigbee',
      icon: '🏠',
      range: '10-100 meters',
      speed: '20-250 Kbps',
      use: 'Smart home automation, industrial control, lighting.',
    },
    {
      name: 'IR (Infrared)',
      icon: '📟',
      range: 'Line-of-sight, up to a few meters',
      speed: '~4 Mbps',
      use: 'TV remotes, some wireless peripherals (legacy).',
    },
    {
      name: 'USB (Wired PAN)',
      icon: '🔌',
      range: 'Cable length (few meters)',
      speed: 'Up to 40 Gbps (USB4)',
      use: 'Connecting peripherals, charging, data transfer between devices.',
    },
  ];

  const useCases = [
    {
      title: 'Health & Fitness',
      desc: 'Smartwatches and fitness bands (e.g., Fitbit, Apple Watch) sync health data to your phone via Bluetooth. Students like Mamata can track their daily steps and sleep patterns.',
    },
    {
      title: 'Wireless Audio',
      desc: 'Bluetooth earbuds and headphones allow hands-free calls and music streaming. Mahima uses wireless earphones during her commute to listen to lectures.',
    },
    {
      title: 'Smart Home',
      desc: 'Zigbee and BLE sensors control lights, thermostats, and locks. Abhronila can remotely adjust her room\'s lighting using a smartphone app.',
    },
    {
      title: 'Contactless Payments',
      desc: 'NFC enables tap-to-pay (Google Pay, Apple Pay). A quick tap of the phone or card at a reader in a Kolkata café – secure and fast.',
    },
    {
      title: 'Data Transfer',
      desc: 'Sharing photos or files between two phones using Bluetooth or Wi-Fi Direct. Students can exchange project files without a cable.',
    },
    {
      title: 'IoT Edge Devices',
      desc: 'Low-power sensors (Zigbee) in agriculture or factories collect data and send it to a hub. Essential for monitoring and automation.',
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            Personal Area Network (PAN)
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Connecting your personal devices – the smallest, most intimate network
          </p>
        </section>

        {/* --- Introduction: What is a PAN? --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            What is a PAN?
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A <strong>Personal Area Network (PAN)</strong> is the smallest type of computer network,
              designed for communication among devices within the immediate vicinity of a single person.
              Typically, the range is <strong>up to 10 meters</strong> (about 33 feet), and it often uses
              wireless technologies like Bluetooth, NFC, or Zigbee, though wired options (like USB) are
              also common.
            </p>
            <p>
              Think of a PAN as your personal digital bubble. It connects the devices you carry or wear:
              smartphone, smartwatch, wireless earbuds, fitness tracker, laptop, and even your car's
              infotainment system. For students like <strong>Susmita</strong> in <strong>Jadavpur</strong>,
              a PAN lets her listen to podcasts on wireless earbuds while her phone stays in her bag.
            </p>
          </div>

          {/* SVG: PAN Ecosystem */}
          <div className="mt-6 flex justify-center">
            <svg
              width="500"
              height="280"
              viewBox="0 0 500 280"
              className="w-full max-w-lg h-auto"
              aria-label="Illustration of a PAN showing a person with connected devices: phone, smartwatch, earbuds, laptop"
            >
              <rect width="500" height="280" fill="transparent" />

              {/* Background circle (PAN range) */}
              <circle cx="250" cy="140" r="110" fill="#f59e0b" opacity="0.15" className="dark:opacity-25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6" />
              <text x="250" y="30" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">PAN Range (~10m)</text>

              {/* Central person (stick figure) */}
              <circle cx="250" cy="80" r="20" fill="#94a3b8" className="dark:fill-gray-500" />
              <line x1="250" y1="100" x2="250" y2="160" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-gray-500" />
              <line x1="250" y1="120" x2="220" y2="140" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-gray-500" />
              <line x1="250" y1="120" x2="280" y2="140" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-gray-500" />
              <line x1="250" y1="160" x2="230" y2="190" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-gray-500" />
              <line x1="250" y1="160" x2="270" y2="190" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-gray-500" />

              {/* Devices around */}
              {[
                { x: 380, y: 60, label: 'Phone', icon: '📱' },
                { x: 380, y: 190, label: 'Laptop', icon: '💻' },
                { x: 120, y: 60, label: 'Watch', icon: '⌚' },
                { x: 120, y: 190, label: 'Earbuds', icon: '🎧' },
                { x: 250, y: 230, label: 'Hub', icon: '🔄' },
              ].map((dev, i) => (
                <g key={i}>
                  <rect
                    x={dev.x}
                    y={dev.y}
                    width="50"
                    height="50"
                    rx="10"
                    fill="#64748b"
                    className="dark:fill-gray-600"
                  />
                  <text x={dev.x + 25} y={dev.y + 25} textAnchor="middle" fontSize="24">{dev.icon}</text>
                  <text x={dev.x + 25} y={dev.y + 45} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{dev.label}</text>
                  {/* Connection lines to person */}
                  <line
                    x1={dev.x + (dev.x < 250 ? 50 : 0)}
                    y1={dev.y + 25}
                    x2={250 + (dev.x < 250 ? -20 : 20)}
                    y2={140 + (dev.y < 140 ? -20 : 20)}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4"
                    className="dark:stroke-yellow-400"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;100" dur="2s" repeatCount="indefinite" />
                  </line>
                </g>
              ))}

              {/* Animated "data" packets between devices */}
              <circle r="5" fill="#f59e0b" className="dark:fill-yellow-400 animate-pulse">
                <animate attributeName="cx" values="120;250;120" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="85;140;85" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            A PAN connects devices within your personal space – usually wireless and low-power.
          </p>
        </section>

        {/* --- PAN Technologies --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            PAN Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {panTechnologies.map((tech, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {tech.name}
                  </h3>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><strong>Range:</strong> {tech.range}</li>
                  <li><strong>Speed:</strong> {tech.speed}</li>
                  <li><strong>Use:</strong> {tech.use}</li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- Real-world Use Cases --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Real-world Use Cases
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            {useCases.map((use, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <span className="text-xl mt-0.5">📌</span>
                <div>
                  <strong>{use.title}:</strong> {use.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Scenario: Student Life with PAN --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            PAN in Daily Student Life
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Consider a typical day for <strong>Debangshu</strong>, a student at <strong>Jadavpur University</strong>:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>He wakes up and his <strong>smartwatch</strong> (BLE) syncs sleep data to his phone.</li>
              <li>During his morning run, his <strong>wireless earbuds</strong> (Bluetooth) play his favorite playlist.</li>
              <li>At the university, he uses <strong>NFC</strong> to tap his phone for campus access.</li>
              <li>He shares lecture notes with a friend via <strong>Bluetooth</strong> file transfer.</li>
              <li>He controls his room's smart lights (<strong>Zigbee</strong>) from his phone before bed.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              All these interactions are powered by PAN technologies – seamless, low-power, and personal.
            </p>
          </div>
        </section>

        {/* --- Advantages and Disadvantages of PAN --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Advantages &amp; Disadvantages of PAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Advantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Convenience:</strong> Wireless, cordless – no messy cables.</li>
                <li><strong>Low power consumption:</strong> Ideal for battery-operated devices.</li>
                <li><strong>Easy setup:</strong> Typically plug-and-play or simple pairing.</li>
                <li><strong>Short range:</strong> Reduces interference and enhances security.</li>
                <li><strong>Cost-effective:</strong> Inexpensive hardware and implementation.</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-400">⚠️ Disadvantages</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li><strong>Limited range:</strong> Devices must be in close proximity.</li>
                <li><strong>Interference:</strong> Other wireless signals (Wi-Fi, microwave) can disrupt.</li>
                <li><strong>Security vulnerabilities:</strong> Pairing can be intercepted (Bluejacking, Bluesnarfing).</li>
                <li><strong>Data rate:</strong> Lower than wired networks – not suitable for heavy data.</li>
                <li><strong>Compatibility:</strong> Different versions may not be fully interoperable.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Keep devices within <strong>line of sight</strong> for best signal (especially for IR).</li>
                <li>Use <strong>Bluetooth 5.x</strong> for longer range and better speed.</li>
                <li>When pairing, ensure <strong>device visibility</strong> is temporary to prevent unauthorised connections.</li>
                <li>For IoT, use <strong>BLE or Zigbee</strong> for low-power, mesh-capable networks.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Leaving <strong>Bluetooth discoverable</strong> all the time – security risk.</li>
                <li>Using <strong>old Bluetooth versions</strong> that drain battery.</li>
                <li>Ignoring <strong>interference</strong> from other electronics (microwave, Wi-Fi).</li>
                <li>Assuming <strong>all PAN devices are compatible</strong> – check profiles and versions.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ PAN Setup Checklist
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Identify devices:</strong> List all devices you want in your PAN.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose technology:</strong> Select appropriate wireless or wired standards (Bluetooth, USB, etc.).
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Pair securely:</strong> Use PINs or confirm numeric codes during pairing.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Manage power:</strong> Turn off unused Bluetooth to save battery.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Update firmware:</strong> Keep device software up-to-date for security and performance.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test range:</strong> Verify the effective range in your environment.
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
            Observe the devices you carry or use daily. Which PAN technologies are involved?
            Try to identify the range, speed, and power consumption of each. Experiment by moving
            away from your Bluetooth device until it disconnects – that's the practical range.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "PAN is often overlooked because it's so personal and simple. Yet it's foundational for IoT and wearables. Emphasise the trade-offs: range vs. power, speed vs. battery. Also, security is critical – remind students that even personal networks can be compromised. Best practice: always use secure pairing and disable discoverability when not needed."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Personal Area Network (PAN) FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic8;