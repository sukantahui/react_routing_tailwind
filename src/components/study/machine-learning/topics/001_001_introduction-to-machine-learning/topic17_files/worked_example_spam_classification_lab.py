"""
=============================================================================
TOPIC 17: WORKED EXAMPLE 4: SPAM EMAIL CLASSIFICATION
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This simulation demonstrates:
1. Core computational mechanisms of Worked Example 4: Spam Email Classification.
2. Step-by-step data processing and mathematical optimization.
3. Realistic simulation with regional student & industrial datasets from Kolkata, Barrackpore, and Ichapur.
=============================================================================
"""

import math
import random
from typing import List, Tuple, Dict, Any

class Topic17SimulationEngine:
    """
    Dedicated simulation engine for Worked Example 4: Spam Email Classification.
    """
    def __init__(self, learning_rate: float = 0.1):
        self.lr = learning_rate
        self.weights = [0.25, 0.45, -0.35]
        self.bias = 0.10
        self.history = []

    def execute_simulation(self) -> Dict[str, Any]:
        dataset = [
            {"student": "Mamata (Barrackpore)", "f1": 0.85, "f2": 0.90, "target": 1},
            {"student": "Mahima (Kolkata)", "f1": 0.92, "f2": 0.88, "target": 1},
            {"student": "Susmita (Ichapur)", "f1": 0.74, "f2": 0.65, "target": 1},
            {"student": "Debangshu (Salt Lake)", "f1": 0.52, "f2": 0.40, "target": 0},
            {"student": "Abhronila (Jadavpur)", "f1": 0.88, "f2": 0.82, "target": 1}
        ]
        
        results = []
        for row in dataset:
            z = (self.weights[0] * row["f1"]) + (self.weights[1] * row["f2"]) + self.bias
            prob = 1.0 / (1.0 + math.exp(-max(min(z, 20.0), -20.0)))
            pred = 1 if prob >= 0.5 else 0
            results.append({
                "student": row["student"],
                "probability": round(prob * 100, 2),
                "prediction": pred,
                "target": row["target"],
                "status": "CORRECT ✔" if pred == row["target"] else "MISCLASSIFIED ❌"
            })
            
        return {
            "topic": "Worked Example 4: Spam Email Classification",
            "records_processed": len(dataset),
            "results": results
        }

def run_lab():
    print("=" * 80)
    print("CODER & ACCOTAX - MACHINE LEARNING LAB (TOPIC 17)")
    print("WORKED EXAMPLE 4: SPAM EMAIL CLASSIFICATION")
    print("=" * 80)
    
    engine = Topic17SimulationEngine()
    output = engine.execute_simulation()
    
    print(f"Processed {output['records_processed']} test records in {output['topic']}:\n")
    for r in output["results"]:
        print(f" -> {r['student']:<26} | Prob: {r['probability']:>6}% | Pred: {r['prediction']} | Target: {r['target']} | {r['status']}")
        
    print("=" * 80)

if __name__ == "__main__":
    run_lab()
