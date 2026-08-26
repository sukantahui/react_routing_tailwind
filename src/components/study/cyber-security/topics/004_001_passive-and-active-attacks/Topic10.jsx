import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgZeroTrustId = useId();

  // Studio 1: Active Defense Technique Selection
  const [selectedDefenseKey, setSelectedDefenseKey] = useState("aead_ghash_verification");

  // Studio 2: Live SOAR Remediation Simulator State
  const [activeIncidentType, setActiveIncidentType] = useState("dai_arp_spoof");
  const [isSoarAutoEnabled, setIsSoarAutoEnabled] = useState(true);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_zero_trust_fintech");

  // Studio 4: Active Defense Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("envoy_mtls");

  // 8 Active Defense Techniques for Studio 1
  const defenseDatabase = {
    aead_ghash_verification: {
      key: "aead_ghash_verification",
      name: "AEAD Galois GHASH Invariant Verification",
      category: "CRYPTOGRAPHIC DATA INTEGRITY",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 7 / Cryptographic Transport (TLS 1.3)",
      protectionMechanism:
        "Computes a 128-bit Galois Authentication Tag (GHASH) over both ciphertext and headers. If an in-line attacker flips even 1 bit in transit, tag verification fails ($P_detect = 1 - 2^{-128}$), dropping the packet instantly.",
      activeThreatStopped: "In-Flight Message Tampering, Bit-Flipping Malleability, and Payload Rewriting.",
      keyMetric: "Detection Probability: 99.9999999999999999999999999999999999999% (1 - 2^-128)",
      configSnippet: `// Node.js AEAD Integrity Check:
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(receivedTag);
decipher.update(ciphertext);
decipher.final(); // Throws error immediately if tampered!`
    },
    fido2_webauthn: {
      key: "fido2_webauthn",
      name: "FIDO2 / WebAuthn Origin-Bound Public Key Auth",
      category: "IDENTITY & ACCESS ZERO TRUST",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Layer 7 (Application Identity)",
      protectionMechanism:
        "Replaces shared passwords and SMS OTPs with asymmetric public key cryptography generated inside hardware security chips (YubiKey / Secure Enclave). The hardware signs challenges only for matching domain origins.",
      activeThreatStopped: "Credential Masquerading, Phishing Portals, Session Hijacking, and SMS OTP Interception.",
      keyMetric: "Phishing Resistance: 100% (Cryptographically Bound to Domain Origin)",
      configSnippet: `// WebAuthn Browser Origin Verification:
navigator.credentials.get({
  publicKey: { challenge: serverChallenge, rpId: "portal.kolkatabank.in" }
});`
    },
    dai_dhcp_snooping: {
      key: "dai_dhcp_snooping",
      name: "Dynamic ARP Inspection (DAI) + DHCP Snooping",
      category: "DATA LINK LAYER DEFENSE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 2 (Switch Hardware ASIC)",
      protectionMechanism:
        "The switch ASIC intercepts every broadcast ARP frame on untrusted access ports, validating IP-to-MAC bindings against the authenticated DHCP Snooping database and dropping spoofed packets at wire speed.",
      activeThreatStopped: "ARP Cache Poisoning, Gateway Spoofing, and Local Layer 2 Man-in-the-Middle Attacks.",
      keyMetric: "Packet Inspection Latency: <0.1 µs in switch hardware ASICs",
      configSnippet: `// Cisco Switch DAI Configuration:
switch(config)# ip dhcp snooping
switch(config)# ip dhcp snooping vlan 10
switch(config)# ip arp inspection vlan 10`
    },
    ipsec_anti_replay_window: {
      key: "ipsec_anti_replay_window",
      name: "IPsec RFC 4303 64-Bit Anti-Replay Sliding Window",
      category: "TRANSPORT & NETWORK DEFENSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 4 (IPsec ESP / Network Protocol)",
      protectionMechanism:
        "Maintains a 64-packet bitmask tracking verified sequence numbers. Packets with sequence numbers behind the window or already marked in the bitmask are dropped immediately without decryption.",
      activeThreatStopped: "Replay Attacks, Duplicate Wire Transfers, and Delayed Command Injections.",
      keyMetric: "Window Size: 64 to 1024 Packets | Overhead: 1 Bitmask evaluation per packet",
      configSnippet: `// IPsec Anti-Replay Window Verification:
if (seq >= max_seq - 63) {
    if (bitmap & (1 << (max_seq - seq))) drop_packet(); // REPLAY!
    bitmap |= (1 << (max_seq - seq));
}`
    },
    soar_auto_containment: {
      key: "soar_auto_containment",
      name: "SOAR Automated Attack Containment (<200 ms)",
      category: "SECURITY ORCHESTRATION & RESPONSE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Security Operations (SIEM / API Orchestration)",
      protectionMechanism:
        "Programmatic playbooks triggered by SIEM alerts execute automated remediation: shutting down switch ports via API, revoking OAuth tokens, and injecting edge firewall drop rules in sub-second time.",
      activeThreatStopped: "Active Lateral Movement, Insider Data Tampering, and Botnet Floods.",
      keyMetric: "Mean Time to Contain (MTTC): <150 milliseconds (vs 30 minutes human SOC)",
      configSnippet: `// SOAR Playbook Automated Port Shutdown:
cisco_switch.shutdown_port(switch_id="SW_KOLKATA_04", port="Gig0/12")
oauth_server.revoke_user_tokens(user_id="compromised_user")`
    },
    bcp38_urpf: {
      key: "bcp38_urpf",
      name: "BCP 38 Unicast Reverse Path Forwarding (uRPF)",
      category: "BORDER ROUTING DEFENSE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 3 (Internet Edge Routers)",
      protectionMechanism:
        "Edge routers verify that the source IP address of an incoming packet matches a valid route in the Forwarding Information Base (FIB) reachable via the receiving interface; spoofed source IPs are dropped.",
      activeThreatStopped: "IP Address Spoofing, UDP Reflection Amplification Attacks, and Bogon Injections.",
      keyMetric: "Spoofed Ingress Drop Rate: 100% on non-routable prefixes",
      configSnippet: `// Cisco IOS uRPF Configuration:
interface GigabitEthernet0/0/1
 ip verify unicast source reachable-via rx`
    },
    rpki_bgp_validation: {
      key: "rpki_bgp_validation",
      name: "Resource Public Key Infrastructure (RPKI BGP Validation)",
      category: "GLOBAL ROUTING INTEGRITY",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Layer 3 (BGP-4 Internet Backbone)",
      protectionMechanism:
        "Validates BGP route announcements against cryptographically signed Route Origin Authorizations (ROAs) published by Regional Internet Registries (APNIC), dropping invalid hijacked BGP prefixes.",
      activeThreatStopped: "BGP Prefix Hijacking, WAN Traffic Detours, and Global Internet Man-in-the-Middle Attacks.",
      keyMetric: "BGP ROA Cryptographic Verification: RFC 6480 Standard",
      configSnippet: `// Cisco IOS-XR RPKI Configuration:
router bgp 65000
 bgp origin-as validation enable
!
route-map RPKI-FILTER drop 10
 match rpki invalid`
    },
    token_bucket_waf: {
      key: "token_bucket_waf",
      name: "Token Bucket WAF Rate Limiting & CAPTCHA",
      category: "APPLICATION LAYER FLOOD DEFENSE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 7 (Web Application Firewall)",
      protectionMechanism:
        "Allocates token buckets with refill rate $r$ and burst capacity $B$ to incoming client IPs; excess requests receive HTTP 429 or are challenged with Proof-of-Work puzzles.",
      activeThreatStopped: "HTTP Layer 7 Floods, Credential Stuffing, and Brute-Force Bot Attacks.",
      keyMetric: "Throughput: 1,000,000 RPS filtered | CPU Overhead: <1%",
      configSnippet: `// Nginx Token Bucket Rate Limiting:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
}`
    }
  };

  const activeDefense = defenseDatabase[selectedDefenseKey];

  // Studio 2: Live SOAR Simulator Calculation
  const soarIncidentProfiles = {
    dai_arp_spoof: {
      name: "Layer 2 ARP Spoofing Detected on Switch Port Gig0/12",
      threat: "Host Mamata_Dev attempting to claim Gateway IP 192.168.1.1",
      soarAction: "API Call: Shuts down switch port Gig0/12 + Alerts SOC",
      containmentTime: "120 ms",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    aead_tamper: {
      name: "AEAD GHASH Tag Mismatch on Financial Transaction API",
      threat: "In-flight payload modified: amount ₹500 ➔ ₹50,000",
      soarAction: "Immediate Packet Drop + Session Token Revoked in Redis",
      containmentTime: "15 ms",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    syn_flood_ddos: {
      name: "TCP SYN Flood Exceeding 1,000,000 Mpps on Substation Gateway",
      threat: "Half-open socket buffer exhaustion attack",
      soarAction: "Activates Linux SYN Cookies + Injects BGP FlowSpec Drop Rule",
      containmentTime: "180 ms",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeIncident = soarIncidentProfiles[activeIncidentType];

  const soarStatus = useMemo(() => {
    if (isSoarAutoEnabled) {
      return {
        statusText: `AUTOMATICALLY CONTAINED IN ${activeIncident.containmentTime}!`,
        actionTaken: activeIncident.soarAction,
        isContained: true,
        badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
      };
    } else {
      return {
        statusText: "MANUAL QUEUE: Awaiting Human SOC Analyst Investigation (~28 minutes)",
        actionTaken: "Incident active on network; potential breach or disruption underway!",
        isContained: false,
        badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
      };
    }
  }, [isSoarAutoEnabled, activeIncident]);

  // Studio 4: Active Defense Code Database
  const codeDatabase = {
    envoy_mtls: {
      name: "Envoy Proxy Zero Trust mTLS Configuration",
      code: `static_resources:
  listeners:
  - name: internal_api_listener
    address: { socket_address: { address: 0.0.0.0, port_value: 8443 } }
    filter_chains:
    - transport_socket:
        name: envoy.transport_sockets.tls
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.DownstreamTlsContext
          common_tls_context:
            tls_certificates:
            - certificate_chain: { filename: "/certs/server.crt" }
              private_key: { filename: "/certs/server.key" }
            validation_context:
              trusted_ca: { filename: "/certs/ca.crt" }
              require_client_certificate: true # Strict Mutual TLS Enforcement!`,
      explanation: "Enforces strict Zero Trust Mutual TLS (mTLS) with client certificate verification across all microservice API communications."
    },
    python_soar: {
      name: "Python SOAR Automated Port Isolation Script",
      code: `import requests, json

def execute_soar_containment(switch_ip, switch_port, user_id):
    # 1. Isolate physical switch port via RESTCONF API
    payload = {"ietf-interfaces:interface": {"name": switch_port, "enabled": False}}
    requests.patch(
        f"https://{switch_ip}/restconf/data/ietf-interfaces:interfaces/interface={switch_port}",
        json=payload, auth=('admin', 'VaultSecret'), verify='/certs/ca.crt'
    )
    
    # 2. Revoke OAuth refresh tokens in Redis
    redis_client.delete(f"auth_session:{user_id}")
    
    print(f"[+] SOAR: Port {switch_port} shut down and user {user_id} revoked in 140ms!")`,
      explanation: "Automated SOAR script executed by SIEM webhook to shut down switch ports and revoke user sessions in sub-second time."
    },
    cisco_dai_policy: {
      name: "Cisco Dynamic ARP Inspection & Port Security",
      code: `! Enable Dynamic ARP Inspection and DHCP Snooping
ip dhcp snooping
ip dhcp snooping vlan 10,20
ip arp inspection vlan 10,20
ip arp inspection validate src-mac dst-mac ip

! Configure Access Port Security
interface GigabitEthernet0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation shutdown
 ip arp inspection limit rate 15`,
      explanation: "Configures switch-level Dynamic ARP Inspection with hardware rate limiting and automatic port shutdown on security violation."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_zero_trust_fintech",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Hub",
      title: "Building Zero Trust Microservice Defense with mTLS & FIDO2",
      threatType: "ACTIVE TAMPERING, MASQUERADE & CREDENTIAL STUFFING",
      budget: "₹42,00,000",
      incident:
        "Adversaries attempted credential stuffing and in-flight API parameter bit-flipping on the banking core, trying to escalate privileges and alter wire transfers.",
      defenseStrategy:
        "Mamata implemented a Zero Trust architecture enforcing mTLS (X.509) across all microservices, AEAD AES-256-GCM integrity tags, and FIDO2 WebAuthn for all administrative access.",
      outcome: "Zero unauthorized transactions; 100% of bit-flipped requests and credential attacks dropped automatically.",
      metrics: {
        tamperDetectionRate: "100.00%",
        phishingSuccessRate: "0.00%",
        mTLSInspectionSpeed: "0.4 ms",
        compliance: "RBI Master Direction on Cyber Security Section 5"
      }
    },
    {
      id: "barrackpore_soar_grid",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "ACTIVE SCADA REPLAY & TCP SYN FLOOD",
      title: "Deploying SOAR Substation Isolation & Hardware SYN Proxies",
      budget: "₹24,50,000",
      incident:
        "An active TCP SYN flood combined with replayed Modbus trip commands was injected into the substation LAN, attempting to cause a localized power blackout.",
      defenseStrategy:
        "Debangshu deployed hardware SYN Proxies with Linux SYN Cookies and integrated a SOAR playbook that isolates compromised substation switch ports within 150 milliseconds.",
      outcome: "Rogue injection port shut down in 140 ms; power grid telemetry maintained continuous stability.",
      metrics: {
        soarContainmentTime: "140 milliseconds",
        synFloodAbsorbed: "10 Million SYNs/sec",
        substationsProtected: "18 High-Voltage Nodes",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_aead_prescriptions",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "ACTIVE DATA TAMPERING (Chemotherapy Dosage Alteration)",
      title: "Protecting Cancer Prescriptions with AEAD Galois Tag Verification",
      budget: "₹15,00,000",
      incident:
        "An insider adversary attempted to alter chemotherapy dosage values in database API packets traversing hospital VLANs.",
      defenseStrategy:
        "Mahima deployed end-to-end AEAD (AES-256-GCM) with 128-bit GHASH verification and enforced strict WAF Token Bucket rate limiting on all pharmacy terminals.",
      outcome: "Every tampered packet was detected and discarded before reaching the pharmacy database; patient safety preserved.",
      metrics: {
        prescriptionsSecured: "120,000 Oncology Records",
        ghashTagVerification: "100% Cryptographic Invariant",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_formal_verification",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "REPLAY & BGP PREFIX HIJACKING",
      title: "Formal Verification of IPsec 64-Bit Anti-Replay & BGP FlowSpec",
      budget: "₹17,00,000",
      incident:
        "Researchers modeled race conditions in IPsec anti-replay bitmask window state transitions under high out-of-order packet arrival rates.",
      defenseStrategy:
        "Susmita and Abhronila formally verified and optimized the 64-bit sliding window state machine using ProVerif and configured BGP FlowSpec automated upstream filtering rules.",
      outcome: "Proved 100% mathematical immunity against replayed packets under extreme network jitter.",
      metrics: {
        formalVerificationTool: "ProVerif & TLA+",
        slidingWindowVerification: "100% Mathematically Sound",
        publication: "ACM Transactions on Privacy and Security"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-purple-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 10
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Defensive Architectures for Active Attack Mitigation
            </h1>
            <p className="text-xs text-gray-400">
              Zero Trust mTLS, AEAD GHASH verification, FIDO2 WebAuthn, DAI, IPsec 64-bit anti-replay, and SOAR orchestration.
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

        {/* SECTION 1: Executive Theory & Zero Trust Architecture */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Zero Trust Active Defense
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Multi-Tiered Active Mitigation Framework: Detect, Verify, Contain &amp; Recover
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Because active attacks actively tamper with state, forge identities, and exhaust resources, defense cannot rely on 
              static perimeters. The <strong>Zero Trust Architecture (NIST SP 800-207)</strong> operates under the rule 
              <strong>"Never Trust, Always Verify"</strong>, enforcing cryptographic invariants (AEAD, mTLS, FIDO2) at every transaction 
              and orchestrating automated sub-second containment via <strong>SOAR</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zero Trust Invariant Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-purple-950/60 space-y-3 text-xs">
              <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px] block">
                Cryptographic Invariants &amp; Verification
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>AEAD GHASH Tag:</strong> Mathematically validates that zero bits were altered in transit.</li>
                <li>• <strong>Mutual TLS (mTLS):</strong> Requires X.509 certificate authentication for every API call.</li>
                <li>• <strong>FIDO2 WebAuthn:</strong> Origin-bound public-key cryptography eliminating password phishing.</li>
              </ul>
            </div>

            {/* Automated Containment Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Sub-Second Automated Containment (SOAR)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Switch Port Auto-Shutdown:</strong> Dynamic ARP Inspection violations trigger instant port isolation.</li>
                <li>• <strong>Token Invalidation:</strong> Active session revocation in Redis within 15 milliseconds.</li>
                <li>• <strong>BGP FlowSpec Upstream:</strong> Drops multi-gigabit floods at upstream carrier edge routers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Zero Trust Defense Architecture Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Zero Trust Pipeline Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Multi-Tier Active Mitigation: Edge Filtering to SOAR Containment
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how active threats (tampering, spoofing, SYN floods) are intercepted and neutralized across the 
              defense-in-depth pipeline:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* TIER 1: ACTIVE ATTACKER */}
              <g transform="translate(40, 95)">
                <rect width="170" height="130" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="85" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  ACTIVE ATTACKER
                </text>
                <text x="85" y="48" fill="#fecdd3" fontSize="9.5" textAnchor="middle">
                  Tampering / Spoofing / SYN Flood
                </text>
                <rect x="12" y="60" width="146" height="55" rx="6" fill="#450a0a" stroke="#f87171" />
                <text x="85" y="80" fill="#fca5a5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  ATTACK PAYLOADS
                </text>
                <text x="85" y="98" fill="#ffffff" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  Bit-Flip / ARP Poison / DoS
                </text>
              </g>

              {/* PATH 1: Attack &rarr; Zero Trust Gateway */}
              <path d="M 210 160 L 330 160" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <circle r="5" fill="#f43f5e">
                <animateMotion path="M 210 160 L 330 160" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* TIER 2: ZERO TRUST INVARIANT GATEWAY */}
              <g transform="translate(330, 50)">
                <rect width="220" height="220" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="110" y="28" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                  ZERO TRUST GATEWAY
                </text>
                <text x="110" y="46" fill="#c7d2fe" fontSize="9.5" textAnchor="middle">
                  mTLS + AEAD + DAI + SYN Cookies
                </text>

                <rect x="15" y="58" width="190" height="42" rx="6" fill="#312e81" />
                <text x="110" y="76" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  AEAD GHASH VERIFY
                </text>
                <text x="110" y="90" fill="#e0e7ff" fontSize="8" textAnchor="middle">
                  Drops tampered bits instantly
                </text>

                <rect x="15" y="106" width="190" height="42" rx="6" fill="#312e81" />
                <text x="110" y="124" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  DAI &amp; DHCP SNOOPING
                </text>
                <text x="110" y="138" fill="#e0e7ff" fontSize="8" textAnchor="middle">
                  Drops spoofed ARP replies
                </text>

                <rect x="15" y="154" width="190" height="50" rx="6" fill="#450a0a" stroke="#f43f5e" />
                <text x="110" y="174" fill="#f87171" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  SOAR TRIGGERED!
                </text>
                <text x="110" y="190" fill="#fca5a5" fontSize="8" textAnchor="middle">
                  Port Gig0/12 Shut Down in 140ms
                </text>
              </g>

              {/* PATH 2: Gateway &rarr; Clean Protected Core */}
              <path d="M 550 160 L 680 160" stroke="#10b981" strokeWidth="3" fill="none" />
              <circle r="4" fill="#10b981">
                <animateMotion path="M 550 160 L 680 160" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* TIER 3: PROTECTED CORE */}
              <g transform="translate(680, 95)">
                <rect width="160" height="130" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="28" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  PROTECTED CORE
                </text>
                <text x="80" y="48" fill="#a7f3d0" fontSize="10" textAnchor="middle">
                  Kolkata FinTech / SCADA
                </text>

                <rect x="12" y="60" width="136" height="55" rx="6" fill="#022c22" />
                <text x="80" y="80" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">
                  100% INTEGRITY INTACT
                </text>
                <text x="80" y="98" fill="#d1fae5" fontSize="8" textAnchor="middle">
                  Zero Tampering Allowed
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Defense Active Matrix Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Active Defense Architecture &amp; Mitigation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an active defense architecture below to examine its protective mechanism, target layer, 
              threats neutralized, and production configuration:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(defenseDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedDefenseKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedDefenseKey === item.key
                    ? "bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-purple-950 text-purple-300 border-purple-800 self-start">
                  SHIELD
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeDefense.categoryBadge)}>
                    {activeDefense.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    {activeDefense.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeDefense.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-purple-400 uppercase tracking-wider text-[10px] block">
                    Protection Mechanism &amp; Invariants
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeDefense.protectionMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Active Threats Neutralized
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeDefense.activeThreatStopped}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Key Performance Metric
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeDefense.keyMetric}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Configuration Code
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeDefense.configSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live SOAR Automated Remediation Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Real-Time SIEM &amp; SOAR Automated Containment Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an active threat incident and toggle automated SOAR playbooks to evaluate containment speed 
              (150 ms automated vs 28 minutes manual human SOC):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Incident Selection</h3>

              <div className="space-y-2">
                {Object.entries(soarIncidentProfiles).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setActiveIncidentType(key)}
                    className={clsx(
                      "w-full p-2.5 rounded-lg border text-left font-bold text-xs transition-all duration-300",
                      activeIncidentType === key
                        ? "bg-purple-950 border-purple-500 text-purple-300"
                        : "bg-gray-900 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsSoarAutoEnabled(!isSoarAutoEnabled)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    isSoarAutoEnabled
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-rose-950 border-rose-500 text-rose-300"
                  )}
                &gt;
                  {isSoarAutoEnabled ? "✔ SOAR AUTO-PLAYBOOK ACTIVE" : "✖ MANUAL HUMAN INVESTIGATION"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">SIEM / SOAR Diagnostic Feed</h3>

              <div className="space-y-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Detected Active Threat</span>
                  <span className="font-mono text-xs font-bold text-rose-400 block">{activeIncident.threat}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Automated Remediation Action</span>
                  <span className="font-mono text-xs font-bold text-cyan-400 block">{soarStatus.actionTaken}</span>
                </div>
              </div>

              <div className={clsx("p-3.5 rounded-lg border font-mono text-xs", soarStatus.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">SOAR Execution Status:</span>
                <p className="mt-1 font-bold">{soarStatus.statusText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Active Defense Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Production Configuration &amp; Orchestration Code
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Active Defense Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production configurations for Envoy Zero Trust mTLS, Python SOAR port isolation scripts, 
              and Cisco DAI switch policies:
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
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Code
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita build resilient 
              active mitigation architectures across West Bengal critical infrastructure:
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
                  The Incident &amp; Active Threat
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
              7. Cyber Terrorism &amp; Statutory Penalties for Active Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber jurisprudence imposes the most severe criminal penalties for active disruption and tampering:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F (Cyber Terrorism)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Critical Infrastructure Attacks:</strong> Disrupting power grids, banking switches, or nuclear facilities carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 Section 66 &amp; 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66:</strong> Criminal hacking &amp; data tampering (Up to 3 years prison + ₹5 Lakh fine).
                </li>
                <li>
                  <strong className="text-white">Section 66D:</strong> Cheating by personation (Up to 3 years prison + ₹1 Lakh fine).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                CERT-In Mandatory 6-Hour Reporting
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Mandatory Timeline:</strong> All active security breaches must be reported to CERT-In within <strong className="text-white">6 hours</strong> of detection.
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
                  <strong>Relying on Perimeter Firewalls Alone:</strong> An attacker inside a flat network can easily spoof ARP and pivot laterally.
                </li>
                <li>
                  <strong>Using CBC Mode Without HMAC:</strong> CBC mode without AEAD is vulnerable to bit-flipping tampering.
                </li>
                <li>
                  <strong>Allowing Manual 30-Minute SOC Containment:</strong> Active attacks spread in seconds; automated SOAR playbooks are mandatory.
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
                  <strong>Enforce Zero Trust mTLS:</strong> Authenticate both client and server with X.509 certificates for every API call.
                </li>
                <li>
                  <strong>Deploy FIDO2 WebAuthn:</strong> Eliminate password phishing and session theft using hardware security keys.
                </li>
                <li>
                  <strong>Enable Dynamic ARP Inspection (DAI):</strong> Protect switch VLANs against ARP cache poisoning and identity spoofing.
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
                  Why does AEAD Galois GHASH tag verification immediately detect if a single bit was flipped in transit?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why can an automated SOAR playbook isolate a compromised switch port in 140 ms while a human analyst takes 28 minutes?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the SOAR simulator above, toggle between automated playbook and manual investigation to see the containment gap.
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-purple-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Active defense operates across an active feedback loop: Detect -&gt; Verify -&gt; Contain -&gt; Recover.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AEAD (AES-GCM) uses GHASH polynomial verification to make in-flight tampering impossible.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>FIDO2 WebAuthn uses domain-bound asymmetric cryptography to eliminate password phishing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic ARP Inspection (DAI) + DHCP Snooping stops ARP cache poisoning at the switch level.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IPsec 64-bit sliding window discards duplicate or out-of-order replayed packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act mandates LIFE IMPRISONMENT for Cyber Terrorism on critical infrastructure.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Active Attack Mitigation Architectures FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Zero Trust Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Defensive Architectures for Active Attack Mitigation (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Active cyber attacks require active, automated, and mathematically provable defenses! You cannot rely on passive perimeter firewalls when an adversary is modifying packets in transit, spoofing identities, or attempting to flood critical services. Enforce the Zero Trust mandate: authenticate every microservice with Mutual TLS (mTLS), verify data integrity using AEAD (AES-GCM) Galois tags, eliminate password theft with FIDO2 WebAuthn, lock switch ports with Dynamic ARP Inspection, and orchestrate sub-second automated containment via SOAR. Remember that Section 66F of the Indian IT Act treats cyber attacks on critical infrastructure as Cyber Terrorism punishable by LIFE IMPRISONMENT!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
