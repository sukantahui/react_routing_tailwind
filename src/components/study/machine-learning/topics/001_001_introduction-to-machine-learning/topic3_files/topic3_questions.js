/**
 * Topic 3: Types of Machine Learning
 * 30 Assessment Questions (Moderate to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore
 */

const questions = [
  {
    id: 1,
    question: "What is the defining characteristic that separates Supervised Learning from Unsupervised Learning?",
    shortAnswer: "Supervised learning requires ground-truth target labels for every training instance; Unsupervised operates on unlabeled feature vectors.",
    explanation: "In Supervised Learning, the training dataset consists of input-output pairs D = {(x_i, y_i)}. In Unsupervised Learning, the dataset contains only inputs D = {x_i}, and the algorithm discovers inherent geometric structures, clusters, or distributions without explicit supervisory signals.",
    hint: "Think about whether a 'teacher' provides correct answer keys during training.",
    level: "Basic",
    codeExample: "# Supervised: model.fit(X_train, y_train)\n# Unsupervised: kmeans.fit(X_unlabeled)"
  },
  {
    id: 2,
    question: "In what two broad categories is Supervised Learning universally divided?",
    shortAnswer: "Regression (continuous targets) and Classification (discrete categorical targets).",
    explanation: "Regression maps input features to continuous numerical values in R (e.g., predicting flat prices in Kolkata in ₹ Lakhs, temperature). Classification maps input features to discrete class categories (e.g., Spam vs Ham, Disease vs Healthy, Grade A/B/C).",
    hint: "Real-valued continuous numbers vs discrete qualitative buckets.",
    level: "Basic",
    codeExample: "# Regression: target = 45.5 (Continuous ₹ Lakhs)\n# Classification: target = 1 ('Spam' - Discrete class)"
  },
  {
    id: 3,
    question: "What is the primary feedback mechanism in Reinforcement Learning?",
    shortAnswer: "Delayed scalar reward and penalty signals received from the environment following executed actions.",
    explanation: "Unlike supervised learning where immediate correct labels are given for every instance, an RL agent takes actions in a dynamic environment and receives evaluative scalar rewards (positive for success, negative for failure) that may be delayed over hundreds of time steps.",
    hint: "Think of an autonomous chess-playing bot that receives a win (+1) reward only at the end of the game.",
    level: "Moderate",
    codeExample: "next_state, reward, done, info = env.step(action)"
  },
  {
    id: 4,
    question: "Under what specific industrial constraint is Semi-Supervised Learning most economically optimal?",
    shortAnswer: "When unannotated data is cheap and abundant, but expert manual labeling is prohibitively expensive or slow.",
    explanation: "In medical pathology (e.g. at Jadavpur hospital), collecting 100,000 raw MRI scans is automated, but paying expert radiologists to annotate each scan is extremely expensive. Semi-supervised learning trains on 1,000 labeled scans while leveraging the geometry of 99,000 unlabeled scans.",
    hint: "Small labeled seed + massive unlabeled pool.",
    level: "Moderate",
    codeExample: "from sklearn.semi_supervised import LabelPropagation\nmodel = LabelPropagation().fit(X_all, y_with_missing)"
  },
  {
    id: 5,
    question: "What are the three core mathematical assumptions required for Semi-Supervised Learning algorithms to succeed?",
    shortAnswer: "The Smoothness Assumption, the Cluster Assumption, and the Manifold Assumption.",
    explanation: "1. Smoothness: Points close in dense feature space share the same label. 2. Cluster: Decision boundaries pass through low-density regions. 3. Manifold: High-dimensional data lies embedded on a lower-dimensional latent manifold.",
    hint: "Geometric and density properties of the data distribution.",
    level: "Expert",
    codeExample: "# If points are connected via dense paths, labels propagate along the manifold."
  },
  {
    id: 6,
    question: "How does Self-Supervised Learning (SSL) generate supervisory signals without human annotators?",
    shortAnswer: "By formulating pretext tasks where a portion of the input data is withheld/masked and predicted from the remaining context.",
    explanation: "Self-supervised learning (the foundation of LLMs like GPT-4 and BERT) masks tokens in a sentence or patches in an image, training the model to predict the missing information using the surrounding context as implicit ground truth.",
    hint: "Predicting the next word in a Wikipedia sentence or masked image patch.",
    level: "Expert",
    codeExample: "# Pretext task in BERT: 'Kolkata is the [MASK] of West Bengal' -> Predict 'capital'"
  },
  {
    id: 7,
    question: "Which of the following is an Unsupervised Learning task?",
    shortAnswer: "Grouping retail customers in Ichapur into behavioral spending clusters using k-Means.",
    explanation: "Customer segmentation groups shoppers by transaction recency, frequency, and monetary spend (RFM) without any pre-existing human-assigned category labels.",
    hint: "No ground-truth target column exists in the dataset.",
    level: "Basic",
    codeExample: "clusters = KMeans(n_clusters=4).fit_predict(customer_rfm_data)"
  },
  {
    id: 8,
    question: "What is the Exploration vs Exploitation trade-off in Reinforcement Learning?",
    shortAnswer: "Balancing the choice between taking known high-reward actions (exploit) vs trying novel actions to discover better long-term rewards (explore).",
    explanation: "An RL agent (e.g. using epsilon-greedy policy) must exploit current knowledge to accumulate rewards while allocating a portion of actions to explore uncharted states, avoiding premature convergence to suboptimal local policies.",
    hint: "Eating at your favorite restaurant (exploit) vs trying a new restaurant (explore).",
    level: "Moderate",
    codeExample: "action = env.action_space.sample() if random.random() < epsilon else np.argmax(Q[state])"
  },
  {
    id: 9,
    question: "In what way does Transductive Semi-Supervised Learning differ from Inductive Semi-Supervised Learning?",
    shortAnswer: "Transductive predicts labels only for the specific unlabeled instances present during training; Inductive learns a general function for future unseen queries.",
    explanation: "Transductive methods (e.g., standard Graph Spectral Label Spreading) compute label assignments for the specific unannotated vertices in the training graph. Inductive methods produce a parametric mapping function h(x) that evaluates any arbitrary future test point.",
    hint: "Fixed closed dataset vs open-world generalized prediction function.",
    level: "Expert",
    codeExample: "# Transductive: Evaluates fixed nodes in graph\n# Inductive: model.predict(new_unseen_vector)"
  },
  {
    id: 10,
    question: "Which algorithm is a classic example of an Unsupervised Dimensionality Reduction technique?",
    shortAnswer: "Principal Component Analysis (PCA).",
    explanation: "PCA calculates the orthogonal eigenvectors of the empirical covariance matrix, projecting high-dimensional data onto the top principal components that capture maximum variance without using target labels.",
    hint: "Maximizes variance projection along orthogonal axes.",
    level: "Basic",
    codeExample: "X_reduced = PCA(n_components=2).fit_transform(X_high_dim)"
  },
  {
    id: 11,
    question: "In a medical diagnostic system, why is predicting the exact probability of diabetes a Supervised Learning task?",
    shortAnswer: "It requires historical patient biometric vectors paired with ground-truth laboratory diabetes diagnosis outcomes.",
    explanation: "Because historical training records contain verified positive/negative diabetes diagnosis outcomes (labels y), the system optimizes parameter weights using supervised logistic loss.",
    hint: "Historical training rows contain a verified target diagnosis column.",
    level: "Basic",
    codeExample: "model = LogisticRegression().fit(biometric_features, diabetes_label)"
  },
  {
    id: 12,
    question: "What is Active Learning and which paradigm does it enhance?",
    shortAnswer: "An interactive supervised/semi-supervised framework where the algorithm queries a human oracle to label only the most informative or uncertain instances.",
    explanation: "Active learning minimizes labeling costs by selecting data points with highest prediction entropy or lowest margin confidence, sending only those high-value samples to human domain experts for annotation.",
    hint: "The model asks the teacher to grade only the hardest questions.",
    level: "Moderate",
    codeExample: "query_idx = np.argmax(entropy(model.predict_proba(unlabeled_pool), axis=1))"
  },
  {
    id: 13,
    question: "What mathematical formulation defines the environment in Reinforcement Learning?",
    shortAnswer: "Markov Decision Process (MDP), formally defined as the 5-tuple (S, A, P, R, gamma).",
    explanation: "An MDP consists of State space S, Action space A, Transition probability distribution P(s'|s, a), Reward function R(s, a), and Discount factor gamma in [0, 1). It satisfies the Markov property where the next state depends only on the current state and action.",
    hint: "The 5-tuple (S, A, P, R, gamma).",
    level: "Expert",
    codeExample: "# MDP: P(s_{t+1} | s_t, a_t) depends only on current s_t and a_t (Markov Property)"
  },
  {
    id: 14,
    question: "Why is anomaly detection for server telemetry in Kolkata IT hubs considered primarily Unsupervised?",
    shortAnswer: "Cyber attacks and hardware breakdowns are rare, novel, and lack historical exhaustively labeled training examples.",
    explanation: "Because zero-day cyber exploits and rare hardware glitches have never been seen before, there are no historical training labels for them. Unsupervised density models (Isolation Forest, One-Class SVM) fit the distribution of 'normal' traffic and flag low-density deviations.",
    hint: "You cannot label attacks that have never occurred before.",
    level: "Moderate",
    codeExample: "anomaly_flags = IsolationForest(contamination=0.01).fit_predict(server_metrics)"
  },
  {
    id: 15,
    question: "In Supervised Learning, what is the mathematical purpose of the Loss Function L(h(x), y)?",
    shortAnswer: "To compute a scalar penalty measuring the disagreement between the model prediction h(x) and ground truth y.",
    explanation: "Optimization algorithms (like Stochastic Gradient Descent) compute the gradient of the loss function with respect to model parameters dw = grad_w L(h(x), y) to iteratively guide parameter updates in the direction of steepest descent.",
    hint: "Provides the quantitative error gradient for backpropagation.",
    level: "Moderate",
    codeExample: "loss = -np.mean(y * np.log(y_hat) + (1 - y) * np.log(1 - y_hat)) # Binary Cross Entropy"
  },
  {
    id: 16,
    question: "What is Multi-Task Learning in modern Supervised architectures?",
    shortAnswer: "Training a single unified model with shared representation layers to simultaneously predict multiple distinct targets.",
    explanation: "Multi-task learning shares lower-level feature representations (e.g. convolutional or transformer backbone) while branching into separate task-specific prediction heads (e.g. simultaneously predicting vehicle bounding boxes and road lane boundaries).",
    hint: "One shared neural backbone with multiple specialized output heads.",
    level: "Expert",
    codeExample: "# Shared Backbone -> Head 1 (Object Detection), Head 2 (Depth Estimation)"
  },
  {
    id: 17,
    question: "Which learning paradigm is used by ChatGPT during its initial pre-training phase?",
    shortAnswer: "Self-Supervised Learning (Causal Language Modeling / Next-Token Prediction).",
    explanation: "During foundation pre-training, LLMs consume hundreds of billions of unannotated internet text tokens, self-supervising by predicting the next token in the sequence given all preceding tokens.",
    hint: "Predicting the next word over vast corpora of books and web pages.",
    level: "Basic",
    codeExample: "loss = CrossEntropyLoss(predicted_next_token_logits, actual_next_token_id)"
  },
  {
    id: 18,
    question: "What is Reinforcement Learning from Human Feedback (RLHF)?",
    shortAnswer: "Fine-tuning an LLM using a learned reward model trained on human preference rankings to align model responses with human values.",
    explanation: "RLHF aligns generative models by: 1. Training a reward model on human comparisons (Response A > Response B). 2. Optimizing the language model policy using PPO reinforcement learning against that reward model.",
    hint: "Aligning AI policies using reward models trained on human preferences.",
    level: "Expert",
    codeExample: "# PPO objective: Maximize Reward(response) - beta * KL_Divergence(policy, reference)"
  },
  {
    id: 19,
    question: "What is Pseudo-Labeling in Semi-Supervised Learning pipelines?",
    shortAnswer: "Using a model trained on labeled data to predict labels for unlabeled points, then incorporating confident predictions back into training.",
    explanation: "In self-training pseudo-labeling, the initial model predicts class probabilities for unannotated data. Points where max P(y|x) exceeds a high threshold (e.g. >= 0.95) are assigned artificial pseudo-labels and added to the training set for subsequent epochs.",
    hint: "Converting high-confidence model guesses into synthetic training labels.",
    level: "Moderate",
    codeExample: "pseudo_labels = (model.predict_proba(X_unlabeled) > 0.95).astype(int)"
  },
  {
    id: 20,
    question: "Why is association rule mining (e.g. Apriori algorithm) considered an Unsupervised technique?",
    shortAnswer: "It discovers co-occurrence item patterns in market baskets without pre-defined class labels or target variables.",
    explanation: "Market basket analysis examines thousands of retail receipts (e.g. at an Ichapur grocery store) to calculate Support, Confidence, and Lift for rules like {Bread, Butter} -> {Milk} without requiring supervisory target labels.",
    hint: "Finding which items are frequently bought together.",
    level: "Basic",
    codeExample: "rules = association_rules(frequent_itemsets, metric='lift', min_threshold=1.5)"
  },
  {
    id: 21,
    question: "What is the Discount Factor gamma in Reinforcement Learning and why is it constrained to [0, 1)?",
    shortAnswer: "It models the present value of future rewards, ensuring mathematical convergence of infinite-horizon returns.",
    explanation: "A discount factor gamma in [0, 1) prioritizes immediate rewards over distant future rewards and mathematically guarantees that the infinite sum of cumulative rewards G_t = sum gamma^k r_{t+k+1} converges to a finite value.",
    hint: "Time value of money: ₹100 today is worth more than ₹100 next year.",
    level: "Expert",
    codeExample: "discounted_return = reward + gamma * max_Q_next_state"
  },
  {
    id: 22,
    question: "In what scenario is Supervised Learning vulnerable to Concept Drift while Unsupervised clustering is more robust?",
    shortAnswer: "When the conditional distribution P(Y|X) shifts due to economic changes, but the underlying data geometric clusters remain intact.",
    explanation: "If loan default rates double due to a macroeconomic crisis (shifting P(Y|X)), a supervised classifier calibrated to old default probabilities will fail. Unsupervised clustering continues to accurately group high-income vs low-income clusters according to data geometry.",
    hint: "Target conditional shift vs intrinsic feature geometric clustering.",
    level: "Expert",
    codeExample: "# Supervised probability calibration fails under P(Y|X) shift; k-means clusters persist."
  },
  {
    id: 23,
    question: "What is Weakly Supervised Learning?",
    shortAnswer: "Training models using noisy, imprecise, or coarse-grained supervisory labels (e.g. heuristic rules, hashtag labels).",
    explanation: "Weak supervision (implemented in frameworks like Snorkel) uses programmatic labeling functions, distant supervision, or image-level tags (e.g. 'contains dog') to train fine-grained pixel segmentation models without exact bounding boxes.",
    hint: "Programmatic noisy labels generated by heuristic rules.",
    level: "Moderate",
    codeExample: "label_model = SnorkelLabelModel().fit(noisy_heuristic_label_matrix)"
  },
  {
    id: 24,
    question: "Why is Contrastive Learning in Computer Vision considered Self-Supervised?",
    shortAnswer: "It trains representations by pulling augmented views of the same image together while pushing different images apart.",
    explanation: "Contrastive learning (e.g. SimCLR) applies random crops, rotations, and color jitter to an image x, treating the pair (x_aug1, x_aug2) as positive, while treating all other batch images as negatives, optimizing the InfoNCE loss without human annotations.",
    hint: "Two augmentations of the same image form a positive pair automatically.",
    level: "Expert",
    codeExample: "loss = InfoNCELoss(query_projection, positive_key_projection, negative_keys)"
  },
  {
    id: 25,
    question: "What is the primary evaluation metric used in Unsupervised Clustering when ground truth labels are completely unavailable?",
    shortAnswer: "Silhouette Coefficient and Davies-Bouldin Index.",
    explanation: "Without true labels, clustering quality is evaluated via intrinsic geometric compactness and separation: the Silhouette Score measures how close each point is to points in its own cluster versus points in neighboring clusters.",
    hint: "Measures intra-cluster tightness vs inter-cluster separation.",
    level: "Moderate",
    codeExample: "score = silhouette_score(X, cluster_assignments)"
  },
  {
    id: 26,
    question: "In what practical industry application is Reinforcement Learning currently preferred over Supervised Learning?",
    shortAnswer: "Real-time robotics joint torque control, dynamic stock trading execution, and automated game playing.",
    explanation: "In robotics and sequential game control (e.g., drone navigation in Jadavpur), there is no static training dataset of 'correct' joint torques for every possible wind gust. The agent must explore and optimize actions dynamically through trial and error.",
    hint: "Continuous dynamic feedback and sequential state-action trajectories.",
    level: "Moderate",
    codeExample: "action = DDPGAgent.select_action(current_joint_angles)"
  },
  {
    id: 27,
    question: "What is Zero-Shot Supervised Classification via Foundation Models?",
    shortAnswer: "Classifying images or text into classes that were never explicitly presented as labeled training categories during pre-training.",
    explanation: "Using multimodal embedding models (like CLIP), text descriptions of candidate classes (e.g., 'a photo of an auto-rickshaw in Barrackpore') are embedded into the same vector space as query images. The image is assigned to the class with highest cosine similarity.",
    hint: "Cosine similarity between image embedding and natural language text prompt embedding.",
    level: "Expert",
    codeExample: "similarity = torch.cosine_similarity(image_features, text_features)"
  },
  {
    id: 28,
    question: "Why does Semi-Supervised Learning degrade if the 'Cluster Assumption' is violated?",
    shortAnswer: "Decision boundaries may slice directly through high-density clusters, propagating incorrect labels across the entire class.",
    explanation: "Semi-supervised learning assumes that high-density regions belong to a single class. If two different classes overlap densely in feature space, label propagation will flood across the boundary and mislabel the entire cluster.",
    hint: "Label spreading relies on low-density separation valleys between classes.",
    level: "Expert",
    codeExample: "# Violation: Two different classes occupy the same dense Gaussian ball."
  },
  {
    id: 29,
    question: "In a real-world enterprise ML deployment, how do companies combine multiple paradigms?",
    shortAnswer: "Self-supervised pre-training on mass data -> Supervised fine-tuning on domain data -> Reinforcement Learning alignment.",
    explanation: "Modern AI architectures (like LLMs, autonomous vehicles, and medical perception systems) execute a multi-stage funnel: 1. Self-supervised pre-training on raw data. 2. Supervised fine-tuning (SFT) on clean labeled data. 3. RLHF policy refinement for safety and business goals.",
    hint: "The three-stage modern AI pipeline: Pretrain (SSL) -> Fine-tune (Supervised) -> Align (RL).",
    level: "Moderate",
    codeExample: "# Stage 1: Pretrain on 1TB text -> Stage 2: SFT on 50k QA pairs -> Stage 3: PPO Alignment"
  },
  {
    id: 30,
    question: "What is the ultimate rule of thumb for selecting the correct Machine Learning paradigm for an enterprise project?",
    shortAnswer: "Map your available data and feedback structure: If labels exist -> Supervised; If no labels -> Unsupervised; If sparse labels -> Semi-Supervised; If sequential actions & rewards -> Reinforcement Learning.",
    explanation: "The paradigm choice is dictated strictly by the problem physics and dataset annotation reality: Labeled pairs mandate Supervised Learning; Latent structure discovery mandates Unsupervised Learning; Costly labeling mandates Semi-Supervised; Dynamic action-reward loops mandate Reinforcement Learning.",
    hint: "Let the data annotation reality and feedback structure dictate the paradigm.",
    level: "Basic",
    codeExample: "# Data Audit Checklist: Labels present? -> Supervised | Unlabeled? -> Unsupervised | Action-reward? -> RL"
  }
];

export default questions;
