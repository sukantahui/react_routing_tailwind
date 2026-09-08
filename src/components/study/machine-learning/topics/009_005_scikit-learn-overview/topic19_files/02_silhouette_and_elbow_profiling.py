"""
Topic 19: Worked Example 3 (End-to-End KMeans Clustering)
Script 2: Comparing Elbow Inertia vs Silhouette Scores across K
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=250, centers=3, n_features=4, cluster_std=1.2, random_state=42)
X_scaled = StandardScaler().fit_transform(X)

records = []

for k in range(2, 7):
    km = KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42)
    labels = km.fit_predict(X_scaled)
    sil = silhouette_score(X_scaled, labels)
    records.append({
        'K Clusters': k,
        'Inertia (WCSS)': round(km.inertia_, 2),
        'Silhouette Score': round(sil, 4)
    })

print("--- Cluster Evaluation Profile across K ---")
print(pd.DataFrame(records).to_string(index=False))
print("\nHighest Silhouette Score indicates the cleanest cluster boundaries (Optimal K = 3)!")
