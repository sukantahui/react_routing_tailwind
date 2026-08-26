/**
 * Java Core Tutorial - Module 007_008: Sorting, Comparable, Comparator & Collections
 * Topic 15: Zero-Allocation Singletons & Empty Collections: emptyList() & singletonList()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SingletonAndEmptyCollectionsDemo {

    // Clean zero-allocation null-safe method:
    public static List<String> findStudentsByHub(String hubLocation) {
        if ("Barrackpore".equalsIgnoreCase(hubLocation)) {
            return List.of("Swadeep", "Tuhina", "Abhronila");
        } else if ("Naihati".equalsIgnoreCase(hubLocation)) {
            return Collections.singletonList("Debangshu Mukherjee"); // Exactly 1 item!
        } else {
            return Collections.emptyList(); // ZERO heap allocation singleton! NEVER return null!
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: ZERO-ALLOCATION SINGLETON & EMPTY FACTORIES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Collections.emptyList() (Returns shared static singleton EMPTY_LIST):
        List<String> empty1 = Collections.emptyList();
        List<String> empty2 = Collections.emptyList();

        System.out.println(">>> 1. Collections.emptyList() Singleton Verification:");
        System.out.println("  empty1 == empty2 : " + (empty1 == empty2) + " (Exact same shared static memory instance!)");

        // 2. Collections.singletonList(item) (Lightweight 1-element immutable list):
        List<String> singleStudent = Collections.singletonList("Swadeep Paul");
        Set<String> singleAdmin = Collections.singleton("Sukanta Hui");
        Map<String, String> singleConfig = Collections.singletonMap("env", "production");

        System.out.println("\n>>> 2. Singleton Collection Instances:");
        System.out.println("  singletonList : " + singleStudent);
        System.out.println("  singletonSet  : " + singleAdmin);
        System.out.println("  singletonMap  : " + singleConfig);

        // 3. Testing findStudentsByHub helper:
        System.out.println("\n>>> 3. Null-Safe API Return Value Testing:");
        System.out.println("  Query 'Barrackpore' -> " + findStudentsByHub("Barrackpore"));
        System.out.println("  Query 'Naihati'     -> " + findStudentsByHub("Naihati"));
        System.out.println("  Query 'Kalyani'     -> " + findStudentsByHub("Kalyani") + " (Empty list, zero allocation!)");

        System.out.println("\n==========================================================================");
    }
}