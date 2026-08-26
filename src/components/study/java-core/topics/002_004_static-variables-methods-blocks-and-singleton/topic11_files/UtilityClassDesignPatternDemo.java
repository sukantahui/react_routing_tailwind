/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 11: Designing Utility Classes: Private Constructor + All Static Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class UtilityClassDesignPatternDemo {

    // PROPER UTILITY CLASS: Marked 'final', private constructor, all static methods
    public static final class AcademyValidationUtil {

        // Private constructor prevents external 'new' instantiation
        private AcademyValidationUtil() {
            throw new AssertionError("Utility class cannot be instantiated!");
        }

        public static boolean isValidRoll(int roll) {
            return roll >= 100 && roll <= 999;
        }

        public static boolean isValidEmail(String email) {
            return email != null && email.contains("@") && email.endsWith(".com");
        }

        public static String sanitizeName(String name) {
            return name == null ? "" : name.trim().toUpperCase();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: PROPER UTILITY CLASS DESIGN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Validating Swadeep's Enrollment Data:");
        boolean validRoll = AcademyValidationUtil.isValidRoll(101);
        boolean validEmail = AcademyValidationUtil.isValidEmail("swadeep@coderaccotax.com");
        String sanitized = AcademyValidationUtil.sanitizeName("  swadeep paul  ");

        System.out.println("  Is Roll 101 Valid? " + validRoll);
        System.out.println("  Is Email Valid? " + validEmail);
        System.out.println("  Sanitized Name: '" + sanitized + "'");

        System.out.println("\n==========================================================================");
    }
}