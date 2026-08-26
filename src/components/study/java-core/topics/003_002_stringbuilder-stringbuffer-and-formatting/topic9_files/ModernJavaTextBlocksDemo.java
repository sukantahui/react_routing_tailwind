/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 9: Modern Java Text Blocks (Java 15+ JEP 378 Standard): Multi-Line Triple Quotes
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class ModernJavaTextBlocksDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: MODERN JAVA TEXT BLOCKS (JAVA 15+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Legacy Pre-Java 15 Multi-line String (Ugly with escape chars & concatenation):
        String legacyJson = "{\n" +
                "  \"name\": \"Swadeep Paul\",\n" +
                "  \"hub\": \"Barrackpore\"\n" +
                "}";

        // 2. Modern Java 15+ Text Block (Triple Quotes):
        String modernJson = """
                {
                  "name": "Swadeep Paul",
                  "hub": "Barrackpore",
                  "course": "Java Core Pro"
                }
                """;

        System.out.println(">>> 1. Legacy Escaped String Output:");
        System.out.println(legacyJson);

        System.out.println("\n>>> 2. Modern Java 15+ Text Block Output (Zero escape backslashes!):");
        System.out.println(modernJson);

        System.out.println("==========================================================================");
    }
}