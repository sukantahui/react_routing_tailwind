// PrefixExample.java
// Demonstrates prefix notation and its evaluation using a stack.

import java.util.Stack;

public class PrefixExample {
    // Method to evaluate a prefix expression
    public static int evaluatePrefix(String expr) {
        Stack<Integer> stack = new Stack<>();
        String[] tokens = expr.split(" ");
        // Scan from right to left
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];
            if (token.matches("-?\\d+")) {
                stack.push(Integer.parseInt(token));
            } else {
                // Operator: pop two operands
                int a = stack.pop();
                int b = stack.pop();
                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                    default: throw new IllegalArgumentException("Unknown operator: " + token);
                }
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // Prefix: + 2 3 => 5
        String expr1 = "+ 2 3";
        System.out.println("Prefix: " + expr1 + " = " + evaluatePrefix(expr1));

        // Prefix: * + 2 3 4 => (2+3)*4 = 20
        String expr2 = "* + 2 3 4";
        System.out.println("Prefix: " + expr2 + " = " + evaluatePrefix(expr2));

        // Prefix: + 2 * 3 4 => 2 + (3*4) = 14
        String expr3 = "+ 2 * 3 4";
        System.out.println("Prefix: " + expr3 + " = " + evaluatePrefix(expr3));

        // More complex: - * 5 6 7 => (5*6) - 7 = 23
        String expr4 = "- * 5 6 7";
        System.out.println("Prefix: " + expr4 + " = " + evaluatePrefix(expr4));

        System.out.println("\nNote: Prefix evaluation uses a stack and scans right-to-left.");
    }
}