const topic9_questions = [
  {
    "question": "What does Joshua Bloch's 'PECS' mnemonic stand for in Effective Java Item 31, and when should each wildcard be used?",
    "shortAnswer": "PECS stands for 'Producer Extends, Consumer Super'. 1. Use '? extends T' if a parameterized type represents a 'Producer' (your method reads/extracts items from it). 2. Use '? super T' if a parameterized type represents a 'Consumer' (your method writes/stores items into it). 3. If a parameter is both a producer AND a consumer, do not use wildcards—use exact type parameters ('List<T>').",
    "explanation": "The single most famous and influential API design rule in Java history.",
    "hint": "Producer Extends, Consumer Super; use extends for reading, super for writing, exact type if doing both.",
    "level": "Advanced",
    "codeExample": "public static <T> void copy(List<? super T> dest, List<? extends T> src)"
  }
];

export default topic9_questions;