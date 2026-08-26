import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import dnssecValidatorPy from "./topic10_files/dnssec_validator.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgChainId = useId();
  const svgKaminskyId = useId();

  // =========================================================================
  // STUDIO 1 STATE: HIERARCHICAL CHAIN OF TRUST VALIDATOR
  // =========================================================================
  const [activeTrustLevel, setActiveTrustLevel] = useState("child_zone"); // "root_zone", "tld_zone", "child_zone", "rrset_rrsig"

  const trustChainLevels = {
    root_zone: {
      title: "1. Root Zone (.) Trust Anchor",
      authority: "ICANN Global Key Signing Ceremony",
      keyType: "Root KSK (Key Tag: 20326, ECDSA / RSA-4096)",
      validationStep: "Pre-installed Trust Anchor in all global validating resolvers.",
      signedRecords: "Signs Root DNSKEY RRset & '.gov.in' DS Record Hash",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700"
    },
    tld_zone: {
      title: "2. TLD Zone (.gov.in) Delegation",
      authority: "National Informatics Centre (NIC) Registry",
      keyType: "TLD KSK (Key Tag: 49102) & TLD ZSK (Key Tag: 12055)",
      validationStep: "Validated by Root DS digest. TLD ZSK validates 'barrackpore.gov.in' DS Record.",
      signedRecords: "DS Record for 'barrackpore.gov.in' (Digest: 88AF1901B3C4...)",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    child_zone: {
      title: "3. Authoritative Child Zone (barrackpore.gov.in)",
      authority: "Barrackpore Municipal Primary DNS Servers",
      keyType: "Child KSK (Tag: 38412, Flag 257) ➔ Child ZSK (Tag: 19204, Flag 256)",
      validationStep: "Child KSK matches Parent DS Hash. Child KSK signs Child ZSK (DNSKEY).",
      signedRecords: "Child ZSK signs all local zone RRsets (A, AAAA, MX)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    rrset_rrsig: {
      title: "4. Resource Record Set & RRSIG Signature",
      authority: "Local Zone Authority (Algorithm 13 - ECDSA P-256)",
      keyType: "RRSIG (Resource Record Signature)",
      validationStep: "Child ZSK verifies cryptographic RRSIG signature over A record (203.0.113.10).",
      signedRecords: "A Record: 'treasury.barrackpore.gov.in ➔ 203.0.113.10' [AD=1 Flag Set]",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    }
  };

  const currentTrust = trustChainLevels[activeTrustLevel];

  // =========================================================================
  // STUDIO 2 STATE: KAMINSKY CACHE POISONING ATTACK SIMULATOR
  // =========================================================================
  const [dnssecEnabledOnResolver, setDnssecEnabledOnResolver] = useState(true);

  const kaminskySimulationResult = useMemo(() => {
    if (dnssecEnabledOnResolver) {
      return {
        status: "PROTECTED BY DNSSEC (AD=1)",
        resolverBehavior: "Resolver checks RRSIG signature on incoming answer. Forged packet lacks valid cryptographic signature from ZSK.",
        verdict: "❌ FORGED PACKET DROPPED IMMEDIATELY. User receives authentic IP (203.0.113.10).",
        riskLevel: "Zero Risk (Mathematical Integrity Verification)",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    } else {
      return {
        status: "VULNERABLE (TRADITIONAL UNPROTECTED DNS)",
        resolverBehavior: "Attacker floods 5,000 UDP responses guessing 16-bit TxID. Resolver accepts fake answer and caches rogue IP.",
        verdict: "🚨 CACHE POISONED! Users browsing 'treasury.barrackpore.gov.in' are redirected to phishing server 198.51.100.99!",
        riskLevel: "CRITICAL: Complete Domain Hijack",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    }
  }, [dnssecEnabledOnResolver]);

  // =========================================================================
  // STUDIO 3 STATE: NSEC VS NSEC3 AUTHENTICATED DENIAL OF EXISTENCE
  // =========================================================================
  const [denialRecordType, setDenialRecordType] = useState("nsec3"); // "nsec", "nsec3"

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_dnssec");

  const regionalDrills = {
    barrackpore_dnssec: {
      id: "barrackpore_dnssec",
      title: "Barrackpore Municipal Portal: Automated DNSSEC Rollout",
      location: "Securing citizen tax payments & utility portals across North 24 Parganas",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Local ISP DNS resolvers suffered cache poisoning attempts seeking to divert property tax payments worth ₹40,00,000 to offshore phishing servers.",
      solution:
        "Deployed automated BIND9 DNSSEC signing with ECDSA Curve P-256 (Algorithm 13), submitted DS records to `.gov.in` parent registry, and configured automated ZSK rotation.",
      outcome:
        "100% cryptographic data integrity; ISP resolvers validate signatures with `AD=1`; zero cache poisoning incidents."
    },
    ichapur_defense_nsec3: {
      id: "ichapur_defense_nsec3",
      title: "Ichapur Defense Facility: NSEC3 Anti-Zone Walking Lockdown",
      location: "Internal command and telemetry DNS zones housing sensitive server hostnames",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Adversaries used automated `ldns-walk` NSEC traversal tools to map out all unadvertised defense servers, discovering private database hostnames.",
      solution:
        "Migrated from cleartext NSEC to salted NSEC3 records with 10 iterations and random salt. Configured Opt-Out for unassigned subdomains.",
      outcome:
        "Zone walking rendered completely impossible; adversaries receive irreversible salted hashes; internal topology concealed."
    },
    kolkata_fintech_dane: {
      id: "kolkata_fintech_dane",
      title: "Salt Lake Sector V FinTech Hub: DANE / TLSA Certificate Pinning",
      location: "High-frequency stock trading APIs and inter-bank payment gateways",
      engineers: "Sukanta Hui (Lead Instructor) & Scholars",
      threatScenario:
        "Risk of Man-in-the-Middle attacks if a compromised commercial public Certificate Authority issued a rogue SSL certificate for the bank's domain.",
      solution:
        "Published DNSSEC-anchored TLSA records (`_443._tcp.bank.gov.in`) pinning the exact public key hash of the bank's TLS certificate.",
      outcome:
        "Browsers and API clients verify TLS certificates against DNSSEC, making rogue CA spoofing impossible; full RBI FinTech compliance."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 10</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            DNSSEC: Domain Name System Security Extensions
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master DNS cryptographic integrity (RFC 4033-4035): Hierarchical Chain of Trust (Root ➔ TLD ➔ Child Zone),
            dual KSK/ZSK architecture, RRSIG/DNSKEY/DS records, Kaminsky Cache Poisoning defense, and NSEC3 anti-zone walking.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              RFC 4033-4035 Architecture
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              RRSIG • DNSKEY • DS • NSEC3
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              KSK (257) vs ZSK (256)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Kaminsky Cache Poisoning Defense
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              DANE (RFC 7672) &amp; TLSA
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SCOPED INLINE KEYFRAME ANIMATIONS */}
        {/* ========================================================================= */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🌲
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The DNS Security Challenge &amp; The DNSSEC Solution
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how DNSSEC adds cryptographic origin authentication and data integrity to the global domain naming system
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In production networking across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, traditional DNS operates over unauthenticated UDP Port 53,
              allowing Man-in-the-Middle attackers to poison DNS resolver caches and redirect users to rogue IP addresses.
              <strong className="text-white"> DNSSEC (RFC 4033-4035)</strong> solves this by introducing digital signatures (RRSIG)
              and parent-child cryptographic anchors (DS records), establishing a verified Chain of Trust from the Root Zone down to any domain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔏</span> 1. Origin Authentication
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Resolvers verify that the DNS response originated from the legitimate zone authority and was not injected by an attacker on the path.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 2. Data Integrity
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cryptographic signatures (RRSIG) guarantee that the returned IP address was not altered or corrupted in flight.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>❌</span> 3. Authenticated Non-Existence
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  NSEC / NSEC3 records provide signed mathematical proof that a domain does not exist (NXDOMAIN), preventing bogus denial attacks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: HIERARCHICAL CHAIN OF TRUST VALIDATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⛓️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Hierarchical Chain of Trust Validator
                </h2>
                <p className="text-sm text-slate-400">
                  Trace cryptographic validation from the ICANN Root Trust Anchor down through the TLD registry to the municipal zone
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              AD=1 Authenticated
            </span>
          </div>

          {/* Level Progression Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.entries(trustChainLevels).map(([key, level]) => {
              const isActive = activeTrustLevel === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTrustLevel(key)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-bold">{level.title.split(". ")[1]}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Level #{level.title.split(".")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Level Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="font-bold text-white font-sans text-sm">{currentTrust.title}</h3>
                <span className="text-[11px] text-slate-400 font-sans">Authority: {currentTrust.authority}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded text-xs font-bold border", currentTrust.badgeColor)}>
                {currentTrust.keyType.split(" (")[0]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 font-sans">Active Key &amp; Trust Role:</div>
                <p className="text-slate-300 font-sans text-[11px]">{currentTrust.keyType}</p>
                <div className="text-[10px] text-slate-400 pt-1">Signature Scope: {currentTrust.signedRecords}</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 font-sans">Validation Verification Step:</div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">{currentTrust.validationStep}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: KAMINSKY DNS CACHE POISONING ATTACK & DEFENSE SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🧪
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Kaminsky DNS Cache Poisoning Attack &amp; Defense Simulator
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate attack execution against unvalidated resolvers vs cryptographic validation with DNSSEC
                </p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 text-xs">
              <input
                type="checkbox"
                checked={dnssecEnabledOnResolver}
                onChange={(e) => setDnssecEnabledOnResolver(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              /&gt;
              <span className="text-slate-300 font-semibold">Enable DNSSEC Validation on Resolver</span>
            </label>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 font-sans flex items-center justify-between">
                  <span>1. Attacker Action (Kaminsky Flood)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">5,000 pkts/sec</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>Target Domain : <span className="text-cyan-300">treasury.barrackpore.gov.in</span></div>
                  <div>Forged IP     : <span className="text-rose-400 font-bold">198.51.100.99 (Phishing Gateway)</span></div>
                  <div>Forged TxID   : <span className="text-amber-400 font-bold">0x4A1F (TxID Matched!)</span></div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 font-sans flex items-center justify-between">
                  <span>2. Resolver Verification</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Recursive Engine</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div>DNSSEC Status  : <span className={clsx(dnssecEnabledOnResolver ? "text-emerald-400 font-bold" : "text-rose-400 font-bold")}>
                    {dnssecEnabledOnResolver ? "ENABLED (Validating RRSIG)" : "DISABLED (Vulnerable)"}
                  </span></div>
                  <div>RRSIG Present  : <span className="text-white">{dnssecEnabledOnResolver ? "Required (Valid ZSK)" : "Ignored / Not Checked"}</span></div>
                  <div>Security Impact: <span className="text-white">{kaminskySimulationResult.riskLevel}</span></div>
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", kaminskySimulationResult.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>{dnssecEnabledOnResolver ? "✔" : "🚨"}</span>
                <span>{kaminskySimulationResult.status}</span>
              </div>
              <p className="opacity-90 font-sans text-[11px]">
                {kaminskySimulationResult.resolverBehavior}
              </p>
              <div className="text-[11px] font-bold font-sans">
                {kaminskySimulationResult.verdict}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: NSEC VS NSEC3 AUTHENTICATED DENIAL OF EXISTENCE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🛡️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: NSEC vs NSEC3 Authenticated Denial of Existence
                </h2>
                <p className="text-sm text-slate-400">
                  Compare canonical linked-list NSEC (vulnerable to Zone Walking) against salted cryptographic NSEC3 hashing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDenialRecordType("nsec")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  denialRecordType === "nsec"
                    ? "bg-rose-950 border-rose-600 text-rose-300 shadow-md shadow-rose-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              &gt;
                NSEC (Cleartext - Vulnerable to Walking)
              </button>
              <button
                onClick={() => setDenialRecordType("nsec3")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  denialRecordType === "nsec3"
                    ? "bg-emerald-950 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              &gt;
                NSEC3 (Salted Hash - Anti-Walking)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6 font-mono text-xs">
            {denialRecordType === "nsec" ? (
              <div className="space-y-3">
                <div className="text-xs text-rose-300 font-sans leading-relaxed">
                  ⚠️ <strong>NSEC Vulnerability (RFC 4034):</strong> The nameserver proves that <code>beta.barrackpore.gov.in</code> does not exist
                  by returning the range <code>alpha.barrackpore.gov.in ➔ internal-pension-db.barrackpore.gov.in</code>.
                  An attacker queries non-existent names and enumerates every private server in the domain!
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 text-[11px]">
                  alpha.barrackpore.gov.in. 300 IN NSEC <span className="text-rose-400 font-bold">internal-pension-db.barrackpore.gov.in.</span> A RRSIG
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs text-emerald-300 font-sans leading-relaxed">
                  🌟 <strong>NSEC3 Defense (RFC 5155):</strong> The nameserver replaces cleartext domain names with salted cryptographic hashes
                  (e.g., <code>SHA-1(Salt + Name)</code>). The attacker receives hashes, preventing zone walking while maintaining verifiable non-existence.
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 text-[11px]">
                  88AF1901...barrackpore.gov.in. 300 IN NSEC3 1 0 10 DEADBEEF <span className="text-emerald-400 font-bold">4A1F89BC...</span> A RRSIG
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & BIND9/DIG TERMINAL LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; DNSSEC Diagnostic Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world DNSSEC deployments in West Bengal and inspect live `delv` and `dig +dnssec` traces
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Forensic Lab
            </span>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(regionalDrills).map(([key, drill]) => {
              const isActive = activeDrillKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-2",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.engineers}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{currentDrill.title}</h3>
                <p className="text-xs text-slate-400">Location: {currentDrill.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                Engineers: {currentDrill.engineers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Vulnerability &amp; Spoofing Attack:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> DNSSEC Architecture Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux delv Diagnostic Output */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (DNSSEC Iterative Validation)</span>
                <span className="text-cyan-400">delv @8.8.8.8 treasury.barrackpore.gov.in</span>
              </div>
              <div className="p-4 space-y-1 text-slate-400 overflow-x-auto text-[11px] leading-relaxed">
                <div><span className="text-emerald-400 font-bold">; fully validated</span></div>
                <div>treasury.barrackpore.gov.in. 300 IN A <span className="text-cyan-300 font-bold">203.0.113.10</span></div>
                <div>treasury.barrackpore.gov.in. 300 IN RRSIG A 13 3 300 20260901180000 20260823180000 <span className="text-emerald-300">19204</span> barrackpore.gov.in. (Valid Signature)</div>
                <div>barrackpore.gov.in. 300 IN DS 38412 13 2 88AF1901B3C4... (Matches Parent .gov.in DS)</div>
                <div>;; Validated from Trust Anchor Root KSK-2024 to A Record ✔</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>⚠️</span> Common Pitfalls &amp; Traps
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Allowing RRSIG Signatures to Expire:</strong> If automated signing scripts fail, validating resolvers worldwide reject the expired signatures with `SERVFAIL`, causing total website blackout.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Failing to Update Parent DS on KSK Rollover:</strong> If you rotate your KSK but forget to update the parent registry's DS record, the chain of trust breaks instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Assuming DNSSEC Encrypts Traffic:</strong> DNSSEC only provides authentication and integrity. Queries and answers are unencrypted on port 53 unless DoH/DoT is used.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Deploying Cleartext NSEC in Sensitive Zones:</strong> Leaves internal server hostnames vulnerable to zone walking enumeration. Always use NSEC3.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>🛡️</span> Production Best Practices
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span><strong>Standardize on Algorithm 13 (ECDSA P-256):</strong> Produces small signatures, avoids UDP fragmentation, and mitigates DNS amplification DDoS attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Synchronize Clocks with NTP:</strong> Resolver clock drift causes valid signatures to be falsely marked as expired, causing global DNS resolution failures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Deploy DANE / TLSA Records:</strong> Pin TLS certificates in DNSSEC to eliminate rogue Certificate Authority spoofing risks on web and email ports.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Automate ZSK Rotations:</strong> Rotate ZSKs monthly in local BIND9 configuration while keeping KSK stable.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why does DNSSEC use two keys (KSK and ZSK)? Because updating the parent registry's DS record is slow and administrative!
                The KSK stays stable and signs the local ZSK; the local ZSK can be rotated every 30 days automatically without contacting the parent!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>RRSIG contains the digital signature for a record set.</li>
                <li>DNSKEY holds public keys (ZSK Flag 256, KSK Flag 257).</li>
                <li>DS record in parent zone holds the hash of the child KSK.</li>
                <li>NSEC3 provides salted non-existence proof to stop zone walking.</li>
                <li>AD=1 flag in DNS response header confirms valid DNSSEC verification.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on DNSSEC Chain &amp; Validator Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating hierarchical chain of trust validation, DS hashing, and Kaminsky cache poisoning mitigation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={dnssecValidatorPy}
            title="dnssec_validator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="DNSSEC (Domain Name System Security Extensions) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the 4 core DNSSEC records (RRSIG, DNSKEY, DS, NSEC/NSEC3) and explain the hierarchical Chain of Trust from Root KSK down to TLD to Authoritative Zone. Distinguish clearly between the ZSK (Flag 256 for daily signing) and KSK (Flag 257 whose hash is published in the parent DS record). Explain how DNSSEC completely neutralizes Kaminsky Cache Poisoning attacks, and remember that DNSSEC provides authenticity/integrity, NOT query encryption (DoH/DoT handles encryption)!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 10: DNSSEC Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 10 Note"
            downloadFileName="topic10_dnssec_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
