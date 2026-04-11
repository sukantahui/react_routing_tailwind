// Demonstrating the importance of @Override annotation
class Parent {
    public void display() {
        System.out.println("Parent display method");
    }
    
    public void calculate(int x, int y) {
        System.out.println("Parent calculate: " + (x + y));
    }
    
    public Number getValue() {
        return 100;
    }
}

class Child extends Parent {
    // CORRECT: Overriding with @Override
    @Override
    public void display() {
        System.out.println("Child display method - OVERRIDDEN");
    }
    
    // WRONG: This is OVERLOADING, not OVERRIDING (different parameters)
    // Without @Override, this compiles but doesn't override!
    // @Override  // Uncommenting this would cause compilation error
    public void calculate(int x, int y, int z) {
        System.out.println("Child calculate: " + (x + y + z));
    }
    
    // CORRECT: Overriding with covariant return type
    @Override
    public Integer getValue() {
        return 200;
    }
    
    // Common mistake: Misspelled method name
    // @Override
    // public void disply() {  // ERROR! No such method in parent
    //     System.out.println("This won't override anything");
    // }
}

public class OverrideAnnotation {
    public static void main(String[] args) {
        System.out.println("=== @Override Annotation Demo ===\n");
        
        Child child = new Child();
        
        // This calls the overridden method
        child.display();
        
        // This calls Parent's method (not overridden)
        child.calculate(5, 10);
        
        // This calls Child's overloaded method
        child.calculate(5, 10, 15);
        
        // Demonstrating covariant return type
        Number num = child.getValue();
        System.out.println("Value: " + num);
        System.out.println("Type: " + num.getClass().getSimpleName());
        
        System.out.println("\n--- Why @Override is Important ---");
        System.out.println("1. Compiler catches spelling mistakes");
        System.out.println("2. Compiler catches parameter mismatches");
        System.out.println("3. Makes code more readable");
        System.out.println("4. Ensures you're actually overriding");
    }
}