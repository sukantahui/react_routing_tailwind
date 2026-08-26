/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 15: Frame Data - Constant Pool Resolution & Exception Dispatch Tables
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class FrameDataExceptionDispatchDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: FRAME DATA & EXCEPTION DISPATCH - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 RESPONSIBILITIES OF FRAME DATA IN A STACK FRAME:");
        System.out.println("  1. DYNAMIC LINKING REFERENCE : Pointer to the Runtime Constant Pool in Metaspace (#index resolution).");
        System.out.println("  2. NORMAL RETURN COMPLETION  : Restores previous frame's PC register and pushes return value to caller's operand stack.");
        System.out.println("  3. EXCEPTION DISPATCH TABLE  : Table mapping [start_pc, end_pc, handler_pc, catch_type] to handle try-catch blocks!\n");

        // Executing try-catch to demonstrate Exception Table handling:
        int result = safeFeeCalculation(4500, 0);
        System.out.println(">>> Safe Exception Recovery Result: ₹" + result);

        System.out.println("\n==========================================================================");
    }

    static int safeFeeCalculation(int amount, int discountDivisor) {
        try {
            return amount / discountDivisor; // Throws ArithmeticException
        } catch (ArithmeticException ex) {
            System.out.println("   [EXCEPTION TABLE MATCHED]: Caught Division by Zero, fallback applied!");
            return amount; // Default fallback
        }
    }
}
