/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 8: Overview of JSON (JavaScript Object Notation) Format Architecture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

public class JsonFormatStructureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: JSON FORMAT STRUCTURE OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String sampleJson =
                "{\n" +
                "  "academy": "Barrackpore Central Academy",\n" +
                "  "active": true,\n" +
                "  "established": 2018,\n" +
                "  "rating": 4.95,\n" +
                "  "leadInstructor": {\n" +
                "    "name": "Sukanta Hui",\n" +
                "    "role": "Chief Architect",\n" +
                "    "specializations": ["Java Core", "Spring Boot", "Microservices"]\n" +
                "  },\n" +
                "  "students": [\n" +
                "    { "id": 101, "name": "Swadeep Paul", "status": "PROMOTED" },\n" +
                "    { "id": 102, "name": "Tuhina Das", "status": "PROMOTED" },\n" +
                "    { "id": 103, "name": "Abhronila Das", "status": "DISTINCTION" }\n" +
                "  ]\n" +
                "}";

        System.out.println(">>> Sample Enterprise JSON Structure:");
        System.out.println(sampleJson);

        System.out.println("\n>>> THE 6 PRIMITIVE & STRUCTURAL JSON TYPES (RFC 8259):");
        System.out.println("  1. Object  : Unordered key-value collection wrapped in curly braces '{ }'.");
        System.out.println("  2. Array   : Ordered list of values wrapped in square brackets '[ ]'.");
        System.out.println("  3. String  : Text enclosed in double quotes '"..."' with backslash escapes.");
        System.out.println("  4. Number  : Integer or floating point (e.g. 2018, 4.95).");
        System.out.println("  5. Boolean : Literal 'true' or 'false'.");
        System.out.println("  6. Null    : Literal 'null'.");

        System.out.println("\n==========================================================================");
    }
}