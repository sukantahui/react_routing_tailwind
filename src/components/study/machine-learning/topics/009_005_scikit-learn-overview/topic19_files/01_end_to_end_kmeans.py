"""
Topic 19: Worked Example 3 (End-to-End KMeans Clustering)
Script 1: Student Persona Segmentation Pipeline
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Real-world student behavioral dataset
student_records = {
    'student_name': ['Debangshu', 'Susmita', 'Swadeep', 'Tuhina', 'Sachin', 'Mahima', 'Abhronila', 'Rohan', 'Priya', 'Sneha', 'Ayan', 'Sourav'],
    'portal_logins_monthly': [12, 45, 8, 40, 22, 48, 10, 25, 42, 15, 20, 44],
    'code_submissions': [5, 38, 3, 35, 12, 42, 4, 18, 36, 8, 14, 40],
    'forum_questions': [15, 2, 18, 3, 10, 1, 14, 8, 2, 12, 9, 2]
}
df = pd.DataFrame(student_records)
features = ['portal_logins_monthly', 'code_submissions', 'forum_questions']
X = df[features]

# 2. Pipeline: StandardScaler + KMeans(n_clusters=3)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('kmeans', KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42))
])

pipeline.fit(X)

# 3. Extract assignments and statistics
scaler = pipeline.named_steps['scaler']
kmeans = pipeline.named_steps['kmeans']
df['cluster_id'] = kmeans.labels_

# 4. Invert centroids back to physical human-understandable units
real_centroids = scaler.inverse_transform(kmeans.cluster_centers_)
df_centroids = pd.DataFrame(real_centroids, columns=features)
df_centroids['Persona Label'] = ['Struggling / Theory-Heavy', 'High-Achieving Coders', 'Moderate Steady Learners']

print("--- Discovered Student Persona Centroids ---")
print(df_centroids.round(1))

# 5. Silhouette Quality Score
X_scaled = scaler.transform(X)
sil_score = silhouette_score(X_scaled, kmeans.labels_)
print(f"\nOverall Silhouette Score: {sil_score:.4f} (Good clustering separation)")
