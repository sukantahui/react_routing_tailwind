/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 1: java.util.Iterator Interface: hasNext(), next(), and forEachRemaining()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorMethodsSuiteDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: java.util.Iterator CORE METHODS SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentRoster = new ArrayList<>(List.of(
                "Swadeep Paul (Barrackpore)",
                "Tuhina Das (Naihati)",
                "Abhronila Das (Shyamnagar)",
                "Debangshu Mukherjee (Ichapur)"
        ));

        Iterator<String> iterator = studentRoster.iterator();

        // 1. hasNext() & next() step-by-step cursor advance:
        System.out.println(">>> 1. Manual Step-by-Step Traversal:");
        if (iterator.hasNext()) {
            System.out.println("  1st Student: " + iterator.next());
        }
        if (iterator.hasNext()) {
            System.out.println("  2nd Student: " + iterator.next());
        }

        // 2. Java 8 forEachRemaining(): Processes all remaining elements with a lambda:
        System.out.println("\n>>> 2. Processing Remaining Elements via forEachRemaining():");
        iterator.forEachRemaining(student ->
                System.out.println("  [LAMBDA REMAINING] -> " + student));

        System.out.println("\n>>> FINAL STATE: Any elements left? " + iterator.hasNext());

        System.out.println("\n==========================================================================");
    }
}