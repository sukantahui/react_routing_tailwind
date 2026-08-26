/**
 * File: ArrayIndexingAndElementAccessDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 5)
 * Description: Demonstrates 0-based array indexing and element access mechanics in Java (JLS §10.4):
 *              index boundaries [0 to length-1], memory offset calculation, element read/write mutations,
 *              in-place updates, and student workstation seat ledgers in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

public class ArrayIndexingAndElementAccessDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 5 ARRAY 0-BASED INDEXING & ACCESS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] batchFees = {12000.0, 15000.0, 18000.0, 14000.0};
        String[] studentNames = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};

        // 1. Reading Elements via 0-Based Indices
        System.out.println("--- 1. READING ELEMENTS VIA 0-BASED INDICES ---");
        System.out.printf("  First Element  [0]             : %s (₹%,.2f)%n", studentNames[0], batchFees[0]);
        System.out.printf("  Second Element [1]             : %s (₹%,.2f)%n", studentNames[1], batchFees[1]);
        System.out.printf("  Last Element   [length - 1 = %d]: %s (₹%,.2f)%n%n",
                batchFees.length - 1, studentNames[studentNames.length - 1], batchFees[batchFees.length - 1]);

        // 2. Element Mutation (Writing via Index)
        System.out.println("--- 2. ELEMENT MUTATION & IN-PLACE MODIFICATION ---");
        System.out.printf("  Swadeep original fee: ₹%,.2f%n", batchFees[0]);
        batchFees[0] += 1500.0; // In-place scholarship adjustment
        System.out.printf("  Swadeep adjusted fee: ₹%,.2f%n%n", batchFees[0]);

        // 3. Dynamic Index Expressions
        System.out.println("--- 3. DYNAMIC INDEX EXPRESSIONS & COMPUTATIONS ---");
        int targetIdx = 2; // Abhronila
        System.out.printf("  Dynamic target at index %d: %s (₹%,.2f)%n",
                targetIdx, studentNames[targetIdx], batchFees[targetIdx]);

        int midIdx = batchFees.length / 2;
        System.out.printf("  Midpoint element at index %d: %s (₹%,.2f)%n%n",
                midIdx, studentNames[midIdx], batchFees[midIdx]);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Array indexing is strictly 0-BASED: valid indices are 0 <= i <= length - 1.");
        System.out.println("2. First element is arr[0]; last element is arr[arr.length - 1].");
        System.out.println("3. Indexing executes in O(1) constant time via direct memory offset calculation.");
        System.out.println("4. Array elements can be read, written, and updated in-place via arr[i] += val.");
        System.out.println("================================================================================");
    }
}
