/**
 * ============================================================================
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 2: Constructors vs Methods: Detailed Comparison Table
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The 10-Point Architectural Comparison Matrix
 * ----------------------------------------------------------------------------
 * ----------------------------------------------------------------------------
 * FEATURE               CONSTRUCTOR                        METHOD
 * ----------------------------------------------------------------------------
 * 1. Primary Purpose    Initialize newly allocated Heap    Execute business behavior or
 *                       memory and establish invariants.   perform calculations on state.
 * 2. Invocation Trigger Implicitly by JVM during `new`.    Explicitly by caller via dot (.).
 * 3. Return Type        NO return type (not even void).    MANDATORY return type or void.
 * 4. Identifier Name    Must match class name EXACTLY.     Any valid identifier (camelCase).
 * 5. Inheritance        NOT inherited by subclasses.       Inherited by subclasses.
 * 6. Overriding         CANNOT be overridden.              CAN be overridden polymorphically.
 * 7. Default Generated  Compiler supplies default if none. Compiler NEVER generates methods.
 * 8. Static Modifier    PROHIBITED (needs 'this' context). PERMITTED for utility routines.
 * 9. Other Modifiers    Only access modifiers permitted.   final, abstract, synchronized, native.
 * 10. Bytecode Opcode   `invokespecial <init>`             `invokevirtual`, `invokestatic`, etc.
 * ----------------------------------------------------------------------------
 * ============================================================================
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.Objects;

public class ConstructorsVsMethodsComparisonDemo {

    // ------------------------------------------------------------------------
    // Domain Class: ScholarshipCandidate (Illustrating Constructors vs Methods)
    // ------------------------------------------------------------------------
    public static class ScholarshipCandidate {

        // --- Instance State ---
        private final int candidateId;
        private final String candidateName;
        private final String campusHub;
        private double entranceMarksPercentage;
        private double awardedScholarshipInr;
        private boolean isApproved = false;

        // ====================================================================
        // CONSTRUCTOR: Executed ONCE at birth via 'new'
        // ====================================================================
        // - Name matches class exactly
        // - NO return type
        // - Cannot be static or final
        // - Opcode: invokespecial <init>
        public ScholarshipCandidate(int candidateId, String candidateName, String campusHub, double entranceMarks) {
            if (candidateId <= 0) throw new IllegalArgumentException("ID must be positive.");
            if (entranceMarks < 0.0 || entranceMarks > 100.0) {
                throw new IllegalArgumentException("Marks must be 0-100: " + entranceMarks);
            }

            this.candidateId = candidateId;
            this.candidateName = Objects.requireNonNull(candidateName, "Name required").trim();
            this.campusHub = Objects.requireNonNull(campusHub, "Campus required").trim();
            this.entranceMarksPercentage = entranceMarks;
            this.awardedScholarshipInr = 0.0;

            System.out.printf("  [CONSTRUCTOR <init>] Candidate CAND-%04d (%s) instantiated at %s.\n",
                    this.candidateId, this.candidateName, this.campusHub);
        }

        // ====================================================================
        // METHOD 1: Instance Method (Mutates state, can be called repeatedly)
        // ====================================================================
        // - Has return type (boolean)
        // - Custom name: evaluateAndAwardScholarship
        // - Invoked explicitly via dot operator
        // - Opcode: invokevirtual
        public boolean evaluateAndAwardScholarship(double minCutoff, double baseScholarshipInr) {
            if (this.entranceMarksPercentage >= minCutoff) {
                this.awardedScholarshipInr = baseScholarshipInr;
                this.isApproved = true;
                System.out.printf("  [METHOD evaluate] %s approved for ₹%,.2f scholarship (Marks: %.1f%% >= %.1f%% cutoff)\n",
                        candidateName, awardedScholarshipInr, entranceMarksPercentage, minCutoff);
                return true;
            } else {
                this.isApproved = false;
                System.out.printf("  [METHOD evaluate] %s did not meet cutoff (Marks: %.1f%% < %.1f%% cutoff)\n",
                        candidateName, entranceMarksPercentage, minCutoff);
                return false;
            }
        }

        // ====================================================================
        // METHOD 2: Static Utility Method (Class-level behavior, no 'this')
        // ====================================================================
        public static double calculateGstOnScholarship(double scholarshipAmount) {
            // Static method belongs to the class, not individual instances
            return scholarshipAmount * 0.18; // 18% GST calculation
        }

        // Getters
        public int getCandidateId() { return candidateId; }
        public String getCandidateName() { return candidateName; }
        public double getEntranceMarksPercentage() { return entranceMarksPercentage; }
        public double getAwardedScholarshipInr() { return awardedScholarshipInr; }
        public boolean isApproved() { return isApproved; }

        public void printBadge() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.printf("  | CANDIDATE BADGE : CAND-%05d                               |\n", candidateId);
            System.out.printf("  | Candidate Name  : %-41s |\n", candidateName);
            System.out.printf("  | Campus Hub      : %-41s |\n", campusHub);
            System.out.printf("  | Entrance Marks  : %-40.1f%% |\n", entranceMarksPercentage);
            System.out.printf("  | Scholarship Amt : ₹%-40.2f |\n", awardedScholarshipInr);
            System.out.printf("  | Approval Status : %-41s |\n", (isApproved ? "APPROVED" : "PENDING"));
            System.out.println("  +-------------------------------------------------------------+");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of Constructor vs Method
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: CONSTRUCTORS VS METHODS COMPARISON");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Printing the 10-Point Comparison Matrix
        // --------------------------------------------------------------------
        System.out.println(">>> THE 10-POINT CONSTRUCTOR VS METHOD COMPARISON MATRIX:");
        System.out.println("  +----+---------------------+-----------------------------+-----------------------------+");
        System.out.println("  | #  | Feature             | Constructor                 | Method                      |");
        System.out.println("  +----+---------------------+-----------------------------+-----------------------------+");
        System.out.println("  | 1  | Purpose             | Initialize Heap memory      | Execute behavior / compute  |");
        System.out.println("  | 2  | Invocation Trigger  | Implicitly via 'new'        | Explicitly via dot (.)      |");
        System.out.println("  | 3  | Return Type         | NO return type (not void)   | Mandatory return type/void  |");
        System.out.println("  | 4  | Identifier Name     | Must match class exactly    | Any camelCase identifier    |");
        System.out.println("  | 5  | Inheritance         | NOT inherited by child      | Inherited by child classes  |");
        System.out.println("  | 6  | Overriding          | CANNOT be overridden        | CAN be overridden           |");
        System.out.println("  | 7  | Default Generated   | Provided if none written    | Never generated by compiler |");
        System.out.println("  | 8  | static Modifier     | Prohibited                  | Permitted                   |");
        System.out.println("  | 9  | other Modifiers     | Access modifiers only       | final, abstract, sync, etc. |");
        System.out.println("  | 10 | Bytecode Opcode     | invokespecial <init>        | invokevirtual, invokestatic |");
        System.out.println("  +----+---------------------+-----------------------------+-----------------------------+\n");

        // --------------------------------------------------------------------
        // DEMO 2: Executing Constructor (Genesis) vs Method (Behavior)
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: Instantiation (Constructor) for Swadeep Paul (Barrackpore):");
        ScholarshipCandidate swadeep = new ScholarshipCandidate(101, "Swadeep Paul", "Barrackpore Hub", 92.5);

        System.out.println("\n>>> DEMO 3: Invoking Instance Method Repeatedly via Dot Operator:");
        // Method can be called multiple times across object lifecycle
        swadeep.evaluateAndAwardScholarship(85.0, 15000.00);
        swadeep.printBadge();

        System.out.println("\n>>> DEMO 4: Instantiating Tuhina Das (Naihati) & Testing Evaluation:");
        ScholarshipCandidate tuhina = new ScholarshipCandidate(102, "Tuhina Das", "Naihati Hub", 88.0);
        tuhina.evaluateAndAwardScholarship(85.0, 15000.00);
        tuhina.printBadge();

        System.out.println("\n>>> DEMO 5: Calling Static Class Method (No Object Instance Needed):");
        double gst = ScholarshipCandidate.calculateGstOnScholarship(15000.00);
        System.out.printf("  Static calculation on ₹15,000.00 scholarship: ₹%,.2f GST\n", gst);

        System.out.println("\n==========================================================================");
        System.out.println(" CONSTRUCTORS VS METHODS COMPARISON COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
