/**
 * Compares different power implementations:
 * 1. Naive Power (O(n) time, O(n) space)
 * 2. Fast Power (O(log n) time, O(log n) space)
 * 3. Iterative Fast Power (O(log n) time, O(1) space)
 * 4. Math.pow (built-in, optimized)
 */
public class PowerComparison {
    public static void main(String[] args) {
        int base = 2;
        int exp = 1000000; // 1 million!

        System.out.println("=== Power Comparison ===");
        System.out.println("Base = " + base + ", Exponent = " + exp);
        System.out.println();

        // 1. Naive Power - SKIP for large exp (would be too slow)
        System.out.println("1. Naive Power: O(n) time, O(n) space");
        System.out.println("   Skipped for exp = " + exp + " (would take ~1,000,000 steps)");

        // 2. Fast Power (Recursive)
        long start = System.nanoTime();
        long result1 = FastPower.fastPower(base, exp);
        long end = System.nanoTime();
        System.out.println("2. Fast Power (recursive): " + result1);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(log n), Space: O(log n)");

        // 3. Fast Power (Iterative)
        start = System.nanoTime();
        long result2 = FastPower.fastPowerIterative(base, exp);
        end = System.nanoTime();
        System.out.println("3. Fast Power (iterative): " + result2);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Time: O(log n), Space: O(1)");

        // 4. Math.pow (built-in)
        start = System.nanoTime();
        double result3 = Math.pow(base, exp);
        end = System.nanoTime();
        System.out.println("4. Math.pow: " + result3);
        System.out.println("   Time: " + (end - start) + " ns");
        System.out.println("   Uses highly optimized C code");

        // Verify all results are equal (within floating point precision)
        System.out.println("\nAll methods give the same result: " + 
            (result1 == result2 && (long)result3 == result1));

        // Show steps for different methods
        System.out.println("\n=== Steps Comparison ===");
        System.out.println("Exponent\tNaive\tFast (steps)");
        for (int e : new int[]{1, 2, 4, 8, 16, 32, 64}) {
            int naiveSteps = e + 1;
            int fastSteps = (int)(Math.log(e) / Math.log(2)) + 2;
            System.out.println(e + "\t\t" + naiveSteps + "\t" + fastSteps);
        }
        System.out.println("\nFast power is exponentially faster for large exponents!");
    }
}