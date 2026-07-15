/**
 * Sum of Digits - Shows the recursion tree structure.
 * Displays each call with indentation to show depth.
 */
public class SumDigitsCallTree {
    private static int depth = 0;

    public static void main(String[] args) {
        int n = 5432;
        System.out.println("=== Recursion Tree for Sum of Digits ===");
        System.out.println("n = " + n);
        System.out.println("Depth = number of digits = " + (int)(Math.log10(n) + 1));
        System.out.println("\nTracing calls (indentation shows depth):");
        int result = sumDigits(n);
        System.out.println("\nSum of digits: " + result);
        System.out.println("Time: O(log n), Space: O(log n)");
    }

    public static int sumDigits(int n) {
        depth++;
        String indent = "  ".repeat(depth - 1);

        System.out.println(indent + "sumDigits(" + n + ")");

        if (n == 0) {
            System.out.println(indent + "  → base case: return 0");
            depth--;
            return 0;
        }

        int lastDigit = n % 10;
        System.out.println(indent + "  last digit = " + lastDigit);
        int result = lastDigit + sumDigits(n / 10);
        System.out.println(indent + "  → return " + lastDigit + " + sumDigits(" + n/10 + ") = " + result);
        depth--;
        return result;
    }
}