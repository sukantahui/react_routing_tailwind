// Question Bank for Topic 2: Conversion from Decimal to Octal
// Computer Architecture Masterclass - Coder & AccoTax

const questions = [
  {
    question: "What are the allowed digit symbols in the Octal (Base-8) number system?",
    shortAnswer: "Digits 0 through 7 (0, 1, 2, 3, 4, 5, 6, 7). Digits 8 and 9 are illegal.",
    explanation: "In any base $r$, the allowable symbols range from $0$ to $r-1$. For base 8, the symbols are 0, 1, 2, 3, 4, 5, 6, 7. The value 8 is written as $(10)_8$ ($1 \\times 8^1 + 0 \\times 8^0$).",
    hint: "Max digit = Radix - 1 = 8 - 1 = 7.",
    level: "basic",
    codeExample: "// Valid: 0755, 0127\n// Syntax Error in C/Python: 0789 (8 and 9 do not exist in octal)"
  },
  {
    question: "What is the result of converting decimal integer 359₁₀ to octal?",
    shortAnswer: "(547)₈",
    explanation: "$359 \\div 8 = 44$ rem 7 (LSD); $44 \\div 8 = 5$ rem 4; $5 \\div 8 = 0$ rem 5 (MSD). Reading bottom-up gives $(547)_8$. Verification: $5\\times 64 + 4\\times 8 + 7 = 320 + 32 + 7 = 359$.",
    hint: "Divide by 8 successively and read remainders in reverse order.",
    level: "basic",
    codeExample: "// 359 = 5*64 + 4*8 + 7*1 = (547)_8"
  },
  {
    question: "Why is exactly 1 octal digit equivalent to 3 binary bits?",
    shortAnswer: "Because $8 = 2^3$. Three binary bits yield exactly $2^3 = 8$ unique combinations (000 to 111), matching octal digits 0 to 7.",
    explanation: "The mapping between binary and octal is direct and exact: 000=0, 001=1, 010=2, 011=3, 100=4, 101=5, 110=6, 111=7. This makes base-8 a natural compact representation of binary data.",
    hint: "log2(8) = 3 bits per octal digit.",
    level: "basic",
    codeExample: "// Binary to Octal grouping:\n// (101 110 011)_2 = (563)_8"
  },
  {
    question: "How is the decimal fraction 0.4375₁₀ converted to octal?",
    shortAnswer: "(0.34)₈",
    explanation: "$0.4375 \\times 8 = 3.5000$ (Integer 3); $0.5000 \\times 8 = 4.0000$ (Integer 4, fraction=0). Reading top-down yields $(0.34)_8$. Verification: $3/8 + 4/64 = 0.375 + 0.0625 = 0.4375$.",
    hint: "Multiply by 8 successively and read integer carries top-down.",
    level: "moderate",
    codeExample: "// 0.4375 * 8 = 3.5 (carry 3)\n// 0.5000 * 8 = 4.0 (carry 4) -> 0.34_8"
  },
  {
    question: "What is the octal value of decimal 64₁₀?",
    shortAnswer: "(100)₈",
    explanation: "$64 = 8^2$. In base-8, $8^2$ is represented as a '1' in the third position followed by two zeros: $(100)_8$.",
    hint: "8^2 = 64.",
    level: "basic",
    codeExample: "// 64_10 = 1*8^2 + 0*8^1 + 0*8^0 = 100_8"
  },
  {
    question: "In Unix/Linux file permissions, what does the octal command `chmod 755 filename` signify in binary?",
    shortAnswer: "Owner: 7 (111 = rwx), Group: 5 (101 = r-x), Others: 5 (101 = r-x).",
    explanation: "Each octal digit translates directly into a 3-bit permission mask for Read (4), Write (2), and Execute (1). 7 = 4+2+1 = 111; 5 = 4+0+1 = 101.",
    hint: "r=4, w=2, x=1. Total for rwx = 7, for r-x = 5.",
    level: "moderate",
    codeExample: "// chmod 755:\n// Owner:  7 = 111_2 (Read, Write, Execute)\n// Group:  5 = 101_2 (Read, No-Write, Execute)\n// Others: 5 = 101_2 (Read, No-Write, Execute)"
  },
  {
    question: "What is the octal representation of decimal integer 512₁₀?",
    shortAnswer: "(1000)₈",
    explanation: "$512 = 8^3$. In octal notation, it is represented as a 1 followed by three zeros: $(1000)_8$.",
    hint: "8^3 = 512.",
    level: "basic",
    codeExample: "// 512_10 = 1000_8 (1*8^3)"
  },
  {
    question: "How do you convert decimal 94.625₁₀ to octal?",
    shortAnswer: "(136.5)₈",
    explanation: "Integer 94: $94 \\div 8 = 11$ R 6; $11 \\div 8 = 1$ R 3; $1 \\div 8 = 0$ R 1 $\\to (136)_8$. Fraction 0.625: $0.625 \\times 8 = 5.000 \\to (0.5)_8$. Combined = $(136.5)_8$.",
    hint: "Convert integer part (94) and fraction part (0.625) separately.",
    level: "moderate",
    codeExample: "// 94_10 = 136_8\n// 0.625_10 = 0.5_8\n// 94.625_10 = 136.5_8"
  },
  {
    question: "What is the decimal equivalent of the octal number (777)₈?",
    shortAnswer: "511",
    explanation: "$(777)_8 = 7 \\times 64 + 7 \\times 8 + 7 \\times 1 = 448 + 56 + 7 = 511$. Alternatively, $(777)_8 = 8^3 - 1 = 512 - 1 = 511$.",
    hint: "8^3 - 1 = 511.",
    level: "basic",
    codeExample: "// 777_8 = 8^3 - 1 = 511_10"
  },
  {
    question: "Why does the C language treat numeric literals with a leading zero as Octal (e.g. `int x = 012;`)?",
    shortAnswer: "Historical convention inherited from early Unix and PDP-11 systems where octal was the primary word representation.",
    explanation: "In C and C++, prefixing an integer with `0` (e.g., `012`) tells the compiler to parse it in base-8. Thus, `012` is $1 \\times 8 + 2 = 10_{10}$, not twelve!",
    hint: "012 in C = 10 in decimal.",
    level: "moderate",
    codeExample: "// In C/C++:\nint a = 12;   // 12 decimal\nint b = 012;  // 10 decimal (parsed as octal!)"
  },
  {
    question: "What is the octal value of decimal 255₁₀?",
    shortAnswer: "(377)₈",
    explanation: "$255 \\div 8 = 31$ rem 7; $31 \\div 8 = 3$ rem 7; $3 \\div 8 = 0$ rem 3. Reading bottom-up gives $(377)_8$. Verification: $3 \\times 64 + 7 \\times 8 + 7 = 192 + 56 + 7 = 255$.",
    hint: "255 in binary is 11111111. Group in 3s: 011 111 111 = 377_8.",
    level: "basic",
    codeExample: "// 255_10 = 0b11111111 = 377_8"
  },
  {
    question: "What is the octal conversion of decimal fraction 0.125₁₀?",
    shortAnswer: "(0.1)₈",
    explanation: "$0.125 = 1/8 = 8^{-1} = (0.1)_8$.",
    hint: "1/8 in base-8 is 0.1.",
    level: "basic",
    codeExample: "// 0.125_10 = 0.1_8"
  },
  {
    question: "How is decimal 100₁₀ converted to octal?",
    shortAnswer: "(144)₈",
    explanation: "$100 \\div 8 = 12$ R 4; $12 \\div 8 = 1$ R 4; $1 \\div 8 = 0$ R 1 $\\to (144)_8$. Verification: $1\\times 64 + 4\\times 8 + 4 = 64 + 32 + 4 = 100$.",
    hint: "64 + 32 + 4 = 100.",
    level: "basic",
    codeExample: "// 100_10 = 1*64 + 4*8 + 4*1 = 144_8"
  },
  {
    question: "Why do aviation radar transponders use 4-digit octal squawk codes (0000 to 7777)?",
    shortAnswer: "Because each dial digit is controlled by 3 mechanical switch bits, providing 4096 (8⁴) unique identity codes.",
    explanation: "Early aviation electronics used 12-bit identification words. Splitting 12 bits into 4 groups of 3 bits mapped perfectly to 4 octal rotary dials (digits 0 to 7) without needing hexadecimal letters.",
    hint: "12 bits = 4 octal digits = 2^12 = 4096 combinations.",
    level: "moderate",
    codeExample: "// Aviation squawk codes:\n// 7700 = General Emergency\n// 7600 = Radio Failure\n// 7500 = Hijack"
  },
  {
    question: "What is the octal value of decimal 4096₁₀?",
    shortAnswer: "(10000)₈",
    explanation: "$4096 = 8^4$. In base-8, it is a 1 followed by four zeros: $(10000)_8$.",
    hint: "8^4 = 4096.",
    level: "basic",
    codeExample: "// 4096_10 = 10000_8 (1*8^4)"
  },
  {
    question: "What is the octal conversion of decimal fraction 0.015625₁₀?",
    shortAnswer: "(0.01)₈",
    explanation: "$0.015625 = 1/64 = 8^{-2} = (0.01)_8$.",
    hint: "1/64 is 8^-2.",
    level: "basic",
    codeExample: "// 0.015625 = 8^-2 = 0.01_8"
  },
  {
    question: "What is the octal value of decimal 70₁₀?",
    shortAnswer: "(106)₈",
    explanation: "$70 \\div 8 = 8$ R 6; $8 \\div 8 = 1$ R 0; $1 \\div 8 = 0$ R 1 $\\to (106)_8$. Verification: $1\\times 64 + 0\\times 8 + 6 = 70$.",
    hint: "64 + 6 = 70.",
    level: "basic",
    codeExample: "// 70 = 1*64 + 0*8 + 6*1 = 106_8"
  },
  {
    question: "How do you convert decimal fraction 0.2₁₀ to octal?",
    shortAnswer: "(0.14631463...)₈ (repeating cycle '1463')",
    explanation: "$0.2 \\times 8 = 1.6$ (1); $0.6 \\times 8 = 4.8$ (4); $0.8 \\times 8 = 6.4$ (6); $0.4 \\times 8 = 3.2$ (3); $0.2 \\times 8 = 1.6$ (1, repeats!). The fraction recurring pattern is $(0.\\overline{1463})_8$.",
    hint: "Cycle repeats when fractional part returns to 0.2.",
    level: "moderate",
    codeExample: "// 0.2 * 8 = 1.6 (1)\n// 0.6 * 8 = 4.8 (4)\n// 0.8 * 8 = 6.4 (6)\n// 0.4 * 8 = 3.2 (3) -> repeats!"
  },
  {
    question: "What is the octal equivalent of decimal integer 128₁₀?",
    shortAnswer: "(200)₈",
    explanation: "$128 = 2 \\times 64 = 2 \\times 8^2 = (200)_8$.",
    hint: "2 * 64 = 128.",
    level: "basic",
    codeExample: "// 128_10 = 2*8^2 + 0*8^1 + 0*8^0 = 200_8"
  },
  {
    question: "What is the octal value of decimal 500₁₀?",
    shortAnswer: "(764)₈",
    explanation: "$500 \\div 8 = 62$ R 4; $62 \\div 8 = 7$ R 6; $7 \\div 8 = 0$ R 7 $\\to (764)_8$. Verification: $7\\times 64 + 6\\times 8 + 4 = 448 + 48 + 4 = 500$.",
    hint: "448 + 48 + 4 = 500.",
    level: "moderate",
    codeExample: "// 500 = 7*64 + 6*8 + 4*1 = 764_8"
  },
  {
    question: "What is the decimal equivalent of octal fraction (0.5)₈?",
    shortAnswer: "0.625",
    explanation: "$5 \\times 8^{-1} = 5/8 = 0.625$.",
    hint: "5/8 = 0.625.",
    level: "basic",
    codeExample: "// 0.5_8 = 5/8 = 0.625_10"
  },
  {
    question: "What is the octal value of decimal integer 1000₁₀?",
    shortAnswer: "(1750)₈",
    explanation: "$1000 \\div 8 = 125$ R 0; $125 \\div 8 = 15$ R 5; $15 \\div 8 = 1$ R 7; $1 \\div 8 = 0$ R 1 $\\to (1750)_8$. Verification: $1\\times 512 + 7\\times 64 + 5\\times 8 + 0 = 512 + 448 + 40 = 1000$.",
    hint: "512 + 448 + 40 = 1000.",
    level: "moderate",
    codeExample: "// 1000 = 1*512 + 7*64 + 5*8 + 0 = 1750_8"
  },
  {
    question: "What is the octal representation of decimal 15₁₀?",
    shortAnswer: "(17)₈",
    explanation: "$15 = 1 \\times 8^1 + 7 \\times 8^0 = (17)_8$.",
    hint: "8 + 7 = 15.",
    level: "basic",
    codeExample: "// 15 = 1*8 + 7 = 17_8"
  },
  {
    question: "What is the octal value of decimal 8₁₀?",
    shortAnswer: "(10)₈",
    explanation: "$8 = 1 \\times 8^1 + 0 \\times 8^0 = (10)_8$. After 7 in octal, the count rolls over to 10.",
    hint: "Base-8 rolls over at 8.",
    level: "basic",
    codeExample: "// 8_10 = 10_8"
  },
  {
    question: "What is the octal conversion of decimal fraction 0.875₁₀?",
    shortAnswer: "(0.7)₈",
    explanation: "$0.875 = 7/8 = 7 \\times 8^{-1} = (0.7)_8$.",
    hint: "7/8 = 0.875.",
    level: "basic",
    codeExample: "// 0.875 * 8 = 7.0 (carry 7, fraction=0) -> 0.7_8"
  },
  {
    question: "How do you convert decimal 1024₁₀ to octal?",
    shortAnswer: "(2000)₈",
    explanation: "$1024 = 2 \\times 512 = 2 \\times 8^3 = (2000)_8$.",
    hint: "2 * 512 = 1024.",
    level: "basic",
    codeExample: "// 1024 = 2*8^3 = 2000_8"
  },
  {
    question: "What is the octal value of decimal integer 60₁₀?",
    shortAnswer: "(74)₈",
    explanation: "$60 \\div 8 = 7$ rem 4; $7 \\div 8 = 0$ rem 7 $\\to (74)_8$. Verification: $7 \\times 8 + 4 = 56 + 4 = 60$.",
    hint: "56 + 4 = 60.",
    level: "basic",
    codeExample: "// 60 = 7*8 + 4 = 74_8"
  },
  {
    question: "What is the octal value of decimal integer 2048₁₀?",
    shortAnswer: "(4000)₈",
    explanation: "$2048 = 4 \\times 512 = 4 \\times 8^3 = (4000)_8$.",
    hint: "4 * 512 = 2048.",
    level: "basic",
    codeExample: "// 2048 = 4*8^3 = 4000_8"
  },
  {
    question: "What is the decimal equivalent of octal fraction (0.24)₈?",
    shortAnswer: "0.3125",
    explanation: "$2 \\times 8^{-1} + 4 \\times 8^{-2} = 2/8 + 4/64 = 0.25 + 0.0625 = 0.3125$.",
    hint: "2/8 + 4/64 = 0.25 + 0.0625.",
    level: "moderate",
    codeExample: "// 0.24_8 = 2/8 + 4/64 = 0.3125_10"
  },
  {
    question: "What is the master golden rule for converting Decimal to Octal without making arithmetic errors?",
    shortAnswer: "Perform successive division by 8, read remainders bottom-up, and verify with powers of 8 ($512, 64, 8, 1$) or 3-bit binary grouping.",
    explanation: "Decimal to Octal can be verified in seconds by converting the Octal digits back: $d_2 \\times 64 + d_1 \\times 8 + d_0$. For $(547)_8$: $5\\times 64 (320) + 4\\times 8 (32) + 7 (7) = 359$.",
    hint: "Sum of d_k * 8^k must equal the original decimal number exactly.",
    level: "basic",
    codeExample: "// 547_8 -> 5*64 + 4*8 + 7 = 359_10. Verified!"
  }
];

export default questions;
