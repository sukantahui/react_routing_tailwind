/**
 * Demonstrates O(n) time complexity.
 * The loop runs exactly 'n' times, where 'n' is the length of the array.
 */
public class SumArray {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        
        // Time Complexity: O(n) - Linear
        // The number of operations grows directly with the input size.
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        
        System.out.println("Sum of array elements: " + sum);
    }
}