// ExpressionExample.java
// A simple demonstration of expressions in Java.

public class ExpressionExample {
    public static void main(String[] args) {
        // Declare variables for marks
        int maths = 85;
        int science = 92;
        int english = 78;

        // Expression: totalMarks = maths + science + english
        int totalMarks = maths + science + english;

        // Another expression: average
        double average = totalMarks / 3.0; // using 3.0 to force floating-point division

        // Output results
        System.out.println("Total Marks: " + totalMarks);
        System.out.println("Average: " + average);

        // Boolean expression: check if total is above 200
        boolean isPassing = totalMarks > 200;
        System.out.println("Is passing? " + isPassing);
    }
}