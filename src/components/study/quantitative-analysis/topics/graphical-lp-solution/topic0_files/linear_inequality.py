import numpy as np
import matplotlib.pyplot as plt

# -----------------------------------------
# Linear Inequality
# y <= 2x + 3
# -----------------------------------------

# Create x values
x = np.linspace(-5, 5, 400)

# Boundary line
y = 2 * x + 3

# Create coordinate grid
X, Y = np.meshgrid(
    np.linspace(-5, 5, 400),
    np.linspace(-8, 8, 400)
)

# Check the inequality
Z = Y <= 2 * X + 3

# -----------------------------------------
# Create graph
# -----------------------------------------

fig, ax = plt.subplots(figsize=(11, 7))

# Plot the boundary line
ax.plot(
    x,
    y,
    linewidth=2.5,
    label="Boundary: y = 2x + 3"
)

# Shade the solution region
ax.contourf(
    X,
    Y,
    Z,
    levels=[0.5, 1],
    alpha=0.25
)

# X-axis and Y-axis
ax.axhline(0, linewidth=1)
ax.axvline(0, linewidth=1)

# -----------------------------------------
# Explanation
# -----------------------------------------

explanation = (
    "GRAPHICAL REPRESENTATION\n"
    "OF LINEAR INEQUALITY\n\n"

    "Inequality:\n"
    "y ≤ 2x + 3\n\n"

    "Step 1:\n"
    "Draw the boundary line\n"
    "y = 2x + 3\n\n"

    "Step 2:\n"
    "Because the symbol is ≤,\n"
    "the boundary is a SOLID line.\n\n"

    "Step 3:\n"
    "Test a point to determine\n"
    "which side to shade.\n\n"

    "Test point: (0, 0)\n"
    "0 ≤ 2(0) + 3\n"
    "0 ≤ 3  ✓\n\n"

    "Therefore, the region\n"
    "containing (0, 0) is shaded.\n\n"

    "Shaded region = SOLUTION\n"
    "of the inequality."
)

fig.text(
    0.70,
    0.5,
    explanation,
    fontsize=10.5,
    verticalalignment="center",
    bbox=dict(
        boxstyle="round,pad=0.8",
        alpha=0.1
    )
)

# -----------------------------------------
# Labels and formatting
# -----------------------------------------

ax.set_xlabel("X-axis")
ax.set_ylabel("Y-axis")

ax.set_title(
    "Graphical Representation of Linear Inequality: y ≤ 2x + 3"
)

ax.set_xlim(-5, 5)
ax.set_ylim(-8, 8)

ax.grid(True, alpha=0.3)

ax.legend()

plt.subplots_adjust(right=0.67)

plt.show()