/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 19: Architectural Anti-Patterns - Over-Engineering & God Objects (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class AntiPatternsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 19: ARCHITECTURAL ANTI-PATTERNS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE TOP 4 ARCHITECTURAL ANTI-PATTERNS TO AVOID:");
        System.out.println("  1. PREMATURE PATTERNIZATION (Over-Engineering):");
        System.out.println("     - Creating 15 interfaces and factories for a 20-line utility script.");
        System.out.println("     - Rule: Apply KISS (Keep It Simple, Stupid) and YAGNI (You Aren't Gonna Need It).\n");

        System.out.println("  2. GOD OBJECT (Blob Anti-Pattern):");
        System.out.println("     - A single monster class with 5,000 lines of code handling database, UI, and business rules.");
        System.out.println("     - Solution: Refactor using Single Responsibility Principle (SRP) into DAOs, Services, and Controllers.\n");

        System.out.println("  3. GOLDEN HAMMER (Law of the Instrument):");
        System.out.println("     - Forcing your favorite pattern (e.g. Singleton or Observer) onto EVERY problem even when inappropriate.\n");

        System.out.println("  4. CARGO CULT PROGRAMMING:");
        System.out.println("     - Copying design pattern boilerplate without understanding WHY the pattern is needed.");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 012_001 COMPLETE: GOF DESIGN PATTERNS MASTERED!");
        System.out.println("==========================================================================");
    }
}
