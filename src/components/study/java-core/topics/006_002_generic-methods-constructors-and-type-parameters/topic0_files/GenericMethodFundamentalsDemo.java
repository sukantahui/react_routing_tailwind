/**
 * Java Core Tutorial - Module 006_002: Generic Methods, Constructors & Type Inference
 * Topic 0: What is a Generic Method: Parameterizing Types at the Method Level
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericMethodFundamentalsDemo {

    // Non-generic class containing a GENERIC METHOD:
    // The type parameter <T> is scoped ONLY to this method!
    public static <T> void inspectAndPrint(T element) {
        System.out.println("  Element Value : " + element);
        System.out.println("  Runtime Class : " + element.getClass().getSimpleName());
        System.out.println("  ---------------------------------------------");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: GENERIC METHOD FUNDAMENTALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Invoking Generic Method with String:");
        inspectAndPrint("Swadeep Paul (Barrackpore)");

        System.out.println(">>> 2. Invoking Generic Method with Integer:");
        inspectAndPrint(101);

        System.out.println(">>> 3. Invoking Generic Method with Double:");
        inspectAndPrint(98.75);

        System.out.println("\n>>> WHY GENERIC METHODS ARE ESSENTIAL:");
        System.out.println("  1. Fine-Grained Scoping: Allows methods inside regular (non-generic) classes to be type-safe.");
        System.out.println("  2. Polymorphic Utility: Single method handles heterogeneous data types without code duplication.");
        System.out.println("  3. Compile-Time Verification: Eliminates dangerous runtime Object casting.");

        System.out.println("\n==========================================================================");
    }
}