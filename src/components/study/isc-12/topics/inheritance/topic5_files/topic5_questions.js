// topic5_questions.js - 30 moderate to expert questions on Dynamic Method Dispatch
const questions = [
  {
    question: "What is dynamic method dispatch in Java?",
    shortAnswer: "Runtime mechanism where an overridden method is called based on the actual object type, not the reference type.",
    explanation: "It's also known as runtime polymorphism. The JVM decides at runtime which method implementation to execute when a superclass reference points to a subclass object.",
    hint: "Think of a remote control (reference) operating different devices (actual objects).",
    level: "basic",
    codeExample: "Animal a = new Dog(); a.sound(); // Dog's sound() runs"
  },
  {
    question: "What is the difference between compile-time polymorphism and runtime polymorphism?",
    shortAnswer: "Compile-time (method overloading) is resolved at compile time; runtime (method overriding & dynamic dispatch) is resolved at runtime.",
    explanation: "Overloaded methods are chosen based on reference type and arguments; overridden methods are chosen based on actual object type.",
    hint: "Overloading = same name different parameters; Overriding = same signature in subclass.",
    level: "intermediate",
    codeExample: "// Overloading: compile-time\nvoid print(int a) {}\nvoid print(String s) {}\n// Overriding: runtime\nclass Parent { void show() {} }\nclass Child extends Parent { void show() {} }"
  },
  {
    question: "Can static methods be dynamically dispatched?",
    shortAnswer: "No. Static methods are resolved at compile time based on the reference type, not the actual object.",
    explanation: "Static methods belong to the class, not instances. So even if you use a subclass reference, the parent's static method runs if called via superclass reference.",
    hint: "Try calling a static method using a superclass reference pointing to a subclass object – you'll see the parent's version.",
    level: "basic",
    codeExample: "class Parent { static void test() { System.out.println(\"Parent\"); } }\nclass Child extends Parent { static void test() { System.out.println(\"Child\"); } }\nParent p = new Child(); p.test(); // prints Parent"
  },
  {
    question: "What is upcasting?",
    shortAnswer: "Assigning a subclass object to a superclass reference variable.",
    explanation: "Upcasting is always safe and implicit. It allows dynamic dispatch to work.",
    hint: "Upcasting = going up the inheritance hierarchy.",
    level: "basic",
    codeExample: "Dog d = new Dog(); Animal a = d; // upcasting"
  },
  {
    question: "What is downcasting? Why is it risky?",
    shortAnswer: "Assigning a superclass reference back to a subclass reference. Risky because it can throw ClassCastException if the actual object is not of that subclass.",
    explanation: "Downcasting requires explicit casting and should be preceded by instanceof check.",
    hint: "Only downcast if you are sure of the actual object type.",
    level: "intermediate",
    codeExample: "Animal a = new Dog(); Dog d = (Dog) a; // safe\nCat c = (Cat) a; // ClassCastException"
  },
  {
    question: "What will be the output? class A { void m() { System.out.print(\"A\"); } }\nclass B extends A { void m() { System.out.print(\"B\"); } }\npublic class Test { public static void main(String[] args) { A a = new B(); a.m(); } }",
    shortAnswer: "B",
    explanation: "Dynamic dispatch calls B's m() because the actual object is B.",
    hint: "Reference type is A, but object is B.",
    level: "basic",
    codeExample: "Output: B"
  },
  {
    question: "What is the role of the JVM in dynamic method dispatch?",
    shortAnswer: "The JVM uses the actual object's class to look up the method at runtime via the virtual method table (vtable).",
    explanation: "Each class has a vtable mapping method signatures to actual code. The JVM follows the vtable of the runtime object.",
    hint: "Behind the scenes, each object carries a pointer to its class's method table.",
    level: "advanced",
    codeExample: "No code, but think of method lookup as a table lookup."
  },
  {
    question: "Can we achieve dynamic dispatch with fields (instance variables)?",
    shortAnswer: "No. Fields are not polymorphic – they are accessed based on reference type, not actual object type.",
    explanation: "Only methods are subject to dynamic dispatch. Field access is resolved at compile time.",
    hint: "Try accessing a field through a superclass reference – you'll get the superclass field value, even if subclass hides it.",
    level: "intermediate",
    codeExample: "class Parent { int x = 10; }\nclass Child extends Parent { int x = 20; }\nParent p = new Child(); System.out.println(p.x); // prints 10"
  },
  {
    question: "What is the difference between method hiding and method overriding?",
    shortAnswer: "Static methods are hidden (compile-time), instance methods are overridden (runtime).",
    explanation: "Hiding occurs with static methods – which method runs depends on reference type. Overriding is dynamic dispatch.",
    hint: "Static methods belong to class, not object.",
    level: "advanced",
    codeExample: "class Parent { static void show() { System.out.println(\"Parent\"); } }\nclass Child extends Parent { static void show() { System.out.println(\"Child\"); } }\nParent p = new Child(); p.show(); // Parent (hiding)\n// vs instance method overriding"
  },
  {
    question: "Why can't private methods be overridden?",
    shortAnswer: "Private methods are not visible to subclasses, so they cannot be overridden. They are bound at compile time.",
    explanation: "If a subclass defines a method with the same signature, it's a new method, not an override.",
    hint: "Access modifiers matter. Private is class-private.",
    level: "basic",
    codeExample: "class Parent { private void secret() {} }\nclass Child extends Parent { private void secret() {} } // not overriding"
  },
  {
    question: "What is the output? class Parent { void print() { System.out.println(\"Parent\"); } }\nclass Child extends Parent { void print() { System.out.println(\"Child\"); } }\npublic class Main { public static void main(String[] args) { Parent p = new Child(); p.print(); } }",
    shortAnswer: "Child",
    explanation: "Dynamic dispatch ensures Child's print() runs.",
    hint: "Actual object is Child.",
    level: "basic",
    codeExample: "Output: Child"
  },
  {
    question: "Can constructors be dynamically dispatched?",
    shortAnswer: "No. Constructors are not inherited and are always called in a chain (super() first). No polymorphism there.",
    explanation: "Constructors have a fixed call order and are resolved at compile time.",
    hint: "Think about new keyword and constructor chaining.",
    level: "basic",
    codeExample: "// Constructors run from parent to child, no dynamic choice."
  },
  {
    question: "What is a virtual method in Java?",
    shortAnswer: "All non-static, non-private, non-final methods are virtual by default – they support dynamic dispatch.",
    explanation: "Java does not have an explicit 'virtual' keyword like C++; all instance methods are virtual unless made final or private.",
    hint: "If you can override it, it's virtual.",
    level: "intermediate",
    codeExample: "void regularMethod() {} // virtual\nfinal void finalMethod() {} // not virtual\nprivate void privateMethod() {} // not virtual"
  },
  {
    question: "How does dynamic dispatch work with multiple levels of inheritance?",
    shortAnswer: "The JVM starts from the actual object's class and looks up the method. If not found, it goes up the parent chain.",
    explanation: "It always finds the most specific overriding version in the actual object's class hierarchy.",
    hint: "Search starts at the bottom (most specific) and goes up until a matching method is found.",
    level: "intermediate",
    codeExample: "class GrandParent { void m() { } }\nclass Parent extends GrandParent { void m() { } }\nclass Child extends Parent { }\nGrandParent ref = new Child(); ref.m(); // calls Parent's m() (closest override above Child)"
  },
  {
    question: "What happens if you call a method that exists only in the subclass using a superclass reference?",
    shortAnswer: "Compilation error. The superclass reference only knows methods declared in the superclass.",
    explanation: "You must downcast to the subclass type to access subclass-specific methods.",
    hint: "The compiler checks the reference type, not the object.",
    level: "basic",
    codeExample: "class Animal { }\nclass Dog extends Animal { void bark() { } }\nAnimal a = new Dog();\na.bark(); // ERROR – Animal doesn't have bark()"
  },
  {
    question: "Can we achieve dynamic dispatch with interfaces?",
    shortAnswer: "Yes. Interface references pointing to implementing class objects also use dynamic dispatch.",
    explanation: "When you call an interface method, the actual object's implementation is invoked at runtime.",
    hint: "Interfaces are supertypes too.",
    level: "intermediate",
    codeExample: "interface Playable { void play(); }\nclass Guitar implements Playable { public void play() { System.out.println(\"Strum\"); } }\nPlayable p = new Guitar(); p.play(); // dynamic dispatch"
  },
  {
    question: "What is the performance impact of dynamic dispatch?",
    shortAnswer: "Very minimal. JVM optimizations like inline caching make it almost as fast as static dispatch.",
    explanation: "Modern JVMs use virtual call optimizations (e.g., CHA, inline caching) to reduce overhead.",
    hint: "Don't worry about performance – worry about design.",
    level: "expert",
    codeExample: "// Not a code issue; rely on JIT compiler optimizations."
  },
  {
    question: "What will be the output? class A { void m1() { System.out.print(\"A1 \"); m2(); } void m2() { System.out.print(\"A2 \"); } }\nclass B extends A { void m2() { System.out.print(\"B2 \"); } }\npublic class Test { public static void main(String[] args) { A a = new B(); a.m1(); } }",
    shortAnswer: "A1 B2",
    explanation: "m1() is called from A (not overridden), but inside m1(), this.m2() is dynamically dispatched to B's m2().",
    hint: "The method call inside the parent class uses the actual object's version of m2().",
    level: "advanced",
    codeExample: "Output: A1 B2"
  },
  {
    question: "Is it possible to change the return type of an overridden method?",
    shortAnswer: "Yes, covariant return types allow a subclass to return a more specific type (subclass of original return type).",
    explanation: "Java 5+ supports covariant returns. The overriding method's return type must be a subtype of the overridden method's return type.",
    hint: "You can return a Dog where the parent returns Animal.",
    level: "intermediate",
    codeExample: "class Parent { Animal get() { return new Animal(); } }\nclass Child extends Parent { @Override Dog get() { return new Dog(); } } // allowed"
  },
  {
    question: "What is the difference between method overloading and dynamic dispatch?",
    shortAnswer: "Overloading is compile-time (static), dynamic dispatch is runtime (based on actual object).",
    explanation: "Overloaded methods are chosen by the compiler based on reference type and arguments. Overridden methods are chosen at runtime.",
    hint: "Overloading = same name, different parameters; Overriding = same signature, different implementation.",
    level: "intermediate",
    codeExample: "// Overloading: compiler decides\nclass Test { void print(String s) {} void print(int i) {} }\n// Overriding + dynamic dispatch: runtime decides"
  },
  {
    question: "What is the purpose of the @Override annotation?",
    shortAnswer: "It tells the compiler that the method is intended to override a superclass method. It helps catch errors.",
    explanation: "If you misspell the method name or signature, the compiler will complain, preventing accidental overloading instead of overriding.",
    hint: "Always use @Override – it's a safety net.",
    level: "basic",
    codeExample: "@Override\nvoid sound() { } // compiler checks if superclass has sound()"
  },
  {
    question: "Can a final method be dynamically dispatched?",
    shortAnswer: "No. Final methods cannot be overridden, so they are bound at compile time (static binding).",
    explanation: "Since there's no overriding, the method to call is known at compile time.",
    hint: "final = no change allowed.",
    level: "basic",
    codeExample: "class Parent { final void show() {} }\nclass Child extends Parent { // cannot override show() }"
  },
  {
    question: "What is the output? class Parent { void display() { System.out.println(\"Parent\"); } }\nclass Child extends Parent { void display() { System.out.println(\"Child\"); } }\npublic class Main { public static void main(String[] args) { Parent p = new Parent(); p.display(); } }",
    shortAnswer: "Parent",
    explanation: "No polymorphism here – reference and actual object are both Parent.",
    hint: "Dynamic dispatch only when actual object is subclass.",
    level: "basic",
    codeExample: "Output: Parent"
  },
  {
    question: "How does dynamic dispatch work with abstract classes?",
    shortAnswer: "The same as with concrete classes – the actual object's method is called at runtime.",
    explanation: "Abstract classes can have concrete methods; those can be overridden. The reference can be abstract class type pointing to subclass object.",
    hint: "Abstract classes are just incomplete parents.",
    level: "intermediate",
    codeExample: "abstract class Vehicle { abstract void start(); }\nclass Car extends Vehicle { void start() { System.out.println(\"Car start\"); } }\nVehicle v = new Car(); v.start(); // Car's start"
  },
  {
    question: "What is the 'method table' (vtable) in Java?",
    shortAnswer: "A per-class structure that stores pointers to the actual method implementations for dynamic dispatch.",
    explanation: "Each object has a pointer to its class's vtable. When a method is called, the JVM follows the pointer to the correct implementation.",
    hint: "Think of it as a function pointer array.",
    level: "expert",
    codeExample: "// Internal JVM detail – not directly accessible in Java code."
  },
  {
    question: "What will be the output? class A { void m() { System.out.println(\"A\"); } }\nclass B extends A { void m() { System.out.println(\"B\"); } }\nclass C extends B { void m() { System.out.println(\"C\"); } }\npublic class Test { public static void main(String[] args) { A a = new C(); a.m(); } }",
    shortAnswer: "C",
    explanation: "Dynamic dispatch finds the most specific override in the actual object's class (C).",
    hint: "The chain is A <- B <- C, C's m() is called.",
    level: "basic",
    codeExample: "Output: C"
  },
  {
    question: "Can we use dynamic dispatch with arrays?",
    shortAnswer: "Yes, if the array element type is a superclass/interface and elements are subclass objects.",
    explanation: "When you iterate and call a method, dynamic dispatch works per element.",
    hint: "Polymorphic arrays are common in collections.",
    level: "intermediate",
    codeExample: "Animal[] zoo = { new Dog(), new Cat() };\nfor(Animal a : zoo) a.sound(); // each calls its own sound()"
  },
  {
    question: "What is the difference between early binding and late binding?",
    shortAnswer: "Early binding (static) occurs at compile time; late binding (dynamic) occurs at runtime via dynamic dispatch.",
    explanation: "Private, static, final methods are early bound. Instance methods are late bound.",
    hint: "Which methods can be overridden? Those are late bound.",
    level: "intermediate",
    codeExample: "// Early: static methods, private, final\n// Late: normal instance methods"
  },
  {
    question: "What happens if a subclass overrides a method but reduces its visibility?",
    shortAnswer: "Compilation error. You cannot reduce the visibility of an overridden method (e.g., public -> protected).",
    explanation: "Liskov substitution principle – a subclass must be at least as accessible as the superclass.",
    hint: "You can increase visibility (protected -> public) but not decrease.",
    level: "advanced",
    codeExample: "class Parent { public void show() {} }\nclass Child extends Parent { protected void show() {} } // ERROR"
  },
  {
    question: "What is the output? class Parent { void m() { System.out.println(\"Parent m\"); } }\nclass Child extends Parent { void m() { System.out.println(\"Child m\"); } }\npublic class Main { public static void main(String[] args) { Parent p = null; p.m(); } }",
    shortAnswer: "NullPointerException at runtime, not dynamic dispatch issue.",
    explanation: "The reference is null, so method call throws NPE before any dispatch happens.",
    hint: "Dynamic dispatch requires an actual object.",
    level: "basic",
    codeExample: "Exception in thread \"main\" java.lang.NullPointerException"
  }
];

export default questions;