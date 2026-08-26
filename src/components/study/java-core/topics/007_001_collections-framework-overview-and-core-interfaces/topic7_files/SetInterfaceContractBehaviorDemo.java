/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 7: 2. java.util.Set: Unique Elements, Duplicate Rejection & Mathematical Sets
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class SetInterfaceContractBehaviorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: java.util.Set<E> CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Duplicate Rejection Behavior:
        Set<String> uniqueStudents = new HashSet<>();
        boolean added1 = uniqueStudents.add("Swadeep Paul (Barrackpore)");
        boolean added2 = uniqueStudents.add("Tuhina Das (Naihati)");
        boolean addedDuplicate = uniqueStudents.add("Swadeep Paul (Barrackpore)"); // Returns false, duplicate rejected!

        System.out.println(">>> 1. Set Insertion & Duplicate Rejection Results:");
        System.out.println("  Added Swadeep 1st time? : " + added1);
        System.out.println("  Added Tuhina?           : " + added2);
        System.out.println("  Added Swadeep 2nd time? : " + addedDuplicate + " (Duplicate REJECTED!)");
        System.out.println("  Final Set Elements      : " + uniqueStudents);

        // 2. Comparing Set Flavors (HashSet vs LinkedHashSet vs TreeSet):
        Set<String> hashSet = new HashSet<>(Set.of("Naihati", "Barrackpore", "Shyamnagar", "Ichapur"));
        Set<String> linkedHashSet = new LinkedHashSet<>(Set.of("Naihati", "Barrackpore", "Shyamnagar", "Ichapur"));
        Set<String> treeSet = new TreeSet<>(Set.of("Naihati", "Barrackpore", "Shyamnagar", "Ichapur"));

        System.out.println("\n>>> 2. Set Implementation Ordering Comparison:");
        System.out.println("  HashSet       (O(1) Unordered)          : " + hashSet);
        System.out.println("  LinkedHashSet (Insertion Ordered)       : " + linkedHashSet);
        System.out.println("  TreeSet       (Sorted Natural Order)    : " + treeSet);

        System.out.println("\n>>> CORE PROPERTIES OF java.util.Set<E>:");
        System.out.println("  1. Strict Uniqueness : At most one null element; rejects duplicates via 'equals()' and 'hashCode()'.");
        System.out.println("  2. No Index Access   : Does not provide 'get(int index)' because elements have no numeric position.");

        System.out.println("\n==========================================================================");
    }
}