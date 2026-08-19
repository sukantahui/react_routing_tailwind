import numpy as np
import matplotlib.pyplot as plt
import sympy as sp


# ============================================================
# GRAPHICAL REPRESENTATION OF LINEAR INEQUALITY
# ============================================================

# ------------------------------------------------------------
# Get inequality from user
# ------------------------------------------------------------

inequality = input(
    "Enter a linear inequality "
    "(example: y < 2*x + 1): "
).strip()


# ------------------------------------------------------------
# Identify the inequality symbol
# ------------------------------------------------------------

symbols = ["<=", ">=", "<", ">"]

operator = None

for symbol in symbols:
    if symbol in inequality:
        operator = symbol
        break

if operator is None:
    print("\nERROR: Invalid inequality.")
    print("Use one of: <, >, <=, >=")
    exit()


# ------------------------------------------------------------
# Separate left-hand side and right-hand side
# ------------------------------------------------------------

left_side, right_side = inequality.split(operator, 1)

left_side = left_side.strip()
right_side = right_side.strip()


# ------------------------------------------------------------
# Create SymPy symbols
# ------------------------------------------------------------

x, y = sp.symbols("x y")


# ------------------------------------------------------------
# Convert expression safely using SymPy
# ------------------------------------------------------------

try:

    left_expr = sp.sympify(left_side)

    right_expr = sp.sympify(
        right_side,
        locals={"x": x, "y": y}
    )

except Exception:

    print("\nERROR: Could not understand the expression.")
    print("Example:")
    print("y < 2*x + 1")
    exit()


# ------------------------------------------------------------
# We expect a y-based inequality:
#
# y < expression
# y <= expression
# y > expression
# y >= expression
# ------------------------------------------------------------

if left_expr != y:

    print("\nThis version expects the inequality in the form:")
    print("y < expression")
    print("y <= expression")
    print("y > expression")
    print("y >= expression")

    print("\nExample:")
    print("y <= 2*x + 3")

    exit()


# ============================================================
# GRAPH SETTINGS
# ============================================================

x_min = -10
x_max = 10

y_min = -22
y_max = 23

resolution = 600


# ------------------------------------------------------------
# Create X values
# ------------------------------------------------------------

x_values = np.linspace(
    x_min,
    x_max,
    resolution
)


# ------------------------------------------------------------
# Convert SymPy expression to NumPy function
# ------------------------------------------------------------

rhs_function = sp.lambdify(
    x,
    right_expr,
    modules="numpy"
)


# ------------------------------------------------------------
# Calculate boundary line
# ------------------------------------------------------------

boundary_y = rhs_function(x_values)


# ============================================================
# CREATE COMPLETE GRID
# ============================================================

X, Y = np.meshgrid(
    np.linspace(x_min, x_max, resolution),
    np.linspace(y_min, y_max, resolution)
)


# Calculate RHS for every X value
Z = rhs_function(X)


# ============================================================
# DETERMINE SOLUTION REGION
# ============================================================

if operator == "<":
    solution = Y < Z

elif operator == "<=":
    solution = Y <= Z

elif operator == ">":
    solution = Y > Z

elif operator == ">=":
    solution = Y >= Z


# ============================================================
# FIND A TEST POINT
# ============================================================

# We first try (0, 0)
test_x = 0
test_y = 0

boundary_at_test = float(rhs_function(test_x))


def test_result(tx, ty):

    boundary = float(rhs_function(tx))

    if operator == "<":
        return ty < boundary

    elif operator == "<=":
        return ty <= boundary

    elif operator == ">":
        return ty > boundary

    elif operator == ">=":
        return ty >= boundary


# If (0,0) lies exactly on the boundary,
# try another point.

if test_y == boundary_at_test:

    test_y = 1

    if test_y == boundary_at_test:
        test_y = -1


test_is_solution = test_result(
    test_x,
    test_y
)


# ============================================================
# CREATE GRAPH
# ============================================================

fig, ax = plt.subplots(
    figsize=(13, 8)
)


