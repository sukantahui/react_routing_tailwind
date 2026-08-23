import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import aaaEnginePy from "./topic0_files/aaa_radius_tacacs_engine.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgFlowId = useId();
  const svgAbacId = useId();

  // =========================================================================
  // STUDIO 1 STATE: INTERACTIVE AAA PROTOCOL PACKET FLOW
  // =========================================================================
  const [selectedProtocol, setSelectedProtocol] = useState("radius"); // "radius", "tacacs", "diameter"
  const [activePacketStep, setActivePacketStep] = useState(1);

  const protocolDetails = {
    radius: {
      name: "RADIUS (Remote Authentication Dial-In User Service)",
      rfc: "RFC 2865 (Auth) / RFC 2866 (Acct)",
      transport: "UDP Port 1812 (Authentication) & Port 1813 (Accounting)",
      architecture: "Combines Authentication and Authorization into a single response packet",
      encryption: "Partial: Encrypts ONLY the User-Password attribute (MD5 XOR stream)",
      useCase: "802.1X Port Access, Corporate Wi-Fi (WPA2/WPA3 Enterprise), VPN Concentrators",
      steps: [
        {
          step: 1,
          sender: "Supplicant (Susmita's Laptop)",
          receiver: "NAS / Switch Authenticator",
          packet: "EAPoL-Start / EAP-Response/Identity",
          desc: "Client initiates connection on Ethernet switch port or Wi-Fi AP."
        },
        {
          step: 2,
          sender: "NAS / Authenticator",
          receiver: "FreeRADIUS Server",
          packet: "RADIUS Access-Request (Code 1)",
          desc: "Switch forwards credentials and NAS port attributes to RADIUS over UDP 1812."
        },
        {
          step: 3,
          sender: "FreeRADIUS Server",
          receiver: "NAS / Authenticator",
          packet: "RADIUS Access-Accept (Code 2) + VLAN 100",
          desc: "Server validates credentials, binds authorization attributes, and assigns Treasury VLAN."
        },
        {
          step: 4,
          sender: "NAS / Authenticator",
          receiver: "FreeRADIUS Server",
          packet: "RADIUS Accounting-Request (Status-Type=Start)",
          desc: "Switch opens data port and begins session accounting audit trail."
        }
      ],
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    tacacs: {
      name: "TACACS+ (Terminal Access Controller Access-Control System Plus)",
      rfc: "RFC 8907 (IETF Standard)",
      transport: "TCP Port 49 (Reliable Connection-Oriented Transport)",
      architecture: "Completely separates Authentication, Authorization, and Accounting into 3 independent processes",
      encryption: "Full: Encrypts the ENTIRE packet payload under shared secret",
      useCase: "Router and Switch Device Administration (Cisco IOS / Junos CLI Management)",
      steps: [
        {
          step: 1,
          sender: "Administrator (Debangshu)",
          receiver: "Core Switch",
          packet: "SSH Login Session Initialized",
          desc: "Admin establishes management terminal to core switch."
        },
        {
          step: 2,
          sender: "Core Switch",
          receiver: "TACACS+ Server",
          packet: "TACACS+ Authentication-Start / Reply",
          desc: "Switch verifies admin password via fully encrypted TCP 49 packet."
        },
        {
          step: 3,
          sender: "Core Switch",
          receiver: "TACACS+ Server",
          packet: "TACACS+ Authorization-Request (Per-Command)",
          desc: "Admin types 'erase startup-config'. Switch queries TACACS+ before executing command."
        },
        {
          step: 4,
          sender: "TACACS+ Server",
          receiver: "Core Switch",
          packet: "TACACS+ Authorization-Reply (STATUS_FAIL ❌)",
          desc: "TACACS+ denies command execution; switch rejects command and logs forensic alert."
        }
      ],
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    diameter: {
      name: "Diameter Protocol (Next-Gen AAA)",
      rfc: "RFC 6733 (Base Protocol)",
      transport: "TCP or SCTP Port 3868 (Multi-homed Reliable Transport)",
      architecture: "Modular peer-to-peer AAA framework with 32-bit Attribute-Value Pair (AVP) address space",
      encryption: "Native TLS and IPsec End-to-End Transport Encryption",
      useCase: "4G/5G Mobile Telecom Cores (IMS, LTE EPC, 5G AKA), Roaming Subscriber Billing",
      steps: [
        {
          step: 1,
          sender: "5G User Equipment / gNodeB",
          receiver: "Access & Mobility Function (AMF)",
          packet: "Registration Request (5G-GUTI / SUCI)",
          desc: "Mobile subscriber requests connection to cellular core network."
        },
        {
          step: 2,
          sender: "AMF / Core Gateway",
          receiver: "Authentication Server Function (AUSF)",
          packet: "Diameter-EAP-Request (DER)",
          desc: "Transmits subscriber authentication vector over SCTP/TLS port 3868."
        },
        {
          step: 3,
          sender: "AUSF / UDM",
          receiver: "AMF / Core Gateway",
          packet: "Diameter-EAP-Answer (DEA) + Session Keys",
          desc: "Returns 5G AKA cryptographic vectors and quality of service (QoS) profiles."
        },
        {
          step: 4,
          sender: "AMF / Core Gateway",
          receiver: "Charging Function (CHF)",
          packet: "Diameter Credit-Control-Request (CCR)",
          desc: "Opens real-time unmetered prepaid data billing session."
        }
      ],
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    }
  };

  const currentProto = protocolDetails[selectedProtocol];
  const currentStep = currentProto.steps[activePacketStep - 1] || currentProto.steps[0];

  // =========================================================================
  // STUDIO 2 STATE: RBAC VS ABAC ACCESS CONTROL POLICY SANDBOX
  // =========================================================================
  const [selectedRole, setSelectedRole] = useState("SecOps_Lead"); // "SecOps_Lead", "Junior_Auditor", "Intern"
  const [selectedResource, setSelectedResource] = useState("treasury_ledger"); // "treasury_ledger", "public_bulletin"
  const [timeHour, setTimeHour] = useState(14); // 0 to 23
  const [isInternalSubnet, setIsInternalSubnet] = useState(true);
  const [isDeviceCompliant, setIsDeviceCompliant] = useState(true);

  const abacEvaluation = useMemo(() => {
    const isWorkHours = timeHour >= 9 && timeHour <= 18;
    const isTreasury = selectedResource === "treasury_ledger";

    if (isTreasury) {
      if (selectedRole === "Intern") {
        return {
          verdict: "DENIED (RBAC & ABAC Failure)",
          reason: "Role 'Intern' has zero privilege level for municipal treasury ledgers.",
          decision: "DENY ❌",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
        };
      }
      if (!isWorkHours) {
        return {
          verdict: "DENIED (Environmental Context - Time Restriction)",
          reason: `Treasury access prohibited at ${timeHour}:00. Policy permits access strictly during business hours (09:00 - 18:00).`,
          decision: "DENY ❌",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
        };
      }
      if (!isInternalSubnet) {
        return {
          verdict: "DENIED (Environmental Context - Subnet Violation)",
          reason: "Access to financial databases restricted exclusively to internal Barrackpore SOC subnet (10.14.0.0/16).",
          decision: "DENY ❌",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
        };
      }
      if (!isDeviceCompliant) {
        return {
          verdict: "DENIED (Zero-Trust Endpoint Posture Failure)",
          reason: "Endpoint device failed posture health check (missing antivirus/EDR agent or unencrypted disk).",
          decision: "DENY ❌",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
        };
      }
      return {
        verdict: "PERMITTED (All ABAC Context Attributes Satisfied)",
        reason: `Subject '${selectedRole}' authorized. Time (${timeHour}:00), Internal IP (10.14.0.50), and Compliant Device verified.`,
        decision: "PERMIT ✔",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    } else {
      // Public bulletin
      return {
        verdict: "PERMITTED (Public Read-Only Resource)",
        reason: "Resource 'public_bulletin' is accessible to all authenticated roles regardless of time or subnet.",
        decision: "PERMIT ✔",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    }
  }, [selectedRole, selectedResource, timeHour, isInternalSubnet, isDeviceCompliant]);

  // =========================================================================
  // STUDIO 3 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_nac");

  const regionalDrills = {
    barrackpore_nac: {
      id: "barrackpore_nac",
      title: "Barrackpore Municipal Hub: 802.1X Network Access Control",
      location: "350 municipal workstations and treasury switch infrastructure",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Unauthorized contractor laptops plugged into open wall Ethernet jacks in municipal offices, attempting to snoop on unsegmented network traffic.",
      solution:
        "Configured 802.1X Port-Based Network Access Control with FreeRADIUS and EAP-TLS. Unauthenticated ports drop all packets; dynamic VLAN steering moves authorized laptops to Treasury VLAN 100.",
      outcome:
        "100% rogue device prevention; physical Ethernet ports locked down; automated accounting logs record all plug-in events."
    },
    ichapur_defense_tacacs: {
      id: "ichapur_defense_tacacs",
      title: "Ichapur Defense Facility: TACACS+ Command-Level Authorization",
      location: "Mission-critical core routing and satellite uplink switches",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Junior operators executing unauthorized configuration modifications and accidental router reboot commands during active defense exercises.",
      solution:
        "Deployed Cisco TACACS+ with per-command authorization over TCP 49. Commands like `reload`, `erase`, and `no router bgp` are restricted exclusively to Level 15 Chief Architects.",
      outcome:
        "Zero unauthorized configuration changes; real-time command accounting logs forwarded to immutable central SIEM."
    },
    kolkata_fintech_diameter: {
      id: "kolkata_fintech_diameter",
      title: "Salt Lake Sector V FinTech: Diameter 5G Core Subscriber Gateway",
      location: "High-volume mobile banking authentication core processing 50,000 req/sec",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Legacy RADIUS servers suffered packet drops during peak banking hours due to UDP buffer saturation and unencrypted billing metadata.",
      solution:
        "Migrated to Diameter over multi-homed SCTP with TLS 1.3 encapsulation, 32-bit AVP credit-control dictionaries, and automated peer failover.",
      outcome:
        "Zero packet loss during peak transaction spikes; 100% encrypted subscriber billing and multi-factor session accounting."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_005 • Topic 0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Authentication, Authorization &amp; Accounting (AAA Framework)
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the enterprise AAA security triad: RADIUS (RFC 2865/2866), TACACS+ (RFC 8907), Diameter (RFC 6733),
            802.1X Port-Based Network Access Control, and dynamic Attribute-Based Access Control (ABAC).
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Authentication (AuthN)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Authorization (AuthZ)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Accounting (AuthAcct)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              RADIUS vs TACACS+ vs Diameter
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              802.1X &amp; Dynamic ABAC
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SCOPED INLINE KEYFRAME ANIMATIONS */}
        {/* ========================================================================= */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🏛️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Enterprise AAA Security Triad
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how Authentication, Authorization, and Accounting form the foundation of identity governance and access control
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In government, defense, and banking networks across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, access control is governed by the <strong className="text-white">AAA Framework</strong>.
              Every connection request must verify the subject's identity (<strong className="text-cyan-300">Authentication</strong>),
              evaluate policy permissions (<strong className="text-indigo-300">Authorization</strong>), and generate an immutable audit trail (<strong className="text-emerald-300">Accounting</strong>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔑</span> 1. Authentication (AuthN)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "Who are you?" Validates identity using digital certificates (EAP-TLS), passwords, hardware security keys (FIDO2), or biometrics.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 2. Authorization (AuthZ)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "What can you do?" Determines granular privileges, dynamic VLAN steering, and per-command execution rights via RBAC/ABAC.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>📜</span> 3. Accounting (AuthAcct)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "What did you do?" Records session start/stop times, bytes transferred, and executed commands for non-repudiation and forensic audits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE AAA PROTOCOL PACKET FLOW */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔄
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive AAA Protocol Packet Flow Visualizer
                </h2>
                <p className="text-sm text-slate-400">
                  Trace packet interactions and encryption boundaries for RADIUS (UDP 1812), TACACS+ (TCP 49), and Diameter (SCTP 3868)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {Object.keys(protocolDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedProtocol(key);
                    setActivePacketStep(1);
                  }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all uppercase",
                    selectedProtocol === key
                      ? "bg-cyan-950 border-cyan-500 text-white shadow-md shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* 4-Step Progression Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {currentProto.steps.map((stg) => {
              const isActive = activePacketStep === stg.step;
              return (
                <button
                  key={stg.step}
                  onClick={() => setActivePacketStep(stg.step)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{stg.packet.split(" (")[0]}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Step #{stg.step}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentProto.name}</h3>
                <span className="text-[11px] text-slate-400 font-sans">{currentProto.transport} • {currentProto.rfc}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentProto.badgeColor)}>
                Step #{activePacketStep} / 4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400 font-sans">Sender:</div>
                <div className="text-white">{currentStep.sender}</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400 font-sans">Receiver:</div>
                <div className="text-white">{currentStep.receiver}</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 font-sans">Wire Packet:</div>
                <div className="text-emerald-300 font-bold">{currentStep.packet}</div>
              </div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1 text-[11px] font-sans">
              <div className="text-slate-400">Step Explanation:</div>
              <p className="text-slate-200 leading-relaxed">{currentStep.desc}</p>
              <div className="text-[10px] text-cyan-400 pt-1 font-mono">Encryption Scope: {currentProto.encryption}</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: DYNAMIC ABAC VS RBAC POLICY EVALUATION SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚖️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Dynamic Attribute-Based Access Control (ABAC) Policy Engine
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate real-time policy decisions evaluating Subject, Object, Action, Time, Subnet, and Zero-Trust device health
                </p>
              </div>
            </div>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", abacEvaluation.badgeColor)}>
              Verdict: {abacEvaluation.decision}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Context Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold">1. Subject Role:</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-cyan-300 font-mono text-xs focus:outline-none"
                >
                  <option value="SecOps_Lead">SecOps_Lead (Full Clearance)</option>
                  <option value="Junior_Auditor">Junior_Auditor (Read Only)</option>
                  <option value="Intern">Intern (Restricted)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold">2. Target Resource:</label>
                <select
                  value={selectedResource}
                  onChange={(e) => setSelectedResource(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-cyan-300 font-mono text-xs focus:outline-none"
                >
                  <option value="treasury_ledger">Municipal Treasury Ledger (High Sensitivity - ₹85,00,000)</option>
                  <option value="public_bulletin">Public Municipal Notice Board (Low Sensitivity)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold">3. Access Time: {timeHour}:00 hrs</label>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={timeHour}
                  onChange={(e) => setTimeHour(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500">Business Hours: 09:00 - 18:00</span>
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={isInternalSubnet}
                  onChange={(e) => setIsInternalSubnet(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Internal Subnet (10.14.0.0/16)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={isDeviceCompliant}
                  onChange={(e) => setIsDeviceCompliant(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Zero-Trust Device Posture Compliant (Disk Encrypted + EDR Active)</span>
              </label>
            </div>

            {/* Verdict Display */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", abacEvaluation.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>⚡ Policy Decision Point (PDP) Verdict:</span>
                <span>{abacEvaluation.verdict}</span>
              </div>
              <p className="opacity-90 font-sans text-[11px]">
                {abacEvaluation.reason}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: REGIONAL SOC DRILLS & FREERADIUS CLI LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Regional SOC Case Studies &amp; FreeRADIUS Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world AAA deployments in West Bengal and inspect live `radtest` authentication audits
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Forensic Lab
            </span>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(regionalDrills).map(([key, drill]) => {
              const isActive = activeDrillKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-2",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.engineers}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{currentDrill.title}</h3>
                <p className="text-xs text-slate-400">Location: {currentDrill.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                Engineers: {currentDrill.engineers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Access Control Challenge:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> AAA Architecture Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux radtest Terminal Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (Testing 802.1X RADIUS Authentication)</span>
                <span className="text-cyan-400">radtest susmita</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">$ radtest susmita Password123 10.14.0.50 0 BarrackporeRadiusSecret2026</span></div>
                <div>Sending Access-Request of id 1 to 10.14.0.50 port 1812</div>
                <div>    User-Name = "susmita"</div>
                <div>    NAS-IP-Address = 10.14.0.1</div>
                <div>    NAS-Port = 0</div>
                <div>rad_recv: <span className="text-emerald-300 font-bold">Access-Accept packet from host 10.14.0.50 port 1812, id=1, length=44</span></div>
                <div>    Tunnel-Type = VLAN (13)</div>
                <div>    Tunnel-Medium-Type = 802 (6)</div>
                <div>    Tunnel-Private-Group-Id = <span className="text-cyan-300">"100" (Dynamic Treasury VLAN Steering Successful ✔)</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>⚠️</span> Common Pitfalls &amp; Traps
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Reusing RADIUS Shared Secrets:</strong> Using the same pre-shared key across hundreds of switches allows physical compromise of one switch to break encryption across the whole network.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Relying on MS-CHAPv2:</strong> MS-CHAPv2 relies on crackable DES/NT hashes. Migrate all 802.1X networks to certificate-based EAP-TLS.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Neglecting AAA Accounting:</strong> Deploying authentication without accounting leaves organizations with zero forensic visibility into what users did during active sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Assuming RADIUS Encrypts Everything:</strong> Standard RADIUS encrypts only the password attribute. Headers, usernames, and attributes travel in cleartext unless RadSec (TLS) is used.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>🛡️</span> Production Best Practices
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span><strong>Standardize on EAP-TLS for 802.1X:</strong> Uses hardware-backed X.509 client certificates, eliminating passwords and password-cracking attacks completely.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Enforce TACACS+ for Router Administration:</strong> Provides granular per-command authorization and full packet payload encryption over TCP 49.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Implement Dynamic ABAC:</strong> Evaluate environmental context (time, location, device health) alongside user roles to enforce Zero-Trust principles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Enable Accounting Interim-Updates:</strong> Prevents phantom orphaned sessions and ensures accurate billing and audit logging even during abrupt power outages.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why is TACACS+ preferred over RADIUS for router administration? Because TACACS+ checks every single command typed by an admin before execution,
                whereas RADIUS only checks the login password once at the start of the session!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Authentication = "Who are you?", Authorization = "What can you do?", Accounting = "What did you do?".</li>
                <li>RADIUS uses UDP (1812/1813); TACACS+ uses TCP (49); Diameter uses TCP/SCTP (3868).</li>
                <li>TACACS+ encrypts the entire packet; RADIUS encrypts only the password attribute.</li>
                <li>802.1X consists of Supplicant, Authenticator, and Authentication Server.</li>
                <li>ABAC evaluates dynamic context (time, subnet, device posture) alongside RBAC roles.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on AAA Protocol &amp; ABAC Policy Engine Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating RADIUS access flows, TACACS+ per-command authorization, and dynamic ABAC evaluation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={aaaEnginePy}
            title="aaa_radius_tacacs_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Authentication, Authorization &amp; Accounting (AAA Framework) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the three distinct pillars of AAA (Authentication, Authorization, Accounting). Be prepared to draw a clear comparative table between RADIUS (UDP 1812/1813, combined AuthN/AuthZ, partial encryption) and TACACS+ (TCP 49, decoupled services, full encryption, per-command authorization). Explain the 3 entities in 802.1X (Supplicant, Authenticator, Authentication Server) and contrast RBAC with dynamic Attribute-Based Access Control (ABAC) for full marks!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: AAA Security Framework Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 0 Note"
            downloadFileName="topic0_aaa_framework_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
