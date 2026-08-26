/**
 * File: ContinueStatementLoopControlDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 13)
 * Description: Demonstrates the 'continue' jump statement in Java (JLS §14.16),
 *              skipping remaining body statements to jump directly to update/condition checks,
 *              filtering invalid/exempt student records, the critical 'while' loop counter update gotcha,
 *              and batch fee invoice generation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class ContinueStatementLoopControlDemo {

    public record StudentInvoice(int rollNo, String name, double balanceDue, boolean isScholarshipExempt) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 THE 'CONTINUE' STATEMENT");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        StudentInvoice[] invoices = {
                new StudentInvoice(201, "Swadeep", 4500.0, false),
                new StudentInvoice(202, "Tuhina", 0.0, false),          // Zero due -> skip
                new StudentInvoice(203, "Abhronila", 6000.0, true),     // Scholarship exempt -> skip
                new StudentInvoice(204, "Debangshu", 5500.0, false),
                new StudentInvoice(205, "Pritam", 3000.0, false)
        };

        // 1. Data Cleansing & Invoice Generation via 'continue'
        System.out.println("--- 1. FILTERING ZERO-BALANCE & SCHOLARSHIP EXEMPTIONS ---");
        double totalInvoicedAmount = 0.0;
        int activeInvoicesGenerated = 0;

        for (StudentInvoice inv : invoices) {
            // Guard 1: Skip students with zero balance due
            if (inv.balanceDue() <= 0.0) {
                System.out.printf("  [SKIPPED]: %s (Roll #%d) - Zero balance due.%n", inv.name(), inv.rollNo());
                continue; // Jump to next invoice
            }

            // Guard 2: Skip 100% scholarship exempt students
            if (inv.isScholarshipExempt()) {
                System.out.printf("  [SKIPPED]: %s (Roll #%d) - 100%% Scholarship Exemption applied.%n", inv.name(), inv.rollNo());
                continue; // Jump to next invoice
            }

            // Processing only billable students:
            activeInvoicesGenerated++;
            totalInvoicedAmount += inv.balanceDue();
            System.out.printf("  ✓ [INVOICE GENERATED]: %-10s | Roll #%d | Billable Due: ₹%,.2f%n",
                    inv.name(), inv.rollNo(), inv.balanceDue());
        }

        System.out.printf("-> Total Active Invoices: %d | Total Invoiced: ₹%,.2f%n%n",
                activeInvoicesGenerated, totalInvoicedAmount);

        // 2. The 'while' Loop Gotcha: Preventing Infinite Loops with 'continue'
        System.out.println("--- 2. CRITICAL 'WHILE' LOOP GOTCHA WITH 'CONTINUE' ---");
        int counter = 0;
        System.out.print("  Odd Numbers (1 to 9): ");

        while (counter < 10) {
            counter++; // SAFE: Update counter BEFORE continue check!
            if (counter % 2 == 0) {
                continue; // Skips even numbers, jumps to while condition
            }
            System.out.print(counter + " ");
        }
        System.out.println("\n  ✓ Handled counter increment safely before continue.\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'continue' skips the rest of the current body and jumps directly to the NEXT iteration.");
        System.out.println("2. In 'for' loops, continue jumps to the update clause (i++).");
        System.out.println("3. In 'while' loops, continue jumps to the condition check; update counter BEFORE continue!");
        System.out.println("4. Excellent for Guard Clauses to filter invalid or exempt records cleanly.");
        System.out.println("================================================================================");
    }
}
