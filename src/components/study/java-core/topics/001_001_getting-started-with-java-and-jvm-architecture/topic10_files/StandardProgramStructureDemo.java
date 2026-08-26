package topic10_files;

import java.util.Date;
import java.time.LocalDateTime;

/**
 * File: StandardProgramStructureDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 10 - Structure of a standard Java program (package, imports, class, main)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class StandardProgramStructureDemo {

    // 1. Static field
    private static final String ORGANIZATION = "Coder & AccoTax";

    // 2. Instance field
    private String studentName;

    // 3. Constructor
    public StandardProgramStructureDemo(String studentName) {
        this.studentName = studentName;
    }

    // 4. Instance method
    public void displayStudentProfile() {
        System.out.println("Organization: " + ORGANIZATION);
        System.out.println("Enrolled Student: " + this.studentName);
        System.out.println("Session Timestamp: " + LocalDateTime.now());
    }

    // 5. Entry point method (main)
    public static void main(String[] args) {
        System.out.println("=== Standard Java Program Structure Architecture ===");
        
        StandardProgramStructureDemo demo = new StandardProgramStructureDemo("Abhronila from Naihati");
        demo.displayStudentProfile();
    }
}
