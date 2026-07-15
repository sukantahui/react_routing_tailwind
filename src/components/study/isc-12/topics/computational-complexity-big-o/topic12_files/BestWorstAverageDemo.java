/**
 * Demonstrates best, worst, and average case runtimes for a simple algorithm.
 * Simulates linear search with different input positions.
 */
public class BestWorstAverageDemo {
    public static void main(String[] args) {
        int[] arr = new int[100000];
        for (int i = 0; i < arr.length; i++) arr[i] = i;

        // Best case: target at index 0
        long start = System.nanoTime();
        linearSearch(arr, 0);
        long end = System.nanoTime();
        System.out.println("Best case (target at first): " + (end - start) + " ns");

        // Worst case: target not found (must scan all)
        start = System.nanoTime();
        linearSearch(arr, 1000000);
        end = System.nanoTime();
        System.out.println("Worst case (target not found): " + (end - start) + " ns");

        // Average case: target in the middle
        start = System.nanoTime();
        linearSearch(arr, arr.length / 2);
        end = System.nanoTime();
        System.out.println("Average case (target in middle): " + (end - start) + " ns");

        // Measure 100 random targets to estimate average
        long total = 0;
        for (int i = 0; i < 100; i++) {
            int target = (int)(Math.random() * arr.length);
            start = System.nanoTime();
            linearSearch(arr, target);
            end = System.nanoTime();
            total += (end - start);
        }
        System.out.println("Average over 100 random targets: " + (total / 100) + " ns");
    }

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}