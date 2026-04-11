// topic4_questions.js - 30 moderate to expert questions
const questions = [
  {
    question: "What is the purpose of super() in a subclass constructor?",
    shortAnswer: "To invoke the superclass constructor.",
    explanation: "super() must be the first statement in a subclass constructor. It ensures that the inherited part of the object is properly initialized before subclass-specific code runs.",
    hint: "Think about building a house: foundation first.",
    level: "basic",
    codeExample: "class Parent { Parent() {} } class Child extends Parent { Child() { super(); } }"
  },
  {
    question: "What happens if a subclass constructor does not explicitly call super()?",
    shortAnswer: "Java inserts an implicit super() call to the no-arg constructor of the parent.",
    explanation: "If the parent has a no-arg constructor, it's called automatically. If not, compilation fails.",
    hint: "Check if parent class has a default constructor.",
    level: "basic",
    codeExample: "class Parent { Parent(int x) {} } // no default\nclass Child extends Parent { Child() {} } // error"
  },
  {
    question: "Can constructors be inherited in Java?",
    shortAnswer: "No, constructors are not inherited.",
    explanation: "Each class defines its own constructors. A subclass must call superclass constructors explicitly or implicitly.",
    hint: "If inherited, all parent constructors would exist in child — that's not the case.",
    level: "basic",
    codeExample: "class A { A(){} } class B extends A { // does not get A() automatically }"
  },
  {
    question: "What is constructor chaining?",
    shortAnswer: "The process where one constructor calls another constructor in the same class (this()) or parent class (super()).",
    explanation: "Chaining ensures all levels of a class hierarchy are initialized.",
    hint: "Look at the sequence of constructor calls when creating an object.",
    level: "intermediate",
    codeExample: "class A { A() { System.out.println(\"A\"); } }\nclass B extends A { B() { super(); System.out.println(\"B\"); } }"
  },
  {
    question: "What will be the output of: class Parent { Parent() { System.out.print(\"P \"); } }\nclass Child extends Parent { Child() { System.out.print(\"C \"); } }\nnew Child();",
    shortAnswer: "P C",
    explanation: "Parent constructor runs first, then Child constructor.",
    hint: "Order of execution follows the chain.",
    level: "basic",
    codeExample: "Output: P C"
  },
  {
    question: "If a parent class has only a parameterized constructor, what must the child do?",
    shortAnswer: "The child must explicitly call super(parameters) as the first statement in its constructor.",
    explanation: "Otherwise, the implicit super() tries to call a non-existent no-arg constructor -> compile error.",
    hint: "Superclass has no default constructor.",
    level: "intermediate",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent { Child() { super(10); } }"
  },
  {
    question: "Can a constructor call both super() and this()?",
    shortAnswer: "No, because both must be the first statement in a constructor.",
    explanation: "You can choose either super() (call parent constructor) or this() (call another constructor of same class), but not both.",
    hint: "Two first statements are impossible.",
    level: "advanced",
    codeExample: "// error: call to this must be first statement\nclass A { A() { this(5); super(); } }"
  },
  {
    question: "What is the difference between super() and super keyword?",
    shortAnswer: "super() calls the parent constructor; super refers to the parent class object and can access members.",
    explanation: "Use super() only inside constructors (first line); super.method() or super.field anywhere.",
    hint: "Parentheses make the difference.",
    level: "intermediate",
    codeExample: "super(); // constructor call\nsuper.display(); // method call"
  },
  {
    question: "Does a subclass inherit private constructors?",
    shortAnswer: "No. Private constructors cannot be accessed by subclasses.",
    explanation: "If all constructors are private, the class cannot be subclassed (unless using nested classes).",
    hint: "Access modifiers matter.",
    level: "advanced",
    codeExample: "class A { private A() {} }\nclass B extends A { } // error"
  },
  {
    question: "What is the output? class A { A() { System.out.print(\"A \"); } }\nclass B extends A { B() { System.out.print(\"B \"); } }\nclass C extends B { C() { System.out.print(\"C \"); } }\nnew C();",
    shortAnswer: "A B C",
    explanation: "Constructors are called from the top of the hierarchy down to the subclass.",
    hint: "Multilevel inheritance chain.",
    level: "basic",
    codeExample: "Output: A B C"
  },
  {
    question: "Can a subclass have a constructor with a different parameter list than any parent constructor?",
    shortAnswer: "Yes, but it must still call a parent constructor using super() with appropriate arguments.",
    explanation: "The child's parameters are independent, but it must match some parent constructor via super().",
    hint: "Use super(arguments) to satisfy parent requirements.",
    level: "intermediate",
    codeExample: "class Parent { Parent(String s) {} }\nclass Child extends Parent { Child(int x) { super(\"default\"); } }"
  },
  {
    question: "What happens if a constructor throws an exception and the parent constructor also throws?",
    shortAnswer: "The child constructor must handle or declare the parent constructor's exception.",
    explanation: "Because super() is called implicitly/explicitly, any checked exception thrown by parent must be handled in child.",
    hint: "Exception propagation rules apply.",
    level: "expert",
    codeExample: "class Parent { Parent() throws IOException {} }\nclass Child extends Parent { Child() throws IOException { super(); } }"
  },
  {
    question: "Is it possible to call a constructor of a grandparent directly?",
    shortAnswer: "No, only immediate parent constructor can be called via super().",
    explanation: "The chain must be followed: child calls parent, parent calls grandparent.",
    hint: "No skipping levels.",
    level: "intermediate",
    codeExample: "class GrandParent {}\nclass Parent extends GrandParent {}\nclass Child extends Parent { Child() { super(); } } // calls Parent, not GrandParent"
  },
  {
    question: "What does 'implicit super constructor is undefined' error mean?",
    shortAnswer: "The parent class does not have a no-argument constructor, but the child tries to call it implicitly.",
    explanation: "Add an explicit super(parameters) call in child constructor.",
    hint: "Define a no-arg constructor in parent or use super(...).",
    level: "basic",
    codeExample: "class Parent { Parent(int x) {} }\nclass Child extends Parent { } // error"
  },
  {
    question: "Can an abstract class have a constructor?",
    shortAnswer: "Yes, and it is called when a concrete subclass is instantiated.",
    explanation: "Abstract class constructors are used to initialize fields common to all subclasses.",
    hint: "Even abstract classes need initialization.",
    level: "intermediate",
    codeExample: "abstract class Base { Base() { System.out.println(\"Base\"); } }\nclass Derived extends Base { }"
  },
  {
    question: "What is the purpose of a private constructor in inheritance?",
    shortAnswer: "It prevents subclassing (cannot extend the class).",
    explanation: "If all constructors are private, no subclass can call super().",
    hint: "Singleton pattern uses private constructor.",
    level: "advanced",
    codeExample: "class Utility { private Utility() {} }\n// cannot extend"
  },
  {
    question: "How does Java decide which parent constructor to call?",
    shortAnswer: "By the arguments passed to super().",
    explanation: "If no super() is written, it assumes super() with no arguments.",
    hint: "Overloading resolution applies.",
    level: "intermediate",
    codeExample: "class Parent { Parent(int a) {} Parent(String s) {} }\nclass Child extends Parent { Child() { super(10); } }"
  },
  {
    question: "Can we use return statement inside a constructor?",
    shortAnswer: "Yes, but only as 'return;' with no value, and it must be the last statement.",
    explanation: "It exits the constructor early, but super() must have already been called.",
    hint: "No return type, but void return allowed.",
    level: "basic",
    codeExample: "Child() { super(); if(condition) return; // rest of code }"
  },
  {
    question: "What is the output? class A { A() { System.out.println(\"A\"); } }\nclass B extends A { B() { System.out.println(\"B\"); } }\nclass C extends B { C() { super(); System.out.println(\"C\"); } }\nnew C();",
    shortAnswer: "A\nB\nC",
    explanation: "Even with explicit super() in C, the chain still starts from A.",
    hint: "super() in C calls B(), which calls A() automatically.",
    level: "intermediate",
    codeExample: "Output: A B C"
  },
  {
    question: "What is the difference between this() and super()?",
    shortAnswer: "this() calls another constructor in the same class; super() calls a parent constructor.",
    explanation: "Both must be first statement and cannot coexist.",
    hint: "One stays inside class, one goes upward.",
    level: "basic",
    codeExample: "this(5); // same class\nsuper(5); // parent class"
  },
  {
    question: "Can a constructor be static?",
    shortAnswer: "No, constructors are never static.",
    explanation: "They are associated with object creation, not class.",
    hint: "Static belongs to class, constructors run per instance.",
    level: "basic",
    codeExample: "// static A() {} is invalid"
  },
  {
    question: "What is the purpose of a copy constructor in inheritance?",
    shortAnswer: "To create a new object by copying another object, including superclass parts.",
    explanation: "You must explicitly copy parent fields using super(copyFrom).",
    hint: "Deep vs shallow copy considerations.",
    level: "expert",
    codeExample: "class Child extends Parent { Child(Child other) { super(other); this.x = other.x; } }"
  },
  {
    question: "What happens when you create an object of a subclass if the parent constructor throws an exception?",
    shortAnswer: "The exception propagates to the subclass constructor and must be handled or declared.",
    explanation: "Because super() is called first, any exception from super() is thrown before child code.",
    hint: "Try-catch around super() is not possible – must declare throws.",
    level: "advanced",
    codeExample: "class Parent { Parent() throws Exception {} }\nclass Child extends Parent { Child() throws Exception { super(); } }"
  },
  {
    question: "Why can't we override a constructor?",
    shortAnswer: "Constructors are not methods, they have different rules and names.",
    explanation: "Overriding requires same method signature in subclass; constructors always have class name.",
    hint: "No inheritance, no overriding.",
    level: "basic",
    codeExample: "// No concept of constructor overriding"
  },
  {
    question: "What is the output? class A { A() { System.out.print(1); } }\nclass B extends A { B() { System.out.print(2); } }\nclass C extends B { C() { System.out.print(3); } }\nnew C();",
    shortAnswer: "123",
    explanation: "Chain from A → B → C constructors.",
    hint: "Order of execution is top-down.",
    level: "basic",
    codeExample: "Output: 123"
  },
  {
    question: "Can a subclass constructor call a parent constructor with a different number of parameters?",
    shortAnswer: "Yes, as long as such a constructor exists in the parent.",
    explanation: "super(10, \"hello\") will look for Parent(int, String).",
    hint: "Overloaded constructors in parent.",
    level: "intermediate",
    codeExample: "class Parent { Parent(int a, String b) {} }\nclass Child extends Parent { Child() { super(5, \"abc\"); } }"
  },
  {
    question: "What is the purpose of a no-arg constructor in a parent class?",
    shortAnswer: "To allow subclasses to be instantiated without explicit super(parameters).",
    explanation: "It's a good practice to provide a no-arg constructor if subclasses might be created without parameters.",
    hint: "Future extensibility.",
    level: "intermediate",
    codeExample: "class Parent { Parent() {} }"
  },
  {
    question: "Can an interface have a constructor?",
    shortAnswer: "No, interfaces cannot have constructors.",
    explanation: "Interfaces cannot be instantiated directly.",
    hint: "Interfaces only declare abstract methods and constants.",
    level: "basic",
    codeExample: "// interface I { I(); } // invalid"
  },
  {
    question: "What happens if a subclass constructor calls super() and then tries to access an instance variable of parent before the parent constructor finishes?",
    shortAnswer: "Impossible – super() must be the first statement. After super(), parent constructor has finished, so all parent fields are initialized.",
    explanation: "The design ensures parent is fully constructed before child accesses anything.",
    hint: "Safety first.",
    level: "advanced",
    codeExample: "Child() { super(); int x = super.parentField; // valid }"
  },
  {
    question: "Can a constructor be marked final?",
    shortAnswer: "No, final keyword is not allowed for constructors.",
    explanation: "Constructors cannot be overridden, so final is redundant and forbidden.",
    hint: "Only methods can be final.",
    level: "basic",
    codeExample: "// final A() {} is illegal"
  }
];

export default questions;