/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 5: Financial Accuracy - 100% BigDecimal & RoundingMode
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class FinancialAccuracyBigDecimalDemo {

    public static BigDecimal calculateAccruedInterest(BigDecimal principal, BigDecimal annualRatePct, int days) {
        // Daily rate = annualRate / 100 / 365
        BigDecimal rateFraction = annualRatePct.divide(new BigDecimal("100"), 10, RoundingMode.HALF_EVEN);
        BigDecimal dailyRate = rateFraction.divide(new BigDecimal("365"), 10, RoundingMode.HALF_EVEN);

        BigDecimal totalInterest = principal.multiply(dailyRate).multiply(BigDecimal.valueOf(days));

        // Scale to 2 currency decimals using Banker's Rounding (HALF_EVEN):
        return totalInterest.setScale(2, RoundingMode.HALF_EVEN);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: FINANCIAL ACCURACY & BIGDECIMAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BigDecimal principal = new BigDecimal("150000.00");
        BigDecimal interestRate = new BigDecimal("7.25"); // 7.25% p.a.
        int days = 90;

        BigDecimal interest = calculateAccruedInterest(principal, interestRate, days);
        System.out.println("Principal Amount   : ₹" + principal);
        System.out.println("Annual Rate        : " + interestRate + "%");
        System.out.println("Accrued 90-Day Int : ₹" + interest);

        System.out.println("\n==========================================================================");
    }
}
