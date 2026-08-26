/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 3: Object Instantiation using the 'new' Keyword
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The 5 Phases of Object Instantiation in Java
 * ----------------------------------------------------------------------------
 * When a statement like:
 *     CourseEnrollment enrollment = new CourseEnrollment(101, "Java Fullstack", 6500.00);
 * is executed by the JVM, the following precise sequential phases take place:
 *
 * Phase 1: Class Loading & Verification (if not already loaded)
 *   - The JVM ClassLoader locates CourseEnrollment.class, loads it into Metaspace,
 *     verifies bytecode integrity, prepares static variables with default values,
 *     and runs static initializer blocks <clinit>() once per classloader.
 *
 * Phase 2: Heap Memory Allocation
 *   - The JVM calculates the exact memory size needed in Heap (Young Generation / Eden space):
 *       * Object Header:
 *           - Mark Word (64-bit on 64-bit JVM): hash code, GC age, locking state, biased locking metadata.
 *           - Klass Word (32-bit with Compressed Oops, or 64-bit): pointer to Metaspace class metadata.
 *       * Instance Fields: storage for primitive fields and reference pointers.
 *       * Padding / Alignment: byte padding to ensure the object size is a multiple of 8 bytes.
 *
 * Phase 3: Default Zero-Initialization
 *   - The allocated Heap memory block is zero-initialized:
 *       * byte, short, int, long -> 0
 *       * float, double          -> 0.0
 *       * boolean                -> false
 *       * char                   -> '\u0000'
 *       * object references      -> null
 *
 * Phase 4: Explicit Field Initializers & Instance Initializer Blocks
 *   - Instance variable default assignments (e.g. status = "ACTIVE") and instance initializer
 *     blocks { ... } execute in textual declaration order.
 *
 * Phase 5: Constructor Invocation (<init>() Method)
 *   - The compiler-generated <init>() method executes:
 *       1. super() call to parent constructor (Object constructor).
 *       2. Constructor parameter validation and explicit field assignments.
 *   - Finally, the 'new' operator produces the 64-bit/32-bit Heap memory address reference,
 *     which is pushed onto the current Stack frame and assigned to the reference variable.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ObjectInstantiationNewKeywordDemo {

    // ------------------------------------------------------------------------
    // Nested Class: CourseEnrollment (Domain Entity)
    // ------------------------------------------------------------------------
    public static class CourseEnrollment {

        // --- Class-Level Constant (Metaspace / Class Area) ---
        public static final String ACADEMY_BRANCH = "Barrackpore Learning Centre";
        private static int totalEnrollmentsCounter = 0;

        // Static Initializer Block (Phase 1)
        static {
            System.out.println("  [Phase 1 - Class Loading] CourseEnrollment class metadata loaded into Metaspace.");
            System.out.println("  [Phase 1 - Class Loading] Static initialization complete. Branch: " + ACADEMY_BRANCH);
        }

        // --- Instance Fields (Heap Storage) ---
        // Phase 3 sets: enrollmentId=0, studentName=null, courseTitle=null, feePaid=0.0, ...
        // Phase 4 sets explicit initializers below:
        private int enrollmentId;
        private String studentName;
        private String courseTitle;
        private double courseFeeInr;
        private String enrollmentStatus = "REGISTERED"; // Phase 4 explicit field initializer
        private final LocalDateTime registrationTimestamp; // Must be initialized before constructor finishes

        // Instance Initializer Block (Phase 4)
        {
            totalEnrollmentsCounter++;
            this.registrationTimestamp = LocalDateTime.now();
            System.out.println("  [Phase 4 - Instance Initializer] Instance block running for Object #" + totalEnrollmentsCounter);
            System.out.println("  [Phase 4 - Instance Initializer] Pre-constructor status = '" + this.enrollmentStatus + "'");
        }

        // --- Constructor (Phase 5 - <init>() method execution) ---
        public CourseEnrollment(int enrollmentId, String studentName, String courseTitle, double courseFeeInr) {
            System.out.println("  [Phase 5 - Constructor] super() completed. Executing constructor body...");

            // Defensive Validation
            if (enrollmentId <= 0) {
                throw new IllegalArgumentException("Enrollment ID must be strictly positive.");
            }
            if (studentName == null || studentName.trim().isEmpty()) {
                throw new IllegalArgumentException("Student name cannot be blank.");
            }
            if (courseTitle == null || courseTitle.trim().isEmpty()) {
                throw new IllegalArgumentException("Course title cannot be blank.");
            }
            if (courseFeeInr < 0.0) {
                throw new IllegalArgumentException("Course fee cannot be negative.");
            }

            this.enrollmentId = enrollmentId;
            this.studentName = studentName.trim();
            this.courseTitle = courseTitle.trim();
            this.courseFeeInr = courseFeeInr;
            this.enrollmentStatus = "CONFIRMED"; // Mutate status during constructor

            System.out.println("  [Phase 5 - Constructor] Field assignment complete for: " + this.studentName);
        }

        // --- Business Behavior Methods ---
        public void displayEnrollmentCard() {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
            System.out.println("  +-----------------------------------------------------------+");
            System.out.printf("  | Enrollment ID  : ENR-%05d                                |\n", enrollmentId);
            System.out.printf("  | Student Name   : %-39s |\n", studentName);
            System.out.printf("  | Course Title   : %-39s |\n", courseTitle);
            System.out.printf("  | Course Fee     : ₹%-38.2f |\n", courseFeeInr);
            System.out.printf("  | Status         : %-39s |\n", enrollmentStatus);
            System.out.printf("  | Branch         : %-39s |\n", ACADEMY_BRANCH);
            System.out.printf("  | Registered At  : %-39s |\n", registrationTimestamp.format(dtf));
            System.out.printf("  | Identity Hash  : 0x%08X (JVM Heap Identity)        |\n", System.identityHashCode(this));
            System.out.println("  +-----------------------------------------------------------+");
        }

        public void applyScholarshipDiscount(double percentage) {
            if (percentage <= 0.0 || percentage > 100.0) {
                System.out.println("  [Warning] Invalid scholarship percentage: " + percentage + "%");
                return;
            }
            double discountAmount = (this.courseFeeInr * percentage) / 100.0;
            this.courseFeeInr -= discountAmount;
            System.out.printf("  [Scholarship Applied] %s received %.1f%% discount (-₹%.2f). New Fee: ₹%.2f\n",
                    this.studentName, percentage, discountAmount, this.courseFeeInr);
        }

        // Accessors
        public int getEnrollmentId() { return enrollmentId; }
        public String getStudentName() { return studentName; }
        public String getCourseTitle() { return courseTitle; }
        public double getCourseFeeInr() { return courseFeeInr; }
        public String getEnrollmentStatus() { return enrollmentStatus; }
        public static int getTotalEnrollmentsCounter() { return totalEnrollmentsCounter; }
    }

    // ------------------------------------------------------------------------
    // Main Method: Complete Step-by-Step Instantiation Lifecycle Demonstrations
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP FOUNDATIONS: OBJECT INSTANTIATION VIA 'new' KEYWORD");
        System.out.println(" Educator: Sukanta Hui | Locations: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Step-by-Step 5-Phase Instantiation of Object 1 (Swadeep)
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Instantiating Object 1 (Swadeep - Barrackpore Lab)");
        System.out.println("Executing: CourseEnrollment swadeepEnrollment = new CourseEnrollment(1001, \"Swadeep Paul\", \"Java Fullstack Enterprise\", 8500.00);");
        System.out.println("Tracing 5 JVM internal lifecycle phases:\n");

        CourseEnrollment swadeepEnrollment = new CourseEnrollment(
                1001,
                "Swadeep Paul",
                "Java Fullstack Enterprise",
                8500.00
        );

        System.out.println("\n[Stack Reference Created]: 'swadeepEnrollment' contains Heap pointer -> 0x"
                + Integer.toHexString(System.identityHashCode(swadeepEnrollment)).toUpperCase());
        swadeepEnrollment.displayEnrollmentCard();

        // --------------------------------------------------------------------
        // DEMO 2: Instantiating Object 2 (Tuhina) - Distinct Heap Identity
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Instantiating Object 2 (Tuhina - Naihati Centre)");
        System.out.println("Note: Class is already loaded. Phase 1 static loading is SKIPPED!\n");

        CourseEnrollment tuhinaEnrollment = new CourseEnrollment(
                1002,
                "Tuhina Das",
                "Spring Boot & Microservices",
                9500.00
        );

        tuhinaEnrollment.applyScholarshipDiscount(15.0); // 15% Merit scholarship
        tuhinaEnrollment.displayEnrollmentCard();

        // --------------------------------------------------------------------
        // DEMO 3: Instantiating Object 3 (Abhronila) - Shyamnagar Centre
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Instantiating Object 3 (Abhronila - Shyamnagar Lab)");

        CourseEnrollment abhronilaEnrollment = new CourseEnrollment(
                1003,
                "Abhronila Ray",
                "Advanced Data Structures & Algorithms",
                7500.00
        );
        abhronilaEnrollment.displayEnrollmentCard();

        // --------------------------------------------------------------------
        // DEMO 4: Demonstrating Identity Separation (Memory Addresses)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Memory Identity Comparison (Reference vs State)");
        System.out.println("Comparing Stack references using == operator (Heap memory addresses):");
        boolean isSameReference = (swadeepEnrollment == tuhinaEnrollment);
        System.out.println("  swadeepEnrollment == tuhinaEnrollment : " + isSameReference + " (Distinct Heap memory addresses)");
        System.out.printf("  Swadeep Heap Address Hash : 0x%08X\n", System.identityHashCode(swadeepEnrollment));
        System.out.printf("  Tuhina Heap Address Hash  : 0x%08X\n", System.identityHashCode(tuhinaEnrollment));
        System.out.printf("  Abhronila Heap Address Hash: 0x%08X\n", System.identityHashCode(abhronilaEnrollment));

        // --------------------------------------------------------------------
        // DEMO 5: Anonymous Object Instantiation (Fire-and-Forget)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 5: Anonymous Object Instantiation via 'new' (No Stack Reference)");
        System.out.println("Executing: new CourseEnrollment(1004, \"Debangshu Ghosh\", \"Python AI\", 6000.00).displayEnrollmentCard();");
        System.out.println("Note: No reference variable holds this object; it becomes immediately eligible for Garbage Collection after method return.\n");

        new CourseEnrollment(
                1004,
                "Debangshu Ghosh",
                "Python AI & Data Engineering",
                6000.00
        ).displayEnrollmentCard();

        // --------------------------------------------------------------------
        // DEMO 6: Total Cumulative Object Count via Static Metadata
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 6: Aggregated Class Metadata");
        System.out.println("Total CourseEnrollment instances created across all labs: "
                + CourseEnrollment.getTotalEnrollmentsCounter());

        System.out.println("\n==========================================================================");
        System.out.println(" OBJECT INSTANTIATION DEMONSTRATION COMPLETE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================");
    }
}
