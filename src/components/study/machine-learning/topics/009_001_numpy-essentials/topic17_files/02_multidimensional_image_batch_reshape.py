"""
02_multidimensional_image_batch_reshape.py
==========================================
Worked Example 1: Computer Vision Batch Tensor Reshaping (MNIST / CIFAR-10)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 1: COMPUTER VISION IMAGE BATCH RESHAPING")
    print("=" * 70)

    # Problem:
    # 100 grayscale handwritten digits (MNIST-style) loaded from flat binary CSV file.
    # Each image has 28 x 28 = 784 pixel values.
    # Total flat vector size: 100 * 784 = 78,400 floats.
    num_images = 100
    height = 28
    width = 28
    channels = 1

    # 1. Ingest flat pixel array
    raw_pixels = np.random.randint(0, 256, size=num_images * height * width, dtype=np.uint8)
    print(f"1. Raw Flat Pixels Array: Shape {raw_pixels.shape}, Size: {raw_pixels.size} bytes")

    # 2. Reshape for Convolutional Neural Network (CNN)
    # Shape: (Batch_Size, Height, Width, Channels) => (100, 28, 28, 1)
    cnn_batch = raw_pixels.reshape((num_images, height, width, channels))
    print(f"\n2. CNN Input Tensor Shape: {cnn_batch.shape}")
    print(f"   Image 0 shape: {cnn_batch[0].shape}")

    # 3. Reshape for Multi-Layer Perceptron (Dense / Fully-Connected Classifier)
    # Shape: (Batch_Size, 784)
    dense_batch = cnn_batch.reshape(num_images, -1)
    print(f"\n3. Flattened Dense Input Shape: {dense_batch.shape} (N=100, Features=784)")

    # 4. Transpose Channel Ordering (NHWC -> NCHW for PyTorch compatibility)
    # (100, 28, 28, 1) -> (100, 1, 28, 28)
    nchw_batch = np.transpose(cnn_batch, (0, 3, 1, 2))
    print(f"\n4. PyTorch NCHW Format Shape: {nchw_batch.shape}")

if __name__ == "__main__":
    main()
