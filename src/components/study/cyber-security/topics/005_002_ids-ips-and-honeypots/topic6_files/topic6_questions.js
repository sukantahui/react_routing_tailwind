const questions = [
  {
    id: 1,
    question: "What is the 2x2 Confusion Matrix in cybersecurity intrusion monitoring and what do TP, TN, FP, and FN represent?",
    shortAnswer: "A performance grid classifying detection outcomes: True Positive (real attack alerted), True Negative (clean traffic ignored), False Positive / Type I (clean traffic falsely alerted), and False Negative / Type II (real attack missed).",
    explanation: "TP is a successful detection; TN is normal quiet operation; FP causes alert fatigue and accidental IPS outages; FN is the worst-case scenario where an attacker penetrates the network completely undetected.",
    hint: "TP = Real attack caught; TN = Good traffic passed; FP = False alarm; FN = Missed attack.",
    level: "Basic",
    codeExample: `// The 2x2 Security Matrix:
// TP: Real Exploit ➔ Alert Generated (Defense Success)
// TN: Normal Email  ➔ No Alert (Normal Operation)
// FP: Normal Report ➔ Alert Generated (False Alarm / Alert Fatigue)
// FN: Zero-Day APT  ➔ No Alert (Catastrophic Undetected Breach!)`
  },
  {
    id: 2,
    question: "What is 'Precision' (Positive Predictive Value) vs 'Recall' (Sensitivity / True Positive Rate) in IDS performance evaluation?",
    shortAnswer: "Precision is the percentage of generated alerts that are genuine attacks: $TP / (TP + FP)$; Recall is the percentage of all real attacks that the system successfully caught: $TP / (TP + FN)$.",
    explanation: "High precision means SOC analysts do not waste time on false alarms. High recall means zero attacks slip through undetected. The F1-score balances both as a harmonic mean.",
    hint: "Precision = How trustworthy is the alarm; Recall = What fraction of all attacks did we catch.",
    level: "Basic",
    codeExample: `// Formula Definitions:
// Precision = TP / (TP + FP)
// Recall    = TP / (TP + FN)
// F1-Score  = 2 * (Precision * Recall) / (Precision + Recall)`
  },
  {
    id: 3,
    question: "Explain the 'Base Rate Fallacy' in cybersecurity: Why does a 99% accurate IDS still produce 90%+ false alarms?",
    shortAnswer: "Because cyber attacks have an extremely low base rate (e.g. 0.01% of total traffic); applying even a tiny 1% false positive rate across millions of clean packets generates thousands of false alarms that vastly outnumber real attacks.",
    explanation: "Out of 1,000,000 packets with 100 attacks, a 99% accurate sensor catches 99 attacks (TP = 99) but falsely flags 1% of the 999,900 clean packets (FP = 9,999). Over 99% of total generated alerts are false alarms!",
    hint: "Because good traffic is so massive compared to rare attacks, a 1% error creates thousands of false alarms.",
    level: "Moderate",
    codeExample: `// Bayesian Calculation:
// P(Attack | Alert) = TP / (TP + FP) = 99 / (99 + 9,999) = 0.98% True Alert Probability!`
  },
  {
    id: 4,
    question: "What is 'Alert Fatigue' in a Security Operations Center (SOC) and what are its operational consequences?",
    shortAnswer: "When analysts are overwhelmed by thousands of daily false-positive alerts, causing desensitization, cognitive burnout, and accidentally ignoring critical genuine breach notifications.",
    explanation: "The infamous 2013 Target breach occurred partly because security software alerted on malware, but analysts ignored the alert because it was buried among thousands of un-tuned false alarms.",
    hint: "When security guards get so tired of false alarms that they ignore real attack warnings.",
    level: "Basic",
    codeExample: `// Operational Risk of Alert Fatigue:
// 50,000 Daily Alerts ➔ 49,990 False Alarms ➔ 10 Real Attacks buried and ignored by exhausted analysts!`
  },
  {
    id: 5,
    question: "What is 'Signature Tuning' and how does it eliminate false positives caused by greedy regular expressions?",
    shortAnswer: "Refactoring loose, greedy wildcards (`.*`) and overly generic strings (matching words like `select` or `password`) into strict, context-specific tokens (e.g., matching exact SQL grammar or RFC headers).",
    explanation: "A signature matching `select` triggers on every SQL query, database report, and web form. Tuning involves requiring full syntax boundaries: `union[\\s+]+select[\\s+]+.*from` to only trigger on malicious SQL injection.",
    hint: "Rewriting overly broad rules so they only match actual malicious code syntax.",
    level: "Basic",
    codeExample: `// Naive vs Tuned Snort Content:
// Naive (45,000 False Alarms): content:"select";
// Tuned (0 False Alarms)      : content:"UNION SELECT"; pcre:"/UNION\s+SELECT\s+.*\bFROM\b/i";`
  },
  {
    id: 6,
    question: "What is 'Snort Event Filtering' (`event_filter` / `threshold`) and how does it suppress alert storms?",
    shortAnswer: "Restricting the number of alerts logged for a specific rule within a time window (e.g., alert once every 60 seconds per source IP, or alert only after 50 events occur in 5 seconds).",
    explanation: "During a port sweep or DDoS flood, a single rule can fire 100,000 times per second. Event filtering logs one summary alert instead of flooding the SIEM database with 100,000 redundant log rows.",
    hint: "Limiting the alarm to sound once every minute instead of ringing 100,000 times a second.",
    level: "Moderate",
    codeExample: `// Snort Event Filter Syntax:
// event_filter gen_id 1, sig_id 2001, type threshold, track by_src, count 50, seconds 10
// event_filter gen_id 1, sig_id 2002, type limit, track by_src, count 1, seconds 60`
  },
  {
    id: 7,
    question: "What is 'Authorized Scanner Whitelisting' (`suppress` rules in Snort)?",
    shortAnswer: "Configuring rule suppression rules to automatically ignore alerts triggered by scheduled internal vulnerability scanners (e.g. Nessus, Qualys, OpenVAS IP addresses).",
    explanation: "When an authorized internal scanner runs its weekly audit, it triggers hundreds of thousands of exploit signatures. Whitelisting the scanner IP suppresses these expected alerts from SOC queues.",
    hint: "Telling the security scanner to ignore authorized company vulnerability testing tools.",
    level: "Basic",
    codeExample: `// Snort Suppression Directive:
// suppress gen_id 1, sig_id 1005, track by_src, ip 10.10.99.50 (Authorized Nessus Scanner IP)`
  },
  {
    id: 8,
    question: "Why is a 'False Negative' considered the single most catastrophic failure in cybersecurity operations?",
    shortAnswer: "Because a real cyber attack successfully bypasses all security defenses and compromises production servers, establishing long-term persistence and exfiltrating data without anyone knowing.",
    explanation: "While a False Positive costs time, a False Negative results in ransomware extortion, multi-million dollar data breaches, regulatory fines under the DPDP Act 2023, and total brand destruction.",
    hint: "Because an attacker gets in completely undetected and steals company data.",
    level: "Basic",
    codeExample: `// The Cost of Error Types:
// False Positive Cost: ₹500 in analyst triage time.
// False Negative Cost: ₹50 Crores in ransomware extortion and regulatory penalties!`
  },
  {
    id: 9,
    question: "What are 3 primary architectural root causes of False Negatives in network monitoring?",
    shortAnswer: "1. Encrypted Traffic Blind Spots (TLS 1.3 ciphertext without decryption); 2. Packet Fragmentation Evasion (out-of-order byte splitting); 3. Novel Zero-Day Exploits with no pre-existing signature.",
    explanation: "If an IDS cannot decrypt HTTPS, does not perform stream reassembly, or only relies on static signatures, sophisticated attackers easily slip through uninspected, causing false negatives.",
    hint: "Encrypted traffic, fragmented packets, and brand-new zero-day viruses.",
    level: "Moderate",
    codeExample: `// Eliminating False Negatives:
// Deploy [Hardware TLS Decryption Broker] + [Stream Defrag Preprocessor] + [Autoencoder Anomaly Engine]`
  },
  {
    id: 10,
    question: "What is 'Specificity' (True Negative Rate - TNR) and why must it exceed 99.9% in high-speed enterprise networks?",
    shortAnswer: "The proportion of clean packets correctly identified as benign: $TN / (TN + FP)$; in a 10 Gbps link processing billions of packets daily, anything less than 99.9% specificity generates millions of false alarms.",
    explanation: "A specificity of 95% sounds high in academic testing, but on a 10 Gbps network with 1 billion daily packets, a 5% false alarm rate equals 50,000,000 false positive alerts per day, crashing the SIEM.",
    hint: "The ability to accurately ignore good traffic; must be over 99.9% to avoid millions of false alarms.",
    level: "Moderate",
    codeExample: `// Specificity on 1 Billion Daily Packets:
// Specificity = 95.0% ➔ 50,000,000 False Alarms / Day (Catastrophic SIEM Crash!)
// Specificity = 99.99% ➔ 100 False Alarms / Day (Manageable SOC Operation)`
  },
  {
    id: 11,
    question: "What is 'Alert Correlation & De-duplication' in Security Information and Event Management (SIEM)?",
    shortAnswer: "Aggregating multiple raw alerts sharing the same source IP, destination IP, or attack timeframe into a single consolidated 'Security Incident' ticket for SOC review.",
    explanation: "If an attacker launches 500 exploit probes against a web server, the SIEM groups all 500 IDS alerts into one single incident ticket ('Multiple Exploit Probes from 198.51.100.25'), preventing ticket spam.",
    hint: "Grouping 500 related alarm notifications into one single incident ticket for analysts.",
    level: "Basic",
    codeExample: `// SIEM Incident Aggregation Rule:
// Rule: GroupBy(SrcIP, DstIP, Window=5m) ➔ Consolidate 450 Raw Alerts into 1 Triage Incident`
  },
  {
    id: 12,
    question: "How does 'Contextual Asset Enrichment' reduce false positives in SOC alert triage?",
    shortAnswer: "Checking whether the targeted asset is actually vulnerable to the detected exploit (e.g., ignoring a Windows IIS exploit alert if the target server runs Linux Apache).",
    explanation: "If an attacker sends a Windows IIS exploit string to an Ubuntu Linux server, the exploit cannot succeed. Contextual enrichment automatically downgrades the alert severity, saving analyst time.",
    hint: "Ignoring Windows exploit alerts if the target computer is running Linux.",
    level: "Moderate",
    codeExample: `// Contextual Enrichment Filter:
// IF Alert.TargetOS == "Linux" AND Exploit.TargetPlatform == "Windows_IIS":
//     Severity = "INFORMATIONAL" (Non-Applicable Target → No Alert Escalation)`
  },
  {
    id: 13,
    question: "What is 'SOAR (Security Orchestration, Automation, and Response) Automated Triage'?",
    shortAnswer: "Using automated software playbooks to query threat intelligence feeds (VirusTotal / AbuseIPDB), check firewall logs, and verify host agent status before waking up human analysts.",
    explanation: "When an IDS alert fires, the SOAR playbook executes automated tier-1 research within 500 milliseconds: if the source IP is an authorized Google crawler, the ticket is auto-closed as a false positive.",
    hint: "Using software robots to automatically investigate and close false alarms in less than a second.",
    level: "Moderate",
    codeExample: `// SOAR Automated Playbook:
// On Alert ➔ Query AbuseIPDB ➔ IF Confidence == 0 ➔ Auto-Close Ticket (False Positive Resolved)`
  },
  {
    id: 14,
    question: "What is 'Threshold Tuning for Brute-Force Detection' to prevent false alarms on legitimate user typos?",
    shortAnswer: "Setting failed login thresholds higher than normal human typing errors (e.g. alert on >= 10 failed logins in 60s, rather than alerting on 1 or 2 typos).",
    explanation: "Employees regularly mistype passwords 1–3 times. Triggering a security alert on every single failed login floods the SOC with 10,000 false alarms daily. Setting a threshold of 10 attempts isolates real brute-force tools.",
    hint: "Allowing a few normal password typos before sounding the brute-force alarm.",
    level: "Basic",
    codeExample: `// Wazuh Brute Force Threshold:
// <rule id="5712" level="10" frequency="8" timeframe="60">
//   <if_matched_sid>5710</if_matched_sid>
//   <description>SSH brute force attempt (8+ failed logins in 60s)</description>
// </rule>`
  },
  {
    id: 15,
    question: "What is 'Dynamic Thresholding / Adaptive Baselining' in statistical anomaly detection?",
    shortAnswer: "Automatically adjusting anomaly threshold limits based on historical time-of-day and day-of-week patterns (e.g. higher bandwidth thresholds on Monday afternoon, lower thresholds at 3 AM).",
    explanation: "Static thresholds trigger false positives during busy business hours and miss stealthy attacks at night. Dynamic baselining calculates time-varying moving averages, maintaining high sensitivity 24/7.",
    hint: "Setting higher speed limits during rush hour and lower speed limits at night.",
    level: "Moderate",
    codeExample: `// Dynamic Threshold Formula:
// Threshold(t) = Hourly_Mean(t) + 3 * Hourly_StdDev(t)`
  },
  {
    id: 16,
    question: "What is 'User Feedback Loop / Active Learning' in machine learning IDS tuning?",
    shortAnswer: "Allowing SOC analysts to label false positive alerts in the UI with a single click, automatically feeding corrected samples back into the training dataset to retrain the ML model.",
    explanation: "When an analyst marks an alert as 'False Positive (Legitimate Internal Tool)', the active learning pipeline adjusts model weights, ensuring the AI never triggers on that specific tool pattern again.",
    hint: "Letting security guards click 'Not a Threat' so the AI learns from its mistakes.",
    level: "Moderate",
    codeExample: `// Active Learning Feedback:
// Analyst clicks [Mark as False Positive] ➔ Sample added to negative training batch ➔ Model retrained`
  },
  {
    id: 17,
    question: "Why should an enterprise conduct periodic 'Purple Team Adversary Emulation' to discover False Negatives?",
    shortAnswer: "To safely execute real-world attack techniques (using Atomic Red Team / MITRE Caldera) across production subnets, verifying which attacks were missed by IDS sensors (identifying False Negatives).",
    explanation: "Organizations cannot assume their IDS works without testing. Purple teaming simulates real APT tactics; any simulated attack that fails to generate an alert exposes a false negative blind spot that must be patched.",
    hint: "Simulating safe attacks on your own network to see which ones your security system misses.",
    level: "Moderate",
    codeExample: `// Atomic Red Team Test:
// atomic-operator run --atomics T1059.001 (PowerShell Execution) ➔ Verify if IDS generates Alert!`
  },
  {
    id: 18,
    question: "What is 'Signature Decay / Obsolete Rule Pruning' in high-performance IDS management?",
    shortAnswer: "The ongoing maintenance process of reviewing and disabling ancient signatures (e.g. 10-year-old exploits for deprecated protocols) that no longer exist in the enterprise, reducing false positives and CPU load.",
    explanation: "If an enterprise has retired all Windows XP machines, retaining 5,000 Windows XP signatures wastes memory and causes false alarms on random byte collisions. Pruning obsolete rules speeds up DFA matching.",
    hint: "Turning off old rules for software your company no longer uses.",
    level: "Basic",
    codeExample: `// Rule Set Optimization:
// Disable SIDs for Flash Player, IIS 5.0, and Windows Server 2003 exploits.`
  },
  {
    id: 19,
    question: "What is 'Protocol Conformance Whitelisting' (RFC Normalization) in reducing web application false alarms?",
    shortAnswer: "Enforcing strict positive validation schemas (e.g. verifying that `phone_number` contains only digits) rather than searching for millions of blacklisted attack strings.",
    explanation: "Negative regex rules trigger false alarms on names like `O'Connor` or medical terms containing `exec`. A positive schema allows only valid formats, achieving 0% false alarms on valid inputs.",
    hint: "Allowing only pre-approved exact formats (like numbers for phone fields) to eliminate false alarms.",
    level: "Basic",
    codeExample: `// Positive Schema Validation:
// "age": { "type": "integer", "minimum": 1, "maximum": 120 } ➔ Zero False Positives on valid inputs!`
  },
  {
    id: 20,
    question: "What is 'Tiered SOC Alert Escalation' (Tier 1 vs Tier 2 vs Tier 3) in handling alert volume?",
    shortAnswer: "Tier 1 analysts triage high-volume alerts and filter false positives; Tier 2 conducts deep technical forensics on verified True Positives; Tier 3 conducts proactive threat hunting and malware reverse engineering.",
    explanation: "Dividing responsibilities prevents senior engineers from burning out on routine alert noise while ensuring that confirmed real intrusions receive expert forensic investigation immediately.",
    hint: "Junior guards filter false alarms, senior guards investigate real attacks, and expert detectives hunt threats.",
    level: "Basic",
    codeExample: `// SOC Triage Hierarchy:
// 10,000 Raw Alerts ➔ Tier 1 (Automated Filter & Triage) ➔ 20 True Positives ➔ Tier 2 (Deep Forensics)`
  },
  {
    id: 21,
    question: "What is 'Alert Suppression based on Geolocation / BGP ASN' in tuning external threat sensors?",
    shortAnswer: "Suppressing alerts originating from known benign cloud content delivery networks (e.g., Cloudflare, Akamai, Microsoft Azure IP ranges) unless payload confidence is 100%.",
    explanation: "Legitimate cloud CDN servers crawl websites continuously for indexing and performance caching. Suppressing low-severity rate alerts from trusted cloud ASNs cuts false positive noise by 40%.",
    hint: "Ignoring benign web crawlers from big trusted tech companies like Google or Cloudflare.",
    level: "Moderate",
    codeExample: `// ASN Whitelist Filter:
// IF Alert.SrcASN == 13335 (Cloudflare) AND Alert.Severity == "LOW":
//     Action: SUPPRESS_ALERT`
  },
  {
    id: 22,
    question: "How does 'Network Microsegmentation' eliminate lateral False Positives and False Negatives?",
    shortAnswer: "By isolating workloads into tiny zero-trust security zones (e.g. Web Subnet cannot speak directly to Database Subnet without explicit proxy); any unexpected lateral packet is 100% guaranteed to be malicious.",
    explanation: "In flat enterprise networks, thousands of internal chatty protocols generate false alarms. Microsegmentation eliminates noise: because internal databases only receive traffic from approved application IPs, any other connection is a confirmed true positive.",
    hint: "Locking down internal network segments so that any unexpected connection is definitely an attack.",
    level: "Moderate",
    codeExample: `// Microsegmentation Zero-Trust Rule:
// ALLOW: AppServer(10.10.1.10) → DB(10.10.2.10:5432)
// ANY OTHER TRAFFIC → 100% TRUE POSITIVE INTRUSION ALERT!`
  },
  {
    id: 23,
    question: "What is 'Automated Regression Testing for IDS Rule Bases' before deploying signature updates?",
    shortAnswer: "Replaying stored pcap files containing both clean business traffic and attack samples through the new rule base in a staging environment to verify that new rules catch attacks without triggering on business pcap.",
    explanation: "Deploying untested signature updates into production can cause immediate false-positive outages. Automated CI/CD regression tests verify that the new rule set achieves 100% recall on exploit pcaps and 0% false positives on production pcap archives.",
    hint: "Testing new security rules on saved network recordings before turning them on in production.",
    level: "Expert",
    codeExample: `// CI/CD IDS Rule Testing Pipeline:
// suricata -r /pcaps/benign_traffic.pcap -c /rules/new_rules.rules
// ASSERT: Total_Alerts == 0 (Passes False Positive Test!)`
  },
  {
    id: 24,
    question: "What is 'Payload Truncation Risk' and how does it create False Negatives in deep inspection engines?",
    shortAnswer: "When an IDS or packet broker is configured to capture only the first 500 bytes of a packet, completely missing malicious exploit payloads or SQL injection commands located deeper in the HTTP body.",
    explanation: "To save memory, engineers sometimes configure `snaplen 500`. If an attacker hides an exploit payload at byte offset 1200, the truncated sensor misses the attack entirely, causing a false negative.",
    hint: "Cutting off packets too short so the sensor misses the virus hidden deeper in the message body.",
    level: "Moderate",
    codeExample: `// Snaplen Configuration:
// Insecure: snaplen = 500 (Truncates large payloads → False Negatives!)
// Secure  : snaplen = 65535 (Full Packet Capture → 100% Payload Inspection)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance mandate regarding False Positive/Negative Incident Auditing and Rule Tuning Records?",
    shortAnswer: "Organizations must document and maintain a complete audit trail of all rule modifications, suppressed signatures, false positive root-cause analyses, and synchronized SIEM logs for a minimum of 180 days.",
    explanation: "Under Indian cybersecurity directives, security teams must prove that rule suppression was justified and that no unauthorized rules were disabled to conceal internal security breaches.",
    hint: "180-day retention of all rule tuning, suppression records, and alert logs.",
    level: "Basic",
    codeExample: `// Structured Rule Tuning Audit Log:
const certInTuningAuditLog = {
  timestamp: "2026-08-23T12:50:00.120Z",
  action: "RULE_SUPPRESSED",
  sid: 100542,
  reason: "False positive on internal HR report generation",
  authorizedBy: "Sukanta Hui (Lead Architect)",
  retentionDays: 180
};`
  },
  {
    id: 26,
    question: "What is 'Cost-Sensitive Machine Learning' for balancing False Positive vs False Negative trade-offs?",
    shortAnswer: "Assigning asymmetrical financial penalty weights during model training: penalizing False Negatives 100x more heavily than False Positives ($L = 100 \\cdot FN + 1 \\cdot FP$) to ensure the AI prioritizes catching attacks.",
    explanation: "Standard ML algorithms treat all mistakes equally. In cybersecurity, missing a ransomware breach is catastrophic compared to triaging a false alarm. Cost-sensitive loss functions force the model to minimize false negatives.",
    hint: "Teaching the AI that missing an attack is 100 times worse than a false alarm.",
    level: "Expert",
    codeExample: `// Cost-Sensitive Loss Function:
// Total_Loss = (100 * False_Negatives) + (1 * False_Positives)`
  },
  {
    id: 27,
    question: "What is 'Statistical Hypothesis Testing' (Null Hypothesis $H_0$) in network anomaly verification?",
    shortAnswer: "Defining $H_0$: 'The network traffic is normal'. The anomaly engine only rejects $H_0$ and declares an intrusion if the $p$-value is less than the significance level ($\alpha = 0.001$), strictly bounding the false alarm rate.",
    explanation: "Using formal hypothesis testing prevents arbitrary threshold guesses. By setting $\alpha = 0.001$, the security architect mathematically guarantees that false alarms will occur on less than 0.1% of normal flows.",
    hint: "Using formal statistics to guarantee that false alarms stay below a strict mathematical limit.",
    level: "Expert",
    codeExample: `// Hypothesis Testing in Python:
// if p_value < 0.001:
//     reject_null_hypothesis() ➔ TRIGGER_INTRUSION_ALERT()`
  },
  {
    id: 28,
    question: "How does 'Automated Threat Intelligence De-duplication' eliminate false positive IOC matches?",
    shortAnswer: "Validating that open-source Threat Intelligence indicators (IPs, domains) are not shared infrastructure (e.g. AWS CloudFront or Google 8.8.8.8) before importing them into IDS drop tables.",
    explanation: "Low-quality threat feeds often include public DNS resolvers or shared cloud IPs. Without automated scrubbing, adding these bad IOCs into an IDS causes widespread false-positive drops of legitimate traffic.",
    hint: "Cleaning up threat lists to remove popular public IPs like Google DNS before blocking them.",
    level: "Moderate",
    codeExample: `// Threat Feed Sanitization:
// Exclude IP IF IP IN ["8.8.8.8", "1.1.1.1", "13.107.4.52 (Microsoft CDN)"]`
  },
  {
    id: 29,
    question: "What is 'Alert Throttling with Exponential Backoff' during sustained cyber attacks?",
    shortAnswer: "When an attacker generates millions of exploit attempts, the IDS logs alert 1, alert 2 (after 1s), alert 3 (after 5s), alert 4 (after 30s), preventing log storage exhaustion during active DDoS.",
    explanation: "Exponential backoff ensures that ongoing attacks are recorded without blowing up SIEM disk storage or drowning analysts in millions of identical alert notifications.",
    hint: "Spacing out alert notifications during a massive flood so the database doesn't crash.",
    level: "Basic",
    codeExample: `// Exponential Backoff Alerting:
// Next_Alert_Time = Current_Time + (Base_Interval * (2 ** Repeat_Count))`
  },
  {
    id: 30,
    question: "Synthesize the overarching operational discipline for managing False Positives and False Negatives in enterprise defense.",
    shortAnswer: "Balancing precision and recall requires continuous operational discipline: refine signatures to eliminate greedy regex, suppress authorized scanners, calibrate baseline anomaly windows, deploy purple-team testing to catch false negatives, and maintain complete 180-day forensic audit trails in compliance with CERT-In and the DPDP Act 2023.",
    explanation: "Security is not a static installation; it is an active tuning cycle. By combining strict signature grammar, contextual asset enrichment, machine learning cost functions, and automated SOAR triage, modern SOCs achieve near-zero false alarms while eliminating dangerous blind spots.",
    hint: "Continuously tuning rules, suppressing testing tools, and testing defenses to keep the alarm accurate.",
    level: "Moderate",
    codeExample: `// The Master Security Balance Formula:
// Operational Excellence = High Recall (Catch 99%+ Attacks) + High Precision (Tuned Low FP) + Continuous Baseline Calibration + 180-Day CERT-In Logs`
  }
];

export default questions;
