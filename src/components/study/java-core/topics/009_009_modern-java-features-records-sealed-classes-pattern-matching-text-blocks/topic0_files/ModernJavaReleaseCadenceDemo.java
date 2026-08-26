/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 0: Modern Java Release Cadence & LTS Milestones (Java 8 -> 21)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

import java.util.List;

public class ModernJavaReleaseCadenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: MODERN JAVA RELEASE CADENCE & LTS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> CURRENT RUNNING JVM ENVIRONMENT:");
        System.out.println("  - Java Runtime Version : " + System.getProperty("java.version"));
        System.out.println("  - Java VM Vendor       : " + System.getProperty("java.vm.vendor"));
        System.out.println("  - Java VM Name         : " + System.getProperty("java.vm.name") + "\n");

        List<JavaLtsMilestone> ltsReleases = List.of(
            new JavaLtsMilestone("Java 8 (2014)", "Lambdas, Stream API, Optional, java.time, CompletableFuture"),
            new JavaLtsMilestone("Java 11 (2018)", "var in lambdas, String methods (isBlank, lines), HTTP Client API"),
            new JavaLtsMilestone("Java 17 (2021)", "Records (JEP 395), Sealed Classes (JEP 409), Pattern Matching instanceof"),
            new JavaLtsMilestone("Java 21 (2023)", "Virtual Threads (Loom), Pattern Matching switch, Sequenced Collections, Record Patterns")
        );

        System.out.println(">>> MAJOR ENTERPRISE LONG-TERM SUPPORT (LTS) MILESTONES:");
        ltsReleases.forEach(m -> {
            System.out.println("   🚀 " + m.version() + ":");
            System.out.println("      Features: " + m.keyHighlights());
        });

        System.out.println("\n==========================================================================");
    }

    record JavaLtsMilestone(String version, String keyHighlights) {}
}
