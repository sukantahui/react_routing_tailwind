"""
03_imbalanced_churn_dataset_synthesis.py
========================================
Worked Example 4: Synthesizing Realistic Tabular Datasets with Class Imbalance
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def generate_telecom_churn_data(N: int = 1000, seed: int = 42):
    """Synthesizes tabular dataset simulating customer churn in Barrackpore ISP."""
    rng = np.random.default_rng(seed=seed)
    
    # Feature 1: Account Age in months ~ Uniform[1, 72]
    account_age = rng.integers(1, 73, size=N)
    
    # Feature 2: Monthly Charges in INR ~ Normal(loc=800, scale=200)
    monthly_charges = np.clip(rng.normal(loc=800.0, scale=200.0, size=N), 300.0, 2000.0)
    
    # Feature 3: Support Calls in past year ~ Poisson(lambda=2.0)
    support_calls = rng.poisson(lam=2.0, size=N)
    
    # Feature 4: Plan Type [0: Basic, 1: Standard, 2: Premium]
    plan_types = rng.choice([0, 1, 2], size=N, p=[0.5, 0.35, 0.15])
    
    # Realistic Churn Probability logic: High charges + Many support calls + Low tenure => Churn
    churn_logits = -2.5 + (monthly_charges / 500.0) + (0.8 * support_calls) - (0.05 * account_age)
    churn_probs = 1.0 / (1.0 + np.exp(-churn_logits))  # Sigmoid activation
    
    # Binary labels y ~ Bernoulli(p)
    y_churn = (rng.uniform(0.0, 1.0, size=N) < churn_probs).astype(int)
    
    # Stack features into 2D tabular matrix: (N, 4)
    X = np.column_stack((account_age, monthly_charges, support_calls, plan_types))
    return X, y_churn

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 4: IMBALANCED TABULAR CHURN DATASET SYNTHESIS")
    print("=" * 70)

    X, y = generate_telecom_churn_data(N=1000, seed=42)
    print(f"Generated Tabular Dataset: X shape={X.shape}, y shape={y.shape}")
    print("\nFeatures Matrix X (Tenure_Months, Monthly_INR, Support_Calls, Plan_Type):")
    print(np.round(X[:5], 2))

    print("\nTarget Churn Labels (1 = Churned, 0 = Retained):", y[:5])

    # Check Imbalance Ratio
    churn_count = np.sum(y == 1)
    retention_count = np.sum(y == 0)
    print(f"\nClass Distribution:\n  Retained (0): {retention_count} ({retention_count/len(y)*100:.1f}%)\n  Churned  (1): {churn_count} ({churn_count/len(y)*100:.1f}%)")

if __name__ == "__main__":
    main()
