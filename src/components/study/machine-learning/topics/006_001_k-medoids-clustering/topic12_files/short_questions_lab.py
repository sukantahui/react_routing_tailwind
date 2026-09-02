"""
short_questions_lab.py
Module 006_001: K-Medoids Clustering
Topic 12: Comprehensive Short Questions & Rapid-Fire Concept Review
Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

def run_rapid_concept_quiz():
    """Interactive rapid-fire concept review on K-Medoids Clustering."""
    print("=" * 65)
    print(" K-Medoids Clustering: Rapid-Fire Concept Review")
    print(" Coder & AccoTax | Educator: Sukanta Hui (Barrackpore)")
    print("=" * 65)
    
    quiz_items = [
        {
            "q": "1. What is the fundamental difference between a centroid and a medoid?",
            "a": "A centroid is a virtual arithmetic mean vector; a medoid is an actual data instance from the dataset."
        },
        {
            "q": "2. What mathematical loss function does standard K-Medoids minimize?",
            "a": "Total absolute dissimilarity J = sum_{i=1}^N D(x_i, m_{y_i})."
        },
        {
            "q": "3. What is the breakdown point of K-Medoids compared to K-Means?",
            "a": "K-Medoids has a 50% breakdown point (extreme outlier resistance); K-Means has a 0% breakdown point."
        },
        {
            "q": "4. What are the two distinct phases of the PAM algorithm?",
            "a": "1. The BUILD phase (greedy medoid initialization) and 2. The SWAP phase (iterative cost-decreasing medoid replacement)."
        },
        {
            "q": "5. What is the time complexity of a single SWAP iteration in standard PAM?",
            "a": "O(K * (N - K)^2)."
        },
        {
            "q": "6. How does CLARA enable K-Medoids to scale to large datasets?",
            "a": "By running PAM on multiple small random subsamples (e.g. 40 + 2k) and choosing the best overall medoids."
        },
        {
            "q": "7. What distance metric is best suited for high-dimensional text document clustering?",
            "a": "Cosine Distance."
        },
        {
            "q": "8. When does the K-Medoids algorithm terminate?",
            "a": "When medoid indices do not change between iterations or when no swap yields Delta C < 0."
        }
    ]
    
    for idx, item in enumerate(quiz_items, 1):
        print(f"\n[Q{idx}] {item['q']}")
        print(f"  --> ANSWER: {item['a']}")
        
    print("\n" + "=" * 65)
    print(" Complete Module 006_001 Review Verified! You are ready for exams & industry.")
    print("=" * 65)

if __name__ == "__main__":
    run_rapid_concept_quiz()
