/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 3: How JVM Optimizes Memory by Reusing Identical String Literals
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class LiteralReuseOptimizationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: SCP LITERAL REUSE OPTIMIZATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Imagine 10,000 students enrolled in 'Barrackpore Hub':
        String hub1 = "Barrackpore";
        String hub2 = "Barrackpore";
        String hub3 = "Barrackpore";
        String hub4 = "Barrackpore";

        System.out.println(">>> 1. Verifying Reference Sharing across 4 variables:");
        System.out.println("  hub1 == hub2: " + (hub1 == hub2));
        System.out.println("  hub2 == hub3: " + (hub2 == hub3));
        System.out.println("  hub3 == hub4: " + (hub3 == hub4));

        System.out.println("\n>>> 2. Memory Savings Analysis:");
        System.out.println("  - Without SCP : 10,000 separate String objects created on Heap.");
        System.out.println("  - With SCP    : EXACTLY 1 String object created in SCP; 10,000 pointers reference it!");
        System.out.println("  - Memory saved: Over 99.9% RAM conservation for repeated keys, city names, status tags.");

        System.out.println("\n==========================================================================");
    }
}