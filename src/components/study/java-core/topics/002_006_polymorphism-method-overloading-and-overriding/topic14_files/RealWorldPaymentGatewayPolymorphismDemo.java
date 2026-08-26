/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 14: Real-World Polymorphism: PaymentGateway Hierarchy (CreditCard, UPI, NetBanking)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class RealWorldPaymentGatewayPolymorphismDemo {

    public interface PaymentGateway {
        void processPayment(String traineeName, double amount);
    }

    public static class UpiPaymentGateway implements PaymentGateway {
        @Override
        public void processPayment(String traineeName, double amount) {
            System.out.printf("  [UPI GATEWAY] Processing ₹%.2f instant transfer for %s via VPA: %s@okaxis\n",
                    amount, traineeName, traineeName.toLowerCase().replace(" ", ""));
        }
    }

    public static class CreditCardGateway implements PaymentGateway {
        @Override
        public void processPayment(String traineeName, double amount) {
            double surcharge = amount * 0.015;
            System.out.printf("  [CARD GATEWAY] Processing ₹%.2f (Card fee: ₹%.2f) for %s via Visa/MasterCard 3D-Secure\n",
                    amount, surcharge, traineeName);
        }
    }

    public static class NetBankingGateway implements PaymentGateway {
        @Override
        public void processPayment(String traineeName, double amount) {
            System.out.printf("  [NETBANKING] Redirecting %s to HDFC / SBI Corporate Portal for ₹%.2f\n",
                    traineeName, amount);
        }
    }

    // Client Checkout Service (Completely agnostic of concrete gateway!)
    public static void executeAdmissionCheckout(PaymentGateway gateway, String trainee, double fee) {
        gateway.processPayment(trainee, fee); // Polymorphic dispatch!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: REAL-WORLD PAYMENT GATEWAY POLYMORPHISM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Swadeep Paul paying admission fee via UPI:");
        executeAdmissionCheckout(new UpiPaymentGateway(), "Swadeep Paul", 8000.0);

        System.out.println("\n>>> 2. Tuhina Das paying admission fee via Credit Card:");
        executeAdmissionCheckout(new CreditCardGateway(), "Tuhina Das", 12000.0);

        System.out.println("\n>>> 3. Debangshu Mukherjee paying admission fee via NetBanking:");
        executeAdmissionCheckout(new NetBankingGateway(), "Debangshu Mukherjee", 15000.0);

        System.out.println("\n==========================================================================");
    }
}