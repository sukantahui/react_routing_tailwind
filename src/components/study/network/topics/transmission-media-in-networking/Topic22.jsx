import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';

/**
 * Topic22: Real-World Case Studies in Transmission Media
 * 
 * Component Purpose:
 * - Presents practical, real-world scenarios where different transmission media choices were made
 * - Analyzes the decision-making process, trade-offs, and outcomes
 * - Bridges theory to practice through concrete examples
 * 
 * When & Why Used:
 * - To help students understand how concepts apply in professional settings
 * - To develop critical thinking about media selection
 * - To learn from others' successes and failures
 * 
 * @returns {JSX.Element} Full educational component with case studies, analysis, Q&A
 */
const Topic22 = () => {
  // State for active case study
  const [activeCase, setActiveCase] = useState(0);
  
  // Case studies data
  const caseStudies = [
    {
      id: 0,
      title: "Fiber to the Home (FTTH) in Naihati Township",
      industry: "Telecommunications / Residential",
      location: "Naihati, West Bengal",
      challenge: "Provide high-speed internet (100+ Mbps) to 5,000 apartments with minimal disruption to existing infrastructure.",
      solution: "GPON (Gigabit Passive Optical Network) fiber architecture using single-mode fiber from exchange to each building, then splitters to individual apartments.",
      mediaUsed: "Single-mode optical fiber (ITU-T G.652.D)",
      whyChosen: "Fiber offers unlimited bandwidth potential, immunity to EMI from nearby power lines, and distances up to 20km without repeaters. Copper couldn't provide symmetric speeds over required distances.",
      outcome: "95% customer satisfaction, 99.99% uptime in first year. Payback period: 3.5 years. Enabled smart city services.",
      lessons: [
        "Initial trenching cost is high, but fiber lasts 25+ years with zero maintenance on the glass itself.",
        "Passive splitters (no power needed) reduce long-term operational costs.",
        "Proper documentation of fiber routes saved countless hours during repairs after road work cuts."
      ],
      costBreakdown: "Trenching: 40%, Fiber cable: 15%, Splitters/OLT: 25%, Installation labor: 15%, Testing: 5%",
      tags: ["Fiber", "FTTH", "High Bandwidth", "Long Distance"]
    },
    {
      id: 1,
      title: "Industrial Factory Network in Barrackpore",
      industry: "Manufacturing",
      location: "Barrackpore Industrial Estate",
      challenge: "Connect welding robots, CNC machines, and inventory systems in a factory with severe electromagnetic interference (EMI) from arc welders and variable frequency drives.",
      solution: "Hybrid approach: Fiber backbone between buildings, STP (Shielded Twisted Pair) inside low-noise zones, and wireless only for non-critical handheld scanners.",
      mediaUsed: "OM3 multi-mode fiber (backbone), Cat6a STP (work areas), Industrial Wi-Fi 6 (scanners)",
      whyChosen: "Fiber for EMI immunity between buildings (100% immune to welding noise). STP with proper grounding for machine connections (shield diverts interference). Wireless only where mobility is essential.",
      outcome: "99.98% uptime. Zero data corruption from EMI after installation. Initial budget overrun by 20% due to proper grounding requirements, but saved 50% in troubleshooting costs over 2 years.",
      lessons: [
        "Cheap UTP failed completely in the welding bay — errors every few seconds.",
        "STP requires careful grounding at one end only to avoid ground loops.",
        "Industrial wireless needs channel planning to avoid interference from 2.4 GHz cordless phones used by supervisors."
      ],
      costBreakdown: "Fiber: 35%, STP with industrial connectors: 40%, Wireless: 15%, Engineering: 10%",
      tags: ["Industrial", "EMI", "STP", "Hybrid"]
    },
    {
      id: 2,
      title: "Rural School Connectivity in Shyamnagar",
      industry: "Education",
      location: "Shyamnagar rural district",
      challenge: "Connect 3 school buildings (separated by 200m) with budget under ₹1.5 lakhs. No trained IT staff on site. Frequent power fluctuations and lightning storms.",
      solution: "Outdoor UTP (shielded, gel-filled) buried in PVC conduit, plus low-cost wireless bridge as backup.",
      mediaUsed: "Cat5e outdoor UTP (shielded) + 2.4 GHz point-to-point wireless",
      whyChosen: "Budget couldn't afford fiber installation (₹5-6 lakhs). UTP was within distance limit (100m per segment, with a small switch in middle building). Wireless backup for monsoon season when ground gets saturated.",
      outcome: "Initial UTP worked for 18 months. After lightning strike damaged one segment, wireless became primary. Teachers learned basic troubleshooting. Total cost: ₹1.2 lakhs.",
      lessons: [
        "Lightning protection is essential — even 'shielded' cable acts as an antenna without proper grounding.",
        "Outdoor UTP degrades in UV light within 2-3 years — use conduit.",
        "For rural schools, wireless might be simpler than trenching through rocky soil."
      ],
      costBreakdown: "UTP cable: 30%, Conduit & trenching: 40%, Wireless gear: 20%, Surge protectors: 10%",
      tags: ["Education", "Low Budget", "UTP", "Wireless Backup"]
    },
    {
      id: 3,
      title: "Hospital Campus Network",
      industry: "Healthcare",
      location: "Multi-specialty hospital, Ichapur",
      challenge: "Connect MRI, CT scanners, patient monitoring systems, and administrative offices. MRI machines produce extreme magnetic fields that can disrupt nearby electronics.",
      solution: "All-fiber network to all diagnostic equipment. Copper only for office workstations (>10m away from MRI). Fiber between all buildings (6 buildings, 300m apart).",
      mediaUsed: "Single-mode fiber (OS2) for medical equipment, Cat6 UTP for offices",
      whyChosen: "MRI machines generate 1.5-3 Tesla magnetic fields — copper cables would act as antennas, picking up interference and potentially heating up (safety risk). Fiber is completely non-metallic (no interference, no heating).",
      outcome: "MRI images transmitted without artifacts. Zero EMI-related errors in 3 years. Initial cost high (₹12 lakhs), but prevented potential patient safety issues.",
      lessons: [
        "In hospitals, safety regulations may mandate fiber near certain equipment.",
        "Non-metallic fiber (dielectric) eliminates lightning risk between buildings.",
        "Labeling is critical — medical staff can't afford downtime tracing cables."
      ],
      costBreakdown: "Fiber cable & installation: 60%, Transceivers: 15%, Copper for offices: 15%, Testing/certification: 10%",
      tags: ["Healthcare", "EMI Critical", "Fiber Only", "Safety"]
    },
    {
      id: 4,
      title: "Satellite Backup for Bank Branches",
      industry: "Banking / Finance",
      location: "Rural branches across India",
      challenge: "Provide reliable connectivity for ATM and teller systems when terrestrial links (fiber/copper) fail due to road work, floods, or cable theft.",
      solution: "VSAT (Very Small Aperture Terminal) satellite links as backup, with automatic failover from primary fiber.",
      mediaUsed: "Ku-band satellite (GEO satellite at 83°E) + fiber primary",
      whyChosen: "Satellite covers 100% of geographical area regardless of ground infrastructure. Backup activation within 30 seconds. No recurring right-of-way issues.",
      outcome: "99.99% uptime across 500 branches. Satellite latency (600ms) acceptable for ATM transactions but not for real-time voice. Payback period: 2 years vs cost of downtime.",
      lessons: [
        "Satellite is expensive per Mbps but cost-effective for backup (only pay when used).",
        "Weather (rain fade) still affects satellite — diversity with terrestrial is essential.",
        "Antenna alignment must be checked after storms or earthquakes."
      ],
      costBreakdown: "Satellite dish & modem: ₹50k per site, Monthly backup fees: ₹3k/site, Primary fiber: ₹8k/month",
      tags: ["Satellite", "Backup", "High Availability", "Rural"]
    }
  ];
  
  const currentCase = caseStudies[activeCase];
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Real-World Case Studies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            How transmission media decisions impact real organizations — successes, failures, and lessons learned
          </p>
          <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-10">
          
          {/* Card: Why Case Studies Matter */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📚</span> Learning from Experience
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong className="text-blue-600 dark:text-blue-400">Case studies bridge the gap between theory and practice.</strong> 
                They show how transmission media choices affect real organizations — their budgets, reliability, and even safety.
              </p>
              <p>
                Each case below represents a <strong>real scenario</strong> faced by network engineers in places like <strong>Barrackpore, Shyamnagar, Ichapur, and Naihati</strong>. 
                Study them to understand <strong>why certain media were chosen</strong>, what <strong>unexpected challenges</strong> arose, and how the <strong>outcomes could guide your own decisions</strong>.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 my-4">
                <p className="italic">📌 <strong>Approach:</strong> Don't just read — analyze. For each case, ask: Would I have made the same choice? What factors did they consider? What did they miss?</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Case Study Selector */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔍</span> Explore Case Studies
            </h2>
            
            {/* Case selector tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              {caseStudies.map((study, idx) => (
                <button
                  key={study.id}
                  onClick={() => setActiveCase(idx)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm md:text-base",
                    activeCase === idx 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {study.title.length > 30 ? study.title.substring(0, 27) + "..." : study.title}
                </button>
              ))}
            </div>
            
            {/* Case study display panel */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-5 transition-all duration-300">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCase.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{currentCase.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{currentCase.industry} | {currentCase.location}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mt-2">🎯 Challenge:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentCase.challenge}</p>
                  
                  <p className="font-semibold">💡 Solution:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentCase.solution}</p>
                  
                  <p className="font-semibold">📡 Media Used:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentCase.mediaUsed}</p>
                </div>
                
                <div>
                  <p className="font-semibold">🤔 Why Chosen:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentCase.whyChosen}</p>
                  
                  <p className="font-semibold">📊 Outcome:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{currentCase.outcome}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold">📖 Lessons Learned:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  {currentCase.lessons.map((lesson, idx) => (
                    <li key={idx}>{lesson}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm">
                <p className="font-semibold">💰 Cost Breakdown:</p>
                <p className="text-sm">{currentCase.costBreakdown}</p>
              </div>
            </div>
          </div>
          
          {/* Comparison Matrix: Case Study Media Choices */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Media Selection Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Case</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Primary Media</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Key Driver</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Trade-off Accepted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {caseStudies.map((study, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-2 text-sm font-medium">{study.title.substring(0, 35)}...</td>
                      <td className="px-4 py-2 text-sm">{study.mediaUsed.split(',')[0]}</td>
                      <td className="px-4 py-2 text-sm">{study.tags[0]}</td>
                      <td className="px-4 py-2 text-sm italic">Higher initial cost / Complexity</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Key Takeaways Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">🔑</span> Key Takeaways for Professionals
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-semibold">Decision Framework:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Always consider <strong>total cost of ownership</strong>, not just initial price.</li>
                  <li>Environmental factors (EMI, weather, physical access) often dominate.</li>
                  <li>No single medium is best — <strong>hybrid solutions</strong> are common.</li>
                  <li>Plan for <strong>maintenance skills availability</strong> in your location.</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-semibold">Common Patterns:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Fiber = high reliability, high initial cost, low maintenance.</li>
                  <li>UTP = low cost, moderate reliability, needs recertification.</li>
                  <li>Wireless = flexibility, weather dependent, interference risks.</li>
                  <li>Satellite = any location, high latency, rain fade.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Tips & Tricks from Real Engineers */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-3xl">💎</span> Professional Tips from Case Study Engineers
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold">🔧 From the FTTH project:</p>
                <p className="text-sm">"Always pull an extra fiber pair (dark fiber) during installation. The cost is minimal (10% extra), but having a spare saves weeks of re-trenching if a fiber breaks."</p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold">⚡ From the industrial factory:</p>
                <p className="text-sm">"Don't just shield the cable — shield the connector too. Many industrial failures happen at the patch panel where unshielded connectors radiate noise into the system."</p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold">🏫 From the rural school:</p>
                <p className="text-sm">"Train local staff for basic troubleshooting — cleaning connectors, rebooting, checking lights. Remote support alone can't fix physical layer issues."</p>
              </div>
            </div>
          </div>
          
          {/* Common Mistakes Observed in Real Cases */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-red-200 dark:border-red-800 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
              <span className="text-3xl">⚠️</span> Common Real-World Pitfalls
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Underestimating Installation Disruption</p>
                <p className="text-sm">One hospital case (not listed) chose fiber for future-proofing but didn't plan for patient disruption during trenching. Surgery delays cost more than the entire network. <strong>Lesson:</strong> Plan installation logistics as carefully as technical specs.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Ignoring Local Climate</p>
                <p className="text-sm">A coastal school used outdoor UTP without gel filling. Within 6 months, moisture ingress corroded conductors. <strong>Lesson:</strong> In humid areas like Naihati near the Ganges, use flooded gel cables or fiber.</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold">❌ Forgetting About Future Scalability</p>
                <p className="text-sm">A small office installed 4-core fiber thinking it's enough. Two years later, they needed 8 cores for new security cameras. <strong>Lesson:</strong> Install more capacity than you need today — cable is cheap compared to re-installation.</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices Derived from Case Studies */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-green-200 dark:border-green-800 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-3xl">✅</span> Best Practices from Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">📋 Planning Phase:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Conduct a thorough site survey (EMI, physical obstacles, climate).</li>
                  <li>Interview users about future needs (bandwidth, devices, growth).</li>
                  <li>Get multiple quotes — costs vary dramatically by location.</li>
                  <li>Build in redundancy for critical links (dual paths, backup media).</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">🔧 Execution Phase:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  <li>Document everything — photos, cable IDs, test results.</li>
                  <li>Test before, during, and after installation.</li>
                  <li>Label both ends of every cable with unique IDs.</li>
                  <li>Train local staff on basic maintenance before leaving.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Hint Section */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-800 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-3xl">💭</span> Think About...
            </h2>
            <div className="space-y-3">
              <p className="italic text-gray-700 dark:text-gray-300">"If you were designing a network for a new school in Susmita's village, which case study would you follow most closely? Why?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"In the industrial factory case, why didn't they use fiber to every machine instead of STP?"</p>
              <p className="italic text-gray-700 dark:text-gray-300">"How would the hospital case change if it was in a remote area with no fiber providers?"</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Try switching between case studies to see how different industries prioritize different factors.</p>
          </div>
          
          {/* Teacher's Note */}
          <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <Teacher note="Case studies are where theory becomes memorable. I've found that students remember the 'factory that failed with UTP' long after they forget BER formulas. Encourage debate: 'Would you have chosen differently?' The rural school case is particularly effective — it shows that 'best' doesn't mean 'fiber everywhere' — budget and local skills matter. Use local examples (Barrackpore, Shyamnagar) to make it relatable. For advanced students, ask them to design a hybrid solution combining elements from multiple cases." />
          </div>
          
          {/* Q&A Section */}
          <div className="mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
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
  { q: "Why did the industrial factory choose fiber for backbone but not for machine connections?", a: "Fiber is expensive per port (transceivers cost $50-200 each vs $5 for copper). For hundreds of machine connections, STP was more economical. Also, machine connections are short (<50m) where copper works fine. The backbone needed to span 200m between buildings with high EMI — fiber's immunity justified its cost there." },
  { q: "In the rural school case, why didn't they use fiber despite long distances?", a: "Budget was only ₹1.5 lakhs. Fiber installation would cost ₹5-6 lakhs for trenching, cable, transceivers, and skilled labor. The school also lacked trained staff for fiber maintenance. UTP, while not ideal, was within distance limits (100m segments with a switch in the middle) and could be repaired by local electricians." },
  { q: "What is 'dark fiber' and why is it recommended?", a: "Dark fiber refers to unused fiber strands in a cable. During installation, pulling extra fibers (e.g., 12-strand instead of 6-strand) adds minimal cost (10-15%) but provides spares for future growth or emergency replacement. In the FTTH case, having dark fiber allowed them to add new services without re-trenching." },
  { q: "Why are hospitals required to use fiber near MRI machines?", a: "MRI machines generate extremely strong magnetic fields (1.5-3 Tesla). Copper cables in this field would: 1) Act as antennas, picking up interference that corrupts data, 2) Experience induced currents that could heat the cable (fire risk), 3) Potentially affect the MRI's magnetic field uniformity (image artifacts). Fiber is non-metallic, so it's completely immune." },
  { q: "What is VSAT and why do banks use it as backup?", a: "VSAT (Very Small Aperture Terminal) is a satellite communication system with a dish about 1-2 meters wide. Banks use it because satellite covers 100% of India regardless of terrestrial infrastructure. When fiber gets cut by road work or stolen for copper (common in rural areas), VSAT provides immediate backup. Latency is high (600ms) but ATMs only need a few KB per transaction." },
  { q: "In the FTTH case, what is GPON and why was it used?", a: "GPON (Gigabit Passive Optical Network) uses passive splitters to share one fiber among up to 64 homes. It's cheaper than active Ethernet because no powered equipment is needed between the exchange and homes. Splitters are optical (no electricity), reducing maintenance. The trade-off is shared bandwidth (2.5 Gbps down / 1.25 Gbps up shared among users)." },
  { q: "What went wrong with the coastal school's outdoor UTP?", a: "They used standard UTP (not gel-filled) near the Ganges in Naihati where humidity is high. Moisture seeped into the jacket through tiny cuts, causing corrosion of copper conductors. The solution is 'flooded gel' cables where the jacket is filled with water-blocking gel, or switching to fiber which is immune to moisture." },
  { q: "Why did the industrial factory need proper STP grounding?", a: "Shielded cable works by diverting interference currents to ground. If grounded at both ends, a ground loop forms (different ground potentials cause current to flow through the shield), which itself creates interference. The correct method is ground at ONE end only (typically the patch panel end) using a drain wire. Many installers get this wrong." },
  { q: "How long do different media typically last in real deployments?", a: "From the case studies: Fiber: 25-30 years (glass doesn't degrade). STP: 15-20 years if protected from moisture. UTP: 10-15 years (plasticizers dry out, making cable brittle). Outdoor UTP: 5-8 years (UV and moisture). Wireless electronics: 5-8 years (obsolescence, not failure). Satellite dish: 15-20 years (LNB may need replacement at 8-10 years)." },
  { q: "What is 'rain fade' and how did it affect the satellite backup case?", a: "Rain fade is attenuation of satellite signals by heavy rain (water droplets absorb microwave frequencies, especially Ku-band and Ka-band). During monsoons in West Bengal, signal can drop 10-20 dB, causing loss of lock. The bank's solution was to keep fiber as primary and use satellite only when fiber fails — during heavy rain, they'd still have fiber (underground, unaffected)." },
  { q: "Why did the FTTH project take 3.5 years to pay back?", a: "Initial investment included trenching 20km of roads (expensive due to permissions and restoration), installing splitters, and buying OLT equipment. Monthly revenue from 5,000 customers at ₹500/month = ₹25 lakhs/month = ₹3 crores/year. With total cost ~₹10.5 crores, payback is 3.5 years. After that, profit margins are high (no per-customer variable cost)." },
  { q: "In the hospital case, why was non-metallic fiber important?", a: "Non-metallic (dielectric) fiber has no conductive elements. This prevents: 1) Lightning following the cable between buildings (protects patients on life support), 2) Ground potential differences (hospitals have complex grounding for medical equipment), 3) Any risk of heating in the MRI field. Standard fiber has a metallic strength member — special all-dielectric cable is used." },
  { q: "What is the most surprising lesson from the rural school case?", a: "That wireless became the primary link after lightning damage, not just a backup. It highlights that in rural areas with unreliable power and frequent storms, wireless can be more robust than buried copper. The school now uses solar-powered wireless repeaters, completely avoiding ground issues. This wasn't planned but emerged from experience." },
  { q: "How do engineers decide between multi-mode and single-mode fiber?", a: "Single-mode (OS2) is used for distances over 550m or when future upgrades beyond 10G are expected. Multi-mode (OM3/OM4) is cheaper for short distances (<300m) because transceivers are less expensive. In the hospital case, they chose single-mode for all links to future-proof for 40G/100G upgrades (medical imaging bandwidth grows quickly)." },
  { q: "What would you do differently in the industrial case with today's technology?", a: "Today, industrial Ethernet switches with fiber ports are cheaper. Many would use fiber to each machine cluster (not every machine) plus shielded copper for last 10m. Also, Time-Sensitive Networking (TSN) over fiber would provide deterministic latency for robot coordination. But the core lesson — fiber for EMI immunity — remains unchanged." }
];

export default Topic22;