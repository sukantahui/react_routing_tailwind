/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 7: The 4 Access Modifiers Deep Dive (private, default, protected, public)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class FourAccessModifiersDeepDiveDemo {

    public static class EncapsulatedAccount {
        // 1. private: Accessible ONLY inside this class
        private String secretAtmPin = "4432";

        // 2. default (package-private): Accessible inside SAME package only (no keyword)
        String branchCity = "Barrackpore";

        // 3. protected: Accessible in SAME package + SUBCLASSES in ANY package
        protected double accountBalance = 75000.0;

        // 4. public: Accessible EVERYWHERE in the JVM universe
        public String accountHolderName = "Swadeep Paul";

        public void printInternalAccess() {
            System.out.println("  [SAME CLASS ALL ACCESS]:");
            System.out.printf("    private PIN: %s | default Branch: %s | protected Balance: ₹%.2f | public Name: %s\n",
                    secretAtmPin, branchCity, accountBalance, accountHolderName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: THE 4 ACCESS MODIFIERS IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EncapsulatedAccount acc = new EncapsulatedAccount();
        acc.printInternalAccess();

        System.out.println("\n>>> Same Package Non-Subclass Access (Inside main):");
        System.out.println("  ✔ acc.branchCity (default)      : " + acc.branchCity);
        System.out.println("  ✔ acc.accountBalance (protected): ₹" + acc.accountBalance);
        System.out.println("  ✔ acc.accountHolderName (public): " + acc.accountHolderName);
        System.out.println("  X acc.secretAtmPin (private)    : COMPILE ERROR (Hidden inside class)");

        System.out.println("\n==========================================================================");
    }
}