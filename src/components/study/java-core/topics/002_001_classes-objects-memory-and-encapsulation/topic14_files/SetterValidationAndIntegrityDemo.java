/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 14: Adding Business Validation Logic Inside Setters to Protect Object Integrity
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Setters as Domain Invariant Gatekeepers
 * ----------------------------------------------------------------------------
 * 1. Why Validate Inside Setters?
 *    - In an enterprise application, data enters from untrusted sources (UI forms,
 *      REST payloads, CSV imports, external APIs).
 *    - An unvalidated setter is an open invitation to state corruption.
 *    - Validating inside mutators guarantees that an object can NEVER enter an
 *      invalid, illegal, or inconsistent state.
 *
 * 2. The 4 Essential Tiers of Setter Validation:
 *    - Tier 1: Null & Blank Checks (Objects.requireNonNull, isBlank()).
 *    - Tier 2: Normalization / Sanitization (trimming, toLowerCase, formatting).
 *    - Tier 3: Range & Format Bounds (regex checks, min/max limits, positive values).
 *    - Tier 4: Business Rule & Lifecycle Invariants (cross-field logic, state transitions).
 *
 * 3. Standard Exception Conventions:
 *    - IllegalArgumentException : When an argument violates domain constraints (e.g. age < 0).
 *    - NullPointerException     : When a mandatory argument is null (via Objects.requireNonNull).
 *    - IllegalStateException    : When the object's current state forbids the mutation.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.util.Objects;
import java.util.regex.Pattern;

public class SetterValidationAndIntegrityDemo {

    // ------------------------------------------------------------------------
    // Domain Class: TraineeAdmissionRecord (Strict Invariant Validation)
    // ------------------------------------------------------------------------
    public static class TraineeAdmissionRecord {

        // Precompiled regex pattern for West Bengal Indian Mobile Numbers (e.g., +91 or 10 digits)
        private static final Pattern PHONE_PATTERN = Pattern.compile("^[6-9]\\d{9}$");
        private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

        // --- Encapsulated Private Fields ---
        private int studentRollNumber;
        private String studentFullName;
        private String contactPhoneNumber;
        private String verifiedEmailAddress;
        private double entranceScorePercentage;
        private double baseFeeInr;
        private double scholarshipDiscountPercentage;
        private String enrollmentStatus; // APPLIED, ENROLLED, SUSPENDED, GRADUATED

        // Constructor delegating to setters for unified validation
        public TraineeAdmissionRecord(int rollNumber, String fullName, String phone, String email, double entranceScore, double baseFee) {
            setStudentRollNumber(rollNumber);
            setStudentFullName(fullName);
            setContactPhoneNumber(phone);
            setVerifiedEmailAddress(email);
            setEntranceScorePercentage(entranceScore);
            setBaseFeeInr(baseFee);
            this.scholarshipDiscountPercentage = 0.0;
            this.enrollmentStatus = "APPLIED";
        }

        // --- Validated Setter 1: Roll Number (Positive Integer) ---
        public void setStudentRollNumber(int studentRollNumber) {
            if (studentRollNumber <= 0) {
                throw new IllegalArgumentException("Roll number must be strictly positive. Supplied: " + studentRollNumber);
            }
            this.studentRollNumber = studentRollNumber;
        }

        // --- Validated Setter 2: Full Name (Sanitization + Length Validation) ---
        public void setStudentFullName(String studentFullName) {
            Objects.requireNonNull(studentFullName, "Student full name cannot be null.");
            String sanitized = studentFullName.trim();
            if (sanitized.isEmpty()) {
                throw new IllegalArgumentException("Student full name cannot be blank.");
            }
            if (sanitized.length() < 2 || sanitized.length() > 60) {
                throw new IllegalArgumentException("Name length must be between 2 and 60 characters. Supplied: '" + sanitized + "'");
            }
            this.studentFullName = sanitized;
        }

