/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 7: Case-Insensitive Comparisons: equalsIgnoreCase(), compareTo(), compareToIgnoreCase()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringComparisonMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CASE-INSENSITIVE & LEXICOGRAPHICAL COMPARISON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String hubA = "Barrackpore";
        String hubB = "barrackpore";
        String hubC = "Ichapur";

        System.out.println(">>> 1. Case-Insensitive Equality:");
        System.out.println("  hubA.equals(hubB)               : " + hubA.equals(hubB) + " (Case Sensitive)");
        System.out.println("  hubA.equalsIgnoreCase(hubB)     : " + hubA.equalsIgnoreCase(hubB) + " (Ignores Case)");

        System.out.println("\n>>> 2. Lexicographical Ordering (compareTo):");
        System.out.println("  hubA.compareTo(hubC)            : " + hubA.compareTo(hubC) + " ('B' comes before 'I' -> Negative)");
        System.out.println("  hubC.compareTo(hubA)            : " + hubC.compareTo(hubA) + " ('I' comes after 'B' -> Positive)");
        System.out.println("  hubA.compareToIgnoreCase(hubB)  : " + hubA.compareToIgnoreCase(hubB) + " (0 = Alphabetically Identical)");

        System.out.println("\n>>> Return Value Contract of compareTo():");
        System.out.println("  - Returns < 0 : This string comes BEFORE the argument string alphabetically.");
        System.out.println("  - Returns = 0 : Both strings are equal.");
        System.out.println("  - Returns > 0 : This string comes AFTER the argument string alphabetically.");

        System.out.println("\n==========================================================================");
    }
}