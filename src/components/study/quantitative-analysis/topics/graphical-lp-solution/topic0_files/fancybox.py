import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button
from matplotlib.patches import FancyBboxPatch


# ============================================================
# CONFIGURATION
# ============================================================

CONSTRAINTS = [
    {
        "text": r"$2x + 3y \leq 12$",
        "type": "<=",
        "a": 2,
        "b": 3,
        "c": 12,
        "color": "#8b5cf6",
    },
    {
        "text": r"$x + 2y \leq 8$",
        "type": "<=",
        "a": 1,
        "b": 2,
        "c": 8,
        "color": "#64748b",
    },
    {
        "text": r"$x \geq 0$",
        "type": ">=",
        "a": 1,
        "b": 0,
        "c": 0,
        "color": "#34d399",
    },
    {
        "text": r"$y \geq 0$",
        "type": ">=",
        "a": 0,
        "b": 1,
        "c": 0,
        "color": "#34d399",
    },
    {
        "text": r"$x + y \geq 4$",
        "type": ">=",
        "a": 1,
        "b": 1,
        "c": 4,
        "color": "#ef4444",
    },
]


# ============================================================
# GRAPH SETTINGS
# ============================================================

X_MIN = -0.5
X_MAX = 5
Y_MIN = -0.5
Y_MAX = 5

BG = "#050b20"
CARD = "#0a1229"
GRAPH_BG = "#0d172c"
GRID = "#1e2b45"
TEXT = "#e5e7eb"
MUTED = "#94a3b8"


# ============================================================
# APPLICATION
# ============================================================

