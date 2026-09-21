// topic11_questions.js - 30 Comprehensive Questions on Binary Arithmetic: Addition & Subtraction
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What are the four basic rules for 1-bit binary addition?",
    shortAnswer: "`0 + 0 = 0`, `0 + 1 = 1`, `1 + 0 = 1`, and `1 + 1 = 0 (with Carry 1, written as 10_2)`.",
    explanation: "In base 2, 1 + 1 equals 2 in decimal, which is written as binary 10 (Sum 0, Carry 1).",
    hint: "Recall that 1 + 1 equals 2, which requires 2 bits (10_2).",
    level: "basic",
    codeExample: "0+0=0\n0+1=1\n1+0=1\n1+1=10_2 (Sum=0, Carry=1)"
  },
  {
    question: "What is the result of adding three 1s in binary (`1 + 1 + 1`)?",
    shortAnswer: "Sum = 1, Carry = 1 (written as binary `11_2` = decimal 3).",
    explanation: "In a Full Adder, adding A=1, B=1, and Carry-In=1 equals 3 in decimal, which is binary 11 (Sum bit 1, Carry-out bit 1).",
    hint: "1 + 1 + 1 = 3 in decimal = 11 in binary.",
    level: "basic",
    codeExample: "1 + 1 + 1 = 11_2 (Sum=1, Carry=1)"
  },
  {
    question: "What are the basic rules for 1-bit binary subtraction?",
    shortAnswer: "`0 - 0 = 0`, `1 - 0 = 1`, `1 - 1 = 0`, and `0 - 1 = 1 (with Borrow 1)`.",
    explanation: "When subtracting 1 from 0, you must borrow 1 from the next higher position (worth 2 in base 2), giving 2 - 1 = 1.",
    hint: "Borrowing in binary brings a value of 2 (base 2).",
    level: "basic",
    codeExample: "0 - 0 = 0 (Borrow 0)\n1 - 0 = 1 (Borrow 0)\n1 - 1 = 0 (Borrow 0)\n0 - 1 = 1 (Borrow 1)"
  },
  {
    question: "What is a Half Adder and what are its Boolean logic equations?",
    shortAnswer: "A combinational circuit that adds two 1-bit inputs A and B; `Sum = A XOR B` and `Carry = A AND B`.",
    explanation: "A half adder produces the sum and carry for two 1-bit inputs, but cannot accept a carry from a previous stage.",
    hint: "XOR for Sum, AND for Carry.",
    level: "basic",
    codeExample: "Sum = A ^ B;\nCarry = A & B;"
  },
  {
    question: "What is a Full Adder and what are its Boolean logic equations?",
    shortAnswer: "A combinational circuit that adds three 1-bit inputs A, B, and C_in; `Sum = A XOR B XOR C_in`, `C_out = (A AND B) OR (C_in AND (A XOR B))`.",
    explanation: "A full adder cascades carry bits across multiple bit positions, enabling multi-bit binary addition.",
    hint: "Two XOR gates, two AND gates, and one OR gate.",
    level: "basic",
    codeExample: "Sum = A ^ B ^ C_in;\nC_out = (A & B) | (C_in & (A ^ B));"
  },
  {
    question: "Perform unsigned binary addition: `(1101)_2 + (1011)_2`.",
    shortAnswer: "`(11000)_2` = decimal 24.",
    explanation: "1101 (13) + 1011 (11) = 11000 (24). Bit 0: 1+1=0 (c1). Bit 1: 0+1+1=0 (c1). Bit 2: 1+0+1=0 (c1). Bit 3: 1+1+1=1 (c1). Bit 4: 1. Result: 11000.",
    hint: "13 + 11 = 24.",
    level: "basic",
    codeExample: "  1101 (13)\n+ 1011 (11)\n= 11000 (24)"
  },
  {
    question: "Perform unsigned binary subtraction: `(1101)_2 - (0110)_2`.",
    shortAnswer: "`(0111)_2` = decimal 7.",
    explanation: "1101 (13) - 0110 (6) = 0111 (7). Bit 0: 1-0=1. Bit 1: 0-1=1 (borrowed from bit 2). Bit 2: 0-1=1 (borrowed from bit 3). Bit 3: 0-0=0. Result: 0111.",
    hint: "13 - 6 = 7.",
    level: "basic",
    codeExample: "  1101 (13)\n- 0110 (6)\n= 0111 (7)"
  },
  {
    question: "What is a Half Subtractor and what are its Boolean equations?",
    shortAnswer: "A circuit that subtracts 1-bit B from A; `Difference = A XOR B` and `Borrow = (NOT A) AND B`.",
    explanation: "The half subtractor generates difference and borrow for two inputs without a borrow-in from a previous stage.",
    hint: "Difference uses XOR; Borrow requires inverting A before ANDing with B.",
    level: "basic",
    codeExample: "Diff = A ^ B;\nBorrow = (~A) & B;"
  },
  {
    question: "What is a Full Subtractor and what are its Boolean equations?",
    shortAnswer: "A circuit that subtracts B and B_in from A; `Difference = A XOR B XOR B_in`, `B_out = (~A & B) | (B_in & ~(A ^ B))`.",
    explanation: "A full subtractor supports borrow cascading across multi-bit words.",
    hint: "Difference is A ^ B ^ B_in.",
    level: "basic",
    codeExample: "Diff = A ^ B ^ B_in;\nB_out = (~A & B) | (B_in & ~(A ^ B));"
  },
  {
    question: "Add the fractional binary numbers `(10.11)_2 + (01.10)_2`.",
    shortAnswer: "`(100.01)_2` = decimal 4.25.",
    explanation: "10.11 (2.75) + 01.10 (1.50) = 100.01 (4.25). Align radix points and add: 0.01 + 0.10 + 0.10 carry = 0.01 with carry 1 to integer part. 2 + 1 + 1 = 4 (100).",
    hint: "2.75 + 1.50 = 4.25.",
    level: "moderate",
    codeExample: "  10.11 (2.75)\n+ 01.10 (1.50)\n= 100.01 (4.25)"
  },
  {
    question: "Subtract the fractional binary numbers `(11.01)_2 - (01.11)_2`.",
    shortAnswer: "`(01.10)_2` = decimal 1.5.",
    explanation: "11.01 (3.25) - 01.11 (1.75) = 01.10 (1.50). Fractional part: 0.01 - 0.11 borrows 1 from integer part. 1.01 - 0.11 = 0.10. Integer part: 2 - 1 = 1.",
    hint: "3.25 - 1.75 = 1.50.",
    level: "moderate",
    codeExample: "  11.01 (3.25)\n- 01.11 (1.75)\n= 01.10 (1.50)"
  },
  {
    question: "How many Half Adders and OR gates are needed to construct a Full Adder?",
    shortAnswer: "2 Half Adders and 1 OR gate.",
    explanation: "The first Half Adder adds A and B to produce a partial sum and carry. The second Half Adder adds the partial sum and C_in to produce the final Sum. The OR gate combines the two partial carries: `C_out = C1 | C2`.",
    hint: "2 HA + 1 OR = 1 FA.",
    level: "moderate",
    codeExample: "HA1: (S1, C1) = HA(A, B)\nHA2: (Sum, C2) = HA(S1, C_in)\nC_out = C1 | C2"
  },
  {
    question: "What is an n-bit Ripple-Carry Adder (RCA)?",
    shortAnswer: "A parallel binary adder formed by cascading n Full Adders, where the Carry-Out of each full adder is connected to the Carry-In of the next higher full adder.",
    explanation: "In an RCA, bit 0 computes immediately, but bit n-1 cannot finalize its sum until the carry signal ripples through all n full adders sequentially.",
    hint: "Carries ripple sequentially from LSB to MSB.",
    level: "moderate",
    codeExample: "FA0(C0->C1) -> FA1(C1->C2) -> FA2(C2->C3) -> FA3(C3->C4)"
  },
  {
    question: "What is the worst-case propagation delay of an n-bit Ripple-Carry Adder with gate delay $t_{gate}$?",
    shortAnswer: "$2n \times t_{gate}$ (or $O(n)$ latency).",
    explanation: "Each Full Adder stage takes approximately 2 gate delays (one AND and one OR) to compute $C_{out}$. For n bits, the worst-case carry chain takes $2n \times t_{gate}$ time.",
    hint: "Delay scales linearly with bit width n.",
    level: "moderate",
    codeExample: "Delay(RCA) = 2 * n * t_gate"
  },
  {
    question: "How does a Carry-Lookahead Adder (CLA) solve the propagation delay bottleneck of Ripple-Carry Adders?",
    shortAnswer: "It computes all carry signals in parallel using Generate ($G_i = A_i B_i$) and Propagate ($P_i = A_i \oplus B_i$) Boolean logic, reducing delay to $O(\log n)$.",
    explanation: "Instead of waiting for carries to ripple, a CLA expands carry formulas algebraically: $C_1 = G_0 + P_0 C_0$, $C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0$, allowing all carries to be evaluated simultaneously in 4 gate delays regardless of word size.",
    hint: "Computes all carries simultaneously using P and G logic.",
    level: "moderate",
    codeExample: "G_i = A_i & B_i;\nP_i = A_i ^ B_i;\nC_{i+1} = G_i | (P_i & C_i);"
  },
  {
    question: "Add binary numbers `(11111111)_2 + (00000001)_2` in an 8-bit unsigned adder.",
    shortAnswer: "Result = `00000000` with Carry-Out = 1 (Total = 256).",
    explanation: "255 + 1 = 256. In 8 bits, 256 wraps to 00000000 with a Carry-Out of 1.",
    hint: "255 + 1 = 256 = 1 00000000_2.",
    level: "moderate",
    codeExample: "  11111111 (255)\n+ 00000001 (1)\n= 1 00000000 (0 in 8-bit with Carry=1)"
  },
  {
    question: "Subtract binary numbers `(10000000)_2 - (00000001)_2`.",
    shortAnswer: "`(01111111)_2` = decimal 127.",
    explanation: "128 - 1 = 127. In binary, subtracting 1 from 10000000 propagates borrows across all 7 zeros, leaving 01111111.",
    hint: "128 - 1 = 127.",
    level: "moderate",
    codeExample: "  10000000 (128)\n- 00000001 (1)\n= 01111111 (127)"
  },
  {
    question: "Why do modern CPU ALUs use an adder circuit to perform subtraction rather than building a separate subtractor circuit?",
    shortAnswer: "Because $A - B = A + \overline{B} + 1$; inverting B with XOR gates and setting Carry-In = 1 allows the adder to perform subtraction with zero extra adder silicon.",
    explanation: "Building dedicated subtractors would double the transistor count and ALU die size. 2's complement unification provides subtraction for free using simple XOR gates.",
    hint: "Saves silicon area and power.",
    level: "moderate",
    codeExample: "Unified ALU: Sum = A + (B ^ Mode) + Mode"
  },
  {
    question: "What integrated circuit (IC) is the industry standard 4-bit binary full adder in the 7400 TTL family?",
    shortAnswer: "IC 74LS283 (or 74LS83).",
    explanation: "The 74LS283 is a classic 4-bit binary full adder with internal carry-lookahead logic, widely used in computer science digital logic laboratory breadboarding.",
    hint: "74LS283 4-bit binary adder.",
    level: "expert",
    codeExample: "IC 74LS283: 4-bit Binary Full Adder with Fast Carry"
  },
  {
    question: "In hardware design, what is a Carry-Save Adder (CSA) and where is it used?",
    shortAnswer: "A high-speed adder that adds three or more binary numbers simultaneously without propagating carries, producing a partial sum and a partial carry; used in hardware multipliers (Wallace Trees).",
    explanation: "When multiplying multi-bit numbers (which produces many partial products), propagating carries on every addition step would be too slow. A CSA defers carry propagation until the very final addition stage.",
    hint: "Used in fast hardware multipliers and Wallace Trees.",
    level: "expert",
    codeExample: "CSA: Takes 3 numbers -> Produces 2 numbers (Sum, Carry) in 1 gate delay"
  },
  {
    question: "What is a Manchester Carry Chain?",
    shortAnswer: "A transistor-level dynamic CMOS carry-lookahead implementation using pass transistors and precharged carry lines to achieve ultra-fast carry propagation in VLSI ALUs.",
    explanation: "Manchester carry chains use dedicated NMOS pass transistors controlled by Propagate signals to discharge precharged nodes, minimizing silicon area and propagation delay.",
    hint: "VLSI pass-transistor carry circuit.",
    level: "expert",
    codeExample: "VLSI Manchester Carry: Uses precharged dynamic logic."
  },
  {
    question: "Perform binary multiplication using repeated addition / shift-and-add: `(1011)_2 \times (110)_2`.",
    shortAnswer: "`(1000010)_2` = decimal 66.",
    explanation: "1011 (11) * 110 (6) = 66. Step 1: 1011 * 0 = 0000. Step 2: 1011 * 1 (shifted 1) = 10110. Step 3: 1011 * 1 (shifted 2) = 101100. Adding: 010110 + 101100 = 1000010 (64 + 2 = 66).",
    hint: "11 * 6 = 66.",
    level: "expert",
    codeExample: "  10110 (22)\n+ 101100 (44)\n= 1000010 (66)"
  },
  {
    question: "How does binary division operate in hardware using the restoring division algorithm?",
    shortAnswer: "By iteratively shifting the dividend left, subtracting the divisor, checking the remainder sign; if negative, restoring the previous remainder and setting quotient bit to 0; if positive, keeping remainder and setting quotient bit to 1.",
    explanation: "Restoring division directly mirrors long division in binary. At each step, a trial subtraction tests whether the divisor fits into the current partial dividend.",
    hint: "Shift left, subtract, test sign, restore if negative.",
    level: "expert",
    codeExample: "Restoring Division: Rem = Rem - Divisor; if (Rem < 0) Rem = Rem + Divisor;"
  },
  {
    question: "What is Non-Restoring Division and why is it faster than Restoring Division?",
    shortAnswer: "It eliminates the restore step by adding the divisor in the subsequent cycle if the current trial subtraction yielded a negative remainder.",
    explanation: "Restoring division requires up to two operations per quotient bit (subtract + restore). Non-restoring division performs exactly one operation per cycle (subtract if previous was positive, add if previous was negative), cutting division cycles in half.",
    hint: "Adds in next cycle instead of restoring in current cycle.",
    level: "expert",
    codeExample: "Non-Restoring: If Rem < 0, next op is ADD; if Rem >= 0, next op is SUB."
  },
  {
    question: "Add the hexadecimal numbers `0x3F + 0x2A` using binary conversion.",
    shortAnswer: "`0x69` = decimal 105.",
    explanation: "0x3F = 00111111 (63). 0x2A = 00101010 (42). Binary sum: 00111111 + 00101010 = 01101001. High nibble 0110 is 6, low nibble 1001 is 9 -> 0x69 (105).",
    hint: "63 + 42 = 105 = 0x69.",
    level: "expert",
    codeExample: "0x3F (63) + 0x2A (42) = 0x69 (105)"
  },
  {
    question: "Subtract the hexadecimal numbers `0x50 - 0x1A` using binary 2's complement.",
    shortAnswer: "`0x36` = decimal 54.",
    explanation: "0x50 = 01010000 (80). 0x1A = 00011010 (26) -> 2's comp = 11100110. Add: 01010000 + 11100110 = 1 00110110. Discard carry -> 00110110 = 0x36 (54).",
    hint: "80 - 26 = 54 = 0x36.",
    level: "expert",
    codeExample: "0x50 (80) - 0x1A (26) = 0x36 (54)"
  },
  {
    question: "What is BCD Addition and what occurs when the 4-bit sum exceeds 9?",
    shortAnswer: "Adding binary-coded decimal digits; if the 4-bit sum > 9 or generates a half-carry, binary 0110 (+6) is added to correct the value and propagate a decimal carry.",
    explanation: "Because decimal digits range 0-9 and 4-bit binary ranges 0-15, adding 6 skips the 6 illegal states (10-15). For example, 7 + 8 = 15 (1111); adding 0110 yields 1 0101 (BCD 15: carry 1, units 5).",
    hint: "Add 6 to correct binary sums exceeding 9.",
    level: "expert",
    codeExample: "7 (0111) + 8 (1000) = 1111 (15) -> + 0110 (6) = 1 0101 (BCD 15)"
  },
  {
    question: "In high-speed ALUs, what is a Kogge-Stone Adder?",
    shortAnswer: "A parallel-prefix carry-lookahead adder topology with minimum logic depth ($O(\log n)$) and uniform fan-out, making it one of the fastest adder architectures for 64-bit ALUs.",
    explanation: "Kogge-Stone adders are used in high-frequency CPU designs because they minimize the number of gate levels in the carry path at the expense of more wiring tracks.",
    hint: "Parallel-prefix adder with lowest logic depth.",
    level: "expert",
    codeExample: "Kogge-Stone: Parallel-prefix tree with log2(n) stages."
  },
  {
    question: "In high-speed ALUs, what is a Brent-Kung Adder?",
    shortAnswer: "A parallel-prefix adder that optimizes for lower silicon area and fewer interconnect wires compared to Kogge-Stone, at the cost of slightly higher logic depth ($2 \log n - 1$).",
    explanation: "Brent-Kung trees are ideal for low-power mobile SoCs and FPGA synthesis where wiring congestion is a critical design constraint.",
    hint: "Area-efficient parallel prefix adder.",
    level: "expert",
    codeExample: "Brent-Kung: Minimum wire tracks, 2*log2(n)-1 stages."
  },
  {
    question: "Summarize the essential building blocks of binary addition and subtraction in computing.",
    shortAnswer: "1. Half Adder (XOR/AND); 2. Full Adder (cascaded carries); 3. Unified Adder/Subtractor (XOR inverter + Carry-In); 4. Fast Carry-Lookahead (CLA/Kogge-Stone).",
    explanation: "These foundational combinational circuits perform every integer calculation in all computing hardware.",
    hint: "HA -> FA -> CLA -> Unified ALU.",
    level: "expert",
    codeExample: "Arithmetic Hierarchy: 1-bit HA/FA -> Parallel CLA -> Unified CPU Datapath"
  }
];

export default questions;
