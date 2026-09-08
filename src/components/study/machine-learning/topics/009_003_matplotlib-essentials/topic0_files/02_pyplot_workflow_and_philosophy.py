"""
=============================================================================
TOPIC 0: Introduction to Matplotlib
Script 02: Pyplot State Machine & Canvas Lifecycle
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. The Stateful Pyplot Lifecycle (gcf and gca)")

# Get Current Figure (gcf) and Get Current Axes (gca)
plt.figure(1, figsize=(6, 3))
current_fig = plt.gcf()
current_ax = plt.gca()

print(f"Active Figure Number : {current_fig.number}")
print(f"Active Axes Object   : {current_ax}")

# Generating synthetic batch training loss data for Coder & AccoTax ML Lab
epochs = np.arange(1, 11)
train_loss = 1.0 / (epochs ** 0.5) + np.random.normal(0, 0.02, size=10)
val_loss = 1.1 / (epochs ** 0.45) + np.random.normal(0, 0.03, size=10)

plt.plot(epochs, train_loss, 'r--o', label="Training Loss")
plt.plot(epochs, val_loss, 'b-s', label="Validation Loss")
plt.title("Model Convergence Across Epochs")
plt.xlabel("Epoch")
plt.ylabel("Cross-Entropy Loss")
plt.legend()
plt.grid(True, linestyle=":", alpha=0.6)

# Lifecycle demonstration: plt.draw() vs plt.show() vs plt.close()
print("Figure rendered in background memory buffer.")
plt.close(1)
print("Figure 1 memory cleared using plt.close(1).")
