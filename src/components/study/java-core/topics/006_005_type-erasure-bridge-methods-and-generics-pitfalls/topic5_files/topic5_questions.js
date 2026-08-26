const topic5_questions = [
  {
    "question": "Why do all 7 fundamental restrictions of Java Generics exist?",
    "shortAnswer": "All 7 restrictions stem directly from 'Type Erasure'. Because generic type arguments are stripped during compilation, the JVM runtime bytecode has no information about the concrete type represented by 'T'. Therefore, runtime operations requiring exact type descriptors (like allocating memory for 'new T()', creating generic arrays, or catching generic exceptions) cannot be performed.",
    "explanation": "Comprehensive summary of generic limitations in the Java language.",
    "hint": "Because generic type information is erased at compile time and unavailable to the JVM runtime.",
    "level": "Intermediate",
    "codeExample": "// 'new T()', 'new T[10]', 'List<int>', 'catch(T e)' are all prohibited due to type erasure"
  }
];

export default topic5_questions;