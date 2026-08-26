/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 5: The IEEE 754 Floating-Point Precision Dilemma (Why 0.1 + 0.2 = 0.30000000000000004)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

public class IeeeFloatingPointDilemmaDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE IEEE 754 PRECISION DILEMMA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double a = 0.1;
        double b = 0.2;
        double sum = a + b;

        System.out.println(">>> 1. Adding 0.1 + 0.2 in standard 64-bit IEEE 754 double precision:");
        System.out.println("  Expected Math Result : 0.3");
        System.out.println("  Actual Java Output   : " + sum);
        System.out.println("  Is (0.1 + 0.2 == 0.3)? " + (sum == 0.3) + " (FALSE!)");

        System.out.println("\n>>> 2. Why Does This Happen?");
        System.out.println("  - Computers store numbers in Base 2 (Binary 0 and 1).");
        System.out.println("  - Just like 1/3 cannot be represented finitely in Base 10 (0.333333...),");
        System.out.println("    0.1 (1/10) and 0.2 (1/5) have INFINITELY REPEATING binary expansions in Base 2!");
        System.out.println("  - IEEE 754 truncates the binary stream at 53 mantissa bits, introducing roundoff error.");

        System.out.println("\n==========================================================================");
    }
}