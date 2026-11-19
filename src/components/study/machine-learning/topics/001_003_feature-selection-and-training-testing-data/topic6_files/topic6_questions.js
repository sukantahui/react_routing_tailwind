/**
 * Topic 6: Training Dataset
 * 30 Authentic Graded Assessment Questions (MAKAUT BCAC701B Standard)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 
 * Tiers:
 * - Foundation (Q1 - Q8)
 * - Mechanics & Optimization (Q9 - Q16)
 * - Architecture & Data Hygiene (Q17 - Q24)
 * - Industrial Scalability & Production (Q25 - Q30)
 */

const questions = [
  // -------------------------------------------------------------------------
  // TIER 1: FOUNDATION (Q1 - Q8)
  // -------------------------------------------------------------------------
  {
    id: 1,
    question: "What is the formal role of the Training Dataset (D_train) in supervised machine learning?",
    shortAnswer: "It is the only corpus exposed to the learning algorithm for estimating internal model parameters via Empirical Risk Minimization.",
    explanation: "In supervised learning, the model is tasked with approximating an unknown joint distribution P(X, Y). The training dataset D_train = {(x_i, y_i)} provides empirical evidence from which the algorithm optimizes its parameter vector theta (such as regression weights or neural network biases) by minimizing an empirical loss function.",
    hint: "Recall that parameter estimation occurs strictly on data visible before evaluation.",
    level: "Foundation",
    codeExample: "# Training dataset parameter estimation\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\n# Model computes weights strictly using X_train and y_train\nmodel.fit(X_train, y_train)\nprint('Estimated weights:', model.coef_)"
  },
  {
    id: 2,
    question: "How does Empirical Risk (R_emp) fundamentally differ from True Risk (R_true)?",
    shortAnswer: "Empirical Risk is the measurable sample average loss over D_train, whereas True Risk is the uncomputable expected loss over the entire underlying data-generating distribution P(X, Y).",
    explanation: "True Risk R_true(theta) = E_{(x,y)~P}[L(f(x; theta), y)] requires integrating over all possible data points across the universe, which is inaccessible. Empirical Risk R_emp(theta) = (1/N) * sum(L(f(x_i; theta), y_i)) serves as an empirical estimator calculated over the finite training set.",
    hint: "Think about the difference between a sample statistic and a population parameter.",
    level: "Foundation",
    codeExample: "# Empirical Risk Calculation on Training Data\nimport numpy as np\n\ny_pred_train = model.predict(X_train)\n# R_emp (Mean Squared Error on training set)\nempirical_risk = np.mean((y_train - y_pred_train) ** 2)"
  },
  {
    id: 3,
    question: "Under what core statistical assumption is Empirical Risk Minimization (ERM) guaranteed to converge to True Risk as sample size grows?",
    shortAnswer: "The Independent and Identically Distributed (i.i.d.) assumption under the Law of Large Numbers.",
    explanation: "ERM relies on the assumption that training instances are sampled independently from the identical probability distribution P(X, Y) that governs future unseen test instances. As N_train approaches infinity, the Law of Large Numbers guarantees that empirical averages converge almost surely to their theoretical expectations.",
    hint: "What does the 'i.i.d.' acronym stand for in probability theory?",
    level: "Foundation",
    codeExample: "# i.i.d. random sampling simulation\nimport numpy as np\n\n# Samples drawn independently from the exact same distribution\nX_train = np.random.normal(loc=0.0, scale=1.0, size=(1000, 5))\ny_train = 2.0 * X_train[:, 0] + np.random.normal(0, 0.1, size=1000)"
  },
  {
    id: 4,
    question: "Why is a model that achieves exactly zero training error (R_emp = 0) often undesirable in practical machine learning?",
    shortAnswer: "Zero training error typically signals that the model has memorized the idiosyncratic noise and outliers in D_train (overfitting) rather than learning the underlying signal.",
    explanation: "Real-world data contains stochastic noise. If a hypothesis space has high expressive capacity (e.g., a deep decision tree or degree-15 polynomial), it can interpolate every training point, driving training error to zero while causing the generalization error on unseen test data to explode.",
    hint: "Recall the trade-off between bias and variance.",
    level: "Foundation",
    codeExample: "# Overfitting demonstration with DecisionTree\nfrom sklearn.tree import DecisionTreeRegressor\n\n# Unconstrained tree achieves 0 training error by memorizing samples\noverfit_tree = DecisionTreeRegressor(max_depth=None)\noverfit_tree.fit(X_train, y_train)\nprint('Train MSE:', mean_squared_error(y_train, overfit_tree.predict(X_train))) # 0.0"
  },
  {
    id: 5,
    question: "What is the critical distinction between model parameters and hyperparameters regarding the training dataset?",
    shortAnswer: "Parameters are learned directly from D_train via optimization, while hyperparameters are configured externally to control the learning process and must not be tuned on D_train.",
    explanation: "Parameters (e.g., OLS weights w, neural network synaptic weights, logistic intercept b) are estimated by minimizing loss on D_train. Hyperparameters (e.g., polynomial degree, learning rate, regularization strength lambda, tree depth) govern model capacity and must be tuned on a separate validation set or cross-validation fold.",
    hint: "Which values are calculated inside .fit() versus passed into the constructor __init__()?",
    level: "Foundation",
    codeExample: "# Hyperparameter vs Parameter\nfrom sklearn.linear_model import Ridge\n\n# alpha=0.1 is a HYPERPARAMETER chosen by the engineer\nmodel = Ridge(alpha=0.1)\n\n# model.coef_ and model.intercept_ are PARAMETERS learned from D_train\nmodel.fit(X_train, y_train)"
  },
  {
    id: 6,
    question: "Why is it strictly forbidden to apply data preprocessing transformations (e.g., StandardScaler) across the combined dataset before isolating D_train?",
    shortAnswer: "It introduces data leakage: global parameters (mean, standard deviation) bleed test distribution information into the training phase, invalidating evaluation.",
    explanation: "StandardScaler computes mu = (1/N) * sum(x) and sigma. If computed across the entire corpus before splitting, information from the future test set contaminates the features of D_train. The model trains on representations biased by test statistics, causing spuriously optimistic validation metrics.",
    hint: "What happens if an extreme outlier in the test set alters the mean computed for training?",
    level: "Foundation",
    codeExample: "# CORRECT Isolation Pattern\nfrom sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\n# 1. Fit ONLY on training set\nX_train_scaled = scaler.fit_transform(X_train)\n\n# 2. Transform test set using frozen training parameters\nX_test_scaled = scaler.transform(X_test)"
  },
  {
    id: 7,
    question: "What does the term 'Hypothesis Space' (H) signify in the context of training datasets?",
    shortAnswer: "The set of all candidate functions that the learning algorithm can select from when minimizing empirical loss over D_train.",
    explanation: "The learning algorithm searches within an inductive hypothesis space H (e.g., all linear hyperplanes, all decision trees of depth <= 5, all neural architectures of a given shape). The training dataset guides the selection of the specific candidate function h* in H that minimizes regularized empirical risk.",
    hint: "Consider what class of mathematical functions your model algorithm is allowed to output.",
    level: "Foundation",
    codeExample: "# Selecting hypothesis spaces\n# H1: Linear hypothesis space\nfrom sklearn.linear_model import LinearRegression\n# H2: Non-linear kernel hypothesis space\nfrom sklearn.svm import SVR\n\nh1 = LinearRegression() # Search restricted to hyperplanes\nh2 = SVR(kernel='rbf')   # Search allows infinite-dimensional RKHS"
  },
  {
    id: 8,
    question: "What is the Golden Rule of Machine Learning regarding the lifecycle of the training dataset?",
    shortAnswer: "The model and all its preprocessing transformations must be fitted solely on D_train; the test dataset must remain an untouched vault until final verification.",
    explanation: "To preserve statistical honesty, every decision—including missing value imputation, outlier clipping thresholds, categorical encoding maps, feature scaling bounds, and weight estimation—must be computed exclusively from D_train. The test set represents the unseen future world.",
    hint: "Think of D_train as the textbook and the test set as the sealed final exam paper.",
    level: "Foundation",
    codeExample: "# Golden Rule: Encapsulate in Pipeline\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\n# Both scaler and classifier learn exclusively from D_train\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('classifier', LogisticRegression())\n])\npipe.fit(X_train, y_train)"
  },

  // -------------------------------------------------------------------------
  // TIER 2: MECHANICS & OPTIMIZATION (Q9 - Q16)
  // -------------------------------------------------------------------------
  {
    id: 9,
    question: "How does Batch Gradient Descent compute parameter updates over the training dataset D_train?",
    shortAnswer: "It computes the exact gradient of the empirical loss averaged across all N_train training instances before updating parameters once per epoch.",
    explanation: "In full Batch Gradient Descent, the weight update rule is w_{t+1} = w_t - eta * (1 / N_train) * sum_{i=1}^{N_train} grad_w L(f(x_i), y_i). Because every sample in D_train is evaluated for each update step, the gradient trajectory is smooth and deterministic, but computationally prohibitive for large N_train.",
    hint: "Consider how many samples contribute to a single step of weight adjustment.",
    level: "Mechanics",
    codeExample: "# Batch Gradient Descent Update Step\ngradient_w = np.zeros_like(weights)\nfor i in range(N_train):\n    error = np.dot(weights, X_train[i]) - y_train[i]\n    gradient_w += error * X_train[i]\n\n# Update weights once per epoch using full training batch\nweights -= learning_rate * (gradient_w / N_train)"
  },
  {
    id: 10,
    question: "Why is Mini-Batch Gradient Descent widely preferred over full Batch Gradient Descent on large training datasets?",
    shortAnswer: "It balances computational efficiency, vectorization on GPUs, and injects helpful stochastic noise to escape saddle points while calculating updates over subsets B << N_train.",
    explanation: "Mini-batch updates compute gradients over subsets of size B (typically 32, 64, or 256) instead of N_train = 1,000,000. This enables frequent parameter updates per epoch, reduces memory footprint, fits into GPU caches, and introduces stochasticity that prevents optimization from getting trapped in shallow local minima.",
    hint: "Think about memory constraints and the speed of weight updates.",
    level: "Mechanics",
    codeExample: "# Mini-Batch SGD Partitioning over D_train\nbatch_size = 64\nindices = np.random.permutation(len(X_train))\nfor start_idx in range(0, len(X_train), batch_size):\n    batch_idx = indices[start_idx : start_idx + batch_size]\n    X_batch, y_batch = X_train[batch_idx], y_train[batch_idx]\n    # Compute gradient and update parameters on mini-batch"
  },
  {
    id: 11,
    question: "How is High Bias (Underfitting) distinctly identified from a model's Learning Curve as N_train increases?",
    shortAnswer: "Both Training Error (E_in) and Validation Error (E_out) plateau at an unacceptably high error rate with an almost negligible gap between them.",
    explanation: "When a model has high bias, its hypothesis space H is too restrictive to fit the true underlying data manifold. Even when N_train is tiny, the model struggles; as N_train scales to thousands of samples, E_in rises slightly to meet E_out at a high plateau. Collecting additional training instances will not improve accuracy.",
    hint: "Observe whether the gap between training and test loss is wide or narrow when error is high.",
    level: "Mechanics",
    codeExample: "# Diagnosing High Bias with learning_curve\nfrom sklearn.model_selection import learning_curve\n\ntrain_sizes, train_scores, test_scores = learning_curve(\n    estimator=LinearRegression(), X=X_complex_nonlinear, y=y,\n    train_sizes=np.linspace(0.1, 1.0, 5), cv=5\n)\n# Both train_scores and test_scores plateau at low values (high error)"
  },
  {
    id: 12,
    question: "How is High Variance (Overfitting) distinctly diagnosed from a model's Learning Curve?",
    shortAnswer: "Training Error (E_in) remains exceptionally low across sample sizes, while Validation Error (E_out) is substantially higher, revealing a persistently wide generalization gap.",
    explanation: "In high variance regimes, the model easily memorizes training instances, keeping E_in close to zero. However, because it fits spurious noise, E_out remains high. Increasing N_train gradually provides more constraints, causing E_out to slope downward toward E_in and narrowing the generalization gap.",
    hint: "Look for a large chasm between the training performance line and the validation performance line.",
    level: "Mechanics",
    codeExample: "# High Variance Signature: Wide Generalization Gap\n# E_in: 99.8% accuracy\n# E_out: 74.2% accuracy\ngap = train_score.mean() - val_score.mean() # 25.6% gap indicates high variance"
  },
  {
    id: 13,
    question: "According to Vapnik-Chervonenkis (VC) theory, what is the asymptotic relationship between the required training set size N_train, hypothesis capacity d_VC, and generalization tolerance epsilon?",
    shortAnswer: "The sample complexity scales as N_train = O((d_VC + ln(1/delta)) / epsilon^2).",
    explanation: "VC dimension measures the capacity of a hypothesis class to shatter points. To guarantee that True Risk exceeds Empirical Risk by at most epsilon with probability at least 1 - delta, the training dataset size must scale linearly with the model's VC dimension d_VC and inversely with the square of the desired error tolerance epsilon.",
    hint: "If a model has twice as many parameters/capacity, how does the needed data scale?",
    level: "Mechanics",
    codeExample: "# VC Sample Complexity approximation\ndef estimate_required_samples(vc_dim, epsilon=0.05, delta=0.01):\n    return int((vc_dim + np.log(1.0 / delta)) / (epsilon ** 2))\n\nprint('Samples needed for VC=10:', estimate_required_samples(10)) # ~4184 samples"
  },
  {
    id: 14,
    question: "How does L2 Regularization (Ridge) mathematically alter the Empirical Risk Minimization objective on D_train?",
    shortAnswer: "It appends a squared Frobenius/L2 norm penalty (lambda/2) * ||w||_2^2 to the empirical loss, penalizing large parameter magnitudes and restricting effective model capacity.",
    explanation: "Without regularization, ERM may inflate weights arbitrarily to fit noisy training points. Ridge modifies the objective to min_w [ (1/N) * sum(L(x_i, y_i)) + (lambda/2) * sum(w_j^2) ]. This induces a shrinkage effect, pushing weights toward zero and pulling the model back from high variance toward lower variance.",
    hint: "Recall how Ridge regression prevents weights from blowing up.",
    level: "Mechanics",
    codeExample: "# Regularized ERM Objective Function\ndef regularized_loss(w, X_train, y_train, lambda_reg=0.1):\n    N = len(y_train)\n    residuals = y_train - np.dot(X_train, w)\n    mse = (1.0 / (2.0 * N)) * np.sum(residuals ** 2)\n    l2_penalty = (lambda_reg / 2.0) * np.sum(w ** 2)\n    return mse + l2_penalty"
  },
  {
    id: 15,
    question: "What is the impact of training dataset sample size N_train on the condition number and stability of Ordinary Least Squares (OLS)?",
    shortAnswer: "When N_train < p (features exceed samples), the Gram matrix X^T X is singular (rank deficient) and cannot be inverted; as N_train >> p, X^T X becomes well-conditioned and variance shrinks.",
    explanation: "OLS parameter estimation requires solving w = (X^T X)^{-1} X^T y. If N_train < p, the rank of X is at most N_train, making X^T X non-invertible with infinite possible solutions. As N_train expands well beyond p, the sample covariance matrix stabilizes, condition number decreases, and the variance of parameter estimates scales as O(sigma^2 / N_train).",
    hint: "What happens when you have more equations than unknowns versus fewer equations than unknowns?",
    level: "Mechanics",
    codeExample: "# Matrix invertibility vs sample size\nimport numpy as np\n\np = 50\n# N_train < p: Non-invertible\nX_small = np.random.randn(20, p)\n# np.linalg.inv(X_small.T @ X_small) -> LinAlgError: Singular matrix!\n\n# N_train >> p: Invertible and stable\nX_large = np.random.randn(500, p)\ninv_cov = np.linalg.inv(X_large.T @ X_large) # Stable"
  },
  {
    id: 16,
    question: "Why does the Empirical Risk (training loss) almost universally underestimate the true out-of-sample generalization error?",
    shortAnswer: "Because the parameter vector theta_hat was explicitly selected to minimize loss on that specific sample D_train (Optimism of Training Error).",
    explanation: "The optimization algorithm searches through candidate hypotheses specifically to find the one that fits D_train best. This causes the parameters to adapt not only to the true population signal but also to the accidental sample quirks in D_train. Consequently, E[R_emp(theta_hat)] < E[R_true(theta_hat)], known as the optimism bias.",
    hint: "Why does a customized tailor-made suit fit the tailor's model better than a random passerby?",
    level: "Mechanics",
    codeExample: "# Optimism Bias demonstration\ntrain_errors = []\ntest_errors = []\nfor trial in range(100):\n    model.fit(X_tr, y_tr)\n    train_errors.append(mean_squared_error(y_tr, model.predict(X_tr)))\n    test_errors.append(mean_squared_error(y_te, model.predict(X_te)))\n\nprint('Mean Train Error:', np.mean(train_errors)) # Always lower\nprint('Mean Test Error:', np.mean(test_errors))   # True generalization"
  },

  // -------------------------------------------------------------------------
  // TIER 3: ARCHITECTURE & DATA HYGIENE (Q17 - Q24)
  // -------------------------------------------------------------------------
  {
    id: 17,
    question: "In what exact order must Feature Selection and Train-Test Splitting be executed in a machine learning workflow?",
    shortAnswer: "Train-Test Splitting MUST occur first; feature selection algorithms must be executed exclusively on the training subset.",
    explanation: "If feature selection (e.g., ANOVA F-test, SelectKBest, mutual information) is performed on the combined dataset, the selector selects features that correlate with target labels across test samples. Even if the model is later trained only on train samples, the feature space was chosen using test information, creating severe selection bias.",
    hint: "Never choose which columns to keep using the entire spreadsheet before splitting.",
    level: "Architecture",
    codeExample: "# PROPER PIPELINE: Split FIRST, Select SECOND\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.feature_selection import SelectKBest, f_regression\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nselector = SelectKBest(score_func=f_regression, k=5)\n# Fit selector strictly on training set\nX_train_selected = selector.fit_transform(X_train, y_train)\nX_test_selected = selector.transform(X_test)"
  },
  {
    id: 18,
    question: "How does severe Class Imbalance (e.g., 98:2) distort Empirical Risk Minimization, and how is D_train calibrated to counter it?",
    shortAnswer: "Standard ERM assigns equal weight to all samples, allowing a trivial majority-class classifier to achieve 98% accuracy; Cost-Sensitive ERM or class weighting rebalances loss penalties.",
    explanation: "Because ERM minimizes (1/N) * sum(L_i), misclassifying 2 rare default events contributes negligible penalty compared to misclassifying 98 non-defaults. By applying class weighting w_c = N_train / (2 * N_c), the loss on each minority sample is amplified 49-fold, forcing the optimizer to establish a viable decision boundary.",
    hint: "How do you make the optimizer care equally about a rare class?",
    level: "Architecture",
    codeExample: "# Cost-Sensitive ERM via class_weight='balanced'\nfrom sklearn.linear_model import LogisticRegression\n\n# Penalizes minority errors proportionally to class frequency\nclf = LogisticRegression(class_weight='balanced')\nclf.fit(X_train, y_train)"
  },
  {
    id: 19,
    question: "Why must Synthetic Minority Over-sampling Technique (SMOTE) be applied ONLY to the training dataset and NEVER to the test set?",
    shortAnswer: "Applying SMOTE to test data violates evaluation validity by creating synthetic clones of test instances in train and fabricating synthetic test points that don't exist in reality.",
    explanation: "SMOTE creates synthetic examples along feature-space line segments between nearest neighbors. If applied before splitting, test samples are interpolated with train samples, leaking exact identities. Furthermore, the test set must reflect the real-world operational prevalence; balancing the test set produces fictional metrics.",
    hint: "Does real-world deployment data come magically pre-balanced?",
    level: "Architecture",
    codeExample: "# Correct SMOTE placement using imbalanced-learn Pipeline\nfrom imblearn.pipeline import Pipeline\nfrom imblearn.over_sampling import SMOTE\nfrom sklearn.ensemble import RandomForestClassifier\n\n# SMOTE is executed strictly on X_train during .fit()\npipeline = Pipeline([\n    ('smote', SMOTE(random_state=42)),\n    ('classifier', RandomForestClassifier())\n])\npipeline.fit(X_train, y_train)"
  },
  {
    id: 20,
    question: "How does Label Noise in D_train affect Squared Error loss compared to Huber Loss?",
    shortAnswer: "Squared Error penalizes outliers quadratically (e^2), allowing corrupted labels to derail the decision surface; Huber Loss caps large errors linearly, preserving robustness.",
    explanation: "If a human annotator mistakenly labels an obvious dog image as a cat in D_train, MSE squares this massive residual, generating huge gradient vectors that warp the model parameters to fit the corrupted artifact. Huber loss switches from quadratic to linear penalty |e| when |e| > delta, bounding the gradient influence.",
    hint: "Think about how quadratic growth explodes when error e is large.",
    level: "Architecture",
    codeExample: "# Robust Huber Loss vs MSE under Label Noise\nfrom sklearn.linear_model import HuberRegressor, LinearRegression\n\n# Resilient to training set label anomalies\nrobust_model = HuberRegressor(epsilon=1.35)\nrobust_model.fit(X_train_noisy, y_train_noisy)\n\n# Vulnerable to label anomalies\nfragile_model = LinearRegression()\nfragile_model.fit(X_train_noisy, y_train_noisy)"
  },
  {
    id: 21,
    question: "What is Target Encoding Leakage in D_train, and how is out-of-fold target encoding used to protect the training set?",
    shortAnswer: "Direct target encoding replaces categories with their global mean target, causing extreme target leakage; out-of-fold encoding calculates category means excluding the target sample.",
    explanation: "If category 'Kolkata' is replaced by mean(y) across all training samples where city=='Kolkata', the model memorizes individual labels if sample size in that category is small. To prevent this, K-fold target encoding computes the category target average on K-1 folds and applies it to the holdout training fold, preventing self-prediction.",
    hint: "If a category has only one sample, what does its mean equal?",
    level: "Architecture",
    codeExample: "# Out-of-Fold Target Encoding with Category Encoders\nfrom category_encoders import TargetEncoder\n\n# Internal cross-fitting prevents target memorization on D_train\nencoder = TargetEncoder(cols=['neighborhood'], smoothing=10.0)\nX_train_encoded = encoder.fit_transform(X_train, y_train)\nX_test_encoded = encoder.transform(X_test)"
  },
  {
    id: 22,
    question: "What is Covariate Shift, and what statistical technique adapts D_train when P_train(X) differs from P_test(X)?",
    shortAnswer: "Covariate Shift occurs when the feature distribution P(X) changes between train and test while P(Y|X) remains fixed; Importance Weighting w(x) = P_test(x) / P_train(x) is applied.",
    explanation: "When training data is collected under different conditions than deployment (e.g., training medical diagnostics on urban Kolkata patients and deploying to rural Sundarbans), P(X) differs. By estimating the density ratio w(x_i) = P_test(x_i) / P_train(x_i), we can weight each training instance loss by w(x_i), aligning ERM with test distribution expectations.",
    hint: "How can you weight training samples according to how common they are in the test set?",
    level: "Architecture",
    codeExample: "# Importance Weighting for Covariate Shift\n# w_i estimates P_test(x_i) / P_train(x_i)\nsample_weights = compute_density_ratio(X_train, X_unlabeled_test)\nmodel.fit(X_train, y_train, sample_weight=sample_weights)"
  },
  {
    id: 23,
    question: "Why must Missing Value Imputation parameters (e.g., median, mode) be calculated strictly on D_train?",
    shortAnswer: "Computing the median across test data injects future distribution knowledge; D_test must be imputed using the training median values.",
    explanation: "If missing values in a feature are replaced with the global median of the entire dataset, any distribution shift present in the test set shifts the imputed value of training instances. Scikit-learn's `SimpleImputer` must call `.fit()` on X_train and only `.transform()` on X_test.",
    hint: "What should you do if an unseen production row arrives with a missing value?",
    level: "Architecture",
    codeExample: "# Safe Imputation Protocol\nfrom sklearn.impute import SimpleImputer\n\nimputer = SimpleImputer(strategy='median')\n# Learn median values exclusively from training set\nX_train_imp = imputer.fit_transform(X_train)\n# Apply training medians to test set\nX_test_imp = imputer.transform(X_test)"
  },
  {
    id: 24,
    question: "How does the Inductive Bias of a machine learning model interact with the training dataset?",
    shortAnswer: "Inductive bias represents the set of mathematical assumptions a model makes to generalize beyond D_train; without inductive bias, a model cannot predict on unseen inputs.",
    explanation: "No matter how large D_train is, it covers only a finite subset of feature space. Inductive bias (e.g., linearity in linear regression, spatial locality in CNNs, feature independence in Naive Bayes) dictates how the model interpolates between and extrapolates beyond observed training coordinates.",
    hint: "According to the No Free Lunch Theorem, can an algorithm learn without assumptions?",
    level: "Architecture",
    codeExample: "# Different inductive biases over same D_train\n# Bias 1: Function is planar\nfrom sklearn.linear_model import LinearRegression\n# Bias 2: Function is piecewise constant\nfrom sklearn.tree import DecisionTreeRegressor\n\nmodel1 = LinearRegression().fit(X_train, y_train)\nmodel2 = DecisionTreeRegressor().fit(X_train, y_train)"
  },

  // -------------------------------------------------------------------------
  // TIER 4: SCALABILITY & PRODUCTION (Q25 - Q30)
  // -------------------------------------------------------------------------
  {
    id: 25,
    question: "When the training dataset D_train exceeds available system RAM (e.g., 200 GB CSV), what architectural pattern allows out-of-core training?",
    shortAnswer: "Incremental / Out-of-core learning using mini-batch streaming estimators that support .partial_fit().",
    explanation: "When D_train cannot reside in RAM, data is read in sequential streaming chunks from disk or network storage. Algorithms such as `SGDClassifier`, `SGDRegressor`, or `IncrementalPCA` maintain internal parameter states and update them iteratively chunk-by-chunk via `partial_fit(X_chunk, y_chunk)`.",
    hint: "What method in Scikit-Learn allows continuous online learning chunk-by-chunk?",
    level: "Scalability & Production",
    codeExample: "# Out-of-core training with partial_fit\nfrom sklearn.linear_model import SGDClassifier\n\nmodel = SGDClassifier(loss='log_loss')\nclasses = np.array([0, 1])\n\n# Stream chunks directly from disk\nfor chunk in pd.read_csv('massive_training_data.csv', chunksize=10000):\n    X_chunk, y_chunk = preprocess(chunk)\n    model.partial_fit(X_chunk, y_chunk, classes=classes)"
  },
  {
    id: 26,
    question: "In time-series applications like WBSEDCL power grid demand forecasting, why is a random shuffle split on D_train fundamentally invalid?",
    shortAnswer: "Random shuffling shuffles future time-step observations into D_train, creating Lookahead Bias and destroying temporal autocorrelation.",
    explanation: "Time-series data exhibits serial correlation where y_t depends on y_{t-1}. If future records are shuffled into the training set, the model effectively peeks into future weather and demand trends to predict past intervals, resulting in artificial 99% accuracy that crashes in real-world deployment.",
    hint: "Can you train on tomorrow's temperature to predict yesterday's power load?",
    level: "Scalability & Production",
    codeExample: "# Chronological Forward Partition for Time-Series\n# Total: 35,040 SCADA intervals\nsplit_index = int(len(df) * 0.8)\n\n# D_train consists STRICTLY of historical past intervals\ntrain_df = df.iloc[:split_index]\n# Test represents genuine future operational timeline\ntest_df = df.iloc[split_index:]"
  },
  {
    id: 27,
    question: "In biometric or medical patient datasets (e.g., Kolkata hospital X-rays), why must D_train and D_test be partitioned using Group-Aware Splitting?",
    shortAnswer: "Multiple images belonging to the same patient must never be split across train and test; otherwise, the model memorizes patient anatomy rather than pathological disease indicators.",
    explanation: "If Patient #402 has 5 chest radiographs and 3 are assigned to D_train while 2 are assigned to D_test, the model learns idiosyncratic features of Patient #402 (bone density, posture, hardware artifacts). GroupKFold or GroupShuffleSplit guarantees patient-level isolation.",
    hint: "What metadata column groups multiple measurements from the exact same entity?",
    level: "Scalability & Production",
    codeExample: "# Group-Aware Training Split\nfrom sklearn.model_selection import GroupShuffleSplit\n\ngss = GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42)\ntrain_idx, test_idx = next(gss.split(X, y, groups=patient_ids))\n\nX_train, y_train = X[train_idx], y[train_idx]\nX_test, y_test = X[test_idx], y[test_idx]"
  },
  {
    id: 28,
    question: "What is Active Learning, and how does it optimize the curation of the training dataset D_train when unlabeled data is abundant but labeling is expensive?",
    shortAnswer: "It queries an oracle (human expert) to label only the most uncertain or informative unlabelled instances, maximizing model accuracy with minimal D_train size.",
    explanation: "In domains like oncology pathology or legal contract parsing, labeling 100,000 samples is economically infeasible. Active learning starts with a tiny D_train, trains a seed model, calculates uncertainty scores (e.g., entropy or margin sampling) over unlabelled pool U, and requests human labels strictly for borderline samples.",
    hint: "Focus labeling effort where the model is most confused.",
    level: "Scalability & Production",
    codeExample: "# Active Learning: Uncertainty Sampling\nprobs = model.predict_proba(X_unlabeled_pool)\n# Entropy = - sum(p * log(p))\nuncertainty = -np.sum(probs * np.log(probs + 1e-12), axis=1)\n# Pick top 50 most ambiguous samples to label and add to D_train\nhighest_uncertainty_idx = np.argsort(uncertainty)[-50:]"
  },
  {
    id: 29,
    question: "How does Distributed Data Parallelism (DDP) scale Empirical Risk Minimization across a cluster of 8 GPUs training on D_train?",
    shortAnswer: "D_train is sharded across GPUs; each GPU computes local gradients on its batch, and gradients are synchronized globally via an AllReduce operation before updating weights.",
    explanation: "In Distributed Data Parallelism, the full training corpus D_train is partitioned into 8 disjoint shards using a DistributedSampler. Each GPU hosts an identical copy of model parameters theta, runs forward/backward passes on its local mini-batch, and invokes an AllReduce collective communication primitive to average gradients before simultaneous weight updates.",
    hint: "Does each GPU hold a copy of the model or only a slice of data?",
    level: "Scalability & Production",
    codeExample: "# PyTorch Distributed Data Parallelism snippet\nfrom torch.utils.data.distributed import DistributedSampler\nimport torch.distributed as dist\n\nsampler = DistributedSampler(train_dataset, num_replicas=8, rank=local_rank)\n# Ensures each GPU processes an independent shard of D_train\ntrain_loader = DataLoader(train_dataset, batch_size=32, sampler=sampler)"
  },
  {
    id: 30,
    question: "What is Concept Drift, and what production monitoring strategy identifies when the live operational data has diverged from D_train?",
    shortAnswer: "Concept drift occurs when the mapping P(Y|X) changes over time; it is detected using Population Stability Index (PSI), Kolmogorov-Smirnov tests, and rolling prediction accuracy audits.",
    explanation: "Even if a model achieved exceptional performance on D_train, macroeconomic shifts, consumer trend evolutions, or sensor aging alter the operational environment. Monitoring Population Stability Index (PSI >= 0.2 indicates significant drift) or drift detection algorithms (e.g., ADWIN, DDM) triggers automated retraining pipelines to refresh D_train.",
    hint: "How do you know when your old textbook has become obsolete?",
    level: "Scalability & Production",
    codeExample: "# Population Stability Index (PSI) Drift Monitor\ndef calculate_psi(expected_train, actual_production, num_buckets=10):\n    # Compares training feature quantile distribution with live distribution\n    # PSI > 0.2 indicates severe drift requiring D_train refreshment\n    pass"
  }
];

export default questions;
