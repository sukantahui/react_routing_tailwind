import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgMitigationId = useId();

  // Studio 1: Active Mitigation Strategy Selection
  const [selectedMitigationKey, setSelectedMitigationKey] = useState("bgp_anycast_dilution");

  // Studio 2: Live Anycast Dilution & Rate Limiting Calculator State
  const [globalFloodGbps, setGlobalFloodGbps] = useState(850); // 100 to 2000 Gbps
  const [anycastPopCount, setAnycastPopCount] = useState(300); // 1 (Unicast) to 300 (Anycast)
  const [tokenBucketBurst, setTokenBucketBurst] = useState(20); // 5 to 50
  const [tokenReplenishRate, setTokenReplenishRate] = useState(15); // 5 to 100 req/s

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_anycast_mitigation");

  // Studio 4: Mitigation Strategy Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("nginx_geoip2_token_bucket_conf");

  // 8 DDoS Mitigation Strategy Profiles for Studio 1
  const mitigationDatabase = {
    bgp_anycast_dilution: {
      key: "bgp_anycast_dilution",
      name: "1. BGP Anycast Global Ingress Dilution (RFC 4786)",
      category: "ROUTING-LAYER FLOOD FRAGMENTATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Global BGP Routing Architecture",
      mitigationMechanism:
        "Announces a single IP prefix from 300+ geographically distributed Points of Presence (PoPs); global internet routing naturally directs each attacker bot to its nearest local data center, diluting a 1.2 Tbps flood into 4.0 Gbps regional streams.",
      mitigationEfficiency: "Reduces peak volumetric load per data center by 99.7% without single points of failure.",
      telemetryIndicator: "Uniform distribution of ingress bandwidth across 300 global edge PoPs with zero localized pipe saturation",
      productionBlueprint: "Deploying BGP Anycast with ECMP multi-path routing across Tier-1 cloud scrubbers (Cloudflare / Akamai).",
      codeSnippet: `// Anycast Global Dilution Math:
// Total Attack Flood Volume : 1,200 Gbps (1.2 Tbps)
// Global Anycast PoP Count  : 300 Data Centers
// Local Load per Edge PoP   : 1,200 / 300 = 4.0 Gbps (Easily filtered in hardware FPGA!)`
    },
    token_bucket_rate_limiter: {
      key: "token_bucket_rate_limiter",
      name: "2. Token Bucket Burst-Tolerant Rate Limiting",
      category: "APPLICATION & API TRAFFIC SHAPING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Web API Gateway & Reverse Proxy (Nginx)",
      mitigationMechanism:
        "Tokens replenish at a steady rate $r$ into a bucket of capacity $b$. Allows legitimate users to make short bursts (e.g. loading 15 page assets) while strictly capping sustained botnet request rates.",
      mitigationEfficiency: "Zero false positives on human page loads while dropping 100% of sustained HTTP flood requests.",
      telemetryIndicator: "Nginx error logs recording HTTP 429 Too Many Requests with zero latency impact on whitelisted sessions",
      productionBlueprint: "Nginx `limit_req_zone` configured with `burst=20 nodelay` on all sensitive dynamic API routes.",
      codeSnippet: `// Nginx Token Bucket Configuration:
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=15r/s;
location /api/ {
    limit_req zone=api_limit burst=20 nodelay;
    proxy_pass http://backend_cluster;
}`
    },
    leaky_bucket_traffic_shaper: {
      key: "leaky_bucket_traffic_shaper",
      name: "3. Leaky Bucket Constant-Rate Traffic Shaper",
      category: "NETWORK QUEUE & QoS SMOOTHING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Network Router Ingress Queue & Video Streams",
      mitigationMechanism:
        "Buffers incoming bursty packets in a FIFO queue and processes them at a strictly constant rate, dropping surplus packets when the buffer overflows.",
      mitigationEfficiency: "Completely eliminates bursty traffic spikes, providing perfectly smooth data transmission to downstream servers.",
      telemetryIndicator: "Strictly constant output bandwidth graphs with zero micro-burst packet spikes",
      productionBlueprint: "Linux `tc` (Traffic Control) hierarchical token bucket (HTB) queueing on network egress interfaces.",
      codeSnippet: `// Linux tc Leaky Bucket Traffic Shaper:
tc qdisc add dev eth0 root handle 1: htb default 12
tc class add dev eth0 parent 1: classid 1:1 htb rate 100mbit ceil 100mbit
tc class add dev eth0 parent 1:1 classid 1:12 htb rate 10mbit ceil 10mbit`
    },
    sliding_window_counter_redis: {
      key: "sliding_window_counter_redis",
      name: "4. Sliding Window Counter Rate Limiting (Redis Lua)",
      category: "DISTRIBUTED CLUSTER RATE ENFORCEMENT",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Distributed API Gateways & Redis Cluster",
      mitigationMechanism:
        "Calculates a weighted average between previous and current time windows in Redis via atomic Lua scripts, eliminating boundary burst anomalies with sub-millisecond calculation speed.",
      mitigationEfficiency: "Provides 100% accurate rate limiting across distributed server clusters with negligible memory overhead.",
      telemetryIndicator: "Sub-millisecond Redis EVALSHA execution times with smooth distributed rate throttling",
      productionBlueprint: "Redis atomic Lua script evaluating sliding window request counts on ingress API gateways.",
      codeSnippet: `// Redis Sliding Window Counter Lua Script:
local count = redis.call('ZCARD', KEYS[1])
if count < limit then
    redis.call('ZADD', KEYS[1], now, now)
    return 1 -- PERMIT REQUEST!
else
    return 0 -- REJECT HTTP 429!
end`
    },
    geoip2_country_filtering: {
      key: "geoip2_country_filtering",
      name: "5. MaxMind GeoIP2 Country-Code Filtering",
      category: "GEOGRAPHIC INGRESS FILTERING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Edge Reverse Proxy & Firewall",
      mitigationMechanism:
        "Maps client IP addresses to country ISO codes in under 2 microseconds using in-memory MaxMind binary databases, dropping or challenging non-domestic traffic during attacks.",
      mitigationEfficiency: "Instantly discards up to 85% of international botnet reflection traffic during emergency localized attacks.",
      telemetryIndicator: "Immediate drop in non-domestic ingress traffic with 0% CPU overhead on backend application nodes",
      productionBlueprint: "Nginx `ngx_http_geoip2_module` mapped into RAM to enforce domestic whitelisting during security alerts.",
      codeSnippet: `// Nginx GeoIP2 Module Hardening:
geoip2 /usr/share/GeoIP/GeoIP2-Country.mmdb {
    $country_code country iso_code;
}
if ($country_code != "IN") {
    return 403 "Domestic access only during security maintenance.";
}`
    },
    strict_urpf_bcp38_filtering: {
      key: "strict_urpf_bcp38_filtering",
      name: "6. Strict Unicast Reverse Path Forwarding (uRPF / BCP 38)",
      category: "CARRIER-GRADE ANTI-SPOOFING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "ISP Edge & Border Routers (RFC 3704)",
      mitigationMechanism:
        "Validates that incoming packets possess a source IP address reachable via the exact ingress interface in the routing table, dropping spoofed packets in hardware silicon.",
      mitigationEfficiency: "Completely eliminates IP address spoofing at the carrier edge, neutralizing all reflection attack vectors.",
      telemetryIndicator: "Router uRPF drop counter increments indicating dropped spoofed-source packets",
      productionBlueprint: "Cisco / Juniper edge router configuration with `ip verify unicast source reachable-via rx`.",
      codeSnippet: `! Cisco IOS Strict uRPF Configuration:
interface GigabitEthernet0/0/1
 ip verify unicast source reachable-via rx    ! Drops spoofed IP packets instantly!`
    },
    bgp_flowspec_rfc5575: {
      key: "bgp_flowspec_rfc5575",
      name: "7. BGP Flowspec (RFC 5575) Granular Carrier Filtering",
      category: "UPSTREAM ISP CORE SCRUBBING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Tier-1 ISP Core Routing Plane",
      mitigationMechanism:
        "Dynamically propagates granular firewall filtering rules (matching UDP reflection ports, payload lengths, and flags) across upstream ISP core routers without blackholing legitimate traffic.",
      mitigationEfficiency: "Discards multi-hundred gigabit reflection floods at the carrier core while keeping port 443 web traffic 100% online.",
      telemetryIndicator: "BGP Flowspec route state active with carrier core packet drop counters matching reflection attack signatures",
      productionBlueprint: "Injecting RFC 5575 flow-routes into Tier-1 ISP BGP peers (Airtel, Tata, Vodafone).",
      codeSnippet: `// BGP Flowspec Granular Scrubbing Policy:
flow-route {
    match {
        destination 103.25.10.50/32;
        protocol udp;
        source-port [ 53 123 11211 ];
        packet-length 1200-1500;
    }
    then { rate-limit 0; } // Clean HTTPS on port 443 remains 100% ONLINE!
}`
    },
    ebpf_xdp_driver_rate_limit: {
      key: "ebpf_xdp_driver_rate_limit",
      name: "8. eBPF / XDP Wire-Speed Network Driver Drops",
      category: "KERNEL NIC RING BUFFER RATE LIMITING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Linux Kernel Network Driver (eXpress Data Path)",
      mitigationMechanism:
        "Executes C bytecode directly in the network card driver ring buffer, evaluating Token Bucket maps in silicon and dropping excess packets in 12 nanoseconds before kernel socket memory allocation.",
      mitigationEfficiency: "Processes over 40 Million PPS per server core, providing hardware-level resilience on commodity Linux servers.",
      telemetryIndicator: "`bpftool` showing high XDP_DROP rate counters with near-zero CPU SoftIRQ utilization in `top`",
      productionBlueprint: "Writing C eBPF programs attached to the NIC via `ip link set dev eth0 xdpgeneric obj xdp_filter.o`.",
      codeSnippet: `// eBPF XDP Token Bucket Rate Limiter (C):
SEC("xdp_rate_limiter")
int xdp_filter(struct xdp_md *ctx) {
    if (!consume_token(parse_src_ip(ctx)))
        return XDP_DROP; // Drops packet in 12ns before kernel sk_buff memory allocation!
    return XDP_PASS;
}`
    }
  };

  const activeMitigation = mitigationDatabase[selectedMitigationKey];

  // Studio 2: Live Anycast Dilution & Token Bucket Rate Limiting Calculations
  const mitigationSimulation = useMemo(() => {
    // 1. Anycast Ingress Dilution Calculation:
    // Load per PoP = (Global Flood / Anycast PoP Count) * 1.05
    const routingSkew = 1.05;
    const loadPerPopGbps = (globalFloodGbps / anycastPopCount) * routingSkew;
    const hardwareCapacityPerPopGbps = 100.0; // 100 Gbps hardware scrubber per PoP

    let rawSatProb = 0;
    if (loadPerPopGbps <= hardwareCapacityPerPopGbps) {
      rawSatProb = 0.0;
    } else {
      const surplus = loadPerPopGbps - hardwareCapacityPerPopGbps;
      rawSatProb = (1 - Math.exp(-surplus / 20.0)) * 100;
    }

    const finalSat = rawSatProb > 99.9 ? 99.9 : rawSatProb;
    const overloadRatio = (loadPerPopGbps / hardwareCapacityPerPopGbps).toFixed(1);

    return {
      loadPerPopGbps: loadPerPopGbps.toFixed(1),
      finalSat: finalSat.toFixed(2),
      overloadRatio,
      badgeClass: parseFloat(finalSat) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(finalSat) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: anycastPopCount >= 100
        ? `GLOBAL ANYCAST DILUTION ACTIVE: 1.2 Tbps global flood fragmented across ${anycastPopCount} PoPs into negligible ${loadPerPopGbps.toFixed(1)} Gbps per data center; local hardware scrubbers absorb load with 0.00% saturation!`
        : anycastPopCount === 1
        ? `UNICAST ORIGIN COLLAPSE: All ${globalFloodGbps} Gbps of flood traffic converges on a single 100 Gbps pipe (${overloadRatio}x overload), causing ${finalSat}% packet loss!`
        : `MODERATE ANYCAST DILUTION: Flood distributed across ${anycastPopCount} PoPs (${loadPerPopGbps.toFixed(1)} Gbps per node); saturation probability is ${finalSat}%.`
    };
  }, [globalFloodGbps, anycastPopCount]);

  // Studio 4: Mitigation Strategy Production Code Database
  const codeDatabase = {
    nginx_geoip2_token_bucket_conf: {
      name: "Nginx Production GeoIP2 Country Blocking & Token Bucket Rate Limiting",
      code: `# Production Nginx Reverse Proxy Hardening: GeoIP2 Whitelisting & Token Bucket
http {
    # 1. Map MaxMind GeoIP2 Database into Memory for 2-Microsecond Country Resolution
    geoip2 /usr/share/GeoIP/GeoIP2-Country.mmdb {
        auto_reload 5m;
        $geoip2_country_code country iso_code;
    }

    # 2. Define Token Bucket Rate Limiting Zone (10MB holds 160,000 Client IP States)
    limit_req_zone $binary_remote_addr zone=api_rate_limit:10m rate=15r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;

    server {
        listen 443 ssl http2;
        server_name kolkata-fintech.in;

        # 3. Emergency Geo-Blocking: Permit ONLY Domestic Indian Users During Active Flood
        if ($geoip2_country_code != "IN") {
            return 403 "Access restricted to domestic regional networks during security maintenance.";
        }

        location /api/ {
            # 4. Token Bucket Rate Limiting with Burst Tolerance
            limit_req zone=api_rate_limit burst=20 nodelay;
            limit_conn conn_limit_per_ip 25;
            
            proxy_pass http://backend_api_cluster;
        }
    }
}`,
      explanation: "Production Nginx reverse proxy configuration combining MaxMind GeoIP2 country-code filtering with Token Bucket per-IP rate limiting to drop non-domestic botnet floods and shape API traffic."
    },
    juniper_bgp_flowspec_policy: {
      name: "Juniper BGP Flowspec (RFC 5575) Granular Reflection Port Filter at ISP Core",
      code: `# Juniper BGP Flowspec Policy to Scrub Multi-Protocol Reflection Floods at Carrier Core:
routing-options {
    flow {
        route kolkata-granular-scrubber {
            match {
                destination 103.25.10.50/32;             # Protected Enterprise VIP
                protocol udp;
                source-port [ 53 123 389 11211 1900 ];   # DNS, NTP, CLDAP, Memcached, SSDP
                packet-length 1200-1500;                 # Oversized Reflection Packets
            }
            then {
                rate-limit 0;                            # Granular Drop: Drops 100% of reflection flood!
                community [ "target:65000:666" ];        # Blackhole Community Tag
            }
        }
    }
}
# Result: 850 Gbps reflection flood scrubbed in ISP hardware; HTTPS web traffic remains 100% ONLINE!`,
      explanation: "Juniper BGP Flowspec (RFC 5575) policy pushing granular packet filtering rules directly into Tier-1 ISP core routers, dropping reflection floods while keeping legitimate HTTPS traffic on port 443 fully operational."
    },
    redis_sliding_window_lua: {
      name: "Redis Lua Script for Distributed Sliding Window Counter Rate Limiting",
      code: `-- Redis Distributed Sliding Window Counter Rate Limiter (Atomic Lua Script):
local key = KEYS[1]                      -- Client IP or API Key Identifier
local now = tonumber(ARGV[1])            -- Current Epoch Timestamp in Milliseconds
local window_size_ms = tonumber(ARGV[2]) -- Window Duration (e.g. 60000ms for 1 minute)
local max_requests = tonumber(ARGV[3])   -- Max Allowed Requests per Window

-- 1. Remove timestamps outside the active sliding window:
local clear_before = now - window_size_ms
redis.call('ZREMRANGEBYSCORE', key, 0, clear_before)

-- 2. Count active requests within the sliding window:
local current_request_count = redis.call('ZCARD', key)

-- 3. Evaluate Rate Limit Threshold:
if current_request_count < max_requests then
    -- Add current request timestamp to sorted set:
    redis.call('ZADD', key, now, now)
    redis.call('PEXPIRE', key, window_size_ms) -- Auto-expire key
    return 1 -- PERMIT REQUEST (HTTP 200)!
else
    return 0 -- REJECT REQUEST (HTTP 429 Too Many Requests)!
end`,
      explanation: "Atomic Redis Lua script implementing a distributed sliding window rate limiter, preventing boundary burst spikes with exact timestamp tracking across distributed cloud API gateways."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_anycast_mitigation",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Diluting an 850 Gbps Multi-Vector Flood Across 300 Global Anycast PoPs",
      threatType: "VOLUMETRIC MULTI-VECTOR FLOOD (850 Gbps DNS + SYN + HTTP Flood)",
      budget: "₹84,00,000",
      incident:
        "Adversaries launched an 850 Gbps multi-vector flood targeting the payment gateway during evening peak banking transactions.",
      defenseStrategy:
        "Mamata routed ingress traffic through a 300-PoP BGP Anycast cloud scrubbing network, diluting the 850 Gbps flood into 2.8 Gbps regional streams.",
      outcome: "Flood absorbed with zero origin bandwidth impact; 0.0 ms transaction latency; 45 core banking switches secured.",
      metrics: {
        attackPeakBandwidth: "850.0 Gbps",
        loadPerAnycastPoP: "2.83 Gbps",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_geoip_rate_limit",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "INTERNATIONAL BOTNET PROBE & SCADA MANAGEMENT FLOOD",
      title: "Hardening Substation Boundary Routers via GeoIP2 and Strict uRPF",
      budget: "₹54,00,000",
      incident:
        "An international Mirai botnet flooded substation web management consoles with 200 Gbps of spoofed UDP traffic and Layer 7 login probes.",
      defenseStrategy:
        "Debangshu configured Strict uRPF (BCP 38) on border routers and enabled MaxMind GeoIP2 country filtering, permitting only domestic connections.",
      outcome: "92% of international botnet traffic dropped at the router interface; substation telemetry remained 100% responsive.",
      metrics: {
        botnetTrafficDropped: "92.0% at Perimeter",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_sliding_window",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "TELEMEDICINE VIDEO STREAM SATURATION (API Burst Attack)",
      title: "Applying Redis Sliding Window Rate Limiting to Preserve Telemedicine Streams",
      budget: "₹39,00,000",
      incident:
        "An attacker flooded the hospital's telemedicine consultation API with 80,000 RPS burst requests, causing video frame drops for oncologists.",
      defenseStrategy:
        "Mahima deployed Redis Lua sliding window rate limiters capping requests to 15 req/s per IP with Token Bucket burst tolerance.",
      outcome: "Malicious burst requests rejected with HTTP 429; telemedicine video feeds maintained 60 FPS full HD quality for 1,500 patients.",
      metrics: {
        videoStreamQuality: "60 FPS (Full HD)",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_mitigation_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF ANYCAST DILUTION & TOKEN BUCKETS",
      title: "Formulating the Global Anycast Ingress Dilution & Rate Shaping Model",
      budget: "₹32,00,000",
      incident:
        "Researchers modeled the mathematical interaction between global Anycast PoP counts, routing affinity skew, and Token Bucket burst dynamics.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that 300 Anycast PoPs reduce link saturation probabilities to 0.0%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 150,000 simulated Anycast routing conditions.",
      metrics: {
        simulationTrials: "150,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Anycast Ingress Dilution Equation",
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
                Topic 09
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              DDoS Mitigation Strategies: Rate Limiting, Geo-blocking, and Anycast Routing
            </h1>
            <p className="text-xs text-gray-400">
              BGP Anycast routing (RFC 4786), Token Bucket rate limiters, MaxMind GeoIP2, Strict uRPF (BCP 38), and IT Act Section 66F.
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
              The Multi-Layered Mitigation Framework
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of DDoS Mitigation: Routing Dilution, Ingress Verification &amp; Rate Shaping
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Defeating multi-terabit volumetric floods and complex Layer 7 bypass attacks requires an integrated, 
              multi-layered mitigation architecture that operates across the global routing plane, carrier backbones, 
              and edge application proxies. <strong>BGP Anycast Routing (RFC 4786)</strong> provides the foundational volumetric defense, 
              announcing a single IP prefix from 300+ Points of Presence (PoPs) worldwide to naturally fragment a 1.2 Tbps flood 
              into negligible 4.0 Gbps regional increments. Upstream, <strong>BGP Flowspec (RFC 5575)</strong> pushes granular ACL rules 
              to Tier-1 ISP cores to scrub reflection traffic without blunt blackholing. At the edge, <strong>Strict uRPF (BCP 38)</strong> 
              eliminates IP spoofing, <strong>MaxMind GeoIP2</strong> filters non-domestic traffic, and <strong>Token Bucket / Sliding Window algorithms</strong> 
              shape API traffic while permitting legitimate human bursts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anycast Dilution Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                BGP Anycast Global Routing Dilution
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                1.2 Tbps Flood / 300 PoPs = 4.0 Gbps per Data Center (99.7% Volumetric Reduction!)
              </div>
              <p className="text-gray-300 leading-relaxed">
                By routing each attacking bot to its nearest local scrubbing center, Anycast eliminates central bottlenecks 
                and allows hardware FPGA filters to process floods in silicon at wire speed.
              </p>
            </div>

            {/* Rate Limiting & uRPF Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Algorithmic Rate Limiting &amp; Anti-Spoofing
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Token Bucket:</strong> Permits short human bursts while capping sustained request rates.</li>
                <li>• <strong className="text-purple-300">Strict uRPF (BCP 38):</strong> Drops spoofed IP packets in router silicon before routing.</li>
                <li>• <strong className="text-amber-300">eBPF / XDP:</strong> Drops rate-limit-exceeding packets in the NIC driver in 12 nanoseconds.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Mitigation Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Mitigation Architecture Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing BGP Anycast Dilution, Strict uRPF &amp; Token Bucket Rate Limiting
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a 1.2 Tbps multi-vector flood is diluted across 300 Anycast PoPs, filtered by Strict uRPF anti-spoofing, 
              and shaped by Token Bucket rate limiters before reaching the origin:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS 1.2 TBPS FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. 1.2 TBPS INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Global Botnet Flood
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MULTI-VECTOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  UDP / NTP Reflection
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  SYN &amp; HTTP Floods
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: BGP ANYCAST GLOBAL DILUTION */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. BGP ANYCAST
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  300 Global PoPs
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ROUTING DILUTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  1.2 Tbps / 300 PoPs
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  = 4.0 Gbps per PoP!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: STRICT uRPF & BGP FLOWSPEC */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. uRPF &amp; FLOWSPEC
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Carrier Core Filtering
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INSPECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Drops Spoofed IPs
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Flowspec Port Filter
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: GEOIP2 & TOKEN BUCKET RATE LIMITING */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. TOKEN BUCKET
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  GeoIP &amp; Rate Shaping
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  WAF SHAPING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Domestic IN Whitelist
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  rate=15r/s burst=20
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLEAN TRAFFIC TO PROTECTED ORIGIN */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ORIGIN SERVER
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Kolkata Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  0% Pipe Saturation
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Clean User Banking!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Strategy Mitigation Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. DDoS Mitigation Strategy &amp; Ingress Defense Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a DDoS mitigation strategy below to examine its target layer, mitigation mechanism, 
              efficiency benchmarks, telemetry indicators, and production blueprint:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(mitigationDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedMitigationKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedMitigationKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  STRATEGY
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeMitigation.categoryBadge)}>
                    {activeMitigation.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeMitigation.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeMitigation.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Mitigation Mechanism &amp; Technical Flow
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMitigation.mitigationMechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Mitigation Efficiency &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeMitigation.mitigationEfficiency}</p>
                  <p className="text-gray-400 text-[11px]">{activeMitigation.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Production Blueprint
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeMitigation.productionBlueprint}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Configuration Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeMitigation.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Anycast Dilution Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. BGP Anycast Dilution &amp; Token Bucket Rate Limiting Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust global flood volume $V_{\text{attack}}$, Anycast PoP count $N_{\text{PoPs}}$ (1 Unicast to 300 Anycast), 
              Token Bucket capacity $b$, and replenish rate $r$ to model ingress load per PoP $L_{\text{PoP}} = \frac{V_{\text{attack}}}{N_{\text{PoPs}}} \times 1.05$ and saturation probability:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Mitigation &amp; Routing Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Global Ingress Flood Volume:</span>
                  <span className="text-rose-400 font-bold font-mono">{globalFloodGbps} Gbps</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={globalFloodGbps}
                  onChange={(e) => setGlobalFloodGbps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block">Anycast Ingress Scrubbing Architecture:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setAnycastPopCount(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      anycastPopCount === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    1 PoP (Unicast)
                  </button>
                  <button
                    onClick={() => setAnycastPopCount(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      anycastPopCount === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    50 PoPs (Regional)
                  </button>
                  <button
                    onClick={() => setAnycastPopCount(300)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      anycastPopCount === 300
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    300 PoPs (Anycast)
                  </button>
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <div className="flex justify-between text-gray-400">
                  <span>Token Bucket Burst Tolerance (b):</span>
                  <span className="text-amber-400 font-bold font-mono">{tokenBucketBurst} Tokens</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={tokenBucketBurst}
                  onChange={(e) => setTokenBucketBurst(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Steady Replenish Rate (r):</span>
                  <span className="text-cyan-400 font-bold font-mono">{tokenReplenishRate} req/s</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={tokenReplenishRate}
                  onChange={(e) => setTokenReplenishRate(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Anycast Dilution &amp; Scrubbing Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Average Ingress Load per Anycast PoP</span>
                  <span className="text-lg font-extrabold text-cyan-400">{mitigationSimulation.loadPerPopGbps} Gbps</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">PoP Capacity: 100 Gbps Hardware</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Ingress Link Saturation Probability</span>
                  <span className="text-lg font-extrabold text-white">{mitigationSimulation.finalSat}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Overload Ratio: {mitigationSimulation.overloadRatio}x</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", mitigationSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Mitigation Telemetry Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{mitigationSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Mitigation Strategy Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Nginx GeoIP2, BGP Flowspec &amp; Redis Lua Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Nginx GeoIP2, BGP Flowspec &amp; Redis Lua Rate Limiting Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Nginx reverse proxy configurations with MaxMind GeoIP2 country filtering and Token Bucket zones, 
              Juniper BGP Flowspec carrier core filter policies, and atomic Redis Lua sliding window rate limiters:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita dilute 850 Gbps floods across 300 Anycast PoPs, 
              enforce Strict uRPF and GeoIP2 at electrical substations, and preserve hospital telemedicine streams across West Bengal:
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
                  The Incident &amp; Volumetric Flood Vector
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
              7. Legal Penalties for DDoS Attacks &amp; Mitigation Evasion in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize launching DDoS attacks or writing automated mitigation bypass tools with severe civil liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Overwhelming mitigations to paralyze critical infrastructure carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Mitigation bypass fraud (Up to 7 years prison).
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
                  <strong>Relying on RTBH Blackholing as a Primary Defense:</strong> Takes down the victim IP completely.
                </li>
                <li>
                  <strong>Configuring Fixed Window Rate Limiters:</strong> Vulnerable to double-limit boundary burst spikes.
                </li>
                <li>
                  <strong>Assuming GeoIP Blocking Stops Domestic Proxies:</strong> Fails against compromised local IoT routers.
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
                  <strong>Deploy 300+ PoP BGP Anycast Routing:</strong> Naturally fragments multi-terabit floods into small regional streams.
                </li>
                <li>
                  <strong>Inject BGP Flowspec (RFC 5575) Rules:</strong> Scrubs reflection ports at the ISP core without blackholing.
                </li>
                <li>
                  <strong>Enforce Strict uRPF (BCP 38):</strong> Drops spoofed IP packets directly in router silicon.
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
                  Why does BGP Anycast routing naturally reduce a 1.2 Tbps global flood to 4.0 Gbps per data center without needing a central coordinator?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does the Token Bucket algorithm permit a user to load 15 simultaneous image assets while blocking an automated 100 req/s HTTP flood?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch from 1 PoP (Unicast) to 300 PoPs (Anycast) and observe saturation probability collapse to 0.00%!
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
                <span>BGP Anycast fragments 1+ Tbps global floods into 3.3 Gbps streams across 300+ PoPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Token Bucket allows short human browsing bursts while enforcing a steady long-term cap.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Strict uRPF (BCP 38) drops spoofed IP packets where source IP is not reachable via ingress interface.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BGP Flowspec (RFC 5575) provides granular carrier filtering, unlike blunt RTBH blackholing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>eBPF/XDP rate limiters run in the NIC driver, dropping 40+ Million PPS in 12 nanoseconds.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes DDoS Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="DDoS Mitigation Strategies FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Ingress Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="DDoS Mitigation Strategies: Rate Limiting, Geo-blocking, and Anycast Routing (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Modern DDoS mitigation is an engineering discipline that combines global routing physics, carrier-grade upstream policy enforcement, and sub-millisecond edge rate shaping! Master the three pillars of defense: 1. BGP Anycast Routing (RFC 4786) announces the same IP prefix across 300+ global Points of Presence (PoPs), naturally fragmenting a 1.2 Tbps global botnet flood into manageable 4.0 Gbps increments per data center without central bottlenecks; 2. Ingress Anti-Spoofing & Filtering: Strict Unicast Reverse Path Forwarding (uRPF / BCP 38) validates incoming source IPs in router silicon, MaxMind GeoIP2 drops non-domestic attack traffic during regional emergencies, and BGP Flowspec (RFC 5575) pushes granular ACL rules to Tier-1 ISP cores to scrub reflection ports (53, 123, 11211) without blunt RTBH blackholing; 3. Algorithmic Rate Limiting: Token Bucket allows burst tolerance (`burst=20 nodelay`) for legitimate human browsing while capping sustained bot floods, Redis Lua scripts provide atomic sliding window rate limiting across distributed cloud clusters, and eBPF/XDP programs execute directly in the NIC driver ring buffer to drop 40+ Million PPS in under 15 nanoseconds! Remember that Section 66F of the Indian IT Act treats DDoS cyber terrorism against critical infrastructure with Life Imprisonment, and Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
