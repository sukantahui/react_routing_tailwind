/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 7: Phase 3 - Initialization (<clinit>) & Static Execution Order
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class Phase3ClassInitializationDemo {

    public static class AcademyBatchTracker {
        // Step 1: Static field assignment
        public static String campus = initializeCampus();

        // Step 2: Static Initializer Block (SIB)
        static {
            System.out.println("   ⚙️ [SIB 1 EXECUTING]: Configuring Barrackpore Lab workstations...");
            labCapacity = 50;
        }

        public static int labCapacity;

        // Step 3: Second SIB
        static {
            System.out.println("   ⚙️ [SIB 2 EXECUTING]: Capacity set to: " + labCapacity + " workstations.");
        }

        private static String initializeCampus() {
            System.out.println("   ⚙️ [STATIC FIELD INIT]: Campus assigned to Barrackpore.");
            return "Barrackpore Main Hub";
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: PHASE 3 - INITIALIZATION (<clinit>) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. TRIGGERING INITIALIZATION OF AcademyBatchTracker:");
        // First active use triggers execution of the synthesized <clinit>() method:
        System.out.println("Final Campus Name: " + AcademyBatchTracker.campus);

        System.out.println("\n>>> THE <clinit>() CONTRACT:");
        System.out.println("  1. Synthesized automatically by javac combining all static initializers in source order.");
        System.out.println("  2. The JVM acquires an internal initialization lock guaranteeing thread safety.");
        System.out.println("  3. Guaranteed to execute at most once per ClassLoader lifetime.");
        System.out.println("==========================================================================");
    }
}
