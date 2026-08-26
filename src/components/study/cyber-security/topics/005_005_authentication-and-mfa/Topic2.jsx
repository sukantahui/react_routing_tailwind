import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import entropyPy from "./topic2_files/password_entropy_auditor.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgEntropyId = useId();
  const svgKdfId = useId();
  const svgSprayId = useId();

  // =========================================================================
  // STUDIO 1: INTERACTIVE PASSWORD ENTROPY & GPU CRACKING SIMULATOR
  // =========================================================================
  const presetPasswords = [
    { label: "1. Short Numeric PIN (4 digits)", val: "4892", type: "Numeric (PIN)" },
    { label: "2. Common Weak Password", val: "admin123", type: "Lowercase + Digits" },
    { label: "3. Typical Complex Short Password", val: "P@$$w0rd!", type: "Full ASCII Short" },
    { label: "4. Regional Complex Password", val: "Susmita#2026", type: "Mixed Case + Digits + Symbol" },
    { label: "5. Multi-Word Passphrase (Diceware)", val: "bengal tiger barrackpore river", type: "Passphrase (29 chars)" },
    { label: "6. Ultra-Secure Enterprise Passphrase", val: "BarrackporeMunicipalTreasury#2026SecOps!", type: "Enterprise Fortress (40 chars)" }
  ];

  const [customPassword, setCustomPassword] = useState("Susmita#2026");

  const entropyAnalysis = useMemo(() => {
    const pwd = customPassword;
    const len = pwd.length;
    let pool = 0;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) pool += 26;
    if (hasUpper) pool += 26;
    if (hasDigit) pool += 10;
    if (hasSymbol) pool += 33;
    if (pool === 0) pool = 1;

    const entropyBits = len * (Math.log2(pool));
    const combinations = Math.pow(pool, len);

    // Fast GPU hash speed: 50 Billion hashes/sec (RTX 4090 NTLM/MD5)
    // Slow KDF speed: 20 Thousand hashes/sec (Argon2id/Bcrypt)
    const gpuFastRate = 50_000_000_000;
    const gpuSlowRate = 20_000;

    const secondsFast = combinations / gpuFastRate;
    const secondsSlow = combinations / gpuSlowRate;

    const formatTime = (secs) => {
      if (secs < 0.0001) return "Instant (< 1 millisecond) ⚡";
      if (secs < 1) return `${(secs * 1000).toFixed(1)} milliseconds`;
      if (secs < 60) return `${secs.toFixed(1)} seconds`;
      if (secs < 3600) return `${(secs / 60).toFixed(1)} minutes`;
      if (secs < 86400) return `${(secs / 3600).toFixed(1)} hours`;
      if (secs < 31536000) return `${(secs / 86400).toFixed(1)} days`;
      if (secs < 31536000000) return `${(secs / 31536000).toFixed(1)} years`;
      return `${(secs / 31536000).toExponential(2)} years (Centuries / Infeasible) 🛡️`;
    };

    let rating = "";
    let badgeColor = "";
    if (entropyBits < 30) {
      rating = "CRITICALLY WEAK";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else if (entropyBits < 50) {
      rating = "WEAK (Vulnerable to GPU Cracking)";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    } else if (entropyBits < 70) {
      rating = "MODERATE (Standard User Baseline)";
      badgeColor = "bg-cyan-950 text-cyan-300 border-cyan-700";
    } else if (entropyBits < 100) {
      rating = "STRONG (Enterprise Grade)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else {
      rating = "FORTRESS (Immune to Supercomputers)";
      badgeColor = "bg-purple-950 text-purple-300 border-purple-700";
    }

    return {
      length: len,
      poolSize: pool,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
      entropyBits: entropyBits.toFixed(2),
      combinations: combinations.toExponential(2),
      timeFast: formatTime(secondsFast),
      timeSlow: formatTime(secondsSlow),
      rating,
      badgeColor
    };
  }, [customPassword]);

  // =========================================================================
  // STUDIO 2: SLOW KDF VS FAST HASH ARCHITECTURE COMPARISON
  // =========================================================================
  const [selectedKdf, setSelectedKdf] = useState("argon2id"); // "argon2id", "bcrypt", "pbkdf2", "sha256"

  const kdfDetails = {
    argon2id: {
      name: "Argon2id (RFC 9106 - PHC Winner)",
      category: "Memory-Hard Hybrid KDF",
      resistance: "ASIC, GPU, Side-Channel & Cache-Timing Immune",
      throughput: "~2,000 hashes/sec per server core",
      memoryCost: "64 Megabytes RAM per hash instance",
      recommendedUsage: "Modern Web Applications, Password Managers (Bitwarden), State-of-the-Art IAM",
      hashFormat: "$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHQ$...$hash...",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    bcrypt: {
      name: "Bcrypt (RFC 7693 - Eksblowfish Key Schedule)",
      category: "Compute-Hard Key Derivation Function",
      resistance: "GPU Resistant (Limited by fast on-die RAM), Highly Battle-Tested",
      throughput: "~10,000 hashes/sec on multi-threaded CPU",
      memoryCost: "4 Kilobytes RAM per hash",
      recommendedUsage: "Legacy Web Frameworks, Node.js bcrypt libraries, Enterprise Linux PAM",
      hashFormat: "$2b$12$e8Y7GvF4zR1nK9L3oP5tXu7k8m1Qp2W3e4R5t6Y7u8I9o0P1a2S3d4",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    pbkdf2: {
      name: "PBKDF2-HMAC-SHA256 (RFC 8018)",
      category: "Iterated HMAC Key Derivation Function",
      resistance: "Moderate GPU Resistance; Vulnerable to modern ASIC parallelization",
      throughput: "~50,000 hashes/sec on modern GPU arrays",
      memoryCost: "Minimal (No memory hardness)",
      recommendedUsage: "NIST FIPS 140-2 compliance, legacy banking backends (min 600,000 rounds)",
      hashFormat: "$pbkdf2-sha256$i=600000$c2FsdA==$computed_key...",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    sha256: {
      name: "SHA-256 / MD5 (UNSAFE GENERAL-PURPOSE HASH)",
      category: "Fast Cryptographic Digest (NOT a KDF)",
      resistance: "ZERO GPU Resistance. Cracks in seconds on commodity mining hardware",
      throughput: "50,000,000,000 hashes/sec on single RTX 4090",
      memoryCost: "Zero RAM requirement",
      recommendedUsage: "STRICTLY FORBIDDEN FOR PASSWORDS! File checksums and digital signatures only.",
      hashFormat: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentKdf = kdfDetails[selectedKdf];

  // =========================================================================
  // STUDIO 3: PASSWORD ATTACK VECTORS & DEFENSE MATRIX
  // =========================================================================
  const [selectedAttack, setSelectedAttack] = useState("spraying"); // "spraying", "stuffing", "bruteforce", "rainbow"

  const attackDetails = {
    spraying: {
      name: "Password Spraying Attack",
      target: "1 or 2 high-probability passwords (e.g., 'Welcome2026!') across 5,000 distinct user accounts",
      evasionTechnique: "Bypasses per-user failed login lockout counters by distributing attempts across the entire active directory.",
      detectionMethod: "Correlating distributed single-failed attempts from the same external ASN or geographic origin within SIEM.",
      defense: "Mandatory Multi-Factor Authentication (MFA), breach password dictionary filtering, smart account lockout based on IP behavior."
    },
    stuffing: {
      name: "Credential Stuffing Attack",
      target: "Automated replay of millions of username/password pairs stolen from 3rd-party dark web breach dumps",
      evasionTechnique: "Uses residential proxy botnets (rotating thousands of IP addresses) to evade standard IP-based rate limiters.",
      detectionMethod: "Spike in login velocity, impossible traveler anomalies, and high failure-to-success ratios across varied accounts.",
      defense: "HaveIBeenPwned k-anonymity checking on password creation, Cloudflare bot management, FIDO2 WebAuthn keys."
    },
    bruteforce: {
      name: "Targeted Brute-Force Attack",
      target: "Exhaustive permutation testing of millions of passwords against a single high-value executive account",
      evasionTechnique: "Slow and low throttling (1 request every 5 minutes) to stay beneath hard lockouts.",
      detectionMethod: "Consistent persistent authentication failures targeted at a single VIP identity.",
      defense: "Exponential backoff progressive delays, CAPTCHA verification after 3 failures, FIDO2 hardware keys."
    },
    rainbow: {
      name: "Rainbow Table Attack (Offline)",
      target: "Inverting precomputed cryptographic hashes dumped from an unsalted SQL database breach",
      evasionTechnique: "Uses precomputed hash-reduction lookup chains to crack millions of hashes in milliseconds.",
      detectionMethod: "Database exfiltration alerts; offline analysis leaves zero server logs.",
      defense: "100% neutralized by unique per-user 16-byte Cryptographic Salts and slow KDFs (Argon2id)."
    }
  };

  const currentAttack = attackDetails[selectedAttack];

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL INFRASTRUCTURE)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_payroll");

  const regionalDrills = {
    barrackpore_payroll: {
      id: "barrackpore_payroll",
      title: "Barrackpore Municipal Payroll: Password Audit & NIST Transition",
      location: "Municipal finance department managing monthly disbursements of ₹85,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Systems Architect)",
      threatScenario:
        "A penetration test revealed that 78% of municipal accounting staff used 8-character passwords conforming to old complexity rules ('Bengal@2025'). A password spraying attack compromised 14 clerk accounts within 30 minutes.",
      solution:
        "Eliminated mandatory 90-day reset fatigue, mandated 16-character passphrases (Diceware model), deployed Argon2id slow KDF with unique 16-byte salts, and integrated HaveIBeenPwned k-anonymity breach filtering.",
      outcome:
        "100% resistance to dictionary and spray attacks; average password entropy increased from 38 bits to 89.4 bits; zero staff account takeovers reported."
    },
    kolkata_fintech_argon2: {
      id: "kolkata_fintech_argon2",
      title: "Salt Lake Sector V FinTech: Migration from SHA-256 to Argon2id",
      location: "Digital payment gateway processing 120,000 transactions daily",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "A legacy microservice was discovered storing user password digests using single-iteration unsalted SHA-256. A test cluster with two RTX 4090 GPUs cracked 45% of the 50,000 test hashes in under 12 minutes.",
      solution:
        "Engineered transparent on-login password re-hashing pipeline to Argon2id (m=64MB, t=3, p=4) with a hardware HSM-backed secret Pepper key.",
      outcome:
        "Offline cracking throughput crippled from 50 Billion hashes/sec down to 2,000 hashes/sec; compliance certified for PCI-DSS 4.0 and ISO 27001."
    },
    ichapur_spraying_defense: {
      id: "ichapur_spraying_defense",
      title: "Ichapur Industrial Fabricators: Password Spraying Botnet Mitigation",
      location: "Critical defense manufacturing portal with 1,200 remote engineering logins",
      engineers: "Abhronila (Incident Response Lead) & SOC Analysts",
      threatScenario:
        "Adversaries launched a distributed password spray using 1,500 rotating residential IP proxies testing 'Ichapur@2026' across all corporate email accounts, evading traditional per-IP rate limiters.",
      solution:
        "Deployed behavioral UEBA analytics correlating failed login attempts across the entire domain, enforced progressive exponential delays, and restricted web logins strictly to FIDO2 passkeys.",
      outcome:
        "Botnet instantly isolated at the perimeter; automated SIEM alerts quarantined 4 compromised test accounts; zero lateral network penetration."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 2
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Single-Factor Authentication (Passwords) &amp; Vulnerabilities
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Location:</span>
              <span className="text-xs font-bold text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Single-Factor Authentication (Knowledge Factor) remains the most ubiquitous yet heavily targeted authentication mechanism in modern digital infrastructure.
            Explore the mathematics of <strong>Shannon Password Entropy</strong>, compare fast hashing vulnerabilities with <strong>slow memory-hard KDFs (Argon2id, Bcrypt)</strong>, 
            master salting and peppering mechanics, and analyze real-world attack vectors from <strong>password spraying</strong> to <strong>credential stuffing</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE PASSWORD ENTROPY & CRACKING SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🧮</span> Studio 1: Shannon Password Entropy &amp; GPU Cracking Engine
              </h2>
              <p className="text-xs text-slate-400">
                Calculate $H = L \cdot \log_2(N)$ and observe the massive discrepancy between fast GPU hash cracking vs slow memory-hard KDFs.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", entropyAnalysis.badgeColor)}>
              Rating: {entropyAnalysis.rating}
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Select Preset Password or Type Below:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {presetPasswords.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCustomPassword(item.val)}
                  className={clsx(
                    "text-left p-2.5 rounded-xl border text-xs transition-all duration-200",
                    customPassword === item.val
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200 font-bold shadow-md shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <div className="font-semibold text-slate-300">{item.label}</div>
                  <div className="font-mono text-cyan-400 truncate mt-0.5">{item.val}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Password Input */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>Interactive Password / Passphrase Input:</span>
              <span className="font-mono text-cyan-400">{entropyAnalysis.length} Characters</span>
            </label>
            <input
              type="text"
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Type any password or passphrase..."
            /&gt;
          </div>

          {/* Entropy Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Length ($L$)</span>
              <div className="text-xl font-bold font-mono text-cyan-300">{entropyAnalysis.length} chars</div>
              <span className="text-[10px] text-slate-500">Character count</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Pool Size ($N$)</span>
              <div className="text-xl font-bold font-mono text-indigo-300">{entropyAnalysis.poolSize} chars</div>
              <span className="text-[10px] text-slate-500">
                {entropyAnalysis.hasLower ? "a-z " : ""}
                {entropyAnalysis.hasUpper ? "A-Z " : ""}
                {entropyAnalysis.hasDigit ? "0-9 " : ""}
                {entropyAnalysis.hasSymbol ? "!@# " : ""}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Shannon Entropy ($H$)</span>
              <div className="text-xl font-bold font-mono text-emerald-300">{entropyAnalysis.entropyBits} bits</div>
              <span className="text-[10px] text-slate-500">$H = L \cdot \log_2(N)$</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Keyspace ($N^L$)</span>
              <div className="text-xl font-bold font-mono text-purple-300">{entropyAnalysis.combinations}</div>
              <span className="text-[10px] text-slate-500">Total search combinations</span>
            </div>
          </div>

          {/* Fast Hash vs Slow KDF Crack Time Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-950/30 border border-rose-900/60 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Fast Hash Crack Time (MD5 / SHA-256 / NTLM)
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-800">
                  50 Billion Hashes/Sec (RTX 4090)
                </span>
              </div>
              <div className="text-lg font-extrabold font-mono text-white">{entropyAnalysis.timeFast}</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                General-purpose hashes are designed for high speed. Attackers with off-the-shelf GPU clusters compute billions of SHA-256 guesses per second.
              </p>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-900/60 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡️</span> Slow KDF Crack Time (Argon2id / Bcrypt)
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
                  20 Thousand Hashes/Sec
                </span>
              </div>
              <div className="text-lg font-extrabold font-mono text-white">{entropyAnalysis.timeSlow}</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Slow, memory-hard key derivation functions force GPU/ASIC crackers to allocate megabytes of RAM per thread, defeating offline brute-forcing.
              </p>
            </div>
          </div>

          {/* SVG Diagram: Entropy vs Character Length Curve */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>Entropy Growth: Password Length ($L$) vs Pool Complexity ($N$)</span>
              <span className="text-[10px] text-cyan-400">Interactive SVG Visualizer</span>
            </div>
            <svg
              className="w-full h-48 bg-slate-900/50 rounded-lg p-2 overflow-visible"
              viewBox="0 0 700 180"
              aria-label="Entropy Growth Diagram"
            >
              <defs>
                <linearGradient id={`${svgEntropyId}-grad`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="20" x2="60" y2="150" stroke="#334155" strokeWidth="1" />
              <line x1="60" y1="150" x2="660" y2="150" stroke="#334155" strokeWidth="1" />
              <line x1="60" y1="85" x2="660" y2="85" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
              <text x="50" y="88" fill="#64748b" fontSize="10" textAnchor="end">64 bits</text>
              <text x="50" y="25" fill="#64748b" fontSize="10" textAnchor="end">128 bits</text>
              <text x="50" y="153" fill="#64748b" fontSize="10" textAnchor="end">0</text>

              {/* Curve 1: Numeric Only (N=10) */}
              <path
                d="M 60 150 Q 360 115 660 80"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <text x="665" y="83" fill="#f43f5e" fontSize="9">Numeric Only (N=10)</text>

              {/* Curve 2: Alphanumeric (N=62) */}
              <path
                d="M 60 150 Q 360 85 660 30"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <text x="665" y="33" fill="#38bdf8" fontSize="9">Alphanumeric (N=62)</text>

              {/* Curve 3: Full ASCII (N=95) */}
              <path
                d="M 60 150 Q 360 70 660 15"
                fill="none"
                stroke={`url(#${svgEntropyId}-grad)`}
                strokeWidth="2.5"
              />
              <text x="665" y="15" fill="#10b981" fontSize="9" fontWeight="bold">Full ASCII (N=95)</text>

              {/* Current Password Indicator Node */}
              {(() => {
                const cx = Math.min(640, Math.max(70, 60 + customPassword.length * 15));
                const cy = Math.max(20, Math.min(145, 150 - (parseFloat(entropyAnalysis.entropyBits) / 128) * 130));
                return (
                  <g>
                    <circle cx={cx} cy={cy} r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2">
                      <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x={cx + 10} y={cy - 5} fill="#ffffff" fontSize="11" fontWeight="bold">
                      Current ({entropyAnalysis.entropyBits} bits)
                    </text>
                  </g>
                );
              })()}

              <text x="360" y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Password Character Length ($L$) ➔
              </text>
            </svg>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: SLOW KDF VS FAST HASH SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔒</span> Studio 2: Key Derivation Functions (KDF), Salting &amp; Peppering Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Understand how Bcrypt and Argon2id defend against offline GPU brute-force while SHA-256 and MD5 fail catastrophically.
              </p>
            </div>
            <div className="flex gap-2">
              {Object.keys(kdfDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedKdf(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-200",
                    selectedKdf === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{currentKdf.name}</span>
                <span className={clsx("text-xs px-2.5 py-1 rounded-full border font-semibold", currentKdf.badgeColor)}>
                  {currentKdf.category}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Resistance Profile:</span>
                  <span className="text-slate-200">{currentKdf.resistance}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Memory Cost:</span>
                  <span className="text-slate-200">{currentKdf.memoryCost}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 sm:col-span-2">
                  <span className="text-slate-500 font-semibold block">Hash Output Format Anatomy:</span>
                  <span className="font-mono text-cyan-300 break-all text-[11px] block mt-1">
                    {currentKdf.hashFormat}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                <strong className="text-slate-300">Recommended Industrial Usage: </strong>
                {currentKdf.recommendedUsage}
              </div>
            </div>

            {/* Salt vs Pepper Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                <span>🧂</span> Salt vs Pepper Mechanics
              </span>
              <div className="space-y-2 text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <strong className="text-emerald-300 block">Cryptographic Salt (Per User):</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    16-byte random string stored <em>publicly</em> in DB alongside hash. Completely defeats precomputed Rainbow Tables and identical hashes.
                  </p>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <strong className="text-indigo-300 block">Secret Pepper (Global Key):</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Secret HMAC key stored <em>externally</em> in KMS/HSM. Even if DB is leaked via SQLi, hashes cannot be verified without HSM pepper.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: ATTACK VECTORS & DEFENSE MATRIX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚔️</span> Studio 3: Password Attack Vectors &amp; Defensive Countermeasures
              </h2>
              <p className="text-xs text-slate-400">
                Analyze how adversaries bypass simplistic security controls and how enterprise blue teams mitigate them.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(attackDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedAttack(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200",
                    selectedAttack === key
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs md:text-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentAttack.name}</span>
              <span className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full text-xs font-semibold">
                Threat Classification
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Attack Objective &amp; Target</span>
                  <p className="text-slate-300 leading-relaxed">{currentAttack.target}</p>
                </div>
                <div className="bg-rose-950/30 p-3.5 rounded-lg border border-rose-900/60 space-y-1">
                  <span className="text-rose-400 font-bold uppercase text-[10px] tracking-wider">Adversary Evasion Technique</span>
                  <p className="text-slate-300 leading-relaxed">{currentAttack.evasionTechnique}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-amber-950/30 p-3.5 rounded-lg border border-amber-900/60 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">SOC Detection Signature</span>
                  <p className="text-slate-300 leading-relaxed">{currentAttack.detectionMethod}</p>
                </div>
                <div className="bg-emerald-950/30 p-3.5 rounded-lg border border-emerald-900/60 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Architectural Blue-Team Defense</span>
                  <p className="text-slate-300 leading-relaxed">{currentAttack.defense}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 4: Regional SOC Incident Response &amp; Case Studies
              </h2>
              <p className="text-xs text-slate-400">
                Real-world password vulnerabilities and incident response operations across West Bengal critical infrastructure.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(regionalDrills).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeDrillKey === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key === "barrackpore_payroll" ? "Barrackpore Payroll" : key === "kolkata_fintech_argon2" ? "Kolkata FinTech" : "Ichapur Spraying"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Scenario</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Engineering Remediation</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Measurable Security Outcome</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Beginner Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Using SHA-256 or MD5 for Passwords:</strong> Fast cryptographic hashes are cracked at 50+ billion guesses/sec on modern GPU arrays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Forcing Periodic 90-Day Resets:</strong> Leads directly to user fatigue and predictable incrementing transformations (`Kolkata2025!` ➔ `Kolkata2026!`).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Arbitrary Composition Rules over Length:</strong> Mandating symbols without length causes predictable human templates (`?u?l?l?l?l?l?d?s`) cracked in seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Using Hardcoded Global Salts:</strong> An identical salt across users allows adversaries to crack entire databases simultaneously with one precomputed list.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Industry Standards &amp; Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Long Passphrases (NIST SP 800-63B):</strong> Mandate 15+ character multi-word passphrases delivering $H &gt; 80 bits$ of entropy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Adopt Argon2id or Bcrypt:</strong> Enforce slow memory-hard key derivation with work factor $\ge 12$ and unique 16-byte random salts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Check Against Compromised Breach Lists:</strong> Integrate HaveIBeenPwned k-anonymity API to prevent users from picking known breached passwords.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use Exponential Backoff Rate Limiting:</strong> Double delay between failed attempts rather than hard account lockouts to prevent Lockout DoS attacks.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why does password length increase entropy linearly ($H = L \cdot \log_2 N$) while search space increases exponentially ($N^L$)?
                Doubling length squares the number of combinations, making 25-character lowercase passphrases mathematically uncrackable even with zero special symbols!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Shannon Entropy Formula: $H = L \cdot \log_2(N)$ bits.</li>
                <li>Fast Hashes (MD5, SHA-256) are FORBIDDEN for password storage.</li>
                <li>Slow Memory-Hard KDFs (Argon2id, Bcrypt, Scrypt) defeat GPU/ASIC rigs.</li>
                <li>Cryptographic Salts are unique per user and defeat Rainbow Tables.</li>
                <li>NIST SP 800-63B removes 90-day resets and arbitrary complexity rules.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Password Entropy &amp; Slow KDF Auditor Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script calculating Shannon entropy, GPU cracking speeds, Bcrypt hashing, and password spray detection logic
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={entropyPy}
            title="password_entropy_auditor.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Single-Factor Authentication (Passwords) &amp; Vulnerabilities FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Be prepared to write the exact Shannon Password Entropy formula (H = L * log2(N)) with a numerical calculation. Explain the crucial differences between fast hashing functions (MD5, SHA-256) and slow memory-hard KDFs (Argon2id, Bcrypt, Scrypt). Contrast Cryptographic Salting (defeats rainbow tables) with Peppering (HSM key). Finally, state why modern NIST SP 800-63B guidelines deprecate periodic 90-day password resets and arbitrary composition rules in favor of length and breach list verification."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: Password Security & Entropy Forensic Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 2 Note"
            downloadFileName="topic2_password_vulnerabilities_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
