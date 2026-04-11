// Real-world method overriding in a School System
class Employee {
    protected String name;
    protected int id;
    protected double salary;
    
    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    public void work() {
        System.out.println(name + " (ID: " + id + ") is working");
    }
    
    public double calculateBonus() {
        // Base bonus: 5% of salary
        return salary * 0.05;
    }
    
    public void displayInfo() {
        System.out.println("Employee: " + name);
        System.out.println("ID: " + id);
        System.out.println("Salary: ₹" + salary);
        System.out.println("Bonus: ₹" + calculateBonus());
    }
}

class Teacher extends Employee {
    private String subject;
    private String department;
    
    public Teacher(String name, int id, double salary, String subject, String department) {
        super(name, id, salary);
        this.subject = subject;
        this.department = department;
    }
    
    @Override
    public void work() {
        System.out.println(name + " is teaching " + subject + " to students");
        System.out.println("Department: " + department);
    }
    
    @Override
    public double calculateBonus() {
        // Teachers get 8% bonus
        return salary * 0.08;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Subject: " + subject);
        System.out.println("Department: " + department);
    }
}

class Manager extends Employee {
    private int teamSize;
    private String projectName;
    
    public Manager(String name, int id, double salary, int teamSize, String projectName) {
        super(name, id, salary);
        this.teamSize = teamSize;
        this.projectName = projectName;
    }
    
    @Override
    public void work() {
        System.out.println(name + " is managing project: " + projectName);
        System.out.println("Leading a team of " + teamSize + " members");
    }
    
    @Override
    public double calculateBonus() {
        // Managers get 12% bonus
        return salary * 0.12;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Project: " + projectName);
        System.out.println("Team Size: " + teamSize);
    }
}

class Developer extends Employee {
    private String programmingLanguage;
    private String specialization;
    
    public Developer(String name, int id, double salary, String programmingLanguage, String specialization) {
        super(name, id, salary);
        this.programmingLanguage = programmingLanguage;
        this.specialization = specialization;
    }
    
    @Override
    public void work() {
        System.out.println(name + " is writing " + programmingLanguage + " code");
        System.out.println("Specialization: " + specialization);
    }
    
    @Override
    public double calculateBonus() {
        // Developers get 10% bonus
        return salary * 0.10;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Language: " + programmingLanguage);
        System.out.println("Specialization: " + specialization);
    }
}

public class RealWorldOverride {
    public static void main(String[] args) {
        System.out.println("=== Real-World Method Overriding ===\n");
        
        // Creating different types of employees
        Teacher teacher = new Teacher("Abhronila", 1001, 65000, "Computer Science", "Engineering");
        Manager manager = new Manager("Swadeep", 1002, 85000, 8, "School Management System");
        Developer developer = new Developer("Tuhina", 1003, 75000, "Java", "Backend Development");
        
        System.out.println("--- Teacher Details ---");
        teacher.displayInfo();
        System.out.println();
        teacher.work();
        
        System.out.println("\n--- Manager Details ---");
        manager.displayInfo();
        System.out.println();
        manager.work();
        
        System.out.println("\n--- Developer Details ---");
        developer.displayInfo();
        System.out.println();
        developer.work();
        
        System.out.println("\n--- Polymorphism Example ---");
        Employee[] employees = {teacher, manager, developer};
        
        for(Employee emp : employees) {
            System.out.println("\n" + emp.name + "'s bonus: ₹" + emp.calculateBonus());
        }
    }
}