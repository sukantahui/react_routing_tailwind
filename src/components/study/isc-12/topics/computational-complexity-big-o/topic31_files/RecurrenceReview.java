/**
 * Reviews writing and solving recurrences for common recursive algorithms.
 * Each method shows its recurrence and complexity.
 */
public class RecurrenceReview {
    public static void main(String[] args) {
        System.out.println("=== Recurrence Review ===\n");

        // 1. Factorial: T(n) = T(n-1) + O(1) → O(n)
        System.out.println("1. Factorial:");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)");
        System.out.println("   Solution: O(n)");
        System.out.println("   factorial(5) = " + factorial(5) + "\n");

        // 2. Binary Search: T(n) = T(n/2) + O(1) → O(log n)
        System.out.println("2. Binary Search:");
        System.out.println("   Recurrence: T(n) = T(n/2) + O(1), T(1) = O(1)");
        System.out.println("   Solution: O(log n)");
        int[] arr = {1, 3, 5, 7, 9, 11, 13};
        System.out.println("   binarySearch(7) = " + binarySearch(arr, 7, 0, arr.length-1) + "\n");

        // 3. Merge Sort: T(n) = 2T(n/2) + O(n) → O(n log n)
        System.out.println("3. Merge Sort:");
        System.out.println("   Recurrence: T(n) = 2T(n/2) + O(n), T(1) = O(1)");
        System.out.println("   Solution: O(n log n)");
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(data, 0, data.length-1);
        System.out.print("   Sorted: ");
        for (int x : data) System.out.print(x + " ");
        System.out.println("\n");

        // 4. Fibonacci (naive): T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)
        System.out.println("4. Fibonacci (naive):");
        System.out.println("   Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)");
        System.out.println("   Solution: O(2ⁿ)");
        System.out.println("   fib(6) = " + fib(6) + "\n");

        // 5. Tower of Hanoi: T(n) = 2T(n-1) + O(1) → O(2ⁿ)
        System.out.println("5. Tower of Hanoi:");
        System.out.println("   Recurrence: T(n) = 2T(n-1) + O(1), T(1) = O(1)");
        System.out.println("   Solution: O(2ⁿ)");
        System.out.println("   Moves for n=3: " + towerOfHanoi(3, 'A', 'C', 'B'));
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
    public static int towerOfHanoi(int n, char from, char to, char aux) {
        if (n == 1) return 1;
        int moves = towerOfHanoi(n - 1, from, aux, to);
        moves += 1;
        moves += towerOfHanoi(n - 1, aux, to, from);
        return moves;
    }
}