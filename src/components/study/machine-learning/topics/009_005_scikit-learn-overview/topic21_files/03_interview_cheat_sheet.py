"""
Topic 21: Short Questions / Viva Voce
Script 3: 10 Rapid-Fire Scikit-learn Technical Interview Q&A
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

interview_qa = [
    ("1. What is an Estimator?", "Any Scikit-learn object that learns from data via .fit()."),
    ("2. What is a Transformer?", "An estimator that modifies/scales features via .transform() or .fit_transform()."),
    ("3. What is Data Leakage?", "When test data statistics contaminate preprocessors during training."),
    ("4. Why use Pipeline?", "To bundle preprocessing and models into one object, completely preventing data leakage."),
    ("5. LabelEncoder vs OneHotEncoder?", "LabelEncoder is for 1D target y; OneHotEncoder is for 2D feature matrix X."),
    ("6. What does stratify=y do?", "Preserves class proportions in train/test splits, essential for imbalanced data."),
    ("7. Gini vs Entropy in Decision Trees?", "Gini is faster (no logs); Entropy measures information gain in bits."),
    ("8. What is Inertia in KMeans?", "The Within-Cluster Sum of Squares (WCSS); lower inertia means tighter clusters."),
    ("9. Precision vs Recall priority?", "Spam filter -> High Precision; Cancer/Fraud detection -> High Recall."),
    ("10. What does make_pipeline do?", "Shorthand for Pipeline() that automatically generates lowercase step names.")
]

print("=== 10 RAPID-FIRE INTERVIEW QUESTIONS & ANSWERS ===")
for q, a in interview_qa:
    print(f"\n{q}\n--> {a}")
