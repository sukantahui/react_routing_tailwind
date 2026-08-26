/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 6: Chaining StringBuilder Methods Fluently (Fluent Interface Pattern)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class MethodChainingFluentPipelineDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: FLUENT METHOD CHAINING PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // FLUENT BUILDER PIPELINE:
        // Each method returns 'this' (the current StringBuilder instance reference)!
        String query = new StringBuilder("SELECT id, full_name, gpa ")
                .append("FROM trainee_records ")
                .append("WHERE hub_location = 'Barrackpore' ")
                .append("AND gpa >= 9.0 ")
                .append("ORDER BY full_name ASC;")
                .toString();

        System.out.println(">>> Assembled SQL Query via Fluent Chaining:");
        System.out.println("  " + query);

        System.out.println("\n>>> Why Method Chaining Works in Java:");
        System.out.println("  - 'append()', 'insert()', and 'reverse()' all return 'this' (the reference to itself).");
        System.out.println("  - Allows nesting multiple operations into a single clean, readable statement.");

        System.out.println("\n==========================================================================");
    }
}