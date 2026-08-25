// Question Bank for Topic 9: JK Flip-Flop
const questions = [
  {
    "question": "How does the JK Flip-Flop resolve the invalid state problem of the SR Flip-Flop?",
    "shortAnswer": "By feeding output Q_bar into the J steering NAND and output Q into the K steering NAND, converting the former invalid condition (J=1, K=1) into a useful Toggle operation.",
    "explanation": "When J=1 and K=1, whichever gate is enabled depends on the current output state, causing the circuit to cleanly invert its output (Q_next = ~Q).",
    "hint": "Trace the 3rd input on each steering NAND gate.",
    "level": "basic",
    "codeExample": "// JK Flip-Flop Characteristic Equation:\n// Q(t+1) = J & ~Q | ~K & Q"
  },
  {
    "question": "What is the race-around condition in a JK Flip-Flop and when does it occur?",
    "shortAnswer": "It is continuous output oscillation occurring when J=1, K=1 and the clock pulse width exceeds the propagation delay (t_p > t_pd).",
    "explanation": "Because the outputs are connected back to the inputs, the output changes multiple times while the clock pulse remains high.",
    "hint": "Think about clock duration vs silicon gate delay.",
    "level": "expert",
    "codeExample": "// Race-around condition occurs when:\n// t_pulse > t_pd_ff (with J=1, K=1 in level-triggered FF)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 3: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q3:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 4: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q4:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 5: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q5:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 6: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q6:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 7: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q7:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 8: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q8:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 9: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q9:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 10: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q10:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 11: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q11:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 12: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q12:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 13: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q13:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 14: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q14:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 15: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q15:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 16: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q16:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 17: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q17:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 18: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q18:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 19: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q19:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 20: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q20:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 21: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q21:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 22: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q22:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 23: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q23:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 24: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q24:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 25: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q25:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 26: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q26:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 27: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q27:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 28: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q28:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 29: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q29:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "JK Flip-Flop - Analysis Question 30: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q30:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  }
];

export default questions;
