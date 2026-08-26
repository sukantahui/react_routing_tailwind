/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 14: The Operand Stack - Bytecode Arithmetic & LIFO Evaluation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class OperandStackEvaluationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: THE OPERAND STACK - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> TRACING BYTECODE EVALUATION FOR: 'int result = addAndMultiply(10, 20);'");
        System.out.println("  Bytecode Sequence:");
        System.out.println("  1. bipush 10        -> [Operand Stack: 10]");
        System.out.println("  2. bipush 20        -> [Operand Stack: 10, 20]");
        System.out.println("  3. iadd             -> Pops 10 and 20, adds them -> [Operand Stack: 30]");
        System.out.println("  4. iconst_2         -> [Operand Stack: 30, 2]");
        System.out.println("  5. imul             -> Pops 30 and 2, multiplies -> [Operand Stack: 60]");
        System.out.println("  6. istore_1         -> Pops 60 and stores into LVT Slot 1 (result)!\n");

        int calculated = addAndMultiply(10, 20);
        System.out.println(">>> Verified Java Output: " + calculated);

        System.out.println("\n==========================================================================");
    }

    static int addAndMultiply(int a, int b) {
        return (a + b) * 2;
    }
}
