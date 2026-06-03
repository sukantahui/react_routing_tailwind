// EmployeeHierarchy.java - Single + Multilevel Inheritance
// Scenario: Barrackpore IT Solutions employee management

class Employee {
    protected String name;
    protected int id;
    
    Employee(String name, int id) {
        this.name = name;
        this.id = id;
        System.out.println("Employee constructor: " + name);
    }
    
    void work() {
        System.out.println(name + " is working.");
    }
    
    double calculateSalary() {
        return 30000; // base salary
    }
    
    void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name);
    }
}

class Manager extends Employee {
    private int teamSize;
    
    Manager(String name, int id, int teamSize) {
        super(name, id);
        this.teamSize = teamSize;
        System.out.println("Manager constructor: team size = " + teamSize);
    }
    
    @Override
    void work() {
        System.out.println(name + " is managing a team of " + teamSize);
    }
    
    @Override
    double calculateSalary() {
        return super.calculateSalary() + 20000; // bonus
    }
    
    void conductMeeting() {
        System.out.println(name + " is conducting a meeting.");
    }
}

class Developer extends Employee {
    private String programmingLanguage;
    
    Developer(String name, int id, String language) {
        super(name, id);
        this.programmingLanguage = language;
    }
    
    @Override
    void work() {
        System.out.println(name + " is coding in " + programmingLanguage);
    }
    
    @Override
    double calculateSalary() {
        return super.calculateSalary() + 15000;
    }
}

class Intern extends Employee {
    private int durationMonths;
    
    Intern(String name, int id, int months) {
        super(name, id);
        this.durationMonths = months;
    }
    
    @Override
    void work() {
        System.out.println(name + " is learning and assisting (internship).");
    }
    
    @Override
    double calculateSalary() {
        return 15000; // fixed stipend
    }
}

public class EmployeeHierarchy {
    public static void main(String[] args) {
        // Polymorphic array
        Employee[] employees = {
            new Manager("Swadeep", 101, 5),
            new Developer("Tuhina", 102, "Java"),
            new Intern("Abhronila", 103, 6)
        };
        
        System.out.println("\n--- Work & Salary Report ---");
        for (Employee emp : employees) {
            emp.work();
            System.out.println("Salary: ₹" + emp.calculateSalary());
            emp.displayInfo();
            System.out.println();
        }
        
        // Downcasting example
        if (employees[0] instanceof Manager) {
            Manager mgr = (Manager) employees[0];
            mgr.conductMeeting();
        }
    }
}