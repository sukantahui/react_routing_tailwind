/**
 * Topic 10: Machine Learning Workflow
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What are the core sequential stages of an end-to-end Machine Learning Workflow?",
    "shortAnswer": "1. Problem Framing \u2192 2. Data Ingestion \u2192 3. EDA & Cleaning \u2192 4. Feature Engineering \u2192 5. Model Selection & Training \u2192 6. Validation \u2192 7. Deployment \u2192 8. Monitoring.",
    "explanation": "An ML project begins with translating a business objective into a mathematical ML task. It proceeds through data gathering, exploratory data analysis, transformation, baseline modeling, hyperparameter optimization, containerized serving, and real-time concept drift monitoring.",
    "hint": "From business problem definition to production deployment and drift monitoring.",
    "level": "Basic",
    "codeExample": "# Lifecycle: Problem Formulation \u2192 Pipeline Construction \u2192 Training \u2192 Evaluation \u2192 MLOps Serving"
  },
  {
    "id": 2,
    "question": "Why is 'Problem Formulation & Framing' the most critical initial phase of an ML project?",
    "shortAnswer": "Framing determines the mathematical task type (classification, regression, ranking), target variable definition, evaluation metric, and data requirements.",
    "explanation": "If a business goal (e.g. 'boost customer loyalty') is incorrectly translated into the wrong objective (e.g. optimizing click-through rate instead of 90-day retention), even a 99% accurate model will deliver negative business value. Correct framing aligns loss functions with business KPIs.",
    "hint": "Mapping vague business goals into precise mathematical optimization objectives.",
    "level": "Basic",
    "codeExample": "# Framing: Business KPI (Churn Reduction) \u2192 ML Metric (Recall @ 80% Precision on Churn Class)"
  },
  {
    "id": 3,
    "question": "What is Exploratory Data Analysis (EDA) and what key insights does it provide?",
    "shortAnswer": "Analyzing dataset distributions, summary statistics, missing value patterns, correlations, and anomalies before modeling.",
    "explanation": "EDA employs histograms, boxplots, pairplots, and correlation heatmaps to detect outliers, assess skewness, verify class balance, uncover multicollinearity, and formulate informed hypotheses for feature engineering.",
    "hint": "Visual and statistical profiling of raw data distributions and correlations.",
    "level": "Basic",
    "codeExample": "import pandas as pd\nimport seaborn as sns\ndf = pd.read_csv('data.csv')\nprint(df.describe())\nprint(df.isnull().sum())\nsns.heatmap(df.corr(), annot=True)"
  },
  {
    "id": 4,
    "question": "What is the difference between Feature Selection and Feature Extraction?",
    "shortAnswer": "Feature Selection selects a subset of original features without alteration; Feature Extraction creates new transformed low-dimensional features.",
    "explanation": "Feature Selection (e.g. SelectKBest, Lasso L1, Recursive Feature Elimination) keeps a subset of existing columns, preserving interpretability. Feature Extraction (e.g. PCA, Autoencoders, t-SNE) projects high-dimensional data into new mathematical composite dimensions.",
    "hint": "Filtering existing columns vs synthesizing new mathematical combinations.",
    "level": "Moderate",
    "codeExample": "# Selection: SelectKBest(k=5).fit_transform(X, y)\n# Extraction: PCA(n_components=5).fit_transform(X)"
  },
  {
    "id": 5,
    "question": "Why must a simple Baseline Model (e.g. DummyClassifier or simple Linear/Logistic model) be established early in the workflow?",
    "shortAnswer": "It establishes a minimum performance benchmark to verify that complex models are truly learning non-trivial patterns.",
    "explanation": "Without a baseline (such as predicting the majority class or average target), a team might spend weeks building a deep neural network achieving 85% accuracy on an imbalanced dataset where a zero-rule dummy model achieves 90% trivially. Baselines quantify marginal ROI.",
    "hint": "Minimum sanity-check threshold to prove that complex ML algorithms add value.",
    "level": "Basic",
    "codeExample": "from sklearn.dummy import DummyClassifier\ndummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_train, y_train)\nprint('Baseline Benchmark Accuracy:', dummy.score(X_test, y_test))"
  },
  {
    "id": 6,
    "question": "What is Hyperparameter Tuning, and how does Grid Search compare to Random Search?",
    "shortAnswer": "Grid Search exhaustively evaluates all predefined parameter combinations; Random Search samples random combinations from distributions, finding better models faster.",
    "explanation": "Hyperparameters (e.g., learning rate, tree depth, regularization C) are external configurations not learned from data. Bergstra and Bengio (2012) proved that Random Search is mathematically superior because it tests significantly more unique values along important dimensions within the same computational budget.",
    "hint": "Exhaustive combinatorial grid vs random distribution sampling.",
    "level": "Moderate",
    "codeExample": "from sklearn.model_selection import RandomizedSearchCV\nfrom scipy.stats import uniform, randint\nparam_dist = {'C': uniform(0.1, 10), 'max_depth': randint(3, 10)}\nsearch = RandomizedSearchCV(estimator, param_dist, n_iter=50, cv=5)"
  },
  {
    "id": 7,
    "question": "What is Bayesian Optimization for hyperparameter tuning (e.g. Optuna, Hyperopt)?",
    "shortAnswer": "A sequential search strategy that uses a Gaussian Process or TPE surrogate model to intelligently query hyperparameters likely to maximize validation score.",
    "explanation": "Unlike Grid or Random Search (which are blind to past trial results), Bayesian Optimization constructs a probabilistic model P(Score | Hyperparameters). It balances Exploration (testing uncertain regions) and Exploitation (refining near top-performing parameters) via Acquisition Functions (e.g. Expected Improvement).",
    "hint": "Surrogate model using past trial performance to choose optimal future hyperparameter queries.",
    "level": "Expert",
    "codeExample": "# Optuna Trial Optimization\n# def objective(trial):\n#     lr = trial.suggest_float('lr', 1e-4, 1e-1, log=True)\n#     return evaluate_model(lr)"
  },
  {
    "id": 8,
    "question": "What is Data Preprocessing Leakage and why must transformers be wrapped in a scikit-learn Pipeline?",
    "shortAnswer": "Leakage occurs if transformation statistics (mean, std, vocabulary) are calculated using test data; Pipelines ensure `fit` occurs strictly on training folds.",
    "explanation": "Calling `scaler.fit_transform(X)` on the whole dataset before `train_test_split` leaks test distribution parameters (\u03bc, \u03c3) into training. A `Pipeline` isolates transformations so that in cross-validation, `fit` runs only on training folds and `transform` on validation folds.",
    "hint": "Ensures all data scaling and imputation statistics are fitted strictly on training data.",
    "level": "Moderate",
    "codeExample": "from sklearn.pipeline import Pipeline\npipeline = Pipeline([\n    ('imputer', SimpleImputer(strategy='median')),\n    ('scaler', StandardScaler()),\n    ('clf', RandomForestClassifier())\n])"
  },
  {
    "id": 9,
    "question": "What is Model Serialization (e.g. Joblib, Pickle, ONNX) in the deployment phase?",
    "shortAnswer": "Converting the trained in-memory model object and its parameters into a byte stream file on disk for persistent storage and production inference.",
    "explanation": "Once training completes, the model object containing weight matrices, vocabulary mappings, and decision trees is serialized (e.g. `.joblib` or `.onnx` file). Production microservices load this serialized artifact to score incoming REST API requests without retraining.",
    "hint": "Saving trained model parameters to a disk file for instant serving in production.",
    "level": "Basic",
    "codeExample": "import joblib\njoblib.dump(pipeline, 'production_model.joblib')\n# In production API:\nloaded_model = joblib.load('production_model.joblib')\nprediction = loaded_model.predict(new_json_payload)"
  },
  {
    "id": 10,
    "question": "What is the difference between Batch Inference and Real-Time (Online) Inference?",
    "shortAnswer": "Batch inference computes predictions periodically in bulk over large static tables (e.g. nightly churn scores); Real-time inference scores individual requests instantly via low-latency APIs (<50ms).",
    "explanation": "Batch Inference processes millions of records offline on scheduled cron jobs (high throughput, loose latency). Real-Time Inference processes streaming user interactions (e.g. fraud detection, live translation) via REST/gRPC endpoints demanding sub-second responses.",
    "hint": "Offline scheduled bulk processing vs live low-latency REST API requests.",
    "level": "Moderate",
    "codeExample": "# Batch: model.predict(df_10million_records) -> save to SQL\n# Real-Time: return JSON({'prediction': model.predict([request.body.features])})"
  },
  {
    "id": 11,
    "question": "What is Data Drift (Covariate Shift) in production machine learning systems?",
    "shortAnswer": "When the statistical distribution of input features P(X) changes over time while the conditional relationship P(Y|X) remains constant.",
    "explanation": "For example, if a retail recommendation model was trained on pre-pandemic shopping habits, a sudden shift toward home fitness equipment changes the input distribution P(X). The model's predictive accuracy degrades because production inputs drift away from the training distribution.",
    "hint": "Changes in feature distribution P(X) causing production model degradation.",
    "level": "Moderate",
    "codeExample": "# Detected via Kolmogorov-Smirnov test or Population Stability Index (PSI)\n# if PSI(X_prod, X_train) > 0.2: Trigger alert for data drift"
  },
  {
    "id": 12,
    "question": "What is Concept Drift and how does it differ from Data Drift?",
    "shortAnswer": "Concept drift occurs when the fundamental relationship between features and target P(Y|X) changes over time (e.g. macroeconomic shifts alter fraud behaviors).",
    "explanation": "In Concept Drift, identical feature values x produce different ground truth outcomes y over time (e.g. what counted as a normal luxury purchase in 2019 is now flagged as fraud in 2026). This renders the learned hypothesis function h(x) obsolete, requiring model retraining.",
    "hint": "The ground truth definition / mapping P(Y|X) evolves over time.",
    "level": "Moderate",
    "codeExample": "# Concept Drift: P_t0(Fraud | Amount=5000) != P_t1(Fraud | Amount=5000)"
  },
  {
    "id": 13,
    "question": "What is a Feature Store in enterprise ML infrastructure (e.g. Feast, Tecton)?",
    "shortAnswer": "A centralized repository that manages feature engineering logic, serving consistent feature values for both offline batch training and online real-time inference.",
    "explanation": "Feature Stores eliminate Training-Serving Skew. If the data science team engineers a feature in Python/Pandas for training, while the backend team writes it in Java for the API, subtle calculation differences corrupt predictions. A Feature Store unifies definitions.",
    "hint": "Single source of truth for computed features across training pipelines and real-time APIs.",
    "level": "Expert",
    "codeExample": "# Online feature retrieval: feature_store.get_online_features(entity_keys=['cust_101'])"
  },
  {
    "id": 14,
    "question": "What is Training-Serving Skew and what are its primary causes?",
    "shortAnswer": "A discrepancy between model performance during training/evaluation and its actual performance in production serving.",
    "explanation": "Common causes: 1. Inconsistent data transformations between training code and API code. 2. Data leakage during training (using features unavailable at live inference time). 3. Stale feature values in real-time caches. 4. Unhandled production nulls or schema changes.",
    "hint": "Performance drop when moving from offline sandbox to live production environment.",
    "level": "Moderate",
    "codeExample": "# Cause: Using 'customer_total_spend_30days' at training time, but API only has 7-day spend"
  },
  {
    "id": 15,
    "question": "What is Canary Deployment in machine learning model release strategies?",
    "shortAnswer": "Routing a small fraction of live traffic (e.g. 5%) to a newly trained model while keeping 95% on the stable champion model to monitor real-time health.",
    "explanation": "Canary releases safeguard production against catastrophic regressions. The engineering team monitors API latency, error codes, and business conversions on the 5% canary slice before gradually ramping traffic to 100%.",
    "hint": "Gradual rollout to a small percentage of production traffic to verify stability.",
    "level": "Moderate",
    "codeExample": "# Traffic Router: 95% -> Model_v1 (Champion), 5% -> Model_v2 (Canary)"
  },
  {
    "id": 16,
    "question": "What is Shadow Deployment (Dark Launch) for ML models?",
    "shortAnswer": "Sending live production requests to both old and new models in parallel, but returning only the old model's response to the user while logging the new model's output.",
    "explanation": "Shadow deployment tests new models under full production scale, load, and data distributions with zero risk to user experience. The team evaluates the candidate model's latency and prediction accuracy offline before promoting it to primary serving.",
    "hint": "Parallel scoring of live requests in the background with zero user impact.",
    "level": "Moderate",
    "codeExample": "# Async shadow call: response = v1_model(req); log_async(v2_model(req))"
  },
  {
    "id": 17,
    "question": "What is A/B Testing in machine learning model evaluation?",
    "shortAnswer": "Randomly splitting users into Group A (Control: Model 1) and Group B (Treatment: Model 2) to measure statistical significance on actual business KPIs.",
    "explanation": "Offline metrics (like ROC-AUC or RMSE) do not guarantee business success. A/B testing measures real conversion rates, revenue per user, or engagement metrics using two-sample hypothesis testing (t-test / Z-test) to prove causal business improvement.",
    "hint": "Randomized controlled experiment measuring real-world user behavior differences.",
    "level": "Basic",
    "codeExample": "# User hashing: if hash(user_id) % 2 == 0: serve_model_A() else: serve_model_B()"
  },
  {
    "id": 18,
    "question": "What is Continuous Integration and Continuous Delivery for Machine Learning (CI/CD/CT)?",
    "shortAnswer": "Automating code testing, data validation, model retraining (Continuous Training), model validation gates, and deployment to production clusters.",
    "explanation": "In standard software, CI/CD tests and deploys code. In MLOps, CI/CD/CT adds automated data validation (Great Expectations), automated retraining on newly ingested data partitions, regression model testing against baseline benchmarks, and automated container deployment.",
    "hint": "Extending DevOps CI/CD with Continuous Training (CT) and data validation gates.",
    "level": "Expert",
    "codeExample": "# CI/CD/CT: Git Push / Data Arrive -> Run Unit Tests -> Retrain Model -> Gate Check -> Deploy"
  },
  {
    "id": 19,
    "question": "What is Model Governance and Model Registry (e.g. MLflow, Weights & Biases)?",
    "shortAnswer": "A centralized ledger tracking model versions, training hyperparameters, dataset artifacts, performance metrics, and deployment stage transitions (Staging, Production, Archived).",
    "explanation": "A Model Registry provides end-to-end lineage and auditability. It allows teams to reproduce any model trained years ago, track who approved a model for production release, and roll back instantly to previous versions if issues arise.",
    "hint": "Version control and lifecycle management system for trained ML model artifacts.",
    "level": "Basic",
    "codeExample": "import mlflow\nmlflow.log_params({'alpha': 0.1, 'max_depth': 5})\nmlflow.log_metric('val_f1', 0.89)\nmlflow.sklearn.log_model(model, 'churn_model')"
  },
  {
    "id": 20,
    "question": "How do missing values in raw tabular data get handled across different workflow stages?",
    "shortAnswer": "During EDA: analyze MCAR/MAR/MNAR patterns; Preprocessing: apply median/mode imputation, KNN imputer, or iterative mice imputation; Tree models can handle natively.",
    "explanation": "Dropping rows with missing values causes severe sample size reduction and selection bias. Imputation substitutes missing entries using statistical estimators (median for skewed numbers, most-frequent for categories) fitted strictly on the training partition.",
    "hint": "Imputation strategies replacing missing entries using training partition statistics.",
    "level": "Basic",
    "codeExample": "from sklearn.impute import SimpleImputer\nimputer = SimpleImputer(strategy='median')\nX_imputed = imputer.fit_transform(X_train)"
  },
  {
    "id": 21,
    "question": "What is Outlier Detection and Treatment in the data cleaning workflow stage?",
    "shortAnswer": "Identifying anomalous records using IQR (1.5 * IQR bounds), Z-scores (>3\u03c3), or Isolation Forests, and handling them via clipping (winsorization) or removal.",
    "explanation": "Extreme outliers distort linear regression slopes, variance calculations, and gradient updates. Winsorizing (capping features at 1st and 99th percentiles) preserves sample size while neutralising extreme mathematical leverage.",
    "hint": "Identifying anomalous values and capping them via IQR / percentile bounds.",
    "level": "Moderate",
    "codeExample": "# IQR Winsorization\nQ1, Q3 = np.percentile(x, [25, 75])\nIQR = Q3 - Q1\nx_clipped = np.clip(x, Q1 - 1.5 * IQR, Q3 + 1.5 * IQR)"
  },
  {
    "id": 22,
    "question": "What is Target Encoding (Mean Encoding) for high-cardinality categorical features and how do you prevent target leakage?",
    "shortAnswer": "Replacing categorical levels with the average target value of that category; target leakage is prevented using additive smoothing and out-of-fold computation.",
    "explanation": "For a zip code with 5,000 categories, One-Hot Encoding creates 5,000 sparse columns. Target encoding replaces each zip code with its mean target rate: S_i = (n * x_bar + m * global_mean) / (n + m). Calculating within K-fold loops prevents overfitting.",
    "hint": "Replacing categorical strings with smoothed conditional target averages.",
    "level": "Expert",
    "codeExample": "from category_encoders import TargetEncoder\nencoder = TargetEncoder(smoothing=10.0)\nX_encoded = encoder.fit_transform(X_train, y_train)"
  },
  {
    "id": 23,
    "question": "What is Recursive Feature Elimination (RFE) in the feature engineering workflow?",
    "shortAnswer": "A greedy backward selection method that iteratively trains a model, ranks feature importances, and prunes the least important features until the desired count is reached.",
    "explanation": "RFE repeatedly trains an estimator (e.g. SVM or Random Forest), identifies attributes with smallest weights/importances, removes them, and retrains. Cross-validated RFE (RFECV) automatically determines the optimal number of features.",
    "hint": "Iterative backward pruning of least important features based on model weights.",
    "level": "Moderate",
    "codeExample": "from sklearn.feature_selection import RFECV\nrfecv = RFECV(estimator=LogisticRegression(), step=1, cv=5)\nrfecv.fit(X_train, y_train)"
  },
  {
    "id": 24,
    "question": "What is the role of Early Stopping in iterative model training (e.g. XGBoost, Neural Networks)?",
    "shortAnswer": "Halting training iterations when validation loss stops improving for a specified number of consecutive epochs (patience), preventing overfitting.",
    "explanation": "As training epochs proceed, training error decreases monotonically, but validation error eventually reaches a global minimum and begins rising (overfitting). Early stopping captures parameter weights at the exact minimum validation epoch.",
    "hint": "Terminating training when validation loss stops improving to capture peak generalization.",
    "level": "Basic",
    "codeExample": "# Early stopping in XGBoost\n# model.fit(X_train, y_train, eval_set=[(X_val, y_val)], early_stopping_rounds=10)"
  },
  {
    "id": 25,
    "question": "What is Population Stability Index (PSI) used for in model monitoring?",
    "shortAnswer": "A statistical metric measuring how much a feature or prediction distribution in production has shifted compared to the baseline training distribution.",
    "explanation": "PSI = \u2211 (Actual% - Expected%) * ln(Actual% / Expected%). PSI < 0.1 indicates negligible shift; 0.1 \u2264 PSI \u2264 0.25 indicates moderate shift; PSI > 0.25 indicates significant population drift requiring urgent model retraining.",
    "hint": "Quantifies distributional divergence between training baseline and live production data.",
    "level": "Expert",
    "codeExample": "# PSI calculation across 10 decile bins\ndef calculate_psi(expected, actual, bins=10):\n    # Compares baseline training distribution against live production scoring"
  },
  {
    "id": 26,
    "question": "What is Containerization (Docker) and why is it standard in production ML deployment?",
    "shortAnswer": "Packaging the model binary, Python runtime, specific library dependency versions, and scoring API into an isolated, reproducible container image.",
    "explanation": "Containerization eliminates the 'it works on my machine' bug. A Docker image contains the exact scikit-learn/NumPy/Cuda versions required, enabling deterministic execution across Kubernetes clusters, AWS SageMaker, or GCP Vertex AI.",
    "hint": "Packaging code, model weights, and OS dependencies into portable reproducible containers.",
    "level": "Basic",
    "codeExample": "# Dockerfile: FROM python:3.11-slim; COPY requirements.txt .; RUN pip install -r requirements.txt; CMD ['uvicorn', 'api:app']"
  },
  {
    "id": 27,
    "question": "What is Feedback Loop (Delayed Ground Truth) in production ML systems?",
    "shortAnswer": "The time delay between generating a prediction and observing the true real-world outcome (e.g. loan defaults take 12-36 months to reveal).",
    "explanation": "In ad-click prediction, ground truth arrives within seconds. In credit risk or insurance claim fraud, ground truth may take years to finalize. Systems with long feedback loops must rely on data drift and prediction distribution monitoring rather than immediate accuracy scores.",
    "hint": "Lag time between model prediction and receiving verified real-world labels.",
    "level": "Moderate",
    "codeExample": "# In credit risk: Score loan in 2026 -> Ground truth default flag arrives in 2028"
  },
  {
    "id": 28,
    "question": "What is Model Degradation (Model Decay) and what are the standard strategies to mitigate it?",
    "shortAnswer": "The gradual decline in model accuracy over time due to evolving real-world behaviors; mitigated via automated scheduled retraining pipelines and continuous learning.",
    "explanation": "Because consumer preferences, financial trends, and competitor tactics shift, static models inevitably degrade. Engineering automated weekly or monthly retraining pipelines on the latest rolling window of data maintains peak predictive power.",
    "hint": "Natural loss of predictive power over time fixed by automated retraining.",
    "level": "Basic",
    "codeExample": "# Automated Retraining Cron: Every Sunday 02:00 UTC -> Ingest last 90 days -> Retrain -> Deploy"
  },
  {
    "id": 29,
    "question": "What is the purpose of Unit Testing and Integration Testing in Machine Learning codebases?",
    "shortAnswer": "Unit tests verify individual data transformations and mathematical shapes; Integration tests ensure the end-to-end pipeline outputs valid predictions without crashing.",
    "explanation": "Unlike standard software where bugs produce clear syntax errors, ML code can fail silently (e.g. subtle shape broadcasting bugs, accidental label inversion, unnormalized features). Assertions checking output ranges [0, 1] and non-null guarantees prevent silent failures.",
    "hint": "Asserting data shapes, value boundaries, and pipeline invariants to catch silent bugs.",
    "level": "Moderate",
    "codeExample": "def test_model_output_range():\n    preds = model.predict_proba(sample_data)\n    assert np.all(preds >= 0.0) and np.all(preds <= 1.0)\n    assert preds.shape == (len(sample_data), 2)"
  },
  {
    "id": 30,
    "question": "What is the role of an ML Technical Debt audit (as formalized by Sculley et al., Google)?",
    "shortAnswer": "Identifying hidden maintenance costs such as glue code, pipeline jungles, dead experimental code paths, feedback loops, and configuration debt.",
    "explanation": "In production systems, actual ML model code makes up only ~5% of the codebase; the remaining 95% is glue code, data ingestion, feature extraction, serving infrastructure, and monitoring. Minimizing architectural complexity ensures sustainable long-term reliability.",
    "hint": "Auditing peripheral pipeline infrastructure to reduce system fragility and maintenance costs.",
    "level": "Expert",
    "codeExample": "# Google ML Debt: 'Machine Learning: The High Interest Credit Card of Technical Debt'"
  }
];

export default questions;
