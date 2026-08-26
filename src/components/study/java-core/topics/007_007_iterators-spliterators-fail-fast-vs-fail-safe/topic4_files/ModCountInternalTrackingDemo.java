/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 4: The 'modCount' Internal Mechanism: Structural Modification Tracking
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class ModCountInternalTrackingDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: THE 'modCount' INTERNAL MECHANISM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ArrayList<String> list = new ArrayList<>();

        // Access protected transient int modCount field via reflection:
        Field modCountField = ArrayList.class.getSuperclass().getDeclaredField("modCount");
        modCountField.setAccessible(true);

        System.out.println(">>> 1. Inspecting modCount Across Structural Operations:");
        System.out.println("  Initial modCount (empty list) : " + modCountField.getInt(list));

        list.add("Swadeep (Barrackpore)");
        System.out.println("  After list.add()              : " + modCountField.getInt(list));

        list.add("Tuhina (Naihati)");
        System.out.println("  After 2nd list.add()          : " + modCountField.getInt(list));

        list.set(0, "Swadeep Paul"); // Non-structural modification! (Replacing existing index)
        System.out.println("  After list.set(0, val)        : " + modCountField.getInt(list) + " (Unchanged! set() is NOT structural!)");

        list.remove(0); // Structural modification!
        System.out.println("  After list.remove(0)          : " + modCountField.getInt(list) + " (Incremented by remove!)");

        System.out.println("\n>>> WHAT CONSTITUTES A 'STRUCTURAL MODIFICATION'?");
        System.out.println("  1. Structural Mutations (modCount++)   : Any operation that changes the SIZE of the collection (add, remove, clear, ensureCapacity resize).");
        System.out.println("  2. Non-Structural Mutations (NO modCount): 'list.set(index, value)' changes an element's reference, but does NOT change size or invalidate iterator indexes.");

        System.out.println("\n==========================================================================");
    }
}