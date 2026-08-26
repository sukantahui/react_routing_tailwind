/**
 * File: ModernArrowSwitchDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 11)
 * Description: Demonstrates Java Modern Switch Expressions & Arrow Syntax (JEP 361, Java 14+),
 *              replacing colon syntax (case X:) with arrow syntax (case X -> Y),
 *              single-expression value returns, zero boilerplate (no 'break' needed),
 *              and student course tuition mapping in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class ModernArrowSwitchDemo {

    public enum CourseTrack {
        JAVA_CORE, SPRING_BOOT, PYTHON_DJANGO, ACCOTAX_GST, DATA_SCIENCE
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 11 MODERN ARROW SWITCH (JAVA 14+)");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Traditional Switch Statement vs Modern Arrow Switch Expression
        System.out.println("--- 1. TRADITIONAL SWITCH VS MODERN ARROW SYNTAX ---");

        CourseTrack track = CourseTrack.SPRING_BOOT;

        // Modern Arrow Switch Expression (Clean, Concise, Value-Returning):
        int modernTuitionFee = switch (track) {
            case JAVA_CORE -> 15000;
            case SPRING_BOOT -> 22000;
            case PYTHON_DJANGO -> 14000;
            case ACCOTAX_GST -> 12000;
            case DATA_SCIENCE -> 25000;
        };

        System.out.printf("Selected Track: %s | Computed Fee: ₹%,d (via modern switch expression)%n%n",
                track, modernTuitionFee);

        // 2. Arrow Switch as a Statement (Executing Actions without Return Value)
        System.out.println("--- 2. ARROW SWITCH AS A STATEMENT (NO BREAK REQUIRED) ---");
        executeArrowAction("START");
        executeArrowAction("PAUSE");
        executeArrowAction("TERMINATE");

        // 3. Arrow Switch with Block Bodies { ... }
        System.out.println("\n--- 3. ARROW SWITCH WITH MULTI-STATEMENT BLOCK BODIES ---");
        displayTrackDetails(CourseTrack.JAVA_CORE);
        displayTrackDetails(CourseTrack.ACCOTAX_GST);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Standardized in Java 14 (JEP 361), arrow syntax (case X -> Y) transforms switch.");
        System.out.println("2. ZERO fall-through: only the expression or block to the right of '->' executes.");
        System.out.println("3. 'break' is obsolete in arrow switch; values are returned directly or via 'yield'.");
        System.out.println("4. Semicolon ';' is required at the end of a switch expression assignment.");
        System.out.println("================================================================================");
    }

    private static void executeArrowAction(String command) {
        System.out.printf("Command: %-12s -> ", command);
        switch (command) {
            case "START" -> System.out.println("Initializing Barrackpore Lab Workstation...");
            case "PAUSE" -> System.out.println("Session Paused for Tea/Mentorship Break.");
            case "TERMINATE" -> System.out.println("Shutting down development servers safely.");
            default -> System.out.println("Unrecognized command token.");
        }
    }

    private static void displayTrackDetails(CourseTrack track) {
        System.out.printf("Inspecting Track: %s%n", track);
        switch (track) {
            case JAVA_CORE -> {
                System.out.println("  * Duration: 4 Months");
                System.out.println("  * Mentor: Sukanta Hui");
                System.out.println("  * Fee: ₹15,000 (Includes Certification)");
            }
            case ACCOTAX_GST -> {
                System.out.println("  * Duration: 3 Months");
                System.out.println("  * Modules: Tally Prime & GST Portal Compliance");
                System.out.println("  * Fee: ₹12,000");
            }
            default -> System.out.println("  * Standard Curriculum & Consultation.");
        }
    }
}
