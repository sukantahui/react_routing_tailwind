/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 10: G1 Garbage Collector - Region-Based Heap & Pause-Time Target (Java 9+ Default)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class G1GarbageCollectorDefaultDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: G1 GARBAGE COLLECTOR (JAVA 9+ DEFAULT) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW G1 GC REVOLUTIONIZED HEAP LAYOUT:");
        System.out.println("  1. No Contiguous Generations : Heap is split into ~2,048 equal-sized 'Regions' (1MB to 32MB each).");
        System.out.println("  2. Dynamic Region Roles      : A region can dynamically be Eden (E), Survivor (S), Old (O), or Humongous (H).");
        System.out.println("  3. 'Garbage-First' Heuristic : G1 tracks the amount of reclaimable garbage in each region.");
        System.out.println("  4. Mixed Collection          : Collects all Young regions + selected Old regions with the highest garbage payoff!\n");

        System.out.println(">>> G1 GC TUNING FLAGS:");
        System.out.println("  - Enabled by Default (Java 9+) : -XX:+UseG1GC");
        System.out.println("  - Target Max Pause Time        : -XX:MaxGCPauseMillis=200 (Default: 200ms soft goal)");
        System.out.println("  - Initiating Heap Occupancy    : -XX:InitiatingHeapOccupancyPercent=45 (Starts concurrent cycle at 45% heap)");
        System.out.println("  - Region Size                  : -XX:G1HeapRegionSize=16m");

        System.out.println("\n==========================================================================");
    }
}
