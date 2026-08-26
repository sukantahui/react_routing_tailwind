/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 11: Exhaustiveness Checking in Switch Expressions with Sealed Classes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

public class ExhaustivenessCheckingSwitchDemo {

    // Sealed hierarchy: Only 3 permitted subtypes
    public sealed interface PaymentStatus permits Pending, Successful, Failed {}

    public record Pending(String transactionRef, long initiatedEpoch) implements PaymentStatus {}
    public record Successful(String transactionRef, String authCode, double amount) implements PaymentStatus {}
    public record Failed(String transactionRef, String errorCode, String reason) implements PaymentStatus {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: EXHAUSTIVENESS CHECKING WITH SEALED TYPES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PaymentStatus status1 = new Successful("TXN-101", "AUTH-9942", 4500.0);
        PaymentStatus status2 = new Failed("TXN-102", "ERR-INSUFFICIENT-FUNDS", "Declined by bank");
        PaymentStatus status3 = new Pending("TXN-103", System.currentTimeMillis());

        System.out.println("1. " + generateUserAlert(status1));
        System.out.println("2. " + generateUserAlert(status2));
        System.out.println("3. " + generateUserAlert(status3));

        System.out.println("\n>>> THE POWER OF EXHAUSTIVENESS:");
        System.out.println("  - Notice there is NO 'default' branch in generateUserAlert()!");
        System.out.println("  - The compiler proves all 3 subtypes (Pending, Successful, Failed) are covered.");
        System.out.println("==========================================================================");
    }

    // Modern Exhaustive Switch Expression: NO 'default' needed!
    static String generateUserAlert(PaymentStatus status) {
        return switch (status) {
            case Successful s -> "✅ Payment of ₹" + s.amount() + " confirmed (Auth: " + s.authCode() + ")";
            case Failed f     -> "❌ Payment failed [" + f.errorCode() + "]: " + f.reason();
            case Pending p    -> "⏳ Payment " + p.transactionRef() + " is currently processing...";
            // If someone adds 'case Refunded' to PaymentStatus, this file WILL NOT COMPILE
            // until 'case Refunded' is explicitly handled here!
        };
    }
}
