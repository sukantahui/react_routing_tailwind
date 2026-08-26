const topic12_questions = [
  {
    "question": "What is the recommended default collection implementation for linear data in Java when no special requirements are specified, and why?",
    "shortAnswer": "'ArrayList<E>' is the recommended default for linear collections. It offers contiguous memory locality (cache-friendly), blazing fast O(1) random index access, minimal memory overhead per element (raw pointer array), and highly optimized bulk array copying intrinsics.",
    "explanation": "Effective Java Item 64: Strive to use standard collection idioms.",
    "hint": "ArrayList is the universal default due to CPU cache locality and O(1) index access.",
    "level": "Beginner",
    "codeExample": "List<Student> students = new ArrayList<>(); // Default choice for linear data"
  }
];

export default topic12_questions;