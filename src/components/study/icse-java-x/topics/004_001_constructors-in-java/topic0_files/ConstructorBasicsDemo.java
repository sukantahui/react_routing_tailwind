/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 0
 * Need and Purpose of Java Constructors
 *
 * Demonstrates:
 * 1. Default vs explicit object initialization.
 * 2. Automatic invocation of constructor during 'new' keyword execution.
 * 3. Memory allocation on Heap and initial variable binding.
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class ConstructorBasicsDemo {

    // Instance variables (State of the object)
    private String studentName;
    private int rollNumber;
    private double percentage;

    // Explicit Default Constructor (No arguments)
    public ConstructorBasicsDemo() {
        System.out.println(">>> Constructor Executed: Initializing Student Object...");
        studentName = "Unassigned Student";
        rollNumber = 100;
        percentage = 0.0;
    }

    // Method to display state
    public void displayStudentDetails() {
        System.out.println("----------------------------------------");
        System.out.println("Student Name : " + studentName);
        System.out.println("Roll Number  : " + rollNumber);
        System.out.println("Percentage   : " + percentage + "%");
        System.out.println("----------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("--- Starting Java Object Instantiation ---");
        
        // Creating object using 'new' operator -> triggers ConstructorBasicsDemo()
        ConstructorBasicsDemo s1 = new ConstructorBasicsDemo();
        
        // Displaying state after constructor initialization
        s1.displayStudentDetails();
        
        System.out.println("--- End of Program ---");
    }
}
