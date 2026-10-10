"""
Module 004: Problem Solving Methodology & Flowchart Design
Topic 4: Standard ANSI/ISO Flowchart Conventions Simulation
Pure Python Flowchart Node & Edge Schema Validator modeling standard symbols:
  1. Terminal (Oval / Rounded Rectangle): Start & Stop
  2. Input / Output (Parallelogram): Read & Print
  3. Processing (Rectangle): Arithmetic operations & Variable assignments
  4. Decision (Rhombus / Diamond): Conditional branching with True/False branches
  5. Connector (Small Circle): On-page jumping connection
  6. Off-page Connector (Pentagon / Home plate): Linking across multi-page sheets
  7. Flow lines (Arrows): Indicating unidirectional execution flow
"""

from typing import Dict, List, Any

class FlowchartSymbolsValidator:
    """Validates structural correctness of flowchart node-edge graphs."""

    def __init__(self):
        self.ansi_symbols = {
            "TERMINAL": {
                "shape": "Oval / Rounded Rectangle / Capsule",
                "purpose": "Indicates the Start or Stop/End of the flowchart",
                "rules": "Must have only 1 outgoing line for Start; only incoming lines for Stop."
            },
            "INPUT_OUTPUT": {
                "shape": "Parallelogram",
                "purpose": "Denotes data input (Read/Get) or data output (Print/Display)",
                "rules": "Has 1 incoming line and 1 outgoing line."
            },
            "PROCESSING": {
                "shape": "Rectangle",
                "purpose": "Calculations, formula evaluations, and variable data assignments",
                "rules": "Has 1 incoming line and 1 outgoing line."
            },
            "DECISION": {
                "shape": "Rhombus / Diamond",
                "purpose": "Tests a conditional boolean expression (relational comparison)",
                "rules": "Has 1 incoming line and exactly 2 or 3 outgoing branches labeled (True/False or Yes/No)."
            },
            "CONNECTOR": {
                "shape": "Small Circle",
                "purpose": "Connects flowlines on the same page to prevent messy overlapping lines",
                "rules": "Contains an identifying letter/number (e.g., 'A')."
            },
            "OFFPAGE_CONNECTOR": {
                "shape": "Pentagon / Home-plate symbol",
                "purpose": "Connects flowline paths that cross over into different printed pages",
                "rules": "Indicates target page number."
            },
            "FLOWLINE": {
                "shape": "Arrowhead line",
                "purpose": "Directs the sequential flow of program control",
                "rules": "Must have arrowheads showing unambiguous direction of control."
            }
        }

    def validate_flowchart_graph(self, nodes: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Validates standard rules: Start exists, End exists, Decisions have 2 outgoing branches."""
        has_start = any(n.get("type") == "START" for n in nodes)
        has_end = any(n.get("type") == "END" for n in nodes)
        decision_errors = []

        for n in nodes:
            if n.get("type") == "DECISION":
                branches = n.get("branches", [])
                if len(branches) < 2:
                    decision_errors.append(f"Decision Node '{n.get('id')}' must have at least 2 labeled branches (True/False). Found {len(branches)}.")

        is_valid = has_start and has_end and len(decision_errors) == 0
        return {
            "valid_flowchart": is_valid,
            "has_start_terminal": has_start,
            "has_end_terminal": has_end,
            "decision_node_compliance": "PASSED" if not decision_errors else "FAILED",
            "validation_errors": decision_errors
        }

if __name__ == "__main__":
    validator = FlowchartSymbolsValidator()
    print("=" * 65)
    print("STANDARD ANSI/ISO FLOWCHART SYMBOL VALIDATION ENGINE")
    print("=" * 65)

    sample_nodes = [
        {"id": "N1", "type": "START", "label": "Start"},
        {"id": "N2", "type": "INPUT_OUTPUT", "label": "Input N"},
        {"id": "N3", "type": "DECISION", "label": "Is N % 2 == 0?", "branches": ["True", "False"]},
        {"id": "N4", "type": "INPUT_OUTPUT", "label": "Print Even"},
        {"id": "N5", "type": "INPUT_OUTPUT", "label": "Print Odd"},
        {"id": "N6", "type": "END", "label": "Stop"}
    ]

    report = validator.validate_flowchart_graph(sample_nodes)
    print("Validation Report for Even/Odd Flowchart:")
    for k, v in report.items():
        print(f"  {k:25}: {v}")
