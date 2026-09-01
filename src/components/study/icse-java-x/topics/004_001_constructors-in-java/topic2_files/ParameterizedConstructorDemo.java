/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 2
 * Parameterized Constructor & The 'this' Keyword
 *
 * Demonstrates:
 * 1. Passing dynamic arguments to initialize object state during creation.
 * 2. Using 'this' keyword to resolve variable shadowing between instance variables and parameters.
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class ParameterizedConstructorDemo {

    // Instance variables (State)
    private String studentName;
    private int rollNumber;
    private double percentage;

    // Parameterized Constructor using 'this' keyword
    public ParameterizedConstructorDemo(String studentName, int rollNumber, double percentage) {
        System.out.println(">>> Parameterized Constructor Invoked with Custom Arguments!");
        // 'this.studentName' refers to instance field; 'studentName' refers to parameter
        this.studentName = studentName;
        this.rollNumber = rollNumber;
        this.percentage = percentage;
    }

    public void displayProfile() {
        System.out.println("----------------------------------------");
        System.out.println("Student Name : " + this.studentName);
        System.out.println("Roll Number  : " + this.rollNumber);
        System.out.println("Percentage   : " + this.percentage + "%");
        System.out.println("----------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("--- Instantiating Objects with Custom Data ---");
        
        // Creating student 1
        ParameterizedConstructorDemo s1 = new ParameterizedConstructorDemo("Rahul Sharma", 101, 92.4);
        s1.displayProfile();

        // Creating student 2
        ParameterizedConstructorDemo s2 = new ParameterizedConstructorDemo("Ananya Roy", 102, 95.8);
        s2.displayProfile();
    }
}
