// Topic 8 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the primary function of a Binary Encoder?",
    "answer": "To compress 2^n input lines into an n-bit binary coded output corresponding to the active input line.",
    "explanation": "An encoder performs the inverse operation of a decoder. It detects which one of its multiple input lines is currently asserted and produces its binary equivalent at the output."
  },
  {
    "id": 2,
    "question": "How many input lines and output lines does an n-bit binary encoder have?",
    "answer": "It has a maximum of 2^n input lines and exactly n output lines.",
    "explanation": "For example, a 4-to-2 encoder has 4 inputs and 2 outputs; an 8-to-3 encoder has 8 inputs and 3 outputs; a 16-to-4 encoder has 16 inputs and 4 outputs."
  },
  {
    "id": 3,
    "question": "What fundamental assumption is made in a simple (non-priority) binary encoder?",
    "answer": "Exactly one and only one input line is asserted (active at logic 1) at any given instant.",
    "explanation": "If zero inputs or multiple inputs are asserted simultaneously, a conventional encoder generates an erroneous, meaningless output code."
  },
  {
    "id": 4,
    "question": "Why is the input line I0 (or D0) usually left unconnected in OR-gate encoder circuits?",
    "answer": "Because binary 00...0 requires all output bits to be 0; hence, no OR gate needs to be triggered when I0 is active.",
    "explanation": "For index 0 (000₂), all outputs are 0. Connecting I0 to any OR gate would erroneously force that output bit to 1."
  },
  {
    "id": 5,
    "question": "What logic gates are used to build a standard binary encoder?",
    "answer": "Basic multi-input OR gates.",
    "explanation": "Each binary output bit is formed by OR-ing all input lines whose binary indices have a '1' in that bit position."
  },
  {
    "id": 6,
    "question": "What is the primary ambiguity in a standard encoder when all inputs are 0?",
    "answer": "The output is 00...0, which is identical to the output when input I0 is active.",
    "explanation": "The circuit cannot distinguish between 'Input 0 is active' and 'No input is active'. Priority encoders solve this with a Valid bit (V)."
  },
  {
    "id": 7,
    "question": "What happens if both I1 and I2 are pressed simultaneously in a 4-to-2 encoder?",
    "answer": "Both outputs Y1 and Y0 become 1 (outputting 11₂ = 3), which is a completely false reading.",
    "explanation": "Since Y1 = I2 + I3 and Y0 = I1 + I3, having I1=1 and I2=1 forces both Y1=1 and Y0=1, falsely indicating input 3."
  },
  {
    "id": 8,
    "question": "What is an Octal-to-Binary encoder?",
    "answer": "An encoder with 8 input lines (representing octal digits 0 to 7) and 3 binary output lines (A, B, C).",
    "explanation": "It encodes active octal input lines D0–D7 into 3-bit binary equivalents (000₂ to 111₂)."
  },
  {
    "id": 9,
    "question": "What is a Decimal-to-BCD encoder?",
    "answer": "An encoder that converts 10 decimal input lines (0 to 9) into a 4-bit Binary Coded Decimal (BCD) code.",
    "explanation": "It accepts single decimal digits from keypads and outputs standard 8421 BCD (0000₂ to 1001₂)."
  },
  {
    "id": 10,
    "question": "Why do encoders have NO select lines?",
    "answer": "Because the input lines themselves dictate the output code; it is a code converter, not a data selector.",
    "explanation": "Students frequently confuse encoders with multiplexers. Multiplexers have select lines to choose a channel; encoders do not."
  },
  {
    "id": 11,
    "question": "Where are encoders commonly used in computer hardware?",
    "answer": "In computer keyboards, calculator keypads, interrupt controllers, and Analog-to-Digital Converters (ADCs).",
    "explanation": "When you press a key on a keyboard, a hardware encoder converts that physical keypress switch into a binary scan code for the CPU."
  },
  {
    "id": 12,
    "question": "What is the relation between the number of inputs N and outputs m?",
    "answer": "m = log2(N), or 2^m = N.",
    "explanation": "If there are 64 input lines, m = log2(64) = 6 binary output lines are required."
  },
  {
    "id": 13,
    "question": "Can an encoder have fewer than 2^n inputs for n outputs?",
    "answer": "Yes, such as a Decimal-to-BCD encoder which has 10 inputs (not 16) but requires 4 binary outputs (since 2³=8 < 10 ≤ 2⁴=16).",
    "explanation": "When inputs exceed 2^(n-1), n output bits are mandatory, leaving the unused binary combinations (1010₂ to 1111₂) as invalid or don't cares."
  },
  {
    "id": 14,
    "question": "What is an Active-LOW Encoder?",
    "answer": "An encoder where inputs and outputs are asserted at logic 0 instead of logic 1.",
    "explanation": "Many commercial encoder ICs (e.g., 74LS148) are active-LOW, meaning pressing a button pulls the line to ground (0V)."
  },
  {
    "id": 15,
    "question": "What is the standard CISCE board definition of an Encoder?",
    "answer": "'An encoder is a combinational logic circuit that converts 2^n input lines into an n-bit binary code.'",
    "explanation": "State the mathematical compression ratio 2^n to n and mention that only one input is active at a time for full 2-mark credit."
  }
];

export default faqs;
