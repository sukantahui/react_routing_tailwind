
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
import re
import numpy as np
import matplotlib

matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.patches import Polygon


# ============================================================
# CODER & ACCOTAX
# Dynamic Graphical Linear Inequality / Feasible Region Tool
# ============================================================

BG = "#070d21"
CARD = "#0b1429"
GRAPH = "#0a1427"
BORDER = "#263754"
TEXT = "#f3f4f6"
MUTED = "#a8b3c7"
GRID = "#1e2b43"
TEAL = "#14b8a6"
PURPLE = "#8b5cf6"
ORANGE = "#f59e0b"
GREEN = "#22c55e"
BLUE = "#38bdf8"
RED = "#ef4444"

ORG = "Coder & AccoTax"
PHONE = "7003756860"
WEBSITE = "codernaccotax.co.in"

COLORS = [PURPLE, ORANGE, TEAL, GREEN, BLUE, "#ec4899", "#f97316", "#84cc16"]


# ------------------------------------------------------------
# Built-in data examples
# The same structure can also be supplied through JSON.
# ------------------------------------------------------------

EXAMPLES = {
    "Product Mix": {
        "description": "A factory produces two products subject to machine and labor limits.",
        "constraints": [
            "x + y <= 4",
            "x + 2y <= 6",
            "x >= 0",
            "y >= 0",
        ],
    },
    "Five Constraint Example": {
        "description": "Explore how five simultaneous constraints form a common feasible region.",
        "constraints": [
            "2x + 3y <= 12",
            "x + 2y <= 8",
            "x >= 0",
            "y >= 0",
            "x + y >= 4",
        ],
    },
    "Resource Allocation": {
        "description": "Two activities share limited resources.",
        "constraints": [
            "2x + y <= 8",
            "x + 2y <= 8",
            "x >= 0",
            "y >= 0",
        ],
    },
}


# ============================================================
# Equation parser
# Supports:
#   2x + 3y <= 12
#   x + y >= 4
#   x <= 5
#   y >= 2
#   -2x + y <= 10
#   3x - 2y = 12
# ============================================================

def clean_expression(s):
    s = s.lower().replace(" ", "")
    s = s.replace("≤", "<=").replace("≥", ">=").replace("−", "-")
    s = s.replace("==", "=")
    return s


def parse_linear_side(expr):
    """
    Convert a linear expression into:
        a*x + b*y + constant = 0

    Returns (a, b, constant).
    """
    expr = clean_expression(expr)

    if not expr:
        raise ValueError("Empty expression.")

    # Normalize subtraction into explicit signed terms.
    if expr[0] not in "+-":
        expr = "+" + expr

    terms = re.findall(r"[+-][^+-]+", expr)

    a = 0.0
    b = 0.0
    constant = 0.0

    for term in terms:
        sign = 1.0 if term[0] == "+" else -1.0
        body = term[1:]

        if not body:
            continue

        # x term
        if "x" in body:
            coefficient = body.replace("x", "")
            if coefficient in ("",):
                coefficient = 1.0
            elif coefficient == "*":
                coefficient = 1.0
            elif coefficient == "-":
                coefficient = -1.0
            else:
                coefficient = float(coefficient.replace("*", ""))
            a += sign * coefficient

        # y term
        elif "y" in body:
            coefficient = body.replace("y", "")
            if coefficient in ("",):
                coefficient = 1.0
            elif coefficient == "*":
                coefficient = 1.0
            elif coefficient == "-":
                coefficient = -1.0
            else:
                coefficient = float(coefficient.replace("*", ""))
            b += sign * coefficient

        # constant
        else:
            constant += sign * float(body)

    return a, b, constant


def parse_constraint(equation):
    s = clean_expression(equation)

    match = re.search(r"(<=|>=|=|<|>)", s)

    if not match:
        raise ValueError(
            f"No inequality/equality operator found in: {equation}"
        )

    op = match.group(1)
    left = s[:match.start()]
    right = s[match.end():]

    if not left or not right:
        raise ValueError(f"Incomplete constraint: {equation}")

    # Move everything to left:
    # left - right = 0
    a1, b1, c1 = parse_linear_side(left)
    a2, b2, c2 = parse_linear_side(right)

    a = a1 - a2
    b = b1 - b2
    c = c2 - c1

    # Convert strict inequalities to their non-strict equivalent
    # for plotting boundaries; boundary styling remains dashed.
    if op == "<":
        sense = "<="
        strict = True
    elif op == ">":
        sense = ">="
        strict = True
    else:
        sense = op
        strict = False

    if abs(a) < 1e-12 and abs(b) < 1e-12:
        raise ValueError(f"Not a valid x/y constraint: {equation}")

    return {
        "a": a,
        "b": b,
        "sense": sense,
        "c": c,
        "strict": strict,
        "original": equation.strip(),
    }


