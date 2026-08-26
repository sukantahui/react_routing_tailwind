/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 11: Composition (Strong Association): Ownership and Shared Lifecycle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class CompositionStrongAssociationDemo {

    // Tightly Bound Component: MicroprocessorEngine
    public static class MicroprocessorEngine {
        private String cpuModel;

        public MicroprocessorEngine(String cpuModel) {
            this.cpuModel = cpuModel;
            System.out.println("  [ENGINE BORN] Microprocessor instantiated: " + cpuModel);
        }

        public void process() {
            System.out.println("  [ENGINE PROCESSING] " + cpuModel + " executing instructions...");
        }
    }

    // COMPOSITION: LabComputer OWNS MicroprocessorEngine
    // Shared Lifecycle: LabComputer creates its own engine inside its constructor;
    // If LabComputer is destroyed, its internal Engine is destroyed with it!
    public static class LabComputer {
        private String stationId;
        private MicroprocessorEngine internalEngine; // Owned exclusively

        public LabComputer(String stationId, String cpuModel) {
            this.stationId = stationId;
            // STRONG OWNERSHIP: Component is born with parent!
            this.internalEngine = new MicroprocessorEngine(cpuModel);
        }

        public void operate() {
            System.out.println("  [WORKSTATION OPERATING] " + stationId);
            this.internalEngine.process();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: COMPOSITION (STRONG ASSOCIATION) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating LabComputer (Instantiates internal Engine automatically):");
        LabComputer pc = new LabComputer("BKP-LAB-NODE-01", "Intel Core i9-14900K");
        pc.operate();

        System.out.println("\n>>> 2. Architectural Rule of Composition:");
        System.out.println("  - Strong 'Part-Whole' ownership relationship.");
        System.out.println("  - The part CANNOT exist meaningfully without its whole container.");

        System.out.println("\n==========================================================================");
    }
}