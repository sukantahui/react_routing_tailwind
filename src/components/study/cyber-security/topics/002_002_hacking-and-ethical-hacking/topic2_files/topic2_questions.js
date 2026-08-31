const questions = [
  {
    question: "What is the single most critical legal document required before an ethical hacker can legally initiate penetration testing on an organization's network?",
    shortAnswer: "A signed Rules of Engagement (RoE) and written Authorization Letter from the legal asset owner or C-level executive.",
    explanation: "Under cyber law worldwide (including Section 43/66 of India's IT Act 2000 and the US CFAA), accessing or probing a computer system without explicit prior written authorization is a criminal offense, regardless of the researcher's good intentions. The Rules of Engagement (RoE) specifies exact in-scope IP addresses, testing timeframes, permitted tools, and emergency contacts, providing the ethical hacker with legal safe harbor.",
    hint: "Think about the formal written contract that explicitly gives permission to test specified systems.",
    level: "basic",
    codeExample: `// Legal Verification Requirement:
if (has_valid_signed_RoE(client_signature, scope_definition, validity_dates) === true) {
    proceed_with_authorized_testing();
} else {
    throw new CriminalLiabilityException("Unauthorized access violates IT Act 2000 Section 66.");
}`
  },
  {
    question: "Under the Indian Information Technology Act 2000 (and 2008 Amendment), what is the legal distinction between Section 43 and Section 66?",
    shortAnswer: "Section 43 handles civil liability and compensation for unauthorized access/damage; Section 66 establishes criminal imprisonment up to 3 years and fines up to ₹5 Lakhs for dishonest or fraudulent hacking.",
    explanation: "Section 43 deals with civil wrongs: anyone who without permission accesses, downloads data, introduces viruses, or damages computers is liable to pay financial compensation to the victim. Section 66 elevates any act specified in Section 43 done 'dishonestly or fraudulently' into a cognizable criminal offense punishable by imprisonment up to three years, a fine up to ₹5,00,000, or both.",
    hint: "Recall that Section 43 is for civil compensation, while Section 66 carries criminal jail time.",
    level: "moderate",
    codeExample: `// IT Act 2000 Section 43 vs 66 Mapping:
Section 43: Civil Penalty → Financial compensation to affected data owner.
Section 66: Criminal Offense → Up to 3 years imprisonment + ₹5,00,000 fine.`
  },
  {
    question: "What does Section 66F of the Indian IT Act 2000 prescribe regarding 'Cyber Terrorism', and what is the maximum statutory penalty?",
    shortAnswer: "It penalizes cyber attacks intended to threaten the unity, integrity, sovereignty of India or damage critical infrastructure with Life Imprisonment.",
    explanation: "Introduced in the 2008 Amendment, Section 66F criminalizes acts of cyber terrorism—such as denying authorized access to critical government infrastructure, penetrating classified defense networks, or introducing contaminants that cause death or severe national economic damage. It is one of the strictest cybersecurity laws globally, prescribing a statutory sentence of Imprisonment for Life.",
    hint: "Remember that Section 66F covers cyber terrorism in India and carries a penalty of life imprisonment.",
    level: "moderate",
    codeExample: `// Indian IT Act Section 66F (Cyber Terrorism):
Target: Critical National Infrastructure (Power Grids, Nuclear, Defense, Core Banking)
Intent: Threatening National Sovereignty or Disrupting Vital Services
Maximum Penalty: LIFE IMPRISONMENT (Non-Bailable Offense)`
  },
  {
    question: "What are the 5 Core Golden Principles that every certified ethical hacker must strictly adhere to during an engagement?",
    shortAnswer: "1. Explicit Written Authorization, 2. Strict Scope Adherence, 3. Privacy & Confidentiality, 4. Do No Harm (No DoS), and 5. Timely & Transparent Reporting.",
    explanation: "Professional ethical hacking frameworks (EC-Council, SANS, OSCP) enforce five fundamental rules: 1. Obtain signed written authorization before sending packets; 2. Never touch out-of-scope systems; 3. Keep all discovered customer PII strictly confidential; 4. Avoid destructive actions or denial of service that could disrupt business operations; 5. Report all findings immediately with actionable remediation steps.",
    hint: "Recall the 5 pillars: Authorization, Scope, Confidentiality, Do No Harm, and Reporting.",
    level: "basic",
    codeExample: `// The 5 Golden Rules Matrix:
1. Written Authorization (Signed RoE)
2. Defined Scope (Strict IP/Domain list)
3. Non-Disclosure (100% PII confidentiality)
4. Do No Harm (No destructive payloads)
5. Comprehensive Reporting (Proof-of-concept + Fix)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 of India, what is the maximum financial penalty for organizations failing to implement reasonable security safeguards?",
    shortAnswer: "Up to ₹250 Crores per data breach incident, levied by the Data Protection Board of India (DPBI).",
    explanation: "Section 33 and the Schedule of India's DPDP Act 2023 establish significant statutory liabilities for Data Fiduciaries. If an organization suffers a personal data breach due to negligence in implementing reasonable technical and organizational security safeguards (such as missing encryption or unpatched vulnerabilities), the DPBI can impose administrative financial penalties up to ₹250 Crores (₹2,500,000,000).",
    hint: "Remember the statutory cap in Indian Rupees under the DPDP Act 2023.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Section 33 Liability:
Max_Statutory_Penalty = ₹250,00,00,000 (₹250 Crores);
Enforcement_Body      = Data Protection Board of India (DPBI);`
  },
  {
    question: "What is a 'Statement of Work' (SoW) versus a 'Non-Disclosure Agreement' (NDA) in an ethical hacking contract?",
    shortAnswer: "An SoW defines project deliverables, testing methodologies, and timeline; an NDA legally binds the tester to maintain complete secrecy over discovered vulnerabilities and client data.",
    explanation: "In commercial penetration testing: 1. The Non-Disclosure Agreement (NDA) ensures that any proprietary intellectual property, customer credit card data, or critical zero-days discovered by the ethical hacker remain strictly confidential and cannot be leaked or shared. 2. The Statement of Work (SoW) outlines the project scope, testing types (e.g., Black-Box Web App + Mobile API), hourly rates in ₹ INR, and deliverable final report formats.",
    hint: "Think about which document protects confidential information (NDA) versus which outlines project tasks and budget (SoW).",
    level: "moderate",
    codeExample: `// Ethical Hacking Contractual Triad:
1. Non-Disclosure Agreement (NDA)   → Confidentiality Guarantee
2. Statement of Work (SoW)          → Scope, Deliverables & Budget (₹)
3. Rules of Engagement (RoE)        → Legal Authorization & Safety Controls`
  },
  {
    question: "What constitutes 'Scope Creep' during a penetration test, and why is it legally dangerous for an ethical hacker?",
    shortAnswer: "Probing or scanning IP addresses or domains not explicitly listed in the Rules of Engagement, which converts legal testing into illegal unauthorized hacking under cyber law.",
    explanation: "If a penetration tester targeting `192.168.1.50` discovers that it communicates with an internal server at `10.0.0.12`, pivoting to scan `10.0.0.12` without written amendment to the RoE constitutes illegal computer trespass. Even if the server is vulnerable, testing unapproved assets breaches Section 66 of the IT Act 2000 and invalidates legal liability insurance.",
    hint: "Remember that testing even a single IP address outside the contractually agreed list is illegal.",
    level: "moderate",
    codeExample: `// Scope Guard Check:
function isTargetAuthorized(targetIP, inScopeSubnets) {
    if (!inScopeSubnets.includes(targetIP)) {
        logAlert("SCOPE VIOLATION: Target " + targetIP + " is NOT in signed RoE. Halting scan.");
        return false;
    }
    return true;
}`
  },
  {
    question: "Under the Computer Fraud and Abuse Act (CFAA 18 U.S.C. § 1030) in the United States, how did the 2021 Supreme Court ruling in 'Van Buren v. United States' clarify 'exceeding authorized access'?",
    shortAnswer: "The court ruled that accessing information with valid credentials for an improper purpose does not violate CFAA, narrowing the law to focus on gates-and-walls access barriers.",
    explanation: "In Van Buren v. United States, a police officer used his legitimate database credentials to look up a license plate in exchange for an illicit payment. The US Supreme Court ruled that he did not 'exceed authorized access' under the CFAA because he was technically authorized to access that database. The CFAA applies when someone bypasses technical access controls (like breaking into a system without credentials), not when authorized users misuse data they are permitted to view.",
    hint: "Think of the landmark US Supreme Court case distinguishing technical access violations from workplace policy misuse.",
    level: "expert",
    codeExample: `// Van Buren Ruling Distinction:
Technical Access Violation (No credentials / Bypassed lock)  → CFAA Violation (Criminal)
Policy Misuse (Valid credentials used for improper purpose)    → Contract / Policy Breach (Not CFAA Criminal Hacking)`
  },
  {
    question: "Why are 'Denial of Service' (DoS) stress-testing techniques strictly forbidden in production penetration tests unless explicitly authorized in writing?",
    shortAnswer: "Because flooding network bandwidth or crashing production services disrupts legitimate business operations, causing real financial loss and customer harm.",
    explanation: "The purpose of ethical hacking is to improve security resilience, not cause self-inflicted business outages. Running volumetric DDoS tools (e.g., LOIC) or fork bombs against live banking switches, hospital patient portals, or e-commerce checkouts halts revenue and can threaten human safety. DoS testing is only conducted in isolated staging environments during designated maintenance windows with explicit executive authorization.",
    hint: "Recall that crashing a live production server turns an audit into an operational disaster.",
    level: "basic",
    codeExample: `// RoE Standard Prohibition Clause:
"The testing team shall NOT execute volumetric Denial of Service (DDoS), distributed SYN floods, 
or destructive database DROP/DELETE commands on production environments."`
  },
  {
    question: "What is the role of an 'Emergency Contact & Abort Protocol' in a penetration testing Rules of Engagement (RoE)?",
    shortAnswer: "A 24/7 dedicated escalation channel and immediate command to halt all testing instantly if unintended system instability or production outages occur.",
    explanation: "If an automated exploit payload unexpectedly locks up a database thread pool or trips an alarm in a 220kV power grid substation, the testing team and client technical leads must have immediate direct telephone lines. The RoE specifies a single 'ABORT CODEWORD' that instantly pauses all scanning, isolates testing workstations, and triggers forensic rollback procedures.",
    hint: "Think of the emergency red kill-switch in a factory that instantly stops all machinery if an anomaly occurs.",
    level: "moderate",
    codeExample: `// Emergency Abort Protocol Handler:
if (client_emergency_stop_triggered || production_outage_detected) {
    kill_all_running_scans();
    flush_active_connections();
    notify_client_ciso("TESTING HALTED IMMEDIATELY: Emergency Abort Code Confirmed.");
}`
  },
  {
    question: "How does the UK Computer Misuse Act 1990 categorize unauthorized computer offenses across its three primary sections?",
    shortAnswer: "Section 1: Unauthorized access to computer material; Section 2: Unauthorized access with intent to commit further offenses; Section 3: Unauthorized modification of computer material.",
    explanation: "The UK Computer Misuse Act (CMA) provides a tiered legal framework: Section 1 criminalizes simple unauthorized access (up to 2 years jail); Section 2 penalizes unauthorized access intending to commit fraud or blackmail (up to 5 years jail); Section 3 penalizes creating viruses, modifying data, or launching DDoS attacks that impair operation (up to 10 years jail, or life imprisonment if targeting critical infrastructure).",
    hint: "Remember the 3 tiers: Access (Sec 1), Access with criminal intent (Sec 2), and Data modification/damage (Sec 3).",
    level: "expert",
    codeExample: `// UK Computer Misuse Act 1990 Tiers:
Section 1: Simple Unauthorized Access (Up to 2 years imprisonment)
Section 2: Unauthorized Access with Intent to Commit Serious Offense (Up to 5 years)
Section 3: Unauthorized Acts with Intent to Impair Computer Operation (Up to 10 years / Life for critical infra)`
  },
  {
    question: "What is a 'Get Out of Jail Free Letter' in professional penetration testing, and what specific details must it contain?",
    shortAnswer: "A physical signed letter on client letterhead carried by security testers confirming that their physical/digital testing is authorized by senior executive management.",
    explanation: "During physical penetration tests (lock picking, badge cloning) or active red team engagements, testers may be detained by building security guards or local police. The authorization letter must be printed on official corporate letterhead, signed by the CEO/CISO, and contain the tester's photo ID details, specific testing dates, and direct 24/7 executive verification phone numbers.",
    hint: "Think about the formal executive letter carried by red-teamers to prove to police that their break-in is an authorized test.",
    level: "moderate",
    codeExample: `// Authorization Letter Core Components:
1. Corporate Letterhead & Corporate Seal
2. Full Legal Names & Government ID Numbers of Testing Team
3. Explicit Statement: "The bearers are conducting an authorized security exercise."
4. 24/7 Direct Phone Number of Chief Information Security Officer (CISO)`
  },
  {
    question: "What ethical dilemma occurs when a penetration tester discovers evidence of a pre-existing malicious compromise during an authorized assessment?",
    shortAnswer: "The tester must immediately freeze testing on that asset, document the forensic evidence, and immediately notify the client CISO without altering the attacker's footprint.",
    explanation: "If an ethical hacker discovers an active third-party webshell (e.g., China Chopper), foreign command-and-control beacons, or unauthorized cryptocurrency miners on the client's server, continuing standard penetration testing could overwrite forensic log timestamps or trigger attacker data destruction. The tester must immediately alert client leadership so the Incident Response (IR) team can preserve forensic evidence.",
    hint: "Consider what happens when a security auditor discovers an actual burglar already inside the building.",
    level: "expert",
    codeExample: `// Incident Discovery Workflow:
1. STOP Penetration Testing on the compromised host.
2. DO NOT delete, modify, or interact with the malicious webshell.
3. Take high-resolution forensic memory/disk hashes (SHA-256).
4. Alert Client CISO via encrypted phone call immediately.`
  },
  {
    question: "How does the (ISC)² Code of Professional Ethics guide certified cybersecurity professionals in resolving ethical conflicts?",
    shortAnswer: "By establishing four mandatory canons: 1. Protect society and infrastructure, 2. Act honorably and legally, 3. Provide diligent service to principals, 4. Advance and protect the profession.",
    explanation: "The (ISC)² Code of Ethics is strictly binding on all CISSP and cybersecurity certification holders. Crucially, the canons are listed in strict order of priority: Protecting society, the commonwealth, and national infrastructure (Canon 1) takes precedence over loyalty to a corporate employer (Canon 3). If an employer orders an engineer to cover up a catastrophic vulnerability endangering public lives, the ethical engineer's paramount duty is to the safety of society.",
    hint: "Remember that the first canon of (ISC)² is protecting society, which overrides corporate employer interests.",
    level: "moderate",
    codeExample: `// (ISC)² Code of Ethics Canons (In Order of Precedence):
1. Protect society, the common good, necessary public trust, and the infrastructure.
2. Act honorably, honestly, justly, responsibly, and legally.
3. Provide diligent and competent service to principals.
4. Advance and protect the profession.`
  },
  {
    question: "Why must third-party Cloud Service Providers (like AWS, Azure, GCP) be notified or consulted before conducting high-intensity penetration tests on cloud-hosted assets?",
    shortAnswer: "To prevent cloud security monitoring systems from mistaking the penetration test for an actual hostile attack and automatically blacklisting or suspending client cloud accounts.",
    explanation: "While major cloud providers (AWS, Azure, Google Cloud) permit penetration testing on customer-owned virtual machines without prior notification for standard services, strict prohibitions apply to shared underlying cloud infrastructure (e.g., DNS root servers, hypervisors, or multi-tenant physical network backbones). Testing DDoS capabilities or high-volume port scanning without checking cloud terms of service can trigger automated tenant suspension.",
    hint: "Consider how cloud providers monitor their shared data centers and might shut down your servers if they detect unexpected attack volume.",
    level: "moderate",
    codeExample: `// Cloud Penetration Testing Rules (AWS / Azure):
Permitted: User-owned EC2 instances, RDS databases, API Gateways, Lambda functions.
Prohibited: AWS DNS infrastructure, physical hypervisors, and multi-tenant shared hardware DoS.`
  },
  {
    question: "What is 'Dual-Use Software' in cybersecurity, and how do international export controls (like the Wassenaar Arrangement) regulate offensive tools?",
    shortAnswer: "Software that can be used for both legitimate administrative/defensive auditing and malicious cyber warfare; regulated to prevent proliferation of military-grade cyber weapons.",
    explanation: "Tools like Nmap, Wireshark, Metasploit, and Cobalt Strike are 'dual-use': sysadmins use them to verify firewall rules and discover vulnerabilities, while attackers use them to breach networks. The Wassenaar Arrangement regulates the export and transfer of intrusion software and surveillance technology across international borders to prevent rogue regimes and criminal cartels from acquiring weaponized zero-day exploit frameworks.",
    hint: "Think about tools that serve both legitimate system administrators and malicious hackers.",
    level: "expert",
    codeExample: `// Dual-Use Software Examples:
Tool: Cobalt Strike
Legitimate Use: Red Team authorized enterprise threat emulation.
Malicious Use: Command-and-Control (C2) beacon deployed by Ransomware syndicates.`
  },
  {
    question: "What constitutes 'Legal Safe Harbor' in corporate Vulnerability Disclosure Policies (VDP)?",
    shortAnswer: "A binding corporate pledge promising not to initiate civil lawsuits or criminal prosecution against security researchers who discover and report vulnerabilities in good faith within policy guidelines.",
    explanation: "Historically, ethical hackers feared reporting bugs because companies often responded by filing criminal police reports under cyber laws. A Vulnerability Disclosure Policy (VDP) with Legal Safe Harbor explicitly promises: 'If you test our systems in accordance with this policy (no data destruction, no extortion, no public leaks), we consider your research authorized and will not pursue legal action.'",
    hint: "Think of an official guarantee from a company promising not to sue ethical hackers who follow their bug reporting rules.",
    level: "basic",
    codeExample: `// Standard VDP Safe Harbor Statement:
"If you conduct vulnerability research in good faith and comply with this policy, 
we consider your activities authorized under the IT Act 2000 and CFAA, and we will not initiate legal action."`
  },
  {
    question: "Under the CERT-In Directives of 2022 in India, what log retention requirements are mandated for organizations operating in the country?",
    shortAnswer: "Mandatory retention of all system logs for a rolling period of 180 days (6 months) within the Indian jurisdiction.",
    explanation: "To facilitate forensic investigation of national cybersecurity incidents, the Indian Computer Emergency Response Team (CERT-In) issued binding directions under Section 70B(6) of the IT Act. All service providers, intermediaries, data centers, and corporate entities must securely maintain all system and network logs for a rolling period of 180 days within India, making them available to CERT-In upon lawful direction.",
    hint: "Remember the mandatory 180-day log retention rule under Indian cybersecurity law.",
    level: "moderate",
    codeExample: `// CERT-In Log Retention Mandate:
Log_Retention_Period = 180 Days (Rolling 6 Months);
Jurisdiction         = Within Indian Territory;
Statutory_Authority  = Section 70B(6) of Information Technology Act, 2000;`
  },
  {
    question: "What is the ethical responsibility of a penetration tester regarding 'Proof of Concept' (PoC) code in their final executive report?",
    shortAnswer: "To provide safe, reproducible demonstrations of the vulnerability without leaving active backdoors, persistence scripts, or weaponized payloads on client systems.",
    explanation: "An ethical hacking report must enable client developers to reproduce and verify the vulnerability (e.g., showing a screenshot of `alert(document.domain)` for XSS or a harmless `whoami` command output for RCE). The tester must never leave behind live reverse shells, permanent administrator accounts, or weaponized malware payloads, and must clean up all temporary test artifacts prior to report delivery.",
    hint: "Think about providing clear proof of the flaw while ensuring no dangerous test files remain on the client's servers.",
    level: "basic",
    codeExample: `// Safe vs Unsafe PoC:
// SAFE PoC: Execute harmless diagnostic command:
payload: "cat /etc/hostname" or "whoami"
// UNSAFE / UNETHICAL: Dropping permanent rootkit or deleting database tables!`
  },
  {
    question: "Synthesizing the ethical and legal foundations of cybersecurity: why is integrity the most essential character trait of a professional ethical hacker?",
    shortAnswer: "Because ethical hackers hold the keys to an organization's deepest digital secrets; technical skill without unwavering moral integrity transforms a protector into a catastrophic threat.",
    explanation: "Ethical hackers are entrusted with confidential medical databases, core banking ledgers, and national infrastructure vulnerabilities. A single lapse in moral judgment—such as selling a zero-day on the dark web or leaking proprietary source code—causes irreparable harm to society. Professional excellence in cybersecurity is not measured by exploit prowess alone, but by the relentless discipline to wield technical mastery solely for the defense and protection of human systems.",
    hint: "Conclude by recognizing that unwavering personal ethics and legal responsibility are the bedrock of cybersecurity.",
    level: "expert",
    codeExample: `// The Ethical Hacker Equation:
True_Security_Mastery = (Technical_Offensive_Depth * Rigorous_Methodology) / Uncompromising_Personal_Integrity;`
  }
];

export default questions;
