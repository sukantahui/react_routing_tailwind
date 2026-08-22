// topic37_questions.js
// 30 Moderate to Expert Questions on Extranet Architecture, B2B Integration, and Cyber Security

const questions = [
  {
    question: "What is an Extranet in computer networking?",
    shortAnswer: "An Extranet is a controlled, private extension of an enterprise Intranet that allows authorized external entities (business partners, suppliers, vendors, customers) to securely access specific internal resources over the public Internet or dedicated carrier links.",
    explanation: "Extranets facilitate collaborative B2B operations, automated supply chain replenishment, and inter-organizational data exchange.",
    hint: "Controlled extension of an Intranet for authorized external business partners.",
    level: "basic",
    codeExample: "Extranet = { AccessScope: 'Authorized External Partners', Security: 'RBAC, VPN, mTLS, SAML' };"
  },
  {
    question: "What is the key difference between an Intranet and an Extranet?",
    shortAnswer: "An Intranet is accessible exclusively to internal company employees; an Extranet is accessible to both internal employees and authorized external third-party partners (suppliers, contractors, institutional clients).",
    explanation: "Extranets require strict multi-tenant role-based access control (RBAC) to ensure Partner A cannot see Partner B's confidential pricing or orders.",
    hint: "Intranet is internal employees only; Extranet includes trusted external partners.",
    level: "basic",
    codeExample: "Comparison = { Intranet: 'Internal staff only', Extranet: 'Staff + Trusted B2B Partners' };"
  },
  {
    question: "How do Site-to-Site IPsec VPN tunnels connect partner enterprise networks in an Extranet?",
    shortAnswer: "They establish an encrypted tunnel between two perimeter routers/firewalls over the public Internet using IKEv2 and AES-256 GCM, allowing partner ERP/database servers to communicate across private subnets seamlessly.",
    explanation: "IPsec encapsulates and encrypts all cross-organization traffic, protecting proprietary inventory feeds from public ISP interception.",
    hint: "Encrypts communication between corporate firewalls across the Internet using AES-256.",
    level: "moderate",
    codeExample: "crypto ikev2 proposal IKE-PROP\n  encryption aes-gcm-256\n  group 19\ncrypto ipsec profile B2B-EXTRANET-VPN"
  },
  {
    question: "What is Mutual TLS (mTLS) and why is it mandated for B2B Extranet API integrations?",
    shortAnswer: "mTLS requires BOTH the client and the server to authenticate each other using X.509 digital certificates before an encrypted TLS session is established, preventing unauthorized API callers even if API keys are leaked.",
    explanation: "Banking payment gateways in Kolkata mandate mTLS for merchant extranet APIs to prevent man-in-the-middle impersonation.",
    hint: "Both client and server present digital certificates to prove their identity before connecting.",
    level: "expert",
    codeExample: "ssl_verify_client on; // NGINX mTLS directive enforcing partner client certificate validation"
  },
  {
    question: "What is Federated Identity Management (e.g. SAML 2.0 / OpenID Connect) in Extranet portals?",
    shortAnswer: "A standard that allows users from partner organizations to authenticate against their own company's Identity Provider (IdP) and gain seamless Single Sign-On (SSO) access to the host enterprise's Extranet portal via signed cryptographic tokens.",
    explanation: "When a supplier logs in with their corporate Azure AD, SAML assertions authorize them into the host factory portal without creating a local password.",
    hint: "Allows partner employees to log in using their own company credentials via SAML/OIDC.",
    level: "expert",
    codeExample: "SAML_Flow: Supplier -> Partner IdP (Authenticate) -> SAML Token -> Host Extranet Portal (Authorized)"
  },
  {
    question: "What is a Supply Chain Attack (Third-Party Breach) in Extranet security?",
    shortAnswer: "A cyber attack where hackers compromise a less-secure third-party vendor or contractor and exploit their trusted Extranet VPN/portal access to pivot into the high-value host enterprise Intranet (e.g. Target HVAC breach).",
    explanation: "Attackers stole vendor credentials and traversed an unsegmented extranet VPN into the retailer's payment card network.",
    hint: "Hacking a third-party vendor to gain access to the host enterprise through their Extranet link.",
    level: "moderate",
    codeExample: "SupplyChainRisk: CompromisedVendorCredentials -> ExtranetVPN -> (LateralMovement) -> CoreIntranet"
  },
  {
    question: "How does Zero Trust Network Access (ZTNA) protect Extranets against vendor compromise?",
    shortAnswer: "Instead of granting third-party vendors full Layer-3 subnet network access over a legacy VPN, ZTNA grants micro-scoped, application-level access strictly to the single authorized web tool or server, enforcing continuous identity and device posture checks.",
    explanation: "If a contractor's laptop is infected in Ichapur, ZTNA prevents them from scanning or reaching any other server on the network.",
    hint: "Gives partners access to one specific application only, preventing network scanning.",
    level: "expert",
    codeExample: "ZTNA_Policy: Allow Contractor_Susmita -> App 'Machinery_Monitor' ONLY; Block all other ports/subnets;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise B2B Extranet Gateway / SSL VPN Appliance?",
    shortAnswer: "Approximately ₹75,000 to ₹2,80,000 (e.g. Fortinet FortiGate, Pulse Secure / Ivanti, or F5 BIG-IP APM) including concurrent partner client licenses and UTM inspection.",
    explanation: "Extranet gateway appliances terminate hundreds of encrypted IPsec and SSL VPN partner tunnels at multi-gigabit line rate in ₹ budgets.",
    hint: "Enterprise Extranet Gateway costs ₹75,000 – ₹2,80,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Extranet_Gateway_Cost = ₹1,45,000; // Multi-Gigabit B2B SSL/IPsec VPN Appliance with MFA"
  },
  {
    question: "What is Multi-Tenancy in Extranet B2B portal architecture?",
    shortAnswer: "A software architecture where a single extranet application instance serves multiple distinct partner organizations (tenants), strictly isolating data, branding, and permissions so no tenant can view another tenant's data.",
    explanation: "Multi-tenant ERP extranets in Barrackpore ensure Foundry A cannot view invoices or delivery schedules belonging to Foundry B.",
    hint: "Serves multiple partner companies from one system while strictly isolating their data.",
    level: "moderate",
    codeExample: "DB_Query: SELECT * FROM Invoices WHERE TenantID = currentPartner.TenantID;"
  },
  {
    question: "What is Electronic Data Interchange (EDI) and AS2 (Applicability Statement 2) in Extranet supply chains?",
    shortAnswer: "EDI standardizes business documents (purchase orders, invoices); AS2 is the secure transport protocol that transmits EDI files over the Internet using digital certificates, S/MIME encryption, and cryptographic receipts (MDN).",
    explanation: "Major manufacturing plants in West Bengal use AS2 extranets for automated just-in-time raw material ordering.",
    hint: "Secure protocol for exchanging standardized business orders and invoices over the Internet.",
    level: "expert",
    codeExample: "AS2_Header: AS2-From: PartnerFoundry; AS2-To: AutoAssembly; Message-Disposition-Notification: signed"
  },
  {
    question: "What is an Extranet DMZ (Partner Screened Subnet)?",
    shortAnswer: "A dedicated semi-trusted perimeter network segment physically or logically separated from both the public Internet and the internal corporate Intranet, hosting servers and API endpoints specifically allocated for external partner access.",
    explanation: "If a partner portal is compromised, the internal firewall stops the adversary from reaching core customer databases.",
    hint: "Dedicated DMZ zone hosting partner servers, separated from both the Internet and core Intranet.",
    level: "moderate",
    codeExample: "Perimeter: [Internet / VPN] -> [Extranet DMZ (172.20.1.0/24)] -> [Internal Firewall] -> [Core Intranet]"
  },
  {
    question: "What is Role-Based Access Control (RBAC) vs Attribute-Based Access Control (ABAC) in Extranets?",
    shortAnswer: "RBAC grants permissions based on static user roles (e.g. 'Supplier_Manager'); ABAC evaluates dynamic attributes (e.g. 'User Role' + 'Device Compliant' + 'Time = 9am-5pm' + 'Location = India') to make real-time authorization decisions.",
    explanation: "ABAC allows extranets in Kolkata to block partner logins originating from unauthorized foreign IP ranges.",
    hint: "RBAC uses fixed job roles; ABAC uses dynamic context attributes like location, time, and device health.",
    level: "expert",
    codeExample: "ABAC_Rule: if (user.role == 'Vendor' && request.ip.country == 'IN' && device.isPatched) allowAccess();"
  },
  {
    question: "What is a Dedicated Cloud Interconnect (e.g. AWS Direct Connect / Azure ExpressRoute) for Extranets?",
    shortAnswer: "A private, physical optical fiber circuit leased from a telecom carrier that bypasses the public Internet entirely to directly link an on-premises data center with a cloud provider or major B2B partner.",
    explanation: "Provides 1 Gbps to 100 Gbps dedicated bandwidth with predictable sub-millisecond latency and maximum security for financial transactions.",
    hint: "Private physical optical link bypassing the Internet for high-speed cloud and partner connections.",
    level: "moderate",
    codeExample: "AWS_DirectConnect = { Bandwidth: '10 Gbps Dedicated', Latency: '0.8 ms', BypassesInternet: true };"
  },
  {
    question: "What is API Rate Limiting and why is it essential on B2B Extranet API endpoints?",
    shortAnswer: "A gateway control that caps the number of API requests a partner can make within a specified time window (e.g. 500 requests/minute), preventing server overload, API scraping, and denial-of-service outages.",
    explanation: "Rate limiting ensures one malfunctioning partner script does not crash the core extranet API for all other vendors.",
    hint: "Limits how many requests a partner can send per minute to prevent server crashes.",
    level: "basic",
    codeExample: "rate_limit: 500 requests per minute per Partner_API_Key; if_exceeded: return 429 Too Many Requests;"
  },
  {
    question: "What is an Extranet SLA (Service Level Agreement)?",
    shortAnswer: "A legally binding contract between the host organization and its external partners defining guaranteed metrics for system availability (e.g. 99.9% uptime), API latency (< 200 ms), and technical support response times.",
    explanation: "Critical healthcare extranets in Ichapur mandate financial penalties if partner diagnostic portals suffer unplanned downtime.",
    hint: "Legal contract guaranteeing 99.9% uptime and performance standards for partner systems.",
    level: "basic",
    codeExample: "SLA_Metrics = { UptimeGuarantee: '99.95%', MaxLatency: '150 ms', SupportResponse: '< 15 mins' };"
  },
  {
    question: "What is Overlapping IP Subnet Conflict in B2B Site-to-Site VPNs and how is it resolved?",
    shortAnswer: "A common issue where both the host enterprise and the partner use the same RFC 1918 subnet (e.g. both use 192.168.1.0/24); resolved using Bidirectional 1-to-1 NAT (Twice NAT) on the extranet VPN firewall.",
    explanation: "Twice NAT translates the partner's overlapping subnet into a virtual non-conflicting subnet (e.g. 10.250.1.0/24) during tunnel transit.",
    hint: "Occurs when both companies use the same private IP range; fixed using Twice NAT on the firewall.",
    level: "expert",
    codeExample: "TwiceNAT: Translate Partner 192.168.1.0/24 -> 10.250.1.0/24; Translate Host 192.168.1.0/24 -> 10.251.1.0/24"
  },
  {
    question: "What is a Clientless SSL VPN (Web-Based Portal) for Extranets?",
    shortAnswer: "A secure remote access method where external contractors access internal web applications and terminal sessions directly through a standard web browser over HTTPS (TLS 1.3) without installing any client software or VPN agent.",
    explanation: "Clientless SSL VPNs eliminate software deployment headaches when dealing with hundreds of third-party vendor laptops in Jadavpur.",
    hint: "Accesses internal tools directly through a web browser using HTTPS without installing VPN software.",
    level: "moderate",
    codeExample: "Portal: https://extranet.company.in -> Authenticates Partner -> Renders Internal Web/SSH Apps"
  },
  {
    question: "What is API Token Revocation and Token Expiration in Extranet B2B security?",
    shortAnswer: "Security mechanisms where OAuth 2.0 access tokens expire automatically after short lifetimes (e.g. 15 minutes) and can be immediately revoked via an API blacklist if a partner vendor's systems are suspected of compromise.",
    explanation: "Short token lifespans limit the window of opportunity if an adversary intercepts a partner bearer token.",
    hint: "Short-lived API tokens that can be revoked immediately if a partner gets hacked.",
    level: "moderate",
    codeExample: "jwt.sign(payload, secretKey, { expiresIn: '15m' }); // Short-lived 15-minute access token"
  },
  {
    question: "What is Split Tunneling in Extranet VPN configurations and why is it dangerous for third-party contractors?",
    shortAnswer: "A configuration allowing a contractor's laptop to send corporate extranet traffic through the encrypted VPN while simultaneously browsing the public Internet over their local Wi-Fi; an infected laptop can act as a bridge for Internet malware into the extranet.",
    explanation: "Disabling split tunneling forces all laptop traffic through the corporate firewall or replacing VPN with ZTNA eliminates the risk entirely.",
    hint: "Allows a laptop to use VPN and open Internet at the same time, risking malware bridging.",
    level: "expert",
    codeExample: "vpn-profile: split-tunneling disabled // Forces all traffic through corporate inspection"
  },
  {
    question: "How do Auditing and Non-Repudiation work in Extranet electronic transactions?",
    shortAnswer: "By generating cryptographically signed digital audit logs and message receipts (e.g. AS2 MDN receipts) containing timestamps, IP addresses, and partner digital signatures that legally prove a transaction occurred and cannot be denied.",
    explanation: "Non-repudiation prevents a supplier from claiming they never received a ₹5,00,000 raw material purchase order.",
    hint: "Cryptographic digital signatures and receipts proving that a partner performed an action.",
    level: "moderate",
    codeExample: "TransactionReceipt = crypto.sign(PurchaseOrder + Timestamp, HostPrivateKey); // Legally Binding"
  },
  {
    question: "What is a Reverse Proxy WAF in an Extranet B2B architecture?",
    shortAnswer: "A Web Application Firewall positioned at the extranet edge that terminates partner HTTPS connections, validates SAML tokens, and inspects incoming HTTP/JSON payloads for SQL injection, cross-site scripting, and OWASP Top 10 vulnerabilities.",
    explanation: "The WAF protects backend inventory databases from malicious SQL commands injected into partner order forms.",
    hint: "WAF at the extranet boundary inspecting partner web requests for malicious exploit code.",
    level: "moderate",
    codeExample: "waf.inspectB2BPayload(partnerRequest) => if (containsSQLInjection()) dropAndAlert();"
  },
  {
    question: "What is Vendor Risk Management (VRM) in Extranet cybersecurity governance?",
    shortAnswer: "A structured process of assessing, auditing, and continuously monitoring the cybersecurity posture, compliance certifications (ISO 27001, SOC 2), and security controls of third-party vendors before and during Extranet connectivity.",
    explanation: "Organizations in Kolkata conduct annual VRM audits to verify that suppliers maintain patched firewalls and multi-factor authentication.",
    hint: "Evaluating and auditing third-party partner security controls before granting Extranet access.",
    level: "basic",
    codeExample: "VRM_Checklist = ['SOC 2 Type II Certified', 'Enforces MFA', 'Annual Pen Test Report Passed'];"
  },
  {
    question: "What is an Extranet Partner Onboarding and Offboarding workflow?",
    shortAnswer: "The automated administrative process of provisioning partner credentials, setting up VPN tunnels/mTLS certificates, and assigning RBAC permissions during onboarding, and instantly revoking all access when a vendor contract terminates.",
    explanation: "Automated offboarding prevents 'orphaned vendor accounts' from remaining active for months after a contract ends.",
    hint: "Automated process of granting partner access when hired and immediately deleting accounts when contracts end.",
    level: "basic",
    codeExample: "offboardingWorkflow.execute(partnerID) => { revokeCertificates(); disableSAML(); closeVPNTunnel(); }"
  },
  {
    question: "What is IP Whitelisting (Access Control Lists) on Extranet gateways?",
    shortAnswer: "A perimeter firewall rule that restricts extranet portal and API access strictly to the known, static public IP addresses belonging to authorized partner corporate headquarters, blocking connection attempts from all other Internet IPs.",
    explanation: "If an adversary steals partner credentials, IP whitelisting prevents them from logging in from an unauthorized home or foreign IP address.",
    hint: "Allows logins only from specific known partner company public IP addresses.",
    level: "moderate",
    codeExample: "firewall.rules: Allow Partner_Kolkata (103.25.10.4/32) -> Extranet_Portal (Port 443); Deny All Other;"
  },
  {
    question: "What is an Extranet File Transfer Protocol (SFTP / FTPS / MFT)?",
    shortAnswer: "Managed File Transfer (MFT) platforms using SSH File Transfer Protocol (SFTP) or FTPS with PGP encryption, automated scheduling, checksum verification, and detailed audit trails for bulk B2B batch data exchanges.",
    explanation: "Automated nightly payroll and inventory batch files are transferred between Barrackpore and Kolkata partner banks via SFTP.",
    hint: "Secure encrypted file transfer protocols (SFTP/MFT) for automated batch file exchanges.",
    level: "basic",
    codeExample: "sftp -i /keys/partner_ed25519 vendor@sftp.extranet.company.in:/orders/"
  },
  {
    question: "How does Session Hijacking affect Extranet web portals and how is it prevented?",
    shortAnswer: "Attackers steal a valid partner session cookie via sniffing or XSS to impersonate the vendor; prevented by enforcing HTTPS-only cookies (`Secure`, `HttpOnly`, `SameSite=Strict`), short session timeouts, and binding sessions to client IP/device fingerprints.",
    explanation: "If cookie stealing occurs, the extranet server detects an IP mismatch and immediately invalidates the session.",
    hint: "Stealing login cookies to impersonate a partner; prevented with Secure/HttpOnly cookies and IP binding.",
    level: "expert",
    codeExample: "Set-Cookie: ExtranetSessionID=xyz987; Secure; HttpOnly; SameSite=Strict; Max-Age=1800"
  },
  {
    question: "What is a Customer-Facing Extranet vs a Supplier-Facing Extranet?",
    shortAnswer: "A Supplier Extranet connects upstream vendors for inventory ordering, raw material delivery schedules, and invoicing; a Customer Extranet connects downstream enterprise buyers for bulk purchasing, shipment tracking, and contract pricing.",
    explanation: "Automobile manufacturers in West Bengal maintain separate extranets for Tier-1 parts suppliers and authorized retail car dealerships.",
    hint: "Supplier extranet is for buying raw parts; Customer extranet is for wholesale buyers and distributors.",
    level: "basic",
    codeExample: "ExtranetTypes = { Upstream: 'Supplier / Vendor Logistics', Downstream: 'Enterprise Wholesale Buyers' };"
  },
  {
    question: "What is Network Access Quarantine for non-compliant partner devices?",
    shortAnswer: "A Network Access Control (NAC) action that isolates a partner device into a restricted sandbox VLAN if it fails health checks (e.g. missing antivirus updates or outdated OS patches) until remediation is complete.",
    explanation: "Prevents infected contractor laptops from joining the main extranet partner subnet in Ichapur.",
    hint: "Isolates partner laptops with missing antivirus or security patches until fixed.",
    level: "moderate",
    codeExample: "if (!partnerDevice.antivirusActive) isolateToVLAN(Quarantine_VLAN_99);"
  },
  {
    question: "What is the 3-Tier Network Spectrum mapping for enterprise connectivity?",
    shortAnswer: "1. Internet (Public, open to everyone, zero trust perimeter); 2. Extranet (Semi-private, open to authenticated business partners via VPN/ZTNA); 3. Intranet (Private, restricted strictly to internal company staff).",
    explanation: "Understanding where data assets reside across this spectrum is foundational to enterprise network segmentation.",
    hint: "Internet = Public; Extranet = Partners; Intranet = Internal Staff.",
    level: "basic",
    codeExample: "NetworkSpectrum = ['Internet (Global Public)', 'Extranet (B2B Partners)', 'Intranet (Internal Staff)'];"
  },
  {
    question: "What is the ultimate golden rule for architecting, governing, and securing an Enterprise Extranet?",
    shortAnswer: "'Enforce Zero Trust Network Access (ZTNA) with least-privilege application scoping; mandate Mutual TLS (mTLS) for APIs and SAML 2.0 for portals; isolate partner traffic inside dedicated Extranet DMZs; eliminate flat VPNs to block lateral supply-chain pivot attacks; and budget B2B gateway appliances in Indian Rupees (₹)!'",
    explanation: "This complete rule captures identity federation, API cryptographic authentication, perimeter DMZ segmentation, zero trust access, and financial infrastructure budgeting.",
    hint: "ZTNA least privilege + mTLS/SAML + Extranet DMZ + Supply-chain mitigation + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeployZTNA() -> Enforce_mTLS_and_SAML() -> SegmentExtranetDMZ() -> BlockLateralMovement() -> BudgetInRupees(₹);"
  }
];

export default questions;
