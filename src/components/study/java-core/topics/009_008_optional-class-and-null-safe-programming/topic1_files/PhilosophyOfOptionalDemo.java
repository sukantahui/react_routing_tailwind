/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 1: The Philosophy of java.util.Optional<T>
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class PhilosophyOfOptionalDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: PHILOSOPHY OF OPTIONAL<T> - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Value is Present: Container holds an object
        Optional<String> presentStudent = Optional.of("Swadeep Paul (Barrackpore)");
        System.out.println("1. Present Optional:");
        System.out.println("   - Container : " + presentStudent);
        System.out.println("   - isPresent : " + presentStudent.isPresent());
        System.out.println("   - isEmpty   : " + presentStudent.isEmpty() + " (Java 11+)");

        // 2. Value is Absent: Container is empty (NOT NULL!)
        Optional<String> absentStudent = Optional.empty();
        System.out.println("\n2. Absent Optional (Empty container, NOT a null pointer!):");
        System.out.println("   - Container : " + absentStudent);
        System.out.println("   - isPresent : " + absentStudent.isPresent());
        System.out.println("   - isEmpty   : " + absentStudent.isEmpty());

        // 3. Querying with fallback safely
        System.out.println("\n3. Extracting with fallback:");
        System.out.println("   - Present unwrapped: " + presentStudent.orElse("Default Guest"));
        System.out.println("   - Absent unwrapped : " + absentStudent.orElse("Default Guest"));

        System.out.println("\n==========================================================================");
    }
}
