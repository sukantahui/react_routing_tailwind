/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 17: Histogram View - Shallow Heap vs Retained Heap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class HistogramShallowVsRetainedHeapDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: SHALLOW HEAP VS RETAINED HEAP - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> SHALLOW HEAP VS RETAINED HEAP DEFINITIONS:");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  METRIC             DEFINITION                                            TYPICAL EXAMPLE");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  Shallow Heap Size  Memory consumed by the object's OWN fields/header.    HashMap instance = 48 bytes");
        System.out.println("  Retained Heap Size Total memory that would be FREED if this object is GC'd. Map + 50,000 entries = 250 MB!");
        System.out.println("  --------------------------------------------------------------------------------------------------\n");

        System.out.println(">>> WHY THIS MATTERS IN PRODUCTION TRIAGE:");
        System.out.println("  - Sorting a Histogram by Shallow Heap shows 'byte[]' and 'java.lang.String' at the top (symptom, not cause!).");
        System.out.println("  - Sorting by Retained Heap reveals the real culprit (the Cache or Service object holding those bytes!).");

        System.out.println("\n==========================================================================");
    }
}
