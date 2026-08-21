import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime

import numpy as np
import sympy as sp

import matplotlib
matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


# ============================================================
# CODER & ACCOTAX
# Graphical Linear Equation & Inequality Analyzer - V2
# ============================================================


class GraphicalAnalysisApp:

    def __init__(self, root):

        self.root = root

        self.root.title(
            "Coder & AccoTax - Graphical Linear Equation & Inequality Analyzer"
        )

        self.root.geometry("1450x900")
        self.root.minsize(1150, 750)

        # ----------------------------------------------------
        # SymPy symbols
        # ----------------------------------------------------

        self.x, self.y = sp.symbols("x y")

        # ----------------------------------------------------
        # Theme
        # ----------------------------------------------------

        self.bg_color = "#F4F7FB"
        self.header_color = "#123B5D"
        self.accent_color = "#1F7A8C"
        self.button_color = "#1F7A8C"
        self.text_color = "#1F2937"

        self.root.configure(
            bg=self.bg_color
        )

        # ----------------------------------------------------
        # Build GUI
        # ----------------------------------------------------

        self.create_header()
        self.create_input_section()
        self.create_main_area()
        self.create_footer()

        self.show_welcome()


    # ========================================================
    # HEADER
    # ========================================================

    def create_header(self):

        header = tk.Frame(
            self.root,
            bg=self.header_color,
            height=105
        )

        header.pack(fill="x")
        header.pack_propagate(False)

        tk.Label(
            header,
            text="Coder & AccoTax",
            bg=self.header_color,
            fg="white",
            font=("Segoe UI", 24, "bold")
        ).pack(pady=(10, 0))

        tk.Label(
            header,
            text="Graphical Linear Equation & Inequality Analyzer",
            bg=self.header_color,
            fg="#DCEAF3",
            font=("Segoe UI", 13)
        ).pack()

        tk.Label(
            header,
            text="Developing Human Resource Since 1997",
            bg=self.header_color,
            fg="#B8D8E8",
            font=("Segoe UI", 9)
        ).pack(pady=(2, 5))


    # ========================================================
    # INPUT SECTION
    # ========================================================

    def create_input_section(self):

        outer = tk.Frame(
            self.root,
            bg=self.bg_color
        )

        outer.pack(
            fill="x",
            padx=25,
            pady=12
        )

        # ----------------------------------------------------
        # Input row
        # ----------------------------------------------------

        row1 = tk.Frame(
            outer,
            bg=self.bg_color
        )

        row1.pack(fill="x")

        tk.Label(
            row1,
            text="Enter Equation / Inequality:",
            bg=self.bg_color,
            fg=self.text_color,
            font=("Segoe UI", 11, "bold")
        ).pack(side="left")

        self.input_var = tk.StringVar()

        self.entry = ttk.Entry(
            row1,
            textvariable=self.input_var,
            font=("Consolas", 13),
            width=35
        )

        self.entry.pack(
            side="left",
            padx=10
        )

        self.entry.insert(
            0,
            "2*x + 3*y <= 12"
        )

        # ----------------------------------------------------
        # Plot Graph button
        # ----------------------------------------------------

        tk.Button(
            row1,
            text="Plot Graph",
            command=self.plot_graph,
            bg=self.button_color,
            fg="white",
            activebackground="#155A68",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=15,
            pady=6
        ).pack(
            side="left",
            padx=4
        )

        # ----------------------------------------------------
        # Download Graph button
        # ----------------------------------------------------

        tk.Button(
            row1,
            text="Download Graph",
            command=self.download_graph,
            bg="#2563EB",
            fg="white",
            activebackground="#1D4ED8",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=15,
            pady=6
        ).pack(
            side="left",
            padx=4
        )

        # ----------------------------------------------------
        # Clear
        # ----------------------------------------------------

        tk.Button(
            row1,
            text="Clear",
            command=self.clear_all,
            bg="#6B7280",
            fg="white",
            activebackground="#4B5563",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=15,
            pady=6
        ).pack(
            side="left",
            padx=4
        )

        # ----------------------------------------------------
        # Reset
        # ----------------------------------------------------

        tk.Button(
            row1,
            text="Reset",
            command=self.reset_view,
            bg="#374151",
            fg="white",
            activebackground="#1F2937",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=15,
            pady=6
        ).pack(
            side="left",
            padx=4
        )

        # ----------------------------------------------------
        # Examples
        # ----------------------------------------------------

        tk.Label(
            row1,
            text="  Examples:",
            bg=self.bg_color,
            fg=self.text_color,
            font=("Segoe UI", 10, "bold")
        ).pack(
            side="left",
            padx=(10, 5)
        )

        self.example_var = tk.StringVar()

        self.example_box = ttk.Combobox(
            row1,
            textvariable=self.example_var,
            state="readonly",
            width=26,
            font=("Segoe UI", 10)
        )

        self.example_box["values"] = (
            "y = 2*x + 1",
            "y <= 2*x + 1",
            "y > -x + 4",
            "2*x + 3*y <= 12",
            "x + y >= 5",
            "3*x - 2*y < 6",
            "x >= 2",
            "y <= -2*x + 6"
        )

        self.example_box.pack(
            side="left"
        )

        self.example_box.bind(
            "<<ComboboxSelected>>",
            self.load_example
        )

        # ----------------------------------------------------
        # Enter key
        # ----------------------------------------------------

        self.entry.bind(
            "<Return>",
            lambda event: self.plot_graph()
        )


    # ========================================================
    # MAIN AREA
    # ========================================================

    def create_main_area(self):

        main = tk.Frame(
            self.root,
            bg=self.bg_color
        )

        main.pack(
            fill="both",
            expand=True,
            padx=25,
            pady=(0, 10)
        )

        # ----------------------------------------------------
        # GRAPH FRAME
        # ----------------------------------------------------

        graph_frame = tk.Frame(
            main,
            bg="white",
            bd=1,
            relief="solid"
        )

        graph_frame.pack(
            side="left",
            fill="both",
            expand=True,
            padx=(0, 10)
        )

        self.figure = Figure(
            figsize=(8, 6),
            dpi=100
        )

        self.ax = self.figure.add_subplot(111)

        self.canvas = FigureCanvasTkAgg(
            self.figure,
            master=graph_frame
        )

        self.canvas.get_tk_widget().pack(
            fill="both",
            expand=True
        )

        # ----------------------------------------------------
        # EXPLANATION FRAME
        # ----------------------------------------------------

        explanation_frame = tk.Frame(
            main,
            bg="white",
            bd=1,
            relief="solid",
            width=390
        )

        explanation_frame.pack(
            side="right",
            fill="y"
        )

        explanation_frame.pack_propagate(False)

        tk.Label(
            explanation_frame,
            text="Solution & Explanation",
            bg=self.accent_color,
            fg="white",
            font=("Segoe UI", 13, "bold"),
            pady=10
        ).pack(fill="x")

        text_container = tk.Frame(
            explanation_frame,
            bg="white"
        )

        text_container.pack(
            fill="both",
            expand=True,
            padx=10,
            pady=10
        )

        scrollbar = ttk.Scrollbar(
            text_container
        )

        scrollbar.pack(
            side="right",
            fill="y"
        )

        self.explanation = tk.Text(
            text_container,
            wrap="word",
            font=("Segoe UI", 10),
            bg="#FAFAFA",
            fg=self.text_color,
            relief="flat",
            padx=12,
            pady=12,
            yscrollcommand=scrollbar.set
        )

        self.explanation.pack(
            fill="both",
            expand=True
        )

        scrollbar.config(
            command=self.explanation.yview
        )

        self.explanation.config(
            state="disabled"
        )


    # ========================================================
    # FOOTER
    # ========================================================

    def create_footer(self):

        footer = tk.Frame(
            self.root,
            bg=self.header_color,
            height=45
        )

        footer.pack(
            fill="x"
        )

        footer.pack_propagate(False)

        tk.Label(
            footer,
            text=(
                "Coder & AccoTax   |   "
                "Developing Human Resource Since 1997   |   "
                "Ph: 7003756860   |   "
                "codernaccotax.co.in"
            ),
            bg=self.header_color,
            fg="white",
            font=("Segoe UI", 9, "bold")
        ).pack(
            pady=12
        )


    # ========================================================
    # WELCOME
    # ========================================================

    def show_welcome(self):

        self.ax.clear()

        self.ax.set_title(
            "Graphical Linear Equation & Inequality Analyzer",
            fontsize=14,
            fontweight="bold"
        )

        self.ax.set_xlabel(
            "X-axis"
        )

        self.ax.set_ylabel(
            "Y-axis"
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.canvas.draw()

        self.set_explanation(
            "WELCOME\n"
            "════════════════════════\n\n"

            "Enter a linear equation or inequality.\n\n"

            "SUPPORTED EXAMPLES\n"
            "────────────────────────\n\n"

            "Equation:\n"
            "y = 2*x + 1\n\n"

            "Inequality:\n"
            "y <= 2*x + 1\n\n"

            "General form:\n"
            "2*x + 3*y <= 12\n\n"

            "Other examples:\n"
            "x + y >= 5\n"
            "3*x - 2*y < 6\n"
            "x >= 2\n\n"

            "The program automatically calculates:\n"
            "• Boundary line\n"
            "• X-intercept\n"
            "• Y-intercept\n"
            "• Solution region\n"
            "• Test point\n"
            "• Step-by-step explanation"
        )


    # ========================================================
    # SET EXPLANATION
    # ========================================================

    def set_explanation(
        self,
        text
    ):

        self.explanation.config(
            state="normal"
        )

        self.explanation.delete(
            "1.0",
            tk.END
        )

        self.explanation.insert(
            "1.0",
            text
        )

        self.explanation.config(
            state="disabled"
        )


    # ========================================================
    # LOAD EXAMPLE
    # ========================================================

    def load_example(
        self,
        event=None
    ):

        value = self.example_var.get()

        if value:

            self.input_var.set(
                value
            )

            self.plot_graph()


    # ========================================================
    # PLOT GRAPH
    # ========================================================

    def plot_graph(self):

        expression = self.input_var.get().strip()

        if not expression:

            messagebox.showwarning(
                "Input Required",
                "Please enter an equation or inequality."
            )

            return

        try:

            self.process_expression(
                expression
            )

        except Exception as error:

            messagebox.showerror(
                "Invalid Expression",
                "Could not understand the expression.\n\n"

                "Examples:\n"
                "y = 2*x + 1\n"
                "y <= 2*x + 1\n"
                "2*x + 3*y <= 12\n"
                "x + y >= 5\n\n"

                f"Details:\n{error}"
            )


    # ========================================================
    # DETECT OPERATOR
    # ========================================================

    def detect_operator(
        self,
        expression
    ):

        operators = [
            "<=",
            ">=",
            "<",
            ">",
            "="
        ]

        for op in operators:

            if op in expression:

                return op

        raise ValueError(
            "No valid operator found."
        )


    # ========================================================
    # PROCESS EXPRESSION
    # ========================================================

    def process_expression(
        self,
        user_input
    ):

        operator = self.detect_operator(
            user_input
        )

        left_text, right_text = user_input.split(
            operator,
            1
        )

        left_text = left_text.strip()
        right_text = right_text.strip()

        left_expr = sp.sympify(
            left_text,
            locals={
                "x": self.x,
                "y": self.y
            }
        )

        right_expr = sp.sympify(
            right_text,
            locals={
                "x": self.x,
                "y": self.y
            }
        )

        # ----------------------------------------------------
        # Move everything to left
        #
        # ax + by + c = 0
        # ----------------------------------------------------

        expression = sp.expand(
            left_expr - right_expr
        )

        # ----------------------------------------------------
        # Extract coefficients
        # ----------------------------------------------------

        a = expression.coeff(
            self.x
        )

        b = expression.coeff(
            self.y
        )

        c = expression.subs(
            {
                self.x: 0,
                self.y: 0
            }
        )

        a = sp.sympify(a)
        b = sp.sympify(b)
        c = sp.sympify(c)

        if a == 0 and b == 0:

            raise ValueError(
                "This is not a valid linear equation."
            )

        # ----------------------------------------------------
        # Vertical line
        #
        # x = constant
        # ----------------------------------------------------

        if b == 0:

            self.plot_vertical_line(
                a,
                c,
                operator,
                user_input
            )

            return

        # ----------------------------------------------------
        # Rearrange:
        #
        # ax + by + c = 0
        #
        # y = (-a/b)x - c/b
        # ----------------------------------------------------

        slope = sp.simplify(
            -a / b
        )

        intercept = sp.simplify(
            -c / b
        )

        boundary_expr = sp.simplify(
            slope * self.x + intercept
        )

        # ----------------------------------------------------
        # Determine final inequality direction
        # ----------------------------------------------------

        final_operator = operator

        if operator != "=" and b < 0:

            reverse = {
                "<": ">",
                ">": "<",
                "<=": ">=",
                ">=": "<="
            }

            final_operator = reverse[
                operator
            ]

        # ----------------------------------------------------
        # Intercepts
        # ----------------------------------------------------

        x_intercept = None
        y_intercept = None

        if slope != 0:

            x_intercept = sp.simplify(
                -intercept / slope
            )

        y_intercept = intercept

        # ----------------------------------------------------
        # Plot
        # ----------------------------------------------------

        self.plot_general_line(
            boundary_expr,
            slope,
            intercept,
            final_operator,
            user_input,
            x_intercept,
            y_intercept
        )


    # ========================================================
    # PLOT GENERAL LINE
    # ========================================================

    def plot_general_line(
        self,
        boundary_expr,
        slope,
        intercept,
        operator,
        original_input,
        x_intercept,
        y_intercept
    ):

        x_min = -10
        x_max = 10

        x_values = np.linspace(
            x_min,
            x_max,
            800
        )

        function = sp.lambdify(
            self.x,
            boundary_expr,
            "numpy"
        )

        y_values = function(
            x_values
        )

        y_values = np.asarray(
            y_values,
            dtype=float
        )

        finite_values = y_values[
            np.isfinite(y_values)
        ]

        if len(finite_values) > 0:

            calculated_min = np.min(
                finite_values
            )

            calculated_max = np.max(
                finite_values
            )

            margin = max(
                5,
                (
                    calculated_max
                    -
                    calculated_min
                ) * 0.15
            )

            y_min = min(
                -10,
                calculated_min - margin
            )

            y_max = max(
                10,
                calculated_max + margin
            )

        else:

            y_min = -10
            y_max = 10

        y_min = max(
            y_min,
            -50
        )

        y_max = min(
            y_max,
            50
        )

        # ----------------------------------------------------
        # Clear
        # ----------------------------------------------------

        self.ax.clear()

        # ====================================================
        # EQUATION
        # ====================================================

        if operator == "=":

            self.ax.plot(
                x_values,
                y_values,
                linewidth=2.5,
                linestyle="-",
                label="Equation"
            )

            self.mark_intercepts(
                x_intercept,
                y_intercept
            )

            explanation = self.equation_steps(
                original_input,
                boundary_expr,
                x_intercept,
                y_intercept,
                slope,
                intercept
            )

        # ====================================================
        # INEQUALITY
        # ====================================================

        else:

            X, Y = np.meshgrid(
                np.linspace(
                    x_min,
                    x_max,
                    500
                ),
                np.linspace(
                    y_min,
                    y_max,
                    500
                )
            )

            boundary_values = sp.lambdify(
                self.x,
                boundary_expr,
                "numpy"
            )(X)

            # ------------------------------------------------
            # Determine solution
            # ------------------------------------------------

            if operator == "<":

                solution = Y < boundary_values
                direction = "BELOW"

            elif operator == "<=":

                solution = Y <= boundary_values
                direction = "BELOW"

            elif operator == ">":

                solution = Y > boundary_values
                direction = "ABOVE"

            else:

                solution = Y >= boundary_values
                direction = "ABOVE"

            # ------------------------------------------------
            # Boundary style
            # ------------------------------------------------

            if operator in [
                "<=",
                ">="
            ]:

                line_style = "-"

                boundary_text = (
                    "SOLID LINE\n"
                    "Boundary included."
                )

            else:

                line_style = "--"

                boundary_text = (
                    "DASHED LINE\n"
                    "Boundary not included."
                )

            # ------------------------------------------------
            # Shade
            # ------------------------------------------------

            self.ax.contourf(
                X,
                Y,
                solution.astype(float),
                levels=[
                    0.5,
                    1.5
                ],
                alpha=0.25
            )

            # ------------------------------------------------
            # Boundary
            # ------------------------------------------------

            self.ax.plot(
                x_values,
                y_values,
                linewidth=2.5,
                linestyle=line_style,
                label="Boundary"
            )

            # ------------------------------------------------
            # Intercepts
            # ------------------------------------------------

            self.mark_intercepts(
                x_intercept,
                y_intercept
            )

            # ------------------------------------------------
            # Test point
            # ------------------------------------------------

            test_x = 0
            test_y = 0

            boundary_at_test = float(
                sp.N(
                    boundary_expr.subs(
                        self.x,
                        test_x
                    )
                )
            )

            if operator == "<":

                test_result = (
                    test_y < boundary_at_test
                )

            elif operator == "<=":

                test_result = (
                    test_y <= boundary_at_test
                )

            elif operator == ">":

                test_result = (
                    test_y > boundary_at_test
                )

            else:

                test_result = (
                    test_y >= boundary_at_test
                )

            # ------------------------------------------------
            # Test point
            # ------------------------------------------------

            self.ax.scatter(
                test_x,
                test_y,
                s=70,
                zorder=5,
                label="Test Point (0,0)"
            )

            self.ax.annotate(
                "(0,0)",
                (0, 0),
                xytext=(8, 8),
                textcoords="offset points",
                fontsize=9
            )

            # ------------------------------------------------
            # Explanation
            # ------------------------------------------------

            explanation = self.inequality_steps(
                original_input,
                boundary_expr,
                operator,
                boundary_text,
                direction,
                x_intercept,
                y_intercept,
                test_x,
                test_y,
                boundary_at_test,
                test_result
            )

        # ====================================================
        # AXES
        # ====================================================

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.set_xlim(
            x_min,
            x_max
        )

        self.ax.set_ylim(
            y_min,
            y_max
        )

        self.ax.set_xlabel(
            "X-axis"
        )

        self.ax.set_ylabel(
            "Y-axis"
        )

        self.ax.set_title(
            f"Graphical Representation\n{original_input}",
            fontsize=13,
            fontweight="bold"
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.legend(
            loc="upper left",
            fontsize=8
        )

        self.figure.tight_layout()

        self.canvas.draw()

        self.set_explanation(
            explanation
        )


    # ========================================================
    # INTERCEPT MARKERS
    # ========================================================

    def mark_intercepts(
        self,
        x_intercept,
        y_intercept
    ):

        # ----------------------------------------------------
        # X-intercept
        # ----------------------------------------------------

        if x_intercept is not None:

            try:

                xi = float(
                    sp.N(
                        x_intercept
                    )
                )

                if -10 <= xi <= 10:

                    self.ax.scatter(
                        xi,
                        0,
                        s=70,
                        zorder=6
                    )

                    self.ax.annotate(
                        f"X-int ({self.format_number(xi)}, 0)",
                        (
                            xi,
                            0
                        ),
                        xytext=(8, -18),
                        textcoords="offset points",
                        fontsize=8
                    )

            except Exception:

                pass

        # ----------------------------------------------------
        # Y-intercept
        # ----------------------------------------------------

        if y_intercept is not None:

            try:

                yi = float(
                    sp.N(
                        y_intercept
                    )
                )

                if -50 <= yi <= 50:

                    self.ax.scatter(
                        0,
                        yi,
                        s=70,
                        zorder=6
                    )

                    self.ax.annotate(
                        f"Y-int (0, {self.format_number(yi)})",
                        (
                            0,
                            yi
                        ),
                        xytext=(8, 8),
                        textcoords="offset points",
                        fontsize=8
                    )

            except Exception:

                pass


    # ========================================================
    # FORMAT NUMBER
    # ========================================================

    def format_number(
        self,
        value
    ):

        if abs(
            value - round(value)
        ) < 1e-10:

            return str(
                int(
                    round(value)
                )
            )

        return f"{value:.2f}"


    # ========================================================
    # EQUATION EXPLANATION
    # ========================================================

    def equation_steps(
        self,
        original,
        boundary,
        x_intercept,
        y_intercept,
        slope,
        intercept
    ):

        return (
            "EQUATION ANALYSIS\n"
            "════════════════════════\n\n"

            "STEP 1 — Original equation\n"
            f"{original}\n\n"

            "STEP 2 — Boundary equation\n"
            f"y = {sp.sstr(boundary)}\n\n"

            "STEP 3 — Slope\n"
            f"m = {sp.sstr(slope)}\n\n"

            "STEP 4 — Y-intercept\n"
            f"b = {sp.sstr(intercept)}\n"
            f"Point = (0, {sp.sstr(intercept)})\n\n"

            "STEP 5 — X-intercept\n"
            f"x = {sp.sstr(x_intercept)}\n"
            f"Point = ({sp.sstr(x_intercept)}, 0)\n\n"

            "GRAPH\n"
            "────────────────────────\n"
            "The equation is represented\n"
            "by a SOLID straight line.\n\n"

            "SOLUTION\n"
            "────────────────────────\n"
            "Every point lying on the\n"
            "line satisfies the equation."
        )


    # ========================================================
    # INEQUALITY EXPLANATION
    # ========================================================

    def inequality_steps(
        self,
        original,
        boundary,
        operator,
        boundary_text,
        direction,
        x_intercept,
        y_intercept,
        test_x,
        test_y,
        boundary_value,
        test_result
    ):

        if operator == "<":

            comparison = (
                f"{test_y} < "
                f"{self.format_number(boundary_value)}"
            )

        elif operator == "<=":

            comparison = (
                f"{test_y} ≤ "
                f"{self.format_number(boundary_value)}"
            )

        elif operator == ">":

            comparison = (
                f"{test_y} > "
                f"{self.format_number(boundary_value)}"
            )

        else:

            comparison = (
                f"{test_y} ≥ "
                f"{self.format_number(boundary_value)}"
            )

        if test_result:

            result = (
                "TRUE ✓\n\n"
                "The test point satisfies\n"
                "the inequality.\n\n"
                "Therefore this side is\n"
                "the solution region."
            )

        else:

            result = (
                "FALSE ✗\n\n"
                "The test point does not satisfy\n"
                "the inequality.\n\n"
                "Therefore the opposite side\n"
                "is the solution region."
            )

        x_text = (
            sp.sstr(x_intercept)
            if x_intercept is not None
            else "Not available"
        )

        y_text = (
            sp.sstr(y_intercept)
            if y_intercept is not None
            else "Not available"
        )

        return (
            "INEQUALITY ANALYSIS\n"
            "════════════════════════\n\n"

            "STEP 1 — Original inequality\n"
            f"{original}\n\n"

            "STEP 2 — Boundary equation\n"
            f"y = {sp.sstr(boundary)}\n\n"

            "STEP 3 — Boundary\n"
            f"{boundary_text}\n\n"

            "STEP 4 — Intercepts\n"
            f"X-intercept = ({x_text}, 0)\n"
            f"Y-intercept = (0, {y_text})\n\n"

            "STEP 5 — Solution region\n"
            f"Shade {direction} the boundary.\n\n"

            "STEP 6 — Test point\n"
            "Choose (0, 0)\n\n"

            "Substitution:\n"
            f"{comparison}\n\n"

            "RESULT\n"
            "────────────────────────\n"
            f"{result}"
        )


    # ========================================================
    # VERTICAL LINE
    # ========================================================

    def plot_vertical_line(
        self,
        a,
        c,
        operator,
        original
    ):

        x_value = sp.simplify(
            -c / a
        )

        xv = float(
            sp.N(
                x_value
            )
        )

        x_min = xv - 10
        x_max = xv + 10

        y_min = -10
        y_max = 10

        self.ax.clear()

        # ====================================================
        # EQUATION
        # ====================================================

        if operator == "=":

            self.ax.axvline(
                xv,
                linewidth=2.5,
                label=f"x = {x_value}"
            )

            explanation = (
                "VERTICAL LINE\n"
                "════════════════════════\n\n"

                f"Equation:\n{original}\n\n"

                f"x = {sp.sstr(x_value)}\n\n"

                "The graph is a vertical line.\n\n"

                f"X-coordinate = {sp.sstr(x_value)}\n\n"

                "Every point on this vertical\n"
                "line satisfies the equation."
            )

        # ====================================================
        # VERTICAL INEQUALITY
        # ====================================================

        else:

            Y = np.linspace(
                y_min,
                y_max,
                400
            )

            X = np.linspace(
                x_min,
                x_max,
                400
            )

            XX, YY = np.meshgrid(
                X,
                Y
            )

            if operator == "<":

                solution = XX < xv
                direction = "LEFT"

            elif operator == "<=":

                solution = XX <= xv
                direction = "LEFT"

            elif operator == ">":

                solution = XX > xv
                direction = "RIGHT"

            else:

                solution = XX >= xv
                direction = "RIGHT"

            self.ax.contourf(
                XX,
                YY,
                solution.astype(float),
                levels=[
                    0.5,
                    1.5
                ],
                alpha=0.25
            )

            line_style = (
                "-"
                if operator in [
                    "<=",
                    ">="
                ]
                else "--"
            )

            self.ax.axvline(
                xv,
                linewidth=2.5,
                linestyle=line_style,
                label=f"x = {x_value}"
            )

            # ------------------------------------------------
            # Test point
            # ------------------------------------------------

            test_x = 0

            if operator == "<":

                result = test_x < xv

            elif operator == "<=":

                result = test_x <= xv

            elif operator == ">":

                result = test_x > xv

            else:

                result = test_x >= xv

            self.ax.scatter(
                test_x,
                0,
                s=70,
                zorder=5
            )

            explanation = (
                "VERTICAL INEQUALITY\n"
                "════════════════════════\n\n"

                f"Original:\n{original}\n\n"

                f"Boundary:\nx = {x_value}\n\n"

                "Boundary style:\n"
                f"{'SOLID' if line_style == '-' else 'DASHED'}\n\n"

                "Solution region:\n"
                f"Shade {direction}.\n\n"

                "Test point:\n"
                "(0, 0)\n\n"

                "Test:\n"
                f"0 {operator} "
                f"{self.format_number(xv)}\n\n"

                "Result:\n"
                f"{'TRUE ✓' if result else 'FALSE ✗'}"
            )

        # ----------------------------------------------------
        # Axes
        # ----------------------------------------------------

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.set_xlim(
            x_min,
            x_max
        )

        self.ax.set_ylim(
            y_min,
            y_max
        )

        self.ax.set_xlabel(
            "X-axis"
        )

        self.ax.set_ylabel(
            "Y-axis"
        )

        self.ax.set_title(
            f"Graphical Representation\n{original}",
            fontsize=13,
            fontweight="bold"
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.legend(
            loc="upper left"
        )

        self.figure.tight_layout()

        self.canvas.draw()

        self.set_explanation(
            explanation
        )


    # ========================================================
    # DOWNLOAD GRAPH
    # ========================================================

    def download_graph(self):

        # ----------------------------------------------------
        # Check if graph exists
        # ----------------------------------------------------

        if (
            not self.ax.lines
            and
            not self.ax.collections
        ):

            messagebox.showwarning(
                "No Graph",
                "Please plot a graph before downloading."
            )

            return

        # ----------------------------------------------------
        # Timestamp
        # ----------------------------------------------------

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        default_name = (
            f"CNAT_Graph_{timestamp}.png"
        )

        # ----------------------------------------------------
        # Save dialog
        # ----------------------------------------------------

        file_path = filedialog.asksaveasfilename(
            title="Download Graph",
            defaultextension=".png",
            initialfile=default_name,
            filetypes=[
                (
                    "PNG Image",
                    "*.png"
                ),
                (
                    "JPEG Image",
                    "*.jpg"
                ),
                (
                    "PDF Document",
                    "*.pdf"
                ),
                (
                    "SVG Image",
                    "*.svg"
                )
            ]
        )

        if not file_path:

            return

        footer_text = None

        try:

            # ------------------------------------------------
            # Add organisation footer to exported graph
            # ------------------------------------------------

            footer_text = self.figure.text(
                0.5,
                0.015,
                (
                    "Coder & AccoTax  |  "
                    "Ph: 7003756860  |  "
                    "codernaccotax.co.in"
                ),
                ha="center",
                va="bottom",
                fontsize=9,
                fontweight="bold"
            )

            # ------------------------------------------------
            # Save
            # ------------------------------------------------

            self.figure.savefig(
                file_path,
                dpi=300,
                bbox_inches="tight",
                facecolor="white"
            )

            # ------------------------------------------------
            # Remove temporary footer
            # ------------------------------------------------

            if footer_text is not None:

                footer_text.remove()

            self.canvas.draw()

            messagebox.showinfo(
                "Download Successful",
                (
                    "Graph saved successfully.\n\n"
                    f"{file_path}"
                )
            )

        except Exception as error:

            if footer_text is not None:

                try:

                    footer_text.remove()

                except Exception:

                    pass

            self.canvas.draw()

            messagebox.showerror(
                "Download Error",
                (
                    "Could not save the graph.\n\n"
                    f"{error}"
                )
            )


    # ========================================================
    # CLEAR
    # ========================================================

    def clear_all(self):

        self.input_var.set(
            ""
        )

        self.example_var.set(
            ""
        )

        self.ax.clear()

        self.ax.set_title(
            "Enter an equation or inequality",
            fontsize=14,
            fontweight="bold"
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.canvas.draw()

        self.set_explanation(
            "Enter an equation or inequality\n"
            "to begin."
        )


    # ========================================================
    # RESET
    # ========================================================

    def reset_view(self):

        self.input_var.set(
            "2*x + 3*y <= 12"
        )

        self.example_var.set(
            ""
        )

        self.plot_graph()


# ============================================================
# START APPLICATION
# ============================================================

if __name__ == "__main__":

    root = tk.Tk()

    app = GraphicalAnalysisApp(
        root
    )

    root.mainloop()