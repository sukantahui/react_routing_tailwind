import java.util.ArrayList;
import java.util.List;

/**
 * Subset Generation — O(2ⁿ) time.
 * Generates all subsets of a set of n elements.
 * There are exactly 2ⁿ subsets.
 */
public class SubsetGeneration {
    private static int subsetCount = 0;

    public static void main(String[] args) {
        int n = 5;
        int[] set = new int[n];
        for (int i = 0; i < n; i++) set[i] = i + 1;

        System.out.println("Subset Generation (O(2ⁿ))");
        System.out.println("Set: " + java.util.Arrays.toString(set));
        System.out.println("All subsets:");

        subsetCount = 0;
        List<List<Integer>> subsets = generateSubsets(set, 0);
        
        for (List<Integer> subset : subsets) {
            System.out.println(subset);
        }
        System.out.println("Total subsets: " + subsets.size() + " (should be 2^" + n + " = " + (1 << n) + ")");
        System.out.println("Time complexity: O(2ⁿ)");

        // Show growth
        System.out.println("\nNumber of subsets for different n:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("n=" + i + " → 2^" + i + " = " + (1 << i) + " subsets");
        }
        System.out.println("For n=30, there are 2^30 ≈ 1 billion subsets — impossible to generate.");
    }

    public static List<List<Integer>> generateSubsets(int[] set, int index) {
        List<List<Integer>> result = new ArrayList<>();
        if (index == set.length) {
            result.add(new ArrayList<>());
            return result;
        }

        // Generate subsets without current element
        List<List<Integer>> without = generateSubsets(set, index + 1);
        result.addAll(without);

        // Generate subsets with current element
        for (List<Integer> list : without) {
            List<Integer> with = new ArrayList<>(list);
            with.add(0, set[index]);
            result.add(with);
        }

        subsetCount = result.size();
        return result;
    }
}