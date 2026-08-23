/**
 * Topic 2: Why Machine Learning is Needed
 * 30 Assessment Questions (Moderate to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore
 */

const questions = [
  {
    id: 1,
    question: "What is the primary factor rendering traditional handcrafted rule engines obsolete for automated speech recognition?",
    shortAnswer: "The infinite continuous acoustic variations, regional accents, dialects, and background noise in speech waveforms.",
    explanation: "Human speech produces continuous acoustic frequency spectrums with vast variations in speaker pitch, speed, background noise, and accents (e.g. colloquial Bengali phrasing in Kolkata). Crafting boolean if/else rules to map raw hertz audio samples to dictionary words is impossible.",
    hint: "Think about the continuous nature of audio waveforms vs discrete boolean rules.",
    level: "Basic",
    codeExample: "# Traditional: Cannot write if freq == 440 and duration == 0.2: return 'Hello'\n# ML: WhisperModel.transcribe(audio)"
  },
  {
    id: 2,
    question: "Why do recommendation systems for e-commerce platforms with millions of users necessitate Machine Learning over rule-based logic?",
    shortAnswer: "Writing individual rule files for millions of distinct user tastes and item combinations is mathematically intractable.",
    explanation: "With 10 million users and 500,000 products, the user-item preference space has 5 trillion possible pairings. Machine Learning algorithms (like Collaborative Filtering, Matrix Factorization, and Two-Tower Neural Networks) learn dense low-dimensional user/item embeddings that scale mathematically.",
    hint: "Consider the scale of user-item interaction matrices.",
    level: "Moderate",
    codeExample: "user_emb = UserEncoder(user_id)\nitem_emb = ItemEncoder(item_id)\nscore = np.dot(user_emb, item_emb)"
  },
  {
    id: 3,
    question: "What is a 'Non-Linear Manifold' and why does it necessitate Machine Learning?",
    shortAnswer: "Complex curved or concentric geometric patterns in feature space that cannot be separated by linear decision planes.",
    explanation: "Real-world physical, biological, and financial relationships are rarely simple straight lines. Non-linear machine learning algorithms (such as RBF Kernel SVMs, Random Forests, and Deep Neural Networks) project data into higher-dimensional reproducing kernel Hilbert spaces to separate complex data structures.",
    hint: "Think of an inner circle of normal data surrounded by an outer ring of anomalies.",
    level: "Expert",
    codeExample: "model = SVC(kernel='rbf', gamma='scale') # Separates non-linear rings"
  },
  {
    id: 4,
    question: "In what way does Machine Learning address the challenge of 'Data Drift' in live production environments?",
    shortAnswer: "By establishing automated continuous retraining pipelines (MLOps) that ingest new data distributions without code redesign.",
    explanation: "When real-world distributions shift (e.g., spending patterns shifting during festive Durga Puja in Kolkata), traditional software requires manual code rewriting. ML systems can be scheduled to retrain model weights automatically on rolling temporal data windows.",
    hint: "Adapting model weights via optimization vs rewriting source code.",
    level: "Moderate",
    codeExample: "retrain_dag = AirflowDAG(schedule='@weekly', task=train_and_validate_model)"
  },
  {
    id: 5,
    question: "Why is Machine Learning critical for medical image pathology (such as detecting cancer lesions in CT scans)?",
    shortAnswer: "Subtle pixel intensity gradients, fuzzy cell boundaries, and tissue artifacts cannot be captured by static geometric rules.",
    explanation: "Tumors and lesions do not conform to rigid geometric circles or squares; they exhibit irregular margins, subtle contrast variations, and overlapping healthy tissue that require multi-layer hierarchical feature representation learned by Convolutional Neural Networks.",
    hint: "Think about hierarchical feature extraction: edges -> textures -> motifs -> anatomical lesions.",
    level: "Moderate",
    codeExample: "model = ResNet50(weights='imagenet') # Hierarchical feature extractor"
  },
  {
    id: 6,
    question: "What hardware transformation in the early 2010s enabled the massive explosion of modern Machine Learning?",
    shortAnswer: "The adaptation of Graphics Processing Units (GPUs) for highly parallel matrix multiplications and tensor algebra.",
    explanation: "Training deep neural networks requires trillions of floating-point matrix multiplications. GPUs (originally designed for video game 3D graphics) provide thousands of parallel execution cores, accelerating ML model training by orders of magnitude compared to traditional single-threaded CPUs.",
    hint: "Parallel matrix arithmetic on SIMD architectures.",
    level: "Moderate",
    codeExample: "device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')"
  },
  {
    id: 7,
    question: "Why are traditional threshold filters ineffective for financial Anti-Money Laundering (AML) in Kolkata fintech hubs?",
    shortAnswer: "Adversaries quickly learn static threshold limits (e.g. ₹50,000) and structure transactions (smurfing) to evade detection.",
    explanation: "Static rules are easily reverse-engineered. Machine learning evaluates multi-hop transaction graph embeddings, account creation velocity, device fingerprint anomalies, and entropy across time, detecting sophisticated smurfing networks.",
    hint: "Adversarial adaptation vs static boolean rules.",
    level: "Moderate",
    codeExample: "risk_score = GraphNeuralNet.evaluate_subgraph(transaction_cluster)"
  },
  {
    id: 8,
    question: "What is the 'Curse of Dimensionality' and how do modern ML representation techniques mitigate it?",
    shortAnswer: "High-dimensional spaces become exponentially sparse; ML uses dimensionality reduction and dense embeddings to extract latent manifolds.",
    explanation: "As feature dimension $d$ grows, data points become exponentially isolated, causing traditional distance metrics to collapse. ML utilizes algorithms like PCA, Autoencoders, and Word2Vec embeddings to compress thousands of sparse dimensions into compact, informative latent spaces.",
    hint: "Compressing high-dimensional sparse representations into compact dense vectors.",
    level: "Expert",
    codeExample: "embeddings = Autoencoder.encode(sparse_high_dim_features)"
  },
  {
    id: 9,
    question: "In autonomous driving along congested corridors like BT Road, why is ML required for obstacle trajectory prediction?",
    shortAnswer: "Human drivers, pedestrians, and auto-rickshaws exhibit non-deterministic stochastic behaviors with complex physical constraints.",
    explanation: "Predicting where a pedestrian or cyclist will move over the next 3 seconds involves road geometry, walking speed, head gaze direction, and vehicle proximity, which can only be modeled using probabilistic spatio-temporal neural networks.",
    hint: "Predicting continuous probability distributions of future trajectory paths.",
    level: "Moderate",
    codeExample: "future_trajectories = TrajectoryLSTM(past_coordinate_sequence)"
  },
  {
    id: 10,
    question: "How does Machine Learning enable real-time search engines to handle misspelled search terms?",
    shortAnswer: "By calculating vector cosine distance in high-dimensional semantic embedding spaces rather than exact string matching.",
    explanation: "Exact SQL matching on 'leptop' returns 0 results. Vector embeddings map 'leptop' and 'laptop' into adjacent geometric positions in semantic space, allowing nearest-neighbor search to retrieve correct product listings seamlessly.",
    hint: "Semantic proximity in vector space vs exact literal string match.",
    level: "Basic",
    codeExample: "results = vector_db.search(query_vector=embed('leptop'), top_k=5)"
  },
  {
    id: 11,
    question: "What is the fundamental difference between scaling computational capacity via Traditional rules vs Machine Learning models?",
    shortAnswer: "Traditional rules scale linearly with human engineering labor; ML scales with automated data volume and GPU compute.",
    explanation: "To expand a rule-based system, human domain experts must manually draft, test, and debug new rules for every new product line or country. ML systems scale by ingesting additional training data into existing learning algorithms without requiring human manual rule formulation.",
    hint: "Human labor scaling vs compute/data scaling.",
    level: "Moderate",
    codeExample: "# Scaling in ML: Add 1M more data rows and increase training epochs."
  },
  {
    id: 12,
    question: "Why is Machine Learning necessary for predictive maintenance of industrial turbines in Ichapur manufacturing units?",
    shortAnswer: "Failure precursors are hidden in multi-sensor micro-vibrations and thermal gradients long before catastrophic failure occurs.",
    explanation: "Industrial machinery rarely breaks instantly. Micro-cracks produce high-frequency acoustic and vibration harmonic shifts across dozens of telemetry streams that human operators cannot manually detect on physical gauges.",
    hint: "Multi-variate sensor fusion and subtle harmonic degradation signatures.",
    level: "Moderate",
    codeExample: "anomaly_score = IsolationForest().fit_predict(sensor_telemetry_stream)"
  },
  {
    id: 13,
    question: "What is 'Latent Feature Extraction' in Deep Learning architectures?",
    shortAnswer: "The automatic discovery of hierarchical abstract representations directly from raw inputs without manual feature crafting.",
    explanation: "In traditional ML, engineers hand-crafted features. In Deep Learning (e.g., CNNs, Transformers), lower layers learn low-level primitives (edges, phonemes) while deeper layers automatically compose them into high-level abstract concepts (faces, semantics).",
    hint: "Automatic hierarchical representation learning.",
    level: "Expert",
    codeExample: "# Conv Layer 1: Edges -> Conv Layer 2: Textures -> Conv Layer 3: Object Parts"
  },
  {
    id: 14,
    question: "Why do logistics companies in Kolkata use Reinforcement Learning for dynamic vehicle routing instead of static Dijkstra's algorithm?",
    shortAnswer: "Static Dijkstra assumes fixed edge weights; real city traffic involves dynamic congestion, order cancellations, and delivery time windows.",
    explanation: "Dijkstra calculates the shortest static path. RL agents optimize long-term multi-vehicle fleet assignments under dynamic stochastic conditions (changing traffic density, sudden rain, new order dispatches) to maximize delivery throughput.",
    hint: "Static graph traversal vs dynamic Markov Decision Process under uncertainty.",
    level: "Expert",
    codeExample: "action = RLAgent.act(current_fleet_state, dynamic_traffic_map)"
  },
  {
    id: 15,
    question: "What role does 'Transfer Learning' play in making Machine Learning economically viable for small businesses in Barrackpore?",
    shortAnswer: "Fine-tuning massive pre-trained foundation models on small domain-specific datasets with minimal compute.",
    explanation: "Small organizations cannot afford millions of dollars to train models from scratch. Transfer learning allows them to download open-source foundation models (e.g., BERT, ResNet, Llama) pre-trained on internet-scale data and fine-tune them on a few hundred local domain examples.",
    hint: "Reusing learned representations from large models for niche tasks.",
    level: "Moderate",
    codeExample: "model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased')"
  },
  {
    id: 16,
    question: "Why is ML necessary for real-time video super-resolution and frame generation?",
    shortAnswer: "Inferring missing sub-pixel textures and optical flow vectors requires generative statistical prior knowledge.",
    explanation: "Upscaling a 1080p video to 4K requires generating 3 out of every 4 pixels. Bicubic interpolation produces blurry results; deep learning diffusion or generative adversarial models synthesize realistic hair, foliage, and fabric textures based on learned natural image priors.",
    hint: "Generative texture synthesis vs mathematical pixel averaging.",
    level: "Expert",
    codeExample: "high_res_frame = SuperResolutionModel.generate(low_res_input)"
  },
  {
    id: 17,
    question: "How does Machine Learning revolutionize algorithmic drug discovery in computational biology?",
    shortAnswer: "By predicting 3D protein folding configurations and molecular docking affinities from amino acid sequences.",
    explanation: "The number of potential molecular drug candidates is estimated at $10^{60}$. Machine learning models (like AlphaFold) predict complex 3D protein structures and binding affinities in seconds, accelerating drug candidate screening from decades to days.",
    hint: "AlphaFold predicting molecular 3D structures from 1D sequences.",
    level: "Expert",
    codeExample: "structure_pdb = AlphaFold.predict(amino_acid_sequence)"
  },
  {
    id: 18,
    question: "Why are rule-based systems unable to perform accurate spam filtering in modern multilingual corporate email systems?",
    shortAnswer: "Adversarial word obfuscation, phishing lookalikes, polymorphic URLs, and subtle social engineering context.",
    explanation: "Attackers employ zero-font tricks, homoglyphs (Cyrillic characters resembling Latin letters), and multi-step urgency phrasing that defeat simple keyword blocklists. ML models analyze full transformer-based contextual semantic representations.",
    hint: "Contextual semantic analysis vs keyword blocking.",
    level: "Basic",
    codeExample: "spam_prob = RoBERTaClassifier.predict(email_body_and_headers)"
  },
  {
    id: 19,
    question: "What makes Machine Learning indispensable for smart climate control in high-density data centers?",
    shortAnswer: "Modeling complex thermodynamic thermal inertia, cooling lag, and fluctuating computational server workloads.",
    explanation: "Traditional thermostats react only after ambient temperatures rise, wasting massive cooling power. ML models predict upcoming compute spikes, weather temperature shifts, and thermal transfer delays to optimize cooling pumps proactively, reducing energy consumption by up to 40%.",
    hint: "Proactive predictive thermodynamic modeling.",
    level: "Moderate",
    codeExample: "pump_speed = EnergyOptimizer.predict([server_load_forecast, ambient_temp])"
  },
  {
    id: 20,
    question: "Why is 'Zero-Shot Learning' in modern Foundation Models an essential advancement over traditional task-specific models?",
    shortAnswer: "The model can generalize to classify or execute novel tasks without requiring dedicated task-specific training data.",
    explanation: "Traditional ML required collecting hundreds of labeled training examples for every new classification category. Large multimodal foundation models (like CLIP and GPT-4) leverage rich semantic embeddings to categorize unseen classes zero-shot using natural language prompts.",
    hint: "Classifying novel categories without fine-tuning data.",
    level: "Expert",
    codeExample: "probs = clip_model.zero_shot_classify(image, candidate_labels=['cat', 'dog', 'drone'])"
  },
  {
    id: 21,
    question: "How does Machine Learning optimize credit card payment routing across multiple bank gateways in Salt Lake Sector V fintech apps?",
    shortAnswer: "By predicting real-time bank gateway downtime and transaction failure rates to dynamically route payments.",
    explanation: "Bank payment gateways experience intermittent server latency spikes and OTP delivery drop-offs. An ML routing engine evaluates gateway success rate telemetry every 5 seconds to steer transactions through the most reliable provider, maximizing checkout success.",
    hint: "Dynamic probabilistic latency and success rate prediction.",
    level: "Moderate",
    codeExample: "best_gateway = GatewaySelector.predict_highest_success(bank_code, amount)"
  },
  {
    id: 22,
    question: "Why is traditional code unable to detect deepfake video manipulations reliably?",
    shortAnswer: "Deepfake synthesis operates in dense pixel distributions where subtle facial landmark inconsistencies require micro-texture forensics.",
    explanation: "Deepfake generators blend synthetic faces into background video frames seamlessly to human perception. ML forensic classifiers detect microscopic frequency-domain anomalies, unnatural corneal light reflections, and mismatched pulse photoplethysmography (rPPG) signals.",
    hint: "Biological and frequency-domain artifact detection.",
    level: "Expert",
    codeExample: "is_deepfake = DeepfakeDetector.analyze_frame_frequencies(video_stream)"
  },
  {
    id: 23,
    question: "What is 'Active Learning' and why is it needed when labeling data is prohibitively expensive?",
    shortAnswer: "The ML model intelligently selects the most uncertain or informative data points for human experts to annotate.",
    explanation: "Instead of blindly paying radiologists in Jadavpur to annotate 100,000 scans, Active Learning queries the model to identify borderline cases where its prediction uncertainty is highest, achieving maximum model accuracy with 80% fewer human annotations.",
    hint: "Selective annotation of high-entropy, high-uncertainty samples.",
    level: "Expert",
    codeExample: "uncertain_samples = np.argsort(entropy(model.predict_proba(X_unlabeled)))[-100:]"
  },
  {
    id: 24,
    question: "In supply chain management, why is ML demand forecasting superior to simple Moving Average calculations?",
    shortAnswer: "ML simultaneously incorporates multi-variate exogenous factors like holidays, weather, promotions, fuel prices, and macroeconomic trends.",
    explanation: "Moving averages merely smooth past historical sales. ML regression and gradient boosting models ingest calendar events (Durga Puja, Diwali), local monsoon rainfall forecasts, competitor discount campaigns, and inflation indexes to produce accurate demand predictions.",
    hint: "Multi-variate exogenous variable modeling.",
    level: "Moderate",
    codeExample: "predicted_units = Prophet.predict(future_dates_with_holidays_and_weather)"
  },
  {
    id: 25,
    question: "Why do automated resume screening systems at recruitment firms require Machine Learning over simple keyword matching?",
    shortAnswer: "Candidates use diverse synonyms, phrasing styles, and project context to describe identical technical competencies.",
    explanation: "A candidate who writes 'Built microservices using FastAPI and Docker' has strong Python skills even if the keyword 'Python' is absent from their skills header. Semantic embedding models understand skill equivalence and project depth beyond literal string matches.",
    hint: "Semantic equivalences and contextual project evaluation.",
    level: "Basic",
    codeExample: "match_score = cosine_similarity(resume_embedding, job_desc_embedding)"
  },
  {
    id: 26,
    question: "What makes Machine Learning vital for real-time seismology and earthquake early warning systems?",
    shortAnswer: "Detecting the faint initial P-wave signatures from background seismic noise within milliseconds before destructive S-waves arrive.",
    explanation: "Primary (P) seismic waves arrive seconds before destructive secondary (S) shear waves. ML models classify noise from true fault slips in under 50 milliseconds across seismic sensor networks, triggering automatic bullet train emergency braking.",
    hint: "Sub-second waveform pattern classification.",
    level: "Expert",
    codeExample: "is_earthquake = SeismicCNN.evaluate_p_wave_sensor_stream(waveform_chunk)"
  },
  {
    id: 27,
    question: "Why is Machine Learning necessary for real-time translation between Bengali and English?",
    shortAnswer: "Languages possess distinct grammatical structures, idiomatic phrases, gender agreements, and cultural context.",
    explanation: "Word-by-word dictionary lookups produce incomprehensible literal translations. Sequence-to-sequence transformer models with self-attention analyze entire sentence clauses, reordering Subject-Object-Verb (Bengali) into Subject-Verb-Object (English) while preserving cultural idioms.",
    hint: "Sequence-to-sequence syntactic reordering and contextual semantics.",
    level: "Basic",
    codeExample: "translated_text = TranslationPipeline('আমি কলকাতায় থাকি') # 'I live in Kolkata'"
  },
  {
    id: 28,
    question: "In agriculture around North 24 Parganas, how does ML drone imaging assist crop health management?",
    shortAnswer: "By analyzing multispectral NDVI reflectance indices to detect nitrogen deficiency and fungal blight before visual symptoms appear.",
    explanation: "Multispectral drone cameras capture near-infrared (NIR) wavelengths invisible to the human eye. ML models evaluate chlorophyll absorption ratios across acres of farmland, generating localized fertilizer spraying maps.",
    hint: "Near-infrared multispectral image classification.",
    level: "Moderate",
    codeExample: "blight_map = CropHealthCNN.segment_multispectral_orthomosaic(drone_tiff)"
  },
  {
    id: 29,
    question: "What is the primary operational consequence when an enterprise relies on static rules instead of Machine Learning for customer churn prevention?",
    shortAnswer: "Customers churn without warning because their dissatisfaction signals are distributed across subtle usage decay metrics.",
    explanation: "Customers rarely send an explicit notice before canceling. Their usage decays subtly (logging in 2 times a week instead of 5, opening fewer marketing emails, taking longer to pay bills). An ML churn model flags these multi-metric decay signatures weeks in advance.",
    hint: "Subtle multi-variable behavioral decay detection.",
    level: "Moderate",
    codeExample: "churn_risk = XGBClassifier.predict_proba(customer_engagement_features)[:, 1]"
  },
  {
    id: 30,
    question: "What is the grand unified reason why Machine Learning is transforming 21st-century industry?",
    shortAnswer: "It converts vast empirical data assets into automated, scalable, and self-improving predictive intelligence.",
    explanation: "In every domain where human perception, non-linear optimization, pattern recognition, and high-dimensional decisions occur, Machine Learning automates what was previously impossible with handcrafted code, unlocking unprecedented efficiency and innovation across science, medicine, and business.",
    hint: "Automated, scalable predictive intelligence learned from data.",
    level: "Basic",
    codeExample: "# The Paradigm: Empirical Experience -> Optimization -> Continuous Intelligence"
  }
];

export default questions;
