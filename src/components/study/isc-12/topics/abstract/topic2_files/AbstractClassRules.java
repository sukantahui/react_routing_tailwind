// AbstractClassRules.java
// Demonstrates all the correct ways to use abstract classes and methods

// Rule 1: If a class has an abstract method, it MUST be abstract
abstract class CorrectAbstractClass {
    // Abstract method - no body, ends with semicolon
    public abstract void performAction();
    
    // Concrete method - allowed in abstract class
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
    
    // Protected abstract method - allowed
    protected abstract void internalTask();
    
    // Abstract method with parameters and return type
    public abstract int calculate(int a, int b);
}

// Rule 2: Cannot instantiate abstract class directly
// CorrectAbstractClass obj = new CorrectAbstractClass(); // ERROR - can't do this

// Rule 3: Subclass must implement ALL abstract methods (unless subclass is also abstract)
class ConcreteImplementation extends CorrectAbstractClass {
    @Override
    public void performAction() {
        System.out.println("Action performed!");
    }
    
    @Override
    protected void internalTask() {
        System.out.println("Internal task done");
    }
    
    @Override
    public int calculate(int a, int b) {
        return a + b;
    }
}

// Rule 4: Abstract class can have constructors
abstract class Animal {
    protected String name;
    
    // Constructor - allowed and useful
    public Animal(String name) {
        this.name = name;
        System.out.println("Animal created: " + name);
    }
    
    public abstract void makeSound();
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);  // Calling abstract class constructor
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof!");
    }
}

// Rule 5: Abstract class can have fields (including non-final)
abstract class Counter {
    protected int count = 0;
    
    public abstract void increment();
    
    public int getCount() {
        return count;
    }
}

class ClickCounter extends Counter {
    @Override
    public void increment() {
        count++;
    }
}

// Rule 6: Abstract class can have static methods
abstract class Utility {
    public static void printHelp() {
        System.out.println("This is an abstract utility class");
    }
    
    public abstract void doWork();
}

// Rule 7: Abstract class can have main method (useful for testing)
abstract class TestableAbstract {
    public abstract void run();
    
    public static void main(String[] args) {
        System.out.println("This runs even though class is abstract!");
        // Cannot create instance, but static method works
    }
}

public class AbstractClassRules {
    public static void main(String[] args) {
        // Proper usage: instantiate concrete subclass
        ConcreteImplementation obj = new ConcreteImplementation();
        obj.performAction();
        obj.log("Test message");
        System.out.println("Calculate: " + obj.calculate(5, 3));
        
        Dog myDog = new Dog("Buddy");
        myDog.makeSound();
        
        ClickCounter counter = new ClickCounter();
        counter.increment();
        counter.increment();
        System.out.println("Count: " + counter.getCount());
        
        // Calling static method from abstract class
        Utility.printHelp();
    }
}