const topic11_questions = [
  {
    "question": "Why is Try-with-Resources unanimously considered one of the greatest enhancements in Java history?",
    "shortAnswer": "Because it completely eradicated resource leak bugs, eliminated 80% of nested finally boilerplate, guaranteed reverse-order teardown, and introduced Suppressed Exceptions so secondary cleanup failures never mask critical primary business errors.",
    "explanation": "Effective Java Item 9: Always prefer try-with-resources to try-finally.",
    "hint": "Eradicates resource leaks, eliminates boilerplate, and prevents exception masking via suppressed errors.",
    "level": "Advanced",
    "codeExample": "try (var s = open()) { s.read(); } // Clean, safe, leak-proof"
  }
];

export default topic11_questions;