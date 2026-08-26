/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 2: Exact Arithmetic with Overflow Detection: Math.addExact(), multiplyExact() (Java 8+)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

public class ExactArithmeticOverflowDetectionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: EXACT ARITHMETIC OVERFLOW DETECTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int max = Integer.MAX_VALUE; // 2,147,483,647

        // 1. STANDARD JAVA ARITHMETIC (SILENT WRAPAROUND DISASTER):
        int silentOverflow = max + 1;
        System.out.println(">>> 1. Standard Arithmetic with '+':");
        System.out.println("  Integer.MAX_VALUE + 1 = " + silentOverflow + " (SILENT WRAPAROUND TO NEGATIVE!)");

        // 2. JAVA 8+ EXACT ARITHMETIC (Throws ArithmeticException on Overflow):
        System.out.println("\n>>> 2. Java 8+ Math.addExact():");
        try {
            int safeResult = Math.addExact(max, 1);
            System.out.println("  Result: " + safeResult);
        } catch (ArithmeticException e) {
            System.out.println("  [PROTECTION DETECTED] ArithmeticException: " + e.getMessage());
            System.out.println("  Explanation: Math.addExact prevented silent financial corruption!");
        }

        System.out.println("\n>>> 3. Other Java 8+ Exact Arithmetic Methods:");
        System.out.println("  - Math.subtractExact(a, b)");
        System.out.println("  - Math.multiplyExact(a, b)");
        System.out.println("  - Math.incrementExact(a)");
        System.out.println("  - Math.decrementExact(a)");
        System.out.println("  - Math.negateExact(a)");
        System.out.println("  - Math.toIntExact(longVal) (Safely converts long to int or throws)");

        System.out.println("\n==========================================================================");
    }
}