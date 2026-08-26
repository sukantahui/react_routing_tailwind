/**
 * Java Core Tutorial - Module 007_003: Set Implementations & TreeSet Internals
 * Topic 1: java.util.HashSet Internal Mechanics: Backed Internally by a HashMap Instance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;

public class HashSetHashMapBackingInternalsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: HashSet BACKED BY HashMap INTERNALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        HashSet<String> studentSet = new HashSet<>();
        studentSet.add("Swadeep Paul (Barrackpore)");
        studentSet.add("Tuhina Das (Naihati)");

        // Inspecting private transient HashMap<E,Object> map field inside HashSet:
        Field mapField = HashSet.class.getDeclaredField("map");
        mapField.setAccessible(true);
        HashMap<?, ?> internalMap = (HashMap<?, ?>) mapField.get(studentSet);

        System.out.println(">>> 1. Reflecting Inside HashSet's Private State:");
        System.out.println("  HashSet Class          : " + studentSet.getClass().getName());
        System.out.println("  Internal Backing Object: " + internalMap.getClass().getName());
        System.out.println("  Internal Map Size      : " + internalMap.size());
        System.out.println("  Internal Map Entries   : " + internalMap);

        System.out.println("\n>>> HOW HashSet ACTUALLY WORKS UNDER THE HOOD:");
        System.out.println("  - A 'HashSet' is NOT a separate data structure at all!");
        System.out.println("  - In JDK source code: 'private transient HashMap<E,Object> map;'");
        System.out.println("  - When you call 'hashSet.add(e)', it literally calls: 'map.put(e, PRESENT) == null'!");
        System.out.println("  - Your set elements become the KEYS of the internal HashMap!");

        System.out.println("\n==========================================================================");
    }
}