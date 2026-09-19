/**
 * File: ArrayElementFrequencyCounterDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 5)
 * Description: Implements comprehensive Array Element Frequency Counting Algorithms in Java:
 *              1. Direct Address Frequency Array: O(N) Time, O(K) Space for bounded ranges
 *              2. Visited-Array Frequency Table: O(N^2) Time, O(N) Space for unbounded/negative ranges
 *              3. In-Place Modulo Offset Frequency Counting: O(N) Time, O(1) Auxiliary Space
 *              for student score distribution and attendance audit at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

public class ArrayElementFrequencyCounterDemo {

    // =========================================================================
    // 1. DIRECT ADDRESS FREQUENCY ARRAY (Bounded positive range [0..K])
    // =========================================================================
    public static int[] countFrequencyDirectAddress(int[] nums, int maxVal) {
        int[] freq = new int[maxVal + 1];
        for (int val : nums) {
            if (val >= 0 && val <= maxVal) {
                freq[val]++; // Direct CPU memory increment in O(1)
            }
        }
        return freq;
    }

    // =========================================================================
    // 2. VISITED-ARRAY FREQUENCY TABLE (Arbitrary, negative, or sparse ranges)
    // =========================================================================
    public static void countFrequencyVisited(int[] nums) {
        int n = nums.length;
        boolean[] visited = new boolean[n];

        for (int i = 0; i < n; i++) {
            // Skip this element if already counted:
            if (visited[i]) {
                continue;
            }

            int count = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    visited[j] = true;
                    count++;
                }
            }
            System.out.printf("     ID %4d : %d enrollments%n", nums[i], count);
        }
    }

    // =========================================================================
    // 3. IN-PLACE MODULO OFFSET COUNTING: O(N) Time, O(1) Auxiliary Space
    // =========================================================================
    /**
     * For array of size N where elements are in range [1..N], counts frequencies in-place!
     */
    public static void countFrequencyInPlace(int[] nums) {
        int n = nums.length;

        // Step 1: Decrement all elements by 1 to map range from [1..N] to [0..N-1]
        for (int i = 0; i < n; i++) {
            nums[i] = nums[i] - 1;
        }

        // Step 2: Use modulo N arithmetic to encode counts into existing array slots
        for (int i = 0; i < n; i++) {
            int targetIndex = nums[i] % n;
            nums[targetIndex] += n;
        }

        // Step 3: Extract frequencies: freq of (i + 1) = nums[i] / n
        System.out.println("  [IN-PLACE FREQUENCY RESULTS]:");
        for (int i = 0; i < n; i++) {
            int element = i + 1;
            int count = nums[i] / n;
            if (count > 0) {
                System.out.printf("    Element %2d : appears %d times%n", element, count);
            }
        }
    }

    // Helper: Pretty-print a 1D primitive array using basic loops
    public static void printArray(String label, int[] arr) {
        System.out.print("   " + label + " : [");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 ARRAY ELEMENT FREQUENCY COUNTERS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // --- 1. DIRECT ADDRESS FREQUENCY TEST (Student Grades: 0 to 10 scale) ---
        int[] studentMarks = {8, 9, 8, 7, 10, 8, 9, 7, 6, 8, 10, 9, 7};
        int maxMark = 10;
        int[] freqArr = countFrequencyDirectAddress(studentMarks, maxMark);

        System.out.println("1. DIRECT ADDRESS FREQUENCY ARRAY (Student Marks Scale 0..10):");
        printArray("Input Array", studentMarks);
        System.out.println("   Frequency Distribution:");
        for (int score = 0; score <= maxMark; score++) {
            if (freqArr[score] > 0) {
                System.out.printf("     Score %2d/10 : %d students%n", score, freqArr[score]);
            }
        }

        // --- 2. VISITED-ARRAY FREQUENCY TEST (Arbitrary / Negative IDs) ---
        int[] courseEnrollmentIds = {101, 204, 101, 305, 204, 101, 408, -50, 305, 101};

        System.out.println("\n2. VISITED-ARRAY FREQUENCY TABLE (Arbitrary / Negative IDs):");
        printArray("Input Array", courseEnrollmentIds);
        System.out.println("   Frequency Counts (First Occurrence Order Preserved):");
        countFrequencyVisited(courseEnrollmentIds);

        // --- 3. IN-PLACE MODULO FREQUENCY TEST (Range: 1..N) ---
        int[] batchAttendance = {2, 3, 3, 2, 5}; // N = 5, elements in range [1..5]
        System.out.println("\n3. IN-PLACE MODULO FREQUENCY COUNTING (Range 1..N):");
        printArray("Input Array", batchAttendance);
        System.out.printf("   Size N = %d%n", batchAttendance.length);
        countFrequencyInPlace(batchAttendance);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Direct Address Frequency Array is O(N) fastest for bounded positive ranges [0..K].");
        System.out.println("2. Visited boolean array tracks frequencies of arbitrary/negative elements in O(N^2) time without Maps.");
        System.out.println("3. Modulo N arithmetic allows counting frequencies in-place in O(1) auxiliary space.");
        System.out.println("4. Implemented purely with primitive arrays (int[], boolean[]) and loops - zero Collections needed!");
        System.out.println("================================================================================");
    }
}
