/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 1
 * Default Constructor vs User-Defined Non-Parameterized Constructor
 *
 * Demonstrates:
 * 1. Automatic insertion of compiler default constructor when no constructors are defined.
 * 2. Loss of default constructor once a parameterized constructor is declared.
 * 3. Default zero/null initialization values for primitive and reference data types.
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class DefaultConstructorDemo {

    // Instance variables of various data types
    private int intVal;
    private double doubleVal;
    private boolean booleanVal;
    private char charVal;
    private String stringVal;

    // Explicit Non-Parameterized Constructor
    public DefaultConstructorDemo() {
        System.out.println(">>> User-Defined Non-Parameterized Constructor Invoked!");
        // We explicitly set initial values
        intVal = 10;
        doubleVal = 99.5;
        booleanVal = true;
        charVal = 'A';
        stringVal = "Coder & AccoTax";
    }

    public void displayDefaults() {
        System.out.println("----------------------------------------");
        System.out.println("Integer Value  : " + intVal);
        System.out.println("Double Value   : " + doubleVal);
        System.out.println("Boolean Value  : " + booleanVal);
        System.out.println("Char Value     : '" + charVal + "'");
        System.out.println("String Value   : " + stringVal);
        System.out.println("----------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("--- Creating Object with Non-Parameterized Constructor ---");
        DefaultConstructorDemo obj = new DefaultConstructorDemo();
        obj.displayDefaults();
    }
}
