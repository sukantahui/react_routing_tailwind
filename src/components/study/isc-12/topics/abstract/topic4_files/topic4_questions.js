// topic4_questions.js
// 30 questions on Difference between abstract class and concrete class

const questions = [
    {
        question: "What is the primary difference between an abstract class and a concrete class?",
        shortAnswer: "Abstract classes cannot be instantiated and may have abstract methods; concrete classes can be instantiated and have all methods implemented.",
        explanation: "Concrete classes are 'complete' and ready to use. Abstract classes are 'incomplete' blueprints that must be extended.",
        hint: "Can you use 'new' with it? If yes → concrete; if no → abstract.",
        level: "basic",
        codeExample: "abstract class A {} // cannot instantiate\nclass B {} // can instantiate: new B()"
    },
    {
        question: "Can a concrete class extend an abstract class?",
        shortAnswer: "Yes, and it must implement all abstract methods from the abstract parent.",
        explanation: "The concrete class becomes complete by implementing all inherited abstract methods. Otherwise, it would also need to be abstract.",
        hint: "Concrete class = all methods have bodies.",
        level: "basic",
        codeExample: "abstract class Animal { abstract void sound(); }\nclass Dog extends Animal { void sound() {} } // OK"
    },
    {
        question: "Can an abstract class extend a concrete class?",
        shortAnswer: "Yes, an abstract class can extend a concrete class, and it may override methods or add new abstract ones.",
        explanation: "This allows you to take a fully implemented class and make it abstract for further specialization.",
        hint: "Useful when you want to force additional methods in subclasses.",
        level: "intermediate",
        codeExample: "class Concrete { void doIt() {} }\nabstract class Abstract extends Concrete { abstract void doMore(); }"
    },
    {
        question: "What happens if you try to instantiate an abstract class?",
        shortAnswer: "Compiler error: 'Cannot instantiate the type AbstractClass'.",
        explanation: "Abstract classes are incomplete (may have abstract methods). Java prevents creating instances to avoid calling undefined methods.",
        hint: "The error message is clear: you cannot create an object of an abstract type.",
        level: "basic",
        codeExample: "abstract class A {}\n// A a = new A(); // COMPILE ERROR"
    },
    {
        question: "Can a concrete class have abstract methods?",
        shortAnswer: "No. If a class contains any abstract method, the class must be declared abstract.",
        explanation: "A concrete class is considered 'complete'. An abstract method would make it incomplete, which is contradictory.",
        hint: "Compiler error: 'The abstract method can only be defined by an abstract class'.",
        level: "basic",
        codeExample: "class Bad { abstract void m(); } // ERROR"
    },
    {
        question: "Which one can be marked 'final' — abstract class or concrete class?",
        shortAnswer: "Concrete classes can be final; abstract classes cannot be final.",
        explanation: "Final prevents inheritance. Abstract classes are designed to be extended, so final would contradict their purpose.",
        hint: "A final abstract class would be useless — can't instantiate, can't extend.",
        level: "intermediate",
        codeExample: "final class Concrete {} // OK\n// final abstract class Abstract {} // ERROR"
    },
    {
        question: "Can both abstract and concrete classes have constructors?",
        shortAnswer: "Yes, both can have constructors. Abstract class constructors are called via super() from subclasses.",
        explanation: "Constructors initialize state. For abstract classes, they cannot be called with 'new' but are invoked during subclass instantiation.",
        hint: "The constructor chain includes abstract classes.",
        level: "intermediate",
        codeExample: "abstract class A { A() {} }\nclass B extends A { B() { super(); } }"
    },
    {
        question: "Which one is better for code reuse — abstract class or concrete class?",
        shortAnswer: "Abstract classes are better for code reuse in a hierarchy because they can provide common implementation while forcing subclasses to implement specific parts.",
        explanation: "Concrete classes can also be extended for reuse, but they don't enforce any contracts through abstract methods.",
        hint: "Abstract classes give you 'partial' reuse with required customization.",
        level: "intermediate",
        codeExample: "abstract class Base { void common() {} abstract void custom(); } // forces customization"
    },
    {
        question: "Can you create an array of abstract class type?",
        shortAnswer: "Yes, you can declare an array of abstract class type, but you can only store concrete subclass instances in it.",
        explanation: "The array reference type can be abstract; the actual objects must be concrete subclasses.",
        hint: "Shape[] shapes = new Shape[10]; shapes[0] = new Circle(); // valid",
        level: "intermediate",
        codeExample: "Animal[] animals = new Animal[5]; animals[0] = new Dog(); // OK"
    },
    {
        question: "Which one can have static methods — abstract or concrete?",
        shortAnswer: "Both can have static methods. Static methods belong to the class, not instances.",
        explanation: "Static methods are fully implemented and can be called on the class name, regardless of whether the class is abstract or concrete.",
        hint: "Abstract class can have a main() method and run!",
        level: "intermediate",
        codeExample: "abstract class A { static void m() {} } // OK\nclass B { static void m() {} } // OK"
    },
    {
        question: "Can a concrete class be used as a base class?",
        shortAnswer: "Yes, concrete classes can be extended. However, they don't force subclasses to implement anything.",
        explanation: "Concrete base classes are common. Subclasses may override methods but aren't forced to.",
        hint: "ArrayList extends AbstractList (abstract), but you can also extend ArrayList (concrete).",
        level: "basic",
        codeExample: "class Parent { void m() {} }\nclass Child extends Parent { } // valid"
    },
    {
        question: "What is the memory allocation difference between abstract and concrete classes?",
        shortAnswer: "No difference. Both define instance variables and methods. Memory is allocated when a concrete instance is created.",
        explanation: "Abstract classes themselves don't occupy memory; only their concrete subclasses do when instantiated.",
        hint: "Abstract class is a type, not an object.",
        level: "advanced",
        codeExample: "// No memory for abstract class itself; only for new ConcreteSubclass()"
    },
    {
        question: "Can a concrete class override an abstract method from a parent abstract class?",
        shortAnswer: "Yes, that's required. The concrete class must provide implementations for all inherited abstract methods.",
        explanation: "Overriding abstract methods is mandatory for concrete subclasses. They can also override concrete methods optionally.",
        hint: "The @Override annotation is recommended for clarity.",
        level: "basic",
        codeExample: "abstract class A { abstract void m(); }\nclass B extends A { @Override void m() {} } // must override"
    },
    {
        question: "Which one is more flexible for future changes — abstract or concrete?",
        shortAnswer: "Abstract classes are more flexible for future changes because you can add abstract methods without breaking existing code (subclasses become abstract, but that's a design change).",
        explanation: "Adding abstract methods forces subclasses to implement them. Adding concrete methods to an abstract class doesn't break subclasses.",
        hint: "Design for change: abstract classes allow you to add new abstract methods (breaking change) or concrete methods (safe).",
        level: "expert",
        codeExample: "// Adding new abstract method breaks all concrete subclasses (they become abstract or must implement)"
    },
    {
        question: "Can you use the instanceof operator with abstract classes?",
        shortAnswer: "Yes, instanceof works with abstract class types because the actual object is always a concrete subclass.",
        explanation: "The operator checks the actual object's type against the abstract class, returning true if it's a subclass instance.",
        hint: "if (shape instanceof Circle) { ... }",
        level: "intermediate",
        codeExample: "Animal a = new Dog(); if (a instanceof Animal) { } // true"
    },
    {
        question: "What is the default superclass for both abstract and concrete classes?",
        shortAnswer: "Object class. All classes (abstract or concrete) implicitly extend Object.",
        explanation: "Object is the root of the Java class hierarchy. Abstract classes also inherit Object's methods (toString, equals, hashCode).",
        hint: "You can override toString() in an abstract class.",
        level: "basic",
        codeExample: "abstract class A { } // A extends Object implicitly"
    },
    {
        question: "Can an abstract class have a concrete method that calls an abstract method?",
        shortAnswer: "Yes, this is the Template Method pattern. The concrete method defines an algorithm using abstract steps.",
        explanation: "This is a powerful design pattern where the abstract class controls the flow and subclasses provide specific implementations.",
        hint: "The abstract class says 'when to do', subclasses say 'how to do'.",
        level: "advanced",
        codeExample: "abstract class Game { final void play() { start(); playTurn(); end(); } abstract void start(); abstract void playTurn(); abstract void end(); }"
    },
    {
        question: "Which one is faster to instantiate — abstract or concrete?",
        shortAnswer: "You cannot instantiate abstract classes directly. Concrete classes have normal instantiation overhead, which is minimal.",
        explanation: "Instantiation performance is similar for all classes. The abstract vs concrete distinction doesn't affect speed.",
        hint: "Focus on design, not micro-optimization.",
        level: "advanced",
        codeExample: "// No performance difference between new Concrete1() and new Concrete2()"
    },
    {
        question: "Can you have a private constructor in an abstract class?",
        shortAnswer: "Yes, but then the abstract class cannot be extended by any subclass outside the class itself.",
        explanation: "Private constructors prevent subclasses from calling super(). The abstract class becomes unusable (can't instantiate, can't extend). Usually not useful.",
        hint: "Not recommended — makes the abstract class useless.",
        level: "expert",
        codeExample: "abstract class A { private A() {} } // cannot be extended"
    },
    {
        question: "What is the difference in serialization between abstract and concrete classes?",
        shortAnswer: "Both can be serializable. Abstract classes can define serialVersionUID and serialization behavior for their fields.",
        explanation: "Serialization works the same for both, but abstract classes cannot be instantiated directly during deserialization (concrete subclasses are created).",
        hint: "The concrete subclass must be serializable as well.",
        level: "expert",
        codeExample: "abstract class Base implements Serializable { protected transient int cache; }"
    },
    {
        question: "Can you use a concrete class where an abstract class is expected?",
        shortAnswer: "Yes, through polymorphism. A concrete subclass can be used wherever the abstract superclass type is expected.",
        explanation: "This is the essence of polymorphism — coding to the abstraction.",
        hint: "List<String> list = new ArrayList<>(); // List is interface, ArrayList concrete",
        level: "intermediate",
        codeExample: "Shape s = new Circle(); // Shape abstract, Circle concrete"
    },
    {
        question: "Which one should you use for a utility class with only static methods?",
        shortAnswer: "Concrete class with a private constructor to prevent instantiation.",
        explanation: "Utility classes like Math, Collections are concrete, final, and have private constructors. Abstract classes are not appropriate because they imply inheritance.",
        hint: "Mark the class as final and provide a private constructor.",
        level: "intermediate",
        codeExample: "final class Utils { private Utils() {} public static void doIt() {} }"
    },
    {
        question: "Can an abstract class be used as a method parameter type?",
        shortAnswer: "Yes, you can declare method parameters of abstract class type. Any concrete subclass can be passed.",
        explanation: "This allows the method to work with any subclass, promoting polymorphism.",
        hint: "void process(Animal a) { a.sound(); } // works with Dog, Cat",
        level: "intermediate",
        codeExample: "public void save(Employee e) { e.calculateSalary(); }"
    },
    {
        question: "What is the difference in testability between abstract and concrete classes?",
        shortAnswer: "Abstract classes require a test-specific subclass or mocking; concrete classes can be instantiated directly in tests.",
        explanation: "Testing abstract classes is possible but requires creating an anonymous subclass or using frameworks like Mockito.",
        hint: "Concrete classes are easier to test in isolation.",
        level: "advanced",
        codeExample: "// Testing abstract class: new AbstractClass() { void abstractMethod() {} }.concreteMethod();"
    },
    {
        question: "Can you have a concrete class that is also abstract? (Trick question)",
        shortAnswer: "No, a class cannot be both concrete and abstract. They are mutually exclusive.",
        explanation: "Abstract is a modifier; concrete is the absence of abstract. A class either has the abstract keyword or not.",
        hint: "It's like 'wet' and 'dry' — can't be both.",
        level: "basic",
        codeExample: "// A class is either abstract or concrete, not both"
    },
    {
        question: "What happens to abstract methods when you cast a concrete object to its abstract superclass?",
        shortAnswer: "The abstract methods still execute the concrete subclass's implementation (polymorphism).",
        explanation: "Casting doesn't change the object's actual type. The overridden method in the concrete class is still called.",
        hint: "The object 'remembers' what it really is.",
        level: "intermediate",
        codeExample: "Animal a = new Dog(); ((Animal)a).sound(); // calls Dog's sound()"
    },
    {
        question: "Which one can have a main method for application entry point?",
        shortAnswer: "Both can have a main method, and it can be executed. Abstract classes can run even though they can't be instantiated.",
        explanation: "The main method is static, so it belongs to the class, not an instance. Abstract class with main() is a valid program entry.",
        hint: "Try it: put public static void main in an abstract class — it runs.",
        level: "intermediate",
        codeExample: "abstract class MainDemo { public static void main(String[] args) { System.out.println(\"Hello\"); } }"
    },
    {
        question: "What is the difference in bytecode between abstract and concrete classes?",
        shortAnswer: "Abstract classes have the ACC_ABSTRACT flag in the class file. Abstract methods have ACC_ABSTRACT flag and no Code attribute.",
        explanation: "The JVM enforces that abstract classes cannot be instantiated and that concrete subclasses implement all abstract methods.",
        hint: "The bytecode difference is minimal but crucial for the JVM.",
        level: "expert",
        codeExample: "// javap -v AbstractClass shows 'flags: ACC_ABSTRACT, ACC_PUBLIC'"
    },
    {
        question: "Can you have a concrete class that implements an interface with abstract methods?",
        shortAnswer: "Yes, the concrete class must implement all abstract methods from the interface.",
        explanation: "Interfaces are abstract by definition. A concrete class implementing an interface must provide bodies for all interface methods.",
        hint: "Same rule as extending abstract class — all abstract methods must be implemented.",
        level: "basic",
        codeExample: "interface I { void m(); }\nclass C implements I { public void m() {} } // OK"
    },
    {
        question: "What is the rule of thumb for choosing between abstract and concrete base class?",
        shortAnswer: "If the base class should never be instantiated on its own and/or has abstract methods → make it abstract. Otherwise, make it concrete.",
        explanation: "Default to concrete. Only use abstract when you specifically need to prevent instantiation or enforce method implementation.",
        hint: "When in doubt, start concrete. You can always refactor to abstract later.",
        level: "intermediate",
        codeExample: "// Start: class Employee { }\n// Refactor: abstract class Employee { abstract double calculateSalary(); }"
    }
];

export default questions;