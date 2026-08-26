/**
 * File: LoopComparisonDecisionMatrixDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 6)
 * Description: Demonstrates a comprehensive comparison and decision framework for Java loops:
 *              'for' (definite counting), 'while' (indefinite state polling), and 'do-while' (post-test menu/retry),
 *              side-by-side implementation of equivalent algorithms, trade-offs, and selection criteria
 *              for student tuition and scholarship audits in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class LoopComparisonDecisionMatrixDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 6 LOOP COMPARISON & DECISION MATRIX");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int installmentCount = 3;
        double installmentAmount = 5000.0;

        // 1. Definite Iteration: 'for' Loop (Known bounds: 1 to 3)
        System.out.println("--- 1. SCENARIO A: 'FOR' LOOP (DEFINITE COUNTING) ---");
        double forTotal = 0.0;
        for (int i = 1; i <= installmentCount; i++) {
            forTotal += installmentAmount;
            System.out.printf("  ['for' Loop]: Processed Installment #%d (₹%,.2f)%n", i, installmentAmount);
        }
        System.out.printf("-> 'for' Total: ₹%,.2f | Choice Reason: Known count (3 installments)%n%n", forTotal);

        // 2. Indefinite / State-Driven Iteration: 'while' Loop (0+ executions)
        System.out.println("--- 2. SCENARIO B: 'WHILE' LOOP (STATE-DRIVEN / PRE-TEST) ---");
        double remainingScholarshipFund = 15000.0;
        double grantPerStudent = 5000.0;
        int studentsFunded = 0;

        while (remainingScholarshipFund >= grantPerStudent) {
            studentsFunded++;
            remainingScholarshipFund -= grantPerStudent;
            System.out.printf("  ['while' Loop]: Student #%d Awarded ₹%,.2f | Fund Left: ₹%,.2f%n",
                    studentsFunded, grantPerStudent, remainingScholarshipFund);
        }
        System.out.printf("-> 'while' Result: %d students funded | Choice Reason: Fund depletion condition%n%n",
                studentsFunded);

        // 3. Guaranteed Single Execution: 'do-while' Loop (1+ executions)
        System.out.println("--- 3. SCENARIO C: 'DO-WHILE' LOOP (INTERACTIVE / POST-TEST) ---");
        int menuStep = 0;
        do {
            menuStep++;
            System.out.printf("  ['do-while' Loop]: Menu Prompt Displayed (Step %d) -> Action Completed.%n", menuStep);
        } while (menuStep < 1); // Executes exactly once!
        System.out.println("-> 'do-while' Choice Reason: Menu prompt must display at least once before testing condition.\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Use 'for' when iteration count/bounds are known in advance.");
        System.out.println("2. Use 'while' when iteration is event/state-driven (0 or more executions).");
        System.out.println("3. Use 'do-while' when the body must run at least once (1 or more executions).");
        System.out.println("4. All three are computationally Turing-equivalent; choose based on CODE CLARITY!");
        System.out.println("================================================================================");
    }
}
