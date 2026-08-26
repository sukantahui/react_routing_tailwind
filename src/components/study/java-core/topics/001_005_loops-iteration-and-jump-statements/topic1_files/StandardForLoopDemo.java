/**
 * File: StandardForLoopDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 1)
 * Description: Demonstrates the exact execution lifecycle of the Standard 'for' loop in Java (JLS §14.14.1),
 *              ascending increments, descending countdowns, step multiples, accumulator sums,
 *              and quarterly course installment milestone tracking in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class StandardForLoopDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 1 STANDARD 'FOR' LOOP EXECUTION LIFECYCLE");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Standard Ascending 'for' Loop (Counting Up 1 to 5)
        System.out.println("--- 1. ASCENDING 'FOR' LOOP (1 TO 5) ---");
        for (int month = 1; month <= 5; month++) {
            System.out.printf("  Month %d: Monthly Lab Maintenance Fee Dispatched (₹500)%n", month);
        }

        // 2. Descending 'for' Loop (Countdown 5 to 1)
        System.out.println("\n--- 2. DESCENDING 'FOR' LOOP (COUNTDOWN) ---");
        for (int timer = 5; timer >= 1; timer--) {
            System.out.printf("  T-minus %d: Barrackpore Mock Coding Assessment Launch Sequence...%n", timer);
        }
        System.out.println("  -> ASSESSMENT SESSION ACTIVE!");

        // 3. Custom Step Increments (Multiples of 2 and 5)
        System.out.println("\n--- 3. CUSTOM STEP INCREMENTS (STEPS OF 5) ---");
        for (int mark = 50; mark <= 75; mark += 5) {
            System.out.printf("  Benchmark Score: %d%% -> Eligible for Tier-%d Discount%n", mark, (mark / 10));
        }

        // 4. Accumulator Pattern: Running Sum of Course Fees
        System.out.println("\n--- 4. ACCUMULATOR PATTERN: QUARTERLY TUITION AUDIT ---");
        double monthlyBase = 4500.0;
        double runningTotal = 0.0;

        for (int installment = 1; installment <= 4; installment++) {
            runningTotal += monthlyBase;
            System.out.printf("  Installment #%d: Paid ₹%,.2f | Cumulative Total Paid: ₹%,.2f%n",
                    installment, monthlyBase, runningTotal);
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Lifecycle order: (1) Init -> (2) Condition -> (3) Body -> (4) Update -> repeat (2).");
        System.out.println("2. Initialization executes EXACTLY ONCE upon loop entry.");
        System.out.println("3. The update expression executes at the END of each body iteration.");
        System.out.println("4. The loop exits immediately when the condition evaluates to false.");
        System.out.println("================================================================================");
    }
}
