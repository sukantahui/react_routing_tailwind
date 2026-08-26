/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 9: The Bootstrap ClassLoader - Primordial Native Loader
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class BootstrapClassLoaderDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: THE BOOTSTRAP CLASSLOADER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. INSPECTING FUNDAMENTAL BOOTSTRAP-LOADED TYPES:");
        printLoaderInfo("java.lang.Object", Object.class);
        printLoaderInfo("java.lang.Class", Class.class);
        printLoaderInfo("java.lang.System", System.class);
        printLoaderInfo("java.lang.Thread", Thread.class);
        printLoaderInfo("java.util.Map", java.util.Map.class);

        System.out.println("\n>>> HISTORICAL EVOLUTION:");
        System.out.println("  - In Java 8 and earlier: Bootstrap loader loaded 'rt.jar' (Runtime JAR, ~65MB).");
        System.out.println("  - In Java 9 and later  : Modularized! Loads 'java.base' and core modules from 'lib/modules' (jimage format).");
        System.out.println("==========================================================================");
    }

    static void printLoaderInfo(String label, Class<?> clazz) {
        System.out.println("  - " + label + " ClassLoader: " + clazz.getClassLoader() + " (Native Bootstrap)");
    }
}
