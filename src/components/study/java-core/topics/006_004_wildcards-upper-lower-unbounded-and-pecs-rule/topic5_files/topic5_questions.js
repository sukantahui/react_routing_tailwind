const topic5_questions = [
  {
    "question": "Why is 'List<? super Integer>' write-enabled for Integers, and what type can you read from it?",
    "shortAnswer": "'List<? super Integer>' accepts any list holding 'Integer' or any supertype of Integer (like 'Number' or 'Object'). Because an 'Integer' is guaranteed to be compatible with Integer, Number, and Object, it is 100% type-safe to add Integers into the list. However, when reading elements, you can ONLY read them as 'Object' because the underlying list could be a 'List<Object>'.",
    "explanation": "Core consumer role in Joshua Bloch's PECS principle.",
    "hint": "Safe to write Integers into the list; elements can only be read as Object.",
    "level": "Intermediate",
    "codeExample": "List<? super Integer> list = new ArrayList<Number>(); list.add(10); // OK; Object o = list.get(0);"
  }
];

export default topic5_questions;