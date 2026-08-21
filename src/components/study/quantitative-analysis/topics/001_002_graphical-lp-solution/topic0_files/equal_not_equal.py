import numpy as np
import matplotlib.pyplot as plt
import sympy as sp


# ============================================================
# GRAPHICAL REPRESENTATION OF LINEAR EQUATIONS & INEQUALITIES
# ============================================================


# ------------------------------------------------------------
# 1. GET INPUT FROM USER
# ------------------------------------------------------------

user_input = input(
    "\nEnter equation or inequality\n"
    "Example: y = 2*x + 1\n"
    "Example: y < 2*x + 1\n"
    "Example: y <= 2*x + 1\n\n"
    "Enter here: "
).strip()


# ------------------------------------------------------------
# 2. CREATE SYMBOLS
# ------------------------------------------------------------

x, y = sp.symbols("x y")


# ------------------------------------------------------------
# 3. DETERMINE WHETHER IT IS EQUATION OR INEQUALITY
# ------------------------------------------------------------

if "<=" in user_input:
    operator = "<="
    problem_type = "inequality"

elif ">=" in user_input:
    operator = ">="
    problem_type = "inequality"

elif "<" in user_input:
    operator = "<"
    problem_type = "inequality"

elif ">" in user_input:
    operator = ">"
    problem_type = "inequality"

elif "=" in user_input:
    operator = "="
    problem_type = "equation"

else:
    print("\nERROR: Invalid input.")
    print("Please use =, <, >, <= or >=.")
    exit()


# ------------------------------------------------------------
# 4. SPLIT LEFT AND RIGHT SIDES
# ------------------------------------------------------------

left_side, right_side = user_input.split(
    operator,
    1
)

left_side = left_side.strip()
right_side = right_side.strip()


# ------------------------------------------------------------
# 5. CONVERT TO SYMPY EXPRESSIONS
# ------------------------------------------------------------

try:

    left_expr = sp.sympify(
        left_side,
        locals={"x": x, "y": y}
    )

    right_expr = sp.sympify(
        right_side,
        locals={"x": x, "y": y}
    )

except Exception:

    print("\nERROR: Could not understand the expression.")

    print("\nExamples of valid input:")
    print("y = 2*x + 1")
    print("y < 2*x + 1")
    print("y <= 2*x + 1")
    print("y > 2*x + 1")
    print("y >= 2*x + 1")

    exit()


# ------------------------------------------------------------
# 6. CURRENT VERSION EXPECTS y ON LEFT SIDE
# ------------------------------------------------------------

if left_expr != y:

    print("\nCurrently, the program expects 'y' on the left.")

    print("\nExamples:")
    print("y = 2*x + 1")
    print("y <= 2*x + 3")
    print("y > -x + 5")

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
# 7. CREATE X VALUES
# ------------------------------------------------------------

x_values = np.linspace(
    x_min,
    x_max,
    resolution
)


# ------------------------------------------------------------
# 8. CONVERT RIGHT SIDE INTO NUMPY FUNCTION
# ------------------------------------------------------------

rhs_function = sp.lambdify(
    x,
    right_expr,
    modules="numpy"
)


# ------------------------------------------------------------
# 9. CALCULATE BOUNDARY LINE
# ------------------------------------------------------------

boundary_y = rhs_function(x_values)


# ============================================================
# CREATE GRAPH GRID
# ============================================================

X, Y = np.meshgrid(
    np.linspace(
        x_min,
        x_max,
        resolution
    ),

    np.linspace(
        y_min,
        y_max,
        resolution
    )
)


# Calculate boundary for every X value

Z = rhs_function(X)


# ============================================================
# CREATE FIGURE
# ============================================================

fig, ax = plt.subplots(
    figsize=(13, 8)
)


# ============================================================
# EQUATION
# ============================================================

if problem_type == "equation":

    # --------------------------------------------------------
    # Draw solid line
    # --------------------------------------------------------

    ax.plot(
        x_values,
        boundary_y,
        linestyle="-",
        linewidth=2.5,
        label=f"Line: y = {sp.sstr(right_expr)}"
    )


# ============================================================
# INEQUALITY
# ============================================================

