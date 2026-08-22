const questions = [
  {
    question: "What are the 3 core pillars of Technical Information Security Auditing under ISO/IEC 27001:2022?",
    shortAnswer: "1. Audit Log Review & SIEM Telemetry (Control A.8.15); 2. System Configuration Audits & CIS Hardening (Control A.8.9); 3. User Access Reviews (UAR) & Privilege Management (Control A.5.15 & A.5.18).",
    explanation: "Technical auditing validates operational reality: 1. Log Review verifies that all critical security events are recorded and monitored; 2. Configuration Audits verify that operating systems, cloud VPCs, and databases match hardened security baselines (CIS Benchmarks); 3. Access Reviews verify that only authorized employees possess minimal necessary privileges (Least Privilege).",
    hint: "1. Logs (What happened), 2. Configs (How it is built), 3. Access (Who can enter).",
    level: "basic",
    codeExample: `// 3 Pillars of Technical Auditing:
1. Log Review:    Inspect AWS CloudTrail & SIEM for 100% auth & escalation telemetry (A.8.15)
2. Config Audit:  Audit EC2 & Kubernetes against CIS Level 1 Hardening Benchmark (A.8.9)
3. Access Review: Quarterly reconciliation of Active Directory & AWS IAM user roles (A.5.15)`
  },
  {
    question: "What specific security events MUST mandatorily be recorded in audit logs under ISO 27001 Control A.8.15?",
    shortAnswer: "1. Successful and failed user authentications; 2. Administrative privilege escalations (`sudo`, `su`, IAM role assumes); 3. System security configuration changes; 4. Access to sensitive citizen PII/financial data; 5. Security alerts and firewall blocks.",
    explanation: "Under Control A.8.15, logs must capture sufficient forensic detail to reconstruct any security incident. Each log entry must record: exact UTC timestamp, user identity, event description, source IP address, target asset, and success/failure outcome.",
    hint: "Logins, admin escalations, config edits, sensitive data reads, and firewall alerts.",
    level: "basic",
    codeExample: `// Mandatory Audit Log Event Schema (JSON):
{
  "timestamp": "2026-08-23T02:45:10Z",
  "userId": "mamata@payshield.in",
  "event": "IAM_POLICY_MODIFIED",
  "sourceIp": "103.21.124.5",
  "action": "AttachRolePolicy",
  "targetResource": "Role-Payment-Admin",
  "status": "SUCCESS"
}`
  },
  {
    question: "What is a 'CIS Benchmark' (Center for Internet Security), and how is it used in configuration auditing?",
    shortAnswer: "A globally recognized, consensus-based technical configuration hardening guideline providing step-by-step audit checks and remediation commands to secure operating systems, cloud platforms, and network devices.",
    explanation: "Instead of guessing whether an Ubuntu server or AWS account is secure, auditors evaluate configurations against CIS Benchmarks (e.g. CIS Ubuntu Linux 22.04 LTS Benchmark). The benchmark specifies exact settings (such as disabling SSH root logins, enabling core dump restrictions, and configuring PAM password complexity).",
    hint: "Standardized technical checklists for hardening Linux, Windows, AWS, and databases.",
    level: "basic",
    codeExample: `// CIS Benchmark Audit Check (CIS 5.2.10):
# Audit Command:
$ grep "^PermitRootLogin" /etc/ssh/sshd_config
PermitRootLogin no    # PASS: Complies with CIS Level 1 Benchmark!
PermitRootLogin yes   # FAIL: Major Non-Conformity (Root SSH enabled)`
  },
  {
    question: "What is a 'Periodic User Access Review' (UAR), and what is its standard enterprise frequency?",
    shortAnswer: "A formal, documented re-certification process where business managers review and re-authorize the active access rights of all employees and third-party contractors; conducted at least Quarterly (every 90 days) for privileged access.",
    explanation: "Over time, employees change roles, take on temporary permissions, or leave the company, causing 'privilege creep'. During a quarterly UAR, department heads inspect every assigned IAM role, database account, and VPN profile, immediately revoking unnecessary permissions to maintain the Principle of Least Privilege.",
    hint: "Quarterly re-checking of who has access to what, removing unused or dangerous permissions.",
    level: "basic",
    codeExample: `// User Access Review (UAR) Workflow:
1. Export Active Directory & AWS IAM user access matrix on 1st of every quarter.
2. Manager reviews list: Mamata approves DevOps role, REVOKES database access for transferred engineer.
3. CISO signs off on finalized User Access Certification Docket.`
  },
  {
    question: "What is an 'Orphaned' or 'Dormant Account', and why is it a critical audit finding?",
    shortAnswer: "An active user or service account that belongs to a terminated employee, inactive contractor, or decommissioned application; represents an unmonitored backdoor easily exploited by attackers.",
    explanation: "If an employee leaves the company but their VPN or database account is not deactivated within 24 hours, the account becomes orphaned. Attackers frequently seek out dormant accounts because their activity rarely triggers alarm bells. Auditors sample HR termination rosters against active directory logs to detect un-revoked accounts.",
    hint: "Active accounts belonging to employees who already left the company.",
    level: "basic",
    codeExample: `// Dormant Account Audit Query:
$ aws iam get-credential-report | awk -F',' '$5 > 90 {print $1, "DORMANT > 90 DAYS"}'
contractor_dev04 DORMANT > 90 DAYS  # ACTION: Immediate Revocation + Minor NC issued!`
  },
  {
    question: "What is the Principle of Least Privilege (PoLP) and Separation of Duties (SoD) in access audits?",
    shortAnswer: "PoLP: Users receive only the minimum permissions necessary to perform their job; SoD: Dividing critical tasks among multiple people to prevent fraud or unilateral unauthorized system modifications.",
    explanation: "Under ISO 27001 Control A.5.15 and A.5.3, no single engineer should have permission to both write application code AND approve payment fund transfers. Auditors verify SoD by auditing IAM policy matrices to confirm that developers cannot deploy directly to production without peer review and independent deployment authority.",
    hint: "Least Privilege = Minimum needed access; Separation of Duties = No single person controls everything.",
    level: "moderate",
    codeExample: `// Separation of Duties (SoD) Conflict:
Developer:    Mamata can commit code to GitHub repository.
Deployer:     Automated CI/CD bot deploys container image.
Approver:     Security Lead Mahima must sign deployment gate.
SoD Rule:     Mamata CANNOT approve her own deployment gate!`
  },
  {
    question: "What is 'Privileged Access Management' (PAM) and 'Just-In-Time' (JIT) access elevation?",
    shortAnswer: "PAM secures and monitors superuser accounts (root/admin); JIT elevation grants temporary, time-bound elevated privileges for specific maintenance tasks, automatically revoking them upon task completion.",
    explanation: "Allowing engineers to operate with permanent `root` or `Administrator` access is a severe audit risk. Modern PAM systems (e.g. CyberArk, Teleport, AWS IAM Identity Center) require engineers to request temporary 2-hour access with dual-manager approval, recording the entire terminal session for audit review.",
    hint: "Giving admin rights only for 1-2 hours when needed, then automatically taking them away.",
    level: "moderate",
    codeExample: `// Just-In-Time (JIT) PAM Session:
$ tsh login --request-roles=db-admin --request-reason="Emergency DB index rebuild"
[Approved by Mahima] ➔ Session active for 120 minutes.
All SQL queries recorded to immutable audit log. Session auto-terminated at 120m.`
  },
  {
    question: "Under the CERT-In Directions 2022, how does technical log review tie into mandatory incident reporting?",
    shortAnswer: "Organizations must continuously review and monitor ICT logs to detect cyber incidents, and mandatorily report specified cyber security incidents to CERT-In within 6 hours of noticing.",
    explanation: "Under Indian cyber directions, failure to monitor logs is not an acceptable legal excuse for missing a breach. Security teams must maintain SIEM telemetry and automated alerting rules to ensure that ransomware, unauthorized admin logins, or data leaks are flagged and reported to CERT-In within the statutory 6-hour window.",
    hint: "Log monitoring must detect breaches quickly so you can notify CERT-In within 6 hours.",
    level: "moderate",
    codeExample: `// CERT-In 6-Hour Incident Notification Rule:
02:00 UTC: SIEM triggers SEV-1 alert (Unauthorized root SSH brute force detected)
02:15 UTC: SOC Team confirms breach of staging database
07:30 UTC: Official Cyber Incident Report submitted to CERT-In (Within 6 Hours!)`
  },
  {
    question: "How do automated Infrastructure-as-Code (IaC) linters prevent 'Configuration Drift' during system audits?",
    shortAnswer: "Tools like Checkov, tfsec, and AWS Config continuously compare deployed cloud infrastructure against approved hardened templates, blocking or auto-remediating any unauthorized manual configuration changes.",
    explanation: "Configuration drift occurs when an engineer manually opens a firewall port or disables encryption in the AWS console without updating the Terraform codebase. IaC linters embedded in CI/CD pipelines detect these drifts automatically, ensuring 100% compliance with ISO 27001 Control A.8.9.",
    hint: "Tools that automatically detect if someone changed a server configuration without permission.",
    level: "basic",
    codeExample: `// Terraform IaC Security Linter (Checkov/tfsec):
$ tfsec ./terraform/
[FAIL] AWS018: S3 Bucket missing KMS Server-Side Encryption
Action: Build halted! Pull request blocked until encryption parameter is added.`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8, what are the access review obligations for Significant Data Fiduciaries?",
    shortAnswer: "Significant Data Fiduciaries must maintain strict role-based access control (RBAC), enforce MFA for all employee access to personal data, and conduct regular access audits to prevent unauthorized data leaks.",
    explanation: "Section 8(5) requires Data Fiduciaries to implement reasonable technical safeguards. An access review audit must verify that only authorized employees with specific business justifications can query citizen data, and that all data queries are logged and reviewed to protect personal data from insider exfiltration.",
    hint: "DPDP Act Section 8 requires tight RBAC, MFA, and access reviews on personal citizen data.",
    level: "basic",
    codeExample: `// DPDP Access Review Audit Check:
Asset:     80,000 Oncology Patient Biopsy Records in Ichapur Hospital
Audit:     Reconcile 45 doctor & nurse accounts against Active Directory RBAC
Finding:   2 resigned research interns still possessed active read access!
Action:    Immediate deactivation + Non-Conformity Notice logged.`
  },
  {
    question: "How does Reserve Bank of India (RBI) Cyber Security Guidelines enforce Privileged Account Audits in Banking?",
    shortAnswer: "RBI mandates that all privileged administrator activities on payment switches, core banking databases, and firewalls must be logged, subjected to dual-authorization (maker-checker), and reviewed daily by the SOC team.",
    explanation: "In banking infrastructure, single-admin access without oversight is prohibited. Under RBI Master Directions, any privileged root command or database schema change requires dual-key authorization (maker-checker) and must be reviewed by the CISO's independent monitoring team within 24 hours.",
    hint: "Banks in India must enforce maker-checker dual controls and daily reviews on admin activities.",
    level: "moderate",
    codeExample: `// RBI Maker-Checker Banking Control:
Maker (DBA):     Proposes database table schema change on UPI payment database.
Checker (CISO):  Reviews and cryptographically signs change request.
Execution:       Privileged command executes with full audit trail recorded in SIEM.`
  },
  {
    question: "What is 'File Integrity Monitoring' (FIM), and how does an auditor test it on critical servers?",
    shortAnswer: "A security control that monitors and alerts on unauthorized changes to critical system files, binaries, and configurations (e.g. `/etc/passwd`, `/etc/shadow`, Windows System32) using cryptographic hashing (e.g. Wazuh, OSSEC, Tripwire).",
    explanation: "Auditors test FIM by making a benign test modification to a monitored file (or reviewing FIM alert logs) to verify that the monitoring agent detected the hash change, generated a SEV-1 alert in the SIEM, and notified the security team within seconds.",
    hint: "Monitoring tools that alert whenever a critical system file or password file is altered.",
    level: "basic",
    codeExample: `// Wazuh File Integrity Monitoring (FIM) Rule:
<syscheck>
  <directories check_all="yes" realtime="yes">/etc,/usr/bin,/usr/sbin</directories>
</syscheck>
# Alert generated if SHA-256 hash of /etc/ssh/sshd_config changes!`
  },
  {
    question: "Synthesizing Log Review, Configuration Audits, and Access Review: what is the master equation of Technical Control Defense?",
    shortAnswer: "$$\\text{Technical Defense Posture} = \\frac{\\text{SIEM Telemetry Coverage} \\times \\text{CIS Hardening Rate} \\times \\text{Quarterly UAR Recertification}}{\\text{Un-monitored Admin Actions} + \\text{Dormant Orphaned Accounts}} \\ge 1.0$$ with continuous ISO 27001 and DPDP Act validation.",
    explanation: "This master technical relationship proves that an Information Security Management System maintains absolute technical integrity when 100% of critical security events are logged, all system baselines meet CIS benchmarks, and all user privileges are recertified quarterly. Eliminating unmonitored admin actions and dormant accounts guarantees total regulatory compliance and statutory safe harbor.",
    hint: "Conclude by reviewing how SIEM log reviews, CIS benchmarks, and quarterly access reviews eliminate dormant accounts.",
    level: "expert",
    codeExample: `// Master Equation of Technical Auditing:
Defense = (SIEM_Telemetry_Rigor * CIS_Hardening_Rate * UAR_Recertification) / (Unmonitored_Actions + Dormant_Accounts);
Condition: Dormant_Accounts == 0 && CIS_Failures == 0;
Outcome:   100% ISO 27001 Control A.8.9 & A.8.15 Conformance and Total Regulatory Safe Harbor!`
  }
];

export default questions;
