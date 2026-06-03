// SuperVariableExample.java
// Demonstrates using 'super' to access hidden parent class variables

class ParentClass {
    String name = "Parent's Name";
    int age = 50;
    
    void display() {
        System.out.println("Parent Display: " + name + ", Age: " + age);
    }
}

class ChildClass extends ParentClass {
    // This variable hides the parent's 'name' variable
    String name = "Child's Name";
    int rollNumber = 101;
    
    void showVariables() {
        // Accessing child's own variable
        System.out.println("Child's name: " + name);
        
        // Accessing parent's hidden variable using 'super'
        System.out.println("Parent's name (using super): " + super.name);
        
        // Accessing parent's age (not hidden, but still accessible)
        System.out.println("Parent's age: " + super.age);
        
        // Accessing child's roll number
        System.out.println("Child's roll number: " + rollNumber);
    }
    
    void display() {
        super.display();  // Calling parent's display method
        System.out.println("Child Display: " + name + ", Roll: " + rollNumber);
    }
}

public class SuperVariableExample {
    public static void main(String[] args) {
        System.out.println("=== super Keyword - Variable Access Demo ===\n");
        
        ChildClass child = new ChildClass();
        child.showVariables();
        
        System.out.println("\n=== Display Method Demo ===");
        child.display();
    }
}

/* EXPECTED OUTPUT:
=== super Keyword - Variable Access Demo ===

Child's name: Child's Name
Parent's name (using super): Parent's Name
Parent's age: 50
Child's roll number: 101

=== Display Method Demo ===
Parent Display: Parent's Name, Age: 50
Child Display: Child's Name, Roll: 101
*/