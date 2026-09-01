/**
 * ArrayInputScanner.java
 * 
 * ICSE Class 10 Standard Input Demonstration using InputStreamReader & BufferedReader.
 * - Reads array size
 * - Reads each element via sc.nextInt()
 * - Displays the array using manual for-loop
 * 
 * @author Sukanta Hui (Coder & AccoTax)
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

        // Display the array manually
        System.out.print("You entered: ");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();
    }
}