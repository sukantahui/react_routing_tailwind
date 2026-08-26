/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 3: Implementing Multiple Interfaces: Safe Multiple Inheritance in Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class MultipleInterfacesImplementationDemo {

    // Capability 1: Printable Badge
    public interface PrintableBadge {
        void printBadge();
    }

    // Capability 2: Cloud Access
    public interface CloudSandboxAccess {
        void grantAwsSandbox(String labId);
    }

    // Capability 3: Placement Eligible
    public interface PlacementEligible {
        void registerPlacementDrive(String company);
    }

    // Class implementing MULTIPLE interfaces (Comma-separated list):
    public static class FullStackTrainee implements PrintableBadge, CloudSandboxAccess, PlacementEligible {
        private String name;

        public FullStackTrainee(String name) { this.name = name; }

        @Override
        public void printBadge() {
            System.out.printf("  [BADGE] Trainee: %s | Coder & AccoTax Barrackpore\n", name);
        }

        @Override
        public void grantAwsSandbox(String labId) {
            System.out.printf("  [AWS CLOUD] Sandbox allocated: %s for %s\n", labId, name);
        }

        @Override
        public void registerPlacementDrive(String company) {
            System.out.printf("  [PLACEMENT] %s registered for %s campus drive!\n", name, company);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: MULTIPLE INTERFACES IMPLEMENTATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FullStackTrainee swadeep = new FullStackTrainee("Swadeep Paul");

        // Fulfilling all 3 independent capabilities:
        swadeep.printBadge();
        swadeep.grantAwsSandbox("AWS-LAB-NODE-77");
        swadeep.registerPlacementDrive("TCS Digital");

        System.out.println("\n==========================================================================");
    }
}