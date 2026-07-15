/**
 * Demonstrates that linear search has Ω(1) best-case but O(n) worst-case.
 * The best case occurs when the target is the first element.
 */
public class LinearSearchOmega {
    public static void main(String[] args) {
        int[] arr = {5, 10, 15, 20, 25, 30};

        // Best case: target is at index 0
        int target = 5;
        int index = linearSearch(arr, target);
        System.out.println("Best case: target " + target + " found at index " + index + " (Ω(1))");

        // Worst case: target is at the end
        target = 30;
        index = linearSearch(arr, target);
        System.out.println("Worst case: target " + target + " found at index " + index + " (O(n))");

        // Worst case: target not present
        target = 100;
        index = linearSearch(arr, target);
        System.out.println("Worst case: target " + target + " not found after checking all (O(n))");

        System.out.println("\nSo linear search is Ω(1) (best) and O(n) (worst).");
        System.out.println("If the input is random, average is Θ(n).");
    }

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}