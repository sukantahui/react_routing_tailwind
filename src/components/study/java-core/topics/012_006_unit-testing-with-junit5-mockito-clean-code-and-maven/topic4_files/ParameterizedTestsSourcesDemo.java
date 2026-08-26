/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 4: Parameterized Tests with @ParameterizedTest and Data Sources
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class ParameterizedTestsSourcesDemo {

    public static class StringUtils {
        public static boolean isPalindrome(String s) {
            if (s == null) return false;
            String cleaned = s.replaceAll("\\s+", "").toLowerCase();
            return new StringBuilder(cleaned).reverse().toString().equals(cleaned);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PARAMETERIZED TESTS IN JUNIT 5 - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. @ValueSource EXAMPLE:");
        System.out.println("  @ParameterizedTest");
        System.out.println("  @ValueSource(strings = {"radar", "madam", "level", "rotor"})");
        System.out.println("  void testPalindromes(String word) {");
        System.out.println("      assertTrue(StringUtils.isPalindrome(word));");
        System.out.println("  }\n");

        System.out.println(">>> 2. @CsvSource EXAMPLE (Input vs Expected):");
        System.out.println("  @ParameterizedTest");
        System.out.println("  @CsvSource({");
        System.out.println("      "radar, true",");
        System.out.println("      "java, false",");
        System.out.println("      "noon, true"");
        System.out.println("  })");
        System.out.println("  void testWithCsv(String word, boolean expected) {");
        System.out.println("      assertEquals(expected, StringUtils.isPalindrome(word));");
        System.out.println("  }");

        System.out.println("\n==========================================================================");
    }
}
