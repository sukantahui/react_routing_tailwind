// ReverseSwapExample.java
// Demonstrates the reversal and parenthesis‑swapping steps.

public class ReverseSwapExample {

    // Helper: reverse a string
    public static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    // Helper: swap parentheses
    public static String swapParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') sb.append(')');
            else if (c == ')') sb.append('(');
            else sb.append(c);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        String[] expressions = {
            "A+B",
            "A+B*C",
            "(A+B)*C",
            "((A+B)*C)-D",
            "(A+B)*(C-D)"
        };

        System.out.println("=== Reverse and Swap Demonstration ===\n");
        for (String expr : expressions) {
            System.out.println("Original: " + expr);
            String reversed = reverse(expr);
            System.out.println("Reverse:  " + reversed);
            String swapped = swapParentheses(reversed);
            System.out.println("Swap:     " + swapped);
            // Show final prefix for reference (optional)
            System.out.println();
        }
    }
}