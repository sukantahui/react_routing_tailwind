// PostfixExample.java
// Demonstrates postfix notation and its evaluation using a stack.

import java.util.Stack;

public class PostfixExample {
    // Method to evaluate a postfix expression
    public static int evaluatePostfix(String expr) {
        Stack<Integer> stack = new Stack<>();
        String[] tokens = expr.split(" ");
        for (String token : tokens) {
            if (token.matches("-?\\d+")) {
                stack.push(Integer.parseInt(token));
            } else {
                // Operator: pop two operands
                int b = stack.pop();
                int a = stack.pop();
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
        // Postfix: 2 3 + => 5
        String expr1 = "2 3 +";
        System.out.println("Postfix: " + expr1 + " = " + evaluatePostfix(expr1));

        // Postfix: 2 3 + 4 * => (2+3)*4 = 20
        String expr2 = "2 3 + 4 *";
        System.out.println("Postfix: " + expr2 + " = " + evaluatePostfix(expr2));

        // Postfix: 2 3 4 * + => 2 + (3*4) = 14
        String expr3 = "2 3 4 * +";
        System.out.println("Postfix: " + expr3 + " = " + evaluatePostfix(expr3));

        // More complex: 5 6 * 7 - => (5*6) - 7 = 23
        String expr4 = "5 6 * 7 -";
        System.out.println("Postfix: " + expr4 + " = " + evaluatePostfix(expr4));

        System.out.println("\nNote: Postfix evaluation uses a stack and scans left-to-right.");
    }
}