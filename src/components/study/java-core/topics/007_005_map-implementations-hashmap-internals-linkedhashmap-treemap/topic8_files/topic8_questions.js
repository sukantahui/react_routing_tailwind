const topic8_questions = [
  {
    "question": "Why is '(n - 1) & hash' mathematically identical to 'hash % n' when 'n' is a power of two?",
    "shortAnswer": "When 'n' is a power of two (e.g. 2^k = 16), the remainder of any integer divided by 2^k consists of the value represented by its lowest 'k' binary bits. The bitmask '(n - 1)' (e.g. 15 = binary 1111) has exactly 'k' trailing 1s. Performing a bitwise AND '&' zeroes out all bits above position 'k-1', retaining only the lowest 'k' bits, which is mathematically identical to 'hash % n', but executes in 1 CPU cycle.",
    "explanation": "Fundamental bitwise arithmetic theorem.",
    "hint": "Bitmasking with 2^k - 1 extracts the lowest k bits, exactly matching the remainder of dividing by 2^k.",
    "level": "Intermediate",
    "codeExample": "int bucket = (16 - 1) & hash; // 15 & hash (Identical to hash % 16)"
  }
];

export default topic8_questions;