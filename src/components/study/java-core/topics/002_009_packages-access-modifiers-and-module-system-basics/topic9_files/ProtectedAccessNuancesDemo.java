/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 9: The Nuances of 'protected' Access in Child Classes Across Packages
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class ProtectedAccessNuancesDemo {

    // Base class in package A (Simulated)
    public static class BankSecurityCore {
        protected String masterVaultKey = "BKP-VAULT-2026-KEY";

        protected void openVault() {
            System.out.println("  [VAULT] Master vault unlocked via protected access: " + masterVaultKey);
        }
    }

    // Subclass in package B (Simulated)
    public static class RegionalBranchManager extends BankSecurityCore {
        public void accessThroughInheritance() {
            // 1. VALID: Accessing inherited protected member on 'this' / 'super':
            System.out.println("  [VALID] Accessed via inheritance: " + this.masterVaultKey);
            super.openVault();
        }

        public void accessThroughOtherObject(BankSecurityCore other) {
            // 2. ILLEGAL IN FOREIGN PACKAGE:
            // Attempting to access 'other.masterVaultKey' directly on a foreign parent reference
            // in a different package causes a COMPILE ERROR!
            // 'masterVaultKey has protected access in BankSecurityCore'
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: 'protected' ACCESS CROSS-PACKAGE NUANCES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        RegionalBranchManager mgr = new RegionalBranchManager();
        mgr.accessThroughInheritance();

        System.out.println("\n>>> The Subtle 'protected' Rule:");
        System.out.println("  - A subclass in a DIFFERENT package can access protected members ONLY through INHERITANCE (this/super).");
        System.out.println("  - It CANNOT access protected members through a parent reference ('parentObj.protectedField')!");

        System.out.println("\n==========================================================================");
    }
}