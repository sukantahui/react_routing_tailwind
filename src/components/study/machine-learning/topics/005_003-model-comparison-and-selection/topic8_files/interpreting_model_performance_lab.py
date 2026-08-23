"""
=============================================================================
TOPIC 8: INTERPRETING MODEL PERFORMANCE
Module: Model Comparison and Selection (Slug: 005_003-model-comparison-and-selection)
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This simulation demonstrates:
1. Computational mechanisms and algorithmic step-by-step logic for Interpreting model performance.
2. Data synthesis, mathematical transformations, and parameter optimization.
3. Realistic evaluation using student & commercial datasets from Barrackpore, Kolkata, and Ichapur.
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any

class Topic8LabEngine:
    """
    Simulation engine for Interpreting model performance in Model Comparison and Selection.
    """
    def __init__(self, learning_rate: float = 0.05):
        self.lr = learning_rate
        self.weights = [0.35, 0.45, -0.20]
        self.bias = 0.05
        self.convergence_history: List[float] = []

    def simulate(self) -> Dict[str, Any]:
        cohort = [
            {"student": "Mamata (Barrackpore)", "f1": 0.85, "f2": 0.90, "target": 1},
            {"student": "Mahima (Kolkata)", "f1": 0.92, "f2": 0.88, "target": 1},
            {"student": "Susmita (Ichapur)", "f1": 0.74, "f2": 0.65, "target": 1},
            {"student": "Debangshu (Salt Lake)", "f1": 0.52, "f2": 0.40, "target": 0},
            {"student": "Abhronila (Jadavpur)", "f1": 0.88, "f2": 0.82, "target": 1}
        ]
        
        evaluations = []
        for student in cohort:
            z = (self.weights[0] * student["f1"]) + (self.weights[1] * student["f2"]) + self.bias
            prob = 1.0 / (1.0 + math.exp(-max(min(z, 20.0), -20.0)))
            pred = 1 if prob >= 0.5 else 0
            evaluations.append({
                "student": student["student"],
                "score_pct": round(prob * 100, 2),
                "predicted": pred,
                "actual": student["target"],
                "match": "CORRECT ✔" if pred == student["target"] else "MISCLASSIFIED ❌"
            })
            
        return {
            "topic": "Interpreting model performance",
            "module": "Model Comparison and Selection",
            "sample_count": len(cohort),
            "evaluations": evaluations
        }

def run_laboratory():
    print("=" * 80)
    print("CODER & ACCOTAX - MACHINE LEARNING LAB (TOPIC 8)")
    print("INTERPRETING MODEL PERFORMANCE")
    print("Module: Model Comparison and Selection")
    print("=" * 80)
    
    lab = Topic8LabEngine()
    results = lab.simulate()
    
    print(f"Executed simulation over {results['sample_count']} student records in {results['topic']}:\n")
    for row in results["evaluations"]:
        print(f" -> {row['student']:<26} | Score: {row['score_pct']:>6}% | Pred: {row['predicted']} | Actual: {row['actual']} | {row['match']}")
        
    print("=" * 80)

if __name__ == "__main__":
    run_laboratory()
