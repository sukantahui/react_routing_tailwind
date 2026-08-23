import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import contractEnginePy from "./topic6_files/smart_contract_auditor.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgReentrancyId = useId();
  const svgFlashLoanId = useId();

  // =========================================================================
  // STUDIO 1: REENTRANCY ATTACK & CEI REMEDIATION SIMULATOR
  // =========================================================================
  const [useSecureCei, setUseSecureCei] = useState(false);
  const [attackExecuted, setAttackExecuted] = useState(false);

  const reentrancySimulation = useMemo(() => {
    if (!attackExecuted) {
      return {
        vaultBalance: "₹10,00,000",
        attackerBalance: "₹10,000",
        drainsCount: 0,
        status: "IDLE (Awaiting Withdrawal Call)",
        badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
        explanation: "Click 'Execute Withdrawal / Attack' to test smart contract execution."
      };
    }

    if (useSecureCei) {
      return {
        vaultBalance: "₹9,90,000",
        attackerBalance: "₹20,000 (Single Valid Withdrawal)",
        drainsCount: 1,
        status: "REENTRANCY BLOCKED BY CEI + MUTEX ✔",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        explanation: "Checks-Effects-Interactions (CEI) updated internal state to 0 BEFORE external call. Attacker's recursive call failed require(balance >= amount) and was blocked!"
      };
    } else {
      return {
        vaultBalance: "₹0 (COMPLETELY DRAINED 🚨)",
        attackerBalance: "₹10,10,000 (Stolen Funds)",
        drainsCount: 5,
        status: "REENTRANCY EXPLOIT SUCCEEDED 🚨 (The DAO Vulnerability)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        explanation: "Vulnerable contract transferred ETH before deducting balance. Attacker fallback function recursively re-entered withdraw() 5 times, draining ₹10,00,000!"
      };
    }
  }, [useSecureCei, attackExecuted]);

  // =========================================================================
  // STUDIO 2: FLASH LOAN ORACLE PRICE MANIPULATION SANDBOX
  // =========================================================================
  const [flashLoanAmount, setFlashLoanAmount] = useState(50000); // ETH
  const [useDecentralizedOracle, setUseDecentralizedOracle] = useState(false);

  const oracleSimulation = useMemo(() => {
    const basePrice = 250000.0; // ₹2,50,000 per ETH
    if (useDecentralizedOracle) {
      return {
        reportedPrice: "₹2,50,000",
        manipulationImpact: "0.0% (Unaffected by Pool Dump)",
        exploitProfit: "₹0 (Attack Neutralized ✔)",
        status: "CHAINLINK DECENTRALIZED ORACLE SECURE ✔",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        desc: "Chainlink aggregates volume-weighted price feeds across 30+ off-chain exchanges. Local AMM pool skewing has zero impact on reported oracle price."
      };
    } else {
      // Single AMM spot price crashes proportionally to dump
      const crashPct = Math.min((flashLoanAmount / 60000) * 80, 85);
      const manipulatedPrice = basePrice * (1.0 - crashPct / 100);
      const profit = (flashLoanAmount * 170).toFixed(0);

      return {
        reportedPrice: `₹${manipulatedPrice.toLocaleString()}`,
        manipulationImpact: `-${crashPct.toFixed(1)}% Artificial Crash 🚨`,
        exploitProfit: `₹${Number(profit).toLocaleString()}`,
        status: "SPOT ORACLE MANIPULATED 🚨 (Flash Loan Arbitrage)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        desc: `Borrowing ${flashLoanAmount.toLocaleString()} ETH in a single block crashed the vulnerable single-pool spot price by ${crashPct.toFixed(1)}%, enabling undercollateralized liquidations.`
      };
    }
  }, [flashLoanAmount, useDecentralizedOracle]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("kolkata_defi_audit");

  const regionalDrills = {
    kolkata_defi_audit: {
      id: "kolkata_defi_audit",
      title: "Salt Lake Sector V FinTech: ₹35,00,00,000 DeFi Protocol Audit",
      location: "Decentralized liquidity vault holding ₹35,00,00,000 in total value locked (TVL)",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Automated static audit with Slither uncovered a cross-function reentrancy vulnerability in the reward distribution logic.",
      solution:
        "Refactored code using Checks-Effects-Interactions (CEI) and deployed OpenZeppelin ReentrancyGuard across all reward claiming functions.",
      outcome:
        "Vulnerability eliminated prior to mainnet launch; certified 100% formal verification with Foundry invariant fuzzing."
    },
    barrackpore_municipal_escrow: {
      id: "barrackpore_municipal_escrow",
      title: "Barrackpore Municipal Escrow: Multi-Sig & Timelock Governance",
      location: "Municipal vendor procurement smart contract managing public infrastructure funds",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Adversaries attempted to hijack single-owner admin keys to drain municipal vendor escrow contracts.",
      solution:
        "Migrated contract ownership to a 3-of-5 Gnosis Safe multi-signature wallet with an enforced 48-hour timelock controller.",
      outcome:
        "100% protection against single-point key compromise; public visibility for all pending municipal fund disbursements."
    },
    ichapur_defense_firmware_license: {
      id: "ichapur_defense_firmware_license",
      title: "Ichapur Ordnance Manufacturing: EIP-712 Firmware Licensing",
      location: "Defense CNC machine controller and CAD firmware authorization network",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries attempted Signature Replay attacks by resubmitting captured license signatures across multiple factory networks.",
      solution:
        "Implemented EIP-712 structured domain separators embedding Chain ID, verifying contract address, and tracking incremental nonces.",
      outcome:
        "Replay attacks permanently neutralized; each cryptographic license authorization is mathematically bound to a single CNC controller."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 6
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Smart Contract Vulnerabilities &amp; Security Best Practices
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Smart contracts execute autonomously and immutably on the Ethereum Virtual Machine (EVM); once deployed, security flaws cannot be patched easily.
            Master the forensic mechanics of <strong>Reentrancy (The DAO Hack)</strong>, explore 
            <strong>Checks-Effects-Interactions (CEI) &amp; ReentrancyGuard</strong> defenses, analyze 
            <strong>Flash Loan Price Oracle Manipulation</strong>, and evaluate best practices in 
            <strong>Access Control (`msg.sender` vs `tx.origin`)</strong> and <strong>Multi-Sig Governance</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: REENTRANCY ATTACK & CEI DEFENSE SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔄</span> Studio 1: Reentrancy Attack &amp; Checks-Effects-Interactions (CEI) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between vulnerable and CEI secure vault patterns to observe recursive call-stack execution in real time.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", reentrancySimulation.badgeColor)}>
              {reentrancySimulation.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Vault Implementation Architecture
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Enable Checks-Effects-Interactions (CEI) + Mutex</div>
                  <div className="text-[10px] text-slate-400">Updates balance to 0 BEFORE external ETH transfer</div>
                </div>
                <input
                  type="checkbox"
                  checked={useSecureCei}
                  onChange={(e) => {
                    setUseSecureCei(e.target.checked);
                    setAttackExecuted(false);
                  }}
                  className="accent-emerald-500 w-4 h-4"
                />
              </label>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                <div className="text-slate-400">// Execution Flow:</div>
                {useSecureCei ? (
                  <>
                    <div className="text-emerald-400">1. CHECKS: require(balances[user] &gt;= amount)</div>
                    <div className="text-emerald-400">2. EFFECTS: balances[user] -= amount (Updated!)</div>
                    <div className="text-cyan-300">3. INTERACTIONS: msg.sender.call&#123;value: amount&#125;("")</div>
                  </>
                ) : (
                  <>
                    <div className="text-rose-400">1. INTERACTIONS: msg.sender.call&#123;value: bal&#125;("") 🚨</div>
                    <div className="text-slate-500">2. EFFECTS: balances[user] = 0 (NEVER REACHED!)</div>
                  </>
                )}
              </div>

              <button
                onClick={() => setAttackExecuted(true)}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg shadow-lg shadow-amber-950 transition-all duration-200"
              >
                Execute Withdrawal / Reentrancy Attack ⚡
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Vault Remaining Balance</span>
                    <span className={clsx("font-mono font-bold text-base", reentrancySimulation.vaultBalance.includes("0") ? "text-rose-400" : "text-emerald-400")}>
                      {reentrancySimulation.vaultBalance}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Attacker Pocket Balance</span>
                    <span className="font-mono font-bold text-base text-amber-400">
                      {reentrancySimulation.attackerBalance}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {reentrancySimulation.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Historical Impact: </strong> The DAO Hack drained 3.6 million ETH ($60M in 2016) using this exact reentrancy flaw, resulting in the Ethereum / Ethereum Classic chain split.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: FLASH LOAN ORACLE PRICE MANIPULATION SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚡</span> Studio 2: Flash Loan Price Oracle Manipulation Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Adjust the flash loan dump volume to test the resilience of single-pool spot pricing vs Chainlink Decentralized Oracles.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", oracleSimulation.badgeColor)}>
              {oracleSimulation.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Flash Loan &amp; Oracle Configuration
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Flash Loan Borrow Capital:</span>
                  <span className="font-mono text-amber-400 font-bold">{flashLoanAmount.toLocaleString()} ETH</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="2500"
                  value={flashLoanAmount}
                  onChange={(e) => setFlashLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5,000 ETH</span>
                  <span>30,000 ETH</span>
                  <span>60,000 ETH (Massive Capital Dump)</span>
                </div>
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer pt-2">
                <div>
                  <div className="font-semibold text-white">Deploy Chainlink Decentralized Oracle Network</div>
                  <div className="text-[10px] text-slate-400">Aggregates volume-weighted prices from 30+ off-chain feeds</div>
                </div>
                <input
                  type="checkbox"
                  checked={useDecentralizedOracle}
                  onChange={(e) => setUseDecentralizedOracle(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Reported ETH Price</span>
                    <span className="font-mono font-bold text-white text-sm">{oracleSimulation.reportedPrice}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Price Distortion</span>
                    <span className={clsx("font-mono font-bold text-sm", useDecentralizedOracle ? "text-emerald-400" : "text-rose-400")}>
                      {oracleSimulation.manipulationImpact}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {oracleSimulation.desc}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Attacker Arbitrage Profit: </strong>
                <span className={clsx("font-mono font-bold ml-1", useDecentralizedOracle ? "text-slate-400" : "text-rose-400")}>
                  {oracleSimulation.exploitProfit}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 3: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of DeFi protocol audits, municipal multi-sig escrows, and EIP-712 defense licensing in regional hubs.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(regionalDrills).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeDrillKey === key
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "kolkata_defi_audit" ? "Kolkata DeFi Protocol" : key === "barrackpore_municipal_escrow" ? "Barrackpore Escrow" : "Ichapur EIP-712"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-amber-400 font-mono bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Security Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Using `tx.origin` for Access Control:</strong> Vulnerable to phishing attacks; always use `msg.sender` for authorization checks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Relying on AMM Spot Reserves for Oracles:</strong> Flash loans allow adversaries to skew spot prices and execute underpriced liquidations inside a single transaction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Making External Calls Before State Updates:</strong> Invoking untrusted external contracts before zeroing balances opens critical reentrancy attack vectors.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Smart Contract Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Checks-Effects-Interactions (CEI):</strong> Update internal state variables first and execute external token transfers last.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Decentralized Oracles (Chainlink / TWAP):</strong> Protect lending and liquidation protocols from flash loan spot-price manipulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Multi-Sig &amp; Timelock Governance:</strong> Enforce 3-of-5 Gnosis Safe authorization with a 48-hour timelock on all administrative functions.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300">Think About:</span>
              <p className="leading-relaxed">
                Why does updating `balances[user] = 0` BEFORE transferring ETH stop Reentrancy? Because when the attacker's fallback function recursively calls `withdraw()` again, the contract checks `balances[user] >= amount`, sees 0, and reverts the attack immediately!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Reentrancy occurs when external calls are made before updating state.</li>
                <li>CEI pattern updates internal state before making external calls.</li>
                <li>`ReentrancyGuard` uses a state mutex to block recursive entries.</li>
                <li>Flash loans manipulate single-pool AMM spot prices inside 1 block.</li>
                <li>Never use `tx.origin` for authentication; always use `msg.sender`.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Smart Contract Auditor &amp; Reentrancy Exploit Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating reentrancy recursive drain, CEI remediation, and flash loan oracle manipulation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={contractEnginePy}
            title="smart_contract_auditor.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Smart Contract Security &amp; Vulnerabilities FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the technical mechanics of the Reentrancy vulnerability (SWC-107) and explain how The DAO Hack was executed. Detail the Checks-Effects-Interactions (CEI) design pattern and how OpenZeppelin ReentrancyGuard prevents recursion. Explain Flash Loan Oracle price manipulation and why Chainlink Decentralized Oracles / TWAP are required. Differentiate between `msg.sender` and `tx.origin` in access control."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Smart Contract Security Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 6 Note"
            downloadFileName="topic6_smart_contract_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
