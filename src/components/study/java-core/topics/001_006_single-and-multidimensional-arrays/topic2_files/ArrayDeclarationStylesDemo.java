/**
 * File: ArrayDeclarationStylesDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 2)
 * Description: Demonstrates array declaration syntax in Java (JLS §10.2):
 *              preferred Java style (type-bound brackets: int[] arr) vs C-style legacy syntax (identifier-bound: int arr[]),
 *              multi-variable declaration traps (int[] a, b vs int a[], b),
 *              and student examination fee rosters in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

public class ArrayDeclarationStylesDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 ARRAY DECLARATION STYLES");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Preferred Java Convention: Type-Bound Brackets (int[] arr)
        System.out.println("--- 1. PREFERRED JAVA CONVENTION: TYPE-BOUND BRACKETS ---");
        // Clear message: "feesA and feesB are of type double[] (Array of double)"
        double[] feesA = {12000.0, 15000.0}, feesB = {18000.0, 14000.0};

        System.out.printf("  feesA type: %s | length: %d%n", feesA.getClass().getName(), feesA.length);
        System.out.printf("  feesB type: %s | length: %d%n", feesB.getClass().getName(), feesB.length);
        System.out.println("  ✓ 'double[] a, b;' declares BOTH variables as arrays cleanly.\n");

        // 2. C-Style Legacy Syntax & The Multi-Variable Trap
        System.out.println("--- 2. C-STYLE LEGACY SYNTAX & MULTI-VARIABLE TRAP ---");
        // Notice: 'arrC' is an int[], but 'scalarD' is just a regular primitive int!
        int arrC[] = {101, 102}, scalarD = 5000;

        System.out.printf("  arrC is array: %s%n", arrC.getClass().getName()); // [I
        System.out.printf("  scalarD is primitive int: ₹%,d%n", scalarD);
        System.out.println("  ⚠️ In 'int a[], b;', 'a' is an array, but 'b' is a regular primitive int!\n");

        // 3. Multidimensional Declaration Variations
        System.out.println("--- 3. MULTIDIMENSIONAL BRACKET PLACEMENT VARIATIONS ---");
        int[][] clean2D = {{1, 2}, {3, 4}};       // Standard Java Style (Preferred)
        int mixed2D[] = {10, 20};                 // 1D array
        int[] oneD, twoD[];                       // 'oneD' is 1D (int[]), 'twoD' is 2D (int[][])!

        oneD = new int[]{1, 2, 3};
        twoD = new int[][]{{10, 20}, {30, 40}};

        System.out.printf("  oneD dimensions: %s (1D Array)%n", oneD.getClass().getName()); // [I
        System.out.printf("  twoD dimensions: %s (2D Array)%n", twoD.getClass().getName()); // [[I

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. ALWAYS prefer Java style: 'int[] arr;' (Brackets attach to TYPE, not variable).");
        System.out.println("2. 'int[] a, b;' declares TWO arrays; 'int a[], b;' declares 1 array and 1 primitive int.");
        System.out.println("3. C-style 'int arr[];' exists only for backward C/C++ compatibility; avoid in modern Java.");
        System.out.println("================================================================================");
    }
}
