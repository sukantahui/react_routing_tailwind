/**
 * Topic 16: Worked Example 3: Customer Churn Prediction
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "In the Customer Churn Prediction worked example, what is the mathematical formulation of the Logistic Regression model?",
    "shortAnswer": "P(Churn = 1 | x) = \u03c3(w^T x + b) = 1 / ( 1 + exp(-(w_1\u00b7Tenure + w_2\u00b7MonthlyCharge + w_3\u00b7SupportCalls + w_4\u00b7Contract + b)) ).",
    "explanation": "Logistic regression computes the linear logit z = w^T x + b from customer attributes (Tenure, Monthly Charge, Complaints, Contract Type) and passes it through the sigmoid function \u03c3(z) to calculate posterior churn probability in [0, 1].",
    "hint": "Sigmoid squashing function mapping linear logit into [0, 1] probability.",
    "level": "Basic",
    "codeExample": "z = w_tenure*tenure + w_monthly*monthly + w_calls*calls + w_contract*contract + b\nprob_churn = 1.0 / (1.0 + np.exp(-z))"
  },
  {
    "id": 2,
    "question": "Why does the feature 'Tenure (Months)' have a negative weight (w_tenure < 0) in churn prediction?",
    "shortAnswer": "Because customers who have been with the company longer have higher loyalty and lower probability of canceling their service.",
    "explanation": "A negative coefficient means as tenure increases, the logit z decreases, causing the sigmoid output P(churn) to drop. Long-term subscribers (e.g. 48 months) exhibit strong brand inertia compared to new users (e.g. 2 months).",
    "hint": "Longer customer relationship corresponds to lower churn risk.",
    "level": "Basic",
    "codeExample": "# Tenure = 48 months reduces the churn logit z significantly"
  },
  {
    "id": 3,
    "question": "Why does 'Customer Support Calls' have a large positive weight (w_calls > 0) in churn modeling?",
    "shortAnswer": "Frequent support calls indicate customer dissatisfaction, service outages, or unresolved billing disputes, strongly driving churn.",
    "explanation": "A customer calling support 5 times in a month is experiencing chronic friction. Each additional support call adds positive weight to the logit z, sharply increasing predicted churn probability.",
    "hint": "High complaint frequency signals acute dissatisfaction and imminent churn risk.",
    "level": "Basic",
    "codeExample": "# Calls = 5 adds +w_calls * 5 to the logit, pushing P(churn) above threshold"
  },
  {
    "id": 4,
    "question": "What is the Binary Cross-Entropy (Log Loss) cost function optimized during churn model training?",
    "shortAnswer": "J(w, b) = - (1/N) \u2211_{i=1}^N [ y_i ln(p_i) + (1 - y_i) ln(1 - p_i) ].",
    "explanation": "Binary Cross-Entropy penalizes confident incorrect predictions with logarithmic asymptotic penalties. If actual y=1 and model predicts p=0.01, loss is -ln(0.01) = 4.60; if model predicts p=0.99, loss is -ln(0.99) = 0.01.",
    "hint": "Negative log-likelihood of Bernoulli trial outcomes across all N customers.",
    "level": "Basic",
    "codeExample": "def log_loss(y_true, p_pred):\n    eps = 1e-15\n    p = np.clip(p_pred, eps, 1 - eps)\n    return -np.mean(y_true * np.log(p) + (1 - y_true) * np.log(1 - p))"
  },
  {
    "id": 5,
    "question": "What is the Gradient Descent update formula for weight vector w in Logistic Regression?",
    "shortAnswer": "w := w - \u03b1 * (1/N) X^T (p - y) (identical algebraic form to linear regression, but where p = \u03c3(X w + b)).",
    "explanation": "Remarkably, the derivative of Binary Cross-Entropy with respect to w has the exact same elegant vector form X^T (p - y) as Linear Regression MSE, where (p - y) is the probability residual vector.",
    "hint": "Transposed feature matrix multiplied by probability prediction residuals.",
    "level": "Moderate",
    "codeExample": "grad_w = (1.0 / N) * X.T @ (p_pred - y_true)\nw -= learning_rate * grad_w"
  },
  {
    "id": 6,
    "question": "In telecom churn modeling, why is the default Decision Threshold of 0.50 often lowered to 0.35 or 0.40?",
    "shortAnswer": "Because the business cost of losing a customer (False Negative) is much higher than the small cost of sending a retention discount (False Positive).",
    "explanation": "Losing a customer costs \u20b95,000 in lost lifetime value. Sending a 10% discount email costs \u20b9200. Lowering the threshold to 0.35 flags more borderline at-risk customers, dramatically improving Recall and saving company revenue.",
    "hint": "Lowering threshold captures more potential churners at the cost of slight over-discounting.",
    "level": "Moderate",
    "codeExample": "# Threshold tuning for customer retention\ny_churn_flag = (prob_churn >= 0.35).astype(int)"
  },
  {
    "id": 7,
    "question": "What does a False Negative (FN) represent in Customer Churn Prediction?",
    "shortAnswer": "A customer who actually churns and cancels service, but was falsely predicted by the model to remain loyal.",
    "explanation": "False Negatives are the most damaging errors in churn prevention. Because the model predicted they would stay, marketing took no retention action, and the customer silently defected to a competitor.",
    "hint": "Missed churn detection leading to unmitigated customer loss.",
    "level": "Basic",
    "codeExample": "# False Negative: y_true = 1 (Churned), y_pred = 0 (Predicted Loyal)"
  },
  {
    "id": 8,
    "question": "What does a False Positive (FP) represent in Customer Churn Prediction?",
    "shortAnswer": "A loyal customer who had no intention of leaving, but was falsely flagged as a churn risk.",
    "explanation": "False Positives result in wasted marketing spend (e.g. giving an unnecessary 20% retention discount to a loyal user), but the customer remains with the business.",
    "hint": "False alarm resulting in unnecessary retention incentives.",
    "level": "Basic",
    "codeExample": "# False Positive: y_true = 0 (Loyal), y_pred = 1 (Predicted Churn)"
  },
  {
    "id": 9,
    "question": "Why is Accuracy an inadequate metric if only 8% of subscribers churn each month?",
    "shortAnswer": "A naive dummy model predicting 'No Churn' for 100% of users achieves 92% accuracy while catching zero churners.",
    "explanation": "When class imbalance is 92:8, Accuracy is deceptive. The business needs high Recall on the 8% minority churn class and strong F1-Score / PR-AUC, not empty 92% accuracy.",
    "hint": "Majority-class bias masks complete failure to detect rare churn events.",
    "level": "Basic",
    "codeExample": "from sklearn.metrics import classification_report\nprint(classification_report(y_test, y_pred, target_names=['Stay', 'Churn']))"
  },
  {
    "id": 10,
    "question": "What is the ROC-AUC score and what does an AUC of 0.88 signify in churn modeling?",
    "shortAnswer": "There is an 88% probability that the model will assign a higher churn risk score to a randomly chosen actual churner than to a randomly chosen loyal customer.",
    "explanation": "ROC-AUC measures the model's pairwise ranking capability across all possible decision thresholds. 0.50 is random coin flipping; 1.0 is perfect separation. 0.88 indicates strong discriminative power.",
    "hint": "Probability of correctly ranking a random churner higher than a random loyal user.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import roc_auc_score\nauc = roc_auc_score(y_test, y_churn_probs)"
  },
  {
    "id": 11,
    "question": "How does SMOTE (Synthetic Minority Over-sampling Technique) balance churn datasets during training?",
    "shortAnswer": "By synthesizing artificial minority churn points along line segments connecting k-nearest churn neighbors in feature space.",
    "explanation": "Instead of simple duplication (which causes overfitting), SMOTE takes sample x_i in minority class, finds its k nearest minority neighbors, and creates synthetic samples x_new = x_i + \u03bb (x_zi - x_i) where \u03bb \u2208 [0, 1].",
    "hint": "Linear interpolation between nearest minority class neighbors.",
    "level": "Moderate",
    "codeExample": "# from imblearn.over_sampling import SMOTE\n# X_res, y_res = SMOTE(random_state=42).fit_resample(X_train, y_train)"
  },
  {
    "id": 12,
    "question": "What is Class Weighting (`class_weight='balanced'`) in Logistic Regression churn training?",
    "shortAnswer": "Multiplying the loss contribution of minority churn samples by N / (2 * N_churn), penalizing churn misclassifications more heavily.",
    "explanation": "Class weighting alters the objective function so that errors on rare churn instances produce proportionately larger gradients. This forces the optimization solver to adjust decision boundary hyperplanes to accommodate minority instances without synthetic resampling.",
    "hint": "Inverse class frequency weighting in the cross-entropy loss function.",
    "level": "Moderate",
    "codeExample": "clf = LogisticRegression(class_weight='balanced').fit(X_train, y_train)"
  },
  {
    "id": 13,
    "question": "How is the Contract Type feature ('Month-to-Month', 'One-Year', 'Two-Year') encoded for logistic regression?",
    "shortAnswer": "Using One-Hot Encoding (or Ordinal: 0, 1, 2); Two-Year contracts receive strong negative churn weights.",
    "explanation": "Customers on Two-Year contracts face contractual exit penalties and exhibit high switching friction. In logistic regression, the dummy variable `Contract_TwoYear` receives a large negative weight, reducing predicted churn risk.",
    "hint": "Contract duration acts as a powerful structural barrier to churn.",
    "level": "Basic",
    "codeExample": "X = pd.get_dummies(X, columns=['contract_type'], drop_first=True)"
  },
  {
    "id": 14,
    "question": "What is Top-Decile Lift in churn marketing campaigns?",
    "shortAnswer": "The ratio of churn rate in the top 10% highest-risk scored customers compared to the overall population churn rate.",
    "explanation": "If overall company churn is 8%, but the top 10% highest-scoring customers identified by the ML model have a 40% churn rate, the model provides a Top-Decile Lift of 40% / 8% = 5.0x. This allows marketing to focus budgets on the highest-yield targets.",
    "hint": "Efficiency multiplier of targeting top-decile model predictions vs random outreach.",
    "level": "Moderate",
    "codeExample": "# Lift = (Churn Rate in Top 10%) / (Base Churn Rate in All Customers)"
  },
  {
    "id": 15,
    "question": "How does Random Forest evaluate feature importance in customer churn prediction?",
    "shortAnswer": "By measuring Mean Decrease in Impurity (Gini Impurity) or Permutation Importance across all decision trees.",
    "explanation": "Random Forest builds hundreds of de-correlated trees. Features that frequently split nodes near the top of trees (such as `tenure_months` and `support_calls`) produce the largest total drops in Gini impurity, ranking as top churn drivers.",
    "hint": "Total Gini impurity drop across the forest ensemble.",
    "level": "Moderate",
    "codeExample": "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=100).fit(X_train, y_train)\nimportances = rf.feature_importances_"
  },
  {
    "id": 16,
    "question": "What is the Odds Ratio in Logistic Regression and how is it calculated from weight w_j?",
    "shortAnswer": "Odds Ratio = exp(w_j); represents the multiplicative change in churn odds for a 1-unit increase in feature x_j.",
    "explanation": "Odds = P(churn) / (1 - P(churn)). If w_calls = 0.693, Odds Ratio = exp(0.693) = 2.0. This means each additional customer support call doubles the customer's odds of churning, holding other features constant.",
    "hint": "Exponentiating logistic regression weight coefficient exp(w_j).",
    "level": "Moderate",
    "codeExample": "odds_ratios = np.exp(logistic_model.coef_[0])\nprint(dict(zip(feature_names, odds_ratios)))"
  },
  {
    "id": 17,
    "question": "What is Survival Analysis (Cox Proportional Hazards Model) and how does it extend standard binary churn classification?",
    "shortAnswer": "It models the timing of churn over continuous time, predicting the probability that a customer survives past month t: S(t) = P(T > t).",
    "explanation": "Binary classification only answers 'Will they churn within 30 days?'. Survival Analysis handles right-censored data (active customers who haven't churned yet) and estimates customer lifetime curves, calculating Customer Lifetime Value (CLV) integrals.",
    "hint": "Time-to-event modeling handling right-censored customer durations.",
    "level": "Expert",
    "codeExample": "# Cox Model: Hazard h(t|x) = h_0(t) * exp(w^T x)"
  },
  {
    "id": 18,
    "question": "What is Expected Monetary Value (EMV) optimization in churn intervention strategies?",
    "shortAnswer": "EMV = P(Churn|x) * P(Accept_Offer) * Customer_LTV - Cost_of_Incentive; outreach is triggered only if EMV > 0.",
    "explanation": "Not all at-risk customers are worth saving. If an at-risk user generates \u20b9100/mo and the retention incentive costs \u20b9500, intervention produces negative ROI. EMV unites ML churn probabilities with financial unit economics.",
    "hint": "Intervention decision rule maximizing net expected financial return.",
    "level": "Moderate",
    "codeExample": "emv = prob_churn * 0.50 * customer_ltv - incentive_cost\nshould_target = emv > 0"
  },
  {
    "id": 19,
    "question": "What is the 'Sleeping Dogs' (Do-Not-Disturb) segment in Uplift Modeling for churn?",
    "shortAnswer": "Customers who would stay if left alone, but will actively churn if contacted with a retention message (e.g. reminded of a forgotten recurring charge).",
    "explanation": "Uplift Modeling divides customers into 4 quadrants: Persuadables (stay only if contacted), Sure Things (stay anyway), Lost Causes (churn anyway), and Sleeping Dogs (churn if contacted). Standard churn models often accidentally target sleeping dogs; Uplift models explicitly avoid them.",
    "hint": "Customers triggered to cancel service when contacted with marketing reminders.",
    "level": "Expert",
    "codeExample": "# Uplift Model: Target ONLY Persuadables: Uplift = P(Stay|Contacted) - P(Stay|Not_Contacted) > 0"
  },
  {
    "id": 20,
    "question": "What is L2 Regularization parameter C in scikit-learn's `LogisticRegression`?",
    "shortAnswer": "C is inverse regularization strength (C = 1/\u03bb); smaller C values enforce stronger regularization, shrinking weights toward zero.",
    "explanation": "In scikit-learn: min_w C * Loss + (1/2) w^T w. High C (e.g. 100) prioritizes fitting training data tightly (risk of overfitting); small C (e.g. 0.01) prioritizes small weight magnitudes (simpler, smoother model).",
    "hint": "Inverse regularization strength: smaller C = stronger regularization penalty.",
    "level": "Moderate",
    "codeExample": "clf_regularized = LogisticRegression(C=0.1, penalty='l2')"
  },
  {
    "id": 21,
    "question": "What is the Brier Score in churn probability evaluation?",
    "shortAnswer": "The mean squared difference between predicted churn probability and actual binary churn flag: (1/N) \u2211 (p_i - y_i)^2.",
    "explanation": "If a model predicts 0.90 churn probability and the user stays (y=0), squared error is (0.9-0)^2 = 0.81. Lower Brier scores indicate well-calibrated, reliable probability estimates.",
    "hint": "Mean squared calibration error on output probabilities.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import brier_score_loss\nbrier = brier_score_loss(y_test, y_churn_probs)"
  },
  {
    "id": 22,
    "question": "How does Feature Interaction between 'Monthly Charge' and 'Support Calls' influence churn risk?",
    "shortAnswer": "Customers with both high monthly bills and frequent complaints experience compounding dissatisfaction with disproportionately higher churn.",
    "explanation": "A user paying \u20b9199 with 3 complaints may tolerate issues. A user paying \u20b92,500 premium fees with 3 complaints expects perfection and will churn immediately. Creating `df['charge_x_calls'] = df['monthly'] * df['calls']` captures this synergy.",
    "hint": "Synergistic compounding of high financial billing and frequent technical friction.",
    "level": "Basic",
    "codeExample": "X['bill_stress_index'] = X['monthly_charges'] * X['support_calls']"
  },
  {
    "id": 23,
    "question": "What is Cumulative Gains Chart in churn campaign planning?",
    "shortAnswer": "A visual curve showing the cumulative percentage of total churners captured as a function of the percentage of total customer base contacted.",
    "explanation": "If contacting the top 20% highest-scoring customers captures 75% of all potential company churners, the cumulative gains chart visualizes this steep 75% point, guiding the optimal campaign outreach cutoff.",
    "hint": "Visualizes percentage of all churners reached as outreach budget expands.",
    "level": "Moderate",
    "codeExample": "# Gains chart: x-axis = % customers contacted; y-axis = % churners captured"
  },
  {
    "id": 24,
    "question": "What is the Precision-Recall AUC (PR-AUC / Average Precision) and why is it preferred over ROC-AUC for churn with 5% baseline rate?",
    "shortAnswer": "PR-AUC focuses exclusively on minority churn positive performance without being artificially boosted by huge numbers of True Negatives.",
    "explanation": "In a 95:5 imbalanced dataset, a model can have millions of True Negatives that compress False Positive Rate FPR = FP/(FP+TN) to near zero, giving an artificially inflated ROC-AUC of 0.92. PR-AUC directly tracks precision and recall, exposing false alarms clearly.",
    "hint": "Excludes the overwhelming True Negative class to benchmark rare-event detection cleanly.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics import average_precision_score\npr_auc = average_precision_score(y_test, y_churn_probs)"
  },
  {
    "id": 25,
    "question": "How can missing values in customer churn tables (e.g. `TotalCharges` is null for new customers with tenure=0) be handled cleanly?",
    "shortAnswer": "By imputing `TotalCharges = 0.0` for tenure=0 or using Median Imputation wrapped in a pipeline transformer.",
    "explanation": "New subscribers in month 0 have not received a bill yet. Dropping them would discard valuable newly acquired users. Replacing nulls with 0.0 aligns with financial reality.",
    "hint": "Domain-specific zero imputation for newly onboarded subscribers.",
    "level": "Basic",
    "codeExample": "df['TotalCharges'] = df['TotalCharges'].fillna(0.0)"
  },
  {
    "id": 26,
    "question": "How does SHAP Waterfall Plot explain an individual customer's churn risk score (e.g. Debangshu, P(Churn) = 84%)?",
    "shortAnswer": "Shows base average churn probability (20%) + additions from specific features: +35% (5 Support Calls), +22% (Month-to-Month Contract), +12% (High Bill), -5% (Tenure=5m) = 84%.",
    "explanation": "SHAP waterfall charts visualize the additive step-by-step push of each feature value for that specific customer, allowing retention agents to address the exact root cause during phone conversations.",
    "hint": "Waterfall attribution diagram illustrating positive and negative feature pushes.",
    "level": "Moderate",
    "codeExample": "shap.plots.waterfall(shap_values[customer_index])"
  },
  {
    "id": 27,
    "question": "What is Concept Drift in telecom churn when a new low-cost competitor enters the market?",
    "shortAnswer": "Historical churn probabilities P(Churn | Price) change abruptly because customers now have an attractive external competitor option.",
    "explanation": "When a competitor launches disruptive pricing (e.g. Jio launching 4G in India), loyal customers with 3-year tenure suddenly start churning. The historical training mapping P(Churn | Tenure, Price) breaks, requiring rapid retraining on post-launch data.",
    "hint": "Market competitor entry alters conditional churn distribution P(Y|X).",
    "level": "Moderate",
    "codeExample": "# Retraining trigger: Sharp drop in rolling validation F1 on latest 14-day data"
  },
  {
    "id": 28,
    "question": "What is Stratified K-Fold Cross-Validation for churn models?",
    "shortAnswer": "Splitting customer data into K folds such that every fold maintains the exact same churn percentage (e.g. 8% churn in every fold).",
    "explanation": "Standard random splitting might create folds with 3% churn and other folds with 14% churn, causing unstable validation metrics. Stratification enforces exact class proportion parity across all K folds.",
    "hint": "Preserving exact 8% churn target proportions across all cross-validation folds.",
    "level": "Basic",
    "codeExample": "from sklearn.model_selection import StratifiedKFold\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)"
  },
  {
    "id": 29,
    "question": "What is an Automated Retention Trigger Pipeline in production CRM architecture?",
    "shortAnswer": "A daily cron batch job that scores all active subscribers, filters those with P(Churn) \u2265 threshold, and automatically triggers personalized email/SMS offers via CRM API.",
    "explanation": "Every night at 02:00 UTC, the serialized model scores the active database. Customers flagged with high churn risk and positive EMV are pushed to Salesforce/Braze API to receive automated discount vouchers by 09:00 AM.",
    "hint": "Nightly batch scoring driving automated marketing discount webhooks.",
    "level": "Basic",
    "codeExample": "# CRM Webhook: if score >= 0.40: send_retention_sms(user_id, coupon_code='SAVE20')"
  },
  {
    "id": 30,
    "question": "What is the primary educational takeaway from the Customer Churn Worked Example?",
    "shortAnswer": "Classification goes beyond raw accuracy: it requires optimizing loss (Cross-Entropy), tuning decision thresholds to business costs, handling class imbalance, and explaining predictions with XAI.",
    "explanation": "This worked example demonstrates how data science delivers direct commercial value by translating probability estimates into cost-benefit retention decisions, bridging mathematical machine learning with business ROI.",
    "hint": "Mastering binary classification, cost-sensitive thresholding, and business value alignment.",
    "level": "Basic",
    "codeExample": "# Full Pipeline: Data -> Stratified Split -> Logistic Regression -> Threshold Optimization -> Business ROI"
  }
];

export default questions;
