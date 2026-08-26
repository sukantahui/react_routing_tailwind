/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 8: Variable Capture / Closures: Capturing Local Variables & 'Effectively Final'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.Function;

public class VariableCaptureEffectivelyFinalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: VARIABLE CAPTURE & EFFECTIVELY FINAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Local variable in enclosing method:
        double taxExemptionThreshold = 250000.0; // NOT declared final, but never re-assigned!

        // 2. Variable Capture inside Lambda (Closure):
        Function<Double, Double> taxableIncomeCalculator = annualIncome -> {
            // 'taxExemptionThreshold' is CAPTURED by value into the lambda:
            if (annualIncome > taxExemptionThreshold) {
                return annualIncome - taxExemptionThreshold;
            }
            return 0.0;
        };

        // If you uncomment the line below, compiler triggers an error in the lambda:
        // taxExemptionThreshold = 300000.0; // COMPILE ERROR: Local variable referenced from a lambda expression must be final or effectively final!

        double income = 650000.0;
        System.out.printf(">>> Annual Income: ₹%,.2f | Taxable Income: ₹%,.2f%n",
                income, taxableIncomeCalculator.apply(income));

        System.out.println("\n>>> WHAT DOES 'EFFECTIVELY FINAL' MEAN?");
        System.out.println("  - A variable is 'Effectively Final' if its value is assigned ONCE and NEVER modified afterwards, even if the 'final' keyword is omitted.");
        System.out.println("  - Java 8 allows omitting the 'final' modifier for cleaner syntax, but still enforces compile-time immutability!");

        System.out.println("\n==========================================================================");
    }
}