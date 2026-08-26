/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 4: Cryptographically Secure Random: java.security.SecureRandom (OTPs, Tokens, Salt)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.security.SecureRandom;
import java.util.Base64;

public class SecureRandomSecurityMasteryDemo {

    public static String generateOtp(int length) {
        SecureRandom sr = new SecureRandom();
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            otp.append(sr.nextInt(10)); // Digits 0-9
        }
        return otp.toString();
    }

    public static String generateSecurityToken(int byteLength) {
        SecureRandom sr = new SecureRandom();
        byte[] salt = new byte[byteLength];
        sr.nextBytes(salt); // Fills buffer with OS entropy randomness
        return Base64.getUrlEncoder().withoutPadding().encodeToString(salt);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CRYPTOGRAPHICALLY SECURE RANDOM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Generating 6-Digit Banking OTP for Barrackpore Auth:");
        String otp = generateOtp(6);
        System.out.println("  Secure 6-Digit OTP: " + otp);

        System.out.println("\n>>> 2. Generating 32-Byte Cryptographic Session Token / Salt:");
        String sessionToken = generateSecurityToken(32);
        System.out.println("  Session Token (Base64): " + sessionToken);

        System.out.println("\n>>> WHY SecureRandom IS MANDATORY FOR SECURITY:");
        System.out.println("  - java.util.Random uses a simple Linear Congruential Formula (predictable after 2 numbers!).");
        System.out.println("  - SecureRandom collects OS hardware entropy (/dev/urandom or Windows CryptoAPI).");

        System.out.println("\n==========================================================================");
    }
}