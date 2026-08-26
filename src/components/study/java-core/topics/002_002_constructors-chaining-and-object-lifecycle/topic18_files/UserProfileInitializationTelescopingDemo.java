/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 18: Real-World Modeling: User Profile Initialization with Multiple Optional Parameters
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.Objects;

public class UserProfileInitializationTelescopingDemo {

    // Capstone Entity: TraineeEnrollmentProfile
    public static class TraineeEnrollmentProfile {
        // Mandatory fields
        private final int rollId;
        private final String studentName;
        private final String primaryPhone;

        // Optional fields with defaults
        private final String emailAddress;
        private final String campusHub;
        private final boolean isHostelRequired;
        private final double scholarshipPercentage;

        // Overloaded Telescoping Constructor 1: Mandatory Fields Only
        public TraineeEnrollmentProfile(int rollId, String studentName, String primaryPhone) {
            this(rollId, studentName, primaryPhone, "not_provided@coderaccotax.com", "Barrackpore Hub", false, 0.0);
        }

        // Overloaded Telescoping Constructor 2: Mandatory + Email & Hub
        public TraineeEnrollmentProfile(int rollId, String studentName, String primaryPhone, String email, String hub) {
            this(rollId, studentName, primaryPhone, email, hub, false, 0.0);
        }

        // Master Canonical Constructor: All Fields
        public TraineeEnrollmentProfile(int rollId, String studentName, String primaryPhone,
                                       String emailAddress, String campusHub,
                                       boolean isHostelRequired, double scholarshipPercentage) {
            if (rollId <= 0) throw new IllegalArgumentException("Invalid roll ID.");
            this.rollId = rollId;
            this.studentName = Objects.requireNonNull(studentName, "Name required");
            this.primaryPhone = Objects.requireNonNull(primaryPhone, "Phone required");
            this.emailAddress = emailAddress;
            this.campusHub = campusHub;
            this.isHostelRequired = isHostelRequired;
            this.scholarshipPercentage = scholarshipPercentage;

            System.out.printf("  [ENROLLMENT ENGINE] Profile active for %s (Roll: %d) at %s\n",
                    this.studentName, this.rollId, this.campusHub);
        }

        public void printSummary() {
            System.out.println("  +-------------------------------------------------------------------+");
            System.out.printf("  | ENROLLED TRAINEE : %-46s |
", studentName + " (Roll " + rollId + ")");
            System.out.printf("  | Contact Phone    : %-46s |
", primaryPhone);
            System.out.printf("  | Email Address    : %-46s |
", emailAddress);
            System.out.printf("  | Academic Hub     : %-46s |
", campusHub);
            System.out.printf("  | Hostel Facility  : %-46s |
", (isHostelRequired ? "YES (AC Hostel)" : "NO (Day Scholar)"));
            System.out.printf("  | Scholarship Rate : %-45.1f%% |
", scholarshipPercentage);
            System.out.println("  +-------------------------------------------------------------------+");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: USER PROFILE INITIALIZATION ENGINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Enrolling Swadeep Paul with Basic Mandatory Information:");
        TraineeEnrollmentProfile s1 = new TraineeEnrollmentProfile(101, "Swadeep Paul", "+91 98765 43210");
        s1.printSummary();

        System.out.println("\n>>> 2. Enrolling Tuhina Das with Email & Naihati Hub:");
        TraineeEnrollmentProfile s2 = new TraineeEnrollmentProfile(102, "Tuhina Das", "+91 98765 11111", "tuhina@naihati.edu", "Naihati Hub");
        s2.printSummary();

        System.out.println("\n>>> 3. Enrolling Debangshu Mukherjee with Full Scholarship & Hostel:");
        TraineeEnrollmentProfile s3 = new TraineeEnrollmentProfile(103, "Debangshu Mukherjee", "+91 98765 22222",
                "debangshu@barrackpore.com", "Barrackpore Hub", true, 90.0);
        s3.printSummary();

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_002 CONSTRUCTORS & LIFECYCLE 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}