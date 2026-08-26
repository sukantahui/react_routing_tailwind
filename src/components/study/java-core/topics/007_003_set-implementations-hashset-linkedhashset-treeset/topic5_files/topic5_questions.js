const topic5_questions = [
  {
    "question": "What catastrophic bug occurs if an object's fields used in 'hashCode()' are mutated after the object is inserted into a 'HashSet'?",
    "shortAnswer": "The object becomes 'lost' (unreachable) inside the HashSet. When inserted, the object is placed into a bucket determined by its original hash code. When mutated, its new hash code points to a completely different bucket. Subsequent calls to 'contains(obj)' or 'remove(obj)' look in the new (wrong) bucket and return 'false', causing the element to be permanently trapped in the old bucket, creating a memory leak and phantom state.",
    "explanation": "Effective Java Item 11 & Item 17: Minimize mutability.",
    "hint": "The mutated hash points to a different bucket, making the object unfindable while still occupying memory.",
    "level": "Advanced",
    "codeExample": "student.setId(999); set.contains(student); // returns FALSE! Object is lost!"
  }
];

export default topic5_questions;