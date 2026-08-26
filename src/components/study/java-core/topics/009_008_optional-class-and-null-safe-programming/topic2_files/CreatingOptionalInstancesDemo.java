/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 2: Creating Optional Instances - of(), ofNullable(), empty()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class CreatingOptionalInstancesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: CREATING OPTIONAL INSTANCES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Optional.empty(): Creating an explicitly empty optional
        Optional<String> emptyOpt = Optional.empty();
        System.out.println("1. Optional.empty(): " + emptyOpt);

        // 2. Optional.of(value): Requires NON-NULL value (Throws NPE immediately if null passed!)
        String studentName = "Tuhina Das";
        Optional<String> validOpt = Optional.of(studentName);
        System.out.println("2. Optional.of('Tuhina Das'): " + validOpt);

        try {
            System.out.println("   Attempting Optional.of(null)...");
            Optional.of(null); // Intentionally fails fast!
        } catch (NullPointerException ex) {
            System.err.println("   [NPE CAUGHT]: Optional.of(null) throws NullPointerException immediately!");
        }

        // 3. Optional.ofNullable(value): Safe bridge for unknown/nullable values
        String nonNullCenter = "Barrackpore";
        String nullableCenter = null;

        Optional<String> safeOpt1 = Optional.ofNullable(nonNullCenter);
        Optional<String> safeOpt2 = Optional.ofNullable(nullableCenter);

        System.out.println("\n3. Optional.ofNullable():");
        System.out.println("   - ofNullable('Barrackpore') : " + safeOpt1 + " (Present)");
        System.out.println("   - ofNullable(null)          : " + safeOpt2 + " (Returns Optional.empty() safely!)");

        System.out.println("\n==========================================================================");
    }
}
