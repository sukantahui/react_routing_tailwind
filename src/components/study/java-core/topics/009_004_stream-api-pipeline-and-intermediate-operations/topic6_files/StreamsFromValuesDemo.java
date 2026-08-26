/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 6: Creating Streams from Direct Values & Stream.ofNullable() (Java 9)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.List;
import java.util.stream.Stream;

public class StreamsFromValuesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: STREAMS FROM VALUES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Stream.of(varargs): Ad-hoc explicit values
        Stream<String> techStream = Stream.of("Java 21", "Spring Boot 3", "PostgreSQL", "Kafka");
        System.out.println("1. Stream.of() values: " + techStream.toList());

        // 2. Stream.empty(): Creating an explicitly empty stream
        Stream<String> emptyStream = Stream.empty();
        System.out.println("2. Stream.empty() count: " + emptyStream.count());

        // 3. Stream.ofNullable(non-null value): Returns stream with 1 element
        String activeCenter = "Barrackpore";
        Stream<String> s1 = Stream.ofNullable(activeCenter);
        System.out.println("3. Stream.ofNullable('Barrackpore') count: " + s1.count());

        // 4. Stream.ofNullable(null value): Returns empty stream (NO NullPointerException!)
        String nullCenter = null;
        Stream<String> s2 = Stream.ofNullable(nullCenter);
        System.out.println("4. Stream.ofNullable(null) count: " + s2.count());

        // 5. Powerful use case: flatMap with Stream.ofNullable() to filter nulls from a collection
        List<String> rawInput = List.of("Swadeep", "Tuhina", "Abhronila");
        System.out.println("\n5. Querying student center (where some might be null):");
        rawInput.stream()
            .flatMap(name -> Stream.ofNullable(lookupCenter(name)))
            .forEach(c -> System.out.println("   - Found Center: " + c));

        System.out.println("\n==========================================================================");
    }

    static String lookupCenter(String studentName) {
        if ("Swadeep".equals(studentName)) return "Barrackpore";
        if ("Tuhina".equals(studentName)) return "Naihati";
        return null; // Abhronila has no registered center yet
    }
}
