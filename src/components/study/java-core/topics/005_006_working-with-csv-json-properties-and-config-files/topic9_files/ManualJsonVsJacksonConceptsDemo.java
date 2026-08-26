/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 9: Manual JSON Generation vs Enterprise Libraries (Jackson, Gson Concepts)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.util.List;

// Simple Java Domain Record/Class:
class StudentRecord {
    public final int id;
    public final String name;
    public final double fee;
    public final List<String> courses;

    public StudentRecord(int id, String name, double fee, List<String> courses) {
        this.id = id;
        this.name = name;
        this.fee = fee;
        this.courses = courses;
    }

    // Manual Lightweight JSON Generator (Zero-Dependency Pure Core Java):
    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");
        sb.append("  "id": ").append(id).append(",\n");
        sb.append("  "name": "").append(name.replace(""", "\\"")).append("",\n");
        sb.append("  "fee": ").append(String.format("%.2f", fee)).append(",\n");
        sb.append("  "courses": [");
        for (int i = 0; i < courses.size(); i++) {
            sb.append(""").append(courses.get(i)).append(""");
            if (i < courses.size() - 1) sb.append(", ");
        }
        sb.append("]\n");
        sb.append("}");
        return sb.toString();
    }
}

public class ManualJsonVsJacksonConceptsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: MANUAL JSON GENERATION VS JACKSON/GSON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StudentRecord student = new StudentRecord(
                101, "Swadeep Paul", 8500.0, List.of("Java Core", "Spring Boot", "PostgreSQL")
        );

        System.out.println(">>> 1. Manual Zero-Dependency JSON Generation (Core Java):");
        String jsonPayload = student.toJson();
        System.out.println(jsonPayload);

        System.out.println("\n>>> 2. ENTERPRISE COMPARISON MATRIX:");
        System.out.println("+----------------------+---------------------------------+---------------------------------+");
        System.out.println("| Feature              | Manual Core Java JSON           | Enterprise Libraries (Jackson)  |");
        System.out.println("+----------------------+---------------------------------+---------------------------------+");
        System.out.println("| External Jars        | Zero dependencies               | Requires jackson-databind JARs  |");
        System.out.println("| Complexity           | Error-prone string formatting   | Automated via ObjectMapper      |");
        System.out.println("| Deep Object Graphs   | Tedious manual nested loops     | Automatic recursive traversal   |");
        System.out.println("| Performance          | Blazing fast for simple DTOs    | Optimized bytecode generation   |");
        System.out.println("+----------------------+---------------------------------+---------------------------------+");

        System.out.println("\n==========================================================================");
    }
}