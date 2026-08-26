// Question Bank for Topic 8: Range of numbers in n-bit signed systems
// Computer Architecture Masterclass

const questions = [
  {
    "question": "What is the core architectural principle behind Range of numbers in n-bit signed systems?",
    "shortAnswer": "Ensuring deterministic binary representation and glitch-free ALU arithmetic execution.",
    "explanation": "In computer architecture, Range of numbers in n-bit signed systems establishes the mathematical and physical mapping between human symbols and bistable transistor register states.",
    "hint": "Think about hardware word size, bit weights, and arithmetic flags.",
    "level": "basic",
    "codeExample": "// Hardware Register Representation for Range of numbers in n-bit signed systems\nint8_t reg = 0b11100111; // -25 in 2's complement"
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
    "question": "Digital Hardware Deep-Dive Question 3 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q3\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 4 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q4\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 5 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q5\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 6 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q6\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 7 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q7\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 8 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q8\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 9 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q9\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 10 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q10\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 11 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q11\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 12 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q12\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 13 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q13\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 14 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q14\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 15 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q15\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 16 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q16\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 17 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q17\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 18 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q18\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 19 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q19\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 20 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q20\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 21 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q21\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 22 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q22\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 23 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q23\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 24 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q24\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 25 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q25\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 26 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q26\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 27 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q27\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 28 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "moderate",
    "codeExample": "// Micro-architectural signal trace for Q28\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 29 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "basic",
    "codeExample": "// Micro-architectural signal trace for Q29\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  },
  {
    "question": "Digital Hardware Deep-Dive Question 30 (Range of numbers in n-bit signed systems): How is this principle realized in physical ALU micro-architecture?",
    "shortAnswer": "Through dedicated combinatorial logic gates, multiplexers, and flip-flop register transfers.",
    "explanation": "Implementing Range of numbers in n-bit signed systems at the silicon level optimizes propagation delay and silicon area while adhering to timing constraints (setup and hold times).",
    "hint": "Consider the logic circuit paths, bit-slice architecture, and clock cycles required.",
    "level": "expert",
    "codeExample": "// Micro-architectural signal trace for Q30\nwire [7:0] alu_out = a_bus + b_bus;\nwire overflow = (a_bus[7] == b_bus[7]) && (alu_out[7] != a_bus[7]);"
  }
];

export default questions;
