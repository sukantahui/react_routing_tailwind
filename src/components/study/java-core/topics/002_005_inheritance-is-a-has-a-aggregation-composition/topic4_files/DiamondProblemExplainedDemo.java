/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 4: Why Multiple Inheritance with Classes is NOT Supported (The Diamond Problem)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class DiamondProblemExplainedDemo {

    // ========================================================================
    // THE DIAMOND PROBLEM EXPLAINED:
    // ========================================================================
    // Suppose Java allowed: class Child extends ParentA, ParentB
    //
    //              [ Class GrandParent ]
    //                 /             \
    //      [ Class ParentA ]    [ Class ParentB ]
    //       (void show())         (void show())
    //                 \             /
    //               [ Class Child ]
    //
    // If Child calls 'child.show()', which parent method should execute?
    // ParentA.show() or ParentB.show()?
    // This creates fatal AMBIGUITY in compiler method resolution and memory layout!
    //
    // Therefore, James Gosling and the Java design team intentionally OMITTED
    // multiple class inheritance to keep Java simple, robust, and unambiguous!
    // ========================================================================

    public static class ParentA {
        public void executeTask() { System.out.println("  [PARENT A] Task executed via Strategy A"); }
    }

    public static class ParentB {
        public void executeTask() { System.out.println("  [PARENT B] Task executed via Strategy B"); }
    }

    // The Java Solution: FAVOR COMPOSITION & INTERFACES!
    public static class SolutionChild {
        private ParentA strategyA = new ParentA();
        private ParentB strategyB = new ParentB();

        public void executeA() { strategyA.executeTask(); }
        public void executeB() { strategyB.executeTask(); }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE DIAMOND PROBLEM & MULTIPLE INHERITANCE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SolutionChild child = new SolutionChild();
        child.executeA();
        child.executeB();

        System.out.println("\n==========================================================================");
    }
}