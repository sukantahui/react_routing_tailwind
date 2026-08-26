// Question Bank for Topic 7: Clocked SR Flip-Flop
const questions = [
  {
    "question": "What is the primary architectural difference between an unclocked SR Latch and a Clocked SR Flip-Flop?",
    "shortAnswer": "The Clocked SR Flip-Flop adds steering/gating logic controlled by a clock signal so state changes only occur when the clock is active.",
    "explanation": "An unclocked SR latch is completely asynchronous and responds to inputs S and R at any instant. In a Clocked SR Flip-Flop, two input AND/NAND gating circuits block inputs from affecting the internal latch when CLK = 0.",
    "hint": "Think about synchronous control versus asynchronous immediate response.",
    "level": "basic",
    "codeExample": "// Clock gating logic in Verilog:\nassign s_gated = S & CLK;\nassign r_gated = R & CLK;"
  },
  {
    "question": "Why is the input combination S = 1, R = 1 considered forbidden (invalid) in a Clocked SR Flip-Flop?",
    "shortAnswer": "It violates the fundamental complementary property (Q != Q_bar) and causes race conditions upon clock transition to 0.",
    "explanation": "When S=1 and R=1 with CLK=1 in a NAND-based latch, both outputs Q and Q_bar are driven to logic 1 simultaneously. When the clock falls back to 0, propagation delay differences cause unpredictable oscillation (metastability).",
    "hint": "Consider what happens to Q and Q_bar simultaneously, and what happens when the clock drops.",
    "level": "moderate",
    "codeExample": "// NAND Gated SR Latch Invalid State:\n// S=1, R=1, CLK=1 => S'=0, R'=0 => Q=1, Q_bar=1 (Violates Q != Q_bar)"
  },
  {
    "question": "What is the characteristic equation of an SR Flip-Flop derived from its Karnaugh Map?",
    "shortAnswer": "Q(t+1) = S + (~R . Q(t)) with the constraint S . R = 0.",
    "explanation": "Plotting the next state Q(t+1) against inputs S, R, and current state Q(t) on a 3-variable K-Map (with minterms m4, m5, m1 and don't cares m6, m7 for S=1,R=1) yields the minimized Boolean equation Q(next) = S + R'Q.",
    "hint": "Recall K-Map grouping for S=1 and for the hold condition when R=0 and Q=1.",
    "level": "moderate",
    "codeExample": "// Boolean characteristic function:\n// Q_next = S | (~R & Q_current)"
  },
  {
    "question": "How many logic gates are required to construct a standard Clocked SR Flip-Flop using NAND gates?",
    "shortAnswer": "Four 2-input NAND gates.",
    "explanation": "Two NAND gates form the input steering stage (evaluating S . CLK and R . CLK), and two cross-coupled NAND gates form the bistable memory latch stage.",
    "hint": "Two gating gates + two cross-coupled storage gates.",
    "level": "basic",
    "codeExample": "// 4 NAND Gate Architecture:\n// Gate 1: S' = ~(S & CLK)\n// Gate 2: R' = ~(R & CLK)\n// Gate 3: Q  = ~(S' & Q_bar)\n// Gate 4: Q_bar = ~(R' & Q)"
  },
  {
    "question": "What is the output behavior of a Clocked SR Flip-Flop when CLK = 0, S = 1, and R = 1?",
    "shortAnswer": "Memory Hold (No change: Q(t+1) = Q(t)).",
    "explanation": "When CLK = 0, both gating NAND outputs S' and R' are forced to logic 1, regardless of S and R. In a NAND latch, S'=1, R'=1 corresponds to the quiescent memory hold state.",
    "hint": "Remember that the clock gates both inputs when it is LOW.",
    "level": "moderate",
    "codeExample": "// When CLK = 0:\n// S'=1, R'=1 => Latch remains in previous state Q(t)"
  },
  {
    "question": "What is metastability in digital flip-flops and how does the invalid state S=1, R=1 trigger it?",
    "shortAnswer": "Metastability is an unstable quasi-equilibrium state between logic 0 and 1 resulting from simultaneous input transitions.",
    "explanation": "When S and R are released from 1 to 0 simultaneously, both cross-coupled gates race to pull their respective outputs low. If propagation delays are identical, the circuit enters voltage oscillation for an indeterminate period before settling randomly.",
    "hint": "Think about a ball balanced precisely on top of a sharp ridge.",
    "level": "expert",
    "codeExample": "// Metastability recovery time (t_met):\n// Resolving voltage oscillation depends on loop gain and thermal noise"
  },
  {
    "question": "What is the excitation value of (S, R) when the state transition required is Q(t) = 0 to Q(t+1) = 0?",
    "shortAnswer": "S = 0, R = X (Don't Care).",
    "explanation": "To keep Q at 0, you can either apply Memory Hold (S=0, R=0) or apply Reset (S=0, R=1). Thus, S must be 0, but R can be either 0 or 1 (Don't Care X).",
    "hint": "Check both the Hold state and the Reset state in the truth table.",
    "level": "moderate",
    "codeExample": "// Excitation Row 1:\n// Q(t)=0, Q(t+1)=0 => S=0, R=X"
  },
  {
    "question": "What is the excitation value of (S, R) when the state transition required is Q(t) = 1 to Q(t+1) = 1?",
    "shortAnswer": "S = X (Don't Care), R = 0.",
    "explanation": "To keep Q at 1, you can either apply Memory Hold (S=0, R=0) or apply Set (S=1, R=0). Thus, R must be 0, while S can be either 0 or 1 (Don't Care X).",
    "hint": "Check both the Hold state and the Set state in the truth table.",
    "level": "moderate",
    "codeExample": "// Excitation Row 4:\n// Q(t)=1, Q(t+1)=1 => S=X, R=0"
  },
  {
    "question": "How did the architectural limitation of the SR flip-flop lead directly to the development of the D flip-flop?",
    "shortAnswer": "By inserting an inverter between S and R (D connected to S, and ~D connected to R), guaranteeing that S and R can never be 1 simultaneously.",
    "explanation": "In a D Flip-Flop, the input D is fed directly to the S terminal, and its complement ~D is fed to the R terminal. This completely eliminates the S=1, R=1 invalid condition by architectural construction.",
    "hint": "How do you guarantee S and R are always opposites?",
    "level": "basic",
    "codeExample": "// D Flip-Flop derivation:\n// S = D\n// R = ~D\n// S & R = D & ~D = 0 (Invalid state mathematically impossible!)"
  },
  {
    "question": "How did the architectural limitation of the SR flip-flop lead directly to the development of the JK flip-flop?",
    "shortAnswer": "By feeding back the outputs Q and Q_bar into the input gating gates, converting the invalid S=1, R=1 condition into a deterministic toggle state.",
    "explanation": "In a JK Flip-Flop, J is gated with Q_bar and K is gated with Q. When J=1 and K=1, only the gate connected to the inactive output is enabled, forcing the flip-flop to toggle its state cleanly rather than entering the invalid state.",
    "hint": "Feedback cross-coupling solves the double-high collision.",
    "level": "expert",
    "codeExample": "// JK Flip-Flop gating:\n// S_internal = J & ~Q & CLK\n// R_internal = K & Q & CLK\n// When J=1, K=1 => Q_next = ~Q (Toggle)"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 11: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q11:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 12: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q12:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 13: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q13:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 14: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q14:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 15: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q15:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 16: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q16:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 17: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q17:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 18: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q18:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 19: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q19:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 20: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q20:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 21: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q21:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 22: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q22:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 23: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q23:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 24: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q24:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 25: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q25:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 26: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q26:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 27: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q27:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 28: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "moderate",
    "codeExample": "// Timing parameter constraint for Q28:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 29: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "basic",
    "codeExample": "// Timing parameter constraint for Q29:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  },
  {
    "question": "Clocked SR Flip-Flop Analysis Question 30: Explain how clock pulse width (t_p) and propagation delay (t_pd) affect synchronous reliability.",
    "shortAnswer": "To prevent race conditions, the clock pulse width must be strictly bounded and synchronized with propagation delays.",
    "explanation": "In level-sensitive Clocked SR flip-flops, any changes on inputs S and R while the clock pulse remains HIGH immediately propagate through the latch, making edge-triggering essential for multi-stage sequential systems.",
    "hint": "Consider level-triggered transparency versus edge-triggered discrete transitions.",
    "level": "expert",
    "codeExample": "// Timing parameter constraint for Q30:\n// Clock_Period >= t_setup + t_hold + t_propagation"
  }
];

export default questions;
