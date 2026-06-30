/**
 * Demonstrates that for small n, O(n²) can be faster than O(n log n)
 * due to lower constant factors and overhead.
 */
public class PracticalTradeoffs {
    public static void main(String[] args) {
        int[] sizes = {10, 20, 30, 50, 100, 200, 500};

        System.out.println("Comparing Bubble Sort (O(n²)) vs Merge Sort (O(n log n))");
        System.out.println("n\t\tBubble (ms)\tMerge (ms)\tFaster");
        System.out.println("------------------------------------------------");

        for (int n : sizes) {
            int[] arr1 = generateRandomArray(n);
            int[] arr2 = arr1.clone();

            // Bubble Sort
            long start = System.nanoTime();
            bubbleSort(arr1);
            long bubbleTime = (System.nanoTime() - start) / 1_000_000;

            // Merge Sort
            start = System.nanoTime();
            mergeSort(arr2, 0, arr2.length - 1);
            long mergeTime = (System.nanoTime() - start) / 1_000_000;

            String faster = (bubbleTime < mergeTime) ? "Bubble" : "Merge";
            System.out.printf("%d\t\t%d\t\t%d\t\t%s\n", n, bubbleTime, mergeTime, faster);
        }

        System.out.println("\nFor small n (n < 30), bubble sort can be faster because:");
        System.out.println("  - Lower constant factor");
        System.out.println("  - No recursion overhead");
        System.out.println("  - In-place (no extra array allocation)");
        System.out.println("For large n, merge sort is always faster.");
    }

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

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

    public static int[] generateRandomArray(int n) {
        int[] arr = new int[n];
        java.util.Random rand = new java.util.Random(42);
        for (int i = 0; i < n; i++) arr[i] = rand.nextInt(n);
        return arr;
    }
}