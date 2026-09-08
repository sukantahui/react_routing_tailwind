"""
================================================================================
Topic 6 - Script 04: Flattening Image Batches for ML Classifiers
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Flattening 3D/4D image datasets for Logistic Regression and SVMs
- Reshaping (N_images, Height, Width) -> (N_images, Height * Width)
- Preserving the batch dimension with reshape(N, -1)
- Reconstructing 2D images from 1D flat feature vectors for visualization
================================================================================
"""

import numpy as np

def demonstrate_image_flattening():
    print("=" * 65)
    print("ML PIPELINE: Flattening 28x28 MNIST Images into 2D Feature Matrix")
    print("=" * 65)

    # 100 grayscale handwritten digits of 28x28 pixels
    n_samples = 100
    images_3d = np.random.randint(0, 256, size=(n_samples, 28, 28), dtype=np.uint8)
    print("Raw MNIST Dataset Shape:", images_3d.shape)

    # Flatten each image while preserving the sample dimension: (100, 784)
    X_features = images_3d.reshape(n_samples, -1)
    print(f"Flattened Feature Matrix X Shape: {X_features.shape}")
    print(f"Each row is a 784-dimensional feature vector ready for LogisticRegression.fit(X, y)")

    print("\n" + "=" * 65)
    print("RECONSTRUCTING AN IMAGE FROM A FLAT 1D FEATURE ROW")
    print("=" * 65)
    # Extract student 0's flat feature vector (784,)
    first_row = X_features[0]
    print("Single row feature vector shape:", first_row.shape)

    # Reconstruct 28x28 image grid for plotting / Matplotlib display
    reconstructed_image = first_row.reshape(28, 28)
    print("Reconstructed image grid shape :", reconstructed_image.shape)
    print("Verification: All pixels match :", np.array_equal(images_3d[0], reconstructed_image))

if __name__ == "__main__":
    demonstrate_image_flattening()
