/**
 * Topic 7: Testing Dataset
 * 30 Authentic Graded Assessment Questions (MAKAUT BCAC701B Standard)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 
 * Tiers:
 * - Foundation (Q1 - Q8)
 * - Mechanics & Statistics (Q9 - Q16)
 * - Architecture & Integrity Protocols (Q17 - Q24)
 * - Industrial Production & Governance (Q25 - Q30)
 */

const questions = [
  // -------------------------------------------------------------------------
  // TIER 1: FOUNDATION (Q1 - Q8)
  // -------------------------------------------------------------------------
  {
    id: 1,
    question: "What is the single, non-negotiable purpose of the Testing Dataset (D_test) in the machine learning lifecycle?",
    shortAnswer: "To provide an unbiased estimate and statistical confidence interval of the final model's real-world generalization performance on unseen data.",
    explanation: "The testing dataset exists strictly for final audit evaluation. It must never participate in model parameter learning, feature selection, or hyperparameter tuning. Its sole mandate is to act as an uncorrupted proxy for the operational environment.",
    hint: "Recall the difference between studying for an exam and the final sealed exam paper.",
    level: "Foundation",
    codeExample: "# Correct Testing Dataset Evaluation\nfrom sklearn.metrics import accuracy_score\n\n# Evaluated strictly ONCE after all training and validation are finalized\ny_pred_test = final_model.predict(X_test)\nunbiased_test_acc = accuracy_score(y_test, y_pred_test)\nprint('Final Generalization Accuracy:', unbiased_test_acc)"
  },
  {
    id: 2,
    question: "Why is the empirical test error (R_hat_test) proven to be an unbiased estimator of true generalization risk (R_true)?",
    shortAnswer: "Because the expectation of the test loss over random draws of D_test equals the true population risk, provided the model hypothesis h* is strictly independent of D_test.",
    explanation: "Under the i.i.d. assumption, E_{D_test}[ (1/N) sum L(h*(x_k), y_k) ] = (1/N) sum E[L(h*(x), y)] = R_true(h*). Because h* was chosen without seeing D_test, the mathematical bias E[R_hat_test] - R_true is identically zero.",
    hint: "What mathematical property relates the sample mean of independent observations to the population mean?",
    level: "Foundation",
    codeExample: "# Unbiased Risk Expectation Verification\n# E[R_hat_test] == R_true if and only if h* is independent of D_test\ntest_losses = [compute_loss(h_star, draw_test_batch()) for _ in range(1000)]\nprint('Empirical Expectation:', np.mean(test_losses)) # Converges to R_true"
  },
  {
    id: 3,
    question: "What is the fundamental difference between a Validation Dataset and a Testing Dataset?",
    shortAnswer: "A validation dataset is used iteratively during model development to tune hyperparameters and choose algorithms; the test dataset is held in reserve for one final, unbiased audit.",
    explanation: "Every time a model's hyperparameters (like tree depth or regularization alpha) are selected by comparing validation scores, information from that set influences the model choice. A pristine third split—the testing dataset—is required to provide an uncompromised evaluation.",
    hint: "Think about which dataset helps you make modeling decisions versus which reports final results.",
    level: "Foundation",
    codeExample: "# 3-Way Split: Train, Validation, Test\nfrom sklearn.model_selection import train_test_split\n\n# 1. Carve out sealed test vault (20%)\nX_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n# 2. Split remaining into train (60%) and validation (20%)\nX_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42)"
  },
  {
    id: 4,
    question: "How does the Central Limit Theorem (CLT) characterize the distribution of empirical test error as sample size N_test increases?",
    shortAnswer: "The empirical test error asymptotically follows a normal distribution centered at true risk R_true with variance sigma^2 / N_test.",
    explanation: "Because test errors e_k = L(h*(x_k), y_k) are independent random variables, the sample average R_hat_test converges in distribution to N(R_true, sigma_L^2 / N_test) for N_test >= 30, providing the theoretical basis for constructing confidence intervals.",
    hint: "Recall how the sum or average of independent random variables behaves.",
    level: "Foundation",
    codeExample: "# CLT for Test Error\n# R_hat_test ~ Normal(mu=R_true, std=sigma / sqrt(N_test))\nstandard_error = np.std(test_residuals) / np.sqrt(len(test_residuals))"
  },
  {
    id: 5,
    question: "What happens if an engineer repeatedly tunes model decision thresholds directly on D_test to maximize the F1-score?",
    shortAnswer: "D_test is compromised and converted into a de facto validation set; the reported F1-score becomes optimistically biased and no longer reflects true generalization.",
    explanation: "Optimizing the classification threshold (e.g., shifting from 0.50 to 0.38) based on test set metrics fits the threshold to the random sampling quirks of D_test. Threshold calibration must be performed on validation data.",
    hint: "Does selecting a threshold based on a dataset constitute tuning on that dataset?",
    level: "Foundation",
    codeExample: "# INCORRECT: Tuning threshold on D_test (Peeking)\n# best_thresh = argmax([f1_score(y_test, (probs_test >= t)) for t in thresholds]) # LEAKAGE!\n\n# CORRECT: Tune threshold on Validation, apply frozen threshold to Test\nbest_thresh = max(thresholds, key=lambda t: f1_score(y_val, (probs_val >= t)))\ntest_preds = (probs_test >= best_thresh).astype(int)"
  },
  {
    id: 6,
    question: "Under the Bernoulli trial model for binary classification, what is the variance of the observed test accuracy estimator p_hat?",
    shortAnswer: "Var(p_hat) = (p * (1 - p)) / N_test.",
    explanation: "Each test sample is classified correctly (success) with probability p or incorrectly with probability 1 - p. For N_test independent trials, the variance of the sample proportion p_hat = S / N_test is p(1 - p) / N_test, which reaches its maximum at p = 0.50.",
    hint: "Recall the formula for the variance of a binomial proportion.",
    level: "Foundation",
    codeExample: "# Variance of Test Accuracy Estimator\ndef test_accuracy_variance(p, n_test):\n    return (p * (1.0 - p)) / n_test\n\nprint('Variance for p=0.90, N=100:', test_accuracy_variance(0.9, 100)) # 0.0009"
  },
  {
    id: 7,
    question: "Why is a typical test set split proportion chosen between 15% and 25% for medium-sized tabular datasets?",
    shortAnswer: "It balances having sufficient training samples to minimize parameter estimation variance while retaining enough test samples to ensure a narrow confidence interval.",
    explanation: "If the test split is too small (e.g. 2%), test error estimates have huge variance and wide confidence intervals. If the test split is too large (e.g. 50%), the model is starved of training data, leading to severe underfitting. An 80:20 or 75:25 split strikes a practical trade-off.",
    hint: "Consider what happens to the training model if you take away too much data.",
    level: "Foundation",
    codeExample: "# Standard 80/20 train-test partition\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)"
  },
  {
    id: 8,
    question: "What is the 'Golden Rule' regarding feature transformers and the testing dataset?",
    shortAnswer: "Feature transformers must be fitted strictly on the training set, and applied to the test set using .transform() only.",
    explanation: "Calling `fit` or `fit_transform` on the test set calculates test distribution parameters (mean, variance, minimum, maximum, imputation medians) that contaminate the model representations. Frozen parameters learned from D_train must be applied to D_test.",
    hint: "Should you ever call .fit() on test data?",
    level: "Foundation",
    codeExample: "# Golden Rule: fit on train, transform on test\nfrom sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\n# Strictly transform ONLY\nX_test_scaled = scaler.transform(X_test)"
  },

  // -------------------------------------------------------------------------
  // TIER 2: MECHANICS & STATISTICS (Q9 - Q16)
  // -------------------------------------------------------------------------
  {
    id: 9,
    question: "Given an observed test accuracy of 90.0% on a test set of N_test = 100 samples, what is the exact 95% Wald Confidence Interval?",
    shortAnswer: "[84.12%, 95.88%] with a margin of error of +/- 5.88%.",
    explanation: "SE = sqrt(0.90 * 0.10 / 100) = sqrt(0.0009) = 0.03. Margin of error ME = 1.96 * 0.03 = 0.0588 (5.88%). Lower bound = 0.90 - 0.0588 = 0.8412 (84.12%); upper bound = 0.90 + 0.0588 = 0.9588 (95.88%).",
    hint: "Calculate standard error sqrt(p(1-p)/n), then multiply by 1.96.",
    level: "Mechanics",
    codeExample: "# Computing 95% Wald Confidence Interval\nimport math\n\np_hat, n_test = 0.90, 100\nse = math.sqrt(p_hat * (1.0 - p_hat) / n_test)\nme = 1.96 * se\nprint(f'95% CI: [{p_hat - me:.4f}, {p_hat + me:.4f}]') # [0.8412, 0.9588]"
  },
  {
    id: 10,
    question: "Why does the Wald Confidence Interval break down when observed test accuracy p_hat is extremely close to 1.0 (e.g. 99.5%) or 0.0?",
    shortAnswer: "The Gaussian approximation of the binomial distribution fails near boundaries, causing the confidence interval to unnaturally exceed 1.0 or understate variance.",
    explanation: "The Wald interval assumes a symmetric normal distribution. When p_hat is near 0 or 1, the binomial distribution is highly skewed. For small N or extreme p, Wald intervals can produce upper limits > 100% or degenerate zero-width intervals. The Wilson Score Interval or Clopper-Pearson exact interval must be used.",
    hint: "What happens to the bell curve shape when the mean is crammed against the boundary?",
    level: "Mechanics",
    codeExample: "# Wilson Score Interval for extreme proportions\nfrom statsmodels.stats.proportion import proportion_confint\n\nci_low, ci_high = proportion_confint(count=99, nobs=100, alpha=0.05, method='wilson')\nprint(f'Wilson 95% CI: [{ci_low:.4f}, {ci_high:.4f}]') # Guaranteed <= 1.0"
  },
  {
    id: 11,
    question: "Using the sample size determination formula, how many test instances are required to ensure a maximum margin of error of +/- 2.0% at a 95% confidence level under worst-case variance (p = 0.5)?",
    shortAnswer: "N_test >= 2,401 samples.",
    explanation: "Formula: N >= (z^2 * p * (1 - p)) / E^2. With z = 1.96, p = 0.5, and E = 0.02: N = (1.96^2 * 0.25) / (0.02^2) = (3.8416 * 0.25) / 0.0004 = 0.9604 / 0.0004 = 2,401 samples.",
    hint: "Square 1.96, multiply by 0.25, and divide by 0.0004.",
    level: "Mechanics",
    codeExample: "# Sample Size Calculation for Precision\ndef required_test_samples(margin_of_error=0.02, confidence=0.95, p=0.5):\n    z = 1.96 if confidence == 0.95 else 2.576\n    return math.ceil((z ** 2 * p * (1.0 - p)) / (margin_of_error ** 2))\n\nprint('Required test size:', required_test_samples(0.02)) # 2401"
  },
  {
    id: 12,
    question: "When comparing two classifiers on the exact same test dataset, why is McNemar's Test preferred over an independent two-sample proportion z-test?",
    shortAnswer: "Because both models predict on the exact same instances, their predictions are paired and correlated; McNemar's test specifically evaluates discordant error pairs.",
    explanation: "An independent z-test assumes samples are independent, ignoring that Model A and Model B evaluated identical instances. McNemar's test focuses exclusively on discordant outcomes: samples where Model A is correct and Model B is incorrect (n10) versus where Model A is incorrect and Model B is correct (n01).",
    hint: "Think about paired vs independent samples in statistics.",
    level: "Mechanics",
    codeExample: "# McNemar's Paired Test Matrix\n# n01: Model A wrong, Model B right\n# n10: Model A right, Model B wrong\ndef mcnemar_test(n01, n10):\n    # Continuity-corrected chi-square\n    chi2 = ((abs(n01 - n10) - 1.0) ** 2) / (n01 + n10)\n    return chi2, chi2 > 3.841 # True if p < 0.05 (df=1)"
  },
  {
    id: 13,
    question: "If Model A achieves 88.0% test accuracy and Model B achieves 85.0% on a test set of N_test = 50 samples, is the difference statistically significant (alpha = 0.05)?",
    shortAnswer: "No. With N_test = 50, the pooled z-statistic is 0.43 (p-value = 0.67), meaning the 3% difference is statistically indistinguishable from random noise.",
    explanation: "Pooled proportion p_pool = (44 + 42) / 100 = 0.865. Standard error SE_pool = sqrt(0.865 * 0.135 * (2/50)) = 0.0684 (6.84%). z = (0.88 - 0.85) / 0.0684 = 0.438. Since |z| < 1.96 (p = 0.67), the null hypothesis of equal performance cannot be rejected.",
    hint: "Small test sets have wide margins of error that engulf small percentage differences.",
    level: "Mechanics",
    codeExample: "# Two-sample proportion z-test verification\nz_stat = (0.88 - 0.85) / math.sqrt(0.865 * 0.135 * (2 / 50))\nprint('z-statistic:', round(z_stat, 3)) # 0.438 -> Not significant!"
  },
  {
    id: 14,
    question: "What is the mathematical rate at which the standard error of the test accuracy decays as test sample size N_test increases?",
    shortAnswer: "It decays at the rate of O(1 / sqrt(N_test)).",
    explanation: "Because standard error is proportional to 1 / sqrt(N), reducing the margin of error by a factor of 2 requires increasing the test set size by a factor of 4. Reducing margin of error by 10x requires 100x more test data.",
    hint: "How does the square root in the denominator affect scaling?",
    level: "Mechanics",
    codeExample: "# Error decay vs Sample Size\nns = [100, 400, 1600]\nfor n in ns:\n    se = math.sqrt(0.25 / n)\n    print(f'N={n}: SE={se:.4f}') # 0.0500, 0.0250, 0.0125 (halving each time)"
  },
  {
    id: 15,
    question: "Why does evaluating a model on an unstratified test set in an imbalanced domain (e.g., 99% benign, 1% malignant) yield a misleading test accuracy?",
    shortAnswer: "Accuracy is dominated by majority class performance; a naive model predicting 100% benign achieves 99% test accuracy despite catching zero tumors.",
    explanation: "In imbalanced domains, raw accuracy obscures minority class failure. The test dataset must be evaluated using threshold-independent metrics (PR-AUC, ROC-AUC) or cost-sensitive confusion metrics (Sensitivity / Recall at fixed Specificity) rather than aggregate accuracy.",
    hint: "What would the accuracy be if the doctor simply declared every patient healthy?",
    level: "Mechanics",
    codeExample: "# Imbalanced Evaluation on D_test\nfrom sklearn.metrics import classification_report, average_precision_score\n\n# Look at minority recall and PR-AUC, not aggregate accuracy\nprint(classification_report(y_test, y_pred, digits=4))\npr_auc = average_precision_score(y_test, y_probs)"
  },
  {
    id: 16,
    question: "How does Hoeffding's Inequality provide a distribution-free bound on the test error of hypothesis h*?",
    shortAnswer: "It bounds the probability that true risk exceeds empirical test error by epsilon: P(|R_hat_test - R_true| >= epsilon) <= 2 * exp(-2 * N_test * epsilon^2).",
    explanation: "Hoeffding's inequality requires no assumptions about the underlying distribution P(X, Y) beyond bounded losses in [0, 1]. It mathematically proves that the probability of a large generalization discrepancy decays exponentially with sample size N_test.",
    hint: "Notice the negative exponential with N in the exponent.",
    level: "Mechanics",
    codeExample: "# Hoeffding bound computation\ndef hoeffding_bound_prob(n_test, epsilon=0.05):\n    return 2.0 * math.exp(-2.0 * n_test * (epsilon ** 2))\n\nprint('Prob of error > 5% on N=1000:', hoeffding_bound_prob(1000)) # 0.0135 (1.3%)"
  },

  // -------------------------------------------------------------------------
  // TIER 3: ARCHITECTURE & INTEGRITY PROTOCOLS (Q17 - Q24)
  // -------------------------------------------------------------------------
  {
    id: 17,
    question: "What is the 'Test Set Peeking Paradox' (Multiple Testing Fallacy) in machine learning engineering?",
    shortAnswer: "Evaluating M candidate models on a fixed test set causes the maximum observed test accuracy to falsely inflate via stochastic luck, scaling as mu + sigma * sqrt(2 ln M).",
    explanation: "If you evaluate 50 random models (each having true accuracy = 50%) on a test set of 100 samples, one model will score ~64% accuracy purely by chance. If you select and deploy that model based on its test score, you have overfitted to the test set without running gradient descent.",
    hint: "If you flip 100 coins 50 times, will one set of flips show way more heads than tails?",
    level: "Architecture",
    codeExample: "# Peeking Paradox Simulation\nimport numpy as np\n\n# 50 random null models on N=100 test samples\ny_test = np.random.randint(0, 2, size=100)\nnull_accuracies = [np.mean(y_test == np.random.randint(0, 2, size=100)) for _ in range(50)]\nprint('True accuracy:', 0.50)\nprint('Apparent best score:', max(null_accuracies)) # ~0.63 due to peeking!"
  },
  {
    id: 18,
    question: "How does the Bonferroni Correction adjust statistical significance when testing M models on D_test?",
    shortAnswer: "It divides the nominal significance threshold alpha by M (alpha_adjusted = alpha / M) to control the family-wise error rate.",
    explanation: "If you test M = 20 models at alpha = 0.05, the probability of at least one false positive is 1 - (1 - 0.05)^20 = 64.1%. The Bonferroni correction requires each individual model test to meet alpha = 0.05 / 20 = 0.0025, safeguarding against spurious discoveries.",
    hint: "How do you counteract the probability of getting a lucky false positive across many trials?",
    level: "Architecture",
    codeExample: "# Bonferroni Adjusted Alpha\nM = 20\nalpha_nominal = 0.05\nalpha_bonferroni = alpha_nominal / M\nprint('Adjusted threshold for p-value:', alpha_bonferroni) # 0.0025"
  },
  {
    id: 19,
    question: "What is an Out-of-Time (OOT) test dataset, and why is it mandatory for temporal systems like credit scoring or energy grid forecasting?",
    shortAnswer: "An OOT test set is partitioned chronologically into future time windows; it prevents lookahead bias and verifies model resilience against temporal drift.",
    explanation: "Random shuffle splitting in time-series data leaks future market and macroeconomic states into the training set. An OOT test set models operational reality: the model trains on historical data (months 1-9) and is evaluated on subsequent future quarters (months 10-12).",
    hint: "Can a bank use tomorrow's inflation data to predict today's loan defaults?",
    level: "Architecture",
    codeExample: "# Chronological Out-of-Time (OOT) Partition\nsplit_date = '2026-10-01'\ntrain_df = df[df['timestamp'] < split_date]\n# Sealed future operational test vault\ntest_df = df[df['timestamp'] >= split_date]"
  },
  {
    id: 20,
    question: "Why must Group-Aware Splitting (e.g. GroupShuffleSplit) be enforced when creating D_test in biometric or patient cohorts?",
    shortAnswer: "To prevent subject identity leakage; multiple observations or scans from the same human subject must never be split across train and test sets.",
    explanation: "If Patient #88 has 6 retinal images and 4 are in D_train while 2 are in D_test, the model learns idiosyncratic ocular features of Patient #88 rather than genuine diabetic retinopathy pathology. Group splitting ensures entire subjects reside wholly in train or test.",
    hint: "Does a test set evaluate memorization of people or detection of disease?",
    level: "Architecture",
    codeExample: "# Group-Aware Test Vault Partitioning\nfrom sklearn.model_selection import GroupShuffleSplit\n\ngss = GroupShuffleSplit(n_splits=1, test_size=0.20, random_state=42)\ntrain_idx, test_idx = next(gss.split(X, y, groups=patient_ids))\n\nX_train, X_test = X[train_idx], X[test_idx]\ny_train, y_test = y[train_idx], y[test_idx]"
  },
  {
    id: 21,
    question: "What is an 'Air-Gapped Blind Test Vault' in enterprise machine learning governance?",
    shortAnswer: "A centralized, isolated test repository where data scientists submit containerized models for automated evaluation without ever seeing or downloading the test labels.",
    explanation: "To prevent intentional or accidental test set leakage, modern enterprise architectures (such as Kaggle competition backends, hospital clinical trials, and banking risk committees) isolate the holdout dataset on a secure server. The model runs in an air-gapped sandbox, returning only summary performance metrics.",
    hint: "Think about how competitive benchmarks prevent participants from cheating.",
    level: "Architecture",
    codeExample: "# Air-Gapped Blind Evaluation Paradigm\ndef evaluate_submitted_container(container_image, secret_test_vault_path):\n    # Container executes inference inside isolated sandbox\n    # Ground truth labels never leave the secure audit environment\n    pass"
  },
  {
    id: 22,
    question: "What is Out-of-Distribution (OOD) testing, and how does it differ from standard i.i.d. holdout testing?",
    shortAnswer: "Standard i.i.d. testing evaluates data drawn from the exact same distribution P(X); OOD testing deliberately subjects the model to shifted feature distributions to verify tail robustness.",
    explanation: "A model can score 95% on an i.i.d. test set yet fail catastrophically in production when faced with sensor noise, unexpected weather extremes, or demographic shifts. OOD test sets stress-test models against distribution shifts (P_test(X) != P_train(X)).",
    hint: "How does a self-driving car perform in heavy fog if it only tested in sunny daylight?",
    level: "Architecture",
    codeExample: "# OOD Stress-Testing\n# D_test_clean: Standard sunny weather\n# D_test_ood: Heavy Nor'wester storm sensor telemetry\nacc_clean = model.score(X_test_clean, y_test_clean)\nacc_ood = model.score(X_test_storm, y_test_storm)\nprint('Resilience Drop:', acc_clean - acc_ood)"
  },
  {
    id: 23,
    question: "Why is it mathematically erroneous to apply Missing Value Imputation or Outlier Clipping across the entire dataset before separating D_test?",
    shortAnswer: "Global imputation calculates distribution medians and quantiles from test rows, corrupting training representations with future distributional information.",
    explanation: "If missing values in feature 'income' are imputed using the global median of 10,000 samples before splitting, test set values shift the median assigned to training records. Imputers must call `.fit()` on D_train and `.transform()` on D_test.",
    hint: "Does a production system get to inspect next month's customers to impute today's missing values?",
    level: "Architecture",
    codeExample: "# Correct Pipeline Imputation\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\n\npipe = Pipeline([\n    ('imputer', SimpleImputer(strategy='median')),\n    ('model', LogisticRegression())\n])\npipe.fit(X_train, y_train)\n# Imputes X_test using medians learned exclusively from X_train\npipe.score(X_test, y_test)"
  },
  {
    id: 24,
    question: "What is the role of a 'Canary' or 'Golden Test Dataset' in continuous production ML pipelines?",
    shortAnswer: "A curated set of critical edge-case test records run against every newly trained model build to prevent regressions on core business requirements.",
    explanation: "While stochastic test sets evaluate statistical averages, golden datasets contain curated, mission-critical edge cases (e.g., specific VIP customer transactions, rare cardiac arrest ECG patterns). If a retrained model fails even one canary test, deployment is automatically halted.",
    hint: "Think about canary in a coal mine for automated regression testing.",
    level: "Architecture",
    codeExample: "# Golden Canary Test Assertion in CI/CD\ndef test_golden_canary_suite(new_model):\n    preds = new_model.predict(GOLDEN_EDGE_CASES_X)\n    assert np.all(preds == GOLDEN_EDGE_CASES_Y), 'CRITICAL REGRESSION DETECTED! Deployment halted.'"
  },

  // -------------------------------------------------------------------------
  // TIER 4: INDUSTRIAL PRODUCTION & GOVERNANCE (Q25 - Q30)
  // -------------------------------------------------------------------------
  {
    id: 25,
    question: "How does the Bureau of Civil Aviation Security (BCAS) at CCU Airport enforce a 'One-Shot Evaluation Policy' for AI baggage scanners?",
    shortAnswer: "Vendors submit their software builds for exactly one evaluation pass on certified threat scans; repeated submissions to iteratively tweak thresholds are prohibited.",
    explanation: "If vendors were allowed to test, adjust thresholds, and re-test 20 times on the airport security holdout, the models would overfit to the specific physical artifacts and angles of the certified test luggage, creating a severe aviation vulnerability.",
    hint: "Why can't students take the exact same board exam 10 times in a row until they pass?",
    level: "Industrial Production & Governance",
    codeExample: "# Audit Log Enforcing One-Shot Evaluation\ndef execute_one_shot_audit(vendor_model, certified_test_vault):\n    if audit_registry.has_evaluated(vendor_model.id):\n        raise PermissionError('Violation: One-shot policy prohibits re-evaluation on certified test vault.')\n    return run_blind_benchmark(vendor_model, certified_test_vault)"
  },
  {
    id: 26,
    question: "In banking credit risk governance (e.g. Bandhan Bank), why are models tested on both an In-Time holdout and an Out-of-Time (OOT) holdout?",
    shortAnswer: "The In-Time holdout measures algorithmic generalization under identical economic conditions; the OOT holdout measures macroeconomic resilience and robustness against temporal drift.",
    explanation: "If a credit scoring model performs well on an In-Time test split (e.g. 88% Gini) but collapses on an OOT test set from a high-inflation quarter (e.g. 52% Gini), the bank knows the model is fragile to economic shocks and must not be approved by the model risk governance committee.",
    hint: "One test checks model math; the other checks real-world economic resilience.",
    level: "Industrial Production & Governance",
    codeExample: "# Dual Holdout Governance Architecture\ngini_in_time = evaluate_gini(model, X_test_in_time, y_test_in_time)\ngini_out_of_time = evaluate_gini(model, X_test_oot, y_test_oot)\n\n# Governance rule: OOT drop must not exceed 15%\nassert (gini_in_time - gini_out_of_time) / gini_in_time < 0.15, 'Model rejected: Excessive temporal degradation'"
  },
  {
    id: 27,
    question: "What is Population Stability Index (PSI), and how is it computed between the training dataset and the production testing stream?",
    shortAnswer: "PSI measures the shift in feature quantile distributions between training baseline and test/production data; PSI >= 0.25 indicates critical population drift.",
    explanation: "PSI = sum( (Actual% - Expected%) * ln(Actual% / Expected%) ) across feature bins. If PSI < 0.10, the test distribution is stable; between 0.10 and 0.25 indicates moderate shift; >= 0.25 requires immediate retraining or test vault recalibration.",
    hint: "Recall the formula comparing expected training buckets with actual test buckets.",
    level: "Industrial Production & Governance",
    codeExample: "# Population Stability Index (PSI) calculation\ndef calculate_psi(expected_train, actual_test, buckets=10):\n    # Compares empirical distributions to detect feature drift\n    # PSI > 0.25 indicates severe drift\n    pass"
  },
  {
    id: 28,
    question: "Why must a Testing Dataset never be rebalanced using synthetic oversampling (such as SMOTE) before computing final metrics?",
    shortAnswer: "Synthetic balancing fabricates artificial test samples and destroys the real-world base rate, producing invalid operational precision and recall metrics.",
    explanation: "In production fraud detection, true fraud prevalence is ~0.1%. If you balance the test set to 50% fraud using SMOTE, the reported precision will appear 500x higher than reality. The test set must reflect genuine operational prevalence.",
    hint: "Does real-world deployment data come magically pre-balanced?",
    level: "Industrial Production & Governance",
    codeExample: "# INCORRECT: SMOTE on Test Set\n# X_test_smote, y_test_smote = SMOTE().fit_resample(X_test, y_test) # INVALID EVALUATION!\n\n# CORRECT: Keep Test Set pristine and unaltered\ny_pred_test = model.predict(X_test_unaltered)\nprint(classification_report(y_test_unaltered, y_pred_test))"
  },
  {
    id: 29,
    question: "What governance mechanism is mandated under the EU AI Act and FDA Software as a Medical Device (SaMD) regulations regarding the clinical testing dataset?",
    shortAnswer: "The clinical test dataset must be completely locked, representative of diverse patient demographic cohorts, and audited by independent regulatory bodies.",
    explanation: "Regulators require that medical diagnostic algorithms are evaluated on fixed, certified testing databases with diverse demographic stratification (age, biological sex, comorbidities) to verify that false negative rates do not disproportionately affect vulnerable subpopulations.",
    hint: "Think about algorithmic fairness and demographic representation in healthcare.",
    level: "Industrial Production & Governance",
    codeExample: "# Demographic Cohort Stratified Testing Audit\nfor cohort, subset_indices in demographic_groups.items():\n    cohort_recall = recall_score(y_test[subset_indices], preds[subset_indices])\n    print(f'Cohort {cohort} Recall: {cohort_recall:.3f}')\n    assert cohort_recall >= 0.90, f'Fairness violation in cohort: {cohort}'"
  },
  {
    id: 30,
    question: "What is 'Shadow Deployment' (Dark Launching), and how does it act as the ultimate continuous live testing dataset?",
    shortAnswer: "Production traffic is duplicated and routed to the new candidate model in the background without serving its predictions to users, testing performance on real streaming data.",
    explanation: "Shadow deployment feeds live customer traffic in parallel to both the incumbent model and the candidate model. The candidate model's predictions and latency are logged and compared against ground-truth outcomes, providing the ultimate uncompromised operational test benchmark.",
    hint: "How can you test a model on live customer requests without risking customer experience?",
    level: "Industrial Production & Governance",
    codeExample: "# Shadow Deployment Architecture Pattern\ndef handle_live_request(user_request):\n    live_pred = incumbent_model.predict(user_request)\n    # Asynchronously evaluate candidate on live stream\n    async_log_shadow_prediction(candidate_model, user_request)\n    return live_pred # User sees output only from proven model"
  }
];

export default questions;
