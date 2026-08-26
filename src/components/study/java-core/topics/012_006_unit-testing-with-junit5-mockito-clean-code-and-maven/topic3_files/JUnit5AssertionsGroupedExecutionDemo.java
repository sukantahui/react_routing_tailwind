/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 3: JUnit 5 Assertions - assertEquals, assertThrows, assertTimeout & assertAll
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class JUnit5AssertionsGroupedExecutionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: JUNIT 5 ASSERTION TOOLKIT - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. VALUE ASSERTIONS (org.junit.jupiter.api.Assertions):");
        System.out.println("  - assertEquals(expected, actual, "Failure message")");
        System.out.println("  - assertTrue(condition), assertFalse(condition)");
        System.out.println("  - assertNull(object), assertNotNull(object)\n");

        System.out.println(">>> 2. EXCEPTION ASSERTIONS:");
        System.out.println("  - assertThrows(IllegalArgumentException.class, () -> service.calculate(-1));\n");

        System.out.println(">>> 3. TIMEOUT ASSERTIONS:");
        System.out.println("  - assertTimeout(Duration.ofMillis(100), () -> heavyAlgorithm());\n");

        System.out.println(">>> 4. GROUPED ASSERTIONS (assertAll):");
        System.out.println("  assertAll("Student Verification",");
        System.out.println("      () -> assertEquals("Tuhina Das", student.getName()),");
        System.out.println("      () -> assertEquals("Barrackpore", student.getCenter()),");
        System.out.println("      () -> assertTrue(student.getScore() > 90)");
        System.out.println("  );");

        System.out.println("\n==========================================================================");
    }
}
