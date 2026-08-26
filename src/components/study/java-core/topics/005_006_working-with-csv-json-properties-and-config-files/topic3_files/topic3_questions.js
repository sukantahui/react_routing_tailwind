const topic3_questions = [
  {
    "question": "How does 'properties.getProperty(key, defaultValue)' prevent NullPointerExceptions in application bootstrap logic?",
    "shortAnswer": "If the requested key does NOT exist in the Properties table, 'getProperty(key, defaultValue)' returns the provided fallback default String instead of 'null'. This prevents downstream code from throwing NullPointerExceptions when parsing numeric integers or booleans (e.g. 'Integer.parseInt(props.getProperty(\"port\", \"8080\"))').",
    "explanation": "Standard defensive pattern for all microservice configuration parameters.",
    "hint": "Returns the safe default string instead of null when the key is missing.",
    "level": "Beginner",
    "codeExample": "int port = Integer.parseInt(props.getProperty(\"port\", \"8080\"));"
  }
];

export default topic3_questions;