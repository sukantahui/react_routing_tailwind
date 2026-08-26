/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 1: Anatomy of a Lambda Expression: (parameters) -> { body }
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

@FunctionalInterface
interface TaxCalculator {
    double calculate(double amount, double ratePercent);
}

public class LambdaExpressionAnatomyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: ANATOMY OF A LAMBDA EXPRESSION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 COMPONENTS OF A LAMBDA EXPRESSION:");
        System.out.println("  (parameters)       ->                { body }");
        System.out.println("  [Argument List] [Arrow Token] [Action Code / Expression]");
        System.out.println();

        // Standard explicit full syntax lambda:
        TaxCalculator gstCalculator = (double amount, double ratePercent) -> {
            double totalTax = (amount * ratePercent) / 100.0;
            return totalTax;
        };

        double calculatedGst = gstCalculator.calculate(50000.0, 18.0);
        System.out.printf(">>> Calculated 18%% GST on ₹50,000: ₹%,.2f%n", calculatedGst);

        System.out.println("\n>>> ANATOMY BREAKDOWN:");
        System.out.println("  1. Parameters  : '(double amount, double ratePercent)' matching the Functional Interface parameters.");
        System.out.println("  2. Arrow Token : '->' (Separates parameter list from executable body).");
        System.out.println("  3. Body Block  : '{ ... }' contains the method logic returning a double value.");

        System.out.println("\n==========================================================================");
    }
}