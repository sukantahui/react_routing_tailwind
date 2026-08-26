/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 13: BigInteger Cryptographic Operations: modPow, isProbablePrime, gcd (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigInteger;
import java.security.SecureRandom;

public class BigIntegerCryptoAndGcdCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: BigInteger CRYPTO & MATH OPERATIONS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Greatest Common Divisor (GCD / HCF):
        BigInteger num1 = new BigInteger("1071");
        BigInteger num2 = new BigInteger("462");
        BigInteger gcd = num1.gcd(num2);
        System.out.println(">>> 1. Euclidean GCD (1071, 462) = " + gcd + " (HCF)");

        // 2. Generating Cryptographic 512-bit Probable Prime for RSA Keys:
        SecureRandom sr = new SecureRandom();
        BigInteger primeCandidate = BigInteger.probablePrime(512, sr);
        System.out.println("\n>>> 2. Generated 512-bit RSA Probable Prime:");
        System.out.println("  Prime: " + primeCandidate);
        System.out.println("  isProbablePrime(100 certainty)? " + primeCandidate.isProbablePrime(100));

        // 3. Modular Exponentiation: (base^exponent) mod modulus (Core of RSA Encryption):
        BigInteger base = new BigInteger("65");
        BigInteger exp = new BigInteger("17");
        BigInteger mod = new BigInteger("3233");
        BigInteger cipher = base.modPow(exp, mod);

        System.out.println("\n>>> 3. Modular Exponentiation: modPow(65^17 mod 3233):");
        System.out.println("  Cipher Output: " + cipher + " (Calculated via fast Montgomery squaring)");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_004 MATH, RANDOM & BIGDECIMAL 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}