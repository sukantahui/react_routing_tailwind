/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 5: Optimizing ArrayList: ensureCapacity(int) & trimToSize() Memory Tuning
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class ArrayListCapacityOptimizationDemo {

    private static int getInternalCapacity(ArrayList<?> list) throws Exception {
        Field elementDataField = ArrayList.class.getDeclaredField("elementData");
        elementDataField.setAccessible(true);
        Object[] elementData = (Object[]) elementDataField.get(list);
        return elementData == null ? 0 : elementData.length;
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ArrayList OPTIMIZATION (ensureCapacity & trimToSize) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // SCENARIO 1: We know upfront that 50,000 records will be loaded:
        System.out.println(">>> 1. Using ensureCapacity(50000) to Pre-Allocate in 1 Shot:");
        ArrayList<String> optimizedList = new ArrayList<>();
        optimizedList.ensureCapacity(50000); // Pre-allocates array of 50,000 slots!
        System.out.println("  Capacity after ensureCapacity(50000): " + getInternalCapacity(optimizedList));

        // SCENARIO 2: Ingest 30,000 records, leaving 20,000 empty slots:
        for (int i = 0; i < 30000; i++) {
            optimizedList.add("Record " + i);
        }
        System.out.printf("  Current State: Size=%d, Internal Capacity=%d (20,000 wasted slots!)%n",
                optimizedList.size(), getInternalCapacity(optimizedList));

        // SCENARIO 3: Releasing wasted heap memory via trimToSize():
        System.out.println("\n>>> 2. Releasing Memory via trimToSize():");
        optimizedList.trimToSize();
        System.out.printf("  State after trimToSize(): Size=%d, Internal Capacity=%d (Zero wasted memory!)%n",
                optimizedList.size(), getInternalCapacity(optimizedList));

        System.out.println("\n>>> 2 GOLDEN RULES FOR ArrayList PERFORMANCE:");
        System.out.println("  1. Bulk Load Upfront : Use 'new ArrayList<>(expectedSize)' or 'ensureCapacity(n)' to eliminate all resize array allocations.");
        System.out.println("  2. Long-Lived Caches : Call 'trimToSize()' on static/long-lived lists after loading to reclaim unused heap memory.");

        System.out.println("\n==========================================================================");
    }
}