const methodOverridingFaqs = [

  // 📘 BASIC LEVEL
  {
    question: "Can private methods be overridden?",
    shortAnswer: "No, private methods cannot be overridden.",
    explanation: "Private methods are not inherited by child classes. Since overriding depends on inheritance, private methods are not accessible in subclasses.",
    hint: "Can child class access private members?",
    level: "basic"
  },
  {
    question: "What is runtime polymorphism?",
    shortAnswer: "Method call resolved at runtime.",
    explanation: "In runtime polymorphism, the method that gets executed is determined by the actual object type, not the reference type.",
    hint: "Think: object type vs reference type",
    level: "basic"
  },
  {
    question: "What is the role of @Override annotation?",
    shortAnswer: "Ensures correct overriding.",
    explanation: "It tells the compiler that the method should override a parent method. If not, it throws a compile-time error.",
    hint: "Helps detect mistakes early",
    level: "basic"
  },
  {
    question: "Can constructors be overridden?",
    shortAnswer: "No, constructors cannot be overridden.",
    explanation: "Constructors are not inherited, so they cannot be overridden. They are called using super().",
    hint: "Overriding requires inheritance",
    level: "basic"
  },
  {
    question: "Can we change return type in overriding?",
    shortAnswer: "Yes, using covariant return type.",
    explanation: "The return type can be changed only if it is a subclass of the original return type.",
    hint: "Subtype allowed",
    level: "basic"
  },
  {
    question: "What happens if we don't override a method?",
    shortAnswer: "Parent method is used.",
    explanation: "If the child class does not override a method, it inherits and uses the parent class implementation.",
    hint: "Inheritance default behavior",
    level: "basic"
  },
  {
    question: "Can abstract methods be overridden?",
    shortAnswer: "Yes, they must be overridden.",
    explanation: "Abstract methods do not have implementation, so subclasses must provide implementation.",
    hint: "Mandatory override",
    level: "basic"
  },
  {
    question: "Can we increase visibility while overriding?",
    shortAnswer: "Yes, visibility can be increased.",
    explanation: "A method can be made more accessible (e.g., protected → public), but not less accessible.",
    hint: "Access can expand",
    level: "basic"
  },
  {
    question: "What is method hiding?",
    shortAnswer: "Static methods are hidden, not overridden.",
    explanation: "Static methods belong to class, not object. So they are resolved at compile-time and hidden instead of overridden.",
    hint: "Static = compile-time",
    level: "basic"
  },
  {
    question: "Difference between overloading and overriding?",
    shortAnswer: "Overloading = same class, overriding = inheritance.",
    explanation: "Overloading uses different parameters, overriding uses same signature in subclass.",
    hint: "Compile-time vs runtime",
    level: "basic"
  },

  // 🚀 INTERMEDIATE LEVEL
  {
    question: "Can static methods be overridden?",
    shortAnswer: "No, they are hidden.",
    explanation: "Static methods belong to class, so they are resolved at compile-time and cannot be overridden.",
    hint: "Static methods are not polymorphic",
    level: "intermediate"
  },
  {
    question: "Can final methods be overridden?",
    shortAnswer: "No, final methods cannot be overridden.",
    explanation: "The final keyword prevents method overriding to ensure behavior remains unchanged.",
    hint: "Final = no change allowed",
    level: "intermediate"
  },
  {
    question: "What is super keyword in overriding?",
    shortAnswer: "Used to call parent method.",
    explanation: "super allows access to parent class methods that are overridden in the child class.",
    hint: "Call parent version",
    level: "intermediate"
  },
  {
    question: "Can interface methods be overridden?",
    shortAnswer: "Yes, they must be implemented.",
    explanation: "All abstract methods in interfaces must be implemented (overridden) by the class.",
    hint: "Interfaces require implementation",
    level: "intermediate"
  },
  {
    question: "What is dynamic binding?",
    shortAnswer: "Method call resolved at runtime.",
    explanation: "Dynamic binding ensures the correct overridden method is called based on object type.",
    hint: "Runtime decision",
    level: "intermediate"
  },
  {
    question: "Can overriding method throw exceptions?",
    shortAnswer: "Yes, but with restrictions.",
    explanation: "Child method cannot throw broader checked exceptions than parent method.",
    hint: "Exception hierarchy matters",
    level: "intermediate"
  },
  {
    question: "Can we override methods from Object class?",
    shortAnswer: "Yes.",
    explanation: "Methods like toString(), equals(), and hashCode() can be overridden for custom behavior.",
    hint: "Commonly overridden methods",
    level: "intermediate"
  },
  {
    question: "What happens if method signature differs slightly?",
    shortAnswer: "It becomes overloading.",
    explanation: "Even a small change in parameters results in a different method, not overriding.",
    hint: "Exact match required",
    level: "intermediate"
  },
  {
    question: "Can we override a method and make it final?",
    shortAnswer: "Yes.",
    explanation: "A child class can override a method and prevent further overriding using final keyword.",
    hint: "Stops further inheritance",
    level: "intermediate"
  },
  {
    question: "Can we override synchronized methods?",
    shortAnswer: "Yes.",
    explanation: "Synchronization is not part of method signature, so it can be added or removed.",
    hint: "Not part of signature",
    level: "intermediate"
  },

  // 🔥 EXPERT LEVEL
  {
    question: "What happens if parent method is static and child defines non-static?",
    shortAnswer: "Compilation error.",
    explanation: "Static and non-static methods cannot override each other due to different binding mechanisms.",
    hint: "Mismatch type",
    level: "expert"
  },
  {
    question: "Can overriding method throw unchecked exception?",
    shortAnswer: "Yes.",
    explanation: "Unchecked exceptions are not restricted in overriding.",
    hint: "Runtime exceptions",
    level: "expert"
  },
  {
    question: "Can we override methods from multiple interfaces?",
    shortAnswer: "Yes.",
    explanation: "A single implementation satisfies all interface methods with same signature.",
    hint: "One method, many interfaces",
    level: "expert"
  },
  {
    question: "What if two interfaces have same default method?",
    shortAnswer: "Must override it.",
    explanation: "The class must resolve ambiguity by overriding the method explicitly.",
    hint: "Diamond problem",
    level: "expert"
  },
  {
    question: "Can we call overridden method using parent reference?",
    shortAnswer: "Yes, but runtime decides.",
    explanation: "Method execution depends on actual object type, not reference type.",
    hint: "Polymorphism rule",
    level: "expert"
  },
  {
    question: "Can we override methods in anonymous classes?",
    shortAnswer: "Yes.",
    explanation: "Anonymous classes commonly override methods inline.",
    hint: "Inline subclass",
    level: "expert"
  },
  {
    question: "What is bridge method?",
    shortAnswer: "Compiler-generated method.",
    explanation: "Bridge methods ensure polymorphism works with generics after type erasure.",
    hint: "JVM internal concept",
    level: "expert"
  },
  {
    question: "How does overriding work with generics?",
    shortAnswer: "Based on erased types.",
    explanation: "Due to type erasure, overriding works on raw types at runtime.",
    hint: "Generics removed at runtime",
    level: "expert"
  },
  {
    question: "Can default methods be overridden?",
    shortAnswer: "Yes.",
    explanation: "Default methods in interfaces can be overridden by implementing classes.",
    hint: "Java 8 feature",
    level: "expert"
  },
  {
    question: "What is performance impact of overriding?",
    shortAnswer: "Slight overhead.",
    explanation: "Dynamic method dispatch is slightly slower than static binding, but negligible in real-world use.",
    hint: "Runtime resolution",
    level: "expert"
  }

];

export default methodOverridingFaqs;