// Question Bank for Topic 10: Master-Slave JK Flip-Flop
const questions = [
  {
    "question": "How does the Master-Slave JK Flip-Flop eliminate the race-around condition?",
    "shortAnswer": "By never allowing the Master and Slave to be enabled at the same time: Master samples inputs while Slave holds outputs, and Slave updates outputs only after Master is isolated.",
    "explanation": "Because CLK and CLK_bar are complementary, the feedback loop from output to input is never closed continuously while an active latch is updating.",
    "hint": "Think about the two non-overlapping clock phases.",
    "level": "basic",
    "codeExample": "// Master-Slave clocking:\n// CLK=1: Master active, Slave locked\n// CLK=0: Master locked, Slave active"
  },
  {
    "question": "What is the total number of NAND gates used in a standard Master-Slave JK Flip-Flop?",
    "shortAnswer": "8 NAND gates plus 1 Inverter (4 NAND gates for the Master stage, 4 NAND gates for the Slave stage).",
    "explanation": "The Master stage contains two 3-input steering NANDs + two cross-coupled storage NANDs; the Slave stage contains two 2-input steering NANDs + two cross-coupled storage NANDs.",
    "hint": "Count 4 NANDs in Master and 4 NANDs in Slave.",
    "level": "basic",
    "codeExample": "// Gate Breakdown:\n// Master = 4 NANDs\n// Slave  = 4 NANDs\n// Inverter = 1 NOT gate\n// Total  = 9 logic gates"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 3: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q3:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 4: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q4:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 5: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q5:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 6: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q6:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 7: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q7:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 8: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q8:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 9: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q9:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 10: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q10:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 11: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q11:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 12: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q12:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 13: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q13:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 14: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q14:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 15: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q15:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 16: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q16:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 17: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q17:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 18: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q18:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 19: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q19:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 20: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q20:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 21: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q21:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 22: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q22:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 23: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q23:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 24: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q24:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 25: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q25:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 26: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q26:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 27: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q27:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 28: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q28:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 29: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q29:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "Master-Slave JK Flip-Flop - Analysis Question 30: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q30:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  }
];

export default questions;
