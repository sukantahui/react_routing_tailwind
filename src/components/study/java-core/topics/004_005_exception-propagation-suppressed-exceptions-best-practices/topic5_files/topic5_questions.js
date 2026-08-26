const topic5_questions = [
  {
    "question": "What is the difference between chaining exceptions via 'super(message, cause)' vs 'throwable.initCause(cause)' in Java?",
    "shortAnswer": "'super(message, cause)' is the preferred modern constructor approach, creating an immutable chained exception at instantiation time. 'initCause()' is a legacy method allowing post-creation cause attachment on older exception classes that lacked cause constructors. 'initCause()' can only be invoked ONCE on an instance; calling it again throws IllegalStateException.",
    "explanation": "Both mechanisms populate the cause field retrieved via getCause().",
    "hint": "super(msg, cause) in constructor is preferred; initCause() is for legacy classes and can only run once.",
    "level": "Intermediate",
    "codeExample": "MyEx ex = new MyEx(\"msg\"); ex.initCause(rootCause);"
  }
];

export default topic5_questions;