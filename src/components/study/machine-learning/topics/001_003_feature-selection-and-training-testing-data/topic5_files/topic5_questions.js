/**
 * =============================================================================
 * CODER & ACCOTAX ACADEMIC QUESTION BANK
 * Course: Introduction to Machine Learning (BCAC701B)
 * Module 3: Feature Selection and Training & Testing Data
 * Topic 5: Train-Test Split
 * Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions Across 4 Rigorous Pedagogical Tiers:
 * - Tier 1: Conceptual Foundations & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical Mechanics & Uncertainty Equations (Q9 - Q16)
 * - Tier 3: Applied Architecture, Topologies & Data Leakage (Q17 - Q24)
 * - Tier 4: Real-World Industrial Case Studies & Troubleshooting (Q25 - Q30)
 * =============================================================================
 */

const questions = [
  // =========================================================================
  // TIER 1: CONCEPTUAL FOUNDATIONS & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A junior analyst at a tech hub in Salt Lake trains a Random Forest model on 100% of available customer records and reports 99.8% training accuracy.",
    question: "Why is high empirical training accuracy an unreliable indicator of how well a model will perform in real-world deployment?",
    options: [
      "Because floating-point numbers lose precision during backpropagation.",
      "Because high-capacity models can simply memorize training noise and idiosyncratic quirks (overfitting), failing to generalize to unseen test data.",
      "Because Random Forests only work when sample sizes exceed one million rows.",
      "Because empirical risk is mathematically bounded by zero."
    ],
    correct: 1,
    explanation: "Minimizing empirical training error does not guarantee out-of-sample generalization. A complex model can achieve 100% accuracy on training data by memorizing training instances, but will fail catastrophically when deployed on novel data. The holdout test set provides an unbiased estimate of true risk.",
    practicalTip: "Never report training accuracy to stakeholders; business value is dictated solely by performance on independent, quarantined test sets."
  },
  {
    id: 2,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data engineer in Kolkata is preparing a train-test split for a loan default dataset where only 1.2% of applicants defaulted.",
    question: "Why is a standard random shuffle split hazardous for heavily imbalanced classification datasets?",
    options: [
      "Because random shuffling inverts positive numbers into negative numbers.",
      "Because uniform random partitioning can cause severe class distribution shift, potentially leaving the test fold with zero minority default instances.",
      "Because random splits require all features to follow a Gaussian distribution.",
      "Because random splitting increases matrix condition numbers."
    ],
    correct: 1,
    explanation: "With extreme class imbalance (1.2% defaults), uniform random shuffling subject to finite-sample sampling variance can easily produce a test set with 0 defaults (or an artificially inflated 4%). A Stratified split must be used to guarantee identical class prevalence across train and test.",
    practicalTip: "Always set `stratify=y` in `train_test_split` whenever performing classification, especially when minority class prevalence is below 15%."
  },
  {
    id: 3,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An ML architect explains the operational difference between the Validation Set and the Test Set to an engineering team.",
    question: "What is the specific, distinct role of the Validation Set compared to the locked Test Set?",
    options: [
      "The validation set is used to update neural network weights via gradient descent.",
      "The validation set is used for hyperparameter tuning and model architecture selection, while the test set is locked and evaluated once for final unbiased reporting.",
      "The validation set contains only categorical data, while the test set contains numerical data.",
      "The validation set is evaluated after the model is deployed in production."
    ],
    correct: 1,
    explanation: "The Training set fits parameters (weights/biases); the Validation set tunes hyperparameters (learning rate, tree depth, lambda) and chooses between models; the Test set is quarantined in a vault to give an unvarnished audit of production readiness.",
    practicalTip: "If you adjust your model hyperparameters based on the test set, you have turned the test set into a validation set and compromised its integrity."
  },
  {
    id: 4,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A research team in Barrackpore forecasts hourly electricity load for WBSEDCL across 365 days of chronological telemetry.",
    question: "Why must time-series forecasting datasets NEVER be partitioned using random shuffle splitting?",
    options: [
      "Because electricity grid sensors only measure alternating current.",
      "Because random shuffling introduces temporal lookahead data leakage (training on future events to predict past events), violating causal physical reality.",
      "Because time-series timestamps cannot be converted to floating-point numbers.",
      "Because random splitting converts non-stationary time series into white noise."
    ],
    correct: 1,
    explanation: "Shuffling time-series data destroys temporal causality. Training on July 15 to predict July 14 creates impossible lookahead leakage, yielding artificially low error metrics that completely collapse when the model is asked to forecast tomorrow's unknown future.",
    practicalTip: "Use `TimeSeriesSplit` or chronological forward slicing (e.g. Jan-Sept for train, Oct-Dec for test) for all time-dependent datasets."
  },
  {
    id: 5,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A cardiology diagnostic dataset at Jadavpur Medical Hub has 10 ECG heartbeat recordings for each of 50 distinct patients (500 rows total).",
    question: "What specific splitting topology must be used to prevent patient identity leakage across train and test sets?",
    options: [
      "Random Shuffle Split with random_state=42.",
      "Group-Aware Split (GroupShuffleSplit), where all records for a given patient reside entirely in either train or test.",
      "Stratified Shuffle Split on heart rate.",
      "Min-Max Normalization Split."
    ],
    correct: 1,
    explanation: "If recordings from the same patient appear in both train and test, the model memorizes patient-specific anatomical baselines (identity leakage), achieving false 99% accuracy. `GroupShuffleSplit(groups=Patient_ID)` ensures independent patient evaluation.",
    practicalTip: "Whenever your dataset has multiple rows per person, device, store, or vehicle, always split by Group ID."
  },
  {
    id: 6,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data scientist partitions a dataset of 100,000 samples using a 50/50 train-test split ratio.",
    question: "What theoretical drawback occurs when allocating an excessively large fraction (such as 50%) to the test set?",
    options: [
      "Evaluation variance on the test set becomes infinitely large.",
      "Model estimation bias increases significantly because the model is starved of 50% of the available training data, degrading its learning curve.",
      "The test set becomes corrupted by floating-point rounding errors.",
      "The model will overfit the training data more aggressively."
    ],
    correct: 1,
    explanation: "Allocating 50% of data to testing reduces the effective training sample size, increasing model estimation bias (the model learns less than it could). Standard practice for N = 100,000 is 80/20 or 90/10.",
    practicalTip: "As total sample size N grows into millions, the test ratio can safely drop to 5% or 1%, since 10,000 test samples provide tight confidence intervals."
  },
  {
    id: 7,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An engineer normalizes an entire dataset using `StandardScaler().fit_transform(X)` before calling `train_test_split(X, y)`.",
    question: "What critical methodological violation has been committed here?",
    options: [
      "Underfitting caused by premature feature shrinkage.",
      "Data Leakage (Information Leakage): The test set mean and standard deviation leaked into the scaler, contaminating the training data.",
      "Multicollinearity collapse.",
      "Matrix singularity in the covariance matrix."
    ],
    correct: 1,
    explanation: "Fitting any preprocessing transformer (scaler, imputer, encoder, or feature selector) on the combined dataset before splitting leaks test set distribution parameters into training. Transformers must be fitted strictly on X_train only.",
    practicalTip: "Golden Rule: `scaler.fit(X_train)`, then `scaler.transform(X_train)` and `scaler.transform(X_test)`. Never fit on the whole dataset!"
  },
  {
    id: 8,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An executive asks why a model with 92% test accuracy achieved only 78% accuracy when deployed on live customer traffic.",
    question: "Which of the following represents a primary cause of generalization degradation between test evaluation and live production?",
    options: [
      "The production database was compiled using C++ instead of Python.",
      "Data Distribution Shift (Covariate Shift / Concept Drift) where real-world production inputs diverge from the historical test set distribution.",
      "The test set had too many samples.",
      "The model had zero empirical training error."
    ],
    correct: 1,
    explanation: "The holdout assumption relies on production data being drawn from the exact same distribution D as the test set. Over time, customer behavior, seasonal patterns, and macroeconomic conditions change (distribution shift), degrading live performance.",
    practicalTip: "Continuously monitor production data for covariate shift (e.g. population stability index - PSI) and retrain models periodically."
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & UNCERTAINTY EQUATIONS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A model achieves an observed classification accuracy of hat{p} = 0.80 on an independent test set of N_test = 100 samples.",
    question: "What is the Standard Error (SE) of this test accuracy estimate?",
    options: [
      "SE = sqrt(0.80 * 0.20 / 100) = sqrt(0.16 / 100) = sqrt(0.0016) = 0.04 (4.0%)",
      "SE = 0.80 / 100 = 0.008 (0.8%)",
      "SE = sqrt(0.80 / 100) = 0.089 (8.9%)",
      "SE = (0.80 * 0.20) / 10 = 0.016 (1.6%)"
    ],
    correct: 0,
    explanation: "Under the Bernoulli trial model for test instances, the variance of sample proportion is p*(1-p)/N_test. Standard Error SE = sqrt(0.80 * 0.20 / 100) = sqrt(0.0016) = 0.04, or 4.0%.",
    practicalTip: "A standard error of 4.0% means a 95% confidence interval spans roughly +- 7.84%, meaning the true accuracy is [72.16%, 87.84%]."
  },
  {
    id: 10,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "An experiment evaluates two models on a test set of N_test = 25 samples. Model A scores 84.0% and Model B scores 88.0%.",
    question: "Using the Wald 95% margin of error formula (1.96 * SE), why is concluding 'Model B is definitively superior' mathematically unjustified?",
    options: [
      "Because Model B has an even-numbered accuracy percentage.",
      "Because with N_test = 25, the 95% margin of error is approximately +-14%, making the 4% difference between Model A and B statistically indistinguishable noise.",
      "Because accuracy cannot be computed on fewer than 100 samples.",
      "Because Model A and Model B have identical hyperparameter values."
    ],
    correct: 1,
    explanation: "For N = 25 and p approx 0.85, SE = sqrt(0.85 * 0.15 / 25) = sqrt(0.0051) = 0.0714 (7.14%). The 95% margin of error is 1.96 * 7.14% = +- 14.0%. A 4% difference is completely drowned out by sampling noise. McNemar's test or paired t-tests would show p > 0.50.",
    practicalTip: "Small test sets produce wide confidence bands. Always report confidence intervals alongside point accuracy metrics."
  },
  {
    id: 11,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A dataset has N = 10,000 samples. In a Stratified split with test_size = 0.20, class 0 has 9,000 samples and class 1 has 1,000 samples.",
    question: "How many samples from class 0 and class 1 will be assigned to the test set?",
    options: [
      "1,000 from class 0 and 1,000 from class 1.",
      "1,800 from class 0 and 200 from class 1.",
      "2,000 from class 0 and 0 from class 1.",
      "1,500 from class 0 and 500 from class 1."
    ],
    correct: 1,
    explanation: "Stratified splitting takes exactly 20% of each individual class: Class 0 test samples = 9,000 * 0.20 = 1,800; Class 1 test samples = 1,000 * 0.20 = 200. Total test set = 1,800 + 200 = 2,000 samples (preserving the exact 10% positive rate).",
    practicalTip: "Stratification ensures that hypergeometric sampling variation does not alter class proportions between partitions."
  },
  {
    id: 12,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "In Vapnik-Chervonenkis (VC) generalization theory, the upper bound on true risk R(h) contains the term sqrt( [d_VC * (ln(2N / d_VC) + 1) - ln(delta / 4)] / N ).",
    question: "What happens to this generalization bound as the training sample size N approaches infinity (N -> infinity)?",
    options: [
      "The bound expands to infinity, making learning impossible.",
      "The bound shrinks to zero, proving that empirical risk hat{R}_S(h) converges uniformly to true risk R(h) (Consistency of ERM).",
      "The bound oscillates sinusoidally.",
      "The bound becomes strictly equal to the VC dimension."
    ],
    correct: 1,
    explanation: "As N -> infinity, the denominator N grows much faster than ln(N), driving the square-root complexity penalty to zero. This proves the fundamental theorem of statistical learning: with infinite training data, empirical risk converges to true risk.",
    practicalTip: "More training data shrinks the generalization gap between train and test performance for any model with finite VC dimension."
  },
  {
    id: 13,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A time-series dataset contains daily observations from t = 1 to t = 1000. An analyst applies a 5-step rolling window temporal split (walk-forward cross-validation).",
    question: "In walk-forward cross-validation, what is the defining structural rule regarding the training and testing temporal windows at fold k?",
    options: [
      "Fold k shuffles all past and future records uniformly.",
      "At fold k, the model trains exclusively on past observations t <= t_k, and tests on subsequent future observations t_k < t <= t_{k+1}.",
      "Fold k tests on past observations and trains on future observations.",
      "Fold k leaves an unobserved 5-year gap between observations."
    ],
    correct: 1,
    explanation: "Walk-forward (rolling-origin) cross-validation enforces strict chronological order: the training window expands or rolls forward in time, and testing is always performed on the immediate subsequent future block. Future information never trains past folds.",
    practicalTip: "Walk-forward validation is the industry standard for backtesting algorithmic trading strategies and energy grid load models."
  },
  {
    id: 14,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A data engineer evaluates how test set sample size N_test impacts the width of the 95% confidence interval margin of error: Margin = 1.96 * sqrt(p(1-p)/N_test).",
    question: "To cut the margin of error strictly in half (e.g. from +-6% down to +-3%), by what factor must N_test be increased?",
    options: [
      "2x (doubled).",
      "4x (quadrupled).",
      "8x.",
      "16x."
    ],
    correct: 1,
    explanation: "Because N_test sits inside the square root in the denominator: Margin proportional to 1 / sqrt(N_test). To divide the margin by 2, sqrt(N_test) must double, which requires N_test to increase by a factor of 2² = 4x.",
    practicalTip: "Diminishing returns: Quadrupling your test set only cuts your estimation uncertainty in half."
  },
  {
    id: 15,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A regression model is evaluated on a test set of size N_test = 50. Mean Squared Error (MSE) is 16.0, and sample variance of squared errors Var(e²) = 64.0.",
    question: "What is the standard error of the MSE estimate on this test set?",
    options: [
      "SE(MSE) = sqrt(64.0 / 50) = sqrt(1.28) approx 1.13",
      "SE(MSE) = 16.0 / 50 = 0.32",
      "SE(MSE) = 64.0 / 16.0 = 4.0",
      "SE(MSE) = 0.0"
    ],
    correct: 0,
    explanation: "The MSE is an empirical sample mean of individual squared errors e_i². By the Central Limit Theorem, the standard error of a sample mean is sqrt(Var / N) = sqrt(64.0 / 50) = sqrt(1.28) = 1.131.",
    practicalTip: "Regression metrics (MSE, MAE) also have standard errors and confidence intervals, not just classification accuracy."
  },
  {
    id: 16,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A dataset has 60 patients with 10 records each (600 rows). In a `GroupKFold(n_splits=5)`, how are the groups partitioned across folds?",
    question: "How many patients are assigned to the test fold in each iteration, and can any patient appear in both train and test in the same fold?",
    options: [
      "12 patients in test, 48 in train; no patient ever appears in both train and test in the same fold.",
      "10 patients in test, 50 in train; patients can overlap if their records are randomized.",
      "All 60 patients are in test and train simultaneously.",
      "1 patient in test, 59 in train."
    ],
    correct: 0,
    explanation: "GroupKFold partitions the 60 unique patient groups into 5 disjoint subsets of 60 / 5 = 12 patients each. In each fold, 12 patients (120 rows) form the test set, and 48 patients (480 rows) form the train set. Zero patient overlap occurs.",
    practicalTip: "GroupKFold guarantees that models are evaluated on completely unseen patients/entities, simulating clinical reality."
  },

  // =========================================================================
  // TIER 3: APPLIED ARCHITECTURE, TOPOLOGIES & DATA LEAKAGE (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A machine learning pipeline handles missing numerical values by computing the column median. The data scientist runs `df['income'].fillna(df['income'].median())` on the raw DataFrame before calling `train_test_split`.",
    question: "Why does this represent data leakage, and what is the proper engineering pattern?",
    options: [
      "Because median is non-differentiable; mean must be used instead.",
      "The global median incorporates test set values; the fix is to compute the median strictly on X_train (`imputer.fit(X_train)`) and use that training median to fill both X_train and X_test.",
      "The test set should be filled with random noise instead of median.",
      "Missing values cannot be filled before neural network training."
    ],
    correct: 1,
    explanation: "Computing the median across the full dataset leaks test set distribution information into training. The proper pattern is to fit an imputer (or compute median) exclusively on X_train, and use that fitted value to transform X_test.",
    practicalTip: "Wrap your imputer, scaler, and estimator inside a scikit-learn `Pipeline` to prevent leakage across splits automatically."
  },
  {
    id: 18,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An engineer evaluates an algorithmic trading model using random 80/20 train-test splitting. The model achieves an incredible 94% test accuracy, but loses money rapidly in live trading.",
    question: "What specific form of data leakage occurred during the random split of financial time series?",
    options: [
      "The model suffered from gradient vanishing in the LSTM layers.",
      "Temporal Lookahead Leakage: Random splitting placed future market prices into the training set, allowing the model to predict past prices using future trend signals that do not exist in live trading.",
      "The test set was too large.",
      "The training loss was non-convex."
    ],
    correct: 1,
    explanation: "Financial prices exhibit serial autocorrelation and momentum. Random shuffling puts t+1 into train and t into test, effectively allowing the model to 'see the future' to predict the past. In live trading, the future is unknown, causing immediate collapse.",
    practicalTip: "Never use random splitting for financial, time-series, or event-driven sequential data. Use walk-forward or purged time-series splits."
  },
  {
    id: 19,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data scientist sets `random_state=42` in `train_test_split(X, y, test_size=0.2, random_state=42)`.",
    question: "What is the primary scientific and engineering purpose of explicitly pinning the pseudo-random seed (`random_state`)?",
    options: [
      "It speeds up execution by running on multiple GPU threads.",
      "It guarantees reproducibility: any colleague or CI/CD test running the code will generate the exact same train and test partitions.",
      "It automatically balances class distributions without stratification.",
      "It guarantees that test accuracy will be higher than training accuracy."
    ],
    correct: 1,
    explanation: "Pinning the seed (random_state) ensures deterministic pseudo-random number generation. Every run produces the exact same train/test split, making experimental comparisons, error analysis, and debugging completely reproducible across teams.",
    practicalTip: "Always fix random_state for reproducible research, but occasionally test across multiple seeds to verify results are not seed-dependent."
  },
  {
    id: 20,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "In a medical imaging dataset, 500 chest X-rays were taken from 50 tuberculosis patients (10 scans per patient taken from different angles). A team performs standard random splitting.",
    question: "Why will this model likely fail external clinical validation even if its holdout test accuracy is 99%?",
    options: [
      "Chest X-rays cannot be converted into numerical matrices.",
      "Identity Leakage: The model learned patient-specific anatomical features (rib cage shape, bone density) rather than generalizable tuberculosis pathology, because scans from the same patients existed in both folds.",
      "The model had too many convolutional layers.",
      "The learning rate was decaying too rapidly."
    ],
    correct: 1,
    explanation: "When multiple scans from the same subject are split randomly, the network learns to identify individual patients rather than disease pathology. In external hospitals with new patients, the model has never seen their anatomy and performance plummets. Group splitting is mandatory.",
    practicalTip: "Rule of thumb for medical AI: Group by Patient ID; never let a patient cross the train/test barrier."
  },
  {
    id: 21,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data pipeline uses target encoding: categorical zip codes are replaced with the mean target value of house prices in that zip code. The engineer computes target encoding on the full dataset before splitting.",
    question: "What form of catastrophic data leakage occurs, and how does it distort feature selection?",
    options: [
      "Target Leakage: The target values of test set houses are directly encoded into the feature matrix, making the zip code feature appear artificially omniscient during training.",
      "The encoding causes categorical variables to become complex numbers.",
      "The target variable variance shrinks to zero.",
      "The model underfits because zip codes have high cardinality."
    ],
    correct: 0,
    explanation: "Target encoding computes mean(Y | X = category). If computed over the entire dataset, each sample's feature incorporates the target values of test samples! This is extreme target leakage. Target encodings must be computed strictly inside training folds.",
    practicalTip: "Use out-of-fold target encoding (e.g. `TargetEncoder` in scikit-learn) inside a cross-validation pipeline to prevent target leakage."
  },
  {
    id: 22,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An ML architect reviews a pipeline that uses an 80/20 train-test split on N = 500 samples. The team reports test accuracy = 86.0%.",
    question: "Why might K-Fold Cross-Validation (e.g. 5-fold CV) be vastly superior to a single 80/20 holdout split on this small dataset?",
    options: [
      "K-fold CV runs 5x faster than a single holdout split.",
      "On N = 500, a single test set has only 100 samples (high variance); K-fold CV evaluates every single sample in validation, averaging out sampling noise and providing standard deviation bounds.",
      "K-fold CV eliminates the need for training data.",
      "K-fold CV transforms non-linear models into linear equations."
    ],
    correct: 1,
    explanation: "With small N, a single holdout test set of 100 samples is noisy and highly dependent on which 100 samples happen to be chosen. K-Fold CV ensures all 500 samples are evaluated in out-of-fold validation, producing a much more stable and robust performance estimate.",
    practicalTip: "For datasets with N < 5,000, rely on Repeated Stratified K-Fold Cross-Validation for model tuning rather than a single small holdout."
  },
  {
    id: 23,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "In financial high-frequency time series, Marcos López de Prado introduced the concept of 'Purged and Embargoed' cross-validation.",
    question: "What is the purpose of adding an 'Embargo' buffer window between training and testing periods in time series?",
    options: [
      "To comply with international financial sanctions.",
      "To prevent autoregressive serial correlation and market momentum from leaking immediately across the split boundary.",
      "To allow GPU processors to cool down between epochs.",
      "To delete all zero-variance trades."
    ],
    correct: 1,
    explanation: "Financial returns exhibit serial correlation and memory. If a training window ends at 2:00 PM and the test window starts at 2:01 PM, immediate market momentum leaks across the boundary. An embargo (e.g. 1-day idle buffer) eliminates autoregressive leakage.",
    practicalTip: "In time-series models with lagged features (t-1, t-2), ensure the test set starts after the longest lag horizon to prevent leakage."
  },
  {
    id: 24,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A junior engineer tunes XGBoost hyperparameters by running a grid search directly against the holdout test set, picking the configuration with the highest test F1-score.",
    question: "What is the formal term for this vulnerability, and why does it invalidate the test set?",
    options: [
      "Data Snooping (Overfitting to the Test Set); the test set is no longer an independent holdout because model selection decisions were driven by test set outcomes.",
      "Stochastic Gradient Collapse.",
      "High Bias Underfitting.",
      "Covariate Inversion."
    ],
    correct: 0,
    explanation: "Tuning against the test set turns the test set into a de facto training/validation set. The selected hyperparameters fit the idiosyncrasies of that specific test set (data snooping), producing overly optimistic scores that will not replicate in production.",
    practicalTip: "Always maintain a 3-way split: Train on Train, tune hyperparameters on Validation, and evaluate Test strictly once at the end."
  },

  // =========================================================================
  // TIER 4: REAL-WORLD INDUSTRIAL CASE STUDIES & TROUBLESHOOTING (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "At AMRI Salt Lake, 100 cardiology patients each have 15 ECG segments (300 total). A random 80/20 split achieves 99.2% test accuracy. When deployed on new patients at Jadavpur Medical Hub, accuracy plunges to 71.0%.",
    question: "What exact flaw explains this catastrophic deployment drop, and what code change fixes it?",
    options: [
      "The model had too few neurons; increase network depth.",
      "Identity Leakage: Random split leaked segments from 19 of the 20 patients into both folds; the fix is `GroupShuffleSplit(test_size=0.20)` grouping by `Patient_ID`.",
      "The ECG machines in Jadavpur used different voltage.",
      "Change test_size from 0.20 to 0.50."
    ],
    correct: 1,
    explanation: "Random splitting allowed 19 out of 20 patients to have beats in both train and test. The model memorized individual patient cardiac waveforms. In deployment on new patients, it had zero memory of their anatomy. GroupShuffleSplit fixes this completely.",
    practicalTip: "Always audit the intersection of entity IDs between train and test: `set(train_patients).intersection(set(test_patients)) == set()` must be TRUE."
  },
  {
    id: 26,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "WBSEDCL Barrackpore smart grid models 15-minute load telemetry from Jan 1 to Dec 31. An analyst uses `train_test_split(shuffle=True)` and reports RMSE = 0.42 MW. In live deployment, RMSE rises to 1.84 MW.",
    question: "Why was the reported test RMSE so deceptively low during offline evaluation?",
    options: [
      "The electrical grid suffered from rolling blackouts.",
      "Shuffling created impossible chronological time-travel leakage (e.g. using July 15 evening readings to interpolate July 15 morning load), masking real-world forecasting difficulty.",
      "The test set had higher ambient temperatures than the training set.",
      "The model ran out of memory."
    ],
    correct: 1,
    explanation: "In time-series with strong daily and seasonal cycles, shuffling turns forecasting into interpolation: the model simply interpolates between morning and night readings. In real life, future readings are unknown, causing RMSE to quadruple to 1.84 MW.",
    practicalTip: "For grid load forecasting, use Chronological Forward Slicing: Train Jan-Sept, Test Oct-Dec."
  },
  {
    id: 27,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A micro-finance lender in Bankura has 50,000 borrower records with a 1.20% default rate. An unstratified random split creates a test set where default recall is reported as 0.0%.",
    question: "What caused the model to have 0% recall on the test set?",
    options: [
      "The model weights were initialized with zeros.",
      "Due to random sampling variance on extreme class imbalance, the test set contained almost zero default cases, or the model learned a degenerate majority-class classifier.",
      "Bankura borrowers always repay loans on time.",
      "The test set had 100,000 samples."
    ],
    correct: 1,
    explanation: "In extreme imbalance, unstratified splitting can starve the test fold of minority instances. Furthermore, if the training split also experienced class depletion, the model predicts the majority class 100% of the time, yielding 0% recall. Stratified splitting is essential.",
    practicalTip: "Always use `StratifiedShuffleSplit` or `StratifiedKFold` for imbalanced classification tasks."
  },
  {
    id: 28,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "Kolkata Metro Green Line tracks repeated commuter card taps across 6 months. An analyst wants to predict customer churn (commuters stopping travel).",
    question: "How should the train and test split be structured to ensure realistic production evaluation?",
    options: [
      "Random 80/20 split across all individual turnstile tap rows.",
      "Temporal cutoff: Train on months 1-4 tap history to predict churn in month 5; test on months 2-5 to predict churn in month 6 (Out-of-Time Validation).",
      "Sort by passenger age and split on age 30.",
      "Shuffle by station name."
    ],
    correct: 1,
    explanation: "Churn prediction is inherently temporal. The model must learn from past observation windows to predict a future churn window (Out-of-Time validation). Splitting individual tap rows randomly causes massive temporal and user leakage.",
    practicalTip: "Customer churn models require Out-of-Time (OOT) validation windows to simulate real-world marketing retention campaigns."
  },
  {
    id: 29,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A pharmaceutical quality team in Serampore tests tablet dissolution rate across 12 manufacturing batches. A data scientist splits 1,200 tablets randomly into 80% train and 20% test.",
    question: "If tablets from the same manufacturing batch share chemical binder homogeneity, what split should have been used?",
    options: [
      "Random split with stratified dissolution rates.",
      "Group-aware split by Manufacturing Batch ID (`GroupKFold`), ensuring that entire batches are held out as test sets.",
      "Min-max scaling split.",
      "Sort by tablet serial number and drop odd numbers."
    ],
    correct: 1,
    explanation: "Tablets within the same batch share common chemical synthesis, moisture, and binder conditions. Randomly splitting tablets from the same batch tests whether the model can recognize that batch's signature. Holding out entire batches tests whether the model generalizes to new batches.",
    practicalTip: "In manufacturing and chemometrics, always group by Batch/Lot ID to ensure cross-batch generalization."
  },
  {
    id: 30,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "An ML architect is designing an automated MLOps pipeline for continuous retraining on cloud infrastructure.",
    question: "What is the recommended MLOps architecture to guarantee that feature scaling, imputation, and model fitting are strictly isolated from test sets?",
    options: [
      "Store preprocessed numpy arrays in a public S3 bucket.",
      "Encapsulate transformers and estimators into a unified scikit-learn `Pipeline`, fit the pipeline strictly on the training partition, and evaluate on an isolated test partition within an automated CI/CD evaluation gate.",
      "Run feature selection manually in Jupyter Notebooks before uploading to production.",
      "Disable the test set after the first release."
    ],
    correct: 1,
    explanation: "Encapsulating all preprocessing (imputation, scaling, feature selection) and the final estimator into a unified `Pipeline` guarantees that `fit()` is executed exclusively on training data, completely preventing data leakage during retraining.",
    practicalTip: "In modern MLOps, a Pipeline object is an atomic software artifact that guarantees zero-leakage training and reproducible inference."
  }
];

export default questions;
