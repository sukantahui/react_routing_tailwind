/**
 * File: RecursiveBinarySearchAlgorithmsDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 7)
 * Description: Implements comprehensive Binary Search Algorithms in Java:
 *              1. Recursive Binary Search: Divide-and-conquer recurrence T(N) = T(N/2) + O(1)
 *              2. Integer overflow prevention: mid = low + (high - low) / 2
 *              3. Iterative Binary Search benchmark comparison (O(1) Space)
 *              4. First occurrence & Last occurrence variations on duplicated sorted arrays
 *              for student roll database lookup at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Arrays;

public class RecursiveBinarySearchAlgorithmsDemo {

    // =========================================================================
    // 1. RECURSIVE BINARY SEARCH: O(log N) Time, O(log N) Stack Space
    // =========================================================================
    public static int binarySearchRecursive(int[] arr, int low, int high, int target) {
        // Base Case 1: Search range exhausted (Element not found)
        if (low > high) {
            return -1;
        }

        // Midpoint calculation with integer overflow protection:
        int mid = low + (high - low) / 2;

        // Base Case 2: Target found at mid
        if (arr[mid] == target) {
            return mid;
        }

        // Recursive Step: Divide search space into left or right half
        if (arr[mid] > target) {
            return binarySearchRecursive(arr, low, mid - 1, target); // Search Left
        } else {
            return binarySearchRecursive(arr, mid + 1, high, target); // Search Right
        }
    }

    // =========================================================================
    // 2. ITERATIVE BINARY SEARCH: O(log N) Time, O(1) Auxiliary Space
    // =========================================================================
    public static int binarySearchIterative(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] > target) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    // =========================================================================
    // 3. FIRST OCCURRENCE IN SORTED ARRAY WITH DUPLICATES
    // =========================================================================
    public static int findFirstOccurrence(int[] arr, int low, int high, int target) {
        if (low > high) return -1;
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            // Check if this is the first occurrence or recurse further left
            if (mid == 0 || arr[mid - 1] != target) {
                return mid;
            }
            return findFirstOccurrence(arr, low, mid - 1, target);
        }

        if (arr[mid] > target) {
            return findFirstOccurrence(arr, low, mid - 1, target);
        } else {
            return findFirstOccurrence(arr, mid + 1, high, target);
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 7 RECURSIVE BINARY SEARCH");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. RECURSIVE BINARY SEARCH ON SORTED BARRACKPORE STUDENT ROLLS ---
        int[] sortedRolls = {101, 105, 112, 118, 125, 130, 142, 150, 165, 180};
        System.out.println("1. SORTED STUDENT ROLL LEDGER:");
        System.out.println("   " + Arrays.toString(sortedRolls) + "\n");

        int[] searchTargets = {130, 101, 180, 199};
        for (int target : searchTargets) {
            int recIndex = binarySearchRecursive(sortedRolls, 0, sortedRolls.length - 1, target);
            int iterIndex = binarySearchIterative(sortedRolls, target);
            System.out.printf("   Target Roll ID %3d | Recursive Index: %2d | Iterative Index: %2d%n",
                    target, recIndex, iterIndex);
        }

        // --- 2. FIND FIRST OCCURRENCE IN ARRAY WITH DUPLICATES ---
        int[] scoresWithDuplicates = {50, 60, 70, 70, 70, 80, 90};
        int targetScore = 70;
        int firstIdx = findFirstOccurrence(scoresWithDuplicates, 0, scoresWithDuplicates.length - 1, targetScore);

        System.out.println("\n2. FIRST OCCURRENCE SEARCH IN DUPLICATED SCORES:");
        System.out.println("   Array: " + Arrays.toString(scoresWithDuplicates));
        System.out.printf("   First Occurrence of Score %d is at Index: %d%n%n", targetScore, firstIdx);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Binary Search requires a SORTED array to halve the search space at each step.");
        System.out.println("2. Always calculate midpoint using 'low + (high - low) / 2' to prevent integer overflow.");
        System.out.println("3. Recursive base case 'low > high' guarantees termination in O(log N) depth.");
        System.out.println("4. Iterative binary search uses O(1) space, while recursive uses O(log N) stack frames.");
        System.out.println("================================================================================");
    }
}
