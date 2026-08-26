/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 11: Effectively Final Rule (Java 8+): Variable Capture in Inner & Anonymous Closures
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

interface DiscountPolicy {
    double applyDiscount(double price);
}

public class EffectivelyFinalClosureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: EFFECTIVELY FINAL VARIABLE CAPTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. In Java 7: local variables captured by inner classes HAD to be explicitly declared 'final':
        final double flatDiscount = 500.0;

        // 2. In Java 8+: 'final' keyword is optional if the variable is EFFECTIVELY FINAL (never reassigned):
        double festivalBonusDiscount = 250.0; // Effectively final!

        DiscountPolicy diwaliPolicy = new DiscountPolicy() {
            @Override
            public double applyDiscount(double price) {
                // Capturing flatDiscount and festivalBonusDiscount into closure:
                return price - flatDiscount - festivalBonusDiscount;
            }
        };

        // IF WE REASSIGN festivalBonusDiscount LATER:
        // festivalBonusDiscount = 300.0;
        // COMPILE ERROR: "Local variable referenced from an inner class must be final or effectively final"!

        double originalFee = 5000.0;
        double discountedFee = diwaliPolicy.applyDiscount(originalFee);

        System.out.println(">>> 1. Fee Calculation with Captured Closure Variables:");
        System.out.println("  Original Admission Fee: " + originalFee + " INR");
        System.out.println("  Flat Discount (final) : " + flatDiscount + " INR");
        System.out.println("  Festival (Eff. Final) : " + festivalBonusDiscount + " INR");
        System.out.println("  Final Payable Fee     : " + discountedFee + " INR");

        System.out.println("\n>>> WHY THE RULE EXISTS:");
        System.out.println("  When an inner class captures a local variable, it makes a PRIVATE COPY on the heap.");
        System.out.println("  If the variable were mutable, the copy and the stack variable would fall out of sync!");

        System.out.println("\n==========================================================================");
    }
}