# ------------------------------------------------------------
# Plot boundary
# ------------------------------------------------------------

line_style = (
    "-"
    if operator in ["<=", ">="]
    else "--"
)


boundary_label = (
    f"Boundary: y = {sp.sstr(right_expr)}"
)


ax.plot(
    x_values,
    boundary_y,
    linestyle=line_style,
    linewidth=2.5,
    label=boundary_label
)


# ============================================================
# SHADE SOLUTION REGION
# ============================================================

ax.contourf(
    X,
    Y,
    solution.astype(float),
    levels=[0.5, 1.5],
    alpha=0.25
)


# ============================================================
# DRAW AXES
# ============================================================

ax.axhline(
    0,
    linewidth=1
)

ax.axvline(
    0,
    linewidth=1
)


# ============================================================
# MARK TEST POINT
# ============================================================

ax.scatter(
    test_x,
    test_y,
    s=80,
    zorder=5,
    label=f"Test point ({test_x}, {test_y})"
)


# Label test point

ax.annotate(
    f"({test_x}, {test_y})",
    (test_x, test_y),
    xytext=(10, 10),
    textcoords="offset points",
    fontsize=10
)


# ============================================================
# GRAPH SETTINGS
# ============================================================

ax.set_xlim(
    x_min,
    x_max
)

ax.set_ylim(
    y_min,
    y_max
)

ax.set_xlabel(
    "X-axis",
    fontsize=11
)

ax.set_ylabel(
    "Y-axis",
    fontsize=11
)


ax.set_title(
    f"Graphical Representation: "
    f"{sp.sstr(left_expr)} {operator} {sp.sstr(right_expr)}",
    fontsize=14
)


ax.grid(
    True,
    alpha=0.3
)


ax.legend(
    loc="upper left"
)


# ============================================================
# EXPLANATION
# ============================================================

if operator in ["<", "<="]:

    solution_direction = "BELOW the boundary line"

else:

    solution_direction = "ABOVE the boundary line"


if operator in ["<", ">"]:

    boundary_description = (
        "Dashed line\n"
        "because the boundary is NOT included."
    )

else:

    boundary_description = (
        "Solid line\n"
        "because the boundary IS included."
    )


# Test point calculation

rhs_at_test = sp.simplify(
    right_expr.subs(x, test_x)
)


if operator == "<":
    test_statement = f"{test_y} < {rhs_at_test}"

elif operator == "<=":
    test_statement = f"{test_y} <= {rhs_at_test}"

elif operator == ">":
    test_statement = f"{test_y} > {rhs_at_test}"

else:
    test_statement = f"{test_y} >= {rhs_at_test}"


if test_is_solution:

    test_conclusion = (
        "TRUE ✓\n"
        "Therefore this side is the\n"
        "solution region."
    )

else:

    test_conclusion = (
        "FALSE ✗\n"
        "Therefore the opposite side\n"
        "contains the solution."
    )


explanation = (
    "SOLUTION EXPLANATION\n"
    "────────────────────────\n\n"

    f"Inequality:\n"
    f"y {operator} "
    f"{sp.sstr(right_expr)}\n\n"

    "Boundary equation:\n"
    f"y = {sp.sstr(right_expr)}\n\n"

    f"Boundary:\n"
    f"{boundary_description}\n\n"

    f"Solution region:\n"
    f"{solution_direction}\n\n"

    "TEST POINT\n"
    "────────────────────────\n"

    f"Point: ({test_x}, {test_y})\n\n"

    f"Substitute:\n"
    f"{test_statement}\n\n"

    f"{test_conclusion}"
)


# ============================================================
# DISPLAY EXPLANATION
# ============================================================

fig.text(
    0.72,
    0.50,
    explanation,
    fontsize=10.5,
    verticalalignment="center",
    bbox=dict(
        boxstyle="round,pad=0.8",
        alpha=0.1
    )
)


# Make room for explanation

plt.subplots_adjust(
    right=0.68
)


# ============================================================
# SHOW GRAPH
# ============================================================

plt.show()