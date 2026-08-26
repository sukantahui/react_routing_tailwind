/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 3: Detailed Comparison: 'throw' vs 'throws' Keywords in Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.IOException;

public class ThrowVsThrowsComparisonDemo {

    // Method combining BOTH 'throws' (in signature) and 'throw' (inside body):
    public static void processEnrollment(String studentName, int feePaid) throws IOException {
        // 'throws' is in signature (DECLARATION)

        if (studentName == null) {
            // 'throw' is inside body (EXECUTION OF ACTION)
            throw new NullPointerException("Student name cannot be null!");
        }

        if (feePaid < 5000) {
            // 'throw' raises an explicit checked exception
            throw new IOException("Minimum admission deposit of 5000 INR required for " + studentName);
        }

        System.out.println("  [SUCCESS] Enrolled " + studentName + " with deposit of " + feePaid + " INR");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: 'throw' vs 'throws' COMPARISON MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+----------------------+---------------------------------+---------------------------------+");
        System.out.println("| Feature              | 'throw'                         | 'throws'                        |");
        System.out.println("+----------------------+---------------------------------+---------------------------------+");
        System.out.println("| Location             | Inside method body              | In method signature / header    |");
        System.out.println("| Purpose              | Explicitly triggers an exception| Declares potential exceptions   |");
        System.out.println("| Operand              | Instance of Throwable (object)  | Class types (comma-separated)   |");
        System.out.println("| Quantity             | Exactly 1 instance at a time    | Multiple classes allowed        |");
        System.out.println("| Execution Effect     | Halts execution immediately     | Does not halt execution itself  |");
        System.out.println("+----------------------+---------------------------------+---------------------------------+");

        System.out.println("\n>>> Executing Demo Invocation:");
        try {
            processEnrollment("Tuhina Das", 2000);
        } catch (IOException e) {
            System.out.println("  [CAUGHT] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}