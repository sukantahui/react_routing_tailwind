/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 1: Compile-Time Polymorphism (Static Binding / Early Binding): Method Overloading
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class CompileTimeOverloadingDemo {

    public static class FeeCalculator {
        // Overloaded Method 1: Base course fee
        public double calculateFee(double baseFee) {
            return baseFee;
        }

        // Overloaded Method 2: Base fee with percentage scholarship
        public double calculateFee(double baseFee, double scholarshipPercent) {
            return baseFee - (baseFee * (scholarshipPercent / 100.0));
        }

        // Overloaded Method 3: Base fee with scholarship and special hub discount
        public double calculateFee(double baseFee, double scholarshipPercent, double hubDiscountFlat) {
            double discounted = baseFee - (baseFee * (scholarshipPercent / 100.0));
            return discounted - hubDiscountFlat;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: COMPILE-TIME POLYMORPHISM (OVERLOADING) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FeeCalculator calc = new FeeCalculator();

        // 1. Resolved at COMPILE TIME via argument types:
        System.out.println("  1-Arg Call: ₹" + calc.calculateFee(12000.0));
        System.out.println("  2-Arg Call: ₹" + calc.calculateFee(12000.0, 25.0));
        System.out.println("  3-Arg Call: ₹" + calc.calculateFee(12000.0, 25.0, 1500.0));

        System.out.println("\n>>> Why it is called Compile-Time / Early Binding:");
        System.out.println("  - Javac determines the EXACT method descriptor to invoke during compilation.");
        System.out.println("  - Zero runtime lookup overhead!");

        System.out.println("\n==========================================================================");
    }
}