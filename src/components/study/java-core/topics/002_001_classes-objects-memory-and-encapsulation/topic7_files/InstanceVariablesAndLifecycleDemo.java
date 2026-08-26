/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 7: Instance Variables: Default Initialization Values & Object Lifecycle
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: Instance Variables & The 8-Stage Object Lifecycle
 * ----------------------------------------------------------------------------
 * 1. What are Instance Variables (Non-Static Fields)?
 *    - Variables declared inside a class body but outside any method or constructor.
 *    - Each instantiated object on the Heap gets its own independent copy of every
 *      instance variable.
 *    - Unlike local variables (which reside on the Stack and must be explicitly initialized),
 *      instance variables reside on the Heap and are AUTOMATICALLY initialized to
 *      type-safe default values by the JVM before constructor execution.
 *
 * 2. JVM Default Initialization Table:
 *    -------------------------------------------------------------------------
 *    DATA TYPE                      DEFAULT VALUE
 *    -------------------------------------------------------------------------
 *    byte, short, int, long         0 / 0L
 *    float, double                  0.0f / 0.0d
 *    boolean                        false
 *    char                           '\u0000' (Unicode NUL character)
 *    Object Reference (String, etc) null
 *    -------------------------------------------------------------------------
 *
 * 3. The 8 Stages of the Java Object Lifecycle:
 *    Stage 1: Class Loading & Static Initialization (Metaspace <clinit>)
 *    Stage 2: Heap Memory Allocation (Eden space byte calculation)
 *    Stage 3: Default Zero-Initialization (Wiping memory with 0 / null)
 *    Stage 4: Explicit Field Initializers (textual top-to-bottom order)
 *    Stage 5: Instance Initializer Blocks ({ ... } execution)
 *    Stage 6: Constructor Execution (<init> method body completion)
 *    Stage 7: In-Use / Reachable State (Active references on Stack/GC Roots)
 *    Stage 8: Unreachable & Garbage Collection (Memory reclaimed to Eden/Tenured)
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

import java.time.Instant;

public class InstanceVariablesAndLifecycleDemo {

    // ------------------------------------------------------------------------
    // Domain Class: TraineeProfile (Demonstrating Default Field Values)
    // ------------------------------------------------------------------------
    public static class TraineeProfile {

        // --- All 8 Java Primitive Types + Object References as Instance Variables ---
        // These are intentionally left without explicit initializers to verify JVM defaults:
        private byte defaultByte;
        private short defaultShort;
        private int defaultInt;
        private long defaultLong;
        private float defaultFloat;
        private double defaultDouble;
        private boolean defaultBoolean;
        private char defaultChar;
        private String defaultStringRef;
        private int[] defaultArrayRef;

        // Explicitly Initialized Instance Fields (Evaluated during Stage 4)
        private String studentName = "Pending Enrollment";
        private String campusBranch = "Barrackpore Academy";
        private double scholarshipFeeInr = 5000.00;
        private final long creationTimestamp;

        // Instance Initializer Block (Evaluated during Stage 5)
        {
            this.creationTimestamp = System.currentTimeMillis();
            System.out.println("  [Lifecycle Stage 5] Instance Initializer Block running at epoch: " + this.creationTimestamp);
        }

        // Constructor 1: Default Constructor (No arguments)
        public TraineeProfile() {
            System.out.println("  [Lifecycle Stage 6] Default Constructor executed.");
        }

        // Constructor 2: Parameterized Constructor
        public TraineeProfile(String studentName, String campusBranch, double scholarshipFeeInr) {
            this.studentName = studentName;
            this.campusBranch = campusBranch;
            this.scholarshipFeeInr = scholarshipFeeInr;
            System.out.println("  [Lifecycle Stage 6] Parameterized Constructor initialized profile for: " + this.studentName);
        }

