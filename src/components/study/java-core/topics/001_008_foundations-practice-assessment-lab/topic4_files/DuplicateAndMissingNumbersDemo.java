/**
 * File: DuplicateAndMissingNumbersDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 4)
 * Description: Implements optimal algorithms to find Missing and Duplicate numbers in Java:
 *              1. Finding Single Missing Number: Gauss Sum vs Bitwise XOR (O(N) Time, O(1) Space)
 *              2. Finding Single Duplicate Number: Floyd's Tortoise and Hare Cycle Detection
 *              3. Set Mismatch (Find Duplicate & Missing Pair): Mathematical System vs Negative Index Marking
 *              for student roll number audits & serial ledger checks at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Arrays;

public class DuplicateAndMissingNumbersDemo {

    // =========================================================================
    // 1. FIND SINGLE MISSING NUMBER: Bitwise XOR (Zero Overflow Risk)
    // =========================================================================
    /**
     * Finds missing number in array containing (N - 1) distinct elements from range [1..N]
     */
    public static int findMissingNumberXor(int[] nums, int n) {
        int xorFull = 0;
        for (int i = 1; i <= n; i++) {
            xorFull ^= i;
        }

        int xorArray = 0;
        for (int val : nums) {
            xorArray ^= val;
        }

        // xorFull ^ xorArray leaves only the single missing element:
        return xorFull ^ xorArray;
    }

    // Mathematical Sum alternative:
    public static int findMissingNumberSum(int[] nums, int n) {
        long expectedSum = (long) n * (n + 1) / 2;
        long actualSum = 0;
        for (int val : nums) {
            actualSum += val;
        }
        return (int) (expectedSum - actualSum);
    }

    // =========================================================================
    // 2. FIND DUPLICATE NUMBER: Floyd's Cycle Detection (Tortoise & Hare)
    // =========================================================================
    /**
     * Finds duplicate in array of size (N + 1) with values in range [1..N] without mutating array
     */
    public static int findDuplicateFloyd(int[] nums) {
        // Phase 1: Finding intersection point inside cycle
        int tortoise = nums[0];
        int hare = nums[0];

        do {
            tortoise = nums[tortoise];
            hare = nums[nums[hare]];
        } while (tortoise != hare);

        // Phase 2: Finding the entrance to the cycle (the duplicate value)
        int ptr1 = nums[0];
        int ptr2 = tortoise;

        while (ptr1 != ptr2) {
            ptr1 = nums[ptr1];
            ptr2 = nums[ptr2];
        }

        return ptr1;
    }

    // =========================================================================
    // 3. SET MISMATCH: Find Duplicate & Missing Pair [Duplicate, Missing]
    // =========================================================================
    public static int[] findSetMismatch(int[] nums) {
        int duplicate = -1;
        int missing = -1;

        // Step 1: Negative index marking to locate duplicate
        for (int i = 0; i < nums.length; i++) {
            int val = Math.abs(nums[i]);
            if (nums[val - 1] < 0) {
                duplicate = val; // Already visited!
            } else {
                nums[val - 1] = -nums[val - 1]; // Mark as visited
            }
        }

        // Step 2: Positive value index identifies missing element
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                missing = i + 1;
                break;
            }
        }

        // Restore array signs:
        for (int i = 0; i < nums.length; i++) {
            nums[i] = Math.abs(nums[i]);
        }

        return new int[]{duplicate, missing};
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 DUPLICATE & MISSING NUMBERS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. MISSING NUMBER AUDIT (Barrackpore Student Roll Range: 1 to 10) ---
        int[] studentRollsMissing = {1, 2, 3, 5, 6, 7, 8, 9, 10}; // Missing 4
        int missingXor = findMissingNumberXor(studentRollsMissing, 10);
        int missingSum = findMissingNumberSum(studentRollsMissing, 10);

        System.out.println("1. SINGLE MISSING NUMBER AUDIT [Range: 1..10]:");
        System.out.printf("   Array        : %s%n", Arrays.toString(studentRollsMissing));
        System.out.printf("   Missing (XOR): Roll ID %d%n", missingXor);
        System.out.printf("   Missing (Sum): Roll ID %d%n%n", missingSum);

        // --- 2. FLOYD'S CYCLE DETECTION FOR DUPLICATE NUMBER ---
        int[] studentRollsDuplicate = {3, 1, 3, 4, 2}; // Duplicate 3
        int duplicateId = findDuplicateFloyd(studentRollsDuplicate);

        System.out.println("2. DUPLICATE NUMBER AUDIT (Floyd's Tortoise & Hare):");
        System.out.printf("   Array        : %s%n", Arrays.toString(studentRollsDuplicate));
        System.out.printf("   Duplicate ID : %d (Found without mutating array in O(1) space)%n%n", duplicateId);

        // --- 3. SET MISMATCH: FIND BOTH DUPLICATE & MISSING ---
        int[] transactionIds = {1, 2, 2, 4}; // Duplicate 2, Missing 3
        int[] mismatch = findSetMismatch(transactionIds);

        System.out.println("3. SET MISMATCH (Duplicate & Missing Pair):");
        System.out.printf("   Array        : %s%n", Arrays.toString(transactionIds));
        System.out.printf("   Result Pair  : Duplicate = %d, Missing = %d%n%n", mismatch[0], mismatch[1]);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Bitwise XOR eliminates integer overflow hazard completely for missing numbers.");
        System.out.println("2. Floyd's Tortoise & Hare finds duplicates in O(N) time and O(1) space non-destructively.");
        System.out.println("3. Negative index marking tracks visitation using array sign bits in-place.");
        System.out.println("4. Always restore modified array signs after negative index marking.");
        System.out.println("================================================================================");
    }
}
