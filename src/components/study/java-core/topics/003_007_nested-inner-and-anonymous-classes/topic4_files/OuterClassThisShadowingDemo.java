/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 4: Resolving Variable Shadowing: The OuterClass.this Explicit Reference Syntax
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class OuterClassThisShadowingDemo {

    // Variable in Outer Class scope:
    private String centerLocation = "Barrackpore Hub (Outer)";

    public class InnerDepartment {
        // Variable shadowing the outer variable with the same name:
        private String centerLocation = "Software Lab (Inner)";

        public void printLocations(String centerLocation) {
            // Local method parameter shadows both!
            System.out.println("  1. Method Parameter Scope  : " + centerLocation);
            System.out.println("  2. Inner Class Scope (this): " + this.centerLocation);
            System.out.println("  3. Outer Class Scope (Outer.this): " + OuterClassThisShadowingDemo.this.centerLocation);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: OuterClass.this SHADOWING RESOLUTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        OuterClassThisShadowingDemo outer = new OuterClassThisShadowingDemo();
        OuterClassThisShadowingDemo.InnerDepartment inner = outer.new InnerDepartment();

        System.out.println(">>> Resolving 3 Tiers of Shadowed Identifiers:");
        inner.printLocations("Trainee Desk #4 (Local Param)");

        System.out.println("\n==========================================================================");
    }
}