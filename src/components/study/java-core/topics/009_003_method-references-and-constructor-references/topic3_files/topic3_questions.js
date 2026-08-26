const topic3_questions = [
  {
    "question": "How does the Java compiler resolve a Static Method Reference ('ClassName::staticMethodName') to a functional interface SAM?",
    "shortAnswer": "When using 'ClassName::staticMethodName', the compiler verifies that the referenced static method's parameter list and return type match the parameter list and return type of the functional interface SAM. For example, 'Math::max' takes two ints '(int, int)' and returns an int, exactly matching 'BinaryOperator<Integer>' ('Integer apply(Integer, Integer)'). The compiler emits bytecode invoking that static method with the SAM arguments directly.",
    "explanation": "Static method reference mechanics and parameter matching.",
    "hint": "ClassName::staticMethodName matches parameters 1:1 with the functional interface arguments.",
    "level": "Beginner",
    "codeExample": "BinaryOperator<Integer> max = Math::max; Function<String, Integer> p = Integer::parseInt;"
  }
];

export default topic3_questions;