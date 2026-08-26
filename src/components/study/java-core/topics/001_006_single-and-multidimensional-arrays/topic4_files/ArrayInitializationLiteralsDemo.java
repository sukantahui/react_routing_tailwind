/**
 * File: ArrayInitializationLiteralsDemo.java
 * Module: 001_006_single-and-multidimensional-arrays (Topic 4)
 * Description: Demonstrates array initialization literal syntax in Java (JLS §10.6):
 *              declaration initializers ({10, 20, 30}), anonymous array creation (new int[]{...}),
 *              reassignment rules, passing inline arrays to methods, multidimensional literals,
 *              and course fee pricing packages in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.arrays;

import java.util.Arrays;

public class ArrayInitializationLiteralsDemo {

    public static double computeTotalFee(double[] fees) {
        double total = 0.0;
        for (double fee : fees) total += fee;
        return total;
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 ARRAY INITIALIZATION LITERALS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Array Initializer Shortcut (At Declaration Only)
        System.out.println("--- 1. ARRAY INITIALIZER SHORTCUT ({ ... }) ---");
        // Compiler infers length = 4 and allocates Heap object:
        double[] coursePackages = {12000.0, 15000.0, 18000.0, 25000.0};

        System.out.printf("  Declared coursePackages array with %d items.%n", coursePackages.length);
        System.out.println("  Package tiers: " + Arrays.toString(coursePackages));

        // 2. Anonymous Array Creation (new Type[]{ ... })
        System.out.println("\n--- 2. ANONYMOUS ARRAY CREATION ---");
        // Reassigning an existing reference requires 'new double[]':
        coursePackages = new double[]{14000.0, 16000.0, 20000.0};
        System.out.println("  Reassigned coursePackages: " + Arrays.toString(coursePackages));

        // Passing anonymous array directly to a method without a local variable:
        double batchTotal = computeTotalFee(new double[]{12000.0, 15000.0, 18000.0});
        System.out.printf("  Computed batch total fee via inline anonymous array: ₹%,.2f%n", batchTotal);

        // 3. 2D Nested Array Initializers
        System.out.println("\n--- 3. 2D NESTED ARRAY LITERALS ---");
        int[][] classroomSeating = {
            {101, 102, 103}, // Hall 1 (Barrackpore)
            {201, 202},      // Hall 2 (Naihati - Jagged length!)
            {301, 302, 303, 304} // Hall 3 (Shyamnagar)
        };

        System.out.println("  Classroom seating matrix rows: " + classroomSeating.length);
        for (int r = 0; r < classroomSeating.length; r++) {
            System.out.printf("  Hall %d (Length %d): %s%n",
                    (r + 1), classroomSeating[r].length, Arrays.toString(classroomSeating[r]));
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '{val1, val2}' shortcut can ONLY be used during initial declaration.");
        System.out.println("2. 'new Type[]{val1, val2}' can be used anywhere (reassignments, method arguments).");
        System.out.println("3. NEVER specify dimension size with an initializer (new int[3]{1,2,3} is a compile error!).");
        System.out.println("4. Array literals allow creating irregular/jagged 2D matrices effortlessly.");
        System.out.println("================================================================================");
    }
}
