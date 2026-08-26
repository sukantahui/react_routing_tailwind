/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 14: The Strategy Pattern - Interchangeable Algorithms
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

import java.util.function.DoubleUnaryOperator;

public class StrategyPatternDemo {

    // 1. Classic Strategy Interface (SAM / Functional Interface):
    @FunctionalInterface
    public interface DiscountStrategy {
        double applyDiscount(double rawAmount);
    }

    // 2. Context Class:
    public static class FeeCalculatorContext {
        private DiscountStrategy strategy;

        public FeeCalculatorContext(DiscountStrategy initialStrategy) {
            this.strategy = initialStrategy;
        }

        public void setStrategy(DiscountStrategy newStrategy) {
            this.strategy = newStrategy; // Swap algorithm at runtime!
        }

        public double calculateFinalFee(double rawFee) {
            return strategy.applyDiscount(rawFee);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: STRATEGY PATTERN & JAVA 8 LAMBDAS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double baseFee = 6000.0;
        FeeCalculatorContext context = new FeeCalculatorContext(raw -> raw); // No discount

        System.out.println("1. Standard Fee   : ₹" + context.calculateFinalFee(baseFee));

        // Swap to Early Bird 20% Discount Strategy:
        context.setStrategy(raw -> raw * 0.80);
        System.out.println("2. Early Bird 20% : ₹" + context.calculateFinalFee(baseFee));

        // Swap to Merit Scholarship 50% Discount Strategy:
        context.setStrategy(raw -> raw * 0.50);
        System.out.println("3. Merit 50% Disc : ₹" + context.calculateFinalFee(baseFee));

        System.out.println("\n==========================================================================");
    }
}
