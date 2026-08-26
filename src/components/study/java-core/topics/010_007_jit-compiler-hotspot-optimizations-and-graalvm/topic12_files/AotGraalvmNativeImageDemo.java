/**
 * Java Core Tutorial - Module 010_007: JIT Compiler, HotSpot Optimizations & GraalVM
 * Topic 12: Ahead-Of-Time (AOT) Compilation - GraalVM Native Image Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jit;

public class AotGraalvmNativeImageDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: GRAALVM NATIVE IMAGE (AOT COMPILATION) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> TRADITIONAL JIT JVM VS GRAALVM NATIVE IMAGE (AOT):");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  CHARACTERISTIC       TRADITIONAL JIT JVM           GRAALVM NATIVE IMAGE (AOT)");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  Executable Format    Bytecode .class / .jar files  Standalone Native Binary (.exe / ELF)");
        System.out.println("  JVM Requirement      Requires installed JDK/JRE    Zero JVM needed (Embeds SubstrateVM)");
        System.out.println("  Startup Time         1 - 5 seconds                 0.005 seconds (< 10 ms!)");
        System.out.println("  Memory Footprint     200MB - 500MB baseline        15MB - 30MB baseline");
        System.out.println("  Compilation Timing   Just-In-Time during execution Ahead-Of-Time at build time");
        System.out.println("  Peak Throughput      Maximum (Profile-Guided)      Near Peak (with PGO)");
        System.out.println("  -----------------------------------------------------------------------------------------\n");

        System.out.println(">>> BUILDING A NATIVE IMAGE:");
        System.out.println("  Command: native-image -jar application.jar -o payment-service");
        System.out.println("==========================================================================");
    }
}
