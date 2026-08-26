/**
 * ============================================================================
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 0: What is a Constructor and Why Object Initialization is Mandatory
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The Genesis of an Object in Java
 * ----------------------------------------------------------------------------
 * 1. What is a Constructor?
 *    - A specialized member block in a class that shares the EXACT name of the class
 *      and has NO return type (not even void).
 *    - It is automatically executed by the JVM at the exact moment of instantiation
 *      via the `new` operator.
 *
 * 2. Why is Object Initialization Mandatory?
 *    - Memory Safety: When `new` executes, it allocates raw zero-filled Heap memory.
 *      Without initialization, reference variables remain `null`, leading to immediate
 *      `NullPointerException` when methods are called.
 *    - Invariant Establishment: A constructor guarantees that an object is born in a
 *      valid, consistent, and legally compliant business state (e.g. Bank balance >= 0).
 *
 * 3. The 3-Step Creation Pipeline:
 *    Step 1: `new` Operator allocates raw bytes in Eden Space (Zero-Initialization).
 *    Step 2: Constructor executes, binding instance variables and running initialization logic on `this`.
 *    Step 3: The 64-bit Heap reference is returned and assigned to the Stack reference variable.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.constructors;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class ConstructorFundamentalsAndMandatoryInitDemo {

    // ------------------------------------------------------------------------
    // Part 1: THE DANGEROUS UNINITIALIZED ENTITY (Missing Mandatory Init)
    // ------------------------------------------------------------------------
    public static class UninitializedTrainee {
        public int studentId;            // Defaults to 0
        public String studentName;       // Defaults to null!
        public String enrolledCourse;    // Defaults to null!
        public double scholarshipInr;    // Defaults to 0.0

        // No explicit constructor provided (Compiler inserts no-arg constructor that does nothing)
        public void printBadge() {
            // NullPointerException risk when calling methods on studentName!
            System.out.println("    Student ID   : " + studentId);
            System.out.println("    Student Name : " + studentName);
            System.out.println("    Course Name  : " + enrolledCourse);
            System.out.println("    Scholarship  : ₹" + scholarshipInr);
        }

        public String getUppercaseName() {
            // BUG: Throws NullPointerException if studentName is null!
            return studentName.toUpperCase();
        }
    }

    // ------------------------------------------------------------------------
    // Part 2: THE FORTIFIED CONSTRUCTOR-INITIALIZED ENTITY
    // ------------------------------------------------------------------------
    public static class InitializedTrainee {
        private final int studentId;
        private final String studentName;
        private final String campusBranch;
        private final String enrolledCourse;
        private final double scholarshipInr;
        private final String registrationTimestamp;

        // Constructor establishing mandatory state and domain invariants at birth
        public InitializedTrainee(int studentId, String studentName, String campusBranch, String enrolledCourse, double scholarshipInr) {
            if (studentId <= 0) {
                throw new IllegalArgumentException("Student ID must be strictly positive. Supplied: " + studentId);
            }
            this.studentId = studentId;
            this.studentName = Objects.requireNonNull(studentName, "Student name is mandatory").trim();
            this.campusBranch = Objects.requireNonNull(campusBranch, "Campus branch is mandatory").trim();
            this.enrolledCourse = Objects.requireNonNull(enrolledCourse, "Course name is mandatory").trim();

            if (scholarshipInr < 0.0) {
                throw new IllegalArgumentException("Scholarship cannot be negative. Supplied: ₹" + scholarshipInr);
            }
            this.scholarshipInr = scholarshipInr;

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
            this.registrationTimestamp = LocalDateTime.now().format(dtf);

            System.out.printf("  [CONSTRUCTOR EXECUTED] Initialized Trainee STU-%04d (%s) at %s campus.\n",
                    this.studentId, this.studentName, this.campusBranch);
        }

        public int getStudentId() { return studentId; }
        public String getStudentName() { return studentName; }
        public String getCampusBranch() { return campusBranch; }
        public String getEnrolledCourse() { return enrolledCourse; }
        public double getScholarshipInr() { return scholarshipInr; }
        public String getRegistrationTimestamp() { return registrationTimestamp; }

        public String getUppercaseName() {
            // Guaranteed 100% NPE-safe because constructor asserted non-null!
            return studentName.toUpperCase();
        }

        public void printBadge() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | [INITIALIZED ENTITY] BARRACKPORE ACADEMY TRAINEE BADGE      |\n");
            System.out.printf("  | Student ID   : STU-%05d                                |\n", studentId);
            System.out.printf("  | Student Name : %-43s |\n", studentName);
            System.out.printf("  | Campus Hub   : %-43s |\n", campusBranch);
            System.out.printf("  | Course       : %-43s |\n", enrolledCourse);
            System.out.printf("  | Scholarship  : ₹%-42.2f |\n", scholarshipInr);
            System.out.printf("  | Registered On: %-43s |\n", registrationTimestamp);
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating Object Genesis and Initialization Safety
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: CONSTRUCTORS & MANDATORY OBJECT INITIALIZATION");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: The Hazards of Uninitialized Objects
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Uninitialized Object with Raw Default State");
        UninitializedTrainee rawTrainee = new UninitializedTrainee();
        System.out.println("  Raw instance created via new without explicit constructor:");
        rawTrainee.printBadge();

        System.out.println("\n  Attempting to call getUppercaseName() on uninitialized object:");
        try {
            rawTrainee.getUppercaseName();
        } catch (NullPointerException npe) {
            System.out.println("  [CRASH DETECTED] NullPointerException thrown because studentName was uninitialized (null)!");
        }

        // --------------------------------------------------------------------
        // DEMO 2: The Fortress of Constructor-Initialized Objects
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Initializing Objects via Parameterized Constructor");
        System.out.println("Instantiating Swadeep Paul (Barrackpore Hub):");
        InitializedTrainee swadeep = new InitializedTrainee(
                101,
                "Swadeep Paul",
                "Barrackpore Hub",
                "Java Fullstack Enterprise Architecture",
                12500.00
        );
        swadeep.printBadge();
        System.out.println("  NPE-Safe uppercase name: " + swadeep.getUppercaseName());

        System.out.println("\nInstantiating Tuhina Das (Naihati Hub):");
        InitializedTrainee tuhina = new InitializedTrainee(
                102,
                "Tuhina Das",
                "Naihati Hub",
                "Spring Boot & Cloud Native Microservices",
                15000.00
        );
        tuhina.printBadge();

        // --------------------------------------------------------------------
        // DEMO 3: Constructor Enforcing Invariants at Object Birth
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Constructor Rejecting Invalid Arguments at Birth");
        try {
            System.out.print("  Attempting to instantiate with negative scholarship (-₹5000) -> ");
            new InitializedTrainee(103, "Abhronila Ray", "Shyamnagar", "DevOps", -5000.0);
        } catch (IllegalArgumentException e) {
            System.out.println("REJECTED AT BIRTH: " + e.getMessage());
        }

        try {
            System.out.print("  Attempting to instantiate with null name -> ");
            new InitializedTrainee(104, null, "Ichapur", "DevOps", 5000.0);
        } catch (NullPointerException e) {
            System.out.println("REJECTED AT BIRTH: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" CONSTRUCTOR INITIALIZATION DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
