/**
 * File: StringConcatenationOverloadingDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 4)
 * Description: Demonstrates Java's built-in overloaded '+' operator for String concatenation,
 *              Left-to-Right associativity evaluation traps, primitive-to-string conversions,
 *              null reference handling, Java 9+ invokedynamic (JEP 280), StringBuilder in loops,
 *              and student certificate & invoice generation in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class StringConcatenationOverloadingDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 4 STRING CONCATENATION & OPERATOR OVERLOADING");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Fundamental String Concatenation vs Numeric Addition
        System.out.println("--- 1. CONCATENATION VS NUMERIC ADDITION ---");
        int baseFee = 15000;
        int labFee = 2500;

        // Numeric addition:
        int totalNumeric = baseFee + labFee;
        System.out.printf("Numeric Addition: baseFee + labFee = %d%n", totalNumeric);

        // String concatenation with Indian Rupee (₹) symbol:
        String feeMessage = "Total Payable Fee: ₹" + totalNumeric;
        System.out.printf("String Concatenation               : \"%s\"%n%n", feeMessage);

        // 2. Left-to-Right Associativity Traps
        System.out.println("--- 2. LEFT-TO-RIGHT EVALUATION TRAPS ---");
        // Case A: Number + Number + String
        String caseA = 10 + 20 + " Barrackpore"; // (10 + 20) -> 30 + " Barrackpore" -> "30 Barrackpore"

        // Case B: String + Number + Number
        String caseB = "Barrackpore " + 10 + 20; // ("Barrackpore " + 10) -> "Barrackpore 10" + 20 -> "Barrackpore 1020"

        // Case C: String + (Number + Number)
        String caseC = "Barrackpore " + (10 + 20); // Parentheses force addition first -> "Barrackpore 30"

        // Case D: Character + Character vs String + Character + Character
        int charSum = 'A' + 'B'; // 65 + 66 = 131 (Integer arithmetic!)
        String charConcat = "" + 'A' + 'B'; // String concatenation -> "AB"

        System.out.printf("Case A (10 + 20 + \" B\")      : \"%s\"%n", caseA);
        System.out.printf("Case B (\"B \" + 10 + 20)      : \"%s\" (Trap: 10 and 20 are NOT added!)%n", caseB);
        System.out.printf("Case C (\"B \" + (10 + 20))    : \"%s\" (Fixed with parentheses)%n", caseC);
        System.out.printf("Case D ('A' + 'B' as int)     : %d (ASCII sum)%n", charSum);
        System.out.printf("Case D (\"\" + 'A' + 'B')      : \"%s\" (String concatenation)%n%n", charConcat);

        // 3. Null Reference Handling in Concatenation
        System.out.println("--- 3. NULL REFERENCE HANDLING ---");
        String middleName = null;
        // String.valueOf(null) produces the string "null" safely without throwing NullPointerException:
        String fullStudentName = "Swadeep " + middleName + " Hui";
        System.out.printf("Concatenating null reference  : \"%s\"%n", fullStudentName);

        // Warning: Calling .toString() on null throws NullPointerException!
        // String bad = middleName.toString(); // THROWS NullPointerException!
        System.out.println("Note: '+' operator converts null to \"null\", preventing NullPointerException.\n");

        // 4. Performance: Loop Concatenation vs StringBuilder
        System.out.println("--- 4. PERFORMANCE: LOOP CONCATENATION VS STRINGBUILDER ---");
        String[] enrolledStudents = {"Swadeep", "Tuhina", "Abhronila", "Debangshu"};

        // Inefficient in large loops (Creates O(N^2) intermediate String objects):
        String studentRoster = "";
        for (String student : enrolledStudents) {
            studentRoster += student + ", ";
        }
        System.out.printf("String '+=' in loop result    : \"%s\"%n", studentRoster);

        // High-Performance Production Pattern (O(N) linear time):
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < enrolledStudents.length; i++) {
            sb.append(enrolledStudents[i]);
            if (i < enrolledStudents.length - 1) sb.append(", ");
        }
        System.out.printf("StringBuilder.append() result : \"%s\"%n%n", sb.toString());

        // 5. Automated Student Certificate Generator (Barrackpore Lab)
        System.out.println("--- 5. BARRACKPORE CERTIFICATE GENERATION ENGINE ---");
        generateCertificate("Swadeep Hui", "Full Stack Java", 94.5, 15000.0);
        generateCertificate("Tuhina Mukherjee", "Data Science Core", 96.0, 22000.0);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. '+' is the ONLY overloaded operator in Java (addition vs concatenation).");
        System.out.println("2. \"Text\" + 10 + 20 results in \"Text1020\"; use parentheses \"Text\" + (10 + 20).");
        System.out.println("3. 'A' + 'B' yields 131; use \"\" + 'A' + 'B' to get \"AB\".");
        System.out.println("4. Inside loops, always use StringBuilder instead of '+=' to prevent memory bloat.");
        System.out.println("================================================================================");
    }

    private static void generateCertificate(String name, String course, double score, double fee) {
        String certificate = "╔══════════════════════════════════════════════════════════════════╗\n" +
                "║ CODER & ACCOTAX - BARRACKPORE CERTIFICATE OF EXCELLENCE         ║\n" +
                "╠══════════════════════════════════════════════════════════════════╣\n" +
                "║ This is to certify that: " + String.format("%-39s", name) + "║\n" +
                "║ has successfully completed: " + String.format("%-36s", course) + "║\n" +
                "║ with a final merit score of: " + String.format("%-5.1f%%", score) + " (Fee Paid: ₹" + String.format("%,.2f", fee) + ")     ║\n" +
                "╚══════════════════════════════════════════════════════════════════╝";
        System.out.println(certificate);
    }
}
