/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 6: Sealed Classes & Interfaces (Java 17+ Standard - JEP 409)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class SealedClassesJep409Demo {

    // Sealed Interface: Permitted subclasses explicitly declared
    public sealed interface PaymentMethod permits UpiPayment, CardPayment, NetBankingPayment {}

    public static final class UpiPayment implements PaymentMethod {
        private final String upiId;
        public UpiPayment(String upiId) { this.upiId = upiId; }
        public String getUpiId() { return upiId; }
    }

    public static final class CardPayment implements PaymentMethod {
        private final String last4Digits;
        public CardPayment(String last4Digits) { this.last4Digits = last4Digits; }
        public String getLast4Digits() { return last4Digits; }
    }

    public static final class NetBankingPayment implements PaymentMethod {
        private final String bankCode;
        public NetBankingPayment(String bankCode) { this.bankCode = bankCode; }
        public String getBankCode() { return bankCode; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: SEALED CLASSES (JEP 409) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        PaymentMethod p1 = new UpiPayment("swadeep@upi");
        PaymentMethod p2 = new CardPayment("4421");

        System.out.println("1. Created Permitted Payment Instances:");
        System.out.println("   - UPI Payment  : " + p1.getClass().getSimpleName());
        System.out.println("   - Card Payment : " + p2.getClass().getSimpleName());

        System.out.println("\n>>> WHY SEALED CLASSES ARE REVOLUTIONARY:");
        System.out.println("  1. Domain Integrity: Prevents unauthorized external subclasses from breaking invariants.");
        System.out.println("  2. Exhaustiveness: Enables the compiler to verify all cases in switch expressions!");
        System.out.println("==========================================================================");
    }
}
