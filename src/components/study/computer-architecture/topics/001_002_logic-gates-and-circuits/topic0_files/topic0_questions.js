// Question Bank for Topic 0: Basic gates AND, OR, NOT, NAND, NOR, XOR
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the fundamental operating principle of Basic gates AND, OR, NOT, NAND, NOR, XOR?",
    "shortAnswer": "Deterministic hardware signal processing governed by Boolean logic and semiconductor switching characteristics.",
    "explanation": "Under Basic gates AND, OR, NOT, NAND, NOR, XOR, inputs are evaluated through interconnected logic gates or bistable flip-flops to produce stable, hazard-free digital outputs.",
    "hint": "Think about truth tables, propagation delays, and excitation equations.",
    "level": "basic",
    "codeExample": "// Verilog HDL structural description for Basic gates AND, OR, NOT, NAND, NOR, XOR\nmodule circuit_block (input wire a, input wire b, output wire y);\n  assign y = a & b;\nendmodule"
  },
  {
    "question": "How do timing constraints (Setup & Hold times) govern the reliable operation of sequential circuits?",
    "shortAnswer": "Data must remain stable before (t_su) and after (t_h) the active clock edge to prevent metastability.",
    "explanation": "Violating setup or hold times traps the internal bistable latch between logic 0 and 1, causing nondeterministic voltage oscillations (metastability).",
    "hint": "Recall that flip-flops require a brief window of stability around the clock trigger.",
    "level": "moderate",
    "codeExample": "// Timing check in Verilog:\n$setup(data_in, posedge clk, 2.5); // 2.5 ns setup time requirement\n$hold(posedge clk, data_in, 1.0);  // 1.0 ns hold time requirement"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 3 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q3 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 4 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q4 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 5 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q5 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 6 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q6 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 7 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q7 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 8 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q8 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 9 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q9 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 10 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q10 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 11 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q11 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 12 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q12 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 13 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q13 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 14 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q14 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 15 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q15 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 16 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q16 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 17 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q17 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 18 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q18 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 19 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q19 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 20 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q20 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 21 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q21 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 22 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q22 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 23 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q23 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 24 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q24 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 25 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q25 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 26 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q26 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 27 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q27 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 28 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q28 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 29 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q29 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 30 (Basic gates AND, OR, NOT, NAND, NOR, XOR): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Basic gates AND, OR, NOT, NAND, NOR, XOR circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q30 (Basic gates AND, OR, NOT, NAND, NOR, XOR)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  }
];

export default questions;
