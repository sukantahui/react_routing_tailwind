/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 25: Interview Questions and Output-Based Problems
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class OutputTracingInterviewDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    ICSE SECTION A: OUTPUT-BASED QUESTION TRACING ");
        System.out.println("==================================================");

        // Problem 1: Chained operations
        String s1 = "  Barrackpore Education  ";
        String out1 = s1.trim().substring(0, 11).toUpperCase();
        System.out.println("[Problem 1]: s1.trim().substring(0, 11).toUpperCase()");
        System.out.println("Output: \"" + out1 + "\" (Expected: \"BARRACKPORE\")");

        // Problem 2: Character addition vs String concatenation
        System.out.println("\n[Problem 2]: Character vs String Output:");
        System.out.println("    'A' + 'B'     = " + ('A' + 'B'));       // 65 + 66 = 131
        System.out.println("    \"\" + 'A' + 'B' = " + ("" + 'A' + 'B'));   // "AB"
        System.out.println("    'A' + 10      = " + ('A' + 10));        // 65 + 10 = 75
        System.out.println("    (char)('A'+10)= " + (char)('A' + 10));  // 'K' (75 is K)

        // Problem 3: indexOf with fromIndex
        String s2 = "KOLKATA";
        System.out.println("\n[Problem 3]: Substring and indexOf Math:");
        System.out.println("    s2.indexOf('K', 1) = " + s2.indexOf('K', 1)); // 3
        System.out.println("    s2.substring(3, 6) = " + s2.substring(3, 6)); // "KAT"

        // Problem 4: compareTo calculation
        String s3 = "EXAM";
        String s4 = "EXCELLENT";
        System.out.println("\n[Problem 4]: compareTo Math:");
        // Differ at index 2: 'A'(65) vs 'C'(67) -> 65 - 67 = -2
        System.out.println("    s3.compareTo(s4) = " + s3.compareTo(s4)); // -2

        // Problem 5: Nested ternary with equals
        String role = "STUDENT";
        int fee = role.equalsIgnoreCase("student") ? 500 : 1500;
        System.out.println("\n[Problem 5]: Ternary output: Fee = Rs." + fee);

        System.out.println("==================================================");
    }
}