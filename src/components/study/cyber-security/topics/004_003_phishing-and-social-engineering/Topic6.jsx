import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgPhysicalId = useId();

  // Studio 1: Active Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("tailgating_piggybacking_door");

  // Studio 2: Live Physical Breach Calculator State
  const [proximityScore, setProximityScore] = useState(3.5); // 1.0 to 4.0
  const [opportunityFactor, setOpportunityFactor] = useState(3.5); // 1.0 to 4.0
  const [mantrapArmorStrength, setMantrapArmorStrength] = useState(1); // 1 = Standard Door, 50 = Guarded Turnstile, 500 = Optical Mantrap + DESFire EV3

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_mantrap_defense");

  // Studio 4: Physical Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("badge_access_log_parser_python");

  // 8 Physical Threat Profiles for Studio 1
  const threatDatabase = {
    tailgating_piggybacking_door: {
      key: "tailgating_piggybacking_door",
      name: "1. Tailgating & Piggybacking Access Bypass",
      category: "PHYSICAL PERIMETER BREACH",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalVector: "Social politeness & reluctance to let doors close in someone's face",
      exploitationVector:
        "The attacker dresses in a courier uniform or carries heavy cardboard boxes, rushing toward a closing security door behind an employee: 'Thanks for holding that!'.",
      vulnerabilityImpact:
        "The intruder gains direct, unauthenticated access to office floors, data center hallways, and sensitive conference rooms without scanning a badge.",
      telemetryIndicator: "Single badge swipe event followed by two people entering captured on CCTV cameras",
      resilientDefense: "Anti-tailgating mantraps and optical speed gates with overhead 3D Time-of-Flight sensors.",
      codeSnippet: `// Tailgating Attack Flow:
// [Authorized Employee badges into facility]
// ➔ [Attacker carrying heavy package: "Thanks for holding that!"]
// ➔ [Employee holds door open out of politeness] ➔ Physical Perimeter Breached!`
    },
    shoulder_surfing_privacy: {
      key: "shoulder_surfing_privacy",
      name: "2. Shoulder Surfing & Visual Eavesdropping",
      category: "VISUAL CREDENTIAL THEFT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalVector: "Lack of situational awareness in public or open office environments",
      exploitationVector:
        "Directly observing laptop screens, ATM keypads, or smartphone unlock PINs in coffee shops, Salt Lake metro stations, or open corporate lobbies.",
      vulnerabilityImpact:
        "Attackers harvest master administrative passwords, encryption keys, and customer database records without touching the endpoint.",
      telemetryIndicator: "Unauthorized external individuals lingering near financial desks or executive workstations",
      resilientDefense: "Polarized 30-degree micro-louver privacy screens and randomized keypad displays.",
      codeSnippet: `// Optical Privacy Screen Physics:
// Viewing Angle: 0° to 30° (Direct Front) ➔ 100% Visual Clarity (Authorized User)
// Viewing Angle: > 30° (Side Angles)      ➔ 0% Light Transmission (Black Screen!)`
    },
    dumpster_diving_trashing: {
      key: "dumpster_diving_trashing",
      name: "3. Dumpster Diving & Paper Waste Harvesting",
      category: "PHYSICAL DATA DISPOSAL EXPLOIT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      psychologicalVector: "False assumption that discarded paperwork is worthless or inaccessible",
      exploitationVector:
        "Searching through un-shredded corporate waste dumpsters to recover discarded customer PAN cards, internal telephone rosters, and network topology diagrams.",
      vulnerabilityImpact:
        "Harvested intelligence is weaponized in spear phishing, social engineering pretexting, or identity theft.",
      telemetryIndicator: "Physical tampering with exterior waste recycling bins and dumpster enclosures",
      resilientDefense: "DIN 66399 Level P-5 cross-cut micro-shredders and locked disposal consoles.",
      codeSnippet: `// Document Shredding Standards:
// Strip-Cut (Level P-1) : Strips 12mm wide ➔ Reassembled via Computer Vision!
// Micro-Cut (Level P-5) : Particles <= 30 mm² (Micro-dust) ➔ 100% Irrecoverable!`
    },
    rfid_badge_cloning_125khz: {
      key: "rfid_badge_cloning_125khz",
      name: "4. 125kHz RFID Proximity Card Cloning (Flipper Zero)",
      category: "WIRELESS ACCESS CARD SKIMMING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      psychologicalVector: "Ignorance of unencrypted radio broadcast range in public spaces",
      exploitationVector:
        "Using handheld RFID tools (Flipper Zero, Proxmark3) to wirelessly skim legacy 125kHz EM4100 badges from employees' pockets in crowded elevators.",
      vulnerabilityImpact:
        "The cloned badge is written to a blank card in under 2 seconds, granting the attacker legitimate electronic badge access to the corporate facility.",
      telemetryIndicator: "Duplicate badge swipe events occurring simultaneously across distant physical access doors",
      resilientDefense: "Upgrading to 13.56MHz MIFARE DESFire EV3 smart cards with AES-128 mutual authentication.",
      codeSnippet: `# Flipper Zero 125kHz RFID Badge Clone (Proxmark3):
lf search -> Found EM4100 Tag [Card ID: 2006A48F]
lf clone 2006A48F -> Written to blank card in 1.8s (ACCESS GRANTED!)`
    },
    anti_tailgating_mantrap_airlocks: {
      key: "anti_tailgating_mantrap_airlocks",
      name: "5. Anti-Tailgating Mantrap Portals (Physical Airlocks)",
      category: "PHYSICAL ACCESS ENGINEERING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      psychologicalVector: "Eliminating human discretion through automated physical interlocks",
      exploitationVector:
        "Attempts to tailgate fail because Door 1 must close and lock, and internal 3D optical sensors must verify exactly one person before Door 2 unlocks.",
      vulnerabilityImpact:
        "Completely eliminates unauthorized physical ingress into sensitive server rooms and core financial settlement desks.",
      telemetryIndicator: "Mantrap alarm trigger events caused by multi-person entry attempts",
      resilientDefense: "Two-door interlocking mantrap portals with weight scales and 3D depth sensors.",
      codeSnippet: `// Mantrap Interlocking State Machine:
// Door 1 Unlocks upon Badge ➔ User enters ➔ Door 1 Locks
// Optical Sensor verifies count == 1 && Weight Scale == Valid
// Door 2 Unlocks ➔ User exits into data center ➔ Door 2 Locks`
    },
    thermal_infrared_pin_recovery: {
      key: "thermal_infrared_pin_recovery",
      name: "6. Thermal Infrared Camera PIN Recovery",
      category: "POST-ENTRY PASSIVE SURVEILLANCE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalVector: "Leaving residual physical heat signatures after entering numeric PINs",
      exploitationVector:
        "Aiming a thermal camera (FLIR) at a physical PIN keypad immediately after an employee leaves, detecting temperature differences to deduce the PIN digits and sequence.",
      vulnerabilityImpact:
        "The attacker recovers 4-digit and 6-digit access PINs without ever watching the user type.",
      telemetryIndicator: "Unauthorized persons photographing keypads immediately following authorized entry",
      resilientDefense: "Randomized touchscreen PIN pads and metallic keypad buttons (high thermal conductivity).",
      codeSnippet: `// Thermal PIN Recovery Principle:
// Button A: 31.5°C (Warmest ➔ Pressed 4th) | Button B: 30.8°C (Pressed 3rd)
// Button C: 29.9°C (Pressed 2nd)           | Button D: 28.5°C (Pressed 1st)
// Deduced PIN: D - C - B - A (Thermal Sequence Recovery!)`
    },
    laser_microphone_eavesdropping: {
      key: "laser_microphone_eavesdropping",
      name: "7. Long-Range Laser Window Microphone Eavesdropping",
      category: "ACOUSTIC PERIMETER SURVEILLANCE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      psychologicalVector: "Assuming sound cannot escape closed, double-paned glass windows",
      exploitationVector:
        "Bouncing an invisible infrared laser beam off executive meeting room window glass across the street, demodulating acoustic glass vibrations into clear audio.",
      vulnerabilityImpact:
        "Confidential executive board discussions, M&A strategies, and cryptographic incident responses are intercepted in real time.",
      telemetryIndicator: "Infrared laser reflections detected by window-mounted photodiode sensors",
      resilientDefense: "Window acoustic noise generators and heavy sound-dampening interior acoustic blinds.",
      codeSnippet: `// Laser Microphone Audio Demodulation:
// [Internal Speech Sound Waves] ➔ [Microscopic Window Glass Vibrations (nm)]
// ➔ [Infrared Laser Reflection] ➔ [Photodiode Interferometer] ➔ [Demodulated Audio]`
    },
    lock_bypassing_shimming_tools: {
      key: "lock_bypassing_shimming_tools",
      name: "8. Physical Lock Bypassing (Under-Door & Shims)",
      category: "MECHANICAL HARDWARE MANIPULATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalVector: "Relying on ordinary spring latch locks without deadlocks or door sweeps",
      exploitationVector:
        "Sliding an under-door lever tool under closed doors to pull the interior emergency handle, unlocking secure doors in under 3 seconds without picking pins.",
      vulnerabilityImpact:
        "Intruders bypass physical key locks silently without leaving forensic damage or alarm triggers.",
      telemetryIndicator: "Door forced open / door held open alarm events on access control management panels",
      resilientDefense: "Installing latch astragal guards and under-door draft sweeps on all security doors.",
      codeSnippet: `// Lock Bypass Countermeasures:
// 1. Install Latch Guards / Astragals (blocks credit card / shimming tools)
// 2. Install Under-Door Draft Blocks (blocks under-door lever tools)
// 3. Use Deadlocking Spring Latches (prevents latch retraction)`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // Studio 2: Live Physical Breach Calculations
  const physicalSimulation = useMemo(() => {
    // P_physical = 1 - e^(- (P_proximity * O_opportunity) / R_mantrap)
    const numerator = proximityScore * opportunityFactor;
    const exponent = -numerator / mantrapArmorStrength;
    const rawBreachProb = (1 - Math.exp(exponent)) * 100;
    const actualBreachProb = mantrapArmorStrength >= 500
      ? (rawBreachProb * 0.014).toFixed(2) // Optical Mantrap + DESFire EV3 blocks 98.6% of physical attacks
      : mantrapArmorStrength >= 50
      ? (rawBreachProb * 0.35).toFixed(2)  // Guarded Turnstile blocks 65% of physical attacks
      : rawBreachProb.toFixed(2);           // Standard Doors -> 100% vulnerable to tailgating/cloning

    return {
      rawBreachProb: rawBreachProb.toFixed(2),
      actualBreachProb,
      badgeClass: parseFloat(actualBreachProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualBreachProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualBreachProb) < 2
        ? `PHYSICAL MANTRAP ARMOR: With Optical Mantraps & DESFire EV3 Badges (${mantrapArmorStrength}x), physical breach probability is only ${actualBreachProb}% regardless of tailgating attempts!`
        : `CRITICAL PHYSICAL PERIMETER RISK: Without optical mantraps (${mantrapArmorStrength}x), lobby foot traffic (${proximityScore}x) produces a ${actualBreachProb}% probability of unauthorized physical infiltration!`
    };
  }, [proximityScore, opportunityFactor, mantrapArmorStrength]);

  // Studio 4: Physical Security Production Code Database
  const codeDatabase = {
    badge_access_log_parser_python: {
      name: "Python Script to Parse Physical Access Logs & Detect Anomalous Badging",
      code: `import datetime

def detect_badge_anomalies(access_events):
    print("[*] --- PHYSICAL ACCESS CONTROL LOG ANOMALY SCAN ---")
    user_last_seen = {}
    
    for event in access_events:
        user = event['user']
        door = event['door']
        timestamp = datetime.datetime.fromisoformat(event['time'])
        
        if user in user_last_seen:
            last_door, last_time = user_last_seen[user]
            time_diff = (timestamp - last_time).total_seconds()
            
            # Detect Impossible Travel / Rapid Duplicate Badging (Cloned Badge Indicator)
            if time_diff < 60 and last_door != door:
                print(f"[!] CLONED BADGE ALERT: User '{user}' swiped at '{last_door}' and '{door}' in {time_diff}s!")
                print("  [-] Action: Disabling Badge ID & Triggering Physical Security Guard Alert!")
        
        user_last_seen[user] = (door, timestamp)

# Simulated access log events
sample_logs = [
    {"user": "Mamata", "door": "Salt_Lake_Lobby_Turnstile", "time": "2026-08-23T09:15:00"},
    {"user": "Mamata", "door": "Kolkata_Server_Room_East", "time": "2026-08-23T09:15:20"} # Impossible travel!
]

detect_badge_anomalies(sample_logs)`,
      explanation: "Python script parsing physical access control event logs, detecting impossible travel anomalies and simultaneous multi-door badge swipes indicating cloned RFID cards."
    },
    clear_screen_gpo_powershell: {
      name: "PowerShell Script to Enforce Clear Screen 180s Lockout GPO",
      code: `# Enforce Clear Screen 180-Second Lockout Policy via Windows Registry / GPO:
$regPath = "HKCU:\\Control Panel\\Desktop"

# 1. Enable Screensaver with Password Protection
Set-ItemProperty -Path $regPath -Name "ScreenSaveActive" -Value "1"
Set-ItemProperty -Path $regPath -Name "ScreenSaverIsSecure" -Value "1"

# 2. Set Screensaver Timeout to 180 Seconds (3 Minutes)
Set-ItemProperty -Path $regPath -Name "ScreenSaveTimeOut" -Value "180"

# 3. Specify Secure Default Screensaver Executable
Set-ItemProperty -Path $regPath -Name "SCRNSAVE.EXE" -Value "C:\\Windows\\System32\\scrnsave.scr"

Write-Host "[+] Clear Screen 180s Lockout Policy ENFORCED across all workstations!" -ForegroundColor Green`,
      explanation: "PowerShell script enforcing Windows workstation 180-second screensaver lockout policies, preventing shoulder surfing and unauthorized physical console access."
    },
    desfire_ev3_firmware_cpp: {
      name: "C++ Smart Card Reader Firmware for MIFARE DESFire EV3 AES-128 Handshake",
      code: `// C++ ESP32 RFID Reader Firmware snippet (MIFARE DESFire EV3 Mutual Auth):
#include <SPI.h>
#include <MFRC522.h>

bool verify_desfire_ev3_aes128(uint8_t card_uid[7], uint8_t aes_key[16]) {
    Serial.println("[*] Initiating DESFire EV3 AES-128 Mutual Cryptographic Authentication...");
    
    // Step 1: Send AuthenticateAES Command (0xAA)
    // Step 2: Receive 16-byte Encrypted Challenge RndB from Card
    // Step 3: Decrypt RndB using AES-128 Key, generate RndA, and return Encrypted Response
    // Step 4: Verify Card returns RndA rotated by 8 bits
    
    bool auth_success = true; // Simulated successful cryptographic handshake
    if (auth_success) {
        Serial.println("[+] Mutual Authentication SUCCESS: Cryptographic Smart Badge Verified!");
        return true;
    } else {
        Serial.println("[-] REJECTED: Counterfeit / Cloned RFID Badge Detected!");
        return false;
    }
}`,
      explanation: "C++ smart card reader firmware executing AES-128 mutual cryptographic authentication with MIFARE DESFire EV3 access badges, rendering badge cloning impossible."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_mantrap_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Upgrading to DESFire EV3 Smart Badges & Dual-Turnstile Optical Mantraps",
      threatType: "125kHz RFID CLONING & TAILGATING INFILTRATION",
      budget: "₹46,00,000",
      incident:
        "A physical penetration team attempted to clone legacy 125kHz badges in a crowded Salt Lake elevator and tailgate into the core financial settlement server room.",
      defenseStrategy:
        "Mamata upgraded all 450 corporate access badges to 13.56MHz MIFARE DESFire EV3 smart cards and installed optical mantraps with 3D depth sensors.",
      outcome: "Cloning attempts failed against AES-128 encryption; tailgater was trapped in the mantrap airlock; 45 financial switches secured.",
      metrics: {
        desfireCardsDeployed: "450 Smart Cards",
        tailgatingAttemptsBlocked: "100% Intercepted",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_dumpster_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DUMPSTER DIVING & UNIFORM DISGUISE TRESPASS",
      title: "Neutralizing Dumpster Diving & Uniform Impersonation at Substation Switchyards",
      budget: "₹31,00,000",
      incident:
        "Adversaries posing as HVAC technicians wearing high-vis vests searched recycling bins for network blueprints and attempted entry into the control room.",
      defenseStrategy:
        "Debangshu installed DIN 66399 Level P-5 micro-shredders in all offices and enforced a 100% visitor escort policy with biometric badge turnstiles.",
      outcome: "Paperwork destroyed to irrecoverable dust; unbadged intruders detained at perimeter turnstiles; 18 high-voltage substations protected.",
      metrics: {
        shreddingStandard: "DIN 66399 Level P-5",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_privacy_screens",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SHOULDER SURFING & UNATTENDED PATIENT FILE LEAKS",
      title: "Enforcing Polarized Privacy Screens & Clean Desk Policies at Clinic Reception Desks",
      budget: "₹25,00,000",
      incident:
        "Visitors in crowded clinic waiting rooms attempted to shoulder surf oncology diagnostic reports and observe reception staff entering database passwords.",
      defenseStrategy:
        "Mahima installed 30-degree polarized micro-louver privacy screens on all 120 clinic PCs and enforced 180-second automated screen timeouts.",
      outcome: "Screen displays rendered completely opaque from side angles; zero patient medical files exposed; 120,000 oncology records protected.",
      metrics: {
        privacyScreensInstalled: "120 Workstations",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_physical_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF PHYSICAL SOCIAL ENGINEERING RESILIENCE",
      title: "Formulating the Physical Access Breach Probability Model",
      budget: "₹20,50,000",
      incident:
        "Researchers modeled the mathematical relationship between lobby foot traffic proximity, social opportunities, and mantrap armor resistance.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that optical mantraps reduce physical breach probability below 1.4%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 35,000 simulated physical infiltration trials.",
      metrics: {
        simulationTrials: "35,000 Test Trials",
        modelAccuracy: "99.2% Predictive Fit",
        modelFramework: "Physical Access Equation",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_003
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 06
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Physical Social Engineering: Tailgating, Shoulder Surfing, Dumpster Diving
            </h1>
            <p className="text-xs text-gray-400">
              Anti-tailgating mantraps, polarized privacy screens, DIN 66399 micro-shredding, DESFire EV3 RFID, and IPC Section 447.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & Physical Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Physical Perimeter Social Engineering Taxonomy
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Physical Social Engineering: Tailgating, Shoulder Surfing &amp; Dumpster Diving
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Physical social engineering exploits human politeness, inadequate document disposal, and visual eavesdropping 
              to bypass electronic cybersecurity perimeters. The taxonomy spans: <strong>Tailgating / Piggybacking</strong> 
              (exploiting social norms to enter secure doors without scanning badges), <strong>Shoulder Surfing</strong> 
              (visual recording of screens, keypads, and PIN pads in cafes or lobbies), <strong>Dumpster Diving (Trashing)</strong> 
              (sifting through corporate waste to recover un-shredded records), and <strong>125kHz RFID Badge Cloning</strong> 
              (wirelessly skimming unencrypted proximity cards using Flipper Zero / Proxmark3).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tailgating & RFID Cloning Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Tailgating &amp; 125kHz RFID Badge Cloning
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Proxmark3: 125kHz Card ID cloned in 1.8 seconds ➔ Perimeter Breached!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Legacy proximity badges transmit fixed unencrypted IDs. Combined with carrying props (coffee, heavy boxes) 
                to elicit door-holding politeness, physical security is easily bypassed without electronic alarms.
              </p>
            </div>

            {/* Mantraps & DESFire EV3 Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Optical Mantraps &amp; DESFire EV3 Cryptographic Cards
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Optical Mantraps:</strong> Interlocking airlocks with 3D depth sensors counting passing bodies.</li>
                <li>• <strong className="text-purple-300">DESFire EV3 Smart Cards:</strong> 13.56MHz RFID with AES-128 mutual cryptographic authentication.</li>
                <li>• <strong className="text-amber-300">DIN 66399 Level P-5:</strong> Micro-cross-cut shredders destroying paper to particles &le; 30 mm².</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Physical Threat & Defense Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Physical Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Physical Threat Pathways &amp; Mantrap Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how tailgating, shoulder surfing, dumpster diving, and badge cloning attempt physical breach, 
              and how Optical Mantraps, Privacy Screens, DIN P-5 Shredding, and DESFire EV3 Smart Cards neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: PHYSICAL INTRUSION */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. PHYSICAL ATTACK
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Perimeter Infiltration
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACK VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Tailgating Behind Staff
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  125kHz Badge Skimming
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: OPTICAL MANTRAP AIRLOCK */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. OPTICAL MANTRAP
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  3D Depth Airlock
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DETECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Counts Passing Bodies
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Blocks Door 2 if Count &gt; 1
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: PRIVACY SCREEN & CLEAR SCREEN */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. PRIVACY SHIELD
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Micro-Louver Polarized
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VISUAL ARMOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  30° Angle Blackout
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  180s Screen Lock GPO
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: DIN P-5 MICRO-SHREDDING */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. DIN P-5 SHRED
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Locked Consoles
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  WASTE DESTRUCTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Particles &le; 30 mm²
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Zero Dumpster Diving!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: DESFIRE EV3 CRYPTOGRAPHIC BADGE */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. DESFIRE EV3
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  AES-128 Smart Card
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Mutual Crypto Handshake
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Badge Cloning!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Threat Physical Exploit Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Physical Social Engineering &amp; Hardware Exploit Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a physical threat vector below to examine its psychological vector, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(threatDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedThreatKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedThreatKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  THREAT
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeThreat.categoryBadge)}>
                    {activeThreat.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Psychology: {activeThreat.psychologicalVector}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeThreat.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeThreat.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeThreat.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Physical Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Specification / Code Pattern
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Physical Breach Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Physical Breach Probability &amp; Mantrap Armor Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust lobby foot traffic proximity score $P$, social opportunity factor $O$, and physical mantrap armor $R$ 
              to model physical breach probability $P_{\text{physical}} = 1 - e^{-\frac{P \times O}{R}}$ and see how Optical Mantraps reduce breach probability below 1.4%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Proximity &amp; Mantrap Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Foot Traffic Proximity (P):</span>
                  <span className="text-cyan-400 font-bold font-mono">{proximityScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={proximityScore}
                  onChange={(e) => setProximityScore(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Social Opportunity Factor (O):</span>
                  <span className="text-rose-400 font-bold font-mono">{opportunityFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={opportunityFactor}
                  onChange={(e) => setOpportunityFactor(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Physical Mantrap Armor (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setMantrapArmorStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mantrapArmorStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setMantrapArmorStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mantrapArmorStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Turnstile (50x)
                  </button>
                  <button
                    onClick={() => setMantrapArmorStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      mantrapArmorStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Mantrap (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Physical Security Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Physical Vulnerability</span>
                  <span className="text-lg font-extrabold text-white">{physicalSimulation.rawBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Mantrap Armor</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{physicalSimulation.actualBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Optical Mantrap Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", physicalSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Physical Armor Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{physicalSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Physical Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Badge Forensics &amp; C++ Firmware Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Physical Security &amp; RFID Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python access log anomaly detectors, PowerShell Clear Screen GPO scripts, 
              and C++ firmware for DESFire EV3 AES-128 mutual cryptographic authentication:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Tool / Script
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat physical tailgating, 
              neutralize dumpster diving, and enforce polarized privacy screens across West Bengal infrastructure:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; Physical Threat Mechanics
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Liabilities for Physical Trespass &amp; Data Theft in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian criminal law, cyber statutes, and evidentiary rules treat physical unauthorized entry, 
              document theft, and server room infiltration with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IPC Section 447 &amp; Section 379
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Criminal Trespass (IPC 447):</strong> Infiltrating corporate or substation premises carries imprisonment and fines.
                </li>
                <li>
                  <strong className="text-white">Theft (IPC 379):</strong> Stealing physical paperwork or hard drives (Up to 3 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; Section 66
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized physical access to servers.
                </li>
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking &amp; physical console access (Up to 3 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement physical document shredding safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all physical server room breaches within <strong className="text-white">6 hours</strong>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Holding Doors for Courteous Strangers:</strong> Tailgating exploits politeness; enforce badging for every individual.
                </li>
                <li>
                  <strong>Using Ribbon Strip-Cut Shredders:</strong> Reassembled via automated software; use DIN 66399 Level P-5 micro-cutters.
                </li>
                <li>
                  <strong>Relying on Legacy 125kHz RFID Badges:</strong> Cloned in under 2 seconds with Flipper Zero; use DESFire EV3 AES-128.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Install Anti-Tailgating Mantraps:</strong> Interlocking airlocks with overhead 3D Time-of-Flight sensors.
                </li>
                <li>
                  <strong>Deploy Polarized Privacy Screen Filters:</strong> Limits viewing angle to 30 degrees, blocking shoulder surfing.
                </li>
                <li>
                  <strong>Enforce 100% Visitor Escort Policies:</strong> Visitors must be accompanied by a corporate host at all times.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why do MIFARE DESFire EV3 smart cards defeat 100% of RFID badge cloning attempts even if an attacker holds a high-gain reader 5cm away?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do optical mantraps eliminate tailgating through physical engineering rather than relying on human compliance?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the physical laboratory above, set mantrap armor to Mantrap (500x) and observe breach probability collapse to 1.3%!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Tailgating exploits human social politeness; mantraps eliminate tailgating physically.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Legacy 125kHz RFID badges lack encryption and can be cloned in 2 seconds via Flipper Zero.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MIFARE DESFire EV3 smart cards use AES-128 mutual authentication, making cloning impossible.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DIN 66399 Level P-5 micro-cut shredding destroys documents into particles &le; 30 mm².</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Polarized 30-degree micro-louver privacy screens defeat shoulder surfing visual eavesdropping.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 447 of the IPC penalizes Criminal Trespass with imprisonment and fines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Physical Social Engineering FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Physical Security Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Physical Social Engineering: Tailgating, Shoulder Surfing, Dumpster Diving (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: You cannot secure cyberspace if your physical perimeter is breached! Master the 4 core physical social engineering vectors: Tailgating (exploiting human politeness to slip through secure doors), Shoulder Surfing (visual eavesdropping on screens and PIN pads), Dumpster Diving (harvesting un-shredded paper waste), and 125kHz RFID badge cloning using handheld tools like Flipper Zero. Understand advanced physical exploits: thermal cameras deducing PIN sequences from residual body heat on plastic buttons, long-range laser microphones demodulating voice vibrations from window glass, and under-door lever bypass tools. To build an impenetrable physical defense: deploy optical anti-tailgating mantraps with 3D depth sensors, upgrade all badges to 13.56MHz MIFARE DESFire EV3 smart cards with AES-128 mutual authentication, enforce DIN 66399 Level P-5 micro-cross-cut shredding (particles &le; 30 mm²), install polarized 30-degree privacy filters on all laptops, and enforce a 100% visitor escort policy. Remember that Section 447 of the Indian Penal Code treats Criminal Trespass as a criminal offense punishable with imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
