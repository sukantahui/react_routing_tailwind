/**
 * Topic 20: Short Questions
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the fundamental difference between Parametric and Non-Parametric Machine Learning models?",
    "shortAnswer": "Parametric models summarize data into a fixed number of parameters (e.g. Linear Regression weights); Non-parametric models grow in parameters with dataset size N (e.g. k-NN, Decision Trees).",
    "explanation": "Parametric algorithms make strong structural assumptions about the function h(x). Non-parametric algorithms make flexible assumptions, storing training instances in memory to conform to arbitrary non-linear boundaries.",
    "hint": "Fixed parameter size vs parameters scaling with dataset size.",
    "level": "Basic",
    "codeExample": "# Parametric: LinearRegression (fixed coef_ array)\n# Non-Parametric: KNeighborsClassifier (stores entire X_train matrix)"
  },
  {
    "id": 2,
    "question": "State Tom Mitchell's formal definition of Machine Learning (1997).",
    "shortAnswer": "A program learns from Experience E with respect to Task T and Performance measure P, if its performance at T, as measured by P, improves with E.",
    "explanation": "This formal mathematical formulation establishes the three pillars of all ML systems: the objective Task T, the quantitative Performance metric P, and the empirical historical training Experience E.",
    "hint": "The <T, P, E> tuple formulation.",
    "level": "Basic",
    "codeExample": "# Mitchell Tuple: <Task T, Performance Measure P, Experience E>"
  },
  {
    "id": 3,
    "question": "What is Arthur Samuel's classical definition of Machine Learning (1959)?",
    "shortAnswer": "The field of study that gives computers the ability to learn without being explicitly programmed.",
    "explanation": "Samuel proved this concept through his self-improving checkers program on the IBM 704, which learned winning board evaluation weights through thousands of self-play games.",
    "hint": "Learning without explicit hardcoded if-else programming.",
    "level": "Basic",
    "codeExample": "# Samuel: Learning optimal weights automatically from data interactions"
  },
  {
    "id": 4,
    "question": "What is the Bias-Variance Trade-off in machine learning?",
    "shortAnswer": "The balance between Underfitting (High Bias - overly simple model) and Overfitting (High Variance - overly complex model fitting noise).",
    "explanation": "Total Error = Bias\u00b2 + Variance + Irreducible Error. High bias algorithms miss true relationships; high variance algorithms fit training noise. Optimal generalization minimizes their combined sum.",
    "hint": "Underfitting error vs Overfitting error balance.",
    "level": "Basic",
    "codeExample": "# Optimal model capacity minimizes Total_Error = Bias^2 + Variance + Irreducible_Noise"
  },
  {
    "id": 5,
    "question": "Why is Mean Squared Error (MSE) preferred over Mean Absolute Error (MAE) during gradient-based optimization?",
    "shortAnswer": "MSE is smoothly differentiable everywhere (gradient is continuous linear 2e); MAE has an undefined derivative at residual e = 0.",
    "explanation": "The absolute value function |e| has a sharp corner (sub-gradient) at e=0, which can cause gradient descent to oscillate near the minimum. MSE's quadratic bowl provides smooth, continuous gradients everywhere.",
    "hint": "Smooth continuous derivative everywhere facilitating gradient descent.",
    "level": "Moderate",
    "codeExample": "# d(MSE)/de = 2e (smooth)\n# d(MAE)/de = sign(e) (discontinuous step at 0)"
  },
  {
    "id": 6,
    "question": "What is the primary role of the Sigmoid Activation Function in Logistic Regression?",
    "shortAnswer": "To squash any real-valued linear logit z \u2208 (-\u221e, +\u221e) into a valid probability interval [0, 1].",
    "explanation": "\u03c3(z) = 1 / (1 + e^-z). If z \u2192 +\u221e, \u03c3(z) \u2192 1. If z \u2192 -\u221e, \u03c3(z) \u2192 0. If z = 0, \u03c3(z) = 0.50. This maps linear outputs directly into posterior class probabilities.",
    "hint": "S-shaped curve squashing (-infinity, +infinity) into [0, 1].",
    "level": "Basic",
    "codeExample": "def sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-z))"
  },
  {
    "id": 7,
    "question": "What is the No Free Lunch Theorem in Machine Learning (Wolpert & Macready, 1997)?",
    "shortAnswer": "No single learning algorithm outperforms all others when averaged across all possible data-generating problems.",
    "explanation": "An algorithm that excels at linear problems will perform poorly on complex fractal problems. Every algorithm relies on specific inductive biases; model selection must be tailored to the specific domain dataset.",
    "hint": "No universally superior algorithm exists across all possible data distributions.",
    "level": "Moderate",
    "codeExample": "# Practical Implication: Always benchmark multiple algorithms (Linear, Trees, SVMs) on your dataset"
  },
  {
    "id": 8,
    "question": "What is Occam's Razor in Machine Learning model selection?",
    "shortAnswer": "Among competing hypotheses that explain the training data equally well, the simplest model with fewest assumptions should be preferred.",
    "explanation": "A simpler model (e.g. Linear Regression with 3 features) generalizes better than a 25th-degree polynomial that achieves the same training accuracy, because simpler models have lower variance.",
    "hint": "Prefer the simplest model that explains the data.",
    "level": "Basic",
    "codeExample": "# Regularization (L1/L2) mathematically enforces Occam's Razor by penalizing complexity"
  },
  {
    "id": 9,
    "question": "What is the difference between Batch Gradient Descent, SGD, and Mini-Batch Gradient Descent?",
    "shortAnswer": "Batch computes gradients over all N samples; SGD computes over 1 sample; Mini-batch computes over small batches (e.g., 32, 64 samples).",
    "explanation": "Batch GD is slow but stable; SGD is fast but noisy; Mini-Batch combines vectorized matrix GPU acceleration with smooth gradient updates.",
    "hint": "Dataset size processed per parameter update step.",
    "level": "Basic",
    "codeExample": "# Batch: N samples | SGD: 1 sample | Mini-Batch: 32 or 64 samples"
  },
  {
    "id": 10,
    "question": "What is Learning Rate \u03b1 and what occurs if \u03b1 is too small versus too large?",
    "shortAnswer": "Step size along negative gradient; too small leads to extremely slow convergence; too large causes oscillations and divergence to infinity.",
    "explanation": "With tiny \u03b1 = 1e-6, training takes millions of epochs. With massive \u03b1 = 10.0, parameter updates overshoot the valley floor and diverge (loss = NaN).",
    "hint": "Step size scaling gradient updates.",
    "level": "Basic",
    "codeExample": "# Optimal learning rate achieves smooth, monotonic loss decrease"
  },
  {
    "id": 11,
    "question": "What is Data Leakage and what is its most common real-world cause?",
    "shortAnswer": "Inadvertently exposing test information to training data; most commonly caused by fitting scalers/imputers on the full dataset before splitting.",
    "explanation": "Fitting `StandardScaler` on the entire dataset leaks test set mean and variance into training. Wrap transformers in a scikit-learn Pipeline to enforce isolation.",
    "hint": "Test set statistics leaking into the training pipeline.",
    "level": "Basic",
    "codeExample": "# Fix: Pipeline([('scaler', StandardScaler()), ('model', Ridge())])"
  },
  {
    "id": 12,
    "question": "What is the purpose of Stratification in classification dataset splitting?",
    "shortAnswer": "To ensure each split fold preserves the exact class proportion ratio present in the full dataset.",
    "explanation": "In an imbalanced 95:5 dataset, standard random splitting can create folds with zero minority instances. Stratified splitting preserves 95:5 across all folds.",
    "hint": "Preserves class percentages across train and test partitions.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import StratifiedKFold\nskf = StratifiedKFold(n_splits=5)"
  },
  {
    "id": 13,
    "question": "Why is Accuracy a misleading metric on imbalanced classification datasets?",
    "shortAnswer": "A naive model predicting only the majority class achieves high accuracy while completely failing to detect rare positive events.",
    "explanation": "If 99% of transactions are legitimate and 1% are fraud, predicting 'Legitimate' for 100% of cases achieves 99% accuracy but 0% fraud detection. Use Precision, Recall, and F1-score.",
    "hint": "High accuracy achieved by completely ignoring the minority target class.",
    "level": "Basic",
    "codeExample": "# 99% Accuracy on 99:1 data is achieved by a zero-rule dummy model"
  },
  {
    "id": 14,
    "question": "What is the mathematical definition of Precision and Recall?",
    "shortAnswer": "Precision = TP / (TP + FP) (exactness of positive alerts); Recall = TP / (TP + FN) (completeness of finding all actual positives).",
    "explanation": "Precision measures false alarms (FP). Recall measures missed detections (FN). In fraud/disease detection, high Recall is prioritized.",
    "hint": "TP over predicted positives vs TP over actual positives.",
    "level": "Basic",
    "codeExample": "precision = tp / (tp + fp)\nrecall = tp / (tp + fn)"
  },
  {
    "id": 15,
    "question": "What is the F1-Score and why does it use the Harmonic Mean rather than Arithmetic Mean?",
    "shortAnswer": "F1 = 2*(P*R)/(P+R); the harmonic mean heavily penalizes extreme imbalances where one metric is near zero.",
    "explanation": "If Precision = 1.0 and Recall = 0.0, the arithmetic mean is 0.50 (misleading), but the harmonic mean (F1) is 0.0, correctly reflecting complete system failure.",
    "hint": "Harmonic mean approaches zero if either Precision or Recall collapses.",
    "level": "Basic",
    "codeExample": "f1 = 2 * (precision * recall) / (precision + recall)"
  },
  {
    "id": 16,
    "question": "What is the ROC Curve and what does Area Under the Curve (ROC-AUC) quantify?",
    "shortAnswer": "Plots True Positive Rate vs False Positive Rate across all thresholds; AUC measures the probability of correctly ranking a random positive higher than a random negative.",
    "explanation": "ROC-AUC evaluates threshold-agnostic discrimination. AUC = 0.50 is random guessing; AUC = 1.0 is perfect class separation.",
    "hint": "TPR vs FPR curve measuring global ranking capability.",
    "level": "Basic",
    "codeExample": "from sklearn.metrics import roc_auc_score\nauc = roc_auc_score(y_true, y_pred_probs)"
  },
  {
    "id": 17,
    "question": "What is the difference between L1 (Lasso) and L2 (Ridge) Regularization?",
    "shortAnswer": "L1 adds \u03bb \u2211 |w_j| producing sparse feature selection (zeros); L2 adds \u03bb \u2211 w_j^2 smoothly shrinking weights to handle multicollinearity.",
    "explanation": "Lasso diamond constraint boundaries intersect loss ellipses at axes, forcing non-essential weights to exactly zero. Ridge circular boundaries shrink weights proportionally without forcing exact zeros.",
    "hint": "L1 = Sparse feature selection; L2 = Smooth weight shrinkage.",
    "level": "Basic",
    "codeExample": "# Lasso: L1 norm penalty -> Sparsity\n# Ridge: L2 norm penalty -> Shrinkage"
  },
  {
    "id": 18,
    "question": "What is the 'Curse of Dimensionality'?",
    "shortAnswer": "As dimensionality d increases, space volume grows exponentially, making all data points equidistant and sparse.",
    "explanation": "In high-dimensional spaces, distance metrics lose discriminative power: (d_max - d_min) / d_min \u2192 0. Use dimensionality reduction (PCA) to project data into lower dimensions.",
    "hint": "Exponential volume growth making high-dimensional points equidistant.",
    "level": "Moderate",
    "codeExample": "# Mitigated via PCA(n_components=50)"
  },
  {
    "id": 19,
    "question": "What is Principal Component Analysis (PCA)?",
    "shortAnswer": "An unsupervised orthogonal linear transformation that projects data onto principal axes maximizing explained variance.",
    "explanation": "PCA computes the eigenvectors of data covariance matrix X^T X. The first principal component captures the direction of greatest variance in \u211d^d.",
    "hint": "Orthogonal variance-maximizing projection axes.",
    "level": "Basic",
    "codeExample": "from sklearn.decomposition import PCA\npca = PCA(n_components=2).fit(X_scaled)"
  },
  {
    "id": 20,
    "question": "How does K-Means Clustering partition unlabeled data points?",
    "shortAnswer": "By iteratively alternating between assigning points to the nearest centroid and recomputing centroids as the mean of assigned points.",
    "explanation": "K-Means minimizes Within-Cluster Sum of Squares (Inertia). It alternates between Voronoi assignment and centroid mean updating until convergence.",
    "hint": "Nearest centroid assignment alternating with cluster mean recalculation.",
    "level": "Basic",
    "codeExample": "from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(X)"
  },
  {
    "id": 21,
    "question": "What is the Elbow Method in clustering?",
    "shortAnswer": "Plotting Inertia (WCSS) against K and selecting the inflection point where marginal variance reduction sharply flattens.",
    "explanation": "As K increases, inertia continuously drops. The elbow point marks the optimal trade-off between cluster compactness and model simplicity.",
    "hint": "Inflection point on the Inertia vs K plot.",
    "level": "Basic",
    "codeExample": "inertias = [KMeans(n_clusters=k).fit(X).inertia_ for k in range(1, 9)]"
  },
  {
    "id": 22,
    "question": "What is the Silhouette Coefficient and what does a value near +1 indicate?",
    "shortAnswer": "s = (b - a) / max(a, b); values near +1 indicate dense, well-separated clusters with small intra-cluster distance.",
    "explanation": "Here a is mean intra-cluster distance and b is mean nearest-cluster distance. +1 = well clustered; 0 = overlapping cluster border; -1 = incorrect assignment.",
    "hint": "Balance between internal cohesion and nearest-cluster separation.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import silhouette_score\nscore = silhouette_score(X, labels)"
  },
  {
    "id": 23,
    "question": "How does DBSCAN cluster data and how does it handle noise?",
    "shortAnswer": "Clusters based on spatial density (Eps, MinPts); points with fewer than MinPts neighbors within Eps are labeled as noise (-1).",
    "explanation": "DBSCAN discovers clusters of arbitrary non-spherical shapes without requiring K upfront, automatically isolating low-density anomalies as noise.",
    "hint": "Density-connected clusters with automatic noise outlier isolation.",
    "level": "Moderate",
    "codeExample": "from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.5, min_samples=5).fit(X)"
  },
  {
    "id": 24,
    "question": "What is the 'Naive' assumption in Naive Bayes and why is Laplace Smoothing used?",
    "shortAnswer": "Assumes all features are conditionally independent given class; Laplace smoothing adds pseudo-count \u03b1=1 to prevent multiplying by zero probability.",
    "explanation": "Assuming conditional independence simplifies joint likelihood to a product of marginals \u220f P(w_j|C). Laplace smoothing prevents unseen words from collapsing the entire product to zero.",
    "hint": "Conditional feature independence + pseudo-count smoothing against zero probabilities.",
    "level": "Basic",
    "codeExample": "p_w_given_c = (count + 1) / (total_words + vocab_size)"
  },
  {
    "id": 25,
    "question": "What is the difference between Bagging and Boosting in ensemble learning?",
    "shortAnswer": "Bagging trains deep de-correlated trees in parallel to reduce variance (Random Forest); Boosting trains shallow trees sequentially to reduce bias (GBDT/XGBoost).",
    "explanation": "Bagging uses bootstrap resamples and averages independent predictions. Boosting fits each new tree to the residual errors (gradients) of the existing ensemble.",
    "hint": "Parallel variance reduction vs sequential residual bias reduction.",
    "level": "Moderate",
    "codeExample": "# Bagging: RandomForestClassifier()\n# Boosting: GradientBoostingClassifier()"
  },
  {
    "id": 26,
    "question": "What is Early Stopping during model training?",
    "shortAnswer": "Halting iterative training epochs when validation loss stops improving for a patience window, preventing overfitting.",
    "explanation": "Captures parameter weights at the point of lowest validation loss before the model begins memorizing training set noise.",
    "hint": "Stopping training at the minimum of the validation loss curve.",
    "level": "Basic",
    "codeExample": "# Early stopping captures optimal generalization epoch"
  },
  {
    "id": 27,
    "question": "What is Data Drift versus Concept Drift in production systems?",
    "shortAnswer": "Data Drift: input distribution P(X) shifts over time; Concept Drift: relationship between features and target P(Y|X) shifts.",
    "explanation": "Data drift: customers become younger on average. Concept drift: macroeconomic changes alter customer purchasing behavior for the same income level.",
    "hint": "Feature distribution shift P(X) vs mapping shift P(Y|X).",
    "level": "Moderate",
    "codeExample": "# Data Drift: P(X_2026) != P(X_2024)\n# Concept Drift: P(Y|X_2026) != P(Y|X_2024)"
  },
  {
    "id": 28,
    "question": "What is Explainable AI (XAI) and what do SHAP values quantify?",
    "shortAnswer": "Shapley values calculate the additive marginal contribution of each feature to an individual prediction relative to the baseline dataset average.",
    "explanation": "Based on cooperative game theory, SHAP decomposes f(x) = Base_Value + \u2211 \u03c6_j(x), providing auditability and transparency for regulatory compliance in banking and medicine.",
    "hint": "Game-theoretic additive feature attribution explaining individual predictions.",
    "level": "Moderate",
    "codeExample": "import shap\nexplainer = shap.Explainer(model)\nshap_values = explainer(X_test)"
  },
  {
    "id": 29,
    "question": "What is the Ordinary Least Squares (OLS) Normal Equation for Linear Regression?",
    "shortAnswer": "w* = (X^T X)^{-1} X^T y (the closed-form analytical solution minimizing MSE).",
    "explanation": "Setting loss gradient \u2207J(w) = 0 yields the normal equations. Solvable directly via matrix inversion without iterative gradient descent for moderate feature sizes.",
    "hint": "Closed-form matrix equation setting derivative of MSE to zero.",
    "level": "Moderate",
    "codeExample": "w_star = np.linalg.inv(X.T @ X) @ X.T @ y"
  },
  {
    "id": 30,
    "question": "What is the ultimate purpose of Machine Learning?",
    "shortAnswer": "To discover underlying predictive patterns from empirical data and generalize accurately to previously unseen real-world observations.",
    "explanation": "Machine Learning replaces rigid manual rule-coding with automated inductive parameter optimization, enabling computer systems to adapt, scale, and solve complex probabilistic problems across all human endeavors.",
    "hint": "Inductive empirical generalization from data to unseen future observations.",
    "level": "Basic",
    "codeExample": "# ML Paradigm: Data (X) + Targets (y) -> Optimization Engine -> Generalizable Model h(x)"
  }
];

export default questions;
