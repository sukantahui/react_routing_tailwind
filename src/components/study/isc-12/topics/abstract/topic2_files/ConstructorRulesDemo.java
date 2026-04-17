// ConstructorRulesDemo.java
// Demonstrates constructor rules in abstract classes

abstract class BaseEntity {
    private int id;
    private String name;
    
    // Abstract class constructor - can have parameters
    public BaseEntity(int id, String name) {
        this.id = id;
        this.name = name;
        System.out.println("BaseEntity constructor called: " + name);
    }
    
    // No-arg constructor also allowed
    public BaseEntity() {
        this(0, "Unknown");
    }
    
    public abstract void display();
    
    public int getId() { return id; }
    public String getName() { return name; }
}

abstract class MiddleLayer extends BaseEntity {
    private String department;
    
    public MiddleLayer(int id, String name, String department) {
        super(id, name);  // Must call super constructor explicitly if no default
        this.department = department;
        System.out.println("MiddleLayer constructor called");
    }
    
    // Can add more abstract methods
    public abstract String getDepartmentInfo();
}

class ConcreteEntity extends MiddleLayer {
    private double salary;
    
    public ConcreteEntity(int id, String name, String department, double salary) {
        super(id, name, department);  // Chain up the constructor call
        this.salary = salary;
        System.out.println("ConcreteEntity constructor called");
    }
    
    @Override
    public void display() {
        System.out.println("ID: " + getId() + ", Name: " + getName() + 
                           ", Dept: " + getDepartmentInfo() + ", Salary: " + salary);
    }
    
    @Override
    public String getDepartmentInfo() {
        return "Department: " + (super.getName() != null ? "Active" : "Inactive");
    }
}

// Abstract class with multiple constructors
abstract class Logger {
    private String prefix;
    
    public Logger() {
        this("DEFAULT");
    }
    
    public Logger(String prefix) {
        this.prefix = prefix;
    }
    
    public abstract void log(String message);
    
    protected String getPrefix() {
        return prefix;
    }
}

class FileLogger extends Logger {
    private String filename;
    
    public FileLogger(String filename) {
        super("FILE");  // Choose which super constructor to call
        this.filename = filename;
    }
    
    public FileLogger(String prefix, String filename) {
        super(prefix);
        this.filename = filename;
    }
    
    @Override
    public void log(String message) {
        System.out.println("[" + getPrefix() + "] Writing to " + filename + ": " + message);
    }
}

public class ConstructorRulesDemo {
    public static void main(String[] args) {
        System.out.println("=== Constructor Chain Demo ===");
        ConcreteEntity emp = new ConcreteEntity(101, "Abhronila", "Engineering", 75000);
        emp.display();
        
        System.out.println("\n=== Multiple Constructors ===");
        FileLogger logger1 = new FileLogger("app.log");
        logger1.log("Application started");
        
        FileLogger logger2 = new FileLogger("CUSTOM", "debug.log");
        logger2.log("Debug message");
        
        // Important: You cannot call new on abstract class
        // Logger l = new Logger(); // ERROR
    }
}