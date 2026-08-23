import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import blockchainEnginePy from "./topic4_files/blockchain_security_engine.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgChainId = useId();
  const svgMerkleId = useId();

  // =========================================================================
  // STUDIO 1: TAMPER CASCADE & IMMUTABILITY FORENSICS
  // =========================================================================
  const [isBlock1Tampered, setIsBlock1Tampered] = useState(false);

  const chainState = useMemo(() => {
    if (isBlock1Tampered) {
      return {
        block0: { hash: "00a89f... (Genesis)", valid: true },
        block1: {
          tx: "Tx1: ₹50,00,000 Susmita -> Attacker (TAMPERED 🚨)",
          prevHash: "00a89f...",
          hash: "7f8b91... (Difficulty Broken ❌)",
          valid: false
        },
        block2: {
          tx: "Tx2: ₹12,00,000 Treasury -> Contractor",
          prevHash: "00b42c... (MISMATCH WITH BLOCK 1! ❌)",
          hash: "9e41d2...",
          valid: false
        },
        verdict: "BLOCKCHAIN INTEGRITY BROKEN 🚨 (Tampering Detected at Block #1)",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        explanation: "Modifying Block #1 changed its hash, breaking the previous_hash link in Block #2 and all subsequent blocks. The network rejects the tampered chain immediately."
      };
    } else {
      return {
        block0: { hash: "00a89f... (Genesis)", valid: true },
        block1: {
          tx: "Tx1: ₹5,00,000 Susmita -> Debangshu",
          prevHash: "00a89f...",
          hash: "00b42c... (PoW Valid ✔)",
          valid: true
        },
        block2: {
          tx: "Tx2: ₹12,00,000 Treasury -> Contractor",
          prevHash: "00b42c...",
          hash: "00d71a... (PoW Valid ✔)",
          valid: true
        },
        verdict: "CRYPTOGRAPHIC IMMUTABILITY VERIFIED ✔ (100% Valid Chain)",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        explanation: "All previous_hash linkages and Merkle roots match. Proof-of-Work difficulty verified across all blocks."
      };
    }
  }, [isBlock1Tampered]);

  // =========================================================================
  // STUDIO 2: 51% CONSENSUS HASHRATE RACE SIMULATOR
  // =========================================================================
  const [rogueHashrate, setRogueHashrate] = useState(55); // 0 to 100%

  const consensusRace = useMemo(() => {
    const isDominant = rogueHashrate >= 51;
    let status = "";
    let badgeColor = "";
    let consequence = "";

    if (isDominant) {
      status = "51% CONSENSUS ATTACK SUCCESSFUL 🚨 (Double-Spend Achieved)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      consequence = `Rogue cartel controls ${rogueHashrate}% hashrate, outpacing the honest network (${100 - rogueHashrate}%). The private fork overtakes the honest chain, enabling transaction reorgs and double-spending!`;
    } else {
      status = "HONEST CONSENSUS PREVAILS ✔ (Attack Thwarted)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      consequence = `Honest network holds majority compute power (${100 - rogueHashrate}% vs ${rogueHashrate}%). Rogue fork is mathematically abandoned under Nakamoto longest-chain consensus.`;
    }

    return { isDominant, status, badgeColor, consequence };
  }, [rogueHashrate]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_land_registry");

  const regionalDrills = {
    barrackpore_land_registry: {
      id: "barrackpore_land_registry",
      title: "Barrackpore Municipal Land Registry: Immutable Property Deeds",
      location: "Municipal property records core managing 250,000 real estate deeds",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Fraud syndicates bribed registry clerks to alter deed ownership records in central SQL databases to execute illegal property sales.",
      solution:
        "Migrated deed records to a permissioned Hyperledger Fabric blockchain with 8 independent consensus nodes across Judiciary and Treasury.",
      outcome:
        "100% elimination of fraudulent deed modifications; tamper attempts rejected automatically by consensus nodes."
    },
    kolkata_fintech_audit_ledger: {
      id: "kolkata_fintech_audit_ledger",
      title: "Salt Lake Sector V FinTech: Tamper-Proof SIEM Audit Logging",
      location: "Core transaction database processing ₹15,00,00,000 in daily payments",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Sophisticated insiders with root database access attempted to modify payment audit logs to cover up unauthorized disbursements.",
      solution:
        "Implemented automated Merkle Tree batch hashing, writing hourly root hashes to an immutable public blockchain ledger.",
      outcome:
        "Any modification to historical SQL logs triggers instant cryptographic hash mismatch alert; achieved 100% compliance with RBI audit standards."
    },
    ichapur_defense_supply_chain: {
      id: "ichapur_defense_supply_chain",
      title: "Ichapur Ordnance Manufacturing: Software Supply Chain Provenance",
      location: "Defense CNC machine controller and CAD firmware deployment pipeline",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries attempted to inject backdoored firmware binaries onto contractor distribution servers.",
      solution:
        "Anchored authorized firmware binary hashes and developer cryptographic signatures on an immutable defense blockchain.",
      outcome:
        "CNC controllers verify on-chain hashes before executing firmware updates, blocking all tampered binaries at the hardware gate."
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
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 4
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Blockchain Technology in Cyber Security: Decentralization &amp; Immutability
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Blockchain technology provides decentralized, mathematically tamper-evident state machines that eliminate central points of compromise.
            Dissect the cryptographic architecture of <strong>Block Headers and Merkle Binary Trees</strong>, analyze how 
            <strong>SHA-256 Hash Chaining creates an unbroken Tamper Cascade</strong>, explore <strong>Proof-of-Work and the 51% Consensus Attack</strong>, 
            and evaluate enterprise applications in <strong>Tamper-Proof Audit Logging and Software Supply Chain Integrity</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: TAMPER CASCADE & IMMUTABILITY FORENSICS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⛓️</span> Studio 1: Cryptographic Hash Chaining &amp; Tamper Cascade Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle tampering on Block #1 to witness how altering a single historical transaction invalidates the entire subsequent blockchain.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", chainState.badgeColor)}>
              {chainState.verdict}
            </div>
          </div>

          <div className="space-y-4">
            {/* Tamper Control Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="font-bold text-white block">Adversarial Action: Tamper with Block #1 Transaction Data</span>
                <span className="text-[11px] text-slate-400">Attempts to secretly reroute ₹50,00,000 to an attacker-controlled address.</span>
              </div>
              <button
                onClick={() => setIsBlock1Tampered(!isBlock1Tampered)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-bold text-xs transition-all duration-200",
                  isBlock1Tampered
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                    : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                )}
              >
                {isBlock1Tampered ? "Revert Tampering 🔄" : "Tamper Block #1 🚨"}
              </button>
            </div>

            {/* Visual Blockchain Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {/* Block 0: Genesis */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-800/60 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className="font-bold text-emerald-400">Block #0 (Genesis)</span>
                  <span className="text-[10px] text-slate-500">Height: 0</span>
                </div>
                <div className="text-slate-400 text-[11px]">PrevHash: 0000000000000000...</div>
                <div className="text-slate-300 text-[11px] truncate">Tx: Genesis Initialization</div>
                <div className="text-emerald-300 text-[11px] truncate">Hash: {chainState.block0.hash}</div>
              </div>

              {/* Block 1 */}
              <div
                className={clsx(
                  "p-4 rounded-xl border space-y-2 transition-all duration-300",
                  chainState.block1.valid
                    ? "bg-slate-950 border-emerald-800/60"
                    : "bg-rose-950/40 border-rose-700"
                )}
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className={clsx("font-bold", chainState.block1.valid ? "text-emerald-400" : "text-rose-400")}>
                    Block #1 {isBlock1Tampered && "(TAMPERED)"}
                  </span>
                  <span className="text-[10px] text-slate-500">Height: 1</span>
                </div>
                <div className="text-slate-400 text-[11px] truncate">PrevHash: {chainState.block1.prevHash}</div>
                <div className={clsx("text-[11px] truncate font-bold", isBlock1Tampered ? "text-rose-300" : "text-slate-300")}>
                  {chainState.block1.tx}
                </div>
                <div className={clsx("text-[11px] truncate", chainState.block1.valid ? "text-emerald-300" : "text-rose-400 font-bold")}>
                  Hash: {chainState.block1.hash}
                </div>
              </div>

              {/* Block 2 */}
              <div
                className={clsx(
                  "p-4 rounded-xl border space-y-2 transition-all duration-300",
                  chainState.block2.valid
                    ? "bg-slate-950 border-emerald-800/60"
                    : "bg-rose-950/40 border-rose-700"
                )}
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className={clsx("font-bold", chainState.block2.valid ? "text-emerald-400" : "text-rose-400")}>
                    Block #2 {isBlock1Tampered && "(BROKEN LINK)"}
                  </span>
                  <span className="text-[10px] text-slate-500">Height: 2</span>
                </div>
                <div className={clsx("text-[11px] truncate", chainState.block2.valid ? "text-slate-400" : "text-rose-400 font-bold")}>
                  PrevHash: {chainState.block2.prevHash}
                </div>
                <div className="text-slate-300 text-[11px] truncate">{chainState.block2.tx}</div>
                <div className={clsx("text-[11px] truncate", chainState.block2.valid ? "text-emerald-300" : "text-rose-400")}>
                  Hash: {chainState.block2.hash}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <strong className="text-white">Forensic Explanation: </strong>
              {chainState.explanation}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: 51% CONSENSUS HASHRATE RACE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⛏️</span> Studio 2: 51% Consensus Hashrate Race Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Slide the rogue cartel hashrate percentage to observe the mathematical threshold where double-spending becomes possible.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", consensusRace.badgeColor)}>
              {consensusRace.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Network Hashrate Distribution
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Rogue Cartel Mining Hashrate:</span>
                  <span className={clsx("font-mono font-bold text-sm", consensusRace.isDominant ? "text-rose-400" : "text-amber-400")}>
                    {rogueHashrate}% ({rogueHashrate >= 51 ? "Majority Cartel 🚨" : "Minority Pool ✔"})
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="1"
                  value={rogueHashrate}
                  onChange={(e) => setRogueHashrate(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>10% (Weak)</span>
                  <span>50% (Equilibrium)</span>
                  <span>51% (Threshold)</span>
                  <span>90% (Total Monopolization)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center">
                <div className="p-2 bg-slate-900 rounded-lg border border-emerald-800/40">
                  <span className="text-[10px] text-slate-500 block">Honest Hashrate</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{100 - rogueHashrate}%</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-rose-800/40">
                  <span className="text-[10px] text-slate-500 block">Rogue Hashrate</span>
                  <span className="font-mono font-bold text-rose-400 text-sm">{rogueHashrate}%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Nakamoto Longest-Chain Rule Evaluation
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {consensusRace.consequence}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Attack Limitation: </strong> Even with 51% hashrate, an attacker CANNOT forge cryptographic digital signatures, steal funds from private keys, or alter old historical blocks!
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
                Case studies of permissioned blockchain land registries, immutable SIEM audit logs, and supply chain provenance.
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_land_registry" ? "Barrackpore Land Registry" : key === "kolkata_fintech_audit_ledger" ? "Kolkata SIEM Ledger" : "Ichapur Supply Chain"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
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
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Blockchain Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Auditable Outcome</span>
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
                <span><strong>Assuming 51% Attacks Steal Private Keys:</strong> A 51% attack enables double-spending and reorgs; it CANNOT forge digital signatures or steal wallets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Storing Plaintext Sensitive Data on Public Chains:</strong> Blockchain data is permanently immutable and visible to all nodes; store only salted hashes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Smart Contract Reentrancy Bugs:</strong> Immutability means buggy smart contract code cannot be easily patched once deployed.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Blockchain Security Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Anchor Merkle Roots for Tamper-Proof SIEM:</strong> Anchor hourly batch hashes to provide non-repudiation during regulatory forensic audits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Permissioned BFT Consortia for Enterprise:</strong> Use Hyperledger Fabric with X.509 identity certificates to achieve high TPS and privacy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Formal Verification on Smart Contracts:</strong> Mathematically prove contract execution rules before on-chain deployment.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Think About:</span>
              <p className="leading-relaxed">
                Why does modifying Block #1 turn the entire chain red? Because each block contains the cryptographic hash of its predecessor! Changing one byte in Block #1 changes its hash, breaking the previous_hash link in Block #2 and all subsequent blocks!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Block headers include previous_hash, Merkle root, timestamp, and nonce.</li>
                <li>Merkle binary trees allow $O(\log N)$ transaction verification proofs.</li>
                <li>Proof-of-Work iterates the nonce to find hashes meeting difficulty target.</li>
                <li>A 51% attack enables double-spending but cannot forge signatures.</li>
                <li>Tamper-proof audit logging anchors SIEM hashes on immutable ledgers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Blockchain Security &amp; 51% Attack Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating Merkle root calculation, PoW nonce mining, tamper cascade detection, and 51% hashrate race
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={blockchainEnginePy}
            title="blockchain_security_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Blockchain Security &amp; Immutability FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the mathematical structure of block headers ($H_i = \text{SHA256}(H_{i-1} || \text{MerkleRoot} || \text{Nonce})$) and explain the Tamper Cascade effect. Detail how Merkle Binary Trees enable $O(\log N)$ verification proofs. Explain the mechanics and limitations of a 51% Consensus Attack (it enables double-spending but cannot forge signatures). Detail how blockchain anchors tamper-proof SIEM audit logs."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Blockchain Security & Immutability Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 4 Note"
            downloadFileName="topic4_blockchain_security_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
