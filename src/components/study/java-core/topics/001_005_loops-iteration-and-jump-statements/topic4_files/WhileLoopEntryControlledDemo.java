/**
 * File: WhileLoopEntryControlledDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 4)
 * Description: Demonstrates Entry-Controlled 'while' loop mechanics in Java (JLS §14.12),
 *              pre-test condition evaluation, 0-iteration initial false behavior,
 *              state-driven flag polling, number digit extraction algorithms,
 *              and student prepaid lab wallet balance deductions in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class WhileLoopEntryControlledDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 ENTRY-CONTROLLED 'WHILE' LOOPS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. State-Driven Prepaid Lab Wallet Balance Deduction (₹)
        System.out.println("--- 1. PREPAID WALLET BALANCE DEDUCTION (₹) ---");
        double studentWalletBalance = 1500.0;
        double hourlyLabCharge = 400.0;
        int hoursConsumed = 0;

        System.out.printf("Initial Lab Wallet Balance: ₹%,.2f | Hourly Charge: ₹%,.2f%n",
                studentWalletBalance, hourlyLabCharge);

        // Pre-test entry-controlled condition:
        while (studentWalletBalance >= hourlyLabCharge) {
            hoursConsumed++;
            studentWalletBalance -= hourlyLabCharge;
            System.out.printf("  [Hour %d]: ₹%,.2f deducted | Remaining Balance: ₹%,.2f%n",
                    hoursConsumed, hourlyLabCharge, studentWalletBalance);
        }

        System.out.printf("-> Lab Session Ended: Consumed %d hrs | Remaining Balance: ₹%,.2f%n%n",
                hoursConsumed, studentWalletBalance);

        // 2. Pre-Test 0-Execution Behavior (Initial Condition False)
        System.out.println("--- 2. PRE-TEST 0-EXECUTION PROOF ---");
        int zeroTestBalance = 200;
        int minimumRequirement = 500;

        // Condition (200 >= 500) is FALSE immediately:
        while (zeroTestBalance >= minimumRequirement) {
            System.out.println("  [ERROR]: This line should NEVER print!");
            zeroTestBalance -= 100;
        }
        System.out.println("  ✓ Verified: 'while' loop executed 0 times because initial condition was false.\n");

        // 3. Classical Algorithmic Pattern: Number Digit Extraction & Sum
        System.out.println("--- 3. ALGORITHMIC DIGIT EXTRACTION ---");
        int rollRegistrationNumber = 9842; // Student registration code
        int tempNumber = rollRegistrationNumber;
        int sumOfDigits = 0;

        System.out.print("  Extracting digits from " + rollRegistrationNumber + ": ");
        while (tempNumber > 0) {
            int digit = tempNumber % 10;   // Extract last digit
            sumOfDigits += digit;          // Accumulate
            System.out.print(digit + " ");
            tempNumber /= 10;              // Eliminate last digit
        }
        System.out.printf("%n  -> Sum of Digits of %d = %d%n", rollRegistrationNumber, sumOfDigits);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'while' is an ENTRY-CONTROLLED loop (tests condition BEFORE body executes).");
        System.out.println("2. If the condition is false initially, the body executes ZERO times.");
        System.out.println("3. Ideal for indefinite, event-driven, and state-monitoring iterations.");
        System.out.println("4. Always ensure the loop body mutates the state tested by the condition!");
        System.out.println("================================================================================");
    }
}
