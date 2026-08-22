import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Security vs Friction Simulator State
  const [authStrictness, setAuthStrictness] = useState(3); // 1: None, 2: Weak, 3: Legacy Strict, 4: Heavy MFA, 5: Modern Adaptive Passkeys
  const [selectedIndustry, setSelectedIndustry] = useState("fintech");

  // Studio 2: Auth Paradigm Explorer State
  const [activeParadigm, setActiveParadigm] = useState("passkeys");

  // Studio 3: Real-World Scenario Filter State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech");

  // Authentication strictness policy configurations
  const policyConfigs = [
    {
      level: 1,
      name: "Permissive / No Security",
      desc: "4-digit PIN or no password, permanent login sessions, zero MFA.",
      securityScore: 15,
      frictionIndex: 5,
      shadowItRisk: 10,
      monthlyCostINR: 15000,
      badge: "Extremely Vulnerable",
      badgeColor: "bg-rose-900/60 text-rose-300 border-rose-700"
    },
    {
      level: 2,
      name: "Basic Legacy Passwords",
      desc: "8-character static password, no expiration, no MFA.",
      securityScore: 40,
      frictionIndex: 25,
      shadowItRisk: 25,
      monthlyCostINR: 45000,
      badge: "High Risk",
      badgeColor: "bg-amber-900/60 text-amber-300 border-amber-700"
    },
    {
      level: 3,
      name: "Legacy Strict (Complex + 30-Day Reset)",
      desc: "14-char mixed case + special chars, forced 30-day reset, SMS OTP on every login.",
      securityScore: 65,
      frictionIndex: 90,
      shadowItRisk: 85,
      monthlyCostINR: 185000,
      badge: "High Friction & Security Fatigue",
      badgeColor: "bg-orange-900/60 text-orange-300 border-orange-700"
    },
    {
      level: 4,
      name: "Heavy Friction MFA & Clunky VPN",
      desc: "Mandatory full-tunnel VPN, 20-char password, 4-step push MFA for every micro-action.",
      securityScore: 88,
      frictionIndex: 98,
      shadowItRisk: 92,
      monthlyCostINR: 240000,
      badge: "Severe Productivity Bottleneck",
      badgeColor: "bg-purple-900/60 text-purple-300 border-purple-700"
    },
    {
      level: 5,
      name: "Modern Adaptive Zero Trust & Passkeys",
      desc: "FIDO2 Passkeys, SSO, Risk-Based Adaptive Context-Aware MFA, ZTNA reverse proxy.",
      securityScore: 98,
      frictionIndex: 12,
      shadowItRisk: 8,
      monthlyCostINR: 18000,
      badge: "Optimal Equilibrium (NIST Compliant)",
      badgeColor: "bg-emerald-900/60 text-emerald-300 border-emerald-700"
    }
  ];

  const currentPolicy = policyConfigs[authStrictness - 1];

  // Authentication paradigms data
  const paradigms = {
    passwords: {
      name: "Legacy Complex Passwords",
      type: "Knowledge Factor",
      loginTime: "18.5s",
      entropyBits: "~35 bits",
      phishingResistant: false,
      userFriction: "Very High",
      cognitiveLoad: "Severe (Forced memorization)",
      helpdeskTickets: "42% of all IT calls",
      costPerUserYr: "₹1,250",
      description: "Requires users to memorize convoluted strings like 'P@$$w0rd!2025'. In reality, users write them on sticky notes or make predictable quarterly tweaks."
    },
    passphrases: {
      name: "Multi-Word Passphrases",
      type: "Knowledge Factor (High Entropy)",
      loginTime: "8.2s",
      entropyBits: "~65 bits",
      phishingResistant: false,
      userFriction: "Moderate",
      cognitiveLoad: "Low (Human friendly words)",
      helpdeskTickets: "14% of all IT calls",
      costPerUserYr: "₹450",
      description: "Combines 4-5 random words like 'mango-barrackpore-train-river'. Easy to remember and type on mobile keyboards while providing superior cryptographic entropy."
    },
    sms_otp: {
      name: "SMS / Voice OTP",
      type: "Possession Factor (Deprecated)",
      loginTime: "24.0s",
      entropyBits: "~20 bits",
      phishingResistant: false,
      userFriction: "High (Waiting for carrier SMS)",
      cognitiveLoad: "Moderate",
      helpdeskTickets: "22% (Delivery delays)",
      costPerUserYr: "₹850 + SMS carrier fees",
      description: "Sends a 6-digit code via cellular networks. Deprecated by NIST due to SIM-swapping, SS7 interception, and phishing proxy kits."
    },
    authenticator_num: {
      name: "App MFA + Number Matching",
      type: "Possession Factor (Software Token)",
      loginTime: "6.5s",
      entropyBits: "~50 bits",
      phishingResistant: "Moderate (Protects against MFA bombing)",
      userFriction: "Low-Moderate",
      cognitiveLoad: "Low",
      helpdeskTickets: "8%",
      costPerUserYr: "₹300",
      description: "Displays a 2-digit number on the screen that the user must enter in Microsoft/Google Authenticator, mitigating MFA fatigue and accidental approvals."
    },
    passkeys: {
      name: "FIDO2 / WebAuthn Passkeys",
      type: "Inherence + Possession (Hardware Bound)",
      loginTime: "1.2s",
      entropyBits: "256-bit Asymmetric ECC",
      phishingResistant: true,
      userFriction: "Near Zero (Single biometric touch)",
      cognitiveLoad: "Zero (No memorization)",
      helpdeskTickets: "< 1%",
      costPerUserYr: "₹120",
      description: "Public-key cryptography bound to device TPM/Secure Enclave. User touches fingerprint sensor or Face ID. 100% immune to phishing, credential stuffing, and replay attacks."
    }
  };

  const selectedParadigmData = paradigms[activeParadigm];

  // Real world scenarios data
  const realWorldScenarios = [
    {
      id: "kolkata_fintech",
      lead: "Mamata",
      role: "Lead DevOps Architect",
      location: "Kolkata FinTech Hub",
      title: "Core UPI Settlement Engine",
      budget: "₹5,20,000",
      dilemma: "45 backend developers had to log into 12 microservices using separate 16-character passwords rotated every 30 days, causing 180 reset tickets monthly and deployment friction.",
      badApproach: "Security team doubled down, enforcing 20-character passwords and disabling password manager auto-fill.",
      consequence: "Engineers hardcoded cleartext credentials into private Git config files and Slack channels to bypass daily login hell.",
      remedy: "Implemented Okta SSO with FIDO2 Passkeys & AWS IAM Identity Center.",
      metrics: {
        timeSavedHrsMo: 140,
        costSavedINR: "₹1,80,000",
        phishingIncidents: 0,
        developerSatisfaction: "98%"
      }
    },
    {
      id: "ichapur_hospital",
      lead: "Mahima",
      role: "Chief Medical Information Officer",
      location: "Ichapur General Hospital",
      title: "ICU Patient Vitals & Medication EHR",
      budget: "₹3,40,000",
      dilemma: "Strict IT policy enforced a 2-minute auto-screen lock on all ward terminals. During cardiac emergencies, doctors had to retype complex passwords while resuscitating patients.",
      badApproach: "Hospital IT threatened disciplinary action for staff who left terminals logged in.",
      consequence: "Nurses plugged unauthorized USB optical mouse-wigglers into workstations to keep sessions alive 24/7, leaving patient data vulnerable to physical walk-by snooping.",
      remedy: "Deployed RFID proximity badges with single-tap instant session handoff (Imprivata tap-and-go).",
      metrics: {
        timeSavedHrsMo: 210,
        costSavedINR: "₹2,20,000",
        phishingIncidents: 0,
        developerSatisfaction: "99%"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Industrial OT Security Officer",
      location: "Barrackpore Blast Furnace",
      title: "1600°C Steel Furnace Control Grid",
      budget: "₹4,10,000",
      dilemma: "Technicians managing extreme temperature furnace valves were blocked from remote monitoring by a rigid 4-hop multi-VPN setup requiring physical RSA tokens kept in a locked cabinet.",
      badApproach: "IT mandated that any remote diagnosis required a 24-hour advance written security ticket.",
      consequence: "Plant engineers secretly plugged an unauthorized 4G cellular dongle into the SCADA switchboard (Shadow IT) to monitor furnaces from mobile phones.",
      remedy: "Deployed Just-in-Time (JIT) Zero Trust Network Access (ZTNA) with ephemeral 45-minute audited access.",
      metrics: {
        timeSavedHrsMo: 95,
        costSavedINR: "₹3,10,000",
        phishingIncidents: 0,
        developerSatisfaction: "94%"
      }
    },
    {
      id: "jadavpur_lab",
      lead: "Abhronila",
      role: "Cyber Threat Research Lead",
      location: "Jadavpur University Labs",
      title: "Malware Intelligence Repository",
      budget: "₹2,80,000",
      dilemma: "Post-graduate researchers analyzing 15 GB malware memory dumps were restricted by strict 10 MB email limits and blocked cloud storage drives.",
      badApproach: "Network team locked down all USB ports and external domain access completely without alternative tools.",
      consequence: "Students bypassed web proxy filters using unencrypted personal Tor bridges and public dropboxes, leaking proprietary threat signatures.",
      remedy: "Provided an on-premise Enterprise Secure File Sharing (SFTP/Nextcloud) server integrated with University SAML SSO.",
      metrics: {
        timeSavedHrsMo: 115,
        costSavedINR: "₹1,45,000",
        phishingIncidents: 0,
        developerSatisfaction: "96%"
      }
    }
  ];

  const currentScenario = realWorldScenarios.find(s => s.id === activeScenarioId);

  return (
    <div className="w-full min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border-b border-indigo-800/40 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              Module 002 &bull; Topic 008
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
              NIST SP 800-63B &bull; Human Factors
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
              Zero Trust &bull; FIDO2 Passkeys
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300 tracking-tight">
            Balancing Security Controls with Usability
          </h1>

          <p className="text-lg sm:text-xl text-indigo-200/90 max-w-4xl font-normal">
            Master the delicate equilibrium between defensive cryptographic assurance and human operational velocity. Discover why friction-heavy security breeds Shadow IT, explore modern NIST SP 800-63B standards, and engineer frictionless authentication architectures.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-medium text-gray-300">
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>Human-Centered Security</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
              <span>NIST SP 800-63B Standard</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <span>Shadow IT Prevention</span>
            </div>
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
              <span>FIDO2 Passkeys &amp; SSO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* Section 1: Conceptual Foundation & The Trilemma */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 text-lg">01</span>
              The Core Problem: Security at the Expense of Usability is an Illusion
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Why rigid, high-friction security policies inevitably trigger human workarounds and increase organizational risk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-gray-300 text-sm sm:text-base">
              <p>
                In the early days of enterprise IT, cyber security was often viewed through an adversarial lens toward users: security teams treated human operators as the "weakest link" and built punitive, restrictive mechanisms.
              </p>
              <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span> The Fatal Law of Security Usability:
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 italic">
                  "If a security control makes it too difficult, slow, or frustrating for employees to do their legitimate work, they will actively invent creative workarounds to bypass it."
                </p>
              </div>
              <p>
                When security creates friction, humans respond not with malicious intent, but with natural cognitive optimization. They write passwords on post-it notes, use unauthorized cloud storage (<span className="text-amber-400 font-medium">Shadow IT</span>), auto-approve MFA push spams (<span className="text-rose-400 font-medium">MFA Fatigue</span>), and disable defensive agents.
              </p>
            </div>

            {/* Semantic SVG: Security-Usability-Functionality Trilemma */}
            <div className="bg-gray-950/80 rounded-xl p-5 border border-gray-800 flex flex-col items-center justify-center space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                The Security - Usability - Functionality Trilemma
              </h4>
              <svg viewBox="0 0 400 300" className="w-full max-w-sm h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                {/* Triangular Framework */}
                <polygon points="200,30 50,260 350,260" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" className="opacity-70" />
                
                {/* Equilibrium Core Zone */}
                <polygon points="200,100 115,220 285,220" fill="#4f46e5" fillOpacity="0.12" stroke="#6366f1" strokeWidth="1.5" />
                
                {/* Center Pulse Point */}
                <circle cx="200" cy="160" r="9" fill="#10b981">
                  <animate attributeName="r" values="7;11;7" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="200" y="185" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Optimal Equilibrium</text>
                <text x="200" y="198" textAnchor="middle" fill="#9ca3af" fontSize="8">(FIDO2 / SSO / ZTNA)</text>

                {/* Vertex 1: Security */}
                <circle cx="200" cy="30" r="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="200" y="34" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">🔒</text>
                <text x="200" y="14" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">SECURITY</text>

                {/* Vertex 2: Usability */}
                <circle cx="50" cy="260" r="14" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="50" y="264" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">⚡</text>
                <text x="50" y="285" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">USABILITY</text>

                {/* Vertex 3: Functionality */}
                <circle cx="350" cy="260" r="14" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
                <text x="350" y="264" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">⚙️</text>
                <text x="350" y="285" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">FUNCTIONALITY</text>
              </svg>
              <p className="text-xs text-gray-400 text-center">
                Extreme focus on any single vertex collapses the other two. Modern engineering pushes the equilibrium outward.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Simulator: Security vs Friction Playground */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 text-lg">02</span>
                Interactive Studio: Enterprise Security vs. Friction Simulator
              </h2>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", currentPolicy.badgeColor)}>
                {currentPolicy.badge}
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Adjust the enterprise authentication strictness slider to observe how friction directly influences Shadow IT adoption, security posture, and monthly helpdesk costs in Indian Rupees (₹).
            </p>
          </div>

          {/* Slider Control */}
          <div className="space-y-4 bg-gray-950 p-6 rounded-xl border border-gray-800">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-300">Policy Strictness Tier:</span>
              <span className="text-indigo-400 font-bold text-base">Tier {authStrictness} of 5: {currentPolicy.name}</span>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={authStrictness}
              onChange={(e) => setAuthStrictness(Number(e.target.value))}
              className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />

            <div className="flex justify-between text-xs text-gray-500 font-mono">
              <span>1: Permissive</span>
              <span>2: Basic</span>
              <span>3: Legacy Complex</span>
              <span>4: Clunky MFA</span>
              <span className="text-emerald-400 font-semibold">5: Modern Passkeys</span>
            </div>

            <div className="p-3 bg-gray-900/80 rounded-lg border border-gray-800 text-xs text-gray-300">
              <span className="font-semibold text-indigo-300">Configuration Summary: </span>
              {currentPolicy.desc}
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Security Posture */}
            <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase">
                <span>Security Strength</span>
                <span className={clsx(
                  currentPolicy.securityScore >= 80 ? "text-emerald-400" :
                  currentPolicy.securityScore >= 50 ? "text-amber-400" : "text-rose-400"
                )}>{currentPolicy.securityScore}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={clsx("h-full transition-all duration-500", 
                    currentPolicy.securityScore >= 80 ? "bg-emerald-500" :
                    currentPolicy.securityScore >= 50 ? "bg-amber-500" : "bg-rose-500"
                  )}
                  style={{ width: `${currentPolicy.securityScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 pt-1">Defensive resistance against credential theft &amp; brute-force attacks.</p>
            </div>

            {/* Metric 2: User Friction Index */}
            <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase">
                <span>User Friction Index</span>
                <span className={clsx(
                  currentPolicy.frictionIndex <= 20 ? "text-emerald-400" :
                  currentPolicy.frictionIndex <= 60 ? "text-amber-400" : "text-rose-400"
                )}>{currentPolicy.frictionIndex}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={clsx("h-full transition-all duration-500", 
                    currentPolicy.frictionIndex <= 20 ? "bg-emerald-500" :
                    currentPolicy.frictionIndex <= 60 ? "bg-amber-500" : "bg-rose-500"
                  )}
                  style={{ width: `${currentPolicy.frictionIndex}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 pt-1">Cognitive load and delay imposed on employees during daily tasks.</p>
            </div>

            {/* Metric 3: Shadow IT Risk */}
            <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase">
                <span>Shadow IT Risk</span>
                <span className={clsx(
                  currentPolicy.shadowItRisk <= 20 ? "text-emerald-400" :
                  currentPolicy.shadowItRisk <= 50 ? "text-amber-400" : "text-rose-400"
                )}>{currentPolicy.shadowItRisk}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={clsx("h-full transition-all duration-500", 
                    currentPolicy.shadowItRisk <= 20 ? "bg-emerald-500" :
                    currentPolicy.shadowItRisk <= 50 ? "bg-amber-500" : "bg-rose-500"
                  )}
                  style={{ width: `${currentPolicy.shadowItRisk}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 pt-1">Likelihood of workers adopting unauthorized personal tools to bypass IT.</p>
            </div>

            {/* Metric 4: Monthly Helpdesk Cost (₹) */}
            <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase">
                <span>Helpdesk Cost (Mo)</span>
                <span className="text-indigo-400 font-bold">₹{currentPolicy.monthlyCostINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-xl font-extrabold text-white pt-1">
                ₹{currentPolicy.monthlyCostINR.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-gray-500">Expenditure spent resolving password resets, lockouts &amp; token resyncs.</p>
            </div>
          </div>

          {/* Analysis Note */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-indigo-200">
            <span className="text-lg">💡</span>
            <div>
              <strong className="text-indigo-300 font-semibold">Key Architectural Insight: </strong>
              Tier 3 &amp; 4 illustrate the <em className="text-amber-300">Security Illusion Paradox</em>. Despite having strict password complexity rules, high user friction forces users to invent Shadow IT workarounds, actually resulting in <strong className="text-rose-300">higher real-world vulnerability</strong> than Tier 5's modern frictionless Passkeys.
            </div>
          </div>
        </section>

        {/* Section 3: Authentication Paradigms & NIST SP 800-63B */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 text-lg">03</span>
              Authentication Paradigm Evaluation &amp; NIST SP 800-63B Guidelines
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Compare 5 authentication methods across login speed, cryptographic entropy, phishing resilience, and cognitive load.
            </p>
          </div>

          {/* Paradigm Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(paradigms).map((key) => (
              <button
                key={key}
                onClick={() => setActiveParadigm(key)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border",
                  activeParadigm === key
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                    : "bg-gray-950 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-white"
                )}
              >
                {paradigms[key].name}
              </button>
            ))}
          </div>

          {/* Paradigm Detail Card */}
          <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{selectedParadigmData.name}</h3>
                <span className="text-xs text-indigo-400 font-mono">{selectedParadigmData.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={clsx(
                  "px-3 py-1 rounded-full text-xs font-semibold border",
                  selectedParadigmData.phishingResistant === true ? "bg-emerald-900/50 text-emerald-300 border-emerald-700" :
                  selectedParadigmData.phishingResistant === false ? "bg-rose-900/50 text-rose-300 border-rose-700" :
                  "bg-amber-900/50 text-amber-300 border-amber-700"
                )}>
                  {selectedParadigmData.phishingResistant === true ? "🛡️ 100% Phishing Immune" :
                   selectedParadigmData.phishingResistant === false ? "⚠️ Vulnerable to Phishing" :
                   "⚡ Conditional Protection"}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300">{selectedParadigmData.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-500 uppercase tracking-wider font-semibold">Avg Login Time</span>
                <p className="text-sm font-bold text-white">{selectedParadigmData.loginTime}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-500 uppercase tracking-wider font-semibold">Crypto Entropy</span>
                <p className="text-sm font-bold text-indigo-300">{selectedParadigmData.entropyBits}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-500 uppercase tracking-wider font-semibold">User Friction</span>
                <p className={clsx("text-sm font-bold", 
                  selectedParadigmData.userFriction.includes("Zero") || selectedParadigmData.userFriction.includes("Low") ? "text-emerald-400" : "text-rose-400"
                )}>{selectedParadigmData.userFriction}</p>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-lg border border-gray-800 space-y-1">
                <span className="text-gray-500 uppercase tracking-wider font-semibold">Cost / User / Year</span>
                <p className="text-sm font-bold text-amber-300">{selectedParadigmData.costPerUserYr}</p>
              </div>
            </div>
          </div>

          {/* NIST SP 800-63B Comparison Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>📋</span> NIST SP 800-63B: Legacy Dogma vs Modern Best Practices
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-950 text-gray-300 border-b border-gray-800">
                    <th className="p-3 font-semibold border-r border-gray-800">Authentication Area</th>
                    <th className="p-3 font-semibold text-rose-400 border-r border-gray-800">Legacy Anti-Pattern (Discontinued)</th>
                    <th className="p-3 font-semibold text-emerald-400">Modern NIST SP 800-63B Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80 text-gray-300">
                  <tr className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white border-r border-gray-800">Password Expiration</td>
                    <td className="p-3 text-gray-400 border-r border-gray-800">Mandatory 30/60/90-day resets.</td>
                    <td className="p-3 text-emerald-300">No periodic resets unless evidence of breach.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white border-r border-gray-800">Composition Rules</td>
                    <td className="p-3 text-gray-400 border-r border-gray-800">Mandatory uppercase, lowercase, numbers, special symbols.</td>
                    <td className="p-3 text-emerald-300">Allow any Unicode character; encourage long passphrases (up to 64 chars).</td>
                  </tr>
                  <tr className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white border-r border-gray-800">Breach Screening</td>
                    <td className="p-3 text-gray-400 border-r border-gray-800">None (relied only on local complexity).</td>
                    <td className="p-3 text-emerald-300">Check passwords against known leaked databases (HaveIBeenPwned API).</td>
                  </tr>
                  <tr className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white border-r border-gray-800">SMS / Voice OTPs</td>
                    <td className="p-3 text-gray-400 border-r border-gray-800">Widely adopted default 2FA.</td>
                    <td className="p-3 text-emerald-300">Deprecated due to SIM-swapping; mandate FIDO2 Passkeys.</td>
                  </tr>
                  <tr className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white border-r border-gray-800">Password Hints</td>
                    <td className="p-3 text-gray-400 border-r border-gray-800">Permitted custom hint questions ('First pet name').</td>
                    <td className="p-3 text-emerald-300">Strictly forbidden (trivial to social engineer via OSINT).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Real-World Case Studies (Bengal Region) */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 text-lg">04</span>
              Real-World Industry Case Studies in West Bengal
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Examine how Mamata, Mahima, Debangshu, and Abhronila resolved high-friction security crises across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {realWorldScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-gray-950 border-gray-800 text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                )}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">{sc.location}</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">{sc.title}</span>
                </div>
                <span className="text-xs text-gray-400">Lead: {sc.lead}</span>
              </button>
            ))}
          </div>

          {/* Scenario Detail Breakdown */}
          {currentScenario && (
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{currentScenario.title}</h3>
                  <p className="text-xs text-gray-400">{currentScenario.role}: <strong className="text-indigo-300">{currentScenario.lead}</strong> &bull; {currentScenario.location}</p>
                </div>
                <span className="px-3 py-1 bg-gray-900 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-mono font-bold">
                  Security Budget: {currentScenario.budget}
                </span>
              </div>

              {/* 3 Step Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="bg-gray-900/90 p-4 rounded-xl border border-rose-900/30 space-y-2">
                  <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
                    <span>1.</span> The Friction Dilemma
                  </h4>
                  <p className="text-gray-300">{currentScenario.dilemma}</p>
                </div>

                <div className="bg-gray-900/90 p-4 rounded-xl border border-amber-900/30 space-y-2">
                  <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>2.</span> Flawed Policy &amp; Shadow IT
                  </h4>
                  <p className="text-gray-300">{currentScenario.badApproach}</p>
                  <p className="text-xs text-amber-300 italic pt-1">Impact: {currentScenario.consequence}</p>
                </div>

                <div className="bg-gray-900/90 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>3.</span> Usable Security Architecture
                  </h4>
                  <p className="text-gray-300">{currentScenario.remedy}</p>
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-center text-xs">
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 block">Monthly Time Saved</span>
                  <span className="text-base font-bold text-emerald-400">{currentScenario.metrics.timeSavedHrsMo} Hours</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 block">Annual Savings</span>
                  <span className="text-base font-bold text-amber-300">{currentScenario.metrics.costSavedINR}</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 block">Phishing Breaches</span>
                  <span className="text-base font-bold text-emerald-400">Zero (0)</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 block">User Satisfaction</span>
                  <span className="text-base font-bold text-indigo-400">{currentScenario.metrics.developerSatisfaction}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 5: Common Pitfalls & Anti-Patterns */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 bg-rose-600/20 text-rose-400 rounded-xl border border-rose-500/30 text-lg">05</span>
              Common Security UX Pitfalls &amp; Anti-Patterns
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Avoid these recurring administrative mistakes that undermine organizational security posture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Pitfall 1: Cryptic Security Error Warnings
              </h3>
              <p className="text-gray-300">
                Displaying raw cryptographic stack traces (e.g., <code className="text-rose-300">ERR_CERT_AUTHORITY_INVALID</code>) frightens non-technical staff into blindly hitting "Proceed" or ignoring alerts altogether.
              </p>
              <div className="text-xs text-emerald-400 font-semibold pt-1">
                ✓ Fix: Provide plain-language risk summaries with clear, safe action buttons.
              </div>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Pitfall 2: Permanent Account Lockout on 3 Attempts
              </h3>
              <p className="text-gray-300">
                Rigid lockout thresholds without automated self-service unlock options flood IT helpdesks and enable malicious attackers to launch easy Denial-of-Service attacks against legitimate executives.
              </p>
              <div className="text-xs text-emerald-400 font-semibold pt-1">
                ✓ Fix: Use progressive exponential backoff (1s, 2s, 4s, 8s) and automated self-service email/SMS recovery.
              </div>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Pitfall 3: Disabling Password Paste in Web Forms
              </h3>
              <p className="text-gray-300">
                Blocking the <code className="text-rose-300">Ctrl+V</code> or paste event in password fields breaks password managers, forcing users to type short, simple passwords manually.
              </p>
              <div className="text-xs text-emerald-400 font-semibold pt-1">
                ✓ Fix: Fully support clipboard paste and browser autocomplete attributes.
              </div>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-rose-900/40 space-y-2">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <span>❌</span> Pitfall 4: Simple Push-Button MFA Prompts
              </h3>
              <p className="text-gray-300">
                Sending basic "Approve / Deny" popups makes users susceptible to MFA fatigue attacks (push-bombing) during late hours.
              </p>
              <div className="text-xs text-emerald-400 font-semibold pt-1">
                ✓ Fix: Implement Number Matching where users must enter the 2-digit number displayed on the login screen.
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Professional Best Practices & Hints */}
        <section className="bg-gray-900/80 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40">
          <div className="space-y-2 border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30 text-lg">06</span>
              Professional Best Practices, Hints &amp; Mini Checklist
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Classroom-tested rules of thumb and operational guidelines for security architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Best Practices */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <span>🛡️</span> Architecture Best Practices
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2 bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <span><strong>Design for Humans:</strong> Make the most secure path the fastest, default, and easiest path.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span><strong>Frictionless Identity:</strong> Adopt FIDO2 / WebAuthn Passkeys and Enterprise Single Sign-On (SSO).</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span><strong>Adaptive Risk Scoring:</strong> Use context-aware signals (IP, device posture) so safe users experience zero hurdles.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-emerald-400 font-bold">4.</span>
                  <span><strong>Blameless Culture:</strong> Treat human errors as design flaws in security UX rather than personal failures.</span>
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
                <span>🔍</span> Pedagogical Hints &amp; Guiding Questions
              </h3>
              <div className="bg-gray-950 p-5 rounded-xl border border-indigo-900/30 space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="space-y-1">
                  <strong className="text-indigo-300">Think about...</strong>
                  <p className="text-gray-400">Why a 4-word random passphrase like <code className="text-emerald-400">jadavpur-bengal-river-metro</code> provides far more cryptographic entropy than <code className="text-rose-400">P@$$w0rd!</code> while being infinitely easier to type on smartphones.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-amber-300">Observe carefully...</strong>
                  <p className="text-gray-400">How forcing doctors in Ichapur ICU to retype 16-character passwords every 2 minutes creates dangerous physical safety hazards that outweigh theoretical terminal snooping.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-purple-300">Try changing this...</strong>
                  <p className="text-gray-400">In your next system design, replace periodic 90-day password rotation requirements with real-time breached password database screening via HaveIBeenPwned API.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Points to Remember)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Security &amp; Usability are not zero-sum.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>High friction creates Shadow IT.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NIST SP 800-63B rejects periodic resets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Passkeys provide 100% phishing immunity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Number matching stops MFA fatigue.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Calculate ROI in Indian Rupees (₹).</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Balancing Security Controls with Usability FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* Section 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Balancing Security Controls with Usability (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* Section 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Always remember when designing security policies for banking, healthcare, or government systems: humans are not the enemy. If your security architecture is too hard or slow to use, employees will find workarounds that expose your systems to even greater risk. Modern cyber security architects succeed by building frictionless systems (like Passkeys and SSO) where the secure way is the easiest way."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
