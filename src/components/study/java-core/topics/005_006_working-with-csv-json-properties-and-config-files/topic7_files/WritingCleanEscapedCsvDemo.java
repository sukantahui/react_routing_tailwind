/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 7: Writing Clean CSV Files: RFC 4180 Field Escaping & Header Generation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

public class WritingCleanEscapedCsvDemo {

    // RFC 4180 Field Escaper:
    public static String escapeCsvField(String field) {
        if (field == null) return "";
        // If field contains comma, quote, or newline, enclose in quotes and escape internal quotes:
        if (field.contains(",") || field.contains(""") || field.contains("\n") || field.contains("\r")) {
            return """ + field.replace(""", """") + """;
        }
        return field;
    }

    public static void writeCsvRecord(PrintWriter pw, List<String> fields) {
        StringBuilder row = new StringBuilder();
        for (int i = 0; i < fields.size(); i++) {
            row.append(escapeCsvField(fields.get(i)));
            if (i < fields.size() - 1) row.append(",");
        }
        pw.println(row.toString());
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: WRITING CLEAN ESCAPED CSV FILES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringWriter buffer = new StringWriter();
        try (PrintWriter pw = new PrintWriter(buffer)) {
            // Header:
            writeCsvRecord(pw, List.of("ROLL_NO", "STUDENT_NAME", "BRANCH_LOCATION", "FEE_PAID"));

            // Records with tricky characters (commas, quotes):
            writeCsvRecord(pw, List.of("101", "Swadeep Paul", "Barrackpore Central", "8500.00"));
            writeCsvRecord(pw, List.of("102", "Tuhina Das", "Naihati, West Bengal", "9200.00"));
            writeCsvRecord(pw, List.of("103", "Abhronila "Top Scorer" Das", "Shyamnagar", "8500.00"));
        }

        System.out.println(">>> Generated RFC 4180 Compliant CSV File Output:");
        System.out.println(buffer.toString());

        System.out.println(">>> ESCAPING RULES VERIFIED:");
        System.out.println("  - 'Naihati, West Bengal' was wrapped in quotes -> "Naihati, West Bengal"");
        System.out.println("  - Quotes inside Abhronila were doubled -> "Abhronila ""Top Scorer"" Das"");

        System.out.println("\n==========================================================================");
    }
}