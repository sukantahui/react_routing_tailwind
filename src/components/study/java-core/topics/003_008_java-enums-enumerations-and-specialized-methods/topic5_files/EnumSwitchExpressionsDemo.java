/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 5: Using Enums in Modern Switch Statements & Switch Expressions (Java 14+)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class EnumSwitchExpressionsDemo {

    public enum DeliveryStatus {
        ORDER_PLACED,
        PACKED,
        OUT_FOR_DELIVERY,
        DELIVERED,
        CANCELLED
    }

    // Modern Java 14+ Arrow Switch Expression:
    public static String getStatusBadge(DeliveryStatus status) {
        return switch (status) {
            case ORDER_PLACED    -> "Order Received at Barrackpore Warehouse";
            case PACKED          -> "Package Sealed & Invoiced";
            case OUT_FOR_DELIVERY-> "Courier Agent Dispatched (Naihati Route)";
            case DELIVERED       -> "Successfully Handed to Customer";
            case CANCELLED       -> "Order Terminated & Refund Issued";
            // NOTE: No 'default' branch needed if ALL enum cases are exhaustively covered!
        };
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ENUMS IN MODERN SWITCH EXPRESSIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Tracking Order Lifecycle via Exhaustive Switch Expression:");
        System.out.println("  Status 1: " + getStatusBadge(DeliveryStatus.ORDER_PLACED));
        System.out.println("  Status 2: " + getStatusBadge(DeliveryStatus.OUT_FOR_DELIVERY));
        System.out.println("  Status 3: " + getStatusBadge(DeliveryStatus.DELIVERED));

        System.out.println("\n>>> COMPILE-TIME EXHAUSTIVENESS:");
        System.out.println("  If you add a new constant 'RETURNED' to DeliveryStatus tomorrow,");
        System.out.println("  the Java compiler will automatically fail with a compile error until you handle it in your switch!");

        System.out.println("\n==========================================================================");
    }
}