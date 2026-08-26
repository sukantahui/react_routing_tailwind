// Question Bank for Topic 32: Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the fundamental operating principle of Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters?",
    "shortAnswer": "Deterministic hardware signal processing governed by Boolean logic and semiconductor switching characteristics.",
    "explanation": "Under Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters, inputs are evaluated through interconnected logic gates or bistable flip-flops to produce stable, hazard-free digital outputs.",
    "hint": "Think about truth tables, propagation delays, and excitation equations.",
    "level": "basic",
    "codeExample": "// Verilog HDL structural description for Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters\nmodule circuit_block (input wire a, input wire b, output wire y);\n  assign y = a & b;\nendmodule"
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
    "question": "Hardware Logic Deep-Dive Question 3 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q3 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 4 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q4 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 5 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q5 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 6 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q6 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 7 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q7 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 8 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q8 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 9 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q9 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 10 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q10 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 11 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q11 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 12 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q12 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 13 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q13 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 14 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q14 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 15 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q15 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 16 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q16 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 17 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q17 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 18 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q18 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 19 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q19 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 20 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q20 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 21 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q21 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 22 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q22 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 23 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q23 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 24 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q24 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 25 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q25 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 26 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q26 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 27 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q27 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 28 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q28 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 29 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q29 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 30 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q30 (Simulation & Tools: Using Logisim / Multisim to design and test flip-flops, registers, and counters)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  }
];

export default questions;
