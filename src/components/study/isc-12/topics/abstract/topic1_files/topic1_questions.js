// topic1_questions.js
// 30 questions on Abstract Class & Abstract Methods

const questions = [
    {
        question: "What is an abstract class in Java?",
        shortAnswer: "A class that cannot be instantiated and may contain abstract methods.",
        explanation: "Abstract classes serve as blueprints for subclasses. They can have constructors, fields, concrete methods, and abstract methods. They are declared with the 'abstract' keyword.",
        hint: "Think of it as a partially built house - you can't live in it, but you can add rooms (subclasses).",
        level: "basic",
        codeExample: "abstract class Animal { abstract void sound(); }"
    },
    {
        question: "What is an abstract method?",
        shortAnswer: "A method declared without an implementation (no body), ending with a semicolon.",
        explanation: "Abstract methods define a contract that subclasses must fulfill. They have no body and must be overridden in concrete subclasses. The class containing an abstract method must be abstract.",
        hint: "It's like a promise: 'every subclass will have this method, but they decide how it works'.",
        level: "basic",
        codeExample: "public abstract void calculate(); // no curly braces"
    },
    {
        question: "Can an abstract class have a constructor?",
        shortAnswer: "Yes, abstract classes can have constructors, and they are called when a concrete subclass is instantiated.",
        explanation: "The constructor initializes common state. Even though you can't instantiate the abstract class directly, its constructor runs via super() from the subclass.",
        hint: "The abstract class constructor runs first, then the subclass constructor.",
        level: "intermediate",
        codeExample: "abstract class Base { Base() { System.out.println(\"Base\"); } }\nclass Derived extends Base { Derived() { super(); } }"
    },
    {
        question: "Can we have an abstract class with no abstract methods?",
        shortAnswer: "Yes, an abstract class can have zero abstract methods. It simply cannot be instantiated.",
        explanation: "Sometimes you want to prevent instantiation of a class even though it's fully implemented. Marking it abstract serves that purpose.",
        hint: "Useful for utility base classes that should only be extended.",
        level: "intermediate",
        codeExample: "abstract class UtilityBase { void log(String msg) { ... } } // no abstract methods"
    },
    {
        question: "What happens if a subclass does not implement all abstract methods of its abstract parent?",
        shortAnswer: "The subclass must also be declared abstract.",
        explanation: "Java enforces that any concrete class must provide implementations for all inherited abstract methods. Otherwise, the class remains abstract and cannot be instantiated.",
        hint: "Compiler error unless you add 'abstract' to the subclass.",
        level: "basic",
        codeExample: "abstract class A { abstract void m(); }\nclass B extends A { } // ERROR\nabstract class C extends A { } // OK"
    },
    {
        question: "Can an abstract method be static?",
        shortAnswer: "No, abstract methods cannot be static because static methods belong to the class and cannot be overridden.",
        explanation: "Abstract methods rely on polymorphism and overriding, which requires instance methods. A static method is associated with the class itself, not an instance.",
        hint: "Static and abstract are contradictory - static can't be overridden, abstract must be overridden.",
        level: "intermediate",
        codeExample: "// abstract static void m(); // COMPILE ERROR"
    },
    {
        question: "Can an abstract method be final?",
        shortAnswer: "No, final prevents overriding, but abstract requires overriding. They are mutually exclusive.",
        explanation: "A final method cannot be changed in subclasses. An abstract method has no body and must be overridden. Combining them is illegal.",
        hint: "You can't have a method that both must be overridden and cannot be overridden.",
        level: "intermediate",
        codeExample: "// abstract final void m(); // ERROR"
    },
    {
        question: "Can an abstract method be private?",
        shortAnswer: "No, private methods are not visible to subclasses, so they cannot be overridden. Abstract methods must be overridable.",
        explanation: "Private members are accessible only within the declaring class. Since subclasses cannot see them, they cannot provide an implementation. The combination is illegal.",
        hint: "If a subclass can't see it, it can't implement it.",
        level: "intermediate",
        codeExample: "// abstract private void m(); // ERROR"
    },
    {
        question: "What is the access level of an abstract method?",
        shortAnswer: "They can be public, protected, or default (package-private), but not private.",
        explanation: "Abstract methods need to be accessible to subclasses for overriding. private would defeat that purpose. public is most common.",
        hint: "protected is useful when you want subclasses in different packages to implement.",
        level: "intermediate",
        codeExample: "protected abstract void init(); // allowed"
    },
    {
        question: "Can we declare an abstract method in a non-abstract class?",
        shortAnswer: "No. If a class contains any abstract method, the class must be declared abstract.",
        explanation: "A non-abstract class is considered 'complete' and can be instantiated. An abstract method would be incomplete, so Java prohibits this.",
        hint: "Compiler error: 'The type X must be an abstract class to define abstract methods'.",
        level: "basic",
        codeExample: "class Bad { abstract void m(); } // ERROR"
    },
    {
        question: "Can an abstract class implement an interface?",
        shortAnswer: "Yes, an abstract class can implement an interface and may choose to implement some or none of its methods.",
        explanation: "The abstract class can provide default implementations for some methods, leaving others abstract for subclasses to implement.",
        hint: "This is useful for adapter classes where you only want to override a few methods.",
        level: "intermediate",
        codeExample: "interface Drawable { void draw(); void resize(); }\nabstract class Shape implements Drawable { public void resize() {...} } // draw() remains abstract"
    },
    {
        question: "Can an abstract class extend another abstract class?",
        shortAnswer: "Yes, an abstract class can extend another abstract class, and it may choose to implement some of the parent's abstract methods or leave them abstract.",
        explanation: "This allows hierarchical abstraction. Each subclass can become more concrete or remain abstract.",
        hint: "Like a family tree: Grandparent abstract, Parent abstract, Child concrete.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void a(); }\nabstract class B extends A { void a() {...} } // implements a, may add more abstract methods"
    },
    {
        question: "How do you call an abstract method from a concrete method in the same abstract class?",
        shortAnswer: "Just call it like any other method. The actual implementation will be determined at runtime based on the concrete subclass.",
        explanation: "This is the basis of the Template Method pattern. The abstract class defines the algorithm structure, calling abstract methods that subclasses implement.",
        hint: "The abstract method acts as a placeholder that will be filled by subclasses.",
        level: "advanced",
        codeExample: "abstract class Game { final void play() { start(); playTurn(); end(); } abstract void start(); abstract void playTurn(); abstract void end(); }"
    },
    {
        question: "What is the difference between an abstract class and a concrete class?",
        shortAnswer: "Concrete classes can be instantiated and have all methods implemented; abstract classes cannot be instantiated and may have abstract methods.",
        explanation: "Concrete classes are 'complete' and ready to use. Abstract classes are 'incomplete' and serve as templates.",
        hint: "Concrete = ready-to-use object; Abstract = template/blueprint.",
        level: "basic",
        codeExample: "abstract class Vehicle {} // cannot new\nclass Car extends Vehicle {} // concrete, can new"
    },
    {
        question: "Can we have a final abstract class?",
        shortAnswer: "No, because final prevents inheritance and abstract requires inheritance.",
        explanation: "A final class cannot be extended, but an abstract class is designed to be extended. The modifiers conflict.",
        hint: "Illegal combination: 'abstract final' results in compile-time error.",
        level: "intermediate",
        codeExample: "// abstract final class X {} // COMPILE ERROR"
    },
    {
        question: "Can an abstract class have a main method?",
        shortAnswer: "Yes, an abstract class can have a main method, and it can be executed (though the class itself cannot be instantiated).",
        explanation: "The main method is static, so it belongs to the class type, not an instance. You can run it as a normal Java program.",
        hint: "Try it: put public static void main in an abstract class - it runs fine.",
        level: "intermediate",
        codeExample: "abstract class Test { public static void main(String[] args) { System.out.println(\"Hello\"); } }"
    },
    {
        question: "What is the purpose of the 'abstract' keyword on a class that has no abstract methods?",
        shortAnswer: "To prevent instantiation of the class, even though it is fully implemented.",
        explanation: "Sometimes you want a class to serve only as a base class (like a utility of common code) and not be instantiated on its own.",
        hint: "It signals 'this class is meant to be extended, not used directly'.",
        level: "intermediate",
        codeExample: "abstract class BaseLogger {\n  void log(String msg) { System.out.println(msg); }\n}\n// BaseLogger b = new BaseLogger(); // ERROR"
    },
    {
        question: "Can an abstract method have a body if it's defined in an interface (default method)?",
        shortAnswer: "Default methods in interfaces have bodies but are not abstract. Abstract methods by definition have no body.",
        explanation: "Since Java 8, interfaces can have default and static methods with implementations. But the 'abstract' keyword on an interface method is redundant and the method still has no body.",
        hint: "Default methods provide a body, abstract methods do not. They are different concepts.",
        level: "advanced",
        codeExample: "interface I { default void m() { System.out.println(\"body\"); } } // not abstract"
    },
    {
        question: "What is the 'abstract' modifier's effect on performance?",
        shortAnswer: "Negligible. Abstract methods use dynamic dispatch (virtual method invocation) similar to overridden methods.",
        explanation: "The JVM handles abstract method calls efficiently. The performance difference compared to concrete methods is usually not a concern unless in extremely tight loops.",
        hint: "Focus on design clarity first; micro-optimizations rarely matter.",
        level: "expert",
        codeExample: "// Abstract method call uses invokevirtual bytecode, same as overridden concrete method"
    },
    {
        question: "How does an abstract class differ from an interface in Java 8+?",
        shortAnswer: "Abstract classes can have state (instance variables) and constructors; interfaces cannot (except static final constants).",
        explanation: "Both can have default/concrete methods, but abstract classes allow non-final fields and constructors. A class can implement multiple interfaces but extend only one class.",
        hint: "Use abstract class when you need to share state or common initialization code.",
        level: "intermediate",
        codeExample: "abstract class A { int x; A(int x) { this.x = x; } }\ninterface I { int x = 10; } // implicitly public static final"
    },
    {
        question: "Can we use the 'abstract' keyword with a method in an enum?",
        shortAnswer: "Yes, you can declare abstract methods in an enum and provide constant-specific implementations.",
        explanation: "Enum constants can have their own class bodies, allowing you to override abstract methods defined in the enum declaration.",
        hint: "This is a powerful pattern for strategy enums.",
        level: "expert",
        codeExample: "enum Operation { PLUS { double apply(double a, double b) { return a+b; } }, MINUS { ... }; abstract double apply(double a, double b); }"
    },
    {
        question: "What happens if you try to override a concrete method with an abstract one in a subclass?",
        shortAnswer: "It is allowed, but the subclass must then be declared abstract because it introduces a new abstract method.",
        explanation: "You can 're-abstract' a method by overriding a concrete method with an abstract one. This forces further subclasses to implement it.",
        hint: "Rarely used, but can be useful in deep hierarchies.",
        level: "expert",
        codeExample: "class A { void m() {} }\nabstract class B extends A { abstract void m(); } // allowed, B abstract"
    },
    {
        question: "Can an abstract class be annotated with @FunctionalInterface?",
        shortAnswer: "No, because @FunctionalInterface requires an interface with exactly one abstract method. Abstract classes are not interfaces.",
        explanation: "Functional interfaces are a specific concept for lambda expressions. Abstract classes cannot be used as functional interfaces.",
        hint: "Only interfaces can be functional interfaces.",
        level: "intermediate",
        codeExample: "// @FunctionalInterface abstract class X {} // COMPILE ERROR"
    },
    {
        question: "What is the difference between an abstract method and a virtual method in C++?",
        shortAnswer: "In Java, all non-static, non-final methods are virtual by default. Abstract method is like pure virtual in C++ (=0).",
        explanation: "Java's abstract method has no body and forces overriding. C++ pure virtual function (=0) is analogous. Java doesn't need a separate 'virtual' keyword.",
        hint: "C++: virtual void f() = 0; Java: abstract void f();",
        level: "expert",
        codeExample: "// C++: virtual void start() = 0;\n// Java: public abstract void start();"
    },
    {
        question: "Can we declare a generic abstract method?",
        shortAnswer: "Yes, abstract methods can be generic, just like concrete methods.",
        explanation: "Type parameters can be declared at the method level, allowing subclasses to provide type-safe implementations.",
        hint: "Useful for abstract algorithms that work with different types.",
        level: "advanced",
        codeExample: "abstract class Processor { abstract <T> T process(T input); }"
    },
    {
        question: "How does the JVM handle abstract method invocation?",
        shortAnswer: "Using invokevirtual bytecode, same as concrete method invocation. The receiver type determines the actual method to call.",
        explanation: "At runtime, the JVM looks up the method in the actual object's class. If the method is abstract in the declared type but implemented in the concrete subclass, it works fine.",
        hint: "Polymorphism works the same for abstract and overridden concrete methods.",
        level: "expert",
        codeExample: "// Animal a = new Dog(); a.sound(); // sound() is abstract in Animal, implemented in Dog"
    },
    {
        question: "Can an abstract class have a synchronized method?",
        shortAnswer: "Yes, abstract methods can be synchronized? Actually, 'abstract synchronized' is illegal because synchronization is an implementation detail.",
        explanation: "You cannot declare an abstract method as synchronized because synchronized affects the implementation (acquiring a lock), which an abstract method doesn't have.",
        hint: "Synchronized is a concrete behavior; abstract methods have no behavior.",
        level: "advanced",
        codeExample: "// abstract synchronized void m(); // COMPILE ERROR"
    },
    {
        question: "What is the 'abstract' keyword's role in the Template Method pattern?",
        shortAnswer: "Abstract methods define the customizable steps, while a concrete template method defines the algorithm structure.",
        explanation: "The abstract class declares abstract methods for steps that vary. A final concrete method calls these abstract methods in a specific order.",
        hint: "It's a classic design pattern that heavily uses abstract methods.",
        level: "expert",
        codeExample: "abstract class DataParser { final void parse() { readData(); processData(); writeData(); } abstract void readData(); abstract void processData(); abstract void writeData(); }"
    },
    {
        question: "Can we have a static abstract method?",
        shortAnswer: "No, static methods cannot be abstract because they are not inherited in a polymorphic sense.",
        explanation: "Static methods belong to the class and are resolved at compile time, not runtime. Abstract methods require runtime polymorphism.",
        hint: "If you need a static 'factory' method that returns subclasses, make it concrete.",
        level: "intermediate",
        codeExample: "// abstract static void create(); // ERROR"
    },
    {
        question: "What is the default return type of an abstract method if not specified?",
        shortAnswer: "There is no default; you must specify a return type (including void).",
        explanation: "Like any method, abstract methods must declare a return type. void is allowed, but you must write it explicitly.",
        hint: "Abstract void doSomething(); // void is the return type",
        level: "basic",
        codeExample: "abstract void process(); // void return type"
    },
    {
        question: "Can an abstract method throw exceptions?",
        shortAnswer: "Yes, abstract methods can declare throws clauses, and subclasses must follow the same exception rules (same or subclass).",
        explanation: "The throws clause is part of the method contract. Subclasses can throw the same exception, a subclass, or no exception (if the declared exception is unchecked).",
        hint: "Checked exceptions must be handled or declared by the subclass implementation.",
        level: "intermediate",
        codeExample: "abstract void loadData() throws IOException;"
    }
];

export default questions;