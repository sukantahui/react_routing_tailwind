
import matplotlib

# Force an interactive GUI backend for Windows/Tkinter.
matplotlib.use("TkAgg")

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button, RadioButtons
from matplotlib.patches import Polygon, FancyBboxPatch
from itertools import combinations


# ============================================================
# Coder & AccoTax
# Quantitative Analysis Learning Tool
# Constraint Explorer PRO
# ============================================================

ORG = "Coder & AccoTax"
PHONE = "7003756860"
WEBSITE = "codernaccotax.co.in"
TAGLINE = "Developing Human Resource Since 1997"

BG = "#050b1d"
PANEL = "#0b1429"
PANEL_2 = "#101c34"
GRAPH_BG = "#0a1427"
BORDER = "#263754"
TEXT = "#f1f5f9"
MUTED = "#94a3b8"
GRID = "#22314c"
ACCENT = "#8b5cf6"
SUCCESS = "#34d399"
WARNING = "#fbbf24"
DANGER = "#fb7185"

X_MIN, X_MAX = -0.5, 5.2
Y_MIN, Y_MAX = -0.5, 5.2
TOL = 1e-8


CONSTRAINTS = [
    {
        "text": r"$2x + 3y \leq 12$",
        "plain": "2x + 3y ≤ 12",
        "a": 2, "b": 3, "c": 12,
        "sense": "<=",
        "color": "#8b5cf6",
    },
    {
        "text": r"$x + 2y \leq 8$",
        "plain": "x + 2y ≤ 8",
        "a": 1, "b": 2, "c": 8,
        "sense": "<=",
        "color": "#f59e0b",
    },
    {
        "text": r"$x \geq 0$",
        "plain": "x ≥ 0",
        "a": 1, "b": 0, "c": 0,
        "sense": ">=",
        "color": "#34d399",
    },
    {
        "text": r"$y \geq 0$",
        "plain": "y ≥ 0",
        "a": 0, "b": 1, "c": 0,
        "sense": ">=",
        "color": "#22c55e",
    },
    {
        "text": r"$x + y \geq 4$",
        "plain": "x + y ≥ 4",
        "a": 1, "b": 1, "c": 4,
        "sense": ">=",
        "color": "#ef4444",
    },
]


