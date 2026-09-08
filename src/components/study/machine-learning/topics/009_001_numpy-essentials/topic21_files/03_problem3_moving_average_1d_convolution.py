"""
03_problem3_moving_average_1d_convolution.py
============================================
Practice Problem 3: 1D Moving Average Smoothing using np.convolve & Cumulative Sums
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def moving_average_convolve(series: np.ndarray, window_size: int = 3) -> np.ndarray:
    """Computes rolling moving average using discrete 1D convolution."""
    # Box filter kernel of uniform weights [1/w, 1/w, ..., 1/w]
    kernel = np.ones(window_size) / window_size
    # 'valid' mode only computes averages where the window completely overlaps
    return np.convolve(series, kernel, mode='valid')

def moving_average_cumsum(series: np.ndarray, window_size: int = 3) -> np.ndarray:
    """Computes moving average in O(N) time using cumulative sums (np.cumsum)."""
    cumsum_vec = np.cumsum(np.insert(series, 0, 0))
    return (cumsum_vec[window_size:] - cumsum_vec[:-window_size]) / window_size

def main():
    print("=" * 70)
    print("PRACTICE PROBLEM 3: 1D MOVING AVERAGE FILTER FOR TIME-SERIES")
    print("=" * 70)

    # 10 daily temperature readings from Barrackpore sensor
    raw_temps = np.array([28.0, 30.0, 35.0, 32.0, 29.0, 27.0, 31.0, 33.0, 36.0, 34.0])
    w = 3

    print(f"Original Time Series ({len(raw_temps)} days):", raw_temps)
    print(f"Window Size w = {w} days")

    # Method 1: Convolution
    ma_conv = moving_average_convolve(raw_temps, window_size=w)
    # Method 2: Cumulative Sum
    ma_cum = moving_average_cumsum(raw_temps, window_size=w)

    print(f"\nMoving Average (Convolution, len={len(ma_conv)}):\n", np.round(ma_conv, 2))
    print(f"Moving Average (CumSum, len={len(ma_cum)}):\n", np.round(ma_cum, 2))

    assert np.allclose(ma_conv, ma_cum)
    print("\n-> Validation Succeeded: Moving average smooths short-term noise!")

if __name__ == "__main__":
    main()
