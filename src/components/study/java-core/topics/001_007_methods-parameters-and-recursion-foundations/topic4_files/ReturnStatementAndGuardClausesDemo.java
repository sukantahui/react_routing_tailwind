/**
 * File: ReturnStatementAndGuardClausesDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 4)
 * Description: Demonstrates Java return statement semantics and Guard Clauses (JLS §14.17):
 *              1. Returning values vs. void early returns
 *              2. Guard Clauses (Bouncer pattern) eliminating nested if-else pyramids
 *              3. Unreachable statement compiler rules
 *              4. Multiple clean exit points for defensive fee calculation
 *              for student fee installments in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class ReturnStatementAndGuardClausesDemo {

    /**
     * Clean Method with Guard Clauses (Early Return Pattern):
     * Validates arguments upfront and exits immediately if invalid.
     */
    public static double calculateInstallment(double totalFees, int installments, boolean hasLateFee) {
        // Guard Clause 1: Invalid fee
        if (totalFees <= 0.0) {
            System.out.println("  [GUARD TRIGGERED] Total fee must be positive.");
            return 0.0;
        }

        // Guard Clause 2: Invalid installments
        if (installments <= 0 || installments > 12) {
            System.out.println("  [GUARD TRIGGERED] Installments must be between 1 and 12.");
            return 0.0;
        }

        // Main Business Logic (Clean & Un-nested)
        double baseInstallment = totalFees / installments;
        double lateFine = hasLateFee ? 500.0 : 0.0; // ₹500 fixed late fine

        // Final Return
        return baseInstallment + lateFine;
    }

    /**
     * Void Method using 'return;' as an early exit guard
     */
    public static void printReceiptHeader(String studentName, String campus, boolean isRegistered) {
        // Guard Clause in void method:
        if (!isRegistered) {
            System.out.printf("  [ACCESS DENIED] Student %s is not registered at %s campus!%n", studentName, campus);
            return; // Early exit from void method!
        }

        System.out.println("  --------------------------------------------------");
        System.out.printf("  OFFICIAL RECEIPT: %-15s | CAMPUS: %s%n", studentName, campus);
        System.out.println("  Status: Verified & Active");
        System.out.println("  --------------------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 RETURN STATEMENTS & GUARD CLAUSES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. TESTING GUARD CLAUSES WITH INVALID ARGUMENTS ---\n");

        // Test 1: Negative fee triggers Guard Clause 1
        double res1 = calculateInstallment(-5000.0, 3, false);
        System.out.printf("  Result 1: ₹%,.2f%n%n", res1);

        // Test 2: Invalid installments (0) triggers Guard Clause 2
        double res2 = calculateInstallment(24000.0, 0, false);
        System.out.printf("  Result 2: ₹%,.2f%n%n", res2);

        System.out.println("--- 2. TESTING VALID INSTALLMENT COMPUTATIONS ---\n");

        // Test 3: Valid calculation for Swadeep
        double swadeepInstallment = calculateInstallment(24000.0, 4, false);
        System.out.printf("  Swadeep Installment (4 parts, no late fee) : ₹%,.2f%n", swadeepInstallment);

        // Test 4: Valid calculation for Tuhina with late fee
        double tuhinaInstallment = calculateInstallment(15000.0, 3, true);
        System.out.printf("  Tuhina Installment  (3 parts + ₹500 late)  : ₹%,.2f%n%n", tuhinaInstallment);

        System.out.println("--- 3. TESTING VOID EARLY RETURN IN PRINTING ---\n");
        printReceiptHeader("Abhronila", "Shyamnagar", true);
        printReceiptHeader("Debangshu", "Ichapur", false); // Triggers early return

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'return expression;' returns a value and exits the method immediately.");
        System.out.println("2. 'return;' with no expression exits a void method cleanly.");
        System.out.println("3. Guard Clauses check boundary/error conditions first, eliminating nested pyramids.");
        System.out.println("4. Code placed directly after an unconditional return causes an Unreachable Code error.");
        System.out.println("================================================================================");
    }
}
