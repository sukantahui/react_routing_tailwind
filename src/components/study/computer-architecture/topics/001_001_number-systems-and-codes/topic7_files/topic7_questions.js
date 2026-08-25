// Question Bank for Topic 7: 2’s Complement representation of negative numbers
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind 2’s Complement representation of negative numbers?",
    "shortAnswer": "Ensuring deterministic binary representation and glitch-free ALU arithmetic execution.",
    "explanation": "In computer architecture, 2’s Complement representation of negative numbers establishes the mathematical and physical mapping between human symbols and bistable transistor register states.",
    "hint": "Think about hardware word size, bit weights, and arithmetic flags.",
    "level": "basic",
    "codeExample": "// Hardware Register Representation for 2’s Complement representation of negative numbers\nint8_t reg = 0b11100111; // -25 in 2's complement"
  },
  {
    "question": "How does a CPU detect overflow during signed arithmetic operations?",
    "shortAnswer": "By evaluating V = C_in(MSB) XOR C_out(MSB), or detecting when two same-sign inputs produce an opposite-sign sum.",
    "explanation": "An arithmetic overflow occurs when the true mathematical sum exceeds the representable range of the n-bit register, causing the sign bit to flip incorrectly.",
    "hint": "If you add two positive numbers and the result has a leading 1 (negative), an overflow occurred.",
    "level": "moderate",
    "codeExample": "// Overflow detection in C:\nint8_t a = 120, b = 10;\nint8_t sum = a + b; // -126 (Overflow! V flag set)"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 3 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q3\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 4 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q4\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 5 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q5\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 6 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q6\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 7 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q7\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 8 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q8\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 9 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q9\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 10 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q10\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 11 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q11\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 12 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q12\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 13 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q13\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 14 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q14\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 15 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q15\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 16 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q16\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 17 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q17\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 18 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q18\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 19 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q19\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 20 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q20\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 21 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q21\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 22 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q22\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 23 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q23\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 24 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q24\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 25 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q25\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 26 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q26\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 27 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q27\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 28 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q28\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 29 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q29\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 30 (2’s Complement representation of negative numbers): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing 2’s Complement representation of negative numbers at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q30\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  }
];

export default questions;
