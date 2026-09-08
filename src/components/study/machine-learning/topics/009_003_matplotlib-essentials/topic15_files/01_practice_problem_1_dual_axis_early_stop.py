"""
=============================================================================
TOPIC 15: Practice Problems
Script 01: Problem 1 - Dual-Axis Learning Curve with Early Stopping Marker
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================

PROBLEM STATEMENT:
Given 50 epochs of training data:
  1. Plot 'Train Loss' and 'Val Loss' on the primary Y-axis.
  2. Plot 'Validation Accuracy' on the secondary Y-axis (ax.twinx()).
  3. Identify the epoch with minimum validation loss (Early Stopping point).
  4. Draw a vertical dashed line and annotate the Early Stopping checkpoint.
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("PRACTICE PROBLEM 1: DUAL-AXIS EARLY STOPPING PLOT")

np.random.seed(42)
epochs = np.arange(1, 41)

# Synthetic loss curves (Val loss bottoms out around epoch 22, then begins overfitting)
train_loss = 1.8 * np.exp(-0.08 * epochs) + 0.05 * np.random.normal(0, 0.02, 40)
val_loss   = 1.9 * np.exp(-0.07 * epochs) + 0.0008 * (epochs - 22)**2 + 0.05

val_acc = 1.0 / (1.0 + np.exp(-0.15 * (epochs - 12)))

best_epoch_idx = np.argmin(val_loss)
best_epoch = epochs[best_epoch_idx]
best_loss = val_loss[best_epoch_idx]

fig, ax1 = plt.subplots(figsize=(9, 5))

# Primary Y-Axis: Loss
color_loss = '#ef4444'
ax1.set_xlabel("Epochs", fontweight='bold')
ax1.set_ylabel("Cross-Entropy Loss", color=color_loss, fontweight='bold')
l1 = ax1.plot(epochs, train_loss, 'r--', label='Train Loss', lw=2)
l2 = ax1.plot(epochs, val_loss, color=color_loss, label='Val Loss', lw=2.5)
ax1.tick_params(axis='y', labelcolor=color_loss)
ax1.grid(True, linestyle=":", alpha=0.4)

# Early Stopping Marker
ax1.axvline(best_epoch, color='#f59e0b', linestyle='--', lw=2, label=f'Early Stopping (Epoch {best_epoch})')
ax1.scatter([best_epoch], [best_loss], color='#f59e0b', s=80, zorder=5)
ax1.annotate(
    f"Optimal Checkpoint\nLoss: {best_loss:.3f}",
    xy=(best_epoch, best_loss),
    xytext=(best_epoch + 3, best_loss + 0.25),
    arrowprops=dict(facecolor='#f59e0b', shrink=0.05, width=1.5, headwidth=6),
    fontweight='bold',
    fontsize=9
)

# Secondary Y-Axis: Accuracy
ax2 = ax1.twinx()
color_acc = '#0284c7'
ax2.set_ylabel("Validation Accuracy", color=color_acc, fontweight='bold')
l3 = ax2.plot(epochs, val_acc, color=color_acc, lw=2.5, label='Val Accuracy')
ax2.tick_params(axis='y', labelcolor=color_acc)
ax2.set_ylim(0.4, 1.05)

# Unified Legend
lines = l1 + l2 + l3
labels = [l.get_label() for l in lines]
ax1.legend(lines, labels, loc='center right', framealpha=0.9)

plt.title("Neural Network Convergence with Early Stopping Detection", fontsize=12, fontweight='bold')
plt.tight_layout()
plt.close(fig)

print(f"✓ Problem 1 Solved! Early Stopping detected at Epoch {best_epoch} with loss {best_loss:.3f}.")
