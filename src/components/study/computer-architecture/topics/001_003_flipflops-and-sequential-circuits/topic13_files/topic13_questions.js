// Question Bank for Topic 13: Master-Slave Flip-Flop
const questions = [
  {
    "question": "What exact physical condition triggers the race-around condition in a JK flip-flop?",
    "shortAnswer": "When inputs J=1 and K=1, the clock is level-triggered (held HIGH), and the clock pulse width (t_pulse) is greater than the internal propagation delay (t_pd).",
    "explanation": "Because t_pulse > t_pd, the output inverts repeatedly during the same active clock pulse, resulting in uncontrollable high-frequency oscillation.",
    "hint": "Recall the relationship between gate propagation delay and clock pulse duration.",
    "level": "basic",
    "codeExample": "// Race-around condition:\n// If (J == 1 && K == 1 && CLK == 1 && t_pulse > t_pd) → Uncontrolled Toggling"
  },
  {
    "question": "How does the two-stage Master-Slave architecture eliminate race-around without requiring ultra-narrow clock pulses?",
    "shortAnswer": "By using complementary clocks (CLK and CLK_bar) so that the Master and Slave stages are never active simultaneously.",
    "explanation": "When CLK=1, the Master samples inputs while the Slave isolates outputs; when CLK=0, the Master locks inputs while the Slave updates outputs, breaking the closed feedback loop.",
    "hint": "Think about the non-overlapping two-phase clock isolation.",
    "level": "basic",
    "codeExample": "// Master-Slave Operation:\n// Phase 1 (CLK=1): Master samples J/K → Stores Y (Slave Frozen)\n// Phase 2 (CLK=0): Master isolated → Slave passes Y to Q"
  },
  {
    "question": "What is the mathematical inequality that defines the operational boundary where race-around occurs?",
    "shortAnswer": "t_pd < t_pulse < T (where t_pd is gate delay, t_pulse is high pulse width, and T is clock period).",
    "explanation": "If t_pulse is longer than t_pd, multiple feedback cycles occur before the clock falls, making the final output non-deterministic.",
    "hint": "Gate delay is smaller than pulse width, but pulse width is within one period.",
    "level": "moderate",
    "codeExample": "// Timing constraint:\n// t_pd < t_pulse < T"
  },
  {
    "question": "Why is narrowing the clock pulse (making t_pulse < t_pd) considered an impractical solution in large-scale digital silicon?",
    "shortAnswer": "Because clock skew, wire resistance-capacitance (RC) delays, and temperature variations make sub-nanosecond pulse distribution unreliable across thousands of flip-flops.",
    "explanation": "Generating and distributing extremely narrow pulses across large semiconductor chips causes clock attenuation, false triggering, and setup/hold violations.",
    "hint": "Consider physical wire parasitics and chip-wide clock distribution.",
    "level": "expert",
    "codeExample": "// Physical limitation:\n// Wire RC delay variability > Narrow pulse width"
  },
  {
    "question": "What is the '1s Catching' anomaly in pulse-triggered Master-Slave flip-flops?",
    "shortAnswer": "A temporary noise glitch or spike on J or K while CLK=1 can cause the Master to latch a 1 that cannot be reset until the next clock cycle.",
    "explanation": "Because the Master remains transparent throughout the entire CLK=1 interval, any transient high glitch permanently sets the master latch, leading to modern preference for edge-triggered designs.",
    "hint": "Consider transient glitches during the active clock level.",
    "level": "expert",
    "codeExample": "// 1s Catching Hazard:\n// J_noise_pulse during CLK=1 → Master latch catches 1 permanently"
  },
  {
    "question": "Master-Slave Timing Analysis Question 6: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 6, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 6:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 7: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 7, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 7:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 8: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 8, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 8:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 9: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 9, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 9:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 10: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 10, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 10:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 11: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 11, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 11:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 12: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 12, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 12:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 13: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 13, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 13:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 14: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 14, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 14:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 15: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 15, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 15:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 16: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 16, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 16:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 17: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 17, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 17:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 18: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 18, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 18:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 19: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 19, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 19:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 20: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 20, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 20:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 21: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 21, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 21:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 22: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 22, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 22:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 23: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 23, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 23:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 24: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 24, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 24:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 25: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 25, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 25:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 26: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 26, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 26:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 27: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 27, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 27:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 28: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 28, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "moderate",
    "codeExample": "// PVT Timing Margin for Case 28:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 29: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 29, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "basic",
    "codeExample": "// PVT Timing Margin for Case 29:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  },
  {
    "question": "Master-Slave Timing Analysis Question 30: Explain how stage isolation timing margins ensure deterministic toggling under process voltage and temperature (PVT) variations.",
    "shortAnswer": "The inverted clock phase ensures a non-overlapping guard band between master latch isolation and slave latch transparency.",
    "explanation": "Under PVT variation scenario 30, non-overlapping clock domains prevent race-through conditions across the intermediate storage boundary.",
    "hint": "Consider the timing guard band created by the clock inverter.",
    "level": "expert",
    "codeExample": "// PVT Timing Margin for Case 30:\n// t_guard = t_inverter_pd + t_setup_slave >= 0;"
  }
];

export default questions;
