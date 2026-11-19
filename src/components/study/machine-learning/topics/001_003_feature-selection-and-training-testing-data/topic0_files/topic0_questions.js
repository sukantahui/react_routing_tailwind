/**
 * Topic 0: Meaning of Features and Target
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Ontology, Definitions, X vs y, Task Types)
  // =========================================================================
  {
    id: 1,
    question: "What is the fundamental mathematical difference between a feature and a target in supervised machine learning?",
    shortAnswer: "A feature x in R^d is an observed input variable (covariate/regressor) used to characterize an entity, whereas the target y in Y is the dependent variable (ground truth label) that the algorithm is tasked with approximating.",
    explanation: "Supervised machine learning seeks to learn a mapping function f: X -> Y from training pairs (x_i, y_i). Features form the design matrix X in R^(N x d), while targets form the outcome vector y in Y^N.",
    hint: "Think about inputs (independent variables) versus outputs (dependent variables).",
    level: "Basic",
    codeExample: "# Supervised learning boundary in Python\nX = df[['attendance_pct', 'internal_marks']]  # Features\ny = df['semester_score_pct']                  # Target\nmodel.fit(X, y)"
  },
  {
    id: 2,
    question: "How does the mathematical structure of the target space Y differentiate Regression from Classification?",
    shortAnswer: "In Regression, Y is a continuous real-valued space (Y subset of R); in Classification, Y is a discrete categorical set with finite mutually exclusive classes (Y in {0, 1, ..., C-1}).",
    explanation: "Continuous targets (e.g., student marks 85.5%, real estate lease ₹45/sq.ft.) require distance-based loss functions like MSE. Discrete targets (e.g., Placed/Unplaced, Pass/Fail) require probability-based loss functions like Cross-Entropy.",
    hint: "Is the target a continuous quantity or a discrete category?",
    level: "Basic",
    codeExample: "# Regression vs Classification Target types\ny_regression = np.array([74.5, 88.0, 92.3])  # Continuous (R)\ny_classification = np.array([0, 1, 1])      # Discrete ({0, 1})"
  },
  {
    id: 3,
    question: "Why is a student's unique Registration ID or Database Primary Key strictly invalid as an input feature in machine learning models?",
    shortAnswer: "Primary keys are non-generalizable unique identifiers; decision trees will memorize specific IDs to achieve 100% training accuracy but fail completely on unseen test IDs.",
    explanation: "A model that splits on unique IDs (e.g. ID <= 1042) is simply memorizing rows rather than discovering patterns in the feature space. In production, every incoming customer has a novel ID, leading to arbitrary routing and model collapse.",
    hint: "Does a student's ID number have an intrinsic causal relationship with their exam performance?",
    level: "Basic",
    codeExample: "# Always drop primary keys before training\nX = df.drop(columns=['student_id', 'roll_no', 'target_y'])"
  },
  {
    id: 4,
    question: "What is the formal definition of the Design Matrix X in supervised tabular machine learning?",
    shortAnswer: "A 2-dimensional real matrix of shape (N x d), where each row i represents an individual observation vector x_i, and each column j represents a distinct measured feature dimension.",
    explanation: "Mathematically, X in R^(N x d). If we have 1,000 students and 5 measured attributes (attendance, study hours, internal marks, mock scores, assignments), N = 1000 and d = 5.",
    hint: "Rows represent instances; columns represent feature dimensions.",
    level: "Basic",
    codeExample: "# Design matrix shape verification\nprint(X.shape)  # Output: (N, d) e.g. (1000, 5)"
  },
  {
    id: 5,
    question: "In probabilistic terms, what is the core assumption regarding how training pairs (x_i, y_i) are generated?",
    shortAnswer: "Training instances (x_i, y_i) are drawn independently and identically distributed (i.i.d.) from an underlying joint probability distribution P(X, Y).",
    explanation: "The i.i.d. assumption guarantees that training samples are statistically representative of the true data-generating process, allowing models to generalize to unseen instances drawn from the same distribution.",
    hint: "i.i.d.: Independent and Identically Distributed.",
    level: "Basic",
    codeExample: "# Theoretical joint distribution:\n# P(X, Y) = P(Y | X) * P(X)"
  },
  {
    id: 6,
    question: "What is an independent variable (covariate) in contrast to a dependent variable (target)?",
    shortAnswer: "An independent variable is a predictor whose variation is treated as given or observed; a dependent variable is the outcome whose variation the model attempts to explain or predict based on the covariates.",
    explanation: "In econometric and statistical modeling, covariates X are independent regressors. The target y is dependent because its expected value is modeled as a function of X: E[Y | X].",
    hint: "Independent = Input features; Dependent = Output target.",
    level: "Basic",
    codeExample: "# Independent variables X determine Dependent variable y\ny_hat = w1 * x_attendance + w2 * x_study_hours + bias"
  },
  {
    id: 7,
    question: "Can an attribute serve as a feature in one machine learning task and as a target in another task?",
    shortAnswer: "Yes. Feature and target roles are task-dependent abstractions, not intrinsic properties of the data itself.",
    explanation: "In a student performance model, 'Internal Exam Marks' can be an input feature predicting 'Final Semester Percentage' (target). In an automated grading model, 'Internal Exam Marks' can be the target predicted from 'Assignment Submissions' and 'Attendance' (features).",
    hint: "The role depends entirely on what the business problem is trying to predict.",
    level: "Basic",
    codeExample: "# Task 1: Predict final score\nX1 = df[['internal_marks']]; y1 = df['final_score']\n# Task 2: Predict internal marks\nX2 = df[['attendance', 'assignments']]; y2 = df['internal_marks']"
  },
  {
    id: 8,
    question: "What is an Unsupervised Learning problem, and how does its formal formulation differ from Supervised Learning regarding targets?",
    shortAnswer: "In Unsupervised Learning, there is no target vector y; the algorithm operates strictly on the feature matrix X in R^(N x d) to discover latent structure, density, or clusters.",
    explanation: "Supervised learning learns f: X -> Y by minimizing loss against ground truth y. Unsupervised learning (e.g. K-Means, PCA) analyzes P(X) directly without labels.",
    hint: "Supervised uses (X, y); Unsupervised uses only X.",
    level: "Basic",
    codeExample: "# Unsupervised learning: No target y provided\nkmeans = KMeans(n_clusters=3)\nkmeans.fit(X)  # Only X, no y"
  },

  // =========================================================================
  // TIER 2: MECHANICS (Bayes Optimal Predictor, ERM, Loss Duality, Correlation)
  // =========================================================================
  {
    id: 9,
    question: "Under squared error loss L(y, y_hat) = (y - y_hat)^2, what is the theoretical Bayes Optimal Predictor?",
    shortAnswer: "The conditional expectation of the target given the features: f*(x) = E[Y | X = x].",
    explanation: "By minimizing expected loss E[(Y - f(X))^2], differentiating with respect to f(x) and setting to zero yields f*(x) = E[Y | X = x]. Any remaining variance Var(Y | X) represents irreducible error.",
    hint: "The mean of the posterior conditional distribution.",
    level: "Intermediate",
    codeExample: "# Bayes optimal regressor under L2 loss\n# f*(x) = integral(y * P(y | x) dy) = E[Y | X = x]"
  },
  {
    id: 10,
    question: "How is the Empirical Risk Minimization (ERM) objective function formulated in supervised learning?",
    shortAnswer: "R_emp(f) = (1/N) * sum_{i=1}^N L(f(x_i), y_i); it approximates the true theoretical risk by averaging the loss over the N observed training instances.",
    explanation: "Because the true population distribution P(X, Y) is inaccessible, models minimize average sample error. Adding a regularization term lambda * Omega(f) penalizes model complexity to prevent overfitting.",
    hint: "Average loss over N training examples.",
    level: "Intermediate",
    codeExample: "# ERM with L2 Regularization (Ridge Regression)\nloss = (1/N) * np.sum((y - X.dot(w))**2) + alpha * np.sum(w**2)"
  },
  {
    id: 11,
    question: "What is the difference between a Strongly Relevant feature and a Weakly Relevant feature?",
    shortAnswer: "A feature is strongly relevant if removing it strictly degrades the Bayes optimal predictor; it is weakly relevant if it provides predictive signal that is partially redundant with other features.",
    explanation: "Strongly relevant features provide unique information: P(Y | X) != P(Y | X_{-j}). Weakly relevant features provide signal that can be substituted by other correlated features without increasing Bayes error.",
    hint: "Strong = indispensable; Weak = helpful but partially redundant.",
    level: "Intermediate",
    codeExample: "# Strongly relevant: Internal marks (unique academic signal)\n# Weakly relevant: Study hours (shares variance with internal marks)"
  },
  {
    id: 12,
    question: "What is an Irrelevant (Noise) feature, and what mathematical effect does it have on model generalization?",
    shortAnswer: "A feature that is conditionally independent of the target given all other features: P(Y | X) = P(Y | X_{-j}); it increases estimation variance and causes the curse of dimensionality.",
    explanation: "Including irrelevant noise features (e.g. random numbers, commute minutes) consumes model degrees of freedom, causes linear weights to fit spurious training correlations, and degrades test accuracy.",
    hint: "A feature with zero mutual information with the target: I(X_j; Y | X_{-j}) = 0.",
    level: "Intermediate",
    codeExample: "# Irrelevant feature: Student commute distance for coding proficiency\n# True correlation r approx 0.0; weights should shrink to 0"
  },
  {
    id: 13,
    question: "How is Pearson's correlation coefficient r(x, y) formulated, and what are its boundaries?",
    shortAnswer: "r = Cov(X, Y) / (sigma_X * sigma_Y); it measures the strength and direction of linear association and is bounded strictly in [-1.0, +1.0].",
    explanation: "r = +1.0 denotes perfect positive linear association, r = -1.0 denotes perfect negative linear association, and r = 0 indicates no linear correlation.",
    hint: "Covariance divided by the product of standard deviations.",
    level: "Intermediate",
    codeExample: "# Pearson correlation calculation\nr = np.corrcoef(x, y)[0, 1]"
  },
  {
    id: 14,
    question: "Why does a Pearson correlation of r = 0 not necessarily imply that feature X is independent of target Y?",
    shortAnswer: "Because Pearson correlation strictly measures linear relationships; non-linear deterministic dependencies (e.g., y = x^2 centered at 0) have r = 0 despite perfect predictability.",
    explanation: "If x is uniformly distributed on [-1, 1] and y = x^2, the covariance Cov(x, y) = E[x^3] - E[x]E[x^2] = 0 - 0 = 0. Therefore r = 0, but y is 100% determined by x.",
    hint: "Non-linear relationships can have zero linear correlation.",
    level: "Intermediate",
    codeExample: "# Non-linear dependency with zero correlation\nx = np.linspace(-10, 10, 100)\ny = x**2\nprint(np.corrcoef(x, y)[0, 1])  # Yields approx 0.0!"
  },
  {
    id: 15,
    question: "What metric should be used instead of Pearson correlation to detect non-linear dependencies between continuous features and targets?",
    shortAnswer: "Mutual Information I(X; Y), which measures general statistical dependence based on Shannon entropy: I(X; Y) = H(X) + H(Y) - H(X, Y).",
    explanation: "Mutual Information is zero if and only if X and Y are strictly statistically independent: P(X, Y) = P(X)P(Y). It detects quadratic, sinusoidal, and arbitrary non-linear feature-target relationships.",
    hint: "Information-theoretic metric based on entropy.",
    level: "Intermediate",
    codeExample: "# Mutual information in scikit-learn\nfrom sklearn.feature_selection import mutual_info_regression\nmi_scores = mutual_info_regression(X, y)"
  },
  {
    id: 16,
    question: "In Ordinary Least Squares (OLS) regression, how does the coefficient of determination R^2 relate to Pearson correlation in a univariate model?",
    shortAnswer: "In simple univariate linear regression, R^2 is identically equal to the square of Pearson's correlation coefficient: R^2 = r(x, y)^2.",
    explanation: "If the correlation between internal marks and semester score is r = 0.997, then R^2 = (0.997)^2 = 0.994, indicating that 99.4% of the variance in semester scores is explained by internal marks.",
    hint: "R^2 = r^2 for a single predictor.",
    level: "Intermediate",
    codeExample: "# Univariate R^2 equality\nr = np.corrcoef(x, y)[0, 1]\nr2 = r ** 2"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE (Target Leakage, Pipeline Gating, Data Integrity)
  // =========================================================================
  {
    id: 17,
    question: "What is Target Leakage, and what is its signature empirical symptom during offline model evaluation?",
    shortAnswer: "Target leakage occurs when an input feature contains information about the target that is unavailable at inference time; its symptom is unrealistically perfect offline performance (R^2 approx 1.0 or ROC-AUC approx 1.0) that collapses in production.",
    explanation: "If a model predicts hospital readmission using 'Prescribed Post-Discharge Home Nurse', it achieves 99.9% accuracy offline because home nurses are only assigned to readmitted patients. In production, nurses have not yet been assigned, so the model fails.",
    hint: "Too-good-to-be-true offline test metrics.",
    level: "Advanced",
    codeExample: "# Signature symptom of Target Leakage:\n# Offline Test ROC-AUC: 0.9998\n# Production Live ROC-AUC: 0.5210 (Random guessing)"
  },
  {
    id: 18,
    question: "What is Contemporaneous (Post-Event) Feature Leakage, and how does the 'Temporal Precedence Rule' prevent it?",
    shortAnswer: "Contemporaneous leakage occurs when features are recorded simultaneously with or after the target event occurs; the Temporal Precedence Rule mandates that timestamp(x_j) must strictly precede timestamp(y).",
    explanation: "In student placement prediction, 'Interview Cleared' occurs at the exact moment an offer is made. If the model's business objective is to identify students in 6th semester who need training, feeding 8th semester interview results violates physical causality.",
    hint: "Every feature must occur before the target in physical time.",
    level: "Advanced",
    codeExample: "# Temporal Precedence Enforcement in SQL/ETL:\n# WHERE feature_event_time < prediction_cutoff_time"
  },
  {
    id: 19,
    question: "How does Retrospective Feature Aggregation create insidious target leakage in customer churn prediction?",
    shortAnswer: "When feature engineers compute aggregates (e.g., 'total purchases in the last 90 days') using data timestamps that extend past the customer's churn date.",
    explanation: "If a customer churned on Day 60, computing 90-day activity includes 30 days of zero activity post-churn. The model notices that 'recent purchases = 0' and predicts churn with 100% accuracy, but this zero activity was caused by churn itself.",
    hint: "Computing stats over future windows.",
    level: "Advanced",
    codeExample: "# Correct Leakage-Free Windowing:\n# df['rolling_spend'] = df.apply(lambda row: compute_spend(row['id'], end_date=row['cutoff_date']))"
  },
  {
    id: 20,
    question: "What is Proxy Variable Leakage, and how did it manifest in commercial real estate lease modeling in Salt Lake Sector V?",
    shortAnswer: "When an input feature is a direct mathematical derivative or statutory multiple of the target, such as 'Security Deposit' which is legally mandated to equal 6 months of base rent.",
    explanation: "Because Deposit = 6 * Rent, feeding Deposit into a model predicting Rent allows the algorithm to learn the trivial relationship Rent = Deposit / 6. The model appears 100% accurate but cannot value vacant properties where deposit has not yet been set.",
    hint: "A feature that is an algebraic transformation of the target.",
    level: "Advanced",
    codeExample: "# Proxy leakage: Feature is a direct multiple of target\n# x_deposit = 6 * y_rent\n# Model learns: y_hat = (1/6) * x_deposit  (Trivial Identity)"
  },
  {
    id: 21,
    question: "Why must the target vector y NEVER be passed to preprocessing transformers like SimpleImputer or StandardScaler?",
    shortAnswer: "Preprocessing transformers are designed to modify the feature space X; passing y into fit_transform() leaks target information into donor calculations or alters the scale of ground truth labels inappropriately.",
    explanation: "Imputers must estimate missing feature values strictly using predictor correlations. If target labels are used to impute missing features, the feature now contains ground truth, causing total pipeline leakage.",
    hint: "Transformers operate on X, never on y.",
    level: "Advanced",
    codeExample: "# SEVERE DATA LEAKAGE ANTI-PATTERN:\n# X_train['salary'] = imputer.fit_transform(X_train[['exp', 'target_y']])\n# CORRECT: Use only predictor features X"
  },
  {
    id: 22,
    question: "In tabular classification pipelines, why must target encoding (mean encoding) be performed strictly within cross-validation folds rather than across the whole dataset?",
    shortAnswer: "Because computing the average target value y_bar for each category across the entire dataset leaks the validation fold's target labels into the training feature values.",
    explanation: "If category 'Kolkata' has an intra-class mean target computed using all rows, validation rows contribute to their own feature values, inflating offline validation accuracy and causing target leakage.",
    hint: "Out-of-fold target encoding prevents self-leakage.",
    level: "Advanced",
    codeExample: "# Correct Out-Of-Fold Target Encoding\nfrom category_encoders import TargetEncoder\nencoder = TargetEncoder(cols=['city'], cv=5)"
  },
  {
    id: 23,
    question: "What is the consequence of treating a multi-class ordinal target (e.g. Grades: A, B, C, D) as an arbitrary nominal target with One-vs-Rest classification?",
    shortAnswer: "It discards the intrinsic monotonic rank ordering between classes; predicting grade 'F' for an 'A' student is penalized with the exact same loss as predicting 'B'.",
    explanation: "Nominal multi-class loss treats all errors equally. Ordinal regression models or continuous score predictions preserve distance and rank, providing far more realistic penalties for near-miss predictions.",
    hint: "Ordinal targets have meaningful order that nominal loss ignores.",
    level: "Advanced",
    codeExample: "# Ordinal targets preserve metric penalty:\n# Error(A -> B) is small; Error(A -> F) is severe"
  },
  {
    id: 24,
    question: "How should a machine learning engineer audit a newly received production dataset for potential target leakage before model building?",
    shortAnswer: "1. Check pairwise correlations between each feature and y (|r| > 0.95); 2. Audit feature timestamps against target event times; 3. Inspect high-importance features in a baseline tree.",
    explanation: "Any feature with near-perfect correlation, or any feature whose name implies post-event status (e.g. 'cancellation_date', 'approved_flag'), must be rigorously challenged and removed if not available at the moment of inference.",
    hint: "Correlation check, temporal audit, and feature importance inspection.",
    level: "Advanced",
    codeExample: "# Automated Leakage Audit Script\nfor col in X.columns:\n    corr = np.corrcoef(X[col], y)[0, 1]\n    if abs(corr) > 0.95:\n        print(f'SUSPECT TARGET LEAKAGE: {col} (r = {corr:.4f})')"
  },

  // =========================================================================
  // TIER 4: PRODUCTION, SCALABILITY & SERVING GUARDS
  // =========================================================================
  {
    id: 25,
    question: "What is Label Shift (Prior Probability Shift), and how does it differ from Covariate Shift?",
    shortAnswer: "Label Shift occurs when the target distribution P(Y) changes while the conditional feature distribution P(X | Y) remains invariant; Covariate Shift occurs when P(X) changes while P(Y | X) remains invariant.",
    explanation: "In loan underwriting, during an economic recession, the overall default rate P(Y = 1) may spike from 2% to 15% (Label Shift). In Covariate Shift, applicant demographics P(X) change, but the probability of default for a given income P(Y | X) stays the same.",
    hint: "P(Y) changes in Label Shift; P(X) changes in Covariate Shift.",
    level: "Expert",
    codeExample: "# Label Shift: Target prevalence changes across time\n# Training (2024): Default rate P(Y=1) = 0.02\n# Production (2026): Default rate P(Y=1) = 0.12"
  },
  {
    id: 26,
    question: "What is a Delayed Feedback Loop in production supervised learning, and why does it make target acquisition difficult?",
    shortAnswer: "A latency gap between when an inference prediction f(x) is generated and when the true ground truth label y is observed in reality (e.g. 90 days for loan default, 12 months for customer churn).",
    explanation: "Unlike online ad click prediction where labels arrive within seconds, loan defaults take months to observe. This delayed feedback means models cannot be validated or retrained immediately on fresh production traffic.",
    hint: "Ground truth is not available immediately after prediction.",
    level: "Expert",
    codeExample: "# Delayed Feedback Timeline:\n# Day 0: Predict loan approval f(x)\n# Day 90: Observe true default label y"
  },
  {
    id: 27,
    question: "In real-time inference microservices, how should an API handle incoming requests where an essential feature x_j is missing?",
    shortAnswer: "Use a production imputer pipeline pre-fitted on training data (e.g. stratified median or KNN) or route to a dedicated model trained without that feature, rather than returning a 500 server crash.",
    explanation: "In production, mobile network drops or user skips cause missing features. The inference pipeline must execute imputer.transform(X_live) to substitute robust training parameters without interrupting service.",
    hint: "Pre-trained imputer transform ensures high availability.",
    level: "Expert",
    codeExample: "# Production Inference Gating\ndef predict(input_json):\n    X_live = pipeline.named_steps['imputer'].transform(input_json)\n    return pipeline.named_steps['model'].predict(X_live)"
  },
  {
    id: 28,
    question: "What is the 'Self-Fulfilling Prophecy' bias (Performative Prediction) when model predictions influence the true target y?",
    shortAnswer: "When an algorithmic prediction changes real-world human behavior or business actions, thereby altering the probability of the target event occurring.",
    explanation: "If a fraud detection model flags a transaction as high-risk, the bank blocks the card. Because the card is blocked, no fraud occurs (y = 0). The model's own intervention altered the ground truth label, making counterfactual evaluation challenging.",
    hint: "Predictions alter the reality they are trying to predict.",
    level: "Expert",
    codeExample: "# Performative Prediction feedback:\n# y_hat = High Risk -> Action: Block Account -> Observed y = No Fraud"
  },
  {
    id: 29,
    question: "How does Semi-Supervised Learning bridge the gap when feature matrices X are abundant but target labels y are expensive or scarce?",
    shortAnswer: "It combines a small labeled dataset (X_L, y_L) with a massive unlabeled dataset X_U, using algorithms like Pseudo-Labeling or Contrastive Representation Learning to improve decision boundaries.",
    explanation: "In medical pathology in Kolkata, obtaining whole-slide biopsy scans (X) is cheap, but having expert pathologists annotate ground truth tumor boundaries (y) costs ₹5,000 per slide. Semi-supervised learning leverages unlabeled data structure.",
    hint: "Small labeled data + large unlabeled data.",
    level: "Expert",
    codeExample: "# Semi-supervised workflow\n# 1. Train model on 500 labeled slides\n# 2. Predict high-confidence pseudo-labels on 50,000 unlabeled slides\n# 3. Retrain on combined set"
  },
  {
    id: 30,
    question: "What is the Golden Rule of Feature Definition that every machine learning architect must enforce before signing off on a deployment?",
    shortAnswer: "Every feature x_j must be computable strictly from historical data available at the exact millisecond of inference, must have zero causal dependency on future target events, and must not contain primary key artifacts.",
    explanation: "This principle guarantees temporal validity, eliminates target leakage, prevents database primary key memorization, and ensures that offline validation benchmarks accurately reflect real-world production performance.",
    hint: "Temporal precedence, causal validity, and zero identifier memorization.",
    level: "Expert",
    codeExample: "# The Golden Rule Checklist:\n# 1. timestamp(x) < timestamp(y) (Temporal)\n# 2. Causally independent of y (Leakage-free)\n# 3. No unique UUIDs / Primary keys (Generalizable)"
  }
];

export default questions;
