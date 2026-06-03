// Multilevel Inheritance Example
class Person {
    String name;
    int age;
    String address;
    
    public void introduce() {
        System.out.println("Hi, I'm " + name + " from " + address);
    }
    
    public void celebrateBirthday() {
        age++;
        System.out.println(name + " is now " + age + " years old!");
    }
}

class Employee extends Person {
    int employeeId;
    String department;
    double salary;
    
    public void work() {
        System.out.println(name + " is working in " + department + " department");
    }
    
    public void attendMeeting() {
        System.out.println(name + " is attending department meeting");
    }
    
    public void getSalary() {
        System.out.println(name + " received salary: ₹" + salary);
    }
}

class Manager extends Employee {
    int teamSize;
    String projectName;
    
    public void conductReview() {
        System.out.println(name + " is conducting performance review for " + teamSize + " team members");
    }
    
    public void manageProject() {
        System.out.println(name + " is managing project: " + projectName);
    }
    
    public void assignTasks() {
        System.out.println(name + " assigned tasks to the team");
    }
    
    @Override
    public void work() {
        System.out.println(name + " is managing and guiding the team on " + projectName);
    }
}

public class MultilevelInheritance {
    public static void main(String[] args) {
        System.out.println("=== Multilevel Inheritance Demo ===\n");
        
        // Creating Manager object (Bottom of chain)
        Manager manager = new Manager();
        
        // Setting properties from all levels
        manager.name = "Abhronila";
        manager.age = 35;
        manager.address = "Shyamnagar";
        manager.employeeId = 1001;
        manager.department = "Software Development";
        manager.salary = 85000;
        manager.teamSize = 8;
        manager.projectName = "School Management System";
        
        // Methods from Person level
        manager.introduce();
        manager.celebrateBirthday();
        
        // Methods from Employee level
        manager.attendMeeting();
        manager.getSalary();
        
        // Overridden method
        manager.work();
        
        // Methods from Manager level
        manager.conductReview();
        manager.manageProject();
        manager.assignTasks();
        
        System.out.println("\n--- Inheritance Chain ---");
        System.out.println("Manager → Employee → Person");
        System.out.println("Manager inherits from Employee which inherits from Person");
    }
}