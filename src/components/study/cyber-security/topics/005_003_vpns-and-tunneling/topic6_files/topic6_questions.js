const questions = [
  {
    id: 1,
    question: "What are the three major non-IPsec modern VPN architectures deployed in enterprise environments?",
    shortAnswer: "1. OpenVPN (userspace SSL/TLS tunnel using TUN/TAP virtual adapters); 2. WireGuard (in-kernel Noise Protocol engine with fixed modern cryptography); 3. Browser-based SSL VPN / WebVPN (clientless HTML5 reverse proxy for web browsers).",
    explanation: "Each serves distinct organizational needs: WireGuard provides ultra-fast kernel throughput; OpenVPN provides universal firewall evasion over TCP 443; Browser-based SSL VPN allows unmanaged contractor laptops to access web tools without installing software.",
    hint: "OpenVPN (TLS app), WireGuard (fast kernel tool), and WebVPN (browser portal).",
    level: "Basic",
    codeExample: `// The Non-IPsec Modern Triad:
// OpenVPN     : Userspace OpenSSL Daemon (TCP 443 / UDP 1194)
// WireGuard   : Linux In-Kernel Module (UDP 51820 / Noise Protocol)
// WebVPN (SSL): Clientless HTML5 Reverse Proxy (HTTPS Port 443)`
  },
  {
    id: 2,
    question: "Why is WireGuard considered an architectural revolution compared to OpenVPN and IPsec?",
    shortAnswer: "WireGuard runs directly inside the operating system kernel with an ultra-compact codebase (~4,000 lines of code vs 100,000+ for OpenVPN/IPsec), eliminates complex cipher negotiation by using fixed modern cryptography, establishes connections in 1-RTT, and achieves line-rate multi-gigabit throughput.",
    explanation: "Because the codebase is so small, it can be formally verified for mathematical correctness by security auditors, drastically reducing the attack surface for remote zero-day vulnerabilities.",
    hint: "A tiny 4,000-line kernel program that is 10x faster and mathematically easier to audit for security bugs.",
    level: "Basic",
    codeExample: `// Codebase Comparison:
// OpenVPN / IPsec : ~100,000 to 400,000 Lines of Code (High Attack Surface)
// WireGuard       : ~4,000 Lines of Code (Audited & Formally Verified)`
  },
  {
    id: 3,
    question: "What is WireGuard's 'Silent Listen' (Stealth Mode) behavior when probed by unauthorized port scanners?",
    shortAnswer: "WireGuard does not respond with any data or ICMP error packets to unauthenticated UDP datagrams; port scanners (like Nmap) and internet-wide censors see the port as completely closed or filtered, revealing zero indication of a VPN server.",
    explanation: "In OpenVPN and IPsec, initial handshake packets trigger a response from the server, confirming the server exists. WireGuard verifies the cryptographic MAC before processing; invalid packets are silently dropped with zero response bytes.",
    hint: "Ignoring random internet scanners completely so nobody can even tell a VPN server is running.",
    level: "Moderate",
    codeExample: `// WireGuard Silent Drop:
// Attacker sends UDP probe ➔ WireGuard checks Curve25519 MAC ➔ Fails ➔ DROPS SILENTLY (0 bytes returned!)`
  },
  {
    id: 4,
    question: "What is the 'Noise Protocol Framework' utilized in WireGuard?",
    shortAnswer: "A lightweight cryptographic framework for building secure handshake protocols using Diffie-Hellman key exchanges (Noise_IK pattern: 1-RTT mutual authentication where both initiator and responder know each other's static public keys).",
    explanation: "Noise IK allows WireGuard to achieve mutual authentication, ephemeral session key derivation, and perfect forward secrecy in a single round-trip message exchange without bulky X.509 certificate chains.",
    hint: "The modern cryptographic blueprint that lets WireGuard connect securely in a single round-trip.",
    level: "Moderate",
    codeExample: `// Noise_IK Handshake Pattern:
// 1. Initiator ──(ephemeral_e, encrypted_static_s, auth_tag)──> Responder
// 2. Responder ──(ephemeral_e, encrypted_empty, auth_tag)──────> Initiator ➔ Tunnel Active in 1-RTT!`
  },
  {
    id: 5,
    question: "What are the exact cryptographic primitives permanently fixed in WireGuard?",
    shortAnswer: "1. Curve25519 (ECDH Key Exchange); 2. ChaCha20-Poly1305 (AEAD Authenticated Encryption); 3. BLAKE2s (Cryptographic Hashing); 4. SipHash24 (Hash Table Keys); 5. HKDF (Key Derivation); plus optional 256-bit Post-Quantum Pre-Shared Key (PSK).",
    explanation: "Unlike OpenVPN and IPsec which support hundreds of negotiable cipher combinations (leading to cipher downgrade attacks), WireGuard has zero cipher agility, eliminating all configuration vulnerabilities.",
    hint: "Fixed modern ciphers: Curve25519 for keys, ChaCha20-Poly1305 for encryption, and BLAKE2s for hashing.",
    level: "Moderate",
    codeExample: `// WireGuard Cryptographic Suite:
// Curve25519 (ECDH) + ChaCha20-Poly1305 (AEAD) + BLAKE2s (Hash) + Noise IK (Handshake)`
  },
  {
    id: 6,
    question: "What is 'Userspace TUN/TAP Context Switching Overhead' in OpenVPN?",
    shortAnswer: "Every packet traversing OpenVPN must cross between kernel network space and userspace memory four times: Kernel NIC ➔ Userspace OpenVPN (decrypt) ➔ Kernel TUN adapter ➔ Userspace Application, bottlenecking maximum throughput to ~800 Mbps per core.",
    explanation: "Context switching consumes massive CPU cycles. WireGuard eliminates this by operating entirely inside the kernel (`wg0`), processing packets in-place without memory copying.",
    hint: "Copying data back and forth between the operating system kernel and the OpenVPN app slows it down.",
    level: "Moderate",
    codeExample: `// Context Switch Flow:
// [Kernel NIC] ➔ (Switch to Userspace) ➔ [OpenVPN App] ➔ (Switch to Kernel) ➔ [Virtual TUN] ➔ (Switch to App)`
  },
  {
    id: 7,
    question: "What is 'Clientless Browser-based SSL VPN' (WebVPN) and how does it translate protocols?",
    shortAnswer: "An application-layer reverse proxy that intercepts internal corporate web applications, RDP remote desktops, and SSH terminal sessions, rewriting HTML DOM elements and using WebSockets to render them inside a standard browser tab.",
    explanation: "Because everything runs inside the web browser, users do not need administrative rights on their computer to install network drivers, making it ideal for third-party contractors and personal BYOD devices.",
    hint: "Accessing internal company desktops and tools directly inside a Google Chrome or Firefox tab.",
    level: "Basic",
    codeExample: `// WebVPN Reverse Proxy Flow:
// User Browser ──(HTTPS Port 443)──> WebVPN Gateway ──(Internal RDP / SSH / HTTP)──> Corporate Server`
  },
  {
    id: 8,
    question: "What is 'Cryptographic Routing' in WireGuard?",
    shortAnswer: "Binding each peer's public key directly to an `AllowedIPs` list in the kernel routing table; outgoing packets are automatically encrypted with the key matching the destination IP, and incoming packets are accepted only if encrypted by the key bound to the source IP.",
    explanation: "WireGuard eliminates separate routing and firewall lookup phases. The kernel routing table itself performs cryptographic authentication and access control in a single lookup.",
    hint: "Linking a computer's public encryption key directly to its allowed IP address in the router table.",
    level: "Moderate",
    codeExample: `// WireGuard Config Cryptographic Binding:
// [Peer]
// PublicKey = UHVibGljS2V5...
// AllowedIPs = 10.200.1.45/32 (Kernel routes only this IP to this specific public key!)`
  },
  {
    id: 9,
    question: "What is 'OpenVPN TLS-Crypt' (and TLS-Crypt-V2) and what protection does it provide?",
    shortAnswer: "Encrypting the entire OpenVPN TLS control channel handshake with a pre-shared cryptographic key before transmission, preventing network sniffers and Deep Packet Inspection (DPI) firewalls from seeing certificate names or detecting OpenVPN signatures.",
    explanation: "Standard TLS handshakes reveal certificate subject names in cleartext. `tls-crypt` obfuscates the initial handshake, making OpenVPN look like completely random unidentifiable noise to ISP filters.",
    hint: "Scrambling the connection handshake so internet snoops cannot even tell you are using OpenVPN.",
    level: "Moderate",
    codeExample: `// OpenVPN TLS-Crypt Directive:
// tls-crypt /etc/openvpn/tls-crypt.key (Encrypts both control channel headers and certificates)`
  },
  {
    id: 10,
    question: "What is 'OpenVPN over TCP Port 443 with Port Sharing' (SSL Multiplexing)?",
    shortAnswer: "Configuring OpenVPN to listen on TCP port 443 alongside a real Apache/Nginx HTTPS web server using `port-share`; if a connecting client sends an OpenVPN handshake, it enters the VPN; if it sends standard web traffic, it is forwarded to the website.",
    explanation: "This provides the ultimate firewall evasion. To external network censors and port scanners, `https://corp.in` looks like a normal company website, but authorized VPN clients can tunnel through it.",
    hint: "Sharing port 443 so regular website visitors see a webpage, but employees get a secure VPN tunnel.",
    level: "Moderate",
    codeExample: `// OpenVPN Port-Share Config:
// port 443
// proto tcp
// port-share 127.0.0.1 8443 (Forwards non-VPN HTTPS traffic to Nginx on port 8443)`
  },
  {
    id: 11,
    question: "What is 'Dynamic IP Roaming' in WireGuard vs OpenVPN?",
    shortAnswer: "WireGuard automatically updates the endpoint's physical IP address upon receiving any valid, authenticated packet (the state machine seamlessly migrates when roaming from Wi-Fi to 5G); OpenVPN requires a full TLS re-negotiation upon IP change.",
    explanation: "Because WireGuard is connectionless and authenticates every packet with ChaCha20-Poly1305, an employee can close their laptop in Kolkata, open it in Barrackpore on 5G, and send a packet instantly without reconnecting.",
    hint: "Smoothly switching between home Wi-Fi and mobile 5G without the connection ever dropping.",
    level: "Basic",
    codeExample: `// WireGuard Roaming:
// User Wi-Fi (192.168.1.5) drops ➔ 5G connects (100.64.12.8) ➔ Sends packet ➔ Server updates peer endpoint in 0ms!`
  },
  {
    id: 12,
    question: "What is the 'TUN vs TAP' virtual network driver difference in OpenVPN?",
    shortAnswer: "TUN operates at Layer 3 (IP-only packets, standard for internet and routing); TAP operates at Layer 2 (Ethernet MAC frames, supporting non-IP protocols, broadcast discovery, and bridge networking).",
    explanation: "TUN has lower overhead and works on mobile devices (iOS/Android). TAP is required only if an application needs raw Layer 2 broadcast discovery or NetBIOS name resolution.",
    hint: "TUN works with IP addresses (normal VPNs); TAP works with raw Ethernet network cards.",
    level: "Basic",
    codeExample: `// OpenVPN Mode Selection:
// dev tun  ➔ Layer 3 IP Routing (Recommended for 99% of VPN deployments)
// dev tap  ➔ Layer 2 Ethernet Bridging (Allows broadcast/multicast LAN discovery)`
  },
  {
    id: 13,
    question: "What is 'WireGuard PersistentKeepalive' and when is it required behind NAT routers?",
    shortAnswer: "A configuration directive (e.g. `PersistentKeepalive = 25`) that sends a 32-byte authenticated heartbeat packet every 25 seconds to keep home NAT and firewall state table pinholes open for inbound connections.",
    explanation: "Because WireGuard is completely silent when idle, stateful NAT firewalls expire the UDP translation mapping after 30 to 60 seconds of silence. Keepalives ensure the server can send unsolicited packets to the client.",
    hint: "Sending a tiny 25-second heartbeat ping so your home router doesn't close the VPN door.",
    level: "Moderate",
    codeExample: `// WireGuard Keepalive Setting:
// [Peer]
// PersistentKeepalive = 25`
  },
  {
    id: 14,
    question: "What is 'Browser-based SSL VPN DOM Injection & Cookie Isolation Vulnerability'?",
    shortAnswer: "Because clientless WebVPN rewrites URLs inside the browser DOM, malicious web pages or compromised internal portals can access session cookies from other internal apps sharing the same browser origin domain.",
    explanation: "Modern WebVPN solutions isolate applications inside separate sandbox iframe origins or enforce WebAssembly micro-virtualization to prevent cross-app session hijacking.",
    hint: "The risk of one company web page stealing login cookies from another web page inside the browser.",
    level: "Expert",
    codeExample: `// WebVPN Cookie Sandboxing:
// Set-Cookie: AppSession=XYZ; SameSite=Strict; Secure; HttpOnly; Domain=app1.vpn.corp.in`
  },
  {
    id: 15,
    question: "What is 'DCO' (Data Channel Offload) in modern OpenVPN 2.6+?",
    shortAnswer: "Moving OpenVPN's packet encryption, decryption, and forwarding directly into the Linux/Windows kernel module (`ovpn-dco`), bypassing userspace context switching and tripling OpenVPN throughput to ~3.5 Gbps.",
    explanation: "DCO brings OpenVPN's data path performance close to WireGuard while preserving OpenVPN's flexible TLS authentication and certificate infrastructure.",
    hint: "A new upgrade that moves OpenVPN's encryption into the operating system kernel for 3x higher speed.",
    level: "Expert",
    codeExample: `// OpenVPN DCO Kernel Activation:
// modprobe ovpn-dco
// openvpn --config server.ovpn --dev-node ovpn-dco0`
  },
  {
    id: 16,
    question: "What is 'Tailscale / Netmaker Mesh Topology' built on top of WireGuard?",
    shortAnswer: "Zero-configuration overlay mesh networks that use WireGuard for peer-to-peer encrypted tunnels and a centralized coordination control plane (DERP relays and STUN/ICE) to negotiate direct hole-punching between devices behind double NAT.",
    explanation: "Instead of routing all branch traffic through a central datacenter hub, Tailscale creates direct point-to-point WireGuard connections between all devices globally.",
    hint: "Smart software that automatically builds direct WireGuard tunnels between all your computers.",
    level: "Moderate",
    codeExample: `// Tailscale NAT Hole Punching:
// Device A (Behind NAT) ──(STUN / Direct UDP 51820)──> Device B (Behind NAT) [Direct Mesh Connection!]`
  },
  {
    id: 17,
    question: "What is 'OpenVPN Management Interface' and what security risks does it present if exposed?",
    shortAnswer: "A TCP control socket (e.g. `management 127.0.0.1 7505`) allowing administrators to monitor active clients and terminate sessions; if exposed to untrusted networks without password authentication, attackers can hijack or terminate all VPN connections.",
    explanation: "The management interface must strictly bind to `127.0.0.1` (localhost) or UNIX domain sockets, protected with strong passwords and restricted file system permissions.",
    hint: "A control port used to manage OpenVPN; must never be left open to the internet without a password.",
    level: "Moderate",
    codeExample: `// Secure Management Socket:
// management /run/openvpn/mgmt.sock unix (Bound strictly to local UNIX socket with 0600 permissions)`
  },
  {
    id: 18,
    question: "What is 'WireGuard Key Regeneration and Rekeying Interval'?",
    shortAnswer: "WireGuard automatically renegotiates a new session key every 120 seconds or after transmitting $2^{64}$ bytes (rekey-after-time / rekey-after-messages), seamlessly rotating keys in memory using a fast 1-RTT Noise exchange.",
    explanation: "This limits the cryptographic lifetime of any single symmetric session key to 2 minutes, maintaining continuous forward secrecy with zero packet drops.",
    hint: "Automatically generating a fresh encryption key every 2 minutes without any connection pause.",
    level: "Moderate",
    codeExample: `// WireGuard Rekeying Constant:
// REKEY_AFTER_TIME = 120 seconds
// REJECT_AFTER_TIME = 180 seconds (Old key purged from memory)`
  },
  {
    id: 19,
    question: "What is 'HTML5 Guacamole / Apache Guacamole' in Enterprise Clientless SSL-VPNs?",
    shortAnswer: "An open-source clientless remote desktop gateway that converts RDP, VNC, and SSH protocols into raw HTML5 canvas rendering and WebSockets, allowing employees to control Windows and Linux desktops inside any web browser.",
    explanation: "Guacamole eliminates the need to install Microsoft Remote Desktop or PuTTY clients on end-user machines, providing centralized MFA and session recording at the gateway.",
    hint: "An open-source server that lets you run full Windows remote desktop inside a web browser tab.",
    level: "Moderate",
    codeExample: `// Guacamole Architecture:
// Client Browser ──(HTML5 WebSocket)──> Guacamole Server (guacd) ──(Native RDP Port 3389)──> Internal Windows VM`
  },
  {
    id: 20,
    question: "What is 'Post-Quantum Symmetric PSK (PresharedKey)' in WireGuard configuration?",
    shortAnswer: "An additional 256-bit symmetric pre-shared key mixed into the Noise handshake hash, providing an extra mathematical layer of post-quantum protection on top of Curve25519 elliptic-curve cryptography.",
    explanation: "If quantum computers break Curve25519 in the future, the symmetric PSK ensures the tunnel remains 100% unbreakable by quantum supercomputers.",
    hint: "An extra 256-bit password added to WireGuard to make it completely safe against future quantum computers.",
    level: "Moderate",
    codeExample: `// Generating & Adding WireGuard Quantum PSK:
// wg genpsk > preshared.key
// [Peer] \n PresharedKey = MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=`
  },
  {
    id: 21,
    question: "What is 'OpenVPN Multiple OpenSSL Vulnerabilities' vs WireGuard's Zero-CVE Track Record?",
    shortAnswer: "Because OpenVPN relies on the massive OpenSSL library (~500,000 lines of code), it has historically inherited numerous ASN.1 parsing, buffer overflow, and memory corruption CVEs; WireGuard's self-contained 4,000-line codebase has zero ASN.1 parsing and an exemplary security record.",
    explanation: "Complexity is the enemy of security. By eliminating ASN.1 X.509 certificate parsing and complex cipher negotiation, WireGuard drastically minimizes potential software vulnerabilities.",
    hint: "OpenVPN uses huge complex libraries that can have bugs; WireGuard is tiny and self-contained.",
    level: "Moderate",
    codeExample: `// Security Vulnerability Surface:
// OpenSSL / OpenVPN : Inherits OpenSSL CVEs (Heartbleed, ASN.1 bugs)
// WireGuard Core    : 4,000 lines, self-contained crypto, ZERO ASN.1 parsing`
  },
  {
    id: 22,
    question: "What is 'Client Certificate Revocation List (CRL)' vs 'OCSP' in OpenVPN PKI management?",
    shortAnswer: "CRL is a static list of revoked certificate serial numbers downloaded periodically by the OpenVPN server; OCSP (Online Certificate Status Protocol) queries the Certificate Authority in real time upon every connection attempt.",
    explanation: "If an employee is terminated, their certificate must be revoked immediately. If the OpenVPN server's CRL is not updated, the revoked certificate can still establish VPN connections until the CRL expires.",
    hint: "A blacklist of canceled employee digital certificates that the VPN server checks before letting people log in.",
    level: "Moderate",
    codeExample: `// OpenVPN CRL Directive:
// crl-verify /etc/openvpn/crl.pem (Re-checked on every client handshake)`
  },
  {
    id: 23,
    question: "What is 'WireGuard Mobile Battery Optimization' on Android and iOS?",
    shortAnswer: "Because WireGuard has no keepalive chatter by default, creates no wake-locks, and uses fast ChaCha20 crypto, mobile devices can remain in deep CPU sleep states for hours without consuming battery until data is actually transmitted.",
    explanation: "Legacy OpenVPN sends constant periodic ping packets that wake the mobile CPU every 10 seconds, draining battery rapidly. WireGuard only wakes the CPU when an application generates network traffic.",
    hint: "WireGuard sleeps quietly when no data is moving, saving your phone's battery all day long.",
    level: "Basic",
    codeExample: `// WireGuard Mobile Efficiency:
// Zero Background Ping Traffic ➔ Mobile CPU stays in Deep Sleep ➔ Near-Zero Battery Drain!`
  },
  {
    id: 24,
    question: "What is 'WFP (Windows Filtering Platform) Kill-Switch' integration in WireGuard for Windows?",
    shortAnswer: "WireGuard for Windows installs low-level kernel WFP callout drivers that block all non-tunnel network traffic to `0.0.0.0/0` if the encrypted connection drops, guaranteeing zero cleartext leaks during network transitions.",
    explanation: "This low-level Windows kernel driver enforces security below the application layer, ensuring that DNS queries and HTTP connections cannot bypass the VPN tunnel under any circumstances.",
    hint: "A Windows security driver that blocks all internet if the VPN drops to prevent accidental data leaks.",
    level: "Moderate",
    codeExample: `// WireGuard Windows Block Untunneled Traffic:
// BlockUntunneledTraffic = true (Installs WFP kernel firewall rules preventing all cleartext leaks)`
  },
  {
    id: 25,
    question: "What is the statutory CERT-In requirement regarding 'SSL/TLS & WireGuard Session Records' in India?",
    shortAnswer: "Organizations must retain complete records of all remote access user logins, assigned virtual IPs, real source IPs, connecting public keys/certificates, timestamps, and data volume transferred for 180 days within Indian jurisdiction.",
    explanation: "Statutory directives require synchronizing all gateway timestamps with NPL India NTP servers to ensure forensically undisputed audit trails during cybersecurity investigations.",
    hint: "180-day retention of all WireGuard public key sessions, OpenVPN certificates, and connection records under Indian law.",
    level: "Basic",
    codeExample: `// Structured CERT-In Modern VPN Session Log:
const certInSessionLog = {
  timestamp: "2026-08-23T14:35:00.340Z",
  vpnProtocol: "WIREGUARD_IN_KERNEL",
  clientPublicKey: "WG_PUBKEY_BARRACKPORE_DOCTOR_01",
  assignedVirtualIp: "10.200.1.42",
  realOriginIp: "203.0.113.88",
  dataTransferredBytes: 145892000,
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Shadowsocks / V2Ray / Trojan' obfuscation in hostile censorship environments?",
    shortAnswer: "Circumvention protocols that disguise VPN traffic by wrapping it in genuine TLS 1.3 web traffic with valid public HTTPS certificates, defeating Deep Packet Inspection (DPI) filters that block standard WireGuard or OpenVPN signatures.",
    explanation: "Authoritarian firewalls use machine learning to detect OpenVPN and WireGuard packet length signatures. Obfuscation protocols make traffic completely indistinguishable from normal web browsing.",
    hint: "Disguising VPN traffic to look exactly like normal HTTPS website browsing to bypass state censorship.",
    level: "Expert",
    codeExample: `// Trojan-GFW Architecture:
// Client ──(Genuine TLS 1.3 on Port 443)──> Trojan Gateway ➔ Bypasses State Machine Learning DPI Filters!`
  },
  {
    id: 27,
    question: "What is 'Clientless WebVPN Reverse Proxy Header Rewriting' and how does it handle JavaScript URLs?",
    shortAnswer: "The WebVPN gateway parses all HTML, CSS, and JavaScript files returned by internal servers on the fly, rewriting internal URLs (e.g. `http://internal.corp.in/api`) to external reverse-proxy paths (e.g. `https://vpn.corp.in/proxy/internal_corp/api`).",
    explanation: "If a web page uses dynamic JavaScript `fetch()` calls with hardcoded internal URLs, the gateway must intercept and rewrite them so the user's browser does not attempt to reach an unreachable internal IP.",
    hint: "Rewriting internal company website links on the fly so they work inside your web browser.",
    level: "Expert",
    codeExample: `// Reverse Proxy URL Rewriting:
// Original HTML: <a href="http://intranet.corp.in/payroll">
// Rewritten HTML: <a href="https://vpn.corp.in/webvpn/proxy/intranet/payroll">`
  },
  {
    id: 28,
    question: "What is 'SAML 2.0 / Okta / Azure AD' integration with OpenVPN Access Server?",
    shortAnswer: "Configuring OpenVPN to authenticate users via web-based SAML Single Sign-On (SSO), prompting the user with a browser login window that enforces Multi-Factor Authentication (MFA) and Conditional Access policies.",
    explanation: "This integrates VPN access into corporate identity lifecycle management: when an employee leaves the company, disabling their Azure AD account automatically revokes VPN access in real time.",
    hint: "Using your standard corporate Microsoft or Google single sign-on with phone MFA to connect to OpenVPN.",
    level: "Moderate",
    codeExample: `// SAML Authentication Flow:
// OpenVPN Client opens browser ➔ User completes FIDO2 MFA on Azure AD ➔ SAML Assertion Token returned to OpenVPN`
  },
  {
    id: 29,
    question: "What is 'WireGuard wg-quick' utility and how does it automate routing and DNS configuration?",
    shortAnswer: "A standard helper bash script that creates the `wg0` network interface, assigns IP addresses, configures DNS servers via `resolvconf` or `systemd-resolved`, and installs `iptables` / `nftables` NAT rules specified in `wg0.conf`.",
    explanation: "`wg-quick` simplifies WireGuard administration into single commands (`wg-quick up wg0` / `wg-quick down wg0`), automating interface setup and routing table changes.",
    hint: "A handy tool that sets up the WireGuard network card, routes, and DNS with one simple command.",
    level: "Basic",
    codeExample: `// WireGuard Quick Commands:
// wg-quick up wg0   (Brings up tunnel, sets IP, configures routing and DNS)
// wg-quick down wg0 (Tears down interface and restores previous routing table)`
  },
  {
    id: 30,
    question: "Synthesize the architectural selection framework: When should an enterprise deploy WireGuard vs OpenVPN vs Clientless Browser WebVPN?",
    shortAnswer: "Deploy WireGuard as the primary enterprise remote access and mesh protocol for managed corporate devices requiring multi-gigabit throughput, minimal battery consumption, and stealth operation; deploy OpenVPN over TCP port 443 as a resilient fallback for roaming workers trapped in restrictive networks that block UDP; deploy Clientless Browser WebVPN for third-party contractors and unmanaged personal BYOD devices requiring zero software footprint—operating in full compliance with CERT-In directives and the DPDP Act 2023.",
    explanation: "A mature hybrid architecture integrates all three: WireGuard delivers line-rate performance for corporate laptops, OpenVPN provides guaranteed connectivity across restrictive firewalls, and WebVPN securely connects external vendors without installing software.",
    hint: "WireGuard for fast company laptops; OpenVPN TCP 443 for restrictive hotel firewalls; WebVPN for external contractors.",
    level: "Moderate",
    codeExample: `// The Master Non-IPsec Architecture:
// Managed Corporate Laptops : [WireGuard In-Kernel @ UDP 51820 (4.2 Gbps)]
// Restrictive Firewalls     : [OpenVPN TCP @ Port 443 (Fallback Mode)]
// Third-Party Contractors   : [Clientless Browser WebVPN (HTML5 Reverse Proxy)]`
  }
];

export default questions;
