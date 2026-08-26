/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 0: The java.lang.Math Utility Class: Constants (PI, E) & Pure Static Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

public class MathClassOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.lang.Math ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Architecture of java.lang.Math:");
        System.out.println("  - Marked 'public final class Math' (Cannot be extended).");
        System.out.println("  - Private constructor 'private Math() {}' (Cannot be instantiated with 'new').");
        System.out.println("  - 100% of methods and constants are static!");

        System.out.println("\n>>> 2. Fundamental Mathematical Constants:");
        System.out.println("  Math.PI : " + Math.PI + " (Ratio of circumference to diameter)");
        System.out.println("  Math.E  : " + Math.E + " (Euler's number base of natural logs)");

        // Calculating circle area:
        double radius = 7.0; // In meters
        double area = Math.PI * radius * radius;
        System.out.printf("\n>>> 3. Circle Area (r=%.1f m) = %.4f sq.m%n", radius, area);

        System.out.println("\n==========================================================================");
    }
}