const questions = [
  {
    question: "Why is Information Security Management (ISM) an urgent business imperative for modern enterprises rather than an optional technical luxury?",
    shortAnswer: "Modern enterprises operate in an expanded threat landscape with cloud migration, remote work, and supply chain APIs; cyber breaches cause catastrophic downtime, reputational collapse, and statutory fines up to ₹250 Crores under the Indian DPDP Act 2023.",
    explanation: "Digital transformation has dissolved the traditional perimeter: business data is distributed across multi-cloud environments, mobile devices, and third-party vendors. Threat actors deploy automated ransomware, supply chain exploits, and AI-driven phishing. Without a proactive ISM framework, a single breach can cause devastating financial loss (average breach cost exceeds ₹17.5 Crores in India), loss of customer trust, and severe regulatory penalties under the DPDP Act 2023.",
    hint: "Think of digital transformation expanding the attack surface while regulatory fines and ransomware costs skyrocket.",
    level: "basic",
    codeExample: `// The Cost of Inaction vs Proactive ISM:
Unmanaged Enterprise: Data breach occurs → ₹250 Cr DPDP Fine + 14 Days Downtime + Brand Destruction
ISM Governed Enterprise: Risk treatment → 24/7 SOC detection in < 15 mins → 100% Resilience`
  },
  {
    question: "What is 'Annual Loss Expectancy' (ALE), and how is it quantitatively calculated in enterprise ISM risk management?",
    shortAnswer: "$$ALE = SLE \\times ARO = (AV \\times EF) \\times ARO$$ where $AV$ is Asset Value, $EF$ is Exposure Factor, and $ARO$ is Annual Rate of Occurrence.",
    explanation: "ALE represents the estimated monetary loss an organization expects to suffer from a specific risk over the course of one year: 1. Asset Value (AV): The total monetary value of the asset (e.g. ₹5,00,00,000 database); 2. Exposure Factor (EF): The percentage of the asset value destroyed or lost in a single incident (e.g. 30% or 0.30); 3. Single Loss Expectancy (SLE): $SLE = AV \\times EF = ₹1,50,00,000$; 4. Annual Rate of Occurrence (ARO): How many times the incident is expected to happen per year (e.g. 0.2 times or once every 5 years); 5. Annual Loss Expectancy (ALE): $SLE \\times ARO = ₹30,00,000$/year.",
    hint: "Multiply the single incident loss by how often the incident occurs in a year.",
    level: "moderate",
    codeExample: `// Quantitative Risk Calculation (ALE):
Asset Value (AV):          ₹10,00,00,000 (Core Payment Database)
Exposure Factor (EF):      40% (0.40)
Single Loss Expectancy:    SLE = AV * EF = ₹4,00,00,000
Annual Rate of Occurrence: ARO = 0.25 (Once every 4 years)
Annual Loss Expectancy:    ALE = SLE * ARO = ₹1,00,00,000 / year`
  },
  {
    question: "What is 'Return on Security Investment' (ROSI), and how does a CISO use it to justify cybersecurity budgets to the Board of Directors?",
    shortAnswer: "$$\\text{ROSI} = \\frac{(ALE_{unmitigated} - ALE_{mitigated}) - \\text{Cost of Control}}{\\text{Cost of Control}} \\times 100\\%$$",
    explanation: "Board members evaluate security proposals through an economic lens. ROSI quantifies the financial return of implementing a security control by comparing the risk reduction achieved against the cost of the control: If an unmitigated ransomware risk represents an ALE of ₹50,00,000, and deploying an EDR + E-mail Security gateway costs ₹10,00,000/year and mitigates 80% of the risk (saving ₹40,00,000), the net financial benefit is $₹40,00,000 - ₹10,00,00,000 = ₹30,00,000$, resulting in a ROSI of $300\\%$.",
    hint: "Divide the net risk loss prevented minus the control cost by the control cost.",
    level: "expert",
    codeExample: `// ROSI Calculation Example:
Unmitigated Risk (ALE):   ₹50,00,000 / year
Control Cost (Annual):    ₹10,00,000 (EDR + Email Gateway)
Risk Mitigated:           80% (Risk saved = ₹40,00,000)
Net Annual Benefit:       ₹40,00,000 - ₹10,00,000 = ₹30,00,000
ROSI:                     (₹30,00,000 / ₹10,00,000) * 100% = +300% ROI!`
  },
  {
    question: "Why has the traditional 'Castle-and-Moat' perimeter security model failed in modern enterprise environments?",
    shortAnswer: "Cloud services, mobile workers, SaaS applications, and third-party APIs have dissolved the physical network perimeter; once an attacker penetrates the perimeter, they can move laterally unrestricted.",
    explanation: "The castle-and-moat model assumed that everything inside the corporate local network (LAN) was trustworthy and everything outside was hostile. Today, enterprise workloads run on multi-cloud (AWS, Azure, GCP), employees access systems remotely from home networks, and APIs interface with hundreds of external vendors. An attacker gaining entry via a single compromised VPN credential can move laterally across internal subnets. Modern enterprises must replace castle-and-moat with Zero Trust Architecture ('Never Trust, Always Verify').",
    hint: "Think of an old walled fortress when half your workers and data are outside the walls.",
    level: "basic",
    codeExample: `// Castle-and-Moat vs Zero Trust:
Castle-and-Moat (Broken): Hard perimeter, soft interior (One compromised laptop infects entire network!)
Zero Trust (Modern ISM):  Every microsegment, user, and API call is continuously authenticated (mTLS + MFA).`
  },
  {
    question: "What are the primary direct and indirect costs of an enterprise cybersecurity breach?",
    shortAnswer: "Direct costs include ransom payments, forensic investigation, system restoration, and regulatory fines; indirect costs include customer churn, stock value loss, brand damage, and increased cyber insurance premiums.",
    explanation: "A data breach incurs multi-dimensional damage: 1. Direct Costs: Emergency forensic incident response teams, legal counsel fees, public relations crisis management, data recovery, customer identity theft monitoring, and statutory fines under Section 33 of the DPDP Act (up to ₹250 Crores); 2. Indirect Costs: Permanent loss of customer trust, executive resignations, competitive loss of trade secrets, breach of contract lawsuits from B2B partners, and severe credit rating downgrades.",
    hint: "Distinguish between immediate out-of-pocket expenses and long-term brand destruction.",
    level: "moderate",
    codeExample: `// Breakdown of Cyber Breach Financial Fallout:
Direct Costs:   Forensic Retainers (₹50L) + Data Recovery (₹1.2 Cr) + DPDP Fines (Up to ₹250 Cr)
Indirect Costs: 20% Customer Churn + Stock Price Plunge (-15%) + B2B Contract Cancellations`
  },
  {
    question: "How does an established Information Security Management framework act as a commercial business enabler rather than a cost center?",
    shortAnswer: "ISO 27001 and SOC 2 certifications build trust, accelerate B2B enterprise sales cycles, unlock international contracts, and reduce cyber insurance premiums.",
    explanation: "Enterprise clients and government agencies strictly require their vendors to prove security maturity before signing vendor contracts. Demonstrating an ISO/IEC 27001:2022 certified ISMS, SOC 2 Type II compliance, and robust data protection under the DPDP Act shortens procurement security reviews from 6 months to 2 weeks, unlocks global enterprise RFPs, and provides a significant competitive advantage over non-certified competitors.",
    hint: "Think of how an official food safety certificate attracts high-paying restaurant customers.",
    level: "moderate",
    codeExample: `// ISM as a Revenue Accelerator:
Without ISO 27001: Enterprise client blocks vendor contract → ₹10 Crore deal lost!
With Active ISMS:   Vendor passes security assessment instantly → ₹10 Crore deal signed in 14 days!`
  },
  {
    question: "What is 'Shadow IT', and why is it a severe risk driver that necessitates enterprise-wide Information Security Management?",
    shortAnswer: "Shadow IT refers to unauthorized software, cloud services, or hardware deployed by employees without IT/security approval; it creates unmonitored data leaks and unpatched vulnerabilities.",
    explanation: "When employees use unapproved SaaS tools (e.g. personal Dropbox, unauthorized AI chatbots, unvetted cloud storage) to complete work faster, sensitive company and customer data (PII, source code, financial spreadsheets) is uploaded to third-party servers outside corporate security monitoring. If that third-party service is breached, the enterprise suffers a major data leak without ever knowing the data was there. ISM manages Shadow IT through Cloud Access Security Brokers (CASBs) and clear Acceptable Use Policies (AUP).",
    hint: "Think of employees sneaking uninspected private machinery into a factory.",
    level: "basic",
    codeExample: `// Shadow IT Example & Mitigation:
Risk: Employee uploads customer database to unapproved public AI tool → Data Leaked!
ISM Defense: CASB (Cloud Access Security Broker) monitors cloud traffic + Enforces Acceptable Use Policy.`
  },
  {
    question: "Under the Reserve Bank of India (RBI) Cyber Security Framework, why is proactive ISM mandatory for all Indian commercial banks and payment gateways?",
    shortAnswer: "RBI mandates continuous board-level oversight, dedicated CISO governance, 24/7 Security Operations Centers (SOC), periodic vulnerability testing, and mandatory 2-hour incident reporting to the RBI Cyber Security Cell.",
    explanation: "The RBI Cyber Security Framework for Banks mandates that financial institutions cannot treat security as an afterthought. It legally requires: 1. Board-approved Cyber Security Policy; 2. Dedicated, independent CISO; 3. Continuous 24/7 SOC monitoring; 4. Multi-factor authentication (MFA) for all administrative and customer transactions; 5. Mandatory reporting of cyber incidents to the RBI within 2 to 6 hours; 6. Strict third-party vendor risk management.",
    hint: "Remember the stringent RBI cybersecurity framework governing Indian banking infrastructure.",
    level: "basic",
    codeExample: `// RBI Cyber Security Baseline Requirements:
1. Independent CISO reporting directly to Board Risk Committee
2. 24/7/365 Security Operations Center (SOC) with automated SIEM telemetry
3. Mandatory cyber incident escalation to RBI within 2 to 6 hours
4. End-to-end encryption of all payment PINs inside FIPS 140-3 HSMs`
  },
  {
    question: "What is 'Supply Chain Cyber Risk', and why is third-party vendor risk management a critical component of modern enterprise ISM?",
    shortAnswer: "Attackers compromise smaller, less secure third-party vendors or software libraries (e.g. SolarWinds, Log4j) to pivot into high-value enterprise networks; ISM enforces vendor security audits and contractual safeguards.",
    explanation: "Large enterprises often have hardened perimeters, so sophisticated threat actors target their trusted third-party suppliers, IT service providers, or software dependencies. If a billing vendor or cloud monitoring tool is compromised, the attacker inherits the vendor's trusted API access to the enterprise core network. Modern ISM frameworks mandate Third-Party Risk Management (TPRM), including vendor risk assessments, SOC 2 verification, and strict least-privilege network segmentation.",
    hint: "Think of an attacker sneaking into a mansion by hiding inside the trusted grocery delivery truck.",
    level: "expert",
    codeExample: `// Supply Chain Attack Vector:
Attacker ➔ [ Compromises Small Billing Vendor ] ➔ [ Uses Trusted Vendor VPN/API ] ➔ [ Breaches Bank Core! ]
ISM Defense: Vendor Security Assessments, Contractual SLAs, and Zero Trust API Tokenization.`
  },
  {
    question: "How does cyber insurance interact with Information Security Management in modern enterprise risk financing?",
    shortAnswer: "Cyber insurance transfers residual financial risk; however, insurers strictly require proof of a mature ISM program (MFA, EDR, offline backups, regular audits) before issuing policies or paying claims.",
    explanation: "Cyber insurance has become essential for risk transfer, covering extortion fees, business interruption, and legal liabilities. However, insurance underwriters no longer write blind policies. They mandate comprehensive underwriting audits: enterprises must prove mandatory MFA across all endpoints, 24/7 SOC monitoring, immutable air-gapped backups, and formal incident response playbooks. If a breach occurs and investigation reveals the enterprise lied about its security controls, the insurer legally denies the claim.",
    hint: "Think of auto insurance requiring working seatbelts and brakes before paying an accident claim.",
    level: "moderate",
    codeExample: `// Cyber Insurance Underwriting Prerequisites:
Required Controls:  Mandatory MFA + Immutable Backups + 24/7 EDR + ISO 27001 Compliance
Failure Outcome:   If controls are missing during a claim investigation → 100% CLAIM DENIAL!`
  },
  {
    question: "Under the Information Technology Act 2000 Section 43A, what constitutes 'Reasonable Security Practices and Procedures' (SPDI Rules)?",
    shortAnswer: "Implementing a comprehensive, documented information security program containing managerial, technical, operational, and physical security control measures commensurate with the assets being protected (e.g. ISO/IEC 27001).",
    explanation: "Section 43A of the IT Act 2000 holds corporate bodies liable to pay damages by way of compensation to affected persons if they are negligent in maintaining 'reasonable security practices' when handling Sensitive Personal Data or Information (SPDI). Under the SPDI Rules 2011, adhering to an international standard like ISO/IEC 27001 is recognized by Indian courts as conclusive legal proof of maintaining reasonable security practices.",
    hint: "Remember the legal standard that protects companies from civil liability in Indian courts.",
    level: "basic",
    codeExample: `// IT Act Section 43A Legal Protection:
Statutory Test:   Did the enterprise maintain "Reasonable Security Practices"?
Legal Proof:      ISO/IEC 27001:2022 Certification + Documented ISMS + Regular 3rd Party Audits
Outcome in Court: Conclusive evidence refuting corporate negligence!`
  },
  {
    question: "What is 'Ransomware-as-a-Service' (RaaS), and why has it made proactive ISM essential for small and medium enterprises (MSMEs)?",
    shortAnswer: "RaaS is a cybercrime business model where ransomware developers lease their malware to low-skilled affiliates, democratizing high-intensity extortion attacks against organizations of all sizes.",
    explanation: "Historically, sophisticated ransomware required expert malware development skills. Today, organized cyber syndicates operate Ransomware-as-a-Service (RaaS) platforms, providing turnkey encryption binaries, payment negotiation portals, and leak sites to affiliates in exchange for a 20-30% cut of ransoms. This has resulted in a massive surge of automated attacks targeting unprepared MSMEs, hospitals, and educational institutions, making basic ISM controls (immutable backups, MFA, patch management) vital for survival.",
    hint: "Think of a franchise model for cybercrime that allows novice criminals to launch complex attacks.",
    level: "moderate",
    codeExample: `// RaaS Cybercrime Ecosystem:
[ Core Syndicate (Developers) ] ➔ Leases ransomware payload & darknet leak site
       |
[ Affiliates (Attackers) ]      ➔ Scans internet for unpatched VPNs/phishing ➔ Encrypts victims
       |
[ Victim Pays Ransom ]          ➔ Syndicate takes 20% cut; Affiliate receives 80%`
  },
  {
    question: "Synthesizing the Need and Importance of ISM: what is the fundamental business equation of proactive security investment?",
    shortAnswer: "$$\\text{Net Business Value} = \\text{Market Trust} + \\text{Regulatory Immunity} + (ALE_{\\text{prevented}} - \\text{ISM Investment})$$ with continuous risk mitigation.",
    explanation: "This master relationship proves that Information Security Management is the bedrock of modern digital commerce. Investing in a structured ISMS not only prevents catastrophic financial losses ($ALE$) and regulatory fines under the Indian DPDP Act 2023, but also generates measurable business value through customer confidence, accelerated enterprise sales, and unshakeable operational continuity.",
    hint: "Conclude by reviewing how proactive ISM transforms risk prevention into tangible business growth.",
    level: "expert",
    codeExample: `// The Master Business Case for ISM:
Investment:  ₹15,00,000 / year in ISMS Governance (ISO 27001, SOC, Training)
Protection:  Mitigates ₹1.5 Crore Annual Loss Expectancy + Immunizes against ₹250 Cr DPDP Fines
Growth:      Unlocks ₹20 Crore in B2B enterprise client contracts!`
  }
];

export default questions;
