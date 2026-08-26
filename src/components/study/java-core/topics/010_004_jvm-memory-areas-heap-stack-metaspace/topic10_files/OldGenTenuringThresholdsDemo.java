/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 10: Old Generation - Tenured Promotion & MaxTenuringThreshold
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class OldGenTenuringThresholdsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: OLD GENERATION & TENURING PROMOTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. OBJECT PROMOTION LIFECYCLE (EDEN -> SURVIVOR -> OLD GEN):");
        System.out.println("  - New Object Born (Eden)       : Age = 0");
        System.out.println("  - Survives Minor GC #1 (S0)    : Age = 1");
        System.out.println("  - Survives Minor GC #2 (S1)    : Age = 2");
        System.out.println("  - ... Survives Minor GC #15    : Age = 15 (Max Age!)\n");

        System.out.println(">>> 2. PROMOTION TRIGGER:");
        System.out.println("  - Once an object's age exceeds '-XX:MaxTenuringThreshold=15':");
        System.out.println("  - The object is PROMOTED into the OLD / TENURED GENERATION!\n");

        System.out.println(">>> 3. PREMATURE PROMOTION & DIRECT OLD GEN ALLOCATION:");
        System.out.println("  - Large Objects: If an object exceeds '-XX:PretenureSizeThreshold', it bypasses Eden and goes straight to Old Gen!");
        System.out.println("  - Dynamic Tenuring: If a Survivor space is over 50% full (TargetSurvivorRatio), younger objects are promoted early!");

        System.out.println("\n==========================================================================");
    }
}
