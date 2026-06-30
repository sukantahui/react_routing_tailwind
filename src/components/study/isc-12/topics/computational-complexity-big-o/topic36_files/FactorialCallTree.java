/**
 * Factorial - Shows the recursion tree structure.
 * Displays each call with indentation to show depth.
 */
public class FactorialCallTree {
    private static int depth = 0;

    public static void main(String[] args) {
        int n = 5;
        System.out.println("=== Recursion Tree for Factorial ===");
        System.out.println("n = " + n);
        System.out.println("Depth = n = " + n);
        System.out.println("\nTracing calls (indentation shows depth):");
        long result = factorial(n);
        System.out.println("\n" + n + "! = " + result);
        System.out.println("Time: O(n), Space: O(n)");
    }

    public static long factorial(int n) {
        depth++;
        String indent = "  ".repeat(depth - 1);

        System.out.println(indent + "fact(" + n + ")");

        if (n <= 1) {
            System.out.println(indent + "  → base case: return 1");
            depth--;
            return 1;
        }

        System.out.println(indent + "  " + n + " × fact(" + (n-1) + ")");
        long result = n * factorial(n - 1);
        System.out.println(indent + "  → return " + n + " × " + (result/n) + " = " + result);
        depth--;
        return result;
    }
}