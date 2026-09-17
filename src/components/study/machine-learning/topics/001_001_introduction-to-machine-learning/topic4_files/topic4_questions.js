/**
 * Topic 4: Supervised Learning
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the foundational definition of Supervised Learning in Machine Learning?",
    "shortAnswer": "Learning a mapping function f: X \u2192 Y from a training dataset containing labeled input-output pairs (x_i, y_i).",
    "explanation": "In supervised learning, the algorithm is provided with feature vectors alongside ground-truth target supervisor labels. The goal is to optimize model parameters so that the inferred hypothesis accurately predicts the true label on unseen test instances.",
    "hint": "Think of a student learning under the guidance of a teacher who provides correct answers for every homework exercise.",
    "level": "Basic",
    "codeExample": "# Supervised pair: (features X, labels y)\nfrom sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)"
  },
  {
    "id": 2,
    "question": "What are the two major functional sub-categories of Supervised Learning?",
    "shortAnswer": "Regression (predicting continuous numerical quantities) and Classification (predicting discrete class categories).",
    "explanation": "If the target variable y is quantitative and continuous (y \u2208 \u211d, such as house price, salary, temperature), it is a Regression task. If y represents a discrete category or class label (y \u2208 {C_1, C_2, ..., C_k}, such as pass/fail, spam/ham), it is a Classification task.",
    "hint": "Continuous spectrum vs categorical buckets.",
    "level": "Basic",
    "codeExample": "# Regression target: y = 45.8 (Lakhs)\n# Classification target: y = 1 (Pass) or 0 (Fail)"
  },
  {
    "id": 3,
    "question": "What is the mathematical formulation of the Hypothesis Function h_\u03b8(x) in Supervised Linear Regression?",
    "shortAnswer": "h_\u03b8(x) = \u03b8_0 + \u03b8_1 x_1 + \u03b8_2 x_2 + ... + \u03b8_d x_d = \u03b8^T x (where x_0 = 1).",
    "explanation": "The hypothesis represents the candidate function family evaluated by the learning algorithm. It computes a linear weighted sum of the input features parameterized by weight vector \u03b8 and bias intercept \u03b8_0.",
    "hint": "Dot product between parameter vector and augmented feature vector.",
    "level": "Moderate",
    "codeExample": "import numpy as np\ndef hypothesis(x, theta):\n    return np.dot(x, theta)  # x includes bias feature 1.0"
  },
  {
    "id": 4,
    "question": "What is the primary loss function used to optimize Supervised Linear Regression models?",
    "shortAnswer": "Mean Squared Error (MSE) / Half Mean Squared Error: J(\u03b8) = (1 / 2N) \u2211 (h_\u03b8(x_i) - y_i)^2.",
    "explanation": "MSE measures the average squared Euclidean difference between the predicted target h_\u03b8(x_i) and actual ground truth y_i. Squaring penalizes large prediction outliers more severely and ensures mathematical differentiability for gradient-based optimization.",
    "hint": "The standard L2 squared error averaged across N observations.",
    "level": "Basic",
    "codeExample": "def mse_loss(y_true, y_pred):\n    return np.mean((y_true - y_pred) ** 2)"
  },
  {
    "id": 5,
    "question": "In Supervised Classification, why is Mean Squared Error generally avoided in favor of Binary Cross-Entropy (Log Loss)?",
    "shortAnswer": "MSE with sigmoid activations produces non-convex loss surfaces with false local minima and vanishing gradients for confident wrong predictions.",
    "explanation": "When linear combinations are passed through non-linear activation functions like the logistic sigmoid \u03c3(z), MSE produces a non-convex error surface full of plateaus. Binary Cross-Entropy is strictly convex with respect to weights, ensuring guaranteed convergence to the global optimum via gradient descent.",
    "hint": "Cross-entropy guarantees a bowl-shaped convex optimization surface.",
    "level": "Expert",
    "codeExample": "# Binary Cross-Entropy Loss\ndef bce_loss(y_true, p_pred):\n    eps = 1e-15\n    p_pred = np.clip(p_pred, eps, 1 - eps)\n    return -np.mean(y_true * np.log(p_pred) + (1 - y_true) * np.log(1 - p_pred))"
  },
  {
    "id": 6,
    "question": "What is the principle of Empirical Risk Minimization (ERM) in Supervised Learning?",
    "shortAnswer": "Choosing model parameters that minimize the average loss over the observed empirical training dataset.",
    "explanation": "Because the true joint probability distribution P(X, Y) is unknown, statistical learning theory approximates the true expected risk by minimizing the empirical risk R_emp(h) = (1/N) \u2211 L(h(x_i), y_i) computed across the available training observations.",
    "hint": "Minimizing sample average error as a proxy for unknown real-world error.",
    "level": "Expert",
    "codeExample": "# ERM Objective: argmin_w (1/N) * sum(Loss(w^T x_i, y_i))"
  },
  {
    "id": 7,
    "question": "What is the difference between Parametric and Non-Parametric Supervised Learning algorithms?",
    "shortAnswer": "Parametric models have a fixed number of parameters regardless of data size (e.g., Linear Regression); Non-parametric models grow in complexity with data size (e.g., k-NN).",
    "explanation": "Parametric algorithms make strong assumptions about the functional form of h(x) (summarizing training data into fixed weights w). Non-parametric algorithms make minimal functional assumptions and retain training instances directly in memory during inference.",
    "hint": "Fixed weight vectors vs storing instances in memory.",
    "level": "Moderate",
    "codeExample": "# Parametric: LinearRegression (weights w)\n# Non-Parametric: KNeighborsClassifier (stores entire training set)"
  },
  {
    "id": 8,
    "question": "How does the k-Nearest Neighbors (k-NN) algorithm perform supervised classification?",
    "shortAnswer": "By identifying the k closest training points in feature space using Euclidean distance and taking a majority vote of their labels.",
    "explanation": "k-NN is an instance-based lazy learning algorithm. Given a query point x_q, it computes distance d(x_q, x_i) to all training points, selects the k smallest distances, and assigns the mode (most frequent) class label among those k neighbors.",
    "hint": "Distance-based majority voting in multi-dimensional space.",
    "level": "Basic",
    "codeExample": "from sklearn.neighbors import KNeighborsClassifier\nknn = KNeighborsClassifier(n_neighbors=5, metric='euclidean')\nknn.fit(X_train, y_train)\npreds = knn.predict(X_test)"
  },
  {
    "id": 9,
    "question": "What is inductive bias in Supervised Learning, and why is it necessary?",
    "shortAnswer": "The set of explicit mathematical assumptions a learning algorithm makes to generalize from observed training samples to unseen data.",
    "explanation": "Without inductive bias (prior assumptions such as linearity, margin maximization, or smoothness), an algorithm would treat all unseen inputs as equally likely, rendering generalization mathematically impossible according to the No Free Lunch Theorem.",
    "hint": "Prior assumptions allowing extrapolation beyond memorized training points.",
    "level": "Expert",
    "codeExample": "# Linear Regression Inductive Bias: Target relationship is linear\n# Decision Tree Inductive Bias: Decision boundary consists of axis-aligned orthogonal hyperplanes"
  },
  {
    "id": 10,
    "question": "What is the role of the Decision Boundary in supervised classification models?",
    "shortAnswer": "A mathematical geometric hypersurface in feature space that separates different predicted class regions.",
    "explanation": "The decision boundary satisfies the condition where the model is equally uncertain between classes (e.g., P(y=1|x) = 0.5 or w^T x + b = 0). For linear models, the decision boundary is a flat hyperplane; for non-linear models (like kernel SVMs or deep nets), it can form complex curved manifolds.",
    "hint": "The geometric contour where predicted probability equals the threshold 0.5.",
    "level": "Moderate",
    "codeExample": "# Linear Decision Boundary Equation: w1*x1 + w2*x2 + b = 0\n# Separates Class 0 (w^T x + b < 0) from Class 1 (w^T x + b > 0)"
  },
  {
    "id": 11,
    "question": "What is the primary trade-off illustrated by the Bias-Variance Decomposition in Supervised Learning?",
    "shortAnswer": "Total Expected Error = Bias^2 + Variance + Irreducible Error; reducing underfitting bias increases overfitting variance.",
    "explanation": "Bias represents error stemming from erroneous simplifying assumptions in the learning algorithm (underfitting). Variance represents error from sensitivity to small fluctuations and random noise in the training set (overfitting). Optimal model complexity minimizes their combined sum.",
    "hint": "Underfitting (high bias) vs Overfitting (high variance).",
    "level": "Moderate",
    "codeExample": "# High Bias: Linear model on complex polynomial data\n# High Variance: Degree-20 polynomial fitting training noise"
  },
  {
    "id": 12,
    "question": "What is the difference between Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent?",
    "shortAnswer": "Batch uses the entire dataset per update; SGD uses 1 sample; Mini-batch uses small subsets (e.g., 32, 64 samples).",
    "explanation": "Batch Gradient Descent computes exact gradients over all N samples per step (slow for large datasets). SGD updates weights per individual sample (fast, but noisy trajectory). Mini-Batch GD strikes the optimal balance by leveraging vectorized GPU parallelization and providing smooth, stable gradient estimates.",
    "hint": "How many training examples are processed before updating model parameters w.",
    "level": "Moderate",
    "codeExample": "# Mini-batch update loop\nfor batch_X, batch_y in get_batches(X, y, batch_size=32):\n    grad = compute_gradient(batch_X, batch_y, w)\n    w -= learning_rate * grad"
  },
  {
    "id": 13,
    "question": "Why is Feature Scaling (Normalization / Standardization) critical for distance-based and gradient-based supervised algorithms?",
    "shortAnswer": "Features with large numerical ranges dominate Euclidean distance calculations and distort gradient descent trajectories.",
    "explanation": "If feature x_1 ranges from 0 to 1 and feature x_2 ranges from 0 to 1,000,000, distance metrics (in k-NN, SVM) will ignore x_1 completely. Additionally, unscaled features create elongated, elliptical loss contours causing gradient descent to oscillate inefficiently rather than marching directly toward the minimum.",
    "hint": "Equalizing feature variance prevents large magnitude columns from overwhelming the algorithm.",
    "level": "Moderate",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)"
  },
  {
    "id": 14,
    "question": "What is the difference between L1 (Lasso) and L2 (Ridge) Regularization in supervised learning?",
    "shortAnswer": "L1 adds sum of absolute weights (\u03bb \u2211|w_j|) causing sparsity; L2 adds sum of squared weights (\u03bb \u2211w_j^2) shrinking weights smoothly.",
    "explanation": "Lasso regularization drives non-essential feature weights to absolute zero, performing automatic feature selection. Ridge regularization shrinks weights toward zero without forcing exact zeros, handling multicollinearity effectively.",
    "hint": "Diamond constraint boundary (L1 - sparse) vs Circular constraint boundary (L2 - weight shrinkage).",
    "level": "Expert",
    "codeExample": "from sklearn.linear_model import Lasso, Ridge\nlasso = Lasso(alpha=0.1) # Sparsity / Feature Selection\nridge = Ridge(alpha=1.0) # Multicollinearity suppression"
  },
  {
    "id": 15,
    "question": "What is the purpose of a Validation Set in the Supervised Learning training pipeline?",
    "shortAnswer": "To tune hyperparameters and evaluate model selection without leaking test set information.",
    "explanation": "Training data optimizes internal model parameters (weights w, biases b). Validation data guides human hyperparameter choices (learning rate \u03b1, regularization strength \u03bb, tree depth). Test data remains strictly untouched until final performance reporting to avoid optimistic data leakage.",
    "hint": "Hyperparameter tuning benchmark distinct from the final unpolluted test set.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import train_test_split\nX_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nX_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42)"
  },
  {
    "id": 16,
    "question": "How does Logistic Regression output calibrated probability estimates for binary classification?",
    "shortAnswer": "By mapping the real-valued linear logit z = w^T x + b through the standard logistic sigmoid function \u03c3(z) = 1 / (1 + e^-z).",
    "explanation": "The linear combination z \u2208 (-\u221e, +\u221e) is squashed into the valid probability range (0, 1) by \u03c3(z). The output is interpreted as the posterior class probability P(y = 1 | x; w, b). If P \u2265 0.5, class 1 is predicted; otherwise class 0.",
    "hint": "Squashing real numbers from negative infinity to positive infinity into [0, 1].",
    "level": "Moderate",
    "codeExample": "def sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-z))\n\nprob = sigmoid(np.dot(w, x) + b)"
  },
  {
    "id": 17,
    "question": "What is a Confusion Matrix, and what are its four fundamental components?",
    "shortAnswer": "A 2x2 contingency table showing True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN).",
    "explanation": "The confusion matrix summarizes classification predictions against true labels. TP: correctly predicted positive; TN: correctly predicted negative; FP (Type I error): incorrectly predicted positive; FN (Type II error): incorrectly predicted negative.",
    "hint": "Type I (False Alarm) and Type II (Missed Detection) error summary.",
    "level": "Basic",
    "codeExample": "from sklearn.metrics import confusion_matrix\ncm = confusion_matrix(y_true, y_pred)\n# [[TN, FP],\n#  [FN, TP]]"
  },
  {
    "id": 18,
    "question": "Why is Accuracy often a misleading metric in imbalanced supervised classification problems?",
    "shortAnswer": "A naive model predicting only the majority class achieves high accuracy while completely failing to detect rare positive events.",
    "explanation": "In fraud detection where 99.9% of transactions are legitimate and 0.1% are fraud, a dumb dummy model predicting 'Legitimate' for every transaction achieves 99.9% accuracy, but has 0% recall on fraud. Metrics like Precision, Recall, F1-Score, and PR-AUC must be used instead.",
    "hint": "99.9% accuracy does not mean a fraud detection system is working.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import classification_report\nprint(classification_report(y_true, y_pred, target_names=['Legitimate', 'Fraud']))"
  },
  {
    "id": 19,
    "question": "What is the mathematical definition of Precision and Recall?",
    "shortAnswer": "Precision = TP / (TP + FP) (exactness of positive predictions); Recall = TP / (TP + FN) (completeness of finding all actual positives).",
    "explanation": "Precision answers: 'Out of all instances predicted as positive, how many were truly positive?' Recall (Sensitivity) answers: 'Out of all actual positive cases in the population, how many did the model capture?'",
    "hint": "Precision penalizes False Positives; Recall penalizes False Negatives.",
    "level": "Moderate",
    "codeExample": "precision = tp / (tp + fp)\nrecall = tp / (tp + fn)\nf1 = 2 * (precision * recall) / (precision + recall)"
  },
  {
    "id": 20,
    "question": "What is the F1-Score, and why does it use the Harmonic Mean rather than the Arithmetic Mean?",
    "shortAnswer": "F1 is the harmonic mean of Precision and Recall: 2*(P*R)/(P+R); the harmonic mean severely penalizes extreme imbalances between the two.",
    "explanation": "If a model has Precision = 1.0 and Recall = 0.0, its arithmetic mean is 0.5 (falsely suggesting moderate quality), whereas its harmonic mean (F1) correctly drops to 0.0. The harmonic mean gives equal weight to both metrics and punishes models that sacrifice one for the other.",
    "hint": "Harmonic mean approaches zero if either precision or recall approaches zero.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import f1_score\nf1 = f1_score(y_test, y_pred)"
  },
  {
    "id": 21,
    "question": "How does a Decision Tree make supervised predictions?",
    "shortAnswer": "By recursively partitioning the feature space into orthogonal axis-aligned hyper-rectangles using greedy split criteria like Gini Impurity or Information Gain.",
    "explanation": "At each node, the decision tree algorithm tests all feature splits and selects the threshold that maximizes label purity (reducing variance for regression, reducing entropy/Gini for classification). Leaves output the majority class or average target value.",
    "hint": "Hierarchical series of if-else threshold rules learned from data.",
    "level": "Basic",
    "codeExample": "from sklearn.tree import DecisionTreeClassifier\ntree = DecisionTreeClassifier(max_depth=4, criterion='gini')\ntree.fit(X_train, y_train)"
  },
  {
    "id": 22,
    "question": "Why are unpruned Decision Trees highly prone to Overfitting?",
    "shortAnswer": "They continue splitting until every training sample is isolated into pure leaves, memorizing noise and outlier instances.",
    "explanation": "Without regularization constraints (such as `max_depth`, `min_samples_split`, or cost-complexity pruning), a tree will grow deep complex branch structures with high variance and zero training error that generalize poorly.",
    "hint": "Splitting down to single-sample pure leaves overfits training noise.",
    "level": "Moderate",
    "codeExample": "# Regularized Decision Tree to avoid overfitting\nregularized_tree = DecisionTreeClassifier(max_depth=5, min_samples_leaf=10)"
  },
  {
    "id": 23,
    "question": "What is Ensemble Learning, and how does Random Forest improve upon single Decision Trees?",
    "shortAnswer": "Ensemble learning combines multiple base models; Random Forest uses Bootstrap Aggregating (Bagging) and random feature sub-sampling to reduce variance.",
    "explanation": "Random Forest trains B deep, de-correlated decision trees on distinct bootstrap resamples of the dataset. At each split, only a random subset of m \u2248 sqrt(d) features is considered. Averaging across the ensemble cancels out individual tree variance without increasing bias.",
    "hint": "Bagging + Random feature sub-spacing decorrelates individual decision trees.",
    "level": "Moderate",
    "codeExample": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=100, max_features='sqrt', random_state=42)\nrf.fit(X_train, y_train)"
  },
  {
    "id": 24,
    "question": "What is Gradient Boosting (GBDT), and how does its training procedure differ fundamentally from Bagging?",
    "shortAnswer": "Boosting trains trees sequentially, where each new tree fits the pseudo-residuals (negative gradients) of the previous ensemble.",
    "explanation": "While Bagging trains independent models in parallel to reduce variance, Boosting trains shallow base estimators sequentially to reduce bias. Each subsequent tree models the residual errors made by the current collective ensemble: F_m(x) = F_{m-1}(x) + \u03b7 * h_m(x).",
    "hint": "Sequential residual correction vs parallel independent averaging.",
    "level": "Expert",
    "codeExample": "from sklearn.ensemble import GradientBoostingClassifier\ngb = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3)\ngb.fit(X_train, y_train)"
  },
  {
    "id": 25,
    "question": "What is the Maximum Margin principle in Support Vector Machines (SVM)?",
    "shortAnswer": "SVM finds the separating hyperplane that maximizes the geometric distance (margin) to the closest data points of any class (Support Vectors).",
    "explanation": "The margin is 2 / ||w||. Maximizing the margin is equivalent to minimizing (1/2) ||w||^2 subject to the classification constraint y_i(w^T x_i + b) \u2265 1. Maximizing margin minimizes the theoretical upper bound on generalization error according to Vapnik-Chervonenkis (VC) theory.",
    "hint": "Widest possible street separating the positive and negative class points.",
    "level": "Expert",
    "codeExample": "from sklearn.svm import SVC\nsvm = SVC(kernel='linear', C=1.0)\nsvm.fit(X_train, y_train)"
  },
  {
    "id": 26,
    "question": "How does the 'Kernel Trick' allow Support Vector Machines to separate non-linearly separable data?",
    "shortAnswer": "By implicitly mapping inputs into higher-dimensional Hilbert spaces using inner product kernel functions K(x_i, x_j) without explicit coordinates.",
    "explanation": "According to Cover's Theorem, non-linear patterns in \u211d^d are more likely to be linearly separable when projected into a higher-dimensional space \u211d^D. The kernel trick computes the inner product <\u03c6(x_i), \u03c6(x_j)> directly via functions like RBF / Gaussian kernel K(u, v) = exp(-\u03b3 ||u - v||^2), avoiding exponential coordinate computation.",
    "hint": "Implicit high-dimensional inner products without computing transformed feature coordinates.",
    "level": "Expert",
    "codeExample": "# RBF Non-Linear Kernel SVM\nrbf_svm = SVC(kernel='rbf', gamma='scale', C=10.0)"
  },
  {
    "id": 27,
    "question": "What is K-Fold Cross-Validation, and why is Stratified K-Fold preferred for classification?",
    "shortAnswer": "K-Fold splits data into K subsets, training on K-1 and testing on 1 repeatedly; Stratified K-Fold preserves original class proportions in each fold.",
    "explanation": "Standard K-Fold randomly assigns instances, which can result in rare classes being omitted entirely from certain validation folds. Stratified K-Fold ensures each fold has the exact same class percentage ratio as the full dataset, preventing validation bias.",
    "hint": "Preserving target label percentages across every cross-validation fold.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import StratifiedKFold, cross_val_score\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=skf, scoring='f1_macro')"
  },
  {
    "id": 28,
    "question": "What is Data Leakage in a Supervised Learning pipeline, and how can it be strictly prevented?",
    "shortAnswer": "When information from outside the training dataset (e.g., test split statistics or future target data) unintentionally leaks into model training.",
    "explanation": "Data leakage occurs when preprocessing transformations (like StandardScaler, Imputer, or Target Encoding) are fitted on the entire dataset prior to splitting. To prevent leakage, all transformers must be fitted strictly on training data only, easily enforced using `sklearn.pipeline.Pipeline`.",
    "hint": "Never call fit_transform on the combined dataset before splitting.",
    "level": "Moderate",
    "codeExample": "from sklearn.pipeline import Pipeline\npipeline = Pipeline([\n    ('scaler', StandardScaler()),\n    ('classifier', LogisticRegression())\n])\npipeline.fit(X_train, y_train) # Safe from leakage"
  },
  {
    "id": 29,
    "question": "What is the ROC curve and the AUC (Area Under the Curve) metric?",
    "shortAnswer": "The ROC curve plots True Positive Rate vs False Positive Rate across all classification thresholds; AUC measures overall ranking capability (0.5 = random, 1.0 = perfect).",
    "explanation": "Receiver Operating Characteristic (ROC) illustrates the diagnostic trade-off between TPR (Sensitivity) and FPR (1 - Specificity) as the classification threshold slides from 0 to 1. ROC-AUC evaluates how well the model ranks positive instances higher than negative instances, invariant to chosen decision thresholds.",
    "hint": "Threshold-independent evaluation curve and area.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import roc_auc_score, roc_curve\nfpr, tpr, thresholds = roc_curve(y_test, y_probs)\nauc_score = roc_auc_score(y_test, y_probs)"
  },
  {
    "id": 30,
    "question": "What is the Multi-class Softmax activation function and its corresponding loss function?",
    "shortAnswer": "Softmax converts raw logits into a normalized probability distribution summing to 1; Categorical Cross-Entropy is its loss function.",
    "explanation": "For K classes, Softmax computes P(y = k | x) = exp(z_k) / \u2211_{j=1}^K exp(z_j). Categorical Cross-Entropy loss L = - \u2211_{k=1}^K y_k ln(p_k) penalizes divergence between the one-hot target vector y and predicted probabilities p.",
    "hint": "Generalization of logistic sigmoid and binary cross-entropy to K > 2 mutually exclusive classes.",
    "level": "Expert",
    "codeExample": "def softmax(z):\n    exp_z = np.exp(z - np.max(z)) # Numerical stability\n    return exp_z / np.sum(exp_z, axis=-1, keepdims=True)"
  }
];

export default questions;
