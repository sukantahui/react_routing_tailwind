import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgMasqId = useId();

  // Studio 1: Active Masquerade Vector Selection
  const [selectedMasqKey, setSelectedMasqKey] = useState("email_spoofing");

  // Studio 2: DMARC Simulator State
  const [dmarcPolicy, setDmarcPolicy] = useState("reject");
  const [isDkimSigned, setIsDkimSigned] = useState(false);
  const [isSpfMatch, setIsSpfMatch] = useState(false);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_dmarc_enforce");

  // Studio 4: Anti-Spoofing Configuration Tab
  const [activeConfigTab, setActiveConfigTab] = useState("cisco_urpf");

  // 8 Masquerade Threat Vector Profiles for Studio 1
  const masqueradeDatabase = {
    email_spoofing: {
      key: "email_spoofing",
      name: "Email Sender Masquerading (CEO Fraud / Phishing)",
      category: "APPLICATION LAYER IDENTITY SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "SMTP (Port 25/587)",
      exploitationMechanism:
        "Standard SMTP does not authenticate the `From:` header. An attacker connects to any open mail relay and transmits `MAIL FROM: <ceo@kolkatabank.in>`, tricking accountants into transferring multi-crore funds.",
      attackVectorPayload: "From: 'Executive Director' <ceo@kolkatabank.in> ➔ Subject: 'Urgent Wire Transfer ₹25,00,000'",
      defenseProtocol: "DMARC (p=reject) + DKIM 2048-bit RSA / Ed25519 Signatures + SPF DNS TXT Records.",
      configSnippet: `// DNS DMARC Enforcement Record:
_dmarc.kolkatabank.in. IN TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc@kolkatabank.in"`
    },
    ip_spoofing: {
      key: "ip_spoofing",
      name: "IP Address Header Spoofing",
      category: "NETWORK LAYER MASQUERADE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "IPv4 / IPv6 Raw Sockets",
      exploitationMechanism:
        "An attacker writes a forged source IP into the IPv4 packet header. Routers route purely based on destination IP, allowing attackers to impersonate trusted subnets in UDP amplification or blind TCP attacks.",
      attackVectorPayload: "Packet: Src IP = 192.168.1.10 (Admin Mamata) | Dst IP = 192.168.1.1 (Gateway)",
      defenseProtocol: "BCP 38 / Unicast Reverse Path Forwarding (uRPF Strict Mode) on border routers.",
      configSnippet: `// Cisco Router uRPF Strict Mode Configuration:
interface GigabitEthernet0/1
 ip verify unicast source reachable-via rx
// Discards all packets whose source IP does not match the ingress interface routing table!`
    },
    arp_poisoning: {
      key: "arp_poisoning",
      name: "ARP Cache Poisoning & MAC Spoofing",
      category: "DATA LINK LAYER SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "ARP / Ethernet (Layer 2)",
      exploitationMechanism:
        "Attacker floods gratuitous ARP replies across the switch: `192.168.1.1 is at Attacker_MAC`. Subnet hosts update their ARP tables, routing all gateway traffic directly through the attacker.",
      attackVectorPayload: "Gratuitous ARP: IP = 192.168.1.1 (Gateway) ➔ MAC = 00:11:22:33:44:55 (Attacker)",
      defenseProtocol: "Dynamic ARP Inspection (DAI) + DHCP Snooping + IEEE 802.1X Port Security.",
      configSnippet: `// Switch Dynamic ARP Inspection (DAI):
switch(config)# ip dhcp snooping
switch(config)# ip dhcp snooping vlan 10
switch(config)# ip arp inspection vlan 10`
    },
    dns_cache_poisoning: {
      key: "dns_cache_poisoning",
      name: "DNS Cache Poisoning (Kaminsky Exploit)",
      category: "NAME RESOLUTION SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "DNS (UDP Port 53)",
      exploitationMechanism:
        "Attacker queries recursive resolvers for random non-existent subdomains and floods thousands of forged DNS responses guessing the 16-bit Transaction ID, poisoning authoritative NS records for entire domains.",
      attackVectorPayload: "Forged DNS Response: 'kolkatabank.in NS = ns.attacker.in (A = 198.51.100.45)'",
      defenseProtocol: "DNSSEC (RRSIG, DNSKEY, DS Cryptographic Chains of Trust) + Source Port Randomization.",
      configSnippet: `// BIND9 DNSSEC Validation Configuration (named.conf.options):
dnssec-validation auto;
auth-nxdomain no;
listen-on-v6 { any; };`
    },
    bgp_prefix_hijack: {
      key: "bgp_prefix_hijack",
      name: "BGP Prefix Hijacking (AS-Path Spoofing)",
      category: "INTERNET ROUTING SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "BGP-4 (TCP Port 179)",
      exploitationMechanism:
        "A rogue autonomous system announces a more specific IP prefix (/24 instead of /16) to steal global internet traffic intended for banks or government agencies.",
      attackVectorPayload: "BGP Route Announcement: Prefix 103.25.10.0/24 ➔ Origin AS65000 (Rogue ISP)",
      defenseProtocol: "Resource Public Key Infrastructure (RPKI) Route Origin Authorization (ROA) validation.",
      configSnippet: `// Cisco BGP RPKI Route Filtering:
router bgp 65000
 bgp origin-as validation enable
!
route-map RPKI-CHECK drop 10
 match rpki invalid`
    },
    fido2_phishing_masquerade: {
      key: "fido2_phishing_masquerade",
      name: "Credential Harvesting / Reverse Proxy Phishing",
      category: "USER LAYER IDENTITY MASQUERADE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "HTTP / WebAuthn (Layer 7)",
      exploitationMechanism:
        "Adversary deploys an Evilginx reverse proxy on a lookalike domain (`bank-secure.in`), tricking users into typing passwords and SMS OTPs to capture session cookies.",
      attackVectorPayload: "Phishing Proxy: Captures session cookie `PHPSESSID=d8a7ef90...` ➔ Replays to real portal",
      defenseProtocol: "FIDO2 / WebAuthn Hardware Security Keys with Origin-Bound Public Key Cryptography.",
      configSnippet: `// WebAuthn Origin Verification on Server (Node.js):
const expectedOrigin = "https://portal.kolkatabank.in";
if (clientDataJSON.origin !== expectedOrigin) {
  throw new SecurityError("Phishing Masquerade Detected: Origin mismatch!");
}`
    },
    rogue_dhcp_server: {
      key: "rogue_dhcp_server",
      name: "Rogue DHCP Server Masquerading",
      category: "LAN INFRASTRUCTURE SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "DHCP (UDP Ports 67/68)",
      exploitationMechanism:
        "Attacker starves the legitimate DHCP server with fake MAC requests, then acts as a rogue DHCP server assigning its own IP as the Default Gateway and DNS server for all subnet workstations.",
      attackVectorPayload: "DHCP ACK: Gateway = 192.168.1.50 (Attacker IP) | DNS = 192.168.1.50",
      defenseProtocol: "DHCP Snooping on Enterprise Switches (Restricting DHCP ACKs to trusted uplink ports).",
      configSnippet: `// Switch DHCP Snooping Configuration:
switch(config)# ip dhcp snooping
switch(config-if)# ip dhcp snooping trust # Applied ONLY to uplink connected to legitimate DHCP server`
    },
    blind_tcp_spoofing: {
      key: "blind_tcp_spoofing",
      name: "Blind TCP Sequence Number Guessing",
      category: "TRANSPORT LAYER SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetProtocol: "TCP (Layer 4)",
      exploitationMechanism:
        "Attacker spoofs a trusted server's IP and guesses the 32-bit TCP Initial Sequence Number (ISN) to inject unauthorized commands into trusted R-services or database sockets.",
      attackVectorPayload: "Forged TCP ACK: AckNum = 0x4f8e1200 (Guessed ISN) | Payload: 'GRANT ALL PRIVILEGES'",
      defenseProtocol: "RFC 6528 Cryptographic PRF Initial Sequence Number Generation + IPsec ESP.",
      configSnippet: `// Linux Kernel Cryptographic TCP ISN Generation:
// ISN = M + PRF_Key(Local_IP, Local_Port, Remote_IP, Remote_Port)
// Guarantees sequence numbers are mathematically unpredictable without the kernel secret key.`
    }
  };

  const activeMasq = masqueradeDatabase[selectedMasqKey];

  // Studio 2: Live DMARC Simulator Logic
  const dmarcSimResult = useMemo(() => {
    const isAligned = isSpfMatch || isDkimSigned;

    if (isAligned) {
      return {
        emailStatus: "DELIVERED TO INBOX (100% Authentic)",
        dmarcAction: "PASS: Email authenticated via " + (isSpfMatch ? "SPF " : "") + (isDkimSigned ? "DKIM" : ""),
        badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
        isDelivered: true
      };
    } else {
      // Unaligned Spoofed Email
      if (dmarcPolicy === "none") {
        return {
          emailStatus: "DELIVERED TO INBOX (Spoofing Succeeded!)",
          dmarcAction: "MONITOR ONLY (p=none): Spoofed email delivered without warning; SOC alerted via RUA report.",
          badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
          isDelivered: true
        };
      } else if (dmarcPolicy === "quarantine") {
        return {
          emailStatus: "DIVERTED TO SPAM / JUNK FOLDER",
          dmarcAction: "QUARANTINE (p=quarantine): Suspicious spoofed email quarantined; employee protected.",
          badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
          isDelivered: false
        };
      } else {
        // Reject Policy
        return {
          emailStatus: "DROPPED AT SMTP GATEWAY (550 Mail Rejected)",
          dmarcAction: "REJECT (p=reject): Spoofed email dropped at border; employee inbox receives 0 phishing emails!",
          badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
          isDelivered: false
        };
      }
    }
  }, [dmarcPolicy, isDkimSigned, isSpfMatch]);

  // Studio 4: Anti-Spoofing Configuration Tabs
  const configDatabase = {
    cisco_urpf: {
      name: "Cisco BCP 38 / uRPF Ingress Filtering",
      code: `! Configure Unicast Reverse Path Forwarding (uRPF) Strict Mode
interface GigabitEthernet0/0/1
 description Ingress Interface from Customer Subnet
 ip address 103.25.10.1 255.255.255.0
 ip verify unicast source reachable-via rx
!
! Verify dropped spoofed packets:
show ip traffic | include Drop`,
      explanation: "Strict uRPF verifies that the source IP of every inbound packet is reachable via the interface on which it arrived. Spoofed packets are dropped immediately at the line card level."
    },
    bind_dnssec: {
      name: "BIND9 DNSSEC Cryptographic Validation",
      code: `// /etc/bind/named.conf.options
options {
    directory "/var/cache/bind";
    dnssec-validation auto;
    auth-nxdomain no;
    listen-on-v6 { any; };
    
    // Enable source port randomization:
    use-v4-port-randomization yes;
};`,
      explanation: "Enables automated DNSSEC chain-of-trust validation from the ICANN root zone down to the requested domain, dropping any forged DNS responses resulting from Kaminsky cache poisoning."
    },
    dmarc_txt_record: {
      name: "Production DMARC / DKIM DNS Records",
      code: `;; SPF TXT Record for Authorized Mail Servers
kolkatabank.in. IN TXT "v=spf1 ip4:103.25.10.50 include:_spf.google.com -all"

;; DKIM 2048-bit Public Key Record
default._domainkey.kolkatabank.in. IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFA..."

;; DMARC Mandatory Reject Policy Record
_dmarc.kolkatabank.in. IN TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-reports@kolkatabank.in"`,
      explanation: "Defines the holy trinity of email authentication: SPF defines valid sending IPs, DKIM publishes the public verification key, and DMARC mandates 100% rejection of unaligned emails."
    }
  };

  const activeConfig = configDatabase[activeConfigTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_dmarc_enforce",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Eliminating CEO Email Phishing with Strict DMARC p=reject",
      threatType: "EMAIL SENDER MASQUERADING (CEO Impersonation Fraud)",
      budget: "₹26,00,000",
      incident:
        "Cyber criminals spoofed the bank's domain `ceo@kolkatabank.in` to send urgent fake wire transfer instructions to junior accounts personnel, nearly causing a ₹45 Lakh unauthorized payout.",
      defenseStrategy:
        "Mamata implemented 100% DKIM 2048-bit RSA signing, strict SPF IP whitelisting, and enforced DMARC policy `p=reject` with daily automated RUA aggregation reports.",
      outcome: "100% of external spoofed emails rejected at receiving mail servers; phishing masquerades completely eradicated.",
      metrics: {
        spoofedEmailsBlocked: "14,200 Fake Messages",
        dmarcPolicyEnforced: "p=reject (100% Strict)",
        customerTrustScore: "99.8%",
        compliance: "RBI Master Direction on Cyber Security Section 5"
      }
    },
    {
      id: "barrackpore_dai_8021x",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "LAYER 2 ARP POISONING & MAC MASQUERADE",
      title: "Hardening Substation Switches with DAI & 802.1X PNAC",
      budget: "₹18,00,000",
      incident:
        "A rogue contractor laptop plugged into a maintenance port and broadcasted spoofed ARP replies claiming to be the default SCADA gateway, attempting to intercept industrial telemetry.",
      defenseStrategy:
        "Debangshu enabled IEEE 802.1X EAP-TLS certificate authentication on all switch ports and activated Dynamic ARP Inspection (DAI) bound to the switch DHCP Snooping database.",
      outcome: "Rogue laptop port disabled immediately (err-disable); zero substation telemetry intercepted.",
      metrics: {
        roguePortsQuarantined: "1 Maintenance Jack",
        arpPoisoningAttemptsBlocked: "100% DAI Interception",
        substationsProtected: "18 High-Voltage Nodes",
        statutoryMandate: "NCIIPC Critical Infrastructure Directive"
      }
    },
    {
      id: "ichapur_dnssec_resolver",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "DNS CACHE POISONING (Kaminsky Exploit)",
      title: "Securing Telemedicine Resolvers with DNSSEC Cryptographic Chains",
      budget: "₹10,20,000",
      incident:
        "A network audit revealed the internal hospital recursive DNS resolver was vulnerable to Kaminsky cache poisoning, which could have redirected telemedicine video feeds to a rogue server.",
      defenseStrategy:
        "Mahima upgraded hospital resolvers to BIND9 with full DNSSEC validation enabled, enforcing cryptographic RRSIG verification back to the ICANN root zone for all health domains.",
      outcome: "Eliminated all DNS cache poisoning vulnerabilities; verified 100% domain authenticity for clinical video feeds.",
      metrics: {
        dailyDnsQueriesSecured: "4.8 Million Queries",
        dnssecValidationTime: "0.4 ms overhead",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_rpki_bgp",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Internet Research Lab",
      threatType: "BGP ROUTE SPOOFING (Prefix Hijacking)",
      title: "Deploying RPKI Route Origin Authorization on Border Gateways",
      budget: "₹14,50,000",
      incident:
        "Researchers simulated a BGP route hijack where a rogue autonomous system advertised a /24 prefix belonging to a West Bengal state portal, hijacking user traffic at upstream transit providers.",
      defenseStrategy:
        "Susmita and Abhronila registered Route Origin Authorizations (ROAs) with APNIC and configured border routers to automatically drop all BGP announcements marked 'RPKI Invalid'.",
      outcome: "BGP prefix hijack attempt dropped at border router; legitimate traffic routed without interruption.",
      metrics: {
        roaPrefixesSigned: "12 Subnet Blocks",
        bgpHijacksPrevented: "100% Invalid Dropped",
        bgpConvergenceTime: "Under 3 Seconds",
        publication: "IEEE Internet Computing Journal"
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
                Topic 05
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Active Attacks: Masquerade &amp; Identity Spoofing
            </h1>
            <p className="text-xs text-gray-400">
              IP/MAC spoofing, DMARC/DKIM/SPF email defense, DNSSEC validation, BCP 38 uRPF, and Dynamic ARP Inspection.
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

        {/* SECTION 1: Executive Theory & The Masquerade Mechanism */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Active Identity Impersonation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Mechanics of Masquerade: Forging Digital Identity Credentials
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A <strong>Masquerade Attack</strong> occurs when an adversary pretentiously assumes the digital identity of a trusted 
              user, gateway, or service. Unlike passive eavesdropping which only listens, masquerade actively manufactures 
              false credentials—forging IP headers, cloning MAC addresses, spoofing email senders, or poisoning DNS records—violating 
              both <strong>Authenticity</strong> and <strong>Integrity</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Root Cause Card 1 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The Legacy Protocol Vulnerability
              </span>
              <p className="text-gray-300 leading-relaxed">
                Foundational internet protocols (IPv4, SMTP, DNS, ARP, BGP) were engineered in an era of implicit trust, 
                routing packets and accepting sender identities without cryptographic source validation.
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60">
                Forged Identity: I_fake ➔ Claims to be I_legitimate (Admin, Gateway, Bank Domain)
              </div>
            </div>

            {/* Cryptographic Defense Card 2 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The Cryptographic Solution: Explicit Source Proof
              </span>
              <p className="text-gray-300 leading-relaxed">
                Modern defense eliminates implicit trust by enforcing cryptographic source authentication at every layer: 
                <strong>DMARC/DKIM</strong> for email, <strong>DNSSEC</strong> for domains, <strong>uRPF</strong> for IP routing, 
                and <strong>Dynamic ARP Inspection (DAI)</strong> for LAN switching.
              </p>
              <div className="bg-black/90 p-3 rounded font-mono text-emerald-300 border border-emerald-950/60">
                Proof of Origin: Verify_Pub( H(Message), Signature ) === TRUE
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - ARP Poisoning vs DAI Switch Filtering */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Layer 2 Masquerade Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing ARP Cache Poisoning &amp; Dynamic ARP Inspection (DAI) Switch Defense
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how a rogue laptop broadcasts a spoofed gratuitous ARP claim, and how an enterprise switch with 
              Dynamic ARP Inspection (DAI) inspects the frame against the DHCP Snooping database to drop the masquerade:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* NODE 1: ROGUE ATTACKER LAPTOP */}
              <g transform="translate(40, 100)">
                <rect width="190" height="130" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="95" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ROGUE ATTACKER
                </text>
                <text x="95" y="48" fill="#fecdd3" fontSize="10" textAnchor="middle">
                  MAC: 00:11:22:33:44:55
                </text>
                <rect x="15" y="60" width="160" height="55" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="95" y="78" fill="#fca5a5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  SPOOFED ARP REPLY:
                </text>
                <text x="95" y="94" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  192.168.1.1 is at Attacker_MAC
                </text>
                <text x="95" y="108" fill="#fda4af" fontSize="8" textAnchor="middle">
                  (Claims to be Default Gateway)
                </text>
              </g>

              {/* PATH 1: Attacker &rarr; Switch */}
              <path d="M 230 165 L 360 165" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="5" fill="#f43f5e">
                <animateMotion path="M 230 165 L 360 165" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* NODE 2: ENTERPRISE SWITCH WITH DAI */}
              <g transform="translate(360, 70)">
                <rect width="220" height="190" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="110" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  CISCO SWITCH (DAI ACTIVE)
                </text>
                <text x="110" y="46" fill="#7dd3fc" fontSize="9.5" textAnchor="middle">
                  Dynamic ARP Inspection Engine
                </text>

                <rect x="15" y="58" width="190" height="60" rx="6" fill="#082f49" />
                <text x="105" y="76" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  DHCP SNOOPING BINDING:
                </text>
                <text x="105" y="92" fill="#e0f2fe" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  192.168.1.1 ➔ MAC: AA:BB:CC:11:22
                </text>
                <text x="105" y="106" fill="#7dd3fc" fontSize="8" textAnchor="middle">
                  (Authenticated Gateway Hardware)
                </text>

                <rect x="15" y="128" width="190" height="45" rx="6" fill="#450a0a" stroke="#f43f5e" />
                <text x="105" y="146" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                  BINDING MISMATCH!
                </text>
                <text x="105" y="162" fill="#fca5a5" fontSize="8.5" textAnchor="middle">
                  ARP Spoofed Frame DROPPED!
                </text>
              </g>

              {/* PATH 2: Switch &rarr; Victim (Blocked) */}
              <path d="M 580 165 L 680 165" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              <text x="630" y="155" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                BLOCKED
              </text>

              {/* NODE 3: VICTIM WORKSTATION (Mamata) */}
              <g transform="translate(680, 100)">
                <rect width="160" height="130" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  VICTIM WORKSTATION
                </text>
                <text x="80" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                  Mamata (Barrackpore)
                </text>

                <rect x="15" y="60" width="130" height="55" rx="6" fill="#022c22" />
                <text x="80" y="80" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">
                  ARP TABLE PROTECTED
                </text>
                <text x="80" y="98" fill="#d1fae5" fontSize="8" textAnchor="middle">
                  Legitimate Gateway MAC Retained Cleanly
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Masquerade Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Identity Masquerade &amp; Spoofing Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a masquerade vector below to inspect its operational mechanics, target protocol, 
              live attack trace, and production mitigation code:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(masqueradeDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedMasqKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedMasqKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  MASQUERADE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeMasq.categoryBadge)}>
                    {activeMasq.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Protocol: {activeMasq.targetProtocol}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeMasq.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Mechanism &amp; Identity Forgery
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMasq.exploitationMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Observed Forged Payload / Attack Trace
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeMasq.attackVectorPayload}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Cryptographic &amp; Protocol Defense
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMasq.defenseProtocol}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Configuration &amp; Rule Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeMasq.configSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Email Spoofing & DMARC Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Email Spoofing &amp; DMARC Policy Enforcement Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Configure SPF, DKIM, and DMARC enforcement policies below to simulate how mail servers handle spoofed 
              emails claiming to be from <code className="text-cyan-300">ceo@kolkatabank.in</code>:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">DMARC Policy &amp; Key Settings</h3>

              <div className="space-y-2">
                <span className="text-gray-400 text-[10px] uppercase block">Select DMARC Policy (p=):</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setDmarcPolicy("none")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      dmarcPolicy === "none"
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    p=none (Monitor)
                  </button>
                  <button
                    onClick={() => setDmarcPolicy("quarantine")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      dmarcPolicy === "quarantine"
                        ? "bg-blue-950 border-blue-500 text-blue-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    p=quarantine
                  </button>
                  <button
                    onClick={() => setDmarcPolicy("reject")}
                    className={clsx(
                      "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300 text-center",
                      dmarcPolicy === "reject"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    p=reject (Strict)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setIsSpfMatch(!isSpfMatch)}
                  className={clsx(
                    "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300",
                    isSpfMatch
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-gray-900 border-gray-800 text-gray-400"
                  )}
                &gt;
                  {isSpfMatch ? "✔ SPF IP Matched" : "✖ SPF Check Failed (Spoofed IP)"}
                </button>
                <button
                  onClick={() => setIsDkimSigned(!isDkimSigned)}
                  className={clsx(
                    "p-2.5 rounded-lg border font-bold text-xs transition-all duration-300",
                    isDkimSigned
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-gray-900 border-gray-800 text-gray-400"
                  )}
                &gt;
                  {isDkimSigned ? "✔ DKIM Valid Signature" : "✖ DKIM Unsigned / Fake"}
                </button>
              </div>
            </div>

            {/* Live Gateway Evaluation Feed */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Mail Gateway Decision Feed</h3>

              <div className="space-y-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Inbound Message Header</span>
                  <div className="font-mono text-[11px] text-white bg-black/80 p-2.5 rounded border border-gray-800">
                    From: &lt;ceo@kolkatabank.in&gt;<br />
                    Subject: Urgent Wire Transfer ₹25,00,000<br />
                    Originating IP: 198.51.100.45 (Attacker Server)
                  </div>
                </div>

                <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", dmarcSimResult.badgeClass)}>
                  <span className="font-bold block uppercase tracking-wider text-[10px]">Gateway DMARC Action:</span>
                  <p className="mt-1 font-bold">{dmarcSimResult.emailStatus}</p>
                  <p className="text-[11px] text-gray-300 mt-1">{dmarcSimResult.dmarcAction}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-Spoofing Configuration Lab */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Network Engineering &amp; DNS Lab
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-Spoofing Configuration Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production router, DNS resolver, and mail gateway configurations used to defeat IP, DNS, and email spoofing:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(configDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveConfigTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeConfigTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeConfig.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Config
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeConfig.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeConfig.code}
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita defeat active masquerade 
              and identity spoofing attacks across West Bengal critical infrastructure:
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
              &gt;
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
                  The Incident &amp; Masquerade Threat
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
              7. Legal Penalties for Identity Theft &amp; Personation in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence treats active digital masquerade and identity spoofing with severe criminal penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                IT Act 2000 Section 66C
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Identity Theft:</strong> Fraudulently using another person's electronic signature, password, or biometric identifier carries <span className="text-rose-400 font-bold">up to 3 years imprisonment</span> and fines up to ₹1 Lakh.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Cheating or committing financial fraud by pretending to be someone else using a computer resource carries <span className="text-rose-400 font-bold">up to 3 years imprisonment</span> and ₹1 Lakh fine.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Section 8(5) &amp; 33
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Failure to Protect Identity:</strong> Failing to implement reasonable safeguards (like MFA) against masquerade triggers penalties up to <span className="text-rose-400 font-bold">₹250 CRORES</span>.
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
                  <strong>Setting DMARC to p=none Permanently:</strong> `p=none` is only for monitoring; you must transition to `p=reject` to actually block spoofed emails!
                </li>
                <li>
                  <strong>Relying on MAC Addresses for Security:</strong> MAC addresses are trivial to clone in software; never use them for access control without 802.1X.
                </li>
                <li>
                  <strong>Ignoring uRPF on Border Routers:</strong> Failing to enable BCP 38 / uRPF allows attackers to launch spoofed UDP DDoS attacks from your network.
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
                  <strong>Enforce FIDO2 WebAuthn Passkeys:</strong> Origin-bound cryptography eliminates credential harvesting and phishing proxy masquerades.
                </li>
                <li>
                  <strong>Deploy Dynamic ARP Inspection (DAI):</strong> Protect switch VLANs against ARP cache poisoning and Man-in-the-Middle hijacking.
                </li>
                <li>
                  <strong>Enable DNSSEC on All Resolvers:</strong> Cryptographically validate RRSIG signatures to prevent Kaminsky DNS cache poisoning.
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
                  If anyone can write any name on the return address of an envelope, how does the post office prove where it really came from?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does WebAuthn fail on a phishing website even if the user types their correct master PIN?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the DMARC simulator above, toggle the policy from `p=none` to `p=reject` to see how the mail server drops spoofed messages.
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
                <span>Masquerade actively forges digital identities to gain unauthorized trust and access.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IP Spoofing is blocked at router borders using BCP 38 / uRPF Ingress Filtering.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DMARC (`p=reject`) combined with SPF and DKIM eliminates email sender spoofing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DNSSEC uses hierarchical cryptographic signatures (RRSIG) to stop cache poisoning.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic ARP Inspection (DAI) + DHCP Snooping stops ARP cache poisoning on switches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66D of the IT Act specifically punishes Cheating by Personation with 3 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attacks: Masquerade & Spoofing FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Identity Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Active Attacks: Masquerade and Identity Spoofing (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Masquerade and identity spoofing attacks exploit the absence of cryptographic source verification in legacy protocols! Anyone can write an arbitrary IP address, MAC address, or email 'From:' header unless cryptographic controls are enforced. Always implement the Email Authentication Trio (SPF + DKIM + DMARC p=reject), mandate BCP 38 uRPF on edge routers, and enable Dynamic ARP Inspection (DAI) on LAN switches. Remember that Section 66D of the Indian IT Act criminalizes digital personation and phishing with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
