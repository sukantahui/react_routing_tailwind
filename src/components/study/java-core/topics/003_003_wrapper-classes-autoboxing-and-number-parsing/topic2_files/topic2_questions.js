const topic2_questions = [
  {
    question: "What is the common abstract superclass of the 6 numeric wrapper classes in Java?",
    shortAnswer: "'java.lang.Number'. The 6 numeric wrappers (Byte, Short, Integer, Long, Float, Double) as well as BigInteger and BigDecimal extend Number. Character and Boolean directly extend java.lang.Object.",
    explanation: "Number declares abstract casting methods: intValue(), doubleValue(), longValue(), floatValue(), byteValue(), shortValue().",
    hint: "java.lang.Number is the superclass of numeric wrappers.",
    level: "Intermediate",
    codeExample: "Number n = 42; double d = n.doubleValue();"
  }
];

export default topic2_questions;