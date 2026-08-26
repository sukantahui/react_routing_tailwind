/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 10: Whitespace & Interpolation in Text Blocks: formatted(), stripIndent(), translateEscapes()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class TextBlockMethodsAndInterpolationDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: TEXT BLOCK HELPER METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String studentName = "Swadeep Paul";
        String hub = "Barrackpore Central";
        double gpa = 9.85;

        // 1. Text Block Interpolation using .formatted() (Instance method added in Java 15!):
        String template = """
                {
                  "student": "%s",
                  "hub": "%s",
                  "gpa": %.2f
                }
                """.formatted(studentName, hub, gpa);

        System.out.println(">>> 1. Interpolated Text Block via .formatted():");
        System.out.println(template);

        // 2. Line continuation using trailing backslash '\' (prevents newline):
        String singleLineQuery = """
                SELECT * FROM students                 WHERE hub = 'Barrackpore'                 AND active = true;                """;

        System.out.println(">>> 2. Single Line Output with Escaped Newlines ('\\'):");
        System.out.println("  " + singleLineQuery);

        System.out.println("\n==========================================================================");
    }
}