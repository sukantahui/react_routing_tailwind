/**
 * Java Core Tutorial - Module 007_002: List Implementations & ArrayList Internals
 * Topic 1: java.util.ArrayList Internal Mechanics: The Backing Object[] elementData Array
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class ArrayListBackingArrayInternalsDemo {

    // Inspecting private transient Object[] elementData array via Reflection:
    private static void inspectArrayListCapacity(String label, ArrayList<?> list) throws Exception {
        Field elementDataField = ArrayList.class.getDeclaredField("elementData");
        elementDataField.setAccessible(true);
        Object[] elementData = (Object[]) elementDataField.get(list);

        System.out.printf("  [%-15s] Size (elements): %-2d | Internal Capacity (elementData.length): %-2d%n",
                label, list.size(), (elementData == null ? 0 : elementData.length));
    }

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: ArrayList BACKING ARRAY (elementData) INTERNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Inspecting Initial State (Lazy Allocation):");
        ArrayList<String> studentList = new ArrayList<>();
        inspectArrayListCapacity("New ArrayList()", studentList); // Points to DEFAULTCAPACITY_EMPTY_ELEMENTDATA (length 0)

        System.out.println("\n>>> 2. Adding First Element (Triggers Expansion to Default 10):");
        studentList.add("Swadeep Paul (Barrackpore)");
        inspectArrayListCapacity("After 1st Add", studentList); // Expanded to 10!

        System.out.println("\n>>> 3. Adding 9 More Elements (Fills Capacity to 10):");
        for (int i = 2; i <= 10; i++) {
            studentList.add("Student " + i);
        }
        inspectArrayListCapacity("After 10 Adds", studentList); // Size = 10, Capacity = 10

        System.out.println("\n>>> 4. Adding 11th Element (Triggers 1.5x Expansion to 15!):");
        studentList.add("Student 11 (Triggers Growth)");
        inspectArrayListCapacity("After 11th Add", studentList); // Expanded to 15!

        System.out.println("\n>>> WHAT IS 'transient Object[] elementData'?");
        System.out.println("  1. The underlying contiguous heap array where ArrayList stores element references.");
        System.out.println("  2. 'transient': Marked transient because custom 'writeObject()' serializes only active elements, not empty buffer slots.");

        System.out.println("\n==========================================================================");
    }
}