        // Print Default Zero-Initialization Inspection Table
        public void displayDefaultInitializationTable() {
            System.out.println("  +-------------------------------------------------------------+");
            System.out.println("  | JVM DEFAULT ZERO-INITIALIZATION VALUES (HOTSPOT HEAP)       |");
            System.out.println("  +----------------------+--------------------+-----------------+");
            System.out.println("  | Field Type           | Variable Name      | Default Value   |");
            System.out.println("  +----------------------+--------------------+-----------------+");
            System.out.printf("  | byte                 | defaultByte        | %-15d |\n", defaultByte);
            System.out.printf("  | short                | defaultShort       | %-15d |\n", defaultShort);
            System.out.printf("  | int                  | defaultInt         | %-15d |\n", defaultInt);
            System.out.printf("  | long                 | defaultLong        | %-15d |\n", defaultLong);
            System.out.printf("  | float                | defaultFloat       | %-15.1f |\n", defaultFloat);
            System.out.printf("  | double               | defaultDouble      | %-15.1f |\n", defaultDouble);
            System.out.printf("  | boolean              | defaultBoolean     | %-15b |\n", defaultBoolean);
            System.out.printf("  | char                 | defaultChar        | '\\u%04x' (NUL)  |\n", (int) defaultChar);
            System.out.printf("  | String (Reference)   | defaultStringRef   | %-15s |\n", String.valueOf(defaultStringRef));
            System.out.printf("  | int[] (Array Ref)    | defaultArrayRef    | %-15s |\n", String.valueOf(defaultArrayRef));
            System.out.println("  +----------------------+--------------------+-----------------+");
        }

        public void displayActiveCard() {
            System.out.printf("  [ACTIVE PROFILE] Name: %-15s | Campus: %-12s | Fee: ₹%,.2f | Created: %s\n",
                    studentName, campusBranch, scholarshipFeeInr, Instant.ofEpochMilli(creationTimestamp));
        }

        // Getters
        public String getStudentName() { return studentName; }
        public String getCampusBranch() { return campusBranch; }
        public double getScholarshipFeeInr() { return scholarshipFeeInr; }
    }

    // ------------------------------------------------------------------------
    // Method: Contrasting Instance Variable vs Local Variable Initialization
    // ------------------------------------------------------------------------
    public static void contrastInstanceVsLocalVariables() {
        System.out.println(">>> CONTRASTING INSTANCE VS LOCAL VARIABLE INITIALIZATION:");

        // 1. Instance variable can be read immediately after 'new' without explicit assignment
        TraineeProfile profile = new TraineeProfile();
        System.out.println("  Reading unassigned instance variable 'defaultInt': " + profile.defaultInt + " (JVM zeroed)");
        System.out.println("  Reading unassigned instance variable 'defaultBoolean': " + profile.defaultBoolean + " (JVM zeroed)");

        // 2. Local variable: MUST be assigned before reading
        int localUnassignedInt; // Declared on Stack Frame
        // System.out.println(localUnassignedInt); // COMPILE ERROR: variable localUnassignedInt might not have been initialized
        localUnassignedInt = 42; // Explicit assignment required
        System.out.println("  Reading local variable after explicit assignment: " + localUnassignedInt);
    }

    // ------------------------------------------------------------------------
    // Main Method: Full 8-Stage Lifecycle Walkthrough
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA CORE: INSTANCE VARIABLES & THE 8-STAGE OBJECT LIFECYCLE");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Default Zero-Initialization Inspection
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 1: Inspecting JVM Automatic Default Zero-Initialization");
        TraineeProfile blankProfile = new TraineeProfile();
        blankProfile.displayDefaultInitializationTable();

        // --------------------------------------------------------------------
        // DEMO 2: Explicit Initialization & Constructor Parameterization
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 2: Creating Active Initialized Objects (Swadeep & Tuhina)");
        TraineeProfile swadeep = new TraineeProfile(
                "Swadeep Paul",
                "Barrackpore Lab",
                8500.00
        );
        swadeep.displayActiveCard();

        TraineeProfile tuhina = new TraineeProfile(
                "Tuhina Das",
                "Naihati Centre",
                9200.00
        );
        tuhina.displayActiveCard();

        // --------------------------------------------------------------------
        // DEMO 3: Contrasting Local vs Instance Variables
        // --------------------------------------------------------------------
        System.out.println("");
        contrastInstanceVsLocalVariables();

        // --------------------------------------------------------------------
        // DEMO 4: Object Lifecycle Termination (Stage 7 -> Stage 8)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Object Lifecycle Transition to Unreachable State");
        System.out.println("Swadeep object currently reachable at Heap address: 0x"
                + Integer.toHexString(System.identityHashCode(swadeep)).toUpperCase());

        System.out.println("Executing: swadeep = null; (Severing Stack GC Root)");
        swadeep = null;
        System.out.println("The Swadeep TraineeProfile instance is now UNREACHABLE (Stage 8).");
        System.out.println("JVM Garbage Collector will reclaim its Heap bytes in the next GC cycle.");

        System.out.println("\n==========================================================================");
        System.out.println(" INSTANCE VARIABLES & OBJECT LIFECYCLE DEMO COMPLETE");
        System.out.println("==========================================================================");
    }
}
