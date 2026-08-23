/**
 * Topic 14: Worked Example 1: Student Pass/Fail Prediction
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Focus: Mathematical Optimization Formulation, Loss Functions, Regularization, and Step-by-Step Calculations
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    id: 1,
    question: "In the optimization objective min_w (1/N) ∑ L(h(x_i; w), y_i) + λ Ω(w), what does the term 'min_w' formally mean?",
    shortAnswer: "It instructs the optimization algorithm to find the optimal parameter vector w* that minimizes the total regularized cost function.",
    explanation: "The 'min_w' operator defines the learning problem as continuous mathematical optimization. An optimizer (like Gradient Descent, Adam, or L-BFGS) adjusts the weights w and bias b to locate the global or local minimum of the combined empirical loss and regularization penalty surface.",
    hint: "Think about what Gradient Descent is searching for across the parameter space.",
    level: "Basic",
    codeExample: "# Scipy optimization representation\noptimal_w = scipy.optimize.minimize(cost_function, initial_w).x"
  },
  {
    id: 2,
    question: "Why is the empirical loss term multiplied by (1/N) rather than taking a simple unnormalized sum ∑ L_i?",
    shortAnswer: "To make the loss magnitude scale-invariant and independent of the total number of training samples.",
    explanation: "If loss were unnormalized, adding more training samples would arbitrarily inflate the total loss value and scale the gradient magnitudes, requiring the learning rate alpha to be manually re-tuned for different dataset sizes. Normalizing by (1/N) computes the mean sample loss.",
    hint: "What happens to the sum if dataset size increases from 10 to 1,000,000 samples?",
    level: "Basic",
    codeExample: "mean_loss = np.mean([loss(y_hat_i, y_i) for i in range(N)]) # Scale invariant"
  },
  {
    id: 3,
    question: "In student pass/fail prediction, what does the input vector x_i represent?",
    shortAnswer: "The d-dimensional numerical feature measurements describing the i-th student (e.g., attendance rate, study hours, mock quiz scores).",
    explanation: "The feature vector x_i = [x_i1, x_i2, ..., x_id]^T represents the quantitative attributes collected for student i. In our worked example, x_i contains normalized metrics such as attendance rate (0-1), weekly study hours (0-1), and internal mock test scores (0-1).",
    hint: "The measurable observations fed into the hypothesis function.",
    level: "Basic",
    codeExample: "x_mamata = np.array([0.85, 0.70, 0.80]) # [Attendance, StudyHours/20, QuizScore]"
  },
  {
    id: 4,
    question: "What is the mathematical definition of the hypothesis function h(x_i; w, b) in binary logistic classification?",
    shortAnswer: "The composition of the linear logit and the logistic sigmoid activation: h(x_i; w, b) = σ(w^T x_i + b) = 1 / (1 + exp(-(w^T x_i + b))).",
    explanation: "The hypothesis function maps an arbitrary continuous feature vector x_i into a calibrated probability interval [0, 1]. The linear score z = w^T x + b is passed through the logistic sigmoid function sigma(z), giving the predicted posterior probability P(y_i = 1 | x_i).",
    hint: "Linear combination squashed through a non-linear sigmoid curve.",
    level: "Moderate",
    codeExample: "def hypothesis(x, w, b):\n    z = np.dot(w, x) + b\n    return 1.0 / (1.0 + np.exp(-z))"
  },
  {
    id: 5,
    question: "What does the ground-truth label y_i represent in student pass/fail prediction?",
    shortAnswer: "The actual observed binary outcome for student i, encoded as y_i ∈ {0, 1} where 1 denotes Pass and 0 denotes Fail.",
    explanation: "In supervised binary classification, y_i is the target variable. A value of 1 represents academic success (Pass/Promotion), while 0 represents academic failure or requirement of supplementary remediation.",
    hint: "Supervised learning target encoding.",
    level: "Basic",
    codeExample: "y_train = np.array([1, 1, 1, 0, 1, 0]) # 1: Pass, 0: Fail"
  },
  {
    id: 6,
    question: "What is the standard loss function L(h(x_i; w), y_i) used for binary pass/fail classification and what is its equation?",
    shortAnswer: "Binary Cross-Entropy (Log Loss): L(y_hat_i, y_i) = - [ y_i ln(y_hat_i) + (1 - y_i) ln(1 - y_hat_i) ].",
    explanation: "Binary Cross-Entropy (BCE) measures the divergence between the true distribution y_i and the predicted probability distribution y_hat_i. It heavily penalizes confident incorrect predictions with logarithmic asymptotic penalties.",
    hint: "Derived from the negative log-likelihood of a Bernoulli distribution.",
    level: "Moderate",
    codeExample: "def bce_loss(y_hat, y, eps=1e-15):\n    y_hat = np.clip(y_hat, eps, 1 - eps)\n    return -(y * np.log(y_hat) + (1 - y) * np.log(1 - y_hat))"
  },
  {
    id: 7,
    question: "If student Mamata actually passed (y_i = 1) and the model predicts a pass probability of y_hat_i = 0.95, what is her individual loss L_i?",
    shortAnswer: "L_i = -ln(0.95) ≈ 0.0513.",
    explanation: "When y_i = 1, the (1 - y_i) term vanishes: L = - [ 1 * ln(0.95) + 0 * ln(0.05) ] = -ln(0.95) ≈ 0.0513. Because the prediction is confident and correct, the error penalty is very close to zero.",
    hint: "Apply the BCE formula with y = 1.",
    level: "Moderate",
    codeExample: "loss = -math.log(0.95) # 0.051293"
  },
  {
    id: 8,
    question: "If student Debangshu actually failed (y_i = 0) and the model overconfidently predicts y_hat_i = 0.90, what is the loss L_i?",
    shortAnswer: "L_i = -ln(1 - 0.90) = -ln(0.10) ≈ 2.3026.",
    explanation: "When y_i = 0, the first term vanishes: L = - [ 0 * ln(0.90) + 1 * ln(1 - 0.90) ] = -ln(0.10) ≈ 2.3026. The logarithmic penalty is very severe because the model assigned a 90% confidence to the wrong outcome.",
    hint: "Calculate -ln(1 - y_hat) when actual label is 0.",
    level: "Moderate",
    codeExample: "loss = -math.log(1.0 - 0.90) # 2.302585"
  },
  {
    id: 9,
    question: "What is the role of the regularization term Ω(w) and what does L2 Ridge regularization calculate?",
    shortAnswer: "Ω(w) penalizes complex models with large parameter weights. L2 Ridge calculates the sum of squared weights: Ω(w) = ||w||_2^2 = ∑ w_j^2.",
    explanation: "Regularization acts as a complexity penalty (Structural Risk Minimization). Without regularization, weights can grow arbitrarily large to fit training noise, leading to steep, brittle decision boundaries. L2 regularization shrinks weights toward zero.",
    hint: "Weight decay / Euclidean norm squared.",
    level: "Moderate",
    codeExample: "omega_l2 = np.sum(np.square(w)) # sum(w_j^2)"
  },
  {
    id: 10,
    question: "What is the purpose of the regularization hyperparameter λ (lambda) in the optimization objective?",
    shortAnswer: "λ governs the trade-off between minimizing training empirical loss and minimizing model parameter complexity.",
    explanation: "If λ = 0, the objective ignores model complexity and minimizes pure training loss (risk of overfitting). If λ is excessively large, the objective forces all weights toward zero, producing a trivial constant predictor (underfitting).",
    hint: "The tuning dial between Overfitting (high variance) and Underfitting (high bias).",
    level: "Basic",
    codeExample: "total_cost = data_loss + (reg_lambda * weight_decay)"
  },
  {
    id: 11,
    question: "Why is the bias term b usually excluded from the regularization penalty Ω(w)?",
    shortAnswer: "Regularizing the bias shifts the baseline threshold toward zero without reducing model variance or curvature, causing unnecessary underfitting.",
    explanation: "The weight vector w controls the orientation and steepness (curvature) of the decision hyperplane. The bias b merely shifts the decision boundary spatially to align with class prior proportions. Penalizing b would bias the model toward predicting equal class probabilities even when classes are imbalanced.",
    hint: "Weights define sensitivity to features; bias only defines the baseline offset.",
    level: "Expert",
    codeExample: "# Regularize weights only, never bias b:\nreg_loss = 0.5 * lambda_val * np.sum(w ** 2)"
  },
  {
    id: 12,
    question: "In a student pass/fail model, given w = [2.5, 3.0, 1.8] and b = -3.2, compute the logit z for a student with x = [0.80, 0.50, 0.70].",
    shortAnswer: "z = (2.5 * 0.80) + (3.0 * 0.50) + (1.8 * 0.70) - 3.20 = 2.00 + 1.50 + 1.26 - 3.20 = 1.56.",
    explanation: "The linear logit is the dot product w^T x + b: z = 2.50(0.80) + 3.00(0.50) + 1.80(0.70) - 3.20 = 4.76 - 3.20 = 1.56.",
    hint: "Perform the linear dot product and add the negative bias.",
    level: "Basic",
    codeExample: "z = (2.5 * 0.8) + (3.0 * 0.5) + (1.8 * 0.7) - 3.2 # 1.56"
  },
  {
    id: 13,
    question: "Using the logit z = 1.56 from the previous question, calculate the predicted pass probability y_hat = σ(z).",
    shortAnswer: "y_hat = 1 / (1 + exp(-1.56)) = 1 / (1 + 0.2101) ≈ 0.8263 (82.63%).",
    explanation: "Applying the sigmoid activation: e^(-1.56) ≈ 0.210136. Therefore, sigma(1.56) = 1 / (1 + 0.210136) = 1 / 1.210136 ≈ 0.82635. The student has an 82.64% estimated probability of passing.",
    hint: "Apply σ(z) = 1 / (1 + e^(-z)).",
    level: "Basic",
    codeExample: "prob = 1.0 / (1.0 + math.exp(-1.56)) # 0.82635"
  },
  {
    id: 14,
    question: "What is the partial derivative (gradient) of the BCE loss with respect to the weight w_j for a single training sample i?",
    shortAnswer: "∂L_i / ∂w_j = (y_hat_i - y_i) * x_ij.",
    explanation: "By applying the chain rule: ∂L/∂w_j = (∂L/∂y_hat) * (∂y_hat/∂z) * (∂z/∂w_j). Since (∂L/∂y_hat) = (y_hat - y) / (y_hat*(1-y_hat)) and (∂y_hat/∂z) = y_hat*(1-y_hat), the terms cancel out beautifully to leave (y_hat - y) * x_j.",
    hint: "Residual error multiplied by the j-th input feature value.",
    level: "Expert",
    codeExample: "# Elegant logistic gradient:\ngrad_w_sample = (y_hat - y) * x"
  },
  {
    id: 15,
    question: "What is the full gradient vector formula ∇_w J(w, b) for the regularized objective with L2 penalty?",
    shortAnswer: "∇_w J = (1/N) ∑_{i=1}^N (y_hat_i - y_i) x_i + 2 λ w.",
    explanation: "The gradient combines the average data error across all N training samples with the derivative of the regularization term: d/dw [lambda * ||w||_2^2] = 2 * lambda * w. This gradient guides the parameter update step in Gradient Descent.",
    hint: "Mean empirical gradient plus 2 * lambda * w.",
    level: "Expert",
    codeExample: "grad_w = (1.0 / N) * np.dot(X.T, (y_hat - y)) + (2.0 * reg_lambda * w)"
  },
  {
    id: 16,
    question: "How does the L2 regularization gradient term (2 λ w) lead to the concept of 'Weight Decay' in Gradient Descent?",
    shortAnswer: "In the update rule, w := (1 - 2 α λ) w - α ∇_empirical, which multiplies w by a factor < 1 on every step.",
    explanation: "Rewriting the gradient step: w_new = w - alpha * (grad_emp + 2*lambda*w) = (1 - 2*alpha*lambda)*w - alpha*grad_emp. The coefficient (1 - 2*alpha*lambda) shrinks the magnitude of w exponentially on every iteration, which is why L2 regularization is synonymous with weight decay.",
    hint: "Look at the coefficient multiplying w before subtracting the empirical gradient.",
    level: "Expert",
    codeExample: "# Explicit weight decay form:\nw = (1.0 - 2.0 * alpha * reg_lambda) * w - alpha * grad_emp"
  },
  {
    id: 17,
    question: "What is the difference in weight sparsity between L1 Lasso regularization Ω(w) = ∑|w_j| and L2 Ridge regularization Ω(w) = ∑ w_j^2?",
    shortAnswer: "L1 regularization drives irrelevant feature weights exactly to 0.0 (feature selection), while L2 shrinks weights close to 0 but rarely exact zero.",
    explanation: "Because the L1 norm has a sharp diamond constraint geometry with non-differentiable corners at 0, gradient updates frequently intersect axes, setting uninformative feature weights (like student favorite food) exactly to 0.",
    hint: "Diamond geometry (L1) vs circular spherical geometry (L2).",
    level: "Moderate",
    codeExample: "# L1 produces sparse weights:\nw_l1 = [2.4, 0.0, 1.8] # Feature 2 selected out"
  },
  {
    id: 18,
    question: "Why is feature scaling/normalization critical before evaluating the regularization term λ ∑ w_j^2?",
    shortAnswer: "Features with large numerical scales (e.g., income ₹500,000 vs attendance 0.85) will distort weight magnitudes, causing the regularizer to unfairly penalize features unevenly.",
    explanation: "If feature x_1 is measured in hours (0 to 100) and x_2 in fractions (0 to 1), weight w_2 must be 100x larger than w_1 to have the same effect. Squaring w_2 in the L2 penalty would penalize w_2 10,000x more heavily than w_1. Normalization puts all features on equal footing.",
    hint: "Unequal scale creates uneven regularization penalties.",
    level: "Moderate",
    codeExample: "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X_raw)"
  },
  {
    id: 19,
    question: "In our student pass/fail dataset, if attendance rate w_1 = 3.5 and weekly study hours w_2 = 1.2, what does the higher weight indicate?",
    shortAnswer: "A unit increase in normalized attendance rate exerts a larger positive influence on passing probability than a unit increase in study hours.",
    explanation: "In logistic regression, the weight w_j represents the change in log-odds per unit increase in normalized feature x_j. A weight of 3.5 indicates that consistent class attendance is the most decisive predictor in this model.",
    hint: "Higher positive magnitude means stronger feature importance.",
    level: "Basic",
    codeExample: "odds_ratio = np.exp(w_1) # Multiplicative increase in pass odds"
  },
  {
    id: 20,
    question: "What decision threshold is typically used on the hypothesis output h(x_i; w) to convert predicted probability into a discrete Pass (1) or Fail (0) verdict?",
    shortAnswer: "A threshold of 0.50 (where logit z = 0.0).",
    explanation: "The default Bayes decision rule classifies an instance as Pass (1) if P(Pass|x) >= 0.50, and Fail (0) otherwise. This corresponds to the hyperplane where w^T x + b >= 0.",
    hint: "When is a probability more likely than a coin flip?",
    level: "Basic",
    codeExample: "y_pred = 1 if y_hat >= 0.50 else 0"
  },
  {
    id: 21,
    question: "When should an academic institution in Barrackpore change the classification threshold from 0.50 to 0.70?",
    shortAnswer: "When the cost of False Positives (falsely assuming a struggling student is safe) is high, so remediation is prioritized for anyone with even a 30% failure risk.",
    explanation: "Adjusting the classification threshold controls the Precision-Recall trade-off. To catch all at-risk students for remedial tutoring, the institute may require a student to score >= 0.70 probability of passing to be considered safe.",
    hint: "Threshold tuning based on asymmetric real-world intervention costs.",
    level: "Moderate",
    codeExample: "remedial_flag = 1 if y_hat < 0.70 else 0 # Proactive support"
  },
  {
    id: 22,
    question: "What is Empirical Risk Minimization (ERM) vs Structural Risk Minimization (SRM)?",
    shortAnswer: "ERM minimizes training error alone ((1/N) ∑ L_i); SRM minimizes training error plus a complexity penalty ((1/N) ∑ L_i + λ Ω(w)).",
    explanation: "ERM focuses strictly on fitting historical data. SRM (introduced by Vapnik in statistical learning theory) bounds the true generalization risk on unseen data by constraining model hypothesis space capacity.",
    hint: "Vapnik's principle for guaranteed generalization bounds.",
    level: "Expert",
    codeExample: "# ERM: loss(X, y)\n# SRM: loss(X, y) + lambda * complexity(model)"
  },
  {
    id: 23,
    question: "If training loss is 0.02 (extremely low) but validation loss is 1.45 (very high), what has occurred in terms of the optimization objective?",
    shortAnswer: "Overfitting: λ was set too small or 0, allowing weights to memorize noise and individual training anomalies.",
    explanation: "This is the classic hallmark of high variance (overfitting). The model fitted the training dataset with near-zero error, but the decision boundary is jagged and extreme, failing to generalize to unseen validation cohorts.",
    hint: "Low bias, high variance due to under-regularization.",
    level: "Moderate",
    codeExample: "# Remedy: Increase lambda to constrain weight magnitudes\noptimizer.reg_lambda = 0.05"
  },
  {
    id: 24,
    question: "What happens to the model's decision boundary when the bias term b is made very large and positive (e.g., b = +10.0)?",
    shortAnswer: "The logit z becomes strongly positive for nearly all inputs, causing σ(z) ≈ 1.0 and predicting Pass for virtually all students.",
    explanation: "A high positive bias increases the base prior probability of the positive class. Unless features are overwhelmingly negative, the sigmoid will output values very close to 1.0.",
    hint: "The bias acts as an unconditioned baseline offset.",
    level: "Basic",
    codeExample: "prob = 1.0 / (1.0 + math.exp(-(w_dot_x + 10.0))) # Always near 1"
  },
  {
    id: 25,
    question: "In batch gradient descent over N=1000 students, how many training samples contribute to each parameter update step?",
    shortAnswer: "All N = 1000 samples contribute to computing the average gradient (1/N) ∑ (y_hat_i - y_i) x_i.",
    explanation: "In Full Batch Gradient Descent, the optimizer processes the entire cohort of 1000 students to calculate the true empirical gradient before taking a single parameter step. In contrast, Stochastic Gradient Descent (SGD) updates parameters on N=1 sample.",
    hint: "Batch vs Mini-batch vs Stochastic.",
    level: "Moderate",
    codeExample: "# Full Batch: grad computed over all N rows before w update"
  },
  {
    id: 26,
    question: "Why does the BCE loss function guarantee a convex loss surface for logistic regression without local minima?",
    shortAnswer: "Because the negative log-likelihood of a linear model passed through a logistic sigmoid has a positive semi-definite Hessian matrix everywhere.",
    explanation: "Unlike Mean Squared Error (MSE) which creates non-convex wavy surfaces with multiple local traps when combined with sigmoid activations, Binary Cross-Entropy is strictly convex with a unique global minimum.",
    hint: "Convexity ensures Gradient Descent is guaranteed to reach the global optimal weights w*.",
    level: "Expert",
    codeExample: "# Convex optimization guarantee: Any local minimum is the global minimum"
  },
  {
    id: 27,
    question: "What is the effect on the objective function J(w, b) when an extreme outlier student is present in the dataset?",
    shortAnswer: "Because BCE loss grows asymptotically toward infinity as y_hat diverges from y, the outlier exerts an outsized gradient pull on the weights.",
    explanation: "If a student with 99% attendance and 20 hours/week of study fails the exam due to an unforeseen emergency (outlier), predicting y_hat = 0.98 gives loss -ln(0.02) = 3.91, heavily influencing weight updates unless regularized.",
    hint: "Logarithmic penalty for high-confidence mistakes.",
    level: "Expert",
    codeExample: "outlier_loss = -np.log(1.0 - 0.98) # 3.912 (Massive gradient pull)"
  },
  {
    id: 28,
    question: "How is the optimal value of λ (lambda) determined in professional machine learning engineering?",
    shortAnswer: "Via hyperparameter cross-validation (e.g., K-Fold CV or grid search across logarithmic candidates [10^-4, 10^-3, ..., 10^1]).",
    explanation: "The engineer tests candidate values of lambda across held-out validation folds. The lambda that produces the lowest average validation loss (or highest validation F1-score) is selected as the production hyperparameter.",
    hint: "GridSearchCV or Bayesian optimization over validation splits.",
    level: "Moderate",
    codeExample: "from sklearn.linear_model import LogisticRegressionCV\nclf = LogisticRegressionCV(Cs=10, cv=5).fit(X, y)"
  },
  {
    id: 29,
    question: "For a student dataset with 3 features: w = [1.0, 2.0, 3.0] and λ = 0.05, what is the exact L2 regularization penalty value added to the objective?",
    shortAnswer: "Penalty = 0.05 * (1.0^2 + 2.0^2 + 3.0^2) = 0.05 * (1 + 4 + 9) = 0.05 * 14 = 0.70.",
    explanation: "Sum of squared weights: 1 + 4 + 9 = 14. Multiplying by lambda = 0.05 gives 0.70. This quantity is added directly to the mean BCE data loss.",
    hint: "Compute λ * (w1^2 + w2^2 + w3^2).",
    level: "Basic",
    codeExample: "penalty = 0.05 * (1.0**2 + 2.0**2 + 3.0**2) # 0.70"
  },
  {
    id: 30,
    question: "What is the ultimate takeaway of the optimization formula min_w (1/N) ∑ L_i + λ Ω(w) for student outcome prediction?",
    shortAnswer: "Machine Learning models do not perform magic; they systematically balance empirical data fidelity against structural mathematical simplicity.",
    explanation: "The entire discipline of supervised learning boils down to this fundamental trade-off: fitting observed reality (the empirical loss) while penalizing unnecessary complexity (the regularizer) to achieve high predictive accuracy on future unseen students.",
    hint: "The grand synthesis between empirical fit and generalization theory.",
    level: "Expert",
    codeExample: "# The Fundamental Equation of Supervised Learning:\n# Objective = Data_Fidelity_Loss + Complexity_Penalty"
  }
];

export default questions;
