/**
 * Compares O(log n) and O(n) step counts for various input sizes.
 * Simulates binary search (log n) and linear search (n) steps.
 */
public class ComplexityComparison {
    public static void main(String[] args) {
        int[] sizes = {10, 100, 1000, 10000, 100000, 1000000, 10000000};

        System.out.println("n\tO(n) steps\tO(log n) steps (base 2)");
        System.out.println("-------------------------------------------");

        for (int n : sizes) {
            int linearSteps = n;                // O(n) 
            int logSteps = (int)(Math.log(n) / Math.log(2)); // floor of log2(n)
            System.out.println(n + "\t" + linearSteps + "\t\t" + logSteps);
        }

        System.out.println("\nFor n = 1,000,000:");
        System.out.println("Linear search: up to 1,000,000 comparisons");
        System.out.println("Binary search: up to 20 comparisons");
        System.out.println("That's a 50,000x difference!");
    }
}