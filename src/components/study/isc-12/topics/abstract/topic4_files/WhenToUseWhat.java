// WhenToUseWhat.java
// Decision guide: When to use abstract vs concrete class

// SCENARIO 1: You have a clear hierarchy with shared behavior
// Solution: ABSTRACT class
abstract class Employee {
    protected String name;
    protected int id;
    
    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", ID: " + id);
    }
    
    public abstract double calculateSalary(); // Each type calculates differently
}

class Manager extends Employee {
    private double baseSalary;
    private double bonus;
    
    public Manager(String name, int id, double baseSalary, double bonus) {
        super(name, id);
        this.baseSalary = baseSalary;
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
}

// SCENARIO 2: Class is complete and ready to use
// Solution: CONCRETE class
class Address {
    private String street;
    private String city;
    private String zipCode;
    
    public Address(String street, String city, String zipCode) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }
    
    public String getFullAddress() {
        return street + ", " + city + " - " + zipCode;
    }
    
    // All methods fully implemented
    public boolean isValid() {
        return zipCode != null && zipCode.matches("\\d{5}");
    }
}

// SCENARIO 3: Utility class - no instantiation, all static
// Solution: CONCRETE class with private constructor
class MathUtils {
    private MathUtils() {} // Prevent instantiation
    
    public static int add(int a, int b) { return a + b; }
    public static int subtract(int a, int b) { return a - b; }
}

// SCENARIO 4: You want to prevent extension
// Solution: CONCRETE class marked final
final class Configuration {
    private static final String APP_NAME = "MyApp";
    private static final String VERSION = "1.0";
    
    public static String getAppName() { return APP_NAME; }
    public static String getVersion() { return VERSION; }
}

// SCENARIO 5: Template method pattern - algorithm skeleton
// Solution: ABSTRACT class with final template method
abstract class DataProcessor {
    // Template method - defines algorithm structure
    public final void process() {
        load();
        processData();
        save();
        cleanup();
    }
    
    protected abstract void load();
    protected abstract void processData();
    protected abstract void save();
    
    private void cleanup() {
        System.out.println("Cleaning up resources");
    }
}

class CSVProcessor extends DataProcessor {
    @Override protected void load() { System.out.println("Loading CSV"); }
    @Override protected void processData() { System.out.println("Parsing CSV"); }
    @Override protected void save() { System.out.println("Saving CSV data"); }
}

public class WhenToUseWhat {
    public static void main(String[] args) {
        System.out.println("=== Decision Guide ===\n");
        
        System.out.println("USE ABSTRACT CLASS WHEN:");
        System.out.println("1. You have a base class that shouldn't be instantiated");
        System.out.println("2. You want to provide common code to subclasses");
        System.out.println("3. You want to force subclasses to implement specific methods");
        System.out.println("4. You need instance variables (state) in the base class");
        
        System.out.println("\nUSE CONCRETE CLASS WHEN:");
        System.out.println("1. The class is complete and ready to use");
        System.out.println("2. You want to create utility classes (static methods)");
        System.out.println("3. You want to mark the class as final (no extension)");
        System.out.println("4. The class represents a leaf in the hierarchy");
        
        System.out.println("\n=== EXAMPLES ===");
        
        // Abstract class usage
        Manager mgr = new Manager("Debangshu", 1001, 75000, 10000);
        System.out.println("Manager salary: $" + mgr.calculateSalary());
        
        // Concrete class usage
        Address addr = new Address("123 Main St", "Barrackpore", "700120");
        System.out.println("Address: " + addr.getFullAddress());
        
        // Utility class
        System.out.println("5 + 3 = " + MathUtils.add(5, 3));
        
        // Template method
        DataProcessor processor = new CSVProcessor();
        processor.process();
    }
}