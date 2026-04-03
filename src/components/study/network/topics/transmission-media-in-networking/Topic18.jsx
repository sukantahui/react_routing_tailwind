import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic18: Cost vs Performance
 * 
 * @component
 * @returns {JSX.Element} A detailed, animated guide to cost-performance trade-offs in transmission media.
 * 
 * @purpose
 * Analyze the relationship between cost and performance metrics (bandwidth, distance, reliability)
 * for different media, introduce Total Cost of Ownership (TCO), and provide real-world budgeting guidance.
 * 
 * @usage
 * Used in networking courses after comparing media, to help students make economically sound decisions
 * in network design.
 */

const Topic18 = () => {
  // Q&A bank for the topic
  const qaList = [
    {
      q: "What is Total Cost of Ownership (TCO) in networking?",
      a: "TCO includes all costs over the lifetime of a network: initial purchase (cables, connectors, switches), installation (labor, trenching), maintenance (repairs, upgrades), and operational costs (power, cooling)."
    },
    {
      q: "Why is fiber optic cable more expensive to install than UTP?",
      a: "Fiber requires specialized termination tools (fusion splicer, cleaver), skilled technicians, and more expensive connectors (LC/SC vs RJ45). Also, bend radius limitations require careful handling."
    },
    {
      q: "When is it worth paying more for a higher-performance medium?",
      a: "When future bandwidth needs are uncertain (future-proofing), when uptime is critical (fiber's noise immunity), or when distance exceeds copper limits (fiber's 40km+ reach)."
    },
    {
      q: "What is the cost per meter for different media (approximate)?",
      a: "UTP Cat6: $0.10-0.30/m, Coaxial: $0.20-0.50/m, Multimode fiber: $0.50-1.00/m, Single-mode fiber: $1.00-2.00/m (cable only). Installation adds 2-5x."
    },
    {
      q: "How does wireless compare to wired in terms of TCO for a campus?",
      a: "Wireless has lower initial cost (no cabling) but higher long-term operational costs (troubleshooting interference, security updates, device replacements). For high-density, wired is cheaper long-term."
    },
    {
      q: "What is the 'sweet spot' for UTP in terms of cost vs performance?",
      a: "Cat6 UTP offers 1 Gbps to 100m at very low cost. For most office LANs, it's the best value. Cat6a (10 Gbps) costs 2-3x more and is rarely needed for desktops."
    },
    {
      q: "Why do data centers use multimode fiber (OM4) instead of single-mode?",
      a: "Multimode optics (SR) are cheaper than single-mode (LR). For distances under 550m, OM4 with 100G-SR4 is cost-effective. Single-mode is for longer runs."
    },
    {
      q: "What hidden costs are often forgotten when budgeting for cabling?",
      a: "Cable trays, conduits, fire-stopping, grounding, testing/certification (Fluke tester rental), spare cables, and future maintenance access."
    },
    {
      q: "How does the cost of satellite communication compare to terrestrial fiber?",
      a: "Satellite has very high upfront cost (launch: $50M+) but low per-user cost for broadcasting. For point-to-point, fiber is cheaper over land, satellite is cheaper over oceans."
    },
    {
      q: "What is the cost-performance trade-off for shielded vs unshielded twisted pair?",
      a: "STP costs 30-50% more than UTP and requires proper grounding. It's only worth it in high-EMI environments (factories, near power lines). Otherwise, UTP is better value."
    },
    {
      q: "How does the cost of upgrading existing cabling compare to new installation?",
      a: "Upgrading can be cheaper if conduits and pathways exist. Replacing cable costs similar to new install, but you save on pathway construction. Often, reusing old cable with new electronics (e.g., 2.5GBASE-T over Cat5e) is best."
    },
    {
      q: "What is the cheapest way to connect two buildings 500m apart?",
      a: "Point-to-point wireless (60 GHz or 5 GHz) – no trenching, no permits. Fiber would require excavation or aerial stringing, costing 10-20x more."
    },
    {
      q: "Why is active optical cable (AOC) more expensive than passive copper for short runs?",
      a: "AOC has embedded transceivers (SFP modules) and requires power. For runs under 5m, passive copper (DAC) is much cheaper and sufficient."
    },
    {
      q: "What is the ROI (Return on Investment) of using higher-quality cable?",
      a: "Higher-quality cable reduces failure rates and rework. For critical links, the extra 20% cost can prevent a 1-hour outage costing $100k+. So ROI is infinite if it prevents one outage."
    },
    {
      q: "How does labor cost compare to material cost in cabling projects?",
      a: "Labor is typically 50-80% of total project cost. Skilled fiber splicing costs $100-200/hour. Material cost is often the smaller part."
    }
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
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
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

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="animate-fade-up space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 dark:from-amber-500 dark:to-yellow-500 bg-clip-text text-transparent">
            Cost vs Performance
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 border-l-4 border-amber-500 pl-4">
            Balancing the budget and the bandwidth – engineering economics.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Fiber is fast, but can you afford it? UTP is cheap, but will it meet future needs? Network design 
            isn't just about technical specs – it's about making smart economic decisions. This topic explores 
            the trade-offs between upfront costs, ongoing expenses, and performance metrics, helping you 
            choose the most cost-effective solution for any scenario.
          </p>
        </div>

        {/* SVG Illustration: Cost vs Performance Curve */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📈 The Cost-Performance Frontier</h2>
          <div className="flex justify-center overflow-x-auto">
            <svg width="100%" height="260" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <rect width="800" height="260" fill="none" />
              
              {/* Axes */}
              <line x1="80" y1="200" x2="750" y2="200" stroke="#475569" strokeWidth="2" marker-end="url(#arrowRight)" />
              <line x1="80" y1="200" x2="80" y2="30" stroke="#475569" strokeWidth="2" marker-end="url(#arrowUp)" />
              <text x="400" y="230" textAnchor="middle" fontSize="14" fill="#475569">Performance (Bandwidth, Distance, Reliability) →</text>
              <text x="30" y="120" textAnchor="middle" fontSize="14" fill="#475569" transform="rotate(-90, 30, 120)">Cost →</text>
              
              {/* Curve - diminishing returns */}
              <path d="M 120 190 Q 250 160 400 120 Q 550 80 720 50" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="8 4">
                <animate attributeName="stroke-dashoffset" values="0;24" dur="2s" repeatCount="indefinite" />
              </path>
              
              {/* Points */}
              <circle cx="150" cy="185" r="8" fill="#10b981" />
              <text x="160" y="180" fontSize="11" fill="#10b981">UTP</text>
              <circle cx="280" cy="160" r="8" fill="#3b82f6" />
              <text x="290" y="155" fontSize="11" fill="#3b82f6">Coax</text>
              <circle cx="420" cy="115" r="8" fill="#8b5cf6" />
              <text x="430" y="110" fontSize="11" fill="#8b5cf6">MM Fiber</text>
              <circle cx="620" cy="70" r="8" fill="#ef4444" />
              <text x="630" y="65" fontSize="11" fill="#ef4444">SM Fiber</text>
              <circle cx="540" cy="90" r="8" fill="#f97316" />
              <text x="550" y="85" fontSize="11" fill="#f97316">Wireless</text>
              
              {/* Arrow markers */}
              <defs>
                <marker id="arrowRight" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#475569" />
                </marker>
                <marker id="arrowUp" markerWidth="10" markerHeight="10" refX="5" refY="0" orient="auto">
                  <path d="M0,10 L5,0 L10,10 Z" fill="#475569" />
                </marker>
              </defs>
              
              {/* Note */}
              <text x="400" y="260" textAnchor="middle" fontSize="11" fill="#6b7280">Diminishing returns: after a point, higher cost gives smaller performance gains</text>
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            The curve shows diminishing returns – going from UTP to fiber gives huge gains, but beyond a point, cost skyrockets for marginal improvement.
          </p>
        </div>

        {/* Cost Breakdown Cards */}
        <div className="animate-fade-up grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">💰 Initial Costs</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Cable material:</strong> UTP cheapest, fiber most expensive.</li>
              <li><strong>Connectors & panels:</strong> RJ45 cheap ($0.50), fiber connectors ($5-20).</li>
              <li><strong>Active equipment:</strong> Copper switches cheaper than fiber switches (no optics).</li>
              <li><strong>Installation labor:</strong> 50-80% of total – fiber requires skilled splicers.</li>
              <li><strong>Testing/certification:</strong> Copper tester ($1k-5k), OTDR for fiber ($5k-20k).</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">🔧 Operational Costs (OpEx)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Power:</strong> Fiber uses less power (no signal amplification needed).</li>
              <li><strong>Cooling:</strong> Copper switches generate more heat.</li>
              <li><strong>Maintenance:</strong> Wireless needs regular troubleshooting; fiber is maintenance-free.</li>
              <li><strong>Upgrades:</strong> Fiber can upgrade speeds by changing optics only.</li>
              <li><strong>Security monitoring:</strong> Wireless requires intrusion detection.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800/60 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">⏱️ Hidden & Long-term Costs</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Downtime cost:</strong> Lost productivity – can dwarf hardware costs.</li>
              <li><strong>Future-proofing premium:</strong> Pay 20% more now to avoid 200% later.</li>
              <li><strong>Training:</strong> Fiber splicing training costs thousands per technician.</li>
              <li><strong>Permits & rights-of-way:</strong> For trenching or aerial fiber.</li>
              <li><strong>Spare inventory:</strong> Keep spare cables, connectors, optics.</li>
            </ul>
          </div>
        </div>

        {/* Cost Comparison Table (Simplified) */}
        <div className="animate-fade-up overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left font-semibold">Medium</th>
                <th className="p-3 text-left font-semibold">Material Cost ($/m)</th>
                <th className="p-3 text-left font-semibold">Installation Complexity</th>
                <th className="p-3 text-left font-semibold">Max Distance</th>
                <th className="p-3 text-left font-semibold">Max Speed</th>
                <th className="p-3 text-left font-semibold">TCO (5-year, 100m run)</th>
                <th className="p-3 text-left font-semibold">Best Value For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">UTP Cat6</td>
                <td className="p-3">$0.15</td>
                <td className="p-3">Easy</td>
                <td className="p-3">100 m</td>
                <td className="p-3">1 Gbps</td>
                <td className="p-3">~$250</td>
                <td className="p-3">Office LAN</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">UTP Cat6a</td>
                <td className="p-3">$0.40</td>
                <td className="p-3">Moderate</td>
                <td className="p-3">100 m</td>
                <td className="p-3">10 Gbps</td>
                <td className="p-3">~$500</td>
                <td className="p-3">High-end office</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">Coaxial (RG6)</td>
                <td className="p-3">$0.25</td>
                <td className="p-3">Moderate</td>
                <td className="p-3">500 m</td>
                <td className="p-3">10 Gbps</td>
                <td className="p-3">~$400</td>
                <td className="p-3">Cable TV/broadband</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">MM Fiber (OM4)</td>
                <td className="p-3">$0.80</td>
                <td className="p-3">Difficult</td>
                <td className="p-3">550 m</td>
                <td className="p-3">100 Gbps</td>
                <td className="p-3">~$1200</td>
                <td className="p-3">Data center</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">SM Fiber (OS2)</td>
                <td className="p-3">$1.20</td>
                <td className="p-3">Very Difficult</td>
                <td className="p-3">40+ km</td>
                <td className="p-3">400 Gbps+</td>
                <td className="p-3">~$2000+</td>
                <td className="p-3">Long-haul/backbone</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-3 font-medium">Wireless (PtP 5 GHz)</td>
                <td className="p-3">N/A</td>
                <td className="p-3">Easy</td>
                <td className="p-3">10+ km (LOS)</td>
                <td className="p-3">1 Gbps</td>
                <td className="p-3">~$800 (2 radios)</td>
                <td className="p-3">Cross-building links</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 p-2">Note: TCO includes cable, connectors, installation labor (estimated $100/hr), and basic switch/optics. Actual costs vary by region.</p>
        </div>

        {/* Real-World Budgeting Case Study */}
        <div className="animate-fade-up bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
          <h3 className="text-xl font-bold">🏫 Real-World Case: School Campus Network (Barrackpore)</h3>
          <p className="mt-2">A school in <strong>Barrackpore</strong> needs to connect 5 buildings (each 100m apart) and 200 computers. They have a budget of ₹10 lakhs (~$12,000).</p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Option A: UTP Cat6 + Fiber backbone</span>
              <ul className="list-disc pl-4 mt-1">
                <li>UTP inside buildings (5000m): ₹2.5L</li>
                <li>Fiber between buildings (400m): ₹1.5L (cable + splicing)</li>
                <li>Switches (8x 48-port): ₹4L</li>
                <li>Labor: ₹2L</li>
                <li><strong>Total: ₹10L</strong> – within budget, 1 Gbps to desks, future-proof.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded">
              <span className="font-bold">Option B: All wireless (Wi-Fi)</span>
              <ul className="list-disc pl-4 mt-1">
                <li>APs (20 units): ₹3L</li>
                <li>Controller & switches: ₹3L</li>
                <li>No cabling cost: ₹0</li>
                <li>Labor (installation): ₹1L</li>
                <li><strong>Total: ₹7L</strong> – cheaper, but slower (300 Mbps shared), interference from neighboring devices, less secure.</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">✨ <strong>Decision:</strong> School chose Option A (hybrid) because reliability and speed for exams and digital labs were critical. The extra ₹3L was worth avoiding yearly Wi-Fi complaints.</p>
        </div>

        {/* Cost-Saving Tips & Common Pitfalls */}
        <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">🧠 Pro Tips (Cost Optimization)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li><strong>Buy in bulk:</strong> Cable is cheaper per meter in 1000ft boxes.</li>
              <li><strong>Use pre-terminated fiber assemblies</strong> – avoid field splicing costs.</li>
              <li><strong>For small offices, use daisy-chain or star topology</strong> to minimize cable runs.</li>
              <li><strong>Consider used/refurbished enterprise switches</strong> – huge savings with minimal risk.</li>
              <li><strong>Negotiate labor as a fixed price</strong> – not hourly – to avoid overruns.</li>
              <li><strong>Future-proof strategically:</strong> Install empty conduits now, pull cable later when needed.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Focusing only on material cost, ignoring labor (which is often 3-5x higher).</li>
              <li>Buying the cheapest cable (CCA – copper-clad aluminum) – fails after 1-2 years.</li>
              <li>Overspending on Cat6a for every drop when Cat6 is sufficient.</li>
              <li>Underestimating wireless operational costs (troubleshooting, security).</li>
              <li>Not including spares – a single failed cable can shut down a wing.</li>
              <li>Forgetting to factor in downtime cost – a $200 cable can cause a $20,000 outage.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices + Checklist */}
        <div className="animate-fade-up bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-300">✅ Best Practices for Cost-Effective Design</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Perform a 5-year TCO analysis before making decisions.</li>
            <li>Use a tiered approach: fiber backbone, copper to desks, wireless for mobility.</li>
            <li>Standardize on one or two media types to reduce training and spare inventory.</li>
            <li>Always get at least three quotes from vendors for large projects.</li>
            <li>Document all costs and decisions – helps with future upgrades and audits.</li>
          </ul>
          <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-lg">
            <p className="font-semibold">📋 Student Mini Checklist</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Define TCO and its components</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Compare material vs labor costs</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Explain when fiber is worth the premium</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Identify hidden costs in cabling projects</span>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✔️ Apply cost-benefit analysis to a scenario</span>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-fade-up">
          <Teacher note={"Cost vs performance is where theory meets reality. Students often assume 'fiber is best' without considering budget. Use the school case study to spark debate. Also emphasize that 'cheapest' isn't always best – a $50 cable that fails every month is worse than a $200 cable that lasts 10 years. For exams, they should be able to calculate simple TCO and justify a medium choice based on a budget. Real-world tip: always add 20% contingency for unexpected costs (e.g., concrete drilling, fire-rated plenum)."} />
        </div>

        {/* 15 Q&A Section */}
        <div className="animate-fade-up bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4">❓ 15 Essential Q&A – Cost vs Performance</h2>
          <div className="space-y-4">
            {qaList.map((item, idx) => (
              <div key={idx} className="border-b border-gray-300 dark:border-gray-700 pb-3 group transition-all hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg p-2">
                <p className="font-semibold text-amber-700 dark:text-amber-300">Q{idx+1}: {item.q}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-1 pl-4 border-l-2 border-amber-300">💬 {item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">💰 Next: Speed and bandwidth (Topic 19).</p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 pt-4 animate-fade-up">
          💰 Topic 18: Cost vs Performance — Next: Speed and Bandwidth (Topic 19)
        </div>
      </div>
    </div>
  );
};

export default Topic18;