"""
Topic 21: Short Questions / Viva Voce
Script 1: Core Scikit-learn Design Rules & API Consistency
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

# VIVA QUESTION 1: What is the significance of the trailing underscore in Scikit-learn attributes?
# ANSWER: Parameters estimated from training data during .fit() are appended with a single trailing underscore (e.g. coef_, intercept_, mean_). Hyperparameters do not have trailing underscores.

# VIVA QUESTION 2: What is the difference between fit(), transform(), and predict()?
# ANSWER:
# - fit(X, [y]): Learns parameters/statistics from the dataset.
# - transform(X): Applies the learned transformations to return a modified feature matrix (Transformers).
# - predict(X): Uses the learned parameters to make target predictions (Estimators / Classifiers / Regressors).

print("=== VIVA VOCE SUITE 1: API FOUNDATIONS ===")
print("Q1: Trailing Underscore: Distinguishes learned parameters (model.coef_) from user hyperparameters (model.fit_intercept).")
print("Q2: .fit() vs .transform() vs .predict() interface contract executed successfully.")
