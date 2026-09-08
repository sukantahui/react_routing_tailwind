"""
=============================================================================
TOPIC 0: Introduction to Matplotlib
Script 03: Data Pipelines - Interfacing Lists, NumPy, and Pandas
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Feeding Diverse Data Structures into Matplotlib")

# 1. Native Python lists
x_list = [10, 20, 30, 40, 50]
y_list = [15, 28, 42, 65, 89]

# 2. NumPy 1D and 2D arrays
x_np = np.linspace(0, 10, 50)
y_np = np.sin(x_np)

# 3. Pandas DataFrame & Series
df = pd.DataFrame({
    'Student': ['Debangshu', 'Susmita', 'Swadeep', 'Tuhina', 'Sachin'],
    'Score': [88, 94, 76, 91, 84],
    'Attendance': [95, 98, 85, 92, 89]
})

fig, axs = plt.subplots(1, 3, figsize=(15, 4))

# Plot list data
axs[0].plot(x_list, y_list, color='#e11d48', marker='o')
axs[0].set_title("1. Python Lists Input")

# Plot NumPy array
axs[1].plot(x_np, y_np, color='#0284c7', lw=2)
axs[1].set_title("2. NumPy Array Input")

# Plot Pandas DataFrame using 'data' parameter keyword
axs[2].bar('Student', 'Score', data=df, color='#10b981', alpha=0.85)
axs[2].set_title("3. Pandas DataFrame Input")
axs[2].tick_params(axis='x', rotation=30)

plt.tight_layout()
plt.close(fig)

print("✓ Successfully piped Lists, NumPy ndarrays, and Pandas DataFrames into Matplotlib!")
