/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 12: Deep Dive into Thread Stack Frames - LVT, Operand Stack & Frame Data
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class ThreadStackFramesOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: THREAD STACK FRAMES DECONSTRUCTED - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 INTERNAL SECTIONS OF A JVM STACK FRAME:");
        System.out.println("  ┌─────────────────────────────────────────────────────────────┐");
        System.out.println("  │                      JVM STACK FRAME                        │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 1. LOCAL VARIABLE TABLE (LVT)                               │");
        System.out.println("  │    - Stores parameters (slot 0 = 'this') & local variables. │");
        System.out.println("  │    - 32-bit types use 1 slot; 64-bit (long/double) use 2.   │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 2. OPERAND STACK (LIFO Evaluation Workspace)                │");
        System.out.println("  │    - Pushes operands, performs arithmetic (iadd), pops.     │");
        System.out.println("  ├─────────────────────────────────────────────────────────────┤");
        System.out.println("  │ 3. FRAME DATA                                               │");
        System.out.println("  │    - Runtime Constant Pool reference (#index).              │");
        System.out.println("  │    - Normal method return completion info.                  │");
        System.out.println("  │    - Exception dispatch handler table.                      │");
        System.out.println("  └─────────────────────────────────────────────────────────────┘");

        // Executing arithmetic to demonstrate stack frame evaluation:
        int result = calculateCourseFee(4000, 500);
        System.out.println("\n>>> Method execution completed with result: ₹" + result);

        System.out.println("\n==========================================================================");
    }

    static int calculateCourseFee(int baseFee, int labFee) {
        // LVT: Slot 0 = baseFee, Slot 1 = labFee, Slot 2 = total
        // Operand Stack: iload_0 (4000) -> iload_1 (500) -> iadd (4500) -> istore_2
        int total = baseFee + labFee;
        return total;
    }
}
