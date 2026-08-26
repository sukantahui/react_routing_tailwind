/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 0: Architectural Overview of the Java Virtual Machine
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;

public class JvmArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: ARCHITECTURAL OVERVIEW OF THE JVM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        RuntimeMXBean runtimeBean = ManagementFactory.getRuntimeMXBean();
        Runtime runtime = Runtime.getRuntime();

        System.out.println(">>> 1. RUNTIME JVM INSTANCE DIAGNOSTICS:");
        System.out.println("  - JVM Implementation  : " + runtimeBean.getVmName() + " (" + runtimeBean.getVmVendor() + ")");
        System.out.println("  - JVM Version         : " + runtimeBean.getVmVersion());
        System.out.println("  - Available CPU Cores : " + runtime.availableProcessors());
        System.out.println("  - Total Heap Memory   : " + (runtime.totalMemory() / (1024 * 1024)) + " MB");
        System.out.println("  - Max Heap Memory     : " + (runtime.maxMemory() / (1024 * 1024)) + " MB");

        System.out.println("\n>>> THE 4 CORE SUBSYSTEMS OF THE JVM:");
        System.out.println("  1. CLASSLOADER SUBSYSTEM : Loads, Links, and Initializes .class bytecode files into memory.");
        System.out.println("  2. RUNTIME DATA AREAS    : Heap, JVM Stacks, Metaspace/Method Area, PC Registers, Native Stacks.");
        System.out.println("  3. EXECUTION ENGINE      : Bytecode Interpreter, JIT Compiler (C1/C2 Tiered), Garbage Collector.");
        System.out.println("  4. NATIVE METHOD INTERFACE: JNI bridging to C/C++ native system libraries.");

        System.out.println("\n==========================================================================");
    }
}
