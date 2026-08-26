/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 2: Execution Flow Comparison: Normal Execution vs Exception Branching
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class ExecutionFlowComparisonDemo {

    public static void executeFlowTrace(int divisor) {
        System.out.println("  [1] Statement BEFORE try block");

        try {
            System.out.println("  [2] Inside try block - Step A");
            int result = 100 / divisor; // Fails if divisor is 0!
            System.out.println("  [3] Inside try block - Step B (Calculated: " + result + ")");
        } catch (ArithmeticException ex) {
            System.out.println("  [4] Inside catch block - Handled ArithmeticException!");
        }

        System.out.println("  [5] Statement AFTER try-catch block\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: EXECUTION FLOW COMPARISON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> CASE A: NO EXCEPTION OCCURS (divisor = 2):");
        System.out.println("Expected Sequence: 1 -> 2 -> 3 -> 5 (Catch is skipped)");
        executeFlowTrace(2);

        System.out.println(">>> CASE B: EXCEPTION OCCURS (divisor = 0):");
        System.out.println("Expected Sequence: 1 -> 2 -> (Aborts 3) -> 4 -> 5");
        executeFlowTrace(0);

        System.out.println("==========================================================================");
    }
}