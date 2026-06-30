/**
 * Shows how to write recurrences from recursive code, step by step.
 * Each method includes the recurrence in comments.
 */
public class WritingRecurrences {
    public static void main(String[] args) {
        System.out.println("=== Writing Recurrences ===\n");

        // Example 1: Factorial
        System.out.println("Example 1: Factorial");
        System.out.println("  Code: factorial(n) = n * factorial(n-1), base case n<=1");
        System.out.println("  Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)");
        System.out.println("  Solution: O(n)");
        System.out.println("  factorial(5) = " + factorial(5) + "\n");

        // Example 2: Binary Search
        System.out.println("Example 2: Binary Search");
        System.out.println("  Code: search(arr, target, low, high) = search on half");
        System.out.println("  Recurrence: T(n) = T(n/2) + O(1), T(1) = O(1)");
        System.out.println("  Solution: O(log n)");
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println("  binarySearch(7) = " + binarySearch(arr, 7, 0, arr.length-1) + "\n");

        // Example 3: Merge Sort
        System.out.println("Example 3: Merge Sort");
        System.out.println("  Code: mergeSort(arr, left, right) = mergeSort(left) + mergeSort(right) + merge");
        System.out.println("  Recurrence: T(n) = 2T(n/2) + O(n), T(1) = O(1)");
        System.out.println("  Solution: O(n log n)");
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(data, 0, data.length-1);
        System.out.print("  Sorted: ");
        for (int x : data) System.out.print(x + " ");
        System.out.println("\n");

        // Example 4: Fibonacci
        System.out.println("Example 4: Fibonacci (naive)");
        System.out.println("  Code: fib(n) = fib(n-1) + fib(n-2), base cases n<=1");
        System.out.println("  Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)");
        System.out.println("  Solution: O(2ⁿ)");
        System.out.println("  fib(6) = " + fib(6) + "\n");

        // Example 5: Tower of Hanoi
        System.out.println("Example 5: Tower of Hanoi");
        System.out.println("  Code: hanoi(n) = hanoi(n-1) + 1 + hanoi(n-1)");
        System.out.println("  Recurrence: T(n) = 2T(n-1) + O(1), T(1) = O(1)");
        System.out.println("  Solution: O(2ⁿ)");
        System.out.println("  hanoi(3) moves = " + hanoi(3, 'A', 'C', 'B') + "\n");

        // Example 6: D&C Max
        System.out.println("Example 6: Divide & Conquer Max");
        System.out.println("  Code: max(arr, left, right) = max(max(left), max(right))");
        System.out.println("  Recurrence: T(n) = 2T(n/2) + O(1), T(1) = O(1)");
        System.out.println("  Solution: O(n)");
        int[] nums = {3, 7, 2, 9, 5, 1, 8, 4, 6};
        System.out.println("  max of array = " + findMax(nums, 0, nums.length-1));
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

    // T(n) = 2T(n/2) + O(n) → O(n log n)
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    // T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    // T(n) = 2T(n-1) + O(1) → O(2ⁿ)
    public static int hanoi(int n, char from, char to, char aux) {
        if (n == 1) return 1;
        int moves = hanoi(n - 1, from, aux, to);
        moves += 1;
        moves += hanoi(n - 1, aux, to, from);
        return moves;
    }

    // T(n) = 2T(n/2) + O(1) → O(n)
    public static int findMax(int[] arr, int left, int right) {
        if (left == right) return arr[left];
        int mid = left + (right - left) / 2;
        int maxLeft = findMax(arr, left, mid);
        int maxRight = findMax(arr, mid + 1, right);
        return Math.max(maxLeft, maxRight);
    }
}