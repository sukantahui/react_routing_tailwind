/**
 * Java Core Tutorial - Module 009_004: Stream API Pipeline & Intermediate Operations
 * Topic 14: flatMap(Function) - 1-to-Many Flattening of Nested Collections
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.streams;

import java.util.Arrays;
import java.util.List;

public class FlatMapFunctionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: FLATMAP(FUNCTION) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<AcademyBatch> batches = List.of(
            new AcademyBatch("Java Pro Barrackpore", List.of("Swadeep Paul", "Priya Sharma")),
            new AcademyBatch("Spring Boot Naihati", List.of("Tuhina Das", "Anish Dey")),
            new AcademyBatch("Cloud Shyamnagar", List.of("Abhronila Das", "Debangshu Mukherjee"))
        );

        // 1. PROBLEM WITH MAP: Produces Stream<List<String>> or Stream<Stream<String>>
        System.out.println("1. Using map() on nested lists:");
        List<List<String>> listOfLists = batches.stream()
            .map(AcademyBatch::students)
            .toList();
        System.out.println("   Result is nested List<List<String>>: " + listOfLists);

        // 2. SOLUTION WITH FLATMAP: Flattens each List into a single unified Stream<String>
        System.out.println("\n2. Using flatMap() to flatten all students into a single Stream<String>:");
        List<String> allStudents = batches.stream()
            .flatMap(batch -> batch.students().stream()) // 1-to-many flattening
            .map(String::toUpperCase)
            .sorted()
            .toList();
        System.out.println("   Unified Flat List: " + allStudents);

        // 3. String Split Word Tokenizer via flatMap
        List<String> sentences = List.of("Java is powerful", "Streams are declarative", "Code with CoderAccoTax");
        List<String> distinctWords = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
            .map(String::toLowerCase)
            .distinct()
            .sorted()
            .toList();
        System.out.println("\n3. Flattened distinct words: " + distinctWords);

        System.out.println("==========================================================================");
    }

    record AcademyBatch(String batchName, List<String> students) {}
}
