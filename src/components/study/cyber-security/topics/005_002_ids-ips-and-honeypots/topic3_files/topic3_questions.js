const questions = [
  {
    id: 1,
    question: "What is the core philosophical difference between Signature-Based Detection and Anomaly-Based Detection?",
    shortAnswer: "Signature-Based Detection blocks what is known to be evil (matching specific exploit patterns); Anomaly-Based Detection blocks what is abnormal (flagging statistical deviations from a learned baseline).",
    explanation: "Signature detection relies on an explicit blacklist of known attack bytes (like antivirus definitions). Anomaly detection creates a mathematical model of normal user and network behavior, sounding an alarm whenever activity exceeds normal thresholds.",
    hint: "Signature looks for known bad patterns; Anomaly looks for anything unusual compared to normal.",
    level: "Basic",
    codeExample: `// Detection Philosophies:
// Signature : IF Payload CONTAINS "union select" → ALERT (Known Threat)
// Anomaly   : IF Outbound_Data_Volume > (Baseline_Mean + 3 * StdDev) → ALERT (Unusual Behavior)`
  },
  {
    id: 2,
    question: "Why is Signature-Based Detection completely blind to novel 'Zero-Day' exploits?",
    shortAnswer: "Because signature engines require prior knowledge of the exploit's exact byte pattern or CVE hash; an unannounced zero-day has no pre-existing signature in the database, yielding 0 matches.",
    explanation: "Until a security researcher or vendor discovers the zero-day and authors a new Snort/YARA rule, the signature engine processes the novel attack payload as clean, normal traffic, allowing the exploit to bypass inspection.",
    hint: "If a virus or attack is completely new, there is no rule in the dictionary to match it.",
    level: "Basic",
    codeExample: `// Zero-Day Blind Spot:
// Zero-Day Payload ---> [Signature Engine (Searches 30,000 known rules: 0 Matches)] ➔ Passed Unchecked!`
  },
  {
    id: 3,
    question: "How does Anomaly-Based Detection succeed in identifying Zero-Day attacks where signature engines fail?",
    shortAnswer: "By ignoring static byte strings and instead measuring behavioral side-effects (e.g., unexpected spikes in process execution, abnormal DNS tunneling entropy, or midnight database dumps).",
    explanation: "Even if an attacker invents novel zero-day shellcode, executing that shellcode causes observable anomalous side-effects (e.g. spawning a root process, communicating with foreign IP ranges, or dumping 50,000 database records). The anomaly engine flags these deviations immediately.",
    hint: "Even new attacks cause abnormal behavior that deviates from everyday baseline traffic.",
    level: "Basic",
    codeExample: `// Behavioral Anomaly Detection:
// Zero-Day Exploit Executes ➔ Triggers sudden 500 MB/s outbound data transfer ➔ Z-Score = +5.2 ➔ ALERT!`
  },
  {
    id: 4,
    question: "What is the primary operational weakness of Anomaly-Based Detection in production enterprise environments?",
    shortAnswer: "High false-positive rate triggered by legitimate, benign business changes (e.g., promotional flash sales, quarterly financial reporting, software updates, or new employees).",
    explanation: "In real-world networks, user behavior is not static. A legitimate marketing email campaign can double website traffic, causing naive statistical anomaly engines to flag the business event as a massive DDoS attack, causing alert fatigue.",
    hint: "Legitimate busy days or new company projects trigger false alarms because they look unusual.",
    level: "Moderate",
    codeExample: `// Anomaly False Positive Scenario:
// Black Friday Sale: Traffic triples ➔ Anomaly Engine flags "DDoS Flood Attack" ➔ False Positive Alert!`
  },
  {
    id: 5,
    question: "What is the 'Aho-Corasick Algorithm' and why is it mandatory for high-speed multi-pattern signature matching in Snort and Suricata?",
    shortAnswer: "A trie-based string-searching algorithm that constructs a Deterministic Finite Automaton (DFA), matching 30,000+ signatures in a single linear pass ($O(N)$) across incoming packet payload bytes.",
    explanation: "If an IDS ran standard `strstr()` or regex sequentially across 30,000 rules for every packet, packet inspection would stall. Aho-Corasick evaluates all 30,000 patterns simultaneously as the packet bytes stream through the state machine.",
    hint: "A smart algorithm that checks all 30,000 virus signatures in a single pass without slowing down.",
    level: "Expert",
    codeExample: `// Aho-Corasick Complexity:
// Sequential Regex Search: O(M * K)  [M = packet length, K = 30,000 signatures] → Too Slow!
// Aho-Corasick DFA       : O(M)      [Single pass regardless of signature count] → Line Rate 10 Gbps!`
  },
  {
    id: 6,
    question: "Explain the mathematical formulation of 'Gaussian Z-Score Anomaly Detection'.",
    shortAnswer: "Computing the number of standard deviations ($Z$) a live observation ($x$) deviates from the historical mean ($\mu$): $Z = (x - \mu) / \sigma$. An anomaly is declared if $|Z| > 3.0$.",
    explanation: "Under the standard normal Gaussian distribution, 99.7% of all normal data falls within 3 standard deviations ($3\sigma$). If a server's connection rate produces $Z = 4.5$, there is a 99.999% mathematical probability that the event is abnormal.",
    hint: "Z-score measures how many standard deviations away from normal a value is; over 3 means an anomaly.",
    level: "Moderate",
    codeExample: `// Z-Score Calculation in Python:
// z_score = (current_metric - baseline_mean) / baseline_std
// if z_score > 3.0:
//     trigger_anomaly_alert()`
  },
  {
    id: 7,
    question: "What is 'Shannon Entropy' and how do anomaly detection engines use it to identify encrypted malware beacons and data exfiltration?",
    shortAnswer: "A mathematical measure of randomness (0.0 to 8.0 bits/byte); plain text has low entropy (~3.5–4.5), whereas encrypted malware payloads, compressed archives, and randomized DNS tunneling exhibit high entropy (> 7.5).",
    explanation: "If an adversary tunnels stolen database records inside standard HTTP GET parameters, the entropy of the parameter string jumps from normal 3.8 to 7.8. Anomaly engines detect the exfiltration channel by flagging high-entropy strings on non-encrypted endpoints.",
    hint: "Entropy measures randomness; random encrypted data has high entropy (~7.5+).",
    level: "Moderate",
    codeExample: `// Shannon Entropy Formula:
// H(X) = - SUM [ P(x_i) * log2( P(x_i) ) ]
// Plaintext: "user=admin&pass=123" → H = 3.4 | Encrypted: "7f8a9b2c3d4e..." → H = 7.8`
  },
  {
    id: 8,
    question: "What is 'Protocol Anomaly Detection' (Stateful Protocol Verification)?",
    shortAnswer: "Validating that traffic traversing a port strictly conforms to official IETF RFC protocol grammar (e.g., verifying HTTP methods, header lengths, and DNS message structures), flagging malformed violations.",
    explanation: "Instead of searching for specific exploit strings, protocol anomaly engines enforce strict grammar. If an attacker sends an HTTP request with an 8,000-character URI or uses illegal control characters, the protocol engine drops the packet as an anomaly.",
    hint: "Checking that web traffic strictly follows official web standards, catching weirdly formatted attacks.",
    level: "Basic",
    codeExample: `// Protocol Anomaly Rule:
// IF Method NOT IN ["GET", "POST", "HEAD", "PUT", "DELETE"]:
//     Trigger Alert: "PROTOCOL_VIOLATION: Non-Standard HTTP Verb Detected"`
  },
  {
    id: 9,
    question: "What is a 'Baseline Learning Period / Training Window' in anomaly-based IDS deployments?",
    shortAnswer: "A mandatory 14–30 day operational phase where the anomaly engine observes and profiles typical daily, weekly, and peak network traffic patterns without generating active alerts.",
    explanation: "Because enterprise traffic fluctuates wildly between Monday morning and Sunday night, the anomaly engine must capture full weekly business cycles to calculate accurate means ($\mu$) and standard deviations ($\sigma$).",
    hint: "A 2 to 4 week period where the system learns what normal network traffic looks like.",
    level: "Basic",
    codeExample: `// Baseline Learning Lifecycle:
// Day 1 to 30 : State = 'PROFILING_BASELINE' (Compute hourly means & standard deviations)
// Day 31+     : State = 'ACTIVE_ANOMALY_DETECTION' (Score live traffic against profile)`
  },
  {
    id: 10,
    question: "What is 'Concept Drift' in anomaly detection and how does it degrade machine learning IDS models over time?",
    shortAnswer: "The gradual shift in normal underlying network traffic patterns over time (due to new software, cloud migrations, or seasonal business growth), causing old baseline models to produce increasing false positives.",
    explanation: "If a company migrates from on-premises file shares to cloud SaaS, outbound bandwidth patterns permanently change. Without automated model retraining, the anomaly engine flags legitimate cloud sync as malicious exfiltration.",
    hint: "When normal network usage changes over time, making old security models out-of-date.",
    level: "Moderate",
    codeExample: `// Continuous Retraining / Adaptive Baselines:
// Exponential Moving Average: Baseline_New = (1 - alpha) * Baseline_Old + alpha * Current_Observation`
  },
  {
    id: 11,
    question: "What is 'Polymorphic / Metamorphic Shellcode' and why does it defeat static Signature-based IDS?",
    shortAnswer: "Malware shellcode that automatically encrypts or mutates its byte sequence with variable decoder stubs on every transmission, ensuring that no fixed byte signature ever matches twice.",
    explanation: "Attackers use polymorphic engines (e.g., Shikata Ga Nai) to generate unique byte streams for the exact same exploit payload. Because a signature engine looks for specific static hex strings, the polymorphic variant slips through unnoticed.",
    hint: "Malware that changes its appearance and code structure every time it is sent to avoid matching signatures.",
    level: "Moderate",
    codeExample: `// Polymorphic Mutation:
// Instance 1: \xdb\xcb\xd9\x74\x24\xf4\x5a\x29\xc9... (Passes Signature Matcher)
// Instance 2: \xd9\xeb\x9b\xd9\x74\x24\xf4\x31\xd2... (Completely different bytes, same exploit!)`
  },
  {
    id: 12,
    question: "What is 'Heuristic Detection' and how does it bridge the gap between pure signature matching and statistical anomaly models?",
    shortAnswer: "Rule-based expert algorithms that evaluate combinations of suspicious characteristics and behavioral indicators (e.g. executable launched from `/tmp` + deleted immediately + connected to foreign IP) to calculate a threat score.",
    explanation: "Heuristics do not require an exact byte match or complex machine learning models. They apply expert cybersecurity rules: if a process exhibits 3 or more suspicious behaviors simultaneously, it triggers an intrusion alert.",
    hint: "Using rule-of-thumb expert logic to flag programs that do multiple suspicious things at once.",
    level: "Basic",
    codeExample: `// Heuristic Threat Scoring:
// Score = 0
// IF Process.Parent == "word.exe": Score += 30
// IF Process.Spawns == "powershell.exe": Score += 40
// IF CommandLine.Contains("-enc"): Score += 35
// IF Score >= 100 ➔ TRIGGER CRITICAL HEURISTIC ALERT!`
  },
  {
    id: 13,
    question: "What is 'Time-Series Anomaly Detection' (e.g., Holt-Winters / ARIMA) in network flow monitoring?",
    shortAnswer: "Decomposing metric volume into trend, seasonal (daily/weekly cycles), and residual components, flagging deviations only when the residual noise exceeds statistical thresholds.",
    explanation: "Network traffic naturally peaks at 2:00 PM and drops at 3:00 AM. Seasonal models account for time of day; an increase in traffic at 2:00 PM is recognized as normal, but the same increase at 3:00 AM triggers an immediate anomaly alert.",
    hint: "Knowing that busy traffic during the day is normal, but high traffic at 3 AM is suspicious.",
    level: "Expert",
    codeExample: `// Holt-Winters Decomposition:
// Observed_Value = Trend(t) + Seasonal(t) + Residual(t)
// Alert IF |Residual(t)| > Threshold`
  },
  {
    id: 14,
    question: "Why do enterprise SOCs utilize 'Hybrid Intrusion Detection Engines' combining both Signature and Anomaly subsystems?",
    shortAnswer: "To achieve the best of both worlds: Signature engines instantly block 95%+ of known commodity attacks with near-zero latency and 0% false positives, while Anomaly engines catch stealthy zero-days and insider threats.",
    explanation: "Relying solely on signatures leaves the enterprise defenseless against zero-days; relying solely on anomalies overwhelms analysts with false positives. A hybrid engine filters out known attacks with signatures and passes residual traffic to anomaly models.",
    hint: "Use fast signatures to stop known attacks, and anomaly engines to catch sneaky zero-days.",
    level: "Basic",
    codeExample: `// The Hybrid Pipeline:
// Traffic Ingress ──> [1. Aho-Corasick Signature Filter (Blocks 95% Known Threats)]
//                                │ (Residual Traffic)
//                                └──> [2. Statistical Anomaly & Heuristic Engine (Catches Zero-Days)]`
  },
  {
    id: 15,
    question: "What is 'Principal Component Analysis' (PCA) in high-dimensional network anomaly detection?",
    shortAnswer: "A dimensionality reduction algorithm that transforms dozens of correlated network features (packet count, byte size, SYN ratio, port diversity) into principal components to easily identify multi-variable anomalies.",
    explanation: "Instead of monitoring 50 separate metrics independently, PCA projects traffic into orthogonal components, detecting subtle, distributed multi-vector attacks that stay within normal limits on individual metrics but exhibit anomalies across combined dimensions.",
    hint: "A math technique that combines many network stats into a simple 2D or 3D graph to spot weird outliers.",
    level: "Expert",
    codeExample: `// PCA Dimensionality Reduction:
// 50 Network Features ---> [PCA Projection: PC1, PC2] ---> Outliers located outside 99% confidence ellipse`
  },
  {
    id: 16,
    question: "What is 'Threshold Anomaly Detection' (e.g. SYN Flood / Brute-Force Thresholds)?",
    shortAnswer: "Setting static or dynamic numerical limits on event counts within a time window (e.g., maximum 100 failed connections per minute from a single IP), flagging sources that exceed the threshold.",
    explanation: "Thresholds are the simplest form of behavioral detection. They detect volumetric port scanning, DoS floods, and brute-force password spraying without requiring complex mathematical distributions.",
    hint: "Setting a speed limit on connections: if an IP tries more than 100 times a minute, sound the alarm.",
    level: "Basic",
    codeExample: `// Snort Threshold Rule:
// event_filter gen_id 1, sig_id 2001, type threshold, track by_src, count 50, seconds 5`
  },
  {
    id: 17,
    question: "What is 'Signature Shadowing / Bloat' in legacy IDS rule bases?",
    shortAnswer: "Accumulating thousands of obsolete or overly broad signatures that duplicate coverage or consume unnecessary CPU cycles during multi-pattern matching without providing defensive value.",
    explanation: "If an IDS retains signatures for 15-year-old exploits on obsolete operating systems (e.g., Windows 98 vulnerabilities), the rule database grows bloated. Regular rule-base auditing and pruning keep DFA memory compact and fast.",
    hint: "Old, useless virus rules from 15 years ago slowing down the security scanner.",
    level: "Moderate",
    codeExample: `// Rule Base Pruning:
// Disable SIDs for Windows 2000 / IIS 5.0 exploits in modern cloud environments.`
  },
  {
    id: 18,
    question: "How does 'User and Entity Behavior Analytics' (UEBA) extend host-based anomaly detection?",
    shortAnswer: "By building individual baseline profiles for each employee and server (e.g., Mamata typically accesses files from 9 AM–6 PM from Barrackpore), alerting if credentials log in from Moscow at 3 AM or access 1,000 files.",
    explanation: "UEBA uses machine learning to profile individual user identities. If a legitimate user's account is compromised, the attacker's unusual access patterns immediately trigger a high-severity behavioral anomaly alert.",
    hint: "Learning the normal work habits of each specific employee and alerting when their account behaves weirdly.",
    level: "Moderate",
    codeExample: `// UEBA Anomaly Alert:
// User "Debangshu" logged in from new IP (Geo-Velocity Anomaly: Kolkata → Moscow in 30 minutes) + Accessed 500 HR records.`
  },
  {
    id: 19,
    question: "What is 'N-Gram Payload Analysis' in anomaly-based deep packet inspection?",
    shortAnswer: "Extracting contiguous sequences of $N$ bytes (e.g., 3-grams or 4-grams) from payload streams and comparing the frequency distribution against a normal baseline language model.",
    explanation: "Normal HTTP traffic contains predictable English words and HTML tags. Binary exploit shellcode contains unusual byte n-grams (e.g. NOP sleds `\x90\x90\x90`), causing an anomaly score spike.",
    hint: "Analyzing small groups of consecutive letters or bytes to spot machine code hidden inside text.",
    level: "Expert",
    codeExample: `// 3-Gram Extraction:
// "SELECT" → ["SEL", "ELE", "LEC", "ECT"] (Matches normal SQL language profile)`
  },
  {
    id: 20,
    question: "Why do Anomaly Detection systems require 'Continuous Baseline Recalibration'?",
    shortAnswer: "To prevent false alarms as organizations grow, hire new staff, deploy new web services, or modify daily network usage patterns over time.",
    explanation: "A baseline captured in January will not accurately represent network load in December during holiday traffic. Adaptive recalibration continuously incorporates recent rolling data into baseline calculations.",
    hint: "Updating normal baseline stats regularly so the system stays accurate as the company grows.",
    level: "Basic",
    codeExample: `// Rolling Baseline Update:
// Daily Cron Job: Recompute Mean and Standard Deviation over trailing 30-day sliding window.`
  },
  {
    id: 21,
    question: "What is 'Adversarial Evasion of Anomaly Detectors' (Slow-and-Low Attacks / Baseline Poisoning)?",
    shortAnswer: "When an attacker deliberately conducts reconnaissance and exfiltration at an ultra-slow rate (e.g., 1 packet every 10 minutes) or slowly injects noise to shift the baseline mean over weeks.",
    explanation: "If an anomaly detector triggers on $Z > 3.0$, an attacker who stays below the threshold ($Z = 0.5$) can exfiltrate data undetected. In baseline poisoning, the attacker generates slight noise over months, conditioning the anomaly engine to accept malicious traffic as normal.",
    hint: "Hacking very slowly or poisoning the baseline over months so the anomaly detector thinks the attack is normal.",
    level: "Expert",
    codeExample: `// Slow-and-Low Scanning:
// nmap -T0 (Paranoid mode: 1 probe every 5 minutes → Stays far below statistical rate thresholds)`
  },
  {
    id: 22,
    question: "What is 'Out-of-Bag / Isolation Forest' anomaly detection in modern network telemetry?",
    shortAnswer: "An unsupervised tree-based algorithm that isolates anomalies by randomly partitioning feature space; anomalous points require fewer random splits to isolate than normal clustered points.",
    explanation: "Isolation Forests do not assume a Gaussian normal distribution. They efficiently detect complex multi-dimensional outliers in high-volume network telemetry with linear time complexity $O(N)$.",
    hint: "A fast tree algorithm that separates weird outlier points from normal clusters in network data.",
    level: "Expert",
    codeExample: `// Scikit-Learn Isolation Forest:
// model = IsolationForest(contamination=0.01)
// anomalies = model.fit_predict(network_flow_features)`
  },
  {
    id: 23,
    question: "What is 'Signature Authoring (Snort Rule Grammar)' and what are the essential header/option keywords?",
    shortAnswer: "Defining rule action (`alert`), protocol (`tcp`), source/dest 5-tuple (`$EXTERNAL_NET any → $HTTP_SERVERS 80`), and options: `msg`, `content` (byte string), `nocase`, `sid`, and `rev`.",
    explanation: "Snort rules are human-readable signatures. The header defines where to inspect; the options define what payload strings to match, whether to ignore case, and unique rule identification numbers (`sid`).",
    hint: "Writing Snort rules using action, protocol, IP/ports, and payload content keywords.",
    level: "Moderate",
    codeExample: `// Snort Rule Example:
// alert tcp $EXTERNAL_NET any → $HTTP_SERVERS 80 (msg:"EXPLOIT Apache Struts RCE"; content:"cmd.exe"; nocase; sid:1000542; rev:1;)`
  },
  {
    id: 24,
    question: "How does 'Auto-Correlating Anomaly Scores with Threat Intelligence' reduce false positives in modern SOCs?",
    shortAnswer: "By only escalating an anomaly alert to high priority if the anomalous source IP or domain also appears on an external threat intelligence feed (e.g. AlienVault OTX, AbuseIPDB).",
    explanation: "If an internal server experiences a rate anomaly, but the destination IP is clean, it is likely a software update. If the destination IP is flagged on abuse feeds as a known Russian C2 server, the alert is immediately escalated.",
    hint: "Checking if a weird connection is talking to a known criminal IP address before sounding the alarm.",
    level: "Moderate",
    codeExample: `// Threat Intelligence Correlation:
// IF AnomalyScore > 80 AND DestinationIP IN ThreatIntelFeed:
//     Severity = CRITICAL; Auto_Isolate_Host()`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding Signature Updates and Anomaly Telemetry Logs?",
    shortAnswer: "Organizations must maintain daily updated signature sets from recognized feeds and preserve all triggered signature alerts and statistical anomaly logs in SIEM storage for a minimum of 180 days.",
    explanation: "Under statutory directives, enterprises must prove that signature feeds are kept current and that complete 180-day forensic detection records are preserved with NPL India NTP timestamps.",
    hint: "180-day retention of all signature and anomaly logs synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Detection Log:
const certInDetectionLog = {
  timestamp: "2026-08-23T12:20:00.180Z",
  detectionType: "STATISTICAL_ANOMALY",
  model: "Gaussian_Rate_ZScore",
  metric: "DNS_Queries_Per_Sec",
  zScore: 4.82,
  srcIp: "10.10.1.50",
  dstIp: "8.8.8.8"
};`
  },
  {
    id: 26,
    question: "What is 'Regular Expression (Regex) ReDoS Vulnerability' in poorly written IDS signatures?",
    shortAnswer: "When an overly complex regular expression with nested quantifiers causes the regex engine to enter catastrophic polynomial backtracking, causing 100% CPU utilization and crashing the IDS sensor.",
    explanation: "Attackers send crafted strings matching vulnerable regex patterns (e.g. `(a+)+$`), freezing the IDS sensor CPU and blinding the security team to subsequent attacks. Rules must use deterministic DFA matchers.",
    hint: "A badly written regex that causes the security scanner's CPU to freeze when evaluating evil input.",
    level: "Expert",
    codeExample: `// ReDoS Vulnerable Regex Pattern:
// pcre:"/^(a+)+b/" → Catastrophic backtracking on input "aaaaaaaaaaaaaaaaaaaaaaac"`
  },
  {
    id: 27,
    question: "What is 'Clustering Anomaly Detection' (e.g. K-Means / DBSCAN) in network flow analysis?",
    shortAnswer: "Grouping normal network conversations into dense clusters based on packet size and duration; any session falling far outside all clusters in sparse space is flagged as an intrusion.",
    explanation: "K-Means and DBSCAN require no labeled attack data. They model normal traffic clusters (e.g. web browsing cluster, SSH cluster). A data exfiltration stream appears as an isolated outlier in feature space.",
    hint: "Grouping normal traffic into clusters and catching odd data points that don't fit into any cluster.",
    level: "Moderate",
    codeExample: `// DBSCAN Outlier Detection:
// Core Clusters: Web Sessions, Database Queries | Noise / Outlier: Stolen DB Dump (Flagged!)`
  },
  {
    id: 28,
    question: "What is 'Automated Signature Generation' (e.g., Honeycomb / Polygraph) in research IDS?",
    shortAnswer: "Automatically extracting common invariant byte substrings from traffic captured by honeypots during a worm outbreak and compiling them into new Snort signatures within seconds.",
    explanation: "When a new zero-day worm spreads, honeypots capture thousands of samples. Automated signature generators analyze the common byte substrings across samples, generating and deploying a signature before human analysts can write one.",
    hint: "Using software to write new virus rules automatically from honeypot data during an outbreak.",
    level: "Expert",
    codeExample: `// Automated Snort Signature Synthesis:
// Honeycomb Engine → Extracts LCS ("Longest Common Substring") → Outputs Snort Rule within 5 seconds!`
  },
  {
    id: 29,
    question: "How does 'Payload Normalization' prevent signature evasion before Aho-Corasick matching runs?",
    shortAnswer: "By unescaping hexadecimal characters (`%20` → ` `), standardizing directory traversal (`/a/../b` → `/b`), and stripping null bytes, ensuring signatures match canonical text.",
    explanation: "If a signature searches for `SELECT`, an attacker sends `S%45LECT`. Normalization decodes the hex string before the signature engine evaluates it, defeating evasion attempts.",
    hint: "Decoding escaped characters and cleaning up URLs before scanning for virus signatures.",
    level: "Basic",
    codeExample: `// URL Normalization:
// Raw: "GET /api?q=S%45L%45CT HTTP/1.1" → Normalized: "GET /api?q=SELECT HTTP/1.1" ➔ SIGNATURE MATCHED!`
  },
  {
    id: 30,
    question: "Synthesize the ultimate conclusion: Why is the combination of Signature and Anomaly detection essential for complete perimeter defense?",
    shortAnswer: "Signature detection provides fast, deterministic protection against 95%+ of known exploits with 0% false positives, while Anomaly detection provides the crucial safety net that catches zero-days and stealthy insider threats, creating an unshakeable Defense-in-Depth posture.",
    explanation: "Neither detection technique is sufficient on its own. By combining high-speed Aho-Corasick signature matching with adaptive Gaussian and machine-learning anomaly scoring, modern SOCs achieve comprehensive threat coverage while maintaining low operational false-alarm overhead in full compliance with CERT-In and the DPDP Act 2023.",
    hint: "Signatures stop known attacks fast; anomaly models catch unknown zero-days; together they protect everything.",
    level: "Moderate",
    codeExample: `// The Master Detection Formula:
// Complete Defense = [Aho-Corasick Signature DFA (Known CVEs)] + [Gaussian Z-Score Anomaly Engine (Zero-Days)] + [180-Day WORM SIEM Logs]`
  }
];

export default questions;
