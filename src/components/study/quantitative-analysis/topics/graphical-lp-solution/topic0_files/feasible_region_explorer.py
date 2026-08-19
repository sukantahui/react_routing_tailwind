
import tkinter as tk
from tkinter import ttk, messagebox
import numpy as np
import matplotlib

# Windows-friendly interactive backend
matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.patches import Polygon


# ============================================================
# Coder & AccoTax
# Quantitative Analysis Learning Tool
# Interactive Common Feasible Region Explorer
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
RED = "#ef4444"
BLUE = "#38bdf8"

ORG = "Coder & AccoTax"
PHONE = "7003756860"
WEBSITE = "codernaccotax.co.in"


# ------------------------------------------------------------
# Example problems
# Each constraint is:
# a*x + b*y <=/>= c
# ------------------------------------------------------------

PROBLEMS = {
    "Product Mix Problem": {
        "description": "A factory produces two products with machine and labor constraints.",
        "constraints": [
            {"a": 1, "b": 1, "sense": "<=", "c": 4,
             "label": "x + y ≤ 4", "color": PURPLE},
            {"a": 1, "b": 2, "sense": "<=", "c": 6,
             "label": "x + 2y ≤ 6", "color": ORANGE},
            {"a": 1, "b": 0, "sense": ">=", "c": 0,
             "label": "x ≥ 0", "color": TEAL},
            {"a": 0, "b": 1, "sense": ">=", "c": 0,
             "label": "y ≥ 0", "color": GREEN},
        ],
        "xlim": (-0.5, 6),
        "ylim": (-0.5, 6),
    },

    "Resource Allocation": {
        "description": "Two activities share limited machine and labor resources.",
        "constraints": [
            {"a": 2, "b": 1, "sense": "<=", "c": 8,
             "label": "2x + y ≤ 8", "color": PURPLE},
            {"a": 1, "b": 2, "sense": "<=", "c": 8,
             "label": "x + 2y ≤ 8", "color": ORANGE},
            {"a": 1, "b": 0, "sense": ">=", "c": 0,
             "label": "x ≥ 0", "color": TEAL},
            {"a": 0, "b": 1, "sense": ">=", "c": 0,
             "label": "y ≥ 0", "color": GREEN},
        ],
        "xlim": (-0.5, 5),
        "ylim": (-0.5, 5),
    },

    "Minimum Requirements": {
        "description": "A diet or production plan must satisfy minimum requirements.",
        "constraints": [
            {"a": 1, "b": 1, "sense": ">=", "c": 4,
             "label": "x + y ≥ 4", "color": PURPLE},
            {"a": 2, "b": 1, "sense": ">=", "c": 6,
             "label": "2x + y ≥ 6", "color": ORANGE},
            {"a": 1, "b": 0, "sense": ">=", "c": 0,
             "label": "x ≥ 0", "color": TEAL},
            {"a": 0, "b": 1, "sense": ">=", "c": 0,
             "label": "y ≥ 0", "color": GREEN},
        ],
        "xlim": (-0.5, 7),
        "ylim": (-0.5, 7),
    },
}


