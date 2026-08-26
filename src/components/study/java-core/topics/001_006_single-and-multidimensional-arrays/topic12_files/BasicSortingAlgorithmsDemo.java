/**
 * File: BasicSortingAlgorithmsDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 12)
 * Description: Demonstrates fundamental O(N^2) sorting algorithms in Java:
 *              1. Optimized Bubble Sort (with swapped early-exit flag)
 *              2. Selection Sort (minimum index finding with O(N) minimum swaps)
 *              3. Insertion Sort (in-place key insertion into sorted prefix)
 *              for student merit rank ordering in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class BasicSortingAlgorithmsDemo {

    /**
     * 1. Optimized Bubble Sort: Swaps adjacent out-of-order elements.
     * Time: O(N^2) worst/avg, O(N) best (early exit). Stable.
     */
    public static void bubbleSort(double[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    double temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // Already sorted, exit early!
        }
    }

    /**
     * 2. Selection Sort: Finds minimum element in unsorted suffix and places at front.
     * Time: O(N^2) all cases. Minimum swaps: O(N). Unstable.
     */
    public static void selectionSort(double[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                double temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    /**
     * 3. Insertion Sort: Inserts current element into correct position in sorted prefix.
     * Time: O(N^2) worst/avg, O(N) best. Stable and optimal for small datasets.
     */
    public static void insertionSort(double[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            double key = arr[i];
            int j = i - 1;
            // Shift elements greater than key to one position ahead:
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 12 BASIC SORTING ALGORITHMS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] rawFees = {18000.0, 12000.0, 25000.0, 14000.0, 15000.0};

        // 1. Bubble Sort Test
        System.out.println("--- 1. OPTIMIZED BUBBLE SORT ---");
        double[] bFees = rawFees.clone();
        System.out.println("  Before sort : " + Arrays.toString(bFees));
        bubbleSort(bFees);
        System.out.println("  After sort  : " + Arrays.toString(bFees) + "\n");

        // 2. Selection Sort Test
        System.out.println("--- 2. SELECTION SORT ---");
        double[] sFees = rawFees.clone();
        System.out.println("  Before sort : " + Arrays.toString(sFees));
        selectionSort(sFees);
        System.out.println("  After sort  : " + Arrays.toString(sFees) + "\n");

        // 3. Insertion Sort Test
        System.out.println("--- 3. INSERTION SORT ---");
        double[] iFees = rawFees.clone();
        System.out.println("  Before sort : " + Arrays.toString(iFees));
        insertionSort(iFees);
        System.out.println("  After sort  : " + Arrays.toString(iFees) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Bubble Sort: Swaps adjacent pairs; largest values bubble to end (Stable).");
        System.out.println("2. Selection Sort: Finds minimum index per pass; exactly O(N) swaps (Unstable).");
        System.out.println("3. Insertion Sort: Shifts elements in sorted prefix; O(N) for nearly sorted data (Stable).");
        System.out.println("4. JDK uses Dual-Pivot Quicksort (primitives) and TimSort (objects) internally.");
        System.out.println("================================================================================");
    }
}
