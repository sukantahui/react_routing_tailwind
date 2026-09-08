"""
Topic 12: Content-Based Item Recommendation with cdist
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial.distance import cdist

# Course Catalog Features: [Video Hours, Coding Labs Count, Difficulty (1-5)]
catalog = np.array([
    [10.0, 25.0, 1.0], # Course 0: Intro to Python
    [45.0, 90.0, 4.0], # Course 1: Advanced ML with Scikit-learn & SciPy
    [40.0, 85.0, 4.0], # Course 2: Deep Learning Specialization
    [8.0, 15.0, 1.0],  # Course 3: Basic Excel Automation
    [35.0, 70.0, 3.5]  # Course 4: Data Engineering Pipeline
])
course_names = [
    "Intro to Python",
    "Advanced ML with Scikit-learn & SciPy",
    "Deep Learning Specialization",
    "Basic Excel Automation",
    "Data Engineering Pipeline"
]

# Student just finished "Advanced ML with Scikit-learn & SciPy" (Index 1)
target_course = catalog[1:2] # shape (1, 3)

# Compute Euclidean distances from Course 1 to all catalog courses
distances = cdist(target_course, catalog, metric='euclidean')[0]

# Sort by distance (excluding self at index 1)
sorted_indices = np.argsort(distances)

print("--- Content-Based Course Recommender System ---")
print(f"Base Course: '{course_names[1]}'\n")
print("Top Recommended Next Courses:")
for rank, idx in enumerate(sorted_indices[1:], 1):
    print(f" {rank}. {course_names[idx]:<35} (Distance: {distances[idx]:.2f})")
