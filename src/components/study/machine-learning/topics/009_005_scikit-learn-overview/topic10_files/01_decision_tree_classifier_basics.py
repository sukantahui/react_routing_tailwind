"""
Topic 10: Tree Models
Script 1: DecisionTreeClassifier Basics (Gini vs Entropy)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Dataset: [Attendance %, Project Done (0/1), Prior Quiz Score] -> Target: Pass Exam (0/1)
X = np.array([
    [45, 0, 30],
    [55, 0, 40],
    [65, 1, 50],
    [75, 1, 65],
    [85, 1, 80],
    [90, 0, 75],
    [95, 1, 90]
])
y = np.array([0, 0, 1, 1, 1, 0, 1])

# Initialize DecisionTreeClassifier with Gini Impurity criterion
dt_gini = DecisionTreeClassifier(criterion='gini', max_depth=3, random_state=42)
dt_gini.fit(X, y)

# Initialize DecisionTreeClassifier with Entropy (Information Gain)
dt_entropy = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=42)
dt_entropy.fit(X, y)

print("--- DecisionTreeClassifier (Gini) ---")
print("Tree Depth:", dt_gini.get_depth())
print("Number of Leaves:", dt_gini.get_n_leaves())
print("Learned Feature Importances:", dt_gini.feature_importances_)
print(f"Training Accuracy: {accuracy_score(y, dt_gini.predict(X))*100:.1f}%")

# Prediction for new student: [Attendance: 70%, Project: 1, Quiz: 60]
student_new = np.array([[70, 1, 60]])
pred = dt_gini.predict(student_new)
print(f"\nPrediction for student {student_new[0]}: {'Pass (1)' if pred[0]==1 else 'Fail (0)'}")
