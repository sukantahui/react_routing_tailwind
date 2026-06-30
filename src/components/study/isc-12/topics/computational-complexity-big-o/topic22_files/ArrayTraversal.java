import java.util.ArrayList;
import java.util.List;

/**
 * Demonstrates common O(n) array traversal operations.
 * Each operation visits every element once.
 */
public class ArrayTraversal {
    public static void main(String[] args) {
        int[] arr = {3, 7, 2, 9, 5, 1, 8, 4, 6};
        System.out.println("Array: 3, 7, 2, 9, 5, 1, 8, 4, 6");

        // 1. Sum — O(n)
        int sum = 0;
        for (int x : arr) sum += x;
        System.out.println("Sum: " + sum + " (O(n))");

        // 2. Count even numbers — O(n)
        int evenCount = 0;
        for (int x : arr) if (x % 2 == 0) evenCount++;
        System.out.println("Even count: " + evenCount + " (O(n))");

        // 3. Filter positive numbers — O(n)
        List<Integer> positive = new ArrayList<>();
        for (int x : arr) if (x > 0) positive.add(x);
        System.out.println("Positive numbers: " + positive + " (O(n))");

        // 4. Print each element — O(n)
        System.out.print("Print all: ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println(" (O(n))");

        // All operations are O(n) — one pass each.
        System.out.println("\nAll operations above are O(n) — they visit each element once.");
    }
}