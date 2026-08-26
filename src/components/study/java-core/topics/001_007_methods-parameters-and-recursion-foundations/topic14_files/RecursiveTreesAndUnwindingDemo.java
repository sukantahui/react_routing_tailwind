/**
 * File: RecursiveTreesAndUnwindingDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 14)
 * Description: Visualizes Recursive Execution Trees, Depth-First Search (DFS) Call Flow, and Stack Unwinding:
 *              1. Linear Recursion (single call chain) vs Tree Recursion (multi-branch binary tree)
 *              2. Detailed indented call/return tracing demonstrating stack winding and unwinding
 *              3. Fibonacci tree recursion and redundant sub-problem identification
 *              for student milestone computations in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class RecursiveTreesAndUnwindingDemo {

    // =========================================================================
    // 1. VISUALIZING FIBONACCI TREE RECURSION WITH DEPTH INDENTATION
    // =========================================================================
    public static int traceFibonacci(int n, int depth) {
        String indent = "  ".repeat(depth);
        System.out.printf("%s-> ENTERING fib(%d) [Stack Depth: %d]%n", indent, n, depth);

        // Base Cases
        if (n <= 0) {
            System.out.printf("%s<- BASE CASE HIT fib(0) = 0 [Unwinding Depth: %d]%n", indent, depth);
            return 0;
        }
        if (n == 1) {
            System.out.printf("%s<- BASE CASE HIT fib(1) = 1 [Unwinding Depth: %d]%n", indent, depth);
            return 1;
        }

        // Binary Tree Recursive Branching (DFS: Left branch executes first, then Right)
        int left = traceFibonacci(n - 1, depth + 1);
        int right = traceFibonacci(n - 2, depth + 1);

        int result = left + right;
        System.out.printf("%s<- UNWINDING fib(%d) = left(%d) + right(%d) = %d [Depth: %d]%n",
                indent, n, left, right, result, depth);
        return result;
    }

    // =========================================================================
    // 2. MULTI-BRANCH STUDENT SCHOLARSHIP DISCOUNT TREE (Tier Calculation)
    // =========================================================================
    public static double calculateTieredScholarship(int tier, double baseAmount, int depth) {
        String indent = "    ".repeat(depth);

        // Base Case: Tier 1
        if (tier <= 1) {
            System.out.printf("%s[TIER 1 BASE] Scholarship: ₹%,.2f%n", indent, baseAmount * 0.05);
            return baseAmount * 0.05; // 5% base discount
        }

        System.out.printf("%s[EVALUATING TIER %d] Base: ₹%,.2f%n", indent, tier, baseAmount);

        // Two sub-branches for Academic Merit and Attendance Merit:
        double academicBonus = calculateTieredScholarship(tier - 1, baseAmount * 0.60, depth + 1);
        double attendanceBonus = calculateTieredScholarship(tier - 1, baseAmount * 0.40, depth + 1);

        double totalScholarship = academicBonus + attendanceBonus;
        System.out.printf("%s[TIER %d TOTAL] Combined: ₹%,.2f%n", indent, tier, totalScholarship);
        return totalScholarship;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 RECURSIVE TREES & UNWINDING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- 1. TRACING FIBONACCI(4) EXECUTION TREE (DFS ORDER) ---\n");

        int fibResult = traceFibonacci(4, 0);
        System.out.printf("%n>>> FINAL FIBONACCI(4) RESULT: %d%n%n", fibResult);

        System.out.println("================================================================================");
        System.out.println("--- 2. TRACING MULTI-BRANCH SCHOLARSHIP TREE IN INDIAN RUPEES (₹) ---\n");

        double totalDisc = calculateTieredScholarship(3, 20000.0, 0);
        System.out.printf("%n>>> FINAL SCHOLARSHIP DISCOUNT: ₹%,.2f%n%n", totalDisc);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Tree Recursion creates exponential execution trees (e.g. 2^N calls for Fibonacci).");
        System.out.println("2. The JVM evaluates branches in Depth-First Search (DFS) order (left before right).");
        System.out.println("3. Intermediate stack frames remain suspended on the Call Stack waiting for child calls.");
        System.out.println("4. Memoization / Dynamic Programming eliminates redundant tree sub-problems.");
        System.out.println("================================================================================");
    }
}
