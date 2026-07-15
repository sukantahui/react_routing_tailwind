// ConversionNeedExample.java
// Demonstrates the need for conversion by evaluating a postfix expression.

import java.util.Stack;

public class ConversionNeedExample {
    // Method to evaluate a postfix expression
    public static int evaluatePostfix(String expr) {
        Stack<Integer> stack = new Stack<>();
        String[] tokens = expr.split(" ");
        for (String token : tokens) {
            if (token.matches("-?\\d+")) {
                stack.push(Integer.parseInt(token));
            } else {
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
        // Infix: 2 + 3 * 4
        // Postfix: 2 3 4 * +  (since 3*4 first, then +2)
        String postfix = "2 3 4 * +"; // evaluates to 14
        int result = evaluatePostfix(postfix);
        System.out.println("Postfix expression: " + postfix);
        System.out.println("Result: " + result);

        // Postfix for (2 + 3) * 4 → 2 3 + 4 *
        String postfix2 = "2 3 + 4 *";
        int result2 = evaluatePostfix(postfix2);
        System.out.println("\nPostfix expression: " + postfix2);
        System.out.println("Result: " + result2);

        // Show the difference: without conversion, we'd need precedence rules.
        // With postfix, evaluation is straightforward using a stack.
        System.out.println("\nThis demonstrates how postfix eliminates the need for precedence rules.");
    }
}