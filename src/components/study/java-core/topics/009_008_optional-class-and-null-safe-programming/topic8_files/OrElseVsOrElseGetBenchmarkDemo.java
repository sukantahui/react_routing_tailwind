/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 8: Performance Benchmark - orElse() vs orElseGet()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class OrElseVsOrElseGetBenchmarkDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ORELSE VS ORELSEGET BENCHMARK - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<String> presentStudent = Optional.of("Swadeep Paul (Existing Cache Entry)");

        // 1. Testing orElse(): Eager evaluation (Runs computeHeavyDefault() UNNECESSARILY!)
        System.out.println(">>> 1. Testing orElse() with a PRESENT Optional:");
        String res1 = presentStudent.orElse(computeHeavyDefault("orElse"));
        System.out.println("   Result: " + res1);

        // 2. Testing orElseGet(): Lazy evaluation (NEVER runs computeHeavyDefault()!)
        System.out.println("\n>>> 2. Testing orElseGet() with a PRESENT Optional:");
        String res2 = presentStudent.orElseGet(() -> computeHeavyDefault("orElseGet"));
        System.out.println("   Result: " + res2);

        System.out.println("\n>>> BENCHMARK VERDICT:");
        System.out.println("  - Notice that 'computeHeavyDefault' WAS EXECUTED for orElse() even though the value was present!");
        System.out.println("  - For orElseGet(), the supplier was SKIPPED ENTIRELY, saving CPU cycles and DB queries!");
        System.out.println("==========================================================================");
    }

    static String computeHeavyDefault(String caller) {
        System.out.println("   ⚠️ [HEAVY COMPUTATION EXECUTED] Called from: " + caller);
        return "Heavy Default Value";
    }
}
