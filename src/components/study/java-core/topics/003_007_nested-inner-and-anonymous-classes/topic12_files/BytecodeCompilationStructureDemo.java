/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 12: Bytecode Analysis: How javac Compiles Inner Classes (Outer$Inner.class, Outer$1.class)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class BytecodeCompilationStructureDemo {

    // 1. Compiled to: BytecodeCompilationStructureDemo$NamedInner.class
    public class NamedInner {
        public void test() {}
    }

    // 2. Compiled to: BytecodeCompilationStructureDemo$StaticHelper.class
    public static class StaticHelper {
        public void test() {}
    }

    public void runDemo() {
        // 3. Compiled to: BytecodeCompilationStructureDemo$1MethodLocal.class
        class MethodLocal {
            public void test() {}
        }
        new MethodLocal().test();

        // 4. Compiled to: BytecodeCompilationStructureDemo$1.class
        Runnable r1 = new Runnable() {
            @Override
            public void run() {}
        };

        // 5. Compiled to: BytecodeCompilationStructureDemo$2.class
        Runnable r2 = new Runnable() {
            @Override
            public void run() {}
        };
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: BYTECODE COMPILATION STRUCTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> How 'javac' Generates .class Files on Disk for Nested Classes:");
        System.out.println("  1. BytecodeCompilationStructureDemo.class               (Outer Class)");
        System.out.println("  2. BytecodeCompilationStructureDemo$NamedInner.class       (Member Inner)");
        System.out.println("  3. BytecodeCompilationStructureDemo$StaticHelper.class     (Static Nested)");
        System.out.println("  4. BytecodeCompilationStructureDemo$1MethodLocal.class     (Method Local)");
        System.out.println("  5. BytecodeCompilationStructureDemo$1.class                (1st Anonymous Class)");
        System.out.println("  6. BytecodeCompilationStructureDemo$2.class                (2nd Anonymous Class)");

        System.out.println("\n>>> KEY INSIGHT: The JVM itself has NO concept of inner classes!");
        System.out.println("  The Java compiler flattens all nested classes into top-level classes using '$' separators!");

        System.out.println("\n==========================================================================");
    }
}