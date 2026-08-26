import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgWaveId = useId();

  // Studio 1: Active Threat Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("website_fingerprint");

  // Studio 2: Traffic Waveform Simulator State
  const [realDataRateMbps, setRealDataRateMbps] = useState(8);
  const [peakBurstMbps, setPeakBurstMbps] = useState(45);
  const [isPaddingEnabled, setIsPaddingEnabled] = useState(true);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_burst");

  // Studio 4: TShark Telemetry Lab Selection
  const [activeTsharkTab, setActiveTsharkTab] = useState("http_post_extract");

  // 8 Metadata Analysis Vector Profiles for Studio 1
  const vectorDatabase = {
    website_fingerprint: {
      key: "website_fingerprint",
      name: "Website Traffic Fingerprinting",
      category: "METADATA RECONNAISSANCE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 7 (Encrypted TLS / Tor / VPN)",
      leakageSource: "Unique sequence of HTML, CSS, JavaScript, and image asset download burst sizes.",
      detectabilityScore: 6, // Stealthy passive analysis
      mathematicalModel: "Dynamic Time Warping (DTW) & k-Nearest Neighbors (k-NN) classification on packet vectors.",
      realWorldPayload: "Inbound Vector: [+512B, +1420B, -512B, +1420B, +1420B, -1024B, ...] &rarr; Match: 94.2% Bank Portal",
      mechanism:
        "Every webpage contains a unique combination of images and code files. Even when encrypted inside a VPN or Tor tunnel, downloading `portal.bank-kolkata.in` creates a distinct signature of packet size waterfalls.",
      mitigation: "Tor 514-byte cell padding, Fixed-size packet morphing, and randomized dummy HTTP/2 asset fetching.",
      configCode: `// Tor Browser Defense: Fixed 514-Byte Cell Architecture:
// All outbound and inbound data is chopped and padded into discrete 514-byte blocks.
// Length of individual assets is completely concealed from intermediate observers.`
    },
    ssh_keystroke_timing: {
      key: "ssh_keystroke_timing",
      name: "SSH Keystroke Inter-Arrival Timing",
      category: "TIMING SIDE-CHANNEL",
      categoryBadge: "bg-blue-950 text-blue-300 border-blue-800",
      targetLayer: "Layer 4 (Transport) / Layer 7 (SSH)",
      leakageSource: "Inter-packet arrival delay (Δt) between consecutive single-character encrypted TCP packets.",
      detectabilityScore: 8,
      mathematicalModel: "Hidden Markov Models (HMM) & Bayesian distance estimation over QWERTY keyboard geometry.",
      realWorldPayload: "Packet 1: t=10.120s (Key 's') | Packet 2: t=10.185s (Key 'u', Δt=65ms) | Packet 3: t=10.390s (Key 'k', Δt=205ms)",
      mechanism:
        "In interactive SSH shells, each keypress generates an immediate packet. The millisecond delay between packets reflects physical finger travel distance on a keyboard, leaking typed passwords.",
      mitigation: "Character queue buffering (transmitting in 50ms batches) or constant-rate packet pacing in SSH clients.",
      configCode: `// OpenSSH Client Keystroke Obfuscation:
// Option: Send keystrokes in fixed-interval batches (ObfuscateKeystrokeTiming yes)
Host *
  ObfuscateKeystrokeTiming yes`
    },
    voip_vbr_profiling: {
      key: "voip_vbr_profiling",
      name: "Encrypted VoIP VBR Speech Profiling",
      category: "ACOUSTIC TRAFFIC ANALYSIS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetLayer: "Layer 7 (SRTP / WebRTC)",
      leakageSource: "Variable Bitrate (VBR) audio codecs emit larger packets during complex speech phonemes.",
      detectabilityScore: 12,
      mathematicalModel: "Mel-Frequency Cepstral Coefficients (MFCC) acoustic matching on packet length profiles.",
      realWorldPayload: "Phoneme 'Aaaa' -&gt; 180B | Phoneme 'Shhh' -> 220B | Silence Gap -> 20B (Spoken phrase reconstructed)",
      mechanism:
        "VBR codecs (Opus/Speex) save bandwidth by compressing silence and expanding complex spoken sounds. Because SRTP encryption does not alter packet lengths, eavesdroppers can reconstruct spoken phrases.",
      mitigation: "Enforcing Constant Bitrate (CBR) audio modes in WebRTC, Asterisk, and SIP gateway configurations.",
      configCode: `// WebRTC / Asterisk CBR Enforcement (pjsip.conf):
[general]
opus_cbr = yes
opus_fec = yes
opus_packet_loss_percentage = 10`
    },
    command_surge_analysis: {
      key: "command_surge_analysis",
      name: "Military & SCADA Command Surge Analysis",
      category: "TACTICAL FLOW PROFILING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetLayer: "Layer 3 (IP) / Layer 4 (TCP)",
      leakageSource: "Volume and transmission frequency spikes between critical command nodes during operations.",
      detectabilityScore: 4,
      mathematicalModel: "Cumulative Sum (CUSUM) change-point detection on packet flow rates (pkts/sec).",
      realWorldPayload: "Baseline: 200 pkts/min -> Surge: 120,000 pkts/min between Barrackpore Grid & Kolkata HQ at 03:00 AM",
      mechanism:
        "Even with 100% AES-256 IPsec encryption, a dramatic increase in packet transmission volume between a power substation and operational headquarters reveals imminent switching commands or incident response.",
      mitigation: "Continuous Constant-Bitrate (CBR) Traffic Padding to maintain a constant flat transmission rate.",
      configCode: `// IPsec Constant Traffic Padding Configuration:
crypto ipsec profile IPSEC-CBR-PADDING
 set security-association replay disable
 set traffic-padding constant-rate 50000000 # Flat 50 Mbps`
    },
    video_resolution_profiling: {
      key: "video_resolution_profiling",
      name: "DASH/HLS Video Resolution Profiling",
      category: "STREAMING FLOW INFERENCE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetLayer: "Layer 7 (HTTPS Streaming)",
      leakageSource: "Periodic 2-second segment download burst sizes (e.g. 3 MB for 720p vs 25 MB for 4K).",
      detectabilityScore: 10,
      mathematicalModel: "Periodic peak-to-peak volume matching against public media CDN bitstream profiles.",
      realWorldPayload: "Burst Volume: 24.8 MB every 4.0s -> Identified 4K UHD Video Stream of Hospital Training Feed",
      mechanism:
        "Dynamic Adaptive Streaming over HTTP downloads video in chunks. The size of each 2-second burst reveals video resolution and matches specific titles from catalog databases.",
      mitigation: "Uniform chunk size normalization and randomized client-side segment pre-buffering.",
      configCode: `// Nginx Video Slice & Chunk Normalization:
location /video/ {
    slice 1m;
    proxy_set_header Range $slice_range;
    proxy_cache_valid 200 206 1h;
}`
    },
    passive_os_fingerprinting: {
      key: "passive_os_fingerprinting",
      name: "Passive OS Fingerprinting via TCP SYN",
      category: "TCP STACK RECONNAISSANCE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetLayer: "Layer 4 (Transport)",
      leakageSource: "Default TCP Initial Window Size, Scale factor, TTL values, and DF (Don't Fragment) flags in SYN packets.",
      detectabilityScore: 15,
      mathematicalModel: "TCP SYN Signature Vector Matching (p0f database).",
      realWorldPayload: "SYN Header: Window=64240, TTL=128, MSS=1460, Scale=8 -> Identified: Windows 11 Enterprise",
      mechanism:
        "Different operating systems format their initial TCP SYN handshake with unique default parameters. A passive observer sniffing the SYN packet identifies the OS without sending a single active probe.",
      mitigation: "TCP Stack Normalization / Scrubbing on Edge Firewalls and Scrubbing Gateways.",
      configCode: `// OpenBSD PF / Linux Scrubbing Rule to Normalize TCP Handshakes:
match in all scrub (no-df random-id min-ttl 64 max-mss 1440 reassemble tcp)`
    },
    bot_c2_autocorrelation: {
      key: "bot_c2_autocorrelation",
      name: "Bot C2 Beacon Autocorrelation",
      category: "BEHAVIORAL ANOMALY PROFILING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetLayer: "Layer 4 (Transport) / Layer 7 (Application)",
      leakageSource: "Periodic, deterministic Inter-Arrival Times (IAT) contrasting with bursty human browsing.",
      detectabilityScore: 75,
      mathematicalModel: "Fast Fourier Transform (FFT) spectral density & Autocorrelation coefficient R(k).",
      realWorldPayload: "IAT Sequence: [60.01s, 59.99s, 60.00s, 60.02s] -> Spectral Peak at f = 0.0167 Hz (C2 Beacon Identified)",
      mechanism:
        "Malware beacons contact their Command & Control (C2) server at regular mathematical intervals. Autocorrelation analysis immediately flags this periodic signal amid noisy human background traffic.",
      mitigation: "High-variance sleep jitter (e.g. 50% random interval variance) and randomized payload sizing.",
      configCode: `// Malware Defense: Zeek Script Detecting Periodic C2 Beacons:
event connection_state_remove(c: connection) {
    if (c$duration > 3600 && c$orig$pkts > 60) {
        # Check standard deviation of inter-packet arrival times
    }
}`
    },
    shannon_entropy_analysis: {
      key: "shannon_entropy_analysis",
      name: "Shannon Entropy Byte-Density Profiling",
      category: "CRYPTOGRAPHIC TRAFFIC PROFILING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetLayer: "Layer 3 (IP) / Layer 7 (Application)",
      leakageSource: "Statistical randomness distribution of byte values across packet payloads.",
      detectabilityScore: 30,
      mathematicalModel: "H(X) = -sum(P(x) * log2(P(x))) across 256-byte ASCII / Binary distributions.",
      realWorldPayload: "Unencrypted SQL: H(X) = 3.82 bits/byte | AES-256-GCM Ciphertext: H(X) = 7.98 bits/byte",
      mechanism:
        "Cleartext protocol data has structured repetition (low entropy); strong encryption or compressed malware payloads have near-maximum entropy approaching 8.0 bits per byte.",
      mitigation: "Ensuring 100% end-to-end encryption for sensitive data and detecting unauthorized encrypted tunnels.",
      configCode: `// Python Shannon Entropy Analyzer:
import math
from collections import Counter
def get_entropy(data):
    counts = Counter(data)
    return -sum((c/len(data)) * math.log2(c/len(data)) for c in counts.values())`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Calculations for Waveform Simulator
  const waveformMetrics = useMemo(() => {
    const bandwidthEfficiency = isPaddingEnabled
      ? ((realDataRateMbps / peakBurstMbps) * 100).toFixed(1)
      : "100.0";
    const transmittedBandwidth = isPaddingEnabled ? peakBurstMbps : realDataRateMbps;
    const metadataLeakageScore = isPaddingEnabled ? "0.0% (Zero Leakage)" : "98.5% (High Leakage)";
    const entropyScore = isPaddingEnabled ? "7.99 bits/byte (Uniform Noise)" : "4.12 bits/byte (Bursty)";

    return {
      bandwidthEfficiency,
      transmittedBandwidth,
      metadataLeakageScore,
      entropyScore
    };
  }, [realDataRateMbps, peakBurstMbps, isPaddingEnabled]);

  // Studio 4: TShark Telemetry Scripts
  const tsharkDatabase = {
    http_post_extract: {
      name: "Extract HTTP POST Credentials",
      command: `tshark -i eth0 -Y "http.request.method == \\"POST\\"" -T fields -e frame.time -e ip.src -e http.host -e http.request.uri -e http.file_data`,
      explanation: "Extracts all HTTP POST request payloads, source IPs, and target URIs in real time from network interfaces."
    },
    dns_query_log: {
      name: "Passive DNS Domain Profiler",
      command: `tshark -i eth0 -f "udp port 53" -T fields -e frame.time -e ip.src -e dns.qry.name -Y "dns.flags.response == 0"`,
      explanation: "Logs every single unencrypted domain lookup requested by internal network endpoints."
    },
    tls_sni_snoop: {
      name: "TLS SNI Handshake Extractor",
      command: `tshark -i eth0 -Y "tls.handshake.type == 1" -T fields -e ip.src -e ip.dst -e tls.handshake.extensions_server_name`,
      explanation: "Extracts target website hostnames from cleartext Server Name Indication (SNI) extensions during TLS handshakes."
    },
    flow_duration_top: {
      name: "Top High-Volume TCP Conversations",
      command: `tshark -r capture.pcap -q -z conv,tcp`,
      explanation: "Compiles comprehensive statistics for all TCP connections, showing total bytes transferred, duration, and packet counts."
    }
  };

  const activeTshark = tsharkDatabase[activeTsharkTab];

  // Studio 3: Regional West Bengal Pedagogical Scenarios
  const localScenarios = [
    {
      id: "kolkata_fintech_burst",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Hub",
      title: "Defeating Website Fingerprinting on Banking API Gateway",
      threatType: "METADATA TRAFFIC ANALYSIS (Website Fingerprinting)",
      budget: "₹28,50,000",
      incident:
        "An adversary positioned at an ISP hop analyzed packet size waterfalls on encrypted TLS 1.3 connections, accurately predicting when corporate clients were submitting multi-crore wire transfer requests.",
      defenseStrategy:
        "Mamata implemented TLS 1.3 Native Record Padding (RFC 8446) padding all API responses to uniform 2048-byte blocks and deployed randomized asynchronous dummy fetching for web UI assets.",
      outcome: "Website fingerprinting accuracy dropped from 94% to 8% (pure statistical chance).",
      metrics: {
        fingerprintAccuracy: "Dropped from 94% to 8%",
        paddingOverhead: "14% Additional Bandwidth",
        dailyTransactionsSecured: "₹140 Crores",
        compliance: "RBI Master Direction Section 4.2"
      }
    },
    {
      id: "barrackpore_grid_cbr",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "FLOW RATE ANALYSIS (SCADA Telemetry Surges)",
      title: "Concealing Power Grid Switching Commands with CBR Padding",
      budget: "₹16,00,000",
      incident:
        "Adversaries monitored transmission rate fluctuations on the encrypted microwave backhaul link between Barrackpore and Kolkata, identifying the exact timing of critical substation breaker switching operations.",
      defenseStrategy:
        "Debangshu enabled Constant-Bitrate (CBR) IPsec ESP traffic padding at a fixed 50 Mbps line rate. The cryptographic engine continuously transmits pseudo-random dummy ciphertext whenever real SCADA telemetry is idle.",
      outcome: "Eliminated all transmission surge signatures; adversary sees a 100% flatline.",
      metrics: {
        flowRateVariance: "0.0% (Perfect Flatline)",
        scadaSwitchesShielded: "18 Substation Relays",
        paddingBandwidth: "Flat 50 Mbps",
        compliance: "NCIIPC Critical Infrastructure Guidelines"
      }
    },
    {
      id: "ichapur_telemed_vbr",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Oncology Clinical Network",
      threatType: "ACOUSTIC TRAFFIC ANALYSIS (VoIP VBR Leakage)",
      title: "Neutralizing Speech Profiling on Encrypted Telemedicine Feeds",
      budget: "₹10,50,000",
      incident:
        "A research audit revealed that encrypted WebRTC medical consultations leaked spoken cancer diagnoses because the variable bitrate (VBR) Opus audio codec transmitted larger packets during complex medical terminology.",
      defenseStrategy:
        "Mahima reconfigured the telemedicine gateway to enforce Constant Bitrate (CBR) Opus audio streaming with fixed 20ms packet intervals, eliminating phoneme-length correlations.",
      outcome: "Acoustic phoneme reconstruction rendered impossible; patient confidentiality preserved.",
      metrics: {
        telemedSessionsProtected: "4,500 Monthly Consultations",
        audioCodecProfile: "CBR Opus (64 kbps fixed)",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_hpc_tor",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University High-Performance Computing Cluster",
      threatType: "TRAFFIC CORRELATION & BEACON DETECTION",
      title: "Developing Advanced Autocorrelation Anomaly Classifiers",
      budget: "₹7,80,000",
      incident:
        "Researchers simulated an APT malware beaconing campaign that used variable jitter, training spectral FFT algorithms to detect low-frequency periodic signals hidden inside university background traffic.",
      defenseStrategy:
        "Susmita and Abhronila built an automated Fast Fourier Transform (FFT) network telemetry analyzer that flags any flow exhibiting autocorrelation peaks at intervals between 10s and 300s.",
      outcome: "Successfully detected 99.2% of simulated low-frequency beacons with zero false positives.",
      metrics: {
        beaconDetectionRate: "99.2% Accuracy",
        falsePositiveRate: "0.01%",
        telemetryThroughput: "10 Gbps Monitored",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-cyan-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_001
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 02
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Passive Attacks: Traffic Analysis &amp; Packet Sniffing
            </h1>
            <p className="text-xs text-gray-400">
              Shannon entropy, statistical burst profiling, keystroke timing, website fingerprinting, and CBR padding.
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

        {/* SECTION 1: Executive Theory & Mathematical Models */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Statistical Intelligence Foundations
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Traffic Analysis: Extracting Intelligence from Encrypted Flows
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              While end-to-end encryption (TLS 1.3 / IPsec) shields payload contents, <strong>Traffic Analysis</strong> 
              exploits observable transmission metadata—packet size sequences, burst frequencies, flow durations, and 
              inter-arrival times—to infer user actions, spoken words, and military operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mathematical Model Card 1 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                Shannon Entropy Formula (Payload Randomness)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-cyan-300 border border-cyan-950/60">
                H(X) = - ∑ [ P(x_i) × log₂( P(x_i) ) ]
              </div>
              <p className="text-gray-300 leading-relaxed">
                Cleartext ASCII streams (HTTP/JSON) have structured repetition producing low entropy (3.5 to 4.5 bits/byte). 
                Properly encrypted ciphertext (AES-GCM) exhibits near-maximum entropy approaching 8.0 bits/byte.
              </p>
            </div>

            {/* Mathematical Model Card 2 */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-3 text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Dynamic Time Warping (DTW) Distance
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-indigo-300 border border-indigo-950/60">
                D(i, j) = |T₁[i] - T₂[j]| + min( D(i-1, j), D(i, j-1), D(i-1, j-1) )
              </div>
              <p className="text-gray-300 leading-relaxed">
                Measures the non-linear similarity between captured packet size sequences and known website template 
                fingerprints, matching visited URLs over VPN/Tor despite fluctuating internet latencies.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Bursty vs Padded Traffic Flow */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Visualizing Traffic Waveforms
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Transmission Profiles: Unpadded Bursty Traffic vs. Constant-Bitrate (CBR) Padding
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how unpadded encrypted traffic leaks burst intervals and download sizes to passive sniffers, while 
              Constant-Bitrate (CBR) padding injects dummy packets to maintain a completely flat, opaque profile.
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`${svgWaveId}-burstGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id={`${svgWaveId}-padGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0e7490" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="40" x2="60" y2="280" stroke="#334155" strokeWidth="1.5" />
              <line x1="60" y1="160" x2="840" y2="160" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="60" y1="280" x2="840" y2="280" stroke="#334155" strokeWidth="1.5" />

              {/* Axis Labels */}
              <text x="30" y="100" fill="#94a3b8" fontSize="10" transform="rotate(-90 30 100)" textAnchor="middle">
                Throughput (Mbps)
              </text>
              <text x="450" y="310" fill="#94a3b8" fontSize="11" textAnchor="middle">
                Time (Seconds) ➔
              </text>

              {/* WAVEFORM 1: Unpadded Bursty Traffic (Top) */}
              <path
                d="M 60 140 L 120 140 L 140 60 L 180 60 L 200 140 L 320 140 L 340 50 L 400 50 L 420 140 L 560 140 L 580 70 L 640 70 L 660 140 L 840 140 L 840 150 L 60 150 Z"
                fill={`url(#${svgWaveId}-burstGrad)`}
              />
              <path
                d="M 60 140 L 120 140 L 140 60 L 180 60 L 200 140 L 320 140 L 340 50 L 400 50 L 420 140 L 560 140 L 580 70 L 640 70 L 660 140 L 840 140"
                stroke="#f43f5e"
                strokeWidth="2.5"
                fill="none"
              />

              <text x="250" y="75" fill="#fecdd3" fontSize="11" fontWeight="bold">
                Unpadded TLS Traffic: Leaks Webpage Asset Bursts (45 Mbps Spikes)
              </text>

              {/* WAVEFORM 2: Constant-Bitrate Padded Traffic (Bottom) */}
              <rect x="60" y="190" width="780" height="70" fill={`url(#${svgWaveId}-padGrad)`} />
              <line x1="60" y1="190" x2="840" y2="190" stroke="#06b6d4" strokeWidth="2.5" />

              <text x="250" y="225" fill="#cffafe" fontSize="11" fontWeight="bold">
                CBR Traffic Padded Link: 100% Flatline (Zero Metadata Leakage)
              </text>
              <text x="250" y="245" fill="#67e8f9" fontSize="10">
                Continuous Dummy Encrypted Packet Injection (Flat 50 Mbps Stream)
              </text>

              {/* Animated Moving Packet Indicators */}
              <circle r="4" fill="#06b6d4">
                <animate attributeName="cx" from="60" to="840" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="190;190" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Metadata Threat Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Metadata Threat Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a metadata profiling technique below to inspect its operational mechanics, mathematical model, 
              live packet trace, and production mitigation code:
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
                    ? "bg-cyan-950/80 border-cyan-500 shadow-lg shadow-cyan-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-cyan-950 text-cyan-300 border-cyan-800 self-start">
                  METADATA
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
                    {activeVector.targetLayer}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Detectability Score</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold",
                    activeVector.detectabilityScore > 50
                      ? "text-emerald-400"
                      : activeVector.detectabilityScore &gt; 20
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {activeVector.detectabilityScore}/100{" "}
                  <span className="text-xs font-normal text-gray-400">
                    ({activeVector.detectabilityScore < 15 ? "Stealthy Metadata" : "Observable Profile"})
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Mathematical Model &amp; Exploitation Flow
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.mathematicalModel}</p>
                  <p className="text-gray-400 leading-relaxed mt-2">{activeVector.mechanism}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Captured Metadata Trace &amp; Fingerprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto whitespace-pre-wrap border border-amber-950/50">
                    {activeVector.realWorldPayload}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Anti-Traffic Analysis Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.mitigation}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Production Mitigation Configuration
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.configCode}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Waveform & Bandwidth Overhead Simulator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Traffic Padding &amp; Bandwidth Efficiency Simulator
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust traffic burst parameters below to calculate bandwidth overhead trade-offs when enforcing 
              Constant-Bitrate (CBR) traffic padding against passive surveillance:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Traffic Rate Controls</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Average Real Data Rate:</span>
                  <span className="text-cyan-400 font-bold">{realDataRateMbps} Mbps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={realDataRateMbps}
                  onChange={(e) => setRealDataRateMbps(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-400">
                  <span>Peak Transmission Burst:</span>
                  <span className="text-amber-400 font-bold">{peakBurstMbps} Mbps</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  step="5"
                  value={peakBurstMbps}
                  onChange={(e) => setPeakBurstMbps(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                /&gt;
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsPaddingEnabled(!isPaddingEnabled)}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 border",
                    isPaddingEnabled
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-rose-950 border-rose-500 text-rose-300"
                  )}
                &gt;
                  {isPaddingEnabled ? "✔ CBR Traffic Padding ACTIVE" : "✖ CBR Traffic Padding DISABLED"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Simulation Diagnostics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Transmitted Rate</span>
                  <span className="text-base font-extrabold text-cyan-400">{waveformMetrics.transmittedBandwidth} Mbps</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Wire Consumption</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Bandwidth Efficiency</span>
                  <span className="text-base font-extrabold text-indigo-400">{waveformMetrics.bandwidthEfficiency}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Real Data / Total Rate</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Metadata Leakage Risk</span>
                  <span className={clsx("text-base font-extrabold", isPaddingEnabled ? "text-emerald-400" : "text-rose-400")}>
                    {waveformMetrics.metadataLeakageScore}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Flow Profiling Risk</span>
                </div>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Shannon Entropy of Wire Traffic:</span>
                  <span className="font-bold text-emerald-400">{waveformMetrics.entropyScore}</span>
                </div>
                <p className="text-gray-400 text-[11px] pt-1">
                  Efficiency Formula: <code className="text-cyan-300 font-mono">η = (R_avg / max(R_burst)) × 100%</code>. 
                  Achieving zero metadata leakage requires allocating full peak capacity 100% of the time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - TShark Command Lab */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              CLI Telemetry Extraction
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. TShark Automated Packet Extraction &amp; NetFlow Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production TShark and NetFlow commands used by security engineers to extract flow metadata 
              and cleartext protocol fields on headless Linux data center servers:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(tsharkDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTsharkTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeTsharkTab === key
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
              <h3 className="text-sm font-bold text-white">{activeTshark.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                TShark CLI Command
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeTshark.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeTshark.command}
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
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita defeat metadata analysis 
              and packet sniffing across West Bengal infrastructure:
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
                  The Incident &amp; Threat Vector
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Remediation
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
              7. Legal &amp; Regulatory Mandates for Network Traffic Logging in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian regulatory directives enforce strict synchronization, logging, and privacy safeguards for all 
              network traffic monitoring operations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-purple-950 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                CERT-In Time Synchronization Directive
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">NPL India NTP Mandate:</strong> All enterprise ICT clocks must synchronize with Indian Standard Time (IST) via NPL India or NIC servers (<code className="text-purple-300">samay1.nic.in</code>).
                </li>
                <li>
                  <strong className="text-white">Microsecond Correlation:</strong> Guarantees uniform timestamp accuracy across routers, firewalls, and traffic capture sensors for court-admissible forensic evidence.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act 2000 &amp; Section 69
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil penalties up to ₹1 Crore for unauthorized traffic packet capture and data extraction.
                </li>
                <li>
                  <strong className="text-white">Section 69:</strong> Lawful traffic monitoring requires explicit written orders from the Union/State Home Secretary.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 Telemetry Privacy
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 8(5):</strong> Network IP flows and browsing telemetry linked to Indian citizens must be encrypted and protected as personal data.
                </li>
                <li>
                  <strong className="text-white">Section 33:</strong> Statutory penalties up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for unencrypted PCAP or telemetry data breaches.
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
                  <strong>Assuming Encryption Hides Everything:</strong> TLS and VPNs hide payload text, but packet sizes, burst timing, and domain lookups still leak intelligence.
                </li>
                <li>
                  <strong>Ignoring VoIP VBR Leakage:</strong> Encrypted voice calls using Variable Bitrate (VBR) leak spoken words through phoneme packet length variations.
                </li>
                <li>
                  <strong>Neglecting SSH Keystroke Delays:</strong> Typing in interactive SSH shells emits individual packets whose millisecond time deltas leak keyboard geometry.
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
                  <strong>Enable TLS 1.3 Record Padding:</strong> Pad encrypted API records to uniform 1KB/2KB blocks to eliminate response-size leakage.
                </li>
                <li>
                  <strong>Deploy Constant-Rate IPsec Tunnels:</strong> Inject continuous dummy traffic between mission-critical command centers to conceal operational surges.
                </li>
                <li>
                  <strong>Enforce CBR Opus in WebRTC:</strong> Configure VoIP gateways with constant bitrate audio to eliminate speech phoneme profiling.
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
                  If you send 10 identical letters in heavy envelopes vs 1 letter in a thin envelope, can the mail carrier guess which one has a book?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Tor use fixed 514-byte cells rather than packing exact message bytes into packets?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  Calculate Shannon entropy on cleartext SQL vs AES-256 ciphertext—observe the jump from ~3.8 to ~7.99 bits/byte.
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Packet Sniffing inspects cleartext payloads; Traffic Analysis studies encrypted metadata.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Website Fingerprinting uses packet size sequences to identify URLs over VPN/Tor.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Constant-Bitrate (CBR) padding injects continuous dummy noise to conceal traffic surges.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Tor enforces 514-byte fixed cell encapsulation to defeat packet-length analysis.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Shannon entropy &gt; 7.9 bits/byte distinguishes ciphertext from low-entropy cleartext.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates NPL India NTP synchronization for all enterprise traffic telemetry logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Traffic Analysis & Packet Sniffing FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Statistical Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Passive Attacks: Traffic Analysis and Packet Sniffing (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Encryption is necessary, but it is not sufficient on its own to defeat passive surveillance! Even when AES-256 or TLS 1.3 completely shields your data bytes, an adversary analyzing packet size waterfalls, keystroke arrival timing (Δt), or VoIP voice codecs can reconstruct what you are doing! Always combine payload encryption with Constant-Bitrate (CBR) traffic padding, enforce TLS 1.3 record padding, and synchronize your server clocks with NPL India per CERT-In mandates!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
