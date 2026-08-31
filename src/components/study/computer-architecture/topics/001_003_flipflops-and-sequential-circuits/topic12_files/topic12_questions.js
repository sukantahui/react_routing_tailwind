// Question Bank for Topic 12: Characteristic Table vs Excitation Table
const questions = [
  {
    "question": "What is the primary conceptual difference between a Characteristic Table and an Excitation Table?",
    "shortAnswer": "A Characteristic Table maps inputs to next states (used for analysis), while an Excitation Table maps state transitions to required inputs (used for design and synthesis).",
    "explanation": "Analysis starts with known input stimuli and determines the resulting output state Q(t+1). Synthesis starts with the desired sequential state sequence and determines the necessary input signals.",
    "hint": "Think analysis vs synthesis / forward vs reverse mapping.",
    "level": "basic",
    "codeExample": "// Characteristic: [Inputs, Q(t)] → Q(t+1)\n// Excitation:     [Q(t), Q(t+1)] → Inputs"
  },
  {
    "question": "What is the mnemonic shortcut to remember the JK flip-flop excitation table?",
    "shortAnswer": "Column J reads top-to-bottom as 0, 1, X, X; Column K reads top-to-bottom as X, X, 1, 0.",
    "explanation": "For transitions 0->0, 0->1, 1->0, 1->1: J is 0, 1, X, X and K is X, X, 1, 0. This symmetry makes it easy to write down during exams without deriving from scratch.",
    "hint": "Remember 01XX for J and XX10 for K.",
    "level": "basic",
    "codeExample": "// Q(t)->Q(t+1) | J  K\n// 0 → 0       | 0  X\n// 0 → 1       | 1  X\n// 1 → 0       | X  1\n// 1 → 1       | X  0"
  },
  {
    "question": "Why is the D flip-flop excitation table the simplest among all flip-flops?",
    "shortAnswer": "Because the required D input is always identical to the desired Next State: D = Q(t+1), regardless of the present state Q(t).",
    "explanation": "Since a D flip-flop directly stores whatever data is present on its D line on the clock edge, D must simply be set to 1 if you want Next State 1, and 0 if you want Next State 0.",
    "hint": "Look at the next state column value.",
    "level": "basic",
    "codeExample": "// D Flip-Flop Excitation:\nassign D = Next_State_Q;"
  },
  {
    "question": "What Boolean operation defines the T flip-flop excitation value from present and next states?",
    "shortAnswer": "The XOR operation: T = Q(t) XOR Q(t+1).",
    "explanation": "If the state remains unchanged (0->0 or 1->1), no toggle is needed so T=0. If the state changes (0->1 or 1->0), a toggle is required so T=1. This exactly matches the XOR truth table.",
    "hint": "Different states require 1; identical states require 0.",
    "level": "moderate",
    "codeExample": "// T Flip-Flop Excitation:\nassign T = Present_Q ^ Next_Q;"
  },
  {
    "question": "Describe the 5-step standard algorithm for converting an available Flip-Flop (A) into a target Flip-Flop (B).",
    "shortAnswer": "1. Write Target Characteristic Table. 2. Append Available Excitation columns. 3. Plot K-Maps for available inputs. 4. Minimize Boolean equations. 5. Draw hardware circuit.",
    "explanation": "This systematic method works for converting any flip-flop type to any other (e.g., SR to JK, JK to D, D to T) by utilizing Don't-Care conditions in the K-Maps.",
    "hint": "Combine target behavior with available excitation needs.",
    "level": "moderate",
    "codeExample": "// Conversion Flow:\n// [Target Inputs + Q] → Q_next → [Available Inputs via Excitation]"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 6: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 6:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 7: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 7:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 8: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 8:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 9: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 9:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 10: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 10:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 11: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 11:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 12: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 12:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 13: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 13:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 14: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 14:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 15: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 15:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 16: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 16:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 17: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 17:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 18: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 18:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 19: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 19:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 20: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 20:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 21: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 21:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 22: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 22:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 23: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 23:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 24: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 24:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 25: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 25:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 26: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 26:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 27: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 27:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 28: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "moderate",
    "codeExample": "// K-Map minimization with Don't Cares for Case 28:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 29: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 1->1, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "basic",
    "codeExample": "// K-Map minimization with Don't Cares for Case 29:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  },
  {
    "question": "Characteristic vs Excitation Analysis Question 30: Explain how Don't-Care (X) conditions in excitation tables simplify combinational synthesis logic.",
    "shortAnswer": "Don't-Care entries can be grouped as 1s or 0s in K-Maps, allowing larger rectangular groupings and eliminating unnecessary logic gates.",
    "explanation": "In transition 0->0, unconstrained inputs reduce the required transistor count and critical path propagation delay.",
    "hint": "Consider K-Map grouping flexibility.",
    "level": "expert",
    "codeExample": "// K-Map minimization with Don't Cares for Case 30:\n// J = Target_Input & Q_bar; K = Target_Input & Q;"
  }
];

export default questions;
