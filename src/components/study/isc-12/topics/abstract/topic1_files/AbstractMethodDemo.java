// AbstractMethodDemo.java
// Focus on abstract method rules and behavior

abstract class Employee {
    protected String name;
    protected double baseSalary;
    
    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    
    // Concrete method
    public void printDetails() {
        System.out.println("Employee: " + name);
        System.out.println("Base Salary: $" + baseSalary);
        System.out.println("Total Salary: $" + calculateSalary()); // calls abstract method
    }
    
    // Abstract method - each employee type has its own salary calculation
    public abstract double calculateSalary();
    
    // Abstract method with parameters
    public abstract void giveBonus(double amount);
}

class FullTimeEmployee extends Employee {
    private double annualBonus;
    
    public FullTimeEmployee(String name, double baseSalary, double annualBonus) {
        super(name, baseSalary);
        this.annualBonus = annualBonus;
    }
    
    @Override
    public double calculateSalary() {
        // Full-time: base salary + annual bonus / 12
        return baseSalary + (annualBonus / 12);
    }
    
    @Override
    public void giveBonus(double amount) {
        annualBonus += amount;
        System.out.println(name + " received bonus of $" + amount);
    }
}

class ContractEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;
    
    public ContractEmployee(String name, double hourlyRate, int hoursWorked) {
        super(name, 0); // baseSalary not used for contractors
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    
    @Override
    public double calculateSalary() {
        // Contractor: hourly rate * hours worked
        return hourlyRate * hoursWorked;
    }
    
    @Override
    public void giveBonus(double amount) {
        // Contractors might not get bonuses, but we implement anyway
        System.out.println(name + " (contractor) received special payment of $" + amount);
        hourlyRate += (amount / hoursWorked);
    }
}

public class AbstractMethodDemo {
    public static void main(String[] args) {
        Employee emp1 = new FullTimeEmployee("Swadeep", 5000, 12000);
        Employee emp2 = new ContractEmployee("Tuhina", 45, 160);
        
        emp1.printDetails();
        emp1.giveBonus(2000);
        emp1.printDetails();
        
        System.out.println();
        
        emp2.printDetails();
        emp2.giveBonus(500);
        emp2.printDetails();
    }
}
