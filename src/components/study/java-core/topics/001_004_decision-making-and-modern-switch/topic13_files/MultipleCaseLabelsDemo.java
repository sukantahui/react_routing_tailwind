/**
 * File: MultipleCaseLabelsDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 13)
 * Description: Demonstrates Java 14+ Multiple Case Labels per Branch (case 1, 2, 3 ->),
 *              replacing vertical case stacking with comma-separated constant lists,
 *              days-in-month calculations, affirmative response normalizers,
 *              and campus course scheduling in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class MultipleCaseLabelsDemo {

    public enum DayOfWeek {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 13 MULTIPLE CASE LABELS PER BRANCH");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Enum Multi-Label Matching: Academic Schedule Classifier
        System.out.println("--- 1. ENUM MULTI-LABEL MATCHING (WEEKDAYS VS WEEKENDS) ---");
        classifyAcademicDay(DayOfWeek.MONDAY);
        classifyAcademicDay(DayOfWeek.SATURDAY);
        classifyAcademicDay(DayOfWeek.SUNDAY);

        // 2. Integer Multi-Label Matching: Days in Month Calculator (Leap Year Aware)
        System.out.println("\n--- 2. INTEGER MULTI-LABEL MATCHING: DAYS IN MONTH ---");
        int month = 4; // April
        int year = 2024;
        int days = getDaysInMonth(month, year);
        System.out.printf("Month: %02d/%d -> Days: %d%n", month, year, days);

        month = 2; // February (Leap Year)
        days = getDaysInMonth(month, year);
        System.out.printf("Month: %02d/%d (Leap Year) -> Days: %d%n", month, year, days);

        // 3. String Multi-Label Normalizer: Affirmative Response Parser
        System.out.println("\n--- 3. STRING MULTI-LABEL AFFIRMATIVE RESPONSE PARSER ---");
        testUserResponse("YES");
        testUserResponse("y");
        testUserResponse("1");
        testUserResponse("NO");

        // 4. Financial Fee Slabs by Month Index in Indian Rupees (₹)
        System.out.println("\n--- 4. BARRACKPORE QUARTERLY TUITION BATCH ROUTER (₹) ---");
        routeQuarterlyBatch(1);  // Q1
        routeQuarterlyBatch(6);  // Q2
        routeQuarterlyBatch(11); // Q4

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Java 14+ allows comma-separated case constants: case 1, 2, 3 ->");
        System.out.println("2. Replaces ugly vertical case stacking with clean, single-line declarations.");
        System.out.println("3. Works seamlessly with enums, strings, integers, and character types.");
        System.out.println("4. No duplicates are allowed across or within comma-separated label lists.");
        System.out.println("================================================================================");
    }

    private static void classifyAcademicDay(DayOfWeek day) {
        String schedule = switch (day) {
            case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY ->
                "Regular Lecture & Laboratory Coding (Barrackpore Center)";
            case SATURDAY, SUNDAY ->
                "Advanced Enterprise Spring Boot & AccoTax Workshop";
        };
        System.out.printf("Day: %-10s -> %s%n", day, schedule);
    }

    private static int getDaysInMonth(int month, int year) {
        boolean isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11           -> 30;
            case 2                     -> isLeapYear ? 29 : 28;
            default                    -> throw new IllegalArgumentException("Invalid month number: " + month);
        };
    }

    private static void testUserResponse(String input) {
        boolean isAffirmative = switch (input.trim().toUpperCase()) {
            case "Y", "YES", "TRUE", "1", "OK", "AGREE" -> true;
            default -> false;
        };
        System.out.printf("Input: \"%-6s\" -> Parsed as Affirmative? %b%n", input, isAffirmative);
    }

    private static void routeQuarterlyBatch(int monthNumber) {
        String batchInfo = switch (monthNumber) {
            case 1, 2, 3    -> "Quarter 1 Batch: Core Java & Data Structures (Tuition: ₹15,000)";
            case 4, 5, 6    -> "Quarter 2 Batch: Spring Boot & Microservices (Tuition: ₹22,000)";
            case 7, 8, 9    -> "Quarter 3 Batch: AccoTax GST & Tally Prime (Tuition: ₹12,000)";
            case 10, 11, 12 -> "Quarter 4 Batch: Full Stack Capstone Projects & Placements";
            default         -> "Invalid Month!";
        };
        System.out.printf("Month %2d -> %s%n", monthNumber, batchInfo);
    }
}
