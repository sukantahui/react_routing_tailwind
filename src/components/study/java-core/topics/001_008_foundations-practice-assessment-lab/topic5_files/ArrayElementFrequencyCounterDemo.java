/**
 * File: ArrayElementFrequencyCounterDemo.java
 * Module: 001_008_foundations-practice-assessment-lab (Topic 5)
 * Description: Implements comprehensive Array Element Frequency Counting Algorithms in Java:
 *              1. Direct Address Frequency Array: O(N) Time, O(K) Space for bounded ranges
 *              2. HashMap / LinkedHashMap Frequency Table: O(N) Time for unbounded/negative ranges
 *              3. In-Place Modulo Offset Frequency Counting: O(N) Time, O(1) Auxiliary Space
 *              for student score distribution and attendance audit at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.foundations;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

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
    // 2. LINKED HASH MAP FREQUENCY TABLE (Unbounded, negative, or sparse ranges)
    // =========================================================================
    public static Map<Integer, Integer> countFrequencyHashMap(int[] nums) {
        // LinkedHashMap preserves order of first appearance
        Map<Integer, Integer> freqMap = new LinkedHashMap<>();
        for (int val : nums) {
            freqMap.put(val, freqMap.getOrDefault(val, 0) + 1);
        }
        return freqMap;
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
        System.out.printf("   Input Array : %s%n", Arrays.toString(studentMarks));
        System.out.println("   Frequency Distribution:");
        for (int score = 0; score <= maxMark; score++) {
            if (freqArr[score] > 0) {
                System.out.printf("     Score %2d/10 : %d students%n", score, freqArr[score]);
            }
        }

        // --- 2. LINKED HASH MAP FREQUENCY TEST (Sparse / Arbitrary IDs) ---
        int[] courseEnrollmentIds = {101, 204, 101, 305, 204, 101, 408, -50, 305, 101};
        Map<Integer, Integer> mapResults = countFrequencyHashMap(courseEnrollmentIds);

        System.out.println("\n2. LINKED HASH MAP FREQUENCY TABLE (Arbitrary / Negative IDs):");
        System.out.printf("   Input Array : %s%n", Arrays.toString(courseEnrollmentIds));
        System.out.println("   Frequency Counts (Insertion Order Preserved):");
        mapResults.forEach((id, count) ->
                System.out.printf("     ID %4d : %d enrollments%n", id, count));

        // --- 3. IN-PLACE MODULO FREQUENCY TEST (Range: 1..N) ---
        int[] batchAttendance = {2, 3, 3, 2, 5}; // N = 5, elements in range [1..5]
        System.out.println("\n3. IN-PLACE MODULO FREQUENCY COUNTING (Range 1..N):");
        System.out.printf("   Input Array : %s (Size N = %d)%n", Arrays.toString(batchAttendance), batchAttendance.length);
        countFrequencyInPlace(batchAttendance);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Direct Address Frequency Array is the fastest possible approach for bounded ranges.");
        System.out.println("2. Use LinkedHashMap when elements are sparse, negative, or unbounded.");
        System.out.println("3. Modulo N arithmetic allows counting frequencies in-place in O(1) space.");
        System.out.println("4. Map.getOrDefault(key, 0) + 1 is the canonical idiomatic Java map counter pattern.");
        System.out.println("================================================================================");
    }
}
