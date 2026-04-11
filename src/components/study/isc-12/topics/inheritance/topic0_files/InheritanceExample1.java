// Basic Inheritance Example - Demonstrating simple inheritance
class Employee {
    String name;
    int id;
    
    public void work() {
        System.out.println(name + " (ID: " + id + ") is working");
    }
    
    public void displayInfo() {
        System.out.println("Employee Name: " + name);
        System.out.println("Employee ID: " + id);
    }
}

class Developer extends Employee {
    String programmingLanguage;
    
    public void writeCode() {
        System.out.println(name + " is writing " + programmingLanguage + " code");
    }
    
    public void debug() {
        System.out.println(name + " is debugging the application");
    }
}

public class InheritanceExample1 {
    public static void main(String[] args) {
        // Creating a Developer object
        Developer dev = new Developer();
        
        // Setting inherited properties
        dev.name = "Swadeep";
        dev.id = 101;
        dev.programmingLanguage = "Java";
        
        // Calling inherited method
        dev.displayInfo();
        
        // Calling own methods
        dev.writeCode();
        dev.debug();
        
        // Calling inherited work method
        dev.work();
    }
}

/* OUTPUT:
Employee Name: Swadeep
Employee ID: 101
Swadeep is writing Java code
Swadeep is debugging the application
Swadeep (ID: 101) is working
*/