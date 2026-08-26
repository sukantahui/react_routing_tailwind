/**
 * File: RelationalOperatorsDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 7)
 * Description: Demonstrates Java relational comparison operators (==, !=, >, <, >=, <=),
 *              floating-point epsilon comparisons, IEEE 754 NaN comparison invariants,
 *              mixed-type comparisons, character ordering, and student scholarship filtering in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class RelationalOperatorsDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 RELATIONAL / COMPARISON OPERATORS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Fundamental Relational Comparisons (Integers & Chars)
        System.out.println("--- 1. BASIC RELATIONAL OPERATORS (==, !=, >, <, >=, <=) ---");
        int theoryMarks = 85;
        int passThreshold = 40;
        int distinctionThreshold = 85;

        System.out.printf("Marks: %d | Pass: %d | Distinction: %d%n", theoryMarks, passThreshold, distinctionThreshold);
        System.out.printf("theoryMarks == distinctionThreshold : %b%n", (theoryMarks == distinctionThreshold));
        System.out.printf("theoryMarks != passThreshold        : %b%n", (theoryMarks != passThreshold));
        System.out.printf("theoryMarks > distinctionThreshold  : %b%n", (theoryMarks > distinctionThreshold));
        System.out.printf("theoryMarks >= distinctionThreshold : %b%n", (theoryMarks >= distinctionThreshold));
        System.out.printf("theoryMarks < passThreshold         : %b%n", (theoryMarks < passThreshold));
        System.out.printf("theoryMarks <= 100                  : %b%n%n", (theoryMarks <= 100));

        // 2. Character Ordering Comparisons
        System.out.println("--- 2. CHARACTER UNICODE COMPARISONS ---");
        char chA = 'A'; // Unicode 65
        char chB = 'B'; // Unicode 66
        char chBengali = '\u0985'; // Bengali Letter A (অ - 2437)

        System.out.printf("'A' < 'B'      : %b (%d < %d)%n", (chA < chB), (int) chA, (int) chB);
        System.out.printf("'A' < 'অ' (A)  : %b (%d < %d)%n%n", (chA < chBengali), (int) chA, (int) chBengali);

        // 3. Floating-Point Comparison Nuances & Epsilon Tolerance
        System.out.println("--- 3. FLOATING-POINT COMPARISONS & EPSILON TOLERANCE ---");
        double a = 0.1 + 0.2; // Evaluates to 0.30000000000000004 due to IEEE 754 binary fraction representation
        double b = 0.3;

        boolean naiveCheck = (a == b); // false!
        double epsilon = 1e-9;
        boolean safeCheck = Math.abs(a - b) < epsilon; // true!

        System.out.printf("0.1 + 0.2 == 0.3 (Naive '==') : %b (0.1+0.2 is actually %.17f)%n", naiveCheck, a);
        System.out.printf("Math.abs(a - b) < 1e-9 (Safe) : %b%n", safeCheck);
        System.out.printf("Double.compare(a, b) == 0     : %b%n%n", (Double.compare(a, b) == 0));

        // 4. IEEE 754 NaN Invariant (NaN is Never Equal to Anything, Even Itself!)
        System.out.println("--- 4. IEEE 754 NaN COMPARISON INVARIANT ---");
        double nanVal = 0.0 / 0.0;

        System.out.printf("nanVal == nanVal (NaN == NaN) : %b (NaN is NEVER equal to anything!)%n", (nanVal == nanVal));
        System.out.printf("nanVal != nanVal (NaN != NaN) : %b%n", (nanVal != nanVal));
        System.out.printf("Double.isNaN(nanVal)          : %b (Standard verification method)%n%n", Double.isNaN(nanVal));

        // 5. Mixed-Type Numeric Equality
        System.out.println("--- 5. MIXED-TYPE NUMERIC EQUALITY ---");
        int intTen = 10;
        double doubleTen = 10.0;
        long longTen = 10L;

        // Binary numeric promotion widens intTen to double 10.0 before comparison:
        System.out.printf("int 10 == double 10.0 : %b%n", (intTen == doubleTen));
        System.out.printf("int 10 == long 10L    : %b%n%n", (intTen == longTen));

        // 6. Real-World Student Merit & Scholarship Auditor (Barrackpore Center)
        System.out.println("--- 6. BARRACKPORE SCHOLARSHIP AUDITOR ---");
        evaluateStudentEligibility("Swadeep", 92, 15000.0);
        evaluateStudentEligibility("Tuhina", 96, 22000.0);
        evaluateStudentEligibility("Abhronila", 78, 18000.0);
        evaluateStudentEligibility("Debangshu", 85, 25000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. All relational operators (==, !=, >, <, >=, <=) return boolean (true/false).");
        System.out.println("2. Never compare floating-point sums directly with '=='—use epsilon tolerance!");
        System.out.println("3. 'Double.NaN == Double.NaN' is ALWAYS false; use Double.isNaN().");
        System.out.println("4. Relational ordering (>, <, >=, <=) cannot be applied to booleans.");
        System.out.println("================================================================================");
    }

    private static void evaluateStudentEligibility(String name, int score, double fee) {
        boolean isPass = score >= 40;
        boolean isFirstDivision = score >= 60;
        boolean isStarMerit = score >= 75;
        boolean isScholarshipEligible = score >= 90;

        double scholarshipDiscount = isScholarshipEligible ? (fee * 0.15) : 0.0;
        double netPayableFee = fee - scholarshipDiscount;

        System.out.printf("Student: %-10s | Score: %2d%% | Pass: %-5b | Distinction: %-5b | Net Fee: ₹%,.2f %s%n",
                name, score, isPass, isStarMerit, netPayableFee,
                (isScholarshipEligible ? "(★ ₹" + String.format("%,.2f", scholarshipDiscount) + " Scholarship!)" : ""));
    }
}
