import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic6_files/topic6_questions';

const Topic6 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
      50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
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

  const applications = [
    {
      category: '🏢 Business & E-commerce',
      items: [
        'Online shopping (Amazon, Flipkart)',
        'Corporate websites and portals',
        'Supply chain management',
        'Customer relationship management (CRM)',
        'Enterprise resource planning (ERP)'
      ]
    },
    {
      category: '🎓 Education',
      items: [
        'Online learning platforms (Coursera, Khan Academy)',
        'Virtual classrooms (Zoom, Google Meet)',
        'Digital libraries and research databases',
        'Student information systems',
        'Collaborative research projects'
      ]
    },
    {
      category: '🏥 Healthcare',
      items: [
        'Electronic Health Records (EHR)',
        'Telemedicine consultations',
        'Medical imaging sharing (PACS)',
        'Patient monitoring systems',
        'Hospital management systems'
      ]
    },
    {
      category: '🏛️ Government & Public Services',
      items: [
        'E-governance portals',
        'Tax filing systems',
        'Public safety & emergency response',
        'Smart city infrastructure',
        'Voting systems and citizen services'
      ]
    },
    {
      category: '📱 Communication & Entertainment',
      items: [
        'Social media (Facebook, Instagram, Twitter)',
        'Streaming services (Netflix, YouTube)',
        'Voice and video calling (WhatsApp, Skype)',
        'Online gaming (multiplayer)',
        'Content delivery networks (CDN)'
      ]
    },
    {
      category: '🏭 Manufacturing & Industry',
      items: [
        'Industrial IoT (IIoT)',
        'Automated production lines',
        'Quality control systems',
        'Inventory and warehouse management',
        'Predictive maintenance'
      ]
    },
    {
      category: '🚗 Transportation & Logistics',
      items: [
        'GPS navigation and traffic management',
        'Fleet tracking systems',
        'Ride-sharing apps (Uber, Ola)',
        'Supply chain tracking (RFID)',
        'Autonomous vehicle communication'
      ]
    },
    {
      category: '🌐 Internet & Cloud Services',
      items: [
        'Web browsing and email',
        'Cloud storage (Google Drive, Dropbox)',
        'SaaS applications (Office 365)',
        'Content delivery (CDN)',
        'Domain Name System (DNS)'
      ]
    },
    {
      category: '🔬 Research & Science',
      items: [
        'Distributed computing (SETI@home)',
        'Data sharing between research institutions',
        'High-performance computing clusters',
        'Weather forecasting models',
        'Genomic data analysis'
      ]
    }
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            Applications of Computer Networks
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            How networks power the modern world – from education to healthcare, business to entertainment
          </p>
        </section>

        {/* --- Introduction: Networks Are Everywhere --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Networks: The Invisible Infrastructure
          </h2>
          <div className="prose dark:prose-invert max-w-none leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Computer networks are the backbone of nearly every aspect of modern life. From
              the moment you check your phone in the morning to streaming a movie at night,
              networks enable communication, commerce, and collaboration.
            </p>
            <p>
              For students like <strong>Debangshu</strong> and <strong>Mamata</strong> in
              <strong>Kolkata</strong>, networks mean online classes, sharing assignments, and
              connecting with friends. For professionals, they enable remote work, global
              teamwork, and instant access to information.
            </p>
            <p>
              This topic explores the diverse applications of networking across different
              sectors, showing how theoretical concepts translate into real-world value.
            </p>
          </div>

          {/* SVG: Network applications ecosystem */}
          <div className="mt-6 flex justify-center">
            <svg
              width="600"
              height="300"
              viewBox="0 0 600 300"
              className="w-full max-w-xl h-auto"
              aria-label="Illustration showing network applications across education, healthcare, business, government, and entertainment"
            >
              <rect width="600" height="300" fill="transparent" />

              {/* Central hub (Network) */}
              <circle cx="300" cy="150" r="50" fill="#6366f1" className="dark:fill-indigo-400" />
              <text x="300" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Network</text>
              <text x="300" y="162" textAnchor="middle" fill="white" fontSize="10">The Backbone</text>

              {/* Outer application nodes */}
              {[
                { x: 80, y: 60, label: 'Education', icon: '🎓', color: '#3b82f6' },
                { x: 280, y: 30, label: 'Healthcare', icon: '🏥', color: '#ef4444' },
                { x: 480, y: 60, label: 'Business', icon: '🏢', color: '#f59e0b' },
                { x: 520, y: 200, label: 'Govt.', icon: '🏛️', color: '#10b981' },
                { x: 300, y: 260, label: 'Entertainment', icon: '🎬', color: '#ec4899' },
                { x: 80, y: 220, label: 'Science', icon: '🔬', color: '#8b5cf6' }
              ].map((node, idx) => (
                <g key={idx}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="35"
                    fill={node.color}
                    className="opacity-80 dark:opacity-90"
                  >
                    <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                  </circle>
                  <text x={node.x} y={node.y - 5} textAnchor="middle" fill="white" fontSize="20">{node.icon}</text>
                  <text x={node.x} y={node.y + 20} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{node.label}</text>
                  {/* Connection lines to central hub */}
                  <line
                    x1={node.x + (node.x < 300 ? 35 : -35)}
                    y1={node.y + (node.y < 150 ? 35 : -35)}
                    x2={300 + (node.x < 300 ? -50 : 50) * 0.5}
                    y2={150 + (node.y < 150 ? -50 : 50) * 0.5}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4"
                    className="dark:stroke-gray-500"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" repeatCount="indefinite" />
                  </line>
                </g>
              ))}
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Networks connect every sector – from education to entertainment.
          </p>
        </section>

        {/* --- Detailed Applications by Category --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Applications by Sector
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {applications.map((appGroup, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {appGroup.category.split(' ')[0]}
                  </span>
                  {appGroup.category}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
                  {appGroup.items.map((item, i) => (
                    <li key={i} className="leading-relaxed hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- In-depth: Impact on Education --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Spotlight: Education
          </h2>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Networking has revolutionised education. Students and teachers can:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Access global knowledge:</strong> Online courses, digital libraries, and research databases are available anywhere.</li>
              <li><strong>Collaborate remotely:</strong> Virtual classrooms, shared documents, and group projects across cities.</li>
              <li><strong>Receive personalised learning:</strong> Adaptive platforms use networking to deliver customised content.</li>
              <li><strong>Engage interactively:</strong> Polls, quizzes, and simulations enhance participation.</li>
              <li><strong>Track progress:</strong> Learning management systems (LMS) provide real-time feedback.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              In <strong>Ichapur</strong>, a student like <strong>Abhronila</strong> can attend
              a lecture from <strong>Jadavpur University</strong> and collaborate on projects with
              peers globally – all thanks to networking.
            </p>
          </div>
        </section>

        {/* --- In-depth: Healthcare Applications --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Spotlight: Healthcare
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Networks in healthcare save lives by enabling:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Telemedicine:</strong> Doctors can consult patients remotely, improving access in rural areas.</li>
              <li><strong>Electronic Health Records (EHR):</strong> Patient history is available instantly to any authorised provider.</li>
              <li><strong>Medical imaging:</strong> X-rays, MRIs, and CT scans are shared for second opinions.</li>
              <li><strong>Remote monitoring:</strong> Wearable devices send patient vitals to healthcare teams.</li>
              <li><strong>Research collaboration:</strong> Global teams work on cures and treatments.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              A hospital in <strong>Kolkata</strong> can consult specialists in <strong>London</strong>
              in real-time – networking bridges continents.
            </p>
          </div>
        </section>

        {/* --- In-depth: Business & E-commerce --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Spotlight: Business & E-commerce
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Networks power the global economy:
            </p>
            <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li><strong>Online shopping:</strong> E-commerce platforms connect buyers and sellers worldwide.</li>
              <li><strong>Payment processing:</strong> Secure transactions are routed across networks.</li>
              <li><strong>Supply chain:</strong> Inventory, shipping, and logistics are synchronised in real time.</li>
              <li><strong>Customer support:</strong> Chatbots and help desks are networked for efficiency.</li>
              <li><strong>Data analytics:</strong> Businesses glean insights from networked data sources.</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Mahima</strong> can order a book from a store in <strong>Barrackpore</strong>
              and have it delivered to <strong>Jadavpur</strong> – networking makes it possible.
            </p>
          </div>
        </section>

        {/* --- Tips & Common Mistakes --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '600ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Tips &amp; Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">💡 Professional Tips</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>When building an application, <strong>consider network constraints</strong> (bandwidth, latency).</li>
                <li>Design for <strong>offline-first</strong> when connectivity is intermittent.</li>
                <li>Use <strong>Content Delivery Networks (CDN)</strong> to speed up global access.</li>
                <li><strong>Monitor application performance</strong> to detect network-related issues early.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">🚫 Common Mistakes</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                <li>Assuming <strong>unlimited bandwidth</strong> – networks have limits.</li>
                <li>Ignoring <strong>security</strong> when transmitting sensitive data.</li>
                <li>Not <strong>testing</strong> applications on different network conditions.</li>
                <li>Overlooking <strong>user experience</strong> during network latency.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Best Practices & Checklist --- */}
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: '700ms' }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            Best Practices &amp; Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ✅ Checklist for Building Network-Enabled Applications
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Analyse requirements:</strong> Understand user needs and network constraints.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Choose appropriate protocols:</strong> TCP, UDP, HTTP, WebSockets, etc.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Implement security:</strong> HTTPS, encryption, authentication.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Optimise for performance:</strong> Caching, compression, efficient data formats.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Test across network conditions:</strong> Simulate slow, unreliable networks.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <strong>Plan for scalability:</strong> Load balancing, distributed architecture.
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
            Choose one application you use daily (e.g., streaming, online shopping, or social media).
            Map out the network interactions involved – how does your device communicate with servers?
            What protocols might be used? This exercise connects theory to your daily experience.
          </p>
        </section>

        {/* --- Teacher's Note --- */}
        <Teacher
          note={
            "Networking is not an abstract concept – it's embedded in everything. Encourage students to see networks in action. Ask them to list all the applications they use and identify how each depends on networking. This contextual learning makes the subject relatable and memorable."
          }
        />

        {/* --- FAQ Section --- */}
        <FAQTemplate title="Applications of Computer Networks FAQs" questions={questions} />

      </div>
    </div>
  );
};

export default Topic6;