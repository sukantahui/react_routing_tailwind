// topic0_questions.js
const questions = [
  // 📘 BASIC LEVEL
  {
    question: "What is inheritance in object-oriented programming?",
    shortAnswer: "Inheritance allows a class to acquire properties and methods from another class.",
    explanation: "Inheritance is a mechanism where a new class (child/subclass) inherits fields and methods from an existing class (parent/superclass). It represents an 'is-a' relationship and promotes code reusability.",
    hint: "Think of a child inheriting traits from parents.",
    level: "basic",
    codeExample: "class Parent { } class Child extends Parent { }"
  },
  {
    question: "Which keyword is used to implement inheritance in Java?",
    shortAnswer: "extends",
    explanation: "The 'extends' keyword is used to create a subclass that inherits from a superclass.",
    hint: "It's the same word used for extending functionality.",
    level: "basic"
  },
  {
    question: "What type of relationship does inheritance represent?",
    shortAnswer: "is-a relationship",
    explanation: "Inheritance models an 'is-a' relationship, meaning a child class is a specialized version of the parent class (e.g., Car is a Vehicle).",
    hint: "Like 'Dog is an Animal'.",
    level: "basic"
  },
  {
    question: "What is the main benefit of using inheritance?",
    shortAnswer: "Code reusability",
    explanation: "Inheritance allows child classes to reuse code from parent classes, reducing duplication and making maintenance easier.",
    hint: "Don't repeat yourself (DRY).",
    level: "basic"
  },
  {
    question: "Can a Java class inherit from more than one parent class directly?",
    shortAnswer: "No",
    explanation: "Java does not support multiple inheritance with classes to avoid ambiguity (the diamond problem). A class can only extend one parent class.",
    hint: "Single inheritance only for classes.",
    level: "basic"
  },
  {
    question: "What is the parent class of all Java classes?",
    shortAnswer: "Object class",
    explanation: "Every class in Java implicitly extends the Object class, which provides basic methods like toString(), equals(), and hashCode().",
    hint: "The root of the class hierarchy.",
    level: "basic"
  },
  {
    question: "Are private members of a parent class inherited by the child class?",
    shortAnswer: "No",
    explanation: "Private fields and methods are not inherited. They can only be accessed within the class they are declared. Child classes cannot directly access private members of the parent.",
    hint: "Private means only the owner can see it.",
    level: "basic"
  },
  {
    question: "What is the difference between inheritance and composition?",
    shortAnswer: "Inheritance is 'is-a', composition is 'has-a'.",
    explanation: "Inheritance creates a parent-child relationship where the child is a specialized version of the parent. Composition means a class contains objects of other classes (e.g., a Car has an Engine).",
    hint: "'Has-a' vs 'is-a'.",
    level: "basic"
  },
  {
    question: "Can a class be both a parent and a child at the same time?",
    shortAnswer: "Yes",
    explanation: "A class can extend another class (making it a child) and also be extended by other classes (making it a parent). This creates a multilevel inheritance chain.",
    hint: "Example: A extends B, B extends C → B is both child and parent.",
    level: "basic",
    codeExample: "class GrandParent { } class Parent extends GrandParent { } class Child extends Parent { }"
  },
  {
    question: "What happens if you don't specify 'extends' for a class?",
    shortAnswer: "It implicitly extends Object.",
    explanation: "If no parent class is specified, Java automatically makes the class a direct child of the Object class.",
    hint: "Object is the default parent.",
    level: "basic"
  },

  // 🚀 INTERMEDIATE LEVEL
  {
    question: "Why should inheritance be used only for 'is-a' relationships?",
    shortAnswer: "To maintain logical design and avoid misuse.",
    explanation: "Using inheritance for non 'is-a' relationships (e.g., a Car inheriting from Engine) leads to confusing, fragile code. Composition is better for 'has-a' relationships.",
    hint: "If it doesn't feel natural (e.g., 'Manager is an Employee' works, but 'Manager is a Salary' does not).",
    level: "intermediate"
  },
  {
    question: "What is the Liskov Substitution Principle?",
    shortAnswer: "Child objects must be substitutable for parent objects.",
    explanation: "The principle states that if a class is a subclass, it should be usable wherever the parent class is expected without breaking the program. This ensures proper inheritance design.",
    hint: "A Developer should be able to replace an Employee without issues.",
    level: "intermediate"
  },
  {
    question: "What is method overriding?",
    shortAnswer: "Redefining a parent class method in the child class.",
    explanation: "When a child class provides its own implementation of a method already defined in the parent, it overrides the parent's version. This enables runtime polymorphism.",
    hint: "Child can change the behavior.",
    level: "intermediate",
    codeExample: "class Animal { void sound() { System.out.println(\"Some sound\"); } } class Dog extends Animal { @Override void sound() { System.out.println(\"Bark\"); } }"
  },
  {
    question: "Can a child class add new methods not present in the parent?",
    shortAnswer: "Yes",
    explanation: "Inheritance allows the child class to extend the parent by adding new fields and methods. This is how specialization works.",
    hint: "Child can have extra features.",
    level: "intermediate"
  },
  {
    question: "What is the 'super' keyword used for in inheritance?",
    shortAnswer: "To refer to the parent class.",
    explanation: "'super' is used to access parent class methods, variables, or constructors, especially when they are hidden or overridden by the child class.",
    hint: "Think of 'super' as calling the parent version.",
    level: "intermediate"
  },
  {
    question: "What is constructor chaining in inheritance?",
    shortAnswer: "Calling parent constructors from child constructors.",
    explanation: "Every child constructor implicitly calls the parent's no-argument constructor (super()) as the first statement. If the parent lacks a no-arg constructor, the child must explicitly call a parameterized parent constructor.",
    hint: "The chain always starts from the top (Object) down to the child.",
    level: "intermediate"
  },
  {
    question: "Why does Java allow multilevel inheritance but not multiple inheritance with classes?",
    shortAnswer: "To avoid ambiguity and the diamond problem.",
    explanation: "Multilevel inheritance (A→B→C) is linear and safe. Multiple inheritance (A inherits from B and C) can cause conflicts if B and C have methods with the same signature. Java uses interfaces to provide multiple inheritance of type without ambiguity.",
    hint: "Two parents may disagree on the same method.",
    level: "intermediate"
  },
  {
    question: "What is the difference between method overriding and method overloading?",
    shortAnswer: "Overriding changes parent method in child; overloading adds same-name methods with different parameters.",
    explanation: "Overriding occurs in inheritance with same method signature; overloading is within the same class or between classes with different parameter lists. Overriding is runtime polymorphism; overloading is compile-time.",
    hint: "Override = same name, same parameters, different class. Overload = same name, different parameters.",
    level: "intermediate"
  },
  {
    question: "Can a final class be inherited?",
    shortAnswer: "No",
    explanation: "A class declared as 'final' cannot be extended. This is used to prevent inheritance, often for security or immutability reasons (e.g., String class is final).",
    hint: "Final stops extension.",
    level: "intermediate"
  },
  {
    question: "What is the default superclass of an interface?",
    shortAnswer: "None; interfaces do not extend Object.",
    explanation: "Interfaces do not have a parent class, but any class implementing an interface still extends Object. However, interface methods implicitly inherit from Object if not declared.",
    hint: "Interfaces are purely abstract types.",
    level: "intermediate"
  },

  // 🔥 EXPERT LEVEL
  {
    question: "How does the JVM locate a method when called on a subclass object?",
    shortAnswer: "Dynamic method dispatch (runtime polymorphism).",
    explanation: "The JVM uses the actual object's class (not the reference type) to determine which method version to execute. This is why overriding works. The method table of the object is consulted at runtime.",
    hint: "The object knows who it really is.",
    level: "expert"
  },
  {
    question: "What is the diamond problem in inheritance?",
    shortAnswer: "Ambiguity when a class inherits from two classes that have a common ancestor.",
    explanation: "If classes B and C inherit from A, and D inherits from both B and C, then D would have two paths to A's method, causing conflict. Java prevents this by disallowing multiple class inheritance.",
    hint: "Shape of a diamond: A at top, B and C in middle, D at bottom.",
    level: "expert",
    codeExample: "// Not allowed in Java: class D extends B, C { }"
  },
  {
    question: "How does Java solve the diamond problem for interfaces (default methods)?",
    shortAnswer: "Explicit resolution using super keyword and precedence rules.",
    explanation: "If a class implements two interfaces with the same default method, the class must override it or specify which interface's version to use using InterfaceName.super.methodName(). If one interface extends another, the child interface's method wins.",
    hint: "Java 8+ default methods need resolution.",
    level: "expert"
  },
  {
    question: "What is the 'protected' access modifier's role in inheritance?",
    shortAnswer: "It allows access within the same package and by subclasses (even in different packages).",
    explanation: "Protected members are inherited and can be accessed directly in subclasses. This is more permissive than default (package-private) but more restrictive than public.",
    hint: "Use protected for methods meant to be overridden but not exposed to all.",
    level: "expert"
  },
  {
    question: "How does inheritance affect memory layout of an object?",
    shortAnswer: "The child object contains a complete copy of parent object's fields.",
    explanation: "When a child object is created, memory is allocated for its own fields plus all inherited fields from all ancestors. The object's layout includes a contiguous block containing all fields, from Object down to the child.",
    hint: "No separate parent object exists; it's one combined object.",
    level: "expert"
  },
  {
    question: "What is the 'instanceof' operator and how does it relate to inheritance?",
    shortAnswer: "It checks whether an object is an instance of a particular class or interface.",
    explanation: "'instanceof' returns true if the object is of the specified type or any subtype (due to inheritance/implementation). It's used for safe casting and type checking.",
    hint: "Checks 'is-a' relationship at runtime.",
    level: "expert",
    codeExample: "if (obj instanceof Employee) { Employee e = (Employee) obj; }"
  },
  {
    question: "Can you override a static method?",
    shortAnswer: "No, static methods are hidden, not overridden.",
    explanation: "Static methods belong to the class, not the instance. If a child class defines a static method with the same signature, it hides the parent's static method, but the version called depends on the reference type, not the object type.",
    hint: "Static methods are resolved at compile-time, not runtime.",
    level: "expert"
  },
  {
    question: "What is the 'covariant return type' in method overriding?",
    shortAnswer: "The overriding method can return a subclass of the original return type.",
    explanation: "Since Java 5, when overriding a method, you may return a more specific type (subclass) than the parent method's return type. This is called covariant return type and is safe because the child object is still compatible with the parent return type.",
    hint: "Example: Parent method returns Animal; child can return Dog.",
    level: "expert",
    codeExample: "class Parent { Number getValue() { return 0; } } class Child extends Parent { @Override Integer getValue() { return 10; } }"
  },
  {
    question: "What are the design trade-offs between inheritance and composition?",
    shortAnswer: "Inheritance couples classes tightly; composition offers more flexibility and encapsulation.",
    explanation: "Inheritance exposes parent implementation to child (fragile base class problem) and is fixed at compile time. Composition allows runtime behavior changes, better testing, and adheres to 'favor composition over inheritance' principle. However, inheritance can be simpler for clear 'is-a' hierarchies.",
    hint: "Composition = has-a, more modular; inheritance = is-a, more direct.",
    level: "expert"
  },
  {
    question: "What is the 'sealed' class feature introduced in Java 17?",
    shortAnswer: "Sealed classes restrict which classes can extend them.",
    explanation: "A sealed class permits only a specified set of subclasses, giving the author control over the inheritance hierarchy. This is useful for domain modeling and pattern matching.",
    hint: "You decide who can inherit.",
    level: "expert",
    codeExample: "sealed class Shape permits Circle, Rectangle { } final class Circle extends Shape { } final class Rectangle extends Shape { }"
  }
];

export default questions;