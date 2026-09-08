"""
=============================================================================
TOPIC 15: Practice Problems
Script 03: Problem 3 - Multi-Panel Machine Learning Telemetry Dashboard
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================

PROBLEM STATEMENT:
Build an end-to-end 3-panel production telemetry dashboard using GridSpec:
  - Top Hero (gs[0, :]): Training Loss Decay Curve
  - Bottom-Left (gs[1, 0]): 5-Fold Cross Validation F1-Score Bar Chart with Error Bars
  - Bottom-Right (gs[1, 1]): Confusion Matrix Heatmap with `ax.imshow()` & text annotations.
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("PRACTICE PROBLEM 3: MULTI-PANEL GRIDSPEC TELEMETRY DASHBOARD")

fig = plt.figure(figsize=(11, 7))
gs = fig.add_gridspec(2, 2, height_ratios=[1.3, 1], hspace=0.35, wspace=0.25)

# 1. Top Hero Panel: Loss Decay Curve
ax1 = fig.add_subplot(gs[0, :])
epochs = np.arange(1, 26)
train_loss = 1.5 / epochs**0.6 + 0.02 * np.random.normal(0, 0.05, 25)
ax1.plot(epochs, train_loss, color='#38bdf8', lw=2.5, marker='o', label='Training Loss')
ax1.set_title("1. Training Convergence Telemetry", fontweight='bold')
ax1.set_xlabel("Epoch")
ax1.set_ylabel("Loss")
ax1.legend()
ax1.grid(True, alpha=0.3)

# 2. Bottom-Left Panel: 5-Fold CV F1-Scores with Error Bars
ax2 = fig.add_subplot(gs[1, 0])
models = ['XGBoost', 'LightGBM', 'CatBoost', 'RandomForest']
mean_f1 = [0.94, 0.93, 0.95, 0.89]
std_f1  = [0.02, 0.025, 0.018, 0.035]
bars = ax2.bar(models, mean_f1, yerr=std_f1, capsize=4, color=['#10b981', '#06b6d4', '#6366f1', '#f59e0b'], width=0.55)
ax2.set_title("2. 5-Fold CV F1-Scores (with Std Dev)", fontweight='bold')
ax2.set_ylim(0.7, 1.05)
ax2.bar_label(bars, fmt='%.2f', padding=5, fontsize=8)
ax2.grid(axis='y', linestyle=':', alpha=0.4)

# 3. Bottom-Right Panel: Confusion Matrix Heatmap
ax3 = fig.add_subplot(gs[1, 1])
cm = np.array([[890, 40], [35, 935]])
im = ax3.imshow(cm, cmap='Blues', alpha=0.8)
ax3.set_title("3. Test Confusion Matrix", fontweight='bold')
ax3.set_xticks([0, 1])
ax3.set_yticks([0, 1])
ax3.set_xticklabels(['Pred Negative', 'Pred Positive'])
ax3.set_yticklabels(['True Negative', 'True Positive'])

# Add text values inside heatmap cells
for i in range(2):
    for j in range(2):
        ax3.text(j, i, f"{cm[i, j]:,}", ha='center', va='center', color='black' if cm[i, j] < 500 else 'white', fontweight='bold')

fig.suptitle("Production Machine Learning Model Verification Dashboard", fontsize=13, fontweight='bold')
plt.close(fig)

print("✓ Problem 3 Solved! Multi-panel production telemetry dashboard compiled.")
