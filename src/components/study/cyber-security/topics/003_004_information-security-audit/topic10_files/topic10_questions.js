const questions = [
  {
    question: "What are the 7 Core Principles of Auditing defined under ISO 19011:2018 Clause 4?",
    shortAnswer: "1. Integrity; 2. Fair Presentation; 3. Due Professional Care; 4. Confidentiality; 5. Independence; 6. Evidence-Based Approach; 7. Risk-Based Approach.",
    explanation: "ISO 19011 Clause 4 establishes these seven foundational principles as the non-negotiable benchmark for all management system auditors, ensuring audits produce objective, truthful, and reproducible conclusions.",
    hint: "Integrity, Fair Presentation, Due Care, Confidentiality, Independence, Evidence-Based, and Risk-Based.",
    level: "basic",
    codeExample: `// ISO 19011 Clause 4 Audit Principles:
1. Integrity:            Honesty, responsibility, and ethical diligence.
2. Fair Presentation:    Obligation to report truthfully and accurately.
3. Due Professional Care: Applying reasoned judgment and competence.
4. Confidentiality:      Discretion and safeguarding sensitive auditee data.
5. Independence:         Impartiality and freedom from conflict of interest.
6. Evidence-Based:       Reproducible findings grounded in verifiable facts.
7. Risk-Based:           Prioritizing audit effort based on operational risk.`
  },
  {
    question: "What constitutes a 'Self-Review Threat' to auditor independence, and how must it be mitigated under ISO 19011 and IIA standards?",
    shortAnswer: "A self-review threat occurs when an auditor evaluates systems, policies, or controls that they personally designed, implemented, or consulted on; it is mitigated by enforcing a mandatory 'cooling-off period' (typically 2 years) and assigning an independent auditor.",
    explanation: "If a security consultant builds an organization's AWS firewall rules and then conducts the ISO 27001 certification audit on that same firewall, they cannot objectively evaluate their own design flaws. A mandatory cooling-off period prevents this conflict of interest.",
    hint: "Auditing your own previous work; fixed by a 2-year cooling-off period and auditor reassignment.",
    level: "basic",
    codeExample: `// Self-Review Threat Detection & Mitigation:
Condition: Auditor 'Debangshu' designed the SCADA RTU architecture in 2025.
Audit:     Scheduled to lead the 2026 Substation Security Audit.
Conflict:  SELF-REVIEW THREAT (High Risk of Bias / Blind Spots).
Action:    Recuse Debangshu; Assign independent Lead Auditor 'Mamata'; Enforce 24-month cooling-off!`
  },
  {
    question: "What is an 'Intimidation Threat' in information security auditing, and what is the auditor's professional obligation when pressured by C-Suite executives?",
    shortAnswer: "An intimidation threat occurs when auditee management pressures, coerces, or threatens the auditor (e.g. withholding fees or threatening litigation) to downgrade or suppress severe findings; the auditor must refuse, report objectively, and escalate to the Audit Committee or Accreditation Registrar.",
    explanation: "Under the principle of Fair Presentation (ISO 19011) and the ISACA Code of Ethics, an auditor cannot water down a Major Non-Conformity into an OFI simply because the auditee's CIO fears losing their annual performance bonus.",
    hint: "Pressure from executives to hide or downgrade findings; auditor must stand firm and escalate to the Audit Committee.",
    level: "moderate",
    codeExample: `// Intimidation Threat Escalation Workflow:
Incident:   CIO threatens to cancel vendor contract if 'Missing Encryption' is logged as Major NC.
Violation:  ISACA Code of Professional Ethics #2 & #6 (Objectivity & Truthful Reporting).
Resolution: Auditor logs Major NC with objective evidence (PLOR); Informs Audit Committee & Registrar.`
  },
  {
    question: "What is 'Professional Skepticism', and how does the auditor's mindset differ from a routine IT administrator?",
    shortAnswer: "Professional skepticism is an attitude that includes a questioning mind, being alert to conditions that may indicate possible misstatement due to error or fraud, and a critical assessment of audit evidence ('Trust, but Verify' with objective proof).",
    explanation: "An IT admin might accept a colleague's verbal confirmation that 'all backups are encrypted'. A professional auditor practicing skepticism demands raw cryptographic logs, decryption verification keys, and test restore reports before accepting the control as conformant.",
    hint: "A questioning mind that demands verifiable evidence rather than accepting verbal assurances.",
    level: "basic",
    codeExample: `// Professional Skepticism in Action:
Auditee: "We run antivirus scans on all 500 servers every midnight."
Auditor: "Please generate the centralized SIEM telemetry report showing agent connectivity and scan completion logs for the past 30 days."
Evidence: Only 320/500 servers reported ➔ Non-Conformity recorded!`
  },
  {
    question: "Under the Indian IT Act 2000 Section 72A and DPDP Act 2023 Section 8, what are the legal consequences for an auditor who leaks confidential auditee data?",
    shortAnswer: "Section 72A of the IT Act imposes up to 3 YEARS IMPRISONMENT and fines up to ₹5 LAKHS for disclosing confidential personal information in breach of lawful contract; DPDP Act Section 8 imposes regulatory fines up to ₹250 CRORES on non-compliant entities.",
    explanation: "Auditors gain access to highly sensitive proprietary data, source code, and unpatched CVE vulnerabilities during fieldwork. Breaching confidentiality violates both international ethical standards (ISO 19011) and Indian criminal and civil law.",
    hint: "Up to 3 years imprisonment and ₹5 Lakhs fine under Section 72A IT Act + DPDP penalties.",
    level: "moderate",
    codeExample: `// Statutory Confidentiality Safeguards:
Legal Framework: IT Act 2000 Section 72A & Bharatiya Nyaya Sanhita (BNS) 2023.
Mandate:         Mandatory Bilateral Non-Disclosure Agreement (NDA) + Encrypted Evidence Vaults.
Penalty:         Criminal prosecution, cancellation of CERT-In empanelment, and civil damages!`
  },
  {
    question: "What is a 'Self-Interest Threat' to auditor independence, and why does offering both implementation consulting and certification auditing violate ISO 17021-1?",
    shortAnswer: "A self-interest threat arises when an auditor or auditing firm benefits financially or personally from audit outcomes; ISO/IEC 17021-1 strictly forbids Certification Bodies from providing ISMS implementation consultancy to organizations they certify.",
    explanation: "If a consulting firm charges ₹20 Lakhs to build an ISMS and then charges ₹5 Lakhs to certify it, the firm has an overwhelming financial interest in declaring their own work 'fully compliant', destroying audit impartiality.",
    hint: "Financial benefit biasing the audit; ISO 17021 bans consulting and certifying the same client.",
    level: "moderate",
    codeExample: `// ISO 17021-1 Anti-Consulting Rule:
Firm A: Offers ISMS Implementation Consulting (₹20,00,000)
Firm A: Offers ISO 27001 Certification Audit (₹5,00,000)
Status: STRICTLY ILLEGAL under ISO/IEC 17021-1 Clause 5.2.
Remedy: Complete organizational separation; separate legal entities and independent personnel.`
  },
  {
    question: "What is a 'Familiarity Threat' in security auditing, and how do international standards enforce auditor rotation?",
    shortAnswer: "A familiarity threat occurs when an auditor develops too close or long-standing a relationship with auditee management over multi-year audits, eroding professional skepticism; it is mitigated by mandatory lead auditor rotation every 3 to 5 years.",
    explanation: "After auditing the same client for several consecutive years, an auditor may become sympathetic to the auditee's operational difficulties and overlook repeated non-conformities. Mandatory lead auditor rotation brings fresh, unbiased perspectives.",
    hint: "Auditor becomes too friendly with the auditee over time; mitigated by mandatory rotation every 3-5 years.",
    level: "basic",
    codeExample: `// Auditor Rotation Rule:
Year 1 (2024): Lead Auditor 'Mamata' (Initial Certification)
Year 2 (2025): Lead Auditor 'Mamata' (Surveillance Audit 1)
Year 3 (2026): Lead Auditor 'Mamata' (Surveillance Audit 2)
Year 4 (2027): MANDATORY ROTATION ➔ Assign Lead Auditor 'Debangshu' for Recertification!`
  },
  {
    question: "Under the CERT-In Empanelment Charter for Information Security Auditing Organizations, what ethical commitments are mandatory?",
    shortAnswer: "Empaneled auditors must sign strict Conflict of Interest (COI) declarations, execute non-disclosure agreements, maintain absolute confidentiality of discovered critical infrastructure vulnerabilities, and immediately report zero-day exploits to CERT-In.",
    explanation: "CERT-In empaneled auditors evaluate India's Critical Information Infrastructure (CII) across banking, power, telecom, and government sectors. Ethical lapses or vulnerability leaks directly jeopardize national security.",
    hint: "CERT-In requires COI declarations, NDAs, strict vulnerability secrecy, and zero-day reporting.",
    level: "moderate",
    codeExample: `// CERT-In Empanelled Auditor Charter:
1. Annual Non-Disclosure & Anti-Bribery Covenant
2. Mandatory Disclosure of any financial interest in audited bank or telecom
3. Immediate 6-hour vulnerability escalation to CERT-In Incident Response Desk
4. Total prohibition of storing client vulnerability dumps on unencrypted laptops`
  },
  {
    question: "What constitutes an 'Advocacy Threat' to auditor objectivity?",
    shortAnswer: "An advocacy threat arises when an auditor promotes or defends an auditee's position or commercial product to the point that their objectivity is compromised (e.g. testifying as an expert witness defending the auditee's security in a regulatory penalty hearing).",
    explanation: "An auditor must remain an impartial, evidence-based fact finder. If an auditor acts as a public advocate or legal defender for the auditee, they compromise their neutral assurance role.",
    hint: "Acting as a public champion or legal defender for the auditee.",
    level: "moderate",
    codeExample: `// Advocacy Threat Scenario:
Auditor: Agrees to represent the auditee in court to argue that their data breach was 'unpreventable'.
Impact:  Destroys impartiality for all subsequent ISO 27001 surveillance audits.
Remedy:  Auditor must recuse themselves from auditing duties if undertaking legal advocacy.`
  },
  {
    question: "What is the ethical procedure when an auditor discovers evidence of illegal criminal activity (e.g., intentional data exfiltration or fraud) during a routine ISMS audit?",
    shortAnswer: "The auditor must preserve the evidence intact without tampering, immediately notify the Lead Auditor and the enterprise Audit Committee / Legal Counsel, consult organizational whistleblowing protocols, and report to statutory law enforcement in accordance with applicable cyber law.",
    explanation: "Auditors cannot turn a blind eye to active crime or facilitate a cover-up. Doing so makes the auditor an accessory under criminal law (Bharatiya Nyaya Sanhita 2023). However, auditors must ensure evidentiary integrity and follow established legal escalation channels.",
    hint: "Preserve evidence, notify Audit Committee/Legal Counsel, and report via legal channels.",
    level: "moderate",
    codeExample: `// Crime Discovery Escalation Protocol:
1. Isolate forensic log snapshot (SHA-256 hash locked).
2. Do not confront suspect directly (prevents evidence destruction).
3. Notify Audit Committee Chair & Chief Legal Officer within 1 hour.
4. File formal incident report with CERT-In and Law Enforcement as mandated by IT Act Sec 70B.`
  },
  {
    question: "How does the 'Evidence-Based Approach' (ISO 19011 Principle 6) prevent subjective auditor bias?",
    shortAnswer: "By requiring that all audit findings and conclusions are based on verifiable, objective evidence that is traceable, reproducible, and verifiable by another independent auditor examining the same sample.",
    explanation: "An auditor cannot issue a Non-Conformity based on personal intuition, gut feeling, or stylistic preference. Every finding must cite the exact clause, the specific asset, and the tangible artifact (PLOR format) that proves the failure.",
    hint: "Every finding must be supported by verifiable, reproducible facts rather than personal opinions.",
    level: "basic",
    codeExample: `// Subjective Bias vs Evidence-Based Finding:
SUBJECTIVE (Unethical): "I don't like the look of their password policy; issue an NC."
EVIDENCE-BASED (Ethical): "Active Directory password policy requires only 6 characters without MFA, violating Access Policy Section 4.2 and ISO 27001 Control A.8.5. (PLOR Evidence Attached)."`
  },
  {
    question: "What role does the 'Audit Committee' of the Board of Directors play in protecting internal auditor independence?",
    shortAnswer: "The Audit Committee provides independent governance oversight by directly hiring, evaluating, and determining compensation for the Chief Audit Executive (CAE), insulating internal auditors from management coercion or retaliation.",
    explanation: "If internal auditors reported directly to the CIO or CEO, management could threaten to fire them for uncovering severe security flaws. Dual-reporting (administrative to CEO, functional to Board Audit Committee) guarantees operational independence.",
    hint: "Dual-reporting to Board Audit Committee prevents executives from firing or retaliating against auditors.",
    level: "basic",
    codeExample: `// Dual-Reporting Governance Structure:
Internal Audit Lead ➔ Administrative Reporting (Travel/Leaves) ➔ Chief Executive Officer (CEO)
Internal Audit Lead ➔ Functional Reporting (Audit Plans/NCs) ➔ Board Audit Committee (Independent Directors)`
  },
  {
    question: "Synthesizing Auditor Ethics and Professional Independence: what is the master equation of Audit Credibility and Assurance Integrity?",
    shortAnswer: "$$\\text{Assurance Integrity} = \\frac{\\text{Integrity} \\times \\text{Professional Skepticism} \\times \\text{Evidence-Based Verification}}{\\text{Threats to Independence (Self-Interest + Self-Review + Familiarity + Intimidation + Advocacy)}} \\ge 1.0$$ with full ISO 19011:2018 Clause 4 and ISACA Code of Ethics compliance.",
    explanation: "This master governance relationship proves that an audit produces credible, trustworthy assurance when auditors uphold absolute integrity, practice relentless professional skepticism, and ground every finding in reproducible evidence, while systematically neutralizing all five threats to independence through cooling-off periods, auditor rotation, and board governance.",
    hint: "Conclude by reviewing how the 7 principles of ISO 19011 and neutralization of independence threats ensure audit credibility.",
    level: "expert",
    codeExample: `// Master Equation of Audit Ethics & Independence:
Assurance_Integrity = (Integrity * Skepticism * Evidence_Based_Rigor) / (Self_Interest + Self_Review + Familiarity + Intimidation + Advocacy);
Condition: Assurance_Integrity >= 1.0 && Conflict_Of_Interest == 0;
Outcome:   100% ISO 19011:2018 Clause 4 Compliance, Absolute Judicial Credibility, and Total Regulatory Trust!`
  }
];

export default questions;
