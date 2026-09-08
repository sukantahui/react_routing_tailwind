"""
================================================================================
Topic 7 - Script 03: Multidimensional Slicing & The Ellipsis (...) Operator
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The Ellipsis (...) syntax to stand for 'as many colons as needed'
- Slicing higher dimensional arrays (3D and 4D Computer Vision & NLP tensors)
- Extracting specific color channels or specific time steps across entire batches
================================================================================
"""

import numpy as np

def demonstrate_ellipsis_slicing():
    print("=" * 65)
    print("1. 3D TIME-SERIES SLICING")
    print("=" * 65)
    # (100 students, 30 days of attendance, 5 sensor features)
    time_series = np.zeros((100, 30, 5))
    print("Time-series shape (Students, Days, Features):", time_series.shape)

    # Extract all students, all days, only feature 0 (Study duration)
    # Traditional slice:
    f0_standard = time_series[:, :, 0]
    # Ellipsis slice:
    f0_ellipsis = time_series[..., 0]
    print("time_series[..., 0] shape:", f0_ellipsis.shape)
    print("Verification:", np.array_equal(f0_standard, f0_ellipsis))

    print("\n" + "=" * 65)
    print("2. 4D COMPUTER VISION IMAGE BATCH SLICING")
    print("=" * 65)
    # (Batch=32, Height=128, Width=128, Channels=3)
    image_batch = np.zeros((32, 128, 128, 3))
    print("RGB Image Batch shape:", image_batch.shape)

    # Extract the Red Channel across all 32 images:
    red_channel = image_batch[..., 0]
    print("Red Channel batch shape (image_batch[..., 0]):", red_channel.shape)

    # Extract the first image across all channels:
    first_image = image_batch[0, ...] # or image_batch[0]
    print("First Image shape (image_batch[0, ...]):", first_image.shape)

if __name__ == "__main__":
    demonstrate_ellipsis_slicing()
