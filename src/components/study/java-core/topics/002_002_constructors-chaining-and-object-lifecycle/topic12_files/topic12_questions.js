const topic12_questions = [
  {
    question: "What is the key architectural difference between a Static Initialization Block (SIB) and an Instance Initialization Block (IIB)?",
    shortAnswer: "A SIB executes ONCE when the class is loaded into Metaspace by the JVM ClassLoader, while an IIB executes ON EVERY object instantiation ('new').",
    explanation: "SIBs configure class-level state (drivers, configuration files, static constants). IIBs configure per-instance state before constructors run.",
    hint: "Once at class loading (SIB) vs on every new instantiation (IIB).",
    level: "Beginner",
    codeExample: "static { /* SIB: runs once */ }\n{ /* IIB: runs on every new */ }"
  },
  {
    question: "In what order do SIBs and IIBs execute in a parent-child inheritance hierarchy?",
    shortAnswer: "1. Parent SIB -> 2. Child SIB -> 3. Parent IIB -> 4. Parent Constructor -> 5. Child IIB -> 6. Child Constructor.",
    explanation: "Class loading must complete for the entire hierarchy before any instance allocation begins.",
    hint: "Parent SIB -> Child SIB -> Parent IIB -> Parent Const -> Child IIB -> Child Const.",
    level: "Intermediate",
    codeExample: "// Full JVM hierarchy order"
  },
  {
    question: "Can an SIB access instance variables or the 'this' keyword?",
    shortAnswer: "No! SIBs execute at class level when zero objects exist in the Heap. Accessing 'this' or instance fields causes a compile error.",
    explanation: "Static context has no 'this' receiver pointer.",
    hint: "No instance context in SIB; 'this' is inaccessible.",
    level: "Beginner",
    codeExample: "// Compile Error: static { this.x = 10; }"
  },
  {
    question: "Can an IIB access static variables?",
    shortAnswer: "Yes! IIBs have full access to both static (class-level) and instance variables.",
    explanation: "Instance contexts can freely read and mutate static state.",
    hint: "IIBs can access both static and instance variables.",
    level: "Beginner",
    codeExample: "{ staticCounter++; this.instanceId = staticCounter; }"
  },
  {
    question: "What is the classroom analogy by Sukanta Hui for SIB vs IIB?",
    shortAnswer: "SIB is turning on the main electrical transformer and building the Barrackpore campus (done ONCE at inauguration); IIB is turning on a trainee's computer each time Swadeep or Tuhina sits at a desk!",
    explanation: "Campus building = SIB; individual student workstation = IIB.",
    hint: "Campus building (SIB) vs student workstation power-on (IIB).",
    level: "Beginner",
    codeExample: "// SIB = Campus Setup; IIB = Student Seat Init"
  }
];

export default topic12_questions;