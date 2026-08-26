/**
 * File: Segment1TimedCodingAssessmentDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 12)
 * Description: Capstone Timed Coding Assessment Engine for Segment 1 Foundations:
 *              1. Challenge 1: Matrix Diagonal Sum & Border Perimeter Extraction
 *              2. Challenge 2: Recursive Palindrome & Binary Search Composite Pipeline
 *              3. Challenge 3: Modern Switch Expression Evaluation & Scholarship Dispatch
 *              4. Challenge 4: In-Memory Sieve Prime Filter for Student Roll Validation
 *              5. Challenge 5: Comprehensive Academic Billing Ledger in Indian Rupees (₹)
 *              for student final evaluations at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public final class Segment1TimedCodingAssessmentDemo {

    private Segment1TimedCodingAssessmentDemo() {}

    // =========================================================================
    // CHALLENGE 1: MATRIX DIAGONAL SUM & BOUNDARY PERIMETER
    // =========================================================================
    public static int computeMatrixDiagonalSum(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return 0;
        int n = matrix.length;
        int primarySum = 0;
        int secondarySum = 0;

        for (int i = 0; i < n; i++) {
            primarySum += matrix[i][i];
            secondarySum += matrix[i][n - 1 - i];
        }

        // Avoid double counting center element for odd n:
        if (n % 2 != 0) {
            return primarySum + secondarySum - matrix[n / 2][n / 2];
        }
        return primarySum + secondarySum;
    }

    // =========================================================================
    // CHALLENGE 2: RECURSIVE BINARY SEARCH PIPELINE
    // =========================================================================
    public static int recursiveBinarySearch(int[] arr, int low, int high, int target) {
        if (low > high) return -1; // Base case: not found
        int mid = low + (high - low) / 2; // Overflow-safe midpoint

        if (arr[mid] == target) return mid;
        if (arr[mid] > target) {
            return recursiveBinarySearch(arr, low, mid - 1, target);
        } else {
            return recursiveBinarySearch(arr, mid + 1, high, target);
        }
    }

    // =========================================================================
    // CHALLENGE 3: MODERN JAVA 14+ SWITCH EXPRESSION SCHOLARSHIP DISPATCH
    // =========================================================================
    public enum AcademicTier {
        DISTINCTION,
        FIRST_CLASS,
        SECOND_CLASS,
        PASS,
        FAIL
    }

    public static double dispatchScholarshipInr(AcademicTier tier, double baseFeeInr) {
        return switch (tier) {
            case DISTINCTION -> baseFeeInr * 0.25; // 25% waiver
            case FIRST_CLASS  -> baseFeeInr * 0.15; // 15% waiver
            case SECOND_CLASS -> baseFeeInr * 0.05; // 5% waiver
            case PASS, FAIL   -> 0.0;
        };
    }

    // =========================================================================
    // CHALLENGE 4: SIEVE OF ERATOSTHENES ROLL NUMBER PRIMALITY VALIDATOR
    // =========================================================================
    public static boolean[] generateSievePrimeTable(int maxRoll) {
        if (maxRoll < 2) return new boolean[0];
        boolean[] isPrime = new boolean[maxRoll + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;

        for (int p = 2; p * p <= maxRoll; p++) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple <= maxRoll; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }
        return isPrime;
    }

    // =========================================================================
    // CHALLENGE 5: CAPSTONE STUDENT BILLING RECORD
    // =========================================================================
    public record CapstoneCandidateResult(
        int rollNumber,
        String studentName,
        AcademicTier tier,
        double baseFeeInr,
        double scholarshipInr,
        double finalPayableFeeInr,
        boolean hasPrimeRollId
    ) {}

    public static CapstoneCandidateResult evaluateCandidate(
            int roll, String name, double score, double baseFee, boolean[] sieveTable) {
        Objects.requireNonNull(name, "name must not be null");

        AcademicTier tier = (score >= 90) ? AcademicTier.DISTINCTION :
                            (score >= 75) ? AcademicTier.FIRST_CLASS :
                            (score >= 60) ? AcademicTier.SECOND_CLASS :
                            (score >= 40) ? AcademicTier.PASS : AcademicTier.FAIL;

        double scholarship = dispatchScholarshipInr(tier, baseFee);
        double netBeforeTax = baseFee - scholarship;
        double finalPayable = netBeforeTax * 1.18; // 18% GST in India
        boolean isPrimeRoll = (roll < sieveTable.length) && sieveTable[roll];

        return new CapstoneCandidateResult(roll, name, tier, baseFee, scholarship, finalPayable, isPrimeRoll);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 SEGMENT 1 TIMED CODING ASSESSMENT");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Matrix Diagonal Sum Test
        int[][] scoreGrid = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };
        int diagSum = computeMatrixDiagonalSum(scoreGrid);
        System.out.printf("1. MATRIX DIAGONAL SUM (3x3 Grid): %d (Primary + Secondary - Center)%n%n", diagSum);

        // 2. Sieve Precomputation Table (Rolls up to 200)
        boolean[] sieve = generateSievePrimeTable(200);

        // 3. Capstone Evaluations
        List<CapstoneCandidateResult> candidates = List.of(
            evaluateCandidate(101, "Swadeep", 94.5, 20000.0, sieve),
            evaluateCandidate(103, "Tuhina", 96.0, 25000.0, sieve),
            evaluateCandidate(107, "Abhronila", 82.0, 18000.0, sieve),
            evaluateCandidate(110, "Debangshu", 72.0, 22000.0, sieve)
        );

        System.out.println("2. FINAL CAPSTONE CANDIDATE CERTIFICATION LEDGER:\n");
        double totalRevenue = 0.0;
        for (CapstoneCandidateResult c : candidates) {
            System.out.printf("  Roll #%03d (%s) | %-12s | Tier: %-12s | Base: ₹%,.2f | Waiver: ₹%,.2f | Net: ₹%,.2f%n",
                    c.rollNumber(),
                    c.hasPrimeRollId() ? "PRIME ROLL ✓" : "STANDARD    ",
                    c.studentName(),
                    c.tier(),
                    c.baseFeeInr(),
                    c.scholarshipInr(),
                    c.finalPayableFeeInr());
            totalRevenue += c.finalPayableFeeInr();
        }

        System.out.println("--------------------------------------------------------------------------------");
        System.out.printf("TOTAL CERTIFIED CAMPUS REVENUE: ₹%,.2f%n", totalRevenue);
        System.out.println("================================================================================\n");

        System.out.println("CONGRATULATIONS SWADEEP, TUHINA, ABHRONILA, & DEBANGSHU!");
        System.out.println("You have officially completed Segment 1: Java Core Foundations (Modules 001_001..008)!");
        System.out.println("Next Destination: SEGMENT 2: Object-Oriented Programming Core Mechanics (Module 002_001)!");
        System.out.println("================================================================================");
    }
}
