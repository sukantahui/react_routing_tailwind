/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 6: Test Doubles Taxonomy - Dummy, Stub, Spy & Mock
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class TestDoublesMockStubSpyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: TEST DOUBLES TAXONOMY - BARRACKPORE ACADEMY");
        System.out.println(" EDUCATOR: SUKANTA HUI");
        System.out.println("==========================================================================\n");

        System.out.println("1. DUMMY:");
        System.out.println("   - Passed around just to satisfy parameter lists; never actually used.\n");

        System.out.println("2. FAKE:");
        System.out.println("   - Working implementation but unsuitable for production (e.g. In-Memory H2 DB vs Oracle).\n");

        System.out.println("3. STUB:");
        System.out.println("   - Provides pre-configured canned answers to method calls made during test (when().thenReturn()).\n");

        System.out.println("4. SPY (Partial Mock):");
        System.out.println("   - Wraps a REAL object instance; delegates to real methods while recording invocations.\n");

        System.out.println("5. MOCK:");
        System.out.println("   - Pre-programmed with expectations which form a specification of the calls they expect to receive.");

        System.out.println("\n==========================================================================");
    }
}
