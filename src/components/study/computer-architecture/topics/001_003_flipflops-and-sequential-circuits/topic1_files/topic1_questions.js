// Question Bank for Topic 1: SR Latch
const questions = [
  {
    "question": "What is the fundamental mechanism that enables an SR Latch to store binary data?",
    "shortAnswer": "Cross-coupled positive feedback between two inverting logic gates (NOR or NAND).",
    "explanation": "In an SR Latch, the output of each gate is fed back into one of the inputs of the opposing gate. This circular feedback maintains the locked voltage state indefinitely as long as power is supplied and no conflicting input is asserted.",
    "hint": "Think about how an output feeds back into an input.",
    "level": "basic",
    "codeExample": "// NOR SR Latch in Verilog:\nassign Q = ~(R | Q_bar);\nassign Q_bar = ~(S | Q);"
  },
  {
    "question": "What is the difference in active input logic levels between a NOR-based SR Latch and a NAND-based SR Latch?",
    "shortAnswer": "A NOR-based SR Latch has active-HIGH inputs (S=1 to Set, R=1 to Reset), whereas a NAND-based latch has active-LOW inputs (S_bar=0 to Set, R_bar=0 to Reset).",
    "explanation": "In a NOR gate, any HIGH input forces the output LOW. Therefore, applying 1 triggers an action. In a NAND gate, any LOW input forces the output HIGH, making 0 the activating logic level.",
    "hint": "Consider the truth tables of basic NOR and NAND gates.",
    "level": "basic",
    "codeExample": "// NAND Latch (Active-Low):\n// S_bar=0, R_bar=1 => Q=1 (Set)\n// S_bar=1, R_bar=0 => Q=0 (Reset)"
  },
  {
    "question": "What output values occur in a NOR-based SR Latch when S = 1 and R = 1 are applied simultaneously?",
    "shortAnswer": "Both Q and Q_bar are driven to logic 0 simultaneously, violating the complementary rule Q != Q_bar.",
    "explanation": "Because a NOR gate outputs 0 whenever any of its inputs are 1, asserting S=1 forces Q_bar=0 and asserting R=1 forces Q=0 at the same time.",
    "hint": "Remember that NOR with any 1 input yields 0.",
    "level": "moderate",
    "codeExample": "// Invalid State in NOR Latch:\n// S=1, R=1 => Q=0, Q_bar=0 (Contradiction!)"
  },
  {
    "question": "What output values occur in a NAND-based S_bar-R_bar Latch when S_bar = 0 and R_bar = 0 are applied simultaneously?",
    "shortAnswer": "Both Q and Q_bar are driven to logic 1 simultaneously, violating the complementary rule Q != Q_bar.",
    "explanation": "Because a NAND gate outputs 1 whenever any input is 0, asserting S_bar=0 forces Q=1 and asserting R_bar=0 forces Q_bar=1 simultaneously.",
    "hint": "Remember that NAND with any 0 input yields 1.",
    "level": "moderate",
    "codeExample": "// Invalid State in NAND Latch:\n// S_bar=0, R_bar=0 => Q=1, Q_bar=1 (Contradiction!)"
  },
  {
    "question": "Why does transitioning from the invalid state back to the hold state cause metastability?",
    "shortAnswer": "Both cross-coupled gates race to pull their outputs to the new state; microscopic silicon delay differences cause voltage oscillation before settling randomly.",
    "explanation": "When both inputs are released simultaneously, neither gate has an established advantage. The circuit enters a meta-stable equilibrium region between logic 0 and 1, resulting in ringing and nondeterministic final states.",
    "hint": "Think of a mechanical toggle switch balanced on its midpoint knife-edge.",
    "level": "expert",
    "codeExample": "// Metastability resolution:\n// Output remains indeterminate for time t_met before settling randomly"
  },
  {
    "question": "How does an SR Latch solve the mechanical contact bounce problem in push-button switches?",
    "shortAnswer": "The latch switches state on the very first physical contact touch and ignores all subsequent bounce oscillations until the switch moves to the opposite pole.",
    "explanation": "A mechanical switch generates electrical noise bounces for 5-20 ms upon contact. Connecting an SPDT switch to an SR Latch locks the latch on the initial transition, providing a single, clean, digital pulse.",
    "hint": "Consider SPDT contact wiping vs electrical bouncing.",
    "level": "moderate",
    "codeExample": "// Hardware Debounce Circuit:\n// Position A → S=1, R=0 (Q sets cleanly)\n// Bounce in A → S floats to 0 (Latch holds Q=1 stably)"
  },
  {
    "question": "What is the quiescent (Memory Hold) input condition for a NOR-based SR Latch?",
    "shortAnswer": "S = 0 and R = 0.",
    "explanation": "When both S=0 and R=0, the outputs are solely determined by the feedback lines: Q = ~Q_bar and Q_bar = ~Q, holding the previously stored state indefinitely.",
    "hint": "Both inputs inactive in active-HIGH logic.",
    "level": "basic",
    "codeExample": "// Hold condition (NOR):\n// S=0, R=0 => Q(t+1) = Q(t)"
  },
  {
    "question": "What is the quiescent (Memory Hold) input condition for a NAND-based SR Latch?",
    "shortAnswer": "S_bar = 1 and R_bar = 1.",
    "explanation": "When both S_bar=1 and R_bar=1, the NAND gates act as inverters for the feedback lines: Q = ~Q_bar and Q_bar = ~Q, preserving the stored bit.",
    "hint": "Both inputs inactive in active-LOW logic.",
    "level": "basic",
    "codeExample": "// Hold condition (NAND):\n// S_bar=1, R_bar=1 => Q(t+1) = Q(t)"
  },
  {
    "question": "Why is an SR Latch considered an asynchronous device?",
    "shortAnswer": "It responds immediately to any transition on its input pins without waiting for a clock synchronization pulse.",
    "explanation": "Unlike clocked flip-flops that sample inputs only during clock transitions, an unclocked latch is continuously sensitive to its inputs at every nanosecond.",
    "hint": "Absence of a clock enable signal.",
    "level": "moderate",
    "codeExample": "// Asynchronous behavior:\n// Any change on S or R immediately propagates through gate delay t_pd"
  },
  {
    "question": "How is an SR Latch converted into a Gated (Clocked) SR Latch?",
    "shortAnswer": "By adding two input AND or NAND steering gates controlled by an Enable (CLK) signal in front of the cross-coupled storage gates.",
    "explanation": "The steering gates block inputs S and R when Enable/CLK is 0, isolating the latch from input noise and synchronizing updates to the clock active period.",
    "hint": "Gating inputs through clock-controlled AND/NAND gates.",
    "level": "moderate",
    "codeExample": "// Gated SR Latch:\nassign S_gated = S & Enable;\nassign R_gated = R & Enable;"
  },
  {
    "question": "SR Latch Analysis Question 11: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q11:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 12: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q12:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 13: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q13:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 14: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q14:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 15: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q15:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 16: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q16:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 17: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q17:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 18: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q18:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 19: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q19:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 20: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q20:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 21: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q21:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 22: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q22:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 23: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q23:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 24: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q24:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 25: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q25:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 26: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q26:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 27: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q27:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 28: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "moderate",
    "codeExample": "// Minimum pulse width constraint for Q28:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 29: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "basic",
    "codeExample": "// Minimum pulse width constraint for Q29:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  },
  {
    "question": "SR Latch Analysis Question 30: Explain how propagation delay (t_pd) across the feedback loop dictates the minimum trigger pulse width.",
    "shortAnswer": "The input pulse width must exceed the cumulative propagation delay through both gates (t_pulse > 2 * t_pd) to reliably latch the new state.",
    "explanation": "If the input pulse is too narrow (shorter than the loop delay), the feedback signal cannot complete a full round-trip to reinforce the new state before the input drops, causing a runt pulse.",
    "hint": "Think about the signal completing a full feedback loop.",
    "level": "expert",
    "codeExample": "// Minimum pulse width constraint for Q30:\n// t_pulse_min >= t_pd_gate1 + t_pd_gate2"
  }
];

export default questions;
