/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 16: Optional as a Method Return Type - API Absence Contracts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.List;
import java.util.Optional;

public class OptionalAsReturnTypeDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: OPTIONAL AS A METHOD RETURN TYPE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentRepository repo = new StudentRepository();

        // 1. Querying for an existing student:
        System.out.println(">>> 1. Querying for ID 101 (Swadeep Paul):");
        repo.findById(101)
            .ifPresentOrElse(
                s -> System.out.println("   [FOUND]: " + s.name() + " (" + s.center() + ")"),
                () -> System.out.println("   [NOT FOUND]: No student matches ID 101")
            );

        // 2. Querying for a non-existing student:
        System.out.println("\n>>> 2. Querying for ID 999 (Missing):");
        String studentName = repo.findById(999)
            .map(Student::name)
            .orElse("Guest / Unregistered");
        System.out.println("   [RESOLVED]: " + studentName);

        System.out.println("\n==========================================================================");
    }

    static class StudentRepository {
        private final List<Student> database = List.of(
            new Student(101, "Swadeep Paul", "Barrackpore"),
            new Student(102, "Tuhina Das", "Naihati"),
            new Student(103, "Abhronila Das", "Shyamnagar")
        );

        // Standard Enterprise Pattern: Return Optional<T>
        public Optional<Student> findById(int id) {
            return database.stream()
                .filter(s -> s.id() == id)
                .findFirst();
        }
    }

    record Student(int id, String name, String center) {}
}
