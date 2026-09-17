/**
 * Topic 12: Training, Validation and Testing Data
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "Why is a dataset partitioned into Training, Validation, and Testing subsets instead of evaluating on training data directly?",
    "shortAnswer": "To measure true Generalization performance on unseen data and prevent Overfitting from memorizing training samples.",
    "explanation": "A high-capacity model (like a 1-NN classifier or deep decision tree) can easily achieve 100% accuracy on its training data by rote memorization. Testing on independent held-out data reveals whether the model learned generalizable mathematical relationships or merely memorized noise.",
    "hint": "Separating training experience from independent generalization evaluation.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)"
  },
  {
    "id": 2,
    "question": "What is the distinct and specific role of the 'Validation Set' in machine learning?",
    "shortAnswer": "To tune hyperparameters (e.g. learning rate, regularization \u03bb) and guide model architecture selection without polluting the Test Set.",
    "explanation": "If the Test Set is repeatedly used to select hyperparameters, information from the test set leaks into model decisions (hyperparameter overfitting). The Validation set acts as an intermediate testing sandbox; the Test set is touched exactly once at the project's conclusion.",
    "hint": "Hyperparameter optimization sandbox distinct from the final unpolluted test set.",
    "level": "Basic",
    "codeExample": "# 60% Train, 20% Validation, 20% Test\nX_train, X_rem, y_train, y_rem = train_test_split(X, y, train_size=0.6, random_state=42)\nX_val, X_test, y_val, y_test = train_test_split(X_rem, y_rem, test_size=0.5, random_state=42)"
  },
  {
    "id": 3,
    "question": "What is K-Fold Cross-Validation and how does it compute its final performance score?",
    "shortAnswer": "Data is split into K equal folds; the model is trained on K-1 folds and evaluated on the remaining fold K times; the final score is the mean of all K scores.",
    "explanation": "K-Fold CV (typically K=5 or K=10) ensures that every single data sample is used for validation exactly once and for training K-1 times. It provides a robust, low-variance estimate of model performance and computes standard deviation across folds.",
    "hint": "K rotating train-val iterations averaged to produce a low-variance score.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import KFold, cross_val_score\nkf = KFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=kf, scoring='accuracy')\nprint(f'Mean CV: {scores.mean():.3f} +/- {scores.std():.3f}')"
  },
  {
    "id": 4,
    "question": "Why is Stratified K-Fold Cross-Validation mandatory for imbalanced classification tasks?",
    "shortAnswer": "It guarantees that each fold contains the exact same percentage ratio of target class labels as the full dataset.",
    "explanation": "In standard random K-Fold, a rare class (e.g. 2% fraud) might randomly receive 0 positive samples in Fold 1 and 5% in Fold 2, leading to wildly erratic validation metrics. Stratification enforces exact target proportion invariance across all K folds.",
    "hint": "Preserves class balance proportions across every individual validation fold.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import StratifiedKFold\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)"
  },
  {
    "id": 5,
    "question": "What is Leave-One-Out Cross-Validation (LOOCV) and when is it computationally feasible?",
    "shortAnswer": "K-Fold where K = N (sample size); each sample is tested individually while training on all other N-1 samples; feasible only for very small datasets (N < 500).",
    "explanation": "LOOCV is deterministic with zero random sampling variance because it tests every possible N-1 split. However, it requires training the model N times from scratch. For large datasets (N = 100,000), LOOCV is computationally impossible.",
    "hint": "Extreme K-Fold where each fold is a single isolated data point.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import LeaveOneOut\nloo = LeaveOneOut()\n# n_splits == len(X)"
  },
  {
    "id": 6,
    "question": "What is Data Leakage (Information Leakage) and what are its primary manifestations?",
    "shortAnswer": "When target information or test set statistics are inadvertently present during model training, creating artificially inflated evaluation scores that collapse in production.",
    "explanation": "Common forms: 1. Target Leakage (including a feature that directly contains the target outcome or is created after the target event occurs). 2. Train-Test Contamination (fitting scalers/imputers before splitting). 3. Duplicate row overlap across train and test splits.",
    "hint": "Contaminating training data with test statistics or future ground-truth information.",
    "level": "Moderate",
    "codeExample": "# Target Leakage Example: Including 'prescription_written_flag' to predict 'disease_diagnosed'"
  },
  {
    "id": 7,
    "question": "How does Time-Series Split (Rolling / Expanding Window Cross-Validation) prevent temporal leakage?",
    "shortAnswer": "By training strictly on past historical records (t=1..k) and testing strictly on future time steps (t=k+1), never shuffling or looking backwards in time.",
    "explanation": "Randomly shuffling time-series data violates causality. If the model trains on Wednesday and Friday data to predict Thursday's stock price, it is using future information to predict the past. TimeSeriesSplit enforces strict chronological forward-chaining.",
    "hint": "Strict chronological forward training without random time-shuffling.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import TimeSeriesSplit\ntscv = TimeSeriesSplit(n_splits=5)\nfor train_idx, val_idx in tscv.split(X_time):\n    # train_idx is always strictly in the chronological past of val_idx"
  },
  {
    "id": 8,
    "question": "What is Group K-Fold Cross-Validation and why is it essential for patient-level or user-level datasets?",
    "shortAnswer": "It ensures that all observations belonging to the same entity/group (e.g. multiple MRI scans from patient #104) are placed entirely within either Train or Test, never split across both.",
    "explanation": "If a patient has 10 X-ray images, standard K-Fold might place 8 in Train and 2 in Test. The model could simply memorize the patient's idiosyncratic bone structure (high test score) while failing to diagnose completely new patients. GroupKFold prevents intra-subject leakage.",
    "hint": "Keeps all records of a specific user/patient in the same split fold.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import GroupKFold\ngkf = GroupKFold(n_splits=5)\nfor train_idx, val_idx in gkf.split(X, y, groups=patient_ids):\n    # No patient_id appears in both train and validation splits"
  },
  {
    "id": 9,
    "question": "What is Repeated K-Fold Cross-Validation?",
    "shortAnswer": "Running K-Fold cross-validation n times with different random splits (e.g., 5 folds repeated 10 times = 50 total model fits) to obtain robust statistical distributions.",
    "explanation": "Standard 5-Fold cross-validation produces only 5 validation scores. Repeated K-Fold executes multiple random shuffle splits, producing a larger sample of evaluation metrics that allows formal statistical hypothesis testing (paired t-tests) when comparing competing model architectures.",
    "hint": "Multiple randomized runs of K-Fold to produce high-confidence metric distributions.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import RepeatedStratifiedKFold\nrskf = RepeatedStratifiedKFold(n_splits=5, n_repeats=10, random_state=42)"
  },
  {
    "id": 10,
    "question": "What is an Out-of-Bag (OOB) Score in Random Forest models and why does it act as an embedded cross-validation?",
    "shortAnswer": "Each tree is trained on ~63.2% bootstrap sample; the remaining ~36.8% unselected samples (OOB) serve as a built-in validation test for that tree.",
    "explanation": "Because bootstrap sampling with replacement selects approximately 1 - 1/e \u2248 63.2% unique instances, every tree naturally has ~36.8% unused samples. Aggregating predictions across all trees where sample i was OOB yields a free, unbiased generalization score without explicit validation splits.",
    "hint": "Evaluating trees on the ~36.8% bootstrap instances omitted during random sampling.",
    "level": "Moderate",
    "codeExample": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=100, oob_score=True, random_state=42)\nrf.fit(X_train, y_train)\nprint('OOB Generalization Score:', rf.oob_score_)"
  },
  {
    "id": 11,
    "question": "What is the standard empirical rule for splitting dataset ratios when dataset sizes are small (N < 10,000) versus massive (N > 1,000,000)?",
    "shortAnswer": "Small datasets: 60/20/20 or 70/15/15 (or K-Fold); Massive big data: 98/1/1 or 99/0.5/0.5.",
    "explanation": "In classical statistics with 5,000 rows, reserving 20% (1,000 rows) is necessary to get statistically reliable validation metrics. But for 10,000,000 rows, 1% is 100,000 rows\u2014more than enough for extremely precise evaluation\u2014allowing 98% (9.8M rows) to be used for training deep models.",
    "hint": "Big data requires smaller percentage splits because 1% already contains hundreds of thousands of samples.",
    "level": "Basic",
    "codeExample": "# Massive dataset (10M rows): 98% Train (9.8M), 1% Val (100k), 1% Test (100k)"
  },
  {
    "id": 12,
    "question": "What is Nested Cross-Validation (Double Cross-Validation) and why is it the gold standard for unbiased performance estimation during hyperparameter tuning?",
    "shortAnswer": "An Inner CV loop tunes hyperparameters, while an Outer CV loop measures unbiased generalization error on held-out test folds.",
    "explanation": "Tuning hyperparameters and reporting final performance using the same cross-validation loop produces an optimistically biased error estimate. Nested CV isolates hyperparameter search to inner folds and evaluates the selected models on outer test folds.",
    "hint": "Outer loop for unbiased performance estimation; Inner loop for hyperparameter tuning.",
    "level": "Expert",
    "codeExample": "from sklearn.model_selection import GridSearchCV, cross_val_score\ninner_cv = KFold(n_splits=4, shuffle=True, random_state=1)\nouter_cv = KFold(n_splits=5, shuffle=True, random_state=2)\nclf = GridSearchCV(estimator=svc, param_grid=grid, cv=inner_cv)\nnested_score = cross_val_score(clf, X, y, cv=outer_cv)"
  },
  {
    "id": 13,
    "question": "What is Shuffled Split (ShuffleSplit / Monte Carlo Cross-Validation)?",
    "shortAnswer": "Repeatedly creating independent random train/test splits with replacement; splits are not guaranteed to be mutually exclusive partitions.",
    "explanation": "Unlike standard K-Fold (where every sample appears in validation exactly once), ShuffleSplit randomly samples train and test fractions over n_splits iterations. It allows full control over the number of iterations and train/test proportions independently.",
    "hint": "Independent random permutation subsampling without strict K-partition constraints.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import ShuffleSplit\nss = ShuffleSplit(n_splits=10, test_size=0.25, random_state=42)"
  },
  {
    "id": 14,
    "question": "What is the difference between In-Sample Error (Training Loss) and Out-of-Sample Error (Generalization Loss)?",
    "shortAnswer": "In-Sample error E_in is the loss computed on training data; Out-of-Sample error E_out is the expected loss over all possible unseen future data points.",
    "explanation": "A learning algorithm directly minimizes E_in = (1/N) \u2211 L(h(x_i), y_i). Statistical learning theory (VC bound) establishes that E_out \u2264 E_in + \u03a9(Complexity, N). Generalization is successful when E_out \u2248 E_in and E_in is small.",
    "hint": "Empirical training error vs expected real-world operational error.",
    "level": "Moderate",
    "codeExample": "# Generalization Gap = Validation_Loss - Training_Loss"
  },
  {
    "id": 15,
    "question": "How can Learning Curves (Training vs Validation Error plotted against Training Set Size N) diagnose Underfitting vs Overfitting?",
    "shortAnswer": "High Bias (Underfitting): Both train and val errors plateau at high loss; High Variance (Overfitting): Train error stays low while a large gap separates high val error.",
    "explanation": "If both curves plateau at high error, adding more data will NOT help (model needs more complexity / features). If a large generalization gap exists between low train error and high val error, adding more training data or regularization will close the gap.",
    "hint": "High plateau = High Bias; Wide separation gap = High Variance.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import learning_curve\ntrain_sizes, train_scores, val_scores = learning_curve(model, X, y, cv=5)"
  },
  {
    "id": 16,
    "question": "What is a Validation Curve (plotting Training and Validation Scores against a single Hyperparameter)?",
    "shortAnswer": "A visual plot showing model performance as a function of hyperparameter complexity (e.g., polynomial degree, tree depth, regularization C).",
    "explanation": "At low complexity: both train and val scores are low (Underfitting). As complexity increases: val score reaches a peak maximum (Optimal Hyperparameter). Beyond the peak: train score keeps climbing toward 100% while val score plunges (Overfitting).",
    "hint": "Identifies the optimal hyperparameter value at the peak of the validation curve.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import validation_curve\ntrain_sc, val_sc = validation_curve(SVC(), X, y, param_name='C', param_range=np.logspace(-3, 2, 6))"
  },
  {
    "id": 17,
    "question": "Why should the Test Set NEVER be used to make modeling decisions, perform feature selection, or tweak thresholds?",
    "shortAnswer": "Human modelers iteratively tuning against the test set introduce 'Human Data Leakage', destroying the test set's integrity as an unbiased real-world audit.",
    "explanation": "If a data scientist selects model architecture A over B because A scored higher on the test set, the test set has effectively influenced the model. In production, such models suffer unexpected accuracy drops. Keep the test set locked in a vault.",
    "hint": "Testing multiple model decisions against the test set overfits the human to the test set.",
    "level": "Basic",
    "codeExample": "# Rule: Touch X_test, y_test exactly ONCE for final audit reporting"
  },
  {
    "id": 18,
    "question": "What is the role of Data Stratification when splitting continuous regression targets?",
    "shortAnswer": "Binning the continuous target into quantiles before splitting to ensure the train and test sets have identical target distribution percentiles.",
    "explanation": "If house prices range from \u20b910 Lakhs to \u20b910 Crore, a random split might accidentally place all rare ultra-luxury mansions into the test set. Stratifying on binned price quantiles guarantees both train and test splits reflect the full price distribution.",
    "hint": "Quantile binning of continuous targets to ensure balanced regression splits.",
    "level": "Moderate",
    "codeExample": "# Regression stratification\nprice_bins = pd.qcut(y_continuous, q=5, labels=False)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=price_bins)"
  },
  {
    "id": 19,
    "question": "What is Data Leakage via Duplicate / Near-Duplicate Samples and how does it happen in web scraped data?",
    "shortAnswer": "Identical or near-identical scraped articles/images landing in both train and test splits, causing the model to memorize instances and report fake high accuracy.",
    "explanation": "Web scrapes often contain mirrored articles or reposted images. If 5 identical copies of an article exist, random splitting puts 4 in train and 1 in test. Deduplication (using MinHash LSH or image perceptual hashes) before splitting is mandatory.",
    "hint": "Removing near-identical copies before splitting to prevent memorization cheating.",
    "level": "Moderate",
    "codeExample": "# Deduplication before splitting\ndf_cleaned = df.drop_duplicates(subset=['text_content'])"
  },
  {
    "id": 20,
    "question": "What is Spatial Autocorrelation (Spatial Data Leakage) in GIS / Geospatial machine learning?",
    "shortAnswer": "Points close in geographical space share correlated environmental characteristics; random splitting places adjacent pixels in both train and test.",
    "explanation": "According to Tobler's First Law of Geography: 'Everything is related to everything else, but near things are more related than distant things.' Randomly splitting satellite imagery pixels leads to massive leakage. Spatial Block Cross-Validation (splitting by geographic regions) must be used.",
    "hint": "Geographical proximity requires spatial block splitting rather than random pixel splitting.",
    "level": "Expert",
    "codeExample": "# Spatial Block CV: Train on North District, Test on South District"
  },
  {
    "id": 21,
    "question": "What is Pre-quential Evaluation (Test-Then-Train / Interleaved Evaluation) in streaming data streams?",
    "shortAnswer": "For each incoming streaming data point: first test the current model's prediction on it, log the error, and then update model weights with the sample.",
    "explanation": "In online streaming machine learning (e.g. River library), there is no fixed static dataset. Every instance serves as a test instance first, providing an ongoing rolling estimate of accuracy, before immediately transitioning into a training example.",
    "hint": "Online continuous stream evaluation: test prediction first, then update weights.",
    "level": "Expert",
    "codeExample": "# Streaming pre-quential loop\nfor x_t, y_t in data_stream:\n    y_pred = model.predict_one(x_t)\n    metric.update(y_t, y_pred)\n    model.learn_one(x_t, y_t)"
  },
  {
    "id": 22,
    "question": "How does Data Augmentation expand training data volume without polluting the test distribution?",
    "shortAnswer": "Applying label-preserving domain transformations (rotations, cropping, color jitter, text back-translation) strictly to training instances.",
    "explanation": "Data augmentation increases dataset diversity and teaches invariance to trivial transformations. Crucially, augmentation must never be applied to validation/test sets, as test metrics must evaluate clean, uncorrupted real-world baseline distributions.",
    "hint": "Synthesizing transformed variants strictly within the training fold.",
    "level": "Basic",
    "codeExample": "# Apply transformations inside training pipeline only\nX_train_augmented = augment_images(X_train)\n# Test set remains strictly pristine and untouched"
  },
  {
    "id": 23,
    "question": "What is Adversarial Validation and how is it used to test if train and test distributions differ?",
    "shortAnswer": "Training a binary classifier to distinguish between Train samples (label 0) and Test samples (label 1); AUC \u2248 0.5 means identical distributions, while AUC >> 0.5 reveals distribution mismatch.",
    "explanation": "If a classifier can easily tell whether a data row came from the training set or test set (e.g. AUC = 0.95), significant Covariate Shift exists between the two. Identifying top feature importances in the adversarial model pinpoints which features are drifting.",
    "hint": "Classifying Train vs Test to detect covariate distribution shift.",
    "level": "Expert",
    "codeExample": "# Adversarial Validation\nX_all = np.vstack([X_train, X_test])\ny_adv = np.array([0]*len(X_train) + [1]*len(X_test))\nadv_auc = cross_val_score(RandomForestClassifier(), X_all, y_adv, scoring='roc_auc').mean()"
  },
  {
    "id": 24,
    "question": "What is Purged and Embargoed Cross-Validation in financial quantitative modeling (formalized by Marcos L\u00f3pez de Prado)?",
    "shortAnswer": "Purging removes training labels whose outcome evaluation window overlaps with the test set; Embargoing drops samples immediately following test events to eliminate serial correlation.",
    "explanation": "Financial labels (e.g. 5-day holding return) span multiple days. If a test fold begins on day 10, a training sample on day 8 uses price data spanning days 8-13 (overlapping with test). Purging removes overlapping spans to eliminate look-ahead information leakage.",
    "hint": "Eliminates multi-day holding period outcome overlap in quantitative financial modeling.",
    "level": "Expert",
    "codeExample": "# Purged CV: Purges training samples whose label window [t_start, t_end] intersects with test window"
  },
  {
    "id": 25,
    "question": "Why is it dangerous to perform feature selection on the entire dataset prior to splitting into cross-validation folds?",
    "shortAnswer": "The selected feature subset incorporates target correlations present in the validation folds (Selection Leakage), causing optimistic validation bias.",
    "explanation": "Even if the feature columns are pure Gaussian random noise with zero true relationship to y, testing 50,000 noise features across all samples will find ~50 features that correlate with y by pure random chance. When cross-validated, these 50 noise features will report high fake accuracy.",
    "hint": "Feature selection must be repeated inside each training cross-validation fold.",
    "level": "Moderate",
    "codeExample": "# Correct: Wrap feature selector in Pipeline inside Cross-Validation"
  },
  {
    "id": 26,
    "question": "What is Bootstrapping (Bagging Resampling) and how does it create resampled datasets?",
    "shortAnswer": "Sampling N instances uniformly with replacement from a dataset of size N, producing datasets where some instances appear multiple times and ~36.8% are omitted.",
    "explanation": "Bootstrap sampling allows estimating confidence intervals and standard errors for any statistical estimator. It provides the algorithmic foundation for Bootstrap Aggregation (Bagging) in Random Forests.",
    "hint": "Sampling with replacement producing ~63.2% unique and ~36.8% omitted instances.",
    "level": "Moderate",
    "codeExample": "def bootstrap_sample(X, y):\n    n = len(X)\n    indices = np.random.choice(n, size=n, replace=True)\n    return X[indices], y[indices]"
  },
  {
    "id": 27,
    "question": "What is the difference between Transductive and Inductive dataset splitting?",
    "shortAnswer": "Inductive splits assume test points are completely unobserved during training; Transductive splits include unlabeled test feature vectors X_test during training.",
    "explanation": "Standard supervised learning is inductive (learning a generalizable rule f(x)). Transductive learning (semi-supervised graph models) uses knowledge of the test feature distribution X_test to constrain model boundaries, predicting labels specifically for that fixed test set.",
    "hint": "Unseen test points vs known unlabeled test feature coordinates.",
    "level": "Expert",
    "codeExample": "# Inductive: model.fit(X_train, y_train); model.predict(X_novel_test)\n# Transductive: model.fit(X_train_and_unlabeled_test)"
  },
  {
    "id": 28,
    "question": "How does Stratified Shuffle Split combine shuffling with label proportion preservation?",
    "shortAnswer": "It generates randomized train/test splits where each split is created by independently sampling with exact target class percentage preservation.",
    "explanation": "Unlike StratifiedKFold (which fixes the number of folds K), StratifiedShuffleSplit allows running an arbitrary number of random train-validation splits (e.g. 100 splits) with customized split percentages (e.g. 80/20) while guaranteeing strict stratification.",
    "hint": "Combines arbitrary randomized split counts with strict class proportion matching.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import StratifiedShuffleSplit\nsss = StratifiedShuffleSplit(n_splits=10, test_size=0.2, random_state=42)"
  },
  {
    "id": 29,
    "question": "What is the holdout method and what is its primary weakness compared to K-Fold cross-validation on small datasets?",
    "shortAnswer": "A single static train/test split; its weakness is high variance\u2014performance score depends heavily on which specific points land in the test set.",
    "explanation": "On a dataset with only 200 samples, a single lucky or unlucky 80/20 split can swing accuracy by \u00b110%. K-Fold mitigates this by averaging across all K partitions, maximizing data efficiency and stabilizing variance.",
    "hint": "Single random split has high variance and high sensitivity to sample luck.",
    "level": "Basic",
    "codeExample": "# Holdout: Fast for 10M samples, but noisy and unreliable for 200 samples"
  },
  {
    "id": 30,
    "question": "What is the fundamental rule of Data Hygiene in Machine Learning workflows?",
    "shortAnswer": "Strict separation between training and evaluation data: any computation, imputation, scaling, feature selection, or hyperparameter choice must use training data only.",
    "explanation": "Violating data hygiene leads to catastrophic production failures where models report 95% accuracy in research sandboxes but plunge to 50% upon deployment. Wrapping all preprocessing and modeling inside formal pipeline constructs guarantees absolute data isolation.",
    "hint": "Absolute isolation of test evaluation data from all training transformations.",
    "level": "Basic",
    "codeExample": "# The Golden Rule: Pipeline(steps=[('transform', Transformer()), ('model', Model())]).fit(X_train, y_train)"
  }
];

export default questions;
