/**
 * Java Core Tutorial - Module 004_005: Propagation, Chaining & Best Practices
 * Topic 3: Reading & Deciphering Java Stack Traces: Root Causes, Files & Line Numbers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class DecipheringStackTracesDemo {

    public static void computeStudentRank(String scoreString) {
        parseAndRank(scoreString); // Line 12
    }

    public static void parseAndRank(String scoreString) {
        int val = Integer.parseInt(scoreString); // Line 16 (Throws NumberFormatException)
        System.out.println("  Rank score calculated: " + val);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: DECIPHERING JAVA STACK TRACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try {
            computeStudentRank("Invalid_Grade_A");
        } catch (NumberFormatException e) {
            System.out.println(">>> 1. RAW STACK TRACE OUTPUT:");
            e.printStackTrace(System.out);

            System.out.println("\n>>> 2. HOW TO READ A JAVA STACK TRACE IN 3 STEPS:");
            System.out.println("  Step 1 (Top Line): Identifies the Exception Class and Message ('NumberFormatException: For input string...')");
            System.out.println("  Step 2 (First 'at' line in your package): The exact line where the exception exploded (Line 16 in parseAndRank).");
            System.out.println("  Step 3 (Subsequent 'at' lines downward): The historical chain of caller methods leading up to the crash.");
        }

        System.out.println("\n==========================================================================");
    }
}