const topic6_questions = [
  {
    "question": "Summarize the complete Read/Write rule matrix for 'List<?>', 'List<? extends T>', and 'List<? super T>'.",
    "shortAnswer": "1. 'List<?>': Reads as 'Object', Writes prohibited (only null). 2. 'List<? extends T>': Reads as 'T' (Data Producer), Writes prohibited (only null). 3. 'List<? super T>': Reads as 'Object', Writes permitted for 'T' and subtypes of 'T' (Data Consumer).",
    "explanation": "The foundational mental model for all Java generic collection manipulation.",
    "hint": "extends = read as T, no write; super = write as T, read as Object; ? = read as Object, no write.",
    "level": "Intermediate",
    "codeExample": "List<? extends T> prod; T t = prod.get(0); List<? super T> cons; cons.add(t);"
  }
];

export default topic6_questions;