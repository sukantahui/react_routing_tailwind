import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime
import itertools
import re

import numpy as np
import sympy as sp

import matplotlib
matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


# ============================================================
# CODER & ACCOTAX
# Quantitative Analysis Learning Tool - V3
#
# Modules:
#   1. Graphical Equation / Inequality Analyzer
#   2. Graphical Method of Linear Programming
#
# Python 3.8+ compatible
# ============================================================


class GraphicalAnalysisApp:

    def __init__(self, root):
        self.root = root
        self.root.title(
            "Coder & AccoTax - Quantitative Analysis Learning Tool V3"
        )
        self.root.geometry("1500x900")
        self.root.minsize(1100, 720)

        self.x, self.y = sp.symbols("x y")

        # Theme
        self.bg_color = "#F4F7FB"
        self.header_color = "#123B5D"
        self.accent_color = "#1F7A8C"
        self.button_color = "#1F7A8C"
        self.text_color = "#1F2937"
        self.success_color = "#15803D"
        self.warning_color = "#B45309"
        self.danger_color = "#B91C1C"

        self.root.configure(bg=self.bg_color)

        # LPP state
        self.constraint_rows = []
        self.objective_var = tk.StringVar(value="3*x + 5*y")
        self.objective_type = tk.StringVar(value="Maximise")
        self.lpp_status_var = tk.StringVar(value="Ready")

        self.create_header()
        self.create_mode_bar()
        self.create_equation_section()
        self.create_lpp_section()
        self.create_main_area()

        self.show_welcome()

    # ========================================================
    # HEADER
    # ========================================================

    def create_header(self):
        header = tk.Frame(
            self.root, bg=self.header_color, height=72
        )
        header.pack(fill="x")
        header.pack_propagate(False)

        tk.Label(
            header,
            text="Coder & AccoTax",
            bg=self.header_color,
            fg="white",
            font=("Segoe UI", 19, "bold")
        ).pack(pady=(8, 0))

        tk.Label(
            header,
            text="Quantitative Analysis Learning Tool",
            bg=self.header_color,
            fg="#DCEAF3",
            font=("Segoe UI", 11)
        ).pack()

        tk.Label(
            header,
            text="Graphical Equations • Inequalities • Linear Programming",
            bg=self.header_color,
            fg="#B8D8E8",
            font=("Segoe UI", 9)
        ).pack(pady=(1, 5))

    # ========================================================
    # MODE BAR
    # ========================================================

    def create_mode_bar(self):
        bar = tk.Frame(self.root, bg="#E7EEF5", height=48)
        bar.pack(fill="x")
        bar.pack_propagate(False)

        tk.Label(
            bar,
            text="Analysis Mode:",
            bg="#E7EEF5",
            fg=self.text_color,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left", padx=(25, 10), pady=8)

        self.mode_var = tk.StringVar(value="Equation / Inequality")

        self.mode_box = ttk.Combobox(
            bar,
            textvariable=self.mode_var,
            state="readonly",
            values=(
                "Equation / Inequality",
                "Linear Programming (Graphical Method)"
            ),
            width=38,
            font=("Segoe UI", 10)
        )
        self.mode_box.pack(side="left", pady=8)
        self.mode_box.bind("<<ComboboxSelected>>", self.change_mode)

        self.mode_hint = tk.Label(
            bar,
            text="Study and graph a single linear equation or inequality.",
            bg="#E7EEF5",
            fg="#4B5563",
            font=("Segoe UI", 9)
        )
        self.mode_hint.pack(side="left", padx=15)

    # ========================================================
    # EQUATION INPUT
    # ========================================================

    def create_equation_section(self):
        self.equation_section = tk.Frame(
            self.root, bg=self.bg_color
        )
        self.equation_section.pack(
            fill="x", padx=25, pady=10
        )

        row = tk.Frame(
            self.equation_section, bg=self.bg_color
        )
        row.pack(fill="x")

        tk.Label(
            row,
            text="Enter Equation / Inequality:",
            bg=self.bg_color,
            fg=self.text_color,
            font=("Segoe UI", 11, "bold")
        ).pack(side="left")

        self.input_var = tk.StringVar()
        self.entry = ttk.Entry(
            row,
            textvariable=self.input_var,
            font=("Consolas", 13),
            width=32
        )
        self.entry.pack(side="left", padx=10)
        self.entry.insert(0, "2*x + 3*y <= 12")

        self.make_button(
            row, "Plot Graph", self.plot_graph,
            self.button_color
        ).pack(side="left", padx=3)

        self.make_button(
            row, "Download Graph", self.download_graph,
            "#2563EB"
        ).pack(side="left", padx=3)

        self.make_button(
            row, "Clear", self.clear_all,
            "#6B7280"
        ).pack(side="left", padx=3)

        self.make_button(
            row, "Reset", self.reset_view,
            "#374151"
        ).pack(side="left", padx=3)

        tk.Label(
            row,
            text="Examples:",
            bg=self.bg_color,
            fg=self.text_color,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left", padx=(15, 5))

        self.example_var = tk.StringVar()
        self.example_box = ttk.Combobox(
            row,
            textvariable=self.example_var,
            state="readonly",
            width=24,
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
        self.example_box.pack(side="left")
        self.example_box.bind(
            "<<ComboboxSelected>>", self.load_example
        )
        self.entry.bind(
            "<Return>", lambda event: self.plot_graph()
        )

    # ========================================================
    # LPP INPUT
    # ========================================================

    def create_lpp_section(self):
        self.lpp_section = tk.Frame(
            self.root, bg=self.bg_color
        )

        # Objective
        objective_card = tk.Frame(
            self.lpp_section, bg="white",
            bd=1, relief="solid"
        )
        objective_card.pack(fill="x", pady=(0, 8))

        top = tk.Frame(objective_card, bg="white")
        top.pack(fill="x", padx=12, pady=8)

        tk.Label(
            top,
            text="Objective Function",
            bg="white",
            fg=self.header_color,
            font=("Segoe UI", 11, "bold")
        ).pack(side="left")

        ttk.Combobox(
            top,
            textvariable=self.objective_type,
            state="readonly",
            values=("Maximise", "Minimise"),
            width=11,
            font=("Segoe UI", 10)
        ).pack(side="left", padx=(18, 8))

        tk.Label(
            top,
            text="Z =",
            bg="white",
            fg=self.text_color,
            font=("Segoe UI", 11, "bold")
        ).pack(side="left")

        self.objective_entry = ttk.Entry(
            top,
            textvariable=self.objective_var,
            font=("Consolas", 12),
            width=35
        )
        self.objective_entry.pack(side="left", padx=8)

        tk.Label(
            top,
            text="Example: 3*x + 5*y",
            bg="white",
            fg="#6B7280",
            font=("Segoe UI", 9)
        ).pack(side="left", padx=8)

        # Constraints
        constraint_header = tk.Frame(
            objective_card, bg="#EAF2F6"
        )
        constraint_header.pack(fill="x")

        tk.Label(
            constraint_header,
            text="Constraints",
            bg="#EAF2F6",
            fg=self.header_color,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left", padx=12, pady=6)

        self.make_button(
            constraint_header,
            "+ Add Constraint",
            self.add_constraint_row,
            self.accent_color
        ).pack(side="right", padx=8, pady=4)

        self.constraint_container = tk.Frame(
            objective_card, bg="white"
        )
        self.constraint_container.pack(
            fill="x", padx=12, pady=8
        )

        action = tk.Frame(
            objective_card, bg="white"
        )
        action.pack(fill="x", padx=12, pady=(0, 10))

        self.make_button(
            action, "Solve LPP", self.solve_lpp,
            self.success_color
        ).pack(side="left", padx=(0, 5))

        self.make_button(
            action, "Load Example", self.load_lpp_example,
            "#2563EB"
        ).pack(side="left", padx=5)

        self.make_button(
            action, "Clear Constraints",
            self.clear_constraints,
            "#6B7280"
        ).pack(side="left", padx=5)

        tk.Label(
            action,
            textvariable=self.lpp_status_var,
            bg="white",
            fg="#4B5563",
            font=("Segoe UI", 9, "italic")
        ).pack(side="left", padx=15)

        self.add_constraint_row("x + y", "<=", "10")
        self.add_constraint_row("2*x + y", "<=", "16")
        self.add_constraint_row("x", ">=", "0")
        self.add_constraint_row("y", ">=", "0")

    def add_constraint_row(self, left="", op="<=", right=""):
        row = tk.Frame(
            self.constraint_container, bg="white"
        )
        row.pack(fill="x", pady=2)

        number = len(self.constraint_rows) + 1

        tk.Label(
            row,
            text=f"{number}.",
            bg="white",
            fg="#6B7280",
            width=4,
            anchor="e",
            font=("Segoe UI", 9, "bold")
        ).pack(side="left")

        left_var = tk.StringVar(value=left)
        op_var = tk.StringVar(value=op)
        right_var = tk.StringVar(value=right)

        left_entry = ttk.Entry(
            row, textvariable=left_var,
            font=("Consolas", 11), width=23
        )
        left_entry.pack(side="left", padx=4)

        op_box = ttk.Combobox(
            row, textvariable=op_var,
            state="readonly",
            values=("<=", ">=", "=", "<", ">"),
            width=5,
            font=("Segoe UI", 10)
        )
        op_box.pack(side="left", padx=4)

        right_entry = ttk.Entry(
            row, textvariable=right_var,
            font=("Consolas", 11), width=14
        )
        right_entry.pack(side="left", padx=4)

        remove_btn = self.make_button(
            row, "Remove",
            lambda r=row: self.remove_constraint_row(r),
            "#9CA3AF"
        )
        remove_btn.pack(side="left", padx=8)

        self.constraint_rows.append(
            (row, left_var, op_var, right_var)
        )

    def remove_constraint_row(self, row):
        for item in self.constraint_rows:
            if item[0] == row:
                row.destroy()
                self.constraint_rows.remove(item)
                break
        self.renumber_constraints()

    def renumber_constraints(self):
        for index, item in enumerate(self.constraint_rows, start=1):
            row = item[0]
            for child in row.winfo_children():
                if isinstance(child, tk.Label):
                    child.configure(text=f"{index}.")
                    break

    def clear_constraints(self):
        for item in self.constraint_rows:
            item[0].destroy()
        self.constraint_rows.clear()
        self.lpp_status_var.set("Constraints cleared.")

    def load_lpp_example(self):
        self.objective_type.set("Maximise")
        self.objective_var.set("3*x + 5*y")
        self.clear_constraints()
        self.add_constraint_row("x + y", "<=", "10")
        self.add_constraint_row("2*x + y", "<=", "16")
        self.add_constraint_row("x", ">=", "0")
        self.add_constraint_row("y", ">=", "0")
        self.solve_lpp()

    # ========================================================
    # MAIN AREA
    # ========================================================

    def create_main_area(self):
        main = tk.Frame(
            self.root, bg=self.bg_color
        )
        main.pack(
            fill="both", expand=True,
            padx=10, pady=(0, 5)
        )

        graph_frame = tk.Frame(
            main, bg="white",
            bd=1, relief="solid"
        )
        graph_frame.pack(
            side="left", fill="both",
            expand=True, padx=(0, 10)
        )

        self.figure = Figure(
            figsize=(8, 6), dpi=100
        )
        self.ax = self.figure.add_subplot(111)

        self.canvas = FigureCanvasTkAgg(
            self.figure, master=graph_frame
        )
        self.canvas.get_tk_widget().pack(
            fill="both", expand=True
        )

        explanation_frame = tk.Frame(
            main, bg="white",
            bd=1, relief="solid",
            width=285
        )
        explanation_frame.pack(
            side="right", fill="y"
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

        # Compact tabbed learning panel. The graph remains the main focus,
        # while students can switch between working and the plotting table.
        notebook = ttk.Notebook(explanation_frame)
        notebook.pack(
            fill="both", expand=True,
            padx=8, pady=8
        )

        solution_tab = tk.Frame(
            notebook, bg="white"
        )
        points_tab = tk.Frame(
            notebook, bg="white"
        )

        notebook.add(
            solution_tab,
            text="  Step-by-Step  "
        )
        notebook.add(
            points_tab,
            text="  Points Table  "
        )

        text_container = tk.Frame(
            solution_tab, bg="white"
        )
        text_container.pack(
            fill="both", expand=True,
            padx=2, pady=2
        )

        scrollbar = ttk.Scrollbar(
            text_container
        )
        scrollbar.pack(side="right", fill="y")

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
            fill="both", expand=True
        )
        scrollbar.config(
            command=self.explanation.yview
        )
        self.explanation.config(
            state="disabled"
        )

        tk.Label(
            points_tab,
            text="Points used to draw the boundary line",
            bg="white",
            fg=self.header_color,
            font=("Segoe UI", 10, "bold")
        ).pack(
            anchor="w", padx=10, pady=(10, 2)
        )

        tk.Label(
            points_tab,
            text="Choose x-values, substitute them in the equation, and get y.",
            bg="white",
            fg="#6B7280",
            font=("Segoe UI", 8)
        ).pack(
            anchor="w", padx=10, pady=(0, 8)
        )

        points_table_frame = tk.Frame(
            points_tab, bg="white"
        )
        points_table_frame.pack(
            fill="both", expand=True,
            padx=10, pady=(0, 10)
        )

        points_scroll = ttk.Scrollbar(
            points_table_frame,
            orient="vertical"
        )
        points_scroll.pack(
            side="right", fill="y"
        )

        self.points_table = ttk.Treeview(
            points_table_frame,
            columns=(
                "x_value",
                "substitution",
                "y_value",
                "point"
            ),
            show="headings",
            height=9,
            yscrollcommand=points_scroll.set
        )

        self.points_table.heading(
            "x_value", text="x"
        )
        self.points_table.heading(
            "substitution", text="Substitution"
        )
        self.points_table.heading(
            "y_value", text="y"
        )
        self.points_table.heading(
            "point", text="Point (x, y)"
        )

        self.points_table.column(
            "x_value", width=48,
            anchor="center"
        )
        self.points_table.column(
            "substitution", width=118,
            anchor="center"
        )
        self.points_table.column(
            "y_value", width=48,
            anchor="center"
        )
        self.points_table.column(
            "point", width=110,
            anchor="center"
        )

        self.points_table.pack(
            fill="both", expand=True
        )
        points_scroll.config(
            command=self.points_table.yview
        )

        # A small note area makes the mathematical idea explicit.
        self.points_note = tk.Label(
            points_tab,
            text="",
            justify="left",
            anchor="nw",
            bg="#F8FAFC",
            fg=self.text_color,
            font=("Segoe UI", 9),
            padx=10,
            pady=8
        )
        self.points_note.pack(
            fill="x", padx=10, pady=(0, 10)
        )

    # ========================================================
    # BUTTON HELPER
    # ========================================================

    def make_button(self, parent, text, command, bg):
        return tk.Button(
            parent,
            text=text,
            command=command,
            bg=bg,
            fg="white",
            activebackground=bg,
            activeforeground="white",
            font=("Segoe UI", 9, "bold"),
            relief="flat",
            cursor="hand2",
            padx=12,
            pady=5
        )

    # ========================================================
    # MODE
    # ========================================================

    def change_mode(self, event=None):
        if self.mode_var.get() == "Equation / Inequality":
            self.lpp_section.pack_forget()
            self.equation_section.pack(
                fill="x", padx=25, pady=10,
                before=self.main_placeholder()
            )
            self.mode_hint.configure(
                text="Study and graph a single linear equation or inequality."
            )
            self.show_welcome()
        else:
            self.equation_section.pack_forget()
            self.lpp_section.pack(
                fill="x", padx=25, pady=8,
                before=self.main_placeholder()
            )
            self.mode_hint.configure(
                text="Solve an LPP using the graphical method."
            )
            self.show_lpp_welcome()

    def main_placeholder(self):
        # Main area is already packed. Tkinter's before option requires
        # a widget; returning the main-area sibling is unnecessary here.
        # The sections are packed before main during normal creation.
        return self.canvas.get_tk_widget().master.master

    # ========================================================
    # WELCOME
    # ========================================================

    def show_welcome(self):
        self.ax.clear()
        self.ax.set_title(
            "Graphical Equation & Inequality Analyzer",
            fontsize=14, fontweight="bold"
        )
        self.ax.set_xlabel("X-axis")
        self.ax.set_ylabel("Y-axis")
        self.ax.grid(True, alpha=0.25)
        self.ax.axhline(0, linewidth=1)
        self.ax.axvline(0, linewidth=1)
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
            "The program calculates:\n"
            "• Boundary line\n"
            "• X-intercept\n"
            "• Y-intercept\n"
            "• Solution region\n"
            "• Test point\n"
            "• Step-by-step explanation\n\n"
            "TIP\n"
            "Use the Linear Programming mode for\n"
            "multiple constraints and optimisation."
        )

    def show_lpp_welcome(self):
        self.ax.clear()
        self.ax.set_title(
            "Graphical Method of Linear Programming",
            fontsize=14, fontweight="bold"
        )
        self.ax.set_xlabel("X")
        self.ax.set_ylabel("Y")
        self.ax.grid(True, alpha=0.25)
        self.ax.axhline(0, linewidth=1)
        self.ax.axvline(0, linewidth=1)
        self.canvas.draw()

        self.set_explanation(
            "LINEAR PROGRAMMING\n"
            "════════════════════════\n\n"
            "Enter an objective function and constraints.\n\n"
            "Example:\n"
            "Maximise Z = 3*x + 5*y\n\n"
            "Subject to:\n"
            "x + y <= 10\n"
            "2*x + y <= 16\n"
            "x >= 0\n"
            "y >= 0\n\n"
            "The program will:\n"
            "• Plot all constraint boundaries\n"
            "• Find the feasible region\n"
            "• Find corner points\n"
            "• Evaluate Z at each corner\n"
            "• Identify the optimal solution\n"
            "• Explain the graphical method step-by-step"
        )

    # ========================================================
    # EXAMPLES
    # ========================================================

    def load_example(self, event=None):
        value = self.example_var.get()
        if value:
            self.input_var.set(value)
            self.plot_graph()

    # ========================================================
    # SINGLE EQUATION / INEQUALITY
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
            self.process_expression(expression)
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

    def detect_operator(self, expression):
        for op in ("<=", ">=", "<", ">", "="):
            if op in expression:
                return op
        raise ValueError("No valid operator found.")

    def process_expression(self, user_input):
        operator = self.detect_operator(user_input)
        left_text, right_text = user_input.split(operator, 1)

        left_expr = sp.sympify(
            left_text.strip(),
            locals={"x": self.x, "y": self.y}
        )
        right_expr = sp.sympify(
            right_text.strip(),
            locals={"x": self.x, "y": self.y}
        )

        expression = sp.expand(left_expr - right_expr)

        a = sp.sympify(expression.coeff(self.x))
        b = sp.sympify(expression.coeff(self.y))
        c = sp.sympify(
            expression.subs({self.x: 0, self.y: 0})
        )

        if a == 0 and b == 0:
            raise ValueError(
                "This is not a valid linear equation."
            )

        if b == 0:
            self.plot_vertical_line(
                a, c, operator, user_input
            )
            return

        slope = sp.simplify(-a / b)
        intercept = sp.simplify(-c / b)
        boundary_expr = sp.simplify(
            slope * self.x + intercept
        )

        final_operator = operator
        if operator != "=" and b < 0:
            reverse = {
                "<": ">",
                ">": "<",
                "<=": ">=",
                ">=": "<="
            }
            final_operator = reverse[operator]

        x_intercept = None
        if slope != 0:
            x_intercept = sp.simplify(
                -intercept / slope
            )

        self.plot_general_line(
            boundary_expr,
            slope,
            intercept,
            final_operator,
            user_input,
            x_intercept,
            intercept
        )

    def plot_general_line(
        self, boundary_expr, slope, intercept,
        operator, original_input,
        x_intercept, y_intercept
    ):
        x_min, x_max = -10, 10

        x_values = np.linspace(
            x_min, x_max, 800
        )
        function = sp.lambdify(
            self.x, boundary_expr, "numpy"
        )
        y_values = np.asarray(
            function(x_values), dtype=float
        )

        finite_values = y_values[
            np.isfinite(y_values)
        ]

        if len(finite_values):
            calculated_min = np.min(finite_values)
            calculated_max = np.max(finite_values)
            margin = max(
                5,
                (calculated_max - calculated_min) * 0.15
            )
            y_min = min(-10, calculated_min - margin)
            y_max = max(10, calculated_max + margin)
        else:
            y_min, y_max = -10, 10

        y_min = max(y_min, -50)
        y_max = min(y_max, 50)

        self.ax.clear()

        self.update_points_table(
            boundary_expr,
            x_intercept,
            intercept
        )

        if operator == "=":
            self.ax.plot(
                x_values, y_values,
                linewidth=2.5,
                label="Equation"
            )
            self.mark_intercepts(
                x_intercept, y_intercept
            )

            explanation = self.equation_steps(
                original_input,
                boundary_expr,
                x_intercept,
                y_intercept,
                slope,
                intercept
            )
        else:
            X, Y = np.meshgrid(
                np.linspace(x_min, x_max, 500),
                np.linspace(y_min, y_max, 500)
            )
            boundary_values = sp.lambdify(
                self.x, boundary_expr, "numpy"
            )(X)

            if operator in ("<", "<="):
                solution = Y < boundary_values
                if operator == "<=":
                    solution = Y <= boundary_values
                direction = "BELOW"
            else:
                solution = Y > boundary_values
                if operator == ">=":
                    solution = Y >= boundary_values
                direction = "ABOVE"

            line_style = (
                "-" if operator in ("<=", ">=")
                else "--"
            )

            self.ax.contourf(
                X, Y, solution.astype(float),
                levels=[0.5, 1.5],
                alpha=0.25
            )
            self.ax.plot(
                x_values, y_values,
                linewidth=2.5,
                linestyle=line_style,
                label="Boundary"
            )

            self.mark_intercepts(
                x_intercept, y_intercept
            )

            test_x, test_y = 0, 0
            boundary_at_test = float(
                sp.N(
                    boundary_expr.subs(
                        self.x, test_x
                    )
                )
            )

            if operator == "<":
                test_result = test_y < boundary_at_test
            elif operator == "<=":
                test_result = test_y <= boundary_at_test
            elif operator == ">":
                test_result = test_y > boundary_at_test
            else:
                test_result = test_y >= boundary_at_test

            self.ax.scatter(
                test_x, test_y,
                s=70, zorder=5,
                label="Test Point (0,0)"
            )
            self.ax.annotate(
                "(0,0)", (0, 0),
                xytext=(8, 8),
                textcoords="offset points",
                fontsize=9
            )

            boundary_text = (
                "SOLID LINE\nBoundary included."
                if operator in ("<=", ">=")
                else "DASHED LINE\nBoundary not included."
            )

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

        self.ax.axhline(0, linewidth=1)
        self.ax.axvline(0, linewidth=1)
        self.ax.set_xlim(x_min, x_max)
        self.ax.set_ylim(y_min, y_max)
        self.ax.set_xlabel("X-axis")
        self.ax.set_ylabel("Y-axis")
        self.ax.set_title(
            f"Graphical Representation\n{original_input}",
            fontsize=13, fontweight="bold"
        )
        self.add_graph_branding(compact=True)
        self.ax.grid(True, alpha=0.25)
        self.ax.legend(
            loc="upper left", fontsize=8
        )
        self.figure.tight_layout()
        self.canvas.draw()
        self.set_explanation(explanation)

    # ========================================================
    # POINTS TABLE
    # ========================================================

    def update_points_table(
        self,
        boundary_expr,
        x_intercept=None,
        y_intercept=None
    ):
        for item in self.points_table.get_children():
            self.points_table.delete(item)

        # Use simple, student-friendly x-values. Intercepts are also
        # included when they are useful and distinct.
        candidate_x = [-2, -1, 0, 1, 2]

        if x_intercept is not None:
            try:
                xi = float(sp.N(x_intercept))
                if -10 <= xi <= 10:
                    candidate_x.append(xi)
            except Exception:
                pass

        # Preserve order while removing duplicates.
        values = []
        for value in candidate_x:
            if not any(
                abs(float(value) - float(old)) < 1e-8
                for old in values
            ):
                values.append(value)

        values.sort()

        function = sp.lambdify(
            self.x, boundary_expr, "sympy"
        )

        for x_value in values:
            try:
                y_value = sp.simplify(
                    boundary_expr.subs(
                        self.x,
                        sp.Rational(str(x_value))
                        if not isinstance(x_value, int)
                        else x_value
                    )
                )

                x_display = self.format_number(
                    float(x_value)
                )
                y_display = self.format_number(
                    float(sp.N(y_value))
                )

                substitution = (
                    f"y = {sp.sstr(boundary_expr.subs(self.x, x_value))}"
                )

                point = (
                    f"({x_display}, {y_display})"
                )

                self.points_table.insert(
                    "",
                    "end",
                    values=(
                        x_display,
                        substitution,
                        y_display,
                        point
                    )
                )
            except Exception:
                continue

        equation_text = f"y = {sp.sstr(boundary_expr)}"

        self.points_note.config(
            text=(
                f"Boundary equation: {equation_text}\n"
                "Each row gives a point on the boundary. "
                "Two or more points are enough to draw a straight line."
            )
        )

    # ========================================================
    # INTERCEPTS
    # ========================================================

    def mark_intercepts(self, x_intercept, y_intercept):
        if x_intercept is not None:
            try:
                xi = float(sp.N(x_intercept))
                if -10 <= xi <= 10:
                    self.ax.scatter(
                        xi, 0, s=70, zorder=6
                    )
                    self.ax.annotate(
                        f"X-int ({self.format_number(xi)}, 0)",
                        (xi, 0),
                        xytext=(8, -18),
                        textcoords="offset points",
                        fontsize=8
                    )
            except Exception:
                pass

        if y_intercept is not None:
            try:
                yi = float(sp.N(y_intercept))
                if -50 <= yi <= 50:
                    self.ax.scatter(
                        0, yi, s=70, zorder=6
                    )
                    self.ax.annotate(
                        f"Y-int (0, {self.format_number(yi)})",
                        (0, yi),
                        xytext=(8, 8),
                        textcoords="offset points",
                        fontsize=8
                    )
            except Exception:
                pass

    def format_number(self, value):
        value = float(value)
        if abs(value - round(value)) < 1e-10:
            return str(int(round(value)))
        return f"{value:.3f}".rstrip("0").rstrip(".")

    # ========================================================
    # EQUATION EXPLANATION
    # ========================================================

    def equation_steps(
        self, original, boundary,
        x_intercept, y_intercept,
        slope, intercept
    ):
        x_text = (
            sp.sstr(x_intercept)
            if x_intercept is not None
            else "Not available"
        )

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
            f"x = {x_text}\n"
            f"Point = ({x_text}, 0)\n\n"
            "GRAPH\n"
            "────────────────────────\n"
            "The equation is represented\n"
            "by a SOLID straight line.\n\n"
            "SOLUTION\n"
            "────────────────────────\n"
            "Every point on the line\n"
            "satisfies the equation."
        )

    # ========================================================
    # INEQUALITY EXPLANATION
    # ========================================================

    def inequality_steps(
        self, original, boundary,
        operator, boundary_text, direction,
        x_intercept, y_intercept,
        test_x, test_y, boundary_value,
        test_result
    ):
        comparison = (
            f"{test_y} {operator} "
            f"{self.format_number(boundary_value)}"
        )

        result = (
            "TRUE ✓\n\n"
            "The test point satisfies the inequality.\n\n"
            "Therefore this side is the solution region."
            if test_result
            else
            "FALSE ✗\n\n"
            "The test point does not satisfy the inequality.\n\n"
            "Therefore the opposite side is the solution region."
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
        self, a, c, operator, original
    ):
        x_value = sp.simplify(-c / a)
        xv = float(sp.N(x_value))

        x_min, x_max = xv - 10, xv + 10
        y_min, y_max = -10, 10

        self.ax.clear()

        if operator == "=":
            self.ax.axvline(
                xv, linewidth=2.5,
                label=f"x = {x_value}"
            )
            explanation = (
                "VERTICAL LINE\n"
                "════════════════════════\n\n"
                f"Equation:\n{original}\n\n"
                f"x = {sp.sstr(x_value)}\n\n"
                "The graph is a vertical line.\n\n"
                "Every point on this vertical line\n"
                "satisfies the equation."
            )
        else:
            Y = np.linspace(
                y_min, y_max, 400
            )
            X = np.linspace(
                x_min, x_max, 400
            )
            XX, YY = np.meshgrid(X, Y)

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
                XX, YY, solution.astype(float),
                levels=[0.5, 1.5],
                alpha=0.25
            )

            line_style = (
                "-" if operator in ("<=", ">=")
                else "--"
            )

            self.ax.axvline(
                xv,
                linewidth=2.5,
                linestyle=line_style,
                label=f"x = {x_value}"
            )

            result = (
                0 < xv if operator == "<"
                else 0 <= xv if operator == "<="
                else 0 > xv if operator == ">"
                else 0 >= xv
            )

            self.ax.scatter(
                0, 0, s=70, zorder=5
            )

            explanation = (
                "VERTICAL INEQUALITY\n"
                "════════════════════════\n\n"
                f"Original:\n{original}\n\n"
                f"Boundary:\nx = {x_value}\n\n"
                f"Boundary style:\n"
                f"{'SOLID' if line_style == '-' else 'DASHED'}\n\n"
                f"Solution region:\nShade {direction}.\n\n"
                "Test point:\n(0, 0)\n\n"
                "Test:\n"
                f"0 {operator} {self.format_number(xv)}\n\n"
                "Result:\n"
                f"{'TRUE ✓' if result else 'FALSE ✗'}"
            )

        self.ax.axhline(0, linewidth=1)
        self.ax.axvline(0, linewidth=1)
        self.ax.set_xlim(x_min, x_max)
        self.ax.set_ylim(y_min, y_max)
        self.ax.set_xlabel("X-axis")
        self.ax.set_ylabel("Y-axis")
        self.ax.set_title(
            f"Graphical Representation\n{original}",
            fontsize=13, fontweight="bold"
        )
        self.add_graph_branding(compact=True)
        self.ax.grid(True, alpha=0.25)
        self.ax.legend(loc="upper left")
        self.figure.tight_layout()
        self.canvas.draw()
        self.set_explanation(explanation)

    # ========================================================
    # GRAPH BRANDING
    # ========================================================

    def add_graph_branding(self, compact=False):
        if compact:
            brand = (
                "Coder & AccoTax\n"
                "7003756860  |  codernaccotax.co.in"
            )
        else:
            brand = (
                "Coder & AccoTax\n"
                "Developing Human Resource Since 1997\n"
                "7003756860  |  codernaccotax.co.in"
            )

        self.ax.text(
            0.985,
            0.018,
            brand,
            transform=self.ax.transAxes,
            ha="right",
            va="bottom",
            fontsize=7.5 if compact else 7,
            fontweight="bold",
            color="#123B5D",
            linespacing=1.2,
            bbox=dict(
                boxstyle="round,pad=0.35",
                facecolor="white",
                edgecolor="#D1D5DB",
                alpha=0.92
            ),
            zorder=20
        )

    # ========================================================
    # LPP SOLVER
    # ========================================================

    def parse_constraint(self, text):
        operator = self.detect_operator(text)
        left_text, right_text = text.split(operator, 1)

        left = sp.sympify(
            left_text.strip(),
            locals={"x": self.x, "y": self.y}
        )
        right = sp.sympify(
            right_text.strip(),
            locals={"x": self.x, "y": self.y}
        )

        expr = sp.expand(left - right)
        a = sp.sympify(expr.coeff(self.x))
        b = sp.sympify(expr.coeff(self.y))
        c = sp.sympify(
            expr.subs({self.x: 0, self.y: 0})
        )

        if a == 0 and b == 0:
            raise ValueError(
                f"Invalid constraint: {text}"
            )

        return {
            "text": text,
            "operator": operator,
            "a": a,
            "b": b,
            "c": c,
            "expr": expr
        }

    def get_lpp_constraints(self):
        constraints = []

        for _, left_var, op_var, right_var in self.constraint_rows:
            left = left_var.get().strip()
            right = right_var.get().strip()
            op = op_var.get().strip()

            if not left or not right:
                continue

            constraints.append(
                self.parse_constraint(
                    f"{left} {op} {right}"
                )
            )

        if not constraints:
            raise ValueError(
                "Please enter at least one constraint."
            )

        return constraints

    def evaluate_constraint(self, constraint, x_value, y_value):
        value = (
            constraint["a"] * x_value
            + constraint["b"] * y_value
            + constraint["c"]
        )

        op = constraint["operator"]

        tol = 1e-8
        value = float(sp.N(value))

        if op == "<":
            return value < -tol
        if op == "<=":
            return value <= tol
        if op == ">":
            return value > tol
        if op == ">=":
            return value >= -tol
        return abs(value) <= tol

    def point_is_feasible(self, point, constraints):
        x_value, y_value = point

        return all(
            self.evaluate_constraint(
                constraint, x_value, y_value
            )
            for constraint in constraints
        )

    def intersection_of_constraints(self, c1, c2):
        determinant = (
            c1["a"] * c2["b"]
            - c2["a"] * c1["b"]
        )

        if sp.simplify(determinant) == 0:
            return None

        solution = sp.solve(
            [
                c1["a"] * self.x
                + c1["b"] * self.y
                + c1["c"],
                c2["a"] * self.x
                + c2["b"] * self.y
                + c2["c"]
            ],
            (self.x, self.y),
            dict=True
        )

        if not solution:
            return None

        return (
            sp.simplify(solution[0][self.x]),
            sp.simplify(solution[0][self.y])
        )

    def unique_points(self, points):
        result = []

        for point in points:
            if point is None:
                continue

            x_value, y_value = point

            duplicate = False

            for old_x, old_y in result:
                if (
                    abs(float(sp.N(x_value - old_x))) < 1e-8
                    and
                    abs(float(sp.N(y_value - old_y))) < 1e-8
                ):
                    duplicate = True
                    break

            if not duplicate:
                result.append(point)

        return result

    def find_corner_points(self, constraints):
        points = []

        for c1, c2 in itertools.combinations(
            constraints, 2
        ):
            point = self.intersection_of_constraints(
                c1, c2
            )

            if point and self.point_is_feasible(
                point, constraints
            ):
                points.append(point)

        return self.unique_points(points)

    def objective_value(self, objective, point):
        value = objective.subs({
            self.x: point[0],
            self.y: point[1]
        })
        return sp.simplify(value)

    def solve_lpp(self):
        try:
            objective = sp.sympify(
                self.objective_var.get().strip(),
                locals={"x": self.x, "y": self.y}
            )

            if not objective.has(self.x) and not objective.has(self.y):
                raise ValueError(
                    "Objective function must contain x or y."
                )

            constraints = self.get_lpp_constraints()
            corners = self.find_corner_points(constraints)

            if not corners:
                self.lpp_status_var.set(
                    "No finite feasible corner point found."
                )
                self.plot_lpp(
                    objective, constraints, [],
                    None, "No feasible corner point."
                )
                return

            values = [
                self.objective_value(objective, p)
                for p in corners
            ]

            if self.objective_type.get() == "Maximise":
                best_value = max(
                    values,
                    key=lambda v: float(sp.N(v))
                )
            else:
                best_value = min(
                    values,
                    key=lambda v: float(sp.N(v))
                )

            optimal_points = [
                p for p, value in zip(corners, values)
                if sp.simplify(value - best_value) == 0
            ]

            self.lpp_status_var.set(
                f"Optimal value: Z = {sp.sstr(best_value)}"
            )

            self.plot_lpp(
                objective,
                constraints,
                corners,
                optimal_points,
                best_value
            )

        except Exception as error:
            self.lpp_status_var.set("Error")
            messagebox.showerror(
                "LPP Error",
                f"Could not solve the LPP.\n\n{error}"
            )

    # ========================================================
    # LPP PLOT
    # ========================================================

    def calculate_lpp_bounds(self, constraints, corners):
        xs = []
        ys = []

        for point in corners:
            xs.append(float(sp.N(point[0])))
            ys.append(float(sp.N(point[1])))

        # Include useful intercepts for constraints.
        for c in constraints:
            a, b, cc = c["a"], c["b"], c["c"]

            if a != 0:
                xs.append(float(sp.N(-cc / a)))

            if b != 0:
                ys.append(float(sp.N(-cc / b)))

        if xs:
            x_min = min(xs)
            x_max = max(xs)
        else:
            x_min, x_max = -5, 10

        if ys:
            y_min = min(ys)
            y_max = max(ys)
        else:
            y_min, y_max = -5, 10

        # For standard LPPs, expand the visible area around
        # the feasible region while keeping it readable.
        x_min = min(0, x_min)
        y_min = min(0, y_min)

        x_span = max(5, x_max - x_min)
        y_span = max(5, y_max - y_min)

        x_min -= x_span * 0.12
        x_max += x_span * 0.15
        y_min -= y_span * 0.12
        y_max += y_span * 0.15

        x_min = max(x_min, -1000)
        y_min = max(y_min, -1000)
        x_max = min(x_max, 1000)
        y_max = min(y_max, 1000)

        return x_min, x_max, y_min, y_max

    def plot_lpp(
        self, objective, constraints,
        corners, optimal_points, best_value
    ):
        x_min, x_max, y_min, y_max = (
            self.calculate_lpp_bounds(
                constraints, corners
            )
        )

        self.ax.clear()

        X, Y = np.meshgrid(
            np.linspace(x_min, x_max, 600),
            np.linspace(y_min, y_max, 600)
        )

        # Feasible region = intersection of all constraints.
        feasible = np.ones(
            X.shape, dtype=bool
        )

        for constraint in constraints:
            lhs = (
                float(sp.N(constraint["a"])) * X
                + float(sp.N(constraint["b"])) * Y
                + float(sp.N(constraint["c"]))
            )

            op = constraint["operator"]

            if op == "<":
                condition = lhs < 0
            elif op == "<=":
                condition = lhs <= 0
            elif op == ">":
                condition = lhs > 0
            elif op == ">=":
                condition = lhs >= 0
            else:
                condition = np.isclose(
                    lhs, 0, atol=0.05
                )

            feasible &= condition

        # Shade feasible region first.
        self.ax.contourf(
            X, Y,
            feasible.astype(float),
            levels=[0.5, 1.5],
            alpha=0.30
        )

        # Plot each boundary.
        x_values = np.linspace(
            x_min, x_max, 1000
        )

        for index, c in enumerate(constraints, start=1):
            a, b, cc = c["a"], c["b"], c["c"]
            op = c["operator"]

            if b != 0:
                slope = -a / b
                intercept = -cc / b

                y_values = (
                    float(sp.N(slope)) * x_values
                    + float(sp.N(intercept))
                )

                style = (
                    "-"
                    if op in ("<=", ">=", "=")
                    else "--"
                )

                self.ax.plot(
                    x_values,
                    y_values,
                    linewidth=2,
                    linestyle=style,
                    label=f"C{index}: {c['text']}"
                )
            else:
                xv = float(sp.N(-cc / a))
                style = (
                    "-"
                    if op in ("<=", ">=", "=")
                    else "--"
                )
                self.ax.axvline(
                    xv,
                    linewidth=2,
                    linestyle=style,
                    label=f"C{index}: {c['text']}"
                )

        # Corner points.
        for index, point in enumerate(corners, start=1):
            px = float(sp.N(point[0]))
            py = float(sp.N(point[1]))

            is_optimal = any(
                abs(float(sp.N(point[0] - op[0]))) < 1e-8
                and
                abs(float(sp.N(point[1] - op[1]))) < 1e-8
                for op in optimal_points
            )

            self.ax.scatter(
                px, py,
                s=100 if is_optimal else 65,
                zorder=8
            )

            label = (
                f"P{index} ({self.format_number(px)}, "
                f"{self.format_number(py)})"
            )

            if is_optimal:
                label += " ★"

            self.ax.annotate(
                label,
                (px, py),
                xytext=(8, 8),
                textcoords="offset points",
                fontsize=8,
                fontweight="bold" if is_optimal else "normal"
            )

        self.ax.axhline(
            0, linewidth=1.2
        )
        self.ax.axvline(
            0, linewidth=1.2
        )

        self.ax.set_xlim(
            x_min, x_max
        )
        self.ax.set_ylim(
            y_min, y_max
        )

        self.ax.set_xlabel("X")
        self.ax.set_ylabel("Y")
        self.ax.grid(
            True, alpha=0.25
        )

        self.ax.set_title(
            "Linear Programming - Graphical Method",
            fontsize=14,
            fontweight="bold"
        )
        self.add_graph_branding(compact=False)

        self.ax.legend(
            loc="upper left",
            fontsize=7
        )

        self.figure.tight_layout()
        self.canvas.draw()

        explanation = self.lpp_explanation(
            objective,
            constraints,
            corners,
            optimal_points,
            best_value
        )

        self.set_explanation(
            explanation
        )

    # ========================================================
    # LPP EXPLANATION
    # ========================================================

    def lpp_explanation(
        self, objective, constraints,
        corners, optimal_points, best_value
    ):
        lines = [
            "LINEAR PROGRAMMING ANALYSIS",
            "════════════════════════",
            "",
            "STEP 1 — Objective Function",
            f"{self.objective_type.get()} Z = {sp.sstr(objective)}",
            "",
            "STEP 2 — Constraints",
        ]

        for index, c in enumerate(
            constraints, start=1
        ):
            lines.append(
                f"C{index}: {c['text']}"
            )

        lines.extend([
            "",
            "STEP 3 — Boundary Lines",
            "────────────────────────",
            "For graphical analysis, each inequality",
            "is first represented by its boundary",
            "equation, obtained by replacing the",
            "inequality sign with '='.",
            ""
        ])

        for index, c in enumerate(
            constraints, start=1
        ):
            equation = sp.Eq(
                c["a"] * self.x
                + c["b"] * self.y
                + c["c"],
                0
            )
            lines.append(
                f"C{index}: {sp.sstr(equation)}"
            )

        lines.extend([
            "",
            "STEP 4 — Feasible Region",
            "────────────────────────",
            "The feasible region is the common",
            "region satisfying ALL constraints.",
            "It is shown by the shaded intersection",
            "of the constraint regions.",
            ""
        ])

        if corners:
            lines.append(
                "STEP 5 — Corner Points"
            )
            lines.append(
                "────────────────────────"
            )

            for index, point in enumerate(
                corners, start=1
            ):
                px = sp.sstr(point[0])
                py = sp.sstr(point[1])
                z = self.objective_value(
                    objective, point
                )
                marker = (
                    "  ★ OPTIMAL"
                    if any(
                        sp.simplify(point[0] - p[0]) == 0
                        and
                        sp.simplify(point[1] - p[1]) == 0
                        for p in optimal_points
                    )
                    else ""
                )
                lines.append(
                    f"P{index} = ({px}, {py})"
                    f"   Z = {sp.sstr(z)}{marker}"
                )

            lines.extend([
                "",
                "STEP 6 — Objective Evaluation",
                "────────────────────────",
                "The objective function is evaluated",
                "at every feasible corner point."
            ])

            if optimal_points:
                lines.extend([
                    "",
                    "RESULT",
                    "════════════════════════",
                    f"{self.objective_type.get()} Z = "
                    f"{sp.sstr(best_value)}"
                ])

                if len(optimal_points) == 1:
                    p = optimal_points[0]
                    lines.append(
                        f"Optimal solution = "
                        f"({sp.sstr(p[0])}, {sp.sstr(p[1])})"
                    )
                    lines.append(
                        "The starred point on the graph is "
                        "the optimal corner point."
                    )
                else:
                    lines.append(
                        "Multiple corner points have the "
                        "same optimal objective value."
                    )
                    lines.append(
                        "This indicates an alternate optimal solution."
                    )

        else:
            lines.extend([
                "STEP 5 — Corner Points",
                "────────────────────────",
                "No finite feasible corner point was found.",
                "",
                "The problem may be infeasible, unbounded,",
                "or require additional constraints.",
            ])

        return "\n".join(lines)

    # ========================================================
    # EXPLANATION TEXT
    # ========================================================

    def set_explanation(self, text):
        self.explanation.config(state="normal")
        self.explanation.delete("1.0", tk.END)
        self.explanation.insert("1.0", text)
        self.explanation.config(state="disabled")

    # ========================================================
    # DOWNLOAD
    # ========================================================

    def download_graph(self):
        if (
            not self.ax.lines
            and not self.ax.collections
            and not self.ax.patches
        ):
            messagebox.showwarning(
                "No Graph",
                "Please plot a graph before downloading."
            )
            return

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )
        default_name = (
            f"CNAT_Graph_{timestamp}.png"
        )

        file_path = filedialog.asksaveasfilename(
            title="Download Graph",
            defaultextension=".png",
            initialfile=default_name,
            filetypes=[
                ("PNG Image", "*.png"),
                ("JPEG Image", "*.jpg"),
                ("PDF Document", "*.pdf"),
                ("SVG Image", "*.svg")
            ]
        )

        if not file_path:
            return

        try:
            self.figure.savefig(
                file_path,
                dpi=300,
                bbox_inches="tight",
                facecolor="white"
            )

            messagebox.showinfo(
                "Download Successful",
                "Graph saved successfully.\n\n"
                f"{file_path}"
            )

        except Exception as error:
            self.canvas.draw()

            messagebox.showerror(
                "Download Error",
                f"Could not save the graph.\n\n{error}"
            )

    # ========================================================
    # CLEAR / RESET
    # ========================================================

    def clear_all(self):
        self.input_var.set("")
        self.example_var.set("")
        self.ax.clear()
        self.ax.set_title(
            "Enter an equation or inequality",
            fontsize=14,
            fontweight="bold"
        )
        self.ax.grid(True, alpha=0.25)
        self.ax.axhline(0, linewidth=1)
        self.ax.axvline(0, linewidth=1)
        self.canvas.draw()
        self.set_explanation(
            "Enter an equation or inequality\n"
            "to begin."
        )

    def reset_view(self):
        self.input_var.set(
            "2*x + 3*y <= 12"
        )
        self.example_var.set("")
        self.plot_graph()


# ============================================================
# START APPLICATION
# ============================================================

if __name__ == "__main__":
    root = tk.Tk()
    app = GraphicalAnalysisApp(root)
    root.mainloop()
