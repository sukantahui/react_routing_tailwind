// topic6_questions.js - 30 Comprehensive Questions on 1's Complement Representation
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is 1's Complement in digital hardware and how is it obtained?",
    shortAnswer: "1's Complement is formed by bitwise inverting all bits of a positive binary number (changing 0s to 1s and 1s to 0s).",
    explanation: "For any binary number, its 1's complement is obtained by performing a bitwise NOT operation on every bit. Mathematically, for an n-bit number N, 1's complement is (2^n - 1) - N.",
    hint: "Every 0 becomes 1 and every 1 becomes 0.",
    level: "basic",
    codeExample: "+14 = 00001110_2 -> 1's Complement (-14) = 11110001_2"
  },
  {
    question: "What is the formula for the dynamic range of an n-bit 1's Complement number system?",
    shortAnswer: "[-(2^(n-1) - 1) to +(2^(n-1) - 1)].",
    explanation: "In an n-bit 1's complement system, the MSB is the sign bit. The maximum positive number is 0111...11 = +(2^(n-1) - 1), and the minimum negative number is 1000...00 = -(2^(n-1) - 1).",
    hint: "For 8 bits, -(2^7 - 1) to +(2^7 - 1) = -127 to +127.",
    level: "basic",
    codeExample: "4-bit: [-7, +7]\n8-bit: [-127, +127]\n16-bit: [-32767, +32767]"
  },
  {
    question: "What are the two binary representations of zero in an 8-bit 1's Complement system?",
    shortAnswer: "+0 is `00000000` and -0 is `11111111`.",
    explanation: "In 1's complement, +0 is represented by all zeros (00000000). Inverting all bits gives 11111111, which represents -0 (negative zero).",
    hint: "Positive zero is all 0s; negative zero is all 1s.",
    level: "basic",
    codeExample: "+0 = 00000000_2\n-0 = 11111111_2 (0xFF)"
  },
  {
    question: "Convert decimal -35 into 8-bit 1's Complement binary.",
    shortAnswer: "`11011100`.",
    explanation: "+35 in 8-bit binary is 00100011 (32 + 2 + 1). Inverting all bits yields 11011100, which represents -35 in 1's complement.",
    hint: "+35 = 00100011. Flip every bit.",
    level: "basic",
    codeExample: "+35: 00100011\n-35: 11011100 (1's complement)"
  },
  {
    question: "Decode the 8-bit 1's Complement binary number `11101010` into decimal.",
    shortAnswer: "-21.",
    explanation: "Since the MSB is 1, the number is negative. To find its magnitude, invert all bits: NOT(11101010) = 00010101 = 16 + 4 + 1 = 21. Therefore, the decimal value is -21.",
    hint: "Invert all bits to recover the positive magnitude.",
    level: "basic",
    codeExample: "11101010 -> Invert: 00010101 = 21 -> Value = -21"
  },
  {
    question: "What is the End-Around Carry rule in 1's Complement addition?",
    shortAnswer: "If addition of two numbers produces a carry out of the MSB, that carry bit must be routed around and added to the LSB.",
    explanation: "Because 1's complement arithmetic operates modulo (2^n - 1) rather than modulo 2^n, an overflow carry out of the MSB represents a missing +1 unit that must be added back into the least significant bit (LSB) to produce the mathematically correct sum.",
    hint: "The carry from the top bit circles back into the bottom bit.",
    level: "basic",
    codeExample: "Sum + End_Carry -> Final Sum"
  },
  {
    question: "Perform (+25) - (+10) using 8-bit 1's complement arithmetic.",
    shortAnswer: "Result = `00001111` = +15.",
    explanation: "+25 = 00011001. +10 = 00001010 -> -10 in 1's comp = 11110101. Add: 00011001 + 11110101 = 1 00001110. An end carry of 1 is generated. Add carry to LSB: 00001110 + 1 = 00001111 = +15. Verified!",
    hint: "Add +25 and -10, then add the end-around carry.",
    level: "moderate",
    codeExample: "  00011001 (+25)\n+ 11110101 (-10)\n= 1 00001110\n+          1 (End carry)\n=   00001111 (+15)"
  },
  {
    question: "Perform (+10) - (+25) using 8-bit 1's complement arithmetic.",
    shortAnswer: "Result = `11110000` = -15.",
    explanation: "+10 = 00001010. -25 in 1's comp = 11100110. Add: 00001010 + 11100110 = 11110000. No end carry is generated, meaning the result is negative. Inverting 11110000 gives 00001111 = 15 -> Result = -15.",
    hint: "No end carry means the result is negative in 1's complement form.",
    level: "moderate",
    codeExample: "  00001010 (+10)\n+ 11100110 (-25)\n= 11110000 (No carry -> Negative; NOT(11110000)=00001111 = 15 -> -15)"
  },
  {
    question: "Why does the End-Around Carry mechanism create a latency penalty in 1's complement hardware ALUs?",
    shortAnswer: "It creates a circular carry dependency where the carry-out of the MSB must propagate through a second full-adder addition cycle starting at the LSB.",
    explanation: "In standard adders, carry propagation travels in one direction (LSB to MSB). In 1's complement, carry-out from MSB must feed back into the LSB carry-in, effectively doubling worst-case addition propagation delay or requiring two-stage adders.",
    hint: "Two sequential carry propagation waves are required.",
    level: "moderate",
    codeExample: "Stage 1: A + B -> Carry_Out; Stage 2: Sum + Carry_Out"
  },
  {
    question: "What major networking protocols use 1's Complement addition with End-Around Carry?",
    shortAnswer: "The IPv4 Header Checksum, TCP Checksum, and UDP Checksum (defined in RFC 1071).",
    explanation: "RFC 1071 mandates that IPv4, TCP, and UDP packet checksums be computed using the 16-bit 1's complement sum of 16-bit words. When verifying at the destination, summing the payload plus the checksum produces all 1s (0xFFFF).",
    hint: "Internet Protocol standard RFC 1071.",
    level: "moderate",
    codeExample: "uint16_t checksum = ip_checksum((uint16_t*)packet, length);"
  },
  {
    question: "Why was 1's Complement chosen for the Internet (IPv4/TCP/UDP) Checksum instead of 2's Complement or CRC?",
    shortAnswer: "Because 1's complement checksums are endianness-independent; they produce the exact same byte values regardless of CPU byte ordering (Big-Endian vs Little-Endian).",
    explanation: "In 1's complement, summing 16-bit words byte-by-byte produces identical checksum results regardless of whether the machine is Big-Endian (Network Order) or Little-Endian (x86/ARM). Routers and endpoints can compute checksums without expensive byte-swapping operations.",
    hint: "Big-Endian and Little-Endian CPUs get the same checksum.",
    level: "moderate",
    codeExample: "RFC 1071: 1's complement sum is commutative across byte boundaries."
  },
  {
    question: "What is the decimal value of the bit pattern `10000000` in (a) 1's Complement, (b) 2's Complement, and (c) Sign-Magnitude?",
    shortAnswer: "(a) -127 in 1's Complement, (b) -128 in 2's Complement, (c) -0 in Sign-Magnitude.",
    explanation: "In 1's comp: Invert 10000000 -> 01111111 = 127 -> -127. In 2's comp: MSB is -128 -> -128. In Sign-Mag: MSB=1 (-), Mag=0 -> -0.",
    hint: "Compare how each representation interprets 0x80.",
    level: "moderate",
    codeExample: "0x80 = -127 (1's comp) | -128 (2's comp) | -0 (Sign-Mag)"
  },
  {
    question: "What is the decimal value of the bit pattern `11111111` in (a) 1's Complement, (b) 2's Complement, and (c) Unsigned?",
    shortAnswer: "(a) -0 in 1's Complement, (b) -1 in 2's Complement, (c) 255 in Unsigned.",
    explanation: "In 1's comp: Invert 11111111 -> 00000000 -> -0. In 2's comp: -128 + 127 = -1. In unsigned: 128 + 64 + ... + 1 = 255.",
    hint: "All 1s in 1's complement is negative zero.",
    level: "moderate",
    codeExample: "0xFF = -0 (1's comp) | -1 (2's comp) | 255 (Unsigned)"
  },
  {
    question: "How do you detect arithmetic overflow when adding two numbers in 1's Complement?",
    shortAnswer: "Overflow occurs when adding two numbers of the SAME sign produces a result with the OPPOSITE sign.",
    explanation: "If you add two positive numbers (MSBs = 0) and the final sum has MSB = 1, an overflow occurred. Similarly, if you add two negative numbers (MSBs = 1) and the sum has MSB = 0, an overflow occurred.",
    hint: "Positive + Positive = Negative OR Negative + Negative = Positive means Overflow.",
    level: "moderate",
    codeExample: "Overflow = (Sign_A == Sign_B) && (Sign_Result != Sign_A)"
  },
  {
    question: "Show an example of overflow in 8-bit 1's complement addition (+70 + +60).",
    shortAnswer: "70 (01000110) + 60 (00111100) = 10000010 (-125 in 1's comp), which is an overflow because 130 > 127.",
    explanation: "+70 = 01000110, +60 = 00111100. Sum = 10000010. The MSB is 1 (negative), but both inputs were positive. The actual value 130 exceeds the maximum 8-bit 1's complement limit of +127.",
    hint: "130 exceeds the maximum positive limit of +127.",
    level: "moderate",
    codeExample: "  01000110 (+70)\n+ 00111100 (+60)\n= 10000010 (MSB is 1 -> Negative! Overflow occurred!)"
  },
  {
    question: "Why did the historic CDC 6600 (1964) supercomputer use 60-bit 1's Complement arithmetic?",
    shortAnswer: "Seymour Cray chose 1's complement because bit inversion (negation) is instantaneous in hardware (0 logic gate delay), avoiding carry propagation during subtraction setup.",
    explanation: "In 1964, transistor switching speeds were precious. Negating a 60-bit register in 1's complement required only routing inverted output wires from flip-flops, whereas 2's complement required an incremental addition step (+1).",
    hint: "Negation in 1's complement is instantaneous bit-flipping.",
    level: "expert",
    codeExample: "CDC 6600: 60-bit registers with hardware bit-inverters."
  },
  {
    question: "What software hazard existed on 1's complement architectures when comparing variables with zero (`x == 0`)?",
    shortAnswer: "A variable could contain `0000...00` (+0) or `1111...11` (-0); if equality checked only bitwise identity against +0, `x == 0` would evaluate FALSE for -0.",
    explanation: "Compilers and assembly programmers on machines like the UNIVAC 1108 or CDC 6600 had to use special normalized zero instructions or check both +0 and -0 patterns to prevent subtle branching failures.",
    hint: "Negative zero (-0) has all bits set to 1.",
    level: "expert",
    codeExample: "if (x == 0x0000 || x == 0xFFFF) // Required in 1's complement"
  },
  {
    question: "How does the receiver verify an IPv4 packet header checksum calculated in 1's complement?",
    shortAnswer: "The receiver sums all 16-bit header words (including the checksum field itself); if no errors occurred, the sum is `0xFFFF` (all 1s, -0).",
    explanation: "Because the sender places the 1's complement negation of the header sum into the checksum field, summing all words at the receiver naturally cancels out to negative zero (`0xFFFF` or `-0`). Inverting `0xFFFF` yields `0x0000` (valid header).",
    hint: "Sum + (-Sum) = -0 (0xFFFF).",
    level: "expert",
    codeExample: "uint16_t verify = fold_sum(header); if (verify == 0xFFFF) // Valid!"
  },
  {
    question: "How is an n-bit number sign-extended in 1's Complement when expanding to a wider register (e.g. 8-bit to 16-bit)?",
    shortAnswer: "By replicating the MSB (sign bit) across all upper bit positions, identical to 2's complement.",
    explanation: "For positive numbers (MSB=0), upper bits are padded with 0s. For negative numbers (MSB=1), upper bits are padded with 1s. For example, 8-bit -5 (11111010) sign-extends to 16-bit 11111111 11111010 (-5 in 16-bit 1's complement).",
    hint: "Copy the sign bit to all new higher-order bit positions.",
    level: "expert",
    codeExample: "8-bit -5:  11111010\n16-bit -5: 11111111 11111010"
  },
  {
    question: "Convert decimal -127 to 8-bit 1's Complement, 8-bit 2's Complement, and 8-bit Sign-Magnitude.",
    shortAnswer: "1's Comp: `10000000` (0x80); 2's Comp: `10000001` (0x81); Sign-Magnitude: `11111111` (0xFF).",
    explanation: "+127 = 01111111. 1's Comp flips bits -> 10000000. 2's Comp flips and adds 1 -> 10000001. Sign-Mag: Sign=1, Mag=127 -> 11111111.",
    hint: "Notice how the three encodings produce completely different bit patterns for -127.",
    level: "expert",
    codeExample: "-127 in 1's Comp: 10000000\n-127 in 2's Comp: 10000001\n-127 in Sign-Mag: 11111111"
  },
  {
    question: "Can 1's Complement represent decimal -128 in an 8-bit register?",
    shortAnswer: "No, the minimum negative limit in 8-bit 1's Complement is -127.",
    explanation: "Since 1's complement is symmetric, its 8-bit range is [-127 to +127]. To represent -128, a 9-bit or 16-bit 1's complement register is required.",
    hint: "The range is symmetric around zero: -(2^(n-1) - 1).",
    level: "expert",
    codeExample: "8-bit 1's comp range: [-127, +127] -> -128 is Out of Range!"
  },
  {
    question: "How does 1's complement addition handle the calculation (+0) + (+0) versus (-0) + (-0)?",
    shortAnswer: "`00000000 + 00000000 = 00000000` (+0), while `11111111 + 11111111 = 1 11111110 -> +1 (end carry) = 11111111` (-0).",
    explanation: "Adding two positive zeros produces positive zero (+0). Adding two negative zeros produces a sum with end carry that folds back around to produce negative zero (-0).",
    hint: "Both zero addition operations stay internally consistent within the algebra.",
    level: "expert",
    codeExample: "  11111111 (-0)\n+ 11111111 (-0)\n= 1 11111110 + 1 = 11111111 (-0)"
  },
  {
    question: "In Verilog / VHDL hardware description languages, how is a 1's complement negation written in RTL?",
    shortAnswer: "Using the bitwise NOT operator `~`: `assign ones_comp = ~positive_val;`.",
    explanation: "Because 1's complement is a pure bitwise NOT, it synthesizes to simple inverter gates with zero combinatorial adder logic.",
    hint: "The tilde (~) operator performs bitwise inversion.",
    level: "expert",
    codeExample: "wire [7:0] neg_a = ~pos_a; // 0-delay 1's complement negation"
  },
  {
    question: "What is the relationship between the 1's Complement and 2's Complement of a binary number?",
    shortAnswer: "`2's Complement = 1's Complement + 1`.",
    explanation: "Because 1's complement of N is (2^n - 1) - N, adding 1 yields (2^n - 1 - N) + 1 = 2^n - N, which is precisely the mathematical definition of 2's complement.",
    hint: "Adding 1 to 1's complement shifts the representation by 1, eliminating negative zero.",
    level: "expert",
    codeExample: "2s_Comp(N) = 1s_Comp(N) + 1"
  },
  {
    question: "Why does adding +1 to 1's complement eliminate the dual zero problem?",
    shortAnswer: "Inverting +0 (00000000) gives 11111111; adding 1 yields `1 00000000` where the carry is discarded, returning 00000000 (unique zero).",
    explanation: "In 2's complement, +0 and -0 map to the identical binary pattern `00000000`. The 8th bit carry out of the MSB is simply discarded by the hardware, guaranteeing a single, unambiguous zero.",
    hint: "11111111 + 1 = 1 00000000 -> Discarding carry leaves 00000000.",
    level: "expert",
    codeExample: "00000000 -> Invert: 11111111 -> Add 1: 00000000 (Single Zero!)"
  },
  {
    question: "Calculate the 16-bit 1's complement sum of two network words: `0x4500` and `0x003C`.",
    shortAnswer: "`0x453C`.",
    explanation: "0x4500 + 0x003C = 0x453C. No carry out of bit 15 occurred, so the 1's complement sum is 0x453C.",
    hint: "Direct 16-bit hex addition.",
    level: "expert",
    codeExample: "  0x4500\n+ 0x003C\n= 0x453C"
  },
  {
    question: "Calculate the 16-bit 1's complement sum of `0xFFFF` and `0x0001`.",
    shortAnswer: "`0x0001`.",
    explanation: "0xFFFF + 0x0001 = 0x10000 (16-bit sum 0x0000 with carry-out 1). Applying end-around carry: 0x0000 + 1 = 0x0001.",
    hint: "Remember to add the end carry back to the LSB.",
    level: "expert",
    codeExample: "  0xFFFF (-0)\n+ 0x0001 (+1)\n= 0x10000 -> 0x0000 + 1 = 0x0001"
  },
  {
    question: "In terms of modular arithmetic, what modulus does an n-bit 1's complement system follow?",
    shortAnswer: "Modulo (2^n - 1).",
    explanation: "Because negative zero is 2^n - 1 (which wraps to 0), 1's complement arithmetic is arithmetic modulo (2^n - 1). In contrast, 2's complement is arithmetic modulo 2^n.",
    hint: "2's complement is mod 2^n; 1's complement is mod (2^n - 1).",
    level: "expert",
    codeExample: "1's complement: Arithmetic modulo (2^n - 1)\n2's complement: Arithmetic modulo 2^n"
  },
  {
    question: "What happens if you subtract a number from itself in 1's complement (e.g. (+5) + (-5))?",
    shortAnswer: "It produces `11111111` (-0), which is mathematically valid negative zero.",
    explanation: "+5 = 00000101. -5 in 1's comp = 11111010. Adding them: 00000101 + 11111010 = 11111111 (-0). No end carry occurs, and the result is negative zero.",
    hint: "Any number plus its bitwise inverse is a string of all 1s (-0).",
    level: "expert",
    codeExample: "  00000101 (+5)\n+ 11111010 (-5)\n= 11111111 (-0 in 1's complement)"
  },
  {
    question: "Summarize the major advantages and disadvantages of 1's Complement in computer systems architecture.",
    shortAnswer: "Advantages: Instantaneous negation (bitwise NOT) and endian-neutral Internet checksums. Disadvantages: Dual zero (+0 and -0), End-Around Carry latency, and asymmetric range compared to memory power-of-2 sizes.",
    explanation: "1's complement simplified negation at the cost of ALU carry feedback and duplicate zeros. While abandoned for general integer ALUs, its endianness immunity preserves its vital role in global Internet transport protocols.",
    hint: "Fast bit-flip vs End-around carry latency and dual zero.",
    level: "expert",
    codeExample: "1's Comp: Fast Negation | Dual Zero | End-Around Carry | RFC 1071 Checksum"
  }
];

export default questions;
