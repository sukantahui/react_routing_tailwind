/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 15: Best Practices for Optional - Brian Goetz's Rules of Engagement
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class BrianGoetzOptionalRulesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: BRIAN GOETZ'S OPTIONAL RULES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 5 GOLDEN RULES OF OPTIONAL (BY BRIAN GOETZ):");
        System.out.println("  Rule 1: Never declare a variable of type Optional whose value is null! (Use Optional.empty())");
        System.out.println("  Rule 2: Never call optional.get() unless you can prove isPresent() is true (Prefer orElse/orElseGet).");
        System.out.println("  Rule 3: Prefer orElseGet() over orElse() whenever creating new objects or calling methods.");
        System.out.println("  Rule 4: Do NOT use Optional in fields, method parameters, or collection values.");
        System.out.println("  Rule 5: Use Optional primarily as a METHOD RETURN TYPE to signal possible absence.\n");

        // Demonstration of Rule 1:
        Optional<String> badOptional = null; // ANTI-PATTERN!
        Optional<String> goodOptional = Optional.empty(); // CORRECT!

        System.out.println(">>> Rule 1 Anti-Pattern: Optional variable itself set to null!");
        System.out.println("    - goodOptional.isPresent() -> " + goodOptional.isPresent() + " (Safe)");
        System.out.println("    - Attempting badOptional.isPresent() throws NullPointerException!");

        System.out.println("\n==========================================================================");
    }
}
