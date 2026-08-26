/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 10: Test-Driven Development (TDD) Workflow - Red -> Green -> Refactor
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class TDDWorkflowRedGreenRefactorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: TEST-DRIVEN DEVELOPMENT (TDD) CYCLE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE SACRED TDD 3-STAGE CYCLE:\n");

        System.out.println("1. 🔴 RED:");
        System.out.println("   - Write a unit test for a feature before writing any production code.");
        System.out.println("   - Run test and watch it FAIL (proves test works and tests the right thing).\n");

        System.out.println("2. 🟢 GREEN:");
        System.out.println("   - Write the MINIMAL amount of production code needed to make test pass.");
        System.out.println("   - Do not write extra features or over-engineer.\n");

        System.out.println("3. 🔵 REFACTOR:");
        System.out.println("   - Clean up code, remove duplication, improve naming, optimize algorithms.");
        System.out.println("   - Rerun test suite to guarantee zero regression breaks.");

        System.out.println("\n==========================================================================");
    }
}
