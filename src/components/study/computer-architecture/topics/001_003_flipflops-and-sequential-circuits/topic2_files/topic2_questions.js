// Question Bank for Topic 2: Gated SR Latch
const questions = [
  {
    "question": "How does the Enable (EN) input control the 4-NAND Gated SR Latch?",
    "shortAnswer": "When EN = 0, both steering NAND outputs are forced HIGH (S'=1, R'=1), locking the storage latch in Memory Hold regardless of S and R.",
    "explanation": "NAND gates output 1 whenever any input is 0. Thus, EN=0 isolates the latch completely from input line activity.",
    "hint": "Evaluate NAND truth table with an input at 0.",
    "level": "basic",
    "codeExample": "// EN=0 behavior:\n// S' = ~(S & 0) = 1\n// R' = ~(R & 0) = 1 (Hold)"
  },
  {
    "question": "What is the forbidden condition for a Gated SR Latch and what output does it produce?",
    "shortAnswer": "When EN = 1 with S = 1 and R = 1, both outputs Q and Q_bar are driven to 1 simultaneously, violating complementary logic.",
    "explanation": "With EN=1, S=1 produces S'=0 and R=1 produces R'=0. In the cross-coupled stage, 0 inputs force both NAND outputs Q and Q_bar to 1.",
    "hint": "Remember NAND with 0 input produces 1.",
    "level": "moderate",
    "codeExample": "// Forbidden state:\n// EN=1, S=1, R=1 => Q=1, Q_bar=1"
  },
  {
    "question": "Gated SR Latch - Analysis Question 3: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q3:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 4: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q4:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 5: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q5:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 6: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q6:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 7: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q7:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 8: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q8:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 9: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q9:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 10: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q10:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 11: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q11:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 12: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q12:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 13: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q13:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 14: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q14:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 15: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q15:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 16: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q16:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 17: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q17:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 18: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q18:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 19: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q19:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 20: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q20:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 21: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q21:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 22: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q22:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 23: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q23:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 24: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q24:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 25: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q25:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 26: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q26:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 27: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q27:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 28: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q28:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 29: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q29:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Gated SR Latch - Analysis Question 30: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q30:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  }
];

export default questions;
