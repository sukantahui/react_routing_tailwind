// topic2_questions.js
// 30 questions on Rules for Abstract Classes

const questions = [
    {
        question: "What happens if you declare an abstract method in a non-abstract class?",
        shortAnswer: "Compiler error: 'The abstract method can only be defined by an abstract class'.",
        explanation: "Java requires that any class containing an abstract method must be declared abstract. This ensures that incomplete classes cannot be instantiated.",
        hint: "If a class has an abstract method, it's incomplete — mark it abstract.",
        level: "basic",
        codeExample: "class Bad { abstract void m(); } // ERROR"
    },
    {
        question: "Can you instantiate an abstract class using the 'new' keyword?",
        shortAnswer: "No, abstract classes cannot be instantiated directly.",
        explanation: "Abstract classes are incomplete (may have abstract methods without bodies). Java prevents creating instances to avoid calling undefined methods.",
        hint: "You can only instantiate concrete subclasses.",
        level: "basic",
        codeExample: "abstract class A {}\n// A a = new A(); // ERROR"
    },
    {
        question: "What is the rule about abstract methods and method bodies?",
        shortAnswer: "Abstract methods cannot have a body — they must end with a semicolon.",
        explanation: "An abstract method declares a contract but provides no implementation. Subclasses are responsible for the body.",
        hint: "No curly braces for abstract methods.",
        level: "basic",
        codeExample: "public abstract void doIt(); // correct\n// public abstract void doIt() {} // ERROR"
    },
    {
        question: "Can an abstract method be private? Why or why not?",
        shortAnswer: "No, because private methods are not visible to subclasses, so they cannot be overridden.",
        explanation: "Abstract methods rely on subclasses to provide implementation. A private method cannot be accessed or overridden by a subclass, defeating the purpose.",
        hint: "Private = invisible to children. Abstract = must be implemented by children. They conflict.",
        level: "intermediate",
        codeExample: "// private abstract void m(); // ILLEGAL"
    },
    {
        question: "Can an abstract method be static?",
        shortAnswer: "No, static methods belong to the class and cannot be overridden; abstract methods require overriding.",
        explanation: "Static methods are resolved at compile-time based on the reference type, not runtime polymorphism. Abstract methods depend on dynamic dispatch.",
        hint: "You cannot override static methods, but abstract methods demand overriding.",
        level: "intermediate",
        codeExample: "// public static abstract void m(); // ERROR"
    },
    {
        question: "Can an abstract method be final?",
        shortAnswer: "No, final prevents overriding, but abstract methods must be overridden.",
        explanation: "Final methods cannot be changed in subclasses. An abstract method has no body and requires a subclass to provide one — the two modifiers are mutually exclusive.",
        hint: "You can't have a method that both must be overridden and cannot be overridden.",
        level: "intermediate",
        codeExample: "// public final abstract void m(); // ERROR"
    },
    {
        question: "If a subclass does not implement all abstract methods from its abstract parent, what must it be?",
        shortAnswer: "The subclass must also be declared abstract.",
        explanation: "A class that inherits abstract methods without implementing them is itself incomplete and must be marked abstract.",
        hint: "The 'abstract' keyword cascades down until all methods are implemented.",
        level: "basic",
        codeExample: "abstract class A { abstract void m1(); abstract void m2(); }\nabstract class B extends A { void m1() {} } // B is still abstract because m2() missing"
    },
    {
        question: "Can an abstract class be final?",
        shortAnswer: "No, because final prevents inheritance, but abstract classes are designed to be extended.",
        explanation: "Final means no subclasses allowed. Abstract means incomplete and requires subclassing. They are contradictory.",
        hint: "A class cannot be both a blueprint (abstract) and unchangeable (final).",
        level: "intermediate",
        codeExample: "// final abstract class X {} // COMPILE ERROR"
    },
    {
        question: "Can an abstract class have a constructor?",
        shortAnswer: "Yes, abstract classes can have constructors, and they are called when a concrete subclass is instantiated.",
        explanation: "Constructors initialize common state. Even though you can't instantiate the abstract class directly, its constructor runs via super() from the subclass.",
        hint: "The constructor chain includes abstract classes.",
        level: "intermediate",
        codeExample: "abstract class Base { Base() { System.out.println(\"Base\"); } }\nclass Derived extends Base { Derived() { super(); } }"
    },
    {
        question: "Can an abstract class have instance variables?",
        shortAnswer: "Yes, abstract classes can have instance variables (fields), which are inherited by subclasses.",
        explanation: "Unlike interfaces (which only have static final constants), abstract classes can hold mutable state that subclasses can access and modify.",
        hint: "This is a key difference from interfaces.",
        level: "basic",
        codeExample: "abstract class Animal { protected String name; } // allowed"
    },
    {
        question: "Can an abstract class have static methods?",
        shortAnswer: "Yes, abstract classes can have static methods with implementations.",
        explanation: "Static methods belong to the class itself, not instances. They are not abstract (since abstract methods cannot be static) but can be concrete static methods.",
        hint: "Useful for utility methods or factory methods returning subclasses.",
        level: "intermediate",
        codeExample: "abstract class Factory { static AbstractClass create() { return new Concrete(); } }"
    },
    {
        question: "Can an abstract class be synchronized?",
        shortAnswer: "The class itself cannot be marked synchronized (that's not a valid modifier for classes). Methods can be synchronized.",
        explanation: "synchronized is a method or block modifier, not a class modifier. Abstract methods cannot be synchronized because they have no implementation.",
        hint: "You can have synchronized concrete methods in an abstract class.",
        level: "advanced",
        codeExample: "abstract class A { public synchronized void concreteMethod() { } } // OK"
    },
    {
        question: "What is the default access modifier for an abstract method if none is specified?",
        shortAnswer: "Package-private (default), same as other methods.",
        explanation: "If you omit access modifier, it's accessible only within the same package. This is allowed for abstract methods as long as subclasses are in the same package.",
        hint: "Often better to use protected or public for broader accessibility.",
        level: "intermediate",
        codeExample: "abstract class A { abstract void m(); } // package-private abstract method"
    },
    {
        question: "Can an abstract class implement multiple interfaces?",
        shortAnswer: "Yes, an abstract class can implement multiple interfaces, just like concrete classes.",
        explanation: "The abstract class may choose to implement some interface methods and leave others abstract for subclasses to implement.",
        hint: "This is a powerful way to provide partial implementations.",
        level: "intermediate",
        codeExample: "interface I1 { void a(); }\ninterface I2 { void b(); }\nabstract class C implements I1, I2 { public void a() {} } // b() remains abstract"
    },
    {
        question: "Can an abstract class extend a concrete class?",
        shortAnswer: "Yes, an abstract class can extend a concrete class. It may then override methods or add new abstract methods.",
        explanation: "The concrete parent provides some functionality, and the abstract child can add abstraction on top.",
        hint: "Useful when you want to make a normally concrete class abstract for further specialization.",
        level: "advanced",
        codeExample: "class ConcreteParent { void doIt() { } }\nabstract class AbstractChild extends ConcreteParent { abstract void doMore(); }"
    },
    {
        question: "What happens if you try to declare an abstract method in an enum?",
        shortAnswer: "It's allowed, but the enum must have constant-specific class bodies implementing the method.",
        explanation: "Enum constants can provide their own implementations of abstract methods defined in the enum declaration.",
        hint: "This is an advanced pattern for strategy enums.",
        level: "expert",
        codeExample: "enum Operation { PLUS { double apply(double a, double b) { return a+b; } }, MINUS {...}; abstract double apply(double a, double b); }"
    },
    {
        question: "Can an abstract class have a method with the same signature as a default method in an interface?",
        shortAnswer: "Yes, and the class method takes precedence (class wins over interface).",
        explanation: "If an abstract class implements an interface with a default method, the abstract class can override it (concretely or abstractly).",
        hint: "Class methods always win over default interface methods.",
        level: "advanced",
        codeExample: "interface I { default void m() { } }\nabstract class A implements I { public abstract void m(); } // re-abstracts"
    },
    {
        question: "Is it allowed to have an abstract class with no abstract methods?",
        shortAnswer: "Yes, an abstract class can have zero abstract methods. It simply cannot be instantiated.",
        explanation: "Sometimes you want to prevent instantiation of a class even though it's fully implemented. Marking it abstract serves that purpose.",
        hint: "Useful for utility base classes that should only be extended.",
        level: "intermediate",
        codeExample: "abstract class NoAbstractMethods { void concreteOnly() { } } // cannot instantiate"
    },
    {
        question: "Can you override a concrete method with an abstract method in a subclass?",
        shortAnswer: "Yes, but the subclass must then be declared abstract.",
        explanation: "You can 're-abstract' a method by overriding a concrete method with an abstract one. This forces further subclasses to implement it.",
        hint: "Rarely used, but allowed.",
        level: "expert",
        codeExample: "class A { void m() {} }\nabstract class B extends A { abstract void m(); } // allowed, B abstract"
    },
    {
        question: "Can an abstract class be annotated with @FunctionalInterface?",
        shortAnswer: "No, @FunctionalInterface applies only to interfaces, not classes.",
        explanation: "Functional interfaces are a specific concept for lambda expressions. Abstract classes cannot be used as functional interfaces even if they have one abstract method.",
        hint: "Only interfaces can be functional interfaces.",
        level: "intermediate",
        codeExample: "// @FunctionalInterface abstract class X {} // COMPILE ERROR"
    },
    {
        question: "What is the rule about abstract methods and checked exceptions?",
        shortAnswer: "Abstract methods can declare checked exceptions. Subclasses can throw the same, a subclass, or none (if the declared exception is unchecked).",
        explanation: "The throws clause is part of the method contract. Subclasses cannot throw broader checked exceptions.",
        hint: "Same rules as overriding concrete methods that throw exceptions.",
        level: "advanced",
        codeExample: "abstract void load() throws IOException; // subclass can throw FileNotFoundException (subclass) or no exception"
    },
    {
        question: "Can an abstract class have a main method?",
        shortAnswer: "Yes, and it can be executed. The main method is static, so it doesn't require an instance.",
        explanation: "Even though you can't instantiate the abstract class, static methods belong to the class and can be called directly.",
        hint: "Useful for testing or as a launcher for subclasses.",
        level: "intermediate",
        codeExample: "abstract class Test { public static void main(String[] args) { System.out.println(\"Runs fine\"); } }"
    },
    {
        question: "What happens if you try to use 'abstract' with 'native'?",
        shortAnswer: "It's allowed? Actually, native methods have no body (implemented in C/C++), but they are not abstract. A method can be both native and abstract? No, that's not allowed.",
        explanation: "native implies implementation exists elsewhere (native code), abstract implies no implementation and must be overridden. They are contradictory.",
        hint: "A method cannot be both native (external implementation) and abstract (no implementation).",
        level: "expert",
        codeExample: "// public abstract native void m(); // COMPILE ERROR"
    },
    {
        question: "Can an abstract method be generic?",
        shortAnswer: "Yes, abstract methods can declare type parameters.",
        explanation: "Type parameters can be defined at the method level, allowing subclasses to provide type-safe implementations.",
        hint: "Useful for abstract algorithms that work with different types.",
        level: "advanced",
        codeExample: "abstract class Processor { abstract <T> T process(T input); }"
    },
    {
        question: "What is the rule about abstract classes and serialization?",
        shortAnswer: "Abstract classes can implement Serializable. Subclasses are responsible for handling serialization appropriately.",
        explanation: "If an abstract class implements Serializable, all subclasses are serializable unless they explicitly prevent it.",
        hint: "Be careful with transient fields and custom serialization in abstract classes.",
        level: "expert",
        codeExample: "abstract class Base implements Serializable { protected transient int cache; }"
    },
    {
        question: "Can an abstract class have a final abstract method? (Trick question)",
        shortAnswer: "No, that's a contradiction. final and abstract cannot be combined on a method.",
        explanation: "final prevents overriding; abstract requires overriding. They cannot coexist.",
        hint: "The compiler will reject 'final abstract'.",
        level: "intermediate",
        codeExample: "// public final abstract void m(); // ERROR"
    },
    {
        question: "What is the rule about abstract classes and instanceof?",
        shortAnswer: "You can use instanceof with abstract class types because the actual object is always a concrete subclass.",
        explanation: "The instanceof operator works with any reference type, including abstract classes. It returns true if the object is an instance of a subclass.",
        hint: "instanceof checks the actual object type, not the reference type.",
        level: "intermediate",
        codeExample: "Animal a = new Dog(); if (a instanceof Animal) { } // true"
    },
    {
        question: "Can an abstract class be used as a type parameter?",
        shortAnswer: "Yes, abstract classes can be used as type arguments in generics.",
        explanation: "Generic type parameters can be bounded by abstract classes. You can have List<Animal> where Animal is abstract.",
        hint: "You cannot instantiate the abstract type, but you can add subclasses to the collection.",
        level: "advanced",
        codeExample: "List<Animal> list = new ArrayList<>(); list.add(new Dog()); // valid"
    },
    {
        question: "What is the rule about abstract methods and covariant return types?",
        shortAnswer: "Subclasses overriding an abstract method can use covariant return types (a subclass of the declared return type).",
        explanation: "This allows more specific return types in subclasses while maintaining the contract.",
        hint: "Valid since Java 5.",
        level: "advanced",
        codeExample: "abstract class A { abstract Object get(); }\nclass B extends A { @Override String get() { return \"\"; } } // covariant"
    },
    {
        question: "Can an abstract class have a nested class that is concrete?",
        shortAnswer: "Yes, abstract classes can have nested classes (static or inner) that are concrete.",
        explanation: "Nested classes are separate from the abstract nature of the outer class. They can be instantiated independently.",
        hint: "Useful for builders or helper classes.",
        level: "intermediate",
        codeExample: "abstract class Outer { static class Helper { } } // Helper is concrete"
    }
];

export default questions;