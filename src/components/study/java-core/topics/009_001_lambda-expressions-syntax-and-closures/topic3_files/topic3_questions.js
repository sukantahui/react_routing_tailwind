const topic3_questions = [
  {
    "question": "What is 'Target Typing' in Java and how does the compiler deduce the type of a lambda expression?",
    "shortAnswer": "In Java, a lambda expression does not have an intrinsic type of its own. The Java compiler performs 'Target Typing' by inspecting the surrounding contextual type (the 'Target Type') where the lambda is assigned, passed, or returned. For a lambda to be compatible, the target type must be a Functional Interface whose Single Abstract Method (SAM) descriptor matches the lambda's parameter count, parameter types, return type, and thrown exceptions.",
    "explanation": "Core type inference mechanism of Java 8 Lambda Expressions.",
    "hint": "Lambda has no type of its own; compiler infers its interface type from variable assignment, method parameter, or cast context.",
    "level": "Intermediate",
    "codeExample": "Callable<String> c = () → \"Hello\"; Supplier<String> s = () → \"Hello\"; // Same lambda, different target types!"
  }
];

export default topic3_questions;