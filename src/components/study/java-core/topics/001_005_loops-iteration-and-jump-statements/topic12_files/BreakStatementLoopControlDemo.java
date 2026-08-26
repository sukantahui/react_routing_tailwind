/**
 * File: BreakStatementLoopControlDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 12)
 * Description: Demonstrates the 'break' jump statement in Java (JLS §14.15),
 *              abrupt termination of innermost enclosing loops, early exit from linear search,
 *              budget exhaustion cutoff, and scholarship candidate lookup in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class BreakStatementLoopControlDemo {

    public record StudentRecord(int rollNo, String name, double balanceDue) {}

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 THE 'BREAK' STATEMENT");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        StudentRecord[] roster = {
                new StudentRecord(101, "Swadeep", 0.0),
                new StudentRecord(102, "Tuhina", 2500.0),
                new StudentRecord(103, "Abhronila", 0.0),
                new StudentRecord(104, "Debangshu", 5000.0),
                new StudentRecord(105, "Pritam", 1500.0)
        };

        // 1. Linear Search with Early Exit via 'break'
        System.out.println("--- 1. LINEAR SEARCH WITH EARLY EXIT ---");
        int targetRoll = 103;
        StudentRecord foundStudent = null;
        int inspections = 0;

        for (StudentRecord s : roster) {
            inspections++;
            System.out.printf("  Inspecting Roll #%d (%s)...%n", s.rollNo(), s.name());
            if (s.rollNo() == targetRoll) {
                foundStudent = s;
                System.out.println("  ✓ MATCH FOUND! Terminating search immediately via 'break'.");
                break; // Stop inspecting remaining elements!
            }
        }
        System.out.printf("-> Target located in %d inspections (Saved %d unnecessary checks!)%n%n",
                inspections, (roster.length - inspections));

        // 2. Budget Ceiling Cutoff via 'break'
        System.out.println("--- 2. BUDGET THRESHOLD CUTOFF (₹) ---");
        double scholarshipBudget = 6000.0;
        double totalDisbursed = 0.0;
        int studentsFunded = 0;

        for (StudentRecord s : roster) {
            if (s.balanceDue() > 0.0) {
                if (totalDisbursed + s.balanceDue() > scholarshipBudget) {
                    System.out.printf("  [ALERT]: Next claim of ₹%,.2f exceeds remaining budget! Halting via 'break'.%n",
                            s.balanceDue());
                    break; // Budget limit reached
                }
                totalDisbursed += s.balanceDue();
                studentsFunded++;
                System.out.printf("  Disbursed ₹%,.2f to %s (Cumulative: ₹%,.2f)%n",
                        s.balanceDue(), s.name(), totalDisbursed);
            }
        }
        System.out.printf("-> Disbursed ₹%,.2f across %d students | Unused Fund: ₹%,.2f%n%n",
                totalDisbursed, studentsFunded, (scholarshipBudget - totalDisbursed));

        // 3. Innermost Scope Rule in Nested Loops
        System.out.println("--- 3. INNERMOST SCOPE RULE (UNLABELED BREAK) ---");
        for (int outer = 1; outer <= 2; outer++) {
            System.out.printf("  Outer Row %d started:%n", outer);
            for (int inner = 1; inner <= 5; inner++) {
                if (inner == 3) {
                    System.out.println("    -> Inner break triggered at inner=3 (Outer continues!)");
                    break; // Exits ONLY the inner loop!
                }
                System.out.printf("    Inner Col %d%n", inner);
            }
            System.out.printf("  Outer Row %d finished successfully.%n%n", outer);
        }

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'break' immediately terminates the innermost enclosing loop or switch.");
        System.out.println("2. Perfect for early exit in searches, saving unnecessary CPU cycles.");
        System.out.println("3. In nested loops, unlabeled 'break' exits ONLY the innermost loop.");
        System.out.println("4. Code placed immediately after an unbroken loop or break inside the same block must be reachable.");
        System.out.println("================================================================================");
    }
}
