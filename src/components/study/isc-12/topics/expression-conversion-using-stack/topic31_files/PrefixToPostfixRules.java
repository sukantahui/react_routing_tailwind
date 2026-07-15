// PrefixToPostfixRules.java
// Converts a prefix expression to postfix using a stack.

import java.util.*;

public class PrefixToPostfixRules {

    public static String prefixToPostfix(String prefix) {
        Stack<String> stack = new Stack<>();
        String[] tokens = prefix.split("\\s+");

        // Scan from right to left
        for (int i = tokens.length - 1; i >= 0; i--) {
            String token = tokens[i];

            // If operand, push onto stack
            if (token.matches("[a-zA-Z0-9]+")) {
                stack.push(token);
            } else { // operator
                // Pop left and right operands (first popped is left, second is right)
                String left = stack.pop();
                String right = stack.pop();
                // Build postfix string: left + right + operator
                String postfix = left + " " + right + " " + token;
                stack.push(postfix);
            }
        }
        return stack.pop();
    }

    public static void traceConversion(String prefix) {
        System.out.println("Prefix: " + prefix);
        System.out.println("Postfix: " + prefixToPostfix(prefix));
        System.out.println();
    }

    public static void main(String[] args) {
        String[] examples = {
            "+ A B",
            "+ A * B C",
            "* + A B C",
            "+ * A B * C D",
            "- + A * B C D",
            "* + A B - C D",
            "- * A + B C / D E"
        };

        for (String expr : examples) {
            traceConversion(expr);
        }
    }
}