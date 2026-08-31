import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import didEnginePy from "./topic5_files/did_audit_ledger.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgTriangleId = useId();
  const svgZkpId = useId();

  // =========================================================================
  // STUDIO 1 & 2: W3C VERIFIABLE CREDENTIAL & SELECTIVE DISCLOSURE (ZKP)
  // =========================================================================
  const [discloseSalary, setDiscloseSalary] = useState(false);
  const [discloseDob, setDiscloseDob] = useState(false);
  const [isCredentialTampered, setIsCredentialTampered] = useState(false);

  const vcState = useMemo(() => {
    if (isCredentialTampered) {
      return {
        verified: false,
        status: "FORGED CREDENTIAL / SIGNATURE MISMATCH 🚨",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        officer: "Susmita Mukherjee",
        department: "Municipal Treasury",
        clearance: "TOP_SECRET",
        dob: discloseDob ? "1998-04-12" : "HIDDEN (ZKP Proved: Age >= 18 ✔)",
        salary: discloseSalary ? "₹1,25,000 / month" : "HIDDEN (ZKP Proved: Salary > ₹50,000 ✔)",
        explanation: "Digital signature verification failed! The cryptographic proof does not match the Issuer's public key registered on the blockchain."
      };
    } else {
      return {
        verified: true,
        status: "VERIFIABLE PRESENTATION AUTHENTIC ✔ (W3C DID)",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        officer: "Susmita Mukherjee",
        department: "Municipal Treasury",
        clearance: "TOP_SECRET",
        dob: discloseDob ? "1998-04-12" : "HIDDEN (ZKP Proved: Age >= 18 ✔)",
        salary: discloseSalary ? "₹1,25,000 / month" : "HIDDEN (ZKP Proved: Salary > ₹50,000 ✔)",
        explanation: "BBS+ cryptographic signature verified against Issuer DID on blockchain. Zero-Knowledge Proof mathematically validates age and clearance without leaking raw private data."
      };
    }
  }, [discloseSalary, discloseDob, isCredentialTampered]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_did_treasury");

  const regionalDrills = {
    barrackpore_did_treasury: {
      id: "barrackpore_did_treasury",
      title: "Barrackpore Municipal Treasury: Officer DID & Selective Disclosure",
      location: "Municipal financial portal processing disbursements across 40 department branches",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Adversaries attempted credential harvesting and phishing attacks against treasury clerks to intercept authorization passwords.",
      solution:
        "Replaced passwords with W3C Verifiable Credentials stored in mobile hardware Secure Enclaves with BBS+ zero-knowledge selective disclosure.",
      outcome:
        "100% elimination of credential theft; clerks authenticate instantly without revealing private Aadhaar or DOB details."
    },
    kolkata_fintech_audit_anchoring: {
      id: "kolkata_fintech_audit_anchoring",
      title: "Salt Lake Sector V FinTech: Automated SIEM Audit Ledger",
      location: "Core transaction database processing ₹15,00,00,000 in daily customer remittances",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Malicious insider with root database access attempted to modify transaction records and purge corresponding SIEM logs.",
      solution:
        "Deployed 60-second Merkle Root anchoring of SIEM logs onto an immutable blockchain smart contract.",
      outcome:
        "Attempted log deletion immediately flagged by automated audit cron; provided mathematical non-repudiation during RBI compliance audits."
    },
    ichapur_defense_airgapped_did: {
      id: "ichapur_defense_airgapped_did",
      title: "Ichapur Defense Facility: Air-Gapped Kiosk DID Verification",
      location: "Classified defense manufacturing and CAD engineering entry gates",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries attempted to forge contractor physical badges to gain unauthorized access to classified facility rooms.",
      solution:
        "Installed offline air-gapped verification kiosks verifying contractor Verifiable Presentation QR codes against pre-cached government public keys.",
      outcome:
        "Zero forged badge entries; offline kiosks operate reliably during complete network blackouts and cyber attacks."
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
                <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 5
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Blockchain for Decentralized Identity (DID) &amp; Tamper-Proof Audit Logging
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-indigo-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Decentralized Identifiers (DIDs) eliminate centralized identity silos (Google/Okta) and empower users with Self-Sovereign Identity.
            Explore the <strong>W3C Trust Triangle (Issuer, Holder, Verifier)</strong>, analyze 
            <strong>Zero-Knowledge Selective Disclosure using BBS+ Signatures</strong>, examine how 
            <strong>Decentralized Registries prevent Phone-Home tracking</strong>, and master 
            <strong>Merkle Tree Batch Anchoring for Tamper-Proof SIEM Audit Logs</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: W3C DID & SELECTIVE DISCLOSURE (ZKP) SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🪪</span> Studio 1: W3C Verifiable Presentation &amp; Selective Disclosure (ZKP) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Toggle selective disclosure controls to prove claims without revealing private dates of birth or exact financial salaries.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", vcState.badgeColor)}>
              {vcState.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Holder Privacy &amp; Verification Controls
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Disclose Exact Date of Birth</div>
                  <div className="text-[10px] text-slate-400">Unchecked: Presents ZKP proving "Age $\ge 18$" only</div>
                </div>
                <input
                  type="checkbox"
                  checked={discloseDob}
                  onChange={(e) => setDiscloseDob(e.target.checked)}
                  className="accent-indigo-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Disclose Exact Monthly Salary</div>
                  <div className="text-[10px] text-slate-400">Unchecked: Presents ZKP proving "Salary &gt; ₹50,000" only</div>
                </div>
                <input
                  type="checkbox"
                  checked={discloseSalary}
                  onChange={(e) => setDiscloseSalary(e.target.checked)}
                  className="accent-indigo-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-rose-900/60 cursor-pointer">
                <div>
                  <div className="font-semibold text-rose-400">Adversarial Tamper: Alter Credential Signature</div>
                  <div className="text-[10px] text-slate-400">Simulates forged signature without Issuer private key</div>
                </div>
                <input
                  type="checkbox"
                  checked={isCredentialTampered}
                  onChange={(e) => setIsCredentialTampered(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2 font-mono">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Verifier Screen (Relying Party)</span>
                  <span className="text-indigo-400 text-[10px]">Issuer: did:wb_gov:treasury</span>
                </div>
                
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Officer Name:</span>
                    <span className="text-white font-bold">{vcState.officer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="text-slate-300">{vcState.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Security Clearance:</span>
                    <span className="text-emerald-400 font-bold">{vcState.clearance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date of Birth / Age:</span>
                    <span className={clsx("font-bold", discloseDob ? "text-amber-400" : "text-cyan-400")}>
                      {vcState.dob}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Salary Status:</span>
                    <span className={clsx("font-bold", discloseSalary ? "text-amber-400" : "text-cyan-400")}>
                      {vcState.salary}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
                <strong>Forensic Diagnostic: </strong> {vcState.explanation}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 2: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of municipal officer DID wallets, SIEM audit anchoring, and air-gapped defense verification.
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
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_did_treasury" ? "Barrackpore Treasury DID" : key === "kolkata_fintech_audit_anchoring" ? "Kolkata SIEM Ledger" : "Ichapur Air-Gapped Kiosk"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
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
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider block">DID Architecture</span>
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
                <span><strong>Publishing Raw PII on Blockchains:</strong> Blockchains are immutable and public; storing plaintext names, Aadhaar, or salaries violates privacy laws (GDPR/DPDP Act).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Over-Disclosing Attributes in Proofs:</strong> Presenting entire digital credentials when a simple Zero-Knowledge threshold proof (Age $\ge 18$) is sufficient.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Storing DID Private Keys in Software Memory:</strong> Unprotected keys can be exfiltrated by memory-scraping malware; mandate hardware Secure Enclaves.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> DID &amp; Audit Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy BBS+ Signatures for Selective Disclosure:</strong> Generate unlinkable, zero-knowledge proofs to protect user privacy from verifier tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Perform 60-Second Merkle Root Anchoring:</strong> Batch SIEM logs and anchor roots onto immutable blockchains to guarantee tamper-proof audit trails.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Crypto-Shredding for Privacy Compliance:</strong> Anchor salted hashes on-chain and delete the secret salt to fulfill data erasure requests.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Think About:</span>
              <p className="leading-relaxed">
                Why does DID eliminate Phone-Home tracking? Because the relying party (verifier) verifies the Issuer's signature directly against the public blockchain registry without sending any network request back to the Issuer!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>W3C DIDs resolve to JSON-LD DID Documents containing public keys.</li>
                <li>Trust Triangle: Issuer, Holder (Mobile Wallet), and Verifier.</li>
                <li>BBS+ signatures enable multi-claim Zero-Knowledge Selective Disclosure.</li>
                <li>Never store raw PII on-chain; store only salted hashes (Crypto-Shredding).</li>
                <li>Hourly Merkle batch anchoring guarantees tamper-proof SIEM audit logs.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Decentralized Identity &amp; Audit Logging Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating DID creation, Verifiable Credential issuance, ZKP selective disclosure, and audit anchoring
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={didEnginePy}
            title="did_audit_ledger.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Decentralized Identity (DID) &amp; Audit Logging FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the W3C Trust Triangle (Issuer, Holder, Verifier) and explain how DIDs resolve to DID Documents. Describe how BBS+ signatures enable Zero-Knowledge Selective Disclosure without revealing underlying PII. Explain how blockchain Merkle root anchoring guarantees tamper-proof SIEM audit trails, and describe the Crypto-Shredding method for GDPR/DPDP Act compliance."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Decentralized Identity (DID) & Audit Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 5 Note"
            downloadFileName="topic5_did_audit_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
