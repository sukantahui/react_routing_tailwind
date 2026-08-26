/**
 * File: StringSwitchHashCodeDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 10)
 * Description: Demonstrates Java Switch with Strings (introduced in Java 7),
 *              internal two-stage bytecode compilation (hashCode() jump table + .equals() collision verification),
 *              hash collision handling ("FB" vs "Ea"), null selector NullPointerException behavior,
 *              and student payment gateway dispatching in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class StringSwitchHashCodeDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 SWITCH WITH STRINGS & HASHCODE INTERNALS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Basic String Switch: Payment Gateway Mode Processor
        System.out.println("--- 1. PAYMENT GATEWAY DISPATCH WITH STRINGS ---");
        processPaymentGateway("UPI", 15000.0);
        processPaymentGateway("NEFT", 22000.0);
        processPaymentGateway("NET_BANKING", 12000.0);
        processPaymentGateway("CASH_COUNTER", 5000.0);

        // 2. Hash Collision Demonstration ("FB" vs "Ea")
        System.out.println("\n--- 2. HASH COLLISION HANDLING IN STRING SWITCH ---");
        String s1 = "FB";
        String s2 = "Ea";
        System.out.printf("String \"%s\" hashCode: %d%n", s1, s1.hashCode());
        System.out.printf("String \"%s\" hashCode: %d%n", s2, s2.hashCode());
        System.out.printf("Are hashCodes identical? -> %b (Hash Collision!)%n", s1.hashCode() == s2.hashCode());

        System.out.println("\nTesting String Switch with Hash Colliding Keys:");
        testHashCollisionSwitch("FB");
        testHashCollisionSwitch("Ea");
        testHashCollisionSwitch("OTHER");

        // 3. Null Selector Handling (Defensive Pre-Check)
        System.out.println("\n--- 3. NULL SELECTOR HANDLING (NULLPOINTEREXCEPTION SAFETY) ---");
        safeStringSwitch(null);
        safeStringSwitch("JAVA");

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. String switch was introduced in Java 7 (Project Coin).");
        System.out.println("2. Bytecode compiles String switch into 2 stages: hashCode() jump + .equals() check.");
        System.out.println("3. Hash collisions are safely resolved by chaining .equals() checks within the hash bucket.");
        System.out.println("4. A 'null' string selector throws NullPointerException; always check for null before switching.");
        System.out.println("================================================================================");
    }

    private static void processPaymentGateway(String paymentMode, double amount) {
        System.out.printf("Payment Mode: %-14s | ", paymentMode);
        switch (paymentMode) {
            case "UPI":
                System.out.printf("Instant UPI Transfer Approved (Fee: ₹%,.2f)%n", amount);
                break;
            case "NEFT":
                System.out.printf("NEFT Settlement Initiated (Fee: ₹%,.2f)%n", amount);
                break;
            case "NET_BANKING":
                System.out.printf("Net Banking Portal Redirected (Fee: ₹%,.2f)%n", amount);
                break;
            default:
                System.out.printf("Direct Cash Voucher Receipt at Barrackpore Counter (₹%,.2f)%n", amount);
                break;
        }
    }

    private static void testHashCollisionSwitch(String input) {
        System.out.printf("Switching on: \"%-5s\" -> ", input);
        // Under the hood, Java checks hashCode 2236, then calls .equals("FB") and .equals("Ea"):
        switch (input) {
            case "FB":
                System.out.println("Matched [FB] case (Hash 2236 -> verified via .equals(\"FB\"))");
                break;
            case "Ea":
                System.out.println("Matched [Ea] case (Hash 2236 -> verified via .equals(\"Ea\"))");
                break;
            default:
                System.out.println("Default: Unmatched string");
                break;
        }
    }

    private static void safeStringSwitch(String courseCode) {
        // Defensive check to avoid NullPointerException:
        if (courseCode == null) {
            System.out.println("-> [GUARD CHECK]: courseCode is NULL! Aborting switch to prevent NPE.");
            return;
        }

        switch (courseCode) {
            case "JAVA" -> System.out.println("-> Enrolled in Java Core & DSA at Barrackpore.");
            case "PYTHON" -> System.out.println("-> Enrolled in Python Full Stack.");
            default -> System.out.println("-> General Consultation.");
        }
    }
}
