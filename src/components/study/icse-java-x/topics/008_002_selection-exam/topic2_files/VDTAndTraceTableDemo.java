/**
 * ============================================================================
 * ICSE CLASS X - VARIABLE DESCRIPTION TABLE (VDT) & TRACE DEMONSTRATION
 * ============================================================================
 * Educator: Sukanta Hui | Barrackpore, Kolkata
 * Institute: Coder & AccoTax
 * 
 * Problem: Input 10 student percentages into a 1D array.
 * Compute and display:
 * 1. The highest percentage and lowest percentage.
 * 2. The average percentage of the class.
 * 3. Count of students scoring >= 90% (Distinction).
 * 
 * This program demonstrates how every single variable declared in a Java
 * program must correspond to an entry in the official Variable Description Table.
 * ============================================================================
 */

import java.util.Scanner;

public class VDTAndTraceTableDemo {

    public static void main(String[] args) {
        // Variable declarations with explicit types and purposes
        Scanner sc = new Scanner(System.in);
        final int TOTAL_STUDENTS = 10;
        double[] marks = new double[TOTAL_STUDENTS];

        System.out.println("Enter percentages for " + TOTAL_STUDENTS + " students:");
        for (int i = 0; i < TOTAL_STUDENTS; i++) {
            System.out.print("Student " + (i + 1) + " Percentage: ");
            marks[i] = sc.nextDouble();
        }

        // Initialize tracking variables
        double highest = marks[0];
        double lowest = marks[0];
        double sum = 0.0;
        int distinctionCount = 0;

        // Trace and compute statistics
        for (int i = 0; i < TOTAL_STUDENTS; i++) {
            double currentMark = marks[i];
            sum += currentMark;

            if (currentMark > highest) {
                highest = currentMark;
            }
            if (currentMark < lowest) {
                lowest = currentMark;
            }
            if (currentMark >= 90.0) {
                distinctionCount++;
            }
        }

        double average = sum / TOTAL_STUDENTS;

        // Display results
        System.out.println("\n==========================================");
        System.out.println("        CLASS PERFORMANCE REPORT          ");
        System.out.println("==========================================");
        System.out.printf("Highest Percentage   : %.2f%%\n", highest);
        System.out.printf("Lowest Percentage    : %.2f%%\n", lowest);
        System.out.printf("Class Average        : %.2f%%\n", average);
        System.out.println("Distinctions (>= 90%): " + distinctionCount);
        System.out.println("==========================================");

        sc.close();
    }
}

/*
 * ============================================================================
 * OFFICIAL CISCE VARIABLE DESCRIPTION TABLE (VDT) FOR THE ABOVE PROGRAM:
 * ============================================================================
 * | Sl. No. | Variable Name     | Data Type  | Purpose / Description                                         |
 * | :---    | :---              | :---       | :---                                                          |
 * | 1       | sc                | Scanner    | Object reference to read inputs from System.in                |
 * | 2       | TOTAL_STUDENTS    | int        | Constant storing total number of students (10)                |
 * | 3       | marks             | double[]   | 1D array to store percentages of all students                 |
 * | 4       | i                 | int        | Loop counter variable for array traversal                     |
 * | 5       | highest           | double     | Stores the maximum percentage found in the class              |
 * | 6       | lowest            | double     | Stores the minimum percentage found in the class              |
 * | 7       | sum               | double     | Accumulator to sum all marks for computing average            |
 * | 8       | distinctionCount  | int        | Counter to count students scoring >= 90%                      |
 * | 9       | currentMark       | double     | Stores the current student percentage in the loop             |
 * | 10      | average           | double     | Stores the computed arithmetic mean of class marks            |
 * | 11      | args              | String[]   | Command-line arguments array in main() method                 |
 * ============================================================================
 */
