/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 13: Compiling Java to Standalone Binaries - The native-image Build Pipeline
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class NativeImageBuildPipelineDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: THE NATIVE-IMAGE BUILD PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 PHASES OF THE NATIVE-IMAGE BUILD PROCESS:");
        System.out.println("  Phase 1: Points-To Analysis (Static Reachability Graph):");
        System.out.println("           - Explores all reachable classes, methods, and fields starting from main().");
        System.out.println("  Phase 2: Build-Time Initialization (Class Initialization at Build Time):");
        System.out.println("           - Executes <clinit> static initializers at build time and snapshots heap state!");
        System.out.println("  Phase 3: Aggressive Dead-Code Stripping (Tree Shaking):");
        System.out.println("           - Erases all unused standard library and third-party classes from the binary.");
        System.out.println("  Phase 4: Graal AOT Native Code Generation:");
        System.out.println("           - Compiles reachable bytecodes into machine code (x86_64 / AArch64).");
        System.out.println("  Phase 5: Binary Linkage & Packaging:");
        System.out.println("           - Emits final standalone executable ELF (Linux), Mach-O (macOS), or PE (.exe on Windows).\n");

        System.out.println(">>> RESULT: A single self-contained ~30MB binary executable!");
        System.out.println("==========================================================================");
    }
}
