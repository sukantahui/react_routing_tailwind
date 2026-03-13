/**
 * ArrayInputScanner.java
 * 
 * Demonstrates how to read array elements from the user using Scanner.
 * - Reads array size
 * - Reads each element
 * - Displays the array
 * 
 * @author Sukanta Hui (for classroom use)
 */
import java.util.Scanner;

public class ArrayInputScanner {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Read array size
        System.out.print("Enter the number of elements: ");
        int size = sc.nextInt();

        // Validate size
        if (size <= 0) {
            System.out.println("Size must be positive. Exiting.");
            sc.close();
            return;
        }

        // Create array
        int[] numbers = new int[size];

        // Read elements
        System.out.println("Enter " + size + " integers:");
        for (int i = 0; i < size; i++) {
            System.out.print("Element " + (i + 1) + ": ");
            numbers[i] = sc.nextInt();
        }

        // Display the array
        System.out.print("You entered: ");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // Close scanner
        sc.close();
    }
}