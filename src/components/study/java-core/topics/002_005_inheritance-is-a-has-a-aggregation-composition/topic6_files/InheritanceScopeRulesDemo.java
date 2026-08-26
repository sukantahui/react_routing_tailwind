/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 6: What is Inherited and What is NOT Inherited
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class InheritanceScopeRulesDemo {

    public static class BaseAccount {
        public String publicNotice = "Welcome to AccoTax Bank";
        protected double balance = 50000.0;
        String packageBranch = "Barrackpore Main";
        private String secretPin = "9876"; // NOT INHERITED / NOT DIRECTLY ACCESSIBLE

        public BaseAccount() {
            System.out.println("  [BASE CONSTRUCTOR] BaseAccount initialized.");
        }

        // Public getter to access private parent state
        public String getSecretPinMasked() {
            return "****";
        }
    }

    public static class SavingsAccount extends BaseAccount {
        // Constructors are NOT inherited; Child must declare its own
        public SavingsAccount() {
            super(); // Parent constructor executed via super()
        }

        public void printAccessibleFields() {
            System.out.println("  -> publicNotice: " + publicNotice); // Accessible
            System.out.println("  -> balance: ₹" + balance);         // Accessible
            System.out.println("  -> packageBranch: " + packageBranch); // Accessible (same package)
            // System.out.println(secretPin); // COMPILE ERROR: private field is NOT directly accessible!
            System.out.println("  -> Masked PIN (via public getter): " + getSecretPinMasked());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: WHAT IS INHERITED VS NOT INHERITED - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SavingsAccount acc = new SavingsAccount();
        acc.printAccessibleFields();

        System.out.println("\n>>> Summary of Inheritance Rules:");
        System.out.println("  ✔ INHERITED: public, protected, and package-private members (in same pkg)");
        System.out.println("  X NOT INHERITED: private members (accessible only via public getters/setters)");
        System.out.println("  X NOT INHERITED: Constructors (invoked via super(), never inherited)");

        System.out.println("\n==========================================================================");
    }
}