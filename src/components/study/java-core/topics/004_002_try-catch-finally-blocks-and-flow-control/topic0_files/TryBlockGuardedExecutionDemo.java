/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 0: The 'try' Block: Guarding Critical Execution Paths in Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

public class TryBlockGuardedExecutionDemo {

    public static void processStudentTuition(String rawFeeInput) {
        System.out.println("  [ENTRY] Entering transaction processing routine...");

        // The 'try' block marks the guarded section where exceptions might arise:
        try {
            System.out.println("  [GUARDED STEP 1] Attempting to parse fee: " + rawFeeInput);
            int feeAmount = Integer.parseInt(rawFeeInput); // Potential NumberFormatException!

            System.out.println("  [GUARDED STEP 2] Calculating installments (12-month tenure)...");
            int monthlyPayment = feeAmount / 12; // Potential ArithmeticException!

            System.out.println("  [GUARDED STEP 3] Monthly installment: " + monthlyPayment + " INR");
            System.out.println("  [SUCCESS] All guarded statements completed successfully.");
        } catch (NumberFormatException e) {
            System.out.println("  [RECOVERY] Invalid numeric fee format: '" + rawFeeInput + "'");
        }

        System.out.println("  [EXIT] Exiting transaction routine safely.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: THE 'try' BLOCK GUARDED EXECUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Scenario 1: Valid input (All try statements execute smoothly):");
        processStudentTuition("12000");

        System.out.println(">>> Scenario 2: Corrupted input (Execution aborts inside try and jumps to catch):");
        processStudentTuition("Invalid_Ten_Thousand");

        System.out.println("==========================================================================");
    }
}