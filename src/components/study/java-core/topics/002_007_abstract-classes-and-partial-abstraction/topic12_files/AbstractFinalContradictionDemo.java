/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 12: Can an Abstract Class Be Final? (Illegal Modifier Combinations)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractFinalContradictionDemo {

    // ========================================================================
    // CONTRADICTORY MODIFIERS:
    // 'abstract': Demands to be extended by subclasses!
    // 'final'   : Forbids extension by subclasses!
    //
    // Combining them: 'final abstract class Impossible {}' -> COMPILE ERROR!
    // Javac error: "illegal combination of modifiers: abstract and final"
    // ========================================================================

    public abstract static class ValidAbstractBase {
        public abstract void executeService();
    }

    public static final class ValidFinalLeaf extends ValidAbstractBase {
        @Override
        public void executeService() {
            System.out.println("  [LEAF CLASS] Final concrete leaf node successfully executed!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: 'abstract' AND 'final' ARE OPPOSITES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ValidAbstractBase base = new ValidFinalLeaf();
        base.executeService();

        System.out.println("\n>>> Summary of Opposing Modifiers:");
        System.out.println("  - 'abstract class' -> MUST be inherited.");
        System.out.println("  - 'final class'    -> CANNOT be inherited.");
        System.out.println("  - 'final abstract' -> Direct logical contradiction (Compile Error).");

        System.out.println("\n==========================================================================");
    }
}