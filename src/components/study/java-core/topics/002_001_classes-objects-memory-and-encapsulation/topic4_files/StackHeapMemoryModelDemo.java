/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 4: Memory Model: Reference Variables on Stack Pointing to Object Instances on Heap
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Architecture: JVM Runtime Data Areas (Stack vs Heap)
 * ----------------------------------------------------------------------------
 * 1. Thread Call Stack (Thread-Private, Fast, LIFO Lifecycle):
 *    - Each thread has its own private execution Stack.
 *    - Whenever a method is invoked, a new 'Stack Frame' is pushed onto the stack.
 *    - Stack Frame contains:
 *        a) Local Variable Table (primitives like int, double, boolean + reference pointers).
 *        b) Operand Stack (temporary computation evaluation).
 *        c) Frame Data (return values, exception dispatch tables).
 *    - When the method finishes execution, the Stack Frame is popped immediately,
 *      reclaiming memory with zero Garbage Collector overhead!
 *
 * 2. JVM Heap Memory (Thread-Shared, Dynamic, GC Managed):
 *    - Shared globally across all application threads.
 *    - All object instances, arrays, and instance variables live on the Heap.
 *    - Divided into Young Generation (Eden, Survivor S0, Survivor S1) and
 *      Old/Tenured Generation.
 *    - Objects remain on the Heap until no reachable reference paths exist from GC Roots,
 *      at which point the Garbage Collector recycles the memory.
 *
 * 3. Reference Semantics in Java:
 *    - Java is STRICTLY PASS-BY-VALUE.
 *    - For primitive variables: the actual numeric/boolean literal value is copied.
 *    - For object references: the 64-bit/32-bit MEMORY ADDRESS POINTER is copied by value.
 *    - Modifying state via `ref.field = val` mutates the shared Heap object!
 *    - Reassigning `ref = new Object()` merely changes the local pointer on the current Stack Frame.
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

public class StackHeapMemoryModelDemo {

    // ------------------------------------------------------------------------
    // Domain Class: StudentScholarshipRecord (Lives on Heap)
    // ------------------------------------------------------------------------
    public static class StudentScholarshipRecord {
        private int studentId;
        private String studentName;
        private String campusBranch;
        private double scholarshipAmountInr;

        public StudentScholarshipRecord(int studentId, String studentName, String campusBranch, double scholarshipAmountInr) {
            this.studentId = studentId;
            this.studentName = studentName;
            this.campusBranch = campusBranch;
            this.scholarshipAmountInr = scholarshipAmountInr;
        }

        // State Mutation Behavior
        public void awardBonus(double bonusInr) {
            this.scholarshipAmountInr += bonusInr;
        }

        public void relocateBranch(String newBranch) {
            this.campusBranch = newBranch;
        }

        public void printState(String label) {
            System.out.printf("  [%-18s] ID: %d | Name: %-15s | Campus: %-12s | Scholarship: ₹%,9.2f | Heap Hash: 0x%08X\n",
                    label, studentId, studentName, campusBranch, scholarshipAmountInr, System.identityHashCode(this));
        }

        public int getStudentId() { return studentId; }
        public String getStudentName() { return studentName; }
        public String getCampusBranch() { return campusBranch; }
        public double getScholarshipAmountInr() { return scholarshipAmountInr; }
    }

    // ------------------------------------------------------------------------
    // Method 1: Demonstrating Pass-by-Value on Object References (Mutating State)
    // ------------------------------------------------------------------------
    public static void upgradeScholarship(StudentScholarshipRecord recordParam, double bonusInr) {
        System.out.println("  --> [Entering upgradeScholarship() Stack Frame]");
        System.out.printf("      recordParam Stack pointer value: 0x%08X (Copied Reference Value)\n",
                System.identityHashCode(recordParam));

        // Mutating the object on the shared Heap
        recordParam.awardBonus(bonusInr);
        recordParam.relocateBranch("Barrackpore Central");

        System.out.println("      State modified via recordParam on shared Heap!");
        System.out.println("  <-- [Exiting upgradeScholarship() Stack Frame Popped]\n");
    }

    // ------------------------------------------------------------------------
    // Method 2: Demonstrating Reference Reassignment inside a Method (No External Effect)
    // ------------------------------------------------------------------------
    public static void attemptReferenceReassignment(StudentScholarshipRecord recordParam) {
        System.out.println("  --> [Entering attemptReferenceReassignment() Stack Frame]");
        System.out.printf("      Initial recordParam pointer: 0x%08X\n", System.identityHashCode(recordParam));

        // Reassigning local parameter to point to a BRAND NEW Heap object
        recordParam = new StudentScholarshipRecord(9999, "Temp Student", "Naihati Lab", 1000.0);
        System.out.printf("      Reassigned recordParam to new Heap Object: 0x%08X\n",
                System.identityHashCode(recordParam));
        recordParam.printState("Inside Method After Reassign");

        System.out.println("      Local pointer changed; original caller Stack reference remains untouched!");
        System.out.println("  <-- [Exiting attemptReferenceReassignment() Stack Frame Popped]\n");
    }

