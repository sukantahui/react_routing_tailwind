import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgUebaId = useId();

  // Studio 1: Active Anomaly Selection
  const [selectedAnomalyKey, setSelectedAnomalyKey] = useState("impossible_travel_velocity");

  // Studio 2: Live UEBA Detection Calculator State
  const [zScoreDeviation, setZScoreDeviation] = useState(4.2); // 1.0 to 5.0 Sigma
  const [dataQualityScore, setDataQualityScore] = useState(3.5); // 1.0 to 4.0
  const [calibrationStrength, setCalibrationStrength] = useState(1); // 1 = Raw Logs, 50 = Static SIEM, 500 = Calibrated UEBA + SOAR

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_lateral_movement_ueba");

  // Studio 4: UEBA Machine Learning Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("isolation_forest_classifier_python");

  // 8 UEBA Anomaly Profiles for Studio 1
  const anomalyDatabase = {
    impossible_travel_velocity: {
      key: "impossible_travel_velocity",
      name: "1. Impossible Travel & Velocity Identity Anomalies",
      category: "GEOGRAPHICAL AUTHENTICATION ANOMALY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      mlAlgorithm: "Haversine Geodesic Distance & Velocity Modeling",
      exploitationVector:
        "An adversary uses stolen session cookies in Frankfurt 10 minutes after the legitimate user logged in from Salt Lake Sector V; physical travel speed exceeds 28,000 km/h.",
      vulnerabilityImpact:
        "Account takeover and session hijacking bypassing standard perimeter firewalls using legitimate session tokens.",
      telemetryIndicator: "Entra ID / Okta sign-in logs showing geographically distant IP addresses within an impossible timeframe (< 1 hour)",
      resilientDefense: "Continuous Access Evaluation (CAE) triggering instant token revocation and FIDO2 step-up challenges.",
      codeSnippet: `// Impossible Travel Geodesic Calculation:
let distance_km = CalculateHaversineDistance(Kolkata_Coords, Frankfurt_Coords); // 7,200 km
let time_hours = (Timestamp2 - Timestamp1) / 3600; // 0.25 hours
let velocity_kmh = distance_km / time_hours; // 28,800 km/h (Physically Impossible!) ➔ TRIGGER SOAR LOCKDOWN!`
    },
    flight_risk_data_hoarding: {
      key: "flight_risk_data_hoarding",
      name: "2. Pre-Resignation Flight Risk & Data Hoarding",
      category: "NOTICE PERIOD BEHAVIORAL SURGE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      mlAlgorithm: "Time-Series Rolling Window Z-Score Analytics",
      exploitationVector:
        "An employee who submitted a 30-day resignation notice systematically downloads files from cross-departmental shares (finance, core trading) outside their assigned role.",
      vulnerabilityImpact:
        "Mass intellectual property theft and trade secret exfiltration to competing commercial entities.",
      telemetryIndicator: "Surge in file download volume ($Z > 3.8\\sigma$) and unique directory access counts during notice period",
      resilientDefense: "Automated HR-IT integration placing resigning employees into restricted Notice Period DLP groups.",
      codeSnippet: `// Flight Risk Threshold Adjustment:
if (User.HRStatus == "Notice_Period") {
    User.AnomalyThresholdMultiplier = 0.5; // Halves threshold for instant alerting!
    EnforceNoticePeriodDLPPolicy(User);
}`
    },
    isolation_forest_multivariant: {
      key: "isolation_forest_multivariant",
      name: "3. Unsupervised Isolation Forest Multi-Variant Clustering",
      category: "UNSUPERVISED ML OUTLIER DETECTION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      mlAlgorithm: "Recursive Multi-Dimensional Decision Tree Partitioning",
      exploitationVector:
        "A rogue insider operates slowly across multiple variables (slightly off-hours, slightly higher volume, novel commands), evading static threshold rules.",
      vulnerabilityImpact:
        "Slow-and-low insider data harvesting that remains invisible to traditional threshold-based SIEM systems.",
      telemetryIndicator: "Isolation Forest anomaly score approaching 1.0 based on joint multidimensional probability density",
      resilientDefense: "Unsupervised Isolation Forest ensembles scoring user activity across 50+ simultaneous behavioral features.",
      codeSnippet: `// Python Isolation Forest Snippet:
from sklearn.ensemble import IsolationForest
clf = IsolationForest(contamination=0.01, random_state=42)
clf.fit(user_behavior_matrix) # Features: [LoginHour, BytesTransferred, ProcessCount]
anomaly_score = clf.decision_function(new_user_activity)`
    },
    vip_medical_record_snooping: {
      key: "vip_medical_record_snooping",
      name: "4. VIP Medical & Financial Record Privilege Snooping",
      category: "CROWN JEWEL ACCESS VIOLATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mlAlgorithm: "Crown Jewel Association Matrix & Peer Baselining",
      exploitationVector:
        "A clinic receptionist in Ichapur views the confidential oncology diagnostic scans of a prominent political leader not assigned to their department.",
      vulnerabilityImpact:
        "Breach of patient medical confidentiality, reputational damage, and ₹250 Crore DPDP statutory penalties.",
      telemetryIndicator: "Database read events accessing VIP-tagged records without an active patient care ticket association",
      resilientDefense: "Database Activity Monitoring (DAM) and instant SOAR alerting on unauthorized VIP record queries.",
      codeSnippet: `// VIP Record Snooping Detection Logic:
if (Record.IsVIP == true && !User.ActivePatientRoster.Contains(Record.PatientID)) {
    TriggerAlert("PRIVILEGE SNOOPING DETECTED: Unauthorized access to VIP oncology records!");
    LogForensicAuditTrail();
}`
    },
    lateral_movement_graph_analytics: {
      key: "lateral_movement_graph_analytics",
      name: "5. Lateral Movement & Authentication Graph Analysis",
      category: "NETWORK GRAPH CENTRALITY ANOMALY",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      mlAlgorithm: "Bipartite Graph Degree Centrality & Path Analysis",
      exploitationVector:
        "An adversary compromises a development workstation in Kolkata and initiates RDP/SSH connections to 15 adjacent internal servers within 5 minutes.",
      vulnerabilityImpact:
        "Lateral propagation across enterprise subnets, compromising domain controllers and financial databases.",
      telemetryIndicator: "Sudden spike in out-degree centrality on user-to-host authentication graphs",
      resilientDefense: "Automated host isolation via micro-segmentation and revoking Kerberos ticket-granting tickets (TGT).",
      codeSnippet: `// Graph Centrality Lateral Movement Logic:
let novel_connections_count = CountNovelHostConnections(User, Window="5m");
if (novel_connections_count > 5) {
    TriggerAlert("LATERAL MOVEMENT DETECTED: Abnormal degree centrality spike!");
    IsolateHostFromVLAN();
}`
    },
    service_account_interactive_login: {
      key: "service_account_interactive_login",
      name: "6. Non-Human Service Account Interactive Login",
      category: "SERVICE PRINCIPAL COMPROMISE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      mlAlgorithm: "LogonType Categorical Baseline Classifier",
      exploitationVector:
        "An attacker steals the password of an automated backup service account (`svc_backup`) and uses it to log in interactively via desktop RDP.",
      vulnerabilityImpact:
        "Full administrative system compromise using high-privilege service accounts with zero MFA enforcement.",
      telemetryIndicator: "Windows Event ID 4624 with `LogonType = 2 (Interactive)` or `LogonType = 10 (RemoteInteractive)` on service accounts",
      resilientDefense: "Group Policy preventing interactive logons for all service accounts and enforcing Managed Identity tokens.",
      codeSnippet: `// Service Account Interactive Login Rule:
if (User.AccountType == "Service_Account" && LogonType == "Interactive_GUI_RDP") {
    TriggerAlert("CRITICAL SERVICE ACCOUNT COMPROMISE: Automated account initiated desktop session!");
    RevokeServicePrincipal();
}`
    },
    c2_beaconing_cadence_variance: {
      key: "c2_beaconing_cadence_variance",
      name: "7. C2 Beaconing Periodic Cadence Detection",
      category: "NETWORK TIME-INTERVAL REGULARITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      mlAlgorithm: "Fourier Transform & Inter-Packet Interval Variance",
      exploitationVector:
        "Malware installed on a workstation communicates with an external C2 server at perfectly rigid 60-second intervals with near-zero jitter variance.",
      vulnerabilityImpact:
        "Persistent command-and-control communication allowing external attackers to stage long-term data exfiltration.",
      telemetryIndicator: "Outbound connection time-delta variance approaching zero ($S^2 < 0.05$) across 100+ requests",
      resilientDefense: "Network Traffic Analysis (NTA) flagging synthetic periodic cadence and terminating malicious socket flows.",
      codeSnippet: `// C2 Beaconing Interval Variance Calculation:
double variance = CalculateIntervalVariance(OutboundConnectionTimestamps);
if (variance < 0.1 && TotalConnections > 100) {
    TriggerAlert("MALWARE C2 BEACONING DETECTED: Rigid periodicity indicating automated implant!");
}`
    },
    honeypot_decoy_account_trap: {
      key: "honeypot_decoy_account_trap",
      name: "8. Decoy Honeypot User Account Triggers",
      category: "DECEPTION TECHNOLOGY & ZERO FALSE ALARMS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      mlAlgorithm: "Binary Deterministic Deception Trigger",
      exploitationVector:
        "An insider conducts an internal password spray or Kerberoasting attack, attempting authentication against a bogus decoy account (`admin_backup_svc`).",
      vulnerabilityImpact:
        "Signals active reconnaissance and credential harvesting within the internal perimeter.",
      telemetryIndicator: "Any authentication request or Kerberos TGS request targeting designated honeytoken accounts",
      resilientDefense: "Instant automated quarantine of the source IP address and revoking the compromised user session.",
      codeSnippet: `// Honeytoken User Account Alert:
if (TargetAccount == "svc_honeypot_admin" && EventType == "Kerberos_PreAuth") {
    TriggerSOCIncident("CRITICAL THREAT: Honeypot user account attacked! Attacker IP: " + SourceIP);
    IsolateAttackerIP();
}`
    }
  };

  const activeAnomaly = anomalyDatabase[selectedAnomalyKey];

  // Studio 2: Live UEBA Threat Detection Calculations
  const uebaSimulation = useMemo(() => {
    // P_detect = 1 - e^(- (Z_anomaly * D_quality) / R_noise)
    const numerator = zScoreDeviation * dataQualityScore;
    const exponent = -numerator / calibrationStrength;
    const rawDetectionProb = (1 - Math.exp(exponent)) * 100;
    const actualDetectionProb = calibrationStrength >= 500
      ? (rawDetectionProb * 0.985).toFixed(2) // Calibrated UEBA + SOAR detects 98.5% with high fidelity
      : calibrationStrength >= 50
      ? (rawDetectionProb * 0.65).toFixed(2)  // Static SIEM detects 65% with high false positives
      : rawDetectionProb.toFixed(2);           // Raw Logs -> 100% false alarms / low accuracy

    return {
      rawDetectionProb: rawDetectionProb.toFixed(2),
      actualDetectionProb,
      badgeClass: parseFloat(actualDetectionProb) > 85
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : parseFloat(actualDetectionProb) > 50
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: parseFloat(actualDetectionProb) > 85
        ? `HIGH-FIDELITY UEBA SHIELD: With Calibrated UEBA & Isolation Forests (${calibrationStrength}x), insider threat detection probability is ${actualDetectionProb}% with near-zero false alarms!`
        : `HIGH FALSE ALARM RISK: Without calibrated peer baselines (${calibrationStrength}x), statistical deviation (${zScoreDeviation.toFixed(1)}σ) produces noisy alerts (${actualDetectionProb}% fidelity) causing SOC alert fatigue!`
    };
  }, [zScoreDeviation, dataQualityScore, calibrationStrength]);

  // Studio 4: UEBA Machine Learning Production Code Database
  const codeDatabase = {
    isolation_forest_classifier_python: {
      name: "Python Script for Isolation Forest User Behavior Anomaly Classification",
      code: `import numpy as np
from sklearn.ensemble import IsolationForest

def train_and_evaluate_ueba_model(training_matrix, current_user_event):
    print("[*] --- TRAINING UNSUPERVISED ISOLATION FOREST UEBA MODEL ---")
    
    # Features: [LogonHour, DailyDownloadMB, DistinctSharesAccessed, UniqueCommands]
    clf = IsolationForest(n_estimators=100, contamination=0.01, random_state=42)
    clf.fit(training_matrix)
    
    # Evaluate Current User Event
    prediction = clf.predict([current_user_event]) # -1 = Anomaly, 1 = Normal
    anomaly_score = clf.decision_function([current_user_event])[0]
    
    print(f"[+] User Activity Vector : {current_user_event}")
    print(f"[+] Anomaly Raw Score    : {anomaly_score:.4f}")
    
    if prediction[0] == -1:
        print("[!] ANOMALOUS INSIDER BEHAVIOR DETECTED! Isolated Outlier Point.")
        print("[-] Action: Triggering SOAR Playbook to Revoke Active Kerberos TGT!")
        return True
    else:
        print("[+] Normal Behavioral Activity Clustered within Peer Baseline.")
        return False

# 100 samples of normal peer activity [Hour 9-18, Download 20-80MB, Shares 1-3, Cmds 5-15]
normal_peers = np.random.uniform(low=[9, 20, 1, 5], high=[18, 80, 3, 15], size=(100, 4))
rogue_event = [3, 12500, 18, 95] # 3 AM, 12.5GB, 18 Shares, 95 Commands!

train_and_evaluate_ueba_model(normal_peers, rogue_event)`,
      explanation: "Python machine learning script training an unsupervised Isolation Forest model on 4-dimensional peer activity vectors, classifying rogue insider behaviors as isolated outliers."
    },
    continuous_access_evaluation_powershell: {
      name: "PowerShell Script Integrating with Entra ID Continuous Access Evaluation (CAE)",
      code: `# Real-Time SOAR Remediation Script Triggered by High UEBA Risk Score (>= 85):
param(
    [string]$UserPrincipalName = "rogue_insider@kolkata-fintech.in",
    [int]$UebaRiskScore = 92
)

Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.AccessAsUser.All"

Write-Host "[*] UEBA High-Risk Alert Received! User: $UserPrincipalName | Score: $UebaRiskScore/100" -ForegroundColor Red

if ($UebaRiskScore -ge 85) {
    Write-Host "[!] Enforcing Instant Zero-Trust Remediation via Continuous Access Evaluation..." -ForegroundColor Yellow
    
    # 1. Invalidate all active OAuth / Refresh Tokens across Microsoft 365
    Revoke-MgUserSignInSession -UserId $UserPrincipalName
    
    # 2. Force Next Sign-In to Require FIDO2 Biometric Hardware Key
    # Set-MgUserAuthenticationMethod ...
    
    Write-Host "[+] User Sessions TERMINATED across all endpoints in 1.1 Seconds!" -ForegroundColor Green
}`,
      explanation: "PowerShell automated SOAR response script triggered when a user's composite UEBA risk score exceeds 85, instantly invalidating active OAuth sessions across Microsoft 365 in under 2 seconds."
    },
    sql_ueba_zscore_calculator: {
      name: "SQL Analytics Query for 90-Day Rolling Z-Score Anomaly Calculation",
      code: `-- SQL Query to Calculate Real-Time 90-Day Rolling Z-Scores for File Downloads
WITH UserStats AS (
    SELECT 
        user_id,
        AVG(daily_download_mb) AS mean_download,
        STDDEV(daily_download_mb) AS stddev_download
    FROM corporate_file_access_logs
    WHERE event_date >= CURRENT_DATE - INTERVAL '90 days'
    GROUP BY user_id
)
SELECT 
    today.user_id,
    today.daily_download_mb,
    stats.mean_download,
    stats.stddev_download,
    ((today.daily_download_mb - stats.mean_download) / NULLIF(stats.stddev_download, 0)) AS z_score
FROM daily_file_access_today today
JOIN UserStats stats ON today.user_id = stats.user_id
WHERE ((today.daily_download_mb - stats.mean_download) / NULLIF(stats.stddev_download, 0)) > 3.5;
-- Returns users exceeding 3.5 Standard Deviations above their 90-day baseline!`,
      explanation: "SQL analytics query calculating 90-day rolling mean and standard deviation per user, identifying statistical Z-score anomalies exceeding 3.5 sigma in daily download volumes."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_lateral_movement_ueba",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Catching Lateral Movement Hopping from a Dev Laptop to Settlement Switches",
      threatType: "LATERAL MOVEMENT & BIPARTITE GRAPH ANOMALY",
      budget: "₹56,00,000",
      incident:
        "An adversary who compromised a developer's workstation attempted to pivot across 14 internal servers using PsExec to reach core settlement switches.",
      defenseStrategy:
        "Mamata's UEBA authentication graph engine detected the sudden surge in out-degree centrality (14 novel host edges in 3 minutes), isolating the host port via 802.1X.",
      outcome: "Lateral movement terminated; core settlement gateways protected; zero banking ledger tampering.",
      metrics: {
        lateralHopsBlocked: "14 Network Hops",
        isolationLatency: "1.1 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_sequence_ueba",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "MARKOV CHAIN ANOMALOUS SCADA COMMAND SEQUENCE",
      title: "Detecting Anomalous Off-Hours SCADA Command Sequence Injections",
      budget: "₹39,00,000",
      incident:
        "A compromised operator account initiated a high-risk breaker trip sequence at 2:45 AM, an action sequence with a historical probability of $P < 0.00001$.",
      defenseStrategy:
        "Debangshu's Markov sequence analyzer flagged the zero-probability command transition, held the breaker trip in a pending state, and required secondary physical confirmation.",
      outcome: "Unauthorized breaker trip prevented; power grid frequency stabilized; zero power blackout across North 24 Parganas.",
      metrics: {
        breakerTripPrevented: "100% Intercepted",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_peer_clustering",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "PEER CLUSTER ANOMALY & VIP ONCOLOGY RECORD SNOOPING",
      title: "Detecting Anomalous VIP Medical Record Queries Across Clinic Desks",
      budget: "₹28,00,000",
      incident:
        "An administrative billing clerk queried 50 VIP oncology diagnostic scans in 15 minutes, an activity 12x higher than the billing peer group cluster mean.",
      defenseStrategy:
        "Mahima's UEBA peer-group baseline engine flagged the 12-sigma deviation, locked the clerk's session, and generated a forensic audit timeline.",
      outcome: "VIP medical records protected; zero patient oncology diagnostic scans leaked; 120,000 records protected.",
      metrics: {
        peerGroupZScore: "12.4 Sigma",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_ueba_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF UEBA DETECTION PROBABILITY & NOISE FILTERING",
      title: "Formulating the UEBA Anomaly Score & Threat Detection Model",
      budget: "₹24,00,000",
      incident:
        "Researchers analyzed the mathematical interaction between statistical Z-scores, multi-source log quality, and noise tolerance across 70,000 test events.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that calibrated UEBA models achieve 98.4% detection with near-zero false alarms.",
      outcome: "Published peer-reviewed mathematical proof; verified across 70,000 simulated insider threat events.",
      metrics: {
        simulationTrials: "70,000 Test Trials",
        modelAccuracy: "99.7% Predictive Fit",
        modelFramework: "UEBA Detection Equation",
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
                Module 004_003
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 11
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              User Behavior Analytics (UBA / UEBA) for Insider Threat Detection
            </h1>
            <p className="text-xs text-gray-400">
              Isolation forests, peer group baselining, impossible travel, Markov sequence models, Continuous Access Evaluation, and IT Act Section 72A.
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
              Behavioral Machine Learning Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of UEBA: Dynamic Machine Learning Baselining vs Static SIEM Rules
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Traditional Security Information and Event Management (SIEM) systems rely on static threshold rules that generate 
              overwhelming false positive fatigue and fail when attackers operate slowly using legitimate credentials. 
              <strong>User and Entity Behavior Analytics (UEBA)</strong> leverages machine learning to dynamically baseline 
              normal behavior across multi-source telemetry (Active Directory, VPNs, Endpoint DLP, Proxy logs), utilizing 
              <strong>Peer Group Baselining</strong>, <strong>Statistical Z-Score Analytics</strong>, <strong>Isolation Forests</strong>, 
              and <strong>Markov Chain sequence models</strong> to detect anomalous insider threats, impossible travel velocity, and 
              pre-resignation data hoarding in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Peer Baselining & Isolation Forest Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Peer Group Clustering &amp; Isolation Forest ML
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Isolation Forest: Recursively isolates multi-dimensional outliers ➔ Zero-Day Anomaly Detected!
              </div>
              <p className="text-gray-300 leading-relaxed">
                By clustering employees into peer cohorts (e.g. comparing QA engineers against QA peers rather than DBAs), 
                UEBA eliminates false alarms from normal high-volume workloads while flagging anomalous downloads by non-technical staff.
              </p>
            </div>

            {/* Composite Risk & CAE Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Composite Risk Scoring &amp; Continuous Access (CAE)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Composite Risk Score:</strong> Combines multi-vector anomalies into a unified 0-100 risk score.</li>
                <li>• <strong className="text-purple-300">Continuous Access Evaluation:</strong> Revokes OAuth tokens automatically when risk exceeds 85.</li>
                <li>• <strong className="text-amber-300">Honeypot Decoy Accounts:</strong> Produces zero-false-positive alerts on internal credential spraying.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - UEBA Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              UEBA Detection Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing The UEBA Machine Learning Pipeline &amp; Automated SOAR Response
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how multi-source log streams undergo 90-day baseline modeling, peer group clustering, 
              and unsupervised Isolation Forest scoring to trigger real-time Continuous Access Evaluation session revocation:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: LOG STREAM INGESTION */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. LOG INGESTION
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Kafka / Flink Streams
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TELEMETRY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Active Directory / VPN
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Endpoint DLP &amp; Cloud
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: PEER GROUP CLUSTERING */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. PEER BASELINE
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  90-Day Rolling Mean
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CLUSTERING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  K-Means by Job Role
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Zero False Positives!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: ISOLATION FOREST ML */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. ISOLATION ML
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Unsupervised Outliers
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ANOMALY ENGINE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Z-Score &gt; 4.0 Sigma
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Markov Sequence Check
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: COMPOSITE RISK AGGREGATION */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. RISK SCORE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  0-100 Metric Aggregator
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MULTI-VECTOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Travel + Time + Volume
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Composite Score = 92
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: AUTOMATED SOAR REMEDIATION */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SOAR REMEDIATE
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Continuous Access (CAE)
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AUTO ACTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Revokes Active Tokens
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Isolates Endpoint Port!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Anomaly UEBA Profile Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. UEBA Threat Anomaly &amp; Algorithm Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an anomaly profile below to examine its machine learning algorithm, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(anomalyDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedAnomalyKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedAnomalyKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  ANOMALY
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeAnomaly.categoryBadge)}>
                    {activeAnomaly.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Algorithm: {activeAnomaly.mlAlgorithm}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeAnomaly.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAnomaly.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeAnomaly.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeAnomaly.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeAnomaly.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Algorithm / Code Pattern
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeAnomaly.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live UEBA Threat Detection Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. UEBA Anomaly Score &amp; Detection Fidelity Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust statistical Z-score deviation Z, multi-source log quality D, and noise tolerance calibration R 
              to model threat detection probability P_detect = 1 - exp(-(Z × D) / R) and see how calibrated UEBA achieves over 98.4% detection with zero false alarms:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Statistical &amp; Quality Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Z-Score Deviation (Z):</span>
                  <span className="text-cyan-400 font-bold font-mono">{zScoreDeviation.toFixed(1)}σ</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.2"
                  value={zScoreDeviation}
                  onChange={(e) => setZScoreDeviation(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Log Data Quality (D):</span>
                  <span className="text-rose-400 font-bold font-mono">{dataQualityScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={dataQualityScore}
                  onChange={(e) => setDataQualityScore(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Baseline Calibration (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setCalibrationStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      calibrationStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Raw Logs (1x)
                  </button>
                  <button
                    onClick={() => setCalibrationStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      calibrationStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    SIEM Rules (50x)
                  </button>
                  <button
                    onClick={() => setCalibrationStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      calibrationStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    UEBA ML (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">UEBA Detection Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Anomaly Probability</span>
                  <span className="text-lg font-extrabold text-white">{uebaSimulation.rawDetectionProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Peer Baselining</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Detection Fidelity Score</span>
                  <span className="text-lg font-extrabold text-emerald-400">{uebaSimulation.actualDetectionProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Calibrated UEBA Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", uebaSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Behavioral Intelligence Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{uebaSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - UEBA Machine Learning Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Isolation Forest &amp; Continuous Access Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production UEBA Machine Learning &amp; SOAR Response Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python Isolation Forest classifiers, PowerShell Continuous Access Evaluation (CAE) remediation scripts, 
              and SQL analytics queries calculating 90-day rolling Z-scores:
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
                Production Script / Model
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita catch lateral movement, 
              prevent unauthorized SCADA breaker trips, and protect VIP medical files using UEBA machine learning across West Bengal:
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
                  The Incident &amp; Threat Mechanics
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
              7. Legal Compliance for UEBA Monitoring &amp; Data Governance in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, evidence statutes, and data privacy frameworks govern the deployment of employee behavioral monitoring, 
              evidentiary admissibility, and liability for data breaches:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 72A
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Breach of Confidentiality:</strong> Employees disclosing personal records detected via UEBA face up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and ₹5 Lakh fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(b) &amp; IPC 408
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(b):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data copying.
                </li>
                <li>
                  <strong className="text-white">IPC Section 408:</strong> Criminal Breach of Trust by Servant (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; Workplace Privacy
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement organizational data security safeguards.
                </li>
                <li>
                  <strong className="text-white">Pseudonymization:</strong> Enforces employee privacy rights during behavioral analytics.
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
                  <strong>Relying Solely on Static SIEM Threshold Rules:</strong> Misses slow-and-low insider data theft completely.
                </li>
                <li>
                  <strong>Failing to Segment Users into Peer Groups:</strong> Compares normal DBA backups against HR staff, causing false alarms.
                </li>
                <li>
                  <strong>Ignoring Non-Human Service Account Logins:</strong> Service accounts should never log in interactively via desktop RDP.
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
                  <strong>Deploy Unsupervised Isolation Forests:</strong> Detect multi-dimensional anomalies without pre-labeled training data.
                </li>
                <li>
                  <strong>Integrate Continuous Access Evaluation (CAE):</strong> Automatically revoke OAuth tokens when risk scores exceed 85.
                </li>
                <li>
                  <strong>Deploy Active Directory Decoy Honeytoken Accounts:</strong> Zero false-positive detection of internal credential spraying.
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
                  Why does an Isolation Forest isolate anomalous data points near the root of the decision tree with fewer random splits?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does impossible travel velocity detection catch session token theft even when the attacker presents a valid authentication cookie?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set calibration strength to UEBA ML (500x) and observe detection fidelity surge past 98%!
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
                <span>Traditional SIEMs use static threshold rules; UEBA uses ML to baseline normal behavior.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Peer Group Baselining clusters users by department to reduce false positive alerts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Isolation Forest detects anomalies in multi-dimensional data without labeled training sets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Impossible Travel detects logins from two distant cities within impossible timeframes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Continuous Access Evaluation (CAE) revokes OAuth tokens when UEBA risk score exceeds 85.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 72A of the IT Act penalizes Breach of Confidentiality with up to 3 years imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="User Behavior Analytics FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Behavioral ML Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="User Behavior Analytics (UBA / UEBA) for Insider Threat Detection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Machine learning behavioral analytics is the future of insider threat detection and zero-trust identity governance! Understand why static SIEM rules fail: insiders operate using legitimate credentials and slow-and-low access patterns that never trigger simple threshold counters. Master the core UEBA machine learning algorithms: Peer Group Baselining (clustering employees by department to eliminate false alarms from DBA workloads), Statistical Z-Score Analytics (flagging 90-day rolling download volume anomalies exceeding 3.5 sigma), Isolation Forests (unsupervised multi-dimensional decision trees that isolate outlier behaviors near the root), and Markov Chain action sequence models (detecting anomalous transitions like Login ➔ Breaker Trip at 3 AM). Observe high-impact use cases: Impossible Travel Velocity detection catching stolen session cookies, Flight Risk pre-resignation data hoarding, and First-Time-Seen (FTS) lateral movement. To build an automated defense: connect UEBA risk scores directly to Identity Providers using Continuous Access Evaluation (CAE) to terminate OAuth tokens when risk exceeds 85, and deploy honeytoken decoy accounts for zero-false-positive deception. Remember that Section 72A of the Indian IT Act treats Breach of Confidentiality as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
