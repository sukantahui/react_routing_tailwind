"""
=============================================================================
TOPIC 3: Line Plot with plt.plot()
Script 03: Step Plots, Dual Y-Axes, and Logarithmic Loss Decay
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Step Plots & Dual Axes with ax.twinx()")

epochs = np.arange(1, 21)
# Learning rate schedule (Step decay every 5 epochs)
lr_schedule = 0.01 * (0.5 ** (epochs // 5))
loss = 2.0 * np.exp(-0.25 * epochs) + 0.05 * np.random.rand(20)

fig, ax1 = plt.subplots(figsize=(8, 4.5))

# Plot Loss on Primary Y-Axis (ax1)
color_loss = '#ef4444'
ax1.set_xlabel("Training Epoch")
ax1.set_ylabel("Training Loss", color=color_loss, fontweight='bold')
line1 = ax1.plot(epochs, loss, color=color_loss, lw=2, marker='o', label="Train Loss")
ax1.tick_params(axis='y', labelcolor=color_loss)
ax1.set_yscale('log') # Log scale for exponential loss decay
ax1.grid(True, linestyle="--", alpha=0.3)

# Create Secondary Y-Axis sharing the same X-axis
ax2 = ax1.twinx()
color_lr = '#06b6d4'
ax2.set_ylabel("Learning Rate (Step Decay)", color=color_lr, fontweight='bold')
# Step plot for discrete schedule changes
line2 = ax2.step(epochs, lr_schedule, where='mid', color=color_lr, lw=2.5, linestyle='--', label="Learning Rate")
ax2.tick_params(axis='y', labelcolor=color_lr)

# Combined Legend from both axes
lines = line1 + line2
labels = [l.get_label() for l in lines]
ax1.legend(lines, labels, loc="upper right")

plt.title("Neural Net Loss vs Learning Rate Schedule", fontsize=12, fontweight='bold')
plt.tight_layout()
plt.close(fig)

print("✓ Successfully generated dual-axis plot with ax.twinx() and ax.step()!")
