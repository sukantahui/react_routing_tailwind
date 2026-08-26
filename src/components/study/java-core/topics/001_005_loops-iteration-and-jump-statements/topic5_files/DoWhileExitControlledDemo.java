/**
 * File: DoWhileExitControlledDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 5)
 * Description: Demonstrates Exit-Controlled 'do-while' loop mechanics in Java (JLS §14.13),
 *              guaranteed minimum single execution, mandatory trailing semicolon syntax,
 *              interactive menu simulation, input validation retry loops,
 *              and student fee installment billing portal simulation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class DoWhileExitControlledDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 EXIT-CONTROLLED 'DO-WHILE' LOOPS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Guaranteed Single Execution Proof (Initial Condition is FALSE)
        System.out.println("--- 1. GUARANTEED SINGLE EXECUTION PROOF ---");
        int initialBalance = 100;
        int minWithdrawal = 500;

        // Condition (100 >= 500) is FALSE, yet the body executes exactly ONCE!
        do {
            System.out.printf("  [Attempt 1]: Account Balance Checked: ₹%,d (Insufficient for ₹%,d withdrawal)%n",
                    initialBalance, minWithdrawal);
        } while (initialBalance >= minWithdrawal); // Trailing semicolon is mandatory!

        System.out.println("  ✓ Verified: 'do-while' body executed at least once despite false condition.\n");

        // 2. Interactive Menu-Driven Simulation
        System.out.println("--- 2. INTERACTIVE STUDENT PORTAL MENU SIMULATION ---");
        int simulatedMenuChoice = 1;
        int simulatedIterations = 0;

        do {
            simulatedIterations++;
            System.out.println("  [Portal Menu]: 1. View Courses | 2. Pay Installment (₹) | 3. Exit");
            System.out.printf("  Action: Student selected Option #%d -> Handled successfully.%n", simulatedMenuChoice);

            // Transitioning state to option 3 (Exit) to terminate simulation:
            if (simulatedIterations == 2) {
                simulatedMenuChoice = 3; // Exit option
            } else {
                simulatedMenuChoice = 2; // Pay installment
            }
        } while (simulatedMenuChoice != 3);

        System.out.println("  -> Student logged out from Barrackpore Campus Portal.\n");

        // 3. Validation Retry Loop Pattern
        System.out.println("--- 3. VALIDATION RETRY LOOP PATTERN ---");
        int userEnteredPin = 1234;
        int correctSecretPin = 9876;
        int attempts = 0;

        do {
            attempts++;
            System.out.printf("  Attempt #%d: Validating PIN [%d] -> %s%n",
                    attempts, userEnteredPin,
                    (userEnteredPin == correctSecretPin ? "✓ ACCESS GRANTED" : "❌ INVALID PIN"));

            if (attempts == 2) {
                userEnteredPin = 9876; // Student enters correct PIN on 3rd attempt!
            }
        } while (userEnteredPin != correctSecretPin && attempts < 3);

        System.out.printf("-> Final Auth Status: Completed in %d attempt(s).%n", attempts);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'do-while' is an EXIT-CONTROLLED loop (tests condition AFTER body executes).");
        System.out.println("2. The loop body is GUARANTEED to execute at least ONCE.");
        System.out.println("3. A trailing semicolon ';' after 'while (condition);' is syntactically MANDATORY.");
        System.out.println("4. Ideal for interactive menus, user input retry loops, and hardware handshake retries.");
        System.out.println("================================================================================");
    }
}
