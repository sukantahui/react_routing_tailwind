const questions = [
  {
    question: "What is Third-Party and Supply Chain Risk Management (TPRM) under ISO/IEC 27001:2022 Control A.5.19 and ISO 27036?",
    shortAnswer: "The governance process of identifying, evaluating, mitigating, and monitoring cybersecurity risks introduced by external vendors, suppliers, cloud service providers, and open-source software libraries.",
    explanation: "Modern enterprises rely heavily on third parties for software, cloud hosting, payment gateways, and IT maintenance. Control A.5.19 mandates that organizations establish formal security requirements for suppliers, ensuring that a vulnerability in a third party's infrastructure does not compromise the host enterprise.",
    hint: "Managing the security risks of external vendors and suppliers who connect to your systems.",
    level: "basic",
    codeExample: `// Third-Party Risk Ecosystem:
Enterprise (Host) ➔ Cloud Provider (AWS) ➔ Payment API (Razorpay) ➔ Open-Source Library (Log4j)
A vulnerability at ANY third-party level compromises the entire chain!`
  },
  {
    question: "Why do attackers increasingly target the Software Supply Chain rather than attacking enterprise perimeters directly?",
    shortAnswer: "Because enterprise perimeters are heavily fortified with firewalls and EDR, whereas supply chain vendors and open-source packages are trusted, code-signed, and have pre-authenticated access inside target networks.",
    explanation: "Supply chain attacks (like SolarWinds or Codecov) offer massive asymmetric leverage to hackers: by compromising a single software vendor or open-source repository, attackers automatically gain legitimate, trusted backdoor access into thousands of enterprise customer networks simultaneously without triggering perimeter alarms.",
    hint: "Hackers target the weaker supplier to gain pre-authenticated access to the main fortress.",
    level: "moderate",
    codeExample: `// Supply Chain Leverage Model:
Target: 1,000 Global Banks
Direct Attack: Attack 1,000 individual fortified bank firewalls (Very Difficult)
Supply Chain:  Compromise 1 common banking software vendor update server (1 Hack = 1,000 Breaches!)`
  },
  {
    question: "What is a Software Bill of Materials (SBOM), and what are the two globally recognized formats (CycloneDX & SPDX)?",
    shortAnswer: "An SBOM is a formal, machine-readable inventory of all software components, direct and transitive dependencies, libraries, and licenses used in an application; formatted primarily in CycloneDX (OWASP) or SPDX (Linux Foundation).",
    explanation: "When a critical vulnerability like Log4j (CVE-2021-44228) is disclosed, organizations without an SBOM spend weeks manually searching codebases. An SBOM acts as a comprehensive 'ingredient list' for software, allowing automated security scanners to immediately locate every instance of a vulnerable library in seconds.",
    hint: "An ingredient list for software that shows every library and sub-library used in your code.",
    level: "basic",
    codeExample: `// CycloneDX SBOM Snippet (JSON):
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "components": [
    {
      "name": "log4j-core",
      "version": "2.14.1",
      "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
      "cve": "CVE-2021-44228 (CRITICAL - CVSS 9.8)"
    }
  ]
}`
  },
  {
    question: "What is the difference between a Direct Dependency and a Transitive (Indirect) Dependency in open-source software?",
    shortAnswer: "A Direct Dependency is a library explicitly imported in `package.json` or `pom.xml`; a Transitive Dependency is a secondary library required by the direct library, creating hidden nested supply chain risks.",
    explanation: "If a developer imports 10 direct npm libraries, those 10 packages might pull in 400 transitive dependencies behind the scenes. Vulnerabilities frequently hide in these deep, unmonitored transitive dependencies (e.g. an unmaintained string-formatting library nested 4 levels deep).",
    hint: "Direct = What you imported; Transitive = What your imported library secretly imported.",
    level: "basic",
    codeExample: `// Dependency Hierarchy:
package.json ➔ express (Direct) ➔ body-parser (Direct) ➔ bytes (Transitive - Hidden Supply Chain Risk!)`
  },
  {
    question: "What are the 3 Vendor Risk Tiers (Tier 1 Critical, Tier 2 High, Tier 3 Medium), and how are they classified?",
    shortAnswer: "Tier 1 (Critical: Direct access to production PII, core payment APIs, or network VPN); Tier 2 (High: Access to confidential business data or staging systems); Tier 3 (Commodity: No sensitive data access, e.g. marketing SaaS).",
    explanation: "Organizations must prioritize vendor due diligence based on risk: 1. Tier 1 Critical vendors require mandatory annual SOC 2 Type II audits, ISO 27001 certificates, third-party penetration test reports, and 24-hour breach notification SLAs; 2. Tier 3 Commodity vendors only require standard security questionnaires.",
    hint: "Tier 1 has keys to your crown jewels; Tier 3 has no access to sensitive data.",
    level: "basic",
    codeExample: `// Vendor Risk Tiering:
Tier 1 (Critical): Cloud Hosting Provider (AWS / GCP) ➔ Production PII & Database Access
Tier 2 (High):     External Payroll Software ➔ Employee Salary & Banking Details
Tier 3 (Medium):   Corporate T-Shirt Printing Vendor ➔ Zero Data Access`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8(2), why is the Data Fiduciary strictly liable for breaches caused by a third-party Data Processor?",
    shortAnswer: "Because the law establishes strict vicarious liability: the Data Fiduciary cannot delegate its legal accountability; if an external cloud vendor or IT vendor leaks citizen data, the Data Fiduciary faces up to ₹250 Crore Section 33 fines.",
    explanation: "Under Section 8(2) of the DPDP Act 2023, a Data Fiduciary may engage a Data Processor (third-party vendor) to process personal data only under a valid contract. However, if that vendor suffers a breach due to unpatched systems, the Data Protection Board of India holds the primary Data Fiduciary 100% accountable for failing to enforce adequate vendor governance.",
    hint: "You can outsource the processing work, but you cannot outsource legal liability.",
    level: "moderate",
    codeExample: `// DPDP Third-Party Liability Case:
Hospital engages third-party Cloud PACS Vendor ➔ Vendor leaves AWS S3 bucket public ➔
100,000 Oncology Scans leaked ➔ DPBI imposes ₹250 Crore fine directly on the HOSPITAL!`
  },
  {
    question: "What are the mandatory clauses required in a Third-Party Security Addendum / Data Processing Agreement (DPA)?",
    shortAnswer: "1. Right-to-Audit clause; 2. Mandatory 24-Hour Breach Notification SLA; 3. Encryption in transit & at rest; 4. Restrictions on Sub-processors; 5. Data Return / NIST SP 800-88 Destruction upon termination; 6. Legal Indemnification.",
    explanation: "Contracts are the legal armor of TPRM. Under ISO 27001 Control A.5.20, every vendor contract must contain: 1. Right to conduct on-site or third-party audits; 2. Strict 24-hour incident notification SLA to satisfy CERT-In; 3. Explicit ban on engaging unapproved sub-contractors; 4. Secure crypto-shredding certificate upon offboarding.",
    hint: "Audits, 24h breach alerts, encryption, sub-processor limits, data shredding, and indemnity.",
    level: "moderate",
    codeExample: `// Master Security Addendum Clauses:
Clause 4.1 (Breach SLA):  Vendor must notify Customer within 24 hours of any suspected security incident.
Clause 7.2 (Audit Right): Customer retains the right to conduct annual independent third-party audits.
Clause 9.1 (Data Return): All customer PII must be crypto-shredded (NIST 800-88) within 15 days of offboarding.`
  },
  {
    question: "How does Reserve Bank of India (RBI) Master Directions on IT Outsourcing govern third-party vendor relationships?",
    shortAnswer: "RBI prohibits the outsourcing of core management functions, mandates Indian data residency for payment data, enforces direct regulatory audit access over vendors, and requires operational business continuity testing.",
    explanation: "For banks and FinTechs in India, RBI rules are strict: 1. Core management and decision-making can never be outsourced; 2. All payment data must be stored exclusively on servers located within India; 3. Vendor contracts must grant RBI inspectors the unconditional right to audit the vendor's data centers; 4. Mandatory annual disaster recovery switchover tests.",
    hint: "No outsourcing core banking, data must stay in India, and RBI has direct audit rights over vendors.",
    level: "moderate",
    codeExample: `// RBI Outsourcing Mandates:
Data Residency: 100% of end-to-end UPI transaction data stored exclusively within Indian borders
Audit Clause:   RBI inspectors must have direct physical access to third-party data centers in Mumbai/Bengaluru`
  },
  {
    question: "What is 'Dependency Confusion' (or Namespace Hijacking), and how do attackers exploit it in enterprise build pipelines?",
    shortAnswer: "An attack where an adversary registers a public malicious package (on npm/PyPI) using the identical name of an internal private enterprise package with a higher version number, tricking build pipelines into downloading the malicious public code.",
    explanation: "Large enterprises write internal packages like `@myfintech/auth-tokens`. If the package manager is misconfigured, an attacker uploads a public package named `myfintech-auth-tokens` with version `99.0.0` to npm. When CI/CD runs `npm install`, it fetches the higher version from the public registry, executing attacker malware inside the production build environment.",
    hint: "Tricking the compiler into downloading a malicious public library instead of your private internal one.",
    level: "expert",
    codeExample: `// Dependency Confusion Exploit:
Internal Private Library: @kolkatafintech/payment-core (v1.2.0)
Public Malicious npm:     kolkatafintech-payment-core (v99.0.0 - Contains reverse shell)
Build Pipeline Error:     Downloads v99.0.0 from npm ➔ CI/CD Server Breached!`
  },
  {
    question: "What is Software Composition Analysis (SCA), and how is it integrated into DevSecOps CI/CD pipelines?",
    shortAnswer: "SCA tools (e.g. Snyk, OWASP Dependency-Check, Black Duck) automatically scan source code repositories and container images to identify vulnerable open-source libraries and license compliance violations before deployment.",
    explanation: "Rather than waiting for manual audits, SCA is automated within GitHub Actions or GitLab CI. On every pull request, the SCA scanner parses `package-lock.json` or `pom.xml`, queries the National Vulnerability Database (NVD), and automatically blocks the build if any library contains a Critical CVE with CVSS >= 9.0.",
    hint: "Automated scanners that check open-source packages for known vulnerabilities during code builds.",
    level: "basic",
    codeExample: `// GitHub Actions SCA Pipeline Step:
- name: Run Snyk SCA Dependency Scan
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high --fail-on-issues`
  },
  {
    question: "What are the key steps in the Secure Vendor Offboarding Lifecycle under ISO 27001 Control A.5.22?",
    shortAnswer: "1. Immediate revocation of all SSO/OAuth tokens, API keys, and VPN access; 2. Retrieval or crypto-shredding of all enterprise data; 3. Verification of formal Data Destruction Certificate; 4. Final contract settlement and NDA reaffirmation.",
    explanation: "Many massive breaches occur through 'orphaned' vendor connections that were never revoked after contract termination. Control A.5.22 requires an automated offboarding checklist: within 1 hour of contract end, IAM teams purge vendor service accounts, delete shared S3 access, and obtain a signed NIST SP 800-88 Data Destruction Certificate.",
    hint: "Kill the logins, delete the API keys, wipe the data, and get a signed destruction certificate.",
    level: "basic",
    codeExample: `// Vendor Offboarding Checklist (Control A.5.22):
Step 1: Revoke AWS IAM Role ` + "`Role-ThirdPartyVendor-Analytics`" + ` (< 1 Hour)
Step 2: Rotate all database connection strings and REST API keys
Step 3: Ingest NIST 800-88 Data Destruction Certificate from Vendor CISO
Step 4: Update GRC Risk Register status to 'DECOMMISSIONED'`
  },
  {
    question: "How does Code Signing and Cryptographic Provenance (e.g. Sigstore, Cosign) protect against supply chain tampering?",
    shortAnswer: "By digitally signing software artifacts, container images, and release binaries with cryptographic keys, guaranteeing that the code has not been tampered with or modified by an attacker between compile time and production runtime.",
    explanation: "Even if an attacker gains access to a software mirror, they cannot forge a valid cryptographic digital signature. When Kubernetes deploys a container, admission controllers (like Kyverno) verify the Cosign signature against the vendor's public key; unsigned or modified binaries are rejected immediately.",
    hint: "Digital wax seals that prove code came directly from the trusted author without tampering.",
    level: "expert",
    codeExample: `// Cosign Container Image Verification:
$ cosign verify --key cosign.pub registry.kolkatafintech.in/payment-switch:v2.4.0
Output: "The following checks were verified: Signature Validated (Author: Mamata, Status: VERIFIED)"`
  },
  {
    question: "Synthesizing Third-Party and Supply Chain Risk Management: what is the master equation of Supply Chain Resilience?",
    shortAnswer: "$$\\text{Supply Chain Immunity} = \\frac{\\text{SBOM Coverage (100\\%)} \\times \\text{SCA Automated Pipeline Interception} \\times \\text{Tier 1 DPA Rigor}}{\\text{Un-monitored Transitive Libraries} + \\text{Orphaned Vendor Access}} \\ge 1.0$$ with continuous ISO 27001 Control A.5.19-A.5.22 verification.",
    explanation: "This master governance relationship proves that an organization achieves total supply chain resilience when 100% of open-source dependencies are cataloged in machine-readable SBOMs, automated SCA pipelines block vulnerable commits, and stringent contractual DPAs govern all external processors. Eliminating unmonitored transitive packages and orphaned access guarantees absolute audit defensibility and total statutory safe harbor.",
    hint: "Conclude by reviewing how 100% SBOM visibility, SCA automation, and DPA contracts eliminate supply chain blind spots.",
    level: "expert",
    codeExample: `// Master Equation of Supply Chain Governance:
Immunity = (SBOM_Coverage * SCA_Block_Velocity * DPA_Enforcement) / (Transitive_Flaws + Orphaned_Logins);
Condition: Immunity >= 1.0 (Zero Untracked Vendor Dependencies);
Outcome:   100% Supply Chain Defensibility, Zero Log4j-Style Exploits & Total Regulatory Safe Harbor!`
  }
];

export default questions;
