const questions = [
  {
    question: "What is an Information Security Incident under ISO/IEC 27001 (Controls A.5.24 to A.5.28), and how does an 'Event' differ from an 'Incident'?",
    shortAnswer: "An Information Security Event is any observable occurrence in a system (e.g. login attempt, firewall ping); an Information Security Incident is a single or series of unwanted events that have a significant probability of compromising business operations and threatening the CIA triad.",
    explanation: "SOC analysts triage thousands of events daily: 1. Event: A user mistypes their password once (normal benign event); 2. Incident: A distributed brute-force attack attempts 50,000 passwords in 60 seconds and compromises an admin account (active security incident). Once an event threatens Confidentiality, Integrity, or Availability, formal incident management workflows (A.5.24-A.5.28) and legal escalation playbooks must be triggered immediately.",
    hint: "Think of smoke from a toaster (event) versus a raging kitchen fire (incident).",
    level: "basic",
    codeExample: `// Event vs Incident Classification:
Event:    "Firewall blocked inbound TCP port 22 scan from external IP." ➔ LOGGED (Benign Event)
Incident: "Ransomware executed on core database server, encrypting customer records." ➔ P1 CRITICAL INCIDENT!`
  },
  {
    question: "What are the four core phases of the Incident Response Lifecycle under NIST SP 800-61 and ISO/IEC 27035?",
    shortAnswer: "1. Preparation (Tooling, playbooks, team readiness); 2. Detection and Analysis (Triage, IOC correlation, severity scoring); 3. Containment, Eradication, and Recovery (Isolating assets, removing malware, restoring clean backups); 4. Post-Incident Activity (Lessons learned, 5-Whys RCA, CAPA plans).",
    explanation: "The incident response lifecycle is a structured, iterative framework: 1. Preparation: Establishing CSIRT roles, out-of-band communication, and pre-authorized containment playbooks; 2. Detection & Analysis: Utilizing SIEM/SOAR to match Indicators of Compromise (IOCs) and assign severity (P1-P4); 3. Containment & Recovery: Quarantining infected hosts, terminating adversary C2 sessions, wiping backdoors, and restoring immutable backups; 4. Post-Incident: Holding blameless post-mortems and updating defense baselines.",
    hint: "Remember the 4 phases: Prepare, Detect, Contain/Recover, and Learn.",
    level: "basic",
    codeExample: `// Incident Response Lifecycle:
[ 1. PREPARATION ]  ➔ Playbooks, Out-of-Band Signal, SIEM/SOAR Setup
[ 2. DETECTION ]    ➔ IOC Matching, Severity Classification (P1-P4), MTTD = 14s
[ 3. CONTAINMENT ]  ➔ Host Quarantine, Token Revocation, Clean Restore, MTTR = 45m
[ 4. POST-INCIDENT] ➔ 5-Whys RCA, Section 65B Digital Evidence, CAPA Closure`
  },
  {
    question: "What is the mandatory 6-hour cybersecurity incident reporting requirement under Section 70B of the Indian IT Act and CERT-In Directions 2022?",
    shortAnswer: "Under CERT-In Directions 2022, all Indian service providers, intermediaries, data centers, corporate entities, and government bodies MUST report 20 specified types of cybersecurity incidents to CERT-In within 6 hours of noticing them.",
    explanation: "Section 70B(6) of the IT Act makes incident notification a strict statutory duty. The 20 mandatory reportable incident categories include: ransomware attacks, unauthorized access to IT systems/data, identity theft/spoofing, targeted scanning/probing of critical networks, defacement of websites, malicious code outbreaks, and data leaks. Reports must be transmitted to `incident@cert-in.org.in` within 6 hours of discovery; failure to report carries imprisonment up to 1 year and fines.",
    hint: "Remember the strict 6-hour statutory notification SLA to CERT-In.",
    level: "basic",
    codeExample: `// CERT-In 6-Hour Incident Notification Template:
To:          incident@cert-in.org.in
Subject:     CRITICAL INCIDENT REPORT - P1 Ransomware Containment (Kolkata FinTech)
Incident ID: INC-2026-08-4421
Time Noticed:2026-08-23T02:00:00 IST
Report Time: 2026-08-23T04:15:00 IST (2h 15m Elapsed - Fully Compliant with 6h SLA!)
Impact:      Isolated 2 payment worker nodes; zero customer PII exfiltrated; AES-256 backups verified`
  },
  {
    question: "What are the four standard incident severity tiers (P1 to P4), and how do they determine escalation paths?",
    shortAnswer: "P1 Critical (Enterprise-wide outage, active ransomware, major data breach ➔ Immediate CISO/CEO escalation & CERT-In notification); P2 High (Single critical server compromised ➔ Tier 3 Lead & CISO); P3 Medium (Isolated malware/phishing attempt ➔ Tier 2 Analyst); P4 Low (Benign policy violation ➔ Tier 1 Analyst).",
    explanation: "Severity triage ensures proportionate operational response: 1. P1 Critical: Core transactional systems down or citizen PII leaking → War room convened within 15 mins, CISO alerts CEO, legal counsel, and CERT-In within 6h; 2. P2 High: Production database compromised without data leak → Escalated to Tier 3 within 30 mins; 3. P3 Medium: Employee reports phishing email → Quarantined by Tier 2 within 2 hours; 4. P4 Low: Single port scan → Handled via automated SOAR rules.",
    hint: "Think of hospital triage: Emergency surgery (P1) vs minor bandage (P4).",
    level: "moderate",
    codeExample: `// Severity Escalation Matrix:
P1 Critical ➔ MTTD < 5m  | War Room in 15m | CISO/Board Notified | CERT-In Report < 6h | DPBI Notified
P2 High     ➔ MTTD < 15m | Tier 3 Lead Assigned | Containment in < 1h
P3 Medium   ➔ MTTD < 1h  | Tier 2 Analyst Assigned | Triage in < 4h
P4 Low      ➔ MTTD < 4h  | Automated SOAR Playbook | Ticket Closed in < 24h`
  },
  {
    question: "What is the difference between 'Short-Term Containment' and 'Long-Term Containment' during an active cyber attack?",
    shortAnswer: "Short-term containment immediately stops bleeding and isolates affected assets (disconnecting network cables, revoking tokens); long-term containment allows business continuity by applying temporary firewall rules and clean routing while forensics takes place.",
    explanation: "1. Short-Term Containment: Immediate triage to halt lateral movement (e.g. disabling active VPN sessions, isolating virtual machines in a quarantined hypervisor VLAN, and resetting Active Directory credentials); 2. Long-Term Containment: Creating temporary staging subnets, deploying enhanced EDR monitoring, and routing traffic through isolated WAF reverse proxies so that unaffected business microservices can continue operating while forensic analysis continues on memory dumps.",
    hint: "Think of applying a tourniquet (short-term) versus surgery in a sterile operating theater (long-term).",
    level: "moderate",
    codeExample: `// Short-Term vs Long-Term Containment:
Short-Term: AWS Security Group updated → Revoked all ingress/egress rules for EC2 instance i-0a84f
Long-Term:  Spun up clean warm-standby container cluster in secondary AZ behind Cloudflare Zero Trust`
  },
  {
    question: "How does the 'Chain of Custody' protect digital evidence under Section 65B of the Indian Evidence Act / Bharatiya Sakshya Adhiniyam?",
    shortAnswer: "Chain of custody meticulously logs who collected, handled, analyzed, and stored digital evidence, accompanied by cryptographic SHA-256 hashes and signed Section 65B Certificates, proving in court that evidence was never altered or tampered with.",
    explanation: "Digital logs and memory dumps are easily manipulated. Under Indian law, to present digital evidence against a cyber criminal or defend against negligence claims: 1. Bit-by-bit raw forensic images (dd / FTK Imager) must be captured before touching live systems; 2. SHA-256 hashes must be calculated immediately; 3. A written log detailing every forensic examiner who accessed the image must be maintained; 4. A Section 65B Certificate signed by the authorized custodian must certify device integrity.",
    hint: "Remember bit-stream imaging, cryptographic hashing, access logging, and signed 65B certificates.",
    level: "basic",
    codeExample: `// Section 65B Digital Evidence Manifest:
Evidence Item:   memory_dump_node42.raw
SHA-256 Hash:    8f4c263e5b54a3047d5a8d49826e2e0e6b99f64b8ec5f3185340609eead23519
Acquisition Time:2026-08-23T02:30:15 IST
Examiner:        Mahima (Chief Forensic Specialist)
Certificate:     Signed under Section 65B(4) certifying unbroken forensic custody.`
  },
  {
    question: "What is 'Out-of-Band Communication', and why is it mandatory during a critical P1 incident response?",
    shortAnswer: "Out-of-band communication uses secondary, separate channels (e.g. end-to-end encrypted Signal groups, satellite phones) disconnected from corporate email/Slack, ensuring attackers with network access cannot monitor the response team's counter-measures.",
    explanation: "If an adversary compromises Active Directory or corporate Microsoft 365 / Google Workspace accounts, they can read security team emails, join triage Microsoft Teams meetings, and anticipate containment actions. Under ISO 27001 Control A.5.24, CSIRTs must maintain pre-configured out-of-band communication channels (such as Signal groups with pre-verified keys and external dedicated war rooms) to coordinate response in total secrecy.",
    hint: "Think of using a private courier rather than the regular mail when you suspect your house phone is tapped.",
    level: "moderate",
    codeExample: `// Out-of-Band Incident Protocol:
Rule: NEVER discuss active P1 breach on corporate Outlook or Slack!
Action:
1. CISO activates encrypted Signal War Room: "Incident-Alpha-WarRoom"
2. All CSIRT members switch to secondary pre-registered hardware tokens
3. Legal counsel, CEO, and Technical Leads communicate via out-of-band VoIP`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, what are the mandatory breach notification obligations under Section 8(6)?",
    shortAnswer: "In the event of a personal data breach, the Data Fiduciary must notify the Data Protection Board of India (DPBI) and each affected Data Principal (citizen) in the prescribed form and manner; failure triggers penalties up to ₹250 Crores under Section 33.",
    explanation: "Unlike past laws where data breaches were often concealed, Section 8(6) of the DPDP Act 2023 mandates transparency. When personal data is accessed, disclosed, or altered without authorization, the Data Fiduciary must: 1. Inform the DPBI detailing the nature of the breach, affected records, and remedial actions taken; 2. Notify affected citizens advising them on protective measures (e.g. changing passwords, monitoring bank statements).",
    hint: "Remember the dual notification: notifying both the Data Protection Board and individual citizens.",
    level: "basic",
    codeExample: `// DPDP Section 8(6) Breach Notification Protocol:
1. Notify DPBI:  Submit formal breach impact report within statutory timeline
2. Notify Users: Dispatch SMS/Email notices to all affected citizens with mitigation steps
3. Safe Harbor:  Proving proactive notification and active containment reduces Section 33 fine liability!`
  },
  {
    question: "What is a 'Blameless Post-Mortem' during the Lessons Learned phase (ISO 27001 Control A.5.27), and how does it drive continuous improvement?",
    shortAnswer: "A blameless post-mortem focuses on identifying systemic process and architectural flaws rather than punishing individuals; it fosters psychological safety so engineers openly disclose mistakes, enabling effective 5-Whys root cause analysis.",
    explanation: "If an organization punishes employees for accidental mistakes (like clicking a phishing link or misconfiguring an S3 bucket), staff will conceal future incidents, leading to undetected catastrophic compromises. Control A.5.27 emphasizes blameless post-mortems: analyzing why the system allowed the mistake (e.g. why did the CI/CD pipeline lack automated linting?) and closing the root cause via structured CAPA plans.",
    hint: "Focus on fixing the system architecture rather than pointing fingers at individuals.",
    level: "moderate",
    codeExample: `// Blameless Post-Mortem Finding:
Wrong Approach: "Engineer Amit clicked a malicious link and is fired." (System remains vulnerable!)
Blameless RCA:  "Why did the email reach the inbox? SWG filter missed zero-day domain. Why was account compromised? Legacy app lacked FIDO2 MFA."
CAPA Action:    Enforced hardware FIDO2 MFA across all legacy webapps, eliminating the vulnerability forever!`
  },
  {
    question: "What is the difference between Mean Time to Detect (MTTD) and Mean Time to Remediate (MTTR), and how do SOAR playbooks optimize both?",
    shortAnswer: "MTTD measures the average time from initial adversary intrusion to detection by security tools; MTTR measures the time from detection to complete containment and recovery; Security Orchestration, Automation, and Response (SOAR) playbooks automate triage and host isolation to reduce MTTD to seconds and MTTR to minutes.",
    explanation: "Dwell time is the attacker's greatest asset. High-performing security teams track two vital KPIs: 1. MTTD (Mean Time to Detect): Industry average is ~200 days without SIEM; optimized SIEM/UEBA reduces this to under 15 seconds; 2. MTTR (Mean Time to Remediate / Respond): Manual response takes days; automated SOAR playbooks (e.g. auto-quarantining an endpoint, revoking OAuth tokens, and pushing firewall block rules) reduce MTTR to under 45 seconds.",
    hint: "Remember: MTTD is how fast you spot the intruder; MTTR is how fast you kick them out.",
    level: "basic",
    codeExample: `// Automated SOAR Response Script:
on_incident_alert(incident) {
  if (incident.severity == "P1_CRITICAL") {
    isolate_endpoint(incident.host_id);       // Executed in 1.2 seconds
    revoke_user_tokens(incident.user_id);     // Executed in 0.8 seconds
    block_adversary_ip(incident.attacker_ip); // Pushed to WAF in 2.1 seconds
    notify_ciso_signal_war_room(incident);    // MTTD = 14s | MTTR = 42s!
  }
}`
  },
  {
    question: "What role does the 'Crisis Management Committee' (CMC) play during a P1 critical incident?",
    shortAnswer: "The CMC is the executive leadership body (CEO, CISO, Legal Counsel, Head of PR, Head of HR) responsible for high-level business decisions, legal compliance, regulatory communications, and public relations during a crisis.",
    explanation: "Technical engineers should not decide whether to shut down corporate operations or what to say to journalists. The Crisis Management Committee handles: 1. Business Decisions: Authorizing emergency shutdowns of payment switches to prevent further losses; 2. Legal Strategy: Approving statutory notifications to CERT-In and DPBI; 3. Public Relations: Issuing transparent, accurate media statements to prevent brand reputational collapse.",
    hint: "Think of the government cabinet directing national emergency response while emergency responders fight the fire.",
    level: "moderate",
    codeExample: `// Crisis Management Committee (CMC) Roster:
- Chief Information Security Officer (CISO): Technical Incident Commander (Sukanta Hui)
- Chief Executive Officer (CEO):             Executive Business Authority
- General Legal Counsel:                     Statutory & DPDP Compliance Lead
- Head of Public Relations (PR):             Authorized Media Spokesperson`
  },
  {
    question: "How does an ISMS ensure 'Volatile Memory (RAM)' is preserved before powering down an infected endpoint during an incident?",
    shortAnswer: "Live RAM contains critical volatile evidence (active network connections, running malware processes, unencrypted decryption keys); analysts must dump memory using tools like LiME / DumpIt before disconnecting power or rebooting.",
    explanation: "The #1 rookie mistake in incident response is immediately pulling the power plug or rebooting the server. Rebooting permanently destroys all volatile RAM data, losing running injected malware, encryption keys in memory, and active C2 socket connections. The forensic protocol mandates: 1. Live Memory Acquisition (DumpIt, WinPmem, LiME); 2. Network cable disconnect (soft isolation); 3. Bit-by-bit disk imaging.",
    hint: "Think of photographing the crime scene before sweeping the floor.",
    level: "expert",
    codeExample: `// Live Forensic Memory Capture:
# Capture volatile RAM before host shutdown
sudo ./lime.ko "path=/mnt/forensic_usb/node42_ram.lime format=raw"
# Calculate SHA-256 hash immediately for Section 65B integrity
sha256sum /mnt/forensic_usb/node42_ram.lime > /mnt/forensic_usb/node42_ram.sha256`
  },
  {
    question: "Synthesizing Incident Management Procedures and Escalation Paths: what is the master equation of Incident Response Velocity?",
    shortAnswer: "$$\\text{Incident Response Velocity} = \\frac{\\text{Automated Detection (MTTD)} \\times \\text{Automated Containment (MTTR)} \\times \\text{CERT-In 6h Compliance}}{\\text{Adversary Dwell Time} + \\text{Manual Escalation Latency}}$$ with continuous closed-loop CAPA improvement.",
    explanation: "This master governance relationship proves that incident response effectiveness is a function of rapid automated detection, instant containment, and flawless statutory compliance. Minimizing adversary dwell time and eliminating manual escalation friction ensures zero catastrophic data leakage, complete judicial admissibility of evidence, and full immunity under global and Indian cyber laws.",
    hint: "Conclude by reviewing how rapid MTTD, automated MTTR, and 6-hour CERT-In compliance eliminate cyber breach damage.",
    level: "expert",
    codeExample: `// Master Equation of Incident Response Velocity:
Velocity = (MTTD_Speed * MTTR_Automation * CERT_In_6h_Compliance) / (Dwell_Time + Escalation_Lag);
Outcome: Sub-minute Containment, Flawless Legal Compliance & Complete Enterprise Resilience!`
  }
];

export default questions;
