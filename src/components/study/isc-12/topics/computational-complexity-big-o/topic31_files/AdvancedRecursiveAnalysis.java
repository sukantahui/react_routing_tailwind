/**
 * Complete analysis of multiple recursive algorithms with:
 * - Recurrence relation
 * - Solution method
 * - Time and space complexity
 * - Implementation
 */
public class AdvancedRecursiveAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Advanced Recursive Analysis ===\n");

        // 1. Binary Search (Divide & Conquer)
        System.out.println("1. BINARY SEARCH");
        System.out.println("   Recurrence: T(n) = T(n/2) + O(1)");
        System.out.println("   Method: Master Theorem (a=1, b=2, f(n)=1)");
        System.out.println("   Time: O(log n)");
        System.out.println("   Space: O(log n) (recursion stack)");
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        System.out.println("   Search for 7: index " + binarySearch(arr, 7, 0, arr.length-1) + "\n");

        // 2. Merge Sort (Divide & Conquer)
        System.out.println("2. MERGE SORT");
        System.out.println("   Recurrence: T(n) = 2T(n/2) + O(n)");
        System.out.println("   Method: Master Theorem (a=2, b=2, f(n)=n)");
        System.out.println("   Time: O(n log n)");
        System.out.println("   Space: O(n) (auxiliary array)");
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(data, 0, data.length-1);
        System.out.print("   Sorted: ");
        for (int x : data) System.out.print(x + " ");
        System.out.println("\n");

        // 3. Naive Fibonacci (Binary Recursion)
        System.out.println("3. NAIVE FIBONACCI");
        System.out.println("   Recurrence: T(n) = T(n-1) + T(n-2) + O(1)");
        System.out.println("   Method: Recursion Tree (exponential branching)");
        System.out.println("   Time: O(2ⁿ)");
        System.out.println("   Space: O(n) (recursion stack)");
        System.out.println("   fib(8) = " + fib(8) + "\n");

        // 4. Memoized Fibonacci (DP)
        System.out.println("4. MEMOIZED FIBONACCI");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1) (with memoization)");
        System.out.println("   Method: Substitution / DP");
        System.out.println("   Time: O(n)");
        System.out.println("   Space: O(n) (memo array)");
        int[] memo = new int[10];
        System.out.println("   fibMemo(8) = " + fibMemo(8, memo) + "\n");

        // 5. Tower of Hanoi
        System.out.println("5. TOWER OF HANOI");
        System.out.println("   Recurrence: T(n) = 2T(n-1) + O(1)");
        System.out.println("   Method: Recursion Tree / Substitution");
        System.out.println("   Time: O(2ⁿ)");
        System.out.println("   Space: O(n) (recursion stack)");
        System.out.println("   Moves for n=4: " + towerOfHanoi(4, 'A', 'C', 'B') + "\n");

        // 6. Linear Recursion (Factorial)
        System.out.println("6. FACTORIAL (Linear Recursion)");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1)");
        System.out.println("   Method: Substitution / Iteration");
        System.out.println("   Time: O(n)");
        System.out.println("   Space: O(n) (recursion stack)");
        System.out.println("   factorial(6) = " + factorial(6) + "\n");

        // 7. Tail Recursive Factorial
        System.out.println("7. TAIL RECURSIVE FACTORIAL");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1) (can be optimized)");
        System.out.println("   Time: O(n)");
        System.out.println("   Space: O(1) (with TCO)");
        System.out.println("   tailFactorial(6) = " + tailFactorial(6, 1) + "\n");
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

    // T(n) = T(n-1) + O(1) → O(n) (with memoization)
    public static int fibMemo(int n, int[] memo) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        return memo[n];
    }

    // T(n) = 2T(n-1) + O(1) → O(2ⁿ)
    public static int towerOfHanoi(int n, char from, char to, char aux) {
        if (n == 1) return 1;
        int moves = towerOfHanoi(n - 1, from, aux, to);
        moves += 1;
        moves += towerOfHanoi(n - 1, aux, to, from);
        return moves;
    }

    // T(n) = T(n-1) + O(1) → O(n)
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // T(n) = T(n-1) + O(1) → O(n), tail recursive
    public static int tailFactorial(int n, int acc) {
        if (n <= 1) return acc;
        return tailFactorial(n - 1, acc * n);
    }
}