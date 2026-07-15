/**
 * Traveling Salesman Problem — Brute Force (O(n!))
 * Tries all possible routes (permutations) to find the shortest path.
 * Only feasible for n ≤ 10.
 */
public class TSPBruteForce {
    private static int bestDistance = Integer.MAX_VALUE;
    private static int[] bestRoute;

    public static void main(String[] args) {
        // Distance matrix (symmetric) for 5 cities
        int[][] dist = {
            {0, 10, 15, 20, 25},
            {10, 0, 35, 25, 30},
            {15, 35, 0, 30, 20},
            {20, 25, 30, 0, 40},
            {25, 30, 20, 40, 0}
        };

        int n = dist.length;
        System.out.println("TSP Brute Force (O(n!))");
        System.out.println("Number of cities: " + n);
        System.out.println("Expected routes: " + factorial(n) + " permutations");

        long start = System.nanoTime();
        int[] cities = new int[n];
        for (int i = 0; i < n; i++) cities[i] = i;
        boolean[] used = new boolean[n];
        int[] current = new int[n];
        bestDistance = Integer.MAX_VALUE;
        bestRoute = null;

        permute(dist, cities, used, current, 0);

        long end = System.nanoTime();

        System.out.println("Best distance: " + bestDistance);
        System.out.print("Best route: ");
        if (bestRoute != null) {
            for (int city : bestRoute) System.out.print(city + " ");
            System.out.println();
        }
        System.out.println("Time: " + (end - start) + " ns");
        System.out.println("Time complexity: O(n!)");

        // Show growth
        System.out.println("\nRoutes for different n:");
        for (int i = 1; i <= 10; i++) {
            System.out.println("n=" + i + " → " + factorial(i) + " routes");
        }
        System.out.println("For n=10, 10! = 3.6 million routes — still feasible.");
        System.out.println("For n=15, 15! ≈ 1.3 × 10^12 routes — too many.");
    }

    public static void permute(int[][] dist, int[] cities, boolean[] used, int[] current, int pos) {
        if (pos == cities.length) {
            // Calculate total distance
            int total = 0;
            for (int i = 0; i < cities.length - 1; i++) {
                total += dist[current[i]][current[i + 1]];
            }
            // Return to start
            total += dist[current[cities.length - 1]][current[0]];
            if (total < bestDistance) {
                bestDistance = total;
                bestRoute = current.clone();
            }
            return;
        }

        for (int i = 0; i < cities.length; i++) {
            if (!used[i]) {
                used[i] = true;
                current[pos] = cities[i];
                permute(dist, cities, used, current, pos + 1);
                used[i] = false;
            }
        }
    }

    public static long factorial(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) result *= i;
        return result;
    }
}