/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 6: Unchecked Exceptions (Runtime): Subclasses of java.lang.RuntimeException
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class UncheckedRuntimeExceptionCatalogDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: UNCHECKED RUNTIME EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 5 Most Common Unchecked Exceptions in Java (Subclasses of RuntimeException):");
        System.out.println();

        // 1. ArithmeticException:
        try {
            int result = 100 / 0;
        } catch (ArithmeticException e) {
            System.out.println("  1. ArithmeticException: " + e.getMessage() + " (Integer division by zero)");
        }

        // 2. NullPointerException (NPE):
        try {
            String name = null;
            int len = name.length();
        } catch (NullPointerException e) {
            System.out.println("  2. NullPointerException: Attempted method invocation on null reference");
        }

        // 3. ArrayIndexOutOfBoundsException:
        try {
            int[] scores = { 85, 90, 95 };
            int invalidScore = scores[10];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("  3. ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 3");
        }

        // 4. IllegalArgumentException:
        try {
            Thread.sleep(-500); // Invalid negative duration
        } catch (IllegalArgumentException | InterruptedException e) {
            System.out.println("  4. IllegalArgumentException: " + e.getMessage());
        }

        // 5. NumberFormatException (Subclass of IllegalArgumentException):
        try {
            int val = Integer.parseInt("Barrackpore123");
        } catch (NumberFormatException e) {
            System.out.println("  5. NumberFormatException: " + e.getMessage());
        }

        System.out.println("\n>>> NOTE: Unchecked exceptions indicate PROGRAMMING BUGS that should be fixed via code logic, not try-catch!");

        System.out.println("\n==========================================================================");
    }
}