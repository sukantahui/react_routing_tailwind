"""
01_vstack_hstack_dstack_mechanics.py
====================================
Topic: Array Stacking Mechanics: np.vstack, np.hstack, np.dstack
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("ARRAY STACKING MECHANICS (vstack, hstack, dstack)")
    print("=" * 70)

    # Consider test scores from two batches in Barrackpore
    # Batch A: Debangshu, Susmita (2 students, 3 subjects)
    batch_a = np.array([
        [85, 90, 88],
        [92, 95, 91]
    ])

    # Batch B: Swadeep, Tuhina (2 students, 3 subjects)
    batch_b = np.array([
        [65, 70, 72],
        [88, 85, 94]
    ])

    print("Batch A (2x3):\n", batch_a)
    print("Batch B (2x3):\n", batch_b)

    # 1. np.vstack (Vertical Stacking -> Adds rows along Axis 0)
    # Merging two batches of students (2x3) + (2x3) => (4x3)
    v_stacked = np.vstack((batch_a, batch_b))
    print("\n1. np.vstack((batch_a, batch_b)):")
    print(f"   Shape: {v_stacked.shape} (Appended rows)")
    print(v_stacked)

    # 2. np.hstack (Horizontal Stacking -> Adds columns along Axis 1)
    # Extra subject scores (e.g. Project 1, Project 2) for the SAME students
    batch_projects = np.array([
        [100, 95],
        [98, 99]
    ])
    h_stacked = np.hstack((batch_a, batch_projects))
    print("\n2. np.hstack((batch_a, batch_projects)):")
    print(f"   Shape: {h_stacked.shape} (Appended feature columns)")
    print(h_stacked)

    # 3. 1D Vector Stacking Nuances
    vec1 = np.array([1, 2, 3])
    vec2 = np.array([4, 5, 6])
    print("\n3. Stacking 1D Vectors:")
    print("   np.vstack((vec1, vec2)):\n", np.vstack((vec1, vec2)))  # (2, 3)
    print("   np.hstack((vec1, vec2)):\n", np.hstack((vec1, vec2)))  # (6,)

    # 4. np.dstack (Depth-wise Stacking -> 3D Image Channels)
    # Stacking Red, Green, Blue channel 2D grids (2x3) => (2, 3, 3)
    channel_r = np.array([[255, 0, 0], [0, 255, 0]])
    channel_g = np.array([[0, 255, 0], [255, 0, 0]])
    channel_b = np.array([[0, 0, 255], [0, 0, 255]])

    rgb_image = np.dstack((channel_r, channel_g, channel_b))
    print("\n4. np.dstack((R, G, B)) for Computer Vision:")
    print(f"   Shape: {rgb_image.shape} (Height x Width x Channels)")

if __name__ == "__main__":
    main()
