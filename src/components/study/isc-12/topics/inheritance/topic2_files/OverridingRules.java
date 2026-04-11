// Demonstrating rules of method overriding
class ParentClass {
    // Public method
    public void publicMethod() {
        System.out.println("Parent public method");
    }
    
    // Protected method
    protected void protectedMethod() {
        System.out.println("Parent protected method");
    }
    
    // Default (package-private) method
    void defaultMethod() {
        System.out.println("Parent default method");
    }
    
    // Method with return type
    Number getNumber() {
        return 100;
    }
    
    // Method with exception
    void riskyMethod() throws Exception {
        System.out.println("Parent risky method");
    }
    
    // Final method - cannot be overridden
    public final void finalMethod() {
        System.out.println("Parent final method - cannot override");
    }
    
    // Static method - hidden, not overridden
    public static void staticMethod() {
        System.out.println("Parent static method");
    }
    
    // Private method - not inherited
    private void privateMethod() {
        System.out.println("Parent private method");
    }
}

class ChildClass extends ParentClass {
    // CORRECT: Can increase access (public is broader than protected)
    @Override
    public void protectedMethod() {
        System.out.println("Child protected method (now public)");
    }
    
    // CORRECT: Can keep same access
    @Override
    public void defaultMethod() {
        System.out.println("Child default method");
    }
    
    // CORRECT: Covariant return type
    @Override
    public Integer getNumber() {
        return 200;
    }
    
    // CORRECT: Can throw narrower exception
    @Override
    void riskyMethod() throws RuntimeException {
        System.out.println("Child risky method - narrower exception");
    }
    
    // CANNOT override final method
    // @Override
    // public void finalMethod() { }  // COMPILER ERROR!
    
    // CANNOT override static method (this is hiding, not overriding)
    public static void staticMethod() {
        System.out.println("Child static method - hiding parent");
    }
    
    // CANNOT override private method (not visible)
    // @Override
    // private void privateMethod() { }  // COMPILER ERROR!
    
    // This would cause error: weaker access
    // @Override
    // private void publicMethod() { }  // COMPILER ERROR!
}

public class OverridingRules {
    public static void main(String[] args) {
        System.out.println("=== Method Overriding Rules ===\n");
        
        ChildClass child = new ChildClass();
        
        System.out.println("--- Allowed Overrides ---");
        child.publicMethod();
        child.protectedMethod();
        child.defaultMethod();
        
        System.out.println("\n--- Covariant Return Type ---");
        Number num = child.getNumber();
        System.out.println("Return type: " + num.getClass().getSimpleName());
        System.out.println("Value: " + num);
        
        System.out.println("\n--- Exception Handling ---");
        child.riskyMethod();
        
        System.out.println("\n--- Static Method Hiding ---");
        ChildClass.staticMethod();
        ParentClass.staticMethod();
        
        System.out.println("\n--- Summary of Rules ---");
        System.out.println("✓ Same method name & parameters");
        System.out.println("✓ Same or covariant return type");
        System.out.println("✓ Same or broader access modifier");
        System.out.println("✓ Same or narrower exceptions");
        System.out.println("✗ Cannot override final methods");
        System.out.println("✗ Cannot override private methods");
        System.out.println("✗ Cannot override static methods (hidden)");
    }
}