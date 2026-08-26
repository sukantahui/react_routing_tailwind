const topic2_questions = [
  {
    "question": "What are the 3 distinct types of wildcards supported in Java Generics?",
    "shortAnswer": "1. 'Unbounded Wildcard' ('List<?>'): represents any unknown type. 2. 'Upper Bounded Wildcard' ('List<? extends T>'): represents 'T' or any subtype of 'T' (Covariance). 3. 'Lower Bounded Wildcard' ('List<? super T>'): represents 'T' or any supertype of 'T' (Contravariance).",
    "explanation": "Complete taxonomy forming the basis of the PECS principle.",
    "hint": "Unbounded (<?>), Upper Bounded (<? extends T>), and Lower Bounded (<? super T>).",
    "level": "Beginner",
    "codeExample": "List<?> a; List<? extends Number> b; List<? super Integer> c;"
  }
];

export default topic2_questions;