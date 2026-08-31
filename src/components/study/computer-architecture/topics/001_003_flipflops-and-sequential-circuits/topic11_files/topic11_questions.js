// Question Bank for Topic 11: T Flip-Flop
const questions = [
  {
    "question": "How is a T Flip-Flop constructed from a JK Flip-Flop using NAND gates?",
    "shortAnswer": "By connecting the J and K inputs together to form a single common Toggle input T (J = K = T).",
    "explanation": "When T=0 (J=0, K=0), the flip-flop holds state; when T=1 (J=1, K=1), the flip-flop toggles its output on each active clock edge.",
    "hint": "Tie the two steering inputs together.",
    "level": "basic",
    "codeExample": "// T Flip-Flop Derivation:\nassign J = T;\nassign K = T;\n// Q(t+1) = T ^ Q"
  },
  {
    "question": "Why is the T Flip-Flop universally used in frequency division?",
    "shortAnswer": "Because in Toggle mode (T=1), it requires two input clock cycles to complete one full output cycle (0 → 1 → 0), dividing the clock frequency by 2.",
    "explanation": "Each clock pulse toggles the output once. Two positive edges are required for Q to go from 0 to 1 and back to 0, halving the frequency.",
    "hint": "Count how many clock pulses complete one full period of Q.",
    "level": "moderate",
    "codeExample": "// Frequency Division:\n// f_output = f_clock / 2"
  },
  {
    "question": "T Flip-Flop - Analysis Question 3: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q3:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 4: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q4:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 5: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q5:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 6: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q6:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 7: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q7:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 8: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q8:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 9: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q9:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 10: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q10:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 11: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q11:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 12: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q12:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 13: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q13:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 14: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q14:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 15: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q15:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 16: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q16:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 17: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q17:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 18: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q18:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 19: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q19:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 20: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q20:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 21: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q21:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 22: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q22:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 23: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q23:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 24: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q24:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 25: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q25:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 26: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q26:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 27: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q27:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 28: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q28:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 29: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q29:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "T Flip-Flop - Analysis Question 30: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q30:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  }
];

export default questions;
