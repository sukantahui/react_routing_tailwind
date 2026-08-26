const topic2_questions = [
  {
    question: "What is the key difference between static and instance variables regarding object lifecycle?",
    shortAnswer: "Static variables are created once when the class is loaded and exist until the JVM terminates. Instance variables are created when 'new' is called and destroyed when garbage collected.",
    explanation: "Static lifecycle is bound to the class; instance lifecycle is bound to individual Heap allocations.",
    hint: "Class loading lifecycle vs object garbage collection lifecycle.",
    level: "Beginner",
    codeExample: "// Static: Class load to JVM shutdown\n// Instance: new to GC"
  }
];

export default topic2_questions;