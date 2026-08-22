const questions = [
  {
    question: "What is an 'Audit Trail' in cybersecurity, and what are the essential '5 Ws + 1 H' parameters it must capture?",
    shortAnswer: "An Audit Trail is a chronological, immutable sequence of system events providing verifiable documentary evidence of activities; it must record: Who (User/Actor), What (Action/Command), When (Synchronized Timestamp), Where (Source IP/Host), Why (Ticket/Context), and How (Protocol/Method).",
    explanation: "Audit trails are foundational to both compliance and forensics. Without all 6 parameters, an event cannot be definitively attributed to an actor or reconstructed in a court of law during forensic investigations.",
    hint: "Who, What, When, Where, Why, and How.",
    level: "basic",
    codeExample: `// The 5 Ws + 1 H of a Security Audit Trail:
WHO:   mamata.admin@payshield.in (UID: 1004)
WHAT:  AWS IAM Policy Attached ('AdministratorAccess' to Role 'prod-deploy')
WHEN:  2026-08-23T02:15:00.124Z (NTP Stratum-1 Synchronized)
WHERE: Source IP 103.120.45.18 (Kolkata VPN Gateway)
WHY:   Emergency Incident Response Ticket #INC-9821
HOW:   AWS Management Console via TLS 1.3 / Hardware FIDO2 MFA`
  },
  {
    question: "What is 'Forensic Readiness' (ISO/IEC 27043), and how does it benefit an enterprise before an incident occurs?",
    shortAnswer: "Forensic Readiness is an organization's pre-planned capability to collect, preserve, protect, and analyze digital evidence with maximum legal admissibility and minimal operational cost and business disruption.",
    explanation: "Instead of scrambling after a breach occurs, a forensically ready organization maintains synchronized clocks, immutable WORM log storage, automated legal hold workflows, and trained first responders, ensuring evidence is immediately admissible in judicial proceedings.",
    hint: "Being prepared to collect court-admissible digital evidence before any cyber incident occurs.",
    level: "basic",
    codeExample: `// Forensic Readiness vs Reactive Scrambling:
Reactive:          Server breached ➔ Logs overwritten ➔ Clocks drifting ➔ Evidence inadmissible!
Forensic Readiness:Clocks NTP locked ➔ Logs in S3 WORM ➔ SHA-256 hashed ➔ Instant Section 63 BSA admissibility!`
  },
  {
    question: "Under the CERT-In Directions 2022, what is the mandatory retention duration and jurisdictional requirement for system logs in India?",
    shortAnswer: "All service providers, intermediaries, data centers, and corporate entities must maintain logs of all ICT systems for a rolling period of 180 DAYS within the Indian jurisdiction.",
    explanation: "Issued under Section 70B of the Information Technology Act 2000, CERT-In mandates that logs must be securely stored for at least 180 days and easily accessible within India so they can be produced to CERT-In or law enforcement upon request.",
    hint: "180 DAYS retention within Indian territorial jurisdiction.",
    level: "basic",
    codeExample: `// CERT-In Log Mandate (IT Act Section 70B):
Retention Period: 180 Days rolling log window
Jurisdiction:     Stored or accessible within Indian territory
Compliance Rule:  Must be submitted to CERT-In during incident investigation within 6 hours of notice.`
  },
  {
    question: "What is Section 63 of the Bharatiya Sakshya Adhiniyam (BSA) 2023 (formerly Section 65B of the Indian Evidence Act 1872)?",
    shortAnswer: "The statutory legal provision governing the admissibility of electronic records in Indian courts, requiring a formal certificate validating device custody, continuous operation, and hash integrity.",
    explanation: "Electronic evidence (logs, emails, database dumps) is considered secondary evidence in Indian courts. Section 63 of the BSA 2023 (formerly Section 65B of the Evidence Act) mandates that a responsible officer certify that the computer system produced the output in the ordinary course of business without tampering.",
    hint: "Statutory certificate required to present computer logs and digital evidence in Indian courts.",
    level: "basic",
    codeExample: `// Section 63 BSA 2023 / Section 65B Certificate Checklist:
[✔] Identity and official designation of the certifying forensic officer
[✔] Specific computer/server hardware ID and OS environment documented
[✔] Confirmation that the system was operating properly during log recording
[✔] Cryptographic SHA-256 hash verifying zero data modification`
  },
  {
    question: "How does 'Write Once, Read Many' (WORM) storage (e.g. AWS S3 Object Lock in Compliance Mode) prevent log tampering?",
    shortAnswer: "WORM storage enforces write-once protection via hardware or cloud kernel locks, preventing any user—including root administrators and AWS account owners—from deleting, overwriting, or modifying log objects until the retention period expires.",
    explanation: "In an advanced persistent threat (APT), attackers frequently attempt to clear event logs (`wevtutil cl` or `rm -rf /var/log`). WORM storage ensures that as soon as logs are streamed to the remote bucket, they cannot be deleted or modified, preserving evidentiary integrity.",
    hint: "WORM prevents even root admins from deleting or editing logs during the retention period.",
    level: "moderate",
    codeExample: `// AWS S3 Object Lock Compliance Mode:
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "COMPLIANCE",
        "Days": 180
      }
    }
  }
}
// Even AWS Root Account cannot delete or overwrite objects for 180 days!`
  },
  {
    question: "What is a 'Merkle Hash Chain' or Cryptographic HMAC Chain in audit log integrity verification?",
    shortAnswer: "A data structure where each log entry includes the cryptographic hash of the preceding log entry ($$H_n = \\text{SHA256}(\\text{Log}_n \\parallel H_{n-1})$$), ensuring that any insertion, deletion, or modification of a log record breaks the chain.",
    explanation: "By cryptographically linking log entries in a blockchain-like hash chain, auditors can mathematically verify that no log records were pruned or inserted. If an attacker deletes a single line, the hash chain computation fails from that point forward.",
    hint: "Each log line contains the hash of the previous line, making log deletion immediately detectable.",
    level: "moderate",
    codeExample: `// Merkle Log Hash Chain:
Log 1: "User login"         ➔ Hash1 = SHA256("User login" + "00000000")
Log 2: "File downloaded"    ➔ Hash2 = SHA256("File downloaded" + Hash1)
Log 3: "Admin escalation"   ➔ Hash3 = SHA256("Admin escalation" + Hash2)
// If Log 2 is deleted, Hash3 re-calculation fails immediately!`
  },
  {
    question: "Why is Stratum-1 Network Time Protocol (NTP) synchronization critical for forensic timeline reconstruction?",
    shortAnswer: "Without synchronized timestamps across firewalls, servers, databases, and routers, correlation of multi-stage cyber attacks across disparate systems becomes scientifically invalid and legally indefensible.",
    explanation: "If a web server clock is 5 minutes ahead of the database server, an auditor cannot prove whether a database query was triggered by a specific web request. Stratum-1 NTP ensures all enterprise systems share sub-millisecond synchronized UTC timestamps.",
    hint: "All servers must agree on the exact millisecond so attack logs can be lined up in time.",
    level: "basic",
    codeExample: `// Linux Chrony NTP Synchronization Verification:
$ chronyc tracking
Reference ID    : 103.120.45.2 (time.nplindia.org - Stratum 1)
Stratum         : 2
System time     : 0.000012450 seconds FAST of NTP time
Last offset     : -0.000004210 seconds
Root delay      : 0.004120000 seconds (4.12 ms accuracy)`
  },
  {
    question: "What are the 6 core pillars of an enterprise Forensic Readiness Program under ISO/IEC 27043?",
    shortAnswer: "1. Time Synchronization (NTP); 2. Immutable WORM Log Storage; 3. Cryptographic Evidence Hashing (SHA-256); 4. Chain of Custody & Legal Hold; 5. Trained Incident Responders; 6. Legal Admissibility Certification (Sec 63 BSA).",
    explanation: "ISO/IEC 27043 defines the forensic readiness framework across technical, procedural, and legal pillars. Implementing all 6 ensures that an organization can defend against regulatory audits and assist law enforcement without compromising daily business operations.",
    hint: "NTP, WORM storage, SHA-256 hashes, chain of custody, trained staff, legal certificates.",
    level: "basic",
    codeExample: `// 6 Pillars of Forensic Readiness:
Pillar 1: NTP Stratum-1 Synchronization across all infrastructure
Pillar 2: Immutable WORM S3 Object Lock Log Storage (180 Days)
Pillar 3: SHA-256 Cryptographic Hashing of Evidence Snapshots
Pillar 4: Formal Chain of Custody Ledger & Automated Legal Hold
Pillar 5: Certified Incident Response First Responders (CIRT)
Pillar 6: Section 63 BSA 2023 / Section 65B IEA Admissibility Compliance`
  },
  {
    question: "What is a 'Legal Hold' in audit trail preservation, and how does it override standard data retention schedules?",
    shortAnswer: "A formal directive instructing IT teams to suspend the routine deletion or archiving of specific audit logs and electronic records due to pending litigation, regulatory investigation, or criminal proceedings.",
    explanation: "Under normal GDPR/DPDP retention rules, logs might be purged after 180 or 365 days. When a Legal Hold is issued, automated log purging is immediately halted for the affected systems to avoid charges of evidence spoliation in court.",
    hint: "Freezing log deletion so evidence is preserved for ongoing legal court cases.",
    level: "moderate",
    codeExample: `// Legal Hold Execution Directive:
Target:    AWS Account 9876543210 (Payment Gateway Microservices)
Action:    SUSPEND automated S3 lifecycle purge policies
Reason:    Enforcement Notice from Data Protection Board of India (DPBI)
Duration:  Indefinite until formal written release by Chief Legal Counsel`
  },
  {
    question: "How does an auditor detect 'Log Truncation' or selective event clearing by a malicious insider?",
    shortAnswer: "By comparing the sequence IDs and cryptographic hash chains in remote SIEM mirrors against local host logs, and alerting on Event ID 1102 (The audit log was cleared) in Windows or `syslog` daemon termination in Linux.",
    explanation: "Attackers running `Clear-EventLog` generate Windows Security Event ID 1102, which records the exact user who cleared the log. Because logs are mirrored in real time to a write-only remote SIEM, the SIEM preserves the pre-clearing events and the clearing event itself.",
    hint: "Remote SIEM stores logs before they can be wiped locally; Windows Event 1102 alerts on log clears.",
    level: "moderate",
    codeExample: `// Windows Security Event ID 1102 (Audit Log Cleared):
Event ID: 1102
Task:     Audit Log Cleared
Subject:  Security ID: PAYSHIELD\\malicious_insider
Details:  The audit log was cleared by Administrator on host PAY-DB-01.
SIEM:     Automated Severity-1 Alert dispatched to SOC within 500ms!`
  },
  {
    question: "What is the difference between an 'Application Audit Trail' and an 'Operating System Audit Trail'?",
    shortAnswer: "OS audit trails record low-level system events (logins, process creation, file permissions, kernel modules); application audit trails record high-level business logic events (wire transfers, account balance edits, patient biopsy access).",
    explanation: "An auditor inspecting a banking system needs both: the OS log confirms who logged into the Linux server via SSH, while the application log confirms which bank accounts were debited, the transaction amount (₹50 Lakhs), and the supervisor approval code.",
    hint: "OS logs track system logins/commands; App logs track business transactions/record edits.",
    level: "basic",
    codeExample: `// OS vs Application Audit Trail:
OS Log (Linux auditd):   "user=mamata exec=/usr/bin/python3 args=transfer.py cwd=/app"
App Log (Payment Core): "TX_ID: 98124 | SENDER: Acc#102 | RECV: Acc#409 | AMOUNT: ₹5,00,000 | AUTH: OTP_VERIFIED"`
  },
  {
    question: "Why does the Indian DPDP Act 2023 make forensic readiness an essential component of 'Reasonable Security Safeguards' under Section 8?",
    shortAnswer: "Because without forensic readiness, an enterprise cannot determine the root cause, exact scope of exfiltrated personal data, or timeline of a breach, making it impossible to satisfy mandatory DPBI notification rules or defend against ₹250 Crore fines.",
    explanation: "If a company suffers a data breach and cannot prove what data was accessed due to disabled audit trails, the DPBI treats the incident as severe negligence. Comprehensive audit trails provide verifiable proof of containment and safeguard effectiveness, qualifying the firm for statutory safe harbor.",
    hint: "Audit trails prove what happened during a breach, defending the company against regulatory fines.",
    level: "basic",
    codeExample: `// DPDP Act Section 8 Forensic Proof Docket:
1. Incident Detected: 2026-08-23 02:15:00 IST
2. Audit Trail Analysis: Proved only 14 test accounts were accessed; production PII untouched.
3. DPBI Report: Submitted detailed forensic timeline within 24 hours.
4. Finding: Zero citizen harm; DPBI confirms reasonable safeguards; ₹250 Cr fine averted!`
  },
  {
    question: "Synthesizing Audit Trail Analysis and Forensic Readiness: what is the master equation of Forensic Evidentiary Admissibility?",
    shortAnswer: "$$\\text{Forensic Evidentiary Admissibility} = \\frac{\\text{NTP Time Synchronization} \\times \\text{WORM Storage Integrity} \\times \\text{Cryptographic Hash Chain}}{\\text{Chain of Custody Defects} + \\text{Un-Mirrored Local Logs}} \\ge 1.0$$ with continuous BSA 2023 Section 63 and CERT-In compliance.",
    explanation: "This master governance relationship proves that digital evidence achieves incontrovertible judicial admissibility and regulatory safe harbor when timestamps are locked to Stratum-1 NTP, logs are preserved in immutable WORM storage, and integrity is validated via cryptographic hash chains. Eliminating chain of custody gaps and un-mirrored local logs guarantees 100% forensic readiness.",
    hint: "Conclude by reviewing how NTP synchronization, WORM storage, and SHA-256 hashing ensure legal evidence admissibility.",
    level: "expert",
    codeExample: `// Master Equation of Forensic Readiness:
Admissibility = (NTP_Sync * WORM_Integrity * Cryptographic_Hash_Chain) / (Custody_Defects + Unmirrored_Logs);
Condition: Custody_Defects == 0 && WORM_Integrity == 1.0;
Outcome:   100% Legal Admissibility under BSA 2023 Section 63 and CERT-In 180-Day Mandate!`
  }
];

export default questions;
