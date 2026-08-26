/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 7: Constructor Chaining Within the Same Class Using 'this()'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.Objects;

public class ConstructorChainingThisDemo {

    public static class StudentEnrollment {
        private final int rollId;
        private final String studentName;
        private final String campusHub;
        private final String streamCourse;
        private final double feesPaid;

        // Constructor 1: 1-Arg Constructor (Delegates to Constructor 2)
        public StudentEnrollment(int rollId) {
            this(rollId, "Provisional Trainee");
            System.out.println("  [CHAIN 1] Completed 1-arg constructor for Roll: " + rollId);
        }

        // Constructor 2: 2-Arg Constructor (Delegates to Constructor 3)
        public StudentEnrollment(int rollId, String studentName) {
            this(rollId, studentName, "Barrackpore Hub");
            System.out.println("  [CHAIN 2] Completed 2-arg constructor for: " + studentName);
        }

        // Constructor 3: 3-Arg Constructor (Delegates to Master Constructor 4)
        public StudentEnrollment(int rollId, String studentName, String campusHub) {
            this(rollId, studentName, campusHub, "Core Java Pro", 0.0);
            System.out.println("  [CHAIN 3] Completed 3-arg constructor at Hub: " + campusHub);
        }

        // Master / Canonical Constructor: 5-Arg (Contains ALL validation & assignment)
        public StudentEnrollment(int rollId, String studentName, String campusHub, String streamCourse, double feesPaid) {
            if (rollId <= 0) throw new IllegalArgumentException("Roll ID must be positive.");
            this.rollId = rollId;
            this.studentName = Objects.requireNonNull(studentName, "Name cannot be null").trim();
            this.campusHub = Objects.requireNonNull(campusHub, "Campus cannot be null").trim();
            this.streamCourse = Objects.requireNonNull(streamCourse, "Course cannot be null").trim();
            this.feesPaid = feesPaid;
            System.out.printf("  [MASTER CONSTRUCTOR] Executed for %s (Roll: %d)\n", this.studentName, this.rollId);
        }

        public void printSummary() {
            System.out.printf("  -> Roll: %d | Name: %s | Hub: %s | Course: %s | Paid: ₹%.2f\n",
                    rollId, studentName, campusHub, streamCourse, feesPaid);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CONSTRUCTOR CHAINING WITH this() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating student via 1-arg constructor (chains through 4 constructors):");
        StudentEnrollment s1 = new StudentEnrollment(101);
        s1.printSummary();

        System.out.println("\n>>> 2. Creating student via 2-arg constructor for Debangshu:");
        StudentEnrollment s2 = new StudentEnrollment(102, "Debangshu Mukherjee");
        s2.printSummary();

        System.out.println("\n>>> 3. Creating student via 3-arg constructor for Tuhina (Naihati):");
        StudentEnrollment s3 = new StudentEnrollment(103, "Tuhina Das", "Naihati Hub");
        s3.printSummary();

        System.out.println("\n>>> 4. Creating student directly via Master 5-arg constructor for Swadeep:");
        StudentEnrollment s4 = new StudentEnrollment(104, "Swadeep Paul", "Barrackpore Hub", "Full Stack Java", 15000.00);
        s4.printSummary();

        System.out.println("\n==========================================================================");
    }
}