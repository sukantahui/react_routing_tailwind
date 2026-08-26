/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 1: JUnit 5 Architecture - Platform, Jupiter & Vintage
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class JUnit5ArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: JUNIT 5 THREE-TIER ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> JUNIT 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage\n");

        System.out.println("1. JUnit Platform:");
        System.out.println("   - Foundation for launching testing frameworks on the JVM.");
        System.out.println("   - Standard TestEngine API used by IDEs (IntelliJ, Eclipse, VS Code) and build tools (Maven, Gradle).\n");

        System.out.println("2. JUnit Jupiter:");
        System.out.println("   - The modern programming and extension model for JUnit 5.");
        System.out.println("   - Provides @Test, @BeforeEach, Assertions, Parameterized tests, and Jupiter TestEngine.\n");

        System.out.println("3. JUnit Vintage:");
        System.out.println("   - TestEngine to execute legacy JUnit 3 and JUnit 4 tests seamlessly on the Platform.");

        System.out.println("\n==========================================================================");
    }
}
