import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic17: Comparison of Transmission Media
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide comparing guided and unguided transmission media.
 * 
 * @purpose
 * Provide a side-by-side comparison of all transmission media (twisted pair, coaxial, fiber, radio, microwave, infrared, satellite)
 * based on cost, speed, bandwidth, noise immunity, installation, security, and typical applications.
 * 
 * @usage
 * Used in networking courses after covering individual media types, to help students choose the right medium for a given scenario.
 */

const Topic17 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What are the two main categories of transmission media?",
      a: "Guided media (wired: twisted pair, coaxial cable, optical fiber) and unguided media (wireless: radio waves, microwaves, infrared, satellite)."
    },
    {
      q: "Which transmission medium offers the highest bandwidth?",
      a: "Optical fiber, especially single-mode fiber with DWDM, can achieve tens of terabits per second. It far exceeds any wireless or copper medium."
    },
    {
      q: "Which medium is most susceptible to electromagnetic interference (EMI)?",
      a: "Unshielded twisted pair (UTP) is highly susceptible. Coaxial cable is better shielded, and fiber optic cable is completely immune to EMI because it uses light."
    },
    {
      q: "What is the most cost-effective medium for short-distance LANs?",
      a: "Unshielded twisted pair (UTP) Cat5e/Cat6 – cheap, easy to install, and sufficient for up to 1 Gbps/100m."
    },
    {
      q: "Which wireless medium has the longest range without repeaters?",
      a: "Satellite communication (GEO) can cover intercontinental distances. Terrestrially, radio waves (low frequency) can travel hundreds of km via skywave."
    },
    {
      q: "Why is fiber optic cable preferred for long-distance backbone networks?",
      a: "Very low attenuation (0.2–0.5 dB/km), extremely high bandwidth, immunity to EMI, and no grounding issues. Repeater spacing can be 100+ km."
    },
    {
      q: "What is the main advantage of wireless over wired media?",
      a: "Mobility – devices can connect without physical cables. Also, easier and cheaper to deploy in difficult terrain (rivers, mountains, historical sites)."
    },
    {
      q: "Which medium has the highest security?",
      a: "Fiber optic cable – tapping requires physical access and special equipment; any break is easily detected. Wired (especially fiber) is more secure than wireless (signals can be intercepted over the air)."
    },
    {
      q: "Compare the installation difficulty of UTP vs fiber.",
      a: "UTP is easy – flexible, cheap connectors (RJ45), can be terminated on-site. Fiber is more difficult – requires careful handling, expensive termination tools (fusion splicer), and attention to bend radius."
    },
    {
      q: "What is the typical maximum distance for UTP (Ethernet) without a repeater?",
      a: "100 meters (328 feet) for 10/100/1000BASE-T. Beyond that, signal quality degrades due to attenuation and crosstalk."
    },
    {
      q: "Which medium is best for connecting two buildings across a busy road?",
      a: "Wireless microwave or fiber (if trenching is allowed). Microwave is often cheaper if no digging permit is available. Fiber offers higher bandwidth and security."
    },
    {
      q: "Why is coaxial cable still used despite fiber being superior?",
      a: "Coaxial is used in cable TV (DOCSIS) broadband because it's already installed in many homes. It also has better shielding than UTP and supports longer distances (500m for thicknet)."
    },
    {
      q: "Compare the noise immunity of STP vs UTP.",
      a: "STP (Shielded Twisted Pair) has a foil/braid shield that reduces EMI, making it suitable for industrial environments. UTP has no shield and is more susceptible to crosstalk and external interference."
    },
    {
      q: "What is the most power-efficient transmission medium?",
      a: "Fiber optic cable – very low signal loss means less amplification needed. Wireless (especially satellite) requires high transmit power (watts) due to path loss."
    },
    {
      q: "Which medium is most affected by weather?",
      a: "Wireless media – microwave and satellite suffer from rain fade; radio waves can be affected by atmospheric conditions. Fiber and copper are unaffected by weather (except physical damage)."
    }
  ];

  // Data for comparison table
  const comparisonData = [
    { medium: "UTP", type: "Guided", cost: "Very Low", speed: "10 Mbps – 10 Gbps", distance: "100 m", noise: "Poor (no shielding)", install: "Easy", security: "Moderate", bestFor: "LAN, office wiring" },
    { medium: "STP", type: "Guided", cost: "Low", speed: "10 Mbps – 10 Gbps", distance: "100 m", noise: "Good (shielded)", install: "Moderate", security: "Moderate", bestFor: "Industrial, high-EMI areas" },
    { medium: "Coaxial", type: "Guided", cost: "Moderate", speed: "10 Mbps – 10 Gbps", distance: "500 m", noise: "Good (braided shield)", install: "Moderate", security: "Moderate", bestFor: "Cable TV, broadband" },
    { medium: "Fiber (MM)", type: "Guided", cost: "High", speed: "100 Mbps – 100 Gbps", distance: "550 m – 2 km", noise: "Excellent (immune)", install: "Difficult", security: "Very High", bestFor: "Backbone, data centers" },
    { medium: "Fiber (SM)", type: "Guided", cost: "Very High", speed: "1 Gbps – 1 Tbps+", distance: "10–100 km+", noise: "Excellent", install: "Very Difficult", security: "Very High", bestFor: "Long-haul, ISP backbones" },
    { medium: "Radio", type: "Unguided", cost: "Low", speed: "1–1000+ Mbps", distance: "100 m – 100 km", noise: "Poor (interference)", install: "Easy", security: "Low", bestFor: "Wi-Fi, broadcasting, IoT" },
    { medium: "Microwave", type: "Unguided", cost: "Moderate", speed: "100 Mbps – 10 Gbps", distance: "10–50 km (LOS)", noise: "Moderate", install: "Moderate", security: "Low", bestFor: "Point-to-point backhaul" },
    { medium: "Satellite", type: "Unguided", cost: "Very High", speed: "10–1000 Mbps", distance: "Global", noise: "Poor (rain fade)", install: "Easy (dish)", security: "Low", bestFor: "Remote area, broadcasting" },
    { medium: "Infrared", type: "Unguided", cost: "Very Low", speed: "1–4 Mbps", distance: "1–10 m (LOS)", noise: "Fair (sunlight)", install: "Very Easy", security: "High (room-bound)", bestFor: "Remote controls, short-range" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans leading-relaxed">
      {/* Inline keyframes for reveal animations */}
      <style>{`
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="animate-fade-up space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent">
            Comparison of Transmission Media
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-slate-500 pl-4">
            Choosing the right medium for the right job – wired vs wireless, cost vs performance.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            No single transmission medium is perfect for every scenario. UTP is cheap but susceptible to noise; 
            fiber is fast but expensive; wireless offers mobility but less security. This topic provides a 
            systematic comparison to help you make informed decisions in network design, whether you're wiring 
            an office, connecting cities, or providing rural internet access.
          </p>
        </div>

        {/* SVG Illustration: Comparison Radar (Conceptual) */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📊 Media Selection Criteria</h2>
          <div className="flex justify-center">
            <svg width="100%" height="220" viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="800" height="220" fill="none" />
              {/* Five criteria as axes */}
              <line x1="100" y1="180" x2="700" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="400" y1="180" x2="400" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="400" y="20" textAnchor="middle" fontSize="12" fill="#475569">Cost</text>
              <text x="710" y="185" fontSize="12" fill="#475569">Bandwidth →</text>
              <text x="400" y="195" textAnchor="middle" fontSize="12" fill="#475569">Distance →</text>
              {/* Sample points - fiber high cost high performance */}
              <circle cx="600" cy="60" r="8" fill="#10b981" />
              <text x="610" y="55" fontSize="10" fill="#10b981">Fiber</text>
              {/* UTP low cost moderate */}
              <circle cx="200" cy="150" r="8" fill="#f59e0b" />
              <text x="210" y="155" fontSize="10" fill="#f59e0b">UTP</text>
              {/* Wireless moderate */}
              <circle cx="350" cy="120" r="8" fill="#3b82f6" />
              <text x="360" y="125" fontSize="10" fill="#3b82f6">Wireless</text>
              {/* Coax */}
              <circle cx="450" cy="130" r="8" fill="#ef4444" />
              <text x="460" y="135" fontSize="10" fill="#ef4444">Coax</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Trade-offs: Fiber = highest cost & performance | UTP = low cost, limited distance | Wireless = mobility, lower security
          </p>
        </div>

        {/* Main Comparison Table (scrollable on mobile) */}
        <div className="animate-fade-up overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left font-semibold">Medium</th>
                <th className="p-3 text-left font-semibold">Type</th>
                <th className="p-3 text-left font-semibold">Cost</th>
                <th className="p-3 text-left font-semibold">Speed</th>
                <th className="p-3 text-left font-semibold">Max Distance</th>
                <th className="p-3 text-left font-semibold">Noise Immunity</th>
                <th className="p-3 text-left font-semibold">Installation</th>
                <th className="p-3 text-left font-semibold">Security</th>
                <th className="p-3 text-left font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">{row.medium}</td>
                  <td className="p-3">{row.type}</td>
                  <td className="p-3">{row.cost}</td>
                  <td className="p-3">{row.speed}</td>
                  <td className="p-3">{row.distance}</td>
                  <td className="p-3">{row.noise}</td>
                  <td className="p-3">{row.install}</td>
                  <td className="p-3">{row.security}</td>
                  <td className="p-3">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guided vs Unguided Summary Cards */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🔌 Guided Media (Wired)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Advantages:</strong> Higher security, lower error rates, consistent performance, not affected by weather.</li>
              <li><strong>Disadvantages:</strong> Fixed infrastructure, limited mobility, installation cost (trenching, cabling).</li>
              <li><strong>Best for:</strong> Enterprise LANs, data centers, backbone networks, industrial control.</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-5 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">📡 Unguided Media (Wireless)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Advantages:</strong> Mobility, easy deployment in difficult terrain, no physical cabling, scalable.</li>
              <li><strong>Disadvantages:</strong> Lower security (signal interception), interference, weather sensitivity, shared bandwidth.</li>
              <li><strong>Best for:</strong> Mobile devices, remote areas, temporary events, IoT, broadcasting.</li>
            </ul>
          </div>
        </div>

        {/* Decision Framework: When to use what */}
        <div className="animate-fade-up bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold">🤔 Decision Framework: Choosing the Right Medium</h3>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Scenario 1: Office LAN (100 users)</span>
              <p className="mt-1">✅ <strong>UTP Cat6</strong> – cheap, sufficient for 1 Gbps, easy to terminate.<br />
              ❌ Fiber is overkill and expensive. Wireless would be congested.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Scenario 2: Connect two buildings across a river</span>
              <p className="mt-1">✅ <strong>Microwave link</strong> – no trenching, fast deployment.<br />
              ✅ <strong>Fiber</strong> – if you can get permits, offers higher bandwidth.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Scenario 3: Rural internet for 50 homes</span>
              <p className="mt-1">✅ <strong>Fixed wireless (radio)</strong> or <strong>LEO satellite (Starlink)</strong> – cost-effective.<br />
              ❌ Fiber would be too expensive to deploy.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Scenario 4: Data center spine-leaf architecture</span>
              <p className="mt-1">✅ <strong>Multimode fiber (OM4/OM5)</strong> – high speed, low latency, immune to noise.</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Media Selection)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Future-proof with fiber</strong> – even if you only need 1 Gbps today, fiber can scale to 100 Gbps+ with new optics.</li>
              <li><strong>Use shielded cabling</strong> (STP, coaxial) in industrial areas with motors, welders, or high EMI.</li>
              <li><strong>For temporary events</strong> (concerts, conventions), wireless is much faster to deploy than cabling.</li>
              <li><strong>Hybrid approaches</strong> – fiber backbone + wireless last mile + UTP inside buildings.</li>
              <li><strong>Always budget for installation</strong> – fiber is cheap per meter but termination and testing are expensive.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Choosing wireless when wired is feasible – wireless is less reliable and less secure.</li>
              <li>Overspending on fiber for short runs (under 100m) where Cat6a would suffice.</li>
              <li>Using UTP in high-EMI environments (factories) – causes constant errors and retransmissions.</li>
              <li>Forgetting about cable bend radius for fiber – tight bends cause micro-cracks and loss.</li>
              <li>Assuming all wireless is the same – satellite, microwave, and Wi-Fi have vastly different characteristics.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Media Selection</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Perform a site survey – identify obstacles, EMI sources, distance, and existing infrastructure.</li>
            <li>Calculate total cost of ownership (TCO) – not just cable cost, but installation, maintenance, and upgrades.</li>
            <li>For critical links, use redundant media (e.g., fiber primary + wireless backup).</li>
            <li>Follow standards (TIA/EIA for cabling, IEEE for wireless) to ensure interoperability.</li>
            <li>Document your choice with reasoning – helps future upgrades and troubleshooting.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Compare guided vs unguided (3 differences each)</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify the fastest, longest-distance medium</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain when to use fiber vs UTP vs wireless</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ List security implications of each medium</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Apply decision framework to real scenarios</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"This is the 'capstone' of the media topics. Students should be able to defend a media choice for a given scenario. Use real examples: 'You need to connect two school buildings 300m apart across a playground – what do you choose?' (Fiber or wireless? Discuss pros/cons). Also emphasize that no medium is universally best – trade-offs always exist. For exams, expect comparison tables and scenario-based questions. Encourage students to memorize key parameters: distance limits, noise immunity, and typical applications."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Comparison of Media</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-slate-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">🔧 Next: Cost vs Performance (Topic 18).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          📊 Topic 17: Comparison of Transmission Media — Next: Cost vs Performance (Topic 18)
        </div>
      </div>
    </div>
  );
};

export default Topic17;