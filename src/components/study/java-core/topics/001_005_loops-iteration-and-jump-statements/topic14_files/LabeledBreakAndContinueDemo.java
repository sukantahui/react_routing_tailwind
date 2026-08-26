/**
 * File: LabeledBreakAndContinueDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 14)
 * Description: Demonstrates labeled 'break' and labeled 'continue' in Java (JLS §14.7, §14.15, §14.16),
 *              breaking out of multi-tier nested loops, skipping entire matrix rows via labeled continue,
 *              structured alternative to 'goto', and 2D examination hall seating lookup in Indian Rupees (₹)
 *              at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class LabeledBreakAndContinueDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 14 LABELED 'BREAK' & 'CONTINUE'");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 3 Rows (Exam Halls in Barrackpore, Shyamnagar, Naihati) x 4 Desks
        int[][] seatingMatrix = {
                {101, 102, 103, 104}, // Barrackpore Campus Hall 1
                {201, 202, 203, 204}, // Shyamnagar Campus Hall 2
                {301, 302, 303, 304}  // Naihati Campus Hall 3
        };

        // 1. Labeled 'break' Matrix Search
        System.out.println("--- 1. LABELED 'BREAK': INSTANT 2D MATRIX EXIT ---");
        int targetCandidateRoll = 203; // Abhronila's Roll
        boolean candidateFound = false;

        HALL_SEARCH: // Statement Label on the outer loop
        for (int hall = 0; hall < seatingMatrix.length; hall++) {
            for (int desk = 0; desk < seatingMatrix[hall].length; desk++) {
                int currentRoll = seatingMatrix[hall][desk];
                System.out.printf("  Inspecting Hall %d, Desk %d (Roll #%d)...%n",
                        (hall + 1), (desk + 1), currentRoll);

                if (currentRoll == targetCandidateRoll) {
                    System.out.printf("  ✓ MATCH LOCATED at Hall %d, Desk %d! Executing 'break HALL_SEARCH;'.%n",
                            (hall + 1), (desk + 1));
                    candidateFound = true;
                    break HALL_SEARCH; // Escapes BOTH inner desk loop and outer hall loop!
                }
            }
        }
        System.out.printf("-> Search Completed: %s (Bypassed Hall 3 entirely!)%n%n",
                (candidateFound ? "Candidate Found" : "Not Found"));

        // 2. Labeled 'continue' Row Skipping
        System.out.println("--- 2. LABELED 'CONTINUE': SKIPPING ENTIRE MATRIX ROWS ---");
        // Rows with defective lab equipment must be skipped entirely:
        int defectiveHallIndex = 1; // Hall 2 equipment under maintenance

        HALL_LOOP:
        for (int hall = 0; hall < seatingMatrix.length; hall++) {
            System.out.printf("  >> Initiating Audit for Hall #%d:%n", (hall + 1));

            for (int desk = 0; desk < seatingMatrix[hall].length; desk++) {
                if (hall == defectiveHallIndex) {
                    System.out.printf("     [MAINTENANCE ALERT]: Hall #%d under repair! Executing 'continue HALL_LOOP;'.%n",
                            (hall + 1));
                    continue HALL_LOOP; // Skips all remaining desks in Hall 2 and advances to Hall 3!
                }
                System.out.printf("     Desk #%d: Verified Roll #%d%n", (desk + 1), seatingMatrix[hall][desk]);
            }
            System.out.printf("  << Hall #%d Audit Completed Successfully.%n", (hall + 1));
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Labeled 'break LABEL;' exits all nested tiers up to the labeled loop immediately.");
        System.out.println("2. Labeled 'continue LABEL;' advances directly to the update clause of the labeled loop.");
        System.out.println("3. Provides clean, structured multi-level flow control without arbitrary 'goto'.");
        System.out.println("4. Labels must immediately precede the target loop header (LABEL: for(...)).");
        System.out.println("================================================================================");
    }
}
