const questions = [
  {
    id: 1,
    question: "What are the three fundamental pillars of the AAA security framework, and what specific question does each answer?",
    shortAnswer: "1. Authentication ('Who are you?' - Verifies identity via credentials); 2. Authorization ('What are you permitted to do?' - Grants granular permissions and access rights); 3. Accounting ('What did you do, when, and for how long?' - Records session activity, resource consumption, and command audit trails).",
    explanation: "Together, AAA provides a unified foundation for identity governance, access enforcement, compliance reporting, and forensic investigation across enterprise networks.",
    hint: "Authentication = Identity; Authorization = Permissions; Accounting = Audit trail.",
    level: "Basic",
    codeExample: `// The AAA Triad:
// [ Authentication ] ➔ User presents Ed25519 key / password ➔ "Identity Verified: Susmita"
// [ Authorization  ] ➔ Policy checks role ➔ "Susmita permitted to READ/WRITE Treasury DB"
// [ Accounting     ] ➔ Logs session: "Susmita logged in 14:00, transferred 45 MB, logged out 14:30"`
  },
  {
    id: 2,
    question: "What are the core technical differences between the RADIUS (RFC 2865/2866) and TACACS+ (RFC 8907) protocols?",
    shortAnswer: "1. Transport: RADIUS uses UDP (Ports 1812/1813); TACACS+ uses TCP (Port 49); 2. Architecture: RADIUS combines Authentication and Authorization into a single transaction; TACACS+ completely decouples Authentication, Authorization, and Accounting into independent modular processes; 3. Encryption: RADIUS encrypts ONLY the password attribute; TACACS+ encrypts the ENTIRE packet payload.",
    explanation: "Because TACACS+ supports per-command authorization and full packet encryption over reliable TCP, it is the standard choice for router/switch administration, whereas RADIUS is favored for 802.1X network access.",
    hint: "RADIUS = UDP + combines AuthN/AuthZ + partial encryption; TACACS+ = TCP + decouples all 3 + full encryption.",
    level: "Basic",
    codeExample: `// RADIUS vs TACACS+ Comparison:
// RADIUS  : [ UDP 1812 ] ──(Cleartext Header + MD5 Encrypted Password)──> Combined AuthN + AuthZ
// TACACS+ : [ TCP 49   ] ──(Entire Packet Payload Encrypted under Key)──> Granular Per-Command AuthZ`
  },
  {
    id: 3,
    question: "How does 802.1X Port-Based Network Access Control (PNAC) function, and what are its three logical participating entities?",
    shortAnswer: "1. Supplicant (The client endpoint device requesting access, e.g., Susmita's laptop); 2. Authenticator (The edge network switch or wireless access point blocking all traffic except EAP until authenticated); 3. Authentication Server (The centralized RADIUS server validating credentials, e.g., FreeRADIUS).",
    explanation: "Until the authentication server returns an `Access-Accept` message to the switch, the switch port remains in an 'unauthorized' state, dropping all user data packets.",
    hint: "Supplicant (client), Authenticator (switch/AP), Authentication Server (RADIUS).",
    level: "Basic",
    codeExample: `// 802.1X Architecture:
// [ Supplicant (Laptop) ] ──(EAPoL on Layer 2)──> [ Authenticator (Switch) ] ──(RADIUS over UDP)──> [ FreeRADIUS Server ]`
  },
  {
    id: 4,
    question: "What is Attribute-Based Access Control (ABAC - NIST SP 800-162) and how does it provide dynamic security compared to traditional Role-Based Access Control (RBAC)?",
    shortAnswer: "RBAC grants permissions based solely on static organizational roles (e.g., `role: Auditor`); ABAC evaluates fine-grained boolean policies dynamically combining Subject attributes (Role, Clearance), Object attributes (Data sensitivity, Department), Action attributes (Read, Edit), and Environmental Context (Time: 09:00-17:00, Location: Barrackpore SOC, Device Health).",
    explanation: "Under ABAC, even a high-level administrator can be denied access if attempting to open sensitive files outside business hours from an unrecognized geographic location.",
    hint: "ABAC evaluates dynamic context (time, location, device posture) alongside user roles.",
    level: "Moderate",
    codeExample: `// Dynamic ABAC Policy Rule:
// Permit IF (Subject.role == "SecOps_Lead") AND (Context.time >= 09:00 AND Context.time <= 18:00)
//           AND (Context.client_ip IN 10.14.0.0/16) AND (Context.device_health == "COMPLIANT")`
  },
  {
    id: 5,
    question: "What is the Diameter protocol (RFC 6733) and what major architectural improvements does it introduce over legacy RADIUS?",
    shortAnswer: "Diameter is the next-generation AAA standard replacing RADIUS in 4G/5G mobile telecom cores and cloud IAM. It uses reliable transport (TCP or SCTP Port 3868), mandates native network-layer security (TLS and IPsec), expands the Attribute-Value Pair (AVP) space from 8-bit to 32-bit, and supports automated server failover and peer discovery.",
    explanation: "Diameter eliminated the packet loss, small attribute limitations, and weak MD5 encryption vulnerabilities that constrained RADIUS in modern cellular networks.",
    hint: "The modern evolution of RADIUS for 4G/5G; uses TCP/SCTP, native TLS, and 32-bit AVPs.",
    level: "Moderate",
    codeExample: `// Diameter Protocol Features:
// Transport : TCP / SCTP (Port 3868) with multi-homing support
// Security  : Native TLS / IPsec encapsulation
// Data Model: 32-bit AVP codes with vendor-specific dictionaries (Used in 5G AKA & IMS)`
  },
  {
    id: 6,
    question: "What is 'Command Authorization' in TACACS+ and how does it enforce the Principle of Least Privilege on enterprise network switches?",
    shortAnswer: "Every single command typed by an administrator into a network switch CLI is intercepted by the switch and sent to the TACACS+ server in real time (`Authorization-Request`). The TACACS+ server inspects the command string against the user's privilege profile and returns `STATUS_PASS` or `STATUS_FAIL` before the switch executes the command.",
    explanation: "This allows security architects in Barrackpore to grant junior operators the ability to run `show ip interface brief` while completely blocking destructive commands like `reload`, `erase startup-config`, or `format`.",
    hint: "The TACACS+ server approves or denies each CLI command individually before the switch runs it.",
    level: "Moderate",
    codeExample: `// TACACS+ Command Authorization Flow:
// Operator types : "erase startup-config"
// Switch ➔ TACACS: "Can user 'debangshu' run 'erase startup-config'?"
// TACACS ➔ Switch: "STATUS_FAIL (Unauthorized Command ❌)"
// Switch prints  : "% Command authorization failed."`
  },
  {
    id: 7,
    question: "What is the purpose of 'Accounting Interim-Updates' in the AAA Accounting protocol?",
    shortAnswer: "Interim-Updates are periodic accounting packets sent by the Network Access Server (NAS) to the AAA server during an active session (e.g., every 10 minutes), reporting ongoing connection duration, bytes transferred (`Input-Octets`, `Output-Octets`), and link status.",
    explanation: "If an edge switch suffers sudden power failure, interim updates ensure the central accounting server knows the session ended approximately when the last update arrived, preventing phantom 'infinite sessions' in billing and forensic logs.",
    hint: "Periodic heartbeats sent during an active session to track bytes and detect dead connections.",
    level: "Moderate",
    codeExample: `// Accounting Lifecycle:
// 1. Accounting-Request (Status-Type = Start)
// 2. Accounting-Request (Status-Type = Interim-Update, Input-Octets = 450218, Output-Octets = 1204580)
// 3. Accounting-Request (Status-Type = Stop, Acct-Session-Time = 1800s)`
  },
  {
    id: 8,
    question: "What is a 'Network Access Server' (NAS) in RADIUS and TACACS+ terminology?",
    shortAnswer: "A NAS is an intermediary network device (such as a VPN concentrator, 802.1X Ethernet switch, wireless access point, or dial-in router) that controls user access to the network, relaying authentication credentials from clients to the central AAA server and enforcing the returned authorization policies.",
    explanation: "The NAS shares a cryptographic pre-shared key (shared secret) with the AAA server to authenticate packet exchanges.",
    hint: "The switch, router, or VPN gateway that acts as the client to the AAA server.",
    level: "Basic",
    codeExample: `// NAS Configuration on Cisco Switch:
// radius-server host 10.14.0.50 auth-port 1812 acct-port 1813 key BarrackporeRadiusSecret2026`
  },
  {
    id: 9,
    question: "Why is the MD5-based password encryption in legacy RADIUS considered cryptographically weak today?",
    shortAnswer: "RADIUS uses MD5 XOR stream encryption (`User-Password = Plaintext XOR MD5(Shared_Secret + Request_Authenticator)`). Because MD5 has severe collision vulnerabilities and the 16-byte Request Authenticator is transmitted in cleartext, passive attackers capturing network packets can perform offline dictionary attacks to crack both user passwords and the pre-shared secret.",
    explanation: "Modern enterprise environments encapsulate RADIUS inside TLS (RadSec / RFC 6614) over TCP Port 2083 to secure the transport.",
    hint: "MD5 collisions and cleartext authenticators allow attackers to crack passwords offline.",
    level: "Expert",
    codeExample: `// Modern RadSec (RADIUS over TLS - RFC 6614):
// Port: TCP 2083
// Encapsulates standard RADIUS packets inside TLS 1.3 tunnels, eliminating MD5 vulnerabilities.`
  },
  {
    id: 10,
    question: "What are the four primary Access Control Models defined in computer security theory?",
    shortAnswer: "1. Discretionary Access Control (DAC - Resource owner sets permissions, e.g., Unix `chmod`); 2. Mandatory Access Control (MAC - Enforced by central OS security labels, e.g., SELinux / Bell-LaPadula); 3. Role-Based Access Control (RBAC - Permissions bound to organizational job roles); 4. Attribute-Based Access Control (ABAC - Dynamic evaluation of Subject, Object, Action, and Environmental attributes).",
    explanation: "High-assurance defense installations in Ichapur combine MAC and ABAC for maximum compartmentalization.",
    hint: "DAC (owner sets permissions), MAC (OS labels), RBAC (roles), ABAC (dynamic attributes).",
    level: "Basic",
    codeExample: `// Access Control Models Spectrum:
// DAC  : User A owns file ➔ User A runs 'chmod 777 file' (Owner discretion)
// MAC  : OS policy dictates 'Confidential' role cannot read 'Top-Secret' file (Enforced regardless of owner)
// RBAC : 'Doctor' can read medical chart; 'Nurse' can edit vitals
// ABAC : 'Doctor' can read medical chart ONLY IF in Emergency Ward AND on Duty`
  },
  {
    id: 11,
    question: "What is EAP (Extensible Authentication Protocol - RFC 3748) and what are its most common secure variants in 802.1X?",
    shortAnswer: "EAP is a universal authentication framework supporting multiple authentication methods without requiring the edge switch to understand the underlying cryptographic negotiation. Common variants: 1. `EAP-TLS` (Mutual certificate-based authentication using X.509 certificates - Gold Standard); 2. `EAP-TTLS` (Server authenticated via certificate; client authenticated via tunneled password); 3. `PEAP` (Protected EAP - Microsoft standard encapsulating MS-CHAPv2 inside TLS tunnel).",
    explanation: "EAP-TLS is the only method completely immune to password cracking because it eliminates passwords entirely in favor of hardware-backed client certificates.",
    hint: "EAP-TLS (certificates), EAP-TTLS (tunneled), PEAP (Microsoft TLS tunnel).",
    level: "Moderate",
    codeExample: `// EAP-TLS Authentication Wire Flow:
// [ Client ] ──(Presents Client X.509 Cert)──> [ Switch ] ──(Relays to RADIUS)──> [ FreeRADIUS ]
// [ FreeRADIUS ] ──(Presents Server Cert)────> [ Switch ] ──(Relays to Client)──> [ Client Validates CA ]`
  },
  {
    id: 12,
    question: "What is a 'Policy Decision Point' (PDP) versus a 'Policy Enforcement Point' (PEP) in modern Zero-Trust AAA architectures?",
    shortAnswer: "The Policy Enforcement Point (PEP) is the front-line gateway or agent (e.g., edge switch, API gateway, reverse proxy) that intercepts user requests; the Policy Decision Point (PDP) is the central brain (e.g., RADIUS server, IAM engine, Open Policy Agent) that evaluates policies against user context and issues the final `PERMIT` or `DENY` decision to the PEP.",
    explanation: "Decoupling decision logic (PDP) from execution (PEP) allows centralized policy updates across thousands of distributed gateways simultaneously.",
    hint: "PEP enforces the decision at the gateway; PDP computes the decision at the central policy engine.",
    level: "Moderate",
    codeExample: `// PDP vs PEP Architecture:
// [ User Request ] ➔ [ PEP (Edge Gateway / Switch) ] ──(Query Context)──> [ PDP (Central Policy Engine) ]
//                                   |                                                |
//                     [ Enforces Permit / Deny ] <────────(Returns Decision)─────────┘`
  },
  {
    id: 13,
    question: "What is 'Accounting Non-Repudiation' and how does AAA protect organizations during legal and forensic audits?",
    shortAnswer: "Accounting logs record cryptographically signed session receipts, source IP addresses, MAC addresses, precise UTC timestamps, and command strings. Because records are stored on immutable, write-only central syslog/SIEM servers, malicious insiders cannot alter or deny having performed unauthorized system actions.",
    explanation: "In financial institutions across Kolkata, accounting non-repudiation is legally required under RBI cybersecurity frameworks.",
    hint: "Proves conclusively who performed an action so they cannot deny it in an audit.",
    level: "Basic",
    codeExample: `// Signed Accounting Audit Entry:
// Timestamp: 2026-08-23T14:22:10Z | User: susmita | NAS-IP: 10.14.0.1 | Port: Gi1/0/24
// Command: "router bgp 65001 → neighbor 10.14.0.2 shutdown" | HMAC: d8f9b1c2... ✔`
  },
  {
    id: 14,
    question: "What is the function of the `Service-Type` attribute in a RADIUS `Access-Accept` response?",
    shortAnswer: "The `Service-Type` attribute specifies the exact type of service the authenticated user is authorized to receive (e.g., `Framed-User` for PPP/VPN network tunnels, `Login-User` for interactive terminal shell access, `Administrative-User` for full switch management).",
    explanation: "The edge device configures its operational mode based on the returned `Service-Type` value.",
    hint: "Dictates what kind of service the user receives (e.g. Framed-User for VPN, Login-User for shell).",
    level: "Moderate",
    codeExample: `// RADIUS Service-Type Values:
// Service-Type = Framed-User (Assigns IP address & route table for VPN)
// Service-Type = Login-User  (Opens interactive Telnet/SSH management shell)`
  },
  {
    id: 15,
    question: "What is 'VLAN Steering' (Dynamic VLAN Assignment) in 802.1X RADIUS deployments?",
    shortAnswer: "When a user authenticates via 802.1X, the RADIUS server returns vendor-specific attributes (`Tunnel-Type = VLAN`, `Tunnel-Medium-Type = 802`, `Tunnel-Private-Group-Id = VLAN_ID`). The switch dynamically places the physical port or Wi-Fi session into the specified VLAN (e.g., moving Susmita to Treasury VLAN 100, while moving a guest to Guest VLAN 999).",
    explanation: "This eliminates manual switch port configuration, enforcing dynamic network segmentation based entirely on authenticated user identity.",
    hint: "The RADIUS server tells the switch which VLAN to dynamically assign to the user's port.",
    level: "Moderate",
    codeExample: `// RADIUS Attributes for Dynamic VLAN Assignment:
// Tunnel-Type = 13 (VLAN)
// Tunnel-Medium-Type = 6 (802)
// Tunnel-Private-Group-Id = "100" (Automatically binds switch port to VLAN 100!)`
  },
  {
    id: 16,
    question: "What is TACACS+ 'Single-Connection' mode and what performance advantage does it provide?",
    shortAnswer: "By default, TACACS+ opens and closes a new TCP connection for every single AAA transaction. Single-connection mode (`tacacs-server connection single-connection`) multiplexes all authentication, per-command authorizations, and accounting packets over a single persistent TCP connection, drastically reducing TCP handshake overhead on busy switches.",
    explanation: "This accelerates interactive CLI performance when administrators execute complex automated configuration scripts.",
    hint: "Reuses a single persistent TCP connection for all TACACS+ queries instead of opening new sockets.",
    level: "Expert",
    codeExample: `// Enabling TACACS+ Single-Connection Mode on Cisco IOS:
// tacacs server BARRACKPORE-TACACS
//   address ipv4 10.14.0.50
//   key BarrackporeSecret2026
//   single-connection`
  },
  {
    id: 17,
    question: "What is the 'Fail-Open' versus 'Fail-Closed' dilemma when designing enterprise AAA systems?",
    shortAnswer: "If all AAA servers become unreachable: 'Fail-Open' grants access unconditionally (prioritizing system availability at the cost of security); 'Fail-Closed' denies all access (prioritizing security at the cost of availability). Best practice in high-assurance environments is Fail-Closed, paired with emergency local console fallback credentials stored in an offline vault.",
    explanation: "Banking and defense facilities mandate Fail-Closed to ensure server outages cannot be exploited by attackers to gain unauthorized access.",
    hint: "Fail-Open allows access on server failure; Fail-Closed denies access to protect security.",
    level: "Basic",
    codeExample: `// Cisco AAA Fallback Configuration:
// aaa authentication login default group tacacs+ local
// (Tries TACACS+ first; falls back to local database ONLY if TACACS+ servers are dead)`
  },
  {
    id: 18,
    question: "What is 'EAPoL' (EAP over LAN - IEEE 802.1X) and what packet types exist in the EAPoL state machine?",
    shortAnswer: "EAPoL encapsulates Extensible Authentication Protocol packets directly inside Layer 2 Ethernet frames. Packet types: 1. `EAPOL-Start` (Client initiates authentication); 2. `EAPOL-Packet` (Carries encapsulated EAP payload); 3. `EAPOL-Logoff` (Client signals session termination); 4. `EAPOL-Key` (Distributes WPA2/WPA3 pairwise encryption keys).",
    explanation: "EAPoL operates at Layer 2 before the client is assigned an IP address via DHCP.",
    hint: "Layer 2 protocol carrying EAP packets between client and switch (Start, Packet, Logoff, Key).",
    level: "Expert",
    codeExample: `// EAPoL Ethernet Frame:
// [ Destination MAC: 01:80:C2:00:00:03 ] [ Source MAC: Client ] [ EtherType: 0x888E (802.1X) ] [ EAPoL Payload ]`
  },
  {
    id: 19,
    question: "What security risk occurs if an administrator uses the same shared secret across multiple Network Access Servers (NAS)?",
    shortAnswer: "If one low-security edge access point or branch switch is physically stolen or compromised, the attacker extracts the shared secret and can decrypt RADIUS traffic, impersonate any other NAS on the network, or inject fraudulent accounting and authorization packets across the entire enterprise.",
    explanation: "Enterprise best practice mandates unique, high-entropy shared secrets per NAS IP address.",
    hint: "Compromise of one device compromises the shared secret for all other devices.",
    level: "Moderate",
    codeExample: `// FreeRADIUS /etc/freeradius/clients.conf:
client switch-barrackpore-core {
    ipaddr = 10.14.0.1
    secret = Core_Secret_99#kL!
}
client switch-ichapur-branch {
    ipaddr = 10.15.0.1
    secret = Branch_Secret_22$vQ@ (Distinct Secret!)
}`
  },
  {
    id: 20,
    question: "What is MS-CHAPv2 and why should it be replaced with modern certificate-based EAP-TLS in enterprise RADIUS?",
    shortAnswer: "MS-CHAPv2 relies on weak DES and NT password hashing algorithms that can be cracked in under 24 hours on cloud GPUs using known-plaintext attacks. EAP-TLS replaces shared passwords entirely with asymmetric X.509 digital certificates and public-key cryptography, providing immunity to password cracking and offline brute force.",
    explanation: "All modern enterprise Wi-Fi and 802.1X standards deprecate MS-CHAPv2 in favor of EAP-TLS.",
    hint: "MS-CHAPv2 uses crackable DES/NT hashes; EAP-TLS uses uncrackable asymmetric digital certificates.",
    level: "Moderate",
    codeExample: `// Security Migration:
// DEPRECATED: PEAP with MS-CHAPv2 (Crackable in 24 hours via cloud GPUs) ❌
// RECOMMENDED: EAP-TLS with Hardware-Backed X.509 Client Certificates ✔`
  },
  {
    id: 21,
    question: "How does Linux Pluggable Authentication Modules (PAM) implement the AAA architecture locally on a server?",
    shortAnswer: "Linux PAM decouples application services (SSH, Sudo, GDM) from authentication mechanisms using 4 modular management groups in `/etc/pam.d/`: 1. `auth` (Authentication - password/key check); 2. `account` (Authorization - expiration, time restrictions); 3. `session` (Environment setup and mounting); 4. `password` (Credential updating).",
    explanation: "This allows servers in Barrackpore to integrate local Linux logins seamlessly with central RADIUS, TACACS+, or LDAP servers without modifying individual program code.",
    hint: "Linux PAM uses 4 module types: auth, account, session, and password in /etc/pam.d/.",
    level: "Basic",
    codeExample: `// /etc/pam.d/sshd Configuration:
auth    required    pam_radius_auth.so
account required    pam_time.so
session required    pam_mkhomedir.so skel=/etc/skel`
  },
  {
    id: 22,
    question: "What is 'Session Hijacking' on 802.1X switch ports, and how does MACsec (IEEE 802.1AE) prevent it?",
    shortAnswer: "Without link-layer encryption, an attacker who connects an Ethernet hub between an authenticated 802.1X PC and the switch can wait for the user to authenticate, clone the MAC address, and inject malicious traffic (Hub-in-the-Middle). MACsec (802.1AE) provides line-rate Layer 2 AES-GCM encryption on every Ethernet frame between the NIC and switch port, preventing packet injection and snooping.",
    explanation: "MACsec secures the physical Ethernet cable against physical wiretaps and hub injection attacks.",
    hint: "Cloning MAC on an authenticated port; prevented by MACsec Layer 2 hardware AES-GCM encryption.",
    level: "Expert",
    codeExample: `// MACsec (IEEE 802.1AE) Ethernet Frame:
// [ 802.1AE SecTAG (Security Tag + Packet Number) ] [ AES-128/256-GCM Encrypted Payload ] [ 128-bit ICV Tag ]`
  },
  {
    id: 23,
    question: "What is an 'Access-Challenge' (Packet Code 11) in RADIUS and how is it used during Multi-Factor Authentication?",
    shortAnswer: "When a user submits primary credentials (e.g., username and password), the RADIUS server responds with an `Access-Challenge` containing a prompt (e.g., 'Enter 6-digit TOTP code'). The NAS prompts the user and sends a second `Access-Request` containing the OTP response before the server grants final `Access-Accept`.",
    explanation: "This challenge-response handshake enables seamless multi-step and out-of-band MFA across legacy VPN concentrators.",
    hint: "A server packet requesting a secondary credential (like an OTP token) during MFA.",
    level: "Basic",
    codeExample: `// RADIUS Multi-Step Challenge Flow:
// 1. Client ➔ RADIUS : Access-Request (Username: susmita, Password: Password123)
// 2. RADIUS ➔ Client : Access-Challenge (Prompt: "Enter OTP from Google Authenticator")
// 3. Client ➔ RADIUS : Access-Request (State = 0x4A..., User-Password: 491029)
// 4. RADIUS ➔ Client : Access-Accept (Authenticated ✔)`
  },
  {
    id: 24,
    question: "What is the Bell-LaPadula model in Mandatory Access Control (MAC) and what are its two core security properties?",
    shortAnswer: "The Bell-LaPadula model enforces Confidentiality in government and military systems using two rules: 1. Simple Security Property ('No Read Up' - A subject at Clearance Level $L$ cannot read an object at Level $> L$); 2. Star ($\star$) Property ('No Write Down' - A subject at Level $L$ cannot write data down into an object at Level $< L$).",
    explanation: "The 'No Write Down' rule prevents a compromised Top-Secret process from leaking classified intelligence into an unclassified log file.",
    hint: "No Read Up (Simple Security) and No Write Down (Star Property) for confidentiality.",
    level: "Expert",
    codeExample: `// Bell-LaPadula Confidentiality Rules:
// Clearance: Top Secret > Secret > Confidential > Unclassified
// Susmita (Secret) CAN read Confidential (Read Down ✔)
// Susmita (Secret) CANNOT read Top Secret (No Read Up ❌)
// Susmita (Secret) CANNOT write to Unclassified (No Write Down ❌)`
  },
  {
    id: 25,
    question: "What is the Biba Integrity Model and how do its rules contrast with Bell-LaPadula?",
    shortAnswer: "The Biba model enforces Data Integrity (preventing corruption of high-integrity data by low-integrity sources). Rules: 1. Simple Integrity Property ('No Read Down' - Cannot read data from a lower integrity level); 2. Star ($\star$) Integrity Property ('No Write Up' - Cannot write data into a higher integrity level).",
    explanation: "While Bell-LaPadula protects confidentiality (no read up, no write down), Biba protects data integrity (no read down, no write up).",
    hint: "Protects integrity: No Read Down and No Write Up.",
    level: "Expert",
    codeExample: `// Biba Integrity Rules (Opposite of Bell-LaPadula):
// Integrity: Core Kernel > System Daemon > User Process > Untrusted Network
// User Process CANNOT write to Core Kernel (No Write Up ❌)
// Core Kernel CANNOT read raw Untrusted Network input directly (No Read Down ❌)`
  },
  {
    id: 26,
    question: "What is the purpose of the `Acct-Status-Type` attribute in RADIUS Accounting packets?",
    shortAnswer: "It defines the state of the accounting record: `1` (Start - session beginning), `2` (Stop - session termination), `3` (Interim-Update - periodic heartbeat), `7` (Accounting-On - NAS rebooted/ready), `8` (Accounting-Off - NAS shutting down).",
    explanation: "The accounting daemon uses these status types to open, update, and close audit records in billing databases.",
    hint: "Indicates whether the accounting record is a Start, Stop, or Interim-Update.",
    level: "Basic",
    codeExample: `// RADIUS Acct-Status-Type Values:
// 1 = Start
// 2 = Stop
// 3 = Interim-Update`
  },
  {
    id: 27,
    question: "What is 'Role-Based Access Control with Hierarchy' (Hierarchical RBAC / RBAC1)?",
    shortAnswer: "Hierarchical RBAC introduces role inheritance where senior roles automatically inherit all the permissions assigned to subordinate roles (e.g., `SuperAdmin` inherits all permissions of `SecurityLead`, which inherits all permissions of `Auditor`), simplifying permission assignment.",
    explanation: "This avoids duplicating hundreds of individual permissions when creating senior management profiles.",
    hint: "Senior roles automatically inherit all permissions granted to junior roles.",
    level: "Moderate",
    codeExample: `// Role Inheritance Tree:
// [ SuperAdmin ] ──(Inherits)──> [ SecOps_Lead ] ──(Inherits)──> [ Junior_Auditor ]`
  },
  {
    id: 28,
    question: "How do modern organizations implement 'Privileged Access Management' (PAM) vaults for administrative AAA?",
    shortAnswer: "Administrative passwords and SSH private keys are locked inside an enterprise PAM vault (e.g., CyberArk, HashiCorp Vault). When an engineer in Barrackpore needs to configure a core router, they request just-in-time access; the vault generates a temporary one-time credential or proxies the session directly, recording full video and keystroke logs for accounting.",
    explanation: "PAM vaults eliminate shared, static administrative root passwords across infrastructure.",
    hint: "A secure vault that provisions temporary just-in-time credentials and records full session logs.",
    level: "Moderate",
    codeExample: `// PAM Just-in-Time Flow:
// Susmita requests 1-hour access to Core Router ➔ Vault validates MFA & manager approval ➔ Proxies SSH session with 100% keystroke auditing.`
  },
  {
    id: 29,
    question: "What is the `radtest` command-line utility in FreeRADIUS?",
    shortAnswer: "`radtest` is a diagnostic tool that sends synthetic RADIUS `Access-Request` packets to a target RADIUS server on port 1812/1813 with specified credentials, pre-shared key, and NAS attributes to verify server responsiveness and configuration validity.",
    explanation: "Security engineers run `radtest` from the terminal to troubleshoot authentication rejections before deploying switches.",
    hint: "A command-line tool to test RADIUS authentication and server response.",
    level: "Basic",
    codeExample: `// Running radtest:
# radtest susmita Password123 10.14.0.50 0 BarrackporeRadiusSecret2026
// Output: Received Access-Accept Id 1 from 10.14.0.50:1812 (Auth Verified ✔)`
  },
  {
    id: 30,
    question: "What are the primary troubleshooting steps when a user in an 802.1X network receives a switch port 'Authentication Failed' error?",
    shortAnswer: "1. Inspect switch port status: `show authentication sessions interface Gi1/0/24 details`; 2. Check live RADIUS logs: `sudo journalctl -u freeradius -f` or `freeradius -X` (debug mode); 3. Verify client certificate validity and root CA trust chain; 4. Check shared secret matching between switch and RADIUS server; 5. Verify physical VLAN existence on the switch.",
    explanation: "Running FreeRADIUS in debug mode (`freeradius -X`) displays the exact EAP packet exchange and reason for rejection.",
    hint: "Use show authentication sessions, freeradius -X debug mode, check certs, and verify shared secret.",
    level: "Expert",
    codeExample: `// 802.1X Triage Suite:
# sudo freeradius -X # Starts FreeRADIUS in foreground debug mode
# show authentication sessions interface Gi1/0/1
# show dot1x all`
  }
];

export default questions;
