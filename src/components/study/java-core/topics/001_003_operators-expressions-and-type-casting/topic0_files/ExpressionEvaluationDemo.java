/**
 * File: ExpressionEvaluationDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 0)
 * Description: Demonstrates operands, operators (unary, binary, ternary), expression evaluation,
 *              Java's strict left-to-right operand evaluation guarantee (JLS §15.7),
 *              and compound student fee calculations in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ExpressionEvaluationDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 0 OPERANDS, OPERATORS & EXPRESSION EVALUATION");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Classification of Operators by Arity
        System.out.println("--- 1. OPERATOR CLASSIFICATION BY ARITY (UNARY, BINARY, TERNARY) ---");
        int baseMarks = 75;

        // Unary operator (1 operand):
        int incrementedMarks = ++baseMarks; // '++' operates solely on baseMarks
        boolean isTopPerformer = !(baseMarks < 80); // '!' operates on the boolean condition

        // Binary operator (2 operands):
        int totalSum = incrementedMarks + 20; // '+' operates on incrementedMarks and 20

        // Ternary operator (3 operands):
        String gradeStatus = (totalSum >= 90) ? "Grade O (Outstanding)" : "Grade A (Excellent)";

        System.out.printf("Unary Increment (++baseMarks) : %d%n", incrementedMarks);
        System.out.printf("Unary Inversion (!(marks < 80)): %b%n", isTopPerformer);
        System.out.printf("Binary Addition (+ 20)        : %d%n", totalSum);
        System.out.printf("Ternary Evaluation (? :)      : %s%n%n", gradeStatus);

        // 2. Expressions vs Statements in Java
        System.out.println("--- 2. EXPRESSIONS VS STATEMENTS ---");
        // Expression: Evaluates to a value
        double baseFee = 15000.0; // ₹15,000 Base Fee
        double gstRate = 0.18;    // 18% GST

        // Compound expression with multiple operators:
        double totalInvoice = baseFee + (baseFee * gstRate); // Evaluates to 17700.0

        System.out.printf("Base Course Fee   : ₹%,.2f%n", baseFee);
        System.out.printf("GST Component     : ₹%,.2f (via baseFee * 0.18)%n", (baseFee * gstRate));
        System.out.printf("Calculated Invoice: ₹%,.2f%n%n", totalInvoice);

        // 3. JLS §15.7 Strict Left-to-Right Operand Evaluation Rule
        System.out.println("--- 3. STRICT LEFT-TO-RIGHT OPERAND EVALUATION (JLS §15.7) ---");
        // In C/C++, operand evaluation order is undefined.
        // In Java, left operands are GUARANTEED to be evaluated before right operands!
        int x = 5;
        int result = (x = 10) + (x * 2); // (x = 10) evaluated FIRST -> x becomes 10 -> 10 + (10 * 2) = 30

        System.out.printf("Expression (x = 10) + (x * 2) = %d (x is 10)%n", result);

        int a = 1;
        int complexStep = firstOperand(a) + secondOperand(a);
        System.out.printf("Left-to-Right method invocation total: %d%n%n", complexStep);

        // 4. Real-World Student Assessment Calculator (Barrackpore Center)
        System.out.println("--- 4. BARRACKPORE STUDENT PERFORMANCE CALCULATOR ---");
        computeStudentReport("Swadeep", 88, 92, 15000.0);
        computeStudentReport("Tuhina", 94, 96, 22000.0);
        computeStudentReport("Abhronila", 78, 82, 18000.0);
        computeStudentReport("Debangshu", 91, 89, 25000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Operators are classified by arity: Unary (1), Binary (2), and Ternary (3).");
        System.out.println("2. Expressions evaluate to values; statements execute actions.");
        System.out.println("3. Java guarantees strict Left-to-Right evaluation of operands (JLS §15.7).");
        System.out.println("4. Precedence determines grouping, but associativity breaks ties among equal operators.");
        System.out.println("================================================================================");
    }

    private static int firstOperand(int val) {
        System.out.println(" -> Step 1: Evaluating Left Operand (firstOperand)");
        return val * 10;
    }

    private static int secondOperand(int val) {
        System.out.println(" -> Step 2: Evaluating Right Operand (secondOperand)");
        return val * 20;
    }

    private static void computeStudentReport(String name, int theoryMarks, int practicalMarks, double fee) {
        // Compound expression with precedence:
        double weightedScore = (theoryMarks * 0.6) + (practicalMarks * 0.4);
        boolean isEligibleForCashback = weightedScore >= 90.0;
        double scholarshipReward = isEligibleForCashback ? (fee * 0.10) : 0.0;
        double netFee = fee - scholarshipReward;

        System.out.printf("Student: %-10s | Theory: %2d | Practical: %2d | Final: %5.1f%% | Net Fee: ₹%,.2f %s%n",
                name, theoryMarks, practicalMarks, weightedScore, netFee,
                (isEligibleForCashback ? "(★ 10% Scholarship Awarded!)" : ""));
    }
}
