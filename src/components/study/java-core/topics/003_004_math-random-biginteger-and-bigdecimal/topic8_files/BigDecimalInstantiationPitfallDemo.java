/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 8: BigDecimal Instantiation: String Constructor vs why new BigDecimal(double) is Fatal
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigDecimal;

public class BigDecimalInstantiationPitfallDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: BigDecimal INSTANTIATION PITFALL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. FATAL BAD PRACTICE: Using double constructor:
        BigDecimal fatal = new BigDecimal(0.1);
        System.out.println(">>> 1. FATAL TRAP: new BigDecimal(0.1) using double constructor:");
        System.out.println("  Result: " + fatal);
        System.out.println("  Explanation: 0.1 was ALREADY corrupted by IEEE 754 before reaching BigDecimal!");

        // 2. BEST PRACTICE 1: Using String constructor:
        BigDecimal exact1 = new BigDecimal("0.1");
        System.out.println("\n>>> 2. BEST PRACTICE 1: new BigDecimal("0.1") using String constructor:");
        System.out.println("  Result: " + exact1 + " (100% Exact!)");

        // 3. BEST PRACTICE 2: Using BigDecimal.valueOf(double):
        // valueOf(double) converts double to String using Double.toString(d) internally!
        BigDecimal exact2 = BigDecimal.valueOf(0.1);
        System.out.println("\n>>> 3. BEST PRACTICE 2: BigDecimal.valueOf(0.1):");
        System.out.println("  Result: " + exact2 + " (Uses Double.toString() under the hood!)");

        System.out.println("\n>>> GOLDEN RULE: ALWAYS use 'new BigDecimal("string")' or 'BigDecimal.valueOf(double)'!");

        System.out.println("\n==========================================================================");
    }
}