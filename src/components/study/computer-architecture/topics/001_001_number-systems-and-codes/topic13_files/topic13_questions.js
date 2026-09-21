// Question Bank for Topic 13: Why 2’s Complement is preferred in computer systems
// Computer Architecture Masterclass - Sukanta Hui

const questions = [
  {
    question: "What is the primary architectural advantage of 2's complement over Sign-Magnitude and 1's complement in CPU design?",
    shortAnswer: "Unified adder hardware performs both addition and subtraction with identical circuitry, requiring no separate subtractor.",
    explanation: "In 2's complement, A - B is computed as A + (-B) = A + (NOT B + 1). By feeding the B operand through XOR gates controlled by a Sub signal (which also drives the initial Carry-In C0=1), standard binary adder hardware computes both addition and subtraction with zero extra ALU stages.",
    hint: "Think about whether you need two separate physical circuits for + and -.",
    level: "basic",
    codeExample: "// Unified Adder/Subtractor in Verilog\nwire [7:0] b_operand = sub ? ~b : b;\nwire [7:0] result = a + b_operand + sub;"
  },
  {
    question: "How does 2's complement eliminate the 'Dual Zero' anomaly found in Sign-Magnitude and 1's complement?",
    shortAnswer: "It provides a single unique representation for zero (00000000), eliminating duplicate +0 and -0 states.",
    explanation: "In Sign-Magnitude and 1's complement, both 00000000 (+0) and 10000000 or 11111111 (-0) exist. This wastes a code pattern and requires comparison logic to check two conditions whenever testing 'if (x == 0)'. In 2's complement, taking the 2's complement of 00000000 gives ~0 + 1 = 11111111 + 1 = 1 00000000, which truncates back to 00000000.",
    hint: "What happens when you invert 00000000 and add 1 in an 8-bit register?",
    level: "basic",
    codeExample: "// Zero detection in 2's complement ALU:\nassign zero_flag = (alu_result == 8'b00000000);"
  },
  {
    question: "What is the numerical range of an n-bit 2's complement integer compared to an n-bit 1's complement integer?",
    shortAnswer: "2's complement ranges from -2^(n-1) to +2^(n-1) - 1; 1's complement ranges from -(2^(n-1) - 1) to +(2^(n-1) - 1).",
    explanation: "Because 2's complement has only one representation for zero, the reclaimed extra bit pattern is assigned to an additional negative integer: -2^(n-1) (e.g., -128 for 8-bit, whereas 1's complement only reaches -127).",
    hint: "For n=8: 2's comp has 256 distinct numbers (-128 to +127).",
    level: "basic",
    codeExample: "// 8-bit limits in C (stdint.h)\n#define INT8_MIN (-128)\n#define INT8_MAX (127)"
  },
  {
    question: "Why does 1's complement addition require an 'End-Around Carry' while 2's complement simply discards the carry-out?",
    shortAnswer: "1's complement uses modulo (2^n - 1) arithmetic, requiring carry-out to be added back to the LSB, adding a full second addition delay.",
    explanation: "In 1's complement, an overflow beyond the register modulus must be recirculated to the least significant bit (end-around carry). This loop substantially increases circuit propagation delay and complicates pipelined datapath design.",
    hint: "Why is an extra clock cycle or ripple stage needed if carry-out must re-enter bit 0?",
    level: "moderate",
    codeExample: "// 1's complement end-around carry delay:\nsum_stage1 = a + b;\nfinal_sum = sum_stage1.val + sum_stage1.carry_out; // 2x adder latency!"
  },
  {
    question: "How does modular arithmetic explain why carry-out can be safely discarded in 2's complement addition?",
    shortAnswer: "2's complement operations naturally occur modulo 2^n, so a carry-out bit representing 2^n is congruent to 0 mod 2^n.",
    explanation: "For an n-bit register, the hardware naturally truncates any bit at position 2^n. In modular arithmetic: (A + B) mod 2^n correctly handles negative operands without any extra corrective addition steps.",
    hint: "What is 256 modulo 256 in an 8-bit byte?",
    level: "moderate",
    codeExample: "// C modular arithmetic truncation:\nuint8_t a = 250, b = 10;\nuint8_t sum = a + b; // (260) mod 256 = 4"
  },
  {
    question: "How does a CPU implement the 2's complement subtraction A - B using a single adder and XOR gates?",
    shortAnswer: "Each bit of B is passed through an XOR gate with the SUB control signal, and SUB is connected to the adder's Carry-In (C0).",
    explanation: "When SUB=1: B XOR 1 inverts all bits (forming 1's complement ~B), and C0=1 adds the required +1 to the LSB, generating ~B + 1 (2's complement). The adder then computes A + (~B + 1) = A - B in a single clock step.",
    hint: "Remember: X XOR 0 = X, and X XOR 1 = NOT X.",
    level: "moderate",
    codeExample: "// Gate level datapath:\nwire [7:0] b_xor = b ^ {8{sub_control}};\nfull_adder_8bit alu (.a(a), .b(b_xor), .cin(sub_control), .sum(res), .cout(cout));"
  },
  {
    question: "Why is Sign-Magnitude arithmetic complicated for hardware ALUs?",
    shortAnswer: "The ALU must inspect the signs of both operands, compare their magnitudes, decide whether to add or subtract, and determine the resulting sign separately.",
    explanation: "Sign-magnitude addition requires a 4-step state machine: (1) Check if signs match; (2) If they differ, compare |A| vs |B|; (3) Subtract smaller magnitude from larger; (4) Assign sign of larger operand. This requires significant silicon area and introduces high propagation delay.",
    hint: "Can sign-magnitude just blindly add two numbers together without checking signs first?",
    level: "moderate",
    codeExample: "// Sign-Magnitude addition logic in C:\nif (sign_a == sign_b) {\n  res_mag = mag_a + mag_b;\n  res_sign = sign_a;\n} else if (mag_a >= mag_b) {\n  res_mag = mag_a - mag_b;\n  res_sign = sign_a;\n} else {\n  res_mag = mag_b - mag_a;\n  res_sign = sign_b;\n}"
  },
  {
    question: "What is the hardware cost comparison (gate count) between a 2's complement ALU and a sign-magnitude ALU?",
    shortAnswer: "A 2's complement ALU requires roughly 40-60% fewer logic gates because it shares the adder for all operations without magnitude comparators.",
    explanation: "A sign-magnitude unit requires a magnitude comparator, subtractor multiplexers, sign-resolution logic, and dual-zero handling gates. A 2's complement unit only adds n XOR gates and 1 carry-in wire to a standard adder.",
    hint: "Fewer gates mean lower chip manufacturing cost, less heat, and smaller die area.",
    level: "expert",
    codeExample: "// Gate count delta:\n// 2's Comp: N Full Adders + N XOR gates\n// Sign-Mag: N Full Adders + N Full Subtractors + Magnitude Comparator + Muxes"
  },
  {
    question: "How does 2's complement simplify the CPU condition code / flag register generation?",
    shortAnswer: "Zero (Z), Negative (N), Carry (C), and Overflow (V) flags are generated directly from adder output bits and carries without post-processing.",
    explanation: "N is simply MSB (bit 7). Z is an NOR reduction of all sum bits. C is the carry-out from MSB. V is generated by C_in(MSB) XOR C_out(MSB). No special decoding is required for +0 vs -0.",
    hint: "Every flag is an immediate 1-gate extraction from the adder datapath.",
    level: "moderate",
    codeExample: "assign zero_flag = ~(|sum);\nassign neg_flag  = sum[7];\nassign ovf_flag  = c_in_msb ^ c_out_msb;"
  },
  {
    question: "Why does the asymmetric range [-128, +127] in 8-bit 2's complement cause an edge case when taking the absolute value or negating -128?",
    shortAnswer: "Negating -128 requires +128, which cannot be represented in 8-bit signed format, causing an arithmetic overflow.",
    explanation: "In 8-bit 2's complement, -128 is 10000000. Inverting gives 01111111 (127), and adding 1 gives 10000000 (-128 again). Hardware sets the overflow flag because +128 exceeds INT8_MAX.",
    hint: "What is -(-128) in standard C with signed char?",
    level: "moderate",
    codeExample: "int8_t x = -128;\nint8_t y = -x; // In C, -(-128) evaluates to -128 (undefined behavior / overflow)"
  },
  {
    question: "How is sign extension performed in 2's complement hardware when widening an 8-bit integer to 16 bits?",
    shortAnswer: "By replicating the most significant bit (MSB) into all higher bit positions.",
    explanation: "Because the MSB has a negative weight (-2^(n-1)), extending the sign bit preserves the exact mathematical value: -128 = 10000000 (8-bit) → 11111111 10000000 (-128 in 16-bit). For positive numbers, copying MSB 0 pads leading zeros.",
    hint: "Think about the x86 MOVSX (Move with Sign-Extend) instruction.",
    level: "basic",
    codeExample: "// Sign extension in Verilog:\nwire [7:0] byte_val = 8'b11110000; // -16\nwire [15:0] word_val = {{8{byte_val[7]}}, byte_val}; // 16'hFFF0 (-16)"
  },
  {
    question: "Why does 2's complement arithmetic work identically for signed and unsigned addition at the silicon datapath level?",
    shortAnswer: "The bit patterns produced by addition are mathematically identical under modulo 2^n regardless of whether bits are interpreted as signed or unsigned.",
    explanation: "For any two bitvectors A and B, the binary sum (A + B) mod 2^n is the same. The CPU executes the exact same ADD instruction for signed and unsigned integers; only the status flags (C vs V) are interpreted differently by subsequent branch instructions.",
    hint: "In x86 assembly, ADD works on both signed and unsigned ints; only JC (unsigned) vs JO (signed) branch differently.",
    level: "expert",
    codeExample: "; x86 Assembly:\nADD EAX, EBX   ; Same single instruction for uint32_t and int32_t!\nJC  unsigned_ovf\nJO  signed_ovf"
  },
  {
    question: "What is the single-line XOR formula for hardware overflow (V flag) in a 2's complement adder?",
    shortAnswer: "V = C_n ⊕ C_(n-1), where C_n is carry-out of MSB and C_(n-1) is carry-in to MSB.",
    explanation: "If a carry enters the MSB without exiting (C_in=1, C_out=0), or exits without entering (C_in=0, C_out=1), an illegal sign change occurred. A single 2-input XOR gate instantly detects overflow.",
    hint: "Carry entering MSB vs carry leaving MSB.",
    level: "moderate",
    codeExample: "wire overflow = carry[7] ^ carry[6]; // For 8-bit adder"
  },
  {
    question: "Which historical computer architectures used 1's complement, and why did they transition away from it?",
    shortAnswer: "Machines like the CDC 6600 and UNIVAC 1100 used 1's complement, but transitioned away due to dual-zero complexity and end-around carry delay.",
    explanation: "Early mainframe designers experimented with 1's complement because bit inversion was easy. However, software bugs from -0 vs +0 and the performance cost of recirculating end-around carry forced the industry to adopt 2's complement uniformly.",
    hint: "Think about the iconic Seymour Cray CDC supercomputers of the 1960s.",
    level: "expert",
    codeExample: "// CDC 6600 60-bit 1's complement:\n// 00...00 = +0, 11...11 = -0\n// Required special 'jump if negative zero' instructions."
  },
  {
    question: "Why is Excess-K (Biased) representation NOT used for general-purpose ALU integer registers?",
    shortAnswer: "Adding two biased numbers doubles the bias (A+K + B+K = A+B+2K), requiring an extra subtraction step after every addition.",
    explanation: "In Excess-K, zero is represented by K. Adding two numbers requires subtracting K from the sum to restore the proper bias, adding clock latency. However, Excess-K is ideal for IEEE-754 floating-point exponents because it enables simple magnitude comparisons.",
    hint: "Excess-127 is used for floating-point exponents, not CPU integer registers.",
    level: "expert",
    codeExample: "// Biased exponent addition in FPU:\nexp_result = exp_a + exp_b - 127; // Requires corrective -127"
  },
  {
    question: "How does 2's complement facilitate fast multiplication algorithms such as Booth's Multiplication Algorithm?",
    shortAnswer: "Booth's algorithm directly multiplies signed numbers in 2's complement by inspecting adjacent bit pairs (01, 10, 00, 11) without converting negatives to positive.",
    explanation: "Booth's algorithm treats a sequence of 1s (e.g. 011110 = 30) as 2^(m+k) - 2^m (32 - 2 = 30), replacing multiple additions with one subtraction and one addition. This works directly in 2's complement arithmetic.",
    hint: "Consecutive 1s are replaced by a subtraction at the start and an addition at the end.",
    level: "expert",
    codeExample: "// Booth's multiplier step:\ncase ({Q0, Q_minus1})\n  2'b01: A = A + M;   // add multiplicand\n  2'b10: A = A - M;   // subtract multiplicand\n  2'b00, 2'b11: ;     // shift only\nendcase"
  },
  {
    question: "In Barrackpore industrial embedded controllers, why does 2's complement prevent DC bias accumulation in DSP FIR filters?",
    shortAnswer: "Symmetrical cancellation around 00000000 ensures positive and negative noise spikes average out to true zero without -0 quantization distortion.",
    explanation: "Because 2's complement has a single zero, accumulators summing signed audio/sensor samples do not suffer from dual-zero bias drift. Quantization truncation errors are strictly bounded.",
    hint: "Mamata and Mahima in Barrackpore rely on zero DC offset in DSP algorithms.",
    level: "moderate",
    codeExample: "// DSP Accumulator loop:\nint32_t acc = 0;\nfor(int i=0; i<N; i++) acc += (int16_t)sample[i] * coeff[i];"
  },
  {
    question: "How does 2's complement simplify integer division by powers of 2 via arithmetic right shifts (SAR)?",
    shortAnswer: "SAR shifts all bits right while keeping the sign bit in MSB, approximating division by 2 with sign preservation.",
    explanation: "For positive numbers, SAR 1 is exact floor division. For negative numbers, SAR 1 produces floor(x / 2), which is consistent with mathematical floor division (-5 >> 1 = -3, since -5 = 2*(-3) + 1).",
    hint: "Contrast logical shift right (SHR - fills 0) with arithmetic shift right (SAR - fills MSB).",
    level: "moderate",
    codeExample: "int8_t x = -8; // 11111000\nint8_t y = x >> 1; // 11111100 = -4"
  },
  {
    question: "What happens during a 2's complement arithmetic operation if you add +1 to INT_MAX (e.g. 127 in 8-bit)?",
    shortAnswer: "The result wraps around to INT_MIN (-128) due to standard binary addition, setting the Overflow (V) flag.",
    explanation: "01111111 (+127) + 00000001 (+1) = 10000000 (-128 in 2's complement). The carry out of bit 6 into bit 7 is 1, while carry out of bit 7 is 0. V = 1 XOR 0 = 1 (Signed Overflow).",
    hint: "Think about odometer roll-over on a signed circle.",
    level: "basic",
    codeExample: "int8_t val = 127;\nval = val + 1; // Evaluates to -128 (Integer Overflow)"
  },
  {
    question: "What is the mathematical definition of the 2's complement of an n-bit binary integer N?",
    shortAnswer: "2's complement(N) = 2^n - N (for N ≠ 0), or (~N + 1) mod 2^n.",
    explanation: "Radix complement (r's complement) for base r=2 is defined as 2^n - N. For example, for n=8 and N=25: 2^8 - 25 = 256 - 25 = 231 = (11100111)_2.",
    hint: "Radix complement formula: r^n - N.",
    level: "basic",
    codeExample: "// Mathematical equivalent:\n// 256 - 25 = 231 (0xE7 = -25 in 8-bit)"
  },
  {
    question: "Why is 2's complement also called the 'Radix Complement' in base-2?",
    shortAnswer: "Because the complement is formed with respect to the radix (base 2 raised to power n: 2^n).",
    explanation: "In number theory, for any base r, the r's complement is called the Radix Complement (e.g. 10's complement in decimal, 2's complement in binary), while (r-1)'s complement is the Diminished Radix Complement (9's complement in decimal, 1's complement in binary).",
    hint: "1's complement is diminished radix complement; 2's complement is radix complement.",
    level: "basic",
    codeExample: "// Radix Complement: 2^n - N\n// Diminished Radix: (2^n - 1) - N"
  },
  {
    question: "How does 2's complement enable branch instructions like BLT (Branch Less Than) in RISC-V and ARM?",
    shortAnswer: "By evaluating the condition (N ⊕ V) = 1, where N is Negative flag and V is Overflow flag.",
    explanation: "If no overflow occurred (V=0), result is negative if N=1. If overflow occurred (V=1), the sign bit was flipped, so the true mathematical result is negative when N=0. Thus, (N ⊕ V) == 1 accurately tests if A < B for all signed comparisons.",
    hint: "Branch Less Than combines Negative and Overflow flags via XOR.",
    level: "expert",
    codeExample: "// RISC-V BLT evaluation:\nwire blt_taken = (neg_flag ^ ovf_flag);"
  },
  {
    question: "Why is testing 'if (x < 0)' faster in 2's complement than in Sign-Magnitude or Offset-Binary?",
    shortAnswer: "The CPU only needs to check a single bit: the MSB (sign bit). If MSB=1, the number is strictly negative.",
    explanation: "In 2's complement, 00000000 is positive/zero, and all numbers with MSB=1 are strictly negative (no -0 ambiguity). In Sign-Magnitude, 10000000 is -0 (not strictly less than zero). In offset-binary, comparison against bias K is required.",
    hint: "MSB is directly wired to the Negative (N) status register.",
    level: "basic",
    codeExample: "bool is_negative = (val & 0x80) != 0; // Instant 1-cycle test"
  },
  {
    question: "How does 2's complement prevent instruction set bloat in RISC microprocessors?",
    shortAnswer: "A single set of ADD and SUB instructions handles both signed and unsigned data, reducing opcode requirements.",
    explanation: "Instead of needing separate ADD_SIGNED, ADD_UNSIGNED, SUB_SIGNED, SUB_UNSIGNED opcodes, a RISC CPU uses only ADD and SUB. Only branch/comparison instructions (BGE vs BGEU, BLT vs BLTU) need signed/unsigned distinctions.",
    hint: "Fewer ALU opcodes simplify instruction decoder logic.",
    level: "moderate",
    codeExample: "; RISC-V Assembly:\nADD  x1, x2, x3   ; Signed or Unsigned addition (Same opcode)\nBLT  x1, x2, label ; Signed comparison\nBLTU x1, x2, label ; Unsigned comparison"
  },
  {
    question: "In a 4-bit 2's complement system, what are the decimal values of 0111, 1000, 1111, and 0000?",
    shortAnswer: "0111 = +7, 1000 = -8, 1111 = -1, 0000 = 0.",
    explanation: "0111 = + (4+2+1) = +7. 1000 = -8. 1111 = -8 + 4 + 2 + 1 = -1. 0000 = 0.",
    hint: "Bit 3 has a weight of -8; bits 2, 1, 0 have weights +4, +2, +1.",
    level: "basic",
    codeExample: "// 4-bit weights: [-8, 4, 2, 1]\n// 1000 = -8*1 + 0 = -8\n// 1111 = -8 + 4 + 2 + 1 = -1"
  },
  {
    question: "Why can 2's complement negative numbers be continuously accumulated in a wider register without losing accuracy?",
    shortAnswer: "Because sign extension preserves the exact signed value across arbitrary bit-width expansions (e.g. 8-bit to 32-bit).",
    explanation: "When accumulating 8-bit signed audio or financial samples into a 32-bit register, simply sign-extending each sample before addition guarantees exact linear arithmetic without scaling offsets.",
    hint: "Sign extension converts 11110000 (-16) to 11111111 11111111 11111111 11110000 (-16).",
    level: "moderate",
    codeExample: "int32_t total = 0;\nfor(int i = 0; i < len; i++) {\n  total += (int32_t)samples_8bit[i]; // Sign-extended addition\n}"
  },
  {
    question: "What is the right-to-left shortcut for converting positive binary to 2's complement by hand?",
    shortAnswer: "Scan from right to left (LSB to MSB): copy all zeros and the first '1' unchanged, then invert all remaining bits to the left.",
    explanation: "Example: 20 = 00010100. From right: '00', first '1' kept -> '100'. Invert remaining '00010' -> '11101'. Result: 11101100 (-20). This avoids manually doing bitwise NOT followed by addition of 1.",
    hint: "Scan right to left, keep first 1, flip everything thereafter.",
    level: "basic",
    codeExample: "// 20:   0 0 0 1 0 1 0 0\n//       |---|---| | | |\n// flip: 1 1 1 0 1 | | |\n// keep:           1 0 0\n// -20:  1 1 1 0 1 1 0 0"
  },
  {
    question: "How does 2's complement handle subtraction resulting in zero (e.g., 5 - 5)?",
    shortAnswer: "+5 is 00000101, -5 is 11111011. Adding gives 1 00000000. Carry-out 1 is discarded, leaving 00000000 (+0).",
    explanation: "00000101 + 11111011 = 1 00000000. The carry-out into the 9th bit is discarded by the 8-bit register, cleanly yielding true zero (00000000) and setting the Zero (Z) flag.",
    hint: "5 + (-5) generates a carry out of 1 and leaves eight 0s.",
    level: "basic",
    codeExample: "// In 8-bit ALU:\n//   00000101 (+5)\n// + 11111011 (-5)\n// = 00000000 (0, Cout=1, Z=1)"
  },
  {
    question: "What critical software vulnerability occurred in old C code due to assuming -INT_MIN is positive in 2's complement?",
    shortAnswer: "Calling abs(INT_MIN) returns INT_MIN (still negative), causing buffer out-of-bounds or infinite loops.",
    explanation: "Because -(-2147483648) overflows 32-bit signed integers, abs(INT_MIN) returns -2147483648. If used as an array index or allocation size, it causes security vulnerabilities.",
    hint: "abs(INT32_MIN) cannot return +2147483648 because INT32_MAX is only +2147483647.",
    level: "expert",
    codeExample: "int x = INT_MIN;\nint y = abs(x); // y is still INT_MIN (-2147483648)!\nif (y < 0) printf(\"Vulnerability: abs failed to make positive!\");"
  },
  {
    question: "Summarize Sir Sukanta Hui's rule on why 2's complement became the universal silicon standard.",
    shortAnswer: "One unified adder for +/- operations, a single unique zero, simple single-gate overflow detection, and zero end-around carry delay.",
    explanation: "2's complement eliminates hardware redundancy, optimizes clock cycle times, maximizes integer range, and provides exact modular arithmetic for digital CPUs worldwide.",
    hint: "Silicon efficiency + mathematical elegance + high clock frequencies.",
    level: "basic",
    codeExample: "// Universal ALU Design Principle:\n// Hardware simplicity = Maximum MHz frequency and minimal silicon footprint."
  }
];

export default questions;
