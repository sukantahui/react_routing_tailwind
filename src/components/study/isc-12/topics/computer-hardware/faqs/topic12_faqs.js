// Topic 12 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Priority Encoder?",
    "answer": "An encoder that establishes an explicit priority ranking among inputs so that if multiple inputs are asserted, only the highest-priority input is encoded.",
    "explanation": "It eliminates the output errors and ambiguities that plague simple binary encoders when multiple signals arrive concurrently."
  },
  {
    "id": 2,
    "question": "What is the purpose of the Valid Bit (V) in a Priority Encoder?",
    "answer": "To distinguish between the valid condition when input 0 is asserted versus the idle condition when NO inputs are asserted.",
    "explanation": "When at least one input is active, V = 1. When all inputs are 0, V = 0, indicating that the output code (00) is invalid and should be ignored."
  },
  {
    "id": 3,
    "question": "In a 4-input priority encoder with inputs D0, D1, D2, D3 where D3 has highest priority, what do 'Don't Care' (X) entries signify in the truth table?",
    "answer": "They indicate that the state of lower-priority inputs is completely irrelevant once a higher-priority input is asserted.",
    "explanation": "For example, if D3 = 1, the inputs D2, D1, and D0 can be 0 or 1 (X X X); the output is guaranteed to encode D3 (binary 11)."
  },
  {
    "id": 4,
    "question": "What are the Boolean equations for a 4-input Priority Encoder (D3 highest)?",
    "answer": "Y1 = D3 + D2; Y0 = D3 + D2' · D1; V = D3 + D2 + D1 + D0.",
    "explanation": "Y1 is active for D3 or D2. Y0 is active for D3, or for D1 provided that D2 is NOT active (D2'·D1). V is the OR of all inputs."
  },
  {
    "id": 5,
    "question": "What output code is produced if D1 and D2 are both active (D3=0, D2=1, D1=1, D0=0)?",
    "answer": "Y1 = 1, Y0 = 0 (binary 10 = index 2) and V = 1.",
    "explanation": "Because D2 has higher priority than D1, the encoder selects D2 and completely ignores D1."
  },
  {
    "id": 6,
    "question": "What output code is produced if all inputs D0 to D3 are simultaneously equal to 1?",
    "answer": "Y1 = 1, Y0 = 1 (binary 11 = index 3) and V = 1.",
    "explanation": "D3 has the supreme priority, so the output encodes digit 3 regardless of D2, D1, D0."
  },
  {
    "id": 7,
    "question": "What is the state of the circuit when D3=0, D2=0, D1=0, D0=0?",
    "answer": "Y1 = 0, Y0 = 0, and V = 0 (Invalid output flag).",
    "explanation": "V=0 warns the processor or peripheral that no key is currently pressed, preventing false execution of code 00."
  },
  {
    "id": 8,
    "question": "How does a CPU interrupt controller utilize a Priority Encoder?",
    "answer": "To arbitrate competing interrupt requests from multiple I/O hardware devices and direct the CPU to the highest-priority interrupt service routine.",
    "explanation": "Critical devices (e.g. power failure sensor, system timer) are assigned higher priority inputs than low-speed peripherals (e.g. keyboard)."
  },
  {
    "id": 9,
    "question": "What is the commercial IC for an 8-input Priority Encoder?",
    "answer": "IC 74148 (8-to-3 line priority encoder with active-LOW pins and cascading enable inputs).",
    "explanation": "The 74148 features Enable Input (EI) and Enable Output (EO) pins to allow multiple chips to be cascaded into 16-input, 32-input, or 64-input priority networks."
  },
  {
    "id": 10,
    "question": "How do you cascade two 74148 priority encoders to handle 16 interrupt lines?",
    "answer": "Connect the EO (Enable Output) of the higher-priority chip to the EI (Enable Input) of the lower-priority chip.",
    "explanation": "If no interrupt occurs on the high bank (lines 8–15), its EO asserts to enable the low bank (lines 0–7) to encode."
  },
  {
    "id": 11,
    "question": "What gates are needed to implement a 4-input priority encoder?",
    "answer": "One NOT gate, one 2-input AND gate, and three OR gates.",
    "explanation": "NOT gate generates D2'; AND gate computes D2'·D1; OR gates compute Y1, Y0, and V."
  },
  {
    "id": 12,
    "question": "Can D0 ever be encoded if D1, D2, or D3 is asserted?",
    "answer": "No, D0 has the lowest priority and is only encoded when D3=0, D2=0, D1=0, and D0=1.",
    "explanation": "Any asserted higher line completely masks D0."
  },
  {
    "id": 13,
    "question": "What is the K-map simplification for output Y0 of a 4-input priority encoder?",
    "answer": "Plotting the 16 cells yields Y0 = D3 + D2'·D1.",
    "explanation": "The term D3 covers all 8 cells where D3=1; the term D2'D1 covers the cells where D3=0, D2=0, and D1=1."
  },
  {
    "id": 14,
    "question": "What is the difference between a Fixed Priority Encoder and a Round-Robin Priority Arbiter?",
    "answer": "A fixed priority encoder permanently hardwires input priorities; a round-robin arbiter dynamically rotates priority to ensure fair bus allocation.",
    "explanation": "Fixed priority can cause 'starvation' of lower-priority devices under heavy load; round-robin guarantees service to all devices."
  },
  {
    "id": 15,
    "question": "What is the key point to mention in CISCE exams when explaining a Priority Encoder?",
    "answer": "Define it as an encoder where each input has an assigned priority rank, mention the role of Don't Cares (X), and explain the Valid bit (V).",
    "explanation": "Students who explain the Valid bit and illustrate a multiple-input conflict resolution consistently score full marks."
  }
];

export default faqs;
