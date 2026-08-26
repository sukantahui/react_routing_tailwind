// Question Bank for Topic 3: D Latch
const questions = [
  {
    "question": "How does the D Latch eliminate the forbidden state of the SR Latch?",
    "shortAnswer": "By using an inverter between the Set and Reset steering inputs (S = D, R = D_bar), ensuring S and R can never be 1 at the same time.",
    "explanation": "Because D and D_bar are strictly complementary, the condition S=1 and R=1 is physically impossible.",
    "hint": "Think about the inverter between the two steering inputs.",
    "level": "basic",
    "codeExample": "// D Latch input logic:\n// S = D\n// R = ~D (Strictly complementary)"
  },
  {
    "question": "What does data transparency mean in the context of a D Latch?",
    "shortAnswer": "When Enable is HIGH, any transition on the D input immediately passes through to output Q in real time without waiting for a clock edge.",
    "explanation": "During the entire high duration of Enable, the latch acts as a transparent window: changes on D reflect at Q after propagation delay t_pd.",
    "hint": "Consider the behavior while Enable remains 1.",
    "level": "moderate",
    "codeExample": "// Transparent mode (EN=1):\n// Q(t) = D(t)"
  },
  {
    "question": "D Latch - Analysis Question 3: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q3:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 4: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q4:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 5: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q5:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 6: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q6:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 7: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q7:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 8: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q8:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 9: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q9:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 10: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q10:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 11: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q11:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 12: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q12:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 13: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q13:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 14: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q14:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 15: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q15:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 16: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q16:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 17: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q17:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 18: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q18:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 19: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q19:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 20: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q20:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 21: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q21:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 22: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q22:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 23: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q23:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 24: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q24:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 25: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q25:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 26: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q26:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 27: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q27:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 28: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "moderate",
    "codeExample": "// Timing parameter for Q28:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 29: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "basic",
    "codeExample": "// Timing parameter for Q29:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  },
  {
    "question": "D Latch - Analysis Question 30: Explain the internal NAND propagation delay and timing constraints.",
    "shortAnswer": "The propagation delay t_pd through the steering and cross-coupled NAND gates dictates the minimum clock pulse width and maximum operational frequency.",
    "explanation": "Signal propagation across the two-stage NAND matrix requires sufficient time for output feedback to latch stably before the active clock edge terminates.",
    "hint": "Consider cumulative NAND gate delays in the feedback path.",
    "level": "expert",
    "codeExample": "// Timing parameter for Q30:\n// f_max <= 1 / (t_su + t_pd_nand_matrix)"
  }
];

export default questions;
