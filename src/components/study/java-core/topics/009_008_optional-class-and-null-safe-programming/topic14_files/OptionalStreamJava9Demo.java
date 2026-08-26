/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 14: Optional.stream() (Java 9+) - Bridging Optionals into Stream Pipelines
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.List;
import java.util.Optional;

public class OptionalStreamJava9Demo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: OPTIONAL.STREAM() (JAVA 9+) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<Integer> studentIds = List.of(101, 999, 102, 888, 103);

        // We lookup students by ID: valid IDs return Optional.of(Student), invalid return Optional.empty()
        System.out.println(">>> 1. Processing List of IDs and fetching Student Optionals:");

        // Java 9 Idiom: flatMap(Optional::stream)
        // 1. findStudent(101) -> Optional.of("Swadeep")  -> Stream of ["Swadeep"]
        // 2. findStudent(999) -> Optional.empty()         -> Empty Stream [] (Vanishes!)
        // 3. findStudent(102) -> Optional.of("Tuhina")   -> Stream of ["Tuhina"]
        List<String> foundStudents = studentIds.stream()
            .map(OptionalStreamJava9Demo::findStudentById) // Stream<Optional<String>>
            .flatMap(Optional::stream)                     // Stream<String> (Java 9 magic!)
            .map(String::toUpperCase)
            .toList();

        System.out.println(">>> 2. Collected Active Students (Empty Optionals Dropped):");
        foundStudents.forEach(s -> System.out.println("   - " + s));

        System.out.println("\n==========================================================================");
    }

    static Optional<String> findStudentById(int id) {
        if (id == 101) return Optional.of("Swadeep Paul (Barrackpore)");
        if (id == 102) return Optional.of("Tuhina Das (Naihati)");
        if (id == 103) return Optional.of("Abhronila Das (Shyamnagar)");
        return Optional.empty(); // Not found
    }
}
