import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio Interactive State
  const [activeTab, setActiveTab] = useState("avalanche");
  const [inputText, setInputText] = useState("Kolkata FinTech Ledger Transaction #9810 - ₹4,50,000");
  const [hmacSecretKey, setHmacSecretKey] = useState("SecretSaltKey2026");
  const [subjectLevel, setSubjectLevel] = useState("Medium");
  const [objectLevel, setObjectLevel] = useState("High");
  const [bibaAction, setBibaAction] = useState("read");

  // Pseudo-hash generator for realistic educational visualization
  const simpleHash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
    return `${hex1}${hex2}${hex1.split('').reverse().join('')}${hex2.split('').reverse().join('')}`;
  };

  const computedSHA256 = `sha256:${simpleHash(inputText, 1337)}${simpleHash(inputText, 42)}`;
  const computedHMAC = `hmac-sha256:${simpleHash(inputText + hmacSecretKey, 9999)}`;

  // Biba Model Logic
  const integrityLevels = { "Low": 1, "Medium": 2, "High": 3, "Kernel/Root": 4 };
  const subVal = integrityLevels[subjectLevel];
  const objVal = integrityLevels[objectLevel];

  // Biba Rules: Read Allowed if Sub <= Obj ("No Read Down"), Write Allowed if Sub >= Obj ("No Write Up")
  let bibaAllowed = false;
  let bibaReason = "";

  if (bibaAction === "read") {
    bibaAllowed = subVal <= objVal;
    bibaReason = bibaAllowed
      ? `ALLOWED: Subject (${subjectLevel}) reading higher/equal integrity Object (${objectLevel}). Preserves "No Read Down" axiom.`
      : `DENIED: Subject (${subjectLevel}) attempting to read lower integrity Object (${objectLevel}). Violates Biba Simple Integrity Axiom ("No Read Down") — reading untrusted dirty data will corrupt trusted processes.`;
  } else {
    bibaAllowed = subVal >= objVal;
    bibaReason = bibaAllowed
      ? `ALLOWED: Subject (${subjectLevel}) writing to lower/equal integrity Object (${objectLevel}). Preserves "No Write Up" *-integrity property.`
      : `DENIED: Subject (${subjectLevel}) attempting to modify higher integrity Object (${objectLevel}). Violates Biba *-Integrity Property ("No Write Up") — low-integrity subject cannot contaminate high-integrity master files.`;
  }

  // Merkle Tree Simulator
  const [tx1, setTx1] = useState("Tx1: Debangshu to Mamata ₹50,000");
  const [tx2, setTx2] = useState("Tx2: Mahima to Abhronila ₹35,000");
  const [tx3, setTx3] = useState("Tx3: Susmita to Debangshu ₹1,20,000");
  const [tx4, setTx4] = useState("Tx4: Barrackpore Plant to Jadavpur Lab ₹80,000");

  const hTx1 = simpleHash(tx1, 1).substring(0, 10);
  const hTx2 = simpleHash(tx2, 2).substring(0, 10);
  const hTx3 = simpleHash(tx3, 3).substring(0, 10);
  const hTx4 = simpleHash(tx4, 4).substring(0, 10);

  const hNodeA = simpleHash(hTx1 + hTx2, 10).substring(0, 12);
  const hNodeB = simpleHash(hTx3 + hTx4, 20).substring(0, 12);
  const merkleRoot = simpleHash(hNodeA + hNodeB, 99).substring(0, 16);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-600/60 rounded-full text-xs font-semibold text-emerald-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 3
            </span>
            <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-600/60 rounded-full text-xs font-semibold text-cyan-300">
              Integrity &amp; Cryptographic Assurance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Integrity: Data Accuracy and Trust
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Explore the core mathematical foundations of data and system integrity: one-way cryptographic hash functions
            (SHA-256 vs broken MD5), HMAC authentication tags, the Biba and Clark-Wilson integrity models, Merkle Tree
            hash chains, and hardware roots of trust (UEFI Secure Boot, TPM 2.0 PCR registers) protecting enterprise
            operations across West Bengal.
          </p>
        </div>

        {/* Section 1: Core Integrity Concepts */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-emerald-400">
            1. Conceptual Framework: Data Integrity vs System Integrity
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Integrity ensures that information and computing infrastructure remain authentic, complete, and uncorrupted:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-emerald-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🧮</span>
                <h3 className="text-sm font-bold text-white">Cryptographic Hashing</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deterministic one-way algorithms (SHA-256, BLAKE3) with strong preimage and collision resistance, producing fixed-size digests.
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Engine: SHA-256 / SHA-512</span>
            </div>

            {/* Box 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-emerald-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔑</span>
                <h3 className="text-sm font-bold text-white">HMAC &amp; Signatures</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combining cryptographic hashes with shared secret keys (HMAC) or private keys (Digital Signatures) for non-repudiation and authenticity.
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Proof: Non-Repudiation</span>
            </div>

            {/* Box 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-emerald-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛡️</span>
                <h3 className="text-sm font-bold text-white">Biba Integrity Model</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formal rules preventing dirty data contamination: "No Read Down" (Simple Axiom) and "No Write Up" (*-Integrity Property).
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Rule: No Read Down / No Write Up</span>
            </div>

            {/* Box 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2.5 transition-all hover:border-emerald-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌳</span>
                <h3 className="text-sm font-bold text-white">Merkle Tree Chains</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hierarchical hash structures providing O(log N) tamper verification across distributed ledgers, Git commits, and file systems.
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Structure: Hash Tree Root</span>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic SVG Diagram */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-emerald-400">
            2. Hierarchical Data Integrity Architecture &amp; Merkle Verification Pipeline
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Architectural visualization of Merkle Tree hash verification ensuring tamper-evident ledger integrity:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 840 260" className="w-full max-w-4xl h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Merkle Root Box */}
              <rect x="330" y="20" width="180" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
              <text x="420" y="42" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">TOP MERKLE ROOT</text>
              <text x="420" y="58" fill="#6ee7b7" fontSize="9" textAnchor="middle">H(Node A + Node B)</text>

              {/* Branch Lines to Level 1 */}
              <path d="M 380 70 L 230 110" stroke="#10b981" strokeWidth="2" />
              <path d="M 460 70 L 610 110" stroke="#10b981" strokeWidth="2" />

              {/* Level 1: Intermediate Nodes */}
              <rect x="150" y="110" width="160" height="45" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
              <text x="230" y="130" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">NODE A: H(H1 + H2)</text>
              <text x="230" y="145" fill="#7dd3fc" fontSize="8" textAnchor="middle">FinTech Batch 1</text>

              <rect x="530" y="110" width="160" height="45" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
              <text x="610" y="130" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">NODE B: H(H3 + H4)</text>
              <text x="610" y="145" fill="#7dd3fc" fontSize="8" textAnchor="middle">FinTech Batch 2</text>

              {/* Branch Lines to Leaves */}
              <path d="M 190 155 L 110 190" stroke="#0ea5e9" strokeWidth="1.5" />
              <path d="M 270 155 L 290 190" stroke="#0ea5e9" strokeWidth="1.5" />
              <path d="M 570 155 L 550 190" stroke="#0ea5e9" strokeWidth="1.5" />
              <path d="M 650 155 L 730 190" stroke="#0ea5e9" strokeWidth="1.5" />

              {/* Leaf Nodes (Transactions) */}
              <rect x="40" y="190" width="140" height="45" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <text x="110" y="208" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Tx 1: ₹50,000</text>
              <text x="110" y="224" fill="#94a3b8" fontSize="8" textAnchor="middle">Hash: H1</text>

              <rect x="220" y="190" width="140" height="45" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <text x="290" y="208" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Tx 2: ₹35,000</text>
              <text x="290" y="224" fill="#94a3b8" fontSize="8" textAnchor="middle">Hash: H2</text>

              <rect x="480" y="190" width="140" height="45" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <text x="550" y="208" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Tx 3: ₹1,20,000</text>
              <text x="550" y="224" fill="#94a3b8" fontSize="8" textAnchor="middle">Hash: H3</text>

              <rect x="660" y="190" width="140" height="45" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
              <text x="730" y="208" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">Tx 4: ₹80,000</text>
              <text x="730" y="224" fill="#94a3b8" fontSize="8" textAnchor="middle">Hash: H4</text>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive Integrity & Tamper Detection Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-emerald-400">
            3. Interactive Data Integrity &amp; Tamper Detection Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Experiment with cryptographic hash generation, observe the avalanche effect, test HMAC secret key authentication,
            validate Biba model access policies, and simulate real-time Merkle Root ledger recalculations:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab("avalanche")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "avalanche"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              >
                1. SHA-256 &amp; Avalanche Effect
              </button>
              <button
                onClick={() => setActiveTab("hmac")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "hmac"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              >
                2. HMAC Authentication
              </button>
              <button
                onClick={() => setActiveTab("biba")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "biba"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              >
                3. Biba Integrity Policy Model
              </button>
              <button
                onClick={() => setActiveTab("merkle")}
                className={clsx(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  activeTab === "merkle"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                )}
              >
                4. Merkle Tree Root Simulator
              </button>
            </div>

            {/* TAB 1: SHA-256 & Avalanche */}
            {activeTab === "avalanche" && (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">
                    Modify Input Text (Type a single character to watch the hash digest transform completely):
                  </label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Calculated Cryptographic Digest:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700">
                      Deterministic &amp; Tamper Evident
                    </span>
                  </div>
                  <pre className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-400 break-all whitespace-pre-wrap border border-slate-800">
                    {computedSHA256}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    <strong>Avalanche Effect Law:</strong> Changing even a single bit or whitespace in the input
                    causes ~50% of the 256 output bits to flip unpredictably, rendering data tampering instantly detectable.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: HMAC Authentication */}
            {activeTab === "hmac" && (
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Payload Message:</label>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Shared Secret Key (K):</label>
                    <input
                      type="text"
                      value={hmacSecretKey}
                      onChange={(e) => setHmacSecretKey(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Computed HMAC-SHA256 Tag:</span>
                  <pre className="p-3 bg-slate-900 rounded font-mono text-xs text-amber-400 break-all border border-slate-800">
                    {computedHMAC}
                  </pre>
                  <p className="text-[11px] text-slate-400">
                    Unlike standard hashes, an adversary modifying the message in transit cannot generate a valid HMAC tag
                    without discovering the shared secret key <code>{hmacSecretKey}</code>.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Biba Model Policy Tester */}
            {activeTab === "biba" && (
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Subject Integrity Level:</label>
                    <select
                      value={subjectLevel}
                      onChange={(e) => setSubjectLevel(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      {Object.keys(integrityLevels).map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Action Requested:</label>
                    <select
                      value={bibaAction}
                      onChange={(e) => setBibaAction(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      <option value="read">READ Object</option>
                      <option value="write">WRITE / Modify Object</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Target Object Level:</label>
                    <select
                      value={objectLevel}
                      onChange={(e) => setObjectLevel(e.target.value)}
                      className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
                    >
                      {Object.keys(integrityLevels).map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className={clsx(
                    "p-4 rounded-lg border flex flex-col space-y-2",
                    bibaAllowed
                      ? "bg-emerald-950/40 border-emerald-700 text-emerald-300"
                      : "bg-rose-950/40 border-rose-700 text-rose-300"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{bibaAllowed ? "✅ ACCESS GRANTED" : "⛔ ACCESS VIOLATION"}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{bibaReason}</p>
                </div>
              </div>
            )}

            {/* TAB 4: Merkle Tree Ledger Simulator */}
            {activeTab === "merkle" && (
              <div className="flex flex-col space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Edit Any Transaction (Watch the cascading leaf hashes and top Merkle Root change in real time):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={tx1}
                    onChange={(e) => setTx1(e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200"
                  />
                  <input
                    type="text"
                    value={tx2}
                    onChange={(e) => setTx2(e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200"
                  />
                  <input
                    type="text"
                    value={tx3}
                    onChange={(e) => setTx3(e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200"
                  />
                  <input
                    type="text"
                    value={tx4}
                    onChange={(e) => setTx4(e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Calculated Top Merkle Root:</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">0x{merkleRoot}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
                    <p>Node A: 0x{hNodeA} (H1: {hTx1} + H2: {hTx2})</p>
                    <p>Node B: 0x{hNodeB} (H3: {hTx3} + H4: {hTx4})</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-emerald-400">
            4. Real-World Data Integrity Implementations in West Bengal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. SCADA PLC Cryptographic Firmware Signing
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹3,40,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Testing Site
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu implemented cryptographic firmware signing using Ed25519 and TPM 2.0 PCR measurements across
                40 metallurgical PLCs in Barrackpore. When an adversary attempted to upload unauthorized safety bypass
                code, the PLC bootloader detected a signature mismatch and rejected execution, safeguarding plant operations
                with an investment of ₹3,40,000.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. Telemedicine Digital Prescription Non-Repudiation
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹2,10,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Telemedicine Clinic
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima engineered a digital prescription signing pipeline in Ichapur. Every doctor's electronic prescription
                is hashed with SHA-256 and signed with the physician's cryptographic token, while patient vitals are validated
                with HMAC-SHA256. This eliminated unauthorized dosage tampering, backed by a ₹2,10,000 PKI infrastructure budget.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. FinTech Merkle Tree Append-Only Audit Ledger
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹7,80,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Financial Hub
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata deployed an append-only distributed Merkle Tree audit ledger for a Kolkata financial exchange
                processing 50,000 transactions/sec. Any attempt to alter past balance transfers breaks the Merkle Root
                hash instantly. The system enforces Clark-Wilson dual-authorization rules, engineered with an enterprise
                investment of ₹7,80,000.
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. Academic Malware Repository FIM &amp; Notary
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹4,20,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Lead Engineer:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur Research Campus
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila established a File Integrity Monitoring (FIM) grid across university research servers in Jadavpur.
                Using automated Wazuh agents and daily public blockchain hash notarization, the laboratory proves that
                vulnerability research benchmarks and dataset samples remain untampered, supported by a ₹4,20,000 grant.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-emerald-400">
            5. Common Pitfalls &amp; Engineering Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Plain Hashes without Keys (MitM Forgery)</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transmitting a file alongside its plain SHA-256 hash across an unauthenticated channel provides no defense
                against active Man-in-the-Middle attackers, who can alter BOTH the file and the hash. Always use HMAC with
                a shared secret or Digital Signatures with asymmetric keys.
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 Hardware Roots of Trust &amp; FIM Baselines</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combine software File Integrity Monitoring (FIM) with hardware TPM 2.0 PCR sealing. Budget all enterprise
                FIM deployments, HSM signing tokens, and PKI appliances in Indian Rupees (₹).
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Student Revision Checklist */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Student Revision Checklist:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Differentiate Data Integrity from System Integrity.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Explain Preimage Resistance and the Avalanche Effect.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Contrast MD5/SHA-1 collisions with SHA-256/BLAKE3.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>State Biba Model rules: "No Read Down, No Write Up".</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Explain Clark-Wilson CDIs, TPs, and Separation of Duties.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Formulate enterprise FIM &amp; PKI budgets in Indian Rupees (₹).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Integrity: Data Accuracy and Trust FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "Never trust unverified data. Use SHA-256 for cryptographic hashing, enforce HMAC or Digital Signatures to prevent MitM forge attacks, implement Biba and Clark-Wilson integrity rules, and maintain hardware roots of trust via TPM 2.0 PCR sealing. Budget all enterprise integrity solutions in Indian Rupees (₹)!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Integrity: Data Accuracy and Trust"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic4_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic3;
