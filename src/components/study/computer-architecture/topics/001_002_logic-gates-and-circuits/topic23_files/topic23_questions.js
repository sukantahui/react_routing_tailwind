// Question Bank for Topic 23: Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the fundamental operating principle of Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)?",
    "shortAnswer": "Deterministic hardware signal processing governed by Boolean logic and semiconductor switching characteristics.",
    "explanation": "Under Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD), inputs are evaluated through interconnected logic gates or bistable flip-flops to produce stable, hazard-free digital outputs.",
    "hint": "Think about truth tables, propagation delays, and excitation equations.",
    "level": "basic",
    "codeExample": "// Verilog HDL structural description for Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)\nmodule circuit_block (input wire a, input wire b, output wire y);\n  assign y = a & b;\nendmodule"
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
    "question": "Hardware Logic Deep-Dive Question 3 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q3 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 4 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q4 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 5 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q5 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 6 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q6 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 7 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q7 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 8 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q8 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 9 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q9 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 10 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q10 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 11 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q11 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 12 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q12 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 13 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q13 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 14 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q14 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 15 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q15 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 16 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q16 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 17 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q17 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 18 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q18 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 19 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q19 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 20 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q20 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 21 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q21 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 22 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q22 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 23 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q23 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 24 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q24 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 25 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q25 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 26 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q26 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 27 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q27 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 28 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q28 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 29 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q29 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 30 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD)): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD) circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q30 (Priority encoder (IC 74148 – 8:3, IC 74147 – 10:4 decimal to BCD))\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  }
];

export default questions;