class FeasibleRegionExplorer(tk.Tk):

    def __init__(self):
        super().__init__()

        self.title("Coder & AccoTax - Common Feasible Region Explorer")
        self.geometry("1250x820")
        self.minsize(1050, 700)
        self.configure(bg=BG)

        self.current_problem = tk.StringVar(
            value="Product Mix Problem"
        )

        self.show_region = True
        self.show_points = False
        self.selected_constraint = -1

        self.build_styles()
        self.build_ui()
        self.draw()

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
            padding=(12, 7),
            foreground="#dbeafe",
            background="#18253e",
            borderwidth=0
        )

        style.map(
            "App.TButton",
            background=[
                ("active", "#334155")
            ]
        )

        style.configure(
            "Selected.TButton",
            font=("Segoe UI", 10, "bold"),
            padding=(12, 7),
            foreground="white",
            background=TEAL,
            borderwidth=0
        )

    # ========================================================
    # Main UI
    # ========================================================

    def build_ui(self):

        # ---------- Header ----------
        header = tk.Frame(
            self,
            bg=BG,
            padx=42,
            pady=24
        )
        header.pack(fill="x")

        icon = tk.Label(
            header,
            text="▣",
            font=("Segoe UI", 22, "bold"),
            fg="#e2e8f0",
            bg=BG
        )
        icon.pack(side="left", padx=(0, 18))

        title_frame = tk.Frame(header, bg=BG)
        title_frame.pack(side="left", fill="x")

        tk.Label(
            title_frame,
            text="Explore the Common Feasible Region",
            font=("Segoe UI", 24, "bold"),
            fg=TEXT,
            bg=BG
        ).pack(anchor="w")

        tk.Label(
            title_frame,
            text=(
                "Select a problem to see its constraints and the common "
                "feasible region. Toggle corner points to see the vertices "
                "where optimal solutions are evaluated."
            ),
            font=("Segoe UI", 10),
            fg="#cbd5e1",
            bg=BG,
            wraplength=1000,
            justify="left"
        ).pack(anchor="w", pady=(9, 0))

        # ---------- Problem selector ----------
        selector = tk.Frame(
            self,
            bg=BG,
            padx=42
        )
        selector.pack(fill="x", pady=(0, 12))

        self.problem_buttons = {}

        for name in PROBLEMS:
            btn = ttk.Button(
                selector,
                text=name,
                style="App.TButton",
                command=lambda n=name: self.select_problem(n)
            )
            btn.pack(side="left", padx=(0, 8))
            self.problem_buttons[name] = btn

        # ---------- Controls ----------
        controls = tk.Frame(
            self,
            bg=BG,
            padx=42
        )
        controls.pack(fill="x", pady=(0, 12))

        self.region_btn = ttk.Button(
            controls,
            text="Hide Feasible Region",
            style="Selected.TButton",
            command=self.toggle_region
        )
        self.region_btn.pack(side="left", padx=(0, 8))

        self.points_btn = ttk.Button(
            controls,
            text="Show Corner Points",
            style="App.TButton",
            command=self.toggle_points
        )
        self.points_btn.pack(side="left")

        # ---------- Main content ----------
        content = tk.Frame(
            self,
            bg=BG,
            padx=28,
            pady=5
        )
        content.pack(fill="both", expand=True)

        # Graph card
        graph_card = tk.Frame(
            content,
            bg=CARD,
            highlightbackground=BORDER,
            highlightthickness=1
        )
        graph_card.pack(
            side="left",
            fill="both",
            expand=True,
            padx=(0, 14)
        )

        # Info card
        info_card = tk.Frame(
            content,
            bg=CARD,
            width=340,
            highlightbackground=BORDER,
            highlightthickness=1
        )
        info_card.pack(
            side="right",
            fill="y"
        )
        info_card.pack_propagate(False)

        self.info_card = info_card

        self.build_graph(graph_card)
        self.build_info(info_card)

        # ---------- Footer ----------
        footer = tk.Frame(
            self,
            bg=BG,
            padx=42,
            pady=12
        )
        footer.pack(fill="x")

        self.status = tk.Label(
            footer,
            text="",
            font=("Segoe UI", 9, "bold"),
            fg="#86efac",
            bg="#063c36",
            padx=12,
            pady=6
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
    # Graph
    # ========================================================

    def build_graph(self, parent):

        self.figure = Figure(
            figsize=(7.4, 5.6),
            dpi=100,
            facecolor=GRAPH
        )

        self.ax = self.figure.add_subplot(111)
        self.ax.set_facecolor(GRAPH)

        self.canvas = FigureCanvasTkAgg(
            self.figure,
            master=parent
        )
        self.canvas.get_tk_widget().pack(
            fill="both",
            expand=True,
            padx=10,
            pady=10
        )

        # Mouse interaction:
        # clicking a boundary highlights it
        self.canvas.mpl_connect(
            "button_press_event",
            self.on_graph_click
        )

    # ========================================================
    # Information panel
    # ========================================================

    def build_info(self, parent):

        tk.Label(
            parent,
            text="SOLUTION & EXPLANATION",
            font=("Segoe UI", 12, "bold"),
            fg=TEXT,
            bg=TEAL,
            padx=16,
            pady=13,
            anchor="w"
        ).pack(fill="x")

        self.info_text = tk.Text(
            parent,
            bg="#0d1830",
            fg="#dbeafe",
            insertbackground="white",
            relief="flat",
            borderwidth=0,
            font=("Consolas", 9),
            padx=16,
            pady=15,
            wrap="word"
        )
        self.info_text.pack(
            fill="both",
            expand=True,
            padx=1,
            pady=1
        )

        self.info_text.configure(state="disabled")

    # ========================================================
    # Problem selection
    # ========================================================

    def select_problem(self, name):

        self.current_problem.set(name)
        self.selected_constraint = -1
        self.show_points = False

        self.points_btn.configure(
            text="Show Corner Points",
            style="App.TButton"
        )

        self.refresh_problem_buttons()
        self.draw()

    def refresh_problem_buttons(self):

        selected = self.current_problem.get()

        for name, btn in self.problem_buttons.items():

            if name == selected:
                btn.configure(style="Selected.TButton")
            else:
                btn.configure(style="App.TButton")

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
            ),
            style=(
                "Selected.TButton"
                if self.show_points
                else "App.TButton"
            )
        )

        self.draw()

    # ========================================================
    # Mathematics
    # ========================================================

    @staticmethod
    def satisfies(c, x, y, tol=1e-8):

        value = c["a"] * x + c["b"] * y

        if c["sense"] == "<=":
            return value <= c["c"] + tol

        return value >= c["c"] - tol

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

    def is_feasible(self, x, y, constraints):

        return all(
            self.satisfies(c, x, y)
            for c in constraints
        )

    def find_vertices(self, constraints):

        candidates = []

        # Pairwise intersection points
        for i in range(len(constraints)):
            for j in range(i + 1, len(constraints)):

                p = self.intersection(
                    constraints[i],
                    constraints[j]
                )

                if p is None:
                    continue

                x, y = p

                if self.is_feasible(x, y, constraints):
                    candidates.append((x, y))

        # Remove duplicates
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

        if len(unique) < 3:
            return unique

        # Sort points around their centroid
        center = np.mean(unique, axis=0)

        unique.sort(
            key=lambda p: np.arctan2(
                p[1] - center[1],
                p[0] - center[0]
            )
        )

        return unique

    # ========================================================
    # Graph drawing
    # ========================================================

    def draw(self):

        problem = PROBLEMS[
            self.current_problem.get()
        ]

        constraints = problem["constraints"]

        self.ax.clear()

        x_min, x_max = problem["xlim"]
        y_min, y_max = problem["ylim"]

        self.ax.set_xlim(x_min, x_max)
        self.ax.set_ylim(y_min, y_max)
        self.ax.set_aspect("equal", adjustable="box")

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
            color="#14b8a6",
            linewidth=2
        )

        self.ax.axvline(
            0,
            color="#14b8a6",
            linewidth=2
        )

        # Style
        self.ax.tick_params(
            colors="#94a3b8",
            labelsize=8
        )

        for spine in self.ax.spines.values():
            spine.set_color("#334155")

        self.ax.set_xlabel(
            "x",
            color=TEXT,
            fontsize=11,
            fontweight="bold"
        )

        self.ax.set_ylabel(
            "y",
            color=TEXT,
            fontsize=11,
            fontweight="bold"
        )

        # Draw individual half-plane shading very lightly
        x = np.linspace(
            x_min,
            x_max,
            1000
        )

        for i, c in enumerate(constraints):

            # x = constant
            if c["b"] == 0:

                xv = c["c"] / c["a"]

                if c["sense"] == ">=":
                    self.ax.axvspan(
                        xv,
                        x_max,
                        color=c["color"],
                        alpha=0.025
                    )
                else:
                    self.ax.axvspan(
                        x_min,
                        xv,
                        color=c["color"],
                        alpha=0.025
                    )

                continue

            # y = constant
            if c["a"] == 0:

                yv = c["c"] / c["b"]

                if c["sense"] == ">=":
                    self.ax.axhspan(
                        yv,
                        y_max,
                        color=c["color"],
                        alpha=0.025
                    )
                else:
                    self.ax.axhspan(
                        y_min,
                        yv,
                        color=c["color"],
                        alpha=0.025
                    )

                continue

            y = (
                c["c"] - c["a"] * x
            ) / c["b"]

            if c["sense"] == "<=":
                self.ax.fill_between(
                    x,
                    y_min,
                    y,
                    color=c["color"],
                    alpha=0.025
                )
            else:
                self.ax.fill_between(
                    x,
                    y,
                    y_max,
                    color=c["color"],
                    alpha=0.025
                )

        # Feasible region
        vertices = self.find_vertices(
            constraints
        )

        if (
            self.show_region
            and len(vertices) >= 3
        ):
            polygon = Polygon(
                vertices,
                closed=True,
                facecolor="#6366f1",
                edgecolor="#a78bfa",
                linewidth=2,
                alpha=0.28,
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
                "FEASIBLE\nREGION",
                ha="center",
                va="center",
                color="#e0e7ff",
                fontsize=9,
                fontweight="bold",
                bbox=dict(
                    boxstyle="round,pad=0.55",
                    facecolor="#111b32",
                    edgecolor="#6366f1",
                    alpha=0.92
                ),
                zorder=20
            )

        # Boundary lines
        for i, c in enumerate(constraints):

            selected = (
                i == self.selected_constraint
            )

            linewidth = (
                3.4 if selected else 1.8
            )

            alpha = (
                1.0 if selected else 0.72
            )

            linestyle = "-"

            if c["b"] != 0:

                y = (
                    c["c"] - c["a"] * x
                ) / c["b"]

                self.ax.plot(
                    x,
                    y,
                    color=c["color"],
                    linewidth=linewidth,
                    alpha=alpha,
                    linestyle=linestyle,
                    label=c["label"],
                    zorder=10
                )

            elif c["a"] != 0:

                xv = c["c"] / c["a"]

                self.ax.axvline(
                    xv,
                    color=c["color"],
                    linewidth=linewidth,
                    alpha=alpha,
                    label=c["label"],
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
                    s=75,
                    color="#f8fafc",
                    edgecolor="#8b5cf6",
                    linewidth=2,
                    zorder=30
                )

                self.ax.annotate(
                    f"P{i} ({xv:.2f}, {yv:.2f})",
                    (xv, yv),
                    xytext=(8, 8),
                    textcoords="offset points",
                    fontsize=8,
                    color="#f8fafc",
                    bbox=dict(
                        boxstyle="round,pad=0.25",
                        facecolor="#111b32",
                        edgecolor="#334155",
                        alpha=0.95
                    ),
                    zorder=31
                )

        # Graph title
        self.ax.set_title(
            problem_name if False else
            self.current_problem.get(),
            color=TEXT,
            fontsize=12,
            fontweight="bold",
            pad=12
        )

        # Legend
        legend = self.ax.legend(
            loc="upper right",
            frameon=True,
            fontsize=7.5,
            facecolor="#0e1930",
            edgecolor="#334155"
        )

        for txt in legend.get_texts():
            txt.set_color("#dbeafe")

        # Top-left graph description
        self.ax.text(
            0.025,
            0.95,
            problem["description"],
            transform=self.ax.transAxes,
            fontsize=7.5,
            color="#cbd5e1",
            va="top",
            bbox=dict(
                boxstyle="round,pad=0.6",
                facecolor="#13203a",
                edgecolor="#334155",
                alpha=0.94
            )
        )

        # Draw
        self.canvas.draw_idle()

        # Information
        self.update_info(
            problem,
            vertices
        )

        # Status
        self.status.configure(
            text=(
                f"{len(constraints)} constraints    "
                f"✓ {len(vertices)} feasible corner point(s)    "
                f"{'✓ Feasible region visible' if self.show_region else '○ Feasible region hidden'}"
            )
        )

    # ========================================================
    # Information panel
    # ========================================================

    def update_info(self, problem, vertices):

        self.info_text.configure(
            state="normal"
        )
        self.info_text.delete(
            "1.0",
            "end"
        )

        self.info_text.insert(
            "end",
            f"{self.current_problem.get().upper()}\n",
            "heading"
        )

        self.info_text.insert(
            "end",
            "────────────────────────────\n\n"
        )

        self.info_text.insert(
            "end",
            f"{problem['description']}\n\n"
        )

        self.info_text.insert(
            "end",
            "CONSTRAINTS\n",
            "subheading"
        )

        for i, c in enumerate(
            problem["constraints"],
            start=1
        ):
            self.info_text.insert(
                "end",
                f"C{i}:  {c['label']}\n"
            )

        self.info_text.insert(
            "end",
            "\n"
        )

        if self.selected_constraint >= 0:

            c = problem["constraints"][
                self.selected_constraint
            ]

            self.info_text.insert(
                "end",
                "SELECTED CONSTRAINT\n",
                "subheading"
            )

            self.info_text.insert(
                "end",
                f"{c['label']}\n\n"
            )

            self.info_text.insert(
                "end",
                "Boundary equation:\n"
            )

            self.info_text.insert(
                "end",
                self.boundary_equation(c) + "\n\n"
            )

            self.info_text.insert(
                "end",
                "Solution side:\n"
            )

            if c["sense"] == "<=":
                self.info_text.insert(
                    "end",
                    "Below / lower side of the boundary.\n\n"
                )
            else:
                self.info_text.insert(
                    "end",
                    "Above / upper side of the boundary.\n\n"
                )

            self.info_text.insert(
                "end",
                "Click another boundary on the graph\n"
                "or select a problem above.\n\n"
            )

        else:

            self.info_text.insert(
                "end",
                "HOW TO READ THE GRAPH\n",
                "subheading"
            )

            self.info_text.insert(
                "end",
                "• Each colored line is a boundary.\n"
                "• The faint shading shows individual\n"
                "  constraint regions.\n"
                "• The purple overlap is the common\n"
                "  feasible region.\n"
                "• Corner points are intersections of\n"
                "  active constraints.\n\n"
            )

        self.info_text.insert(
            "end",
            "FEASIBLE CORNER POINTS\n",
            "subheading"
        )

        if vertices:

            for i, (x, y) in enumerate(
                vertices,
                start=1
            ):
                self.info_text.insert(
                    "end",
                    f"P{i} = ({x:.2f}, {y:.2f})\n"
                )

        else:

            self.info_text.insert(
                "end",
                "No bounded feasible corner points\n"
                "were found for the current constraints.\n"
            )

        self.info_text.tag_configure(
            "heading",
            foreground="#f8fafc",
            font=("Segoe UI", 11, "bold")
        )

        self.info_text.tag_configure(
            "subheading",
            foreground="#5eead4",
            font=("Segoe UI", 9, "bold")
        )

        self.info_text.configure(
            state="disabled"
        )

    # ========================================================
    # Boundary equation
    # ========================================================

    @staticmethod
    def boundary_equation(c):

        if c["b"] == 0:
            return f"x = {c['c'] / c['a']:g}"

        if c["a"] == 0:
            return f"y = {c['c'] / c['b']:g}"

        # y = mx + k
        m = -c["a"] / c["b"]
        k = c["c"] / c["b"]

        if abs(m) < 1e-12:
            return f"y = {k:g}"

        sign = "+" if k >= 0 else "-"

        return (
            f"y = {m:g}x {sign} {abs(k):g}"
        )

    # ========================================================
    # Click boundary on graph
    # ========================================================

    def on_graph_click(self, event):

        if event.inaxes != self.ax:
            return

        if event.xdata is None or event.ydata is None:
            return

        problem = PROBLEMS[
            self.current_problem.get()
        ]

        best = None
        best_distance = float("inf")

        # Approximate distance to each boundary
        for i, c in enumerate(
            problem["constraints"]
        ):

            if c["b"] != 0:

                y_line = (
                    c["c"] -
                    c["a"] * event.xdata
                ) / c["b"]

                distance = abs(
                    event.ydata - y_line
                )

            elif c["a"] != 0:

                x_line = c["c"] / c["a"]

                distance = abs(
                    event.xdata - x_line
                )

            else:
                continue

            if distance < best_distance:
                best_distance = distance
                best = i

        # Click tolerance in graph coordinates
        if best is not None and best_distance < 0.25:

            self.selected_constraint = best
            self.draw()


# ============================================================
# Run
# ============================================================

if __name__ == "__main__":
    app = FeasibleRegionExplorer()
    app.mainloop()
