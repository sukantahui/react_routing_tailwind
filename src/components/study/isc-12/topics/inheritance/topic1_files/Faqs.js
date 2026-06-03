// questions.js
const questions = [
  // 📘 BASIC LEVEL
  {
    question: "What is single inheritance?",
    shortAnswer: "One child inherits from one parent.",
    explanation: "In single inheritance, a class extends only one parent class and inherits its properties and methods.",
    hint: "One parent → one child",
    level: "basic",
    codeExample: "class Parent { } class Child extends Parent { }"
  },
  {
    question: "What is multilevel inheritance?",
    shortAnswer: "A chain of inheritance.",
    explanation: "In multilevel inheritance, a class inherits from another class, which itself inherits from another class, forming a chain.",
    hint: "Grandparent → Parent → Child",
    level: "basic",
    codeExample: "class GrandParent { } class Parent extends GrandParent { } class Child extends Parent { }"
  },
  {
    question: "What is hierarchical inheritance?",
    shortAnswer: "Multiple children inherit from one parent.",
    explanation: "In hierarchical inheritance, multiple classes inherit from a single parent class.",
    hint: "One parent → many children",
    level: "basic",
    codeExample: "class Parent { } class ChildA extends Parent { } class ChildB extends Parent { }"
  },
  {
    question: "Which inheritance type is most simple?",
    shortAnswer: "Single inheritance.",
    explanation: "Single inheritance is simplest because it involves only one parent and one child class.",
    hint: "No complexity",
    level: "basic"
  },
  {
    question: "Does Java support multiple inheritance using classes?",
    shortAnswer: "No.",
    explanation: "Java does not support multiple inheritance using classes to avoid ambiguity problems.",
    hint: "Diamond problem",
    level: "basic"
  },
  {
    question: "Which keyword is used for inheritance in Java?",
    shortAnswer: "extends",
    explanation: "The 'extends' keyword is used to inherit properties and methods from a parent class.",
    hint: "extends keyword",
    level: "basic"
  },
  {
    question: "Can a class have more than one child in hierarchical inheritance?",
    shortAnswer: "Yes.",
    explanation: "One parent class can have multiple child classes inheriting from it.",
    hint: "Multiple subclasses",
    level: "basic"
  },
  {
    question: "What is the benefit of inheritance?",
    shortAnswer: "Code reuse.",
    explanation: "Inheritance allows reuse of code and reduces redundancy.",
    hint: "Avoid duplication",
    level: "basic"
  },
  {
    question: "Can a class extend itself?",
    shortAnswer: "No.",
    explanation: "A class cannot inherit from itself as it creates circular dependency.",
    hint: "Logical error",
    level: "basic"
  },
  {
    question: "What is the top-most class in Java inheritance?",
    shortAnswer: "Object class.",
    explanation: "Every class in Java implicitly extends the Object class.",
    hint: "Root class",
    level: "basic"
  },

  // 🚀 INTERMEDIATE LEVEL
  {
    question: "What happens in multilevel inheritance method overriding?",
    shortAnswer: "Closest method is called.",
    explanation: "The method in the most derived class overrides all previous implementations.",
    hint: "Child has priority",
    level: "intermediate"
  },
  {
    question: "Can hierarchical inheritance lead to code duplication?",
    shortAnswer: "No, it reduces duplication.",
    explanation: "Common code is placed in parent class and reused by all child classes.",
    hint: "Shared parent",
    level: "intermediate"
  },
  {
    question: "How does constructor chaining work in multilevel inheritance?",
    shortAnswer: "From top to bottom.",
    explanation: "Constructors are called in order from parent to child using super().",
    hint: "Top-down execution",
    level: "intermediate"
  },
  {
    question: "Can we combine single and multilevel inheritance?",
    shortAnswer: "Yes.",
    explanation: "Inheritance types can be combined to create complex class hierarchies.",
    hint: "Hybrid structure",
    level: "intermediate"
  },
  {
    question: "What is method resolution order in multilevel inheritance?",
    shortAnswer: "Child → Parent → Grandparent.",
    explanation: "Java searches for method from current class up the inheritance chain.",
    hint: "Bottom-up search",
    level: "intermediate"
  },
  {
    question: "Can we override methods in hierarchical inheritance?",
    shortAnswer: "Yes.",
    explanation: "Each child class can override parent methods independently.",
    hint: "Different behaviors",
    level: "intermediate"
  },
  {
    question: "Is multilevel inheritance allowed in Java?",
    shortAnswer: "Yes.",
    explanation: "Java fully supports multilevel inheritance through class chaining.",
    hint: "Chain allowed",
    level: "intermediate"
  },
  {
    question: "Can we use super keyword in multilevel inheritance?",
    shortAnswer: "Yes.",
    explanation: "super can access immediate parent class members.",
    hint: "Direct parent only",
    level: "intermediate"
  },
  {
    question: "What is ambiguity problem in inheritance?",
    shortAnswer: "Confusion due to multiple inheritance.",
    explanation: "Occurs when a class inherits same method from multiple parents.",
    hint: "Diamond problem",
    level: "intermediate"
  },
  {
    question: "Why Java avoids multiple inheritance with classes?",
    shortAnswer: "To avoid ambiguity.",
    explanation: "Multiple inheritance can create confusion in method resolution.",
    hint: "Conflict issue",
    level: "intermediate"
  },

  // 🔥 EXPERT LEVEL
  {
    question: "How does JVM handle method lookup in multilevel inheritance?",
    shortAnswer: "Dynamic method dispatch.",
    explanation: "JVM determines method at runtime by checking actual object type.",
    hint: "Runtime decision",
    level: "expert"
  },
  {
    question: "What happens if same method exists in all levels?",
    shortAnswer: "Child version executes.",
    explanation: "Overridden method in child class overrides all previous versions.",
    hint: "Latest override wins",
    level: "expert"
  },
  {
    question: "Can hierarchical inheritance improve maintainability?",
    shortAnswer: "Yes.",
    explanation: "Common logic in parent improves maintainability and reduces duplication.",
    hint: "Centralized logic",
    level: "expert"
  },
  {
    question: "What is tight coupling in inheritance?",
    shortAnswer: "Strong dependency between classes.",
    explanation: "Child class depends heavily on parent implementation.",
    hint: "Risk in design",
    level: "expert"
  },
  {
    question: "How does inheritance affect memory allocation?",
    shortAnswer: "Single object contains all members.",
    explanation: "Child object contains inherited properties in memory layout.",
    hint: "Single object model",
    level: "expert"
  },
  {
    question: "Can multilevel inheritance cause performance issues?",
    shortAnswer: "Slightly, but negligible.",
    explanation: "Long inheritance chains may slightly affect lookup time.",
    hint: "Deep hierarchy",
    level: "expert"
  },
  {
    question: "What is diamond problem in inheritance?",
    shortAnswer: "Ambiguity in multiple inheritance.",
    explanation: "Occurs when two classes inherit from same parent and child inherits both.",
    hint: "Multiple paths",
    level: "expert"
  },
  {
    question: "How is diamond problem solved in Java?",
    shortAnswer: "Using interfaces.",
    explanation: "Java avoids it by not allowing multiple inheritance with classes.",
    hint: "Interfaces only",
    level: "expert"
  },
  {
    question: "Can hierarchical inheritance affect polymorphism?",
    shortAnswer: "Yes.",
    explanation: "Different child classes can provide different implementations of same method.",
    hint: "Same method, different behavior",
    level: "expert"
  },
  {
    question: "What is best practice for inheritance design?",
    shortAnswer: "Use when 'is-a' relationship exists.",
    explanation: "Inheritance should represent real-world relationships and avoid misuse.",
    hint: "is-a relationship",
    level: "expert"
  }
];

export default questions;