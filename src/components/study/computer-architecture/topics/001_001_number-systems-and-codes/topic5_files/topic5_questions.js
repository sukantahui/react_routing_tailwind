// topic5_questions.js - 30 Comprehensive Questions on Sign-Magnitude Representation
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is Sign-Magnitude representation in digital computer architecture?",
    shortAnswer: "A signed number encoding where the MSB represents the sign (0=positive, 1=negative) and the remaining bits represent the absolute magnitude in standard binary.",
    explanation: "In an n-bit register, bit n-1 (the MSB) is reserved for the algebraic sign: 0 denotes positive (+), and 1 denotes negative (-). The remaining n-1 bits represent the magnitude |V| as a standard unsigned binary number.",
    hint: "Think of an explicit +/- sign attached to a binary number.",
    level: "basic",
    codeExample: "+25 in 8-bit: 0 0011001\n-25 in 8-bit: 1 0011001"
  },
  {
    question: "What is the formula for the dynamic range of an n-bit Sign-Magnitude integer system?",
    shortAnswer: "[-(2^(n-1) - 1) to +(2^(n-1) - 1)].",
    explanation: "Since 1 bit is dedicated to the sign, n-1 bits remain for magnitude. The magnitude spans from 0 to 2^(n-1) - 1. Including positive and negative signs gives the symmetric range [-(2^(n-1) - 1) to +(2^(n-1) - 1)].",
    hint: "For 4 bits, -(2^3 - 1) to +(2^3 - 1) = -7 to +7.",
    level: "basic",
    codeExample: "4-bit: [-7, +7]\n8-bit: [-127, +127]\n16-bit: [-32767, +32767]"
  },
  {
    question: "What are the two binary representations of zero in an 8-bit Sign-Magnitude system?",
    shortAnswer: "+0 is represented by `00000000` and -0 is represented by `10000000`.",
    explanation: "When the magnitude bits are all zero (0000000), having sign bit 0 produces +0 (`00000000`), while having sign bit 1 produces -0 (`10000000`). This is known as the dual-zero anomaly.",
    hint: "One has MSB=0 and magnitude 0; the other has MSB=1 and magnitude 0.",
    level: "basic",
    codeExample: "+0 = 0000 0000_2\n-0 = 1000 0000_2"
  },
  {
    question: "Convert decimal +18 and -18 into 8-bit Sign-Magnitude representation.",
    shortAnswer: "+18 = 00010010_2, -18 = 10010010_2.",
    explanation: "Magnitude 18 in 7 bits is 0010010 (16 + 2). For +18, prepend 0: `00010010`. For -18, prepend 1: `10010010`.",
    hint: "Only the MSB changes between positive and negative versions in sign-magnitude.",
    level: "basic",
    codeExample: "+18 = 00010010 (0x12)\n-18 = 10010010 (0x92)"
  },
  {
    question: "Decode the 8-bit Sign-Magnitude binary pattern `11001011` into decimal.",
    shortAnswer: "-75.",
    explanation: "MSB is 1, so the sign is negative. Remaining 7 magnitude bits are 1001011 = 64 + 8 + 2 + 1 = 75. Therefore, the value is -75.",
    hint: "Separate MSB (1) from magnitude bits (1001011 = 64 + 8 + 2 + 1).",
    level: "basic",
    codeExample: "1 1001011 -> Sign: -, Magnitude: 64+8+2+1=75 -> -75"
  },
  {
    question: "How many unique numerical values can be represented in an n-bit Sign-Magnitude system?",
    shortAnswer: "2^n - 1 unique numerical values.",
    explanation: "An n-bit register has 2^n total bit combinations. Because +0 and -0 both represent the numerical quantity 0, one combination is redundant, resulting in 2^n - 1 unique numbers.",
    hint: "Total bit combinations (2^n) minus one redundant zero.",
    level: "basic",
    codeExample: "8-bit: 2^8 - 1 = 255 unique values (from -127 to +127)"
  },
  {
    question: "Why is Sign-Magnitude rarely used for integer arithmetic in modern CPU ALUs?",
    shortAnswer: "It requires separate hardware circuits for addition and subtraction, magnitude comparison logic before calculation, and handles dual zeros.",
    explanation: "In Sign-Magnitude, the ALU cannot simply feed both operands to a binary adder. It must first inspect both sign bits. If signs differ, it must compare magnitudes to see which is larger, perform subtraction (|larger| - |smaller|), and set the sign of the larger operand. This requires complicated multiplexers and slows down clock cycles.",
    hint: "Adding numbers with different signs requires finding the larger magnitude first.",
    level: "moderate",
    codeExample: "A + B requires: if (sign(A) == sign(B)) ADD else CMP_MAG -> SUB"
  },
  {
    question: "Where is Sign-Magnitude representation still actively used in modern computer hardware?",
    shortAnswer: "In the IEEE-754 Floating-Point Standard and certain digital-to-analog / analog-to-digital converters (ADCs).",
    explanation: "The IEEE-754 floating-point format (float and double) uses a 1-bit sign field where 0 represents a positive mantissa and 1 represents a negative mantissa. This allows floating-point multiplication to compute the product sign with a simple 1-gate XOR operation.",
    hint: "Think about floating-point numbers (float and double).",
    level: "moderate",
    codeExample: "IEEE-754 32-bit Float: [Sign: 1 bit][Exponent: 8 bits][Mantissa: 23 bits]"
  },
  {
    question: "How does floating-point multiplication benefit from Sign-Magnitude encoding of the sign bit?",
    shortAnswer: "The sign of the product is simply the XOR of the two operand sign bits: `Sign_Result = Sign_A XOR Sign_B`.",
    explanation: "Because the sign is entirely separated from the magnitude (mantissa), multiplying two floats does not require 2's complement conversion. The hardware simply multiplies the unsigned mantissas and XORs the two sign bits in parallel.",
    hint: "Positive * Negative = Negative (0 XOR 1 = 1).",
    level: "moderate",
    codeExample: "Sign_Out = Sign_A ^ Sign_B; // 1-gate delay"
  },
  {
    question: "What is the result of dividing 1.0 by +0.0 versus 1.0 by -0.0 in IEEE-754 floating-point arithmetic?",
    shortAnswer: "`1.0 / +0.0 = +Infinity`, whereas `1.0 / -0.0 = -Infinity`.",
    explanation: "Because IEEE-754 uses Sign-Magnitude, +0.0 and -0.0 are distinct bit patterns. Preserving the sign of zero allows continuous mathematical functions (like 1/x or log(x)) to preserve directional limits approaching zero from the left or right.",
    hint: "Approaching 0 from negative vs positive side produces opposite infinities.",
    level: "moderate",
    codeExample: "1.0 / +0.0 -> +Infinity\n1.0 / -0.0 -> -Infinity"
  },
  {
    question: "What is the 8-bit Sign-Magnitude representation of decimal -127?",
    shortAnswer: "`11111111` or `0xFF`.",
    explanation: "127 in 7 bits is 1111111. Prepending the sign bit 1 for negative gives 11111111.",
    hint: "MSB = 1, magnitude = 127 = 1111111.",
    level: "moderate",
    codeExample: "-127 in Sign-Magnitude = 11111111_2 = 0xFF"
  },
  {
    question: "What is the decimal value of the bit pattern `11111111` in (a) Sign-Magnitude, (b) 1's Complement, and (c) 2's Complement?",
    shortAnswer: "(a) -127 in Sign-Magnitude, (b) -0 in 1's Complement, (c) -1 in 2's Complement.",
    explanation: "Sign-Mag: MSB=1 (-), Mag=127 -> -127. 1's Comp: Inverting 11111111 gives 00000000 -> -0. 2's Comp: -128 + 127 = -1.",
    hint: "Compare how each encoding decodes all 1s.",
    level: "moderate",
    codeExample: "0xFF in Sign-Mag: -127\n0xFF in 1's Comp: -0\n0xFF in 2's Comp: -1"
  },
  {
    question: "How does Sign-Magnitude represent +127 and -127 in a 16-bit register?",
    shortAnswer: "+127 = `00000000 01111111` (0x007F), -127 = `10000000 01111111` (0x807F).",
    explanation: "In 16-bit Sign-Magnitude, bit 15 is the sign bit, and bits 14..0 hold the magnitude. 127 is 0000000 01111111. For +127, bit 15 is 0; for -127, bit 15 is 1.",
    hint: "Bit 15 is the sign bit; bits 14 to 0 are 15 magnitude bits.",
    level: "moderate",
    codeExample: "+127 = 0x007F\n-127 = 0x807F"
  },
  {
    question: "If you add +5 (`00000101`) and -5 (`10000101`) directly using a standard binary adder in Sign-Magnitude, what incorrect result is produced?",
    shortAnswer: "`10001010`, which decodes to -10 instead of 0.",
    explanation: "Direct addition: 00000101 + 10000101 = 10001010. In Sign-Magnitude, 10001010 has sign bit 1 and magnitude 10, representing -10! This proves why standard adders cannot be used directly on Sign-Magnitude numbers.",
    hint: "00000101 + 10000101 = 10001010 (-10).",
    level: "moderate",
    codeExample: "  00000101 (+5)\n+ 10000101 (-5)\n= 10001010 (-10 in Sign-Mag, WRONG!)"
  },
  {
    question: "Explain the algorithm required to perform addition of two Sign-Magnitude numbers A and B in hardware.",
    shortAnswer: "If signs are identical, add magnitudes and use the common sign; if signs differ, compare magnitudes, subtract smaller from larger, and assign the sign of the larger magnitude.",
    explanation: "Let A = (S_A, M_A) and B = (S_B, M_B). 1. If S_A == S_B: M_Result = M_A + M_B, S_Result = S_A. 2. If S_A != S_B: Compare M_A and M_B. If M_A >= M_B, M_Result = M_A - M_B, S_Result = S_A. If M_A < M_B, M_Result = M_B - M_A, S_Result = S_B.",
    hint: "It requires a magnitude comparator and a conditional subtractor.",
    level: "moderate",
    codeExample: "if (S_A == S_B) { Sum = M_A + M_B; Sign = S_A; }\nelse if (M_A >= M_B) { Sum = M_A - M_B; Sign = S_A; }\nelse { Sum = M_B - M_A; Sign = S_B; }"
  },
  {
    question: "What is the maximum value that can be represented in a 32-bit Sign-Magnitude system?",
    shortAnswer: "+(2^31 - 1) = +2,147,483,647.",
    explanation: "With 31 magnitude bits, the maximum magnitude is 2^31 - 1 = 2,147,483,647. The sign bit is 0 for positive.",
    hint: "2^31 - 1 is the largest 31-bit integer.",
    level: "moderate",
    codeExample: "0x7FFFFFFF = +2,147,483,647"
  },
  {
    question: "What is the minimum value (most negative) that can be represented in a 32-bit Sign-Magnitude system?",
    shortAnswer: "-(2^31 - 1) = -2,147,483,647.",
    explanation: "Sign-Magnitude is symmetric. The most negative value is -(2^31 - 1) = -2,147,483,647, represented by `0xFFFFFFFF` (Sign bit 1, all 31 magnitude bits 1). Note that 2's complement can reach -2,147,483,648.",
    hint: "Sign-Magnitude cannot represent -2^31.",
    level: "moderate",
    codeExample: "0xFFFFFFFF in 32-bit Sign-Mag = -2,147,483,647"
  },
  {
    question: "How do you detect overflow when adding two Sign-Magnitude numbers with the SAME sign?",
    shortAnswer: "When the addition of their (n-1)-bit magnitudes produces a carry-out from bit n-2.",
    explanation: "Because the magnitude is restricted to n-1 bits, adding two magnitudes that exceed 2^(n-1) - 1 generates a carry-out of the magnitude adder into the sign bit position, indicating an overflow condition.",
    hint: "Carry-out from the (n-1)-bit magnitude adder signals overflow.",
    level: "expert",
    codeExample: "In 8-bit: +100 (01100100) + +50 (00110010) -> Mag sum 150 > 127 -> Overflow!"
  },
  {
    question: "Can subtracting two numbers with the same sign ever cause an overflow in Sign-Magnitude arithmetic?",
    shortAnswer: "No, subtracting numbers of the same sign always produces a result whose magnitude is strictly smaller than or equal to the larger operand.",
    explanation: "Since |A| - |B| <= |A| (when |A| >= |B|), the resulting magnitude cannot exceed the capacity of the magnitude bits, making overflow impossible during subtraction of same-sign numbers.",
    hint: "The difference of two positive numbers is always smaller than the larger input.",
    level: "expert",
    codeExample: "|A| - |B| <= max(|A|, |B|) <= Max_Magnitude -> Never Overflows"
  },
  {
    question: "Why did early mainframe computers like the IBM 704 (1954) adopt Sign-Magnitude arithmetic?",
    shortAnswer: "Because human engineers and programmers found Sign-Magnitude registers easiest to inspect on front-panel vacuum tube indicator lamps.",
    explanation: "In the 1950s, engineers debugged computers by reading incandescent lamps on the machine console. Seeing a single 'Sign' lamp illuminated next to magnitude lamps was immediately intuitive to human operators before software debuggers existed.",
    hint: "Front console light bulbs directly mirrored human mathematical signs.",
    level: "expert",
    codeExample: "Console display: [LAMP: -] [LAMPS: 0011001] -> '-25'"
  },
  {
    question: "How does Sign-Magnitude impact the hardware design of a Zero Flag (ZF) in the CPU status register?",
    shortAnswer: "The Zero Flag logic must check for BOTH `0000...0000` (+0) and `1000...0000` (-0), requiring an extra comparator stage.",
    explanation: "In 2's complement, `ZF = NOR(all bits)`. In Sign-Magnitude, a simple NOR gate on all bits would fail to assert ZF for -0 (`10000000`). The hardware must instead check if bits 0 to n-2 are all zero, ignoring the MSB.",
    hint: "ZF must assert if all magnitude bits are 0, regardless of the sign bit.",
    level: "expert",
    codeExample: "ZF = NOR(b_{n-2}, b_{n-3}, ..., b_0); // Must ignore b_{n-1}"
  },
  {
    question: "In C and C++ programming, did any C standard allow Sign-Magnitude representation for signed integer types?",
    shortAnswer: "Yes; C99 and C11 allowed implementations to use 2's complement, 1's complement, or Sign-Magnitude; C++20 and C23 officially mandated 2's complement exclusively.",
    explanation: "Historical C standards permitted all three representations to support exotic legacy architectures. In C++20 and C23, the ISO standards committees officially updated the specification to require 2's complement for all signed integers, deprecating Sign-Magnitude for integer types.",
    hint: "Modern C/C++ standards have standardized on 2's complement.",
    level: "expert",
    codeExample: "C++20: Standard mandates 2's complement signed integers exclusively."
  },
  {
    question: "Convert decimal -1 to 8-bit Sign-Magnitude, 8-bit 1's complement, and 8-bit 2's complement.",
    shortAnswer: "Sign-Magnitude: `10000001` (0x81); 1's Complement: `11111110` (0xFE); 2's Complement: `11111111` (0xFF).",
    explanation: "Sign-Mag: Sign=1, Mag=1 -> 10000001. 1's Comp: Invert +1 (00000001) -> 11111110. 2's Comp: Invert and add 1 -> 11111111.",
    hint: "Notice how distinct these three negative representations are for the exact same value -1.",
    level: "expert",
    codeExample: "-1 in Sign-Mag: 10000001\n-1 in 1's Comp: 11111110\n-1 in 2's Comp: 11111111"
  },
  {
    question: "How is negation (converting x to -x) performed in Sign-Magnitude hardware versus 2's complement hardware?",
    shortAnswer: "In Sign-Magnitude, negation simply toggles the MSB (1 XOR gate); in 2's complement, negation requires inverting all bits and adding 1 (NOT + Adder).",
    explanation: "Sign-Magnitude has the fastest negation circuit: `MSB_new = MSB_old XOR 1`. 2's complement negation is more complex because adding 1 propagates carry ripples across all bits.",
    hint: "Flipping a single sign bit requires only one logic gate.",
    level: "expert",
    codeExample: "Sign-Mag Negation: bit[n-1] ^= 1; (Instantaneous 1-gate operation)"
  },
  {
    question: "What is the primary trade-off between Sign-Magnitude and 2's Complement in ALU design?",
    shortAnswer: "Sign-Magnitude offers trivial negation and multiplication sign handling but expensive addition/subtraction; 2's complement simplifies addition/subtraction to identical hardware at the cost of slightly more complex negation.",
    explanation: "Addition and subtraction occur far more frequently in typical CPU instruction streams than multiplication. Optimizing addition/subtraction with 2's complement yields vastly superior overall CPU performance and silicon area savings.",
    hint: "Optimize for the most common operations (addition and subtraction).",
    level: "expert",
    codeExample: "2's complement: Single Adder handles both A + B and A - B."
  },
  {
    question: "In an ADC (Analog-to-Digital Converter) outputting a 12-bit Sign-Magnitude format, what does the bit pattern `1000 0000 0000` represent?",
    shortAnswer: "Negative Zero (-0 V).",
    explanation: "Bit 11 is 1 (negative), and bits 10..0 are all 0 (zero magnitude). In physical instrumentation, this represents an infinitesimal negative voltage near 0V.",
    hint: "Sign bit = 1, all 11 magnitude bits = 0.",
    level: "expert",
    codeExample: "ADC code 0x800 = -0.0V"
  },
  {
    question: "Convert the decimal number -60 to 8-bit Sign-Magnitude and express it in Hexadecimal.",
    shortAnswer: "Binary: `10111100`, Hex: `0xBC`.",
    explanation: "60 in 7 bits is 0111100 (32 + 16 + 8 + 4). Prepending sign bit 1 gives 1011 1100. High nibble 1011 is 'B', low nibble 1100 is 'C' -> 0xBC.",
    hint: "60 = 32 + 16 + 8 + 4 = 0111100_2.",
    level: "expert",
    codeExample: "-60 = 1 0111100 = 1011 1100_2 = 0xBC"
  },
  {
    question: "What happens if a programmer writes `if (a == 0)` in C on a theoretical Sign-Magnitude architecture when `a` contains the bit pattern for -0?",
    shortAnswer: "The language standard requires the equality check to evaluate to TRUE, meaning the compiler must generate code that treats both +0 and -0 as equal to zero.",
    explanation: "Under the ISO C standard, mathematical equality holds for zero regardless of underlying representation. The compiler must emit instructions that mask out the sign bit or test both +0 and -0 patterns.",
    hint: "+0 must equal -0 in standard mathematics.",
    level: "expert",
    codeExample: "int a = -0; if (a == 0) // MUST be true in conforming C/C++"
  },
  {
    question: "How does Sign-Magnitude representation handle sign extension when expanding an 8-bit number to 16-bit?",
    shortAnswer: "The 7 magnitude bits are moved to bits 6..0, bits 14..7 are padded with zeros, and the original sign bit (bit 7) is moved to bit 15.",
    explanation: "In Sign-Magnitude, you cannot simply copy the MSB across all upper bits (like 2's complement). You must place the sign bit at the new MSB (bit 15) and zero-pad between the sign bit and the magnitude.",
    hint: "The sign bit must move to the new MSB position, and zeros pad the magnitude.",
    level: "expert",
    codeExample: "8-bit -25:  10011001 -> [1][0011001]\n16-bit -25: 10000000 00011001 -> [1][000000000011001] (0x8019)"
  },
  {
    question: "Summarize the key architectural characteristics of Sign-Magnitude in one concise reference list.",
    shortAnswer: "1. MSB = Sign (0=+, 1=-); 2. Range = [-(2^(n-1)-1), +(2^(n-1)-1)]; 3. Dual Zeros (+0 & -0); 4. Requires separate add/sub ALUs; 5. Standardized in IEEE-754 floats.",
    explanation: "Sign-magnitude provides intuitive human readability and effortless sign determination for multiplication, but its dual zero and arithmetic complexity make it inferior to 2's complement for general-purpose integer ALUs.",
    hint: "Remember: MSB sign, symmetric range, dual zero, used in floating point.",
    level: "expert",
    codeExample: "Sign-Mag: MSB sign | Symmetric range | Dual Zero (+0/-0) | IEEE-754"
  }
];

export default questions;
