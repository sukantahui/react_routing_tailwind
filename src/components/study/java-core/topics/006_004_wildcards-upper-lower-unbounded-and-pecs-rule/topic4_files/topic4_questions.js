const topic4_questions = [
  {
    "question": "What subtyping relationship does 'List<? extends Number>' establish (Covariance vs Contravariance), and what type can you safely read from it?",
    "shortAnswer": "'List<? extends Number>' establishes a 'Covariant' relationship, allowing 'List<Integer>', 'List<Double>', or any subtype list to be assigned to it. You can safely READ elements from it as 'Number' (or 'Object'), but you CANNOT write/add elements into it because the compiler does not know the exact concrete subtype.",
    "explanation": "Core producer role in Joshua Bloch's PECS principle.",
    "hint": "Establishes Covariance; elements can be read safely as Number.",
    "level": "Intermediate",
    "codeExample": "List<? extends Number> list = new ArrayList<Integer>(); Number n = list.get(0); // Valid read"
  }
];

export default topic4_questions;