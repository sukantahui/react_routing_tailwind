/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 6: orElseThrow() - Explicit Absence Semantics (Java 10+)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.NoSuchElementException;
import java.util.Optional;

public class OrElseThrowSemanticsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: ORELSETHROW() (JAVA 10+) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<String> enrolledStudent = Optional.of("Tuhina Das");
        Optional<String> unregisteredStudent = Optional.empty();

        // 1. Present Optional with orElseThrow(): returns wrapped value cleanly
        String name = enrolledStudent.orElseThrow();
        System.out.println("1. Unwrapped Valid Student: " + name);

        // 2. Empty Optional with orElseThrow(): throws NoSuchElementException explicitly
        System.out.println("\n2. Attempting orElseThrow() on Empty Optional:");
        try {
            unregisteredStudent.orElseThrow();
        } catch (NoSuchElementException ex) {
            System.err.println("   [EXPECTED EXCEPTION]: " + ex.getClass().getName() + ": " + ex.getMessage());
            System.out.println("   --> Clean, unambiguous exception thrown indicating missing mandatory data!");
        }

        System.out.println("\n==========================================================================");
    }
}
