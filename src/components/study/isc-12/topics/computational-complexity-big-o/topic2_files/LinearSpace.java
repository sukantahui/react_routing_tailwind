import java.util.ArrayList;
import java.util.List;

/**
 * Demonstrates O(n) space complexity.
 * Creates a new list proportional to the input size.
 */
public class LinearSpace {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        List<Integer> doubled = new ArrayList<>(); // O(n) space

        // The new list grows with the input size.
        for (int num : arr) {
            doubled.add(num * 2);
        }

        System.out.println("Original: " + java.util.Arrays.toString(arr));
        System.out.println("Doubled:   " + doubled);
        System.out.println("Space complexity: O(n)");
    }
}