import numpy as np
import matplotlib.pyplot as plt

# ---------------------------------
# Step 1: Select values of x
# ---------------------------------
x = np.array([-2, -1, 0, 1, 2])

# ---------------------------------
# Step 2: Calculate y
# Equation: y = 2x + 3
# ---------------------------------
y = 2 * x + 3

# ---------------------------------
# Step 3: Create the graph
# ---------------------------------
fig, ax = plt.subplots(figsize=(11, 6))

ax.plot(x, y, marker='o', linewidth=2, label='y = 2x + 3')

# Draw X and Y axes
ax.axhline(0, linewidth=1)
ax.axvline(0, linewidth=1)

# ---------------------------------
# Step 4: Label the points
# ---------------------------------
for xi, yi in zip(x, y):
    ax.annotate(
        f"({xi}, {yi})",
        (xi, yi),
        xytext=(8, 8),
        textcoords="offset points"
    )

# Labels
ax.set_xlabel("X-axis")
ax.set_ylabel("Y-axis")
ax.set_title("Plotting the Linear Equation: y = 2x + 3")

# Grid
ax.grid(True, alpha=0.3)

# ---------------------------------
# Explanation
# ---------------------------------
explanation = (
    "HOW TO PLOT y = 2x + 3\n\n"
    "1. Choose values for x.\n"
    "   x = -2, -1, 0, 1, 2\n\n"
    "2. Calculate y using:\n"
    "   y = 2x + 3\n\n"
    "3. The calculated points are:\n"
    "   (-2, -1)\n"
    "   (-1, 1)\n"
    "   (0, 3)\n"
    "   (1, 5)\n"
    "   (2, 7)\n\n"
    "4. Plot these points.\n"
    "5. Join the points with a straight line.\n\n"
    "Slope = 2\n"
    "Y-intercept = 3"
)

fig.text(
    0.72, 0.5,
    explanation,
    fontsize=11,
    verticalalignment='center',
    bbox=dict(boxstyle='round,pad=0.8', alpha=0.1)
)

# Leave space for explanation
plt.subplots_adjust(right=0.68)

plt.show()