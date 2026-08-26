/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 11: Execution Sequence: IIB Execution Before Constructor Body
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class IIBBeforeConstructorExecutionSequenceDemo {

    // Parent Class
    public static class AcademyMember {
        {
            System.out.println("  [2] Parent IIB: Initializing AcademyMember security badge...");
        }

        public AcademyMember() {
            System.out.println("  [3] Parent Constructor: AcademyMember() completed.");
        }
    }

    // Child Class
    public static class TraineeDeveloper extends AcademyMember {
        private String traineeName;
        private int rollNumber;

        // IIB 1
        {
            System.out.println("  [4] Child IIB 1: Allocating workspace sandbox in Eden space...");
        }

        // Inline Field Initialization (runs in order with IIBs)
        private String hubCenter = initHub();

        private String initHub() {
            System.out.println("  [5] Child Field Initializer: hubCenter assigned to Barrackpore.");
            return "Barrackpore Hub";
        }

        // IIB 2
        {
            System.out.println("  [6] Child IIB 2: Validating biometric trainee signature...");
        }

        // Child Constructor
        public TraineeDeveloper(String traineeName, int rollNumber) {
            // Implicit super() runs first (Triggering Steps 2 & 3)
            // Then Child IIB 1, Field Init, and Child IIB 2 execute (Steps 4, 5, 6)
            this.traineeName = traineeName;
            this.rollNumber = rollNumber;
            System.out.printf("  [7] Child Constructor Body: Trainee %s (Roll %d) initialized successfully!\n",
                    this.traineeName, this.rollNumber);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: IIB BEFORE CONSTRUCTOR EXECUTION SEQUENCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Step 1: Initiating 'new TraineeDeveloper(\"Swadeep Paul\", 101)':\n");
        TraineeDeveloper swadeep = new TraineeDeveloper("Swadeep Paul", 101);

        System.out.println("\n>>> Full Execution Lifecycle Summary:");
        System.out.println("  1. Memory allocated on Heap (raw 0/null bytes)");
        System.out.println("  2. Parent super() constructor invoked");
        System.out.println("  3. Parent IIB executes");
        System.out.println("  4. Parent Constructor body executes");
        System.out.println("  5. Child IIBs and Field Initializers execute (top-to-bottom)");
        System.out.println("  6. Child Constructor body executes");
        System.out.println("  7. Live object pointer returned to stack");

        System.out.println("\n==========================================================================");
    }
}