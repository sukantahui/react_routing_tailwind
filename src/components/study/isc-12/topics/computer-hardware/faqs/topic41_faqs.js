// Topic 41 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "How is a Multiplexer used for Bus Word Routing between microprocessor registers?",
    "answer": "A bank of multiplexers (e.g. Quad 2:1 or Quad 4:1) selects an entire n-bit data word from one of several source registers (Reg A, Reg B) and routes it onto the shared CPU data bus.",
    "explanation": "Select lines act as register address decoders for internal bus transfers."
  },
  {
    "id": 17,
    "question": "How does a Multiplexer function as a Parallel-to-Serial Data Converter (Serializer)?",
    "answer": "An 8-bit parallel byte is loaded into inputs I0-I7; a 3-bit binary counter clocks select lines S2-S0 from 000 to 111, transmitting the bits sequentially on single output line Y.",
    "explanation": "Foundational in serial communication standards like UART, USB, and SPI."
  },
  {
    "id": 18,
    "question": "What is a Barrel Shifter and how does it use Multiplexers?",
    "answer": "A digital circuit that shifts or rotates a binary word by any number of bit positions in a single clock cycle, constructed from cascading levels of 2-to-1 multiplexers.",
    "explanation": "Critical for floating-point arithmetic and bit-manipulation instructions in modern ALUs."
  },
  {
    "id": 19,
    "question": "How does a Multiplexer perform Logic Function Emulation in hardware testbenches?",
    "answer": "By changing the binary constants on data input pins, an engineer can reconfigure a hardware board to test different logic functions without resoldering components.",
    "explanation": "Acts as a hardwired lookup table for prototyping."
  },
  {
    "id": 20,
    "question": "What is Time-Division Multiplexing (TDM) in digital telephony?",
    "answer": "A transmission technique where multiple digital voice calls are sampled and interleaved into rapid sequential timeslots across a single high-bandwidth transmission line using a MUX.",
    "explanation": "Increases cable utilization by sharing one physical channel among hundreds of users."
  },
  {
    "id": 21,
    "question": "How does a 74157 Quad 2-to-1 MUX route 4-bit nibbles?",
    "answer": "Contains four 2:1 MUXes driven by a common select line S. When S=0, 4-bit Word A (A3-A0) appears at outputs; when S=1, 4-bit Word B (B3-B0) appears.",
    "explanation": "Standard 4-bit bus switcher in microcontroller interfacing."
  },
  {
    "id": 22,
    "question": "How are multiplexers used in video graphics cards (VRAM DACs)?",
    "answer": "Multiplexers select between RGB color component bytes from display memory and route them to high-speed digital-to-analog converters (DACs) at pixel clock rates.",
    "explanation": "Enables multi-megahertz video signal generation."
  },
  {
    "id": 23,
    "question": "What role does a Multiplexer play in Seven-Segment Display Multiplexing?",
    "answer": "It cycles through BCD digits of a multi-digit number, synchronizing with digit-enable transistors so only one common display decoder chip is needed for all digits.",
    "explanation": "Massively reduces pin count and wiring in digital clocks and calculators."
  },
  {
    "id": 24,
    "question": "Why are Multiplexers favored over tristate buses in modern FPGA synthesis?",
    "answer": "Multiplexer-based multiplexing uses dedicated internal logic cells with deterministic timing, avoiding floating-bus contention and leakage current risks.",
    "explanation": "Modern deep-submicron CMOS architectures prohibit internal tristate buses."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for Practical MUX Applications?",
    "answer": "Explain with a diagram how a Multiplexer is used for parallel-to-serial conversion, or explain how a Quad 2:1 MUX performs bus selection between two 4-bit registers.",
    "explanation": "A frequent 3-mark application question in ISC Class 12 Computer Science."
  }
];

export default faqs;
