// topic0_files/VariableDeclaration.java
// Demonstrates variable declaration, initialization, and usage

public class VariableDeclaration {
    public static void main(String[] args) {
        // Declaration without initialization
        int studentAge;
        double averageScore;
        String studentName;

        // Initialization later
        studentAge = 16;
        averageScore = 85.75;
        studentName = "Swadeep";

        // Declare + initialize in one line
        int totalStudents = 30;
        final String SCHOOL_NAME = "Barrackpore High School";

        // Output
        System.out.println("Student: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("Score: " + averageScore);
        System.out.println("Total Students: " + totalStudents);
        System.out.println("School: " + SCHOOL_NAME);
    }
}