/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 5: Restrictions on Static Methods: No Instance Variables, 'this' or 'super'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticMethodRestrictionsDemo {

    public static class TraineePortal {
        public static String organizationName = "Coder & AccoTax";
        private String traineeName;

        public TraineePortal(String traineeName) {
            this.traineeName = traineeName;
        }

        // STATIC METHOD
        public static void displayOrganizationInfo() {
            // 1. CAN access other static members:
            System.out.println("  [STATIC METHOD] Organization: " + organizationName);

            // 2. CANNOT access instance variables:
            // System.out.println(this.traineeName); // COMPILE ERROR!

            // 3. CANNOT use 'this' or 'super':
            // System.out.println(this); // COMPILE ERROR!

            // 4. CAN access instance members ONLY through a newly passed object reference:
            TraineePortal temp = new TraineePortal("Guest Trainee");
            System.out.println("  [STATIC METHOD] Accessing instance via explicit ref: " + temp.traineeName);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: STATIC METHOD RESTRICTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineePortal.displayOrganizationInfo();

        System.out.println("\n==========================================================================");
    }
}