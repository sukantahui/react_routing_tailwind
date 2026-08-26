/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 14: Constructor Access Modifiers: public, protected, package-private, private
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class ConstructorAccessModifiersScopeDemo {

    public static class AdmissionPackage {
        private String packageName;
        private String visibilityScope;

        // 1. PUBLIC: Anywhere in any package
        public AdmissionPackage(String packageName) {
            this.packageName = packageName;
            this.visibilityScope = "GLOBAL (public)";
        }

        // 2. PROTECTED: Same package + Subclasses in other packages
        protected AdmissionPackage(String packageName, int discountTier) {
            this.packageName = packageName + " [Tier " + discountTier + "]";
            this.visibilityScope = "SUBCLASS + PACKAGE (protected)";
        }

        // 3. PACKAGE-PRIVATE (Default): Same package only
        AdmissionPackage(String packageName, String internalCode) {
            this.packageName = packageName + " (" + internalCode + ")";
            this.visibilityScope = "PACKAGE ONLY (default)";
        }

        // 4. PRIVATE: Within this class only (Factory use)
        private AdmissionPackage(String packageName, boolean isSpecialVip) {
            this.packageName = packageName + " [VIP SPECIAL]";
            this.visibilityScope = "CLASS ONLY (private)";
        }

        // Static Factory Method to expose private constructor
        public static AdmissionPackage createVipPackage(String name) {
            return new AdmissionPackage(name, true);
        }

        public void printInfo() {
            System.out.printf("  -> Package: %-30s | Scope: %s\n", packageName, visibilityScope);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: CONSTRUCTOR ACCESS MODIFIERS SCOPE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AdmissionPackage p1 = new AdmissionPackage("Full Stack Java 2026");
        p1.printInfo();

        AdmissionPackage p2 = new AdmissionPackage("Java Core FastTrack", 2);
        p2.printInfo();

        AdmissionPackage p3 = new AdmissionPackage("DBMS Special Batch", "INT-99");
        p3.printInfo();

        AdmissionPackage p4 = AdmissionPackage.createVipPackage("Barrackpore Mentorship Pro");
        p4.printInfo();

        System.out.println("\n==========================================================================");
    }
}