import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Hexad Dimension Explorer State
  const [selectedHexad, setSelectedHexad] = useState("possession");
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Studio 2: Digital Signature & Non-Repudiation Simulator State
  const [contractText, setContractText] = useState("Authorize transfer of ₹25,00,000 to Mamata Enterprise at Barrackpore Branch");
  const [signerKey, setSignerKey] = useState("HSM-RSA-4096-DEBANGSHU-CORP");
  const [tamperDoc, setTamperDoc] = useState(false);
  const [isSigned, setIsSigned] = useState(true);
  const [timestampToken, setTimestampToken] = useState("2026-08-23T14:32:00.124Z [RFC 3161 TSA Kolkata CA-1]");

  // Studio 3: Model Comparison Filter State
  const [activeModelTab, setActiveModelTab] = useState("hexad");

  // Hexad Dimensions Data
  const hexadData = {
    confidentiality: {
      title: "Confidentiality",
      tagline: "Preventing unauthorized observation and disclosure of sensitive information",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-400",
      accent: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      definition: "Information is kept secret from entities not authorized to view it, using encryption, access controls, and data classification.",
      ciaOverlap: "Standard CIA element. Focused solely on secrecy.",
      enterpriseControls: ["AES-GCM-256 at-rest encryption", "TLS 1.3 in-transit tunnels", "Role-Based Access Control (RBAC)", "DLP endpoint agents"],
      incidentExample: "Unauthorized exfiltration of 50,000 customer KYC PAN documents to a darknet forum (₹1.2 Crore regulatory fine).",
      formula: "P(Confidentiality) = 1 - P(Unauthorized Read)"
    },
    integrity: {
      title: "Integrity",
      tagline: "Ensuring data is accurate, complete, and uncorrupted by unauthorized modification",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
      accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      definition: "Guarantees that state, messages, or files have not been improperly altered, inserted, deleted, or replayed during storage or transit.",
      ciaOverlap: "Standard CIA element, but Parker separates it from Authenticity (origin validity).",
      enterpriseControls: ["SHA-256 / SHA-3 cryptographic checksums", "HMAC message authentication", "Database write-ahead transaction logs", "Merkle tree verification"],
      incidentExample: "A Man-in-the-Middle changes an IFSC code and beneficiary account number in an unverified JSON payload, routing ₹45 Lakh to a mule account.",
      formula: "Hash(Received_Message) == Hash(Original_Message)"
    },
    availability: {
      title: "Availability",
      tagline: "Ensuring timely, uninterrupted, and reliable access for authorized personnel",
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-400",
      accent: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      definition: "Computational systems, network paths, storage arrays, and software services are functional and accessible upon authorized demand.",
      ciaOverlap: "Standard CIA element. Measured via uptime SLAs (99.999%).",
      enterpriseControls: ["Multi-region BGP Anycast DDoS mitigation", "Active-Active database clusters", "Automated N+2 failover redundancy", "RPO < 5 min, RTO < 15 min DR plans"],
      incidentExample: "A 600 Gbps volumetric SYN-flood disables a core Kolkata trading gateway for 4 hours, causing ₹85 Lakh in lost intraday commissions.",
      formula: "Availability = MTBF / (MTBF + MTTR) >= 99.99%"
    },
    possession: {
      title: "Possession / Control",
      tagline: "Maintaining physical and logical ownership and custody of media and assets",
      color: "from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-400",
      accent: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      definition: "Addresses who holds the physical media (disks, tapes, laptops) or logical cloud access tokens, regardless of whether confidentiality is immediately broken.",
      ciaOverlap: "Completely missing in classic CIA. Classic CIA falsely classifies encrypted device theft as 'no incident'.",
      enterpriseControls: ["Hardware tamper-evident seals", "Remote MDM cryptographic wipe", "Dual-custody courier transport with GPS tracking", "RFID data center asset tags"],
      incidentExample: "An encrypted military-grade laptop containing naval component schematics is stolen from a train in Ichapur. BitLocker holds, but Possession is lost.",
      formula: "Possession = Physical_Custody AND Logical_Exclusive_Access"
    },
    authenticity: {
      title: "Authenticity",
      tagline: "Verifying genuine authorship, provenance, and true originating identity",
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-400",
      accent: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      definition: "Validates that information or communication genuinely originated from the claimed source entity and has not been forged or impersonated.",
      ciaOverlap: "Frequently conflated with Integrity in CIA. A perfectly formed forged message has 100% integrity but 0% authenticity.",
      enterpriseControls: ["X.509 Digital Certificates & PKI", "FIDO2 / WebAuthn hardware security keys", "SPF / DKIM / DMARC domain authentication", "Mutual TLS (mTLS) microservice handshakes"],
      incidentExample: "An attacker crafts a high-precision spear-phishing email spoofing the CEO's address to authorize an emergency ₹30 Lakh vendor invoice.",
      formula: "Verify_Signature(Data, Public_Key_Claimant) == TRUE"
    },
    utility: {
      title: "Utility",
      tagline: "Ensuring information remains practically usable, readable, and fit for purpose",
      color: "from-emerald-400/20 to-cyan-400/20 border-emerald-400/40 text-emerald-300",
      accent: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      definition: "Data must be in a usable form and format. If data is preserved perfectly but locked by lost keys or corrupted schemas, utility is destroyed.",
      ciaOverlap: "Ignored in classic CIA. Encrypted data with lost decryption keys is confidential, intact, and available, but totally useless.",
      enterpriseControls: ["Key escrow with Shamir's Secret Sharing", "Schema validation & backward-compatible data pipelines", "Format modernization & archival migration", "Balanced PII tokenization"],
      incidentExample: "A hospital's patient records (₹60 Lakh value) are encrypted, but the sole private key is overwritten by a patch script. Files are intact but have zero utility.",
      formula: "Utility = Data_Fitness AND Decipherability AND Semantic_Validity"
    }
  };

  // Real-world scenarios for Hexad simulation
  const scenarios = [
    {
      id: "laptop_theft",
      title: "Encrypted Laptop Stolen in Ichapur Transit",
      desc: "A field engineer's company laptop with BitLocker XTS-AES-256 full disk encryption is stolen from a commuter bag.",
      ciaResult: { c: true, i: true, a: true, verdict: "CIA Triad: No breach declared (Confidentiality preserved by encryption)." },
      hexadResult: {
        confidentiality: "Preserved (Strong Cipher)",
        integrity: "Preserved (Static bits)",
        availability: "Preserved (Cloud backup available)",
        possession: "VIOLATED (Physical custody lost to unknown adversary)",
        authenticity: "Preserved (No forged data generated yet)",
        utility: "Compromised locally (Device un-usable by employee)",
        verdict: "Hexad: Major Possession Incident! Triggers offline brute-force & side-channel threat analysis."
      }
    },
    {
      id: "crypto_lockout",
      title: "Automated Encryption with Wiped Decryption Key",
      desc: "A Barrackpore healthcare server encrypts 10 TB of patient scans. An admin script mistakenly deletes the key vault without an export.",
      ciaResult: { c: true, i: true, a: true, verdict: "CIA Triad: Ambiguous. Data is confidential, bits are intact, files are online." },
      hexadResult: {
        confidentiality: "Preserved (Ciphertext unreadable by unauthorized parties)",
        integrity: "Preserved (Cryptographic ciphertext has zero bit-rot)",
        availability: "Preserved (Raw ciphertext files respond to GET requests)",
        possession: "Preserved (Firm maintains custody of storage drives)",
        authenticity: "Preserved (Origin is known)",
        utility: "VIOLATED (Utility = 0%. Data is completely unreadable noise)",
        verdict: "Hexad: Catastrophic Utility Incident! Total business loss without classic CIA breach."
      }
    },
    {
      id: "cfo_spoofing",
      title: "Spoofed ₹35 Lakh Executive Wire Transfer",
      desc: "An adversary sends a synthesized, uncorrupted purchase order spoofing the CFO's email to the accounts team in Kolkata.",
      ciaResult: { c: true, i: true, a: true, verdict: "CIA Triad: High Integrity (the payload was not altered in transit)." },
      hexadResult: {
        confidentiality: "Preserved (Email reached intended recipient)",
        integrity: "Preserved (Bitstream matches what sender emitted)",
        availability: "Preserved (Email system operational)",
        possession: "Preserved (Email server in control)",
        authenticity: "VIOLATED (Authorship is fraudulent; impersonation of CFO)",
        utility: "Subverted (Misleading instructions designed to defraud ₹35 Lakh)",
        verdict: "Hexad: Critical Authenticity Breach! Integrity was clean, but origin provenance was fraudulent."
      }
    },
    {
      id: "over_masking",
      title: "Over-Aggressive PII Data Masking in Jadavpur FinTech",
      desc: "A compliance script replaces 15 digits of 16-digit credit card numbers and rounds all income fields to ₹0 in an analytics warehouse.",
      ciaResult: { c: true, i: true, a: true, verdict: "CIA Triad: High Confidentiality achieved; no unauthorized disclosure." },
      hexadResult: {
        confidentiality: "Preserved (Zero leakage of cleartext PII)",
        integrity: "Preserved (Transformations recorded deterministically)",
        availability: "Preserved (Database returns records in 2ms)",
        possession: "Preserved (Internal cluster)",
        authenticity: "Preserved (Internal system generated)",
        utility: "VIOLATED (ML credit risk scoring models fail with division-by-zero errors)",
        verdict: "Hexad: Critical Utility Impairment! Over-redaction rendered ₹2 Crore analytics pipeline useless."
      }
    }
  ];

  // Digital Signature Simulation Computed Values
  const simulatedHash = useMemo(() => {
    let hash = 0;
    const str = contractText + (tamperDoc ? " [TAMPERED BY ADVERSARY: ₹99,00,000 to MULE ACC 99281]" : "");
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return "0x" + Math.abs(hash).toString(16).padStart(16, "0").toUpperCase() + "7E4A9F0B21C";
  }, [contractText, tamperDoc]);

  const originalHash = useMemo(() => {
    let hash = 0;
    const str = contractText;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return "0x" + Math.abs(hash).toString(16).padStart(16, "0").toUpperCase() + "7E4A9F0B21C";
  }, [contractText]);

  const signatureValue = useMemo(() => {
    return "SIG-RSA4096-[" + originalHash.slice(2, 10) + "..." + originalHash.slice(-6) + "]-HSM-AUTH";
  }, [originalHash]);

  const verificationSuccess = !tamperDoc && isSigned;

  return (
    <div className={clsx("min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col space-y-12")}>
      
      {/* 1. TOPIC HEADER & HERO SECTION */}
      <section className={clsx("relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 md:p-10 shadow-2xl")}>
        <div className={clsx("relative z-10 flex flex-col space-y-4")}>
          <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit")}>
            <span className={clsx("w-2 h-2 rounded-full bg-purple-400 animate-pulse")} />
            Module 002 &bull; Topic 007 &bull; Extended Security Models
          </div>
          
          <h1 className={clsx("text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white")}>
            Parkerian Hexad, Non-Repudiation & Extended Assurance Models
          </h1>
          
          <p className={clsx("text-base md:text-lg text-slate-300 max-w-4xl leading-relaxed")}>
            Unpack why the classic 1970s CIA Triad falls short in modern distributed, cloud, and legal environments. Master Donn B. Parker’s 6 atomic pillars—<strong className="text-purple-400">Confidentiality, Integrity, Availability, Possession, Authenticity, and Utility</strong>—alongside cryptographic <strong className="text-cyan-400">Non-Repudiation</strong> and the DoD 5 Pillars of Information Assurance.
          </p>

          {/* Quick Metrics Bar */}
          <div className={clsx("grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80")}>
            <div className={clsx("bg-slate-950/60 p-3 rounded-xl border border-slate-800")}>
              <div className={clsx("text-xs text-slate-400")}>Hexad Attributes</div>
              <div className={clsx("text-xl font-bold text-purple-400")}>6 Atomic Pillars</div>
            </div>
            <div className={clsx("bg-slate-950/60 p-3 rounded-xl border border-slate-800")}>
              <div className={clsx("text-xs text-slate-400")}>Origin Model</div>
              <div className={clsx("text-xl font-bold text-cyan-400")}>Donn B. Parker (1998)</div>
            </div>
            <div className={clsx("bg-slate-950/60 p-3 rounded-xl border border-slate-800")}>
              <div className={clsx("text-xs text-slate-400")}>Legal Standard</div>
              <div className={clsx("text-xl font-bold text-emerald-400")}>IT Act Sec 3 & 10A</div>
            </div>
            <div className={clsx("bg-slate-950/60 p-3 rounded-xl border border-slate-800")}>
              <div className={clsx("text-xs text-slate-400")}>Defense Standard</div>
              <div className={clsx("text-xl font-bold text-rose-400")}>DoD 5 Pillars (IA)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE LIMITATIONS OF THE CIA TRIAD (WHY EXTEND?) */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white flex items-center gap-3")}>
            <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm")}>01</span>
            Why the Classic CIA Triad Is Incomplete
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base leading-relaxed")}>
            Formulated in early military mainframe eras, the classic CIA Triad oversimplifies complex threats into only three buckets. This causes severe blind spots in incident response and compliance.
          </p>
        </div>

        <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-6")}>
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("text-red-400 font-semibold text-lg flex items-center gap-2")}>
              <span className={clsx("w-2.5 h-2.5 rounded-full bg-red-400")} />
              The Possession Blind Spot
            </div>
            <p className={clsx("text-sm text-slate-300 leading-relaxed")}>
              If a physical backup drive with AES-256 encrypted payroll files is stolen by an adversary, CIA says: <em>&ldquo;Confidentiality unbroken, integrity intact, availability backed up = No Security Incident.&rdquo;</em>
            </p>
            <div className={clsx("text-xs bg-red-950/40 text-red-300 p-3 rounded-lg border border-red-800/40")}>
              <strong>Reality:</strong> The adversary now has unlimited offline time to perform physical side-channel attacks, fault injection, or quantum cryptanalysis. Physical control was lost!
            </div>
          </div>

          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("text-amber-400 font-semibold text-lg flex items-center gap-2")}>
              <span className={clsx("w-2.5 h-2.5 rounded-full bg-amber-400")} />
              The Authenticity Conflation
            </div>
            <p className={clsx("text-sm text-slate-300 leading-relaxed")}>
              CIA combines &ldquo;Authenticity&rdquo; into &ldquo;Integrity&rdquo;. But integrity only measures whether bits changed in flight, not whether the sender was an authorized human or a criminal imposter.
            </p>
            <div className={clsx("text-xs bg-amber-950/40 text-amber-300 p-3 rounded-lg border border-amber-800/40")}>
              <strong>Reality:</strong> A forged invoice sent by a scammer has 100% data integrity (never altered), but 0% authenticity (fake origin). Conflating them causes business fraud.
            </div>
          </div>

          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("text-cyan-400 font-semibold text-lg flex items-center gap-2")}>
              <span className={clsx("w-2.5 h-2.5 rounded-full bg-cyan-400")} />
              The Utility Paradox
            </div>
            <p className={clsx("text-sm text-slate-300 leading-relaxed")}>
              CIA has no measure for whether data is decipherable and functional. If a database is locked by lost keys or corrupted schemas, it remains 100% confidential and available on disk.
            </p>
            <div className={clsx("text-xs bg-cyan-950/40 text-cyan-300 p-3 rounded-lg border border-cyan-800/40")}>
              <strong>Reality:</strong> Without Utility, data is expensive electronic junk. Classic CIA fails to alert when encryption renders critical data permanently useless.
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE STUDIO 1: THE PARKERIAN HEXAD LABORATORY */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6 shadow-xl")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit")}>
            Interactive Studio 1
          </div>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white")}>
            Parkerian Hexad Dimension Explorer & Scenario Lab
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base")}>
            Select each of the 6 Parkerian Hexad pillars to inspect enterprise controls, or test real-world scenarios to see how the Hexad detects breaches that the CIA Triad misses.
          </p>
        </div>

        {/* Dimension Selector Tabs */}
        <div className={clsx("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2")}>
          {Object.keys(hexadData).map((key) => {
            const item = hexadData[key];
            const isSelected = selectedHexad === key;
            return (
              <button
                key={key}
                onClick={() => { setSelectedHexad(key); setSelectedScenario(null); }}
                className={clsx(
                  "p-3 rounded-xl text-left border transition-all flex flex-col justify-between",
                  isSelected
                    ? "bg-slate-800 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                )}
              &gt;
                <span className={clsx("text-xs font-mono uppercase tracking-wider", isSelected ? "text-purple-400" : "text-slate-500")}>
                  Pillar {Object.keys(hexadData).indexOf(key) + 1}
                </span>
                <span className={clsx("text-sm font-bold mt-1")}>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Detail Card */}
        {hexadData[selectedHexad] && (
          <div className={clsx("bg-gradient-to-br p-6 rounded-2xl border flex flex-col space-y-4", hexadData[selectedHexad].color)}>
            <div className={clsx("flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3")}>
              <div>
                <h3 className={clsx("text-xl font-bold text-white")}>{hexadData[selectedHexad].title}</h3>
                <p className={clsx("text-xs text-slate-300")}>{hexadData[selectedHexad].tagline}</p>
              </div>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-mono border", hexadData[selectedHexad].accent)}>
                {hexadData[selectedHexad].formula}
              </span>
            </div>

            <p className={clsx("text-sm text-slate-200 leading-relaxed")}>
              {hexadData[selectedHexad].definition}
            </p>

            <div className={clsx("grid grid-cols-1 md:grid-cols-2 gap-4 pt-2")}>
              <div className={clsx("bg-slate-950/80 p-4 rounded-xl border border-slate-800")}>
                <div className={clsx("text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2")}>Enterprise Defense Controls</div>
                <ul className={clsx("space-y-1.5 text-xs text-slate-300")}>
                  {hexadData[selectedHexad].enterpriseControls.map((ctrl, idx) => (
                    <li key={idx} className={clsx("flex items-center gap-2")}>
                      <span className={clsx("w-1.5 h-1.5 rounded-full bg-purple-400")} />
                      {ctrl}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={clsx("bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between")}>
                <div>
                  <div className={clsx("text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1")}>Classic Incident / Violation</div>
                  <p className={clsx("text-xs text-slate-300 leading-relaxed")}>{hexadData[selectedHexad].incidentExample}</p>
                </div>
                <div className={clsx("mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic")}>
                  <strong>CIA Contrast:</strong> {hexadData[selectedHexad].ciaOverlap}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-World Scenario Tester Sub-Section */}
        <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-4")}>
          <div className={clsx("flex items-center justify-between")}>
            <h4 className={clsx("text-base font-bold text-white flex items-center gap-2")}>
              <span className={clsx("w-2 h-2 rounded-full bg-cyan-400")} />
              Simulate Real-World Hexad vs. CIA Dilemmas
            </h4>
            <span className={clsx("text-xs text-slate-400 hidden sm:inline")}>Click a scenario to trigger side-by-side analysis</span>
          </div>

          <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3")}>
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={clsx(
                  "p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between",
                  selectedScenario?.id === sc.id
                    ? "bg-slate-900 border-cyan-500 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                )}
              &gt;
                <div className={clsx("font-bold text-cyan-400 mb-1")}>{sc.title}</div>
                <div className={clsx("text-[11px] text-slate-400 line-clamp-2")}>{sc.desc}</div>
              </button>
            ))}
          </div>

          {selectedScenario && (
            <div className={clsx("bg-slate-900/90 p-5 rounded-xl border border-cyan-500/30 flex flex-col space-y-4 animate-fadeIn")}>
              <div className={clsx("flex items-center justify-between border-b border-slate-800 pb-2")}>
                <span className={clsx("text-sm font-bold text-cyan-300")}>{selectedScenario.title}</span>
                <span className={clsx("text-xs text-slate-400")}>Case Assessment</span>
              </div>
              <p className={clsx("text-xs text-slate-300 italic")}>{selectedScenario.desc}</p>

              <div className={clsx("grid grid-cols-1 md:grid-cols-2 gap-4 text-xs")}>
                <div className={clsx("bg-slate-950 p-3 rounded-lg border border-red-500/30")}>
                  <div className={clsx("font-bold text-red-400 mb-1")}>Traditional CIA Triad Assessment</div>
                  <p className={clsx("text-slate-300 mb-2")}>{selectedScenario.ciaResult.verdict}</p>
                  <div className={clsx("text-[11px] text-slate-400")}>Fails to capture subtle threats beyond disclosure, integrity, or network uptime.</div>
                </div>

                <div className={clsx("bg-slate-950 p-3 rounded-lg border border-emerald-500/30")}>
                  <div className={clsx("font-bold text-emerald-400 mb-1")}>Parkerian Hexad Assessment</div>
                  <p className={clsx("text-slate-200 mb-2 font-medium")}>{selectedScenario.hexadResult.verdict}</p>
                  <div className={clsx("space-y-1 text-[11px] text-slate-400")}>
                    <div>• <strong>Possession:</strong> {selectedScenario.hexadResult.possession}</div>
                    <div>• <strong>Authenticity:</strong> {selectedScenario.hexadResult.authenticity}</div>
                    <div>• <strong>Utility:</strong> {selectedScenario.hexadResult.utility}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. DEEP DIVE: NON-REPUDIATION & LEGAL/CRYPTOGRAPHIC ASSURANCE */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white flex items-center gap-3")}>
            <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-sm")}>02</span>
            Non-Repudiation: Architecture, Cryptography & Indian IT Act 2000
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base leading-relaxed")}>
            Non-Repudiation provides indisputable proof of the origin and integrity of data such that neither the sender nor the receiver can deny authorizing or receiving a transaction in a court of law.
          </p>
        </div>

        {/* 4 Architectural Pillars of Non-Repudiation */}
        <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4")}>
          <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
            <div className={clsx("text-cyan-400 font-bold text-sm")}>1. Asymmetric Digital Signatures</div>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              The sender signs a SHA-256 hash of the payload using their private key. Since the private key is held exclusively by the signer, authorship cannot be repudiated.
            </p>
            <div className={clsx("mt-auto text-[11px] font-mono text-cyan-300/80 bg-cyan-950/30 p-2 rounded")}>
              Sig = RSA_Sign(PrivKey, SHA256(Doc))
            </div>
          </div>

          <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
            <div className={clsx("text-purple-400 font-bold text-sm")}>2. Hardware Security Modules (HSMs)</div>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              FIPS 140-2 / 140-3 Level 3 validated tamper-resistant hardware prevents extraction of signing keys even under physical silicon de-capping or memory dumping attacks.
            </p>
            <div className={clsx("mt-auto text-[11px] font-mono text-purple-300/80 bg-purple-950/30 p-2 rounded")}>
              Zeroization on Tamper Event
            </div>
          </div>

          <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
            <div className={clsx("text-amber-400 font-bold text-sm")}>3. RFC 3161 Time Stamping (TSA)</div>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              An independent, trusted Time Stamping Authority cryptographically binds an atomic UTC timestamp to the signature, proving the document existed before key revocation.
            </p>
            <div className={clsx("mt-auto text-[11px] font-mono text-amber-300/80 bg-amber-950/30 p-2 rounded")}>
              TSA_Token = Sign_TSA(Hash + UTC)
            </div>
          </div>

          <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
            <div className={clsx("text-emerald-400 font-bold text-sm")}>4. Statutory Legal Framework</div>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              Sections 3, 10A, and 35 of the Indian Information Technology Act 2000 grant digital signatures the exact same legal admissibility and evidentiary standing as wet-ink physical signatures.
            </p>
            <div className={clsx("mt-auto text-[11px] font-mono text-emerald-300/80 bg-emerald-950/30 p-2 rounded")}>
              IT Act 2000 Sec 10A Validity
            </div>
          </div>
        </div>

        {/* Visual Cryptographic Pipeline SVG */}
        <div className={clsx("bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col space-y-4")}>
          <div className={clsx("text-sm font-semibold text-slate-300 flex items-center justify-between")}>
            <span>End-to-End Non-Repudiation Cryptographic Flow</span>
            <span className={clsx("text-xs text-purple-400 font-mono")}>SHA-256 + RSA-4096 + RFC 3161 TSA</span>
          </div>

          <div className={clsx("w-full overflow-x-auto")}>
            <svg viewBox="0 0 900 240" className={clsx("w-full min-w-[700px] h-auto")}>
              <defs>
                <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Step 1: Document */}
              <rect x="20" y="30" width="130" height="70" rx="10" fill="url(#boxGrad1)" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="85" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Contract / Payload</text>
              <text x="85" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">₹25 Lakh Wire Order</text>

              {/* Arrow 1 */}
              <line x1="150" y1="65" x2="190" y2="65" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="170" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">Hash</text>

              {/* Step 2: SHA-256 Digest */}
              <rect x="190" y="30" width="130" height="70" rx="10" fill="url(#boxGrad1)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="255" y="60" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">SHA-256 Hash</text>
              <text x="255" y="80" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">0x7E4A...9F0B</text>

              {/* Arrow 2 */}
              <line x1="320" y1="65" x2="360" y2="65" stroke="#64748b" strokeWidth="2" />

              {/* Step 3: HSM Signing */}
              <rect x="360" y="30" width="150" height="70" rx="10" fill="url(#sigGrad)" stroke="#ec4899" strokeWidth="1.5" />
              <text x="435" y="55" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">HSM Private Key</text>
              <text x="435" y="75" fill="#fbcfe8" fontSize="10" textAnchor="middle">FIPS 140-2 Encrypted</text>
              <text x="435" y="90" fill="#e2e8f0" fontSize="9" fontFamily="monospace" textAnchor="middle">RSA-4096 Sign()</text>

              {/* Arrow 3 */}
              <line x1="510" y1="65" x2="550" y2="65" stroke="#64748b" strokeWidth="2" />

              {/* Step 4: TSA Token */}
              <rect x="550" y="30" width="140" height="70" rx="10" fill="url(#boxGrad1)" stroke="#eab308" strokeWidth="1.5" />
              <text x="620" y="55" fill="#eab308" fontSize="12" fontWeight="bold" textAnchor="middle">RFC 3161 TSA</text>
              <text x="620" y="75" fill="#fef08a" fontSize="10" textAnchor="middle">Atomic UTC Time</text>
              <text x="620" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle">Countersigned</text>

              {/* Arrow 4 to Transmission */}
              <line x1="690" y1="65" x2="730" y2="65" stroke="#64748b" strokeWidth="2" />

              {/* Step 5: Bundle */}
              <rect x="730" y="20" width="150" height="90" rx="10" fill="url(#boxGrad1)" stroke="#10b981" strokeWidth="1.5" />
              <text x="805" y="45" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Signed Package</text>
              <text x="805" y="65" fill="#6ee7b7" fontSize="10" textAnchor="middle">• Payload M</text>
              <text x="805" y="80" fill="#6ee7b7" fontSize="10" textAnchor="middle">• Digital Sig S</text>
              <text x="805" y="95" fill="#6ee7b7" fontSize="10" textAnchor="middle">• TSA Cert Token</text>

              {/* Bottom Verification Track */}
              <path d="M 805 110 L 805 160 L 100 160 L 100 180" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
              
              <rect x="20" y="180" width="860" height="50" rx="8" fill="#020617" stroke="#334155" />
              <text x="450" y="205" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                Receiver / Court Verification: Decrypt(Signature, Sender_PublicKey) == SHA256(Payload) AND TSA_Valid()
              </text>
              <text x="450" y="222" fill="#10b981" fontSize="10" textAnchor="middle">
                Result: Legally Binding Non-Repudiation of Origin & Delivery under Indian IT Act 2000 (Sec 10A)
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE STUDIO 2: DIGITAL SIGNATURE & NON-REPUDIATION LAB */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6 shadow-xl")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit")}>
            Interactive Studio 2
          </div>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white")}>
            Digital Signature & Non-Repudiation Simulator
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base")}>
            Simulate an authorized financial transaction originating in Kolkata. Test how tampering with the document breaks mathematical verification and proves fraudulent repudiation attempts.
          </p>
        </div>

        <div className={clsx("grid grid-cols-1 lg:grid-cols-2 gap-6")}>
          {/* Left Column: Document Controls */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-4")}>
            <div className={clsx("flex items-center justify-between")}>
              <label className={clsx("text-xs font-semibold text-slate-300 uppercase tracking-wider")}>
                Origin Document Payload
              </label>
              <span className={clsx("text-[11px] text-purple-400 font-mono")}>UTF-8 Raw Text</span>
            </div>

            <textarea
              rows={3}
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              className={clsx("w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono resize-none")}
            /&gt;

            <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-3")}>
              <div>
                <label className={clsx("text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1")}>
                  Signing Key Source
                </label>
                <select
                  value={signerKey}
                  onChange={(e) => setSignerKey(e.target.value)}
                  className={clsx("w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:outline-none")}
                &gt;
                  <option value="HSM-RSA-4096-DEBANGSHU-CORP">Debangshu (Director, HSM RSA-4096)</option>
                  <option value="HSM-ECDSA-P384-MAMATA-MED">Mamata (MD, HSM ECDSA P-384)</option>
                  <option value="HSM-ED25519-SUSMITA-FIN">Susmita (CFO, HSM Ed25519)</option>
                </select>
              </div>

              <div>
                <label className={clsx("text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1")}>
                  Time Stamping Authority
                </label>
                <input
                  type="text"
                  readOnly
                  value="RFC 3161 TSA [Kolkata Node]"
                  className={clsx("w-full bg-slate-900/60 border border-slate-800 rounded-lg p-2 text-xs text-amber-300 font-mono cursor-not-allowed")}
                />
              </div>
            </div>

            {/* Tamper Toggle Switch */}
            <div className={clsx("p-4 rounded-xl border transition-all flex items-center justify-between", tamperDoc ? "bg-red-950/30 border-red-500/50" : "bg-slate-900/60 border-slate-800")}>
              <div>
                <div className={clsx("text-xs font-bold", tamperDoc ? "text-red-400" : "text-slate-300")}>
                  {tamperDoc ? "Adversary Payload Injected!" : "Payload Untampered (In Transit)"}
                </div>
                <div className={clsx("text-[11px] text-slate-400")}>
                  {tamperDoc ? "Adversary changed account to fraudulent mule" : "Document travels unaltered across public network"}
                </div>
              </div>
              <button
                onClick={() => setTamperDoc(!tamperDoc)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  tamperDoc
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                )}
              &gt;
                {tamperDoc ? "Revert Tamper" : "Simulate Tamper"}
              </button>
            </div>
          </div>

          {/* Right Column: Cryptographic Verification State */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-4")}>
            <div className={clsx("text-xs font-semibold text-slate-300 uppercase tracking-wider")}>
              Cryptographic Proof & Verification Engine
            </div>

            <div className={clsx("space-y-2 text-xs font-mono")}>
              <div className={clsx("bg-slate-900 p-2.5 rounded-lg border border-slate-800")}>
                <span className={clsx("text-slate-400 block text-[10px]")}>ORIGINAL SHA-256 HASH (SIGNED):</span>
                <span className={clsx("text-cyan-400 break-all")}>{originalHash}</span>
              </div>

              <div className={clsx("bg-slate-900 p-2.5 rounded-lg border", tamperDoc ? "border-red-500/50" : "border-slate-800")}>
                <span className={clsx("text-slate-400 block text-[10px]")}>COMPUTED HASH AT RECEIVER:</span>
                <span className={clsx("break-all", tamperDoc ? "text-red-400" : "text-cyan-400")}>{simulatedHash}</span>
              </div>

              <div className={clsx("bg-slate-900 p-2.5 rounded-lg border border-slate-800")}>
                <span className={clsx("text-slate-400 block text-[10px]")}>GENERATED SIGNATURE TOKEN:</span>
                <span className={clsx("text-purple-400 break-all")}>{signatureValue}</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border flex flex-col space-y-2", verificationSuccess ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-red-950/30 border-red-500/40 text-red-300")}>
              <div className={clsx("flex items-center gap-2 font-bold text-sm")}>
                <span className={clsx("w-3 h-3 rounded-full", verificationSuccess ? "bg-emerald-400 animate-pulse" : "bg-red-400")} />
                {verificationSuccess ? "MATHEMATICAL NON-REPUDIATION VERIFIED" : "VERIFICATION FAILED: INTEGRITY BROKEN"}
              </div>
              <p className={clsx("text-xs leading-relaxed text-slate-300")}>
                {verificationSuccess
                  ? "The computed digest matches the decrypted digital signature perfectly. The signer cannot repudiate this transaction in court under Section 10A of the Indian IT Act 2000."
                  : "Mismatch detected! The data received has been altered from what the signer approved. The transaction is rejected immediately by the banking gateway."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARATIVE TAXONOMY: CIA vs. PARKERIAN HEXAD vs. DOD 5 PILLARS */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white flex items-center gap-3")}>
            <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm")}>03</span>
            Comparative Taxonomy: CIA vs. Parkerian Hexad vs. DoD 5 Pillars
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base leading-relaxed")}>
            Understand how international defense and commercial security models structure their assurance requirements.
          </p>
        </div>

        {/* Tab Navigation for Comparative Models */}
        <div className={clsx("flex gap-2 border-b border-slate-800 pb-2")}>
          <button
            onClick={() => setActiveModelTab("hexad")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeModelTab === "hexad" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-slate-400 hover:text-slate-200"
            )}
          &gt;
            Parkerian Hexad (6 Pillars)
          </button>
          <button
            onClick={() => setActiveModelTab("dod")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeModelTab === "dod" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-slate-400 hover:text-slate-200"
            )}
          &gt;
            DoD 5 Pillars of IA
          </button>
          <button
            onClick={() => setActiveModelTab("matrix")}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all",
              activeModelTab === "matrix" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-slate-400 hover:text-slate-200"
            )}
          &gt;
            Full Comparison Matrix
          </button>
        </div>

        {/* Tab Content 1: Parkerian Hexad Recap */}
        {activeModelTab === "hexad" && (
          <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")}>
            {Object.keys(hexadData).map((k) => (
              <div key={k} className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
                <span className={clsx("text-xs font-bold text-purple-400 uppercase tracking-wider")}>{hexadData[k].title}</span>
                <p className={clsx("text-xs text-slate-300 leading-relaxed")}>{hexadData[k].definition}</p>
                <div className={clsx("mt-auto text-[11px] text-slate-400 italic")}>Key Control: {hexadData[k].enterpriseControls[0]}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: DoD 5 Pillars */}
        {activeModelTab === "dod" && (
          <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4")}>
            <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
              <span className={clsx("text-xs font-bold text-rose-400")}>1. Availability</span>
              <p className={clsx("text-xs text-slate-300")}>Timely, reliable access to information and systems for authorized warfighters and commanders.</p>
            </div>
            <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
              <span className={clsx("text-xs font-bold text-rose-400")}>2. Integrity</span>
              <p className={clsx("text-xs text-slate-300")}>Protection against unauthorized modification or destruction of intelligence and telemetry.</p>
            </div>
            <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
              <span className={clsx("text-xs font-bold text-rose-400")}>3. Authentication</span>
              <p className={clsx("text-xs text-slate-300")}>Security measures confirming the genuine identity of transmitters and operators (CAC cards).</p>
            </div>
            <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
              <span className={clsx("text-xs font-bold text-rose-400")}>4. Confidentiality</span>
              <p className={clsx("text-xs text-slate-300")}>Ensuring classified documents are never read by unauthorized adversaries.</p>
            </div>
            <div className={clsx("bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col space-y-2")}>
              <span className={clsx("text-xs font-bold text-rose-400")}>5. Non-Repudiation</span>
              <p className={clsx("text-xs text-slate-300")}>Proof of origin and receipt so orders cannot be disavowed by field units or high command.</p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Full Comparison Matrix */}
        {activeModelTab === "matrix" && (
          <div className={clsx("w-full overflow-x-auto")}>
            <table className={clsx("w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden")}>
              <thead className={clsx("bg-slate-950 text-slate-400 border-b border-slate-800 uppercase")}>
                <tr>
                  <th className={clsx("p-3")}>Attribute / Dimension</th>
                  <th className={clsx("p-3")}>Classic CIA Triad</th>
                  <th className={clsx("p-3")}>Parkerian Hexad</th>
                  <th className={clsx("p-3")}>DoD 5 Pillars (IA)</th>
                </tr>
              </thead>
              <tbody className={clsx("divide-y divide-slate-800 text-slate-300 bg-slate-950/60")}>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Confidentiality</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Integrity</td>
                  <td className={clsx("p-3 text-amber-400")}>Included (Overloaded)</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Atomic)</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Availability</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Possession / Control</td>
                  <td className={clsx("p-3 text-red-400")}>Missing</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Core)</td>
                  <td className={clsx("p-3 text-slate-400")}>Managed via Physical Policy</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Authenticity</td>
                  <td className={clsx("p-3 text-red-400")}>Conflated with Integrity</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Core)</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Authentication)</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Utility</td>
                  <td className={clsx("p-3 text-red-400")}>Missing</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Core)</td>
                  <td className={clsx("p-3 text-slate-400")}>Managed via Ops Readiness</td>
                </tr>
                <tr>
                  <td className={clsx("p-3 font-semibold text-white")}>Non-Repudiation</td>
                  <td className={clsx("p-3 text-red-400")}>Missing</td>
                  <td className={clsx("p-3 text-purple-400")}>Supported via Authenticity</td>
                  <td className={clsx("p-3 text-emerald-400")}>Included (Core Pillar)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 7. REAL-WORLD REGIONAL CASE STUDIES */}
      <section className={clsx("rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col space-y-6")}>
        <div className={clsx("flex flex-col space-y-2")}>
          <h2 className={clsx("text-2xl sm:text-3xl font-bold text-white flex items-center gap-3")}>
            <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm")}>04</span>
            Real-World Enterprise Case Studies (India & Global)
          </h2>
          <p className={clsx("text-slate-300 text-sm sm:text-base leading-relaxed")}>
            Examine how senior architects Mamata, Susmita, Abhronila, and Mahima applied extended security models to resolve multimillion-rupee security dilemmas.
          </p>
        </div>

        <div className={clsx("grid grid-cols-1 md:grid-cols-2 gap-6")}>
          {/* Case 1 */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("flex items-center justify-between border-b border-slate-800 pb-2")}>
              <span className={clsx("text-xs font-bold text-purple-400 uppercase tracking-wider")}>Kolkata Stock Brokerage</span>
              <span className={clsx("text-xs text-emerald-400 font-mono")}>₹8.5 Crore Trade Dispute</span>
            </div>
            <h3 className={clsx("text-base font-bold text-white")}>Susmita Defends Against Trade Repudiation with HSM Logs</h3>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              A client executed an intraday derivatives transaction of ₹8.5 Crore before a major index crash, incurring a loss of ₹1.1 Crore. The client claimed their credentials were stolen and repudiated the trade in court.
            </p>
            <div className={clsx("bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300")}>
              <strong>Remediation:</strong> Susmita presented FIPS 140-2 HSM cryptographic logs with client WebAuthn hardware signatures and RFC 3161 timestamps. The tribunal dismissed the client’s claim under Indian IT Act Section 10A, saving the brokerage ₹8.5 Crore.
            </div>
          </div>

          {/* Case 2 */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("flex items-center justify-between border-b border-slate-800 pb-2")}>
              <span className={clsx("text-xs font-bold text-cyan-400 uppercase tracking-wider")}>Barrackpore Multispecialty Hospital</span>
              <span className={clsx("text-xs text-cyan-400 font-mono")}>₹45 Lakh Patient Data</span>
            </div>
            <h3 className={clsx("text-base font-bold text-white")}>Mamata Solves a Catastrophic Utility Lockout</h3>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              An overzealous automated backup system encrypted 12 TB of patient DICOM MRI scans. A patch script accidentally wiped the local key vault without an offsite backup, destroying data Utility while preserving CIA integrity.
            </p>
            <div className={clsx("bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300")}>
              <strong>Remediation:</strong> Mamata redesigned the key management architecture utilizing Shamir&apos;s Secret Sharing (3-of-5 quorum) distributed across physical smartcards held by clinical directors, ensuring data utility can never be permanently destroyed.
            </div>
          </div>

          {/* Case 3 */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("flex items-center justify-between border-b border-slate-800 pb-2")}>
              <span className={clsx("text-xs font-bold text-amber-400 uppercase tracking-wider")}>Ichapur Defense Precision Works</span>
              <span className={clsx("text-xs text-amber-400 font-mono")}>₹1.2 Crore R&D Asset</span>
            </div>
            <h3 className={clsx("text-base font-bold text-white")}>Abhronila Responds to Loss of Physical Possession</h3>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              A secure courier lost an armored container holding six BitLocker-encrypted NVMe drives containing naval defense blueprints. While confidentiality was maintained by AES-256, physical Possession was lost.
            </p>
            <div className={clsx("bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300")}>
              <strong>Remediation:</strong> Abhronila classified the incident as an L1 physical breach, initiated instant cryptographic key revocation via PKI, and mandated dual-custody GPS geofenced containers for all future defense component transits.
            </div>
          </div>

          {/* Case 4 */}
          <div className={clsx("bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col space-y-3")}>
            <div className={clsx("flex items-center justify-between border-b border-slate-800 pb-2")}>
              <span className={clsx("text-xs font-bold text-rose-400 uppercase tracking-wider")}>Jadavpur Academic Records Portal</span>
              <span className={clsx("text-xs text-rose-400 font-mono")}>₹35 Lakh Forgery Racket</span>
            </div>
            <h3 className={clsx("text-base font-bold text-white")}>Mahima Implements PAdES Authenticity Verification</h3>
            <p className={clsx("text-xs text-slate-300 leading-relaxed")}>
              Fraudsters circulated forged degree certificates that had perfect layout integrity (matching templates) but zero authenticity, scamming employers out of ₹35 Lakh in placement guarantees.
            </p>
            <div className={clsx("bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300")}>
              <strong>Remediation:</strong> Mahima deployed asymmetric PDF digital signatures (PAdES standard) with public verification QR codes anchored to the university&apos;s official PKI root, eliminating certificate forgery entirely.
            </div>
          </div>
        </div>
      </section>

      {/* 8. TEACHER'S NOTE */}
      <Teacher
        note={
          "Remember: The Parkerian Hexad does not replace the CIA Triad; it refines and atomizes it. In modern microservice and multi-cloud architectures, you will frequently encounter scenarios where classic CIA gives a false sense of security—such as encrypted device loss (Possession), lost keys (Utility), or spoofed API requests (Authenticity). For non-repudiation, always ensure your systems combine asymmetric digital signatures, RFC 3161 timestamps, and FIPS 140-2 Level 3 HSMs to achieve legal admissibility under Section 10A of the Indian IT Act 2000."
        }
      />

      {/* 9. FAQ COMPONENT */}
      <FAQTemplate
        title="Parkerian Hexad & Non-Repudiation FAQs"
        questions={questions}
      />

      {/* 10. PRINTABLE NOTE COMPONENT */}
      <PlainTextPrint
        content={noteText}
        title="Parkerian Hexad, Non-Repudiation & Extended Assurance Models"
        stampEnabled={true}
        showDownload={true}
        downloadButtonText="Download Note"
        downloadFileName="topic8_note.txt"
      />
    </div>
  );
};

export default Topic7;
