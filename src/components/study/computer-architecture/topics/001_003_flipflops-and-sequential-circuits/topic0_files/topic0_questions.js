// Question Bank for Topic 0: Introduction to Sequential Circuits
const questions = [
  {
    "question": "What is the primary difference between combinational and sequential logic circuits?",
    "shortAnswer": "Combinational circuits compute outputs based solely on present inputs, whereas sequential circuits compute outputs based on both present inputs and past history (stored memory).",
    "explanation": "Combinational logic has no memory elements and no feedback paths. Sequential logic incorporates storage elements (flip-flops/latches) and feedback loops to retain state over time.",
    "hint": "Consider output dependency on time and history.",
    "level": "basic",
    "codeExample": "// Combinational: Y = f(A, B)\n// Sequential:    Y = f(A, B, Q_present), Q_next = g(A, B, Q_present)"
  },
  {
    "question": "How does a feedback loop create memory in digital electronics?",
    "shortAnswer": "By feeding an inverting output back into an input, creating circular positive feedback that locks the circuit into one of two stable binary voltage states (0 or 1).",
    "explanation": "When the output feeds back, the circuit continuously regenerates its own logic level even when external input stimuli are removed, forming a bistable multivibrator cell.",
    "hint": "Think about circular self-reinforcing voltage levels.",
    "level": "basic",
    "codeExample": "// Bistable feedback memory:\nassign Q = ~(Q_bar & Reset_n);\nassign Q_bar = ~(Q & Set_n);"
  },
  {
    "question": "Why is a master Clock signal necessary in synchronous sequential circuits?",
    "shortAnswer": "To synchronize state transitions across all storage elements simultaneously, preventing race conditions and unpredictable timing hazards.",
    "explanation": "Without a clock, differing gate propagation delays across parallel paths would cause glitches and race conditions. A periodic clock ensures all flip-flops sample data only when inputs have stabilized.",
    "hint": "Think about coordinating millions of transistors in lockstep.",
    "level": "moderate",
    "codeExample": "// Synchronous edge-triggered block:\nalways @(posedge clk) begin\n  Q <= D;\nend"
  },
  {
    "question": "Give three real-world examples of combinational circuits and three of sequential circuits.",
    "shortAnswer": "Combinational: Half Adder, 4:1 Multiplexer, 3:8 Decoder. Sequential: 4-bit Register, Mod-10 Decade Counter, CPU Instruction Sequencer.",
    "explanation": "Adders and multiplexers evaluate outputs without remembering past operations. Registers and counters must track previous counts and stored values across consecutive clock cycles.",
    "hint": "Think about circuits with state vs memoryless circuits.",
    "level": "basic",
    "codeExample": "// Combinational: assign Sum = A ^ B;\n// Sequential:    always @(posedge clk) Count <= Count + 1;"
  },
  {
    "question": "What is the difference between Mealy and Moore sequential state machines?",
    "shortAnswer": "In a Moore machine, outputs depend ONLY on the present state; in a Mealy machine, outputs depend on BOTH the present state and present external inputs.",
    "explanation": "Moore machine outputs change synchronously on clock transitions. Mealy machine outputs can react immediately to asynchronous input changes, giving faster response but greater susceptibility to glitches.",
    "hint": "Look at whether inputs directly affect output lines.",
    "level": "moderate",
    "codeExample": "// Moore: Output = f(State)\n// Mealy: Output = f(State, Inputs)"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 6: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q6:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 7: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q7:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 8: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q8:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 9: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q9:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 10: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q10:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 11: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q11:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 12: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q12:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 13: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q13:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 14: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q14:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 15: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q15:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 16: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q16:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 17: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q17:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 18: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q18:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 19: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q19:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 20: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q20:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 21: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q21:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 22: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q22:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 23: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q23:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 24: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q24:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 25: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q25:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 26: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q26:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 27: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q27:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 28: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "moderate",
    "codeExample": "// Setup timing invariant for Q28:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 29: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "basic",
    "codeExample": "// Setup timing invariant for Q29:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  },
  {
    "question": "Sequential vs Combinational Analysis Question 30: Explain how clock frequency limits the maximum combinational path delay (t_comb) between sequential registers.",
    "shortAnswer": "The clock period must satisfy T_clk >= t_cq + t_comb + t_setup, meaning the maximum combinational propagation delay directly sets the clock frequency limit.",
    "explanation": "Data launched by a flip-flop on one clock edge must propagate through the combinational logic block and arrive at the next flip-flop at least t_setup before the next active clock edge.",
    "hint": "Consider the timing equation between two consecutive registers.",
    "level": "expert",
    "codeExample": "// Setup timing invariant for Q30:\n// T_period >= t_clk_to_q + t_comb_max + t_setup"
  }
];

export default questions;
