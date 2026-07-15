/**
 * Demonstrates different recursive algorithms and their recurrences.
 */
public class RecurrenceExamples {
    public static void main(String[] args) {
        System.out.println("=== Recurrence Examples ===\n");

        // 1. Factorial: T(n) = T(n-1) + O(1), T(0)=O(1)
        System.out.println("1. Factorial:");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)");
        System.out.println("   Solution: O(n)");
        int n = 5;
        System.out.println("   factorial(" + n + ") = " + factorial(n));

        // 2. Binary Search: T(n) = T(n/2) + O(1), T(1)=O(1)
        System.out.println("\n2. Binary Search:");
        System.out.println("   Recurrence: T(n) = T(n/2) + O(1), T(1) = O(1)");
        System.out.println("   Solution: O(log n)");
        int[] arr = {1, 3, 5, 7, 9};
        System.out.println("   binarySearch([1,3,5,7,9], 5) = " + binarySearch(arr, 5, 0, arr.length-1));

        // 3. Merge Sort: T(n) = 2T(n/2) + O(n), T(1)=O(1)
        System.out.println("\n3. Merge Sort (conceptual):");
        System.out.println("   Recurrence: T(n) = 2T(n/2) + O(n), T(1) = O(1)");
        System.out.println("   Solution: O(n log n)");

        // 4. Fibonacci: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)
        System.out.println("\n4. Naive Fibonacci:");
        System.out.println("   Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)");
        System.out.println("   Solution: O(2ⁿ)");
        System.out.println("   fib(6) = " + fib(6));
    }

    // T(n) = T(n-1) + O(1) → O(n)
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // T(n) = T(n/2) + O(1) → O(log n)
    public static int binarySearch(int[] arr, int target, int low, int high) {
        if (low > high) return -1;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return binarySearch(arr, target, mid + 1, high);
        return binarySearch(arr, target, low, mid - 1);
    }

    // T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}