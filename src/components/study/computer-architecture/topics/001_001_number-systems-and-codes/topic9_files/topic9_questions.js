// topic9_questions.js - 30 Comprehensive Questions on Binary Arithmetic with Signed Numbers
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "How is subtraction mathematically performed in 2's complement binary arithmetic?",
    shortAnswer: "Subtraction is performed as addition of the 2's complement of the subtrahend: `A - B = A + (-B) = A + (~B + 1)`.",
    explanation: "Instead of building separate borrow-propagating subtraction circuits, the hardware inverts the subtrahend (B), injects a Carry-In of 1 into the LSB, and adds it to the minuend (A).",
    hint: "A - B is computed as A + 2's_comp(B).",
    level: "basic",
    codeExample: "A - B -> Adder(A, ~B, C_in=1)"
  },
  {
    question: "What is done with the End Carry generated out of the MSB during 2's complement addition?",
    shortAnswer: "The End Carry is simply discarded; it is ignored for the numerical result.",
    explanation: "Because 2's complement is arithmetic modulo 2^n, an end carry represents a factor of 2^n that naturally overflows the register boundary without affecting the valid signed sum.",
    hint: "Unlike 1's complement, you do NOT add it back to the LSB.",
    level: "basic",
    codeExample: "1 00010101 -> Drop MSB carry -> 00010101"
  },
  {
    question: "Perform (+35) + (+15) in 8-bit signed binary arithmetic.",
    shortAnswer: "Result = `00110010` = +50.",
    explanation: "+35 = 00100011. +15 = 00001111. Sum: 00100011 + 00001111 = 00110010 (32 + 16 + 2 = 50). No overflow occurred.",
    hint: "Direct binary addition of two positive numbers.",
    level: "basic",
    codeExample: "  00100011 (+35)\n+ 00001111 (+15)\n= 00110010 (+50)"
  },
  {
    question: "Perform (+35) + (-15) in 8-bit signed binary arithmetic.",
    shortAnswer: "Result = `00010100` = +20 (End carry discarded).",
    explanation: "+35 = 00100011. -15 in 2's comp = 11110001. Sum: 00100011 + 11110001 = 1 00010100. Discarding the end carry yields 00010100 = 16 + 4 = +20.",
    hint: "+35 + (-15) = +20.",
    level: "basic",
    codeExample: "  00100011 (+35)\n+ 11110001 (-15)\n= 1 00010100 -> 00010100 (+20)"
  },
  {
    question: "Perform (+15) + (-35) in 8-bit signed binary arithmetic.",
    shortAnswer: "Result = `11101100` = -20 (No end carry).",
    explanation: "+15 = 00001111. -35 in 2's comp = 11011101. Sum: 00001111 + 11011101 = 11101100. MSB is 1 (negative). Magnitude: Invert (00010011) + 1 = 00010100 = 20 -> Result = -20.",
    hint: "Result is negative; MSB is 1.",
    level: "basic",
    codeExample: "  00001111 (+15)\n+ 11011101 (-35)\n= 11101100 (-20 in 2's comp)"
  },
  {
    question: "Perform (-15) + (-35) in 8-bit signed binary arithmetic.",
    shortAnswer: "Result = `11001110` = -50 (End carry discarded).",
    explanation: "-15 = 11110001. -35 = 11011101. Sum: 11110001 + 11011101 = 1 11001110. Discard end carry. Result = 11001110. Magnitude: Invert (00110001) + 1 = 00110010 = 50 -> Result = -50.",
    hint: "-15 + -35 = -50.",
    level: "basic",
    codeExample: "  11110001 (-15)\n+ 11011101 (-35)\n= 1 11001110 -> 11001110 (-50)"
  },
  {
    question: "What are the four primary hardware status flags in CPU architectures (e.g. x86 EFLAGS, ARM CPSR)?",
    shortAnswer: "Zero Flag (ZF), Sign Flag (SF / N), Carry Flag (CF / C), and Overflow Flag (OF / V).",
    explanation: "These four flags are updated by the ALU on every arithmetic instruction to report properties of the result for subsequent conditional jump / branch instructions.",
    hint: "ZF, SF, CF, OF.",
    level: "basic",
    codeExample: "Status Flags: ZF (Zero), SF (Sign), CF (Carry/Unsigned Overflow), OF (Signed Overflow)"
  },
  {
    question: "When is the Zero Flag (ZF) set to 1 in an ALU?",
    shortAnswer: "When all bits of the arithmetic output are 0 (i.e. result == 0).",
    explanation: "The Zero Flag is implemented in hardware as a wide NOR gate over all output bits of the ALU: `ZF = NOR(Sum_0, Sum_1, ..., Sum_n-1)`.",
    hint: "ZF = 1 if result is zero; ZF = 0 if result is non-zero.",
    level: "basic",
    codeExample: "ZF = (result == 0) ? 1 : 0;"
  },
  {
    question: "When is the Sign Flag (SF / Negative Flag N) set to 1 in an ALU?",
    shortAnswer: "When the Most Significant Bit (MSB) of the result is 1.",
    explanation: "The Sign Flag directly mirrors the MSB of the ALU result: `SF = Sum[n-1]`. If MSB=1, the result is negative in 2's complement.",
    hint: "SF is literally a wire connected to the MSB output.",
    level: "basic",
    codeExample: "SF = Sum[n-1];"
  },
  {
    question: "When is the Carry Flag (CF) set to 1 during addition and subtraction?",
    shortAnswer: "During addition, when a carry is generated out of the MSB; during subtraction, when a borrow is required (in x86, CF=1 indicates borrow).",
    explanation: "The Carry Flag tracks unsigned arithmetic overflow. If an unsigned addition exceeds 2^n - 1, CF=1.",
    hint: "CF indicates carry-out of the MSB.",
    level: "moderate",
    codeExample: "CF = carry_out_msb;"
  },
  {
    question: "When is the Overflow Flag (OF / V) set to 1?",
    shortAnswer: "When signed arithmetic produces a result outside the representable range [-2^(n-1) to +2^(n-1) - 1].",
    explanation: "Signed overflow occurs when adding two numbers of the same sign produces a result of the opposite sign, or equivalently, when `C_in(MSB) != C_out(MSB)` (`OF = C_n ^ C_(n-1)`).",
    hint: "OF detects signed range violations.",
    level: "moderate",
    codeExample: "OF = c_in_msb ^ c_out_msb;"
  },
  {
    question: "Compute (+80) + (+60) in an 8-bit signed ALU and report all four status flags (ZF, SF, CF, OF).",
    shortAnswer: "Sum = `10001100` (-116); Flags: ZF=0, SF=1, CF=0, OF=1 (Signed Overflow).",
    explanation: "+80 = 01010000, +60 = 00111100. Sum: 01010000 + 00111100 = 10001100. Since 140 > 127, it wrapped to -116. Flags: ZF=0 (non-zero), SF=1 (MSB=1), CF=0 (no MSB carry), OF=1 (signed overflow).",
    hint: "140 exceeds +127.",
    level: "moderate",
    codeExample: "80 + 60 = 140 -> In 8-bit: 10001100 (-116) -> OF=1, SF=1, ZF=0, CF=0"
  },
  {
    question: "Compute (+80) - (+80) in an 8-bit signed ALU and report all four status flags.",
    shortAnswer: "Sum = `00000000` (0); Flags: ZF=1, SF=0, CF=1 (in addition sense: carry=1), OF=0.",
    explanation: "+80 = 01010000. -80 in 2's comp = 10110000. Sum: 01010000 + 10110000 = 1 00000000. Result is 00000000. ZF=1 (zero), SF=0 (MSB=0), CF=1 (carry generated), OF=0 (no signed overflow).",
    hint: "80 - 80 = 0.",
    level: "moderate",
    codeExample: "80 + (-80) = 0 -> ZF=1, SF=0, OF=0, CF=1"
  },
  {
    question: "What is Multi-Precision Arithmetic and how is it implemented on microprocessors?",
    shortAnswer: "Performing arithmetic on numbers larger than native register width (e.g. 64-bit math on 32-bit CPU) using chained `ADD` and `ADC` (Add with Carry) instructions.",
    explanation: "To add two 64-bit numbers on a 32-bit CPU, the CPU first adds the lower 32 bits with `ADD`, setting the Carry Flag. It then adds the upper 32 bits with `ADC`, adding operand A, operand B, and the Carry Flag from the first step.",
    hint: "ADD lower words, then ADC upper words.",
    level: "moderate",
    codeExample: "ADD EAX, EBX    ; Add low 32 bits\nADC EDX, ECX    ; Add high 32 bits + carry"
  },
  {
    question: "What instruction is used for multi-precision subtraction on x86 and ARM processors?",
    shortAnswer: "`SBB` (Subtract with Borrow) on x86; `SBC` (Subtract with Carry) on ARM.",
    explanation: "Just as `ADC` adds the carry bit, `SBB` subtracts the borrow (Carry Flag) from the higher-order word during multi-word subtraction operations.",
    hint: "SBB = Subtract with Borrow.",
    level: "moderate",
    codeExample: "SUB EAX, EBX    ; Subtract low 32 bits\nSBB EDX, ECX    ; Subtract high 32 bits - borrow"
  },
  {
    question: "What is the result of adding (-1) and (+1) in an n-bit 2's complement register?",
    shortAnswer: "All zeros (`0000...00` = 0) with an end carry of 1 (discarded).",
    explanation: "-1 is all 1s (1111...11) and +1 is 0000...01. Adding them gives 1 0000...00. Discarding the end carry leaves 0.",
    hint: "11111111 + 00000001 = 1 00000000 -> 00000000.",
    level: "moderate",
    codeExample: "0xFF + 0x01 = 0x00 (Carry discarded)"
  },
  {
    question: "In an 8-bit ALU, calculate (-128) + (-1). What result and flags are generated?",
    shortAnswer: "Sum = `01111111` (+127); Flags: ZF=0, SF=0, CF=1, OF=1 (Underflow).",
    explanation: "-128 = 10000000, -1 = 11111111. Sum: 10000000 + 11111111 = 1 01111111. Result is 01111111 (+127). Two negative numbers produced a positive result, asserting the Overflow Flag (OF=1).",
    hint: "-129 is below -128, causing an underflow wraparound to +127.",
    level: "expert",
    codeExample: "  10000000 (-128)\n+ 11111111 (-1)\n= 1 01111111 (+127 in 2's comp, OF=1)"
  },
  {
    question: "Why does the comparison instruction `CMP A, B` in assembly language perform subtraction without saving the result?",
    shortAnswer: "`CMP` computes `A - B` solely to update the CPU status flags (ZF, SF, CF, OF) for conditional branching, discarding the arithmetic difference.",
    explanation: "If A == B, ZF is set. If A < B (unsigned), CF is set. If A < B (signed), `SF != OF`. The operands A and B remain unmodified.",
    hint: "CMP is non-destructive subtraction.",
    level: "expert",
    codeExample: "CMP EAX, 10 ; Computes EAX - 10, sets flags, keeps EAX unchanged\nJE is_equal ; Jump if ZF=1"
  },
  {
    question: "How does the CPU evaluate the condition 'Less Than' (A < B) for signed numbers using status flags?",
    shortAnswer: "The signed condition 'Less Than' is true if and only if `SF != OF` (`SF XOR OF == 1`).",
    explanation: "If no overflow occurred (OF=0), A < B means A - B is negative (SF=1). If signed overflow occurred (OF=1), the sign was inverted, so A < B means SF=0. Therefore, `SF != OF` accurately evaluates signed less-than under all circumstances.",
    hint: "SF XOR OF handles both regular negative results and overflow-inverted results.",
    level: "expert",
    codeExample: "JL target ; Jumps if (SF ^ OF) == 1"
  },
  {
    question: "How does the CPU evaluate the condition 'Below' (A < B) for unsigned numbers using status flags?",
    shortAnswer: "The unsigned condition 'Below' is true if and only if the Carry Flag is set (`CF == 1`).",
    explanation: "In unsigned arithmetic, subtracting a larger number from a smaller number requires a borrow from beyond the MSB, which sets the Carry Flag (`CF = 1`).",
    hint: "JB (Jump if Below) tests CF=1.",
    level: "expert",
    codeExample: "JB target ; Jumps if CF == 1 (Unsigned A < B)"
  },
  {
    question: "In 2's complement hardware, why does adding a positive number to a negative number NEVER set the Overflow Flag (OF=0 always)?",
    shortAnswer: "Because the sum of a positive and a negative number is always strictly bounded between the two operands, making it mathematically impossible to exceed the range.",
    explanation: "Let -2^(n-1) <= -B < 0 and 0 <= A <= 2^(n-1)-1. The sum A + (-B) satisfies -B <= A - B <= A, which is guaranteed to remain within the representable interval [-2^(n-1), 2^(n-1)-1].",
    hint: "Summing opposite signs always reduces the magnitude.",
    level: "expert",
    codeExample: "Opposite signs -> OF is always 0."
  },
  {
    question: "What is Carry-Lookahead Addition (CLA) and why is it used instead of Ripple-Carry Addition in high-speed ALUs?",
    shortAnswer: "CLA computes carry signals in parallel across all bit positions using Generate ($G_i = A_i B_i$) and Propagate ($P_i = A_i \oplus B_i$) logic, reducing addition latency from $O(n)$ to $O(\log n)$.",
    explanation: "Ripple-carry adders must wait for carry bits to sequentially ripple through all n stages. CLA calculates carries concurrently using Boolean expansion formulas, dramatically boosting ALU clock speeds.",
    hint: "CLA computes all carries simultaneously.",
    level: "expert",
    codeExample: "G_i = A_i & B_i; P_i = A_i ^ B_i; C_{i+1} = G_i | (P_i & C_i)"
  },
  {
    question: "Perform (+120) - (-10) in an 8-bit signed ALU. What occurs?",
    shortAnswer: "120 - (-10) = 120 + 10 = 130 > 127, causing a Signed Overflow (OF=1); result wraps to `10000010` (-126).",
    explanation: "+120 = 01111000. -(-10) = +10 = 00001010. Sum: 01111000 + 00001010 = 10000010. Result is negative (-126), asserting OF=1.",
    hint: "130 exceeds +127.",
    level: "expert",
    codeExample: "120 - (-10) = 130 -> 10000010 (-126, OF=1)"
  },
  {
    question: "Perform (-120) - (+10) in an 8-bit signed ALU. What occurs?",
    shortAnswer: "-120 - 10 = -130 < -128, causing a Signed Underflow (OF=1); result wraps to `01111110` (+126).",
    explanation: "-120 = 10001000. -10 in 2's comp = 11110110. Sum: 10001000 + 11110110 = 1 01111110. Result is positive (+126), asserting OF=1.",
    hint: "-130 is below -128.",
    level: "expert",
    codeExample: "-120 + (-10) = -130 -> 01111110 (+126, OF=1)"
  },
  {
    question: "What is BCD Arithmetic and why does adding two BCD numbers require a conditional +6 correction?",
    shortAnswer: "Because a 4-bit binary adder sums modulo 16, whereas decimal digits sum modulo 10; adding 6 (0110) skips the 6 illegal states (1010 to 1111) and generates a decimal carry.",
    explanation: "If a 4-bit BCD sum exceeds 9 (or generates a half-carry $AF=1$), the result is adjusted by adding binary `0110` (+6) using the x86 `DAA` (Decimal Adjust AL) instruction.",
    hint: "16 - 10 = 6 illegal states per BCD digit.",
    level: "expert",
    codeExample: "ADD AL, BL\nDAA ; Decimal Adjust for BCD addition (+6 if > 9)"
  },
  {
    question: "How does 64-bit integer arithmetic perform on a 64-bit x86-64 processor in terms of instruction cycles?",
    shortAnswer: "Single-cycle execution using 64-bit general-purpose registers (RAX, RBX, RCX, RDX) via 64-bit `ADD` and `SUB` instructions.",
    explanation: "64-bit ALUs contain full 64-bit carry-lookahead adders capable of adding two 64-bit 2's complement integers in a single clock cycle (sub-nanosecond).",
    hint: "Native 64-bit ALUs execute in 1 cycle.",
    level: "expert",
    codeExample: "ADD RAX, RBX ; Single-cycle 64-bit signed addition"
  },
  {
    question: "What is Saturating Arithmetic and where is it used instead of 2's complement modular wraparound?",
    shortAnswer: "Arithmetic where results exceeding the range clamp to the maximum or minimum limit instead of wrapping around; used in DSP, audio, and GPU graphics SIMD instructions.",
    explanation: "In audio processing, wrapping from +127 to -128 produces deafening static clicks. Saturating arithmetic clamps +120 + +50 to +127 (maximum volume), preserving audio waveform integrity.",
    hint: "Clamping to MAX/MIN instead of wrapping.",
    level: "expert",
    codeExample: "ARM QADD / x86 PADDSB (Saturating SIMD Addition)"
  },
  {
    question: "Calculate the 8-bit 2's complement result of `0x7E + 0x01`.",
    shortAnswer: "`0x7F` = +127 (Maximum 8-bit signed positive integer).",
    explanation: "0x7E (126) + 0x01 (1) = 0x7F (127). ZF=0, SF=0, CF=0, OF=0.",
    hint: "126 + 1 = 127.",
    level: "expert",
    codeExample: "0x7E + 0x01 = 0x7F (+127)"
  },
  {
    question: "Calculate the 8-bit 2's complement result of `0x7F + 0x01`.",
    shortAnswer: "`0x80` = -128 (Signed Overflow, OF=1, SF=1).",
    explanation: "0x7F (+127) + 0x01 (+1) = 0x80 (-128). Adding 1 to the maximum positive number wraps to the most negative number, setting OF=1.",
    hint: "127 + 1 wraps to -128.",
    level: "expert",
    codeExample: "0x7F + 0x01 = 0x80 (-128, OF=1)"
  },
  {
    question: "Summarize the universal algorithm for 2's complement binary arithmetic in hardware.",
    shortAnswer: "1. For A - B, invert B and set C_in=1; 2. Add full binary bits; 3. Discard end carry; 4. Update ZF, SF, CF, and OF = C_in(MSB) ^ C_out(MSB).",
    explanation: "This elegant unified algorithm drives every integer CPU ALU on Earth with zero special cases.",
    hint: "Unified adder, discarded carry, XOR overflow detection.",
    level: "expert",
    codeExample: "Unified ALU: Sum = A + (B ^ M) + M | OF = C_in(MSB) ^ C_out(MSB)"
  }
];

export default questions;
