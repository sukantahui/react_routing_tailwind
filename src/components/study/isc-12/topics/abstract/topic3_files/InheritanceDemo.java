// InheritanceDemo.java
// Demonstrates how abstract classes enable powerful inheritance hierarchies

// Abstract base class
abstract class Employee {
    protected String name;
    protected int id;
    
    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
        System.out.println("Employee constructor called for " + name);
    }
    
    // Concrete method - shared by all subclasses
    public String getName() {
        return name;
    }
    
    public int getId() {
        return id;
    }
    
    // Concrete method with default implementation (can be overridden)
    public void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name);
    }
    
    // Abstract method - each subclass calculates salary differently
    public abstract double calculateSalary();
}

// First concrete subclass
class FullTimeEmployee extends Employee {
    private double monthlySalary;
    private double bonus;
    
    public FullTimeEmployee(String name, int id, double monthlySalary, double bonus) {
        super(name, id);
        this.monthlySalary = monthlySalary;
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return monthlySalary + bonus;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Type: Full-Time, Salary: $" + calculateSalary());
    }
}

// Second concrete subclass
class PartTimeEmployee extends Employee {
    private double hourlyRate;
    private int hoursWorked;
    
    public PartTimeEmployee(String name, int id, double hourlyRate, int hoursWorked) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    
    @Override
    public double calculateSalary() {
        return hourlyRate * hoursWorked;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Type: Part-Time, Hours: " + hoursWorked + ", Rate: $" + hourlyRate);
        System.out.println("Salary: $" + calculateSalary());
    }
}

// Third concrete subclass
class Intern extends Employee {
    private double stipend;
    
    public Intern(String name, int id, double stipend) {
        super(name, id);
        this.stipend = stipend;
    }
    
    @Override
    public double calculateSalary() {
        return stipend; // Interns get fixed stipend
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Type: Intern, Stipend: $" + stipend);
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== Employee Inheritance Demo ===\n");
        
        // Polymorphic array - all treated as Employee
        Employee[] employees = {
            new FullTimeEmployee("Swadeep", 101, 5000, 1000),
            new PartTimeEmployee("Tuhina", 102, 25, 80),
            new Intern("Abhronila", 103, 1200)
        };
        
        // Process all employees uniformly
        for (Employee emp : employees) {
            emp.displayInfo();
            System.out.println("Monthly Salary: $" + emp.calculateSalary());
            System.out.println("------------------------");
        }
        
        // Demonstration of inheritance benefits
        System.out.println("\n=== Polymorphism in Action ===");
        System.out.println("Total payroll: $" + calculateTotalPayroll(employees));
    }
    
    // Method works with any Employee subclass thanks to abstraction
    public static double calculateTotalPayroll(Employee[] employees) {
        double total = 0;
        for (Employee emp : employees) {
            total += emp.calculateSalary();
        }
        return total;
    }
}