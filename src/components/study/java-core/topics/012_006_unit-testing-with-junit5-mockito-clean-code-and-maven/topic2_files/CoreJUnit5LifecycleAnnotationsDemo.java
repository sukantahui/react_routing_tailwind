/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 2: Core JUnit 5 Annotations - @Test, @BeforeEach, @AfterEach & Lifecycle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class CoreJUnit5LifecycleAnnotationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: CORE JUNIT 5 LIFECYCLE ANNOTATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> JUNIT 5 LIFECYCLE SEQUENCE FOR EACH TEST RUN:");
        System.out.println("  1. @BeforeAll  : Executed ONCE before any test (Must be static by default).");
        System.out.println("  2.   @BeforeEach : Executed before EACH @Test method (Fresh state initialization).");
        System.out.println("  3.     @Test     : The actual test execution method.");
        System.out.println("  4.   @AfterEach  : Executed after EACH @Test method (State cleanup).");
        System.out.println("  5. @AfterAll   : Executed ONCE after all tests complete (Resource teardown).\n");

        System.out.println(">>> ADDITIONAL KEY ANNOTATIONS:");
        System.out.println("  - @DisplayName("Human readable description for test reports")");
        System.out.println("  - @Disabled("Ignored temporarily due to ongoing refactoring")");
        System.out.println("  - @Tag("fast" / "slow" / "smoke") for test filtering.");

        System.out.println("\n==========================================================================");
    }
}
