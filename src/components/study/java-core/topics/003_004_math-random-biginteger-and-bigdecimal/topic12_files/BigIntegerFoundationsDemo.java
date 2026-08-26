/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 12: java.math.BigInteger: Arbitrary-Precision Integers for Cryptography
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigInteger;

public class BigIntegerFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: java.math.BigInteger FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Exceeding 64-bit Long Maximum Limit (Long.MAX_VALUE = 9,223,372,036,854,775,807):");

        // Storing a massive 50-digit number impossible for primitive types:
        BigInteger nationalDebt = new BigInteger("98765432109876543210987654321098765432109876543210");
        System.out.println("  Massive BigInteger : " + nationalDebt);
        System.out.println("  Bit Length         : " + nationalDebt.bitLength() + " bits");

        // 2. Exact Factorial of 50 (Massive number calculation):
        BigInteger fact = BigInteger.ONE;
        for (int i = 2; i <= 50; i++) {
            fact = fact.multiply(BigInteger.valueOf(i));
        }

        System.out.println("\n>>> 2. Exact Calculation of 50! (Factorial 50):");
        System.out.println("  50! = " + fact);

        System.out.println("\n>>> NOTE: BigInteger size is limited ONLY by available JVM Heap RAM!");

        System.out.println("\n==========================================================================");
    }
}