import java.util.ArrayList;
import java.util.List;

/**
 * Generates all permutations of an array — O(n!) time.
 * For n elements, there are n! permutations.
 */
public class PermutationGeneration {
    private static int permutationCount = 0;

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4}; // n=4 → 4! = 24 permutations
        System.out.println("Generating all permutations of: " + arrayToString(arr));
        System.out.println("Expected permutations: " + factorial(arr.length));

        long start = System.nanoTime();
        List<int[]> permutations = generatePermutations(arr);
        long end = System.nanoTime();

        System.out.println("Total permutations generated: " + permutations.size());
        System.out.println("Time: " + (end - start) + " ns");
        System.out.println("Time complexity: O(n!)");

        // Show a few permutations
        System.out.println("\nFirst 5 permutations:");
        for (int i = 0; i < Math.min(5, permutations.size()); i++) {
            int[] p = permutations.get(i);
            System.out.println("  " + arrayToString(p));
        }
        if (permutations.size() > 5) {
            System.out.println("  ...");
        }

        // Show growth
        System.out.println("\nNumber of permutations for different n:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("n=" + i + " → " + factorial(i) + " permutations");
        }
        System.out.println("For n=10, 10! ≈ 3.6 million permutations — still feasible.");
        System.out.println("For n=20, 20! ≈ 2.4 × 10^18 permutations — impossible.");
    }

    public static List<int[]> generatePermutations(int[] arr) {
        List<int[]> result = new ArrayList<>();
        permutationCount = 0;
        boolean[] used = new boolean[arr.length];
        int[] current = new int[arr.length];
        generate(arr, used, current, 0, result);
        return result;
    }

    private static void generate(int[] arr, boolean[] used, int[] current, int pos, List<int[]> result) {
        if (pos == arr.length) {
            result.add(current.clone());
            permutationCount++;
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            if (!used[i]) {
                used[i] = true;
                current[pos] = arr[i];
                generate(arr, used, current, pos + 1, result);
                used[i] = false;
            }
        }
    }

    public static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }

    public static String arrayToString(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}