const topic1_questions = [
  {
    "question": "What core diagnostic methods are available on the exception object caught inside a 'catch (Exception ex)' block?",
    "shortAnswer": "1. 'ex.getMessage()': Returns the detailed descriptive error string. 2. 'ex.getClass().getName()': Returns the exact runtime exception type. 3. 'ex.getCause()': Returns the underlying chained root cause. 4. 'ex.printStackTrace()': Prints the complete call-stack history leading up to the point of failure.",
    "explanation": "Logging these diagnostics with SLF4J/Logback is essential in enterprise systems.",
    "hint": "getMessage(), getCause(), and printStackTrace() provide full diagnostic context.",
    "level": "Beginner",
    "codeExample": "catch (Exception e) { log.error(\"Operation failed: {}\", e.getMessage(), e); }"
  }
];

export default topic1_questions;