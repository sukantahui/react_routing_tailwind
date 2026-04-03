import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic21: Installation and Maintenance Complexity of Transmission Media
 * 
 * Component Purpose:
 * - Compares the difficulty, cost, and skill requirements for installing and maintaining different transmission media
 * - Covers: fiber optics, twisted pair, coaxial, wireless, satellite
 * - Includes real-world trade-offs: initial cost vs long-term maintenance
 * 
 * When & Why Used:
 * - When planning network infrastructure budgets
 * - When choosing between media for a specific environment (office, factory, rural area)
 * - When training IT staff or hiring contractors
 * 
 * @returns {JSX.Element} Full educational component with theory, examples, Q&A
 */
const Topic21 = () => {
  // State for interactive complexity calculator
  const [selectedMedia, setSelectedMedia] = useState("fiber");
  
  const complexityData = {
    fiber: {
      name: "Optical Fiber",
      installDifficulty: 9,
      installTime: "3-5 days per km",
      maintenanceDifficulty: 7,
      specialistTools: ["Fusion splicer ($10k+)", "OTDR ($5k+)", "Cleaning kit", "Visual fault locator"],
      commonIssues: ["Bend loss", "Contamination", "Breakage under tension"],
      trainingRequired: "Advanced (weeks of certification)",
      costPerMeter: "$1.50 - $6.00 (installed)",
      lifespan: "25-30 years"
    },
    utp: {
      name: "UTP (Cat6)",
      installDifficulty: 4,
      installTime: "1-2 days per km",
      maintenanceDifficulty: 3,
      specialistTools: ["Crimper", "Punch-down tool", "Cable tester ($100-500)"],
      commonIssues: ["Crosstalk", "Untwisting too much", "Poor termination"],
      trainingRequired: "Basic (hours to days)",
      costPerMeter: "$0.30 - $1.00 (installed)",
      lifespan: "10-15 years"
    },
    coaxial: {
      name: "Coaxial Cable",
      installDifficulty: 5,
      installTime: "1-2 days per km",
      maintenanceDifficulty: 4,
      specialistTools: ["Compression crimper", "Cable stripper", "Signal meter"],
      commonIssues: ["Impedance mismatch", "Corroded connectors", "Shielding damage"],
      trainingRequired: "Basic to intermediate",
      costPerMeter: "$0.50 - $1.50 (installed)",
      lifespan: "15-20 years"
    },
    wireless: {
      name: "Wireless (Point-to-Point)",
      installDifficulty: 6,
      installTime: "1-3 days per link",
      maintenanceDifficulty: 5,
      specialistTools: ["Spectrum analyzer ($1k+)", "Site survey software", "Alignment tools"],
      commonIssues: ["Interference", "Line-of-sight blockage", "Weather fading"],
      trainingRequired: "Intermediate (RF knowledge)",
      costPerMeter: "$0 (no cable) + $500-5000 per radio",
      lifespan: "5-8 years (electronics)"
    },
    satellite: {
      name: "Satellite Communication",
      installDifficulty: 7,
      installTime: "Half day per site",
      maintenanceDifficulty: 6,
      specialistTools: ["Satellite finder meter", "Compass", "Signal level meter"],
      commonIssues: ["Rain fade", "Wind misalignment", "Latency constraints"],
      trainingRequired: "Intermediate (alignment skills)",
      costPerMeter: "$0 (no cable) + $500-2000 per dish + monthly fees",
      lifespan: "10-15 years (dish), 5-10 years (electronics)"
    }
  };
  
  const current = complexityData[selectedMedia];
  
  // Maintenance checklist items
  const maintenanceTasks = {
    fiber: ["Clean connectors quarterly", "Inspect for bends/cracks", "OTDR test annually", "Update documentation"],
    utp: ["Test cable certification every 2 years", "Check for loose jacks", "Verify grounding (if STP)", "Replace damaged boots"],
    coaxial: ["Check connector tightness", "Inspect for corrosion", "Verify signal levels", "Replace old splitters"],
    wireless: ["Clean antenna surfaces", "Check mounting bolts", "Update firmware", "Resurvey spectrum yearly"],
    satellite: ["Realign after storms", "Clear snow/ice from dish", "Check LNB connections", "Monitor signal-to-noise ratio"]
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Installation & Maintenance Complexity
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Understanding the hidden costs and skill requirements of network infrastructure
          </p>
          <div className="h-1 w-20 bg-orange-500 mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-10">
          
          {/* Card: Why Complexity Matters */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔧</span> Beyond the Price Tag
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-orange-600 dark:text-orange-400">Installation and maintenance complexity</strong> often represents <strong>70-80% of total cost of ownership</strong> over a network's lifetime. 
                A cheap cable that's difficult to maintain can cost more than an expensive, reliable alternative.
              </p>
              <p>
                Key factors include: <strong>specialized tools, technician skill level, access difficulty, testing requirements, and troubleshooting time.</strong>
                In <strong>Shyamnagar's</strong> industrial estates, many factories learned this lesson by installing cheap UTP in noisy environments, only to spend more on troubleshooting later.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500 my-4">
                <p className="italic">📌 <strong>Real-world analogy:</strong> Installing fiber is like building a精密 watch — requires cleanroom conditions, specialized tools, and skilled technicians. Installing UTP is like assembling IKEA furniture — basic tools, clear instructions, doable by most IT staff.</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Complexity Explorer */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Interactive: Compare Installation Complexity
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Select different media to see installation difficulty, required tools, and maintenance challenges.
            </p>
            
            {/* Media selector buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(complexityData).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedMedia(key)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105",
                    selectedMedia === key 
                      ? "bg-orange-600 text-white shadow-md" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {complexityData[key].name}
                </button>
              ))}
            </div>
            
            {/* Complexity display panel */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-5">
              <h3 className="text-xl font-bold mb-3">{current.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Installation Difficulty:</strong> 
                    <span className={clsx("ml-2 font-bold", current.installDifficulty > 7 ? "text-red-600" : current.installDifficulty > 4 ? "text-orange-600" : "text-green-600")}>
                      {current.installDifficulty}/10
                    </span>
                  </p>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 my-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${current.installDifficulty * 10}%` }}></div>
                  </div>
                  <p><strong>Typical Install Time:</strong> {current.installTime}</p>
                  <p><strong>Maintenance Difficulty:</strong> 
                    <span className={clsx("ml-2 font-bold", current.maintenanceDifficulty > 7 ? "text-red-600" : current.maintenanceDifficulty > 4 ? "text-orange-600" : "text-green-600")}>
                      {current.maintenanceDifficulty}/10
                    </span>
                  </p>
                  <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 my-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${current.maintenanceDifficulty * 10}%` }}></div>
                  </div>
                  <p><strong>Training Required:</strong> {current.trainingRequired}</p>
                  <p><strong>Typical Lifespan:</strong> {current.lifespan}</p>
                </div>
                <div>
                  <p><strong>Specialist Tools:</strong></p>
                  <ul className="list-disc list-inside text-sm space-y-1 mb-2">
                    {current.specialistTools.map((tool, idx) => (
                      <li key={idx}>{tool}</li>
                    ))}
                  </ul>
                  <p><strong>Common Issues:</strong></p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {current.commonIssues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Table: All Media */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📋</span> Full Comparison: Installation & Maintenance
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Media</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Install Difficulty</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Maintenance Difficulty</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Training Required</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Key Challenge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {Object.values(complexityData).map((media, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 font-medium">{media.name}</td>
                      <td className="px-4 py-2">
                        <span className={clsx("px-2 py-1 rounded text-xs font-medium", 
                          media.installDifficulty > 7 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                          media.installDifficulty > 4 ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" :
                          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300")}>
                          {media.installDifficulty}/10
                        </span>
                      </td>
                      <td className="px-4 py-2">{media.maintenanceDifficulty}/10</td>
                      <td className="px-4 py-2 text-sm">{media.trainingRequired}</td>
                      <td className="px-4 py-2 text-sm">{media.commonIssues[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Maintenance Checklist Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">✅</span> Maintenance Checklist by Media Type
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(maintenanceTasks).map(([media, tasks]) => (
                <div key={media} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-all">
                  <h3 className="font-bold text-lg mb-2 capitalize">{complexityData[media]?.name || media}</h3>
                  <ul className="space-y-1">
                    {tasks.map((task, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-500 text-lg leading-5">✓</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
              <p className="font-semibold">💡 Pro Tip:</p>
              <p>Create a <strong>maintenance calendar</strong> in your network documentation system. Schedule fiber OTDR tests annually, UTP certification every 2 years, and wireless spectrum analysis quarterly. Preventive maintenance reduces emergency repairs by 70%.</p>
            </div>
          </div>
          
          {/* Real-World Case: Abhronila's School Network */}
          <div className="group bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">🏫</span> Real-World Case: Abhronila's School in Ichapur
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Abhronila, the IT coordinator at a school in <strong>Ichapur</strong>, had to choose between fiber and UTP for connecting three buildings. 
              Fiber had better performance and noise immunity, but the installation required specialized contractors. UTP was cheaper initially but would need replacement in 8-10 years.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">📉 Decision Factors:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  <li>Budget: ₹2 lakhs (UTP) vs ₹6 lakhs (fiber)</li>
                  <li>Maintenance: In-house staff can terminate UTP</li>
                  <li>Distance: 80m between buildings (within UTP limit)</li>
                  <li>Noise: No heavy machinery nearby</li>
                </ul>
                <p className="text-sm mt-2 font-semibold text-green-600">✅ Outcome: UTP chosen, saved ₹4 lakhs</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                <p className="font-semibold">📈 Lesson Learned:</p>
                <p className="text-sm">For short distances in clean environments, UTP is cost-effective. But Abhronila documented that future expansion to the workshop (with welding equipment) <strong>will require fiber</strong> due to EMI.</p>
              </div>
            </div>
          </div>
          
          {/* Tips & Tricks */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips & Tricks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">🔧 Installation Shortcuts:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li><strong>Pre-terminated fiber</strong> (with connectors already attached) saves splicing costs.</li>
                  <li><strong>Pull boxes</strong> instead of reels reduce twisting during UTP installation.</li>
                  <li><strong>Label both ends</strong> of every cable during pull—saves hours of toning later.</li>
                  <li>Use <strong>conduit with pull strings</strong> for future upgrades.</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">🧪 Debugging Mindset:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Keep a <strong>spare fusion splicer</strong> or mechanical splice kit for fiber emergencies.</li>
                  <li>Use <strong>fluke testers</strong> with reporting to document cable health.</li>
                  <li>For wireless, take <strong>before/after photos</strong> of antenna alignment.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Common Mistakes */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Pitfalls & Misconceptions
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "I can terminate fiber with a scissors and glue"</p>
                <p className="text-sm"><strong>Truth:</strong> Fiber termination requires a <strong>precision cleaver</strong> ($300+) and either a fusion splicer ($2k-10k) or epoxy and polishing film. Improper termination causes 90% of fiber failures.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "UTP doesn't need maintenance after installation"</p>
                <p className="text-sm"><strong>Truth:</strong> UTP jacks loosen over time, dust accumulates, and people accidentally unplug cables. Schedule <strong>annual recertification</strong> and visual inspection.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Mistake: "Wireless is maintenance-free"</p>
                <p className="text-sm"><strong>Truth:</strong> Firmware updates, spectrum changes (new neighboring Wi-Fi), and physical alignment (wind/snow) require quarterly checks. Many IT teams neglect this, causing "mysterious" slowdowns.</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices for Installation & Maintenance
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Pre-Installation:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Conduct a <strong>site survey</strong> for obstacles and EMI sources.</li>
                  <li>Create <strong>detailed as-built drawings</strong> before starting.</li>
                  <li>Order <strong>10-20% extra cable</strong> for mistakes and future repairs.</li>
                  <li>Train or certify technicians <strong>before</strong> the installation day.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Ongoing Maintenance:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Use <strong>network monitoring</strong> to detect deteriorating links.</li>
                  <li>Keep <strong>spare parts</strong> (connectors, patch cords, transceivers).</li>
                  <li>Document <strong>every change</strong> in a changelog.</li>
                  <li>Perform <strong>post-maintenance testing</strong> to verify fixes.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">💭</span> Think About...
            </h2>
            <div className="space-y-3">
              <p className="italic text-gray-700 dark:text-gray-300">"Why do data centers prefer fiber even though UTP is cheaper and easier to install?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"If you're setting up a temporary network for a 3-day conference in Naihati, which medium has the lowest installation complexity?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"How does the maintenance complexity of satellite links change during monsoon season?"</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Try selecting different media in the interactive explorer above to see how complexity varies.</p>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="Students often underestimate maintenance costs. In my 20 years teaching at Barrackpore's technical institute, I've seen many projects fail because they only budgeted for initial installation. Remind them: A fiber link might cost 3x to install, but over 20 years, its lower maintenance often makes it cheaper than replacing UTP twice. Use the interactive tool to let students 'feel' the complexity difference. Also emphasize documentation — the best-installed network becomes unmaintainable without proper labels and drawings." />
          </div>
          
          {/* Q&A Section */}
          <div className="mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">❓</span> 15 Questions & Answers
            </h2>
            <div className="space-y-4">
              {qAndA.map((item, idx) => (
                <QAItem key={idx} question={item.q} answer={item.a} index={idx} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// QA Item Component
const QAItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex justify-between items-center"
      >
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {index+1}. {question}
        </span>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

// Q&A Data
const qAndA = [
  { q: "Why is fiber optic installation more complex than UTP?", a: "Fiber requires specialized tools (fusion splicer, OTDR, cleaver), cleanroom-like conditions to avoid contamination, and highly trained technicians. Termination involves precise alignment of glass fibers within 1-2 microns. UTP only requires a crimper and punch-down tool, which any IT technician can learn in hours." },
  { q: "What is a fusion splicer and why is it expensive?", a: "A fusion splicer uses an electric arc to melt and fuse two glass fibers together with micron precision. It costs $2,000 to $10,000+ because it requires precise motors, high-resolution cameras, and a controlled arc discharge. Cheap mechanical splices exist ($20-50) but have higher loss and are less reliable." },
  { q: "How often should UTP cabling be recertified?", a: "Industry best practice recommends recertification every 2-3 years, or after any major building changes (new HVAC, moved walls, added electrical runs). Recertification tests for near-end crosstalk (NEXT), return loss, and impedance to ensure the cable still meets its category (Cat5e/Cat6) specifications." },
  { q: "What is the most common maintenance issue with wireless links?", a: "Interference from new neighboring access points or devices (microwaves, cordless phones). Also physical misalignment from wind, ice, or thermal expansion. Regular spectrum analysis (quarterly) and visual inspection of antenna mounts prevent 80% of wireless issues." },
  { q: "Why do satellite dishes need realignment after storms?", a: "Strong winds can slightly move the dish mount, even if it seems secure. A 0.5-degree misalignment can reduce signal by 50% because satellite signals are highly directional (like a laser pointer). Rain, snow, and ice also add attenuation, but realignment restores the link budget." },
  { q: "What is 'bend loss' in fiber and how does it affect maintenance?", a: "Bend loss occurs when fiber is bent too sharply, causing light to escape the core. Even microscopic bends (microbends) from tight cable ties or kinks increase attenuation. Maintenance involves inspecting fiber paths for tight radius bends (minimum bend radius is typically 10x the cable diameter for installation, 15x for long-term)." },
  { q: "How does the maintenance complexity of coaxial cable compare to UTP?", a: "Coaxial is slightly harder to maintain because connectors corrode (especially outdoors), impedance mismatches occur if the wrong connectors are used, and the shield can break if bent repeatedly. However, coaxial is more robust than UTP for outdoor use. UTP requires more frequent recertification for crosstalk issues." },
  { q: "What is an OTDR and when is it used?", a: "Optical Time-Domain Reflectometer (OTDR) sends light pulses into fiber and analyzes backscatter to find breaks, splices, and connectors. It's used during initial installation (to document the link) and for troubleshooting (to locate a break within meters). OTDRs cost $2,000 to $20,000 depending on dynamic range." },
  { q: "Why might a school choose UTP over fiber despite fiber's advantages?", a: "Schools often have limited budgets and in-house IT staff without fiber training. For runs under 100m in clean environments (no heavy EMI), UTP provides Gigabit speeds at 1/3 the cost. The maintenance is simpler — teachers can even re-terminate a jack if a student damages it. Fiber would require calling an expensive contractor for each repair." },
  { q: "What is 'cable management' and why does it affect maintenance?", a: "Cable management means organizing cables neatly with trays, Velcro ties (not zip ties), and proper bend radius supports. Poor management makes it impossible to trace a cable, leads to tangles that damage connectors, and increases troubleshooting time from minutes to hours. Good management reduces mean-time-to-repair (MTTR) by 80%." },
  { q: "How do you maintain outdoor wireless links in winter?", a: "In cold climates, ice buildup on antennas can detune them (change impedance) and add weight that misaligns the mount. Use heated antennas or apply anti-icing spray. Snow accumulation on radomes requires gentle removal (never scrape — use compressed air). Also, schedule alignment checks after freeze-thaw cycles as ground shifts move masts." },
  { q: "What is the typical training path for a fiber optic technician?", a: "A certified fiber optic technician (CFOT) typically completes 3-5 days of training ($1,500-3,000) covering safety, connectorization, splicing, testing, and troubleshooting. They must pass written and hands-on exams. Advanced certifications (CFOS) specialize in splicing or testing. Compare to UTP where a 1-day course ($200) suffices." },
  { q: "Why do data centers use pre-terminated fiber trunks?", a: "Pre-terminated trunks have connectors already factory-installed and tested. This eliminates on-site splicing (the hardest part), reduces installation time from weeks to days, and guarantees low loss (each connection tested). The trade-off is less flexibility (fixed lengths) and higher upfront cost for the custom cables." },
  { q: "How does the maintenance complexity of point-to-point microwave compare to fiber?", a: "Microwave requires regular spectrum analysis to detect interference, firmware updates (often monthly), and physical alignment checks (semi-annually). Fiber requires less frequent attention but when it fails, troubleshooting is harder (requires OTDR and skilled interpretation). Overall, microwave has higher ongoing maintenance but lower installation complexity (no trenching)." },
  { q: "What is a 'toning' tool and when do you use it?", a: "A tone generator and probe (toning tool) sends an audible signal down a copper cable so you can identify it among hundreds. It's essential for maintenance when labels are missing. For fiber, a visual fault locator (visible red laser) serves a similar purpose — you see the red light glowing through the jacket at the break point." }
];

export default Topic21;