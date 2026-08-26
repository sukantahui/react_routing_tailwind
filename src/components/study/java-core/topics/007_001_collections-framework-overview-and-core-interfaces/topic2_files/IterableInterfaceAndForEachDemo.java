/**
 * Java Core Tutorial - Module 007_001: Collections Framework Overview & Core Interfaces
 * Topic 2: The Root Interface: java.lang.Iterable<T> & forEach() Default Method
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Iterator;
import java.util.List;

public class IterableInterfaceAndForEachDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.lang.Iterable<T> & forEach() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> branches = List.of("Barrackpore Central", "Naihati Center", "Shyamnagar Hub");

        // 1. ITERATION STYLE 1: Enhanced For-Each Loop (Syntactic sugar for Iterable.iterator()):
        System.out.println(">>> 1. Enhanced For-Each Loop (Requires Iterable<T>):");
        for (String branch : branches) {
            System.out.println("  Branch: " + branch);
        }

        // 2. ITERATION STYLE 2: Explicit Iterator Traversal:
        System.out.println("\n>>> 2. Explicit Iterator Traversal (iterator()):");
        Iterator<String> iterator = branches.iterator();
        while (iterator.hasNext()) {
            System.out.println("  Iterator Next: " + iterator.next());
        }

        // 3. ITERATION STYLE 3: Functional forEach() (Java 8 Default Method on Iterable):
        System.out.println("\n>>> 3. Functional forEach() with Method Reference:");
        branches.forEach(b -> System.out.println("  Lambda Action: " + b));

        System.out.println("\n>>> THE CONTRACT OF java.lang.Iterable<T>:");
        System.out.println("  1. 'Iterator<T> iterator()' : Mandatory method returning an active iterator cursor.");
        System.out.println("  2. Enhanced For Loop       : Any custom class implementing Iterable<T> can be used in 'for (T item : myObject)'!");
        System.out.println("  3. 'default void forEach(Consumer<? super T> action)' : Integrated functional iteration.");

        System.out.println("\n==========================================================================");
    }
}