/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 3: Compiler Generated Artifacts - Canonical Constructor & Value Equality
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

import java.util.HashSet;
import java.util.Set;

public class CompilerGeneratedArtifactsDemo {

    public record CenterEnrollment(String studentName, String branch, double score) {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: COMPILER GENERATED ARTIFACTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CenterEnrollment e1 = new CenterEnrollment("Swadeep Paul", "Barrackpore", 94.0);
        CenterEnrollment e2 = new CenterEnrollment("Swadeep Paul", "Barrackpore", 94.0);

        System.out.println(">>> 1. VALUE-BASED EQUALS & HASHCODE IN ACTION:");
        System.out.println("  - e1 memory identity == e2 : " + (e1 == e2) + " (Different heap objects)");
        System.out.println("  - e1.equals(e2)            : " + e1.equals(e2) + " (Identical field values!)");
        System.out.println("  - e1.hashCode()            : " + e1.hashCode());
        System.out.println("  - e2.hashCode()            : " + e2.hashCode() + " (Identical hash!)");

        // 2. Perfect compatibility with Hash Collections (HashSet deduplication)
        Set<CenterEnrollment> uniqueEnrollments = new HashSet<>();
        uniqueEnrollments.add(e1);
        uniqueEnrollments.add(e2); // Discarded as duplicate automatically!

        System.out.println("\n>>> 2. HashSet Deduplication with Records:");
        System.out.println("  - Total entries in HashSet (Expected: 1): " + uniqueEnrollments.size());

        System.out.println("\n==========================================================================");
    }
}
