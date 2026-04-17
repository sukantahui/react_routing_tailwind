// SchoolManagementSystem.java
// School management for Barrackpore institutions

import java.util.ArrayList;
import java.util.List;

// Abstract Person class
abstract class Person {
    protected String name;
    protected int age;
    protected String address;
    
    public Person(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    
    public abstract void displayRole();
    public abstract String getDuties();
    
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Address: " + address);
        displayRole();
        System.out.println("Duties: " + getDuties());
    }
}

// Abstract Employee (extends Person)
abstract class Employee extends Person {
    protected int employeeId;
    protected double salary;
    protected String department;
    
    public Employee(String name, int age, String address, int employeeId, double salary, String department) {
        super(name, age, address);
        this.employeeId = employeeId;
        this.salary = salary;
        this.department = department;
    }
    
    public abstract double calculateMonthlySalary();
    
    @Override
    public void displayRole() {
        System.out.println("Role: Employee (ID: " + employeeId + ")");
        System.out.println("Department: " + department);
        System.out.println("Base Salary: $" + salary);
        System.out.println("Monthly Take-home: $" + calculateMonthlySalary());
    }
}

// Teacher class
class Teacher extends Employee {
    private String subject;
    private int classesPerWeek;
    private static final double EXTRA_PER_CLASS = 50;
    
    public Teacher(String name, int age, String address, int employeeId, double salary, String department, String subject, int classesPerWeek) {
        super(name, age, address, employeeId, salary, department);
        this.subject = subject;
        this.classesPerWeek = classesPerWeek;
    }
    
    @Override
    public double calculateMonthlySalary() {
        // Teachers get extra for extra classes
        int extraClasses = Math.max(0, classesPerWeek - 20);
        return salary + (extraClasses * EXTRA_PER_CLASS * 4);
    }
    
    @Override
    public String getDuties() {
        return "Teach " + subject + ", prepare lessons, grade assignments, parent meetings";
    }
    
    @Override
    public void displayRole() {
        super.displayRole();
        System.out.println("Subject: " + subject);
        System.out.println("Classes per week: " + classesPerWeek);
    }
}

// Staff class (non-teaching)
class Staff extends Employee {
    private String shift;
    
    public Staff(String name, int age, String address, int employeeId, double salary, String department, String shift) {
        super(name, age, address, employeeId, salary, department);
        this.shift = shift;
    }
    
    @Override
    public double calculateMonthlySalary() {
        // Staff get fixed salary
        return salary;
    }
    
    @Override
    public String getDuties() {
        return "Administrative work, manage " + department + ", " + shift + " shift";
    }
    
    @Override
    public void displayRole() {
        super.displayRole();
        System.out.println("Shift: " + shift);
    }
}

// Student class (non-employee)
class Student extends Person {
    private int rollNumber;
    private String grade;
    private List<String> subjects = new ArrayList<>();
    
    public Student(String name, int age, String address, int rollNumber, String grade) {
        super(name, age, address);
        this.rollNumber = rollNumber;
        this.grade = grade;
    }
    
    public void addSubject(String subject) {
        subjects.add(subject);
    }
    
    @Override
    public void displayRole() {
        System.out.println("Role: Student (Roll No: " + rollNumber + ")");
        System.out.println("Grade: " + grade);
        System.out.println("Subjects: " + String.join(", ", subjects));
    }
    
    @Override
    public String getDuties() {
        return "Attend classes, complete homework, participate in activities";
    }
}

// School class to manage everyone
class School {
    private String name;
    private List<Person> members = new ArrayList<>();
    
    public School(String name) {
        this.name = name;
    }
    
    public void addMember(Person p) {
        members.add(p);
    }
    
    public void displayAllMembers() {
        System.out.println("\n=== " + name.toUpperCase() + " DIRECTORY ===");
        for (Person p : members) {
            System.out.println("\n---");
            p.displayInfo();
        }
    }
    
    public double calculateTotalSalaryExpense() {
        double total = 0;
        for (Person p : members) {
            if (p instanceof Employee) {
                total += ((Employee) p).calculateMonthlySalary();
            }
        }
        return total;
    }
}

public class SchoolManagementSystem {
    public static void main(String[] args) {
        School school = new School("Barrackpore Public School");
        
        // Add teachers
        school.addMember(new Teacher("Mrs. Mukherjee", 45, "Barrackpore", 1001, 45000, "Science", "Physics", 24));
        school.addMember(new Teacher("Mr. Das", 38, "Shyamnagar", 1002, 42000, "Mathematics", "Algebra", 22));
        
        // Add staff
        school.addMember(new Staff("Mr. Sen", 50, "Ichapur", 2001, 28000, "Administration", "Morning"));
        school.addMember(new Staff("Ms. Ghosh", 35, "Naihati", 2002, 25000, "Library", "Evening"));
        
        // Add students
        Student s1 = new Student("Swadeep", 15, "Barrackpore", 101, "10th");
        s1.addSubject("Physics");
        s1.addSubject("Mathematics");
        s1.addSubject("Computer Science");
        school.addMember(s1);
        
        Student s2 = new Student("Tuhina", 14, "Shyamnagar", 102, "9th");
        s2.addSubject("Biology");
        s2.addSubject("Chemistry");
        s2.addSubject("English");
        school.addMember(s2);
        
        Student s3 = new Student("Abhronila", 16, "Ichapur", 103, "11th");
        s3.addSubject("Economics");
        s3.addSubject("Business Studies");
        s3.addSubject("Accountancy");
        school.addMember(s3);
        
        // Display all
        school.displayAllMembers();
        
        System.out.println("\n=== FINANCIAL SUMMARY ===");
        System.out.println("Total monthly salary expense: ₹" + school.calculateTotalSalaryExpense());
    }
}