/**
 * Java Core Tutorial - Module 010_003: JVM Architecture, ClassLoaders & Bytecode Execution
 * Topic 1: The 3 Major Phases of the ClassLoader Subsystem
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jvm;

public class ThreeClassLoaderPhasesDemo {

    public static class PhaseLifecycleTracker {
        // Preparation phase sets count = 0 (default).
        // Initialization phase assigns count = 100 and executes SIB!
        public static int count = 100;

        static {
            System.out.println("   ⚙️ [PHASE 3: INITIALIZATION]: Static Initializer Block (SIB) executed!");
            System.out.println("   ⚙️ [PHASE 3]: count initialized to: " + count);
        }
    }

    public static void main(String[] args) throws ClassNotFoundException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 3 CLASSLOADER PHASES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. TRIGGERING CLASS LOADING WITHOUT INITIALIZATION (initialize = false):");
        // Class.forName with initialize = false only runs Phase 1 (Loading) and Phase 2 (Linking):
        Class<?> clazz = Class.forName(
            "com.coderaccotax.javatutorial.jvm.ThreeClassLoaderPhasesDemo$PhaseLifecycleTracker",
            false, // Do NOT initialize yet!
            ThreeClassLoaderPhasesDemo.class.getClassLoader()
        );
        System.out.println("  - Phase 1 & 2 completed: Class object created in Metaspace: " + clazz.getSimpleName());
        System.out.println("  - Notice that Static Initializer Block has NOT executed yet!\n");

        System.out.println(">>> 2. TRIGGERING PHASE 3 (INITIALIZATION) via First Active Use:");
        // Accessing static field count triggers Phase 3:
        int value = PhaseLifecycleTracker.count;
        System.out.println("  - Active use triggered initialization. Final static value: " + value);

        System.out.println("\n==========================================================================");
    }
}
