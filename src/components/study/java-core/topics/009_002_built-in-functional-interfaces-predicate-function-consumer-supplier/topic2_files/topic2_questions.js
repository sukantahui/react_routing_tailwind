const topic2_questions = [
  {
    "question": "How is 'Predicate<T>' utilized to implement reusable, pluggable filtering logic across collections?",
    "shortAnswer": "'Predicate<T>' defines the SAM 'boolean test(T t)'. By accepting a 'Predicate<T>' as a method parameter (e.g. in 'filterStudents(list, predicate)'), the method is completely decoupled from the filtering criteria. Callers can pass any dynamic lambda expression or method reference (e.g. checking marks, verifying fee payment, or validating email format) without modifying the filtering loop algorithm, achieving 100% open-closed principle extensibility.",
    "explanation": "Practical application of Predicate<T> in collections filtering.",
    "hint": "Accepts Predicate<T> as a parameter to decouple the filtering algorithm from the business evaluation criteria.",
    "level": "Intermediate",
    "codeExample": "boolean isAdult = ((Predicate<Integer>) age → age >= 18).test(21);"
  }
];

export default topic2_questions;