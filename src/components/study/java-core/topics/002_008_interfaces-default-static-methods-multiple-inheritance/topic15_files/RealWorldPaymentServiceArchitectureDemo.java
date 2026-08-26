/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 15: Real-World Architecture: PaymentService Depending on PaymentGateway Interface
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class RealWorldPaymentServiceArchitectureDemo {

    public interface PaymentGateway {
        boolean processTransaction(String traineeName, double amount);
        String getProviderName();
    }

    public static class RazorpayGateway implements PaymentGateway {
        public boolean processTransaction(String trainee, double amount) {
            System.out.printf("  [RAZORPAY] Charging ₹%.2f to %s via UPI/QR Gateway.\n", amount, trainee);
            return true;
        }
        public String getProviderName() { return "Razorpay India"; }
    }

    public static class StripeGlobalGateway implements PaymentGateway {
        public boolean processTransaction(String trainee, double amount) {
            System.out.printf("  [STRIPE] Charging $%.2f equivalent to %s via International Card.\n", (amount / 86.0), trainee);
            return true;
        }
        public String getProviderName() { return "Stripe Global"; }
    }

    public static class AcademyFeeManagementService {
        private PaymentGateway gateway;

        public AcademyFeeManagementService(PaymentGateway gateway) {
            this.gateway = gateway;
        }

        public void collectFee(String trainee, double amount) {
            System.out.println("  Initiating fee payment using: " + gateway.getProviderName());
            boolean success = gateway.processTransaction(trainee, amount);
            if (success) {
                System.out.println("  [FEE AUDIT] Payment receipt registered in Barrackpore Accounts Ledger.
");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: REAL-WORLD PAYMENT GATEWAY ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyFeeManagementService domesticFee = new AcademyFeeManagementService(new RazorpayGateway());
        domesticFee.collectFee("Swadeep Paul", 15000.0);

        AcademyFeeManagementService internationalFee = new AcademyFeeManagementService(new StripeGlobalGateway());
        internationalFee.collectFee("Abhronila Das", 25000.0);

        System.out.println("==========================================================================");
    }
}