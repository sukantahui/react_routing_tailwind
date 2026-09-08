"""
Topic 9: KNeighborsClassifier
Script 2: Finding Optimal K (Elbow Method on Error Rate)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# Generate synthetic 2-class dataset
X, y = make_classification(
    n_samples=200, n_features=2, n_informative=2, n_redundant=0,
    n_clusters_per_class=1, random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

error_rates = []
k_values = range(1, 20, 2) # Odd numbers to prevent ties

print("--- Testing Different K Values ---")
for k in k_values:
    model = KNeighborsClassifier(n_neighbors=k, weights='uniform')
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    err = 1.0 - accuracy_score(y_test, y_pred)
    error_rates.append(err)
    print(f"K = {k:2d} | Test Error Rate = {err:.4f} | Accuracy = {(1-err)*100:.1f}%")

best_k = list(k_values)[np.argmin(error_rates)]
print(f"\nOptimal K identified: K = {best_k} (Lowest Error: {min(error_rates):.4f})")