def format_number(v):
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.3f}".rstrip("0").rstrip(".")


def format_equation(c):
    a, b, sense, rhs = c["a"], c["b"], c["sense"], c["c"]

    def term(coef, variable, first=False):
        if abs(coef) < 1e-12:
            return ""

        n = abs(coef)
        ntext = "" if abs(n - 1) < 1e-12 else format_number(n)

        if first:
            sign = "-" if coef < 0 else ""
        else:
            sign = " - " if coef < 0 else " + "

        return f"{sign}{ntext}{variable}"

    result = ""
    first = True

    if abs(a) > 1e-12:
        result += term(a, "x", True)
        first = False

    if abs(b) > 1e-12:
        result += term(b, "y", first)
        first = False

    if not result:
        result = "0"

    return f"{result} {sense} {format_number(rhs)}"


# ============================================================
# Main Application
# ============================================================

class DynamicFeasibleRegionApp(tk.Tk):

    def __init__(self):
        super().__init__()

        self.title(
            "Coder & AccoTax - Dynamic Feasible Region Explorer"
        )
        self.geometry("1400x900")
        self.minsize(1150, 720)
        self.configure(bg=BG)

        self.rows = []
        self.show_region = True
        self.show_points = True
        self.show_individual_shading = False
        self.selected_constraint = -1

        self.build_styles()
        self.build_ui()

        self.load_example("Five Constraint Example")

    # ========================================================
    # Styles
    # ========================================================

    def build_styles(self):

        style = ttk.Style(self)

        try:
            style.theme_use("clam")
        except tk.TclError:
            pass

        style.configure(
            "App.TButton",
            font=("Segoe UI", 10),
            padding=(11, 6),
            foreground="#e2e8f0",
            background="#18253e",
            borderwidth=0
        )

        style.map(
            "App.TButton",
            background=[("active", "#334155")]
        )

        style.configure(
            "Primary.TButton",
            font=("Segoe UI", 10, "bold"),
            padding=(12, 7),
            foreground="white",
            background=TEAL,
            borderwidth=0
        )

        style.map(
            "Primary.TButton",
            background=[("active", "#0f9f92")]
        )

    # ========================================================
    # UI
    # ========================================================

    def build_ui(self):

        # Header
        header = tk.Frame(
            self,
            bg=BG,
            padx=28,
            pady=18
        )
        header.pack(fill="x")

        tk.Label(
            header,
            text="▣",
            font=("Segoe UI", 23, "bold"),
            fg="#e2e8f0",
            bg=BG
        ).pack(side="left", padx=(0, 15))

        title_box = tk.Frame(header, bg=BG)
        title_box.pack(side="left", fill="x", expand=True)

        tk.Label(
            title_box,
            text="Explore the Common Feasible Region",
            font=("Segoe UI", 23, "bold"),
            fg=TEXT,
            bg=BG
        ).pack(anchor="w")

        tk.Label(
            title_box,
            text=(
                "Enter your own linear inequalities. The graph, feasible region, "
                "corner points and explanation are calculated automatically."
            ),
            font=("Segoe UI", 10),
            fg="#cbd5e1",
            bg=BG
        ).pack(anchor="w", pady=(6, 0))

        # Data / constraint editor
        editor = tk.Frame(
            self,
            bg=CARD,
            highlightbackground=BORDER,
            highlightthickness=1
        )
        editor.pack(
            fill="x",
            padx=28,
            pady=(0, 12)
        )

        top = tk.Frame(editor, bg=CARD, padx=15, pady=10)
        top.pack(fill="x")

        tk.Label(
            top,
            text="PROBLEM DATA",
            font=("Segoe UI", 10, "bold"),
            fg="#5eead4",
            bg=CARD
        ).pack(side="left")

        tk.Label(
            top,
            text="  Example:",
            font=("Segoe UI", 9),
            fg=MUTED,
            bg=CARD
        ).pack(side="left")

        self.example_var = tk.StringVar(
            value="Five Constraint Example"
        )

        self.example_combo = ttk.Combobox(
            top,
            textvariable=self.example_var,
            values=list(EXAMPLES.keys()),
            state="readonly",
            width=25
        )
        self.example_combo.pack(side="left", padx=8)

        ttk.Button(
            top,
            text="Load Example",
            style="App.TButton",
            command=lambda: self.load_example(
                self.example_var.get()
            )
        ).pack(side="left", padx=4)

        ttk.Button(
            top,
            text="Load JSON",
            style="App.TButton",
            command=self.load_json
        ).pack(side="left", padx=4)

        ttk.Button(
            top,
            text="Save JSON",
            style="App.TButton",
            command=self.save_json
        ).pack(side="left", padx=4)

        # Problem name and description
        meta = tk.Frame(editor, bg=CARD, padx=15)
        meta.pack(fill="x", pady=(0, 7))

        tk.Label(
            meta,
            text="Problem:",
            fg=MUTED,
            bg=CARD,
            font=("Segoe UI", 9, "bold")
        ).pack(side="left")

        self.problem_name = tk.Entry(
            meta,
            bg="#101c34",
            fg=TEXT,
            insertbackground="white",
            relief="flat",
            width=28
        )
        self.problem_name.pack(side="left", padx=(7, 20))

        tk.Label(
            meta,
            text="Description:",
            fg=MUTED,
            bg=CARD,
            font=("Segoe UI", 9, "bold")
        ).pack(side="left")

        self.description = tk.Entry(
            meta,
            bg="#101c34",
            fg=TEXT,
            insertbackground="white",
            relief="flat"
        )
        self.description.pack(
            side="left",
            padx=7,
            fill="x",
            expand=True
        )

        # Constraint list
        list_frame = tk.Frame(editor, bg=CARD, padx=15)
        list_frame.pack(fill="x")

        tk.Label(
            list_frame,
            text="Constraints",
            fg=TEXT,
            bg=CARD,
            font=("Segoe UI", 9, "bold")
        ).pack(anchor="w", pady=(2, 4))

        self.constraint_container = tk.Frame(
            list_frame,
            bg=CARD
        )
        self.constraint_container.pack(
            fill="x"
        )

        # Buttons
        buttons = tk.Frame(
            editor,
            bg=CARD,
            padx=15,
            pady=10
        )
        buttons.pack(fill="x")

        ttk.Button(
            buttons,
            text="+ Add Constraint",
            style="App.TButton",
            command=self.add_constraint
        ).pack(side="left", padx=(0, 6))

        ttk.Button(
            buttons,
            text="Clear All",
            style="App.TButton",
            command=self.clear_constraints
        ).pack(side="left", padx=6)

        ttk.Button(
            buttons,
            text="▶ Generate Graph",
            style="Primary.TButton",
            command=self.generate
        ).pack(side="left", padx=6)

        self.region_btn = ttk.Button(
            buttons,
            text="Hide Feasible Region",
            style="App.TButton",
            command=self.toggle_region
        )
        self.region_btn.pack(side="left", padx=6)

        self.points_btn = ttk.Button(
            buttons,
            text="Hide Corner Points",
            style="App.TButton",
            command=self.toggle_points
        )
        self.points_btn.pack(side="left", padx=6)

        self.shading_btn = ttk.Button(
            buttons,
            text="Show Individual Shading",
            style="App.TButton",
            command=self.toggle_individual_shading
        )
        self.shading_btn.pack(side="left", padx=6)

        # Main area
        main = tk.Frame(
            self,
            bg=BG,
            padx=28
        )
        main.pack(fill="both", expand=True)

        # Graph
        graph_card = tk.Frame(
            main,
            bg=GRAPH,
            highlightbackground=BORDER,
            highlightthickness=1
        )
        graph_card.pack(
            side="left",
            fill="both",
            expand=True,
            padx=(0, 12)
        )

        self.figure = Figure(
            figsize=(8, 6),
            dpi=100,
            facecolor=GRAPH
        )

        self.ax = self.figure.add_subplot(111)

        self.canvas = FigureCanvasTkAgg(
            self.figure,
            master=graph_card
        )

        self.canvas.get_tk_widget().pack(
            fill="both",
            expand=True,
            padx=8,
            pady=8
        )

        self.canvas.mpl_connect(
            "button_press_event",
            self.on_graph_click
        )

        # Explanation panel
        side = tk.Frame(
            main,
            bg=CARD,
            width=360,
            highlightbackground=BORDER,
            highlightthickness=1
        )
        side.pack(
            side="right",
            fill="y"
        )
        side.pack_propagate(False)

        tk.Label(
            side,
            text="SOLUTION & EXPLANATION",
            font=("Segoe UI", 11, "bold"),
            fg="white",
            bg=TEAL,
            pady=11,
            anchor="w",
            padx=14
        ).pack(fill="x")

        self.info = tk.Text(
            side,
            bg="#0d1830",
            fg="#dbeafe",
            font=("Consolas", 9),
            relief="flat",
            wrap="word",
            padx=14,
            pady=14
        )
        self.info.pack(fill="both", expand=True)

        self.info.configure(state="disabled")

        # Footer
        footer = tk.Frame(
            self,
            bg=BG,
            padx=28,
            pady=9
        )
        footer.pack(fill="x")

        self.status = tk.Label(
            footer,
            text="Ready",
            font=("Segoe UI", 9, "bold"),
            fg="#86efac",
            bg="#063c36",
            padx=12,
            pady=5
        )
        self.status.pack(side="left")

        tk.Label(
            footer,
            text=f"{ORG}  |  Ph: {PHONE}  |  {WEBSITE}",
            font=("Segoe UI", 8),
            fg="#64748b",
            bg=BG
        ).pack(side="right")

    # ========================================================
    # Constraint rows
    # ========================================================

    def add_constraint(self, value=""):

        row = tk.Frame(
            self.constraint_container,
            bg=CARD
        )
        row.pack(fill="x", pady=2)

        number = tk.Label(
            row,
            text=f"{len(self.rows) + 1}.",
            width=3,
            anchor="e",
            fg=MUTED,
            bg=CARD,
            font=("Segoe UI", 9)
        )
        number.pack(side="left")

        entry = tk.Entry(
            row,
            bg="#101c34",
            fg=TEXT,
            insertbackground="white",
            relief="flat",
            font=("Consolas", 10)
        )
        entry.pack(
            side="left",
            fill="x",
            expand=True,
            padx=6
        )

        entry.insert(0, value)

        remove = ttk.Button(
            row,
            text="Remove",
            style="App.TButton",
            command=lambda r=row: self.remove_constraint(r)
        )
        remove.pack(side="right")

        self.rows.append(
            {
                "frame": row,
                "entry": entry,
                "number": number
            }
        )

        self.renumber_rows()

    def remove_constraint(self, row):

        for item in self.rows:
            if item["frame"] == row:
                item["frame"].destroy()
                self.rows.remove(item)
                break

        self.renumber_rows()

    def renumber_rows(self):

        for i, item in enumerate(self.rows, start=1):
            item["number"].configure(
                text=f"{i}."
            )

    def clear_constraints(self):

        for item in self.rows:
            item["frame"].destroy()

        self.rows.clear()
        self.selected_constraint = -1

        self.add_constraint("x >= 0")
        self.add_constraint("y >= 0")

    # ========================================================
    # Example loading
    # ========================================================

    def load_example(self, name):

        if name not in EXAMPLES:
            return

        data = EXAMPLES[name]

        for item in self.rows:
            item["frame"].destroy()

        self.rows.clear()

        self.problem_name.delete(0, "end")
        self.problem_name.insert(0, name)

        self.description.delete(0, "end")
        self.description.insert(
            0,
            data["description"]
        )

        for equation in data["constraints"]:
            self.add_constraint(equation)

        self.selected_constraint = -1
        self.generate()

    # ========================================================
    # Get data from GUI
    # ========================================================

    def get_data(self):

        constraints = []

        for item in self.rows:

            equation = item["entry"].get().strip()

            if not equation:
                continue

            try:
                c = parse_constraint(equation)
                constraints.append(c)

            except Exception as exc:
                raise ValueError(
                    f"Constraint {len(constraints) + 1}:\n"
                    f"{equation}\n\n{exc}"
                )

        if not constraints:
            raise ValueError(
                "Please provide at least one constraint."
            )

        return {
            "name": self.problem_name.get().strip()
                    or "Untitled Problem",
            "description": self.description.get().strip(),
            "constraints": constraints
        }

    # ========================================================
    # Generate
    # ========================================================

    def generate(self):

        try:
            data = self.get_data()

        except ValueError as exc:
            messagebox.showerror(
                "Invalid Data",
                str(exc)
            )
            return

        self.data = data

        if (
            self.selected_constraint >=
            len(data["constraints"])
        ):
            self.selected_constraint = -1

        self.draw()

    # ========================================================
    # Mathematics
    # ========================================================

    @staticmethod
    def satisfies(c, x, y, tol=1e-8):

        value = c["a"] * x + c["b"] * y

        if c["sense"] == "<=":
            return value <= c["c"] + tol

        if c["sense"] == ">=":
            return value >= c["c"] - tol

        return abs(value - c["c"]) <= tol

    @staticmethod
    def intersection(c1, c2):

        A = np.array([
            [c1["a"], c1["b"]],
            [c2["a"], c2["b"]]
        ], dtype=float)

        B = np.array([
            c1["c"],
            c2["c"]
        ], dtype=float)

        try:
            x, y = np.linalg.solve(A, B)
            return float(x), float(y)
        except np.linalg.LinAlgError:
            return None

    def find_vertices(self, constraints):

        candidates = []

        # Pairwise boundary intersections
        for i in range(len(constraints)):
            for j in range(i + 1, len(constraints)):

                point = self.intersection(
                    constraints[i],
                    constraints[j]
                )

                if point is None:
                    continue

                x, y = point

                if all(
                    self.satisfies(c, x, y)
                    for c in constraints
                ):
                    candidates.append(point)

        unique = []

        for p in candidates:

            if not any(
                np.hypot(
                    p[0] - q[0],
                    p[1] - q[1]
                ) < 1e-7
                for q in unique
            ):
                unique.append(p)

        if len(unique) >= 3:

            center = np.mean(
                np.array(unique),
                axis=0
            )

            unique.sort(
                key=lambda p: np.arctan2(
                    p[1] - center[1],
                    p[0] - center[0]
                )
            )

        return unique

    # ========================================================
    # Automatic graph limits
    # ========================================================

    def graph_limits(self, constraints, vertices):

        points = list(vertices)

        # Add intercepts from each constraint where useful.
        for c in constraints:

            if abs(c["a"]) > 1e-12:
                points.append(
                    (c["c"] / c["a"], 0)
                )

            if abs(c["b"]) > 1e-12:
                points.append(
                    (0, c["c"] / c["b"])
                )

        finite = [
            p for p in points
            if np.isfinite(p[0]) and np.isfinite(p[1])
        ]

        if not finite:
            return -2, 10, -2, 10

        xs = [p[0] for p in finite]
        ys = [p[1] for p in finite]

        xmin = min(xs)
        xmax = max(xs)
        ymin = min(ys)
        ymax = max(ys)

        # Include origin when the problem is near the first quadrant.
        xmin = min(xmin, 0)
        ymin = min(ymin, 0)

        xspan = max(xmax - xmin, 4)
        yspan = max(ymax - ymin, 4)

        # Limit extreme automatically generated ranges.
        padx = xspan * 0.18
        pady = yspan * 0.18

        xmin -= padx
        xmax += padx
        ymin -= pady
        ymax += pady

        return xmin, xmax, ymin, ymax

    # ========================================================
    # Drawing
    # ========================================================

    def draw(self):

        if not hasattr(self, "data"):
            return

        data = self.data
        constraints = data["constraints"]

        vertices = self.find_vertices(
            constraints
        )

        xmin, xmax, ymin, ymax = self.graph_limits(
            constraints,
            vertices
        )

        self.ax.clear()
        self.ax.set_facecolor(GRAPH)

        self.ax.set_xlim(xmin, xmax)
        self.ax.set_ylim(ymin, ymax)

        # Grid
        self.ax.grid(
            True,
            color=GRID,
            linewidth=0.7,
            alpha=0.9
        )

        # Axes
        self.ax.axhline(
            0,
            color=TEAL,
            linewidth=1.8,
            zorder=2
        )

        self.ax.axvline(
            0,
            color=TEAL,
            linewidth=1.8,
            zorder=2
        )

        self.ax.tick_params(
            colors="#94a3b8",
            labelsize=8
        )

        for spine in self.ax.spines.values():
            spine.set_color("#334155")

        self.ax.set_xlabel(
            "X",
            color=TEXT,
            fontsize=10,
            fontweight="bold"
        )

        self.ax.set_ylabel(
            "Y",
            color=TEXT,
            fontsize=10,
            fontweight="bold"
        )

        # Individual half-plane shading
        x = np.linspace(
            xmin,
            xmax,
            1000
        )

        if self.show_individual_shading:

            for i, c in enumerate(constraints):

                color = COLORS[
                    i % len(COLORS)
                ]

                if abs(c["b"]) > 1e-12:

                    y = (
                        c["c"] -
                        c["a"] * x
                    ) / c["b"]

                    if c["sense"] == "<=":

                        self.ax.fill_between(
                            x,
                            ymin,
                            y,
                            color=color,
                            alpha=0.055
                        )

                    elif c["sense"] == ">=":

                        self.ax.fill_between(
                            x,
                            y,
                            ymax,
                            color=color,
                            alpha=0.055
                        )

                elif abs(c["a"]) > 1e-12:

                    xv = c["c"] / c["a"]

                    if c["sense"] == "<=":

                        self.ax.axvspan(
                            xmin,
                            xv,
                            color=color,
                            alpha=0.055
                        )

                    else:

                        self.ax.axvspan(
                            xv,
                            xmax,
                            color=color,
                            alpha=0.055
                        )

        # Feasible region
        if (
            self.show_region
            and len(vertices) >= 3
        ):

            polygon = Polygon(
                vertices,
                closed=True,
                facecolor="#6366f1",
                edgecolor="#a78bfa",
                linewidth=2.2,
                alpha=0.34,
                zorder=5
            )

            self.ax.add_patch(polygon)

            center = np.mean(
                np.array(vertices),
                axis=0
            )

            self.ax.text(
                center[0],
                center[1],
                "COMMON\nFEASIBLE REGION",
                ha="center",
                va="center",
                color="#eef2ff",
                fontsize=8.5,
                fontweight="bold",
                bbox=dict(
                    boxstyle="round,pad=0.55",
                    facecolor="#111b32",
                    edgecolor="#6366f1",
                    alpha=0.93
                ),
                zorder=20
            )

        # Boundary lines
        for i, c in enumerate(constraints):

            color = COLORS[
                i % len(COLORS)
            ]

            selected = (
                i == self.selected_constraint
            )

            linewidth = (
                3.5 if selected else 1.9
            )

            alpha = (
                1.0 if selected else 0.82
            )

            linestyle = (
                "--"
                if c.get("strict", False)
                else "-"
            )

            if abs(c["b"]) > 1e-12:

                y = (
                    c["c"] -
                    c["a"] * x
                ) / c["b"]

                self.ax.plot(
                    x,
                    y,
                    color=color,
                    linewidth=linewidth,
                    linestyle=linestyle,
                    alpha=alpha,
                    label=f"C{i + 1}: {format_equation(c)}",
                    zorder=10
                )

            elif abs(c["a"]) > 1e-12:

                xv = c["c"] / c["a"]

                self.ax.axvline(
                    xv,
                    color=color,
                    linewidth=linewidth,
                    linestyle=linestyle,
                    alpha=alpha,
                    label=f"C{i + 1}: {format_equation(c)}",
                    zorder=10
                )

        # Corner points
        if self.show_points:

            for i, (xv, yv) in enumerate(
                vertices,
                start=1
            ):

                self.ax.scatter(
                    xv,
                    yv,
                    s=68,
                    color="#f8fafc",
                    edgecolor="#8b5cf6",
                    linewidth=2,
                    zorder=30
                )

                self.ax.annotate(
                    f"P{i} ({format_number(xv)}, {format_number(yv)})",
                    (xv, yv),
                    xytext=(7, 7),
                    textcoords="offset points",
                    fontsize=7.5,
                    color="#f8fafc",
                    bbox=dict(
                        boxstyle="round,pad=0.25",
                        facecolor="#111b32",
                        edgecolor="#334155",
                        alpha=0.94
                    ),
                    zorder=31
                )

        # Title
        self.ax.set_title(
            data["name"],
            color=TEXT,
            fontsize=12,
            fontweight="bold",
            pad=10
        )

        # Legend
        legend = self.ax.legend(
            loc="upper right",
            fontsize=7,
            frameon=True,
            facecolor="#0e1930",
            edgecolor="#334155"
        )

        for txt in legend.get_texts():
            txt.set_color("#dbeafe")

        # Description box
        if data["description"]:

            self.ax.text(
                0.02,
                0.97,
                data["description"],
                transform=self.ax.transAxes,
                fontsize=7.5,
                color="#cbd5e1",
                va="top",
                bbox=dict(
                    boxstyle="round,pad=0.55",
                    facecolor="#13203a",
                    edgecolor="#334155",
                    alpha=0.94
                )
            )

        self.canvas.draw_idle()

        self.update_explanation(
            data,
            vertices
        )

        self.status.configure(
            text=(
                f"{len(constraints)} constraints    "
                f"✓ {len(vertices)} feasible corner point(s)    "
                f"{'✓ Feasible region visible' if self.show_region else '○ Region hidden'}"
            )
        )

    # ========================================================
    # Explanation
    # ========================================================

    def update_explanation(
        self,
        data,
        vertices
    ):

        self.info.configure(
            state="normal"
        )
        self.info.delete(
            "1.0",
            "end"
        )

        self.info.insert(
            "end",
            data["name"].upper() + "\n",
            "heading"
        )

        self.info.insert(
            "end",
            "════════════════════════════\n\n"
        )

        if data["description"]:
            self.info.insert(
                "end",
                data["description"] + "\n\n"
            )

        self.info.insert(
            "end",
            "STEP 1 — CONSTRAINTS\n",
            "subheading"
        )

        for i, c in enumerate(
            data["constraints"],
            start=1
        ):
            self.info.insert(
                "end",
                f"C{i}: {format_equation(c)}\n"
            )

        self.info.insert(
            "end",
            "\n"
        )

        if self.selected_constraint >= 0:

            c = data["constraints"][
                self.selected_constraint
            ]

            self.info.insert(
                "end",
                "SELECTED CONSTRAINT\n",
                "subheading"
            )

            self.info.insert(
                "end",
                f"{format_equation(c)}\n\n"
            )

            self.info.insert(
                "end",
                "STEP 2 — BOUNDARY EQUATION\n",
                "subheading"
            )

            self.info.insert(
                "end",
                self.boundary_equation(c) +
                "\n\n"
            )

            self.info.insert(
                "end",
                "STEP 3 — SOLUTION SIDE\n",
                "subheading"
            )

            if c["sense"] == "<=":
                self.info.insert(
                    "end",
                    "The solution is on the side\n"
                    "where ax + by is LESS than\n"
                    "or equal to the RHS.\n\n"
                )
            elif c["sense"] == ">=":
                self.info.insert(
                    "end",
                    "The solution is on the side\n"
                    "where ax + by is GREATER than\n"
                    "or equal to the RHS.\n\n"
                )
            else:
                self.info.insert(
                    "end",
                    "Only the boundary line is allowed.\n\n"
                )

            if c.get("strict", False):
                self.info.insert(
                    "end",
                    "Because the inequality is strict,\n"
                    "the boundary is drawn dashed.\n\n"
                )
            else:
                self.info.insert(
                    "end",
                    "The boundary is included.\n\n"
                )

        else:

            self.info.insert(
                "end",
                "STEP 2 — COMMON FEASIBLE REGION\n",
                "subheading"
            )

            self.info.insert(
                "end",
                "The feasible region is the set of\n"
                "points that satisfy ALL constraints\n"
                "simultaneously.\n\n"
            )

        self.info.insert(
            "end",
            "STEP 4 — CORNER POINTS\n",
            "subheading"
        )

        if vertices:

            for i, (x, y) in enumerate(
                vertices,
                start=1
            ):
                self.info.insert(
                    "end",
                    f"P{i} = ({format_number(x)}, "
                    f"{format_number(y)})\n"
                )

            self.info.insert(
                "end",
                "\n"
            )

            self.info.insert(
                "end",
                "These points are obtained from\n"
                "intersections of boundary lines that\n"
                "also satisfy every constraint.\n"
            )

        else:

            self.info.insert(
                "end",
                "No finite feasible corner points were\n"
                "found. The region may be empty or\n"
                "unbounded.\n"
            )

        self.info.tag_configure(
            "heading",
            foreground="#f8fafc",
            font=("Segoe UI", 11, "bold")
        )

        self.info.tag_configure(
            "subheading",
            foreground="#5eead4",
            font=("Segoe UI", 9, "bold")
        )

        self.info.configure(
            state="disabled"
        )

    # ========================================================
    # Boundary equation
    # ========================================================

    @staticmethod
    def boundary_equation(c):

        a, b, rhs = c["a"], c["b"], c["c"]

        if abs(b) < 1e-12:
            return f"x = {format_number(rhs / a)}"

        m = -a / b
        k = rhs / b

        if abs(k) < 1e-12:
            return f"y = {format_number(m)}x"

        sign = "+" if k >= 0 else "-"

        return (
            f"y = {format_number(m)}x "
            f"{sign} {format_number(abs(k))}"
        )

    # ========================================================
    # Toggles
    # ========================================================

    def toggle_region(self):

        self.show_region = not self.show_region

        self.region_btn.configure(
            text=(
                "Hide Feasible Region"
                if self.show_region
                else "Show Feasible Region"
            )
        )

        self.draw()

    def toggle_points(self):

        self.show_points = not self.show_points

        self.points_btn.configure(
            text=(
                "Hide Corner Points"
                if self.show_points
                else "Show Corner Points"
            )
        )

        self.draw()

    def toggle_individual_shading(self):

        self.show_individual_shading = (
            not self.show_individual_shading
        )

        self.shading_btn.configure(
            text=(
                "Hide Individual Shading"
                if self.show_individual_shading
                else "Show Individual Shading"
            )
        )

        self.draw()

    # ========================================================
    # Graph click
    # ========================================================

    def on_graph_click(self, event):

        if event.inaxes != self.ax:
            return

        if event.xdata is None or event.ydata is None:
            return

        constraints = self.data["constraints"]

        best = None
        best_distance = float("inf")

        x = event.xdata
        y = event.ydata

        for i, c in enumerate(constraints):

            if abs(c["b"]) > 1e-12:

                boundary_y = (
                    c["c"] - c["a"] * x
                ) / c["b"]

                distance = abs(
                    y - boundary_y
                )

            else:

                boundary_x = c["c"] / c["a"]

                distance = abs(
                    x - boundary_x
                )

            if distance < best_distance:
                best_distance = distance
                best = i

        if best is not None:

            # Relative click tolerance
            xspan = self.ax.get_xlim()[1] - self.ax.get_xlim()[0]
            yspan = self.ax.get_ylim()[1] - self.ax.get_ylim()[0]

            tolerance = max(
                xspan,
                yspan
            ) * 0.025

            if best_distance <= tolerance:
                self.selected_constraint = best
                self.draw()

    # ========================================================
    # JSON
    # ========================================================

    def save_json(self):

        try:
            data = self.get_data()
        except ValueError as exc:
            messagebox.showerror(
                "Invalid Data",
                str(exc)
            )
            return

        serializable = {
            "name": data["name"],
            "description": data["description"],
            "constraints": [
                c["original"]
                for c in data["constraints"]
            ]
        }

        filename = filedialog.asksaveasfilename(
            title="Save Problem Data",
            defaultextension=".json",
            filetypes=[
                ("JSON files", "*.json"),
                ("All files", "*.*")
            ]
        )

        if not filename:
            return

        with open(
            filename,
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(
                serializable,
                f,
                indent=4,
                ensure_ascii=False
            )

        messagebox.showinfo(
            "Saved",
            f"Problem data saved to:\n{filename}"
        )

    def load_json(self):

        filename = filedialog.askopenfilename(
            title="Load Problem Data",
            filetypes=[
                ("JSON files", "*.json"),
                ("All files", "*.*")
            ]
        )

        if not filename:
            return

        try:
            with open(
                filename,
                "r",
                encoding="utf-8"
            ) as f:
                data = json.load(f)

            if "constraints" not in data:
                raise ValueError(
                    "JSON must contain a 'constraints' list."
                )

            for item in self.rows:
                item["frame"].destroy()

            self.rows.clear()

            self.problem_name.delete(0, "end")
            self.problem_name.insert(
                0,
                data.get(
                    "name",
                    "Imported Problem"
                )
            )

            self.description.delete(0, "end")
            self.description.insert(
                0,
                data.get(
                    "description",
                    ""
                )
            )

            for equation in data["constraints"]:
                self.add_constraint(
                    str(equation)
                )

            self.generate()

        except Exception as exc:

            messagebox.showerror(
                "JSON Error",
                str(exc)
            )


# ============================================================
# Run
# ============================================================

if __name__ == "__main__":
    app = DynamicFeasibleRegionApp()
    app.mainloop()
