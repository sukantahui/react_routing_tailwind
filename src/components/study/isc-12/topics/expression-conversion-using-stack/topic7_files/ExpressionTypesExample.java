// ExpressionTypesExample.java
// Demonstrates the same expression in infix, prefix, and postfix.

import java.util.Stack;

public class ExpressionTypesExample {
    // Method to evaluate postfix
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
                    default: throw new IllegalArgumentException("Unknown operator");
                }
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // The same expression: (2 + 3) * 4
        String infix = "(2 + 3) * 4";
        String prefix = "* + 2 3 4";
        String postfix = "2 3 + 4 *";

        System.out.println("Infix:   " + infix);
        System.out.println("Prefix:  " + prefix);
        System.out.println("Postfix: " + postfix);

        // Evaluate postfix
        int result = evaluatePostfix(postfix);
        System.out.println("\nEvaluation of postfix: " + result);
        System.out.println("(This matches (2+3)*4 = 20)");
    }
}