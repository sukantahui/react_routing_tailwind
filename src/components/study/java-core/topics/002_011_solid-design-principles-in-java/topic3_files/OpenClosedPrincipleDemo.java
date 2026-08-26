/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 3: O - Open/Closed Principle (OCP): 'Open for Extension, Closed for Modification'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class OpenClosedPrincipleDemo {

    // ANTI-PATTERN: Every time a new discount is introduced, we must MODIFY this existing class!
    // public double calculateDiscount(String type, double amount) {
    //     if (type.equals("STUDENT")) return amount * 0.20;
    //     else if (type.equals("EARLY_BIRD")) return amount * 0.10;
    //     // Modifying existing tested production code violates OCP!
    // }

    // OCP COMPLIANT: 1. Stable Abstraction (Closed for Modification)
    public interface DiscountStrategy {
        double applyDiscount(double baseFee);
    }

    // 2. Extensions (Open for Extension)
    public static class StudentDiscount implements DiscountStrategy {
        public double applyDiscount(double baseFee) { return baseFee * 0.80; } // 20% off
    }

    public static class EarlyBirdDiscount implements DiscountStrategy {
        public double applyDiscount(double baseFee) { return baseFee * 0.90; } // 10% off
    }

    // Adding NEW Corporate Discount requires ZERO modifications to existing code!
    public static class CorporateDiscount implements DiscountStrategy {
        public double applyDiscount(double baseFee) { return baseFee * 0.70; } // 30% off
    }

    public static class AcademyFeeCalculator {
        public double calculateFinalFee(double baseFee, DiscountStrategy strategy) {
            return strategy.applyDiscount(baseFee); // Polymorphic dispatch!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: OPEN / CLOSED PRINCIPLE (OCP) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyFeeCalculator calculator = new AcademyFeeCalculator();
        double baseFee = 20000.0;

        System.out.println("  Student Fee   : ₹" + calculator.calculateFinalFee(baseFee, new StudentDiscount()));
        System.out.println("  Corporate Fee : ₹" + calculator.calculateFinalFee(baseFee, new CorporateDiscount()));

        System.out.println("\n>>> OCP Rule: You should be able to add new behavior without editing existing tested classes.");

        System.out.println("\n==========================================================================");
    }
}