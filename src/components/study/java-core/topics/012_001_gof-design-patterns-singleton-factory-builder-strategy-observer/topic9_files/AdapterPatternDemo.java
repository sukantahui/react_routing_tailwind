/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 9: The Adapter Pattern - Interface Translation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class AdapterPatternDemo {

    // 1. Target Interface (What our modern application expects):
    public interface PaymentGateway {
        void processPayment(String customerId, double amountInRupees);
    }

    // 2. Adaptee (Legacy 3rd-party library with incompatible method & currency):
    public static class LegacyPayPalApi {
        public void makeUsdPayment(String email, double amountInUsd) {
            System.out.println("   [LEGACY PAYPAL]: Processed $" + amountInUsd + " for " + email);
        }
    }

    // 3. Adapter Class (Translates Target -> Adaptee):
    public static class PayPalPaymentAdapter implements PaymentGateway {
        private final LegacyPayPalApi legacyApi;
        private static final double USD_EXCHANGE_RATE = 86.5;

        public PayPalPaymentAdapter(LegacyPayPalApi api) {
            this.legacyApi = api;
        }

        @Override
        public void processPayment(String customerEmail, double amountInRupees) {
            // Translate INR to USD and forward call to legacy API:
            double amountInUsd = amountInRupees / USD_EXCHANGE_RATE;
            System.out.printf("   [ADAPTER]: Converting ₹%.2f to $%.2f%n", amountInRupees, amountInUsd);
            legacyApi.makeUsdPayment(customerEmail, amountInUsd);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ADAPTER DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        PaymentGateway gateway = new PayPalPaymentAdapter(new LegacyPayPalApi());
        gateway.processPayment("swadeep@coderaccotax.com", 4325.0);

        System.out.println("\n==========================================================================");
    }
}
