/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 4: Explicit Class Import vs Wildcard Import (import java.util.*) Performance Myths
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

// Wildcard Import (On-Demand Import):
import java.util.*;

public class ExplicitVsWildcardImportDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: EXPLICIT VS WILDCARD IMPORT PERFORMANCE MYTHS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> list = new ArrayList<>();
        Map<String, Integer> map = new HashMap<>();

        list.add("Barrackpore Hub");
        map.put("TraineeCount", 45);

        System.out.println(">>> THE MYTH: 'Wildcard imports (import java.util.*) slow down runtime performance!'");
        System.out.println(">>> THE TRUTH: FALSE! ZERO runtime impact!");
        System.out.println("  1. In compiled .class bytecode, ALL class references are converted to");
        System.out.println("     fully qualified binary names (e.g. 'java/util/ArrayList').");
        System.out.println("  2. The JVM does NOT load unused classes from the package into memory.");
        System.out.println("  3. Only the compiler spends microseconds matching class names during javac.");
        System.out.println("  4. BEST PRACTICE: Use explicit imports to avoid naming conflicts and improve readability.");

        System.out.println("\n==========================================================================");
    }
}