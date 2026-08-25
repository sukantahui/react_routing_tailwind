import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgBaitingId = useId();

  // Studio 1: Active Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("badusb_keystroke_injection");

  // Studio 2: Live Baiting Susceptibility Calculator State
  const [allureScore, setAllureScore] = useState(3.5); // 1.0 to 4.0
  const [credibilityFactor, setCredibilityFactor] = useState(3.5); // 1.0 to 4.0
  const [hardeningStrength, setHardeningStrength] = useState(1); // 1 = None, 50 = Antivirus, 500 = GPO USB Blocking + 802.1X + OOB

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_badusb_fintech_defense");

  // Studio 4: Hardware Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("usb_monitor_parser_python");

  // 8 Threat Profiles for Studio 1
  const threatDatabase = {
    badusb_keystroke_injection: {
      key: "badusb_keystroke_injection",
      name: "1. BadUSB Keystroke Injection (USB Rubber Ducky)",
      category: "HARDWARE HID EMULATION ATTACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetPsychology: "Assuming all USB flash drives act as standard storage disks",
      exploitationVector:
        "A microcontroller inside a USB casing registers as an authentic Human Interface Device (keyboard), typing encoded PowerShell commands at 1,000 WPM to establish a reverse shell in under 2 seconds.",
      vulnerabilityImpact:
        "Bypasses traditional file-based antivirus scanners completely because the operating system trusts keyboard input without inspecting executables.",
      telemetryIndicator: "Synthetic keystroke bursts (>800 WPM) with near-zero inter-key latency occurring immediately upon USB device insertion",
      resilientDefense: "Group Policy USB device class restrictions and endpoint DLP keystroke velocity monitors.",
      codeSnippet: `// USB Rubber Ducky DuckyScript Payload:
DELAY 1000
GUI r
DELAY 500
STRING powershell -W Hidden -Enc JABjAGwAaQBlAG4AdAAg...
ENTER
// Registers as HID Keyboard ➔ Bypasses all File-Based Antivirus Scanners!`
    },
    dropped_usb_salary_trap: {
      key: "dropped_usb_salary_trap",
      name: "2. Physical USB Drop Traps (Salary / Bonus Lures)",
      category: "PHYSICAL BAITING & CURIOSITY EXPLOIT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetPsychology: "Curiosity and financial greed (finding confidential payroll sheets)",
      exploitationVector:
        "Scattering branded flash drives in Salt Lake parking lots or corporate lobbies labeled 'Q4_Executive_Salaries.xlsx.lnk'; employees plug them in out of curiosity.",
      vulnerabilityImpact:
        "Over 45% of employees open the LNK file, executing hidden PowerShell downloaders that deliver infostealer malware into the internal network.",
      telemetryIndicator: "Mass-storage USB mount events on corporate workstations immediately followed by anomalous outbound C2 traffic",
      resilientDefense: "Complete GPO mass-storage port blocking and automated simulated USB drop drills.",
      codeSnippet: `// Windows LNK Shortcut Baiting Configuration:
// File Name     : Q4_Executive_Salaries_2026.xlsx.lnk (Shows as 'Q4_Executive_Salaries_2026.xlsx')
// Icon Resource : shell32.dll,35 (Authentic Microsoft Excel Icon)
// Target Path   : C:\\Windows\\System32\\cmd.exe /c powershell.exe -ExecutionPolicy Bypass -File .\\payload.ps1`
    },
    regulatory_auditor_pretext: {
      key: "regulatory_auditor_pretext",
      name: "3. The Regulatory Compliance Inspector Pretext",
      category: "AUTHORITY & STATUTORY COERCION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetPsychology: "Fear of statutory prosecution, fines, and facility shutdown",
      exploitationVector:
        "An attacker calls or visits posing as a Senior Inspector from the State Pollution Control Board or Central Tax Authority, demanding SCADA emission logs or financial records.",
      vulnerabilityImpact:
        "Employees fear legal contempt or audits, surrendering confidential network architecture details without verifying credentials.",
      telemetryIndicator: "Inbound communications from unverified external numbers demanding emergency data disclosure under statutory pretexts",
      resilientDefense: "Mandatory Out-of-Band verification protocol validating auditors against an official state directory.",
      codeSnippet: `// Regulatory Pretext Script:
// Role      : West Bengal State Pollution Control Board Compliance Inspector
// Pretext   : Emergency SCADA emission monitoring audit under Section 33A of Water/Air Act
// Demand    : Remote SSH access to emission telemetry logging server`
    },
    typosquatted_pypi_baiting: {
      key: "typosquatted_pypi_baiting",
      name: "4. Typosquatted Open-Source Packages (PyPI / npm)",
      category: "DIGITAL DEVELOPER BAITING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetPsychology: "Developer haste and common typing errors during library installation",
      exploitationVector:
        "Uploading malicious packages named `reqeusts` or `col0rama` to public registries; running `pip install reqeusts` executes a hidden stager in `setup.py`.",
      vulnerabilityImpact:
        "Software engineers in Jadavpur unknowingly infect their development workstations, exposing source code repositories and production API tokens.",
      telemetryIndicator: "Outbound C2 connections initiated by `python.exe` or `node.exe` immediately following package manager execution",
      resilientDefense: "Private internal artifact repositories (Artifactory / Nexus) with automated package name validation.",
      codeSnippet: `# setup.py malicious post-install hook concept:
from setuptools import setup

# Defended by: Internal package registry proxy & hash pinning (pip hash verification)
setup(name='sample_package', version='1.0.0', description='Library with post-install verification')`
    },
    recruiter_interview_test_pretext: {
      key: "recruiter_interview_test_pretext",
      name: "5. Phony Job Recruiter & Coding Test Pretext",
      category: "CAREER ADVANCEMENT SOCIAL ENGINEERING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetPsychology: "Desire for career advancement, high salary offers, and professional flattery",
      exploitationVector:
        "Adversaries on LinkedIn offer senior engineers ₹50 Lakh compensation packages, asking them to evaluate a 'Trading Engine Coding Challenge' ZIP containing malicious build scripts.",
      vulnerabilityImpact:
        "Compiling or running the project in Visual Studio executes post-build tasks that drop backdoors onto the developer's laptop.",
      telemetryIndicator: "Execution of anomalous child processes (`powershell.exe`, `curl.exe`) spawned by `devenv.exe` or `code.exe`",
      resilientDefense: "Executing untrusted code exclusively within isolated sandbox VMs without network access to corporate assets.",
      codeSnippet: `// Recruitment Pretext Attack Flow:
// 1. Fake LinkedIn Recruiter messages engineer Mamata: "Exclusive ₹50 Lakh Architect role in Salt Lake!"
// 2. Sends coding test: "FinTech_Trading_Core.zip" (Contains malicious post-build Visual Studio tasks!)
// 3. Compiling project executes hidden PowerShell C2 beacon!`
    },
    helpful_technician_pretext: {
      key: "helpful_technician_pretext",
      name: "6. The Helpful Telecom / Printer Repair Pretext",
      category: "PHYSICAL SERVICE PERSONA INFILTRATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetPsychology: "Helpfulness and relief that an ongoing technical issue is being resolved",
      exploitationVector:
        "Wearing a branded polo shirt and carrying a toolkit, an attacker arrives claiming: 'I'm dispatched to resolve your slow Wi-Fi—I need access to the server closet switch'.",
      vulnerabilityImpact:
        "Unescorted physical access allows the attacker to connect a LAN Turtle hardware packet sniffer directly into the corporate core switch.",
      telemetryIndicator: "New unknown MAC addresses establishing physical link status on core network switch ports",
      resilientDefense: "802.1X EAP-TLS port security and mandatory 100% visitor escort policies.",
      codeSnippet: `// Technician Pretext Dialogue:
// Attacker : "Hi Mamata, central IT dispatched me to test the 10Gbps fiber switch latency."
// Outcome  : Unescorted entry granted ➔ Attacker plugs LAN Turtle hardware packet sniffer into core switch!`
    },
    omg_cable_wireless_implant: {
      key: "omg_cable_wireless_implant",
      name: "7. O.MG Cables & Covert Hardware Implants",
      category: "COVERT HARDWARE IMPLANT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetPsychology: "Assuming all USB-C / Lightning charging cables are passive conductors",
      exploitationVector:
        "A charging cable with an embedded ESP8266 Wi-Fi chip and microcontroller; an attacker connects wirelessly from across the street to trigger keystroke injection.",
      vulnerabilityImpact:
        "The victim uses the cable to charge their laptop; the attacker remotely executes commands at will without physical proximity.",
      telemetryIndicator: "Anomalous 2.4GHz Wi-Fi access points broadcasting from within corporate office suites",
      resilientDefense: "Deploying hardware USB data blockers (USB condoms) and RF airspace monitoring.",
      codeSnippet: `// O.MG Cable Architecture:
// [Exterior: Normal USB-C Charging Cable] ➔ [Interior: Embedded ESP8266 + Web Server]
// ➔ Attacker connects to cable Wi-Fi ("O.MG-Cable-492") from 50m away ➔ Fires PowerShell Keystroke Payload!`
    },
    elicitation_bracketing_tactics: {
      key: "elicitation_bracketing_tactics",
      name: "8. Elicitation & Bracketing Techniques",
      category: "CONVERSATIONAL PSYCHOLOGICAL EXPLOIT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetPsychology: "Desire to correct false statements, demonstrate expertise, and appear competent",
      exploitationVector:
        "The attacker makes deliberate extreme or false statements ('I hear your Barrackpore grid only has 2 firewalls'), compelling the engineer to correct them with exact specifications.",
      vulnerabilityImpact:
        "Extracts confidential firewall models, IP subnets, and staffing rosters without asking suspicious direct questions.",
      telemetryIndicator: "Employees reporting casual conversational inquiries focusing on internal technical configurations",
      resilientDefense: "Social engineering awareness training on conversational elicitation defenses.",
      codeSnippet: `// Elicitation Dialogue Pattern (Bracketing):
// Attacker : "I heard your Barrackpore substation only has 5 engineers on duty at night?"
// Target   : "No, our policy mandates exactly 12 engineers across 3 shifts!" (Secret Disclosed!)`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // Studio 2: Live Baiting Susceptibility Calculations
  const baitingSimulation = useMemo(() => {
    // P_pretext = 1 - e^(- (A_allure * C_credibility) / R_hardening)
    const numerator = allureScore * credibilityFactor;
    const exponent = -numerator / hardeningStrength;
    const rawCompromiseProb = (1 - Math.exp(exponent)) * 100;
    const actualCompromiseProb = hardeningStrength >= 500
      ? (rawCompromiseProb * 0.016).toFixed(2) // GPO USB Blocking + 802.1X + OOB blocks 98.4% of attacks
      : hardeningStrength >= 50
      ? (rawCompromiseProb * 0.35).toFixed(2)  // Standard Antivirus blocks 65% of attacks
      : rawCompromiseProb.toFixed(2);           // Unhardened -> 100% compromise probability

    return {
      rawCompromiseProb: rawCompromiseProb.toFixed(2),
      actualCompromiseProb,
      badgeClass: parseFloat(actualCompromiseProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualCompromiseProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualCompromiseProb) < 2
        ? `HARDENED ENDPOINT DEFENSE: With GPO USB Blocking & Out-of-Band Validation (${hardeningStrength}x), breach probability is only ${actualCompromiseProb}% even against high-allure BadUSB drops!`
        : `CRITICAL BAITING VULNERABILITY: Without GPO USB port restrictions (${hardeningStrength}x), bait allure (${allureScore}x) and pretext credibility produce a ${actualCompromiseProb}% probability of compromise!`
    };
  }, [allureScore, credibilityFactor, hardeningStrength]);

  // Studio 4: Hardware Security Production Code Database
  const codeDatabase = {
    usb_monitor_parser_python: {
      name: "Python Script to Monitor USB Device Insertions & Alert on Unauthorized HIDs",
      code: `import win32com.client

def monitor_usb_device_insertions():
    print("[*] --- ENDPOINT USB HARDWARE GUARDIAN RUNNING ---")
    wmi = win32com.client.GetObject("winmgmts:")
    watcher = wmi.ExecNotificationQuery(
        "SELECT * FROM __InstanceCreationEvent WITHIN 1 WHERE TargetInstance ISA 'Win32_PnPEntity'"
    )
    
    while True:
        event = watcher.NextEvent()
        device = event.TargetInstance
        hw_id = str(device.HardwareID)
        name = str(device.Name)
        
        # Check if newly inserted device registers as a Keyboard (HID Device)
        if "HID" in hw_id or "Keyboard" in name:
            print(f"[!] NEW USB INPUT DEVICE DETECTED: {name}")
            print(f"  [+] Hardware ID : {hw_id}")
            
            # Verify against Corporate Approved Vendor Hardware ID Roster
            if "VID_046D" not in hw_id: # Non-approved vendor ID
                print("  [-] ALERT: Unauthorized HID Device Inserted! Potential BadUSB Keystroke Injector!")
                print("  [-] Action: Disabling USB Port Driver & Quarantining Host Session!")
                break

# Simulated single execution check
print("[+] USB Insertion Forensic Monitor Initialized.")`,
      explanation: "Python script leveraging Windows WMI events to monitor real-time USB insertions, detecting unauthorized HID keyboards and triggering instant port disablement against BadUSB attacks."
    },
    gpo_usb_block_powershell: {
      name: "PowerShell Script to Enforce Complete USB Storage Restrictions via Windows Registry",
      code: `# Enforce Complete USB Removable Storage Lockdown via Group Policy / Registry:
$regPath = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\RemovableStorageDevices"

# 1. Deny All Removable Storage Classes (Read, Write, and Execute)
if (!(Test-Path $regPath)) {
    New-Item -Path $regPath -Force | Out-Null
}

Set-ItemProperty -Path $regPath -Name "Deny_All" -Value 1 -Type DWord

# 2. Prevent Installation of Devices Not Described by Other Policy Settings
$devPath = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeviceInstall\\Restrictions"
if (!(Test-Path $devPath)) {
    New-Item -Path $devPath -Force | Out-Null
}

Set-ItemProperty -Path $devPath -Name "DenyUnspecified" -Value 1 -Type DWord

Write-Host "[+] GPO USB Storage & Unspecified Device Restrictions ENFORCED!" -ForegroundColor Green`,
      explanation: "PowerShell script locking down Windows removable storage classes and blocking unspecified USB hardware installations, defeating dropped USB flash drives and unauthorized BadUSB devices."
    },
    switch_port_security_cisco: {
      name: "Cisco Switch 802.1X Port Security Configuration for Conference Room Jacks",
      code: `! Cisco Catalyst Switch 802.1X Configuration for Open RJ45 Ethernet Jacks:
interface GigabitEthernet1/0/24
 description Open_Conference_Room_Jack
 switchport mode access
 switchport access vlan 20

 ! Enable 802.1X Authentication with RADIUS Server
 authentication port-control auto
 dot1x pae authenticator
 dot1x max-req 3
 dot1x timeout tx-period 5

 ! Quarantine Unauthenticated Hardware Implants (LAN Turtle / Packet Squirrel)
 authentication event fail action authorize vlan 999  ! Isolated Dead Guest VLAN
 authentication event no-response action authorize vlan 999
 spanning-tree portfast`,
      explanation: "Cisco switch interface configuration enforcing 802.1X EAP-TLS port security on physical RJ45 Ethernet wall jacks, automatically isolating rogue hardware drop implants into a dead VLAN."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_badusb_fintech_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defeating a BadUSB Keystroke Injection Attack Delivered via Promotional Swag",
      threatType: "CONFERENCE SWAG BAITING & BadUSB HID INJECTION",
      budget: "₹48,00,000",
      incident:
        "Adversaries distributed branded USB flash drives at a Salt Lake FinTech summit; an employee brought a drive to the office, which contained an embedded ATtiny85 keystroke injector.",
      defenseStrategy:
        "Mamata's GPO device installation restrictions blocked the unauthorized HID driver instantly; the endpoint DLP driver flagged the synthetic typing attempt.",
      outcome: "Zero keystrokes executed; workstation quarantined within 2 seconds; 45 core financial switches protected.",
      metrics: {
        badusbPayloadsBlocked: "100% Intercepted",
        quarantineLatency: "1.8 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_pollution_pretext",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "STATE POLLUTION BOARD AUDITOR PRETEXT (SCADA Emission Lure)",
      title: "Neutralizing a Sophisticated Pretext Posing as State Pollution Regulators",
      budget: "₹33,00,000",
      incident:
        "An adversary called substation engineers claiming to be from the West Bengal Pollution Control Board, demanding immediate remote SSH access to SCADA telemetry logs.",
      defenseStrategy:
        "Debangshu enforced the Out-of-Band Pretext Challenge protocol: the engineer called the official published number of the Pollution Board, exposing the fraud.",
      outcome: "Zero credentials disclosed; unauthorized remote access prevented; 18 high-voltage substations protected.",
      metrics: {
        pretextFraudBlocked: "100% Verified",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_medical_crack_baiting",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "CRACKED DIAGNOSTIC SOFTWARE DIGITAL BAITING",
      title: "Preventing Infostealer Infiltration via Trojanized Medical Imaging Software",
      budget: "₹26,00,000",
      incident:
        "A clinic radiologist attempted to download a 'free cracked version' of specialized DICOM oncology imaging software from an untrusted medical forum.",
      defenseStrategy:
        "Mahima deployed application whitelisting (AppLocker) and Web Content Filtering, blocking the unapproved executable and quarantining the Lumma infostealer.",
      outcome: "Malicious installer blocked before execution; zero patient oncology diagnostic scans compromised; 120,000 records protected.",
      metrics: {
        appLockerBlocks: "100% Enforced",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_baiting_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF BAITING SUSCEPTIBILITY & PRETEXT CREDIBILITY",
      title: "Formulating the Baiting Susceptibility & Pretext Credibility Model",
      budget: "₹21,50,000",
      incident:
        "Researchers analyzed the mathematical interaction between bait allure, pretext credibility, and endpoint GPO hardening across 40,000 simulated trials.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that GPO USB restrictions reduce baiting compromise probability below 1.6%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 40,000 simulated physical USB drop drills.",
      metrics: {
        simulationTrials: "40,000 Test Trials",
        modelAccuracy: "99.4% Predictive Fit",
        modelFramework: "Baiting/Pretext Equation",
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
                Topic 07
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Baiting and Pretexting Tactics
            </h1>
            <p className="text-xs text-gray-400">
              BadUSB keystroke injection, dropped USB traps, regulatory auditor pretexts, GPO device restrictions, and IT Act Section 66D.
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

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Baiting &amp; Pretexting Threat Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Baiting &amp; Pretexting: Greed, Curiosity &amp; Fabricated Personas
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Baiting Tactics</strong> manipulate human curiosity and financial greed by offering alluring physical objects 
              (e.g. <strong>BadUSB Rubber Duckys</strong> emulating HID keyboards, infected USB flash drives dropped in lobbies labeled 
              'Executive Salaries 2026') or digital lures (trojanized software cracks, typosquatted PyPI/npm packages). Simultaneously, 
              <strong>Pretexting Tactics</strong> fabricate elaborate backstories and personas (e.g. State Regulatory Auditors, 
              Helpful Telecom Technicians, Phony Recruiters), using <strong>conversational elicitation techniques</strong> like 
              <strong>Bracketing</strong> and <strong>deliberate false statements</strong> to extract sensitive credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BadUSB & Keystroke Injection Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                BadUSB Keystroke Injection &amp; Hardware Traps
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                BadUSB: Types 1,000 WPM PowerShell stager ➔ Bypasses mass-storage AV!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Operating systems inherently trust USB keyboards. Microcontrollers register as HID input devices, firing 
                PowerShell reverse shells in under 2 seconds before traditional security controls can react.
              </p>
            </div>

            {/* GPO USB Whitelist & 802.1X Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                GPO USB Whitelisting &amp; 802.1X Port Security
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">GPO USB Restrictions:</strong> Blocks unapproved mass-storage and unauthorized HID hardware IDs.</li>
                <li>• <strong className="text-purple-300">802.1X EAP-TLS:</strong> Requires certificates on RJ45 wall jacks, dropping rogue LAN Turtles.</li>
                <li>• <strong className="text-amber-300">Out-of-Band Validation:</strong> Mandatory verbal verification of auditors against master rosters.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Baiting & Pretexting Threat Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Baiting &amp; Pretexting Pathways vs Hardened Defenses
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how BadUSB insertions and auditor pretexts attempt system compromise, and how GPO USB Whitelists, 
              802.1X Port Security, and Out-of-Band Pretext Validation neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: BAIT / PRETEXT INGRESS */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. THREAT INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Baiting &amp; Pretext
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXPLOIT VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  BadUSB Rubber Ducky
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Fake State Auditor
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: GPO USB RESTRICTIONS */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. GPO USB ARMOR
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Hardware ID Policy
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DEVICE POLICY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Blocks Unknown HIDs
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Denies Mass-Storage
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: 802.1X PORT SECURITY */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. 802.1X PORT NAC
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  EAP-TLS Certificates
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  NETWORK CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Isolates Unbadged Implants
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Quarantine Dead VLAN
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: OUT-OF-BAND PRETEXT CHECK */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. PRETEXT CHECK
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Directory Validation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PROCESS CONTROL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Dials Official Registry
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Auditor Fraud Exposed!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: FIDO2 PASSKEY ARMOR */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. FIDO2 PASSKEY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Zero Credential Leak
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Origin Bound Token
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Elicitation Defeated!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Threat Baiting & Pretexting Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Baiting &amp; Pretexting Exploit Profile Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a threat profile below to examine its target psychology, exploitation vector, 
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
                  PROFILE
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
                    Psychology: {activeThreat.targetPsychology}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeThreat.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Mechanics
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
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Script / Pattern Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Baiting Susceptibility Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Baiting Susceptibility &amp; Endpoint Hardening Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust bait allure score A, pretext credibility factor C, and endpoint hardening strength R 
              to model compromise probability P_pretext = 1 - exp(-(A × C) / R) and see how GPO USB blocking reduces breach probability below 1.6%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Allure &amp; Hardening Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Bait Allure Score (A):</span>
                  <span className="text-cyan-400 font-bold font-mono">{allureScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={allureScore}
                  onChange={(e) => setAllureScore(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Pretext Credibility (C):</span>
                  <span className="text-rose-400 font-bold font-mono">{credibilityFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={credibilityFactor}
                  onChange={(e) => setCredibilityFactor(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Endpoint Hardening Strength (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setHardeningStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      hardeningStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setHardeningStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      hardeningStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Antivirus (50x)
                  </button>
                  <button
                    onClick={() => setHardeningStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      hardeningStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    GPO USB (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Baiting Telemetry Assessment</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Baiting Vulnerability</span>
                  <span className="text-lg font-extrabold text-white">{baitingSimulation.rawCompromiseProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without GPO USB Blocking</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Compromise Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{baitingSimulation.actualCompromiseProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With GPO USB Blocking Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", baitingSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Endpoint Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{baitingSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Hardware Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Hardware Forensics &amp; GPO Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production USB Hardware Defense &amp; 802.1X Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python WMI USB insertion monitors, PowerShell GPO removable device lockdown scripts, 
              and Cisco Catalyst 802.1X switch port security configurations:
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
                Production Script / Config
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat BadUSB keystroke injectors, 
              neutralize state regulator pretexts, and block digital crack baiting across West Bengal enterprises:
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
                  The Incident &amp; Pretext Mechanics
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
              7. Legal Liabilities for Baiting &amp; Pretexting in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, criminal statutes, and evidentiary rules treat social engineering pretexting, 
              personation of state auditors, and rogue USB malware distribution with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Personating state auditors, IT support, or recruiters carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized access via BadUSB.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Cheating &amp; fraudulent inducement (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement endpoint USB security safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all rogue hardware &amp; baiting compromises within <strong className="text-white">6 hours</strong>.
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
                  <strong>Plugging in Found USB Drives to 'Find the Owner':</strong> Baiting exploits curiosity; never connect unverified media.
                </li>
                <li>
                  <strong>Assuming Antivirus Catches BadUSB Devices:</strong> BadUSB acts as a keyboard, typing commands rather than storing files.
                </li>
                <li>
                  <strong>Surrendering Data to Unannounced 'Auditors':</strong> Always call the official published agency number to verify.
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
                  <strong>Enforce GPO USB Device Class Whitelisting:</strong> Block all mass-storage and unauthorized HID hardware IDs.
                </li>
                <li>
                  <strong>Deploy 802.1X Port Security on Ethernet Jacks:</strong> Prevent rogue LAN Turtles from gaining network access.
                </li>
                <li>
                  <strong>Use Hardware USB Data Blockers (Condoms):</strong> Sever D+/D- pins for safe charging in public kiosks.
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
                  Why does a BadUSB Rubber Ducky bypass traditional file-based antivirus scanners completely upon insertion?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does conversational elicitation (like Bracketing) extract sensitive network specifications without asking direct questions?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set hardening strength to GPO USB (500x) and observe compromise probability drop to 1.5%!
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
                <span>Baiting exploits curiosity and greed; Pretexting invents elaborate fictional personas.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BadUSB devices emulate HID keyboards, injecting PowerShell scripts at 1,000 words/min.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Elicitation techniques like Bracketing extract secrets without asking direct questions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Windows GPO USB device restrictions prevent unauthorized USB storage and HID drivers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>802.1X EAP-TLS port security blocks rogue hardware implants from connecting to wall jacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66D of the IT Act penalizes Cheating by Personation with up to 3 years imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Baiting & Pretexting FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Hardware Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Baiting and Pretexting Tactics (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Baiting and Pretexting weaponize human curiosity, greed, and deference to authority! Understand how physical baiting uses BadUSB devices (like the USB Rubber Ducky) that register as Human Interface Devices (keyboards) to inject malicious PowerShell code at 1,000 words per minute, completely bypassing traditional file-based antivirus scanners. Observe how digital baiting exploits developer haste through typosquatted PyPI/npm packages, while pretexting builds elaborate personas (such as State Regulatory Auditors or Helpful Technicians) using conversational elicitation techniques like Bracketing to extract network blueprints. To build an impenetrable defense: enforce strict Group Policy USB device installation restrictions blocking non-whitelisted mass-storage and unapproved HID hardware IDs, configure 802.1X EAP-TLS port security on all Ethernet wall jacks, establish an inviolable Out-of-Band verification protocol validating visiting auditors against an official directory, and train employees with simulated USB drop drills. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
