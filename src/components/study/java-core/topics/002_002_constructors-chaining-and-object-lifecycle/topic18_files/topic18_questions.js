const topic18_questions = [
  {
    question: "What is the Telescoping Constructor Pattern in enterprise domain modeling?",
    shortAnswer: "A pattern where a class provides multiple overloaded constructors starting from mandatory parameters, chaining each into a master constructor with default values for optional fields.",
    explanation: "It provides clean, flexible instantiation while ensuring mandatory invariants are never omitted.",
    hint: "Overloaded constructors cascading into a single master constructor.",
    level: "Intermediate",
    codeExample: "User(id, name) → User(id, name, email) → Master(id, name, email, role, phone)"
  },
  {
    question: "When should the Telescoping Constructor Pattern be refactored into the Builder Pattern?",
    shortAnswer: "When a class has more than 4 or 5 optional parameters of the same data type (e.g. multiple booleans or Strings), which can lead to parameter ordering confusion.",
    explanation: "Builders provide named fluent methods, preventing accidental swapping of adjacent boolean/String arguments.",
    hint: "Use Builder when optional parameters exceed 4-5 or have identical types.",
    level: "Advanced",
    codeExample: "User.builder().name(\"Swadeep\").hostel(true).build();"
  }
];

export default topic18_questions;