"""
Topic 19: Worked Example 3 (End-to-End KMeans Clustering)
Script 3: Classifying New Inbound Students into Persona Clusters
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Pre-trained pipeline on historical batch data
X_train = pd.DataFrame({
    'logins': [10, 45, 8, 42, 20, 48, 12, 25],
    'submissions': [4, 38, 2, 36, 10, 42, 5, 18],
    'forum_questions': [16, 2, 19, 3, 11, 1, 15, 8]
})

pipeline = make_pipeline(
    StandardScaler(),
    KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)
)
pipeline.fit(X_train)

# Persona dictionary
persona_mapping = {
    0: "Theory-Struggling (Needs 1-on-1 Code Mentorship)",
    1: "Power Coders (Ready for Advanced Real-World Projects)",
    2: "Steady Learners (On Track, Moderate Pace)"
}

# New student joining the Barrackpore academy
new_student = pd.DataFrame([{
    'logins': 46,
    'submissions': 40,
    'forum_questions': 2
}])

pred_cluster = pipeline.predict(new_student)[0]
print("--- Real-time Student Triage ---")
print(f"New Student Activity: {new_student.to_dict(orient='records')[0]}")
print(f"Assigned Cluster ID: {pred_cluster}")
print(f"Recommended Academic Action: {persona_mapping.get(pred_cluster, 'Standard Track')}")
