// EmployeePayrollSystem.java
// A complete payroll system demonstrating abstract class usage

import java.util.ArrayList;
import java.util.List;

// Abstract base class
abstract class Employee {
    protected String name;
    protected int id;
    protected double baseSalary;
    
    public Employee(String name, int id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }
    
    // Concrete method - common for all employees
    public void displayInfo() {
        System.out.println("ID: " + id + " | Name: " + name);
        System.out.println("Base Salary: $" + baseSalary);
        System.out.println("Total Salary: $" + calculateSalary());
    }
    
    // Abstract method - each employee type calculates differently
    public abstract double calculateSalary();
    
    // Hook method - optional override
    public String getBenefits() {
        return "Standard benefits";
    }
}

// Full-time employee: base salary + annual bonus/12 + benefits
class FullTimeEmployee extends Employee {
    private double annualBonus;
    
    public FullTimeEmployee(String name, int id, double baseSalary, double annualBonus) {
        super(name, id, baseSalary);
        this.annualBonus = annualBonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + (annualBonus / 12);
    }
    
    @Override
    public String getBenefits() {
        return "Health insurance, 401k, Paid time off";
    }
}

// Part-time employee: hourly rate * hours worked
class PartTimeEmployee extends Employee {
    private double hourlyRate;
    private int hoursWorked;
    
    public PartTimeEmployee(String name, int id, double hourlyRate, int hoursWorked) {
        super(name, id, 0); // baseSalary not used for part-time
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    
    @Override
    public double calculateSalary() {
        return hourlyRate * hoursWorked;
    }
    
    @Override
    public String getBenefits() {
        return "Limited benefits (no health insurance)";
    }
}

// Contractor: project-based payment
class Contractor extends Employee {
    private double projectFee;
    
    public Contractor(String name, int id, double projectFee) {
        super(name, id, 0);
        this.projectFee = projectFee;
    }
    
    @Override
    public double calculateSalary() {
        return projectFee;
    }
    
    @Override
    public String getBenefits() {
        return "No benefits (independent contractor)";
    }
}

// Intern: fixed stipend
class Intern extends Employee {
    private double stipend;
    
    public Intern(String name, int id, double stipend) {
        super(name, id, 0);
        this.stipend = stipend;
    }
    
    @Override
    public double calculateSalary() {
        return stipend;
    }
    
    @Override
    public String getBenefits() {
        return "Internship experience, possible conversion";
    }
}

// Payroll processor class
class PayrollSystem {
    private List<Employee> employees = new ArrayList<>();
    
    public void addEmployee(Employee e) {
        employees.add(e);
    }
    
    public void processPayroll() {
        System.out.println("\n=== PAYROLL REPORT ===");
        double totalPayroll = 0;
        
        for (Employee e : employees) {
            e.displayInfo();
            System.out.println("Benefits: " + e.getBenefits());
            System.out.println("------------------------");
            totalPayroll += e.calculateSalary();
        }
        
        System.out.println("TOTAL MONTHLY PAYROLL: $" + totalPayroll);
    }
}

public class EmployeePayrollSystem {
    public static void main(String[] args) {
        PayrollSystem payroll = new PayrollSystem();
        
        // Adding different employee types
        payroll.addEmployee(new FullTimeEmployee("Swadeep", 101, 5000, 12000));
        payroll.addEmployee(new PartTimeEmployee("Tuhina", 102, 25, 80));
        payroll.addEmployee(new Contractor("Abhronila", 103, 4500));
        payroll.addEmployee(new Intern("Debangshu", 104, 1200));
        
        payroll.processPayroll();
        
        System.out.println("\n=== DEMONSTRATING POLYMORPHISM ===");
        // Polymorphic array
        Employee[] team = {
            new FullTimeEmployee("Alice", 201, 6000, 15000),
            new PartTimeEmployee("Bob", 202, 30, 60)
        };
        
        for (Employee e : team) {
            System.out.println(e.name + " earns $" + e.calculateSalary());
        }
    }
}