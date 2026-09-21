// topic10_questions.js - 30 Comprehensive Questions on Overflow Detection in Signed Arithmetic
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is Arithmetic Overflow in digital hardware?",
    shortAnswer: "An event where the mathematical result of an arithmetic operation exceeds the finite capacity of the destination register.",
    explanation: "When two n-bit numbers are added or subtracted, the mathematical result may require n+1 bits. If the result exceeds the maximum or minimum representable limit of the n-bit register, an overflow occurs and the value wraps around.",
    hint: "The result is too large or too small to fit in the register.",
    level: "basic",
    codeExample: "In 8-bit signed: +100 + +50 = +150 > +127 -> Overflow!"
  },
  {
    question: "What is the fundamental difference between the Carry Flag (CF) and the Overflow Flag (OF / V)?",
    shortAnswer: "The Carry Flag (CF) detects unsigned arithmetic overflow; the Overflow Flag (OF) detects signed 2's complement arithmetic overflow.",
    explanation: "CF tracks whether an addition generated a carry out of the MSB (exceeding 2^n - 1 for unsigned numbers). OF tracks whether the sign bit was corrupted by magnitude bits spilling over (exceeding [-2^(n-1), +2^(n-1)-1] for signed numbers).",
    hint: "CF = Unsigned overflow; OF = Signed overflow.",
    level: "basic",
    codeExample: "CF = Carry_Out_MSB;\nOF = Carry_In_MSB ^ Carry_Out_MSB;"
  },
  {
    question: "What is the Algebraic Sign Rule for detecting overflow in 2's complement addition?",
    shortAnswer: "Overflow occurs if and only if adding two numbers of the same sign produces a result of the opposite sign.",
    explanation: "1. Positive + Positive = Negative -> Overflow (OF=1).\n2. Negative + Negative = Positive -> Overflow (OF=1).\n3. Adding numbers of opposite signs can NEVER overflow (OF=0).",
    hint: "Check if the sign of the result contradicts the signs of both inputs.",
    level: "basic",
    codeExample: "(+A) + (+B) = (-Result) -> Overflow!\n(-A) + (-B) = (+Result) -> Overflow!"
  },
  {
    question: "What is the Hardware Carry-XOR Rule for detecting overflow in an ALU?",
    shortAnswer: "Overflow occurs if and only if the Carry-In to the MSB is not equal to the Carry-Out from the MSB: `V = C_n XOR C_(n-1)`.",
    explanation: "In an n-bit adder, C_n is the carry out of the MSB (bit n-1), and C_(n-1) is the carry into the MSB. An overflow occurs if a carry enters the sign bit without leaving (C_(n-1)=1, C_n=0) or leaves without entering (C_(n-1)=0, C_n=1). A single 2-input XOR gate detects this.",
    hint: "XOR of Carry-In to MSB and Carry-Out from MSB.",
    level: "basic",
    codeExample: "wire OF = carry_in_msb ^ carry_out_msb;"
  },
  {
    question: "Why can adding a positive number and a negative number never cause an arithmetic overflow?",
    shortAnswer: "Because the sum is strictly bounded between the two operands and has a smaller magnitude than the larger operand.",
    explanation: "If A > 0 and B < 0, then A + B lies strictly between -|B| and +A. Since both A and B fit within the n-bit range, their difference is guaranteed to fit within the range.",
    hint: "Adding opposite signs decreases the overall magnitude.",
    level: "basic",
    codeExample: "Positive + Negative: Range is [-|B|, +A] -> Mathematically Impossible to Overflow"
  },
  {
    question: "In an 8-bit signed system, calculate (+70) + (+60). Does an overflow occur?",
    shortAnswer: "Sum = `10000010` (-126); Yes, Overflow occurs (OF=1) because +130 > +127.",
    explanation: "+70 = 01000110, +60 = 00111100. Sum: 01000110 + 00111100 = 10000010. The result has MSB=1 (negative), but both inputs were positive. The actual sum +130 exceeds the 8-bit maximum of +127.",
    hint: "70 + 60 = 130 > 127.",
    level: "moderate",
    codeExample: "  01000110 (+70)\n+ 00111100 (+60)\n= 10000010 (-126, OF=1)"
  },
  {
    question: "In an 8-bit signed system, calculate (-70) + (-60). Does an overflow occur?",
    shortAnswer: "Sum = `01111110` (+126); Yes, Overflow occurs (OF=1) because -130 < -128.",
    explanation: "-70 = 10111010, -60 = 11000100. Sum: 10111010 + 11000100 = 1 01111110. The result has MSB=0 (positive), but both inputs were negative. -130 falls below -128, causing an underflow wraparound.",
    hint: "-70 + -60 = -130 < -128.",
    level: "moderate",
    codeExample: "  10111010 (-70)\n+ 11000100 (-60)\n= 1 01111110 (+126, OF=1)"
  },
  {
    question: "How does overflow occur during signed subtraction (A - B)?",
    shortAnswer: "When subtracting a negative number from a positive number yields a negative result, or subtracting a positive number from a negative number yields a positive result.",
    explanation: "Subtraction A - B is equivalent to A + (-B). Thus, (+A) - (-B) is (+A) + (+B), which can overflow positively. (-A) - (+B) is (-A) + (-B), which can overflow negatively.",
    hint: "Subtracting a negative is adding a positive.",
    level: "moderate",
    codeExample: "(+A) - (-B) -> (+A) + (+B) (Can overflow positive)\n(-A) - (+B) -> (-A) + (-B) (Can overflow negative)"
  },
  {
    question: "Calculate (+127) - (-1) in an 8-bit signed ALU.",
    shortAnswer: "127 - (-1) = 127 + 1 = 128 > 127; Result wraps to `10000000` (-128) with OF=1.",
    explanation: "+127 = 01111111. -(-1) = +1 = 00000001. Sum: 01111111 + 00000001 = 10000000 (-128). Positive minus negative gave a negative result, asserting OF=1.",
    hint: "127 + 1 = 128, which exceeds the signed limit +127.",
    level: "moderate",
    codeExample: "127 - (-1) = 128 -> 10000000 (-128, OF=1)"
  },
  {
    question: "Calculate (-128) - (+1) in an 8-bit signed ALU.",
    shortAnswer: "-128 - 1 = -129 < -128; Result wraps to `01111111` (+127) with OF=1.",
    explanation: "-128 = 10000000. -(+1) = 11111111. Sum: 10000000 + 11111111 = 1 01111111. Result is positive (+127), asserting OF=1.",
    hint: "-128 - 1 = -129, which falls below -128.",
    level: "moderate",
    codeExample: "-128 - 1 = -129 -> 01111111 (+127, OF=1)"
  },
  {
    question: "What x86 assembly instructions test the Overflow Flag for conditional execution?",
    shortAnswer: "`JO` (Jump if Overflow, when OF=1) and `JNO` (Jump if Not Overflow, when OF=0).",
    explanation: "After an arithmetic instruction (`ADD`, `SUB`, `IMUL`), the code can execute `JO handle_error` to branch to an exception or saturation routine if overflow occurred.",
    hint: "JO = Jump if Overflow.",
    level: "moderate",
    codeExample: "ADD EAX, EBX\nJO overflow_handler ; Jump if OF == 1"
  },
  {
    question: "What ARM assembly instructions test the Overflow Flag?",
    shortAnswer: "`BVS` (Branch if Overflow Set, V=1) and `BVC` (Branch if Overflow Clear, V=0).",
    explanation: "In ARM Cortex processors, the condition code `VS` checks if the V flag in the CPSR register is set.",
    hint: "BVS = Branch if V Set.",
    level: "moderate",
    codeExample: "ADDS R0, R1, R2\nBVS overflow_handler ; Branch if V == 1"
  },
  {
    question: "What is the x86 `INTO` (Interrupt on Overflow) instruction?",
    shortAnswer: "A software interrupt instruction that automatically triggers Interrupt Vector 4 if the Overflow Flag (OF) is 1.",
    explanation: "`INTO` checks the OF flag. If OF=1, it generates an exception (Interrupt 4), allowing the operating system kernel to intercept integer overflows without requiring an explicit conditional branch instruction after every calculation.",
    hint: "Generates Interrupt 4 if OF=1.",
    level: "moderate",
    codeExample: "ADD EAX, EBX\nINTO ; Traps if OF == 1"
  },
  {
    question: "Why does the C and C++ ISO standards treat Signed Integer Overflow as Undefined Behavior (UB)?",
    shortAnswer: "To give optimizing compilers freedom to assume signed integers never overflow, enabling aggressive algebraic loop optimizations and vectorization.",
    explanation: "If signed overflow were defined to wrap around, compilers could not optimize expressions like `x + 1 > x` to `true` or vectorize loop indices. Declaring it UB allows maximum code performance on architectures with diverse hardware overflow behaviors.",
    hint: "UB enables compiler optimizations.",
    level: "expert",
    codeExample: "// Compiler optimizes 'if (x + 1 > x)' to 'if (true)' because overflow is UB!"
  },
  {
    question: "How does the compiler optimization of assuming signed overflow never happens create security vulnerabilities?",
    shortAnswer: "The compiler may silently optimize away (delete) safety bounds checks like `if (buf_len + 10 < buf_len)` because mathematically `x + 10 < x` is assumed impossible.",
    explanation: "A programmer writing `if (len + 10 < len) return ERROR;` expects to catch an integer overflow. However, optimizing compilers (GCC/Clang) recognize this as signed overflow UB and optimize out the entire `if` statement, leaving the buffer vulnerable to overflow attacks!",
    hint: "Compilers delete checks that rely on signed overflow wrapping.",
    level: "expert",
    codeExample: "if (len + 10 < len) abort(); // BUG: Compiler deletes this check!"
  },
  {
    question: "How can software developers safely check for integer addition overflow in modern C/C++ without triggering Undefined Behavior?",
    shortAnswer: "Using GCC/Clang built-ins like `__builtin_add_overflow(a, b, &result)` or checking bounds BEFORE addition (`if (a > INT_MAX - b)`).",
    explanation: "`__builtin_add_overflow()` compiles directly to a hardware `ADD` followed by reading the CPU's Overflow Flag (`JO` / `SET_O`), providing 100% safety and zero runtime overhead.",
    hint: "Check preconditions before addition or use compiler built-ins.",
    level: "expert",
    codeExample: "int result;\nif (__builtin_add_overflow(a, b, &result)) {\n    // Handle overflow safely\n}"
  },
  {
    question: "How does the Rust programming language handle signed integer overflow differently between debug and release builds?",
    shortAnswer: "In debug builds, Rust inserts overflow checks that cause a runtime panic; in release builds, Rust performs 2's complement wraparound.",
    explanation: "To catch bugs during development without hurting production performance, Rust enables arithmetic overflow checking by default in debug mode. Programmers can also use explicit methods like `checked_add()`, `saturating_add()`, or `wrapping_add()`.",
    hint: "Debug mode panics; release mode wraps.",
    level: "expert",
    codeExample: "let x: i8 = 127;\nlet y = x + 1; // Panics in debug mode!"
  },
  {
    question: "In hardware design, write the Boolean expression for the Overflow Flag $V$ in terms of operand sign bits $A_{n-1}, B_{n-1}$ and result sign bit $S_{n-1}$ for addition.",
    shortAnswer: "$V = (A_{n-1} \cdot B_{n-1} \cdot \overline{S_{n-1}}) + (\overline{A_{n-1}} \cdot \overline{B_{n-1}} \cdot S_{n-1})$.",
    explanation: "The first term asserts overflow when both inputs are negative (1, 1) but the sum is positive (0). The second term asserts overflow when both inputs are positive (0, 0) but the sum is negative (1).",
    hint: "Sum of two minterms: Negative+Negative->Positive and Positive+Positive->Negative.",
    level: "expert",
    codeExample: "assign V = (A[7] & B[7] & ~S[7]) | (~A[7] & ~B[7] & S[7]);"
  },
  {
    question: "Prove why $V = C_n \oplus C_{n-1}$ is mathematically equivalent to the Boolean sign-check equation.",
    shortAnswer: "At the MSB full adder, $S_{n-1} = A_{n-1} \oplus B_{n-1} \oplus C_{n-1}$ and $C_n = A_{n-1} B_{n-1} + C_{n-1}(A_{n-1} \oplus B_{n-1})$. Evaluating all 8 input combinations shows that $C_n \oplus C_{n-1}$ is true precisely when $A_{n-1} = B_{n-1} \ne S_{n-1}$.",
    explanation: "When $A_{n-1} = B_{n-1} = 0$, $C_n = 0$ and $S_{n-1} = C_{n-1}$. Overflow occurs if $S_{n-1}=1$, meaning $C_{n-1}=1 \ne C_n$. When $A_{n-1} = B_{n-1} = 1$, $C_n = 1$ and $S_{n-1} = C_{n-1}$. Overflow occurs if $S_{n-1}=0$, meaning $C_{n-1}=0 \ne C_n$. In both cases, $V = C_n \oplus C_{n-1}$.",
    hint: "Truth table analysis of the MSB full adder stage.",
    level: "expert",
    codeExample: "Truth table: C_n ^ C_{n-1} produces identical output to the sign comparison formula."
  },
  {
    question: "Can an unsigned addition generate a signed overflow (OF=1) without generating an unsigned carry (CF=0)?",
    shortAnswer: "Yes; for example, in 8-bit, `+100 + +50 = +150` (10010110). Signed overflow occurs (OF=1), but no carry out of MSB is generated (CF=0).",
    explanation: "150 is within the unsigned range [0, 255], so no carry out of bit 7 occurs (CF=0). But 150 exceeds the signed range [+127], corrupting the sign bit (OF=1).",
    hint: "150 fits in unsigned 8-bit, but exceeds signed 8-bit limit.",
    level: "expert",
    codeExample: "100 + 50 = 150 -> CF=0 (Unsigned Valid), OF=1 (Signed Overflow)"
  },
  {
    question: "Can an unsigned addition generate an unsigned carry (CF=1) without generating a signed overflow (OF=0)?",
    shortAnswer: "Yes; for example, in 8-bit, `255 + 1 = 256` (11111111 + 00000001 = 00000000 with carry 1). Unsigned overflow occurs (CF=1), but signed math is `-1 + 1 = 0` (valid, OF=0).",
    explanation: "In signed 2's complement, 11111111 is -1 and 00000001 is +1. Their sum is 0, which is perfectly valid and within range (OF=0). But unsigned 255 + 1 = 256 overflows 8 bits (CF=1).",
    hint: "-1 + 1 = 0 is valid in signed arithmetic.",
    level: "expert",
    codeExample: "255 + 1 -> CF=1 (Unsigned Overflow), OF=0 (Signed Valid)"
  },
  {
    question: "Can an addition generate BOTH a Carry (CF=1) AND an Overflow (OF=1) simultaneously?",
    shortAnswer: "Yes; for example, in 8-bit, `(-100) + (-50) = -150` (10011100 + 11001110 = 1 01101010). Both CF=1 and OF=1 are asserted.",
    explanation: "Unsigned: 156 + 206 = 362 > 255 (CF=1). Signed: -100 + -50 = -150 < -128, wrapping to +106 (OF=1). Both flags are set to 1.",
    hint: "-100 + -50 = -150 triggers both carry-out and sign wraparound.",
    level: "expert",
    codeExample: "(-100) + (-50) = 1 01101010 -> CF=1 AND OF=1"
  },
  {
    question: "Can an addition generate NEITHER a Carry (CF=0) NOR an Overflow (OF=0)?",
    shortAnswer: "Yes; for example, in 8-bit, `+20 + +30 = +50` (00010100 + 00011110 = 00110010). Both CF=0 and OF=0.",
    explanation: "50 is within both unsigned [0, 255] and signed [-128, +127] ranges. No carry is generated (CF=0) and no overflow occurs (OF=0).",
    hint: "Small positive additions fit in both systems.",
    level: "expert",
    codeExample: "20 + 30 = 50 -> CF=0 AND OF=0"
  },
  {
    question: "How does Saturating Arithmetic handle an addition that asserts the Overflow Flag?",
    shortAnswer: "Instead of letting the value wrap around into an opposite sign, saturating arithmetic clamps the output to the maximum positive limit (e.g. +127) or minimum negative limit (e.g. -128).",
    explanation: "In audio DSP and neural network inference, wraparound causes severe distortion. Saturating hardware detects OF=1 and automatically sets the output to `0x7F` (if positive overflow) or `0x80` (if negative overflow).",
    hint: "Clamp to INT_MAX or INT_MIN.",
    level: "expert",
    codeExample: "if (OF && SF) Sum = INT_MAX; else if (OF && !SF) Sum = INT_MIN;"
  },
  {
    question: "In 16-bit signed arithmetic, what calculation causes an overflow when adding two numbers near +30,000?",
    shortAnswer: "+30,000 + +10,000 = +40,000 > +32,767; Result wraps to -25,536 (OF=1).",
    explanation: "16-bit signed range is [-32,768 to +32,767]. 40,000 exceeds +32,767 by 7,233, wrapping to -32,768 + 7,232 = -25,536.",
    hint: "Maximum 16-bit signed value is +32,767.",
    level: "expert",
    codeExample: "30000 + 10000 = 40000 -> in int16_t = -25536 (OF=1)"
  },
  {
    question: "In 32-bit signed arithmetic, calculate `2,000,000,000 + 1,000,000,000`. What happens?",
    shortAnswer: "Sum = 3,000,000,000 > +2,147,483,647; Result wraps to -1,294,967,296 with OF=1.",
    explanation: "3 Billion exceeds the maximum 32-bit signed limit (2.147 Billion), wrapping around to a negative integer.",
    hint: "3 Billion exceeds 2.147 Billion.",
    level: "expert",
    codeExample: "2000000000 + 1000000000 = -1294967296 (OF=1)"
  },
  {
    question: "What instruction in the RISC-V ISA generates an overflow trap?",
    shortAnswer: "RISC-V intentionally omits hardware overflow flags; software must explicitly compare operands (`SLT`/`SLTU`) or use branch instructions to detect overflow.",
    explanation: "RISC-V architects simplified the base ISA by eliminating condition code registers (EFLAGS). To detect overflow in RISC-V, software checks if the sum is less than an operand: `add t0, a0, a1; slt t1, t0, a0; ...`.",
    hint: "RISC-V does not have dedicated condition flag registers.",
    level: "expert",
    codeExample: "add a2, a0, a1\nslt a3, a2, a0 ; Detect overflow in RISC-V"
  },
  {
    question: "What is the famous Gangnam Style YouTube counter overflow bug (2014)?",
    shortAnswer: "YouTube stored video view counts in a signed 32-bit integer (`int32_t`); when Gangnam Style views exceeded +2,147,483,647, the counter overflowed, forcing Google to upgrade all view counters to 64-bit (`int64_t`).",
    explanation: "In December 2014, the viral video 'Gangnam Style' crossed 2,147,483,647 views. YouTube engineers had to upgrade the database counter to 64 bits (maximum 9.22 Quintillion views) to prevent the counter from displaying negative view counts.",
    hint: "32-bit signed integer view count overflow.",
    level: "expert",
    codeExample: "YouTube view counter: int32_t (Max 2.14B) -> Upgraded to int64_t"
  },
  {
    question: "In digital circuit testing, what test vector will verify that the ALU Overflow Flag logic is working correctly for both positive and negative cases?",
    shortAnswer: "Positive Test: `0x7F + 0x01 = 0x80` (OF=1); Negative Test: `0x80 + 0xFF = 0x7F` (OF=1); Normal Test: `0x10 + 0x20 = 0x30` (OF=0).",
    explanation: "Testing boundary extremes verifies that the XOR gate correctly asserts on both positive wraparound (+127+1) and negative wraparound (-128-1).",
    hint: "Test at maximum positive and minimum negative boundary limits.",
    level: "expert",
    codeExample: "Vector 1: 0x7F + 0x01 -> OF=1\nVector 2: 0x80 + 0xFF -> OF=1\nVector 3: 0x01 + 0x02 -> OF=0"
  },
  {
    question: "Summarize the golden rules of Overflow Detection in one concise sentence.",
    shortAnswer: "Signed overflow occurs when same-sign inputs produce an opposite-sign result, detected in hardware by `OF = C_in(MSB) ^ C_out(MSB)`.",
    explanation: "This single Boolean condition guarantees complete mathematical correctness across all signed integer calculations in computer architecture.",
    hint: "Same signs -> Opposite result <=> Carry-In XOR Carry-Out of MSB.",
    level: "expert",
    codeExample: "OF = (Sign_A == Sign_B) && (Sign_Result != Sign_A) == (C_n ^ C_{n-1})"
  }
];

export default questions;
