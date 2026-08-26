/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 15: Read-Only and Write-Only Classes Using Selective Getter/Setter Exposure
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Selective Accessor/Mutator Exposure
 * ----------------------------------------------------------------------------
 * 1. What is a Read-Only Class?
 *    - A class that provides ONLY public getters (no setters).
 *    - State is established during construction and can be read by any component,
 *      but cannot be mutated externally.
 *    - Use Cases: Financial transaction receipts, audit snapshots, telemetry reports.
 *
 * 2. What is a Write-Only Class?
 *    - A class that provides ONLY public setters (no getters).
 *    - Callers can feed credentials, configurations, or logs into the object, but
 *      cannot inspect or extract stored values back out.
 *    - Use Cases: Password reset ingestion, security token sinks, encrypted log writers.
 *
 * 3. Mixed Field Selective Exposure (Enterprise Hybrid Pattern):
 *    - A domain class where fields have different access policies:
 *      * Read-Only Fields   : `accountId`, `creationTimestamp` (Getters only).
 *      * Read-Write Fields  : `emailAddress`, `phoneNumber` (Getters & Setters).
 *      * Write-Only Fields  : `rawPassword`, `cvvSecurityPin` (Setters only).
 *      * Internal-Only State: `failedLoginCount`, `auditHash` (No getters or setters).
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class ReadOnlyWriteOnlyClassesDemo {

    // ------------------------------------------------------------------------
    // Part 1: PURE READ-ONLY CLASS (Academic Semester Report Card)
    // ------------------------------------------------------------------------
    public static final class ReadOnlyAcademicReportCard {
        private final int studentRollNumber;
        private final String studentFullName;
        private final String campusBranch;
        private final double javaTheoryMarks;
        private final double springBootLabMarks;
        private final double cloudDevOpsMarks;
        private final String generationTimestamp;

        // All fields assigned in constructor; NO setters exist!
        public ReadOnlyAcademicReportCard(int rollNumber, String name, String branch, double java, double spring, double cloud) {
            this.studentRollNumber = rollNumber;
            this.studentFullName = Objects.requireNonNull(name, "Name required").trim();
            this.campusBranch = Objects.requireNonNull(branch, "Branch required").trim();
            this.javaTheoryMarks = validateMarks(java);
            this.springBootLabMarks = validateMarks(spring);
            this.cloudDevOpsMarks = validateMarks(cloud);

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
            this.generationTimestamp = LocalDateTime.now().format(dtf);
        }

        private double validateMarks(double m) {
            if (m < 0.0 || m > 100.0) throw new IllegalArgumentException("Marks must be 0-100: " + m);
            return m;
        }

        // --- Only Getters Exposed (Pure Read-Only Contract) ---
        public int getStudentRollNumber() { return studentRollNumber; }
        public String getStudentFullName() { return studentFullName; }
        public String getCampusBranch() { return campusBranch; }
        public double getJavaTheoryMarks() { return javaTheoryMarks; }
        public double getSpringBootLabMarks() { return springBootLabMarks; }
        public double getCloudDevOpsMarks() { return cloudDevOpsMarks; }
        public String getGenerationTimestamp() { return generationTimestamp; }

        // Virtual calculated property
        public double getAggregatePercentage() {
            return (javaTheoryMarks + springBootLabMarks + cloudDevOpsMarks) / 3.0;
        }

        public String getLetterGrade() {
            double agg = getAggregatePercentage();
            if (agg >= 90.0) return "A+ (Exemplary)";
            if (agg >= 80.0) return "A (Distinction)";
            if (agg >= 70.0) return "B+ (First Class)";
            return "B (Pass)";
        }

        public void printReportCard() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | [READ-ONLY] ACADEMIC SEMESTER REPORT CARD                   |\n");
            System.out.printf("  | Roll Number   : %-43d |\n", studentRollNumber);
            System.out.printf("  | Student Name  : %-43s |\n", studentFullName);
            System.out.printf("  | Campus Branch : %-43s |\n", campusBranch);
            System.out.printf("  | Java Theory   : %-43.1f |\n", javaTheoryMarks);
            System.out.printf("  | Spring Lab    : %-43.1f |\n", springBootLabMarks);
            System.out.printf("  | Cloud DevOps  : %-43.1f |\n", cloudDevOpsMarks);
            System.out.printf("  | Aggregate %%   : %-42.2f%% |\n", getAggregatePercentage());
            System.out.printf("  | Grade Awarded : %-43s |\n", getLetterGrade());
            System.out.printf("  | Certified On  : %-43s |\n", generationTimestamp);
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Part 2: PURE WRITE-ONLY CLASS (Password Reset Ingestion Sink)
    // ------------------------------------------------------------------------
    public static class WriteOnlyCredentialIngestionSink {
        private String processedHash;
        private int saltRounds = 12;
        private boolean isProcessed = false;

        // No-arg constructor
        public WriteOnlyCredentialIngestionSink() {}

        // --- Only Setters Exposed (NO Getters exist!) ---
        public void setPlaintextPassword(String rawPassword) {
            Objects.requireNonNull(rawPassword, "Password cannot be null.");
            if (rawPassword.length() < 8) {
                throw new IllegalArgumentException("Password must be at least 8 characters.");
            }
            this.processedHash = computeHash(rawPassword);
            this.isProcessed = true;
            System.out.println("  [WRITE-ONLY SINK] Plaintext password digested and securely hashed.");
        }

        public void setSaltRounds(int rounds) {
            if (rounds < 10 || rounds > 30) {
                throw new IllegalArgumentException("Salt rounds must be between 10 and 30.");
            }
            this.saltRounds = rounds;
        }

        // Action method that internally checks match without exposing secret
        public boolean verifyPasswordMatch(String candidatePassword) {
            if (!isProcessed || processedHash == null) return false;
            return processedHash.equals(computeHash(candidatePassword));
        }

        private String computeHash(String input) {
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                byte[] bytes = md.digest((input + "_SALT_" + saltRounds).getBytes(StandardCharsets.UTF_8));
                StringBuilder sb = new StringBuilder();
                for (byte b : bytes) sb.append(String.format("%02x", b));
                return sb.toString();
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException("SHA-256 unavailable", e);
            }
        }
    }

    // ------------------------------------------------------------------------
    // Part 3: HYBRID CLASS (Selective Mixed Field-Level Exposure)
    // ------------------------------------------------------------------------
    public static class SelectiveExposureStudentProfile {
        // 1. Read-Only Properties (Getters Only)
        private final int studentId;
        private final String registrationDate;

        // 2. Read-Write Properties (Getters AND Setters)
        private String contactEmail;
        private String residentialAddress;

        // 3. Write-Only Properties (Setters Only)
        private String paymentPinHash;

        // 4. Internal-Only Properties (NO Getters, NO Setters)
        private int internalAuditCounter = 0;

        public SelectiveExposureStudentProfile(int studentId, String email, String address) {
            this.studentId = studentId;
            this.registrationDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy"));
            this.contactEmail = email;
            this.residentialAddress = address;
        }

        // Read-Only Accessors
        public int getStudentId() { return studentId; }
        public String getRegistrationDate() { return registrationDate; }

        // Read-Write Accessors & Mutators
        public String getContactEmail() { return contactEmail; }
        public void setContactEmail(String email) {
            this.contactEmail = Objects.requireNonNull(email, "Email required");
            this.internalAuditCounter++;
        }

        public String getResidentialAddress() { return residentialAddress; }
        public void setResidentialAddress(String address) {
            this.residentialAddress = Objects.requireNonNull(address, "Address required");
            this.internalAuditCounter++;
        }

        // Write-Only Mutator (No getter!)
        public void setPaymentPin(String pin) {
            if (pin == null || pin.length() != 4 || !pin.matches("\\d{4}")) {
                throw new IllegalArgumentException("Payment PIN must be exactly 4 digits.");
            }
            this.paymentPinHash = "HASH_" + pin.hashCode();
            this.internalAuditCounter++;
            System.out.println("  [Selective Profile] Payment PIN securely ingested (Write-Only).");
        }

        public void printProfileSummary() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | [HYBRID PROFILE] SELECTIVE EXPOSURE                         |\n");
            System.out.printf("  | (Read-Only)  Student ID   : STU-%05d                       |\n", studentId);
            System.out.printf("  | (Read-Only)  Registered On: %-31s |\n", registrationDate);
            System.out.printf("  | (Read-Write) Email        : %-31s |\n", contactEmail);
            System.out.printf("  | (Read-Write) Address      : %-31s |\n", residentialAddress);
            System.out.printf("  | (Write-Only) Payment PIN  : [PROTECTED & INACCESSIBLE]      |\n");
            System.out.printf("  | (Internal)   Audit Count  : %-31d |\n", internalAuditCounter);
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating Read-Only, Write-Only, and Selective Exposure
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: READ-ONLY & WRITE-ONLY SELECTIVE ENCAPSULATION");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Pure Read-Only Class Demonstration
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Pure Read-Only Class (Academic Report Card for Swadeep Paul)");
        ReadOnlyAcademicReportCard swadeepCard = new ReadOnlyAcademicReportCard(
                101, "Swadeep Paul", "Barrackpore Hub", 94.0, 96.5, 91.0
        );

        swadeepCard.printReportCard();
        System.out.println("Notice: No setter exists. Outside code cannot alter marks: swadeepCard.setJavaTheoryMarks() is IMPOSSIBLE!\n");

        // --------------------------------------------------------------------
        // DEMO 2: Pure Write-Only Class Demonstration
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: Pure Write-Only Class (Password Ingestion Sink)");
        WriteOnlyCredentialIngestionSink sink = new WriteOnlyCredentialIngestionSink();
        sink.setSaltRounds(16);
        sink.setPlaintextPassword("Swadeep@Barrackpore2026");

        System.out.println("Notice: No getter exists. Outside code cannot read: sink.getPlaintextPassword() or sink.getHash() is IMPOSSIBLE!");
        System.out.println("Testing verification through behavioral method: verifyPasswordMatch(\"Swadeep@Barrackpore2026\") -> "
                + sink.verifyPasswordMatch("Swadeep@Barrackpore2026"));
        System.out.println("Testing verification with wrong password: verifyPasswordMatch(\"WrongPass\") -> "
                + sink.verifyPasswordMatch("WrongPass") + "\n");

        // --------------------------------------------------------------------
        // DEMO 3: Hybrid Selective Exposure Demonstration
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 3: Hybrid Selective Exposure (Tuhina Das Profile - Naihati)");
        SelectiveExposureStudentProfile tuhinaProfile = new SelectiveExposureStudentProfile(
                202, "tuhina.das@naihati.edu", "Naihati Anandapuri, WB"
        );

        tuhinaProfile.setContactEmail("tuhina.fullstack@naihati.edu");
        tuhinaProfile.setPaymentPin("4892"); // Write-only property updated
        tuhinaProfile.printProfileSummary();

        System.out.println("\n==========================================================================");
        System.out.println(" READ-ONLY & WRITE-ONLY SELECTIVE EXPOSURE DEMO COMPLETE");
        System.out.println("==========================================================================");
    }
}
