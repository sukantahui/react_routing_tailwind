/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 9: Using 'super' to Access Shadowed Parent Class Instance Variables
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class SuperFieldShadowingDemo {

    // Parent Class
    public static class StandardCourse {
        protected double baseFee = 6000.0; // Parent Field
    }

    // Child Class (Declares field with identical name -> Hides/Shadows Parent Field!)
    public static class PremiumSpecialization extends StandardCourse {
        protected double baseFee = 12000.0; // Child Field shadows parent baseFee

        public void printFeeComparison() {
            // 'baseFee' or 'this.baseFee' refers to Child field
            System.out.printf("  [CHILD FIELD] Current Specialization Fee (this.baseFee): ₹%.2f\n", this.baseFee);

            // 'super.baseFee' explicitly bypasses shadowing to read Parent field
            System.out.printf("  [PARENT FIELD] Standard Foundation Fee (super.baseFee): ₹%.2f\n", super.baseFee);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ACCESSING SHADOWED PARENT FIELDS VIA 'super' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PremiumSpecialization javaPro = new PremiumSpecialization();
        javaPro.printFeeComparison();

        System.out.println("\n==========================================================================");
    }
}