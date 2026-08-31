const questions = [
  {
    id: 1,
    question: "What was the landmark Equifax Data Breach (2017) and how many consumer identities were compromised?",
    shortAnswer: "A massive cyber intrusion resulting from an unpatched Apache Struts vulnerability that exposed personal and financial records of 147 Million Americans (~50% of the US population) and millions in the UK and Canada.",
    explanation: "Between May 13 and July 29, 2017, threat actors exfiltrated Social Security numbers, birth dates, full names, addresses, driver's license numbers, and payment cards from Equifax, one of the three major US credit bureaus. It resulted in over ₹5,800 Crores ($700+ Million) in global regulatory settlements.",
    hint: "The 2017 breach of a major credit bureau exposing 147 million Americans' Social Security numbers.",
    level: "Moderate",
    codeExample: `// Equifax Breach Impact Summary:
const equifaxBreachStats = {
  affectedAmericans: 147000000,
  affectedUkCitizens: 15200000,
  stolenDataTypes: ["SSNs", "DOB", "Legal Names", "Addresses", "Driver's Licenses", "Credit Cards"],
  regulatorySettlementUSD: 700000000, // ~₹5,800 Crores
  intrusionDurationDays: 76
};`
  },
  {
    id: 2,
    question: "What specific vulnerability (CVE-2017-5638) in Apache Struts 2 enabled the initial compromise?",
    shortAnswer: "A Remote Code Execution (RCE) vulnerability in the JakartaMultipartParser component triggered by sending malformed OGNL expressions inside the Content-Type HTTP header.",
    explanation: "Apache Struts 2 failed to properly handle file upload error messages in the JakartaMultipartParser. When a client sent a Content-Type header containing Object-Graph Navigation Language (OGNL) expressions, Struts evaluated the expression during error string formatting, executing arbitrary Java ProcessBuilder system commands on the host OS.",
    hint: "OGNL injection inside the Content-Type header of Apache Struts JakartaMultipartParser.",
    level: "Expert",
    codeExample: `// CVE-2017-5638 Exploit Payload Pattern (Header):
// Content-Type: %{(#_='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)...(#cmd='whoami').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win')))...(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd}))...}`
  },
  {
    id: 3,
    question: "Why did Equifax fail to patch the Struts vulnerability even though US-CERT issued emergency warnings two months earlier?",
    shortAnswer: "Equifax lacked a centralized Software Bill of Materials (SBOM) and asset inventory, meaning the dispute portal team did not know their application relied on Apache Struts.",
    explanation: "On March 8, 2017, US-CERT published the alert and Apache released the patch. Equifax management sent a company-wide email directing staff to patch. However, because Equifax had no automated software asset inventory or dependency tracking, the dispute portal (ACIS) was never identified as using Struts, leaving it unpatched for months.",
    hint: "Lack of a centralized software asset inventory and SBOM left administrators blind to where Struts was installed.",
    level: "Moderate",
    codeExample: `// Asset Inventory Gap:
// US-CERT Alert: March 8, 2017
// Internal Directive Sent: March 9, 2017
// Actual State: ACIS Dispute Portal team never received ticket because IT had no record of Struts on ACIS server!`
  },
  {
    id: 4,
    question: "How did an expired SSL/TLS inspection certificate blind Equifax's Network Intrusion Detection System (NIDS) for 10 months?",
    shortAnswer: "Equifax's SSiG traffic decryption appliance stopped decrypting HTTPS traffic when its certificate expired in 2016, allowing attackers to exfiltrate data undetected through encrypted tunnels for 76 days.",
    explanation: "To inspect outbound encrypted traffic for data theft, Equifax routed HTTPS traffic through an SSL inspection sensor. However, the cryptographic certificate expired in 2016 and was never renewed. The sensor failed open, passing all encrypted traffic without inspection, completely blinding the Security Operations Center until the certificate was renewed on July 29, 2017.",
    hint: "An expired SSL inspection certificate caused security sensors to silently pass encrypted attack traffic without decryption.",
    level: "Expert",
    codeExample: `// Certificate Lifecycle Failure:
const sslSensorStatus = {
  certExpirationDate: "2016 (Expired 10 months before breach)",
  decryptionState: "DISABLED (Silently passing raw encrypted traffic)",
  impact: "9,000+ malicious SQL queries exfiltrated over HTTPS went completely invisible to IDS"
};`
  },
  {
    id: 5,
    question: "How did threat actors pivot from the web server to access 48 unrelated core databases containing 147 million records?",
    shortAnswer: "Unencrypted master database credentials were stored in plaintext configuration files on the web server, which had unrestricted network access to corporate database tiers.",
    explanation: "Equifax's internal network was flat and lacked database micro-segmentation. Once attackers obtained a web shell, they found plaintext database usernames and passwords in configuration files. The web server's service account possessed excessive privileges (`SELECT ALL`), allowing the attackers to execute 9,000+ SQL queries across 48 separate relational databases.",
    hint: "Plaintext database passwords in config files combined with a flat network and over-privileged database accounts.",
    level: "Moderate",
    codeExample: `// Architectural Over-Privilege:
// Dispute Web Server (ACIS) → Holds Root DB Password in plaintext config → Allowed to query 48 unrelated databases!`
  },
  {
    id: 6,
    question: "What threat actor group was officially indicted by the US Department of Justice for the Equifax intrusion?",
    shortAnswer: "Four military officers belonging to the 54th Research Institute of China's People's Liberation Army (PLA).",
    explanation: "In February 2020, the US Department of Justice unsealed a federal indictment charging Wu Zhirong, Wang Qian, Xu Ke, and Liu Lei of the PLA 54th Research Institute with computer fraud, economic espionage, and wire fraud conspiracy for orchestrating the Equifax breach.",
    hint: "Officers from the 54th Research Institute of the Chinese People's Liberation Army (PLA).",
    level: "Basic",
    codeExample: `// US DOJ Indictment (Feb 2020):
// Defendants: 4 Members of PLA 54th Research Institute
// Charges: Computer Fraud (18 U.S.C. 1030), Economic Espionage, Wire Fraud`
  },
  {
    id: 7,
    question: "What critical PR and crisis communication blunders did Equifax commit following public disclosure of the breach?",
    shortAnswer: "Launching a buggy standalone WordPress site (`equifaxsecurity2017.com`) that gave wrong breach answers, and having the official @Equifax Twitter account accidentally tweet links to a fake phishing site.",
    explanation: "Rather than hosting breach updates on their verified core domain (`equifax.com`), Equifax used an unverified standalone domain. A security researcher built a parody site (`securityequifax2017.com`) to demonstrate how easy it was to spoof, and Equifax customer service tweeted the fake phishing link four separate times.",
    hint: "Using a standalone domain that gave buggy answers and tweeting fake phishing links from the official Twitter account.",
    level: "Moderate",
    codeExample: `// Crisis Communication Failures:
// 1. Used standalone WordPress domain: equifaxsecurity2017.com (Vulnerable to typo-squatting)
// 2. Customer service tweeted spoofed link: securityequifax2017.com
// 3. CAPTCHA and server errors prevented citizens from freezing their credit files`
  },
  {
    id: 8,
    question: "How does modern 'Software Bill of Materials' (SBOM) and DevSecOps scanning prevent uninventoried dependency breaches?",
    shortAnswer: "Automated tools (CycloneDX, SPDX, Snyk) generate an exact, real-time inventory of all third-party libraries across every repository, instantly alerting engineers when a newly disclosed CVE affects any service.",
    explanation: "An SBOM acts as an ingredient list for software. When a zero-day like CVE-2017-5638 (Struts) or Log4Shell is disclosed, security teams query their centralized SBOM database: `SELECT service_name WHERE dependency = 'struts' AND version < '2.3.32'`. This identifies all affected production workloads within seconds instead of months.",
    hint: "An automated inventory of all open-source libraries that instantly maps new CVEs to running servers.",
    level: "Moderate",
    codeExample: `// SBOM Dependency Query (CycloneDX / Snyk):
// Query: "component.name == 'org.apache.struts:struts2-core' && component.version < '2.5.10.1'"
// Result: Alerts SOC and blocks CI/CD deployment within 60 seconds!`
  },
  {
    id: 9,
    question: "What is 'Data Tokenization' and how would it have mitigated the blast radius of the Equifax database dump?",
    shortAnswer: "Replacing real Social Security and Aadhaar numbers in databases with random surrogate tokens, storing the actual plaintext identities in a separate, isolated cryptographic vault.",
    explanation: "If Equifax had used tokenization, the 9,000 SQL queries dumped by the PLA hackers would have contained only meaningless random surrogate strings (e.g. `TOK_8941_9912`). Because the attackers did not have access to the hardware-isolated Token Vault, the stolen database dump would have been completely useless.",
    hint: "Replacing sensitive personal numbers with meaningless random tokens so stolen database dumps are useless.",
    level: "Expert",
    codeExample: `// Tokenization Architecture:
// Cleartext SSN: 123-45-6789 ---> [Hardware Crypto Vault] ---> Stored DB Token: TOK_a891f9b3
// Hacker dumps 9,000 SQL tables → Obtains only meaningless tokens with zero PII value!`
  },
  {
    id: 10,
    question: "What is the ultimate takeaway from the Equifax breach for modern enterprise cybersecurity leadership?",
    shortAnswer: "Cybersecurity is fundamentally an asset governance and architectural discipline: You cannot protect what you do not know you have, and a single expired certificate or flat network can turn a routine patch into a multi-thousand-crore catastrophe.",
    explanation: "Equifax had firewalls, security policies, and incident response teams. It was brought down by basic hygiene failures: not knowing where Struts was installed, allowing an SSL certificate to expire, storing database passwords in plaintext, and failing to segment internal networks.",
    hint: "Asset inventory, automated certificate management, database segmentation, and defense-in-depth.",
    level: "Moderate",
    codeExample: `// The Equifax Governance Rule:
// Asset Visibility (SBOM) + Automated Certificate Renewal + Database Micro-segmentation = Immune Enterprise`
  }
];

export default questions;
