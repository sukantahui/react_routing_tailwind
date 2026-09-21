// topic8_questions.js - 30 Comprehensive Questions on Range of Numbers in N-Bit Signed Systems
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is the general formula for the range of an n-bit unsigned integer?",
    shortAnswer: "[0 to 2^n - 1].",
    explanation: "An n-bit register has 2^n total bit combinations. The smallest unsigned value is all zeros (0), and the largest is all ones, which equals 2^n - 1.",
    hint: "For 8 bits, 2^8 - 1 = 255.",
    level: "basic",
    codeExample: "Range = [0, 2^n - 1]"
  },
  {
    question: "What is the general formula for the range of an n-bit 2's Complement signed integer?",
    shortAnswer: "[-2^(n-1) to +2^(n-1) - 1].",
    explanation: "Because the MSB has negative weight -2^(n-1), the range is asymmetric: negative numbers span from -2^(n-1) to -1, and non-negative numbers span from 0 to +2^(n-1) - 1.",
    hint: "For 8 bits, -2^7 to +2^7 - 1 = -128 to +127.",
    level: "basic",
    codeExample: "Range = [-2^(n-1), +2^(n-1) - 1]"
  },
  {
    question: "What is the general formula for the range of an n-bit Sign-Magnitude and 1's Complement integer?",
    shortAnswer: "[-(2^(n-1) - 1) to +(2^(n-1) - 1)].",
    explanation: "Both Sign-Magnitude and 1's Complement have symmetrical ranges with identical positive and negative limits because they contain two representations of zero (+0 and -0).",
    hint: "For 8 bits, -(2^7 - 1) to +(2^7 - 1) = -127 to +127.",
    level: "basic",
    codeExample: "Range = [-(2^(n-1) - 1), +(2^(n-1) - 1)]"
  },
  {
    question: "Why does an 8-bit 2's complement system have a range of -128 to +127 instead of -127 to +127?",
    shortAnswer: "Because zero (00000000) takes one of the non-negative slots where MSB=0, leaving 127 positive numbers (1 to 127) and 128 negative numbers (-1 to -128).",
    explanation: "An 8-bit register has 256 total states. 128 states have MSB=0 (0 and +1 to +127). The remaining 128 states have MSB=1, which map to -1 down to -128. Since zero is unique, the extra state expands the negative domain.",
    hint: "Zero has MSB=0, reducing the positive side by 1.",
    level: "basic",
    codeExample: "Total states: 128 negative + 1 zero + 127 positive = 256 states"
  },
  {
    question: "What is the range of a 16-bit signed integer in 2's complement?",
    shortAnswer: "-32,768 to +32,767.",
    explanation: "-2^(16-1) to +2^(16-1) - 1 = -2^15 to +2^15 - 1 = -32,768 to +32,767.",
    hint: "2^15 = 32,768.",
    level: "basic",
    codeExample: "int16_t range: [-32768, +32767]"
  },
  {
    question: "What is the range of a 16-bit unsigned integer?",
    shortAnswer: "0 to 65,535.",
    explanation: "0 to 2^16 - 1 = 0 to 65,535.",
    hint: "2^16 = 65,536.",
    level: "basic",
    codeExample: "uint16_t range: [0, 65535]"
  },
  {
    question: "What is the range of a 32-bit signed integer in 2's complement?",
    shortAnswer: "-2,147,483,648 to +2,147,483,647 (~ -2.14 Billion to +2.14 Billion).",
    explanation: "-2^31 to +2^31 - 1 = -2,147,483,648 to +2,147,483,647.",
    hint: "2^31 ≈ 2.147 × 10^9.",
    level: "basic",
    codeExample: "int32_t range: [-2147483648, +2147483647]"
  },
  {
    question: "What is the range of a 32-bit unsigned integer?",
    shortAnswer: "0 to 4,294,967,295 (~4.29 Billion).",
    explanation: "0 to 2^32 - 1 = 0 to 4,294,967,295.",
    hint: "2^32 ≈ 4.295 × 10^9.",
    level: "basic",
    codeExample: "uint32_t range: [0, 4294967295]"
  },
  {
    question: "What is the minimum number of bits required to store the decimal number +300 as an unsigned integer?",
    shortAnswer: "9 bits.",
    explanation: "Formula: n = ceil(log2(300 + 1)) = ceil(log2(301)) = ceil(8.23) = 9 bits. An 8-bit unsigned integer only reaches 255; a 9-bit unsigned integer reaches 511, which comfortably holds 300.",
    hint: "2^8 = 256 < 300 < 2^9 = 512.",
    level: "moderate",
    codeExample: "8-bit max = 255; 9-bit max = 511 -> 9 bits needed"
  },
  {
    question: "What is the minimum number of bits required to store decimal +300 as a signed 2's complement integer?",
    shortAnswer: "10 bits.",
    explanation: "In signed 2's complement, 9 bits only reaches +255 (range -256 to +255). To hold +300, 10 bits are required (range -512 to +511).",
    hint: "Positive max for n bits is 2^(n-1) - 1. For n=9, max is 255. For n=10, max is 511.",
    level: "moderate",
    codeExample: "9-bit signed max: +255; 10-bit signed max: +511 -> 10 bits needed"
  },
  {
    question: "What is the minimum number of bits required to store decimal -128 in 2's complement versus Sign-Magnitude?",
    shortAnswer: "8 bits for 2's complement; 9 bits for Sign-Magnitude.",
    explanation: "8-bit 2's complement range is [-128 to +127] (fits in 8 bits). 8-bit Sign-Magnitude range is only [-127 to +127], so -128 requires 9 bits (range -255 to +255).",
    hint: "2's complement can reach -128 in 8 bits because of its asymmetric range.",
    level: "moderate",
    codeExample: "8-bit 2's comp min = -128 (Fits!)\n8-bit Sign-Mag min = -127 (Overflow! Needs 9 bits)"
  },
  {
    question: "What is the Year 2038 Problem (Y2K38) in computer systems?",
    shortAnswer: "The overflow of 32-bit signed Unix timestamps (`time_t`) on January 19, 2038 at 03:14:07 UTC.",
    explanation: "Unix counts time in seconds since 1970-01-01. A 32-bit signed integer reaches its maximum value +2,147,483,647 seconds at 2038-01-19 03:14:07 UTC. At the next second, it overflows to -2,147,483,648, wrapping system clocks back to December 13, 1901.",
    hint: "32-bit signed seconds counter overflows to negative.",
    level: "moderate",
    codeExample: "2038-01-19 03:14:07 UTC (0x7FFFFFFF) -> 03:14:08 UTC (0x80000000 = 1901 AD)"
  },
  {
    question: "How is the Year 2038 Problem resolved in modern operating systems?",
    shortAnswer: "By upgrading `time_t` to a 64-bit signed integer, extending the timestamp range by 292 billion years.",
    explanation: "With a 64-bit signed timestamp, the maximum representable date is 292,277,026,596 AD, far exceeding the lifespan of the universe and permanently preventing integer overflow.",
    hint: "64-bit integers hold up to 9.22 Quintillion seconds.",
    level: "moderate",
    codeExample: "typedef int64_t time_t; // 64-bit safe timestamp"
  },
  {
    question: "What is the range of a 64-bit signed integer (`int64_t`) in 2's complement?",
    shortAnswer: "-9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 (~ -9.22 Quintillion to +9.22 Quintillion).",
    explanation: "-2^63 to +2^63 - 1. 2^63 ≈ 9.223372 × 10^18.",
    hint: "Standard `long long` in C/C++ on 64-bit architectures.",
    level: "moderate",
    codeExample: "int64_t range: [-9223372036854775808LL, +9223372036854775807LL]"
  },
  {
    question: "What is the range of a 64-bit unsigned integer (`uint64_t`)?",
    shortAnswer: "0 to 18,446,744,073,709,551,615 (~18.44 Quintillion).",
    explanation: "0 to 2^64 - 1 = 18,446,744,073,709,551,615.",
    hint: "2^64 - 1 is 18.44 Quintillion (16 Exabytes).",
    level: "moderate",
    codeExample: "uint64_t range: [0, 18446744073709551615ULL]"
  },
  {
    question: "What catastrophic space disaster occurred in 1996 due to a 64-bit to 16-bit integer conversion range overflow?",
    shortAnswer: "The Ariane 5 Rocket maiden flight explosion (Flight 501).",
    explanation: "The inertial reference software attempted to convert a 64-bit floating point horizontal velocity value to a 16-bit signed integer. The rocket's high acceleration produced a value exceeding +32,767. The resulting unhandled overflow exception shut down both navigation computers, causing the rocket to self-destruct 37 seconds after launch ($370 Million loss).",
    hint: "Ariane 5 rocket software integer conversion overflow.",
    level: "expert",
    codeExample: "int16_t horiz_bias = (int16_t)float64_val; // Overflows if > 32767!"
  },
  {
    question: "In an n-bit register, what percentage of the total representation range is negative in (a) Sign-Magnitude, and (b) 2's Complement?",
    shortAnswer: "(a) ~49.8% in Sign-Magnitude (excluding dual zeros); (b) Exactly 50.0% in 2's Complement.",
    explanation: "In 2's complement, exactly half of all bit combinations (2^(n-1) out of 2^n) have MSB=1, meaning exactly 50% are negative. In Sign-Magnitude, 2^(n-1) - 1 out of 2^n - 1 unique non-zero states are negative (~49.8% for 8 bits).",
    hint: "In 2's complement, half of the 2^n states have MSB=1.",
    level: "expert",
    codeExample: "2's Comp: 128 / 256 = 50.0% negative states"
  },
  {
    question: "What is an Excess-K (Biased) representation and how is its range calculated?",
    shortAnswer: "A representation where a fixed bias K is added to the true number before binary encoding; Range = [-K to (2^n - 1 - K)].",
    explanation: "In Excess-K, the binary value stored is `Stored_Value = True_Value + K`. For an 8-bit Excess-127 system (used in IEEE-754 single-precision float exponents), stored values span 0 to 255, so true exponent values span -127 to +128.",
    hint: "Biased exponents allow comparing floating point numbers using integer comparators.",
    level: "expert",
    codeExample: "Stored = E + 127 -> Range of E: [-127, +128]"
  },
  {
    question: "How many bits are needed to uniquely identify every human on Earth (~8.2 Billion people) in a database primary key?",
    shortAnswer: "33 bits for unsigned (or 34 bits for signed 2's complement); in practice, a 64-bit integer (`uint64_t`) is standard.",
    explanation: "2^32 = 4,294,967,296 (< 8.2 Billion). 2^33 = 8,589,934,592 (> 8.2 Billion). Therefore, at least 33 unsigned bits are required. Since CPUs align data to powers of 2, engineers use a 64-bit integer (`BIGINT`).",
    hint: "32 bits holds up to 4.29 Billion; 33 bits holds up to 8.58 Billion.",
    level: "expert",
    codeExample: "2^32 = 4.29B (Too small) -> 2^33 = 8.58B -> uint64_t BIGINT used"
  },
  {
    question: "What is the range of a 128-bit signed integer (`__int128`) supported by modern GCC/Clang compilers?",
    shortAnswer: "-2^127 to +2^127 - 1 (approximately ±1.701 × 10^38).",
    explanation: "2^127 ≈ 1.70141183 × 10^38. 128-bit integers are widely used in IPv6 networking, 128-bit GUIDs, and cryptographic modular arithmetic.",
    hint: "±1.7 × 10^38.",
    level: "expert",
    codeExample: "typedef __int128_t int128_t; // Range: [-2^127, +2^127 - 1]"
  },
  {
    question: "If a digital sensor outputs an unsigned 10-bit integer, what is the maximum numerical value it can report?",
    shortAnswer: "1023 (0x3FF).",
    explanation: "2^10 - 1 = 1024 - 1 = 1023.",
    hint: "2^10 = 1024.",
    level: "expert",
    codeExample: "10-bit ADC max = 2^10 - 1 = 1023"
  },
  {
    question: "If an analog temperature sensor outputs a 12-bit signed 2's complement integer, what is its measurement range?",
    shortAnswer: "-2048 to +2047 counts.",
    explanation: "-2^(12-1) to +2^(12-1) - 1 = -2^11 to +2^11 - 1 = -2048 to +2047.",
    hint: "2^11 = 2048.",
    level: "expert",
    codeExample: "12-bit signed ADC: [-2048, +2047]"
  },
  {
    question: "What is the formula to calculate the number of bits required to store values up to decimal N in BCD (Binary Coded Decimal)?",
    shortAnswer: "4 × Number of Decimal Digits = `4 × (floor(log10(N)) + 1)` bits.",
    explanation: "In BCD, every decimal digit (0-9) requires exactly 4 bits. For example, to represent decimal 999 (3 digits), BCD requires 3 × 4 = 12 bits, whereas pure binary requires only 10 bits.",
    hint: "Each decimal digit is packed into 4 bits in BCD.",
    level: "expert",
    codeExample: "Decimal 999: Binary = 10 bits (1111100111); BCD = 12 bits (1001 1001 1001)"
  },
  {
    question: "Why is pure binary representation more storage-efficient than BCD in terms of dynamic range per bit?",
    shortAnswer: "Pure binary utilizes all 16 states per 4 bits (100% density), whereas BCD only uses 10 out of 16 states (62.5% efficiency), wasting 6 states per nibble.",
    explanation: "In BCD, values 1010 to 1111 (10 to 15) are illegal. 8 bits of pure binary can represent 256 values (0-255), while 8 bits of BCD can only represent 100 values (0-99).",
    hint: "BCD wastes 6 invalid states in every 4-bit nibble.",
    level: "expert",
    codeExample: "8-bit Binary: 0-255 (256 values) vs 8-bit BCD: 0-99 (100 values)"
  },
  {
    question: "What happens when a 16-bit unsigned integer holding 65535 has 1 added to it in C/C++?",
    shortAnswer: "It wraps around to 0 (modulo 65536) in well-defined behavior.",
    explanation: "Under C/C++ standards, unsigned arithmetic is guaranteed to perform modulo 2^n arithmetic without triggering undefined behavior. 65535 + 1 becomes 0.",
    hint: "Unsigned overflow is well-defined modular wrap-around.",
    level: "expert",
    codeExample: "uint16_t x = 65535; x++; // x becomes 0"
  },
  {
    question: "What happens when a 16-bit signed integer holding +32767 has 1 added to it in C/C++?",
    shortAnswer: "It triggers Signed Integer Overflow, which is Undefined Behavior (UB); in hardware, it wraps to -32768.",
    explanation: "The ISO C and C++ standards specify signed integer overflow as undefined behavior, allowing compilers to assume it never happens for optimization purposes. In raw x86/ARM hardware, the register wraps to -32768 (0x8000).",
    hint: "Signed overflow is Undefined Behavior in C/C++.",
    level: "expert",
    codeExample: "int16_t x = 32767; x++; // Undefined Behavior! (Hardware: -32768)"
  },
  {
    question: "How do you calculate the dynamic range of an n-bit fixed-point number with m integer bits and f fractional bits (n = m + f)?",
    shortAnswer: "Unsigned Range: [0 to (2^m - 2^(-f))]; Signed 2's Comp Range: [-2^(m-1) to (2^(m-1) - 2^(-f))].",
    explanation: "The precision resolution is determined by the lowest fractional bit (2^-f). The maximum signed value is (2^(m-1) - 2^-f). For Q8.8 fixed-point (8 int, 8 frac): signed range is [-128.0 to +127.99609375].",
    hint: "Resolution is 2^-f; range is scaled by 2^-f.",
    level: "expert",
    codeExample: "Q8.8 format: Min = -128.0, Max = +127.99609375, Resolution = 1/256"
  },
  {
    question: "Convert the dynamic range interval of 8-bit 2's complement [-128, +127] to hexadecimal literals.",
    shortAnswer: "Minimum = `0x80` (-128), Maximum = `0x7F` (+127), Zero = `0x00` (0), -1 = `0xFF` (-1).",
    explanation: "0x80 is 10000000 (-128). 0x7F is 01111111 (+127). 0x00 is 00000000 (0). 0xFF is 11111111 (-1).",
    hint: "0x80 and 0x7F are the boundary markers.",
    level: "expert",
    codeExample: "Min: 0x80 | Max: 0x7F | Zero: 0x00 | Negative One: 0xFF"
  },
  {
    question: "Why can an n-bit 2's complement number represent -1 without requiring an explicit negative sign check in equality comparators?",
    shortAnswer: "Because -1 is encoded as all 1s (`0xFF...FF`), which is a unique bit pattern directly comparable via standard hardware equality gates.",
    explanation: "In Sign-Magnitude and 1's Complement, testing for -1 or 0 requires checking multiple bit combinations or handling dual zeros. In 2's complement, every integer maps to exactly one unique binary pattern.",
    hint: "Every single number has a 1-to-1 unique mapping in 2's complement.",
    level: "expert",
    codeExample: "-1 == 0xFFFFFFFF (Single unique bit pattern)"
  },
  {
    question: "Summarize the master table of dynamic ranges for n = 4, 8, 16, 32, and 64 bits in 2's Complement.",
    shortAnswer: "4-bit: [-8, 7]; 8-bit: [-128, 127]; 16-bit: [-32768, 32767]; 32-bit: [-2.14B, 2.14B]; 64-bit: [-9.22Q, 9.22Q].",
    explanation: "Remember the formula: [-2^(n-1) to +2^(n-1) - 1]. Each added bit doubles the representable span.",
    hint: "Every additional bit doubles the dynamic range capacity.",
    level: "expert",
    codeExample: "n-bit: [-2^(n-1), 2^(n-1) - 1] (Doubles with every bit)"
  }
];

export default questions;
