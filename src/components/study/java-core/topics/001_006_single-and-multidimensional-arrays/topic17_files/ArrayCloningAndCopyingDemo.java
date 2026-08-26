/**
 * File: ArrayCloningAndCopyingDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 17)
 * Description: Demonstrates array cloning and copying mechanisms in Java:
 *              1. System.arraycopy() (native low-level high-speed memory transfer and self-overlapping shifts)
 *              2. arr.clone() (shallow cloning with covariant return types)
 *              3. Arrays.copyOf() and Arrays.copyOfRange() (resizing and slicing utilities)
 *              for campus fee archive backups in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class ArrayCloningAndCopyingDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 ARRAY CLONING & COPYING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        double[] originalFees = {12000.0, 15000.0, 18000.0, 14000.0, 20000.0};
        System.out.println("  Original Fees: " + Arrays.toString(originalFees) + "\n");

        // 1. System.arraycopy() (High-Speed Native Memory Copy)
        System.out.println("--- 1. System.arraycopy() (NATIVE JVM INTRINSIC) ---");
        double[] systemCopy = new double[originalFees.length];
        // (src, srcPos, dest, destPos, length)
        System.arraycopy(originalFees, 0, systemCopy, 0, originalFees.length);
        System.out.println("  System.arraycopy result : " + Arrays.toString(systemCopy));

        // Self-Overlapping Shift using System.arraycopy:
        double[] shiftDemo = {10.0, 20.0, 30.0, 40.0, 50.0};
        System.arraycopy(shiftDemo, 1, shiftDemo, 0, 4); // Shift left by 1
        System.out.println("  Self-overlapping shift : " + Arrays.toString(shiftDemo) + "\n");

        // 2. arr.clone() (Covariant Array Cloning)
        System.out.println("--- 2. arr.clone() (COVARIANT CLONING) ---");
        double[] clonedFees = originalFees.clone();
        clonedFees[0] = 99999.0; // Mutate clone
        System.out.println("  Cloned Fees (Mutated [0]): " + Arrays.toString(clonedFees));
        System.out.println("  Original Fees (Intact)   : " + Arrays.toString(originalFees) + "\n");

        // 3. Arrays.copyOf() (Resizing & Padding / Truncating)
        System.out.println("--- 3. java.util.Arrays.copyOf() (EXPANSION & TRUNCATION) ---");
        double[] expandedFees = Arrays.copyOf(originalFees, 7); // Expanded to length 7 (padded with 0.0)
        double[] truncatedFees = Arrays.copyOf(originalFees, 3); // Truncated to first 3 elements
        System.out.println("  Expanded (length 7)  : " + Arrays.toString(expandedFees));
        System.out.println("  Truncated (length 3) : " + Arrays.toString(truncatedFees) + "\n");

        // 4. Arrays.copyOfRange() (Subarray Slicing)
        System.out.println("--- 4. java.util.Arrays.copyOfRange() (SUBARRAY SLICE) ---");
        // Extract elements from index 1 (inclusive) to 4 (exclusive):
        double[] slicedFees = Arrays.copyOfRange(originalFees, 1, 4);
        System.out.println("  Slice [1 to 4) : " + Arrays.toString(slicedFees) + "\n");

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. System.arraycopy() is the fastest native memory copy and handles overlapping self-copies.");
        System.out.println("2. arr.clone() returns a new 1D array on Heap (shallow for object/2D arrays).");
        System.out.println("3. Arrays.copyOf() resizes arrays by padding zeros or truncating trailing items.");
        System.out.println("4. Arrays.copyOfRange(arr, from, to) extracts a slice with half-open range [from, to).");
        System.out.println("================================================================================");
    }
}
