"""
Topic 21: Short Questions / Viva Voce
Script 2: Model Architecture & Evaluation Viva Questions
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

# VIVA QUESTION 3: Why is KNN called a Lazy Learner?
# ANSWER: KNN performs zero parameter learning during fit(); it merely stores the dataset in memory and calculates distances on-the-fly during predict().

# VIVA QUESTION 4: Can R-squared (R2) be negative?
# ANSWER: Yes! When a model performs worse than a constant horizontal line predicting the mean of the dataset, SS_res > SS_tot, making R2 negative.

# VIVA QUESTION 5: Why is StandardScaler mandatory before K-Means clustering?
# ANSWER: K-Means relies on Euclidean distance. Features with large scales (like Salary in thousands) will completely overpower features with smaller ranges (like Age).

print("=== VIVA VOCE SUITE 2: ALGORITHM MECHANICS ===")
print("Q3: KNN Lazy Learner: Stored instances evaluated at inference time.")
print("Q4: Negative R2: Occurs when model prediction error exceeds dataset variance from the mean.")
print("Q5: KMeans Scaling: Essential to prevent large-magnitude features from dominating Euclidean distance.")
