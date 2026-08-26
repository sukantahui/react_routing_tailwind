/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 4: Unboxing: Automatic Conversion of Wrapper Object to Primitive
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class UnboxingFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: UNBOXING FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Integer boxedScore = Integer.valueOf(95);

        // 1. Explicit Unboxing (Pre-Java 5):
        int explicitScore = boxedScore.intValue();

        // 2. Modern UNBOXING (Automatic):
        int modernScore = boxedScore; // Compiler automatically extracts primitive int!

        System.out.println(">>> 1. Unboxing Results:");
        System.out.println("  boxedScore    : " + boxedScore + " (Integer on Heap)");
        System.out.println("  explicitScore : " + explicitScore + " (Extracted via intValue())");
        System.out.println("  modernScore   : " + modernScore + " (Auto-unboxed into primitive on Stack)");

        // 3. Unboxing in Arithmetic Expressions:
        Integer a = 50;
        Integer b = 25;
        int sum = a + b; // Both 'a' and 'b' are automatically unboxed before addition!
        System.out.println("\n>>> 2. Arithmetic on Wrapper Objects (Auto-unboxing):");
        System.out.println("  a + b = " + sum);

        System.out.println("\n==========================================================================");
    }
}