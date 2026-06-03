// Single Inheritance Example
class Student {
    String name;
    int rollNumber;
    
    public void study() {
        System.out.println(name + " is studying");
    }
    
    public void displayInfo() {
        System.out.println("Student: " + name + ", Roll No: " + rollNumber);
    }
}

class CollegeStudent extends Student {
    String collegeName;
    String major;
    
    public void attendLecture() {
        System.out.println(name + " is attending " + major + " lecture at " + collegeName);
    }
    
    public void submitAssignment() {
        System.out.println(name + " submitted assignment in " + major);
    }
}

public class SingleInheritance {
    public static void main(String[] args) {
        // Creating object of child class
        CollegeStudent student = new CollegeStudent();
        
        // Setting inherited properties
        student.name = "Swadeep";
        student.rollNumber = 42;
        student.collegeName = "Barrackpore Engineering College";
        student.major = "Computer Science";
        
        // Calling inherited method
        student.displayInfo();
        student.study();
        
        // Calling child-specific methods
        student.attendLecture();
        student.submitAssignment();
    }
}