/**
 * Traces the recursion tree for merge sort.
 * Recurrence: T(n) = 2T(n/2) + O(n), T(1)=O(1)
 * Tree: Full binary tree, height = log₂(n), each level does n work.
 * Total: O(n log n)
 */
public class MergeSortTree {
    private static int depth = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10, 15};
        int n = arr.length;

        System.out.println("=== Merge Sort Recursion Tree ===");
        System.out.println("n = " + n);
        System.out.println("Tree structure: full binary tree, each level does n work");
        System.out.println("Height = log₂(" + n + ") = " + (int)(Math.log(n)/Math.log(2)));
        System.out.println("Each level does n work");
        System.out.println("Total: n * (log₂(n) + 1) = O(n log n)");

        System.out.println("\nTracing calls:");
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Maximum depth: " + maxDepth);
        System.out.println("Time: O(n log n), Space: O(n)");

        System.out.print("\nSorted array: ");
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }

    public static void mergeSort(int[] arr, int left, int right) {
        depth++;
        if (depth > maxDepth) maxDepth = depth;

        String indent = "  ".repeat(depth - 1);
        System.out.println(indent + "mergeSort(" + left + ", " + right + ")");

        if (left < right) {
            int mid = left + (right - left) / 2;
            System.out.println(indent + "  split at " + mid);
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            // Merge (O(n) work) — not fully traced for brevity
            System.out.println(indent + "  merge(" + left + ", " + mid + ", " + right + ")");
            merge(arr, left, mid, right);
        }

        depth--;
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        // Simplified merge for demonstration
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}