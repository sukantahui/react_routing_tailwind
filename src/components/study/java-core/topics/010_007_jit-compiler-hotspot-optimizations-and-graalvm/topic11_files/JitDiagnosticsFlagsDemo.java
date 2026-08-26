/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 11: JIT Diagnostics Flags - -XX:+PrintCompilation & -XX:+PrintInlining
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class JitDiagnosticsFlagsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: JIT DIAGNOSTICS FLAGS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 ESSENTIAL JIT DIAGNOSTIC FLAGS:");
        System.out.println("  1. -XX:+PrintCompilation                 : Logs every JIT compilation event to stdout.");
        System.out.println("  2. -XX:+UnlockDiagnosticVMOptions        : Unlocks advanced JIT diagnostic flags.");
        System.out.println("  3. -XX:+PrintInlining                    : Displays complete tree of which methods were inlined.");
        System.out.println("  4. -XX:+PrintAssembly                    : Disassembles native machine code (requires hsdis plugin).\n");

        System.out.println(">>> DECODING A -XX:+PrintCompilation LOG LINE:");
        System.out.println("  152   4       com.coderaccotax.Student::getFee (5 bytes)");
        System.out.println("  │     │       │                                │");
        System.out.println("  │     │       │                                └── Bytecode length");
        System.out.println("  │     │       └─────────────────────────────────── Method signature");
        System.out.println("  │     └─────────────────────────────────────────── Tiered Level (4 = C2 Server JIT)");
        System.out.println("  └───────────────────────────────────────────────── Timestamp (ms since JVM boot)");

        System.out.println("\n==========================================================================");
    }
}
