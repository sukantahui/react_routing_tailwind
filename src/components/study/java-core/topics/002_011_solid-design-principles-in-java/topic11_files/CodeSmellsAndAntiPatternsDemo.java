/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 11: Code Smells & Anti-Patterns: God Object, Spaghetti Code & Tight Coupling
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class CodeSmellsAndAntiPatternsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: MAJOR OOP CODE SMELLS & ANTI-PATTERNS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 4 Deadliest Code Smells in Enterprise Java:");
        System.out.println();
        System.out.println("  1. THE GOD OBJECT (Bloated Class Anti-Pattern):");
        System.out.println("     - A single class that knows too much or does too much (1000+ lines).");
        System.out.println("     - Violates SRP. Hard to test, maintain, or understand.");
        System.out.println();
        System.out.println("  2. SPAGHETTI CODE:");
        System.out.println("     - Unstructured, tangled control flows with complex nested if-else ladders.");
        System.out.println("     - Violates OCP.");
        System.out.println();
        System.out.println("  3. TIGHT COUPLING (Concretions over Abstractions):");
        System.out.println("     - Classes instantiate concrete dependencies directly using 'new'.");
        System.out.println("     - Violates DIP.");
        System.out.println();
        System.out.println("  4. SHOTGUN SURGERY:");
        System.out.println("     - Making a single small business change requires modifying 15 different files.");

        System.out.println("\n==========================================================================");
    }
}