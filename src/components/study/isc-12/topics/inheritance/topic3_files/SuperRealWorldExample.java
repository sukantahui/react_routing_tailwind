// SuperRealWorldExample.java
// Real-world school management system demonstrating all super keyword usages

class Person {
    private String name;
    private int age;
    private String role;
    
    // Parent constructor
    Person(String name, int age, String role) {
        this.name = name;
        this.age = age;
        this.role = role;
        System.out.println("Person constructor: " + name + " created as " + role);
    }
    
    void displayInfo() {
        System.out.println("=== Person Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Role: " + role);
    }
    
    void performDuty() {
        System.out.println(name + " is performing general duties as a " + role);
    }
    
    String getRole() {
        return role;
    }
}

class Student extends Person {
    private int rollNumber;
    private String className;
    private String role;  // This hides Person's role variable
    
    Student(String name, int age, int rollNumber, String className) {
        super(name, age, "Student");  // Calling parent constructor with specific role
        this.rollNumber = rollNumber;
        this.className = className;
        this.role = "Student Member";  // Hiding parent's role
        System.out.println("Student constructor: " + name + " added to class " + className);
    }
    
    @Override
    void displayInfo() {
        super.displayInfo();  // Reusing parent's display logic
        System.out.println("=== Student Specific Information ===");
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Class: " + className);
        System.out.println("Local Role: " + this.role);
        System.out.println("Parent's Role (via super): " + super.getRole());
    }
    
    @Override
    void performDuty() {
        System.out.println("Student is studying and completing homework");
        System.out.print("But also, ");
        super.performDuty();  // Calling parent's version to show general duty
    }
    
    void showRoleComparison() {
        System.out.println("\n=== Role Comparison ===");
        System.out.println("Student's own role variable: " + this.role);
        System.out.println("Parent's role variable (via super): " + super.getRole());
    }
}

class Teacher extends Person {
    private String subject;
    private String employeeId;
    
    Teacher(String name, int age, String subject, String employeeId) {
        super(name, age, "Teacher");
        this.subject = subject;
        this.employeeId = employeeId;
        System.out.println("Teacher constructor: " + name + " teaches " + subject);
    }
    
    @Override
    void displayInfo() {
        super.displayInfo();
        System.out.println("=== Teacher Specific Information ===");
        System.out.println("Subject: " + subject);
        System.out.println("Employee ID: " + employeeId);
    }
    
    @Override
    void performDuty() {
        System.out.println("Teacher is taking classes and checking assignments");
        super.performDuty();  // Shows the general duty as well
    }
}

public class SuperRealWorldExample {
    public static void main(String[] args) {
        System.out.println("=== Shyamnagar School District Management System ===\n");
        
        // Create a Student - Tuhina from Barrackpore
        System.out.println("--- Registering Student: Tuhina ---");
        Student tuhina = new Student("Tuhina", 15, 101, "10th Grade");
        tuhina.displayInfo();
        tuhina.performDuty();
        tuhina.showRoleComparison();
        
        System.out.println("\n--- Registering Teacher: Swadeep ---");
        // Create a Teacher - Swadeep from Ichapur
        Teacher swadeep = new Teacher("Swadeep", 35, "Computer Science", "TCH-2024-001");
        swadeep.displayInfo();
        swadeep.performDuty();
        
        System.out.println("\n--- Registering Another Student: Abhronila from Naihati ---");
        Student abhronila = new Student("Abhronila", 14, 102, "9th Grade");
        abhronila.displayInfo();
        
        System.out.println("\n=== Summary of super Keyword Usage ===");
        System.out.println("1. super(name, age, role) - Called parent constructor");
        System.out.println("2. super.displayInfo() - Called parent's overridden method");
        System.out.println("3. super.performDuty() - Called parent's method from child's override");
        System.out.println("4. super.getRole() - Accessed parent's method to get hidden variable");
    }
}

/* EXPECTED OUTPUT:
=== Shyamnagar School District Management System ===

--- Registering Student: Tuhina ---
Person constructor: Tuhina created as Student
Student constructor: Tuhina added to class 10th Grade
=== Person Information ===
Name: Tuhina
Age: 15
Role: Student
=== Student Specific Information ===
Roll Number: 101
Class: 10th Grade
Local Role: Student Member
Parent's Role (via super): Student
Student is studying and completing homework
But also, Tuhina is performing general duties as a Student

=== Role Comparison ===
Student's own role variable: Student Member
Parent's role variable (via super): Student

--- Registering Teacher: Swadeep ---
Person constructor: Swadeep created as Teacher
Teacher constructor: Swadeep teaches Computer Science
=== Person Information ===
Name: Swadeep
Age: 35
Role: Teacher
=== Teacher Specific Information ===
Subject: Computer Science
Employee ID: TCH-2024-001
Teacher is taking classes and checking assignments
Swadeep is performing general duties as a Teacher

--- Registering Another Student: Abhronila from Naihati ---
Person constructor: Abhronila created as Student
Student constructor: Abhronila added to class 9th Grade
=== Person Information ===
Name: Abhronila
Age: 14
Role: Student
=== Student Specific Information ===
Roll Number: 102
Class: 9th Grade
Local Role: Student Member
Parent's Role (via super): Student

=== Summary of super Keyword Usage ===
1. super(name, age, role) - Called parent constructor
2. super.displayInfo() - Called parent's overridden method
3. super.performDuty() - Called parent's method from child's override
4. super.getRole() - Accessed parent's method to get hidden variable
*/