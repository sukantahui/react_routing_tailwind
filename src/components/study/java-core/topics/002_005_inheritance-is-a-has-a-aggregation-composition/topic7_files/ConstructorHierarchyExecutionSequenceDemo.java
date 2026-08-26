/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 7: Constructor Execution Sequence in an Inheritance Hierarchy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class ConstructorHierarchyExecutionSequenceDemo {

    // Grandparent Class
    public static class GrandParent {
        public GrandParent() {
            System.out.println("  [1] GrandParent Constructor: Foundation established.");
        }
    }

    // Parent Class
    public static class Parent extends GrandParent {
        public Parent() {
            // Implicit super() invokes GrandParent()
            System.out.println("  [2] Parent Constructor: Intermediate tier configured.");
        }
    }

    // Child Class
    public static class Child extends Parent {
        public Child() {
            // Implicit super() invokes Parent()
            System.out.println("  [3] Child Constructor: Final specialized instance ready!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CONSTRUCTOR EXECUTION SEQUENCE IN HIERARCHY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Instantiating Child object ('new Child()'):\n");
        Child c = new Child();

        System.out.println("\n>>> Order of Execution Rule:");
        System.out.println("  Constructors execute Top-Down from Object -> GrandParent -> Parent -> Child!");

        System.out.println("\n==========================================================================");
    }
}