        // --- Validated Setter 3: Indian Phone Number (Regex Validation) ---
        public void setContactPhoneNumber(String contactPhoneNumber) {
            Objects.requireNonNull(contactPhoneNumber, "Phone number cannot be null.");
            String cleanPhone = contactPhoneNumber.trim().replaceAll("[\\s\\-+]", "");
            if (cleanPhone.startsWith("91") && cleanPhone.length() == 12) {
                cleanPhone = cleanPhone.substring(2); // Strip country code +91
            }
            if (!PHONE_PATTERN.matcher(cleanPhone).matches()) {
                throw new IllegalArgumentException("Invalid 10-digit Indian mobile number: " + contactPhoneNumber);
            }
            this.contactPhoneNumber = cleanPhone;
        }

        // --- Validated Setter 4: Email Address (Normalization + Regex) ---
        public void setVerifiedEmailAddress(String verifiedEmailAddress) {
            Objects.requireNonNull(verifiedEmailAddress, "Email address cannot be null.");
            String cleanEmail = verifiedEmailAddress.trim().toLowerCase();
            if (!EMAIL_PATTERN.matcher(cleanEmail).matches()) {
                throw new IllegalArgumentException("Invalid email format: " + verifiedEmailAddress);
            }
            this.verifiedEmailAddress = cleanEmail;
        }

        // --- Validated Setter 5: Score Percentage (Range: 0.0 to 100.0) ---
        public void setEntranceScorePercentage(double entranceScorePercentage) {
            if (entranceScorePercentage < 0.0 || entranceScorePercentage > 100.0) {
                throw new IllegalArgumentException("Entrance score must be between 0.0% and 100.0%. Supplied: " + entranceScorePercentage);
            }
            this.entranceScorePercentage = entranceScorePercentage;
        }

        // --- Validated Setter 6: Base Fee (Positive Financial Invariant) ---
        public void setBaseFeeInr(double baseFeeInr) {
            if (baseFeeInr < 0.0) {
                throw new IllegalArgumentException("Base fee cannot be negative. Supplied: ₹" + baseFeeInr);
            }
            this.baseFeeInr = baseFeeInr;
        }

        // --- Validated Setter 7: Scholarship Discount (Conditional Business Logic) ---
        public void setScholarshipDiscountPercentage(double discountPercentage) {
            if (discountPercentage < 0.0 || discountPercentage > 50.0) {
                throw new IllegalArgumentException("Scholarship discount cannot exceed 50.0%. Attempted: " + discountPercentage + "%");
            }
            // Business Invariant: Merit discount requires entrance score >= 75.0%
            if (discountPercentage > 0.0 && this.entranceScorePercentage < 75.0) {
                throw new IllegalStateException("Student entrance score (" + this.entranceScorePercentage
                        + "%) is below the 75.0% threshold required for scholarship grants!");
            }
            this.scholarshipDiscountPercentage = discountPercentage;
        }

        // --- Validated Setter 8: State Transition Lifecycle Validation ---
        public void transitionEnrollmentStatus(String newStatus) {
            Objects.requireNonNull(newStatus, "Status cannot be null.");
            String target = newStatus.trim().toUpperCase();

            // Guarding State Machine Invariants
            if ("GRADUATED".equals(this.enrollmentStatus)) {
                throw new IllegalStateException("Cannot change status: Student has already GRADUATED!");
            }
            if ("SUSPENDED".equals(this.enrollmentStatus) && !"ENROLLED".equals(target)) {
                throw new IllegalStateException("Suspended student can only transition back to ENROLLED.");
            }

            System.out.printf("  [State Transition] %s status changed: %s -> %s\n",
                    this.studentFullName, this.enrollmentStatus, target);
            this.enrollmentStatus = target;
        }

        // Calculated property: Net Payable Fee after discount
        public double getNetPayableFeeInr() {
            double discountAmount = (this.baseFeeInr * this.scholarshipDiscountPercentage) / 100.0;
            return this.baseFeeInr - discountAmount;
        }

        // Getters
        public int getStudentRollNumber() { return studentRollNumber; }
        public String getStudentFullName() { return studentFullName; }
        public String getContactPhoneNumber() { return contactPhoneNumber; }
        public String getVerifiedEmailAddress() { return verifiedEmailAddress; }
        public double getEntranceScorePercentage() { return entranceScorePercentage; }
        public double getBaseFeeInr() { return baseFeeInr; }
        public double getScholarshipDiscountPercentage() { return scholarshipDiscountPercentage; }
        public String getEnrollmentStatus() { return enrollmentStatus; }

