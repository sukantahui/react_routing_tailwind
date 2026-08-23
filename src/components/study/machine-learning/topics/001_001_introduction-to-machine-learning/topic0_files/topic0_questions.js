/**
 * Topic 0: Meaning and Scope of Machine Learning
 * 30 Moderate to Expert Multiple-Choice and Conceptual Assessment Questions
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore
 */

const questions = [
  {
    id: 1,
    question: "According to Arthur Samuel's classical definition (1959), what is the foundational premise of Machine Learning?",
    shortAnswer: "Giving computers the ability to learn without being explicitly programmed.",
    explanation: "Arthur Samuel defined Machine Learning as the subfield of computer science that gives computers the ability to learn from data and empirical interactions without requiring humans to explicitly hardcode deterministic rules for every scenario.",
    hint: "Think about Samuel's checkers playing program that improved itself through self-play.",
    level: "Basic",
    codeExample: "# Traditional: if x > 10: return y\n# Machine Learning: model.fit(X_train, y_train)"
  },
  {
    id: 2,
    question: "In Tom Mitchell's formal definition (1997), what do the three parameters T, P, and E represent?",
    shortAnswer: "Task (T), Performance Metric (P), and Experience (E).",
    explanation: "Tom Mitchell formulated that a computer program is said to learn from Experience (E) with respect to some class of Tasks (T) and Performance measure (P), if its performance at tasks in T, as measured by P, improves with experience E.",
    hint: "Think of an autonomous car: driving on roads (T), collision-free mileage (P), and driving logs (E).",
    level: "Basic",
    codeExample: "# Mitchell Formulation:\n# T: Spam Classification\n# P: F1-Score / Accuracy\n# E: 50,000 labeled emails"
  },
  {
    id: 3,
    question: "How does the fundamental input-output flow of Traditional Programming differ from that of Machine Learning?",
    shortAnswer: "Traditional: Data + Rules -> Answers; Machine Learning: Data + Answers -> Model (Rules).",
    explanation: "Traditional software engineering follows deductive logic where human developers supply data and explicit logical rules to produce outputs. Machine learning uses inductive logic where algorithms consume data and known historical outputs to learn the underlying predictive hypothesis/model.",
    hint: "Recall which paradigm outputs a mathematical function h(x) rather than raw computational results.",
    level: "Moderate",
    codeExample: "# Traditional Paradigm:\nanswers = [calculate_tax(income) for income in data]\n\n# ML Paradigm:\nmodel = LinearRegression().fit(X_data, y_targets)"
  },
  {
    id: 4,
    question: "Which of the following scenarios is LEAST suitable for applying Machine Learning?",
    shortAnswer: "Calculating exact Goods and Services Tax (GST) liability from statutory tax slabs.",
    explanation: "GST computation is strictly deterministic and governed by clear statutory legal formulas. Applying statistical or probabilistic machine learning models to exact tax calculations would introduce unacceptable approximation errors.",
    hint: "Look for tasks that have a 100% deterministic mathematical formula with zero ambiguity.",
    level: "Moderate",
    codeExample: "# Deterministic computation -> Use Rule Engine\ngst_amount = invoice_val * 0.18"
  },
  {
    id: 5,
    question: "In the context of Machine Learning, what is 'Generalization'?",
    shortAnswer: "The model's ability to accurately predict outputs on previously unseen test data.",
    explanation: "Generalization represents a model's capacity to perform well on new, unseen examples drawn from the same underlying probability distribution as the training data, rather than merely memorizing training points.",
    hint: "Contrast memorization of past instances with predicting future unknown events.",
    level: "Moderate",
    codeExample: "test_accuracy = model.score(X_test, y_test) # Measures generalization"
  },
  {
    id: 6,
    question: "What constitutes the Experience (E) component when training a credit card fraud detection system in Kolkata?",
    shortAnswer: "Historical database of labeled transaction records (Fraudulent vs Legitimate).",
    explanation: "Experience (E) refers to the training corpus of historical observations. In fraud detection, E is the tabular dataset of timestamped transactions with customer metadata and audited fraud outcome flags.",
    hint: "Experience is the data fed into the training pipeline.",
    level: "Moderate",
    codeExample: "E = pd.read_csv('kolkata_banking_transactions.csv')"
  },
  {
    id: 7,
    question: "What is Empirical Risk Minimization (ERM) in statistical learning theory?",
    shortAnswer: "Optimizing model parameters to minimize average loss over the training dataset.",
    explanation: "Empirical Risk Minimization seeks to find parameter vector w that minimizes the average empirical loss (1/N) * sum L(h(x_i), y_i) computed over the N observed training samples.",
    hint: "Focus on the term 'Empirical' meaning observed training samples.",
    level: "Expert",
    codeExample: "loss = (1/N) * np.sum((y_true - y_pred)**2)"
  },
  {
    id: 8,
    question: "Why does a model with zero training error often fail in production deployment?",
    shortAnswer: "Overfitting: the model memorized noise and training idiosyncrasies rather than true patterns.",
    explanation: "When a high-capacity model achieves 0% training error, it typically overfits by fitting data noise and specific outliers. Consequently, it loses the ability to generalize to novel inputs encountered in production.",
    hint: "High variance leads to poor performance on fresh validation splits.",
    level: "Moderate",
    codeExample: "# High degree polynomial overfits training points\npoly = PolynomialFeatures(degree=25)"
  },
  {
    id: 9,
    question: "In Supervised Learning, how does Regression differ from Classification?",
    shortAnswer: "Regression predicts continuous numerical quantities; Classification predicts discrete categorical classes.",
    explanation: "Regression maps input vectors to continuous real numbers y in R (e.g., house price in ₹ Lakhs, temperature), whereas classification assigns inputs to discrete class labels y in {0, 1, ..., K-1} (e.g., Spam vs Ham, Disease vs Healthy).",
    hint: "Continuous spectrum vs distinct discrete buckets.",
    level: "Basic",
    codeExample: "# Regression: price = 45.80 (₹ Lakhs)\n# Classification: label = 'Spam' (0 or 1)"
  },
  {
    id: 10,
    question: "What is the primary characteristic of Unsupervised Learning?",
    shortAnswer: "The training dataset contains feature vectors without corresponding ground-truth target labels.",
    explanation: "Unsupervised learning discovers latent geometric, probabilistic, or hierarchical structures within unlabeled datasets D = {x_1, x_2, ..., x_N}, such as customer clusters or low-dimensional manifolds.",
    hint: "There is no supervisor or teacher providing correct answers during training.",
    level: "Basic",
    codeExample: "clusters = KMeans(n_clusters=3).fit_predict(X_unlabeled)"
  },
  {
    id: 11,
    question: "What is Inductive Bias in Machine Learning algorithms?",
    shortAnswer: "The set of prior assumptions an algorithm uses to predict outputs on unseen inputs.",
    explanation: "Inductive bias encompasses all structural assumptions built into a learning algorithm (e.g., linearity in Linear Regression, orthogonality of splits in Decision Trees, spatial locality in CNNs) that allow it to generalize beyond observed training points.",
    hint: "Without prior assumptions, learning from finite data is mathematically impossible (No Free Lunch theorem).",
    level: "Expert",
    codeExample: "# Linear Regression assumes y = w^T x + b (linear relationship bias)"
  },
  {
    id: 12,
    question: "In Tom Mitchell's framework for an autonomous medical diagnosis system, what is the Task (T)?",
    shortAnswer: "Diagnosing patient pathology from clinical markers and radiological images.",
    explanation: "The Task (T) is the functional execution performed by the program: mapping patient symptoms, lab values, and MRI scans into an accurate disease classification.",
    hint: "What action is the software performing?",
    level: "Moderate",
    codeExample: "T = 'Predict presence of diabetic retinopathy (0 or 1)'"
  },
  {
    id: 13,
    question: "What is the role of the loss function L(y_hat, y) in a Machine Learning training loop?",
    shortAnswer: "To quantify the mathematical penalty or discrepancy between predicted and actual values.",
    explanation: "A loss function provides a scalar measure of error for an individual prediction. Optimization algorithms (like gradient descent) use the loss gradient to iteratively update model parameters.",
    hint: "It acts as a feedback signal guiding parameter weight adjustments.",
    level: "Moderate",
    codeExample: "mse_loss = (y_pred - y_true) ** 2"
  },
  {
    id: 14,
    question: "Which learning paradigm is governed by an agent interacting with an environment through States, Actions, and Rewards?",
    shortAnswer: "Reinforcement Learning (RL).",
    explanation: "Reinforcement Learning solves sequential decision-making problems formulated as Markov Decision Processes (MDPs), where an autonomous agent takes actions in an environment to maximize cumulative long-term rewards.",
    hint: "Think of chess bots, robotics, and self-driving navigation systems.",
    level: "Basic",
    codeExample: "next_state, reward, done, _ = env.step(action)"
  },
  {
    id: 15,
    question: "What does the No Free Lunch (NFL) Theorem state in Machine Learning?",
    shortAnswer: "No single machine learning algorithm outperforms all others when averaged across all possible data distributions.",
    explanation: "Formulated by Wolpert & Macready (1997), the NFL theorem proves that if an algorithm performs well on a particular class of problems, it must necessarily perform worse on the set of all remaining problems.",
    hint: "There is no universally 'best' model; model selection depends entirely on domain characteristics.",
    level: "Expert",
    codeExample: "# Linear models beat Neural Nets on small tabular data; CNNs beat linear models on images."
  },
  {
    id: 16,
    question: "In a real-estate price prediction model for Barrackpore, what represents a 'Feature'?",
    shortAnswer: "An individual measurable property of a property (e.g., carpet area in sq.ft, floor number, distance to station).",
    explanation: "A feature is an explanatory variable or quantitative attribute denoted x_j in a feature vector x = [x_1, x_2, ..., x_d] that describes a specific characteristic of the instance.",
    hint: "Columns in a structured tabular dataset representing explanatory variables.",
    level: "Basic",
    codeExample: "features = ['area_sqft', 'bedrooms', 'distance_station_km']"
  },
  {
    id: 17,
    question: "What is the difference between a Model Parameter and a Hyperparameter?",
    shortAnswer: "Parameters are learned from data during training; Hyperparameters are set prior to training by the engineer.",
    explanation: "Parameters (e.g., weights w and bias b) are optimized internally by gradient descent during training. Hyperparameters (e.g., learning rate alpha, number of tree estimators, regularization strength lambda) configure the learning process itself and must be tuned externally.",
    hint: "Weights inside an equation vs learning rate controlling the step size.",
    level: "Moderate",
    codeExample: "# Hyperparameter: lr=0.01, max_depth=5\n# Parameter: model.coef_, model.intercept_"
  },
  {
    id: 18,
    question: "What is Semi-Supervised Learning and when is it most economically advantageous?",
    shortAnswer: "Combining a small amount of labeled data with a large amount of unlabeled data when labeling is costly.",
    explanation: "In many real-world applications (like medical image pathology or speech recognition), obtaining raw data is cheap, but expert annotation is expensive. Semi-supervised learning leverages unlabeled data geometry to boost classification performance.",
    hint: "Used when hiring domain experts to label millions of rows is cost-prohibitive.",
    level: "Moderate",
    codeExample: "from sklearn.semi_supervised import LabelSpreading"
  },
  {
    id: 19,
    question: "Why is feature scaling essential for distance-based ML algorithms like k-Nearest Neighbors (KNN)?",
    shortAnswer: "Features with large numerical ranges will dominate Euclidean distance calculations over smaller features.",
    explanation: "If one feature represents income in ₹ (e.g., ₹ 50,000 to ₹ 2,00,000) and another represents age (20 to 60), unscaled Euclidean distance will be almost 100% driven by income, completely ignoring the age dimension.",
    hint: "Distance metrics compute sqrt(sum (x_i - y_i)^2).",
    level: "Moderate",
    codeExample: "X_scaled = StandardScaler().fit_transform(X_raw)"
  },
  {
    id: 20,
    question: "What is the primary role of the Validation Set in a Machine Learning workflow?",
    shortAnswer: "To tune hyperparameters and evaluate model generalization before final testing.",
    explanation: "The validation set is used to compare different model architectures, select optimal hyperparameters, and detect overfitting during training without contaminating the pristine final Test set.",
    hint: "It guides model tuning decisions during the development phase.",
    level: "Moderate",
    codeExample: "X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.2)"
  },
  {
    id: 21,
    question: "How does Self-Supervised Learning generate training labels from raw data?",
    shortAnswer: "By creating pretext tasks where part of the input data is masked and predicted from the remaining context.",
    explanation: "Self-supervised learning (fundamental to modern LLMs and foundation vision models) automatically constructs supervisory signals from raw unannotated data, such as predicting masked words (BERT) or next tokens (GPT).",
    hint: "Think of language modeling where the next word in a sentence serves as the target label.",
    level: "Expert",
    codeExample: "# Pretext task: Predict missing patch in image or masked word in sentence"
  },
  {
    id: 22,
    question: "What is Data Leakage in a Machine Learning pipeline?",
    shortAnswer: "When information from outside the training dataset (e.g., test split) contaminates the model during training.",
    explanation: "Data leakage occurs when features containing future information or target indicators that will not be available during real-time inference are inadvertently included during training, leading to unrealistically optimistic validation metrics.",
    hint: "Fitting a standard scaler on the entire dataset before splitting causes data leakage.",
    level: "Moderate",
    codeExample: "# LEAKAGE: scaler.fit(X_all)\n# CORRECT: scaler.fit(X_train); scaler.transform(X_test)"
  },
  {
    id: 23,
    question: "In Tom Mitchell's framework, what constitutes a valid Performance Metric (P) for an autonomous vehicle?",
    shortAnswer: "Average disengagement-free miles driven and rate of traffic violations per 1,000 km.",
    explanation: "Performance measures must be mathematically rigorous, objective, and directly evaluate the quality of Task execution. Disengagement rate and accident rate quantify autonomous driving safety.",
    hint: "Must be a measurable quantitative scalar evaluating task success.",
    level: "Moderate",
    codeExample: "P = (total_miles_without_human_intervention / total_miles) * 100"
  },
  {
    id: 24,
    question: "What is the curse of dimensionality in Machine Learning?",
    shortAnswer: "As the number of features increases, the feature space volume grows exponentially, making data points sparse.",
    explanation: "In high-dimensional spaces (e.g., thousands of features), data points become exponentially isolated from one another. Distance metrics lose discriminatory power, and exponentially more training samples are required to maintain statistical density.",
    hint: "Space volume grows as O(2^d) with dimension d.",
    level: "Expert",
    codeExample: "# PCA reduces dimensionality to counter sparsity\nX_pca = PCA(n_components=10).fit_transform(X_high_dim)"
  },
  {
    id: 25,
    question: "What distinguishes Transductive Learning from Inductive Learning?",
    shortAnswer: "Inductive learns a general hypothesis function for any future input; Transductive predicts labels only for specific given unlabeled points.",
    explanation: "Inductive learning infers a general mapping function h: X -> Y capable of evaluating any arbitrary unseen query. Transductive learning (e.g., standard Graph Neural Label Propagation) solves directly for the given unlabeled test nodes without formulating a global hypothesis.",
    hint: "Global mapping rule vs specific point-to-point label propagation.",
    level: "Expert",
    codeExample: "# Inductive: LinearRegression().predict(any_new_x)\n# Transductive: Graph label propagation on fixed graph"
  },
  {
    id: 26,
    question: "Why is accuracy a misleading performance metric for severely imbalanced datasets (e.g., 99.8% normal transactions, 0.2% fraud)?",
    shortAnswer: "A naive dummy classifier predicting 'Normal' 100% of the time achieves 99.8% accuracy while detecting zero fraud.",
    explanation: "In imbalanced distributions, overall accuracy is dominated by the majority class. Precision, Recall, F1-Score, and PR-AUC must be used instead to evaluate minority class detection performance.",
    hint: "Think of what happens if a doctor diagnoses every patient as healthy.",
    level: "Moderate",
    codeExample: "f1 = f1_score(y_true, y_pred, pos_label=1)"
  },
  {
    id: 27,
    question: "What is Concept Drift in production Machine Learning systems?",
    shortAnswer: "The statistical properties of the target variable and feature relationships change over time in the real world.",
    explanation: "Concept drift occurs when the mapping P(Y|X) shifts due to changes in consumer behavior, macroeconomic events, or adversarial tactics, causing a previously high-performing model to degrade over time.",
    hint: "Think of e-commerce purchasing patterns shifting dramatically before vs after a pandemic.",
    level: "Expert",
    codeExample: "# Model trained on 2019 data fails on 2024 economic conditions due to concept drift."
  },
  {
    id: 28,
    question: "Which of the following is an example of an unsupervised anomaly detection task?",
    shortAnswer: "Flagging rare, unexpected server telemetry spikes that deviate from historical normal baselines.",
    explanation: "Unsupervised anomaly detection algorithms (like Isolation Forest or Local Outlier Factor) fit probability density estimators on unlabeled normal logs and identify rare outliers that fall into low-density regions.",
    hint: "No historical labels of 'attack' vs 'normal' are required.",
    level: "Moderate",
    codeExample: "anomaly_scores = IsolationForest().fit_predict(server_logs)"
  },
  {
    id: 29,
    question: "What is the primary role of Regularization (such as L1 Lasso or L2 Ridge) in machine learning models?",
    shortAnswer: "To penalize excessive model complexity and prevent overfitting by constraining parameter magnitudes.",
    explanation: "Regularization augments the loss function with a complexity penalty term lambda * Omega(w) (such as sum |w_i| or sum w_i^2). This prevents weights from exploding to fit training noise, enforcing Occam's Razor.",
    hint: "Adds a penalty for large weights to encourage simpler, smoother decision surfaces.",
    level: "Moderate",
    codeExample: "loss_total = mse_loss + alpha * np.sum(weights ** 2) # L2 Ridge Penalty"
  },
  {
    id: 30,
    question: "In end-to-end Machine Learning systems, what does MLOps encompass?",
    shortAnswer: "The engineering practices that automate the deployment, monitoring, testing, and lifecycle management of ML models in production.",
    explanation: "MLOps (Machine Learning Operations) unites data engineering, machine learning, and DevOps practices to ensure reliable continuous integration, continuous deployment (CI/CD), feature store management, data versioning, drift monitoring, and automated retraining in production enterprise environments.",
    hint: "DevOps tailored specifically for machine learning models and data pipelines.",
    level: "Expert",
    codeExample: "# MLOps Pipeline: Data Ingestion -> Automated Retraining -> Model Registry -> Canary Deployment -> Drift Alert"
  }
];

export default questions;
