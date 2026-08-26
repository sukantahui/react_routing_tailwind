/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 6: Fail-Fast Iterators: ArrayList, HashSet & HashMap Failure Guarantees
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class FailFastCollectionsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: FAIL-FAST ITERATORS (ArrayList, HashSet, HashMap) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. ArrayList Fail-Fast Test:
        List<String> list = new ArrayList<>(List.of("A", "B", "C"));
        Iterator<String> listIt = list.iterator();
        list.add("D"); // Modifies list directly
        try {
            listIt.next(); // Triggers CME!
        } catch (ConcurrentModificationException e) {
            System.out.println(">>> 1. ArrayList Iterator: [FAILED FAST] Caught CME as expected!");
        }

        // 2. HashSet Fail-Fast Test:
        Set<String> set = new HashSet<>(Set.of("X", "Y", "Z"));
        Iterator<String> setIt = set.iterator();
        set.add("W");
        try {
            setIt.next();
        } catch (ConcurrentModificationException e) {
            System.out.println(">>> 2. HashSet Iterator  : [FAILED FAST] Caught CME as expected!");
        }

        // 3. HashMap Fail-Fast Test:
        Map<String, String> map = new HashMap<>(Map.of("K1", "V1", "K2", "V2"));
        Iterator<String> mapIt = map.keySet().iterator();
        map.put("K3", "V3");
        try {
            mapIt.next();
        } catch (ConcurrentModificationException e) {
            System.out.println(">>> 3. HashMap Iterator  : [FAILED FAST] Caught CME as expected!");
        }

        System.out.println("\n>>> FAIL-FAST PHILOSOPHY:");
        System.out.println("  - Fail-Fast iterators fail immediately and cleanly, rather than risking non-deterministic behavior at an undetermined time in the future.");

        System.out.println("\n==========================================================================");
    }
}