/**
 * Topic 7: Classification and Regression Overview
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the primary distinguishing factor between Classification and Regression tasks?",
    "shortAnswer": "Classification outputs discrete categorical class labels y \u2208 {0, 1, ..., K-1}; Regression outputs continuous numerical real values y \u2208 \u211d.",
    "explanation": "In supervised machine learning, the nature of the target variable y dictates the problem type. Predicting whether an email is Spam or Ham (discrete) is Classification. Predicting the market sale price of a house in \u20b9 Lakhs (continuous) is Regression.",
    "hint": "Discrete category buckets vs continuous numerical scale.",
    "level": "Basic",
    "codeExample": "# Classification: y in {'Cat', 'Dog'} or {0, 1}\n# Regression: y in [0.0, +infinity) e.g., 42.50 Lakhs"
  },
  {
    "id": 2,
    "question": "Which evaluation metrics are strictly tailored for Regression models?",
    "shortAnswer": "Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and Coefficient of Determination (R\u00b2 Score).",
    "explanation": "Regression metrics quantify the continuous residual distance between true values y_i and predictions y_hat_i: e_i = y_i - y_hat_i. Classification metrics (such as Accuracy, Precision, Recall, F1) evaluate category confusion tables and cannot be computed on continuous residuals.",
    "hint": "Residual difference metrics vs discrete classification confusion matrices.",
    "level": "Basic",
    "codeExample": "from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score\nmse = mean_squared_error(y_true, y_pred)\nr2 = r2_score(y_true, y_pred)"
  },
  {
    "id": 3,
    "question": "How does Mean Absolute Error (MAE) differ from Root Mean Squared Error (RMSE) in its sensitivity to outliers?",
    "shortAnswer": "MAE weights all residuals linearly (|y - y_hat|); RMSE squares residuals ((y - y_hat)^2) before averaging, penalizing large outlier errors heavily.",
    "explanation": "Because RMSE squares the error terms before taking the square root, a single huge prediction error (e.g. error of 50) inflates RMSE dramatically (50^2 = 2500). MAE is more robust to extreme anomalies and represents the median-like expected error.",
    "hint": "L1 linear penalty (robust) vs L2 quadratic penalty (outlier-sensitive).",
    "level": "Moderate",
    "codeExample": "mae = np.mean(np.abs(y_true - y_pred))\nrmse = np.sqrt(np.mean((y_true - y_pred) ** 2))"
  },
  {
    "id": 4,
    "question": "What does an R\u00b2 (Coefficient of Determination) Score of 0.85 mathematically represent?",
    "shortAnswer": "85% of the total variance in the target variable y is explained by the regression model's input features.",
    "explanation": "R\u00b2 = 1 - (SS_res / SS_tot) = 1 - [ \u2211 (y_i - y_hat_i)^2 / \u2211 (y_i - y_bar)^2 ]. An R\u00b2 of 1.0 indicates perfect prediction; 0.0 indicates performance identical to predicting the constant mean y_bar; negative R\u00b2 means the model performs worse than the simple baseline mean.",
    "hint": "Proportion of total target variance explained by the hypothesis function.",
    "level": "Moderate",
    "codeExample": "# R2 = 1 - (Residual Sum of Squares / Total Sum of Squares)\nr2 = 1.0 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))"
  },
  {
    "id": 5,
    "question": "What is the difference between Binary Classification, Multi-class Classification, and Multi-label Classification?",
    "shortAnswer": "Binary: 2 mutually exclusive classes; Multi-class: >2 mutually exclusive classes (1 chosen); Multi-label: multiple non-exclusive tags assigned simultaneously.",
    "explanation": "Binary: Pass / Fail (0 or 1). Multi-class: Digit recognition (0 to 9, exactly one digit per image). Multi-label: Article tagging (a single article can be simultaneously tagged 'Technology', 'Finance', and 'AI').",
    "hint": "2 choices vs 1 of N choices vs any combination of N tags.",
    "level": "Moderate",
    "codeExample": "# Binary: y = 1\n# Multi-class: y = 4 (out of 0-9)\n# Multi-label: y = [1, 0, 1, 1, 0] (multiple active tags)"
  },
  {
    "id": 6,
    "question": "Why is Logistic Regression classified as a Classification algorithm despite having 'Regression' in its name?",
    "shortAnswer": "It computes a continuous linear regression score w^T x + b (log-odds), but squashes it through a sigmoid function to classify discrete categories.",
    "explanation": "Internally, Logistic Regression performs linear regression on the log-odds (logit): ln(p / (1-p)) = w^T x + b. The sigmoid transformation maps this continuous logit to a class probability P(y=1|x), and a threshold (e.g. 0.5) assigns the discrete class label.",
    "hint": "Linear regression on log-odds thresholded for discrete class assignment.",
    "level": "Basic",
    "codeExample": "from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression().fit(X, y_binary)"
  },
  {
    "id": 7,
    "question": "What is the Decision Threshold in binary classification, and how does adjusting it affect the Precision-Recall trade-off?",
    "shortAnswer": "The probability cutoff (default 0.5) to assign positive class; raising threshold increases Precision but lowers Recall.",
    "explanation": "If we predict positive when P(y=1|x) \u2265 \u03b8: raising \u03b8 to 0.8 requires higher certainty, reducing false alarms (higher Precision) but missing borderline positive cases (lower Recall). Lowering \u03b8 to 0.2 catches more positive cases (higher Recall) at the cost of more false positives (lower Precision).",
    "hint": "High threshold = conservative/precise; Low threshold = aggressive/sensitive.",
    "level": "Moderate",
    "codeExample": "# Custom thresholding\ny_pred_custom = (model.predict_proba(X_test)[:, 1] >= 0.7).astype(int)"
  },
  {
    "id": 8,
    "question": "What is the difference between One-vs-Rest (OvR) and One-vs-One (OvO) multi-class strategies?",
    "shortAnswer": "OvR trains K binary classifiers (each class vs all others); OvO trains K*(K-1)/2 binary classifiers (one for every pairwise combination).",
    "explanation": "For K=4 classes: OvR trains 4 classifiers (C1 vs not-C1, C2 vs not-C2, etc.), choosing the class with highest output probability. OvO trains 4*3/2 = 6 pairwise classifiers (C1 vs C2, C1 vs C3, etc.), taking a majority vote.",
    "hint": "K classifiers (one vs rest) vs K*(K-1)/2 pairwise classifiers.",
    "level": "Moderate",
    "codeExample": "from sklearn.multiclass import OneVsRestClassifier, OneVsOneClassifier\novr = OneVsRestClassifier(LogisticRegression())\novo = OneVsOneClassifier(SVC())"
  },
  {
    "id": 9,
    "question": "What is Mean Absolute Percentage Error (MAPE) and what is its primary limitation in regression?",
    "shortAnswer": "MAPE measures average percentage error: (100%/N) \u2211 |(y - y_hat)/y|; it is undefined or explodes when actual target y is 0 or near-zero.",
    "explanation": "MAPE is intuitive for business stakeholders (e.g. 'our sales forecast has an average 5% error'). However, dividing by y_i causes division-by-zero errors when y=0, and heavily penalizes over-predictions more than under-predictions.",
    "hint": "Scale-free percentage error metric; fails when true value equals zero.",
    "level": "Moderate",
    "codeExample": "def mape(y_true, y_pred):\n    return np.mean(np.abs((y_true - y_pred) / (y_true + 1e-10))) * 100"
  },
  {
    "id": 10,
    "question": "What is Log-Cosh loss in regression, and why is it considered a smooth blend of MSE and MAE?",
    "shortAnswer": "L(y, y_hat) = ln(cosh(y_hat - y)); it acts like MSE for small errors and like MAE for large errors, with continuous derivatives everywhere.",
    "explanation": "For small residuals |e| << 1, log(cosh(e)) \u2248 e^2 / 2 (quadratic like MSE). For large residuals |e| >> 1, log(cosh(e)) \u2248 |e| - ln(2) (linear like MAE). This makes it twice differentiable everywhere and robust to outliers.",
    "hint": "Smoothly transitions from quadratic (MSE) near zero to linear (MAE) for large errors.",
    "level": "Expert",
    "codeExample": "# Log-Cosh Loss\ndef log_cosh_loss(y_true, y_pred):\n    return np.mean(np.log(np.cosh(y_pred - y_true)))"
  },
  {
    "id": 11,
    "question": "What is Huber Loss in regression, and what role does its hyperparameter \u03b4 (delta) play?",
    "shortAnswer": "Quadratic error for |y - y_hat| \u2264 \u03b4, and linear error for |y - y_hat| > \u03b4; \u03b4 defines the threshold where outlier robustness begins.",
    "explanation": "Huber loss combines the differentiability of MSE for small residuals with the outlier robustness of MAE for large residuals: L_\u03b4(e) = 0.5 e^2 if |e| \u2264 \u03b4, else \u03b4 (|e| - 0.5 \u03b4). Delta controls the boundary between normal variation and outlier penalties.",
    "hint": "Piecewise loss balancing MSE precision and MAE outlier resistance.",
    "level": "Expert",
    "codeExample": "from sklearn.linear_model import HuberRegressor\nhuber = HuberRegressor(epsilon=1.35).fit(X, y)"
  },
  {
    "id": 12,
    "question": "What is the Precision-Recall (PR) Curve, and why is it preferred over ROC curves for highly imbalanced classification?",
    "shortAnswer": "PR curve plots Precision vs Recall; it focuses solely on the minority positive class without being inflated by a large number of True Negatives.",
    "explanation": "ROC curve uses FPR = FP / (FP + TN). When TN is in the millions (e.g. ad click prediction), huge changes in FP barely move FPR, making ROC look misleadingly optimistic. PR curves directly expose false positives through the Precision denominator (TP + FP).",
    "hint": "PR curves ignore overwhelming True Negative counts in rare-event detection.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import precision_recall_curve, average_precision_score\nprec, rec, _ = precision_recall_curve(y_test, y_probs)\npr_auc = average_precision_score(y_test, y_probs)"
  },
  {
    "id": 13,
    "question": "What is the Cohen's Kappa score in classification evaluation?",
    "shortAnswer": "A metric that measures inter-rater agreement between predictions and ground truth, adjusted for agreement occurring purely by chance.",
    "explanation": "Kappa = (p_o - p_e) / (1 - p_e), where p_o is observed accuracy and p_e is expected accuracy under random chance. A Kappa of 1.0 means complete agreement; 0.0 means agreement no better than random guessing; <0 means worse than chance.",
    "hint": "Accuracy normalized against random chance agreement.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import cohen_kappa_score\nkappa = cohen_kappa_score(y_true, y_pred)"
  },
  {
    "id": 14,
    "question": "How does Polynomial Regression extend linear regression to model non-linear relationships?",
    "shortAnswer": "By creating polynomial and interaction feature powers (e.g., x_1^2, x_1 x_2) while keeping the model linear in its parameter weights w.",
    "explanation": "Polynomial regression transforms feature vector x = [x_1] into [1, x_1, x_1^2, ..., x_1^d]. The model equation y = w_0 + w_1 x_1 + w_2 x_1^2 + ... remains linear with respect to parameters w, allowing standard Ordinary Least Squares (OLS) closed-form solutions.",
    "hint": "Feature space power transformations while maintaining parameter linearity.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.pipeline import make_pipeline\npoly_reg = make_pipeline(PolynomialFeatures(degree=3), LinearRegression())\npoly_reg.fit(X, y)"
  },
  {
    "id": 15,
    "question": "What is Quantile Regression and when is it preferred over ordinary least squares mean regression?",
    "shortAnswer": "It models conditional quantiles (e.g. 10th, 50th median, 90th percentile) of the target distribution instead of just the conditional mean.",
    "explanation": "Standard OLS predicts E[Y|X]. Quantile regression minimizes the pinball loss to predict specific percentiles (e.g. estimating the 95th percentile peak electricity demand or 10th percentile lowest crop yield), providing complete prediction intervals.",
    "hint": "Predicting conditional percentiles/quantiles instead of conditional average.",
    "level": "Expert",
    "codeExample": "from sklearn.linear_model import QuantileRegressor\nqr_median = QuantileRegressor(quantile=0.5, alpha=0)\nqr_95 = QuantileRegressor(quantile=0.95, alpha=0)"
  },
  {
    "id": 16,
    "question": "What is the Matthews Correlation Coefficient (MCC) and why is it considered the most balanced classification metric?",
    "shortAnswer": "MCC = (TP*TN - FP*FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN)); it evaluates all 4 confusion matrix quadrants symmetrically from -1 to +1.",
    "explanation": "MCC returns a high score only if the model performs well across all four quadrants (TP, TN, FP, FN). It produces reliable scores even when classes are extremely skewed in size (e.g., 99:1 imbalance), unlike Accuracy or F1.",
    "hint": "Symmetric correlation coefficient across all four confusion matrix cells.",
    "level": "Expert",
    "codeExample": "from sklearn.metrics import matthews_corrcoef\nmcc = matthews_corrcoef(y_true, y_pred)"
  },
  {
    "id": 17,
    "question": "What is Multicollinearity in linear regression, and how can it be detected and resolved?",
    "shortAnswer": "High linear correlation between predictor features; detected using Variance Inflation Factor (VIF > 5-10) and resolved via Ridge regression or PCA.",
    "explanation": "Multicollinearity inflates standard errors of regression coefficients, making weight estimates erratic, unstable, and uninterpretable. Ridge regression (L2 regularization) handles multicollinearity by conditioning the ill-conditioned matrix (X^T X + \u03bb I)^{-1}.",
    "hint": "Inter-feature redundancy destabilizing regression weight coefficients.",
    "level": "Moderate",
    "codeExample": "from statsmodels.stats.outliers_influence import variance_inflation_factor\nvif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]"
  },
  {
    "id": 18,
    "question": "What is Cost-Sensitive Learning in classification?",
    "shortAnswer": "Assigning different penalty weights to different misclassification types (e.g. FN costing 100x more than FP).",
    "explanation": "In cancer diagnosis, a False Negative (missing cancer) can result in death, whereas a False Positive (extra biopsy) is merely inconvenient. Cost-sensitive algorithms incorporate a cost matrix C(y_true, y_pred) into the optimization loss function.",
    "hint": "Unequal financial or clinical penalties for False Positives vs False Negatives.",
    "level": "Moderate",
    "codeExample": "# Adjust class weight in scikit-learn\nmodel = LogisticRegression(class_weight={0: 1.0, 1: 25.0})"
  },
  {
    "id": 19,
    "question": "What is the Ordinary Least Squares (OLS) closed-form Normal Equation for linear regression?",
    "shortAnswer": "w* = (X^T X)^{-1} X^T y.",
    "explanation": "Setting the gradient of the MSE cost function \u2207_w J(w) = 0 yields the normal equations X^T X w = X^T y. Inverting (X^T X) solves directly for optimal weights w* in a single analytical step without requiring iterative gradient descent.",
    "hint": "Analytical matrix solution setting loss gradient to zero.",
    "level": "Moderate",
    "codeExample": "# Analytical Normal Equation\nw_opt = np.linalg.inv(X.T @ X) @ X.T @ y"
  },
  {
    "id": 20,
    "question": "Why is Gradient Descent preferred over the analytical Normal Equation when dataset size N or feature count d is very large?",
    "shortAnswer": "Matrix inversion (X^T X)^{-1} requires O(d^3) computation and O(d^2) memory, which becomes prohibitive for d > 10,000 features.",
    "explanation": "Calculating (X^T X)^{-1} for 100,000 features requires inverting a 100,000 x 100,000 matrix (astronomical RAM and CPU time). Iterative gradient descent scales linearly with O(N * d) per epoch and works seamlessly with mini-batches on GPUs.",
    "hint": "Cubic computational complexity O(d^3) of matrix inversion.",
    "level": "Moderate",
    "codeExample": "# For large d: Use SGDRegressor rather than closed-form LinearRegression\nfrom sklearn.linear_model import SGDRegressor\nsgd = SGDRegressor(loss='squared_error', max_iter=1000)"
  },
  {
    "id": 21,
    "question": "What is Brier Score in probabilistic classification evaluation?",
    "shortAnswer": "The mean squared difference between predicted class probabilities and actual binary outcomes: (1/N) \u2211 (p_i - y_i)^2.",
    "explanation": "Brier score measures both calibration (whether predicted 80% confidence events actually occur 80% of the time) and refinement. A Brier score of 0.0 is perfect; 0.25 is random guessing for binary 50/50 balance.",
    "hint": "Mean squared error applied directly to predicted probabilities.",
    "level": "Expert",
    "codeExample": "from sklearn.metrics import brier_score_loss\nbrier = brier_score_loss(y_true, y_probs)"
  },
  {
    "id": 22,
    "question": "What is Probability Calibration (Platt Scaling / Isotonic Regression) in classification?",
    "shortAnswer": "Post-processing raw model scores to ensure predicted probabilities accurately match true empirical occurrence rates.",
    "explanation": "Models like SVMs, Naive Bayes, or boosted trees often output distorted probability magnitudes. Platt Scaling fits a logistic sigmoid on raw logits; Isotonic Regression fits a non-parametric isotonic step function to calibrate output confidence scores.",
    "hint": "Aligning model confidence percentages with real-world observed frequencies.",
    "level": "Expert",
    "codeExample": "from sklearn.calibration import CalibratedClassifierCV\ncalibrated_clf = CalibratedClassifierCV(base_estimator=svm, method='sigmoid', cv=5)\ncalibrated_clf.fit(X_train, y_train)"
  },
  {
    "id": 23,
    "question": "How does ElasticNet Regression unify Ridge and Lasso regularizations?",
    "shortAnswer": "By combining L1 and L2 penalty terms: J(w) = MSE + \u03bb [ \u03b1 \u2211|w_j| + (1-\u03b1)/2 \u2211w_j^2 ].",
    "explanation": "ElasticNet overcomes Lasso's limitation when dealing with groups of highly correlated features. While Lasso arbitrarily picks one feature from a correlated group, ElasticNet's L2 quadratic term encourages group selection while L1 promotes sparsity.",
    "hint": "Convex linear combination of L1 (sparsity) and L2 (grouping) regularization.",
    "level": "Moderate",
    "codeExample": "from sklearn.linear_model import ElasticNet\nenet = ElasticNet(alpha=0.1, l1_ratio=0.5)"
  },
  {
    "id": 24,
    "question": "What is Poisson Regression and when is it applied instead of standard linear regression?",
    "shortAnswer": "Used when the target variable y represents non-negative integer count data (e.g. website visits per hour, hospital admissions).",
    "explanation": "Count data is discrete, non-negative (y \u2208 {0, 1, 2, ...}), and often exhibits heteroscedastic variance (variance increases with mean). Poisson regression models log(\u03bb) = w^T x where target y follows a Poisson distribution P(y | \u03bb) = (\u03bb^y e^-\u03bb) / y!.",
    "hint": "Predicting non-negative integer arrival counts / rates.",
    "level": "Expert",
    "codeExample": "from sklearn.linear_model import PoissonRegressor\npoisson = PoissonRegressor(alpha=1e-4).fit(X, y_counts)"
  },
  {
    "id": 25,
    "question": "What is Multi-Output (Multi-Target) Regression?",
    "shortAnswer": "Predicting multiple continuous target variables simultaneously: f: \u211d^d \u2192 \u211d^m (where m > 1).",
    "explanation": "In applications like wind turbine control or robotics, a model must predict both torque and pitch angle simultaneously. Multi-output regression models capture inter-target correlations rather than training independent isolated regressors.",
    "hint": "Vector target outputs y = [y_1, y_2, ..., y_m] from a single model.",
    "level": "Moderate",
    "codeExample": "from sklearn.multioutput import MultiOutputRegressor\nfrom sklearn.ensemble import RandomForestRegressor\nmulti_reg = MultiOutputRegressor(RandomForestRegressor()).fit(X, Y_multi_targets)"
  },
  {
    "id": 26,
    "question": "What is the Geometric Interpretation of the Decision Boundary in Linear Classification?",
    "shortAnswer": "The hyperplane perpendicular to weight vector w at distance -b / ||w|| from the origin.",
    "explanation": "The decision surface equation is w^T x + b = 0. The weight vector w serves as the normal vector defining the plane's spatial orientation, and bias b adjusts its offset from the coordinate origin. Points where w^T x + b > 0 lie on the positive side.",
    "hint": "Hyperplane whose normal orientation vector is w with offset b.",
    "level": "Moderate",
    "codeExample": "# Normal vector w is orthogonal to the decision boundary line"
  },
  {
    "id": 27,
    "question": "What is the Logit function in binary classification?",
    "shortAnswer": "The inverse of the standard logistic sigmoid: logit(p) = ln(p / (1 - p)) (the natural logarithm of odds).",
    "explanation": "The logit maps a probability interval p \u2208 (0, 1) to the entire real line (-\u221e, +\u221e). In logistic regression, the logit of the posterior probability is modeled as a linear combination of input features: logit(P(y=1|x)) = w^T x + b.",
    "hint": "Natural logarithm of the odds ratio p / (1 - p).",
    "level": "Moderate",
    "codeExample": "def logit(p):\n    return np.log(p / (1.0 - p))"
  },
  {
    "id": 28,
    "question": "What is Adjusted R\u00b2 and why is it preferred over standard R\u00b2 in Multiple Regression?",
    "shortAnswer": "Adjusted R\u00b2 penalizes the addition of non-informative predictor variables: 1 - [(1 - R\u00b2)(N - 1) / (N - p - 1)].",
    "explanation": "Standard R\u00b2 never decreases when new features are added to a regression model, even if the features are random noise. Adjusted R\u00b2 incorporates degrees of freedom (number of samples N and predictors p), only increasing if the new feature improves the model beyond chance.",
    "hint": "Penalizes model complexity to prevent false inflation from useless features.",
    "level": "Moderate",
    "codeExample": "# Adjusted R2\nadj_r2 = 1 - (1 - r2) * (N - 1) / (N - p - 1)"
  },
  {
    "id": 29,
    "question": "What is the Cumulative Gains Chart and Lift Curve in classification?",
    "shortAnswer": "Visual tools showing the percentage of total positive targets captured when contacting the top X% highest-scoring leads.",
    "explanation": "Used extensively in marketing and risk targeting. If contacting the top 20% highest-scoring customers captures 70% of all potential churners, the model provides a Lift of 70% / 20% = 3.5x over random customer outreach.",
    "hint": "Evaluates targeted outreach efficiency against random selection baselines.",
    "level": "Moderate",
    "codeExample": "# Lift at 20% decile = (% of churners in top 20%) / (20%)"
  },
  {
    "id": 30,
    "question": "How can a regression model be converted into a binary classification model?",
    "shortAnswer": "By applying a continuous threshold \u03c4 to the regression output: y_class = 1 if y_reg \u2265 \u03c4 else 0.",
    "explanation": "For instance, a regression model predicting blood glucose level (mg/dL) can be converted into a diabetic classifier by applying clinical threshold \u03c4 = 126 mg/dL. Conversely, classification probabilities can feed into expected monetary value calculations.",
    "hint": "Applying a domain cutoff threshold to continuous predictions.",
    "level": "Basic",
    "codeExample": "predicted_glucose = regressor.predict(X)\ndiabetes_class = (predicted_glucose >= 126.0).astype(int)"
  }
];

export default questions;