class ConstraintExplorerPro:

    def __init__(self):
        self.selected = 0
        self.show_shading = True
        self.show_all_boundaries = True
        self.show_vertices = True
        self.show_explanation = True
        self.test_x = 0
        self.test_y = 0

        self.fig = plt.figure(
            figsize=(14, 9),
            facecolor=BG
        )
        self.fig.canvas.manager.set_window_title(
            "Coder & AccoTax - Constraint Explorer PRO"
        )

        self.build_layout()
        self.refresh()

    # --------------------------------------------------------
    # Layout
    # --------------------------------------------------------

    def build_layout(self):
        # Main application card
        self.fig.patches.append(
            FancyBboxPatch(
                (0.012, 0.018), 0.976, 0.964,
                transform=self.fig.transFigure,
                boxstyle="round,pad=0.008,rounding_size=0.018",
                facecolor=PANEL,
                edgecolor=BORDER,
                linewidth=1.1,
                zorder=-20
            )
        )

        # Header
        self.fig.text(
            0.045, 0.935,
            "◈",
            fontsize=19,
            color=ACCENT,
            fontweight="bold"
        )
        self.fig.text(
            0.075, 0.936,
            "Explore Multiple Constraints",
            fontsize=21,
            color=TEXT,
            fontweight="bold",
            va="center"
        )
        self.fig.text(
            0.045, 0.900,
            "Interactive graphical analysis of linear inequalities and the feasible region",
            fontsize=10.5,
            color=MUTED
        )

        # Instructions panel
        self.fig.text(
            0.045, 0.855,
            "HOW TO USE",
            fontsize=8,
            color=ACCENT,
            fontweight="bold"
        )
        self.fig.text(
            0.045, 0.827,
            "1. Select a constraint to highlight its boundary.   "
            "2. Observe the shaded side.   "
            "3. The common overlap is the feasible region.   "
            "4. Use the explanation panel to understand why.",
            fontsize=9.5,
            color="#cbd5e1"
        )

        # Constraint buttons
        self.constraint_buttons = []
        x = 0.045
        widths = [0.115, 0.105, 0.075, 0.075, 0.105]

        for i, c in enumerate(CONSTRAINTS):
            ax = self.fig.add_axes(
                [x, 0.745, widths[i], 0.042]
            )
            b = Button(
                ax,
                c["plain"],
                color="#18253e",
                hovercolor="#293958"
            )
            b.label.set_color("#dbeafe")
            b.label.set_fontsize(8.5)
            b.on_clicked(
                lambda event, idx=i: self.select_constraint(idx)
            )
            self.constraint_buttons.append(b)
            x += widths[i] + 0.008

        # Toggle buttons
        self.ax_shading = self.fig.add_axes(
            [0.045, 0.685, 0.125, 0.04]
        )
        self.btn_shading = Button(
            self.ax_shading,
            "Hide Shading",
            color="#7c3aed",
            hovercolor="#9333ea"
        )
        self.btn_shading.label.set_color("white")
        self.btn_shading.on_clicked(self.toggle_shading)

        self.ax_boundary = self.fig.add_axes(
            [0.178, 0.685, 0.145, 0.04]
        )
        self.btn_boundary = Button(
            self.ax_boundary,
            "Hide Boundaries",
            color="#334155",
            hovercolor="#475569"
        )
        self.btn_boundary.label.set_color("white")
        self.btn_boundary.on_clicked(self.toggle_boundaries)

        self.ax_vertices = self.fig.add_axes(
            [0.331, 0.685, 0.13, 0.04]
        )
        self.btn_vertices = Button(
            self.ax_vertices,
            "Hide Vertices",
            color="#334155",
            hovercolor="#475569"
        )
        self.btn_vertices.label.set_color("white")
        self.btn_vertices.on_clicked(self.toggle_vertices)

        # Main graph
        self.ax = self.fig.add_axes(
            [0.045, 0.105, 0.625, 0.55],
            facecolor=GRAPH_BG
        )

        # Explanation panel
        self.ax_info = self.fig.add_axes(
            [0.695, 0.105, 0.26, 0.55],
            facecolor=PANEL_2
        )
        self.ax_info.set_xticks([])
        self.ax_info.set_yticks([])
        for s in self.ax_info.spines.values():
            s.set_color(BORDER)

        # Footer badges
        self.ax_badges = self.fig.add_axes(
            [0.045, 0.045, 0.91, 0.045]
        )
        self.ax_badges.set_axis_off()

        # Organisation footer
        self.fig.text(
            0.955, 0.024,
            f"{ORG}  |  Ph: {PHONE}  |  {WEBSITE}",
            ha="right",
            va="bottom",
            fontsize=7.5,
            color="#64748b"
        )

    # --------------------------------------------------------
    # Constraint mathematics
    # --------------------------------------------------------

    @staticmethod
    def line_y(c, x):
        if abs(c["b"]) < TOL:
            return None
        return (c["c"] - c["a"] * x) / c["b"]

    def satisfies(self, c, x, y):
        value = c["a"] * x + c["b"] * y

        if c["sense"] == "<=":
            return value <= c["c"] + TOL
        return value >= c["c"] - TOL

    def feasible(self, x, y):
        return all(
            self.satisfies(c, x, y)
            for c in CONSTRAINTS
        )

    def intersection(self, c1, c2):
        A = np.array([
            [c1["a"], c1["b"]],
            [c2["a"], c2["b"]]
        ], dtype=float)
        B = np.array([
            c1["c"], c2["c"]
        ], dtype=float)

        try:
            p = np.linalg.solve(A, B)
            return float(p[0]), float(p[1])
        except np.linalg.LinAlgError:
            return None

    def find_vertices(self):
        points = []

        for c1, c2 in combinations(CONSTRAINTS, 2):
            p = self.intersection(c1, c2)

            if p is None:
                continue

            x, y = p

            if (
                X_MIN - TOL <= x <= X_MAX + TOL
                and Y_MIN - TOL <= y <= Y_MAX + TOL
                and self.feasible(x, y)
            ):
                points.append((x, y))

        unique = []
        for p in points:
            if not any(
                np.hypot(
                    p[0] - q[0],
                    p[1] - q[1]
                ) < 1e-7
                for q in unique
            ):
                unique.append(p)

        if not unique:
            return np.empty((0, 2))

        pts = np.array(unique)
        center = pts.mean(axis=0)

        angles = np.arctan2(
            pts[:, 1] - center[1],
            pts[:, 0] - center[0]
        )

        return pts[np.argsort(angles)]

    # --------------------------------------------------------
    # Drawing
    # --------------------------------------------------------

    def setup_axes(self):
        self.ax.set_xlim(X_MIN, X_MAX)
        self.ax.set_ylim(Y_MIN, Y_MAX)
        self.ax.set_aspect("equal", adjustable="box")

        self.ax.grid(
            True,
            color=GRID,
            linewidth=0.7,
            alpha=0.85
        )

        self.ax.axhline(
            0,
            color="#5eead4",
            linewidth=1.8,
            zorder=8
        )
        self.ax.axvline(
            0,
            color="#5eead4",
            linewidth=1.8,
            zorder=8
        )

        self.ax.tick_params(
            colors=MUTED,
            labelsize=8
        )

        for s in self.ax.spines.values():
            s.set_color("#334155")

        self.ax.set_xlabel(
            "x",
            color=TEXT,
            fontsize=12,
            fontweight="bold"
        )
        self.ax.set_ylabel(
            "y",
            color=TEXT,
            fontsize=12,
            fontweight="bold"
        )

        self.ax.text(
            0.13, -0.28,
            "O",
            color=MUTED,
            fontsize=9,
            fontweight="bold"
        )

    def shade_constraint(self, c):
        x = np.linspace(X_MIN, X_MAX, 900)

        if c["b"] == 0:
            xv = c["c"] / c["a"]

            if c["sense"] == ">=":
                self.ax.axvspan(
                    xv, X_MAX,
                    color=c["color"],
                    alpha=0.045,
                    zorder=1
                )
            else:
                self.ax.axvspan(
                    X_MIN, xv,
                    color=c["color"],
                    alpha=0.045,
                    zorder=1
                )
            return

        if c["a"] == 0:
            yv = c["c"] / c["b"]

            if c["sense"] == ">=":
                self.ax.axhspan(
                    yv, Y_MAX,
                    color=c["color"],
                    alpha=0.045,
                    zorder=1
                )
            else:
                self.ax.axhspan(
                    Y_MIN, yv,
                    color=c["color"],
                    alpha=0.045,
                    zorder=1
                )
            return

        y = self.line_y(c, x)

        if c["sense"] == "<=":
            self.ax.fill_between(
                x, Y_MIN, y,
                where=(y > Y_MIN),
                color=c["color"],
                alpha=0.045,
                zorder=1
            )
        else:
            self.ax.fill_between(
                x, y, Y_MAX,
                where=(y < Y_MAX),
                color=c["color"],
                alpha=0.045,
                zorder=1
            )

    def draw_constraint(self, c, selected=False):
        x = np.linspace(X_MIN, X_MAX, 900)

        lw = 3.2 if selected else 1.6
        alpha = 1.0 if selected else 0.65

        if c["b"] == 0:
            xv = c["c"] / c["a"]
            self.ax.axvline(
                xv,
                color=c["color"],
                linewidth=lw,
                alpha=alpha,
                zorder=10
            )
            return

        if c["a"] == 0:
            yv = c["c"] / c["b"]
            self.ax.axhline(
                yv,
                color=c["color"],
                linewidth=lw,
                alpha=alpha,
                zorder=10
            )
            return

        y = self.line_y(c, x)

        self.ax.plot(
            x, y,
            color=c["color"],
            linewidth=lw,
            alpha=alpha,
            solid_capstyle="round",
            zorder=10
        )

    def draw_feasible_region(self, vertices):
        if len(vertices) < 3:
            return

        poly = Polygon(
            vertices,
            closed=True,
            facecolor="#6366f1",
            edgecolor="#a5b4fc",
            linewidth=1.8,
            alpha=0.24,
            zorder=6
        )
        self.ax.add_patch(poly)

        center = vertices.mean(axis=0)

        self.ax.text(
            center[0],
            center[1],
            "FEASIBLE\nREGION",
            ha="center",
            va="center",
            fontsize=8.5,
            fontweight="bold",
            color="#e0e7ff",
            bbox=dict(
                boxstyle="round,pad=0.55",
                facecolor="#111b32",
                edgecolor="#6366f1",
                alpha=0.9
            ),
            zorder=30
        )

    def draw_vertices(self, vertices):
        if not self.show_vertices:
            return

        for i, (x, y) in enumerate(vertices, 1):
            self.ax.scatter(
                x, y,
                s=38,
                color="#f8fafc",
                edgecolor="#6366f1",
                linewidth=1.5,
                zorder=25
            )

            self.ax.annotate(
                f"P{i} ({x:.2f}, {y:.2f})",
                (x, y),
                xytext=(7, 7),
                textcoords="offset points",
                fontsize=7.5,
                color="#e2e8f0",
                bbox=dict(
                    boxstyle="round,pad=0.25",
                    facecolor="#111b32",
                    edgecolor="#334155",
                    alpha=0.9
                ),
                zorder=30
            )

    def draw_legend(self):
        y0 = 0.94

        self.ax.text(
            0.025, y0,
            "BOUNDARY LINES",
            transform=self.ax.transAxes,
            fontsize=7,
            color=MUTED,
            fontweight="bold"
        )

        for i, c in enumerate(CONSTRAINTS):
            self.ax.plot(
                [0.025, 0.065],
                [y0 - 0.045 - i * 0.04] * 2,
                transform=self.ax.transAxes,
                color=c["color"],
                linewidth=2.5 if i == self.selected else 1.6,
                alpha=1 if i == self.selected else 0.7,
                clip_on=False
            )
            self.ax.text(
                0.075,
                y0 - 0.045 - i * 0.04,
                c["plain"],
                transform=self.ax.transAxes,
                color=c["color"],
                fontsize=7.2,
                va="center",
                fontweight="bold" if i == self.selected else "normal"
            )

    # --------------------------------------------------------
    # Explanation
    # --------------------------------------------------------

    def explanation_text(self):
        c = CONSTRAINTS[self.selected]
        vertices = self.find_vertices()

        if c["sense"] == "<=":
            relation = "LESS THAN OR EQUAL TO"
            side = "the region BELOW the boundary line"
        else:
            relation = "GREATER THAN OR EQUAL TO"
            side = "the region ABOVE the boundary line"

        if c["b"] != 0:
            equation = (
                f"y = ({c['c']} - {c['a']}x) / {c['b']}"
            )

            if c["a"] == 0:
                equation = f"y = {c['c'] / c['b']:g}"
        elif c["a"] != 0:
            equation = f"x = {c['c'] / c['a']:g}"
        else:
            equation = "Invalid boundary"

        lines = [
            "SELECTED CONSTRAINT",
            "────────────────────────",
            c["plain"],
            "",
            "1  Boundary",
            f"   {equation}",
            "",
            "2  Inequality meaning",
            f"   {relation}",
            "",
            "3  Which side?",
            f"   {side}",
            "",
            "4  Boundary inclusion",
            (
                "   Included because the sign contains '='."
                if "=" in c["sense"]
                else
                "   Not included because the sign is strict."
            ),
            "",
            "5  Feasible region",
            "   The final feasible region is the",
            "   overlap satisfying ALL constraints.",
            "",
            "LEARNING TIP",
            "────────────────────────",
            "For an inequality, first draw its",
            "boundary equation. Then determine",
            "which side satisfies the inequality.",
        ]

        if len(vertices) > 0:
            lines += [
                "",
                f"CURRENTLY FOUND: {len(vertices)} feasible "
                f"corner point(s)"
            ]

        return "\n".join(lines)

    def draw_info_panel(self):
        self.ax_info.clear()
        self.ax_info.set_xticks([])
        self.ax_info.set_yticks([])

        for s in self.ax_info.spines.values():
            s.set_color(BORDER)

        c = CONSTRAINTS[self.selected]

        self.ax_info.text(
            0.06, 0.95,
            "SOLUTION & EXPLANATION",
            transform=self.ax_info.transAxes,
            fontsize=10,
            color=TEXT,
            fontweight="bold",
            va="top"
        )

        self.ax_info.text(
            0.06, 0.885,
            self.explanation_text(),
            transform=self.ax_info.transAxes,
            fontsize=8.4,
            color="#cbd5e1",
            va="top",
            linespacing=1.42
        )

        self.ax_info.text(
            0.06, 0.055,
            "Selected:",
            transform=self.ax_info.transAxes,
            fontsize=7.5,
            color=MUTED
        )

        self.ax_info.text(
            0.06, 0.025,
            c["plain"],
            transform=self.ax_info.transAxes,
            fontsize=9,
            color=c["color"],
            fontweight="bold"
        )

    # --------------------------------------------------------
    # Bottom badges
    # --------------------------------------------------------

    def draw_badges(self):
        self.ax_badges.clear()
        self.ax_badges.set_axis_off()

        vertices = self.find_vertices()

        badges = [
            (
                f"{len(CONSTRAINTS)} constraints",
                "#35105c",
                "#e9d5ff"
            ),
            (
                "✓ All constraints shown"
                if self.show_all_boundaries
                else "○ Boundaries filtered",
                "#063c36",
                "#86efac"
            ),
            (
                "Shading ON"
                if self.show_shading
                else "Shading OFF",
                "#3a2800",
                "#fcd34d"
            ),
            (
                f"Feasible vertices: {len(vertices)}",
                "#172554",
                "#bfdbfe"
            ),
        ]

        x = 0.02

        for label, face, color in badges:
            self.ax_badges.text(
                x, 0.5,
                label,
                transform=self.ax_badges.transAxes,
                va="center",
                ha="left",
                fontsize=8.5,
                color=color,
                fontweight="bold",
                bbox=dict(
                    boxstyle="round,pad=0.45",
                    facecolor=face,
                    edgecolor="none"
                )
            )
            x += 0.19

    # --------------------------------------------------------
    # Refresh
    # --------------------------------------------------------

    def refresh(self):
        self.ax.clear()
        self.setup_axes()

        # Shading
        if self.show_shading:
            for c in CONSTRAINTS:
                self.shade_constraint(c)

        # Feasible region
        vertices = self.find_vertices()
        self.draw_feasible_region(vertices)

        # Boundaries
        if self.show_all_boundaries:
            for i, c in enumerate(CONSTRAINTS):
                self.draw_constraint(
                    c,
                    selected=(i == self.selected)
                )
        else:
            self.draw_constraint(
                CONSTRAINTS[self.selected],
                selected=True
            )

        # Vertices
        self.draw_vertices(vertices)

        # Legend
        self.draw_legend()

        # Update button appearance
        for i, b in enumerate(self.constraint_buttons):
            b.ax.set_facecolor(
                ACCENT if i == self.selected else "#18253e"
            )

        self.draw_info_panel()
        self.draw_badges()

        self.fig.canvas.draw_idle()

    # --------------------------------------------------------
    # Button callbacks
    # --------------------------------------------------------

    def select_constraint(self, index):
        self.selected = index
        self.refresh()

    def toggle_shading(self, event):
        self.show_shading = not self.show_shading
        self.btn_shading.label.set_text(
            "Hide Shading"
            if self.show_shading
            else "Show Shading"
        )
        self.refresh()

    def toggle_boundaries(self, event):
        self.show_all_boundaries = not self.show_all_boundaries
        self.btn_boundary.label.set_text(
            "Hide Boundaries"
            if self.show_all_boundaries
            else "Show Boundaries"
        )
        self.refresh()

    def toggle_vertices(self, event):
        self.show_vertices = not self.show_vertices
        self.btn_vertices.label.set_text(
            "Hide Vertices"
            if self.show_vertices
            else "Show Vertices"
        )
        self.refresh()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    app = ConstraintExplorerPro()

    # IMPORTANT:
    # Keep the Matplotlib GUI window alive and responsive.
    plt.show()
