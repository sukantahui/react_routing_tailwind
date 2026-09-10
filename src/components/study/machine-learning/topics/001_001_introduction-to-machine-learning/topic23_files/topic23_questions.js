/**
 * Topic 23: Downloadable Examination Ready Study Note & Complete Definitions Handbook
 * Assessment & Examination Review Questions
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal
 */

const questions = [
  {
    id: 1,
    question: "State Tom Mitchell's formal engineering definition of Machine Learning and explain the significance of the tuple <T, P, E>.",
    shortAnswer: "A program learns from Experience E with respect to Task T and Performance P if its performance at T, measured by P, improves with E.",
    explanation: "Mitchell (1997) formalizes ML as an engineering discipline. T is the operational objective (e.g. classification), P is the quantitative objective metric (e.g. F1-score or RMSE), and E is historical sample data or environment interaction.",
    hint: "Think about Task, Performance Measure, and Experience.",
    level: "Basic",
    codeExample: "# Mitchell Tuple Representation\n# T = Email classification (Spam/Ham)\n# P = Precision and Recall on validation fold\n# E = 50,000 historical labeled emails"
  },
  {
    id: 2,
    question: "How does the inductive reasoning in Machine Learning fundamentally differ from deductive reasoning in Traditional Programming?",
    shortAnswer: "Traditional programming uses deductive logic (General Rules + Data -> Answers), while ML uses inductive learning (Data + Answers -> Generalized Rules).",
    explanation: "Traditional systems rely on human experts anticipating all edge cases into deterministic if-else rules. ML algorithms generalize from empirical observations to approximate the underlying generator function.",
    hint: "Deductive goes from rules to outcomes; Inductive goes from data observations to general models.",
    level: "Basic",
    codeExample: "# Traditional: output = rule(input)\n# Machine Learning: rule = fit(inputs, outputs)"
  },
  {
    id: 3,
    question: "Why does the curse of dimensionality make rule-based programming fail for computer vision tasks like handwritten digit recognition?",
    shortAnswer: "A 28x28 grayscale image has 784 dimensions, yielding 256^784 possible pixel states, making manual exhaustive rule drafting mathematically intractable.",
    explanation: "Due to combinatorial explosion and immense visual variance (slant, stroke width, rotations), humans cannot hardcode deterministic conditional rules for every pixel configuration.",
    hint: "Calculate 28 x 28 = 784 dimensions and consider pixel brightness permutations.",
    level: "Intermediate",
    codeExample: "input_dim = 28 * 28  # 784 features\n# Combinatorial states: 256**784"
  },
  {
    id: 4,
    question: "Compare Supervised Learning, Unsupervised Learning, Semi-Supervised Learning, and Reinforcement Learning across input data and feedback signals.",
    shortAnswer: "Supervised: (X, y) with explicit ground truth; Unsupervised: X with no labels; Semi-Supervised: small (X_L, y_L) + vast X_U; RL: Agent in environment receiving scalar rewards R.",
    explanation: "The 4 paradigms differ by the nature of supervision available during optimization: prescriptive labels (Supervised), latent geometric structures (Unsupervised), manifold propagation (Semi-Supervised), or evaluative rewards (Reinforcement).",
    hint: "Supervised has y; Unsupervised has no y; Semi-supervised has partial y; RL has rewards.",
    level: "Intermediate",
    codeExample: "# Supervised: fit(X, y)\n# Unsupervised: fit(X)\n# Semi-Supervised: fit(X_labeled, y_labeled, X_unlabeled)\n# RL: step(action) -> next_state, reward, done"
  },
  {
    id: 5,
    question: "Write the mathematical formula for Mean Squared Error (MSE) and explain why it is sensitive to extreme outliers.",
    shortAnswer: "MSE = (1/N) * sum_{i=1}^N (y_i - y_hat_i)^2. The quadratic squaring term disproportionately penalizes large residuals.",
    explanation: "Because the error difference is squared, an outlier with a residual of 10 adds 100 to the loss, whereas a residual of 2 adds only 4. This pulls the regression hyperplane aggressively toward rogue points.",
    hint: "Look at the power of 2 in (y - y_hat)^2.",
    level: "Intermediate",
    codeExample: "import numpy as np\nmse = np.mean((y_true - y_pred) ** 2)"
  },
  {
    id: 6,
    question: "Why is Binary Cross-Entropy preferred over MSE when training Logistic Regression binary classifiers?",
    shortAnswer: "MSE combined with Sigmoid results in a non-convex loss surface with multiple bad local minima, whereas Binary Cross-Entropy is strictly convex.",
    explanation: "Binary Cross-Entropy (L_BCE = -[y*ln(p) + (1-y)*ln(1-p)]) guarantees a unique global minimum when paired with logistic sigmoid activations, ensuring fast and robust gradient descent convergence without gradient vanishing near extreme probabilities.",
    hint: "Think about convexity and gradient vanishing of sigmoid with MSE.",
    level: "Expert",
    codeExample: "# Binary Cross-Entropy Loss\nloss = -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))"
  },
  {
    id: 7,
    question: "State the 3 core geometric assumptions of Semi-Supervised Learning.",
    shortAnswer: "1. Smoothness Assumption, 2. Cluster Assumption, 3. Low-Density Separation Assumption.",
    explanation: "1. Smoothness: nearby points in high density have identical labels. 2. Cluster: points within the same cluster share classes. 3. Low-Density: decision boundaries must pass through sparse, low-density regions.",
    hint: "Smoothness, Cluster, and Low-Density separation.",
    level: "Expert",
    codeExample: "# Semi-Supervised Label Propagation Graph Weight\nW_ij = np.exp(-np.linalg.norm(x_i - x_j)**2 / (2 * sigma**2))"
  },
  {
    id: 8,
    question: "What is the Silhouette Coefficient in Clustering, and how are its score ranges (-1.0 to +1.0) interpreted?",
    shortAnswer: "s(i) = (b(i) - a(i)) / max(a(i), b(i)). +1 means dense and well-separated, 0 means overlapping border, -1 means assigned to wrong cluster.",
    explanation: "a(i) is the mean intra-cluster distance to points in the same cluster; b(i) is the mean nearest-cluster distance. High values (>0.5) confirm strong, well-isolated cluster quality.",
    hint: "b is distance to closest other cluster, a is internal cluster distance.",
    level: "Intermediate",
    codeExample: "from sklearn.metrics import silhouette_score\nscore = silhouette_score(X, cluster_labels)"
  },
  {
    id: 9,
    question: "Define Data Leakage in a Machine Learning workflow and give a concrete real-world example.",
    shortAnswer: "Data leakage occurs when information from outside the training dataset (such as test or validation data) is accidentally used to fit the model.",
    explanation: "Example: calculating the global mean of a feature across the entire dataset to impute missing values before splitting into train/test sets. The model indirectly learns test distribution parameters, artificially inflating test scores while failing in production.",
    hint: "Think about feature scaling or target encoding performed before dataset splitting.",
    level: "Intermediate",
    codeExample: "# WRONG (Leakage):\n# scaler.fit(X_all); X_train, X_test = split(X_all)\n# CORRECT:\n# X_train, X_test = split(X_raw); scaler.fit(X_train)"
  },
  {
    id: 10,
    question: "Define Dot Product, L2 Norm, and Cosine Similarity between two d-dimensional vectors u and v.",
    shortAnswer: "Dot product: u.v = sum(u_i*v_i); L2 norm: ||u|| = sqrt(sum(u_i^2)); Cosine Similarity: (u.v)/(||u||*||v||).",
    explanation: "Dot product combines magnitudes and directional alignment. L2 norm calculates Euclidean length. Cosine similarity measures angular orientation between -1.0 and +1.0 regardless of magnitude, making it essential for NLP and vector embeddings.",
    hint: "Cosine similarity divides dot product by the product of both L2 magnitudes.",
    level: "Basic",
    codeExample: "dot_prod = np.dot(u, v)\ncos_sim = dot_prod / (np.linalg.norm(u) * np.linalg.norm(v))"
  }
];

export default questions;
