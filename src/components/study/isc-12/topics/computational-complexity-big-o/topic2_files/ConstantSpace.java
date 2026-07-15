/**
 * Demonstrates O(1) space complexity.
 * Only a few variables are used, regardless of input size.
 */
public class ConstantSpace {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int sum = 0;      // O(1) space
        int max = arr[0]; // O(1) space

        // No extra data structures; only two variables.
        for (int num : arr) {
            sum += num;
            if (num > max) max = num;
        }

        System.out.println("Sum: " + sum);
        System.out.println("Max: " + max);
        System.out.println("Space complexity: O(1)");
    }
}