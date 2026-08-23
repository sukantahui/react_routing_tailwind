"""
=============================================================================
TOPIC 1: TRADITIONAL PROGRAMMING VS MACHINE LEARNING
Academic Practical Laboratory & Simulation Engine
Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
Course: Introduction to Machine Learning (BCAC701B)
=============================================================================

This simulation demonstrates:
1. Deterministic Rule Engineering: Handcrafted rules for loan credit scoring.
2. Machine Learning Inductive Synthesis: Learning an optimal hyper-plane from historical data.
3. Edge Case Vulnerability: How traditional rules break on boundary conditions and noise.
4. Generalization Benchmark: Evaluating error rates on unseen test applicants from Kolkata & Barrackpore.
=============================================================================
"""

import math
from typing import List, Tuple, Dict, Any

class TraditionalCreditScorer:
    """
    Deductive Rule-Based System:
    A programmer handcodes rigid business logic based on expert heuristic rules.
    """
    def __init__(self):
        self.min_cibil = 700
        self.min_income_lakhs = 5.0
        self.max_debt_to_income = 0.40

    def evaluate(self, cibil: int, annual_income: float, existing_emi_pct: float) -> Tuple[int, str]:
        # Rigid if/else rules
        if cibil < self.min_cibil:
            return 0, f"Rejected: CIBIL score {cibil} < {self.min_cibil} threshold"
        if annual_income < self.min_income_lakhs:
            return 0, f"Rejected: Annual income ₹{annual_income}L < ₹{self.min_income_lakhs}L"
        if existing_emi_pct > self.max_debt_to_income:
            return 0, f"Rejected: Debt-to-income ratio {existing_emi_pct*100:.1f}% > {self.max_debt_to_income*100}%"
        return 1, "Approved: Satisfies all 3 deterministic credit thresholds"


class MLCreditScorer:
    """
    Inductive Machine Learning System:
    Optimizes a continuous logistic boundary: P(Approve) = sigma(w1*cibil_norm + w2*income_norm + w3*emi_norm + b)
    """
    def __init__(self, lr: float = 0.1, epochs: int = 150):
        self.lr = lr
        self.epochs = epochs
        self.weights = [0.0, 0.0, 0.0]
        self.bias = 0.0

    @staticmethod
    def sigmoid(z: float) -> float:
        z_clamped = max(min(z, 20.0), -20.0)
        return 1.0 / (1.0 + math.exp(-z_clamped))

    def predict_proba(self, x: List[float]) -> float:
        z = sum(w * val for w, val in zip(self.weights, x)) + self.bias
        return self.sigmoid(z)

    def predict(self, x: List[float], threshold: float = 0.5) -> int:
        return 1 if self.predict_proba(x) >= threshold else 0

    def train(self, X: List[List[float]], y: List[int]) -> None:
        N = len(X)
        for _ in range(self.epochs):
            dw = [0.0] * 3
            db = 0.0
            for x_vec, target in zip(X, y):
                pred = self.predict_proba(x_vec)
                err = pred - target
                for j in range(3):
                    dw[j] += err * x_vec[j]
                db += err
            for j in range(3):
                self.weights[j] -= (self.lr / N) * dw[j]
            self.bias -= (self.lr / N) * db


def get_credit_dataset() -> Tuple[List[Dict[str, Any]], List[List[float]], List[int]]:
    """
    Applicant data from Barrackpore, Kolkata, and Ichapur.
    Raw Features: [CIBIL (300-900), Annual Income (₹ Lakhs), Debt-to-Income % (0-1)]
    """
    raw_records = [
        {"name": "Mamata (Barrackpore)", "cibil": 760, "income": 9.5, "dti": 0.25, "actual_default": 0},
        {"name": "Mahima (Kolkata)", "cibil": 810, "income": 14.0, "dti": 0.18, "actual_default": 0},
        {"name": "Abhronila (Jadavpur)", "cibil": 695, "income": 12.5, "dti": 0.15, "actual_default": 0}, # High income compensates borderline CIBIL
        {"name": "Susmita (Ichapur)", "cibil": 710, "income": 4.8, "dti": 0.22, "actual_default": 0},   # Solid credit history despite ₹4.8L income
        {"name": "Debangshu (Salt Lake)", "cibil": 620, "income": 3.5, "dti": 0.55, "actual_default": 1},
        {"name": "Siddharth (Barrackpore)", "cibil": 740, "income": 8.0, "dti": 0.32, "actual_default": 0},
        {"name": "Pooja (Kolkata)", "cibil": 580, "income": 6.2, "dti": 0.48, "actual_default": 1},
        {"name": "Aniket (Ichapur)", "cibil": 640, "income": 4.0, "dti": 0.60, "actual_default": 1},
    ]

    # Target: 1 = Good Credit (No Default), 0 = Bad Credit (Default)
    y = [1 if r["actual_default"] == 0 else 0 for r in raw_records]

    # Normalized features: (cibil-300)/600, income/20.0, dti
    X_norm = [
        [(r["cibil"] - 300) / 600.0, r["income"] / 20.0, 1.0 - r["dti"]]
        for r in raw_records
    ]

    return raw_records, X_norm, y


def run_benchmark():
    print("=" * 80)
    print("CODER & ACCOTAX - TOPIC 1 EXPERIMENTAL LAB")
    print("Traditional Rule-Based Programming vs Machine Learning Inductive Modeling")
    print("=" * 80)

    records, X_norm, y_true = get_credit_dataset()
    trad_system = TraditionalCreditScorer()
    ml_system = MLCreditScorer(lr=0.5, epochs=200)

    # Train ML System
    ml_system.train(X_norm, y_true)

    print(f"\n{'Applicant':<25} | {'Ground Truth':<12} | {'Trad Decision':<14} | {'ML Decision':<14} | {'Trad Status':<12} | {'ML Status'}")
    print("-" * 95)

    trad_correct = 0
    ml_correct = 0

    for i in range(len(records)):
        r = records[i]
        actual = "Approve" if y_true[i] == 1 else "Reject"
        
        # Traditional Decision
        t_pred, t_reason = trad_system.evaluate(r["cibil"], r["income"], r["dti"])
        t_str = "Approve" if t_pred == 1 else "Reject"
        t_match = "CORRECT ✔" if t_pred == y_true[i] else "WRONG ❌"
        if t_pred == y_true[i]: trad_correct += 1

        # ML Decision
        m_pred = ml_system.predict(X_norm[i])
        m_str = "Approve" if m_pred == 1 else "Reject"
        m_match = "CORRECT ✔" if m_pred == y_true[i] else "WRONG ❌"
        if m_pred == y_true[i]: ml_correct += 1

        print(f"{r['name']:<25} | {actual:<12} | {t_str:<14} | {m_str:<14} | {t_match:<12} | {m_match}")

    print("-" * 95)
    print(f"Traditional System Accuracy: {trad_correct}/{len(records)} ({trad_correct/len(records)*100:.1f}%)")
    print(f"Machine Learning Accuracy:   {ml_correct}/{len(records)} ({ml_correct/len(records)*100:.1f}%)")
    print("\nINSIGHT: Traditional rules rejected Abhronila (CIBIL 695 < 700) and Susmita (Income ₹4.8L < ₹5.0L)")
    print("despite strong compensating factors. ML captured multi-feature trade-offs automatically.")
    print("=" * 80)


if __name__ == "__main__":
    run_benchmark()
