// topic7_questions.js - 30 Comprehensive Questions on 2's Complement Representation
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is 2's Complement representation and why is it the universal standard for modern computer hardware?",
    shortAnswer: "2's Complement represents signed numbers by inverting bits and adding 1; it is standard because it has a single unique zero and allows subtraction using regular adder circuits.",
    explanation: "2's complement eliminates the dual-zero (+0/-0) anomaly and allows the exact same binary adder hardware to perform both addition and subtraction (A - B = A + NOT(B) + 1) while discarding the end carry.",
    hint: "Think about unified adder hardware and a single representation of zero.",
    level: "basic",
    codeExample: "+5 = 00000101 -> 1's Comp = 11111010 -> +1 -> 2's Comp (-5) = 11111011"
  },
  {
    question: "What is the formula for the dynamic range of an n-bit 2's Complement number system?",
    shortAnswer: "[-2^(n-1) to +2^(n-1) - 1].",
    explanation: "The negative range spans from -2^(n-1) to -1 (2^(n-1) values), and the non-negative range spans from 0 to +2^(n-1) - 1 (2^(n-1) values). There are 2^n total distinct values.",
    hint: "For 8 bits: -2^7 to +2^7 - 1 = -128 to +127.",
    level: "basic",
    codeExample: "8-bit: [-128, +127]\n16-bit: [-32768, +32767]\n32-bit: [-2147483648, +2147483647]"
  },
  {
    question: "How do you calculate the 2's complement of a binary number using the fast Right-to-Left shortcut?",
    shortAnswer: "Moving from LSB to MSB, keep all bits unchanged up to and including the first '1', then invert all remaining bits to the left.",
    explanation: "For example, for 00110100: the trailing bits up to the first '1' are '100' (keep them as 100). The remaining bits to the left are '00110' (invert them to 11001). Result: 11001100.",
    hint: "Copy trailing zeros and the first '1', then flip everything to the left.",
    level: "basic",
    codeExample: "00110100 (+52) -> Copy '100', Flip '00110' to '11001' -> 11001100 (-52)"
  },
  {
    question: "Convert decimal -45 into 8-bit 2's Complement binary.",
    shortAnswer: "`11010011` (0xD3).",
    explanation: "+45 = 00101101. 1's complement = 11010010. Add 1 = 11010011. Verification: -128 + 64 + 16 + 2 + 1 = -128 + 83 = -45.",
    hint: "+45 = 00101101. Invert and add 1.",
    level: "basic",
    codeExample: "+45: 00101101\n1's: 11010010\n+1 : 11010011 (-45 in 2's complement)"
  },
  {
    question: "Decode the 8-bit 2's Complement binary number `11110000` into decimal.",
    shortAnswer: "-16.",
    explanation: "MSB is 1, so it is negative. Invert bits: 00001111. Add 1: 00010000 = 16. Therefore, the value is -16. Alternatively, by positional weights: -128 + 64 + 32 + 16 = -16.",
    hint: "-128 + 64 + 32 + 16 = -16.",
    level: "basic",
    codeExample: "11110000 -> Invert: 00001111 -> +1: 00010000 = 16 -> -16"
  },
  {
    question: "Why is zero uniquely represented in 2's Complement?",
    shortAnswer: "Because inverting +0 (00000000) gives 11111111, and adding 1 produces `1 00000000` where the 9th bit carry is discarded, returning 00000000.",
    explanation: "In 2's complement, +0 and -0 produce the identical binary pattern 00000000. This eliminates the duplicate zero bug and simplifies zero detection circuits to a single multi-input NOR gate.",
    hint: "11111111 + 1 = 00000000 (discarding carry).",
    level: "basic",
    codeExample: "00000000 -> ~0 = 11111111 -> +1 = (1) 00000000 -> 00000000"
  },
  {
    question: "What is the Most Negative Number in an 8-bit 2's complement system and what is special about it?",
    shortAnswer: "-128 (`10000000`); it has no positive counterpart (+128) in 8 bits.",
    explanation: "In 8-bit 2's complement, the range is [-128 to +127]. Negating -128 in 8 bits results in an overflow because +128 requires 9 bits. Inverting 10000000 gives 01111111, and adding 1 gives 10000000 (-128 again!).",
    hint: "-(-128) cannot be represented in an 8-bit signed container.",
    level: "moderate",
    codeExample: "int8_t x = -128; x = -x; // Overflows! Still evaluates to -128!"
  },
  {
    question: "Perform (+48) - (+18) using 8-bit 2's complement addition.",
    shortAnswer: "Result = `00011110` = +30.",
    explanation: "+48 = 00110000. +18 = 00010010 -> -18 in 2's comp = 11101110. Add: 00110000 + 11101110 = 1 00011110. Discarding the end carry yields 00011110 = 16 + 8 + 4 + 2 = +30. Correct!",
    hint: "Add +48 and -18, then discard the end carry.",
    level: "moderate",
    codeExample: "  00110000 (+48)\n+ 11101110 (-18)\n= 1 00011110 (Discard carry -> 00011110 = +30)"
  },
  {
    question: "Perform (+18) - (+48) using 8-bit 2's complement addition.",
    shortAnswer: "Result = `11100010` = -30.",
    explanation: "+18 = 00010010. -48 in 2's comp = 11010000. Add: 00010010 + 11010000 = 11100010. No carry is generated. To verify magnitude: Invert (00011101) + 1 = 00011110 = 30 -> Result = -30.",
    hint: "No carry generated; result is negative in 2's complement.",
    level: "moderate",
    codeExample: "  00010010 (+18)\n+ 11010000 (-48)\n= 11100010 (Decodes to -30)"
  },
  {
    question: "How does a unified Adder/Subtractor circuit switch between Addition and Subtraction using XOR gates and Carry-In?",
    shortAnswer: "Setting Mode bit M=0 passes B unchanged with C_in=0 (A + B); setting M=1 inverts B via XOR (B ^ 1 = NOT B) and injects C_in=1 (A + NOT B + 1 = A - B).",
    explanation: "XOR acts as a programmable inverter: `x XOR 0 = x` and `x XOR 1 = NOT x`. By connecting the Mode signal M to both the XOR gates and the adder's Carry-In, M=0 performs A + B, and M=1 performs 2's complement subtraction A - B.",
    hint: "XOR inverts bits when control is 1; Carry-In adds the required +1.",
    level: "moderate",
    codeExample: "Subtractor: Sum = A + (B ^ M) + M (where M=1)"
  },
  {
    question: "What is the decimal value of `11111111` in an 8-bit 2's complement system?",
    shortAnswer: "-1.",
    explanation: "By positional weights: -128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = -128 + 127 = -1. In any n-bit 2's complement system, a register filled with all 1s always represents -1.",
    hint: "All 1s is always -1 in 2's complement.",
    level: "moderate",
    codeExample: "0xFF = -1 (in 8-bit signed int8_t)"
  },
  {
    question: "What is the decimal value of `10000001` in an 8-bit 2's complement system?",
    shortAnswer: "-127.",
    explanation: "-128 + 1 = -127. Alternatively: Invert 10000001 -> 01111110 -> +1 = 01111111 = 127 -> -127.",
    hint: "MSB is -128 and LSB is +1.",
    level: "moderate",
    codeExample: "10000001_2 = -128 + 1 = -127"
  },
  {
    question: "Why is the End Carry discarded in 2's Complement addition, unlike 1's Complement?",
    shortAnswer: "Because 2's complement operates naturally modulo 2^n; an end carry represents an overflow of exactly 2^n, which is discarded by the n-bit register boundary.",
    explanation: "Mathematically, adding numbers mod 2^n naturally wraps around. The carry out of bit n-1 represents 2^n, which naturally falls off the register width, leaving the exact modular sum without requiring any feedback additions.",
    hint: "Arithmetic modulo 2^n naturally ignores multiples of 2^n.",
    level: "moderate",
    codeExample: "Result = (A + B) mod 2^n"
  },
  {
    question: "What is the 16-bit 2's complement representation of decimal -1?",
    shortAnswer: "`11111111 11111111` or `0xFFFF`.",
    explanation: "+1 = 0x0001. 1's comp = 0xFFFE. Add 1 = 0xFFFF. In any bit width, -1 is all 1s.",
    hint: "All 16 bits are 1.",
    level: "moderate",
    codeExample: "-1 in 16-bit 2's comp = 0xFFFF"
  },
  {
    question: "What is the 32-bit 2's complement representation of decimal -1?",
    shortAnswer: "`0xFFFFFFFF`.",
    explanation: "In 32-bit, all 32 bits are 1s, which equals 0xFFFFFFFF in hexadecimal.",
    hint: "8 hexadecimal 'F' characters.",
    level: "moderate",
    codeExample: "-1 in 32-bit 2's comp = 0xFFFFFFFF"
  },
  {
    question: "What happens when you negate the C constant `INT_MIN` (e.g. `-2147483648`) in a 32-bit program?",
    shortAnswer: "It causes signed integer overflow, resulting in Undefined Behavior (UB) in C/C++; on typical x86 CPUs, it silently wraps back to `INT_MIN`.",
    explanation: "Because 32-bit signed range is [-2147483648 to +2147483647], +2147483648 cannot be represented. The hardware produces `0x80000000` (-2147483648) and sets the Overflow Flag (OF=1).",
    hint: "The maximum positive 32-bit signed integer is +2147483647.",
    level: "expert",
    codeExample: "int x = -2147483648; x = -x; // Undefined Behavior! Still -2147483648"
  },
  {
    question: "How does 2's complement handle Sign Extension when widening an integer (e.g., `int8_t` to `int32_t`)?",
    shortAnswer: "The MSB (sign bit) is replicated into all higher-order bits.",
    explanation: "If the 8-bit value is negative (MSB=1), all upper 24 bits are filled with 1s (e.g., -5: 0xFB -> 0xFFFFFFFB). If positive (MSB=0), upper bits are filled with 0s. This preserves the exact negative 2's complement value.",
    hint: "Replicating 1s in higher positions preserves the negative mathematical value.",
    level: "expert",
    codeExample: "int8_t a = -5; // 11111011\nint32_t b = a;  // 11111111 11111111 11111111 11111011 (0xFFFFFFFB)"
  },
  {
    question: "Why does replicating the sign bit preserve the value of a negative 2's complement number?",
    shortAnswer: "Because extending from n bits to n+1 bits replaces a weight of -2^(n-1) with -2^n + 2^(n-1) = -2^(n-1), keeping the net numerical value unchanged.",
    explanation: "Mathematically, adding a 1 at bit position n with negative weight -2^n and a 1 at bit position n-1 with positive weight +2^(n-1) sums to -2^(n-1). Thus, infinite sign extension preserves identical numerical weight.",
    hint: "-2^n + 2^(n-1) = -2^(n-1).",
    level: "expert",
    codeExample: "-8 (1000 in 4-bit) -> 11000 in 5-bit = -16 + 8 = -8"
  },
  {
    question: "What is the 2's complement of decimal 0?",
    shortAnswer: "0 (`00000000`).",
    explanation: "+0 = 00000000. Invert bits = 11111111. Add 1 = 1 00000000. Discarding the 9th bit yields 00000000.",
    hint: "The 2's complement of 0 is 0.",
    level: "expert",
    codeExample: "2s_Comp(0) = ~0 + 1 = 0xFF + 1 = 0x00 (Carry discarded)"
  },
  {
    question: "How do you detect overflow in 2's complement addition using Carry-In and Carry-Out of the MSB?",
    shortAnswer: "Overflow occurs if and only if Carry-In to the MSB is NOT equal to Carry-Out from the MSB (`V = C_in XOR C_out`).",
    explanation: "In hardware, if a carry enters the MSB full adder but does not exit (or exits without entering), the sign bit was corrupted by arithmetic magnitude overflow. The Overflow Flag is computed via a single XOR gate: `OF = C_n ^ C_(n-1)`.",
    hint: "XOR of C_in(MSB) and C_out(MSB).",
    level: "expert",
    codeExample: "wire OF = c_in_msb ^ c_out_msb; // 1-gate overflow detector"
  },
  {
    question: "Explain why (+100) + (+50) causes an overflow in 8-bit 2's complement.",
    shortAnswer: "100 (01100100) + 50 (00110010) = 10010110 (-106), which is negative because 150 exceeds the maximum limit of +127.",
    explanation: "Adding two positive numbers produced an MSB of 1 (negative result). In an 8-bit signed container, 150 wraps into the negative range (-106), asserting the Overflow Flag (OF=1).",
    hint: "Positive + Positive = Negative indicates Overflow.",
    level: "expert",
    codeExample: "  01100100 (+100)\n+ 00110010 (+50)\n= 10010110 (-106 in 2's comp, OF=1)"
  },
  {
    question: "Explain why (-100) + (-50) causes an overflow in 8-bit 2's complement.",
    shortAnswer: "-100 (10011100) + -50 (11001110) = 1 01101010 (+106), which is positive because -150 is below the minimum limit of -128.",
    explanation: "Adding two negative numbers produced an MSB of 0 (positive result). -150 falls below -128, wrapping into the positive domain (+106), asserting OF=1.",
    hint: "Negative + Negative = Positive indicates Overflow.",
    level: "expert",
    codeExample: "  10011100 (-100)\n+ 11001110 (-50)\n= 1 01101010 (+106 in 2's comp, OF=1)"
  },
  {
    question: "Can adding a positive number and a negative number ever cause an overflow in 2's complement?",
    shortAnswer: "No, adding numbers of opposite signs can NEVER cause an overflow.",
    explanation: "When signs differ, the result is strictly bounded between the two operands (i.e. strictly smaller in magnitude than the larger operand), making it mathematically impossible to exceed the representable range.",
    hint: "Opposite signs always reduce magnitude.",
    level: "expert",
    codeExample: "Positive + Negative -> Overflow is Mathematically Impossible"
  },
  {
    question: "Convert decimal -128 to 8-bit 2's complement, 16-bit 2's complement, and 32-bit 2's complement.",
    shortAnswer: "8-bit: `0x80`, 16-bit: `0xFF80`, 32-bit: `0xFFFFFF80`.",
    explanation: "8-bit: 10000000 (0x80). Sign extension to 16 bits copies the MSB '1' into upper bits: 11111111 10000000 (0xFF80). In 32 bits: 0xFFFFFF80.",
    hint: "Sign extension pads with 1s for negative numbers.",
    level: "expert",
    codeExample: "-128 in 8-bit:  0x80\n-128 in 16-bit: 0xFF80\n-128 in 32-bit: 0xFFFFFF80"
  },
  {
    question: "In x86 assembly, what does the `NEG` instruction do to a register?",
    shortAnswer: "It performs 2's complement negation: `Register = 0 - Register` (inverts all bits and adds 1).",
    explanation: "The `NEG` instruction computes the two's complement of the operand in place. It sets the Carry Flag (CF=1) for all non-zero inputs and sets the Overflow Flag (OF=1) if negating the minimum value (e.g. -128 or -2147483648).",
    hint: "NEG subtracts the operand from 0.",
    level: "expert",
    codeExample: "MOV AL, 5\nNEG AL  ; AL becomes -5 (0xFB)"
  },
  {
    question: "In C/C++, why does bitwise shift right on a signed negative integer (`int x = -16; x >>= 2;`) perform arithmetic shift rather than logical shift on most compilers?",
    shortAnswer: "To preserve the negative sign by shifting in 1s from the MSB, correctly dividing the negative integer by 4 (-16 >> 2 = -4).",
    explanation: "An arithmetic shift right (SAR) shifts in copies of the sign bit. If logical shift right (SHR) were used on -16 (0xFFFFFFF0), zeros would shift into the MSB, converting the negative number into an enormous positive number (+1,073,741,820).",
    hint: "Arithmetic shift right replicates the sign bit.",
    level: "expert",
    codeExample: "-16 (11110000) >> 2 = 11111100 (-4)"
  },
  {
    question: "How is 2's complement multiplication performed in modern high-performance ALUs?",
    shortAnswer: "Using Booth's Multiplication Algorithm or Baugh-Wooley 2's Complement Array Multipliers.",
    explanation: "Standard shift-and-add multipliers only work on unsigned numbers. Booth's algorithm and Baugh-Wooley multipliers directly handle 2's complement negative multiplicands and multipliers by treating the MSB with negative weight without requiring preliminary sign-conversion steps.",
    hint: "Booth's algorithm recodes multiplier bits to handle negative numbers directly.",
    level: "expert",
    codeExample: "Booth's Algorithm: Recodes pairs of bits (y_i - y_{i-1})"
  },
  {
    question: "What is the 2's complement representation of decimal +127 and -127 in 8 bits?",
    shortAnswer: "+127 = `01111111` (0x7F), -127 = `10000001` (0x81).",
    explanation: "+127 is 01111111. To get -127, invert to 10000000 and add 1 to get 10000001 (0x81).",
    hint: "0x7F and 0x81.",
    level: "expert",
    codeExample: "+127 = 01111111 (0x7F)\n-127 = 10000001 (0x81)"
  },
  {
    question: "What is the 8-bit 2's complement representation of decimal -2?",
    shortAnswer: "`11111110` (0xFE).",
    explanation: "+2 = 00000010. 1's comp = 11111101. Add 1 = 11111110 (0xFE). -128 + 126 = -2.",
    hint: "-1 is 0xFF, so -2 is 0xFE.",
    level: "expert",
    codeExample: "-2 = 11111110_2 = 0xFE"
  },
  {
    question: "Summarize why 2's complement achieved total dominance across the semiconductor industry.",
    shortAnswer: "1. Unique zero; 2. Subtraction uses addition hardware; 3. End carry is discarded without latency; 4. Full modular arithmetic consistency; 5. Optimal transistor density.",
    explanation: "2's complement maximizes silicon efficiency by unifying addition and subtraction in a single ALU datapath while providing a seamless, unambiguous number ring for compilers and operating systems.",
    hint: "Unique zero, shared adder/subtractor, discarded carry, maximum ALU speed.",
    level: "expert",
    codeExample: "2's Comp = Single Zero + Unified ALU + Max Clock Frequency"
  }
];

export default questions;
