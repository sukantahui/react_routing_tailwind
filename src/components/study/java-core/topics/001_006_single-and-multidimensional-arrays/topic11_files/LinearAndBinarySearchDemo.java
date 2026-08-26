/**
 * File: LinearAndBinarySearchDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 11)
 * Description: Demonstrates Linear Search (O(N)) and Binary Search (O(log N)) algorithms in Java:
 *              unsorted vs sorted preconditions, integer midpoint overflow prevention (low + (high - low) / 2),
 *              Arrays.binarySearch() insertion point decoding, and student fee record lookup in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class LinearAndBinarySearchDemo {

    /**
     * Linear Search: Checks each element sequentially. O(N) Time, works on unsorted arrays.
     */
    public static int linearSearch(double[] arr, double target) {
        for (int i = 0; i < arr.length; i++) {
            if (Double.compare(arr[i], target) == 0) {
                return i; // Found target at index i!
            }
        }
        return -1; // Target not found
    }

    /**
     * Binary Search: Divides search space in half. O(log N) Time, REQUIRES sorted array.
     */
    public static int binarySearch(double[] sortedArr, double target) {
        int low = 0;
        int high = sortedArr.length - 1;

        while (low <= high) {
            // Prevents integer overflow bug:
            int mid = low + (high - low) / 2;

            if (Double.compare(sortedArr[mid], target) == 0) {
                return mid; // Target found at midpoint!
            } else if (sortedArr[mid] < target) {
                low = mid + 1; // Search right half
            } else {
                high = mid - 1; // Search left half
            }
        }
        return -1; // Target not found
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 LINEAR & BINARY SEARCH");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] unsortedFees = {18000.0, 12000.0, 25000.0, 14000.0, 15000.0};
        double targetFee = 14000.0; // Debangshu's fee

        // 1. Linear Search on Unsorted Array
        System.out.println("--- 1. LINEAR SEARCH ON UNSORTED ARRAY ---");
        System.out.println("  Unsorted array : " + Arrays.toString(unsortedFees));
        int linearIndex = linearSearch(unsortedFees, targetFee);
        System.out.printf("  Found ₹%,.2f at index [%d] via Linear Search (O(N)).%n%n", targetFee, linearIndex);

        // 2. Binary Search on Sorted Array
        System.out.println("--- 2. BINARY SEARCH ON SORTED ARRAY ---");
        double[] sortedFees = {12000.0, 14000.0, 15000.0, 18000.0, 25000.0}; // Sorted!
        System.out.println("  Sorted array   : " + Arrays.toString(sortedFees));
        int binaryIndex = binarySearch(sortedFees, targetFee);
        System.out.printf("  Found ₹%,.2f at index [%d] via Custom Binary Search (O(log N)).%n%n", targetFee, binaryIndex);

        // 3. java.util.Arrays.binarySearch() Utility
        System.out.println("--- 3. java.util.Arrays.binarySearch() UTILITY ---");
        int utilIndex = Arrays.binarySearch(sortedFees, targetFee);
        System.out.printf("  Arrays.binarySearch(sortedFees, ₹%,.2f) -> index [%d]%n", targetFee, utilIndex);

        // Searching for non-existent value:
        double missingFee = 16000.0;
        int missingIndex = Arrays.binarySearch(sortedFees, missingFee);
        int insertionPoint = -(missingIndex + 1);
        System.out.printf("  Searching for missing ₹%,.2f -> return code: %d (Insertion Point = index %d)%n%n",
                missingFee, missingIndex, insertionPoint);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Linear Search runs in O(N) time and works on UNSORTED arrays.");
        System.out.println("2. Binary Search runs in O(log N) time but STRICTLY REQUIRES a sorted array.");
        System.out.println("3. Always calculate midpoint using 'low + (high - low) / 2' to prevent integer overflow.");
        System.out.println("4. Arrays.binarySearch() returns '-(insertion_point + 1)' when the target is missing.");
        System.out.println("================================================================================");
    }
}
