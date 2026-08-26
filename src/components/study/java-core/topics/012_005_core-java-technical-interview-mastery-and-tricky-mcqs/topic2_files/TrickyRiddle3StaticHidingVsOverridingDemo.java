/**
 * Java Core Tutorial - Module 012_005: Interview Mastery & Tricky MCQs
 * Topic 2: Tricky Riddle 3 - Static Variable Hiding & Overriding Traps
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interview;

public class TrickyRiddle3StaticHidingVsOverridingDemo {

    public static class Parent {
        public static String name = "Parent Static Field";
        public static void print() {
            System.out.println("Parent static print()");
        }
        public void instancePrint() {
            System.out.println("Parent instance print()");
        }
    }

    public static class Child extends Parent {
        public static String name = "Child Static Field"; // Hides Parent.name
        public static void print() {
            System.out.println("Child static print()"); // Hides Parent.print()
        }
        @Override
        public void instancePrint() {
            System.out.println("Child instance print() - Polymorphic Overriding!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TRICKY RIDDLE 3: STATIC METHOD & FIELD HIDING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Parent parentRef = new Child();

        System.out.println("1. Static Field Access (parentRef.name):");
        System.out.println("   -> " + parentRef.name); // "Parent Static Field"

        System.out.println("
2. Static Method Call (parentRef.print()):");
        System.out.print("   -> ");
        parentRef.print(); // Calls Parent.print()! (Static method hiding)

        System.out.println("
3. Instance Method Call (parentRef.instancePrint()):");
        System.out.print("   -> ");
        parentRef.instancePrint(); // Calls Child.instancePrint()! (Dynamic dispatch)

        System.out.println("\n==========================================================================");
    }
}
