/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 8: The Hidden Danger of Unboxing: NullPointerException on Null Wrappers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class UnboxingNullPointerExceptionDangerDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: UNBOXING NullPointerException TRAP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Integer studentScore = null; // Unassigned score from database

        System.out.println(">>> 1. Attempting to auto-unbox a NULL Integer reference into a primitive 'int':");
        try {
            // Under the hood, this executes: int primitiveVal = studentScore.intValue();
            // Calling a method on a NULL reference throws NullPointerException!
            int primitiveVal = studentScore;
            System.out.println("  Value: " + primitiveVal);
        } catch (NullPointerException e) {
            System.out.println("  [CRASH DETECTED] NullPointerException thrown during auto-unboxing!");
            System.out.println("  Explanation: JVM attempted to invoke .intValue() on a null reference.");
        }

        System.out.println("\n>>> 2. Defensive Coding Pattern (Safe Unboxing with default fallback):");
        int safeScore = (studentScore != null) ? studentScore : 0;
        System.out.println("  Safe Score using Ternary Fallback: " + safeScore);

        System.out.println("\n==========================================================================");
    }
}