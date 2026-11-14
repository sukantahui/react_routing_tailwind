// Topic 41 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the three primary applications of multiplexers covered in Section 2.3.4C?",
    "answer": "1. Bus Word Routing between registers, 2. Parallel-to-Serial Data Conversion (Data Serializer), and 3. Direct two-level logic realization.",
    "explanation": "These three applications form the core architectural roles of multiplexers in digital computer systems."
  },
  {
    "id": 2,
    "question": "What is a 'Bus' in computer hardware architecture (Textbook Section 2.3.4C)?",
    "answer": "A bus is a shared communication pathway (wire) that accepts inputs from several sources and distributes the resultant logic level to a destination.",
    "explanation": "Instead of running dedicated cables between every pair of registers, a shared bus routed by multiplexers saves immense circuit complexity."
  },
  {
    "id": 3,
    "question": "In Textbook Fig 2.27, how does the multiplexer route data between registers?",
    "answer": "It selects data words from Register A, Register B, Register C, or all 0s, and directs the chosen word into Register D.",
    "explanation": "Selection lines S1 and S0 determine which source register drives the bus into destination Register D."
  },
  {
    "id": 4,
    "question": "What are the select line combinations for the Bus Routing circuit in Fig 2.27?",
    "answer": "S1S0 = 00 routes Register A; 01 routes Register B; 10 routes Register C; 11 routes All Zeros.",
    "explanation": "A 2-bit control code from the CPU control unit dictates which register transfers its contents onto the bus."
  },
  {
    "id": 5,
    "question": "Why is an 'All Zeros' input included in the register routing multiplexer of Fig 2.27?",
    "answer": "To allow the CPU to clear (reset) destination Register D to zero in a single clock cycle without extra clear circuitry.",
    "explanation": "Selecting the all-zeros input transfers 000...0 into the destination register during initialization or register reset instructions."
  },
  {
    "id": 6,
    "question": "What is Parallel-to-Serial data conversion (Textbook Fig 2.28)?",
    "answer": "Taking parallel data bits available simultaneously on multiple wires and transmitting them sequentially one bit at a time over a single wire.",
    "explanation": "Parallel data transfer requires many wires; serial transmission sends bits sequentially, ideal for long-distance communication cables."
  },
  {
    "id": 7,
    "question": "How does a multiplexer perform Parallel-to-Serial conversion?",
    "answer": "Parallel data bits are connected to MUX inputs; a binary counter steps through the select lines, transmitting bits in sequence on the output.",
    "explanation": "As the clock increments the counter (000, 001, 010...), the MUX connects consecutive data inputs to the single serial transmission line."
  },
  {
    "id": 8,
    "question": "What determines the transmission order (e.g. abcdefg vs gfedcba) in a MUX serializer?",
    "answer": "The direction of the counter driving the selection lines: an up-counter transmits abcdefg; a down-counter transmits gfedcba.",
    "explanation": "Counting up from 000 to 110 accesses inputs sequentially; counting down reverses the bit sequence."
  },
  {
    "id": 9,
    "question": "Where is parallel-to-serial conversion used in modern computer hardware?",
    "answer": "In serial communication interfaces such as UART, USB, SATA, Ethernet, and shift register transmitters.",
    "explanation": "CPUs process data in 32-bit or 64-bit parallel words, but network cables and USB cables transmit data serially."
  },
  {
    "id": 10,
    "question": "How does a multiplexer act as a digital single-pole multi-throw (SPMT) rotary switch?",
    "answer": "The single output line represents the movable pole, while the data inputs represent the multiple throws switched by the select code.",
    "explanation": "Electronic switching via select lines allows switching in nanoseconds without mechanical contacts."
  },
  {
    "id": 11,
    "question": "What is Time-Division Multiplexing (TDM) and how do MUXes implement it?",
    "answer": "Allocating discrete time slots on a shared transmission channel to multiple independent communication streams.",
    "explanation": "A MUX samples channel 1 during time slot 1, channel 2 during time slot 2, and so on, interleaving multiple voice or data conversations."
  },
  {
    "id": 12,
    "question": "What is the role of the Strobe / Enable pin in a bus multiplexer?",
    "answer": "It allows the MUX output to be placed in high-impedance (tri-state) or forced to 0, disconnecting it from the shared bus.",
    "explanation": "Enables allow multiple multiplexers to share the same physical bus wire without bus contention."
  },
  {
    "id": 13,
    "question": "How does propagation delay through a multiplexer affect bus clock frequencies?",
    "answer": "The delay from select inputs to output sets a lower bound on clock period, limiting maximum bus clock frequency.",
    "explanation": "Signals must stabilize on the bus before the destination register clocks them in, defining setup time."
  },
  {
    "id": 14,
    "question": "Why are multiplexers called 'universal function generators'?",
    "answer": "Because any arbitrary n-variable truth table can be implemented directly by a 2^(n-1):1 MUX without redesigning logic gates.",
    "explanation": "Changing the Boolean function merely requires rewiring data input pins to VCC, GND, or literals without altering the IC layout."
  },
  {
    "id": 15,
    "question": "What are the key diagrams and explanations required in ISC exams for MUX applications?",
    "answer": "The Bus Routing block diagram (Fig 2.27) with register labels and select codes, and the Serializer diagram (Fig 2.28) with parallel inputs and counter clocking.",
    "explanation": "Examiners look for clear signal flow arrows, input-output labeling, and concise operational descriptions."
  }
];

export default faqs;
