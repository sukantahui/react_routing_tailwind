/**
 * File: ElseIfLadderDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 4)
 * Description: Demonstrates Java 'else-if' ladders for multi-branch evaluations,
 *              sequential condition testing, condition ordering importance (highest to lowest),
 *              Indian Income Tax Slab Calculator (New Tax Regime in Indian Rupees ₹),
 *              and student academic grading in Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class ElseIfLadderDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 'ELSE-IF' LADDER MULTI-BRANCH EVALUATIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Academic Letter Grade Classifier (Order: Highest to Lowest)
        System.out.println("--- 1. ACADEMIC LETTER GRADE CLASSIFIER ---");
        evaluateStudentGrade("Swadeep", 94);
        evaluateStudentGrade("Tuhina", 82);
        evaluateStudentGrade("Abhronila", 68);
        evaluateStudentGrade("Debangshu", 35);

        // 2. The Condition Ordering Bug Demonstration
        System.out.println("\n--- 2. THE CONDITION ORDERING BUG (WRONG LADDER ORDER) ---");
        int score = 95;
        System.out.println("Testing mark of 95 with buggy ascending order 'if (score >= 40) ...':");
        if (score >= 40) {
            System.out.println("⚠️ [BUGGED GRADE]: Passed (Matched '>= 40' first, skipped '>= 90' Honors!)");
        } else if (score >= 90) {
            System.out.println("Honors (Never reached!)");
        }

        // 3. Indian Income Tax Slab Calculator (New Tax Regime in Indian Rupees ₹)
        System.out.println("\n--- 3. INDIAN INCOME TAX SLAB CALCULATOR (NEW REGIME) ---");
        calculateIncomeTax("Junior Developer", 650000.0);   // ₹6.5 Lakhs
        calculateIncomeTax("Senior Software Engineer", 1250000.0); // ₹12.5 Lakhs
        calculateIncomeTax("Enterprise Architect", 2500000.0);    // ₹25 Lakhs

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. 'else-if' ladders evaluate conditions sequentially from top to bottom.");
        System.out.println("2. The FIRST matching 'true' condition executes; all subsequent branches are skipped.");
        System.out.println("3. Always order range conditions from MOST SPECIFIC (highest threshold) to general.");
        System.out.println("4. Always provide an 'else' fallback to catch unhandled or boundary edge cases.");
        System.out.println("================================================================================");
    }

    private static void evaluateStudentGrade(String studentName, int marks) {
        String grade;
        String remarks;

        // Proper order: Highest to lowest
        if (marks >= 90) {
            grade = "A+";
            remarks = "Outstanding Excellence";
        } else if (marks >= 80) {
            grade = "A";
            remarks = "Excellent Performance";
        } else if (marks >= 65) {
            grade = "B";
            remarks = "Good Effort";
        } else if (marks >= 40) {
            grade = "C";
            remarks = "Passed Threshold";
        } else {
            grade = "F";
            remarks = "Needs Immediate Remedial Support";
        }

        System.out.printf("Student: %-10s | Marks: %2d%% -> Grade: %-2s | Remarks: %s%n",
                studentName, marks, grade, remarks);
    }

    private static void calculateIncomeTax(String role, double annualIncome) {
        double estimatedTax;

        // Progressive slab categorization:
        if (annualIncome <= 300000.0) {
            estimatedTax = 0.0; // 0%
        } else if (annualIncome <= 600000.0) {
            estimatedTax = (annualIncome - 300000.0) * 0.05;
        } else if (annualIncome <= 900000.0) {
            estimatedTax = 15000.0 + (annualIncome - 600000.0) * 0.10;
        } else if (annualIncome <= 1200000.0) {
            estimatedTax = 45000.0 + (annualIncome - 900000.0) * 0.15;
        } else if (annualIncome <= 1500000.0) {
            estimatedTax = 90000.0 + (annualIncome - 1200000.0) * 0.20;
        } else {
            estimatedTax = 150000.0 + (annualIncome - 1500000.0) * 0.30;
        }

        double netTakeHome = annualIncome - estimatedTax;

        System.out.printf("Role: %-26s | Gross: ₹%,10.2f | Tax: ₹%,9.2f | Net Take-Home: ₹%,10.2f%n",
                role, annualIncome, estimatedTax, netTakeHome);
    }
}
