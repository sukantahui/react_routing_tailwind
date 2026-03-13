/**
 * TraverseForLoop.java
 * 
 * Demonstrates array traversal using a standard for loop.
 * Shows printing elements, summing, and finding maximum.
 * 
 * @author Sukanta Hui (for classroom use)
 */
public class TraverseForLoop {
    public static void main(String[] args) {
        // Sample array (could also be read from user)
        int[] numbers = { 10, 25, 8, 17, 42 };

        // 1. Print all elements with their indices
        System.out.println("Array elements with indices:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }

        // 2. Calculate sum of all elements
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        System.out.println("\nSum of all elements: " + sum);

        // 3. Find the maximum element
        int max = numbers[0]; // assume first is largest
        for (int i = 1; i < numbers.length; i++) { // start from index 1
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum element: " + max);

        // 4. Traverse backwards
        System.out.print("Traversing backwards: ");
        for (int i = numbers.length - 1; i >= 0; i--) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();
    }
}