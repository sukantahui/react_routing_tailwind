/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 2: The PRESENT Dummy Value: How HashSet Stores Elements as Keys in HashMap
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class HashSetPresentDummyValueDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE PRESENT DUMMY VALUE IN HashSet - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Inspecting private static final Object PRESENT constant in HashSet:
        Field presentField = HashSet.class.getDeclaredField("PRESENT");
        presentField.setAccessible(true);
        Object presentObject = presentField.get(null);

        System.out.println(">>> 1. Inspecting 'PRESENT' Dummy Constant:");
        System.out.println("  PRESENT Value Object : " + presentObject);
        System.out.println("  PRESENT Class Name   : " + presentObject.getClass().getName());

        // Inspecting internal HashMap entry values:
        HashSet<String> courses = new HashSet<>();
        courses.add("Java Core (Barrackpore)");
        courses.add("Spring Boot (Naihati)");

        Field mapField = HashSet.class.getDeclaredField("map");
        mapField.setAccessible(true);
        HashMap<?, ?> internalMap = (HashMap<?, ?>) mapField.get(courses);

        System.out.println("\n>>> 2. Inspecting Backing HashMap Key-Value Entries:");
        for (Map.Entry<?, ?> entry : internalMap.entrySet()) {
            System.out.printf("  Key (Set Element): %-25s | Value (Dummy): %s (Same PRESENT instance? %b)%n",
                    entry.getKey(), entry.getValue(), (entry.getValue() == presentObject));
        }

        System.out.println("\n>>> WHY JAVAC USES A SINGLE 'PRESENT' DUMMY OBJECT:");
        System.out.println("  1. Memory Efficiency : Only ONE static instance of 'new Object()' is created for the entire JVM life cycle.");
        System.out.println("  2. Map Compatibility: Every entry in the backing HashMap points its value reference to that exact same single PRESENT instance.");

        System.out.println("\n==========================================================================");
    }
}