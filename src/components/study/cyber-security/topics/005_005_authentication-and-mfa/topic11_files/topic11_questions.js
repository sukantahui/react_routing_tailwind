const questions = [
  {
    id: 1,
    question: "What are the four core pillars of an enterprise Identity and Access Management (IAM) program?",
    shortAnswer: "1. Authentication (verifying identity via FIDO2/MFA); 2. Authorization (enforcing RBAC/ABAC permissions); 3. Identity Governance and Administration - IGA (JML lifecycle and access reviews); 4. Privileged Access Management - PAM (securing administrative credentials and JIT elevation).",
    explanation: "These four pillars work synergistically to establish a Zero Trust identity perimeter.",
    hint: "Authentication, Authorization, IGA (Governance), and PAM (Privileged Access).",
    level: "Basic",
    codeExample: `// IAM Architecture Pillars:
// [IAM Framework] ➔ { Authentication (MFA), Authorization (ABAC), IGA (JML Lifecycle), PAM (JIT Elevation) }`
  },
  {
    id: 2,
    question: "What is the primary difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC - NIST SP 800-162)?",
    shortAnswer: "RBAC grants permissions based statically on assigned user roles (e.g., 'Accountant'). ABAC evaluates dynamic contextual attributes across Subject (role, department), Resource (classification, value in ₹), Action (approve, read), and Environment (IP subnet, time of day, device posture).",
    explanation: "ABAC solves the 'Role Explosion' problem of RBAC by allowing fine-grained contextual policy rules.",
    hint: "RBAC uses static job roles; ABAC evaluates dynamic context (subject, resource, action, environment).",
    level: "Basic",
    codeExample: `// ABAC Policy Rule:
// Permit if: Subject.dept == 'Finance' && Resource.amount <= 500000 && Env.location == 'Barrackpore_HQ' && Env.time == 'WorkingHours'`
  },
  {
    id: 3,
    question: "What is Role Explosion in legacy RBAC and how does ABAC eliminate it?",
    shortAnswer: "Role Explosion occurs when an enterprise creates thousands of hyper-specific roles (e.g., 'Finance_Officer_NightShift_Kolkata_Under50K') to handle minor permission variations, creating an unmanageable governance nightmare. ABAC replaces thousands of static roles with a few dynamic attribute rules.",
    explanation: "In an enterprise of 10,000 users, ABAC reduces 5,000 custom roles down to 20 core roles with contextual policies.",
    hint: "Creating thousands of custom roles for minor variations; eliminated by dynamic attribute policies.",
    level: "Moderate",
    codeExample: `// Role Explosion vs ABAC:
// RBAC: 5,000 discrete roles (e.g., 'Manager_Branch_14_Kolkata_Junior')
// ABAC: 1 role ('Manager') + Attribute checks: [Branch == user.branch, Limit <= 100000]`
  },
  {
    id: 4,
    question: "What is the Joiner-Mover-Leaver (JML) identity lifecycle and why is the 'Mover' phase the most vulnerable to Privilege Creep?",
    shortAnswer: "Joiner: Automated birthright provisioning. Mover: Re-aligning access when an employee transfers departments. Leaver: Immediate de-provisioning upon resignation. The 'Mover' phase causes Privilege Creep because IT often assigns new permissions for the new role without revoking permissions from the old role.",
    explanation: "Over years, long-tenured employees accumulate excessive cumulative permissions across multiple departments.",
    hint: "Mover phase often adds new permissions without revoking old ones, leading to privilege creep.",
    level: "Moderate",
    codeExample: `// Privilege Creep Scenario:
// Year 1: Susmita is Helpdesk (Has AD Reset rights)
// Year 3: Susmita moves to Finance (Gets ERP Approval rights, but AD rights never revoked!)
// Result: Toxic accumulation of excessive privileges ❌`
  },
  {
    id: 5,
    question: "What is System for Cross-domain Identity Management (SCIM 2.0 - RFC 7644) and how does it automate JML provisioning?",
    shortAnswer: "SCIM 2.0 is a standardized REST/JSON protocol for synchronizing user identities between identity providers (Okta, Entra ID) and downstream SaaS applications (Salesforce, AWS, Google Workspace). When an employee is created or deleted in HR, SCIM automatically provisions/deprovisions them across all connected apps.",
    explanation: "SCIM eliminates manual account creation and ensures immediate de-provisioning within seconds.",
    hint: "Standardized REST API for automatically provisioning and de-provisioning users across SaaS apps.",
    level: "Moderate",
    codeExample: `// SCIM 2.0 User Creation Request:
// POST /Users HTTP/1.1
// Host: example.com/scim/v2
// { "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"], "userName": "susmita@bank.in", "active": true }`
  },
  {
    id: 6,
    question: "What is Zero Standing Privileges (ZSP) in modern Privileged Access Management (PAM)?",
    shortAnswer: "ZSP mandates that no administrative accounts (e.g., Domain Admin, Root) exist with permanent active permissions. All administrative privileges are held at ZERO by default and granted only Just-In-Time (JIT) for a temporary duration upon explicit justification and approval.",
    explanation: "If an adversary compromises a developer's credentials, they find zero permanent admin rights to exploit.",
    hint: "Zero permanent admin rights; privileges granted temporarily only when needed for specific tasks.",
    level: "Basic",
    codeExample: `// Zero Standing Privileges (ZSP):
// Engineer baseline permissions : Standard User (0 Admin rights)
// When server needs maintenance : Requests 45-min JIT elevation ➔ Automatically revoked at minute 46 ✔`
  },
  {
    id: 7,
    question: "What is Just-In-Time (JIT) Privilege Elevation in PAM solutions (e.g., CyberArk / HashiCorp Boundary)?",
    shortAnswer: "JIT temporarily elevates an engineer's access to an administrative role or provisions an ephemeral, short-lived credential (e.g., a 30-minute SSH certificate) tied to a specific change ticket. Once the task is completed or time expires, privileges are automatically revoked.",
    explanation: "JIT eliminates standing administrative attack surfaces.",
    hint: "Temporary elevation of administrative rights for a fixed time window tied to a change ticket.",
    level: "Moderate",
    codeExample: `// JIT Elevation Workflow:
// Ticket #4018 Approved -> Issues 30-min Ephemeral SSH Certificate -> Access automatically expires at 15:30 IST.`
  },
  {
    id: 8,
    question: "What is Separation of Duties (SoD) / Toxic Combinations in identity governance?",
    shortAnswer: "SoD is a risk management principle that prevents single individuals from possessing conflicting permissions that could enable fraud or bypass controls. A Toxic Combination is the co-existence of two incompatible roles (e.g., 'Invoice Creator' and 'Invoice Approver').",
    explanation: "SoD enforces Maker-Checker workflows, requiring at least two distinct individuals to authorize sensitive transactions.",
    hint: "Preventing a single user from having conflicting permissions (e.g., creating and approving payments).",
    level: "Basic",
    codeExample: `// Toxic Combination Violation:
// IF User.hasRole('PAYMENT_CREATOR') AND User.hasRole('PAYMENT_APPROVER')
// ➔ ALERT: "Maker-Checker SoD Violation Blocked! 🚨"`
  },
  {
    id: 9,
    question: "What is an Orphan Account and why is it a primary vector in corporate ransomware breaches?",
    shortAnswer: "An Orphan Account is an active user account belonging to a departed employee, former contractor, or decommissioned service that was never de-provisioned. Because nobody monitors these dormant accounts, attackers use compromised credentials on orphan accounts to establish persistent, undetected footholds.",
    explanation: "Automated IGA de-provisioning via SCIM 2.0 eliminates orphan accounts immediately upon HR termination.",
    hint: "Active accounts belonging to former employees or contractors that were never de-provisioned.",
    level: "Basic",
    codeExample: `// Orphan Account Threat:
// Contractor departs in 2024 -> VPN account remains active -> Attacker buys VPN credentials on dark web in 2026 -> Undetected breach! 🚨`
  },
  {
    id: 10,
    question: "What is Privileged Session Recording and Keystroke Logging in enterprise PAM?",
    shortAnswer: "PAM proxies intercept and record the full video and keystroke streams of administrative SSH, RDP, and database sessions. Every command executed by a root administrator is indexed for real-time threat monitoring and forensic audit compliance.",
    explanation: "Session recording ensures complete non-repudiation and deters rogue insider sabotage.",
    hint: "Video and keystroke recording of all administrative SSH and RDP sessions through PAM proxies.",
    level: "Moderate",
    codeExample: `// PAM Session Monitoring:
// Admin opens SSH to Core Database ➔ CyberArk records full terminal stream: "DROP TABLE users;" ➔ Triggers instant SOC alarm!`
  },
  {
    id: 11,
    question: "What is Dual-Custody Approval (Maker-Checker / Four-Eyes Principle) in high-value banking operations?",
    shortAnswer: "Dual-Custody requires two separate authorized individuals to complete a critical transaction: one person initiates or creates the transaction (Maker), and a second independent supervisor reviews and approves it (Checker).",
    explanation: "This eliminates single points of human failure, extortion, and rogue insider embezzlement.",
    hint: "Requires two separate people (Maker and Checker) to authorize critical high-value transactions.",
    level: "Basic",
    codeExample: `// Dual Custody Workflow:
// Step 1: Susmita (Maker) drafts transfer of ₹25,00,000.
// Step 2: Debangshu (Checker) receives notification and approves with FIDO2 key.
// Step 3: Bank core executes disbursement.`
  },
  {
    id: 12,
    question: "What is an Identity Access Review (User Access Certification) in ISO 27001 and SOC 2 audits?",
    shortAnswer: "A mandatory periodic governance process (conducted quarterly or bi-annually) where department managers inspect the complete list of permissions, roles, and group memberships held by their subordinates and formally certify whether each entitlement is still required or should be revoked.",
    explanation: "Access reviews systematically detect and prune accumulated privilege creep across the enterprise.",
    hint: "Periodic manager audit formally certifying and revoking unnecessary subordinate permissions.",
    level: "Moderate",
    codeExample: `// Access Certification Campaign:
// Manager receives list: [Susmita: ERP_Admin (Revoke?), Salesforce_Viewer (Approve?)] -> Manager clicks REVOKE on ERP_Admin.`
  },
  {
    id: 13,
    question: "What is Break-Glass (Emergency) Access in enterprise IAM?",
    shortAnswer: "A highly audited, emergency-only procedure that grants immediate root/super-admin access during catastrophic outages when standard SSO or PAM systems are offline. Break-glass accounts use physical safe storage for credentials and trigger immediate alarms to executive leadership when checked out.",
    explanation: "Break-glass accounts guarantee operational recovery while maintaining strict audit oversight.",
    hint: "Emergency root access stored in physical safes, used only during catastrophic system outages.",
    level: "Moderate",
    codeExample: `// Break-Glass Protocol:
// 1. Central SSO offline -> Director breaks physical safe seal for 'emergency_root' credentials.
// 2. Automated SMS/Email dispatches to CISO: "EMERGENCY BREAK-GLASS ACCOUNT CHECKED OUT 🚨"`
  },
  {
    id: 14,
    question: "What is Policy-Based Access Control (PBAC) using Open Policy Agent (OPA) and Rego?",
    shortAnswer: "PBAC decouples policy logic from application code by expressing access rules as declarative code (Rego language). Microservices query the central Open Policy Agent (OPA) daemon via JSON API requests, which evaluates the request against active policy code.",
    explanation: "Treating access policies as code (Policy-as-Code) enables automated unit testing, version control in Git, and centralized governance.",
    hint: "Treating access policies as declarative code using Open Policy Agent (OPA) and Rego.",
    level: "Expert",
    codeExample: `// OPA Rego Policy:
// default allow = false
// allow {
//     input.action == "read"
//     input.user.department == "Finance"
//     input.resource.amount <= 500000
// }`
  },
  {
    id: 15,
    question: "What is Machine Identity Management (Service Principals & API Keys) and how does it differ from Human IAM?",
    shortAnswer: "Human IAM manages interactive users (employees, customers). Machine IAM manages non-human identities (microservices, containers, CI/CD runners, IoT sensors, API keys, X.509 certificates). Machine identities outnumber human identities by 45:1 in modern cloud environments.",
    explanation: "Machine identities require automated certificate lifecycle management (ACME/Vault) and secret rotation to prevent hardcoded credential leaks.",
    hint: "Managing non-human identities like microservices, API keys, and certificates, which heavily outnumber humans.",
    level: "Moderate",
    codeExample: `// Machine Identity Ratio:
// 1,000 Employees (Human IAM) ➔ 45,000 Microservice Containers, API Keys, and Service Principals (Machine IAM)!`
  },
  {
    id: 16,
    question: "What is Dynamic Credential Generation in secrets management (e.g., HashiCorp Vault)?",
    shortAnswer: "Instead of sharing static database passwords, the application queries Vault, which generates a unique, temporary database user with an auto-expiring TTL (e.g., 15 minutes). When the TTL expires, Vault automatically drops the user from the database.",
    explanation: "Dynamic credentials eliminate hardcoded passwords in configuration files and eliminate credential reuse.",
    hint: "Generates unique, temporary database credentials on-demand that auto-delete after a few minutes.",
    level: "Expert",
    codeExample: `// Vault Dynamic Database Credential:
// App queries Vault -> Vault creates PostgreSQL user: 'v-app-usr-8f9a2' (TTL: 15m) -> Auto-dropped after 15 minutes ✔`
  },
  {
    id: 17,
    question: "What is Context-Aware (Adaptive) IAM in Zero Trust Architecture (NIST SP 800-207)?",
    shortAnswer: "An access control engine that calculates real-time risk scores for every authentication attempt based on user behavioral baselines, device health telemetry (CrowdStrike / Defender), geovelocity (impossible travel), and threat intelligence feeds, adjusting access requirements dynamically.",
    explanation: "Adaptive IAM replaces static binary allow/deny rules with dynamic risk-based policy execution.",
    hint: "Evaluates real-time risk from device health, location, and behavior to dynamically adjust access.",
    level: "Moderate",
    codeExample: `// Adaptive Policy:
// If Device_Health == 'Clean' AND IP == 'Office_HQ' ➔ Grant Access
// If Risk_Score > 75 (Impossible Travel) ➔ Force FIDO2 Step-Up + Block Sensitive Files`
  },
  {
    id: 18,
    question: "How does Directory Synchronization (e.g., Azure AD Connect / Entra Connect) synchronize on-premises Active Directory with cloud IDPs?",
    shortAnswer: "It queries on-premises Active Directory Domain Services (AD DS) via LDAP, hashes password hashes using Password Hash Synchronization (PHS) with 10,000 SHA-256 iterations, and uploads user objects and group memberships to the cloud tenant over encrypted HTTPS.",
    explanation: "Directory sync enables hybrid identity, allowing employees to use identical credentials across legacy on-prem and modern cloud SaaS apps.",
    hint: "Synchronizes on-premises Active Directory user accounts and password hashes to cloud identity providers.",
    level: "Moderate",
    codeExample: `// Hybrid Directory Sync:
// On-Premises AD DS (Barrackpore HQ) ➔ [Azure AD Connect Sync] ➔ Cloud Entra ID (Global SaaS)`
  },
  {
    id: 19,
    question: "What is Credential Stuffing detection in enterprise Identity Governance?",
    shortAnswer: "Enterprise IDPs monitor global threat intelligence databases (HaveIBeenPwned, dark web breach dumps) and detect automated botnet spray patterns (high volume of failed logins across diverse IP proxies), automatically locking accounts and forcing passkey resets.",
    explanation: "Automated credential defense protects employees who reuse corporate passwords on compromised personal websites.",
    hint: "Monitors dark web breach dumps and high-volume botnet login patterns to lock vulnerable accounts.",
    level: "Basic",
    codeExample: `// Identity Protection Rule:
// Corporate password matches leaked Dark Web dump ➔ Entra ID flags: "HIGH_RISK_USER" ➔ Forces passkey reset.`
  },
  {
    id: 20,
    question: "What is Identity Federation Trust Relationship and how is it managed across parent/subsidiary corporate entities?",
    shortAnswer: "A cryptographic trust relationship established between distinct Identity Providers (e.g., State Government IdP and Municipal Treasury IdP) using exchanged public X.509 certificates and OIDC client credentials, allowing users from entity A to access resources in entity B without creating duplicate local accounts.",
    explanation: "Cross-organization federation eliminates account duplication while preserving localized identity ownership.",
    hint: "Cryptographic trust allowing users in one organization to access resources in a partner organization.",
    level: "Moderate",
    codeExample: `// Cross-Org Federation:
// [State Treasury IdP (WB Gov)] <--- Trust Anchor ---> [Barrackpore Municipal Portal]`
  },
  {
    id: 21,
    question: "What is the principle of Least Privilege (PoLP) and how is it enforced across cloud IAM roles (AWS / Azure / GCP)?",
    shortAnswer: "Users, applications, and service accounts are granted ONLY the minimum necessary permissions required to execute their specific job function, and no more. Enforced via granular IAM policies with resource-level restrictions rather than broad wildcard permissions (`*`).",
    explanation: "Violating PoLP by granting wildcard admin rights (`s3:*`, `iam:*`) allows a single compromised API key to destroy cloud infrastructure.",
    hint: "Granting only the bare minimum permissions needed for a job; never using wildcard admin permissions.",
    level: "Basic",
    codeExample: `// Least Privilege AWS Policy:
// ALLOW action: "s3:GetObject" ONLY ON resource: "arn:aws:s3:::barrackpore-treasury-reports/*"`
  },
  {
    id: 22,
    question: "What is Pass-the-Hash (PtH) and Pass-the-Ticket (PtT) in Active Directory and how does PAM neutralize them?",
    shortAnswer: "PtH/PtT attacks steal NTLM password hashes or Kerberos tickets directly from LSASS memory on compromised endpoints to laterally move across the network without cracking plaintext passwords. PAM neutralizes this by enforcing Zero Standing Privileges, rotating passwords on checkout, and isolating admin logins to hardened Privileged Access Workstations (PAWs).",
    explanation: "Restricting domain admin logins strictly to PAWs prevents administrative hashes from ever entering vulnerable user workstations.",
    hint: "Stealing hashes/tickets from memory to move laterally; stopped by PAM, PAWs, and JIT elevation.",
    level: "Expert",
    codeExample: `// PtH Mitigation:
// Dedicated Privileged Access Workstation (PAW) + Credential Guard (Virtualization-Based Security VBS) protects LSASS.`
  },
  {
    id: 23,
    question: "What is Privileged Access Workstation (PAW) architecture in high-security government and defense infrastructure?",
    shortAnswer: "A hardened, dedicated physical laptop used EXCLUSIVELY for administrative tasks (SSH to servers, AD administration, cloud consoles). It has zero internet browsing, zero email access, strict application whitelisting, and no productivity software, isolating administrative credentials from phishing and web malware.",
    explanation: "Administrative tasks and daily email/web browsing are physically separated on distinct devices.",
    hint: "Hardened physical computer used exclusively for administrative tasks, with no email or web browsing.",
    level: "Expert",
    codeExample: `// PAW Tiering:
// Device A (Standard Laptop) : Email, Word, Web Browsing (No admin credentials)
// Device B (PAW Laptop)      : Air-Gapped SSH & Cloud Console Access ONLY (Hardened)`
  },
  {
    id: 24,
    question: "How does SCIM 2.0 handle user de-provisioning during employee termination?",
    shortAnswer: "The HR database marks the employee as terminated. The identity provider generates a SCIM `PATCH` or `DELETE` request setting `{'active': false}` to all registered downstream SaaS endpoints. The target applications immediately invalidate active sessions and block further logins.",
    explanation: "Automated SCIM de-provisioning guarantees complete account termination across 100+ cloud apps in under 30 seconds.",
    hint: "Sends automated PATCH requests setting active=false across all SaaS apps within seconds.",
    level: "Moderate",
    codeExample: `// SCIM De-Provisioning PATCH:
// PATCH /Users/usr_10482
// { "Operations": [{ "op": "replace", "path": "active", "value": false }] }`
  },
  {
    id: 25,
    question: "What is Identity Threat Detection and Response (ITDR) in modern SOC operations?",
    shortAnswer: "A specialized security category focused on protecting identity infrastructure (Active Directory, Okta, Entra ID) by detecting credential attacks, privilege escalation, Rogue IdP registrations, DCShadow/DCSync attacks, and suspicious MFA changes in real time.",
    explanation: "ITDR bridges the gap between endpoint EDR and central identity systems.",
    hint: "Detecting and responding to attacks specifically targeting Active Directory and identity systems.",
    level: "Expert",
    codeExample: `// ITDR Detection Alert:
// "Suspicious DCSync replication request originated from non-Domain Controller IP (10.14.88.22) 🚨"`
  },
  {
    id: 26,
    question: "What is the difference between Coarse-Grained Authorization and Fine-Grained Authorization (FGA)?",
    shortAnswer: "Coarse-Grained: Broad binary access based on roles (e.g., 'Susmita can access the Invoice System'). Fine-Grained: Precise, record-level permissions based on attributes and relationships (e.g., 'Susmita can edit Invoice #4092 ONLY IF she is the assigned reviewer AND invoice amount < ₹1,00,000 AND status is DRAFT').",
    explanation: "Fine-Grained Authorization is essential for multi-tenant SaaS platforms and zero-trust applications.",
    hint: "Coarse-grained = access to whole app; Fine-grained = access to specific records based on detailed rules.",
    level: "Moderate",
    codeExample: `// Fine-Grained Permission:
// user:susmita ➔ can_approve ➔ document:invoice_4092 (Condition: amount <= 100000)`
  },
  {
    id: 27,
    question: "What is Google Zanzibar / OpenFGA relationship-based access control (ReBAC)?",
    shortAnswer: "An authorization paradigm that models permissions as relationships in a directed graph (e.g., `user:susmita is member of group:finance_approvers which has editor access to folder:treasury_2026`). Access is resolved via graph traversal in sub-millisecond latency.",
    explanation: "Zanzibar scales to billions of users and permissions across distributed global cloud infrastructure.",
    hint: "Models permissions as relationship graphs (ReBAC) evaluated via sub-millisecond graph traversal.",
    level: "Expert",
    codeExample: `// ReBAC Tuple:
// doc:budget_2026#editor@group:finance_leads#member`
  },
  {
    id: 28,
    question: "What is Enterprise Attestation in Identity Governance and how does it prevent rogue insider account creation?",
    shortAnswer: "Requires that all new account creations, permission grants, and role elevations be cryptographically signed by an approved manager and logged to an immutable, append-only audit ledger (SIEM / Blockchain). Any account appearing without a valid attestation token is automatically quarantined.",
    explanation: "This defeats rogue administrators who attempt to secretly create backdoor administrative accounts.",
    hint: "All account creations must have signed manager approval; unapproved accounts are auto-quarantined.",
    level: "Moderate",
    codeExample: `// Unapproved Account Alarm:
// New user 'backdoor_admin' detected in AD without matching HR ticket ➔ Auto-Disabled in 5 seconds! 🚨`
  },
  {
    id: 29,
    question: "In the Barrackpore Municipal Treasury case study, an adversary bribed a junior data entry clerk to disburse ₹45,00,000 to an unauthorized bank account. How did the IAM architecture prevent this fraud attempt?",
    shortAnswer: "1. ABAC Policy: Clerk's role was capped at transactions under ₹50,000. 2. Separation of Duties: Transactions over ₹50,000 required Maker-Checker dual authorization. 3. Step-Up MFA: Approval demanded a live FIDO2 hardware passkey scan from the Treasury Director. 4. Environment Check: Approval was blocked outside official treasury subnets.",
    explanation: "Layered IAM controls prevented a single compromised clerk from executing unauthorized disbursements.",
    hint: "ABAC limits, Maker-Checker dual custody, and mandatory Treasury Director FIDO2 step-up approval.",
    level: "Expert",
    codeExample: `// Defense Execution:
// 1. Clerk attempts ₹45,00,000 transfer -> BLOCKED: Role limit is ₹50,000 ❌
// 2. Transferred to Director for Checker Approval -> Demands FIDO2 Touch on Office Subnet ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive enterprise IAM transformation blueprint for migrating a legacy organization of 15,000 employees to a Zero Trust IAM architecture.",
    shortAnswer: "1. Deploy Cloud IdP (Entra ID/Okta) with SCIM 2.0 automated HR sync for JML lifecycle. 2. Enforce FIDO2 WebAuthn phishing-resistant MFA with conditional access. 3. Migrate from RBAC to ABAC/PBAC using Open Policy Agent. 4. Implement CyberArk PAM with Zero Standing Privileges and JIT elevation. 5. Deploy automated quarterly access certification reviews and ITDR threat monitoring.",
    explanation: "This blueprint represents the gold standard in enterprise cyber resilience, satisfying ISO 27001, SOC 2, and NIST SP 800-207 guidelines.",
    hint: "Cloud IdP + SCIM JML, FIDO2 MFA, ABAC with OPA, PAM with JIT elevation, and quarterly access reviews.",
    level: "Expert",
    codeExample: `// Enterprise Zero Trust IAM Blueprint:
// Phase 1: Identity Clean-up & SCIM 2.0 JML Lifecycle Automation
// Phase 2: Mandatory FIDO2 WebAuthn Passkeys (NIST AAL3)
// Phase 3: PAM Zero Standing Privileges & JIT Ephemeral Elevation
// Phase 4: Contextual ABAC / OPA Policy-as-Code Enforcement
// Phase 5: Continuous ITDR Monitoring & Quarterly Governance Certification`
  }
];

export default questions;
