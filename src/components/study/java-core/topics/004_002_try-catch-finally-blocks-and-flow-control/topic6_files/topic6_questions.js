const topic6_questions = [
  {
    "question": "Why is the exception parameter in a Java Multi-Catch block ('catch (IOException | SQLException ex)') implicitly final?",
    "shortAnswer": "Because the parameter 'ex' has a static union type. If reassignment were allowed, client code could assign an instance of 'IOException' to 'ex' while the active runtime branch was actually handling an 'SQLException', which would break static type safety and compiler type verification.",
    "explanation": "Therefore, the Java language specification mandates that multi-catch parameters are implicitly final.",
    "hint": "Prevents assigning one union type instance into an incompatible active branch.",
    "level": "Intermediate",
    "codeExample": "// multiEx = new SQLException(); // COMPILE ERROR: Cannot reassign final variable"
  }
];

export default topic6_questions;