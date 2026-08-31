import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Buffer Overflow Memory Step State
  const [bofStepIndex, setBofStepIndex] = useState(0);

  // Studio 2: Hashcat Cracking Engine State
  const [selectedHashKey, setSelectedHashKey] = useState("ntlm_hash");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_bof");

  // Buffer Overflow 5-Step Simulation Data for Studio 1
  const bofSteps = [
    {
      step: 1,
      title: "1. Normal Function Execution (Clean Stack)",
      eipValue: "0x08048450 (main+24)",
      espValue: "0x0012FF40",
      ebpValue: "0x0012FF80",
      cpuStatus: "Executing legitimate program instructions normally.",
      stackState: [
        { label: "Return Address (Saved EIP)", hex: "0x08048450", color: "border-indigo-700 bg-indigo-950/80 text-indigo-300" },
        { label: "Saved Base Pointer (EBP)", hex: "0x0012FF80", color: "border-gray-700 bg-gray-900 text-gray-300" },
        { label: "Stack Canary (fs:0x28)", hex: "0x3F8A21B4", color: "border-emerald-700 bg-emerald-950/80 text-emerald-300" },
        { label: "Local Buffer[64]", hex: "0x00000000 (Empty)", color: "border-gray-700 bg-gray-900 text-gray-400" }
      ],
      description: "Memory is uncorrupted. The function finishes its work, executes the RET instruction, and pops the saved return address (0x08048450) into EIP to return to the calling function."
    },
    {
      step: 2,
      title: "2. Input Fuzzing (Buffer Limit Exceeded)",
      eipValue: "0x08048450",
      espValue: "0x0012FF40",
      ebpValue: "0x0012FF80",
      cpuStatus: "Attacker transmits 2,000 bytes of 'A' (\x41) into a 64-byte array.",
      stackState: [
        { label: "Return Address (Saved EIP)", hex: "0x08048450 (Targeted)", color: "border-rose-700 bg-rose-950/80 text-rose-300 animate-pulse" },
        { label: "Saved Base Pointer (EBP)", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" },
        { label: "Stack Canary (Corrupted!)", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" },
        { label: "Local Buffer[64]", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" }
      ],
      description: "Unchecked strcpy() overflows past the 64-byte boundary, spilling into the stack canary and saved base pointer (EBP) with repeated 0x41 ('A') bytes."
    },
    {
      step: 3,
      title: "3. Controlling EIP (Saved Return Address Overwritten)",
      eipValue: "0x42424242 ('BBBB')",
      espValue: "0x0012FF88",
      ebpValue: "0x41414141",
      cpuStatus: "CRASH: CPU attempts to execute instructions at invalid address 0x42424242!",
      stackState: [
        { label: "Return Address (Saved EIP)", hex: "0x42424242 ('BBBB')", color: "border-rose-500 bg-rose-950 text-white font-bold" },
        { label: "Saved Base Pointer (EBP)", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" },
        { label: "Stack Canary", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" },
        { label: "Local Buffer[64]", hex: "0x41414141 ('AAAA')", color: "border-rose-800 bg-rose-900/40 text-rose-200" }
      ],
      description: "Using pattern_offset.rb, the exact byte offset (e.g. 2,006 bytes) is identified. The attacker writes 4 bytes of 'B' (\x42\x42\x42\x42) precisely over the saved return address. We now have 100% control of the CPU Instruction Pointer!"
    },
    {
      step: 4,
      title: "4. JMP ESP Trampoline Redirection",
      eipValue: "0x625011AF (JMP ESP in essfunc.dll)",
      espValue: "0x0012FF88 → Points to Payload",
      ebpValue: "0x41414141",
      cpuStatus: "CPU executes JMP ESP instruction, jumping directly to stack pointer in RAM!",
      stackState: [
        { label: "Return Address (Saved EIP)", hex: "0x625011AF (JMP ESP)", color: "border-cyan-500 bg-cyan-950 text-cyan-200 font-bold" },
        { label: "Saved Base Pointer (EBP)", hex: "0x41414141 ('AAAA')", color: "border-gray-800 bg-gray-900 text-gray-400" },
        { label: "Stack Canary", hex: "0x41414141 ('AAAA')", color: "border-gray-800 bg-gray-900 text-gray-400" },
        { label: "Local Buffer[64]", hex: "0x41414141 ('AAAA')", color: "border-gray-800 bg-gray-900 text-gray-400" }
      ],
      description: "Instead of hardcoding a fluctuating stack address, the attacker overwrites EIP with the address of a static 'JMP ESP' instruction (\xff\xe4) found in a non-ASLR DLL. The CPU jumps to JMP ESP, which instantly redirects execution to ESP."
    },
    {
      step: 5,
      title: "5. NOP Sled Slide & Shellcode Execution",
      eipValue: "0x0012FF88 → 0x0012FFA8 (Shellcode)",
      espValue: "0x0012FFA8",
      ebpValue: "0x41414141",
      cpuStatus: "SUCCESS: CPU executes NOP instructions and jumps into diagnostic test payload!",
      stackState: [
        { label: "Injected Test Payload", hex: "0x90 0x90 0xCC 0xCC...", color: "border-emerald-500 bg-emerald-950 text-emerald-200 font-bold" },
        { label: "NOP Sled (32 x 0x90)", hex: "0x90 0x90 0x90 0x90...", color: "border-amber-500 bg-amber-950 text-amber-200 font-bold" },
        { label: "Return Address (Saved EIP)", hex: "0x625011AF (JMP ESP)", color: "border-cyan-500 bg-cyan-950 text-cyan-200" },
        { label: "Overflow Padding", hex: "0x41414141 ('A' * 2006)", color: "border-gray-800 bg-gray-900 text-gray-400" }
      ],
      description: "The CPU slides down the NOP sled runway and executes the injected test instructions in memory space."
    }
  ];

  const currentBofStep = bofSteps[bofStepIndex];

  // Hashcat Cracking Engine Data for Studio 2
  const hashcatData = {
    ntlm_hash: {
      key: "ntlm_hash",
      name: "NTLM Hash (Windows SAM / LSASS)",
      modeId: "-m 1000",
      sampleHash: "8846f7eaee8fb117ad06bdd830b7586c",
      crackingSpeedGpu: "85.4 Billion Hashes/sec (RTX 4090)",
      attackStrategy: "Dictionary Attack + best64.rule mangling rules",
      saltPolicy: "UNSALTED: Vulnerable to instant Pass-the-Hash and fast offline cracking.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      syntax: "hashcat -m 1000 -a 0 ntlm.txt rockyou.txt -r rules/best64.rule"
    },
    sha256_hash: {
      key: "sha256_hash",
      name: "SHA-256 Hash (Unsalted Database Dump)",
      modeId: "-m 1400",
      sampleHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      crackingSpeedGpu: "12.2 Billion Hashes/sec (RTX 4090)",
      attackStrategy: "Combinator / Mask Attack (?u?l?l?l?d?d?s)",
      saltPolicy: "Fast general-purpose algorithm; MUST use Argon2id/Bcrypt for password storage.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      syntax: "hashcat -m 1400 -a 3 sha256.txt ?u?l?l?l?d?d?d?s"
    },
    netntlmv2_hash: {
      key: "netntlmv2_hash",
      name: "NetNTLMv2 Network Response Hash",
      modeId: "-m 5600",
      sampleHash: "mamata::FINTECH:1122334455667788:A9C8B7E6F5...:0101000000000000...",
      crackingSpeedGpu: "4.8 Billion Hashes/sec (RTX 4090)",
      attackStrategy: "Targeted Wordlist + OneRuleToRuleThemAll",
      saltPolicy: "Includes Server Challenge Nonce; CANNOT be used for Pass-the-Hash, must crack offline.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      syntax: "hashcat -m 5600 -a 0 netntlmv2.txt rockyou.txt"
    },
    kerberos_tgs: {
      key: "kerberos_tgs",
      name: "Kerberos 5 TGS-REP Ticket (Kerberoasting)",
      modeId: "-m 13100",
      sampleHash: "$krb5tgs$23$*MSSQLSvc/db01.fintech.co.in*$FINTECH.CO.IN*...",
      crackingSpeedGpu: "1.9 Billion Hashes/sec (RTX 4090)",
      attackStrategy: "Hybrid Wordlist + Mask Attack on Service Account Passwords",
      saltPolicy: "Encrypted with Service Account NTLM key; enforce 25+ character passwords.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      syntax: "hashcat -m 13100 -a 0 tgs_tickets.txt rockyou.txt"
    }
  };

  const activeHash = hashcatData[selectedHashKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_bof",
      lead: "Mamata",
      role: "Lead Security Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "C++ Banking Settlement Daemon Hardening",
      budget: "₹9,50,000",
      flawType: "Stack Buffer Overflow in C++ Settlement Parser",
      dilemma:
        "A legacy transaction processing daemon written in C++ used unsafe `strcpy()` buffers, allowing attackers to overwrite EIP and execute remote shellcode.",
      resolution:
        "Mamata identified the vulnerable stack frame in GDB, replaced unsafe functions with `strncpy()`, and recompiled the codebase with `-fstack-protector-all -Wl,-z,relro,-z,now` compiler flags.",
      metrics: {
        vulnerabilitiesPatched: "1 Critical Buffer Overflow",
        compilerProtections: "Full RELRO, Stack Canaries, NX",
        financialSafety: "₹0 Settlement Transaction Risk",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_spray",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Enterprise Active Directory Password Spraying Audit",
      budget: "₹5,20,000",
      flawType: "Credential Password Spraying against OWA",
      dilemma:
        "Hospital staff accounts were susceptible to simple seasonal password guessing on the OWA webmail portal without triggering lockout thresholds.",
      resolution:
        "Mahima conducted an authorized password spray testing `Spring2026!` across 500 usernames, discovering 14 compromised accounts, enforcing 16-character passphrases, and deploying FIDO2 hardware passkeys.",
      metrics: {
        staffAccountsTested: "500 Clinical Usernames",
        compromisedAccountsFound: "14 Weak Passwords Rotated",
        lockoutsTriggered: "0 Lockouts (1 Spray/User)",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_mem",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Firmware Memory Corruption Defense",
      budget: "₹8,80,000",
      flawType: "Integer Overflow in Modbus Parser Firmware",
      dilemma:
        "Embedded 220kV substation RTU Modbus packet parsers lacked ASLR and DEP memory protections, creating a risk of physical switchgear manipulation.",
      resolution:
        "Debangshu audited firmware binaries using Ghidra, patched an integer overflow in the packet length calculation, and deployed hardware memory protection units (MPUs) across all substation controllers.",
      metrics: {
        rtuFirmwareAudited: "16 Substation Controllers",
        memoryFlawsEliminated: "100% Integer Overflows Patched",
        hardwareEnforcement: "Hardware MPU Memory Isolation",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_debugger",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Immunity Debugger & Mona.py Exploitation Lab",
      budget: "₹4,00,000",
      flawType: "x86 Binary Exploitation & Shellcode Development",
      dilemma:
        "Teaching university students how to step through x86 assembly, calculate EIP overwrite offsets, and strip bad characters in a safe virtual lab.",
      resolution:
        "The team built a hands-on laboratory with Immunity Debugger and Mona.py, guiding 140+ students through finding `JMP ESP` instructions, stripping bad characters, and analyzing payload buffers.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        toolsMastered: "Immunity Debugger, Mona.py, GDB",
        exploitPoCsDeveloped: "4 Working x86 Exploit Scripts",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_003 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            System Exploitation, Buffer Overflows, and Credential Attacks
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct low-level binary exploitation and modern credential recovery: master x86 CPU register architecture, 
            EIP redirection via JMP ESP, NOP sled mechanics, alongside GPU-accelerated Hashcat cracking and password spraying defense.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Stack Buffer Overflow Memory Debugger & EIP Hijack Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧠</span> Studio 1: Stack Buffer Overflow &amp; EIP Control Debugger
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 5 phases of a classic x86 stack buffer overflow: inspect CPU registers (EIP, ESP, EBP), stack memory corruption, JMP ESP trampoline jumps, and shellcode execution.
            </p>
          </div>

          {/* Step Selector Slider Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {bofSteps.map((bStep, idx) => (
              <button
                key={idx}
                onClick={() => setBofStepIndex(idx)}
                className={clsx(
                  "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                  bofStepIndex === idx
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              >
                <div className="font-bold text-xs">Step {bStep.step}</div>
                <div className="text-[10px] text-gray-400 truncate mt-0.5">{bStep.title.split(": ")[1] || bStep.title.split(". ")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Memory Debugger Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800 font-mono">
                  x86 32-BIT CPU ARCHITECTURE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentBofStep.title}
                </h3>
              </div>
            </div>

            {/* CPU Registers Status Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">EIP (Instruction Pointer)</span>
                <span className="font-mono text-xs font-bold text-white">{currentBofStep.eipValue}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-blue-900/40 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">ESP (Stack Pointer)</span>
                <span className="font-mono text-xs font-bold text-white">{currentBofStep.espValue}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 font-bold uppercase tracking-wider block">EBP (Base Pointer)</span>
                <span className="font-mono text-xs font-bold text-white">{currentBofStep.ebpValue}</span>
              </div>
            </div>

            {/* Stack Memory Visual Frame */}
            <div className="space-y-2 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Stack Frame Memory Representation:</span>
              <div className="space-y-2 font-mono text-[11px]">
                {currentBofStep.stackState.map((st, idx) => (
                  <div key={idx} className={clsx("p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1", st.color)}>
                    <span className="font-bold">{st.label}</span>
                    <span className="font-bold">{st.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low-Level Explanation */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Low-Level Architectural Explanation:</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{currentBofStep.description}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: GPU Hash Cracking & Hashcat Engine Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 2: GPU Hash Cracking &amp; Hashcat Engine Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a password hash algorithm to inspect its Hashcat mode ID, sample hash format, GPU cracking throughput on an RTX 4090, attack strategy, and cryptographic salting policy.
            </p>
          </div>

          {/* Hash Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(hashcatData).map((h) => {
              const isSelected = selectedHashKey === h.key;
              return (
                <button
                  key={h.key}
                  onClick={() => setSelectedHashKey(h.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{h.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{h.modeId}</div>
                </button>
              );
            })}
          </div>

          {/* Active Hash Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeHash.badgeClass)}>
                  {activeHash.modeId} • {activeHash.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Hashcat Mode &amp; Cracking Throughput
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">GPU Throughput (RTX 4090)</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{activeHash.crackingSpeedGpu}</span>
              </div>
            </div>

            {/* Sample Hash String */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Sample Hash String Format:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeHash.sampleHash}
              </pre>
            </div>

            {/* Attack Strategy & Salt Policy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Attack Strategy &amp; Rulesets</span>
                <p className="text-gray-200">{activeHash.attackStrategy}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Cryptographic Salting Policy</span>
                <p className="text-gray-300">{activeHash.saltPolicy}</p>
              </div>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Hashcat CLI Execution Command:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                {activeHash.syntax}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Stack Memory Frame Layout and Online Password Spraying vs Offline GPU Cracking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Stack Memory Frame Layout */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Stack Frame &amp; Buffer Overflow Overwrite
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* High Memory Label */}
                  <text x="250" y="25" fill="#94a3b8" textAnchor="middle" fontSize="9">HIGH MEMORY (0xFFFFFFFF)</text>

                  {/* Return Address Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="35" width="380" height="42" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">Saved Return Address (EIP / RIP)</text>
                    <text x="250" y="68" fill="#fca5a5" textAnchor="middle" fontSize="8">[ 4 Bytes ] Overwritten with JMP ESP Address!</text>
                  </g>

                  {/* Saved EBP Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="85" width="380" height="38" rx="4" fill="#18181b" stroke="#6b7280" strokeWidth="1" />
                    <text x="250" y="105" fill="#cbd5e1" textAnchor="middle" fontSize="9.5">Saved Base Pointer (EBP) [ 4 Bytes ]</text>
                  </g>

                  {/* Stack Canary Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="130" width="380" height="38" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="250" y="150" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9.5">Stack Canary (fs:0x28) [ Compiler Protection ]</text>
                  </g>

                  {/* Local Buffer Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="60" y="175" width="380" height="65" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="200" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">Local Buffer Array (e.g., char buffer[64])</text>
                    <text x="250" y="215" fill="#94a3b8" textAnchor="middle" fontSize="8">Attacker Input Overflows UPWARD into EIP</text>
                  </g>

                  {/* Low Memory Label */}
                  <text x="250" y="260" fill="#94a3b8" textAnchor="middle" fontSize="9">LOW MEMORY (0x00000000 - Stack Grows Downward)</text>

                  {/* Arrow indicating overflow direction */}
                  <path d="M 40 230 L 40 50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed14)" />
                  <text x="30" y="140" fill="#ef4444" textAnchor="middle" fontSize="8" transform="rotate(-90 30 140)">Overflow Spills Upward</text>

                  <defs>
                    <marker id="arrowRed14" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: Memory buffer overflow overwriting the stack canary, saved EBP, and return address (EIP).
              </p>
            </div>

            {/* Diagram 2: Password Spraying vs Offline Hashcat */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Online Spraying vs Offline GPU Cracking
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Path: Password Spraying */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="110" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10.5">ONLINE PASSWORD SPRAYING (Evades Account Lockouts)</text>
                    <text x="50" y="70" fill="#cbd5e1" font-family="monospace" fontSize="8.5">User 1 (mamata):    Test "Winter2026!" ➔ (Failed - Attempt 1/5)</text>
                    <text x="50" y="88" fill="#34d399" font-family="monospace" fontSize="8.5">User 2 (debangshu): Test "Winter2026!" ➔ (SUCCESS - Logged In!)</text>
                    <text x="50" y="106" fill="#cbd5e1" font-family="monospace" fontSize="8.5">User 3 (mahima):    Test "Winter2026!" ➔ (Failed - Attempt 1/5)</text>
                    <text x="250" y="125" fill="#a7f3d0" textAnchor="middle" fontSize="8">1 Password across 1,000 users = 0 Lockout Alarms Triggered!</text>
                  </g>

                  {/* Bottom Path: Offline GPU Cracking */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="155" width="460" height="140" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="177" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="10.5">OFFLINE GPU HASH CRACKING (Massively Parallel)</text>
                    <text x="250" y="198" fill="#cbd5e1" textAnchor="middle" fontSize="9">NVIDIA RTX 4090 (16,384 CUDA Cores) ➔ 85 Billion Hashes/Sec</text>
                    <rect x="40" y="210" width="420" height="35" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="250" y="228" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="8.5">hashcat -m 1000 ntlm.txt rockyou.txt -r best64.rule</text>
                    <text x="250" y="260" fill="#fca5a5" textAnchor="middle" fontSize="8">Unsalted NTLM hashes cracked in seconds; Mitigated by Argon2id memory-hard hashing.</text>
                    <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="7.5">IT Act 2000 Section 66C: Harvesting &amp; cracking corporate passwords carries 3 years prison.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: Password spraying evades online lockout thresholds, while Hashcat cracks dumped hashes offline.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: System Exploitation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads harden C++ settlement daemons, simulate Active Directory password spraying, secure SCADA RTU firmware, and author Immunity Debugger labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Low-Level Flaw Dilemma ({currentLocalScenario.flawType})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Engineering Action &amp; Remediation
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for binary exploit analysts and defensive software engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Binary &amp; Auth Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Strip Bad Characters:</strong> Always test <code className="text-indigo-300">\x00</code> through <code className="text-indigo-300">\xff</code> to prevent shellcode truncation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Prepend NOP Sleds:</strong> 32 bytes of <code className="text-indigo-300">\x90</code> ensure reliable execution across variable stack offsets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Argon2id:</strong> Memory-hard hashing neutralizes massive GPU cracking arrays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy gMSA Accounts:</strong> 128-character auto-rotating service passwords defeat Kerberoasting.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Binary Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Hardcoding JMP ESP from ASLR DLLs:</strong> Exploit crashes on system reboot due to address randomization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using strcpy() in C Code:</strong> Missing bounds check creates critical buffer overflow vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unsalted Fast Hashing:</strong> Storing passwords as MD5/SHA-256 enables instant rainbow table cracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Password Harvesting without Auth:</strong> Violates IT Act Section 66C (Identity Theft).</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Compile with Stack Canaries:</strong> Enable <code className="text-emerald-300">-fstack-protector-all</code> on all C/C++ builds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Migrate to Memory-Safe Rust:</strong> Eliminate buffer overflows and use-after-free bugs at compile time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce FIDO2 Hardware MFA:</strong> Stop password spraying and credential stuffing permanently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Disable NTLM Authentication:</strong> Mandate Kerberos only to prevent Pass-the-Hash attacks.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize key system exploitation and credential concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Binary Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Instruction Pointer (EIP) is the ultimate prize in x86 binary exploitation: because EIP holds the memory address of the next machine instruction, overwriting it allows the attacker to redirect the CPU to execute their injected shellcode in RAM.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Stack Canaries protect software: by placing a random secret integer between the local variables and the saved return address, any buffer overflow that attempts to reach EIP will corrupt the canary first, allowing the CPU to detect the tampering and abort execution.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future software engineering projects, replace legacy C functions (<code className="text-indigo-300">strcpy</code>, <code className="text-indigo-300">gets</code>) with bounds-checked alternatives (<code className="text-indigo-300">strncpy</code>, <code className="text-indigo-300">fgets</code>) or adopt memory-safe languages like Rust.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>EIP holds the address of the next instruction executed by the CPU.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stack overflows overwrite the saved EIP to redirect execution to shellcode.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NOP Sleds (\x90) provide an execution landing runway in memory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stack Canaries detect stack corruption before return instructions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Password spraying tests 1 password across many users to avoid lockouts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 66 and 66C penalize system exploitation &amp; password theft.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="System Exploitation, Buffer Overflows &amp; Credential Attacks FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="System Exploitation, Buffer Overflows &amp; Credential Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Understanding binary exploitation and CPU registers is what separates true cybersecurity engineers from script users. When you understand how a single missing bounds check in C allows an attacker to overwrite EIP and seize control of the processor, you understand why memory-safe programming, compiler canaries, and modern cryptography are the essential foundation of digital security."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
