"""
=============================================================================
TOPIC 4: Bar Chart with plt.bar()
Script 02: Grouped (Clustered) & Stacked Bar Charts
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Grouped Bar Chart with Numeric Offsets")

models = ['Model A (Base)', 'Model B (+Tuning)', 'Model C (+Ensemble)']
train_acc = [0.82, 0.91, 0.97]
test_acc  = [0.78, 0.88, 0.93]

x = np.arange(len(models)) # [0, 1, 2]
width = 0.35              # Width of each bar

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# Grouped Layout: Shift x positions by +/- width/2
rects1 = ax1.bar(x - width/2, train_acc, width, label='Train Accuracy', color='#0284c7')
rects2 = ax1.bar(x + width/2, test_acc,  width, label='Test Accuracy',  color='#10b981')

ax1.set_title("Grouped Bars: Train vs Test Generalization", fontweight='bold')
ax1.set_xticks(x)
ax1.set_xticklabels(models)
ax1.set_ylim(0, 1.15)
ax1.legend()
ax1.grid(axis='y', linestyle=':', alpha=0.5)
ax1.bar_label(rects1, fmt='%.2f', padding=2)
ax1.bar_label(rects2, fmt='%.2f', padding=2)

# Stacked Layout: Using the 'bottom' argument
# Confusion Matrix breakdown simulation: True Positives + False Positives
tp = np.array([45, 60, 52])
fp = np.array([12, 8, 4])

ax2.bar(models, tp, width=0.5, label='True Positives', color='#6366f1')
ax2.bar(models, fp, width=0.5, bottom=tp, label='False Positives', color='#f43f5e')

ax2.set_title("Stacked Bars: Positive Predictions Breakdown", fontweight='bold')
ax2.set_ylabel("Instance Count")
ax2.legend()
ax2.grid(axis='y', linestyle=':', alpha=0.5)

plt.tight_layout()
plt.close(fig)

print("✓ Grouped and Stacked Bar charts created successfully!")
