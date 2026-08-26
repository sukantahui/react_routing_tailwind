/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 10: What Happens If a Child Does NOT Implement All Abstract Methods?
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class PartialSubclassingAbstractChainDemo {

    // Tier 1: Root Abstract Class (2 abstract methods)
    public abstract static class SoftwareProjectBlueprint {
        public abstract void designArchitecture();
        public abstract void implementBackend();
    }

    // Tier 2: Intermediate Abstract Class (Implements only 1 of 2 abstract methods)
    // MUST BE DECLARED ABSTRACT!
    public abstract static class ArchitecturalDraft extends SoftwareProjectBlueprint {
        @Override
        public void designArchitecture() {
            System.out.println("  [TIER 2] Architecture designed: Spring Boot Microservices + MySQL Cluster.");
        }

        // 'implementBackend()' is left unimplemented here, so ArchitecturalDraft remains abstract!
    }

    // Tier 3: Final Concrete Subclass (Implements the remaining abstract method)
    public static class CompletedProject extends ArchitecturalDraft {
        @Override
        public void implementBackend() {
            System.out.println("  [TIER 3] Backend fully implemented by Swadeep & Tuhina in Barrackpore!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: PARTIAL SUBCLASSING (ABSTRACT CHAIN) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SoftwareProjectBlueprint project = new CompletedProject();
        project.designArchitecture();
        project.implementBackend();

        System.out.println("\n==========================================================================");
    }
}