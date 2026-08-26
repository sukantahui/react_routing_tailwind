/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 4: orElse(fallbackValue) - Eager Default Fallbacks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class OrElseFallbackDemo {

    public static final String DEFAULT_ACADEMY_CENTER = "Barrackpore (Main Campus)";

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ORELSE(FALLBACK) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<String> assignedCenter = Optional.of("Naihati Training Lab");
        Optional<String> unassignedCenter = Optional.empty();

        // 1. orElse with Present Optional: returns wrapped value
        String center1 = assignedCenter.orElse(DEFAULT_ACADEMY_CENTER);
        System.out.println("1. Present Student Center: " + center1);

        // 2. orElse with Empty Optional: returns eager fallback constant
        String center2 = unassignedCenter.orElse(DEFAULT_ACADEMY_CENTER);
        System.out.println("2. Unassigned Student Center: " + center2);

        // 3. String literal fallback
        Optional<String> studentDiscountCode = Optional.empty();
        String activeCode = studentDiscountCode.orElse("NO_DISCOUNT");
        System.out.println("3. Applied Discount Code: " + activeCode);

        System.out.println("\n==========================================================================");
    }
}
