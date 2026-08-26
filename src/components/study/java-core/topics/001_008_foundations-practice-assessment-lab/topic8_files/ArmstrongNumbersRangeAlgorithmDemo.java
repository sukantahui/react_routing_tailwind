/**
 * File: ArmstrongNumbersRangeAlgorithmDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 8)
 * Description: Implements comprehensive Armstrong (Narcissistic) Number Verification & Range Generator in Java:
 *              1. Armstrong verification for arbitrary digit counts (1-digit to N-digits)
 *              2. Digit count calculation via Integer Arithmetic vs Math.log10()
 *              3. Precomputed Digit Powers Optimization table (avoids repeated Math.pow() overhead)
 *              4. Range Scanner [start..end] with early pruning optimizations
 *              for campus merit awards & verification token generators at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.ArrayList;
import java.util.List;

public class ArmstrongNumbersRangeAlgorithmDemo {

    // =========================================================================
    // 1. DIGIT COUNT CALCULATION
    // =========================================================================
    public static int countDigits(int n) {
        if (n == 0) return 1;
        int count = 0;
        int temp = Math.abs(n);
        while (temp > 0) {
            count++;
            temp /= 10;
        }
        return count;
    }

    // =========================================================================
    // 2. INTEGER POWER METHOD (Fast Integer Multiplication, Zero Floating Point)
    // =========================================================================
    public static int intPower(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }

    // =========================================================================
    // 3. IS ARMSTRONG NUMBER (With Precomputed Powers Optimization)
    // =========================================================================
    public static boolean isArmstrong(int n) {
        if (n < 0) return false; // Negative numbers are not Armstrong
        if (n >= 0 && n <= 9) return true; // Single digit numbers are always Armstrong

        int digitCount = countDigits(n);

        // Precompute powers for digits 0..9 for this digit count:
        int[] digitPowers = new int[10];
        for (int d = 0; d <= 9; d++) {
            digitPowers[d] = intPower(d, digitCount);
        }

        int sum = 0;
        int temp = n;

        while (temp > 0) {
            int digit = temp % 10;
            sum += digitPowers[digit];
            // Early pruning: If sum exceeds n, it cannot be an Armstrong number!
            if (sum > n) return false;
            temp /= 10;
        }

        return sum == n;
    }

    // =========================================================================
    // 4. FIND ALL ARMSTRONG NUMBERS IN A GIVEN RANGE [start..end]
    // =========================================================================
    public static List<Integer> findArmstrongInRange(int start, int end) {
        List<Integer> armstrongList = new ArrayList<>();
        for (int i = start; i <= end; i++) {
            if (isArmstrong(i)) {
                armstrongList.add(i);
            }
        }
        return armstrongList;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 8 ARMSTRONG NUMBERS IN A RANGE");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. SINGLE NUMBER VERIFICATIONS ---
        int[] testCases = {153, 370, 371, 407, 1634, 8208, 9474, 500, 1000};
        System.out.println("1. INDIVIDUAL NUMBER ARMSTRONG VERIFICATIONS:");
        for (int num : testCases) {
            int d = countDigits(num);
            boolean arm = isArmstrong(num);
            System.out.printf("   Number: %-6d | Digits: %d | Is Armstrong? %s%n",
                    num, d, arm ? "✓ TRUE" : "❌ FALSE");
        }

        // --- 2. FIND ALL 3-DIGIT ARMSTRONG NUMBERS [100..999] ---
        System.out.println("\n2. ALL 3-DIGIT ARMSTRONG NUMBERS IN RANGE [100..999]:");
        List<Integer> threeDigitArmstrongs = findArmstrongInRange(100, 999);
        System.out.println("   Found: " + threeDigitArmstrongs);

        // --- 3. FIND ALL 4-DIGIT ARMSTRONG NUMBERS [1000..9999] ---
        System.out.println("\n3. ALL 4-DIGIT ARMSTRONG NUMBERS IN RANGE [1000..9999]:");
        List<Integer> fourDigitArmstrongs = findArmstrongInRange(1000, 9999);
        System.out.println("   Found: " + fourDigitArmstrongs + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Armstrong number: Sum of (digit ^ digitCount) equals the original number.");
        System.out.println("2. Precomputing powers for digits 0..9 eliminates repeated power computations.");
        System.out.println("3. Early pruning (sum > n) halts verification as soon as partial sum exceeds n.");
        System.out.println("4. Fast integer multiplication avoids floating-point precision issues with Math.pow().");
        System.out.println("================================================================================");
    }
}
