/**
 * File: TernaryOperatorDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 15)
 * Description: Demonstrates Java ternary conditional operator (? :), short-circuit branch evaluation,
 *              numeric type promotion in ternary branches (int vs double -> double),
 *              nested ternary grading trees, autoboxing traps, and student fee discounts in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class TernaryOperatorDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 15 TERNARY CONDITIONAL OPERATOR (? :)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Basic Ternary Expression Syntax & Evaluation
        System.out.println("--- 1. BASIC TERNARY CONDITIONAL SYNTAX ---");
        int marks = 85;
        String status = (marks >= 40) ? "PASSED" : "FAILED";
        System.out.printf("Marks: %d -> Status: %s%n%n", marks, status);

        // 2. Short-Circuit Branch Evaluation Guarantee
        System.out.println("--- 2. SHORT-CIRCUIT BRANCH EVALUATION ---");
        int divisor = 0;
        int totalSum = 500;

        // SAFE: Since (divisor != 0) is false, the true branch (totalSum / divisor) is NEVER executed!
        int average = (divisor != 0) ? (totalSum / divisor) : 0;
        System.out.printf("Divisor is 0 -> Average computed safely without ArithmeticException: %d%n%n", average);

        // 3. Numeric Type Promotion in Ternary Branches (JLS §15.25)
        System.out.println("--- 3. NUMERIC TYPE PROMOTION IN TERNARY BRANCHES (JLS §15.25) ---");
        boolean isDiscountApplied = true;

        // One branch is int (10), other is double (20.5) -> Whole expression promoted to double!
        Number result = isDiscountApplied ? 10 : 20.5;
        System.out.printf("Expression 'true ? 10 : 20.5' -> Value: %s (Type: %s)%n",
                result, result.getClass().getSimpleName());

        Object charOrInt = true ? 'A' : 100000; // 'A' promoted to int 65 because 100000 doesn't fit in char!
        System.out.printf("Expression 'true ? 'A' : 100000' -> Value: %s (Promoted to Integer: %d)%n%n",
                charOrInt, (int)(Integer)charOrInt);

        // 4. Nested Ternary Expression (Multi-Tier Grading & Fee Rebate)
        System.out.println("--- 4. NESTED TERNARY EXPRESSIONS (STUDENT GRADING TREE) ---");
        evaluateStudentGrade("Swadeep", 92);
        evaluateStudentGrade("Tuhina", 78);
        evaluateStudentGrade("Abhronila", 58);
        evaluateStudentGrade("Debangshu", 35);
        System.out.println();

        // 5. Autoboxing & NullPointerException Trap in Ternary
        System.out.println("--- 5. AUTOBOXING & NULLPOINTEREXCEPTION TRAP ---");
        boolean flag = true;
        Integer boxedInt = 100;
        Double boxedDouble = null;

        try {
            // DANGER: Mixing boxed Integer with boxed Double forces unboxing to double!
            // When unboxing occurs on null boxedDouble during type resolution, NPE is thrown!
            double mixed = flag ? boxedInt : boxedDouble; // Safe here since flag is true
            System.out.printf("Mixed boxed ternary (flag=true) -> %f%n", mixed);

            boolean falseFlag = false;
            // Unboxing null boxedDouble to primitive double:
            double dangerous = falseFlag ? boxedInt : boxedDouble; // THROWS NPE!
        } catch (NullPointerException e) {
            System.out.println("✓ Caught NPE: Mixing wrapper types in ternary forced unboxing on null wrapper!");
        }

        // 6. Real-World Student Fee & Merit Discount Pipeline (Barrackpore Center)
        System.out.println("\n--- 6. BARRACKPORE STUDENT TUITION DISCOUNT PIPELINE ---");
        calculateStudentTuition("Swadeep", 15000.0, true, 92);
        calculateStudentTuition("Tuhina", 22000.0, false, 84);
        calculateStudentTuition("Abhronila", 18000.0, false, 65);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Ternary operator syntax: (condition) ? exprIfTrue : exprIfFalse.");
        System.out.println("2. Short-circuiting guarantees that unselected branches are never evaluated.");
        System.out.println("3. Mixed numeric branches undergo Binary Numeric Promotion (int + double -> double).");
        System.out.println("4. Limit nested ternaries to max 2 levels with clean multi-line formatting.");
        System.out.println("================================================================================");
    }

    private static void evaluateStudentGrade(String name, int marks) {
        // Clean multi-line formatted nested ternary:
        String grade = (marks >= 90) ? "GRADE A+ (Honors)"
                     : (marks >= 75) ? "GRADE A (Distinction)"
                     : (marks >= 50) ? "GRADE B (Pass)"
                     : "GRADE F (Needs Remedial)";

        System.out.printf("Student: %-10s | Marks: %2d%% | %s%n", name, marks, grade);
    }

    private static void calculateStudentTuition(String name, double baseFee, boolean isScholarship, int marks) {
        // Multi-level discount calculation via ternary:
        double discountPercent = isScholarship ? 0.25
                               : (marks >= 80) ? 0.15
                               : 0.0;

        double netFee = baseFee - (baseFee * discountPercent);
        System.out.printf("Student: %-10s | Base Fee: ₹%,.2f | Discount: %2.0f%% | Net Payable: ₹%,.2f%n",
                name, baseFee, (discountPercent * 100), netFee);
    }
}
