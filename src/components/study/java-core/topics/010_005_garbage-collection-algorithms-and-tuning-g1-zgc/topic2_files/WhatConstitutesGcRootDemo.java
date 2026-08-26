/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 2: What Constitutes a GC Root? - The 4 Primary Root Sources
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class WhatConstitutesGcRootDemo {

    // GC ROOT CATEGORY 2: Static variable held in Metaspace/Class
    public static StudentRegistry globalAcademyRegistry = new StudentRegistry("Barrackpore Master Registry");

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: WHAT CONSTITUTES A GC ROOT - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // GC ROOT CATEGORY 1: Local variable in active Thread Stack frame
        StudentSession localSession = new StudentSession("Swadeep Paul");

        // GC ROOT CATEGORY 4: Synchronized Monitor Lock
        Object monitorLock = new Object();
        synchronized (monitorLock) {
            System.out.println(">>> 1. ACTIVE GC ROOTS IN THIS JVM EXECUTION:");
            System.out.println("  - [GC ROOT 1]: Active Thread Stack Local Var -> 'localSession' (" + localSession.name + ")");
            System.out.println("  - [GC ROOT 2]: Static Class Variable in Metaspace -> 'globalAcademyRegistry' (" + globalAcademyRegistry.registryName + ")");
            System.out.println("  - [GC ROOT 3]: JNI Native References -> Global / Local C++ JNI handles");
            System.out.println("  - [GC ROOT 4]: Active Thread Synchronization Monitor -> 'monitorLock'");
        }

        System.out.println("\n==========================================================================");
    }

    public static class StudentRegistry {
        public String registryName;
        public StudentRegistry(String name) { this.registryName = name; }
    }

    public static class StudentSession {
        public String name;
        public StudentSession(String name) { this.name = name; }
    }
}
