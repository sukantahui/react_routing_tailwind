/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 4: Static Methods: Purpose, Syntax & Utility Class Design
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticMethodsUtilityDesignDemo {

    // Utility Toolkit for Academy Calculations
    public static final class AcademyFinanceUtil {
        // Private Constructor prevents instantiation
        private AcademyFinanceUtil() {}

        public static double computeGst(double amount) {
            return amount * 0.18;
        }

        public static double calculateDiscountedFee(double grossFee, double discountPercent) {
            return grossFee - (grossFee * (discountPercent / 100.0));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: STATIC METHODS & UTILITY DESIGN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double originalFee = 10000.0;
        double discounted = AcademyFinanceUtil.calculateDiscountedFee(originalFee, 20.0);
        double gst = AcademyFinanceUtil.computeGst(discounted);
        double finalTotal = discounted + gst;

        System.out.printf("  Original Fee : ₹%.2f\n", originalFee);
        System.out.printf("  Discount (20%%): ₹%.2f\n", discounted);
        System.out.printf("  GST (18%%)    : ₹%.2f\n", gst);
        System.out.printf("  Final Payable: ₹%.2f\n", finalTotal);

        System.out.println("\n==========================================================================");
    }
}