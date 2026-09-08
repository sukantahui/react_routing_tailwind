"""
03_batch_image_rgb_channel_normalization.py
===========================================
Worked Example 2: Computer Vision ImageNet Channel Broadcasting on 4D Batch
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 2: 4D COMPUTER VISION BROADCASTING")
    print("=" * 70)

    # In Computer Vision transfer learning (ResNet, VGG), input image batches
    # are normalized by subtracting ImageNet RGB channel means.
    # ImageNet Mean: R=123.68, G=116.78, B=103.94
    # ImageNet Std : R=58.393,  G=57.12,  B=57.375

    # Simulated batch: 8 images, 224 height, 224 width, 3 color channels
    # Shape: (8, 224, 224, 3)
    np.random.seed(42)
    image_batch = np.random.uniform(0, 255, size=(8, 224, 224, 3)).astype(np.float32)
    print(f"1. Input Image Batch Shape: {image_batch.shape} (N=8, H=224, W=224, C=3)")

    # 1D Channel Constants
    rgb_means_1d = np.array([123.68, 116.78, 103.94], dtype=np.float32)
    rgb_stds_1d  = np.array([58.393,  57.12,  57.375], dtype=np.float32)

    # Broadcasting Alignment:
    # Image Batch Shape: (8, 224, 224, 3)
    # RGB Means Shape  :             (3,) -> Aligns with trailing dimension C=3!
    # Broadcasting stretches (3,) across N=8, H=224, W=224 automatically without allocating extra memory!
    normalized_batch = (image_batch - rgb_means_1d) / rgb_stds_1d
    print(f"\n2. Normalized Batch Shape: {normalized_batch.shape}")
    print(f"   Original Sample 0, Pixel (0, 0) RGB: {image_batch[0, 0, 0]}")
    print(f"   Normalized Sample 0, Pixel (0, 0) RGB: {np.round(normalized_batch[0, 0, 0], 3)}")

if __name__ == "__main__":
    main()
