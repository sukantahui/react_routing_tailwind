"""
================================================================================
Topic 4 - Script 04: Generating 2D Decision Grids with linspace & meshgrid
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Generating 2D coordinate test matrices for ML decision boundaries
- Combining np.linspace() with np.meshgrid()
- Flattening and stacking coordinates with np.c_ / np.column_stack()
- Evaluating model predictions across 10,000 grid points
================================================================================
"""

import numpy as np

def generate_decision_boundary_grid():
    print("=" * 65)
    print("ML TOOL: Generating Evaluation Coordinate Grid for Classifiers")
    print("=" * 65)

    # Feature 1: Study Hours (0 to 10 hours)
    # Feature 2: Attendance (0% to 100%)
    x1_coords = np.linspace(0.0, 10.0, 50)
    x2_coords = np.linspace(0.0, 100.0, 50)

    # Create 2D coordinate meshgrid
    XX1, XX2 = np.meshgrid(x1_coords, x2_coords)
    print(f"XX1 Grid Shape: {XX1.shape}")
    print(f"XX2 Grid Shape: {XX2.shape}")

    # Flatten and pair up into (N_samples, 2_features)
    grid_points = np.c_[XX1.ravel(), XX2.ravel()]
    print(f"Total evaluation test points: {grid_points.shape[0]} points")
    print("First 5 test coordinate vectors:\n", grid_points[:5])

    # Simulate Linear Classifier boundary: Pass if 8*hours + 0.6*att > 65
    weights = np.array([8.0, 0.6])
    bias = -65.0
    logits = np.dot(grid_points, weights) + bias
    preds = (logits >= 0).astype(int)

    print(f"\nModel evaluation complete!")
    print(f"Pass predictions: {np.sum(preds == 1):,} points")
    print(f"Fail predictions: {np.sum(preds == 0):,} points")

if __name__ == "__main__":
    generate_decision_boundary_grid()
