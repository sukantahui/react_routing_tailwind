/**
 * Topic 9: Applications of Machine Learning
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "How do Machine Learning algorithms detect fraudulent financial transactions in real-time banking pipelines?",
    "shortAnswer": "By scoring live transaction feature vectors (amount, geolocation, velocity, merchant type) through supervised ensembles and flagging high-risk probabilities.",
    "explanation": "Banking fraud detection engines evaluate streaming card swipes in <50 milliseconds. Features such as distance from previous swipe, deviation from average transaction size, and unusual merchant categories are processed by Gradient Boosted Trees (XGBoost/LightGBM) to block fraudulent card operations.",
    "hint": "Sub-100ms classification scoring based on spending velocity and geolocation deviations.",
    "level": "Basic",
    "codeExample": "# Real-time fraud scoring\nrisk_score = fraud_model.predict_proba(live_txn_features)[0, 1]\nif risk_score > 0.85: trigger_otp_or_block()"
  },
  {
    "id": 2,
    "question": "What is the difference between Collaborative Filtering and Content-Based Filtering in Recommendation Systems?",
    "shortAnswer": "Collaborative filtering recommends items based on user-user or item-item interaction matrices; Content-based recommends items matching specific user attribute profiles.",
    "explanation": "Collaborative Filtering (e.g. Matrix Factorization / SVD) finds patterns like 'Users who liked movie A and B also liked movie C' without needing metadata. Content-Based Filtering extracts item features (e.g. movie genre, director, actors) and matches them to a user's explicit preference history.",
    "hint": "User behavior interaction matrix vs item metadata attribute matching.",
    "level": "Moderate",
    "codeExample": "# Collaborative: Matrix Factorization R \u2248 U * V^T\n# Content-Based: CosineSimilarity(user_profile_vec, item_feature_vec)"
  },
  {
    "id": 3,
    "question": "How do Large Language Models (LLMs) like GPT utilize Machine Learning for Natural Language Processing?",
    "shortAnswer": "By using Multi-Head Self-Attention Transformer architectures trained on autoregressive next-token prediction loss over massive text corpora.",
    "explanation": "Transformers process sequences in parallel using self-attention mechanisms that compute dynamic contextual token embeddings. The model minimizes cross-entropy loss predicting the (t+1)-th token given tokens 1 through t: L = - \u2211 log P(w_{t+1} | w_1, ..., w_t; \u03b8).",
    "hint": "Self-attention transformer blocks optimizing next-token cross-entropy loss.",
    "level": "Moderate",
    "codeExample": "# Autoregressive loss = -log P(next_word | context_words)"
  },
  {
    "id": 4,
    "question": "What is the primary role of Convolutional Neural Networks (CNNs) in Medical Diagnostic Imaging (e.g. Tumor Detection)?",
    "shortAnswer": "To automatically extract spatial hierarchical visual patterns (edges, textures, lesions) from raw pixel matrices using shift-invariant convolution kernels.",
    "explanation": "CNNs apply 2D/3D parameterized filter kernels that slide across radiology scans (MRI/CT/X-Ray). Lower layers detect basic edges and contrasts, intermediate layers detect anatomical shapes, and dense top layers classify malignant vs benign tumors or segment lesion boundaries.",
    "hint": "Hierarchical spatial feature extraction using parameterized sliding 2D/3D convolutional kernels.",
    "level": "Basic",
    "codeExample": "# CNN Feature Map: y[i, j] = sum(x[i+u, j+v] * kernel[u, v])"
  },
  {
    "id": 5,
    "question": "How does Machine Learning enable Predictive Maintenance in industrial manufacturing and aviation?",
    "shortAnswer": "By analyzing streaming IoT sensor telemetry (vibration, temperature, pressure) to predict the Remaining Useful Life (RUL) of machinery before failure occurs.",
    "explanation": "Instead of static calendar-based servicing or waiting for disastrous breakdown, predictive maintenance models (using time-series LSTMs or Random Forests) detect early anomalous acoustic/vibrational degradation patterns, scheduling repairs during non-operational downtime.",
    "hint": "Predicting Remaining Useful Life (RUL) from IoT vibrational and thermal time series.",
    "level": "Moderate",
    "codeExample": "# Predict RUL in operating hours\npredicted_rul = rul_regressor.predict(sensor_telemetry_window)"
  },
  {
    "id": 6,
    "question": "How is Reinforcement Learning applied in Autonomous Vehicle navigation?",
    "shortAnswer": "An agent takes steering, throttle, and braking actions in an environment to maximize cumulative distance rewards while avoiding collision penalties.",
    "explanation": "Self-driving systems combine sensor fusion (LiDAR, Radar, Cameras) with Deep Reinforcement Learning (e.g. PPO, SAC). The policy network \u03c0_\u03b8(a|s) maps the observed driving state s into continuous control actions a, receiving rewards for smooth lane-keeping and large penalties for collisions.",
    "hint": "Policy network optimizing continuous vehicle control actions via reward feedback.",
    "level": "Expert",
    "codeExample": "# Reward = +1 (Safe meter driven) - 1000 (Collision) - 5 (Lane deviation)"
  },
  {
    "id": 7,
    "question": "What is Named Entity Recognition (NER) in Natural Language Processing applications?",
    "shortAnswer": "Extracting and classifying named entities in unstructured text into predefined categories (e.g., Person, Organization, Geolocation, Date).",
    "explanation": "NER models parse unstructured clinical notes, legal contracts, or customer tickets to extract structured tokens (e.g. 'Dr. Banerjee' \u2192 Person; 'Barrackpore Hospital' \u2192 Organization; 'Paracetamol 500mg' \u2192 Medication), using token-level classification (BIO tagging).",
    "hint": "Identifying and categorizing real-world proper nouns in text sequences.",
    "level": "Basic",
    "codeExample": "# NER Output: [('Sundar Pichai', 'PER'), ('Google', 'ORG'), ('Mountain View', 'LOC')]"
  },
  {
    "id": 8,
    "question": "How do algorithmic High-Frequency Trading (HFT) systems utilize Machine Learning?",
    "shortAnswer": "By analyzing microsecond Order Book dynamics and trade volumes to forecast immediate price direction and capture bid-ask spreads.",
    "explanation": "ML models ingest Level 2/3 limit order book data (bids, asks, depths, queue cancellations). Ultra-fast models (like linear models on FPGAs or compact neural networks) predict microsecond price movements to execute liquidity-providing limit orders.",
    "hint": "Microsecond order book imbalance forecasting and automated trade execution.",
    "level": "Expert",
    "codeExample": "# Imbalance = (Bid_Volume - Ask_Volume) / (Bid_Volume + Ask_Volume)"
  },
  {
    "id": 9,
    "question": "What is Optical Character Recognition (OCR) and how has Machine Learning modernized it?",
    "shortAnswer": "Converting images of typed or handwritten text into machine-encoded text using CNN feature extractors paired with CTC-loss or Transformer decoders.",
    "explanation": "Modern OCR systems (such as Tesseract, CRNN, or TrOCR) pass document crops through vision backbones to extract spatial representations, followed by recurrent or attention sequence decoders that transcribe Bengali, English, or Devanagari script robustly to distortion.",
    "hint": "Vision encoders + Sequence decoders transcribing handwritten or printed text.",
    "level": "Basic",
    "codeExample": "# Modern OCR pipeline: Image \u2192 Vision Transformer \u2192 CTC/Autoregressive Text Decoder"
  },
  {
    "id": 10,
    "question": "How is Machine Learning applied in Smart Agriculture and Precision Farming?",
    "shortAnswer": "Analyzing drone multispectral imagery (NDVI index) and soil sensors to detect crop diseases, optimize fertilizer dosing, and forecast yields.",
    "explanation": "Object detection models (YOLO) mounted on agricultural drones identify weed patches for targeted micro-spraying (reducing herbicide waste by 90%). Classification models diagnose foliar fungal diseases from smartphone leaf photos in real time.",
    "hint": "Drone multispectral crop monitoring and automated disease leaf diagnostics.",
    "level": "Basic",
    "codeExample": "# NDVI = (Near_Infrared - Red) / (Near_Infrared + Red)"
  },
  {
    "id": 11,
    "question": "What is Sentiment Analysis in customer experience management?",
    "shortAnswer": "Classifying the emotional polarity (Positive, Neutral, Negative) of customer reviews, social media mentions, and support tickets.",
    "explanation": "Enterprises process millions of feedback tweets and reviews using fine-tuned transformer models (like RoBERTa). The system routes angry complaints (negative sentiment) to priority customer support queues automatically.",
    "hint": "Text polarity classification quantifying user emotional tone.",
    "level": "Basic",
    "codeExample": "from transformers import pipeline\nsentiment_pipeline = pipeline('sentiment-analysis')\nresult = sentiment_pipeline('The service at Barrackpore branch was outstanding!')"
  },
  {
    "id": 12,
    "question": "How does Machine Learning improve Automated Speech Recognition (ASR) systems (e.g. Siri, Alexa)?",
    "shortAnswer": "By converting audio spectrogram frequencies into phonetic token probabilities using Conformer or Whisper sequence-to-sequence neural architectures.",
    "explanation": "Raw audio waveforms are transformed into Log-Mel Spectrograms. Deep acoustic-language models (such as OpenAI Whisper) map spectral frames into phonetic representations, transcribing accents and background noise robustly via attention decoding.",
    "hint": "Spectrogram feature extraction mapped to text tokens via acoustic-language models.",
    "level": "Moderate",
    "codeExample": "# Audio Spectrogram -> Conformer/Whisper Encoder -> Transformer Decoder -> Transcript"
  },
  {
    "id": 13,
    "question": "What is Churn Prediction in subscription businesses (Telecom, SaaS, Banking)?",
    "shortAnswer": "A binary classification model identifying customers likely to cancel their subscriptions in the upcoming billing cycle.",
    "explanation": "By analyzing drop-offs in customer login frequency, support ticket complaints, and payment delays, a churn model outputs a churn risk probability P(churn | x). Marketing teams can then offer targeted discounts to high-risk customers proactively.",
    "hint": "Predictive attrition modeling to trigger proactive customer retention interventions.",
    "level": "Basic",
    "codeExample": "# If P(churn) > 0.75: Trigger 20% retention discount coupon via email"
  },
  {
    "id": 14,
    "question": "How is Machine Learning applied in Computational Drug Discovery and Protein Structure Prediction?",
    "shortAnswer": "By modeling 3D molecular graph conformations (AlphaFold) to predict protein folding geometries and screen virtual candidate drug molecules.",
    "explanation": "DeepMind's AlphaFold uses invariant geometric transformers (Evoformer) to predict 3D atomic coordinates of proteins from 1D amino acid sequences. Graph Neural Networks (GNNs) evaluate binding affinities of small drug molecules to target proteins in silico.",
    "hint": "3D geometric deep learning predicting protein folding and molecular binding affinity.",
    "level": "Expert",
    "codeExample": "# GNN on molecular graphs: Nodes = Atoms, Edges = Covalent chemical bonds"
  },
  {
    "id": 15,
    "question": "What is Dynamic Pricing in e-commerce and ride-hailing (Uber, Ola)?",
    "shortAnswer": "Real-time regression and demand elasticity models adjusting ride fares based on live passenger demand, driver supply, traffic, and weather.",
    "explanation": "Dynamic pricing optimizes revenue while balancing marketplace supply and demand: Price = Base_Rate * Surge_Multiplier. ML models forecast rider demand density and driver spatial supply 15-30 minutes into the future to incentivize drivers toward high-demand zones.",
    "hint": "Algorithmic surge multiplier optimization balancing live supply and demand.",
    "level": "Moderate",
    "codeExample": "surge_multiplier = ml_surge_engine.predict([live_demand, active_drivers, rain_flag])"
  },
  {
    "id": 16,
    "question": "How do Email Spam Filters combine Naive Bayes and modern neural embeddings?",
    "shortAnswer": "By computing posterior probabilities of spam keywords (Bayesian) alongside transformer embeddings that detect semantic phishing intent.",
    "explanation": "Traditional spam filters calculate P(Spam | Words) using token likelihoods. Modern systems augment this with header metadata, sender DKIM/SPF domain verification, and transformer semantic embeddings to thwart sophisticated zero-day phishing attacks.",
    "hint": "Bayesian token likelihoods augmented with sender reputation and semantic embeddings.",
    "level": "Basic",
    "codeExample": "# Bayesian Odds: P(Spam|w1..wn) proportional to P(Spam) * prod(P(wi|Spam))"
  },
  {
    "id": 17,
    "question": "What is the role of Object Detection (e.g. YOLO, Faster R-CNN) in smart city surveillance?",
    "shortAnswer": "Simultaneously predicting spatial bounding box coordinates [x, y, w, h] and class labels for multiple pedestrians, vehicles, and hazards in video streams.",
    "explanation": "Unlike simple image classification (which assigns 1 label to the entire image), Object Detection predicts multiple bounding boxes simultaneously: b = (x_center, y_center, width, height, confidence, class_id). This powers traffic flow monitoring and pedestrian safety alerts.",
    "hint": "Simultaneous multi-object localization (bounding boxes) and classification.",
    "level": "Moderate",
    "codeExample": "# YOLO bounding box output format: [x_min, y_min, x_max, y_max, conf, class_id]"
  },
  {
    "id": 18,
    "question": "How is Machine Learning applied in Smart Grids and Energy Load Forecasting?",
    "shortAnswer": "Time-series regression models forecasting hourly electricity grid consumption based on historical load, weather forecasts, and calendar events.",
    "explanation": "Electricity cannot be easily stored in bulk at grid scale. ML models (Prophet, XGBoost, Temporal Fusion Transformers) forecast load curves 24-48 hours ahead, allowing grid operators to schedule renewable solar/wind generation and ramp down fossil thermal plants.",
    "hint": "Short-term time-series load forecasting optimizing power generation dispatch.",
    "level": "Moderate",
    "codeExample": "# Forecast electricity demand in MegaWatts\npredicted_load_mw = tft_model.predict(weather_and_calendar_features)"
  },
  {
    "id": 19,
    "question": "What is Credit Scoring in Retail Lending and how do models ensure regulatory fairness?",
    "shortAnswer": "Predicting probability of loan default P(default | x); fairness constraints prevent models from using protected demographic attributes.",
    "explanation": "Lenders use Logistic Regression, Weight of Evidence (WoE), and monotonic XGBoost models to compute credit risk scores. Financial regulations (such as the Equal Credit Opportunity Act) mandate explainability (e.g., via SHAP values) and prohibit discrimination based on gender, race, or caste.",
    "hint": "Probability of default modeling with regulatory explainability and fairness auditing.",
    "level": "Moderate",
    "codeExample": "# Credit score mapping: Score = 600 - (20 / ln(2)) * ln(odds_of_default)"
  },
  {
    "id": 20,
    "question": "How do Generative Adversarial Networks (GANs) and Diffusion Models generate synthetic photo-realistic images?",
    "shortAnswer": "GANs use a Generator vs Discriminator minimax game; Diffusion models learn to reverse a gradual step-by-step Gaussian noise corruption process.",
    "explanation": "In GANs: min_G max_D V(D, G). In Diffusion Models (DALL-E, Stable Diffusion): a U-Net is trained with MSE loss to predict and subtract added Gaussian noise \u03b5_\u03b8(x_t, t) at timestep t, turning pure static noise into high-fidelity photorealistic imagery.",
    "hint": "Adversarial minimax game vs iterative denoising score matching.",
    "level": "Expert",
    "codeExample": "# Diffusion training objective: loss = mse(predicted_noise, true_noise)"
  },
  {
    "id": 21,
    "question": "What is Machine Translation (e.g. Google Translate) and how did the Transformer revolution transform it?",
    "shortAnswer": "Mapping token sequences from language A to language B; self-attention eliminated sequential RNN bottlenecks, enabling global cross-lingual context capture.",
    "explanation": "Transformer Sequence-to-Sequence models use an Encoder to represent source text and an Autoregressive Decoder with Cross-Attention to generate the target translation. This allows instant parallel training over billions of bilingual sentence pairs.",
    "hint": "Encoder-Decoder cross-attention transforming source language tokens to target tokens.",
    "level": "Moderate",
    "codeExample": "# Cross-Attention: Attention(Q_target, K_source, V_source)"
  },
  {
    "id": 22,
    "question": "How is Machine Learning applied in Cyber Threat Intelligence and Intrusion Detection Systems (IDS)?",
    "shortAnswer": "By classifying network packet flow statistics (packet rates, port scans, payload entropy) to detect DDoS attacks and malware beacons in real time.",
    "explanation": "Network IDS models monitor NetFlow/IPFIX logs. Unsupervised Isolation Forests detect anomalous outbound encrypted beaconing from infected host machines, while supervised classifiers identify known signature patterns of brute-force and SQL injection attacks.",
    "hint": "Real-time network traffic telemetry classification and anomaly detection.",
    "level": "Moderate",
    "codeExample": "# IDS Flag: If packet_rate > threshold and entropy < threshold: alert('DDoS/Scan')"
  },
  {
    "id": 23,
    "question": "What is Knowledge Graph Embedding in search engines and recommendation platforms?",
    "shortAnswer": "Projecting entities (nodes) and relations (edges) into continuous vector spaces \u211d^d such that valid factual triplets satisfy h + r \u2248 t.",
    "explanation": "Models like TransE or RotatE map entities (e.g., 'Rabindranath Tagore', 'Gitanjali') and relations ('wrote') into vectors. If the relation holds, Vector(Rabindranath) + Vector(wrote) \u2248 Vector(Gitanjali), enabling powerful semantic search and question answering.",
    "hint": "Translational triplet embeddings: Head + Relation \u2248 Tail in vector space.",
    "level": "Expert",
    "codeExample": "# TransE loss = max(0, margin + dist(h + r, t) - dist(h' + r, t'))"
  },
  {
    "id": 24,
    "question": "How is Machine Learning utilized in Weather Forecasting and Climate Modeling (e.g. GraphCast)?",
    "shortAnswer": "By using Graph Neural Networks and spatial vision models to predict global atmospheric pressure, temperature, and hurricane trajectories in seconds.",
    "explanation": "Traditional Numerical Weather Prediction (NWP) solves complex Navier-Stokes thermodynamic differential equations on supercomputers over hours. Deep learning models (like Google DeepMind's GraphCast) simulate global atmospheric grids in 60 seconds with higher accuracy.",
    "hint": "Fast spatial graph neural networks outperforming classical supercomputer numerical physics.",
    "level": "Expert",
    "codeExample": "# DeepMind GraphCast: Multiscale icosahedral graph simulating global atmospheric weather"
  },
  {
    "id": 25,
    "question": "What is Biometric Facial Recognition and how does Triplet Loss train face embeddings?",
    "shortAnswer": "Mapping facial crops into a 128D/512D unit sphere where photos of the same person are close and photos of different people are far apart.",
    "explanation": "FaceNet minimizes Triplet Loss: L = max(0, ||f(Anchor) - f(Positive)||^2 - ||f(Anchor) - f(Negative)||^2 + \u03b1). This pulls multiple images of the same person together while pushing different individuals beyond margin \u03b1, enabling 1:N face identification.",
    "hint": "Triplet Loss: Anchor-to-Positive distance minimized, Anchor-to-Negative maximized.",
    "level": "Expert",
    "codeExample": "# Verification: Is Euclidean_Distance(face_emb_1, face_emb_2) < threshold (e.g. 0.6)?"
  },
  {
    "id": 26,
    "question": "How does Machine Learning power Virtual Assistants through Intent Recognition and Slot Filling?",
    "shortAnswer": "Intent Recognition classifies the user's objective (e.g. 'BookFlight'); Slot Filling extracts parameter tokens (e.g. Destination='Kolkata', Date='Tomorrow').",
    "explanation": "Spoken Language Understanding (SLU) systems parse natural user voice/text commands. A joint classification-sequence labeling model outputs both the overall sentence intent category and token-level entity spans to populate API request parameters.",
    "hint": "Sentence-level goal classification paired with token-level argument entity extraction.",
    "level": "Basic",
    "codeExample": "# User: 'Book a train to Barrackpore for tomorrow'\n# Intent: BookTrain | Slots: {destination: 'Barrackpore', date: 'tomorrow'}"
  },
  {
    "id": 27,
    "question": "How is Machine Learning applied in Supply Chain Inventory Optimization?",
    "shortAnswer": "By forecasting SKU-level sales demand and optimizing safety stock levels to prevent stockouts while minimizing warehouse holding costs.",
    "explanation": "Predictive models ingest historical sales, seasonal trends, local holidays, promotions, and supplier lead times to forecast demand curves per retail store, calculating dynamic reorder points that minimize supply chain disruptions.",
    "hint": "SKU-level demand forecasting and dynamic buffer safety stock calculation.",
    "level": "Basic",
    "codeExample": "# Reorder Point = (Average Daily Demand * Lead Time) + Safety Stock"
  },
  {
    "id": 28,
    "question": "What is Document AI / Intelligent Document Processing (IDP)?",
    "shortAnswer": "Extracting structured key-value pairs and tabular data from invoices, tax forms, and bank statements using multimodal Vision-Language models.",
    "explanation": "Models like LayoutLM combine visual 2D token bounding box coordinates with textual embeddings and image pixel maps. This enables automated extraction of fields like 'GSTIN Number', 'Invoice Total', and 'Tax Slabs' from messy scanned receipts.",
    "hint": "Multimodal spatial-visual-text models parsing invoices and financial documents.",
    "level": "Moderate",
    "codeExample": "# LayoutLM embeds: Text Token + 2D Bounding Box [x0, y0, x1, y1] + Image Feature"
  },
  {
    "id": 29,
    "question": "How is Machine Learning used for Automated Code Generation (e.g., GitHub Copilot)?",
    "shortAnswer": "Autoregressive decoder-only LLMs trained on millions of open-source repositories that complete code snippets and generate unit tests from docstrings.",
    "explanation": "Code LLMs (like StarCoder, CodeLlama) tokenize programming syntax into AST-aware token streams. When a developer writes a comment or function signature, the model calculates highest-probability next tokens, autocompleting algorithms and boilerplate.",
    "hint": "Autoregressive code generation conditioned on function signatures and comments.",
    "level": "Basic",
    "codeExample": "# Docstring -> Context Window -> LLM Decoder -> Generated Python Implementation"
  },
  {
    "id": 30,
    "question": "What is Explainable AI (XAI) and why is it mandatory when deploying ML applications in healthcare and banking?",
    "shortAnswer": "Techniques (SHAP, LIME, Integrated Gradients) that explain why a black-box model made a specific prediction, ensuring auditability and trust.",
    "explanation": "In high-stakes domains, a model cannot be a total black box. If a loan is denied or a patient is flagged for emergency surgery, XAI tools compute feature attribution scores (e.g., Shapley values based on cooperative game theory) showing exactly which factors drove the decision.",
    "hint": "Shapley feature attribution explaining individual model predictions for regulatory compliance.",
    "level": "Moderate",
    "codeExample": "import shap\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer.shap_values(X_patient)"
  }
];

export default questions;
