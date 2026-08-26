/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 1: Math Methods: abs(), max(), min(), round(), ceil(), floor(), sqrt(), pow()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

public class MathMethodsCatalogDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: Math METHODS CATALOG - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Rounding & Bounds Methods:");
        System.out.println("  Math.abs(-45.8)   : " + Math.abs(-45.8) + " (Absolute distance from 0)");
        System.out.println("  Math.ceil(4.1)    : " + Math.ceil(4.1) + " (Rounds UP to nearest integer)");
        System.out.println("  Math.floor(4.9)   : " + Math.floor(4.9) + " (Rounds DOWN to nearest integer)");
        System.out.println("  Math.round(4.5)   : " + Math.round(4.5) + " (Standard round half-up)");

        System.out.println("\n>>> 2. Power & Roots:");
        System.out.println("  Math.pow(2, 8)    : " + Math.pow(2, 8) + " (2 to the power 8 = 256.0)");
        System.out.println("  Math.sqrt(144)    : " + Math.sqrt(144) + " (Square root = 12.0)");
        System.out.println("  Math.cbrt(27)     : " + Math.cbrt(27) + " (Cube root = 3.0)");

        System.out.println("\n>>> 3. Extremes & Trigonometry:");
        System.out.println("  Math.max(100, 250): " + Math.max(100, 250));
        System.out.println("  Math.min(100, 250): " + Math.min(100, 250));
        System.out.println("  Math.sin(Math.PI / 2) : " + Math.sin(Math.PI / 2) + " (sin(90 deg) = 1.0)");

        System.out.println("\n==========================================================================");
    }
}