/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 12: Why 'Favor Composition Over Inheritance' Is a Premier Principle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class FavorCompositionOverInheritanceDemo {

    // Service 1: Payment Gateway Strategy
    public interface PaymentStrategy {
        void pay(double amount);
    }

    public static class UpiPayment implements PaymentStrategy {
        public void pay(double amount) {
            System.out.printf("  [UPI PAYMENT] Paid ₹%.2f via GPay/PhonePe to Barrackpore Hub.\n", amount);
        }
    }

    public static class NetBankingPayment implements PaymentStrategy {
        public void pay(double amount) {
            System.out.printf("  [NETBANKING] Paid ₹%.2f via HDFC/SBI Gateway.\n", amount);
        }
    }

    // Flexible Composed Class (Can swap payment strategy at runtime dynamically!)
    public static class StudentFeeCollector {
        private String studentName;
        private PaymentStrategy paymentStrategy; // HAS-A Composition!

        public StudentFeeCollector(String studentName, PaymentStrategy initialStrategy) {
            this.studentName = studentName;
            this.paymentStrategy = initialStrategy;
        }

        // Dynamic strategy swap at runtime! (Impossible with rigid compile-time inheritance)
        public void setPaymentStrategy(PaymentStrategy newStrategy) {
            this.paymentStrategy = newStrategy;
        }

        public void collectFee(double amount) {
            System.out.println("  Processing fee for: " + studentName);
            this.paymentStrategy.pay(amount);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: FAVOR COMPOSITION OVER INHERITANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Swadeep paying via UPI initially:");
        StudentFeeCollector collector = new StudentFeeCollector("Swadeep Paul", new UpiPayment());
        collector.collectFee(5000.0);

        System.out.println("\n>>> 2. Swapping strategy dynamically to NetBanking (Zero subclass changes!):");
        collector.setPaymentStrategy(new NetBankingPayment());
        collector.collectFee(10000.0);

        System.out.println("\n==========================================================================");
    }
}