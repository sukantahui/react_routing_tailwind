import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgMitmId = useId();

  // Studio 1: Active MitM Threat Vector Selection
  const [selectedMitmKey, setSelectedMitmKey] = useState("ssl_stripping");

  // Studio 2: Live SSLstrip vs HSTS Simulator State
  const [isHstsPreloaded, setIsHstsPreloaded] = useState(true);
  const [attemptCleartextHttp, setAttemptCleartextHttp] = useState(false);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_hsts_preload");

  // Studio 4: Anti-MitM Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("hsts_nginx");

  // 8 MitM Threat Vector Profiles for Studio 1
  const mitmDatabase = {
    ssl_stripping: {
      key: "ssl_stripping",
      name: "SSL / TLS Stripping (Moxie SSLstrip)",
      category: "TRANSPORT DOWNGRADE MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (HTTP / TLS)",
      threatMechanism:
        "Adversary intercepts the initial cleartext HTTP redirect (`302 Found ➔ https://bank.in`) and proxies the connection, serving cleartext HTTP to the user's browser while maintaining HTTPS to the bank server.",
      vulnerabilityRoot: "Browsers initiating initial connection over unencrypted HTTP without HSTS Preload enforcement.",
      productionDefense: "HTTP Strict Transport Security (HSTS with Preload list) + DNS CAA Records.",
      codeSnippet: `// Nginx Strict Transport Security (HSTS) Header:
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
# Forces browser to upgrade all http:// URLs to https:// internally before sending bytes.`
    },
    arp_cache_poisoning: {
      key: "arp_cache_poisoning",
      name: "ARP Cache Poisoning & MAC Spoofing",
      category: "DATA LINK LAYER MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 2 (Data Link / Ethernet)",
      threatMechanism:
        "Attacker broadcasts forged gratuitous ARP replies across the switch claiming to be the default gateway, causing all subnet traffic to route directly through the attacker's machine.",
      vulnerabilityRoot: "Ethernet endpoints accepting unauthenticated, unsolicited ARP replies dynamically.",
      productionDefense: "Dynamic ARP Inspection (DAI) + DHCP Snooping + IEEE 802.1X Port Security.",
      codeSnippet: `// Switch Dynamic ARP Inspection (DAI):
switch(config)# ip dhcp snooping
switch(config)# ip dhcp snooping vlan 10
switch(config)# ip arp inspection vlan 10`
    },
    evil_twin_wifi: {
      key: "evil_twin_wifi",
      name: "Rogue Wi-Fi Evil Twin / Karma Attack",
      category: "WIRELESS PHYSICAL MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Physical / Layer 2 (802.11 Wi-Fi)",
      threatMechanism:
        "Attacker clones a legitimate public SSID (`Kolkata_Free_WiFi`) with high transmitter power. Client devices auto-associate, routing all traffic through the attacker's proxy gateway.",
      vulnerabilityRoot: "Open, unencrypted Wi-Fi networks (WPA2-PSK) lacking cryptographic 802.1X server authentication.",
      productionDefense: "WPA3-Enterprise (802.1X EAP-TLS with Mutual Certificate Validation) + VPN tunnels.",
      codeSnippet: `// Wi-Fi Supplicant 802.1X EAP-TLS Config:
network={
    ssid="Enterprise_Secure_WiFi"
    key_mgmt=WPA-EAP
    eap=TLS
    ca_cert="/etc/ssl/certs/corporate_root_ca.pem"
    client_cert="/etc/ssl/certs/mamata_user.crt"
    private_key="/etc/ssl/certs/mamata_user.key"
}`
    },
    dns_hijacking_mitm: {
      key: "dns_hijacking_mitm",
      name: "DNS Query Interception & Spoofing",
      category: "NAME RESOLUTION MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (DNS / UDP 53)",
      threatMechanism:
        "In-line router intercepts cleartext UDP 53 DNS queries for `portal.bank.in` and returns the attacker's server IP, redirecting the browser to an evil proxy portal.",
      vulnerabilityRoot: "Cleartext, unauthenticated UDP DNS protocol without cryptographic signature verification.",
      productionDefense: "DNSSEC Validation + DNS-over-HTTPS (DoH / Port 443) + DNS-over-TLS (DoT).",
      codeSnippet: `// Linux systemd-resolved DNS-over-TLS Configuration (/etc/systemd/resolved.conf):
[Resolve]
DNS=1.1.1.1 9.9.9.9
DNSOverTLS=yes
DNSSEC=yes`
    },
    wpad_proxy_hijack: {
      key: "wpad_proxy_hijack",
      name: "WPAD Auto-Discovery Proxy Hijacking",
      category: "LAN PROTOCOL MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (NetBIOS / LLMNR / HTTP)",
      threatMechanism:
        "Attacker responds to Windows LLMNR/NBT-NS queries for `wpad.local`, delivering a malicious Proxy Auto-Config (`wpad.dat`) script that routes all browser HTTP/HTTPS traffic through the attacker.",
      vulnerabilityRoot: "Windows default fallback to broadcast LLMNR/NetBIOS name resolution for proxy discovery.",
      productionDefense: "Disabling LLMNR and NetBIOS via Group Policy (GPO) + Disabling WPAD in browsers.",
      codeSnippet: `// Disable LLMNR via Windows Group Policy (GPO):
// Computer Configuration -> Administrative Templates -> Network -> DNS Client
// Policy: "Turn off multicast name resolution" -> ENABLED`
    },
    bgp_wan_hijack: {
      key: "bgp_wan_hijack",
      name: "BGP Prefix Hijacking (WAN Traffic Detour)",
      category: "INTERNET BACKBONE MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 3 (BGP-4 Routing)",
      threatMechanism:
        "Rogue autonomous system advertises a more specific BGP prefix (/24), diverting global traffic across a foreign data center for MitM inspection before relaying to the real destination.",
      vulnerabilityRoot: "Global BGP routers blindly accepting route advertisements without cryptographic ownership proof.",
      productionDefense: "Resource Public Key Infrastructure (RPKI) Route Origin Authorization (ROA) validation.",
      codeSnippet: `// Cisco BGP RPKI Route Origin Authorization Check:
router bgp 65000
 bgp origin-as validation enable
!
route-map RPKI-FILTER drop 10
 match rpki invalid`
    },
    rogue_root_ca_mitm: {
      key: "rogue_root_ca_mitm",
      name: "Rogue / Enterprise Root CA HTTPS Decryption",
      category: "CRYPTOGRAPHIC CERTIFICATE MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 7 (TLS Handshake)",
      threatMechanism:
        "Adversary installs a custom Root CA certificate in the victim's OS trust store (or compromises a sub-CA), generating on-the-fly SSL certificates for `bank.in` to decrypt all HTTPS streams.",
      vulnerabilityRoot: "Browsers blindly trusting all certificates signed by any authority in the OS root store.",
      productionDefense: "Certificate Public Key Pinning (HPKP / SPKI Pins) + Certificate Transparency (CT) logs.",
      codeSnippet: `// Mobile App Certificate Pinning (iOS / Swift):
let serverTrustPolicy = ServerTrustPolicy.pinPublicKeys(
    publicKeys: ServerTrustPolicy.publicKeys(in: Bundle.main),
    validateCertificateChain: true,
    validateHost: true
)`
    },
    diffie_hellman_mitm: {
      key: "diffie_hellman_mitm",
      name: "Unauthenticated Diffie-Hellman Key Exchange MitM",
      category: "KEY EXCHANGE MATHEMATICAL MitM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Cryptographic Presentation Layer",
      threatMechanism:
        "Adversary intercepts public parameters $g^a$ and $g^b$, substituting their own parameter $g^e$, computing shared keys with both Alice and Bob ($g^{ea}$ and $g^{eb}$) to transparently decrypt all traffic.",
      vulnerabilityRoot: "Diffie-Hellman protocol lacking digital signature authentication over exchange parameters.",
      productionDefense: "Authenticated ECDH (SIGMA Protocol) with Ed25519/ECDSA digital signatures.",
      codeSnippet: `// SIGMA Protocol Authenticated Key Agreement (TLS 1.3):
// Server transmits: Ephemeral_ECDH_Public_Key + Ed25519_Signature(Handshake_Transcript)
// Client verifies signature using trusted X.509 server certificate before generating shared key.`
    }
  };

  const activeMitm = mitmDatabase[selectedMitmKey];

  // Studio 2: Live SSLstrip vs HSTS Simulator Logic
  const sslstripSimResult = useMemo(() => {
    if (isHstsPreloaded) {
      return {
        protocolUsed: "HTTPS (Encrypted TLS 1.3 - Port 443)",
        browserState: "INTERNAL REDIRECT (HSTS Preload List Triggered)",
        mitmStatus: "SSLSTRIP MITM BLOCKED: Browser refused to send cleartext HTTP; upgraded internally to HTTPS.",
        badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
        isSecure: true
      };
    } else {
      if (attemptCleartextHttp) {
        return {
          protocolUsed: "HTTP (Cleartext - Port 80)",
          browserState: "SSLSTRIP PROXY ACTIVE: Redirect stripped by in-line attacker.",
          mitmStatus: "MITM SUCCESSFUL! Attacker intercepted cleartext HTTP session; captured bank credentials in plaintext!",
          badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
          isSecure: false
        };
      } else {
        return {
          protocolUsed: "HTTPS (Standard TLS - No Preload)",
          browserState: "VULNERABLE ON FIRST VISIT (TOFU Window Open)",
          mitmStatus: "Standard HTTPS active, but vulnerable to SSLstrip if user ever visits via cleartext http:// link.",
          badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
          isSecure: false
        };
      }
    }
  }, [isHstsPreloaded, attemptCleartextHttp]);

  // Studio 4: Anti-MitM Code Database
  const codeDatabase = {
    hsts_nginx: {
      name: "Production HSTS Preload (Nginx)",
      code: `# /etc/nginx/sites-available/bank.conf
server {
    listen 80;
    server_name portal.kolkatabank.in;
    # Immediate 301 Permanent Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name portal.kolkatabank.in;
    
    # Enforce HSTS with 2-year duration, subdomains, and Preload submission eligibility
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # Modern TLS 1.3 Configuration
    ssl_protocols TLSv1.3;
    ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;
}`,
      explanation: "Configures HTTP Strict Transport Security (HSTS) with a 2-year `max-age` and `preload` flag, qualifying the domain for inclusion in Chrome/Firefox/Safari hardcoded preloaded lists."
    },
    android_cert_pinning: {
      name: "Android Mobile Certificate Pinning (XML)",
      code: `<!-- res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains="true">api.kolkatabank.in</domain>
        <pin-set expiration="2027-01-01">
            <!-- SHA-256 SPKI Pin of Primary Certificate -->
            <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
            <!-- SHA-256 SPKI Pin of Backup Disaster Recovery Certificate -->
            <pin digest="SHA-256">k2oTX1jXXoyEmfikwztRVC42EXotPOJIOyP6zpn1Pew=</pin>
        </pin-set>
    </domain-config>
</network-security-config>`,
      explanation: "Hardcodes the SHA-256 public key hash of the bank's API server inside the mobile app binary, completely blocking rogue root CAs and proxy interception tools like Burp Suite."
    },
    cisco_dai_snooping: {
      name: "Cisco Dynamic ARP Inspection & DHCP Snooping",
      code: `! Enable DHCP Snooping globally and on production VLANs
ip dhcp snooping
ip dhcp snooping vlan 10,20
ip dhcp snooping information option

! Configure trusted uplink port connected to legitimate DHCP server
interface GigabitEthernet0/0/24
 description Core Uplink to Authenticated DHCP Server
 ip dhcp snooping trust
 ip arp inspection trust

! Enable Dynamic ARP Inspection (DAI) on production VLANs
ip arp inspection vlan 10,20
ip arp inspection validate src-mac dst-mac ip`,
      explanation: "Prevents local ARP cache poisoning and rogue DHCP server MitM attacks by inspecting every ARP frame against the authenticated DHCP snooping database."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_hsts_preload",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Hub",
      title: "Defeating SSLstrip & Evil Twin Attacks with HSTS Preload & mTLS",
      threatType: "TRANSPORT DOWNGRADE MitM (SSLstrip & Evil Twin)",
      budget: "₹31,00,000",
      incident:
        "Security researchers demonstrated that banking customers connecting from coffee shop Wi-Fi in Salt Lake had their sessions downgraded to cleartext HTTP using SSLstrip, capturing passwords in plaintext.",
      defenseStrategy:
        "Mamata submitted the bank domain to the Chromium HSTS Preload List, hardcoding HTTPS across all major global web browsers, and implemented Mutual TLS (mTLS) for mobile banking API endpoints.",
      outcome: "SSLstrip rendered 100% ineffective; browsers refuse cleartext connections under all circumstances.",
      metrics: {
        hstsPreloadStatus: "Hardcoded in Chrome / Safari / Firefox",
        sslStripSuccessRate: "0.00%",
        mobileApiSecured: "100% mTLS Certificate Binding",
        compliance: "RBI Cyber Security Framework Section 5.1"
      }
    },
    {
      id: "barrackpore_dai_ot_mitm",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "LAYER 2 ARP POISONING MitM (SCADA Interception)",
      title: "Eliminating Local ARP Spoofing MitM on SCADA Substation LANs",
      budget: "₹18,50,000",
      incident:
        "During a physical audit, a rogue device connected to a maintenance port in the substation switchboard broadcasted poisoned ARP replies, attempting to position as a transparent MitM on Modbus TCP telemetry.",
      defenseStrategy:
        "Debangshu enabled Dynamic ARP Inspection (DAI), DHCP Snooping, and IEEE 802.1X Port Security across all substation switches, instantly dropping non-compliant ARP frames.",
      outcome: "Rogue device port shut down automatically; zero SCADA telemetry compromised.",
      metrics: {
        arpPoisoningBlocked: "100% Interception",
        substationsHardened: "18 High-Voltage Nodes",
        switchConvergenceTime: "0.1 ms",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_telemed_evil_twin",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "ROGUE WI-FI EVIL TWIN MitM (Telemedicine Siphoning)",
      title: "Protecting Cancer Consultation Feeds with Certificate Pinning",
      budget: "₹11,00,000",
      incident:
        "An adversary set up an Evil Twin Wi-Fi access point in the hospital parking lot (`Hospital_Guest_WiFi`), attempting to intercept WebRTC video consultations and steal patient diagnostic records.",
      defenseStrategy:
        "Mahima deployed Mobile Certificate Pinning and enforced WPA3-Enterprise (802.1X EAP-TLS) on all clinical tablets, ensuring consultations connect only to authenticated hospital servers.",
      outcome: "Rogue Wi-Fi MitM attempt completely blocked; patient confidentiality preserved.",
      metrics: {
        telemedTabletsProtected: "450 Hospital Devices",
        pinningVerificationSpeed: "0.1 ms",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_sigma_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL KEY EXCHANGE MitM (Diffie-Hellman)",
      title: "Formal Verification of SIGMA Authenticated Key Exchange",
      budget: "₹13,50,000",
      incident:
        "Researchers simulated an unauthenticated Diffie-Hellman parameter substitution attack on legacy academic VPNs, proving that an in-line attacker can establish dual encrypted sessions without detection.",
      defenseStrategy:
        "Susmita and Abhronila formally verified and migrated the VPN gateway to the SIGMA protocol utilizing Ephemeral Curve25519 (X25519) authenticated with Ed25519 digital signatures.",
      outcome: "Mathematically proved 100% immunity against parameter substitution and MitM key generation.",
      metrics: {
        formalVerificationTool: "ProVerif & Tamarin Prover",
        keyExchangeLatency: "1.1 ms",
        cryptographicStandard: "TLS 1.3 SIGMA / RFC 8446",
        publication: "Journal of Cryptology"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 07
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active Attacks: Man-in-the-Middle (MitM) Attacks
            </h1>
            <p className="text-xs text-gray-400">
              SSLstrip downgrade, ARP spoofing, Evil Twin Wi-Fi, HSTS Preload, Certificate Pinning, and mTLS defenses.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & The MitM Dual-Session Paradox */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Active In-Line Interposition
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Architecture of Man-in-the-Middle: Breaking Confidentiality &amp; Integrity
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A <strong>Man-in-the-Middle (MitM) Attack</strong> is an active threat where an in-line adversary secretly establishes 
              <strong>two independent encrypted sessions</strong> with the communicating endpoints. The client encrypts data for the 
              attacker thinking it is the server; the attacker decrypts, reads, alters, and re-encrypts the data to the server, 
              completely violating both <strong>Confidentiality</strong> and <strong>Integrity</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dual Session Card 1 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Dual-Session Interception Model
              </span>
              <p className="text-gray-300 leading-relaxed">
                Alice believes she is connected to Bob, but is actually connected to Attacker (Eve). Eve decrypts Alice's message, 
                modifies <code className="text-rose-300">amount: ₹500 ➔ ₹50,000</code>, re-encrypts with Bob's key, and forwards it.
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60">
                Alice ➔ [Key_AE] ➔ Eve (Plaintext Tamper) ➔ [Key_EB] ➔ Bob
              </div>
            </div>

            {/* Cryptographic Solution Card 2 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The Solution: Authenticated Key Exchange (SIGMA Protocol)
              </span>
              <p className="text-gray-300 leading-relaxed">
                In modern TLS 1.3, unauthenticated Diffie-Hellman is replaced with digitally signed ephemeral keys (SIGMA protocol), 
                and browsers enforce <strong>HSTS Preload</strong> and <strong>Certificate Pinning</strong> to make MitM impossible.
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60">
                Verify_Signature( g^a || g^b, Ed25519_Cert ) === TRUE
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - In-Line MitM Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              In-Line Interposition Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Dual-Session Interception, SSLstrip Downgrade &amp; HSTS Shielding
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how an in-line proxy intercepts communications, downgrades SSL, and how HSTS Preloading forces the 
              browser to refuse cleartext connections:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* NODE 1: CLIENT (Alice) */}
              <g transform="translate(40, 100)">
                <rect width="180" height="130" rx="12" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="90" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  CLIENT (Alice)
                </text>
                <text x="90" y="48" fill="#bfdbfe" fontSize="10" textAnchor="middle">
                  Kolkata User Browser
                </text>
                <rect x="15" y="60" width="150" height="55" rx="6" fill="#0f172a" />
                <text x="90" y="80" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">
                  SESSION 1 (Key_AE)
                </text>
                <text x="90" y="98" fill="#bfdbfe" fontSize="8.5" textAnchor="middle">
                  Thinks she is talking to Bank
                </text>
              </g>

              {/* PATH 1: Alice -> Attacker */}
              <path d="M 220 165 L 360 165" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="5" fill="#f43f5e">
                <animateMotion path="M 220 165 L 360 165" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 2: IN-LINE MitM ATTACKER (Eve) */}
              <g transform="translate(360, 70)">
                <rect width="210" height="190" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="105" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  MitM PROXY (Eve)
                </text>
                <text x="105" y="46" fill="#fecdd3" fontSize="9.5" textAnchor="middle">
                  SSLstrip / Burp Suite / ARP Spoof
                </text>

                <rect x="15" y="58" width="180" height="55" rx="6" fill="#4c0519" />
                <text x="105" y="76" fill="#fda4af" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  DECRYPTS PLAIN TEXT:
                </text>
                <text x="105" y="94" fill="#ffffff" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  Pass: Secret123 | ₹50,000
                </text>

                <rect x="15" y="122" width="180" height="55" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="105" y="140" fill="#fca5a5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  RE-ENCRYPTS TO BOB:
                </text>
                <text x="105" y="158" fill="#ffffff" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  Uses Server Key_EB
                </text>
              </g>

              {/* PATH 2: Attacker -> Server */}
              <path d="M 570 165 L 680 165" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="5" fill="#f43f5e">
                <animateMotion path="M 570 165 L 680 165" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 3: SERVER (Bob) */}
              <g transform="translate(680, 100)">
                <rect width="160" height="130" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  SERVER (Bob)
                </text>
                <text x="80" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                  Kolkata Bank Gateway
                </text>

                <rect x="15" y="60" width="130" height="55" rx="6" fill="#022c22" />
                <text x="80" y="80" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">
                  SESSION 2 (Key_EB)
                </text>
                <text x="80" y="98" fill="#d1fae5" fontSize="8.5" textAnchor="middle">
                  Thinks he is talking to Alice
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector MitM Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Man-in-the-Middle Threat Vector &amp; Downgrade Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a MitM threat vector below to examine its interception mechanics, vulnerability root cause, 
              live attack trace, and production mitigation code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(mitmDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedMitmKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedMitmKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  MitM
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeMitm.categoryBadge)}>
                    {activeMitm.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeMitm.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeMitm.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Interception Mechanism &amp; Threat
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMitm.threatMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Root Cause
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMitm.vulnerabilityRoot}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Production Cryptographic Defense
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMitm.productionDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Configuration &amp; Policy Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeMitm.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live SSLstrip vs HSTS Preload Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. SSLstrip Downgrade vs. HSTS Preload Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Toggle HSTS Preload protection below to simulate how an in-line SSLstrip proxy downgrades an unencrypted HTTP 
              connection, and how HSTS Preloading forces the browser to refuse cleartext connections:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Browser &amp; Domain HSTS Settings</h3>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">HSTS Domain Status:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsHstsPreloaded(true)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      isHstsPreloaded
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    ✔ HSTS Preloaded (Hardcoded)
                  </button>
                  <button
                    onClick={() => setIsHstsPreloaded(false)}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      !isHstsPreloaded
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  >
                    ✖ No HSTS Preload (Vulnerable)
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAttemptCleartextHttp(!attemptCleartextHttp)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    attemptCleartextHttp
                      ? "bg-amber-950 border-amber-500 text-amber-300"
                      : "bg-gray-900 border-gray-800 text-gray-300"
                  )}
                >
                  {attemptCleartextHttp ? "⚡ Attacker Intercepting: http://portal.bank.in" : "Direct User Visit: https://portal.bank.in"}
                </button>
              </div>
            </div>

            {/* Live Evaluation Feed */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Browser &amp; Proxy Diagnostic Feed</h3>

              <div className="space-y-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Active Wire Protocol</span>
                  <span className="font-mono text-xs font-bold text-white block">{sslstripSimResult.protocolUsed}</span>
                  <p className="text-gray-400 text-[11px]">{sslstripSimResult.browserState}</p>
                </div>

                <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", sslstripSimResult.badgeClass)}>
                  <span className="font-bold block uppercase tracking-wider text-[10px]">MitM Inspection Result:</span>
                  <p className="mt-1 font-bold">{sslstripSimResult.mitmStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-MitM Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Production Configuration &amp; Pinning
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-MitM Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Nginx HSTS configurations, Android certificate pinning XML schemas, and Cisco DAI/DHCP Snooping commands:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Config
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita defeat active Man-in-the-Middle 
              threats across critical West Bengal infrastructure:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; MitM Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Frameworks &amp; Statutory Penalties for MitM in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence treats active packet interception and MitM proxying with severe criminal penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                IT Act 2000 Section 66 &amp; 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking &amp; data interception carries <span className="text-rose-400 font-bold">up to 3 years imprisonment</span> and fines up to ₹5 Lakhs.
                </li>
                <li>
                  <strong className="text-white">Section 66D:</strong> Cheating by Personation via MitM proxying carries up to 3 years prison + ₹1 Lakh fine.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Section 69 Lawful Interception
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Sovereign Order Required:</strong> Lawful interception requires explicit written authorization signed by the Union or State Home Secretary.
                </li>
                <li>
                  <strong className="text-white">60-Day Review:</strong> Mandatory bi-monthly review by the Cabinet Oversight Committee.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(5) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory Transport Encryption:</strong> Failing to enforce TLS 1.3 / HSTS on citizen data triggers fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Assuming HTTPS is Immune to SSLstrip:</strong> Without HSTS Preload, an attacker intercepts the initial unencrypted HTTP redirect.
                </li>
                <li>
                  <strong>Relying on Raw Diffie-Hellman:</strong> Diffie-Hellman without digital signatures is 100% vulnerable to parameter substitution MitM.
                </li>
                <li>
                  <strong>Ignoring Certificate Pinning in Mobile Apps:</strong> Compromised root CAs allow proxies to decrypt mobile banking streams.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Submit to HSTS Preload:</strong> Hardcode HTTPS in all global web browsers to eliminate the initial cleartext HTTP vulnerability.
                </li>
                <li>
                  <strong>Deploy Dynamic ARP Inspection (DAI):</strong> Protect switch VLANs against ARP cache poisoning and gateway impersonation.
                </li>
                <li>
                  <strong>Enforce Mutual TLS (mTLS):</strong> Require client X.509 certificates on all microservice API gateways.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  If a translator is in the middle of a phone call, how do you verify you are talking to the real person without trusting the translator?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does HSTS Preloading prevent SSLstrip even on the very first time a user visits a website?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the simulator above, toggle HSTS Preload off and test a cleartext HTTP visit—see how the proxy intercepts the stream.
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MitM attacks break both Confidentiality and Integrity via dual encrypted sessions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Unauthenticated Diffie-Hellman is vulnerable to MitM; TLS 1.3 uses signed ECDH (SIGMA).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HSTS Preload forces browsers to use HTTPS exclusively, eliminating SSLstrip.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic ARP Inspection (DAI) + DHCP Snooping eliminates ARP cache poisoning on switches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Certificate Pinning protects mobile apps against rogue or compromised root CAs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66D of the IT Act penalizes MitM personation and phishing with 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attacks: Man-in-the-Middle (MitM) FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Interception Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active Attacks: Man-in-the-Middle Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Man-in-the-Middle (MitM) attacks demonstrate why encryption without authentication is useless! If you establish an encrypted session with an imposter, your encryption is protecting the imposter, not you! Always enforce Mutual TLS (mTLS) with authenticated digital certificates, submit your web domains to the HSTS Preload list to defeat SSLstrip, implement Dynamic ARP Inspection (DAI) on local switches, and use Certificate Pinning on mobile applications!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
