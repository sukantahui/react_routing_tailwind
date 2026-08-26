/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 13: Local Variable Table (LVT) - Slot Indexing & Slot Reuse
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class LocalVariableTableLvtDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: LOCAL VARIABLE TABLE (LVT) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        LocalVariableTableLvtDemo demo = new LocalVariableTableLvtDemo();
        demo.demonstrateSlots("Swadeep Paul", 101, 94.5);

        System.out.println("\n>>> LVT SLOT REUSE MECHANISM:");
        System.out.println("  - When a block '{ int temp = 10; }' ends, slot allocated to 'temp' is freed.");
        System.out.println("  - Subsequent local variables in the same method reuse the exact same slot index!");
        System.out.println("  - Saves stack frame memory consumption!");
        System.out.println("==========================================================================");
    }

    // Inspecting Slot Layout:
    // Slot 0: this (instance reference)
    // Slot 1: studentName (Object reference - 1 slot)
    // Slot 2: studentId (int - 1 slot)
    // Slot 3 & 4: score (double - 64-bit takes 2 slots!)
    public void demonstrateSlots(String studentName, int studentId, double score) {
        System.out.println(">>> 1. LVT SLOTS ALLOCATED FOR THIS METHOD:");
        System.out.println("  - Slot 0 : 'this' instance pointer (" + this.getClass().getSimpleName() + ")");
        System.out.println("  - Slot 1 : studentName = '" + studentName + "'");
        System.out.println("  - Slot 2 : studentId   = " + studentId);
        System.out.println("  - Slot 3/4: score      = " + score + " (64-bit double occupies 2 slots)");

        {
            // Block scoped variable:
            int tempTax = 500;
            System.out.println("  - Slot 5 : tempTax = " + tempTax + " (In active block scope)");
        } // tempTax goes out of scope here!

        // Slot 5 is REUSED by discountCode:
        int discountCode = 9942;
        System.out.println("  - Slot 5 [REUSED] : discountCode = " + discountCode);
    }
}
