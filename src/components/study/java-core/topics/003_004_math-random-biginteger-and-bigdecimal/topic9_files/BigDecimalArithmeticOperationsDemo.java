/**
 * Java Core Tutorial - Module 003_004: Math, Random, BigInteger & BigDecimal
 * Topic 9: BigDecimal Arithmetic: add(), subtract(), multiply(), divide()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.math;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class BigDecimalArithmeticOperationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: BigDecimal ARITHMETIC OPERATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BigDecimal principal = new BigDecimal("100000.00");
        BigDecimal gstRate = new BigDecimal("0.18"); // 18% GST in Barrackpore
        BigDecimal discount = new BigDecimal("5000.00");

        // 1. Multiplication (GST calculation):
        BigDecimal gstAmount = principal.multiply(gstRate);
        System.out.println("  1. GST Amount (100000 * 0.18) : ₹" + gstAmount);

        // 2. Addition (Subtotal + GST):
        BigDecimal grossTotal = principal.add(gstAmount);
        System.out.println("  2. Gross Total (Principal+GST): ₹" + grossTotal);

        // 3. Subtraction (Applying Discount):
        BigDecimal finalPayable = grossTotal.subtract(discount);
        System.out.println("  3. Net Payable After Discount : ₹" + finalPayable);

        // 4. Division (Splitting into 3 monthly EMI installments):
        // CRITICAL: Division MUST specify Scale and RoundingMode to prevent ArithmeticException!
        BigDecimal emi = finalPayable.divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP);
        System.out.println("  4. Monthly EMI (Split in 3)   : ₹" + emi + " per month");

        System.out.println("\n>>> NOTE: Because BigDecimal is IMMUTABLE, every method returns a BRAND NEW instance!");

        System.out.println("\n==========================================================================");
    }
}