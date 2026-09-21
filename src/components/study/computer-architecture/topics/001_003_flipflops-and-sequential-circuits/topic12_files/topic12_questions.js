// Question Bank for Topic 12: Characteristic Table vs Excitation Table & Flip-Flop Conversions
const questions = [
  {
    "question": "What is the primary conceptual difference between a Characteristic Table and an Excitation Table?",
    "shortAnswer": "A Characteristic Table maps present state and inputs to the resulting next state (analysis), while an Excitation Table maps state transitions to the required inputs (synthesis).",
    "explanation": "Analysis starts with known input stimuli and present state Q(t) to calculate next state Q(t+1). Reverse synthesis starts with the desired sequential transition Q(t) → Q(t+1) and solves for the required flip-flop input excitations.",
    "hint": "Think forward analysis vs reverse synthesis.",
    "level": "basic",
    "codeExample": "// Characteristic Table (Analysis):\n// [Inputs, Q(t)] → Q(t+1)\n\n// Excitation Table (Synthesis):\n// [Q(t), Q(t+1)] → Required Inputs"
  },
  {
    "question": "What is the complete Characteristic Table of an SR flip-flop?",
    "shortAnswer": "An 8-row table listing all combinations of S, R, and Q(t) yielding Q(t+1): S=0,R=0 gives Q; S=0,R=1 gives 0; S=1,R=0 gives 1; S=1,R=1 is invalid.",
    "explanation": "For S=0, R=0: Q(t+1) = Q(t) (Hold). For S=0, R=1: Q(t+1) = 0 (Reset). For S=1, R=0: Q(t+1) = 1 (Set). For S=1, R=1: Q(t+1) is forbidden/indeterminate in basic SR latches.",
    "hint": "List 8 rows for (S, R, Q(t)).",
    "level": "basic",
    "codeExample": "// S R Q(t) | Q(t+1) | State Action\n// 0 0  0   |   0    | No Change (Hold)\n// 0 0  1   |   1    | No Change (Hold)\n// 0 1  0   |   0    | Reset\n// 0 1  1   |   0    | Reset\n// 1 0  0   |   1    | Set\n// 1 0  1   |   1    | Set\n// 1 1  0   |   X    | Invalid (Forbidden)\n// 1 1  1   |   X    | Invalid (Forbidden)"
  },
  {
    "question": "How is the Excitation Table of an SR flip-flop derived for the transition 0 → 0?",
    "shortAnswer": "S = 0, R = X (Don't Care).",
    "explanation": "To transition from Q(t)=0 to Q(t+1)=0, the flip-flop could either perform 'Hold' (S=0, R=0) or 'Reset' (S=0, R=1). In both cases S must be 0, while R can be either 0 or 1. Hence S=0, R=X.",
    "hint": "What two operations keep a 0 state at 0?",
    "level": "basic",
    "codeExample": "// Transition 0 → 0:\n// Case A: No Change (S=0, R=0) => Q=0\n// Case B: Reset     (S=0, R=1) => Q=0\n// Common: S=0, R=X"
  },
  {
    "question": "How is the Excitation Table of an SR flip-flop derived for the transition 1 → 1?",
    "shortAnswer": "S = X, R = 0.",
    "explanation": "To transition from Q(t)=1 to Q(t+1)=1, the flip-flop could either perform 'Hold' (S=0, R=0) or 'Set' (S=1, R=0). In both cases R must be 0, while S can be either 0 or 1. Hence S=X, R=0.",
    "hint": "What two operations keep a 1 state at 1?",
    "level": "basic",
    "codeExample": "// Transition 1 → 1:\n// Case A: No Change (S=0, R=0) => Q=1\n// Case B: Set       (S=1, R=0) => Q=1\n// Common: S=X, R=0"
  },
  {
    "question": "What is the mnemonic shortcut to quickly remember the JK flip-flop excitation table?",
    "shortAnswer": "Column J reads downward: 0, 1, X, X; Column K reads downward: X, X, 1, 0.",
    "explanation": "For sequential transitions 0→0, 0→1, 1→0, 1→1: J column is '0, 1, X, X' and K column is 'X, X, 1, 0'. Notice that K is the exact reverse pattern of J.",
    "hint": "Remember '01XX' for J and 'XX10' for K.",
    "level": "basic",
    "codeExample": "// Q(t) → Q(t+1) | J  K\n//   0  →   0    | 0  X\n//   0  →   1    | 1  X\n//   1  →   0    | X  1\n//   1  →   1    | X  0"
  },
  {
    "question": "Why does the transition 0 → 1 in a JK flip-flop result in J = 1, K = X?",
    "shortAnswer": "Because state 0 can become 1 either by 'Set' (J=1, K=0) or by 'Toggle' (J=1, K=1).",
    "explanation": "In both Set and Toggle modes, J must be 1. Since K can be either 0 (Set) or 1 (Toggle) without changing the outcome, K is a don't-care (X).",
    "hint": "Consider both Set and Toggle actions from state 0.",
    "level": "moderate",
    "codeExample": "// Transition 0 → 1:\n// Option 1 (Set):    J=1, K=0 => Q_next = 1\n// Option 2 (Toggle): J=1, K=1 => Q_next = ~0 = 1\n// Synthesis: J=1, K=X"
  },
  {
    "question": "Why does the transition 1 → 0 in a JK flip-flop result in J = X, K = 1?",
    "shortAnswer": "Because state 1 can become 0 either by 'Reset' (J=0, K=1) or by 'Toggle' (J=1, K=1).",
    "explanation": "In both Reset and Toggle modes, K must be 1. Since J can be 0 or 1 without affecting the transition from 1 to 0, J is assigned a don't-care condition (X).",
    "hint": "Consider both Reset and Toggle actions from state 1.",
    "level": "moderate",
    "codeExample": "// Transition 1 → 0:\n// Option 1 (Reset):  J=0, K=1 => Q_next = 0\n// Option 2 (Toggle): J=1, K=1 => Q_next = ~1 = 0\n// Synthesis: J=X, K=1"
  },
  {
    "question": "Why is the D flip-flop excitation table considered the most straightforward?",
    "shortAnswer": "Because the required D input is always directly equal to the desired next state: D = Q(t+1).",
    "explanation": "A D (Data) flip-flop transfers its D input directly to the Q output upon every active clock edge. Therefore, whatever state is desired for Q(t+1) is precisely the value that must be applied to D.",
    "hint": "D directly dictates the next state.",
    "level": "basic",
    "codeExample": "// D Flip-Flop Excitation:\n// Q(t) → Q(t+1) | D\n//   0  →   0    | 0\n//   0  →   1    | 1\n//   1  →   0    | 0\n//   1  →   1    | 1\n// Formula: D = Q(t+1)"
  },
  {
    "question": "What algebraic operation defines the T flip-flop excitation table?",
    "shortAnswer": "The XOR (Exclusive-OR) operation: T = Q(t) ⊕ Q(t+1).",
    "explanation": "When the state does not change (0→0 or 1→1), no toggle is desired so T=0. When the state changes (0→1 or 1→0), a toggle is required so T=1. This exactly matches Q(t) XOR Q(t+1).",
    "hint": "State changed => 1; state same => 0.",
    "level": "basic",
    "codeExample": "// T Flip-Flop Excitation:\n// Q(t) → Q(t+1) | T\n//   0  →   0    | 0  (No toggle)\n//   0  →   1    | 1  (Toggle)\n//   1  →   0    | 1  (Toggle)\n//   1  →   1    | 0  (No toggle)\n// Formula: T = Q(t) ^ Q(t+1)"
  },
  {
    "question": "What are the 5 standard steps for converting an Available Flip-Flop to a Target Flip-Flop?",
    "shortAnswer": "1. Write Target Characteristic Table; 2. Append Available Excitation Table; 3. Plot K-Maps for available inputs; 4. Minimize Boolean equations; 5. Draw the logic circuit.",
    "explanation": "This 5-step conversion pipeline guarantees minimum combinational gate overhead when adapting any commercial flip-flop IC into any desired target behavior.",
    "hint": "Target characteristics -> Available excitations -> K-Maps -> Equations -> Schematic.",
    "level": "moderate",
    "codeExample": "// Step 1: Target FF [Inputs, Q(t)] -> Q(t+1)\n// Step 2: Lookup Q(t)->Q(t+1) in Available FF Excitation Table\n// Step 3: Draw K-Maps for Available Inputs = f(Target Inputs, Q(t))\n// Step 4: Group 1s and X (Don't Cares)\n// Step 5: Implement logic gates driving Available FF"
  },
  {
    "question": "In converting an SR flip-flop to a JK flip-flop, what are the derived input equations for S and R?",
    "shortAnswer": "S = J · Q̄ and R = K · Q.",
    "explanation": "Target is JK. Target Characteristic Table lists 8 rows. Matching with SR excitation gives S and R columns. K-Map minimization with don't-cares yields S = J·Q̄ and R = K·Q.",
    "hint": "S is activated when J=1 and Q=0; R is activated when K=1 and Q=1.",
    "level": "moderate",
    "codeExample": "// SR to JK Conversion Logic:\nassign S = J & (~Q);\nassign R = K & Q;"
  },
  {
    "question": "Why does the conversion logic S = J·Q̄ and R = K·Q eliminate the invalid state (S=1, R=1) in an SR flip-flop?",
    "shortAnswer": "Because S·R = (J·Q̄)·(K·Q) = J·K·(Q·Q̄) = 0 for all possible values of J, K, and Q.",
    "explanation": "Since Q and Q̄ are strict logical complements, their conjunction is always 0. Thus, S and R can never both be asserted simultaneously, permanently preventing the invalid state.",
    "hint": "What is Q AND Q-bar?",
    "level": "expert",
    "codeExample": "// Proof of Invalid State Elimination:\n// S & R = (J & ~Q) & (K & Q)\n//       = J & K & (Q & ~Q)\n//       = J & K & 0 = 0 (Always Safe!)"
  },
  {
    "question": "How do you convert an available JK flip-flop into a D flip-flop?",
    "shortAnswer": "Connect J = D and K = D̄ (using a single NOT gate).",
    "explanation": "When D=1: J=1, K=0 which forces Q(t+1)=1 (Set). When D=0: J=0, K=1 which forces Q(t+1)=0 (Reset). Hence, JK behaves identically to a D flip-flop.",
    "hint": "Drive J with D, and K with the inverted D.",
    "level": "basic",
    "codeExample": "// JK to D Conversion:\nassign J = D;\nassign K = ~D;"
  },
  {
    "question": "How do you convert an available D flip-flop into a T flip-flop?",
    "shortAnswer": "Connect D = T ⊕ Q (using a 2-input XOR gate feeding the D input with T and Q feedback).",
    "explanation": "Characteristic equation of T is Q(t+1) = T ⊕ Q. Since for a D flip-flop Q(t+1) = D, equating them gives D = T ⊕ Q. Feeding T XOR Q into D makes it toggle when T=1 and hold when T=0.",
    "hint": "Equate D = Q_next and substitute the T characteristic equation.",
    "level": "moderate",
    "codeExample": "// D to T Conversion:\nassign D = T ^ Q;"
  },
  {
    "question": "How do you convert an available JK flip-flop into a T flip-flop?",
    "shortAnswer": "Tie J and K inputs together and connect both to the T input: J = T, K = T.",
    "explanation": "When T=0: J=0, K=0 which produces the Hold state. When T=1: J=1, K=1 which produces the Toggle state. This precisely matches T flip-flop operation with zero external logic gates.",
    "hint": "Tie both inputs to T.",
    "level": "basic",
    "codeExample": "// JK to T Conversion:\nassign J = T;\nassign K = T;"
  },
  {
    "question": "How do you convert an available SR flip-flop into a D flip-flop?",
    "shortAnswer": "Connect S = D and R = D̄ (using an inverter between S and R).",
    "explanation": "When D=1: S=1, R=0 (Set). When D=0: S=0, R=1 (Reset). Since S and R are always complementary, S·R=0 is always satisfied and the flip-flop stores D reliably.",
    "hint": "Apply D to S and ~D to R.",
    "level": "basic",
    "codeExample": "// SR to D Conversion:\nassign S = D;\nassign R = ~D;"
  },
  {
    "question": "What is the Characteristic Equation of a JK flip-flop, and how is it derived?",
    "shortAnswer": "Q(t+1) = J·Q̄ + K̄·Q, derived by grouping minterms from the JK Characteristic Table on a 3-variable K-Map.",
    "explanation": "Plotting the 8 rows of (J, K, Q) with next states Q(t+1) onto a K-Map: Minterms are m1(0,0,1), m4(1,0,0), m5(1,0,1), m6(1,1,0). Grouping gives J·Q̄ + K̄·Q.",
    "hint": "Group the 1s in the JK truth table.",
    "level": "moderate",
    "codeExample": "// JK Characteristic Equation:\n// Q(t+1) = J & (~Q) | (~K) & Q"
  },
  {
    "question": "What is the Characteristic Equation of an SR flip-flop and what is its operational constraint?",
    "shortAnswer": "Q(t+1) = S + R̄·Q, subject to the constraint S · R = 0.",
    "explanation": "The Boolean equation Q(t+1) = S + R̄·Q correctly represents Hold, Reset, and Set. The constraint S·R=0 must hold to prevent entering the invalid/metastable condition.",
    "hint": "S sets the output, R_bar holds existing Q, S·R must be 0.",
    "level": "moderate",
    "codeExample": "// SR Characteristic Equation:\n// Q(t+1) = S | (~R & Q) with constraint (S & R == 0)"
  },
  {
    "question": "Why do excitation tables contain 'Don't Care' (X) entries, and how do they benefit IC synthesis?",
    "shortAnswer": "They occur because multiple input combinations produce the same state transition; in K-Maps, grouping them as 1s minimizes gate count and propagation delay.",
    "explanation": "For example, in transition 0→0 for JK, inputs can be (0,0) or (0,1). K can be 0 or 1 without consequence. Synthesis tools leverage this freedom to form larger K-map loops, saving silicon area.",
    "hint": "More than one input pattern causes the same next state.",
    "level": "moderate",
    "codeExample": "// Don't-Care Optimization in K-Maps:\n// Grouping '1' with adjacent 'X' eliminates a literal from the product term."
  },
  {
    "question": "How do you convert an available T flip-flop into a D flip-flop?",
    "shortAnswer": "Connect T = D ⊕ Q (using a 2-input XOR gate between D and Q output).",
    "explanation": "Target is D: Q(t+1) = D. Available is T: Excitation is T = Q(t) ⊕ Q(t+1). Substituting Q(t+1)=D gives T = D ⊕ Q.",
    "hint": "T excitation is Q XOR Q_next. Substitute Q_next = D.",
    "level": "moderate",
    "codeExample": "// T to D Conversion:\nassign T = D ^ Q;"
  },
  {
    "question": "How do you convert an available D flip-flop into a JK flip-flop?",
    "shortAnswer": "Connect D = J · Q̄ + K̄ · Q (using two AND gates, one OR gate, and two inverters).",
    "explanation": "Target is JK: Q(t+1) = J·Q̄ + K̄·Q. Available is D: Excitation equation is D = Q(t+1). Therefore, D = J·Q̄ + K̄·Q.",
    "hint": "Set D equal to the JK characteristic equation.",
    "level": "moderate",
    "codeExample": "// D to JK Conversion:\nassign D = (J & ~Q) | (~K & Q);"
  },
  {
    "question": "In a Synchronous Counter design, why is the Excitation Table mandatory instead of the Characteristic Table?",
    "shortAnswer": "Because counter design requires finding the inputs needed to drive flip-flops through a prescribed state sequence (e.g., 001 → 010), which is reverse synthesis.",
    "explanation": "A counter sequence specifies present state Q(t) and required next state Q(t+1). Only the Excitation Table tells the designer what J, K or D inputs must be applied at each state to trigger that exact transition.",
    "hint": "State sequences specify Q(t) -> Q(t+1), requiring excitation lookup.",
    "level": "expert",
    "codeExample": "// Counter Design Sequence:\n// State Table [Q_now -> Q_next] -> Excitation Table -> K-Maps -> Next-State Logic"
  },
  {
    "question": "What is the difference between a State Table and a Characteristic Table?",
    "shortAnswer": "A Characteristic Table defines the intrinsic behavior of a single flip-flop, while a State Table defines the complete multi-flip-flop transitions of an entire sequential circuit.",
    "explanation": "Characteristic tables are component-level specifications (independent of circuit topology). State tables represent system-level behavior (all state variables, external inputs, and circuit outputs).",
    "hint": "Component level vs system level.",
    "level": "moderate",
    "codeExample": "// Characteristic Table: Single FF behavior (e.g., JK truth table)\n// State Table: System behavior (e.g., 3-bit counter state machine)"
  },
  {
    "question": "How does the excitation requirement of an edge-triggered flip-flop differ from a level-sensitive latch?",
    "shortAnswer": "Flip-flop excitations must be stable during the setup and hold window around the active clock edge, whereas latches respond continuously throughout the enable pulse level.",
    "explanation": "Excitation tables describe state transitions sampled at discrete clock edges. In latches, inputs applied while enable is HIGH cause immediate transparency and potential race conditions.",
    "hint": "Edge sampling vs continuous level transparency.",
    "level": "expert",
    "codeExample": "// Flip-Flop: Sampled at posedge clk (Setup/Hold constraints)\n// Latch: Transparent while enable == 1"
  },
  {
    "question": "What happens if you attempt flip-flop conversion without grouping Don't-Care (X) conditions in K-Maps?",
    "shortAnswer": "The resulting circuit will still be logically correct but will contain redundant gates, higher propagation delay, greater power consumption, and increased silicon cost.",
    "explanation": "Don't-cares allow forming larger groupings (e.g., quads or octets instead of pairs or single cells), which directly eliminates input literals and reduces gate count.",
    "hint": "Suboptimal boolean minimization without X terms.",
    "level": "moderate",
    "codeExample": "// Without X: S = J & ~K & ~Q  (3-input AND gate)\n// With X:    S = J & ~Q       (2-input AND gate - Saved 1 literal!)"
  },
  {
    "question": "Convert an available T flip-flop into an SR flip-flop. What is the required logic equation for T?",
    "shortAnswer": "T = S · Q̄ + R · Q.",
    "explanation": "Target is SR: Q(t+1) = S + R̄·Q. Available is T: Excitation T = Q ⊕ Q(t+1). Evaluating T for all 8 rows of (S, R, Q) and minimizing via K-Map gives T = S·Q̄ + R·Q.",
    "hint": "Evaluate T = Q XOR Q_next for each valid row of the SR table.",
    "level": "expert",
    "codeExample": "// SR to T Conversion:\nassign T = (S & ~Q) | (R & Q);"
  },
  {
    "question": "Why are D flip-flops predominantly used as the baseline storage element in modern FPGAs and ASICs?",
    "shortAnswer": "Because D flip-flops have the simplest excitation logic (D = Q_next), minimal routing complexity (single data pin), and map directly to LUT output registers.",
    "explanation": "Modern EDA synthesis tools map all high-level HDL register transfers directly into D flip-flops with clock enables. Their single input minimizes routing congestion on silicon.",
    "hint": "Single input line, direct data transfer, high routing efficiency.",
    "level": "basic",
    "codeExample": "// Standard Verilog Register (Synthesizes to D Flip-Flop):\nalways @(posedge clk or negedge rst_n) begin\n  if (!rst_n) q <= 1'b0;\n  else        q <= d;\nend"
  },
  {
    "question": "How does metastable behavior relate to flip-flop excitation timing?",
    "shortAnswer": "If excitation input signals violate the flip-flop's setup time (t_su) or hold time (t_h) relative to the active clock edge, the output may enter a metastable indeterminate state.",
    "explanation": "Excitation tables assume valid digital logic levels meeting dynamic timing requirements. Violating setup/hold windows causes the internal feedback latch to balance at an intermediate voltage.",
    "hint": "Violating setup/hold constraints causes metastability.",
    "level": "expert",
    "codeExample": "// Timing Constraint:\n// Data stable from (t_clk - t_setup) to (t_clk + t_hold)"
  },
  {
    "question": "What is the excitation requirement for an available SR flip-flop when converting to a T flip-flop?",
    "shortAnswer": "S = T · Q̄ and R = T · Q.",
    "explanation": "Target is T flip-flop. Target rows: T=0,Q=0 -> Q_next=0 (S=0,R=X); T=0,Q=1 -> Q_next=1 (S=X,R=0); T=1,Q=0 -> Q_next=1 (S=1,R=0); T=1,Q=1 -> Q_next=0 (S=0,R=1). K-Map yields S = T·Q̄, R = T·Q.",
    "hint": "Set when T=1 and Q=0; Reset when T=1 and Q=1.",
    "level": "moderate",
    "codeExample": "// T to SR Conversion:\nassign S = T & (~Q);\nassign R = T & Q;"
  },
  {
    "question": "Summarize the complete Golden Rules for all 4 Flip-Flop Excitation derivations in one sentence each.",
    "shortAnswer": "SR: S=1 sets (0→1), R=1 resets (1→0), unaffected states have don't-cares; JK: J='01XX' and K='XX10'; D: D is always Q(t+1); T: T is Q(t) ⊕ Q(t+1).",
    "explanation": "These four golden rules provide the fastest, error-free synthesis foundation for any university or competitive examination question on sequential logic conversion.",
    "hint": "Review the master mnemonics for SR, JK, D, and T.",
    "level": "basic",
    "codeExample": "// Master Excitation Rules:\n// SR: 0->0 (0,X), 0->1 (1,0), 1->0 (0,1), 1->1 (X,0)\n// JK: J = 0,1,X,X | K = X,X,1,0\n// D:  D = Q(t+1)\n// T:  T = Q(t) ^ Q(t+1)"
  }
];

export default questions;
