/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 6: Generic Methods with Array Parameters (printArray, arrayInspection)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericMethodArrayProcessingDemo {

    // Generic Method accepting generic array argument:
    public static <T> void printArray(String label, T[] array) {
        System.out.print("  " + label + " [" + array.length + " elements]: ");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) System.out.print(", ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: GENERIC ARRAY METHOD PROCESSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String[] students = {"Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee"};
        Integer[] rollNumbers = {101, 102, 103, 104};
        Double[] scores = {98.5, 96.0, 99.2, 94.8};
        Character[] grades = {'A', 'A', 'O', 'A'};

        System.out.println(">>> Printing Heterogeneous Arrays using Single Generic Method:");
        printArray("Students", students);
        printArray("Rolls", rollNumbers);
        printArray("Scores", scores);
        printArray("Grades", grades);

        System.out.println("\n>>> CRITICAL JAVA RULE: PRIMITIVE ARRAYS CANNOT BE PASSED DIRECTLY:");
        System.out.println("  - 'int[]' cannot be passed as 'T[]' because 'int' is a primitive and cannot substitute for Object 'T'.");
        System.out.println("  - Always use wrapper arrays ('Integer[]', 'Double[]', etc.) with generic methods!");

        System.out.println("\n==========================================================================");
    }
}