        public void printRecordCard() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | Roll Number    : %-42d |\n", studentRollNumber);
            System.out.printf("  | Student Name   : %-42s |\n", studentFullName);
            System.out.printf("  | Phone Number   : +91-%-38s |\n", contactPhoneNumber);
            System.out.printf("  | Email Address  : %-42s |\n", verifiedEmailAddress);
            System.out.printf("  | Entrance Score : %-41.1f%% |\n", entranceScorePercentage);
            System.out.printf("  | Base Fee       : ₹%-41.2f |\n", baseFeeInr);
            System.out.printf("  | Scholarship    : %-41.1f%% |\n", scholarshipDiscountPercentage);
            System.out.printf("  | Net Payable Fee: ₹%-41.2f |\n", getNetPayableFeeInr());
            System.out.printf("  | Status         : %-42s |\n", enrollmentStatus);
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of Setter Validation Defenses
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: BUSINESS VALIDATION INSIDE SETTERS");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Successful Instantiation with Valid Clean Data
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Creating Valid Student Record (Swadeep Paul - Barrackpore)");
        TraineeAdmissionRecord swadeep = new TraineeAdmissionRecord(
                101,
                "  Swadeep Paul  ", // Will be normalized/trimmed
                "+91 98301 23456",  // Will be sanitized to 9830123456
                "Swadeep.Paul@Barrackpore-Academy.EDU", // Will be lowercased
                92.5,
                15000.00
        );

        // Granting merit scholarship (Valid because entranceScore 92.5 >= 75.0)
        swadeep.setScholarshipDiscountPercentage(25.0);
        swadeep.transitionEnrollmentStatus("ENROLLED");
        swadeep.printRecordCard();

        // --------------------------------------------------------------------
        // DEMO 2: Catching Range & Format Violations via Setters
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Testing Setter Validation Defenses Against Bad Data\n");

        // Test A: Invalid Phone Number
        try {
            System.out.print("  [Test A: Invalid Phone '12345'] -> ");
            swadeep.setContactPhoneNumber("12345");
        } catch (IllegalArgumentException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        // Test B: Invalid Score Percentage (150%)
        try {
            System.out.print("  [Test B: Score 150.0%]          -> ");
            swadeep.setEntranceScorePercentage(150.0);
        } catch (IllegalArgumentException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        // Test C: Invalid Negative Fee
        try {
            System.out.print("  [Test C: Negative Fee -₹8000]   -> ");
            swadeep.setBaseFeeInr(-8000.0);
        } catch (IllegalArgumentException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        // Test D: Invalid Email Format
        try {
            System.out.print("  [Test D: Malformed Email]       -> ");
            swadeep.setVerifiedEmailAddress("swadeep_invalid_email.com");
        } catch (IllegalArgumentException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        // --------------------------------------------------------------------
        // DEMO 3: Testing Cross-Field Business Invariants
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Testing Conditional Business Invariant (Scholarship Eligibility)");
        TraineeAdmissionRecord tuhina = new TraineeAdmissionRecord(
                102, "Tuhina Das", "9876543210", "tuhina.das@naihati.edu", 68.0, 15000.00
        );
        System.out.println("  Tuhina Entrance Score: " + tuhina.getEntranceScorePercentage() + "% (Threshold: 75.0%)");

        try {
            System.out.print("  Attempting 30% scholarship grant for Tuhina -> ");
            tuhina.setScholarshipDiscountPercentage(30.0);
        } catch (IllegalStateException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        // --------------------------------------------------------------------
        // DEMO 4: Testing State Machine Lifecycle Guards
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Testing State Machine Transition Guards");
        swadeep.transitionEnrollmentStatus("GRADUATED");

        try {
            System.out.print("  Attempting to change status of GRADUATED student to SUSPENDED -> ");
            swadeep.transitionEnrollmentStatus("SUSPENDED");
        } catch (IllegalStateException e) {
            System.out.println("CAUGHT & REJECTED: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" SETTER VALIDATION & INTEGRITY DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
