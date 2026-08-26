/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 9: Java 8 Evolution: 'static' Methods in Interfaces
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class StaticMethodsInInterfacesDemo {

    public interface FeeValidator {
        // Static Utility Method inside Interface (Java 8+)
        // Provides cohesive utility logic directly on the Interface namespace!
        static boolean isValidAdmissionFee(double amount) {
            return amount >= 5000.0 && amount <= 100000.0;
        }

        static String formatFeeInINR(double amount) {
            return String.format("₹%,.2f", amount);
        }
    }

    public static class FeePaymentProcessor implements FeeValidator {
        // Note: Static interface methods are NOT inherited by implementing classes!
        // You CANNOT call 'FeePaymentProcessor.isValidAdmissionFee()' or 'processorInstance.isValidAdmissionFee()'
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: STATIC METHODS IN INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double testFee = 15000.0;

        // INVOCATION RULE: MUST be invoked ONLY using InterfaceName.staticMethodName()
        boolean valid = FeeValidator.isValidAdmissionFee(testFee);
        String formatted = FeeValidator.formatFeeInINR(testFee);

        System.out.printf("  Fee: %s | Is Valid Admission Fee? %s\n", formatted, valid);

        System.out.println("\n>>> Key Static Interface Method Rule:");
        System.out.println("  - Static interface methods are NOT part of the implementing class API.");
        System.out.println("  - They belong STRICTLY to the Interface itself (Cannot be overridden/hidden).");

        System.out.println("\n==========================================================================");
    }
}