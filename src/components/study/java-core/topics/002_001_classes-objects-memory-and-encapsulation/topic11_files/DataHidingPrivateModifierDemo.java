/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 11: Data Hiding: Restricting Direct Field Access using 'private' Modifier
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Data Hiding & The 'private' Security Wall
 * ----------------------------------------------------------------------------
 * 1. What is Data Hiding?
 *    - The specific Object-Oriented mechanism of making internal fields and
 *      helper methods inaccessible to any external class using the `private` modifier.
 *    - It guarantees that no outside class can read or overwrite internal data
 *      directly, enforcing that all interaction flows through authorized public methods.
 *
 * 2. How the 'private' Modifier Works:
 *    - Compile-Time Enforcement: javac blocks any code attempting `object.privateField`
 *      with the error: "fieldName has private access in ClassName".
 *    - Bytecode Enforcement: The JVM verifier checks access flags before executing
 *      `getfield`, `putfield`, and `invokevirtual` instructions.
 *
 * 3. What Should Be Hidden?
 *    - Sensitive Domain Data : Passwords, PINs, encryption keys, raw tax algorithms.
 *    - Internal Implementation: Pointers, raw arrays, transient state caches.
 *    - Helper / Utility Code : Internal validation routines and sub-computations.
 *
 * 4. Java 11+ Nestmates (JEP 181):
 *    - Allows nested inner classes and their outer enclosing class to share
 *      private members natively in bytecode without generating synthetic bridge methods.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;

public class DataHidingPrivateModifierDemo {

    // ------------------------------------------------------------------------
    // Domain Class: SecureStudentCredentialVault (Demonstrating Data Hiding)
    // ------------------------------------------------------------------------
    public static class SecureStudentCredentialVault {

        // --- Hidden Private Fields (Completely Inaccessible from Outside) ---
        private final int studentId;
        private final String studentName;
        private final String campusBranch;
        private String rawEmailAddress;
        private String saltedPasswordHash; // Hidden cryptographic hash (NEVER store plaintext!)
        private int failedLoginAttemptsCount = 0;
        private boolean isAccountLocked = false;

        // Constructor (Private validation of secret credentials)
        public SecureStudentCredentialVault(int studentId, String studentName, String campusBranch, String email, String plainPassword) {
            if (studentId <= 0) throw new IllegalArgumentException("Student ID must be positive.");
            this.studentId = studentId;
            this.studentName = Objects.requireNonNull(studentName, "Name required").trim();
            this.campusBranch = campusBranch;
            this.rawEmailAddress = Objects.requireNonNull(email, "Email required").trim().toLowerCase();

            // Hash password internally before storing
            this.saltedPasswordHash = computeSha256Hash(plainPassword);
        }

        // --- Public Authorized Behavior: Authenticate Student ---
        public boolean authenticate(String enteredPassword) {
            if (isAccountLocked) {
                System.out.printf("  [AUTH FAILED] Account for %s is LOCKED due to excessive failed attempts.\n", studentName);
                return false;
            }

            String enteredHash = computeSha256Hash(enteredPassword);
            if (this.saltedPasswordHash.equals(enteredHash)) {
                this.failedLoginAttemptsCount = 0; // Reset failed counter
                System.out.printf("  [AUTH SUCCESS] %s logged in successfully to %s portal.\n", studentName, campusBranch);
                return true;
            } else {
                this.failedLoginAttemptsCount++;
                System.out.printf("  [AUTH FAILED] Invalid password for %s! Attempt %d of 3.\n",
                        studentName, this.failedLoginAttemptsCount);
                if (this.failedLoginAttemptsCount >= 3) {
                    this.isAccountLocked = true;
                    System.out.printf("  [SECURITY LOCK] Account for %s has been auto-locked!\n", studentName);
                }
                return false;
            }
        }

        // --- Public Behavior: Reset Password (Requires Old Password Verification) ---
        public boolean changePassword(String oldPassword, String newPassword) {
            if (!this.saltedPasswordHash.equals(computeSha256Hash(oldPassword))) {
                System.out.println("  [Password Change REJECTED] Current password verification failed.");
                return false;
            }
            if (newPassword == null || newPassword.length() < 8) {
                System.out.println("  [Password Change REJECTED] New password must be at least 8 characters.");
                return false;
            }
            this.saltedPasswordHash = computeSha256Hash(newPassword);
            System.out.println("  [Password Change SUCCESS] Password securely updated for: " + studentName);
            return true;
        }

