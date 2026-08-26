const topic15_questions = [
  {
    "question": "What does the IDENTITY_FINISH characteristic signify in a Collector?",
    "shortAnswer": "IDENTITY_FINISH indicates that the accumulator type A is identical to the final result type R and the finisher function is an unchecked identity cast. The stream engine can skip calling finisher() entirely.",
    "explanation": "Optimizes execution by avoiding an extra function call.",
    "hint": "Finisher function is identity; container A is returned directly as R.",
    "level": "Intermediate",
    "codeExample": "Characteristics.IDENTITY_FINISH"
  },
  {
    "question": "What generic types T, A, R represent in Collector<T, A, R>?",
    "shortAnswer": "T is the input stream element type; A is the intermediate mutable accumulator type; R is the final output result type produced by the finisher.",
    "explanation": "For example, in Collectors.joining(), T is CharSequence, A is StringBuilder/StringJoiner, and R is String.",
    "hint": "T = Input, A = Accumulator, R = Result.",
    "level": "Intermediate",
    "codeExample": "Collector<CharSequence, StringJoiner, String>"
  }
];

export default topic15_questions;
