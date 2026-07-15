/**
 * Demonstrates different recurrence types with code examples.
 * Each method shows a different recurrence pattern.
 */
public class RecurrenceTypes {
    public static void main(String[] args) {
        System.out.println("=== Recurrence Types ===\n");

        // 1. Linear Recursion: T(n) = T(n-1) + O(1)
        System.out.println("1. Linear Recursion");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)");
        System.out.println("   Solution: O(n)");
        System.out.println("   factorial(5) = " + factorial(5) + "\n");

        // 2. Divide & Conquer (Balanced): T(n) = 2T(n/2) + O(n)
        System.out.println("2. Divide & Conquer (Balanced)");
        System.out.println("   Recurrence: T(n) = 2T(n/2) + O(n), T(1) = O(1)");
        System.out.println("   Solution: O(n log n)");
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(arr, 0, arr.length-1);
        System.out.print("   Sorted: ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println("\n");

        // 3. Divide & Conquer (Unbalanced): T(n) = T(n-1) + O(n)
        System.out.println("3. Divide & Conquer (Unbalanced)");
        System.out.println("   Recurrence: T(n) = T(n-1) + O(n), T(1) = O(1)");
        System.out.println("   Solution: O(n²)");
        System.out.println("   selectionSort on array of size 5 (conceptual)");
        int[] data = {5, 4, 3, 2, 1};
        selectionSort(data);
        System.out.print("   Sorted: ");
        for (int x : data) System.out.print(x + " ");
        System.out.println("\n");

        // 4. Binary Recursion: T(n) = T(n-1) + T(n-2) + O(1)
        System.out.println("4. Binary Recursion");
        System.out.println("   Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)");
        System.out.println("   Solution: O(2ⁿ)");
        System.out.println("   fib(6) = " + fib(6) + "\n");

        // 5. Multiple Recursion: T(n) = 3T(n/3) + O(n)
        System.out.println("5. Multiple Recursion");
        System.out.println("   Recurrence: T(n) = 3T(n/3) + O(n), T(1) = O(1)");
        System.out.println("   Solution: O(n log n)");
        System.out.println("   3-way merge sort (conceptual) -> O(n log n)");
    }

    // Linear: T(n) = T(n-1) + O(1) → O(n)
    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // Divide & Conquer: T(n) = 2T(n/2) + O(n) → O(n log n)
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

    // Unbalanced D&C: T(n) = T(n-1) + O(n) → O(n²)
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }

    // Binary: T(n) = T(n-1) + T(n-2) + O(1) → O(2ⁿ)
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}