class ConstraintExplorer:

    def __init__(self):

        self.selected = 0
        self.show_shading = True

        # ----------------------------------------------------
        # Figure
        # ----------------------------------------------------

        self.fig = plt.figure(
            figsize=(12, 9),
            facecolor=BG
        )

        # ----------------------------------------------------
        # Main dark card
        # ----------------------------------------------------

        self.card = FancyBboxPatch(
            (0.015, 0.025),
            0.97,
            0.95,
            transform=self.fig.transFigure,
            boxstyle="round,pad=0.012,rounding_size=0.02",
            facecolor=CARD,
            edgecolor="#243451",
            linewidth=1.2,
            zorder=-10
        )

        self.fig.patches.append(self.card)

        # ----------------------------------------------------
        # Title
        # ----------------------------------------------------

        self.fig.text(
            0.06,
            0.905,
            "⚑",
            fontsize=18,
            color="#f8fafc"
        )

        self.fig.text(
            0.102,
            0.905,
            "Explore Multiple Constraints",
            fontsize=22,
            fontweight="bold",
            color="#f8fafc"
        )

        self.fig.text(
            0.05,
            0.855,
            "Click on a constraint to highlight it. Toggle all constraints "
            "on/off to see each one individually. The feasible region is "
            "where ALL constraints overlap.",
            fontsize=11,
            color="#cbd5e1",
            linespacing=1.6
        )

        # ----------------------------------------------------
        # Toggle button
        # ----------------------------------------------------

        self.ax_toggle = self.fig.add_axes(
            [0.05, 0.765, 0.13, 0.043]
        )

        self.toggle_button = Button(
            self.ax_toggle,
            "Hide All Shading",
            color="#a900ff",
            hovercolor="#c000ff"
        )

        self.toggle_button.label.set_color("white")
        self.toggle_button.label.set_fontsize(10)
        self.toggle_button.on_clicked(
            self.toggle_shading
        )

        # ----------------------------------------------------
        # Constraint buttons
        # ----------------------------------------------------

        self.constraint_buttons = []

        x_positions = [
            0.05,
            0.18,
            0.292,
            0.365,
            0.438
        ]

        widths = [
            0.12,
            0.10,
            0.065,
            0.065,
            0.09
        ]

        for i, constraint in enumerate(CONSTRAINTS):

            ax = self.fig.add_axes(
                [
                    x_positions[i],
                    0.695,
                    widths[i],
                    0.042
                ]
            )

            button = Button(
                ax,
                constraint["text"],
                color="#1b2942",
                hovercolor="#2b3b59"
            )

            button.label.set_color("#dbeafe")
            button.label.set_fontsize(9)

            button.on_clicked(
                lambda event, index=i:
                self.select_constraint(index)
            )

            self.constraint_buttons.append(button)

        # ----------------------------------------------------
        # Graph
        # ----------------------------------------------------

        self.ax = self.fig.add_axes(
            [0.275, 0.13, 0.45, 0.53],
            facecolor=GRAPH_BG
        )

        self.setup_graph()

        # ----------------------------------------------------
        # Status badges
        # ----------------------------------------------------

        self.ax_badge1 = self.fig.add_axes(
            [0.265, 0.075, 0.105, 0.035]
        )

        self.ax_badge2 = self.fig.add_axes(
            [0.375, 0.075, 0.145, 0.035]
        )

        self.ax_badge3 = self.fig.add_axes(
            [0.525, 0.075, 0.195, 0.035]
        )

        self.create_badges()

        self.draw()

        plt.show()

    # ========================================================
    # GRAPH SETUP
    # ========================================================

    def setup_graph(self):

        self.ax.set_xlim(
            X_MIN,
            X_MAX
        )

        self.ax.set_ylim(
            Y_MIN,
            Y_MAX
        )

        self.ax.set_aspect(
            "equal",
            adjustable="box"
        )

        # Grid
        self.ax.grid(
            True,
            color=GRID,
            linewidth=0.8,
            alpha=0.8
        )

        # Remove normal spines
        for spine in self.ax.spines.values():
            spine.set_color("#263754")

        # ----------------------------------------------------
        # X/Y axes
        # ----------------------------------------------------

        self.ax.axhline(
            0,
            color="#5eead4",
            linewidth=2,
            zorder=5
        )

        self.ax.axvline(
            0,
            color="#5eead4",
            linewidth=2,
            zorder=5
        )

        self.ax.set_xlabel(
            "x",
            color="#dbeafe",
            fontsize=14,
            fontweight="bold"
        )

        self.ax.set_ylabel(
            "y",
            color="#dbeafe",
            fontsize=14,
            fontweight="bold"
        )

        self.ax.tick_params(
            colors="#94a3b8",
            labelsize=8
        )

        # Origin
        self.ax.text(
            0.12,
            -0.35,
            "O",
            color="#94a3b8",
            fontsize=10,
            fontweight="bold"
        )

        # Arrow-like axis labels
        self.ax.text(
            X_MAX - 0.2,
            -0.25,
            "x",
            color="#dbeafe",
            fontsize=14,
            fontweight="bold"
        )

        self.ax.text(
            0.15,
            Y_MAX - 0.2,
            "y",
            color="#dbeafe",
            fontsize=14,
            fontweight="bold"
        )

    # ========================================================
    # DRAW GRAPH
    # ========================================================

    def draw(self):

        self.ax.clear()

        self.setup_graph()

        x = np.linspace(
            X_MIN,
            X_MAX,
            800
        )

        # ----------------------------------------------------
        # Draw each constraint
        # ----------------------------------------------------

        for i, constraint in enumerate(CONSTRAINTS):

            a = constraint["a"]
            b = constraint["b"]
            c = constraint["c"]

            color = constraint["color"]

            # ------------------------------------------------
            # Vertical line
            # ------------------------------------------------

            if b == 0:

                x_value = c / a

                self.ax.axvline(
                    x_value,
                    color=color,
                    linewidth=2.2,
                    alpha=0.95,
                    zorder=4
                )

                if self.show_shading:

                    if constraint["type"] == ">=":

                        self.ax.axvspan(
                            x_value,
                            X_MAX,
                            color=color,
                            alpha=0.07,
                            zorder=1
                        )

                    else:

                        self.ax.axvspan(
                            X_MIN,
                            x_value,
                            color=color,
                            alpha=0.07,
                            zorder=1
                        )

                continue

            # ------------------------------------------------
            # Horizontal line
            # ------------------------------------------------

            if a == 0:

                y_value = c / b

                self.ax.axhline(
                    y_value,
                    color=color,
                    linewidth=2.2,
                    alpha=0.95,
                    zorder=4
                )

                if self.show_shading:

                    if constraint["type"] == ">=":

                        self.ax.axhspan(
                            y_value,
                            Y_MAX,
                            color=color,
                            alpha=0.07,
                            zorder=1
                        )

                    else:

                        self.ax.axhspan(
                            Y_MIN,
                            y_value,
                            color=color,
                            alpha=0.07,
                            zorder=1
                        )

                continue

            # ------------------------------------------------
            # Normal line
            # ------------------------------------------------

            y = (
                c - a * x
            ) / b

            self.ax.plot(
                x,
                y,
                color=color,
                linewidth=2.4 if i == self.selected else 1.8,
                alpha=1 if i == self.selected else 0.75,
                zorder=5
            )

            # ------------------------------------------------
            # Shade correct side
            # ------------------------------------------------

            if self.show_shading:

                boundary = y

                if constraint["type"] == "<=":

                    self.ax.fill_between(
                        x,
                        Y_MIN,
                        boundary,
                        where=boundary > Y_MIN,
                        color=color,
                        alpha=0.055,
                        zorder=1
                    )

                else:

                    self.ax.fill_between(
                        x,
                        boundary,
                        Y_MAX,
                        where=boundary < Y_MAX,
                        color=color,
                        alpha=0.055,
                        zorder=1
                    )

        # ----------------------------------------------------
        # Feasible region
        # ----------------------------------------------------

        self.draw_feasible_region()

        # ----------------------------------------------------
        # Highlight selected constraint
        # ----------------------------------------------------

        selected = CONSTRAINTS[
            self.selected
        ]

        # Highlight selected line again
        a = selected["a"]
        b = selected["b"]
        c = selected["c"]

        if b != 0:

            y = (
                c - a * x
            ) / b

            self.ax.plot(
                x,
                y,
                color=selected["color"],
                linewidth=3.2,
                alpha=0.95,
                zorder=10
            )

        # ----------------------------------------------------
        # Feasible label
        # ----------------------------------------------------

        self.ax.text(
            0.05,
            0.94,
            "Feasible Region:\n"
            "Overlap of ALL constraints",
            transform=self.ax.transAxes,
            fontsize=8,
            color="#94a3b8",
            va="top",
            bbox=dict(
                boxstyle="round,pad=0.5",
                facecolor="#17243a",
                edgecolor="#334155",
                alpha=0.95
            ),
            zorder=20
        )

        # ----------------------------------------------------
        # Constraint legend
        # ----------------------------------------------------

        legend_y = 0.18

        for i, constraint in enumerate(
            reversed(CONSTRAINTS)
        ):

            self.ax.text(
                0.05,
                legend_y + i * 0.035,
                constraint["text"],
                transform=self.ax.transAxes,
                color=constraint["color"],
                fontsize=7,
                fontweight="bold"
            )

        self.ax.figure.canvas.draw_idle()

    # ========================================================
    # FEASIBLE REGION
    # ========================================================

    def draw_feasible_region(self):

        # ----------------------------------------------------
        # For this example the feasible region is:
        #
        # 2x + 3y <= 12
        # x + 2y <= 8
        # x >= 0
        # y >= 0
        # x + y >= 4
        #
        # Vertices:
        #
        # (0,4)
        # (0,4)
        # (0,6?) etc.
        #
        # We calculate it numerically instead of hard coding
        # the polygon.
        # ----------------------------------------------------

        points = []

        constraints = CONSTRAINTS

        # Add intersections
        for i in range(
            len(constraints)
        ):

            for j in range(
                i + 1,
                len(constraints)
            ):

                c1 = constraints[i]
                c2 = constraints[j]

                A = np.array([
                    [c1["a"], c1["b"]],
                    [c2["a"], c2["b"]]
                ], dtype=float)

                B = np.array([
                    c1["c"],
                    c2["c"]
                ], dtype=float)

                try:

                    p = np.linalg.solve(
                        A,
                        B
                    )

                except np.linalg.LinAlgError:

                    continue

                x, y = p

                if (
                    x < X_MIN - 1e-8
                    or x > X_MAX + 1e-8
                    or y < Y_MIN - 1e-8
                    or y > Y_MAX + 1e-8
                ):
                    continue

                if self.is_feasible(
                    x,
                    y
                ):

                    points.append(
                        (x, y)
                    )

        if len(points) < 3:
            return

        # Remove duplicates
        unique = []

        for p in points:

            if not any(
                np.linalg.norm(
                    np.array(p)
                    - np.array(q)
                ) < 1e-8
                for q in unique
            ):
                unique.append(p)

        points = np.array(
            unique
        )

        # Centroid
        center = points.mean(
            axis=0
        )

        # Sort around centroid
        angles = np.arctan2(
            points[:, 1] - center[1],
            points[:, 0] - center[0]
        )

        order = np.argsort(
            angles
        )

        points = points[order]

        # Plot polygon
        self.ax.fill(
            points[:, 0],
            points[:, 1],
            color="#818cf8",
            alpha=0.16,
            edgecolor="none",
            zorder=2
        )

    # ========================================================
    # FEASIBILITY
    # ========================================================

    def is_feasible(
        self,
        x,
        y
    ):

        tolerance = 1e-7

        for c in CONSTRAINTS:

            value = (
                c["a"] * x
                + c["b"] * y
            )

            if c["type"] == "<=":

                if value > c["c"] + tolerance:
                    return False

            elif c["type"] == ">=":

                if value < c["c"] - tolerance:
                    return False

        return True

    # ========================================================
    # CONSTRAINT SELECTION
    # ========================================================

    def select_constraint(
        self,
        index
    ):

        self.selected = index

        self.update_buttons()

        self.update_badges()

        self.draw()

    # ========================================================
    # TOGGLE SHADING
    # ========================================================

    def toggle_shading(
        self,
        event
    ):

        self.show_shading = (
            not self.show_shading
        )

        if self.show_shading:

            self.toggle_button.label.set_text(
                "Hide All Shading"
            )

        else:

            self.toggle_button.label.set_text(
                "Show All Shading"
            )

        self.draw()

    # ========================================================
    # BUTTON COLORS
    # ========================================================

    def update_buttons(self):

        for i, button in enumerate(
            self.constraint_buttons
        ):

            if i == self.selected:

                button.ax.set_facecolor(
                    "#8b5cf6"
                )

            else:

                button.ax.set_facecolor(
                    "#1b2942"
                )

    # ========================================================
    # BADGES
    # ========================================================

    def create_badges(self):

        for ax in [
            self.ax_badge1,
            self.ax_badge2,
            self.ax_badge3
        ]:

            ax.set_xticks([])
            ax.set_yticks([])

            for spine in ax.spines.values():

                spine.set_visible(False)

        self.update_badges()

    def update_badges(self):

        # Clear
        for ax in [
            self.ax_badge1,
            self.ax_badge2,
            self.ax_badge3
        ]:

            ax.clear()

            ax.set_xticks([])
            ax.set_yticks([])

            for spine in ax.spines.values():

                spine.set_visible(False)

        # Badge 1
        self.ax_badge1.text(
            0.5,
            0.5,
            "5 constraints",
            ha="center",
            va="center",
            color="#e9d5ff",
            fontsize=9,
            fontweight="bold",
            bbox=dict(
                boxstyle="round,pad=0.45",
                facecolor="#32105a",
                edgecolor="none"
            )
        )

        # Badge 2
        status = (
            "✓ All constraints shown"
            if self.show_shading
            else "○ Shading hidden"
        )

        self.ax_badge2.text(
            0.5,
            0.5,
            status,
            ha="center",
            va="center",
            color="#86efac",
            fontsize=9,
            fontweight="bold",
            bbox=dict(
                boxstyle="round,pad=0.45",
                facecolor="#063c36",
                edgecolor="none"
            )
        )

        # Badge 3
        selected = CONSTRAINTS[
            self.selected
        ]

        self.ax_badge3.text(
            0.5,
            0.5,
            "Highlighted: "
            + selected["text"],
            ha="center",
            va="center",
            color="#fcd34d",
            fontsize=9,
            fontweight="bold",
            bbox=dict(
                boxstyle="round,pad=0.45",
                facecolor="#4a3000",
                edgecolor="none"
            )
        )

        self.fig.canvas.draw_idle()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    app = ConstraintExplorer()