        // --- Private Internal Helper Method (Hidden Cryptographic Algorithm) ---
        private String computeSha256Hash(String input) {
            if (input == null) return "";
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                byte[] hashBytes = md.digest(input.getBytes(StandardCharsets.UTF_8));
                StringBuilder hexString = new StringBuilder();
                for (byte b : hashBytes) {
                    hexString.append(String.format("%02x", b));
                }
                return hexString.toString();
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException("SHA-256 algorithm missing", e);
            }
        }

        // --- Controlled Public Accessors (Expose only safe metadata) ---
        public int getStudentId() { return studentId; }
        public String getStudentName() { return studentName; }
        public String getCampusBranch() { return campusBranch; }
        public boolean isAccountLocked() { return isAccountLocked; }

        // Masked email accessor (e.g. s***p@domain.com) to prevent data leakage
        public String getMaskedEmail() {
            int atIndex = rawEmailAddress.indexOf('@');
            if (atIndex <= 2) return "***" + rawEmailAddress.substring(atIndex);
            return rawEmailAddress.charAt(0) + "***" + rawEmailAddress.charAt(atIndex - 1) + rawEmailAddress.substring(atIndex);
        }

        public void printPublicProfile() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | Student ID     : STU-%05d                                |\n", studentId);
            System.out.printf("  | Student Name   : %-42s |\n", studentName);
            System.out.printf("  | Campus Branch  : %-42s |\n", campusBranch);
            System.out.printf("  | Masked Email   : %-42s |\n", getMaskedEmail());
            System.out.printf("  | Account Status : %-42s |\n", (isAccountLocked ? "LOCKED" : "ACTIVE"));
            System.out.println("  | Password Hash  : [PROTECTED & HIDDEN BEHIND PRIVATE MODIFIER] |");
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating Data Hiding Security & Access Control
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: DATA HIDING & THE 'private' ACCESS MODIFIER");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Instantiating Secure Vault with Hidden Private Data
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Creating Vault for Swadeep Paul (Barrackpore Lab)");
        SecureStudentCredentialVault swadeepVault = new SecureStudentCredentialVault(
                101,
                "Swadeep Paul",
                "Barrackpore Lab",
                "swadeep.paul@barrackpore-academy.edu",
                "Swadeep@Secret2026"
        );

        swadeepVault.printPublicProfile();

        // --------------------------------------------------------------------
        // DEMO 2: Attempting Direct Field Access (Compile-Time Protection)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: The Compile-Time Defense of the 'private' Modifier");
        System.out.println("Note: The following operations are IMPOSSIBLE in Java source code:");
        System.out.println("  // swadeepVault.saltedPasswordHash = \"hacked\"; // COMPILE ERROR: saltedPasswordHash has private access");
        System.out.println("  // swadeepVault.failedLoginAttemptsCount = 0;   // COMPILE ERROR: failedLoginAttemptsCount has private access");
        System.out.println("  // swadeepVault.computeSha256Hash(\"...\");       // COMPILE ERROR: computeSha256Hash has private access");
        System.out.println("Result: Internal secrets and algorithms are 100% hidden behind the class boundary!");

        // --------------------------------------------------------------------
        // DEMO 3: Authorized Interaction through Public Behavioral Methods
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Executing Authentication Flow via Public Methods");

        System.out.println("\nAttempt 1: Entering incorrect password:");
        swadeepVault.authenticate("WrongPassword123");

        System.out.println("\nAttempt 2: Entering another incorrect password:");
        swadeepVault.authenticate("GuessPassword456");

        System.out.println("\nAttempt 3: Entering correct password before lockout:");
        swadeepVault.authenticate("Swadeep@Secret2026");

        // --------------------------------------------------------------------
        // DEMO 4: Password Change with Invariant Verification
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Updating Secret State via Guarded Public Method");
        swadeepVault.changePassword("Swadeep@Secret2026", "Swadeep@NewSuperSecure2027");

        System.out.println("\nVerifying login with new updated password:");
        swadeepVault.authenticate("Swadeep@NewSuperSecure2027");

        // --------------------------------------------------------------------
        // DEMO 5: Simulating 3 Failed Logins to Trigger Security Lockout
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 5: Simulating Brute-Force Lockout Invariant");
        swadeepVault.authenticate("Hack1");
        swadeepVault.authenticate("Hack2");
        swadeepVault.authenticate("Hack3"); // Hits threshold -> auto-locks!

        System.out.println("\nAttempting login after lockout:");
        swadeepVault.authenticate("Swadeep@NewSuperSecure2027"); // Blocked!

        swadeepVault.printPublicProfile();

        System.out.println("\n==========================================================================");
        System.out.println(" DATA HIDING & 'private' MODIFIER DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
