const questions = [
  {
    question: "What are the 6 categories of C tokens?",
    shortAnswer: "Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators.",
    explanation: "Tokens are the smallest individual units in a C source file that the compiler processes during lexical analysis.",
    hint: "Think of tokens as words in a sentence.",
    level: "basic"
  },
  {
    question: "Why should we use exact-width integer types from <stdint.h> like int32_t or uint8_t?",
    shortAnswer: "They guarantee exact bit sizes across all hardware platforms and compilers.",
    explanation: "Standard types like int can vary from 2 to 4 bytes depending on 16-bit or 32-bit hardware. uint8_t is guaranteed to be exactly 8 bits (1 byte) everywhere.",
    hint: "Essential for network protocols and embedded hardware.",
    level: "intermediate"
  },
  {
    question: "What is the difference between prefix (++i) and postfix (i++) operators?",
    shortAnswer: "Prefix increments before evaluating the expression; postfix increments after evaluating.",
    explanation: "int a = 5; int b = ++a (b=6, a=6); whereas int a = 5; int b = a++ (b=5, a=6).",
    hint: "Pre = change first, use next; Post = use first, change next.",
    level: "basic"
  },
  {
    question: "How does the bitwise shift left operator (<<) multiply by powers of 2?",
    shortAnswer: "Shifting bits left by N positions multiplies the integer by 2^N.",
    explanation: "5 << 1 shifts binary 00000101 to 00001010 (10 decimal). 5 << 2 produces 20.",
    hint: "x << n is equivalent to x * (2^n).",
    level: "intermediate"
  },
  {
    question: "What is operator precedence vs associativity in C?",
    shortAnswer: "Precedence dictates which operator evaluates first; associativity dictates order when precedence is tied.",
    explanation: "In a + b * c, * has higher precedence than +. In a - b - c, both are - so left-to-right associativity evaluates (a - b) - c.",
    hint: "Parentheses () override default precedence.",
    level: "intermediate"
  }
];

export default questions;