else:

    # --------------------------------------------------------
    # Determine line style
    # --------------------------------------------------------

    if operator in ["<=", ">="]:

        line_style = "-"

        boundary_description = (
            "Solid line\n"
            "because the boundary IS included."
        )

    else:

        line_style = "--"

        boundary_description = (
            "Dashed line\n"
            "because the boundary is NOT included."
        )


    # --------------------------------------------------------
    # Draw boundary line
    # --------------------------------------------------------

    ax.plot(
        x_values,
        boundary_y,
        linestyle=line_style,
        linewidth=2.5,
        label=(
            f"Boundary: "
            f"y = {sp.sstr(right_expr)}"
        )
    )


    # ========================================================
    # DETERMINE SOLUTION REGION
    # ========================================================

    if operator == "<":

        solution = Y < Z

        solution_direction = (
            "BELOW the boundary line"
        )

    elif operator == "<=":

        solution = Y <= Z

        solution_direction = (
            "BELOW the boundary line"
        )

    elif operator == ">":

        solution = Y > Z

        solution_direction = (
            "ABOVE the boundary line"
        )

    elif operator == ">=":

        solution = Y >= Z

        solution_direction = (
            "ABOVE the boundary line"
        )


    # --------------------------------------------------------
    # Shade solution region
    # --------------------------------------------------------

    ax.contourf(
        X,
        Y,
        solution.astype(float),
        levels=[0.5, 1.5],
        alpha=0.25
    )


    # ========================================================
    # FIND A TEST POINT
    # ========================================================

    # Try several points until we find one
    # that is NOT on the boundary.

    possible_points = [
        (0, 0),
        (0, 1),
        (0, -1),
        (1, 0),
        (-1, 0),
        (1, 1),
        (-1, -1)
    ]


    test_x = None
    test_y = None


    for px, py in possible_points:

        boundary_value = float(
            rhs_function(px)
        )

        if not np.isclose(
            py,
            boundary_value
        ):

            test_x = px
            test_y = py

            break


    # --------------------------------------------------------
    # Test the selected point
    # --------------------------------------------------------

    boundary_at_test = float(
        rhs_function(test_x)
    )


    if operator == "<":

        test_is_solution = (
            test_y < boundary_at_test
        )

    elif operator == "<=":

        test_is_solution = (
            test_y <= boundary_at_test
        )

    elif operator == ">":

        test_is_solution = (
            test_y > boundary_at_test
        )

    else:

        test_is_solution = (
            test_y >= boundary_at_test
        )


    # ========================================================
    # MARK TEST POINT
    # ========================================================

    ax.scatter(
        test_x,
        test_y,
        s=80,
        zorder=5,
        label=(
            f"Test point "
            f"({test_x}, {test_y})"
        )
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
# DRAW X AND Y AXES
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
# GRAPH LABELS
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


# ============================================================
# TITLE
# ============================================================

if problem_type == "equation":

    title = (
        f"Graphical Representation: "
        f"y = {sp.sstr(right_expr)}"
    )

else:

    title = (
        f"Graphical Representation: "
        f"y {operator} "
        f"{sp.sstr(right_expr)}"
    )


ax.set_title(
    title,
    fontsize=14
)


# ============================================================
# GRID
# ============================================================

ax.grid(
    True,
    alpha=0.3
)


# ============================================================
# LEGEND
# ============================================================

ax.legend(
    loc="upper left"
)


# ============================================================
# CREATE EXPLANATION
# ============================================================

if problem_type == "equation":

    # ========================================================
    # EQUATION EXPLANATION
    # ========================================================

    explanation = (
        "EQUATION EXPLANATION\n"
        "────────────────────────\n\n"

        "Equation:\n"
        f"y = {sp.sstr(right_expr)}\n\n"

        "This is a linear equation.\n\n"

        "Graph:\n"
        "Solid straight line\n\n"

        "Solution:\n"
        "All points lying ON the line.\n\n"

        "The graph represents exactly\n"
        "one straight line.\n\n"

        "There is no shaded region\n"
        "because this is an equation."
    )


# ============================================================
# INEQUALITY EXPLANATION
# ============================================================

else:

    # --------------------------------------------------------
    # Calculate value at test point
    # --------------------------------------------------------

    rhs_at_test = sp.simplify(
        right_expr.subs(
            x,
            test_x
        )
    )


    # --------------------------------------------------------
    # Create test statement
    # --------------------------------------------------------

    if operator == "<":

        test_statement = (
            f"{test_y} < {rhs_at_test}"
        )

    elif operator == "<=":

        test_statement = (
            f"{test_y} <= {rhs_at_test}"
        )

    elif operator == ">":

        test_statement = (
            f"{test_y} > {rhs_at_test}"
        )

    else:

        test_statement = (
            f"{test_y} >= {rhs_at_test}"
        )


    # --------------------------------------------------------
    # Test result
    # --------------------------------------------------------

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


    # --------------------------------------------------------
    # Complete explanation
    # --------------------------------------------------------

    explanation = (
        "SOLUTION EXPLANATION\n"
        "────────────────────────\n\n"

        "Inequality:\n"
        f"y {operator} "
        f"{sp.sstr(right_expr)}\n\n"

        "Boundary equation:\n"
        f"y = {sp.sstr(right_expr)}\n\n"

        "Boundary:\n"
        f"{boundary_description}\n\n"

        "Solution region:\n"
        f"{solution_direction}\n\n"

        "TEST POINT\n"
        "────────────────────────\n"

        f"Point: "
        f"({test_x}, {test_y})\n\n"

        "Substitute:\n"
        f"{test_statement}\n\n"

        f"{test_conclusion}"
    )


# ============================================================
# DISPLAY EXPLANATION PANEL
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


# ============================================================
# MAKE ROOM FOR EXPLANATION
# ============================================================

plt.subplots_adjust(
    right=0.68
)
# ============================================================
# ORGANISATION FOOTER
# ============================================================

organisation_name = "Coder & AccoTax"
organisation_tagline = "Developing Human Resource Since 1997"
organisation_contact = "Ph: 7003756860  |  codernaccotax.co.in"

fig.text(
    0.5,
    0.045,
    organisation_name,
    ha="center",
    va="center",
    fontsize=11,
    fontweight="bold"
)

fig.text(
    0.5,
    0.022,
    f"{organisation_tagline}  |  {organisation_contact}",
    ha="center",
    va="center",
    fontsize=8.5
)

plt.subplots_adjust(
    right=0.68,
    bottom=0.12
)

# ============================================================
# SHOW GRAPH
# ============================================================

plt.show()