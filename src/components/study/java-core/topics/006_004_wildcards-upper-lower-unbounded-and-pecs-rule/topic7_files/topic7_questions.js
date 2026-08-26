const topic7_questions = [
  {
    "question": "Why does the Java compiler prevent calling 'add(element)' on a collection declared with '? extends T'?",
    "shortAnswer": "Because '? extends T' means the list holds some specific, unknown subtype of 'T'. For example, if the caller passed an 'ArrayList<Integer>', and the method was allowed to call 'add(Double)', it would insert a Double into an Integer list. Since the compiler cannot know which specific subtype was passed at runtime, it disallows all element additions.",
    "explanation": "Ensures type invariants are strictly maintained.",
    "hint": "The concrete subtype is unknown at compile time, so adding elements would risk inserting incompatible types.",
    "level": "Intermediate",
    "codeExample": "List<? extends Number> list = new ArrayList<Integer>(); // list.add(10.5) must be blocked!"
  }
];

export default topic7_questions;