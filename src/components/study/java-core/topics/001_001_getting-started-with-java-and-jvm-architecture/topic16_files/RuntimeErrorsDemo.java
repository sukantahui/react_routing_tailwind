/**
 * File: RuntimeErrorsDemo.java
 * Module: 001_001_getting-started-with-java-and-jvm-architecture
 * Topic: 16 - Common beginner runtime errors (NPE, ArrayIndexOutOfBounds, ClassCast, StackOverflow, OOM)
 * Author: Sukanta Hui (Coder & AccoTax)
 */
public class RuntimeErrorsDemo {

    public static void main(String[] args) {
        System.out.println("=== Diagnostic Guide to Common Runtime Errors ===");
        
        // 1. Defending against NullPointerException (NPE)
        String studentName = null;
        if (studentName != null) {
            System.out.println("Length: " + studentName.length());
        } else {
            System.out.println("Safely handled: studentName is null (NPE prevented!)");
        }
        
        // 2. Defending against ArrayIndexOutOfBoundsException
        int[] scores = { 92, 88, 95 };
        int targetIndex = 2; // Safe index (length is 3: indices 0, 1, 2)
        if (targetIndex >= 0 && targetIndex < scores.length) {
            System.out.println("Score at index " + targetIndex + ": " + scores[targetIndex]);
        }
        
        // 3. Defending against ClassCastException with 'instanceof'
        Object data = "Sukanta Hui Mentorship";
        if (data instanceof String str) { // Pattern Matching instanceof (Java 16+)
            System.out.println("String content: " + str.toUpperCase());
        }
        
        // Educational summary
        String student = "Tuhina";
        String lab = "Shyamnagar Lab";
        System.out.println("\n" + student + " mastered defensive runtime exception handling at " + lab + ".");
    }
}
