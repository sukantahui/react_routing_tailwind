/**
 * File: ForLoopVariableScopeDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 2)
 * Description: Demonstrates lexical scoping and lifetime of variables in 'for' loop headers (JLS §6.3, §14.14.1),
 *              block scope isolation, reusing loop counter names across consecutive sibling loops,
 *              local variable shadowing restrictions, preserving counter state across loop boundaries,
 *              and student scholarship seat allocation in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class ForLoopVariableScopeDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 VARIABLE SCOPE IN 'FOR' LOOP HEADERS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Header Scope Isolation: 'batchId' is scoped strictly inside the loop
        System.out.println("--- 1. HEADER SCOPE ISOLATION ---");
        for (int batchId = 101; batchId <= 103; batchId++) {
            System.out.printf("  Processing Admission Batch #%d (Barrackpore Center)%n", batchId);
        }
        // batchId is NOT accessible here!
        // System.out.println(batchId); // COMPILER ERROR: cannot find symbol variable batchId

        // 2. Reusing Loop Counter Names Across Consecutive Sibling Loops
        System.out.println("\n--- 2. REUSING COUNTER NAMES IN SIBLING LOOPS ---");
        // Loop A: Distributing Morning Shift Seat Numbers
        for (int seatNo = 1; seatNo <= 3; seatNo++) {
            System.out.printf("  Morning Shift: Seat #%d Allocated (₹15,000 Course Tier)%n", seatNo);
        }

        // Loop B: Redeclaring 'seatNo' is 100% legal because the previous 'seatNo' scope ended!
        for (int seatNo = 1; seatNo <= 3; seatNo++) {
            System.out.printf("  Evening Shift: Seat #%d Allocated (₹15,000 Course Tier)%n", seatNo);
        }

        // 3. Preserving Counter State After Loop Termination
        System.out.println("\n--- 3. PRESERVING COUNTER STATE AFTER LOOP ---");
        int targetScore = 85;
        int[] studentScores = {62, 74, 85, 91, 78};
        String[] studentNames = {"Debangshu", "Tuhina", "Swadeep", "Abhronila", "Sourav"};

        int index; // Declared outside loop to preserve value after break!
        for (index = 0; index < studentScores.length; index++) {
            if (studentScores[index] == targetScore) {
                System.out.printf("  Match Found! %s scored %d%% at index %d!%n",
                        studentNames[index], targetScore, index);
                break;
            }
        }

        // 'index' is accessible outside the loop!
        if (index < studentScores.length) {
            System.out.printf("  -> Verification Success: Student %s found at index %d.%n",
                    studentNames[index], index);
        } else {
            System.out.println("  -> Verification: Score not found in batch.");
        }

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Variables declared in a 'for' header exist ONLY during loop execution.");
        System.out.println("2. Sibling loops can redeclare the same variable name without collision.");
        System.out.println("3. Java forbids shadowing: You CANNOT redeclare an existing outer method variable in a loop header.");
        System.out.println("4. To use the loop index after termination, declare the variable BEFORE the loop.");
        System.out.println("================================================================================");
    }
}
