/**
 * File: NestedLoopsAndGridTraversalDemo.java
 * Module: 001_005_loops-iteration-and-jump-statements (Topic 10)
 * Description: Demonstrates nested loops in Java, outer vs inner loop execution order,
 *              2D matrix grid traversal (row-major order), total multiplicative complexity O(R x C),
 *              and computer lab workstation seating & fee matrix in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.loops;

public class NestedLoopsAndGridTraversalDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 10 NESTED LOOPS & GRID TRAVERSAL");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        int totalRows = 3; // 3 Workstation Rows in Barrackpore Lab
        int totalCols = 4; // 4 Workstation Desks per Row

        // 1. Basic Nested Loop Execution Order Trace
        System.out.println("--- 1. OUTER VS INNER EXECUTION ORDER TRACE ---");
        int globalStep = 0;
        for (int row = 1; row <= totalRows; row++) {
            System.out.printf("  >> [OUTER LOOP]: Row #%d Initiated%n", row);
            for (int col = 1; col <= totalCols; col++) {
                globalStep++;
                System.out.printf("     -> [INNER LOOP]: (Row %d, Desk %d) | Overall Execution #%d%n",
                        row, col, globalStep);
            }
            System.out.printf("  << [OUTER LOOP]: Row #%d Completed%n%n", row);
        }
        System.out.printf("-> Total Workstation Cycles: %d rows x %d cols = %d iterations%n%n",
                totalRows, totalCols, globalStep);

        // 2. 2D Financial Revenue Grid Matrix (₹)
        System.out.println("--- 2. 2D BATCH REVENUE MATRIX TRAVERSAL ---");
        // Rows = 3 Semesters, Cols = 3 Course Tracks (Java, Spring, DevOps)
        double[][] tuitionMatrix = {
                {12000.0, 15000.0, 18000.0}, // Semester 1
                {13000.0, 16000.0, 19000.0}, // Semester 2
                {14000.0, 17000.0, 20000.0}  // Semester 3
        };

        double grandTotalRevenue = 0.0;
        for (int r = 0; r < tuitionMatrix.length; r++) {
            double semesterRowTotal = 0.0;
            System.out.printf("  Semester %d: ", (r + 1));
            for (int c = 0; c < tuitionMatrix[r].length; c++) {
                double trackFee = tuitionMatrix[r][c];
                semesterRowTotal += trackFee;
                grandTotalRevenue += trackFee;
                System.out.printf("Track[%d]: ₹%,.2f  ", (c + 1), trackFee);
            }
            System.out.printf("| Subtotal: ₹%,.2f%n", semesterRowTotal);
        }
        System.out.printf("%n-> Grand Total 3x3 Matrix Revenue: ₹%,.2f%n", grandTotalRevenue);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. For every 1 outer loop step, the inner loop completes ALL its iterations.");
        System.out.println("2. Total executions = (Outer Count) x (Inner Count) -> Multiplicative O(R x C).");
        System.out.println("3. Standard 2D array convention: matrix[row][col] (Row-Major Traversal).");
        System.out.println("4. Keep nested loops shallow; 3+ levels of nesting increases cognitive and time complexity.");
        System.out.println("================================================================================");
    }
}
