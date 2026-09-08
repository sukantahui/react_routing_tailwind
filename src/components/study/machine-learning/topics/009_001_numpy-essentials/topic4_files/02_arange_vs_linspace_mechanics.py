"""
================================================================================
Topic 4 - Script 02: np.arange() vs np.linspace() Mechanics & Floating Pitfalls
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- np.arange(start, stop, step): Half-open interval [start, stop) with step size
- Floating-point accumulation error pitfall in np.arange()
- np.linspace(start, stop, num_samples, endpoint=True/False): Exact sample count
- When to use arange (discrete integer steps) vs linspace (continuous function domains)
================================================================================
"""

import numpy as np

def compare_arange_and_linspace():
    print("=" * 65)
    print("1. np.arange(): STEP-SIZE BASED RANGES")
    print("=" * 65)
    
    # Integer range 0 to 10 with step 2
    int_range = np.arange(0, 10, 2)
    print("np.arange(0, 10, 2)       :", int_range)

    # Floating point step warning
    # Due to IEEE 754 precision, arange with floats can unexpectedly include the endpoint!
    float_step = np.arange(0.0, 1.0, 0.2)
    print("np.arange(0.0, 1.0, 0.2)   :", float_step)

    print("\n" + "=" * 65)
    print("2. np.linspace(): EXACT SAMPLE COUNT (RECOMMENDED FOR CONTINUOUS GRIDS)")
    print("=" * 65)
    
    # 5 evenly spaced points between 0.0 and 1.0 inclusive
    lin_5 = np.linspace(0.0, 1.0, num=5, endpoint=True)
    print("np.linspace(0.0, 1.0, 5)   :", lin_5)
    print(f"Exact step distance        : {(1.0 - 0.0) / (5 - 1):.2f}")

    # 100 sample points for smooth curve evaluation (e.g. Sigmoid curve)
    x_domain = np.linspace(-6.0, 6.0, num=100)
    sigmoid_y = 1.0 / (1.0 + np.exp(-x_domain))
    print(f"\nGenerated {len(x_domain)} points for Sigmoid activation curve domain.")
    print("x range:", x_domain[0], "to", x_domain[-1])
    print("y range:", sigmoid_y[0], "to", sigmoid_y[-1])

if __name__ == "__main__":
    compare_arange_and_linspace()
