const questions = [
  {
    question: "Under the Indian Evidence Act, what is the role of a 'Section 65B Electronic Evidence Certificate' in cyber crime prosecutions?",
    shortAnswer: "A mandatory legal certificate signed by the system manager verifying that electronic records (logs, hard drive dumps, emails) were produced by computers in lawful operational condition without tampering.",
    explanation: "Under Section 65B of the Indian Evidence Act, 1872 (and corresponding provisions in the Bharatiya Sakshya Adhiniyam, 2023), digital evidence (server logs, CCTV footage, database dumps, WhatsApp chats) is inadmissible in a court of law as secondary evidence unless accompanied by a signed Section 65B certificate. The certificate must describe the electronic record, identify the computer hardware, and confirm that the device operated regularly without unauthorized manipulation during the period.",
    hint: "Think about the mandatory certificate required by Indian courts to accept computer logs and digital evidence as valid trial proof.",
    level: "expert",
    codeExample: `// Section 65B Certificate Requirements:
1. Identification of the Electronic Record (e.g., Apache server access logs, firewall pcap)
2. Description of the Computer Hardware & Operating System
3. Certification that the device was operating regularly under lawful control
4. Signed by a Person Occupying a Responsible Official Management Position`
  },
  {
    question: "Under Section 70 of the Indian Information Technology Act 2000, what is a 'Protected System', and what is the penalty for unauthorized access?",
    shortAnswer: "Any computer system or network designated by the Government as Critical Information Infrastructure affecting national security, defense, or economy; unauthorized access is punishable by up to 10 years imprisonment.",
    explanation: "Section 70 empowers the appropriate Government to declare any computer system directly or indirectly affecting national security, economy, public health, or safety as a 'Protected System' (e.g., power transmission grids, nuclear plants, core banking switches, railway signaling). Accessing or attempting to access a Protected System without explicit authorization carries severe criminal penalties of imprisonment for up to 10 years and heavy fines.",
    hint: "Recall the section of the IT Act that designates critical national infrastructure as 'Protected Systems' with 10-year prison terms.",
    level: "moderate",
    codeExample: `// IT Act Section 70 (Protected System):
Protected Sectors: Power Grids, Nuclear Facilities, Space & Defense, Central Banking
Offense: Unauthorized access or attempted access to designated critical infrastructure
Penalty: Up to 10 Years Imprisonment + Heavy Financial Fines (Non-Bailable)`
  },
  {
    question: "What is the legal difference between 'Cognizable' vs 'Non-Cognizable' and 'Bailable' vs 'Non-Bailable' offenses under Indian Cyber Law?",
    shortAnswer: "Cognizable offenses permit police to arrest without a magistrate warrant; Non-bailable offenses require judicial court discretion for bail rather than police station release.",
    explanation: "In Indian criminal procedure: 1. In a Cognizable offense (e.g., Section 66F Cyber Terrorism or Section 66 Identity Theft), a police officer can investigate and arrest a suspect immediately without an arrest warrant from a magistrate; 2. In a Non-Bailable offense, the accused cannot claim bail as an automatic legal right at the police station—bail must be argued before and granted by a judicial magistrate or High Court judge.",
    hint: "Think about whether police can arrest you immediately without a judge's warrant (cognizable) and whether bail is automatic (bailable).",
    level: "moderate",
    codeExample: `// Legal Classification of Key Cyber Offenses:
Section 66 (Hacking):          Cognizable, Bailable (Up to 3 yrs)
Section 66C (Identity Theft):  Cognizable, Bailable (Up to 3 yrs)
Section 66F (Cyber Terrorism): Cognizable, NON-BAILABLE (Life Imprisonment)`
  },
  {
    question: "How does the Digital Personal Data Protection (DPDP) Act 2023 define the roles and responsibilities of 'Data Fiduciaries' versus 'Data Processors'?",
    shortAnswer: "Data Fiduciaries determine the purpose and means of processing personal data and bear primary statutory liability; Data Processors process data on behalf of the fiduciary.",
    explanation: "Under India's DPDP Act 2023: 1. A 'Data Fiduciary' is the legal entity (bank, hospital, e-commerce company) that decides why and how personal data is collected and processed; they bear 100% statutory liability (fines up to ₹250 Crores) for any breach; 2. A 'Data Processor' is a third-party vendor (cloud provider, analytics firm) that processes data strictly under contract for the fiduciary.",
    hint: "Recall that the Data Fiduciary is the primary company collecting the data, while the Data Processor is the vendor doing the technical work.",
    level: "basic",
    codeExample: `// DPDP Act 2023 Entities:
Data Principal:  The individual citizen whose personal data is collected (e.g., Patient).
Data Fiduciary:  The hospital determining why data is collected → Liable up to ₹250 Cr.
Data Processor:  The cloud database vendor hosting files on behalf of the hospital.`
  },
  {
    question: "Under Section 65 of the Indian IT Act 2000, what constitutes 'Tampering with Computer Source Documents'?",
    shortAnswer: "Knowingly or intentionally concealing, destroying, or altering any computer source code required to be kept or maintained by law; punishable by up to 3 years imprisonment and ₹2 Lakhs fine.",
    explanation: "Section 65 protects computer source code (the human-readable programming instructions that compile into executable software). If an employee, contractor, or hacker maliciously deletes code repositories, injects hidden backdoors into source files, or alters system audit logging routines required by regulatory mandates, they are criminally liable under Section 65 for up to 3 years imprisonment.",
    hint: "Think about deliberately altering or deleting a company's programming source code.",
    level: "moderate",
    codeExample: `// IT Act Section 65 (Source Code Tampering):
Offense: Deleting git source repositories, injecting backdoors into C/Java files, altering audit logic
Penalty: Up to 3 Years Imprisonment, or Fine up to ₹2,00,000, or Both`
  },
  {
    question: "What is 'Chain of Custody' in digital forensics, and why does any gap in the custody log render digital evidence inadmissible in court?",
    shortAnswer: "A chronological paper and digital audit trail documenting who seized, transferred, analyzed, and secured physical evidence; gaps introduce doubt that evidence was altered or tampered with.",
    explanation: "When digital forensics experts seize a suspect's laptop, server hard drive, or smartphone, they must document every single handoff: time, date, badge number, purpose of transfer, and cryptographic SHA-256 hash. If an unsealed hard drive is left in an unmonitored room for two hours without signature logs, defense attorneys can argue that someone altered the files, causing the judge to throw out the evidence completely.",
    hint: "Think of the continuous signature log that proves no unauthorized person ever touched the evidence drive.",
    level: "basic",
    codeExample: `// Chain of Custody Log Entry:
Item: Samsung 1TB SSD (Serial: S3Z1NY0... | SHA-256: e3b0c44298fc...)
Seized by: Insp. Mamata (Badge #8492) @ 10:30 AM IST (Sealed in Anti-Static Bag #0042)
Transferred to: Forensic Analyst Mahima @ 02:15 PM IST (Seal Verified Intact: YES)`
  },
  {
    question: "What does Section 66B of the Indian IT Act 2000 penalize regarding 'Stolen Computer Resources'?",
    shortAnswer: "Dishonestly receiving or retaining any stolen computer resource or communication device knowing or having reason to believe it was stolen; up to 3 years imprisonment and ₹1 Lakh fine.",
    explanation: "Similar to receiving stolen physical goods under the IPC, Section 66B criminalizes possessing stolen laptops, hacked server databases, or leaked intellectual property. If a hacker steals a proprietary database from a competitor and sells it to a third-party company that knowingly uses the stolen data, the purchasing executives are criminally liable under Section 66B.",
    hint: "Remember that buying or keeping stolen data or hacked laptops is an explicit crime under Section 66B.",
    level: "moderate",
    codeExample: `// IT Act Section 66B (Receiving Stolen Computer Resource):
Offense: Purchasing or retaining breached customer database dumps from dark web forums
Penalty: Up to 3 Years Imprisonment, or Fine up to ₹1,00,000, or Both`
  },
  {
    question: "Under the European Union General Data Protection Regulation (GDPR), what are the mandatory breach notification timelines under Article 33?",
    shortAnswer: "Mandatory notification to the Data Protection Supervisory Authority without undue delay and, where feasible, not later than 72 hours after becoming aware of the personal data breach.",
    explanation: "Article 33 of GDPR requires data controllers to notify national supervisory authorities (like the CNIL in France or ICO in the UK) within 72 hours of confirming a breach. If the breach presents a high risk to the rights and freedoms of individuals (e.g., leaked medical history or credit card credentials), Article 34 mandates notifying the affected individuals directly without undue delay.",
    hint: "Remember the 72-hour regulatory breach reporting window under European GDPR law.",
    level: "moderate",
    codeExample: `// Global Breach Notification Timelines Comparison:
India (CERT-In Mandate):  WITHIN 06 HOURS of Confirmation (Strict National Security Rule)
European Union (GDPR):    WITHIN 72 HOURS of Confirmation (Article 33)
USA (SEC Public Companies): WITHIN 04 BUSINESS DAYS of Materiality Determination`
  },
  {
    question: "What is a 'Non-Disclosure Agreement' (NDA) in penetration testing, and what legal liabilities arise if a tester discloses a client zero-day publicly?",
    shortAnswer: "A legally binding contract enforcing complete confidentiality over all discovered vulnerabilities; public disclosure breaches contract, triggering commercial damages and civil lawsuits.",
    explanation: "Before any penetration test begins, the ethical hacker and client sign a comprehensive Non-Disclosure Agreement (NDA). If the tester shares screenshots of the client's vulnerabilities on LinkedIn, Discord, or blogs without explicit written authorization, the client can sue the tester for breach of contract, sue for commercial damages (lost stock valuation, customer churn), and seek injunctive gag orders.",
    hint: "Think about the legal secrecy agreement that forbids security testers from bragging about client bugs online.",
    level: "basic",
    codeExample: `// Standard Penetration Testing NDA Clause:
"The Auditor agrees that all proprietary information, discovered vulnerabilities, system architectures, 
and customer data shall be held in strict confidence and shall not be disclosed to any third party."`
  },
  {
    question: "Under the UK Computer Misuse Act 1990 (CMA), how does the 2015 Serious Crime Act amendment enhance Section 3ZA regarding critical infrastructure damage?",
    shortAnswer: "It introduces a maximum penalty of Life Imprisonment for unauthorized computer acts that cause serious damage to human welfare, national economy, or national security.",
    explanation: "Section 3ZA was added to the UK CMA to address weaponized nation-state and terrorist cyber attacks. If an unauthorized computer act causes or creates a significant risk of severe damage to human welfare (e.g., cutting off hospital oxygen systems, water treatment contamination) or national defense, the statutory penalty is Life Imprisonment, mirroring Section 66F of India's IT Act 2000.",
    hint: "Remember the UK law amendment prescribing life imprisonment for cyber attacks threatening human life or national security.",
    level: "expert",
    codeExample: `// UK Computer Misuse Act Section 3ZA:
Target: Essential Human Services (Hospitals, Power, Water, Defense)
Impact: Loss of Life, Serious Illness, or Severe National Economic Disruption
Maximum Sentence: LIFE IMPRISONMENT`
  },
  {
    question: "What constitutes 'Legal Safe Harbor' in Bug Bounty programs, and how does it protect ethical researchers from CFAA and IT Act Section 66 prosecution?",
    shortAnswer: "A binding corporate pledge promising that activities conducted in compliance with the program policy are considered authorized access, waiving civil and criminal claims.",
    explanation: "Without safe harbor, probing an organization's web applications constitutes unauthorized access under Section 66 of the IT Act and the CFAA. Gold Standard Safe Harbor (endorsed by the US DOJ and global tech leaders) legally binds the company: 'If you test our systems in accordance with this policy, we authorize your access, waive any CFAA/IT Act claims, and will not initiate legal action against you.'",
    hint: "Think of an official legal promise by a company that they will not call the police on ethical hackers who follow their bug bounty rules.",
    level: "basic",
    codeExample: `// Legal Safe Harbor Declaration:
"We consider security research conducted under this policy to be:
1. Authorized access under all applicable computer crime laws.
2. Exempt from DMCA anti-circumvention restrictions.
3. Protected from civil lawsuits or criminal referrals by our organization."`
  },
  {
    question: "Under Section 66E of the Indian IT Act 2000, what constitutes 'Violation of Privacy', and what is the statutory penalty?",
    shortAnswer: "Intentionally capturing, publishing, or transmitting the image of a private area of any person without their consent; punishable by up to 3 years imprisonment or ₹2 Lakhs fine.",
    explanation: "Section 66E is designed to penalize digital voyeurism, unauthorized webcam hacking, and non-consensual sharing of intimate images. If a black-hat hacker deploys a Remote Access Trojan (RAT) to stealthily record victims through their laptop webcams or compromises cloud photo storage to leak private photos, they face up to 3 years imprisonment under Section 66E.",
    hint: "Think of hacking someone's webcam or leaking private personal photos without consent.",
    level: "moderate",
    codeExample: `// IT Act Section 66E (Privacy Violation):
Offense: Hacking webcams, capturing/transmitting private intimate images without consent
Penalty: Imprisonment up to 3 Years, or Fine up to ₹2,00,000, or Both`
  },
  {
    question: "What is a 'Forensic Write Blocker', and why is it mandatory during the bit-stream disk acquisition of evidentiary storage drives?",
    shortAnswer: "Hardware or software that prevents any write commands from reaching the original evidence drive while allowing read-only access to create a forensic bit-by-bit clone.",
    explanation: "Merely plugging a suspect's USB drive or hard drive into a Windows computer automatically modifies file access timestamps (`Last Accessed`) and creates hidden operating system artifacts (`System Volume Information`). A hardware write blocker physically severs the write signal lines, ensuring that not a single bit on the suspect drive is altered while creating a 100% identical bit-stream image (Raw DD or E01 format).",
    hint: "Think of the physical hardware device that stops a computer from writing or modifying any data on an evidence hard drive.",
    level: "moderate",
    codeExample: `// Forensic Bit-Stream Image Acquisition:
Evidence Hard Drive → [ Hardware Write Blocker (Read-Only) ] → Forensic Workstation
Verification:
Source Drive SHA-256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
Forensic Image SHA-256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 (100% Match)`
  },
  {
    question: "Under the US Computer Fraud and Abuse Act (CFAA), what was the significance of the 2022 US Department of Justice (DOJ) policy revision regarding good-faith security research?",
    shortAnswer: "The DOJ officially directed federal prosecutors not to charge ethical hackers under the CFAA if their activities were conducted in good faith solely for security research.",
    explanation: "In May 2022, Deputy Attorney General Lisa Monaco announced a historic policy change. The DOJ revised its CFAA charging guidelines, explicitly stating that federal prosecutors should decline to prosecute 'good-faith security research'—defined as accessing a computer solely for testing, investigating, or correcting a security flaw in a manner designed to avoid harm to individuals or the public.",
    hint: "Remember the 2022 US DOJ directive protecting good-faith security researchers from criminal prosecution.",
    level: "expert",
    codeExample: `// 2022 US DOJ CFAA Policy Mandate:
"Good-faith security research means accessing a computer solely for purposes of good-faith testing, 
investigation, and/or correction of a security flaw or vulnerability... 
The Department should not charge individuals engaged in good-faith security research."`
  },
  {
    question: "What is an 'Expert Witness' in a cyber crime court trial, and what are their legal duties under Indian criminal jurisprudence?",
    shortAnswer: "A qualified cybersecurity specialist who provides impartial technical testimony to help the court understand complex digital evidence, logs, and cryptographic hashes.",
    explanation: "Under Section 45 of the Indian Evidence Act (Section 39 of Bharatiya Sakshya Adhiniyam), an expert witness is summoned when the court needs specialized technical opinion on digital forensics, malware reverse-engineering, or network logs. Crucially, the expert witness's paramount duty is to the court and the truth, not to the party paying their professional fee.",
    hint: "Think about a certified forensic expert testifying in court to explain how a hacker broke into a banking server.",
    level: "moderate",
    codeExample: `// Expert Witness Duties:
1. Explain technical logs and exploit mechanics in clear, impartial language to the Judge.
2. Validate Section 65B certificates and cryptographic hash integrity.
3. Provide objective root-cause analysis without advocacy or bias.`
  },
  {
    question: "What constitutes 'Extortion under the Indian Penal Code' (IPC Section 384) when a hacker demands cryptocurrency to withhold stolen data?",
    shortAnswer: "Intentionally putting any person in fear of injury/reputation damage and dishonestly inducing them to deliver money or valuable security; punishable by up to 3 years imprisonment.",
    explanation: "When a ransomware operator or rogue researcher threatens: 'Pay 5 Bitcoins (₹3 Crores) or we will publish all your customer records online', this constitutes criminal extortion under Section 384 of the Indian Penal Code (read with Section 66 of the IT Act). It is a cognizable criminal offense regardless of whether the communication occurred via Tor or email.",
    hint: "Recall the criminal IPC section penalizing financial extortion and blackmail.",
    level: "basic",
    codeExample: `// Legal Classification of Ransomware Extortion:
Primary Offenses:
1. IT Act 2000 Section 66: Unauthorized Hacking & Damage (3 Years)
2. IPC Section 384: Criminal Extortion & Blackmail (3 Years)
3. IPC Section 420: Cheating and Dishonestly Inducing Delivery of Property (7 Years)`
  },
  {
    question: "Under the DPDP Act 2023, what is the role of the 'Data Protection Board of India' (DPBI) in adjudicating data breaches?",
    shortAnswer: "An independent digital adjudicatory body empowered to investigate data breaches, summon witnesses, order remedial measures, and impose administrative penalties up to ₹250 Crores.",
    explanation: "Established under Chapter V of the DPDP Act 2023, the Data Protection Board of India (DPBI) functions as a specialized digital civil tribunal. Upon receiving a breach notification from a data fiduciary or complaint from a citizen, the DPBI conducts online digital inquiries, reviews forensic audit reports, and possesses statutory authority to levy massive financial penalties against negligent corporations.",
    hint: "Remember the primary government authority established to enforce the DPDP Act 2023 in India.",
    level: "basic",
    codeExample: `// DPBI Statutory Powers:
1. Receive and investigate personal data breach notifications.
2. Direct urgent interim measures to contain data leakage.
3. Impose administrative penalties up to ₹250 Crores per violation.`
  },
  {
    question: "What is 'Anticipatory Bail' in Indian criminal jurisprudence, and how does it apply when a security researcher is threatened with false cyber crime charges?",
    shortAnswer: "A pre-arrest court order granted under Section 438 CrPC directing that in the event of an arrest, the individual shall be released on bail immediately.",
    explanation: "If an ethical hacker conducts research and is unjustly threatened with criminal FIRs by a hostile corporate vendor under Section 66, the researcher's legal counsel can petition the Sessions Court or High Court for Anticipatory Bail under Section 438 of the Code of Criminal Procedure (CrPC). If granted, police cannot detain the researcher in custody upon registering the FIR.",
    hint: "Think of an official court protection order granted before police can arrest someone.",
    level: "expert",
    codeExample: `// Anticipatory Bail Petition Grounds (Ethical Researcher):
1. Demonstration of Good-Faith Research (Email logs showing CVD notification).
2. Proof of Zero Financial Extortion or Data Damage.
3. Willingness to cooperate fully with police and forensic investigators.`
  },
  {
    question: "Why must a Penetration Tester never perform 'Live Remediation' or modify server configuration files during an authorized assessment?",
    shortAnswer: "Because modifying production configuration files without change management approval can cause unintended operational outages and creates legal liability for system downtime.",
    explanation: "The ethical hacker's role is to discover, validate, and report vulnerabilities, not to reconfigure production servers. If a tester discovers an unencrypted telnet port and decides to disable it on the live server, they might accidentally break a legacy automated backup script, causing a multi-crore production outage for which the tester's firm will be sued.",
    hint: "Think about why a security auditor should never try to fix the pipes in a client's building without permission.",
    level: "basic",
    codeExample: `// Professional Boundary Rule:
ROLE OF PENTESTER: Document the flaw → Provide exact fix in report → Verify patch during re-test.
FORBIDDEN: Modifying live production configuration files or deleting services yourself!`
  },
  {
    question: "Synthesizing the entire Legal and Cyber Law framework: what is the ultimate guiding principle that protects an ethical hacker throughout their career?",
    shortAnswer: "Never execute a single technical probe without signed written authorization, strictly respect agreed scope boundaries, and always maintain an unyielding commitment to personal and professional integrity.",
    explanation: "Technical prowess is a powerful tool. In the eyes of the law, the boundary between an esteemed cybersecurity leader and a convicted felon is defined by a single document: explicit, written authorization from the asset owner. By combining technical mastery with rigorous adherence to cyber law (IT Act 2000, DPDP Act 2023) and unwavering personal ethics, a cybersecurity professional ensures a long, honorable, and transformative career.",
    hint: "Conclude by recognizing that explicit written authorization and unwavering ethics are the bedrock of a successful cybersecurity career.",
    level: "expert",
    codeExample: `// The Golden Law of Cybersecurity:
No_Signed_RoE == NO PACKETS SENT;
Signed_RoE + Strict_Scope + Uncompromising_Integrity == LAWFUL DEFENSE OF DIGITAL SOCIETY;`
  }
];

export default questions;
