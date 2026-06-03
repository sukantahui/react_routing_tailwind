// Complete Real-World School System Example
class Person {
    String name;
    int age;
    String phoneNumber;
    String email;
    
    public Person() {
        System.out.println("Creating a new person...");
    }
    
    public void introduce() {
        System.out.println("Hello! I'm " + name + ", age " + age);
    }
    
    public void contact() {
        System.out.println("Contact " + name + " at: " + phoneNumber + " or " + email);
    }
}

// Single Inheritance: Student extends Person
class Student extends Person {
    int rollNumber;
    String grade;
    double[] marks = new double[5];
    
    public void study() {
        System.out.println(name + " is studying for " + grade + " grade");
    }
    
    public void takeExam() {
        System.out.println(name + " is taking final exams");
    }
    
    public double calculatePercentage() {
        double total = 0;
        for(double mark : marks) {
            total += mark;
        }
        return total / marks.length;
    }
}

// Multilevel Inheritance: CollegeStudent extends Student
class CollegeStudent extends Student {
    String collegeName;
    String major;
    int semester;
    
    public void attendSeminar() {
        System.out.println(name + " attending " + major + " seminar at " + collegeName);
    }
    
    public void submitThesis() {
        System.out.println(name + " submitting thesis proposal");
    }
    
    @Override
    public void study() {
        System.out.println(name + " is studying " + major + " subjects for semester " + semester);
    }
}

// Hierarchical Inheritance: Teacher extends Person
class Teacher extends Person {
    String employeeId;
    String subject;
    double salary;
    
    public void teach() {
        System.out.println("Teacher " + name + " is teaching " + subject);
    }
    
    public void gradePapers() {
        System.out.println(name + " is grading " + subject + " papers");
    }
    
    public void takeAttendance() {
        System.out.println(name + " taking attendance for " + subject + " class");
    }
}

// Hierarchical Inheritance: Staff extends Person
class Staff extends Person {
    String staffId;
    String role;
    String shift;
    
    public void performDuty() {
        System.out.println(name + " performing " + role + " duties during " + shift + " shift");
    }
    
    public void manageFacilities() {
        System.out.println(name + " is managing school facilities");
    }
}

public class RealWorldInheritance {
    public static void main(String[] args) {
        System.out.println("=== Real-World School System ===\n");
        
        // Hierarchical: Teacher from Shyamnagar
        Teacher teacher = new Teacher();
        teacher.name = "Abhronila";
        teacher.age = 32;
        teacher.phoneNumber = "9876543210";
        teacher.email = "abhronila@school.edu";
        teacher.employeeId = "TCH101";
        teacher.subject = "Computer Science";
        teacher.salary = 65000;
        
        teacher.introduce();
        teacher.teach();
        teacher.gradePapers();
        teacher.contact();
        
        System.out.println("\n--- --- ---\n");
        
        // Single Inheritance: Student from Barrackpore
        Student student = new Student();
        student.name = "Swadeep";
        student.age = 16;
        student.phoneNumber = "9876543211";
        student.email = "swadeep@student.edu";
        student.rollNumber = 25;
        student.grade = "10th";
        student.marks = new double[]{85, 90, 88, 92, 87};
        
        student.introduce();
        student.study();
        student.takeExam();
        System.out.println("Percentage: " + student.calculatePercentage() + "%");
        
        System.out.println("\n--- --- ---\n");
        
        // Multilevel Inheritance: CollegeStudent from Naihati
        CollegeStudent collegeStudent = new CollegeStudent();
        collegeStudent.name = "Tuhina";
        collegeStudent.age = 19;
        collegeStudent.phoneNumber = "9876543212";
        collegeStudent.email = "tuhina@university.edu";
        collegeStudent.rollNumber = 101;
        collegeStudent.grade = "College";
        collegeStudent.collegeName = "Naihati University";
        collegeStudent.major = "Computer Science";
        collegeStudent.semester = 3;
        
        collegeStudent.introduce();
        collegeStudent.study();
        collegeStudent.attendSeminar();
        collegeStudent.submitThesis();
        collegeStudent.contact();
        
        System.out.println("\n--- --- ---\n");
        
        // Hierarchical: Staff from Ichapur
        Staff staff = new Staff();
        staff.name = "Debangshu";
        staff.age = 28;
        staff.phoneNumber = "9876543213";
        staff.email = "debangshu@school.edu";
        staff.staffId = "STF202";
        staff.role = "Librarian";
        staff.shift = "Morning";
        
        staff.introduce();
        staff.performDuty();
        staff.manageFacilities();
        
        System.out.println("\n=== Inheritance Types Summary ===");
        System.out.println("1. Single: Student → CollegeStudent");
        System.out.println("2. Multilevel: Person → Student → CollegeStudent");
        System.out.println("3. Hierarchical: Person → Teacher, Person → Staff, Person → Student");
        System.out.println("\nNote: Java supports Single, Multilevel, and Hierarchical only!");
    }
}