/**
 * Topic 1: Machine Learning vs Traditional Programming
 * 30 Assessment Questions (Moderate to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore
 */

const questions = [
  {
    id: 1,
    question: "What is the fundamental inversion in input/output flow between Traditional Programming and Machine Learning?",
    shortAnswer: "Traditional takes Data + Rules to output Answers; ML takes Data + Answers to synthesize a Model (Rules).",
    explanation: "Traditional software engineering relies on human developers translating domain rules into deterministic logic. In contrast, Machine Learning utilizes optimization algorithms that analyze historical input data and ground-truth answers to discover the underlying mathematical mapping model.",
    hint: "Recall which paradigm outputs an executable hypothesis function h(x).",
    level: "Basic",
    codeExample: "# Traditional:\noutput = business_logic_function(input_data)\n\n# ML:\nlearned_model = optimizer.fit(training_data, target_answers)"
  },
  {
    id: 2,
    question: "Why is handcrafting if/else rules impossible for recognizing handwritten digits (e.g., MNIST dataset)?",
    shortAnswer: "Infinite pixel combinations, stroke widths, angles, and noise create combinatorial explosion.",
    explanation: "A simple 28x28 grayscale image has 784 individual pixel intensity dimensions. Variations in handwriting style, pen pressure, skew, and size make it mathematically infeasible for human programmers to write explicit boolean rules for every possible pixel combination.",
    hint: "Think about the number of possible states in 784 pixels each having 256 grayscale levels (256^784).",
    level: "Moderate",
    codeExample: "# Impossible in Traditional:\nif pixel[14][14] > 120 and pixel[14][15] < 30 and ...: return 7"
  },
  {
    id: 3,
    question: "Which type of reasoning characterizes Traditional Programming versus Machine Learning?",
    shortAnswer: "Traditional uses Deductive reasoning; Machine Learning uses Inductive reasoning.",
    explanation: "Deductive reasoning moves from general universal premises (human-written rules) to specific conclusions. Inductive reasoning observes specific empirical instances (dataset samples) and infers general statistical rules and patterns.",
    hint: "Deductive = General to Specific; Inductive = Specific Observations to General Hypothesis.",
    level: "Moderate",
    codeExample: "// Deductive: All tax > 5L has 20% slab (General rule -> Specific calculation)\n// Inductive: Observe 10,000 transactions -> Infer fraud boundary"
  },
  {
    id: 4,
    question: "For an enterprise software managing salary disbursements and statutory tax compliance in Barrackpore, which paradigm is required?",
    shortAnswer: "Traditional Programming.",
    explanation: "Tax laws, Provident Fund (PF) percentages (12%), and ESI slabs are exact statutory mandates governed by legal statutes. They require 100% deterministic, audit-transparent arithmetic with zero probabilistic error tolerance.",
    hint: "Never use probabilistic approximations for legally mandated arithmetic.",
    level: "Basic",
    codeExample: "pf_deduction = basic_pay * 0.12 # Must be 100% deterministic"
  },
  {
    id: 5,
    question: "What is the primary risk of 'Silent Failure' in production Machine Learning systems compared to traditional software?",
    shortAnswer: "ML models return plausible-looking probabilistic predictions without throwing system runtime exceptions.",
    explanation: "In traditional programming, a bug typically triggers an unhandled exception or crash that alerts monitoring tools. In ML, when input distributions drift, the model continues executing cleanly while generating confident, incorrect predictions.",
    hint: "A crash is loud; a drifted ML prediction fails silently without raising errors.",
    level: "Expert",
    codeExample: "# Silent Failure: model.predict_proba(drifted_input) returns [0.98, 0.02] but is completely wrong."
  },
  {
    id: 6,
    question: "How does the maintenance lifecycle differ when business conditions evolve?",
    shortAnswer: "Traditional requires manual code rewriting; ML requires automated data pipeline retraining.",
    explanation: "When consumer patterns change, traditional software engineers must manually investigate, rewrite, and redeploy code logic. ML systems adapt by ingesting new data partitions and executing automated retraining pipelines (MLOps).",
    hint: "Modifying lines of if/else code vs running optimizer.fit(new_data).",
    level: "Moderate",
    codeExample: "# MLOps CI/CD: Airflow DAG triggers model.fit(latest_30_days_data)"
  },
  {
    id: 7,
    question: "What is the 'Black Box' problem in Machine Learning and how does it compare to traditional rule code?",
    shortAnswer: "Complex ML models (like Deep Neural Networks) lack straightforward human interpretability.",
    explanation: "Traditional code can be stepped through line-by-line using a debugger with full variable visibility. Deep ML models contain millions of non-linear parameter weights whose individual contributions to a final decision are challenging to explain to auditors.",
    hint: "Consider regulatory compliance in banking where a loan rejection reason must be legally documented.",
    level: "Moderate",
    codeExample: "// Traditional: Clear why rejected (cibil < 700)\n// Deep ML: y_hat = Softmax(W10 * ReLU(W9 * ... + b9))"
  },
  {
    id: 8,
    question: "Under what data condition will a Machine Learning system perform worse than a simple handcrafted rule system?",
    shortAnswer: "When training data is extremely scarce, severely unrepresentative, or heavily corrupted with noise.",
    explanation: "ML algorithms rely on statistical sample size to infer meaningful manifolds. With fewer than 10-20 noisy observations, complex ML models overfit or hallucinate spurious correlations, whereas a domain expert's rule functions reliably.",
    hint: "Machine learning is data-hungry; without statistical support, inductive bias fails.",
    level: "Moderate",
    codeExample: "# With N=5 samples, a decision tree memorizes noise; a heuristic rule generalizes better."
  },
  {
    id: 9,
    question: "What role does Feature Engineering play in bridging traditional domain knowledge with Machine Learning?",
    shortAnswer: "Transforming raw data into meaningful mathematical indicators using human domain expertise.",
    explanation: "Feature engineering leverages domain expertise (from traditional programmers or analysts) to craft derived metrics (e.g., Debt-to-Income ratio, BMI, velocity of transactions) that help ML algorithms learn faster and with greater accuracy.",
    hint: "Human domain insights embedded into tabular columns for the algorithm.",
    level: "Moderate",
    codeExample: "df['debt_to_income'] = df['monthly_emi'] / (df['monthly_income'] + 1e-6)"
  },
  {
    id: 10,
    question: "In a medical triage application in Kolkata, what is the key advantage of an ML model over a single hardcoded cutoff threshold?",
    shortAnswer: "ML evaluates non-linear multi-factor interactions across dozens of clinical biomarkers simultaneously.",
    explanation: "Patients rarely fit neat single-variable cutoffs. An ML model can weigh a borderline blood pressure alongside mild ECG changes, patient age, and oxygen saturation to compute a comprehensive risk score that rigid rules miss.",
    hint: "Multi-dimensional compensation across variables.",
    level: "Moderate",
    codeExample: "risk = sigmoid(w1*bp + w2*ecg_variance + w3*spo2 + w4*age + b)"
  },
  {
    id: 11,
    question: "What is Technical Debt in Machine Learning (Sculley et al., Google 2015)?",
    shortAnswer: "The hidden maintenance complexity stemming from data dependencies, pipeline glue code, and feedback loops.",
    explanation: "Unlike traditional code where debt is encapsulated in refactoring needs, ML technical debt includes data pipeline fragility, feature store drift, model configuration debt, and real-world system entanglement.",
    hint: "Only a small fraction of real-world ML systems is ML code; the rest is complex infrastructure.",
    level: "Expert",
    codeExample: "# 'Hidden Technical Debt in Machine Learning Systems' - NeurIPS Paper"
  },
  {
    id: 12,
    question: "Why is traditional regex parsing insufficient for sentiment analysis of product reviews in Kolkata markets?",
    shortAnswer: "Natural language features nuanced sarcasm, double negatives, colloquial Bengali phrasing, and context.",
    explanation: "A sentence like 'Not bad at all for the price!' contains the word 'bad' (negative regex hit), yet conveys high positive sentiment. Traditional keyword-matching fails to capture context, tone, and syntactic composition.",
    hint: "Think about sarcasm: 'Oh brilliant, another train delay!'",
    level: "Basic",
    codeExample: "# Regex: re.search('bad', text) -> False Negative on 'not bad at all'"
  },
  {
    id: 13,
    question: "What is the difference between Deterministic and Probabilistic execution outputs?",
    shortAnswer: "Deterministic produces identical exact outputs every run; Probabilistic outputs statistical likelihood distributions.",
    explanation: "Traditional programs return guaranteed deterministic outputs (e.g., 2 + 2 = 4). ML classification models output probability scores P(Y=k|X) representing statistical confidence over class distributions.",
    hint: "Fixed output vs probability distribution over possibilities.",
    level: "Basic",
    codeExample: "prob_dist = [0.85, 0.12, 0.03] # Probabilistic class distribution"
  },
  {
    id: 14,
    question: "How does testing/QA differ between traditional software and machine learning software?",
    shortAnswer: "Traditional tests unit code branches; ML tests data distributions, statistical metrics, and slice drift.",
    explanation: "Traditional QA uses unit tests (Assert equals, code coverage). ML QA evaluates statistical test splits, slice performance across demographic cohorts, data schema validation, and robustness against adversarial perturbations.",
    hint: "Testing deterministic code logic vs testing empirical statistical distributions.",
    level: "Moderate",
    codeExample: "assert f1_score(y_test, model.predict(X_test)) >= 0.90"
  },
  {
    id: 15,
    question: "What happens to a traditional rule-based spam filter when spammers replace the letter 'o' with '0' (e.g., 'FREE L0AN')?",
    shortAnswer: "The rule fails unless the engineer anticipates and manually hardcodes new regex variants.",
    explanation: "Traditional rule filters suffer from brittle pattern matches. Machine Learning models with character n-grams or subword tokenization (like BERT) capture semantic similarity automatically without requiring human engineers to anticipate every character permutation.",
    hint: "Adversarial evasion breaks hardcoded regex strings.",
    level: "Moderate",
    codeExample: "# Hardcoded: if 'FREE LOAN' in email -> Bypassed by 'FR33 L04N'"
  },
  {
    id: 16,
    question: "What is Occam's Razor principle in the context of choosing between Traditional Programming and Machine Learning?",
    shortAnswer: "Always choose the simpler deterministic solution unless the problem complexity strictly demands ML.",
    explanation: "Occam's Razor states that simpler explanations/models should be preferred over complex ones. If a 15-line SQL query or business rule solves a problem with 100% precision, introducing an ML pipeline adds unnecessary operational overhead.",
    hint: "Do not use a neural network when a basic if/else statement solves the task.",
    level: "Moderate",
    codeExample: "# Simple Rule > 5-layer Neural Network for linear thresholding"
  },
  {
    id: 17,
    question: "In autonomous vehicles navigating Ichapur roads, why is traditional rule-based robotics inadequate for pedestrian detection?",
    shortAnswer: "Pedestrians vary in posture, clothing, lighting, occlusion, and movement dynamics.",
    explanation: "Writing deterministic rules for how a pedestrian looks (standing, walking, carrying bags, holding umbrellas in rain) would require millions of conflicting rules. Convolutional vision models learn visual features hierarchically from data.",
    hint: "Sensory variability in real-world unstructured environments.",
    level: "Moderate",
    codeExample: "y_boxes = YOLOv8().predict(camera_frame)"
  },
  {
    id: 18,
    question: "What is Software 2.0 as coined by Andrej Karpathy?",
    shortAnswer: "Writing programs by training neural network weights with data rather than writing source code lines.",
    explanation: "Software 1.0 is classic code written in C++, Python, or Java with explicit logic. Software 2.0 is written in the language of neural network weights, where the human programmer acts as a data curator and optimization designer.",
    hint: "Programming through data curation and loss function optimization.",
    level: "Expert",
    codeExample: "# Software 2.0: Weights file 'model.safetensors' (10GB of floating point numbers)"
  },
  {
    id: 19,
    question: "What is the primary constraint when deploying Traditional Programming to multi-lingual voice recognition across West Bengal?",
    shortAnswer: "Acoustic phoneme variations, accents, background noise, and dialect shifts cannot be coded as boolean rules.",
    explanation: "Acoustic audio signals are continuous frequency waveforms. Variations in pitch, Bengali regional dialects, ambient noise, and pacing require statistical acoustic and language models rather than hardcoded audio filters.",
    hint: "Continuous wave processing vs discrete rules.",
    level: "Moderate",
    codeExample: "transcription = WhisperModel.transcribe(audio_bytes)"
  },
  {
    id: 20,
    question: "Which component of an ML architecture is written using Traditional Programming?",
    shortAnswer: "Data ingestion, API endpoints, web routing, data validation schemas, and monitoring dashboards.",
    explanation: "Over 90% of a production ML system's codebase consists of traditional software: FastAPI REST endpoints, React frontend views, database connection pooling, Docker configs, and Kubernetes scheduling manifests.",
    hint: "The glue code surrounding the core model inference call.",
    level: "Moderate",
    codeExample: "@app.post('/predict')\ndef predict_endpoint(payload: StudentInput): return model.predict(payload)"
  },
  {
    id: 21,
    question: "Why does traditional software scale with $O(1)$ or $O(N)$ computational deterministic guarantees while ML training scales with optimization epochs?",
    shortAnswer: "Traditional algorithms follow predefined execution paths; ML training requires iterative convergence loops over empirical loss manifolds.",
    explanation: "Traditional logic evaluates static conditional branches in fixed deterministic steps. ML training iteratively calculates loss gradients and updates weight vectors over hundreds of epochs until convergence criteria are met.",
    hint: "Fixed code path vs gradient descent descent on high-dimensional loss surface.",
    level: "Expert",
    codeExample: "for epoch in range(100): loss.backward(); optimizer.step()"
  },
  {
    id: 22,
    question: "How does traditional data caching compare with ML model prediction caching?",
    shortAnswer: "Traditional caches exact key-value pairs; ML uses embedding similarity lookups and nearest-neighbor vector caches.",
    explanation: "Traditional caching (like Redis) matches identical query strings. ML systems often implement Semantic Caching using vector databases (like Milvus or Faiss) to return cached responses for semantically similar query embeddings.",
    hint: "Exact key matching vs cosine similarity vector search.",
    level: "Expert",
    codeExample: "if cosine_similarity(query_emb, cached_emb) > 0.95: return cached_response"
  },
  {
    id: 23,
    question: "In banking transaction monitoring, what is a hybrid Rule + ML architecture?",
    shortAnswer: "Using fast deterministic rules for hard legal bans, followed by an ML model for nuanced anomaly scoring.",
    explanation: "High-performance systems use a cascade: deterministic rules filter obvious sanctions and blocked account numbers instantaneously, while a machine learning scoring engine evaluates ambiguous transactions for subtle fraud patterns.",
    hint: "Two-stage pipeline: Fast hard filters + Deep statistical scoring.",
    level: "Moderate",
    codeExample: "if is_blacklisted(account): return Reject()\nscore = ml_fraud_model(features)"
  },
  {
    id: 24,
    question: "What makes traditional code inherently easier to debug with breakpoints compared to an overfitted Neural Network?",
    shortAnswer: "Every step in traditional code maps directly to human-readable variable states and control flows.",
    explanation: "A developer can place a breakpoint and inspect exact variable values and boolean flags. In a Neural Network with millions of weights, inspecting weight values like w[452] = 0.0384 provides no immediate insight into why a specific decision occurred.",
    hint: "Human-readable control flow vs high-dimensional matrix multiplications.",
    level: "Basic",
    codeExample: "debugger.set_trace() # Step through if income < 50000"
  },
  {
    id: 25,
    question: "What is 'Data Slicing' and why is it critical when benchmarking ML vs Traditional systems?",
    shortAnswer: "Evaluating model metrics across specific subgroups to ensure equitable performance without hidden bias.",
    explanation: "A model might boast 95% overall accuracy, but achieve only 60% accuracy on a critical minority demographic slice. Data slicing reveals localized performance disparities that aggregate metrics conceal.",
    hint: "Breaking down test performance across distinct regional cohorts (e.g. Barrackpore vs Kolkata).",
    level: "Expert",
    codeExample: "slice_accuracy = accuracy_score(y[slice_idx], y_pred[slice_idx])"
  },
  {
    id: 26,
    question: "Why do traditional database queries (SQL) require exact schema matching, whereas ML embeddings support approximate semantic queries?",
    shortAnswer: "SQL performs symbolic relational algebra; ML embeddings map concepts to dense geometric vector spaces.",
    explanation: "SQL queries match literal strings or exact boolean predicates (`WHERE status = 'Active'`). Embeddings convert text into continuous vectors in $\\mathbb{R}^d$ where semantic closeness is measured by cosine angle.",
    hint: "Exact symbolic matching vs continuous metric geometry.",
    level: "Moderate",
    codeExample: "sim = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))"
  },
  {
    id: 27,
    question: "What is 'Model Drift' and why does traditional code not experience it?",
    shortAnswer: "The statistical relationship between features and targets shifts over time, degrading ML accuracy while traditional code logic remains static.",
    explanation: "Traditional code logic remains 100% constant unless a developer alters the source code. ML models degrade because the real-world data distribution shifts (e.g., inflation changes spending patterns), rendering old weights obsolete.",
    hint: "Static source code vs changing real-world probability distributions.",
    level: "Moderate",
    codeExample: "P_2024(Y|X) != P_2020(Y|X) # Concept drift"
  },
  {
    id: 28,
    question: "In smart climate control for Kolkata data centers, how does an ML controller improve over a traditional thermostat?",
    shortAnswer: "ML anticipates weather forecasts, server loads, and thermal inertia rather than reacting only after temperatures spike.",
    explanation: "Traditional thermostats react only when the temperature exceeds a setpoint. An ML predictive controller models thermal lag and forecasts upcoming computational workload spikes to pre-cool systems efficiently, saving energy.",
    hint: "Reactive thresholding vs predictive non-linear optimization.",
    level: "Moderate",
    codeExample: "cool_action = RL_Agent.predict([current_temp, server_load_forecast, ambient_weather])"
  },
  {
    id: 29,
    question: "What is 'Reproducibility' in Traditional vs ML systems?",
    shortAnswer: "Traditional code is 100% bitwise reproducible; ML requires tracking seeds, hardware precision, and dataset versions.",
    explanation: "Traditional code executed with the same inputs produces identical outputs. ML training involves stochastic initialization, non-deterministic GPU floating-point operations, and data shuffling, requiring random seed management and data version control (DVC).",
    hint: "Stochastic optimization and floating-point non-determinism.",
    level: "Expert",
    codeExample: "torch.manual_seed(42); np.random.seed(42)"
  },
  {
    id: 30,
    question: "Which of the following is the ultimate industry synthesis between Traditional Programming and Machine Learning?",
    shortAnswer: "MLOps and Composite Systems: using traditional microservices to serve, validate, monitor, and guardrail statistical ML models.",
    explanation: "Modern enterprise applications are hybrid. Traditional code handles routing, authentication, business guardrails, fallback logic, and deterministic constraints, while embedded ML microservices handle perception, ranking, recommendations, and pattern recognition.",
    hint: "The best systems use both paradigms harmoniously where each excels.",
    level: "Expert",
    codeExample: "# Hybrid Architecture: Guardrails (Code) -> ML Model -> Fallback Heuristic (Code)"
  }
];

export default questions;
