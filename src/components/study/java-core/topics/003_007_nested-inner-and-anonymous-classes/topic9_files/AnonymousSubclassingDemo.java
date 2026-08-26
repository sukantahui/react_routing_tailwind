/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 9: Anonymous Classes: Implementing Interfaces vs Extending Abstract Classes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

abstract class TaxCalculator {
    protected double taxRate = 0.18; // 18% GST base
    public abstract double calculateTax(double amount);
}

public class AnonymousSubclassingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ANONYMOUS INTERFACES vs ABSTRACT CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Extending Abstract Class Anonymously (Can access abstract class state):
        TaxCalculator luxuryGstCalculator = new TaxCalculator() {
            @Override
            public double calculateTax(double amount) {
                // Modifying behavior by applying 28% Luxury GST rate:
                return amount * 0.28;
            }
        };

        // 2. Extending Concrete Class Anonymously (Method overriding on the fly):
        Object customToString = new Object() {
            @Override
            public String toString() {
                return "Custom Anonymous Object generated at Barrackpore Hub!";
            }
        };

        double invoiceAmount = 10000.0;
        System.out.println(">>> 1. Luxury Tax on 10,000 INR (28% Rate): " + luxuryGstCalculator.calculateTax(invoiceAmount) + " INR");
        System.out.println(">>> 2. Custom Overridden toString(): " + customToString);

        System.out.println("\n>>> SYNTAX CONSTRAINT: An anonymous class can implement EXACTLY ONE interface OR extend ONE class (Never both)!");

        System.out.println("\n==========================================================================");
    }
}