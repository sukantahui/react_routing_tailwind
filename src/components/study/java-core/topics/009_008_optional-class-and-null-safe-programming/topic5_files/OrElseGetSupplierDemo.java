/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 5: orElseGet(Supplier) - Lazy Fallback Evaluation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class OrElseGetSupplierDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: ORELSEGET(SUPPLIER) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Optional<String> cachedStudent = Optional.of("Swadeep Paul (Cache Hit)");
        Optional<String> missingStudent = Optional.empty();

        // 1. Present Optional with orElseGet: Fallback lambda is NEVER executed!
        System.out.println(">>> 1. Present Optional with orElseGet:");
        String student1 = cachedStudent.orElseGet(() -> queryDatabaseForDefault());
        System.out.println("   --> Extracted Result: " + student1);

        // 2. Empty Optional with orElseGet: Fallback lambda IS executed lazily!
        System.out.println("\n>>> 2. Empty Optional with orElseGet:");
        String student2 = missingStudent.orElseGet(() -> queryDatabaseForDefault());
        System.out.println("   --> Extracted Result: " + student2);

        System.out.println("\n==========================================================================");
    }

    static String queryDatabaseForDefault() {
        System.out.println("   [DB QUERY RUNNING]: Simulating expensive database query fallback...");
        return "Default Student Profile (Fetched from Postgres DB)";
    }
}
