const questions = [
  {
    id: 1,
    question: "What is the primary role of Machine Learning (ML) and Artificial Intelligence (AI) in modern Intrusion Detection Systems (IDS)?",
    shortAnswer: "To automatically learn complex multidimensional traffic patterns, baseline normal network behavior, cluster anomalous data exfiltration flows, and detect previously unknown zero-day attacks without requiring manual signature updates.",
    explanation: "Human analysts cannot write signatures fast enough to counter automated zero-day campaigns. Machine learning models analyze flow vectors across millions of packets per second, identifying subtle mathematical anomalies in real time.",
    hint: "Using AI to spot weird patterns and new zero-day attacks automatically without human-written rules.",
    level: "Basic",
    codeExample: `// AI Threat Detection Workflow:
// Raw Network Packets ➔ [Feature Extractor (22 Metrics)] ➔ [ML Classifier / Autoencoder] ➔ Real-Time Anomaly Score!`
  },
  {
    id: 2,
    question: "What are the 3 major Machine Learning paradigms applied to intrusion detection, and what is the primary use case for each?",
    shortAnswer: "1. Supervised Learning (Classifying known attack families); 2. Unsupervised Learning (Discovering unknown zero-days and outliers without labeled data); 3. Semi-Supervised Learning (Training exclusively on clean traffic baselines).",
    explanation: "Supervised models (Random Forest, XGBoost) achieve 99%+ accuracy on known malware families. Unsupervised models (Isolation Forest, K-Means) detect novel zero-days. Semi-supervised models (One-Class SVM, Autoencoders) learn normal baseline behavior and flag anything that doesn't fit.",
    hint: "Supervised for known attacks, Unsupervised for unknown zero-days, Semi-Supervised for normal baseline matching.",
    level: "Basic",
    codeExample: `// ML Paradigms in IDS:
// Supervised     : Input(Flow, Label="DDoS") ➔ Classifies new DDoS attacks
// Unsupervised   : Input(Unlabeled Flows)   ➔ Clusters outliers into anomaly buckets
// Semi-Supervised: Input(Clean Traffic Only) ➔ Flags anything outside the clean boundary`
  },
  {
    id: 3,
    question: "How does an 'Autoencoder Neural Network' detect zero-day intrusions using Reconstruction Error (MSE)?",
    shortAnswer: "The autoencoder is trained to compress and reconstruct normal traffic features; when an anomalous zero-day attack traverses the network, the network fails to reconstruct the unfamiliar features, resulting in a high Mean Squared Error (MSE) that triggers an alert.",
    explanation: "The bottleneck latent layer forces the autoencoder to learn only the essential structure of normal traffic. Because it has never seen the extreme feature combinations of an exploit, its mathematical reconstruction ($X'$) deviates wildly from the input ($X$), yielding $\\text{MSE} > \\theta$.",
    hint: "Trained to recreate normal traffic; when it sees weird attack data, it fails to recreate it, ringing the alarm.",
    level: "Moderate",
    codeExample: `// Autoencoder Reconstruction Error:
// Input X ➔ [Encoder] ➔ Latent Space Z ➔ [Decoder] ➔ Output X'
// Loss = MSE(X, X')
// IF Loss > 0.35 ➔ Trigger Zero-Day Intrusion Alert!`
  },
  {
    id: 4,
    question: "What is 'Feature Engineering & Extraction' in network ML models and what are 4 critical flow features?",
    shortAnswer: "Converting raw packet headers and byte streams into numerical vectors: 1. Flow Duration; 2. Packet Inter-Arrival Time (IAT); 3. Forward/Backward Byte Ratio; 4. Flow Shannon Entropy.",
    explanation: "Machine learning algorithms cannot process raw pcap binary streams directly. The feature extractor groups packets into bidirectional 5-tuple flows and computes statistical summaries that characterize the conversation.",
    hint: "Turning raw network traffic into numbers like packet speed, total bytes, and randomness.",
    level: "Basic",
    codeExample: `// Extracted Flow Feature Vector:
const flowFeatureVector = {
  durationSec: 1.25,
  totalPackets: 85,
  totalBytes: 45000,
  meanIatMs: 14.7,
  synAckRatio: 1.0,
  shannonEntropy: 7.82
};`
  },
  {
    id: 5,
    question: "What is 'Isolation Forest' and why is it exceptionally well-suited for high-speed network anomaly detection?",
    shortAnswer: "An unsupervised tree-based algorithm that isolates anomalies by randomly partitioning feature space; anomalous outlier flows require far fewer random splits to isolate than clustered normal points, executing in linear time $O(N)$.",
    explanation: "Traditional distance-based algorithms (like K-NN) require expensive $O(N^2)$ distance calculations between every packet pair. Isolation Forest builds random decision trees; outliers are isolated at shallow tree depths, allowing line-rate real-time detection.",
    hint: "A fast tree algorithm that separates rare attack outliers in very few branching steps.",
    level: "Moderate",
    codeExample: `// Scikit-Learn Isolation Forest:
// from sklearn.ensemble import IsolationForest
// clf = IsolationForest(n_estimators=100, contamination=0.01)
// preds = clf.fit_predict(flow_feature_matrix)`
  },
  {
    id: 6,
    question: "What is 'One-Class Support Vector Machine' (OC-SVM) in semi-supervised IDS architectures?",
    shortAnswer: "An algorithm that maps clean baseline network flows into a high-dimensional kernel feature space and calculates a tight mathematical hyper-sphere enclosing the normal data; any flow landing outside the boundary is classified as an intrusion.",
    explanation: "Because obtaining labeled datasets of all possible cyber attacks is impossible, OC-SVM only requires clean baseline traffic. It draws a mathematical perimeter around normal traffic, instantly flagging any novel zero-day that falls outside.",
    hint: "Drawing an invisible circle around normal traffic; anything that lands outside the circle is an attack.",
    level: "Moderate",
    codeExample: `// One-Class SVM Hyperplane:
// Clean Training Flows ➔ [RBF Kernel Mapping] ➔ Enclosing Hyper-Sphere
// Live Flow $x$ ➔ IF $f(x) < 0$ (Outside Sphere) ➔ ANOMALY DETECTED!`
  },
  {
    id: 7,
    question: "What is 'Adversarial Evasion Attack' (Feature Perturbation) against machine learning IDS classifiers?",
    shortAnswer: "When an attacker subtly manipulates non-functional packet parameters (e.g., inserting tiny packet delays or benign padding bytes) to push the flow's feature vector across the ML decision boundary into the 'normal' classification zone.",
    explanation: "Attackers use gradient descent techniques against the ML model. By adding 50 milliseconds of artificial jitter or splitting a payload into 10 small packets, the flow's statistical features look identical to normal browsing, blinding the AI while the exploit still executes.",
    hint: "Slightly altering attack timing or padding to trick the AI into thinking it is normal web browsing.",
    level: "Expert",
    codeExample: `// Adversarial Perturbation:
// Malicious Flow: [High Rate, Small IAT] ➔ Model predicts: ATTACK (0.98)
// Attacker adds 40ms jitter: [Normal Rate, Normal IAT] ➔ Model predicts: BENIGN (0.12) ➔ EVADED!`
  },
  {
    id: 8,
    question: "What is 'Model Poisoning / Data Poisoning' in continuous learning IDS deployments?",
    shortAnswer: "An attack where the adversary slowly injects malicious or anomalous traffic samples into the training dataset during the baseline recalibration phase, tricking the model into learning that malicious attacks are normal.",
    explanation: "If an IDS automatically updates its ML baseline every 30 days, an attacker who slowly generates C2 beaconing noise over 6 months will 'poison' the baseline, causing the retrained model to accept the attacker's permanent backdoor traffic without alerting.",
    hint: "Slowly feeding bad data into the AI during training so it accepts the hacker's traffic as normal.",
    level: "Expert",
    codeExample: `// Data Poisoning Attack:
// Attacker injects 100 C2 beacons/day into baseline training data ➔ New retrained model classifies C2 as "Normal Baseline"!`
  },
  {
    id: 9,
    question: "What is 'Curse of Dimensionality' in network ML feature selection and how is it mitigated?",
    shortAnswer: "When using too many features (e.g. 100+ metrics) causes data points to become equidistant and sparse in hyperspace, degrading model accuracy and exploding CPU latency; mitigated using Principal Component Analysis (PCA) or Feature Importance Ranking.",
    explanation: "Adding every conceivable packet header field increases computational overhead and causes overfitting. Feature reduction techniques (like Random Forest Gini importance or PCA) isolate the top 10–15 most discriminative features (e.g., flow entropy, IAT variance).",
    hint: "Having too many stats confuses the AI; using PCA picks only the most important features.",
    level: "Moderate",
    codeExample: `// Dimensionality Reduction Pipeline:
// 80 Raw Flow Metrics ➔ [PCA / Random Forest Feature Selection] ➔ 12 Discriminative Core Features`
  },
  {
    id: 10,
    question: "What is 'DBSCAN' (Density-Based Spatial Clustering of Applications with Noise) in unsupervised flow analysis?",
    shortAnswer: "A spatial clustering algorithm that groups densely packed normal network flows into clusters and explicitly labels isolated, sparse points as 'noise' or 'intrusions' without requiring the number of clusters ($k$) in advance.",
    explanation: "Unlike K-Means (which forces every point into a cluster), DBSCAN recognizes non-linear cluster shapes and isolates sparse data points. A covert data exfiltration session naturally appears as an isolated noise point far from normal web traffic clusters.",
    hint: "A clustering tool that groups normal points together and flags lone outlier points as attacks.",
    level: "Moderate",
    codeExample: `// DBSCAN Execution:
// db = DBSCAN(eps=0.5, min_samples=5).fit(flow_features)
// labels = db.labels_ # -1 represents anomalous noise points (Attacks!)`
  },
  {
    id: 11,
    question: "What is 'Packet Inter-Arrival Time' (IAT) and why is it a vital feature for detecting Command & Control (C2) beacons?",
    shortAnswer: "The time elapsed between consecutive packets in a flow; automated malware C2 beacons exhibit highly periodic, low-variance IAT (e.g., exactly 60.0s ± 0.1s), whereas human web browsing produces random, bursty IAT.",
    explanation: "Human users click links unpredictably, resulting in high IAT variance. Automated malware timers connect back to their controller on strict schedules. Anomaly models detect the abnormally low variance in packet inter-arrival times.",
    hint: "Malware checks in like clockwork every 60 seconds; humans click links randomly.",
    level: "Basic",
    codeExample: `// IAT Variance Comparison:
// Human Browsing : IAT = [0.1s, 4.5s, 0.2s, 12.0s, 0.05s] -> High Variance (Normal)
// Malware Beacon : IAT = [60.01s, 59.98s, 60.02s, 60.00s] -> Near-Zero Variance (Anomalous!)`
  },
  {
    id: 12,
    question: "What is 'Jitter / Sleep Time Randomization' implemented by modern C2 frameworks (Cobalt Strike / Sliver) to evade IAT detectors?",
    shortAnswer: "Adding a randomized sleep offset (e.g., 60s ± 30% jitter) between beacon check-ins to introduce artificial variance into packet inter-arrival times, mimicking human burstiness.",
    explanation: "Because basic ML models flag strict 60.0s intervals, modern malware frameworks calculate `sleep_time = base_sleep * (1 + random(-jitter, +jitter))`. Detecting jittered beacons requires long-term time-series autocorrelation and entropy analysis.",
    hint: "Malware adding random delay to its check-in timers to fool AI timing detectors.",
    level: "Moderate",
    codeExample: `// Cobalt Strike Jitter Configuration:
// set sleep "60000"; # 60 seconds
// set jitter "30";   # 30% randomized variation (42s to 78s)`
  },
  {
    id: 13,
    question: "What is 'Receiver Operating Characteristic' (ROC) and 'Area Under the Curve' (AUC) in IDS model evaluation?",
    shortAnswer: "ROC plots True Positive Rate (TPR) against False Positive Rate (FPR) across various classification threshold settings; AUC (0.0 to 1.0) measures overall model discrimination capability (1.0 = perfect detection).",
    explanation: "In cybersecurity, accuracy alone is misleading because 99.9% of traffic is normal. ROC-AUC demonstrates whether a model can catch 95% of attacks (high TPR) while maintaining an operational false positive rate below 0.01% (low FPR).",
    hint: "A standard chart showing how well an AI catches real attacks without causing false alarms.",
    level: "Moderate",
    codeExample: `// ROC AUC Evaluation:
// from sklearn.metrics import roc_auc_score
// auc_score = roc_auc_score(y_true_labels, y_predicted_anomaly_scores)`
  },
  {
    id: 14,
    question: "Why is 'High Class Imbalance' the single greatest challenge in training supervised IDS machine learning models?",
    shortAnswer: "In real enterprise networks, legitimate traffic represents 99.99% of flows, while malicious intrusions represent 0.01%, causing standard ML models to achieve 99.99% accuracy by simply guessing that every packet is benign.",
    explanation: "A naive model that always predicts 'Normal' achieves high statistical accuracy while missing 100% of cyber attacks. Engineers use techniques like SMOTE (Synthetic Minority Over-sampling), cost-sensitive loss functions, or unsupervised anomaly detection to solve this.",
    hint: "Because 99.99% of network traffic is normal, the AI gets lazy and guesses everything is normal.",
    level: "Moderate",
    codeExample: `// SMOTE Minority Oversampling:
// from imblearn.over_sampling import SMOTE
// X_resampled, y_resampled = SMOTE().fit_resample(X_train, y_train)`
  },
  {
    id: 15,
    question: "What is 'Local Outlier Factor' (LOF) in network flow anomaly detection?",
    shortAnswer: "An unsupervised density-based algorithm that measures the local density deviation of a flow with respect to its $k$-nearest neighbors, identifying anomalies in datasets with varying cluster densities.",
    explanation: "Different network protocols have different normal densities (e.g. streaming video has thousands of dense packets, SSH has sparse packets). LOF compares a point's density only against its immediate neighbors, preventing false alarms on sparse protocols.",
    hint: "Checking if a packet flow is weird compared to its immediate neighbor connections.",
    level: "Expert",
    codeExample: `// Local Outlier Factor Execution:
// from sklearn.neighbors import LocalOutlierFactor
// lof = LocalOutlierFactor(n_neighbors=20)
// outlier_scores = lof.fit_predict(network_flows)`
  },
  {
    id: 16,
    question: "What is 'XGBoost / Gradient Boosted Decision Trees' and why is it preferred over Deep Neural Networks for structured tabular flow features?",
    shortAnswer: "An ensemble learning algorithm combining hundreds of shallow decision trees in sequence; it trains faster, handles non-linear tabular features without complex normalization, and provides superior interpretability via feature importance.",
    explanation: "Deep neural networks require massive GPU resources and extensive hyperparameter tuning. XGBoost runs efficiently on standard CPUs, handles missing flow data natively, and consistently outperforms neural networks on tabular network flow datasets.",
    hint: "A fast, powerful tree algorithm that works better than deep learning on tabular network stats.",
    level: "Moderate",
    codeExample: `// XGBoost Classifier:
// import xgboost as xgb
// model = xgb.XGBClassifier(n_estimators=150, max_depth=5, learning_rate=0.1)`
  },
  {
    id: 17,
    question: "What is 'Explainable AI (XAI) / SHAP Values' in SOC machine learning alert triage?",
    shortAnswer: "Calculating Shapley Additive Explanations (SHAP) to show exactly which flow features (e.g. high entropy + unusual port + spike in IAT) contributed to the AI's anomaly decision, allowing analysts to understand why an alert fired.",
    explanation: "Security analysts reject 'black box' AI alerts that provide no justification. SHAP values break down the mathematical score: 'Alert fired because Outbound Bytes contributed +45% and Shannon Entropy contributed +35% to anomaly score.'",
    hint: "Showing security guards the exact mathematical reasons why the AI flagged a connection.",
    level: "Expert",
    codeExample: `// SHAP Feature Contribution Breakdown:
// shap_values = explainer(flow_sample)
// Output: [Entropy: +0.45, ByteVolume: +0.32, Duration: -0.05] ➔ Explainable Alert!`
  },
  {
    id: 18,
    question: "What is 'Recurrent Neural Network (RNN / LSTM / GRU)' applied to packet payload byte streams?",
    shortAnswer: "Deep learning models with temporal memory that process packet byte sequences step-by-step, predicting the next expected character/byte and declaring an intrusion if the sequence probability is exceptionally low.",
    explanation: "LSTMs process byte streams as natural language. If an attacker injects shellcode into an HTTP URI, the LSTM recognizes that the byte transition sequence violates the normal grammar of English and web URLs.",
    hint: "Using text-predicting neural networks to read network bytes like sentences and catch gibberish exploit code.",
    level: "Expert",
    codeExample: `// LSTM Byte Sequence Processing:
// "GET /search?q=" ➔ Normal sequence probability: 0.94
// "GET /?q=\x90\x90\xeb\x1f" ➔ Sequence probability: 0.00002 ➔ EXPLOIT INJECTION DETECTED!`
  },
  {
    id: 19,
    question: "How does 'Ensemble Learning (Stacking / Voting)' improve detection resilience in modern IDS?",
    shortAnswer: "Combining predictions from multiple diverse algorithms (e.g., Random Forest + Autoencoder + Isolation Forest); an alert is only triggered if a majority of models agree or if the weighted ensemble score exceeds a threshold.",
    explanation: "Individual models have unique blind spots. Stacking diverse algorithms cancels out individual false positives while combining their detection strengths, achieving higher accuracy than any single model alone.",
    hint: "Combining multiple AI models together like a committee of security experts to vote on alerts.",
    level: "Basic",
    codeExample: `// Voting Ensemble Classifier:
// Ensemble Score = 0.4 * RF_Score + 0.3 * Autoencoder_MSE + 0.3 * IsolationForest_Score`
  },
  {
    id: 20,
    question: "What is 'Concept Drift Detection' (e.g., ADWIN / Page-Hinkley test) in automated ML retraining pipelines?",
    shortAnswer: "Statistical monitoring algorithms that track the rolling distribution of incoming network flow features, automatically triggering model retraining when the data distribution significantly changes.",
    explanation: "Instead of retraining models on arbitrary calendar dates, ADWIN (Adaptive Windowing) detects when the mean and variance of live traffic drift permanently, ensuring ML models adapt immediately without manual intervention.",
    hint: "An automated trigger that retrains the AI as soon as network usage patterns change.",
    level: "Expert",
    codeExample: `// ADWIN Drift Detector:
// if adwin.update(live_flow_metric):
//     trigger_automated_retraining_pipeline()`
  },
  {
    id: 21,
    question: "What is 'Federated Learning' for multi-organization IDS threat intelligence sharing?",
    shortAnswer: "Training a decentralized global machine learning model across multiple enterprise datacenters without sharing raw sensitive packet data or customer private information; only encrypted model weight updates are shared.",
    explanation: "Banks and government agencies cannot share raw pcap logs due to privacy laws (DPDP Act 2023). Federated learning allows each bank to train an anomaly model locally and share only the mathematical gradient updates to build a shared defense.",
    hint: "Sharing AI knowledge and math updates between companies without sharing private customer data.",
    level: "Expert",
    codeExample: `// Federated Learning Workflow:
// Bank A (Local Model) ──[Gradients]──> Central Aggregator ──[Global Weights]──> Bank B`
  },
  {
    id: 22,
    question: "What is 'Graph Neural Networks' (GNN) in network lateral movement detection?",
    shortAnswer: "Modeling an entire enterprise network as a dynamic graph (nodes = IP addresses, edges = network flows) to detect anomalous graph topologies and lateral attacker movement across subnets.",
    explanation: "Traditional IDS inspects individual packets in isolation. GNNs analyze the structural relationship between hosts, detecting when an attacker hops from a compromised workstation to an internal database server via unusual graph traversal paths.",
    hint: "Mapping computers and connections as a giant web to spot hackers hopping between servers.",
    level: "Expert",
    codeExample: `// Graph Representation:
// Node(Workstation) ──Edge(SMB 445)──> Node(DB Server) ➔ GNN flags anomalous edge traversal!`
  },
  {
    id: 23,
    question: "Why should ML-based IDS models NEVER automatically execute destructive blocking without human oversight or high confidence thresholds?",
    shortAnswer: "Because statistical false positives can accidentally block critical enterprise services (e.g. database replication, payment gateways, or healthcare monitors), causing self-inflicted business outages.",
    explanation: "Machine learning outputs probabilities, not absolute certainties. Anomaly alerts should trigger automated dynamic rate-limiting, step-up MFA, or alert SOC analysts for triage rather than immediately severing core business circuits.",
    hint: "Because AI can make statistical mistakes, and blocking legitimate business traffic causes system downtime.",
    level: "Basic",
    codeExample: `// Safe ML Automated Action:
// IF AnomalyScore > 0.95 (Ultra High): Auto-Rate-Limit (5 pkts/sec) + Alert Tier-2 SOC Analyst`
  },
  {
    id: 24,
    question: "What is 'Feature Normalization / Min-Max Scaling' and why is it essential before training neural network IDS models?",
    shortAnswer: "Scaling diverse raw numerical features into a standardized range [0.0, 1.0] or Z-scores, preventing features with large numbers (e.g., Byte Count: 1,000,000) from dominating features with small numbers (e.g., Duration: 0.5s).",
    explanation: "Neural network gradient descent updates weights proportionally to feature magnitudes. Without normalization, the model ignores small-magnitude features (like SYN/ACK ratios) and focuses solely on byte counts.",
    hint: "Standardizing all numbers between 0 and 1 so big numbers don't drown out small numbers in the AI.",
    level: "Moderate",
    codeExample: `// Min-Max Feature Scaling:
// Scaled_Value = (Raw_Value - Min_Value) / (Max_Value - Min_Value)`
  },
  {
    id: 25,
    question: "What is the CERT-In compliance requirement regarding AI/ML Anomaly Telemetry and Model Baseline Auditing?",
    shortAnswer: "Organizations utilizing AI/ML anomaly engines must retain all model training logs, anomaly scores, triggered alerts, raw flow metrics, and NPL India NTP timestamps in immutable SIEM storage for a minimum of 180 days.",
    explanation: "Under Indian statutory cybersecurity directives, organizations must be able to forensically reproduce the mathematical reasons and data inputs that led an automated security system to flag or isolate an asset.",
    hint: "180-day retention of all AI anomaly logs and training data synchronized with NPL India NTP.",
    level: "Basic",
    codeExample: `// Structured CERT-In Compliant AI Anomaly Log:
const certInAiLog = {
  timestamp: "2026-08-23T12:30:00.250Z",
  engine: "Autoencoder_DeepLearning",
  flowId: "FLOW-994012",
  reconstructionMse: 0.894,
  thresholdMse: 0.350,
  verdict: "ZERO_DAY_ANOMALY_CONFIRMED"
};`
  },
  {
    id: 26,
    question: "What is 'Model Inversion / Extraction Attack' against cloud-hosted IDS machine learning models?",
    shortAnswer: "When an attacker sends thousands of carefully crafted probe packets and observes the model's output scores, mathematically reconstructing the internal weights and decision boundaries of the proprietary IDS.",
    explanation: "Once the adversary extracts a clone of the enterprise's ML model locally, they can test thousands of evasion techniques offline until they find an exploit payload that scores 0.0 anomaly, guaranteeing 100% successful bypass.",
    hint: "Probing an AI security tool repeatedly to reverse-engineer its rules and find blind spots offline.",
    level: "Expert",
    codeExample: `// Model Extraction Prevention:
// Return binary classification verdicts ("Alert" / "Pass") instead of raw continuous anomaly floating-point scores.`
  },
  {
    id: 27,
    question: "What is 'K-Nearest Neighbors' (KNN) anomaly scoring and what are its scaling limitations?",
    shortAnswer: "Measuring the Euclidean distance from a test flow to its $k$-th nearest neighbor in feature space; limited by $O(N \\cdot D)$ search time per packet, making it too slow for multi-gigabit line-rate ingestion without KD-trees.",
    explanation: "KNN requires calculating distance against thousands of stored training samples for every single network packet. In a 10 Gbps link processing 14.88 million packets/second, KNN creates severe CPU bottlenecks.",
    hint: "Checking distance to the closest neighbor points; too slow for high-speed multi-gigabit networks.",
    level: "Moderate",
    codeExample: `// KNN Computational Complexity:
// 10 Gbps Line Rate = 14.88 Million Packets/Sec ➔ KNN distance search stalls CPU!`
  },
  {
    id: 28,
    question: "How does 'Reinforcement Learning' (RL) enable autonomous cyber defense in modern SOAR platforms?",
    shortAnswer: "An AI agent interacts with the network environment, receiving positive rewards for successfully isolating compromised hosts and negative penalties for causing business downtime, learning optimal defense policies.",
    explanation: "Reinforcement Learning agents (using Q-Learning or PPO) dynamically decide the best defensive action (e.g. rate-limit vs isolate vs step-up MFA) based on the evolving threat state and business impact.",
    hint: "An AI that learns the best security actions by scoring points for stopping attacks and losing points for downtime.",
    level: "Expert",
    codeExample: `// Reinforcement Learning Policy:
// Reward = (+100 for Exploit Blocked) - (500 for Legitimate Payment Dropped)`
  },
  {
    id: 29,
    question: "What is 'Payload Content Embedding' (e.g. Word2Vec / Byte2Vec) in natural language processing (NLP) IDS?",
    shortAnswer: "Mapping raw packet bytes and HTTP header words into dense continuous vector spaces where semantically similar exploit strings (e.g. `SELECT` and `UNION`) cluster closely together in geometric space.",
    explanation: "Instead of treating words as arbitrary strings, Word2Vec maps tokens into a 100-dimensional semantic space. If an attacker uses a novel synonym or SQL keyword, the model recognizes its semantic similarity to known attack vectors.",
    hint: "Converting web words and bytes into a map where similar words sit next to each other.",
    level: "Expert",
    codeExample: `// Byte2Vec Semantic Embedding:
// Vector("UNION") ~ Vector("SELECT") ➔ Model generalizes across SQL dialects!`
  },
  {
    id: 30,
    question: "Synthesize the overarching strategic role of Machine Learning and Statistical Anomaly Detection in modern IDS.",
    shortAnswer: "Machine learning transforms passive intrusion detection from a reactive, signature-bound dictionary into a proactive, adaptive cognitive defense engine, capable of uncovering zero-day exploits, insider data theft, and stealthy lateral movement at line-rate speed in compliance with CERT-In and the DPDP Act 2023.",
    explanation: "While static signatures remain essential for fast, deterministic filtering of known CVEs, AI and statistical models provide the vital cognitive awareness required to survive in an era of automated, polymorphic, and zero-day cyber warfare.",
    hint: "Machine learning turns static rulebooks into an intelligent brain that catches new, unseen cyber attacks.",
    level: "Moderate",
    codeExample: `// The Master Cognitive IDS Formula:
// Next-Gen Autonomous Defense = [Fast Aho-Corasick Signature DFA] + [Deep Learning Autoencoder Outlier Detection] + [Continuous Baseline Calibration] + [180-Day SIEM Logs]`
  }
];

export default questions;
