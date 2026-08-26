/**
 * Java Core Tutorial - Module 009_006: The Collectors Class & Downstream Reducers
 * Topic 1: Basic Collectors - toList(), toSet(), toCollection(), toUnmodifiableList()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collectors;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

public class BasicCollectorsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: BASIC COLLECTORS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> rawCenters = List.of(
            "Barrackpore", "Naihati", "Shyamnagar", "Barrackpore", "Ichapur", "Naihati"
        );

        // 1. Collectors.toList() (Standard mutable List)
        List<String> listResult = rawCenters.stream()
            .collect(Collectors.toList());
        System.out.println("1. Collectors.toList(): " + listResult);

        // 2. Collectors.toSet() (Deduplicated HashSet)
        Set<String> setResult = rawCenters.stream()
            .collect(Collectors.toSet());
        System.out.println("2. Collectors.toSet() (Unique): " + setResult);

        // 3. Collectors.toCollection(TreeSet::new) (Sorted, custom collection type)
        TreeSet<String> sortedSet = rawCenters.stream()
            .collect(Collectors.toCollection(TreeSet::new));
        System.out.println("3. toCollection(TreeSet::new) (Sorted): " + sortedSet);

        // 4. Collectors.toCollection(LinkedList::new)
        LinkedList<String> linkedList = rawCenters.stream()
            .collect(Collectors.toCollection(LinkedList::new));
        System.out.println("4. toCollection(LinkedList::new): " + linkedList);

        // 5. Collectors.toUnmodifiableList() (Java 10+) vs Stream.toList() (Java 16+)
        List<String> unmodifiableList = rawCenters.stream()
            .collect(Collectors.toUnmodifiableList());
        System.out.println("5. toUnmodifiableList() (Immutable): " + unmodifiableList);

        System.out.println("\n==========================================================================");
    }
}
