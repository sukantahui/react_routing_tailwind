/**
 * DisplayArrayElements.java
 * 
 * Demonstrates various ways to display array elements in Java.
 * 
 * @author Sukanta Hui (for classroom use)
 */

public class DisplayArrayElements {
    public static void main(String[] args) {
        // Sample array – marks of students
        int[] marks = { 85, 90, 78, 92, 88 };

        // 1. Using a basic for loop (with index)
        System.out.println("1. Using basic for loop:");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + " ");
        }
        System.out.println("\n");

        // 2. Using enhanced for loop (for-each)
        System.out.println("2. Using enhanced for loop:");
        for (int mark : marks) {
            System.out.print(mark + " ");
        }
        System.out.println("\n");

        // 3. Using displayArray(arr)
        System.out.println("3. Using displayArray(arr):");
        // ICSE Syllabus: Manual array element display using loop
        System.out.print("[");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + (i < marks.length - 1 ? ", " : ""));
        }
        System.out.println("]");
        System.out.println();

        // 4. Formatted output (with commas and brackets)
        System.out.println("4. Custom formatted output:");
        System.out.print("[");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i]);
            if (i < marks.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]\n");

        // 5. For 2D arrays – ManualLoopArrayUtility.deepToString()
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("5. 2D array using ManualLoopArrayUtility.deepToString():");
        System.out.println(ManualLoopArrayUtility.deepToString(matrix));
    }
}