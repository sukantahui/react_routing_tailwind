import React, { useState, useEffect } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import { topic10Questions } from "./topic10_files/topic10_questions";

export default function Topic10() {
  // Simple JS SHA-256 equivalent mock for interactive demo
  const simpleMockHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `0000${hex}a98f12c4b7e8910245fdc31a7890bfe12489c7ad65fe43` .substring(0, 64);
  };

  // Interactive Blockchain Ledger State
  const [blocks, setBlocks] = useState([
    {
      index: 0,
      timestamp: "2026-10-10 10:00:00",
      data: "Genesis Block: CBSE CS 083 Emerging Trends Module",
      prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
      nonce: 1042,
      hash: "00001a9f8b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e"
    },
    {
      index: 1,
      timestamp: "2026-10-10 10:05:00",
      data: "Rahul transfers 5.0 BTC to Priya for AI Model Access",
      prevHash: "00001a9f8b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
      nonce: 3821,
      hash: "00004c8e1a9b2d3f4e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e"
    }
  ]);

  const [newBlockData, setNewBlockData] = useState("Priya transfers 2.5 BTC to Sneha for Cloud GPU rental");
  const [miningStatus, setMiningStatus] = useState("");

  // Mine New Block
  const handleMineBlock = () => {
    setMiningStatus("⛏️ Mining Proof-of-Work puzzle... finding valid Nonce...");
    setTimeout(() => {
      const prevBlock = blocks[blocks.length - 1];
      const newNonce = Math.floor(Math.random() * 9000) + 1000;
      const rawString = `${blocks.length}${newBlockData}${prevBlock.hash}${newNonce}`;
      const newHash = `0000${simpleMockHash(rawString).substring(4)}`;

      const newBlock = {
        index: blocks.length,
        timestamp: new Date().toLocaleTimeString(),
        data: newBlockData,
        prevHash: prevBlock.hash,
        nonce: newNonce,
        hash: newHash
      };

      setBlocks((prev) => [...prev, newBlock]);
      setMiningStatus(`✅ Block #${newBlock.index} successfully mined and appended to the ledger!`);
    }, 600);
  };

  // Tamper Simulation
  const [tamperedData, setTamperedData] = useState("");
  const [tamperWarning, setTamperWarning] = useState(false);

  const handleTamperBlock = (blockIndex, text) => {
    setTamperedData(text);
    setBlocks((prev) =>
      prev.map((b, idx) => {
        if (idx === blockIndex) {
          return {
            ...b,
            data: text,
            hash: "f999CORRUPTED" + simpleMockHash(text).substring(14) // Corrupted hash lacking proof of work
          };
        }
        return b;
      })
    );
    setTamperWarning(true);
  };

  // Grid Computing Interactive Demo
  const [gridMatrixRows, setGridMatrixRows] = useState(500000);
  const totalCores = 8 + 16 + 32; // 56 cores total
  const delhiRows = Math.round((8 / totalCores) * gridMatrixRows);
  const kolkataRows = Math.round((16 / totalCores) * gridMatrixRows);
  const bengaluruRows = Math.round((32 / totalCores) * gridMatrixRows);

  // MCQ Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    topic10Questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-400/30">
            CBSE Class 11 CS (083) • Unit 3: Emerging Trends
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Topic 10: Grid Computing & Blockchain Technology
          </h1>
          <p className="text-amber-100/80 text-base md:text-lg max-w-3xl leading-relaxed">
            Uncover the dual paradigms of decentralized computing: distributed resource aggregation in 
            <strong> Grid Computing</strong> and tamper-proof decentralized consensus in 
            <strong> Cryptographic Blockchains</strong> (<strong>SHA-256</strong>, <strong>Proof of Work</strong>, <strong>Smart Contracts</strong>).
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Section 1: Grid Computing Overview & Types */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">01</span>
            What is Grid Computing? (Computational vs Data Grids)
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            <strong>Grid Computing</strong> is a distributed computing paradigm that aggregates geographically dispersed, heterogeneous computer systems (servers, PCs, clusters) to solve massive computational problems collaboratively as a single virtual supercomputer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/80 border border-amber-500/40 p-5 rounded-xl">
              <div className="text-amber-400 font-bold text-base mb-2">1. Computational Grid</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Aggregates raw CPU processing power across idle machines to execute complex simulations (e.g., protein folding, climate modeling, SETI@home).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded font-mono">
                Focus: Maximum Flops & compute parallelization.
              </div>
            </div>

            <div className="bg-slate-950/80 border border-yellow-500/40 p-5 rounded-xl">
              <div className="text-yellow-400 font-bold text-base mb-2">2. Data Grid</div>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Provides controlled sharing and unified management of massive multi-petabyte datasets stored across global research centers (e.g., CERN LHC Particle Data Grid).
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded font-mono">
                Focus: Petabyte distributed storage & rapid query pipelines.
              </div>
            </div>
          </div>

          {/* Grid Allocation Simulator */}
          <div className="mt-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
              <h4 className="text-white font-semibold text-sm">Interactive Grid Job Partitioning Simulator</h4>
              <span className="text-xs text-amber-400">Total Grid Capacity: 56 Distributed CPU Cores</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Scientific Matrix Compute Job Size:</span>
                <span className="font-mono font-bold text-amber-400">{gridMatrixRows.toLocaleString()} Matrix Rows</span>
              </div>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="50000"
                value={gridMatrixRows}
                onChange={(e) => setGridMatrixRows(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                <div className="text-slate-400">Node Alpha (Delhi) • 8 Cores</div>
                <div className="text-lg font-mono font-bold text-white mt-1">{delhiRows.toLocaleString()} rows</div>
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                <div className="text-slate-400">Node Beta (Kolkata) • 16 Cores</div>
                <div className="text-lg font-mono font-bold text-amber-400 mt-1">{kolkataRows.toLocaleString()} rows</div>
              </div>
              <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                <div className="text-slate-400">Node Gamma (Bengaluru) • 32 Cores</div>
                <div className="text-lg font-mono font-bold text-yellow-400 mt-1">{bengaluruRows.toLocaleString()} rows</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Blockchain Technology Foundations */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm">02</span>
            What is Blockchain? (Decentralization, SHA-256 & Immutability)
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            A <strong>Blockchain</strong> is a decentralized, distributed, and immutable cryptographic digital ledger that records transactions across a peer-to-peer network. Every block contains a timestamp, transaction data, a proof-of-work <strong>Nonce</strong>, and the <strong>cryptographic hash of the previous block</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/80 border border-amber-500/40 p-4 rounded-xl">
              <div className="text-amber-400 font-bold text-xs uppercase mb-1">Pillar 1</div>
              <h3 className="font-bold text-white text-sm mb-1">Decentralized P2P</h3>
              <p className="text-slate-400 text-xs">
                No single central bank or master server; all nodes maintain full synchronized ledger copies.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-yellow-500/40 p-4 rounded-xl">
              <div className="text-yellow-400 font-bold text-xs uppercase mb-1">Pillar 2</div>
              <h3 className="font-bold text-white text-sm mb-1">SHA-256 Hashing</h3>
              <p className="text-slate-400 text-xs">
                One-way cryptographic hash functions generate 256-bit unique digests with high avalanche sensitivity.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-xl">
              <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Pillar 3</div>
              <h3 className="font-bold text-white text-sm mb-1">Tamper Immutability</h3>
              <p className="text-slate-400 text-xs">
                Altering any historical transaction invalidates previous-hash links in all subsequent blocks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Live Interactive Blockchain Mining & Tamper Simulator */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">03</span>
            Interactive Blockchain Ledger & Proof-of-Work Sandbox
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mb-6">
            Inspect the live cryptographically linked chain below. Mine a new block with Proof-of-Work Nonce discovery, or tamper with an existing block to witness the broken chain invalidation.
          </p>

          {/* Mining Form */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex flex-col md:flex-row gap-3 items-center">
            <input
              type="text"
              value={newBlockData}
              onChange={(e) => setNewBlockData(e.target.value)}
              placeholder="Enter new transaction data (e.g., 'Amit sends ₹500 to Priya')..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleMineBlock}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs md:text-sm transition whitespace-nowrap shadow-lg"
            >
              ⛏️ Mine & Append Block
            </button>
          </div>

          {miningStatus && (
            <div className="mb-4 p-3 bg-slate-900 rounded-lg border border-amber-500/30 text-xs font-mono text-amber-300">
              {miningStatus}
            </div>
          )}

          {tamperWarning && (
            <div className="mb-4 p-3 bg-red-950/60 rounded-lg border border-red-500 text-xs font-mono text-red-300">
              🚨 <strong>TAMPER DETECTED:</strong> Block data was modified! The cryptographic SHA-256 hash no longer matches the difficulty target and breaks the Previous-Hash link of Block #1!
            </div>
          )}

          {/* Interactive Block Visualizer */}
          <div className="space-y-4">
            {blocks.map((block, idx) => {
              const isCorrupted = block.hash.startsWith("f999CORRUPTED");
              return (
                <div
                  key={block.index}
                  className={`p-4 rounded-xl border transition ${
                    isCorrupted
                      ? "bg-red-950/30 border-red-500/80 shadow-red-900/20"
                      : "bg-slate-950/80 border-slate-800 hover:border-amber-500/50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                    <span className="font-bold text-amber-400 text-sm">
                      {idx === 0 ? "🧱 Block #0 (Genesis Block)" : `🧱 Block #${block.index}`}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Timestamp: {block.timestamp} | Nonce: {block.nonce}</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Transaction Payload Data:</span>
                      {idx === 0 ? (
                        <span className="text-white font-semibold">{block.data}</span>
                      ) : (
                        <input
                          type="text"
                          value={block.data}
                          onChange={(e) => handleTamperBlock(block.index, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:border-red-500"
                        />
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Previous Block Hash:</span>
                      <span className="text-slate-300 break-all">{block.prevHash}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Current Block SHA-256 Hash:</span>
                      <span className={`break-all font-bold ${isCorrupted ? "text-red-400" : "text-emerald-400"}`}>
                        {block.hash}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Real-World Applications */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm">04</span>
            Real-World Deployments: CBSE Certificates, Smart Contracts & Supply Chains
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-amber-400 font-bold mb-2">🎓 CBSE Academic Credentials</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                CBSE publishes Class 10 & 12 digital marksheets onto secure blockchain networks, allowing universities and employers worldwide to verify certificate authenticity in seconds without forgery.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-yellow-400 font-bold mb-2">📜 Smart Contracts (Ethereum)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Self-executing code stored directly on the blockchain automatically triggers insurance payouts or title deeds when satellite or IoT data confirms predetermined weather or payment criteria.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-emerald-400 font-bold mb-2">📦 Provenance & Supply Chains</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Tracking pharmaceutical batches from manufacturing plant to retail pharmacies ensures life-saving medications are 100% genuine and prevents black-market counterfeit drugs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Python Simulation Script Loader */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">05</span>
            Python Companion Simulation: Grid Compute & SHA-256 Blockchain Engine
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            Inspect the pure Python code implementing grid job allocation and cryptographic SHA-256 blockchain mining with Proof-of-Work validation.
          </p>
          <PythonFileLoader
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic10_files/grid_blockchain_engine.py"
            title="grid_blockchain_engine.py"
          />
        </section>

        {/* Section 6: PlainText Board Notes */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm">06</span>
            Quick Revision Notes (CBSE Class 11 Exam Guide)
          </h2>
          <PlainTextPrint
            filePath="/src/components/study/cbse-class-11-computer-science-083/topics/003_001_emerging-trends-ai-iot-cloud-and-blockchain/topic10_files/topic10_note.txt"
            title="Topic 10 Revision Notes"
          />
        </section>

        {/* Section 7: Interactive 25-MCQ Board Drill */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 text-sm">07</span>
                Interactive Board Practice Drill (25 MCQs)
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Test your conceptual knowledge of Grid Computing, SHA-256 Hashing, Proof of Work, and Smart Contracts.
              </p>
            </div>
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg transition"
            >
              {showResults ? "Hide Evaluation" : "Submit & Evaluate"}
            </button>
          </div>

          {showResults && (
            <div className="mb-6 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center">
              <div className="text-sm text-slate-300">Your Score:</div>
              <div className="text-3xl font-black text-amber-400 my-1">
                {calculateScore()} / {topic10Questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Percentage: {Math.round((calculateScore() / topic10Questions.length) * 100)}%
              </div>
            </div>
          )}

          <div className="space-y-6">
            {topic10Questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    showResults
                      ? isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-red-950/20 border-red-500/40"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-semibold text-white text-sm">
                      Q{qIndex + 1}. {q.question}
                    </span>
                    {showResults && (
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`text-left p-2.5 rounded-lg text-xs transition border ${
                            isSelected
                              ? "bg-amber-600/30 border-amber-500 text-white font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-amber-400">
                        <strong>Explanation (EN):</strong> {q.explanationEn}
                      </div>
                      <div className="text-yellow-300">
                        <strong>ব্যাখ্যা (বাংলা):</strong> {q.explanationBn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8: FAQ Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm">08</span>
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the key difference between Grid Computing and Cloud Computing?",
                a: "Grid computing aggregates geographically dispersed, heterogeneous compute nodes for collaborative large-scale scientific simulations. Cloud computing delivers homogeneous, on-demand virtualized computing and storage services on a commercial pay-as-you-go utility model."
              },
              {
                q: "What makes Blockchain data immutable and tamper-resistant?",
                a: "Every block contains the cryptographic SHA-256 hash of the previous block. If any transaction inside an existing block is tampered with, its hash changes, breaking the cryptographic chain across all subsequent blocks, which is instantly rejected by consensus nodes."
              },
              {
                q: "What is a Genesis Block?",
                a: "The Genesis Block is Block #0, the very first foundational block minted on a blockchain network whose 'previous block hash' is hardcoded to zeros."
              },
              {
                q: "What is a Smart Contract?",
                a: "A Smart Contract is a self-executing computerized program deployed on a blockchain (like Ethereum) whose terms and logical conditions execute automatically without requiring human intermediaries or trusted third parties."
              }
            ]}
          />
        </section>

        {/* Section 9: Teacher Guidance */}
        <Teacher
          name="Sukanta Hui"
          designation="Senior Computer Science Educator"
          message="Decentralized architectures represent the future of transparent digital governance and supercomputing. For CBSE Class 11 exams, focus on contrasting Grid vs Cloud computing, understanding how SHA-256 and previous-hash pointers enforce blockchain immutability, and detailing real-world applications in CBSE academic credential verification."
        />
      </div>
    </div>
  );
}
