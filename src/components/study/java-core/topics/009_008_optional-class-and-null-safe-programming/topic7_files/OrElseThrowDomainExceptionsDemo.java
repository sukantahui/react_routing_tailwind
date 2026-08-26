/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 7: orElseThrow(Supplier<Exception>) - Domain Exception Mapping
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class OrElseThrowDomainExceptionsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ORELSETHROW(CUSTOM EXCEPTION) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int searchId = 999;
        Optional<Student> studentOpt = findStudentById(searchId);

        System.out.println(">>> Searching for Student ID " + searchId + " in Database...");
        try {
            Student student = studentOpt.orElseThrow(
                () -> new StudentNotFoundException("Student with ID " + searchId + " not found at Barrackpore Academy!")
            );
            System.out.println("Student: " + student.name());
        } catch (StudentNotFoundException ex) {
            System.err.println("   [BUSINESS EXCEPTION CAUGHT]: " + ex.getMessage());
            System.out.println("   --> In Spring Boot, this maps automatically to HTTP 404 NOT FOUND!");
        }

        System.out.println("\n==========================================================================");
    }

    static Optional<Student> findStudentById(int id) {
        if (id == 101) return Optional.of(new Student(101, "Swadeep Paul"));
        return Optional.empty(); // Simulated database miss
    }

    record Student(int id, String name) {}

    static class StudentNotFoundException extends RuntimeException {
        public StudentNotFoundException(String message) {
            super(message);
        }
    }
}
