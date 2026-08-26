/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 0: Why Arrays are Insufficient: Fixed Capacity, Manual Shifts & Inflexibility
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArraysVsCollectionsComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY ARRAYS ARE INSUFFICIENT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. ARRAY LIMITATIONS (Fixed Capacity, Manual Insertion Logic):
        String[] studentArray = new String[2]; // Fixed size 2
        studentArray[0] = "Swadeep Paul";
        studentArray[1] = "Tuhina Das";

        // To add a 3rd student, we must manually allocate a new bigger array and copy elements:
        String[] expandedArray = new String[studentArray.length + 1];
        System.arraycopy(studentArray, 0, expandedArray, 0, studentArray.length);
        expandedArray[2] = "Abhronila Das";

        System.out.println(">>> 1. Primitive Array (Requires Manual Resizing):");
        System.out.println("  " + Arrays.toString(expandedArray));

        // 2. JAVA COLLECTIONS FRAMEWORK (Dynamic Auto-Resizing & High-Level APIs):
        List<String> studentList = new ArrayList<>();
        studentList.add("Swadeep Paul");
        studentList.add("Tuhina Das");
        studentList.add("Abhronila Das"); // Auto-resizes seamlessly!
        studentList.remove("Tuhina Das"); // In-place deletion without manual shifts!

        System.out.println("\n>>> 2. JCF Dynamic Collection (Zero Boilerplate):");
        System.out.println("  " + studentList);

        System.out.println("\n>>> THE 4 CRITICAL DEFICIENCIES OF ARRAYS:");
        System.out.println("  1. Fixed Size: Cannot grow or shrink dynamically once created in memory.");
        System.out.println("  2. Manual Shifts: Deleting element at index 0 requires manually shifting all elements left.");
        System.out.println("  3. Lack of Data Structure Models: Arrays cannot enforce uniqueness (Sets) or key-value lookup (Maps).");
        System.out.println("  4. Generics Incompatibility: Arrays are covariant and clash with generic type safety.");

        System.out.println("\n==========================================================================");
    }
}