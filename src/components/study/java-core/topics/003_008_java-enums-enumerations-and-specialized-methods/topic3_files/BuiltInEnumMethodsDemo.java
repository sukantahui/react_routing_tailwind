/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 3: Built-in Enum Methods: name(), ordinal(), values() & valueOf()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class BuiltInEnumMethodsDemo {

    public enum TraineeStatus {
        REGISTERED,
        IN_TRAINING,
        GRADUATED,
        PLACED
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: BUILT-IN ENUM METHODS SUITE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        TraineeStatus current = TraineeStatus.IN_TRAINING;

        // 1. name() -> Exact declared name as String:
        System.out.println(">>> 1. current.name()    : " + current.name());

        // 2. ordinal() -> Zero-based position index (Avoid relying on ordinal in production databases!):
        System.out.println(">>> 2. current.ordinal() : " + current.ordinal() + " (Position 1)");

        // 3. values() -> Static array of all constants in declaration order:
        System.out.println("\n>>> 3. TraineeStatus.values() Array:");
        for (TraineeStatus s : TraineeStatus.values()) {
            System.out.printf("  - %-12s (Ordinal: %d)%n", s.name(), s.ordinal());
        }

        // 4. valueOf(String) -> Parses String to Enum constant (Case-Sensitive!):
        TraineeStatus parsed = TraineeStatus.valueOf("PLACED");
        System.out.println("\n>>> 4. TraineeStatus.valueOf("PLACED"): " + parsed);

        // IllegalArgumentException if name does not exist:
        try {
            TraineeStatus.valueOf("UNKNOWN_STATUS");
        } catch (IllegalArgumentException e) {
            System.out.println(">>> 5. Caught IllegalArgumentException for invalid valueOf string!");
        }

        System.out.println("\n==========================================================================");
    }
}