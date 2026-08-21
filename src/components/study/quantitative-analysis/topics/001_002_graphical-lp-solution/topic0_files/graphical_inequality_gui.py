import tkinter as tk
from tkinter import ttk, messagebox

import numpy as np
import sympy as sp

import matplotlib
matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.patches import FancyBboxPatch


# ============================================================
# CODER & ACCOTAX
# Graphical Representation of Linear Equations & Inequalities
# ============================================================


class GraphicalAnalysisApp:

    def __init__(self, root):

        self.root = root

        self.root.title(
            "Coder & AccoTax - Graphical Analysis"
        )

        self.root.geometry("1400x850")

        self.root.minsize(1100, 700)


        # ----------------------------------------------------
        # Colors
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
        # Create GUI
        # ----------------------------------------------------

        self.create_header()

        self.create_input_section()

        self.create_main_area()

        self.create_footer()


        # ----------------------------------------------------
        # Create initial graph
        # ----------------------------------------------------

        self.show_welcome()


    # ========================================================
    # HEADER
    # ========================================================

    def create_header(self):

        header = tk.Frame(
            self.root,
            bg=self.header_color,
            height=100
        )

        header.pack(
            fill="x"
        )

        header.pack_propagate(
            False
        )


        # Organisation name

        tk.Label(
            header,
            text="Coder & AccoTax",
            bg=self.header_color,
            fg="white",
            font=("Segoe UI", 24, "bold")
        ).pack(
            pady=(12, 0)
        )


        # Course title

        tk.Label(
            header,
            text=(
                "Graphical Representation of "
                "Linear Equations & Inequalities"
            ),
            bg=self.header_color,
            fg="#DCEAF3",
            font=("Segoe UI", 13)
        ).pack()


        # Tagline

        tk.Label(
            header,
            text="Developing Human Resource Since 1997",
            bg=self.header_color,
            fg="#B8D8E8",
            font=("Segoe UI", 9)
        ).pack(
            pady=(2, 5)
        )


    # ========================================================
    # INPUT SECTION
    # ========================================================

    def create_input_section(self):

        frame = tk.Frame(
            self.root,
            bg=self.bg_color
        )

        frame.pack(
            fill="x",
            padx=25,
            pady=15
        )


        # Input label

        tk.Label(
            frame,
            text="Enter Equation / Inequality:",
            bg=self.bg_color,
            fg=self.text_color,
            font=("Segoe UI", 12, "bold")
        ).pack(
            side="left"
        )


        # Entry

        self.input_var = tk.StringVar()

        self.entry = ttk.Entry(
            frame,
            textvariable=self.input_var,
            font=("Consolas", 13),
            width=38
        )

        self.entry.pack(
            side="left",
            padx=12
        )


        self.entry.insert(
            0,
            "y <= 2*x + 1"
        )


        # Plot button

        self.plot_button = tk.Button(
            frame,
            text="  Plot Graph  ",
            command=self.plot_graph,
            bg=self.button_color,
            fg="white",
            activebackground="#155A68",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=10,
            pady=6
        )

        self.plot_button.pack(
            side="left",
            padx=5
        )


        # Clear button

        self.clear_button = tk.Button(
            frame,
            text="  Clear  ",
            command=self.clear_all,
            bg="#6B7280",
            fg="white",
            activebackground="#4B5563",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=10,
            pady=6
        )

        self.clear_button.pack(
            side="left",
            padx=5
        )


        # Reset button

        self.reset_button = tk.Button(
            frame,
            text="  Reset View  ",
            command=self.reset_view,
            bg="#374151",
            fg="white",
            activebackground="#1F2937",
            activeforeground="white",
            font=("Segoe UI", 10, "bold"),
            relief="flat",
            cursor="hand2",
            padx=10,
            pady=6
        )

        self.reset_button.pack(
            side="left",
            padx=5
        )


        # Enter key support

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
        # Graph panel
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


        # ----------------------------------------------------
        # Matplotlib figure
        # ----------------------------------------------------

        self.figure = Figure(
            figsize=(8, 6),
            dpi=100
        )

        self.ax = self.figure.add_subplot(
            111
        )


        self.canvas = FigureCanvasTkAgg(
            self.figure,
            master=graph_frame
        )

        self.canvas.get_tk_widget().pack(
            fill="both",
            expand=True
        )


        # ----------------------------------------------------
        # Explanation panel
        # ----------------------------------------------------

        explanation_frame = tk.Frame(
            main,
            bg="white",
            bd=1,
            relief="solid",
            width=360
        )

        explanation_frame.pack(
            side="right",
            fill="y"
        )

        explanation_frame.pack_propagate(
            False
        )


        # Explanation title

        tk.Label(
            explanation_frame,
            text="Solution & Explanation",
            bg=self.accent_color,
            fg="white",
            font=("Segoe UI", 13, "bold"),
            pady=10
        ).pack(
            fill="x"
        )


        # Text area

        text_container = tk.Frame(
            explanation_frame,
            bg="white"
        )

        text_container.pack(
            fill="both",
            expand=True,
            padx=12,
            pady=12
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
            padx=10,
            pady=10,
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

        footer.pack_propagate(
            False
        )


        tk.Label(
            footer,
            text=(
                "Coder & AccoTax   |   "
                "Developing Human Resource Since 1997   |   "
                "☎ 7003756860   |   "
                "🌐 codernaccotax.co.in"
            ),
            bg=self.header_color,
            fg="white",
            font=("Segoe UI", 9, "bold")
        ).pack(
            pady=13
        )


    # ========================================================
    # SHOW WELCOME
    # ========================================================

    def show_welcome(self):

        self.ax.clear()

        self.ax.set_title(
            "Enter an equation or inequality",
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
            "────────────────────────\n\n"

            "Enter a linear equation or inequality.\n\n"

            "Examples:\n\n"

            "Equation:\n"
            "  y = 2*x + 1\n\n"

            "Less than:\n"
            "  y < 2*x + 1\n\n"

            "Less than or equal:\n"
            "  y <= 2*x + 1\n\n"

            "Greater than:\n"
            "  y > 2*x + 1\n\n"

            "Greater than or equal:\n"
            "  y >= 2*x + 1\n\n"

            "Press 'Plot Graph' or ENTER."
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
    # PLOT GRAPH
    # ========================================================

    def plot_graph(self):

        user_input = self.input_var.get().strip()


        if not user_input:

            messagebox.showwarning(
                "Input Required",
                "Please enter an equation or inequality."
            )

            return


        try:

            self.process_expression(
                user_input
            )

        except Exception as error:

            messagebox.showerror(
                "Invalid Expression",
                "The expression could not be understood.\n\n"
                "Examples:\n"
                "y = 2*x + 1\n"
                "y <= 2*x + 1\n"
                "y > -x + 5\n\n"
                f"Details:\n{error}"
            )


    # ========================================================
    # PROCESS EXPRESSION
    # ========================================================

    def process_expression(
        self,
        user_input
    ):

        # ----------------------------------------------------
        # Detect operator
        # ----------------------------------------------------

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

            raise ValueError(
                "Use =, <, >, <= or >=."
            )


        # ----------------------------------------------------
        # Split expression
        # ----------------------------------------------------

        left_side, right_side = user_input.split(
            operator,
            1
        )


        left_side = left_side.strip()

        right_side = right_side.strip()


        # ----------------------------------------------------
        # Symbols
        # ----------------------------------------------------

        x, y = sp.symbols(
            "x y"
        )


        # ----------------------------------------------------
        # Convert expressions
        # ----------------------------------------------------

        left_expr = sp.sympify(
            left_side,
            locals={
                "x": x,
                "y": y
            }
        )


        right_expr = sp.sympify(
            right_side,
            locals={
                "x": x,
                "y": y
            }
        )


        # ----------------------------------------------------
        # Current version expects y on left
        # ----------------------------------------------------

        if left_expr != y:

            raise ValueError(
                "Currently the equation must have y on the left.\n\n"
                "Example:\n"
                "y <= 2*x + 3"
            )


        # ----------------------------------------------------
        # Graph range
        # ----------------------------------------------------

        x_min = -10
        x_max = 10

        y_min = -22
        y_max = 23

        resolution = 600


        # ----------------------------------------------------
        # X values
        # ----------------------------------------------------

        x_values = np.linspace(
            x_min,
            x_max,
            resolution
        )


        # ----------------------------------------------------
        # Convert SymPy to NumPy
        # ----------------------------------------------------

        rhs_function = sp.lambdify(
            x,
            right_expr,
            modules="numpy"
        )


        # ----------------------------------------------------
        # Boundary
        # ----------------------------------------------------

        boundary_y = rhs_function(
            x_values
        )


        # ----------------------------------------------------
        # Clear graph
        # ----------------------------------------------------

        self.ax.clear()


        # ====================================================
        # EQUATION
        # ====================================================

        if problem_type == "equation":

            self.ax.plot(
                x_values,
                boundary_y,
                linestyle="-",
                linewidth=2.5,
                label=(
                    f"y = "
                    f"{sp.sstr(right_expr)}"
                )
            )


            explanation = self.equation_explanation(
                right_expr
            )


        # ====================================================
        # INEQUALITY
        # ====================================================

        else:

            # ------------------------------------------------
            # Grid
            # ------------------------------------------------

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


            # ------------------------------------------------
            # Boundary values
            # ------------------------------------------------

            Z = rhs_function(
                X
            )


            # ------------------------------------------------
            # Determine solution
            # ------------------------------------------------

            if operator == "<":

                solution = Y < Z

                direction = (
                    "BELOW the boundary line"
                )

            elif operator == "<=":

                solution = Y <= Z

                direction = (
                    "BELOW the boundary line"
                )

            elif operator == ">":

                solution = Y > Z

                direction = (
                    "ABOVE the boundary line"
                )

            else:

                solution = Y >= Z

                direction = (
                    "ABOVE the boundary line"
                )


            # ------------------------------------------------
            # Line style
            # ------------------------------------------------

            if operator in [
                "<=",
                ">="
            ]:

                line_style = "-"

                boundary_description = (
                    "Solid line\n"
                    "Boundary is included."
                )

            else:

                line_style = "--"

                boundary_description = (
                    "Dashed line\n"
                    "Boundary is NOT included."
                )


            # ------------------------------------------------
            # Draw boundary
            # ------------------------------------------------

            self.ax.plot(
                x_values,
                boundary_y,
                linestyle=line_style,
                linewidth=2.5,
                label=(
                    f"Boundary: y = "
                    f"{sp.sstr(right_expr)}"
                )
            )


            # ------------------------------------------------
            # Shade solution
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


            # =================================================
            # FIND TEST POINT
            # =================================================

            test_points = [
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


            for px, py in test_points:

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


            # ------------------------------------------------
            # Test point
            # ------------------------------------------------

            boundary_at_test = float(
                rhs_function(
                    test_x
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
            # Plot test point
            # ------------------------------------------------

            self.ax.scatter(
                test_x,
                test_y,
                s=80,
                zorder=5,
                label=(
                    f"Test point "
                    f"({test_x}, {test_y})"
                )
            )


            self.ax.annotate(
                f"({test_x}, {test_y})",
                (
                    test_x,
                    test_y
                ),
                xytext=(
                    10,
                    10
                ),
                textcoords="offset points"
            )


            # ------------------------------------------------
            # Explanation
            # ------------------------------------------------

            explanation = (
                self.inequality_explanation(
                    left_expr,
                    right_expr,
                    operator,
                    direction,
                    boundary_description,
                    test_x,
                    test_y,
                    rhs_function,
                    test_result
                )
            )


        # ====================================================
        # GRAPH FORMATTING
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
            "X-axis",
            fontsize=10
        )

        self.ax.set_ylabel(
            "Y-axis",
            fontsize=10
        )


        self.ax.set_title(
            f"Graphical Representation:\n"
            f"{user_input}",
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


        # ====================================================
        # DRAW
        # ====================================================

        self.figure.tight_layout()

        self.canvas.draw()


        # ====================================================
        # SHOW EXPLANATION
        # ====================================================

        self.set_explanation(
            explanation
        )


    # ========================================================
    # EQUATION EXPLANATION
    # ========================================================

    def equation_explanation(
        self,
        right_expr
    ):

        return (
            "EQUATION EXPLANATION\n"
            "────────────────────────\n\n"

            "Equation:\n"
            f"y = {sp.sstr(right_expr)}\n\n"

            "Type:\n"
            "Linear Equation\n\n"

            "Boundary:\n"
            "Solid straight line\n\n"

            "Solution:\n"
            "All points lying ON the line.\n\n"

            "There is no shaded region\n"
            "because an equation represents\n"
            "a line rather than a region.\n\n"

            "KEY IDEA\n"
            "Every point on this line\n"
            "satisfies the equation."
        )


    # ========================================================
    # INEQUALITY EXPLANATION
    # ========================================================

    def inequality_explanation(
        self,
        left_expr,
        right_expr,
        operator,
        direction,
        boundary_description,
        test_x,
        test_y,
        rhs_function,
        test_result
    ):

        rhs_at_test = sp.simplify(
            right_expr.subs(
                sp.Symbol("x"),
                test_x
            )
        )


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


        if test_result:

            result = (
                "TRUE ✓\n\n"
                "The test point satisfies\n"
                "the inequality.\n\n"
                "Therefore, the region\n"
                "containing the test point\n"
                "is the solution region."
            )

        else:

            result = (
                "FALSE ✗\n\n"
                "The test point does NOT satisfy\n"
                "the inequality.\n\n"
                "Therefore, the opposite region\n"
                "contains the solution."
            )


        return (
            "SOLUTION EXPLANATION\n"
            "────────────────────────\n\n"

            "Inequality:\n"
            f"y {operator} "
            f"{sp.sstr(right_expr)}\n\n"

            "Boundary equation:\n"
            f"y = {sp.sstr(right_expr)}\n\n"

            "BOUNDARY\n"
            "────────────────────────\n"
            f"{boundary_description}\n\n"

            "SOLUTION REGION\n"
            "────────────────────────\n"
            f"Shade the region {direction}.\n\n"

            "TEST POINT\n"
            "────────────────────────\n"
            f"Point: ({test_x}, {test_y})\n\n"

            "Substitution:\n"
            f"{test_statement}\n\n"

            f"{result}"
        )


    # ========================================================
    # CLEAR
    # ========================================================

    def clear_all(self):

        self.input_var.set("")

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
            "y <= 2*x + 1"
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