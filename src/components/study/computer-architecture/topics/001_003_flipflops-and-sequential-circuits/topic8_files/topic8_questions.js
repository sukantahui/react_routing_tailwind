// Question Bank for Topic 8: D Flip-Flop
const questions = [
  {
    "question": "What is the primary motivation for creating the D Flip-Flop from the Clocked SR Flip-Flop?",
    "shortAnswer": "To permanently eliminate the forbidden/invalid state (S=1, R=1) by connecting an inverter so that R is always the complement of S (R = ~D).",
    "explanation": "In an SR Flip-Flop, applying S=1 and R=1 forces both outputs Q and Q_bar to 1 and causes metastability. In a D Flip-Flop, single data line D feeds S, and its inverted complement ~D feeds R, guaranteeing that S and R are never identical.",
    "hint": "Think about how an inverter between S and R guarantees opposite logic levels.",
    "level": "basic",
    "codeExample": "// D Flip-Flop logic from SR:\nassign S = D;\nassign R = ~D;"
  },
  {
    "question": "What is the characteristic equation of a D Flip-Flop?",
    "shortAnswer": "Q(t+1) = D",
    "explanation": "Because the next state Q(t+1) directly takes on the value present at input D during the active clock edge/pulse, the characteristic equation is simply Q(t+1) = D without any dependency on the prior state Q(t).",
    "hint": "Whatever goes into D comes out of Q on the next clock.",
    "level": "basic",
    "codeExample": "// Verilog behavioral D Flip-Flop:\nalways @(posedge clk) begin\n  q <= d;\nend"
  },
  {
    "question": "How many NAND gates and inverters are required to construct a gate-level D Flip-Flop from basic gates?",
    "shortAnswer": "Four 2-input NAND gates plus one NOT gate (inverter), or five NAND gates total.",
    "explanation": "One inverter creates ~D. Two steering NAND gates evaluate (D . CLK) and (~D . CLK). Two cross-coupled NAND gates form the bistable storage latch.",
    "hint": "Two gating NANDs + two latch NANDs + one input inverter.",
    "level": "moderate",
    "codeExample": "// Gate-level D-latch implementation:\n// wire d_bar = ~d;\n// nand(s_prime, d, clk);\n// nand(r_prime, d_bar, clk);\n// nand(q, s_prime, q_bar);\n// nand(q_bar, r_prime, q);"
  },
  {
    "question": "How is a D Flip-Flop configured to function as a divide-by-2 frequency divider (toggle counter)?",
    "shortAnswer": "By connecting the inverted output Q_bar directly back to the data input D.",
    "explanation": "When Q_bar is connected to D, on every active clock edge the flip-flop latches the inverted value of its current state (Q_next = ~Q). This creates an output square wave at exactly half the frequency (f_out = f_clk / 2) of the input clock.",
    "hint": "What happens if D is always fed with the opposite of current Q?",
    "level": "moderate",
    "codeExample": "// Frequency Divider by 2:\nalways @(posedge clk) begin\n  q <= ~q; // D connected to ~Q\nend"
  },
  {
    "question": "What is the excitation table requirement for a D Flip-Flop for any transition Q(t) → Q(t+1)?",
    "shortAnswer": "D = Q(t+1) for all transitions.",
    "explanation": "Because Q(t+1) = D, to achieve any next state Q(t+1), the excitation input D must simply be set to that exact desired target value regardless of what Q(t) currently is.",
    "hint": "Check the relationship between D and the target next state.",
    "level": "basic",
    "codeExample": "// Excitation Table for D Flip-Flop:\n// Q(t)=0 → Q(t+1)=0 => D=0\n// Q(t)=0 → Q(t+1)=1 => D=1\n// Q(t)=1 → Q(t+1)=0 => D=0\n// Q(t)=1 → Q(t+1)=1 => D=1"
  },
  {
    "question": "What is setup time (t_su) in a D Flip-Flop and what happens if it is violated?",
    "shortAnswer": "Setup time is the minimum duration input D must remain stable before the active clock edge; violating it causes metastability.",
    "explanation": "If data changes within the setup time window, the internal steering gates cannot resolve a clean logic 0 or 1 before the latch locks, causing the output voltage to oscillate indeterminate between V_IL and V_IH.",
    "hint": "Think about giving the internal silicon gates enough time to charge before the clock triggers.",
    "level": "expert",
    "codeExample": "// Static Timing Analysis (STA) constraint:\n// T_arrival <= T_period - t_setup - t_skew"
  },
  {
    "question": "What is hold time (t_h) in a D Flip-Flop?",
    "shortAnswer": "The minimum time data input D must remain stable AFTER the active clock edge.",
    "explanation": "Hold time ensures the clock edge has completely closed the input transmission gate / disabled the input steering NANDs before the incoming data changes.",
    "hint": "Holding the data stable after the clock arrives.",
    "level": "moderate",
    "codeExample": "// Timing parameter check:\n// Data must remain steady during [t_clk - t_setup, t_clk + t_hold]"
  },
  {
    "question": "Why are D Flip-Flops preferred over JK or T Flip-Flops for building CPU pipeline registers?",
    "shortAnswer": "D Flip-Flops have a single data input per bit, minimizing wiring complexity and providing a 1:1 direct data capture path.",
    "explanation": "In an N-bit wide processor datapath (e.g. 64-bit ALU or register file), using D flip-flops requires only 64 data wires rather than 128 wires (J and K) or complex toggle excitation logic.",
    "hint": "Consider wire count and layout routing in silicon VLSI.",
    "level": "moderate",
    "codeExample": "// 64-bit pipeline register with D Flip-Flops:\nreg [63:0] pipeline_reg;\nalways @(posedge clk) pipeline_reg <= alu_out;"
  },
  {
    "question": "What is the difference between a level-sensitive D Latch and an edge-triggered D Flip-Flop?",
    "shortAnswer": "A D Latch is transparent throughout the entire time CLK is HIGH, whereas an edge-triggered D Flip-Flop captures data only at the instantaneous transition (rising or falling edge).",
    "explanation": "In a transparent D latch, any glitches on D while CLK=1 pass straight to Q. An edge-triggered D flip-flop (e.g. Master-Slave or dual-loop) samples D exclusively during the sub-nanosecond clock edge.",
    "hint": "Transparency during clock HIGH versus sampling at the edge transition.",
    "level": "expert",
    "codeExample": "// Transparent D Latch vs Edge-triggered FF:\n// Latch: always @(clk or d) if (clk) q <= d;\n// FF:    always @(posedge clk) q <= d;"
  },
  {
    "question": "How are asynchronous PRESET and CLEAR pins integrated into a D Flip-Flop?",
    "shortAnswer": "By adding extra active-LOW input pins directly into the cross-coupled storage NAND gates, bypassing the clock.",
    "explanation": "Asynchronous PRESET forces Q=1 immediately, and CLEAR forces Q=0 immediately regardless of the clock or D input, allowing clean master system resets upon power-up.",
    "hint": "Asynchronous signals override the clock directly at the storage core.",
    "level": "moderate",
    "codeExample": "// Asynchronous Reset in Verilog:\nalways @(posedge clk or negedge rst_n) begin\n  if (!rst_n) q <= 1'b0;\n  else        q <= d;\nend"
  },
  {
    "question": "D Flip-Flop Architecture Question 11: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q11:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 12: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q12:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 13: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q13:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 14: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q14:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 15: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q15:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 16: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q16:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 17: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q17:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 18: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q18:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 19: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q19:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 20: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q20:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 21: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q21:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 22: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q22:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 23: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q23:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 24: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q24:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 25: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q25:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 26: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q26:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 27: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q27:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 28: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "moderate",
    "codeExample": "// Max clock frequency limit for Q28:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 29: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "basic",
    "codeExample": "// Max clock frequency limit for Q29:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  },
  {
    "question": "D Flip-Flop Architecture Question 30: Explain how clock-to-Q propagation delay (t_cq) affects maximum operating CPU clock frequency.",
    "shortAnswer": "The minimum clock period must exceed the sum of clock-to-Q delay, combinational logic delay, and destination setup time (T >= t_cq + t_comb + t_su).",
    "explanation": "To prevent timing violations in high-speed digital processors, signals launched from a source D flip-flop must travel through combinational ALU logic and arrive at destination flip-flops before the setup window.",
    "hint": "Consider the critical path delay equation in synchronous digital design.",
    "level": "expert",
    "codeExample": "// Max clock frequency limit for Q30:\n// F_max = 1 / (t_cq + t_comb_max + t_setup)"
  }
];

export default questions;
