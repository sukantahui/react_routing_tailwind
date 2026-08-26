/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 3: Extracting Values Safely - The .get() Anti-Pattern vs Safe Alternatives
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.NoSuchElementException;
import java.util.Optional;

public class ExtractingValuesSafelyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: EXTRACTING VALUES SAFELY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<String> emptyScholarship = Optional.empty();

        // 1. THE ANTI-PATTERN: Calling .get() on an empty Optional crashes!
        System.out.println(">>> 1. The .get() Anti-Pattern:");
        try {
            String value = emptyScholarship.get(); // Throws NoSuchElementException!
            System.out.println("Value: " + value);
        } catch (NoSuchElementException ex) {
            System.err.println("   [CRASH]: java.util.NoSuchElementException: No value present!");
            System.out.println("   --> Calling .get() blindly defeats the entire safety purpose of Optional.");
        }

        // 2. THE 4 SAFE EXTRACTION STRATEGIES:
        System.out.println("\n>>> 2. The 4 Safe Extraction Strategies:");

        // Strategy A: orElse(eagerDefault)
        String valA = emptyScholarship.orElse("General Merit (Default)");
        System.out.println("   A. orElse()      : " + valA);

        // Strategy B: orElseGet(lazySupplier)
        String valB = emptyScholarship.orElseGet(() -> "Computed Fallback: " + System.currentTimeMillis());
        System.out.println("   B. orElseGet()   : " + valB);

        // Strategy C: ifPresent(consumer)
        System.out.print("   C. ifPresent()   : ");
        emptyScholarship.ifPresent(s -> System.out.println("Found: " + s));
        System.out.println("(Nothing printed because Optional is empty!)");

        // Strategy D: orElseThrow(customException)
        // emptyScholarship.orElseThrow(() -> new ScholarshipNotFoundException("No grant available"));

        System.out.println("\n==========================================================================");
    }
}
