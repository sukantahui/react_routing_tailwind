// RuleViolationsDemo.java
// This file demonstrates common violations of abstract class rules.
// Each section shows an error - these will NOT compile.

public class RuleViolationsDemo {
    public static void main(String[] args) {
        System.out.println("This file demonstrates compilation errors!");
    }
}

// ========== VIOLATION 1: Abstract method in non-abstract class ==========
// ERROR: The abstract method can only be defined by an abstract class
class BadClass1 {
    public abstract void doSomething(); // COMPILE ERROR
}


// ========== VIOLATION 2: Trying to instantiate abstract class ==========
abstract class CannotInstantiate {
    void hello() { System.out.println("Hello"); }
}

class Violation2 {
    void test() {
        // CannotInstantiate obj = new CannotInstantiate(); // COMPILE ERROR
        // error: Cannot instantiate the type CannotInstantiate
    }
}


// ========== VIOLATION 3: Abstract method with body ==========
abstract class BadClass3 {
    // ERROR: abstract method cannot have a body
    public abstract void badMethod() {
        System.out.println("This is not allowed");
    }
}


// ========== VIOLATION 4: Private abstract method ==========
abstract class BadClass4 {
    // ERROR: illegal combination of modifiers: abstract and private
    private abstract void hidden(); // COMPILE ERROR
}


// ========== VIOLATION 5: Static abstract method ==========
abstract class BadClass5 {
    // ERROR: illegal combination of modifiers: abstract and static
    public static abstract void staticAbstract(); // COMPILE ERROR
}


// ========== VIOLATION 6: Final abstract method ==========
abstract class BadClass6 {
    // ERROR: illegal combination of modifiers: abstract and final
    public final abstract void cantOverride(); // COMPILE ERROR
}


// ========== VIOLATION 7: Subclass not implementing abstract methods ==========
abstract class Parent {
    public abstract void method1();
    public abstract void method2();
}

// ERROR: The type Child must implement the inherited abstract method Parent.method1()
class Child extends Parent {
    // Only implements method1, forgot method2
    public void method1() { }
    // Missing method2() → COMPILE ERROR
}


// ========== VIOLATION 8: Final abstract class ==========
// ERROR: illegal combination of modifiers: abstract and final
final abstract class BadClass8 { // COMPILE ERROR
    void someMethod() { }
}
