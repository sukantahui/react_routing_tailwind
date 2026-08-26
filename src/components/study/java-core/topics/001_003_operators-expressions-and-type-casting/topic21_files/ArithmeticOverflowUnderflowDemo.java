/**
 * File: ArithmeticOverflowUnderflowDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 21)
 * Description: Demonstrates detecting and preventing Java arithmetic overflow and underflow,
 *              silent two's complement wrap-arounds (Integer.MAX_VALUE + 1 -> MIN_VALUE),
 *              Java 8+ Math.*Exact() methods (addExact, multiplyExact, toIntExact),
 *              arbitrary precision with BigInteger & BigDecimal,
 *              and enterprise financial balance audits in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

import java.math.BigDecimal;
import java.math.BigInteger;

public class ArithmeticOverflowUnderflowDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 21 ARITHMETIC OVERFLOW & UNDERFLOW");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Silent Two's Complement Integer Overflow & Underflow
        System.out.println("--- 1. SILENT INTEGER OVERFLOW & UNDERFLOW ---");
        int maxInt = Integer.MAX_VALUE; // 2,147,483,647
        int minInt = Integer.MIN_VALUE; // -2,147,483,648

        int overflowedInt = maxInt + 1;  // Silently wraps around to -2,147,483,648!
        int underflowedInt = minInt - 1; // Silently wraps around to 2,147,483,647!

        System.out.printf("Integer.MAX_VALUE     : %,d%n", maxInt);
        System.out.printf("maxInt + 1 (Overflow) : %,d [⚠️ SILENT WRAP-AROUND TO MIN_VALUE!]%n", overflowedInt);
        System.out.printf("Integer.MIN_VALUE     : %,d%n", minInt);
        System.out.printf("minInt - 1 (Underflow): %,d [⚠️ SILENT WRAP-AROUND TO MAX_VALUE!]%n%n", underflowedInt);

        // 2. Java 8+ Safe Exact Arithmetic (Math.addExact, multiplyExact, toIntExact)
        System.out.println("--- 2. JAVA 8+ MATH.*EXACT() DEFENSIVE ARITHMETIC ---");
        try {
            System.out.println("Attempting 'Math.addExact(Integer.MAX_VALUE, 1)'...");
            int safeAdd = Math.addExact(maxInt, 1);
        } catch (ArithmeticException e) {
            System.out.printf("✓ Caught ArithmeticException: %s%n", e.getMessage());
        }

        try {
            System.out.println("Attempting 'Math.multiplyExact(1_000_000, 3_000)'...");
            int safeMul = Math.multiplyExact(1_000_000, 3_000); // 3 Billion > Integer.MAX_VALUE
        } catch (ArithmeticException e) {
            System.out.printf("✓ Caught ArithmeticException: %s%n", e.getMessage());
        }

        try {
            long largeLong = 3_000_000_000L;
            System.out.println("Attempting 'Math.toIntExact(3_000_000_000L)'...");
            int safeInt = Math.toIntExact(largeLong);
        } catch (ArithmeticException e) {
            System.out.printf("✓ Caught ArithmeticException: %s%n%n", e.getMessage());
        }

        // 3. Upcasting to Long Before Arithmetic (Pattern 2)
        System.out.println("--- 3. UPCASTING TO LONG TO PREVENT OVERFLOW ---");
        int countA = 1_500_000_000;
        int countB = 1_000_000_000;

        // DANGEROUS: countA + countB overflows in int before being assigned to long!
        long flawedTotal = countA + countB; // Overflows to -1794967296!
        // SAFE: Cast at least one operand to long before addition:
        long safeTotal = (long) countA + countB; // 2,500,000,000L

        System.out.printf("Flawed Addition '(countA + countB)'      : %,d (Corrupted!)%n", flawedTotal);
        System.out.printf("Safe Upcasted '((long) countA + countB)' : %,d (Correct!)%n%n", safeTotal);

        // 4. Enterprise Arbitrary Precision: BigInteger & BigDecimal
        System.out.println("--- 4. ENTERPRISE ARBITRARY PRECISION (BIGINTEGER & BIGDECIMAL) ---");
        BigInteger bigA = new BigInteger("9223372036854775807"); // Long.MAX_VALUE
        BigInteger bigB = new BigInteger("10000000000000000000000");
        BigInteger bigSum = bigA.add(bigB);
        System.out.printf("BigInteger Sum: %s (Immune to 64-bit limits)%n", bigSum);

        BigDecimal exactRupeePrice = new BigDecimal("15000.75");
        BigDecimal exactTax = new BigDecimal("2700.135");
        BigDecimal totalPayable = exactRupeePrice.add(exactTax);
        System.out.printf("BigDecimal Exact Fee + Tax: ₹%s (Zero floating-point loss)%n%n", totalPayable);

        // 5. Real-World Student Institutional Ledger Audit (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE ENTERPRISE LEDGER OVERFLOW AUDIT ---");
        auditInstitutionEndowment("Barrackpore Campus", 1_800_000_000L, 500_000_000L);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Standard Java primitive integer arithmetic SILENTLY wraps around upon overflow.");
        System.out.println("2. Use Java 8+ 'Math.*Exact()' methods (addExact, multiplyExact, toIntExact) for crash-safe math.");
        System.out.println("3. Always upcast operands to 'long' BEFORE addition/multiplication if values can exceed 2 Billion.");
        System.out.println("4. Use 'BigInteger' and 'BigDecimal' for mission-critical enterprise financial calculations.");
        System.out.println("================================================================================");
    }

    private static void auditInstitutionEndowment(String branchName, long currentFunds, long donationAmount) {
        try {
            long totalFunds = Math.addExact(currentFunds, donationAmount);
            System.out.printf("Branch: %-20s | Current: ₹%,d | Donation: ₹%,d | Total: ₹%,d [✓ SAFE]%n",
                    branchName, currentFunds, donationAmount, totalFunds);
        } catch (ArithmeticException e) {
            System.out.printf("Branch: %-20s | [⚠️ CRITICAL: 64-bit Long Overflow Detected!]%n", branchName);
        }
    }
}
