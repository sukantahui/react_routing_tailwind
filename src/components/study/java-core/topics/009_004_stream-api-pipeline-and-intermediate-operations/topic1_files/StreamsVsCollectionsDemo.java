/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 1: Streams vs Collections: Architecture & Lifecycle Comparison
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class StreamsVsCollectionsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: STREAMS VS COLLECTIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. COLLECTION: In-memory data structure, stores elements eagerly
        List<String> centers = new ArrayList<>();
        centers.add("Barrackpore");
        centers.add("Naihati");
        centers.add("Shyamnagar");
        centers.add("Ichapur");
        System.out.println("1. Collection in Memory (Eager Storage): " + centers);

        // 2. STREAM: Transient computation pipeline (stores NO elements)
        Stream<String> centerStream = centers.stream()
            .map(String::toUpperCase);

        System.out.println("2. Stream created: Centers mapped to upper-case (computation not yet triggered)");

        // 3. Terminal operation triggers execution and consumes stream
        System.out.print("3. Executing Terminal Operation (forEach): ");
        centerStream.forEach(s -> System.out.print(s + " | "));
        System.out.println();

        // 4. ATTEMPTING REUSE: Streams CANNOT be consumed twice!
        System.out.println("\n4. Attempting to reuse the consumed stream:");
        try {
            centerStream.forEach(System.out::println);
        } catch (IllegalStateException ex) {
            System.err.println("   [CAUGHT EXPECTED EXCEPTION]: " + ex.getMessage());
            System.out.println("   --> Streams are single-use disposable pipelines! Once closed, you must obtain a new stream.");
        }

        System.out.println("\n==========================================================================");
    }
}
