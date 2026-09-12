/**
 * Topic 2 - Example 3: Tabular Student Marks Grade Sheet
 * ICSE Class X Computer Applications - BlueJ Compatible
 * 
 * Demonstrates:
 * 1. Practical 2D array: Rows represent students, Columns represent subjects
 * 2. Row sums -> Total marks and percentage for each student
 * 3. Column sums -> Class average for each academic subject
 * 
 * Author: Sukanta Hui (Coder & AccoTax)
 * Location: Barrackpore, West Bengal
 */

public class StudentMarksReportDemo {

    public static void main(String[] args) {
        System.out.println("========================================================================");
        System.out.println("  TOPIC 2 · EXAMPLE 3: STUDENT MARKS & SUBJECT PERFORMANCE REPORT");
        System.out.println("========================================================================");

        String[] students = {"Debangshu", "Swadeep", "Priyanka", "Ananya"};
        String[] subjects = {"English", "Maths", "Science", "Computers"};

        // Marks out of 100 for 4 students across 4 subjects
        int[][] marks = {
            {88, 94, 91, 98}, // Debangshu
            {76, 85, 82, 90}, // Swadeep
            {92, 98, 95, 100}, // Priyanka
            {81, 79, 88, 92}  // Ananya
        };

        int numStudents = marks.length;
        int numSubjects = marks[0].length;

        // Print Tabular Heading
        System.out.printf("%-12s", "Student");
        for (String sub : subjects) {
            System.out.printf("%-10s", sub);
        }
        System.out.printf("%-8s%-8s\n", "Total", "%age");
        System.out.println("------------------------------------------------------------------------");

        int[] studentTotals = new int[numStudents];
        int[] subjectTotals = new int[numSubjects];

        // Calculating Row Sums (Student Totals)
        for (int i = 0; i < numStudents; i++) {
            int total = 0;
            System.out.printf("%-12s", students[i]);
            for (int j = 0; j < numSubjects; j++) {
                System.out.printf("%-10d", marks[i][j]);
                total += marks[i][j];
                subjectTotals[j] += marks[i][j]; // Accumulate into subject column total
            }
            studentTotals[i] = total;
            double pct = (double) total / numSubjects;
            System.out.printf("%-8d%6.1f%%\n", total, pct);
        }

        System.out.println("------------------------------------------------------------------------");

        // Display Column Sums & Subject Averages
        System.out.printf("%-12s", "Sub Avg");
        for (int j = 0; j < numSubjects; j++) {
            double avg = (double) subjectTotals[j] / numStudents;
            System.out.printf("%-10.1f", avg);
        }
        System.out.println();
        System.out.println("========================================================================");

        // Highest Scorer Announcement
        int topStudentIdx = 0;
        for (int i = 1; i < numStudents; i++) {
            if (studentTotals[i] > studentTotals[topStudentIdx]) {
                topStudentIdx = i;
            }
        }
        System.out.println("★ Batch Topper: " + students[topStudentIdx] + 
                           " with " + studentTotals[topStudentIdx] + "/" + (numSubjects * 100) + 
                           " (" + String.format("%.1f", (double) studentTotals[topStudentIdx] / numSubjects) + "%)");
        System.out.println("========================================================================");
    }
}