    // ------------------------------------------------------------------------
    // Method 3: Recursive Stack Frame Depth Demonstration
    // ------------------------------------------------------------------------
    public static void traceStackDepth(int currentDepth, int maxDepth, StudentScholarshipRecord sharedRef) {
        if (currentDepth > maxDepth) {
            System.out.printf("      [Max Depth %d Reached] Stack contains %d active frames all pointing to Heap 0x%08X\n",
                    maxDepth, maxDepth, System.identityHashCode(sharedRef));
            return;
        }
        traceStackDepth(currentDepth + 1, maxDepth, sharedRef);
    }

    // ------------------------------------------------------------------------
    // Main Method: Complete Stack vs Heap Lifetime & Pass-by-Value Visualizer
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA JVM MEMORY MODEL: STACK VS HEAP ARCHITECTURE");
        System.out.println(" Mentor: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // SCENARIO 1: Stack Frame Allocation for Primitives vs Heap References
        // --------------------------------------------------------------------
        System.out.println(">>> SCENARIO 1: Local Variables on main() Stack Frame");
        int baseBatchYear = 2026;                       // Primitive: value 2026 stored directly on Stack
        double minimumStipend = 5000.00;                 // Primitive: 8-byte IEEE 754 value on Stack

        // Heap Object Allocation: 'swadeep' holds 64-bit Heap address pointer
        StudentScholarshipRecord swadeep = new StudentScholarshipRecord(
                101, "Swadeep Paul", "Barrackpore", 12000.00
        );

        // Another Heap Object: 'tuhina' holds distinct Heap pointer
        StudentScholarshipRecord tuhina = new StudentScholarshipRecord(
                102, "Tuhina Das", "Naihati", 14500.00
        );

        System.out.println("  Stack Local Variable 'baseBatchYear'   : " + baseBatchYear + " (Direct Value on Stack)");
        System.out.println("  Stack Local Variable 'minimumStipend' : ₹" + minimumStipend + " (Direct Value on Stack)");
        System.out.printf("  Stack Reference Var  'swadeep'        : Points to Heap 0x%08X\n", System.identityHashCode(swadeep));
        System.out.printf("  Stack Reference Var  'tuhina'         : Points to Heap 0x%08X\n", System.identityHashCode(tuhina));

        System.out.println("\nInitial State on Heap:");
        swadeep.printState("Swadeep Initial");
        tuhina.printState("Tuhina Initial");

        // --------------------------------------------------------------------
        // SCENARIO 2: Pass-by-Value Reference Passing & Heap State Mutation
        // --------------------------------------------------------------------
        System.out.println("\n>>> SCENARIO 2: Passing Reference to Method upgradeScholarship(swadeep, 3000.0)");
        System.out.println("Calling upgradeScholarship()...");
        upgradeScholarship(swadeep, 3000.00);

        System.out.println("State in main() after upgradeScholarship() returned:");
        swadeep.printState("Swadeep Post-Upgrade");

        // --------------------------------------------------------------------
        // SCENARIO 3: Pass-by-Value Reference Reassignment Test
        // --------------------------------------------------------------------
        System.out.println("\n>>> SCENARIO 3: Attempting Reference Reassignment inside attemptReferenceReassignment(tuhina)");
        System.out.println("Calling attemptReferenceReassignment()...");
        attemptReferenceReassignment(tuhina);

        System.out.println("State in main() after attemptReferenceReassignment() returned:");
        tuhina.printState("Tuhina Unaffected");

        // --------------------------------------------------------------------
        // SCENARIO 4: Stack Frame Push & Pop Recursion Visualization
        // --------------------------------------------------------------------
        System.out.println("\n>>> SCENARIO 4: Tracing Deep Stack Frames with Shared Heap Reference");
        System.out.println("Invoking recursive method to build 5 Stack Frames holding the same Heap pointer:");
        traceStackDepth(1, 5, swadeep);

        // --------------------------------------------------------------------
        // SCENARIO 5: Demonstrating Null Reference on Stack
        // --------------------------------------------------------------------
        System.out.println("\n>>> SCENARIO 5: Nullifying Reference on Stack");
        StudentScholarshipRecord temporaryStudent = new StudentScholarshipRecord(
                103, "Abhronila Ray", "Shyamnagar", 16000.00
        );
        temporaryStudent.printState("Abhronila Active");

        System.out.println("Executing: temporaryStudent = null; (Stack variable pointer wiped to 0x00000000)");
        temporaryStudent = null;
        System.out.println("  temporaryStudent is now null. The Abhronila object in Heap is orphaned and eligible for GC.");

        System.out.println("\n==========================================================================");
        System.out.println(" STACK VS HEAP MEMORY MODEL DEMONSTRATION COMPLETE");
        System.out.println("==========================================================================");
    }
}
