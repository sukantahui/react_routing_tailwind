/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 17: Optional Anti-Patterns - Fields, Parameters & Collections Misuse
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.io.Serializable;
import java.util.Optional;

public class OptionalAntiPatternsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: OPTIONAL ANTI-PATTERNS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ANTI-PATTERN #1: Optional as a Class Field");
        System.out.println("    - java.util.Optional does NOT implement java.io.Serializable!");
        System.out.println("    - If an entity or DTO with an Optional field is serialized (e.g. Redis, RMI, Session), it throws NotSerializableException!");
        System.out.println("    - Correct Pattern: Store nullable field, return Optional from the getter!\n");

        System.out.println(">>> 2. ANTI-PATTERN #2: Optional as a Method Parameter");
        System.out.println("    - Anti-pattern: void register(String name, Optional<String> center)");
        System.out.println("    - Forces callers to write: register('Swadeep', Optional.of('Barrackpore')) or register('Tuhina', Optional.empty())");
        System.out.println("    - Worse: Callers might pass register('Swadeep', null), causing a NullPointerException inside the method!");
        System.out.println("    - Correct Pattern: Use method overloading! (register(name) and register(name, center))\n");

        System.out.println(">>> 3. ANTI-PATTERN #3: Optional in Collections (List<Optional<T>>)");
        System.out.println("    - Storing Optional inside Collections creates 2 layers of absence checks (empty collection vs empty optional).");
        System.out.println("    - Correct Pattern: Filter out absent values before storing in collection!");
        System.out.println("==========================================================================");
    }

    // Clean Domain Entity Pattern:
    static class CleanStudentEntity implements Serializable {
        private String name;
        private String optionalDiscountCode; // Store as plain nullable String for serialization

        public CleanStudentEntity(String name, String discountCode) {
            this.name = name;
            this.optionalDiscountCode = discountCode;
        }

        public String getName() { return name; }

        // Getter returns Optional for safe consumption!
        public Optional<String> getDiscountCode() {
            return Optional.ofNullable(optionalDiscountCode);
        }
    }
}
