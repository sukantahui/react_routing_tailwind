/**
 * ============================================================================
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 1: Rules of Writing Constructors: Name Matches Class, No Return Type
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The 5 Golden Rules of Constructor Syntax
 * ----------------------------------------------------------------------------
 * 1. RULE 1: Exact Name Match
 *    - The constructor name MUST match the enclosing class name with exact case sensitivity.
 *    - Example: Class `CourseEnrollment` -> Constructor `public CourseEnrollment(...)`.
 *
 * 2. RULE 2: No Return Type (Not Even 'void')
 *    - Constructors have NO return type whatsoever.
 *    - If you write `public void CourseEnrollment(...)`, the Java compiler treats it
 *      as a standard instance METHOD rather than a constructor!
 *
 * 3. RULE 3: Permitted Access Modifiers
 *    - Constructors CAN have: `public`, `protected`, package-private (no modifier), or `private`.
 *
 * 4. RULE 4: Prohibited Modifiers
 *    - Constructors CANNOT be: `static`, `final`, `abstract`, `synchronized`, `native`, or `strictfp`.
 *    - Attempting any of these produces a compile-time error.
 *
 * 5. RULE 5: Invocation Mechanism
 *    - Constructors CANNOT be called directly like normal methods (`obj.CourseEnrollment()`).
 *    - They are invoked ONLY via `new`, `this(...)`, or `super(...)`.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.Objects;

public class ConstructorRulesAndSyntaxDemo {

    // ------------------------------------------------------------------------
    // Part 1: THE TRAP - Accidental 'void' Method vs True Constructor
    // ------------------------------------------------------------------------
    public static class CourseRegistrationTrap {
        private String studentName;
        private double feeInr;
        private boolean isProperlyConstructed = false;

        // --- TRAP: THIS IS A METHOD, NOT A CONSTRUCTOR! ---
        // Notice the 'void' return type!
        public void CourseRegistrationTrap(String name, double fee) {
            System.out.println("  [ACCIDENTAL METHOD EXECUTED] This is a NORMAL METHOD, not a constructor!");
            this.studentName = name;
            this.feeInr = fee;
            this.isProperlyConstructed = true;
        }

        // Implicit default no-arg constructor runs when 'new CourseRegistrationTrap()' is called!

        public String getStudentName() { return studentName; }
        public double getFeeInr() { return feeInr; }
        public boolean isProperlyConstructed() { return isProperlyConstructed; }
    }

    // ------------------------------------------------------------------------
    // Part 2: THE PROPER CONSTRUCTOR - Compliant with All 5 Golden Rules
    // ------------------------------------------------------------------------
    public static class ProperCourseRegistration {
        private final int registrationId;
        private final String studentName;
        private final String campusLocation;
        private final double feeInr;
        private final boolean isScholarshipGranted;

        // --- TRUE CONSTRUCTOR: Name matches class, NO return type ---
        public ProperCourseRegistration(int regId, String name, String campus, double fee, boolean scholarship) {
            if (regId <= 0) throw new IllegalArgumentException("Registration ID must be positive.");
            if (fee < 0.0) throw new IllegalArgumentException("Fee cannot be negative.");

            this.registrationId = regId;
            this.studentName = Objects.requireNonNull(name, "Name required").trim();
            this.campusLocation = Objects.requireNonNull(campus, "Campus required").trim();
            this.feeInr = fee;
            this.isScholarshipGranted = scholarship;

            System.out.printf("  [PROPER CONSTRUCTOR] Initialized Registration REG-%04d for %s at %s.\n",
                    this.registrationId, this.studentName, this.campusLocation);
        }

        public int getRegistrationId() { return registrationId; }
        public String getStudentName() { return studentName; }
        public String getCampusLocation() { return campusLocation; }
        public double getFeeInr() { return feeInr; }
        public boolean isScholarshipGranted() { return isScholarshipGranted; }

        public void printBadge() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | REGISTRATION BADGE: REG-%05d                             |\n", registrationId);
            System.out.printf("  | Student Name      : %-39s |\n", studentName);
            System.out.printf("  | Campus Location   : %-39s |\n", campusLocation);
            System.out.printf("  | Course Fee        : ₹%-38.2f |\n", feeInr);
            System.out.printf("  | Has Scholarship   : %-39b |\n", isScholarshipGranted);
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Demonstrating Constructor Rules & The 'void' Method Trap
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: RULES OF WRITING CONSTRUCTORS & THE 'void' TRAP");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: The 'void' Constructor Trap in Action
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: The Accidental 'void' Return Type Trap");
        System.out.println("Executing: CourseRegistrationTrap trap = new CourseRegistrationTrap();");
        CourseRegistrationTrap trap = new CourseRegistrationTrap();

        System.out.println("Checking fields right after 'new':");
        System.out.println("  studentName           : " + trap.getStudentName() + " (null!)");
        System.out.println("  feeInr                : ₹" + trap.getFeeInr() + " (0.0!)");
        System.out.println("  isProperlyConstructed : " + trap.isProperlyConstructed() + " (false!)");
        System.out.println("Why? Because 'public void CourseRegistrationTrap' was treated as a METHOD and was NEVER executed by 'new'!");

        System.out.println("\nManually invoking the fake constructor method: trap.CourseRegistrationTrap(\"Swadeep\", 8500.0);");
        trap.CourseRegistrationTrap("Swadeep Paul", 8500.0);
        System.out.println("  studentName after method call: " + trap.getStudentName());
        System.out.println("  Result: Adding 'void' completely destroys constructor semantics!\n");

        // --------------------------------------------------------------------
        // DEMO 2: The 5 Golden Rules in Proper Construction
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: Proper Constructor Invocation (Swadeep Paul - Barrackpore Hub)");
        ProperCourseRegistration regSwadeep = new ProperCourseRegistration(
                101, "Swadeep Paul", "Barrackpore Hub", 12000.00, true
        );
        regSwadeep.printBadge();

        System.out.println("\n>>> DEMO 3: Proper Constructor Invocation (Tuhina Das - Naihati Hub)");
        ProperCourseRegistration regTuhina = new ProperCourseRegistration(
                102, "Tuhina Das", "Naihati Hub", 14500.00, true
        );
        regTuhina.printBadge();

        // --------------------------------------------------------------------
        // DEMO 4: Summary of Permitted and Prohibited Modifiers
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Constructor Modifiers Summary");
        System.out.println("  [PERMITTED MODIFIERS]:");
        System.out.println("    &check; public          : Accessible globally across all packages");
        System.out.println("    &check; protected       : Accessible in same package + cross-package subclasses");
        System.out.println("    &check; default (none)  : Accessible strictly within same package");
        System.out.println("    &check; private         : Accessible only within enclosing class (Singletons/Utility)");
        System.out.println("\n  [PROHIBITED MODIFIERS (Causes Compile-Time Error)]:");
        System.out.println("    &cross; static          : Compile Error (No 'this' instance context)");
        System.out.println("    &cross; final           : Compile Error (Constructors are never overridden)");
        System.out.println("    &cross; abstract        : Compile Error (Constructors must have bodies to init memory)");
        System.out.println("    &cross; synchronized    : Compile Error (Creating thread has exclusive access)");

        System.out.println("\n==========================================================================");
        System.out.println(" CONSTRUCTOR RULES & SYNTAX DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
