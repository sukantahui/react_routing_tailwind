/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 1: The 'catch' Block: Exception Interception, Inspection & Stack Traces
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class CatchBlockInspectionDemo {

    public static void inspectExceptionObject(String input) {
        try {
            int score = Integer.parseInt(input);
            System.out.println("  Parsed Score: " + score);
        } catch (NumberFormatException ex) {
            System.out.println(">>> 1. Intercepted Exception Object Inspection:");
            System.out.println("  ex.getClass().getName() : " + ex.getClass().getName());
            System.out.println("  ex.getMessage()         : " + ex.getMessage());
            System.out.println("  ex.getLocalizedMessage(): " + ex.getLocalizedMessage());

            System.out.println("\n>>> 2. Diagnostic Stack Trace Output (ex.printStackTrace()):");
            ex.printStackTrace(System.out); // Printing to stdout for display
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 'catch' BLOCK INSPECTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        inspectExceptionObject("BarrackporeGradeA");

        System.out.println("\n==========================================================================");
    }
}