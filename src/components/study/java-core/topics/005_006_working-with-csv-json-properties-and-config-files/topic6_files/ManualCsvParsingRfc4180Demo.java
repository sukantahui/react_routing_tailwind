/**
 * Java Core Tutorial - Module 005_006: CSV, JSON, Properties & Config Files
 * Topic 6: Parsing CSV Files Manually in Java: RFC 4180 Rules (Quotes & Embedded Commas)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.config;

import java.util.ArrayList;
import java.util.List;

public class ManualCsvParsingRfc4180Demo {

    // RFC 4180 Compliant CSV Line Parser (Handles commas inside quotes & escaped double quotes):
    public static List<String> parseCsvLine(String line) {
        List<String> tokens = new ArrayList<>();
        StringBuilder currentToken = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);

            if (c == '"') {
                // Check for escaped quote (""):
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    currentToken.append('"');
                    i++; // Skip the second quote
                } else {
                    inQuotes = !inQuotes; // Toggle quote state
                }
            } else if (c == ',' && !inQuotes) {
                // Delimiter encountered OUTSIDE quotes:
                tokens.add(currentToken.toString().trim());
                currentToken.setLength(0); // Reset buffer
            } else {
                currentToken.append(c);
            }
        }
        tokens.add(currentToken.toString().trim()); // Add final token
        return tokens;
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: RFC 4180 MANUAL CSV PARSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Tricky CSV lines with embedded commas and escaped quotes:
        String[] testCsvLines = {
                "STU_101,Swadeep Paul,8500.00,Active",
                "STU_102,"Das, Tuhina (Top Scorer)",9200.00,Active",
                "STU_103,"Mukherjee, Debangshu ""The Architect""",9800.00,Active"
        };

        for (int i = 0; i < testCsvLines.length; i++) {
            System.out.println(">>> Parsing CSV Row #" + (i + 1) + ":");
            System.out.println("  Raw Line : " + testCsvLines[i]);
            List<String> parsed = parseCsvLine(testCsvLines[i]);
            System.out.println("  Tokens   : " + parsed);
            System.out.println("  Fields (4): [ID=" + parsed.get(0) + " | Name=" + parsed.get(1) + " | Fee=" + parsed.get(2) + " | Status=" + parsed.get(3) + "]\n");
        }

        System.out.println("==========================================================================");
    }
}