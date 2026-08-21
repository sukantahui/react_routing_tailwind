
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from datetime import datetime
import itertools
import csv

import numpy as np
import sympy as sp

import matplotlib
matplotlib.use("TkAgg")

from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.backends.backend_tkagg import NavigationToolbar2Tk


class QuantitativeAnalysisTool:
    """
    Coder & AccoTax - Quantitative Analysis Learning Tool V4

    Modules:
      1. Linear equation / inequality graphical analysis
      2. Linear programming graphical method

    Features:
      - Symbolic parsing with SymPy
      - Exact intersection / corner-point calculations
      - Feasible-region plotting
      - Objective evaluation
      - Maximise / Minimise
      - Step-by-step explanation
      - Points table
      - Graph export
      - Corner-point CSV export
      - Basic boundedness / special-case detection
    """

    APP_TITLE = "Coder & AccoTax - Quantitative Analysis Learning Tool V4"
    ORG = "Coder & AccoTax"
    PHONE = "7003756860"
    WEBSITE = "codernaccotax.co.in"
    TAGLINE = "Developing Human Resource Since 1997"

    BG = "#F3F6FA"
    CARD = "#FFFFFF"
    NAVY = "#123B5D"
    TEAL = "#167A8A"
    BLUE = "#2563EB"
    GREEN = "#15803D"
    RED = "#B91C1C"
    MUTED = "#64748B"
    TEXT = "#1E293B"

    OPERATORS = ("<=", ">=", "<", ">", "=")

    def __init__(self, root):
        self.root = root
        self.root.title(self.APP_TITLE)
        self.root.geometry("1540x920")
        self.root.minsize(1180, 760)
        self.root.configure(bg=self.BG)

        self.x, self.y = sp.symbols("x y")

        self.mode_var = tk.StringVar(
            value="Linear Programming (Graphical Method)"
        )
        self.objective_type = tk.StringVar(value="Maximise")
        self.objective_var = tk.StringVar(value="3*x + 5*y")
        self.lpp_status_var = tk.StringVar(value="Ready")
        self.equation_var = tk.StringVar(
            value="2*x + 3*y <= 12"
        )
        self.example_var = tk.StringVar()

        self.constraint_rows = []
        self.current_result = None
        self.current_mode = None

        self._configure_style()
        self._build_header()
        self._build_mode_bar()
        self._build_equation_panel()
        self._build_lpp_panel()
        self._build_workspace()
        self._build_status_bar()

        self.lpp_panel.pack(
            fill="x",
            padx=18,
            pady=8,
            before=self.workspace
        )

        self.current_mode = "lpp"
        self._show_lpp_welcome()

    # ============================================================
    # STYLE
    # ============================================================

    def _configure_style(self):
        style = ttk.Style(self.root)

        try:
            style.theme_use("clam")
        except tk.TclError:
            pass

        style.configure(
            "TCombobox",
            padding=4
        )

        style.configure(
            "TEntry",
            padding=5
        )

        style.configure(
            "TNotebook.Tab",
            padding=(12, 7),
            font=("Segoe UI", 9, "bold")
        )

        style.configure(
            "Treeview",
            rowheight=25,
            font=("Segoe UI", 9)
        )

        style.configure(
            "Treeview.Heading",
            font=("Segoe UI", 9, "bold")
        )

    # ============================================================
    # HEADER
    # ============================================================

    def _build_header(self):
        header = tk.Frame(
            self.root,
            bg=self.NAVY,
            height=82
        )

        header.pack(fill="x")
        header.pack_propagate(False)

        tk.Label(
            header,
            text=self.ORG,
            bg=self.NAVY,
            fg="white",
            font=("Segoe UI", 20, "bold")
        ).pack(pady=(8, 0))

        tk.Label(
            header,
            text="Quantitative Analysis Learning Tool",
            bg=self.NAVY,
            fg="#DCEAF3",
            font=("Segoe UI", 11)
        ).pack()

        tk.Label(
            header,
            text=(
                "Graphical Equations  •  "
                "Inequalities  •  "
                "Linear Programming"
            ),
            bg=self.NAVY,
            fg="#B8D8E8",
            font=("Segoe UI", 9)
        ).pack(pady=(1, 5))

    # ============================================================
    # MODE BAR
    # ============================================================

    def _build_mode_bar(self):
        bar = tk.Frame(
            self.root,
            bg="#E6EEF5",
            height=48
        )

        bar.pack(fill="x")
        bar.pack_propagate(False)

        tk.Label(
            bar,
            text="Analysis Mode:",
            bg="#E6EEF5",
            fg=self.TEXT,
            font=("Segoe UI", 10, "bold")
        ).pack(
            side="left",
            padx=(20, 8),
            pady=8
        )

        self.mode_box = ttk.Combobox(
            bar,
            textvariable=self.mode_var,
            state="readonly",
            values=(
                "Equation / Inequality",
                "Linear Programming (Graphical Method)"
            ),
            width=39
        )

        self.mode_box.pack(
            side="left",
            pady=8
        )

        self.mode_box.bind(
            "<<ComboboxSelected>>",
            self._change_mode
        )

        self.mode_hint = tk.Label(
            bar,
            text=(
                "Solve a two-variable LPP "
                "using the graphical method."
            ),
            bg="#E6EEF5",
            fg=self.MUTED,
            font=("Segoe UI", 9)
        )

        self.mode_hint.pack(
            side="left",
            padx=14
        )

        self.make_button(
            bar,
            "Help",
            self._show_help,
            self.NAVY
        ).pack(
            side="right",
            padx=12,
            pady=5
        )

    # ============================================================
    # EQUATION PANEL
    # ============================================================

    def _build_equation_panel(self):
        self.equation_panel = tk.Frame(
            self.root,
            bg=self.BG
        )

        card = tk.Frame(
            self.equation_panel,
            bg=self.CARD,
            bd=1,
            relief="solid"
        )

        card.pack(fill="x")

        row = tk.Frame(
            card,
            bg=self.CARD
        )

        row.pack(
            fill="x",
            padx=12,
            pady=10
        )

        tk.Label(
            row,
            text="Equation / Inequality:",
            bg=self.CARD,
            fg=self.TEXT,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left")

        self.equation_entry = ttk.Entry(
            row,
            textvariable=self.equation_var,
            width=34,
            font=("Consolas", 12)
        )

        self.equation_entry.pack(
            side="left",
            padx=8
        )

        self.equation_entry.bind(
            "<Return>",
            lambda event: self.plot_equation()
        )

        self.make_button(
            row,
            "Plot",
            self.plot_equation,
            self.TEAL
        ).pack(side="left", padx=3)

        self.make_button(
            row,
            "Download Graph",
            self.download_graph,
            self.BLUE
        ).pack(side="left", padx=3)

        self.make_button(
            row,
            "Clear",
            self.clear_equation,
            "#64748B"
        ).pack(side="left", padx=3)

        tk.Label(
            row,
            text="Examples:",
            bg=self.CARD,
            fg=self.TEXT,
            font=("Segoe UI", 9, "bold")
        ).pack(
            side="left",
            padx=(15, 5)
        )

        self.eq_example_box = ttk.Combobox(
            row,
            textvariable=self.example_var,
            state="readonly",
            width=25,
            values=(
                "y = 2*x + 1",
                "y <= 2*x + 1",
                "y >= -x + 4",
                "2*x + 3*y <= 12",
                "x + y >= 5",
                "3*x - 2*y < 6",
                "x >= 2",
                "x = 3"
            )
        )

        self.eq_example_box.pack(side="left")

        self.eq_example_box.bind(
            "<<ComboboxSelected>>",
            self._load_equation_example
        )

        tk.Label(
            card,
            text=(
                "Use x and y. Example: "
                "2*x + 3*y <= 12"
            ),
            bg="#F8FAFC",
            fg=self.MUTED,
            font=("Segoe UI", 8),
            anchor="w"
        ).pack(
            fill="x",
            padx=12,
            pady=(0, 8)
        )

    # ============================================================
    # LPP PANEL
    # ============================================================

    def _build_lpp_panel(self):
        self.lpp_panel = tk.Frame(
            self.root,
            bg=self.BG
        )

        objective = tk.Frame(
            self.lpp_panel,
            bg=self.CARD,
            bd=1,
            relief="solid"
        )

        objective.pack(
            fill="x",
            pady=(0, 7)
        )

        top = tk.Frame(
            objective,
            bg=self.CARD
        )

        top.pack(
            fill="x",
            padx=12,
            pady=8
        )

        tk.Label(
            top,
            text="OBJECTIVE FUNCTION",
            bg=self.CARD,
            fg=self.NAVY,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left")

        ttk.Combobox(
            top,
            textvariable=self.objective_type,
            state="readonly",
            values=("Maximise", "Minimise"),
            width=11
        ).pack(
            side="left",
            padx=(18, 7)
        )

        tk.Label(
            top,
            text="Z =",
            bg=self.CARD,
            fg=self.TEXT,
            font=("Segoe UI", 10, "bold")
        ).pack(side="left")

        ttk.Entry(
            top,
            textvariable=self.objective_var,
            width=34,
            font=("Consolas", 11)
        ).pack(
            side="left",
            padx=8
        )

        tk.Label(
            top,
            text="Example: 3*x + 5*y",
            bg=self.CARD,
            fg=self.MUTED,
            font=("Segoe UI", 8)
        ).pack(side="left")

        header = tk.Frame(
            objective,
            bg="#EAF2F6"
        )

        header.pack(fill="x")

        tk.Label(
            header,
            text="CONSTRAINTS",
            bg="#EAF2F6",
            fg=self.NAVY,
            font=("Segoe UI", 9, "bold")
        ).pack(
            side="left",
            padx=12,
            pady=6
        )

        self.make_button(
            header,
            "+ Add Constraint",
            self.add_constraint_row,
            self.TEAL
        ).pack(
            side="right",
            padx=8,
            pady=3
        )

        self.constraint_container = tk.Frame(
            objective,
            bg=self.CARD
        )

        self.constraint_container.pack(
            fill="x",
            padx=12,
            pady=7
        )

        actions = tk.Frame(
            objective,
            bg=self.CARD
        )

        actions.pack(
            fill="x",
            padx=12,
            pady=(0, 9)
        )

        self.make_button(
            actions,
            "Solve LPP",
            self.solve_lpp,
            self.GREEN
        ).pack(
            side="left",
            padx=(0, 4)
        )

        self.make_button(
            actions,
            "Load Example",
            self.load_lpp_example,
            self.BLUE
        ).pack(
            side="left",
            padx=4
        )

        self.make_button(
            actions,
            "Download Graph",
            self.download_graph,
            "#0F766E"
        ).pack(
            side="left",
            padx=4
        )

        self.make_button(
            actions,
            "Export Points CSV",
            self.export_points_csv,
            "#7C3AED"
        ).pack(
            side="left",
            padx=4
        )

        self.make_button(
            actions,
            "Clear",
            self.clear_constraints,
            "#64748B"
        ).pack(
            side="left",
            padx=4
        )

        tk.Label(
            actions,
            textvariable=self.lpp_status_var,
            bg=self.CARD,
            fg=self.MUTED,
            font=("Segoe UI", 9, "italic")
        ).pack(
            side="left",
            padx=15
        )

        self.add_constraint_row(
            "x + y", "<=", "10"
        )

        self.add_constraint_row(
            "2*x + y", "<=", "16"
        )

        self.add_constraint_row(
            "x", ">=", "0"
        )

        self.add_constraint_row(
            "y", ">=", "0"
        )

    def add_constraint_row(
        self,
        left="",
        op="<=",
        right=""
    ):
        row = tk.Frame(
            self.constraint_container,
            bg=self.CARD
        )

        row.pack(
            fill="x",
            pady=2
        )

        index_label = tk.Label(
            row,
            text=f"{len(self.constraint_rows) + 1}.",
            width=4,
            anchor="e",
            bg=self.CARD,
            fg=self.MUTED,
            font=("Segoe UI", 9, "bold")
        )

        index_label.pack(side="left")

        left_var = tk.StringVar(
            value=left
        )

        op_var = tk.StringVar(
            value=op
        )

        right_var = tk.StringVar(
            value=right
        )

        ttk.Entry(
            row,
            textvariable=left_var,
            width=23,
            font=("Consolas", 10)
        ).pack(
            side="left",
            padx=3
        )

        ttk.Combobox(
            row,
            textvariable=op_var,
            state="readonly",
            values=self.OPERATORS,
            width=5
        ).pack(
            side="left",
            padx=3
        )

        ttk.Entry(
            row,
            textvariable=right_var,
            width=14,
            font=("Consolas", 10)
        ).pack(
            side="left",
            padx=3
        )

        self.make_button(
            row,
            "Remove",
            lambda r=row: self.remove_constraint_row(r),
            "#94A3B8"
        ).pack(
            side="left",
            padx=7
        )

        self.constraint_rows.append(
            (
                row,
                index_label,
                left_var,
                op_var,
                right_var
            )
        )

    def remove_constraint_row(self, row):
        for item in list(self.constraint_rows):
            if item[0] == row:
                row.destroy()
                self.constraint_rows.remove(item)
                break

        self._renumber_constraints()

    def _renumber_constraints(self):
        for i, item in enumerate(
            self.constraint_rows,
            start=1
        ):
            item[1].configure(
                text=f"{i}."
            )

    def clear_constraints(self):
        for item in self.constraint_rows:
            item[0].destroy()

        self.constraint_rows.clear()

        self.lpp_status_var.set(
            "Constraints cleared."
        )

    def load_lpp_example(self):
        self.objective_type.set(
            "Maximise"
        )

        self.objective_var.set(
            "3*x + 5*y"
        )

        self.clear_constraints()

        self.add_constraint_row(
            "x + y", "<=", "10"
        )

        self.add_constraint_row(
            "2*x + y", "<=", "16"
        )

        self.add_constraint_row(
            "x", ">=", "0"
        )

        self.add_constraint_row(
            "y", ">=", "0"
        )

        self.solve_lpp()

    # ============================================================
    # WORKSPACE
    # ============================================================

    def _build_workspace(self):
        self.workspace = tk.Frame(
            self.root,
            bg=self.BG
        )

        self.workspace.pack(
            fill="both",
            expand=True,
            padx=10,
            pady=(0, 6)
        )

        left = tk.Frame(
            self.workspace,
            bg=self.CARD,
            bd=1,
            relief="solid"
        )

        left.pack(
            side="left",
            fill="both",
            expand=True,
            padx=(0, 8)
        )

        self.figure = Figure(
            figsize=(10, 6),
            dpi=100,
            facecolor="white"
        )

        self.ax = self.figure.add_subplot(
            111
        )

        self.canvas = FigureCanvasTkAgg(
            self.figure,
            master=left
        )

        self.canvas.get_tk_widget().pack(
            fill="both",
            expand=True
        )

        toolbar = NavigationToolbar2Tk(
            self.canvas,
            left,
            pack_toolbar=False
        )

        toolbar.update()

        toolbar.pack(
            fill="x",
            side="bottom"
        )

        right = tk.Frame(
            self.workspace,
            bg=self.CARD,
            width=350,
            bd=1,
            relief="solid"
        )

        right.pack(
            side="right",
            fill="y"
        )

        right.pack_propagate(False)

        tk.Label(
            right,
            text="SOLUTION & EXPLANATION",
            bg=self.TEAL,
            fg="white",
            font=("Segoe UI", 11, "bold"),
            pady=9
        ).pack(fill="x")

        notebook = ttk.Notebook(
            right
        )

        notebook.pack(
            fill="both",
            expand=True,
            padx=7,
            pady=7
        )

        self.solution_tab = tk.Frame(
            notebook,
            bg="white"
        )

        self.points_tab = tk.Frame(
            notebook,
            bg="white"
        )

        self.method_tab = tk.Frame(
            notebook,
            bg="white"
        )

        notebook.add(
            self.solution_tab,
            text="  Step-by-Step  "
        )

        notebook.add(
            self.points_tab,
            text="  Points Table  "
        )

        notebook.add(
            self.method_tab,
            text="  Method  "
        )

        self._build_solution_tab()
        self._build_points_tab()
        self._build_method_tab()

    def _build_solution_tab(self):
        container = tk.Frame(
            self.solution_tab,
            bg="#FAFAFA"
        )

        container.pack(
            fill="both",
            expand=True
        )

        scroll = ttk.Scrollbar(
            container
        )

        scroll.pack(
            side="right",
            fill="y"
        )

        self.explanation = tk.Text(
            container,
            wrap="word",
            font=("Segoe UI", 9),
            bg="#FAFAFA",
            fg=self.TEXT,
            relief="flat",
            padx=12,
            pady=12,
            yscrollcommand=scroll.set
        )

        self.explanation.pack(
            fill="both",
            expand=True
        )

        scroll.config(
            command=self.explanation.yview
        )

        self.explanation.config(
            state="disabled"
        )

    def _build_points_tab(self):
        tk.Label(
            self.points_tab,
            text="Candidate / feasible corner points",
            bg="white",
            fg=self.NAVY,
            font=("Segoe UI", 9, "bold")
        ).pack(
            anchor="w",
            padx=9,
            pady=(9, 2)
        )

        frame = tk.Frame(
            self.points_tab,
            bg="white"
        )

        frame.pack(
            fill="both",
            expand=True,
            padx=8,
            pady=5
        )

        scroll = ttk.Scrollbar(
            frame,
            orient="vertical"
        )

        scroll.pack(
            side="right",
            fill="y"
        )

        self.points_table = ttk.Treeview(
            frame,
            columns=(
                "point",
                "x",
                "y",
                "z",
                "status"
            ),
            show="headings",
            yscrollcommand=scroll.set
        )

        self.points_table.pack(
            fill="both",
            expand=True
        )

        scroll.config(
            command=self.points_table.yview
        )

        headings = {
            "point": "Point",
            "x": "x",
            "y": "y",
            "z": "Z",
            "status": "Status"
        }

        widths = {
            "point": 60,
            "x": 60,
            "y": 60,
            "z": 75,
            "status": 95
        }

        for col in headings:
            self.points_table.heading(
                col,
                text=headings[col]
            )

            self.points_table.column(
                col,
                width=widths[col],
                anchor="center"
            )

        self.points_table.tag_configure(
            "optimal",
            font=("Segoe UI", 9, "bold")
        )

        self.points_note = tk.Label(
            self.points_tab,
            text="",
            justify="left",
            anchor="nw",
            bg="#F8FAFC",
            fg=self.TEXT,
            font=("Segoe UI", 8),
            padx=9,
            pady=8
        )

        self.points_note.pack(
            fill="x",
            padx=8,
            pady=(0, 8)
        )

    def _build_method_tab(self):
        text = (
            "GRAPHICAL METHOD\n\n"
            "1. Write the objective function.\n"
            "2. Convert each inequality into a boundary equation.\n"
            "3. Plot all boundary lines.\n"
            "4. Identify the common feasible region.\n"
            "5. Find all feasible corner points.\n"
            "6. Evaluate Z at every corner point.\n"
            "7. Select the largest value for Maximise or\n"
            "   the smallest value for Minimise.\n\n"
            "LINE STYLE\n"
            "• Solid: <= or >= (boundary included)\n"
            "• Dashed: < or > (boundary excluded)\n\n"
            "IMPORTANT\n"
            "The graphical method is a two-variable method.\n"
            "The program checks the feasible geometry before\n"
            "declaring a finite optimum."
        )

        tk.Label(
            self.method_tab,
            text=text,
            justify="left",
            anchor="nw",
            bg="#FAFAFA",
            fg=self.TEXT,
            font=("Segoe UI", 9),
            padx=12,
            pady=12
        ).pack(
            fill="both",
            expand=True
        )

    # ============================================================
    # STATUS BAR
    # ============================================================

    def _build_status_bar(self):
        status = tk.Frame(
            self.root,
            bg=self.NAVY,
            height=31
        )

        status.pack(fill="x")
        status.pack_propagate(False)

        tk.Label(
            status,
            text=(
                f"{self.ORG}  |  "
                f"{self.TAGLINE}  |  "
                f"Ph: {self.PHONE}  |  "
                f"{self.WEBSITE}"
            ),
            bg=self.NAVY,
            fg="white",
            font=("Segoe UI", 8, "bold")
        ).pack(pady=7)

    # ============================================================
    # MODE
    # ============================================================

    def _change_mode(self, event=None):
        if (
            self.mode_var.get()
            == "Equation / Inequality"
        ):
            self.lpp_panel.pack_forget()

            self.equation_panel.pack(
                fill="x",
                padx=18,
                pady=8,
                before=self.workspace
            )

            self.mode_hint.configure(
                text=(
                    "Analyse one linear equation "
                    "or inequality."
                )
            )

            self.current_mode = "equation"
            self._show_equation_welcome()

        else:
            self.equation_panel.pack_forget()

            self.lpp_panel.pack(
                fill="x",
                padx=18,
                pady=8,
                before=self.workspace
            )

            self.mode_hint.configure(
                text=(
                    "Solve a two-variable LPP "
                    "using the graphical method."
                )
            )

            self.current_mode = "lpp"
            self._show_lpp_welcome()

    # ============================================================
    # WELCOME
    # ============================================================

    def _show_equation_welcome(self):
        self.ax.clear()

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.set_xlabel(
            "X-axis"
        )

        self.ax.set_ylabel(
            "Y-axis"
        )

        self.ax.set_title(
            "Linear Equation / Inequality Analyzer",
            fontsize=14,
            fontweight="bold"
        )

        self.canvas.draw()

        self._set_explanation(
            "EQUATION / INEQUALITY ANALYZER\n"
            "══════════════════════════════\n\n"
            "Enter a linear equation or inequality.\n\n"
            "Examples:\n"
            "  y = 2*x + 1\n"
            "  y <= 2*x + 1\n"
            "  2*x + 3*y <= 12\n"
            "  x >= 2\n\n"
            "The tool calculates:\n"
            "• boundary equation\n"
            "• intercepts\n"
            "• boundary style\n"
            "• solution side\n"
            "• test-point verification\n"
            "• plotting points\n"
        )

    def _show_lpp_welcome(self):
        self.ax.clear()

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.set_xlabel(
            "X"
        )

        self.ax.set_ylabel(
            "Y"
        )

        self.ax.set_title(
            "Linear Programming — Graphical Method",
            fontsize=14,
            fontweight="bold"
        )

        self.canvas.draw()

        self._set_explanation(
            "LINEAR PROGRAMMING ANALYSIS\n"
            "══════════════════════════════\n\n"
            "Objective:\n"
            "  Maximise Z = 3*x + 5*y\n\n"
            "Subject to:\n"
            "  x + y <= 10\n"
            "  2*x + y <= 16\n"
            "  x >= 0\n"
            "  y >= 0\n\n"
            "The solver will:\n"
            "• normalise constraints\n"
            "• calculate boundary intersections\n"
            "• test feasibility exactly\n"
            "• identify corner points\n"
            "• evaluate the objective\n"
            "• identify the optimum\n"
            "• report special cases when possible\n"
        )

    # ============================================================
    # BUTTON / HELPERS
    # ============================================================

    def make_button(
        self,
        parent,
        text,
        command,
        bg
    ):
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
            padx=11,
            pady=5
        )

    def _set_explanation(self, text):
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

    def _show_help(self):
        messagebox.showinfo(
            "How to use",
            "Equation mode:\n"
            "Enter an equation or inequality using x and y.\n\n"
            "LPP mode:\n"
            "Enter Z and add constraints. The graphical solver "
            "finds feasible corner points and evaluates Z.\n\n"
            "Use '*' for multiplication when needed.\n"
            "Examples: 2*x, 3*y, 2*x + 3*y <= 12"
        )

    # ============================================================
    # PARSING
    # ============================================================

    def detect_operator(self, text):
        for op in self.OPERATORS:
            if op in text:
                return op

        raise ValueError(
            "No valid relation found. "
            "Use <=, >=, <, > or =."
        )

    def parse_relation(self, text):
        text = text.strip()

        op = self.detect_operator(
            text
        )

        left_text, right_text = text.split(
            op,
            1
        )

        left = sp.sympify(
            left_text.strip(),
            locals={
                "x": self.x,
                "y": self.y
            }
        )

        right = sp.sympify(
            right_text.strip(),
            locals={
                "x": self.x,
                "y": self.y
            }
        )

        expr = sp.expand(
            left - right
        )

        polynomial = sp.Poly(
            expr,
            self.x,
            self.y
        )

        if polynomial.total_degree() > 1:
            raise ValueError(
                f"Not linear: {text}"
            )

        a = expr.coeff(
            self.x
        )

        b = expr.coeff(
            self.y
        )

        c = expr.subs(
            {
                self.x: 0,
                self.y: 0
            }
        )

        if a == 0 and b == 0:
            raise ValueError(
                f"Invalid linear relation: {text}"
            )

        return {
            "text": text,
            "operator": op,
            "a": sp.sympify(a),
            "b": sp.sympify(b),
            "c": sp.sympify(c),
            "expr": expr
        }

    # ============================================================
    # EQUATION / INEQUALITY
    # ============================================================

    def _load_equation_example(
        self,
        event=None
    ):
        value = self.example_var.get()

        if value:
            self.equation_var.set(
                value
            )

            self.plot_equation()

    def plot_equation(self):
        text = self.equation_var.get().strip()

        if not text:
            messagebox.showwarning(
                "Input required",
                "Enter an equation or inequality."
            )
            return

        try:
            relation = self.parse_relation(
                text
            )

            self._plot_relation(
                relation
            )

            self.current_mode = "equation"

        except Exception as exc:
            messagebox.showerror(
                "Invalid expression",
                (
                    "Could not analyse the expression.\n\n"
                    f"{exc}"
                )
            )

    def _plot_relation(
        self,
        relation
    ):
        a = relation["a"]
        b = relation["b"]
        c = relation["c"]
        op = relation["operator"]

        self.ax.clear()

        if b == 0:
            self._plot_vertical_relation(
                relation
            )
            return

        slope = sp.simplify(
            -a / b
        )

        intercept = sp.simplify(
            -c / b
        )

        boundary = sp.simplify(
            slope * self.x + intercept
        )

        x_values = np.linspace(
            -10,
            10,
            1000
        )

        fn = sp.lambdify(
            self.x,
            boundary,
            "numpy"
        )

        y_values = np.asarray(
            fn(x_values),
            dtype=float
        )

        finite = np.isfinite(
            y_values
        )

        if finite.any():
            ymin = np.nanmin(
                y_values[finite]
            )
            ymax = np.nanmax(
                y_values[finite]
            )

            span = max(
                5,
                ymax - ymin
            )

            y_min = max(
                -50,
                min(
                    -10,
                    ymin - 0.12 * span
                )
            )

            y_max = min(
                50,
                max(
                    10,
                    ymax + 0.12 * span
                )
            )
        else:
            y_min = -10
            y_max = 10

        x_intercept = None

        if slope != 0:
            x_intercept = sp.simplify(
                -intercept / slope
            )

        if op == "=":
            self.ax.plot(
                x_values,
                y_values,
                linewidth=2.5,
                label=(
                    "Boundary: "
                    f"y = {sp.sstr(boundary)}"
                )
            )

            explanation = self._equation_explanation(
                relation,
                boundary,
                slope,
                intercept,
                x_intercept
            )

        else:
            X, Y = np.meshgrid(
                np.linspace(
                    -10,
                    10,
                    500
                ),
                np.linspace(
                    y_min,
                    y_max,
                    500
                )
            )

            bf = sp.lambdify(
                self.x,
                boundary,
                "numpy"
            )(X)

            if op in ("<", "<="):
                region = (
                    Y < bf
                    if op == "<"
                    else Y <= bf
                )

                direction = "below"

            else:
                region = (
                    Y > bf
                    if op == ">"
                    else Y >= bf
                )

                direction = "above"

            self.ax.contourf(
                X,
                Y,
                region.astype(float),
                levels=[
                    0.5,
                    1.5
                ],
                alpha=0.24
            )

            linestyle = (
                "-"
                if op in ("<=", ">=")
                else "--"
            )

            self.ax.plot(
                x_values,
                y_values,
                linestyle=linestyle,
                linewidth=2.5,
                label=(
                    "Boundary: "
                    f"y = {sp.sstr(boundary)}"
                )
            )

            boundary_at_test = float(
                sp.N(
                    boundary.subs(
                        self.x,
                        0
                    )
                )
            )

            if op == "<":
                result = (
                    0 < boundary_at_test
                )
            elif op == "<=":
                result = (
                    0 <= boundary_at_test
                )
            elif op == ">":
                result = (
                    0 > boundary_at_test
                )
            else:
                result = (
                    0 >= boundary_at_test
                )

            self.ax.scatter(
                0,
                0,
                s=65,
                zorder=6,
                label="Test point (0,0)"
            )

            explanation = (
                self._inequality_explanation(
                    relation,
                    boundary,
                    slope,
                    intercept,
                    x_intercept,
                    direction,
                    boundary_at_test,
                    result
                )
            )

        self._finish_equation_plot(
            relation["text"],
            y_values,
            x_intercept,
            intercept
        )

        self._set_explanation(
            explanation
        )

        self._update_equation_points_table(
            boundary,
            x_intercept
        )

    def _plot_vertical_relation(
        self,
        relation
    ):
        a = relation["a"]
        c = relation["c"]
        op = relation["operator"]

        x_value = sp.simplify(
            -c / a
        )

        xv = float(
            sp.N(x_value)
        )

        x_min = xv - 10
        x_max = xv + 10

        y_min = -10
        y_max = 10

        if op == "=":
            self.ax.axvline(
                xv,
                linewidth=2.5,
                label=(
                    f"x = "
                    f"{sp.sstr(x_value)}"
                )
            )

            explanation = (
                "VERTICAL EQUATION\n"
                "════════════════════\n\n"
                f"Original: {relation['text']}\n\n"
                f"Boundary: x = "
                f"{sp.sstr(x_value)}\n\n"
                "The graph is a vertical "
                "solid line."
            )

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

            if op in ("<", "<="):
                region = (
                    XX < xv
                    if op == "<"
                    else XX <= xv
                )

                direction = "left"

            else:
                region = (
                    XX > xv
                    if op == ">"
                    else XX >= xv
                )

                direction = "right"

            self.ax.contourf(
                XX,
                YY,
                region.astype(float),
                levels=[
                    0.5,
                    1.5
                ],
                alpha=0.24
            )

            style = (
                "-"
                if op in ("<=", ">=")
                else "--"
            )

            self.ax.axvline(
                xv,
                linewidth=2.5,
                linestyle=style,
                label=(
                    f"x = "
                    f"{sp.sstr(x_value)}"
                )
            )

            if op == "<":
                result = 0 < xv
            elif op == "<=":
                result = 0 <= xv
            elif op == ">":
                result = 0 > xv
            else:
                result = 0 >= xv

            self.ax.scatter(
                0,
                0,
                s=65,
                zorder=6
            )

            explanation = (
                "VERTICAL INEQUALITY\n"
                "════════════════════\n\n"
                f"Original: {relation['text']}\n\n"
                f"Boundary: x = "
                f"{sp.sstr(x_value)}\n\n"
                "Boundary: "
                f"{'solid' if style == '-' else 'dashed'}\n"
                f"Solution region: {direction}\n\n"
                "Test point: (0,0)\n"
                f"Test: 0 {op} "
                f"{self.format_number(xv)}\n"
                f"Result: "
                f"{'TRUE ✓' if result else 'FALSE ✗'}"
            )

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

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.set_title(
            (
                "Graphical Representation\n"
                f"{relation['text']}"
            ),
            fontsize=13,
            fontweight="bold"
        )

        self.add_graph_branding(
            compact=True
        )

        self.ax.legend(
            loc="upper left",
            fontsize=8
        )

        self.figure.tight_layout()
        self.canvas.draw()

        self._set_explanation(
            explanation
        )

        for item in self.points_table.get_children():
            self.points_table.delete(item)

        self.points_note.config(
            text=(
                "Vertical boundary: "
                f"x = {sp.sstr(x_value)}"
            )
        )

    def _finish_equation_plot(
        self,
        original,
        y_values,
        x_intercept,
        y_intercept
    ):
        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.set_xlim(
            -10,
            10
        )

        finite = np.isfinite(
            y_values
        )

        if finite.any():
            ymin = np.nanmin(
                y_values[finite]
            )

            ymax = np.nanmax(
                y_values[finite]
            )

            span = max(
                5,
                ymax - ymin
            )

            self.ax.set_ylim(
                max(
                    -50,
                    min(
                        -10,
                        ymin - 0.12 * span
                    )
                ),
                min(
                    50,
                    max(
                        10,
                        ymax + 0.12 * span
                    )
                )
            )
        else:
            self.ax.set_ylim(
                -10,
                10
            )

        self._mark_intercepts(
            x_intercept,
            y_intercept
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

        self.ax.set_title(
            (
                "Graphical Representation\n"
                f"{original}"
            ),
            fontsize=13,
            fontweight="bold"
        )

        self.add_graph_branding(
            compact=True
        )

        self.ax.legend(
            loc="upper left",
            fontsize=8
        )

        self.figure.tight_layout()
        self.canvas.draw()

    def _mark_intercepts(
        self,
        xi,
        yi
    ):
        if xi is not None:
            try:
                xv = float(
                    sp.N(xi)
                )

                if -10 <= xv <= 10:
                    self.ax.scatter(
                        xv,
                        0,
                        s=60,
                        zorder=7
                    )

                    self.ax.annotate(
                        (
                            "X-int ("
                            f"{self.format_number(xv)}, 0)"
                        ),
                        (xv, 0),
                        xytext=(7, -18),
                        textcoords="offset points",
                        fontsize=8
                    )
            except Exception:
                pass

        try:
            yv = float(
                sp.N(yi)
            )

            if -50 <= yv <= 50:
                self.ax.scatter(
                    0,
                    yv,
                    s=60,
                    zorder=7
                )

                self.ax.annotate(
                    (
                        "Y-int (0, "
                        f"{self.format_number(yv)})"
                    ),
                    (0, yv),
                    xytext=(7, 7),
                    textcoords="offset points",
                    fontsize=8
                )
        except Exception:
            pass

    def _equation_explanation(
        self,
        relation,
        boundary,
        slope,
        intercept,
        xi
    ):
        return (
            "EQUATION ANALYSIS\n"
            "════════════════════\n\n"
            "STEP 1 — Original\n"
            f"{relation['text']}\n\n"
            "STEP 2 — Boundary form\n"
            f"y = {sp.sstr(boundary)}\n\n"
            "STEP 3 — Slope\n"
            f"m = {sp.sstr(slope)}\n\n"
            "STEP 4 — Y-intercept\n"
            f"(0, {sp.sstr(intercept)})\n\n"
            "STEP 5 — X-intercept\n"
            f"({sp.sstr(xi)}, 0)\n\n"
            "INTERPRETATION\n"
            "A linear equation is represented by "
            "a single solid straight line."
        )

    def _inequality_explanation(
        self,
        relation,
        boundary,
        slope,
        intercept,
        xi,
        direction,
        boundary_value,
        result
    ):
        boundary_style = (
            "SOLID — boundary included"
            if relation["operator"] in ("<=", ">=")
            else "DASHED — boundary excluded"
        )

        return (
            "INEQUALITY ANALYSIS\n"
            "════════════════════\n\n"
            "STEP 1 — Original\n"
            f"{relation['text']}\n\n"
            "STEP 2 — Boundary equation\n"
            f"y = {sp.sstr(boundary)}\n\n"
            "STEP 3 — Boundary style\n"
            f"{boundary_style}\n\n"
            "STEP 4 — Intercepts\n"
            f"X-intercept = ({sp.sstr(xi)}, 0)\n"
            f"Y-intercept = "
            f"(0, {sp.sstr(intercept)})\n\n"
            "STEP 5 — Test point\n"
            "(0, 0)\n"
            f"Boundary y-value = "
            f"{self.format_number(boundary_value)}\n\n"
            "STEP 6 — Solution region\n"
            f"Shade {direction} the boundary.\n\n"
            f"TEST RESULT: "
            f"{'TRUE ✓' if result else 'FALSE ✗'}\n"
            "The test point identifies the "
            "satisfying half-plane."
        )

    def _update_equation_points_table(
        self,
        boundary,
        xi
    ):
        for item in self.points_table.get_children():
            self.points_table.delete(item)

        values = [
            -2,
            -1,
            0,
            1,
            2
        ]

        if xi is not None:
            try:
                value = float(
                    sp.N(xi)
                )

                if -10 <= value <= 10:
                    values.append(value)
            except Exception:
                pass

        unique = []

        for value in values:
            if not any(
                abs(value - old) < 1e-8
                for old in unique
            ):
                unique.append(value)

        for i, xv in enumerate(
            sorted(unique),
            1
        ):
            try:
                yv = sp.simplify(
                    boundary.subs(
                        self.x,
                        sp.Rational(
                            str(xv)
                        )
                    )
                )

                xf = self.format_number(
                    xv
                )

                yf = self.format_number(
                    float(sp.N(yv))
                )

                self.points_table.insert(
                    "",
                    "end",
                    values=(
                        f"P{i}",
                        xf,
                        yf,
                        f"({xf}, {yf})",
                        "Boundary"
                    )
                )
            except Exception:
                pass

        self.points_note.config(
            text=(
                "Boundary equation: "
                f"y = {sp.sstr(boundary)}\n"
                "Two distinct points are sufficient "
                "to draw a straight line."
            )
        )

    # ============================================================
    # LPP PARSING / SOLVER
    # ============================================================

    def _get_lpp_constraints(self):
        constraints = []

        for (
            _,
            _,
            left_var,
            op_var,
            right_var
        ) in self.constraint_rows:

            left = left_var.get().strip()
            right = right_var.get().strip()
            op = op_var.get().strip()

            if not left and not right:
                continue

            if not left or not right:
                raise ValueError(
                    "Every constraint row must "
                    "have both sides."
                )

            constraints.append(
                self.parse_relation(
                    f"{left} {op} {right}"
                )
            )

        if not constraints:
            raise ValueError(
                "Enter at least one constraint."
            )

        return constraints

    def _constraint_value(
        self,
        constraint,
        x,
        y
    ):
        return float(
            sp.N(
                constraint["a"] * x
                + constraint["b"] * y
                + constraint["c"]
            )
        )

    def _feasible(
        self,
        point,
        constraints,
        tol=1e-8
    ):
        xv, yv = point

        for constraint in constraints:
            value = self._constraint_value(
                constraint,
                xv,
                yv
            )

            op = constraint["operator"]

            if (
                op == "<"
                and not value < -tol
            ):
                return False

            if (
                op == "<="
                and not value <= tol
            ):
                return False

            if (
                op == ">"
                and not value > tol
            ):
                return False

            if (
                op == ">="
                and not value >= -tol
            ):
                return False

            if (
                op == "="
                and abs(value) > tol
            ):
                return False

        return True

    def _intersection(
        self,
        c1,
        c2
    ):
        determinant = sp.simplify(
            c1["a"] * c2["b"]
            - c2["a"] * c1["b"]
        )

        if determinant == 0:
            return None

        solution = sp.solve(
            (
                c1["a"] * self.x
                + c1["b"] * self.y
                + c1["c"],

                c2["a"] * self.x
                + c2["b"] * self.y
                + c2["c"]
            ),
            (self.x, self.y),
            dict=True
        )

        if not solution:
            return None

        return (
            sp.simplify(
                solution[0][self.x]
            ),
            sp.simplify(
                solution[0][self.y]
            )
        )

    def _unique_points(
        self,
        points
    ):
        result = []

        for point in points:
            if point is None:
                continue

            duplicate = False

            for old in result:
                if (
                    abs(
                        float(
                            sp.N(
                                point[0] - old[0]
                            )
                        )
                    ) < 1e-8
                    and
                    abs(
                        float(
                            sp.N(
                                point[1] - old[1]
                            )
                        )
                    ) < 1e-8
                ):
                    duplicate = True
                    break

            if not duplicate:
                result.append(point)

        return result

    def _find_feasible_vertices(
        self,
        constraints
    ):
        candidates = []

        for c1, c2 in itertools.combinations(
            constraints,
            2
        ):
            point = self._intersection(
                c1,
                c2
            )

            if point is not None:
                candidates.append(
                    point
                )

        origin = (
            sp.Integer(0),
            sp.Integer(0)
        )

        candidates.append(
            origin
        )

        feasible = [
            point
            for point in candidates
            if self._feasible(
                point,
                constraints
            )
        ]

        return self._unique_points(
            feasible
        )

    def _objective_value(
        self,
        objective,
        point
    ):
        return sp.simplify(
            objective.subs(
                {
                    self.x: point[0],
                    self.y: point[1]
                }
            )
        )

    def solve_lpp(self):
        try:
            objective_text = (
                self.objective_var.get().strip()
            )

            objective = sp.sympify(
                objective_text,
                locals={
                    "x": self.x,
                    "y": self.y
                }
            )

            objective_poly = sp.Poly(
                objective,
                self.x,
                self.y
            )

            if (
                objective_poly.total_degree()
                > 1
            ):
                raise ValueError(
                    "The objective function "
                    "must be linear."
                )

            constraints = (
                self._get_lpp_constraints()
            )

            vertices = (
                self._find_feasible_vertices(
                    constraints
                )
            )

            if not vertices:
                self.current_result = None

                self.lpp_status_var.set(
                    "No feasible corner point found."
                )

                self._plot_lpp(
                    objective,
                    constraints,
                    [],
                    [],
                    None,
                    special_case=(
                        "infeasible_or_unbounded"
                    )
                )

                return

            values = [
                self._objective_value(
                    objective,
                    point
                )
                for point in vertices
            ]

            numeric_values = [
                float(
                    sp.N(value)
                )
                for value in values
            ]

            if (
                self.objective_type.get()
                == "Maximise"
            ):
                best_numeric = max(
                    numeric_values
                )
            else:
                best_numeric = min(
                    numeric_values
                )

            optimal_points = [
                point
                for point, value in zip(
                    vertices,
                    numeric_values
                )
                if abs(
                    value - best_numeric
                ) < 1e-8
            ]

            best_value = (
                self._objective_value(
                    objective,
                    optimal_points[0]
                )
            )

            bounded = (
                self._detect_boundedness(
                    constraints
                )
            )

            if bounded is False:
                status = (
                    "Feasible region detected; "
                    "objective may be unbounded."
                )
            else:
                status = (
                    "Optimal value: "
                    f"Z = {sp.sstr(best_value)}"
                )

            self.current_result = {
                "objective": objective,
                "objective_text": objective_text,
                "direction": (
                    self.objective_type.get()
                ),
                "constraints": constraints,
                "vertices": vertices,
                "values": values,
                "optimal_points": optimal_points,
                "best_value": best_value,
                "bounded": bounded,
                "status": status
            }

            self.lpp_status_var.set(
                status
            )

            self._plot_lpp(
                objective,
                constraints,
                vertices,
                optimal_points,
                best_value,
                special_case=(
                    "unbounded"
                    if bounded is False
                    else None
                )
            )

        except Exception as exc:
            self.current_result = None

            self.lpp_status_var.set(
                "Error"
            )

            messagebox.showerror(
                "LPP Error",
                (
                    "Could not solve the LPP.\n\n"
                    f"{exc}"
                )
            )

    def _detect_boundedness(
        self,
        constraints
    ):
        """
        For a 2-D polyhedron, inspect representative recession
        directions. A non-zero feasible recession direction means
        the feasible region is unbounded.
        """

        directions = [
            (sp.Integer(1), sp.Integer(0)),
            (sp.Integer(-1), sp.Integer(0)),
            (sp.Integer(0), sp.Integer(1)),
            (sp.Integer(0), sp.Integer(-1))
        ]

        for constraint in constraints:
            a = constraint["a"]
            b = constraint["b"]

            if a == 0 and b == 0:
                continue

            directions.extend(
                [
                    (b, -a),
                    (-b, a)
                ]
            )

        for dx, dy in directions:
            valid = True

            for constraint in constraints:
                value = sp.simplify(
                    constraint["a"] * dx
                    + constraint["b"] * dy
                )

                op = constraint["operator"]

                if (
                    op in ("<", "<=")
                    and value > 0
                ):
                    valid = False
                    break

                if (
                    op in (">", ">=")
                    and value < 0
                ):
                    valid = False
                    break

                if (
                    op == "="
                    and value != 0
                ):
                    valid = False
                    break

            if (
                valid
                and not (
                    dx == 0
                    and dy == 0
                )
            ):
                return False

        return True

    # ============================================================
    # LPP PLOT
    # ============================================================

    def _lpp_bounds(
        self,
        constraints,
        vertices
    ):
        xs = []
        ys = []

        for point in vertices:
            xs.append(
                float(
                    sp.N(point[0])
                )
            )

            ys.append(
                float(
                    sp.N(point[1])
                )
            )

        for constraint in constraints:
            a = constraint["a"]
            b = constraint["b"]
            cc = constraint["c"]

            if a != 0:
                xs.append(
                    float(
                        sp.N(
                            -cc / a
                        )
                    )
                )

            if b != 0:
                ys.append(
                    float(
                        sp.N(
                            -cc / b
                        )
                    )
                )

        if not xs:
            xs = [0, 10]

        if not ys:
            ys = [0, 10]

        xmin = min(xs)
        xmax = max(xs)
        ymin = min(ys)
        ymax = max(ys)

        xmin = min(
            0,
            xmin
        )

        ymin = min(
            0,
            ymin
        )

        xspan = max(
            5,
            xmax - xmin
        )

        yspan = max(
            5,
            ymax - ymin
        )

        xmin -= 0.10 * xspan
        xmax += 0.15 * xspan
        ymin -= 0.10 * yspan
        ymax += 0.15 * yspan

        return (
            max(-1000, xmin),
            min(1000, xmax),
            max(-1000, ymin),
            min(1000, ymax)
        )

    def _plot_lpp(
        self,
        objective,
        constraints,
        vertices,
        optimal_points,
        best_value,
        special_case=None
    ):
        xmin, xmax, ymin, ymax = (
            self._lpp_bounds(
                constraints,
                vertices
            )
        )

        self.ax.clear()

        X, Y = np.meshgrid(
            np.linspace(
                xmin,
                xmax,
                600
            ),
            np.linspace(
                ymin,
                ymax,
                600
            )
        )

        feasible = np.ones(
            X.shape,
            dtype=bool
        )

        for constraint in constraints:
            lhs = (
                float(
                    sp.N(
                        constraint["a"]
                    )
                ) * X
                +
                float(
                    sp.N(
                        constraint["b"]
                    )
                ) * Y
                +
                float(
                    sp.N(
                        constraint["c"]
                    )
                )
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
                    lhs,
                    0,
                    atol=0.05
                )

            feasible &= condition

        self.ax.contourf(
            X,
            Y,
            feasible.astype(float),
            levels=[
                0.5,
                1.5
            ],
            alpha=0.28
        )

        x_values = np.linspace(
            xmin,
            xmax,
            1000
        )

        for index, constraint in enumerate(
            constraints,
            start=1
        ):
            a = constraint["a"]
            b = constraint["b"]
            cc = constraint["c"]
            op = constraint["operator"]

            style = (
                "-"
                if op in (
                    "<=",
                    ">=",
                    "="
                )
                else "--"
            )

            if b != 0:
                slope = float(
                    sp.N(
                        -a / b
                    )
                )

                intercept = float(
                    sp.N(
                        -cc / b
                    )
                )

                y_values = (
                    slope * x_values
                    + intercept
                )

                self.ax.plot(
                    x_values,
                    y_values,
                    linewidth=2.0,
                    linestyle=style,
                    label=(
                        f"C{index}: "
                        f"{constraint['text']}"
                    )
                )

            else:
                xv = float(
                    sp.N(
                        -cc / a
                    )
                )

                self.ax.axvline(
                    xv,
                    linewidth=2.0,
                    linestyle=style,
                    label=(
                        f"C{index}: "
                        f"{constraint['text']}"
                    )
                )

        for index, point in enumerate(
            vertices,
            start=1
        ):
            px = float(
                sp.N(point[0])
            )

            py = float(
                sp.N(point[1])
            )

            optimal = any(
                (
                    abs(
                        float(
                            sp.N(
                                point[0]
                                - p[0]
                            )
                        )
                    ) < 1e-8
                    and
                    abs(
                        float(
                            sp.N(
                                point[1]
                                - p[1]
                            )
                        )
                    ) < 1e-8
                )
                for p in optimal_points
            )

            self.ax.scatter(
                px,
                py,
                s=120 if optimal else 60,
                zorder=8
            )

            label = (
                f"P{index} "
                f"({self.format_number(px)}, "
                f"{self.format_number(py)})"
            )

            if optimal:
                label += "  ★"

            self.ax.annotate(
                label,
                (px, py),
                xytext=(7, 7),
                textcoords="offset points",
                fontsize=8,
                fontweight=(
                    "bold"
                    if optimal
                    else "normal"
                )
            )

        if (
            optimal_points
            and best_value is not None
        ):
            point = optimal_points[0]

            px = float(
                sp.N(point[0])
            )

            py = float(
                sp.N(point[1])
            )

            self.ax.annotate(
                (
                    "OPTIMUM\n"
                    f"Z = {sp.sstr(best_value)}"
                ),
                (px, py),
                xytext=(25, -35),
                textcoords="offset points",
                fontsize=9,
                fontweight="bold",
                bbox=dict(
                    boxstyle="round,pad=0.35",
                    facecolor="white",
                    edgecolor=self.GREEN,
                    alpha=0.95
                ),
                arrowprops=dict(
                    arrowstyle="->"
                )
            )

        self.ax.axhline(
            0,
            linewidth=1.2
        )

        self.ax.axvline(
            0,
            linewidth=1.2
        )

        self.ax.set_xlim(
            xmin,
            xmax
        )

        self.ax.set_ylim(
            ymin,
            ymax
        )

        self.ax.set_xlabel(
            "X"
        )

        self.ax.set_ylabel(
            "Y"
        )

        self.ax.grid(
            True,
            alpha=0.22
        )

        direction = (
            self.objective_type.get()
        )

        self.ax.set_title(
            (
                "Linear Programming — Graphical Method\n"
                f"{direction} Z = "
                f"{sp.sstr(objective)}"
            ),
            fontsize=13,
            fontweight="bold"
        )

        self.add_graph_branding(
            compact=False
        )

        self.ax.legend(
            loc="upper left",
            fontsize=7
        )

        if special_case == "unbounded":
            self.ax.text(
                0.99,
                0.98,
                (
                    "WARNING: FEASIBLE REGION\n"
                    "MAY BE UNBOUNDED"
                ),
                transform=self.ax.transAxes,
                ha="right",
                va="top",
                fontsize=9,
                fontweight="bold",
                color=self.RED,
                bbox=dict(
                    boxstyle="round,pad=0.4",
                    facecolor="white",
                    edgecolor=self.RED,
                    alpha=0.95
                )
            )

        self.figure.tight_layout()
        self.canvas.draw()

        self._update_lpp_points_table(
            objective,
            vertices,
            optimal_points
        )

        self._set_explanation(
            self._lpp_explanation(
                objective,
                constraints,
                vertices,
                optimal_points,
                best_value,
                special_case
            )
        )

    # ============================================================
    # LPP POINTS TABLE
    # ============================================================

    def _update_lpp_points_table(
        self,
        objective,
        vertices,
        optimal_points
    ):
        for item in (
            self.points_table.get_children()
        ):
            self.points_table.delete(
                item
            )

        for index, point in enumerate(
            vertices,
            start=1
        ):
            px = float(
                sp.N(point[0])
            )

            py = float(
                sp.N(point[1])
            )

            z = self._objective_value(
                objective,
                point
            )

            optimal = any(
                (
                    abs(
                        float(
                            sp.N(
                                point[0]
                                - p[0]
                            )
                        )
                    ) < 1e-8
                    and
                    abs(
                        float(
                            sp.N(
                                point[1]
                                - p[1]
                            )
                        )
                    ) < 1e-8
                )
                for p in optimal_points
            )

            self.points_table.insert(
                "",
                "end",
                values=(
                    f"P{index}",
                    self.format_number(px),
                    self.format_number(py),
                    sp.sstr(z),
                    (
                        "★ OPTIMAL"
                        if optimal
                        else "Feasible"
                    )
                ),
                tags=(
                    ("optimal",)
                    if optimal
                    else ()
                )
            )

        self.points_note.config(
            text=(
                "The table lists feasible corner points. "
                "Z is evaluated at every point. "
                "A starred point is optimal for the "
                "selected objective."
            )
        )

    # ============================================================
    # LPP EXPLANATION
    # ============================================================

    def _lpp_explanation(
        self,
        objective,
        constraints,
        vertices,
        optimal_points,
        best_value,
        special_case
    ):
        lines = [
            "LINEAR PROGRAMMING ANALYSIS",
            "════════════════════════════",
            "",
            "STEP 1 — Objective Function",
            (
                f"{self.objective_type.get()} "
                f"Z = {sp.sstr(objective)}"
            ),
            "",
            "STEP 2 — Constraints"
        ]

        for index, constraint in enumerate(
            constraints,
            start=1
        ):
            lines.append(
                f"C{index}: {constraint['text']}"
            )

        lines.extend(
            [
                "",
                "STEP 3 — Boundary Equations",
                "────────────────────────────"
            ]
        )

        for index, constraint in enumerate(
            constraints,
            start=1
        ):
            equation = sp.Eq(
                constraint["a"] * self.x
                + constraint["b"] * self.y
                + constraint["c"],
                0
            )

            lines.append(
                f"C{index}: {sp.sstr(equation)}"
            )

        lines.extend(
            [
                "",
                "STEP 4 — Feasible Region",
                "────────────────────────────",
                "The shaded region is the intersection",
                "of all constraint regions.",
                ""
            ]
        )

        if not vertices:
            lines.extend(
                [
                    "NO FEASIBLE CORNER POINT FOUND.",
                    "",
                    "Possible interpretation:",
                    "• infeasible problem, or",
                    "• feasible set without a finite vertex,",
                    "  or another special case.",
                    "",
                    "No finite optimum is declared."
                ]
            )

            return "\n".join(
                lines
            )

        lines.extend(
            [
                "STEP 5 — Corner Points",
                "────────────────────────────"
            ]
        )

        for index, point in enumerate(
            vertices,
            start=1
        ):
            z = self._objective_value(
                objective,
                point
            )

            marker = ""

            if any(
                (
                    abs(
                        float(
                            sp.N(
                                point[0]
                                - p[0]
                            )
                        )
                    ) < 1e-8
                    and
                    abs(
                        float(
                            sp.N(
                                point[1]
                                - p[1]
                            )
                        )
                    ) < 1e-8
                )
                for p in optimal_points
            ):
                marker = "  ★ OPTIMAL"

            lines.append(
                (
                    f"P{index} = "
                    f"({sp.sstr(point[0])}, "
                    f"{sp.sstr(point[1])})   "
                    f"Z = {sp.sstr(z)}"
                    f"{marker}"
                )
            )

        lines.extend(
            [
                "",
                "STEP 6 — Objective Evaluation",
                "────────────────────────────",
                "The objective is evaluated at every",
                "feasible corner point."
            ]
        )

        if special_case == "unbounded":
            lines.extend(
                [
                    "",
                    "SPECIAL CASE — POSSIBLY UNBOUNDED",
                    "────────────────────────────",
                    "A feasible recession direction was detected.",
                    "Therefore a finite optimum cannot safely be",
                    "declared from the corner-point list alone."
                ]
            )

        elif optimal_points:
            lines.extend(
                [
                    "",
                    "RESULT",
                    "════════════════════════════",
                    (
                        f"{self.objective_type.get()} "
                        f"Z = {sp.sstr(best_value)}"
                    )
                ]
            )

            if len(optimal_points) == 1:
                point = optimal_points[0]

                lines.append(
                    (
                        "Optimal solution = "
                        f"({sp.sstr(point[0])}, "
                        f"{sp.sstr(point[1])})"
                    )
                )

                lines.append(
                    "The starred point is the optimal corner."
                )

            else:
                lines.extend(
                    [
                        "Multiple corner points have the same",
                        "optimal objective value.",
                        "This indicates alternate optimal solutions."
                    ]
                )

        return "\n".join(
            lines
        )

    # ============================================================
    # BRANDING
    # ============================================================

    def add_graph_branding(
        self,
        compact=False
    ):
        if compact:
            text = (
                f"{self.ORG}\n"
                f"Ph: {self.PHONE}  |  "
                f"{self.WEBSITE}"
            )
        else:
            text = (
                f"{self.ORG}\n"
                f"{self.TAGLINE}\n"
                f"Ph: {self.PHONE}  |  "
                f"{self.WEBSITE}"
            )

        self.ax.text(
            0.985,
            0.018,
            text,
            transform=self.ax.transAxes,
            ha="right",
            va="bottom",
            fontsize=7 if compact else 7.5,
            fontweight="bold",
            color=self.NAVY,
            linespacing=1.2,
            bbox=dict(
                boxstyle="round,pad=0.35",
                facecolor="white",
                edgecolor="#CBD5E1",
                alpha=0.94
            ),
            zorder=20
        )

    # ============================================================
    # EXPORT
    # ============================================================

    def download_graph(self):
        if (
            not self.ax.lines
            and not self.ax.collections
            and not self.ax.patches
        ):
            messagebox.showwarning(
                "No graph",
                "Plot or solve something before exporting."
            )
            return

        stamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        default = (
            f"CNAT_Quantitative_Analysis_"
            f"{stamp}.png"
        )

        path = filedialog.asksaveasfilename(
            title="Export Graph",
            initialfile=default,
            defaultextension=".png",
            filetypes=(
                ("PNG image", "*.png"),
                ("JPEG image", "*.jpg"),
                ("PDF document", "*.pdf"),
                ("SVG image", "*.svg")
            )
        )

        if not path:
            return

        try:
            self.figure.savefig(
                path,
                dpi=300,
                bbox_inches="tight",
                facecolor="white"
            )

            messagebox.showinfo(
                "Export complete",
                (
                    "Graph exported successfully.\n\n"
                    f"{path}"
                )
            )

        except Exception as exc:
            messagebox.showerror(
                "Export error",
                str(exc)
            )

    def export_points_csv(self):
        if not self.current_result:
            messagebox.showwarning(
                "No solution",
                "Solve an LPP before exporting points."
            )
            return

        result = self.current_result

        stamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        path = filedialog.asksaveasfilename(
            title="Export Corner Points",
            initialfile=(
                f"CNAT_LPP_Points_"
                f"{stamp}.csv"
            ),
            defaultextension=".csv",
            filetypes=(
                ("CSV file", "*.csv"),
            )
        )

        if not path:
            return

        try:
            with open(
                path,
                "w",
                newline="",
                encoding="utf-8-sig"
            ) as file:

                writer = csv.writer(
                    file
                )

                writer.writerow(
                    [
                        "Point",
                        "X",
                        "Y",
                        "Objective Z",
                        "Status"
                    ]
                )

                for index, point in enumerate(
                    result["vertices"],
                    start=1
                ):
                    z = self._objective_value(
                        result["objective"],
                        point
                    )

                    optimal = any(
                        (
                            abs(
                                float(
                                    sp.N(
                                        point[0]
                                        - p[0]
                                    )
                                )
                            ) < 1e-8
                            and
                            abs(
                                float(
                                    sp.N(
                                        point[1]
                                        - p[1]
                                    )
                                )
                            ) < 1e-8
                        )
                        for p in result[
                            "optimal_points"
                        ]
                    )

                    writer.writerow(
                        [
                            f"P{index}",
                            sp.sstr(point[0]),
                            sp.sstr(point[1]),
                            sp.sstr(z),
                            (
                                "OPTIMAL"
                                if optimal
                                else "Feasible"
                            )
                        ]
                    )

            messagebox.showinfo(
                "Export complete",
                (
                    "CSV saved successfully.\n\n"
                    f"{path}"
                )
            )

        except Exception as exc:
            messagebox.showerror(
                "CSV export error",
                str(exc)
            )

    # ============================================================
    # CLEAR
    # ============================================================

    def clear_equation(self):
        self.equation_var.set(
            ""
        )

        self.example_var.set(
            ""
        )

        self.ax.clear()

        self.ax.axhline(
            0,
            linewidth=1
        )

        self.ax.axvline(
            0,
            linewidth=1
        )

        self.ax.grid(
            True,
            alpha=0.25
        )

        self.ax.set_title(
            "Enter an equation or inequality",
            fontsize=14,
            fontweight="bold"
        )

        self.canvas.draw()

        self._set_explanation(
            "Enter an equation or inequality to begin."
        )

    def format_number(
        self,
        value
    ):
        value = float(value)

        if abs(
            value - round(value)
        ) < 1e-10:
            return str(
                int(
                    round(value)
                )
            )

        return (
            f"{value:.4f}"
            .rstrip("0")
            .rstrip(".")
        )


# ================================================================
# START
# ================================================================

if __name__ == "__main__":
    root = tk.Tk()

    app = QuantitativeAnalysisTool(
        root
    )

    root.mainloop()
