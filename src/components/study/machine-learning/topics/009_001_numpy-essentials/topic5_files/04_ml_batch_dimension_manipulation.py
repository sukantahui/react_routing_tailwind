"""
================================================================================
Topic 5 - Script 04: Batch Dimension Formatting in Real-World ML Models
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Preparing a single student test vector for Scikit-learn model.predict()
- Handling batch inputs in Deep Learning (e.g. PyTorch / Keras inputs)
- Preventing broadcasting bugs caused by unexpected singleton dimensions
================================================================================
"""

import numpy as np

def simulate_ml_batch_formatting():
    print("=" * 65)
    print("ML WORKFLOW: Preparing Single Sample for Model Inference")
    print("=" * 65)

    # A single student's features: [Study Hours = 4.5, Attendance = 88.0, Prev Marks = 79.0]
    single_student = np.array([4.5, 88.0, 79.0])
    print("Raw single sample shape:", single_student.shape, "<- Invalid for model.predict()!")

    # Fix 1: Add Batch dimension using np.newaxis or reshape(1, -1)
    batch_input = single_student[np.newaxis, :]  # Shape (1, 3)
    print("Formatted 2D Matrix Shape:", batch_input.shape, "<- Ready for Scikit-learn!")

    # Simulated model weights (3 features -> 1 output)
    weights = np.array([[5.0], [0.4], [0.3]]) # Shape (3, 1)
    bias = 10.0

    # Matrix multiplication: (1, 3) @ (3, 1) -> (1, 1)
    pred_2d = np.dot(batch_input, weights) + bias
    print("\nModel Output (2D):", pred_2d, "Shape:", pred_2d.shape)

    # Flatten back to scalar for user presentation
    final_score = pred_2d.item() # or np.squeeze(pred_2d)
    print(f"Final Predicted Marks: {final_score:.2f}")

if __name__ == "__main__":
    simulate_ml_batch_formatting()
