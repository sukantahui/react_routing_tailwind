/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 7: java.math.BigDecimal: Arbitrary-Precision Signed Decimals for Enterprise Finance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigDecimal;

public class BigDecimalArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: java.math.BigDecimal ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Internal Anatomy of a BigDecimal Object:");
        System.out.println("  - An unscaled integer value: BigInteger 'intVal'");
        System.out.println("  - A 32-bit integer scale   : int 'scale' (Number of digits to the right of the decimal point)");
        System.out.println("  - Formula: value = unscaledValue * 10^(-scale)");

        // Example: 123.456
        BigDecimal amount = new BigDecimal("123.456");

        System.out.println("\n>>> 2. Inspecting BigDecimal("123.456"):");
        System.out.println("  Value              : " + amount);
        System.out.println("  Unscaled BigInteger: " + amount.unscaledValue() + " (123456)");
        System.out.println("  Scale (Decimals)   : " + amount.scale() + " digits");
        System.out.println("  Precision (Digits) : " + amount.precision() + " total significant digits");

        // Solving the 0.1 + 0.2 problem with BigDecimal:
        BigDecimal b1 = new BigDecimal("0.1");
        BigDecimal b2 = new BigDecimal("0.2");
        BigDecimal result = b1.add(b2);

        System.out.println("\n>>> 3. Solving the 0.1 + 0.2 problem:");
        System.out.println("  0.1 + 0.2 via BigDecimal = " + result + " (100% Mathematically Exact!)");

        System.out.println("\n==========================================================================");
    }
}