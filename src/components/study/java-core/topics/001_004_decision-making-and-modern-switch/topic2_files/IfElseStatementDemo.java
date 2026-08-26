/**
 * File: IfElseStatementDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 2)
 * Description: Demonstrates Java 'if-else' statements for binary decision paths (JLS §14.9.2),
 *              mutually exclusive branch execution, comparison with ternary operators (? :),
 *              ATM cash withdrawal authorization, and student pass/fail grading in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class IfElseStatementDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 'IF-ELSE' BINARY DECISION PATHS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Basic Binary Selection: Pass / Fail Determination
        System.out.println("--- 1. BASIC MUTUALLY EXCLUSIVE 'IF-ELSE' BRANCH ---");
        int studentScore = 75;
        int passThreshold = 40;

        if (studentScore >= passThreshold) {
            System.out.printf("Score %d >= %d: Result = PASSED! Congratulations.%n", studentScore, passThreshold);
        } else {
            System.out.printf("Score %d < %d: Result = FAILED. Re-take examination scheduled.%n", studentScore, passThreshold);
        }
        System.out.println();

        // 2. Financial Decision: ATM Cash Withdrawal Authorization (Barrackpore Center)
        System.out.println("--- 2. ATM CASH WITHDRAWAL AUTHORIZATION ---");
        authorizeWithdrawal("Swadeep", 5000.0, 12000.0);
        authorizeWithdrawal("Tuhina", 18000.0, 15000.0);

        // 3. 'if-else' Statement vs Ternary Expression Comparison
        System.out.println("--- 3. 'IF-ELSE' STATEMENT VS TERNARY EXPRESSION ---");
        int age = 19;

        // Statement approach (Imperative):
        String statusStatement;
        if (age >= 18) {
            statusStatement = "Eligible to Vote in Barrackpore";
        } else {
            statusStatement = "Minor (Ineligible)";
        }

        // Expression approach (Functional Ternary):
        String statusExpression = (age >= 18) ? "Eligible to Vote in Barrackpore" : "Minor (Ineligible)";

        System.out.printf("Age: %d -> if-else Statement: %s%n", age, statusStatement);
        System.out.printf("Age: %d -> Ternary Expression: %s%n%n", age, statusExpression);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'if-else' provides binary mutually exclusive execution (exactly ONE branch executes).");
        System.out.println("2. If the condition is true, the 'then' block runs; otherwise, the 'else' block runs.");
        System.out.println("3. Use 'if-else' for multi-statement execution, side effects, and complex actions.");
        System.out.println("4. Use the ternary operator (? :) when assigning a single value based on a condition.");
        System.out.println("================================================================================");
    }

    private static void authorizeWithdrawal(String studentName, double requestAmount, double currentBalance) {
        System.out.printf("Processing Withdrawal for %-10s | Requested: ₹%,.2f | Balance: ₹%,.2f%n",
                studentName, requestAmount, currentBalance);

        if (currentBalance >= requestAmount) {
            double remaining = currentBalance - requestAmount;
            System.out.printf("-> [APPROVED]: Dispensing ₹%,.2f. Remaining Balance: ₹%,.2f%n%n",
                    requestAmount, remaining);
        } else {
            double shortage = requestAmount - currentBalance;
            System.out.printf("-> [DECLINED]: Insufficient balance! Shortage: ₹%,.2f%n%n", shortage);
        }
    }
}
