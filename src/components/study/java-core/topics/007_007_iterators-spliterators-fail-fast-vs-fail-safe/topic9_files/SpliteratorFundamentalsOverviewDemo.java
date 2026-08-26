/**
 * Java Core Tutorial - Module 007_007: Iterators, Spliterators & Fail-Fast Mechanics
 * Topic 9: java.util.Spliterator (Splittable Iterator) Overview: The Engine of Java Streams
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.ArrayList;
import java.util.List;
import java.util.Spliterator;

public class SpliteratorFundamentalsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: java.util.Spliterator FUNDAMENTALS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> studentList = new ArrayList<>(List.of(
                "Swadeep", "Tuhina", "Abhronila", "Debangshu", "Sourav", "Ananya"
        ));

        // Obtaining a Spliterator from the List:
        Spliterator<String> spliterator = studentList.spliterator();

        System.out.println(">>> 1. Inspecting Initial Spliterator Metrics:");
        System.out.println("  Estimated Size        : " + spliterator.estimateSize());
        System.out.println("  Exact Size if Sized   : " + spliterator.getExactSizeIfKnown());
        System.out.println("  Characteristics Mask  : " + spliterator.characteristics());

        // Consuming elements one-by-one via tryAdvance():
        System.out.println("\n>>> 2. Consuming Elements via tryAdvance():");
        spliterator.tryAdvance(name -> System.out.println("  Advance 1: " + name));
        spliterator.tryAdvance(name -> System.out.println("  Advance 2: " + name));

        System.out.println("\n>>> 3. Remaining Size after 2 Advances: " + spliterator.estimateSize());

        System.out.println("\n>>> WHY JAVA 8 INTRODUCED Spliterator:");
        System.out.println("  - 'Iterator' is inherently sequential and cannot be parallelized without locking.");
        System.out.println("  - 'Spliterator' (Split + Iterator) was designed specifically for Java 8 Parallel Streams!");
        System.out.println("  - It allows recursive partitioning ('trySplit()') so multiple CPU worker threads process separate chunks simultaneously!");

        System.out.println("\n==========================================================================");
    }
}