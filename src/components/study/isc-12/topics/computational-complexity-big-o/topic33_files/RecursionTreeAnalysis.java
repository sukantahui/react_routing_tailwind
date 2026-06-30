/**
 * A generic analysis tool for recursion trees.
 * Simulates different recurrences and computes work per level.
 */
public class RecursionTreeAnalysis {
    public static void main(String[] args) {
        System.out.println("=== Recursion Tree Analysis ===\n");

        // 1. T(n) = 2T(n/2) + n
        System.out.println("1. T(n) = 2T(n/2) + n");
        analyze(16, 2, 2, 16);

        // 2. T(n) = 2T(n/2) + 1
        System.out.println("\n2. T(n) = 2T(n/2) + 1");
        analyze(16, 2, 2, 1);

        // 3. T(n) = T(n/2) + 1
        System.out.println("\n3. T(n) = T(n/2) + 1");
        analyze(16, 1, 2, 1);

        // 4. T(n) = 4T(n/2) + n
        System.out.println("\n4. T(n) = 4T(n/2) + n");
        analyze(16, 4, 2, 16);

        // 5. T(n) = T(n-1) + n (linear chain)
        System.out.println("\n5. T(n) = T(n-1) + n");
        analyzeLinear(5);
    }

    /**
     * Analyzes a divide-and-conquer recurrence: T(n) = a*T(n/b) + f(n)
     * Simulates the tree up to a given n (must be a power of b).
     */
    public static void analyze(int n, int a, int b, int fWork) {
        System.out.println("  n = " + n + ", a = " + a + ", b = " + b + ", f(n) = " + fWork);
        int levels = (int)(Math.log(n) / Math.log(b)) + 1;
        System.out.println("  Number of levels: " + levels);
        System.out.println("  Level\tNodes\tWork per node\tTotal work");

        int totalWork = 0;
        int nodes = 1;
        int size = n;
        for (int level = 0; level < levels; level++) {
            int workPerNode = (size == 1) ? fWork : (int)(fWork * ((double)n / size));
            int totalAtLevel = nodes * workPerNode;
            totalWork += totalAtLevel;
            System.out.printf("  %d\t%d\t%d\t\t%d\n", level, nodes, workPerNode, totalAtLevel);
            nodes *= a;
            size /= b;
        }
        System.out.println("  Total work = " + totalWork + " (estimated O(n log n) for the first case)");
        System.out.println("  Complexity: " + getComplexity(a, b, fWork, n));
    }

    /**
     * Analyzes a linear recurrence: T(n) = T(n-1) + f(n)
     */
    public static void analyzeLinear(int n) {
        System.out.println("  T(n) = T(n-1) + n (linear chain)");
        System.out.println("  Level\tWork at this level");
        int total = 0;
        for (int i = n; i >= 1; i--) {
            total += i;
            System.out.println("  " + (n - i) + "\t" + i);
        }
        System.out.println("  Total work = " + total + " = O(n²)");
    }

    public static String getComplexity(int a, int b, int f, int n) {
        double logBase = Math.log(a) / Math.log(b);
        double fPower = Math.log(f) / Math.log(n);
        if (fPower < logBase) {
            return "Θ(n^" + logBase + ")";
        } else if (fPower == logBase) {
            return "Θ(n^" + logBase + " log n)";
        } else {
            return "Θ(f(n))";
        }
    }
}