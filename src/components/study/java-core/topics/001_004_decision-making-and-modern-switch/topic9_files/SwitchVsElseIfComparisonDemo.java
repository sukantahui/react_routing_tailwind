/**
 * File: SwitchVsElseIfComparisonDemo.java
 * Module: 001_004_decision-making-and-modern-switch (Topic 9)
 * Description: Demonstrates comparing Java 'switch' vs 'else-if' ladders:
 *              readability trade-offs, JVM bytecode compilation (tableswitch vs lookupswitch vs conditional jumps),
 *              time complexity (O(1) jump table vs O(N) linear cascade),
 *              and student course track routing in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.controlflow;

public class SwitchVsElseIfComparisonDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 9 'SWITCH' VS 'ELSE-IF' BENCHMARK");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Scenario A: Discrete Constant Matching (Switch Wins in Readability & O(1) Speed)
        System.out.println("--- 1. SCENARIO A: DISCRETE VALUE MATCHING (SWITCH IS SUPERIOR) ---");
        int option = 2;

        // Switch approach (Clean & O(1) tableswitch jump table):
        System.out.print("[Switch Approach]   -> ");
        switch (option) {
            case 1 -> System.out.println("Java Core Mastery (Fee: ₹15,000)");
            case 2 -> System.out.println("Spring Boot Enterprise (Fee: ₹22,000)");
            case 3 -> System.out.println("AccoTax GST Pro (Fee: ₹12,000)");
            default -> System.out.println("Unknown Track");
        }

        // Equivalent Else-If approach (Verbose & O(N) sequential comparisons):
        System.out.print("[Else-If Approach] -> ");
        if (option == 1) {
            System.out.println("Java Core Mastery (Fee: ₹15,000)");
        } else if (option == 2) {
            System.out.println("Spring Boot Enterprise (Fee: ₹22,000)");
        } else if (option == 3) {
            System.out.println("AccoTax GST Pro (Fee: ₹12,000)");
        } else {
            System.out.println("Unknown Track");
        }
        System.out.println();

        // 2. Scenario B: Range Inequalities & Complex Formulas (Else-If is Mandatory)
        System.out.println("--- 2. SCENARIO B: RANGE & COMPOSITE LOGIC (ELSE-IF IS MANDATORY) ---");
        int studentMarks = 88;
        boolean hasAttendanceWaiver = true;

        // Impossible in traditional switch without verbose hacks:
        if (studentMarks >= 90 || (studentMarks >= 85 && hasAttendanceWaiver)) {
            System.out.println("-> Result: Honors Scholarship Qualified (100% Tuition Waiver)");
        } else if (studentMarks >= 75) {
            System.out.println("-> Result: Merit Scholarship Qualified (50% Tuition Waiver)");
        } else {
            System.out.println("-> Result: Standard Admission");
        }
        System.out.println();

        // 3. Performance Micro-Benchmark Simulation (1,000,000 iterations)
        System.out.println("--- 3. PERFORMANCE BENCHMARK: O(1) JUMP TABLE VS O(N) CASCADE ---");
        int testKey = 4;
        long startSwitch = System.nanoTime();
        long switchSum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            switchSum += executeSwitchBranch(testKey);
        }
        long durationSwitch = System.nanoTime() - startSwitch;

        long startElseIf = System.nanoTime();
        long elseIfSum = 0;
        for (int i = 0; i < 1_000_000; i++) {
            elseIfSum += executeElseIfBranch(testKey);
        }
        long durationElseIf = System.nanoTime() - startElseIf;

        System.out.printf("Switch (tableswitch) 1M iterations : %,d ns (Sum: %d)%n", durationSwitch, switchSum);
        System.out.printf("Else-If (cascading) 1M iterations  : %,d ns (Sum: %d)%n", durationElseIf, elseIfSum);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Use 'switch' when matching a single variable against discrete constants (O(1) speed).");
        System.out.println("2. Use 'else-if' for range queries (marks >= 80), floats, and multi-variable logic.");
        System.out.println("3. The JVM optimizes dense switch branches into direct 'tableswitch' jump tables.");
        System.out.println("4. Modern Java 14+ switch expressions provide the cleanest, safest syntax for discrete mapping.");
        System.out.println("================================================================================");
    }

    private static int executeSwitchBranch(int key) {
        return switch (key) {
            case 1 -> 100;
            case 2 -> 200;
            case 3 -> 300;
            case 4 -> 400;
            default -> 0;
        };
    }

    private static int executeElseIfBranch(int key) {
        if (key == 1) return 100;
        else if (key == 2) return 200;
        else if (key == 3) return 300;
        else if (key == 4) return 400;
        else return 0;
    }
}
