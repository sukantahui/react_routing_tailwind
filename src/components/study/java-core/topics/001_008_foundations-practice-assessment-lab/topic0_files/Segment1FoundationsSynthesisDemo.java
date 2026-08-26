/**
 * File: Segment1FoundationsSynthesisDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 0)
 * Description: Comprehensive architectural synthesis of Segment 1 Java Core Foundations:
 *              1. JVM Architecture & Memory Model (Stack vs Heap, Metaspace, JIT compiler)
 *              2. Primitive Datatypes & Type Promotion mechanics
 *              3. Operators, Expressions, and Bitwise calculations
 *              4. Decision Making (if-else, Enhanced Switch Expressions)
 *              5. Iteration & Loops (for, while, enhanced for-each)
 *              6. Single & Multidimensional Arrays
 *              7. Modular Methods, Pass-by-Value, Varargs, and Recursion
 *              for an integrated campus academic billing & student grading system in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Arrays;

public class Segment1FoundationsSynthesisDemo {

    // Global constants
    public static final String INSTITUTE_NAME = "Coder & AccoTax";
    public static final String MAIN_CAMPUS = "Barrackpore, West Bengal";

    /**
     * Data Model: Student Academic & Fee Profile
     */
    public static class StudentRecord {
        String name;
        String campus;
        int[] testScores;
        double baseTuition;
        double scholarshipPercent;

        public StudentRecord(String name, String campus, int[] testScores, double baseTuition, double scholarshipPercent) {
            this.name = name;
            this.campus = campus;
            this.testScores = testScores;
            this.baseTuition = baseTuition;
            this.scholarshipPercent = scholarshipPercent;
        }
    }

    // =========================================================================
    // 1. METHODS & OPERATORS: Compute Average Score & Grade (Switch Expression)
    // =========================================================================
    public static double computeAverageScore(int[] scores) {
        if (scores == null || scores.length == 0) return 0.0;
        int total = 0;
        for (int s : scores) {
            total += s;
        }
        return (double) total / scores.length;
    }

    public static String determinePerformanceGrade(double average) {
        // Modern Switch Expression (Java 14+) with pattern yields
        int band = (int) (average / 10.0);
        return switch (band) {
            case 10, 9 -> "A+ (Outstanding)";
            case 8     -> "A  (Excellent)";
            case 7     -> "B+ (Very Good)";
            case 6     -> "B  (Good)";
            default    -> "C  (Needs Improvement)";
        };
    }

    // =========================================================================
    // 2. PASS-BY-VALUE & CONTROL FLOW: Calculate Final Fee after Tax & Discount
    // =========================================================================
    public static double computeFinalPayable(double baseFee, double scholarshipPercent) {
        double discountAmount = baseFee * (scholarshipPercent / 100.0);
        double taxableAmount = baseFee - discountAmount;
        double gstAmount = taxableAmount * 0.18; // 18% GST in West Bengal
        return taxableAmount + gstAmount;
    }

    // =========================================================================
    // 3. RECURSION: Recursive Loyalty Point Bonus Calculator
    // =========================================================================
    public static int calculateLoyaltyRewardPoints(int completedMilestones) {
        // Base Case
        if (completedMilestones <= 0) return 0;
        // Recursive Step: 50 points per milestone + reward from previous
        return 50 + calculateLoyaltyRewardPoints(completedMilestones - 1);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: SEGMENT 1 FOUNDATIONS COMPLETE SYNTHESIS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.printf("INSTITUTE : %s | HEADQUARTERS: %s%n%n", INSTITUTE_NAME, MAIN_CAMPUS);

        // Instantiating Student Records across Barrackpore, Naihati, Shyamnagar, Ichapur
        StudentRecord[] batch = {
            new StudentRecord("Swadeep", "Barrackpore", new int[]{88, 92, 95, 90}, 20000.0, 15.0),
            new StudentRecord("Tuhina", "Naihati", new int[]{94, 96, 98, 92}, 25000.0, 20.0),
            new StudentRecord("Abhronila", "Shyamnagar", new int[]{82, 85, 88, 84}, 18000.0, 10.0),
            new StudentRecord("Debangshu", "Ichapur", new int[]{78, 80, 82, 79}, 15000.0, 5.0)
        };

        System.out.println("--- STUDENT ACADEMIC & FINANCIAL EVALUATION LEDGER ---\n");
        System.out.printf("%-12s | %-12s | %-7s | %-20s | %-12s | %-12s | %-8s%n",
                "Student", "Campus", "Average", "Performance Grade", "Base Fee", "Net Payable", "Points");
        System.out.println("--------------------------------------------------------------------------------------------------");

        double aggregateCampusFees = 0.0;

        for (StudentRecord student : batch) {
            double avgScore = computeAverageScore(student.testScores);
            String grade = determinePerformanceGrade(avgScore);
            double netPayable = computeFinalPayable(student.baseTuition, student.scholarshipPercent);
            int rewardPoints = calculateLoyaltyRewardPoints(student.testScores.length);

            aggregateCampusFees += netPayable;

            System.out.printf("%-12s | %-12s | %6.2f%% | %-20s | ₹%,10.2f | ₹%,10.2f | %4d pts%n",
                    student.name, student.campus, avgScore, grade, student.baseTuition, netPayable, rewardPoints);
        }

        System.out.println("--------------------------------------------------------------------------------------------------");
        System.out.printf("TOTAL AGGREGATE REVENUE COLLECTED: ₹%,.2f%n%n", aggregateCampusFees);

        System.out.println("================================================================================");
        System.out.println("SEGMENT 1 COMPLETE MASTERY CHECKLIST FOR STUDENTS:");
        System.out.println("✓ Module 001_001: JVM Architecture, Bytecode, ClassLoaders & JIT Compilers");
        System.out.println("✓ Module 001_002: Syntax, Primitive Types, Wrapper Classes, Literals & Variables");
        System.out.println("✓ Module 001_003: Operators, Type Promotions, Expressions & Explicit Casting");
        System.out.println("✓ Module 001_004: Decision Making, if-else-if Ladders & Modern Switch Expressions");
        System.out.println("✓ Module 001_005: Loops (for, while, do-while, enhanced for) & Jump Statements");
        System.out.println("✓ Module 001_006: 1D & 2D Arrays, Ragged Matrices & In-Memory Operations");
        System.out.println("✓ Module 001_007: Methods, Signatures, Pass-by-Value, Varargs & Call Stack Recursion");
        System.out.println("================================================================================");
    }
}
