// Question Bank for Topic 21: Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the fundamental operating principle of Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications?",
    "shortAnswer": "Deterministic hardware signal processing governed by Boolean logic and semiconductor switching characteristics.",
    "explanation": "Under Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications, inputs are evaluated through interconnected logic gates or bistable flip-flops to produce stable, hazard-free digital outputs.",
    "hint": "Think about truth tables, propagation delays, and excitation equations.",
    "level": "basic",
    "codeExample": "// Verilog HDL structural description for Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications\nmodule circuit_block (input wire a, input wire b, output wire y);\n  assign y = a & b;\nendmodule"
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
    "question": "Hardware Logic Deep-Dive Question 3 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q3 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 4 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q4 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 5 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q5 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 6 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q6 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 7 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q7 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 8 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q8 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 9 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q9 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 10 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q10 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 11 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q11 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 12 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q12 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 13 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q13 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 14 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q14 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 15 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q15 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 16 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q16 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 17 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q17 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 18 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q18 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 19 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q19 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 20 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q20 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 21 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q21 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 22 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q22 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 23 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q23 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 24 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q24 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 25 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q25 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 26 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q26 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 27 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q27 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 28 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "moderate",
    "codeExample": "// Production pin mapping for Q28 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 29 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "basic",
    "codeExample": "// Production pin mapping for Q29 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  },
  {
    "question": "Hardware Logic Deep-Dive Question 30 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications): How is circuit reliability and noise margin ensured in production hardware?",
    "shortAnswer": "By decoupling power rails, respecting fan-out limits, and adding pull-up/pull-down termination resistors.",
    "explanation": "In production digital hardware, Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications circuits must be protected against ground bounce, cross-talk, and thermal degradation by observing strict electrical specifications.",
    "hint": "Consider how TTL/CMOS voltage thresholds, fan-out capabilities, and clock skew affect hardware.",
    "level": "expert",
    "codeExample": "// Production pin mapping for Q30 (Types of Counters: Binary up/down counters, BCD counters (mod-10), ring counter, Johnson counter with applications)\n// VCC = 5.0V, GND = 0.0V, Pull-up = 10k Ohm on active-low reset"
  }
];

export default questions;
