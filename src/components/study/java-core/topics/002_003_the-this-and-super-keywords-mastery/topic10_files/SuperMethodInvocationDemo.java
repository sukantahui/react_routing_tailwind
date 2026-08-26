/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 10: Using 'super' to Invoke Overridden Parent Class Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class SuperMethodInvocationDemo {

    // Parent Class
    public static class TraineePortal {
        public void login(String username) {
            System.out.println("  [BASE PORTAL] Validating credentials for: " + username);
            System.out.println("  [BASE PORTAL] Establishing encrypted session...");
        }
    }

    // Child Class (Extends behavior by calling parent method via super.login())
    public static class SecureTwoFactorPortal extends TraineePortal {
        @Override
        public void login(String username) {
            // 1. Reuse and execute standard parent login logic
            super.login(username);

            // 2. Add specialized 2FA OTP verification
            System.out.println("  [SECURE 2FA] Sending 6-digit OTP to registered mobile for: " + username);
            System.out.println("  [SECURE 2FA] OTP verified successfully! Access granted.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: INVOKING OVERRIDDEN METHODS VIA 'super' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SecureTwoFactorPortal portal = new SecureTwoFactorPortal();
        portal.login("Swadeep_Barrackpore");

        System.out.println("\n==========================================================================");
    }
}