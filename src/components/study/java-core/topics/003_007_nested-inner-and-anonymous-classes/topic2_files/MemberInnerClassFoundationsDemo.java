/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 2: Non-Static Member Inner Class: Implicit Reference & Access to Outer Private Fields
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class MemberInnerClassFoundationsDemo {

    private String academyName = "Coder & AccoTax Academy";
    private String branch = "Barrackpore Main Campus";
    private int batchStrength = 45;

    // Non-Static Member Inner Class:
    public class BatchCoordinator {
        private String coordinatorName = "Swadeep Paul";

        public void printBatchSummary() {
            // Can seamlessly access all outer private fields without getters:
            System.out.println("  Coordinator   : " + coordinatorName);
            System.out.println("  Academy       : " + academyName);
            System.out.println("  Branch        : " + branch);
            System.out.println("  Total Trainees: " + batchStrength);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: MEMBER INNER CLASS FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Step 1: Create an enclosing Outer class instance:
        MemberInnerClassFoundationsDemo outerCampus = new MemberInnerClassFoundationsDemo();

        // Step 2: Create the Member Inner Class instance bound to outerCampus:
        MemberInnerClassFoundationsDemo.BatchCoordinator coordinator = outerCampus.new BatchCoordinator();

        System.out.println(">>> Executing Member Inner Class Method:");
        coordinator.printBatchSummary();

        System.out.println("\n>>> NOTE: A Member Inner class instance CANNOT exist without an enclosing Outer class instance!");

        System.out.println("\n==========================================================================");
    }
}